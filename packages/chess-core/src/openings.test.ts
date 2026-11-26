import { describe, expect, it } from "vitest";
import { Chess } from "chess.js";
import { chooseBotMove } from "./bot.js";
import {
  REPERTOIRES,
  buildOpeningBook,
  findOpeningLine,
  getRepertoire,
  gradeOpeningAttempt,
  learnerPlies,
  openingChildren,
  type OpeningNode,
} from "./openings.js";

describe("opening repertoires", () => {
  it("covers the 8 course openings with ≥3 commented lines each", () => {
    expect(REPERTOIRES.map((r) => r.id).sort()).toEqual(
      ["caro-kann", "french", "italian", "kings-indian", "london", "queens-gambit", "ruy-lopez", "sicilian"].sort(),
    );
    for (const r of REPERTOIRES) {
      expect(r.lines.length, r.id).toBeGreaterThanOrEqual(3);
      for (const l of r.lines) {
        const cs = Object.entries(l.comments);
        expect(cs.length, l.key).toBeGreaterThanOrEqual(2);
        for (const [ply, [uk, en]] of cs) {
          expect(uk.length && en.length, `${l.key}@${ply}`).toBeTruthy();
          // Comments explain the learner's own moves.
          expect(Number(ply) % 2, `${l.key}@${ply}`).toBe(r.side === "w" ? 0 : 1);
        }
        // 5–10 full moves deep.
        expect(l.sans.length, l.key).toBeGreaterThanOrEqual(10);
        expect(l.sans.length, l.key).toBeLessThanOrEqual(20);
      }
    }
  });

  it("every move is legal and line keys are unique", () => {
    const keys = new Set<string>();
    for (const r of REPERTOIRES)
      for (const l of r.lines) {
        expect(keys.has(l.key)).toBe(false);
        keys.add(l.key);
        const g = new Chess();
        for (const san of l.sans) expect(() => g.move(san), `${l.key}: ${san}`).not.toThrow();
      }
  });

  it("trees have no duplicate siblings and transpositions share one FEN", () => {
    const fenByPath = new Map<string, string>();
    const walk = (nodes: OpeningNode[], g: Chess, path: string[]) => {
      const sans = nodes.map((n) => n.san);
      expect(new Set(sans).size).toBe(sans.length);
      for (const n of nodes) {
        g.move(n.san);
        const p = [...path, n.san];
        const key = p.join(" ");
        const prev = fenByPath.get(key);
        if (prev) expect(prev).toBe(g.fen());
        fenByPath.set(key, g.fen());
        walk(n.children ?? [], g, p);
        g.undo();
      }
    };
    for (const r of REPERTOIRES) walk(r.root, new Chess(), []);
    // Same move order from two repertoires (e.g. 1.e4 e5 2.Nf3 Nc6) yields one FEN.
    expect(fenByPath.size).toBeGreaterThan(100);
  });

  it("grades a line attempt server-side from the learner's tries", () => {
    const rep = getRepertoire("italian")!;
    const line = findOpeningLine("italian", "italian:giuoco-pianissimo")!;
    const plies = learnerPlies(rep, line);
    const clean = plies.map((p) => [line.sans[p]!]);
    expect(gradeOpeningAttempt(rep, line, clean)).toMatchObject({ correct: true, mistakes: 0, valid: true });
    const oneMiss = clean.map((t, i) => (i === 2 ? ["d4", ...t] : t));
    expect(gradeOpeningAttempt(rep, line, oneMiss)).toMatchObject({ correct: false, mistakes: 1, valid: true });
    expect(gradeOpeningAttempt(rep, line, clean.slice(1)).valid).toBe(false);
    expect(gradeOpeningAttempt(rep, line, clean.map(() => ["h4"])).valid).toBe(false);
    const black = getRepertoire("sicilian")!;
    expect(learnerPlies(black, black.lines[0]!)[0]).toBe(1);
  });

  it("builds a book from the trees", () => {
    const book = buildOpeningBook();
    const start = book.get("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -")!;
    expect(start.all).toEqual(expect.arrayContaining(["e4", "d4"]));
    expect(openingChildren(getRepertoire("french")!, ["e4", "e6", "d4"])?.map((n) => n.san)).toEqual(["d5"]);
    expect(openingChildren(getRepertoire("french")!, ["d4"])).toBeNull();
  });
});

describe("bot opening book from repertoires", () => {
  it("in 'play an opening' mode the bot follows the tree", () => {
    const g = new Chess();
    for (const san of ["e4", "c5", "Nf3"]) g.move(san);
    for (let i = 0; i < 10; i += 1) {
      const m = chooseBotMove(g.fen(), "strong", { openingId: "sicilian", history: ["e4", "c5", "Nf3"], rng: () => i / 10 });
      expect(["d6"]).toContain(m?.san);
    }
  });
  it("in a repertoire position the bot plays a tree move", () => {
    const g = new Chess();
    for (const san of ["e4", "e6", "d4", "d5"]) g.move(san);
    const m = chooseBotMove(g.fen(), "club", { rng: () => 0.1 });
    expect(["e5", "exd5", "Nc3", "Nd2"]).toContain(m?.san);
  });
});
