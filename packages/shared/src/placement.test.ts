import { describe, expect, it } from "vitest";
import { ENGLISH_PLACEMENT, PLACEMENT_LEVELS, scorePlacement } from "./placement.js";

const ORIGINAL_IDS = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p10"] as const;

describe("English placement bank", () => {
  it("keeps p1–p10 and adds B2–C1 items p11–p14 without colliding ids", () => {
    const ids = ENGLISH_PLACEMENT.map((q) => q.id);
    expect(ids).toEqual([...ORIGINAL_IDS, "p11", "p12", "p13", "p14"]);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ENGLISH_PLACEMENT).toHaveLength(14);

    const p11 = ENGLISH_PLACEMENT.find((q) => q.id === "p11")!;
    expect(p11.options[p11.correctIndex]).toBe("saw");
    const p12 = ENGLISH_PLACEMENT.find((q) => q.id === "p12")!;
    expect(p12.options[p12.correctIndex]).toBe("Despite");
    const p13 = ENGLISH_PLACEMENT.find((q) => q.id === "p13")!;
    expect(p13.options[p13.correctIndex].toLowerCase()).toMatch(/real|справжн/);
    const p14 = ENGLISH_PLACEMENT.find((q) => q.id === "p14")!;
    expect(p14.options[p14.correctIndex]).toBe("went");

    for (const q of ENGLISH_PLACEMENT) {
      expect(q.promptUk.trim().length).toBeGreaterThan(0);
      expect(q.promptEn.trim().length).toBeGreaterThan(0);
      expect(q.options.length).toBeGreaterThanOrEqual(4);
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(q.options.length);
      expect(q.weight).toBeGreaterThan(0);
    }
  });

  it("still has a C1 rung and lets a perfect paper reach it", () => {
    expect(PLACEMENT_LEVELS.map((l) => l.label)).toEqual(["A1", "A2", "B1", "B2", "C1"]);
    const original = PLACEMENT_LEVELS.find((l) => l.label === "C1")!;
    expect(original.minScore).toBe(0.9);
    expect(original.recommendedUnitSlug).toBe("work-life");

    const perfect = ENGLISH_PLACEMENT.map((q) => ({
      questionId: q.id,
      index: q.correctIndex,
    }));
    const all = scorePlacement(perfect);
    expect(all.score).toBe(1);
    expect(all.correct).toBe(14);
    expect(all.total).toBe(14);
    expect(all.level.label).toBe("C1");

    const originalOnly = scorePlacement(
      ENGLISH_PLACEMENT.filter((q) => ORIGINAL_IDS.includes(q.id as (typeof ORIGINAL_IDS)[number])).map(
        (q) => ({ questionId: q.id, index: q.correctIndex }),
      ),
    );
    // Acing only p1–p10 is no longer enough for C1 once the harder items are in the bank.
    expect(originalOnly.correct).toBe(10);
    expect(originalOnly.level.label).not.toBe("C1");
    expect(["B1", "B2"]).toContain(originalOnly.level.label);
  });

  it("preserves the original p1–p10 answers", () => {
    const expected: Record<string, number> = {
      p1: 0,
      p2: 1,
      p3: 1,
      p4: 2,
      p5: 1,
      p6: 1,
      p7: 2,
      p8: 2,
      p9: 1,
      p10: 1,
    };
    for (const [id, index] of Object.entries(expected)) {
      expect(ENGLISH_PLACEMENT.find((q) => q.id === id)?.correctIndex).toBe(index);
    }
  });
});
