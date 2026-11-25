/**
 * Chess deep upgrade overlay (SPEC/CHESS-DEEP-UPGRADE-PLAN.md, phases 1, 2 and 4).
 *
 * Applied last in the chess pipeline. Exercise ids never change: broken puzzles are fixed
 * in place, replaced with real-game Lichess positions, or converted to `chess_plan`.
 * New Lichess puzzles are appended to their teach lessons (ids `ch-li-<PuzzleId>`).
 * Offline QA results (goal, accepted alternatives) are merged when the hash still matches.
 */
import { chessPuzzleHash } from "./hash.js";
import type { ChessPlanExercise, ChessPuzzleExercise, CourseContent, Exercise } from "../types.js";
import { CHESS_QA } from "../chess-qa.generated.js";
import { LICHESS_ADDITIONS, LICHESS_REPLACEMENTS } from "../expansion/chess-lichess.generated.js";
import { CHESS_FIXES, CHESS_REVIEWS } from "./fixes.js";
import { CHESS_PLANS } from "./plans.js";
import { CHESS_ANNOTATIONS } from "./annotations.js";
import { CHESS_FACTS } from "../chess-facts.generated.js";
import { buildExplanation, buildHints } from "../chess-explanation-templates.js";

export { CHESS_QA_WAIVERS } from "./fixes.js";
export { CHESS_PLANS } from "./plans.js";

function rotation(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i += 1) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return h % 3;
}

function toPlan(ex: Exercise & { fen?: string }, id: string): ChessPlanExercise {
  const spec = CHESS_PLANS[id]!;
  const r = rotation(id);
  const choices = [...spec.choices.slice(3 - r), ...spec.choices.slice(0, 3 - r)];
  const correctIndex = r;
  return {
    id,
    type: "chess_plan",
    promptUk: spec.promptUk,
    promptEn: spec.promptEn,
    fen: spec.fen ?? ex.fen ?? "",
    choices: choices.map((c) => ({ san: c.san, explanationUk: c.uk, explanationEn: c.en })),
    correctIndex,
    themes: spec.themes,
    ...(spec.source ? { source: spec.source } : {}),
    ...(spec.reviewOf ? { reviewOf: spec.reviewOf } : {}),
  };
}

/** Themes, two-step hints and template explanations from line facts (Phase 2). */
export function withFacts(p: ChessPuzzleExercise): ChessPuzzleExercise {
  const f = CHESS_FACTS[p.id];
  if (!f || f.hash !== chessPuzzleHash(p.fen, p.solutionSans)) return p;
  const themes = p.themes?.length ? p.themes : f.themes;
  const out: ChessPuzzleExercise = { ...p, themes };
  if (!out.hintUk) Object.assign(out, buildHints(f));
  if (!out.explanationUk) Object.assign(out, buildExplanation(themes, f), { explanationKind: "template" as const });
  else if (!out.explanationKind) out.explanationKind = "authored";
  return out;
}

/** Merge offline QA (goal, alternatives) when the record matches the authored line. */
export function withQa(p: ChessPuzzleExercise): ChessPuzzleExercise {
  const rec = CHESS_QA.items[p.id];
  if (!rec || rec.hash !== chessPuzzleHash(p.fen, p.solutionSans)) return p;
  return {
    ...p,
    goal: p.goal ?? rec.goal,
    ...(rec.acceptedAlternatives && !p.acceptedAlternatives ? { acceptedAlternatives: rec.acceptedAlternatives } : {}),
    ...(rec.alternativeLines && !p.alternativeLines ? { alternativeLines: rec.alternativeLines } : {}),
  };
}

function upgradeExercise(ex: Exercise): Exercise {
  const id = ex.id;
  if (CHESS_PLANS[id]) return { ...toPlan(ex as Exercise & { fen?: string }, id), ...(ex.contentVersion ? { contentVersion: ex.contentVersion } : {}) };
  if (ex.type !== "chess_puzzle") return ex;
  let p: ChessPuzzleExercise = ex as ChessPuzzleExercise;
  const rep = LICHESS_REPLACEMENTS[id];
  if (rep) p = { ...rep, id, difficulty: rep.difficulty };
  const fix = CHESS_FIXES[id];
  if (fix) {
    p = { ...p, ...fix };
    if (fix.fen || fix.solutionSans) {
      delete p.acceptedAlternatives;
      delete p.alternativeLines;
    }
  }
  if (CHESS_REVIEWS[id]) p = { ...p, reviewOf: CHESS_REVIEWS[id] };
  const note = CHESS_ANNOTATIONS[id];
  if (note) p = { ...p, ...note };
  return withFacts(withQa(p));
}

export function applyChessUpgrade(course: CourseContent): CourseContent {
  const additions = new Map<string, ChessPuzzleExercise[]>();
  for (const a of LICHESS_ADDITIONS) {
    const list = additions.get(a.lesson) ?? [];
    list.push(a.exercise);
    additions.set(a.lesson, list);
  }
  return {
    ...course,
    units: course.units.map((u) => ({
      ...u,
      titleUk: u.titleUk === "Туристичні ендшпілі" ? "Турові ендшпілі" : u.titleUk,
      lessons: u.lessons.map((l) => {
        const extra = (additions.get(l.slug) ?? []).map((e) => withFacts(withQa({ ...e, ...(CHESS_ANNOTATIONS[e.id] ?? {}) })));
        return { ...l, exercises: [...l.exercises.map(upgradeExercise), ...extra] };
      }),
    })),
  };
}
