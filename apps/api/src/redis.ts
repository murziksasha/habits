import Redis from "ioredis";

let client: Redis | null = null;
let tried = false;

export function getRedis(): Redis | null {
  if (tried) return client;
  tried = true;
  const url = process.env.REDIS_URL;
  if (!url) return null;
  try {
    client = new Redis(url, {
      maxRetriesPerRequest: 1,
      enableReadyCheck: true,
      lazyConnect: false,
    });
    client.on("error", (err) => {
      console.warn("[redis]", err.message);
    });
    return client;
  } catch (e) {
    console.warn("[redis] init failed", e);
    client = null;
    return null;
  }
}
