import { describe, expect, it } from "vitest";
import {
  EXERCISE_TYPES,
  courseSlugPattern,
  isKnownExerciseType,
  parseExerciseShape,
  exerciseSchema,
  validateExercises,
} from "./exercises.js";
import { DEFAULT_PLATFORM_THEME, platformThemeSchema } from "./theme.js";

describe("exercise shape schema", () => {
  it("preserves Ukrainian ordering labels while retaining canonical answers", () => {
    const parsed = exerciseSchema.parse({
      id: "localized-order", type: "code_order", promptUk: "Впорядкуйте",
      lines: ["second", "first"], linesUk: ["другий", "перший"], correct: ["first", "second"],
    });
    expect(parsed.type === "code_order" && parsed.linesUk).toEqual(["другий", "перший"]);
    expect(parsed.type === "code_order" && parsed.correct).toEqual(["first", "second"]);
  });
  it("preserves an English RSVP passage through exercise validation", () => {
    const parsed = exerciseSchema.parse({ id: "rsvp-locale", type: "rsvp", promptUk: "Читайте", text: "Український текст", textEn: "English text", wpm: 180 });
    expect(parsed.type === "rsvp" && parsed.textEn).toBe("English text");
  });
  it("preserves translated chess quiz choices through exercise validation", () => {
    const parsed = exerciseSchema.parse({
      id: "chess-quiz", type: "chess_lesson", promptUk: "Позиція", fen: "position",
      notesUk: "Пояснення", quiz: { q: "Питання", qEn: "Question", options: ["Так", "Ні"], optionsEn: ["Yes", "No"], correctIndex: 0 },
    });
    expect(parsed.type === "chess_lesson" && parsed.quiz?.optionsEn).toEqual(["Yes", "No"]);
  });
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

  it("enforces both promptUk and promptEn when requireBothLocales is set", () => {
    const withoutEn = validateExercises(
      [
        {
          id: "1",
          type: "mcq",
          promptUk: "Питання?",
          options: ["A", "B"],
          correctIndex: 0,
        },
      ],
      { requireBothLocales: true },
    );
    expect(withoutEn.ok).toBe(false);
    expect(withoutEn.errors[0]).toContain("missing_prompt_en_or_uk");

    const withBoth = validateExercises(
      [
        {
          id: "1",
          type: "mcq",
          promptUk: "Питання?",
          promptEn: "Question?",
          options: ["A", "B"],
          correctIndex: 0,
        },
      ],
      { requireBothLocales: true },
    );
    expect(withBoth.ok).toBe(true);
  });

  it("accepts empty array (publish enforces min lessons separately)", () => {
    const r = validateExercises([]);
    expect(r.ok).toBe(true);
  });

  it("requires optionsEn and pairsEn to match canonical lengths", () => {
    const badOptions = validateExercises([
      {
        id: "1",
        type: "mcq",
        promptUk: "Питання достатньої довжини",
        options: ["a", "b"],
        optionsEn: ["only one"],
        correctIndex: 1,
      },
    ]);
    expect(badOptions.ok).toBe(false);
    expect(badOptions.errors.join(" ")).toContain("options_en_length");

    const okPairs = validateExercises([
      {
        id: "2",
        type: "match",
        promptUk: "Зіставте пари",
        pairs: [{ left: "a", right: "1" }],
        pairsEn: [{ left: "A", right: "one" }],
      },
    ]);
    expect(okPairs.ok).toBe(true);

    const badPairs = validateExercises([
      {
        id: "3",
        type: "match",
        promptUk: "Зіставте пари",
        pairs: [{ left: "a", right: "1" }],
        pairsEn: [],
      },
    ]);
    expect(badPairs.ok).toBe(false);
    expect(badPairs.errors.join(" ")).toContain("pairs_en_length");
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
