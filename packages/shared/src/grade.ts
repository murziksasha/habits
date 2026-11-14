/**
 * Canonical exercise grading — used by API and client soft-grade.
 * Keep rules identical to avoid client/server drift.
 */

import { gradeExplanation, type ExplainKeyIdea } from "./explain.js";
import { jsStaticPartialScore, runJsStaticAsserts, type JsStaticAssert } from "./js-static.js";

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
      const pairs = (exercise.pairs as { left: string; right: string }[]) ?? [];
      const ans = (answer as { left: string; right: string }[]) ?? [];
      if (ans.length !== pairs.length) {
        return { correct: false, meta: { missing: [`pairs:${ans.length}/${pairs.length}`] } };
      }
      const set = new Set(pairs.map((p) => `${p.left}::${p.right}`));
      const wrong = ans.filter((p) => !set.has(`${p.left}::${p.right}`)).length;
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
      const meta = answer as { wpm?: number; accuracy?: number };
      const wpm = Number(meta?.wpm ?? 0);
      const accuracy = Number(meta?.accuracy ?? 0);
      return { correct: accuracy >= 0.85 && wpm >= 10, meta: { wpm, accuracy } };
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
      const a = answer as { solved?: boolean; sans?: string[] };
      if (a?.solved) return { correct: true };
      const solution = (exercise.solutionSans as string[]) ?? [];
      const sans = a?.sans ?? [];
      const normSan = (s: string) => s.replace(/[+#]/g, "");
      return {
        correct:
          sans.length >= solution.length &&
          solution.every((s, i) => normSan(sans[i] ?? "") === normSan(s)),
      };
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
    default:
      return { correct: false };
  }
}
