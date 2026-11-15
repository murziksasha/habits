import type { Exercise, LessonContent, UnitContent } from "./types.js";
import { codeFill, codeRead, concept, exam, explain, lesson, mcq, unit } from "./builders.js";

type Idea = { labelUk: string; labelEn: string; anyOf: string[] };

type Worked = {
  promptUk: string;
  promptEn: string;
  code: string;
  options: string[];
  optionsEn?: string[];
  correctIndex: number;
  explanationUk: string;
  explanationEn: string;
};

type Retrieval =
  | ({ kind: "mcq" } & Worked)
  | {
      kind: "fill";
      promptUk: string;
      promptEn: string;
      code: string;
      accepted: string[];
      explanationUk: string;
      explanationEn: string;
    };

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
  worked: Worked;
  retrieval: Retrieval;
  whyUk: string;
  whyEn: string;
  ideas: Idea[];
  sampleUk: string;
  sampleEn: string;
};

export type ExamSpec = {
  promptUk: string;
  promptEn: string;
  code?: string;
  options: string[];
  optionsEn?: string[];
  correctIndex: number;
  explanationUk: string;
  explanationEn: string;
};

/** concept → worked example → retrieval → explanation */
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
        language: spec.code ? (spec.language ?? "sql") : undefined,
      },
    ),
    codeRead(
      `${spec.slug}-w`,
      spec.worked.promptUk,
      spec.worked.promptEn,
      spec.language ?? "sql",
      spec.worked.code,
      spec.worked.options,
      spec.worked.correctIndex,
      {
        explanationUk: spec.worked.explanationUk,
        explanationEn: spec.worked.explanationEn,
      },
    ),
  ];
  const worked = exercises[1];
  if (worked && worked.type === "code_read" && spec.worked.optionsEn) {
    (worked as { optionsEn?: string[] }).optionsEn = spec.worked.optionsEn;
  }
  if (spec.retrieval.kind === "fill") {
    exercises.push(
      codeFill(
        `${spec.slug}-r`,
        spec.retrieval.promptUk,
        spec.retrieval.promptEn,
        "sql",
        spec.retrieval.code,
        spec.retrieval.accepted,
        false,
        {
          explanationUk: spec.retrieval.explanationUk,
          explanationEn: spec.retrieval.explanationEn,
        },
      ),
    );
  } else {
    const row = mcq(
      `${spec.slug}-r`,
      spec.retrieval.promptUk,
      spec.retrieval.promptEn,
      spec.retrieval.options,
      spec.retrieval.correctIndex,
      {
        explanationUk: spec.retrieval.explanationUk,
        explanationEn: spec.retrieval.explanationEn,
      },
    );
    if (spec.retrieval.optionsEn && row.type === "mcq") {
      (row as { optionsEn?: string[] }).optionsEn = spec.retrieval.optionsEn;
    }
    exercises.push(row);
  }
  exercises.push(
    explain(
      `${spec.slug}-e`,
      spec.whyUk,
      spec.whyEn,
      spec.ideas,
      {
        minWords: 12,
        passRatio: 0.6,
        sampleAnswerUk: spec.sampleUk,
        sampleAnswerEn: spec.sampleEn,
      },
    ),
  );
  return lesson(spec.slug, spec.titleUk, spec.titleEn, spec.difficulty, Boolean(spec.free), exercises);
}

export function sectionExam(
  slug: string,
  titleUk: string,
  titleEn: string,
  difficulty: number,
  questions: ExamSpec[],
): LessonContent {
  return exam(
    slug,
    titleUk,
    titleEn,
    difficulty,
    questions.map((q, i) => {
      const row = q.code
        ? codeRead(
            `${slug}-q${i + 1}`,
            q.promptUk,
            q.promptEn,
            "sql",
            q.code,
            q.options,
            q.correctIndex,
            { explanationUk: q.explanationUk, explanationEn: q.explanationEn },
          )
        : mcq(
            `${slug}-q${i + 1}`,
            q.promptUk,
            q.promptEn,
            q.options,
            q.correctIndex,
            { explanationUk: q.explanationUk, explanationEn: q.explanationEn },
          );
      if (q.optionsEn && (row.type === "mcq" || row.type === "code_read")) {
        (row as { optionsEn?: string[] }).optionsEn = q.optionsEn;
      }
      return row;
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
  questions: ExamSpec[],
): UnitContent {
  const difficulty = lessons[0]?.difficulty ?? 2;
  return unit(slug, titleUk, titleEn, [
    ...lessons.map(teachLesson),
    sectionExam(`${slug}-exam`, examTitleUk, examTitleEn, difficulty, questions),
  ]);
}
