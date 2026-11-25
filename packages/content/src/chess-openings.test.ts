import { describe, expect, it } from "vitest";
import { REPERTOIRES } from "./chess-openings.js";
import { CHESS_OPENINGS_QA } from "./chess-openings-qa.generated.js";
import { chessContent } from "./index.js";

/** Depth-20 Stockfish noise is ±10–15 cp; main-line theory for Black sits near −50 at that depth. */
const MIN_CP = -60;

describe("opening repertoires QA (phase 7)", () => {
  it("each line ends no worse than −60 cp for the repertoire side and QA is fresh", () => {
    for (const r of REPERTOIRES)
      for (const l of r.lines) {
        const qa = CHESS_OPENINGS_QA[l.key];
        expect(qa, `${l.key}: run scripts/chess-qa/opening-qa.mjs`).toBeDefined();
        expect(qa!.moves, `${l.key}: stale QA`).toBe(l.sans.join(" "));
        if (qa!.mate !== null) expect(qa!.mate, l.key).toBeGreaterThan(0);
        else expect(qa!.cp!, l.key).toBeGreaterThanOrEqual(MIN_CP);
      }
  });

  it("repertoires point at existing course units", () => {
    const units = new Set(chessContent.units.map((u) => u.slug));
    for (const r of REPERTOIRES) expect(units.has(r.unit), r.unit).toBe(true);
  });
});
