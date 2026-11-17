/**
 * Pure measurement functions used by circuit grading.
 * They run on the solver samples, before any plot decimation.
 */

export type Sample = number | { real: number; imag: number };

export type MeasureKind = "signed" | "magnitude" | "rms" | "average" | "peak_to_peak";

export type MeasureWindow = {
  from?: number;
  to?: number;
  lastFraction?: number;
};

export function asComplex(value: Sample): { real: number; imag: number } {
  if (typeof value === "number") return { real: Number.isFinite(value) ? value : 0, imag: 0 };
  return {
    real: Number.isFinite(value.real) ? value.real : 0,
    imag: Number.isFinite(value.imag) ? value.imag : 0,
  };
}

export function sampleMagnitude(value: Sample): number {
  const c = asComplex(value);
  return Math.hypot(c.real, c.imag);
}

export function windowBounds(
  xs: number[] | null,
  length: number,
  window?: MeasureWindow,
): { start: number; end: number } {
  if (length <= 0) return { start: 0, end: 0 };
  let start = 0;
  let end = length;
  if (window?.lastFraction && window.lastFraction > 0 && window.lastFraction <= 1) {
    start = Math.floor(length * (1 - window.lastFraction));
  }
  if (xs && (window?.from !== undefined || window?.to !== undefined)) {
    const from = window.from ?? xs[0] ?? 0;
    const to = window.to ?? xs[xs.length - 1] ?? 0;
    start = xs.findIndex((x) => x >= from);
    if (start < 0) start = length;
    let last = start;
    for (let i = start; i < xs.length; i++) {
      if ((xs[i] ?? 0) <= to) last = i + 1;
    }
    end = Math.max(start, last);
  }
  if (end <= start) return { start: 0, end: 0 };
  return { start, end };
}

export function sliceWindow<T>(values: T[], xs: number[] | null, window?: MeasureWindow): T[] {
  const { start, end } = windowBounds(xs, values.length, window);
  return values.slice(start, end);
}

/** Signed DC value is the average of the window, preserving sign. */
export function measureScalar(values: number[], kind: MeasureKind): number | null {
  const finite = values.filter((v) => Number.isFinite(v));
  if (finite.length === 0) return null;
  if (kind === "peak_to_peak") return Math.max(...finite) - Math.min(...finite);
  if (kind === "magnitude") {
    const mean = finite.reduce((a, b) => a + b, 0) / finite.length;
    return Math.abs(mean);
  }
  if (kind === "average" || kind === "signed") {
    return finite.reduce((a, b) => a + b, 0) / finite.length;
  }
  const meanSquare = finite.reduce((a, b) => a + b * b, 0) / finite.length;
  return Math.sqrt(meanSquare);
}

/**
 * DC power. One operating point of 5 V and 1 A is 5 W.
 * The sign is the sign of v·i. There is no hidden scale factor.
 */
export function dcPower(voltage: number[], current: number[], xs?: number[] | null, window?: MeasureWindow): number | null {
  const n = Math.min(voltage.length, current.length);
  if (n === 0) return null;
  const v = sliceWindow(voltage.slice(0, n), xs ?? null, window);
  const i = sliceWindow(current.slice(0, n), xs ?? null, window);
  const m = Math.min(v.length, i.length);
  if (m === 0) return null;
  let acc = 0;
  for (let k = 0; k < m; k++) acc += (v[k] ?? 0) * (i[k] ?? 0);
  return acc / m;
}

/** Complex gain Vout/Vin at one sample. |1 → 2j| is 2. */
export function complexGain(output: Sample, input: Sample): { real: number; imag: number; magnitude: number } | null {
  const inn = asComplex(input);
  const out = asComplex(output);
  const den = inn.real * inn.real + inn.imag * inn.imag;
  if (den === 0) return null;
  const real = (out.real * inn.real + out.imag * inn.imag) / den;
  const imag = (out.imag * inn.real - out.real * inn.imag) / den;
  return { real, imag, magnitude: Math.hypot(real, imag) };
}

/**
 * Active and reactive power from RMS phasors.
 * Current is into the element, so S = V · conj(I).
 */
export function phasorPower(voltage: Sample, current: Sample): { active: number; reactive: number } {
  const v = asComplex(voltage);
  const i = asComplex(current);
  return {
    active: v.real * i.real + v.imag * i.imag,
    reactive: v.imag * i.real - v.real * i.imag,
  };
}

export function trapezoid(values: number[], xs: number[]): number | null {
  if (values.length < 2 || xs.length !== values.length) return null;
  let acc = 0;
  for (let i = 1; i < values.length; i++) {
    const dt = (xs[i] ?? 0) - (xs[i - 1] ?? 0);
    if (!Number.isFinite(dt) || dt < 0) return null;
    acc += 0.5 * dt * ((values[i - 1] ?? 0) + (values[i] ?? 0));
  }
  return acc;
}

export function averageUneven(values: number[], xs: number[]): number | null {
  const area = trapezoid(values, xs);
  if (area === null) return null;
  const span = (xs[xs.length - 1] ?? 0) - (xs[0] ?? 0);
  if (span <= 0) return null;
  return area / span;
}

export function rmsUneven(values: number[], xs: number[]): number | null {
  if (values.length < 2 || xs.length !== values.length) return null;
  const squares = values.map((v) => v * v);
  const area = trapezoid(squares, xs);
  if (area === null) return null;
  const span = (xs[xs.length - 1] ?? 0) - (xs[0] ?? 0);
  if (span <= 0) return null;
  return Math.sqrt(Math.max(0, area / span));
}

/** Linear interpolation of the first crossing of `level`. Null when the trace never crosses. */
export function interpolateCrossing(xs: number[], ys: number[], level: number): number | null {
  for (let i = 1; i < ys.length; i++) {
    const y0 = ys[i - 1] ?? 0;
    const y1 = ys[i] ?? 0;
    const crossed = (y0 - level) * (y1 - level) <= 0 && y0 !== y1;
    if (!crossed) continue;
    const x0 = xs[i - 1] ?? 0;
    const x1 = xs[i] ?? 0;
    const t = (level - y0) / (y1 - y0);
    return x0 + t * (x1 - x0);
  }
  return null;
}

export function cutoffFrequency(freqs: number[], magnitudes: number[], ratio = Math.SQRT1_2): number | null {
  if (freqs.length < 2 || magnitudes.length !== freqs.length) return null;
  const peak = Math.max(...magnitudes.filter((m) => Number.isFinite(m)));
  if (!Number.isFinite(peak) || peak <= 0) return null;
  return interpolateCrossing(freqs, magnitudes, peak * ratio);
}

export function resonanceFrequency(freqs: number[], magnitudes: number[]): number | null {
  if (freqs.length === 0) return null;
  let best = 0;
  let bestMag = -Infinity;
  for (let i = 0; i < magnitudes.length; i++) {
    const mag = magnitudes[i] ?? -Infinity;
    if (mag > bestMag) {
      bestMag = mag;
      best = i;
    }
  }
  if (best <= 0 || best >= magnitudes.length - 1) return freqs[best] ?? null;
  const y0 = magnitudes[best - 1] ?? 0;
  const y1 = magnitudes[best] ?? 0;
  const y2 = magnitudes[best + 1] ?? 0;
  const denom = y0 - 2 * y1 + y2;
  if (denom === 0) return freqs[best] ?? null;
  const delta = 0.5 * (y0 - y2) / denom;
  const x0 = freqs[best - 1] ?? 0;
  const x1 = freqs[best] ?? 0;
  const x2 = freqs[best + 1] ?? 0;
  const left = x1 - x0;
  const right = x2 - x1;
  return x1 + delta * (delta >= 0 ? right : left);
}

export function riseTime(times: number[], values: number[]): number | null {
  if (times.length < 2 || values.length !== times.length) return null;
  const min = Math.min(...values);
  const max = Math.max(...values);
  if (max - min <= 0) return null;
  const t10 = interpolateCrossing(times, values, min + 0.1 * (max - min));
  const t90 = interpolateCrossing(times, values, min + 0.9 * (max - min));
  if (t10 === null || t90 === null) return null;
  return t90 - t10;
}

/**
 * Thin a trace for display while keeping the first, last, and local extrema.
 */
export function downsamplePreserveExtrema(values: number[], maxPoints: number): number[] {
  if (values.length <= maxPoints || maxPoints < 2) return values.slice();
  const keep = new Set<number>([0, values.length - 1]);
  for (let i = 1; i < values.length - 1; i++) {
    const v = values[i] ?? 0;
    const prev = values[i - 1] ?? 0;
    const next = values[i + 1] ?? 0;
    if ((v >= prev && v >= next) || (v <= prev && v <= next)) keep.add(i);
  }
  if (keep.size > maxPoints) {
    const sorted = [...keep].sort((a, b) => a - b);
    const step = Math.ceil(sorted.length / maxPoints);
    const picked = sorted.filter((_, i) => i % step === 0);
    picked.push(values.length - 1);
    return [...new Set(picked)].sort((a, b) => a - b).map((i) => values[i] ?? 0);
  }
  const sorted = [...keep].sort((a, b) => a - b);
  let i = 0;
  while (sorted.length < maxPoints && i < values.length) {
    if (!keep.has(i)) {
      keep.add(i);
      sorted.push(i);
    }
    i += Math.ceil(values.length / maxPoints);
  }
  return [...new Set(sorted)].sort((a, b) => a - b).slice(0, maxPoints).map((idx) => values[idx] ?? 0);
}

export const ALLOWED_METRICS = [
  "dc_power",
  "ac_gain_magnitude",
  "ac_gain_phase_deg",
  "rms",
  "average",
  "peak_to_peak",
  "energy",
  "cutoff_hz",
  "resonance_hz",
  "rise_time_s",
  "active_power",
  "reactive_power",
] as const;

export type AllowedMetric = (typeof ALLOWED_METRICS)[number];

export function isAllowedMetric(name: string | undefined): name is AllowedMetric {
  return !!name && (ALLOWED_METRICS as readonly string[]).includes(name);
}
