/**
 * Server-graded reference circuits for the three capstone projects.
 * Component ids are the trial points: scenarios override those values.
 * A new voltage source wired across a graded node is rejected as substitution.
 */
import type { CircuitCriterion, CircuitDocument } from "@eduforge/shared";
import type { Exercise } from "../types.js";
import { createCircuitLab } from "./helpers.js";

type Comp = CircuitDocument["components"][number];
type Wire = CircuitDocument["wires"][number];

const VEX = 5;
const BIAS = 1.65;
const ARM = 1000;
const RIN = 100000;
const RF = 10000000;
const SENSOR = 1010;
const CF = 10e-9;

export function analogSensorVolts(rs: number, gain = 100, bias = BIAS): number {
  const vRight = (VEX * rs) / (ARM + rs);
  return bias + gain * (vRight - VEX / 2);
}

const rFilter = 1 / (2 * Math.PI * 1000 * CF);

const VIN_H = 24;
const VOUT = 5;
const RDCR = 0.1;
const RLOAD = 5;
const buckOut = (vSw: number, rLoad: number, rDcr = RDCR) => (vSw * rLoad) / (rLoad + rDcr);

const VL = 400;
const PF = 0.75;
const VPH = VL / Math.sqrt(3);
const XMOTOR = 40 * Math.sqrt(1 - PF * PF);
const LMOTOR = XMOTOR / (2 * Math.PI * 50);
const phaseResistorVolts = (resistance: number, reactance = XMOTOR) =>
  (VPH * resistance) / Math.hypot(resistance, reactance);

function part(id: string, type: string, value: string, x: number, y: number, properties?: Comp["properties"]): Comp {
  return { id, type, value, x, y, rotation: 0, nodes: [], ...(properties ? { properties } : {}) };
}

function link(id: string, a: string, ap: string, b: string, bp: string, net: string): Wire {
  return { id, from: { componentId: a, pin: ap }, to: { componentId: b, pin: bp }, net };
}

function board(components: Comp[], wires: Wire[]): CircuitDocument {
  return { version: 2, mode: "schematic", junctions: [], components, wires };
}

function volts(node: string, target: number, abs: number, labelUk: string, labelEn: string, measure: CircuitCriterion["measure"] = "signed"): CircuitCriterion {
  return {
    type: "node_voltage",
    node,
    target,
    absTolerance: abs,
    relTolerance: 0.03,
    measure,
    labelUk,
    labelEn,
  };
}

const designLimits = {
  canAddComponents: true,
  canRemoveComponents: true,
  canChangeValues: true,
  maxComponents: 24,
};

export function analogProjectLab(id: string, promptUk: string, promptEn: string): Exercise {
  const circuit = board(
    [
      part("VEX", "dc_voltage", String(VEX), 40, 40),
      part("VREF", "dc_voltage", String(BIAS), 40, 220),
      part("RTL", "resistor", String(ARM), 160, 20),
      part("RBL", "resistor", String(ARM), 160, 120),
      part("RTR", "resistor", String(ARM), 300, 20),
      part("RS", "resistor", String(SENSOR), 300, 120),
      part("RINM", "resistor", String(RIN), 430, 80),
      part("RF", "resistor", String(RF), 560, 40),
      part("RINP", "resistor", String(RIN), 430, 180),
      part("RG", "resistor", String(RF), 560, 200),
      part("U1", "opamp", "OPAMP_IDEAL", 680, 120),
      part("GND", "ground", "", 40, 320),
    ],
    [
      link("w1", "VEX", "1", "RTL", "1", "vex"),
      link("w2", "RTL", "1", "RTR", "1", "vex"),
      link("w3", "RTL", "2", "RBL", "1", "left"),
      link("w4", "RBL", "1", "RINM", "1", "left"),
      link("w5", "RTR", "2", "RS", "1", "right"),
      link("w6", "RS", "1", "RINP", "1", "right"),
      link("w7", "RINM", "2", "RF", "1", "inv"),
      link("w8", "RF", "1", "U1", "2", "inv"),
      link("w9", "RINP", "2", "RG", "1", "pos"),
      link("w10", "RG", "1", "U1", "1", "pos"),
      link("w11", "U1", "3", "RF", "2", "out"),
      link("w12", "VREF", "1", "RG", "2", "ref"),
      link("w13", "VEX", "2", "GND", "1", "0"),
      link("w14", "VREF", "2", "GND", "1", "0"),
      link("w15", "RBL", "2", "GND", "1", "0"),
      link("w16", "RS", "2", "GND", "1", "0"),
    ],
  );
  const at = (rs: number, gain = 100) => analogSensorVolts(rs, gain);
  return createCircuitLab({
    id,
    promptUk,
    promptEn,
    circuitDocument: circuit,
    analysis: { type: "op" },
    criteria: [volts("out", at(SENSOR), 0.25, "Вихід при 1010 Ом", "Output at 1010 ohm")],
    scenarios: [
      { id: "rs990", overrides: { RS: "990" }, criteria: [volts("out", at(990), 0.25, "Вихід при 990 Ом", "Output at 990 ohm")] },
      { id: "rs1000", overrides: { RS: "1000" }, criteria: [volts("out", at(1000), 0.08, "Вихід при 1000 Ом", "Output at 1000 ohm")] },
      { id: "gain10", overrides: { RF: "1000000", RG: "1000000" }, criteria: [volts("out", at(SENSOR, 10), 0.2, "Вихід при підсиленні 10", "Output at a gain of 10")] },
      { id: "open-sensor", overrides: { RS: "100000000" }, criteria: [volts("out", at(1e8), 30, "Вихід при обриві датчика", "Output with the sensor open")] },
      {
        id: "swapped-arm",
        overrides: { RS: "1000", RBL: "1010" },
        criteria: [volts("out", 2 * BIAS - analogSensorVolts(SENSOR), 0.25, "Вихід при переставленому плечі", "Output with the arm swapped")],
      },
    ],
    constraints: {
      ...designLimits,
      allowedComponentTypes: ["dc_voltage", "resistor", "opamp", "ground"],
    },
    rejectOutputSubstitution: true,
    explanationUk: "Ідеальна модель без насичення: вихід дорівнює 1,65 В плюс стократ різниці плечей моста. Обрив і підсилення 10 виносять робочу точку з вікна 0–3,3 В.",
    explanationEn: "Ideal model with no saturation: the output is 1.65 V plus one hundred times the bridge difference. An open sensor and a gain of 10 leave the 0–3.3 V window.",
  });
}

export function filterProjectLab(id: string, promptUk: string, promptEn: string): Exercise {
  const circuit = board(
    [
      part("VIN", "ac_voltage", "1", 40, 40, { acAmplitude: "1", acPhase: "0" }),
      part("RFILT", "resistor", String(rFilter), 180, 40),
      part("CF", "capacitor", "10e-9", 320, 120),
      part("GND", "ground", "", 40, 160),
    ],
    [
      link("w1", "VIN", "1", "RFILT", "1", "in"),
      link("w2", "RFILT", "2", "CF", "1", "adc"),
      link("w3", "VIN", "2", "GND", "1", "0"),
      link("w4", "CF", "2", "GND", "1", "0"),
    ],
  );
  const cutoff = (target: number): CircuitCriterion => ({
    type: "frequency",
    node: "adc",
    metric: "cutoff_hz",
    target,
    absTolerance: 40,
    relTolerance: 0.05,
    labelUk: "Частота зрізу фільтра",
    labelEn: "Filter cutoff frequency",
  });
  return createCircuitLab({
    id,
    promptUk,
    promptEn,
    circuitDocument: circuit,
    analysis: { type: "ac", ac: { variation: "dec", points: 20, fStart: 10, fStop: 100000 } },
    criteria: [cutoff(1000)],
    scenarios: [
      { id: "large-cap", overrides: { CF: "100e-9" }, criteria: [cutoff(100)] },
    ],
    constraints: {
      ...designLimits,
      allowedComponentTypes: ["ac_voltage", "resistor", "capacitor", "ground"],
    },
    rejectOutputSubstitution: true,
    explanationUk: "Окреме AC-випробування вихідної ланки. Джерело 1 В замінює вихід підсилювача, бо одна картка аналізу є або операційною точкою, або частотною розгорткою.",
    explanationEn: "A separate AC trial of the output network. The 1 V source stands in for the amplifier output, because one analysis card is either an operating point or a frequency sweep.",
  });
}

export function buckProjectLab(id: string, promptUk: string, promptEn: string): Exercise {
  const circuit = board(
    [
      part("VAVG", "dc_voltage", String(VOUT), 40, 40),
      part("RDCR", "resistor", String(RDCR), 180, 40),
      part("RLOAD", "resistor", String(RLOAD), 320, 120),
      part("GND", "ground", "", 40, 180),
    ],
    [
      link("w1", "VAVG", "1", "RDCR", "1", "sw"),
      link("w2", "RDCR", "2", "RLOAD", "1", "out"),
      link("w3", "VAVG", "2", "GND", "1", "0"),
      link("w4", "RLOAD", "2", "GND", "1", "0"),
    ],
  );
  return createCircuitLab({
    id,
    promptUk,
    promptEn,
    circuitDocument: circuit,
    analysis: { type: "op" },
    criteria: [volts("out", buckOut(VOUT, RLOAD), 0.02, "Середня напруга при 1 А", "Average voltage at 1 A")],
    scenarios: [
      { id: "light-load", overrides: { RLOAD: "50" }, criteria: [volts("out", buckOut(VOUT, 50), 0.02, "Середня напруга при 0,1 А", "Average voltage at 0.1 A")] },
      { id: "stuck-duty", overrides: { VAVG: "12" }, criteria: [volts("out", buckOut(12, RLOAD), 0.05, "Напруга при шпаруватості 0,5", "Voltage at a duty of 0.5")] },
      { id: "hot-inductor", overrides: { RDCR: "1" }, criteria: [volts("out", buckOut(VOUT, RLOAD, 1), 0.05, "Напруга при опорі котушки 1 Ом", "Voltage with a 1 ohm inductor")] },
    ],
    constraints: {
      ...designLimits,
      allowedComponentTypes: ["dc_voltage", "resistor", "ground"],
    },
    rejectOutputSubstitution: true,
    explanationUk: "Джерело VAVG є середньою напругою вузла ключа D·Vin, а не імпульсною формою. Пульсацію і провал під час стрибка навантаження рахують окремо: ця операційна точка перевіряє усталений спад на опорі котушки.",
    explanationEn: "VAVG is the average switch-node voltage D·Vin, not the pulse waveform. Ripple and the sag during a load step are calculated separately: this operating point checks the steady drop on the inductor resistance.",
  });
}

export function phaseProjectLab(id: string, promptUk: string, promptEn: string): Exercise {
  const circuit = board(
    [
      part("VA", "ac_voltage", String(VPH), 40, 40, { acAmplitude: String(VPH), acPhase: "0" }),
      part("LM", "inductor", String(LMOTOR), 180, 40),
      part("RM", "resistor", "30", 320, 40),
      part("GND", "ground", "", 40, 180),
    ],
    [
      link("w1", "VA", "1", "LM", "1", "ph"),
      link("w2", "LM", "2", "RM", "1", "lr"),
      link("w3", "VA", "2", "GND", "1", "0"),
      link("w4", "RM", "2", "GND", "1", "0"),
    ],
  );
  const acrossR = (resistance: number) =>
    volts("lr", phaseResistorVolts(resistance), 2, "Модуль напруги на опорі фази", "Magnitude of the phase-resistance voltage", "magnitude");
  return createCircuitLab({
    id,
    promptUk,
    promptEn,
    circuitDocument: circuit,
    analysis: { type: "ac", ac: { variation: "lin", points: 1, fStart: 50, fStop: 50 } },
    criteria: [acrossR(30)],
    scenarios: [
      { id: "resistive-mistake", overrides: { RM: "40" }, criteria: [acrossR(40)] },
      {
        id: "open-phase",
        overrides: { RM: "100000000" },
        criteria: [
          {
            type: "node_voltage",
            node: "lr",
            min: 200,
            measure: "magnitude",
            labelUk: "Обрив фази піднімає напругу вузла",
            labelEn: "An open phase raises the node voltage",
          },
        ],
      },
    ],
    constraints: {
      ...designLimits,
      allowedComponentTypes: ["ac_voltage", "resistor", "inductor", "ground"],
    },
    rejectOutputSubstitution: true,
    explanationUk: "Одна фаза еквівалента: 30 Ом і індуктивність реактивного опору при 50 Гц. Лінійний опір лінії і конденсатор компенсації в цю схему не входять, їх перевіряють обчисленням.",
    explanationEn: "One phase of the equivalent: 30 ohm and the inductance of the reactance at 50 Hz. The line impedance and the compensation capacitor are not in this schematic; those are checked by calculation.",
  });
}

export const projectLabAnchors = {
  rFilter,
  analog1010: analogSensorVolts(1010),
  analog1000: analogSensorVolts(1000),
  analog990: analogSensorVolts(990),
  analogGain10: analogSensorVolts(1010, 10),
  analogOpen: analogSensorVolts(1e8),
  buck1A: buckOut(VOUT, RLOAD),
  buckLight: buckOut(VOUT, 50),
  buckStuck: buckOut(12, RLOAD),
  phaseDrop: phaseResistorVolts(30),
  VIN_H,
  VOUT,
  VPH,
  LMOTOR,
  XMOTOR,
};
