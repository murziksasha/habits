import type {
  Exercise,
  LessonContent,
  UnitContent,
} from "../types.js";
import type {
  CircuitDocument,
  CircuitAnalysis,
  CircuitCriterion,
  CircuitConstraints,
} from "@eduforge/shared";

export function createConcept(params: {
  id: string;
  promptUk: string;
  promptEn: string;
  bodyUk?: string;
  bodyEn?: string;
  explanationUk?: string;
  explanationEn?: string;
  keyPointsUk: string[];
  keyPointsEn: string[];
}): Exercise {
  return {
    id: params.id,
    type: "concept",
    contentVersion: "2",
    promptUk: params.promptUk,
    promptEn: params.promptEn,
    bodyUk: params.bodyUk || params.explanationUk || params.promptUk,
    bodyEn: params.bodyEn || params.explanationEn || params.promptEn,
    keyPointsUk: params.keyPointsUk,
    keyPointsEn: params.keyPointsEn,
  };
}

export function createExplain(params: {
  id: string;
  promptUk: string;
  promptEn: string;
  keyIdeas: { labelUk: string; labelEn?: string; anyOf: string[] }[];
  sampleAnswerUk: string;
  sampleAnswerEn: string;
  minWords?: number;
  passRatio?: number;
}): Exercise {
  return {
    id: params.id,
    type: "explain",
    contentVersion: "2",
    promptUk: params.promptUk,
    promptEn: params.promptEn,
    keyIdeas: params.keyIdeas,
    sampleAnswerUk: params.sampleAnswerUk,
    sampleAnswerEn: params.sampleAnswerEn,
    minWords: params.minWords ?? 12,
    passRatio: params.passRatio ?? 0.6,
  };
}

export function createNumeric(params: {
  id: string;
  promptUk: string;
  promptEn: string;
  target: number | { real: number; imag: number } | string;
  unit?: string;
  formula?: string;
  absTolerance?: number;
  relTolerance?: number;
  explanationUk?: string;
  explanationEn?: string;
  examVariant?: "A" | "B" | "C";
}): Exercise {
  return {
    id: params.id,
    type: "numeric",
    contentVersion: "2",
    examVariant: params.examVariant,
    promptUk: params.promptUk,
    promptEn: params.promptEn,
    target: params.target,
    unit: params.unit,
    formula: params.formula,
    absTolerance: params.absTolerance ?? 0.05,
    relTolerance: params.relTolerance ?? 0.02,
    explanationUk: params.explanationUk,
    explanationEn: params.explanationEn,
  };
}

export function createNumericMulti(params: {
  id: string;
  promptUk: string;
  promptEn: string;
  fields: {
    name?: string;
    labelUk?: string;
    labelEn?: string;
    target: number | { real: number; imag: number } | string;
    unit?: string;
    absTolerance?: number;
    relTolerance?: number;
    placeholder?: string;
  }[];
  formula?: string;
  explanationUk?: string;
  explanationEn?: string;
  examVariant?: "A" | "B" | "C";
}): Exercise {
  return {
    id: params.id,
    type: "numeric",
    contentVersion: "2",
    examVariant: params.examVariant,
    promptUk: params.promptUk,
    promptEn: params.promptEn,
    fields: params.fields.map((f) => ({
      ...f,
      absTolerance: f.absTolerance ?? 0.05,
      relTolerance: f.relTolerance ?? 0.02,
      requireUnit: false,
    })),
    formula: params.formula,
    explanationUk: params.explanationUk,
    explanationEn: params.explanationEn,
  };
}

export function createCircuitLab(params: {
  id: string;
  promptUk: string;
  promptEn: string;
  title?: string;
  circuitDocument?: CircuitDocument;
  netlist?: string;
  analysis: CircuitAnalysis;
  criteria: CircuitCriterion[];
  hintsUk?: string[];
  hintsEn?: string[];
  explanationUk?: string;
  explanationEn?: string;
  examVariant?: "A" | "B" | "C";
  constraints?: CircuitConstraints;
  scenarios?: {
    id: string;
    overrides?: Record<string, string>;
    faults?: string[];
    criteria: CircuitCriterion[];
  }[];
  rejectOutputSubstitution?: boolean;
}): Exercise {
  return {
    id: params.id,
    type: "circuit_lab",
    examVariant: params.examVariant,
    promptUk: params.promptUk,
    promptEn: params.promptEn,
    title: params.title,
    circuit: params.circuitDocument,
    contentVersion: "2",
    netlist: params.netlist,
    analysis: params.analysis,
    criteria: params.criteria,
    hintsUk: params.hintsUk,
    hintsEn: params.hintsEn,
    explanationUk: params.explanationUk,
    explanationEn: params.explanationEn,
    constraints: params.constraints,
    scenarios: params.scenarios,
    rejectOutputSubstitution: params.rejectOutputSubstitution,
  };
}

export function createMcq(params: {
  id: string;
  promptUk: string;
  promptEn: string;
  options: string[];
  optionsEn: string[];
  correctIndex: number;
  explanationUk: string;
  explanationEn: string;
  examVariant?: "A" | "B" | "C";
}): Exercise {
  return {
    id: params.id,
    type: "mcq",
    contentVersion: "2",
    examVariant: params.examVariant,
    promptUk: params.promptUk,
    promptEn: params.promptEn,
    options: params.options,
    optionsEn: params.optionsEn,
    correctIndex: params.correctIndex,
    explanationUk: params.explanationUk,
    explanationEn: params.explanationEn,
  };
}

export function createMatch(params: {
  id: string;
  promptUk: string;
  promptEn: string;
  pairs: { left: string; right: string }[];
  pairsEn?: { left: string; right: string }[];
  explanationUk: string;
  explanationEn: string;
  examVariant?: "A" | "B" | "C";
}): Exercise {
  return {
    id: params.id,
    type: "match",
    contentVersion: "2",
    examVariant: params.examVariant,
    promptUk: params.promptUk,
    promptEn: params.promptEn,
    pairs: params.pairs,
    pairsEn: params.pairsEn,
    explanationUk: params.explanationUk,
    explanationEn: params.explanationEn,
  };
}

export function createLesson(params: {
  slug: string;
  titleUk: string;
  titleEn: string;
  difficulty: number;
  baseXp: number;
  exercises: Exercise[];
  isExam?: boolean;
  passThreshold?: number;
  contentVersion?: number;
}): LessonContent {
  return {
    slug: params.slug,
    contentVersion: params.contentVersion ?? 2,
    titleUk: params.titleUk,
    titleEn: params.titleEn,
    difficulty: params.difficulty,
    baseXp: params.baseXp,
    exercises: params.exercises,
    isExam: params.isExam,
    passThreshold: params.passThreshold,
  };
}

export function createUnit(params: {
  slug: string;
  titleUk: string;
  titleEn: string;
  lessons: LessonContent[];
}): UnitContent {
  return {
    slug: params.slug,
    titleUk: params.titleUk,
    titleEn: params.titleEn,
    lessons: params.lessons,
  };
}
