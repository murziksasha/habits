"use client";

/** 1–5 difficulty stars (chess puzzles). Decorative text is exposed via aria-label. */
export function DifficultyStars({ value, label }: { value: number; label: string }) {
  const n = Math.max(1, Math.min(5, Math.round(value)));
  return (
    <span className="inline-flex items-center gap-0.5 text-sm" aria-label={`${label}: ${n}/5`} data-testid="difficulty-stars">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} aria-hidden="true" className={i < n ? "text-amber-500" : "text-ink-muted/40"}>
          ★
        </span>
      ))}
    </span>
  );
}
