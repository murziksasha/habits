/**
 * Canonical exercise grading — used by API and client soft-grade.
 * Keep rules identical to avoid client/server drift.
 */

import { gradeExplanation, type ExplainKeyIdea } from "./explain.js";
import { jsStaticPartialScore, runJsStaticAsserts, type JsStaticAssert } from "./js-static.js";
import { gradeNumericAnswer } from "./numeric.js";
import { checkEndgameGoal, gradePuzzleLine, type EndgameGoal, type PuzzleSpec } from "@eduforge/chess-core";

/** Chess hint ladder: 0 none, 1 piece, 2 square. */
export function clampHints(value: unknown): 0 | 1 | 2 {
  const n = typeof value === "number" && Number.isFinite(value) ? Math.floor(value) : 0;
  return n <= 0 ? 0 : n >= 2 ? 2 : 1;
}

export type GradeExercise = {
  id: string;
  type: string;
  [key: string]: unknown;
};

export type GradeResult = {
  correct: boolean;
  /** 0–1 partial credit when multi-check (projects, static asserts) */
  partial?: number;
  meta?: Record<string, unknown>;
};

export type ProjectCheck = {
  fileId?: string;
  contains?: string[];
  containsHtml?: string[];
  forbidden?: string[];
  kind?: string;
  selector?: string;
  minCount?: number;
};

export function normText(s: string) {
  let res = s
    .trim()
    .toLowerCase()
    .replace(/[\u2018\u2019\u02BC\u0060\u00B4]/g, "'")
    .replace(/[\u201C\u201D\u00AB\u00BB]/g, '"')
    .replace(/[\u2013\u2014\u2212]/g, "-")
    .replace(/[.…!?]+$/g, "")
    .replace(/[.…!?]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (
    (res.startsWith('"') && res.endsWith('"') && res.length >= 2) ||
    (res.startsWith("'") && res.endsWith("'") && res.length >= 2)
  ) {
    res = res.slice(1, -1).trim();
  }
  return res;
}

/** Robust normalize for code: collapses whitespace, standardizes quotes, operator spacing, and trailing semicolons */
export function normCode(s: string, caseSensitive: boolean) {
  let t = s.trim();
  if (!caseSensitive) t = t.toLowerCase();
  return t
    .replace(/[\u2018\u2019\u02BC\u0060\u00B4]/g, "'")
    .replace(/[\u201C\u201D\u00AB\u00BB]/g, '"')
    .replace(/'([^']*)'/g, '"$1"')
    .replace(/\s*([;,:+\-*\/=<>!%&|^~?])\s*/g, "$1")
    .replace(/\s*([()\[\]{}])\s*/g, "$1")
    .replace(/\s+/g, " ")
    .replace(/;+$/g, "")
    .trim();
}

/** Check if actual code answer is equivalent to expected answer */
export function isCodeEquivalent(
  actual: string,
  expected: string,
  caseSensitive = true,
): boolean {
  if (actual === expected) return true;
  const aRaw = actual.trim();
  const eRaw = expected.trim();
  if (caseSensitive ? aRaw === eRaw : aRaw.toLowerCase() === eRaw.toLowerCase()) return true;

  const aLight = aRaw.replace(/\s+/g, " ");
  const eLight = eRaw.replace(/\s+/g, " ");
  if (caseSensitive ? aLight === eLight : aLight.toLowerCase() === eLight.toLowerCase()) return true;

  return normCode(actual, caseSensitive) === normCode(expected, caseSensitive);
}

export function filesToMap(
  files: Record<string, string> | { id: string; content: string }[] | undefined,
): Map<string, string> {
  const map = new Map<string, string>();
  if (Array.isArray(files)) {
    for (const f of files) map.set(f.id, f.content ?? "");
  } else if (files && typeof files === "object") {
    for (const [k, v] of Object.entries(files)) map.set(k, String(v ?? ""));
  }
  return map;
}

/** Shared code_project check evaluation (server grade + client soft-grade). */
export function gradeCodeProjectChecks(
  files: Record<string, string> | { id: string; content: string }[] | undefined,
  checks: ProjectCheck[],
  caseSensitive = true,
): { ok: boolean; missing: string[] } {
  if (!checks.length) return { ok: false, missing: ["no_checks"] };
  const map = filesToMap(files);
  const allJoined = [...map.values()].join("\n");
  const missing: string[] = [];

  for (const ch of checks) {
    if (ch.kind === "dom" && ch.selector) {
      const html = allJoined;
      const sel = ch.selector;
      let ok = false;
      if (sel.startsWith(".")) {
        const cls = sel.slice(1);
        ok = new RegExp(`class=["'][^"']*\\b${cls}\\b`).test(html);
      } else if (sel.startsWith("#")) {
        const id = sel.slice(1);
        ok = html.includes(`id="${id}"`) || html.includes(`id='${id}'`);
      } else {
        const tag = sel.replace(/[^a-z0-9-]/gi, "") || sel;
        ok = new RegExp(`<${tag}[\\s>]`, "i").test(html);
      }
      if (!ok) missing.push(`dom:${sel}`);
      continue;
    }

    if (ch.containsHtml?.length) {
      let content = allJoined;
      if (!caseSensitive) content = content.toLowerCase();
      for (const needle of ch.containsHtml) {
        const n = caseSensitive ? needle : needle.toLowerCase();
        if (!content.includes(n) && !normCode(content, caseSensitive).includes(normCode(n, caseSensitive))) {
          missing.push(`html:${needle}`);
        }
      }
    }

    if (ch.fileId && ch.contains?.length) {
      let content = map.get(ch.fileId) ?? "";
      if (!caseSensitive) content = content.toLowerCase();
      for (const needle of ch.contains) {
        const n = caseSensitive ? needle : needle.toLowerCase();
        if (!content.includes(n) && !normCode(content, caseSensitive).includes(normCode(n, caseSensitive))) {
          missing.push(`${ch.fileId}:${needle}`);
        }
      }
    }
    if (ch.fileId && ch.forbidden?.length) {
      let content = map.get(ch.fileId) ?? "";
      if (!caseSensitive) content = content.toLowerCase();
      for (const needle of ch.forbidden) {
        const n = caseSensitive ? needle : needle.toLowerCase();
        if (content.includes(n)) missing.push(`forbidden ${ch.fileId}:${needle}`);
      }
    }
  }

  return { ok: missing.length === 0, missing };
}

export function gradeCodeJudgeText(
  exercise: GradeExercise,
  source: string,
): GradeResult {
  const code = source.trim();
  if (!code) {
    return {
      correct: false,
      partial: 0,
      meta: { judge: true, mode: "text", reason: "empty" },
    };
  }

  const cs = exercise.caseSensitive !== false;
  const hay = cs ? code : code.toLowerCase();

  const forbidden = (exercise.forbiddenSource as string[]) ?? [];
  for (const f of forbidden) {
    const fn = cs ? f : f.toLowerCase();
    if (hay.includes(fn)) {
      return {
        correct: false,
        partial: 0,
        meta: { judge: true, mode: "text", forbidden: f },
      };
    }
  }

  const required = (exercise.requiredSource as string[]) ?? [];
  const missing: string[] = [];
  for (const r of required) {
    const rn = cs ? r : r.toLowerCase();
    if (!hay.includes(rn) && !normCode(hay, cs).includes(normCode(rn, cs))) {
      missing.push(r);
    }
  }

  const accepted = (exercise.accepted as string[]) ?? [];
  if (accepted.length > 0) {
    const ok = accepted.some((a) => isCodeEquivalent(code, a, cs));
    if (ok) {
      return {
        correct: true,
        partial: 1,
        meta: { judge: true, mode: "text", textVerified: true },
      };
    }
    if (!required.length) {
      return {
        correct: false,
        partial: 0,
        meta: { judge: true, mode: "text", missing: ["accepted_pattern"] },
      };
    }
  }

  const tests = (exercise.tests as { type: string; value: string | number }[]) ?? [];
  if (tests.length > 0 && !required.length && !accepted.length) {
    let matched = 0;
    for (const t of tests) {
      const val = String(t.value);
      const valNorm = cs ? val : val.toLowerCase();
      if (t.type === "stdout_contains" || t.type === "stdout_equals") {
        if (hay.includes(valNorm) || normCode(hay, false).includes(normCode(valNorm, false))) {
          matched++;
        }
      } else if (t.type === "not_stdout_contains") {
        if (!hay.includes(valNorm)) {
          matched++;
        }
      } else {
        matched++;
      }
    }
    const pass = matched === tests.length;
    return {
      correct: pass,
      partial: tests.length > 0 ? matched / tests.length : 1,
      meta: {
        judge: true,
        mode: "text",
        textVerified: pass,
        matched,
        total: tests.length,
      },
    };
  }

  const ok = missing.length === 0;
  return {
    correct: ok,
    partial: ok ? 1 : 0,
    meta: {
      judge: true,
      mode: "text",
      textVerified: ok,
      ...(missing.length ? { missing } : {}),
    },
  };
}

/** Apply a server-side circuit evaluation. Client payloads cannot call this path. */
export function gradeCircuitServerEvaluation(evaluation: {
  ok: boolean;
  criteriaPassed: number;
  criteriaTotal: number;
  criteriaResults?: unknown;
  error?: string;
}): GradeResult {
  const total = evaluation.criteriaTotal > 0 ? evaluation.criteriaTotal : 1;
  const ratio = Math.min(1, Math.max(0, evaluation.criteriaPassed / total));
  return {
    correct: evaluation.ok && evaluation.criteriaPassed === evaluation.criteriaTotal && evaluation.criteriaTotal > 0,
    partial: ratio,
    meta: {
      circuitLab: true,
      serverVerified: true,
      criteriaPassed: evaluation.criteriaPassed,
      criteriaTotal: evaluation.criteriaTotal,
      results: evaluation.criteriaResults,
      error: evaluation.error,
    },
  };
}

export function gradeExercise(
  exercise: GradeExercise,
  answer: unknown,
): GradeResult {
  switch (exercise.type) {
    case "mcq":
    case "logic_puzzle":
    case "code_read": {
      const idx =
        typeof answer === "number" ? answer : Number((answer as { index?: number })?.index);
      return { correct: idx === exercise.correctIndex };
    }
    case "code_output": {
      if (Array.isArray(exercise.options) && exercise.correctIndex != null) {
        const idx =
          typeof answer === "number" ? answer : Number((answer as { index?: number })?.index);
        return { correct: idx === exercise.correctIndex };
      }
      const text = String(answer ?? "");
      const accepted = (exercise.accepted as string[]) ?? [];
      const cs = exercise.caseSensitive !== false;
      return {
        correct: accepted.some((a) => isCodeEquivalent(text, a, cs)),
      };
    }
    case "code_fill": {
      const text = String(answer ?? "");
      const accepted = (exercise.accepted as string[]) ?? [];
      const cs = exercise.caseSensitive !== false;
      const exactOk = accepted.some(
        (a) => isCodeEquivalent(text, String(a), cs),
      );
      const staticAsserts = (exercise.staticAsserts as JsStaticAssert[]) ?? [];
      if (staticAsserts.length) {
        const st = runJsStaticAsserts(text, staticAsserts);
        const partial = jsStaticPartialScore(text, staticAsserts);
        // Pass if exact accepted OR all static asserts (content) pass
        const correct = exactOk || st.ok;
        return {
          correct,
          partial: exactOk ? 1 : partial.ratio,
          meta: {
            ...(st.missing.length ? { missing: st.missing } : { ok: true }),
            staticIssues: st.issues,
            partial: exactOk ? 1 : partial.ratio,
          },
        };
      }
      return { correct: exactOk, partial: exactOk ? 1 : 0 };
    }
    case "code_order": {
      const correct = (exercise.correct as string[]) ?? (exercise.lines as string[]) ?? [];
      const ans = (answer as string[]) ?? [];
      return {
        correct: ans.length === correct.length && ans.every((w, i) => w === correct[i]),
      };
    }
    case "code_project": {
      const checks = (exercise.checks as ProjectCheck[]) ?? [];
      const raw = answer as {
        files?: Record<string, string> | { id: string; content: string }[];
      };
      const cs = exercise.caseSensitive !== false;
      const { ok, missing } = gradeCodeProjectChecks(raw?.files, checks, cs);
      const total = checks.length || 1;
      const failed = missing.length;
      // Approximate partial: checks that did not produce a missing token
      const partial = ok ? 1 : Math.max(0, (total - Math.min(total, failed)) / total);
      return {
        correct: ok,
        partial,
        meta: missing.length
          ? { missing, partial, passedChecks: Math.max(0, total - failed), totalChecks: total }
          : { ok: true, partial: 1 },
      };
    }
    case "code_run": {
      // Client runs C++/etc; server grades source constraints (no server compiler).
      // answer: string source | { source: string }
      const raw = answer as string | { source?: string };
      const source = typeof raw === "string" ? raw : String(raw?.source ?? "");
      if (!source.trim()) return { correct: false, meta: { reason: "empty" } };
      const cs = exercise.caseSensitive !== false;
      const hay = cs ? source : source.toLowerCase();
      const required = (exercise.requiredSource as string[]) ?? [];
      const forbidden = (exercise.forbiddenSource as string[]) ?? [];
      const missing: string[] = [];
      const banned: string[] = [];
      for (const n of required) {
        const needle = cs ? n : n.toLowerCase();
        if (!hay.includes(needle)) missing.push(n);
      }
      for (const n of forbidden) {
        const needle = cs ? n : n.toLowerCase();
        if (hay.includes(needle)) banned.push(n);
      }
      const lang = String(exercise.language ?? "");
      if (lang === "cpp" && !/\bmain\s*\(/.test(source)) {
        missing.push("main(");
      }
      const correct = missing.length === 0 && banned.length === 0;
      return {
        correct,
        meta: correct ? { ok: true } : { missing, banned },
      };
    }
    case "translate":
    case "fill_blank": {
      const text = String(answer ?? "");
      const accepted = (exercise.accepted as string[]) ?? [];
      return { correct: accepted.some((a) => normText(a) === normText(text)) };
    }
    case "match": {
      const pairs = Array.isArray(exercise.pairs) ? exercise.pairs : [];
      const ans = Array.isArray(answer) ? answer : [];
      if (!pairs.length || ans.length !== pairs.length) {
        return { correct: false, meta: { missing: [`pairs:${ans.length}/${pairs.length}`] } };
      }
      const key = (p: { left: unknown; right: unknown }) => JSON.stringify([p.left, p.right]);
      const remaining = new Map<string, number>();
      for (const pair of pairs) {
        if (!pair || typeof pair.left !== "string" || typeof pair.right !== "string") return { correct: false };
        const k = key(pair);
        remaining.set(k, (remaining.get(k) ?? 0) + 1);
      }
      let wrong = 0;
      for (const pair of ans) {
        if (!pair || typeof pair.left !== "string" || typeof pair.right !== "string") { wrong += 1; continue; }
        const k = key(pair);
        const count = remaining.get(k) ?? 0;
        if (count === 0) wrong += 1;
        else remaining.set(k, count - 1);
      }
      return {
        correct: wrong === 0,
        meta: wrong ? { missing: [`wrong_pairs:${wrong}`] } : { ok: true },
      };
    }
    case "order_words": {
      const correct = (exercise.correct as string[]) ?? [];
      const ans = (answer as string[]) ?? [];
      const ok =
        ans.length === correct.length && ans.every((w, i) => w === correct[i]);
      if (ok) return { correct: true };
      let mismatch = 0;
      const n = Math.max(ans.length, correct.length);
      for (let i = 0; i < n; i++) {
        if (ans[i] !== correct[i]) mismatch += 1;
      }
      return { correct: false, meta: { missing: [`order_slots:${mismatch}`] } };
    }
    case "typing": {
      const response = answer as { wpm?: unknown; text?: unknown } | null;
      const expected = typeof exercise.text === "string" ? exercise.text : "";
      const typed = typeof response?.text === "string" ? response.text : "";
      const rawWpm = typeof response?.wpm === "number" ? response.wpm : 0;
      const wpm = Number.isFinite(rawWpm) && rawWpm >= 0 ? rawWpm : 0;
      let matches = 0;
      for (let i = 0; i < Math.min(typed.length, expected.length); i += 1) {
        if (typed[i] === expected[i]) matches += 1;
      }
      const accuracy = typed.length ? matches / typed.length : 0;
      return {
        correct: expected.length > 0 && typed.length >= expected.length && accuracy >= 0.85 && wpm >= 10,
        meta: { wpm, accuracy },
      };
    }
    case "rsvp": {
      const done = Boolean((answer as { completed?: boolean })?.completed);
      return { correct: done, meta: { wpm: exercise.wpm } };
    }
    case "comprehension": {
      const indices = (answer as number[]) ?? [];
      const questions = (exercise.questions as { correctIndex: number }[]) ?? [];
      let ok = 0;
      questions.forEach((q, i) => {
        if (indices[i] === q.correctIndex) ok += 1;
      });
      const ratio = questions.length ? ok / questions.length : 0;
      return {
        correct: ratio >= 0.5,
        partial: ratio,
        meta: { comprehension: ratio, correctCount: ok, total: questions.length },
      };
    }
    case "chess_puzzle": {
      const a = answer as { sans?: unknown; hintsUsed?: unknown; revealed?: unknown } | null;
      const solution = Array.isArray(exercise.solutionSans)
        ? exercise.solutionSans.filter((s): s is string => typeof s === "string")
        : [];
      if (typeof exercise.fen !== "string" || solution.length === 0) return { correct: false };
      const g = gradePuzzleLine(
        {
          fen: exercise.fen,
          solutionSans: solution,
          goal: exercise.goal as PuzzleSpec["goal"],
          acceptedAlternatives: exercise.acceptedAlternatives as PuzzleSpec["acceptedAlternatives"],
          alternativeLines: exercise.alternativeLines as PuzzleSpec["alternativeLines"],
        },
        a?.sans,
      );
      const hintsUsed = clampHints(a?.hintsUsed);
      const revealed = a?.revealed === true;
      return {
        correct: g.solved && !revealed,
        meta: {
          hintsUsed,
          revealed,
          alternativesUsed: g.alternativesUsed,
          ...(g.error ? { error: g.error } : {}),
        },
      };
    }
    case "chess_endgame_drill": {
      // The server replays the whole game (learner + bot moves) and judges the goal by rules only.
      const a = answer as { sans?: unknown; hintsUsed?: unknown } | null;
      const sans = Array.isArray(a?.sans) ? a.sans.filter((s): s is string => typeof s === "string").slice(0, 400) : [];
      const goal = exercise.goal as EndgameGoal;
      const maxMoves = typeof exercise.maxMoves === "number" ? exercise.maxMoves : 50;
      if (typeof exercise.fen !== "string" || !["win", "draw", "promote"].includes(goal)) return { correct: false };
      const r = checkEndgameGoal(exercise.fen, sans, goal, maxMoves);
      return {
        correct: r.status === "success",
        meta: { endgame: r.status, reason: r.reason, learnerMoves: r.learnerMoves, hintsUsed: clampHints(a?.hintsUsed) },
      };
    }
    case "chess_plan": {
      const idx =
        typeof answer === "number" ? answer : Number((answer as { index?: number } | null)?.index);
      return { correct: Number.isInteger(idx) && idx === exercise.correctIndex };
    }
    case "chess_lesson": {
      const quiz = exercise.quiz as { correctIndex: number } | undefined;
      if (!quiz) return { correct: true };
      const idx =
        typeof answer === "number" ? answer : Number((answer as { index?: number })?.index);
      return { correct: idx === quiz.correctIndex };
    }
    case "explain": {
      const raw = answer as string | { text?: string } | null;
      const text = typeof raw === "string" ? raw : String(raw?.text ?? "");
      const g = gradeExplanation(text, {
        keyIdeas: (exercise.keyIdeas as ExplainKeyIdea[]) ?? [],
        minWords: exercise.minWords as number | undefined,
        passRatio: exercise.passRatio as number | undefined,
      });
      return {
        correct: g.correct,
        partial: g.partial,
        meta: { explain: true, matched: g.matched, missing: g.missing, words: g.words, tooShort: g.tooShort },
      };
    }
    case "concept": {
      // Theory card: acknowledged → correct; optional self-check must match.
      const check = exercise.check as { correctIndex: number } | undefined;
      if (!check) {
        const ack =
          answer === true ||
          Boolean((answer as { acknowledged?: boolean } | null)?.acknowledged);
        return { correct: ack, partial: ack ? 1 : 0, meta: { concept: true } };
      }
      const idx =
        typeof answer === "number" ? answer : Number((answer as { index?: number })?.index);
      return { correct: idx === check.correctIndex, meta: { concept: true } };
    }
    case "video": {
      // answer: { watchedSec, durationSec } or { completed: true }
      const a = answer as {
        watchedSec?: number;
        durationSec?: number;
        completed?: boolean;
        ratio?: number;
      };
      if (a?.completed) return { correct: true, partial: 1, meta: { video: true } };
      const minRatio = Number(exercise.minWatchRatio ?? 0.8);
      const duration =
        Number(a?.durationSec ?? exercise.durationSec ?? exercise.videoDurationSec ?? 0) || 1;
      const watched = Number(a?.watchedSec ?? 0);
      const ratio = a?.ratio != null ? Number(a.ratio) : watched / duration;
      const ok = ratio + 1e-9 >= minRatio;
      return {
        correct: ok,
        partial: Math.min(1, Math.max(0, ratio / minRatio)),
        meta: { video: true, ratio, minRatio },
      };
    }
    case "code_judge": {
      const a = answer as Record<string, unknown> | string | null;
      if (typeof a === "string") {
        return gradeCodeJudgeText(exercise, a);
      }
      if (a && typeof a === "object") {
        if (a.mode === "text") {
          return gradeCodeJudgeText(exercise, String(a.source ?? a.code ?? ""));
        }
        // ONLY trust runner results if flagged by internal server verification
        if (a._serverVerified === true) {
          const ok = Boolean(a.ok);
          const total = Number(a.testsTotal ?? 0);
          const passed = Number(a.testsPassed ?? 0);
          const ratio = total > 0 ? passed / total : ok ? 1 : 0;
          return {
            correct: ok && ratio >= 1,
            partial: ratio,
            meta: {
              judge: true,
              mode: "behavior",
              serverVerified: true,
              passed,
              total,
            },
          };
        }
        // If client sends { ok: true } without _serverVerified, DO NOT TRUST IT!
        return {
          correct: false,
          partial: 0,
          meta: { judge: true, reason: "untrusted_client_result" },
        };
      }
      return { correct: false, partial: 0, meta: { judge: true } };
    }
    case "composite_artifact": {
      const files =
        (answer as { files?: Record<string, string> })?.files ??
        (answer as Record<string, string>) ??
        {};
      const checks = (exercise.checks as ProjectCheck[]) ?? [];
      const res = gradeCodeProjectChecks(files, checks);
      const passedCount = checks.length - res.missing.length;
      const partial = checks.length > 0 ? Math.max(0, passedCount / checks.length) : 0;
      return {
        correct: res.ok,
        partial,
        meta: { composite: true, missing: res.missing, total: checks.length },
      };
    }
    case "dataset_query": {
      const query =
        typeof answer === "string" ? answer : String((answer as { query?: string })?.query ?? "");
      const required = (exercise.requiredKeywords as string[]) ?? [];
      const forbidden = (exercise.forbiddenKeywords as string[]) ?? [];
      const norm = query.toLowerCase();
      const missing = required.filter((k) => !norm.includes(k.toLowerCase()));
      const banned = forbidden.filter((k) => norm.includes(k.toLowerCase()));
      const correct = missing.length === 0 && banned.length === 0 && query.trim().length > 0;
      return {
        correct,
        meta: { datasetQuery: true, missing, banned },
      };
    }
    case "incident_step": {
      const steps = (answer as (string | number)[]) ?? [];
      const expected = (exercise.correctSteps as (string | number)[]) ?? [];
      const ok = steps.length === expected.length && steps.every((s, i) => s === expected[i]);
      return {
        correct: ok,
        meta: ok ? { ok: true } : { missing: ["step_mismatch"] },
      };
    }
    case "numeric": {
      const res = gradeNumericAnswer(answer, exercise as any);
      return {
        correct: res.correct,
        meta: {
          numeric: true,
          actual: res.actual,
          expected: res.expected,
          error: res.error,
          fieldResults: res.fieldResults,
        },
      };
    }
    case "circuit_lab": {
      // Client ok / simulationPassed / _serverVerified never affect the grade.
      return {
        correct: false,
        partial: 0,
        meta: { circuitLab: true, reason: "untrusted_client_result" },
      };
    }
    default:
      return { correct: false };
  }
}
