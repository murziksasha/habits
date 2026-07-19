/** Pure matchmaking helpers for tests and the realtime server */

export type SeekEntry = {
  userId: string;
  displayName: string;
  elo: number;
  timeControl: string;
  rated: boolean;
  socketId: string;
};

/**
 * Find an opponent index for a new seeker, or -1 if none.
 * Matches same timeControl + rated, different userId.
 */
export function findOpponentIndex(
  queue: SeekEntry[],
  seek: Pick<SeekEntry, "userId" | "timeControl" | "rated">,
): number {
  return queue.findIndex(
    (s) =>
      s.timeControl === seek.timeControl &&
      s.rated === seek.rated &&
      s.userId !== seek.userId,
  );
}

/** Remove all seeks for a user (e.g. re-seek or disconnect). */
export function removeUserSeeks(queue: SeekEntry[], userId: string): SeekEntry[] {
  return queue.filter((s) => s.userId !== userId);
}

/** Remove by socket id (disconnect). */
export function removeSocketSeeks(queue: SeekEntry[], socketId: string): SeekEntry[] {
  return queue.filter((s) => s.socketId !== socketId);
}

/**
 * Pair two seekers: randomize colors.
 * Returns white/black assignments.
 */
export function assignColors(
  a: SeekEntry,
  b: SeekEntry,
  random: () => number = Math.random,
): { white: SeekEntry; black: SeekEntry } {
  if (random() < 0.5) return { white: a, black: b };
  return { white: b, black: a };
}
