import { describe, expect, it } from "vitest";
import { dailyActivityHeights, utcMondayOffset } from "./progress-charts";

describe("progress-charts helpers", () => {
  it("computes Monday-first UTC offsets (Mon=0..Sun=6)", () => {
    // 2026-11-09 is Monday, 2026-11-15 is Sunday
    expect(utcMondayOffset("2026-11-09")).toBe(0);
    expect(utcMondayOffset("2026-11-12")).toBe(3); // Thursday
    expect(utcMondayOffset("2026-11-15")).toBe(6); // Sunday
  });

  it("scales daily activity heights cleanly with 0 for inactive days", () => {
    const heights = dailyActivityHeights([
      {
        date: "2026-11-10",
        attempts: 0,
        successfulAttempts: 0,
        failedAttempts: 0,
        unknownAttempts: 0,
        courseXp: 0,
        averageScore: null,
        scoredAttempts: 0,
        newCompletions: 0,
        heatmapLevel: 0,
      },
      {
        date: "2026-11-11",
        attempts: 2,
        successfulAttempts: 2,
        failedAttempts: 0,
        unknownAttempts: 0,
        courseXp: 40,
        averageScore: 1,
        scoredAttempts: 2,
        newCompletions: 1,
        heatmapLevel: 2,
      },
      {
        date: "2026-11-12",
        attempts: 4,
        successfulAttempts: 3,
        failedAttempts: 1,
        unknownAttempts: 0,
        courseXp: 60,
        averageScore: 0.75,
        scoredAttempts: 4,
        newCompletions: 1,
        heatmapLevel: 2,
      },
    ]);
    expect(heights).toEqual([0, 50, 100]);
  });
});
