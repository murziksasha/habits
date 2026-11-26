/**
 * Race tests for online games against a real (migrated) Postgres.
 * Run: DATABASE_URL=... pnpm --filter @eduforge/realtime test:integration
 */
import { randomUUID } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { eq, inArray } from "drizzle-orm";
import { characters, chessGames, chessRatings, createDb, users } from "@eduforge/db";
import { createGameService } from "./game-service.js";

const db = createDb(process.env.DATABASE_URL);
const svc = createGameService(db);
const START = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const createdUsers: string[] = [];

async function player(elo = 1200) {
  const [u] = await db
    .insert(users)
    .values({ email: `rt-${randomUUID()}@test.local`, passwordHash: null })
    .returning();
  createdUsers.push(u.id);
  await db.insert(characters).values({ userId: u.id, displayName: "rt" });
  await db.insert(chessRatings).values({ userId: u.id, elo });
  return u.id;
}

async function game(white: string, black: string, over: Partial<typeof chessGames.$inferInsert> = {}) {
  const [g] = await db
    .insert(chessGames)
    .values({
      whiteId: white,
      blackId: black,
      fen: START,
      pgn: "",
      status: "active",
      timeControl: "5+0",
      rated: true,
      whiteTimeMs: 300_000,
      blackTimeMs: 300_000,
      lastMoveAt: new Date(),
      ...over,
    })
    .returning();
  return g;
}

const rating = async (id: string) =>
  (await db.query.chessRatings.findFirst({ where: eq(chessRatings.userId, id) }))!;
const xp = async (id: string) =>
  (await db.query.characters.findFirst({ where: eq(characters.userId, id) }))!.globalXp;

beforeAll(async () => {
  await db.select().from(chessGames).limit(1); // fail fast without a migrated DB
});

afterAll(async () => {
  if (createdUsers.length) {
    await db.delete(chessGames).where(inArray(chessGames.whiteId, createdUsers));
    await db.delete(users).where(inArray(users.id, createdUsers));
  }
});

describe("online game races", () => {
  it("concurrent finishers: Elo and XP are applied exactly once", async () => {
    const w = await player();
    const b = await player();
    const g = await game(w, b, { pgn: "e4 e5", fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2" });
    const xpW0 = await xp(w);
    const outs = await Promise.all([
      svc.finishGame(g.id, "0-1", "resign"),
      svc.finishGame(g.id, "1-0", "timeout"),
      svc.finishGame(g.id, "1/2-1/2", "agreement"),
    ]);
    const winners = outs.filter(Boolean);
    expect(winners).toHaveLength(1);
    const rw = await rating(w);
    const rb = await rating(b);
    expect(rw.gamesPlayed).toBe(1);
    expect(rb.gamesPlayed).toBe(1);
    expect(rw.wins + rw.losses + rw.draws).toBe(1);
    expect(await xp(w)).toBeGreaterThan(xpW0);
    const row = await svc.loadGame(g.id);
    expect(row?.status).toBe("finished");
    expect(row?.result).toBe(winners[0]!.result);
    expect(row?.whiteEloDelta).toBe(winners[0]!.whiteDelta);
    // A late finisher is a no-op.
    expect(await svc.finishGame(g.id, "1-0", "resign")).toBeNull();
    expect((await rating(w)).gamesPlayed).toBe(1);
  });

  it("double move: only one of two concurrent identical moves is applied", async () => {
    const w = await player();
    const b = await player();
    const g = await game(w, b);
    const outs = await Promise.all([
      svc.applyMove({ gameId: g.id, userId: w, from: "e2", to: "e4" }),
      svc.applyMove({ gameId: g.id, userId: w, from: "d2", to: "d4" }),
    ]);
    const moved = outs.filter((o) => o.kind === "moved");
    expect(moved).toHaveLength(1);
    expect(outs.find((o) => o.kind === "error")).toMatchObject({ kind: "error" });
    const row = await svc.loadGame(g.id);
    expect(row?.pgn.split(" ")).toHaveLength(1);
    expect(row?.moves).toHaveLength(1);
  });

  it("a move after the game ended is rejected", async () => {
    const w = await player();
    const b = await player();
    const g = await game(w, b);
    await svc.finishGame(g.id, "0-1", "resign");
    expect(await svc.applyMove({ gameId: g.id, userId: w, from: "e2", to: "e4" })).toEqual({
      kind: "error",
      error: "not_active",
    });
  });

  it("claim_timeout: rejected while time remains, then ends the game for the claimer", async () => {
    const w = await player();
    const b = await player();
    const lastMoveAt = new Date(Date.now() - 10_000);
    const g = await game(w, b, {
      pgn: "e4 e5",
      fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
      whiteTimeMs: 20_000,
      lastMoveAt,
    });
    const early = await svc.claimTimeout(g.id, b);
    expect(early).toMatchObject({ ok: false, error: "not_timed_out" });
    expect((early as { remainingMs: number }).remainingMs).toBeGreaterThan(5_000);
    expect(await svc.claimTimeout(g.id, randomUUID())).toMatchObject({ ok: false, error: "forbidden" });
    const late = await svc.claimTimeout(g.id, b, Date.now() + 15_000);
    expect(late).toMatchObject({ ok: true, finished: { result: "0-1", reason: "timeout" } });
    expect((await rating(b)).wins).toBe(1);
    // A second claim does nothing.
    expect(await svc.claimTimeout(g.id, b, Date.now() + 15_000)).toMatchObject({ ok: false, error: "not_active" });
    expect((await rating(b)).wins).toBe(1);
  });

  it("sweep ends flagged games, aborts games abandoned before both moved, expires invites", async () => {
    const w = await player();
    const b = await player();
    const old = new Date(Date.now() - 60 * 60 * 1000);
    const flagged = await game(w, b, {
      pgn: "e4 e5",
      fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
      lastMoveAt: old,
    });
    const abandoned = await game(w, b, { lastMoveAt: old });
    const fresh = await game(w, b);
    const [invite] = await db
      .insert(chessGames)
      .values({
        whiteId: w,
        fen: START,
        status: "waiting",
        timeControl: "5+0",
        rated: false,
        whiteTimeMs: 300_000,
        blackTimeMs: 300_000,
        createdAt: new Date(Date.now() - 25 * 60 * 60 * 1000),
      })
      .returning();
    const swept = await svc.sweepStaleGames();
    const ids = swept.map((s) => s.gameId);
    expect(ids).toEqual(expect.arrayContaining([flagged.id, abandoned.id, invite.id]));
    expect(ids).not.toContain(fresh.id);
    expect((await svc.loadGame(flagged.id))?.result).toBe("0-1");
    expect((await svc.loadGame(abandoned.id))?.status).toBe("aborted");
    expect((await svc.loadGame(invite.id))?.status).toBe("aborted");
    expect((await svc.loadGame(fresh.id))?.status).toBe("active");
    // Only the flagged game was rated.
    expect((await rating(w)).gamesPlayed).toBe(1);
    // Running it again changes nothing.
    expect((await svc.sweepStaleGames()).map((s) => s.gameId)).not.toEqual(
      expect.arrayContaining([flagged.id]),
    );
    expect((await rating(w)).gamesPlayed).toBe(1);
  });
});
