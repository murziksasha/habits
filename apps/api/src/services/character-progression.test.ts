import { describe, expect, it } from "vitest";
import {
  buildXpPatch,
  effectiveMaxStreakFreezes,
  readProgression,
} from "./character-progression.js";

describe("character-progression service", () => {
  it("readProgression normalizes empty", () => {
    const p = readProgression({});
    expect(p.skillPoints).toBe(0);
    expect(p.unlockedTitles).toContain("rookie");
  });

  it("buildXpPatch awards skill points on level up", () => {
    // level 1 → need xpForLevel(2)=100 for level 2; large gain levels up
    const patch = buildXpPatch(
      { globalXp: 0, progression: { lastLevelAwarded: 1, skillPoints: 0 } },
      150,
      { applyIntellect: false, applySpark: false },
    );
    expect(patch.globalXp).toBe(150);
    expect(patch.globalLevel).toBeGreaterThanOrEqual(2);
    expect(patch.progression.skillPoints).toBeGreaterThanOrEqual(1);
    expect(patch.progression.lastLevelAwarded).toBe(patch.globalLevel);
  });

  it("intellect multiplies gain", () => {
    const base = buildXpPatch(
      {
        globalXp: 0,
        progression: {
          lastLevelAwarded: 1,
          skillPoints: 0,
          talents: { intellect: 5 },
        },
      },
      100,
      { applyIntellect: true, applySpark: false },
    );
    // 15% cap at rank 5
    expect(base.effectiveGain).toBe(115);
  });

  it("grit raises max streak freezes", () => {
    const max = effectiveMaxStreakFreezes(5, {
      progression: { talents: { grit: 2 } },
    });
    expect(max).toBe(7);
  });
});
