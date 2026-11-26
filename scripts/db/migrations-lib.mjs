/**
 * Helpers for hand-written Drizzle migrations in packages/db/drizzle.
 * The repo has no drizzle-kit snapshots (meta/ holds only _journal.json), so
 * `drizzle-kit generate` cannot diff the schema; migrations are written by hand
 * and these helpers keep the SQL files and the journal consistent.
 * Plain Node (no bash, no deps) so it works the same on Windows and Linux.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
export const DEFAULT_DRIZZLE_DIR = join(ROOT, "packages", "db", "drizzle");
export const TAG_RE = /^(\d{4})_([a-z0-9]+(?:_[a-z0-9]+)*)$/;
export const JOURNAL_VERSION = "7";

export function journalPath(dir) {
  return join(dir, "meta", "_journal.json");
}

export function readJournal(dir) {
  const raw = readFileSync(journalPath(dir), "utf8");
  return { raw, eol: raw.includes("\r\n") ? "\r\n" : "\n", journal: JSON.parse(raw.replace(/^\uFEFF/, "")) };
}

/** Same layout drizzle-kit writes: 4-space indent, trailing newline, original line endings. */
export function writeJournal(dir, journal, eol = "\n") {
  const text = JSON.stringify(journal, null, 4) + "\n";
  writeFileSync(journalPath(dir), eol === "\n" ? text : text.replace(/\n/g, eol), "utf8");
}

export function sqlFiles(dir) {
  return readdirSync(dir)
    .filter((f) => f.endsWith(".sql"))
    .sort();
}

/** "Chess opening-lines" → "chess_opening_lines". Returns "" when nothing usable is left. */
export function slugifyMigrationName(name) {
  return String(name ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 60)
    .replace(/_+$/g, "");
}

/** Returns a list of problems (empty = consistent). */
export function checkMigrations(dir = DEFAULT_DRIZZLE_DIR) {
  const errors = [];
  if (!existsSync(journalPath(dir))) return [`missing ${journalPath(dir)}`];
  let journal;
  try {
    journal = readJournal(dir).journal;
  } catch (e) {
    return [`_journal.json is not valid JSON: ${e.message}`];
  }
  if (journal.dialect !== "postgresql") errors.push(`journal dialect is ${journal.dialect}, expected postgresql`);
  if (!Array.isArray(journal.entries)) return [...errors, "journal has no entries array"];

  const files = new Set(sqlFiles(dir));
  const tags = new Set();
  let prevWhen = -Infinity;
  journal.entries.forEach((e, i) => {
    const where = `entry #${i} (${e?.tag ?? "no tag"})`;
    if (e.idx !== i) errors.push(`${where}: idx is ${e.idx}, expected ${i} (no gaps, no reordering)`);
    const m = TAG_RE.exec(e.tag ?? "");
    if (!m) errors.push(`${where}: tag must look like NNNN_snake_case`);
    else if (Number(m[1]) !== i) errors.push(`${where}: tag number ${m[1]} does not match idx ${i}`);
    if (tags.has(e.tag)) errors.push(`${where}: duplicate tag`);
    tags.add(e.tag);
    if (e.version !== JOURNAL_VERSION) errors.push(`${where}: version is ${JSON.stringify(e.version)}, expected "${JOURNAL_VERSION}"`);
    if (e.breakpoints !== true) errors.push(`${where}: breakpoints must be true`);
    if (!Number.isInteger(e.when)) errors.push(`${where}: when must be an integer (ms)`);
    // drizzle's migrator skips a migration whose `when` is not newer than the last applied one.
    else if (e.when <= prevWhen) errors.push(`${where}: when ${e.when} must be greater than the previous entry (${prevWhen})`);
    if (Number.isInteger(e.when)) prevWhen = e.when;
    if (!files.has(`${e.tag}.sql`)) errors.push(`${where}: file ${e.tag}.sql is missing`);
  });
  for (const f of files) {
    const tag = f.slice(0, -4);
    if (!tags.has(tag)) errors.push(`${f}: not in meta/_journal.json (drizzle would never apply it)`);
    const buf = readFileSync(join(dir, f));
    if (buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) errors.push(`${f}: has a UTF-8 BOM`);
    if (buf[0] === 0xff || buf[0] === 0xfe) errors.push(`${f}: looks like UTF-16, must be UTF-8`);
  }
  return errors;
}

export const SQL_TEMPLATE = (tag) => `-- ${tag}
-- Hand-written migration (see instructions/migrations.md). Additive only:
--   CREATE TABLE IF NOT EXISTS / ADD COLUMN IF NOT EXISTS (with DEFAULT or nullable) /
--   CREATE INDEX IF NOT EXISTS. Never drop or rename tables, columns or content ids.
-- Separate statements with the breakpoint line below. Update packages/db/src/schema/*.ts
-- in the same commit. A file with only comments is a no-op.
--
-- ALTER TABLE "example" ADD COLUMN IF NOT EXISTS "note" text;
-- --> statement-breakpoint
-- CREATE INDEX IF NOT EXISTS "example_note_idx" ON "example" USING btree ("note");
`;

/** Creates NNNN_<name>.sql and appends the journal entry. Returns { tag, file }. */
export function createMigration(name, dir = DEFAULT_DRIZZLE_DIR, now = Date.now()) {
  const slug = slugifyMigrationName(name);
  if (!slug) throw new Error("migration name is empty: use letters, digits and _ (e.g. chess_puzzle_tags)");
  const problems = checkMigrations(dir);
  if (problems.length) throw new Error(`fix the existing migrations first:\n  - ${problems.join("\n  - ")}`);
  const { journal, eol } = readJournal(dir);
  const idx = journal.entries.length;
  const tag = `${String(idx).padStart(4, "0")}_${slug}`;
  const file = join(dir, `${tag}.sql`);
  if (existsSync(file)) throw new Error(`${file} already exists`);
  const last = journal.entries[idx - 1];
  const when = Math.max(now, last ? last.when + 1000 : now);
  writeFileSync(file, eol === "\n" ? SQL_TEMPLATE(tag) : SQL_TEMPLATE(tag).replace(/\n/g, eol), "utf8");
  journal.entries.push({ idx, version: JOURNAL_VERSION, when, tag, breakpoints: true });
  writeJournal(dir, journal, eol);
  return { tag, file };
}

/** `--dir <path>` lets tests point the scripts at a copy of the drizzle folder. */
export function dirFromArgs(args) {
  const i = args.indexOf("--dir");
  return i >= 0 && args[i + 1] ? resolve(args[i + 1]) : DEFAULT_DRIZZLE_DIR;
}
