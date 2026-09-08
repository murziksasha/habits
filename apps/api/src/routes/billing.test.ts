import { describe, expect, it } from "vitest";
import { isFeatureEnabled } from "@eduforge/shared";
import { devBillingAllowed } from "../services/billing-ops.js";

describe("dev billing gate", () => {
  it("is off in production without ALLOW_DEV_BILLING", () => {
    expect(isFeatureEnabled("dev_billing", { NODE_ENV: "production" })).toBe(false);
    expect(devBillingAllowed()).toBe(
      isFeatureEnabled("dev_billing"),
    );
  });
});
