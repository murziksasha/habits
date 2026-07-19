import { Hono } from "hono";
import { and, desc, eq } from "drizzle-orm";
import {
  characters,
  weeklyChallengeProgress,
  weeklyChallenges,
} from "@eduforge/db";
import {
  DEFAULT_WEEKLY_TARGET_XP,
  isoWeekBounds,
} from "@eduforge/shared";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { db } from "../db.js";
import { logActivity, notifyUser } from "../engagement.js";

type Vars = { user: AuthedUser };

export const challengeRoutes = new Hono<{ Variables: Vars }>();

async function ensureCurrentWeekChallenge() {
  const { weekKey, startsAt, endsAt } = isoWeekBounds();
  let ch = await db.query.weeklyChallenges.findFirst({
    where: eq(weeklyChallenges.weekKey, weekKey),
  });
  if (!ch) {
    const [created] = await db
      .insert(weeklyChallenges)
      .values({
        weekKey,
        titleUk: `Тижневий виклик ${weekKey}`,
        titleEn: `Weekly challenge ${weekKey}`,
        descriptionUk: `Наберіть ${DEFAULT_WEEKLY_TARGET_XP} XP за цей тиждень`,
        descriptionEn: `Earn ${DEFAULT_WEEKLY_TARGET_XP} XP this week`,
        targetXp: DEFAULT_WEEKLY_TARGET_XP,
        startsAt,
        endsAt,
      })
      .returning();
    ch = created;
  }
  return ch;
}

/** Call after XP gain */
export async function addWeeklyXp(userId: string, xpGain: number) {
  if (xpGain <= 0) return;
  const ch = await ensureCurrentWeekChallenge();
  let prog = await db.query.weeklyChallengeProgress.findFirst({
    where: and(
      eq(weeklyChallengeProgress.challengeId, ch.id),
      eq(weeklyChallengeProgress.userId, userId),
    ),
  });
  if (!prog) {
    const [created] = await db
      .insert(weeklyChallengeProgress)
      .values({ challengeId: ch.id, userId, xp: xpGain })
      .returning();
    prog = created;
  } else {
    const [updated] = await db
      .update(weeklyChallengeProgress)
      .set({ xp: prog.xp + xpGain })
      .where(eq(weeklyChallengeProgress.id, prog.id))
      .returning();
    prog = updated;
  }

  if (!prog.completedAt && prog.xp >= ch.targetXp) {
    await db
      .update(weeklyChallengeProgress)
      .set({ completedAt: new Date() })
      .where(eq(weeklyChallengeProgress.id, prog.id));
    await notifyUser(db, userId, {
      type: "challenge",
      titleUk: "Тижневий виклик виконано!",
      titleEn: "Weekly challenge complete!",
      bodyUk: ch.titleUk,
      bodyEn: ch.titleEn,
      href: "/challenges",
    });
    await logActivity(db, userId, "weekly_challenge_complete", {
      weekKey: ch.weekKey,
      xp: prog.xp,
    });
  }
}

challengeRoutes.get("/current", authMiddleware, async (c) => {
  const user = c.get("user");
  const ch = await ensureCurrentWeekChallenge();
  let prog = await db.query.weeklyChallengeProgress.findFirst({
    where: and(
      eq(weeklyChallengeProgress.challengeId, ch.id),
      eq(weeklyChallengeProgress.userId, user.id),
    ),
  });
  if (!prog) {
    const [created] = await db
      .insert(weeklyChallengeProgress)
      .values({ challengeId: ch.id, userId: user.id, xp: 0 })
      .returning();
    prog = created;
  }

  const board = await db
    .select({
      userId: weeklyChallengeProgress.userId,
      xp: weeklyChallengeProgress.xp,
      completedAt: weeklyChallengeProgress.completedAt,
      displayName: characters.displayName,
    })
    .from(weeklyChallengeProgress)
    .leftJoin(characters, eq(characters.userId, weeklyChallengeProgress.userId))
    .where(eq(weeklyChallengeProgress.challengeId, ch.id))
    .orderBy(desc(weeklyChallengeProgress.xp))
    .limit(30);

  return c.json({
    challenge: ch,
    progress: prog,
    leaderboard: board.map((b, i) => ({ rank: i + 1, ...b })),
  });
});
