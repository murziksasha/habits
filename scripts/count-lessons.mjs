#!/usr/bin/env node
/**
 * Count units/lessons/exams in the built @eduforge/content package.
 * Run after: pnpm --filter @eduforge/content build
 *
 *   node scripts/count-lessons.mjs
 */
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(path.join(root, "packages/content/dist/index.js"));
const content = await import(path.join(root, "packages/content/dist/index.js"));

const courses = Object.values(content).filter(
  (x) => x && typeof x === "object" && x.slug && Array.isArray(x.units),
);

let totU = 0,
  totL = 0,
  totE = 0;
const allSlugs = [];
const allIds = [];
console.log("slug\tunits\tlessons\tteach\texams");
for (const course of courses.sort((a, b) => a.slug.localeCompare(b.slug))) {
  const lessons = course.units.flatMap((u) => u.lessons);
  const exams = lessons.filter((l) => l.isExam);
  totU += course.units.length;
  totL += lessons.length;
  totE += exams.length;
  for (const l of lessons) {
    allSlugs.push(`${course.slug}/${l.slug}`);
    for (const e of l.exercises) allIds.push(`${course.slug}/${e.id}`);
  }
  console.log(
    `${course.slug}\t${course.units.length}\t${lessons.length}\t${lessons.length - exams.length}\t${exams.length}`,
  );
}
console.log(`TOTAL\t${totU}\t${totL}\t${totL - totE}\t${totE}`);
console.log(
  `unique lesson slugs: ${new Set(allSlugs).size}/${allSlugs.length}; unique exercise ids: ${new Set(allIds).size}/${allIds.length}`,
);
