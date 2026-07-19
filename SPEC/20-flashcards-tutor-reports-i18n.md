# 20 — Flashcards/SRS, AI Tutor, Weekly Reports, Dual-language Content

## Flashcards / SRS

- Tables: `flashcard_decks`, `flashcards`, `flashcard_states`, `flashcard_reviews`
- Algorithm: SM-2 inspired (`applySrsRating` in `@eduforge/shared`)
  - ratings: 1 again, 2 hard, 3 good, 4 easy
- Seed decks from `@eduforge/content` `FLASHCARD_DECKS` (english, chess, logic)
- API:
  - `GET /flashcards/decks`
  - `GET /flashcards/decks/:id`
  - `GET /flashcards/due?deckId=&limit=`
  - `POST /flashcards/review` `{ cardId, rating }` → XP +1/+2 on good/easy
  - `GET /flashcards/stats`
  - `POST /flashcards/cards` (owner/admin)
- UI: `/flashcards`, `/flashcards/[deckId]`

## AI tutor (SpaceXAI / xAI)

- Server-only: `XAI_API_KEY`, optional `XAI_MODEL` (default `grok-4.5`)
- Endpoint: `https://api.x.ai/v1/chat/completions`
- Table: `tutor_messages`
- API: `GET /tutor/status`, `GET|DELETE /tutor/history`, `POST /tutor/chat`
- Rate limit: 20 req/min per user
- Fallback: rule-based local tutor when key missing or API fails
- UI: `/tutor`

## Weekly email report

- User prefs: `weekly_email_enabled`, `preferred_locale`, `last_weekly_email_at`
- Stats (last 7 days): lessons completed, lesson XP, flashcard reviews, focus minutes, streak
- API:
  - `GET /reports/weekly`
  - `PATCH /reports/prefs`
  - `POST /reports/weekly/send-me`
  - `POST /reports/weekly/send-all` (admin, skips if emailed &lt;6d ago)
- Without SMTP: logs to console (`[email:dev]`)
- UI: `/reports`

## Dual-language content (UK + EN)

- Schema: `title_en` / `description_en` on courses, units, lessons
- Content package: required `titleEn`/`descriptionEn` on courses; optional on units/lessons/exercises (`promptEn`)
- Helpers: `pickLocale`, `exercisePrompt` in shared
- UI: courses list/hub + exercise prompts follow active locale (UK/EN toggle)
- Seed updates EN columns from content

## Migration

`0010_srs_tutor_i18n`

## Env

```
XAI_API_KEY=
XAI_MODEL=grok-4.5
SMTP_HOST=
SMTP_FROM=
```
