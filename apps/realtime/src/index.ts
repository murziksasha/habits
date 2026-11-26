// Must stay the first import: loads the root .env before any process.env read below.
import "./load-env.js";
import { createServer } from "node:http";
import { createHash } from "node:crypto";
import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { and, eq, gt } from "drizzle-orm";
import { canAnswerDraw, canOfferDraw } from "./draw-offer.js";
import { allowSocketEvent } from "./event-rate-limit.js";
import {
  characters,
  chessGames,
  chessRatings,
  createDb,
  sessions,
  users,
} from "@eduforge/db";
import { chessMoveSchema, seekGameSchema } from "@eduforge/shared";
import { Chess } from "chess.js";
import { assignColors, type SeekEntry } from "./matchmaking.js";
import { createRedisClient, SeekQueueStore } from "./redis-seek-queue.js";
import { createGameService, timeControlMs } from "./game-service.js";
import { captureException, initSentry } from "./sentry.js";

const PORT = Number(process.env.REALTIME_PORT ?? 4001);
const WEB_ORIGIN = process.env.WEB_ORIGIN ?? "http://localhost:3000";
const DATABASE_URL =
  process.env.DATABASE_URL ??
  "postgresql://eduforge:eduforge@localhost:5432/eduforge";
const REDIS_URL = process.env.REDIS_URL;

await initSentry();
process.on("unhandledRejection", (reason) => {
  console.error("[realtime] unhandled rejection:", reason instanceof Error ? reason.message : reason);
  captureException(reason);
});

const db = createDb(DATABASE_URL);
const redis = createRedisClient(REDIS_URL);
const seekStore = new SeekQueueStore(redis);

const app = express();
app.use(cors({ origin: WEB_ORIGIN, credentials: true }));
app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "realtime",
    locale: "uk",
    matchmaking: seekStore.backend,
  });
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: WEB_ORIGIN, credentials: true },
});

// Multi-instance Socket.IO rooms when Redis is available
async function setupSocketAdapter() {
  if (!REDIS_URL) return;
  try {
    const { createAdapter } = await import("@socket.io/redis-adapter");
    const { createClient } = await import("redis");
    const pubClient = createClient({ url: REDIS_URL });
    const subClient = pubClient.duplicate();
    await Promise.all([pubClient.connect(), subClient.connect()]);
    io.adapter(createAdapter(pubClient, subClient));
    console.log("[realtime] socket.io redis adapter enabled");
  } catch (e) {
    console.warn(
      "[realtime] redis adapter unavailable (install @socket.io/redis-adapter + redis):",
      e instanceof Error ? e.message : e,
    );
  }
}

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

async function authFromToken(token: string | undefined) {
  if (!token) return null;
  const row = await db.query.sessions.findFirst({
    where: and(
      eq(sessions.tokenHash, hashToken(token)),
      gt(sessions.expiresAt, new Date()),
    ),
  });
  if (!row) return null;
  const user = await db.query.users.findFirst({ where: eq(users.id, row.userId) });
  if (!user) return null;
  const character = await db.query.characters.findFirst({
    where: eq(characters.userId, user.id),
  });
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
  return { user, character, rating };
}

const games = createGameService(db);
const { finishGame } = games;

io.use(async (socket, next) => {
  try {
    const token =
      (socket.handshake.auth?.token as string | undefined) ||
      (socket.handshake.headers.cookie
        ?.split(";")
        .map((s) => s.trim())
        .find((s) => s.startsWith("eduforge_session="))
        ?.split("=")[1]);
    const auth = await authFromToken(token);
    if (!auth) return next(new Error("unauthorized"));
    socket.data.auth = auth;
    socket.data.token = token;
    next();
  } catch (e) {
    next(e as Error);
  }
});

io.on("connection", (socket) => {
  const auth = socket.data.auth as Awaited<ReturnType<typeof authFromToken>>;
  if (!auth) {
    socket.disconnect();
    return;
  }

  socket.emit("ready", {
    userId: auth.user.id,
    displayName: auth.character?.displayName,
    elo: auth.rating.elo,
  });

  socket.on(
    "seek",
    async (payload: { timeControl?: string; rated?: boolean }, cb?: (r: unknown) => void) => {
      if (!allowSocketEvent(socket.id, "seek", { limit: 8, windowMs: 10_000 })) {
        cb?.({ error: "rate_limited" });
        return;
      }
      const parsed = seekGameSchema.safeParse({
        timeControl: payload?.timeControl ?? "5+0",
        rated: payload?.rated !== false,
      });
      if (!parsed.success) {
        cb?.({ error: "invalid_time_control" });
        return;
      }
      const timeControl = parsed.data.timeControl;
      const rated = parsed.data.rated;


      const me: SeekEntry = {
        userId: auth.user.id,
        displayName: auth.character?.displayName ?? "Гравець",
        elo: auth.rating.elo,
        timeControl,
        rated,
        socketId: socket.id,
      };

      const opp = await seekStore.tryMatch(me);

      if (opp) {
        const { white: w, black: b } = assignColors(opp, me);
        const white = {
          id: w.userId,
          name: w.displayName,
          elo: w.elo,
          socketId: w.socketId,
        };
        const black = {
          id: b.userId,
          name: b.displayName,
          elo: b.elo,
          socketId: b.socketId,
        };

        const ms = timeControlMs(timeControl);
        const chess = new Chess();
        const [game] = await db
          .insert(chessGames)
          .values({
            whiteId: white.id,
            blackId: black.id,
            fen: chess.fen(),
            pgn: "",
            status: "active",
            timeControl,
            rated,
            whiteTimeMs: ms,
            blackTimeMs: ms,
            lastMoveAt: new Date(),
            whiteEloBefore: white.elo,
            blackEloBefore: black.elo,
          })
          .returning();

        if (rated) {
          const today = new Date().toISOString().slice(0, 10);
          for (const uid of [white.id, black.id]) {
            const rating = await db.query.chessRatings.findFirst({
              where: eq(chessRatings.userId, uid),
            });
            if (!rating) continue;
            const count = rating.ratedGamesDate === today ? rating.ratedGamesToday + 1 : 1;
            await db
              .update(chessRatings)
              .set({ ratedGamesToday: count, ratedGamesDate: today })
              .where(eq(chessRatings.id, rating.id));
          }
        }

        const room = `game:${game.id}`;
        const whiteSock = io.sockets.sockets.get(white.socketId);
        const blackSock = io.sockets.sockets.get(black.socketId);
        whiteSock?.join(room);
        blackSock?.join(room);

        const payloadOut = {
          gameId: game.id,
          fen: game.fen,
          timeControl,
          rated,
          white: { userId: white.id, displayName: white.name, elo: white.elo },
          black: { userId: black.id, displayName: black.name, elo: black.elo },
          whiteTimeMs: ms,
          blackTimeMs: ms,
          youAre: null as "w" | "b" | null,
        };

        whiteSock?.emit("match_found", { ...payloadOut, youAre: "w" });
        blackSock?.emit("match_found", { ...payloadOut, youAre: "b" });
        cb?.({ matched: true, gameId: game.id });
        return;
      }

      cb?.({ seeking: true });
      socket.emit("seeking", { timeControl, rated });
    },
  );

  socket.on("cancel_seek", async (cb?: (r: unknown) => void) => {
    await seekStore.removeUser(auth.user.id);
    cb?.({ ok: true });
  });

  /** Create private invite game (friend link). Creator is white, waits for black. */
  socket.on(
    "create_invite",
    async (payload: { timeControl?: string }, cb?: (r: unknown) => void) => {
      const timeControl = payload?.timeControl ?? "5+0";
      const ms = timeControlMs(timeControl);
      const chess = new Chess();
      const [game] = await db
        .insert(chessGames)
        .values({
          whiteId: auth.user.id,
          blackId: null,
          fen: chess.fen(),
          pgn: "",
          status: "waiting",
          timeControl,
          rated: false,
          whiteTimeMs: ms,
          blackTimeMs: ms,
          lastMoveAt: new Date(),
          whiteEloBefore: auth.rating.elo,
          blackEloBefore: null,
        })
        .returning();
      socket.join(`game:${game.id}`);
      cb?.({
        ok: true,
        gameId: game.id,
        fen: game.fen,
        timeControl,
        whiteTimeMs: ms,
        blackTimeMs: ms,
        youAre: "w",
      });
      socket.emit("invite_waiting", { gameId: game.id });
    },
  );

  /** Join private invite as black (or rejoin as participant). */
  socket.on(
    "join_invite",
    async (payload: { gameId: string }, cb?: (r: unknown) => void) => {
      const gameId = payload?.gameId;
      if (!gameId) {
        cb?.({ error: "invalid" });
        return;
      }
      const game = await db.query.chessGames.findFirst({
        where: eq(chessGames.id, gameId),
      });
      if (!game) {
        cb?.({ error: "not_found" });
        return;
      }

      // Creator rejoining while waiting
      if (game.status === "waiting" && game.whiteId === auth.user.id) {
        socket.join(`game:${game.id}`);
        cb?.({
          ok: true,
          waiting: true,
          gameId: game.id,
          fen: game.fen,
          youAre: "w",
          whiteTimeMs: game.whiteTimeMs,
          blackTimeMs: game.blackTimeMs,
          timeControl: game.timeControl,
        });
        return;
      }

      if (game.status === "waiting" && !game.blackId) {
        if (game.whiteId === auth.user.id) {
          cb?.({ error: "cannot_join_own" });
          return;
        }
        const [updated] = await db
          .update(chessGames)
          .set({
            blackId: auth.user.id,
            status: "active",
            blackEloBefore: auth.rating.elo,
            lastMoveAt: new Date(),
          })
          .where(eq(chessGames.id, game.id))
          .returning();

        socket.join(`game:${updated.id}`);
        const whiteChar = updated.whiteId
          ? await db.query.characters.findFirst({
              where: eq(characters.userId, updated.whiteId),
            })
          : null;
        const blackChar = auth.character;
        const whiteRating = updated.whiteId
          ? await db.query.chessRatings.findFirst({
              where: eq(chessRatings.userId, updated.whiteId),
            })
          : null;

        const payloadOut = {
          gameId: updated.id,
          fen: updated.fen,
          timeControl: updated.timeControl,
          rated: false,
          white: {
            userId: updated.whiteId!,
            displayName: whiteChar?.displayName ?? "Білі",
            elo: whiteRating?.elo ?? 1000,
          },
          black: {
            userId: auth.user.id,
            displayName: blackChar?.displayName ?? "Чорні",
            elo: auth.rating.elo,
          },
          whiteTimeMs: updated.whiteTimeMs,
          blackTimeMs: updated.blackTimeMs,
        };

        io.to(`game:${updated.id}`).emit("match_found", {
          ...payloadOut,
          // receivers determine side by userId
        });
        // Emit with correct youAre per socket — broadcast then fix via personal events
        for (const [, s] of io.sockets.sockets) {
          const a = s.data.auth as Awaited<ReturnType<typeof authFromToken>>;
          if (!a) continue;
          if (a.user.id === updated.whiteId) {
            s.emit("match_found", { ...payloadOut, youAre: "w" });
          } else if (a.user.id === auth.user.id) {
            s.emit("match_found", { ...payloadOut, youAre: "b" });
          }
        }
        cb?.({ ok: true, matched: true, gameId: updated.id, youAre: "b" });
        return;
      }

      // Active game rejoin
      if (
        game.status === "active" &&
        (game.whiteId === auth.user.id || game.blackId === auth.user.id)
      ) {
        socket.join(`game:${game.id}`);
        const youAre = game.whiteId === auth.user.id ? "w" : "b";
        cb?.({ ok: true, game, youAre, rejoin: true });
        return;
      }

      cb?.({ error: "unavailable" });
    },
  );

  socket.on("join_game", async (payload: { gameId: string }, cb?: (r: unknown) => void) => {
    const game = await db.query.chessGames.findFirst({
      where: eq(chessGames.id, payload.gameId),
    });
    if (!game) {
      cb?.({ error: "not_found" });
      return;
    }
    if (game.whiteId !== auth.user.id && game.blackId !== auth.user.id) {
      cb?.({ error: "forbidden" });
      return;
    }
    socket.join(`game:${game.id}`);
    const youAre = game.whiteId === auth.user.id ? "w" : "b";
    cb?.({
      ok: true,
      game,
      youAre,
    });
  });

  socket.on(
    "move",
    async (
      payload: { gameId: string; from: string; to: string; promotion?: "q" | "r" | "b" | "n" },
      cb?: (r: unknown) => void,
    ) => {
      if (!allowSocketEvent(socket.id, "move", { limit: 12, windowMs: 1000 })) {
        cb?.({ error: "rate_limited" });
        return;
      }
      const parsed = chessMoveSchema.safeParse(payload);
      if (!parsed.success) {
        cb?.({ error: "invalid_move" });
        return;
      }
      payload = parsed.data;
      const out = await games.applyMove({ ...payload, userId: auth.user.id });
      if (out.kind === "error") {
        cb?.({ error: out.error });
        return;
      }
      if (out.kind === "timeout") {
        if (out.finished) io.to(`game:${payload.gameId}`).emit("game_over", out.finished);
        cb?.({ error: "timeout", result: out.finished?.result ?? null });
        return;
      }
      if (out.drawOfferExpired) io.to(`game:${payload.gameId}`).emit("draw_offer_expired", { gameId: payload.gameId });
      io.to(`game:${payload.gameId}`).emit("moved", out.move);
      if (out.finished) io.to(`game:${payload.gameId}`).emit("game_over", out.finished);
      cb?.({ ok: true, ...out.move });
    },
  );

  /** The opponent's clock ran out while they are idle: either player can claim it. */
  socket.on("claim_timeout", async (payload: { gameId: string }, cb?: (r: unknown) => void) => {
    if (!allowSocketEvent(socket.id, "claim_timeout", { limit: 5, windowMs: 5_000 })) {
      cb?.({ error: "rate_limited" });
      return;
    }
    const gameId = String(payload?.gameId ?? "");
    if (!gameId) {
      cb?.({ error: "invalid" });
      return;
    }
    const out = await games.claimTimeout(gameId, auth.user.id);
    if (!out.ok) {
      cb?.({ error: out.error, remainingMs: out.remainingMs });
      return;
    }
    io.to(`game:${gameId}`).emit("game_over", out.finished);
    cb?.({ ok: true, ...out.finished });
  });

  const drawState = (game: typeof chessGames.$inferSelect) => ({
    whiteId: game.whiteId,
    blackId: game.blackId,
    status: game.status,
    plies: (game.pgn ?? "").split(" ").filter(Boolean).length,
    drawOfferBy: game.drawOfferBy,
    lastDrawOfferPlyWhite: game.lastDrawOfferPlyWhite,
    lastDrawOfferPlyBlack: game.lastDrawOfferPlyBlack,
  });

  socket.on("offer_draw", async (payload: { gameId: string }, cb?: (r: unknown) => void) => {
    if (!allowSocketEvent(socket.id, "offer_draw", { limit: 3, windowMs: 10_000 })) {
      cb?.({ error: "rate_limited" });
      return;
    }
    const gameId = String(payload?.gameId ?? "");
    const game = gameId ? await db.query.chessGames.findFirst({ where: eq(chessGames.id, gameId) }) : null;
    if (!game) {
      cb?.({ error: "not_found" });
      return;
    }
    const st = drawState(game);
    const check = canOfferDraw(st, auth.user.id);
    if (!check.ok) {
      cb?.({ error: check.error });
      return;
    }
    await db
      .update(chessGames)
      .set({
        drawOfferBy: auth.user.id,
        drawOfferPly: st.plies,
        ...(check.color === "w" ? { lastDrawOfferPlyWhite: st.plies } : { lastDrawOfferPlyBlack: st.plies }),
      })
      .where(eq(chessGames.id, game.id));
    socket.to(`game:${game.id}`).emit("draw_offered", { gameId: game.id, by: check.color });
    cb?.({ ok: true });
  });

  socket.on("accept_draw", async (payload: { gameId: string }, cb?: (r: unknown) => void) => {
    if (!allowSocketEvent(socket.id, "answer_draw", { limit: 5, windowMs: 10_000 })) {
      cb?.({ error: "rate_limited" });
      return;
    }
    const gameId = String(payload?.gameId ?? "");
    const game = gameId ? await db.query.chessGames.findFirst({ where: eq(chessGames.id, gameId) }) : null;
    if (!game) {
      cb?.({ error: "not_found" });
      return;
    }
    const check = canAnswerDraw(drawState(game), auth.user.id);
    if (!check.ok) {
      cb?.({ error: check.error });
      return;
    }
    const finished = await finishGame(game.id, "1/2-1/2", "agreement");
    if (!finished) {
      cb?.({ error: "not_active" });
      return;
    }
    io.to(`game:${game.id}`).emit("game_over", finished);
    cb?.({ ok: true });
  });

  socket.on("decline_draw", async (payload: { gameId: string }, cb?: (r: unknown) => void) => {
    if (!allowSocketEvent(socket.id, "answer_draw", { limit: 5, windowMs: 10_000 })) {
      cb?.({ error: "rate_limited" });
      return;
    }
    const gameId = String(payload?.gameId ?? "");
    const game = gameId ? await db.query.chessGames.findFirst({ where: eq(chessGames.id, gameId) }) : null;
    if (!game) {
      cb?.({ error: "not_found" });
      return;
    }
    const check = canAnswerDraw(drawState(game), auth.user.id);
    if (!check.ok) {
      cb?.({ error: check.error });
      return;
    }
    await db.update(chessGames).set({ drawOfferBy: null }).where(eq(chessGames.id, game.id));
    socket.to(`game:${game.id}`).emit("draw_declined", { gameId: game.id });
    cb?.({ ok: true });
  });

  socket.on("resign", async (payload: { gameId: string }, cb?: (r: unknown) => void) => {
    if (!allowSocketEvent(socket.id, "resign", { limit: 5, windowMs: 10_000 })) {
      cb?.({ error: "rate_limited" });
      return;
    }
    const game = await db.query.chessGames.findFirst({
      where: eq(chessGames.id, payload.gameId),
    });
    if (!game || game.status !== "active") {
      cb?.({ error: "not_active" });
      return;
    }
    const result = game.whiteId === auth.user.id ? "0-1" : "1-0";
    const finished = await finishGame(game.id, result, "resign");
    if (!finished) {
      cb?.({ error: "not_active" });
      return;
    }
    io.to(`game:${game.id}`).emit("game_over", finished);
    cb?.({ ok: true, result });
  });

  // ——— Live collaborative classroom (classId room) ———
  socket.on(
    "class_join",
    (
      payload: { classId: string; displayName?: string },
      cb?: (r: unknown) => void,
    ) => {
      const classId = String(payload?.classId ?? "").slice(0, 64);
      if (!classId) {
        cb?.({ error: "invalid_class" });
        return;
      }
      const room = `class:${classId}`;
      socket.join(room);
      socket.data.classId = classId;
      socket.to(room).emit("class_presence", {
        userId: auth.user.id,
        displayName: payload.displayName ?? auth.character?.displayName ?? "Learner",
        event: "join",
      });
      cb?.({ ok: true, room, userId: auth.user.id });
    },
  );

  socket.on(
    "class_chat",
    (
      payload: { classId: string; body: string },
      cb?: (r: unknown) => void,
    ) => {
      if (!allowSocketEvent(socket.id, "class_chat", { limit: 8, windowMs: 5000 })) {
        cb?.({ error: "rate_limited" });
        return;
      }
      const classId = String(payload?.classId ?? "").slice(0, 64);
      const body = String(payload?.body ?? "").trim().slice(0, 500);
      if (!classId || !body) {
        cb?.({ error: "invalid" });
        return;
      }
      const msg = {
        userId: auth.user.id,
        displayName: auth.character?.displayName ?? "Learner",
        body,
        ts: Date.now(),
      };
      io.to(`class:${classId}`).emit("class_chat", msg);
      cb?.({ ok: true });
    },
  );

  socket.on(
    "class_code",
    (
      payload: { classId: string; code: string; lang?: string; cursor?: number },
      cb?: (r: unknown) => void,
    ) => {
      if (!allowSocketEvent(socket.id, "class_code", { limit: 10, windowMs: 1000 })) {
        cb?.({ error: "rate_limited" });
        return;
      }
      const classId = String(payload?.classId ?? "").slice(0, 64);
      const code = String(payload?.code ?? "").slice(0, 40_000);
      if (!classId) {
        cb?.({ error: "invalid" });
        return;
      }
      // Broadcast collaborative buffer (last-write-wins; CRDT later)
      socket.to(`class:${classId}`).emit("class_code", {
        userId: auth.user.id,
        displayName: auth.character?.displayName ?? "Learner",
        code,
        lang: payload.lang ?? "javascript",
        cursor: payload.cursor,
        ts: Date.now(),
      });
      cb?.({ ok: true });
    },
  );

  socket.on(
    "class_raise_hand",
    (payload: { classId: string; up?: boolean }, cb?: (r: unknown) => void) => {
      const classId = String(payload?.classId ?? "").slice(0, 64);
      if (!classId) {
        cb?.({ error: "invalid" });
        return;
      }
      io.to(`class:${classId}`).emit("class_raise_hand", {
        userId: auth.user.id,
        displayName: auth.character?.displayName ?? "Learner",
        up: payload.up !== false,
        ts: Date.now(),
      });
      cb?.({ ok: true });
    },
  );

  socket.on("disconnect", () => {
    const classId = socket.data.classId as string | undefined;
    if (classId) {
      socket.to(`class:${classId}`).emit("class_presence", {
        userId: auth.user.id,
        displayName: auth.character?.displayName ?? "Learner",
        event: "leave",
      });
    }
    void seekStore.removeSocket(socket.id);
  });
});

// Sweep: end games whose player went silent with the clock running (closed tab,
// lost connection) and expire unjoined invites. Conditional updates make it safe
// to run on every instance.
const SWEEP_MS = Math.max(5_000, Number(process.env.REALTIME_SWEEP_MS ?? 15_000));
let sweeping = false;
async function sweepOnce() {
  if (sweeping) return;
  sweeping = true;
  try {
    for (const f of await games.sweepStaleGames()) io.to(`game:${f.gameId}`).emit("game_over", f);
  } catch (e) {
    console.warn("[realtime] sweep failed:", e instanceof Error ? e.message : e);
    captureException(e, { task: "sweep" });
  } finally {
    sweeping = false;
  }
}
setInterval(() => void sweepOnce(), SWEEP_MS).unref();

void setupSocketAdapter().finally(() => {
  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(
      `Realtime listening on http://0.0.0.0:${PORT} (matchmaking=${seekStore.backend})`,
    );
  });
});
