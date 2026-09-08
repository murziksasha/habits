import { describe, expect, it } from "vitest";
import {
  assertProductionSecrets,
  cronSecretAuthorized,
  isWeakSecret,
  seedAllowed,
} from "./secrets.js";

describe("isWeakSecret", () => {
  it("rejects empty, short, and known placeholders", () => {
    expect(isWeakSecret("")).toBe(true);
    expect(isWeakSecret("short")).toBe(true);
    expect(isWeakSecret("dev-secret-change-me")).toBe(true);
    expect(isWeakSecret("change-me-to-a-long-random-string")).toBe(true);
    expect(isWeakSecret("superSecret123")).toBe(true);
  });

  it("accepts a long random value", () => {
    expect(isWeakSecret("a".repeat(32))).toBe(false);
    expect(isWeakSecret("xK9mP2qL7nR4sT8uV1wY5zA0bC3dE6fH")).toBe(false);
  });
});

describe("assertProductionSecrets", () => {
  it("no-ops outside production", () => {
    expect(() =>
      assertProductionSecrets({ NODE_ENV: "development" }),
    ).not.toThrow();
  });

  it("throws in production without a strong AUTH_SECRET", () => {
    expect(() =>
      assertProductionSecrets({ NODE_ENV: "production", AUTH_SECRET: "superSecret123" }),
    ).toThrow(/AUTH_SECRET/);
    expect(() =>
      assertProductionSecrets({ NODE_ENV: "production" }),
    ).toThrow(/AUTH_SECRET/);
  });

  it("allows a strong secret in production", () => {
    expect(() =>
      assertProductionSecrets({
        NODE_ENV: "production",
        AUTH_SECRET: "xK9mP2qL7nR4sT8uV1wY5zA0bC3dE6fH",
      }),
    ).not.toThrow();
  });
});

describe("seedAllowed", () => {
  it("allows non-production", () => {
    expect(seedAllowed({ NODE_ENV: "development" })).toBe(true);
  });

  it("blocks production unless ALLOW_PROD_SEED=1", () => {
    expect(seedAllowed({ NODE_ENV: "production" })).toBe(false);
    expect(seedAllowed({ NODE_ENV: "production", ALLOW_PROD_SEED: "1" })).toBe(true);
  });
});

describe("cronSecretAuthorized", () => {
  it("allows missing secret outside production", () => {
    expect(cronSecretAuthorized(undefined, { NODE_ENV: "development" })).toBe(true);
  });

  it("refuses missing secret in production", () => {
    expect(cronSecretAuthorized("x", { NODE_ENV: "production" })).toBe(false);
    expect(cronSecretAuthorized(undefined, { NODE_ENV: "production" })).toBe(false);
  });

  it("matches configured secret", () => {
    const env = { NODE_ENV: "production", CRON_SECRET: "cron-prod-secret-value-ok" };
    expect(cronSecretAuthorized("cron-prod-secret-value-ok", env)).toBe(true);
    expect(cronSecretAuthorized("wrong", env)).toBe(false);
  });
});
