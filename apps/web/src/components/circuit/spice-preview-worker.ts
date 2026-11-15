/// <reference lib="webworker" />

import { compileNetlist, executeSpiceInProcess } from "@eduforge/circuit-engine";
import type { CircuitAnalysis, CircuitDocument } from "@eduforge/shared";

type PreviewRequest = {
  circuit: CircuitDocument | string;
  analysis?: CircuitAnalysis;
};

const empty = {
  ok: false as const,
  dataType: "real" as const,
  variableNames: [] as string[],
  numPoints: 0,
  data: [],
};

self.onmessage = async (event: MessageEvent<PreviewRequest>) => {
  try {
    const { circuit, analysis } = event.data;
    let netlist = "";
    if (typeof circuit === "string") {
      netlist = circuit;
    } else {
      const compiled = compileNetlist(circuit, analysis ?? circuit.analysis);
      if (!compiled.ok) {
        self.postMessage({ result: { ...empty, error: compiled.errors.join("; ") } });
        return;
      }
      netlist = compiled.netlist;
    }
    const result = await executeSpiceInProcess(netlist);
    self.postMessage({ result });
  } catch (err) {
    const message = err instanceof Error ? err.message : "simulation_failed";
    self.postMessage({ result: { ...empty, error: message } });
  }
};
