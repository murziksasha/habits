import { describe, expect, it } from "vitest";
import { chessContent } from "./index.js";
import {
  collect,
  loadChess,
  validateItems,
} from "../../../scripts/gen-expansion/deep/validate_fens.mjs";

describe("deep chess FEN validation", () => {
  const deepUnits = chessContent.units.filter((u) => u.slug.startsWith("ch-deep-"));

  it("wires the deep units into the chess course", () => {
    expect(deepUnits.map((u) => u.slug)).toEqual(
      expect.arrayContaining([
        "ch-deep-notation",
        "ch-deep-calc-viz",
        "ch-deep-tactics-hidden",
        "ch-deep-tactics-remove",
        "ch-deep-mates-classic",
        "ch-deep-mates-attack",
        "ch-deep-tactics-mix",
      ]),
    );
  });

  it("every deep unit has 5 teach lessons plus an exam of at least 4 questions", () => {
    expect(deepUnits.length).toBeGreaterThanOrEqual(7);
    for (const unit of deepUnits) {
      const exams = unit.lessons.filter((l) => l.isExam);
      expect(exams, unit.slug).toHaveLength(1);
      expect(unit.lessons.at(-1)).toBe(exams[0]);
      expect(exams[0]!.exercises.length, exams[0]!.slug).toBeGreaterThanOrEqual(4);
      expect(
        exams[0]!.exercises.some((e) => e.type === "concept"),
        exams[0]!.slug,
      ).toBe(false);
      const teach = unit.lessons.filter((l) => !l.isExam);
      expect(teach.length, unit.slug).toBeGreaterThanOrEqual(5);
    }
  });

  it("every deep chess_lesson FEN is legal and every puzzle solution is legal (mate SANs actually mate)", async () => {
    const Chess = await loadChess();
    const items = collect(deepUnits);
    const result = validateItems(Chess, items);
    expect(result.failures, JSON.stringify(result.failures, null, 2)).toEqual([]);
    expect(result.lessons).toBeGreaterThanOrEqual(30);
    expect(result.puzzles).toBeGreaterThanOrEqual(40);
  });
});
