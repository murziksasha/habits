import type { Exercise, LessonContent, UnitContent } from "./types.js";

export function lesson(
  slug: string,
  titleUk: string,
  titleEn: string,
  difficulty: number,
  isFree: boolean,
  exercises: Exercise[],
  extra?: { isExam?: boolean; passThreshold?: number; baseXp?: number },
): LessonContent {
  return {
    slug,
    titleUk,
    titleEn,
    baseXp: extra?.baseXp ?? 12 + difficulty * 3,
    difficulty,
    isFree,
    isExam: extra?.isExam,
    passThreshold: extra?.passThreshold,
    exercises,
  };
}

export function exam(
  slug: string,
  titleUk: string,
  titleEn: string,
  difficulty: number,
  exercises: Exercise[],
): LessonContent {
  return lesson(slug, titleUk, titleEn, difficulty, false, exercises, {
    isExam: true,
    passThreshold: 0.7,
    baseXp: 28,
  });
}

export function unit(
  slug: string,
  titleUk: string,
  titleEn: string,
  lessons: LessonContent[],
): UnitContent {
  return { slug, titleUk, titleEn, lessons };
}

type Note = { explanationUk?: string; explanationEn?: string };

export function mcq(
  id: string,
  promptUk: string,
  promptEn: string,
  options: string[],
  correctIndex: number,
  note?: Note,
): Exercise {
  return { id, type: "mcq", promptUk, promptEn, options, correctIndex, ...note };
}

export function codeFill(
  id: string,
  promptUk: string,
  promptEn: string,
  language: string,
  code: string,
  accepted: string[],
  caseSensitive = true,
  note?: Note,
): Exercise {
  return {
    id,
    type: "code_fill",
    promptUk,
    promptEn,
    language,
    code,
    accepted,
    caseSensitive,
    ...note,
  };
}

export function codeRead(
  id: string,
  promptUk: string,
  promptEn: string,
  language: string,
  code: string,
  options: string[],
  correctIndex: number,
  note?: Note,
): Exercise {
  return {
    id,
    type: "code_read",
    promptUk,
    promptEn,
    language,
    code,
    options,
    correctIndex,
    ...note,
  };
}

export function codeOrder(
  id: string,
  promptUk: string,
  promptEn: string,
  language: string,
  lines: string[],
  correct: string[],
  note?: Note,
): Exercise {
  return { id, type: "code_order", promptUk, promptEn, language, lines, correct, ...note };
}

export function matchEx(
  id: string,
  promptUk: string,
  promptEn: string,
  pairs: { left: string; right: string }[],
): Exercise {
  return { id, type: "match", promptUk, promptEn, pairs };
}

export function codeRun(
  id: string,
  promptUk: string,
  promptEn: string,
  language: string,
  starter: string,
  tests: { stdin?: string; stdout: string }[],
  extra?: {
    requiredSource?: string[];
    forbiddenSource?: string[];
    timeLimitMs?: number;
    hintUk?: string;
    hintEn?: string;
    solutionUk?: string;
    solutionEn?: string;
  },
): Exercise {
  return {
    id,
    type: "code_run",
    promptUk,
    promptEn,
    language,
    starter,
    tests,
    requiredSource: extra?.requiredSource,
    forbiddenSource: extra?.forbiddenSource,
    timeLimitMs: extra?.timeLimitMs,
    hintUk: extra?.hintUk,
    hintEn: extra?.hintEn,
    solutionUk: extra?.solutionUk,
    solutionEn: extra?.solutionEn,
  };
}

export function codeOutputMcq(
  id: string,
  promptUk: string,
  promptEn: string,
  language: string,
  code: string,
  options: string[],
  correctIndex: number,
  note?: Note,
): Exercise {
  return {
    id,
    type: "code_output",
    promptUk,
    promptEn,
    language,
    code,
    options,
    correctIndex,
    ...note,
  };
}

/**
 * Concept card (theory + key points + optional code + optional self-check).
 * Put it first in a lesson so practice follows a worked explanation.
 */
export function concept(
  id: string,
  titleUk: string,
  titleEn: string,
  body: { uk: string; en: string },
  extra?: {
    keyPointsUk?: string[];
    keyPointsEn?: string[];
    code?: string;
    language?: string;
    check?: { qUk: string; qEn: string; options: string[]; correctIndex: number };
  },
): Exercise {
  return {
    id,
    type: "concept",
    promptUk: titleUk,
    promptEn: titleEn,
    bodyUk: body.uk,
    bodyEn: body.en,
    keyPointsUk: extra?.keyPointsUk,
    keyPointsEn: extra?.keyPointsEn,
    code: extra?.code,
    language: extra?.language,
    check: extra?.check,
  };
}
