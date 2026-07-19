# 60 — Unit control tests (exams)

## Product

Additive **control tests** after unit lessons. Existing lessons and freemium locks unchanged.

## Schema

| Column | Type | Meaning |
|--------|------|---------|
| `lessons.is_exam` | boolean default false | Exam lesson |
| `lessons.pass_threshold` | real nullable | Pass bar 0..1 (app default **0.7**) |

## Rules

| Rule | Behavior |
|------|----------|
| Unlock | All **non-exam** lessons of the unit completed |
| Pass | `accuracy >= passThreshold` |
| Fail | Not completed; **no XP** on exam fail; hearts as freemium |
| Normal lessons | Still complete at **≥50%**; partial XP rules unchanged |
| Skip / solution | **Disabled** in UI when `isExam` |

## API

- `GET /courses/:slug` — lessons include `isExam`, `passThreshold`, `examLocked`
- `GET /courses/:slug/lessons/:id` — 403 `exam_locked` if unit incomplete
- `POST .../submit` — returns `isExam`, `passed`, `examFailed`, `passThreshold`

## Content

- Programming: one exam per unit (`html-exam` … `qa-exam`)
- TypeScript course: exam per unit (`tsc-*-exam`)

## Achievements

- `exam_first`, `exam_three`

## Shared

`packages/shared/src/exam.ts` — `examPassed`, `lessonCompleteThreshold`.

## Related

- SPEC 59 TypeScript course
