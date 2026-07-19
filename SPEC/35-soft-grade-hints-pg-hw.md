# 35 — Soft grade + hints + playground homework

## Soft client grading

Before advancing the lesson, code drills validate locally:

| Type | Rule |
|------|------|
| `mcq` / `code_read` / `code_output` (options) | `selected === correctIndex` |
| `code_fill` | `accepted` normalize (trim, collapse space) |
| `code_order` | exact line order |
| `code_project` | all `checks[].contains` in files |

On fail:

- Show **wrong / try again**
- Auto-open **Hint** if available
- For projects: list missing substrings (up to 4)
- **Do not** call `onAnswer` (lesson does not advance)

Helpers: `apps/web/src/lib/client-grade.ts`

Server `gradeExercise` remains source of truth on lesson submit.

## Hints UI

`useExerciseHint` in `exercises.tsx`:

- Button 💡 Show/Hide
- Fields: `hintUk` / `hintEn` → `explanationUk` / `explanationEn`
- Used on MCQ, code_fill, code_project, code_order

Mini-project lessons include starter hints (html/css/js cards).

## Playground on homework page

`/homework` loads `GET /playground/class-mine` and lists class PG challenges:

- Title, class, XP
- Link: `/playground?challenge=<id>` (deep-load starter)
- Solved items marked ✓

Playground hydrates `?challenge=` once (like `?share=`).

## Related

- SPEC 16 homework
- SPEC 27 class PG assigns
- SPEC 33–34 code projects
