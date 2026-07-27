import { describe, expect, it } from "vitest";
import {
  getIdempotentResponse,
  normalizeIdempotencyKey,
  setIdempotentResponse,
} from "./idempotency.js";

describe("normalizeIdempotencyKey", () => {
  it("accepts uuid-like tokens", () => {
    expect(normalizeIdempotencyKey("a1b2c3d4-e5f6")).toBe("a1b2c3d4-e5f6");
    expect(normalizeIdempotencyKey("  abc_123  ")).toBe("abc_123");
  });

  it("rejects junk", () => {
    expect(normalizeIdempotencyKey("")).toBeNull();
    expect(normalizeIdempotencyKey("has space")).toBeNull();
    expect(normalizeIdempotencyKey({ x: 1 })).toBeNull();
    expect(normalizeIdempotencyKey("bad!key")).toBeNull();
  });

  it("truncates long safe keys to 64", () => {
    const long = "a".repeat(100);
    expect(normalizeIdempotencyKey(long)).toBe("a".repeat(64));
  });
});

describe("idempotency memory cache", () => {
  it("round-trips payload", async () => {
    const key = `test-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    expect(await getIdempotentResponse(key)).toBeNull();
    await setIdempotentResponse(key, { ok: true, n: 42 }, 60);
    const hit = await getIdempotentResponse<{ ok: boolean; n: number }>(key);
    expect(hit).toEqual({ ok: true, n: 42 });
  });
});
