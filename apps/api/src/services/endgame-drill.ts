import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { sql } from "drizzle-orm";
import { chooseBotMove, checkEndgameGoal, replayHistory, type EndgameCheck, type EndgameGoal } from "@eduforge/chess-core";
import { lessons } from "@eduforge/db";
import { db } from "../db.js";
import { env } from "../env.js";

/**
 * Server-owned endgame drills.
 *
 * The learner only sends its own move; the API plays the defender and returns a signed
 * token with the whole game so far. Grading trusts only that token, so a client can no
 * longer pick weak defender replies for itself.
 */

export type DrillExercise = {
  id: string;
  type: string;
  fen?: unknown;
  goal?: unknown;
  maxMoves?: unknown;
  botLevel?: unknown;
  [k: string]: unknown;
};

type TokenPayload = { v: 1; e: string; f: string; u: string; s: string[]; t: number };

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000;
const MAX_PLIES = 400;

function key(): Buffer {
  return createHash("sha256").update(`endgame-drill:${env.authSecret}`).digest();
}

function fenTag(fen: string): string {
  return createHash("sha256").update(fen).digest("base64url").slice(0, 12);
}

function sign(body: string): string {
  return createHmac("sha256", key()).update(body).digest("base64url");
}

export function issueDrillToken(ex: DrillExercise, userId: string, sans: string[], now = Date.now()): string {
  const payload: TokenPayload = { v: 1, e: ex.id, f: fenTag(String(ex.fen)), u: userId, s: sans, t: now };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${sign(body)}`;
}

/** Returns the server-recorded SAN list, or null when the token is missing, forged, stale or for another drill/user. */
export function readDrillToken(
  token: unknown,
  ex: DrillExercise,
  userId?: string | null,
  now = Date.now(),
): string[] | null {
  if (typeof token !== "string" || token.length > 8000) return null;
  const dot = token.indexOf(".");
  if (dot <= 0) return null;
  const body = token.slice(0, dot);
  const mac = Buffer.from(token.slice(dot + 1));
  const expected = Buffer.from(sign(body));
  if (mac.length !== expected.length || !timingSafeEqual(mac, expected)) return null;
  let p: TokenPayload;
  try {
    p = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as TokenPayload;
  } catch {
    return null;
  }
  if (p?.v !== 1 || p.e !== ex.id || p.f !== fenTag(String(ex.fen))) return null;
  if (userId && p.u !== userId) return null;
  if (typeof p.t !== "number" || now - p.t > TOKEN_TTL_MS || p.t - now > 60_000) return null;
  if (!Array.isArray(p.s) || p.s.length > MAX_PLIES || !p.s.every((x) => typeof x === "string")) return null;
  return p.s;
}

function drillParams(ex: DrillExercise) {
  return {
    fen: String(ex.fen),
    goal: (["win", "draw", "promote"].includes(String(ex.goal)) ? ex.goal : "win") as EndgameGoal,
    maxMoves: typeof ex.maxMoves === "number" ? ex.maxMoves : 50,
    level: ex.botLevel === "club" ? ("club" as const) : ("strong" as const),
  };
}

export type DrillMoveResult =
  | { ok: true; sans: string[]; reply: { san: string; from: string; to: string } | null; status: EndgameCheck; token: string }
  | { ok: false; error: "illegal_move" | "not_your_turn" | "drill_over" | "invalid_token" };

/**
 * Apply the learner's move to the server-recorded game and answer with the defender.
 * `prevSans` must come from a verified token (or be empty for a fresh drill).
 */
export function playDrillMove(
  ex: DrillExercise,
  userId: string,
  prevSans: string[],
  move: { from: string; to: string; promotion?: string },
  opts: { timeMs?: number } = {},
): DrillMoveResult {
  const { fen, goal, maxMoves, level } = drillParams(ex);
  const game = replayHistory(fen, prevSans);
  if (!game) return { ok: false, error: "invalid_token" };
  const learner = replayHistory(fen, [])!.turn();
  if (checkEndgameGoal(fen, prevSans, goal, maxMoves).status !== "in_progress") return { ok: false, error: "drill_over" };
  if (game.turn() !== learner) return { ok: false, error: "not_your_turn" };
  let san: string;
  try {
    const promo = move.promotion && /^[qrbn]$/.test(move.promotion) ? move.promotion : undefined;
    san = game.move({ from: move.from, to: move.to, promotion: promo }).san;
  } catch {
    return { ok: false, error: "illegal_move" };
  }
  const sans = [...prevSans, san];
  let status = checkEndgameGoal(fen, sans, goal, maxMoves);
  let reply: { san: string; from: string; to: string } | null = null;
  if (status.status === "in_progress") {
    const bm = chooseBotMove(game.fen(), level, { history: sans, startFen: fen, timeMs: opts.timeMs ?? 300 });
    if (bm) {
      const r = game.move({ from: bm.from, to: bm.to, promotion: bm.promotion });
      reply = { san: r.san, from: r.from, to: r.to };
      sans.push(r.san);
      status = checkEndgameGoal(fen, sans, goal, maxMoves);
    }
  }
  return { ok: true, sans, reply, status, token: issueDrillToken(ex, userId, sans) };
}

/** Replace a client drill answer with the server-recorded game before grading. */
export function resolveDrillAnswer(ex: DrillExercise, answer: unknown, userId?: string | null): unknown {
  const a = answer as { token?: unknown; hintsUsed?: unknown } | null;
  const sans = readDrillToken(a?.token, ex, userId);
  return { sans: sans ?? [], hintsUsed: a?.hintsUsed, verified: sans !== null };
}

const cache = new Map<string, { ex: DrillExercise | null; at: number }>();
const CACHE_MS = 10 * 60 * 1000;

/** Find a published endgame drill by exercise id (lesson content is static, so a short cache is safe). */
export async function findDrillExercise(exerciseId: string): Promise<DrillExercise | null> {
  const hit = cache.get(exerciseId);
  if (hit && Date.now() - hit.at < CACHE_MS) return hit.ex;
  const rows = await db
    .select({ exercises: lessons.exercises })
    .from(lessons)
    .where(sql`${lessons.exercises} @> ${JSON.stringify([{ id: exerciseId, type: "chess_endgame_drill" }])}::jsonb`)
    .limit(1);
  const list = (rows[0]?.exercises ?? []) as DrillExercise[];
  const ex = list.find((e) => e?.id === exerciseId && e.type === "chess_endgame_drill" && typeof e.fen === "string") ?? null;
  if (cache.size > 2000) cache.clear();
  cache.set(exerciseId, { ex, at: Date.now() });
  return ex;
}
