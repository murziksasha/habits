# 19 — XP Shop, Review Queue, Daily Quests, Notes, Focus, Public Profiles

## XP Shop

- Catalog in `@eduforge/shared` (`SHOP_CATALOG`)
- Currency: **global XP**
- Items: `heart_one`, `hearts_full`, `streak_freeze`, shop avatars (`dragon`, `ninja`, `owl`, `panda`)
- Tables: `shop_purchases`; character fields `streak_freezes`, `unlocked_avatars`
- API: `GET /shop`, `POST /shop/buy`
- UI: `/shop`
- Streak freeze: on lesson complete, if last active was not yesterday and freezes &gt; 0, consume one freeze instead of resetting streak

## Review queue

- Derived from `user_lesson_progress` where `bestScore &lt; 0.85` (completed or ≥2 attempts)
- API: `GET /review`, `GET /review/stats`
- UI: `/review`

## Daily quests

- Definitions: `DAILY_QUEST_DEFS` — lessons, XP, focus minutes
- Table: `user_daily_quests` (per user + UTC date + key)
- Progress hooks: lesson submit → lessons + xp; focus log → focus_min
- API: `GET /quests/daily`, `POST /quests/daily/:questKey/claim`
- UI: `/quests`

## Study notes

- Table: `study_notes` (unique user+lesson)
- API: `GET /notes`, `GET /notes/lesson/:id`, `POST /notes`, `DELETE /notes/:lessonId`
- UI: `/notes` + textarea on lesson page

## Focus timer

- Table: `study_sessions`
- API: `POST /focus/log` (min 30s), `GET /focus/history`
- UI: `/focus` (client timer + save)

## Public profiles

- API: `GET /profiles/:userId` (auth required) — progress, achievements, certificates, friendship
- UI: `/u/[userId]`; search results link here

## Migration

`0009_learning_tools`
