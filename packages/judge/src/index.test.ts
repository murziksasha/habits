import { describe, expect, it } from "vitest";
import { getJudgeMode, runJudge } from "./index.js";

describe("getJudgeMode", () => {
  it("defaults local in non-production", () => {
    expect(getJudgeMode({})).toBe("local");
    expect(getJudgeMode({ NODE_ENV: "development" })).toBe("local");
    expect(getJudgeMode({ JUDGE_MODE: "docker" })).toBe("docker");
    expect(getJudgeMode({ JUDGE_MODE: "off" })).toBe("off");
  });

  it("fails closed in production without explicit docker", () => {
    expect(getJudgeMode({ NODE_ENV: "production" })).toBe("off");
    expect(getJudgeMode({ NODE_ENV: "production", JUDGE_MODE: "local" })).toBe("off");
    expect(
      getJudgeMode({
        NODE_ENV: "production",
        JUDGE_MODE: "local",
        JUDGE_ALLOW_LOCAL: "1",
      }),
    ).toBe("local");
    expect(getJudgeMode({ NODE_ENV: "production", JUDGE_MODE: "docker" })).toBe("docker");
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
    if (r.error === "judge_disabled") return;
    expect(r.mode).toBe("local");
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
    if (r.error === "judge_disabled") return;
    expect(r.ok).toBe(false);
  }, 15_000);

  it("blocks dangerous patterns", async () => {
    const r = await runJudge({
      lang: "javascript",
      source: 'require("child_process").exec("id")',
      timeoutMs: 2000,
    });
    if (r.error === "judge_disabled") return;
    expect(r.error).toBe("dangerous_pattern");
    expect(r.ok).toBe(false);
  });
});
