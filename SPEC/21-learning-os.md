# 21 — Learning OS (calendar, placement, export, comments, next steps)

## Activity calendar / My progress

- `GET /learning/calendar?days=84` — aggregates submitted lessons (`skill_attempts`) by UTC day (`timezone: "UTC"`)
- `GET /learning/progress?days=30&course=...` — overview (7/30/90d + course filter), daily activity & score trends, study heatmap, course progress, character progression, account-wide Monday–Sunday UTC weekly recap, personal bests, and weekly goal / automatic recommendation
- `GET /learning/history?days=all&course=...&limit=20&cursor=...` — newest-first cursor-paginated attempt history (max 50), reconstructing older outcomes from recorded score + current threshold (`unknown` when lesson metadata missing)
- `PUT /learning/goal` — `{ weeklyTarget: number | null }` (`1..1000` or `null` to restore automatic goal)
- Levels 0–4 for heatmap intensity
- UI: `/calendar` (My progress), linked from Dashboard, Learn, and Profile

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
