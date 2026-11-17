import { describe, expect, it } from "vitest";
import { compileNetlist } from "./netlist-generator.js";
import { complexGain, dcPower, interpolateCrossing, rmsUneven } from "./measure.js";
import { spawnSleeper, killProcess } from "./process-pool.js";
import type { CircuitDocument } from "@eduforge/shared";

function wiredDivider(): CircuitDocument {
  return {
    version: 2,
    components: [
      { id: "V1", type: "dc_voltage", value: "5", x: 0, y: 0, rotation: 0, nodes: [] },
      { id: "R1", type: "resistor", value: "1k", x: 0, y: 0, rotation: 0, nodes: [] },
      { id: "GND", type: "ground", value: "0", x: 0, y: 0, rotation: 0, nodes: [] },
    ],
    wires: [
      { id: "w1", from: { componentId: "V1", pin: "1" }, to: { componentId: "R1", pin: "1" } },
      { id: "w2", from: { componentId: "R1", pin: "2" }, to: { componentId: "GND", pin: "1" } },
      { id: "w3", from: { componentId: "V1", pin: "2" }, to: { componentId: "GND", pin: "1" } },
    ],
    junctions: [],
    mode: "schematic",
  };
}

describe("circuit measurements", () => {
  it("computes 5 V times 1 A as 5 W with sign", () => {
    expect(dcPower([5], [1])).toBe(5);
    expect(dcPower([-5], [1])).toBe(-5);
    expect(dcPower([5, 5, 5], [1, 1, 1])).toBe(5);
  });

  it("takes the magnitude of a 1 → 2j gain", () => {
    const gain = complexGain({ real: 0, imag: 2 }, { real: 1, imag: 0 });
    expect(gain?.magnitude).toBeCloseTo(2);
  });

  it("compiles a wired source without tying both pins to ground", () => {
    const compiled = compileNetlist(wiredDivider(), { type: "op" });
    expect(compiled.ok).toBe(true);
    if (compiled.ok) {
      expect(compiled.netlist).toContain("V1");
      expect(compiled.netlist).not.toMatch(/\bV1\s+0\s+0\b/);
    }
  });

  it("integrates uneven samples and reports a missing crossing", () => {
    expect(rmsUneven([0, 1, 0], [0, 0.5, 1.5])).not.toBeNull();
    expect(interpolateCrossing([0, 1], [0, 0.2], 0.5)).toBeNull();
  });
});

describe("spice process timeout", () => {
  it("kills a child that ignores the deadline", async () => {
    const child = spawnSleeper();
    const started = Date.now();
    await new Promise<void>((resolve) => {
      const timer = setTimeout(() => {
        killProcess(child);
      }, 200);
      child.once("exit", () => {
        clearTimeout(timer);
        resolve();
      });
    });
    expect(Date.now() - started).toBeLessThan(5000);
    expect(child.exitCode === null && !child.killed).toBe(false);
  });
});
