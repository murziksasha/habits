import { z } from "zod";
import type { ExerciseType } from "./courses.js";

/** Canonical exercise type ids used in content + grade engine. */
export const EXERCISE_TYPES = [
  "mcq",
  "translate",
  "match",
  "order_words",
  "fill_blank",
  "typing",
  "rsvp",
  "comprehension",
  "logic_puzzle",
  "chess_puzzle",
  "chess_lesson",
  "code_read",
  "code_output",
  "code_fill",
  "code_order",
  "code_project",
  "video",
  "code_judge",
] as const satisfies readonly ExerciseType[];

export const exerciseTypeSchema = z.enum(EXERCISE_TYPES);

/**
 * Structural shape check for seeded exercises (not full per-type grading schema).
 * Extra fields are allowed so content can evolve without blocking the shared package.
 */
export const exerciseShapeSchema = z
  .object({
    id: z.string().min(1),
    type: exerciseTypeSchema,
    promptUk: z.string().optional(),
    promptEn: z.string().optional(),
  })
  .passthrough();

export type ExerciseShape = z.infer<typeof exerciseShapeSchema>;

export function parseExerciseShape(value: unknown): {
  ok: boolean;
  data?: ExerciseShape;
  error?: string;
} {
  const r = exerciseShapeSchema.safeParse(value);
  if (!r.success) {
    return { ok: false, error: r.error.issues.map((i) => i.message).join("; ") };
  }
  return { ok: true, data: r.data };
}

export function isKnownExerciseType(type: string): type is ExerciseType {
  return (EXERCISE_TYPES as readonly string[]).includes(type);
}
