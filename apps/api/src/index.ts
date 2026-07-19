import { serve } from "@hono/node-server";
import { createApp } from "./app.js";
import { env } from "./env.js";
import { getRedis } from "./redis.js";

const app = createApp();

// Warm Redis connection if configured
const redis = getRedis();
if (redis) {
  redis
    .ping()
    .then(() => console.log("Redis connected"))
    .catch((e) => console.warn("Redis ping failed", e.message));
}

serve({ fetch: app.fetch, port: env.port }, (info) => {
  console.log(`API listening on http://localhost:${info.port}`);
});
