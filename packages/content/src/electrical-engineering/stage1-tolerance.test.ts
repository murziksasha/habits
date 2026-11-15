import { describe, expect, it } from "vitest";
import { gradeSingleNumeric } from "@eduforge/shared";
import { stage1Units } from "./stage1.js";

type NumericExercise = {
  id: string;
  type: string;
  target?: number | { real: number; imag: number } | string;
  unit?: string;
  absTolerance?: number;
  relTolerance?: number;
};

function stage1Numerics(): NumericExercise[] {
  const found: NumericExercise[] = [];
  for (const unit of stage1Units) {
    for (const lesson of unit.lessons) {
      for (const exercise of lesson.exercises) {
        if (exercise.type === "numeric") found.push(exercise as NumericExercise);
      }
    }
  }
  return found;
}

describe("stage 1 numeric tolerances", () => {
  it("scales the absolute band with the target instead of a 1e-6 floor", () => {
    for (const exercise of stage1Numerics()) {
      if (typeof exercise.target !== "number") continue;
      const mag = Math.abs(exercise.target);
      const cap = mag === 0 ? 1e-9 : mag * 0.01;
      expect(exercise.absTolerance, exercise.id).toBe(cap);
      if (mag > 0 && cap < 1e-6) {
        expect(exercise.absTolerance ?? 0, exercise.id).toBeLessThan(1e-6);
      }
    }
  });

  it("rejects zero for the electron-count item and a positive sign for the ion item", () => {
    const byId = new Map(stage1Numerics().map((exercise) => [exercise.id, exercise]));
    const electrons = byId.get("ee-01-l1-n-v2");
    const ion = byId.get("ee-01-l2-n-v2");
    expect(electrons).toBeTruthy();
    expect(ion).toBeTruthy();
    expect(gradeSingleNumeric("0", electrons!).correct).toBe(false);
    expect(gradeSingleNumeric("3.204e-9", electrons!).correct).toBe(true);
    expect(gradeSingleNumeric("3.204e-19", ion!).correct).toBe(false);
    expect(gradeSingleNumeric("-3.204e-19", ion!).correct).toBe(true);
  });
});
