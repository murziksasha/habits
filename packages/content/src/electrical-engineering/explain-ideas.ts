import { normalizeExplainText } from "@eduforge/shared";
import type { Exercise } from "../types.js";

const UK_STOP = new Set(
  "і й та або але це не на на в у з із зі до що як для від при по за про є має мають його її їх той те вже уже лише тільки поки коли якщо без після перед між через тому тож саме слово урок уроку модель моделі цього цій ця цей ці яка який яке які щоб бо ні так дуже може можна треба потрібно тут там ще всі весь вся все вона він вони було була були буде будуть немає нема ніж також інше інший інша один одна одне помилка помилку помилки помилці межа межі".split(
    " ",
  ),
);

const EN_STOP = new Set(
  "the and that this with from into when where which while their there these those about after before because would could should still only also than then them they have has been being were was are not for but its into over under such same each both does did done will your you our out all any one two what how why who just like some more most very another between during through until again already without within across model lesson word names mistake error worked here limit".split(
    " ",
  ),
);

const BOILERPLATE = /саме слово|the word |names the model|фіксує модель/i;

function sentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter((part) => part.length > 0 && !BOILERPLATE.test(part));
}

function overlaps(token: string, stems: string[]): boolean {
  return stems.some((stem) => stem.length > 0 && (token.includes(stem) || stem.includes(token)));
}

function distinctiveToken(text: string, stop: Set<string>, stems: string[]): string | null {
  const lines = sentences(text);
  const pools = lines.length ? [lines[lines.length - 1]!, ...lines.slice(0, -1).reverse()] : [text];
  for (const pool of pools) {
    const tokens = normalizeExplainText(pool).split(" ").filter(Boolean);
    let best: string | null = null;
    for (const token of tokens) {
      if (token.length < 5 || stop.has(token) || overlaps(token, stems) || /^\d/.test(token)) continue;
      if (!best || token.length > best.length) best = token;
    }
    if (best) return best;
  }
  return null;
}

/** A second idea drawn from the sample's own check or mistake, not from the keyword. */
export function secondExplainIdea(
  sampleUk: string,
  sampleEn: string,
  firstAnyOf: string[],
): { labelUk: string; labelEn: string; anyOf: string[] } | null {
  const stems = firstAnyOf.flatMap((raw) => normalizeExplainText(raw).split(" ").filter(Boolean));
  const uk = distinctiveToken(sampleUk, UK_STOP, stems);
  const en = distinctiveToken(sampleEn, EN_STOP, stems);
  const anyOf = [...new Set([uk, en].filter((token): token is string => Boolean(token)))];
  if (anyOf.length === 0) return null;
  return {
    labelUk: "окрема ознака пояснення",
    labelEn: "a separate point in the explanation",
    anyOf,
  };
}

export function enrichExplain(exercise: Extract<Exercise, { type: "explain" }>): Exercise {
  if (exercise.keyIdeas.length >= 2) return exercise;
  const first = exercise.keyIdeas[0];
  if (!first) return exercise;
  const extra = secondExplainIdea(exercise.sampleAnswerUk ?? "", exercise.sampleAnswerEn ?? "", first.anyOf);
  if (!extra) return exercise;
  return { ...exercise, keyIdeas: [first, extra], passRatio: 1 };
}
