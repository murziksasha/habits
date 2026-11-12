import { z } from "zod";
import { COURSE_SLUGS } from "./courses.js";
import {
  HISTORY_LIMIT_DEFAULT,
  HISTORY_LIMIT_MAX,
  WEEKLY_TARGET_MAX,
  WEEKLY_TARGET_MIN,
} from "./learning-progress.js";

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
  timeControl: z.enum(["3+0", "3+2", "5+0", "5+3", "10+0"]),
  rated: z.boolean().default(true),
});

export const chessMoveSchema = z.object({
  gameId: z.string().uuid(),
  from: z.string().min(2).max(2),
  to: z.string().min(2).max(2),
  promotion: z.enum(["q", "r", "b", "n"]).optional(),
});

export const courseSlugSchema = z.enum(COURSE_SLUGS);

export const learningProgressQuerySchema = z.object({
  days: z
    .enum(["7", "30", "90"])
    .optional()
    .transform((v) => (v ? (Number(v) as 7 | 30 | 90) : 30)),
  course: z
    .string()
    .trim()
    .min(1)
    .max(64)
    .optional()
    .transform((v) => (!v || v === "all" ? null : v)),
});

export const learningHistoryQuerySchema = z.object({
  days: z
    .enum(["7", "30", "90", "all"])
    .optional()
    .transform((v) => {
      if (!v || v === "all") return "all" as const;
      return Number(v) as 7 | 30 | 90;
    }),
  course: z
    .string()
    .trim()
    .min(1)
    .max(64)
    .optional()
    .transform((v) => (!v || v === "all" ? null : v)),
  limit: z
    .preprocess(
      (v) => (v === undefined || v === "" ? HISTORY_LIMIT_DEFAULT : Number(v)),
      z.number().int().min(1).max(HISTORY_LIMIT_MAX),
    )
    .default(HISTORY_LIMIT_DEFAULT),
  cursor: z.string().min(1).max(512).optional(),
});

export const updateLearningGoalSchema = z.object({
  weeklyTarget: z
    .number()
    .int()
    .min(WEEKLY_TARGET_MIN)
    .max(WEEKLY_TARGET_MAX)
    .nullable(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type SubmitLessonInput = z.infer<typeof submitLessonSchema>;
export type LearningProgressQuery = z.infer<typeof learningProgressQuerySchema>;
export type LearningHistoryQuery = z.infer<typeof learningHistoryQuerySchema>;
export type UpdateLearningGoalInput = z.infer<typeof updateLearningGoalSchema>;
