import { describe, expect, it } from "vitest";
import {
  chessContent,
  englishContent,
  logicContent,
  programmingContent,
  speedReadingContent,
  typingContent,
  type CourseContent,
  type Exercise,
} from "./index.js";

// Keep aligned with @eduforge/shared PROGRAMMING_MINI_LESSON_SLUGS
const PROGRAMMING_MINI_SLUGS = [
  "html-mini-card",
  "css-mini-hero",
  "js-mini-counter",
  "ts-mini-types",
  "react-mini-toggle",
  "git-mini-commit",
  "node-mini-server",
  "express-mini-api",
  "sql-mini-join",
  "qa-mini-case",
] as const;

const PROGRAMMING_UNIT_ORDER = [
  "html",
  "css",
  "js",
  "typescript",
  "react",
  "git",
  "node",
  "express",
  "sql",
  "qa",
] as const;

const courses: CourseContent[] = [
  englishContent,
  chessContent,
  typingContent,
  speedReadingContent,
  logicContent,
  programmingContent,
];

const EXERCISE_TYPES = new Set([
  "mcq",
  "translate",
  "match",
  "order_words",
  "fill_blank",
  "typing",
  "rsvp",
  "comprehension",
  "logic_puzzle",
  "chess_puzzle",
  "chess_lesson",
  "code_read",
  "code_output",
  "code_fill",
  "code_order",
  "code_project",
]);

function collectExercises(course: CourseContent): Exercise[] {
  return course.units.flatMap((u) => u.lessons.flatMap((l) => l.exercises));
}

describe("course content integrity", () => {
  it("includes all course slugs including programming", () => {
    expect(courses.map((c) => c.slug).sort()).toEqual(
      ["chess", "english", "logic", "programming", "speed_reading", "typing"].sort(),
    );
  });

  it("each course has units and lessons", () => {
    for (const c of courses) {
      expect(c.units.length).toBeGreaterThan(0);
      expect(c.titleUk.length).toBeGreaterThan(0);
      expect(c.titleEn.length).toBeGreaterThan(0);
      for (const u of c.units) {
        expect(u.lessons.length).toBeGreaterThan(0);
        expect(u.slug).toBeTruthy();
      }
    }
  });

  it("lesson slugs are unique within a course", () => {
    for (const c of courses) {
      const slugs = c.units.flatMap((u) => u.lessons.map((l) => l.slug));
      expect(new Set(slugs).size).toBe(slugs.length);
    }
  });

  it("exercise ids are unique within a course", () => {
    for (const c of courses) {
      const ids = collectExercises(c).map((e) => e.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it("every exercise has a known type and id", () => {
    for (const c of courses) {
      for (const ex of collectExercises(c)) {
        expect(ex.id).toBeTruthy();
        expect(EXERCISE_TYPES.has(ex.type)).toBe(true);
      }
    }
  });

  it("mcq / logic / code_read have valid correctIndex", () => {
    for (const c of courses) {
      for (const ex of collectExercises(c)) {
        if (ex.type === "mcq" || ex.type === "logic_puzzle" || ex.type === "code_read") {
          expect(ex.options.length).toBeGreaterThan(1);
          expect(ex.correctIndex).toBeGreaterThanOrEqual(0);
          expect(ex.correctIndex).toBeLessThan(ex.options.length);
        }
        if (ex.type === "code_output" && ex.options) {
          expect(ex.correctIndex).toBeGreaterThanOrEqual(0);
          expect(ex.correctIndex!).toBeLessThan(ex.options.length);
        }
      }
    }
  });

  it("typing lessons include text", () => {
    const typing = collectExercises(typingContent).filter((e) => e.type === "typing");
    expect(typing.length).toBeGreaterThan(10);
    for (const t of typing) {
      if (t.type === "typing") expect(t.text.length).toBeGreaterThan(0);
    }
  });

  it("english has free lessons for freemium", () => {
    const free = englishContent.units.flatMap((u) => u.lessons).filter((l) => l.isFree);
    expect(free.length).toBeGreaterThanOrEqual(5);
  });

  it("chess puzzles include fen + solution", () => {
    const puzzles = collectExercises(chessContent).filter((e) => e.type === "chess_puzzle");
    expect(puzzles.length).toBeGreaterThan(0);
    for (const p of puzzles) {
      if (p.type === "chess_puzzle") {
        expect(p.fen.split(" ").length).toBeGreaterThanOrEqual(4);
        expect(p.solutionSans.length).toBeGreaterThan(0);
      }
    }
  });

  it("programming path has expected units and volume", () => {
    const slugs = programmingContent.units.map((u) => u.slug);
    expect(slugs).toEqual([...PROGRAMMING_UNIT_ORDER]);
    const lessons = programmingContent.units.flatMap((u) => u.lessons);
    expect(lessons.length).toBeGreaterThanOrEqual(20);
    const free = lessons.filter((l) => l.isFree);
    expect(free.length).toBeGreaterThanOrEqual(5);
    const codeEx = collectExercises(programmingContent).filter((e) =>
      ["code_read", "code_output", "code_fill", "code_order", "code_project"].includes(
        e.type,
      ),
    );
    expect(codeEx.length).toBeGreaterThan(10);
  });

  it("code_fill exercises have accepted answers", () => {
    for (const ex of collectExercises(programmingContent)) {
      if (ex.type === "code_fill") {
        expect(ex.accepted.length).toBeGreaterThan(0);
        expect(ex.code.includes("___") || ex.code.length > 0).toBe(true);
      }
      if (ex.type === "code_order") {
        expect(ex.lines.length).toBe(ex.correct.length);
        expect(ex.correct.length).toBeGreaterThan(1);
      }
      if (ex.type === "code_project") {
        expect(ex.files.length).toBeGreaterThanOrEqual(2);
        expect(ex.checks.length).toBeGreaterThan(0);
        for (const ch of ex.checks) {
          expect(ex.files.some((f) => f.id === ch.fileId)).toBe(true);
          expect(ch.contains.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it("includes several code_project mini lessons", () => {
    const projects = collectExercises(programmingContent).filter(
      (e) => e.type === "code_project",
    );
    expect(projects.length).toBeGreaterThanOrEqual(6);
    const lessons = programmingContent.units.flatMap((u) => u.lessons);
    const miniSlugs = lessons
      .filter((l) => l.slug.includes("mini"))
      .map((l) => l.slug);
    expect(miniSlugs).toEqual(expect.arrayContaining([...PROGRAMMING_MINI_SLUGS]));
    expect(miniSlugs.length).toBeGreaterThanOrEqual(PROGRAMMING_MINI_SLUGS.length);
  });
});
