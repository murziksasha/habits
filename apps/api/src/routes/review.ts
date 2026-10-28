import { Hono } from "hono";
import { and, asc, desc, eq, inArray, lt, or, sql } from "drizzle-orm";
import { activityEvents, courses, lessons, userLessonProgress } from "@eduforge/db";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { db } from "../db.js";
import {
  buildInterleavedSet,
  gradeExercise,
  isMixedPracticeExercise,
  retentionSummary,
  type MixedExercise,
} from "@eduforge/shared";
import { logActivity } from "../engagement.js";
import { rateLimit } from "../rate-limit.js";
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

  const now = new Date();
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
    // Forgetting-curve estimate (SPEC 91): only meaningful once the lesson was completed
    const memory = r.completedAt
      ? retentionSummary(
          {
            bestScore: r.bestScore ?? 0,
            attempts: r.attempts ?? 0,
            lastPracticedAt: r.completedAt,
          },
          now,
        )
      : null;
    return {
      ...r,
      retentionPct: memory?.retentionPct ?? null,
      stabilityDays: memory?.stabilityDays ?? null,
      dueInDays: memory?.dueInDays ?? null,
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

/**
 * Interleaved retrieval practice (SPEC 91): mixed auto-gradable exercises from
 * completed (non-exam) lessons. Weak lessons are drawn more often.
 * Query: `course` (optional slug), `count` (1–20, default 10), `seed` (optional int).
 */
reviewRoutes.get("/mixed", authMiddleware, async (c) => {
  const user = c.get("user");
  const courseSlug = c.req.query("course")?.trim() || null;
  const count = Math.max(1, Math.min(20, Number(c.req.query("count") ?? 10) || 10));
  const seedRaw = Number(c.req.query("seed"));
  const seed = Number.isFinite(seedRaw) && seedRaw > 0 ? Math.floor(seedRaw) : Date.now() % 2_147_483_647;

  const conds = [
    eq(userLessonProgress.userId, user.id),
    eq(userLessonProgress.status, "completed"),
    eq(lessons.isExam, false),
  ];
  if (courseSlug) conds.push(eq(courses.slug, courseSlug));

  const rows = await db
    .select({
      lessonId: lessons.id,
      lessonTitleUk: lessons.titleUk,
      lessonTitleEn: lessons.titleEn,
      exercises: lessons.exercises,
      courseSlug: courses.slug,
      bestScore: userLessonProgress.bestScore,
    })
    .from(userLessonProgress)
    .innerJoin(lessons, eq(lessons.id, userLessonProgress.lessonId))
    .innerJoin(courses, eq(courses.id, lessons.courseId))
    .where(and(...conds))
    .orderBy(asc(userLessonProgress.bestScore), desc(userLessonProgress.completedAt))
    .limit(60);

  const items = buildInterleavedSet(
    rows.map((r) => ({
      lessonId: r.lessonId,
      courseSlug: r.courseSlug,
      lessonTitleUk: r.lessonTitleUk,
      lessonTitleEn: r.lessonTitleEn || r.lessonTitleUk,
      bestScore: r.bestScore ?? 0,
      exercises: (r.exercises as MixedExercise[]) ?? [],
    })),
    { count, seed },
  );

  return c.json({
    seed,
    course: courseSlug,
    lessonsAvailable: rows.length,
    count: items.length,
    items,
  });
});

/**
 * Grade a mixed practice session server-side. Body:
 * `{ answers: [{ lessonId, exerciseId, answer }] }` (max 30).
 */
reviewRoutes.post("/mixed/check", authMiddleware, async (c) => {
  const user = c.get("user");
  const limited = await rateLimit({ key: `mixed:${user.id}`, limit: 30, windowMs: 60_000 });
  if (!limited.ok) {
    return c.json({ error: "rate_limited", retryAfter: limited.retryAfterSec }, 429);
  }
  const body = (await c.req.json().catch(() => null)) as {
    answers?: { lessonId?: string; exerciseId?: string; answer?: unknown }[];
  } | null;
  const answers = Array.isArray(body?.answers) ? body!.answers.slice(0, 30) : [];
  const valid = answers.filter(
    (a) => typeof a?.lessonId === "string" && typeof a?.exerciseId === "string",
  ) as { lessonId: string; exerciseId: string; answer?: unknown }[];
  if (!valid.length) return c.json({ error: "no_answers" }, 400);

  const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const lessonIds = [...new Set(valid.map((a) => a.lessonId))].filter((id) => uuidRe.test(id));
  if (!lessonIds.length) return c.json({ error: "no_answers" }, 400);
  const lessonRows = await db
    .select({ id: lessons.id, exercises: lessons.exercises })
    .from(lessons)
    .where(inArray(lessons.id, lessonIds));
  const byLesson = new Map(
    lessonRows.map((l) => [l.id, ((l.exercises as MixedExercise[]) ?? [])]),
  );

  const results = valid.map((a) => {
    const ex = byLesson.get(a.lessonId)?.find((e) => e.id === a.exerciseId);
    if (!ex || !isMixedPracticeExercise(ex)) {
      return { lessonId: a.lessonId, exerciseId: a.exerciseId, correct: false, error: "not_found" };
    }
    const g = gradeExercise(ex, a.answer);
    return { lessonId: a.lessonId, exerciseId: a.exerciseId, correct: g.correct };
  });
  const correct = results.filter((r) => r.correct).length;
  const accuracy = results.length ? correct / results.length : 0;

  await logActivity(db, user.id, "mixed_practice", {
    total: results.length,
    correct,
    accuracy,
    lessons: lessonIds.length,
  }).catch(() => undefined);

  return c.json({ results, correct, total: results.length, accuracy });
});
