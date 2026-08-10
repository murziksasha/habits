import { describe, expect, it } from "vitest";
import {
  isUxOnboardingKey,
  personaToOnboardingKeys,
  postRegisterPath,
  primaryNavForPersona,
  resolvePersona,
} from "@eduforge/shared";

/**
 * API-facing UX onboarding contract (mirrors allowed keys on POST /auth/onboarding/complete).
 */
describe("UX onboarding API contract", () => {
  const allowed = [
    "viewedLearnMap",
    "triedProgramming",
    "completedFirstLesson",
    "triedChess",
    "triedTyping",
    "triedFlashcards",
    "viewedLeaderboard",
    "exploredPricing",
    "dismissed",
    "wizardCompleted",
    "personaStudent",
    "personaParent",
    "personaTeacher",
    "trackSkills",
    "trackCode",
    "trackChess",
  ];

  it("wizard keys are accepted by isUxOnboardingKey", () => {
    for (const k of [
      "wizardCompleted",
      "personaStudent",
      "personaParent",
      "personaTeacher",
      "trackSkills",
      "trackCode",
      "trackChess",
    ]) {
      expect(isUxOnboardingKey(k)).toBe(true);
      expect(allowed).toContain(k);
    }
  });

  it("persona keys map to resolvePersona", () => {
    const parent = personaToOnboardingKeys("parent", []);
    expect(resolvePersona(parent)).toBe("parent");
    expect(primaryNavForPersona("parent")[0].href).toBe("/parents");
  });

  it("post-register aligns with OAuth next default", () => {
    expect(postRegisterPath({ intent: "code" })).toBe("/programming");
    expect(postRegisterPath({})).toBe("/learn");
  });
});
