/**
 * Circuit lab grading evaluator.
 * Runs SPICE simulation on submitted circuit and tests every criterion.
 */

import type { CircuitCriterion, CircuitLabExercise } from "@eduforge/shared";
import { isWithinTolerance } from "@eduforge/shared";
import { generateNetlist } from "./netlist-generator.js";
import { executeSpiceNetlist, type RunSimOutput, type SimSeries } from "./runner.js";

export type CriterionEvaluation = {
  id?: string;
  type: string;
  passed: boolean;
  actual?: number | string | boolean;
  expected?: number | string | { min?: number; max?: number; target?: number };
  unit?: string;
  error?: string;
  labelUk?: string;
  labelEn?: string;
};

export type CircuitLabEvaluationResult = {
  ok: boolean;
  criteriaPassed: number;
  criteriaTotal: number;
  criteriaResults: CriterionEvaluation[];
  simOutput?: RunSimOutput;
  error?: string;
};

/**
 * Finds series in simulation output matching name (e.g. "v(out)" or "v(1)").
 */
export function findSeries(
  output: RunSimOutput,
  name: string,
): SimSeries | undefined {
  const norm = name.trim().toLowerCase();
  return output.data.find((s) => s.name.toLowerCase() === norm);
}

/**
 * Extracts node voltage series, supporting differential syntax v(n1, n2) = v(n1) - v(n2).
 */
export function extractVoltageSeries(
  output: RunSimOutput,
  node: string,
  refNode?: string,
): number[] | null {
  const cleanNode = node.replace(/^v\(/i, "").replace(/\)$/, "").trim();
  const cleanRef = refNode?.replace(/^v\(/i, "").replace(/\)$/, "").trim();

  const posSeries = findSeries(output, `v(${cleanNode})`);
  if (!posSeries) return null;

  const posVals = posSeries.values.map((v) => (typeof v === "number" ? v : v.real));

  if (!cleanRef || cleanRef === "0" || cleanRef.toLowerCase() === "gnd") {
    return posVals;
  }

  const negSeries = findSeries(output, `v(${cleanRef})`);
  if (!negSeries) return posVals;

  const negVals = negSeries.values.map((v) => (typeof v === "number" ? v : v.real));
  return posVals.map((v, i) => v - (negVals[i] ?? 0));
}

/**
 * Evaluates an individual circuit lab criterion.
 */
export function evaluateCriterion(
  criterion: CircuitCriterion,
  simOutput: RunSimOutput,
): CriterionEvaluation {
  const relTol = criterion.relTolerance ?? 0.05; // 5% default tolerance for analog circuits
  const absTol = criterion.absTolerance ?? 0;
  const unit = criterion.unit;

  const baseResult: CriterionEvaluation = {
    id: criterion.id,
    type: criterion.type,
    passed: false,
    unit,
    labelUk: criterion.labelUk,
    labelEn: criterion.labelEn,
  };

  switch (criterion.type) {
    case "node_voltage": {
      if (!criterion.node) {
        return { ...baseResult, error: "criterion_missing_node" };
      }
      const vals = extractVoltageSeries(simOutput, criterion.node, criterion.referenceNode);
      if (!vals || vals.length === 0) {
        return { ...baseResult, error: `node_not_found: Node "${criterion.node}" not in simulation output` };
      }

      // If transient or sweep, use steady-state (last value or average of last 10%)
      const lastVals = vals.slice(Math.floor(vals.length * 0.9));
      const actualVal = lastVals.reduce((a, b) => a + b, 0) / (lastVals.length || 1);

      let passed = false;
      if (criterion.target !== undefined) {
        passed = isWithinTolerance(actualVal, criterion.target, absTol, relTol);
        baseResult.expected = criterion.target;
      } else if (criterion.min !== undefined || criterion.max !== undefined) {
        const minOk = criterion.min === undefined || actualVal >= criterion.min - absTol;
        const maxOk = criterion.max === undefined || actualVal <= criterion.max + absTol;
        passed = minOk && maxOk;
        baseResult.expected = { min: criterion.min, max: criterion.max };
      }

      return {
        ...baseResult,
        passed,
        actual: Number(actualVal.toFixed(4)),
        error: passed ? undefined : "voltage_out_of_range",
      };
    }

    case "branch_current": {
      const src = criterion.source ?? "V1";
      const series = findSeries(simOutput, `i(${src})`);
      if (!series || series.values.length === 0) {
        return { ...baseResult, error: `current_source_not_found: "${src}"` };
      }

      const vals = series.values.map((v) => Math.abs(typeof v === "number" ? v : v.real));
      const lastVals = vals.slice(Math.floor(vals.length * 0.9));
      const actualVal = lastVals.reduce((a, b) => a + b, 0) / (lastVals.length || 1);

      let passed = false;
      if (criterion.target !== undefined) {
        passed = isWithinTolerance(actualVal, criterion.target, absTol, relTol);
        baseResult.expected = criterion.target;
      } else if (criterion.min !== undefined || criterion.max !== undefined) {
        const minOk = criterion.min === undefined || actualVal >= criterion.min - absTol;
        const maxOk = criterion.max === undefined || actualVal <= criterion.max + absTol;
        passed = minOk && maxOk;
        baseResult.expected = { min: criterion.min, max: criterion.max };
      }

      return {
        ...baseResult,
        passed,
        actual: Number(actualVal.toPrecision(4)),
        error: passed ? undefined : "current_out_of_range",
      };
    }

    case "power": {
      // P = V * I
      const vVals = criterion.node ? extractVoltageSeries(simOutput, criterion.node) : null;
      const src = criterion.source ?? "V1";
      const iSeries = findSeries(simOutput, `i(${src})`);
      if (!vVals || !iSeries) {
        return { ...baseResult, error: "missing_voltage_or_current_for_power" };
      }

      const iVals = iSeries.values.map((v) => Math.abs(typeof v === "number" ? v : v.real));
      const pVals = vVals.map((v, i) => Math.abs(v * (iVals[i] ?? 0)));
      const actualPower = pVals.slice(Math.floor(pVals.length * 0.9)).reduce((a, b) => a + b, 0) /
        (pVals.length * 0.1 || 1);

      let passed = false;
      if (criterion.target !== undefined) {
        passed = isWithinTolerance(actualPower, criterion.target, absTol, relTol);
        baseResult.expected = criterion.target;
      } else if (criterion.min !== undefined || criterion.max !== undefined) {
        passed =
          (criterion.min === undefined || actualPower >= criterion.min) &&
          (criterion.max === undefined || actualPower <= criterion.max);
        baseResult.expected = { min: criterion.min, max: criterion.max };
      }

      return {
        ...baseResult,
        passed,
        actual: Number(actualPower.toFixed(4)),
        error: passed ? undefined : "power_out_of_range",
      };
    }

    case "gain": {
      // Gain = Vout / Vin
      const outVals = criterion.node ? extractVoltageSeries(simOutput, criterion.node) : null;
      const inVals = criterion.referenceNode
        ? extractVoltageSeries(simOutput, criterion.referenceNode)
        : null;

      if (!outVals || !inVals || outVals.length === 0 || inVals.length === 0) {
        return { ...baseResult, error: "missing_input_or_output_for_gain" };
      }

      // Compute RMS or peak of output and input
      const maxOut = Math.max(...outVals.map(Math.abs));
      const maxIn = Math.max(...inVals.map(Math.abs));
      if (maxIn === 0) return { ...baseResult, error: "input_signal_is_zero" };

      const actualGain = maxOut / maxIn;
      const isDb = unit?.toLowerCase() === "db";
      const evaluatedGain = isDb ? 20 * Math.log10(Math.max(1e-12, actualGain)) : actualGain;

      let passed = false;
      if (criterion.target !== undefined) {
        passed = isWithinTolerance(evaluatedGain, criterion.target, absTol, relTol);
        baseResult.expected = criterion.target;
      } else if (criterion.min !== undefined || criterion.max !== undefined) {
        passed =
          (criterion.min === undefined || evaluatedGain >= criterion.min) &&
          (criterion.max === undefined || evaluatedGain <= criterion.max);
        baseResult.expected = { min: criterion.min, max: criterion.max };
      }

      return {
        ...baseResult,
        passed,
        actual: Number(evaluatedGain.toFixed(2)),
        error: passed ? undefined : "gain_out_of_range",
      };
    }

    case "ripple": {
      // Peak-to-peak ripple: max - min in the last 40% of transient analysis
      if (!criterion.node) return { ...baseResult, error: "missing_ripple_node" };
      const vals = extractVoltageSeries(simOutput, criterion.node);
      if (!vals || vals.length < 5) return { ...baseResult, error: "insufficient_points_for_ripple" };

      const steady = vals.slice(Math.floor(vals.length * 0.6));
      const maxV = Math.max(...steady);
      const minV = Math.min(...steady);
      const rippleVpp = maxV - minV;

      let passed = false;
      if (criterion.max !== undefined) {
        passed = rippleVpp <= criterion.max + (criterion.absTolerance ?? 1e-4);
        baseResult.expected = { max: criterion.max };
      } else if (criterion.target !== undefined) {
        passed = isWithinTolerance(rippleVpp, criterion.target, absTol, relTol);
        baseResult.expected = criterion.target;
      }

      return {
        ...baseResult,
        passed,
        actual: Number(rippleVpp.toFixed(4)),
        error: passed ? undefined : "ripple_exceeds_threshold",
      };
    }

    case "frequency": {
      // In AC analysis: find cutoff frequency (-3dB) or peak resonance frequency
      const freqSeries = findSeries(simOutput, "frequency");
      const outSeries = criterion.node ? findSeries(simOutput, `v(${criterion.node})`) : null;
      if (!freqSeries || !outSeries) {
        return { ...baseResult, error: "ac_frequency_data_missing" };
      }

      const freqs = freqSeries.values.map(Number);
      const mags = outSeries.values.map((v) =>
        typeof v === "number" ? Math.abs(v) : Math.hypot(v.real, v.imag),
      );

      // Find -3dB frequency relative to max/DC magnitude
      const peakMag = Math.max(...mags);
      const targetMag = peakMag * Math.SQRT1_2; // 0.7071

      let foundFreq = freqs[0] ?? 0;
      for (let i = 0; i < mags.length - 1; i++) {
        const m1 = mags[i]!;
        const m2 = mags[i + 1]!;
        if ((m1 >= targetMag && m2 <= targetMag) || (m1 <= targetMag && m2 >= targetMag)) {
          foundFreq = freqs[i]!;
          break;
        }
      }

      let passed = false;
      if (criterion.target !== undefined) {
        passed = isWithinTolerance(foundFreq, criterion.target, absTol, relTol);
        baseResult.expected = criterion.target;
      } else if (criterion.min !== undefined || criterion.max !== undefined) {
        passed =
          (criterion.min === undefined || foundFreq >= criterion.min) &&
          (criterion.max === undefined || foundFreq <= criterion.max);
        baseResult.expected = { min: criterion.min, max: criterion.max };
      }

      return {
        ...baseResult,
        passed,
        actual: Number(foundFreq.toFixed(1)),
        error: passed ? undefined : "frequency_out_of_range",
      };
    }

    case "timing": {
      // Rise time or delay in transient analysis
      if (!criterion.node) return { ...baseResult, error: "missing_timing_node" };
      const timeSeries = findSeries(simOutput, "time");
      const vVals = extractVoltageSeries(simOutput, criterion.node);
      if (!timeSeries || !vVals || vVals.length < 5) {
        return { ...baseResult, error: "timing_data_missing" };
      }

      const times = timeSeries.values.map(Number);
      const minV = Math.min(...vVals);
      const maxV = Math.max(...vVals);
      const v10 = minV + 0.1 * (maxV - minV);
      const v90 = minV + 0.9 * (maxV - minV);

      let t10 = times[0] ?? 0;
      let t90 = times[times.length - 1] ?? 0;
      for (let i = 0; i < vVals.length; i++) {
        if (vVals[i]! >= v10 && t10 === times[0]) t10 = times[i]!;
        if (vVals[i]! >= v90) {
          t90 = times[i]!;
          break;
        }
      }

      const riseTime = t90 - t10;
      let passed = false;
      if (criterion.target !== undefined) {
        passed = isWithinTolerance(riseTime, criterion.target, absTol, relTol);
        baseResult.expected = criterion.target;
      } else if (criterion.max !== undefined) {
        passed = riseTime <= criterion.max;
        baseResult.expected = { max: criterion.max };
      }

      return {
        ...baseResult,
        passed,
        actual: Number(riseTime.toExponential(3)),
        error: passed ? undefined : "rise_time_out_of_spec",
      };
    }

    default:
      return { ...baseResult, error: `unknown_criterion_type: ${criterion.type}` };
  }
}

/**
 * Executes and grades a complete circuit lab submission.
 */
export async function evaluateCircuitLab(
  submittedCircuit: any,
  exercise: CircuitLabExercise,
): Promise<CircuitLabEvaluationResult> {
  let netlist = "";

  if (typeof submittedCircuit === "string") {
    netlist = submittedCircuit;
  } else if (submittedCircuit && typeof submittedCircuit === "object") {
    // Generate netlist from CircuitDocument
    netlist = generateNetlist(submittedCircuit, exercise.analysis);
  } else {
    return {
      ok: false,
      criteriaPassed: 0,
      criteriaTotal: exercise.criteria.length,
      criteriaResults: [],
      error: "invalid_circuit_submission",
    };
  }

  // Execute simulation
  const simOutput = await executeSpiceNetlist(netlist);
  if (!simOutput.ok) {
    return {
      ok: false,
      criteriaPassed: 0,
      criteriaTotal: exercise.criteria.length,
      criteriaResults: [],
      simOutput,
      error: simOutput.error || "simulation_failed",
    };
  }

  // Grade each criterion
  const criteriaResults: CriterionEvaluation[] = [];
  let passedCount = 0;

  for (const crit of exercise.criteria) {
    const res = evaluateCriterion(crit, simOutput);
    criteriaResults.push(res);
    if (res.passed) passedCount++;
  }

  const ok = passedCount === exercise.criteria.length;

  return {
    ok,
    criteriaPassed: passedCount,
    criteriaTotal: exercise.criteria.length,
    criteriaResults,
    simOutput,
    error: ok ? undefined : "one_or_more_criteria_failed",
  };
}
