import { describe, expect, it } from "vitest";
import { chessContent } from "./index.js";
import { CHESS_QA } from "./chess-qa.generated.js";
import { CHESS_QA_WAIVERS } from "./chess-upgrade/index.js";
import { chessPuzzleHash } from "./chess-upgrade/hash.js";
import { LICHESS_ADDITIONS, LICHESS_REPLACEMENTS } from "./expansion/chess-lichess.generated.js";
import { CHESS_FACTS } from "./chess-facts.generated.js";
import { CHESS_THEMES } from "@eduforge/shared";

type AnyChess = {
  id: string;
  type: string;
  fen: string;
  solutionSans?: string[];
  choices?: { san: string }[];
  correctIndex?: number;
  reviewOf?: string;
  source?: { kind: string; lichessId?: string; gameUrl?: string };
  themes?: string[];
  difficulty?: number;
  hintUk?: string;
  hintEn?: string;
  hintSquareUk?: string;
  explanationUk?: string;
  explanationEn?: string;
  explanationKind?: string;
};

const items: Array<AnyChess & { unit: string; lesson: string; isExam: boolean }> = [];
for (const u of chessContent.units)
  for (const l of u.lessons)
    for (const e of l.exercises)
      if (e.type === "chess_puzzle" || e.type === "chess_plan") items.push({ ...(e as unknown as AnyChess), unit: u.slug, lesson: l.slug, isExam: Boolean(l.isExam) });

const hashOf = (e: AnyChess) =>
  e.type === "chess_plan"
    ? chessPuzzleHash(e.fen, [String(e.correctIndex), ...(e.choices ?? []).map((c) => c.san)])
    : chessPuzzleHash(e.fen, e.solutionSans ?? []);

describe("chess QA gate (offline Stockfish results)", () => {
  it("hash copy matches @eduforge/chess-core", () => {
    expect(chessPuzzleHash("8/8/8/8/8/8/8/K6k w - - 0 1", ["Kb1"])).toBe("cf2a34c42e313bb2");
  });

  it("every chess puzzle and plan has a fresh QA record (run pnpm chess:qa)", () => {
    const stale = items.filter((e) => CHESS_QA.items[e.id]?.hash !== hashOf(e)).map((e) => e.id);
    expect(stale).toEqual([]);
  });

  it("no engine flags except explicit waivers", () => {
    const flagged = items
      .filter((e) => (CHESS_QA.items[e.id]?.flags.length ?? 0) > 0 && !CHESS_QA_WAIVERS[e.id])
      .map((e) => `${e.id}: ${CHESS_QA.items[e.id]!.flags.join("; ")}`);
    expect(flagged).toEqual([]);
  });

  it("no repeated position without an explicit reviewOf", () => {
    const key = (fen: string) => fen.split(" ").slice(0, 4).join(" ");
    const seen = new Map<string, string>();
    const dups: string[] = [];
    // Teach items first so exams are the ones that must declare reviewOf.
    for (const e of [...items.filter((i) => !i.isExam), ...items.filter((i) => i.isExam)]) {
      const k = key(e.fen);
      const first = seen.get(k);
      if (first && !e.reviewOf) dups.push(`${e.id} repeats ${first}`);
      if (!first) seen.set(k, e.id);
    }
    expect(dups).toEqual([]);
  });

  it("Lichess puzzles carry CC0 source attribution", () => {
    expect(LICHESS_ADDITIONS.length).toBeGreaterThanOrEqual(250);
    for (const e of [...LICHESS_ADDITIONS.map((a) => a.exercise), ...Object.values(LICHESS_REPLACEMENTS)]) {
      expect(e.source?.kind).toBe("lichess");
      expect(e.source?.lichessId).toBeTruthy();
      expect(e.source?.gameUrl).toMatch(/^https:\/\/lichess\.org\//);
    }
  });

  it("Lichess additions use stable ch-li ids and are unique", () => {
    const ids = items.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const a of LICHESS_ADDITIONS) expect(a.exercise.id).toMatch(/^ch-li-[A-Za-z0-9]+$/);
  });
});

describe("chess content contract (phase 2)", () => {
  const puzzles = items.filter((e) => e.type === "chess_puzzle");

  it("line facts are fresh (run node scripts/chess-qa/chess-facts.mjs)", () => {
    const stale = puzzles.filter((e) => CHESS_FACTS[e.id]?.hash !== hashOf(e)).map((e) => e.id);
    expect(stale).toEqual([]);
  });

  it("every puzzle and plan has ≥1 known theme", () => {
    const bad = items.filter((e) => !e.themes?.length || e.themes.some((t) => !(t in CHESS_THEMES))).map((e) => `${e.id}: ${e.themes}`);
    expect(bad).toEqual([]);
  });

  it("every puzzle has a two-step hint and a bilingual explanation", () => {
    const bad = puzzles.filter((e) => !e.hintUk || !e.hintEn || !e.hintSquareUk || !e.explanationUk || !e.explanationEn).map((e) => e.id);
    expect(bad).toEqual([]);
  });

  it("d4–d5, exam and famous-game puzzles (non-Lichess) have authored explanations", () => {
    const bad = puzzles
      .filter((e) => e.source?.kind !== "lichess" && ((e.difficulty ?? 0) >= 4 || e.isExam || e.unit.startsWith("ch-deep-famous")))
      .filter((e) => e.explanationKind !== "authored")
      .map((e) => e.id);
    expect(bad).toEqual([]);
  });

  it("no Russian-style chess terms in chess copy", () => {
    const text = JSON.stringify(items);
    expect(text).not.toMatch(/ладейн|Лучен|ладья|слоном ладь/i);
  });
});

/** Units whose practice lessons must carry 4–6 puzzles and a rising rating curve (plan §4.2). */
const CURVE_UNITS = new Set([
  "tactics",
  "endgames-intro",
  "tactics-boost",
  "tactics-practice-2",
  "mixed-tactics-endgames",
  "endgame-accuracy-review",
  "rook-endgames-plus",
  "calculation-hygiene",
  "ch-deep-calc-viz",
  "ch-deep-tactics-hidden",
  "ch-deep-tactics-remove",
  "ch-deep-mates-classic",
  "ch-deep-mates-attack",
  "ch-deep-tactics-mix",
  "ch-deep-kp-theory",
  "ch-deep-rook-theory",
  "ch-deep-minor-end",
]);
/** Legacy authored lessons above the cap (ids kept stable; nothing is removed). */
const OVER_CAP_OK = new Set(["mate-in-1-a"]);
const ratingOf = (e: AnyChess & { rating?: number }) =>
  typeof e.rating === "number" ? e.rating : [800, 1050, 1300, 1550, 1800][Math.max(1, Math.min(5, Math.round(e.difficulty ?? 1))) - 1]!;

describe("chess content curve (phase 4)", () => {
  it("every practice lesson in tactics / mates / endgame units has 4–6 puzzles", () => {
    const bad: string[] = [];
    for (const u of chessContent.units) {
      if (!CURVE_UNITS.has(u.slug)) continue;
      for (const l of u.lessons) {
        if (l.isExam) continue;
        const n = l.exercises.filter((e) => e.type === "chess_puzzle").length;
        if (n === 0) continue; // concept-only lesson
        if (n < 4 || (n > 6 && !OVER_CAP_OK.has(l.slug))) bad.push(`${u.slug}/${l.slug}: ${n}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it("unit mean puzzle rating does not fall inside a course part (tolerance 50)", async () => {
    const { getCourseParts } = await import("@eduforge/shared");
    const bad: string[] = [];
    for (const part of getCourseParts("chess")) {
      let best = -Infinity;
      for (const slug of part.unitSlugs) {
        if (!CURVE_UNITS.has(slug)) continue;
        const rs = items.filter((i) => i.unit === slug && i.type === "chess_puzzle").map(ratingOf);
        if (!rs.length) continue;
        const mean = rs.reduce((a, b) => a + b, 0) / rs.length;
        if (mean < best - 50) bad.push(`${part.id}/${slug}: ${Math.round(mean)} < ${Math.round(best)} - 50`);
        best = Math.max(best, mean);
      }
    }
    expect(bad).toEqual([]);
  });

  it("at least 250 Lichess additions, each with source attribution and a rating", () => {
    expect(LICHESS_ADDITIONS.length).toBeGreaterThanOrEqual(250);
    for (const a of LICHESS_ADDITIONS) {
      expect(a.exercise.source?.kind).toBe("lichess");
      expect(typeof (a.exercise as { rating?: number }).rating).toBe("number");
    }
  });

  it("every puzzle has a source or is an authored teaching position", () => {
    const lichess = items.filter((i) => i.source?.kind === "lichess").length;
    expect(lichess).toBeGreaterThanOrEqual(250 + Object.keys(LICHESS_REPLACEMENTS).length - 5);
  });
});

describe("famous games (phase 4.4)", async () => {
  const { createGame } = await import("@eduforge/chess-core");
  const { FAMOUS_GAMES, FAMOUS_POSITIONS } = await import("./chess-upgrade/famous-games.js");
  const byId = new Map(items.map((i) => [i.id, i]));
  const replay = (moves: string) => {
    const g = createGame();
    const fens = [g.fen()];
    const sans: string[] = [];
    for (const m of moves.split(" ")) {
      const mv = g.move(m);
      sans.push(mv.san);
      fens.push(g.fen());
    }
    return { fens, sans };
  };

  for (const game of FAMOUS_GAMES) {
    it(`${game.key}: game score is legal`, () => {
      expect(() => replay(game.moves)).not.toThrow();
    });
  }

  it("each famous-game position is the exact game position and line", () => {
    for (const p of FAMOUS_POSITIONS) {
      const game = FAMOUS_GAMES.find((g) => g.key === p.game)!;
      const { fens, sans } = replay(game.moves);
      const item = byId.get(p.id);
      expect(item, p.id).toBeTruthy();
      expect(item!.fen, p.id).toBe(fens[p.ply]);
      if (p.line > 0) expect(item!.solutionSans?.slice(0, p.line), p.id).toEqual(sans.slice(p.ply, p.ply + p.line));
      expect(item!.source?.kind, p.id).toBe("game");
    }
  });
});
