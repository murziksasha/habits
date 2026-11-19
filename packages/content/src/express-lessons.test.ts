import { describe, expect, it } from "vitest";
import { gradeCodeProjectChecks, gradeExercise } from "@eduforge/shared";
import { expressFundamentalsContent } from "./index.js";
import { newUnits } from "./expansion/express-fundamentals-exp.js";

describe("Express response lessons", () => {
  it("requires the explicitly requested 201 Created status", () => {
    const exercise = expressFundamentalsContent.units.flatMap((unit) => unit.lessons)
      .flatMap((lesson) => lesson.exercises).find((item) => item.id === "ef-s6");
    if (!exercise || exercise.type !== "code_fill") throw new Error("Created status exercise missing");
    expect(gradeExercise(exercise, "201").correct).toBe(true);
    expect(gradeExercise(exercise, "200").correct).toBe(false);
  });
});

describe("Express pagination project", () => {
  it("requires changes to the starter before its static checks pass", () => {
    const exercise = expressFundamentalsContent.units.flatMap((unit) => unit.lessons)
      .flatMap((lesson) => lesson.exercises).find((item) => item.id === "ef-ca6");
    if (!exercise || exercise.type !== "code_project") throw new Error("Pagination project missing");
    const starter = Object.fromEntries(exercise.files.map((file) => [file.id, file.starter]));
    expect(gradeCodeProjectChecks(starter, exercise.checks).ok).toBe(false);
  });
});

describe("Express health capstone", () => {
  it("requires work on the starter and accepts a representative solution", () => {
    const exercise = expressFundamentalsContent.units.flatMap((unit) => unit.lessons)
      .flatMap((lesson) => lesson.exercises).find((item) => item.id === "ef-c1");
    if (!exercise || exercise.type !== "code_project") throw new Error("Health capstone missing");
    const starter = Object.fromEntries(exercise.files.map((file) => [file.id, file.starter]));
    expect(gradeCodeProjectChecks(starter, exercise.checks).ok).toBe(false);
    expect(gradeCodeProjectChecks({
      js: "const express = require('express'); const app = express(); app.use(express.json()); app.get('/health', (req, res) => res.json({ ok: true })); const port = Number(process.env.PORT ?? 3000); if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('invalid port'); app.listen(port);",
      json: '{"dependencies":{"express":"^4.21.0"},"scripts":{"start":"node app.js"}}',
      md: "Run npm start, then curl http://localhost:3000/health.",
    }, exercise.checks).ok).toBe(true);
  });
});

describe("Express session lessons", () => {
  it("provides English options for every choice in the cookie unit", () => {
    const unit = newUnits.find((item) => item.slug === "cookies_sessions")!;
    for (const exercise of unit.lessons.flatMap((lesson) => lesson.exercises)) {
      if (exercise.type !== "mcq" && exercise.type !== "code_read" && exercise.type !== "code_output") continue;
      const optionsEn = (exercise as typeof exercise & { optionsEn?: string[] }).optionsEn;
      expect(optionsEn, exercise.id).toHaveLength(exercise.options?.length ?? 0);
      for (const option of optionsEn ?? []) expect(option, exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  });
});

describe("Express upload lessons", () => {
  it("provides English options for every choice in the uploads unit", () => {
    const unit = newUnits.find((item) => item.slug === "uploads_limits")!;
    for (const exercise of unit.lessons.flatMap((lesson) => lesson.exercises)) {
      if (exercise.type !== "mcq" && exercise.type !== "code_read" && exercise.type !== "code_output") continue;
      const optionsEn = (exercise as typeof exercise & { optionsEn?: string[] }).optionsEn;
      expect(optionsEn, exercise.id).toHaveLength(exercise.options?.length ?? 0);
      for (const option of optionsEn ?? []) expect(option, exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  });
});

describe("Express security-header lessons", () => {
  it("provides English options for every choice in the unit", () => {
    const unit = newUnits.find((item) => item.slug === "security_headers")!;
    for (const exercise of unit.lessons.flatMap((lesson) => lesson.exercises)) {
      if (exercise.type !== "mcq" && exercise.type !== "code_read" && exercise.type !== "code_output") continue;
      const optionsEn = (exercise as typeof exercise & { optionsEn?: string[] }).optionsEn;
      expect(optionsEn, exercise.id).toHaveLength(exercise.options?.length ?? 0);
      for (const option of optionsEn ?? []) expect(option, exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  });
});

describe("Express testing lessons", () => {
  const unit = newUnits.find((item) => item.slug === "testing_express")!;

  it("contains syntactically valid middleware-stub example code", () => {
    const lesson = unit.lessons.find((item) => item.slug === "ef-mw-unit-test");
    const card = lesson?.exercises.find((item) => item.type === "concept");
    if (!card || card.type !== "concept" || !card.code) throw new Error("Middleware example missing");
    expect(() => new Function("authorize", "assert", card.code)).not.toThrow();
  });

  it("provides English options for every choice in the unit", () => {
    for (const exercise of unit.lessons.flatMap((lesson) => lesson.exercises)) {
      if (exercise.type !== "mcq" && exercise.type !== "code_read" && exercise.type !== "code_output") continue;
      const optionsEn = (exercise as typeof exercise & { optionsEn?: string[] }).optionsEn;
      expect(optionsEn, exercise.id).toHaveLength(exercise.options?.length ?? 0);
      for (const option of optionsEn ?? []) expect(option, exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  });
});

describe("Express reservation transfer", () => {
  it("includes bilingual checks for concurrent retries, key conflicts, and user scope", () => {
    const lesson = expressFundamentalsContent.units.find((unit) => unit.slug === "testing_express")
      ?.lessons.find((item) => item.slug === "express-transfer-reservation");
    for (const id of ["express-transfer-reservation-q4", "express-transfer-reservation-q5", "express-transfer-reservation-q6"]) {
      const exercise = lesson?.exercises.find((item) => item.id === id);
      if (!exercise || exercise.type !== "mcq") throw new Error(`Missing ${id}`);
      expect(exercise.optionsEn).toHaveLength(exercise.options.length);
      expect(gradeExercise(exercise, 0).correct).toBe(true);
      expect(gradeExercise(exercise, 1).correct).toBe(false);
    }
  });
});

describe("Express error and router lessons", () => {
  it("requires the variable declared by each example", () => {
    const exercises = expressFundamentalsContent.units.flatMap((unit) => unit.lessons)
      .flatMap((lesson) => lesson.exercises);
    for (const [id, correct, wrong] of [["ef-e5", "err", "error"], ["ef-o2", "r", "router"]] as const) {
      const exercise = exercises.find((item) => item.id === id);
      if (!exercise || exercise.type !== "code_fill") throw new Error(`Missing ${id}`);
      expect(gradeExercise(exercise, correct).correct).toBe(true);
      expect(gradeExercise(exercise, wrong).correct).toBe(false);
    }
  });
});
