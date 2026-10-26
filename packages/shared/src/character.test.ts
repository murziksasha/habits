import { describe, expect, it } from "vitest";
import {
  applyArchetypeSpend,
  applyLevelUps,
  avatarShopDiscount,
  buildPowerScore,
  giftDailyLimit,
  hasSynergy,
  ironWillHeartsBonus,
  lessonXpMultiplier,
  mentorHintBonus,
  normalizeProgression,
  recommendTalent,
  respecCostXp,
  respecTalents,
  spendTalent,
  unlockPathBadges,
  bumpWeeklyProgress,
  claimWeeklyQuest,
  weeklyQuestStatus,
  DEFAULT_PROGRESSION,
  LEVEL_MILESTONES,
  PATH_BADGE_CATALOG,
} from "./character.js";
import { maxHearts } from "./entitlements.js";

describe("character progression", () => {
  it("normalizes empty progression", () => {
    const p = normalizeProgression(null);
    expect(p.skillPoints).toBe(0);
    expect(p.unlockedTitles).toContain("rookie");
  });

  it("awards skill points on level up", () => {
    const p = applyLevelUps(DEFAULT_PROGRESSION, 4);
    // levels 2..4 = 3 SP (no L5 milestone yet)
    expect(p.skillPoints).toBe(3);
    expect(p.lastLevelAwarded).toBe(4);
    expect(p.unlockedTitles).toContain("learner");
  });

  it("spends talent points", () => {
    let p = applyLevelUps(DEFAULT_PROGRESSION, 4);
    const r = spendTalent(p, "intellect");
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.progression.talents.intellect).toBe(1);
      expect(r.progression.skillPoints).toBe(p.skillPoints - 1);
      expect(lessonXpMultiplier(r.progression)).toBeCloseTo(1.03);
    }
  });

  it("rejects spend without points", () => {
    const r = spendTalent(DEFAULT_PROGRESSION, "grit");
    expect(r.ok).toBe(false);
  });

  it("charm raises gift limit", () => {
    const p = normalizeProgression({
      ...DEFAULT_PROGRESSION,
      talents: { charm: 2 },
    });
    expect(giftDailyLimit(p)).toBe(5);
  });

  it("craft discounts avatars", () => {
    const p = normalizeProgression({
      ...DEFAULT_PROGRESSION,
      talents: { craft: 2 },
    });
    expect(avatarShopDiscount(p)).toBeCloseTo(0.2);
  });

  it("milestone levels grant bonus skill points", () => {
    const p = applyLevelUps(DEFAULT_PROGRESSION, 5);
    // levels 2..5 = 4 SP + milestone L5 bonus 1
    const milestone = LEVEL_MILESTONES.find((m) => m.level === 5)!;
    expect(p.skillPoints).toBe(4 + milestone.bonusSkillPoints);
  });

  it("recommends intellect first when empty", () => {
    expect(recommendTalent(DEFAULT_PROGRESSION)).toBe("intellect");
  });

  it("respec refunds talent costs", () => {
    let p = applyLevelUps(DEFAULT_PROGRESSION, 6);
    const s1 = spendTalent(p, "intellect");
    expect(s1.ok).toBe(true);
    if (!s1.ok) return;
    p = s1.progression;
    const before = p.skillPoints;
    const r = respecTalents(p);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.refunded).toBeGreaterThanOrEqual(1);
      expect(r.progression.skillPoints).toBe(before + r.refunded);
      expect(r.progression.talents.intellect).toBeUndefined();
      expect(respecCostXp(r.progression.respecCount ?? 0)).toBeGreaterThan(80);
    }
  });

  it("vitality and mentor talents exist", () => {
    let p = applyLevelUps(DEFAULT_PROGRESSION, 4);
    const v = spendTalent(p, "vitality");
    expect(v.ok).toBe(true);
    if (v.ok) {
      const m = spendTalent(v.progression, "mentor");
      expect(m.ok).toBe(true);
    }
  });
});

describe("path badges + weekly quests", () => {
  it("unlocks path badge and grants SP", () => {
    const { progression, newlyUnlocked } = unlockPathBadges(DEFAULT_PROGRESSION, {
      programming: 10,
      english: 2,
    });
    expect(newlyUnlocked.some((b) => b.id === "path_programming")).toBe(true);
    expect(progression.pathBadges).toContain("path_programming");
    expect(progression.skillPoints).toBeGreaterThanOrEqual(1);
  });

  it("tracks weekly talent progress and claim", () => {
    let p = bumpWeeklyProgress(DEFAULT_PROGRESSION, "2026-W32", "talents", 3);
    const st = weeklyQuestStatus(p, "2026-W32");
    const build = st.quests.find((q) => q.key === "week_build_3")!;
    expect(build.completed).toBe(true);
    const claim = claimWeeklyQuest(p, "2026-W32", "week_build_3");
    expect(claim.ok).toBe(true);
    if (claim.ok) {
      expect(claim.rewardXp).toBe(40);
      const again = claimWeeklyQuest(claim.progression, "2026-W32", "week_build_3");
      expect(again.ok).toBe(false);
    }
  });

  it("unlocks multiple path badges without dup", () => {
    const first = unlockPathBadges(DEFAULT_PROGRESSION, {
      english: 10,
      programming: 10,
      chess: 10,
    });
    expect(first.newlyUnlocked.length).toBeGreaterThanOrEqual(3);
    const second = unlockPathBadges(first.progression, {
      english: 10,
      programming: 10,
      chess: 10,
    });
    expect(second.newlyUnlocked.length).toBe(0);
    expect((first.progression.pathBadges ?? []).length).toBeGreaterThanOrEqual(3);
  });

  it("catalog includes expanded path badges", () => {
    expect(PATH_BADGE_CATALOG.length).toBeGreaterThan(8);
    expect(PATH_BADGE_CATALOG.some((b) => b.id === "path_typescript")).toBe(true);
    expect(PATH_BADGE_CATALOG.some((b) => b.id === "path_embedded")).toBe(true);
  });
});

describe("character v3: synergies + archetypes + power", () => {
  it("iron will adds free heart", () => {
    const p = normalizeProgression({
      ...DEFAULT_PROGRESSION,
      talents: { grit: 2, vitality: 1 },
    });
    expect(hasSynergy(p, "iron_will")).toBe(true);
    expect(ironWillHeartsBonus(p)).toBe(1);
    expect(maxHearts("free", p)).toBe(6);
  });

  it("deep study boosts mentor depth", () => {
    const p = normalizeProgression({
      ...DEFAULT_PROGRESSION,
      talents: { intellect: 2, mentor: 1 },
    });
    expect(hasSynergy(p, "deep_study")).toBe(true);
    expect(mentorHintBonus(p)).toBe(2);
  });

  it("friendly fire raises gift cap", () => {
    const p = normalizeProgression({
      ...DEFAULT_PROGRESSION,
      talents: { charm: 2, spark: 1 },
    });
    expect(giftDailyLimit(p)).toBe(3 + 2 + 1);
  });

  it("applies archetype spends toward scholar", () => {
    let p = applyLevelUps(DEFAULT_PROGRESSION, 8);
    const r = applyArchetypeSpend(p, "scholar");
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.spent.length).toBeGreaterThan(0);
      expect((r.progression.talents.intellect ?? 0) + (r.progression.talents.mentor ?? 0)).toBeGreaterThan(0);
    }
  });

  it("power score scales with ranks", () => {
    const empty = buildPowerScore(DEFAULT_PROGRESSION);
    const strong = buildPowerScore(
      normalizeProgression({
        ...DEFAULT_PROGRESSION,
        talents: { intellect: 3, grit: 2 },
        pathBadges: ["path_english", "path_programming"],
      }),
    );
    expect(strong).toBeGreaterThan(empty);
    expect(strong).toBeLessThanOrEqual(100);
  });
});
