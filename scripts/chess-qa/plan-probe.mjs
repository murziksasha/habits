#!/usr/bin/env node
/**
 * Authoring helper for chess_plan exercises: evaluates every legal move of a position.
 *   node scripts/chess-qa/plan-probe.mjs "<fen>" [depth]
 * Prints SAN, score (side to move) and a short PV per move, best first.
 */
import { analyse, fmtScore, loadChess, uciToMove } from "./engine.mjs";

const [fen, d] = process.argv.slice(2);
const depth = Number(d ?? 16);
const Chess = await loadChess();
const g = new Chess(fen);
const n = g.moves().length;
const r = await analyse(fen, { multipv: Math.min(n, 60), depth, timeoutMs: 120000 });
for (const l of r.lines) {
  const p = new Chess(fen);
  const sans = [];
  for (const u of l.pv.slice(0, 6)) {
    try {
      sans.push(uciToMove(p, u).san);
    } catch {
      break;
    }
  }
  console.log(`${fmtScore(l.score).padStart(8)}  ${sans.join(" ")}`);
}
