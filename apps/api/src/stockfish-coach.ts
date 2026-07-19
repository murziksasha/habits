/**
 * Chess coach: lightweight evaluation + best-move hint.
 * Uses material + mobility heuristics (no external Stockfish binary required).
 * Optional STOCKFISH_PATH can be wired later for full UCI engine.
 */
import { Chess, type Move, type Square } from "chess.js";

const PIECE_VALUE: Record<string, number> = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 0,
};

function materialScore(chess: Chess): number {
  let score = 0;
  const board = chess.board();
  for (const row of board) {
    for (const cell of row) {
      if (!cell) continue;
      const v = PIECE_VALUE[cell.type] ?? 0;
      score += cell.color === "w" ? v : -v;
    }
  }
  return score;
}

function evaluate(chess: Chess): number {
  if (chess.isCheckmate()) {
    return chess.turn() === "w" ? -100_000 : 100_000;
  }
  if (chess.isDraw() || chess.isStalemate()) return 0;
  let score = materialScore(chess);
  const moves = chess.moves().length;
  score += chess.turn() === "w" ? moves * 2 : -moves * 2;
  if (chess.inCheck()) {
    score += chess.turn() === "w" ? -40 : 40;
  }
  return score;
}

function minimax(chess: Chess, depth: number, maximizing: boolean): number {
  if (depth === 0 || chess.isGameOver()) {
    return evaluate(chess);
  }
  const moves = chess.moves({ verbose: true });
  if (maximizing) {
    let best = -Infinity;
    for (const m of moves) {
      chess.move(m);
      best = Math.max(best, minimax(chess, depth - 1, false));
      chess.undo();
    }
    return best;
  }
  let best = Infinity;
  for (const m of moves) {
    chess.move(m);
    best = Math.min(best, minimax(chess, depth - 1, true));
    chess.undo();
  }
  return best;
}

export type CoachHint = {
  bestMove: { from: string; to: string; san: string; promotion?: string } | null;
  evalCp: number; // centipawns from white POV
  depth: number;
  commentUk: string;
  commentEn: string;
};

export function getCoachHint(fen: string, depth = 2): CoachHint {
  const chess = new Chess(fen);
  if (chess.isGameOver()) {
    return {
      bestMove: null,
      evalCp: evaluate(chess),
      depth,
      commentUk: "Гра завершена.",
      commentEn: "Game is over.",
    };
  }

  const maximizing = chess.turn() === "w";
  const moves = chess.moves({ verbose: true }) as Move[];
  let best: Move | null = null;
  let bestScore = maximizing ? -Infinity : Infinity;

  for (const m of moves) {
    chess.move(m);
    const score = minimax(chess, Math.max(0, depth - 1), !maximizing);
    chess.undo();
    if (maximizing ? score > bestScore : score < bestScore) {
      bestScore = score;
      best = m;
    }
  }

  const evalCp = bestScore;
  let commentUk = "Спокійний розвиток.";
  let commentEn = "Quiet development.";
  if (best) {
    if (best.captured) {
      commentUk = "Взяття — сильний тактичний хід.";
      commentEn = "A capture — strong tactical idea.";
    } else if (best.san.includes("+") || best.san.includes("#")) {
      commentUk = "Шах! Тримайте ініціативу.";
      commentEn = "Check! Keep the initiative.";
    } else if (Math.abs(evalCp) > 200) {
      commentUk = evalCp > 0 ? "Білі краще." : "Чорні краще.";
      commentEn = evalCp > 0 ? "White is better." : "Black is better.";
    }
  }

  return {
    bestMove: best
      ? {
          from: best.from,
          to: best.to,
          san: best.san,
          promotion: best.promotion,
        }
      : null,
    evalCp,
    depth,
    commentUk,
    commentEn,
  };
}

/** Validate client move against legal moves */
export function isLegalMove(fen: string, from: string, to: string, promotion?: string): boolean {
  try {
    const chess = new Chess(fen);
    const m = chess.move({
      from: from as Square,
      to: to as Square,
      promotion: promotion as "q" | "r" | "b" | "n" | undefined,
    });
    return Boolean(m);
  } catch {
    return false;
  }
}
