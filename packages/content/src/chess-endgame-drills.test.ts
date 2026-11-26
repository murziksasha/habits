import { describe, expect, it } from "vitest";
import { checkEndgameGoal, createGame } from "@eduforge/chess-core";
import { chessContent } from "./index.js";
import { ENDGAME_DRILL_SPECS } from "./chess-upgrade/endgame-drills.js";
import { CHESS_ENDGAME_QA } from "./chess-endgame-qa.generated.js";

const drills = chessContent.units.flatMap((u) =>
  u.lessons.flatMap((l) => l.exercises.filter((e) => e.type === "chess_endgame_drill").map((e) => ({ ...e, unit: u.slug, lesson: l.slug }))),
);

describe("chess endgame drills (phase 6)", () => {
  it("has ~18 drills: 10 win and 8 hold, all placed in lessons", () => {
    expect(ENDGAME_DRILL_SPECS.length).toBe(18);
    expect(drills.length).toBe(ENDGAME_DRILL_SPECS.length);
    expect(ENDGAME_DRILL_SPECS.filter((d) => d.goal === "draw").length).toBe(8);
    const units = new Set(drills.map((d) => d.unit));
    for (const u of ["ch-deep-kp-theory", "ch-deep-rook-theory", "ch-deep-minor-end", "endgames-intro"]) expect(units.has(u)).toBe(true);
  });

  it("ids are unique and positions are legal, live and bilingual", () => {
    expect(new Set(drills.map((d) => d.id)).size).toBe(drills.length);
    for (const d of drills) {
      const g = createGame(d.fen);
      expect(g.isGameOver(), d.id).toBe(false);
      expect(d.promptUk.length, d.id).toBeGreaterThan(10);
      expect(d.promptEn?.length ?? 0, d.id).toBeGreaterThan(10);
      expect(d.hintEn && d.hintUk && d.explanationEn && d.explanationUk, d.id).toBeTruthy();
      expect(checkEndgameGoal(d.fen, [], d.goal, d.maxMoves).status, d.id).toBe("in_progress");
    }
  });

  it("start evaluations match the goal (win/promote ≥ +500 or mate, draw within ±80)", () => {
    for (const d of drills) {
      const qa = CHESS_ENDGAME_QA[d.id];
      expect(qa, `${d.id}: run scripts/chess-qa/endgame-drill-qa.mjs`).toBeDefined();
      expect(qa!.fen, `${d.id}: stale QA`).toBe(d.fen);
      if (d.goal === "draw") {
        expect(qa!.mate, d.id).toBeNull();
        expect(Math.abs(qa!.cp ?? 0), d.id).toBeLessThanOrEqual(80);
      } else {
        const ok = (qa!.mate !== null && qa!.mate > 0) || (qa!.cp ?? 0) >= 500;
        expect(ok, `${d.id}: ${qa!.cp ?? `M${qa!.mate}`}`).toBe(true);
      }
    }
  });
});
