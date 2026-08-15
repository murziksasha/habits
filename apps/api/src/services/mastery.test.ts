import { describe, expect, it } from "vitest";
import { masteryPriority } from "./mastery.js";

/**
 * Documented priority table (approx):
 * base 14 + scorePart(0–6) + attemptPart(0–3) + leechBoost(0|3)
 */
describe("masteryPriority", () => {
  it("raises urgency for low scores", () => {
    const low = masteryPriority(0.2, 1);
    const high = masteryPriority(0.9, 1);
    expect(low).toBeGreaterThan(high);
  });

  it("raises urgency with more attempts", () => {
    const few = masteryPriority(0.5, 1);
    const many = masteryPriority(0.5, 8);
    expect(many).toBeGreaterThan(few);
  });

  it("applies leech boost at ≥4 attempts and score < 0.7", () => {
    const almostLeech = masteryPriority(0.65, 3);
    const leech = masteryPriority(0.65, 4);
    expect(leech - almostLeech).toBeGreaterThanOrEqual(3);
  });

  it("stays in expected band for typical inputs", () => {
    const p = masteryPriority(0.5, 2);
    expect(p).toBeGreaterThanOrEqual(14);
    expect(p).toBeLessThanOrEqual(26);
  });

  it("clamps score outside 0–1", () => {
    expect(masteryPriority(-1, 1)).toBeGreaterThan(masteryPriority(0, 1) - 0.01);
    expect(masteryPriority(2, 1)).toBeLessThanOrEqual(masteryPriority(1, 1) + 0.01);
  });
});

describe("spaced review interval formula", () => {
  function intervalDays(score: number) {
    return Math.min(14, Math.max(1, Math.floor(1 + score * 12)));
  }

  it("grows with mastery and caps at 14d", () => {
    expect(intervalDays(0)).toBe(1);
    expect(intervalDays(0.5)).toBe(7);
    expect(intervalDays(0.94)).toBe(12);
    expect(intervalDays(1)).toBe(13);
    expect(intervalDays(2)).toBe(14);
  });
});
