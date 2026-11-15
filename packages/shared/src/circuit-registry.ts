/**
 * Single registry for component names, pin ids, SPICE pin order, and model keys.
 * Coordinates live in the editor. This file is the electrical contract.
 */

export type CircuitPinDef = {
  id: string;
  spiceOrder: number;
  /** Omitted pins stay open. They are never tied to ground. */
  required: boolean;
};

export type CircuitComponentDef = {
  type: string;
  spicePrefix: string;
  pins: CircuitPinDef[];
  modelKey?: string;
  /** Two-terminal passives and sources use SPICE value syntax. */
  valueKind: "spice" | "model" | "none";
};

const two = (prefix: string, valueKind: CircuitComponentDef["valueKind"]): CircuitComponentDef => ({
  type: "",
  spicePrefix: prefix,
  valueKind,
  pins: [
    { id: "1", spiceOrder: 0, required: true },
    { id: "2", spiceOrder: 1, required: true },
  ],
});

function def(type: string, base: Omit<CircuitComponentDef, "type"> & { type?: string }): CircuitComponentDef {
  return { ...base, type };
}

export const CIRCUIT_COMPONENTS: Record<string, CircuitComponentDef> = {
  resistor: def("resistor", { ...two("R", "spice") }),
  capacitor: def("capacitor", { ...two("C", "spice") }),
  inductor: def("inductor", { ...two("L", "spice") }),
  dc_voltage: def("dc_voltage", { ...two("V", "spice") }),
  voltage_source: def("voltage_source", { ...two("V", "spice") }),
  ac_voltage: def("ac_voltage", { ...two("V", "spice") }),
  pulse_voltage: def("pulse_voltage", { ...two("V", "spice") }),
  sine_voltage: def("sine_voltage", { ...two("V", "spice") }),
  dc_current: def("dc_current", { ...two("I", "spice") }),
  current_source: def("current_source", { ...two("I", "spice") }),
  diode: def("diode", { ...two("D", "model"), modelKey: "D1N4148" }),
  led: def("led", { ...two("D", "model"), modelKey: "DLED" }),
  zener: def("zener", { ...two("D", "model"), modelKey: "DZ5V1" }),
  bjt_npn: def("bjt_npn", {
    spicePrefix: "Q",
    valueKind: "model",
    modelKey: "Q2N2222",
    pins: [
      { id: "c", spiceOrder: 0, required: true },
      { id: "b", spiceOrder: 1, required: true },
      { id: "e", spiceOrder: 2, required: true },
    ],
  }),
  bjt_pnp: def("bjt_pnp", {
    spicePrefix: "Q",
    valueKind: "model",
    modelKey: "Q2N2907",
    pins: [
      { id: "c", spiceOrder: 0, required: true },
      { id: "b", spiceOrder: 1, required: true },
      { id: "e", spiceOrder: 2, required: true },
    ],
  }),
  mosfet_n: def("mosfet_n", {
    spicePrefix: "M",
    valueKind: "model",
    modelKey: "M2N7000",
    pins: [
      { id: "d", spiceOrder: 0, required: true },
      { id: "g", spiceOrder: 1, required: true },
      { id: "s", spiceOrder: 2, required: true },
    ],
  }),
  mosfet_p: def("mosfet_p", {
    spicePrefix: "M",
    valueKind: "model",
    modelKey: "MIRF9540",
    pins: [
      { id: "d", spiceOrder: 0, required: true },
      { id: "g", spiceOrder: 1, required: true },
      { id: "s", spiceOrder: 2, required: true },
    ],
  }),
  opamp: def("opamp", {
    spicePrefix: "X",
    valueKind: "model",
    modelKey: "OPAMP_IDEAL",
    pins: [
      { id: "1", spiceOrder: 0, required: true },
      { id: "2", spiceOrder: 1, required: true },
      { id: "3", spiceOrder: 2, required: true },
      { id: "vp", spiceOrder: 3, required: false },
      { id: "vm", spiceOrder: 4, required: false },
    ],
  }),
  switch: def("switch", {
    spicePrefix: "S",
    valueKind: "model",
    modelKey: "SW_IDEAL",
    pins: [
      { id: "1", spiceOrder: 0, required: true },
      { id: "2", spiceOrder: 1, required: true },
      { id: "cp", spiceOrder: 2, required: false },
      { id: "cm", spiceOrder: 3, required: false },
    ],
  }),
  ground: def("ground", {
    spicePrefix: "G",
    valueKind: "none",
    pins: [{ id: "1", spiceOrder: 0, required: true }],
  }),
};

export function getCircuitComponentDef(type: string): CircuitComponentDef | null {
  return CIRCUIT_COMPONENTS[type.trim().toLowerCase()] ?? null;
}

export function pinsInSpiceOrder(type: string): CircuitPinDef[] {
  const defn = getCircuitComponentDef(type);
  if (!defn) return [];
  return [...defn.pins].sort((a, b) => a.spiceOrder - b.spiceOrder);
}
