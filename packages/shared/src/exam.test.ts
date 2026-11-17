import { describe, expect, it } from "vitest";
import { resolveExamVariantId, selectExamVariantExercises, stripExamSolutions } from "./exam.js";

describe("exam variants", () => {
  const bank = [
    { id: "a1", examVariant: "A" },
    { id: "a2", examVariant: "A" },
    { id: "b1", examVariant: "B" },
  ];

  it("keeps an untagged bank intact", () => {
    expect(selectExamVariantExercises([{ id: "only" }], "variant_B")).toEqual([{ id: "only" }]);
  });

  it("serves form B and falls back from C to A", () => {
    expect(selectExamVariantExercises(bank, "variant_B").map((e) => e.id)).toEqual(["b1"]);
    expect(selectExamVariantExercises(bank, "variant_C").map((e) => e.id)).toEqual(["a1", "a2"]);
  });

  it("strips worked solutions", () => {
    const [row] = stripExamSolutions([{ id: "q", explanationUk: "secret", correctIndex: 1 }]);
    expect(row?.explanationUk).toBeUndefined();
    expect(row?.correctIndex).toBe(1);
  });

  it("is stable for the same attempt", () => {
    expect(resolveExamVariantId("user", "lesson", 1)).toBe(resolveExamVariantId("user", "lesson", 1));
  });
});
