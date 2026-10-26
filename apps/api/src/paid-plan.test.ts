import { describe, expect, it } from "vitest";
import { canAccessLesson, canStartLesson, canPlayRatedChess } from "@eduforge/shared";

describe("free platform access (all plans)", () => {
  it("allows lesson access regardless of plan", () => {
    expect(canAccessLesson({ plan: "family", lessonIndexInCourse: 99 })).toBe(true);
    expect(canAccessLesson({ plan: "free", lessonIndexInCourse: 99 })).toBe(true);
    expect(canAccessLesson({ plan: "premium", lessonIndexInCourse: 99 })).toBe(true);
  });

  it("allows starting lessons regardless of hearts", () => {
    expect(canStartLesson({ plan: "free", hearts: 0 })).toBe(true);
    expect(canStartLesson({ plan: "free", hearts: 5 })).toBe(true);
  });

  it("allows playing rated chess without limits", () => {
    expect(canPlayRatedChess({ plan: "free", ratedGamesToday: 100 })).toBe(true);
  });
});
