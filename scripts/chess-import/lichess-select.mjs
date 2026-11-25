#!/usr/bin/env node
/**
 * Select Lichess puzzles (CC0, https://database.lichess.org/#puzzles) for the chess course.
 *
 *   node scripts/chess-import/lichess-select.mjs [--csv filtered.csv] [--depth 14] [--jobs 4]
 *
 * Input: the CSV written by lichess-filter.mjs. Picks are stable (sha1 of PuzzleId+target),
 * spread across each target's rating window, de-duplicated against the course and each
 * other, and every pick must pass the Stockfish QA rules (scripts/chess-qa/qa-puzzle.mjs).
 * Output: packages/content/src/expansion/chess-lichess.generated.ts
 */
import { createReadStream, writeFileSync } from "node:fs";
import { createInterface } from "node:readline";
import { createHash } from "node:crypto";
import { resolve } from "node:path";
import { ROOT, loadChess, uciToMove, pool } from "../chess-qa/engine.mjs";
import { qaPuzzle } from "../chess-qa/qa-puzzle.mjs";
import { TARGETS } from "./lesson-theme-map.mjs";

const args = process.argv.slice(2);
const arg = (k, d) => {
  const i = args.indexOf(k);
  return i >= 0 ? args[i + 1] : d;
};
const CSV = arg("--csv", "/workspace/chess-data/filtered.csv");
const DEPTH = Number(arg("--depth", "14"));
const JOBS = Number(arg("--jobs", "4"));
const OUT = resolve(ROOT, "packages/content/src/expansion/chess-lichess.generated.ts");
const KEEP = 160;
// --only r:<id>,a:<lesson>: re-pick just these targets and merge into the existing output.
const ONLY = arg("--only", "")?.split(",").filter(Boolean) ?? [];

const Chess = await loadChess();
const { CHESS_THEMES } = await import(resolve(ROOT, "packages/shared/dist/chess-themes.js"));
const content = await import(resolve(ROOT, "packages/content/dist/index.js"));

const posKey = (fen) => fen.split(" ").slice(0, 4).join(" ");
const courseFens = new Set();
const courseLessons = new Map();
const courseIds = new Map();
const chess = content.chessContent;
for (const unit of chess.units) {
  for (const lesson of unit.lessons) {
    courseLessons.set(lesson.slug, { unit: unit.slug, lesson });
    for (const ex of lesson.exercises) {
      courseIds.set(ex.id, { unit: unit.slug, lesson: lesson.slug, ex });
      if (ex.fen) courseFens.add(posKey(ex.fen));
    }
  }
}
const replacedIds = new Set(TARGETS.filter((t) => t.kind === "replace").map((t) => t.id));
for (const [id, v] of courseIds) if (replacedIds.has(id) && v.ex.fen) courseFens.delete(posKey(v.ex.fen));

const h = (s) => createHash("sha1").update(s).digest("hex");
const tkey = (t) => (t.kind === "replace" ? `r:${t.id}` : t.tag ? `a:${t.lesson}#${t.tag}` : `a:${t.lesson}`);

function matches(t, themes, rating) {
  if (rating < t.rating[0] || rating > t.rating[1]) return false;
  if (t.all && !t.all.every((x) => themes.has(x))) return false;
  if (t.any && !t.any.some((x) => themes.has(x))) return false;
  if (t.not && t.not.some((x) => themes.has(x))) return false;
  return true;
}

function prepare(row) {
  try {
    return prepareUnsafe(row);
  } catch {
    return null;
  }
}

function prepareUnsafe(row) {
  const g = new Chess(row.fen);
  const ucis = row.moves.split(" ");
  const first = uciToMove(g, ucis[0]);
  if (!first) return null;
  const fen = g.fen();
  const sans = [];
  const verbose = [];
  for (const u of ucis.slice(1)) {
    const m = uciToMove(g, u);
    if (!m) return null;
    sans.push(m.san);
    verbose.push(m);
  }
  return { fen, sans, verbose, lineUci: ucis.slice(1) };
}

// ── 1. stream candidates ──
const ACTIVE = ONLY.length ? TARGETS.filter((t) => ONLY.includes(tkey(t))) : TARGETS;
const previous = ONLY.length ? await import(resolve(ROOT, "packages/content/dist/expansion/chess-lichess.generated.js")) : null;
const buckets = new Map(ACTIVE.map((t) => [tkey(t), []]));
let header = null;
let rows = 0;
const rl = createInterface({ input: createReadStream(CSV), crlfDelay: Infinity });
for await (const line of rl) {
  if (!header) {
    header = line.split(",");
    continue;
  }
  const c = line.split(",");
  const row = {
    id: c[0],
    fen: c[1],
    moves: c[2],
    rating: Number(c[3]),
    rd: Number(c[4]),
    pop: Number(c[5]),
    plays: Number(c[6]),
    themes: c[7],
    url: c[8],
  };
  rows += 1;
  if (row.pop < 88 || row.plays < 2500) continue;
  const themes = new Set(row.themes.split(" "));
  for (const t of ACTIVE) {
    if (!matches(t, themes, row.rating)) continue;
    const key = tkey(t);
    if (t.first) {
      const p = prepare(row);
      if (!p || !t.first(p.verbose[0], p.lineUci)) continue;
    }
    const arr = buckets.get(key);
    arr.push({ ...row, hash: h(`${row.id}|${key}`) });
    if (arr.length > KEEP * 3) {
      arr.sort((a, b) => (a.hash < b.hash ? -1 : 1));
      arr.length = KEEP * 2;
    }
  }
}
console.error(`scanned ${rows} rows`);

// ── 2. choose + QA ──
const used = new Set();
if (previous) {
  for (const e of Object.values(previous.LICHESS_REPLACEMENTS)) used.add(e.source.lichessId);
  for (const a of previous.LICHESS_ADDITIONS) used.add(a.exercise.source.lichessId);
}
const picked = [];
const report = [];
const difficultyOf = (r) => (r < 1000 ? 1 : r < 1250 ? 2 : r < 1500 ? 3 : r < 1750 ? 4 : 5);
const sideUk = (fen) => (fen.split(" ")[1] === "w" ? "Білі" : "Чорні");
const sideEn = (fen) => (fen.split(" ")[1] === "w" ? "White" : "Black");

async function choose(t) {
  const key = tkey(t);
  const count = t.kind === "replace" ? 1 : t.count;
  const cand = buckets.get(key).sort((a, b) => (a.hash < b.hash ? -1 : 1));
  const [lo, hi] = t.rating;
  const bands = Array.from({ length: count }, (_, i) => [lo + ((hi - lo) * i) / count, lo + ((hi - lo) * (i + 1)) / count]);
  const out = [];
  let tried = 0;
  for (let b = 0; b < count; b += 1) {
    const inBand = cand.filter((c) => c.rating >= bands[b][0] && c.rating <= bands[b][1]);
    const order = [...inBand, ...cand.filter((c) => !inBand.includes(c))];
    for (const c of order) {
      if (used.has(c.id) || tried > 40) continue;
      const p = prepare(c);
      if (!p || courseFens.has(posKey(p.fen))) continue;
      tried += 1;
      used.add(c.id);
      const themes = [...new Set([...c.themes.split(" "), ...(t.themesAdd ?? [])])].filter((x) => x in CHESS_THEMES);
      const goal = themes.includes("mate") ? "mate" : themes.includes("equality") ? "draw" : themes.includes("promotion") ? "promote" : "win_material";
      const ex = { fen: p.fen, solutionSans: p.sans, goal, source: { kind: "game" } };
      let qa;
      try {
        qa = await qaPuzzle(Chess, ex, { depth: DEPTH });
      } catch (e) {
        qa = { flags: [`QA_ERROR ${e.message}`] };
      }
      if (qa.flags.length) {
        report.push(`${key} reject ${c.id} ${qa.flags.join("; ")}`);
        used.delete(c.id);
        continue;
      }
      out.push({
        target: t.kind,
        lesson: t.lesson,
        tag: t.tag,
        replaces: t.id,
        exercise: {
          id: t.kind === "replace" ? t.id : `ch-li-${c.id}`,
          type: "chess_puzzle",
          promptUk: t.prompt[0].replace("{sideUk}", sideUk(p.fen)),
          promptEn: t.prompt[1].replace("{sideEn}", sideEn(p.fen)),
          fen: p.fen,
          solutionSans: p.sans,
          goal: qa.goal ?? goal,
          ...(qa.acceptedAlternatives ? { acceptedAlternatives: qa.acceptedAlternatives } : {}),
          ...(qa.alternativeLines ? { alternativeLines: qa.alternativeLines } : {}),
          difficulty: difficultyOf(c.rating),
          rating: c.rating,
          themes,
          source: { kind: "lichess", lichessId: c.id, gameUrl: c.url },
        },
      });
      break;
    }
  }
  report.push(`${key} picked ${out.length}/${count} (candidates ${cand.length})`);
  return out;
}

const results = await pool(ACTIVE, JOBS, choose);
if (previous) {
  const redo = new Set(ACTIVE.map(tkey));
  for (const [id, e] of Object.entries(previous.LICHESS_REPLACEMENTS)) if (!redo.has(`r:${id}`)) picked.push({ target: "replace", replaces: id, exercise: e });
  for (const a of previous.LICHESS_ADDITIONS) {
    const key = a.tag ? `a:${a.lesson}#${a.tag}` : `a:${a.lesson}`;
    if (!redo.has(key)) picked.push({ target: "add", lesson: a.lesson, tag: a.tag, exercise: a.exercise });
  }
}
for (const r of results) picked.push(...r);

const adds = picked.filter((p) => p.target === "add");
const reps = picked.filter((p) => p.target === "replace");
const banner = `/* eslint-disable */
// GENERATED by scripts/chess-import/lichess-select.mjs — do not edit by hand.
// Source: Lichess puzzle database (https://database.lichess.org/#puzzles), CC0 1.0.
// Picks are stable (hash-ordered), deduplicated and pass the Stockfish QA rules.
import type { ChessPuzzleExercise } from "../types.js";

export type LichessAddition = { lesson: string; tag?: string; exercise: ChessPuzzleExercise };
`;
const body = `${banner}
/** Real-game replacements for broken or duplicated puzzles (same ids). */
export const LICHESS_REPLACEMENTS: Record<string, ChessPuzzleExercise> = ${JSON.stringify(
  Object.fromEntries(reps.map((r) => [r.replaces, r.exercise])),
  null,
  2,
)};

/** New puzzles appended to teach lessons. */
export const LICHESS_ADDITIONS: LichessAddition[] = ${JSON.stringify(
  adds.map((a) => ({ lesson: a.lesson, ...(a.tag ? { tag: a.tag } : {}), exercise: a.exercise })),
  null,
  2,
)};
`;
writeFileSync(OUT, body);
if (!previous) writeFileSync(resolve(ROOT, "scripts/chess-import/last-select-report.txt"), report.join("\n") + "\n");
else console.error(report.join("\n"));
console.error(`wrote ${OUT}: ${reps.length} replacements, ${adds.length} additions`);
