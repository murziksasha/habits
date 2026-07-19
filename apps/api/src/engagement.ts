import { and, eq, gte, inArray, like, sql } from "drizzle-orm";
import {
  achievements,
  activityEvents,
  characters,
  courses,
  learningMilestones,
  lessons,
  notifications,
  userAchievements,
  userLessonProgress,
} from "@eduforge/db";
import {
  ACHIEVEMENT_CATALOG,
  isoWeekBounds,
  levelFromXp,
  PROGRAMMING_MINI_LESSON_SLUGS,
  weeklyMinisRaceSlugs,
} from "@eduforge/shared";
import type { Db } from "@eduforge/db";

export async function ensureAchievementCatalog(db: Db) {
  for (const a of ACHIEVEMENT_CATALOG) {
    const existing = await db.query.achievements.findFirst({
      where: eq(achievements.code, a.code),
    });
    if (!existing) {
      await db.insert(achievements).values(a);
    }
  }
}

export async function logActivity(
  db: Db,
  userId: string,
  kind: string,
  payload: Record<string, unknown> = {},
) {
  await db.insert(activityEvents).values({ userId, kind, payload });
}

export async function notifyUser(
  db: Db,
  userId: string,
  opts: {
    type?: string;
    titleUk: string;
    titleEn: string;
    bodyUk?: string;
    bodyEn?: string;
    href?: string;
  },
) {
  await db.insert(notifications).values({
    userId,
    type: opts.type ?? "info",
    titleUk: opts.titleUk,
    titleEn: opts.titleEn,
    bodyUk: opts.bodyUk ?? "",
    bodyEn: opts.bodyEn ?? "",
    href: opts.href,
  });
  // Best-effort web push (ignore failures)
  try {
    const { sendPushToUser } = await import("./push.js");
    await sendPushToUser(db, userId, {
      title: opts.titleUk || opts.titleEn,
      body: opts.bodyUk || opts.bodyEn || "",
      href: opts.href ?? "/dashboard",
      tag: opts.type ?? "info",
    });
  } catch {
    /* push optional */
  }
}

async function unlock(
  db: Db,
  userId: string,
  code: string,
): Promise<{ code: string; titleUk: string; titleEn: string; icon: string } | null> {
  const ach = await db.query.achievements.findFirst({
    where: eq(achievements.code, code),
  });
  if (!ach) return null;

  const has = await db.query.userAchievements.findFirst({
    where: and(
      eq(userAchievements.userId, userId),
      eq(userAchievements.achievementId, ach.id),
    ),
  });
  if (has) return null;

  await db.insert(userAchievements).values({
    userId,
    achievementId: ach.id,
  });

  if (ach.xpReward > 0) {
    const ch = await db.query.characters.findFirst({
      where: eq(characters.userId, userId),
    });
    if (ch) {
      const newXp = ch.globalXp + ach.xpReward;
      await db
        .update(characters)
        .set({ globalXp: newXp, globalLevel: levelFromXp(newXp) })
        .where(eq(characters.id, ch.id));
    }
  }

  await notifyUser(db, userId, {
    type: "achievement",
    titleUk: `Досягнення: ${ach.titleUk}`,
    titleEn: `Achievement: ${ach.titleEn}`,
    bodyUk: ach.descriptionUk,
    bodyEn: ach.descriptionEn,
    href: "/achievements",
  });

  await logActivity(db, userId, "achievement_unlocked", { code: ach.code });

  return {
    code: ach.code,
    titleUk: ach.titleUk,
    titleEn: ach.titleEn,
    icon: ach.icon,
  };
}

export type UnlockContext = {
  lessonCompleted?: boolean;
  courseSlug?: string;
  streakDays?: number;
  globalLevel?: number;
  dailyGoalMet?: boolean;
  chessPlayed?: boolean;
  joinedClass?: boolean;
  joinedTournament?: boolean;
  playgroundChallenge?: boolean;
  /** Weekly programming minis race: score this week / rank after claim */
  minisRaceScore?: number;
  minisRaceRank?: number;
  /** Unit exam just passed */
  examPassed?: boolean;
};

/** Evaluate and unlock achievements; returns newly unlocked list */
export async function evaluateAchievements(
  db: Db,
  userId: string,
  ctx: UnlockContext,
): Promise<{ code: string; titleUk: string; titleEn: string; icon: string }[]> {
  await ensureAchievementCatalog(db);
  const unlocked: { code: string; titleUk: string; titleEn: string; icon: string }[] = [];

  const tryUnlock = async (code: string) => {
    const u = await unlock(db, userId, code);
    if (u) unlocked.push(u);
  };

  if (ctx.lessonCompleted) {
    await tryUnlock("first_lesson");
    const [row] = await db
      .select({ n: sql<number>`count(*)::int` })
      .from(userLessonProgress)
      .where(
        and(
          eq(userLessonProgress.userId, userId),
          eq(userLessonProgress.status, "completed"),
        ),
      );
    if ((row?.n ?? 0) >= 10) await tryUnlock("lessons_10");
    if (ctx.courseSlug === "english" && (row?.n ?? 0) >= 1) {
      // count english completions more carefully via join would be better; simple path:
      await tryUnlock("english_path"); // will re-check via unlock uniqueness only once; for 5 lessons we need count
    }
  }

  // English 5 lessons: count skill attempts or lesson progress with course
  if (ctx.lessonCompleted && ctx.courseSlug === "english") {
    const eng = await db.query.userLessonProgress.findMany({
      where: and(
        eq(userLessonProgress.userId, userId),
        eq(userLessonProgress.status, "completed"),
      ),
    });
    if (eng.length >= 5) await tryUnlock("english_path");
  }

  if (ctx.examPassed) {
    await tryUnlock("exam_first");
    const [examCnt] = await db
      .select({ n: sql<number>`count(*)::int` })
      .from(userLessonProgress)
      .innerJoin(lessons, eq(lessons.id, userLessonProgress.lessonId))
      .where(
        and(
          eq(userLessonProgress.userId, userId),
          eq(userLessonProgress.status, "completed"),
          eq(lessons.isExam, true),
        ),
      );
    if ((examCnt?.n ?? 0) >= 3) await tryUnlock("exam_three");
  }

  if (ctx.lessonCompleted && ctx.courseSlug === "typescript") {
    await tryUnlock("ts_course_start");
  }
  if (ctx.lessonCompleted && ctx.courseSlug === "html_semantics") {
    await tryUnlock("html_semantics_start");
  }
  if (ctx.lessonCompleted && ctx.courseSlug === "css_layout") {
    await tryUnlock("css_layout_start");
  }
  if (ctx.lessonCompleted && ctx.courseSlug === "qa_theory") {
    await tryUnlock("qa_theory_start");
  }
  if (ctx.lessonCompleted && ctx.courseSlug === "js_fundamentals") {
    await tryUnlock("js_fundamentals_start");
  }
  if (ctx.lessonCompleted && ctx.courseSlug === "react_fundamentals") {
    await tryUnlock("react_fundamentals_start");
  }
  if (ctx.lessonCompleted && ctx.courseSlug === "sql_fundamentals") {
    await tryUnlock("sql_fundamentals_start");
  }
  if (ctx.lessonCompleted && ctx.courseSlug === "node_fundamentals") {
    await tryUnlock("node_fundamentals_start");
  }
  if (ctx.lessonCompleted && ctx.courseSlug === "express_fundamentals") {
    await tryUnlock("express_fundamentals_start");
  }

  if (ctx.lessonCompleted && ctx.courseSlug === "programming") {
    await tryUnlock("code_first_lesson");
    const prog = await db.query.courses.findFirst({
      where: eq(courses.slug, "programming"),
    });
    if (prog) {
      const [cnt] = await db
        .select({ n: sql<number>`count(*)::int` })
        .from(userLessonProgress)
        .where(
          and(
            eq(userLessonProgress.userId, userId),
            eq(userLessonProgress.courseId, prog.id),
            eq(userLessonProgress.status, "completed"),
          ),
        );
      const n = cnt?.n ?? 0;
      if (n >= 5) await tryUnlock("code_lessons_5");
      if (n >= 15) await tryUnlock("code_lessons_15");

      // Mini-projects completed (by lesson slug)
      const miniSlugs = [...PROGRAMMING_MINI_LESSON_SLUGS];
      const [miniCnt] = await db
        .select({ n: sql<number>`count(*)::int` })
        .from(userLessonProgress)
        .innerJoin(lessons, eq(lessons.id, userLessonProgress.lessonId))
        .where(
          and(
            eq(userLessonProgress.userId, userId),
            eq(userLessonProgress.courseId, prog.id),
            eq(userLessonProgress.status, "completed"),
            inArray(lessons.slug, miniSlugs),
          ),
        );
      const mn = miniCnt?.n ?? 0;
      if (mn >= 3) await tryUnlock("code_mini_3");
      if (mn >= miniSlugs.length) await tryUnlock("code_mini_all");

      // Weekly minis race participation (score ≥1 this week)
      const raceSlugs = weeklyMinisRaceSlugs();
      const { startsAt } = isoWeekBounds();
      const raceLessonIds = (
        await db.query.lessons.findMany({
          where: eq(lessons.courseId, prog.id),
        })
      )
        .filter((l) => raceSlugs.includes(l.slug))
        .map((l) => l.id);
      if (raceLessonIds.length) {
        const [raceCnt] = await db
          .select({ n: sql<number>`count(*)::int` })
          .from(userLessonProgress)
          .where(
            and(
              eq(userLessonProgress.userId, userId),
              eq(userLessonProgress.courseId, prog.id),
              eq(userLessonProgress.status, "completed"),
              inArray(userLessonProgress.lessonId, raceLessonIds),
              gte(userLessonProgress.completedAt, startsAt),
            ),
          );
        if ((raceCnt?.n ?? 0) >= 1) await tryUnlock("code_minis_race_run");
      }
    }
  }

  if (ctx.playgroundChallenge) {
    await tryUnlock("pg_first_challenge");
    const [pgCnt] = await db
      .select({ n: sql<number>`count(*)::int` })
      .from(learningMilestones)
      .where(
        and(
          eq(learningMilestones.userId, userId),
          like(learningMilestones.code, "pg_ch_%"),
        ),
      );
    const pn = pgCnt?.n ?? 0;
    if (pn >= 5) await tryUnlock("pg_challenges_5");
    if (pn >= 10) await tryUnlock("pg_challenges_10");
  }

  if ((ctx.minisRaceScore ?? 0) >= 1) {
    await tryUnlock("code_minis_race_run");
  }
  if ((ctx.minisRaceRank ?? 0) >= 1 && (ctx.minisRaceRank ?? 99) <= 3) {
    await tryUnlock("code_minis_race_podium");
  }
  if (ctx.minisRaceRank === 1) {
    await tryUnlock("code_minis_race_win");
  }

  if ((ctx.streakDays ?? 0) >= 3) await tryUnlock("streak_3");
  if ((ctx.streakDays ?? 0) >= 7) await tryUnlock("streak_7");
  if ((ctx.globalLevel ?? 0) >= 5) await tryUnlock("level_5");
  if (ctx.dailyGoalMet) await tryUnlock("daily_goal");
  if (ctx.chessPlayed) await tryUnlock("chess_player");
  if (ctx.joinedClass) await tryUnlock("social_learner");
  if (ctx.joinedTournament) await tryUnlock("tournament_entry");

  return unlocked;
}
