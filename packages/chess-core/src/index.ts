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

export type CheckAttacker = {
  square: Square;
  type: "p" | "n" | "b" | "r" | "q" | "k";
};

export type CheckInfo = {
  inCheck: boolean;
  king: Square | null;
  attackers: CheckAttacker[];
  double: boolean;
};

export type Destination = {
  to: Square;
  capture: boolean;
};

/**
 * Return check info for the side to move.
 * Uses chess.js attackers() against the king square of the side to move.
 */
export function checkInfo(fen: string): CheckInfo {
  try {
    const game = new Chess(fen);
    const inCheck = game.inCheck();
    if (!inCheck) {
      return { inCheck: false, king: null, attackers: [], double: false };
    }
    const turn = game.turn();
    const kings = game.findPiece({ type: "k", color: turn });
    const kingSquare = kings[0] ?? null;
    if (!kingSquare) {
      return { inCheck: true, king: null, attackers: [], double: false };
    }
    const opponentColor = turn === "w" ? "b" : "w";
    const attackerSquares = game.attackers(kingSquare, opponentColor);
    const attackers: CheckAttacker[] = [];
    for (const sq of attackerSquares) {
      const piece = game.get(sq);
      if (piece) {
        attackers.push({ square: sq, type: piece.type });
      }
    }
    return {
      inCheck: true,
      king: kingSquare,
      attackers,
      double: attackers.length > 1,
    };
  } catch {
    return { inCheck: false, king: null, attackers: [], double: false };
  }
}

/**
 * Legal destinations for a piece of the side to move.
 * Deduplicates multiple promotion variants into a single destination.
 */
export function destinations(fen: string, square: string): Destination[] {
  if (!isChessSquare(square)) return [];
  try {
    const game = new Chess(fen);
    const piece = game.get(square as Square);
    if (!piece || piece.color !== game.turn()) {
      return [];
    }
    const verboseMoves = game.moves({ verbose: true, square: square as Square });
    const seen = new Set<Square>();
    const result: Destination[] = [];
    for (const m of verboseMoves) {
      if (!seen.has(m.to)) {
        seen.add(m.to);
        const isCap = Boolean(
          (typeof m.isCapture === "function" && m.isCapture()) ||
          (typeof m.isEnPassant === "function" && m.isEnPassant()) ||
          m.captured !== undefined ||
          (typeof m.flags === "string" && (m.flags.includes("c") || m.flags.includes("e")))
        );
        result.push({ to: m.to, capture: isCap });
      }
    }
    return result;
  } catch {
    return [];
  }
}

/**
 * Destinations for pieces of either color on diagrams/exploration.
 * When square is not the side to move, swaps the FEN active turn.
 * If chess.js rejects the swapped FEN or the side not to move is in check, returns [].
 */
export function exploreDestinations(fen: string, square: string): Destination[] {
  if (!isChessSquare(square)) return [];
  try {
    const game = new Chess(fen);
    const piece = game.get(square as Square);
    if (!piece) return [];
    if (piece.color === game.turn()) {
      return destinations(fen, square);
    }
    const parts = fen.trim().split(/\s+/);
    if (parts.length < 2) return [];
    parts[1] = piece.color;
    if (parts[3] && parts[3] !== "-") {
      parts[3] = "-";
    }
    const swappedFen = parts.join(" ");
    const swappedGame = new Chess(swappedFen);
    const otherColor = piece.color === "w" ? "b" : "w";
    const otherKing = swappedGame.findPiece({ type: "k", color: otherColor })[0];
    if (otherKing && swappedGame.isAttacked(otherKing, piece.color)) {
      return [];
    }
    return destinations(swappedFen, square);
  } catch {
    return [];
  }
}

export { Chess, type Square };
export * from "./bot.js";

