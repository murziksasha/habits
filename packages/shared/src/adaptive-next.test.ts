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
      ADAPTIVE_WEIGHTS_JSON: JSON.stringify({ isWeak: 2.5, paywalled: "nope", junk: 1 }),
    });
    expect(w.isWeak).toBe(2.5);
    expect(w.paywalled).toBe(DEFAULT_ADAPTIVE_WEIGHTS.paywalled);
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
      paywalled: false,
      basePriority: 10,
    });
    const strong = adaptiveScore({
      lastMastery: 0.95,
      attempts: 1,
      streakDays: 3,
      daysInactive: 0,
      isWeak: false,
      isExam: false,
      paywalled: false,
      basePriority: 10,
    });
    expect(weak).toBeGreaterThan(strong);
  });

  it("penalizes paywall", () => {
    const free = adaptiveScore({
      lastMastery: 0.5,
      attempts: 1,
      streakDays: 0,
      daysInactive: 0,
      isWeak: false,
      isExam: false,
      paywalled: false,
      basePriority: 12,
    });
    const paid = adaptiveScore({
      lastMastery: 0.5,
      attempts: 1,
      streakDays: 0,
      daysInactive: 0,
      isWeak: false,
      isExam: false,
      paywalled: true,
      basePriority: 12,
    });
    expect(free).toBeGreaterThan(paid);
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
        paywalled: false,
        basePriority: item.priority,
      }),
      DEFAULT_ADAPTIVE_WEIGHTS,
    );
    expect(ranked[0]!.id).toBeDefined();
    expect(ranked[0]!.adaptiveScore).toBeGreaterThanOrEqual(ranked[1]!.adaptiveScore);
  });
});
