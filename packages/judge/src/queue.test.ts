import { describe, expect, it, beforeEach } from "vitest";
import {
  enqueueJudgeJob,
  dequeueJudgeJob,
  processOneJudgeJob,
  processJudgeBatch,
  getJudgeResult,
  judgeQueueStats,
  resetJudgeQueueForTests,
} from "./queue.js";
import type { JudgeResult } from "./types.js";

const okResult = (): JudgeResult => ({
  ok: true,
  mode: "local",
  lang: "javascript",
  stdout: "ok",
  stderr: "",
  exitCode: 0,
  timedOut: false,
  durationMs: 1,
  tests: [],
});

describe("judge queue", () => {
  beforeEach(() => {
    resetJudgeQueueForTests();
  });

  it("enqueues and dequeues in FIFO (memory)", async () => {
    const a = await enqueueJudgeJob({
      lang: "javascript",
      source: "console.log(1)",
    });
    const b = await enqueueJudgeJob({
      lang: "python",
      source: "print(1)",
    });
    const first = await dequeueJudgeJob();
    const second = await dequeueJudgeJob();
    expect(first?.id).toBe(a.id);
    expect(second?.id).toBe(b.id);
    expect(await dequeueJudgeJob()).toBeNull();
  });

  it("stores queued status and done result after process", async () => {
    const entry = await enqueueJudgeJob({ lang: "javascript", source: "ok" });
    const pending = await getJudgeResult(entry.id);
    expect(pending?.status).toBe("queued");

    const out = await processOneJudgeJob(async () => okResult());
    expect(out?.result.ok).toBe(true);
    const done = await getJudgeResult(entry.id);
    expect(done?.status).toBe("done");
    expect(done?.result?.stdout).toBe("ok");

    const stats = await judgeQueueStats();
    expect(stats.processed).toBe(1);
    expect(stats.pending).toBe(0);
    expect(stats.backend).toBe("memory");
  });

  it("processJudgeBatch drains multiple jobs", async () => {
    await enqueueJudgeJob({ lang: "javascript", source: "a" });
    await enqueueJudgeJob({ lang: "javascript", source: "b" });
    await enqueueJudgeJob({ lang: "javascript", source: "c" });
    const n = await processJudgeBatch(async () => okResult(), 10);
    expect(n).toBe(3);
    expect((await judgeQueueStats()).pending).toBe(0);
  });

  it("records error status when runner throws", async () => {
    const entry = await enqueueJudgeJob({ lang: "javascript", source: "x" });
    await expect(
      processOneJudgeJob(async () => {
        throw new Error("boom");
      }),
    ).rejects.toThrow(/boom/);
    const st = await getJudgeResult(entry.id);
    expect(st?.status).toBe("error");
    expect(st?.error).toMatch(/boom/);
  });
});
