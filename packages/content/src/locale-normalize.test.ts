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
  it("marks first N non-exam lessons free", () => {
    const c = ensureFreemiumFreeLessons(mini, 5);
    const free = c.units[0]!.lessons.filter((l) => l.isFree);
    expect(free.length).toBe(5);
    expect(c.units[0]!.lessons[5]!.isFree).toBe(false);
    expect(c.units[0]!.lessons[5]!.isExam).toBe(true);
  });
});

describe("normalizeCourseLocales", () => {
  it("fills promptEn and freemium free flags", () => {
    const c = normalizeCourseLocales(mini);
    expect(c.units[0]!.lessons[0]!.exercises[0]).toMatchObject({
      promptEn: "Питання",
    });
    expect(
      c.units.flatMap((u) => u.lessons).filter((l) => l.isFree).length,
    ).toBeGreaterThanOrEqual(FREEMIUM_FREE_LESSON_COUNT);
  });
});
