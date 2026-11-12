/**
 * Exercise-level learning data (SPEC 92): attempts (confidence/calibration),
 * mistake-notebook SRS and capped XP for review sessions.
 */
import { and, eq, gte, inArray, sql } from "drizzle-orm";
import { activityEvents, exerciseAttempts, exerciseReviews } from "@eduforge/db";
import {
  applySrsRating,
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
};

export type AttemptSource = "lesson" | "mixed" | "mistakes";

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
      return {
        lessonId: i.lessonId,
        exerciseId: i.exerciseId,
        exerciseType: i.type.slice(0, 32),
        correct: i.correct,
        firstTry: isFirstTry({ correct: i.correct, wrongAttempts }),
        wrongAttempts,
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
  return { attempts: plan.attempts.length, tracked: plan.reviews.length };
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
