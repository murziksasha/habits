import assert from "node:assert/strict";
import { test } from "node:test";
import { pathToFileURL } from "node:url";
import path from "node:path";

const fallbackUrl = pathToFileURL(path.resolve("src/board.mjs")).href;
const { paginate, transitionStatus, updateTaskForUser } = await import(
  process.env.FORGEBOARD_TARGET_MODULE || fallbackUrl
);

test("paginate honors 1-based page offset and rejects page < 1", () => {
  const items = ["a", "b", "c", "d", "e"];
  assert.deepEqual(paginate(items, 1, 2), ["a", "b"]);
  assert.deepEqual(paginate(items, 2, 2), ["c", "d"]);
  assert.deepEqual(paginate(items, 3, 2), ["e"]);
  assert.throws(() => paginate(items, 0, 2), RangeError);
});

test("transitionStatus enforces valid workflow state machine", () => {
  assert.equal(transitionStatus("todo", "in_progress"), "in_progress");
  assert.equal(transitionStatus("done", "todo"), "todo");
  assert.throws(() => transitionStatus("done", "in_progress"), { status: 400 });
  assert.throws(() => transitionStatus("todo", "archived"), { status: 400 });
});

test("updateTaskForUser rejects non-owner with 403 and blank title with 400", () => {
  const task = { id: 1, ownerId: 10, title: "Original" };
  assert.throws(() => updateTaskForUser(null, 10, { title: "X" }), { status: 404 });
  assert.throws(() => updateTaskForUser(task, 20, { title: "Hijack" }), { status: 403 });
  assert.throws(() => updateTaskForUser(task, 10, { title: "   " }), { status: 400 });
  assert.deepEqual(updateTaskForUser(task, 10, { title: "Updated" }), {
    id: 1,
    ownerId: 10,
    title: "Updated",
  });
});
