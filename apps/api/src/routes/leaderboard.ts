import { Hono } from "hono";
import { desc, eq, sql } from "drizzle-orm";
import { characters, chessRatings, courses, userCourseProgress } from "@eduforge/db";
import { db } from "../db.js";

export const leaderboardRoutes = new Hono();

leaderboardRoutes.get("/global", async (c) => {
  const rows = await db
    .select({
      displayName: characters.displayName,
      globalXp: characters.globalXp,
      globalLevel: characters.globalLevel,
      streakDays: characters.streakDays,
      avatarKey: characters.avatarKey,
    })
    .from(characters)
    .orderBy(desc(characters.globalXp))
    .limit(50);
  return c.json({
    entries: rows.map((r, i) => ({ rank: i + 1, ...r, score: r.globalXp })),
  });
});

leaderboardRoutes.get("/chess", async (c) => {
  const rows = await db
    .select({
      elo: chessRatings.elo,
      gamesPlayed: chessRatings.gamesPlayed,
      wins: chessRatings.wins,
      displayName: characters.displayName,
      avatarKey: characters.avatarKey,
    })
    .from(chessRatings)
    .innerJoin(characters, eq(characters.userId, chessRatings.userId))
    .orderBy(desc(chessRatings.elo))
    .limit(50);
  return c.json({
    entries: rows.map((r, i) => ({ rank: i + 1, ...r, score: r.elo })),
  });
});

leaderboardRoutes.get("/course/:slug", async (c) => {
  const slug = c.req.param("slug") as typeof courses.slug.enumValues[number];
  const course = await db.query.courses.findFirst({ where: eq(courses.slug, slug) });
  if (!course) return c.json({ error: "not_found" }, 404);
  const rows = await db
    .select({
      xp: userCourseProgress.xp,
      level: userCourseProgress.level,
      displayName: characters.displayName,
      avatarKey: characters.avatarKey,
    })
    .from(userCourseProgress)
    .innerJoin(characters, eq(characters.userId, userCourseProgress.userId))
    .where(eq(userCourseProgress.courseId, course.id))
    .orderBy(desc(userCourseProgress.xp))
    .limit(50);
  return c.json({
    entries: rows.map((r, i) => ({ rank: i + 1, ...r, score: r.xp })),
  });
});
