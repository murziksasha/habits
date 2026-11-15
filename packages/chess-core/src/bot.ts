import { Chess, type Move, type Square } from "chess.js";

export type BotLevel = "learner" | "club" | "strong";

export type BotMove = {
  from: string;
  to: string;
  promotion?: "q" | "r" | "b" | "n";
  san?: string;
};

export type ChooseBotMoveOptions = {
  rng?: () => number;
};

const PIECE_VALUES: Record<string, number> = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 20000,
};

// 8x8 tables from White's perspective: rank 0 is rank 1 (a1..h1), rank 7 is rank 8 (a8..h8)
const PAWN_TABLE: number[][] = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [5, 10, 10, -10, -10, 10, 10, 5],
  [5, -5, 10, 15, 15, 5, -5, 5],
  [0, 0, 15, 25, 25, 10, 0, 0],
  [5, 5, 15, 25, 25, 15, 5, 5],
  [10, 10, 20, 25, 25, 20, 10, 10],
  [50, 50, 50, 50, 50, 50, 50, 50],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

const KNIGHT_TABLE: number[][] = [
  [-20, -10, -10, -10, -10, -10, -10, -20],
  [-10, 5, 10, 10, 10, 10, 5, -10],
  [-10, 10, 15, 20, 20, 15, 10, -10],
  [-10, 10, 20, 25, 25, 20, 10, -10],
  [-10, 10, 20, 25, 25, 20, 10, -10],
  [-10, 10, 15, 20, 20, 15, 10, -10],
  [-10, 5, 10, 10, 10, 10, 5, -10],
  [-20, -10, -10, -10, -10, -10, -10, -20],
];

const BISHOP_TABLE: number[][] = [
  [-10, -5, -5, -5, -5, -5, -5, -10],
  [-5, 10, 5, 5, 5, 5, 10, -5],
  [-5, 5, 10, 15, 15, 10, 5, -5],
  [-5, 5, 15, 15, 15, 15, 5, -5],
  [-5, 5, 15, 15, 15, 15, 5, -5],
  [-5, 5, 10, 15, 15, 10, 5, -5],
  [-5, 10, 5, 5, 5, 5, 10, -5],
  [-10, -5, -5, -5, -5, -5, -5, -10],
];

const ROOK_TABLE: number[][] = [
  [0, 0, 5, 10, 10, 5, 0, 0],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [15, 20, 20, 20, 20, 20, 20, 15],
  [0, 0, 5, 10, 10, 5, 0, 0],
];

const QUEEN_TABLE: number[][] = [
  [-10, -5, -5, 0, 0, -5, -5, -10],
  [-5, 0, 5, 5, 5, 5, 0, -5],
  [-5, 5, 10, 10, 10, 10, 5, -5],
  [0, 5, 10, 15, 15, 10, 5, 0],
  [0, 5, 10, 15, 15, 10, 5, 0],
  [-5, 5, 10, 10, 10, 10, 5, -5],
  [-5, 0, 5, 5, 5, 5, 0, -5],
  [-10, -5, -5, 0, 0, -5, -5, -10],
];

const KING_TABLE: number[][] = [
  [20, 30, 10, 0, 0, 10, 30, 20],
  [15, 20, 0, 0, 0, 0, 20, 15],
  [-10, -20, -20, -20, -20, -20, -20, -10],
  [-20, -30, -30, -40, -40, -30, -30, -20],
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-30, -40, -40, -50, -50, -40, -40, -30],
];

const PST_MAP: Record<string, number[][]> = {
  p: PAWN_TABLE,
  n: KNIGHT_TABLE,
  b: BISHOP_TABLE,
  r: ROOK_TABLE,
  q: QUEEN_TABLE,
  k: KING_TABLE,
};

// Opening book indexed by the first 4 tokens of FEN: "pieces turn castling ep"
const OPENING_BOOK: Record<string, Record<BotLevel, string[]>> = {
  // Start position (White to move)
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -": {
    learner: ["e2e4", "d2d4"],
    club: ["e2e4", "d2d4", "c2c4", "g1f3"],
    strong: ["e2e4", "d2d4", "c2c4", "g1f3"],
  },
  // 1. e4 (Black to move)
  "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3": {
    learner: ["e7e5", "c7c5"],
    club: ["c7c5", "e7e5", "e7e6", "c7c6"],
    strong: ["c7c5", "e7e5", "e7e6", "c7c6"],
  },
  // 1. d4 (Black to move)
  "rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3": {
    learner: ["d7d5", "g8f6"],
    club: ["g8f6", "d7d5", "e7e6"],
    strong: ["g8f6", "d7d5"],
  },
  // 1. c4 (Black to move)
  "rnbqkbnr/pppppppp/8/8/2P5/8/PP1PPPPP/RNBQKBNR b KQkq c3": {
    learner: ["e7e5", "c7c5"],
    club: ["e7e5", "c7c5", "g8f6"],
    strong: ["e7e5", "c7c5", "g8f6"],
  },
  // 1. Nf3 (Black to move)
  "rnbqkbnr/pppppppp/8/8/8/5N2/PPPPPPPP/RNBQKB1R b KQkq -": {
    learner: ["d7d5", "g8f6"],
    club: ["d7d5", "g8f6"],
    strong: ["d7d5", "g8f6"],
  },
};

export function evaluateBoard(chess: Chess): number {
  if (chess.isCheckmate()) {
    return chess.turn() === "w" ? -100_000 : 100_000;
  }
  if (chess.isDraw() || chess.isStalemate()) {
    return 0;
  }

  let score = 0;
  const board = chess.board();
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (!piece) continue;
      const v = PIECE_VALUES[piece.type] ?? 0;
      // In chess.js, row 0 is rank 8, row 7 is rank 1
      const rankIndex = 7 - r; // 0 for rank 1, 7 for rank 8
      const fileIndex = c;

      let pst = 0;
      const table = PST_MAP[piece.type];
      if (table) {
        const pRank = piece.color === "w" ? rankIndex : 7 - rankIndex;
        pst = table[pRank]?.[fileIndex] ?? 0;
      }

      const totalPieceScore = v + pst;
      score += piece.color === "w" ? totalPieceScore : -totalPieceScore;
    }
  }

  // Mobility bonus (2 cp per legal move)
  const movesCount = chess.moves().length;
  score += chess.turn() === "w" ? movesCount * 2 : -movesCount * 2;

  // In-check penalty
  if (chess.inCheck()) {
    score += chess.turn() === "w" ? -40 : 40;
  }

  return score;
}

function orderMoves(moves: Move[]): Move[] {
  return moves.slice().sort((a, b) => {
    // 1. Captures first (MVV-LVA)
    const aCap = a.captured
      ? (PIECE_VALUES[a.captured] ?? 0) * 10 - (PIECE_VALUES[a.piece] ?? 0)
      : -1;
    const bCap = b.captured
      ? (PIECE_VALUES[b.captured] ?? 0) * 10 - (PIECE_VALUES[b.piece] ?? 0)
      : -1;
    if (aCap !== bCap) return bCap - aCap;

    // 2. Promotions
    if (a.promotion && !b.promotion) return -1;
    if (!a.promotion && b.promotion) return 1;

    // 3. Checks
    const aCheck = a.san.includes("+") || a.san.includes("#");
    const bCheck = b.san.includes("+") || b.san.includes("#");
    if (aCheck && !bCheck) return -1;
    if (!aCheck && bCheck) return 1;

    return 0;
  });
}

function alphaBeta(
  chess: Chess,
  depth: number,
  alpha: number,
  beta: number,
  maximizing: boolean,
): number {
  if (depth === 0 || chess.isGameOver()) {
    return evaluateBoard(chess);
  }

  const moves = orderMoves(chess.moves({ verbose: true }));
  if (moves.length === 0) {
    return evaluateBoard(chess);
  }

  if (maximizing) {
    let maxEval = -Infinity;
    for (const m of moves) {
      chess.move(m);
      const evalScore = alphaBeta(chess, depth - 1, alpha, beta, false);
      chess.undo();
      maxEval = Math.max(maxEval, evalScore);
      alpha = Math.max(alpha, evalScore);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const m of moves) {
      chess.move(m);
      const evalScore = alphaBeta(chess, depth - 1, alpha, beta, true);
      chess.undo();
      minEval = Math.min(minEval, evalScore);
      beta = Math.min(beta, evalScore);
      if (beta <= alpha) break;
    }
    return minEval;
  }
}

function normalizeLevel(level: BotLevel | string): BotLevel {
  const l = (level || "").toLowerCase().trim();
  if (l === "learner" || l === "club" || l === "strong") return l;
  return "club";
}

function toBotMove(m: Move): BotMove {
  return {
    from: m.from,
    to: m.to,
    promotion: m.promotion as "q" | "r" | "b" | "n" | undefined,
    san: m.san,
  };
}

export function chooseBotMove(
  fen: string,
  levelInput: BotLevel | string,
  options?: ChooseBotMoveOptions,
): BotMove | null {
  const rng = options?.rng ?? Math.random;
  let game: Chess;
  try {
    if (!fen || typeof fen !== "string") return null;
    game = new Chess(fen);
  } catch {
    return null;
  }

  if (game.isGameOver()) return null;

  const legalMoves = game.moves({ verbose: true });
  if (!legalMoves.length) return null;

  const level = normalizeLevel(levelInput);

  // 1. Opening book
  const fenKey = fen.trim().split(/\s+/).slice(0, 4).join(" ");
  const bookEntry = OPENING_BOOK[fenKey]?.[level];
  if (bookEntry && bookEntry.length > 0) {
    const choice = bookEntry[Math.floor(rng() * bookEntry.length)];
    const matchingMove = legalMoves.find(
      (m) => `${m.from}${m.to}` === choice || m.san === choice,
    );
    if (matchingMove) {
      return toBotMove(matchingMove);
    }
  }

  const turn = game.turn();
  const isWhite = turn === "w";

  // 2. Learner: One ply. Takes hanging piece when seen, else developing/central. ~1/4 random blunder.
  if (level === "learner") {
    // 1 in 4 random legal move
    if (rng() < 0.25) {
      const randomMove = legalMoves[Math.floor(rng() * legalMoves.length)];
      return toBotMove(randomMove);
    }

    // 1-ply evaluation
    type Candidate = { move: Move; score: number };
    const scored: Candidate[] = [];

    for (const m of legalMoves) {
      game.move(m);
      const evalScore = evaluateBoard(game);
      const oppMoves = game.moves({ verbose: true });
      game.undo();

      // Check if moving piece lands on an attacked square
      const recaptures = oppMoves.filter((om) => om.to === m.to);
      let penalty = 0;
      if (recaptures.length > 0) {
        const movedPieceVal = PIECE_VALUES[m.piece] ?? 100;
        const capturedVal = m.captured ? PIECE_VALUES[m.captured] ?? 0 : 0;
        // If we gave up a piece without sufficient material compensation
        if (movedPieceVal > capturedVal) {
          penalty = (movedPieceVal - capturedVal) * 5;
        }
      }

      // Reward taking an undefended hanging piece
      let hangingBonus = 0;
      if (m.captured && recaptures.length === 0) {
        hangingBonus = (PIECE_VALUES[m.captured] ?? 100) * 8;
      }

      const perspectiveScore = isWhite ? evalScore : -evalScore;
      const totalScore = perspectiveScore + hangingBonus - penalty;
      scored.push({ move: m, score: totalScore });
    }

    scored.sort((a, b) => b.score - a.score);
    return toBotMove(scored[0].move);
  }

  // 3. Club & Strong: Alpha-beta minimax with captures-first ordering
  const depth = level === "strong" ? 3 : 2;
  const ordered = orderMoves(legalMoves);

  type Scored = { move: Move; score: number };
  const scoredMoves: Scored[] = [];

  for (const m of ordered) {
    game.move(m);
    // Depth is depth - 1 because we already made move m
    const score = alphaBeta(
      game,
      depth - 1,
      -Infinity,
      Infinity,
      !isWhite, // next turn is opponent
    );
    game.undo();

    // Score from perspective of the side to move (higher is always better)
    const perspectiveScore = isWhite ? score : -score;
    scoredMoves.push({ move: m, score: perspectiveScore });
  }

  scoredMoves.sort((a, b) => b.score - a.score);

  if (scoredMoves.length === 0) return null;

  const bestScore = scoredMoves[0].score;

  // Immediate mate or overwhelming advantage: always play best move
  if (bestScore >= 50_000) {
    return toBotMove(scoredMoves[0].move);
  }

  // Club: among moves close to best score (within 35 cp), sometimes pick second-best (~35% chance)
  if (level === "club") {
    const closeCandidates = scoredMoves.filter((sm) => sm.score >= bestScore - 35);
    if (closeCandidates.length > 1 && rng() < 0.35) {
      return toBotMove(closeCandidates[1].move);
    }
  }

  // Strong: almost no noise (if top moves tied within 3 cp, pick among them, else best)
  return toBotMove(scoredMoves[0].move);
}

