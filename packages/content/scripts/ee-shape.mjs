/** Shared record builders for authored electrical-engineering units. */

export function fmt(value) {
  if (typeof value !== "number" || !Number.isFinite(value)) return String(value);
  const rounded = Math.round(value * 1e6) / 1e6;
  return String(rounded);
}

export function n(target, unit, uk, en) {
  return { kind: "n", target, unit, uk, en };
}

export function q(uk, en, optionsUk, optionsEn, correct = 0) {
  return { kind: "q", uk, en, optionsUk, optionsEn, correct };
}

export function num(target, unit, uk, en) {
  return { target, unit, uk, en };
}

export function L(spec) {
  return {
    d: spec.d ?? 2,
    kpUk: spec.kpUk ?? [spec.tokenUk, spec.titleUk],
    kpEn: spec.kpEn ?? [spec.tokenEn, spec.titleEn],
    ...spec,
  };
}

const SOURCE_UK =
  "Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.";
const SOURCE_EN =
  "Ideal lumped model for teaching. Units are checked against the SI Brochure (BIPM). The numbers are a classroom example, not a measurement of a particular product.";

export function U(spec) {
  const index = Number(spec.code.slice(3));
  let file = "stage10.ts";
  let exportName = "stage10Units";
  if (index >= 9 && index <= 12) {
    file = "stage2-rest.ts";
    exportName = "stage2RestUnits";
  } else if (index <= 18) {
    file = "stage3.ts";
    exportName = "stage3Units";
  } else if (index <= 24) {
    file = "stage4.ts";
    exportName = "stage4Units";
  } else if (index <= 30) {
    file = "stage5.ts";
    exportName = "stage5Units";
  } else if (index <= 36) {
    file = "stage6.ts";
    exportName = "stage6Units";
  } else if (index >= 38 && index <= 42) {
    file = "stage7-rest.ts";
    exportName = "stage7RestUnits";
  } else if (index <= 48) {
    file = "stage8.ts";
    exportName = "stage8Units";
  } else if (index <= 54) {
    file = "stage9.ts";
    exportName = "stage9Units";
  }
  const out = {
    file,
    exportName,
    sourceUk: SOURCE_UK,
    sourceEn: SOURCE_EN,
    labNoteUk: "Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку.",
    labNoteEn: "The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.",
    examTitleUk: `Контрольна: ${spec.titleUk}`,
    examTitleEn: `Exam: ${spec.titleEn}`,
  };
  for (const [key, value] of Object.entries(spec)) {
    if (value !== undefined) out[key] = value;
  }
  return out;
}
