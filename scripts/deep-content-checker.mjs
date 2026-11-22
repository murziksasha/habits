import { ALL_COURSE_CONTENTS } from "../packages/content/dist/index.js";
import { gradeExercise } from "../packages/shared/dist/index.js";

const issues = [];

function record(severity, course, unit, lesson, exId, issue, details) {
  issues.push({ severity, course, unit, lesson, exId, issue, details });
}

for (const course of ALL_COURSE_CONTENTS) {
  for (const unit of course.units) {
    for (const lesson of unit.lessons) {
      const loc = [course.slug, unit.slug, lesson.slug];

      // Check lesson structure
      if (lesson.exercises.length === 0) {
        record("error", ...loc, "", "Lesson has 0 exercises");
      }

      for (const ex of lesson.exercises) {
        const id = ex.id;

        // Common prompt check
        if ("promptUk" in ex && !ex.promptUk?.trim()) {
          record("error", ...loc, id, "Empty promptUk");
        }
        if ("promptEn" in ex && !ex.promptEn?.trim()) {
          record("error", ...loc, id, "Empty promptEn");
        }

        // Options checks
        if ("options" in ex && Array.isArray(ex.options)) {
          if (ex.options.length < 2) {
            record("error", ...loc, id, `Options length < 2 (${ex.options.length})`);
          }
          if (new Set(ex.options).size !== ex.options.length) {
            record("error", ...loc, id, "Duplicate options", ex.options);
          }
          if (typeof ex.correctIndex === "number") {
            if (ex.correctIndex < 0 || ex.correctIndex >= ex.options.length) {
              record("error", ...loc, id, `correctIndex out of bounds (${ex.correctIndex} >= ${ex.options.length})`);
            }
          }
          if (ex.optionsEn) {
            if (ex.optionsEn.length !== ex.options.length) {
              record("error", ...loc, id, `optionsEn length (${ex.optionsEn.length}) !== options (${ex.options.length})`);
            }
            if (new Set(ex.optionsEn).size !== ex.optionsEn.length) {
              record("warn", ...loc, id, "Duplicate optionsEn", ex.optionsEn);
            }
          } else {
            // Check if options are in Ukrainian and missing optionsEn
            if (ex.options.some((o) => /[А-Яа-яІіЇїЄєҐґ]/u.test(o))) {
              record("warn", ...loc, id, "Ukrainian options without optionsEn", ex.options);
            }
          }
        }

        // Code fill checks
        if (ex.type === "code_fill") {
          if (!ex.code.includes("___")) {
            record("error", ...loc, id, "code_fill code missing '___' placeholder", ex.code);
          }
          if (!Array.isArray(ex.accepted) || ex.accepted.length === 0) {
            record("error", ...loc, id, "code_fill missing accepted answers");
          } else {
            for (const ans of ex.accepted) {
              if (typeof ans !== "string" || !ans.trim()) {
                record("error", ...loc, id, "code_fill has empty accepted string");
              }
            }
          }
        }

        // Code order checks
        if (ex.type === "code_order") {
          if (!Array.isArray(ex.lines) || ex.lines.length < 2) {
            record("error", ...loc, id, "code_order lines < 2");
          }
          if (!Array.isArray(ex.correct) || ex.correct.length !== ex.lines.length) {
            record("error", ...loc, id, `code_order correct length mismatch (${ex.correct?.length} vs ${ex.lines.length})`);
          }
          if (ex.linesUk && ex.linesUk.length !== ex.lines.length) {
            record("error", ...loc, id, `code_order linesUk length mismatch (${ex.linesUk.length} vs ${ex.lines.length})`);
          }
        }

        // Match checks
        if (ex.type === "match") {
          if (!Array.isArray(ex.pairs) || ex.pairs.length < 2) {
            record("error", ...loc, id, "match pairs < 2");
          }
          if (ex.pairsEn) {
            if (ex.pairsEn.length !== ex.pairs.length) {
              record("error", ...loc, id, "match pairsEn length mismatch");
            }
          } else {
            const hasCyrillic = ex.pairs?.some((p) => /[А-Яа-яІіЇїЄєҐґ]/u.test(p.left) || /[А-Яа-яІіЇїЄєҐґ]/u.test(p.right));
            if (hasCyrillic && course.slug !== "english") {
              record("warn", ...loc, id, "match has Cyrillic without pairsEn");
            }
          }
        }

        // Explain checks
        if (ex.type === "explain") {
          if (!ex.sampleAnswerUk || !ex.sampleAnswerUk.trim()) {
            record("error", ...loc, id, "explain missing sampleAnswerUk");
          } else {
            const ukGrade = gradeExercise(ex, { text: ex.sampleAnswerUk });
            if (!ukGrade.correct) {
              record("error", ...loc, id, `sampleAnswerUk fails rubric (score: ${ukGrade.score})`, {
                sample: ex.sampleAnswerUk,
                feedback: ukGrade.feedback,
              });
            }
          }
          if (!ex.sampleAnswerEn || !ex.sampleAnswerEn.trim()) {
            record("error", ...loc, id, "explain missing sampleAnswerEn");
          } else {
            const enGrade = gradeExercise(ex, { text: ex.sampleAnswerEn });
            if (!enGrade.correct) {
              record("error", ...loc, id, `sampleAnswerEn fails rubric (score: ${enGrade.score})`, {
                sample: ex.sampleAnswerEn,
                feedback: enGrade.feedback,
              });
            }
          }
        }

        // Comprehension checks
        if (ex.type === "comprehension") {
          if (ex.passage && /[А-Яа-яІіЇїЄєҐґ]/u.test(ex.passage) && !ex.passageEn) {
            record("warn", ...loc, id, "comprehension passage in Cyrillic without passageEn");
          }
          if (Array.isArray(ex.questions)) {
            for (let qi = 0; qi < ex.questions.length; qi++) {
              const q = ex.questions[qi];
              if (/[А-Яа-яІіЇїЄєҐґ]/u.test(q.q) && !q.qEn) {
                record("warn", ...loc, id, `comprehension question[${qi}] without qEn`);
              }
              if (q.options?.some((o) => /[А-Яа-яІіЇїЄєҐґ]/u.test(o)) && !q.optionsEn) {
                record("warn", ...loc, id, `comprehension question[${qi}] options without optionsEn`);
              }
            }
          }
        }

        // Chess lesson checks
        if (ex.type === "chess_lesson") {
          if (ex.notesUk && /[А-Яа-яІіЇїЄєҐґ]/u.test(ex.notesUk) && !ex.notesEn) {
            record("warn", ...loc, id, "chess_lesson notesUk without notesEn");
          }
          if (ex.quiz) {
            if (ex.quiz.options && ex.quiz.options.some((o) => /[А-Яа-яІіЇїЄєҐґ]/u.test(o)) && !ex.quiz.optionsEn) {
              record("warn", ...loc, id, "chess_lesson quiz options without optionsEn");
            }
          }
        }
      }
    }
  }
}

console.log(`Audited all courses. Total findings: ${issues.length}`);
const errors = issues.filter((i) => i.severity === "error");
const warns = issues.filter((i) => i.severity === "warn");
console.log(`Errors: ${errors.length}, Warnings: ${warns.length}`);

const errorTypes = {};
for (const e of errors) {
  errorTypes[e.issue] = (errorTypes[e.issue] || 0) + 1;
}
console.log("\nError types:", JSON.stringify(errorTypes, null, 2));

const warnTypes = {};
for (const w of warns) {
  warnTypes[w.issue] = (warnTypes[w.issue] || 0) + 1;
}
console.log("\nWarning types:", JSON.stringify(warnTypes, null, 2));

import { writeFileSync } from "node:fs";
writeFileSync("scripts/detailed-audit.json", JSON.stringify(issues, null, 2));
console.log("Written to scripts/detailed-audit.json");
