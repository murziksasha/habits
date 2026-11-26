/**
 * Per-socket sliding window for Socket.IO events. Bounded: buckets of a socket
 * are dropped on disconnect (forgetSocket), expired buckets are swept, and the
 * map never exceeds MAX_KEYS (least recently used evicted first).
 */

type Bucket = { timestamps: number[]; expiresAt: number };
const buckets = new Map<string, Bucket>();
const MAX_KEYS = 20_000;
const SWEEP_EVERY_MS = 60_000;
let lastSweep = Date.now();

export function allowSocketEvent(
  socketId: string,
  event: string,
  opts?: { limit?: number; windowMs?: number; maxKeys?: number },
): boolean {
  const limit = opts?.limit ?? 20;
  const windowMs = opts?.windowMs ?? 1000;
  const maxKeys = opts?.maxKeys ?? MAX_KEYS;
  const key = `${socketId}:${event}`;
  const now = Date.now();
  if (now - lastSweep > SWEEP_EVERY_MS) sweepSocketEventLimits(now);
  const bucket = buckets.get(key) ?? { timestamps: [], expiresAt: now + windowMs };
  bucket.timestamps = bucket.timestamps.filter((t) => now - t < windowMs);
  const allowed = bucket.timestamps.length < limit;
  if (allowed) bucket.timestamps.push(now);
  bucket.expiresAt = (bucket.timestamps[bucket.timestamps.length - 1] ?? now) + windowMs;
  buckets.delete(key);
  buckets.set(key, bucket);
  while (buckets.size > maxKeys) {
    const oldest = buckets.keys().next().value;
    if (oldest === undefined) break;
    buckets.delete(oldest);
  }
  return allowed;
}

/** Drop every bucket of a disconnected socket. */
export function forgetSocket(socketId: string) {
  const prefix = `${socketId}:`;
  for (const k of buckets.keys()) if (k.startsWith(prefix)) buckets.delete(k);
}

export function sweepSocketEventLimits(now = Date.now()) {
  for (const [k, b] of buckets) if (b.expiresAt <= now) buckets.delete(k);
  lastSweep = now;
}

export function socketEventBucketCount() {
  return buckets.size;
}

export function _resetSocketEventLimits() {
  buckets.clear();
  lastSweep = Date.now();
}
