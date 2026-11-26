"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { useLocale } from "@/lib/locale-context";
import { stableOptionOrder } from "@/lib/option-order";
import { FormattedFormulaText } from "@/components/circuit/katex-math";
import { type Exercise, usePrompt, CodeBlock } from "./shared";

/**
 * Concept card — theory / worked example before practice.
 * Shows body paragraphs, key points, optional read-only code and an optional self-check.
 */
export function ConceptExercise({
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
