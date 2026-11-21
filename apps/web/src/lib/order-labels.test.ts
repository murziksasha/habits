import { describe, expect, it } from "vitest";
import { orderLabel } from "./order-labels";
import { formatExerciseSolution, getApplyableAnswer } from "./exercise-solution";

describe("localized ordering labels", () => {
  const exercise = { type: "code_order", lines: ["second", "first"], linesUk: ["другий", "перший"], correct: ["first", "second"] };
  it("displays Ukrainian labels but keeps the canonical solution for submission", () => {
    expect(orderLabel("first", "uk", exercise.lines, exercise.linesUk)).toBe("перший");
    expect(orderLabel("first", "en", exercise.lines, exercise.linesUk)).toBe("first");
    expect(formatExerciseSolution(exercise, "uk")).toBe("перший\nдругий");
    expect(getApplyableAnswer(exercise)).toEqual(["first", "second"]);
  });
  it("falls back safely for missing, ambiguous, or misaligned labels", () => {
    expect(orderLabel("first", "uk", exercise.lines, ["другий"])).toBe("first");
    expect(orderLabel("first", "uk", ["first", "first"], ["один", "два"])).toBe("first");
  });
});
