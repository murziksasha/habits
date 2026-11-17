/**
 * CircuitDocument version 2.
 * Wires and junction nodes are the electrical source of truth.
 * Coordinates are display-only. Legacy `nodes` arrays are adapted, not trusted
 * once a version-2 wire exists.
 */

import { getCircuitComponentDef } from "./circuit-registry.js";
import {
  circuitDocumentSchema,
  type CircuitDocument,
  type CircuitEndpoint,
} from "./circuit-types.js";

export const CIRCUIT_DOCUMENT_VERSION = 2;

export type ResolvedPin = {
  componentId: string;
  pin: string;
  key: string;
};

export type ResolveNetsResult = {
  ok: boolean;
  errors: string[];
  /** pin key -> net id. Ground is "0". */
  pinNet: Map<string, string>;
  /** net id -> pin keys */
  nets: Map<string, string[]>;
  floatingPins: string[];
};

class UnionFind {
  parent = new Map<string, string>();
  find(id: string): string {
    const known = this.parent.get(id);
    if (!known) {
      this.parent.set(id, id);
      return id;
    }
    if (known === id) return id;
    const root = this.find(known);
    this.parent.set(id, root);
    return root;
  }
  union(a: string, b: string): void {
    const ra = this.find(a);
    const rb = this.find(b);
    if (ra !== rb) this.parent.set(ra, rb);
  }
}

function pinKey(componentId: string, pin: string): string {
  return `${componentId}.${pin}`;
}

function endpointKey(ep: CircuitEndpoint, index: number): { key: string; kind: "pin" | "junction" } | null {
  if ("junctionId" in ep && ep.junctionId) return { key: `j:${ep.junctionId}`, kind: "junction" };
  if ("componentId" in ep && ep.componentId && ep.pin) {
    return { key: pinKey(ep.componentId, ep.pin), kind: "pin" };
  }
  if ("id" in ep && ep.id && ep.pin) return { key: pinKey(ep.id, ep.pin), kind: "pin" };
  if ("x" in ep && "y" in ep && typeof ep.x === "number" && typeof ep.y === "number") {
    return { key: `xy:${ep.x},${ep.y}:${index}`, kind: "junction" };
  }
  return null;
}

const GROUND_NAMES = new Set(["0", "gnd", "ground"]);

/**
 * Accept a legacy netlist string, a v1 document, or a v2 document.
 * Does not invent ground on open pins.
 */
export function adaptCircuitDocument(input: unknown): { ok: boolean; document?: CircuitDocument; errors: string[] } {
  if (typeof input === "string") {
    const text = input.trim();
    if (!text) return { ok: false, errors: ["empty_netlist"] };
    return {
      ok: true,
      errors: [],
      document: {
        version: CIRCUIT_DOCUMENT_VERSION,
        components: [],
        wires: [],
        junctions: [],
        mode: "netlist",
        netlist: text,
      },
    };
  }
  if (!input || typeof input !== "object") return { ok: false, errors: ["invalid_circuit_document"] };

  const raw = input as Record<string, unknown>;
  const legacyCircuit = raw.circuitDocument && typeof raw.circuitDocument === "object" ? raw.circuitDocument : null;
  const source = (raw.components || raw.wires || raw.netlist || raw.mode) ? raw : legacyCircuit ?? raw;

  const parsed = circuitDocumentSchema.safeParse(source);
  if (!parsed.success) {
    return { ok: false, errors: parsed.error.issues.map((issue) => issue.message) };
  }
  const doc = parsed.data;
  return {
    ok: true,
    errors: [],
    document: {
      ...doc,
      version: doc.version >= CIRCUIT_DOCUMENT_VERSION ? doc.version : CIRCUIT_DOCUMENT_VERSION,
      junctions: doc.junctions ?? [],
    },
  };
}

export function resolveElectricalNets(doc: CircuitDocument): ResolveNetsResult {
  const errors: string[] = [];
  const uf = new UnionFind();
  const pinKeys: string[] = [];
  const seenIds = new Set<string>();
  const explicitName = new Map<string, string>();

  for (const comp of doc.components) {
    if (seenIds.has(comp.id)) errors.push(`duplicate_component:${comp.id}`);
    seenIds.add(comp.id);
    const defn = getCircuitComponentDef(comp.type);
    if (!defn) {
      errors.push(`unsupported_element:${comp.type}`);
      continue;
    }
    defn.pins.forEach((pin, index) => {
      const key = pinKey(comp.id, pin.id);
      pinKeys.push(key);
      uf.find(key);
      const legacy = comp.nodes[index];
      if (legacy && legacy.trim()) {
        const name = legacy.trim();
        explicitName.set(key, GROUND_NAMES.has(name.toLowerCase()) ? "0" : name);
        uf.union(key, `name:${explicitName.get(key)}`);
      }
    });
    if (comp.type.toLowerCase() === "ground" || comp.id.toLowerCase() === "gnd" || comp.id.toLowerCase().startsWith("gnd")) {
      uf.union(pinKey(comp.id, defn.pins[0]?.id ?? "1"), "name:0");
    }
  }

  const junctionIds = new Set((doc.junctions ?? []).map((j) => j.id));
  doc.wires.forEach((wire, index) => {
    const from = endpointKey(wire.from, index);
    const to = endpointKey(wire.to, index + 10000);
    if (!from || !to) {
      errors.push(`missing_endpoint:${wire.id}`);
      return;
    }
    for (const ep of [from, to]) {
      if (ep.kind === "pin" && !pinKeys.includes(ep.key) && !ep.key.startsWith("j:")) {
        const compId = ep.key.slice(0, ep.key.lastIndexOf("."));
        if (!seenIds.has(compId)) errors.push(`missing_component:${compId}`);
        else errors.push(`missing_pin:${ep.key}`);
      }
      if (ep.kind === "junction" && ep.key.startsWith("j:")) {
        const id = ep.key.slice(2);
        if (!junctionIds.has(id) && (doc.version ?? 1) >= 2 && (doc.junctions?.length ?? 0) > 0) {
          errors.push(`missing_junction:${id}`);
        }
      }
    }
    uf.union(from.key, to.key);
    if (wire.net && wire.net.trim()) {
      const netName = GROUND_NAMES.has(wire.net.trim().toLowerCase()) ? "0" : wire.net.trim();
      uf.union(from.key, `name:${netName}`);
    }
  });

  const groups = new Map<string, string[]>();
  for (const key of pinKeys) {
    const root = uf.find(key);
    const list = groups.get(root) ?? [];
    list.push(key);
    groups.set(root, list);
  }

  const pinNet = new Map<string, string>();
  const nets = new Map<string, string[]>();
  let auto = 1;
  for (const keys of groups.values()) {
    let netId = "";
    for (const key of keys) {
      const named = explicitName.get(key);
      if (named) {
        if (netId && netId !== named) errors.push(`contradictory_connection:${key}`);
        netId = named;
      }
      const root = uf.find(key);
      if (uf.find("name:0") === root) netId = "0";
    }
    if (!netId) {
      const root = uf.find(keys[0]!);
      if (root.startsWith("name:")) netId = root.slice(5);
    }
    if (!netId) netId = `n${auto++}`;
    nets.set(netId, keys);
    for (const key of keys) pinNet.set(key, netId);
  }

  const floatingPins: string[] = [];
  for (const comp of doc.components) {
    const defn = getCircuitComponentDef(comp.type);
    if (!defn || defn.type === "ground") continue;
    for (const pin of defn.pins) {
      if (!pin.required) continue;
      const key = pinKey(comp.id, pin.id);
      const net = pinNet.get(key);
      const group = net ? nets.get(net) ?? [] : [];
      if (!net || group.length < 2 && net !== "0") {
        floatingPins.push(key);
      }
    }
  }

  return {
    ok: errors.length === 0,
    errors,
    pinNet,
    nets,
    floatingPins,
  };
}

export function netOf(resolved: ResolveNetsResult, componentId: string, pin: string): string | undefined {
  return resolved.pinNet.get(pinKey(componentId, pin));
}
