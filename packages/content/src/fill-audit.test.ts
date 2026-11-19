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


it("provides English choices in assembled Oracle hierarchy lessons", () => {
  const unit = content.sqlFundamentalsContent.units.find((item) => item.slug === "hierarchical_queries");
  expect(unit).toBeDefined();
  for (const lesson of unit!.lessons) for (const exercise of lesson.exercises) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read" && exercise.type !== "code_output") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
});


it("grades Oracle MV dictionary and partition boundaries correctly", () => {
  const exercises = content.sqlFundamentalsContent.units.flatMap((unit) => unit.lessons.flatMap((lesson) => lesson.exercises));
  const dictionary = exercises.find((exercise) => exercise.id === "sqlf-mv-stale-r2");
  const boundary = exercises.find((exercise) => exercise.id === "sqlf-part-prune-r2");
  if (!dictionary || dictionary.type !== "code_fill" || !boundary || boundary.type !== "code_fill") throw new Error("Missing SQL fill exercises");
  expect(dictionary.accepted.map((answer) => answer.toUpperCase())).toEqual(["USER_MVIEWS", "USER_MVIEWS"]);
  expect(dictionary.code).toContain("FROM ___");
  expect(boundary.accepted).toEqual(["<"]);
});

it("provides English choices in assembled Oracle materialized-view lessons", () => {
  const unit = content.sqlFundamentalsContent.units.find((item) => item.slug === "materialized_views");
  expect(unit).toBeDefined();
  for (const lesson of unit!.lessons) for (const exercise of lesson.exercises) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read" && exercise.type !== "code_output") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
});


it("provides English choices in assembled Oracle partitioning lessons", () => {
  const unit = content.sqlFundamentalsContent.units.find((item) => item.slug === "table_partitioning");
  expect(unit).toBeDefined();
  for (const lesson of unit!.lessons) for (const exercise of lesson.exercises) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read" && exercise.type !== "code_output") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
});


it("provides English choices and a complete ASH view name in assembled SQL profiling", () => {
  const unit = content.sqlFundamentalsContent.units.find((item) => item.slug === "sql_profiling");
  expect(unit).toBeDefined();
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  for (const exercise of exercises) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read" && exercise.type !== "code_output") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
  const fill = exercises.find((exercise) => exercise.id === "sqlf-ash-waits-r2");
  if (!fill || fill.type !== "code_fill") throw new Error("Missing ASH exercise");
  expect(fill.code).toContain("FROM ___");
  expect(fill.accepted).toContain("V$ACTIVE_SESSION_HISTORY");
});


it("does not expose untranslated choices in the assembled Oracle course", () => {
  const missing: string[] = [];
  for (const unit of content.sqlFundamentalsContent.units) for (const lesson of unit.lessons) for (const exercise of lesson.exercises) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read" && exercise.type !== "code_output") continue;
    if (exercise.options.some((option) => /[А-Яа-яІіЇїЄєҐґ]/.test(option)) && !exercise.optionsEn) missing.push(exercise.id);
  }
  expect(missing).toEqual([]);
});


it("localizes explanatory answer choices in the English grammar and workplace lessons", () => {
  const ids = ["en-dlg-4", "en-dlg-26", "en-eng-5", "en-eng-e2", "en-a-an-1", "en-a-an-2", "en-zero-1", "en-zero-3", "en-rd-3", "en-rr-1", "en-pp-3", "en-pt-1", "en-pm-1", "en-rnd-1", "en-mm-1", "en-my-1", "en-my-3", "en-mrv-2", "en-tb-1", "en-td-1", "en-tm-1"];
  const exercises = content.englishContent.units.flatMap((unit) => unit.lessons.flatMap((lesson) => lesson.exercises));
  for (const id of ids) {
    const exercise = exercises.find((item) => item.id === id);
    if (!exercise || exercise.type !== "mcq") throw new Error(`Missing English choice exercise ${id}`);
    expect(exercise.optionsEn, id).toHaveLength(exercise.options.length);
  }
});


it("provides English answers in the sysadmin foundations exercises", () => {
  const unit = content.sysadminContent.units.find((item) => item.slug === "foundations");
  expect(unit).toBeDefined();
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises).filter((exercise) => /^sa-f\d+$/.test(exercise.id));
  expect(exercises).toHaveLength(26);
  for (const exercise of exercises) {
    if (exercise.type === "mcq" || exercise.type === "code_read") {
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
    if (exercise.type === "match") {
      expect(exercise.pairsEn, exercise.id).toHaveLength(exercise.pairs.length);
      expect(JSON.stringify(exercise.pairsEn), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
});


it("provides English answers in the sysadmin office networking exercises", () => {
  const unit = content.sysadminContent.units.find((item) => item.slug === "soho-network");
  expect(unit).toBeDefined();
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises).filter((exercise) => /^sa-n\d+$/.test(exercise.id));
  expect(exercises).toHaveLength(26);
  for (const exercise of exercises) {
    if (exercise.type === "mcq") {
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
    if (exercise.type === "match") {
      expect(exercise.pairsEn, exercise.id).toHaveLength(exercise.pairs.length);
      expect(JSON.stringify(exercise.pairsEn), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
});


it("provides English answers in the sysadmin office care exercises", () => {
  const unit = content.sysadminContent.units.find((item) => item.slug === "soho-care");
  expect(unit).toBeDefined();
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises).filter((exercise) => /^sa-c\d+$/.test(exercise.id));
  expect(exercises).toHaveLength(26);
  for (const exercise of exercises) {
    if (exercise.type === "mcq") {
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
    if (exercise.type === "match") {
      expect(exercise.pairsEn, exercise.id).toHaveLength(exercise.pairs.length);
      expect(JSON.stringify(exercise.pairsEn), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
});


it("provides English answers in the sysadmin Windows exercises", () => {
  const unit = content.sysadminContent.units.find((item) => item.slug === "windows-client");
  expect(unit).toBeDefined();
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises).filter((exercise) => /^sa-w\d+$/.test(exercise.id));
  expect(exercises).toHaveLength(26);
  for (const exercise of exercises) {
    if (exercise.type === "mcq" || exercise.type === "code_read") {
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
    if (exercise.type === "match") {
      expect(exercise.pairsEn, exercise.id).toHaveLength(exercise.pairs.length);
      expect(JSON.stringify(exercise.pairsEn), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
});


it("localizes sysadmin shell choices and requires the specified directory name", () => {
  const unit = content.sysadminContent.units.find((item) => item.slug === "shell");
  expect(unit).toBeDefined();
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises).filter((exercise) => /^sa-s\d+$/.test(exercise.id));
  expect(exercises).toHaveLength(26);
  for (const exercise of exercises) {
    if (exercise.type === "mcq" || exercise.type === "code_read") {
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
  const directory = exercises.find((exercise) => exercise.id === "sa-s13");
  expect(directory?.type).toBe("code_fill");
  if (!directory || directory.type !== "code_fill") throw new Error("Missing shell directory exercise");
  expect(directory.accepted).toEqual(["Files"]);
  expect(directory.caseSensitive).toBe(true);
});


it("localizes sysadmin file exercises and searches only regular files", () => {
  const unit = content.sysadminContent.units.find((item) => item.slug === "files-perms");
  expect(unit).toBeDefined();
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises).filter((exercise) => /^sa-p\d+$/.test(exercise.id));
  expect(exercises).toHaveLength(26);
  for (const exercise of exercises) {
    if (exercise.type === "mcq" || exercise.type === "code_read") {
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
  const findFiles = exercises.find((exercise) => exercise.id === "sa-p08");
  expect(findFiles?.type).toBe("code_fill");
  if (!findFiles || findFiles.type !== "code_fill") throw new Error("Missing find exercise");
  expect(findFiles.code).toContain("-type f");
});


it("provides English answers in the sysadmin text, packages, and Git exercises", () => {
  const unit = content.sysadminContent.units.find((item) => item.slug === "text-packages");
  expect(unit).toBeDefined();
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises).filter((exercise) => /^sa-t\d+$/.test(exercise.id));
  expect(exercises).toHaveLength(26);
  for (const exercise of exercises) {
    if (exercise.type === "mcq") {
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
});


it("provides English answers in the sysadmin process exercises", () => {
  const unit = content.sysadminContent.units.find((item) => item.slug === "processes");
  expect(unit).toBeDefined();
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises).filter((exercise) => /^sa-pr\d+$/.test(exercise.id));
  expect(exercises).toHaveLength(27);
  for (const exercise of exercises) {
    if (exercise.type === "mcq" || exercise.type === "code_read") {
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
});


it("provides English answers in the sysadmin network command exercises", () => {
  const unit = content.sysadminContent.units.find((item) => item.slug === "net-cli");
  expect(unit).toBeDefined();
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises).filter((exercise) => /^sa-nc\d+$/.test(exercise.id));
  expect(exercises).toHaveLength(26);
  for (const exercise of exercises) {
    if (exercise.type === "mcq" || exercise.type === "code_read") {
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
});
