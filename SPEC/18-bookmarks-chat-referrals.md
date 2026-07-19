# 18 — Bookmarks, Class Chat, Search, Referrals, Dark Mode

## Lesson bookmarks

- Table: `lesson_bookmarks` (`userId`, `lessonId`, `note`)
- API: `GET /bookmarks`, `POST /bookmarks`, `DELETE /bookmarks/:lessonId`, `GET /bookmarks/check/:lessonId`
- UI: star on lesson page, list at `/bookmarks`

## Global search

- `GET /search?q=` — courses by title/description, users by name/email (email masked)
- UI: `/search` with debounce + add friend

## Class chat

- Table: `class_messages`
- `GET/POST /chat/class/:classId`
- Rate limit: 30 msg/min per user
- Access: class members, teachers, org owners
- UI: class page bottom chat panel

## Referrals

- Tables: `referral_codes`, `referral_redemptions`
- Auto-create code on register
- `POST /auth/register` accepts optional `referralCode`
- Bonus: **+50 XP** referrer, **+25 XP** new user
- `GET /referrals/mine` → code, uses, share URL
- UI: `/referrals`, register `?ref=CODE`

## Dark mode

- `ThemeProvider` + `html.dark` class
- Toggle 🌙/☀️ in header
- Persisted in `localStorage`

## Migration

`0008_extra_features`
