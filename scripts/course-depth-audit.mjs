import { ALL_COURSE_CONTENTS } from "../packages/content/dist/index.js";

const ARTIFACT_TYPES = new Set([
  "chess_puzzle", "typing", "comprehension", "code_project", "code_judge",
  "composite_artifact", "dataset_query", "incident_step", "numeric", "circuit_lab",
]);
const PASSIVE_TYPES = new Set(["concept", "rsvp", "video"]);

function countAssessments(lesson) {
  return lesson.exercises.filter((exercise) => !PASSIVE_TYPES.has(exercise.type)).length;
}

function auditCourse(course) {
  const lessons = course.units.flatMap((unit) => unit.lessons);
  const teaching = lessons.filter((lesson) => !lesson.isExam);
  const exams = lessons.filter((lesson) => lesson.isExam);
  return {
    course: course.slug,
    units: course.units.length,
    lessons: lessons.length,
    exams: exams.length,
    shortLessons: teaching.filter((lesson) => countAssessments(lesson) < 3).length,
    noConcept: teaching.filter((lesson) => !lesson.exercises.some((exercise) => exercise.type === "concept")).length,
    shortExams: exams.filter((lesson) => countAssessments(lesson) < 4).length,
    unitsWithoutArtifact: course.units.filter((unit) =>
      !unit.lessons.some((lesson) => !lesson.isExam && lesson.exercises.some((exercise) => ARTIFACT_TYPES.has(exercise.type))),
    ).length,
  };
}

const rows = ALL_COURSE_CONTENTS.map(auditCourse);
if (process.argv.includes("--lessons")) {
  const lessons = ALL_COURSE_CONTENTS.flatMap((course) => course.units.flatMap((unit) => unit.lessons.map((lesson) => ({
    course: course.slug,
    unit: unit.slug,
    lesson: lesson.slug,
    exam: Boolean(lesson.isExam),
    assessments: countAssessments(lesson),
    hasConcept: lesson.exercises.some((exercise) => exercise.type === "concept"),
    review: lesson.exercises.flatMap((exercise) => {
      const flags = [];
      if (exercise.promptEn && exercise.promptEn === exercise.promptUk && /[А-Яа-яІіЇїЄєҐґ]/u.test(exercise.promptUk)) flags.push("same_cyrillic_prompt");
      if (Array.isArray(exercise.options) && exercise.options.some((option) => /[А-Яа-яІіЇїЄєҐґ]/u.test(option)) && !exercise.optionsEn) flags.push("review_options_locale");
      if (["mcq", "code_read", "code_output", "code_fill"].includes(exercise.type) && !exercise.explanationEn) flags.push("missing_english_explanation");
      return flags.length ? [{ id: exercise.id, type: exercise.type, flags }] : [];
    }),
  }))));
  console.log(JSON.stringify(lessons, null, 2));
} else if (process.argv.includes("--json")) {
  console.log(JSON.stringify(rows, null, 2));
} else {
  console.log("course | units | lessons | exams | short lessons | no concept | short exams | units without artifact");
  for (const row of rows) console.log(Object.values(row).join(" | "));
}
