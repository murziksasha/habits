import { describe, expect, it } from "vitest";
import { gradeExercise } from "@eduforge/shared";
import {
  softGradeCodeFill,
  softGradeCodeOrder,
  softGradeMcq,
} from "./client-grade.js";

/** Soft-grade helpers must match shared gradeExercise for common types. */
describe("soft-grade parity with gradeExercise", () => {
  it("mcq", () => {
    expect(softGradeMcq(2, 2)).toBe(true);
    expect(softGradeMcq(0, 2)).toBe(false);
    expect(gradeExercise({ id: "1", type: "mcq", correctIndex: 2 }, 2).correct).toBe(
      true,
    );
    expect(gradeExercise({ id: "1", type: "mcq", correctIndex: 2 }, 0).correct).toBe(
      false,
    );
  });

  it("code_fill accepted answers", () => {
    const accepted = ["const x = 1", "const x=1"];
    expect(softGradeCodeFill("const x = 1", accepted, false)).toBe(true);
    expect(softGradeCodeFill("const y = 1", accepted, false)).toBe(false);
    expect(
      gradeExercise({ id: "1", type: "code_fill", accepted }, "const x = 1").correct,
    ).toBe(true);
  });

  it("code_order", () => {
    const correct = ["a", "b", "c"];
    expect(softGradeCodeOrder(["a", "b", "c"], correct)).toBe(true);
    expect(softGradeCodeOrder(["b", "a", "c"], correct)).toBe(false);
    expect(
      gradeExercise({ id: "1", type: "code_order", correct }, ["a", "b", "c"]).correct,
    ).toBe(true);
  });
});
