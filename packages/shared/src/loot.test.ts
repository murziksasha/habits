import { describe, expect, it } from "vitest";
import {
  DAILY_LOGIN_BASE_XP,
  rollLevelUpLoot,
  rollShopMystery,
} from "./loot.js";
import { DAILY_QUEST_DEFS } from "./quests.js";

describe("loot + quests catalog", () => {
  it("rolls level-up loot with labels", () => {
    const d = rollLevelUpLoot(6);
    expect(d.icon.length).toBeGreaterThan(0);
    expect(d.labelEn.length).toBeGreaterThan(0);
    expect(["xp", "freeze", "avatar", "title", "frame", "skill_point"]).toContain(
      d.kind,
    );
  });

  it("rolls shop mystery", () => {
    const d = rollShopMystery();
    expect(d.labelUk.length).toBeGreaterThan(0);
  });

  it("daily login base xp positive", () => {
    expect(DAILY_LOGIN_BASE_XP).toBeGreaterThan(0);
  });

  it("daily quests include gifts talents login", () => {
    const metrics = new Set(DAILY_QUEST_DEFS.map((q) => q.metric));
    expect(metrics.has("gifts")).toBe(true);
    expect(metrics.has("talents")).toBe(true);
    expect(metrics.has("login")).toBe(true);
    expect(DAILY_QUEST_DEFS.length).toBeGreaterThanOrEqual(7);
  });
});
