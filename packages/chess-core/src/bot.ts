import { Chess, type Move, type Square } from "chess.js";
import { buildOpeningBook, getRepertoire, openingChildren, type OpeningBookEntry } from "./openings.js";

export type BotLevel = "learner" | "club" | "strong";

export type BotMove = {
  from: string;
  to: string;
  promotion?: "q" | "r" | "b" | "n";
  san?: string;
};

export type BotPersonality = "novice" | "club" | "strong";

export type ChooseBotMoveOptions = {
  rng?: () => number;
  /** Position the history starts from (default: the standard start). */
  startFen?: string;
  /** Strong: iterative-deepening time budget in ms (default 600). */
  timeMs?: number;
  /** SAN history from the start position (repetition awareness, opening book). */
  history?: readonly string[];
  /** "Play an opening" mode: follow this repertoire tree (both sides) while in book. */
  openingId?: string;
};

let generatedBook: Map<string, OpeningBookEntry> | null = null;
function repertoireBook(): Map<string, OpeningBookEntry> {
  generatedBook ??= buildOpeningBook();
  return generatedBook;
}

function pick<T>(list: readonly T[], rng: () => number): T | undefined {
  return list.length ? list[Math.floor(rng() * list.length)] : undefined;
}

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


// ── Tapered evaluation ─────────────────────────────────────────────────
// Middlegame tables above; endgame tables below. Phase from material (Fruit/PeSTO weights: N,B=1 R=2 Q=4, max 24).
const KING_EG_TABLE: number[][] = [
  [-50, -30, -30, -30, -30, -30, -30, -50],
  [-30, -20, -10, -10, -10, -10, -20, -30],
  [-30, -10, 20, 25, 25, 20, -10, -30],
  [-30, -10, 25, 35, 35, 25, -10, -30],
  [-30, -10, 25, 35, 35, 25, -10, -30],
  [-30, -10, 20, 25, 25, 20, -10, -30],
  [-30, -20, -10, -10, -10, -10, -20, -30],
  [-50, -30, -30, -30, -30, -30, -30, -50],
];
const PAWN_EG_TABLE: number[][] = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [5, 5, 5, 5, 5, 5, 5, 5],
  [10, 10, 10, 10, 10, 10, 10, 10],
  [20, 20, 20, 20, 20, 20, 20, 20],
  [35, 35, 35, 35, 35, 35, 35, 35],
  [60, 60, 60, 60, 60, 60, 60, 60],
  [100, 100, 100, 100, 100, 100, 100, 100],
  [0, 0, 0, 0, 0, 0, 0, 0],
];
const PHASE_WEIGHT: Record<string, number> = { p: 0, n: 1, b: 1, r: 2, q: 4, k: 0 };
const MAX_PHASE = 24;
const MATE = 100_000;

/** Game phase 0 (bare endgame) … 24 (all pieces). */
export function gamePhase(chess: Chess): number {
  let phase = 0;
  for (const row of chess.board()) for (const pc of row) if (pc) phase += PHASE_WEIGHT[pc.type] ?? 0;
  return Math.min(MAX_PHASE, phase);
}

/**
 * Static evaluation from White's view: material + tapered piece-square tables.
 * No move generation (cheap enough for search leaves).
 */
export function staticEval(chess: Chess): number {
  const board = chess.board();
  let mg = 0;
  let eg = 0;
  let phase = 0;
  let whiteMat = 0;
  let blackMat = 0;
  const kings: Record<"w" | "b", [number, number]> = { w: [0, 0], b: [0, 0] };
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const pc = board[r]![c];
      if (!pc) continue;
      const rankIndex = 7 - r;
      const pRank = pc.color === "w" ? rankIndex : 7 - rankIndex;
      const v = PIECE_VALUES[pc.type] ?? 0;
      phase += PHASE_WEIGHT[pc.type] ?? 0;
      const mgPst = PST_MAP[pc.type]?.[pRank]?.[c] ?? 0;
      const egPst =
        pc.type === "k" ? (KING_EG_TABLE[pRank]?.[c] ?? 0) : pc.type === "p" ? (PAWN_EG_TABLE[pRank]?.[c] ?? 0) : mgPst;
      const sign = pc.color === "w" ? 1 : -1;
      if (pc.type !== "k") {
        mg += sign * (v + mgPst);
        eg += sign * (v + egPst);
        if (pc.color === "w") whiteMat += v;
        else blackMat += v;
      } else {
        mg += sign * mgPst;
        eg += sign * egPst;
        kings[pc.color] = [r, c];
      }
    }
  }
  phase = Math.min(MAX_PHASE, phase);
  let score = Math.round((mg * phase + eg * (MAX_PHASE - phase)) / MAX_PHASE);
  // Mop-up: with a clear material edge in the endgame, push the lone king to the edge and bring ours closer.
  if (phase <= 6 && Math.abs(whiteMat - blackMat) >= 300) {
    const strong = whiteMat > blackMat ? "w" : "b";
    const weak = strong === "w" ? "b" : "w";
    const [wr, wc] = kings[weak];
    const [sr, sc] = kings[strong];
    const centre = Math.max(3 - wr, wr - 4) + Math.max(3 - wc, wc - 4);
    const dist = Math.abs(wr - sr) + Math.abs(wc - sc);
    const mop = 10 * centre + 4 * (14 - dist);
    score += strong === "w" ? mop : -mop;
  }
  return score;
}

export function evaluateBoard(chess: Chess): number {
  if (chess.isCheckmate()) {
    return chess.turn() === "w" ? -MATE : MATE;
  }
  if (chess.isDraw() || chess.isStalemate()) {
    return 0;
  }
  let score = staticEval(chess);
  if (chess.inCheck()) score += chess.turn() === "w" ? -40 : 40;
  return score;
}

/** Light move: SAN plus what ordering needs (no verbose Move objects — they are ~20× slower in chess.js). */
type LMove = { san: string; capture: string | null; piece: string; promo: string | null; check: boolean };

const TARGET_RE = /([a-h][1-8])(?:=[NBRQ])?[+#]?$/;

function lightMoves(chess: Chess): LMove[] {
  const out: LMove[] = [];
  for (const san of chess.moves()) {
    const piece = /^[NBRQK]/.test(san) ? san[0]!.toLowerCase() : san.startsWith("O") ? "k" : "p";
    let capture: string | null = null;
    if (san.includes("x")) {
      const sq = TARGET_RE.exec(san)?.[1];
      capture = (sq ? chess.get(sq as Square)?.type : undefined) ?? "p"; // empty target = en passant
    }
    const promo = /=([NBRQ])/.exec(san)?.[1]?.toLowerCase() ?? null;
    out.push({ san, capture, piece, promo, check: san.includes("+") || san.includes("#") });
  }
  return out;
}

function moveOrderScore(m: LMove): number {
  let s = 0;
  if (m.capture) s += 10_000 + (PIECE_VALUES[m.capture] ?? 0) * 10 - (PIECE_VALUES[m.piece] ?? 0);
  if (m.promo) s += 9_000 + (PIECE_VALUES[m.promo] ?? 0);
  if (m.check) s += 500;
  return s;
}

function orderMoves(moves: LMove[], first?: string): LMove[] {
  return moves
    .map((m) => ({ m, s: (first && m.san === first ? 1_000_000 : 0) + moveOrderScore(m) }))
    .sort((a, b) => b.s - a.s)
    .map((x) => x.m);
}

type TtEntry = { depth: number; score: number; flag: 0 | 1 | 2; best?: string };

type SearchCtx = {
  deadline: number;
  aborted: boolean;
  nodes: number;
  qDepth: number;
  tt: Map<string, TtEntry> | null;
  /** Positions already seen in the game (Zobrist hash → count; repetition → draw). */
  seen: Map<string, number>;
  path: string[];
};

class SearchAborted extends Error {}

function sideEval(chess: Chess): number {
  const e = staticEval(chess);
  return chess.turn() === "w" ? e : -e;
}

/** Quiescence: captures and promotions only, MVV-LVA ordered, stand-pat, delta pruning, limited depth. */
function quiesce(chess: Chess, alpha: number, beta: number, qdepth: number, ctx: SearchCtx): number {
  ctx.nodes += 1;
  const stand = sideEval(chess);
  if (qdepth <= 0) return stand;
  if (stand >= beta) return beta;
  if (stand > alpha) alpha = stand;
  const noisy = lightMoves(chess).filter((m) => m.capture || m.promo);
  for (const m of orderMoves(noisy)) {
    // Delta pruning: even winning this piece cannot lift us to alpha.
    const gain = (m.capture ? (PIECE_VALUES[m.capture] ?? 0) : 0) + (m.promo ? 800 : 0);
    if (stand + gain + 200 < alpha) continue;
    chess.move(m.san);
    const score = -quiesce(chess, -beta, -alpha, qdepth - 1, ctx);
    chess.undo();
    if (score >= beta) return beta;
    if (score > alpha) alpha = score;
  }
  return alpha;
}

function negamax(chess: Chess, depth: number, alpha: number, beta: number, ply: number, ctx: SearchCtx): number {
  ctx.nodes += 1;
  if ((ctx.nodes & 255) === 0 && Date.now() > ctx.deadline) {
    ctx.aborted = true;
    throw new SearchAborted();
  }
  const key = chess.hash();
  if (ply > 0 && (ctx.path.includes(key) || (ctx.seen.get(key) ?? 0) >= 2)) return 0;
  const moves = lightMoves(chess);
  if (moves.length === 0) return chess.inCheck() ? -(MATE - ply) : 0;
  if (chess.isDrawByFiftyMoves() || chess.isInsufficientMaterial()) return 0;
  if (depth <= 0) return quiesce(chess, alpha, beta, ctx.qDepth, ctx);

  const alpha0 = alpha;
  const tte = ctx.tt?.get(key);
  if (tte && tte.depth >= depth && Math.abs(tte.score) < MATE - 1000) {
    if (tte.flag === 0) return tte.score;
    if (tte.flag === 1 && tte.score >= beta) return tte.score;
    if (tte.flag === 2 && tte.score <= alpha) return tte.score;
  }
  let best = -Infinity;
  let bestSan: string | undefined;
  ctx.path.push(key);
  try {
    for (const m of orderMoves(moves, tte?.best)) {
      chess.move(m.san);
      let score: number;
      try {
        score = -negamax(chess, depth - 1, -beta, -alpha, ply + 1, ctx);
      } finally {
        chess.undo();
      }
      if (score > best) {
        best = score;
        bestSan = m.san;
      }
      if (score > alpha) alpha = score;
      if (alpha >= beta) break;
    }
  } finally {
    ctx.path.pop();
  }
  if (ctx.tt) {
    const flag: 0 | 1 | 2 = best <= alpha0 ? 2 : best >= beta ? 1 : 0;
    ctx.tt.set(key, { depth, score: best, flag, best: bestSan });
    if (ctx.tt.size > 200_000) ctx.tt.clear();
  }
  return best;
}

type RootScore = { move: Move; score: number };

/** Score every root move (side-to-move view). Iterative deepening until `maxDepth` or the deadline. */
function searchRoot(
  game: Chess,
  opts: { maxDepth: number; qDepth: number; timeMs: number; useTt: boolean; seen: Map<string, number> },
): RootScore[] {
  const ctx: SearchCtx = {
    deadline: Date.now() + opts.timeMs,
    aborted: false,
    nodes: 0,
    qDepth: opts.qDepth,
    tt: opts.useTt ? new Map() : null,
    seen: opts.seen,
    path: [game.hash()],
  };
  const verbose = new Map(game.moves({ verbose: true }).map((m) => [m.san, m]));
  let order = orderMoves(lightMoves(game));
  let completed: RootScore[] = order.map((m) => ({ move: verbose.get(m.san)!, score: 0 }));
  for (let depth = 1; depth <= opts.maxDepth; depth += 1) {
    const scored: { m: LMove; score: number }[] = [];
    let alpha = -Infinity;
    try {
      for (const m of order) {
        game.move(m.san);
        try {
          const repeated = (opts.seen.get(game.hash()) ?? 0) >= 2;
          let score: number;
          if (repeated) score = 0;
          else if (opts.useTt && alpha !== -Infinity) {
            // Strong: null window after the first move (only the best score matters); exact re-search when it beats alpha.
            score = -negamax(game, depth - 1, -alpha - 1, -alpha, 1, ctx);
            if (score > alpha) score = -negamax(game, depth - 1, -Infinity, Infinity, 1, ctx);
          } else {
            // Club keeps exact scores for every move (it picks among near-best moves).
            score = -negamax(game, depth - 1, -Infinity, Infinity, 1, ctx);
          }
          scored.push({ m, score });
          if (score > alpha) alpha = score;
        } finally {
          game.undo();
        }
      }
    } catch (e) {
      if (e instanceof SearchAborted) break;
      throw e;
    }
    scored.sort((a, b) => b.score - a.score);
    completed = scored.map((x) => ({ move: verbose.get(x.m.san)!, score: x.score }));
    order = scored.map((x) => x.m);
    if (scored[0] && scored[0].score >= MATE - 100) break;
    if (Date.now() > ctx.deadline) break;
  }
  return completed;
}

/** Positions of the game so far, for repetition awareness. */
function seenPositions(startFen: string | undefined, history: readonly string[] | undefined): Map<string, number> {
  const seen = new Map<string, number>();
  if (!history?.length) return seen;
  try {
    const g = startFen && startFen !== "startpos" ? new Chess(startFen) : new Chess();
    const add = () => {
      const k = g.hash();
      seen.set(k, (seen.get(k) ?? 0) + 1);
    };
    add();
    for (const san of history) {
      g.move(san);
      add();
    }
  } catch {
    return new Map();
  }
  return seen;
}

function normalizeLevel(level: BotLevel | string): BotLevel {
  const l = (level || "").toLowerCase().trim();
  if (l === "learner" || l === "novice") return "learner";
  if (l === "club" || l === "strong") return l;
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

/** Analyse a position at a fixed depth (tests and tooling). Score is from the side to move. */
export function analysePosition(fen: string, depth: number, qDepth = 6): { bestSan: string; score: number } | null {
  try {
    const g = new Chess(fen);
    if (g.isGameOver()) return null;
    const r = searchRoot(g, { maxDepth: depth, qDepth, timeMs: 60_000, useTt: true, seen: new Map() });
    return r[0] ? { bestSan: r[0].move.san, score: r[0].score } : null;
  } catch {
    return null;
  }
}

export type ChooseBotMoveInput = ChooseBotMoveOptions & {
  fen: string;
  level?: BotLevel | string;
  personality?: BotPersonality;
};

/**
 * Pick the bot's move. Call as `chooseBotMove(fen, level, options)` or
 * `chooseBotMove({ fen, history, level, personality })`.
 *
 * - learner / novice: 1-ply with a hanging-piece check; ~25% of moves are human slips
 *   chosen among the 5 most plausible moves (noisy static eval, no recapture check).
 * - club: depth 2 + quiescence; sometimes picks a near-best move; in endgames slips more.
 * - strong: iterative deepening (≤ 5 plies, ~600 ms) with quiescence, tapered eval and a transposition table.
 */
export function chooseBotMove(
  fenOrInput: string | ChooseBotMoveInput,
  levelInput?: BotLevel | string,
  maybeOptions?: ChooseBotMoveOptions,
): BotMove | null {
  const input: ChooseBotMoveInput =
    typeof fenOrInput === "string" ? { ...(maybeOptions ?? {}), fen: fenOrInput, level: levelInput } : fenOrInput;
  const fen = input.fen;
  const options = input;
  const rng = options.rng ?? Math.random;
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

  const level = normalizeLevel(input.personality ?? input.level ?? "club");


  // 1a. "Play an opening": follow the chosen repertoire tree by history.
  if (options?.openingId && options.history) {
    const rep = getRepertoire(options.openingId);
    const children = rep ? openingChildren(rep, options.history) : null;
    if (children?.length) {
      const pool = level === "learner" && children.some((c) => c.mainline) ? children.filter((c) => c.mainline) : children;
      const weighted = pool.flatMap((c) => Array.from({ length: c.weight }, () => c.san));
      const san = pick(weighted, rng);
      const m = san ? legalMoves.find((x) => x.san === san) : undefined;
      if (m) return toBotMove(m);
    }
  }

  // 1b. Opening book: repertoire trees (learner — main lines only), then the static seed book.
  const fenKey = fen.trim().split(/\s+/).slice(0, 4).join(" ");
  const treeEntry = repertoireBook().get(fenKey);
  if (treeEntry) {
    const san = pick(level === "learner" && treeEntry.mainline.length ? treeEntry.mainline : treeEntry.all, rng);
    const m = san ? legalMoves.find((x) => x.san === san) : undefined;
    if (m) return toBotMove(m);
  }
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
    // ~1 in 4: a human slip — one of the 5 most plausible moves by a noisy static look,
    // without checking recaptures (leaves pieces hanging, misses forks).
    if (rng() < 0.25) {
      const plausible = legalMoves
        .map((m) => {
          game.move(m);
          const e = staticEval(game);
          game.undo();
          return { m, s: (isWhite ? e : -e) + (rng() - 0.5) * 120 };
        })
        .sort((a, b) => b.s - a.s)
        .slice(0, 5);
      const slip = plausible[Math.floor(rng() * plausible.length)] ?? plausible[0]!;
      return toBotMove(slip.m);
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

  // 3. Club & Strong: negamax + quiescence (+ TT and iterative deepening for Strong).
  const seen = seenPositions(options.startFen, options.history);
  const scoredMoves =
    level === "strong"
      ? searchRoot(game, { maxDepth: 5, qDepth: 6, timeMs: options.timeMs ?? 600, useTt: true, seen })
      : searchRoot(game, { maxDepth: 2, qDepth: 4, timeMs: options.timeMs ?? 400, useTt: false, seen });
  if (scoredMoves.length === 0) return null;
  const bestScore = scoredMoves[0]!.score;

  // Forced mate or overwhelming advantage: always play the best move.
  if (bestScore >= 50_000) {
    return toBotMove(scoredMoves[0]!.move);
  }

  if (level === "club") {
    // Near-best alternatives ~35% of the time; in endgames the club player is sloppier (≤ 60 cp, 50%).
    const endgame = gamePhase(game) <= 6;
    const margin = endgame ? 60 : 35;
    const close = scoredMoves.filter((sm) => sm.score >= bestScore - margin);
    if (close.length > 1 && rng() < (endgame ? 0.5 : 0.35)) {
      return toBotMove(close[1 + Math.floor(rng() * (close.length - 1))]!.move);
    }
  }

  return toBotMove(scoredMoves[0]!.move);
}
