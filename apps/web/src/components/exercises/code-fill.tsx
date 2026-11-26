"use client";

import { useState } from "react";
import { useLocale } from "@/lib/locale-context";
import { softGradeCodeFill } from "@/lib/client-grade";
import { type Exercise, usePrompt, CodeBlock, useExerciseHint, useSoftAttempts, DrillFooter, tutorHelpHref } from "./shared";

export function CodeFillExercise({
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
