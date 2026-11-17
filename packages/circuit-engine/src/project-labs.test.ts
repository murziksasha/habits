import { describe, expect, it } from "vitest";
import type { CircuitDocument } from "@eduforge/shared";
import { evaluateCircuitLab } from "./evaluator.js";
import {
  analogProjectLab,
  buckProjectLab,
  filterProjectLab,
  phaseProjectLab,
} from "../../content/src/electrical-engineering/project-labs.ts";

function asExercise(exercise: ReturnType<typeof analogProjectLab>) {
  return {
    circuit: exercise.circuit,
    analysis: exercise.analysis,
    criteria: exercise.criteria,
    scenarios: exercise.scenarios,
    constraints: exercise.constraints,
    rejectOutputSubstitution: exercise.rejectOutputSubstitution,
  };
}

function withOutputSource(doc: CircuitDocument, node: string): CircuitDocument {
  return {
    ...doc,
    components: [
      ...doc.components,
      { id: "VCHEAT", type: "dc_voltage", value: "2.89", x: 0, y: 0, rotation: 0, nodes: [] },
    ],
    wires: [
      ...doc.wires,
      { id: "wcheat1", from: { componentId: "VCHEAT", pin: "1" }, to: { componentId: "U1", pin: "3" }, net: node },
      { id: "wcheat2", from: { componentId: "VCHEAT", pin: "2" }, to: { componentId: "GND", pin: "1" }, net: "0" },
    ],
  };
}

describe("capstone reference circuits", () => {
  it("grades the analog front end, its trials, and rejects a forced output", async () => {
    const exercise = asExercise(analogProjectLab("t-analog", "uk", "en"));
    const ok = await evaluateCircuitLab(exercise.circuit, exercise);
    expect(ok.ok, JSON.stringify(ok.criteriaResults)).toBe(true);
    const cheated = await evaluateCircuitLab(withOutputSource(exercise.circuit as CircuitDocument, "out"), exercise);
    expect(cheated.ok).toBe(false);
  }, 60000);

  it("grades the output filter cutoff and a capacitor that is ten times larger", async () => {
    const exercise = asExercise(filterProjectLab("t-filter", "uk", "en"));
    const ok = await evaluateCircuitLab(exercise.circuit, exercise);
    expect(ok.ok, JSON.stringify(ok)).toBe(true);
  }, 60000);

  it("grades the buck average model at both loads and at a stuck duty", async () => {
    const exercise = asExercise(buckProjectLab("t-buck", "uk", "en"));
    const ok = await evaluateCircuitLab(exercise.circuit, exercise);
    expect(ok.ok, JSON.stringify(ok)).toBe(true);
  }, 60000);

  it("grades one phase of the motor equivalent and an open phase", async () => {
    const exercise = asExercise(phaseProjectLab("t-phase", "uk", "en"));
    const ok = await evaluateCircuitLab(exercise.circuit, exercise);
    expect(ok.ok, JSON.stringify(ok)).toBe(true);
  }, 60000);
});
