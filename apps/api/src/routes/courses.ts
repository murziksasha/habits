import { Hono } from "hono";
import { and, asc, eq } from "drizzle-orm";
import {
  courses,
  lessons,
  units,
  userCourseProgress,
  userLessonProgress,
} from "@eduforge/db";
import {
  getLocalLabForLesson,
  listLabsForCourse,
  maxHearts,
  regenerateHearts,
  resolveExamVariantId,
  selectExamVariantExercises,
  stripExamSolutions,
} from "@eduforge/shared";
import { lessonCountsAsCurrentMastery } from "../services/certificate-rules.js";

function lessonIsCurrent(
  lesson: { contentVersion?: number | null },
  lp?: { status: string; completedContentVersion?: number | null } | null,
): boolean {
  return lessonCountsAsCurrentMastery({
    status: lp?.status ?? "",
    lessonContentVersion: lesson.contentVersion ?? 1,
    completedContentVersion: lp?.completedContentVersion ?? null,
  });
}

function exercisesForViewer(
  lesson: { id: string; isExam: boolean | null; exercises: unknown },
  userId: string | null,
  attempts: number,
  mastered: boolean,
): unknown {
  const raw = (lesson.exercises as { examVariant?: string }[]) ?? [];
  if (!lesson.isExam) return raw;
  const selected = selectExamVariantExercises(raw, resolveExamVariantId(userId ?? "guest", lesson.id, attempts));
  return mastered ? selected : stripExamSolutions(selected as Record<string, unknown>[]);
}

function attachLabMeta(
  courseSlug: string,
  lessonSlug: string,
  contentSource?: string | null,
) {
  if (contentSource === "cms") {
    return { localLab: null, hasLocalLab: false, localLabId: null };
  }
  const localLab = getLocalLabForLesson(courseSlug, lessonSlug);
  return {
    localLab,
    hasLocalLab: Boolean(localLab),
    localLabId: localLab?.labId ?? null,
  };
}
import { authMiddleware, optionalAuth, type AuthedUser } from "../auth.js";
import { db } from "../db.js";
import { clientIp, rateLimit } from "../rate-limit.js";
import { getCourseProgress } from "../services/home.js";
import {
  buildGuestSubmitResult,
  buildGuestSubmitResultAsync,
  getNextCourseLesson,
  submitLesson,
} from "../services/submit-lesson.js";

type Vars = { user?: AuthedUser };

export const courseRoutes = new Hono<{ Variables: Vars }>();

courseRoutes.get("/", async (c) => {
  const list = await db.query.courses.findMany({
    where: and(eq(courses.status, "published"), eq(courses.isVisible, true)),
    orderBy: [asc(courses.sortOrder)],
  });
  return c.json({ courses: list });
});

courseRoutes.get("/progress/me", authMiddleware, async (c) => {
  const user = c.get("user")!;
  const rows = await getCourseProgress(user.id);
  return c.json({ progress: rows });
});

courseRoutes.get("/:slug", optionalAuth, async (c) => {
  const user = c.get("user");
  const slug = c.req.param("slug") ?? "";
  if (!slug) return c.json({ error: "not_found" }, 404);
  const course = await db.query.courses.findFirst({ where: eq(courses.slug, slug) });
  if (!course) return c.json({ error: "not_found" }, 404);
  if (
    (course.status !== "published" || !course.isVisible) &&
    user?.role !== "admin"
  ) {
    return c.json({ error: "not_found" }, 404);
  }

  const courseUnits = await db.query.units.findMany({
    where: eq(units.courseId, course.id),
    orderBy: [asc(units.sortOrder)],
  });
  const courseLessons = await db.query.lessons.findMany({
    where: eq(lessons.courseId, course.id),
    orderBy: [asc(lessons.sortOrder)],
  });

  const sorted = [...courseLessons].sort((a, b) => {
    if (a.unitId === b.unitId) return a.sortOrder - b.sortOrder;
    const ua = courseUnits.find((u) => u.id === a.unitId)?.sortOrder ?? 0;
    const ub = courseUnits.find((u) => u.id === b.unitId)?.sortOrder ?? 0;
    return ua - ub || a.sortOrder - b.sortOrder;
  });

  if (!user) {
    const unitsPayload = courseUnits.map((u) => ({
      ...u,
      lessons: sorted
        .filter((l) => l.unitId === u.id)
        .map((l) => {
          const nonExam = sorted.filter(
            (x) => x.unitId === u.id && !x.isExam,
          );
          const isExam = Boolean(l.isExam);
          const examLocked = isExam && nonExam.length > 0;
          const labMeta = attachLabMeta(course.slug, l.slug, course.contentSource);
          return {
            id: l.id,
            slug: l.slug,
            titleUk: l.titleUk,
            titleEn: l.titleEn,
            sortOrder: l.sortOrder,
            baseXp: l.baseXp,
            difficulty: l.difficulty,
            isFree: l.isFree,
            isExam,
            passThreshold: l.passThreshold ?? (isExam ? 0.7 : null),
            examLocked,
            locked: examLocked,
            hasLocalLab: labMeta.hasLocalLab,
            localLabId: labMeta.localLabId,
            status: "available",
            bestScore: 0,
            completedAt: null,
          };
        }),
    }));

    return c.json({
      course,
      units: unitsPayload,
      courseLabs: course.contentSource === "cms" ? [] : listLabsForCourse(course.slug),
      progress: {
        xp: 0,
        level: 1,
        hearts: maxHearts(),
        maxHearts: maxHearts(),
        completedLessons: 0,
      },
    });
  }

  let progress = await db.query.userCourseProgress.findFirst({
    where: and(
      eq(userCourseProgress.userId, user.id),
      eq(userCourseProgress.courseId, course.id),
    ),
  });

  if (progress) {
    const regen = regenerateHearts({
      hearts: progress.hearts,
      heartsUpdatedAt: progress.heartsUpdatedAt,
    });
    if (regen.changed) {
      const [updated] = await db
        .update(userCourseProgress)
        .set({ hearts: regen.hearts, heartsUpdatedAt: regen.heartsUpdatedAt })
        .where(eq(userCourseProgress.id, progress.id))
        .returning();
      progress = updated;
    }
  }

  const lessonProgress = await db.query.userLessonProgress.findMany({
    where: and(
      eq(userLessonProgress.userId, user.id),
      eq(userLessonProgress.courseId, course.id),
    ),
  });
  const lpMap = new Map(lessonProgress.map((p) => [p.lessonId, p]));

  const unitsPayload = courseUnits.map((u) => ({
    ...u,
    lessons: sorted
      .filter((l) => l.unitId === u.id)
      .map((l) => {
        const lp = lpMap.get(l.id);
        const nonExam = sorted.filter(
          (x) => x.unitId === u.id && !x.isExam,
        );
        const nonExamDone = nonExam.every((x) => lessonIsCurrent(x, lpMap.get(x.id)));
        const isExam = Boolean(l.isExam);
        const examLocked = isExam && !nonExamDone && lp?.status !== "completed";
        const labMeta = attachLabMeta(course.slug, l.slug, course.contentSource);
        return {
          id: l.id,
          slug: l.slug,
          titleUk: l.titleUk,
          titleEn: l.titleEn,
          sortOrder: l.sortOrder,
          baseXp: l.baseXp,
          difficulty: l.difficulty,
          isFree: l.isFree,
          isExam,
          passThreshold: l.passThreshold ?? (isExam ? 0.7 : null),
          examLocked,
          locked: examLocked,
          hasLocalLab: labMeta.hasLocalLab,
          localLabId: labMeta.localLabId,
          status: lp?.status ?? "available",
          bestScore: lp?.bestScore ?? 0,
          completedAt: lp?.completedAt ?? null,
          contentVersion: l.contentVersion ?? 1,
          masteryCurrent: lessonIsCurrent(l, lp),
          historicalCompletion: lp?.status === "completed" && !lessonIsCurrent(l, lp),
        };
      }),
  }));

  const hearts = progress?.hearts ?? maxHearts();

  return c.json({
    course,
    units: unitsPayload,
    courseLabs: course.contentSource === "cms" ? [] : listLabsForCourse(course.slug),
    progress: progress
      ? {
          xp: progress.xp,
          level: progress.level,
          hearts,
          maxHearts: maxHearts(),
          completedLessons: progress.completedLessons,
        }
      : {
          xp: 0,
          level: 1,
          hearts: maxHearts(),
          maxHearts: maxHearts(),
          completedLessons: 0,
        },
  });
});

courseRoutes.get("/:slug/lessons/:lessonId", optionalAuth, async (c) => {
  const user = c.get("user");
  const slug = c.req.param("slug") as string;
  const lessonId = c.req.param("lessonId") as string;
  const lesson = await db.query.lessons.findFirst({ where: eq(lessons.id, lessonId) });
  if (!lesson) return c.json({ error: "not_found" }, 404);

  const course = await db.query.courses.findFirst({ where: eq(courses.id, lesson.courseId) });
  if (!course) return c.json({ error: "not_found" }, 404);
  if (slug && course.slug !== slug) return c.json({ error: "not_found" }, 404);

  if (
    (course.status !== "published" || !course.isVisible) &&
    user?.role !== "admin"
  ) {
    return c.json({ error: "not_found" }, 404);
  }

  const allLessons = await db.query.lessons.findMany({
    where: eq(lessons.courseId, course.id),
    orderBy: [asc(lessons.sortOrder)],
  });
  const unitsAll = await db.query.units.findMany({ where: eq(units.courseId, course.id) });
  const sorted = [...allLessons].sort((a, b) => {
    const ua = unitsAll.find((u) => u.id === a.unitId)?.sortOrder ?? 0;
    const ub = unitsAll.find((u) => u.id === b.unitId)?.sortOrder ?? 0;
    return ua - ub || a.sortOrder - b.sortOrder;
  });
  const idx = sorted.findIndex((l) => l.id === lesson.id);

  if (!user) {
    const labMeta = attachLabMeta(course.slug, lesson.slug, course.contentSource);
    return c.json({
      lesson: {
        ...lesson,
        exercises: exercisesForViewer(lesson, null, 0, false),
        isExam: Boolean(lesson.isExam),
        passThreshold: lesson.passThreshold ?? (lesson.isExam ? 0.7 : null),
      },
      course,
      localLab: labMeta.localLab,
      indexInCourse: idx,
      hearts: maxHearts(),
      maxHearts: maxHearts(),
    });
  }


  if (lesson.isExam) {
    const unitLessons = sorted.filter((l) => l.unitId === lesson.unitId && !l.isExam);
    const lpRows = await db.query.userLessonProgress.findMany({
      where: and(
        eq(userLessonProgress.userId, user.id),
        eq(userLessonProgress.courseId, course.id),
      ),
    });
    const lpMap = new Map(lpRows.map((p) => [p.lessonId, p]));
    const unitReady = unitLessons.every((l) => lessonIsCurrent(l, lpMap.get(l.id)));
    if (!unitReady) {
      return c.json({ error: "exam_locked", message: "Finish unit lessons first" }, 403);
    }
  }

  let progress = await db.query.userCourseProgress.findFirst({
    where: and(
      eq(userCourseProgress.userId, user.id),
      eq(userCourseProgress.courseId, course.id),
    ),
  });
  if (!progress) {
    await db
      .insert(userCourseProgress)
      .values({
        userId: user.id,
        courseId: course.id,
        hearts: maxHearts(),
      })
      .onConflictDoNothing();
    progress = await db.query.userCourseProgress.findFirst({
      where: and(
        eq(userCourseProgress.userId, user.id),
        eq(userCourseProgress.courseId, course.id),
      ),
    });
  } else {
    const regen = regenerateHearts({
      hearts: progress.hearts,
      heartsUpdatedAt: progress.heartsUpdatedAt,
    });
    if (regen.changed) {
      const [updated] = await db
        .update(userCourseProgress)
        .set({ hearts: regen.hearts, heartsUpdatedAt: regen.heartsUpdatedAt })
        .where(eq(userCourseProgress.id, progress.id))
        .returning();
      progress = updated;
    }
  }

  const viewerProgress = await db.query.userLessonProgress.findFirst({
    where: and(eq(userLessonProgress.userId, user.id), eq(userLessonProgress.lessonId, lesson.id)),
  });
  const labMeta = attachLabMeta(course.slug, lesson.slug, course.contentSource);
  return c.json({
    lesson: {
      ...lesson,
      exercises: exercisesForViewer(
        lesson,
        user.id,
        viewerProgress?.attempts ?? 0,
        lessonIsCurrent(lesson, viewerProgress),
      ),
      isExam: Boolean(lesson.isExam),
      passThreshold: lesson.passThreshold ?? (lesson.isExam ? 0.7 : null),
      masteryCurrent: lessonIsCurrent(lesson, viewerProgress),
      historicalCompletion:
        viewerProgress?.status === "completed" && !lessonIsCurrent(lesson, viewerProgress),
    },
    course,
    localLab: labMeta.localLab,
    indexInCourse: idx,
    hearts: progress?.hearts ?? maxHearts(),
    maxHearts: maxHearts(),
  });
});

courseRoutes.post("/:slug/lessons/:lessonId/submit", optionalAuth, async (c) => {
  const user = c.get("user");
  const lessonId = c.req.param("lessonId") as string;
  const slug = c.req.param("slug") as string;

  if (user) {
    const limited = await rateLimit({
      key: `submit:${user.id}`,
      limit: 60,
      windowMs: 60_000,
    });
    if (!limited.ok) {
      return c.json({ error: "rate_limited", retryAfter: limited.retryAfterSec }, 429);
    }

    const body = await c.req.json().catch(() => null);
    const answers = (body?.answers ?? []) as {
      exerciseId: string;
      answer: unknown;
    }[];

    const {
      getIdempotentResponse,
      normalizeIdempotencyKey,
      setIdempotentResponse,
    } = await import("../services/idempotency.js");
    const idem = normalizeIdempotencyKey(
      body?.idempotencyKey ?? c.req.header("idempotency-key"),
    );
    if (idem) {
      const cacheKey = `lesson-submit:${user.id}:${lessonId}:${idem}`;
      const cached = await getIdempotentResponse<{
        status: number;
        body: Record<string, unknown>;
      }>(cacheKey);
      if (cached?.body) {
        return c.json({ ...cached.body, idempotentReplay: true }, cached.status as 200);
      }
    }

    const result = await submitLesson({
      user,
      lessonId,
      courseSlug: slug,
      answers,
      usedHint: Boolean(body?.usedHint),
    });

    if (!result.ok) {
      if (result.error === "judge_unavailable" || result.error === "circuit_engine_unavailable") {
        return c.json(
          { error: result.error, exerciseId: (result as { exerciseId: string }).exerciseId },
          result.status as 503,
        );
      }
      return c.json({ error: result.error }, result.status);
    }

    if (idem) {
      const cacheKey = `lesson-submit:${user.id}:${lessonId}:${idem}`;
      await setIdempotentResponse(cacheKey, { status: 200, body: result.body }, 180);
    }
    return c.json(result.body);
  }

  // Guest submit
  const ip = clientIp({ get: (n) => c.req.header(n) ?? null });
  const limited = await rateLimit({
    key: `submit:guest:${ip}`,
    limit: 30,
    windowMs: 60_000,
  });
  if (!limited.ok) {
    return c.json({ error: "rate_limited", retryAfter: limited.retryAfterSec }, 429);
  }

  const lesson = await db.query.lessons.findFirst({ where: eq(lessons.id, lessonId) });
  if (!lesson) return c.json({ error: "not_found" }, 404);
  const course = await db.query.courses.findFirst({ where: eq(courses.id, lesson.courseId) });
  if (!course) return c.json({ error: "not_found" }, 404);
  if (slug && course.slug !== slug) return c.json({ error: "not_found" }, 404);
  if (course.status !== "published" || !course.isVisible) {
    return c.json({ error: "not_found" }, 404);
  }

  const body = await c.req.json().catch(() => null);
  const answers = (body?.answers ?? []) as {
    exerciseId: string;
    answer: unknown;
  }[];

  const storedExercises =
    (lesson.exercises as { id: string; type: string; examVariant?: string; [k: string]: unknown }[]) ?? [];
  const exercises = lesson.isExam
    ? selectExamVariantExercises(storedExercises, resolveExamVariantId("guest", lesson.id, 0))
    : storedExercises;
  const nextLesson = await getNextCourseLesson(course.id, course.slug, lesson.sortOrder);
  const guestBody = await buildGuestSubmitResultAsync({
    exercises,
    answers,
    isExam: Boolean(lesson.isExam),
    passThreshold: lesson.passThreshold,
    nextLesson,
  });

  if ("error" in guestBody) {
    return c.json({ error: guestBody.error, exerciseId: guestBody.exerciseId }, guestBody.status as 503);
  }

  return c.json(guestBody);
});
