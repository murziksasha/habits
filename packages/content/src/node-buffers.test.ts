import { describe, expect, it } from "vitest";
import { gradeExercise } from "@eduforge/shared";
import { newUnits } from "./expansion/node-fundamentals-exp.js";
import { nodeFundamentalsContent } from "./index.js";

describe("Node buffer lessons", () => {
  const unit = newUnits.find((item) => item.slug === "buffers_bytes")!;

  it("accepts a real buffer copy and rejects allocation as a copy", () => {
    const exercise = unit.lessons.flatMap((lesson) => lesson.exercises)
      .find((item) => item.id === "nf-uint8-view-r2");
    if (!exercise || exercise.type !== "code_fill") throw new Error("Buffer copy exercise missing");
    expect(gradeExercise(exercise, "from").correct).toBe(true);
    expect(gradeExercise(exercise, "alloc").correct).toBe(false);
  });

  it("provides aligned English options for every choice in the unit", () => {
    for (const exercise of unit.lessons.flatMap((lesson) => lesson.exercises)) {
      if (exercise.type !== "mcq" && exercise.type !== "code_read" && exercise.type !== "code_output") continue;
      const optionsEn = (exercise as typeof exercise & { optionsEn?: string[] }).optionsEn;
      expect(optionsEn, exercise.id).toHaveLength(exercise.options?.length ?? 0);
      for (const option of optionsEn ?? []) expect(option, exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  });
});

describe("Node child-process lessons", () => {
  const unit = newUnits.find((item) => item.slug === "child_process_ipc")!;

  it("asks for the git subcommand that matches the example", () => {
    const exercise = unit.lessons.flatMap((lesson) => lesson.exercises)
      .find((item) => item.id === "nf-spawn-vs-exec-r2");
    if (!exercise || exercise.type !== "code_fill") throw new Error("Git command exercise missing");
    expect(gradeExercise(exercise, "log").correct).toBe(true);
    expect(gradeExercise(exercise, "status").correct).toBe(false);
  });

  it("provides aligned English choices throughout the unit", () => {
    for (const exercise of unit.lessons.flatMap((lesson) => lesson.exercises)) {
      if (exercise.type !== "mcq" && exercise.type !== "code_read" && exercise.type !== "code_output") continue;
      const optionsEn = (exercise as typeof exercise & { optionsEn?: string[] }).optionsEn;
      expect(optionsEn, exercise.id).toHaveLength(exercise.options?.length ?? 0);
      for (const option of optionsEn ?? []) expect(option, exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  });
});

describe("Node worker lessons", () => {
  it("provides aligned English choices throughout the unit", () => {
    const unit = newUnits.find((item) => item.slug === "workers_threads")!;
    for (const exercise of unit.lessons.flatMap((lesson) => lesson.exercises)) {
      if (exercise.type !== "mcq" && exercise.type !== "code_read" && exercise.type !== "code_output") continue;
      const optionsEn = (exercise as typeof exercise & { optionsEn?: string[] }).optionsEn;
      expect(optionsEn, exercise.id).toHaveLength(exercise.options?.length ?? 0);
      for (const option of optionsEn ?? []) expect(option, exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  });
});

describe("Node diagnostics lessons", () => {
  const unit = newUnits.find((item) => item.slug === "node_diagnostics")!;

  it("completes the diagnostics module name without an extra underscore", () => {
    const exercise = unit.lessons.flatMap((lesson) => lesson.exercises)
      .find((item) => item.id === "nf-diagnostic-channel-r2");
    if (!exercise || exercise.type !== "code_fill") throw new Error("Diagnostics import exercise missing");
    expect(gradeExercise(exercise, "_channel").correct).toBe(true);
    expect(exercise.code.replace("___", "_channel")).toContain("node:diagnostics_channel");
  });

  it("provides aligned English choices throughout the unit", () => {
    for (const exercise of unit.lessons.flatMap((lesson) => lesson.exercises)) {
      if (exercise.type !== "mcq" && exercise.type !== "code_read" && exercise.type !== "code_output") continue;
      const optionsEn = (exercise as typeof exercise & { optionsEn?: string[] }).optionsEn;
      expect(optionsEn, exercise.id).toHaveLength(exercise.options?.length ?? 0);
      for (const option of optionsEn ?? []) expect(option, exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  });
});

describe("Node import transfer scenario", () => {
  it("checks cancellation at the deadline and an oversized CSV record", () => {
    const lesson = nodeFundamentalsContent.units.find((unit) => unit.slug === "node_diagnostics")
      ?.lessons.find((item) => item.slug === "node-transfer-import");
    for (const id of ["node-transfer-import-q4", "node-transfer-import-q5"]) {
      const exercise = lesson?.exercises.find((item) => item.id === id);
      if (!exercise || exercise.type !== "mcq") throw new Error(`Missing ${id}`);
      expect(exercise.optionsEn).toHaveLength(exercise.options.length);
      expect(gradeExercise(exercise, 0).correct).toBe(true);
      expect(gradeExercise(exercise, 1).correct).toBe(false);
    }
  });
});
