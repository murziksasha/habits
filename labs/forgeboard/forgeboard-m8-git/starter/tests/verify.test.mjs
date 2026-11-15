import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ws = path.join(root, "workspace");
const boardPath = path.join(ws, "src/board.js");

test("workspace repo has cleanly resolved merge commit with zero conflict markers", () => {
  assert.ok(fs.existsSync(boardPath), "Run `pnpm lab:init` first");
  const code = fs.readFileSync(boardPath, "utf8");
  assert.doesNotMatch(code, /<<<<<<<|=======|>>>>>>>/, "Conflict markers remain in board.js");

  const status = spawnSync("git", ["status", "--porcelain"], { cwd: ws, encoding: "utf8" });
  assert.equal(status.status, 0);
  assert.doesNotMatch(status.stdout, /^UU\s/m, "Unresolved merge index entry remains (git add & git commit needed)");

  const pr = fs.readFileSync(path.join(ws, "PR.md"), "utf8");
  assert.doesNotMatch(pr, /TODO:/i, "PR.md summary still contains TODO");
});

test("merged selectTasks preserves BOTH status filter and priority sort", async () => {
  const { selectTasks } = await import(`${pathToFileURL(boardPath).href}?t=${Date.now()}`);
  const sample = [
    { id: 1, title: "Low", status: "todo", priority: 1 },
    { id: 2, title: "High todo", status: "todo", priority: 5 },
    { id: 3, title: "High done", status: "done", priority: 9 },
  ];

  const todos = selectTasks(sample, { status: "todo", sortPriority: true });
  assert.deepEqual(
    todos.map((t) => t.id),
    [2, 1],
    "Expected todo filter combined with descending priority sort",
  );
  assert.equal(selectTasks(sample, { status: "done" }).length, 1);
});
