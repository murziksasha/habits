import { asc, eq, inArray } from "drizzle-orm";
import { courses, lessons, units, userLessonProgress } from "@eduforge/db";
import { db } from "../db.js";

export type ExamBoardSummary = {
  totalExams: number;
  passed: number;
  ready: number;
  locked: number;
};

export type ExamBoardRow = {
  lessonId: string;
  unitId: string;
  unitSlug: string;
  unitTitleUk: string;
  titleUk: string;
  titleEn: string;
  status: "locked" | "ready" | "passed";
  bestScore: number;
  passThreshold: number;
  href: string;
};

export type ExamBoardCourse = {
  courseSlug: string;
  titleUk: string;
  titleEn: string;
  icon: string;
  exams: ExamBoardRow[];
};

export type ExamBoard = {
  summary: ExamBoardSummary;
  courses: ExamBoardCourse[];
};

export type ExamBoardPrefetch = {
  courses?: (typeof courses.$inferSelect)[];
  lessonProgress?: (typeof userLessonProgress.$inferSelect)[];
  units?: (typeof units.$inferSelect)[];
  lessons?: (typeof lessons.$inferSelect)[];
};

/** Unit exam board for a learner (shared by /learning/exams/me and /me/home). */
export async function buildExamBoard(
  userId: string,
  courseFilter?: string | null,
  prefetch?: ExamBoardPrefetch,
): Promise<ExamBoard> {
  const allCourses =
    prefetch?.courses ??
    (await db.query.courses.findMany({
      orderBy: [asc(courses.sortOrder)],
    }));
  const courseList = courseFilter
    ? allCourses.filter((c) => c.slug === courseFilter)
    : allCourses;

  const lpAll =
    prefetch?.lessonProgress ??
    (await db.query.userLessonProgress.findMany({
      where: eq(userLessonProgress.userId, userId),
    }));
  const lpMap = new Map(lpAll.map((p) => [p.lessonId, p]));

  const summary: ExamBoardSummary = {
    totalExams: 0,
    passed: 0,
    ready: 0,
    locked: 0,
  };

  const byCourse: ExamBoardCourse[] = [];
  if (!courseList.length) return { summary, courses: byCourse };

  const courseIds = courseList.map((c) => c.id);

  const [allUnits, allLessons] = await Promise.all([
    prefetch?.units
      ? Promise.resolve(
          prefetch.units.filter((u) => courseIds.includes(u.courseId)),
        )
      : db.query.units.findMany({
          where: inArray(units.courseId, courseIds),
          orderBy: [asc(units.sortOrder)],
        }),
    prefetch?.lessons
      ? Promise.resolve(
          prefetch.lessons.filter((l) => courseIds.includes(l.courseId)),
        )
      : db.query.lessons.findMany({
          where: inArray(lessons.courseId, courseIds),
          orderBy: [asc(lessons.sortOrder)],
        }),
  ]);

  const unitsByCourse = new Map<string, typeof allUnits>();
  for (const u of allUnits) {
    const list = unitsByCourse.get(u.courseId) ?? [];
    list.push(u);
    unitsByCourse.set(u.courseId, list);
  }

  const lessonsByCourse = new Map<string, typeof allLessons>();
  for (const l of allLessons) {
    const list = lessonsByCourse.get(l.courseId) ?? [];
    list.push(l);
    lessonsByCourse.set(l.courseId, list);
  }

  for (const course of courseList) {
    const courseUnits = unitsByCourse.get(course.id) ?? [];
    const courseLessons = lessonsByCourse.get(course.id) ?? [];
    const exams = courseLessons.filter((l) => l.isExam);
    if (!exams.length) continue;

    const rows: ExamBoardRow[] = [];
    for (const ex of exams) {
      const unit = courseUnits.find((u) => u.id === ex.unitId);
      const nonExam = courseLessons.filter((l) => l.unitId === ex.unitId && !l.isExam);
      const unitDone = nonExam.every((l) => lpMap.get(l.id)?.status === "completed");
      const lp = lpMap.get(ex.id);
      const passed = lp?.status === "completed";
      let status: "locked" | "ready" | "passed" = "locked";
      if (passed) status = "passed";
      else if (unitDone) status = "ready";
      summary.totalExams += 1;
      if (status === "passed") summary.passed += 1;
      else if (status === "ready") summary.ready += 1;
      else summary.locked += 1;
      rows.push({
        lessonId: ex.id,
        unitId: ex.unitId,
        unitSlug: unit?.slug ?? "",
        unitTitleUk: unit?.titleUk ?? "",
        titleUk: ex.titleUk,
        titleEn: ex.titleEn || ex.titleUk,
        status,
        bestScore: lp?.bestScore ?? 0,
        passThreshold: ex.passThreshold ?? 0.7,
        href: `/courses/${course.slug}/lessons/${ex.id}`,
      });
    }
    byCourse.push({
      courseSlug: course.slug,
      titleUk: course.titleUk,
      titleEn: course.titleEn || course.titleUk,
      icon: course.icon,
      exams: rows,
    });
  }

  return { summary, courses: byCourse };
}

/** Pure summary from an already-built board (for tests / home slice). */
export function examBoardSummaryOnly(board: ExamBoard): ExamBoardSummary {
  return board.summary;
}
