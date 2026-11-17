import { describe, expect, it } from "vitest";
import {
  gradeNumericAnswer,
  gradeSingleNumeric,
  isWithinTolerance,
  normalizeNumericString,
  parseComplexQuantity,
  parseQuantity,
  parseSpiceValue,
} from "./numeric.js";

describe("numeric engine & parser", () => {
  it("normalizes comma and scientific notation", () => {
    expect(normalizeNumericString("3,14")).toBe("3.14");
    expect(normalizeNumericString("1,5 * 10^-3")).toBe("1.5e-3");
    expect(normalizeNumericString("2.2 x 10^3")).toBe("2.2e3");
    expect(normalizeNumericString("10 · 10(2)")).toBe("10e2");
  });

  it("parses quantities with SI prefixes and dimensions", () => {
    const v1 = parseQuantity("12 V");
    expect(v1).toMatchObject({ value: 12, unit: "V", dimension: "voltage", scaledValue: 12 });

    const v2 = parseQuantity("500 mV");
    expect(v2).toMatchObject({ value: 500, dimension: "voltage", scaledValue: 0.5 });

    const r1 = parseQuantity("4.7 kΩ");
    expect(r1).toMatchObject({ value: 4.7, dimension: "resistance", scaledValue: 4700 });

    const r2 = parseQuantity("2.2 meg");
    expect(r2).toMatchObject({ value: 2.2, dimension: "resistance", scaledValue: 2.2e6 });

    const c1 = parseQuantity("100 uF");
    expect(c1?.value).toBe(100);
    expect(c1?.dimension).toBe("capacitance");
    expect(c1?.scaledValue).toBeCloseTo(1e-4);

    const f1 = parseQuantity("50 Hz");
    expect(f1).toMatchObject({ value: 50, dimension: "frequency", scaledValue: 50 });

    const p1 = parseQuantity("2.5 kW");
    expect(p1).toMatchObject({ value: 2.5, dimension: "power", scaledValue: 2500 });
  });

  it("parses complex numbers in rectangular and polar forms", () => {
    const c1 = parseComplexQuantity("3 + 4j");
    expect(c1).not.toBeNull();
    expect(c1!.real).toBeCloseTo(3);
    expect(c1!.imag).toBeCloseTo(4);
    expect(c1!.magnitude).toBeCloseTo(5);
    expect(c1!.phaseDeg).toBeCloseTo(53.13, 1);

    const c2 = parseComplexQuantity("10 < 30");
    expect(c2).not.toBeNull();
    expect(c2!.magnitude).toBeCloseTo(10);
    expect(c2!.phaseDeg).toBeCloseTo(30);
    expect(c2!.real).toBeCloseTo(10 * Math.cos(Math.PI / 6));
    expect(c2!.imag).toBeCloseTo(10 * Math.sin(Math.PI / 6));

    const c3 = parseComplexQuantity("10 ∠ 45");
    expect(c3).not.toBeNull();
    expect(c3!.phaseDeg).toBeCloseTo(45);
  });

  it("evaluates tolerances accurately", () => {
    // 100 with 2% relTol allows [98, 102]
    expect(isWithinTolerance(101.5, 100, 0, 0.02)).toBe(true);
    expect(isWithinTolerance(98.1, 100, 0, 0.02)).toBe(true);
    expect(isWithinTolerance(103, 100, 0, 0.02)).toBe(false);

    // Absolute tolerance
    expect(isWithinTolerance(0.005, 0, 0.01, 0.02)).toBe(true);
    expect(isWithinTolerance(0.02, 0, 0.01, 0.02)).toBe(false);
  });

  it("rejects a wrong sign and a zero at charge scale", () => {
    const electrons = 3.204e-9;
    const electronAbs = electrons * 0.01;
    expect(isWithinTolerance(electrons, electrons, electronAbs, 0.02)).toBe(true);
    expect(isWithinTolerance(0, electrons, electronAbs, 0.02)).toBe(false);
    expect(isWithinTolerance(electrons * 1e3, electrons, electronAbs, 0.02)).toBe(false);

    const ion = -3.204e-19;
    const ionAbs = Math.abs(ion) * 0.01;
    expect(isWithinTolerance(ion, ion, ionAbs, 0.02)).toBe(true);
    expect(isWithinTolerance(Math.abs(ion), ion, ionAbs, 0.02)).toBe(false);
    expect(isWithinTolerance(0, ion, ionAbs, 0.02)).toBe(false);

    expect(
      gradeSingleNumeric("0", {
        target: electrons,
        unit: "C",
        absTolerance: electronAbs,
        relTolerance: 0.02,
      }).correct,
    ).toBe(false);
    expect(
      gradeSingleNumeric("3.204e-19", {
        target: ion,
        unit: "C",
        absTolerance: ionAbs,
        relTolerance: 0.02,
      }).correct,
    ).toBe(false);
    expect(
      gradeSingleNumeric("-3.204e-19", {
        target: ion,
        unit: "C",
        absTolerance: ionAbs,
        relTolerance: 0.02,
      }).correct,
    ).toBe(true);
  });

  it("grades single numeric values with unit conversions and dimensional checks", () => {
    // Expected 12 V
    const res1 = gradeSingleNumeric("12", { target: 12, unit: "V" });
    expect(res1.correct).toBe(true);

    const res2 = gradeSingleNumeric("12000 mV", { target: 12, unit: "V" });
    expect(res2.correct).toBe(true);

    // Wrong dimension: entering Current when Voltage expected
    const resWrongDim = gradeSingleNumeric("12 mA", { target: 12, unit: "V" });
    expect(resWrongDim.correct).toBe(false);
    expect(resWrongDim.error).toContain("wrong_dimension");

    // Invalid format
    const resInvalid = gradeSingleNumeric("foobar", { target: 12, unit: "V" });
    expect(resInvalid.correct).toBe(false);
    expect(resInvalid.error).toBe("invalid_number_format");
  });

  it("grades complex targets", () => {
    const res = gradeSingleNumeric("3 + 4j", {
      target: { real: 3, imag: 4 },
      relTolerance: 0.05,
    });
    expect(res.correct).toBe(true);

    const resPolar = gradeSingleNumeric("5 ∠ 53.13", {
      target: { real: 3, imag: 4 },
      relTolerance: 0.05,
    });
    expect(resPolar.correct).toBe(true);
  });

  it("grades charge, energy, force, field, torque, and a count", () => {
    expect(gradeSingleNumeric("3 nC", { target: 3, unit: "nC" }).correct).toBe(true);
    expect(gradeSingleNumeric("3", { target: 3, unit: "nC" }).correct).toBe(true);
    expect(gradeSingleNumeric("3 C", { target: 3, unit: "nC" }).correct).toBe(false);
    expect(gradeSingleNumeric("2 J", { target: 2, unit: "J" }).correct).toBe(true);
    expect(gradeSingleNumeric("4 N", { target: 4, unit: "N" }).correct).toBe(true);
    expect(gradeSingleNumeric("2000 N/C", { target: 2000, unit: "N/C" }).correct).toBe(true);
    expect(gradeSingleNumeric("2 Nm", { target: 2, unit: "Nm" }).correct).toBe(true);
    expect(gradeSingleNumeric("1440 rpm", { target: 1440, unit: "rpm" }).correct).toBe(true);
    expect(gradeSingleNumeric("12", { target: 12, unit: "1" }).correct).toBe(true);
  });

  it("grades tesla, weber, a kelvin interval, and the metre", () => {
    expect(parseQuantity("0.3 T")?.dimension).toBe("magnetic_flux_density");
    expect(parseQuantity("0.3 T")?.scaledValue).toBeCloseTo(0.3);
    expect(parseQuantity("300 mT")?.scaledValue).toBeCloseTo(0.3);
    expect(parseQuantity("1 THz")?.dimension).toBe("frequency");
    expect(parseQuantity("1 THz")?.scaledValue).toBeCloseTo(1e12);
    expect(parseQuantity("1 TV")?.scaledValue).toBeCloseTo(1e12);
    expect(parseQuantity("6 uWb")?.scaledValue).toBeCloseTo(6e-6);
    expect(parseQuantity("12.8 K")?.dimension).toBe("temperature");
    expect(gradeSingleNumeric("12.8 °C", { target: 12.8, unit: "K", relTolerance: 0.01 }).correct).toBe(true);
    expect(parseQuantity("1 ms")?.dimension).toBe("time");
    expect(parseQuantity("1 ms")?.scaledValue).toBeCloseTo(1e-3);
    expect(parseQuantity("1 mV")?.scaledValue).toBeCloseTo(1e-3);
    expect(parseQuantity("1 m")?.dimension).toBe("length");
    expect(parseQuantity("0.209 mm")?.scaledValue).toBeCloseTo(2.09e-4);
    expect(parseSpiceValue("1T")).toBe(1e12);
    expect(gradeSingleNumeric("0.3 T", { target: 0.3, unit: "T" }).correct).toBe(true);
    expect(gradeSingleNumeric("0.3 mT", { target: 0.3, unit: "T" }).correct).toBe(false);
  });

  it("rejects unknown units, extra text, and non-finite values", () => {
    expect(parseQuantity("5 bananas")).toBeNull();
    expect(gradeSingleNumeric("5 bananas", { target: 5, unit: "V" }).error).toBe("unknown_unit");
    expect(parseQuantity("12 V extra")).toBeNull();
    expect(parseQuantity("Infinity V")).toBeNull();
    expect(gradeNumericAnswer("{", { target: 1 }).error).toBe("invalid_number_format");
    expect(gradeSingleNumeric("1", { target: 1, absTolerance: -1 }).error).toBe("invalid_tolerance");
  });

  it("keeps s/S and m/M distinct and scales a whole complex value", () => {
    expect(parseQuantity("1 s")?.dimension).toBe("time");
    expect(parseQuantity("1 S")?.dimension).toBe("conductance");
    expect(parseQuantity("1 ms")?.scaledValue).toBeCloseTo(1e-3);
    expect(parseQuantity("1 MS")?.scaledValue).toBeCloseTo(1e6);
    const scaled = parseComplexQuantity("3 + j4 kΩ");
    expect(scaled?.scaledReal).toBeCloseTo(3000);
    expect(scaled?.scaledImag).toBeCloseTo(4000);
    expect(parseComplexQuantity("3 + j4")?.imag).toBeCloseTo(4);
    const graded = gradeSingleNumeric("3 + j4 kΩ", {
      target: { real: 3000, imag: 4000 },
      unit: "ohm",
      relTolerance: 0.01,
    });
    expect(graded.correct).toBe(true);
  });

  it("grades multi-field numeric answers", () => {
    const exercise = {
      fields: [
        { name: "v_out", target: 5, unit: "V", relTolerance: 0.02 },
        { name: "i_load", target: 0.02, unit: "A", relTolerance: 0.05 },
      ],
    };

    const goodAnswer = {
      v_out: "5.02 V",
      i_load: "20 mA",
    };
    const resGood = gradeNumericAnswer(goodAnswer, exercise);
    expect(resGood.correct).toBe(true);
    expect(resGood.fieldResults?.v_out?.correct).toBe(true);
    expect(resGood.fieldResults?.i_load?.correct).toBe(true);

    const badAnswer = {
      v_out: "5.02 V",
      i_load: "50 mA", // wrong current
    };
    const resBad = gradeNumericAnswer(badAnswer, exercise);
    expect(resBad.correct).toBe(false);
    expect(resBad.fieldResults?.v_out?.correct).toBe(true);
    expect(resBad.fieldResults?.i_load?.correct).toBe(false);
  });
});
