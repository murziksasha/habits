import { Hono } from "hono";
import { and, eq } from "drizzle-orm";
import {
  DAILY_LOGIN_BASE_XP,
  DAILY_LOGIN_STREAK_BONUS,
  DAILY_LOGIN_STREAK_CAP,
  HEART_REGEN_MINUTES,
  applyLevelUps,
  heartRegenMinutesBonus,
  isPaidPlan,
  levelFromXp,
  maxHearts,
  normalizeProgression,
  regenerateHearts,
  resolveFeatureFlags,
  todayUtc,
  type Plan,
} from "@eduforge/shared";
import { characters, courses, userDailyQuests, userCourseProgress } from "@eduforge/db";
import { authMiddleware, optionalAuth, type AuthedUser } from "../auth.js";
import { db } from "../db.js";
import { buildHomePayload } from "../services/home.js";
import { logActivity, notifyUser } from "../engagement.js";
import { bumpDailyQuests } from "./quests.js";

type Vars = { user: AuthedUser };

export const meRoutes = new Hono<{ Variables: Vars }>();

/** Dashboard BFF — progress, next steps, exams, race, activity. */
meRoutes.get("/home", authMiddleware, async (c) => {
  const user = c.get("user");
  const payload = await buildHomePayload(user.id);
  return c.json(payload);
});

/**
 * Daily login check-in: XP scaled by streak, bumps login quest.
 * Idempotent per UTC day (activity_events kind login_bonus).
 */
meRoutes.post("/login-bonus", authMiddleware, async (c) => {
  const user = c.get("user");
  const date = todayUtc();

  // Use quests row login_1 claimed/progress as day lock + activity log
  await bumpDailyQuests(user.id, "login", 1);
  const loginQuest = await db.query.userDailyQuests.findFirst({
    where: and(
      eq(userDailyQuests.userId, user.id),
      eq(userDailyQuests.questDate, date),
      eq(userDailyQuests.questKey, "login_1"),
    ),
  });
  // If already claimed the login quest reward path via separate claim — still allow bonus once
  // Store claim flag in onboarding jsonb key dailyLoginDate
  const ch = await db.query.characters.findFirst({
    where: eq(characters.userId, user.id),
  });
  if (!ch) return c.json({ error: "no_character" }, 404);

  const onboarding = {
    ...((ch.onboarding ?? {}) as Record<string, unknown>),
  };
  if (onboarding.dailyLoginDate === date) {
    return c.json({
      ok: true,
      alreadyClaimed: true,
      rewardXp: 0,
      character: ch,
      quest: loginQuest,
    });
  }

  const streak = Math.min(DAILY_LOGIN_STREAK_CAP, Math.max(0, ch.streakDays ?? 0));
  const rewardXp =
    DAILY_LOGIN_BASE_XP + Math.min(DAILY_LOGIN_STREAK_CAP, streak) * DAILY_LOGIN_STREAK_BONUS;

  const globalXp = ch.globalXp + rewardXp;
  const globalLevel = levelFromXp(globalXp);
  const progression = applyLevelUps(normalizeProgression(ch.progression), globalLevel);
  onboarding.dailyLoginDate = date;

  const [updated] = await db
    .update(characters)
    .set({
      globalXp,
      globalLevel,
      progression,
      onboarding: onboarding as typeof ch.onboarding,
    })
    .where(eq(characters.id, ch.id))
    .returning();

  await logActivity(db, user.id, "login_bonus", { rewardXp, date, streak });
  await notifyUser(db, user.id, {
    type: "login_bonus",
    titleUk: "Щоденний бонус 🎁",
    titleEn: "Daily bonus 🎁",
    bodyUk: `+${rewardXp} XP за вхід (серія ${streak})`,
    bodyEn: `+${rewardXp} XP for check-in (streak ${streak})`,
    href: "/dashboard",
  });

  return c.json({
    ok: true,
    alreadyClaimed: false,
    rewardXp,
    streak,
    character: updated,
    quest: loginQuest,
  });
});

/**
 * Aggregate hearts for nav chrome: most restrictive (lowest) course after regen.
 * Free users without progress rows get a full free stack.
 */
meRoutes.get("/hearts", authMiddleware, async (c) => {
  const user = c.get("user");
  const plan = user.plan as Plan;
  const ch = await db.query.characters.findFirst({
    where: eq(characters.userId, user.id),
  });
  const prog = normalizeProgression(ch?.progression);
  const max = maxHearts(plan, prog);
  const regenMinutes = Math.max(
    10,
    HEART_REGEN_MINUTES - heartRegenMinutesBonus(prog),
  );
  if (isPaidPlan(plan)) {
    return c.json({
      hearts: max,
      maxHearts: max,
      heartsUpdatedAt: null as string | null,
      isPremium: true,
      regenMinutes,
      courseSlug: null as string | null,
    });
  }

  const rows = await db
    .select({
      hearts: userCourseProgress.hearts,
      heartsUpdatedAt: userCourseProgress.heartsUpdatedAt,
      slug: courses.slug,
      id: userCourseProgress.id,
    })
    .from(userCourseProgress)
    .innerJoin(courses, eq(courses.id, userCourseProgress.courseId))
    .where(eq(userCourseProgress.userId, user.id));

  if (!rows.length) {
    return c.json({
      hearts: max,
      maxHearts: max,
      heartsUpdatedAt: null as string | null,
      isPremium: false,
      regenMinutes,
      courseSlug: null as string | null,
    });
  }

  let best = {
    hearts: max,
    heartsUpdatedAt: null as Date | null,
    slug: null as string | null,
    id: null as string | null,
  };

  for (const row of rows) {
    const regen = regenerateHearts({
      plan,
      hearts: row.hearts,
      heartsUpdatedAt: row.heartsUpdatedAt,
      regenMinutes,
      progression: prog,
    });
    if (regen.changed) {
      await db
        .update(userCourseProgress)
        .set({ hearts: regen.hearts, heartsUpdatedAt: regen.heartsUpdatedAt })
        .where(eq(userCourseProgress.id, row.id));
    }
    if (regen.hearts < best.hearts) {
      best = {
        hearts: regen.hearts,
        heartsUpdatedAt: regen.heartsUpdatedAt,
        slug: row.slug,
        id: row.id,
      };
    }
  }

  return c.json({
    hearts: best.hearts,
    maxHearts: max,
    heartsUpdatedAt: best.heartsUpdatedAt
      ? best.heartsUpdatedAt.toISOString()
      : null,
    isPremium: false,
    regenMinutes,
    courseSlug: best.slug,
  });
});

/** Public-ish feature flags (no secrets) for web clients. */
meRoutes.get("/flags", optionalAuth, async (c) => {
  const flags = resolveFeatureFlags();
  return c.json({
    flags: {
      labs: flags.labs,
      tutorAi: flags.tutor_ai,
      strictCsrf: flags.strict_csrf,
      parentDigest: flags.parent_digest,
      pushReengage: flags.push_reengage,
      emailVerify: flags.email_verify,
      requireEmailVerify: flags.require_email_verify,
      devBilling: flags.dev_billing,
    },
  });
});
