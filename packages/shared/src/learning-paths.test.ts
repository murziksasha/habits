import { describe, expect, it } from "vitest";
import { COURSE_SLUGS, isCourseSlug } from "./courses.js";
import {
  LEARNING_PATHS,
  computeAllPathProgress,
  computePathProgress,
  getLearningPath,
  pathsForCourse,
} from "./learning-paths.js";

describe("learning paths", () => {
  it("registers job paths and dedicated English and Chess tracks with real course slugs", () => {
    expect(LEARNING_PATHS.map((p) => p.slug)).toEqual([
      "frontend-dev",
      "backend-dev",
      "qa-engineer",
      "ai-builder",
      "dba-sql",
      "devops",
      "english-fluency",
      "chess-mastery",
    ]);
    const slugs = new Set<string>();
    const singleCourse = new Set(["english-fluency", "chess-mastery"]);
    for (const path of LEARNING_PATHS) {
      const min = singleCourse.has(path.slug) ? 1 : 4;
      expect(path.courseSlugs.length).toBeGreaterThanOrEqual(min);
      expect(new Set(path.courseSlugs).size).toBe(path.courseSlugs.length);
      expect(path.titleUk).not.toEqual(path.titleEn);
      expect(path.blurbUk.length).toBeGreaterThan(20);
      expect(path.blurbEn.length).toBeGreaterThan(20);
      for (const slug of path.courseSlugs) {
        expect(isCourseSlug(slug), slug).toBe(true);
        expect(COURSE_SLUGS.includes(slug)).toBe(true);
        slugs.add(slug);
      }
    }
    expect(getLearningPath("english-fluency")?.courseSlugs).toEqual(["english"]);
    expect(getLearningPath("chess-mastery")?.courseSlugs).toEqual(["chess"]);
    expect(getLearningPath("english-fluency")?.blurbEn.toLowerCase()).toContain("ukrainian");
    expect(getLearningPath("chess-mastery")?.blurbEn.toLowerCase()).toMatch(/endgame|opening|tactic/);
    // New PR #13 / follow-up courses should be discoverable on a path
    for (const must of [
      "go_fundamentals",
      "web_accessibility",
      "rest_api_design",
      "frontend_performance",
      "browser_web_apis",
    ]) {
      expect(slugs.has(must), must).toBe(true);
    }
  });

  it("computes lesson and course progress and picks the next unfinished course", () => {
    const frontend = getLearningPath("frontend-dev")!;
    const rows = frontend.courseSlugs.map((slug, i) => ({
      slug,
      completedLessons: i === 0 ? 10 : i === 1 ? 3 : 0,
      totalLessons: 10,
    }));
    const progress = computePathProgress(frontend, rows);
    expect(progress.completedLessons).toBe(13);
    expect(progress.totalLessons).toBe(frontend.courseSlugs.length * 10);
    expect(progress.completedCourses).toBe(1);
    expect(progress.totalCourses).toBe(frontend.courseSlugs.length);
    expect(progress.nextCourseSlug).toBe(frontend.courseSlugs[1]);
    expect(progress.ratio).toBeCloseTo(13 / progress.totalLessons);

    const allDone = computePathProgress(
      frontend,
      frontend.courseSlugs.map((slug) => ({ slug, completedLessons: 4, totalLessons: 4 })),
    );
    expect(allDone.completedCourses).toBe(frontend.courseSlugs.length);
    expect(allDone.nextCourseSlug).toBe(frontend.courseSlugs[frontend.courseSlugs.length - 1]);
    expect(allDone.ratio).toBe(1);
  });

  it("lists paths that include a course and ignores unknown slugs", () => {
    const paths = pathsForCourse("react_fundamentals");
    expect(paths.map((p) => p.slug)).toEqual(["frontend-dev"]);
    expect(pathsForCourse("english").map((p) => p.slug)).toEqual(["english-fluency"]);
    expect(pathsForCourse("chess").map((p) => p.slug)).toEqual(["chess-mastery"]);
    expect(pathsForCourse("not-a-course")).toEqual([]);
    expect(computeAllPathProgress([]).every((p) => p.ratio === 0 && p.totalLessons === 0)).toBe(
      true,
    );
  });
});
