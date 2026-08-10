import { describe, expect, it } from "vitest";
import { publicEntitlementsPayload } from "./billing-ops.js";

describe("billing-ops", () => {
  it("publicEntitlementsPayload includes freemium matrix", () => {
    const p = publicEntitlementsPayload(false);
    expect(p.matrix.freeLessonsPerCourse).toBe(5);
    expect(p.features.length).toBeGreaterThan(0);
    expect(p.stripeConfigured).toBe(false);
  });

  it("marks stripe when configured flag true", () => {
    expect(publicEntitlementsPayload(true).stripeConfigured).toBe(true);
  });
});
