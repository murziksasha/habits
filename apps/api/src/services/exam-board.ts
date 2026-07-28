import { asc, eq } from "drizzle-orm";
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

/** Unit exam board for a learner (shared by /learning/exams/me and /me/home). */
export async function buildExamBoard(
  userId: string,
  courseFilter?: string | null,
): Promise<ExamBoard> {
  const allCourses = await db.query.courses.findMany({
    orderBy: [asc(courses.sortOrder)],
  });
  const courseList = courseFilter
    ? allCourses.filter((c) => c.slug === courseFilter)
    : allCourses;

  const lpAll = await db.query.userLessonProgress.findMany({
    where: eq(userLessonProgress.userId, userId),
  });
  const lpMap = new Map(lpAll.map((p) => [p.lessonId, p]));

  const summary: ExamBoardSummary = {
    totalExams: 0,
    passed: 0,
    ready: 0,
    locked: 0,
  };

  const byCourse: ExamBoardCourse[] = [];

  for (const course of courseList) {
    const courseUnits = await db.query.units.findMany({
      where: eq(units.courseId, course.id),
      orderBy: [asc(units.sortOrder)],
    });
    const courseLessons = await db.query.lessons.findMany({
      where: eq(lessons.courseId, course.id),
      orderBy: [asc(lessons.sortOrder)],
    });
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
