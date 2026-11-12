import { Hono } from "hono";
import { and, asc, desc, eq, inArray, lt, lte, or, sql } from "drizzle-orm";
import { activityEvents, courses, exerciseReviews, lessons, userLessonProgress } from "@eduforge/db";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { db } from "../db.js";
import {
  buildInterleavedSet,
  gradeExercise,
  isFirstTry,
  isMixedPracticeExercise,
  retentionSummary,
  type MixedExercise,
} from "@eduforge/shared";
import { logActivity } from "../engagement.js";
import { rateLimit } from "../rate-limit.js";
import { grantXpToUser } from "../services/character-progression.js";
import {
  clampWrongAttempts,
  recordExerciseLearning,
  REVIEW_XP_DAILY_CAP,
  reviewSessionXp,
  reviewXpEarnedToday,
} from "../services/exercise-learning.js";
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

type SessionAnswer = {
  lessonId: string;
  exerciseId: string;
  answer?: unknown;
  wrongAttempts?: number;
  confidence?: number | null;
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function parseSessionAnswers(body: unknown): SessionAnswer[] {
  const raw = (body as { answers?: unknown } | null)?.answers;
  if (!Array.isArray(raw)) return [];
  return (raw.slice(0, 30) as SessionAnswer[]).filter(
    (a) =>
      typeof a?.lessonId === "string" &&
      UUID_RE.test(a.lessonId) &&
      typeof a?.exerciseId === "string" &&
      a.exerciseId.length <= 128,
  );
}

/**
 * Shared grader for review sessions (mixed + mistakes): server-graded, first-try based,
 * records exercise attempts / mistake SRS and grants capped XP (SPEC 92).
 */
async function gradeReviewSession(
  user: AuthedUser,
  answers: SessionAnswer[],
  source: "mixed" | "mistakes",
) {
  const lessonIds = [...new Set(answers.map((a) => a.lessonId))];
  const lessonRows = await db
    .select({ id: lessons.id, exercises: lessons.exercises })
    .from(lessons)
    .where(inArray(lessons.id, lessonIds));
  const byKey = new Map<string, MixedExercise>();
  for (const l of lessonRows) {
    for (const e of (l.exercises as MixedExercise[]) ?? []) byKey.set(`${l.id}:${e.id}`, e);
  }

  const results = answers.map((a) => {
    const ex = byKey.get(`${a.lessonId}:${a.exerciseId}`);
    if (!ex || !isMixedPracticeExercise(ex)) {
      return {
        lessonId: a.lessonId,
        exerciseId: a.exerciseId,
        type: ex?.type ?? "",
        correct: false,
        firstTry: false,
        error: "not_found" as const,
      };
    }
    const g = gradeExercise(ex, a.answer);
    const wrongAttempts = clampWrongAttempts(a.wrongAttempts);
    return {
      lessonId: a.lessonId,
      exerciseId: a.exerciseId,
      type: ex.type,
      correct: g.correct,
      firstTry: isFirstTry({ correct: g.correct, wrongAttempts }),
    };
  });

  const valid = results.filter((r) => !("error" in r && r.error));
  await recordExerciseLearning(
    user.id,
    valid.map((r) => {
      const a = answers.find((x) => x.lessonId === r.lessonId && x.exerciseId === r.exerciseId);
      return {
        lessonId: r.lessonId,
        exerciseId: r.exerciseId,
        type: r.type,
        correct: r.correct,
        wrongAttempts: a?.wrongAttempts,
        confidence: a?.confidence ?? null,
      };
    }),
    source,
    byKey,
  ).catch(() => undefined);

  const correct = results.filter((r) => r.firstTry).length;
  const accuracy = results.length ? correct / results.length : 0;
  const earnedToday = await reviewXpEarnedToday(user.id).catch(() => REVIEW_XP_DAILY_CAP);
  const xpGain = reviewSessionXp(correct, earnedToday);
  if (xpGain > 0) {
    await grantXpToUser(user.id, xpGain, { applySpark: false }).catch(() => undefined);
  }

  await logActivity(db, user.id, source === "mixed" ? "mixed_practice" : "mistakes_practice", {
    total: results.length,
    correct,
    accuracy,
    lessons: lessonIds.length,
    xpGain,
  }).catch(() => undefined);

  return { results, correct, total: results.length, accuracy, xpGain, xpCapReached: earnedToday + xpGain >= REVIEW_XP_DAILY_CAP };
}

/**
 * Grade a mixed practice session server-side. Body:
 * `{ answers: [{ lessonId, exerciseId, answer, wrongAttempts?, confidence? }] }` (max 30).
 * `correct` counts first-try answers (no wrong soft attempts).
 */
reviewRoutes.post("/mixed/check", authMiddleware, async (c) => {
  const user = c.get("user");
  const limited = await rateLimit({ key: `mixed:${user.id}`, limit: 30, windowMs: 60_000 });
  if (!limited.ok) {
    return c.json({ error: "rate_limited", retryAfter: limited.retryAfterSec }, 429);
  }
  const answers = parseSessionAnswers(await c.req.json().catch(() => null));
  if (!answers.length) return c.json({ error: "no_answers" }, 400);
  return c.json(await gradeReviewSession(user, answers, "mixed"));
});

/**
 * Mistake notebook (exercise-level SRS): due exercises the learner struggled with.
 */
reviewRoutes.get("/mistakes", authMiddleware, async (c) => {
  const user = c.get("user");
  const limit = Math.max(1, Math.min(20, Number(c.req.query("limit") ?? 10) || 10));
  const now = new Date();

  const due = await db
    .select({
      lessonId: exerciseReviews.lessonId,
      exerciseId: exerciseReviews.exerciseId,
      repetitions: exerciseReviews.repetitions,
      lapses: exerciseReviews.lapses,
      dueAt: exerciseReviews.dueAt,
      lessonTitleUk: lessons.titleUk,
      lessonTitleEn: lessons.titleEn,
      exercises: lessons.exercises,
      courseSlug: courses.slug,
    })
    .from(exerciseReviews)
    .innerJoin(lessons, eq(lessons.id, exerciseReviews.lessonId))
    .innerJoin(courses, eq(courses.id, lessons.courseId))
    .where(and(eq(exerciseReviews.userId, user.id), lte(exerciseReviews.dueAt, now)))
    .orderBy(asc(exerciseReviews.dueAt))
    .limit(limit * 2);

  const items = due
    .map((r) => {
      const exercise = ((r.exercises as MixedExercise[]) ?? []).find((e) => e.id === r.exerciseId);
      if (!exercise || !isMixedPracticeExercise(exercise)) return null;
      return {
        lessonId: r.lessonId,
        courseSlug: r.courseSlug,
        lessonTitleUk: r.lessonTitleUk,
        lessonTitleEn: r.lessonTitleEn || r.lessonTitleUk,
        lapses: r.lapses,
        repetitions: r.repetitions,
        exercise,
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null)
    .slice(0, limit);

  const [agg] = await db
    .select({
      total: sql<number>`count(*)::int`,
      due: sql<number>`count(*) filter (where ${exerciseReviews.dueAt} <= now())::int`,
      graduated: sql<number>`count(*) filter (where ${exerciseReviews.repetitions} >= 4 and ${exerciseReviews.intervalDays} >= 21)::int`,
    })
    .from(exerciseReviews)
    .where(eq(exerciseReviews.userId, user.id));

  return c.json({
    items,
    count: items.length,
    due: agg?.due ?? 0,
    total: agg?.total ?? 0,
    graduated: agg?.graduated ?? 0,
  });
});

reviewRoutes.post("/mistakes/check", authMiddleware, async (c) => {
  const user = c.get("user");
  const limited = await rateLimit({ key: `mistakes:${user.id}`, limit: 30, windowMs: 60_000 });
  if (!limited.ok) {
    return c.json({ error: "rate_limited", retryAfter: limited.retryAfterSec }, 429);
  }
  const answers = parseSessionAnswers(await c.req.json().catch(() => null));
  if (!answers.length) return c.json({ error: "no_answers" }, 400);
  return c.json(await gradeReviewSession(user, answers, "mistakes"));
});
