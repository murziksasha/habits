/**
 * Exercise-level spaced repetition ("mistake notebook", SPEC 92).
 * Reuses SM-2 state from `srs.ts`; outcome → rating mapping lives here.
 */
import type { SrsRating } from "./srs.js";
import { normalizeConfidence } from "./calibration.js";

export type ExerciseOutcome = {
  correct: boolean;
  /** Wrong soft attempts before the final answer */
  wrongAttempts?: number;
  confidence?: number | null;
};

/** Correct and no wrong soft attempts. */
export function isFirstTry(o: ExerciseOutcome): boolean {
  return o.correct && Math.max(0, Number(o.wrongAttempts ?? 0) || 0) === 0;
}

/** Exercises the learner struggled with (or guessed) go into the mistake notebook. */
export function shouldTrackMistake(o: ExerciseOutcome): boolean {
  if (!isFirstTry(o)) return true;
  return normalizeConfidence(o.confidence) === 1; // lucky guess
}

/**
 * 1 again · 2 hard · 3 good · 4 easy
 * wrong → 1; correct after mistakes → 2; first try but guessed → 2;
 * first try + sure → 4; otherwise → 3.
 */
export function srsRatingFromOutcome(o: ExerciseOutcome): SrsRating {
  if (!o.correct) return 1;
  if (!isFirstTry(o)) return 2;
  const c = normalizeConfidence(o.confidence);
  if (c === 1) return 2;
  if (c === 3) return 4;
  return 3;
}

/** Review item is "graduated" once it survived several spaced repetitions. */
export function isGraduatedReview(s: { repetitions: number; intervalDays: number }): boolean {
  return s.repetitions >= 4 && s.intervalDays >= 21;
}
