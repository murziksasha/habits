import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ws = path.join(root, "workspace");

function git(...args) {
  return spawnSync("git", args, { cwd: ws, encoding: "utf8" });
}

fs.rmSync(ws, { recursive: true, force: true });
fs.mkdirSync(path.join(ws, "src"), { recursive: true });
if (git("init", "-b", "main").status !== 0) {
  git("init");
}
git("config", "user.name", "ForgeBoard Learner");
git("config", "user.email", "learner@forgeboard.local");

fs.writeFileSync(path.join(ws, "src/board.js"), "export function selectTasks(t) { return t; }\n", "utf8");
fs.writeFileSync(path.join(ws, "PR.md"), "# Summary\nResolved conflict.\n", "utf8");
git("add", ".");
git("commit", "-m", "chore: base");

// BUG: Blindly clicked "Accept Current" keeping priority sort and dropping status filter
fs.writeFileSync(
  path.join(ws, "src/board.js"),
  `export function selectTasks(tasks, options = {}) {\n  const { sortPriority = true } = options;\n  return [...tasks].sort((a, b) => (sortPriority ? b.priority - a.priority : 0));\n}\n`,
  "utf8",
);
git("add", "src/board.js");
git("commit", "-m", "fix: accidentally dropped status filter during conflict");
