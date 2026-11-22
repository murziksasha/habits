import { describe, expect, it } from "vitest";
import { gradeExercise } from "@eduforge/shared";
import { jsFundamentalsContent } from "./index.js";

describe("JavaScript function exercises", () => {
  it("accepts the requested default and declared rest binding", () => {
    const exercises = jsFundamentalsContent.units.flatMap((unit) => unit.lessons)
      .flatMap((lesson) => lesson.exercises);
    for (const [id, correct, wrong] of [["jsf-f4", "0", "1"], ["jsf-f5", "args", "rest"]] as const) {
      const exercise = exercises.find((item) => item.id === id);
      if (!exercise || exercise.type !== "code_fill") throw new Error(`Missing ${id}`);
      expect(gradeExercise(exercise, correct).correct).toBe(true);
      expect(gradeExercise(exercise, wrong).correct).toBe(false);
    }
  });
});

describe("JavaScript object exercises", () => {
  it("requires the named property or literal rather than a different valid expression", () => {
    const exercises = jsFundamentalsContent.units.flatMap((unit) => unit.lessons)
      .flatMap((lesson) => lesson.exercises);
    for (const [id, correct, wrong] of [
      ["jsf-ob1", "name", "id"], ["jsf-ob2", "name", "id"], ["jsf-ob4", "name", "id"],
      ["jsf-obe1", "1", "true"], ["jsf-obe3", "a", "obj"],
    ] as const) {
      const exercise = exercises.find((item) => item.id === id);
      if (!exercise || exercise.type !== "code_fill") throw new Error(`Missing ${id}`);
      expect(gradeExercise(exercise, correct).correct, id).toBe(true);
      expect(gradeExercise(exercise, wrong).correct, id).toBe(false);
    }
  });
});

describe("JavaScript module exercises", () => {
  it("requires the specified browser module filename", () => {
    const exercise = jsFundamentalsContent.units.flatMap((unit) => unit.lessons)
      .flatMap((lesson) => lesson.exercises).find((item) => item.id === "jsf-m2");
    if (!exercise || exercise.type !== "code_fill") throw new Error("Module path exercise missing");
    expect(gradeExercise(exercise, "math.js").correct).toBe(true);
    expect(gradeExercise(exercise, "lib").correct).toBe(false);
    expect(gradeExercise(exercise, "math").correct).toBe(false);
  });
});
