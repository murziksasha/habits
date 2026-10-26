import { describe, expect, it } from "vitest";
import { gradeExercise } from "./grade.js";

describe("gradeExercise", () => {
  it("grades mcq", () => {
    const ex = { id: "1", type: "mcq", options: ["a", "b"], correctIndex: 1 };
    expect(gradeExercise(ex, 1).correct).toBe(true);
    expect(gradeExercise(ex, 0).correct).toBe(false);
  });

  it("grades translate with normalization", () => {
    const ex = {
      id: "2",
      type: "translate",
      accepted: ["good morning", "доброго ранку"],
    };
    expect(gradeExercise(ex, "  Good Morning! ").correct).toBe(true);
    expect(gradeExercise(ex, "hello").correct).toBe(false);
  });

  it("grades match pairs", () => {
    const ex = {
      id: "3",
      type: "match",
      pairs: [
        { left: "a", right: "1" },
        { left: "b", right: "2" },
      ],
    };
    expect(
      gradeExercise(ex, [
        { left: "b", right: "2" },
        { left: "a", right: "1" },
      ]).correct,
    ).toBe(true);
    expect(gradeExercise(ex, [{ left: "a", right: "2" }]).correct).toBe(false);
  });

  it("grades code_run by source needles", () => {
    const ex = {
      id: "cr1",
      type: "code_run",
      language: "cpp",
      requiredSource: ["cout", "main"],
      forbiddenSource: ["system("],
    };
    expect(
      gradeExercise(ex, {
        source: `#include <iostream>
int main(){ cout << 1; return 0; }`,
      }).correct,
    ).toBe(true);
    expect(
      gradeExercise(ex, {
        source: `int main(){ system("x"); return 0; }`,
      }).correct,
    ).toBe(false);
    expect(gradeExercise(ex, { source: `void f(){}` }).correct).toBe(false);
  });

  it("grades order_words", () => {
    const ex = {
      id: "4",
      type: "order_words",
      correct: ["I", "am", "here"],
    };
    expect(gradeExercise(ex, ["I", "am", "here"]).correct).toBe(true);
    expect(gradeExercise(ex, ["am", "I", "here"]).correct).toBe(false);
  });

  it("grades typing thresholds", () => {
    const ex = { id: "5", type: "typing", text: "hello" };
    expect(gradeExercise(ex, { wpm: 30, accuracy: 0.9 }).correct).toBe(true);
    expect(gradeExercise(ex, { wpm: 5, accuracy: 1 }).correct).toBe(false);
    expect(gradeExercise(ex, { wpm: 40, accuracy: 0.5 }).correct).toBe(false);
  });

  it("grades rsvp completion", () => {
    const ex = { id: "6", type: "rsvp", wpm: 200, text: "a b c" };
    expect(gradeExercise(ex, { completed: true }).correct).toBe(true);
    expect(gradeExercise(ex, { completed: false }).correct).toBe(false);
  });

  it("grades comprehension ratio", () => {
    const ex = {
      id: "7",
      type: "comprehension",
      questions: [
        { correctIndex: 0 },
        { correctIndex: 1 },
      ],
    };
    const half = gradeExercise(ex, [0, 0]);
    expect(half.correct).toBe(true);
    expect(half.meta?.comprehension).toBe(0.5);
    expect(gradeExercise(ex, [1, 0]).correct).toBe(false);
  });

  it("grades code_fill case-sensitive by default", () => {
    const ex = {
      id: "cf1",
      type: "code_fill",
      code: "const x = ___;",
      accepted: ["useState"],
    };
    expect(gradeExercise(ex, "useState").correct).toBe(true);
    expect(gradeExercise(ex, "usestate").correct).toBe(false);
  });

  it("grades code_fill case-insensitive when configured", () => {
    const ex = {
      id: "cf2",
      type: "code_fill",
      code: "<___>",
      accepted: ["p"],
      caseSensitive: false,
    };
    expect(gradeExercise(ex, "P").correct).toBe(true);
  });

  it("grades code_output as mcq", () => {
    const ex = {
      id: "co1",
      type: "code_output",
      code: "console.log(1+1)",
      options: ["1", "2"],
      correctIndex: 1,
    };
    expect(gradeExercise(ex, 1).correct).toBe(true);
    expect(gradeExercise(ex, 0).correct).toBe(false);
  });

  it("grades code_order like order_words", () => {
    const ex = {
      id: "cord1",
      type: "code_order",
      lines: ["}", "fn() {"],
      correct: ["fn() {", "}"],
    };
    expect(gradeExercise(ex, ["fn() {", "}"]).correct).toBe(true);
    expect(gradeExercise(ex, ["}", "fn() {"]).correct).toBe(false);
  });

  it("grades code_read as mcq", () => {
    const ex = {
      id: "cr1",
      type: "code_read",
      code: "x",
      options: ["a", "b"],
      correctIndex: 0,
    };
    expect(gradeExercise(ex, 0).correct).toBe(true);
  });

  it("grades code_project dom selector soft-check on HTML source", () => {
    const ex = {
      id: "cp-dom",
      type: "code_project",
      files: [{ id: "html", name: "index.html", language: "html", starter: "" }],
      checks: [
        { kind: "dom", selector: "main" },
        { kind: "dom", selector: ".wrap" },
        { containsHtml: ["<header"] },
      ],
    };
    expect(
      gradeExercise(ex, {
        files: {
          html: '<header></header><main class="wrap">Hi</main>',
        },
      }).correct,
    ).toBe(true);
    expect(
      gradeExercise(ex, {
        files: { html: "<div>no main</div>" },
      }).correct,
    ).toBe(false);
  });

  it("grades code_project multi-file contains checks", () => {
    const ex = {
      id: "cp1",
      type: "code_project",
      files: [
        { id: "html", name: "index.html", language: "html", starter: "" },
        { id: "css", name: "style.css", language: "css", starter: "" },
      ],
      checks: [
        { fileId: "html", contains: ["<h1", "Hi"] },
        { fileId: "css", contains: ["color"] },
      ],
    };
    expect(
      gradeExercise(ex, {
        files: {
          html: "<h1>Hi</h1>",
          css: "h1 { color: red; }",
        },
      }).correct,
    ).toBe(true);
    expect(
      gradeExercise(ex, {
        files: { html: "<h1>Hi</h1>", css: "h1 {}" },
      }).correct,
    ).toBe(false);
    expect(
      gradeExercise(ex, {
        files: [
          { id: "html", content: "<h1>Hi there</h1>" },
          { id: "css", content: "color: blue" },
        ],
      }).correct,
    ).toBe(true);
  });

  it("grades chess_puzzle by san or solved flag", () => {
    const ex = {
      id: "8",
      type: "chess_puzzle",
      solutionSans: ["Re8#"],
    };
    expect(gradeExercise(ex, { solved: true }).correct).toBe(true);
    expect(gradeExercise(ex, { sans: ["Re8"] }).correct).toBe(true);
    expect(gradeExercise(ex, { sans: ["Re7"] }).correct).toBe(false);
  });

  it("grades chess_lesson quiz", () => {
    const ex = {
      id: "9",
      type: "chess_lesson",
      quiz: { correctIndex: 2 },
    };
    expect(gradeExercise(ex, 2).correct).toBe(true);
    expect(gradeExercise(ex, 0).correct).toBe(false);
  });

  it("unknown type is incorrect", () => {
    expect(gradeExercise({ id: "x", type: "nope" }, true).correct).toBe(false);
  });
});
