import { describe, expect, it } from "vitest";
import { CircuitQueueFull, circuitQueueState, withCircuitSlot } from "./circuit-queue.js";

function held() {
  let release: () => void = () => {};
  const promise = new Promise<void>((resolve) => {
    release = resolve;
  });
  return { promise, release };
}

async function flush(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 0));
}

describe("circuit admission queue", () => {
  it("runs two jobs, queues eight, and rejects a second job from the same user", async () => {
    const gate = held();
    const running = [
      withCircuitSlot("run-a", () => gate.promise),
      withCircuitSlot("run-b", () => gate.promise),
    ];
    await flush();
    expect(circuitQueueState()).toEqual({ running: 2, waiting: 0 });

    await expect(withCircuitSlot("run-a", async () => 1)).rejects.toBeInstanceOf(CircuitQueueFull);

    const waiting = Array.from({ length: 8 }, (_, i) =>
      withCircuitSlot(`wait-${i}`, () => gate.promise),
    );
    await flush();
    expect(circuitQueueState()).toEqual({ running: 2, waiting: 8 });
    await expect(withCircuitSlot("overflow", async () => 1)).rejects.toBeInstanceOf(CircuitQueueFull);

    gate.release();
    await Promise.all([...running, ...waiting]);
    expect(circuitQueueState()).toEqual({ running: 0, waiting: 0 });

    const again = await withCircuitSlot("run-a", async () => 7);
    expect(again).toBe(7);
    expect(circuitQueueState()).toEqual({ running: 0, waiting: 0 });
  });
});
