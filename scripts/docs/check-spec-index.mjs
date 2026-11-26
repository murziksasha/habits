#!/usr/bin/env node
// Fails when a SPEC/*.md file is missing from SPEC/README.md or the index links to a missing file.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const specDir = join(root, "SPEC");
const index = readFileSync(join(specDir, "README.md"), "utf8");
const problems = [];
for (const f of readdirSync(specDir).filter((x) => x.endsWith(".md") && x !== "README.md")) {
  if (!index.includes(`(./${f}`)) problems.push(`not indexed: SPEC/${f}`);
}
for (const m of index.matchAll(/\]\((\.{1,2}\/[^)#\s]+)/g)) {
  if (!existsSync(join(specDir, m[1]))) problems.push(`broken link: ${m[1]}`);
}
if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log("SPEC index ok");
