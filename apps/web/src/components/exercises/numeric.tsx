"use client";

import { useState } from "react";
import { gradeNumericAnswer } from "@eduforge/shared";
import clsx from "clsx";
import { useLocale } from "@/lib/locale-context";
import { KaTeXMath } from "@/components/circuit/katex-math";
import { type Exercise, usePrompt, useExerciseHint, useSoftAttempts, SoftFeedback } from "./shared";

export function NumericExercise({
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
