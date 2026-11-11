import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ws = path.join(root, "workspace");

function git(...args) {
  const r = spawnSync("git", args, { cwd: ws, encoding: "utf8" });
  return r;
}

fs.rmSync(ws, { recursive: true, force: true });
fs.mkdirSync(path.join(ws, "src"), { recursive: true });

if (git("init", "-b", "main").status !== 0) {
  git("init");
}
git("config", "user.name", "ForgeBoard Learner");
git("config", "user.email", "learner@forgeboard.local");

fs.writeFileSync(
  path.join(ws, "src/board.js"),
  `export function selectTasks(tasks, options = {}) {\n  void options;\n  return [...tasks];\n}\n`,
  "utf8",
);
fs.writeFileSync(path.join(ws, "PR.md"), "# Draft PR\n\nTODO: summarize merged changes and tests.\n", "utf8");
git("add", ".");
git("commit", "-m", "chore: initial board selector");

git("checkout", "-b", "feat/status-filter");
fs.writeFileSync(
  path.join(ws, "src/board.js"),
  `export function selectTasks(tasks, options = {}) {\n  const { status = "" } = options;\n  return tasks.filter((t) => !status || t.status === status);\n}\n`,
  "utf8",
);
git("add", "src/board.js");
git("commit", "-m", "feat: filter tasks by status");

git("checkout", "main");
fs.writeFileSync(
  path.join(ws, "src/board.js"),
  `export function selectTasks(tasks, options = {}) {\n  const { sortPriority = true } = options;\n  return [...tasks].sort((a, b) => (sortPriority ? b.priority - a.priority : 0));\n}\n`,
  "utf8",
);
git("add", "src/board.js");
git("commit", "-m", "feat: sort tasks by priority descending");

// Deliberately produces a real merge conflict in workspace/src/board.js
const mergeRes = git("merge", "feat/status-filter");
console.log("Initialized merge conflict exercise in ./workspace (merge exit:", mergeRes.status, ")");
