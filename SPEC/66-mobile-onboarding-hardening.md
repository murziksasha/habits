# 66 — Mobile nav, onboarding, submit hardening

## Mobile bottom bar

Primary 5 (md:hidden):

| Slot | Route |
|------|--------|
| Home | `/dashboard` |
| Learn | `/learn` |
| Code | `/programming` |
| Play | `/play` |
| Profile | `/profile` |

Main content uses `pb-24` for safe overlap.

## Skip link

Root layout: `Skip to content` → `#main-content` (focus-visible).

## Onboarding

New checklist items:

- `viewedLearnMap` → auto on `/learn`
- `triedProgramming` → auto on `/programming`
- First lesson CTA → `/learn` (not only english)

## Submit hardening

- Rate limit `POST .../submit` 60/min per user
- Failed exams log activity `exam_failed`
- Exam fail UI: retry + Review + Tutor deep-link `?course=`

## Related

- SPEC 65 learning maturity
- SPEC 60 unit exams
