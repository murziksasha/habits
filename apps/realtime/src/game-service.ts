/**
 * Online game state transitions, extracted from the socket handlers so they can
 * be tested against a real database.
 *
 * Race safety: every transition is a conditional UPDATE (status = 'active', and
 * for moves the exact fen/pgn that was read). Only the caller whose UPDATE
 * changed a row applies Elo and XP, so two concurrent finishers (resign + flag,
 * a double move, the sweep and a claim) never award twice.
 */
import { and, eq, lt, sql } from "drizzle-orm";
import { applyFischerIncrement, applyMoveWithHistory } from "@eduforge/chess-core";
import { characters, chessGames, chessRatings, type Db } from "@eduforge/db";
import {
  CHESS_TIME_CONTROLS,
  applyElo,
  chessGameXpAward,
  clampElo,
  globalXpFromCourseGain,
  levelFromXp,
} from "@eduforge/shared";
import { clockState, pliesOf, timeoutOutcome } from "./clock.js";
import { drawOfferAfterMove } from "./draw-offer.js";

export type GameResult = "1-0" | "0-1" | "1/2-1/2";
export type GameRow = typeof chessGames.$inferSelect;

export type FinishedGame = {
  gameId: string;
  result: GameResult | null;
  reason: string;
  whiteDelta: number;
  blackDelta: number;
  aborted?: boolean;
};

/** Invites nobody joined are aborted after this long. */
export const WAITING_INVITE_TTL_MS = 24 * 60 * 60 * 1000;

export function timeControlMs(id: string) {
  return CHESS_TIME_CONTROLS.find((t) => t.id === id)?.initialMs ?? 300_000;
}

export function timeControlIncrementMs(id: string) {
  return CHESS_TIME_CONTROLS.find((t) => t.id === id)?.incrementMs ?? 0;
}

export function createGameService(db: Db) {
  /**
   * Finish an active game. Returns null when the game was not active any more
   * (or its fen changed since `expectFen` was read): someone else finished it.
   */
  async function finishGame(
    gameId: string,
    result: GameResult,
    reason: string,
    opts: { expectFen?: string } = {},
  ): Promise<FinishedGame | null> {
    return db.transaction(async (tx) => {
      const conds = [eq(chessGames.id, gameId), eq(chessGames.status, "active")];
      if (opts.expectFen) conds.push(eq(chessGames.fen, opts.expectFen));
      const [game] = await tx
        .update(chessGames)
        .set({
          status: "finished",
          result,
          termination: reason.slice(0, 24),
          drawOfferBy: null,
          whiteEloDelta: 0,
          blackEloDelta: 0,
          finishedAt: new Date(),
        })
        .where(and(...conds))
        .returning();
      if (!game) return null; // 0 rows: already finished elsewhere — award nothing

      let whiteDelta = 0;
      let blackDelta = 0;
      const lockRating = async (userId: string | null) =>
        userId
          ? ((
              await tx
                .select()
                .from(chessRatings)
                .where(eq(chessRatings.userId, userId))
                .for("update")
            )[0] ?? null)
          : null;
      const whiteRating = await lockRating(game.whiteId);
      const blackRating = await lockRating(game.blackId);

      if (game.rated && whiteRating && blackRating) {
        const d = applyElo(
          whiteRating.elo,
          blackRating.elo,
          result,
          whiteRating.gamesPlayed,
          blackRating.gamesPlayed,
        );
        whiteDelta = d.whiteDelta;
        blackDelta = d.blackDelta;
        const stats = (r: typeof whiteRating, outcome: "win" | "loss" | "draw") =>
          outcome === "win"
            ? { wins: r.wins + 1 }
            : outcome === "loss"
              ? { losses: r.losses + 1 }
              : { draws: r.draws + 1 };
        const wOut = result === "1-0" ? "win" : result === "0-1" ? "loss" : "draw";
        const bOut = result === "0-1" ? "win" : result === "1-0" ? "loss" : "draw";
        await tx
          .update(chessRatings)
          .set({
            elo: clampElo(whiteRating.elo + whiteDelta),
            gamesPlayed: whiteRating.gamesPlayed + 1,
            ...stats(whiteRating, wOut),
          })
          .where(eq(chessRatings.id, whiteRating.id));
        await tx
          .update(chessRatings)
          .set({
            elo: clampElo(blackRating.elo + blackDelta),
            gamesPlayed: blackRating.gamesPlayed + 1,
            ...stats(blackRating, bOut),
          })
          .where(eq(chessRatings.id, blackRating.id));
        await tx
          .update(chessGames)
          .set({ whiteEloDelta: whiteDelta, blackEloDelta: blackDelta })
          .where(eq(chessGames.id, game.id));
      }

      const award = async (userId: string | null, outcome: "win" | "loss" | "draw") => {
        if (!userId) return;
        const [ch] = await tx
          .select()
          .from(characters)
          .where(eq(characters.userId, userId))
          .for("update");
        if (!ch) return;
        const newXp = ch.globalXp + globalXpFromCourseGain(chessGameXpAward(outcome, game.rated), 1.1);
        await tx
          .update(characters)
          .set({ globalXp: newXp, globalLevel: levelFromXp(newXp) })
          .where(eq(characters.id, ch.id));
      };
      if (result === "1-0") {
        await award(game.whiteId, "win");
        await award(game.blackId, "loss");
      } else if (result === "0-1") {
        await award(game.whiteId, "loss");
        await award(game.blackId, "win");
      } else {
        await award(game.whiteId, "draw");
        await award(game.blackId, "draw");
      }
      return { gameId, result, reason, whiteDelta, blackDelta };
    });
  }

  /** Abort without rating or XP (no moves made / invite never joined). */
  async function abortGame(
    gameId: string,
    reason: string,
    from: "active" | "waiting" = "active",
    opts: { expectFen?: string } = {},
  ): Promise<FinishedGame | null> {
    const conds = [eq(chessGames.id, gameId), eq(chessGames.status, from)];
    if (opts.expectFen) conds.push(eq(chessGames.fen, opts.expectFen));
    const rows = await db
      .update(chessGames)
      .set({ status: "aborted", termination: reason.slice(0, 24), drawOfferBy: null, finishedAt: new Date() })
      .where(and(...conds))
      .returning({ id: chessGames.id });
    if (rows.length !== 1) return null;
    return { gameId, result: null, reason, whiteDelta: 0, blackDelta: 0, aborted: true };
  }

  /** Settle a game whose side to move has run out of time (caller checked). */
  async function settleTimeout(game: GameRow, flagged: "w" | "b") {
    const outcome = timeoutOutcome(flagged, pliesOf(game.pgn));
    return outcome.kind === "abort"
      ? abortGame(game.id, "abandoned", "active", { expectFen: game.fen })
      : finishGame(game.id, outcome.result, "timeout", { expectFen: game.fen });
  }

  async function loadGame(gameId: string) {
    return (await db.query.chessGames.findFirst({ where: eq(chessGames.id, gameId) })) ?? null;
  }

  type MoveInput = { gameId: string; userId: string; from: string; to: string; promotion?: "q" | "r" | "b" | "n" };
  type MoveOutcome =
    | { kind: "error"; error: string }
    | { kind: "timeout"; finished: FinishedGame | null }
    | {
        kind: "moved";
        move: {
          from: string;
          to: string;
          promotion?: string;
          san: string;
          fen: string;
          whiteTimeMs: number;
          blackTimeMs: number;
        };
        drawOfferExpired: boolean;
        finished: FinishedGame | null;
      };

  async function applyMove(input: MoveInput, nowMs = Date.now()): Promise<MoveOutcome> {
    const game = await loadGame(input.gameId);
    if (!game || game.status !== "active") return { kind: "error", error: "not_active" };
    const turn = game.fen.split(" ")[1];
    const isWhite = game.whiteId === input.userId;
    const isBlack = game.blackId === input.userId;
    if ((turn === "w" && !isWhite) || (turn === "b" && !isBlack)) return { kind: "error", error: "not_your_turn" };

    const clock = clockState(game, nowMs);
    if (clock.flagged) return { kind: "timeout", finished: await settleTimeout(game, clock.flagged) };

    const history = (game.pgn ?? "").split(" ").filter(Boolean);
    const applied = applyMoveWithHistory(game.startFen, history, {
      from: input.from,
      to: input.to,
      promotion: input.promotion,
    });
    if (!applied.ok) return { kind: "error", error: applied.error };

    const inc = timeControlIncrementMs(game.timeControl);
    let { whiteTimeMs, blackTimeMs } = clock;
    if (clock.turn === "w") whiteTimeMs = applyFischerIncrement(whiteTimeMs, inc);
    else blackTimeMs = applyFischerIncrement(blackTimeMs, inc);

    const pgn = game.pgn ? `${game.pgn} ${applied.move.san}` : applied.move.san;
    const prevMoves = Array.isArray(game.moves) ? game.moves : [];
    const drawOfferBy = drawOfferAfterMove(game.drawOfferBy, input.userId);
    // Conditional on the exact position we validated against: a concurrent move
    // (double click, second tab) or a finish in between makes this a no-op.
    const updated = await db
      .update(chessGames)
      .set({
        fen: applied.move.fen,
        pgn,
        moves: [...prevMoves, { ...applied.move, clockMs: clock.turn === "w" ? whiteTimeMs : blackTimeMs }],
        drawOfferBy,
        whiteTimeMs,
        blackTimeMs,
        lastMoveAt: new Date(nowMs),
      })
      .where(
        and(
          eq(chessGames.id, game.id),
          eq(chessGames.status, "active"),
          eq(chessGames.fen, game.fen),
          eq(chessGames.pgn, game.pgn),
        ),
      )
      .returning({ id: chessGames.id });
    if (updated.length !== 1) return { kind: "error", error: "stale_position" };

    const finished =
      applied.over && applied.result
        ? await finishGame(game.id, applied.result, applied.reason ?? "checkmate_or_draw", {
            expectFen: applied.move.fen,
          })
        : null;
    return {
      kind: "moved",
      move: {
        from: input.from,
        to: input.to,
        promotion: input.promotion,
        san: applied.move.san,
        fen: applied.move.fen,
        whiteTimeMs,
        blackTimeMs,
      },
      drawOfferExpired: Boolean(game.drawOfferBy && !drawOfferBy),
      finished,
    };
  }

  /** A participant claims that the side to move has run out of time. */
  async function claimTimeout(
    gameId: string,
    userId: string,
    nowMs = Date.now(),
  ): Promise<{ ok: true; finished: FinishedGame } | { ok: false; error: string; remainingMs?: number }> {
    const game = await loadGame(gameId);
    if (!game) return { ok: false, error: "not_found" };
    if (game.whiteId !== userId && game.blackId !== userId) return { ok: false, error: "forbidden" };
    if (game.status !== "active") return { ok: false, error: "not_active" };
    const clock = clockState(game, nowMs);
    if (!clock.flagged) {
      const remainingMs = clock.turn === "w" ? clock.whiteTimeMs : clock.blackTimeMs;
      return { ok: false, error: "not_timed_out", remainingMs };
    }
    const finished = await settleTimeout(game, clock.flagged);
    return finished ? { ok: true, finished } : { ok: false, error: "not_active" };
  }

  /**
   * Server sweep: finish every active online game whose side to move is out of
   * time (players who closed the tab never send another event), and abort stale
   * invites. Safe to run on several instances at once.
   */
  async function sweepStaleGames(nowMs = Date.now(), limit = 200): Promise<FinishedGame[]> {
    const now = new Date(nowMs);
    const due = await db
      .select()
      .from(chessGames)
      .where(
        and(
          eq(chessGames.status, "active"),
          eq(chessGames.kind, "online"),
          sql`${chessGames.lastMoveAt} + (case when split_part(${chessGames.fen}, ' ', 2) = 'b'
                then ${chessGames.blackTimeMs} else ${chessGames.whiteTimeMs} end) * interval '1 millisecond'
              <= ${now.toISOString()}::timestamptz`,
        ),
      )
      .limit(limit);
    const out: FinishedGame[] = [];
    for (const game of due) {
      const clock = clockState(game, nowMs);
      if (!clock.flagged) continue;
      const finished = await settleTimeout(game, clock.flagged);
      if (finished) out.push(finished);
    }
    const stale = await db
      .select({ id: chessGames.id })
      .from(chessGames)
      .where(and(eq(chessGames.status, "waiting"), lt(chessGames.createdAt, new Date(nowMs - WAITING_INVITE_TTL_MS))))
      .limit(limit);
    for (const g of stale) {
      const aborted = await abortGame(g.id, "invite_expired", "waiting");
      if (aborted) out.push(aborted);
    }
    return out;
  }

  return { finishGame, abortGame, applyMove, claimTimeout, sweepStaleGames, loadGame };
}

export type GameService = ReturnType<typeof createGameService>;
