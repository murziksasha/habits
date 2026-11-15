import { describe, expect, it } from "vitest";
import {
  detectJsHazards,
  jsStaticPartialScore,
  runJsStaticAsserts,
} from "./js-static.js";

describe("detectJsHazards", () => {
  it("flags eval", () => {
    const h = detectJsHazards("eval('1')");
    expect(h.some((x) => x.code === "no_eval")).toBe(true);
  });
});

describe("runJsStaticAsserts", () => {
  it("checks has:function", () => {
    const ok = runJsStaticAsserts("function foo(){ return 1 }", [{ has: "function" }]);
    expect(ok.ok).toBe(true);
    const bad = runJsStaticAsserts("const x = 1", [{ has: "function" }]);
    expect(bad.ok).toBe(false);
  });
});

describe("jsStaticPartialScore", () => {
  it("scores partial asserts", () => {
    const r = jsStaticPartialScore("const x = 1; console.log(x)", [
      { has: "const" },
      { has: "function" },
      { contains: "console.log" },
    ]);
    expect(r.total).toBe(3);
    expect(r.passed).toBe(2);
    expect(r.ratio).toBeCloseTo(2 / 3);
  });
});
