import { Hono } from "hono";
import { eq } from "drizzle-orm";
import {
  HEART_REGEN_MINUTES,
  isPaidPlan,
  maxHearts,
  regenerateHearts,
  resolveFeatureFlags,
  type Plan,
} from "@eduforge/shared";
import { courses, userCourseProgress } from "@eduforge/db";
import { authMiddleware, optionalAuth, type AuthedUser } from "../auth.js";
import { db } from "../db.js";
import { buildHomePayload } from "../services/home.js";

type Vars = { user: AuthedUser };

export const meRoutes = new Hono<{ Variables: Vars }>();

/** Dashboard BFF — progress, next steps, exams, race, activity. */
meRoutes.get("/home", authMiddleware, async (c) => {
  const user = c.get("user");
  const payload = await buildHomePayload(user.id);
  return c.json(payload);
});

/**
 * Aggregate hearts for nav chrome: most restrictive (lowest) course after regen.
 * Free users without progress rows get a full free stack.
 */
meRoutes.get("/hearts", authMiddleware, async (c) => {
  const user = c.get("user");
  const plan = user.plan as Plan;
  const max = maxHearts(plan);
  if (isPaidPlan(plan)) {
    return c.json({
      hearts: max,
      maxHearts: max,
      heartsUpdatedAt: null as string | null,
      isPremium: true,
      regenMinutes: HEART_REGEN_MINUTES,
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
      regenMinutes: HEART_REGEN_MINUTES,
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
    regenMinutes: HEART_REGEN_MINUTES,
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
