import { describe, expect, it } from "vitest";
import { COURSE_SLUGS } from "@eduforge/shared";
import { ALL_COURSE_CONTENTS } from "./index.js";
import type { Exercise, LessonContent } from "./types.js";

const PROMPT_TYPES = new Set([
  "mcq",
  "translate",
  "match",
  "order_words",
  "fill_blank",
  "typing",
  "rsvp",
  "comprehension",
  "logic_puzzle",
  "code_read",
  "code_output",
  "code_fill",
  "code_order",
  "code_project",
  "code_run",
  "code_judge",
  "concept",
  "explain",
  "video",
]);

function everyLesson(fn: (lesson: LessonContent, courseSlug: string, unitSlug: string) => void) {
  for (const course of ALL_COURSE_CONTENTS) {
    for (const unit of course.units) {
      for (const lesson of unit.lessons) {
        fn(lesson, course.slug, unit.slug);
      }
    }
  }
}

function nonempty(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function checkMcq(
  loc: string,
  opts: string[] | undefined,
  correctIndex: number | undefined,
  gaps: string[],
) {
  const options = opts ?? [];
  if (options.length < 2) gaps.push(`${loc}:options<2`);
  if (options.some((o) => !nonempty(o))) gaps.push(`${loc}:empty-option`);
  if (new Set(options).size !== options.length) gaps.push(`${loc}:duplicate-options`);
  if (typeof correctIndex !== "number" || correctIndex < 0 || correctIndex >= options.length) {
    gaps.push(`${loc}:correctIndex`);
  }
}


describe("content quality gate", () => {
  it("exports one course per COURSE_SLUGS entry, in the same order", () => {
    expect(ALL_COURSE_CONTENTS.map((c) => c.slug)).toEqual([...COURSE_SLUGS]);
  });

  it("requires non-empty Ukrainian and English course, unit, and lesson titles", () => {
    const gaps: string[] = [];
    for (const course of ALL_COURSE_CONTENTS) {
      if (!nonempty(course.titleUk) || !nonempty(course.titleEn)) {
        gaps.push(`course:${course.slug}`);
      }
      for (const unit of course.units) {
        if (!nonempty(unit.titleUk) || !nonempty(unit.titleEn)) {
          gaps.push(`unit:${course.slug}/${unit.slug}`);
        }
        for (const lesson of unit.lessons) {
          if (!nonempty(lesson.titleUk) || !nonempty(lesson.titleEn)) {
            gaps.push(`lesson:${course.slug}/${lesson.slug}`);
          }
        }
      }
    }
    expect(gaps).toEqual([]);
  });

  it("has globally unique lesson slugs and exercise ids", () => {
    const slugs = new Map<string, string>();
    const ids = new Map<string, string>();
    const slugDupes: string[] = [];
    const idDupes: string[] = [];
    everyLesson((lesson, courseSlug) => {
      if (!nonempty(lesson.slug)) slugDupes.push(`${courseSlug}:empty-slug`);
      const prevSlug = slugs.get(lesson.slug);
      if (prevSlug) slugDupes.push(`${lesson.slug} (${prevSlug} & ${courseSlug})`);
      else slugs.set(lesson.slug, courseSlug);
      for (const ex of lesson.exercises) {
        if (!nonempty(ex.id)) idDupes.push(`${courseSlug}/${lesson.slug}:empty-id`);
        const prev = ids.get(ex.id);
        if (prev) idDupes.push(`${ex.id} (${prev} & ${courseSlug}/${lesson.slug})`);
        else ids.set(ex.id, `${courseSlug}/${lesson.slug}`);
      }
    });
    expect(slugDupes).toEqual([]);
    expect(idDupes).toEqual([]);
  });

  it("requires bilingual prompts and paired non-empty explanations", () => {
    const gaps: string[] = [];
    everyLesson((lesson, courseSlug) => {
      for (const ex of lesson.exercises) {
        const loc = `${courseSlug}/${lesson.slug}/${ex.id}`;
        if (PROMPT_TYPES.has(ex.type)) {
          const rec = ex as Exercise & { promptUk?: string; promptEn?: string };
          if (!nonempty(rec.promptUk)) gaps.push(`${loc}:promptUk`);
          if (!nonempty(rec.promptEn)) gaps.push(`${loc}:promptEn`);
        }
        const expl = ex as Exercise & { explanationUk?: string; explanationEn?: string };
        const uk = expl.explanationUk;
        const en = expl.explanationEn;
        if (uk !== undefined || en !== undefined) {
          if (!nonempty(uk)) gaps.push(`${loc}:explanationUk`);
          if (!nonempty(en)) gaps.push(`${loc}:explanationEn`);
        }
      }
    });
    expect(gaps).toEqual([]);
  });

  it("rejects malformed exercises", () => {
    const gaps: string[] = [];
    everyLesson((lesson, courseSlug) => {
      for (const ex of lesson.exercises) {
        const loc = `${courseSlug}/${lesson.slug}/${ex.id} (${ex.type})`;
        switch (ex.type) {
          case "mcq":
          case "logic_puzzle":
          case "code_read": {
            const rec = ex as { options?: string[]; correctIndex?: number };
            checkMcq(loc, rec.options, rec.correctIndex, gaps);
            break;
          }
          case "comprehension": {
            const rec = ex as {
              passage?: string;
              questions?: { q: string; options: string[]; correctIndex: number }[];
            };
            if (!nonempty(rec.passage)) gaps.push(`${loc}:passage`);
            if (!Array.isArray(rec.questions) || rec.questions.length === 0) {
              gaps.push(`${loc}:questions`);
            }
            for (const [i, q] of (rec.questions ?? []).entries()) {
              if (!nonempty(q.q)) gaps.push(`${loc}:q${i}`);
              checkMcq(`${loc}:q${i}`, q.options, q.correctIndex, gaps);
            }
            break;
          }
          case "fill_blank":
          case "translate":
          case "code_fill": {
            const rec = ex as { accepted?: string[] };
            if (!Array.isArray(rec.accepted) || rec.accepted.filter(nonempty).length === 0) {
              gaps.push(`${loc}:accepted`);
            }
            break;
          }
          case "match": {
            const rec = ex as { pairs?: { left: string; right: string }[] };
            if (!Array.isArray(rec.pairs) || rec.pairs.length < 2) gaps.push(`${loc}:pairs`);
            for (const p of rec.pairs ?? []) {
              if (!nonempty(p.left) || !nonempty(p.right)) gaps.push(`${loc}:empty-pair`);
            }
            break;
          }
          case "order_words":
          case "code_order": {
            const rec = ex as { correct?: string[] };
            if (!Array.isArray(rec.correct) || rec.correct.filter(nonempty).length < 2) {
              gaps.push(`${loc}:correct`);
            }
            break;
          }
          case "typing":
          case "rsvp": {
            const rec = ex as { text?: string };
            if (!nonempty(rec.text)) gaps.push(`${loc}:text`);
            break;
          }
          case "explain": {
            const rec = ex as { sampleAnswerUk?: string; sampleAnswerEn?: string };
            if (!nonempty(rec.sampleAnswerUk) || !nonempty(rec.sampleAnswerEn)) {
              gaps.push(`${loc}:sampleAnswer`);
            }
            break;
          }
          default:
            break;
        }
      }
    });
    expect(gaps).toEqual([]);
  });

});
