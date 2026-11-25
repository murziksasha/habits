/**
 * node:test suite for the migration helpers (run by `pnpm --filter @eduforge/db test`).
 * Works on a temp copy of packages/db/drizzle; the real folder is only read.
 */
import assert from "node:assert/strict";
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import {
  DEFAULT_DRIZZLE_DIR,
  checkMigrations,
  createMigration,
  readJournal,
  slugifyMigrationName,
} from "./migrations-lib.mjs";

function tempCopy() {
  const dir = mkdtempSync(join(tmpdir(), "drizzle-"));
  cpSync(DEFAULT_DRIZZLE_DIR, dir, { recursive: true });
  return dir;
}

test("repo migrations and journal are consistent", () => {
  assert.deepEqual(checkMigrations(), []);
});

test("slugifyMigrationName normalises names", () => {
  assert.equal(slugifyMigrationName(" Chess opening-lines "), "chess_opening_lines");
  assert.equal(slugifyMigrationName("!!!"), "");
});

test("createMigration adds the next file and a journal entry in the drizzle format", () => {
  const dir = tempCopy();
  try {
    const before = readJournal(dir).journal.entries;
    const last = before.at(-1);
    const { tag } = createMigration("Dummy check", dir, 0);
    const { journal, raw } = readJournal(dir);
    const entry = journal.entries.at(-1);
    assert.equal(tag, `${String(before.length).padStart(4, "0")}_dummy_check`);
    assert.deepEqual(entry, { idx: before.length, version: "7", when: last.when + 1000, tag, breakpoints: true });
    assert.deepEqual(Object.keys(entry), ["idx", "version", "when", "tag", "breakpoints"]);
    assert.equal(raw, JSON.stringify(journal, null, 4) + "\n");
    assert.match(readFileSync(join(dir, `${tag}.sql`), "utf8"), /Additive only/);
    assert.deepEqual(checkMigrations(dir), []);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("checkMigrations reports a file missing from the journal and a non-increasing when", () => {
  const dir = tempCopy();
  try {
    writeFileSync(join(dir, "9999_orphan.sql"), "SELECT 1;\n");
    const { journal } = readJournal(dir);
    journal.entries.at(-1).when = journal.entries.at(-2).when;
    writeFileSync(join(dir, "meta", "_journal.json"), JSON.stringify(journal, null, 4) + "\n");
    const problems = checkMigrations(dir).join("\n");
    assert.match(problems, /9999_orphan\.sql: not in meta\/_journal\.json/);
    assert.match(problems, /must be greater than the previous entry/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("createMigration keeps CRLF journals as CRLF (Windows checkouts)", () => {
  const dir = tempCopy();
  try {
    const p = join(dir, "meta", "_journal.json");
    writeFileSync(p, readFileSync(p, "utf8").replace(/\n/g, "\r\n"));
    createMigration("crlf", dir);
    const raw = readFileSync(p, "utf8");
    assert.ok(raw.includes("\r\n"));
    assert.ok(!/[^\r]\n/.test(raw));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("pnpm migrate: argument parsing and step order", async () => {
  const { parseMigrateArgs, runSteps } = await import("./migrate.mjs");
  assert.deepEqual(parseMigrateArgs([]), { mode: "run", seed: false });
  assert.deepEqual(parseMigrateArgs(["--"]), { mode: "run", seed: false });
  assert.deepEqual(parseMigrateArgs(["--seed"]), { mode: "run", seed: true });
  assert.equal(parseMigrateArgs(["--help"]).mode, "help");
  assert.equal(parseMigrateArgs(["-h"]).mode, "help");
  assert.deepEqual(parseMigrateArgs(["check"]), { mode: "check", seed: false });
  assert.deepEqual(parseMigrateArgs(["new", "chess", "tags"]), { mode: "new", seed: false, name: "chess_tags" });
  assert.equal(parseMigrateArgs(["new", "x", "--dir", "/tmp/d"]).dir, "/tmp/d");
  assert.equal(parseMigrateArgs(["new"]).mode, "error");
  assert.equal(parseMigrateArgs(["check", "x"]).mode, "error");
  assert.equal(parseMigrateArgs(["check", "--seed"]).mode, "error");
  assert.equal(parseMigrateArgs(["--force"]).mode, "error");
  assert.equal(parseMigrateArgs(["frobnicate"]).mode, "error");
  assert.deepEqual(runSteps({ seed: false }).map((s) => s.id), ["check", "migrate", "content:sync"]);
  assert.deepEqual(runSteps({ seed: true }).map((s) => s.id), ["check", "migrate", "seed"]);
});
