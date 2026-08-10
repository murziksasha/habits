import { Hono } from "hono";
import { and, desc, eq, gte, or, sql } from "drizzle-orm";
import {
  characterGifts,
  characters,
  courses,
  friendships,
  userCourseProgress,
} from "@eduforge/db";
import {
  DEFAULT_AVATARS,
  GIFT_CATALOG,
  applyLevelUps,
  giftById,
  giftDailyLimit,
  levelFromXp,
  maxHearts,
  normalizeProgression,
  rollMystery,
  MAX_STREAK_FREEZES,
} from "@eduforge/shared";
import { z } from "zod";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { db } from "../db.js";
import { evaluateAchievements, logActivity, notifyUser } from "../engagement.js";
import { effectiveMaxStreakFreezes } from "../services/character-progression.js";
import { bumpDailyQuests } from "./quests.js";

type Vars = { user: AuthedUser };

export const giftRoutes = new Hono<{ Variables: Vars }>();

async function areFriends(a: string, b: string): Promise<boolean> {
  const row = await db.query.friendships.findFirst({
    where: and(
      eq(friendships.status, "accepted"),
      or(
        and(eq(friendships.requesterId, a), eq(friendships.addresseeId, b)),
        and(eq(friendships.requesterId, b), eq(friendships.addresseeId, a)),
      ),
    ),
  });
  return Boolean(row);
}

giftRoutes.get("/catalog", authMiddleware, async (c) => {
  return c.json({ gifts: GIFT_CATALOG });
});

giftRoutes.get("/inbox", authMiddleware, async (c) => {
  const user = c.get("user");
  const rows = await db.query.characterGifts.findMany({
    where: and(eq(characterGifts.toUserId, user.id), eq(characterGifts.status, "pending")),
    orderBy: [desc(characterGifts.createdAt)],
    limit: 50,
  });
  const fromIds = [...new Set(rows.map((r) => r.fromUserId))];
  const names = new Map<string, string>();
  for (const id of fromIds) {
    const ch = await db.query.characters.findFirst({ where: eq(characters.userId, id) });
    if (ch) names.set(id, ch.displayName);
  }
  return c.json({
    gifts: rows.map((r) => ({
      ...r,
      fromDisplayName: names.get(r.fromUserId) ?? "Friend",
      def: giftById(r.giftKey) ?? null,
    })),
  });
});

giftRoutes.get("/sent", authMiddleware, async (c) => {
  const user = c.get("user");
  const rows = await db.query.characterGifts.findMany({
    where: eq(characterGifts.fromUserId, user.id),
    orderBy: [desc(characterGifts.createdAt)],
    limit: 30,
  });
  return c.json({ gifts: rows });
});

const sendSchema = z.object({
  toUserId: z.string().uuid(),
  giftKey: z.string().min(1),
  message: z.string().max(280).optional(),
});

giftRoutes.post("/send", authMiddleware, async (c) => {
  const user = c.get("user");
  const body = await c.req.json().catch(() => null);
  const parsed = sendSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input" }, 400);
  if (parsed.data.toUserId === user.id) return c.json({ error: "self_gift" }, 400);

  const def = giftById(parsed.data.giftKey);
  if (!def) return c.json({ error: "unknown_gift" }, 404);

  if (!(await areFriends(user.id, parsed.data.toUserId))) {
    return c.json({ error: "not_friends" }, 403);
  }

  const sender = await db.query.characters.findFirst({
    where: eq(characters.userId, user.id),
  });
  if (!sender) return c.json({ error: "no_character" }, 404);

  const progression = applyLevelUps(normalizeProgression(sender.progression), sender.globalLevel);
  const dayStart = new Date();
  dayStart.setUTCHours(0, 0, 0, 0);

  const sentToday = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(characterGifts)
    .where(
      and(
        eq(characterGifts.fromUserId, user.id),
        gte(characterGifts.createdAt, dayStart),
      ),
    );
  const count = sentToday[0]?.n ?? 0;
  const limit = giftDailyLimit(progression);
  if (count >= limit) {
    return c.json({ error: "daily_limit", limit, sent: count }, 429);
  }

  if (def.isCheer) {
    const cheers = await db
      .select({ n: sql<number>`count(*)::int` })
      .from(characterGifts)
      .where(
        and(
          eq(characterGifts.fromUserId, user.id),
          eq(characterGifts.giftKey, "cheer"),
          gte(characterGifts.createdAt, dayStart),
        ),
      );
    if ((cheers[0]?.n ?? 0) >= 5) {
      return c.json({ error: "cheer_limit" }, 429);
    }
  }

  if (def.costXp > 0 && sender.globalXp < def.costXp) {
    return c.json({ error: "insufficient_xp", balanceXp: sender.globalXp }, 402);
  }

  let payload: Record<string, unknown> = {
    kind: def.kind,
    hearts: def.hearts,
    xp: def.xp,
    freezes: def.freezes,
    avatarKey: def.avatarKey,
    titleKey: def.titleKey,
    frameKey: def.frameKey,
  };
  if (def.kind === "mystery") {
    const rolled = rollMystery();
    payload = { ...rolled, mystery: true };
  }

  if (def.costXp > 0) {
    const newXp = sender.globalXp - def.costXp;
    await db
      .update(characters)
      .set({
        globalXp: newXp,
        globalLevel: levelFromXp(newXp),
        progression,
      })
      .where(eq(characters.id, sender.id));
  }

  const [gift] = await db
    .insert(characterGifts)
    .values({
      fromUserId: user.id,
      toUserId: parsed.data.toUserId,
      giftKey: def.id,
      message: parsed.data.message?.slice(0, 280) ?? null,
      status: "pending",
      payload,
    })
    .returning();

  await notifyUser(db, parsed.data.toUserId, {
    type: "gift",
    titleUk: `Подарунок: ${def.titleUk}`,
    titleEn: `Gift: ${def.titleEn}`,
    bodyUk: parsed.data.message || def.descUk,
    bodyEn: parsed.data.message || def.descEn,
    href: "/friends?gifts=1",
  });

  await logActivity(db, user.id, "gift_send", {
    giftKey: def.id,
    toUserId: parsed.data.toUserId,
    costXp: def.costXp,
  });

  await bumpDailyQuests(user.id, "gifts", 1);
  const unlocked = await evaluateAchievements(db, user.id, { giftSent: true });

  return c.json({ ok: true, gift, unlockedAchievements: unlocked });
});

giftRoutes.post("/claim/:id", authMiddleware, async (c) => {
  const user = c.get("user");
  const id = c.req.param("id");
  if (!id) return c.json({ error: "not_found" }, 404);
  const gift = await db.query.characterGifts.findFirst({
    where: and(eq(characterGifts.id, id), eq(characterGifts.toUserId, user.id)),
  });
  if (!gift) return c.json({ error: "not_found" }, 404);
  if (gift.status !== "pending") return c.json({ error: "already_claimed" }, 409);

  const ch = await db.query.characters.findFirst({
    where: eq(characters.userId, user.id),
  });
  if (!ch) return c.json({ error: "no_character" }, 404);

  const payload = (gift.payload ?? {}) as {
    kind?: string;
    hearts?: number;
    xp?: number;
    freezes?: number;
    avatarKey?: string;
    titleKey?: string;
    frameKey?: string;
    labelUk?: string;
    labelEn?: string;
  };

  let progression = applyLevelUps(normalizeProgression(ch.progression), ch.globalLevel);
  const unlocked = new Set([...DEFAULT_AVATARS, ...(ch.unlockedAvatars ?? [])]);
  const patch: Partial<typeof characters.$inferInsert> = {};

  if (payload.xp && payload.xp > 0) {
    const newXp = ch.globalXp + payload.xp;
    patch.globalXp = newXp;
    patch.globalLevel = levelFromXp(newXp);
    progression = applyLevelUps(progression, patch.globalLevel);
  }

  if (payload.freezes && payload.freezes > 0) {
    const max = effectiveMaxStreakFreezes(MAX_STREAK_FREEZES, ch);
    const current = ch.streakFreezes ?? 0;
    patch.streakFreezes = Math.min(max, Math.max(0, current) + payload.freezes);
  }

  if (payload.avatarKey) {
    unlocked.add(payload.avatarKey);
    patch.unlockedAvatars = [...unlocked];
  }

  if (payload.titleKey && !progression.unlockedTitles.includes(payload.titleKey)) {
    progression.unlockedTitles.push(payload.titleKey);
  }
  if (payload.frameKey && !progression.unlockedFrames.includes(payload.frameKey)) {
    progression.unlockedFrames.push(payload.frameKey);
  }
  patch.progression = progression;

  if (payload.hearts && payload.hearts > 0) {
    const plan = user.plan as "free" | "premium" | "family";
    const allCourses = await db.query.courses.findMany();
    for (const course of allCourses) {
      let prog = await db.query.userCourseProgress.findFirst({
        where: and(
          eq(userCourseProgress.userId, user.id),
          eq(userCourseProgress.courseId, course.id),
        ),
      });
      if (!prog) {
        const [created] = await db
          .insert(userCourseProgress)
          .values({
            userId: user.id,
            courseId: course.id,
            hearts: maxHearts(plan === "family" ? "premium" : plan),
          })
          .returning();
        prog = created;
      }
      const max = maxHearts(plan === "family" ? "premium" : plan);
      const next = Math.min(max, prog.hearts + payload.hearts);
      await db
        .update(userCourseProgress)
        .set({ hearts: next, heartsUpdatedAt: new Date() })
        .where(eq(userCourseProgress.id, prog.id));
    }
  }

  const [updated] = await db
    .update(characters)
    .set(patch)
    .where(eq(characters.id, ch.id))
    .returning();

  await db
    .update(characterGifts)
    .set({ status: "claimed", claimedAt: new Date() })
    .where(eq(characterGifts.id, gift.id));

  await logActivity(db, user.id, "gift_claim", { giftId: gift.id, giftKey: gift.giftKey });

  // Thank-you ping to sender (in-app + best-effort push)
  await notifyUser(db, gift.fromUserId, {
    type: "gift_claimed",
    titleUk: "Подарунок відкрито 🎁",
    titleEn: "Gift claimed 🎁",
    bodyUk: "Друг отримав твій подарунок.",
    bodyEn: "Your friend claimed your gift.",
    href: "/friends",
  });

  const unlockedAchievements = await evaluateAchievements(db, user.id, {
    giftClaimed: true,
    globalLevel: updated.globalLevel,
  });

  return c.json({
    ok: true,
    character: updated,
    progression,
    payload,
    unlockedAchievements,
  });
});
