import { describe, expect, it } from "vitest";
import { typescriptContent } from "./index.js";

describe("TypeScript course localization", () => {
  it("supplies English labels for Ukrainian choices and matching pairs", () => {
    const cyrillic = /[А-Яа-яІіЇїЄєҐґ]/u;
    for (const unit of typescriptContent.units) for (const lesson of unit.lessons) for (const exercise of lesson.exercises) {
      if ((exercise.type === "mcq" || exercise.type === "code_read" || exercise.type === "code_output") && exercise.options?.some((option) => cyrillic.test(option))) {
        expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
        expect(exercise.optionsEn?.join(" "), exercise.id).not.toMatch(cyrillic);
      }
      if (exercise.type === "match" && cyrillic.test(JSON.stringify(exercise.pairs))) {
        expect(exercise.pairsEn, exercise.id).toHaveLength(exercise.pairs.length);
        expect(JSON.stringify(exercise.pairsEn), exercise.id).not.toMatch(cyrillic);
      }
    }
  });
});
