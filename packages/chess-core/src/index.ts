import { Chess, type Square } from "chess.js";

export type MoveInput = {
  from: string;
  to: string;
  promotion?: "q" | "r" | "b" | "n";
};

const SQUARE_RE = /^[a-h][1-8]$/;
const PROMOTIONS = new Set(["q", "r", "b", "n"]);

export function isChessSquare(value: string): boolean {
  return SQUARE_RE.test(value);
}

export function createGame(fen?: string): Chess {
  return fen ? new Chess(fen) : new Chess();
}

export type DrawReason =
  | "stalemate"
  | "insufficient"
  | "threefold"
  | "fifty"
  | "checkmate"
  | null;

export type GameTermination = {
  over: boolean;
  result: "1-0" | "0-1" | "1/2-1/2" | null;
  reason: DrawReason;
};

/** Inspect FEN for checkmate / all FIDE draw classes (50-move, K+N, etc.). */
export function gameTermination(fen: string): GameTermination {
  try {
    const game = new Chess(fen);
    if (game.isCheckmate()) {
      return {
        over: true,
        result: game.turn() === "w" ? "0-1" : "1-0",
        reason: "checkmate",
      };
    }
    if (game.isStalemate()) {
      return { over: true, result: "1/2-1/2", reason: "stalemate" };
    }
    if (game.isInsufficientMaterial()) {
      return { over: true, result: "1/2-1/2", reason: "insufficient" };
    }
    if (game.isThreefoldRepetition()) {
      return { over: true, result: "1/2-1/2", reason: "threefold" };
    }
    if (game.isDraw()) {
      const halfmove = Number(game.fen().split(" ")[4] ?? 0);
      return {
        over: true,
        result: "1/2-1/2",
        reason: halfmove >= 100 ? "fifty" : "stalemate",
      };
    }
    return { over: false, result: null, reason: null };
  } catch {
    return { over: false, result: null, reason: null };
  }
}

/** Fischer (increment) clock: add increment after a legal move. */
export function applyFischerIncrement(remainingMs: number, incrementMs: number): number {
  return Math.max(0, remainingMs) + Math.max(0, incrementMs);
}

export function applyMove(fen: string, move: MoveInput): {
  ok: true;
  fen: string;
  san: string;
  over: boolean;
  result: "1-0" | "0-1" | "1/2-1/2" | null;
  reason: DrawReason;
} | { ok: false; error: string } {
  if (!isChessSquare(move.from) || !isChessSquare(move.to)) {
    return { ok: false, error: "illegal_move" };
  }
  if (move.promotion && !PROMOTIONS.has(move.promotion)) {
    return { ok: false, error: "illegal_move" };
  }
  try {
    const game = new Chess(fen);
    const result = game.move({
      from: move.from as Square,
      to: move.to as Square,
      promotion: move.promotion,
    });
    if (!result) return { ok: false, error: "illegal_move" };

    const term = gameTermination(game.fen());
    return {
      ok: true,
      fen: game.fen(),
      san: result.san,
      over: term.over,
      result: term.result,
      reason: term.reason,
    };
  } catch {
    return { ok: false, error: "illegal_move" };
  }
}

export function isPuzzleSolved(startFen: string, solutionSans: string[], playedSans: string[]): boolean {
  if (playedSans.length < solutionSans.length) return false;
  return solutionSans.every((san, i) => normalizeSan(playedSans[i] ?? "") === normalizeSan(san));
}

function normalizeSan(san: string): string {
  return san.replace(/[+#]/g, "").trim();
}

export function tryPuzzleMove(
  fen: string,
  move: MoveInput,
  expectedSan: string,
): { ok: true; fen: string; san: string } | { ok: false; error: string } {
  const applied = applyMove(fen, move);
  if (!applied.ok) return applied;
  if (normalizeSan(applied.san) !== normalizeSan(expectedSan)) {
    return { ok: false, error: "wrong_move" };
  }
  return { ok: true, fen: applied.fen, san: applied.san };
}

export { Chess };
