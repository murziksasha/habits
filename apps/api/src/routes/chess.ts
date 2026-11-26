import { Hono } from "hono";
import { and, asc, desc, eq, lte, sql } from "drizzle-orm";
import {
  REPERTOIRES,
  findOpeningLine,
  gameTerminationWithHistory,
  getRepertoire,
  gradeOpeningAttempt,
  replayHistory,
  toPgn,
} from "@eduforge/chess-core";
import { chessSrsNext } from "@eduforge/shared";
import {
  characters,
  chessGameAnnotations,
  chessGames,
  chessOpeningLines,
  chessPersonalPuzzles,
  chessPuzzleAttempts,
  chessPuzzleRatingsUser,
  chessRatings,
} from "@eduforge/db";
import { analysePendingGames, enqueueGameAnalysis } from "../services/chess-game-analysis.js";
import { authMiddleware, optionalAuth, type AuthedUser } from "../auth.js";
import { cronAuthorized, cronUnauthorized } from "../cron-auth.js";
import { db } from "../db.js";
import { gradeExercise } from "../grade.js";
import { rateLimit, requestClientIp } from "../rate-limit.js";
import { applyPersonalAttempt, personalExercise } from "../services/chess-personal.js";
import { findDrillExercise, playDrillMove, readDrillToken } from "../services/endgame-drill.js";
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
  const annotations = await db
    .select()
    .from(chessGameAnnotations)
    .where(eq(chessGameAnnotations.gameId, game.id))
    .orderBy(asc(chessGameAnnotations.ply));
  if (game.status === "finished" && !game.analysisStatus) enqueueGameAnalysis(game.id);
  return c.json({
    game,
    annotations,
    white: whiteChar ? { displayName: whiteChar.displayName } : null,
    black: blackChar ? { displayName: blackChar.displayName } : null,
  });
});

/* ——— Bot games, analysis, personal puzzles (plan §5) ——— */

const BOT_LEVELS = new Set(["learner", "club", "strong", "tablebase"]);
const GAME_KINDS = new Set(["bot", "endgame", "opening"]);

chessRoutes.post("/games/bot", authMiddleware, async (c) => {
  const user = c.get("user");
  const limited = await rateLimit({ key: `botgame:${user.id}`, limit: 20, windowMs: 60_000 });
  if (!limited.ok) return c.json({ error: "rate_limited", retryAfter: limited.retryAfterSec }, 429);
  const body = (await c.req.json().catch(() => null)) as {
    sans?: unknown;
    playerColor?: unknown;
    botLevel?: unknown;
    resigned?: unknown;
    startFen?: unknown;
    kind?: unknown;
  } | null;
  if (!body || !Array.isArray(body.sans) || body.sans.length > 600 || !body.sans.every((x) => typeof x === "string" && x.length <= 10)) {
    return c.json({ error: "invalid_body" }, 400);
  }
  const color = body.playerColor === "b" ? "b" : "w";
  const startFen = typeof body.startFen === "string" && body.startFen.length <= 100 ? body.startFen : "startpos";
  const sans = body.sans as string[];
  const game = replayHistory(startFen, []);
  if (!game) return c.json({ error: "invalid_fen" }, 400);
  const moves: { san: string; uci: string; fen: string }[] = [];
  for (const san of sans) {
    let mv;
    try {
      mv = game.move(san);
    } catch {
      mv = null;
    }
    if (!mv) return c.json({ error: "illegal_move", ply: moves.length }, 400);
    moves.push({ san: mv.san, uci: `${mv.from}${mv.to}${mv.promotion ?? ""}`, fen: game.fen() });
  }
  const term = gameTerminationWithHistory(startFen, sans);
  let result: string;
  let termination: string;
  if (term.over && term.result) {
    result = term.result;
    termination = term.reason ?? "checkmate";
  } else if (body.resigned === true) {
    result = color === "w" ? "0-1" : "1-0";
    termination = "resign";
  } else {
    result = "*";
    termination = "abandoned";
  }
  const kind = typeof body.kind === "string" && GAME_KINDS.has(body.kind) ? body.kind : "bot";
  const [row] = await db
    .insert(chessGames)
    .values({
      whiteId: color === "w" ? user.id : null,
      blackId: color === "b" ? user.id : null,
      fen: game.fen(),
      pgn: moves.map((m) => m.san).join(" "),
      moves,
      startFen,
      status: "finished",
      timeControl: "bot",
      rated: false,
      result,
      termination,
      kind,
      botLevel: typeof body.botLevel === "string" && BOT_LEVELS.has(body.botLevel) ? body.botLevel : null,
      whiteTimeMs: 0,
      blackTimeMs: 0,
      finishedAt: new Date(),
    })
    .returning({ id: chessGames.id });
  if (row) enqueueGameAnalysis(row.id);
  return c.json({ id: row?.id, result, termination });
});

chessRoutes.get("/games/:id/pgn", authMiddleware, async (c) => {
  const user = c.get("user");
  const game = await db.query.chessGames.findFirst({ where: eq(chessGames.id, c.req.param("id") ?? "") });
  if (!game) return c.json({ error: "not_found" }, 404);
  if (game.whiteId !== user.id && game.blackId !== user.id) return c.json({ error: "forbidden" }, 403);
  const pgn = toPgn((game.pgn ?? "").split(" ").filter(Boolean), {
    result: game.result ?? "*",
    date: game.createdAt.toISOString().slice(0, 10).replace(/-/g, "."),
    white: game.whiteId ? (game.whiteId === user.id ? "You" : "Opponent") : "Bot",
    black: game.blackId ? (game.blackId === user.id ? "You" : "Opponent") : "Bot",
    startFen: game.startFen,
  });
  return c.text(pgn, 200, { "content-type": "application/x-chess-pgn; charset=utf-8" });
});

chessRoutes.get("/personal-puzzles/due", authMiddleware, async (c) => {
  const user = c.get("user");
  const rows = await db
    .select()
    .from(chessPersonalPuzzles)
    .where(and(eq(chessPersonalPuzzles.userId, user.id), lte(chessPersonalPuzzles.dueAt, new Date())))
    .orderBy(asc(chessPersonalPuzzles.dueAt))
    .limit(20);
  const [agg] = await db
    .select({ total: sql<number>`count(*)::int` })
    .from(chessPersonalPuzzles)
    .where(eq(chessPersonalPuzzles.userId, user.id));
  return c.json({ items: rows.map(personalExercise), total: agg?.total ?? 0 });
});

chessRoutes.post("/personal-puzzles/:id/attempt", authMiddleware, async (c) => {
  const user = c.get("user");
  const row = await db.query.chessPersonalPuzzles.findFirst({
    where: and(eq(chessPersonalPuzzles.id, c.req.param("id") ?? ""), eq(chessPersonalPuzzles.userId, user.id)),
  });
  if (!row) return c.json({ error: "not_found" }, 404);
  const body = (await c.req.json().catch(() => null)) as { sans?: unknown; revealed?: unknown; wrongAttempts?: unknown } | null;
  const ex = personalExercise(row).exercise;
  const g = gradeExercise(ex as Parameters<typeof gradeExercise>[0], { sans: body?.sans, revealed: body?.revealed }, { userId: user.id });
  const next = await applyPersonalAttempt(row, g.correct, body?.wrongAttempts);
  return c.json({ correct: g.correct, intervalDays: next.intervalDays });
});

/** Opening repertoires with the learner's per-line SRS state (phase 7). */
chessRoutes.get("/openings", authMiddleware, async (c) => {
  const user = c.get("user");
  const rows = await db.query.chessOpeningLines.findMany({ where: eq(chessOpeningLines.userId, user.id) });
  const byKey = new Map(rows.map((r) => [r.lineKey, r]));
  const now = Date.now();
  return c.json({
    repertoires: REPERTOIRES.map((r) => ({
      id: r.id,
      side: r.side,
      titleUk: r.titleUk,
      titleEn: r.titleEn,
      unit: r.unit,
      lines: r.lines.map((l) => {
        const p = byKey.get(l.key);
        return {
          key: l.key,
          nameUk: l.nameUk,
          nameEn: l.nameEn,
          sans: l.sans,
          comments: l.comments,
          repetitions: p?.repetitions ?? 0,
          lapses: p?.lapses ?? 0,
          dueAt: p?.dueAt ?? null,
          due: !p || p.dueAt.getTime() <= now,
          started: Boolean(p),
        };
      }),
    })),
  });
});

/** Lines due today (already studied and due) plus how many are new. */
chessRoutes.get("/openings/due", authMiddleware, async (c) => {
  const user = c.get("user");
  const rows = await db.query.chessOpeningLines.findMany({
    where: and(eq(chessOpeningLines.userId, user.id), lte(chessOpeningLines.dueAt, new Date())),
    orderBy: [asc(chessOpeningLines.dueAt)],
    limit: 50,
  });
  const started = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(chessOpeningLines)
    .where(eq(chessOpeningLines.userId, user.id));
  const total = REPERTOIRES.reduce((n, r) => n + r.lines.length, 0);
  return c.json({
    items: rows.map((r) => ({ repertoireId: r.repertoireId, lineKey: r.lineKey, dueAt: r.dueAt, repetitions: r.repetitions })),
    newLines: Math.max(0, total - Number(started[0]?.n ?? 0)),
  });
});

/**
 * Grade one line run. Body: `{ tries: string[][] }` — for each learner move the SANs tried in order,
 * the last being the repertoire move. Clean run → next ladder step (1/3/7/21 days); any mistake → 1 day.
 */
chessRoutes.post("/openings/:repertoire/lines/:lineKey/attempt", authMiddleware, async (c) => {
  const user = c.get("user");
  const limited = await rateLimit({ key: `openings:${user.id}`, limit: 60, windowMs: 60_000 });
  if (!limited.ok) return c.json({ error: "rate_limited", retryAfter: limited.retryAfterSec }, 429);
  const repId = c.req.param("repertoire") ?? "";
  const lineKey = decodeURIComponent(c.req.param("lineKey") ?? "");
  const rep = getRepertoire(repId);
  const line = rep ? findOpeningLine(repId, lineKey) : undefined;
  if (!rep || !line) return c.json({ error: "not_found" }, 404);
  const body = (await c.req.json().catch(() => null)) as { tries?: unknown } | null;
  const g = gradeOpeningAttempt(rep, line, body?.tries);
  if (!g.valid) return c.json({ error: "invalid_attempt" }, 400);
  const prev = await db.query.chessOpeningLines.findFirst({
    where: and(eq(chessOpeningLines.userId, user.id), eq(chessOpeningLines.lineKey, line.key)),
  });
  const next = chessSrsNext(prev ? prev : null, g.correct);
  const now = new Date();
  const values = {
    repetitions: next.repetitions,
    lapses: next.lapses,
    intervalDays: next.intervalDays,
    dueAt: new Date(now.getTime() + next.intervalDays * 86_400_000),
    lastReviewedAt: now,
  };
  if (prev) await db.update(chessOpeningLines).set(values).where(eq(chessOpeningLines.id, prev.id));
  else await db.insert(chessOpeningLines).values({ userId: user.id, repertoireId: rep.id, lineKey: line.key, ...values });
  return c.json({ correct: g.correct, mistakes: g.mistakes, intervalDays: next.intervalDays, dueAt: values.dueAt });
});

/** Analyse finished games that were never analysed (CRON_SECRET). */
chessRoutes.post("/cron/analyze", async (c) => {
  if (!cronAuthorized(c)) return cronUnauthorized(c);
  const n = await analysePendingGames(10);
  return c.json({ ok: true, games: n });
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
    themes: puzzle.skillThemes,
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

/**
 * Server-owned endgame drill: the learner sends only its own move (plus the token from the
 * previous reply); the API validates it, plays the defender and signs the game so far.
 * Lesson grading accepts only that token (apps/api/src/grade.ts).
 */
chessRoutes.post("/drills/:exerciseId/move", optionalAuth, async (c) => {
  const user = c.get("user") as AuthedUser | undefined;
  const who = user?.id ?? "";
  const limited = await rateLimit({ key: `drill:${who || requestClientIp(c)}`, limit: 40, windowMs: 60_000 });
  if (!limited.ok) return c.json({ error: "rate_limited", retryAfter: limited.retryAfterSec }, 429);
  const ex = await findDrillExercise(c.req.param("exerciseId") ?? "");
  if (!ex) return c.json({ error: "not_found" }, 404);
  const body = (await c.req.json().catch(() => null)) as
    | { token?: unknown; move?: { from?: unknown; to?: unknown; promotion?: unknown } }
    | null;
  const move = body?.move;
  if (!move || typeof move.from !== "string" || typeof move.to !== "string") return c.json({ error: "invalid_move" }, 400);
  let prev: string[] = [];
  if (body?.token !== undefined && body.token !== null && body.token !== "") {
    const read = readDrillToken(body.token, ex, who);
    if (!read) return c.json({ error: "invalid_token" }, 400);
    prev = read;
  }
  const r = playDrillMove(ex, who, prev, {
    from: move.from,
    to: move.to,
    promotion: typeof move.promotion === "string" ? move.promotion : undefined,
  });
  if (!r.ok) return c.json({ error: r.error }, r.error === "drill_over" || r.error === "not_your_turn" ? 409 : 400);
  return c.json({ sans: r.sans, reply: r.reply, status: r.status, token: r.token });
});
