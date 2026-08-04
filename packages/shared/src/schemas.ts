import { z } from "zod";
import { COURSE_SLUGS } from "./courses.js";

/** Password: min 8, max 128, at least one letter and one digit. */
export const passwordSchema = z
  .string()
  .min(8)
  .max(128)
  .refine((p) => /[a-zA-Zа-яА-ЯіІїЇєЄ]/.test(p) && /\d/.test(p), {
    message: "password_needs_letter_and_digit",
  });

export const registerSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
  displayName: z.string().min(2).max(32),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const submitLessonSchema = z.object({
  lessonId: z.string().uuid(),
  answers: z.array(
    z.object({
      exerciseId: z.string(),
      answer: z.unknown(),
      correct: z.boolean().optional(),
      meta: z.record(z.unknown()).optional(),
    }),
  ),
  durationMs: z.number().int().nonnegative().optional(),
});

export const seekGameSchema = z.object({
  timeControl: z.enum(["3+0", "5+0", "10+0"]),
  rated: z.boolean().default(true),
});

export const chessMoveSchema = z.object({
  gameId: z.string().uuid(),
  from: z.string().min(2).max(2),
  to: z.string().min(2).max(2),
  promotion: z.enum(["q", "r", "b", "n"]).optional(),
});

export const courseSlugSchema = z.enum(COURSE_SLUGS);

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type SubmitLessonInput = z.infer<typeof submitLessonSchema>;
