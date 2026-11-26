"use client";

import { useMemo } from "react";
import { Chess } from "@eduforge/chess-core";

const VALUE: Record<string, number> = { p: 1, n: 3, b: 3, r: 5, q: 9 };
const GLYPH: Record<"w" | "b", Record<string, string>> = {
  w: { p: "♙", n: "♘", b: "♗", r: "♖", q: "♕" },
  b: { p: "♟", n: "♞", b: "♝", r: "♜", q: "♛" },
};
const ORDER = ["q", "r", "b", "n", "p"];

/**
 * Captured pieces counted from the move history (not from the FEN, so promotions do not
 * break the count), with the material difference (+3).
 */
export function capturedFromHistory(startFen: string | null | undefined, sans: readonly string[]) {
  const g = startFen && startFen !== "startpos" ? new Chess(startFen) : new Chess();
  const byWhite: string[] = [];
  const byBlack: string[] = [];
  let diff = 0;
  for (const san of sans) {
    let m;
    try {
      m = g.move(san);
    } catch {
      break;
    }
    if (m.captured) {
      (m.color === "w" ? byWhite : byBlack).push(m.captured);
      diff += (m.color === "w" ? 1 : -1) * (VALUE[m.captured] ?? 0);
    }
    if (m.promotion) diff += (m.color === "w" ? 1 : -1) * ((VALUE[m.promotion] ?? 0) - 1);
  }
  const sort = (a: string[]) => [...a].sort((x, y) => ORDER.indexOf(x) - ORDER.indexOf(y));
  return { byWhite: sort(byWhite), byBlack: sort(byBlack), diff };
}

export function CapturedPieces({
  sans,
  startFen,
  side,
  label,
}: {
  sans: readonly string[];
  startFen?: string | null;
  /** Whose captures to show. */
  side: "w" | "b";
  label: string;
}) {
  const c = useMemo(() => capturedFromHistory(startFen, sans), [startFen, sans]);
  const list = side === "w" ? c.byWhite : c.byBlack;
  const adv = side === "w" ? c.diff : -c.diff;
  // Pieces captured by White are Black's pieces.
  const glyphs = GLYPH[side === "w" ? "b" : "w"];
  return (
    <div className="flex min-h-6 items-center gap-1 text-lg leading-none" aria-label={label} data-testid={`captured-${side}`}>
      <span aria-hidden>{list.map((p) => glyphs[p]).join("")}</span>
      {adv > 0 && <span className="text-xs font-bold text-ink-muted">+{adv}</span>}
    </div>
  );
}
