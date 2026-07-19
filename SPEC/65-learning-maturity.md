# 65 — Learning maturity (discoverability + quality)

## Goals

Make SPECs 01–64 *usable*: clear learning map, exam board, smarter next, better code checks, tutor context, teacher exam assign, metrics.

## Features

### Learn map

- Route `/learn` — recommended CTA, exams summary, courses by group, study toolkit
- Shared `COURSE_GROUP` / `COURSE_GROUP_META` / `COURSE_HUB_HREF`
- Catalog `/courses` grouped: code · deep · skill · chess

### Exams board

- `GET /learning/exams/me?course=`
- Dashboard card: passed / ready / locked
- `/learning/next` prioritizes `exam_ready` (~19)

### Soft project checks

- `code_project.checks` supports `kind: "dom"`, `selector`, `containsHtml`
- Server + client soft-grade aligned

### Tutor

- Per-course system prompts: programming, typescript, html_semantics, css_layout, qa_theory, english, chess

### Homework / parents / admin

- Homework catalog includes `isExam` + `exams[]`
- Parent digest: `examsPassedWeek`
- Admin metrics: `exams.*`, `deepTrackLearners` (+ CSV)

### Freemium clarity

- Course detail `freemium.freeLeft` banner for free plan

## OpenAPI

1.8.0

## Related

- SPEC 57 nav, 60 exams, 62–64 deep tracks
