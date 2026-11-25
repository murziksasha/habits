/**
 * Post-game analysis (plan §5.4–5.5): label the learner's inaccuracies / mistakes /
 * blunders with an external UCI engine and turn blunders into personal puzzles.
 * Without STOCKFISH_PATH only obvious material drops are flagged ("possible_blunder")
 * and no personal puzzles are created.
 */
import { and, eq, isNull, gte, sql } from "drizzle-orm";
import { chessGameAnnotations, chessGames, chessPersonalPuzzles } from "@eduforge/db";
import { replayHistory } from "@eduforge/chess-core";
import { db } from "../db.js";
import { UciEngine } from "./uci-engine.js";

export type MoveLabel = "blunder" | "mistake" | "inaccuracy" | "possible_blunder";
export const MIN_ANALYSIS_PLIES = 20;
const ANALYSIS_TIMEOUT_MS = 30_000;

/** Thresholds on the drop (mover POV, centipawns). */
export function classifyDrop(before: number, after: number): Exclude<MoveLabel, "possible_blunder"> | null {
  if (before > 800) return null; // already winning big: do not nag
  const drop = before - after;
  if (drop >= 150) return Math.abs(before) <= 500 ? "blunder" : "mistake";
  if (drop >= 80) return "mistake";
  if (drop >= 40) return "inaccuracy";
  return null;
}

const VALUE: Record<string, number> = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 0 };
function material(fen: string, color: "w" | "b"): number {
  let s = 0;
  for (const ch of fen.split(" ")[0]!) {
    const v = VALUE[ch.toLowerCase()];
    if (v === undefined) continue;
    const isWhite = ch === ch.toUpperCase();
    s += (isWhite === (color === "w") ? 1 : -1) * v;
  }
  return s;
}

/** Engine-free fallback: a learner move after which material drops ≥ 300 within two plies. */
export function materialDrops(fens: readonly string[], color: "w" | "b", firstPlyColor: "w" | "b"): number[] {
  const out: number[] = [];
  for (let ply = 0; ply + 2 < fens.length; ply++) {
    const mover = (ply % 2 === 0) === (firstPlyColor === "w") ? "w" : "b";
    if (mover !== color) continue;
    const before = material(fens[ply]!, color);
    const after = material(fens[ply + 2]!, color);
    if (before - after >= 300) out.push(ply);
  }
  return out;
}

/** Solution line for a personal puzzle: the engine PV, cut to end on the learner's move. */
export function personalLine(pvSans: readonly string[]): string[] {
  const n = pvSans.length >= 3 ? 3 : pvSans.length >= 1 ? 1 : 0;
  return pvSans.slice(0, n);
}

export function personalGoal(e: { cp: number; mate: number | null }): "mate" | "win_material" | "best_move" {
  if (e.mate !== null && e.mate > 0) return "mate";
  if (e.cp >= 200) return "win_material";
  return "best_move";
}

function uciToSans(fen: string, ucis: readonly string[]): string[] {
  const g = replayHistory(fen, []);
  const out: string[] = [];
  if (!g) return out;
  for (const u of ucis) {
    try {
      const mv = g.move({ from: u.slice(0, 2), to: u.slice(2, 4), promotion: (u[4] as "q" | undefined) ?? undefined });
      if (!mv) break;
      out.push(mv.san);
    } catch {
      break;
    }
  }
  return out;
}

const queue: string[] = [];
let running = false;

/** Fire-and-forget: analyse in-process, one game at a time. */
export function enqueueGameAnalysis(gameId: string) {
  if (!queue.includes(gameId)) queue.push(gameId);
  if (!running) void drain();
}

async function drain() {
  running = true;
  while (queue.length) {
    const id = queue.shift()!;
    await analyseGame(id).catch(async () => {
      await db.update(chessGames).set({ analysisStatus: "failed" }).where(eq(chessGames.id, id)).catch(() => undefined);
    });
  }
  running = false;
}

export async function analyseGame(gameId: string, enginePath = process.env.STOCKFISH_PATH): Promise<{ labels: number; puzzles: number; status: string }> {
  const game = await db.query.chessGames.findFirst({ where: eq(chessGames.id, gameId) });
  if (!game || game.status !== "finished") return { labels: 0, puzzles: 0, status: "not_finished" };
  if (game.analysisStatus === "done" || game.analysisStatus === "skipped") return { labels: 0, puzzles: 0, status: game.analysisStatus };
  const sans = (game.pgn ?? "").split(" ").filter(Boolean);
  const start = !game.startFen || game.startFen === "startpos" ? "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" : game.startFen;
  if (sans.length < MIN_ANALYSIS_PLIES) {
    await db.update(chessGames).set({ analysisStatus: "skipped" }).where(eq(chessGames.id, gameId));
    return { labels: 0, puzzles: 0, status: "skipped" };
  }
  const g = replayHistory(start, []);
  const fens = [start];
  for (const san of sans) {
    if (!g?.move(san)) break;
    fens.push(g.fen());
  }
  const firstColor = start.split(" ")[1] === "b" ? "b" : "w";
  // Learners: the human sides (bot games have one null player).
  const learners: { userId: string; color: "w" | "b" }[] = [];
  if (game.whiteId) learners.push({ userId: game.whiteId, color: "w" });
  if (game.blackId) learners.push({ userId: game.blackId, color: "b" });
  const colorOf = (ply: number): "w" | "b" => ((ply % 2 === 0) === (firstColor === "w") ? "w" : "b");

  await db.update(chessGames).set({ analysisStatus: "pending" }).where(eq(chessGames.id, gameId));
  let labels = 0;
  let puzzles = 0;

  if (!enginePath) {
    for (const l of learners) {
      for (const ply of materialDrops(fens, l.color, firstColor)) {
        await db.insert(chessGameAnnotations).values({ gameId, ply, label: "possible_blunder" }).onConflictDoNothing();
        labels += 1;
      }
    }
    await db.update(chessGames).set({ analysisStatus: "done" }).where(eq(chessGames.id, gameId));
    return { labels, puzzles, status: "done" };
  }

  const engine = new UciEngine(enginePath);
  const deadline = Date.now() + ANALYSIS_TIMEOUT_MS;
  try {
    await engine.init();
    const evals: ({ cp: number; mate: number | null; pv: string[] } | null)[] = [];
    for (const fen of fens) {
      if (Date.now() > deadline) throw new Error("analysis_timeout");
      const r = replayHistory(fen, []);
      if (r?.isGameOver()) {
        evals.push(r.isCheckmate() ? { cp: -3000, mate: 0, pv: [] } : { cp: 0, mate: null, pv: [] });
        continue;
      }
      evals.push(await engine.evaluate(fen, { movetimeMs: 120, timeoutMs: 4000 }));
    }
    for (let ply = 0; ply < sans.length; ply++) {
      const mover = colorOf(ply);
      const learner = learners.find((l) => l.color === mover);
      const eb = evals[ply];
      const ea = evals[ply + 1];
      if (!learner || !eb || !ea) continue;
      const label = classifyDrop(eb.cp, -ea.cp);
      if (!label) continue;
      const bestSan = uciToSans(fens[ply]!, eb.pv.slice(0, 1))[0] ?? null;
      if (bestSan && bestSan === sans[ply]) continue;
      await db
        .insert(chessGameAnnotations)
        .values({ gameId, ply, evalBeforeCp: Math.round(eb.cp), evalAfterCp: Math.round(-ea.cp), bestUci: eb.pv[0] ?? null, bestSan, label })
        .onConflictDoNothing();
      labels += 1;
      if (label === "blunder") {
        const line = personalLine(uciToSans(fens[ply]!, eb.pv));
        if (line.length) {
          await db
            .insert(chessPersonalPuzzles)
            .values({ userId: learner.userId, gameId, ply, fen: fens[ply]!, solutionSans: line, goal: personalGoal(eb), themes: [] })
            .onConflictDoNothing();
          puzzles += 1;
        }
      }
    }
    await db.update(chessGames).set({ analysisStatus: "done" }).where(eq(chessGames.id, gameId));
    return { labels, puzzles, status: "done" };
  } finally {
    engine.quit();
  }
}

/** Cron helper: analyse recently finished games that were never analysed. */
export async function analysePendingGames(limit = 10): Promise<number> {
  const since = new Date(Date.now() - 7 * 86_400_000);
  const rows = await db
    .select({ id: chessGames.id })
    .from(chessGames)
    .where(and(eq(chessGames.status, "finished"), isNull(chessGames.analysisStatus), gte(chessGames.finishedAt, since)))
    .orderBy(sql`${chessGames.finishedAt} desc`)
    .limit(limit);
  for (const r of rows) await analyseGame(r.id).catch(() => undefined);
  return rows.length;
}
