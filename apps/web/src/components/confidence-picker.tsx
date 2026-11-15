"use client";

import clsx from "clsx";
import { CONFIDENCE_META, type ConfidenceLevel } from "@eduforge/shared";
import { useLocale } from "@/lib/locale-context";

/** Types where a confidence rating makes sense (knowledge checks). */
const RATEABLE = new Set([
  "mcq",
  "logic_puzzle",
  "code_read",
  "code_output",
  "code_fill",
  "code_order",
  "fill_blank",
  "translate",
  "match",
  "order_words",
  "explain",
  "chess_puzzle",
]);

export function isConfidenceRateable(type: string): boolean {
  return RATEABLE.has(type);
}

/**
 * "How sure are you?" — optional metacognition rating before answering (SPEC 92).
 */
export function ConfidencePicker({
  value,
  onChange,
}: {
  value: ConfidenceLevel | null;
  onChange: (v: ConfidenceLevel | null) => void;
}) {
  const { locale } = useLocale();
  const en = locale === "en";
  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label={en ? "Confidence" : "Впевненість"}>
      <span className="text-xs font-black uppercase text-ink-muted">
        {en ? "How sure are you?" : "Наскільки ви впевнені?"}
      </span>
      {([3, 2, 1] as ConfidenceLevel[]).map((lvl) => {
        const m = CONFIDENCE_META[lvl];
        const active = value === lvl;
        return (
          <button
            key={lvl}
            type="button"
            aria-pressed={active}
            className={clsx(
              "rounded-full border-2 px-3 py-1 text-xs font-bold",
              active ? "border-grape bg-grape/10 text-grape" : "border-slate-200 dark:border-slate-700",
            )}
            onClick={() => onChange(active ? null : lvl)}
          >
            {m.icon} {en ? m.en : m.uk}
          </button>
        );
      })}
    </div>
  );
}
