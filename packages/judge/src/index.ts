import { runDocker } from "./docker-runner.js";
import { runLocal } from "./local-runner.js";
import type { JudgeJob, JudgeMode, JudgeResult } from "./types.js";

export type * from "./types.js";
export { runLocal } from "./local-runner.js";
export { runDocker } from "./docker-runner.js";
export {
  attachJudgeRedis,
  enqueueJudgeJob,
  dequeueJudgeJob,
  processOneJudgeJob,
  processJudgeBatch,
  getJudgeResult,
  judgeQueueStats,
  judgeQueueBackend,
  resetJudgeQueueForTests,
  JUDGE_RESULT_TTL_SEC,
  type JudgeQueueJob,
  type JudgeQueueStats,
  type StoredJudgeResult,
} from "./queue.js";

function envMap(): Record<string, string | undefined> {
  try {
    return (globalThis as { process?: { env?: Record<string, string | undefined> } }).process
      ?.env ?? {};
  } catch {
    return {};
  }
}

function isProd(env: Record<string, string | undefined>): boolean {
  return (env.NODE_ENV ?? "").toLowerCase() === "production";
}

/**
 * Resolve judge mode.
 * - Dev default: local
 * - Production default: off (fail-closed) unless JUDGE_MODE=docker
 * - local is refused in production unless JUDGE_ALLOW_LOCAL=1 (never recommended)
 */
export function getJudgeMode(env: Record<string, string | undefined> = envMap()): JudgeMode {
  const raw = (env.JUDGE_MODE ?? "").toLowerCase().trim();
  const prod = isProd(env);

  if (raw === "off" || raw === "disabled") return "off";
  if (raw === "docker") return "docker";
  if (raw === "local") {
    if (prod && env.JUDGE_ALLOW_LOCAL !== "1") return "off";
    return "local";
  }

  // Unset: local in dev, off in production (require explicit docker)
  if (prod) return "off";
  return "local";
}

function disabledResult(job: JudgeJob, error: string): JudgeResult {
  return {
    ok: false,
    mode: "disabled",
    lang: job.lang,
    stdout: "",
    stderr: error,
    exitCode: null,
    timedOut: false,
    durationMs: 0,
    tests: [],
    error,
  };
}

/**
 * Multi-language code judge.
 * - local: host node/python/bash (dev only)
 * - docker: isolated containers (production)
 * - off: disabled (production default)
 *
 * Production never falls back from docker → local.
 */
export async function runJudge(job: JudgeJob): Promise<JudgeResult> {
  const env = envMap();
  const mode = getJudgeMode(env);
  if (mode === "off") {
    return disabledResult(job, "judge_disabled");
  }
  if (mode === "docker") {
    try {
      return await runDocker(job);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      // Fail-closed in production — never spawn host processes
      if (isProd(env) || env.JUDGE_DOCKER_FALLBACK_LOCAL !== "1") {
        return disabledResult(job, `docker_failed: ${msg}`);
      }
      const local = await runLocal(job);
      return {
        ...local,
        stderr: `${local.stderr}\n[docker_fallback] ${msg}`,
      };
    }
  }
  return runLocal(job);
}
