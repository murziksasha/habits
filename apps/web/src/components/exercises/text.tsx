"use client";

import { useState } from "react";
import { useLocale } from "@/lib/locale-context";
import { SpeakButton } from "@/components/speak-button";
import { type Exercise, usePrompt } from "./shared";

export function TextExercise({
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
