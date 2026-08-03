import { describe, expect, it } from "vitest";
import { courseSlugPattern, validateExercises } from "./exercises.js";
import { DEFAULT_PLATFORM_THEME, platformThemeSchema } from "./theme.js";

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
