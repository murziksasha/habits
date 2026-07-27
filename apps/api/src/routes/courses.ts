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
  canAccessLesson,
  canStartLesson,
  isCourseSlug,
  maxHearts,
  regenerateHearts,
  type Plan,
} from "@eduforge/shared";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { db } from "../db.js";
import { rateLimit } from "../rate-limit.js";
import { getCourseProgress } from "../services/home.js";
import { submitLesson } from "../services/submit-lesson.js";

type Vars = { user: AuthedUser };

export const courseRoutes = new Hono<{ Variables: Vars }>();

courseRoutes.get("/", async (c) => {
  const list = await db.query.courses.findMany({
    orderBy: [asc(courses.sortOrder)],
  });
  return c.json({ courses: list });
});

courseRoutes.get("/progress/me", authMiddleware, async (c) => {
  const user = c.get("user");
  const rows = await getCourseProgress(user.id);
  return c.json({ progress: rows });
});

courseRoutes.get("/:slug", authMiddleware, async (c) => {
  const user = c.get("user");
  const slug = c.req.param("slug") ?? "";
  if (!isCourseSlug(slug)) return c.json({ error: "not_found" }, 404);
  const course = await db.query.courses.findFirst({ where: eq(courses.slug, slug) });
  if (!course) return c.json({ error: "not_found" }, 404);

  const courseUnits = await db.query.units.findMany({
    where: eq(units.courseId, course.id),
    orderBy: [asc(units.sortOrder)],
  });
  const courseLessons = await db.query.lessons.findMany({
    where: eq(lessons.courseId, course.id),
    orderBy: [asc(lessons.sortOrder)],
  });
  let progress = await db.query.userCourseProgress.findFirst({
    where: and(
      eq(userCourseProgress.userId, user.id),
      eq(userCourseProgress.courseId, course.id),
    ),
  });

  const plan = user.plan as Plan;
  if (progress) {
    const regen = regenerateHearts({
      plan,
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
  } else if (plan === "premium") {
    progress = {
      id: "",
      userId: user.id,
      courseId: course.id,
      xp: 0,
      level: 1,
      hearts: maxHearts(plan),
      heartsUpdatedAt: new Date(),
      completedLessons: 0,
      lastLessonId: null,
    };
  }

  const lessonProgress = await db.query.userLessonProgress.findMany({
    where: and(
      eq(userLessonProgress.userId, user.id),
      eq(userLessonProgress.courseId, course.id),
    ),
  });
  const lpMap = new Map(lessonProgress.map((p) => [p.lessonId, p]));

  // global index for freemium
  const sorted = [...courseLessons].sort((a, b) => {
    if (a.unitId === b.unitId) return a.sortOrder - b.sortOrder;
    const ua = courseUnits.find((u) => u.id === a.unitId)?.sortOrder ?? 0;
    const ub = courseUnits.find((u) => u.id === b.unitId)?.sortOrder ?? 0;
    return ua - ub || a.sortOrder - b.sortOrder;
  });

  const unitsPayload = courseUnits.map((u) => ({
    ...u,
    lessons: sorted
      .filter((l) => l.unitId === u.id)
      .map((l) => {
        const idx = sorted.findIndex((x) => x.id === l.id);
        const accessible =
          l.isFree ||
          canAccessLesson({ plan, lessonIndexInCourse: idx });
        const lp = lpMap.get(l.id);
        const nonExam = sorted.filter(
          (x) => x.unitId === u.id && !x.isExam,
        );
        const nonExamDone = nonExam.every(
          (x) => lpMap.get(x.id)?.status === "completed",
        );
        const isExam = Boolean(l.isExam);
        const examLocked = isExam && !nonExamDone && lp?.status !== "completed";
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
          locked: !accessible || examLocked,
          status: lp?.status ?? "available",
          bestScore: lp?.bestScore ?? 0,
          completedAt: lp?.completedAt ?? null,
        };
      }),
  }));

  const hearts = progress?.hearts ?? maxHearts(plan);
  const freeLessonCount = sorted.filter(
    (l, i) =>
      l.isFree || canAccessLesson({ plan: "free" as Plan, lessonIndexInCourse: i }),
  ).length;
  const freeCompleted = sorted.filter((l, i) => {
    const free =
      l.isFree || canAccessLesson({ plan: "free" as Plan, lessonIndexInCourse: i });
    return free && lpMap.get(l.id)?.status === "completed";
  }).length;

  return c.json({
    course,
    units: unitsPayload,
    freemium: {
      freeLessonCount,
      freeCompleted,
      freeLeft: Math.max(0, freeLessonCount - freeCompleted),
      isPremium: plan === "premium",
    },
    progress: progress
      ? {
          xp: progress.xp,
          level: progress.level,
          hearts,
          maxHearts: maxHearts(plan),
          completedLessons: progress.completedLessons,
        }
      : {
          xp: 0,
          level: 1,
          hearts: maxHearts(plan),
          maxHearts: maxHearts(plan),
          completedLessons: 0,
        },
  });
});

courseRoutes.get("/:slug/lessons/:lessonId", authMiddleware, async (c) => {
  const user = c.get("user");
  const lessonId = c.req.param("lessonId") as string;
  const lesson = await db.query.lessons.findFirst({ where: eq(lessons.id, lessonId) });
  if (!lesson) return c.json({ error: "not_found" }, 404);

  const course = await db.query.courses.findFirst({ where: eq(courses.id, lesson.courseId) });
  if (!course) return c.json({ error: "not_found" }, 404);

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
  const plan = user.plan as Plan;
  const accessible =
    lesson.isFree || canAccessLesson({ plan, lessonIndexInCourse: idx });
  if (!accessible) return c.json({ error: "premium_required" }, 402);

  if (lesson.isExam) {
    const unitLessons = sorted.filter((l) => l.unitId === lesson.unitId && !l.isExam);
    const lpRows = await db.query.userLessonProgress.findMany({
      where: and(
        eq(userLessonProgress.userId, user.id),
        eq(userLessonProgress.courseId, course.id),
      ),
    });
    const done = new Set(
      lpRows.filter((p) => p.status === "completed").map((p) => p.lessonId),
    );
    const unitReady = unitLessons.every((l) => done.has(l.id));
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
    const [created] = await db
      .insert(userCourseProgress)
      .values({
        userId: user.id,
        courseId: course.id,
        hearts: maxHearts(plan),
      })
      .returning();
    progress = created;
  } else {
    const regen = regenerateHearts({
      plan,
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

  if (!canStartLesson({ plan, hearts: progress.hearts })) {
    return c.json(
      {
        error: "no_hearts",
        hearts: progress.hearts,
        maxHearts: maxHearts(plan),
      },
      402,
    );
  }

  return c.json({
    lesson: {
      ...lesson,
      isExam: Boolean(lesson.isExam),
      passThreshold: lesson.passThreshold ?? (lesson.isExam ? 0.7 : null),
    },
    course,
    indexInCourse: idx,
    hearts: progress.hearts,
    maxHearts: maxHearts(plan),
  });
});

courseRoutes.post("/:slug/lessons/:lessonId/submit", authMiddleware, async (c) => {
  const user = c.get("user");
  const limited = await rateLimit({
    key: `submit:${user.id}`,
    limit: 60,
    windowMs: 60_000,
  });
  if (!limited.ok) {
    return c.json({ error: "rate_limited", retryAfter: limited.retryAfterSec }, 429);
  }
  const lessonId = c.req.param("lessonId") as string;
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
    answers,
    usedHint: Boolean(body?.usedHint),
  });

  if (!result.ok) {
    if (result.error === "no_hearts") {
      return c.json({ error: "no_hearts", hearts: result.hearts }, 402);
    }
    return c.json({ error: result.error }, result.status);
  }

  if (idem) {
    const cacheKey = `lesson-submit:${user.id}:${lessonId}:${idem}`;
    await setIdempotentResponse(cacheKey, { status: 200, body: result.body }, 180);
  }
  return c.json(result.body);
});
