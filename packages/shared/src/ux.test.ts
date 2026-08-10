import { describe, expect, it } from "vitest";
import {
  exerciseExplanation,
  exerciseTypeLabel,
  filterDiscoveryTools,
  firstAvailableLessonHref,
  freemiumPathLabel,
  guestTrialMcq,
  heartsWarningLevel,
  isUxOnboardingKey,
  minutesUntilHeartRegen,
  mobileNavForPersona,
  personaToOnboardingKeys,
  pickContextualToolkit,
  postRegisterPath,
  primaryNavForPersona,
  resolvePersona,
  resolveTracks,
  safeNextPath,
  shouldHideStickyContinue,
  streakCalendarDays,
  wizardCompleted,
} from "./ux.js";

describe("resolvePersona / tracks", () => {
  it("defaults to student", () => {
    expect(resolvePersona({})).toBe("student");
    expect(resolvePersona(null)).toBe("student");
  });

  it("reads parent/teacher flags", () => {
    expect(resolvePersona({ personaParent: true })).toBe("parent");
    expect(resolvePersona({ personaTeacher: true })).toBe("teacher");
  });

  it("resolves tracks", () => {
    expect(resolveTracks({ trackCode: true, trackChess: true })).toEqual([
      "code",
      "chess",
    ]);
  });

  it("wizardCompleted", () => {
    expect(wizardCompleted({ wizardCompleted: true })).toBe(true);
    expect(wizardCompleted({})).toBe(false);
  });
});

describe("nav presets", () => {
  it("student primary has home + learn + code", () => {
    const ids = primaryNavForPersona("student").map((n) => n.id);
    expect(ids).toContain("home");
    expect(ids).toContain("learn");
    expect(ids).toContain("code");
    expect(ids.length).toBeLessThanOrEqual(6);
  });

  it("parent mobile has children first", () => {
    expect(mobileNavForPersona("parent")[0].href).toBe("/parents");
  });

  it("teacher mobile has desk first", () => {
    expect(mobileNavForPersona("teacher")[0].href).toBe("/teacher");
  });
});

describe("postRegisterPath", () => {
  it("friend invite wins", () => {
    expect(postRegisterPath({ hasFriendInvite: true, intent: "code" })).toBe(
      "/friends",
    );
  });

  it("intent routes", () => {
    expect(postRegisterPath({ intent: "code" })).toBe("/programming");
    expect(postRegisterPath({ intent: "chess" })).toBe("/play");
    expect(postRegisterPath({ intent: "parent" })).toBe("/parents");
    expect(postRegisterPath({ intent: "teacher" })).toBe("/teacher");
    expect(postRegisterPath({})).toBe("/learn");
  });
});

describe("pickContextualToolkit", () => {
  it("prioritizes review when weak lessons", () => {
    const t = pickContextualToolkit({ weakLessonCount: 2 }, 3);
    expect(t[0].id).toBe("review");
    expect(t.length).toBe(3);
  });

  it("surfaces tree after code progress", () => {
    const t = pickContextualToolkit({ codeLessonsCompleted: 4 }, 3);
    expect(t.some((x) => x.id === "tree" || x.id === "playground")).toBe(true);
  });

  it("fills defaults when empty context", () => {
    const t = pickContextualToolkit({}, 3);
    expect(t.length).toBe(3);
  });
});

describe("exerciseTypeLabel", () => {
  it("maps code_fill", () => {
    expect(exerciseTypeLabel("code_fill", "uk")).toMatch(/код/i);
    expect(exerciseTypeLabel("code_fill", "en")).toMatch(/code/i);
  });

  it("fallback", () => {
    expect(exerciseTypeLabel("unknown_xyz", "en")).toBe("unknown_xyz");
  });
});

describe("freemiumPathLabel", () => {
  it("shows free progress", () => {
    expect(
      freemiumPathLabel({
        freeCompleted: 2,
        freeLessonCount: 5,
        isPremium: false,
        locale: "en",
      }),
    ).toContain("2/5");
  });

  it("premium label", () => {
    expect(
      freemiumPathLabel({
        freeCompleted: 0,
        freeLessonCount: 5,
        isPremium: true,
        locale: "en",
      }),
    ).toMatch(/premium/i);
  });
});

describe("discovery + guest trial", () => {
  it("filters tools", () => {
    expect(filterDiscoveryTools("code", "en").length).toBeGreaterThan(0);
    expect(filterDiscoveryTools("zzzz-nope").length).toBe(0);
  });

  it("guest trial has correct answer", () => {
    const g = guestTrialMcq("en");
    expect(g.options[g.correctIndex]).toMatch(/constant/i);
  });
});

describe("streakCalendarDays", () => {
  it("marks active days", () => {
    const now = new Date("2026-08-04T12:00:00Z");
    const days = streakCalendarDays(["2026-08-04", "2026-08-02"], 3, now);
    expect(days).toHaveLength(3);
    expect(days.find((d) => d.date === "2026-08-04")?.active).toBe(true);
    expect(days.find((d) => d.date === "2026-08-04")?.isToday).toBe(true);
  });
});

describe("personaToOnboardingKeys / heartsWarning", () => {
  it("writes exclusive persona flags", () => {
    const o = personaToOnboardingKeys("teacher", ["code"]);
    expect(o.personaTeacher).toBe(true);
    expect(o.personaStudent).toBe(false);
    expect(o.trackCode).toBe(true);
    expect(o.wizardCompleted).toBe(true);
  });

  it("hearts levels", () => {
    expect(heartsWarningLevel(0, 5)).toBe("empty");
    expect(heartsWarningLevel(1, 5)).toBe("low");
    expect(heartsWarningLevel(5, 5)).toBe("ok");
  });

  it("validates onboarding keys", () => {
    expect(isUxOnboardingKey("wizardCompleted")).toBe(true);
    expect(isUxOnboardingKey("nope")).toBe(false);
  });
});

describe("safeNextPath / explanation / regen / first lesson", () => {
  it("accepts only internal paths", () => {
    expect(safeNextPath("/learn")).toBe("/learn");
    expect(safeNextPath("/courses/english?x=1")).toBe("/courses/english?x=1");
    expect(safeNextPath("//evil.com")).toBe("/learn");
    expect(safeNextPath("https://evil.com")).toBe("/learn");
    expect(safeNextPath("/login")).toBe("/learn");
    expect(safeNextPath(null, "/dashboard")).toBe("/dashboard");
  });

  it("picks explanation by locale", () => {
    expect(
      exerciseExplanation(
        { explanationUk: "укр", explanationEn: "en" },
        "uk",
      ),
    ).toBe("укр");
    expect(
      exerciseExplanation({ explanationEn: "en", hintUk: "h" }, "en"),
    ).toBe("en");
  });

  it("estimates regen minutes", () => {
    const now = new Date("2026-08-04T12:00:00Z");
    const updated = new Date("2026-08-04T11:45:00Z"); // 15 min ago, 30 min cycle
    expect(
      minutesUntilHeartRegen({
        hearts: 2,
        maxHearts: 5,
        heartsUpdatedAt: updated,
        regenMinutes: 30,
        now,
      }),
    ).toBe(15);
    expect(
      minutesUntilHeartRegen({
        hearts: 5,
        maxHearts: 5,
        heartsUpdatedAt: updated,
        regenMinutes: 30,
        now,
      }),
    ).toBe(0);
  });

  it("firstAvailableLessonHref prefers incomplete unlocked", () => {
    const href = firstAvailableLessonHref("english", [
      {
        lessons: [
          { id: "a", locked: false, status: "completed" },
          { id: "b", locked: false, status: "available" },
          { id: "c", locked: true },
        ],
      },
    ]);
    expect(href).toBe("/courses/english/lessons/b");
  });

  it("hides sticky continue on primary / focus routes", () => {
    expect(shouldHideStickyContinue("/")).toBe(true);
    expect(shouldHideStickyContinue("/learn")).toBe(true);
    expect(shouldHideStickyContinue("/dashboard")).toBe(true);
    expect(shouldHideStickyContinue("/courses/en/lessons/x")).toBe(true);
    expect(shouldHideStickyContinue("/quests")).toBe(false);
    expect(shouldHideStickyContinue("/flashcards")).toBe(false);
    expect(shouldHideStickyContinue("/play")).toBe(false);
    expect(shouldHideStickyContinue("/certificates")).toBe(false);
  });

  it("hides sticky on /play during live match", () => {
    expect(shouldHideStickyContinue("/play", { playMatchActive: true })).toBe(
      true,
    );
    expect(shouldHideStickyContinue("/play", { playMatchActive: false })).toBe(
      false,
    );
    expect(
      shouldHideStickyContinue("/quests", { playMatchActive: true }),
    ).toBe(false);
  });
});
