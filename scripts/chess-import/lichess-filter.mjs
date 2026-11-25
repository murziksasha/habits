#!/usr/bin/env node
/**
 * Step 1 of the Lichess import: stream lichess_db_puzzle.csv.zst (CC0, database.lichess.org)
 * and keep only puzzles in the course range.
 *
 *   node scripts/chess-import/lichess-filter.mjs <lichess_db_puzzle.csv.zst> <out.csv>
 *
 * Filters (SPEC/CHESS-DEEP-UPGRADE-PLAN.md §4.1): RatingDeviation < 90, Popularity > 80,
 * NbPlays > 1000, Rating 600–1900, at most 7 learner+opponent plies after the setup move.
 * Needs Node 22.15+ (zlib zstd).
 */
import { createReadStream, createWriteStream } from "node:fs";
import { createInterface } from "node:readline";
import zlib from "node:zlib";

const [src, out] = process.argv.slice(2);
if (!src || !out) {
  console.error("usage: lichess-filter.mjs <in.csv.zst> <out.csv>");
  process.exit(2);
}
if (typeof zlib.createZstdDecompress !== "function") {
  console.error("Node with zlib zstd support required (22.15+)");
  process.exit(2);
}
const input = createReadStream(src).pipe(zlib.createZstdDecompress());
const rl = createInterface({ input, crlfDelay: Infinity });
const w = createWriteStream(out);
let header = null;
let kept = 0;
let seen = 0;
for await (const line of rl) {
  if (!header) {
    header = line.split(",");
    w.write(line + "\n");
    continue;
  }
  seen += 1;
  const f = line.split(",");
  const row = Object.fromEntries(header.map((h, i) => [h, f[i]]));
  const rating = Number(row.Rating);
  const moves = (row.Moves ?? "").split(" ");
  if (
    Number(row.RatingDeviation) < 90 &&
    Number(row.Popularity) > 80 &&
    Number(row.NbPlays) > 1000 &&
    rating >= 600 &&
    rating <= 1900 &&
    moves.length >= 2 &&
    moves.length - 1 <= 7
  ) {
    w.write(line + "\n");
    kept += 1;
  }
  if (seen % 1_000_000 === 0) console.error(`seen ${seen}, kept ${kept}`);
}
w.end();
console.error(`done: seen ${seen}, kept ${kept}`);
