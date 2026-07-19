# 23 — Programming track (Mimo-style)

## Model

- **One course** slug: `programming` (Postgres enum value)
- **Units** (ordered path): `html` → `css` → `js` → `typescript` → `react` → `git` → `node` → `express` → `sql` → `qa`
- Capstones: `react-capstone`, `express-capstone`
- Placement: `GET/POST /learning/placement/programming` → recommended unit
- Unit milestones: `prog_unit_<slug>`, `prog_units_3`, `prog_path_complete`
- Per-course XP / hearts / freemium like other courses
- Hub UI: `/programming` (path cards); lessons via `/courses/programming/lessons/:id`

## Content package

`packages/content/src/programming.ts` — ~35 lessons, dual-language titles/prompts.

Seed: included in `packages/db/src/seed.ts`. Flashcard deck: `programming-basics`.

## Placement (programming)

- Bank: `PROGRAMMING_PLACEMENT` (10 Q) + `PROGRAMMING_PLACEMENT_LEVELS`
- UI: `/placement/programming` (linked from English placement + hub)
- Levels map to unit slugs: html / js / react / node / sql

## Exercise types (code)

| Type | Purpose | Grading |
|------|---------|---------|
| `code_read` | Snippet + MCQ | `correctIndex` |
| `code_output` | Predict output | MCQ or `accepted` text |
| `code_fill` | Fill `___` in snippet | `accepted` (+ optional case-insensitive) |
| `code_order` | Reorder lines | ordered string array |

UI: monospace `CodeBlock` in `exercises.tsx`.

## Migration

`0013_programming_course` — `ALTER TYPE course_slug ADD VALUE 'programming'`

## Shared

- `COURSE_META.programming`, `PROGRAMMING_UNIT_ORDER`
- i18n: `courses.programming`, `nav.programming`, `programming.*`

## Tests

- `content.test.ts` — unit order, volume, code exercise shapes
- `grade.test.ts` — code_fill / code_output / code_order / code_read
- E2E: `/programming` + free lesson link

## Non-goals

- Live code sandbox / judge
- Separate course slugs per stack (future split optional)
