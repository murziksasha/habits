#!/usr/bin/env node
/**
 * One entry point for database migrations (plain Node, no bash: works on Windows).
 *
 *   pnpm migrate               db:check → db:migrate → content:sync
 *   pnpm migrate --seed        db:check → db:migrate → db:seed (dev/CI only: demo admin + all content)
 *   pnpm migrate new <name>    create the next NNNN_<name>.sql + journal entry (= pnpm db:new)
 *   pnpm migrate check         journal vs SQL files consistency, no database (= pnpm db:check)
 *   pnpm migrate --help
 *
 * db:seed is not part of the default run: it is re-runnable but creates or promotes a demo
 * admin with a known password and TOTP secret, so it must never run against a shared or
 * production database by accident. content:sync covers the same built-in content safely.
 */
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { createRequire } from "node:module";
import { join, relative } from "node:path";
import { pathToFileURL } from "node:url";
import { ROOT, checkMigrations, createMigration, readJournal } from "./migrations-lib.mjs";

export const USAGE = `Usage / Использование:
  pnpm migrate               check → migrate → content:sync
  pnpm migrate --seed        check → migrate → seed (dev/CI only: demo admin + content)
  pnpm migrate new <name>    create packages/db/drizzle/NNNN_<name>.sql + journal entry
  pnpm migrate check         check journal vs SQL files (no database)
  pnpm migrate --help        this help
Options: --dir <path> (other drizzle folder, for new/check)`;

/** Pure argument parser (tested). Returns { mode, name?, seed, dir?, error? }. */
export function parseMigrateArgs(argv) {
  const args = argv.filter((a) => a !== "--");
  const out = { mode: "run", seed: false };
  const rest = [];
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "--help" || a === "-h" || a === "help") return { mode: "help", seed: false };
    else if (a === "--seed") out.seed = true;
    else if (a === "--dir") {
      if (!args[i + 1]) return { ...out, mode: "error", error: "--dir needs a path" };
      out.dir = args[++i];
    } else if (a.startsWith("-")) return { ...out, mode: "error", error: `unknown option ${a}` };
    else rest.push(a);
  }
  const [cmd, ...words] = rest;
  if (cmd === undefined) return out;
  if (cmd === "check") {
    if (words.length) return { ...out, mode: "error", error: "check takes no arguments" };
    if (out.seed) return { ...out, mode: "error", error: "--seed only applies to the full run" };
    return { ...out, mode: "check" };
  }
  if (cmd === "new") {
    if (!words.length) return { ...out, mode: "error", error: "new needs a name, e.g. pnpm migrate new chess_puzzle_tags" };
    if (out.seed) return { ...out, mode: "error", error: "--seed only applies to the full run" };
    return { ...out, mode: "new", name: words.join("_") };
  }
  return { ...out, mode: "error", error: `unknown command ${cmd}` };
}

/** Steps of the full run, in order. */
export function runSteps({ seed }) {
  return [
    { id: "check" },
    { id: "migrate", script: "src/migrate.ts" },
    seed ? { id: "seed", script: "src/seed.ts" } : { id: "content:sync", script: "src/sync-content.ts" },
  ];
}

const DB_DIR = join(ROOT, "packages", "db");

async function loadEnv() {
  // Same loader the API uses; built with @eduforge/db. Each step also loads it itself.
  const built = join(DB_DIR, "dist", "load-env.js");
  if (!existsSync(built)) return false;
  const { loadRootEnv } = await import(pathToFileURL(built).href);
  loadRootEnv();
  return true;
}

function fail(step, detail, laterSteps = true) {
  console.error(`\n✖ Шаг «${step}» завершился с ошибкой / Step "${step}" failed${detail ? `: ${detail}` : ""}.`);
  if (laterSteps) console.error("  Следующие шаги не выполнялись / Later steps were not run.");
  process.exit(1);
}

function runCheck(dir) {
  const problems = checkMigrations(dir);
  if (problems.length) {
    for (const p of problems) console.error(`  - ${p}`);
    return false;
  }
  const { journal } = readJournal(dir ?? join(DB_DIR, "drizzle"));
  console.log(`  OK: ${journal.entries.length} migrations, last ${journal.entries.at(-1)?.tag ?? "none"}`);
  return true;
}

function runTsx(script) {
  const require = createRequire(join(DB_DIR, "package.json"));
  const cli = require.resolve("tsx/cli");
  // node + tsx cli directly: no shell, no pnpm.cmd lookup on Windows.
  const r = spawnSync(process.execPath, [cli, script], { cwd: DB_DIR, stdio: "inherit", env: process.env });
  if (r.error) return r.error.message;
  return r.status === 0 ? null : `exit code ${r.status}`;
}

export async function main(argv = process.argv.slice(2)) {
  const opts = parseMigrateArgs(argv);
  if (opts.mode === "help") {
    console.log(USAGE);
    return;
  }
  if (opts.mode === "error") {
    console.error(`migrate: ${opts.error}\n\n${USAGE}`);
    process.exit(2);
  }
  if (opts.mode === "check") {
    console.log("▶ check");
    if (!runCheck(opts.dir)) fail("check", "", false);
    return;
  }
  if (opts.mode === "new") {
    try {
      const { tag, file } = createMigration(opts.name, opts.dir);
      console.log(`Created ${relative(ROOT, file)} and added "${tag}" to meta/_journal.json.`);
      console.log("Next: write the SQL, update packages/db/src/schema/*.ts, then run pnpm migrate.");
    } catch (e) {
      fail("new", e.message, false);
    }
    return;
  }
  if (opts.dir) {
    console.error("migrate: --dir only applies to new/check");
    process.exit(2);
  }
  const envLoaded = await loadEnv();
  const url = process.env.DATABASE_URL ?? "postgresql://eduforge:eduforge@localhost:5432/eduforge (default)";
  console.log(`DATABASE_URL: ${url.replace(/:[^:@/]+@/, ":***@")}${envLoaded ? "" : " (root .env not preloaded: build @eduforge/db)"}`);
  for (const step of runSteps(opts)) {
    console.log(`\n▶ ${step.id}`);
    if (step.id === "check") {
      if (!runCheck()) fail(step.id);
      continue;
    }
    const err = runTsx(step.script);
    if (err) fail(step.id, err);
  }
  console.log("\n✔ Готово / Done.");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
