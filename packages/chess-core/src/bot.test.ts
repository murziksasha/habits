import { describe, expect, it } from "vitest";
import { Chess } from "chess.js";
import { analysePosition, chooseBotMove, evaluateBoard, gamePhase, staticEval } from "./bot.js";

describe("bot search (phase 8)", () => {
  it("quiescence: does not grab a defended pawn at the horizon", () => {
    // Rxd5?? Rxd5 — at depth 1 without quiescence this looks like +1 pawn.
    const r = analysePosition("3r2k1/8/8/3p4/8/8/8/3R2K1 w - - 0 1", 1);
    expect(r?.bestSan).not.toBe("Rxd5");
    expect(chooseBotMove("3r2k1/8/8/3p4/8/8/8/3R2K1 w - - 0 1", "club", { rng: () => 0.9 })?.san).not.toBe("Rxd5");
  });

  it("finds mate in 2", () => {
    const fen = "r5k1/5ppp/8/8/8/8/1R3PPP/1R4K1 w - - 0 1";
    const m = chooseBotMove(fen, "strong", { timeMs: 3000 });
    expect(m?.san).toBe("Rb8+");
  }, 15000);

  it("tapered eval: in a pawn ending the king belongs in the centre", () => {
    const centre = new Chess("8/p7/8/8/3K4/8/7P/7k w - - 0 1");
    const corner = new Chess("8/p7/8/8/8/8/7P/K6k w - - 0 1");
    expect(gamePhase(centre)).toBe(0);
    expect(staticEval(centre)).toBeGreaterThan(staticEval(corner) + 30);
    // With all pieces the king prefers safety.
    const start = new Chess();
    expect(gamePhase(start)).toBe(24);
    expect(Math.abs(evaluateBoard(start))).toBeLessThan(40);
  });

  it("king walks towards the centre in a K+P ending", () => {
    const m = chooseBotMove("8/8/8/4k3/8/8/4P3/K7 w - - 0 1", "strong", { timeMs: 400 });
    expect(m?.from).toBe("a1");
    expect(["b2", "b1"]).toContain(m?.to);
  });

  it("strong answers within about a second", () => {
    const t0 = Date.now();
    chooseBotMove("r2q1rk1/pb2bppp/1pn1pn2/2pp4/3P4/1PN1PN2/PBQ1BPPP/R4RK1 w - - 0 10", "strong", { rng: () => 0.9 });
    expect(Date.now() - t0).toBeLessThan(1500);
  });

  it("accepts the object form with a personality", () => {
    const m = chooseBotMove({ fen: "6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1", personality: "club", history: [] });
    expect(m?.san).toBe("Re8#");
  });

  it("converts K+Q vs K against a random defender (history-aware)", () => {
    const start = "8/8/8/4k3/8/8/8/4K2Q w - - 0 1";
    const g = new Chess(start);
    const history: string[] = [];
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < 40 && !g.isGameOver(); i += 1) {
      const m = chooseBotMove(g.fen(), "strong", { timeMs: 150, history, startFen: start });
      history.push(g.move(m!.san!).san);
      if (g.isGameOver()) break;
      const replies = g.moves();
      history.push(g.move(replies[Math.floor(rnd() * replies.length)]!).san);
    }
    expect(g.isCheckmate()).toBe(true);
  }, 30000);

  it("avoids a threefold repetition when winning", () => {
    const start = "4k3/8/8/8/8/8/8/R3K3 w - - 0 1";
    const history = ["Ra2", "Kd8", "Ra1", "Ke8", "Ra2", "Kd8", "Ra1", "Ke8"];
    const g = new Chess(start);
    for (const s of history) g.move(s);
    const m = chooseBotMove(g.fen(), "strong", { history, startFen: start, timeMs: 300 });
    expect(m?.san).not.toBe("Ra2");
  });
});
