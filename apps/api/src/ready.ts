import { sql } from "drizzle-orm";
import { db } from "./db.js";
import { getRedis } from "./redis.js";

export type ReadyStatus = {
  ok: boolean;
  service: string;
  checks: {
    db: boolean;
    redis: boolean | "skipped";
  };
  ts: string;
};

/** Deep readiness: Postgres required; Redis optional unless REDIS_URL set. */
export async function checkReady(): Promise<ReadyStatus> {
  let dbOk = false;
  try {
    await db.execute(sql`select 1`);
    dbOk = true;
  } catch {
    dbOk = false;
  }

  const redisUrl = process.env.REDIS_URL;
  let redis: boolean | "skipped" = "skipped";
  if (redisUrl) {
    const client = getRedis();
    if (!client) {
      redis = false;
    } else {
      try {
        redis = (await client.ping()) === "PONG";
      } catch {
        redis = false;
      }
    }
  }

  const ok = dbOk && redis !== false;
  return {
    ok,
    service: "api",
    checks: { db: dbOk, redis },
    ts: new Date().toISOString(),
  };
}
