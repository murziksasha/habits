/** Pure clock rules for online games: who is on move, remaining time, flag fall. */

export type ClockGame = {
  fen: string;
  pgn: string | null;
  whiteTimeMs: number;
  blackTimeMs: number;
  lastMoveAt: Date | null;
};

export type ClockState = {
  turn: "w" | "b";
  whiteTimeMs: number;
  blackTimeMs: number;
  /** Side whose clock reached zero, or null. */
  flagged: "w" | "b" | null;
};

export function sideToMove(fen: string): "w" | "b" {
  return fen.split(" ")[1] === "b" ? "b" : "w";
}

export function pliesOf(pgn: string | null): number {
  return (pgn ?? "").split(" ").filter(Boolean).length;
}

/** Drain the clock of the side on move by the time since the last move. */
export function clockState(game: ClockGame, nowMs: number): ClockState {
  const turn = sideToMove(game.fen);
  const last = game.lastMoveAt?.getTime() ?? nowMs;
  const elapsed = Math.max(0, nowMs - last);
  const whiteTimeMs = turn === "w" ? game.whiteTimeMs - elapsed : game.whiteTimeMs;
  const blackTimeMs = turn === "b" ? game.blackTimeMs - elapsed : game.blackTimeMs;
  const flagged = whiteTimeMs <= 0 ? "w" : blackTimeMs <= 0 ? "b" : null;
  return { turn, whiteTimeMs, blackTimeMs, flagged };
}

/**
 * What a flag fall means. Before each side has made a move the game is
 * aborted (no rating, no XP), like on Lichess; afterwards the flagged side loses.
 */
export function timeoutOutcome(
  flagged: "w" | "b",
  plies: number,
): { kind: "abort" } | { kind: "finish"; result: "1-0" | "0-1" } {
  if (plies < 2) return { kind: "abort" };
  return { kind: "finish", result: flagged === "w" ? "0-1" : "1-0" };
}
