import { and, eq, gte, isNotNull, lt } from "drizzle-orm";
import { activityEvents, characters, users } from "@eduforge/db";
import { isFeatureEnabled } from "@eduforge/shared";
import { db } from "../db.js";
import { logActivity } from "../engagement.js";
import { sendPushToUser } from "../push.js";

export type ReengageResult = {
  scanned: number;
  eligible: number;
  sent: number;
  failed: number;
  skippedRecent: number;
  days: number;
};

function daysAgoKey(days: number): string {
  const d = new Date(Date.now() - days * 86400000);
  return d.toISOString().slice(0, 10);
}

/**
 * Web push for learners inactive for `days`+ (based on characters.lastActiveDate).
 * Throttled: skip if `push_reengage_sent` activity within last `days` days.
 */
export async function runInactivePushReengage(days = 3): Promise<ReengageResult> {
  if (!isFeatureEnabled("push_reengage")) {
    return {
      scanned: 0,
      eligible: 0,
      sent: 0,
      failed: 0,
      skippedRecent: 0,
      days,
    };
  }
  const cutoff = daysAgoKey(days);
  const throttleSince = new Date(Date.now() - days * 86400000);

  const inactive = await db
    .select({
      userId: characters.userId,
      displayName: characters.displayName,
      lastActiveDate: characters.lastActiveDate,
      preferredLocale: users.preferredLocale,
    })
    .from(characters)
    .innerJoin(users, eq(users.id, characters.userId))
    .where(and(isNotNull(characters.lastActiveDate), lt(characters.lastActiveDate, cutoff)))
    .limit(500);

  let sent = 0;
  let failed = 0;
  let skippedRecent = 0;

  for (const row of inactive) {
    const recent = await db.query.activityEvents.findFirst({
      where: and(
        eq(activityEvents.userId, row.userId),
        eq(activityEvents.kind, "push_reengage_sent"),
        gte(activityEvents.createdAt, throttleSince),
      ),
    });
    if (recent) {
      skippedRecent += 1;
      continue;
    }

    const uk = (row.preferredLocale ?? "uk") === "uk";
    const title = uk ? "Повертайся до навчання 🔥" : "Come back and learn 🔥";
    const body = uk
      ? `${row.displayName}, тебе не було ${days}+ днів. 1 короткий урок — і серія знову з тобою.`
      : `${row.displayName}, you've been away ${days}+ days. One short lesson keeps your streak.`;

    const r = await sendPushToUser(db, row.userId, {
      title,
      body,
      href: "/learn",
      tag: "reengage",
    });
    if (r.sent > 0) {
      sent += 1;
      await logActivity(db, row.userId, "push_reengage_sent", {
        days,
        lastActiveDate: row.lastActiveDate,
      });
    } else {
      failed += 1;
    }
  }

  return {
    scanned: inactive.length,
    eligible: inactive.length - skippedRecent,
    sent,
    failed,
    skippedRecent,
    days,
  };
}
