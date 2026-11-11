import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { loadUserTaskDtos } from "../src/server/tasks-loader.js";
import { updateTaskAction } from "../src/server/task-actions.js";
import { filterClientTasks } from "../src/client/task-filter-island.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("client boundary never imports server modules or references server secrets", () => {
  const clientDir = path.join(root, "src/client");
  for (const file of fs.readdirSync(clientDir)) {
    const src = fs.readFileSync(path.join(clientDir, file), "utf8");
    assert.doesNotMatch(src, /from\s+["']\.\.\/server\//, `${file} leaks server module import`);
    assert.doesNotMatch(src, /DATABASE_URL|NEXT_PUBLIC_DATABASE_URL/, `${file} references DB secret`);
  }
});

test("server loader filters by caller and strips confidential columns before serialization", () => {
  const rows = [
    {
      id: 1,
      ownerId: 10,
      title: "Alice Task",
      status: "todo" as const,
      internalAuditSecret: "secret-abc",
      ownerEmail: "alice@example.com",
    },
    {
      id: 2,
      ownerId: 20,
      title: "Bob Task",
      status: "todo" as const,
      internalAuditSecret: "secret-xyz",
      ownerEmail: "bob@example.com",
    },
  ];
  assert.deepEqual(loadUserTaskDtos(rows, null), []);
  const dtos = loadUserTaskDtos(rows, 10);
  assert.equal(dtos.length, 1);
  assert.equal("internalAuditSecret" in dtos[0]!, false);
  assert.equal("ownerEmail" in dtos[0]!, false);
  assert.equal(filterClientTasks(dtos, "alice").length, 1);
});

test("server action validates session, ownership, and payload safely", async () => {
  const rows = [
    {
      id: 1,
      ownerId: 10,
      title: "Original",
      status: "todo" as const,
      internalAuditSecret: "sec",
      ownerEmail: "a@b.c",
    },
  ];
  assert.equal((await updateTaskAction(rows, null, { taskId: 1, title: "X" })).status, 401);
  assert.equal((await updateTaskAction(rows, 20, { taskId: 1, title: "Hijack" })).status, 403);
  assert.equal((await updateTaskAction(rows, 10, { taskId: 1, title: "   " })).status, 400);
  const ok = await updateTaskAction(rows, 10, { taskId: 1, title: "Renamed" });
  assert.equal(ok.status, 200);
  assert.equal(rows[0]!.title, "Renamed");
});
