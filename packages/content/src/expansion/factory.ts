import type { CourseContent, Exercise, LessonContent, UnitContent } from "../types.js";
import {
  codeFill,
  codeOrder,
  codeOutputMcq,
  codeRead,
  concept,
  exam,
  explain,
  lesson,
  matchEx,
  mcq,
  unit,
} from "../builders.js";

export { codeFill, codeOrder, codeOutputMcq, codeRead, concept, exam, explain, lesson, matchEx, mcq, unit };

type Note = { explanationUk?: string; explanationEn?: string };

export type Idea = { labelUk: string; labelEn: string; anyOf: string[] };

export type McqSpec = {
  kind: "mcq";
  promptUk: string;
  promptEn: string;
  options: string[];
  optionsEn?: string[];
  correctIndex: number;
  explanationUk: string;
  explanationEn: string;
};

export type FillSpec = {
  kind: "fill";
  promptUk: string;
  promptEn: string;
  language: string;
  code: string;
  accepted: string[];
  caseSensitive?: boolean;
  explanationUk: string;
  explanationEn: string;
};

export type ReadSpec = {
  kind: "read";
  promptUk: string;
  promptEn: string;
  language: string;
  code: string;
  options: string[];
  optionsEn?: string[];
  correctIndex: number;
  explanationUk: string;
  explanationEn: string;
};

export type OutputSpec = {
  kind: "output";
  promptUk: string;
  promptEn: string;
  language: string;
  code: string;
  options: string[];
  optionsEn?: string[];
  correctIndex: number;
  explanationUk: string;
  explanationEn: string;
};

export type OrderSpec = {
  kind: "order";
  promptUk: string;
  promptEn: string;
  language: string;
  lines: string[];
  correct: string[];
  explanationUk: string;
  explanationEn: string;
};

export type MatchSpec = {
  kind: "match";
  promptUk: string;
  promptEn: string;
  pairs: { left: string; right: string }[];
};

export type Retrieval = McqSpec | FillSpec | ReadSpec | OutputSpec | OrderSpec | MatchSpec;

export type TeachSpec = {
  slug: string;
  titleUk: string;
  titleEn: string;
  difficulty: number;
  free?: boolean;
  pointsUk: string[];
  pointsEn: string[];
  conceptUk: string;
  conceptEn: string;
  code?: string;
  language?: string;
  check?: { qUk: string; qEn: string; options: string[]; correctIndex: number };
  retrieval: Retrieval[];
  whyUk: string;
  whyEn: string;
  ideas: Idea[];
  sampleUk: string;
  sampleEn: string;
  minWords?: number;
};

export type ExamQ = {
  promptUk: string;
  promptEn: string;
  code?: string;
  language?: string;
  options: string[];
  optionsEn?: string[];
  correctIndex: number;
  explanationUk: string;
  explanationEn: string;
  kind?: "mcq" | "read" | "fill";
  accepted?: string[];
  fillCode?: string;
};

function withOptionsEn<T extends Exercise>(row: T, optionsEn?: string[]): T {
  if (optionsEn && (row.type === "mcq" || row.type === "code_read" || row.type === "code_output")) {
    (row as T & { optionsEn?: string[] }).optionsEn = optionsEn;
  }
  return row;
}

export function retrievalToExercise(id: string, r: Retrieval): Exercise {
  const note: Note = "explanationUk" in r ? { explanationUk: r.explanationUk, explanationEn: r.explanationEn } : {};
  if (r.kind === "mcq") {
    return withOptionsEn(mcq(id, r.promptUk, r.promptEn, r.options, r.correctIndex, note), r.optionsEn);
  }
  if (r.kind === "fill") {
    return codeFill(id, r.promptUk, r.promptEn, r.language, r.code, r.accepted, r.caseSensitive ?? true, note);
  }
  if (r.kind === "read") {
    return withOptionsEn(
      codeRead(id, r.promptUk, r.promptEn, r.language, r.code, r.options, r.correctIndex, note),
      r.optionsEn,
    );
  }
  if (r.kind === "output") {
    return withOptionsEn(
      codeOutputMcq(id, r.promptUk, r.promptEn, r.language, r.code, r.options, r.correctIndex, note),
      r.optionsEn,
    );
  }
  if (r.kind === "order") {
    return codeOrder(id, r.promptUk, r.promptEn, r.language, r.lines, r.correct, note);
  }
  return matchEx(id, r.promptUk, r.promptEn, r.pairs);
}

/** concept → retrieval practice → self-explanation */
export function teachLesson(spec: TeachSpec): LessonContent {
  const exercises: Exercise[] = [
    concept(
      `${spec.slug}-c`,
      spec.titleUk,
      spec.titleEn,
      { uk: spec.conceptUk, en: spec.conceptEn },
      {
        keyPointsUk: spec.pointsUk,
        keyPointsEn: spec.pointsEn,
        code: spec.code,
        language: spec.code ? (spec.language ?? "javascript") : undefined,
        check: spec.check,
      },
    ),
  ];
  spec.retrieval.forEach((r, i) => {
    exercises.push(retrievalToExercise(`${spec.slug}-r${i + 1}`, r));
  });
  exercises.push(
    explain(`${spec.slug}-e`, spec.whyUk, spec.whyEn, spec.ideas, {
      minWords: spec.minWords ?? 12,
      passRatio: 0.6,
      sampleAnswerUk: spec.sampleUk,
      sampleAnswerEn: spec.sampleEn,
    }),
  );
  return lesson(spec.slug, spec.titleUk, spec.titleEn, spec.difficulty, Boolean(spec.free), exercises);
}

export function sectionExam(
  slug: string,
  titleUk: string,
  titleEn: string,
  difficulty: number,
  questions: ExamQ[],
): LessonContent {
  return exam(
    slug,
    titleUk,
    titleEn,
    difficulty,
    questions.map((q, i) => {
      const id = `${slug}-q${i + 1}`;
      if (q.kind === "fill" && q.fillCode && q.accepted) {
        return codeFill(id, q.promptUk, q.promptEn, q.language ?? "javascript", q.fillCode, q.accepted, false, {
          explanationUk: q.explanationUk,
          explanationEn: q.explanationEn,
        });
      }
      if (q.code) {
        return withOptionsEn(
          codeRead(id, q.promptUk, q.promptEn, q.language ?? "javascript", q.code, q.options, q.correctIndex, {
            explanationUk: q.explanationUk,
            explanationEn: q.explanationEn,
          }),
          q.optionsEn,
        );
      }
      return withOptionsEn(
        mcq(id, q.promptUk, q.promptEn, q.options, q.correctIndex, {
          explanationUk: q.explanationUk,
          explanationEn: q.explanationEn,
        }),
        q.optionsEn,
      );
    }),
  );
}

export function sectionUnit(
  slug: string,
  titleUk: string,
  titleEn: string,
  lessons: TeachSpec[],
  examTitleUk: string,
  examTitleEn: string,
  questions: ExamQ[],
): UnitContent {
  const difficulty = Math.max(...lessons.map((l) => l.difficulty), 2);
  return unit(slug, titleUk, titleEn, [
    ...lessons.map(teachLesson),
    sectionExam(`${slug}-exam`, examTitleUk, examTitleEn, difficulty, questions),
  ]);
}

/** Insert lessons immediately before the unit exam (or append if none). */
export function appendLessonsBeforeExam(u: UnitContent, extra: LessonContent[]): UnitContent {
  if (extra.length === 0) return u;
  const examIdx = u.lessons.findIndex((l) => l.isExam);
  if (examIdx === -1) return { ...u, lessons: [...u.lessons, ...extra] };
  return {
    ...u,
    lessons: [...u.lessons.slice(0, examIdx), ...extra, ...u.lessons.slice(examIdx)],
  };
}

export function expandCourse(
  course: CourseContent,
  insertions: Record<string, LessonContent[]>,
  newUnits: UnitContent[] = [],
): CourseContent {
  const units = course.units.map((u) => {
    const extra = insertions[u.slug];
    return extra && extra.length ? appendLessonsBeforeExam(u, extra) : u;
  });
  return { ...course, units: [...units, ...newUnits] };
}
