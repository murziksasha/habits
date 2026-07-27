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
- [ ] `isFree: true` on first N lessons for freemium
- [ ] Unit exams (`isExam`) if track has control tests
- [ ] Rebuild: `pnpm --filter @eduforge/content build && pnpm db:seed`
- [ ] Optional: hub page reusing `DeepCourseHub` (not primary nav)

### What you do **not** need

- New `ALTER TYPE course_slug` SQL (slugs are **varchar** since migration `0023`)
- Primary nav entry (use `/learn`, `/courses`, `/programming`)

## Exercise types

Canonical list: `@eduforge/shared` `EXERCISE_TYPES` / `packages/content` integrity tests.

Grading: `@eduforge/shared` `gradeExercise` (API + client soft-grade).

## EN gate

- All courses: exercise with `promptUk` must have `promptEn` after normalize
- Skill map regen: `node scripts/gen-skill-prompt-en.mjs` (after dumping missing prompts)

## Freemium

Limits live in `packages/shared` `freemiumMatrix()` — keep content free lesson counts aligned with `FREE_LESSONS_PER_COURSE` (5).
