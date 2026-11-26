import { afterEach, describe, expect, it, vi } from "vitest";
import { Hono } from "hono";
import { _setSentryForTests, captureException, initSentry, sentryEnabled } from "./sentry.js";
import { currentRequestId, runWithRequestId, sanitizeRequestId } from "./logger.js";

describe("sentry (optional)", () => {
  afterEach(() => _setSentryForTests(null));

  it("is disabled without SENTRY_DSN and capture is a no-op", async () => {
    const prev = process.env.SENTRY_DSN;
    delete process.env.SENTRY_DSN;
    expect(await initSentry("api")).toBe(false);
    expect(sentryEnabled()).toBe(false);
    expect(() => captureException(new Error("x"))).not.toThrow();
    if (prev !== undefined) process.env.SENTRY_DSN = prev;
  });

  it("tags captured errors with the request id", () => {
    const tags: Record<string, string> = {};
    const captured: unknown[] = [];
    const fake = {
      withScope: (cb: (s: { setTag: (k: string, v: string) => void }) => void) =>
        cb({ setTag: (k, v) => (tags[k] = v) }),
      captureException: (e: unknown) => captured.push(e),
    };
    _setSentryForTests(fake as never);
    const err = new Error("boom");
    captureException(err, { requestId: "req-1", path: "/x", method: "GET" });
    expect(captured).toEqual([err]);
    expect(tags).toMatchObject({ request_id: "req-1", "http.path": "/x", "http.method": "GET" });
  });
});

describe("request id", () => {
  it("accepts only short log-safe ids", () => {
    expect(sanitizeRequestId("abc-123_x.y:z")).toBe("abc-123_x.y:z");
    expect(sanitizeRequestId("a\nb")).toBeNull();
    expect(sanitizeRequestId("x".repeat(65))).toBeNull();
    expect(sanitizeRequestId(undefined)).toBeNull();
  });

  it("is attached to every log line inside a request", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    runWithRequestId("rid-42", () => {
      expect(currentRequestId()).toBe("rid-42");
    });
    expect(currentRequestId()).toBeUndefined();
    spy.mockRestore();
  });

  it("app echoes a safe x-request-id and replaces an unsafe one", async () => {
    const { createApp } = await import("./app.js");
    const app: Hono = createApp();
    const ok = await app.request("/health", { headers: { "x-request-id": "client-id-1" } });
    expect(ok.headers.get("x-request-id")).toBe("client-id-1");
    const bad = await app.request("/health", { headers: { "x-request-id": "evil\" injected" } });
    expect(bad.headers.get("x-request-id")).not.toContain("evil");
  });
});
