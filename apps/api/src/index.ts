import { serve } from "@hono/node-server";
import { createApp } from "./app.js";
import { env } from "./env.js";
import { log } from "./logger.js";
import { getRedis } from "./redis.js";

const app = createApp();

// Warm Redis connection if configured
const redis = getRedis();
if (redis) {
  redis
    .ping()
    .then(() => log.info("redis_connected"))
    .catch((e) => log.warn("redis_ping_failed", { err: (e as Error).message }));
}

serve({ fetch: app.fetch, port: env.port }, (info) => {
  log.info("api_listen", { port: info.port });
});
