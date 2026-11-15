import { describe, expect, it } from "vitest";
import { buildCoursePlacementBank, getCourseParts } from "@eduforge/shared";
import { chessContent, englishContent } from "./index.js";

function expectPartsCover(courseSlug: "english" | "chess", actualSlugs: string[]) {
  const parts = getCourseParts(courseSlug);
  const partSlugs = parts.flatMap((part) => [...part.unitSlugs]);
  expect(partSlugs, `${courseSlug} parts should list units in course order`).toEqual(actualSlugs);
}

describe("deep English and Chess learning features", () => {
  it("lists every English and Chess unit in COURSE_PARTS, in course order", () => {
    expectPartsCover(
      "english",
      englishContent.units.map((u) => u.slug),
    );
    expectPartsCover(
      "chess",
      chessContent.units.map((u) => u.slug),
    );
    expect(englishContent.units).toHaveLength(45);
    expect(chessContent.units).toHaveLength(34);
  });

  it("can build a chess placement bank of at least four MCQs from early units", () => {
    const bank = buildCoursePlacementBank(
      "chess",
      chessContent.units.map((unit) => ({
        slug: unit.slug,
        titleUk: unit.titleUk,
        titleEn: unit.titleEn,
        lessons: unit.lessons.map((lesson) => ({
          slug: lesson.slug,
          isExam: lesson.isExam,
          exercises: lesson.exercises,
        })),
      })),
    );
    expect(bank).not.toBeNull();
    expect(bank!.questions.length).toBeGreaterThanOrEqual(4);
    expect(bank!.questions.length).toBeLessThanOrEqual(8);
    expect(bank!.questions.every((q) => q.promptUk.trim().length > 0)).toBe(true);
    expect(bank!.questionUnitSlugs.length).toBe(bank!.questions.length);
    // Early units come first, so the bank should start before the deep track.
    expect(bank!.questionUnitSlugs[0]).not.toMatch(/^ch-deep-/);
  });

  it("still exposes enough English MCQs that a course-agnostic bank could be built", () => {
    const bank = buildCoursePlacementBank(
      "english",
      englishContent.units.map((unit) => ({
        slug: unit.slug,
        titleUk: unit.titleUk,
        titleEn: unit.titleEn,
        lessons: unit.lessons.map((lesson) => ({
          slug: lesson.slug,
          isExam: lesson.isExam,
          exercises: lesson.exercises,
        })),
      })),
    );
    expect(bank).not.toBeNull();
    expect(bank!.questions.length).toBeGreaterThanOrEqual(4);
  });
});
