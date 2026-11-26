"use client";

import { createContext, useContext, useState } from "react";
import { exercisePrompt } from "@eduforge/shared";
import { useLocale } from "@/lib/locale-context";
import { formatExerciseSolution, getApplyableAnswer } from "@/lib/exercise-solution";
import { useAuth } from "@/lib/auth-context";

export type Exercise = {
  id: string;
  type: string;
  promptUk: string;
  promptEn?: string;
  [key: string]: unknown;
};

export const ExamModeCtx = createContext(false);

/** Reports wrong soft attempts to the session (SPEC 92: first-try / mistake notebook). */
export const WrongAttemptCtx = createContext<(() => void) | null>(null);

export const AssistanceCtx = createContext<{
  onHintUsed?: () => void;
  onSolutionRevealed?: () => void;
}>({});

/** Lesson id for server-side helpers (explain tutor feedback). */
export const LessonIdCtx = createContext<string | null>(null);

export function usePrompt(exercise: Exercise) {
  const { locale } = useLocale();
  return exercisePrompt(locale, exercise);
}

export function CodeBlock({ code }: { code: string; language?: string }) {
  if (!code) return null;
  return (
    <pre className="overflow-x-auto rounded-2xl border border-slate-700 bg-slate-950 p-4 font-mono text-[15px] leading-7 text-slate-50 shadow-card">
      <code>{code}</code>
    </pre>
  );
}

/**
 * Progressive hints (Tier C): level 1 nudge → level 2 fuller hint → level 3 near-answer.
 * Mentor talent: +1 max depth per rank (cap 4) and auto-opens at higher starting tier on fail.
 */
export function useExerciseHint(exercise: Exercise) {
  const { locale, t } = useLocale();
  const { character } = useAuth();
  const assistance = useContext(AssistanceCtx);
  const mentorRank = Math.min(
    3,
    Math.max(0, Number(character?.progression?.talents?.mentor) || 0),
  );
  /** Base depth 3; mentor adds +1 per rank up to 4 */
  const maxLevel = Math.min(4, 3 + Math.min(1, mentorRank));
  /** On fail, open at least this level (mentor rank 2+ starts deeper) */
  const autoOpenLevel = Math.min(maxLevel, 1 + Math.floor(mentorRank / 2));

  const [level, setLevel] = useState(0); // 0 = closed
  function changeLevel(next: number | ((current: number) => number)) {
    setLevel((current) => {
      const resolved = typeof next === "function" ? next(current) : next;
      if (resolved > current && resolved > 0) assistance.onHintUsed?.();
      return resolved;
    });
  }
  const base =
    locale === "en"
      ? String(exercise.hintEn || exercise.explanationEn || exercise.hintUk || exercise.explanationUk || "")
      : String(exercise.hintUk || exercise.explanationUk || exercise.hintEn || exercise.explanationEn || "");
  const has = Boolean(base.trim());

  const level1 = has
    ? locale === "en"
      ? "Think about the core concept in the prompt — one careful re-read often helps."
      : "Подумайте про ключову ідею в завданні — часто допомагає уважно перечитати."
    : "";
  const level2 = base;
  const level3 = has
    ? locale === "en"
      ? `${base}\n\nAlmost there: eliminate options that contradict the prompt wording.`
      : `${base}\n\nМайже: відкиньте варіанти, що суперечать формулюванню.`
    : "";
  const level4 = has
    ? locale === "en"
      ? `${base}\n\nMentor tip: focus on the exact keyword or operator the prompt asks for.`
      : `${base}\n\nМентор: зосередьтесь на ключовому слові/операторі з умови.`
    : "";

  const text =
    level === 1
      ? level1
      : level === 2
        ? level2
        : level === 3
          ? level3
          : level === 4
            ? level4
            : "";

  function setOpen(v: boolean | ((b: boolean) => boolean)) {
    const next = typeof v === "function" ? v(level > 0) : v;
    changeLevel(next ? Math.max(autoOpenLevel, level || autoOpenLevel) : 0);
  }

  return {
    has,
    open: level > 0,
    setOpen,
    level,
    text,
    t,
    panel: has ? (
      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="text-xs font-bold text-grape hover:underline"
            onClick={() => changeLevel((l) => (l > 0 ? 0 : autoOpenLevel))}
          >
            💡 {level > 0 ? t.lesson.hideHint : t.lesson.showHint}
            {level === 1
              ? ` · ${locale === "en" ? "L1: Principle" : "L1: Ключовий принцип"}`
              : level === 2
                ? ` · ${locale === "en" ? "L2: Clue" : "L2: Діагностика"}`
                : level === 3
                  ? ` · ${locale === "en" ? "L3: Partial Step" : "L3: Частковий крок"}`
                  : level > 3
                    ? ` · L${level}`
                    : ""}
            {mentorRank > 0 ? " 🎓" : ""}
          </button>
          {level > 0 && level < maxLevel && (
            <button
              type="button"
              className="text-xs font-bold text-sky hover:underline"
              onClick={() => changeLevel((l) => Math.min(maxLevel, l + 1))}
            >
              {locale === "en" ? "Deeper hint" : "Глибша підказка"} →
            </button>
          )}
          {mentorRank > 0 && level === 0 ? (
            <span className="text-[10px] font-bold text-ink-muted">
              {locale === "en" ? `Mentor L${mentorRank}` : `Ментор L${mentorRank}`}
            </span>
          ) : null}
        </div>
        {level > 0 ? (
          <p className="whitespace-pre-wrap rounded-xl bg-grape/10 px-3 py-2 text-sm font-bold text-ink">
            {text}
          </p>
        ) : null}
      </div>
    ) : null,
  };
}

export const SOFT_MAX_ATTEMPTS = 3;

export function useSoftAttempts(hintOpen: (v: boolean | ((b: boolean) => boolean)) => void) {
  const examMode = useContext(ExamModeCtx);
  const reportWrong = useContext(WrongAttemptCtx);
  const { character } = useAuth();
  const mentorRank = Math.min(
    3,
    Math.max(0, Number(character?.progression?.talents?.mentor) || 0),
  );
  /** Mentor grants extra soft attempts before skip (+1 per rank, cap +2). */
  const maxAttempts = SOFT_MAX_ATTEMPTS + Math.min(2, mentorRank);
  const [attempts, setAttempts] = useState(0);
  const [wrong, setWrong] = useState(false);
  const [detail, setDetail] = useState<string | null>(null);

  function registerFail(msg?: string | null) {
    reportWrong?.();
    setWrong(true);
    setDetail(msg ?? null);
    setAttempts((a) => {
      const n = a + 1;
      if (n >= 1 && !examMode) hintOpen(true);
      return n;
    });
  }

  function resetSoft() {
    setWrong(false);
    setDetail(null);
  }

  const canSkip = !examMode && attempts >= maxAttempts;

  return {
    attempts,
    wrong,
    detail,
    canSkip,
    max: maxAttempts,
    mentorRank,
    registerFail,
    resetSoft,
    markOk: () => {
      setWrong(false);
      setDetail(null);
    },
  };
}

export function SoftFeedback({
  wrong,
  detail,
  attempts,
  max,
  mentorRank,
}: {
  wrong: boolean;
  detail?: string | null;
  attempts?: number;
  max?: number;
  mentorRank?: number;
}) {
  const { t, locale } = useLocale();
  if (!wrong && !attempts) return null;
  return (
    <div className="space-y-1" role="status" aria-live="assertive">
      {wrong ? (
        <div className="rounded-xl border-2 border-red-200 bg-red-50 px-3 py-2 text-sm font-bold text-red-600 dark:border-red-900 dark:bg-red-950/40">
          {t.lesson.wrong} · {t.lesson.tryAgain}
          {detail ? (
            <p className="mt-1 text-xs font-semibold text-red-500/90">
              {t.lesson.missingParts}: {detail}
            </p>
          ) : null}
          {(mentorRank ?? 0) > 0 ? (
            <p className="mt-1 text-xs font-semibold text-grape">
              🎓{" "}
              {locale === "en"
                ? "Mentor: re-read the hint, then try a smaller change."
                : "Ментор: перечитайте підказку, змініть лише один крок."}
            </p>
          ) : null}
        </div>
      ) : null}
      {typeof attempts === "number" && attempts > 0 ? (
        <p className="text-xs font-bold text-ink-muted">
          {t.lesson.attempts}: {attempts}/{max ?? SOFT_MAX_ATTEMPTS}
          {attempts >= (max ?? SOFT_MAX_ATTEMPTS) ? ` · ${t.lesson.skipHint}` : ""}
          {(mentorRank ?? 0) > 0 ? " 🎓" : ""}
        </p>
      ) : null}
    </div>
  );
}

export function DrillFooter({
  canCheck,
  onCheck,
  soft,
  skipAnswer,
  onAnswer,
  tutorHref,
  exercise,
  onApplySolution,
}: {
  canCheck: boolean;
  onCheck: () => void;
  soft: ReturnType<typeof useSoftAttempts>;
  skipAnswer: unknown;
  onAnswer: (a: unknown) => void;
  tutorHref?: string | null;
  exercise?: Exercise;
  onApplySolution?: (answer: unknown) => void;
}) {
  const { t, locale } = useLocale();
  const assistance = useContext(AssistanceCtx);
  const [showSol, setShowSol] = useState(false);
  const solution =
    exercise && soft.canSkip
      ? formatExerciseSolution(exercise, locale === "en" ? "en" : "uk")
      : null;
  const applyable =
    exercise && soft.canSkip ? getApplyableAnswer(exercise) : null;

  return (
    <div className="space-y-2">
      <SoftFeedback
        wrong={soft.wrong}
        detail={soft.detail}
        attempts={soft.attempts}
        max={soft.max}
        mentorRank={soft.mentorRank}
      />
      <div className="lesson-check-bar flex flex-wrap gap-2">
        <button
          type="button"
          className="btn-primary min-h-11"
          disabled={!canCheck}
          onClick={onCheck}
        >
          {t.lesson.check}
        </button>
        {soft.canSkip ? (
          <button
            type="button"
            className="btn-secondary"
            onClick={() => onAnswer(skipAnswer)}
          >
            {t.lesson.skip} →
          </button>
        ) : null}
        {soft.canSkip && solution ? (
          <button
            type="button"
            className="btn-secondary"
            onClick={() =>
              setShowSol((open) => {
                if (!open) assistance.onSolutionRevealed?.();
                return !open;
              })
            }
          >
            {showSol ? t.lesson.hideSolution : t.lesson.showSolution}
          </button>
        ) : null}
        {tutorHref ? (
          <a
            href={tutorHref}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary !py-2 text-sm"
          >
            🤖 {t.lesson.askTutor}
          </a>
        ) : null}
      </div>
      {showSol && solution ? (
        <div className="rounded-xl border-2 border-brand/30 bg-brand-soft/40 px-3 py-2 text-sm space-y-2">
          <p className="text-xs font-black text-brand-dark">{t.lesson.solution}</p>
          <pre className="whitespace-pre-wrap font-mono text-xs font-bold text-ink">
            {solution}
          </pre>
          {applyable != null && onApplySolution ? (
            <button
              type="button"
              className="text-xs font-bold text-sky hover:underline"
              onClick={() => {
                onApplySolution(applyable);
                setShowSol(false);
              }}
            >
              ✓ {t.lesson.applySolution}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export function tutorHelpHref(exercise: Exercise, extra?: string) {
  const prompt = String(exercise.promptEn || exercise.promptUk || "");
  const code =
    typeof exercise.code === "string" ? String(exercise.code).slice(0, 400) : "";
  const parts = [
    `Help me with this programming exercise:`,
    prompt,
    code ? `Code:\n${code}` : "",
    extra ? `My attempt:\n${extra.slice(0, 500)}` : "",
    `Give a short hint, not the full answer.`,
  ].filter(Boolean);
  const q = encodeURIComponent(parts.join("\n\n"));
  return `/tutor?course=programming&q=${q}`;
}
