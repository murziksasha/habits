import { describe, expect, it } from "vitest";
import { gradeExercise } from "./grade.js";
import { exerciseSchema, isKnownExerciseType } from "./exercises.js";
import { exerciseTypeLabel } from "./ux.js";

const card = {
  id: "c1",
  type: "concept",
  promptUk: "Замикання",
  promptEn: "Closures",
  bodyUk: "Функція памʼятає змінні зовнішньої області.",
  bodyEn: "A function remembers variables of its outer scope.",
  keyPointsUk: ["лексична область"],
  keyPointsEn: ["lexical scope"],
};

describe("concept exercise", () => {
  it("is a known type with a label", () => {
    expect(isKnownExerciseType("concept")).toBe(true);
    expect(exerciseTypeLabel("concept", "en")).toBe("Concept");
    expect(exerciseTypeLabel("concept", "uk")).toBe("Теорія");
  });

  it("validates with zod schema", () => {
    expect(exerciseSchema.safeParse(card).success).toBe(true);
    expect(exerciseSchema.safeParse({ ...card, bodyUk: "" }).success).toBe(false);
  });

  it("acknowledged card without check is correct", () => {
    expect(gradeExercise(card, true).correct).toBe(true);
    expect(gradeExercise(card, { acknowledged: true }).correct).toBe(true);
    expect(gradeExercise(card, null).correct).toBe(false);
  });

  it("self-check must match correctIndex", () => {
    const withCheck = {
      ...card,
      check: { qUk: "Що?", qEn: "What?", options: ["a", "b"], correctIndex: 1 },
    };
    expect(gradeExercise(withCheck, 1).correct).toBe(true);
    expect(gradeExercise(withCheck, { index: 1 }).correct).toBe(true);
    expect(gradeExercise(withCheck, 0).correct).toBe(false);
  });
});
