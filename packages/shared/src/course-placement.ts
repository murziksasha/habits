/** Course-agnostic placement banks and skip-unit decisions (SPEC/IMPROVEMENTS-PLAN). */

import { scorePlacement, type PlacementLevel, type PlacementQuestion } from "./placement.js";

export type PlacementExercise = {
  id: string;
  type: string;
  promptUk?: string;
  promptEn?: string;
  options?: string[];
  correctIndex?: number;
};

export type PlacementLesson = {
  slug: string;
  isExam?: boolean;
  exercises: PlacementExercise[];
};

export type PlacementUnit = {
  slug: string;
  titleUk: string;
  titleEn?: string;
  lessons: PlacementLesson[];
};

export type CoursePlacementBank = {
  questions: PlacementQuestion[];
  /** Parallel to questions: which unit each question was drawn from. */
  questionUnitSlugs: string[];
  levels: PlacementLevel[];
};

const MAX_QUESTIONS = 8;
const PER_UNIT = 2;
const MIN_QUESTIONS = 4;

function isMcq(ex: PlacementExercise): ex is PlacementExercise & {
  options: string[];
  correctIndex: number;
  promptUk: string;
} {
  return (
    (ex.type === "mcq" || ex.type === "logic_puzzle" || ex.type === "code_read") &&
    Array.isArray(ex.options) &&
    ex.options.length >= 2 &&
    typeof ex.correctIndex === "number" &&
    ex.correctIndex >= 0 &&
    ex.correctIndex < ex.options.length &&
    typeof ex.promptUk === "string" &&
    ex.promptUk.trim().length > 0
  );
}

/** Collect up to two MCQs per unit (exams first), capped at eight questions. */
export function buildCoursePlacementBank(
  courseSlug: string,
  units: readonly PlacementUnit[],
): CoursePlacementBank | null {
  const questions: PlacementQuestion[] = [];
  const questionUnitSlugs: string[] = [];

  for (const unit of units) {
    if (questions.length >= MAX_QUESTIONS) break;
    const pool: PlacementExercise[] = [];
    const examLessons = unit.lessons.filter((l) => l.isExam);
    const teachLessons = unit.lessons.filter((l) => !l.isExam);
    for (const lesson of [...examLessons, ...teachLessons]) {
      for (const ex of lesson.exercises) {
        if (isMcq(ex)) pool.push(ex);
      }
    }
    const take = Math.min(PER_UNIT, pool.length, MAX_QUESTIONS - questions.length);
    for (let i = 0; i < take; i++) {
      const ex = pool[i]!;
      questions.push({
        id: `${courseSlug}:${unit.slug}:${ex.id}`,
        promptUk: ex.promptUk!,
        promptEn: ex.promptEn?.trim() ? ex.promptEn : ex.promptUk!,
        options: ex.options!,
        correctIndex: ex.correctIndex!,
        weight: unit.lessons.some((l) => l.isExam && l.exercises.some((e) => e.id === ex.id))
          ? 1.2
          : 1,
      });
      questionUnitSlugs.push(unit.slug);
    }
  }

  if (questions.length < MIN_QUESTIONS) return null;

  const levels: PlacementLevel[] = units.map((unit, i) => ({
    label: i === 0 ? "Beginner" : `Unit ${i + 1}`,
    minScore: i === 0 ? 0 : Math.min(0.92, i / Math.max(1, units.length)),
    recommendedUnitSlug: unit.slug,
    titleUk: `Почати з: ${unit.titleUk}`,
    titleEn: `Start at: ${unit.titleEn?.trim() ? unit.titleEn : unit.titleUk}`,
  }));

  return { questions, questionUnitSlugs, levels };
}

export type PlacementSkipPlan = {
  recommendedUnitSlug: string;
  knownUnitSlugs: string[];
  startUnitSlug: string;
};

/**
 * Units strictly before the recommended start are marked known (0 XP).
 * If the recommended slug is missing, start at the first unit (no skip).
 */
export function planPlacementSkip(
  unitSlugs: readonly string[],
  recommendedUnitSlug: string,
): PlacementSkipPlan {
  const idx = unitSlugs.indexOf(recommendedUnitSlug);
  const cut = idx < 0 ? 0 : idx;
  const start = unitSlugs[cut] ?? unitSlugs[0] ?? recommendedUnitSlug;
  return {
    recommendedUnitSlug: start,
    knownUnitSlugs: unitSlugs.slice(0, cut) as string[],
    startUnitSlug: start,
  };
}

/**
 * Recommend the first unit whose questions were missed (accuracy < 70%),
 * or a later unit when earlier units were all answered well.
 * Falls back to scorePlacement levels when no per-unit signal exists.
 */
export function recommendPlacementUnit(
  answers: { questionId: string; index: number }[],
  bank: CoursePlacementBank,
): { score: number; correct: number; total: number; level: PlacementLevel } {
  const scored = scorePlacement(answers, bank.questions, bank.levels);

  const byUnit = new Map<string, { correct: number; total: number }>();
  bank.questions.forEach((q, i) => {
    const unit = bank.questionUnitSlugs[i]!;
    const row = byUnit.get(unit) ?? { correct: 0, total: 0 };
    row.total += 1;
    const a = answers.find((x) => x.questionId === q.id);
    if (a && a.index === q.correctIndex) row.correct += 1;
    byUnit.set(unit, row);
  });

  const unitOrder: string[] = [];
  for (const slug of bank.questionUnitSlugs) {
    if (!unitOrder.includes(slug)) unitOrder.push(slug);
  }

  let recommended = unitOrder[0] ?? scored.level.recommendedUnitSlug;
  for (const slug of unitOrder) {
    const row = byUnit.get(slug);
    if (!row || row.total === 0) continue;
    if (row.correct / row.total < 0.7) {
      recommended = slug;
      break;
    }
    recommended = slug;
    // Keep walking: if this unit is solid, the next one may be the start.
    const idx = unitOrder.indexOf(slug);
    if (idx < unitOrder.length - 1) recommended = unitOrder[idx + 1]!;
  }

  const level =
    bank.levels.find((l) => l.recommendedUnitSlug === recommended) ?? scored.level;
  return {
    score: scored.score,
    correct: scored.correct,
    total: scored.total,
    level: { ...level, recommendedUnitSlug: recommended },
  };
}

export function publicPlacementQuestions(questions: PlacementQuestion[]) {
  return questions.map((q) => ({
    id: q.id,
    promptUk: q.promptUk,
    promptEn: q.promptEn,
    options: q.options,
  }));
}
