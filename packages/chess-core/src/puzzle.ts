import { Chess, type Square } from "chess.js";

/**
 * Puzzle engine shared by the web client and the server grader.
 *
 * Line convention: `solutionSans[0]` is the learner's move, `[1]` the opponent's
 * reply, `[2]` the learner again, and so on. Even plies belong to the learner.
 */

export type PuzzleGoal = "mate" | "win_material" | "draw" | "promote" | "best_move";

export type PuzzleSpec = {
  fen: string;
  solutionSans: string[];
  goal?: PuzzleGoal;
  /** Learner ply index → other SANs that also reach the goal (computed offline). */
  acceptedAlternatives?: Record<string | number, string[]>;
  /** Full alternative lines (learner + opponent plies), computed offline. Max 3. */
  alternativeLines?: string[][];
};

export type PuzzleMoveInput =
  | string
  | { from: string; to: string; promotion?: "q" | "r" | "b" | "n" };

export type PuzzleMoveResult =
  | {
      ok: true;
      /** SAN the learner actually played (chess.js canonical form). */
      san: string;
      /** FEN after the learner's move. */
      fen: string;
      /** Opponent reply to auto-play, if the line continues. */
      nextOpponentSan?: string;
      /** True when the puzzle is solved after this move. */
      done: boolean;
      /** True when the learner left the main line through an accepted alternative. */
      alternative: boolean;
    }
  | { ok: false; reason: "illegal" | "wrong" | "not_your_turn" | "finished" };

export function normalizeSan(san: string): string {
  return san.replace(/[+#!?]/g, "").trim();
}

function sameSan(a: string, b: string): boolean {
  return normalizeSan(a) === normalizeSan(b);
}

/** All candidate lines: main line first, then alternatives. */
export function puzzleLines(puzzle: PuzzleSpec): string[][] {
  const alts = (puzzle.alternativeLines ?? []).filter((l) => Array.isArray(l) && l.length > 0);
  return [puzzle.solutionSans, ...alts.slice(0, 3)];
}

function prefixMatches(line: string[], played: string[]): boolean {
  if (line.length < played.length) return false;
  for (let i = 0; i < played.length; i += 1) {
    if (!sameSan(line[i]!, played[i]!)) return false;
  }
  return true;
}

function alternativesAt(puzzle: PuzzleSpec, ply: number): string[] {
  const raw = puzzle.acceptedAlternatives;
  if (!raw) return [];
  const list = raw[ply] ?? raw[String(ply)];
  return Array.isArray(list) ? list.filter((s): s is string => typeof s === "string") : [];
}

/** Replay SANs from a FEN. Returns null when any move is illegal. */
export function replaySans(fen: string, sans: string[]): Chess | null {
  try {
    const game = new Chess(fen);
    for (const san of sans) {
      const mv = game.move(san);
      if (!mv) return null;
    }
    return game;
  } catch {
    return null;
  }
}

/**
 * Judge one learner move given everything played so far (both sides).
 * `played` must have an even length (it is the learner's turn).
 */
export function evaluatePuzzleMove(
  puzzle: PuzzleSpec,
  played: string[],
  move: PuzzleMoveInput,
): PuzzleMoveResult {
  if (played.length % 2 !== 0) return { ok: false, reason: "not_your_turn" };
  const game = replaySans(puzzle.fen, played);
  if (!game) return { ok: false, reason: "illegal" };
  if (game.isGameOver()) return { ok: false, reason: "finished" };

  let san: string;
  try {
    const mv =
      typeof move === "string"
        ? game.move(move)
        : game.move({ from: move.from as Square, to: move.to as Square, promotion: move.promotion });
    if (!mv) return { ok: false, reason: "illegal" };
    san = mv.san;
  } catch {
    return { ok: false, reason: "illegal" };
  }

  const ply = played.length;
  const fen = game.fen();
  const lines = puzzleLines(puzzle);
  const live = lines.filter((line) => prefixMatches(line, played) && line[ply] !== undefined && sameSan(line[ply]!, san));

  if (live.length > 0) {
    const line = live[0]!;
    const alternative = line !== puzzle.solutionSans;
    const next = line[ply + 1];
    if (next === undefined) return { ok: true, san, fen, done: true, alternative };
    // Opponent reply must be legal; otherwise treat the learner's move as final.
    const probe = new Chess(fen);
    try {
      if (!probe.move(next)) return { ok: true, san, fen, done: true, alternative };
    } catch {
      return { ok: true, san, fen, done: true, alternative };
    }
    return { ok: true, san, fen, done: false, nextOpponentSan: next, alternative };
  }

  // Any checkmate solves a mate puzzle (and any puzzle: mate is never wrong).
  if (game.isCheckmate()) return { ok: true, san, fen, done: true, alternative: true };

  // Precomputed alternatives (offline QA) are accepted only while on the main line.
  if (prefixMatches(puzzle.solutionSans, played)) {
    if (alternativesAt(puzzle, ply).some((alt) => sameSan(alt, san))) {
      return { ok: true, san, fen, done: true, alternative: true };
    }
  }
  return { ok: false, reason: "wrong" };
}

export type PuzzleLineGrade = {
  solved: boolean;
  /** Learner plies only. */
  playerSans: string[];
  alternativesUsed: number;
  error?: "illegal" | "wrong" | "opponent_mismatch" | "incomplete" | "empty";
};

/** Server-side check of a full submitted line (learner + opponent plies). */
export function gradePuzzleLine(puzzle: PuzzleSpec, sans: unknown): PuzzleLineGrade {
  const list = Array.isArray(sans) ? sans.filter((s): s is string => typeof s === "string") : [];
  if (!Array.isArray(sans) || list.length !== sans.length || list.length === 0 || list.length > 40) {
    return { solved: false, playerSans: [], alternativesUsed: 0, error: "empty" };
  }
  const played: string[] = [];
  const playerSans: string[] = [];
  let alternativesUsed = 0;
  let expectedOpponent: string | undefined;
  for (let i = 0; i < list.length; i += 1) {
    const san = list[i]!;
    if (i % 2 === 1) {
      if (!expectedOpponent || !sameSan(expectedOpponent, san)) {
        return { solved: false, playerSans, alternativesUsed, error: "opponent_mismatch" };
      }
      const g = replaySans(puzzle.fen, [...played, san]);
      if (!g) return { solved: false, playerSans, alternativesUsed, error: "illegal" };
      played.push(expectedOpponent);
      expectedOpponent = undefined;
      continue;
    }
    const r = evaluatePuzzleMove(puzzle, played, san);
    if (!r.ok) {
      return {
        solved: false,
        playerSans,
        alternativesUsed,
        error: r.reason === "illegal" ? "illegal" : "wrong",
      };
    }
    played.push(r.san);
    playerSans.push(r.san);
    if (r.alternative) alternativesUsed += 1;
    if (r.done) {
      const extra = list.length - (i + 1);
      return extra === 0
        ? { solved: true, playerSans, alternativesUsed }
        : { solved: false, playerSans, alternativesUsed, error: "wrong" };
    }
    expectedOpponent = r.nextOpponentSan;
  }
  return { solved: false, playerSans, alternativesUsed, error: "incomplete" };
}

/** True when a move from→to in this FEN is a pawn promotion (needs a piece choice). */
export function isPromotionMove(fen: string, from: string, to: string): boolean {
  try {
    const game = new Chess(fen);
    return game
      .moves({ verbose: true, square: from as Square })
      .some((m) => m.to === to && Boolean(m.promotion));
  } catch {
    return false;
  }
}

/**
 * Stable 64-bit FNV-1a hash (hex) of a puzzle's FEN + authored line.
 * Shared by the offline QA scripts and the content gate to detect stale QA records.
 */
export function chessPuzzleHash(fen: string, solutionSans: readonly string[]): string {
  const text = `${fen}|${solutionSans.join(" ")}`;
  let h1 = 0x811c9dc5;
  let h2 = 0x01000193 ^ 0x5bd1e995;
  for (let i = 0; i < text.length; i += 1) {
    const c = text.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 0x01000193) >>> 0;
    h2 = Math.imul(h2 ^ c, 0x5bd1e995) >>> 0;
    h2 = (h2 ^ (h2 >>> 13)) >>> 0;
  }
  return h1.toString(16).padStart(8, "0") + h2.toString(16).padStart(8, "0");
}
