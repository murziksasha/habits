/** Sliding-window rate limiter: Redis when available, else in-memory. */

import { getRedis } from "./redis.js";

type Bucket = { timestamps: number[] };
const buckets = new Map<string, Bucket>();

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
}): { ok: true } | { ok: false; retryAfterSec: number } {
  const now = Date.now();
  const bucket = buckets.get(opts.key) ?? { timestamps: [] };
  bucket.timestamps = bucket.timestamps.filter((t) => now - t < opts.windowMs);

  if (bucket.timestamps.length >= opts.limit) {
    const oldest = bucket.timestamps[0] ?? now;
    const retryAfterSec = Math.max(1, Math.ceil((opts.windowMs - (now - oldest)) / 1000));
    buckets.set(opts.key, bucket);
    return { ok: false, retryAfterSec };
  }

  bucket.timestamps.push(now);
  buckets.set(opts.key, bucket);
  return { ok: true };
}

/** Sync wrapper for tests / simple call sites that can't await easily */
export function rateLimitSync(opts: {
  key: string;
  limit: number;
  windowMs: number;
}): { ok: true } | { ok: false; retryAfterSec: number } {
  return memoryRateLimit(opts);
}

export function _resetRateLimits() {
  buckets.clear();
}

export function clientIp(headers: { get(name: string): string | null | undefined }): string {
  const xf = headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0]?.trim() || "unknown";
  return headers.get("x-real-ip") ?? "unknown";
}
