import { expect, it } from "vitest";
import * as content from "./index.js";
import type { CourseContent } from "./types.js";

it("provides exactly one visible placeholder for each code-fill answer", () => {
  const issues: string[] = [];
  for (const value of Object.values(content)) {
    if (!value || typeof value !== "object" || !("units" in value) || !Array.isArray(value.units)) continue;
    const course = value as CourseContent;
    for (const unit of course.units) for (const lesson of unit.lessons) for (const exercise of lesson.exercises) {
      if (exercise.type !== "code_fill") continue;
      const count = (exercise.code.match(/___/g) ?? []).length;
      if (count !== 1) issues.push(`${course.slug}/${lesson.slug}/${exercise.id}: ${count}`);
    }
  }
  expect(issues).toEqual([]);
});

it("keeps QA theory text free of replacement question-mark sequences", () => {
  expect(JSON.stringify(content.qaTheoryContent)).not.toMatch(/\?{3}/);
});

it("provides English choices for assembled QA theory multiple-choice questions", () => {
  const missing: string[] = [];
  for (const unit of content.qaTheoryContent.units) for (const lesson of unit.lessons) for (const exercise of lesson.exercises) {
    if (exercise.type === "mcq" && (!exercise.optionsEn || exercise.optionsEn.length !== exercise.options.length)) {
      missing.push(`${lesson.slug}/${exercise.id}`);
    }
  }
  expect(missing).toEqual([]);
});

it("provides English choices for assembled software testing questions", () => {
  const missing: string[] = [];
  for (const unit of content.softwareTestingContent.units) for (const lesson of unit.lessons) for (const exercise of lesson.exercises) {
    if ((exercise.type === "mcq" || exercise.type === "code_read" || exercise.type === "code_output") &&
        exercise.options && (!exercise.optionsEn || exercise.optionsEn.length !== exercise.options.length)) {
      missing.push(`${lesson.slug}/${exercise.id}`);
    }
  }
  expect(missing).toEqual([]);
});

it("provides English choices for assembled Git workflow questions", () => {
  const missing: string[] = [];
  for (const unit of content.gitWorkflowsContent.units) for (const lesson of unit.lessons) for (const exercise of lesson.exercises) {
    if ((exercise.type === "mcq" || exercise.type === "code_read" || exercise.type === "code_output") &&
        exercise.options && (!exercise.optionsEn || exercise.optionsEn.length !== exercise.options.length)) {
      missing.push(`${lesson.slug}/${exercise.id}`);
    }
  }
  expect(missing).toEqual([]);
});

it("provides English choices for assembled React questions", () => {
  const missing: string[] = [];
  for (const unit of content.reactFundamentalsContent.units) for (const lesson of unit.lessons) for (const exercise of lesson.exercises) {
    if ((exercise.type === "mcq" || exercise.type === "code_read" || exercise.type === "code_output") &&
        exercise.options && (!exercise.optionsEn || exercise.optionsEn.length !== exercise.options.length)) {
      missing.push(`${lesson.slug}/${exercise.id}`);
    }
  }
  expect(missing).toEqual([]);
});
