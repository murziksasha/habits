import { describe, expect, it } from "vitest";
import { ORACLE_SECTION_IDS, ORACLE_UNIT_META } from "@eduforge/shared";
import { sqlFundamentalsContent } from "./sql-fundamentals.js";
import { firstOptionAccuracy } from "./sql-exam-balance.js";
import type { Exercise } from "./types.js";

const NEW_UNITS = [
  "modern-select",
  "grouping-analytics",
  "modern-dml",
  "sql-json",
  "json-duality",
  "vectors",
  "property-graphs",
  "plsql-blocks",
  "plsql-cursors",
  "plsql-exceptions",
  "plsql-routines",
  "plsql-packages",
  "plsql-triggers",
  "plsql-collections",
  "plsql-dynamic",
  "dba-architecture",
  "dba-connect",
  "dba-security",
  "dba-storage",
  "dba-transactions",
  "dba-optimizer",
  "dba-backup",
  "dba-operations",
] as const;

function codeBlob(ex: Exercise): string {
  switch (ex.type) {
    case "code_fill":
      return `${ex.code}\n${ex.accepted.join(" ")}`;
    case "code_read":
      return ex.code;
    case "code_order":
      return `${ex.lines.join("\n")}\n${ex.correct.join("\n")}`;
    case "concept":
      return ex.code ?? "";
    default:
      return "";
  }
}

describe("Oracle path curriculum", () => {
  const units = sqlFundamentalsContent.units;
  const lessons = units.flatMap((u) => u.lessons);

  it("has 40 units and 161 lessons", () => {
    expect(units).toHaveLength(40);
    expect(lessons).toHaveLength(161);
  });

  it("adds 23 units of three lessons and an exam", () => {
    expect(NEW_UNITS).toHaveLength(23);
    for (const slug of NEW_UNITS) {
      const unit = units.find((u) => u.slug === slug);
      expect(unit, slug).toBeTruthy();
      expect(unit!.lessons).toHaveLength(4);
      const exam = unit!.lessons[3]!;
      expect(exam.isExam).toBe(true);
      for (const lesson of unit!.lessons.slice(0, 3)) {
        expect(lesson.isExam).toBeFalsy();
        expect(lesson.exercises[0]?.type).toBe("concept");
        expect(lesson.exercises.map((e) => e.type)).toEqual(["concept", "code_read", expect.any(String), "explain"]);
      }
      expect(exam.exercises.some((e) => e.type === "concept")).toBe(false);
    }
  });

  it("keeps every unit on the Oracle section map", () => {
    for (const unit of units) {
      const meta = ORACLE_UNIT_META[unit.slug];
      expect(meta, unit.slug).toBeTruthy();
      expect(ORACLE_SECTION_IDS).toContain(meta!.section);
    }
  });

  it("keeps the SQL capstone at the end of the SQL section", () => {
    const slugs = units.map((u) => u.slug);
    const cap = slugs.indexOf("capstone");
    expect(slugs.slice(0, cap).every((s) => ORACLE_UNIT_META[s]?.section === "sql")).toBe(true);
    expect(slugs[cap + 1]).toBe("plsql-blocks");
    expect(slugs.at(-1)).toBe("dba-operations");
  });

  it("does not let the first choice pass an exam", () => {
    for (const lesson of lessons.filter((l) => l.isExam)) {
      expect(firstOptionAccuracy(lesson.exercises), lesson.slug).toBeLessThan(0.7);
    }
  });

  it("does not teach PostgreSQL dialect as Oracle code", () => {
    const banned = /WITH\s+RECURSIVE|EXPLAIN\s+ANALYZE|\bnow\s*\(|interval\s+'/i;
    for (const lesson of lessons) {
      for (const ex of lesson.exercises) {
        const blob = codeBlob(ex);
        expect(blob, ex.id).not.toMatch(banned);
        if (ex.type === "code_fill" && ex.accepted.some((a) => a.toUpperCase() === "LIMIT")) {
          expect(ex.code, ex.id).toMatch(/BULK COLLECT/i);
        }
        if (!/BULK COLLECT/i.test(blob)) {
          expect(blob, ex.id).not.toMatch(/\bLIMIT\b/i);
        }
      }
    }
  });
});


describe("Oracle BOOLEAN CHECK teaching", () => {
  it("rejects NULL for IS TRUE in both the worked example and exam", () => {
    const exercises = sqlFundamentalsContent.units.flatMap((unit) => unit.lessons.flatMap((lesson) => lesson.exercises));
    const worked = exercises.find((exercise) => exercise.id === "sqlf-mod-bool-check-w");
    expect(worked?.type).toBe("code_read");
    if (!worked || worked.type !== "code_read") throw new Error("Missing BOOLEAN worked example");
    expect(worked.options[worked.correctIndex]).toContain("заборонено");
    const question = exercises.find((exercise) => exercise.type === "mcq" && exercise.promptUk === "CHECK (active IS TRUE) і значення UNKNOWN:");
    expect(question?.type).toBe("mcq");
    if (!question || question.type !== "mcq") throw new Error("Missing BOOLEAN exam question");
    expect(question.options[question.correctIndex]).toContain("відхиляється");
  });
});


describe("Oracle direct update teaching", () => {
  it("uses SET ... FROM and asks for WHERE in the join exercise", () => {
    const lesson = sqlFundamentalsContent.units.flatMap((unit) => unit.lessons).find((item) => item.slug === "sqlf-dml-join");
    const example = lesson?.exercises.find((exercise) => exercise.id === "sqlf-dml-join-w");
    const fill = lesson?.exercises.find((exercise) => exercise.id === "sqlf-dml-join-r");
    expect(example?.type).toBe("code_read");
    expect(fill?.type).toBe("code_fill");
    if (!example || example.type !== "code_read" || !fill || fill.type !== "code_fill") throw new Error("Missing direct update exercises");
    expect(example.code).toMatch(/UPDATE emp e SET e\.bonus = 100 FROM dept d WHERE/i);
    expect(fill.accepted.map((answer) => answer.toUpperCase())).toContain("WHERE");
  });
});


describe("Oracle duality view teaching", () => {
  it("defines a document identifier and explicitly permits the example insert", () => {
    const lesson = sqlFundamentalsContent.units.flatMap((unit) => unit.lessons).find((item) => item.slug === "sqlf-dv-idea");
    const concept = lesson?.exercises.find((exercise) => exercise.type === "concept");
    const worked = lesson?.exercises.find((exercise) => exercise.type === "code_read");
    expect(concept?.type).toBe("concept");
    expect(worked?.type).toBe("code_read");
    if (!concept || concept.type !== "concept" || !worked || worked.type !== "code_read") throw new Error("Missing duality exercises");
    expect(concept.code).toContain("'_id'");
    expect(concept.code).toContain("WITH INSERT");
    expect(worked.code).toContain('"_id"');
  });
});


describe("Oracle transaction exam", () => {
  it("credits the durable insert after a syntactically valid DDL statement", () => {
    const exercises = sqlFundamentalsContent.units.flatMap((unit) => unit.lessons.flatMap((lesson) => lesson.exercises));
    const question = exercises.find((exercise) => exercise.type === "mcq" && exercise.promptEn?.startsWith("INSERT, then a syntactically valid ALTER TABLE"));
    expect(question?.type).toBe("mcq");
    if (!question || question.type !== "mcq") throw new Error("Missing transaction exam question");
    expect(question.options[question.correctIndex]).toContain("Лишається");
    expect(question.optionsEn?.[question.correctIndex]).toContain("Remains");
  });
});


describe("Oracle DBA exam translations", () => {
  it("provides aligned English choices for every DBA exam", () => {
    const units = sqlFundamentalsContent.units.filter((unit) => unit.slug.startsWith("dba-"));
    expect(units).toHaveLength(8);
    for (const unit of units) {
      const exams = unit.lessons.filter((lesson) => lesson.isExam);
      expect(exams, unit.slug).toHaveLength(1);
      for (const exercise of exams[0]!.exercises) {
        if (exercise.type !== "mcq" && exercise.type !== "code_read" && exercise.type !== "code_output") continue;
        expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      }
    }
  });
});


describe("Oracle PL/SQL exam translations", () => {
  it("provides aligned English choices for every PL/SQL exam", () => {
    const units = sqlFundamentalsContent.units.filter((unit) => unit.slug.startsWith("plsql-"));
    expect(units).toHaveLength(8);
    for (const unit of units) {
      const exams = unit.lessons.filter((lesson) => lesson.isExam);
      expect(exams, unit.slug).toHaveLength(1);
      for (const exercise of exams[0]!.exercises) {
        if (exercise.type !== "mcq" && exercise.type !== "code_read" && exercise.type !== "code_output") continue;
        expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      }
    }
  });
});


describe("Oracle modern SQL exam translations", () => {
  it("provides English options for JSON, DML, duality, vector, and graph exams", () => {
    const slugs = ["modern-select", "grouping-analytics", "modern-dml", "sql-json", "json-duality", "vectors", "property-graphs"];
    for (const slug of slugs) {
      const unit = sqlFundamentalsContent.units.find((item) => item.slug === slug);
      const exam = unit?.lessons.find((item) => item.isExam);
      expect(exam, slug).toBeDefined();
      for (const exercise of exam!.exercises) {
        if (exercise.type !== "mcq" && exercise.type !== "code_read" && exercise.type !== "code_output") continue;
        expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      }
    }
  });
});


describe("Oracle course choice localization", () => {
  it("does not expose untranslated Cyrillic choices in English", () => {
    const missing: string[] = [];
    for (const unit of sqlFundamentalsContent.units) for (const lesson of unit.lessons) for (const exercise of lesson.exercises) {
      if (exercise.type !== "mcq" && exercise.type !== "code_read" && exercise.type !== "code_output") continue;
      if (exercise.options.some((option) => /[А-Яа-яІіЇїЄєҐґ]/.test(option)) && !exercise.optionsEn) missing.push(exercise.id);
    }
    expect(missing).toEqual([]);
  });
});
