import { describe, expect, it } from "vitest";
import { gradeCodeProjectChecks, gradeExercise, normCode } from "./grade.js";

import { describe, expect, it } from "vitest";
import {
  gradeCodeJudgeText,
  gradeCodeProjectChecks,
  gradeExercise,
  isCodeEquivalent,
  normCode,
  normText,
} from "./grade.js";

describe("normText", () => {
  it("normalizes Ukrainian apostrophes and quotes", () => {
    expect(normText("комп'ютер")).toBe(normText("комп’ютер"));
    expect(normText("компʼютер")).toBe(normText("комп`ютер"));
    expect(normText("«Привіт»!")).toBe("привіт");
    expect(normText('"hello"')).toBe("hello");
  });

  it("normalizes English contractions and trailing punctuation", () => {
    expect(normText("Don't...")).toBe("don't");
    expect(normText("don’t!")).toBe("don't");
    expect(normText("It is a cat.")).toBe("it is a cat");
  });
});

describe("normCode and isCodeEquivalent", () => {
  it("collapses whitespace and operator spacing", () => {
    expect(isCodeEquivalent("return a + b;", "return a+b")).toBe(true);
    expect(isCodeEquivalent("const x = 5;", "const x=5")).toBe(true);
    expect(isCodeEquivalent("fn(a, b)", "fn(a,b)")).toBe(true);
  });

  it("normalizes single and double quotes", () => {
    expect(isCodeEquivalent("console.log('hello')", 'console.log("hello")')).toBe(true);
  });

  it("normalizes CSS declarations and font-size formatting", () => {
    expect(isCodeEquivalent("font-size: 16px;", "font-size:16px")).toBe(true);
    expect(isCodeEquivalent("font-size: 16px", "font-size: 16px;")).toBe(true);
  });
});

describe("gradeExercise", () => {
  it("grades mcq", () => {
    expect(gradeExercise({ id: "1", type: "mcq", correctIndex: 2 }, 2).correct).toBe(true);
    expect(gradeExercise({ id: "1", type: "mcq", correctIndex: 2 }, 0).correct).toBe(false);
  });

  it("grades code_fill with equivalent code variations", () => {
    const ex = { id: "1", type: "code_fill", accepted: ["return a + b;"] };
    expect(gradeExercise(ex, "return a + b;").correct).toBe(true);
    expect(gradeExercise(ex, "return a+b").correct).toBe(true);
    expect(gradeExercise(ex, "return a  +  b ;").correct).toBe(true);
  });

  it("grades code_output with equivalent quotes and spacing", () => {
    const ex = { id: "1", type: "code_output", accepted: ['"hello world"'] };
    expect(gradeExercise(ex, "'hello world'").correct).toBe(true);
    expect(gradeExercise(ex, '"hello world"').correct).toBe(true);
  });

  it("rejects untrusted client spoofing in code_judge", () => {
    const ex = {
      id: "j1",
      type: "code_judge",
      language: "javascript",
      starter: "",
      tests: [{ type: "stdout_contains", value: "hello" }],
    };
    // Client trying to spoof { ok: true } without server execution
    const spoofed = gradeExercise(ex, { ok: true, testsPassed: 10, testsTotal: 10 });
    expect(spoofed.correct).toBe(false);
    expect(spoofed.meta?.reason).toBe("untrusted_client_result");

    // Server-verified execution passes
    const verified = gradeExercise(ex, {
      _serverVerified: true,
      ok: true,
      testsPassed: 1,
      testsTotal: 1,
    });
    expect(verified.correct).toBe(true);
  });

  it("grades code_judge in text mode statically", () => {
    const ex = {
      id: "j2",
      type: "code_judge",
      language: "javascript",
      starter: "",
      tests: [{ type: "stdout_contains", value: "42" }],
      requiredSource: ["console.log"],
    };
    // Text mode passes with static criteria
    const pass = gradeExercise(ex, {
      mode: "text",
      source: "console.log(42);",
    });
    expect(pass.correct).toBe(true);
    expect(pass.meta?.mode).toBe("text");

    // Text mode fails if required element is missing
    const fail = gradeExercise(ex, {
      mode: "text",
      source: "const x = 42;",
    });
    expect(fail.correct).toBe(false);
  });

  it("grades code_project via shared checks with equivalent styling", () => {
    const ex = {
      id: "1",
      type: "code_project",
      checks: [
        { fileId: "css", contains: ["font-size: 16px;"] },
      ],
    };
    expect(
      gradeExercise(ex, { files: { css: "#count { font-size:16px; }" } }).correct,
    ).toBe(true);
    const bad = gradeExercise(ex, { files: { css: "#count { color: red; }" } });
    expect(bad.correct).toBe(false);
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

  it("grades composite_artifact, dataset_query, and incident_step", () => {
    // composite_artifact
    const compositeEx = {
      id: "ca-1",
      type: "composite_artifact",
      checks: [{ fileId: "index.html", contains: ["<nav>"] }],
    };
    expect(
      gradeExercise(compositeEx, { files: { "index.html": "<nav>Menu</nav>" } }).correct,
    ).toBe(true);
    expect(
      gradeExercise(compositeEx, { files: { "index.html": "<div>Menu</div>" } }).correct,
    ).toBe(false);

    // dataset_query
    const datasetEx = {
      id: "dq-1",
      type: "dataset_query",
      requiredKeywords: ["SELECT", "GROUP BY", "HAVING"],
      forbiddenKeywords: ["DROP", "DELETE"],
    };
    expect(
      gradeExercise(datasetEx, "SELECT user_id, COUNT(*) FROM orders GROUP BY user_id HAVING COUNT(*) > 5").correct,
    ).toBe(true);
    expect(
      gradeExercise(datasetEx, "SELECT user_id, COUNT(*) FROM orders GROUP BY user_id").correct,
    ).toBe(false);

    // incident_step
    const incidentEx = {
      id: "inc-1",
      type: "incident_step",
      correctSteps: ["triage", "mitigate", "postmortem"],
    };
    expect(
      gradeExercise(incidentEx, ["triage", "mitigate", "postmortem"]).correct,
    ).toBe(true);
    expect(
      gradeExercise(incidentEx, ["mitigate", "triage", "postmortem"]).correct,
    ).toBe(false);

    // numeric
    const numericEx = {
      id: "num-1",
      type: "numeric",
      target: 12,
      unit: "V",
      relTolerance: 0.05,
    };
    expect(gradeExercise(numericEx, "12.2 V").correct).toBe(true);
    expect(gradeExercise(numericEx, "12200 mV").correct).toBe(true);
    expect(gradeExercise(numericEx, "15 V").correct).toBe(false);

    // circuit_lab
    const circuitLabEx = {
      id: "cl-1",
      type: "circuit_lab",
    };
    // Untrusted client result rejected
    expect(gradeExercise(circuitLabEx, { ok: true }).correct).toBe(false);
    expect(
      gradeExercise(circuitLabEx, {
        _serverVerified: true,
        ok: true,
        simulationPassed: true,
        criteriaPassed: 3,
        criteriaTotal: 3,
      }).correct,
    ).toBe(false);
  });
});
