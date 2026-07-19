# 39 — Parent weekly digest

## Product

Parents linked to a student can view a **7-day digest** and email it to themselves:

| Metric | Source |
|--------|--------|
| Lessons completed | `activity_events` kind `lesson_completed` |
| XP | `skill_attempts.xp_gained` sum |
| Streak | character current streak |
| Programming lessons | `user_lesson_progress` programming + `completed_at` in window |
| Playground solves | `learning_milestones` `pg_ch_*` unlocked in window |
| Homework done | `assignment_submissions` completed in window |

## API

| Method | Path | Auth |
|--------|------|------|
| GET | `/parents/children/:studentId/digest` | parent of child |
| POST | `/parents/children/:studentId/digest/send` | parent; emails parent |
| POST | `/parents/digest/run` | CRON_SECRET / admin — batch all links (SPEC 40) |

Send uses `parentChildDigestEmail` + `sendMail` (SMTP or dev log).  
Activity: `parent_digest_sent`.

## Email

`apps/api/src/email.ts` → `parentChildDigestEmail`  
UK/EN: child name, level, lessons, XP, streak, programming, playground, homework.

## UI

`/parents/child/[studentId]`:

- Cards for 7d metrics
- **Email digest** button → preview text in UI when mail is logged

## Related

- SPEC 17 parents
- SPEC 20 weekly learner report
- SPEC 31 parent coding progress
