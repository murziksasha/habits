#!/usr/bin/env node
/**
 * Validate chess FENs and solutionSans sequences.
 *
 * Usage:
 *   node scripts/gen-expansion/deep/validate_fens.mjs [file.ts|file.json ...]
 *
 * Default target: packages/content/src/expansion/chess-deep.ts
 *
 * A FEN is legal if chess.js can load it (valid placement, one king each,
 * consistent checks). A solution is legal if every SAN plays from that FEN.
 * If the last SAN ends with '#', the final position must be checkmate.
 */
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import { dirname, isAbsolute, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync, existsSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../../..");

async function loadChess() {
  const require = createRequire(join(ROOT, "packages/chess-core/package.json"));
  const chessJsPath = require.resolve("chess.js");
  const { Chess } = await import(pathToFileURL(chessJsPath).href);
  return Chess;
}

function extractUnits(src) {
  const marker = "const newUnits: UnitContent[] = ";
  const idx = src.indexOf(marker);
  if (idx === -1) {
    // maybe a raw JSON array
    const trimmed = src.trim();
    if (trimmed.startsWith("[")) return JSON.parse(trimmed);
    throw new Error("could not find `const newUnits: UnitContent[] =` or a JSON array");
  }
  const eq = src.indexOf("= ", idx);
  const start = src.indexOf("[", eq === -1 ? idx : eq);
  const end = src.lastIndexOf("];");
  if (start === -1 || end === -1) throw new Error("could not slice newUnits array");
  return JSON.parse(src.slice(start, end + 1));
}

function collect(units) {
  const items = [];
  for (const unit of units) {
    for (const lesson of unit.lessons ?? []) {
      for (const ex of lesson.exercises ?? []) {
        if (ex.type === "chess_lesson" || ex.type === "chess_puzzle") {
          items.push({
            id: ex.id,
            type: ex.type,
            fen: ex.fen,
            solution: ex.solutionSans ?? [],
            lesson: lesson.slug,
            unit: unit.slug,
          });
        }
      }
    }
  }
  return items;
}

function collectFromCourse(course) {
  return collect(course.units ?? []);
}

export function validateItem(Chess, item) {
  const loc = `${item.unit ?? ""}/${item.lesson ?? ""}/${item.id}`;
  if (!item.fen || typeof item.fen !== "string") {
    return { ok: false, loc, error: "missing FEN" };
  }
  let game;
  try {
    game = new Chess(item.fen);
  } catch (e) {
    return { ok: false, loc, error: `illegal FEN: ${e.message}`, fen: item.fen };
  }
  // chess.js may accept some FENs that have 0 or 2 kings? It usually throws.
  const fenParts = game.fen().split(" ");
  if (fenParts.length < 4) {
    return { ok: false, loc, error: "FEN too short after parse", fen: item.fen };
  }
  if (item.type === "chess_puzzle") {
    const sol = item.solution ?? [];
    if (!sol.length) {
      return { ok: false, loc, error: "puzzle has empty solutionSans", fen: item.fen };
    }
    for (const san of sol) {
      let moved;
      try {
        moved = game.move(san);
      } catch (e) {
        return {
          ok: false,
          loc,
          error: `illegal move ${JSON.stringify(san)}: ${e.message}`,
          fen: game.fen(),
          legal: game.moves(),
        };
      }
      if (!moved) {
        return {
          ok: false,
          loc,
          error: `illegal move ${JSON.stringify(san)}`,
          fen: game.fen(),
          legal: game.moves(),
        };
      }
    }
    const last = String(sol[sol.length - 1] ?? "");
    const expectMate = last.includes("#");
    if (expectMate && !game.isCheckmate()) {
      return {
        ok: false,
        loc,
        error: "last SAN has # but final position is not checkmate",
        fen: game.fen(),
        inCheck: game.inCheck(),
        legal: game.moves(),
      };
    }
  }
  return { ok: true, loc, mate: game.isCheckmate?.() ?? false };
}

export function validateItems(Chess, items) {
  const failures = [];
  let puzzles = 0;
  let lessons = 0;
  let mates = 0;
  for (const item of items) {
    if (item.type === "chess_puzzle") puzzles += 1;
    if (item.type === "chess_lesson") lessons += 1;
    const r = validateItem(Chess, item);
    if (r.ok && r.mate) mates += 1;
    if (!r.ok) failures.push(r);
  }
  return { failures, puzzles, lessons, mates, total: items.length };
}

export async function validateFile(filePath) {
  const Chess = await loadChess();
  const src = readFileSync(filePath, "utf8");
  const units = extractUnits(src);
  const items = collect(units);
  return { ...validateItems(Chess, items), file: filePath, items };
}

export async function validateCourseUnits(units) {
  const Chess = await loadChess();
  const items = collect(units);
  return { ...validateItems(Chess, items), items };
}

export { loadChess, collect, collectFromCourse, extractUnits, ROOT };

function printReport(result) {
  const name = result.file ? result.file.replace(ROOT + "/", "") : "units";
  if (result.failures.length) {
    console.error(`FAIL ${name}: ${result.failures.length} of ${result.total} invalid`);
    for (const f of result.failures) {
      console.error(`  - ${f.loc}: ${f.error}`);
      if (f.fen) console.error(`    fen: ${f.fen}`);
      if (f.legal) console.error(`    legal: ${f.legal.join(", ")}`);
    }
    return false;
  }
  console.log(
    `OK ${name}: ${result.total} positions (${result.lessons} lessons, ${result.puzzles} puzzles, ${result.mates} ended in mate)`,
  );
  return true;
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1]);

if (isMain) {
  const args = process.argv.slice(2);
  const defaults = [join(ROOT, "packages/content/src/expansion/chess-deep.ts")];
  const files = (args.length ? args : defaults).map((p) => (isAbsolute(p) ? p : resolve(process.cwd(), p)));
  let ok = true;
  const Chess = await loadChess();
  for (const f of files) {
    if (!existsSync(f)) {
      if (args.length) {
        console.error(`file not found: ${f}`);
        ok = false;
      } else {
        console.log(`skip ${f.replace(ROOT + "/", "")} (not generated yet)`);
      }
      continue;
    }
    if (f.endsWith(".json")) {
      const data = JSON.parse(readFileSync(f, "utf8"));
      const items = Array.isArray(data) && data[0]?.fen ? data : collect(data);
      const result = { ...validateItems(Chess, items), file: f };
      if (!printReport(result)) ok = false;
    } else {
      const result = await validateFile(f);
      if (!printReport(result)) ok = false;
    }
  }
  process.exit(ok ? 0 : 1);
}
