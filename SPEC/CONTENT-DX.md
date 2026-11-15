# Content authoring DX

How to add courses and lessons without fighting the monorepo.

## Registry (source of truth for slugs)

1. **App registry** — `packages/shared/src/courses.ts`
   - `COURSE_SLUGS`
   - `COURSE_META` (titles, group, color, icon)
   - `COURSE_GROUP` / `COURSE_HUB_HREF` if deep track hub
   - `isCourseSlug()` / `listCourseRegistry()`

2. **Seed content** — `packages/content/src/<slug>.ts`
   - Export `CourseContent` with units/lessons/exercises
   - Wire export in `packages/content/src/index.ts`
   - Skill tracks: missing `promptEn` filled via `skill-prompt-en.ts` + `normalizeCourseLocales`

3. **DB seed** — `packages/db/src/seed.ts` picks up content package (no pg enum migration)

4. **i18n** — `packages/shared/src/i18n.ts` `courses.*` + `nav.*` if UI labels needed

### New course checklist

- [ ] Add slug to `COURSE_SLUGS` + `COURSE_META` (+ group/hub)
- [ ] Author content file + export from content `index`
- [ ] Dual locale: `titleUk`/`titleEn` on course/units/lessons
- [ ] Exercises: `id`, known `type`, `promptUk` + `promptEn` (EN gate in content tests)
- [ ] `isFree` on early lessons is content metadata only; it does not lock the lesson
- [ ] Unit exams (`isExam`) if track has control tests
- [ ] Rebuild: `pnpm --filter @eduforge/content build && pnpm db:seed`
- [ ] Optional: hub page reusing `DeepCourseHub` (not primary nav)
- [ ] Update `SPEC/courses/<slug>.md` and the index row in `SPEC/courses/README.md` so the program matches the seed

### What you do **not** need

- New `ALTER TYPE course_slug` SQL (slugs are **varchar** since migration `0023`)
- Primary nav entry (use `/learn`, `/courses`, `/programming`)

## Exercise types

Canonical list: `@eduforge/shared` `EXERCISE_TYPES` / `packages/content` integrity tests.

### Concept cards (deep lessons)

Start every new deep lesson with a `concept(...)` card from `builders.ts` (theory paragraphs, key points, optional code, optional self-check), then 3+ retrieval exercises. Keep concept cards out of exams. Example and fields: [SPEC/91](./91-deep-learning-features.md). New deep units live in `packages/content/src/deep-units.ts`.

### Explain steps

Add an `explain(id, promptUk, promptEn, keyIdeas, { minWords, sampleAnswerUk, sampleAnswerEn })` after the retrieval exercises: each key idea has `labelUk`, `labelEn`, `anyOf` stems (lowercase word starts, UK + EN). Always provide sample answers — the content test checks that they pass their own rubric. Details: [SPEC/92](./92-deep-learning-2.md).

Grading: `@eduforge/shared` `gradeExercise` (API + client soft-grade).

## EN gate

- All courses: exercise with `promptUk` must have `promptEn` after normalize
- Skill map regen: `node scripts/gen-skill-prompt-en.mjs` (after dumping missing prompts)

## Access

The product is free. Shared rules live in `packages/shared` `accessMatrix()` (all lessons, shared heart cap, unlimited rated chess).

`normalizeCourseLocales()` also runs **`ensureFreemiumFreeLessons`**: first 5 non-exam lessons in path order get `isFree: true` (idempotent metadata). That flag does not hide lessons.

### MDX authoring (preferred for new lessons)

```ts
import { parseMdxLesson, mdxToLesson } from "@eduforge/content";

const parsed = parseMdxLesson(source);
const lesson = mdxToLesson(parsed); // slug, titles, exercises, body
```

Supported markers: YAML frontmatter, `<!-- mcq ... -->`, `<!-- fill ... -->`, `<!-- translate ... -->`, `<!-- concept ... --> … <!-- /concept -->`, `<!-- explain ... -->`, fenced code → `code_fill`, `videoUrl` → video exercise. Syntax for concept/explain: [SPEC/92 §5](./92-deep-learning-2.md); example `src/mdx/concept-lesson.mdx`.

## Adaptive next weights

`ADAPTIVE_WEIGHTS_JSON` overrides `DEFAULT_ADAPTIVE_WEIGHTS` in `@eduforge/shared` (`adaptive-next.ts`). Prefer weak lessons. Defaults are unit-tested; A/B via feature flags + env per environment.

## Course expansion pipeline

Bulk bilingual lesson add-ons live under `scripts/gen-expansion/` and
`packages/content/src/expansion/`. Existing course source files stay
unchanged; an `expandX(raw)` wrapper in `packages/content/src/index.ts`
appends new units (and optional in-unit insertions) before
`normalizeCourseLocales`.

### Layout

| Path | Role |
|------|------|
| `scripts/gen-expansion/lib.py` | Lesson constructors (`L`, `MCQ`, `FILL`, `READ`, `EQ`, `U`) and TypeScript emitters |
| `scripts/gen-expansion/store.py` | JSON store of generated units / insertions |
| `scripts/gen-expansion/store.json` | Generated payload (do not hand-edit) |
| `scripts/gen-expansion/courses/<name>.py` | Per-course unit modules (`UNITS`, optional `INSERTIONS`) |
| `scripts/gen-expansion/courses/load.py` | Loads modules into the store |
| `scripts/gen-expansion/assemble.py` | Writes `*-exp.ts` add-ons and full files for new courses |
| `packages/content/src/expansion/factory.ts` | `teachLesson`, `sectionUnit`, `expandCourse` |
| `packages/content/src/expansion/<slug>-exp.ts` | Assembled TypeScript, wired in `index.ts` |

New full courses (Go, accessibility, REST API design) are written as
`packages/content/src/<slug>.ts` and registered in
`packages/shared/src/courses.ts` (`COURSE_SLUGS`, `COURSE_META`,
`COURSE_GROUP`, hub, prerequisites). See [COURSE-REGISTRY](./COURSE-REGISTRY.md)
and [CONTENT-EXPANSION](./CONTENT-EXPANSION.md) for counts and the
before/after table.

### Adding lessons to an existing course

1. Add a Python module under `scripts/gen-expansion/courses/` that exports
   `UNITS` (and/or `INSERTIONS` keyed by existing unit slug). Each teach
   lesson uses `L(...)` with bilingual concept, retrieval (MCQ/FILL/READ),
   explain ideas, and sample answers that pass the rubric. Each unit ends
   with an exam of at least 4 questions (`EQ`); sysadmin and DevOps exams
   need 6. DevOps non-exam lessons must keep exactly 4 exercises
   (concept + 2 retrievals + explain).
2. Register the module in `courses/load.py` `MODULES` and, for a new
   expansion file, in `assemble.py` `EXPAND`.
3. Run `python3 scripts/gen-expansion/courses/load.py` then
   `python3 scripts/gen-expansion/assemble.py`.
4. If this is the first add-on for the course, wire
   `expandX` in `packages/content/src/index.ts`.
5. Update exact unit/lesson assertions in
   `packages/content/src/content.test.ts` (and DevOps `COURSE_PARTS` if
   needed). Capstones should stay last — `expandCourse` accepts an
   optional `insertBeforeSlug`.
6. Update `SPEC/courses/<slug>.md` and the count row in
   `SPEC/courses/README.md`.
7. `pnpm --filter @eduforge/content test` and `pnpm typecheck`.

### Adding a brand-new course

Follow the checklist above **and** the registry checklist at the top of
this file: slug + meta + group + hub page (`RoadmapCourseHub`), seed
import, i18n `courses.*`, `COURSE_SUBJECT`, content export, SPEC file.
List the course in `assemble.py` `NEW_META` so `assemble.py` emits the
full content file.

Lesson and exercise IDs must be unique. Every exercise with `promptUk`
needs `promptEn`. Explain samples are checked by `content.test.ts`
against their own rubric.

## Quality gate

`packages/content/src/quality-gate.test.ts` fails CI on missing uk/en titles or prompts, unpaired empty explanations, duplicate slugs or exercise ids, and malformed exercises. Run it with `pnpm --filter @eduforge/content test`. It is part of `pnpm test:unit` and the `content-gate` GitHub Actions job.
