import { Hono } from "hono";
import { and, eq, gte, sql } from "drizzle-orm";
import {
  activityEvents,
  characters,
  flashcardReviews,
  skillAttempts,
  studySessions,
  users,
} from "@eduforge/db";
import { z } from "zod";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { db } from "../db.js";
import { sendMail, weeklyReportEmail } from "../email.js";

type Vars = { user: AuthedUser };

export const reportRoutes = new Hono<{ Variables: Vars }>();

export type WeeklyStats = {
  lessonsCompleted: number;
  xpApprox: number;
  flashcardReviews: number;
  focusMinutes: number;
  streakDays: number;
  displayName: string;
  email: string;
  locale: string;
};

export async function buildWeeklyStats(userId: string): Promise<WeeklyStats | null> {
  const u = await db.query.users.findFirst({ where: eq(users.id, userId) });
  if (!u) return null;
  const ch = await db.query.characters.findFirst({
    where: eq(characters.userId, userId),
  });
  const since = new Date(Date.now() - 7 * 86400000);

  const [lessons] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(activityEvents)
    .where(
      and(
        eq(activityEvents.userId, userId),
        eq(activityEvents.kind, "lesson_completed"),
        gte(activityEvents.createdAt, since),
      ),
    );

  const [xpRow] = await db
    .select({
      xp: sql<number>`coalesce(sum(${skillAttempts.xpGained}), 0)::int`,
    })
    .from(skillAttempts)
    .where(
      and(eq(skillAttempts.userId, userId), gte(skillAttempts.createdAt, since)),
    );

  const [fc] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(flashcardReviews)
    .where(
      and(
        eq(flashcardReviews.userId, userId),
        gte(flashcardReviews.createdAt, since),
      ),
    );

  const [focus] = await db
    .select({
      sec: sql<number>`coalesce(sum(${studySessions.durationSec}), 0)::int`,
    })
    .from(studySessions)
    .where(
      and(eq(studySessions.userId, userId), gte(studySessions.startedAt, since)),
    );

  return {
    lessonsCompleted: lessons?.n ?? 0,
    xpApprox: xpRow?.xp ?? 0,
    flashcardReviews: fc?.n ?? 0,
    focusMinutes: Math.floor((focus?.sec ?? 0) / 60),
    streakDays: ch?.streakDays ?? 0,
    displayName: ch?.displayName ?? "Learner",
    email: u.email,
    locale: u.preferredLocale ?? "uk",
  };
}

reportRoutes.get("/weekly", authMiddleware, async (c) => {
  const user = c.get("user");
  const stats = await buildWeeklyStats(user.id);
  if (!stats) return c.json({ error: "not_found" }, 404);
  const u = await db.query.users.findFirst({ where: eq(users.id, user.id) });
  return c.json({
    stats,
    weeklyEmailEnabled: u?.weeklyEmailEnabled ?? true,
    lastWeeklyEmailAt: u?.lastWeeklyEmailAt ?? null,
  });
});

const prefsSchema = z.object({
  weeklyEmailEnabled: z.boolean().optional(),
  preferredLocale: z.enum(["uk", "en"]).optional(),
});

reportRoutes.patch("/prefs", authMiddleware, async (c) => {
  const user = c.get("user");
  const body = await c.req.json().catch(() => null);
  const parsed = prefsSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input" }, 400);

  const [updated] = await db
    .update(users)
    .set({
      ...(parsed.data.weeklyEmailEnabled !== undefined
        ? { weeklyEmailEnabled: parsed.data.weeklyEmailEnabled }
        : {}),
      ...(parsed.data.preferredLocale
        ? { preferredLocale: parsed.data.preferredLocale }
        : {}),
      updatedAt: new Date(),
    })
    .where(eq(users.id, user.id))
    .returning();

  return c.json({
    weeklyEmailEnabled: updated.weeklyEmailEnabled,
    preferredLocale: updated.preferredLocale,
  });
});

reportRoutes.post("/weekly/send-me", authMiddleware, async (c) => {
  const user = c.get("user");
  const stats = await buildWeeklyStats(user.id);
  if (!stats) return c.json({ error: "not_found" }, 404);

  const mail = weeklyReportEmail(stats);
  const result = await sendMail(mail);
  await db
    .update(users)
    .set({ lastWeeklyEmailAt: new Date() })
    .where(eq(users.id, user.id));

  return c.json({ ok: true, ...result, preview: mail.text });
});

/** Admin: send to all users with weeklyEmailEnabled (skip if sent in last 6 days) */
reportRoutes.post("/weekly/send-all", authMiddleware, async (c) => {
  const user = c.get("user");
  if (user.role !== "admin") return c.json({ error: "forbidden" }, 403);

  const all = await db.query.users.findMany({
    where: eq(users.weeklyEmailEnabled, true),
  });
  const cutoff = new Date(Date.now() - 6 * 86400000);
  let sent = 0;
  let skipped = 0;

  for (const u of all) {
    if (u.lastWeeklyEmailAt && u.lastWeeklyEmailAt > cutoff) {
      skipped += 1;
      continue;
    }
    const stats = await buildWeeklyStats(u.id);
    if (!stats) continue;
    await sendMail(weeklyReportEmail(stats));
    await db
      .update(users)
      .set({ lastWeeklyEmailAt: new Date() })
      .where(eq(users.id, u.id));
    sent += 1;
  }

  return c.json({ ok: true, sent, skipped, total: all.length });
});
