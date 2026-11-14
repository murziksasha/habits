/**
 * Numerical validation and engineering unit parsing with SI prefixes,
 * dimensional checks, and complex number support.
 */

export type ParsedQuantity = {
  value: number;
  unit?: string;
  dimension?: string;
  scaledValue: number; // Value converted to base unit (e.g. 5 mV -> 0.005 V)
};

export type ComplexQuantity = {
  real: number;
  imag: number;
  magnitude: number;
  phaseDeg: number;
  phaseRad: number;
  unit?: string;
  dimension?: string;
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
  "μ": 1e-6, // Greek mu
  m: 1e-3,
  c: 1e-2,
  d: 1e-1,
  k: 1e3,
  K: 1e3,
  M: 1e6,
  meg: 1e6,
  MEG: 1e6,
  Meg: 1e6,
  G: 1e9,
  g: 1e9,
  T: 1e12,
  t: 1e12,
};

// Base units and dimensional mapping
export const UNIT_TO_DIMENSION: Record<string, { dimension: string; factor: number }> = {
  // Voltage
  v: { dimension: "voltage", factor: 1 },
  volt: { dimension: "voltage", factor: 1 },
  volts: { dimension: "voltage", factor: 1 },
  в: { dimension: "voltage", factor: 1 },
  вольт: { dimension: "voltage", factor: 1 },

  // Current
  a: { dimension: "current", factor: 1 },
  amp: { dimension: "current", factor: 1 },
  amps: { dimension: "current", factor: 1 },
  ampere: { dimension: "current", factor: 1 },
  а: { dimension: "current", factor: 1 },
  ампер: { dimension: "current", factor: 1 },

  // Resistance
  ohm: { dimension: "resistance", factor: 1 },
  ohms: { dimension: "resistance", factor: 1 },
  "ω": { dimension: "resistance", factor: 1 },
  "Ω": { dimension: "resistance", factor: 1 },
  om: { dimension: "resistance", factor: 1 },
  ом: { dimension: "resistance", factor: 1 },

  // Conductance
  s: { dimension: "conductance", factor: 1 },
  siemens: { dimension: "conductance", factor: 1 },
  см: { dimension: "conductance", factor: 1 },
  сіменс: { dimension: "conductance", factor: 1 },

  // Capacitance
  f: { dimension: "capacitance", factor: 1 },
  farad: { dimension: "capacitance", factor: 1 },
  ф: { dimension: "capacitance", factor: 1 },
  фарад: { dimension: "capacitance", factor: 1 },

  // Inductance
  h: { dimension: "inductance", factor: 1 },
  henry: { dimension: "inductance", factor: 1 },
  гн: { dimension: "inductance", factor: 1 },
  генрі: { dimension: "inductance", factor: 1 },

  // Frequency
  hz: { dimension: "frequency", factor: 1 },
  hertz: { dimension: "frequency", factor: 1 },
  гц: { dimension: "frequency", factor: 1 },
  герц: { dimension: "frequency", factor: 1 },

  // Active Power
  w: { dimension: "power", factor: 1 },
  watt: { dimension: "power", factor: 1 },
  watts: { dimension: "power", factor: 1 },
  вт: { dimension: "power", factor: 1 },
  ват: { dimension: "power", factor: 1 },
  ватт: { dimension: "power", factor: 1 },

  // Apparent Power
  va: { dimension: "apparent_power", factor: 1 },
  "вольт-ампер": { dimension: "apparent_power", factor: 1 },
  ва: { dimension: "apparent_power", factor: 1 },

  // Reactive Power
  var: { dimension: "reactive_power", factor: 1 },
  вар: { dimension: "reactive_power", factor: 1 },

  // Time
  s_time: { dimension: "time", factor: 1 },
  sec: { dimension: "time", factor: 1 },
  second: { dimension: "time", factor: 1 },
  seconds: { dimension: "time", factor: 1 },
  сек: { dimension: "time", factor: 1 },
  секунда: { dimension: "time", factor: 1 },
  ms: { dimension: "time", factor: 1e-3 },
  us: { dimension: "time", factor: 1e-6 },
  ns: { dimension: "time", factor: 1e-9 },
  min: { dimension: "time", factor: 60 },
  хв: { dimension: "time", factor: 60 },

  // Angle
  deg: { dimension: "angle_deg", factor: 1 },
  "°": { dimension: "angle_deg", factor: 1 },
  град: { dimension: "angle_deg", factor: 1 },
  rad: { dimension: "angle_deg", factor: 180 / Math.PI },
  рад: { dimension: "angle_deg", factor: 180 / Math.PI },

  // Ratio / Percentage
  "%": { dimension: "ratio", factor: 0.01 },
  percent: { dimension: "ratio", factor: 0.01 },
  відсоток: { dimension: "ratio", factor: 0.01 },

  // Decibel
  db: { dimension: "decibel", factor: 1 },
  дб: { dimension: "decibel", factor: 1 },
};

/**
 * Normalizes input string for numerical evaluation:
 * - Replaces decimal commas with dots
 * - Normalizes scientific notation (e.g. 1.5*10^-3 or 1.5x10^-3 -> 1.5e-3)
 * - Collapses whitespace
 */
export function normalizeNumericString(input: string): string {
  let s = input.trim();
  // Replace decimal commas that are between digits
  s = s.replace(/(\d+),(\d+)/g, "$1.$2");
  // Replace unicode minus
  s = s.replace(/[\u2013\u2014\u2212]/g, "-");
  // Replace scientific notation: e.g. 1.2 * 10^-3 or 1.2 x 10^3 or 1.2*10(3)
  s = s.replace(/([0-9.]+)\s*[*x×·]\s*10\s*\^?\s*\(?([+-]?[0-9]+)\)?/gi, "$1e$2");
  return s.trim();
}

/**
 * Splits string into value and unit with SI prefix recognition.
 */
export function parseQuantity(raw: string | number): ParsedQuantity | null {
  if (typeof raw === "number") {
    if (!Number.isFinite(raw)) return null;
    return { value: raw, scaledValue: raw };
  }

  const s = normalizeNumericString(raw);
  if (!s) return null;

  // Regex matching number followed by optional unit
  const match = s.match(/^([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?)\s*(.*)$/);
  if (!match) return null;

  const numStr = match[1]!;
  let unitStr = match[2]!.trim();
  const baseNum = Number(numStr);
  if (!Number.isFinite(baseNum)) return null;

  if (!unitStr) {
    return { value: baseNum, scaledValue: baseNum };
  }

  // Remove common enclosing brackets e.g. [V] or (mA)
  unitStr = unitStr.replace(/^[\[(](.*)[\])]$/, "$1").trim();

  // Special case: %
  if (unitStr === "%") {
    return { value: baseNum, unit: "%", dimension: "ratio", scaledValue: baseNum * 0.01 };
  }

  // Check direct unit match (e.g. "deg", "rad", "ms", "us")
  const directUnit = unitStr.toLowerCase();
  if (UNIT_TO_DIMENSION[directUnit]) {
    const info = UNIT_TO_DIMENSION[directUnit]!;
    return {
      value: baseNum,
      unit: unitStr,
      dimension: info.dimension,
      scaledValue: baseNum * info.factor,
    };
  }

  // Check if unitStr is a standalone prefix (e.g. "k", "meg", "m", "u", "n", "p")
  if (SI_PREFIX_FACTORS[unitStr] !== undefined || SI_PREFIX_FACTORS[directUnit] !== undefined) {
    const factor = SI_PREFIX_FACTORS[unitStr] ?? SI_PREFIX_FACTORS[directUnit] ?? 1;
    return {
      value: baseNum,
      unit: unitStr,
      dimension: directUnit === "meg" ? "resistance" : undefined,
      scaledValue: baseNum * factor,
    };
  }

  // Try extracting SI prefix + unit
  // Special handling for "meg" / "MEG" (e.g. MegOhm, Meg, meg)
  let prefix = "";
  let baseUnitPart = "";

  if (directUnit.startsWith("meg")) {
    prefix = "meg";
    baseUnitPart = unitStr.slice(3).trim();
  } else if (unitStr.length >= 2) {
    // 1-character prefix: k, M, m, u, n, p, f, etc.
    const candPrefix = unitStr[0]!;
    const candUnit = unitStr.slice(1).trim();
    if (SI_PREFIX_FACTORS[candPrefix] !== undefined && UNIT_TO_DIMENSION[candUnit.toLowerCase()]) {
      prefix = candPrefix;
      baseUnitPart = candUnit;
    }
  }

  if (prefix) {
    if (!baseUnitPart) {
      const prefixFactor = SI_PREFIX_FACTORS[prefix] ?? 1;
      return {
        value: baseNum,
        unit: unitStr,
        dimension: prefix === "meg" ? "resistance" : undefined,
        scaledValue: baseNum * prefixFactor,
      };
    }
    const unitLower = baseUnitPart.toLowerCase();
    const info = UNIT_TO_DIMENSION[unitLower];
    if (info) {
      const prefixFactor = SI_PREFIX_FACTORS[prefix] ?? 1;
      return {
        value: baseNum,
        unit: unitStr,
        dimension: info.dimension,
        scaledValue: baseNum * prefixFactor * info.factor,
      };
    }
  }

  // Fallback: If unit cannot be parsed, treat as unknown unit or dimensionless
  return {
    value: baseNum,
    unit: unitStr,
    scaledValue: baseNum,
  };
}

/**
 * Parses complex numbers in rectangular or polar format.
 * Rectangular: "3 + 4j", "3 - 4i", "-2 + j5", "10"
 * Polar: "10 < 30", "10 ∠ 45", "10 < 0.5rad"
 */
export function parseComplexQuantity(raw: string | number): ComplexQuantity | null {
  if (typeof raw === "number") {
    if (!Number.isFinite(raw)) return null;
    return {
      real: raw,
      imag: 0,
      magnitude: Math.abs(raw),
      phaseDeg: raw >= 0 ? 0 : 180,
      phaseRad: raw >= 0 ? 0 : Math.PI,
    };
  }

  const s = normalizeNumericString(raw);
  if (!s) return null;

  // Polar check: magnitude < angle or magnitude ∠ angle
  const polarMatch = s.match(
    /^([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?)\s*(?:<|∠)\s*([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?)\s*(deg|°|rad)?\s*(.*)$/i,
  );
  if (polarMatch) {
    const mag = Number(polarMatch[1]);
    const angVal = Number(polarMatch[2]);
    const angUnit = (polarMatch[3] ?? "deg").toLowerCase();
    const unit = polarMatch[4]?.trim();

    if (!Number.isFinite(mag) || !Number.isFinite(angVal)) return null;

    let rad = angUnit === "rad" ? angVal : (angVal * Math.PI) / 180;
    let deg = angUnit === "rad" ? (angVal * 180) / Math.PI : angVal;

    // Normalize deg to [-180, 180]
    deg = ((((deg + 180) % 360) + 360) % 360) - 180;
    rad = (deg * Math.PI) / 180;

    const real = mag * Math.cos(rad);
    const imag = mag * Math.sin(rad);

    return {
      real,
      imag,
      magnitude: Math.abs(mag),
      phaseDeg: deg,
      phaseRad: rad,
      unit: unit || undefined,
    };
  }

  // Rectangular check: e.g. "3 + 4j", "3 - j4", "4j", "-3"
  // Clean spaces around + and -
  const clean = s.replace(/\s+/g, "");
  // Pattern: real part (optional) and imaginary part (optional) with j or i
  const rectMatch = clean.match(
    /^([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?)?([+-]?(?:\d+(?:\.\d*)?|\.\d+)?(?:[eE][+-]?\d+)?)?([ji])?\s*(.*)$/i,
  );

  // If simple real number
  const single = parseQuantity(s);
  if (!s.toLowerCase().includes("j") && !s.toLowerCase().includes("i") && single) {
    const val = single.scaledValue;
    return {
      real: val,
      imag: 0,
      magnitude: Math.abs(val),
      phaseDeg: val >= 0 ? 0 : 180,
      phaseRad: val >= 0 ? 0 : Math.PI,
      unit: single.unit,
      dimension: single.dimension,
    };
  }

  // More robust regex for complex: a + bj or a - bj or bj or jb
  const compRegex =
    /^(?:([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?))?\s*(?:([+-])\s*(?:([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?)[*]?([ji])|([ji])[*]?([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?)))?$/i;

  // Let's do a direct, robust parser for a + bj
  // Try splitting by '+' or '-' considering leading sign and exponent signs
  let realPart = 0;
  let imagPart = 0;
  let hasImag = false;
  let hasReal = false;

  // Extract tokens: matches numbers with optional trailing/preceding j/i
  const tokenRegex = /([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?)([ji])?|([+-]?[ji])(?!\w)/gi;
  let matchTok;
  let matchCount = 0;

  while ((matchTok = tokenRegex.exec(clean)) !== null) {
    matchCount++;
    const num = matchTok[1];
    const unitJ = matchTok[2];
    const standAloneJ = matchTok[3];

    if (standAloneJ) {
      hasImag = true;
      const sign = standAloneJ.startsWith("-") ? -1 : 1;
      imagPart += sign * 1;
    } else if (unitJ) {
      hasImag = true;
      imagPart += Number(num);
    } else if (num !== undefined) {
      hasReal = true;
      realPart += Number(num);
    }
  }

  if (matchCount > 0 && (hasReal || hasImag)) {
    const mag = Math.hypot(realPart, imagPart);
    const rad = Math.atan2(imagPart, realPart);
    const deg = (rad * 180) / Math.PI;
    return {
      real: realPart,
      imag: imagPart,
      magnitude: mag,
      phaseDeg: deg,
      phaseRad: rad,
    };
  }

  return null;
}

export type NumericFieldTarget = {
  name?: string;
  target: number | { real: number; imag: number } | string;
  unit?: string;
  absTolerance?: number;
  relTolerance?: number; // Default 0.02 (2%)
  requireUnit?: boolean;
};

export type GradeNumericResult = {
  correct: boolean;
  actual?: number | { real: number; imag: number };
  expected?: number | { real: number; imag: number };
  error?: string;
  fieldResults?: Record<string, { correct: boolean; error?: string; actual?: any; expected?: any }>;
};

/**
 * Checks whether an actual value matches expected value within tolerances:
 * |actual - expected| <= max(absTolerance, relTolerance * |expected|)
 */
export function isWithinTolerance(
  actual: number,
  expected: number,
  absTol = 0,
  relTol = 0.02,
): boolean {
  if (!Number.isFinite(actual) || !Number.isFinite(expected)) return false;
  if (actual === expected) return true;
  const diff = Math.abs(actual - expected);
  const maxAllowed = Math.max(absTol, relTol * Math.abs(expected));
  return diff <= maxAllowed + 1e-12;
}

/**
 * Grade a single numeric quantity against target specifications.
 */
export function gradeSingleNumeric(
  userAnswer: string | number,
  targetSpec: NumericFieldTarget,
): { correct: boolean; error?: string; actual?: any; expected?: any } {
  const relTol = targetSpec.relTolerance ?? 0.02;
  const absTol = targetSpec.absTolerance ?? 0;

  // Check if target is complex
  const isTargetComplex =
    typeof targetSpec.target === "object" &&
    targetSpec.target !== null &&
    "real" in targetSpec.target &&
    "imag" in targetSpec.target;

  if (isTargetComplex) {
    const expComp = targetSpec.target as { real: number; imag: number };
    const parsedComp = parseComplexQuantity(userAnswer);
    if (!parsedComp) {
      return { correct: false, error: "invalid_complex_number" };
    }

    const realOk = isWithinTolerance(parsedComp.real, expComp.real, absTol, relTol);
    const imagOk = isWithinTolerance(parsedComp.imag, expComp.imag, absTol, relTol);
    const correct = realOk && imagOk;

    return {
      correct,
      actual: { real: parsedComp.real, imag: parsedComp.imag },
      expected: expComp,
      error: correct ? undefined : "out_of_tolerance",
    };
  }

  // Parse expected value
  let expVal = 0;
  let expUnit = targetSpec.unit;
  let expDim: string | undefined;

  if (typeof targetSpec.target === "number") {
    expVal = targetSpec.target;
    if (expUnit) {
      const u = UNIT_TO_DIMENSION[expUnit.toLowerCase()];
      if (u) expDim = u.dimension;
    }
  } else {
    const parsedTarget = parseQuantity(String(targetSpec.target));
    if (!parsedTarget) return { correct: false, error: "invalid_target_definition" };
    expVal = parsedTarget.scaledValue;
    expDim = parsedTarget.dimension;
    expUnit = parsedTarget.unit ?? expUnit;
  }

  // Parse user answer
  const parsedUser = parseQuantity(userAnswer);
  if (!parsedUser) {
    return { correct: false, error: "invalid_number_format" };
  }

  // Dimensional verification if target expects a unit
  if (expDim && parsedUser.dimension && parsedUser.dimension !== expDim) {
    return {
      correct: false,
      error: `wrong_dimension: expected ${expDim}, got ${parsedUser.dimension}`,
      actual: parsedUser.value,
      expected: expVal,
    };
  }

  if (targetSpec.requireUnit && !parsedUser.unit) {
    return {
      correct: false,
      error: "missing_unit",
      actual: parsedUser.value,
      expected: expVal,
    };
  }

  // Comparison using scaled values in base SI units
  const actualVal = parsedUser.dimension ? parsedUser.scaledValue : parsedUser.value;
  const ok = isWithinTolerance(actualVal, expVal, absTol, relTol);

  return {
    correct: ok,
    actual: actualVal,
    expected: expVal,
    error: ok ? undefined : "out_of_tolerance",
  };
}

/**
 * Grade full numeric exercise answer.
 * Handles either:
 * - Single value with target / fields
 * - Multiple named fields: answer is { [key: string]: value }
 */
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
  if (answer === null || answer === undefined) {
    return { correct: false, error: "empty_answer" };
  }

  // If exercise defines multiple fields
  if (exercise.fields && exercise.fields.length > 0) {
    const ansObj =
      typeof answer === "object" && answer !== null ? (answer as Record<string, any>) : null;

    if (!ansObj) {
      // If single field and user passed string/number
      if (exercise.fields.length === 1 && (typeof answer === "string" || typeof answer === "number")) {
        const fieldSpec = exercise.fields[0]!;
        const res = gradeSingleNumeric(answer, fieldSpec);
        return {
          correct: res.correct,
          actual: res.actual,
          expected: res.expected,
          error: res.error,
          fieldResults: { [fieldSpec.name ?? "value"]: res },
        };
      }
      return { correct: false, error: "expected_named_fields_object" };
    }

    const fieldResults: Record<string, { correct: boolean; error?: string; actual?: any; expected?: any }> = {};
    let allOk = true;

    for (const field of exercise.fields) {
      const fieldKey = field.name ?? "value";
      const userVal = ansObj[fieldKey];
      if (userVal === undefined || userVal === null || userVal === "") {
        fieldResults[fieldKey] = { correct: false, error: "field_missing" };
        allOk = false;
        continue;
      }

      const res = gradeSingleNumeric(userVal, field);
      fieldResults[fieldKey] = res;
      if (!res.correct) allOk = false;
    }

    return {
      correct: allOk,
      fieldResults,
      error: allOk ? undefined : "one_or_more_fields_incorrect",
    };
  }

  // Single target
  if (exercise.target !== undefined) {
    const targetSpec: NumericFieldTarget = {
      target: exercise.target,
      unit: exercise.unit,
      absTolerance: exercise.absTolerance,
      relTolerance: exercise.relTolerance,
      requireUnit: exercise.requireUnit,
    };

    let userVal: any = answer;
    if (typeof answer === "object" && answer !== null && "value" in answer) {
      userVal = (answer as any).value;
    }

    const res = gradeSingleNumeric(userVal, targetSpec);
    return {
      correct: res.correct,
      actual: res.actual,
      expected: res.expected,
      error: res.error,
    };
  }

  return { correct: false, error: "invalid_exercise_definition" };
}
