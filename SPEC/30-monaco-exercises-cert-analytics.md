# 30 — Monaco in lessons, programming certificate, class PG analytics

## Monaco in lesson exercises

- `CodeBlock` (read-only) and `CodeFillExercise` answer pane use `MonacoCodeEditor`
- Applies to `code_read` / `code_output` (snippet) and `code_fill` (editable blank)
- Package already introduced in SPEC 29 for playground

## Programming path certificate

- On lesson complete (passed): `maybeIssueCertificate` only when **100%** of course lessons are completed (exams included)
- Titles use course `titleUk` / `titleEn` → `Сертифікат: …` / `Certificate: …`
- When **all programming units** complete (`evaluateLearningMilestones`):
  - Milestone `prog_path_complete`
  - Certificate issued (if not yet) or **title upgraded** to  
    `Сертифікат: Programming Path` / `Certificate: Programming Path`
- One cert per user+course (`cert_user_course` unique index)
- UI download: PDF + PNG from `/certificates/[code]`

## Class analytics — playground & programming

### API `GET /analytics/class/:classId`

Per student:

| Field | Source |
|-------|--------|
| `playgroundSolved` | Distinct solved playground challenges |
| `playgroundXp` | Sum of XP from playground solves |
| `programmingLessons` | Completed lessons in `programming` course |

Summary:

| Field | Meaning |
|-------|---------|
| `playgroundAssignCount` | Class playground challenge assignments |
| `playgroundAvgSolved` | Mean of `playgroundSolved` across students |

### UI (`/schools/class/[classId]`)

- Extra summary cards: PG assigns, avg PG solved
- Leaderboard rows show 🖥️ solved (+XP) and 💻 code lessons count
- i18n: `analytics.pgAssigns`, `pgAvgSolved`, `pgSolved`, `progLessons`

## Related

- SPEC 23–29 programming / playground stack
- Certificates: `apps/api/src/routes/certificates.ts`
- Milestones: `apps/api/src/routes/learning.ts`
