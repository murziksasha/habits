import { describe, expect, it } from "vitest";
import { postgresqlAppsContent } from "./index.js";

describe("PostgreSQL course localization", () => {
  it("provides aligned English translations for Ukrainian choices and matching pairs", () => {
    const exercises = postgresqlAppsContent.units.flatMap((unit) =>
      unit.lessons.flatMap((lesson) => lesson.exercises),
    );
    const cyrillic = /[А-Яа-яІіЇїЄєҐґ]/u;
    for (const exercise of exercises) {
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
