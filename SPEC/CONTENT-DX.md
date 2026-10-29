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
