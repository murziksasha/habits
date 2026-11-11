import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { after, before, test } from "node:test";
import { fileURLToPath } from "node:url";
import postgres from "postgres";
import { runMigrations } from "../src/migrate.js";
import { ForgeBoardRepo } from "../src/repo.js";

const dbUrl =
  process.env.DATABASE_URL ?? "postgres://forgeboard:forgeboard@127.0.0.1:5432/forgeboard";
const sql = postgres(dbUrl, { max: 2 });
const repo = new ForgeBoardRepo(sql);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

before(async () => {
  await runMigrations(dbUrl);
  await sql`TRUNCATE TABLE audit_logs, tasks, projects, users RESTART IDENTITY CASCADE`;
});

after(async () => {
  await sql.end();
});

test("migration defines CHECK constraint and composite index on (project_id, status)", () => {
  const ddl = fs.readFileSync(path.join(root, "migrations/001_init.sql"), "utf8");
  assert.match(ddl, /CHECK\s*\(/i, "Missing CHECK constraint on status/title");
  assert.match(ddl, /CREATE INDEX[\s\S]*ON\s+tasks\s*\(\s*project_id\s*,\s*status\s*\)/i);

  const repoSrc = fs.readFileSync(path.join(root, "src/repo.ts"), "utf8");
  assert.doesNotMatch(repoSrc, /\.unsafe\(/, "Parameterized queries must not use sql.unsafe");
});

test("parameterized CRUD safely stores injection payloads as literal text and enforces CHECK", async () => {
  const ownerId = await repo.createUser("pg-learner@forgeboard.local");
  const p1 = await repo.createProject(ownerId, "Core App");
  const evilTitle = "Review PR'; DROP TABLE tasks; --";
  const task = await repo.createTask(p1, evilTitle, "todo");
  assert.equal(task.title, evilTitle);

  const found = await repo.listTasks(p1, "todo");
  assert.equal(found.length, 1);
  assert.equal(found[0]!.title, evilTitle);

  await assert.rejects(() => repo.createTask(p1, "Bad status", "invalid_state"));
});

test("moveTaskWithAudit rolls back task move cleanly when target project FK fails", async () => {
  const ownerId = await repo.createUser("tx-user@forgeboard.local");
  const p1 = await repo.createProject(ownerId, "Source");
  const p2 = await repo.createProject(ownerId, "Dest");
  const task = await repo.createTask(p1, "Move me");

  await assert.rejects(() => repo.moveTaskWithAudit(task.id, 999999, ownerId));
  const afterFail = await repo.listTasks(p1);
  assert.equal(afterFail.some((t) => t.id === task.id), true, "Failed move must rollback");
  const orphanLogs = await sql`SELECT * FROM audit_logs WHERE task_id = ${task.id}`;
  assert.equal(orphanLogs.length, 0, "Audit log insert must rollback on failed move");

  await repo.moveTaskWithAudit(task.id, p2, ownerId);
  const inDest = await repo.listTasks(p2);
  assert.equal(inDest.some((t) => t.id === task.id), true);
  const logs = await sql`SELECT * FROM audit_logs WHERE task_id = ${task.id}`;
  assert.equal(logs.length, 1);
});
