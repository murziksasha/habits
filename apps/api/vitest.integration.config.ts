import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/integration.test.ts", "src/instance-backup.integration.test.ts"],
    testTimeout: 60_000,
    hookTimeout: 60_000,
    fileParallelism: false,
    env: {
      DATABASE_URL: process.env.DATABASE_URL ?? "postgresql://eduforge:eduforge@localhost:5433/eduforge",
      REDIS_URL: process.env.REDIS_URL ?? "redis://localhost:6380",
      // Tests send X-Forwarded-For per request, like the nginx proxy in docker-compose.
      TRUSTED_PROXY_HOPS: process.env.TRUSTED_PROXY_HOPS ?? "1",
    },
  },
});
