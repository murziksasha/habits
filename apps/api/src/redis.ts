import Redis from "ioredis";

/**
 * Shared Redis client with fast failure.
 * - enableOfflineQueue: false → commands reject at once while disconnected instead of
 *   queueing until a reconnect (that made every request wait seconds when Redis was down).
 * - Short connect / command timeouts; reconnects keep running in the background.
 * - getRedis() returns the client only while it is "ready", so callers use their
 *   in-memory fallback immediately during an outage.
 */
let client: Redis | null = null;
let tried = false;

export const REDIS_CONNECT_TIMEOUT_MS = 1_000;
export const REDIS_COMMAND_TIMEOUT_MS = 500;

/** Underlying client regardless of state (health checks, warm-up). Null when REDIS_URL is unset. */
export function getRedisClient(): Redis | null {
  if (tried) return client;
  tried = true;
  const url = process.env.REDIS_URL;
  if (!url) return null;
  try {
    client = new Redis(url, {
      maxRetriesPerRequest: 1,
      enableReadyCheck: true,
      enableOfflineQueue: false,
      lazyConnect: false,
      connectTimeout: REDIS_CONNECT_TIMEOUT_MS,
      commandTimeout: REDIS_COMMAND_TIMEOUT_MS,
      // Back off up to 5 s between reconnect attempts; never give up.
      retryStrategy: (times) => Math.min(times * 200, 5_000),
    });
    let lastWarn = 0;
    client.on("error", (err) => {
      // An unreachable Redis emits an error per reconnect attempt; log at most every 30 s.
      const now = Date.now();
      if (now - lastWarn > 30_000) {
        lastWarn = now;
        console.warn("[redis]", err.message);
      }
    });
    return client;
  } catch (e) {
    console.warn("[redis] init failed", e);
    client = null;
    return null;
  }
}

/** Client only when connected and ready; otherwise null (use the in-memory fallback). */
export function getRedis(): Redis | null {
  const c = getRedisClient();
  return c && c.status === "ready" ? c : null;
}

/** Test helper: forget the client so the next call reads REDIS_URL again. */
export async function _resetRedisForTests(): Promise<void> {
  const c = client;
  client = null;
  tried = false;
  if (c) c.disconnect();
}
