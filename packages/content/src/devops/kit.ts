import {
  codeFill,
  codeOrder,
  codeOutputMcq,
  codeRead,
  exam,
  lesson,
  matchEx,
  mcq,
} from "../builders.js";
import type { Exercise, LessonContent } from "../types.js";

type Note = { explanationUk?: string; explanationEn?: string };

export type Step =
  | { t: "mcq"; uk: string; en: string; o: string[]; i: number; note?: Note }
  | { t: "read"; uk: string; en: string; lang: string; code: string; o: string[]; i: number; note?: Note }
  | { t: "out"; uk: string; en: string; lang: string; code: string; o: string[]; i: number; note?: Note }
  | { t: "fill"; uk: string; en: string; lang: string; code: string; ok: string[]; note?: Note }
  | { t: "order"; uk: string; en: string; lang: string; correct: string[]; note?: Note }
  | { t: "match"; uk: string; en: string; pairs: { left: string; right: string }[] };

export function why(uk: string, en: string): Note {
  return { explanationUk: uk, explanationEn: en };
}

export function steps(prefix: string, items: Step[]): Exercise[] {
  return items.map((item, idx) => {
    const id = `${prefix}-${idx + 1}`;
    switch (item.t) {
      case "mcq":
        return mcq(id, item.uk, item.en, item.o, item.i, item.note);
      case "read":
        return codeRead(id, item.uk, item.en, item.lang, item.code, item.o, item.i, item.note);
      case "out":
        return codeOutputMcq(id, item.uk, item.en, item.lang, item.code, item.o, item.i, item.note);
      case "fill":
        return codeFill(id, item.uk, item.en, item.lang, item.code, item.ok, true, item.note);
      case "order": {
        const lines =
          item.correct.length < 2 ? [...item.correct] : [...item.correct.slice(1), item.correct[0]];
        return codeOrder(id, item.uk, item.en, item.lang, lines, item.correct, item.note);
      }
      case "match":
        return matchEx(id, item.uk, item.en, item.pairs);
    }
  });
}

export function teach(
  slug: string,
  uk: string,
  en: string,
  difficulty: number,
  prefix: string,
  items: Step[],
): LessonContent {
  return lesson(slug, uk, en, difficulty, false, steps(prefix, items));
}

export function quiz(
  slug: string,
  uk: string,
  en: string,
  difficulty: number,
  prefix: string,
  items: Step[],
): LessonContent {
  return exam(slug, uk, en, difficulty, steps(prefix, items));
}
