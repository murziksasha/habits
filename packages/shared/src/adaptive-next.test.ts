import { describe, expect, it } from "vitest";
import {
  adaptiveScore,
  DEFAULT_ADAPTIVE_WEIGHTS,
  loadAdaptiveWeights,
  rankByAdaptive,
} from "./adaptive-next.js";

describe("loadAdaptiveWeights", () => {
  it("returns defaults when unset", () => {
    expect(loadAdaptiveWeights({})).toEqual(DEFAULT_ADAPTIVE_WEIGHTS);
  });

  it("merges numeric overrides only", () => {
    const w = loadAdaptiveWeights({
      ADAPTIVE_WEIGHTS_JSON: JSON.stringify({ isWeak: 2.5, junk: 1, basePriority: "nope" }),
    });
    expect(w.isWeak).toBe(2.5);
    expect(w.basePriority).toBe(DEFAULT_ADAPTIVE_WEIGHTS.basePriority);
  });

  it("falls back on invalid JSON", () => {
    expect(loadAdaptiveWeights({ ADAPTIVE_WEIGHTS_JSON: "{not json" })).toEqual(
      DEFAULT_ADAPTIVE_WEIGHTS,
    );
  });
});

describe("adaptiveScore", () => {
  it("boosts weak items", () => {
    const weak = adaptiveScore({
      lastMastery: 0.2,
      attempts: 5,
      streakDays: 3,
      daysInactive: 1,
      isWeak: true,
      isExam: false,
      basePriority: 10,
    });
    const strong = adaptiveScore({
      lastMastery: 0.95,
      attempts: 1,
      streakDays: 3,
      daysInactive: 0,
      isWeak: false,
      isExam: false,
      basePriority: 10,
    });
    expect(weak).toBeGreaterThan(strong);
  });

  it("scores exams above an otherwise equal item", () => {
    const exam = adaptiveScore({
      lastMastery: 0.5,
      attempts: 1,
      streakDays: 0,
      daysInactive: 0,
      isWeak: false,
      isExam: true,
      basePriority: 12,
    });
    const plain = adaptiveScore({
      lastMastery: 0.5,
      attempts: 1,
      streakDays: 0,
      daysInactive: 0,
      isWeak: false,
      isExam: false,
      basePriority: 12,
    });
    expect(exam).toBeGreaterThan(plain);
  });
});

describe("rankByAdaptive", () => {
  it("orders by score", () => {
    const ranked = rankByAdaptive(
      [
        { id: "a", priority: 5 },
        { id: "b", priority: 15 },
      ],
      (item) => ({
        lastMastery: 0.5,
        attempts: 1,
        streakDays: 0,
        daysInactive: 0,
        isWeak: item.id === "a",
        isExam: false,
        basePriority: item.priority,
      }),
      DEFAULT_ADAPTIVE_WEIGHTS,
    );
    expect(ranked[0]!.id).toBeDefined();
    expect(ranked[0]!.adaptiveScore).toBeGreaterThanOrEqual(ranked[1]!.adaptiveScore);
  });
});
