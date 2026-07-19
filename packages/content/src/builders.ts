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

export function mcq(
  id: string,
  promptUk: string,
  promptEn: string,
  options: string[],
  correctIndex: number,
): Exercise {
  return { id, type: "mcq", promptUk, promptEn, options, correctIndex };
}

export function codeFill(
  id: string,
  promptUk: string,
  promptEn: string,
  language: string,
  code: string,
  accepted: string[],
  caseSensitive = true,
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
  };
}

export function codeOrder(
  id: string,
  promptUk: string,
  promptEn: string,
  language: string,
  lines: string[],
  correct: string[],
): Exercise {
  return { id, type: "code_order", promptUk, promptEn, language, lines, correct };
}

export function matchEx(
  id: string,
  promptUk: string,
  promptEn: string,
  pairs: { left: string; right: string }[],
): Exercise {
  return { id, type: "match", promptUk, promptEn, pairs };
}
