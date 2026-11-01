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

  it("has 38 units and 155 lessons", () => {
    expect(units).toHaveLength(38);
    expect(lessons).toHaveLength(155);
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
