/**
 * In-process + Redis-backed judge job queue with result store (TTL).
 * Workers: processOneJudgeJob / processJudgeBatch; clients poll getJudgeResult.
 */

import type { JudgeJob, JudgeResult } from "./types.js";

export type JudgeQueueJob = {
  id: string;
  job: JudgeJob;
  enqueuedAt: number;
  userId?: string;
};

export type StoredJudgeResult = {
  jobId: string;
  status: "queued" | "running" | "done" | "error";
  result?: JudgeResult;
  error?: string;
  userId?: string;
  finishedAt?: number;
};

export type JudgeQueueStats = {
  backend: "memory" | "redis";
  pending: number;
  processed: number;
  failed: number;
  resultsCached: number;
};

type RedisLike = {
  lpush(key: string, ...args: string[]): Promise<number>;
  rpop(key: string): Promise<string | null>;
  llen(key: string): Promise<number>;
  set(key: string, value: string, ...args: (string | number)[]): Promise<unknown>;
  get(key: string): Promise<string | null>;
};

const QUEUE_KEY = "eduforge:judge:queue";
const RESULT_KEY = (id: string) => `eduforge:judge:result:${id}`;
/** Result TTL seconds (default 10 minutes). */
export const JUDGE_RESULT_TTL_SEC = 600;

const memoryQueue: JudgeQueueJob[] = [];
const memoryResults = new Map<string, StoredJudgeResult>();
let processed = 0;
let failed = 0;
let redis: RedisLike | null = null;

export function attachJudgeRedis(client: RedisLike | null) {
  redis = client;
}

export function judgeQueueBackend(): "memory" | "redis" {
  return redis ? "redis" : "memory";
}

function newId(): string {
  return `jq_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

async function saveResult(entry: StoredJudgeResult): Promise<void> {
  if (redis) {
    try {
      await redis.set(
        RESULT_KEY(entry.jobId),
        JSON.stringify(entry),
        "EX",
        JUDGE_RESULT_TTL_SEC,
      );
      return;
    } catch {
      /* fall through to memory */
    }
  }
  memoryResults.set(entry.jobId, entry);
}

export async function getJudgeResult(jobId: string): Promise<StoredJudgeResult | null> {
  if (redis) {
    try {
      const raw = await redis.get(RESULT_KEY(jobId));
      if (raw) return JSON.parse(raw) as StoredJudgeResult;
    } catch {
      /* memory fallback */
    }
  }
  return memoryResults.get(jobId) ?? null;
}

export async function enqueueJudgeJob(
  job: JudgeJob,
  meta?: { userId?: string },
): Promise<JudgeQueueJob> {
  const entry: JudgeQueueJob = {
    id: newId(),
    job,
    enqueuedAt: Date.now(),
    userId: meta?.userId,
  };
  await saveResult({
    jobId: entry.id,
    status: "queued",
    userId: meta?.userId,
  });
  if (redis) {
    await redis.lpush(QUEUE_KEY, JSON.stringify(entry));
  } else {
    memoryQueue.push(entry);
  }
  return entry;
}

export async function dequeueJudgeJob(): Promise<JudgeQueueJob | null> {
  if (redis) {
    const raw = await redis.rpop(QUEUE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as JudgeQueueJob;
    } catch {
      failed += 1;
      return null;
    }
  }
  return memoryQueue.shift() ?? null;
}

export async function judgeQueueStats(): Promise<JudgeQueueStats> {
  let pending = memoryQueue.length;
  if (redis) {
    try {
      pending = await redis.llen(QUEUE_KEY);
    } catch {
      pending = memoryQueue.length;
    }
  }
  return {
    backend: judgeQueueBackend(),
    pending,
    processed,
    failed,
    resultsCached: memoryResults.size,
  };
}

/**
 * Process one queued job with the provided runner (usually runJudge).
 * Persists result for polling via getJudgeResult.
 */
export async function processOneJudgeJob(
  runner: (job: JudgeJob) => Promise<JudgeResult>,
): Promise<{ entry: JudgeQueueJob; result: JudgeResult } | null> {
  const entry = await dequeueJudgeJob();
  if (!entry) return null;

  await saveResult({
    jobId: entry.id,
    status: "running",
    userId: entry.userId,
  });

  try {
    const result = await runner(entry.job);
    if (result.ok) processed += 1;
    else failed += 1;
    await saveResult({
      jobId: entry.id,
      status: "done",
      result,
      userId: entry.userId,
      finishedAt: Date.now(),
    });
    return { entry, result };
  } catch (e) {
    failed += 1;
    const msg = e instanceof Error ? e.message : "judge_worker_failed";
    await saveResult({
      jobId: entry.id,
      status: "error",
      error: msg,
      userId: entry.userId,
      finishedAt: Date.now(),
    });
    throw new Error(msg);
  }
}

/** Drain up to `max` jobs (worker pool tick). */
export async function processJudgeBatch(
  runner: (job: JudgeJob) => Promise<JudgeResult>,
  max = 5,
): Promise<number> {
  let n = 0;
  for (let i = 0; i < max; i++) {
    try {
      const out = await processOneJudgeJob(runner);
      if (!out) break;
      n += 1;
    } catch {
      n += 1; // counted as attempt; error stored
    }
  }
  return n;
}

/** Test helper: reset memory queue counters. */
export function resetJudgeQueueForTests() {
  memoryQueue.length = 0;
  memoryResults.clear();
  processed = 0;
  failed = 0;
  redis = null;
}
