/** Per-socket sliding window for Socket.IO events. */

type Bucket = { timestamps: number[] };
const buckets = new Map<string, Bucket>();

export function allowSocketEvent(
  socketId: string,
  event: string,
  opts?: { limit?: number; windowMs?: number },
): boolean {
  const limit = opts?.limit ?? 20;
  const windowMs = opts?.windowMs ?? 1000;
  const key = `${socketId}:${event}`;
  const now = Date.now();
  const bucket = buckets.get(key) ?? { timestamps: [] };
  bucket.timestamps = bucket.timestamps.filter((t) => now - t < windowMs);
  if (bucket.timestamps.length >= limit) {
    buckets.set(key, bucket);
    return false;
  }
  bucket.timestamps.push(now);
  buckets.set(key, bucket);
  return true;
}

export function _resetSocketEventLimits() {
  buckets.clear();
}
