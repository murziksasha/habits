import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const mutantsDir = path.join(root, "mutants");
const mutants = fs.readdirSync(mutantsDir).filter((f) => f.endsWith(".mjs")).sort();

let survived = [];

// Baseline must pass against real implementation first
const baseRun = spawnSync(process.execPath, ["--test", "tests/suite.test.mjs"], {
  cwd: root,
  encoding: "utf8",
});
if (baseRun.status !== 0) {
  console.error("Baseline suite failed before checking mutants:\n", baseRun.stdout, baseRun.stderr);
  process.exit(1);
}

for (const m of mutants) {
  const targetUrl = pathToFileURL(path.join(mutantsDir, m)).href;
  const run = spawnSync(process.execPath, ["--test", "tests/suite.test.mjs"], {
    cwd: root,
    env: { ...process.env, FORGEBOARD_TARGET_MODULE: targetUrl },
    encoding: "utf8",
  });
  if (run.status === 0) {
    console.error(`SURVIVED: mutant ${m} passed the test suite!`);
    survived.push(m);
  } else {
    console.log(`KILLED: mutant ${m}`);
  }
}

if (survived.length > 0) {
  console.error(`Mutation check failed: ${survived.length} mutant(s) survived (${survived.join(", ")})`);
  process.exit(1);
}
console.log(`All ${mutants.length} mutants killed cleanly!`);
