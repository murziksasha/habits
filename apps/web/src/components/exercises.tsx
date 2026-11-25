"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ChessBoardFrame } from "@/components/chess-board-frame";
import { DifficultyStars } from "@/components/difficulty-stars";
import {
  Chess,
  checkEndgameGoal,
  evaluatePuzzleMove,
  replaySans,
  type EndgameGoal,
  type PuzzleSpec,
  type Square,
} from "@eduforge/chess-core";
import { requestBotMove } from "@/lib/chess-bot";
import {
  countWords,
  exercisePrompt,
  gradeCodeJudgeText,
  gradeExplanation,
  gradeNumericAnswer,
  localizeExerciseOptions,
  localizeMatchPairs,
  getUI,
  chessThemeLabel,
  visibleChessThemes,
  type ExplainKeyIdea,
  type CircuitDocument,
  type CircuitAnalysis,
  type CircuitCriterion,
} from "@eduforge/shared";
import clsx from "clsx";
import { useLocale } from "@/lib/locale-context";
import { SpeakButton } from "@/components/speak-button";
import { MonacoCodeEditor } from "@/components/monaco-editor";
import {
  buildProjectPreviewSrcDoc,
  canPreviewProject,
} from "@/lib/project-preview";
import {
  softGradeCodeFill,
  softGradeCodeOrder,
  softGradeCodeProject,
  softGradeCodeRunSource,
  softGradeMcq,
} from "@/lib/client-grade";
import { runCppTests } from "@/lib/cpp-runner";
import {
  formatExerciseSolution,
  getApplyableAnswer,
} from "@/lib/exercise-solution";
import { hasOpenDialog, isTypingTarget, optionIndexFromKey } from "@/lib/answer-keys";
import { stableOptionOrder } from "@/lib/option-order";
import { selectedMatchLabel } from "@/lib/match-labels";
import { orderLabel } from "@/lib/order-labels";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { FormattedFormulaText, KaTeXMath } from "@/components/circuit/katex-math";
import { CircuitEditor } from "@/components/circuit/circuit-editor";
import type { RunSimOutput } from "@eduforge/circuit-engine";

export type Exercise = {
  id: string;
  type: string;
  promptUk: string;
  promptEn?: string;
  [key: string]: unknown;
};

const ExamModeCtx = createContext(false);
/** Reports wrong soft attempts to the session (SPEC 92: first-try / mistake notebook). */
const WrongAttemptCtx = createContext<(() => void) | null>(null);
const AssistanceCtx = createContext<{
  onHintUsed?: () => void;
  onSolutionRevealed?: () => void;
}>({});
/** Lesson id for server-side helpers (explain tutor feedback). */
const LessonIdCtx = createContext<string | null>(null);

function usePrompt(exercise: Exercise) {
  const { locale } = useLocale();
  return exercisePrompt(locale, exercise);
}

export function ExercisePlayer({
  exercise,
  onAnswer,
  examMode = false,
  onWrongAttempt,
  onHintUsed,
  onSolutionRevealed,
  lessonId,
}: {
  exercise: Exercise;
  onAnswer: (answer: unknown) => void;
  /** Unit exams: no skip / solution reveal */
  examMode?: boolean;
  /** Called on each wrong soft attempt (client check) */
  onWrongAttempt?: () => void;
  /** Called when the learner opens or deepens a hint. */
  onHintUsed?: () => void;
  /** Called when the learner opens the worked solution. */
  onSolutionRevealed?: () => void;
  /** Lesson id (enables tutor feedback on explain exercises) */
  lessonId?: string;
}) {
  const { t } = useLocale();
  const body = (() => {
    switch (exercise.type) {
      case "mcq":
      case "logic_puzzle":
      case "code_read":
        return <McqExercise exercise={exercise} onAnswer={onAnswer} />;
      case "code_output":
        return exercise.options
          ? <McqExercise exercise={exercise} onAnswer={onAnswer} />
          : <CodeFillExercise exercise={exercise} onAnswer={onAnswer} />;
      case "code_fill":
        return <CodeFillExercise exercise={exercise} onAnswer={onAnswer} />;
      case "code_order":
        return <OrderWordsExercise exercise={exercise} onAnswer={onAnswer} />;
      case "code_project":
        return <CodeProjectExercise exercise={exercise} onAnswer={onAnswer} />;
      case "code_run":
        return <CodeRunExercise exercise={exercise} onAnswer={onAnswer} />;
      case "translate":
      case "fill_blank":
        return <TextExercise exercise={exercise} onAnswer={onAnswer} />;
      case "match":
        return <MatchExercise exercise={exercise} onAnswer={onAnswer} />;
      case "order_words":
        return <OrderWordsExercise exercise={exercise} onAnswer={onAnswer} />;
      case "typing":
        return <TypingExercise exercise={exercise} onAnswer={onAnswer} />;
      case "rsvp":
        return <RsvpExercise exercise={exercise} onAnswer={onAnswer} />;
      case "comprehension":
        return <ComprehensionExercise exercise={exercise} onAnswer={onAnswer} />;
      case "chess_puzzle":
        return <ChessPuzzleExercise exercise={exercise} onAnswer={onAnswer} />;
      case "chess_lesson":
        return <ChessLessonExercise exercise={exercise} onAnswer={onAnswer} />;
      case "chess_plan":
        return <ChessPlanExercise exercise={exercise} onAnswer={onAnswer} />;
      case "chess_endgame_drill":
        return <ChessEndgameDrillExercise exercise={exercise} onAnswer={onAnswer} />;
      case "video":
        return <VideoExercise exercise={exercise} onAnswer={onAnswer} />;
      case "code_judge":
        return <CodeJudgeExercise exercise={exercise} onAnswer={onAnswer} />;
      case "concept":
        return <ConceptExercise exercise={exercise} onAnswer={onAnswer} />;
      case "explain":
        return <ExplainExercise exercise={exercise} onAnswer={onAnswer} />;
      case "composite_artifact":
        return <CodeProjectExercise exercise={exercise} onAnswer={onAnswer} />;
      case "dataset_query":
        return <CodeFillExercise exercise={exercise} onAnswer={onAnswer} />;
      case "incident_step":
        return <OrderWordsExercise exercise={exercise} onAnswer={onAnswer} />;
      case "numeric":
        return <NumericExercise exercise={exercise} onAnswer={onAnswer} />;
      case "circuit_lab":
        return <CircuitLabExerciseComponent exercise={exercise} onAnswer={onAnswer} />;
      default:
        return <p>{t.lesson.unknownExerciseType}: {exercise.type}</p>;
    }
  })();

  return (
    <ExamModeCtx.Provider value={examMode}>
      <WrongAttemptCtx.Provider value={onWrongAttempt ?? null}>
        <AssistanceCtx.Provider value={{ onHintUsed, onSolutionRevealed }}>
          <LessonIdCtx.Provider value={lessonId ?? null}>{body}</LessonIdCtx.Provider>
        </AssistanceCtx.Provider>
      </WrongAttemptCtx.Provider>
    </ExamModeCtx.Provider>
  );
}

function CodeBlock({ code }: { code: string; language?: string }) {
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
function useExerciseHint(exercise: Exercise) {
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

const SOFT_MAX_ATTEMPTS = 3;

function useSoftAttempts(hintOpen: (v: boolean | ((b: boolean) => boolean)) => void) {
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

function SoftFeedback({
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

function DrillFooter({
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

function tutorHelpHref(exercise: Exercise, extra?: string) {
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

function McqExercise({
  exercise,
  onAnswer,
}: {
  exercise: Exercise;
  onAnswer: (a: unknown) => void;
}) {
  const { locale } = useLocale();
  const prompt = usePrompt(exercise);
  const options = localizeExerciseOptions(locale, exercise as { options?: string[]; optionsEn?: string[] });
  const order = useMemo(
    () => stableOptionOrder(String(exercise.id), options.length),
    [exercise.id, options.length],
  );
  const [selected, setSelected] = useState<number | null>(null);
  const hint = useExerciseHint(exercise);
  const soft = useSoftAttempts(hint.setOpen);
  const speakSrc = typeof exercise.source === "string" ? String(exercise.source) : prompt;
  const code = typeof exercise.code === "string" ? String(exercise.code) : "";
  const correctIndex =
    typeof exercise.correctIndex === "number" ? exercise.correctIndex : null;
  const isCodeMcq =
    exercise.type === "code_read" ||
    exercise.type === "code_output" ||
    Boolean(code);

  function check() {
    if (selected === null) return;
    if (correctIndex != null && !softGradeMcq(selected, correctIndex)) {
      soft.registerFail();
      return;
    }
    soft.markOk();
    onAnswer(selected);
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (isTypingTarget(e.target)) return;
      if (hasOpenDialog()) return;

      const optIdx = optionIndexFromKey(e);
      if (optIdx !== null) {
        e.preventDefault();
        const original = order[optIdx];
        if (original !== undefined) {
          setSelected(original);
          soft.resetSoft();
        }
        return;
      }

      const n = order.length;
      if (!n) return;

      const target = e.target as HTMLElement | null;
      const isButtonOrLink = Boolean(target?.closest?.("button, a"));
      if (isButtonOrLink) return;

      const currentDisplay = selected === null ? -1 : order.indexOf(selected);
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        const next = currentDisplay < 0 ? 0 : Math.min(n - 1, currentDisplay + 1);
        const original = order[next];
        if (original !== undefined) setSelected(original);
        return;
      }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        const next = currentDisplay < 0 ? 0 : Math.max(0, currentDisplay - 1);
        const original = order[next];
        if (original !== undefined) setSelected(original);
        return;
      }
      if (e.key === "Enter" && selected !== null) {
        e.preventDefault();
        check();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [order, selected, correctIndex, soft, onAnswer]);

  const keysHint =
    locale === "en"
      ? "Keys: 1–9 (top row and numpad) select · arrows move · Enter check"
      : "Клавіші: 1–9 (верхній ряд і numpad) вибір · стрілки · Enter перевірка";

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black" id={`ex-prompt-${exercise.id}`}>
        {prompt}
      </h2>
      <p className="text-xs font-bold text-ink-muted">{keysHint}</p>
      {code ? (
        <CodeBlock code={code} language={String(exercise.language ?? "")} />
      ) : (
        <SpeakButton text={speakSrc} lang="en-US" showPractice />
      )}
      {hint.panel}
      <div
        className="grid gap-2"
        role="radiogroup"
        aria-labelledby={`ex-prompt-${exercise.id}`}
      >
        {order.map((original, displayIndex) => (
          <button
            key={original}
            type="button"
            role="radio"
            aria-checked={selected === original}
            className={clsx(
              "rounded-2xl border-2 px-4 py-3 text-left font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky",
              selected === original ? "border-sky bg-sky/10" : "border-slate-200 hover:bg-slate-50",
            )}
            onClick={() => {
              setSelected(original);
              soft.resetSoft();
            }}
          >
            {displayIndex < 9 && (
              <span className="mr-2 text-xs text-ink-muted">{displayIndex + 1}.</span>
            )}
            {options[original]}
          </button>
        ))}
      </div>
      <DrillFooter
        canCheck={selected !== null}
        onCheck={check}
        soft={soft}
        skipAnswer={selected}
        onAnswer={onAnswer}
        tutorHref={isCodeMcq ? tutorHelpHref(exercise) : null}
        exercise={exercise}
        onApplySolution={(a) => {
          if (typeof a === "number") setSelected(a);
        }}
      />
    </div>
  );
}

function TextExercise({
  exercise,
  onAnswer,
}: {
  exercise: Exercise;
  onAnswer: (a: unknown) => void;
}) {
  const { locale, t } = useLocale();
  const prompt = usePrompt(exercise);
  const [value, setValue] = useState("");
  const source =
    typeof exercise.source === "string"
      ? String(exercise.source)
      : typeof exercise.sentence === "string"
        ? String(exercise.sentence)
        : prompt;
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black" id={`ex-prompt-${exercise.id}`}>
        {prompt}
      </h2>
      <p className="text-xs font-bold text-ink-muted">
        {locale === "en" ? "Press Enter to check" : "Enter — перевірити"}
      </p>
      <SpeakButton text={source} lang="en-US" showPractice />
      {exercise.source ? (
        <p className="rounded-2xl bg-slate-100 px-4 py-3 font-bold dark:bg-slate-900">
          {String(exercise.source)}
        </p>
      ) : null}
      {exercise.sentence ? (
        <p className="rounded-2xl bg-slate-100 px-4 py-3 font-bold">{String(exercise.sentence)}</p>
      ) : null}
      <input
        className="input"
        value={value}
        aria-labelledby={`ex-prompt-${exercise.id}`}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && value.trim()) {
            e.preventDefault();
            onAnswer(value);
          }
        }}
      />
      <button
        type="button"
        className="btn-primary"
        disabled={!value.trim()}
        onClick={() => onAnswer(value)}
      >
        {t.lesson.check}
      </button>
    </div>
  );
}

function MatchExercise({
  exercise,
  onAnswer,
}: {
  exercise: Exercise;
  onAnswer: (a: unknown) => void;
}) {
  const { locale, t } = useLocale();
  const prompt = usePrompt(exercise);
  const pairs = useMemo(
    () =>
      localizeMatchPairs(locale, {
        pairs: exercise.pairs as { left: string; right: string }[] | undefined,
        pairsEn: (exercise as { pairsEn?: { left: string; right: string }[] }).pairsEn,
      }),
    [exercise, locale],
  );
  const rights = useMemo(
    () => stableOptionOrder(`${String(exercise.id)}:match`, pairs.length).map((index) => pairs[index]!),
    [exercise.id, pairs],
  );
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matched, setMatched] = useState<{ left: string; right: string }[]>([]);

  const freeLefts = pairs.filter((p) => !matched.some((m) => m.left === p.left));
  const freeRights = rights.filter((r) => !matched.some((m) => m.right === r.right));

  function pickRight(right: string) {
    if (!selectedLeft) return;
    if (matched.some((m) => m.right === right || m.left === selectedLeft)) return;
    setMatched((m) => [...m, { left: selectedLeft, right }]);
    setSelectedLeft(null);
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (isTypingTarget(e.target)) return;
      if (hasOpenDialog()) return;

      const optIdx = optionIndexFromKey(e);
      if (optIdx !== null) {
        e.preventDefault();
        if (!selectedLeft) {
          const left = freeLefts[optIdx]?.left;
          if (left) setSelectedLeft(left);
        } else {
          const right = freeRights[optIdx]?.right;
          if (right) pickRight(right);
        }
        return;
      }

      if (e.key === "Escape") {
        if (selectedLeft) {
          e.preventDefault();
          setSelectedLeft(null);
        }
        return;
      }

      if (e.key === "Backspace" && matched.length) {
        e.preventDefault();
        setMatched((m) => m.slice(0, -1));
        setSelectedLeft(null);
        return;
      }

      if (e.key === "Enter" && matched.length === pairs.length) {
        const target = e.target as HTMLElement | null;
        const isButtonOrLink = Boolean(target?.closest?.("button, a"));
        if (!isButtonOrLink) {
          e.preventDefault();
          onAnswer(matched);
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [freeLefts, freeRights, matched, pairs.length, selectedLeft, onAnswer]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black" id={`ex-prompt-${exercise.id}`}>
        {prompt}
      </h2>
      <p className="text-xs font-bold text-ink-muted">
        {locale === "en"
          ? "Keys: 1–9 left then right · Esc clear · Backspace undo · Enter check"
          : "Клавіші: 1–9 ліво/право · Esc скинути · Backspace · Enter"}
      </p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2" role="list" aria-label="left">
          {pairs.map((p) => {
            const freeIdx = freeLefts.findIndex((x) => x.left === p.left);
            return (
              <button
                key={p.left}
                type="button"
                disabled={matched.some((m) => m.left === p.left)}
                className={clsx(
                  "w-full rounded-2xl border-2 px-3 py-2 font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky",
                  selectedLeft === p.left ? "border-sky bg-sky/10" : "border-slate-200",
                )}
                onClick={() => setSelectedLeft(p.left)}
              >
                {freeIdx >= 0 && (
                  <span className="mr-1 text-[10px] text-ink-muted">{freeIdx + 1}.</span>
                )}
                {p.labelLeft}
              </button>
            );
          })}
        </div>
        <div className="space-y-2" role="list" aria-label="right">
          {rights.map((r) => {
            const freeIdx = freeRights.findIndex((x) => x.right === r.right);
            return (
              <button
                key={r.right}
                type="button"
                disabled={matched.some((m) => m.right === r.right)}
                className="w-full rounded-2xl border-2 border-slate-200 px-3 py-2 font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky"
                onClick={() => pickRight(r.right)}
              >
                {freeIdx >= 0 && (
                  <span className="mr-1 text-[10px] text-ink-muted">{freeIdx + 1}.</span>
                )}
                {r.labelRight}
              </button>
            );
          })}
        </div>
      </div>
      {matched.length > 0 && (
        <p className="text-xs font-bold text-ink-muted">
          {matched
            .map((m) => {
              return selectedMatchLabel(pairs, m);
            })
            .join(" · ")}
        </p>
      )}
      {matched.length > 0 && (
        <button
          type="button"
          className="btn-secondary"
          onClick={() => {
            setMatched((current) => current.slice(0, -1));
            setSelectedLeft(null);
          }}
        >
          {t.lesson.undoLastPair}
        </button>
      )}
      <button
        type="button"
        className="btn-primary"
        disabled={matched.length !== pairs.length}
        onClick={() => onAnswer(matched)}
      >
        {t.lesson.check}
      </button>
    </div>
  );
}

function CodeRunExercise({
  exercise,
  onAnswer,
}: {
  exercise: Exercise;
  onAnswer: (a: unknown) => void;
}) {
  const prompt = usePrompt(exercise);
  const { locale } = useLocale();
  const starter = String(exercise.starter ?? "");
  const [source, setSource] = useState(starter);
  const [busy, setBusy] = useState(false);
  const [runMsg, setRunMsg] = useState("");
  const [testsOk, setTestsOk] = useState(false);
  const [mobileTab, setMobileTab] = useState<"task" | "editor" | "output">("editor");
  const hint = useExerciseHint(exercise);
  const soft = useSoftAttempts(hint.setOpen);
  const tests =
    (exercise.tests as { stdin?: string; stdout: string }[]) ?? [];
  const required = (exercise.requiredSource as string[]) ?? [];
  const forbidden = (exercise.forbiddenSource as string[]) ?? [
    "system(",
    "exec(",
  ];
  const lang = String(exercise.language ?? "cpp");
  const cs = exercise.caseSensitive !== false;

  async function runTests() {
    setBusy(true);
    setRunMsg(locale === "en" ? "Running…" : "Запуск…");
    setTestsOk(false);
    setMobileTab("output");
    try {
      const srcCheck = softGradeCodeRunSource(
        source,
        required,
        forbidden,
        cs,
        lang,
      );
      if (!srcCheck.ok) {
        setRunMsg(
          locale === "en"
            ? `Source check failed: missing ${srcCheck.missing.join(", ") || "—"} banned ${srcCheck.banned.join(", ") || "—"}`
            : `Перевірка коду: бракує ${srcCheck.missing.join(", ") || "—"} заборонено ${srcCheck.banned.join(", ") || "—"}`,
        );
        soft.registerFail();
        return;
      }
      if (lang === "cpp" && tests.length) {
        const r = await runCppTests(
          source,
          tests,
          Number(exercise.timeLimitMs ?? 3000),
        );
        if (!r.pass) {
          setRunMsg(
            locale === "en"
              ? `Tests failed: ${r.firstError ?? "stdout mismatch"}`
              : `Тести не пройшли: ${r.firstError ?? "stdout"}`,
          );
          soft.registerFail();
          return;
        }
        setTestsOk(true);
        setRunMsg(
          locale === "en"
            ? `All ${tests.length} test(s) passed`
            : `Усі ${tests.length} тест(и) пройдено`,
        );
      } else {
        setTestsOk(true);
        setRunMsg(locale === "en" ? "Source checks OK" : "Перевірки коду OK");
      }
    } finally {
      setBusy(false);
    }
  }

  function check() {
    if (!testsOk) {
      soft.registerFail();
      setRunMsg(
        locale === "en"
          ? "Run tests successfully before submit"
          : "Спочатку успішно запусти тести",
      );
      setMobileTab("output");
      return;
    }
    const srcCheck = softGradeCodeRunSource(
      source,
      required,
      forbidden,
      cs,
      lang,
    );
    if (!srcCheck.ok) {
      soft.registerFail();
      setMobileTab("output");
      return;
    }
    soft.markOk();
    onAnswer({ source });
  }

  return (
    <div className="space-y-4">
      {/* Mobile Tab Switcher (Task / Code / Output) */}
      <div className="flex sm:hidden border-b border-slate-200 dark:border-slate-800 mb-2 gap-1" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={mobileTab === "task"}
          className={clsx(
            "flex-1 py-1.5 text-xs font-bold border-b-2 text-center transition",
            mobileTab === "task"
              ? "border-brand text-brand-dark dark:text-brand-light"
              : "border-transparent text-ink-muted",
          )}
          onClick={() => setMobileTab("task")}
        >
          📋 {locale === "en" ? "Task" : "Умова"}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mobileTab === "editor"}
          className={clsx(
            "flex-1 py-1.5 text-xs font-bold border-b-2 text-center transition",
            mobileTab === "editor"
              ? "border-brand text-brand-dark dark:text-brand-light"
              : "border-transparent text-ink-muted",
          )}
          onClick={() => setMobileTab("editor")}
        >
          💻 {locale === "en" ? "Code" : "Код"}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mobileTab === "output"}
          className={clsx(
            "flex-1 py-1.5 text-xs font-bold border-b-2 text-center transition",
            mobileTab === "output"
              ? "border-brand text-brand-dark dark:text-brand-light"
              : "border-transparent text-ink-muted",
          )}
          onClick={() => setMobileTab("output")}
        >
          ▶️ {locale === "en" ? "Output" : "Результат"}
        </button>
      </div>

      <div className={clsx("space-y-3", mobileTab !== "task" && "hidden sm:block")}>
        <h2 className="text-xl font-black">{prompt}</h2>
        {hint.panel}
        <p className="text-xs font-bold text-ink-muted">
          {locale === "en"
            ? "C++ lab — Run tests (client), then Check"
            : "C++ lab — Запусти тести (у браузері), потім Перевірити"}
        </p>
      </div>

      <div className={clsx("space-y-2", mobileTab !== "editor" && "hidden sm:block")}>
        <MonacoCodeEditor
          value={source}
          onChange={(v) => {
            setSource(v);
            setTestsOk(false);
            soft.resetSoft();
          }}
          language={lang === "cpp" ? "cpp" : lang}
          height="320px"
        />
      </div>

      <div className={clsx("space-y-2", mobileTab !== "output" && "hidden sm:block")}>
        {runMsg ? (
          <pre
            className={clsx(
              "rounded-xl border-2 p-3 text-xs font-mono whitespace-pre-wrap",
              testsOk
                ? "border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-700 dark:bg-emerald-950 dark:text-emerald-100"
                : "border-amber-300 bg-amber-50 text-amber-950 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-100",
            )}
          >
            {runMsg}
          </pre>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2 pt-1">
        <button
          type="button"
          className="btn-secondary"
          disabled={busy}
          onClick={() => void runTests()}
        >
          {busy
            ? locale === "en"
              ? "Running…"
              : "…"
            : locale === "en"
              ? "▶ Run tests"
              : "▶ Запустити тести"}
        </button>
      </div>
      <DrillFooter
        canCheck={testsOk && Boolean(source.trim())}
        onCheck={check}
        soft={soft}
        skipAnswer={{ source }}
        onAnswer={onAnswer}
        tutorHref={tutorHelpHref(exercise, source)}
        exercise={exercise}
        onApplySolution={(a) => {
          if (typeof a === "string") setSource(a);
          else if (a && typeof a === "object" && "source" in (a as object)) {
            setSource(String((a as { source: string }).source));
          }
        }}
      />
    </div>
  );
}

function CodeFillExercise({
  exercise,
  onAnswer,
}: {
  exercise: Exercise;
  onAnswer: (a: unknown) => void;
}) {
  const { locale } = useLocale();
  const prompt = usePrompt(exercise);
  const code = String(exercise.code ?? "");
  const [value, setValue] = useState("");
  const hint = useExerciseHint(exercise);
  const soft = useSoftAttempts(hint.setOpen);
  const accepted = (exercise.accepted as string[]) ?? [];
  const cs = exercise.caseSensitive !== false;

  function check() {
    if (!value.trim()) return;
    if (accepted.length && !softGradeCodeFill(value, accepted, cs)) {
      soft.registerFail();
      return;
    }
    soft.markOk();
    onAnswer(value);
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black">{prompt}</h2>
      <CodeBlock code={code} language={String(exercise.language ?? "")} />
      {hint.panel}
      <label htmlFor={`code-fill-${exercise.id}`} className="block text-xs font-bold text-ink-muted">
        {locale === "en" ? "Your answer (fill ___)" : "Ваша відповідь (заповніть ___)"}
      </label>
      <input
        id={`code-fill-${exercise.id}`}
        type="text"
        className="input font-mono text-base font-bold"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          soft.resetSoft();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && value.trim()) {
            e.preventDefault();
            check();
          }
        }}
        placeholder={locale === "en" ? "Type the missing code…" : "Введіть код для ___…"}
        autoFocus
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />
      <DrillFooter
        canCheck={Boolean(value.trim())}
        onCheck={check}
        soft={soft}
        skipAnswer={value || "—"}
        onAnswer={onAnswer}
        tutorHref={tutorHelpHref(exercise, value)}
        exercise={exercise}
        onApplySolution={(a) => {
          if (typeof a === "string") setValue(a);
        }}
      />
    </div>
  );
}

type ProjectFile = {
  id: string;
  name: string;
  language: string;
  starter: string;
};

function projectFileLanguage(lang?: string, name?: string): string {
  if (name?.endsWith(".md") || lang === "markdown") return "Markdown";
  if (name?.endsWith(".sql") || lang === "sql") return "SQL";
  if (name?.endsWith(".html") || lang === "html") return "HTML";
  if (name?.endsWith(".css") || lang === "css") return "CSS";
  if (name?.endsWith(".ts") || lang === "typescript" || lang === "ts") return "TypeScript";
  if (name?.endsWith(".js") || lang === "javascript" || lang === "js") return "JavaScript";
  if (name?.endsWith(".json") || lang === "json") return "JSON";
  if (lang) return lang.toUpperCase();
  return "";
}

function CodeProjectExercise({
  exercise,
  onAnswer,
}: {
  exercise: Exercise;
  onAnswer: (a: unknown) => void;
}) {
  const prompt = usePrompt(exercise);
  const { locale } = useLocale();
  const files = (exercise.files as ProjectFile[]) ?? [];
  const [active, setActive] = useState(files[0]?.id ?? "");
  const [contents, setContents] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    for (const f of files) init[f.id] = f.starter ?? "";
    return init;
  });
  const [showPreview, setShowPreview] = useState(true);
  const [previewKey, setPreviewKey] = useState(0);
  const hint = useExerciseHint(exercise);
  const soft = useSoftAttempts(hint.setOpen);
  const checks =
    (exercise.checks as { fileId: string; contains: string[] }[]) ?? [];
  const cs = exercise.caseSensitive !== false;

  const current = files.find((f) => f.id === active) ?? files[0];
  const previewable = canPreviewProject(files, contents);
  const srcDoc = useMemo(
    () => (previewable ? buildProjectPreviewSrcDoc(files, contents) : ""),
    [files, contents, previewable],
  );

  // Debounce live preview reloads so typing is smooth
  useEffect(() => {
    if (!showPreview || !previewable) return;
    const t = setTimeout(() => setPreviewKey((k) => k + 1), 400);
    return () => clearTimeout(t);
  }, [srcDoc, showPreview, previewable]);

  function check() {
    if (!files.length) return;
    if (checks.length) {
      const r = softGradeCodeProject(contents, checks, cs);
      if (!r.ok) {
        soft.registerFail(r.missing.slice(0, 4).join("; "));
        return;
      }
    }
    soft.markOk();
    onAnswer({ files: contents });
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black">{prompt}</h2>
      <p className="text-xs font-bold text-ink-muted">
        Mini-project · {files.length} files ·{" "}
        {locale === "en" ? "edit tabs, preview, then check" : "редагуй вкладки, preview, потім check"}
      </p>
      {hint.panel}
      <div className="flex flex-wrap gap-2">
        {files.map((f) => (
          <button
            key={f.id}
            type="button"
            className={clsx(
              "rounded-xl border-2 px-3 py-1.5 text-xs font-bold font-mono",
              active === f.id
                ? "border-sky bg-sky/10"
                : "border-slate-200 dark:border-slate-700",
            )}
            onClick={() => setActive(f.id)}
          >
            {f.name}
          </button>
        ))}
        {previewable ? (
          <button
            type="button"
            className={clsx(
              "rounded-xl border-2 px-3 py-1.5 text-xs font-bold",
              showPreview
                ? "border-grape bg-grape/10"
                : "border-slate-200 dark:border-slate-700",
            )}
            onClick={() => setShowPreview((v) => !v)}
          >
            👁 Preview
          </button>
        ) : null}
      </div>
      <div
        className={clsx(
          "grid gap-3",
          showPreview && previewable && "lg:grid-cols-2",
        )}
      >
        <div className="min-w-0 w-full">
          <div className="flex items-center justify-between rounded-t-2xl border-2 border-b-0 border-slate-200 bg-slate-100/90 px-3 py-1.5 text-xs font-mono font-bold dark:border-slate-700 dark:bg-slate-800/90">
            <span className="text-ink dark:text-slate-100">{current?.name}</span>
            <span className="text-[11px] font-semibold text-ink-muted">
              {projectFileLanguage(current?.language, current?.name)}
            </span>
          </div>
          {current ? (
            <div className="[&>div]:rounded-t-none [&>div]:border-t-0">
              <MonacoCodeEditor
                key={current.id}
                value={contents[current.id] ?? ""}
                onChange={(v) => {
                  setContents((c) => ({ ...c, [current.id]: v }));
                  soft.resetSoft();
                }}
                language={current.language || "javascript"}
                height="360px"
                fileName={current.name}
              />
            </div>
          ) : null}
        </div>
        {showPreview && previewable ? (
          <div className="overflow-hidden rounded-2xl border-2 border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
            <p className="border-b border-slate-100 px-3 py-1.5 text-[10px] font-bold text-ink-muted dark:border-slate-800">
              Live preview (sandboxed)
            </p>
            <iframe
              key={previewKey}
              title="project-preview"
              sandbox="allow-scripts"
              className="h-[360px] w-full bg-white"
              srcDoc={srcDoc}
            />
          </div>
        ) : null}
      </div>
      <DrillFooter
        canCheck={Boolean(files.length)}
        onCheck={check}
        soft={soft}
        skipAnswer={{ files: contents }}
        onAnswer={onAnswer}
        tutorHref={tutorHelpHref(
          exercise,
          Object.entries(contents)
            .map(([k, v]) => `// ${k}\n${v}`)
            .join("\n\n")
            .slice(0, 800),
        )}
        exercise={exercise}
      />
    </div>
  );
}

function OrderWordsExercise({
  exercise,
  onAnswer,
}: {
  exercise: Exercise;
  onAnswer: (a: unknown) => void;
}) {
  const words = useMemo(() => {
    const raw =
      (exercise.lines as string[] | undefined) ??
      (exercise.words as string[] | undefined) ??
      [];
    return stableOptionOrder(`${String(exercise.id)}:order`, raw.length).map((index) => raw[index]!);
  }, [exercise.id, exercise.lines, exercise.words]);
  const [pool, setPool] = useState(words);
  const [built, setBuilt] = useState<string[]>([]);
  const isCode = exercise.type === "code_order" || Boolean(exercise.language);
  const prompt = usePrompt(exercise);
  const { locale } = useLocale();
  const canonicalLines = exercise.lines as string[] | undefined;
  const ukrainianLines = exercise.linesUk as string[] | undefined;
  const hint = useExerciseHint(exercise);
  const soft = useSoftAttempts(hint.setOpen);
  const correct =
    (exercise.correct as string[] | undefined) ??
    (exercise.lines as string[] | undefined) ??
    [];

  useEffect(() => {
    setPool(words);
    setBuilt([]);
    soft.resetSoft();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words]);

  function check() {
    if (!built.length) return;
    if (correct.length && !softGradeCodeOrder(built, correct)) {
      soft.registerFail();
      return;
    }
    soft.markOk();
    onAnswer(built);
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (isTypingTarget(e.target)) return;
      if (hasOpenDialog()) return;

      const optIdx = optionIndexFromKey(e);
      if (optIdx !== null) {
        e.preventDefault();
        if (optIdx < pool.length) {
          const w = pool[optIdx]!;
          setPool((p) => p.filter((_, j) => j !== optIdx));
          setBuilt((b) => [...b, w]);
          soft.resetSoft();
        }
        return;
      }

      if (e.key === "Backspace" && built.length) {
        e.preventDefault();
        const last = built[built.length - 1]!;
        setBuilt((b) => b.slice(0, -1));
        setPool((p) => [...p, last]);
        soft.resetSoft();
        return;
      }

      if (e.key === "Enter" && built.length) {
        const target = e.target as HTMLElement | null;
        const isButtonOrLink = Boolean(target?.closest?.("button, a"));
        if (!isButtonOrLink) {
          e.preventDefault();
          check();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pool, built, soft, correct, onAnswer]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black" id={`ex-prompt-${exercise.id}`}>
        {prompt}
      </h2>
      <p className="text-xs font-bold text-ink-muted">
        {locale === "en"
          ? "Keys: 1–9 add from pool · Backspace undo · Enter check"
          : "Клавіші: 1–9 з пулу · Backspace назад · Enter перевірка"}
      </p>
      {isCode && (
        <p className="text-xs font-bold text-ink-muted font-mono">
          {String(exercise.language ?? "code")}
        </p>
      )}
      {hint.panel}
      <div
        className="min-h-14 rounded-2xl border-2 border-dashed border-slate-300 p-3 flex flex-wrap gap-2"
        aria-label="built"
      >
        {built.map((w, i) => (
          <button
            key={`${w}-${i}`}
            type="button"
            className={clsx(
              "rounded-xl bg-sky/15 px-3 py-1 font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky",
              isCode && "font-mono text-sm",
            )}
            onClick={() => {
              setBuilt((b) => b.filter((_, j) => j !== i));
              setPool((p) => [...p, w]);
              soft.resetSoft();
            }}
          >
            {orderLabel(w, locale, canonicalLines, ukrainianLines)}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2" role="list" aria-label="word pool">
        {pool.map((w, i) => (
          <div key={`${w}-${i}`} role="listitem">
            <button
              type="button"
              className={clsx(
                "rounded-xl border-2 border-slate-200 px-3 py-1 font-bold dark:border-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky",
                isCode && "font-mono text-sm",
              )}
              onClick={() => {
                setPool((p) => p.filter((_, j) => j !== i));
                setBuilt((b) => [...b, w]);
                soft.resetSoft();
              }}
            >
              <span className="mr-1 text-[10px] text-ink-muted">{i + 1}.</span>
              {orderLabel(w, locale, canonicalLines, ukrainianLines)}
            </button>
          </div>
        ))}
      </div>
      <DrillFooter
        canCheck={Boolean(built.length)}
        onCheck={check}
        soft={soft}
        skipAnswer={built}
        onAnswer={onAnswer}
        tutorHref={isCode ? tutorHelpHref(exercise, built.join("\n")) : null}
        exercise={exercise}
        onApplySolution={(a) => {
          if (Array.isArray(a)) {
            setBuilt(a as string[]);
            setPool([]);
          }
        }}
      />
    </div>
  );
}

function TypingExercise({
  exercise,
  onAnswer,
}: {
  exercise: Exercise;
  onAnswer: (a: unknown) => void;
}) {
  const { locale, t } = useLocale();
  const text = String(exercise.text ?? "");
  const [value, setValue] = useState("");
  const [started, setStarted] = useState<number | null>(null);

  const accuracy = useMemo(() => {
    if (!value.length) return 1;
    let ok = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] === text[i]) ok += 1;
    }
    return ok / value.length;
  }, [value, text]);

  const wpm = useMemo(() => {
    if (started === null || value.length < 2) return 0;
    const minutes = (Date.now() - started) / 60000;
    return Math.round(value.length / 5 / Math.max(minutes, 0.01));
  }, [value, started]);

  const done = value.length >= text.length;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black">{usePrompt(exercise)}</h2>
      <p className="text-sm font-semibold text-ink-muted">
        {t.typing.layoutLabel}: {String(exercise.layout ?? "").toUpperCase()}
        {typeof exercise.targetWpm === "number" && exercise.targetWpm > 0
          ? ` · ${t.typing.targetLabel}: ${exercise.targetWpm} ${t.typing.wpm}`
          : null}
      </p>
      <p className="text-sm text-ink-muted">{t.typing.passRule}</p>
      <p className="rounded-2xl bg-slate-100 p-4 font-mono text-lg leading-relaxed tracking-wide">
        {text.split("").map((ch, i) => {
          let color = "text-slate-400";
          if (i < value.length) color = value[i] === ch ? "text-brand-dark" : "text-red-500";
          return (
            <span key={i} className={color}>
              {ch}
            </span>
          );
        })}
      </p>
      <textarea
        className="input min-h-28 font-mono"
        value={value}
        onChange={(e) => {
          if (started === null && e.target.value.length > 0) setStarted(Date.now());
          setValue(e.target.value);
        }}
        placeholder={locale === "en" ? "Start typing…" : "Почніть друкувати…"}
      />
      <div className="flex gap-4 text-sm font-bold">
        <span>
          {t.typing.wpm}: {wpm}
        </span>
        <span>
          {t.typing.accuracy}: {Math.round(accuracy * 100)}%
        </span>
      </div>
      <button
        className="btn-primary"
        disabled={!done}
        onClick={() => onAnswer({ wpm, text: value, completed: true })}
      >
        {t.lesson.check}
      </button>
    </div>
  );
}

function RsvpExercise({
  exercise,
  onAnswer,
}: {
  exercise: Exercise;
  onAnswer: (a: unknown) => void;
}) {
  const { t, locale } = useLocale();
  const text = String(locale === "en" && exercise.textEn ? exercise.textEn : exercise.text ?? "");
  const words = text.split(/\s+/).filter(Boolean);
  const wpm = Number(exercise.wpm ?? 240);
  const [i, setI] = useState(-1);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setI(-1);
    setRunning(false);
  }, [exercise.id, text]);

  useEffect(() => {
    if (!running || i < 0) return;
    if (i >= words.length) {
      setRunning(false);
      return;
    }
    const ms = 60000 / wpm;
    const t = setTimeout(() => setI((x) => x + 1), ms);
    return () => clearTimeout(t);
  }, [running, i, words.length, wpm]);

  const finished = i >= words.length;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black">{usePrompt(exercise)}</h2>
      <div className="grid h-40 place-items-center rounded-3xl bg-slate-900 text-3xl font-black text-white">
        {i < 0 ? "…" : finished ? "✓" : words[i]}
      </div>
      <p className="text-sm font-bold text-ink-muted">
        {t.reading.wpm}: {wpm}
      </p>
      {!running && !finished && (
        <button
          className="btn-sky"
          onClick={() => {
            if (i < 0) setI(0);
            setRunning(true);
          }}
        >
          {i < 0 ? t.reading.startRsvp : t.reading.resumeRsvp}
        </button>
      )}
      {running && (
        <button type="button" className="btn-secondary" onClick={() => setRunning(false)}>
          {t.reading.pauseRsvp}
        </button>
      )}
      {finished && (
        <button type="button" className="btn-secondary" onClick={() => { setI(0); setRunning(true); }}>
          {t.reading.restartRsvp}
        </button>
      )}
      {finished && (
        <button className="btn-primary" onClick={() => onAnswer({ completed: true })}>
          {t.lesson.continue}
        </button>
      )}
    </div>
  );
}

function ComprehensionExercise({
  exercise,
  onAnswer,
}: {
  exercise: Exercise;
  onAnswer: (a: unknown) => void;
}) {
  const { locale, t } = useLocale();
  const questions = (exercise.questions as { q: string; qEn?: string; options: string[]; optionsEn?: string[] }[]) ?? [];
  const optionOrders = useMemo(
    () => questions.map((q, qi) => stableOptionOrder(`${String(exercise.id)}:${qi}`, q.options.length)),
    [exercise.id, questions],
  );
  const [answers, setAnswers] = useState<(number | null)[]>(questions.map(() => null));
  const [showQs, setShowQs] = useState(false);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black">{usePrompt(exercise)}</h2>
      <div className="rounded-2xl bg-slate-100 p-4 leading-relaxed">
        {String(locale === "en" && exercise.passageEn ? exercise.passageEn : exercise.passage)}
      </div>
      {!showQs ? (
        <button className="btn-primary" onClick={() => setShowQs(true)}>
          {locale === "en" ? "To questions" : "До питань"}
        </button>
      ) : (
        <>
          {questions.map((q, qi) => (
            <div key={qi} className="space-y-2">
              <p className="font-bold">{locale === "en" && q.qEn ? q.qEn : q.q}</p>
              {(optionOrders[qi] ?? []).map((original) => (
                <button
                  key={original}
                  type="button"
                  className={clsx(
                    "block w-full rounded-xl border-2 px-3 py-2 text-left font-semibold",
                    answers[qi] === original ? "border-sky bg-sky/10" : "border-slate-200",
                  )}
                  onClick={() =>
                    setAnswers((a) => a.map((v, i) => (i === qi ? original : v)))
                  }
                >
                  {(locale === "en" && q.optionsEn?.length === q.options.length ? q.optionsEn : q.options)[original]}
                </button>
              ))}
            </div>
          ))}
          <button
            className="btn-primary"
            disabled={answers.some((a) => a === null)}
            onClick={() => onAnswer(answers)}
          >
            {t.lesson.check}
          </button>
        </>
      )}
    </div>
  );
}

type PuzzleMoveRecord = { san: string; from: string; to: string };

type PuzzleSourceInfo = { kind?: string; white?: string; black?: string; year?: number; event?: string; lichessId?: string; gameUrl?: string };

function puzzleSourceLine(src: PuzzleSourceInfo | undefined, lichessLabel: string): { text: string; href?: string } | null {
  if (!src) return null;
  if (src.kind === "lichess") return { text: src.lichessId ? `${lichessLabel} · #${src.lichessId}` : lichessLabel, href: src.gameUrl };
  const players = [src.white, src.black].filter(Boolean).join(" — ");
  const rest = [src.event, src.year].filter(Boolean).join(", ");
  const text = [players, rest].filter(Boolean).join(", ");
  return text ? { text } : null;
}

const MAX_WRONG_BEFORE_REVEAL = 3;

function ChessPuzzleExercise({
  exercise,
  onAnswer,
}: {
  exercise: Exercise;
  onAnswer: (a: unknown) => void;
}) {
  const { t, locale } = useLocale();
  const examMode = useContext(ExamModeCtx);
  const assistance = useContext(AssistanceCtx);
  const onWrongAttempt = useContext(WrongAttemptCtx);
  const fen = String(exercise.fen);
  const en = locale === "en";
  const difficulty = Number(exercise.difficulty ?? 1);
  const spec = useMemo<PuzzleSpec>(
    () => ({
      fen,
      solutionSans: (exercise.solutionSans as string[]) ?? [],
      goal: exercise.goal as PuzzleSpec["goal"],
      acceptedAlternatives: exercise.acceptedAlternatives as PuzzleSpec["acceptedAlternatives"],
      alternativeLines: exercise.alternativeLines as PuzzleSpec["alternativeLines"],
    }),
    [fen, exercise.solutionSans, exercise.goal, exercise.acceptedAlternatives, exercise.alternativeLines],
  );
  const [moves, setMoves] = useState<PuzzleMoveRecord[]>([]);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [solved, setSolved] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [wrongFlash, setWrongFlash] = useState<PuzzleMoveRecord | null>(null);
  const [endReason, setEndReason] = useState<"checkmate" | "stalemate" | null>(null);
  const [wrongCount, setWrongCount] = useState(0);
  const [hintStep, setHintStep] = useState<0 | 1 | 2>(0);
  /** Display-only replay of the solution after the puzzle is finished. */
  const [replay, setReplay] = useState<PuzzleMoveRecord[] | null>(null);

  const viewer = useMemo(() => {
    try {
      return (new Chess(fen)).turn();
    } catch {
      return "w";
    }
  }, [fen]);
  const orientation = viewer === "b" ? "black" : "white";

  const shown = replay ?? [...moves, ...(wrongFlash ? [wrongFlash] : [])];
  const boardFen = useMemo(() => {
    const g = replaySans(fen, shown.map((m) => m.san));
    return g ? g.fen() : fen;
  }, [fen, shown]);
  const lastMove = shown.at(-1) ?? null;

  useEffect(() => {
    setMoves([]);
    setMsg("");
    setBusy(false);
    setSolved(false);
    setRevealed(false);
    setWrongFlash(null);
    setEndReason(null);
    setWrongCount(0);
    setHintStep(0);
    setReplay(null);
  }, [exercise.id]);

  const done = solved || revealed;
  const hintPiece = typeof exercise.hintPiece === "string" ? exercise.hintPiece : null;
  const hintSquare = typeof exercise.hintSquare === "string" ? exercise.hintSquare : null;
  const hintText1 = String((en ? exercise.hintEn : exercise.hintUk) ?? exercise.hintUk ?? "");
  const hintText2 = String((en ? exercise.hintSquareEn : exercise.hintSquareUk) ?? exercise.hintSquareUk ?? "");
  const canHint = !examMode && !done && Boolean(hintText1) && (difficulty <= 2 || wrongCount > 0) && hintStep < 2;
  const highlight = done ? [] : [hintStep >= 1 ? hintPiece : null, hintStep >= 2 ? hintSquare : null].filter((x): x is string => Boolean(x));
  const themes = visibleChessThemes(exercise.themes as string[] | undefined);
  const explanation = String((en ? exercise.explanationEn : exercise.explanationUk) ?? exercise.explanationUk ?? "");
  const source = puzzleSourceLine(exercise.source as PuzzleSourceInfo | undefined, t.chess.lichessSource);

  function restart() {
    setMoves([]);
    setMsg("");
    setSolved(false);
    setWrongFlash(null);
    setEndReason(null);
  }

  function useHint() {
    const next = (hintStep + 1) as 1 | 2;
    setHintStep(next);
    assistance.onHintUsed?.();
  }

  function animate(line: PuzzleMoveRecord[]) {
    setReplay([]);
    line.forEach((_, i) => setTimeout(() => setReplay(line.slice(0, i + 1)), 600 * (i + 1)));
    setTimeout(() => setReplay(null), 600 * (line.length + 1) + 400);
  }

  function solutionRecords(): PuzzleMoveRecord[] {
    const g = new Chess(fen);
    const out: PuzzleMoveRecord[] = [];
    for (const san of spec.solutionSans) {
      try {
        const mv = g.move(san);
        out.push({ san: mv.san, from: mv.from, to: mv.to });
      } catch {
        break;
      }
    }
    return out;
  }

  function revealSolution() {
    const line = solutionRecords();
    setRevealed(true);
    setMoves(line);
    setMsg(t.chess.solutionShown);
    assistance.onSolutionRevealed?.();
    animate(line);
    onAnswer({ solved: false, revealed: true, sans: line.map((m) => m.san), playerSans: [], hintsUsed: hintStep });
  }

  function finish(line: PuzzleMoveRecord[], alternative: boolean) {
    const g = replaySans(fen, line.map((m) => m.san));
    setSolved(true);
    setMsg(alternative ? t.chess.alternativeAccepted : t.lesson.correct);
    const sans = line.map((m) => m.san);
    const playerSans = sans.filter((_, i) => i % 2 === 0);
    const base = { solved: true, sans, playerSans, hintsUsed: hintStep };
    if (g?.isCheckmate()) {
      setEndReason("checkmate");
      onAnswer({ ...base, mate: true });
    } else if (g?.isStalemate()) {
      setEndReason("stalemate");
      onAnswer({ ...base, stalemate: true });
    } else {
      onAnswer(base);
    }
  }

  function onDrop(from: string, to: string, promotion?: "q" | "r" | "b" | "n") {
    if (busy || done) return false;
    const played = moves.map((m) => m.san);
    const r = evaluatePuzzleMove(spec, played, { from, to, promotion });
    if (!r.ok) {
      if (r.reason === "illegal" || r.reason === "not_your_turn") return false;
      // Wrong: show the move briefly, then take back only that move.
      const probe = replaySans(fen, played);
      let san = "";
      try {
        san = probe?.move({ from, to, promotion })?.san ?? "";
      } catch {
        return false;
      }
      onWrongAttempt?.();
      setWrongCount((c) => c + 1);
      setMsg(t.chess.wrongMove);
      setWrongFlash({ san, from, to });
      setBusy(true);
      setTimeout(() => {
        setWrongFlash(null);
        setBusy(false);
      }, 700);
      return true;
    }
    const next = [...moves, { san: r.san, from, to }];
    setMoves(next);
    setMsg("");
    if (r.done) {
      finish(next, r.alternative);
      return true;
    }
    if (r.nextOpponentSan) {
      setBusy(true);
      setMsg(t.chess.opponentThinking);
      const reply = r.nextOpponentSan;
      setTimeout(() => {
        const g = replaySans(fen, next.map((m) => m.san));
        try {
          const mv = g?.move(reply);
          if (mv) setMoves([...next, { san: mv.san, from: mv.from, to: mv.to }]);
        } catch {
          /* QA guarantees legal replies */
        }
        setMsg("");
        setBusy(false);
      }, 500);
    }
    return true;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black">{usePrompt(exercise)}</h2>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <DifficultyStars value={difficulty} label={t.chess.difficultyLabel} />
        {(!examMode || done) &&
          themes.map((k) => (
            <span key={k} className="rounded-full bg-surface-muted px-2 py-0.5 text-xs font-bold" data-testid="puzzle-theme">
              {chessThemeLabel(k, en ? "en" : "uk")}
            </span>
          ))}
      </div>
      <div className="mx-auto max-w-md">
        <ChessBoardFrame
          fen={boardFen}
          mode="puzzle"
          orientation={orientation}
          viewer={viewer}
          interactive={!busy && !done && !replay}
          onMove={onDrop}
          lastMove={lastMove}
          highlightSquares={highlight}
          endReason={replay ? null : endReason}
          endLine={t.chess.puzzleSolved}
          boardWidth={360}
        />
      </div>
      {msg && <p className="font-bold text-center" role="status" aria-live="polite">{msg}</p>}
      {hintStep >= 1 && !done && (
        <div className="rounded-xl bg-surface-muted p-3 text-sm" data-testid="puzzle-hint-text">
          <p>{hintText1}</p>
          {hintStep >= 2 && hintText2 && <p className="mt-1 font-bold">{hintText2}</p>}
        </div>
      )}
      <div className="flex flex-wrap justify-center gap-2">
        {moves.length > 0 && !done && !busy && (
          <button type="button" className="btn-secondary" onClick={restart}>
            {t.chess.restartPuzzle}
          </button>
        )}
        {canHint && (
          <button type="button" className="btn-secondary" onClick={useHint} data-testid="puzzle-hint">
            {hintStep === 0 ? t.chess.puzzleHint : t.chess.puzzleHintMore}
          </button>
        )}
        {!examMode && !done && wrongCount >= MAX_WRONG_BEFORE_REVEAL && (
          <button type="button" className="btn-secondary" onClick={revealSolution} data-testid="puzzle-reveal">
            {t.chess.showSolution}
          </button>
        )}
        {done && !examMode && (
          <button type="button" className="btn-secondary" onClick={() => animate(solutionRecords())} data-testid="puzzle-replay">
            {t.chess.replaySolution}
          </button>
        )}
      </div>
      {done && !examMode && (explanation || source) && (
        <section className="rounded-xl border border-ink/10 p-3 text-sm space-y-1" data-testid="puzzle-explanation">
          <h3 className="font-black">{t.chess.explanation}</h3>
          {explanation && <p>{explanation}</p>}
          {source && (
            <p className="text-ink-muted">
              {t.chess.source}:{" "}
              {source.href ? (
                <a href={source.href} target="_blank" rel="noreferrer" className="underline">
                  {source.text}
                </a>
              ) : (
                source.text
              )}
            </p>
          )}
        </section>
      )}
    </div>
  );
}

type ChessPlanOption = { san: string; explanationUk: string; explanationEn?: string };

type DrillMove = { san: string; from: string; to: string };

/** Endgame drill: play the position out against the bot; goal judged by rules (server re-grades). */
function ChessEndgameDrillExercise({ exercise, onAnswer }: { exercise: Exercise; onAnswer: (a: unknown) => void }) {
  const { t, locale } = useLocale();
  const examMode = useContext(ExamModeCtx);
  const assistance = useContext(AssistanceCtx);
  const en = locale === "en";
  const fen = String(exercise.fen);
  const goal = (exercise.goal as EndgameGoal) ?? "win";
  const maxMoves = Number(exercise.maxMoves ?? 30);
  const botLevel = exercise.botLevel === "club" ? "club" : "strong";
  const [moves, setMoves] = useState<DrillMove[]>([]);
  const [thinking, setThinking] = useState(false);
  const [finished, setFinished] = useState<"success" | "fail" | null>(null);
  const [hintShown, setHintShown] = useState(false);

  const viewer = useMemo(() => {
    try {
      return new Chess(fen).turn();
    } catch {
      return "w" as const;
    }
  }, [fen]);
  const boardFen = useMemo(() => replaySans(fen, moves.map((m) => m.san))?.fen() ?? fen, [fen, moves]);
  const status = useMemo(() => checkEndgameGoal(fen, moves.map((m) => m.san), goal, maxMoves), [fen, moves, goal, maxMoves]);

  useEffect(() => {
    setMoves([]);
    setThinking(false);
    setFinished(null);
    setHintShown(false);
  }, [exercise.id]);

  // Report the outcome once.
  useEffect(() => {
    if (finished || status.status === "in_progress") return;
    setFinished(status.status);
    onAnswer({ sans: moves.map((m) => m.san), hintsUsed: hintShown ? 1 : 0, reason: status.reason });
  }, [status, finished, moves, hintShown, onAnswer]);

  // Bot reply when it is the bot's turn.
  useEffect(() => {
    if (finished || status.status !== "in_progress") return;
    const g = replaySans(fen, moves.map((m) => m.san));
    if (!g || g.turn() === viewer) return;
    let active = true;
    setThinking(true);
    const timer = setTimeout(async () => {
      const mv = await requestBotMove(g.fen(), botLevel, { history: moves.map((m) => m.san) });
      if (!active || !mv) return;
      try {
        const r = g.move({ from: mv.from, to: mv.to, promotion: mv.promotion });
        setMoves((prev) => [...prev, { san: r.san, from: r.from, to: r.to }]);
      } catch {
        /* bot returned an illegal move — ignore */
      }
      setThinking(false);
    }, 350);
    return () => {
      active = false;
      clearTimeout(timer);
      setThinking(false);
    };
  }, [moves, fen, viewer, botLevel, finished, status.status]);

  function onDrop(from: string, to: string, promotion?: "q" | "r" | "b" | "n") {
    if (finished || thinking) return false;
    const g = replaySans(fen, moves.map((m) => m.san));
    if (!g || g.turn() !== viewer) return false;
    try {
      const r = g.move({ from: from as Square, to: to as Square, promotion });
      setMoves((prev) => [...prev, { san: r.san, from: r.from, to: r.to }]);
      return true;
    } catch {
      return false;
    }
  }

  function restart() {
    setMoves([]);
    setThinking(false);
  }

  const goalText = (goal === "draw" ? t.chess.endgameGoalDraw : goal === "promote" ? t.chess.endgameGoalPromote : t.chess.endgameGoalWin).replace(
    "{n}",
    String(maxMoves),
  );
  const hint = String((en ? exercise.hintEn : exercise.hintUk) ?? exercise.hintUk ?? "");
  const explanation = String((en ? exercise.explanationEn : exercise.explanationUk) ?? exercise.explanationUk ?? "");
  const last = moves.at(-1) ?? null;
  const g = replaySans(fen, moves.map((m) => m.san));
  const endReason = g?.isCheckmate() ? "checkmate" : g?.isStalemate() ? "stalemate" : null;

  return (
    <div className="space-y-4" data-testid="endgame-drill">
      <h2 className="text-xl font-black">{usePrompt(exercise)}</h2>
      <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-bold">
        <span className="rounded-full bg-surface-muted px-3 py-1" data-testid="endgame-goal">
          🎯 {goalText}
        </span>
        <span className="rounded-full bg-surface-muted px-3 py-1" data-testid="endgame-moves-left">
          {t.chess.movesLeft}: {status.movesLeft}
        </span>
      </div>
      <div className="mx-auto max-w-md">
        <ChessBoardFrame
          fen={boardFen}
          mode="play"
          orientation={viewer === "b" ? "black" : "white"}
          viewer={viewer}
          interactive={!finished && !thinking}
          onMove={onDrop}
          lastMove={last}
          endReason={endReason}
          endLine={finished === "success" ? t.chess.endgameSuccess : t.chess.endgameFail}
          boardWidth={360}
        />
      </div>
      <p className="text-center font-bold" role="status" aria-live="polite">
        {finished === "success" ? `✅ ${t.chess.endgameSuccess}` : finished === "fail" ? `❌ ${t.chess.endgameFail}` : thinking ? t.chess.opponentThinking : ""}
      </p>
      {hintShown && hint && !finished && <div className="rounded-xl bg-surface-muted p-3 text-sm">{hint}</div>}
      {finished && explanation && <div className="rounded-xl bg-surface-muted p-3 text-sm">{explanation}</div>}
      {!finished && (
        <div className="flex flex-wrap justify-center gap-2">
          <button type="button" className="btn-secondary" onClick={restart} disabled={moves.length === 0}>
            {t.chess.restartPuzzle}
          </button>
          {!examMode && hint && !hintShown && (
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setHintShown(true);
                assistance.onHintUsed?.();
              }}
            >
              💡 {t.chess.hint}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function ChessPlanExercise({
  exercise,
  onAnswer,
}: {
  exercise: Exercise;
  onAnswer: (a: unknown) => void;
}) {
  const { t, locale } = useLocale();
  const examMode = useContext(ExamModeCtx);
  const fen = String(exercise.fen);
  const options = (exercise.choices as ChessPlanOption[] | undefined) ?? [];
  const correctIndex = Number(exercise.correctIndex);
  const order = useMemo(() => stableOptionOrder(`${String(exercise.id)}:plan`, options.length), [exercise.id, options.length]);
  const [picked, setPicked] = useState<number | null>(null);
  useEffect(() => setPicked(null), [exercise.id]);
  const viewer = useMemo(() => {
    try {
      return new Chess(fen).turn();
    } catch {
      return "w";
    }
  }, [fen]);
  const arrowFor = (i: number): [Square, Square, string] | null => {
    const opt = options[i];
    if (!opt) return null;
    try {
      const mv = new Chess(fen).move(opt.san);
      return mv ? [mv.from, mv.to, i === correctIndex ? "rgba(34,197,94,0.85)" : "rgba(239,68,68,0.8)"] : null;
    } catch {
      return null;
    }
  };
  const arrows = picked === null ? [] : [arrowFor(picked), picked !== correctIndex ? arrowFor(correctIndex) : null].filter(
    (a): a is [Square, Square, string] => Boolean(a),
  );
  const explain = (o: ChessPlanOption) => (locale === "en" && o.explanationEn ? o.explanationEn : o.explanationUk);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black">{usePrompt(exercise)}</h2>
      <p className="text-sm font-bold text-ink-muted">{t.chess.planPick}</p>
      <div className="mx-auto max-w-md">
        <ChessBoardFrame
          fen={fen}
          mode="explore"
          orientation={viewer === "b" ? "black" : "white"}
          viewer={viewer}
          arrows={arrows}
          boardWidth={360}
        />
      </div>
      <div className="grid gap-2">
        {order.map((i) => {
          const o = options[i]!;
          const revealed = picked !== null && !examMode;
          return (
            <button
              key={i}
              type="button"
              data-testid={`plan-option-${i}`}
              disabled={picked !== null}
              className={clsx(
                "rounded-2xl border-2 px-4 py-3 text-left",
                picked === i ? "border-sky bg-sky/10" : "border-slate-200",
                revealed && i === correctIndex && "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30",
                revealed && picked === i && i !== correctIndex && "border-rose-400 bg-rose-50 dark:bg-rose-950/30",
              )}
              onClick={() => setPicked(i)}
            >
              <span className="font-black">{o.san}</span>
              {revealed && <span className="mt-1 block text-sm">{explain(o)}</span>}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <>
          {!examMode && (
            <p className="text-center font-bold" role="status">
              {picked === correctIndex ? t.chess.planCorrect : t.chess.planWrong}
            </p>
          )}
          <button type="button" className="btn-primary" onClick={() => onAnswer(picked)}>
            {t.lesson.continue}
          </button>
        </>
      )}
    </div>
  );
}

function ChessLessonExercise({
  exercise,
  onAnswer,
}: {
  exercise: Exercise;
  onAnswer: (a: unknown) => void;
}) {
  const { t, locale } = useLocale();
  const quiz = exercise.quiz as { q: string; qEn?: string; options: string[]; optionsEn?: string[]; correctIndex: number } | undefined;
  const quizOptions = quiz ? localizeExerciseOptions(locale, quiz) : [];
  const order = useMemo(
    () => stableOptionOrder(`${String(exercise.id)}:quiz`, quiz?.options.length ?? 0),
    [exercise.id, quiz?.options.length],
  );
  const [selected, setSelected] = useState<number | null>(null);
  const fen = String(exercise.fen);
  const viewer = useMemo(() => {
    try {
      return (new Chess(fen)).turn();
    } catch {
      return "w";
    }
  }, [fen]);
  const orientation = viewer === "b" ? "black" : "white";

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black">{usePrompt(exercise)}</h2>
      <div className="mx-auto max-w-md">
        <ChessBoardFrame
          fen={fen}
          mode="explore"
          orientation={orientation}
          viewer={viewer}
          boardWidth={360}
        />
      </div>
      <p className="rounded-2xl bg-slate-100 p-4 leading-relaxed">{String(locale === "en" && exercise.notesEn ? exercise.notesEn : exercise.notesUk)}</p>
      {quiz ? (
        <>
          <p className="font-bold">{locale === "en" && quiz.qEn ? quiz.qEn : quiz.q}</p>
          <div className="grid gap-2">
            {order.map((original) => (
              <button
                key={original}
                type="button"
                className={clsx(
                  "rounded-2xl border-2 px-4 py-3 text-left font-bold",
                  selected === original ? "border-sky bg-sky/10" : "border-slate-200",
                )}
                onClick={() => setSelected(original)}
              >
                {quizOptions[original]}
              </button>
            ))}
          </div>
          <button
            className="btn-primary"
            disabled={selected === null}
            onClick={() => selected !== null && onAnswer(selected)}
          >
            {t.lesson.check}
          </button>
        </>
      ) : (
        <button className="btn-primary" onClick={() => onAnswer(true)}>
          {t.lesson.continue}
        </button>
      )}
    </div>
  );
}

/**
 * Concept card — theory / worked example before practice.
 * Shows body paragraphs, key points, optional read-only code and an optional self-check.
 */
function ConceptExercise({
  exercise,
  onAnswer,
}: {
  exercise: Exercise;
  onAnswer: (a: unknown) => void;
}) {
  const { locale, t } = useLocale();
  const en = locale === "en";
  const body = String(
    (en ? exercise.bodyEn || exercise.bodyUk : exercise.bodyUk || exercise.bodyEn) ?? "",
  );
  const pointsRaw = (en
    ? (exercise.keyPointsEn as string[] | undefined) ?? (exercise.keyPointsUk as string[] | undefined)
    : (exercise.keyPointsUk as string[] | undefined) ?? (exercise.keyPointsEn as string[] | undefined)) ?? [];
  const check = exercise.check as
    | { qUk: string; qEn?: string; options: string[]; optionsEn?: string[]; correctIndex: number }
    | undefined;
  const order = useMemo(
    () => stableOptionOrder(`${String(exercise.id)}:check`, check?.options.length ?? 0),
    [exercise.id, check?.options.length],
  );
  const [selected, setSelected] = useState<number | null>(null);
  const paragraphs = body.split(/\n{2,}/).filter((p) => p.trim());

  return (
    <div className="space-y-4">
      <p className="text-xs font-black uppercase tracking-wide text-grape">
        📘 {en ? "Concept" : "Теорія"}
      </p>
      <h2 className="text-xl font-black">{usePrompt(exercise)}</h2>
      <div className="space-y-3 rounded-2xl bg-slate-100 p-4 leading-relaxed dark:bg-slate-800">
        {paragraphs.map((p, i) => (
          <p key={i} className="whitespace-pre-line">
            <FormattedFormulaText text={p} />
          </p>
        ))}
      </div>
      {pointsRaw.length > 0 && (
        <div className="rounded-2xl border-2 border-brand/30 p-4">
          <p className="mb-2 text-sm font-black">{en ? "Key points" : "Головне"}</p>
          <ul className="list-inside list-disc space-y-1 text-sm font-bold">
            {pointsRaw.map((kp, i) => (
              <li key={i}>{kp}</li>
            ))}
          </ul>
        </div>
      )}
      {exercise.code ? (
        <CodeBlock code={String(exercise.code)} language={String(exercise.language ?? "")} />
      ) : null}
      {check ? (
        <>
          <p className="font-bold">
            {en ? "Self-check: " : "Самоперевірка: "}
            {en ? check.qEn || check.qUk : check.qUk}
          </p>
          <div className="grid gap-2">
            {order.map((original) => {
              const label =
                en && check.optionsEn?.[original]
                  ? check.optionsEn[original]
                  : check.options[original];
              return (
                <button
                  key={original}
                  type="button"
                  className={clsx(
                    "rounded-2xl border-2 px-4 py-3 text-left font-bold",
                    selected === original
                      ? "border-sky bg-sky/10"
                      : "border-slate-200 dark:border-slate-700",
                  )}
                  onClick={() => setSelected(original)}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <button
            className="btn-primary"
            disabled={selected === null}
            onClick={() => selected !== null && onAnswer(selected)}
          >
            {t.lesson.check}
          </button>
        </>
      ) : (
        <button className="btn-primary" onClick={() => onAnswer({ acknowledged: true })}>
          {en ? "Got it" : "Зрозуміло"} →
        </button>
      )}
    </div>
  );
}

/**
 * Explain in your own words (self-explanation). Client soft-grades with the shared rubric;
 * optional tutor feedback via POST /deep/explain-feedback.
 */
function ExplainExercise({
  exercise,
  onAnswer,
}: {
  exercise: Exercise;
  onAnswer: (a: unknown) => void;
}) {
  const { locale, t } = useLocale();
  const en = locale === "en";
  const { token } = useAuth();
  const lessonId = useContext(LessonIdCtx);
  const examMode = useContext(ExamModeCtx);
  const hint = useExerciseHint(exercise);
  const soft = useSoftAttempts(hint.setOpen);
  const [text, setText] = useState("");
  const [missing, setMissing] = useState<string[]>([]);
  const [tutor, setTutor] = useState<string | null>(null);
  const [tutorBusy, setTutorBusy] = useState(false);
  const ideas = (exercise.keyIdeas as ExplainKeyIdea[]) ?? [];
  const minWords = Number(exercise.minWords ?? 12);
  const words = countWords(text);
  const sample = String((en ? exercise.sampleAnswerEn || exercise.sampleAnswerUk : exercise.sampleAnswerUk) ?? "");

  function check() {
    const g = gradeExplanation(text, {
      keyIdeas: ideas,
      minWords,
      passRatio: exercise.passRatio as number | undefined,
    });
    if (!g.correct) {
      const labels = ideas
        .filter((i) => g.missing.includes(i.labelEn || i.labelUk))
        .map((i) => (en ? i.labelEn || i.labelUk : i.labelUk));
      setMissing(labels);
      soft.registerFail(
        g.tooShort
          ? en
            ? `At least ${minWords} words (now ${g.words}).`
            : `Щонайменше ${minWords} слів (зараз ${g.words}).`
          : null,
      );
      return;
    }
    soft.markOk();
    onAnswer({ text });
  }

  async function askTutor() {
    if (!lessonId || !text.trim()) return;
    setTutorBusy(true);
    try {
      const r = await api<{ feedback: string }>("/deep/explain-feedback", {
        method: "POST",
        token,
        body: { lessonId, exerciseId: exercise.id, text, locale },
      });
      setTutor(r.feedback);
    } catch {
      setTutor(en ? "Tutor is unavailable right now." : "Репетитор зараз недоступний.");
    } finally {
      setTutorBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-xs font-black uppercase tracking-wide text-grape">
        ✍️ {en ? "Explain in your own words" : "Поясніть своїми словами"}
      </p>
      <h2 className="text-xl font-black">{usePrompt(exercise)}</h2>
      <textarea
        className="min-h-[140px] w-full rounded-2xl border-2 border-slate-200 p-3 font-bold dark:border-slate-700 dark:bg-slate-900"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          soft.resetSoft();
        }}
        aria-label={en ? "Your explanation" : "Ваше пояснення"}
        placeholder={en ? "Explain as if to a friend…" : "Поясніть так, ніби другу…"}
      />
      <p className={clsx("text-xs font-bold", words >= minWords ? "text-green-600" : "text-ink-muted")}>
        {words}/{minWords} {en ? "words" : "слів"}
      </p>
      {soft.wrong && (
        <div className="rounded-2xl border-2 border-orange-300 bg-orange-50 p-3 text-sm font-bold dark:bg-orange-950/30">
          {soft.detail ? <p>{soft.detail}</p> : null}
          {missing.length > 0 && (
            <p>
              {en ? "Think about: " : "Подумайте про: "}
              {missing.join(", ")}
            </p>
          )}
        </div>
      )}
      {tutor && (
        <p className="whitespace-pre-wrap rounded-2xl bg-sky/10 p-3 text-sm font-bold">🎓 {tutor}</p>
      )}
      <div className="flex flex-wrap gap-2">
        <button className="btn-primary" disabled={!text.trim()} onClick={check}>
          {t.lesson.check}
        </button>
        {lessonId && !examMode && (
          <button
            type="button"
            className="btn-secondary"
            disabled={!text.trim() || tutorBusy}
            onClick={() => void askTutor()}
          >
            🎓 {en ? "Tutor feedback" : "Відгук репетитора"}
          </button>
        )}
        {soft.canSkip && sample && (
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              setText(sample);
              setMissing([]);
            }}
          >
            {en ? "Show sample answer" : "Показати приклад відповіді"}
          </button>
        )}
      </div>
      {hint.panel}
    </div>
  );
}

/** Video LMS block — track watch progress (min ratio). */
function VideoExercise({
  exercise,
  onAnswer,
}: {
  exercise: Exercise;
  onAnswer: (a: unknown) => void;
}) {
  const { locale, t } = useLocale();
  const url = String(exercise.videoUrl ?? "");
  const durationSec = Number(exercise.durationSec ?? exercise.videoDurationSec ?? 60);
  const minRatio = Number(exercise.minWatchRatio ?? 0.8);
  const [watched, setWatched] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    const tick = window.setInterval(() => {
      setWatched((w) => {
        const n = Math.min(durationSec, w + 1);
        if (n / durationSec >= minRatio) {
          window.clearInterval(tick);
          setDone(true);
        }
        return n;
      });
    }, 1000);
    return () => window.clearInterval(tick);
  }, [durationSec, minRatio, done]);

  const ratio = durationSec ? watched / durationSec : 0;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black">{usePrompt(exercise)}</h2>
      <div className="aspect-video w-full overflow-hidden rounded-2xl border-2 border-slate-200 bg-black dark:border-slate-700">
        {url ? (
          <iframe
            title="lesson-video"
            src={url}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <p className="grid h-full place-items-center text-white font-bold">No video URL</p>
        )}
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div
          className="h-full bg-brand transition-all"
          style={{ width: `${Math.min(100, ratio * 100)}%` }}
        />
      </div>
      <p className="text-sm font-bold text-ink-muted">
        {locale === "en" ? "Watch progress" : "Перегляд"}: {Math.round(ratio * 100)}% · ≥
        {Math.round(minRatio * 100)}%
      </p>
      <button
        type="button"
        className="btn-primary"
        disabled={!done && ratio < minRatio}
        onClick={() =>
          onAnswer({
            watchedSec: watched,
            durationSec,
            ratio,
            completed: ratio >= minRatio,
          })
        }
      >
        {done || ratio >= minRatio
          ? t.lesson.continue
          : locale === "en"
            ? "Keep watching…"
            : "Дивіться далі…"}
      </button>
      <button
        type="button"
        className="btn-secondary text-sm"
        onClick={() => {
          setWatched(durationSec);
          setDone(true);
        }}
      >
        {locale === "en" ? "Mark watched (dev)" : "Позначити переглянутим (dev)"}
      </button>
    </div>
  );
}

/** Multi-lang Docker/local judge exercise with behavior and text verification modes */
function CodeJudgeExercise({
  exercise,
  onAnswer,
}: {
  exercise: Exercise;
  onAnswer: (a: unknown) => void;
}) {
  const { locale, t } = useLocale();
  const { token } = useAuth();
  const onWrongAttempt = useContext(WrongAttemptCtx);
  const lang = String(exercise.language ?? "javascript") as
    | "javascript"
    | "typescript"
    | "python"
    | "bash";
  const starter = String(exercise.starter ?? exercise.code ?? "");
  const [code, setCode] = useState(starter);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [judgeUnavailable, setJudgeUnavailable] = useState(false);
  const [mobileTab, setMobileTab] = useState<"task" | "editor" | "output">("editor");

  // Verification mode: "behavior" (default) or "text", saved to device localStorage
  const [mode, setMode] = useState<"behavior" | "text">(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("eduforge_grading_mode");
        if (saved === "text" || saved === "behavior") return saved;
      } catch {
        /* ignore */
      }
    }
    return "behavior";
  });

  function handleModeChange(newMode: "behavior" | "text") {
    setMode(newMode);
    setMsg("");
    setJudgeUnavailable(false);
    try {
      localStorage.setItem("eduforge_grading_mode", newMode);
    } catch {
      /* ignore */
    }
  }

  const tests = (exercise.tests as { type: string; value: string | number }[]) ?? [];
  const limitations = locale === "en" ? exercise.limitationsEn : exercise.limitationsUk;

  async function checkTextMode() {
    setBusy(true);
    setMsg("");
    try {
      const res = gradeCodeJudgeText(exercise, code);
      if (res.correct) {
        setMsg(
          locale === "en"
            ? "✓ Text criteria passed! Code accepted."
            : "✓ Текстові критерії пройдено! Відповідь зараховано.",
        );
        onAnswer({
          source: code,
          mode: "text",
        });
      } else {
        const miss = res.meta?.missing as string[] | undefined;
        const forb = res.meta?.forbidden as string | undefined;
        const reason = forb
          ? `${locale === "en" ? "Forbidden pattern:" : "Заборонений патерн:"} ${forb}`
          : miss?.length
            ? `${locale === "en" ? "Missing required elements:" : "Не вистачає обов'язкових елементів:"} ${miss.join(", ")}`
            : locale === "en"
              ? "Code does not meet the required criteria."
              : "Код не відповідає зазначеним критеріям.";
        setMsg(`FAIL: ${reason}`);
        onWrongAttempt?.();
      }
      setMobileTab("output");
    } finally {
      setBusy(false);
    }
  }

  async function runBehaviorMode() {
    setBusy(true);
    setMsg("");
    setJudgeUnavailable(false);
    try {
      const d = await api<{
        result: {
          ok: boolean;
          stdout: string;
          stderr: string;
          tests: { pass: boolean; name: string }[];
          mode: string;
          error?: string;
        };
      }>("/judge/run", {
        method: "POST",
        token,
        body: {
          lang,
          source: code,
          tests: tests.map((t) => ({
            type: t.type,
            value: t.value,
          })),
          timeoutMs: Number(exercise.timeoutMs ?? 3000),
        },
      });

      if (d.result.mode === "disabled" || d.result.error === "judge_disabled") {
        setJudgeUnavailable(true);
        setMsg(
          locale === "en"
            ? "Judge runner is currently offline or disabled."
            : "Judge runner зараз вимкнено або недоступний.",
        );
        return;
      }

      const passed = d.result.tests.filter((t) => t.pass).length;
      const total = d.result.tests.length || (d.result.ok ? 1 : 0);
      setMsg(
        `${d.result.mode}: ${d.result.ok ? "OK" : "FAIL"}\n${d.result.stdout}\n${d.result.stderr}`,
      );

      if (d.result.ok) {
        onAnswer({
          source: code,
          mode: "behavior",
        });
      } else {
        onWrongAttempt?.();
      }
      setMobileTab("output");
    } catch (e: unknown) {
      const err = e as Error & { status?: number; data?: { error?: string } };
      if (err.status === 503 || err.data?.error === "judge_unavailable" || err.data?.error === "judge_disabled") {
        setJudgeUnavailable(true);
      } else {
        setMsg(e instanceof Error ? e.message : "judge_error");
      }
      setMobileTab("output");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      {/* Mobile Tab Switcher (Condition / Code / Output) */}
      <div className="flex sm:hidden border-b border-slate-200 dark:border-slate-800 mb-2 gap-1" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={mobileTab === "task"}
          className={clsx(
            "flex-1 py-1.5 text-xs font-bold border-b-2 text-center transition",
            mobileTab === "task"
              ? "border-brand text-brand-dark dark:text-brand-light"
              : "border-transparent text-ink-muted",
          )}
          onClick={() => setMobileTab("task")}
        >
          📋 {locale === "en" ? "Task" : "Умова"}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mobileTab === "editor"}
          className={clsx(
            "flex-1 py-1.5 text-xs font-bold border-b-2 text-center transition",
            mobileTab === "editor"
              ? "border-brand text-brand-dark dark:text-brand-light"
              : "border-transparent text-ink-muted",
          )}
          onClick={() => setMobileTab("editor")}
        >
          💻 {locale === "en" ? "Code" : "Код"}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mobileTab === "output"}
          className={clsx(
            "flex-1 py-1.5 text-xs font-bold border-b-2 text-center transition",
            mobileTab === "output"
              ? "border-brand text-brand-dark dark:text-brand-light"
              : "border-transparent text-ink-muted",
          )}
          onClick={() => setMobileTab("output")}
        >
          ▶️ {locale === "en" ? "Output" : "Результат"}
        </button>
      </div>

      <div className={clsx("space-y-3", mobileTab !== "task" && "hidden sm:block")}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-black">{usePrompt(exercise)}</h2>
          <div className="inline-flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
            <button
              type="button"
              className={clsx(
                "rounded-lg px-3 py-1 text-xs font-bold transition",
                mode === "behavior"
                  ? "bg-white text-ink shadow dark:bg-slate-700 dark:text-white"
                  : "text-ink-muted hover:text-ink dark:text-slate-400 dark:hover:text-white",
              )}
              onClick={() => handleModeChange("behavior")}
            >
              ⚙️ {t.lesson.modeBehavior}
            </button>
            <button
              type="button"
              className={clsx(
                "rounded-lg px-3 py-1 text-xs font-bold transition",
                mode === "text"
                  ? "bg-white text-ink shadow dark:bg-slate-700 dark:text-white"
                  : "text-ink-muted hover:text-ink dark:text-slate-400 dark:hover:text-white",
              )}
              onClick={() => handleModeChange("text")}
            >
              📄 {t.lesson.modeText}
            </button>
          </div>
        </div>

        {mode === "text" && (
          <div className="rounded-2xl border border-sky-300 bg-sky-50/80 p-3 text-xs font-medium text-sky-900 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-200">
            ℹ️ {t.lesson.textModeDisclaimer}
          </div>
        )}

        {Boolean(limitations) && (
          <p className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-medium text-ink-muted dark:bg-slate-800/60 dark:text-slate-300">
            ℹ️ {String(limitations)}
          </p>
        )}

        <p className="text-xs font-bold text-ink-muted">
          Judge · {lang} ·{" "}
          {mode === "behavior"
            ? locale === "en"
              ? "isolated server execution"
              : "ізольоване серверне виконання"
            : locale === "en"
              ? "static source verification"
              : "статична перевірка коду"}
        </p>
      </div>

      <div className={clsx("space-y-2", mobileTab !== "editor" && "hidden sm:block")}>
        <MonacoCodeEditor
          value={code}
          onChange={setCode}
          language={lang === "python" ? "python" : lang === "bash" ? "shell" : "javascript"}
          height="220px"
        />
      </div>

      <div className={clsx("space-y-3", mobileTab !== "output" && "hidden sm:block")}>
        {judgeUnavailable && (
          <div className="rounded-2xl border-2 border-amber-500 bg-amber-50 p-4 dark:bg-amber-950/30 space-y-2">
            <p className="font-bold text-amber-800 dark:text-amber-200">
              ⚠️ {t.lesson.judgeUnavailable}
            </p>
            <p className="text-xs text-amber-700 dark:text-amber-300">
              {t.lesson.judgeUnavailableHint}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                className="btn-primary !py-1.5 !text-xs"
                disabled={busy}
                onClick={() => void runBehaviorMode()}
              >
                🔄 {t.lesson.retryBehaviorCheck}
              </button>
              <button
                type="button"
                className="btn-secondary !py-1.5 !text-xs"
                onClick={() => {
                  setJudgeUnavailable(false);
                  handleModeChange("text");
                }}
              >
                📝 {t.lesson.switchToTextCheck}
              </button>
            </div>
          </div>
        )}

        {msg && (
          <pre className="max-h-40 overflow-auto rounded-xl bg-slate-900 p-3 text-xs text-green-300">
            {msg}
          </pre>
        )}
      </div>

      <div className="flex gap-2 pt-1">
        <button
          type="button"
          className="btn-primary"
          disabled={busy}
          onClick={() => {
            if (mode === "text") {
              void checkTextMode();
            } else {
              void runBehaviorMode();
            }
          }}
        >
          {busy
            ? locale === "en"
              ? "Running…"
              : "Виконуємо…"
            : mode === "text"
              ? locale === "en"
                ? "Check text"
                : "Перевірити (текст)"
              : locale === "en"
                ? "Run in judge"
                : "Запустити в judge"}
        </button>
      </div>
    </div>
  );
}

function NumericExercise({
  exercise,
  onAnswer,
}: {
  exercise: Exercise;
  onAnswer: (a: unknown) => void;
}) {
  const { locale, t } = useLocale();
  const prompt = usePrompt(exercise);
  const hint = useExerciseHint(exercise);
  const soft = useSoftAttempts(hint.setOpen);

  const fields = (exercise.fields as Array<{
    name?: string;
    labelUk?: string;
    labelEn?: string;
    unit?: string;
    placeholder?: string;
  }>) || [];

  const isMulti = fields.length > 0;
  const [singleVal, setSingleVal] = useState("");
  const [fieldVals, setFieldVals] = useState<Record<string, string>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const formula = typeof exercise.formula === "string" ? exercise.formula : null;
  const unit = typeof exercise.unit === "string" ? exercise.unit : "";

  const handleSubmit = () => {
    const rawAnswer = isMulti ? fieldVals : singleVal;
    const res = gradeNumericAnswer(rawAnswer, exercise as any);

    if (!res.correct) {
      if (res.fieldResults) {
        const errs: Record<string, string> = {};
        for (const [k, v] of Object.entries(res.fieldResults)) {
          if (!v.correct) errs[k] = v.error || "incorrect";
        }
        setFieldErrors(errs);
      }
      const failMsg =
        locale === "en"
          ? res.error === "unit_mismatch"
            ? "Incompatible or missing unit"
            : "Value out of tolerance"
          : res.error === "unit_mismatch"
            ? "Невірна або відсутня розмірність одиниць"
            : "Значення виходить за межі допустимої похибки";
      soft.registerFail(failMsg);
      return;
    }

    setFieldErrors({});
    soft.markOk();
    onAnswer(rawAnswer);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black text-slate-100" id={`ex-prompt-${exercise.id}`}>
        {prompt}
      </h2>

      {/* Optional Formula */}
      {formula && (
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center text-slate-100">
          <KaTeXMath math={formula} inline={false} />
        </div>
      )}

      {/* Helper text about SI prefixes and notation */}
      <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 text-xs text-slate-400">
        {locale === "en"
          ? "💡 Supports SI prefixes (p, n, µ/u, m, k, M/meg, G), decimal commas, and scientific notation (e.g. 1.2e-3)."
          : "💡 Підтримуються префікси СІ (p, n, µ/u, m, k, M/meg, G), коми замість крапок та експоненційна форма (напр. 1.2e-3)."}
      </div>

      {/* Input section */}
      {isMulti ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {fields.map((f) => {
            const fieldName = f.name || "val";
            const fieldLabel = (locale === "en" ? f.labelEn : f.labelUk) || fieldName;
            const fieldUnit = f.unit || "";
            const isErr = Boolean(fieldErrors[fieldName]);

            return (
              <div
                key={fieldName}
                className={clsx(
                  "p-3 rounded-xl border bg-slate-900/70 flex flex-col gap-1.5",
                  isErr ? "border-red-500/80" : "border-slate-800"
                )}
              >
                <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
                  <span>{fieldLabel}</span>
                  {fieldUnit && (
                    <span className="font-mono text-cyan-400 font-bold bg-slate-800 px-1.5 py-0.5 rounded text-[11px]">
                      {fieldUnit}
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  value={fieldVals[fieldName] ?? ""}
                  placeholder={f.placeholder || (fieldUnit ? `напр. 10 ${fieldUnit}` : "0")}
                  onChange={(e) =>
                    setFieldVals((prev) => ({ ...prev, [fieldName]: e.target.value }))
                  }
                  onKeyDown={handleKeyDown}
                  className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 font-mono text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <input
              type="text"
              value={singleVal}
              onChange={(e) => setSingleVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={unit ? `напр. 100 ${unit}` : "0"}
              aria-labelledby={`ex-prompt-${exercise.id}`}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 font-mono text-sm focus:outline-none focus:border-cyan-500 pr-14"
            />
            {unit && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-cyan-400 bg-slate-800 px-2 py-0.5 rounded pointer-events-none">
                {unit}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Feedback / hint */}
      <SoftFeedback
        wrong={soft.wrong}
        detail={soft.detail}
        attempts={soft.attempts}
        max={soft.max}
        mentorRank={soft.mentorRank}
      />

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={handleSubmit}
          className="btn-primary"
        >
          {t.lesson.check}
        </button>

        {soft.canSkip && (
          <button
            type="button"
            onClick={() => onAnswer(isMulti ? fieldVals : singleVal)}
            className="text-xs font-bold text-slate-400 hover:text-slate-200 underline"
          >
            {locale === "en" ? "Skip exercise" : "Пропустити завдання"}
          </button>
        )}
      </div>
    </div>
  );
}

function CircuitLabExerciseComponent({
  exercise,
  onAnswer,
}: {
  exercise: Exercise;
  onAnswer: (a: unknown) => void;
}) {
  const { locale } = useLocale();
  const prompt = usePrompt(exercise);
  const hint = useExerciseHint(exercise);
  const soft = useSoftAttempts(hint.setOpen);

  const t = getUI(locale === "en" ? "en" : "uk");
  const seeded = (exercise.circuit as CircuitDocument) || (exercise.circuitDocument as CircuitDocument);
  const initialDoc = seeded || {
    version: 2,
    title: (exercise.title as string) || "Lab Circuit",
    components: [],
    wires: [],
    junctions: [],
    mode: "schematic" as const,
  };

  const [currentDoc, setCurrentDoc] = useState<CircuitDocument>(initialDoc);
  const [simOutput, setSimOutput] = useState<RunSimOutput | null>(null);

  const criteria = (exercise.criteria as CircuitCriterion[]) || [];
  const analysis = (exercise.analysis as CircuitAnalysis) || {
    type: "tran",
    tran: { tStep: 1e-5, tStop: 5e-3 },
  };

  const handleSubmit = () => {
    soft.markOk();
    onAnswer({ circuit: currentDoc });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            {t.circuitLab.title}
          </span>
        </div>
        <h2 className="text-xl font-black text-slate-100" id={`ex-prompt-${exercise.id}`}>
          {prompt}
        </h2>
      </div>

      {/* Embedded Circuit Editor with SPICE engine and waveforms */}
      <CircuitEditor
        initialDoc={currentDoc}
        onChange={setCurrentDoc}
        initialAnalysis={analysis}
        criteria={criteria}
        onSimulationResult={(res) => {
          setSimOutput(res);
          if (res.ok) {
            soft.resetSoft();
          }
        }}
      />

      {/* Feedback / hint */}
      <SoftFeedback
        wrong={soft.wrong}
        detail={soft.detail}
        attempts={soft.attempts}
        max={soft.max}
        mentorRank={soft.mentorRank}
      />

      {simOutput && !simOutput.ok ? (
        <p className="text-sm font-bold text-amber-300">{t.circuitLab.simFailed}</p>
      ) : null}

      <div className="flex items-center gap-3 pt-3">
        <button
          type="button"
          onClick={handleSubmit}
          className="btn-primary"
        >
          {t.circuitLab.submitSolution}
        </button>

        {soft.canSkip && (
          <button
            type="button"
            onClick={() =>
              onAnswer({ circuit: currentDoc, skipped: true })
            }
            className="text-xs font-bold text-slate-400 hover:text-slate-200 underline"
          >
            {t.circuitLab.skipExercise}
          </button>
        )}
      </div>
    </div>
  );
}
