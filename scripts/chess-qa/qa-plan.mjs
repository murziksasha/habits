/**
 * QA rules for one chess_plan (SPEC/CHESS-DEEP-UPGRADE-PLAN.md §1.4):
 * the correct choice is within 40 cp of the engine's best move, each wrong
 * choice is at least 80 cp worse than the correct one, all choices are legal.
 */
import { analyseSafe, analyse, fmtScore, moveUci } from "./engine.mjs";
import { puzzleHash } from "./qa-puzzle.mjs";

export const PLAN_BEST_MARGIN = 40;
export const PLAN_WRONG_GAP = 80;

export function planHash(ex) {
  return puzzleHash({ fen: ex.fen, solutionSans: [String(ex.correctIndex), ...ex.choices.map((c) => c.san)] });
}

export async function qaPlan(Chess, ex, { depth = 16 } = {}) {
  const flags = [];
  const best = await analyseSafe(ex.fen, { multipv: 1, depth });
  const bestScore = best[0]?.score ?? null;
  const scores = [];
  for (const c of ex.choices) {
    let m = null;
    try {
      m = new Chess(ex.fen).move(c.san);
    } catch {
      m = null;
    }
    if (!m) {
      flags.push(`ILLEGAL ${c.san}`);
      scores.push(null);
      continue;
    }
    const r = await analyse(ex.fen, { multipv: 1, depth, searchMoves: [moveUci(m)], timeoutMs: 15000 });
    scores.push(r.lines[0]?.score ?? null);
  }
  const correct = scores[ex.correctIndex];
  if (bestScore === null || correct === null) flags.push("NO_ENGINE");
  else {
    if (bestScore - correct > PLAN_BEST_MARGIN) flags.push(`PLAN_NOT_BEST correct=${fmtScore(correct)} best=${fmtScore(bestScore)}`);
    ex.choices.forEach((c, i) => {
      if (i === ex.correctIndex || scores[i] === null) return;
      if (correct - scores[i] < PLAN_WRONG_GAP) flags.push(`PLAN_WRONG_TOO_CLOSE ${c.san}=${fmtScore(scores[i])} correct=${fmtScore(correct)}`);
    });
  }
  return { hash: planHash(ex), kind: "plan", goal: "best_move", evalAfter: correct, scores, flags };
}
