import assert from "node:assert/strict";
import { test } from "node:test";
import { pathToFileURL } from "node:url";
import path from "node:path";

const fallbackUrl = pathToFileURL(path.resolve("src/board.mjs")).href;
const { paginate, transitionStatus, updateTaskForUser } = await import(
  process.env.FORGEBOARD_TARGET_MODULE || fallbackUrl
);

test("smoke test: empty array paginate returns empty array (TOO WEAK — add real checks!)", () => {
  assert.deepEqual(paginate([], 1, 10), []);
});
