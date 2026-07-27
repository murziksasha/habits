import { describe, expect, it } from "vitest";
import {
  EXERCISE_TYPES,
  isKnownExerciseType,
  parseExerciseShape,
} from "./exercises.js";

describe("exercise shape schema", () => {
  it("accepts known types with id", () => {
    for (const type of EXERCISE_TYPES) {
      const r = parseExerciseShape({ id: `x-${type}`, type, promptUk: "тест" });
      expect(r.ok).toBe(true);
    }
  });

  it("rejects unknown type", () => {
    const r = parseExerciseShape({ id: "a", type: "nope" });
    expect(r.ok).toBe(false);
  });

  it("rejects missing id", () => {
    const r = parseExerciseShape({ type: "mcq" });
    expect(r.ok).toBe(false);
  });

  it("isKnownExerciseType", () => {
    expect(isKnownExerciseType("mcq")).toBe(true);
    expect(isKnownExerciseType("video")).toBe(true);
    expect(isKnownExerciseType("code_judge")).toBe(true);
    expect(isKnownExerciseType("not_a_real_type")).toBe(false);
  });
});
