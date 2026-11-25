/**
 * QA rules for one chess_puzzle (see SPEC/CHESS-DEEP-UPGRADE-PLAN.md §1.5).
 */
import { pathToFileURL } from "node:url";
import { join } from "node:path";
import { ROOT, analyse, analyseSafe, fmtScore, isMateScore, mateIn, materialCp, moveUci, uciToMove } from "./engine.mjs";

const { chessPuzzleHash } = await import(pathToFileURL(join(ROOT, "packages/chess-core/dist/index.js")).href);

export function puzzleHash(ex) {
  return chessPuzzleHash(ex.fen, ex.solutionSans);
}

const DRAW_RE = /draw|нічи|stalemate|пат\b|fortress|фортец|hold|утрима/i;

async function scoreOf(fen, uci, lines, depth) {
  const hit = lines.find((l) => l.uci === uci);
  if (hit) return hit.score;
  const r = await analyse(fen, { multipv: 1, depth, searchMoves: [uci], timeoutMs: 8000 });
  return r.lines[0]?.score ?? null;
}

function pvToSans(Chess, fen, pv, maxPlies) {
  const g = new Chess(fen);
  const out = [];
  for (const uci of pv.slice(0, maxPlies)) {
    try {
      const m = uciToMove(g, uci);
      if (!m) break;
      out.push(m.san);
    } catch {
      break;
    }
  }
  return out;
}

function sanOf(Chess, fen, uci) {
  try {
    return uciToMove(new Chess(fen), uci)?.san ?? null;
  } catch {
    return null;
  }
}

export function mateInOneSans(Chess, fen) {
  const g = new Chess(fen);
  const out = [];
  for (const m of g.moves({ verbose: true })) {
    const p = new Chess(fen);
    p.move(m.san);
    if (p.isCheckmate()) out.push(m.san);
  }
  return out;
}

export async function qaPuzzle(Chess, ex, { depth = 16 } = {}) {
  const flags = [];
  const acceptedAlternatives = {};
  const alternativeLines = [];
  const plies = [];
  const g = new Chess(ex.fen);
  const start = new Chess(ex.fen);
  const pieceCount = start.board().flat().filter(Boolean).length;
  const learner = start.turn();
  const mat = materialCp(start) * (learner === "w" ? 1 : -1);
  // Real-game positions (historical games, Lichess) are plausible by construction.
  const realGame = ex.source?.kind === "game" || ex.source?.kind === "lichess";
  if (pieceCount >= 24 && Math.abs(mat) >= 500 && !realGame) flags.push(`IMPLAUSIBLE_MATERIAL ${mat}cp with ${pieceCount} pieces`);

  const sol = ex.solutionSans;
  let solFirstScore = null;
  for (let i = 0; i < sol.length; i += 1) {
    const fen = g.fen();
    const lines = await analyseSafe(fen, { multipv: 5, depth });
    let mv;
    try {
      mv = g.move(sol[i]);
    } catch {
      mv = null;
    }
    if (!mv) {
      flags.push(`ILLEGAL ply${i} ${sol[i]}`);
      break;
    }
    const uci = moveUci(mv);
    if (i % 2 === 0) {
      // Every mate in one is always accepted (chess.js, no engine needed).
      const mates = mateInOneSans(Chess, fen).filter((s) => s !== mv.san);
      if (mates.length && g.isCheckmate()) (acceptedAlternatives[i] ??= []).push(...mates);
    }
    if (!lines.length) {
      // Stockfish hangs on a few trivial K+Q/K+R mates; a verified mate in one needs no engine.
      if (!(g.isCheckmate() && i === sol.length - 1)) flags.push(`NO_ENGINE ply${i}`);
      continue;
    }
    const top = lines[0];
    const solScore = await scoreOf(fen, uci, lines, depth);
    plies.push({ ply: i, san: mv.san, score: solScore, best: top.uci, bestScore: top.score });
    if (i % 2 === 0) {
      if (i === 0) solFirstScore = solScore;
      const solMate = solScore !== null ? mateIn(solScore) : null;
      const topMate = mateIn(top.score);
      if (solScore === null) {
        flags.push(`NO_SCORE ply${i}`);
      } else if (topMate !== null && topMate > 0) {
        if (!(solMate !== null && solMate > 0) && solScore < 500) {
          flags.push(`MISSES_MATE ply${i} sol=${mv.san}(${fmtScore(solScore)}) best=${sanOf(Chess, fen, top.uci)}(${fmtScore(top.score)})`);
        }
      } else if (top.uci !== uci && top.score - solScore > 50 && solScore < 500) {
        flags.push(`NOT_BEST ply${i} sol=${mv.san}(${fmtScore(solScore)}) best=${sanOf(Chess, fen, top.uci)}(${fmtScore(top.score)})`);
      }
      for (const l of lines) {
        if (l.uci === uci || solScore === null) continue;
        const altSan = sanOf(Chess, fen, l.uci);
        if (!altSan) continue;
        const altMate = mateIn(l.score);
        if (solMate !== null && solMate > 0) {
          if (altMate !== null && altMate > 0 && altMate <= solMate) {
            if (altMate === 1) {
              (acceptedAlternatives[i] ??= []).push(altSan);
            } else if (alternativeLines.length < 3) {
              const prefix = g.history().slice(0, i);
              const tail = pvToSans(Chess, fen, l.pv, altMate * 2 - 1);
              const full = [...prefix, ...tail];
              const end = new Chess(ex.fen);
              let ok = true;
              for (const s of full) {
                try {
                  end.move(s);
                } catch {
                  ok = false;
                  break;
                }
              }
              if (ok && end.isCheckmate()) alternativeLines.push(full);
            }
          }
        } else if (l.score >= 500 && solScore >= 500) {
          // Both crushing: the free variant accepts either.
          (acceptedAlternatives[i] ??= []).push(altSan);
        } else if (!isMateScore(l.score) && l.score >= 200 && l.score >= solScore - 150) {
          // Also clearly winning and close to the key move: accepted.
          (acceptedAlternatives[i] ??= []).push(altSan);
        }
      }
      // A "best move" puzzle with a quiet, low evaluation must have a unique answer.
      const second = lines.find((l) => l.uci !== uci);
      if (
        i === 0 &&
        solScore !== null &&
        !isMateScore(solScore) &&
        solScore < 200 &&
        second &&
        !isMateScore(second.score) &&
        second.score > solScore - 80 &&
        !(ex.goal === "draw" && Math.abs(solScore) <= 80 && second.score < -150)
      ) {
        flags.push(`NOT_UNIQUE ply${i} sol=${mv.san}(${fmtScore(solScore)}) 2nd=${sanOf(Chess, fen, second.uci)}(${fmtScore(second.score)})`);
      }
    } else if (top.uci !== uci && solScore !== null) {
      const sm = mateIn(solScore);
      const tm = mateIn(top.score);
      let weak;
      // Real-game replies in an already lost position are accepted (Lichess validated the line).
      if (realGame && top.score <= -300) weak = false;
      else if (sm !== null && sm < 0 && tm !== null && tm < 0) weak = -sm < -tm;
      else if (sm !== null && sm < 0) weak = true;
      else weak = solScore < top.score - (top.score <= -500 ? 100 : 30);
      if (weak) {
        flags.push(`WEAK_DEFENCE ply${i} scripted=${mv.san}(${fmtScore(solScore)}) best=${sanOf(Chess, fen, top.uci)}(${fmtScore(top.score)})`);
      }
    }
  }

  let evalAfter = null;
  if (g.isCheckmate()) evalAfter = g.turn() === learner ? -100000 : 100000;
  else if (g.isDraw()) evalAfter = 0;
  else {
    const fl = await analyseSafe(g.fen(), { multipv: 1, depth });
    if (fl[0]) evalAfter = g.turn() === learner ? fl[0].score : -fl[0].score;
  }

  const text = `${ex.promptEn ?? ""} ${ex.promptUk ?? ""}`;
  const promoted = g.history({ verbose: true }).some((m, i) => i % 2 === 0 && m.promotion);
  let goal = ex.goal;
  if (!goal) {
    if (g.isCheckmate()) goal = "mate";
    else if (DRAW_RE.test(text) && evalAfter !== null && Math.abs(evalAfter) <= 150) goal = "draw";
    else if (promoted) goal = "promote";
    else if (evalAfter !== null && evalAfter >= (ex.goalThresholdCp ?? 200)) goal = "win_material";
    else goal = "best_move";
  }
  if (goal === "mate" && !g.isCheckmate()) flags.push("GOAL_MISMATCH mate goal but line does not end in mate");
  if (goal === "draw" && evalAfter !== null && Math.abs(evalAfter) > 80) flags.push(`DRAW_LOST evalAfter=${fmtScore(evalAfter)}`);
  if (goal === "win_material" && evalAfter !== null && evalAfter < (ex.goalThresholdCp ?? (realGame ? 150 : 200))) {
    flags.push(`LOW_EVAL evalAfter=${fmtScore(evalAfter)}`);
  }
  for (const k of Object.keys(acceptedAlternatives)) acceptedAlternatives[k] = [...new Set(acceptedAlternatives[k])];

  return {
    hash: puzzleHash(ex),
    goal,
    ...(Object.keys(acceptedAlternatives).length ? { acceptedAlternatives } : {}),
    ...(alternativeLines.length ? { alternativeLines } : {}),
    evalAfter,
    flags,
    plies,
  };
}
