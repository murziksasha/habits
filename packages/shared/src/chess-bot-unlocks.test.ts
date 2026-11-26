import { describe, expect, it } from "vitest";
import { botLevelUnlockId, botUnlocks } from "./chess-bot-unlocks.js";

describe("botUnlocks", () => {
  it("opens personalities with lessons and the Italian challenge with its unit", () => {
    const fresh = botUnlocks({ completedLessons: 0, completedUnitSlugs: [] });
    expect(fresh.learner.unlocked).toBe(true);
    expect(fresh.club).toEqual({ unlocked: false, progress: 0, required: 8 });
    expect(fresh.strong.unlocked).toBe(false);
    expect(fresh.italian_challenge.unlocked).toBe(false);
    const mid = botUnlocks({ completedLessons: 12, completedUnitSlugs: ["ch-deep-italian-ruy"] });
    expect(mid.club.unlocked).toBe(true);
    expect(mid.strong).toEqual({ unlocked: false, progress: 12, required: 30 });
    expect(mid.italian_challenge.unlocked).toBe(true);
    expect(botUnlocks({ completedLessons: 30, completedUnitSlugs: [] }).strong.unlocked).toBe(true);
  });

  it("lets admins see everything and maps levels", () => {
    const all = botUnlocks({ completedLessons: 0, completedUnitSlugs: [], isAdmin: true });
    expect(Object.values(all).every((s) => s.unlocked)).toBe(true);
    expect(botLevelUnlockId("strong")).toBe("strong");
    expect(botLevelUnlockId("tablebase")).toBeNull();
  });
});
