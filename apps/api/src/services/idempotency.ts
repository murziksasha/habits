/**
 * Short-lived idempotency cache for mutating learning endpoints.
 * Prefers Redis when available; falls back to in-process Map (single instance).
 */

import { getRedis } from "../redis.js";

const PREFIX = "idem:";
const mem = new Map<string, { expiresAt: number; payload: string }>();

function pruneMem(now = Date.now()) {
  if (mem.size < 200) return;
  for (const [k, v] of mem) {
    if (v.expiresAt <= now) mem.delete(k);
  }
  // hard cap
  if (mem.size > 500) {
    const keys = [...mem.keys()].slice(0, mem.size - 400);
    for (const k of keys) mem.delete(k);
  }
}

export async function getIdempotentResponse<T = unknown>(
  key: string,
): Promise<T | null> {
  if (!key || key.length > 128) return null;
  const redis = getRedis();
  if (redis) {
    try {
      const raw = await redis.get(PREFIX + key);
      if (!raw) return null;
      return JSON.parse(raw) as T;
    } catch {
      /* fall through */
    }
  }
  const row = mem.get(key);
  if (!row) return null;
  if (row.expiresAt <= Date.now()) {
    mem.delete(key);
    return null;
  }
  try {
    return JSON.parse(row.payload) as T;
  } catch {
    mem.delete(key);
    return null;
  }
}

export async function setIdempotentResponse(
  key: string,
  body: unknown,
  ttlSec = 120,
): Promise<void> {
  if (!key || key.length > 128) return;
  const payload = JSON.stringify(body);
  const redis = getRedis();
  if (redis) {
    try {
      await redis.set(PREFIX + key, payload, "EX", Math.max(5, ttlSec));
      return;
    } catch {
      /* fall through to memory */
    }
  }
  pruneMem();
  mem.set(key, {
    expiresAt: Date.now() + Math.max(5, ttlSec) * 1000,
    payload,
  });
}

/** Normalize client key: strip to safe charset, max length. */
export function normalizeIdempotencyKey(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const s = raw.trim().slice(0, 64);
  if (!s || !/^[a-zA-Z0-9_-]+$/.test(s)) return null;
  return s;
}
