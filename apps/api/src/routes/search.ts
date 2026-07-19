import { Hono } from "hono";
import { eq, ilike, or } from "drizzle-orm";
import { characters, courses, users } from "@eduforge/db";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { db } from "../db.js";

type Vars = { user: AuthedUser };

export const searchRoutes = new Hono<{ Variables: Vars }>();

searchRoutes.get("/", authMiddleware, async (c) => {
  const q = String(c.req.query("q") ?? "").trim();
  if (q.length < 2) return c.json({ courses: [], users: [] });

  const pattern = `%${q}%`;

  const courseHits = await db
    .select({
      slug: courses.slug,
      titleUk: courses.titleUk,
      descriptionUk: courses.descriptionUk,
      icon: courses.icon,
    })
    .from(courses)
    .where(or(ilike(courses.titleUk, pattern), ilike(courses.descriptionUk, pattern)))
    .limit(10);

  const userHits = await db
    .select({
      userId: characters.userId,
      displayName: characters.displayName,
      globalLevel: characters.globalLevel,
      globalXp: characters.globalXp,
      email: users.email,
    })
    .from(characters)
    .innerJoin(users, eq(users.id, characters.userId))
    .where(or(ilike(characters.displayName, pattern), ilike(users.email, pattern)))
    .limit(10);

  return c.json({
    courses: courseHits,
    users: userHits.map((u) => ({
      userId: u.userId,
      displayName: u.displayName,
      globalLevel: u.globalLevel,
      globalXp: u.globalXp,
      email: u.email.replace(/(.{2}).+(@.+)/, "$1***$2"),
    })),
  });
});
