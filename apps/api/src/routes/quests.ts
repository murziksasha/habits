import { Hono } from "hono";
import { and, eq } from "drizzle-orm";
import { characters, userDailyQuests } from "@eduforge/db";
import {
  DAILY_QUEST_DEFS,
  levelFromXp,
  todayUtc,
} from "@eduforge/shared";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { db } from "../db.js";
import { logActivity, notifyUser } from "../engagement.js";

type Vars = { user: AuthedUser };

export const questRoutes = new Hono<{ Variables: Vars }>();

async function ensureDailyQuests(userId: string, date = todayUtc()) {
  const existing = await db.query.userDailyQuests.findMany({
    where: and(
      eq(userDailyQuests.userId, userId),
      eq(userDailyQuests.questDate, date),
    ),
  });
  if (existing.length >= DAILY_QUEST_DEFS.length) return existing;

  const have = new Set(existing.map((e) => e.questKey));
  for (const def of DAILY_QUEST_DEFS) {
    if (have.has(def.key)) continue;
    await db.insert(userDailyQuests).values({
      userId,
      questDate: date,
      questKey: def.key,
      progress: 0,
      target: def.target,
      rewardXp: def.rewardXp,
    });
  }
  return db.query.userDailyQuests.findMany({
    where: and(
      eq(userDailyQuests.userId, userId),
      eq(userDailyQuests.questDate, date),
    ),
  });
}

/** Bump progress for metrics (lessons / xp / focus_min). Safe no-op if already complete. */
export async function bumpDailyQuests(
  userId: string,
  metric: "lessons" | "xp" | "focus_min" | "exams",
  amount: number,
) {
  if (amount <= 0) return;
  const date = todayUtc();
  await ensureDailyQuests(userId, date);
  const rows = await db.query.userDailyQuests.findMany({
    where: and(
      eq(userDailyQuests.userId, userId),
      eq(userDailyQuests.questDate, date),
    ),
  });

  for (const row of rows) {
    const def = DAILY_QUEST_DEFS.find((d) => d.key === row.questKey);
    if (!def || def.metric !== metric || row.completed) continue;
    const progress = Math.min(row.target, row.progress + amount);
    const completed = progress >= row.target;
    await db
      .update(userDailyQuests)
      .set({ progress, completed })
      .where(eq(userDailyQuests.id, row.id));
  }
}

questRoutes.get("/daily", authMiddleware, async (c) => {
  const user = c.get("user");
  const date = todayUtc();
  const rows = await ensureDailyQuests(user.id, date);
  return c.json({
    date,
    quests: rows.map((q) => {
      const def = DAILY_QUEST_DEFS.find((d) => d.key === q.questKey);
      return {
        ...q,
        metric: def?.metric ?? "lessons",
      };
    }),
  });
});

questRoutes.post("/daily/:questKey/claim", authMiddleware, async (c) => {
  const user = c.get("user");
  const questKey = c.req.param("questKey") as string;
  const date = todayUtc();
  await ensureDailyQuests(user.id, date);

  const row = await db.query.userDailyQuests.findFirst({
    where: and(
      eq(userDailyQuests.userId, user.id),
      eq(userDailyQuests.questDate, date),
      eq(userDailyQuests.questKey, questKey),
    ),
  });
  if (!row) return c.json({ error: "not_found" }, 404);
  if (!row.completed) return c.json({ error: "not_completed" }, 400);
  if (row.claimed) return c.json({ error: "already_claimed" }, 409);

  const ch = await db.query.characters.findFirst({
    where: eq(characters.userId, user.id),
  });
  if (!ch) return c.json({ error: "no_character" }, 404);

  const newXp = ch.globalXp + row.rewardXp;
  const [updated] = await db
    .update(characters)
    .set({ globalXp: newXp, globalLevel: levelFromXp(newXp) })
    .where(eq(characters.id, ch.id))
    .returning();

  await db
    .update(userDailyQuests)
    .set({ claimed: true })
    .where(eq(userDailyQuests.id, row.id));

  await logActivity(db, user.id, "quest_claimed", {
    questKey,
    rewardXp: row.rewardXp,
  });
  await notifyUser(db, user.id, {
    type: "quest",
    titleUk: "Квест виконано!",
    titleEn: "Quest claimed!",
    bodyUk: `+${row.rewardXp} XP`,
    bodyEn: `+${row.rewardXp} XP`,
    href: "/quests",
  });

  return c.json({ ok: true, rewardXp: row.rewardXp, character: updated });
});
