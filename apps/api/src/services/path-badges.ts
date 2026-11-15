import { eq } from "drizzle-orm";
import { characters, courses, userCourseProgress } from "@eduforge/db";
import {
  PATH_BADGE_CATALOG,
  applyLevelUps,
  normalizeProgression,
  unlockPathBadges,
  type PathBadgeDef,
} from "@eduforge/shared";
import { db } from "../db.js";
import { evaluateAchievements, logActivity, notifyUser } from "../engagement.js";

/** Recompute path badges from course progress; persist + notify for new ones. */
export async function syncPathBadges(userId: string): Promise<{
  newlyUnlocked: PathBadgeDef[];
  pathBadges: string[];
}> {
  const ch = await db.query.characters.findFirst({
    where: eq(characters.userId, userId),
  });
  if (!ch) return { newlyUnlocked: [], pathBadges: [] };

  const rows = await db
    .select({
      slug: courses.slug,
      completedLessons: userCourseProgress.completedLessons,
    })
    .from(userCourseProgress)
    .innerJoin(courses, eq(courses.id, userCourseProgress.courseId))
    .where(eq(userCourseProgress.userId, userId));

  const bySlug: Record<string, number> = {};
  for (const r of rows) {
    bySlug[r.slug] = r.completedLessons ?? 0;
  }

  let progression = applyLevelUps(normalizeProgression(ch.progression), ch.globalLevel);
  const { progression: next, newlyUnlocked } = unlockPathBadges(progression, bySlug);
  if (newlyUnlocked.length === 0) {
    return { newlyUnlocked: [], pathBadges: next.pathBadges ?? [] };
  }

  await db
    .update(characters)
    .set({ progression: next })
    .where(eq(characters.id, ch.id));

  for (const badge of newlyUnlocked) {
    await logActivity(db, userId, "path_badge", { badgeId: badge.id, courseSlug: badge.courseSlug });
    await notifyUser(db, userId, {
      type: "path_badge",
      titleUk: `${badge.icon} Path badge: ${badge.titleUk}`,
      titleEn: `${badge.icon} Path badge: ${badge.titleEn}`,
      bodyUk: `${badge.descUk} · +${badge.rewardSkillPoints} SP`,
      bodyEn: `${badge.descEn} · +${badge.rewardSkillPoints} SP`,
      href: "/profile",
    });
  }

  const pathBadges = next.pathBadges ?? [];
  await evaluateAchievements(db, userId, {
    pathBadgeEarned: true,
    pathBadgeCount: pathBadges.length,
  });

  return { newlyUnlocked, pathBadges };
}

export function pathBadgeCatalog() {
  return PATH_BADGE_CATALOG;
}
