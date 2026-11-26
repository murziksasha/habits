import { describe, expect, it } from "vitest";
import { issueDrillToken, playDrillMove, readDrillToken, resolveDrillAnswer } from "./endgame-drill.js";

const ex = { id: "kq", type: "chess_endgame_drill", fen: "4k3/8/4K3/8/8/8/8/7Q w - - 0 1", goal: "win", maxMoves: 10 };

describe("server-owned endgame drill", () => {
  it("round-trips a token and rejects tampering", () => {
    const t = issueDrillToken(ex, "u1", ["Qh7"]);
    expect(readDrillToken(t, ex, "u1")).toEqual(["Qh7"]);
    expect(readDrillToken(t, ex, "u2")).toBeNull();
    expect(readDrillToken(t, { ...ex, id: "x" }, "u1")).toBeNull();
    expect(readDrillToken(t, { ...ex, fen: "8/8/8/8/8/8/8/K6k w - - 0 1" }, "u1")).toBeNull();
    const [body, mac] = t.split(".");
    const forged = Buffer.from(JSON.stringify({ ...JSON.parse(Buffer.from(body!, "base64url").toString()), s: ["Qe7#"] })).toString("base64url");
    expect(readDrillToken(`${forged}.${mac}`, ex, "u1")).toBeNull();
    expect(readDrillToken("garbage", ex, "u1")).toBeNull();
    expect(readDrillToken(t, ex, "u1", Date.now() + 25 * 3600_000)).toBeNull();
  });

  it("plays the learner move and answers with the defender", () => {
    const r = playDrillMove(ex, "u1", [], { from: "h1", to: "h7" }, { timeMs: 50 });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.sans[0]).toBe("Qh7");
    expect(r.sans).toHaveLength(2);
    expect(r.reply).not.toBeNull();
    expect(readDrillToken(r.token, ex, "u1")).toEqual(r.sans);
  });

  it("rejects illegal moves, moving twice and moves after the end", () => {
    expect(playDrillMove(ex, "u1", [], { from: "h1", to: "a2" })).toEqual({ ok: false, error: "illegal_move" });
    expect(playDrillMove(ex, "u1", ["Qh7"], { from: "e6", to: "d6" })).toEqual({ ok: false, error: "not_your_turn" });
    const mate = { ...ex, fen: "4k3/8/4K3/8/8/8/8/7R w - - 0 1" };
    const won = playDrillMove(mate, "u1", [], { from: "h1", to: "h8" });
    expect(won.ok && won.status.status).toBe("success");
    expect(won.ok && won.reply).toBeNull();
    expect(playDrillMove(mate, "u1", ["Rh8#"], { from: "e6", to: "d6" })).toEqual({ ok: false, error: "drill_over" });
  });

  it("resolves answers only through a valid token", () => {
    expect(resolveDrillAnswer(ex, { sans: ["Qe7#"] }, "u1")).toEqual({ sans: [], hintsUsed: undefined, verified: false });
    const t = issueDrillToken(ex, "u1", ["Qh7"]);
    expect(resolveDrillAnswer(ex, { token: t, hintsUsed: 1 }, "u1")).toEqual({ sans: ["Qh7"], hintsUsed: 1, verified: true });
  });
});
