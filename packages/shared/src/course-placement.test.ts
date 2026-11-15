import { describe, expect, it } from "vitest";
import {
  buildCoursePlacementBank,
  planPlacementSkip,
  recommendPlacementUnit,
  type PlacementUnit,
} from "./course-placement.js";

function unit(slug: string, n: number, title = slug): PlacementUnit {
  return {
    slug,
    titleUk: `Тема ${title}`,
    titleEn: `Unit ${title}`,
    lessons: [
      {
        slug: `${slug}-exam`,
        isExam: true,
        exercises: Array.from({ length: n }, (_, i) => ({
          id: `${slug}-q${i}`,
          type: "mcq",
          promptUk: `Питання ${slug} ${i}`,
          promptEn: `Question ${slug} ${i}`,
          options: ["A", "B", "C"],
          correctIndex: 1,
        })),
      },
    ],
  };
}

describe("course placement", () => {
  it("builds a bilingual bank from early-unit MCQs and returns null when too thin", () => {
    const bank = buildCoursePlacementBank("demo", [unit("a", 3), unit("b", 3), unit("c", 3)]);
    expect(bank).not.toBeNull();
    expect(bank!.questions.length).toBe(6);
    expect(bank!.questions[0]!.id).toBe("demo:a:a-q0");
    expect(bank!.questions.every((q) => q.promptUk !== q.promptEn)).toBe(true);
    expect(bank!.levels[0]!.recommendedUnitSlug).toBe("a");
    expect(buildCoursePlacementBank("thin", [unit("a", 1)])).toBeNull();
  });

  it("plans known units strictly before the recommended start", () => {
    expect(planPlacementSkip(["a", "b", "c"], "a")).toEqual({
      recommendedUnitSlug: "a",
      knownUnitSlugs: [],
      startUnitSlug: "a",
    });
    expect(planPlacementSkip(["a", "b", "c"], "c")).toEqual({
      recommendedUnitSlug: "c",
      knownUnitSlugs: ["a", "b"],
      startUnitSlug: "c",
    });
    expect(planPlacementSkip(["a", "b"], "missing").knownUnitSlugs).toEqual([]);
  });

  it("recommends the first weak unit and advances when early units are solid", () => {
    const bank = buildCoursePlacementBank("demo", [unit("a", 2), unit("b", 2), unit("c", 2)])!;
    const missFirst = bank.questions.map((q, i) => ({
      questionId: q.id,
      index: i < 2 ? 0 : 1, // miss unit a, ace the rest
    }));
    const weak = recommendPlacementUnit(missFirst, bank);
    expect(weak.level.recommendedUnitSlug).toBe("a");
    expect(weak.correct).toBe(4);

    const aceAll = bank.questions.map((q) => ({ questionId: q.id, index: q.correctIndex }));
    const strong = recommendPlacementUnit(aceAll, bank);
    expect(strong.level.recommendedUnitSlug).toBe("c");
    expect(strong.correct).toBe(6);
    expect(strong.score).toBe(1);
  });
});
