import { describe, expect, it } from "vitest";
import { evaluateCriterion } from "./evaluator.js";
import type { RunSimOutput } from "./runner.js";

function output(data: RunSimOutput["data"]): RunSimOutput {
  return { ok: true, dataType: "real", variableNames: data.map((d) => d.name), numPoints: data[0]?.values.length ?? 0, data };
}

describe("criterion measurements", () => {
  it("keeps the sign of branch current", () => {
    const sim = output([
      { name: "i(V1)", type: "current", values: [-1, -1, -1] },
    ]);
    const row = evaluateCriterion({ type: "branch_current", source: "V1", target: -1, absTolerance: 0.01 }, sim);
    expect(row.passed).toBe(true);
    expect(row.actual).toBeLessThan(0);
  });

  it("reports gain magnitude 2 for 1 → 2j", () => {
    const sim = output([
      { name: "v(in)", type: "voltage", values: [{ real: 1, imag: 0 }] },
      { name: "v(out)", type: "voltage", values: [{ real: 0, imag: 2 }] },
    ]);
    const row = evaluateCriterion(
      { type: "gain", node: "out", referenceNode: "in", target: 2, absTolerance: 0.01 },
      sim,
    );
    expect(row.passed).toBe(true);
  });

  it("interpolates cutoff and reports a missing crossing", () => {
    const freqs = [10, 20, 40];
    const mags = [1, 0.8, 0.2];
    const hit = evaluateCriterion(
      { type: "frequency", node: "out", target: 20, relTolerance: 0.5 },
      output([
        { name: "frequency", type: "frequency", values: freqs },
        { name: "v(out)", type: "voltage", values: mags },
      ]),
    );
    expect(hit.passed).toBe(true);
    const miss = evaluateCriterion(
      { type: "frequency", node: "out", target: 10 },
      output([
        { name: "frequency", type: "frequency", values: [1, 2, 3] },
        { name: "v(out)", type: "voltage", values: [1, 1, 1] },
      ]),
    );
    expect(miss.error).toBe("missing_crossing");
  });

  it("integrates uneven samples for RMS", () => {
    const row = evaluateCriterion(
      { type: "custom_metric", metric: "rms", node: "out", target: 1, absTolerance: 0.05 },
      output([
        { name: "time", type: "time", values: [0, 1, 3] },
        { name: "v(out)", type: "voltage", values: [1, -1, 1] },
      ]),
    );
    expect(row.passed).toBe(true);
  });

  it("rejects an unknown custom metric", () => {
    const row = evaluateCriterion({ type: "custom_metric", metric: "shell" }, output([]));
    expect(row.error).toBe("metric_not_allowed");
  });
});
