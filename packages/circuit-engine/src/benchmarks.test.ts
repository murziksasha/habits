import { describe, expect, it } from "vitest";
import { executeSpiceNetlist } from "./runner.js";
import { evaluateCircuitLab } from "./evaluator.js";
import type { CircuitLabExercise } from "@eduforge/shared";

describe("SPICE reference benchmarks", () => {
  it("1. Loaded voltage divider matches analytical solution", async () => {
    // Vin = 12V, R1 = 1k, R2 = 2k, RL = 2k -> R2 || RL = 1k -> Vout = 6V
    const netlist = `* Loaded Voltage Divider
Vin in 0 dc 12
R1 in out 1k
R2 out 0 2k
RL out 0 2k
.op
.end
`;
    const res = await executeSpiceNetlist(netlist);
    expect(res.ok).toBe(true);
    const vOut = res.data.find((s) => s.name.toLowerCase() === "v(out)");
    expect(vOut).toBeDefined();
    expect(vOut!.values[0]).toBeCloseTo(6.0, 2);
  });

  it("2. Wheatstone bridge unbalance voltage matches analytical prediction", async () => {
    // Vs = 10V, R1 = R2 = R3 = 1k, R4 = 1.05k -> Va = 5V, Vb = 10 * 1.05 / 2.05 = 5.122V
    const netlist = `* Wheatstone Bridge
Vs in 0 dc 10
R1 in a 1k
R2 a 0 1k
R3 in b 1k
R4 b 0 1.05k
.op
.end
`;
    const res = await executeSpiceNetlist(netlist);
    expect(res.ok).toBe(true);
    const va = res.data.find((s) => s.name.toLowerCase() === "v(a)")?.values[0] as number;
    const vb = res.data.find((s) => s.name.toLowerCase() === "v(b)")?.values[0] as number;
    expect(va).toBeCloseTo(5.0, 2);
    expect(vb).toBeCloseTo(5.122, 2);
    expect(vb - va).toBeCloseTo(0.122, 2);
  });

  it("3. RC step response matches time constant tau = R*C", async () => {
    // R = 1k, C = 1uF -> tau = 1ms. At t = 1ms, Vc = 5 * (1 - e^-1) = 3.16V
    const netlist = `* RC Step Response
Vstep in 0 pulse(0 5 0 1n 1n 10m 20m)
R1 in out 1k
C1 out 0 1u
.tran 50u 3m
.end
`;
    const res = await executeSpiceNetlist(netlist);
    expect(res.ok).toBe(true);
    const timeSeries = res.data.find((s) => s.name.toLowerCase() === "time");
    const vOutSeries = res.data.find((s) => s.name.toLowerCase() === "v(out)");
    expect(timeSeries).toBeDefined();
    expect(vOutSeries).toBeDefined();

    // Find voltage near 1 ms
    const times = timeSeries!.values as number[];
    const vOuts = vOutSeries!.values as number[];
    let idxAt1ms = 0;
    for (let i = 0; i < times.length; i++) {
      if (times[i]! >= 1e-3) {
        idxAt1ms = i;
        break;
      }
    }
    expect(vOuts[idxAt1ms]).toBeCloseTo(3.16, 1);
  });

  it("4. RLC resonant frequency matches Thomson formula f0 = 1/(2*pi*sqrt(L*C))", async () => {
    // R = 10, L = 10mH, C = 100nF -> f0 = 5033 Hz
    const netlist = `* Series RLC Resonance
Vin in 0 dc 0 ac 1
R1 in 1 10
L1 1 out 10m
C1 out 0 100n
.ac dec 20 1k 20k
.end
`;
    const res = await executeSpiceNetlist(netlist);
    expect(res.ok).toBe(true);
    expect(res.dataType).toBe("complex");
    const freqSeries = res.data.find((s) => s.name.toLowerCase() === "frequency");
    const vOutSeries = res.data.find((s) => s.name.toLowerCase() === "v(out)");
    expect(freqSeries).toBeDefined();
    expect(vOutSeries).toBeDefined();

    // At resonance across C, voltage peaks near 5 kHz
    const freqs = freqSeries!.values as number[];
    const mags = (vOutSeries!.values as { real: number; imag: number }[]).map((c) =>
      Math.hypot(c.real, c.imag),
    );
    let maxIdx = 0;
    let maxMag = 0;
    for (let i = 0; i < mags.length; i++) {
      if (mags[i]! > maxMag) {
        maxMag = mags[i]!;
        maxIdx = i;
      }
    }
    const peakFreq = freqs[maxIdx]!;
    expect(peakFreq).toBeGreaterThan(4500);
    expect(peakFreq).toBeLessThan(5500);
  });

  it("5. Diode rectifier and smoothing capacitor produces DC output with ripple", async () => {
    // 50 Hz sine 12V peak -> Rectified DC ~ 11.3V with ripple
    const netlist = `* Half Wave Rectifier
Vin in 0 sin(0 12 50)
D1 in out D1N4007
C1 out 0 100u
RL out 0 500
.model D1N4007 D (Is=7n Rs=0.034 N=1.8 Cjo=10p Bv=1000)
.tran 0.5m 60m 20m
.end
`;
    const res = await executeSpiceNetlist(netlist);
    expect(res.ok).toBe(true);
    const vOut = res.data.find((s) => s.name.toLowerCase() === "v(out)")?.values as number[];
    expect(vOut).toBeDefined();
    const lastPart = vOut.slice(Math.floor(vOut.length * 0.7));
    const maxV = Math.max(...lastPart);
    const minV = Math.min(...lastPart);
    expect(maxV).toBeGreaterThan(10.0);
    expect(minV).toBeGreaterThan(7.0);
    expect(maxV - minV).toBeLessThan(4.5); // bounded ripple
  });

  it("6. BJT common emitter switch saturates with low Vce", async () => {
    const netlist = `* BJT Switch
Vcc c_rail 0 dc 10
Vin b_in 0 dc 5
Rb b_in b 10k
Rc c_rail c 1k
Q1 c b 0 Q2N2222
.model Q2N2222 NPN (Is=14f Bf=200 Vaf=74)
.op
.end
`;
    const res = await executeSpiceNetlist(netlist);
    expect(res.ok).toBe(true);
    const vc = res.data.find((s) => s.name.toLowerCase() === "v(c)")?.values[0] as number;
    expect(vc).toBeLessThan(0.3); // Saturation Vce < 0.3V
  });

  it("7. Op-Amp inverting amplifier provides exact closed-loop gain", async () => {
    // Gain = -Rf / Rin = -47k / 10k = -4.7
    const netlist = `* Inverting Op-Amp
Vin in 0 dc 1
Rin in inv 10k
Rf inv out 47k
X1 0 inv out OPAMP_IDEAL
.subckt OPAMP_IDEAL noninv inv out
Rin noninv inv 10Meg
E1 out 0 noninv inv 100k
Rout out 0 10Meg
.ends OPAMP_IDEAL
.op
.end
`;
    const res = await executeSpiceNetlist(netlist);
    expect(res.ok).toBe(true);
    const vOut = res.data.find((s) => s.name.toLowerCase() === "v(out)")?.values[0] as number;
    expect(vOut).toBeCloseTo(-4.7, 2);
  });

  it("8. Buck converter step-down DC average matches duty cycle D = Vout / Vin", async () => {
    // Vin = 24V, D = 0.208 -> Vout ~ 5V
    const netlist = `* Buck Converter LC Filter
Vsw sw 0 pulse(0 24 0 10n 10n 4.16u 20u)
L1 sw out 100u
C1 out 0 47u
RL out 0 10
.tran 1u 2m 1m
.end
`;
    const res = await executeSpiceNetlist(netlist);
    expect(res.ok).toBe(true);
    const vOut = res.data.find((s) => s.name.toLowerCase() === "v(out)")?.values as number[];
    expect(vOut).toBeDefined();
    const steady = vOut.slice(Math.floor(vOut.length * 0.8));
    const avgV = steady.reduce((a, b) => a + b, 0) / steady.length;
    expect(avgV).toBeCloseTo(5.0, 0); // close to 5V
  });

  it("9. Three-phase balanced load has zero neutral current", async () => {
    // 230V phase-to-neutral, 50 Hz, 120 deg apart
    const netlist = `* 3-Phase Symmetrical Star
Va a 0 sin(0 325 50 0)
Vb b 0 sin(0 325 50 0.006666)
Vc c 0 sin(0 325 50 0.013333)
Ra a n 23
Rb b n 23
Rc c n 23
Rn n 0 0.001
.tran 0.1m 40m 20m
.end
`;
    const res = await executeSpiceNetlist(netlist);
    expect(res.ok).toBe(true);
    const vn = res.data.find((s) => s.name.toLowerCase() === "v(n)")?.values as number[];
    expect(vn).toBeDefined();
    // In balanced star, neutral voltage and current are near zero
    const maxVn = Math.max(...vn.map(Math.abs));
    expect(maxVn).toBeLessThan(0.01);
  });

  it("grades circuit_lab exercise using evaluateCircuitLab", async () => {
    const exercise: CircuitLabExercise = {
      circuit: {
        version: 1,
        components: [
          { id: "V1", type: "dc_voltage", value: "12", x: 0, y: 0, rotation: 0, nodes: ["in", "0"] },
          { id: "R1", type: "resistor", value: "1k", x: 50, y: 0, rotation: 0, nodes: ["in", "out"] },
          { id: "R2", type: "resistor", value: "1k", x: 50, y: 50, rotation: 0, nodes: ["out", "0"] },
        ],
        wires: [],
        junctions: [],
        mode: "schematic",
      },
      analysis: { type: "op" },
      criteria: [
        {
          id: "c1",
          type: "node_voltage",
          node: "out",
          target: 6.0,
          unit: "V",
          relTolerance: 0.02,
        },
      ],
    };

    const evalRes = await evaluateCircuitLab(exercise.circuit, exercise);
    expect(evalRes.ok).toBe(true);
    expect(evalRes.criteriaPassed).toBe(1);
    expect(evalRes.criteriaResults[0]?.passed).toBe(true);
  });
});
