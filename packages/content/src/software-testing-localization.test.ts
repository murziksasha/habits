import { describe, expect, it } from "vitest";
import { softwareTestingContent } from "./index.js";

describe("Software testing course localization", () => {
  it("keeps English choices and matching pairs aligned in the assembled course", () => {
    const exercises = softwareTestingContent.units.flatMap((unit) =>
      unit.lessons.flatMap((lesson) => lesson.exercises),
    );
    expect(exercises.length).toBeGreaterThan(0);
    for (const exercise of exercises) {
      if (exercise.type === "mcq" || exercise.type === "code_read" || exercise.type === "code_output") {
        expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
        expect(exercise.optionsEn?.join(" "), exercise.id).not.toMatch(/[А-Яа-яІіЇїЄєҐґ]/u);
      }
      if (exercise.type === "match") {
        expect(exercise.pairsEn, exercise.id).toHaveLength(exercise.pairs.length);
        expect(JSON.stringify(exercise.pairsEn), exercise.id).not.toMatch(/[А-Яа-яІіЇїЄєҐґ]/u);
      }
    }
  });
});
