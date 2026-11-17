/**
 * Generates SPICE netlists from CircuitDocument version 2.
 * Electrical nets come from wires and junctions. Open pins stay open.
 */

import {
  getCircuitComponentDef,
  resolveElectricalNets,
  type CircuitAnalysis,
  type CircuitDocument,
  type ResolveNetsResult,
} from "@eduforge/shared";
import { STANDARD_SPICE_MODELS, getModelDefForComponent } from "./models.js";

export function normalizeNodeName(name: string): string {
  const norm = name.trim().toLowerCase();
  if (norm === "0" || norm === "gnd" || norm === "ground") return "0";
  return name.trim().replace(/[^a-zA-Z0-9_]/g, "_");
}

export type CompileNetlistResult =
  | { ok: true; netlist: string; floatingPins: string[] }
  | { ok: false; errors: string[]; floatingPins: string[] };

function spiceName(id: string, prefix: string): string {
  return id.toUpperCase().startsWith(prefix) ? id : `${prefix}${id}`;
}

function pinNet(resolved: ResolveNetsResult, componentId: string, pin: string): string | null {
  const net = resolved.pinNet.get(`${componentId}.${pin}`);
  return net ? normalizeNodeName(net) : null;
}

export function compileNetlist(doc: CircuitDocument, analysis?: CircuitAnalysis): CompileNetlistResult {
  if (doc.mode === "netlist" && doc.netlist && doc.netlist.trim().length > 0) {
    let raw = doc.netlist.trim();
    if (!raw.includes("STANDARD_MODELS_INCLUDED")) {
      raw = `${raw}\n* --- Included Models ---\n${STANDARD_SPICE_MODELS}\n`;
    }
    if (analysis && !hasAnalysisDirective(raw, analysis.type)) {
      raw = `${raw}\n${formatAnalysisCard(analysis)}\n`;
    }
    return { ok: true, netlist: raw, floatingPins: [] };
  }

  const resolved = resolveElectricalNets(doc);
  if (!resolved.ok) {
    return { ok: false, errors: resolved.errors, floatingPins: resolved.floatingPins };
  }
  if (resolved.floatingPins.length > 0) {
    return {
      ok: false,
      errors: resolved.floatingPins.map((pin) => `floating_pin:${pin}`),
      floatingPins: resolved.floatingPins,
    };
  }

  const lines: string[] = [`* EduForge Schematic: ${doc.title ?? "Untitled Circuit"}`];
  const errors: string[] = [];

  for (const comp of doc.components) {
    const type = comp.type.toLowerCase();
    const defn = getCircuitComponentDef(type);
    if (!defn || type === "ground") continue;
    const nets = defn.pins.map((pin) => pinNet(resolved, comp.id, pin.id));
    const missing = defn.pins.filter((pin, i) => pin.required && !nets[i]);
    if (missing.length > 0) {
      errors.push(`floating_pin:${comp.id}.${missing.map((p) => p.id).join(",")}`);
      continue;
    }
    const n = (index: number): string => nets[index] ?? `open_${comp.id}_${defn.pins[index]?.id ?? index}`;
    const val = (comp.value || "").trim();
    const props = comp.properties || {};
    const model = getModelDefForComponent(type, val || defn.modelKey);

    switch (type) {
      case "resistor":
        lines.push(`${spiceName(comp.id, "R")} ${n(0)} ${n(1)} ${val || "1k"}`);
        break;
      case "capacitor":
        lines.push(`${spiceName(comp.id, "C")} ${n(0)} ${n(1)} ${val || "1u"}`);
        break;
      case "inductor":
        lines.push(`${spiceName(comp.id, "L")} ${n(0)} ${n(1)} ${val || "1m"}`);
        break;
      case "dc_voltage":
      case "voltage_source":
        lines.push(`${spiceName(comp.id, "V")} ${n(0)} ${n(1)} dc ${val || "5"}`);
        break;
      case "ac_voltage":
        lines.push(`${spiceName(comp.id, "V")} ${n(0)} ${n(1)} dc 0 ac ${props.acAmplitude ?? val ?? "1"} ${props.acPhase ?? "0"}`);
        break;
      case "pulse_voltage":
        lines.push(
          `${spiceName(comp.id, "V")} ${n(0)} ${n(1)} pulse(${props.v1 ?? "0"} ${props.v2 ?? val ?? "5"} ${props.td ?? "0"} ${props.tr ?? "1n"} ${props.tf ?? "1n"} ${props.pw ?? "50u"} ${props.per ?? "100u"})`,
        );
        break;
      case "sine_voltage":
        lines.push(
          `${spiceName(comp.id, "V")} ${n(0)} ${n(1)} sin(${props.vOffset ?? "0"} ${props.vAmplitude ?? val ?? "5"} ${props.frequency ?? "50"})`,
        );
        break;
      case "dc_current":
      case "current_source":
        lines.push(`${spiceName(comp.id, "I")} ${n(0)} ${n(1)} dc ${val || "1m"}`);
        break;
      case "diode":
      case "led":
      case "zener":
        lines.push(`${spiceName(comp.id, "D")} ${n(0)} ${n(1)} ${model}`);
        break;
      case "bjt_npn":
      case "bjt_pnp":
        lines.push(`${spiceName(comp.id, "Q")} ${n(0)} ${n(1)} ${n(2)} ${model}`);
        break;
      case "mosfet_n":
      case "mosfet_p":
        lines.push(`${spiceName(comp.id, "M")} ${n(0)} ${n(1)} ${n(2)} ${n(2)} ${model}`);
        break;
      case "opamp":
        if (nets[3] && nets[4]) {
          lines.push(`${spiceName(comp.id, "X")} ${n(0)} ${n(1)} ${n(3)} ${n(4)} ${n(2)} ${model === "OPAMP_IDEAL" ? "OPAMP_RAIL" : model}`);
        } else {
          lines.push(`${spiceName(comp.id, "X")} ${n(0)} ${n(1)} ${n(2)} OPAMP_IDEAL`);
        }
        break;
      case "switch":
        if (nets[2] && nets[3]) {
          lines.push(`${spiceName(comp.id, "S")} ${n(0)} ${n(1)} ${n(2)} ${n(3)} SW_IDEAL`);
          lines.push(".model SW_IDEAL VSWITCH (Ron=0.01 Roff=1Meg Von=2.5 Voff=0.5)");
        } else {
          const closed = props.closed === undefined || props.closed === 1 || props.closed === "1" || props.closed === "true";
          lines.push(`${spiceName(comp.id, "R")} ${n(0)} ${n(1)} ${closed ? "0.01" : "100Meg"}`);
        }
        break;
      default:
        errors.push(`unsupported_element:${type}`);
    }
  }

  if (errors.length > 0) return { ok: false, errors, floatingPins: resolved.floatingPins };

  if (doc.customModels && doc.customModels.length > 0) {
    lines.push("* --- Custom Models ---");
    for (const model of doc.customModels) lines.push(model.content);
  }
  lines.push("* STANDARD_MODELS_INCLUDED");
  lines.push(STANDARD_SPICE_MODELS);
  if (analysis) lines.push(formatAnalysisCard(analysis));
  lines.push(".end");
  return { ok: true, netlist: lines.join("\n"), floatingPins: [] };
}

export function generateNetlist(doc: CircuitDocument, analysis?: CircuitAnalysis): string {
  const compiled = compileNetlist(doc, analysis);
  if (compiled.ok) return compiled.netlist;
  return `* compile_error: ${compiled.errors.join("; ")}\n.end`;
}

function hasAnalysisDirective(netlist: string, type: string): boolean {
  return new RegExp(`^\\s*\\.${type}\\b`, "im").test(netlist);
}

export function formatAnalysisCard(analysis: CircuitAnalysis): string {
  switch (analysis.type) {
    case "op":
      return ".op";
    case "dc": {
      const p = analysis.dc;
      if (!p) return ".op";
      return `.dc ${p.source} ${p.start} ${p.stop} ${p.step}`;
    }
    case "ac": {
      const p = analysis.ac;
      const variation = p?.variation ?? "dec";
      const pts = p?.points ?? 10;
      const f1 = p?.fStart ?? 1;
      const f2 = p?.fStop ?? 1e6;
      return `.ac ${variation} ${pts} ${f1} ${f2}`;
    }
    case "tran": {
      const p = analysis.tran;
      const tStep = p?.tStep ?? 1e-6;
      const tStop = p?.tStop ?? 1e-3;
      const tStart = p?.tStart !== undefined ? ` ${p.tStart}` : "";
      const uic = p?.uic ? " uic" : "";
      return `.tran ${tStep} ${tStop}${tStart}${uic}`;
    }
    case "noise": {
      const p = analysis.noise;
      const out = p?.output ?? "v(out)";
      const ref = p?.ref ?? "0";
      const varType = p?.variation ?? "dec";
      const pts = p?.points ?? 10;
      const f1 = p?.fStart ?? 1;
      const f2 = p?.fStop ?? 1e6;
      return `.noise ${out} ${ref} ${varType} ${pts} ${f1} ${f2}`;
    }
  }
}

export function estimateAnalysisPoints(analysis: CircuitAnalysis | undefined): number {
  if (!analysis) return 1;
  if (analysis.type === "op") return 1;
  if (analysis.type === "dc" && analysis.dc) {
    const span = Math.abs(analysis.dc.stop - analysis.dc.start);
    const step = Math.abs(analysis.dc.step);
    if (step <= 0) return Number.POSITIVE_INFINITY;
    return Math.floor(span / step) + 1;
  }
  if (analysis.type === "ac" && analysis.ac) {
    const points = analysis.ac.points;
    if (analysis.ac.variation === "lin") return points;
    const decades = Math.log10(analysis.ac.fStop / analysis.ac.fStart);
    return Math.ceil(Math.abs(decades) * points) + 1;
  }
  if (analysis.type === "tran" && analysis.tran) {
    const span = analysis.tran.tStop - (analysis.tran.tStart ?? 0);
    if (analysis.tran.tStep <= 0) return Number.POSITIVE_INFINITY;
    return Math.floor(span / analysis.tran.tStep) + 1;
  }
  if (analysis.type === "noise" && analysis.noise) return analysis.noise.points * 20;
  return 1;
}
