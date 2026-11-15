/**
 * Numerical validation and engineering unit parsing.
 * SI answers and SPICE component suffixes are separate grammars.
 * The whole input is consumed. Unknown units, extra text, and non-finite
 * values are rejected. Nothing here throws.
 */

export type ParsedQuantity = {
  value: number;
  unit?: string;
  dimension?: string;
  scaledValue: number;
};

export type ComplexQuantity = {
  real: number;
  imag: number;
  magnitude: number;
  phaseDeg: number;
  phaseRad: number;
  unit?: string;
  dimension?: string;
  /** Components after the unit scale is applied to the whole phasor. */
  scaledReal: number;
  scaledImag: number;
};

export const SI_PREFIX_FACTORS: Record<string, number> = {
  y: 1e-24,
  z: 1e-21,
  a: 1e-18,
  f: 1e-15,
  p: 1e-12,
  n: 1e-9,
  u: 1e-6,
  "µ": 1e-6,
  "μ": 1e-6,
  m: 1e-3,
  c: 1e-2,
  d: 1e-1,
  da: 1e1,
  h: 1e2,
  k: 1e3,
  M: 1e6,
  G: 1e9,
  T: 1e12,
  meg: 1e6,
  мк: 1e-6,
  н: 1e-9,
  п: 1e-12,
  м: 1e-3,
  к: 1e3,
  М: 1e6,
  Г: 1e9,
};

type UnitInfo = { dimension: string; factor: number };

/**
 * Case-sensitive unit tokens.
 * s is the second (BIPM). S is the siemens. m and M are prefixes, not units.
 */
const UNIT_TOKENS: Record<string, UnitInfo> = {
  V: { dimension: "voltage", factor: 1 },
  v: { dimension: "voltage", factor: 1 },
  volt: { dimension: "voltage", factor: 1 },
  volts: { dimension: "voltage", factor: 1 },
  В: { dimension: "voltage", factor: 1 },
  в: { dimension: "voltage", factor: 1 },
  вольт: { dimension: "voltage", factor: 1 },
  Вольт: { dimension: "voltage", factor: 1 },

  A: { dimension: "current", factor: 1 },
  a: { dimension: "current", factor: 1 },
  amp: { dimension: "current", factor: 1 },
  amps: { dimension: "current", factor: 1 },
  ampere: { dimension: "current", factor: 1 },
  amperes: { dimension: "current", factor: 1 },
  А: { dimension: "current", factor: 1 },
  ампер: { dimension: "current", factor: 1 },

  ohm: { dimension: "resistance", factor: 1 },
  ohms: { dimension: "resistance", factor: 1 },
  Ohm: { dimension: "resistance", factor: 1 },
  Ohms: { dimension: "resistance", factor: 1 },
  "Ω": { dimension: "resistance", factor: 1 },
  "ω": { dimension: "resistance", factor: 1 },
  Ом: { dimension: "resistance", factor: 1 },
  ом: { dimension: "resistance", factor: 1 },
  meg: { dimension: "resistance", factor: 1e6 },
  Meg: { dimension: "resistance", factor: 1e6 },
  MEG: { dimension: "resistance", factor: 1e6 },
  megohm: { dimension: "resistance", factor: 1e6 },
  Megohm: { dimension: "resistance", factor: 1e6 },

  S: { dimension: "conductance", factor: 1 },
  Siemens: { dimension: "conductance", factor: 1 },
  siemens: { dimension: "conductance", factor: 1 },
  См: { dimension: "conductance", factor: 1 },
  сіменс: { dimension: "conductance", factor: 1 },

  F: { dimension: "capacitance", factor: 1 },
  f: { dimension: "capacitance", factor: 1 },
  farad: { dimension: "capacitance", factor: 1 },
  Farad: { dimension: "capacitance", factor: 1 },
  Ф: { dimension: "capacitance", factor: 1 },
  ф: { dimension: "capacitance", factor: 1 },
  фарад: { dimension: "capacitance", factor: 1 },

  H: { dimension: "inductance", factor: 1 },
  h: { dimension: "inductance", factor: 1 },
  henry: { dimension: "inductance", factor: 1 },
  Henry: { dimension: "inductance", factor: 1 },
  Гн: { dimension: "inductance", factor: 1 },
  гн: { dimension: "inductance", factor: 1 },
  генрі: { dimension: "inductance", factor: 1 },

  Hz: { dimension: "frequency", factor: 1 },
  hz: { dimension: "frequency", factor: 1 },
  hertz: { dimension: "frequency", factor: 1 },
  Hertz: { dimension: "frequency", factor: 1 },
  Гц: { dimension: "frequency", factor: 1 },
  гц: { dimension: "frequency", factor: 1 },
  герц: { dimension: "frequency", factor: 1 },

  W: { dimension: "power", factor: 1 },
  w: { dimension: "power", factor: 1 },
  watt: { dimension: "power", factor: 1 },
  watts: { dimension: "power", factor: 1 },
  Вт: { dimension: "power", factor: 1 },
  вт: { dimension: "power", factor: 1 },
  ват: { dimension: "power", factor: 1 },
  ватт: { dimension: "power", factor: 1 },

  VA: { dimension: "apparent_power", factor: 1 },
  va: { dimension: "apparent_power", factor: 1 },
  ВА: { dimension: "apparent_power", factor: 1 },
  ва: { dimension: "apparent_power", factor: 1 },
  "вольт-ампер": { dimension: "apparent_power", factor: 1 },

  var: { dimension: "reactive_power", factor: 1 },
  Var: { dimension: "reactive_power", factor: 1 },
  VAR: { dimension: "reactive_power", factor: 1 },
  вар: { dimension: "reactive_power", factor: 1 },

  s: { dimension: "time", factor: 1 },
  sec: { dimension: "time", factor: 1 },
  second: { dimension: "time", factor: 1 },
  seconds: { dimension: "time", factor: 1 },
  с: { dimension: "time", factor: 1 },
  сек: { dimension: "time", factor: 1 },
  секунда: { dimension: "time", factor: 1 },
  min: { dimension: "time", factor: 60 },
  хв: { dimension: "time", factor: 60 },

  deg: { dimension: "angle_deg", factor: 1 },
  "°": { dimension: "angle_deg", factor: 1 },
  град: { dimension: "angle_deg", factor: 1 },
  rad: { dimension: "angle_deg", factor: 180 / Math.PI },
  рад: { dimension: "angle_deg", factor: 180 / Math.PI },

  "%": { dimension: "ratio", factor: 0.01 },
  percent: { dimension: "ratio", factor: 0.01 },
  відсоток: { dimension: "ratio", factor: 0.01 },

  C: { dimension: "charge", factor: 1 },
  coulomb: { dimension: "charge", factor: 1 },
  coulombs: { dimension: "charge", factor: 1 },
  Кл: { dimension: "charge", factor: 1 },
  кулон: { dimension: "charge", factor: 1 },

  J: { dimension: "energy", factor: 1 },
  joule: { dimension: "energy", factor: 1 },
  joules: { dimension: "energy", factor: 1 },
  Дж: { dimension: "energy", factor: 1 },
  джоуль: { dimension: "energy", factor: 1 },

  N: { dimension: "force", factor: 1 },
  newton: { dimension: "force", factor: 1 },
  newtons: { dimension: "force", factor: 1 },
  Н: { dimension: "force", factor: 1 },
  ньютон: { dimension: "force", factor: 1 },

  "N/C": { dimension: "electric_field", factor: 1 },
  "Н/Кл": { dimension: "electric_field", factor: 1 },
  Nm: { dimension: "torque", factor: 1 },
  "N·m": { dimension: "torque", factor: 1 },
  "Н·м": { dimension: "torque", factor: 1 },

  rpm: { dimension: "rotational_speed", factor: 1 },
  "1": { dimension: "count", factor: 1 },

  /**
   * Bare SI "T" is the tesla. Prefix T still means tera on a longer token (THz, TV).
   * parseSpiceValue keeps suffix T as tera. The two grammars stay separate.
   */
  T: { dimension: "magnetic_flux_density", factor: 1 },
  tesla: { dimension: "magnetic_flux_density", factor: 1 },
  Tesla: { dimension: "magnetic_flux_density", factor: 1 },
  Тл: { dimension: "magnetic_flux_density", factor: 1 },
  тесла: { dimension: "magnetic_flux_density", factor: 1 },

  Wb: { dimension: "magnetic_flux", factor: 1 },
  wb: { dimension: "magnetic_flux", factor: 1 },
  weber: { dimension: "magnetic_flux", factor: 1 },
  Weber: { dimension: "magnetic_flux", factor: 1 },
  Вб: { dimension: "magnetic_flux", factor: 1 },
  вебер: { dimension: "magnetic_flux", factor: 1 },

  K: { dimension: "temperature", factor: 1 },
  kelvin: { dimension: "temperature", factor: 1 },
  Kelvin: { dimension: "temperature", factor: 1 },
  К: { dimension: "temperature", factor: 1 },
  кельвін: { dimension: "temperature", factor: 1 },
  /** Temperature interval of one kelvin. Does not add 273.15. */
  "°C": { dimension: "temperature", factor: 1 },
  "℃": { dimension: "temperature", factor: 1 },
  degC: { dimension: "temperature", factor: 1 },

  /** Bare "m" is the metre. Prefix m on a longer token stays milli (mV, ms, mA). */
  m: { dimension: "length", factor: 1 },
  meter: { dimension: "length", factor: 1 },
  metre: { dimension: "length", factor: 1 },
  meters: { dimension: "length", factor: 1 },
  metres: { dimension: "length", factor: 1 },
  м: { dimension: "length", factor: 1 },
  метр: { dimension: "length", factor: 1 },

  dB: { dimension: "decibel", factor: 1 },
  db: { dimension: "decibel", factor: 1 },
  дБ: { dimension: "decibel", factor: 1 },
  дб: { dimension: "decibel", factor: 1 },
};

/** Longest token first so "megohm" wins over "meg" and "Hz" wins over "H". */
const UNIT_TOKEN_LIST = Object.keys(UNIT_TOKENS).sort((a, b) => b.length - a.length);

const PREFIX_LIST = Object.keys(SI_PREFIX_FACTORS).sort((a, b) => b.length - a.length);

/** Lower-case lookup kept for callers that still index by a normalized name. */
export const UNIT_TO_DIMENSION: Record<string, UnitInfo> = {};
for (const [token, info] of Object.entries(UNIT_TOKENS)) {
  UNIT_TO_DIMENSION[token] = info;
  const lower = token.toLowerCase();
  if (!UNIT_TO_DIMENSION[lower]) UNIT_TO_DIMENSION[lower] = info;
}
UNIT_TO_DIMENSION.s = { dimension: "time", factor: 1 };
UNIT_TO_DIMENSION.S = { dimension: "conductance", factor: 1 };

const NUMBER_RE = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/;

export function normalizeNumericString(input: string): string {
  let s = input.trim();
  s = s.replace(/[\u2013\u2014\u2212]/g, "-");
  s = s.replace(/(\d),(\d)/g, "$1.$2");
  s = s.replace(/([0-9.]+)\s*[*x×·]\s*10\s*\^?\s*\(?([+-]?[0-9]+)\)?/gi, "$1e$2");
  return s.trim();
}

function finiteNumber(raw: string): number | null {
  if (!NUMBER_RE.test(raw)) return null;
  const n = Number(raw);
  if (!Number.isFinite(n)) return null;
  return n;
}

function lookupUnit(token: string): UnitInfo | null {
  return UNIT_TOKENS[token] ?? null;
}

/**
 * Split a unit token into an optional SI prefix and a base unit.
 * Prefix case is significant: m is milli, M is mega, s is the second, S is the siemens.
 */
export function parseUnitToken(unitStr: string): { unit: string; dimension: string; factor: number } | null {
  const token = unitStr.trim();
  if (!token) return null;
  const direct = lookupUnit(token);
  if (direct) return { unit: token, dimension: direct.dimension, factor: direct.factor };

  for (const prefix of PREFIX_LIST) {
    if (!token.startsWith(prefix)) continue;
    const rest = token.slice(prefix.length).trim();
    if (!rest) continue;
    const base = lookupUnit(rest);
    if (!base) continue;
    const prefixFactor = SI_PREFIX_FACTORS[prefix];
    if (prefixFactor === undefined) continue;
    return {
      unit: token,
      dimension: base.dimension,
      factor: prefixFactor * base.factor,
    };
  }
  return null;
}

export function parseQuantity(raw: string | number): ParsedQuantity | null {
  try {
    if (typeof raw === "number") {
      if (!Number.isFinite(raw)) return null;
      return { value: raw, scaledValue: raw };
    }
    if (typeof raw !== "string") return null;
    const s = normalizeNumericString(raw);
    if (!s || /infinity|nan/i.test(s)) return null;

    const match = s.match(/^([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?)\s*(.*)$/);
    if (!match) return null;
    const baseNum = finiteNumber(match[1]!);
    if (baseNum === null) return null;
    let unitStr = match[2]!.trim();
    if (!unitStr) return { value: baseNum, scaledValue: baseNum };

    unitStr = unitStr.replace(/^[\[(]\s*(.*?)\s*[\])]$/, "$1").trim();
    if (!unitStr || /\s/.test(unitStr)) return null;

    const parsed = parseUnitToken(unitStr);
    if (!parsed) return null;
    return {
      value: baseNum,
      unit: parsed.unit,
      dimension: parsed.dimension,
      scaledValue: baseNum * parsed.factor,
    };
  } catch {
    return null;
  }
}

function complexFromParts(
  real: number,
  imag: number,
  unitInfo: { unit: string; dimension: string; factor: number } | null,
): ComplexQuantity {
  const factor = unitInfo?.factor ?? 1;
  const scaledReal = real * factor;
  const scaledImag = imag * factor;
  const rad = Math.atan2(scaledImag, scaledReal);
  return {
    real: scaledReal,
    imag: scaledImag,
    magnitude: Math.hypot(scaledReal, scaledImag),
    phaseDeg: (rad * 180) / Math.PI,
    phaseRad: rad,
    unit: unitInfo?.unit,
    dimension: unitInfo?.dimension,
    scaledReal,
    scaledImag,
  };
}

const NUM = String.raw`[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?`;
const UNUM = String.raw`(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?`;

function peelTrailingUnit(src: string): { expr: string; unit: string } | null {
  const match = src.match(/^(.*\S)\s+(\S+)$/);
  if (!match) return { expr: src.trim(), unit: "" };
  const tail = match[2]!;
  if (/^(deg|°|rad|рад)$/i.test(tail)) return { expr: src.trim(), unit: "" };
  if (parseUnitToken(tail)) return { expr: match[1]!.trim(), unit: tail };
  return { expr: src.trim(), unit: "" };
}

function parseRectangular(expr: string): { real: number; imag: number } | null {
  const compact = expr.replace(/\s+/g, "");
  if (!compact || /[^0-9eE.+\-ji]/i.test(compact)) return null;

  let m = new RegExp(`^(${NUM})([+-])[ji](${UNUM})$`, "i").exec(compact);
  if (m) {
    const real = finiteNumber(m[1]!);
    const coef = finiteNumber(m[3]!);
    if (real === null || coef === null) return null;
    return { real, imag: (m[2] === "-" ? -1 : 1) * coef };
  }
  m = new RegExp(`^(${NUM})([+-])(${UNUM})[ji]$`, "i").exec(compact);
  if (m) {
    const real = finiteNumber(m[1]!);
    const coef = finiteNumber(m[3]!);
    if (real === null || coef === null) return null;
    return { real, imag: (m[2] === "-" ? -1 : 1) * coef };
  }
  m = new RegExp(`^(${NUM})([+-])[ji]$`, "i").exec(compact);
  if (m) {
    const real = finiteNumber(m[1]!);
    if (real === null) return null;
    return { real, imag: m[2] === "-" ? -1 : 1 };
  }
  m = new RegExp(`^([+-])?[ji](${UNUM})$`, "i").exec(compact);
  if (m) {
    const coef = finiteNumber(m[2]!);
    if (coef === null) return null;
    return { real: 0, imag: (m[1] === "-" ? -1 : 1) * coef };
  }
  m = new RegExp(`^(${NUM})[ji]$`, "i").exec(compact);
  if (m) {
    const coef = finiteNumber(m[1]!);
    if (coef === null) return null;
    return { real: 0, imag: coef };
  }
  return null;
}

/**
 * Rectangular (3+4j, 3+j4, j4) and polar (10 < 30, 10 ∠ 45°) forms.
 * A trailing unit scales the whole complex value.
 */
export function parseComplexQuantity(raw: string | number): ComplexQuantity | null {
  try {
    if (typeof raw === "number") {
      if (!Number.isFinite(raw)) return null;
      return complexFromParts(raw, 0, null);
    }
    if (typeof raw !== "string") return null;
    const s = normalizeNumericString(raw);
    if (!s || /infinity|nan/i.test(s)) return null;

    const polar = s.match(
      new RegExp(
        `^(${NUM})\\s*(?:<|∠)\\s*(${NUM})(?:\\s*(deg|°|rad|рад))?\\s*(.*)$`,
        "i",
      ),
    );
    if (polar) {
      const mag = finiteNumber(polar[1]!);
      const angVal = finiteNumber(polar[2]!);
      if (mag === null || angVal === null) return null;
      const angUnit = (polar[3] ?? "deg").toLowerCase();
      const unitToken = (polar[4] ?? "").trim();
      const unitInfo = unitToken ? parseUnitToken(unitToken) : null;
      if (unitToken && !unitInfo) return null;
      const rad = angUnit === "rad" || angUnit === "рад" ? angVal : (angVal * Math.PI) / 180;
      return complexFromParts(mag * Math.cos(rad), mag * Math.sin(rad), unitInfo);
    }

    if (!/[ji]/i.test(s)) {
      const simple = parseQuantity(s);
      if (!simple) return null;
      const unitInfo = simple.unit && simple.dimension
        ? { unit: simple.unit, dimension: simple.dimension, factor: simple.value === 0 ? 1 : simple.scaledValue / simple.value }
        : null;
      return complexFromParts(simple.value, 0, unitInfo);
    }

    const peeled = peelTrailingUnit(s);
    if (!peeled) return null;
    const unitInfo = peeled.unit ? parseUnitToken(peeled.unit) : null;
    if (peeled.unit && !unitInfo) return null;
    const rect = parseRectangular(peeled.expr);
    if (!rect) return null;
    return complexFromParts(rect.real, rect.imag, unitInfo);
  } catch {
    return null;
  }
}

/**
 * SPICE component suffix. Case: m is milli, meg/M is mega. Not an SI unit parse.
 * Examples: 4.7k, 100n, 1meg, 10u, 2.2Meg.
 */
export function parseSpiceValue(raw: string): number | null {
  try {
    const s = normalizeNumericString(raw).replace(/\s+/g, "");
    if (!s) return null;
    const match = s.match(/^([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?)(meg|[tTgGkKmMuUnNpPfF])?$/);
    if (!match) return null;
    const base = finiteNumber(match[1]!);
    if (base === null) return null;
    const suf = match[2];
    if (!suf) return base;
    if (/^meg$/i.test(suf)) return base * 1e6;
    const table: Record<string, number> = {
      t: 1e12,
      T: 1e12,
      g: 1e9,
      G: 1e9,
      k: 1e3,
      K: 1e3,
      M: 1e6,
      m: 1e-3,
      u: 1e-6,
      U: 1e-6,
      n: 1e-9,
      N: 1e-9,
      p: 1e-12,
      P: 1e-12,
      f: 1e-15,
      F: 1e-15,
    };
    const factor = table[suf];
    if (factor === undefined) return null;
    return base * factor;
  } catch {
    return null;
  }
}

export type NumericFieldTarget = {
  name?: string;
  target: number | { real: number; imag: number } | string;
  unit?: string;
  absTolerance?: number;
  relTolerance?: number;
  requireUnit?: boolean;
};

export type GradeNumericResult = {
  correct: boolean;
  actual?: number | { real: number; imag: number };
  expected?: number | { real: number; imag: number };
  error?: string;
  fieldResults?: Record<string, { correct: boolean; error?: string; actual?: unknown; expected?: unknown }>;
};

export function isWithinTolerance(
  actual: number,
  expected: number,
  absTol = 0,
  relTol = 0.02,
): boolean {
  if (!Number.isFinite(actual) || !Number.isFinite(expected)) return false;
  if (!Number.isFinite(absTol) || !Number.isFinite(relTol) || absTol < 0 || relTol < 0) return false;
  if (actual === expected) return true;
  const diff = Math.abs(actual - expected);
  const maxAllowed = Math.max(absTol, relTol * Math.abs(expected));
  return diff <= maxAllowed + 1e-12;
}

function toleranceError(absTol: number, relTol: number): string | null {
  if (!Number.isFinite(absTol) || !Number.isFinite(relTol) || absTol < 0 || relTol < 0) {
    return "invalid_tolerance";
  }
  return null;
}

function expectedComplexBase(targetSpec: NumericFieldTarget): { real: number; imag: number; dimension?: string } | null {
  const exp = targetSpec.target as { real: number; imag: number };
  if (!Number.isFinite(exp.real) || !Number.isFinite(exp.imag)) return null;
  if (!targetSpec.unit) return { real: exp.real, imag: exp.imag };
  const unit = parseUnitToken(targetSpec.unit);
  if (!unit) return null;
  return { real: exp.real * unit.factor, imag: exp.imag * unit.factor, dimension: unit.dimension };
}

export function gradeSingleNumeric(
  userAnswer: string | number,
  targetSpec: NumericFieldTarget,
): { correct: boolean; error?: string; actual?: unknown; expected?: unknown } {
  try {
    const relTol = targetSpec.relTolerance ?? 0.02;
    const absTol = targetSpec.absTolerance ?? 0;
    const tolErr = toleranceError(absTol, relTol);
    if (tolErr) return { correct: false, error: tolErr };

    const isTargetComplex =
      typeof targetSpec.target === "object" &&
      targetSpec.target !== null &&
      "real" in targetSpec.target &&
      "imag" in targetSpec.target;

    if (isTargetComplex) {
      const expected = expectedComplexBase(targetSpec);
      if (!expected) return { correct: false, error: "invalid_target_definition" };
      const parsed = parseComplexQuantity(userAnswer);
      if (!parsed) return { correct: false, error: "invalid_complex_number" };
      if (expected.dimension && parsed.dimension && parsed.dimension !== expected.dimension) {
        return {
          correct: false,
          error: `wrong_dimension: expected ${expected.dimension}, got ${parsed.dimension}`,
          actual: { real: parsed.scaledReal, imag: parsed.scaledImag },
          expected: { real: expected.real, imag: expected.imag },
        };
      }
      const compareReal = parsed.dimension ? parsed.scaledReal : parsed.real;
      const compareImag = parsed.dimension ? parsed.scaledImag : parsed.imag;
      const expReal = parsed.dimension || !targetSpec.unit ? expected.real : (targetSpec.target as { real: number }).real;
      const expImag = parsed.dimension || !targetSpec.unit ? expected.imag : (targetSpec.target as { imag: number }).imag;
      const errMag = Math.hypot(compareReal - expReal, compareImag - expImag);
      const limit = Math.max(absTol, relTol * Math.hypot(expReal, expImag));
      const correct = errMag <= limit + 1e-12;
      return {
        correct,
        actual: { real: compareReal, imag: compareImag },
        expected: { real: expReal, imag: expImag },
        error: correct ? undefined : "out_of_tolerance",
      };
    }

    let expVal = 0;
    let expDim: string | undefined;
    if (typeof targetSpec.target === "number") {
      if (!Number.isFinite(targetSpec.target)) return { correct: false, error: "invalid_target_definition" };
      expVal = targetSpec.target;
      if (targetSpec.unit) {
        const u = parseUnitToken(targetSpec.unit);
        if (!u) return { correct: false, error: "invalid_target_definition" };
        expDim = u.dimension;
        expVal = targetSpec.target * u.factor;
      }
    } else {
      const parsedTarget = parseQuantity(String(targetSpec.target));
      if (!parsedTarget) return { correct: false, error: "invalid_target_definition" };
      expVal = parsedTarget.scaledValue;
      expDim = parsedTarget.dimension;
    }

    const parsedUser = parseQuantity(userAnswer);
    if (!parsedUser) {
      const raw = typeof userAnswer === "string" ? userAnswer.trim() : "";
      if (raw && /\d/.test(raw) && /[^\d\s.eE+\-]/.test(normalizeNumericString(raw))) {
        return { correct: false, error: "unknown_unit" };
      }
      return { correct: false, error: "invalid_number_format" };
    }

    if (expDim && parsedUser.dimension && parsedUser.dimension !== expDim) {
      return {
        correct: false,
        error: `wrong_dimension: expected ${expDim}, got ${parsedUser.dimension}`,
        actual: parsedUser.scaledValue,
        expected: expVal,
      };
    }

    if (targetSpec.requireUnit && !parsedUser.unit) {
      return { correct: false, error: "missing_unit", actual: parsedUser.value, expected: expVal };
    }

    const actualVal = parsedUser.dimension ? parsedUser.scaledValue : parsedUser.value;
    const expectedCompare = parsedUser.dimension || !targetSpec.unit ? expVal : (typeof targetSpec.target === "number" ? targetSpec.target : expVal);
    const ok = isWithinTolerance(actualVal, expectedCompare, absTol, relTol);
    return {
      correct: ok,
      actual: actualVal,
      expected: expectedCompare,
      error: ok ? undefined : "out_of_tolerance",
    };
  } catch {
    return { correct: false, error: "invalid_number_format" };
  }
}

export function gradeNumericAnswer(
  answer: unknown,
  exercise: {
    fields?: NumericFieldTarget[];
    target?: number | { real: number; imag: number } | string;
    unit?: string;
    absTolerance?: number;
    relTolerance?: number;
    requireUnit?: boolean;
  },
): GradeNumericResult {
  try {
    if (answer === null || answer === undefined) return { correct: false, error: "empty_answer" };
    if (typeof answer === "string") {
      const trimmed = answer.trim();
      if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
        try {
          answer = JSON.parse(trimmed);
        } catch {
          return { correct: false, error: "invalid_number_format" };
        }
      }
    }

    if (exercise.fields && exercise.fields.length > 0) {
      const ansObj = typeof answer === "object" && answer !== null && !Array.isArray(answer)
        ? (answer as Record<string, unknown>)
        : null;
      if (!ansObj) {
        if (exercise.fields.length === 1 && (typeof answer === "string" || typeof answer === "number")) {
          const fieldSpec = exercise.fields[0]!;
          const res = gradeSingleNumeric(answer, fieldSpec);
          return {
            correct: res.correct,
            actual: res.actual as GradeNumericResult["actual"],
            expected: res.expected as GradeNumericResult["expected"],
            error: res.error,
            fieldResults: { [fieldSpec.name ?? "value"]: res },
          };
        }
        return { correct: false, error: "expected_named_fields_object" };
      }

      const fieldResults: Record<string, { correct: boolean; error?: string; actual?: unknown; expected?: unknown }> = {};
      let allOk = true;
      for (const field of exercise.fields) {
        const fieldKey = field.name ?? "value";
        const userVal = ansObj[fieldKey];
        if (userVal === undefined || userVal === null || userVal === "") {
          fieldResults[fieldKey] = { correct: false, error: "field_missing" };
          allOk = false;
          continue;
        }
        if (typeof userVal !== "string" && typeof userVal !== "number") {
          fieldResults[fieldKey] = { correct: false, error: "invalid_number_format" };
          allOk = false;
          continue;
        }
        const res = gradeSingleNumeric(userVal, field);
        fieldResults[fieldKey] = res;
        if (!res.correct) allOk = false;
      }
      return { correct: allOk, fieldResults, error: allOk ? undefined : "one_or_more_fields_incorrect" };
    }

    if (exercise.target !== undefined) {
      const targetSpec: NumericFieldTarget = {
        target: exercise.target,
        unit: exercise.unit,
        absTolerance: exercise.absTolerance,
        relTolerance: exercise.relTolerance,
        requireUnit: exercise.requireUnit,
      };
      let userVal: unknown = answer;
      if (typeof answer === "object" && answer !== null && "value" in answer) {
        userVal = (answer as { value: unknown }).value;
      }
      if (typeof userVal !== "string" && typeof userVal !== "number") {
        return { correct: false, error: "invalid_number_format" };
      }
      const res = gradeSingleNumeric(userVal, targetSpec);
      return { correct: res.correct, actual: res.actual as GradeNumericResult["actual"], expected: res.expected as GradeNumericResult["expected"], error: res.error };
    }

    return { correct: false, error: "no_target_defined" };
  } catch {
    return { correct: false, error: "invalid_number_format" };
  }
}
