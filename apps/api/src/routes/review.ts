import { Hono } from "hono";
import { and, asc, eq, lt, or, sql } from "drizzle-orm";
import { courses, lessons, userLessonProgress } from "@eduforge/db";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { db } from "../db.js";

type Vars = { user: AuthedUser };

export const reviewRoutes = new Hono<{ Variables: Vars }>();

/**
 * Lessons worth reviewing: completed with low score, or many attempts without high mastery.
 */
reviewRoutes.get("/", authMiddleware, async (c) => {
  const user = c.get("user");
  const threshold = Number(c.req.query("threshold") ?? 0.85);

  const rows = await db
    .select({
      lessonId: lessons.id,
      lessonTitleUk: lessons.titleUk,
      courseSlug: courses.slug,
      courseTitleUk: courses.titleUk,
      courseIcon: courses.icon,
      bestScore: userLessonProgress.bestScore,
      attempts: userLessonProgress.attempts,
      status: userLessonProgress.status,
      completedAt: userLessonProgress.completedAt,
    })
    .from(userLessonProgress)
    .innerJoin(lessons, eq(lessons.id, userLessonProgress.lessonId))
    .innerJoin(courses, eq(courses.id, lessons.courseId))
    .where(
      and(
        eq(userLessonProgress.userId, user.id),
        or(
          and(
            eq(userLessonProgress.status, "completed"),
            lt(userLessonProgress.bestScore, threshold),
          ),
          and(
            sql`${userLessonProgress.attempts} >= 2`,
            lt(userLessonProgress.bestScore, threshold),
          ),
        ),
      ),
    )
    .orderBy(asc(userLessonProgress.bestScore))
    .limit(40);

  return c.json({
    threshold,
    items: rows.map((r) => ({
      ...r,
      masteryPct: Math.round((r.bestScore ?? 0) * 100),
      needsReview: true,
    })),
    count: rows.length,
  });
});

reviewRoutes.get("/stats", authMiddleware, async (c) => {
  const user = c.get("user");
  const [agg] = await db
    .select({
      total: sql<number>`count(*)::int`,
      mastered: sql<number>`count(*) filter (where ${userLessonProgress.bestScore} >= 0.85)::int`,
      weak: sql<number>`count(*) filter (where ${userLessonProgress.bestScore} < 0.85 and ${userLessonProgress.attempts} > 0)::int`,
    })
    .from(userLessonProgress)
    .where(eq(userLessonProgress.userId, user.id));

  return c.json({
    total: agg?.total ?? 0,
    mastered: agg?.mastered ?? 0,
    weak: agg?.weak ?? 0,
  });
});
