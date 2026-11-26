#!/usr/bin/env node
/**
 * Line facts, theme suggestions and auto hints for every chess_puzzle (Phase 2, §2.3/§2.6).
 *   node scripts/chess-qa/chess-facts.mjs        → packages/content/src/chess-facts.generated.ts
 * Needs a built @eduforge/content. Pure chess.js (no engine), deterministic.
 * Content applies the facts only while the hash matches (fen + solution).
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { ROOT, loadChess, materialCp } from "./engine.mjs";
import { puzzleHash } from "./qa-puzzle.mjs";

const Chess = await loadChess();
const content = await import(pathToFileURL(join(ROOT, "packages/content/dist/index.js")).href);
const VAL = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 10000 };

function attackedBy(g, square, color) {
  return g.attackers ? g.attackers(square, color) : [];
}

function suggestThemes(g0, sans, facts) {
  const t = new Set();
  const pieces = g0.board().flat().filter(Boolean);
  const nonPawn = pieces.filter((p) => p.type !== "p" && p.type !== "k");
  const types = new Set(nonPawn.map((p) => p.type));
  if (pieces.length <= 12 || nonPawn.length <= 4) {
    t.add("endgame");
    if (nonPawn.length === 0) t.add("pawnEndgame");
    else if ([...types].every((x) => x === "r")) t.add("rookEndgame");
    else if ([...types].every((x) => x === "b")) t.add("bishopEndgame");
    else if ([...types].every((x) => x === "n")) t.add("knightEndgame");
    else if ([...types].every((x) => x === "q")) t.add("queenEndgame");
    else if ([...types].every((x) => x === "q" || x === "r")) t.add("queenRookEndgame");
  } else if (pieces.length >= 28) t.add("opening");
  else t.add("middlegame");
  if (facts.mate) {
    t.add("mate");
    const n = Math.ceil(sans.length / 2);
    if (n >= 1 && n <= 5) t.add(`mateIn${n}`);
    if (facts.mateBackRank) t.add("backRankMate");
    if (facts.mateBy === "n" && facts.mateSmothered) t.add("smotheredMate");
  }
  if (facts.promotion) t.add(facts.promotion === "q" ? "promotion" : "underPromotion");
  if (facts.fork) t.add("fork");
  if (facts.sacrifice) t.add("sacrifice");
  if (facts.capturedFirst && !facts.sacrifice && !facts.mate && sans.length === 1 && facts.gainCp >= 200) t.add("hangingPiece");
  if (!facts.capturedFirst && !facts.check && !facts.mate && sans.length > 1) t.add("quietMove");
  if (sans.length >= 5) t.add("long");
  else if (sans.length >= 3) t.add("short");
  else t.add("oneMove");
  if (facts.gainCp >= 600) t.add("crushing");
  else if (facts.gainCp >= 200) t.add("advantage");
  return [...t];
}

function factsFor(ex) {
  const g = new Chess(ex.fen);
  const learner = g.turn();
  const sign = learner === "w" ? 1 : -1;
  const mat0 = materialCp(g) * sign;
  const first = g.move(ex.solutionSans[0]);
  const f = {
    hash: puzzleHash(ex),
    san: first.san,
    piece: first.piece,
    from: first.from,
    to: first.to,
    check: first.san.includes("+") || first.san.includes("#"),
    capturedFirst: first.captured ?? null,
    promotion: null,
    mate: false,
    gainCp: 0,
    fork: false,
    sacrifice: false,
  };
  // Fork: after the first move the moved piece attacks ≥ 2 enemy pieces worth more than it (or the king).
  const opp = learner === "w" ? "b" : "w";
  let targets = [];
  for (const row of g.board())
    for (const p of row) {
      if (!p || p.color !== opp) continue;
      const att = attackedBy(g, p.square, learner);
      if (att.includes(first.to) && (VAL[p.type] > VAL[first.piece] || p.type === "k")) targets.push(p.type);
    }
  f.fork = targets.length >= 2;
  f.targets = targets;
  // Sacrifice: the moved piece can be taken and is worth more than what it captured.
  const capVal = first.captured ? VAL[first.captured] : 0;
  // …and the scripted reply actually takes it.
  const reply = ex.solutionSans[1] ? new Chess(g.fen()).move(ex.solutionSans[1]) : null;
  f.sacrifice = first.piece !== "k" && reply?.to === first.to && Boolean(reply?.captured) && VAL[first.piece] - capVal >= 200;
  // Replay the rest of the line.
  for (const s of ex.solutionSans.slice(1)) {
    const m = g.move(s);
    if (m.promotion && m.color === learner) f.promotion = m.promotion;
  }
  if (first.promotion) f.promotion = first.promotion;
  f.mate = g.isCheckmate();
  if (f.mate) {
    const last = g.history({ verbose: true }).at(-1);
    f.mateBy = last.piece;
    const kSq = g.board().flat().find((p) => p && p.type === "k" && p.color === opp)?.square;
    f.mateBackRank = Boolean(kSq && (kSq[1] === "1" || kSq[1] === "8") && (last.piece === "r" || last.piece === "q") && last.to[1] === kSq[1]);
    f.mateSmothered = last.piece === "n";
  }
  f.gainCp = f.mate ? 10000 : materialCp(g) * sign - mat0;
  f.themes = suggestThemes(new Chess(ex.fen), ex.solutionSans, f);
  return f;
}

const out = {};
for (const u of content.chessContent.units)
  for (const l of u.lessons)
    for (const e of l.exercises) {
      if (e.type !== "chess_puzzle") continue;
      try {
        const f = factsFor(e);
        out[e.id] = { hash: f.hash, san: f.san, piece: f.piece, from: f.from, to: f.to, check: f.check, capture: f.capturedFirst, promotion: f.promotion, mate: f.mate, gainCp: f.gainCp, fork: f.fork, sacrifice: f.sacrifice, themes: f.themes };
      } catch (err) {
        console.error("facts failed", e.id, err.message);
      }
    }
const sorted = Object.fromEntries(Object.keys(out).sort().map((k) => [k, out[k]]));
writeFileSync(
  join(ROOT, "packages/content/src/chess-facts.generated.ts"),
  `/* eslint-disable */\n// GENERATED by scripts/chess-qa/chess-facts.mjs — do not edit by hand.\nexport type ChessLineFacts = {\n  hash: string;\n  san: string;\n  piece: "p" | "n" | "b" | "r" | "q" | "k";\n  from: string;\n  to: string;\n  check: boolean;\n  capture: string | null;\n  promotion: string | null;\n  mate: boolean;\n  gainCp: number;\n  fork: boolean;\n  sacrifice: boolean;\n  /** Suggested themes (reviewed: applied only when a puzzle has none). */\n  themes: string[];\n};\nexport const CHESS_FACTS: Record<string, ChessLineFacts> = ${JSON.stringify(sorted, null, 1)};\n`,
);
console.error(`facts for ${Object.keys(sorted).length} puzzles`);
