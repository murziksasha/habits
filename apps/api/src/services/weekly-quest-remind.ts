import { and, desc, eq, gte } from "drizzle-orm";
import { activityEvents, characters, users } from "@eduforge/db";
import {
  applyLevelUps,
  isoWeekKey,
  normalizeProgression,
  weeklyQuestStatus,
} from "@eduforge/shared";
import { db } from "../db.js";
import { logActivity, notifyUser } from "../engagement.js";
import { sendPushToUser } from "../push.js";

export type WeeklyQuestRemindResult = {
  scanned: number;
  eligible: number;
  notified: number;
  pushed: number;
  skippedClaimedOrDone: number;
  skippedThrottle: number;
  weekKey: string;
};

/**
 * Nudge learners with incomplete weekly quests (build/lessons).
 * Throttle: skip if `weekly_quest_remind` activity in last 2 days.
 */
export async function runWeeklyQuestRemind(limit = 300): Promise<WeeklyQuestRemindResult> {
  const weekKey = isoWeekKey();
  const throttleSince = new Date(Date.now() - 2 * 86400000);

  const rows = await db
    .select({
      userId: characters.userId,
      displayName: characters.displayName,
      globalLevel: characters.globalLevel,
      progression: characters.progression,
      preferredLocale: users.preferredLocale,
    })
    .from(characters)
    .innerJoin(users, eq(users.id, characters.userId))
    .orderBy(desc(characters.globalXp))
    .limit(Math.min(800, Math.max(50, limit)));

  let eligible = 0;
  let notified = 0;
  let pushed = 0;
  let skippedClaimedOrDone = 0;
  let skippedThrottle = 0;

  for (const row of rows) {
    const prog = applyLevelUps(normalizeProgression(row.progression), row.globalLevel);
    const status = weeklyQuestStatus(prog, weekKey);
    const open = status.quests.filter((q) => !q.claimed && !q.completed);
    const claimable = status.quests.filter((q) => q.completed && !q.claimed);
    if (open.length === 0 && claimable.length === 0) {
      skippedClaimedOrDone += 1;
      continue;
    }
    eligible += 1;

    const recent = await db.query.activityEvents.findFirst({
      where: and(
        eq(activityEvents.userId, row.userId),
        eq(activityEvents.kind, "weekly_quest_remind"),
        gte(activityEvents.createdAt, throttleSince),
      ),
    });
    if (recent) {
      skippedThrottle += 1;
      continue;
    }

    const uk = (row.preferredLocale ?? "uk") === "uk";
    const focus =
      claimable[0] ??
      open.sort((a, b) => b.progress / b.target - a.progress / a.target)[0];
    const title = uk ? "Тижневі квести 📅" : "Weekly quests 📅";
    const body = claimable.length
      ? uk
        ? `${row.displayName}, забери нагороду: ${focus?.titleUk ?? "квест"} (+${focus?.rewardXp ?? 0} XP)`
        : `${row.displayName}, claim reward: ${focus?.titleEn ?? "quest"} (+${focus?.rewardXp ?? 0} XP)`
      : uk
        ? `${row.displayName}: ${focus?.titleUk ?? "квест"} — ${focus?.progress ?? 0}/${focus?.target ?? 0}. Відкрий /quests`
        : `${row.displayName}: ${focus?.titleEn ?? "quest"} — ${focus?.progress ?? 0}/${focus?.target ?? 0}. Open /quests`;

    await notifyUser(db, row.userId, {
      type: "weekly_quest",
      titleUk: title,
      titleEn: title,
      bodyUk: body,
      bodyEn: body,
      href: claimable.length ? "/quests" : "/quests",
    });
    notified += 1;

    const push = await sendPushToUser(db, row.userId, {
      title,
      body,
      href: "/quests",
      tag: "weekly_quest",
    });
    if ((push?.sent ?? 0) > 0) pushed += 1;

    await logActivity(db, row.userId, "weekly_quest_remind", {
      weekKey,
      claimable: claimable.length,
      open: open.length,
    });
  }

  return {
    scanned: rows.length,
    eligible,
    notified,
    pushed,
    skippedClaimedOrDone,
    skippedThrottle,
    weekKey,
  };
}
