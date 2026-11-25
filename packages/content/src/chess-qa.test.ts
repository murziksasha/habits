import { describe, expect, it } from "vitest";
import { chessContent } from "./index.js";
import { CHESS_QA } from "./chess-qa.generated.js";
import { CHESS_QA_WAIVERS } from "./chess-upgrade/index.js";
import { chessPuzzleHash } from "./chess-upgrade/hash.js";
import { LICHESS_ADDITIONS, LICHESS_REPLACEMENTS } from "./expansion/chess-lichess.generated.js";

type AnyChess = {
  id: string;
  type: string;
  fen: string;
  solutionSans?: string[];
  choices?: { san: string }[];
  correctIndex?: number;
  reviewOf?: string;
  source?: { kind: string; lichessId?: string; gameUrl?: string };
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
