"use client";

import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { useLocale } from "@/lib/locale-context";
import { softGradeCodeOrder } from "@/lib/client-grade";
import { hasOpenDialog, isTypingTarget, optionIndexFromKey } from "@/lib/answer-keys";
import { stableOptionOrder } from "@/lib/option-order";
import { orderLabel } from "@/lib/order-labels";
import { type Exercise, usePrompt, useExerciseHint, useSoftAttempts, DrillFooter, tutorHelpHref } from "./shared";

export function OrderWordsExercise({
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
