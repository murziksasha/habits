/**
 * Exercise-level learning data (SPEC 92): attempts (confidence/calibration),
 * mistake-notebook SRS and capped XP for review sessions.
 */
import { and, eq, gte, inArray, lte, sql } from "drizzle-orm";
import { activityEvents, chessPuzzleStats, exerciseAttempts, exerciseReviews } from "@eduforge/db";
import {
  applySrsRating,
  CHESS_REVIEW_TYPES,
  chessSrsNext,
  isFirstTry,
  isMixedPracticeExercise,
  nextReviewDate,
  normalizeConfidence,
  shouldTrackMistake,
  srsRatingFromOutcome,
} from "@eduforge/shared";
import { db } from "../db.js";

export type AttemptItem = {
  lessonId: string;
  exerciseId: string;
  type: string;
  correct: boolean;
  wrongAttempts?: number;
  confidence?: number | null;
  firstCheckPassed?: boolean;
  hintsUsed?: number;
  solutionRevealed?: boolean;
  practiceMode?: string;
  verificationMethod?: string;
  dataSource?: string;
  feedbackCategory?: string;
  exerciseVersion?: string;
  variantId?: string;
};

export type AttemptSource = "lesson" | "mixed" | "mistakes" | "puzzles";

/** Types we never log as attempts (no knowledge check). */
const SKIP_ATTEMPT_TYPES = new Set(["concept", "video", "rsvp"]);

export function clampWrongAttempts(v: unknown): number {
  const n = Math.floor(Number(v));
  return Number.isFinite(n) ? Math.max(0, Math.min(20, n)) : 0;
}

/**
 * Pure planner: which attempt rows to insert and which review rows to create/update.
 * Exported for unit tests.
 */
export function planExerciseLearning(
  items: AttemptItem[],
  existing: Map<string, { ease: number; intervalDays: number; repetitions: number; lapses: number }>,
  now: Date,
  opts: { replayable: (item: AttemptItem) => boolean },
) {
  const attempts = items
    .filter((i) => !SKIP_ATTEMPT_TYPES.has(i.type))
    .map((i) => {
      const wrongAttempts = clampWrongAttempts(i.wrongAttempts);
      const firstTry = isFirstTry({ correct: i.correct, wrongAttempts });
      return {
        lessonId: i.lessonId,
        exerciseId: i.exerciseId,
        exerciseType: i.type.slice(0, 32),
        correct: i.correct,
        firstTry,
        firstCheckPassed: i.firstCheckPassed ?? (firstTry && (i.hintsUsed ?? 0) === 0 && !i.solutionRevealed),
        wrongAttempts,
        hintsUsed: i.hintsUsed ?? 0,
        solutionRevealed: Boolean(i.solutionRevealed),
        practiceMode: i.practiceMode ?? "guided",
        verificationMethod: i.verificationMethod ?? "lesson",
        dataSource: i.dataSource ?? "curated",
        feedbackCategory: i.feedbackCategory ?? (i.correct ? "accepted_alternative" : "knowledge_gap"),
        exerciseVersion: i.exerciseVersion ?? "1",
        variantId: i.variantId ?? null,
        confidence: normalizeConfidence(i.confidence),
      };
    });

  const reviews: {
    key: string;
    lessonId: string;
    exerciseId: string;
    ease: number;
    intervalDays: number;
    repetitions: number;
    lapses: number;
    dueAt: Date;
    isNew: boolean;
  }[] = [];
  for (const i of items) {
    if (!opts.replayable(i)) continue;
    const key = `${i.lessonId}:${i.exerciseId}`;
    const outcome = {
      correct: i.correct,
      wrongAttempts: clampWrongAttempts(i.wrongAttempts),
      confidence: i.confidence,
    };
    const prev = existing.get(key);
    if (!prev && !shouldTrackMistake(outcome)) continue;
    if (CHESS_REVIEW_TYPES.has(i.type)) {
      // Chess uses a fixed 1 → 3 → 7 → 21 day ladder instead of SM-2 (plan §3.5).
      const next = chessSrsNext(prev ?? null, i.correct && clampWrongAttempts(i.wrongAttempts) === 0);
      reviews.push({
        key,
        lessonId: i.lessonId,
        exerciseId: i.exerciseId,
        ease: prev?.ease ?? 250,
        intervalDays: next.intervalDays,
        repetitions: next.repetitions,
        lapses: next.lapses,
        dueAt: nextReviewDate(now, next.intervalDays),
        isNew: !prev,
      });
      continue;
    }
    const base = prev ?? { ease: 250, intervalDays: 0, repetitions: 0, lapses: 0 };
    const next = applySrsRating(base, srsRatingFromOutcome(outcome));
    reviews.push({
      key,
      lessonId: i.lessonId,
      exerciseId: i.exerciseId,
      ease: next.ease,
      intervalDays: next.intervalDays,
      repetitions: next.repetitions,
      lapses: next.lapses,
      dueAt: prev ? nextReviewDate(now, next.nextIntervalDays) : now,
      isNew: !prev,
    });
  }
  return { attempts, reviews };
}

export async function recordExerciseLearning(
  userId: string,
  items: AttemptItem[],
  source: AttemptSource,
  exercisesByKey?: Map<string, { id: string; type: string; [k: string]: unknown }>,
): Promise<{ attempts: number; tracked: number }> {
  if (!items.length) return { attempts: 0, tracked: 0 };
  const now = new Date();
  const lessonIds = [...new Set(items.map((i) => i.lessonId))];
  const existingRows = await db
    .select()
    .from(exerciseReviews)
    .where(and(eq(exerciseReviews.userId, userId), inArray(exerciseReviews.lessonId, lessonIds)));
  const existing = new Map(existingRows.map((r) => [`${r.lessonId}:${r.exerciseId}`, r]));

  const plan = planExerciseLearning(items, existing, now, {
    replayable: (i) => {
      const ex = exercisesByKey?.get(`${i.lessonId}:${i.exerciseId}`);
      return ex ? isMixedPracticeExercise(ex) : isMixedPracticeExercise({ id: i.exerciseId, type: i.type, options: [] });
    },
  });

  if (plan.attempts.length) {
    await db.insert(exerciseAttempts).values(plan.attempts.map((a) => ({ ...a, userId, source })));
  }
  for (const r of plan.reviews) {
    if (r.isNew) {
      await db
        .insert(exerciseReviews)
        .values({
          userId,
          lessonId: r.lessonId,
          exerciseId: r.exerciseId,
          ease: r.ease,
          intervalDays: r.intervalDays,
          repetitions: r.repetitions,
          lapses: r.lapses,
          dueAt: r.dueAt,
          lastReviewedAt: now,
        })
        .onConflictDoNothing();
    } else {
      const prev = existing.get(r.key)!;
      await db
        .update(exerciseReviews)
        .set({
          ease: r.ease,
          intervalDays: r.intervalDays,
          repetitions: r.repetitions,
          lapses: r.lapses,
          dueAt: r.dueAt,
          lastReviewedAt: now,
        })
        .where(eq(exerciseReviews.id, prev.id));
    }
  }
  const missedPuzzles = items.filter((i) => i.type === "chess_puzzle" && !i.correct);
  let siblings = 0;
  for (const miss of missedPuzzles.slice(0, 5)) {
    siblings += await scheduleThemeSiblings(userId, miss.exerciseId, now).catch(() => 0);
  }
  return { attempts: plan.attempts.length, tracked: plan.reviews.length + siblings };
}

/** Pure pick of 1–2 theme siblings within ±150 rating, skipping already tracked puzzles. */
export function pickThemeSiblings(
  missed: { exerciseId: string; rating: number; themes: string[] },
  pool: { exerciseId: string; lessonId: string | null; rating: number; themes: string[] }[],
  tracked: Set<string>,
  max = 2,
): { exerciseId: string; lessonId: string }[] {
  const themes = new Set(missed.themes);
  return pool
    .filter(
      (p) =>
        p.exerciseId !== missed.exerciseId &&
        p.lessonId &&
        !tracked.has(p.exerciseId) &&
        Math.abs(p.rating - missed.rating) <= 150 &&
        p.themes.some((t) => themes.has(t)),
    )
    .sort((a, b) => Math.abs(a.rating - missed.rating) - Math.abs(b.rating - missed.rating) || a.exerciseId.localeCompare(b.exerciseId))
    .slice(0, max)
    .map((p) => ({ exerciseId: p.exerciseId, lessonId: p.lessonId! }));
}

/** After a missed chess puzzle, queue 1–2 same-theme puzzles for tomorrow (reason "theme_sibling"). */
async function scheduleThemeSiblings(userId: string, exerciseId: string, now: Date): Promise<number> {
  const missed = await db.query.chessPuzzleStats.findFirst({ where: eq(chessPuzzleStats.exerciseId, exerciseId) });
  if (!missed || !missed.themes.length) return 0;
  const pool = await db
    .select({
      exerciseId: chessPuzzleStats.exerciseId,
      lessonId: chessPuzzleStats.lessonId,
      rating: chessPuzzleStats.rating,
      themes: chessPuzzleStats.themes,
    })
    .from(chessPuzzleStats)
    .where(
      and(
        sql`${chessPuzzleStats.themes} && ARRAY[${sql.join(
          missed.themes.map((t) => sql`${t}`),
          sql`, `,
        )}]::text[]`,
        gte(chessPuzzleStats.rating, missed.rating - 150),
        lte(chessPuzzleStats.rating, missed.rating + 150),
      ),
    )
    .limit(50);
  const trackedRows = await db
    .select({ exerciseId: exerciseReviews.exerciseId })
    .from(exerciseReviews)
    .where(and(eq(exerciseReviews.userId, userId), inArray(exerciseReviews.exerciseId, pool.map((p) => p.exerciseId).concat([exerciseId]))));
  const picks = pickThemeSiblings(missed, pool, new Set(trackedRows.map((r) => r.exerciseId)));
  const dueAt = nextReviewDate(now, 1);
  for (const p of picks) {
    await db
      .insert(exerciseReviews)
      .values({ userId, lessonId: p.lessonId, exerciseId: p.exerciseId, dueAt, reason: "theme_sibling" })
      .onConflictDoNothing();
  }
  return picks.length;
}

/** XP for review sessions: 2 per first-try correct, ≤ 20 per session, ≤ 60 per UTC day. */
export const REVIEW_XP_PER_CORRECT = 2;
export const REVIEW_XP_SESSION_CAP = 20;
export const REVIEW_XP_DAILY_CAP = 60;

export function reviewSessionXp(firstTryCorrect: number, earnedToday: number): number {
  const raw = Math.min(REVIEW_XP_SESSION_CAP, Math.max(0, firstTryCorrect) * REVIEW_XP_PER_CORRECT);
  return Math.max(0, Math.min(raw, REVIEW_XP_DAILY_CAP - Math.max(0, earnedToday)));
}

export async function reviewXpEarnedToday(userId: string, now = new Date()): Promise<number> {
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const [row] = await db
    .select({
      xp: sql<number>`coalesce(sum((${activityEvents.payload}->>'xpGain')::int), 0)::int`,
    })
    .from(activityEvents)
    .where(
      and(
        eq(activityEvents.userId, userId),
        inArray(activityEvents.kind, ["mixed_practice", "mistakes_practice"]),
        gte(activityEvents.createdAt, start),
      ),
    );
  return row?.xp ?? 0;
}
