import type { CircuitDocument } from "@eduforge/shared";
import type { Exercise, LessonContent } from "../types.js";
import {
  createCircuitLab,
  createConcept,
  createExplain,
  createLesson,
  createMatch,
  createMcq,
  createNumeric,
} from "./helpers.js";

export { analogProjectLab, buckProjectLab, filterProjectLab, phaseProjectLab } from "./project-labs.js";
export { fixEquivalentLab, loadedDividerLab, rcChargeLab } from "./practice-labs.js";

export function concept(
  id: string,
  promptUk: string,
  promptEn: string,
  bodyUk: string,
  bodyEn: string,
  keyPointsUk: string[],
  keyPointsEn: string[],
): Exercise {
  return createConcept({ id, promptUk, promptEn, bodyUk, bodyEn, keyPointsUk, keyPointsEn });
}

export function explain(
  id: string,
  promptUk: string,
  promptEn: string,
  tokenUk: string,
  tokenEn: string,
  sampleUk: string,
  sampleEn: string,
): Exercise {
  return createExplain({
    id,
    promptUk,
    promptEn,
    minWords: 20,
    keyIdeas: [{ labelUk: tokenUk, labelEn: tokenEn, anyOf: [tokenUk, tokenEn] }],
    sampleAnswerUk: sampleUk,
    sampleAnswerEn: sampleEn,
  });
}

export function num(
  id: string,
  promptUk: string,
  promptEn: string,
  target: number | { real: number; imag: number },
  unit: string,
  variant?: "A" | "B",
): Exercise {
  const mag = typeof target === "number" ? Math.abs(target) : Math.hypot(target.real, target.imag);
  return createNumeric({
    id,
    promptUk,
    promptEn,
    target,
    unit,
    absTolerance: mag === 0 ? 1e-9 : mag * 0.01,
    relTolerance: 0.02,
    explanationUk: "Відповідь отримано прямим підставленням у залежність, виведену в уроці.",
    explanationEn: "The value comes from substituting the given data into the relation derived in the lesson.",
    examVariant: variant,
  });
}

export function mcq(
  id: string,
  promptUk: string,
  promptEn: string,
  options: string[],
  optionsEn: string[],
  correctIndex: number,
  variant?: "A" | "B",
): Exercise {
  return createMcq({
    id,
    promptUk,
    promptEn,
    options,
    optionsEn,
    correctIndex,
    explanationUk: "Правильний варіант узгоджений із моделлю цього уроку.",
    explanationEn: "The correct option matches the model of this lesson.",
    examVariant: variant,
  });
}

export function match(
  id: string,
  promptUk: string,
  promptEn: string,
  pairs: { left: string; right: string }[],
  pairsEn: { left: string; right: string }[],
  explanationUk: string,
  explanationEn: string,
): Exercise {
  return createMatch({ id, promptUk, promptEn, pairs, pairsEn, explanationUk, explanationEn });
}

export function taught(
  slug: string,
  titleUk: string,
  titleEn: string,
  difficulty: number,
  exercises: Exercise[],
): LessonContent {
  return createLesson({ slug, titleUk, titleEn, difficulty, baseXp: 35, exercises });
}

export function exam(
  slug: string,
  titleUk: string,
  titleEn: string,
  exercises: Exercise[],
  passThreshold?: number,
): LessonContent {
  return createLesson({
    slug,
    titleUk,
    titleEn,
    difficulty: 2,
    baseXp: 50,
    isExam: true,
    passThreshold,
    exercises,
  });
}

function schematic(components: CircuitDocument["components"], wires: CircuitDocument["wires"]): CircuitDocument {
  return { version: 2, mode: "schematic", junctions: [], components, wires };
}

export function dividerLab(
  id: string,
  promptUk: string,
  promptEn: string,
  vin: number,
  r1: number,
  r2: number,
): Exercise {
  const vout = (vin * r2) / (r1 + r2);
  return createCircuitLab({
    id,
    promptUk,
    promptEn,
    circuitDocument: schematic(
      [
        { id: "V1", type: "dc_voltage", value: String(vin), x: 40, y: 40, rotation: 0, nodes: [] },
        { id: "R1", type: "resistor", value: String(r1), x: 160, y: 40, rotation: 0, nodes: [] },
        { id: "R2", type: "resistor", value: String(r2), x: 280, y: 80, rotation: 0, nodes: [] },
        { id: "GND", type: "ground", value: "", x: 40, y: 160, rotation: 0, nodes: [] },
      ],
      [
        { id: "w1", from: { componentId: "V1", pin: "1" }, to: { componentId: "R1", pin: "1" }, net: "in" },
        { id: "w2", from: { componentId: "R1", pin: "2" }, to: { componentId: "R2", pin: "1" }, net: "out" },
        { id: "w3", from: { componentId: "R2", pin: "2" }, to: { componentId: "V1", pin: "2" }, net: "0" },
        { id: "w4", from: { componentId: "V1", pin: "2" }, to: { componentId: "GND", pin: "1" }, net: "0" },
      ],
    ),
    analysis: { type: "op" },
    criteria: [
      {
        type: "node_voltage",
        node: "out",
        target: vout,
        absTolerance: Math.max(0.02, Math.abs(vout) * 0.02),
        relTolerance: 0.02,
        measure: "signed",
        labelUk: "Напруга вузла out",
        labelEn: "Voltage at node out",
      },
    ],
    explanationUk: "Напруга виходу ненавантаженого дільника дорівнює Vin·R2/(R1+R2).",
    explanationEn: "The unloaded divider output is Vin·R2/(R1+R2).",
  });
}
