import { describe, expect, it } from "vitest";
import { isFeatureEnabled, resolveFeatureFlags, passwordSchema } from "@eduforge/shared";
import { getJudgeMode } from "@eduforge/judge";
import { shouldIssueBearerToken } from "./auth.js";
import { cronAuthorized } from "./cron-auth.js";
import { assertProductionSecrets, seedAllowed } from "@eduforge/shared";

describe("security gates", () => {
  it("blocks dev billing in production without ALLOW_DEV_BILLING", () => {
    expect(isFeatureEnabled("dev_billing", { NODE_ENV: "production" })).toBe(false);
    expect(
      isFeatureEnabled("dev_billing", { NODE_ENV: "production", ALLOW_DEV_BILLING: "1" }),
    ).toBe(true);
  });

  it("enables strict CSRF in production by default", () => {
    expect(resolveFeatureFlags({ NODE_ENV: "production" }).strict_csrf).toBe(true);
  });

  it("judge fails closed in production", () => {
    expect(getJudgeMode({ NODE_ENV: "production" })).toBe("off");
    expect(getJudgeMode({ NODE_ENV: "production", JUDGE_MODE: "local" })).toBe("off");
    expect(getJudgeMode({ NODE_ENV: "production", JUDGE_MODE: "docker" })).toBe("docker");
  });

  it("password requires letter and digit", () => {
    expect(passwordSchema.safeParse("password").success).toBe(false);
    expect(passwordSchema.safeParse("12345678").success).toBe(false);
    expect(passwordSchema.safeParse("password1").success).toBe(true);
  });

  it("production secrets fail closed", () => {
    expect(() =>
      assertProductionSecrets({ NODE_ENV: "production", AUTH_SECRET: "superSecret123" }),
    ).toThrow();
    expect(seedAllowed({ NODE_ENV: "production" })).toBe(false);
  });

  it("cron auth fails closed in production without CRON_SECRET", () => {
    const prev = process.env.NODE_ENV;
    const prevCron = process.env.CRON_SECRET;
    try {
      process.env.NODE_ENV = "production";
      delete process.env.CRON_SECRET;
      expect(
        cronAuthorized({ req: { header: () => "anything" } }),
      ).toBe(false);
    } finally {
      process.env.NODE_ENV = prev;
      if (prevCron === undefined) delete process.env.CRON_SECRET;
      else process.env.CRON_SECRET = prevCron;
    }
  });

  it("shouldIssueBearerToken respects production default", () => {
    const prev = process.env.NODE_ENV;
    const prevIssue = process.env.ISSUE_BEARER_TOKENS;
    try {
      process.env.NODE_ENV = "production";
      delete process.env.ISSUE_BEARER_TOKENS;
      expect(
        shouldIssueBearerToken({ req: { header: () => undefined } }),
      ).toBe(false);
      expect(
        shouldIssueBearerToken({
          req: { header: (n: string) => (n === "x-issue-bearer" ? "1" : undefined) },
        }),
      ).toBe(true);
    } finally {
      process.env.NODE_ENV = prev;
      if (prevIssue === undefined) delete process.env.ISSUE_BEARER_TOKENS;
      else process.env.ISSUE_BEARER_TOKENS = prevIssue;
    }
  });
});
