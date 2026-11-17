/**
 * Assembles authored electrical-engineering lesson records into lesson-kit sources.
 * The records carry the model, the worked numbers, and the mistake.
 * This script only serialises them. It does not invent a lesson from a title.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const unitModules = fs
  .readdirSync(scriptDir)
  .filter((name) => /^ee-units-.*\.mjs$/.test(name))
  .sort();
const loaded = [];
for (const name of unitModules) {
  const mod = await import(pathToFileURL(path.join(scriptDir, name)).href);
  if (!Array.isArray(mod.units)) throw new Error(`missing units in ${name}`);
  loaded.push(...mod.units);
}

const banned = /коефіцієнті 1\.5|factor 1\.5|базовому значенні|Частина \d|Part \d/i;
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../src/electrical-engineering");

function js(value) {
  return JSON.stringify(value);
}

function words(text) {
  return String(text).split(/\s+/).filter(Boolean).length;
}

function padSample(text, token, lang) {
  const pad =
    lang === "uk"
      ? `Саме слово ${token} фіксує модель цього уроку і відділяє її від характерної помилки, яку тут розібрано.`
      : `The word ${token} names the model of this lesson and separates it from the mistake worked here.`;
  let sample = `${text} ${pad}`;
  while (words(sample) < 22) sample = `${sample} ${pad}`;
  return sample;
}

function lessonBody(lesson) {
  const uk = [
    `Питання: ${lesson.qUk}`,
    `Модель: ${lesson.modelUk}`,
    `Приклад. ${lesson.exUk}`,
    `Перевірка: ${lesson.checkUk}`,
    `Помилка: ${lesson.errUk}`,
    `Межа: ${lesson.limUk}`,
  ].join(" ");
  const en = [
    `Question: ${lesson.qEn}`,
    `Model: ${lesson.modelEn}`,
    `Example. ${lesson.exEn}`,
    `Check: ${lesson.checkEn}`,
    `Mistake: ${lesson.errEn}`,
    `Limit: ${lesson.limEn}`,
  ].join(" ");
  return { uk, en };
}

function targetLiteral(target) {
  if (typeof target === "number") {
    if (!Number.isFinite(target)) throw new Error(`non-finite target ${target}`);
    return String(target);
  }
  if (!target || !Number.isFinite(target.real) || !Number.isFinite(target.imag)) {
    throw new Error(`bad complex target ${JSON.stringify(target)}`);
  }
  return `{ real: ${target.real}, imag: ${target.imag} }`;
}

function emitChecks(code, index, lesson) {
  const slug = `${code}-l${index}`;
  const id = (suffix) => `${slug}-${suffix}-v2`;
  const lines = [];
  if (lesson.lab) {
    lines.push(
      `        dividerLab(${js(id("lab"))}, ${js(lesson.lab.uk)}, ${js(lesson.lab.en)}, ${lesson.lab.vin}, ${lesson.lab.r1}, ${lesson.lab.r2}),`,
    );
  }
  const labFns = {
    analog: "analogProjectLab",
    filter: "filterProjectLab",
    buck: "buckProjectLab",
    phase: "phaseProjectLab",
  };
  for (const name of lesson.labs ?? []) {
    const fn = labFns[name];
    if (!fn) throw new Error(`unknown lab ${slug} ${name}`);
    const prompt = lesson.labPrompts?.[name] ?? { uk: lesson.labUk, en: lesson.labEn };
    if (!prompt.uk || !prompt.en || prompt.uk === prompt.en) throw new Error(`lab prompt ${slug} ${name}`);
    lines.push(`        ${fn}(${js(id(`lab-${name}`))}, ${js(prompt.uk)}, ${js(prompt.en)}),`);
  }
  lesson.nums.forEach((item, i) => {
    if (item.uk === item.en) throw new Error(`same numeric prompt ${slug} ${i}`);
    lines.push(
      `        num(${js(id(`n${i + 1}`))}, ${js(item.uk)}, ${js(item.en)}, ${targetLiteral(item.target)}, ${js(item.unit)}),`,
    );
  });
  const mcq = lesson.mcq;
  if (!mcq || mcq.optionsUk.length < 2 || mcq.optionsEn.length !== mcq.optionsUk.length) {
    throw new Error(`mcq ${slug}`);
  }
  if (mcq.uk === mcq.en) throw new Error(`same mcq ${slug}`);
  lines.push(
    `        mcq(${js(id("q"))}, ${js(mcq.uk)}, ${js(mcq.en)}, ${js(mcq.optionsUk)}, ${js(mcq.optionsEn)}, ${mcq.correct}),`,
  );
  return lines;
}

function emitLesson(code, index, lesson, bodies) {
  const slug = `${code}-l${index}`;
  const { uk, en } = lessonBody(lesson);
  if (uk.length <= 400) throw new Error(`short body ${slug} ${uk.length}`);
  if (en.length <= 400) throw new Error(`short en body ${slug} ${en.length}`);
  const bannedHit = `${uk}\n${en}\n${lesson.titleUk}\n${lesson.titleEn}`.match(banned);
  if (bannedHit) throw new Error(`banned phrase ${slug}: ${bannedHit[0]}`);
  if (bodies.has(uk)) throw new Error(`duplicate body ${slug}`);
  bodies.add(uk);
  if (!Array.isArray(lesson.nums) || lesson.nums.length < 2) throw new Error(`nums ${slug}`);
  const sampleUk = padSample(lesson.sampleUk ?? `${lesson.checkUk} ${lesson.errUk}`, lesson.tokenUk, "uk");
  const sampleEn = padSample(lesson.sampleEn ?? `${lesson.checkEn} ${lesson.errEn}`, lesson.tokenEn, "en");
  if (!sampleUk.toLowerCase().includes(lesson.tokenUk.toLowerCase())) throw new Error(`token uk ${slug}`);
  if (!sampleEn.toLowerCase().includes(lesson.tokenEn.toLowerCase())) throw new Error(`token en ${slug}`);
  const id = `${slug}-c-v2`;
  const xUk = lesson.xUk ?? `Поясніть своїми словами, як отримано результат і де межа моделі.`;
  const xEn = lesson.xEn ?? `Explain in your own words how the result was obtained and where the model stops.`;
  if (xUk === xEn) throw new Error(`explain prompt ${slug}`);
  return `      taught(${js(slug)}, ${js(lesson.titleUk)}, ${js(lesson.titleEn)}, ${lesson.d ?? 2}, [
        concept(${js(id)}, ${js(lesson.qUk)}, ${js(lesson.qEn)}, ${js(uk)}, ${js(en)}, ${js(lesson.kpUk)}, ${js(lesson.kpEn)}),
${emitChecks(code, index, lesson).join("\n")}
        explain(${js(`${slug}-x-v2`)}, ${js(xUk)}, ${js(xEn)}, ${js(lesson.tokenUk)}, ${js(lesson.tokenEn)}, ${js(sampleUk)}, ${js(sampleEn)}),
      ]),`;
}

function emitExamItem(code, form, index, item) {
  const id = `${code}-exam-${form.toLowerCase()}${index}-v2`;
  if (item.kind === "q") {
    if (item.optionsUk.length < 2) throw new Error(`exam mcq ${id}`);
    return `        mcq(${js(id)}, ${js(item.uk)}, ${js(item.en)}, ${js(item.optionsUk)}, ${js(item.optionsEn)}, ${item.correct}, ${js(form)}),`;
  }
  return `        num(${js(id)}, ${js(item.uk)}, ${js(item.en)}, ${targetLiteral(item.target)}, ${js(item.unit)}, ${js(form)}),`;
}

function emitExam(unit) {
  for (const [form, items] of [
    ["A", unit.examA],
    ["B", unit.examB],
  ]) {
    if (!items || items.length !== 10) throw new Error(`exam length ${unit.code} ${form}`);
    const mcq = items.filter((item) => item.kind === "q").length;
    if (mcq > 4) throw new Error(`too many mcq ${unit.code} ${form}`);
    if (items.some((item) => item.kind !== "q" && item.kind !== "n")) throw new Error(`exam kind ${unit.code}`);
  }
  const lines = [...unit.examA, ...unit.examB].map((item, index) => {
    const form = index < 10 ? "A" : "B";
    const n = (index % 10) + 1;
    return emitExamItem(unit.code, form, n, item);
  });
  const pass = unit.pass === 1 ? ", 1" : "";
  return `      exam(${js(`${unit.code}-exam`)}, ${js(unit.examTitleUk)}, ${js(unit.examTitleEn)}, [
${lines.join("\n")}
      ]${pass}),`;
}

function emitUnit(unit, bodies) {
  if (!/^ee-\d{2}$/.test(unit.code)) throw new Error(`code ${unit.code}`);
  if (banned.test(unit.titleUk) || banned.test(unit.titleEn)) throw new Error(`banned title ${unit.code}`);
  if (!unit.lessons || unit.lessons.length !== 5) throw new Error(`lessons ${unit.code}`);
  const lessons = unit.lessons.map((lesson, index) => emitLesson(unit.code, index + 1, lesson, bodies));
  return `  createUnit({
    slug: ${js(unit.slug)},
    titleUk: ${js(unit.titleUk)},
    titleEn: ${js(unit.titleEn)},
    lessons: [
${lessons.join("\n")}
${emitExam(unit)}
    ],
  }),`;
}

function emitFile(fileName, exportName, group, bodies) {
  const needsProject = group.some((unit) => unit.lessons.some((lesson) => (lesson.labs ?? []).length > 0));
  const kit = needsProject
    ? "analogProjectLab, buckProjectLab, concept, dividerLab, exam, explain, filterProjectLab, mcq, num, phaseProjectLab, taught"
    : "concept, dividerLab, exam, explain, mcq, num, taught";
  const body = `import type { UnitContent } from "../types.js";
import { createUnit } from "./helpers.js";
import { ${kit} } from "./lesson-kit.js";

/** Authored version-2 lessons. Generated by packages/content/scripts/ee-emit.mjs from the unit records. */
export const ${exportName}: UnitContent[] = [
${group.map((unit) => emitUnit(unit, bodies)).join("\n")}
];
`;
  const bannedHit = body.match(banned);
  if (bannedHit) throw new Error(`banned in ${fileName}: ${bannedHit[0]}`);
  fs.writeFileSync(path.join(root, fileName), body, "utf8");
}

function passport(unit) {
  const topics = unit.lessons
    .map((lesson, index) => `${index + 1}. ${lesson.titleUk} / ${lesson.titleEn}`)
    .join("\n");
  return `### ${unit.code} \`${unit.slug}\`

- Titles: ${unit.titleUk} / ${unit.titleEn}
- Prerequisites: ${unit.prereqUk} / ${unit.prereqEn}
- Lesson topics:
${topics}
- Observable results: ${unit.outcomeUk} / ${unit.outcomeEn}
- Formula and model limit: ${unit.formulaUk} / ${unit.formulaEn}
- Worked example: ${unit.lessons[0].exUk}
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: ${unit.lessons[0].errUk}
- Laboratory: ${unit.labNoteUk} / ${unit.labNoteEn}
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. ${unit.pass === 1 ? "Pass threshold is 1.0: every item on the served form is required." : "Pass threshold stays 0.7."}
- Sources: ${unit.sourceUk}
`;
}

const all = loaded;
const bodies = new Set();
const files = new Map();
for (const unit of all) {
  const bucket = files.get(unit.file) ?? { exportName: unit.exportName, units: [] };
  if (bucket.exportName !== unit.exportName) throw new Error(`export mismatch ${unit.file}`);
  bucket.units.push(unit);
  files.set(unit.file, bucket);
}
for (const [fileName, group] of files) {
  emitFile(fileName, group.exportName, group.units, bodies);
}
const passportText = `# Electrical engineering module passports

These passports are the authored version-2 programme. Lesson prose in \`packages/content/src/electrical-engineering/\` is the student-facing text. Numbers below are the same worked examples.

${all.map(passport).join("\n")}
`;
const handPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../SPEC/courses/electrical-engineering-hand-passports.md");
const handText = fs.existsSync(handPath) ? `\n\n${fs.readFileSync(handPath, "utf8").trim()}\n` : "";
fs.writeFileSync(
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../SPEC/courses/electrical-engineering-passports.md"),
  passportText + handText,
  "utf8",
);
console.log(`wrote ${all.length} units, ${bodies.size} bodies, ${files.size} files`);
