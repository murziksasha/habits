import { Hono } from "hono";
import { and, eq } from "drizzle-orm";
import {
  characters,
  courses,
  shopPurchases,
  userCourseProgress,
} from "@eduforge/db";
import {
  avatarShopDiscount,
  DEFAULT_AVATARS,
  levelFromXp,
  maxHearts,
  MAX_STREAK_FREEZES,
  normalizeProgression,
  applyLevelUps,
  rollShopMystery,
  SHOP_CATALOG,
  shopItemById,
} from "@eduforge/shared";
import { z } from "zod";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { db } from "../db.js";
import { logActivity, notifyUser } from "../engagement.js";
import { effectiveMaxStreakFreezes, readProgression } from "../services/character-progression.js";
import { applyLootDrop } from "../services/loot-apply.js";

type Vars = { user: AuthedUser };

export const shopRoutes = new Hono<{ Variables: Vars }>();

shopRoutes.get("/", authMiddleware, async (c) => {
  const user = c.get("user");
  const ch = await db.query.characters.findFirst({
    where: eq(characters.userId, user.id),
  });
  if (!ch) return c.json({ error: "no_character" }, 404);

  const unlocked = new Set([
    ...DEFAULT_AVATARS,
    ...(ch.unlockedAvatars ?? []),
  ]);

  const progression = applyLevelUps(readProgression(ch), ch.globalLevel);
  const maxFreezes = effectiveMaxStreakFreezes(MAX_STREAK_FREEZES, ch);
  const discount = avatarShopDiscount(progression);
  const freezes = ch.streakFreezes ?? 0;
  return c.json({
    balanceXp: ch.globalXp,
    streakFreezes: freezes,
    maxStreakFreezes: maxFreezes,
    unlockedAvatars: [...unlocked],
    progression,
    items: SHOP_CATALOG.map((item) => {
      const costXp =
        item.kind === "avatar"
          ? Math.max(1, Math.round(item.costXp * (1 - discount)))
          : item.costXp;
      const freezeFull =
        item.kind === "streak_freeze" && freezes >= maxFreezes;
      return {
        ...item,
        costXp,
        baseCostXp: item.costXp,
        owned:
          item.kind === "avatar" && item.avatarKey
            ? unlocked.has(item.avatarKey)
            : false,
        canAfford: ch.globalXp >= costXp && !freezeFull,
        freezeFull,
      };
    }),
  });
});

const buySchema = z.object({
  itemId: z.string().min(1),
  /** Optional course slug when buying heart_one / hearts_full */
  courseSlug: z.string().optional(),
});

shopRoutes.post("/buy", authMiddleware, async (c) => {
  const user = c.get("user");
  const body = await c.req.json().catch(() => null);
  const parsed = buySchema.safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input" }, 400);

  const item = shopItemById(parsed.data.itemId);
  if (!item) return c.json({ error: "unknown_item" }, 404);

  const ch = await db.query.characters.findFirst({
    where: eq(characters.userId, user.id),
  });
  if (!ch) return c.json({ error: "no_character" }, 404);

  const progression = applyLevelUps(normalizeProgression(ch.progression), ch.globalLevel);
  const discount = avatarShopDiscount(progression);
  const costXp =
    item.kind === "avatar"
      ? Math.max(1, Math.round(item.costXp * (1 - discount)))
      : item.costXp;
  const maxFreezes = effectiveMaxStreakFreezes(MAX_STREAK_FREEZES, ch);

  if (ch.globalXp < costXp) {
    return c.json({ error: "insufficient_xp", balanceXp: ch.globalXp }, 402);
  }

  const unlocked = new Set([
    ...DEFAULT_AVATARS,
    ...(ch.unlockedAvatars ?? []),
  ]);

  if (item.kind === "avatar" && item.avatarKey && unlocked.has(item.avatarKey)) {
    return c.json({ error: "already_owned" }, 409);
  }

  const newXp = ch.globalXp - costXp;
  const patch: Partial<typeof characters.$inferInsert> = {
    globalXp: newXp,
    globalLevel: levelFromXp(newXp),
    progression,
  };

  if (item.kind === "streak_freeze") {
    const current = ch.streakFreezes ?? 0;
    if (current >= maxFreezes) {
      return c.json({ error: "freezes_full", max: maxFreezes }, 409);
    }
    const add = item.freezes ?? 1;
    patch.streakFreezes = Math.min(maxFreezes, Math.max(0, current) + Math.max(0, add));
  }

  if (item.kind === "avatar" && item.avatarKey) {
    unlocked.add(item.avatarKey);
    patch.unlockedAvatars = [...unlocked];
  }

  if (item.kind === "skill_point") {
    const pts = item.skillPoints ?? 1;
    progression.skillPoints = (progression.skillPoints ?? 0) + pts;
    patch.progression = progression;
  }

  if (item.kind === "heart_one" || item.kind === "hearts_full") {
    const plan = user.plan as "free" | "premium";
    const allCourses = await db.query.courses.findMany();
    const targetSlug = parsed.data.courseSlug;
    const targets = targetSlug
      ? allCourses.filter((x) => x.slug === targetSlug)
      : allCourses;

    for (const course of targets) {
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
            hearts: maxHearts(plan),
          })
          .returning();
        prog = created;
      }
      const max = maxHearts(plan);
      const next =
        item.kind === "hearts_full"
          ? max
          : Math.min(max, prog.hearts + (item.hearts ?? 1));
      await db
        .update(userCourseProgress)
        .set({ hearts: next, heartsUpdatedAt: new Date() })
        .where(eq(userCourseProgress.id, prog.id));
    }
  }

  // Deduct XP first (mystery may re-grant XP via loot)
  let [updated] = await db
    .update(characters)
    .set(patch)
    .where(eq(characters.id, ch.id))
    .returning();

  let loot = null as Awaited<ReturnType<typeof applyLootDrop>> | null;
  if (item.kind === "mystery") {
    const drop = rollShopMystery();
    loot = await applyLootDrop(user.id, drop, { notify: true });
    if (loot?.character) updated = loot.character;
  }

  await db.insert(shopPurchases).values({
    userId: user.id,
    itemId: item.id,
    costXp,
  });

  await logActivity(db, user.id, "shop_purchase", {
    itemId: item.id,
    costXp,
    loot: loot?.drop ?? null,
  });
  await notifyUser(db, user.id, {
    type: "shop",
    titleUk: "Покупка в магазині",
    titleEn: "Shop purchase",
    bodyUk: loot
      ? `Куплено: ${item.id} (−${costXp} XP) → ${loot.drop.labelUk}`
      : `Куплено: ${item.id} (−${costXp} XP)`,
    bodyEn: loot
      ? `Bought: ${item.id} (−${costXp} XP) → ${loot.drop.labelEn}`
      : `Bought: ${item.id} (−${costXp} XP)`,
    href: "/shop",
  });

  return c.json({
    ok: true,
    character: updated,
    item: { ...item, costXp },
    loot: loot?.drop ?? null,
  });
});
