import { describe, expect, it } from "vitest";
import {
  FAMILY_DEFAULT_SEATS,
  isPaidPlan,
  isPremiumActive,
} from "@eduforge/shared";

describe("oauth/family/2fa contracts", () => {
  it("family is a paid plan", () => {
    expect(isPaidPlan("family")).toBe(true);
    expect(isPaidPlan("premium")).toBe(true);
    expect(isPaidPlan("free")).toBe(false);
  });

  it("family premium active with/without expiry", () => {
    expect(isPremiumActive({ plan: "family" })).toBe(true);
    const past = new Date(Date.now() - 864e5);
    expect(isPremiumActive({ plan: "family", planExpiresAt: past })).toBe(false);
  });

  it("default family seats", () => {
    expect(FAMILY_DEFAULT_SEATS).toBeGreaterThanOrEqual(2);
  });
});
