# 48 — Mini board (API-driven) + Minis certificate

## Hub board

`/programming` loads `GET /learning/programming/minis`:

- Progress bar `completed/total`
- Grid of 10 minis with stack icons
- Missing seed slots shown dashed
- Link to `/certificates` when `allDone`

## Certificate

`maybeIssueMinisCertificate(userId, courseId)`:

| State | Action |
|-------|--------|
| No cert | Issue `Сертифікат: Programming Minis` |
| Generic programming cert | Upgrade title to Minis |
| Already Path or Minis | No-op |

Triggered from `evaluateLearningMilestones` when all `PROGRAMMING_MINI_LESSON_SLUGS` completed.

Note: one cert per user+course; Path title is higher tier and is not overwritten by Minis.

## Related

- SPEC 46–47 minis achievements / recommendations
- SPEC 30 path certificate
