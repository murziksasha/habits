import { describe, expect, it } from "vitest";
import {
  assignColors,
  findOpponentIndex,
  removeSocketSeeks,
  removeUserSeeks,
  type SeekEntry,
} from "./matchmaking.js";

function seek(partial: Partial<SeekEntry> & { userId: string }): SeekEntry {
  return {
    displayName: partial.displayName ?? "P",
    elo: partial.elo ?? 1000,
    timeControl: partial.timeControl ?? "5+0",
    rated: partial.rated ?? true,
    socketId: partial.socketId ?? `s-${partial.userId}`,
    userId: partial.userId,
  };
}

describe("findOpponentIndex", () => {
  it("returns -1 for empty queue", () => {
    expect(findOpponentIndex([], seek({ userId: "a" }))).toBe(-1);
  });

  it("matches same time control and rated flag", () => {
    const queue = [seek({ userId: "b", timeControl: "5+0", rated: true })];
    expect(findOpponentIndex(queue, seek({ userId: "a", timeControl: "5+0", rated: true }))).toBe(
      0,
    );
  });

  it("does not match different time control", () => {
    const queue = [seek({ userId: "b", timeControl: "3+0" })];
    expect(findOpponentIndex(queue, seek({ userId: "a", timeControl: "5+0" }))).toBe(-1);
  });

  it("does not match self", () => {
    const queue = [seek({ userId: "a" })];
    expect(findOpponentIndex(queue, seek({ userId: "a" }))).toBe(-1);
  });

  it("does not match rated vs unrated", () => {
    const queue = [seek({ userId: "b", rated: false })];
    expect(findOpponentIndex(queue, seek({ userId: "a", rated: true }))).toBe(-1);
  });
});

describe("removeUserSeeks / removeSocketSeeks", () => {
  it("removes by user", () => {
    const q = [seek({ userId: "a" }), seek({ userId: "b" })];
    expect(removeUserSeeks(q, "a").map((s) => s.userId)).toEqual(["b"]);
  });

  it("removes by socket", () => {
    const q = [seek({ userId: "a", socketId: "s1" }), seek({ userId: "b", socketId: "s2" })];
    expect(removeSocketSeeks(q, "s1")).toHaveLength(1);
  });
});

describe("assignColors", () => {
  it("assigns both players", () => {
    const a = seek({ userId: "a" });
    const b = seek({ userId: "b" });
    const { white, black } = assignColors(a, b, () => 0.1);
    expect(new Set([white.userId, black.userId])).toEqual(new Set(["a", "b"]));
    expect(white.userId).not.toBe(black.userId);
  });

  it("respects random for side", () => {
    const a = seek({ userId: "a" });
    const b = seek({ userId: "b" });
    expect(assignColors(a, b, () => 0.1).white.userId).toBe("a");
    expect(assignColors(a, b, () => 0.9).white.userId).toBe("b");
  });
});
