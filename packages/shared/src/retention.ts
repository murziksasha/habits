/**
 * Memory-strength model (exponential forgetting curve).
 *
 * R(t) = exp(-t / S), where S ("stability", in days) grows with mastery (best score)
 * and with repeated practice, and shrinks for leeches (many attempts, low score).
 * Pure + deterministic so API, web and tests agree.
 */

export type RetentionInput = {
  /** Best lesson score 0..1 */
  bestScore: number;
  /** Total attempts on the lesson (>= 0) */
  attempts: number;
};

export const RETENTION_TARGET = 0.8;
const MIN_STABILITY = 0.5;
const MAX_STABILITY = 180;

function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n));
}

/** Days until predicted recall drops to 1/e (~37%). */
export function stabilityDays({ bestScore, attempts }: RetentionInput): number {
  const score = clamp(Number.isFinite(bestScore) ? bestScore : 0, 0, 1);
  const reps = Math.max(0, Math.floor(Number.isFinite(attempts) ? attempts : 0));
  const base = MIN_STABILITY + 12 * score * score;
  const practice = 1 + 0.3 * Math.log2(1 + reps);
  const leech = reps >= 4 && score < 0.7 ? 0.5 : 1;
  return Math.round(clamp(base * practice * leech, MIN_STABILITY, MAX_STABILITY) * 10) / 10;
}

/** Predicted probability (0..1) that the learner still recalls the lesson. */
export function estimateRetention(input: RetentionInput & { daysSince: number }): number {
  const s = stabilityDays(input);
  const t = Math.max(0, Number.isFinite(input.daysSince) ? input.daysSince : 0);
  return clamp(Math.exp(-t / s), 0, 1);
}

/**
 * Days from now until retention falls to `target` (0 → review now).
 * Solves exp(-t/S) = target → t = -S ln(target).
 */
export function daysUntilRetention(
  input: RetentionInput & { daysSince: number },
  target = RETENTION_TARGET,
): number {
  const s = stabilityDays(input);
  const tg = clamp(target, 0.01, 0.99);
  const total = -s * Math.log(tg);
  const left = total - Math.max(0, input.daysSince);
  return Math.max(0, Math.round(left * 10) / 10);
}

/** Days elapsed between `from` and `now` (fractional, never negative). */
export function daysBetween(from: Date | string | null | undefined, now: Date = new Date()): number {
  if (!from) return 0;
  const t = typeof from === "string" ? Date.parse(from) : from.getTime();
  if (!Number.isFinite(t)) return 0;
  return Math.max(0, (now.getTime() - t) / 86_400_000);
}

export type RetentionSummary = {
  retentionPct: number;
  stabilityDays: number;
  dueInDays: number;
};

export function retentionSummary(
  input: RetentionInput & { lastPracticedAt?: Date | string | null },
  now: Date = new Date(),
): RetentionSummary {
  const daysSince = daysBetween(input.lastPracticedAt ?? null, now);
  return {
    retentionPct: Math.round(estimateRetention({ ...input, daysSince }) * 100),
    stabilityDays: stabilityDays(input),
    dueInDays: daysUntilRetention({ ...input, daysSince }),
  };
}
