import assert from "node:assert/strict";
import { test } from "node:test";
import { pathToFileURL } from "node:url";
import path from "node:path";

const fallbackUrl = pathToFileURL(path.resolve("src/board.mjs")).href;
const { paginate, transitionStatus } = await import(
  process.env.FORGEBOARD_TARGET_MODULE || fallbackUrl
);

test("checks pagination and transitions but omits ownership check (IDOR survives!)", () => {
  assert.deepEqual(paginate(["a", "b", "c"], 1, 2), ["a", "b"]);
  assert.throws(() => transitionStatus("todo", "archived"), { status: 400 });
});
