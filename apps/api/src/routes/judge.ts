import { Hono } from "hono";
import { z } from "zod";
import {
  runJudge,
  getJudgeMode,
  type JudgeLang,
  enqueueJudgeJob,
  processOneJudgeJob,
  processJudgeBatch,
  getJudgeResult,
  judgeQueueStats,
  attachJudgeRedis,
} from "@eduforge/judge";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { rateLimit } from "../rate-limit.js";
import { withSpan } from "../otel.js";
import { getRedis } from "../redis.js";

type Vars = { user: AuthedUser };

export const judgeRoutes = new Hono<{ Variables: Vars }>();

let redisAttached = false;
function ensureJudgeRedis() {
  if (redisAttached) return;
  redisAttached = true;
  const r = getRedis();
  if (r) {
    attachJudgeRedis({
      lpush: (key, ...args) => r.lpush(key, ...args),
      rpop: (key) => r.rpop(key),
      llen: (key) => r.llen(key),
      set: (key, value, ...args) => r.set(key, value, ...(args as never[])),
      get: (key) => r.get(key),
    });
  }
}

function workerAuthorized(c: { req: { header: (n: string) => string | undefined } }): boolean {
  const secret =
    process.env.JUDGE_WORKER_SECRET?.trim() ||
    process.env.CRON_SECRET?.trim() ||
    "";
  if (!secret) {
    // Dev convenience: allow drain without secret outside production
    return (process.env.NODE_ENV ?? "").toLowerCase() !== "production";
  }
  const auth = c.req.header("authorization")?.replace(/^Bearer\s+/i, "");
  const hdr = c.req.header("x-worker-secret") ?? c.req.header("x-cron-secret");
  return auth === secret || hdr === secret;
}

const jobSchema = z.object({
  lang: z.enum(["javascript", "typescript", "python", "bash"]),
  source: z.string().min(1).max(64_000),
  tests: z
    .array(
      z.discriminatedUnion("type", [
        z.object({ type: z.literal("stdout_contains"), value: z.string().max(2000) }),
        z.object({ type: z.literal("stdout_equals"), value: z.string().max(2000) }),
        z.object({ type: z.literal("exit_code"), value: z.number().int() }),
        z.object({ type: z.literal("not_stdout_contains"), value: z.string().max(2000) }),
      ]),
    )
    .max(20)
    .optional(),
  timeoutMs: z.number().int().min(200).max(10_000).optional(),
  stdin: z.string().max(4000).optional(),
  /** When true, enqueue for worker instead of inline run. */
  async: z.boolean().optional(),
  /**
   * When async: if true (default), also try one inline process tick so local
   * dev completes without a separate worker. Set false for pure enqueue.
   */
  processInline: z.boolean().optional(),
});

judgeRoutes.get("/status", async (c) => {
  ensureJudgeRedis();
  const queue = await judgeQueueStats();
  return c.json({
    mode: getJudgeMode(),
    langs: ["javascript", "typescript", "python", "bash"] satisfies JudgeLang[],
    docker: getJudgeMode() === "docker",
    queue,
  });
});

/** Poll async job result (owner or admin). */
judgeRoutes.get("/result/:jobId", authMiddleware, async (c) => {
  ensureJudgeRedis();
  const user = c.get("user");
  const jobId = c.req.param("jobId") as string;
  if (!jobId) return c.json({ error: "not_found" }, 404);
  const stored = await getJudgeResult(jobId);
  if (!stored) return c.json({ error: "not_found" }, 404);
  if (stored.userId && stored.userId !== user.id && user.role !== "admin") {
    return c.json({ error: "forbidden" }, 403);
  }
  return c.json({ ...stored, jobId });
});

/**
 * Worker drain tick — process up to N queued jobs.
 * Auth: JUDGE_WORKER_SECRET or CRON_SECRET (Bearer / X-Worker-Secret).
 */
judgeRoutes.post("/worker/drain", async (c) => {
  ensureJudgeRedis();
  if (!workerAuthorized(c)) {
    return c.json({ error: "unauthorized" }, 401);
  }
  const body = await c.req.json().catch(() => ({}));
  const max = Math.min(20, Math.max(1, Number((body as { max?: number }).max) || 5));
  const n = await withSpan("judge.worker_drain", { max }, async () =>
    processJudgeBatch((j) => runJudge(j), max),
  );
  const queue = await judgeQueueStats();
  return c.json({ processed: n, queue });
});

judgeRoutes.post("/run", authMiddleware, async (c) => {
  ensureJudgeRedis();
  const user = c.get("user");
  const rl = await rateLimit({
    key: `judge:${user.id}`,
    limit: 20,
    windowMs: 60_000,
  });
  if (!rl.ok) {
    return c.json({ error: "rate_limited", retryAfter: rl.retryAfterSec }, 429);
  }

  const body = await c.req.json().catch(() => null);
  const parsed = jobSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: "invalid_input", details: parsed.error.flatten() }, 400);
  }

  const { async: useQueue, processInline, ...job } = parsed.data;

  if (useQueue) {
    const entry = await enqueueJudgeJob(job, { userId: user.id });
    const inline = processInline !== false;
    if (inline) {
      const processed = await withSpan(
        "judge.queue_process",
        { lang: job.lang, userId: user.id },
        async () => processOneJudgeJob((j) => runJudge(j)),
      );
      if (processed && processed.entry.id === entry.id) {
        return c.json({
          queued: true,
          jobId: entry.id,
          result: processed.result,
          status: "done",
        });
      }
    }
    const stored = await getJudgeResult(entry.id);
    return c.json({
      queued: true,
      jobId: entry.id,
      result: stored?.result ?? null,
      status: stored?.status ?? "queued",
      message: "enqueued",
      poll: `/judge/result/${entry.id}`,
    });
  }

  const result = await withSpan(
    "judge.run",
    { lang: job.lang, userId: user.id },
    async () => runJudge(job),
  );

  return c.json({ result });
});
