import { and, eq, sql } from "drizzle-orm";
import { botUnlocks, type BotUnlockId, type BotUnlockState } from "@eduforge/shared";
import { courses, lessons, units, userLessonProgress } from "@eduforge/db";
import { db } from "../db.js";

/** Chess course progress → which bot personalities are open for this learner. */
export async function chessBotUnlocksFor(user: { id: string; role?: string | null }): Promise<Record<BotUnlockId, BotUnlockState>> {
  const rows = await db
    .select({
      unitSlug: units.slug,
      total: sql<number>`count(${lessons.id})::int`,
      done: sql<number>`count(${userLessonProgress.id}) filter (where ${userLessonProgress.status} = 'completed')::int`,
    })
    .from(lessons)
    .innerJoin(units, eq(units.id, lessons.unitId))
    .innerJoin(courses, eq(courses.id, lessons.courseId))
    .leftJoin(userLessonProgress, and(eq(userLessonProgress.lessonId, lessons.id), eq(userLessonProgress.userId, user.id)))
    .where(eq(courses.slug, "chess"))
    .groupBy(units.slug);
  const completedLessons = rows.reduce((s, r) => s + r.done, 0);
  const completedUnitSlugs = rows.filter((r) => r.total > 0 && r.done >= r.total).map((r) => r.unitSlug);
  return botUnlocks({ completedLessons, completedUnitSlugs, isAdmin: user.role === "admin" });
}
