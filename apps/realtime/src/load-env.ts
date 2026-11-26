/**
 * Side-effect module: loads the monorepo root `.env` (same loader as the API).
 * index.ts imports it first. ESM evaluates imports in order, so this runs before
 * index.ts reads REALTIME_PORT, WEB_ORIGIN, DATABASE_URL and REDIS_URL.
 * Shell variables still win: the loader never overrides keys that are already set.
 */
import { loadRootEnv } from "@eduforge/db";

loadRootEnv();
