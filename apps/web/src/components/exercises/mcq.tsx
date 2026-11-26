"use client";

import { useEffect, useMemo, useState } from "react";
import { localizeExerciseOptions } from "@eduforge/shared";
import clsx from "clsx";
import { useLocale } from "@/lib/locale-context";
import { SpeakButton } from "@/components/speak-button";
import { softGradeMcq } from "@/lib/client-grade";
import { hasOpenDialog, isTypingTarget, optionIndexFromKey } from "@/lib/answer-keys";
import { stableOptionOrder } from "@/lib/option-order";
import { type Exercise, usePrompt, CodeBlock, useExerciseHint, useSoftAttempts, DrillFooter, tutorHelpHref } from "./shared";

export function McqExercise({
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
