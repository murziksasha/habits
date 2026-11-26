import assert from "node:assert/strict";
import { test } from "node:test";
import { resolveAdminPassword } from "./admin-password.js";

test("ADMIN_PASSWORD is required (no default)", () => {
  assert.equal(resolveAdminPassword({}).ok, false);
  assert.equal(resolveAdminPassword({ ADMIN_PASSWORD: "" }).ok, false);
  assert.equal(resolveAdminPassword({ NODE_ENV: "production" }).ok, false);
});

test("development accepts any explicit password", () => {
  assert.deepEqual(resolveAdminPassword({ ADMIN_PASSWORD: "admin12345" }), { ok: true, password: "admin12345" });
});

test("production refuses published, short or guessable passwords", () => {
  const prod = (p: string, extra: Record<string, string> = {}) =>
    resolveAdminPassword({ NODE_ENV: "production", ADMIN_PASSWORD: p, ...extra }).ok;
  assert.equal(prod("admin12345"), false);
  assert.equal(prod("ADMIN12345"), false);
  assert.equal(prod("short-Pw1"), false);
  assert.equal(prod("aaaaaaaaaaaaaaaa"), false);
  assert.equal(prod("sasha.admin.ua", { ADMIN_EMAIL: "sasha.admin.ua@x.ua" }), false);
  assert.equal(prod("correct-horse-battery-7"), true);
});
