/** Interval used by the spaced-review queue. Better scores wait longer, from 1 to 14 days. */
export function spacedIntervalDays(bestScore: number): number {
  const score = Math.min(1, Math.max(0, Number.isFinite(bestScore) ? bestScore : 0));
  return Math.min(14, Math.max(1, Math.floor(1 + score * 12)));
}

/** Successful practice refreshes the interval. The first completion remains the fallback. */
export function spacedPracticeAnchor(row: {
  lastPracticedAt?: Date | null;
  completedAt?: Date | null;
}): Date | null {
  return row.lastPracticedAt ?? row.completedAt ?? null;
}

export function isSpacedReviewDue(
  row: { bestScore: number; lastPracticedAt?: Date | null; completedAt?: Date | null },
  now = Date.now(),
): boolean {
  const anchor = spacedPracticeAnchor(row);
  if (!anchor) return false;
  return anchor.getTime() + spacedIntervalDays(row.bestScore) * 86_400_000 <= now;
}
