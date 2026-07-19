# 21 — Learning OS (calendar, placement, export, comments, next steps)

## Activity calendar / heatmap

- `GET /learning/calendar?days=84`
- Aggregates `activity_events` by UTC day
- Levels 0–4 for intensity
- UI: `/calendar`

## Smart next steps

- `GET /learning/next`
- Priority mix: placement (if missing), weak lessons, continue course, flashcards, quests, tutor, explore
- Shown on dashboard

## English placement test

- Questions: `ENGLISH_PLACEMENT` in `@eduforge/shared`
- Scoring → CEFR-ish A1–C1 + recommended unit slug
- Tables: `placement_results`
- API: `GET/POST /learning/placement/english`
- UI: `/placement` → start recommended lesson

## Progress export

- `GET /learning/export` — JSON (character, courses, lessons, SRS reviews, focus, milestones, placements)
- UI: `/export` download + preview

## Path milestones

- Table: `learning_milestones`
- Codes: first_lesson, lessons_10/50, streak_7, level_5, placement_english
- Evaluated after lesson complete + placement

## Lesson discussion

- Table: `lesson_comments` (optional `parentId` for replies)
- API: `GET/POST /comments/lesson/:lessonId`, `DELETE /comments/:id`
- Rate limit 20/min
- UI: bottom of lesson page

## Migration

`0011_learning_os`
