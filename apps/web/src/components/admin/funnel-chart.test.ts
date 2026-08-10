import { describe, expect, it } from "vitest";
import { funnelPercents } from "./funnel-chart";

describe("funnelPercents", () => {
  it("scales to 100 for max value", () => {
    expect(funnelPercents([10, 5, 0])).toEqual([100, 50, 0]);
  });

  it("handles all zeros", () => {
    expect(funnelPercents([0, 0])).toEqual([0, 0]);
  });

  it("handles single bar", () => {
    expect(funnelPercents([7])).toEqual([100]);
  });
});
