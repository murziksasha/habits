import { Hono } from "hono";
import { and, desc, eq } from "drizzle-orm";
import { characters, chessGames, chessPuzzleAttempts, chessPuzzleRatingsUser, chessRatings } from "@eduforge/db";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { cronAuthorized, cronUnauthorized } from "../cron-auth.js";
import { db } from "../db.js";
import { gradeExercise } from "../grade.js";
import { rateLimit } from "../rate-limit.js";
import {
  applyAttempt,
  getOrCreateLearnerRating,
  learnerThemeAccuracy,
  loadPuzzlePool,
  pickNextPuzzle,
  placementPartId,
  PUZZLE_MODES,
  recentPuzzleIds,
  runPuzzleRatingBatch,
  themeAccuracyFrom,
  type PuzzleMode,
} from "../services/chess-puzzles.js";
import { clampWrongAttempts, recordExerciseLearning } from "../services/exercise-learning.js";

type Vars = { user: AuthedUser };

export const chessRoutes = new Hono<{ Variables: Vars }>();

chessRoutes.get("/rating/me", authMiddleware, async (c) => {
  const user = c.get("user");
  let rating = await db.query.chessRatings.findFirst({
    where: eq(chessRatings.userId, user.id),
  });
  if (!rating) {
    const [created] = await db
      .insert(chessRatings)
      .values({ userId: user.id })
      .returning();
    rating = created;
  }
  return c.json({ rating });
});

chessRoutes.get("/games/me", authMiddleware, async (c) => {
  const user = c.get("user");
  const games = await db.query.chessGames.findMany({
    where: eq(chessGames.whiteId, user.id),
    orderBy: [desc(chessGames.createdAt)],
    limit: 20,
  });
  const asBlack = await db.query.chessGames.findMany({
    where: eq(chessGames.blackId, user.id),
    orderBy: [desc(chessGames.createdAt)],
    limit: 20,
  });
  const merged = [...games, ...asBlack]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 20);
  return c.json({ games: merged });
});

chessRoutes.get("/games/:id", authMiddleware, async (c) => {
  const user = c.get("user");
  const id = c.req.param("id") as string;
  const game = await db.query.chessGames.findFirst({ where: eq(chessGames.id, id) });
  if (!game) return c.json({ error: "not_found" }, 404);
  if (game.whiteId !== user.id && game.blackId !== user.id) {
    return c.json({ error: "forbidden" }, 403);
  }
  const whiteChar = game.whiteId
    ? await db.query.characters.findFirst({ where: eq(characters.userId, game.whiteId) })
    : null;
  const blackChar = game.blackId
    ? await db.query.characters.findFirst({ where: eq(characters.userId, game.blackId) })
    : null;
  return c.json({
    game,
    white: whiteChar ? { displayName: whiteChar.displayName } : null,
    black: blackChar ? { displayName: blackChar.displayName } : null,
  });
});

chessRoutes.get("/can-rated", authMiddleware, async (c) => {
  const user = c.get("user");
  const rating = await db.query.chessRatings.findFirst({
    where: eq(chessRatings.userId, user.id),
  });
  const today = new Date().toISOString().slice(0, 10);
  const ratedToday =
    rating?.ratedGamesDate === today ? (rating?.ratedGamesToday ?? 0) : 0;
  return c.json({
    allowed: true,
    ratedGamesToday: ratedToday,
  });
});

/* ——— Puzzle trainer (plan §3) ——— */

function asMode(v: string | undefined): PuzzleMode {
  return (PUZZLE_MODES as readonly string[]).includes(v ?? "") ? (v as PuzzleMode) : "mix";
}

function publicRating(r: { rating: number; rd: number; attempts: number; placed: boolean }) {
  return { rating: Math.round(r.rating), rd: Math.round(r.rd), attempts: r.attempts, placed: r.placed, provisional: r.rd > 110 };
}

chessRoutes.get("/puzzles/next", authMiddleware, async (c) => {
  const user = c.get("user");
  const mode = asMode(c.req.query("mode"));
  const theme = c.req.query("theme")?.slice(0, 64) ?? null;
  const [learner, pool, recent, themeAccuracy] = await Promise.all([
    getOrCreateLearnerRating(user.id),
    loadPuzzlePool(),
    recentPuzzleIds(user.id),
    learnerThemeAccuracy(user.id),
  ]);
  const pick = pickNextPuzzle({ rating: learner.rating, pool, recent, themeAccuracy, mode, theme });
  if (!pick) return c.json({ error: "no_puzzles" }, 404);
  return c.json({
    lessonId: pick.lessonId,
    puzzleRating: Math.round(pick.rating),
    exercise: pick.exercise,
    rating: publicRating(learner),
  });
});

chessRoutes.post("/puzzles/:id/attempt", authMiddleware, async (c) => {
  const user = c.get("user");
  const limited = await rateLimit({ key: `puzzles:${user.id}`, limit: 40, windowMs: 60_000 });
  if (!limited.ok) return c.json({ error: "rate_limited", retryAfter: limited.retryAfterSec }, 429);
  const exerciseId = (c.req.param("id") ?? "").slice(0, 128);
  const body = (await c.req.json().catch(() => null)) as {
    sans?: unknown;
    hintsUsed?: unknown;
    revealed?: unknown;
    wrongAttempts?: unknown;
    msSpent?: unknown;
  } | null;
  if (!body) return c.json({ error: "invalid_body" }, 400);
  const pool = await loadPuzzlePool();
  const puzzle = pool.find((p) => p.exerciseId === exerciseId);
  if (!puzzle) return c.json({ error: "not_found" }, 404);

  const g = gradeExercise(puzzle.exercise as Parameters<typeof gradeExercise>[0], {
    sans: body.sans,
    hintsUsed: body.hintsUsed,
    revealed: body.revealed,
  });
  const hintsUsed = Math.max(0, Math.min(2, Math.floor(Number(body.hintsUsed) || 0)));
  const revealed = body.revealed === true;
  const wrongAttempts = clampWrongAttempts(body.wrongAttempts);
  const msSpent = Number.isFinite(Number(body.msSpent)) ? Math.max(0, Math.min(3_600_000, Math.floor(Number(body.msSpent)))) : null;

  const learner = await getOrCreateLearnerRating(user.id);
  const prior = await db
    .select({ id: chessPuzzleAttempts.id })
    .from(chessPuzzleAttempts)
    .where(and(eq(chessPuzzleAttempts.userId, user.id), eq(chessPuzzleAttempts.exerciseId, exerciseId)))
    .limit(1);
  const { score, next } = applyAttempt(learner, puzzle, {
    solved: g.correct,
    firstTry: wrongAttempts === 0,
    hintsUsed,
    revealed,
  });
  await db.insert(chessPuzzleAttempts).values({
    userId: user.id,
    exerciseId,
    lessonId: puzzle.lessonId,
    result: score,
    firstAttempt: prior.length === 0,
    hintsUsed,
    themes: puzzle.themes,
    ratingBefore: learner.rating,
    ratingAfter: next.rating,
    puzzleRating: puzzle.rating,
    puzzleRd: puzzle.rd,
    msSpent,
  });
  const [updated] = await db
    .update(chessPuzzleRatingsUser)
    .set({ rating: next.rating, rd: next.rd, volatility: next.volatility, attempts: learner.attempts + 1, updatedAt: new Date() })
    .where(eq(chessPuzzleRatingsUser.userId, user.id))
    .returning();
  await recordExerciseLearning(
    user.id,
    [
      {
        lessonId: puzzle.lessonId,
        exerciseId,
        type: "chess_puzzle",
        correct: g.correct,
        wrongAttempts,
        hintsUsed,
        solutionRevealed: revealed,
        practiceMode: "puzzle_trainer",
      },
    ],
    "puzzles",
  ).catch(() => undefined);
  return c.json({
    correct: g.correct,
    score,
    ratingDelta: Math.round(next.rating - learner.rating),
    rating: publicRating(updated ?? { ...learner, ...next, attempts: learner.attempts + 1 }),
  });
});

chessRoutes.get("/puzzles/rating/me", authMiddleware, async (c) => {
  const user = c.get("user");
  const learner = await getOrCreateLearnerRating(user.id);
  return c.json({ rating: publicRating(learner), partId: learner.placed ? placementPartId(learner.rating) : null });
});

chessRoutes.get("/puzzles/themes/me", authMiddleware, async (c) => {
  const user = c.get("user");
  const rows = await db
    .select({ themes: chessPuzzleAttempts.themes, result: chessPuzzleAttempts.result })
    .from(chessPuzzleAttempts)
    .where(eq(chessPuzzleAttempts.userId, user.id))
    .orderBy(desc(chessPuzzleAttempts.createdAt))
    .limit(500);
  const acc = themeAccuracyFrom(rows);
  const counts = new Map<string, number>();
  for (const r of rows) for (const t of r.themes) counts.set(t, (counts.get(t) ?? 0) + 1);
  const themes = [...acc]
    .map(([theme, accuracy]) => ({ theme, accuracy: Math.round(accuracy * 100) / 100, attempts: counts.get(theme) ?? 0 }))
    .sort((a, b) => a.accuracy - b.accuracy || b.attempts - a.attempts);
  return c.json({ themes });
});

chessRoutes.post("/puzzles/placement/finish", authMiddleware, async (c) => {
  const user = c.get("user");
  const learner = await getOrCreateLearnerRating(user.id);
  await db.update(chessPuzzleRatingsUser).set({ placed: true, updatedAt: new Date() }).where(eq(chessPuzzleRatingsUser.userId, user.id));
  return c.json({ rating: publicRating({ ...learner, placed: true }), partId: placementPartId(learner.rating) });
});

chessRoutes.post("/puzzles/placement/skip", authMiddleware, async (c) => {
  const user = c.get("user");
  await getOrCreateLearnerRating(user.id);
  const [row] = await db
    .update(chessPuzzleRatingsUser)
    .set({ placed: true, updatedAt: new Date() })
    .where(eq(chessPuzzleRatingsUser.userId, user.id))
    .returning();
  return c.json({ rating: publicRating(row!), partId: null });
});

/** Daily puzzle-rating batch (CRON_SECRET). */
chessRoutes.post("/puzzles/cron/rate", async (c) => {
  if (!cronAuthorized(c)) return cronUnauthorized(c);
  const res = await runPuzzleRatingBatch();
  return c.json({ ok: true, ...res });
});
