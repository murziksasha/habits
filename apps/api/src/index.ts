import { serve } from "@hono/node-server";
import { assertProductionSecrets } from "@eduforge/shared";
import { createApp } from "./app.js";
import { env } from "./env.js";
import { log } from "./logger.js";
import { getRedis } from "./redis.js";

assertProductionSecrets(process.env);

const app = createApp();

// Warm Redis connection if configured
const redis = getRedis();
if (redis) {
  redis
    .ping()
    .then(() => log.info("redis_connected"))
    .catch((e) => log.warn("redis_ping_failed", { err: (e as Error).message }));
}

// Bind all interfaces so CI healthchecks via 127.0.0.1/localhost both work
serve({ fetch: app.fetch, port: env.port, hostname: "0.0.0.0" }, (info) => {
  log.info("api_listen", { port: info.port, hostname: "0.0.0.0" });
});
