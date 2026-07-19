import { Hono } from "hono";
import { desc, eq } from "drizzle-orm";
import { characters, chessGames, chessRatings } from "@eduforge/db";
import { canPlayRatedChess, type Plan } from "@eduforge/shared";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { db } from "../db.js";

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
    allowed: canPlayRatedChess({
      plan: user.plan as Plan,
      ratedGamesToday: ratedToday,
    }),
    ratedGamesToday: ratedToday,
    plan: user.plan,
  });
});
