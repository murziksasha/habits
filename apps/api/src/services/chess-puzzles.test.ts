import { describe, expect, it, vi } from "vitest";
import { glicko2Update, GLICKO2_DEFAULT, seededRandom } from "@eduforge/shared";

vi.mock("../db.js", () => ({ db: {} }));

const { applyAttempt, batchPuzzleUpdate, matchesMode, pickNextPuzzle, placementPartId, themeAccuracyFrom } =
  await import("./chess-puzzles.js");
const { pickThemeSiblings, planExerciseLearning } = await import("./exercise-learning.js");

type P = Parameters<typeof pickNextPuzzle>[0]["pool"][number];
const mk = (id: string, rating: number, themes: string[] = ["fork"], unitSlug = "tactics", goal?: string): P => ({
  exerciseId: id,
  lessonId: "L",
  unitSlug,
  rating,
  rd: 150,
  themes,
  goal,
  exercise: { id, type: "chess_puzzle" },
});

describe("puzzle picker", () => {
  const pool = [mk("a", 900), mk("b", 1150, ["pin"]), mk("c", 1300, ["fork"]), mk("d", 1600), mk("e", 1250, ["mateIn1"], "tactics", "mate"), mk("f", 1200, ["endgame"], "rook-endgames-plus")];

  it("stays in the [R-150, R+200] window", () => {
    const rnd = seededRandom(1);
    for (let i = 0; i < 30; i++) {
      const p = pickNextPuzzle({ rating: 1200, pool, recent: new Set(), themeAccuracy: new Map(), mode: "mix", rnd })!;
      expect(p.rating).toBeGreaterThanOrEqual(1050);
      expect(p.rating).toBeLessThanOrEqual(1400);
    }
  });

  it("skips recent puzzles and filters modes", () => {
    const p = pickNextPuzzle({ rating: 1200, pool, recent: new Set(["b", "c", "e", "f"]), themeAccuracy: new Map(), mode: "mix" });
    expect(["a", "d"]).toContain(p!.exerciseId);
    expect(pickNextPuzzle({ rating: 1200, pool, recent: new Set(), themeAccuracy: new Map(), mode: "mate" })!.exerciseId).toBe("e");
    expect(pickNextPuzzle({ rating: 1200, pool, recent: new Set(), themeAccuracy: new Map(), mode: "endgame" })!.exerciseId).toBe("f");
    expect(pickNextPuzzle({ rating: 1200, pool, recent: new Set(), themeAccuracy: new Map(), mode: "theme", theme: "pin" })!.exerciseId).toBe("b");
    expect(matchesMode(mk("x", 1000, ["mateIn2"]), "mate")).toBe(true);
  });

  it("prefers weak themes", () => {
    const rnd = seededRandom(7);
    let pins = 0;
    const acc = new Map([["pin", 0.1], ["fork", 1], ["mateIn1", 1], ["endgame", 1]]);
    for (let i = 0; i < 200; i++) {
      if (pickNextPuzzle({ rating: 1200, pool, recent: new Set(), themeAccuracy: acc, mode: "mix", rnd })!.exerciseId === "b") pins++;
    }
    expect(pins).toBeGreaterThan(60);
  });

  it("keeps simulated accuracy in 55–75% and RD < 120 after 30 puzzles", () => {
    const rnd = seededRandom(42);
    const big: P[] = Array.from({ length: 1500 }, (_, i) => mk(`p${i}`, 600 + i * 0.9));
    const trueStrength = 1450;
    let learner = { ...GLICKO2_DEFAULT };
    let solved = 0;
    const recent = new Set<string>();
    const N = 330;
    for (let i = 0; i < N; i++) {
      const p = pickNextPuzzle({ rating: learner.rating, pool: big, recent, themeAccuracy: new Map(), mode: "mix", rnd })!;
      // No repeat tracking here: models a pool much larger than one session.
      // Puzzle ratings carry RD 150: sample the puzzle's true strength around its rating.
      const gauss = Math.sqrt(-2 * Math.log(1 - rnd())) * Math.cos(2 * Math.PI * rnd());
      const pSolve = 1 / (1 + 10 ** ((p.rating + 150 * gauss - trueStrength) / 400));
      const ok = rnd() < pSolve;
      if (i >= 30 && ok) solved++;
      learner = applyAttempt(learner, p, { solved: ok, firstTry: true, hintsUsed: 0, revealed: false }).next;
      if (i === 29) expect(learner.rd).toBeLessThan(120);
    }
    const acc = solved / (N - 30);
    expect(acc).toBeGreaterThan(0.55);
    expect(acc).toBeLessThan(0.75);
  });
});

describe("puzzle ratings", () => {
  it("learner update is plain glicko2 with score from the attempt", () => {
    const r = applyAttempt(GLICKO2_DEFAULT, { rating: 1200, rd: 150 }, { solved: true, firstTry: false, hintsUsed: 0, revealed: false });
    expect(r.score).toBe(0.5);
    expect(r.next).toEqual(glicko2Update(GLICKO2_DEFAULT, [{ rating: 1200, rd: 150, score: 0.5 }]));
  });

  it("batch lowers a puzzle that everyone solves and keeps rd >= 50", () => {
    const p = { rating: 1500, rd: 150, volatility: 0.06 };
    const next = batchPuzzleUpdate(p, Array.from({ length: 40 }, () => ({ learnerRating: 1200, learnerRd: 150, result: 1 })));
    expect(next.rating).toBeLessThan(1500);
    expect(next.rd).toBeGreaterThanOrEqual(50);
    expect(batchPuzzleUpdate(p, [])).toEqual(p);
  });

  it("placement part bands and theme accuracy", () => {
    expect(placementPartId(800)).toBe("ch-part-early");
    expect(placementPartId(1700)).toBe("ch-part-endgames");
    const acc = themeAccuracyFrom([
      { themes: ["fork", "pin"], result: 1 },
      { themes: ["fork"], result: 0 },
    ]);
    expect(acc.get("fork")).toBe(0.5);
    expect(acc.get("pin")).toBe(1);
  });
});

describe("chess SRS", () => {
  const now = new Date("2026-11-01T10:00:00Z");
  it("uses the 1/3/7/21 ladder for chess puzzles", () => {
    const miss = planExerciseLearning(
      [{ lessonId: "L", exerciseId: "p", type: "chess_puzzle", correct: false, wrongAttempts: 2 }],
      new Map(),
      now,
      { replayable: () => true },
    ).reviews[0]!;
    expect(miss.intervalDays).toBe(1);
    expect(miss.dueAt.getTime() - now.getTime()).toBe(86_400_000);
    const hit = planExerciseLearning(
      [{ lessonId: "L", exerciseId: "p", type: "chess_puzzle", correct: true, wrongAttempts: 0 }],
      new Map([["L:p", { ease: 250, intervalDays: 1, repetitions: 0, lapses: 0 }]]),
      now,
      { replayable: () => true },
    ).reviews[0]!;
    expect(hit.intervalDays).toBe(3);
    const relapse = planExerciseLearning(
      [{ lessonId: "L", exerciseId: "p", type: "chess_puzzle", correct: false, wrongAttempts: 1 }],
      new Map([["L:p", { ease: 250, intervalDays: 7, repetitions: 2, lapses: 0 }]]),
      now,
      { replayable: () => true },
    ).reviews[0]!;
    expect(relapse).toMatchObject({ intervalDays: 1, repetitions: 0, lapses: 1 });
  });

  it("picks 1–2 theme siblings within ±150", () => {
    const pool = [
      { exerciseId: "a", lessonId: "L", rating: 1250, themes: ["fork"] },
      { exerciseId: "b", lessonId: "L", rating: 1500, themes: ["fork"] },
      { exerciseId: "c", lessonId: "L", rating: 1180, themes: ["pin"] },
      { exerciseId: "d", lessonId: "L", rating: 1100, themes: ["fork", "pin"] },
      { exerciseId: "e", lessonId: null, rating: 1200, themes: ["fork"] },
    ];
    expect(pickThemeSiblings({ exerciseId: "m", rating: 1200, themes: ["fork"] }, pool, new Set()).map((p) => p.exerciseId)).toEqual(["a", "d"]);
    expect(pickThemeSiblings({ exerciseId: "m", rating: 1200, themes: ["fork"] }, pool, new Set(["a"])).map((p) => p.exerciseId)).toEqual(["d"]);
  });
});
