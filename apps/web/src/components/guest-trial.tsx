"use client";

import { useState } from "react";
import Link from "next/link";
import { guestTrialMcq } from "@eduforge/shared";
import { useLocale } from "@/lib/locale-context";
import clsx from "clsx";

/** Landing guest MCQ — soft gate to register. */
export function GuestTrial() {
  const { locale, t } = useLocale();
  const trial = guestTrialMcq(locale === "en" ? "en" : "uk");
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);

  const correct = selected === trial.correctIndex;

  return (
    <section className="card space-y-4 border-sky/30" aria-label={t.onboarding.guestTrial}>
      <p className="text-xs font-black uppercase text-sky">{t.onboarding.guestTrial}</p>
      <p className="text-lg font-black">{trial.prompt}</p>
      <div className="grid gap-2" role="listbox" aria-label="options">
        {trial.options.map((opt, i) => (
          <button
            key={opt}
            type="button"
            role="option"
            aria-selected={selected === i}
            className={clsx(
              "min-h-11 rounded-2xl border-2 px-4 py-3 text-left text-sm font-bold transition",
              selected === i
                ? "border-brand bg-brand-soft/40"
                : "border-slate-200 dark:border-slate-700",
              checked && i === trial.correctIndex && "border-brand bg-brand-soft",
              checked && selected === i && i !== trial.correctIndex && "border-red-400",
            )}
            onClick={() => {
              setSelected(i);
              setChecked(false);
            }}
          >
            {opt}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="btn-primary"
        disabled={selected == null}
        onClick={() => setChecked(true)}
      >
        {locale === "en" ? "Check" : "Перевірити"}
      </button>
      {checked && (
        <div
          className="space-y-2 rounded-2xl bg-slate-50 p-3 text-sm font-bold dark:bg-slate-900"
          role="status"
          aria-live="polite"
        >
          <p className={correct ? "text-brand-dark" : "text-red-500"}>
            {correct ? t.onboarding.guestCorrect : t.onboarding.guestWrong}
          </p>
          {correct && <p className="text-ink-muted">{trial.explanation}</p>}
          <Link href="/register?intent=code" className="btn-primary inline-flex !py-2 text-sm">
            {t.nav.register} →
          </Link>
        </div>
      )}
    </section>
  );
}
