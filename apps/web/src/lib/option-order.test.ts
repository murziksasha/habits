import { describe, expect, it } from "vitest";
import { stableOptionOrder } from "./option-order";

describe("stableOptionOrder", () => {
  it("is a stable permutation of the original indexes", () => {
    const first = stableOptionOrder("ee-01-l1-q-v2", 4);
    const second = stableOptionOrder("ee-01-l1-q-v2", 4);
    expect(second).toEqual(first);
    expect([...first].sort((a, b) => a - b)).toEqual([0, 1, 2, 3]);
    expect(first).not.toEqual([0, 1, 2, 3]);
  });

  it("changes with the exercise id", () => {
    expect(stableOptionOrder("ee-01-l1-q-v2", 4)).not.toEqual(stableOptionOrder("ee-01-l2-q-v2", 4));
  });
});
