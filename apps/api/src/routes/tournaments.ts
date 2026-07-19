import { Hono } from "hono";
import { and, asc, desc, eq } from "drizzle-orm";
import {
  characters,
  chessGames,
  chessRatings,
  tournamentPairings,
  tournamentPlayers,
  tournaments,
} from "@eduforge/db";
import { Chess } from "chess.js";
import { z } from "zod";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { db } from "../db.js";
import { evaluateAchievements, logActivity } from "../engagement.js";
import { CHESS_TIME_CONTROLS } from "@eduforge/shared";

type Vars = { user: AuthedUser };

export const tournamentRoutes = new Hono<{ Variables: Vars }>();

function slugify(s: string) {
  return (
    s
      .toLowerCase()
      .replace(/[^a-z0-9а-яіїєґ]+/gi, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 40) || "tournament"
  );
}

tournamentRoutes.get("/", async (c) => {
  const rows = await db.query.tournaments.findMany({
    orderBy: [desc(tournaments.createdAt)],
    limit: 50,
  });
  return c.json({ tournaments: rows });
});

tournamentRoutes.get("/:id", async (c) => {
  const id = c.req.param("id") as string;
  const t =
    (await db.query.tournaments.findFirst({ where: eq(tournaments.id, id) })) ??
    (await db.query.tournaments.findFirst({ where: eq(tournaments.slug, id) }));
  if (!t) return c.json({ error: "not_found" }, 404);

  const players = await db
    .select({
      userId: tournamentPlayers.userId,
      score: tournamentPlayers.score,
      seed: tournamentPlayers.seed,
      displayName: characters.displayName,
      elo: chessRatings.elo,
    })
    .from(tournamentPlayers)
    .leftJoin(characters, eq(characters.userId, tournamentPlayers.userId))
    .leftJoin(chessRatings, eq(chessRatings.userId, tournamentPlayers.userId))
    .where(eq(tournamentPlayers.tournamentId, t.id))
    .orderBy(desc(tournamentPlayers.score));

  const pairings = await db.query.tournamentPairings.findMany({
    where: eq(tournamentPairings.tournamentId, t.id),
    orderBy: [asc(tournamentPairings.round)],
  });

  return c.json({ tournament: t, players, pairings });
});

const createSchema = z.object({
  titleUk: z.string().min(2).max(128),
  titleEn: z.string().max(128).optional(),
  descriptionUk: z.string().max(2000).optional(),
  timeControl: z.enum(["3+0", "5+0", "10+0"]).optional(),
  maxPlayers: z.number().int().min(2).max(64).optional(),
});

tournamentRoutes.post("/", authMiddleware, async (c) => {
  const user = c.get("user");
  const body = await c.req.json().catch(() => null);
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input" }, 400);

  const base = slugify(parsed.data.titleEn || parsed.data.titleUk);
  const slug = `${base}-${Date.now().toString(36)}`;

  const [t] = await db
    .insert(tournaments)
    .values({
      slug,
      titleUk: parsed.data.titleUk,
      titleEn: parsed.data.titleEn ?? parsed.data.titleUk,
      descriptionUk: parsed.data.descriptionUk ?? "",
      hostUserId: user.id,
      status: "registration",
      timeControl: parsed.data.timeControl ?? "5+0",
      maxPlayers: parsed.data.maxPlayers ?? 16,
    })
    .returning();

  // Host auto-joins
  await db.insert(tournamentPlayers).values({
    tournamentId: t.id,
    userId: user.id,
    seed: 1,
  });

  return c.json({ tournament: t }, 201);
});

tournamentRoutes.post("/:id/join", authMiddleware, async (c) => {
  const user = c.get("user");
  const id = c.req.param("id") as string;
  const t = await db.query.tournaments.findFirst({ where: eq(tournaments.id, id) });
  if (!t) return c.json({ error: "not_found" }, 404);
  if (t.status !== "registration") return c.json({ error: "not_open" }, 400);

  const existing = await db.query.tournamentPlayers.findFirst({
    where: and(
      eq(tournamentPlayers.tournamentId, t.id),
      eq(tournamentPlayers.userId, user.id),
    ),
  });
  if (existing) return c.json({ ok: true, already: true });

  const count = (
    await db.query.tournamentPlayers.findMany({
      where: eq(tournamentPlayers.tournamentId, t.id),
    })
  ).length;
  if (count >= t.maxPlayers) return c.json({ error: "full" }, 400);

  await db.insert(tournamentPlayers).values({
    tournamentId: t.id,
    userId: user.id,
    seed: count + 1,
  });
  await logActivity(db, user.id, "tournament_joined", { tournamentId: t.id });
  await evaluateAchievements(db, user.id, { joinedTournament: true });
  return c.json({ ok: true });
});

/** Host starts next round: pair players by score (simple Swiss-ish). */
tournamentRoutes.post("/:id/pair", authMiddleware, async (c) => {
  const user = c.get("user");
  const id = c.req.param("id") as string;
  const t = await db.query.tournaments.findFirst({ where: eq(tournaments.id, id) });
  if (!t) return c.json({ error: "not_found" }, 404);
  if (t.hostUserId !== user.id && user.role !== "admin") {
    return c.json({ error: "forbidden" }, 403);
  }
  if (t.status === "finished" || t.status === "cancelled") {
    return c.json({ error: "closed" }, 400);
  }

  const players = await db.query.tournamentPlayers.findMany({
    where: eq(tournamentPlayers.tournamentId, t.id),
    orderBy: [desc(tournamentPlayers.score), asc(tournamentPlayers.seed)],
  });
  if (players.length < 2) return c.json({ error: "need_players" }, 400);

  const round = t.currentRound + 1;
  const ids = players.map((p) => p.userId);
  const pairingsCreated: { whiteId: string; blackId: string | null; gameId: string | null }[] =
    [];

  const ms =
    CHESS_TIME_CONTROLS.find((x) => x.id === t.timeControl)?.initialMs ?? 300_000;

  for (let i = 0; i < ids.length; i += 2) {
    const whiteId = ids[i]!;
    const blackId = ids[i + 1] ?? null;
    let gameId: string | null = null;

    if (blackId) {
      const chess = new Chess();
      const [game] = await db
        .insert(chessGames)
        .values({
          whiteId,
          blackId,
          fen: chess.fen(),
          pgn: "",
          status: "active",
          timeControl: t.timeControl,
          rated: false,
          whiteTimeMs: ms,
          blackTimeMs: ms,
          lastMoveAt: new Date(),
        })
        .returning();
      gameId = game.id;
    } else {
      // Bye: +1 point
      await db
        .update(tournamentPlayers)
        .set({ score: (players.find((p) => p.userId === whiteId)?.score ?? 0) + 1 })
        .where(
          and(
            eq(tournamentPlayers.tournamentId, t.id),
            eq(tournamentPlayers.userId, whiteId),
          ),
        );
    }

    await db.insert(tournamentPairings).values({
      tournamentId: t.id,
      round,
      whiteId,
      blackId,
      gameId,
      result: blackId ? null : "1-0",
    });
    pairingsCreated.push({ whiteId, blackId, gameId });
  }

  await db
    .update(tournaments)
    .set({ currentRound: round, status: "active" })
    .where(eq(tournaments.id, t.id));

  return c.json({ round, pairings: pairingsCreated });
});

/** Report pairing result (host or player). */
tournamentRoutes.post("/:id/pairings/:pairingId/result", authMiddleware, async (c) => {
  const user = c.get("user");
  const pairingId = c.req.param("pairingId") as string;
  const body = await c.req.json().catch(() => ({}));
  const result = body.result as string;
  if (!["1-0", "0-1", "1/2-1/2"].includes(result)) {
    return c.json({ error: "invalid_result" }, 400);
  }

  const pairing = await db.query.tournamentPairings.findFirst({
    where: eq(tournamentPairings.id, pairingId),
  });
  if (!pairing) return c.json({ error: "not_found" }, 404);

  const t = await db.query.tournaments.findFirst({
    where: eq(tournaments.id, pairing.tournamentId),
  });
  if (!t) return c.json({ error: "not_found" }, 404);

  const isHost = t.hostUserId === user.id || user.role === "admin";
  const isPlayer =
    pairing.whiteId === user.id || pairing.blackId === user.id;
  if (!isHost && !isPlayer) return c.json({ error: "forbidden" }, 403);
  if (pairing.result) return c.json({ error: "already_set" }, 400);

  await db
    .update(tournamentPairings)
    .set({ result })
    .where(eq(tournamentPairings.id, pairing.id));

  const add = async (userId: string | null, points: number) => {
    if (!userId) return;
    const p = await db.query.tournamentPlayers.findFirst({
      where: and(
        eq(tournamentPlayers.tournamentId, t.id),
        eq(tournamentPlayers.userId, userId),
      ),
    });
    if (!p) return;
    await db
      .update(tournamentPlayers)
      .set({ score: p.score + points })
      .where(eq(tournamentPlayers.id, p.id));
  };

  if (result === "1-0") {
    await add(pairing.whiteId, 1);
  } else if (result === "0-1") {
    await add(pairing.blackId, 1);
  } else {
    await add(pairing.whiteId, 0.5);
    await add(pairing.blackId, 0.5);
  }

  return c.json({ ok: true, result });
});

tournamentRoutes.post("/:id/finish", authMiddleware, async (c) => {
  const user = c.get("user");
  const id = c.req.param("id") as string;
  const t = await db.query.tournaments.findFirst({ where: eq(tournaments.id, id) });
  if (!t) return c.json({ error: "not_found" }, 404);
  if (t.hostUserId !== user.id && user.role !== "admin") {
    return c.json({ error: "forbidden" }, 403);
  }
  await db
    .update(tournaments)
    .set({ status: "finished" })
    .where(eq(tournaments.id, t.id));
  return c.json({ ok: true });
});
