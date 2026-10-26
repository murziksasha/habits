import { describe, expect, it } from "vitest";
import {
  EXERCISE_TYPES,
  courseSlugPattern,
  isKnownExerciseType,
  parseExerciseShape,
  validateExercises,
} from "./exercises.js";
import { DEFAULT_PLATFORM_THEME, platformThemeSchema } from "./theme.js";

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
    expect(isKnownExerciseType("code_run")).toBe(true);
    expect(isKnownExerciseType("not_a_real_type")).toBe(false);
  });
});

describe("validateExercises", () => {
  it("accepts valid mcq", () => {
    const r = validateExercises([
      {
        id: "1",
        type: "mcq",
        promptUk: "Q?",
        options: ["A", "B"],
        correctIndex: 0,
      },
    ]);
    expect(r.ok).toBe(true);
  });

  it("accepts empty array (publish enforces min lessons separately)", () => {
    const r = validateExercises([]);
    expect(r.ok).toBe(true);
  });

  it("rejects bad type", () => {
    const r = validateExercises([{ id: "1", type: "nope", promptUk: "x" }]);
    expect(r.ok).toBe(false);
  });
});

describe("courseSlugPattern", () => {
  it("matches free slugs", () => {
    expect(courseSlugPattern.test("my_course")).toBe(true);
    expect(courseSlugPattern.test("MyCourse")).toBe(false);
    expect(courseSlugPattern.test("1bad")).toBe(false);
  });
});

describe("platformTheme", () => {
  it("parses default theme", () => {
    expect(platformThemeSchema.safeParse(DEFAULT_PLATFORM_THEME).success).toBe(true);
  });
});
