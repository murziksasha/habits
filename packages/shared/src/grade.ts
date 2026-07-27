/**
 * Canonical exercise grading — used by API and client soft-grade.
 * Keep rules identical to avoid client/server drift.
 */

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
  kind?: string;
  selector?: string;
  minCount?: number;
};

export function normText(s: string) {
  return s.trim().toLowerCase().replace(/[.…!?]/g, "").replace(/\s+/g, " ");
}

/** Light normalize for code: trim + collapse internal whitespace runs */
export function normCode(s: string, caseSensitive: boolean) {
  const t = s.trim().replace(/\s+/g, " ");
  return caseSensitive ? t : t.toLowerCase();
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
        if (!content.includes(n)) missing.push(`html:${needle}`);
      }
    }

    if (ch.fileId && ch.contains?.length) {
      let content = map.get(ch.fileId) ?? "";
      if (!caseSensitive) content = content.toLowerCase();
      for (const needle of ch.contains) {
        const n = caseSensitive ? needle : needle.toLowerCase();
        if (!content.includes(n)) missing.push(`${ch.fileId}:${needle}`);
      }
    }
  }

  return { ok: missing.length === 0, missing };
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
        correct: accepted.some((a) => normCode(a, cs) === normCode(text, cs)),
      };
    }
    case "code_fill": {
      const text = String(answer ?? "");
      const accepted = (exercise.accepted as string[]) ?? [];
      const cs = exercise.caseSensitive !== false;
      const exactOk = accepted.some(
        (a) => normCode(String(a), cs) === normCode(text, cs),
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
      // Server/client may pass { ok: boolean, testsPassed?: number, testsTotal?: number }
      const a = answer as {
        ok?: boolean;
        testsPassed?: number;
        testsTotal?: number;
      };
      if (a?.ok) return { correct: true, partial: 1, meta: { judge: true } };
      const total = Number(a?.testsTotal ?? 0);
      const passed = Number(a?.testsPassed ?? 0);
      if (total > 0) {
        const ratio = passed / total;
        return {
          correct: ratio >= 1,
          partial: ratio,
          meta: { judge: true, passed, total },
        };
      }
      return { correct: false, partial: 0, meta: { judge: true } };
    }
    default:
      return { correct: false };
  }
}
