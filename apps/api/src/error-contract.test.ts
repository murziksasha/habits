import { afterEach, describe, expect, it } from "vitest";
import { createApp } from "./app.js";

describe("error contract", () => {
  const prev = process.env.NODE_ENV;

  afterEach(() => {
    process.env.NODE_ENV = prev;
  });

  it("ready probe is public and returns checks", async () => {
    const app = createApp();
    const res = await app.request("/ready");
    // 200 or 503 depending on local DB; body shape is stable
    expect([200, 503]).toContain(res.status);
    const body = await res.json();
    expect(body.service).toBe("api");
    expect(body.checks).toBeTruthy();
    expect(typeof body.checks.db).toBe("boolean");
  });

  it("sets x-request-id on responses", async () => {
    const app = createApp();
    const res = await app.request("/health");
    expect(res.headers.get("x-request-id")).toBeTruthy();
  });

  it("unknown routes return not_found without stack", async () => {
    const app = createApp();
    const res = await app.request("/no-such-route-xyz");
    expect(res.status).toBe(404);
    const body = await res.json();
    expect(body.error).toBe("not_found");
    expect(body.stack).toBeUndefined();
  });

  it("internal errors omit message in production", async () => {
    process.env.NODE_ENV = "production";
    const app = createApp();
    const res = await app.request("/__test/throw");
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toBe("internal");
    expect(body.message).toBeUndefined();
  });

  it("internal errors include message outside production", async () => {
    process.env.NODE_ENV = "development";
    const app = createApp();
    const res = await app.request("/__test/throw");
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toBe("internal");
    expect(body.message).toBe("secret_internal_detail");
  });
});
