"use client";

import clsx from "clsx";

export type FunnelBar = {
  key: string;
  label: string;
  value: number;
  /** Optional second color for dual bars */
  tone?: "brand" | "sky" | "grape" | "orange" | "muted";
};

const TONE: Record<NonNullable<FunnelBar["tone"]>, string> = {
  brand: "bg-brand",
  sky: "bg-sky",
  grape: "bg-grape",
  orange: "bg-orange-400",
  muted: "bg-slate-400",
};

/** Pure scale helper (unit-tested). */
export function funnelPercents(values: number[]): number[] {
  const max = Math.max(1, ...values.map((v) => Math.max(0, v)));
  return values.map((v) => Math.round((Math.max(0, v) / max) * 1000) / 10);
}

/**
 * Horizontal bar chart for product funnel — no chart library.
 */
export function FunnelChart({
  title,
  bars,
  className,
}: {
  title?: string;
  bars: FunnelBar[];
  className?: string;
}) {
  const pcts = funnelPercents(bars.map((b) => b.value));
  return (
    <div className={clsx("card space-y-3", className)}>
      {title ? <h3 className="text-sm font-black text-ink-muted">{title}</h3> : null}
      <ul className="space-y-3" role="list">
        {bars.map((b, i) => (
          <li key={b.key}>
            <div className="mb-1 flex items-baseline justify-between gap-2 text-sm font-bold">
              <span>{b.label}</span>
              <span className="tabular-nums text-ink-muted">{b.value}</span>
            </div>
            <div
              className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
              role="img"
              aria-label={`${b.label}: ${b.value} (${pcts[i]}%)`}
            >
              <div
                className={clsx(
                  "h-full rounded-full transition-all duration-500",
                  TONE[b.tone ?? "brand"],
                )}
                style={{ width: `${Math.max(pcts[i] ?? 0, b.value > 0 ? 2 : 0)}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
