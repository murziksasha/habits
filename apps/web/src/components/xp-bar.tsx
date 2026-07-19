"use client";

import { xpProgressInLevel } from "@eduforge/shared";

export function XpBar({
  xp,
  label,
  color = "#58CC02",
}: {
  xp: number;
  label?: string;
  color?: string;
}) {
  const p = xpProgressInLevel(xp);
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs font-bold text-ink-muted">
        <span>{label ?? `Рівень ${p.level}`}</span>
        <span>
          {p.current}/{p.needed} XP
        </span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${p.ratio * 100}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
