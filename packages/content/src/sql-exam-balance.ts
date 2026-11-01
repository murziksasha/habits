import type { Exercise, LessonContent } from "./types.js";

type Choice = Exercise & { options: string[]; correctIndex: number };

function isChoice(ex: Exercise): ex is Choice {
  return (
    (ex.type === "mcq" || ex.type === "code_read" || ex.type === "code_output" || ex.type === "logic_puzzle") &&
    Array.isArray((ex as { options?: unknown }).options) &&
    typeof (ex as { correctIndex?: unknown }).correctIndex === "number"
  );
}

/** Share of an exam that is already correct if every choice question is answered with the first option. */
export function firstOptionAccuracy(exercises: Exercise[]): number {
  if (!exercises.length) return 0;
  let wins = 0;
  for (const ex of exercises) {
    if (isChoice(ex) && ex.correctIndex === 0) wins += 1;
  }
  return wins / exercises.length;
}

/**
 * Move correct choices off index 0 until always picking the first option
 * scores under the exam pass line (default 0.7). Exercise ids stay put.
 */
export function rebalanceExamChoices(exercises: Exercise[], passLine = 0.7): Exercise[] {
  const next = exercises.map((ex) => {
    if (!isChoice(ex)) return ex;
    return { ...ex, options: [...ex.options] };
  });
  let guard = 0;
  while (firstOptionAccuracy(next) + 1e-9 >= passLine && guard < next.length + 2) {
    guard += 1;
    const idx = next.findIndex((ex) => isChoice(ex) && ex.correctIndex === 0 && ex.options.length > 1);
    if (idx < 0) break;
    const ex = next[idx] as Choice;
    const dest = ex.options.length - 1;
    const head = ex.options[0]!;
    ex.options[0] = ex.options[dest]!;
    ex.options[dest] = head;
    if (ex.type === "mcq" || ex.type === "code_read" || ex.type === "code_output" || ex.type === "logic_puzzle") {
      const localized = (ex as { optionsEn?: string[] }).optionsEn;
      if (localized && localized.length === ex.options.length) {
        const copy = [...localized];
        const localizedHead = copy[0]!;
        copy[0] = copy[dest]!;
        copy[dest] = localizedHead;
        (ex as { optionsEn?: string[] }).optionsEn = copy;
      }
    }
    ex.correctIndex = dest;
  }
  return next;
}

export function rebalanceExamLessons(lessons: LessonContent[], passLine = 0.7): LessonContent[] {
  return lessons.map((lesson) => {
    if (!lesson.isExam) return lesson;
    return { ...lesson, exercises: rebalanceExamChoices(lesson.exercises, passLine) };
  });
}
