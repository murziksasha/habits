import { describe, expect, it } from "vitest";
import { getJudgeMode, runJudge } from "./index.js";

describe("getJudgeMode", () => {
  it("defaults local", () => {
    expect(getJudgeMode({})).toBe("local");
    expect(getJudgeMode({ JUDGE_MODE: "docker" })).toBe("docker");
    expect(getJudgeMode({ JUDGE_MODE: "off" })).toBe("off");
  });
});

describe("runJudge local javascript", () => {
  it("runs hello world", async () => {
    const r = await runJudge({
      lang: "javascript",
      source: 'console.log("eduforge")',
      tests: [{ type: "stdout_contains", value: "eduforge" }],
      timeoutMs: 3000,
    });
    expect(r.mode).toBe("local");
    if (r.error === "judge_disabled") return;
    // node must be available in CI
    expect(r.ok).toBe(true);
    expect(r.stdout).toContain("eduforge");
  }, 15_000);

  it("fails wrong stdout", async () => {
    const r = await runJudge({
      lang: "javascript",
      source: 'console.log("nope")',
      tests: [{ type: "stdout_contains", value: "eduforge" }],
    });
    expect(r.ok).toBe(false);
  }, 15_000);
});
