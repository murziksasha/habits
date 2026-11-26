/**
 * Chess puzzle trainer (plan §3): Glicko-2 learner rating, adaptive picking,
 * placement and the daily puzzle-rating batch. Pure helpers are exported for tests.
 */
import { and, desc, eq, gte, isNull, lte } from "drizzle-orm";
import { chessPuzzleAttempts, chessPuzzleRatingsUser, chessPuzzleStats, courses, lessons, units } from "@eduforge/db";
import {
  glicko2Update,
  puzzleAttemptScore,
  puzzleRatingFromDifficulty,
  visibleChessThemes,
  type Glicko2Rating,
} from "@eduforge/shared";
import { db } from "../db.js";

export type PuzzleMode = "mix" | "theme" | "mate" | "endgame" | "placement";
export const PUZZLE_MODES: readonly PuzzleMode[] = ["mix", "theme", "mate", "endgame", "placement"];

export type PoolPuzzle = {
  exerciseId: string;
  lessonId: string;
  unitSlug: string;
  rating: number;
  rd: number;
  themes: string[];
  /** Learner-facing themes (meta tags removed): accuracy, siblings, filters. */
  skillThemes: string[];
  goal?: string;
  exercise: Record<string, unknown>;
};

const ENDGAME_UNIT = /endgame|eg-|ending/i;
const MATE_THEMES = /^mate/;
export const NO_REPEAT_DAYS = 14;
export const PLACEMENT_LENGTH = 8;
export const TARGET_OFFSET = -100;

export function matchesMode(p: PoolPuzzle, mode: PuzzleMode, theme?: string | null): boolean {
  if (mode === "theme") return theme ? p.themes.includes(theme) : true;
  if (mode === "mate") return p.goal === "mate" || p.themes.some((t) => MATE_THEMES.test(t));
  if (mode === "endgame") return p.themes.includes("endgame") || ENDGAME_UNIT.test(p.unitSlug);
  return true;
}

/**
 * Next puzzle: rating window [R − 150, R + 200] (widened stepwise when empty),
 * prefer the learner's weakest themes, skip puzzles seen in the last 14 days.
 */
export function pickNextPuzzle(input: {
  rating: number;
  pool: readonly PoolPuzzle[];
  recent: ReadonlySet<string>;
  themeAccuracy: ReadonlyMap<string, number>;
  mode: PuzzleMode;
  theme?: string | null;
  rnd?: () => number;
}): PoolPuzzle | null {
  const rnd = input.rnd ?? Math.random;
  const candidates = input.pool.filter((p) => matchesMode(p, input.mode, input.theme) && !input.recent.has(p.exerciseId));
  const fallback = candidates.length ? candidates : input.pool.filter((p) => matchesMode(p, input.mode, input.theme));
  if (!fallback.length) return null;
  const R = input.rating;
  let window: PoolPuzzle[] = [];
  for (const widen of [0, 100, 250, 500]) {
    window = fallback.filter((p) => p.rating >= R - 150 - widen && p.rating <= R + 200 + widen);
    if (window.length) break;
  }
  if (!window.length) {
    window = [...fallback].sort((a, b) => Math.abs(a.rating - R) - Math.abs(b.rating - R)).slice(0, 5);
  }
  if (input.mode === "placement") {
    // Placement wants the puzzle closest to the current estimate.
    return [...window].sort((a, b) => Math.abs(a.rating - R) - Math.abs(b.rating - R))[0]!;
  }
  // Sample toward R − 100 inside the window so first-try accuracy lands in ~55–75%
  // (an unbiased [R−150, R+200] window averages ≈ 47%).
  const target = R + TARGET_OFFSET;
  const weight = (p: PoolPuzzle) => {
    const accs = p.skillThemes.map((t) => input.themeAccuracy.get(t)).filter((x): x is number => x !== undefined);
    const weakest = accs.length ? Math.min(...accs) : 0.6;
    const closeness = Math.exp(-(((p.rating - target) / 60) ** 2));
    return (0.25 + (1 - weakest)) * (0.01 + closeness);
  };
  const total = window.reduce((s, p) => s + weight(p), 0);
  let r = rnd() * total;
  for (const p of window) {
    r -= weight(p);
    if (r <= 0) return p;
  }
  return window.at(-1)!;
}

/** Learner rating update for one attempt (puzzle = opponent). */
export function applyAttempt(
  learner: Glicko2Rating,
  puzzle: { rating: number; rd: number },
  attempt: { solved: boolean; firstTry: boolean; hintsUsed: number; revealed: boolean },
): { score: number; next: Glicko2Rating } {
  const score = puzzleAttemptScore(attempt);
  return { score, next: glicko2Update(learner, [{ rating: puzzle.rating, rd: puzzle.rd, score }]) };
}

/** Puzzle-side batch update from learners' first attempts (puzzle wins when the learner fails). */
export function batchPuzzleUpdate(
  puzzle: Glicko2Rating,
  attempts: readonly { learnerRating: number; learnerRd: number; result: number }[],
): Glicko2Rating {
  if (!attempts.length) return puzzle;
  const next = glicko2Update(
    puzzle,
    attempts.map((a) => ({ rating: a.learnerRating, rd: a.learnerRd, score: 1 - a.result })),
  );
  return { ...next, rd: Math.max(50, next.rd) };
}

/** Recommended course part after placement. */
export function placementPartId(rating: number): string {
  if (rating < 900) return "ch-part-early";
  if (rating < 1100) return "ch-part-structures";
  if (rating < 1300) return "ch-part-tactics";
  if (rating < 1500) return "ch-part-middlegame";
  return "ch-part-endgames";
}

/** Per-theme first-try accuracy from attempt rows. */
export function themeAccuracyFrom(rows: readonly { themes: string[]; result: number }[]): Map<string, number> {
  const agg = new Map<string, { n: number; s: number }>();
  for (const r of rows) {
    for (const t of r.themes) {
      const a = agg.get(t) ?? { n: 0, s: 0 };
      a.n += 1;
      a.s += r.result;
      agg.set(t, a);
    }
  }
  return new Map([...agg].map(([t, a]) => [t, a.s / a.n]));
}

/* ——— DB-backed parts ——— */

let poolCache: { at: number; pool: PoolPuzzle[] } | null = null;
const POOL_TTL_MS = 10 * 60_000;

export function clearPuzzlePoolCache() {
  poolCache = null;
}

export async function loadPuzzlePool(): Promise<PoolPuzzle[]> {
  if (poolCache && Date.now() - poolCache.at < POOL_TTL_MS) return poolCache.pool;
  const rows = await db
    .select({ id: lessons.id, exercises: lessons.exercises, unitSlug: units.slug, isExam: lessons.isExam })
    .from(lessons)
    .innerJoin(courses, eq(courses.id, lessons.courseId))
    .innerJoin(units, eq(units.id, lessons.unitId))
    .where(eq(courses.slug, "chess"));
  const stats = await db.select().from(chessPuzzleStats);
  const byId = new Map(stats.map((s) => [s.exerciseId, s]));
  const pool: PoolPuzzle[] = [];
  for (const l of rows) {
    if (l.isExam) continue;
    for (const ex of (l.exercises as Record<string, unknown>[]) ?? []) {
      if (ex.type !== "chess_puzzle" || typeof ex.id !== "string") continue;
      const st = byId.get(ex.id);
      pool.push({
        exerciseId: ex.id,
        lessonId: l.id,
        unitSlug: l.unitSlug,
        rating: st?.rating ?? (typeof ex.rating === "number" ? ex.rating : puzzleRatingFromDifficulty(Number(ex.difficulty ?? 1))),
        rd: st?.rd ?? 150,
        themes: Array.isArray(ex.themes) ? (ex.themes as string[]) : [],
        skillThemes: visibleChessThemes(ex.themes as string[] | undefined, 20),
        goal: typeof ex.goal === "string" ? ex.goal : undefined,
        exercise: ex,
      });
    }
  }
  poolCache = { at: Date.now(), pool };
  return pool;
}

export async function getOrCreateLearnerRating(userId: string) {
  const row = await db.query.chessPuzzleRatingsUser.findFirst({ where: eq(chessPuzzleRatingsUser.userId, userId) });
  if (row) return row;
  const [created] = await db.insert(chessPuzzleRatingsUser).values({ userId }).onConflictDoNothing().returning();
  return created ?? (await db.query.chessPuzzleRatingsUser.findFirst({ where: eq(chessPuzzleRatingsUser.userId, userId) }))!;
}

export async function learnerThemeAccuracy(userId: string): Promise<Map<string, number>> {
  const rows = await db
    .select({ themes: chessPuzzleAttempts.themes, result: chessPuzzleAttempts.result })
    .from(chessPuzzleAttempts)
    .where(eq(chessPuzzleAttempts.userId, userId))
    .orderBy(desc(chessPuzzleAttempts.createdAt))
    .limit(500);
  return themeAccuracyFrom(rows);
}

export async function recentPuzzleIds(userId: string, now = new Date()): Promise<Set<string>> {
  const since = new Date(now.getTime() - NO_REPEAT_DAYS * 86_400_000);
  const rows = await db
    .select({ exerciseId: chessPuzzleAttempts.exerciseId })
    .from(chessPuzzleAttempts)
    .where(and(eq(chessPuzzleAttempts.userId, userId), gte(chessPuzzleAttempts.createdAt, since)));
  return new Set(rows.map((r) => r.exerciseId));
}

/** Daily batch: rate puzzles from not-yet-batched first attempts. */
export async function runPuzzleRatingBatch(now = new Date()): Promise<{ puzzles: number; attempts: number }> {
  const rows = await db
    .select()
    .from(chessPuzzleAttempts)
    .where(
      and(
        isNull(chessPuzzleAttempts.batchedAt),
        eq(chessPuzzleAttempts.firstAttempt, true),
        lte(chessPuzzleAttempts.createdAt, now),
      ),
    );
  const byPuzzle = new Map<string, typeof rows>();
  for (const r of rows) {
    const list = byPuzzle.get(r.exerciseId) ?? [];
    list.push(r);
    byPuzzle.set(r.exerciseId, list);
  }
  for (const [exerciseId, list] of byPuzzle) {
    const st = await db.query.chessPuzzleStats.findFirst({ where: eq(chessPuzzleStats.exerciseId, exerciseId) });
    if (!st) continue;
    const next = batchPuzzleUpdate(
      { rating: st.rating, rd: st.rd, volatility: st.volatility },
      list.map((a) => ({ learnerRating: a.ratingBefore ?? 1200, learnerRd: 150, result: a.result })),
    );
    await db
      .update(chessPuzzleStats)
      .set({
        rating: next.rating,
        rd: next.rd,
        volatility: next.volatility,
        attempts: st.attempts + list.length,
        firstTrySolves: st.firstTrySolves + list.filter((a) => a.result >= 1).length,
        ratedAt: now,
      })
      .where(eq(chessPuzzleStats.exerciseId, exerciseId));
  }
  // Mark every unbatched row (repeat attempts are ignored for puzzle ratings).
  await db
    .update(chessPuzzleAttempts)
    .set({ batchedAt: now })
    .where(and(isNull(chessPuzzleAttempts.batchedAt), lte(chessPuzzleAttempts.createdAt, now)));
  if (byPuzzle.size) clearPuzzlePoolCache();
  return { puzzles: byPuzzle.size, attempts: rows.length };
}

