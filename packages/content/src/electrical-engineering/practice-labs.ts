import type { CircuitDocument } from "@eduforge/shared";
import type { Exercise } from "../types.js";
import { createCircuitLab } from "./helpers.js";

function schematic(components: CircuitDocument["components"], wires: CircuitDocument["wires"]): CircuitDocument {
  return { version: 2, mode: "schematic", junctions: [], components, wires };
}

function part(
  id: string,
  type: string,
  value: string,
  x: number,
  y: number,
  nodes: string[] = [],
): CircuitDocument["components"][number] {
  return { id, type, value, x, y, rotation: 0, nodes };
}

function wire(
  id: string,
  a: string,
  ap: string,
  b: string,
  bp: string,
  net: string,
): CircuitDocument["wires"][number] {
  return { id, from: { componentId: a, pin: ap }, to: { componentId: b, pin: bp }, net };
}

/**
 * A loaded divider that is not the 6 V / 1800 Ω worked example.
 * 12 V, 4 kΩ, 4 kΩ, and a 4 kΩ load: the lower arm in parallel is 2 kΩ, so out is 4 V.
 */
export function loadedDividerLab(id: string, promptUk: string, promptEn: string): Exercise {
  return createCircuitLab({
    id,
    promptUk,
    promptEn,
    circuitDocument: schematic(
      [
        part("V1", "dc_voltage", "12", 40, 40, ["in", "0"]),
        part("R1", "resistor", "4000", 160, 40, ["in", "out"]),
        part("R2", "resistor", "4000", 280, 80, ["out", "0"]),
        part("RL", "resistor", "4000", 280, 160, ["out", "0"]),
        part("GND", "ground", "", 40, 200),
      ],
      [
        wire("w1", "V1", "1", "R1", "1", "in"),
        wire("w2", "R1", "2", "R2", "1", "out"),
        wire("w3", "R2", "1", "RL", "1", "out"),
        wire("w4", "R2", "2", "V1", "2", "0"),
        wire("w5", "RL", "2", "V1", "2", "0"),
        wire("w6", "V1", "2", "GND", "1", "0"),
      ],
    ),
    analysis: { type: "op" },
    criteria: [
      {
        type: "node_voltage",
        node: "out",
        target: 4,
        absTolerance: 0.08,
        relTolerance: 0.02,
        measure: "signed",
        labelUk: "Напруга навантаженого дільника",
        labelEn: "Loaded divider voltage",
      },
    ],
    constraints: {
      canAddComponents: false,
      canRemoveComponents: false,
      canChangeValues: false,
      allowedComponentTypes: ["dc_voltage", "resistor", "ground"],
    },
    rejectOutputSubstitution: true,
    explanationUk:
      "Нижнє плече 4 кОм паралельно з 4 кОм дає 2 кОм. Вихід 12·2/(4+2) = 4 В. Це не приклад 6 В і 1800 Ом. Межа: сталі омічні опори й ідеальне джерело, без опору вольтметра.",
    explanationEn:
      "The 4 kΩ lower arm in parallel with 4 kΩ is 2 kΩ. The output is 12·2/(4+2) = 4 V. This is not the 6 V and 1800 ohm example. Limit: constant ohmic resistances and an ideal source, with no voltmeter resistance.",
  });
}

/**
 * The starter equivalent uses the wrong series resistance. Only RTH may change.
 * 6 V, 1200 Ω and 1800 Ω produce 3.6 V. 500 Ω does not.
 */
export function fixEquivalentLab(id: string, promptUk: string, promptEn: string): Exercise {
  return createCircuitLab({
    id,
    promptUk,
    promptEn,
    circuitDocument: schematic(
      [
        part("VTH", "dc_voltage", "6", 40, 40, ["src", "0"]),
        part("RTH", "resistor", "500", 180, 40, ["src", "out"]),
        part("RL", "resistor", "1800", 320, 120, ["out", "0"]),
        part("GND", "ground", "", 40, 200),
      ],
      [
        wire("w1", "VTH", "1", "RTH", "1", "src"),
        wire("w2", "RTH", "2", "RL", "1", "out"),
        wire("w3", "RL", "2", "VTH", "2", "0"),
        wire("w4", "VTH", "2", "GND", "1", "0"),
      ],
    ),
    analysis: { type: "op" },
    criteria: [
      {
        type: "node_voltage",
        node: "out",
        target: 3.6,
        absTolerance: 0.05,
        relTolerance: 0.02,
        measure: "signed",
        labelUk: "Напруга на 1800 Ом",
        labelEn: "Voltage on 1800 ohm",
      },
    ],
    constraints: {
      canAddComponents: false,
      canRemoveComponents: false,
      canChangeValues: false,
      editableComponentIds: ["RTH"],
      allowedComponentTypes: ["dc_voltage", "resistor", "ground"],
    },
    rejectOutputSubstitution: true,
    explanationUk:
      "Щоб на 1800 Ом було 3,6 В від 6 В, RTH має бути 1200 Ом: 6·1800/3000 = 3,6. Стартові 500 Ом дають іншу напругу. Межа: один лінійний резистивний еквівалент на постійному струмі, не стабілізатор.",
    explanationEn:
      "For 3.6 V on 1800 ohm from 6 V, RTH must be 1200 ohm: 6·1800/3000 = 3.6. The starting 500 ohm gives a different voltage. Limit: one linear resistive equivalent at DC, not a regulator.",
  });
}

const CHARGE_AT_TAU = 12 * (1 - Math.exp(-1));
const CHARGE_AT_HALF_TAU = 12 * (1 - Math.exp(-0.5));

/**
 * Predict a 12 V, 1 kΩ, 1 µF charge near 1 ms, then the server doubles C.
 * The window is the end of the millisecond, not the final 12 V.
 */
export function rcChargeLab(id: string, promptUk: string, promptEn: string): Exercise {
  return createCircuitLab({
    id,
    promptUk,
    promptEn,
    circuitDocument: schematic(
      [
        part("V1", "dc_voltage", "12", 40, 40, ["in", "0"]),
        part("R1", "resistor", "1000", 180, 40, ["in", "out"]),
        part("C1", "capacitor", "1e-6", 320, 120, ["out", "0"]),
        part("GND", "ground", "", 40, 200),
      ],
      [
        wire("w1", "V1", "1", "R1", "1", "in"),
        wire("w2", "R1", "2", "C1", "1", "out"),
        wire("w3", "C1", "2", "V1", "2", "0"),
        wire("w4", "V1", "2", "GND", "1", "0"),
      ],
    ),
    analysis: { type: "tran", tran: { tStep: 5e-5, tStop: 1e-3, uic: true } },
    criteria: [
      {
        type: "node_voltage",
        node: "out",
        target: CHARGE_AT_TAU,
        absTolerance: 0.45,
        relTolerance: 0.05,
        measure: "signed",
        window: { from: 9.5e-4, to: 1e-3 },
        labelUk: "Напруга близько однієї τ",
        labelEn: "Voltage near one time constant",
      },
    ],
    scenarios: [
      {
        id: "double-c",
        overrides: { C1: "2e-6" },
        criteria: [
          {
            type: "node_voltage",
            node: "out",
            target: CHARGE_AT_HALF_TAU,
            absTolerance: 0.45,
            relTolerance: 0.05,
            measure: "signed",
            window: { from: 9.5e-4, to: 1e-3 },
            labelUk: "Напруга, коли ємність подвоєно",
            labelEn: "Voltage after the capacitance is doubled",
          },
        ],
      },
    ],
    constraints: {
      canAddComponents: false,
      canRemoveComponents: false,
      canChangeValues: false,
      allowedComponentTypes: ["dc_voltage", "resistor", "capacitor", "ground"],
    },
    rejectOutputSubstitution: true,
    explanationUk:
      "τ = 1 мс, тож біля 1 мс напруга близька до 12·(1−e^{−1}). Подвійна ємність робить ту саму мить половиною τ. Межа: коло першого порядку, ідеальне джерело, нуль на конденсаторі в мить нуль. Це не кінцеві 12 В і не приклад на 5 В.",
    explanationEn:
      "τ is 1 ms, so near 1 ms the voltage is close to 12·(1−e^{−1}). Doubling the capacitance makes that same instant half a time constant. Limit: a first-order circuit, an ideal source, and zero capacitor voltage at time zero. This is not the final 12 V and not the 5 V example.",
  });
}
