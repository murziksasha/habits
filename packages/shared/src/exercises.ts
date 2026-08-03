import { z } from "zod";

const base = {
  id: z.string().min(1).max(128),
  promptUk: z.string().min(1).max(4000),
  promptEn: z.string().max(4000).optional(),
};

/** Zod schemas for exercise payloads (admin publish + soft validation). */
export const exerciseSchema = z.discriminatedUnion("type", [
  z.object({
    ...base,
    type: z.literal("mcq"),
    options: z.array(z.string()).min(2).max(12),
    correctIndex: z.number().int().min(0),
    explanationUk: z.string().max(2000).optional(),
    explanationEn: z.string().max(2000).optional(),
  }),
  z.object({
    ...base,
    type: z.literal("translate"),
    source: z.string().min(1),
    accepted: z.array(z.string()).min(1),
    direction: z.enum(["en_uk", "uk_en"]),
  }),
  z.object({
    ...base,
    type: z.literal("match"),
    pairs: z.array(z.object({ left: z.string(), right: z.string() })).min(1),
  }),
  z.object({
    ...base,
    type: z.literal("order_words"),
    words: z.array(z.string()).min(1),
    correct: z.array(z.string()).min(1),
  }),
  z.object({
    ...base,
    type: z.literal("fill_blank"),
    sentence: z.string().min(1),
    accepted: z.array(z.string()).min(1),
  }),
  z.object({
    ...base,
    type: z.literal("typing"),
    text: z.string().min(1),
    layout: z.enum(["en", "uk"]),
    targetWpm: z.number().optional(),
  }),
  z.object({
    ...base,
    type: z.literal("rsvp"),
    text: z.string().min(1),
    wpm: z.number().positive(),
  }),
  z.object({
    ...base,
    type: z.literal("comprehension"),
    passage: z.string().min(1),
    questions: z
      .array(
        z.object({
          q: z.string(),
          qEn: z.string().optional(),
          options: z.array(z.string()).min(2),
          correctIndex: z.number().int().min(0),
        }),
      )
      .min(1),
  }),
  z.object({
    ...base,
    type: z.literal("logic_puzzle"),
    category: z.string(),
    difficulty: z.number().int().min(1).max(5),
    options: z.array(z.string()).min(2),
    correctIndex: z.number().int().min(0),
    hintUk: z.string().optional(),
    hintEn: z.string().optional(),
  }),
  z.object({
    ...base,
    type: z.literal("chess_puzzle"),
    fen: z.string().min(1),
    solutionSans: z.array(z.string()).min(1),
    difficulty: z.number().int().min(1).max(5),
  }),
  z.object({
    ...base,
    type: z.literal("chess_lesson"),
    fen: z.string().min(1),
    notesUk: z.string(),
    notesEn: z.string().optional(),
    quiz: z
      .object({
        q: z.string(),
        qEn: z.string().optional(),
        options: z.array(z.string()).min(2),
        correctIndex: z.number().int().min(0),
      })
      .optional(),
  }),
  z.object({
    ...base,
    type: z.literal("code_read"),
    code: z.string(),
    language: z.string(),
    options: z.array(z.string()).min(2),
    correctIndex: z.number().int().min(0),
    explanationUk: z.string().optional(),
    explanationEn: z.string().optional(),
  }),
  z.object({
    ...base,
    type: z.literal("code_output"),
    code: z.string(),
    language: z.string(),
    options: z.array(z.string()).min(2).optional(),
    correctIndex: z.number().int().min(0).optional(),
    accepted: z.array(z.string()).optional(),
    explanationUk: z.string().optional(),
    explanationEn: z.string().optional(),
  }),
  z.object({
    ...base,
    type: z.literal("code_fill"),
    code: z.string(),
    language: z.string(),
    accepted: z.array(z.string()).min(1),
    caseSensitive: z.boolean().optional(),
    explanationUk: z.string().optional(),
    explanationEn: z.string().optional(),
  }),
  z.object({
    ...base,
    type: z.literal("code_order"),
    language: z.string().optional(),
    lines: z.array(z.string()).min(1),
    correct: z.array(z.string()).min(1),
    explanationUk: z.string().optional(),
    explanationEn: z.string().optional(),
  }),
  z.object({
    ...base,
    type: z.literal("code_project"),
    files: z
      .array(
        z.object({
          id: z.string(),
          name: z.string(),
          language: z.string(),
          starter: z.string(),
        }),
      )
      .min(1),
    checks: z
      .array(
        z.object({
          fileId: z.string().optional(),
          contains: z.array(z.string()).optional(),
          containsHtml: z.array(z.string()).optional(),
          forbidden: z.array(z.string()).optional(),
          kind: z.enum(["source", "dom"]).optional(),
          selector: z.string().optional(),
          minCount: z.number().optional(),
        }),
      )
      .min(1),
    caseSensitive: z.boolean().optional(),
    hintUk: z.string().optional(),
    hintEn: z.string().optional(),
    explanationUk: z.string().optional(),
    explanationEn: z.string().optional(),
  }),
  z.object({
    ...base,
    type: z.literal("code_run"),
    language: z.string().min(1),
    starter: z.string(),
    tests: z
      .array(
        z.object({
          stdin: z.string().optional(),
          stdout: z.string(),
        }),
      )
      .min(1),
    requiredSource: z.array(z.string()).optional(),
    forbiddenSource: z.array(z.string()).optional(),
    timeLimitMs: z.number().optional(),
    caseSensitive: z.boolean().optional(),
    hintUk: z.string().optional(),
    hintEn: z.string().optional(),
    explanationUk: z.string().optional(),
    explanationEn: z.string().optional(),
    solutionUk: z.string().optional(),
    solutionEn: z.string().optional(),
  }),
]);

export const exercisesArraySchema = z.array(exerciseSchema).min(1);

export const courseSlugPattern = /^[a-z][a-z0-9_]{1,62}$/;

export function validateExercises(exercises: unknown): {
  ok: boolean;
  errors: string[];
} {
  const parsed = z.array(z.unknown()).safeParse(exercises);
  if (!parsed.success) return { ok: false, errors: ["exercises_must_be_array"] };
  const errors: string[] = [];
  parsed.data.forEach((ex, i) => {
    const r = exerciseSchema.safeParse(ex);
    if (!r.success) {
      errors.push(`exercise[${i}]: ${r.error.issues[0]?.message ?? "invalid"}`);
    }
  });
  return { ok: errors.length === 0, errors };
}
