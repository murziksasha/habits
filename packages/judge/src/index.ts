import { runDocker } from "./docker-runner.js";
import { runLocal } from "./local-runner.js";
import type { JudgeJob, JudgeMode, JudgeResult } from "./types.js";

export type * from "./types.js";
export { runLocal } from "./local-runner.js";
export { runDocker } from "./docker-runner.js";

function envMap(): Record<string, string | undefined> {
  try {
    return (globalThis as { process?: { env?: Record<string, string | undefined> } }).process
      ?.env ?? {};
  } catch {
    return {};
  }
}

export function getJudgeMode(env: Record<string, string | undefined> = envMap()): JudgeMode {
  const m = (env.JUDGE_MODE ?? "local").toLowerCase();
  if (m === "docker" || m === "off" || m === "local") return m;
  return "local";
}

/**
 * Multi-language code judge.
 * - local: host node/python/bash (dev)
 * - docker: isolated containers (prod-ish)
 * - off: disabled
 */
export async function runJudge(job: JudgeJob): Promise<JudgeResult> {
  const mode = getJudgeMode();
  if (mode === "off") {
    return {
      ok: false,
      mode: "disabled",
      lang: job.lang,
      stdout: "",
      stderr: "judge_disabled",
      exitCode: null,
      timedOut: false,
      durationMs: 0,
      tests: [],
      error: "judge_disabled",
    };
  }
  if (mode === "docker") {
    try {
      return await runDocker(job);
    } catch (e) {
      // Fall back to local if Docker CLI missing
      const local = await runLocal(job);
      return {
        ...local,
        stderr: `${local.stderr}\n[docker_fallback] ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }
  return runLocal(job);
}
