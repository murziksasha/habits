# 36 — Soft attempts, skip, tutor deep-link

## Soft attempt counter

Shared hook `useSoftAttempts` in `exercises.tsx`:

| Field | Behavior |
|-------|----------|
| `attempts` | Incremented on each failed soft-grade |
| `SOFT_MAX_ATTEMPTS` | **3** |
| Hint | Auto-open on first fail |
| Skip | Enabled when `attempts >= 3` |

Skip submits current answer (may be wrong) so the lesson advances; server grade still marks incorrect.

## UI (`DrillFooter`)

- Check button
- **Skip →** (after 3 fails)
- **Ask tutor** (code drills) → `/tutor?course=programming&q=…`

Attempt line: `Attempts: n/3 · After 3 wrong tries you can skip`

Applies to: MCQ (code_*), code_fill, code_order, code_project.

## Tutor deep-link

| Param | Meaning |
|-------|---------|
| `course` | Course slug (default programming) |
| `q` | Prefill message (exercise prompt + code + attempt snippet) |

Tutor page wraps `useSearchParams` in `Suspense`, prefills input (user sends manually).

`tutorHelpHref` asks for a short hint, not full solution.

## i18n

`lesson.attempts`, `skip`, `skipHint`, `askTutor`

## Related

- SPEC 35 soft grade + hints
- SPEC 20/28 tutor
