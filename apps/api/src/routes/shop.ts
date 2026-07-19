import { Hono } from "hono";
import { and, eq } from "drizzle-orm";
import {
  characters,
  courses,
  shopPurchases,
  userCourseProgress,
} from "@eduforge/db";
import {
  addStreakFreezes,
  DEFAULT_AVATARS,
  levelFromXp,
  maxHearts,
  MAX_STREAK_FREEZES,
  SHOP_CATALOG,
  shopItemById,
} from "@eduforge/shared";
import { z } from "zod";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { db } from "../db.js";
import { logActivity, notifyUser } from "../engagement.js";

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

  const freezes = ch.streakFreezes ?? 0;
  return c.json({
    balanceXp: ch.globalXp,
    streakFreezes: freezes,
    maxStreakFreezes: MAX_STREAK_FREEZES,
    unlockedAvatars: [...unlocked],
    items: SHOP_CATALOG.map((item) => {
      const freezeFull =
        item.kind === "streak_freeze" && freezes >= MAX_STREAK_FREEZES;
      return {
        ...item,
        owned:
          item.kind === "avatar" && item.avatarKey
            ? unlocked.has(item.avatarKey)
            : false,
        canAfford: ch.globalXp >= item.costXp && !freezeFull,
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
  if (ch.globalXp < item.costXp) {
    return c.json({ error: "insufficient_xp", balanceXp: ch.globalXp }, 402);
  }

  const unlocked = new Set([
    ...DEFAULT_AVATARS,
    ...(ch.unlockedAvatars ?? []),
  ]);

  if (item.kind === "avatar" && item.avatarKey && unlocked.has(item.avatarKey)) {
    return c.json({ error: "already_owned" }, 409);
  }

  const newXp = ch.globalXp - item.costXp;
  const patch: Partial<typeof characters.$inferInsert> = {
    globalXp: newXp,
    globalLevel: levelFromXp(newXp),
  };

  if (item.kind === "streak_freeze") {
    const current = ch.streakFreezes ?? 0;
    if (current >= MAX_STREAK_FREEZES) {
      return c.json({ error: "freezes_full", max: MAX_STREAK_FREEZES }, 409);
    }
    const add = item.freezes ?? 1;
    patch.streakFreezes = addStreakFreezes(current, add);
  }

  if (item.kind === "avatar" && item.avatarKey) {
    unlocked.add(item.avatarKey);
    patch.unlockedAvatars = [...unlocked];
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

  const [updated] = await db
    .update(characters)
    .set(patch)
    .where(eq(characters.id, ch.id))
    .returning();

  await db.insert(shopPurchases).values({
    userId: user.id,
    itemId: item.id,
    costXp: item.costXp,
  });

  await logActivity(db, user.id, "shop_purchase", {
    itemId: item.id,
    costXp: item.costXp,
  });
  await notifyUser(db, user.id, {
    type: "shop",
    titleUk: "Покупка в магазині",
    titleEn: "Shop purchase",
    bodyUk: `Куплено: ${item.id} (−${item.costXp} XP)`,
    bodyEn: `Bought: ${item.id} (−${item.costXp} XP)`,
    href: "/shop",
  });

  return c.json({ ok: true, character: updated, item });
});
