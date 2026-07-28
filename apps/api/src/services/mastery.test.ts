import { describe, expect, it } from "vitest";
import { masteryPriority } from "./mastery.js";

describe("masteryPriority", () => {
  it("prioritizes lower scores", () => {
    expect(masteryPriority(0.4, 1)).toBeGreaterThan(masteryPriority(0.8, 1));
  });

  it("prioritizes more attempts at same score", () => {
    expect(masteryPriority(0.5, 8)).toBeGreaterThan(masteryPriority(0.5, 1));
  });

  it("stays in a sensible band", () => {
    const p = masteryPriority(0.2, 4);
    expect(p).toBeGreaterThanOrEqual(14);
    expect(p).toBeLessThan(25);
  });
});
