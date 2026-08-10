import { Hono } from "hono";
import { sql } from "drizzle-orm";
import {
  characters,
  chessGames,
  lessons,
  notifications,
  organizations,
  tournaments,
  users,
} from "@eduforge/db";
import { getJudgeMode } from "@eduforge/judge";
import { resolveFeatureFlags } from "@eduforge/shared";
import { db } from "../db.js";
import { latencyStats } from "../logger.js";
import { spanStats } from "../otel.js";
import { getRedis } from "../redis.js";
import { checkReady } from "../ready.js";
import {
  productFunnelCompare,
  productFunnelCounts,
} from "../services/product-analytics.js";
import { judgeQueueStats } from "@eduforge/judge";

export const metricsRoutes = new Hono();

/** Lightweight ops metrics (no secrets). Protect with METRICS_TOKEN if set. */
metricsRoutes.get("/", async (c) => {
  const token = process.env.METRICS_TOKEN;
  if (token) {
    const auth = c.req.header("authorization")?.replace(/^Bearer\s+/i, "");
    if (auth !== token) return c.json({ error: "unauthorized" }, 401);
  }

  const [u] = await db.select({ n: sql<number>`count(*)::int` }).from(users);
  const [l] = await db.select({ n: sql<number>`count(*)::int` }).from(lessons);
  const [g] = await db.select({ n: sql<number>`count(*)::int` }).from(chessGames);
  const [t] = await db.select({ n: sql<number>`count(*)::int` }).from(tournaments);
  const [o] = await db.select({ n: sql<number>`count(*)::int` }).from(organizations);
  const [xp] = await db
    .select({ n: sql<number>`coalesce(sum(${characters.globalXp}),0)::int` })
    .from(characters);
  const [n] = await db.select({ n: sql<number>`count(*)::int` }).from(notifications);

  let redisOk = false;
  const redis = getRedis();
  if (redis) {
    try {
      redisOk = (await redis.ping()) === "PONG";
    } catch {
      redisOk = false;
    }
  }

  const ready = await checkReady();
  const latency = latencyStats();

  const flags = resolveFeatureFlags();
  const funnel7d = await productFunnelCounts(db, 7);
  const funnelHistory7d = await productFunnelCompare(db, 7);
  const judgeQueue = await judgeQueueStats();

  return c.json({
    service: "eduforge-api",
    ts: new Date().toISOString(),
    uptimeSec: Math.floor(process.uptime()),
    redis: redisOk,
    ready: ready.ok,
    checks: ready.checks,
    flags: {
      strictCsrf: flags.strict_csrf,
      parentDigest: flags.parent_digest,
      pushReengage: flags.push_reengage,
      tutorAi: flags.tutor_ai,
      emailVerify: flags.email_verify,
      devBilling: flags.dev_billing,
    },
    judge: { mode: getJudgeMode(), queue: judgeQueue },
    productFunnel7d: funnel7d,
    productFunnelHistory7d: {
      windowDays: funnelHistory7d.windowDays,
      deltas: funnelHistory7d.deltas,
    },
    otel: spanStats(),
    latency,
    counts: {
      users: u?.n ?? 0,
      lessons: l?.n ?? 0,
      chessGames: g?.n ?? 0,
      tournaments: t?.n ?? 0,
      organizations: o?.n ?? 0,
      notifications: n?.n ?? 0,
      totalGlobalXp: xp?.n ?? 0,
    },
  });
});
