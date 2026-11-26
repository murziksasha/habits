import { describe, expect, it, beforeEach } from "vitest";
import {
  _resetRateLimits,
  clientIp,
  normalizeEmailKey,
  rateLimit,
  rateLimitExceeded,
  rateLimitSync,
  trustedProxyHops,
  memoryBucketCount,
  sweepMemoryBuckets,
} from "./rate-limit.js";

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

describe("clientIp (TRUSTED_PROXY_HOPS)", () => {
  const h = (map: Record<string, string>) => ({ get: (n: string) => map[n.toLowerCase()] ?? null });

  it("hops=0 ignores a spoofed X-Forwarded-For and uses the socket address", () => {
    expect(clientIp(h({ "x-forwarded-for": "1.2.3.4" }), "203.0.113.7", 0)).toBe("203.0.113.7");
    expect(clientIp(h({ "x-real-ip": "1.2.3.4" }), "203.0.113.7", 0)).toBe("203.0.113.7");
    expect(clientIp(h({}), undefined, 0)).toBe("unknown");
  });

  it("normalises IPv4-mapped IPv6 socket addresses", () => {
    expect(clientIp(h({}), "::ffff:198.51.100.9", 0)).toBe("198.51.100.9");
  });

  it("hops=1 takes the address our proxy wrote", () => {
    // nginx: proxy_set_header X-Forwarded-For $remote_addr
    expect(clientIp(h({ "x-forwarded-for": "198.51.100.9" }), "172.18.0.5", 1)).toBe("198.51.100.9");
  });

  it("hops=1 picks the right-most untrusted value when the client sent its own header", () => {
    // Appending proxy: "<spoofed>, <real client>" + socket = proxy
    expect(clientIp(h({ "x-forwarded-for": "6.6.6.6, 198.51.100.9" }), "172.18.0.5", 1)).toBe("198.51.100.9");
    expect(clientIp(h({ "x-forwarded-for": " 6.6.6.6 ,7.7.7.7,198.51.100.9 " }), "172.18.0.5", 1)).toBe("198.51.100.9");
  });

  it("hops=2 skips two proxies", () => {
    expect(clientIp(h({ "x-forwarded-for": "6.6.6.6, 198.51.100.9, 10.0.0.2" }), "10.0.0.3", 2)).toBe("198.51.100.9");
  });

  it("falls back to X-Real-IP (one hop) or the socket when X-Forwarded-For is missing", () => {
    expect(clientIp(h({ "x-real-ip": "198.51.100.9" }), "172.18.0.5", 1)).toBe("198.51.100.9");
    expect(clientIp(h({}), "172.18.0.5", 1)).toBe("172.18.0.5");
  });

  it("reads TRUSTED_PROXY_HOPS safely", () => {
    expect(trustedProxyHops({})).toBe(0);
    expect(trustedProxyHops({ TRUSTED_PROXY_HOPS: "1" })).toBe(1);
    expect(trustedProxyHops({ TRUSTED_PROXY_HOPS: "-3" })).toBe(0);
    expect(trustedProxyHops({ TRUSTED_PROXY_HOPS: "abc" })).toBe(0);
    expect(trustedProxyHops({ TRUSTED_PROXY_HOPS: "99" })).toBe(10);
  });
});

describe("per-account failure limiter", () => {
  beforeEach(() => _resetRateLimits());

  it("normalises the email so case and spaces do not create new buckets", () => {
    expect(normalizeEmailKey("  Alice@Example.COM ")).toBe("alice@example.com");
  });

  it("peek does not count; recorded failures lock the account regardless of IP", async () => {
    const opts = { key: `auth:login:acct:${normalizeEmailKey("Victim@x.test")}`, limit: 3, windowMs: 60_000 };
    for (let i = 0; i < 5; i++) expect((await rateLimitExceeded(opts)).ok).toBe(true);
    for (let i = 0; i < 3; i++) await rateLimit(opts); // three wrong passwords from three IPs
    const r = await rateLimitExceeded({ ...opts, key: `auth:login:acct:${normalizeEmailKey(" victim@X.test")}` });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.retryAfterSec).toBeGreaterThan(0);
    expect((await rateLimitExceeded({ ...opts, key: "auth:login:acct:other@x.test" })).ok).toBe(true);
  });
});

describe("memory limiter bounds", () => {
  beforeEach(() => _resetRateLimits());

  it("caps the number of keys, evicting the least recently used", () => {
    for (let i = 0; i < 1_500; i++) rateLimitSync({ key: `k${i}`, limit: 5, windowMs: 60_000, maxKeys: 1_000 });
    expect(memoryBucketCount()).toBeLessThanOrEqual(1_000);
    // The newest keys survive; k0 (oldest) was evicted and starts fresh.
    for (let i = 0; i < 5; i++) rateLimitSync({ key: "k1499", limit: 5, windowMs: 60_000, maxKeys: 1_000 });
    expect(rateLimitSync({ key: "k1499", limit: 5, windowMs: 60_000, maxKeys: 1_000 }).ok).toBe(false);
  });

  it("a hit refreshes a key so it is not evicted first", () => {
    for (let i = 0; i < 4; i++) rateLimitSync({ key: "hot", limit: 4, windowMs: 60_000, maxKeys: 1_000 });
    for (let i = 0; i < 1_200; i++) {
      rateLimitSync({ key: `cold${i}`, limit: 5, windowMs: 60_000, maxKeys: 1_000 });
      if (i % 100 === 0) rateLimitSync({ key: "hot", limit: 4, windowMs: 60_000, maxKeys: 1_000 });
    }
    // still blocked: its bucket survived the evictions
    expect(rateLimitSync({ key: "hot", limit: 4, windowMs: 60_000, maxKeys: 1_000 }).ok).toBe(false);
  });

  it("sweeps expired buckets", () => {
    for (let i = 0; i < 50; i++) rateLimitSync({ key: `e${i}`, limit: 5, windowMs: 1_000 });
    expect(memoryBucketCount()).toBe(50);
    sweepMemoryBuckets(Date.now() + 2_000);
    expect(memoryBucketCount()).toBe(0);
  });
});
