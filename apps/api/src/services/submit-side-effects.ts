/**
 * Best-effort post-submit side effects. Failures are logged, never fail the lesson grade.
 */

import type { AuthedUser } from "../auth.js";
import { db } from "../db.js";
import { evaluateAchievements, logActivity, notifyUser } from "../engagement.js";
import { log } from "../logger.js";

export type SubmitSideEffectCtx = {
  user: AuthedUser;
  courseSlug: string;
  courseId: string;
  courseTitleUk: string;
  courseTitleEn: string;
  lessonId: string;
  passed: boolean;
  firstClear: boolean;
  isExam: boolean;
  accuracy: number;
  completeBar: number;
  xpGain: number;
  globalGain: number;
  results: {
    exerciseId: string;
    type?: string;
    correct: boolean;
    partial?: number;
    meta?: Record<string, unknown>;
  }[];
  streakDays?: number;
  globalLevel?: number;
  dailyGoalMet: boolean;
};

export type SideEffectExtras = {
  homeworkCompleted: number;
  newAchievements: Awaited<ReturnType<typeof evaluateAchievements>>;
  certificate: { code: string; titleUk: string } | null;
};

async function safe(
  label: string,
  userId: string,
  fn: () => Promise<void>,
): Promise<void> {
  try {
    await fn();
  } catch (err) {
    log.warn("submit_side_effect_failed", {
      label,
      userId,
      err: err instanceof Error ? err.message : String(err),
    });
  }
}

/** Run non-critical side effects after core progress is committed. */
export async function runSubmitSideEffects(
  ctx: SubmitSideEffectCtx,
): Promise<SideEffectExtras> {
  let homeworkCompleted = 0;
  let newAchievements: SideEffectExtras["newAchievements"] = [];
  let certificate: SideEffectExtras["certificate"] = null;
  const { user } = ctx;

  if (ctx.passed) {
    await safe("log_lesson_completed", user.id, async () => {
      await logActivity(db, user.id, ctx.isExam ? "exam_passed" : "lesson_completed", {
        courseSlug: ctx.courseSlug,
        lessonId: ctx.lessonId,
        xpGain: ctx.xpGain,
        isExam: ctx.isExam,
        accuracy: ctx.accuracy,
      });
    });

    if (ctx.firstClear) {
      await safe("first_lesson_complete", user.id, async () => {
        const { trackProductEvent } = await import("./product-analytics.js");
        await trackProductEvent(db, user.id, "first_lesson_complete", {
          courseSlug: ctx.courseSlug,
          lessonId: ctx.lessonId,
          accuracy: ctx.accuracy,
          isExam: ctx.isExam,
        });
      });
    }

    await safe("weekly_xp", user.id, async () => {
      const { addWeeklyXp } = await import("../routes/challenges.js");
      await addWeeklyXp(user.id, ctx.globalGain);
    });

    await safe("homework", user.id, async () => {
      const { completeHomeworkForLesson } = await import("../routes/homework.js");
      homeworkCompleted = await completeHomeworkForLesson(
        user.id,
        ctx.lessonId,
        ctx.accuracy,
      );
    });

    await safe("daily_quests", user.id, async () => {
      const { bumpDailyQuests } = await import("../routes/quests.js");
      await bumpDailyQuests(user.id, "lessons", 1);
      if (ctx.globalGain > 0) await bumpDailyQuests(user.id, "xp", ctx.globalGain);
      if (ctx.isExam) await bumpDailyQuests(user.id, "exams", 1);
    });

    await safe("weekly_quest_path_badges", user.id, async () => {
      const { isoWeekKey, bumpWeeklyProgress, applyLevelUps, normalizeProgression } =
        await import("@eduforge/shared");
      const { characters } = await import("@eduforge/db");
      const { eq } = await import("drizzle-orm");
      const ch2 = await db.query.characters.findFirst({
        where: eq(characters.userId, user.id),
      });
      if (ch2) {
        let prog = applyLevelUps(normalizeProgression(ch2.progression), ch2.globalLevel);
        prog = bumpWeeklyProgress(prog, isoWeekKey(), "lessons", 1);
        await db
          .update(characters)
          .set({ progression: prog })
          .where(eq(characters.id, ch2.id));
      }
      const { syncPathBadges } = await import("./path-badges.js");
      await syncPathBadges(user.id);
    });

    await safe("learning_milestones", user.id, async () => {
      const { evaluateLearningMilestones } = await import("../routes/learning.js");
      await evaluateLearningMilestones(user.id);
    });

    await safe("certificate", user.id, async () => {
      const { maybeIssueCertificate } = await import("../routes/certificates.js");
      const cert = await maybeIssueCertificate(
        user.id,
        ctx.courseId,
        ctx.courseSlug,
        ctx.courseTitleUk,
        ctx.courseTitleEn,
      );
      if (cert) {
        certificate = { code: cert.code, titleUk: cert.titleUk };
      }
    });
  } else if (ctx.isExam) {
    const wrongTypes = [
      ...new Set(ctx.results.filter((r) => !r.correct).map((r) => String(r.type || "unknown"))),
    ];
    await safe("exam_failed_log", user.id, async () => {
      await logActivity(db, user.id, "exam_failed", {
        courseSlug: ctx.courseSlug,
        lessonId: ctx.lessonId,
        accuracy: ctx.accuracy,
        passThreshold: ctx.completeBar,
        wrongTypes,
        wrongExerciseIds: ctx.results.filter((r) => !r.correct).map((r) => r.exerciseId),
      });
    });
    await safe("exam_failed_notify", user.id, async () => {
      await notifyUser(db, user.id, {
        type: "learning",
        titleUk: "Контрольна: час на повторення",
        titleEn: "Exam: time to review",
        bodyUk: `Точність ${Math.round(ctx.accuracy * 100)}%. Відкрий /review — слабкі типи: ${wrongTypes.slice(0, 4).join(", ") || "—"}.`,
        bodyEn: `Score ${Math.round(ctx.accuracy * 100)}%. Open /review — weak types: ${wrongTypes.slice(0, 4).join(", ") || "—"}.`,
        href: "/review?from=exam",
      });
    });
  }

  if (!ctx.passed) {
    const wrong = ctx.results.filter((r) => !r.correct).slice(0, 6);
    await safe("lesson_fail_context", user.id, async () => {
      await logActivity(db, user.id, "lesson_fail_context", {
        courseSlug: ctx.courseSlug,
        lessonId: ctx.lessonId,
        isExam: ctx.isExam,
        accuracy: ctx.accuracy,
        wrong: wrong.map((r) => ({
          exerciseId: r.exerciseId,
          type: r.type,
          missing: r.meta?.missing ?? null,
          partial: r.partial ?? null,
        })),
      });
    });
  }

  await safe("achievements", user.id, async () => {
    newAchievements = await evaluateAchievements(db, user.id, {
      lessonCompleted: ctx.passed,
      courseSlug: ctx.courseSlug,
      streakDays: ctx.streakDays,
      globalLevel: ctx.globalLevel,
      dailyGoalMet: ctx.dailyGoalMet,
      examPassed: ctx.isExam && ctx.passed,
    });
  });

  return { homeworkCompleted, newAchievements, certificate };
}
