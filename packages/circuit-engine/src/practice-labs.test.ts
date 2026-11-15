import { describe, expect, it } from "vitest";
import type { CircuitDocument } from "@eduforge/shared";
import { evaluateCircuitLab } from "./evaluator.js";
import { fixEquivalentLab, loadedDividerLab, rcChargeLab } from "../../content/src/electrical-engineering/practice-labs.ts";

function asExercise(exercise: ReturnType<typeof loadedDividerLab>) {
  return {
    circuit: exercise.circuit,
    analysis: exercise.analysis,
    criteria: exercise.criteria,
    scenarios: exercise.scenarios,
    constraints: exercise.constraints,
    rejectOutputSubstitution: exercise.rejectOutputSubstitution,
  };
}

function withValue(doc: CircuitDocument, id: string, value: string): CircuitDocument {
  return {
    ...doc,
    components: doc.components.map((component) => (component.id === id ? { ...component, value } : component)),
  };
}

describe("intermediate electrical labs", () => {
  it("accepts the loaded 4 V divider and rejects the unloaded 6 V reading", async () => {
    const exercise = asExercise(loadedDividerLab("t-loaded", "uk", "en"));
    const ok = await evaluateCircuitLab(exercise.circuit, exercise);
    expect(ok.ok, ok.error).toBe(true);
    const unloaded = await evaluateCircuitLab(withValue(exercise.circuit as CircuitDocument, "RL", "100000000"), exercise);
    expect(unloaded.ok).toBe(false);
  });

  it("rejects the wrong series resistance and accepts 1200 ohm", async () => {
    const exercise = asExercise(fixEquivalentLab("t-fix", "uk", "en"));
    const wrong = await evaluateCircuitLab(exercise.circuit, exercise);
    expect(wrong.ok).toBe(false);
    const fixed = await evaluateCircuitLab(withValue(exercise.circuit as CircuitDocument, "RTH", "1200"), exercise);
    expect(fixed.ok, fixed.error).toBe(true);
  });

  it("checks the RC voltage near one time constant and after the capacitance doubles", async () => {
    const exercise = asExercise(rcChargeLab("t-rc", "uk", "en"));
    const ok = await evaluateCircuitLab(exercise.circuit, exercise);
    expect(ok.ok, ok.error).toBe(true);
    expect(ok.criteriaPassed).toBe(ok.criteriaTotal);
  });
});
