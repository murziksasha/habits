import { Hono } from "hono";
import { and, asc, desc, eq, lt, or, sql } from "drizzle-orm";
import { activityEvents, courses, lessons, userLessonProgress } from "@eduforge/db";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { db } from "../db.js";
import { buildReviewReasons } from "../services/review-queue.js";

type Vars = { user: AuthedUser };

export const reviewRoutes = new Hono<{ Variables: Vars }>();

/**
 * Lessons worth reviewing: completed with low score, or many attempts without high mastery.
 * Query `from=exam` prioritizes recent exam_failed activity context (wrong types).
 */
reviewRoutes.get("/", authMiddleware, async (c) => {
  const user = c.get("user");
  const threshold = Number(c.req.query("threshold") ?? 0.85);
  const fromExam = c.req.query("from") === "exam";

  const rows = await db
    .select({
      lessonId: lessons.id,
      lessonTitleUk: lessons.titleUk,
      lessonTitleEn: lessons.titleEn,
      courseSlug: courses.slug,
      courseTitleUk: courses.titleUk,
      courseIcon: courses.icon,
      bestScore: userLessonProgress.bestScore,
      attempts: userLessonProgress.attempts,
      status: userLessonProgress.status,
      completedAt: userLessonProgress.completedAt,
      isExam: lessons.isExam,
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

  // Optional: pull last exam_failed wrong types for coaching banner
  let examContext: {
    courseSlug?: string;
    wrongTypes?: string[];
    accuracy?: number;
  } | null = null;
  if (fromExam) {
    const last = await db.query.activityEvents.findFirst({
      where: and(eq(activityEvents.userId, user.id), eq(activityEvents.kind, "exam_failed")),
      orderBy: [desc(activityEvents.createdAt)],
    });
    if (last?.payload && typeof last.payload === "object") {
      const p = last.payload as Record<string, unknown>;
      examContext = {
        courseSlug: typeof p.courseSlug === "string" ? p.courseSlug : undefined,
        wrongTypes: Array.isArray(p.wrongTypes) ? (p.wrongTypes as string[]) : undefined,
        accuracy: typeof p.accuracy === "number" ? p.accuracy : undefined,
      };
    }
  }

  const items = rows.map((r) => {
    const leech = (r.attempts ?? 0) >= 4 && (r.bestScore ?? 0) < 0.7;
    const examCourseMatch = Boolean(
      examContext?.courseSlug && r.courseSlug === examContext.courseSlug,
    );
    const reasons = buildReviewReasons({
      bestScore: r.bestScore ?? 0,
      attempts: r.attempts ?? 0,
      status: r.status ?? "available",
      threshold,
      leech,
      examCourseMatch,
    });
    return {
      ...r,
      masteryPct: Math.round((r.bestScore ?? 0) * 100),
      needsReview: true,
      leech,
      reasons,
      primaryReasonUk: reasons[0]?.labelUk ?? "",
      primaryReasonEn: reasons[0]?.labelEn ?? "",
    };
  });

  // Boost non-exam lessons in same course as last failed exam
  if (examContext?.courseSlug) {
    items.sort((a, b) => {
      const aBoost = a.courseSlug === examContext!.courseSlug && !a.isExam ? 1 : 0;
      const bBoost = b.courseSlug === examContext!.courseSlug && !b.isExam ? 1 : 0;
      if (aBoost !== bBoost) return bBoost - aBoost;
      return (a.bestScore ?? 0) - (b.bestScore ?? 0);
    });
  }

  return c.json({
    threshold,
    items,
    count: items.length,
    examContext,
    fromExam,
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
