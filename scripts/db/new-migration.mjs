#!/usr/bin/env node
/**
 * Create the next hand-written migration:
 *   pnpm db:new <name>            e.g. pnpm db:new chess_puzzle_tags
 *   node scripts/db/new-migration.mjs <name> [--dir <drizzle dir>]
 * Writes packages/db/drizzle/NNNN_<name>.sql (template) and appends the entry to meta/_journal.json.
 */
import { relative } from "node:path";
import { ROOT, createMigration, dirFromArgs } from "./migrations-lib.mjs";

const args = process.argv.slice(2).filter((a) => a !== "--");
const dirIdx = args.indexOf("--dir");
const words = args.filter((_, i) => dirIdx < 0 || (i !== dirIdx && i !== dirIdx + 1));
try {
  const { tag, file } = createMigration(words.join("_"), dirFromArgs(args));
  console.log(`Created ${relative(ROOT, file)} and added "${tag}" to meta/_journal.json.`);
  console.log("Next: write the SQL, update packages/db/src/schema/*.ts, run pnpm db:check and pnpm db:migrate.");
} catch (e) {
  console.error(`db:new: ${e.message}`);
  console.error("Usage: pnpm db:new <name>");
  process.exit(1);
}
