"use client";

import { UI } from "@eduforge/shared";
import clsx from "clsx";

export function HeartsBar({
  hearts,
  max = 5,
  compact = false,
}: {
  hearts: number;
  max?: number;
  compact?: boolean;
}) {
  const shown = Math.min(max, Math.max(0, hearts));
  const unlimited = hearts >= 100;

  if (unlimited) {
    return (
      <div
        className={clsx(
          "inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 font-bold text-red-500",
          compact ? "text-xs" : "text-sm",
        )}
        title={UI.hearts.label}
      >
        ❤️ ∞
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "inline-flex items-center gap-0.5 rounded-full bg-red-50 px-2 py-1",
        compact ? "text-sm" : "text-base",
      )}
      title={`${UI.hearts.label}: ${shown}/${max}`}
    >
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={i < shown ? "opacity-100" : "opacity-25 grayscale"}>
          ❤️
        </span>
      ))}
      {!compact && (
        <span className="ml-1 text-xs font-bold text-red-500">
          {shown}/{max}
        </span>
      )}
    </div>
  );
}
