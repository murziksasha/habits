import { Hono } from "hono";
import { desc, eq, sql } from "drizzle-orm";
import { characters, chessRatings, courses, userCourseProgress } from "@eduforge/db";
import {
  PATH_BADGE_CATALOG,
  applyLevelUps,
  normalizeProgression,
  titleLabel,
} from "@eduforge/shared";
import { db } from "../db.js";

export const leaderboardRoutes = new Hono();

function cosmeticsFromProgression(raw: unknown, level: number) {
  const p = applyLevelUps(normalizeProgression(raw), level);
  const badgeIds = p.pathBadges ?? [];
  const pathBadgeIcons = badgeIds
    .map((id) => PATH_BADGE_CATALOG.find((b) => b.id === id)?.icon)
    .filter(Boolean)
    .slice(0, 4) as string[];
  return {
    equippedTitle: p.equippedTitle ?? "rookie",
    equippedFrame: p.equippedFrame ?? "none",
    titleUk: titleLabel(p.equippedTitle, "uk"),
    titleEn: titleLabel(p.equippedTitle, "en"),
    pathBadgeCount: badgeIds.length,
    pathBadgeIcons,
  };
}

leaderboardRoutes.get("/global", async (c) => {
  const rows = await db
    .select({
      displayName: characters.displayName,
      globalXp: characters.globalXp,
      globalLevel: characters.globalLevel,
      streakDays: characters.streakDays,
      avatarKey: characters.avatarKey,
      progression: characters.progression,
    })
    .from(characters)
    .orderBy(desc(characters.globalXp))
    .limit(50);
  return c.json({
    entries: rows.map((r, i) => {
      const { progression, ...rest } = r;
      return {
        rank: i + 1,
        ...rest,
        ...cosmeticsFromProgression(progression, r.globalLevel),
        score: r.globalXp,
      };
    }),
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
  const slug = c.req.param("slug");
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
