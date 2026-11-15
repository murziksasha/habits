import { describe, expect, it } from "vitest";
import { SeekQueueStore } from "./redis-seek-queue.js";
import type { SeekEntry } from "./matchmaking.js";

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

describe("SeekQueueStore memory backend", () => {
  it("enqueues when no opponent", async () => {
    const q = new SeekQueueStore(null);
    const opp = await q.tryMatch(seek({ userId: "a" }));
    expect(opp).toBeNull();
    const list = await q.list();
    expect(list).toHaveLength(1);
    expect(list[0].userId).toBe("a");
  });

  it("pairs matching seeker", async () => {
    const q = new SeekQueueStore(null);
    await q.tryMatch(seek({ userId: "a", timeControl: "5+0", rated: true }));
    const opp = await q.tryMatch(seek({ userId: "b", timeControl: "5+0", rated: true }));
    expect(opp?.userId).toBe("a");
    expect(await q.list()).toHaveLength(0);
  });

  it("does not pair different time control", async () => {
    const q = new SeekQueueStore(null);
    await q.tryMatch(seek({ userId: "a", timeControl: "3+0" }));
    const opp = await q.tryMatch(seek({ userId: "b", timeControl: "5+0" }));
    expect(opp).toBeNull();
    expect(await q.list()).toHaveLength(2);
  });

  it("removes prior seeks for same user on re-seek", async () => {
    const q = new SeekQueueStore(null);
    await q.tryMatch(seek({ userId: "a", timeControl: "3+0" }));
    await q.tryMatch(seek({ userId: "a", timeControl: "5+0" }));
    const list = await q.list();
    expect(list).toHaveLength(1);
    expect(list[0].timeControl).toBe("5+0");
  });

  it("removeUser and removeSocket", async () => {
    const q = new SeekQueueStore(null);
    await q.tryMatch(seek({ userId: "a", socketId: "s1" }));
    await q.tryMatch(seek({ userId: "b", socketId: "s2", timeControl: "3+0" }));
    await q.removeUser("a");
    expect((await q.list()).map((s) => s.userId)).toEqual(["b"]);
    await q.removeSocket("s2");
    expect(await q.list()).toHaveLength(0);
  });
});
