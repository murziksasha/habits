import { describe, expect, it } from "vitest";
import { formatExerciseSolution, getApplyableAnswer } from "./exercise-solution";

describe("localized solution reveal", () => {
  const exercise = {
    type: "mcq",
    options: ["Ні", "Так"],
    optionsEn: ["No", "Yes"],
    correctIndex: 1,
    explanationUk: "Правильно.",
    explanationEn: "Correct.",
  };

  it("reveals the translated answer while keeping the canonical answer index", () => {
    expect(formatExerciseSolution(exercise, "en")).toBe("Yes\n\nCorrect.");
    expect(formatExerciseSolution(exercise, "uk")).toBe("Так\n\nПравильно.");
    expect(getApplyableAnswer(exercise)).toBe(1);
  });

  it("falls back to canonical choices when translation is incomplete", () => {
    expect(formatExerciseSolution({ ...exercise, optionsEn: ["No"] }, "en")).toBe("Так\n\nCorrect.");
  });
});
