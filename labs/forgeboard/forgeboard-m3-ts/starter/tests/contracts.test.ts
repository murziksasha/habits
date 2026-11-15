import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { parseTaskPayload, renderAsyncSummary, safePickFirstTitle } from "../src/validators.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("source files avoid `any`, `@ts-ignore`, and `@ts-nocheck`", () => {
  for (const rel of ["src/models.ts", "src/validators.ts"]) {
    const src = fs.readFileSync(path.join(root, rel), "utf8");
    assert.doesNotMatch(src, /:\s*any\b|<any>|as\s+any\b/, `${rel} must not use any`);
    assert.doesNotMatch(src, /@ts-ignore|@ts-nocheck|@ts-expect-error/, `${rel} must not suppress tsc`);
  }
});

test("parseTaskPayload validates unknown inputs strictly", () => {
  assert.deepEqual(parseTaskPayload(null), {
    ok: false,
    error: { code: "invalid_payload", message: "Expected non-null object" },
  });
  assert.equal(parseTaskPayload({ id: 1, title: "   ", status: "todo" }).ok, false);
  assert.equal(parseTaskPayload({ id: 1, title: "Ship M3", status: "broken" }).ok, false);
  assert.equal(parseTaskPayload({ id: "1", title: "Ship M3", status: "todo" }).ok, false);

  const valid = parseTaskPayload({ id: 7, title: "  Strict contracts  ", status: "in_progress" });
  assert.deepEqual(valid, {
    ok: true,
    value: { id: 7, title: "Strict contracts", status: "in_progress" },
  });
});

test("discriminated union AsyncState exhaustively renders each state", () => {
  assert.match(renderAsyncSummary({ kind: "loading" } as never), /loading/i);
  assert.match(renderAsyncSummary({ kind: "error", message: "Timeout" } as never), /Timeout/);
  assert.match(
    renderAsyncSummary({
      kind: "success",
      data: [{ id: 1, title: "First", status: "todo" }],
    } as never),
    /1 task/,
  );
  assert.equal(safePickFirstTitle([]), null);
  assert.equal(safePickFirstTitle([{ id: 1, title: "Alpha", status: "done" }]), "Alpha");
});
