import { describe, expect, it, vi } from "vitest";

vi.mock("../db.js", () => ({ db: {} }));
const { classifyDrop, materialDrops, personalGoal, personalLine } = await import("./chess-game-analysis.js");
const { parseUciInfo, scoreToCp } = await import("./uci-engine.js");

describe("game analysis labels", () => {
  it("thresholds 150 / 80 / 40 and skips already-won positions", () => {
    expect(classifyDrop(30, -150)).toBe("blunder");
    expect(classifyDrop(600, 400)).toBe("mistake"); // blunder only inside ±500
    expect(classifyDrop(20, -70)).toBe("mistake");
    expect(classifyDrop(20, -30)).toBe("inaccuracy");
    expect(classifyDrop(20, 0)).toBeNull();
    expect(classifyDrop(900, 100)).toBeNull();
  });

  it("engine-free fallback flags material drops ≥ 300 within two plies", () => {
    // 1.e4 e5 2.Qh5 Nc6 3.Qxe5+?? Nxe5 — white loses the queen for a pawn.
    const fens = [
      "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
      "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
      "rnbqkbnr/pppp1ppp/8/4p2Q/4P3/8/PPPP1PPP/RNB1KBNR b KQkq - 1 2",
      "r1bqkbnr/pppp1ppp/2n5/4p2Q/4P3/8/PPPP1PPP/RNB1KBNR w KQkq - 2 3",
      "r1bqkbnr/pppp1ppp/2n5/4Q3/4P3/8/PPPP1PPP/RNB1KBNR b KQkq - 0 3",
      "r1bqkbnr/pppp1ppp/8/4n3/4P3/8/PPPP1PPP/RNB1KBNR w KQkq - 0 4",
    ];
    expect(materialDrops(fens, "w", "w")).toEqual([4]);
    expect(materialDrops(fens, "b", "w")).toEqual([]);
  });

  it("personal puzzle line ends on the learner's move; goal from eval", () => {
    expect(personalLine(["Qxe5+", "Nxe5", "Nf3", "d6"])).toEqual(["Qxe5+", "Nxe5", "Nf3"]);
    expect(personalLine(["Nf3", "d6"])).toEqual(["Nf3"]);
    expect(personalGoal({ cp: 2990, mate: 1 })).toBe("mate");
    expect(personalGoal({ cp: 350, mate: null })).toBe("win_material");
    expect(personalGoal({ cp: 30, mate: null })).toBe("best_move");
  });

  it("parses UCI info lines", () => {
    const r = parseUciInfo([
      "info depth 10 seldepth 12 score cp 34 nodes 1000 pv e2e4 e7e5 g1f3",
      "info depth 11 score cp 40 lowerbound pv d2d4",
      "bestmove e2e4 ponder e7e5",
    ]);
    expect(r).toEqual({ cp: 34, mate: null, bestUci: "e2e4", pv: ["e2e4", "e7e5", "g1f3"] });
    expect(scoreToCp("mate", 2)).toBe(2980);
    expect(scoreToCp("mate", -1)).toBe(-2990);
  });
});
