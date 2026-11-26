import { afterEach, describe, expect, it } from "vitest";
import { _resetRedisForTests, getRedis, getRedisClient } from "./redis.js";
import { _resetRateLimits, rateLimit } from "./rate-limit.js";
import { getIdempotentResponse, setIdempotentResponse } from "./services/idempotency.js";

describe("redis fast fallback", () => {
  const prev = process.env.REDIS_URL;
  afterEach(async () => {
    await _resetRedisForTests();
    _resetRateLimits();
    if (prev === undefined) delete process.env.REDIS_URL;
    else process.env.REDIS_URL = prev;
  });

  it("returns null without REDIS_URL", async () => {
    delete process.env.REDIS_URL;
    await _resetRedisForTests();
    expect(getRedisClient()).toBeNull();
    expect(getRedis()).toBeNull();
  });

  it("stays fast and falls back to memory when Redis is unreachable", async () => {
    // Port 1 on loopback: connection refused, never ready.
    process.env.REDIS_URL = "redis://127.0.0.1:1";
    await _resetRedisForTests();
    expect(getRedisClient()).not.toBeNull();
    const t0 = Date.now();
    for (let i = 0; i < 50; i++) {
      expect((await rateLimit({ key: `fast:${i % 3}`, limit: 1000, windowMs: 60_000 })).ok).toBe(true);
      await setIdempotentResponse(`k${i}`, { i });
      expect(await getIdempotentResponse(`k${i}`)).toEqual({ i });
    }
    expect(getRedis()).toBeNull();
    expect(Date.now() - t0).toBeLessThan(500);
  });
});
