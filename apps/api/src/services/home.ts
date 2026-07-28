import { desc, eq } from "drizzle-orm";
import {
  activityEvents,
  courses,
  userCourseProgress,
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
  slug: string;
  titleUk: string;
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
      slug: courses.slug,
      titleUk: courses.titleUk,
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

/** Dashboard BFF payload — direct service calls, no internal HTTP. */
export async function buildHomePayload(userId: string): Promise<HomePayload> {
  const meta = {
    progressOk: true,
    activityOk: true,
    nextOk: true,
    examsOk: true,
    raceOk: true,
  };

  const [progressR, activityR, nextR, examsR, raceR] = await Promise.allSettled([
    getCourseProgress(userId),
    getRecentActivity(userId, 12),
    buildNextRecommendations(userId, 5),
    buildExamBoard(userId),
    buildMinisRace(userId),
  ]);

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
