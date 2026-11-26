import { gradeExercise as gradeShared } from "@eduforge/shared";
import { resolveDrillAnswer } from "./services/endgame-drill.js";

/** Re-export shared grading so API routes keep stable import path. */
export { gradeCodeJudgeText, gradeCircuitServerEvaluation } from "@eduforge/shared";

type Ex = Parameters<typeof gradeShared>[0];

/**
 * Shared grading plus server-owned answers: an endgame drill is graded only from the
 * signed game the API itself played (see services/endgame-drill.ts).
 */
export function gradeExercise(exercise: Ex, answer: unknown, ctx: { userId?: string | null } = {}): ReturnType<typeof gradeShared> {
  if (exercise.type === "chess_endgame_drill") {
    const resolved = resolveDrillAnswer(exercise, answer, ctx.userId) as { verified: boolean };
    const r = gradeShared(exercise, resolved);
    if (!resolved.verified) return { ...r, correct: false, meta: { ...(r.meta ?? {}), endgame: "fail", reason: "unverified" } };
    return r;
  }
  return gradeShared(exercise, answer);
}
