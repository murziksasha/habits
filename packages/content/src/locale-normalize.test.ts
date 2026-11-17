import { describe, expect, it } from "vitest";
import {
  ensureFreemiumFreeLessons,
  FREEMIUM_FREE_LESSON_COUNT,
  normalizeCourseLocales,
} from "./locale-normalize.js";
import type { CourseContent } from "./types.js";

const mini: CourseContent = {
  slug: "logic",
  titleUk: "Логіка",
  titleEn: "Logic",
  icon: "🧠",
  units: [
    {
      slug: "u1",
      titleUk: "U1",
      titleEn: "U1",
      lessons: Array.from({ length: 6 }, (_, i) => ({
        slug: `l${i}`,
        titleUk: `L${i}`,
        titleEn: `L${i}`,
        difficulty: 1,
        baseXp: 10,
        isFree: false,
        isExam: i === 5,
        exercises: [
          {
            id: `e${i}`,
            type: "mcq" as const,
            promptUk: "Питання",
            promptEn: "",
            options: ["a", "b"],
            correctIndex: 0,
          },
        ],
      })),
    },
  ],
};

describe("ensureFreemiumFreeLessons", () => {
  it("acts as a safe identity function for backwards compatibility", () => {
    const c = ensureFreemiumFreeLessons(mini, 5);
    expect(c).toBe(mini);
  });
});

describe("normalizeCourseLocales", () => {
  it("fills promptEn without modifying lesson accessibility", () => {
    const c = normalizeCourseLocales(mini);
    expect(c.units[0]!.lessons[0]!.exercises[0]).toMatchObject({
      promptEn: "Питання",
    });
  });
});
