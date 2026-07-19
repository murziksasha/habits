"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { exercisePrompt, UI } from "@eduforge/shared";
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
  softGradeMcq,
} from "@/lib/client-grade";
import {
  formatExerciseSolution,
  getApplyableAnswer,
} from "@/lib/exercise-solution";

export type Exercise = {
  id: string;
  type: string;
  promptUk: string;
  promptEn?: string;
  [key: string]: unknown;
};

const ExamModeCtx = createContext(false);

function usePrompt(exercise: Exercise) {
  const { locale } = useLocale();
  return exercisePrompt(locale, exercise);
}

export function ExercisePlayer({
  exercise,
  onAnswer,
  examMode = false,
}: {
  exercise: Exercise;
  onAnswer: (answer: unknown) => void;
  /** Unit exams: no skip / solution reveal */
  examMode?: boolean;
}) {
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
      default:
        return <p>Невідомий тип: {exercise.type}</p>;
    }
  })();

  return <ExamModeCtx.Provider value={examMode}>{body}</ExamModeCtx.Provider>;
}

function CodeBlock({ code, language }: { code: string; language?: string }) {
  if (!code) return null;
  return (
    <MonacoCodeEditor
      value={code}
      onChange={() => undefined}
      language={language || "javascript"}
      height="200px"
      readOnly
    />
  );
}

function useExerciseHint(exercise: Exercise) {
  const { locale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const text =
    locale === "en"
      ? String(exercise.hintEn || exercise.explanationEn || exercise.hintUk || exercise.explanationUk || "")
      : String(exercise.hintUk || exercise.explanationUk || exercise.hintEn || exercise.explanationEn || "");
  const has = Boolean(text.trim());
  return {
    has,
    open,
    setOpen,
    text,
    t,
    panel: has ? (
      <div className="space-y-1">
        <button
          type="button"
          className="text-xs font-bold text-grape hover:underline"
          onClick={() => setOpen((v) => !v)}
        >
          💡 {open ? t.lesson.hideHint : t.lesson.showHint}
        </button>
        {open ? (
          <p className="rounded-xl bg-grape/10 px-3 py-2 text-sm font-bold text-ink">
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
  const [attempts, setAttempts] = useState(0);
  const [wrong, setWrong] = useState(false);
  const [detail, setDetail] = useState<string | null>(null);

  function registerFail(msg?: string | null) {
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

  const canSkip = !examMode && attempts >= SOFT_MAX_ATTEMPTS;

  return {
    attempts,
    wrong,
    detail,
    canSkip,
    max: SOFT_MAX_ATTEMPTS,
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
}: {
  wrong: boolean;
  detail?: string | null;
  attempts?: number;
  max?: number;
}) {
  const { t } = useLocale();
  if (!wrong && !attempts) return null;
  return (
    <div className="space-y-1">
      {wrong ? (
        <div className="rounded-xl border-2 border-red-200 bg-red-50 px-3 py-2 text-sm font-bold text-red-600 dark:border-red-900 dark:bg-red-950/40">
          {t.lesson.wrong} · {t.lesson.tryAgain}
          {detail ? (
            <p className="mt-1 text-xs font-semibold text-red-500/90">
              {t.lesson.missingParts}: {detail}
            </p>
          ) : null}
        </div>
      ) : null}
      {typeof attempts === "number" && attempts > 0 ? (
        <p className="text-xs font-bold text-ink-muted">
          {t.lesson.attempts}: {attempts}/{max ?? SOFT_MAX_ATTEMPTS}
          {attempts >= (max ?? SOFT_MAX_ATTEMPTS) ? ` · ${t.lesson.skipHint}` : ""}
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
      />
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="btn-primary"
          disabled={!canCheck}
          onClick={onCheck}
        >
          {UI.lesson.check}
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
            onClick={() => setShowSol((v) => !v)}
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
  const prompt = usePrompt(exercise);
  const options = (exercise.options as string[]) ?? [];
  const [selected, setSelected] = useState<number | null>(null);
  const hint = useExerciseHint(exercise);
  const soft = useSoftAttempts(hint.setOpen);
  const speakSrc =
    typeof exercise.source === "string"
      ? String(exercise.source)
      : options[0] ?? prompt;
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

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black">{prompt}</h2>
      {code ? (
        <CodeBlock code={code} language={String(exercise.language ?? "")} />
      ) : (
        <SpeakButton text={speakSrc} lang="en-US" showPractice />
      )}
      {hint.panel}
      <div className="grid gap-2">
        {options.map((opt, i) => (
          <button
            key={i}
            type="button"
            className={clsx(
              "rounded-2xl border-2 px-4 py-3 text-left font-bold transition",
              selected === i ? "border-sky bg-sky/10" : "border-slate-200 hover:bg-slate-50",
            )}
            onClick={() => {
              setSelected(i);
              soft.resetSoft();
            }}
          >
            {opt}
          </button>
        ))}
      </div>
      <DrillFooter
        canCheck={selected !== null}
        onCheck={check}
        soft={soft}
        skipAnswer={selected ?? 0}
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
      <h2 className="text-xl font-black">{prompt}</h2>
      <SpeakButton text={source} lang="en-US" showPractice />
      {exercise.source ? (
        <p className="rounded-2xl bg-slate-100 px-4 py-3 font-bold dark:bg-slate-900">
          {String(exercise.source)}
        </p>
      ) : null}
      {exercise.sentence ? (
        <p className="rounded-2xl bg-slate-100 px-4 py-3 font-bold">{String(exercise.sentence)}</p>
      ) : null}
      <input className="input" value={value} onChange={(e) => setValue(e.target.value)} />
      <button className="btn-primary" disabled={!value.trim()} onClick={() => onAnswer(value)}>
        {UI.lesson.check}
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
  const pairs = (exercise.pairs as { left: string; right: string }[]) ?? [];
  const rights = useMemo(
    () => [...pairs.map((p) => p.right)].sort(() => Math.random() - 0.5),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [exercise.id],
  );
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matched, setMatched] = useState<{ left: string; right: string }[]>([]);

  function pickRight(right: string) {
    if (!selectedLeft) return;
    if (matched.some((m) => m.right === right || m.left === selectedLeft)) return;
    setMatched((m) => [...m, { left: selectedLeft, right }]);
    setSelectedLeft(null);
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black">{usePrompt(exercise)}</h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          {pairs.map((p) => (
            <button
              key={p.left}
              type="button"
              disabled={matched.some((m) => m.left === p.left)}
              className={clsx(
                "w-full rounded-2xl border-2 px-3 py-2 font-bold",
                selectedLeft === p.left ? "border-sky bg-sky/10" : "border-slate-200",
              )}
              onClick={() => setSelectedLeft(p.left)}
            >
              {p.left}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {rights.map((r) => (
            <button
              key={r}
              type="button"
              disabled={matched.some((m) => m.right === r)}
              className="w-full rounded-2xl border-2 border-slate-200 px-3 py-2 font-bold"
              onClick={() => pickRight(r)}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <button
        className="btn-primary"
        disabled={matched.length !== pairs.length}
        onClick={() => onAnswer(matched)}
      >
        {UI.lesson.check}
      </button>
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
      <p className="text-xs font-bold text-ink-muted">Your answer (fill ___)</p>
      <MonacoCodeEditor
        value={value}
        onChange={(v) => {
          setValue(v);
          soft.resetSoft();
        }}
        language={String(exercise.language ?? "javascript")}
        height="100px"
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
        <div>
          {current ? (
            <MonacoCodeEditor
              key={current.id}
              value={contents[current.id] ?? ""}
              onChange={(v) => {
                setContents((c) => ({ ...c, [current.id]: v }));
                soft.resetSoft();
              }}
              language={current.language || "javascript"}
              height="280px"
            />
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
              className="h-[280px] w-full bg-white"
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
    const w = [...raw];
    return w.sort(() => Math.random() - 0.5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exercise.id]);
  const [pool, setPool] = useState(words);
  const [built, setBuilt] = useState<string[]>([]);
  const isCode = exercise.type === "code_order" || Boolean(exercise.language);
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

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black">{usePrompt(exercise)}</h2>
      {isCode && (
        <p className="text-xs font-bold text-ink-muted font-mono">
          {String(exercise.language ?? "code")}
        </p>
      )}
      {hint.panel}
      <div className="min-h-14 rounded-2xl border-2 border-dashed border-slate-300 p-3 flex flex-wrap gap-2">
        {built.map((w, i) => (
          <button
            key={`${w}-${i}`}
            type="button"
            className={clsx(
              "rounded-xl bg-sky/15 px-3 py-1 font-bold",
              isCode && "font-mono text-sm",
            )}
            onClick={() => {
              setBuilt((b) => b.filter((_, j) => j !== i));
              setPool((p) => [...p, w]);
              soft.resetSoft();
            }}
          >
            {w}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {pool.map((w, i) => (
          <button
            key={`${w}-${i}`}
            type="button"
            className={clsx(
              "rounded-xl border-2 border-slate-200 px-3 py-1 font-bold dark:border-slate-700",
              isCode && "font-mono text-sm",
            )}
            onClick={() => {
              setPool((p) => p.filter((_, j) => j !== i));
              setBuilt((b) => [...b, w]);
              soft.resetSoft();
            }}
          >
            {w}
          </button>
        ))}
      </div>
      <DrillFooter
        canCheck={Boolean(built.length)}
        onCheck={check}
        soft={soft}
        skipAnswer={built.length ? built : correct}
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
    if (!started || value.length < 2) return 0;
    const minutes = (Date.now() - started) / 60000;
    return Math.round(value.length / 5 / Math.max(minutes, 0.01));
  }, [value, started]);

  const done = value.length >= text.length;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black">{usePrompt(exercise)}</h2>
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
          if (!started) setStarted(Date.now());
          setValue(e.target.value);
        }}
        placeholder="Почніть друкувати…"
      />
      <div className="flex gap-4 text-sm font-bold">
        <span>
          {UI.typing.wpm}: {wpm}
        </span>
        <span>
          {UI.typing.accuracy}: {Math.round(accuracy * 100)}%
        </span>
      </div>
      <button
        className="btn-primary"
        disabled={!done}
        onClick={() => onAnswer({ wpm, accuracy, completed: true })}
      >
        {UI.lesson.check}
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
  const words = String(exercise.text ?? "").split(/\s+/).filter(Boolean);
  const wpm = Number(exercise.wpm ?? 240);
  const [i, setI] = useState(-1);
  const [running, setRunning] = useState(false);

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
        {UI.reading.wpm}: {wpm}
      </p>
      {!running && !finished && (
        <button
          className="btn-sky"
          onClick={() => {
            setI(0);
            setRunning(true);
          }}
        >
          {UI.reading.startRsvp}
        </button>
      )}
      {finished && (
        <button className="btn-primary" onClick={() => onAnswer({ completed: true })}>
          {UI.lesson.continue}
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
  const questions = (exercise.questions as { q: string; options: string[] }[]) ?? [];
  const [answers, setAnswers] = useState<(number | null)[]>(questions.map(() => null));
  const [showQs, setShowQs] = useState(false);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black">{usePrompt(exercise)}</h2>
      <div className="rounded-2xl bg-slate-100 p-4 leading-relaxed">{String(exercise.passage)}</div>
      {!showQs ? (
        <button className="btn-primary" onClick={() => setShowQs(true)}>
          До питань
        </button>
      ) : (
        <>
          {questions.map((q, qi) => (
            <div key={qi} className="space-y-2">
              <p className="font-bold">{q.q}</p>
              {q.options.map((opt, oi) => (
                <button
                  key={oi}
                  type="button"
                  className={clsx(
                    "block w-full rounded-xl border-2 px-3 py-2 text-left font-semibold",
                    answers[qi] === oi ? "border-sky bg-sky/10" : "border-slate-200",
                  )}
                  onClick={() =>
                    setAnswers((a) => a.map((v, i) => (i === qi ? oi : v)))
                  }
                >
                  {opt}
                </button>
              ))}
            </div>
          ))}
          <button
            className="btn-primary"
            disabled={answers.some((a) => a === null)}
            onClick={() => onAnswer(answers)}
          >
            {UI.lesson.check}
          </button>
        </>
      )}
    </div>
  );
}

function ChessPuzzleExercise({
  exercise,
  onAnswer,
}: {
  exercise: Exercise;
  onAnswer: (a: unknown) => void;
}) {
  const fen = String(exercise.fen);
  const solution = (exercise.solutionSans as string[]) ?? [];
  const [game, setGame] = useState(() => new Chess(fen));
  const [sans, setSans] = useState<string[]>([]);
  const [msg, setMsg] = useState("");

  function onDrop(from: string, to: string) {
    const g = new Chess(game.fen());
    try {
      const move = g.move({ from, to, promotion: "q" });
      if (!move) return false;
      const nextSans = [...sans, move.san];
      setSans(nextSans);
      setGame(g);
      const expected = solution[nextSans.length - 1];
      const norm = (s: string) => s.replace(/[+#]/g, "");
      if (expected && norm(move.san) !== norm(expected)) {
        setMsg("Не той хід — спробуйте ще");
        setTimeout(() => {
          setGame(new Chess(fen));
          setSans([]);
          setMsg("");
        }, 800);
        return true;
      }
      if (nextSans.length >= solution.length) {
        setMsg(UI.lesson.correct);
        onAnswer({ solved: true, sans: nextSans });
      }
      return true;
    } catch {
      return false;
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black">{usePrompt(exercise)}</h2>
      <div className="mx-auto max-w-md">
        <Chessboard position={game.fen()} onPieceDrop={onDrop} boardWidth={360} />
      </div>
      {msg && <p className="font-bold text-center">{msg}</p>}
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
  const quiz = exercise.quiz as { q: string; options: string[]; correctIndex: number } | undefined;
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black">{usePrompt(exercise)}</h2>
      <div className="mx-auto max-w-md">
        <Chessboard position={String(exercise.fen)} arePiecesDraggable={false} boardWidth={360} />
      </div>
      <p className="rounded-2xl bg-slate-100 p-4 leading-relaxed">{String(exercise.notesUk)}</p>
      {quiz ? (
        <>
          <p className="font-bold">{quiz.q}</p>
          <div className="grid gap-2">
            {quiz.options.map((opt, i) => (
              <button
                key={i}
                type="button"
                className={clsx(
                  "rounded-2xl border-2 px-4 py-3 text-left font-bold",
                  selected === i ? "border-sky bg-sky/10" : "border-slate-200",
                )}
                onClick={() => setSelected(i)}
              >
                {opt}
              </button>
            ))}
          </div>
          <button
            className="btn-primary"
            disabled={selected === null}
            onClick={() => selected !== null && onAnswer(selected)}
          >
            {UI.lesson.check}
          </button>
        </>
      ) : (
        <button className="btn-primary" onClick={() => onAnswer(true)}>
          {UI.lesson.continue}
        </button>
      )}
    </div>
  );
}
