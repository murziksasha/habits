"use client";

import { useEffect, useRef } from "react";

export type HistoryLabel = "blunder" | "mistake" | "inaccuracy" | "possible_blunder";

const LABEL_MARK: Record<HistoryLabel, string> = {
  blunder: "??",
  mistake: "?",
  inaccuracy: "?!",
  possible_blunder: "?",
};

/**
 * Move list in two columns (No. | White | Black). Clicking a move selects that ply
 * when `onSelect` is given (review mode); in a live game it is read-only.
 */
export function MoveHistoryPanel({
  sans,
  current,
  onSelect,
  labels,
  title,
  firstColor = "w",
  startMoveNumber = 1,
}: {
  sans: readonly string[];
  /** Index of the highlighted ply (−1 = start position). */
  current?: number;
  onSelect?: (ply: number) => void;
  labels?: ReadonlyMap<number, HistoryLabel>;
  title: string;
  firstColor?: "w" | "b";
  startMoveNumber?: number;
}) {
  const activeRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [current, sans.length]);

  const offset = firstColor === "b" ? 1 : 0;
  const rows: { no: number; white: number | null; black: number | null }[] = [];
  for (let slot = 0; slot < sans.length + offset; slot += 2) {
    const w = slot - offset;
    const b = slot + 1 - offset;
    rows.push({ no: startMoveNumber + slot / 2, white: w >= 0 && w < sans.length ? w : null, black: b < sans.length ? b : null });
  }
  const cell = (ply: number | null) => {
    if (ply === null) return <span className="px-2 text-ink-muted">…</span>;
    const label = labels?.get(ply);
    const active = ply === current;
    const cls = `rounded px-2 py-0.5 text-left font-mono text-sm ${active ? "bg-sky/20 font-black" : ""} ${
      label === "blunder" ? "text-rose-600" : label === "mistake" || label === "possible_blunder" ? "text-amber-600" : label ? "text-sky" : ""
    }`;
    const text = `${sans[ply]}${label ? LABEL_MARK[label] : ""}`;
    return onSelect ? (
      <button type="button" ref={active ? activeRef : undefined} className={cls} onClick={() => onSelect(ply)} aria-current={active ? "step" : undefined}>
        {text}
      </button>
    ) : (
      <span className={cls}>{text}</span>
    );
  };

  return (
    <section aria-label={title} className="space-y-1" data-testid="move-history">
      <h3 className="text-sm font-black">{title}</h3>
      <ol className="flex max-h-64 flex-row gap-2 overflow-auto md:flex-col md:gap-0">
        {rows.map((r) => (
          <li key={r.no} className="grid shrink-0 grid-cols-[2rem_1fr_1fr] items-center">
            <span className="text-xs text-ink-muted">{r.no}.</span>
            {cell(r.white)}
            {cell(r.black)}
          </li>
        ))}
      </ol>
    </section>
  );
}
