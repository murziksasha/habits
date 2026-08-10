import { Hono } from "hono";
import { and, eq, or, sql } from "drizzle-orm";
import {
  achievements,
  certificates,
  characters,
  courses,
  friendships,
  lessons,
  userAchievements,
  userCourseProgress,
  userLessonProgress,
  users,
} from "@eduforge/db";
import {
  PATH_BADGE_CATALOG,
  PROGRAMMING_MINI_LESSON_SLUGS,
  applyLevelUps,
  normalizeProgression,
  titleLabel,
} from "@eduforge/shared";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { db } from "../db.js";

type Vars = { user: AuthedUser };

export const profileRoutes = new Hono<{ Variables: Vars }>();

/**
 * Public card for Open Graph / unfurl (no auth).
 * Limited fields only — no email, friendship, or private progress detail.
 */
profileRoutes.get("/card/:userId", async (c) => {
  const userId = c.req.param("userId") ?? "";
  const u = await db.query.users.findFirst({ where: eq(users.id, userId) });
  if (!u) return c.json({ error: "not_found" }, 404);
  const ch = await db.query.characters.findFirst({
    where: eq(characters.userId, userId),
  });
  if (!ch) return c.json({ error: "not_found" }, 404);

  const [achCount] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(userAchievements)
    .where(eq(userAchievements.userId, userId));

  const progression = applyLevelUps(normalizeProgression(ch.progression), ch.globalLevel);

  const pathBadgeIds = progression.pathBadges ?? [];
  return c.json({
    card: {
      userId,
      displayName: ch.displayName,
      avatarKey: ch.avatarKey,
      globalLevel: ch.globalLevel,
      globalXp: ch.globalXp,
      streakDays: ch.streakDays,
      achievementsUnlocked: achCount?.n ?? 0,
      equippedTitle: progression.equippedTitle ?? "rookie",
      equippedFrame: progression.equippedFrame ?? "none",
      titleUk: titleLabel(progression.equippedTitle, "uk"),
      titleEn: titleLabel(progression.equippedTitle, "en"),
      pathBadgeCount: pathBadgeIds.length,
      pathBadges: pathBadgeIds.slice(0, 8),
    },
  });
});

profileRoutes.get("/:userId", authMiddleware, async (c) => {
  const me = c.get("user");
  const userId = c.req.param("userId") as string;

  const u = await db.query.users.findFirst({ where: eq(users.id, userId) });
  if (!u) return c.json({ error: "not_found" }, 404);

  const ch = await db.query.characters.findFirst({
    where: eq(characters.userId, userId),
  });
  if (!ch) return c.json({ error: "not_found" }, 404);

  const progress = await db
    .select({
      slug: courses.slug,
      titleUk: courses.titleUk,
      icon: courses.icon,
      color: courses.color,
      xp: userCourseProgress.xp,
      level: userCourseProgress.level,
      completedLessons: userCourseProgress.completedLessons,
    })
    .from(userCourseProgress)
    .innerJoin(courses, eq(courses.id, userCourseProgress.courseId))
    .where(eq(userCourseProgress.userId, userId));

  const [achCount] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(userAchievements)
    .where(eq(userAchievements.userId, userId));

  const certs = await db.query.certificates.findMany({
    where: eq(certificates.userId, userId),
    limit: 20,
  });

  let friendship: "none" | "friends" | "pending_out" | "pending_in" = "none";
  if (me.id !== userId) {
    const f = await db.query.friendships.findFirst({
      where: or(
        and(eq(friendships.requesterId, me.id), eq(friendships.addresseeId, userId)),
        and(eq(friendships.requesterId, userId), eq(friendships.addresseeId, me.id)),
      ),
    });
    if (f?.status === "accepted") friendship = "friends";
    else if (f?.status === "pending") {
      friendship = f.requesterId === me.id ? "pending_out" : "pending_in";
    }
  }

  const recentAch = await db
    .select({
      code: achievements.code,
      titleUk: achievements.titleUk,
      titleEn: achievements.titleEn,
      icon: achievements.icon,
      unlockedAt: userAchievements.unlockedAt,
    })
    .from(userAchievements)
    .innerJoin(achievements, eq(achievements.id, userAchievements.achievementId))
    .where(eq(userAchievements.userId, userId))
    .limit(8);

  // Programming minis progress (public)
  let programmingMinis: {
    total: number;
    completed: number;
    allDone: boolean;
    slugsDone: string[];
  } | null = null;
  const progCourse = await db.query.courses.findFirst({
    where: eq(courses.slug, "programming"),
  });
  if (progCourse) {
    const miniSlugs = [...PROGRAMMING_MINI_LESSON_SLUGS];
    const progLessons = await db.query.lessons.findMany({
      where: eq(lessons.courseId, progCourse.id),
    });
    const miniIds = progLessons
      .filter((l) => (miniSlugs as string[]).includes(l.slug))
      .map((l) => ({ id: l.id, slug: l.slug }));
    const done = await db.query.userLessonProgress.findMany({
      where: and(
        eq(userLessonProgress.userId, userId),
        eq(userLessonProgress.courseId, progCourse.id),
        eq(userLessonProgress.status, "completed"),
      ),
    });
    const doneSet = new Set(done.map((d) => d.lessonId));
    const slugsDone = miniIds.filter((m) => doneSet.has(m.id)).map((m) => m.slug);
    programmingMinis = {
      total: miniSlugs.length,
      completed: slugsDone.length,
      allDone: slugsDone.length >= miniSlugs.length && miniSlugs.length > 0,
      slugsDone,
    };
  }

  const progression = applyLevelUps(normalizeProgression(ch.progression), ch.globalLevel);

  return c.json({
    profile: {
      userId,
      displayName: ch.displayName,
      avatarKey: ch.avatarKey,
      globalLevel: ch.globalLevel,
      globalXp: ch.globalXp,
      streakDays: ch.streakDays,
      plan: u.plan,
      isSelf: me.id === userId,
      friendship,
      achievementsUnlocked: achCount?.n ?? 0,
      equippedTitle: progression.equippedTitle ?? "rookie",
      equippedFrame: progression.equippedFrame ?? "none",
      titleUk: titleLabel(progression.equippedTitle, "uk"),
      titleEn: titleLabel(progression.equippedTitle, "en"),
      unlockedTitles: progression.unlockedTitles,
      unlockedFrames: progression.unlockedFrames,
      pathBadges: (progression.pathBadges ?? [])
        .map((id) => PATH_BADGE_CATALOG.find((b) => b.id === id))
        .filter(Boolean)
        .map((b) => ({
          id: b!.id,
          icon: b!.icon,
          titleUk: b!.titleUk,
          titleEn: b!.titleEn,
          courseSlug: b!.courseSlug,
        })),
      certificates: certs.map((x) => ({
        code: x.code,
        titleUk: x.titleUk,
        titleEn: x.titleEn,
        issuedAt: x.issuedAt,
      })),
      courseProgress: progress,
      recentAchievements: recentAch,
      programmingMinis,
    },
  });
});
