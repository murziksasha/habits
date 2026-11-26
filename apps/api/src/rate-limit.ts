/** Sliding-window rate limiter: Redis when available, else in-memory. */

import { getRedis } from "./redis.js";

/**
 * In-memory fallback store. Bounded: a bucket expires `windowMs` after its last
 * hit and is swept periodically; above MEMORY_RATE_LIMIT_MAX_KEYS keys the least
 * recently used buckets are evicted (Map keeps insertion order and every hit
 * re-inserts its key), so random keys from an attacker cannot grow memory.
 */
type Bucket = { timestamps: number[]; expiresAt: number };
const buckets = new Map<string, Bucket>();

export const MEMORY_RATE_LIMIT_MAX_KEYS = Math.max(
  1_000,
  Number(process.env.MEMORY_RATE_LIMIT_MAX_KEYS ?? 50_000) || 50_000,
);
const SWEEP_EVERY_MS = 60_000;
let lastSweep = Date.now();

/** Drop expired buckets; then, if still over `maxKeys`, the least recently used. */
export function sweepMemoryBuckets(now = Date.now(), maxKeys = MEMORY_RATE_LIMIT_MAX_KEYS) {
  for (const [k, b] of buckets) if (b.expiresAt <= now) buckets.delete(k);
  if (buckets.size > maxKeys) {
    let drop = buckets.size - maxKeys;
    for (const k of buckets.keys()) {
      if (drop-- <= 0) break;
      buckets.delete(k);
    }
  }
  lastSweep = now;
}

export function memoryBucketCount() {
  return buckets.size;
}

function touch(key: string, bucket: Bucket, now: number, windowMs: number, maxKeys = MEMORY_RATE_LIMIT_MAX_KEYS) {
  const last = bucket.timestamps[bucket.timestamps.length - 1] ?? now;
  bucket.expiresAt = last + windowMs;
  buckets.delete(key); // re-insert → most recently used at the end
  buckets.set(key, bucket);
  if (now - lastSweep > SWEEP_EVERY_MS) sweepMemoryBuckets(now, maxKeys);
  // O(1) at the cap: evict the least recently used key(s).
  while (buckets.size > maxKeys) {
    const oldest = buckets.keys().next().value;
    if (oldest === undefined) break;
    buckets.delete(oldest);
  }
}

export async function rateLimit(opts: {
  key: string;
  limit: number;
  windowMs: number;
}): Promise<{ ok: true } | { ok: false; retryAfterSec: number }> {
  const redis = getRedis();
  if (redis) {
    try {
      return await redisRateLimit(redis, opts);
    } catch (e) {
      console.warn("[rate-limit] redis failed, fallback memory", e);
    }
  }
  return memoryRateLimit(opts);
}

async function redisRateLimit(
  redis: NonNullable<ReturnType<typeof getRedis>>,
  opts: { key: string; limit: number; windowMs: number },
): Promise<{ ok: true } | { ok: false; retryAfterSec: number }> {
  const now = Date.now();
  const k = `rl:${opts.key}`;
  const pipe = redis.pipeline();
  pipe.zremrangebyscore(k, 0, now - opts.windowMs);
  pipe.zadd(k, now.toString(), `${now}-${Math.random()}`);
  pipe.zcard(k);
  pipe.pexpire(k, opts.windowMs);
  const results = await pipe.exec();
  const count = Number(results?.[2]?.[1] ?? 0);
  if (count > opts.limit) {
    const oldest = await redis.zrange(k, 0, 0, "WITHSCORES");
    const oldestScore = Number(oldest[1] ?? now);
    const retryAfterSec = Math.max(
      1,
      Math.ceil((opts.windowMs - (now - oldestScore)) / 1000),
    );
    return { ok: false, retryAfterSec };
  }
  return { ok: true };
}

function memoryRateLimit(opts: {
  key: string;
  limit: number;
  windowMs: number;
  maxKeys?: number;
}): { ok: true } | { ok: false; retryAfterSec: number } {
  const now = Date.now();
  const bucket = buckets.get(opts.key) ?? { timestamps: [], expiresAt: now + opts.windowMs };
  bucket.timestamps = bucket.timestamps.filter((t) => now - t < opts.windowMs);

  if (bucket.timestamps.length >= opts.limit) {
    const oldest = bucket.timestamps[0] ?? now;
    const retryAfterSec = Math.max(1, Math.ceil((opts.windowMs - (now - oldest)) / 1000));
    touch(opts.key, bucket, now, opts.windowMs, opts.maxKeys);
    return { ok: false, retryAfterSec };
  }

  bucket.timestamps.push(now);
  touch(opts.key, bucket, now, opts.windowMs, opts.maxKeys);
  return { ok: true };
}

/** Sync wrapper for tests / simple call sites that can't await easily */
export function rateLimitSync(opts: {
  key: string;
  limit: number;
  windowMs: number;
  /** Override the key cap (tests). */
  maxKeys?: number;
}): { ok: true } | { ok: false; retryAfterSec: number } {
  return memoryRateLimit(opts);
}

export function _resetRateLimits() {
  buckets.clear();
  lastSweep = Date.now();
}

/**
 * Rate-limit peek: true when `key` already has `limit` hits in the window. Adds nothing.
 * Pair with rateLimit() to count only failures (e.g. wrong passwords per account).
 */
export async function rateLimitExceeded(opts: {
  key: string;
  limit: number;
  windowMs: number;
}): Promise<{ ok: true } | { ok: false; retryAfterSec: number }> {
  const now = Date.now();
  const redis = getRedis();
  if (redis) {
    try {
      const k = `rl:${opts.key}`;
      await redis.zremrangebyscore(k, 0, now - opts.windowMs);
      const count = await redis.zcard(k);
      if (count < opts.limit) return { ok: true };
      const oldest = await redis.zrange(k, 0, 0, "WITHSCORES");
      const oldestScore = Number(oldest[1] ?? now);
      return { ok: false, retryAfterSec: Math.max(1, Math.ceil((opts.windowMs - (now - oldestScore)) / 1000)) };
    } catch (e) {
      console.warn("[rate-limit] redis failed, fallback memory", e);
    }
  }
  const bucket = buckets.get(opts.key);
  const recent = (bucket?.timestamps ?? []).filter((t) => now - t < opts.windowMs);
  if (recent.length < opts.limit) return { ok: true };
  const oldest = recent[0] ?? now;
  return { ok: false, retryAfterSec: Math.max(1, Math.ceil((opts.windowMs - (now - oldest)) / 1000)) };
}

/** Normalised account key for per-account limits (trimmed, lower-cased, bounded). */
export function normalizeEmailKey(email: string): string {
  return email.trim().toLowerCase().slice(0, 254);
}

/**
 * Number of reverse proxies in front of the API that append to / set X-Forwarded-For.
 * 0 (default): ignore forwarding headers and use the socket address — a client can
 * put anything in X-Forwarded-For, so it is only trusted when a proxy we run sets it.
 * docker-compose behind docker/nginx.conf uses 1.
 */
export function trustedProxyHops(env: Record<string, string | undefined> = process.env): number {
  const n = Number.parseInt(env.TRUSTED_PROXY_HOPS ?? "0", 10);
  return Number.isFinite(n) && n > 0 ? Math.min(n, 10) : 0;
}

function normalizeIp(ip: string | null | undefined): string | null {
  const v = (ip ?? "").trim();
  if (!v) return null;
  // IPv4-mapped IPv6 from Node sockets: ::ffff:203.0.113.7 → 203.0.113.7
  return v.toLowerCase().startsWith("::ffff:") && v.includes(".") ? v.slice(7) : v;
}

/**
 * Client IP for rate limiting.
 * The address chain is X-Forwarded-For (left → right) followed by the socket peer.
 * The right-most `hops` entries are our own proxies; the entry just left of them is the
 * client. Anything further left was supplied by the client and is ignored.
 */
export function clientIp(
  headers: { get(name: string): string | null | undefined },
  remoteAddress?: string | null,
  hops: number = trustedProxyHops(),
): string {
  const peer = normalizeIp(remoteAddress) ?? "unknown";
  if (hops <= 0) return peer;
  const forwarded = (headers.get("x-forwarded-for") ?? "")
    .split(",")
    .map((p) => normalizeIp(p))
    .filter((p): p is string => !!p);
  if (forwarded.length === 0) {
    // A trusted proxy that only sets X-Real-IP (single hop).
    return (hops === 1 ? normalizeIp(headers.get("x-real-ip")) : null) ?? peer;
  }
  const chain = [...forwarded, peer];
  const idx = chain.length - 1 - hops;
  return chain[Math.max(0, idx)]!;
}

/** clientIp() for a Hono context on @hono/node-server (socket peer from c.env.incoming). */
export function requestClientIp(c: {
  req: { header(name: string): string | undefined };
  env?: unknown;
}): string {
  const incoming = (c.env as { incoming?: { socket?: { remoteAddress?: string } } } | undefined)?.incoming;
  return clientIp({ get: (n) => c.req.header(n) ?? null }, incoming?.socket?.remoteAddress ?? null);
}
