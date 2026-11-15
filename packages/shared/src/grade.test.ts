import { describe, expect, it } from "vitest";
import { gradeCodeProjectChecks, gradeExercise, normCode } from "./grade.js";

describe("normCode", () => {
  it("collapses whitespace", () => {
    expect(normCode("  a   b  ", true)).toBe("a b");
  });
});

describe("gradeExercise", () => {
  it("grades mcq", () => {
    expect(gradeExercise({ id: "1", type: "mcq", correctIndex: 2 }, 2).correct).toBe(true);
    expect(gradeExercise({ id: "1", type: "mcq", correctIndex: 2 }, 0).correct).toBe(false);
  });

  it("grades code_fill", () => {
    const ex = { id: "1", type: "code_fill", accepted: ["const x = 1"] };
    expect(gradeExercise(ex, "const x = 1").correct).toBe(true);
    expect(gradeExercise(ex, "const  x  = 1").correct).toBe(true);
  });

  it("grades code_project via shared checks", () => {
    const ex = {
      id: "1",
      type: "code_project",
      checks: [{ fileId: "html", contains: ["<h1>"] }],
    };
    expect(
      gradeExercise(ex, { files: { html: "<h1>Hi</h1>" } }).correct,
    ).toBe(true);
    const bad = gradeExercise(ex, { files: { html: "<p>no</p>" } });
    expect(bad.correct).toBe(false);
    expect(Array.isArray(bad.meta?.missing)).toBe(true);
  });

  it("code_fill staticAsserts give partial", () => {
    const ex = {
      id: "1",
      type: "code_fill",
      accepted: ["never_match_exact_zzz"],
      staticAsserts: [{ has: "const" }, { has: "function" }],
    };
    const r = gradeExercise(ex, "const x = 1");
    expect(r.correct).toBe(false);
    expect(r.partial).toBeCloseTo(0.5);
  });

  it("match and order_words include miss meta", () => {
    const match = gradeExercise(
      {
        id: "m",
        type: "match",
        pairs: [
          { left: "a", right: "1" },
          { left: "b", right: "2" },
        ],
      },
      [
        { left: "a", right: "2" },
        { left: "b", right: "1" },
      ],
    );
    expect(match.correct).toBe(false);
    expect(String(match.meta?.missing?.[0] ?? "")).toContain("wrong_pairs");

    const order = gradeExercise(
      { id: "o", type: "order_words", correct: ["a", "b", "c"] },
      ["a", "c", "b"],
    );
    expect(order.correct).toBe(false);
    expect(String(order.meta?.missing?.[0] ?? "")).toContain("order_slots");
  });
});

describe("gradeCodeProjectChecks", () => {
  it("detects class selectors", () => {
    const r = gradeCodeProjectChecks(
      { html: '<div class="hero box"></div>' },
      [{ kind: "dom", selector: ".hero" }],
    );
    expect(r.ok).toBe(true);
  });
});
