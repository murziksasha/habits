import { and, asc, eq, inArray, lte } from "drizzle-orm";
import { chessSrsNext } from "@eduforge/shared";
import { chessPersonalPuzzles } from "@eduforge/db";
import { db } from "../db.js";
import { gradeExercise } from "../grade.js";
import { clampWrongAttempts } from "./exercise-learning.js";

/** Pseudo lesson id for puzzles from the learner's own games inside review sessions. */
export const OWN_GAME_LESSON_ID = "own_game";
export const OWN_GAME_EXERCISE_PREFIX = "own-";

export type PersonalPuzzleRow = typeof chessPersonalPuzzles.$inferSelect;

export function personalExercise(r: PersonalPuzzleRow) {
  const side = r.fen.split(" ")[1] === "b";
  return {
    id: r.id,
    gameId: r.gameId,
    ply: r.ply,
    dueAt: r.dueAt,
    reason: "own_game" as const,
    exercise: {
      id: `${OWN_GAME_EXERCISE_PREFIX}${r.id}`,
      type: "chess_puzzle",
      promptUk: side ? "Задача з вашої партії: чорні ходять — знайдіть найкраще продовження." : "Задача з вашої партії: білі ходять — знайдіть найкраще продовження.",
      promptEn: side ? "From your game: Black to move — find the best continuation." : "From your game: White to move — find the best continuation.",
      fen: r.fen,
      solutionSans: r.solutionSans,
      goal: r.goal,
      themes: r.themes,
      difficulty: 3,
      source: { kind: "game", gameId: r.gameId ?? undefined },
    },
  };
}

export async function duePersonalPuzzles(userId: string, limit: number, now = new Date()): Promise<PersonalPuzzleRow[]> {
  if (limit <= 0) return [];
  return db
    .select()
    .from(chessPersonalPuzzles)
    .where(and(eq(chessPersonalPuzzles.userId, userId), lte(chessPersonalPuzzles.dueAt, now)))
    .orderBy(asc(chessPersonalPuzzles.dueAt))
    .limit(limit);
}

/** Move a personal puzzle along its SRS ladder after one attempt. A clean solve needs no wrong tries. */
export async function applyPersonalAttempt(row: PersonalPuzzleRow, correct: boolean, wrongAttempts: unknown, now = new Date()) {
  const clean = correct && clampWrongAttempts(wrongAttempts) === 0;
  const next = chessSrsNext(row.lastReviewedAt ? row : null, clean);
  await db
    .update(chessPersonalPuzzles)
    .set({ repetitions: next.repetitions, lapses: next.lapses, dueAt: new Date(now.getTime() + next.intervalDays * 86_400_000), lastReviewedAt: now })
    .where(eq(chessPersonalPuzzles.id, row.id));
  return { clean, intervalDays: next.intervalDays };
}

/**
 * Grade own-game puzzle answers from a review session (lessonId = OWN_GAME_LESSON_ID).
 * Rows are always scoped to the learner, so another user's puzzle id grades as not_found.
 */
export async function gradePersonalAnswers(
  userId: string,
  answers: { exerciseId: string; answer?: unknown; wrongAttempts?: number }[],
) {
  const ids = answers
    .map((a) => (a.exerciseId.startsWith(OWN_GAME_EXERCISE_PREFIX) ? a.exerciseId.slice(OWN_GAME_EXERCISE_PREFIX.length) : ""))
    .filter((id) => /^[0-9a-f-]{36}$/i.test(id));
  const rows = ids.length
    ? await db
        .select()
        .from(chessPersonalPuzzles)
        .where(and(eq(chessPersonalPuzzles.userId, userId), inArray(chessPersonalPuzzles.id, ids)))
    : [];
  const byId = new Map(rows.map((r) => [`${OWN_GAME_EXERCISE_PREFIX}${r.id}`, r]));
  const out: { exerciseId: string; correct: boolean; firstTry: boolean; found: boolean }[] = [];
  for (const a of answers) {
    const row = byId.get(a.exerciseId);
    if (!row) {
      out.push({ exerciseId: a.exerciseId, correct: false, firstTry: false, found: false });
      continue;
    }
    const g = gradeExercise(personalExercise(row).exercise as Parameters<typeof gradeExercise>[0], a.answer, { userId });
    const { clean } = await applyPersonalAttempt(row, g.correct, a.wrongAttempts);
    out.push({ exerciseId: a.exerciseId, correct: g.correct, firstTry: clean, found: true });
  }
  return out;
}
