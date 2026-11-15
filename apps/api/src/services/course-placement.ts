import { and, asc, desc, eq, inArray, sql } from "drizzle-orm";
import {
  courses,
  learningMilestones,
  lessons,
  placementResults,
  units,
  userCourseProgress,
  userLessonProgress,
  userUnitPlacements,
} from "@eduforge/db";
import {
  ENGLISH_PLACEMENT,
  PLACEMENT_LEVELS,
  PROGRAMMING_PLACEMENT,
  PROGRAMMING_PLACEMENT_LEVELS,
  buildCoursePlacementBank,
  isCourseSlug,
  planPlacementSkip,
  publicPlacementQuestions,
  recommendPlacementUnit,
  scorePlacement,
  scoreProgrammingPlacement,
  type CoursePlacementBank,
  type PlacementLevel,
  type PlacementUnit,
} from "@eduforge/shared";
import { db } from "../db.js";
import { logActivity, notifyUser } from "../engagement.js";

function dedicatedBank(courseSlug: string): CoursePlacementBank | null {
  if (courseSlug === "english") {
    return {
      questions: ENGLISH_PLACEMENT,
      questionUnitSlugs: ENGLISH_PLACEMENT.map(() => PLACEMENT_LEVELS[0]!.recommendedUnitSlug),
      levels: PLACEMENT_LEVELS,
    };
  }
  if (courseSlug === "programming") {
    return {
      questions: PROGRAMMING_PLACEMENT,
      questionUnitSlugs: PROGRAMMING_PLACEMENT.map(
        () => PROGRAMMING_PLACEMENT_LEVELS[0]!.recommendedUnitSlug,
      ),
      levels: PROGRAMMING_PLACEMENT_LEVELS,
    };
  }
  return null;
}

function scoreDedicated(
  courseSlug: string,
  answers: { questionId: string; index: number }[],
): { score: number; correct: number; total: number; level: PlacementLevel } | null {
  if (courseSlug === "english") return scorePlacement(answers);
  if (courseSlug === "programming") return scoreProgrammingPlacement(answers);
  return null;
}

async function loadCourseUnits(courseSlug: string) {
  const course = await db.query.courses.findFirst({ where: eq(courses.slug, courseSlug) });
  if (!course) return null;
  const courseUnits = await db.query.units.findMany({
    where: eq(units.courseId, course.id),
    orderBy: [asc(units.sortOrder)],
  });
  const courseLessons = await db.query.lessons.findMany({
    where: eq(lessons.courseId, course.id),
    orderBy: [asc(lessons.sortOrder)],
  });
  const placementUnits: PlacementUnit[] = courseUnits.map((unit) => ({
    slug: unit.slug,
    titleUk: unit.titleUk,
    titleEn: unit.titleEn ?? unit.titleUk,
    lessons: courseLessons
      .filter((l) => l.unitId === unit.id)
      .map((l) => ({
        slug: l.slug,
        isExam: l.isExam,
        exercises: (Array.isArray(l.exercises) ? l.exercises : []) as PlacementUnit["lessons"][0]["exercises"],
      })),
  }));
  return { course, courseUnits, courseLessons, placementUnits };
}

async function bankFor(courseSlug: string): Promise<{
  bank: CoursePlacementBank;
  course: NonNullable<Awaited<ReturnType<typeof loadCourseUnits>>>;
} | null> {
  const loaded = await loadCourseUnits(courseSlug);
  if (!loaded) return null;
  const dedicated = dedicatedBank(courseSlug);
  if (dedicated) return { bank: dedicated, course: loaded };
  const built = buildCoursePlacementBank(courseSlug, loaded.placementUnits);
  if (!built) return null;
  return { bank: built, course: loaded };
}

async function ensureMilestone(userId: string, code: string, titleUk: string, titleEn: string) {
  const existing = await db.query.learningMilestones.findFirst({
    where: and(eq(learningMilestones.userId, userId), eq(learningMilestones.code, code)),
  });
  if (existing) return;
  await db.insert(learningMilestones).values({ userId, code, titleUk, titleEn });
}

async function resolveStartHref(
  courseSlug: string,
  courseId: string,
  recommendedUnitSlug: string,
): Promise<string> {
  const fallback = `/courses/${courseSlug}`;
  const unit = await db.query.units.findFirst({
    where: and(eq(units.courseId, courseId), eq(units.slug, recommendedUnitSlug)),
  });
  if (!unit) return fallback;
  const first = await db.query.lessons.findFirst({
    where: eq(lessons.unitId, unit.id),
    orderBy: [asc(lessons.sortOrder)],
  });
  return first ? `/courses/${courseSlug}/lessons/${first.id}` : fallback;
}

export async function getCoursePlacement(userId: string, courseSlug: string) {
  if (!isCourseSlug(courseSlug)) return { ok: false as const, status: 404 as const, error: "unknown_course" };
  const found = await bankFor(courseSlug);
  if (!found) return { ok: false as const, status: 404 as const, error: "placement_unavailable" };

  const last = await db.query.placementResults.findFirst({
    where: and(eq(placementResults.userId, userId), eq(placementResults.courseSlug, courseSlug)),
    orderBy: [desc(placementResults.createdAt)],
  });

  return {
    ok: true as const,
    data: {
      courseSlug,
      questions: publicPlacementQuestions(found.bank.questions),
      lastResult: last
        ? {
            score: last.score,
            levelLabel: last.levelLabel,
            recommendedUnitSlug: last.recommendedUnitSlug,
            createdAt: last.createdAt,
          }
        : null,
    },
  };
}

export type PlacementSubmitInput = {
  answers: { questionId: string; index: number }[];
  applySkip: boolean;
};

export async function applyPlacementSkip(opts: {
  userId: string;
  courseId: string;
  courseSlug: string;
  unitRows: { id: string; slug: string }[];
  lessonRows: { id: string; unitId: string }[];
  recommendedUnitSlug: string;
  placementResultId: string;
}): Promise<{ skippedUnits: string[]; skippedLessons: number }> {
  const plan = planPlacementSkip(
    opts.unitRows.map((u) => u.slug),
    opts.recommendedUnitSlug,
  );
  const unitBySlug = new Map(opts.unitRows.map((u) => [u.slug, u]));

  const placementRows = [
    ...plan.knownUnitSlugs.map((slug) => ({
      slug,
      decision: "known" as const,
    })),
    { slug: plan.startUnitSlug, decision: "start" as const },
  ].filter((r) => unitBySlug.has(r.slug));

  if (placementRows.length) {
    await db
      .insert(userUnitPlacements)
      .values(
        placementRows.map((r) => ({
          userId: opts.userId,
          courseId: opts.courseId,
          unitId: unitBySlug.get(r.slug)!.id,
          decision: r.decision,
          placementResultId: opts.placementResultId,
        })),
      )
      .onConflictDoUpdate({
        target: [userUnitPlacements.userId, userUnitPlacements.unitId],
        set: {
          decision: sql`excluded.decision`,
          placementResultId: sql`excluded.placement_result_id`,
        },
      });
  }

  const knownIds = new Set(
    plan.knownUnitSlugs.map((s) => unitBySlug.get(s)?.id).filter((id): id is string => Boolean(id)),
  );
  const toMark = opts.lessonRows.filter((l) => knownIds.has(l.unitId));
  if (toMark.length === 0) {
    return { skippedUnits: plan.knownUnitSlugs, skippedLessons: 0 };
  }

  const existing = await db.query.userLessonProgress.findMany({
    where: and(
      eq(userLessonProgress.userId, opts.userId),
      eq(userLessonProgress.courseId, opts.courseId),
    ),
  });
  const existingByLesson = new Map(existing.map((r) => [r.lessonId, r]));

  const toInsert = toMark.filter((l) => !existingByLesson.has(l.id));
  const toUpdate = toMark.filter((l) => {
    const row = existingByLesson.get(l.id);
    return row && row.status !== "completed";
  });

  if (toInsert.length) {
    await db.insert(userLessonProgress).values(
      toInsert.map((l) => ({
        userId: opts.userId,
        lessonId: l.id,
        courseId: opts.courseId,
        status: "completed" as const,
        bestScore: 1,
        attempts: 0,
        completedAt: null,
      })),
    );
  }
  if (toUpdate.length) {
    await db
      .update(userLessonProgress)
      .set({ status: "completed", bestScore: 1, completedAt: null })
      .where(
        and(
          eq(userLessonProgress.userId, opts.userId),
          inArray(
            userLessonProgress.lessonId,
            toUpdate.map((l) => l.id),
          ),
        ),
      );
  }

  const [countRow] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(userLessonProgress)
    .where(
      and(
        eq(userLessonProgress.userId, opts.userId),
        eq(userLessonProgress.courseId, opts.courseId),
        eq(userLessonProgress.status, "completed"),
      ),
    );

  const existingCourse = await db.query.userCourseProgress.findFirst({
    where: and(
      eq(userCourseProgress.userId, opts.userId),
      eq(userCourseProgress.courseId, opts.courseId),
    ),
  });
  if (existingCourse) {
    await db
      .update(userCourseProgress)
      .set({ completedLessons: countRow?.n ?? 0 })
      .where(eq(userCourseProgress.id, existingCourse.id));
  } else {
    await db.insert(userCourseProgress).values({
      userId: opts.userId,
      courseId: opts.courseId,
      completedLessons: countRow?.n ?? 0,
      xp: 0,
      level: 1,
    });
  }

  return {
    skippedUnits: plan.knownUnitSlugs,
    skippedLessons: toInsert.length + toUpdate.length,
  };
}

export async function submitCoursePlacement(
  userId: string,
  courseSlug: string,
  input: PlacementSubmitInput,
) {
  if (!isCourseSlug(courseSlug)) {
    return { ok: false as const, status: 404 as const, error: "unknown_course" };
  }
  const found = await bankFor(courseSlug);
  if (!found) {
    return { ok: false as const, status: 404 as const, error: "placement_unavailable" };
  }

  const dedicated = scoreDedicated(courseSlug, input.answers);
  const scored = dedicated ?? recommendPlacementUnit(input.answers, found.bank);
  const recommended = scored.level.recommendedUnitSlug;

  const [row] = await db
    .insert(placementResults)
    .values({
      userId,
      courseSlug,
      score: scored.score,
      levelLabel: scored.level.label,
      answers: { answers: input.answers, applySkip: input.applySkip },
      recommendedUnitSlug: recommended,
    })
    .returning();

  let skippedUnits: string[] = [];
  let skippedLessons = 0;
  if (input.applySkip) {
    const applied = await applyPlacementSkip({
      userId,
      courseId: found.course.course.id,
      courseSlug,
      unitRows: found.course.courseUnits.map((u) => ({ id: u.id, slug: u.slug })),
      lessonRows: found.course.courseLessons.map((l) => ({ id: l.id, unitId: l.unitId })),
      recommendedUnitSlug: recommended,
      placementResultId: row.id,
    });
    skippedUnits = applied.skippedUnits;
    skippedLessons = applied.skippedLessons;
  }

  const startHref = await resolveStartHref(courseSlug, found.course.course.id, recommended);

  await logActivity(db, userId, "placement_completed", {
    courseSlug,
    level: scored.level.label,
    score: scored.score,
    applySkip: input.applySkip,
    skippedLessons,
  });
  await notifyUser(db, userId, {
    type: "placement",
    titleUk: `Placement: ${scored.level.label}`,
    titleEn: `Placement: ${scored.level.label}`,
    bodyUk: scored.level.titleUk,
    bodyEn: scored.level.titleEn,
    href: startHref,
  });
  await ensureMilestone(
    userId,
    `placement_${courseSlug}`.slice(0, 64),
    `Placement ${courseSlug}`,
    `Placement ${courseSlug}`,
  );

  return {
    ok: true as const,
    data: {
      result: {
        score: scored.score,
        correct: scored.correct,
        total: scored.total,
        levelLabel: scored.level.label,
        titleUk: scored.level.titleUk,
        titleEn: scored.level.titleEn,
        recommendedUnitSlug: recommended,
        startHref,
        skippedUnits,
        skippedLessons,
      },
      id: row.id,
    },
  };
}
