/**
 * Generates standard SPICE netlists from CircuitDocument structures
 * and analysis configurations.
 */

import type { CircuitAnalysis, CircuitDocument } from "@eduforge/shared";
import { STANDARD_SPICE_MODELS, getModelDefForComponent } from "./models.js";

/**
 * Normalizes SPICE node name:
 * "gnd", "ground", "0" -> "0"
 * strips invalid characters
 */
export function normalizeNodeName(name: string): string {
  const norm = name.trim().toLowerCase();
  if (norm === "0" || norm === "gnd" || norm === "ground") return "0";
  return name.trim().replace(/[^a-zA-Z0-9_]/g, "_");
}

/**
 * Converts a CircuitDocument into an ngspice netlist string.
 */
export function generateNetlist(
  doc: CircuitDocument,
  analysis?: CircuitAnalysis,
): string {
  // If document was authored in raw netlist mode, use it directly
  if (doc.mode === "netlist" && doc.netlist && doc.netlist.trim().length > 0) {
    let raw = doc.netlist.trim();
    // Append standard models if not already present
    if (!raw.includes("STANDARD_MODELS_INCLUDED")) {
      raw = `${raw}\n* --- Included Models ---\n${STANDARD_SPICE_MODELS}\n`;
    }
    // Append analysis card if provided and not already present
    if (analysis && !hasAnalysisDirective(raw, analysis.type)) {
      raw = `${raw}\n${formatAnalysisCard(analysis)}\n`;
    }
    return raw;
  }

  const lines: string[] = [];
  lines.push(`* EduForge Schematic: ${doc.title ?? "Untitled Circuit"}`);

  // Ground alias mapping: find any ground component and record its connected node
  const groundNodes = new Set<string>();
  groundNodes.add("0");
  groundNodes.add("gnd");
  groundNodes.add("ground");

  for (const comp of doc.components) {
    if (comp.type.toLowerCase() === "ground" || comp.id.toLowerCase().startsWith("gnd")) {
      for (const n of comp.nodes) {
        if (n) groundNodes.add(n);
      }
    }
  }

  // Node alias resolver
  const resolveNode = (n: string | undefined): string => {
    if (!n) return "0";
    if (groundNodes.has(n)) return "0";
    return normalizeNodeName(n);
  };

  // Convert components to SPICE lines
  for (const comp of doc.components) {
    const type = comp.type.toLowerCase();
    const id = comp.id.trim();

    // Skip standalone ground components as they are handled via node resolution
    if (type === "ground" || id.toLowerCase().startsWith("gnd")) {
      continue;
    }

    const nodes = (comp.nodes || []).map(resolveNode);
    const val = (comp.value || "").trim();
    const props = comp.properties || {};

    switch (type) {
      case "resistor": {
        const n1 = nodes[0] ?? "0";
        const n2 = nodes[1] ?? "0";
        const name = id.toUpperCase().startsWith("R") ? id : `R${id}`;
        lines.push(`${name} ${n1} ${n2} ${val || "1k"}`);
        break;
      }
      case "capacitor": {
        const n1 = nodes[0] ?? "0";
        const n2 = nodes[1] ?? "0";
        const name = id.toUpperCase().startsWith("C") ? id : `C${id}`;
        lines.push(`${name} ${n1} ${n2} ${val || "1u"}`);
        break;
      }
      case "inductor": {
        const n1 = nodes[0] ?? "0";
        const n2 = nodes[1] ?? "0";
        const name = id.toUpperCase().startsWith("L") ? id : `L${id}`;
        lines.push(`${name} ${n1} ${n2} ${val || "1m"}`);
        break;
      }
      case "dc_voltage":
      case "voltage_source": {
        const n1 = nodes[0] ?? "1";
        const n2 = nodes[1] ?? "0";
        const name = id.toUpperCase().startsWith("V") ? id : `V${id}`;
        lines.push(`${name} ${n1} ${n2} dc ${val || "5"}`);
        break;
      }
      case "ac_voltage": {
        const n1 = nodes[0] ?? "1";
        const n2 = nodes[1] ?? "0";
        const name = id.toUpperCase().startsWith("V") ? id : `V${id}`;
        const acAmp = props.acAmplitude ?? val ?? "1";
        const acPhase = props.acPhase ?? "0";
        lines.push(`${name} ${n1} ${n2} dc 0 ac ${acAmp} ${acPhase}`);
        break;
      }
      case "pulse_voltage": {
        const n1 = nodes[0] ?? "1";
        const n2 = nodes[1] ?? "0";
        const name = id.toUpperCase().startsWith("V") ? id : `V${id}`;
        const v1 = props.v1 ?? "0";
        const v2 = props.v2 ?? val ?? "5";
        const td = props.td ?? "0";
        const tr = props.tr ?? "1n";
        const tf = props.tf ?? "1n";
        const pw = props.pw ?? "50u";
        const per = props.per ?? "100u";
        lines.push(`${name} ${n1} ${n2} pulse(${v1} ${v2} ${td} ${tr} ${tf} ${pw} ${per})`);
        break;
      }
      case "sine_voltage": {
        const n1 = nodes[0] ?? "1";
        const n2 = nodes[1] ?? "0";
        const name = id.toUpperCase().startsWith("V") ? id : `V${id}`;
        const voff = props.vOffset ?? "0";
        const vamp = props.vAmplitude ?? val ?? "5";
        const freq = props.frequency ?? "50";
        lines.push(`${name} ${n1} ${n2} sin(${voff} ${vamp} ${freq})`);
        break;
      }
      case "dc_current":
      case "current_source": {
        const n1 = nodes[0] ?? "1";
        const n2 = nodes[1] ?? "0";
        const name = id.toUpperCase().startsWith("I") ? id : `I${id}`;
        lines.push(`${name} ${n1} ${n2} dc ${val || "1m"}`);
        break;
      }
      case "diode":
      case "led":
      case "zener": {
        const anode = nodes[0] ?? "1";
        const cathode = nodes[1] ?? "0";
        const name = id.toUpperCase().startsWith("D") ? id : `D${id}`;
        const model = getModelDefForComponent(type, val);
        lines.push(`${name} ${anode} ${cathode} ${model}`);
        break;
      }
      case "bjt_npn":
      case "bjt_pnp": {
        const c = nodes[0] ?? "1";
        const b = nodes[1] ?? "2";
        const e = nodes[2] ?? "0";
        const name = id.toUpperCase().startsWith("Q") ? id : `Q${id}`;
        const model = getModelDefForComponent(type, val);
        lines.push(`${name} ${c} ${b} ${e} ${model}`);
        break;
      }
      case "mosfet_n":
      case "mosfet_p": {
        const d = nodes[0] ?? "1";
        const g = nodes[1] ?? "2";
        const s = nodes[2] ?? "0";
        const name = id.toUpperCase().startsWith("M") ? id : `M${id}`;
        const model = getModelDefForComponent(type, val);
        lines.push(`${name} ${d} ${g} ${s} ${s} ${model}`);
        break;
      }
      case "opamp": {
        const name = id.toUpperCase().startsWith("X") ? id : `X${id}`;
        const model = getModelDefForComponent(type, val);
        if (nodes.length >= 5) {
          // 5-terminal opamp: in+ in- v+ v- out
          const [inP, inM, vP, vM, out] = nodes;
          lines.push(`${name} ${inP} ${inM} ${vP} ${vM} ${out} ${model}`);
        } else {
          // 3-terminal ideal opamp: in+ in- out
          const inP = nodes[0] ?? "1";
          const inM = nodes[1] ?? "2";
          const out = nodes[2] ?? "3";
          lines.push(`${name} ${inP} ${inM} ${out} OPAMP_IDEAL`);
        }
        break;
      }
      case "switch": {
        const n1 = nodes[0] ?? "1";
        const n2 = nodes[1] ?? "2";
        const cp = nodes[2] ?? "3";
        const cm = nodes[3] ?? "0";
        const name = id.toUpperCase().startsWith("S") ? id : `S${id}`;
        lines.push(`${name} ${n1} ${n2} ${cp} ${cm} SW_IDEAL`);
        lines.push(".model SW_IDEAL VSWITCH (Ron=0.01 Roff=1Meg Von=2.5 Voff=0.5)");
        break;
      }
      default: {
        // Fallback for custom or raw components
        const prefix = id[0]?.toUpperCase() ?? "X";
        const name = id.toUpperCase().startsWith(prefix) ? id : `${prefix}${id}`;
        lines.push(`${name} ${nodes.join(" ")} ${val}`);
        break;
      }
    }
  }

  // Include custom user models if defined
  if (doc.customModels && doc.customModels.length > 0) {
    lines.push("* --- Custom Models ---");
    for (const cm of doc.customModels) {
      lines.push(cm.content);
    }
  }

  // Include standard built-in models
  lines.push("* --- Standard Models Included ---");
  lines.push(STANDARD_SPICE_MODELS);

  // Append analysis directive
  if (analysis) {
    lines.push(formatAnalysisCard(analysis));
  }

  lines.push(".end");
  return lines.join("\n");
}

function hasAnalysisDirective(netlist: string, type: string): boolean {
  const regex = new RegExp(`^\\s*\\.${type}\\b`, "im");
  return regex.test(netlist);
}

function formatAnalysisCard(analysis: CircuitAnalysis): string {
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
