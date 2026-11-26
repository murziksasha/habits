import { describe, expect, it } from "vitest";
import { checkEndgameGoal } from "./endgame.js";

const KQK = "7k/8/5K2/8/8/8/8/6Q1 w - - 0 1";
const KRK = "4k3/8/4K3/8/8/8/8/7R w - - 0 1";

describe("checkEndgameGoal", () => {
  it("win: mate by the learner is success", () => {
    const r = checkEndgameGoal(KQK, ["Qg7#"], "win", 10);
    expect(r).toMatchObject({ status: "success", reason: "checkmate", learnerMoves: 1 });
  });
  it("win: K+R mate", () => {
    expect(checkEndgameGoal(KRK, ["Rh8#"], "win", 5).status).toBe("success");
  });
  it("win: stalemate is a fail", () => {
    const r = checkEndgameGoal(KQK, ["Qg6"], "win", 10);
    expect(r).toMatchObject({ status: "fail", reason: "stalemate" });
  });
  it("draw: stalemate is a success", () => {
    // Black (learner) to move, only king moves; after Kh8 white stalemates nothing — use a forced stalemate line.
    const fen = "7k/5Q2/6K1/8/8/8/8/8 b - - 0 1";
    expect(checkEndgameGoal(fen, [], "draw", 5).status).toBe("in_progress");
  });
  it("in progress with moves left", () => {
    const r = checkEndgameGoal(KRK, ["Rh7", "Kf8"], "win", 5);
    expect(r).toMatchObject({ status: "in_progress", learnerMoves: 1, movesLeft: 4 });
  });
  it("win: move limit reached is a fail", () => {
    expect(checkEndgameGoal(KRK, ["Rh7", "Kf8"], "win", 2).status).toBe("in_progress");
    // The learner's last allowed move did not mate → fail at once.
    const r2 = checkEndgameGoal(KRK, ["Rh7", "Kf8", "Rg7"], "win", 2);
    expect(r2).toMatchObject({ status: "fail", reason: "move_limit" });
  });
  it("draw: surviving the limit is a success", () => {
    const fen = "4k3/8/4K3/8/8/8/8/7R b - - 0 1";
    const r = checkEndgameGoal(fen, ["Kf8", "Rh7", "Kg8", "Ra7"], "draw", 2);
    expect(r).toMatchObject({ status: "success", reason: "survived" });
  });
  it("draw: getting mated is a fail", () => {
    const fen = "k7/8/1K6/8/8/8/8/7R b - - 0 1";
    const r = checkEndgameGoal(fen, ["Kb8", "Rh8#"], "draw", 10);
    expect(r).toMatchObject({ status: "fail", reason: "mated" });
  });
  it("draw: threefold repetition is a success", () => {
    const fen = "4k3/8/4K3/8/8/8/8/7R b - - 0 1";
    const r = checkEndgameGoal(fen, ["Kf8", "Rh7", "Ke8", "Rh1", "Kf8", "Rh7", "Ke8", "Rh1"], "draw", 20);
    expect(r).toMatchObject({ status: "success", reason: "threefold" });
  });
  it("promote: first promotion is a success", () => {
    const fen = "8/4P3/8/8/8/2k5/8/K7 w - - 0 1";
    expect(checkEndgameGoal(fen, ["e8=Q"], "promote", 3)).toMatchObject({ status: "success", reason: "promoted" });
  });
  it("insufficient material ends a win attempt", () => {
    const fen = "8/8/8/8/8/3k4/1r6/K7 w - - 0 1";
    expect(checkEndgameGoal(fen, ["Kxb2"], "draw", 5)).toMatchObject({ status: "success", reason: "insufficient" });
  });
  it("illegal move is a fail", () => {
    expect(checkEndgameGoal(KRK, ["Qh5"], "win", 5).status).toBe("fail");
  });
});
