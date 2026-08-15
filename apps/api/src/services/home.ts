import { asc, desc, eq } from "drizzle-orm";
import {
  activityEvents,
  courses,
  userCourseProgress,
  userLessonProgress,
} from "@eduforge/db";
import { db } from "../db.js";
import { buildExamBoard } from "./exam-board.js";
import { buildMinisRace } from "./minis-race.js";
import { buildNextRecommendations } from "./next-steps.js";

export type HomeProgressRow = {
  courseId: string;
  xp: number;
  level: number;
  completedLessons: number;
  hearts: number;
  lastLessonId: string | null;
  slug: string;
  titleUk: string;
  titleEn: string | null;
  icon: string;
  color: string;
};

export type HomePayload = {
  progress: HomeProgressRow[];
  activity: {
    id: string;
    kind: string;
    payload: Record<string, unknown>;
    createdAt: Date;
  }[];
  recommendations: Awaited<
    ReturnType<typeof buildNextRecommendations>
  >["recommendations"];
  examBoard: { summary: Awaited<ReturnType<typeof buildExamBoard>>["summary"] } | null;
  minisRace: {
    weekKey: string;
    totalRace: number;
    me: { rank: number; score: number; canClaim: boolean } | null;
    raceMeta: {
      slug: string;
      completedThisWeek: boolean;
      lessonId: string | null;
    }[];
  } | null;
  meta: {
    progressOk: boolean;
    activityOk: boolean;
    nextOk: boolean;
    examsOk: boolean;
    raceOk: boolean;
  };
};

export async function getCourseProgress(userId: string): Promise<HomeProgressRow[]> {
  return db
    .select({
      courseId: userCourseProgress.courseId,
      xp: userCourseProgress.xp,
      level: userCourseProgress.level,
      completedLessons: userCourseProgress.completedLessons,
      hearts: userCourseProgress.hearts,
      lastLessonId: userCourseProgress.lastLessonId,
      slug: courses.slug,
      titleUk: courses.titleUk,
      titleEn: courses.titleEn,
      icon: courses.icon,
      color: courses.color,
    })
    .from(userCourseProgress)
    .innerJoin(courses, eq(courses.id, userCourseProgress.courseId))
    .where(eq(userCourseProgress.userId, userId));
}

export async function getRecentActivity(userId: string, limit = 12) {
  const rows = await db.query.activityEvents.findMany({
    where: eq(activityEvents.userId, userId),
    orderBy: [desc(activityEvents.createdAt)],
    limit,
  });
  return rows.map((r) => ({
    id: r.id,
    kind: r.kind,
    payload: (r.payload ?? {}) as Record<string, unknown>,
    createdAt: r.createdAt,
  }));
}

/**
 * Dashboard BFF payload — shared catalog + lesson progress prefetch so
 * next-steps and exam-board avoid duplicate catalog scans.
 */
export async function buildHomePayload(userId: string): Promise<HomePayload> {
  const meta = {
    progressOk: true,
    activityOk: true,
    nextOk: true,
    examsOk: true,
    raceOk: true,
  };

  // Shared foundation: courses list + full lesson progress (used by next + exams)
  const [allCoursesR, lessonProgressR, progressR, activityR] = await Promise.allSettled([
    db.query.courses.findMany({ orderBy: [asc(courses.sortOrder)] }),
    db.query.userLessonProgress.findMany({
      where: eq(userLessonProgress.userId, userId),
    }),
    getCourseProgress(userId),
    getRecentActivity(userId, 12),
  ]);

  const allCourses = allCoursesR.status === "fulfilled" ? allCoursesR.value : [];
  const lessonProgress =
    lessonProgressR.status === "fulfilled" ? lessonProgressR.value : [];

  const progress = progressR.status === "fulfilled" ? progressR.value : [];
  if (progressR.status === "rejected") {
    meta.progressOk = false;
    console.error("[home] progress", progressR.reason);
  }

  const activity = activityR.status === "fulfilled" ? activityR.value : [];
  if (activityR.status === "rejected") {
    meta.activityOk = false;
    console.error("[home] activity", activityR.reason);
  }

  const prefetch = {
    courses: allCourses,
    lessonProgress,
    courseProgress: progress.map((p) => ({
      courseId: p.courseId,
      lastLessonId: p.lastLessonId,
      slug: p.slug,
      titleUk: p.titleUk,
      titleEn: p.titleEn,
      icon: p.icon,
      completedLessons: p.completedLessons,
    })),
  };

  const [nextR, examsR, raceR] = await Promise.allSettled([
    buildNextRecommendations(userId, 5, prefetch),
    buildExamBoard(userId, null, {
      courses: allCourses,
      lessonProgress,
    }),
    buildMinisRace(userId),
  ]);

  let recommendations: HomePayload["recommendations"] = [];
  if (nextR.status === "fulfilled") {
    recommendations = nextR.value.recommendations;
  } else {
    meta.nextOk = false;
    console.error("[home] next", nextR.reason);
  }

  let examBoard: HomePayload["examBoard"] = null;
  if (examsR.status === "fulfilled") {
    examBoard = { summary: examsR.value.summary };
  } else {
    meta.examsOk = false;
    console.error("[home] exams", examsR.reason);
  }

  let minisRace: HomePayload["minisRace"] = null;
  if (raceR.status === "fulfilled") {
    const race = raceR.value;
    minisRace = {
      weekKey: race.weekKey,
      totalRace: race.totalRace,
      me: race.me
        ? {
            rank: race.me.rank,
            score: race.me.score,
            canClaim: race.me.canClaim,
          }
        : null,
      raceMeta: race.raceMeta.map((m) => ({
        slug: m.slug,
        completedThisWeek: m.completedThisWeek,
        lessonId: m.lessonId,
      })),
    };
  } else {
    meta.raceOk = false;
    console.error("[home] race", raceR.reason);
  }

  return {
    progress,
    activity,
    recommendations,
    examBoard,
    minisRace,
    meta,
  };
}
