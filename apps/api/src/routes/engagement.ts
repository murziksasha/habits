import { Hono } from "hono";
import { and, desc, eq, isNull, sql } from "drizzle-orm";
import {
  achievements,
  activityEvents,
  notifications,
  userAchievements,
} from "@eduforge/db";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { db } from "../db.js";
import { ensureAchievementCatalog } from "../engagement.js";

type Vars = { user: AuthedUser };

export const engagementRoutes = new Hono<{ Variables: Vars }>();

engagementRoutes.get("/achievements", authMiddleware, async (c) => {
  const user = c.get("user");
  await ensureAchievementCatalog(db);
  const all = await db.query.achievements.findMany();
  const mine = await db.query.userAchievements.findMany({
    where: eq(userAchievements.userId, user.id),
  });
  const unlockedIds = new Set(mine.map((m) => m.achievementId));
  return c.json({
    achievements: all.map((a) => ({
      ...a,
      unlocked: unlockedIds.has(a.id),
      unlockedAt: mine.find((m) => m.achievementId === a.id)?.unlockedAt ?? null,
    })),
  });
});

engagementRoutes.get("/notifications", authMiddleware, async (c) => {
  const user = c.get("user");
  const rows = await db.query.notifications.findMany({
    where: eq(notifications.userId, user.id),
    orderBy: [desc(notifications.createdAt)],
    limit: 50,
  });
  const [unread] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(notifications)
    .where(and(eq(notifications.userId, user.id), isNull(notifications.readAt)));
  return c.json({ notifications: rows, unread: unread?.n ?? 0 });
});

engagementRoutes.post("/notifications/read-all", authMiddleware, async (c) => {
  const user = c.get("user");
  await db
    .update(notifications)
    .set({ readAt: new Date() })
    .where(and(eq(notifications.userId, user.id), isNull(notifications.readAt)));
  return c.json({ ok: true });
});

engagementRoutes.post("/notifications/:id/read", authMiddleware, async (c) => {
  const user = c.get("user");
  const id = c.req.param("id") as string;
  await db
    .update(notifications)
    .set({ readAt: new Date() })
    .where(and(eq(notifications.id, id), eq(notifications.userId, user.id)));
  return c.json({ ok: true });
});

engagementRoutes.get("/activity", authMiddleware, async (c) => {
  const user = c.get("user");
  const rows = await db.query.activityEvents.findMany({
    where: eq(activityEvents.userId, user.id),
    orderBy: [desc(activityEvents.createdAt)],
    limit: 30,
  });
  return c.json({ events: rows });
});

engagementRoutes.get("/activity/feed", authMiddleware, async (c) => {
  // Public-ish feed: recent activities from all users (limited)
  const rows = await db
    .select({
      id: activityEvents.id,
      kind: activityEvents.kind,
      payload: activityEvents.payload,
      createdAt: activityEvents.createdAt,
      userId: activityEvents.userId,
    })
    .from(activityEvents)
    .orderBy(desc(activityEvents.createdAt))
    .limit(40);
  return c.json({ events: rows });
});
