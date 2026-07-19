import { Hono } from "hono";
import { desc, eq, sql } from "drizzle-orm";
import { studySessions } from "@eduforge/db";
import { z } from "zod";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { db } from "../db.js";
import { logActivity } from "../engagement.js";
import { bumpDailyQuests } from "./quests.js";

type Vars = { user: AuthedUser };

export const focusRoutes = new Hono<{ Variables: Vars }>();

const logSchema = z.object({
  durationSec: z.number().int().min(30).max(4 * 3600),
  courseSlug: z.string().max(32).optional().nullable(),
  note: z.string().max(255).optional(),
});

focusRoutes.post("/log", authMiddleware, async (c) => {
  const user = c.get("user");
  const body = await c.req.json().catch(() => null);
  const parsed = logSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input" }, 400);

  const startedAt = new Date(Date.now() - parsed.data.durationSec * 1000);
  const [row] = await db
    .insert(studySessions)
    .values({
      userId: user.id,
      durationSec: parsed.data.durationSec,
      courseSlug: parsed.data.courseSlug ?? null,
      note: parsed.data.note ?? "",
      startedAt,
      endedAt: new Date(),
    })
    .returning();

  const minutes = Math.floor(parsed.data.durationSec / 60);
  if (minutes > 0) {
    await bumpDailyQuests(user.id, "focus_min", minutes);
  }
  await logActivity(db, user.id, "focus_session", {
    durationSec: parsed.data.durationSec,
    courseSlug: parsed.data.courseSlug,
  });

  return c.json({ session: row }, 201);
});

focusRoutes.get("/history", authMiddleware, async (c) => {
  const user = c.get("user");
  const rows = await db.query.studySessions.findMany({
    where: eq(studySessions.userId, user.id),
    orderBy: [desc(studySessions.startedAt)],
    limit: 30,
  });
  const [agg] = await db
    .select({
      totalSec: sql<number>`coalesce(sum(${studySessions.durationSec}), 0)::int`,
      sessions: sql<number>`count(*)::int`,
    })
    .from(studySessions)
    .where(eq(studySessions.userId, user.id));

  return c.json({
    history: rows,
    totalSec: agg?.totalSec ?? 0,
    sessions: agg?.sessions ?? 0,
  });
});
