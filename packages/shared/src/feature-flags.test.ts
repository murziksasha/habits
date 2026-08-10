import { describe, expect, it } from "vitest";
import { isFeatureEnabled, resolveFeatureFlags } from "./feature-flags.js";

describe("resolveFeatureFlags", () => {
  it("reads truthy env", () => {
    const f = resolveFeatureFlags({
      FEATURE_LABS: "1",
      FEATURE_STRICT_CSRF: "true",
      FEATURE_PARENT_DIGEST: "0",
      FEATURE_PUSH_REENGAGE: "0",
    });
    expect(f.labs).toBe(true);
    expect(f.strict_csrf).toBe(true);
    expect(f.parent_digest).toBe(false);
  });

  it("defaults digests on", () => {
    const f = resolveFeatureFlags({});
    expect(f.parent_digest).toBe(true);
    expect(f.push_reengage).toBe(true);
  });

  it("tutor_ai from XAI key", () => {
    expect(isFeatureEnabled("tutor_ai", { XAI_API_KEY: "sk-test" })).toBe(true);
  });

  it("enables strict_csrf by default in production", () => {
    const f = resolveFeatureFlags({ NODE_ENV: "production" });
    expect(f.strict_csrf).toBe(true);
  });

  it("allows disabling strict_csrf in production", () => {
    const f = resolveFeatureFlags({ NODE_ENV: "production", FEATURE_STRICT_CSRF: "0" });
    expect(f.strict_csrf).toBe(false);
  });

  it("dev_billing on in non-prod by default", () => {
    expect(resolveFeatureFlags({ NODE_ENV: "development" }).dev_billing).toBe(true);
  });

  it("dev_billing off in production unless ALLOW_DEV_BILLING", () => {
    expect(resolveFeatureFlags({ NODE_ENV: "production" }).dev_billing).toBe(false);
    expect(
      resolveFeatureFlags({ NODE_ENV: "production", ALLOW_DEV_BILLING: "1" }).dev_billing,
    ).toBe(true);
  });

  it("email_verify defaults on", () => {
    expect(resolveFeatureFlags({}).email_verify).toBe(true);
  });
});
