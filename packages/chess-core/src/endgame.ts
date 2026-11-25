import { replayHistory } from "./index.js";

export type EndgameGoal = "win" | "draw" | "promote";
export type EndgameStatus = "in_progress" | "success" | "fail";
export type EndgameReason =
  | "checkmate"
  | "mated"
  | "promoted"
  | "stalemate"
  | "threefold"
  | "insufficient"
  | "fifty_moves"
  | "move_limit"
  | "survived"
  | "illegal";

export type EndgameCheck = {
  status: EndgameStatus;
  reason: EndgameReason | null;
  /** Learner moves played so far. */
  learnerMoves: number;
  movesLeft: number;
};

/**
 * Judge an endgame drill from its start position and the full move list
 * (learner and bot moves alternating; the learner is the side to move in `fen`).
 *
 * - win: success on mate by the learner; fail on any rules draw, on being mated or when
 *   the learner has used `maxMoves` moves without mating.
 * - promote: success on the learner's first promotion; fail on draw/mate/limit.
 * - draw: success on any rules draw (stalemate, threefold, insufficient, 50 moves) or after
 *   surviving `maxMoves` learner moves; fail when mated.
 *
 * "Losing the win" is judged by state only (draw by rules or move limit) — no engine.
 */
export function checkEndgameGoal(
  fen: string,
  sans: readonly string[],
  goal: EndgameGoal,
  maxMoves: number,
): EndgameCheck {
  const game = replayHistory(fen, []);
  if (!game) return { status: "fail", reason: "illegal", learnerMoves: 0, movesLeft: 0 };
  const learner = game.turn();
  let learnerMoves = 0;
  const left = () => Math.max(0, maxMoves - learnerMoves);
  for (const san of sans) {
    const mover = game.turn();
    let move;
    try {
      move = game.move(san);
    } catch {
      move = null;
    }
    if (!move) return { status: "fail", reason: "illegal", learnerMoves, movesLeft: left() };
    if (mover === learner) learnerMoves += 1;
    if (game.isCheckmate()) {
      const learnerMated = mover !== learner;
      if (learnerMated) return { status: "fail", reason: "mated", learnerMoves, movesLeft: left() };
      return { status: "success", reason: "checkmate", learnerMoves, movesLeft: left() };
    }
    if (goal === "promote" && mover === learner && move.promotion) {
      return { status: "success", reason: "promoted", learnerMoves, movesLeft: left() };
    }
    const drawReason: EndgameReason | null = game.isStalemate()
      ? "stalemate"
      : game.isThreefoldRepetition()
        ? "threefold"
        : game.isInsufficientMaterial()
          ? "insufficient"
          : game.isDraw()
            ? "fifty_moves"
            : null;
    if (drawReason) {
      return { status: goal === "draw" ? "success" : "fail", reason: drawReason, learnerMoves, movesLeft: left() };
    }
    // The limit is checked after the bot's reply so a drawing side survives the last answer.
    if (learnerMoves >= maxMoves && mover !== learner) {
      return goal === "draw"
        ? { status: "success", reason: "survived", learnerMoves, movesLeft: 0 }
        : { status: "fail", reason: "move_limit", learnerMoves, movesLeft: 0 };
    }
  }
  // Win/promote: the learner's last allowed move did not finish → fail without waiting for the bot.
  if (goal !== "draw" && learnerMoves >= maxMoves && game.turn() !== learner) {
    return { status: "fail", reason: "move_limit", learnerMoves, movesLeft: 0 };
  }
  return { status: "in_progress", reason: null, learnerMoves, movesLeft: left() };
}
