import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { validateRestoreTarget } from "../scripts/restore-check.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("service deployment manifest pins immutable image digest and matching readiness probe", () => {
  const svc = JSON.parse(fs.readFileSync(path.join(root, "deploy/service.json"), "utf8"));
  assert.doesNotMatch(svc.image, /:latest$/);
  assert.match(svc.image, /@sha256:[a-f0-9]{16,}/);
  assert.equal(svc.readinessProbe.path, "/ready");
  assert.equal(svc.readinessProbe.port, Number(svc.env.API_PORT));
  assert.equal(svc.env.DATABASE_URL, undefined, "Never embed DB secret URL inside deploy JSON");

  const envEx = fs.readFileSync(path.join(root, "deploy/env.example"), "utf8");
  assert.doesNotMatch(envEx, /devpassword/i);
  assert.match(envEx, /ALLOW_DEV_BILLING=false/);
});

test("restore-check enforces isolated scratch DB and blocks live prod targets", () => {
  assert.throws(
    () => validateRestoreTarget("postgres://user:pass@prod-db.internal:5432/eduforge"),
    /prod|isolated|restore_check/i,
  );
  assert.throws(
    () => validateRestoreTarget("postgres://user:pass@localhost:5432/eduforge"),
    /restore_check/i,
  );
  const ok = validateRestoreTarget("postgres://user:pass@localhost:5432/forgeboard_restore_check");
  assert.equal(ok.ok, true);
});

test("postmortem accurately documents rollout-503 root cause and prevention", () => {
  const pm = JSON.parse(fs.readFileSync(path.join(root, "runbook/postmortem.json"), "utf8"));
  assert.notEqual(pm.rootCause, "TODO");
  assert.match(pm.rootCause, /migration/i);
  assert.match(pm.prevention, /(readiness|migration|ci|gate)/i);
});
