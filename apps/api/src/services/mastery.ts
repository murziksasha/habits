import { and, asc, desc, eq, lt, sql } from "drizzle-orm";
import { courses, lessons, userLessonProgress } from "@eduforge/db";
import { db } from "../db.js";

export type WeakLesson = {
  lessonId: string;
  titleUk: string;
  titleEn: string;
  courseSlug: string;
  bestScore: number;
  attempts: number;
  /** High attempts + low score = leech */
  leech?: boolean;
  completedAt?: Date | null;
};

/**
 * Lessons the learner tried but has not mastered (score &lt; threshold).
 * Used for review queue / next-steps mastery prioritization.
 */
export async function getWeakLessons(
  userId: string,
  opts?: { limit?: number; scoreBelow?: number },
): Promise<WeakLesson[]> {
  const limit = opts?.limit ?? 5;
  const scoreBelow = opts?.scoreBelow ?? 0.85;

  const rows = await db
    .select({
      lessonId: lessons.id,
      titleUk: lessons.titleUk,
      titleEn: lessons.titleEn,
      courseSlug: courses.slug,
      bestScore: userLessonProgress.bestScore,
      attempts: userLessonProgress.attempts,
    })
    .from(userLessonProgress)
    .innerJoin(lessons, eq(lessons.id, userLessonProgress.lessonId))
    .innerJoin(courses, eq(courses.id, lessons.courseId))
    .where(
      and(
        eq(userLessonProgress.userId, userId),
        sql`${userLessonProgress.bestScore} < ${scoreBelow}`,
        sql`${userLessonProgress.attempts} > 0`,
      ),
    )
    .orderBy(asc(userLessonProgress.bestScore), asc(userLessonProgress.attempts))
    .limit(limit);

  return rows.map((r) => ({
    lessonId: r.lessonId,
    titleUk: r.titleUk,
    titleEn: r.titleEn || r.titleUk,
    courseSlug: r.courseSlug,
    bestScore: r.bestScore,
    attempts: r.attempts,
    leech: r.attempts >= 4 && r.bestScore < 0.7,
  }));
}

export function masteryPriority(bestScore: number, attempts: number): number {
  // Lower score + more attempts → higher review urgency (base ~16–20)
  const scorePart = (1 - Math.min(1, Math.max(0, bestScore))) * 6;
  const attemptPart = Math.min(3, Math.log2(1 + attempts));
  const leechBoost = attempts >= 4 && bestScore < 0.7 ? 3 : 0;
  return 14 + scorePart + attemptPart + leechBoost;
}

/**
 * Completed lessons due for spaced re-practice (interval grows with mastery).
 * Score &lt; 0.95 and completed long enough ago based on attempts.
 */
export async function getSpacedReviewLessons(
  userId: string,
  opts?: { limit?: number },
): Promise<WeakLesson[]> {
  const limit = opts?.limit ?? 5;
  const now = Date.now();
  const rows = await db
    .select({
      lessonId: lessons.id,
      titleUk: lessons.titleUk,
      titleEn: lessons.titleEn,
      courseSlug: courses.slug,
      bestScore: userLessonProgress.bestScore,
      attempts: userLessonProgress.attempts,
      completedAt: userLessonProgress.completedAt,
    })
    .from(userLessonProgress)
    .innerJoin(lessons, eq(lessons.id, userLessonProgress.lessonId))
    .innerJoin(courses, eq(courses.id, lessons.courseId))
    .where(
      and(
        eq(userLessonProgress.userId, userId),
        eq(userLessonProgress.status, "completed"),
        lt(userLessonProgress.bestScore, 0.95),
        sql`${userLessonProgress.completedAt} is not null`,
      ),
    )
    .orderBy(asc(userLessonProgress.bestScore), desc(userLessonProgress.completedAt))
    .limit(40);

  const due = rows.filter((r) => {
    if (!r.completedAt) return false;
    const score = r.bestScore ?? 0;
    // Interval days: better score → longer wait (1–14d)
    const intervalDays = Math.min(14, Math.max(1, Math.floor(1 + score * 12)));
    const dueAt = r.completedAt.getTime() + intervalDays * 86_400_000;
    return dueAt <= now;
  });

  return due.slice(0, limit).map((r) => ({
    lessonId: r.lessonId,
    titleUk: r.titleUk,
    titleEn: r.titleEn || r.titleUk,
    courseSlug: r.courseSlug,
    bestScore: r.bestScore,
    attempts: r.attempts,
    leech: r.attempts >= 4 && r.bestScore < 0.7,
    completedAt: r.completedAt,
  }));
}
