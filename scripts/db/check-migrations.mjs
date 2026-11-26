#!/usr/bin/env node
/**
 * Check that packages/db/drizzle SQL files and meta/_journal.json agree:
 *   pnpm db:check   (or node scripts/db/check-migrations.mjs [--dir <drizzle dir>])
 * Exits 1 on any problem. No database needed.
 */
import { checkMigrations, dirFromArgs, readJournal } from "./migrations-lib.mjs";

const dir = dirFromArgs(process.argv.slice(2));
const problems = checkMigrations(dir);
if (problems.length) {
  console.error(`db:check: ${problems.length} problem(s) in ${dir}`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
const { journal } = readJournal(dir);
console.log(`db:check: OK, ${journal.entries.length} migrations, last ${journal.entries.at(-1)?.tag ?? "none"}`);
