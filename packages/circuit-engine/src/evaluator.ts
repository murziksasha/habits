/**
 * Circuit lab grading evaluator.
 * Runs SPICE simulation on submitted circuit and tests every criterion.
 */

import {
  adaptCircuitDocument,
  type CircuitCriterion,
  type CircuitDocument,
  type CircuitLabExercise,
  isWithinTolerance,
} from "@eduforge/shared";
import { compileNetlist } from "./netlist-generator.js";
import {
  averageUneven,
  complexGain,
  cutoffFrequency,
  dcPower,
  isAllowedMetric,
  measureScalar,
  phasorPower,
  resonanceFrequency,
  riseTime,
  rmsUneven,
  sampleMagnitude,
  sliceWindow,
  trapezoid,
  type MeasureKind,
} from "./measure.js";
import { executeSpiceNetlist, type RunSimOutput, type SimSeries } from "./runner.js";
import { applyScenarioOverrides, checkStructure } from "./structure.js";

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

function seriesReals(series: SimSeries | undefined): number[] | null {
  if (!series || series.values.length === 0) return null;
  return series.values.map((v) => (typeof v === "number" ? v : v.real));
}

function axisValues(output: RunSimOutput): number[] | null {
  return seriesReals(findSeries(output, "time") ?? findSeries(output, "frequency") ?? findSeries(output, "v-sweep"));
}

function traceForMeasure(series: SimSeries, kind: MeasureKind): number[] {
  if (kind === "magnitude") return series.values.map((v) => sampleMagnitude(v));
  return series.values.map((v) => (typeof v === "number" ? v : v.real));
}

/** Windowed scalar. Transient average, RMS, and signed mean use time integration when a time axis exists. */
function measureTrace(values: number[], xs: number[] | null, criterion: CircuitCriterion): number | null {
  const kind: MeasureKind = criterion.measure ?? "signed";
  const sliced = sliceWindow(values, xs, criterion.window);
  const slicedX = xs ? sliceWindow(xs, xs, criterion.window) : null;
  const timed = slicedX && slicedX.length === sliced.length && slicedX.length >= 2 && slicedX.some((x, i) => i > 0 && x !== slicedX[0]);
  if (timed && slicedX) {
    if (kind === "rms") return rmsUneven(sliced, slicedX);
    if (kind === "average" || kind === "signed") return averageUneven(sliced, slicedX);
  }
  return measureScalar(sliced, kind);
}

function judgeNumber(
  actual: number | null,
  criterion: CircuitCriterion,
  base: CriterionEvaluation,
  failError: string,
): CriterionEvaluation {
  if (actual === null || !Number.isFinite(actual)) {
    return { ...base, error: "missing_crossing" };
  }
  const relTol = criterion.relTolerance ?? 0.05;
  const absTol = criterion.absTolerance ?? 0;
  let passed = false;
  if (criterion.target !== undefined) {
    passed = isWithinTolerance(actual, criterion.target, absTol, relTol);
    base.expected = criterion.target;
  } else if (criterion.min !== undefined || criterion.max !== undefined) {
    const minOk = criterion.min === undefined || actual >= criterion.min - absTol;
    const maxOk = criterion.max === undefined || actual <= criterion.max + absTol;
    passed = minOk && maxOk;
    base.expected = { min: criterion.min, max: criterion.max };
  }
  return {
    ...base,
    passed,
    actual: Number(actual.toPrecision(6)),
    error: passed ? undefined : failError,
  };
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
      const kind = criterion.measure ?? "signed";
      const nodeName = criterion.node.replace(/^v\(/i, "").replace(/\)$/, "").trim();
      const series = findSeries(simOutput, `v(${nodeName})`);
      let vals = extractVoltageSeries(simOutput, criterion.node, criterion.referenceNode);
      if (series && kind === "magnitude" && !criterion.referenceNode) {
        vals = traceForMeasure(series, "magnitude");
      }
      if (!vals || vals.length === 0) {
        return { ...baseResult, error: `node_not_found: Node "${criterion.node}" not in simulation output` };
      }
      const actual = measureTrace(vals, axisValues(simOutput), criterion);
      return judgeNumber(actual, criterion, baseResult, "voltage_out_of_range");
    }

    case "branch_current": {
      const src = criterion.source ?? "V1";
      const series = findSeries(simOutput, `i(${src})`);
      if (!series || series.values.length === 0) {
        return { ...baseResult, error: `current_source_not_found: "${src}"` };
      }
      const kind = criterion.measure ?? "signed";
      const vals = traceForMeasure(series, kind === "magnitude" ? "magnitude" : "signed");
      const actual = measureTrace(vals, axisValues(simOutput), { ...criterion, measure: kind });
      return judgeNumber(actual, criterion, baseResult, "current_out_of_range");
    }

    case "power": {
      // P = V * I
      const vVals = criterion.node ? extractVoltageSeries(simOutput, criterion.node) : null;
      const src = criterion.source ?? "V1";
      const iSeries = findSeries(simOutput, `i(${src})`);
      if (!vVals || !iSeries) {
        return { ...baseResult, error: "missing_voltage_or_current_for_power" };
      }

      const iVals = iSeries.values.map((v) => (typeof v === "number" ? v : v.real));
      const actualPower = dcPower(vVals, iVals, null, criterion.window);
      if (actualPower === null) return { ...baseResult, error: "missing_voltage_or_current_for_power" };

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
      const outSeries = criterion.node ? findSeries(simOutput, `v(${criterion.node})`) : undefined;
      const inSeries = criterion.referenceNode ? findSeries(simOutput, `v(${criterion.referenceNode})`) : undefined;
      const outSample = outSeries?.values.at(-1);
      const inSample = inSeries?.values.at(-1);
      if (outSample === undefined || inSample === undefined) {
        return { ...baseResult, error: "missing_input_or_output_for_gain" };
      }
      const gain = complexGain(outSample, inSample);
      if (!gain) return { ...baseResult, error: "input_signal_is_zero" };
      const actualGain = criterion.measure === "signed" ? gain.real : gain.magnitude;
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
      if (!criterion.node) return { ...baseResult, error: "missing_ripple_node" };
      const vals = extractVoltageSeries(simOutput, criterion.node);
      if (!vals || vals.length < 2) return { ...baseResult, error: "insufficient_points_for_ripple" };
      const actual = measureTrace(vals, axisValues(simOutput), { ...criterion, measure: "peak_to_peak" });
      return judgeNumber(actual, criterion, baseResult, "ripple_exceeds_threshold");
    }

    case "frequency": {
      const freqSeries = findSeries(simOutput, "frequency");
      const outSeries = criterion.node ? findSeries(simOutput, `v(${criterion.node})`) : undefined;
      if (!freqSeries || !outSeries) {
        return { ...baseResult, error: "ac_frequency_data_missing" };
      }
      const freqs = seriesReals(freqSeries) ?? [];
      const mags = outSeries.values.map((v) => sampleMagnitude(v));
      const metric = criterion.metric ?? criterion.metricName;
      const found = metric === "resonance_hz" ? resonanceFrequency(freqs, mags) : cutoffFrequency(freqs, mags);
      if (found === null) return { ...baseResult, error: "missing_crossing" };
      return judgeNumber(found, criterion, baseResult, "frequency_out_of_range");
    }

    case "timing": {
      if (!criterion.node) return { ...baseResult, error: "missing_timing_node" };
      const timeSeries = findSeries(simOutput, "time");
      const vVals = extractVoltageSeries(simOutput, criterion.node);
      if (!timeSeries || !vVals || vVals.length < 2) {
        return { ...baseResult, error: "timing_data_missing" };
      }
      const times = seriesReals(timeSeries) ?? [];
      const rise = riseTime(times, vVals);
      if (rise === null) return { ...baseResult, error: "missing_crossing" };
      return judgeNumber(rise, criterion, baseResult, "rise_time_out_of_spec");
    }

    case "custom_metric": {
      const name = criterion.metric ?? criterion.metricName;
      if (!isAllowedMetric(name)) {
        return { ...baseResult, error: "metric_not_allowed" };
      }
      const xs = axisValues(simOutput);
      const vSeries = criterion.node ? findSeries(simOutput, `v(${criterion.node})`) : undefined;
      const iSeries = criterion.source ? findSeries(simOutput, `i(${criterion.source})`) : undefined;
      if (name === "active_power" || name === "reactive_power") {
        const vs = vSeries?.values.at(-1);
        const isamp = iSeries?.values.at(-1);
        if (vs === undefined || isamp === undefined) return { ...baseResult, error: "missing_phasor" };
        const power = phasorPower(vs, isamp);
        return judgeNumber(name === "active_power" ? power.active : power.reactive, criterion, baseResult, "metric_out_of_range");
      }
      if (name === "ac_gain_magnitude" || name === "ac_gain_phase_deg") {
        const outS = vSeries?.values.at(-1);
        const inS = criterion.referenceNode ? findSeries(simOutput, `v(${criterion.referenceNode})`)?.values.at(-1) : undefined;
        if (outS === undefined || inS === undefined) return { ...baseResult, error: "missing_input_or_output_for_gain" };
        const gain = complexGain(outS, inS);
        if (!gain) return { ...baseResult, error: "input_signal_is_zero" };
        const phase = Math.atan2(gain.imag, gain.real) * (180 / Math.PI);
        return judgeNumber(name === "ac_gain_magnitude" ? gain.magnitude : phase, criterion, baseResult, "metric_out_of_range");
      }
      if (name === "cutoff_hz" || name === "resonance_hz") {
        const freqSeries = findSeries(simOutput, "frequency");
        if (!freqSeries || !vSeries) return { ...baseResult, error: "ac_frequency_data_missing" };
        const freqs = seriesReals(freqSeries) ?? [];
        const mags = vSeries.values.map((v) => sampleMagnitude(v));
        const found = name === "resonance_hz" ? resonanceFrequency(freqs, mags) : cutoffFrequency(freqs, mags);
        if (found === null) return { ...baseResult, error: "missing_crossing" };
        return judgeNumber(found, criterion, baseResult, "metric_out_of_range");
      }
      if (name === "rise_time_s") {
        const timeSeries = findSeries(simOutput, "time");
        const vals = vSeries ? seriesReals(vSeries) : null;
        const times = seriesReals(timeSeries);
        if (!times || !vals) return { ...baseResult, error: "timing_data_missing" };
        const rise = riseTime(times, vals);
        if (rise === null) return { ...baseResult, error: "missing_crossing" };
        return judgeNumber(rise, criterion, baseResult, "metric_out_of_range");
      }
      if (name === "energy") {
        const vVals = vSeries ? seriesReals(vSeries) : null;
        const iVals = iSeries ? seriesReals(iSeries) : null;
        const times = seriesReals(findSeries(simOutput, "time"));
        if (!vVals || !iVals || !times) return { ...baseResult, error: "missing_voltage_or_current_for_power" };
        const n = Math.min(vVals.length, iVals.length, times.length);
        const product = vVals.slice(0, n).map((v, i) => v * (iVals[i] ?? 0));
        return judgeNumber(trapezoid(product, times.slice(0, n)), criterion, baseResult, "metric_out_of_range");
      }
      if (name === "dc_power") {
        const vVals = vSeries ? seriesReals(vSeries) : null;
        const iVals = iSeries ? seriesReals(iSeries) : null;
        if (!vVals || !iVals) return { ...baseResult, error: "missing_voltage_or_current_for_power" };
        return judgeNumber(dcPower(vVals, iVals, xs, criterion.window), criterion, baseResult, "metric_out_of_range");
      }
      const scalarSeries = vSeries ?? iSeries;
      if (!scalarSeries) return { ...baseResult, error: "metric_requires_context" };
      const kind: MeasureKind = name === "rms" ? "rms" : name === "average" ? "average" : "peak_to_peak";
      const nums = traceForMeasure(scalarSeries, "signed");
      return judgeNumber(measureTrace(nums, xs, { ...criterion, measure: kind }), criterion, baseResult, "metric_out_of_range");
    }

    default:
      return { ...baseResult, passed: false, error: `unknown_criterion_type: ${criterion.type}` };
  }
}

const STRUCTURAL = new Set(["required_connection", "forbidden_element", "component_count"]);

async function simulateDocument(
  doc: CircuitDocument,
  exercise: CircuitLabExercise,
): Promise<{ ok: true; sim: RunSimOutput } | { ok: false; error: string; sim?: RunSimOutput }> {
  const compiled = compileNetlist(doc, exercise.analysis);
  if (!compiled.ok) return { ok: false, error: compiled.errors.join("; ") };
  const sim = await executeSpiceNetlist(compiled.netlist);
  if (!sim.ok) {
    const unavailable = /simulation_timeout|circuit_engine_unavailable|engine_crashed/i.test(sim.error ?? "");
    return { ok: false, error: unavailable ? `circuit_engine_unavailable: ${sim.error}` : sim.error || "simulation_failed", sim };
  }
  return { ok: true, sim };
}

/**
 * Grades a circuit submission. Analysis, limits, and scenarios come from the
 * exercise. Client flags and client simulation results are ignored.
 */
export async function evaluateCircuitLab(
  submittedCircuit: unknown,
  exercise: CircuitLabExercise,
): Promise<CircuitLabEvaluationResult> {
  const scenarioExtra = (exercise.scenarios ?? []).reduce((n, s) => n + s.criteria.length, 0);
  const criteriaTotal = exercise.criteria.length + scenarioExtra;
  const adapted = adaptCircuitDocument(
    submittedCircuit && typeof submittedCircuit === "object" && "circuit" in submittedCircuit
      ? (submittedCircuit as { circuit: unknown }).circuit
      : submittedCircuit,
  );
  if (!adapted.ok || !adapted.document) {
    return {
      ok: false,
      criteriaPassed: 0,
      criteriaTotal,
      criteriaResults: [],
      error: adapted.errors.join("; ") || "invalid_circuit_submission",
    };
  }

  const structure = checkStructure(adapted.document, exercise);
  const structuralResults: CriterionEvaluation[] = structure.criteria.map((c) => ({
    id: c.id,
    type: c.type,
    passed: c.passed,
    error: c.error,
    labelUk: c.labelUk,
    labelEn: c.labelEn,
  }));
  if (!structure.ok) {
    const rest = exercise.criteria
      .filter((c) => !STRUCTURAL.has(c.type))
      .map((c) => ({
        id: c.id,
        type: c.type,
        passed: false,
        error: "not_simulated",
        labelUk: c.labelUk,
        labelEn: c.labelEn,
      }));
    const criteriaResults = [...structuralResults, ...rest];
    return {
      ok: false,
      criteriaPassed: criteriaResults.filter((c) => c.passed).length,
      criteriaTotal,
      criteriaResults,
      error: structure.errors[0] ?? "circuit_rejected",
    };
  }

  const measured: CriterionEvaluation[] = [];
  const runs: { doc: CircuitDocument; criteria: CircuitCriterion[] }[] = [
    { doc: adapted.document, criteria: exercise.criteria.filter((c) => !STRUCTURAL.has(c.type)) },
  ];
  for (const scenario of exercise.scenarios ?? []) {
    runs.push({
      doc: applyScenarioOverrides(adapted.document, scenario.overrides, scenario.faults),
      criteria: scenario.criteria,
    });
  }

  let simOutput: RunSimOutput | undefined;
  for (const run of runs) {
    const sim = await simulateDocument(run.doc, exercise);
    if (!sim.ok) {
      if (sim.error.startsWith("circuit_engine_unavailable")) {
        return {
          ok: false,
          criteriaPassed: 0,
          criteriaTotal,
          criteriaResults: structuralResults,
          error: sim.error,
        };
      }
      return {
        ok: false,
        criteriaPassed: structuralResults.filter((c) => c.passed).length,
        criteriaTotal,
        criteriaResults: structuralResults,
        simOutput: sim.sim,
        error: sim.error,
      };
    }
    simOutput = sim.sim;
    for (const criterion of run.criteria) {
      measured.push(evaluateCriterion(criterion, sim.sim));
    }
  }

  const criteriaResults = [...structuralResults, ...measured];
  const criteriaPassed = criteriaResults.filter((c) => c.passed).length;
  const ok = criteriaResults.length === criteriaTotal && criteriaResults.every((c) => c.passed);
  return {
    ok,
    criteriaPassed,
    criteriaTotal,
    criteriaResults,
    simOutput,
    error: ok ? undefined : "one_or_more_criteria_failed",
  };
}
