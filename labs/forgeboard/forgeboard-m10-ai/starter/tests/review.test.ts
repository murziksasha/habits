import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { canActorEditTask, parseLimit, safeSaveTaskNote } from "../src/review-target.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("package.json has zero unvetted third-party runtime dependencies", () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8")) as {
    dependencies?: Record<string, string>;
  };
  assert.equal(Object.keys(pkg.dependencies ?? {}).length, 0);
});

test("parseLimit follows SPEC bounds and rejects floats/non-numbers/negatives", () => {
  assert.equal(parseLimit(undefined), 20);
  assert.equal(parseLimit(""), 20);
  assert.equal(parseLimit("15"), 15);
  assert.equal(parseLimit(120), 50);
  assert.throws(() => parseLimit("abc"), RangeError);
  assert.throws(() => parseLimit(0), RangeError);
  assert.throws(() => parseLimit(-5), RangeError);
  assert.throws(() => parseLimit(3.5), RangeError);
});

test("safeSaveTaskNote sanitizes HTML, validates empty notes, and does NOT swallow I/O errors", async () => {
  let stored = "";
  await safeSaveTaskNote(
    {
      write: async (_id, n) => {
        stored = n;
      },
    },
    1,
    "  <b>Fix</b>  ",
  );
  assert.doesNotMatch(stored, /<b>/);
  assert.match(stored, /&lt;b&gt;/);

  await assert.rejects(
    () => safeSaveTaskNote({ write: async () => {} }, 1, "   "),
    RangeError,
  );
  await assert.rejects(
    () =>
      safeSaveTaskNote(
        {
          write: async () => {
            throw new Error("disk_full");
          },
        },
        1,
        "valid note",
      ),
    /disk_full/,
  );
});

test("canActorEditTask rejects non-owners even when task is marked public", () => {
  assert.equal(canActorEditTask(null, 1), false);
  assert.equal(canActorEditTask({ id: 1, ownerId: 10, isPublic: true }, 20), false);
  assert.equal(canActorEditTask({ id: 1, ownerId: 10, isPublic: true }, 10), true);
});
