/**
 * SPICE Simulation runner with execution limits, timeout safeguards,
 * error translation, and data downsampling.
 */

import { Simulation, type ResultType } from "eecircuit-engine";
import {
  MAX_RETURN_POINTS,
  MAX_SIM_POINTS,
  SIMULATION_TIMEOUT_MS,
  sanitizeNetlist,
} from "./sanitize.js";

export type RunSimOptions = {
  timeoutMs?: number;
  maxPoints?: number;
};

export type SimSeries = {
  name: string;
  type: "voltage" | "current" | "time" | "frequency" | "notype";
  values: number[] | { real: number; imag: number }[];
};

export type RunSimOutput = {
  ok: boolean;
  dataType: "real" | "complex";
  variableNames: string[];
  numPoints: number;
  data: SimSeries[];
  info?: string;
  error?: string;
  rawErrors?: string[];
};

/**
 * Translates raw ngspice error output into clear, human-understandable diagnostics.
 */
export function translateSpiceError(rawErrors: string[], info?: string): string {
  const combined = [...rawErrors, info ?? ""].join("\n");

  if (/singular matrix/i.test(combined) || /matrix is singular/i.test(combined)) {
    const nodeMatch = combined.match(/node\s+([a-zA-Z0-9_]+)/i);
    const nodeStr = nodeMatch ? ` at node "${nodeMatch[1]}"` : "";
    return `singular_matrix: Singular matrix encountered${nodeStr}. Check for short circuits, floating nodes without DC paths, or loops of ideal voltage sources.`;
  }

  if (/timestep too small/i.test(combined) || /time step too small/i.test(combined)) {
    return "timestep_too_small: Transient analysis non-convergence (timestep too small). Try relaxing tolerances or adding small series resistance/capacitance to fast-switching nodes.";
  }

  if (/iteration limit reached/i.test(combined) || /no convergence/i.test(combined)) {
    return "non_convergence: Simulation did not converge to an operating point. Check bias conditions, feedback loops, and component ratings.";
  }

  if (/floating node/i.test(combined) || /unconnected/i.test(combined)) {
    const nodeMatch = combined.match(/node\s+([a-zA-Z0-9_]+)/i);
    const nodeStr = nodeMatch ? ` "${nodeMatch[1]}"` : "";
    return `floating_node: Node${nodeStr} is floating. Every node must have a DC conduction path to ground (node 0).`;
  }

  if (/unknown parameter/i.test(combined) || /syntax error/i.test(combined)) {
    return `syntax_error: Invalid SPICE syntax or parameter: ${rawErrors[0] || "check component values and directives"}`;
  }

  if (rawErrors.length > 0) {
    return rawErrors[0]!;
  }

  return "simulation_failed: Simulation failed to complete.";
}

/**
 * Decimates waveform series to at most `maxPoints` points, preserving start and end points.
 */
export function downsampleSeries(
  series: SimSeries[],
  maxPoints: number = MAX_RETURN_POINTS,
): SimSeries[] {
  if (series.length === 0) return series;
  const count = series[0]!.values.length;
  if (count <= maxPoints) return series;

  const step = Math.ceil(count / maxPoints);
  return series.map((s) => {
    const downsampled: (number | { real: number; imag: number })[] = [];
    for (let i = 0; i < count; i += step) {
      downsampled.push(s.values[i]!);
    }
    // Always include the final point for accuracy
    if ((count - 1) % step !== 0 && count > 0) {
      downsampled.push(s.values[count - 1]!);
    }
    return {
      ...s,
      values: downsampled as any,
    };
  });
}

/**
 * Executes a sanitized SPICE netlist with timeout and safety boundaries.
 */
export async function executeSpiceNetlist(
  netlist: string,
  options?: RunSimOptions,
): Promise<RunSimOutput> {
  const timeoutMs = options?.timeoutMs ?? SIMULATION_TIMEOUT_MS;
  const maxPoints = options?.maxPoints ?? MAX_RETURN_POINTS;

  // 1. Sanitize and validate netlist
  const sanitizeRes = sanitizeNetlist(netlist);
  if (!sanitizeRes.valid) {
    return {
      ok: false,
      dataType: "real",
      variableNames: [],
      numPoints: 0,
      data: [],
      error: sanitizeRes.errors.join("; "),
      rawErrors: sanitizeRes.errors,
    };
  }

  // 2. Instantiate isolated Simulation instance
  const sim = new Simulation();

  let timeoutTimer: NodeJS.Timeout | null = null;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutTimer = setTimeout(() => {
      reject(new Error(`simulation_timeout: Execution exceeded time limit of ${timeoutMs / 1000} seconds`));
    }, timeoutMs);
  });

  try {
    const runPromise = (async () => {
      await sim.start();
      sim.setNetList(sanitizeRes.sanitizedNetlist);
      const res: ResultType = await sim.runSim();
      return res;
    })();

    // Race simulation against timeout
    const result = await Promise.race([runPromise, timeoutPromise]);
    if (timeoutTimer) clearTimeout(timeoutTimer);

    // 3. Inspect raw simulation errors / warnings
    const rawErrors = sim.getError() || [];
    const info = sim.getInfo() || "";

    if (!result || !result.data || result.data.length === 0) {
      const translated = translateSpiceError(rawErrors, info);
      return {
        ok: false,
        dataType: "real",
        variableNames: [],
        numPoints: 0,
        data: [],
        error: translated,
        rawErrors,
        info,
      };
    }

    // 4. Map output series
    const isComplex = result.dataType === "complex";
    const mappedSeries: SimSeries[] = result.data.map((d) => {
      const isFreq = d.name.toLowerCase() === "frequency" || d.type === "frequency";
      if (isComplex && !isFreq) {
        return {
          name: d.name,
          type: d.type,
          values: (d.values as any[]).map((c) => ({
            real: Number(c.real ?? 0),
            imag: Number(c.img ?? 0),
          })),
        };
      }
      return {
        name: d.name,
        type: d.type,
        values: (d.values as any[]).map((v) => Number(typeof v === "object" && v !== null ? v.real ?? 0 : v)),
      };
    });

    const numPoints = mappedSeries[0]?.values.length ?? 0;
    if (numPoints > MAX_SIM_POINTS) {
      return {
        ok: false,
        dataType: result.dataType,
        variableNames: result.variableNames,
        numPoints,
        data: [],
        error: `max_points_exceeded: Generated ${numPoints} points (limit ${MAX_SIM_POINTS})`,
      };
    }

    // 5. Downsample for output
    const downsampled = downsampleSeries(mappedSeries, maxPoints);

    return {
      ok: true,
      dataType: result.dataType,
      variableNames: result.variableNames,
      numPoints: downsampled[0]?.values.length ?? 0,
      data: downsampled,
      info,
    };
  } catch (err: any) {
    if (timeoutTimer) clearTimeout(timeoutTimer);
    const rawErr = [err?.message || String(err)];
    return {
      ok: false,
      dataType: "real",
      variableNames: [],
      numPoints: 0,
      data: [],
      error: translateSpiceError(rawErr, sim.getInfo()),
      rawErrors: rawErr,
      info: sim.getInfo(),
    };
  }
}
