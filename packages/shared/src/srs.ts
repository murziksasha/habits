/** SM-2 inspired spaced repetition helpers */

export type SrsRating = 1 | 2 | 3 | 4;
// 1 again, 2 hard, 3 good, 4 easy

export type SrsState = {
  ease: number; // ease * 100, default 250
  intervalDays: number;
  repetitions: number;
  lapses: number;
};

export function defaultSrsState(): SrsState {
  return { ease: 250, intervalDays: 0, repetitions: 0, lapses: 0 };
}

/**
 * Apply SM-2-ish update. Returns new state + next interval days.
 */
export function applySrsRating(state: SrsState, rating: SrsRating): SrsState & { nextIntervalDays: number } {
  let { ease, intervalDays, repetitions, lapses } = state;

  if (rating === 1) {
    // Again
    repetitions = 0;
    lapses += 1;
    intervalDays = 0;
    ease = Math.max(130, ease - 20);
    return { ease, intervalDays, repetitions, lapses, nextIntervalDays: 0 };
  }

  // ease adjust
  if (rating === 2) ease = Math.max(130, ease - 15);
  if (rating === 4) ease = ease + 15;

  if (repetitions === 0) {
    intervalDays = rating === 2 ? 0 : rating === 4 ? 3 : 1;
  } else if (repetitions === 1) {
    intervalDays = rating === 2 ? 1 : rating === 4 ? 5 : 3;
  } else {
    const ef = ease / 100;
    const mult = rating === 2 ? 1.2 : rating === 4 ? ef * 1.3 : ef;
    intervalDays = Math.max(1, Math.round(intervalDays * mult));
  }
  repetitions += 1;

  return { ease, intervalDays, repetitions, lapses, nextIntervalDays: intervalDays };
}

export function nextReviewDate(from: Date, intervalDays: number): Date {
  const d = new Date(from);
  if (intervalDays <= 0) {
    // due again in 10 minutes
    d.setMinutes(d.getMinutes() + 10);
  } else {
    d.setDate(d.getDate() + intervalDays);
  }
  return d;
}
