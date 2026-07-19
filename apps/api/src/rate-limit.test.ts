import { describe, expect, it, beforeEach } from "vitest";
import { _resetRateLimits, rateLimitSync } from "./rate-limit.js";

describe("rateLimit", () => {
  beforeEach(() => _resetRateLimits());

  it("allows under limit", () => {
    expect(rateLimitSync({ key: "a", limit: 3, windowMs: 60_000 }).ok).toBe(true);
    expect(rateLimitSync({ key: "a", limit: 3, windowMs: 60_000 }).ok).toBe(true);
    expect(rateLimitSync({ key: "a", limit: 3, windowMs: 60_000 }).ok).toBe(true);
  });

  it("blocks over limit", () => {
    for (let i = 0; i < 3; i++) rateLimitSync({ key: "b", limit: 3, windowMs: 60_000 });
    const r = rateLimitSync({ key: "b", limit: 3, windowMs: 60_000 });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.retryAfterSec).toBeGreaterThan(0);
  });

  it("isolates keys", () => {
    for (let i = 0; i < 3; i++) rateLimitSync({ key: "x", limit: 3, windowMs: 60_000 });
    expect(rateLimitSync({ key: "y", limit: 3, windowMs: 60_000 }).ok).toBe(true);
  });
});
