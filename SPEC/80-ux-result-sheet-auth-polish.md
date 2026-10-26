# 80 — UX result sheet, auth deep links, quality polish

**Status:** Implemented (2026-08)  
**Builds on:** SPEC 79

## Deliverables

1. **Lesson result sheet** — after a correct answer, show correct + explanation for `LESSON_RESULT_SHEET_MS` (~1.1s) before next exercise; disable double-submit during sheet.
2. **Coach tip** — one-time localStorage tip (F focus / Esc exit).
3. **`safeNextPath`** — login/register `?next=` hardened; login default → `/learn`.
4. **`useRequireAuth` + `PageLoading`** — review / programming (and pattern for others); login preserves path.
5. **Programming hub** — skeleton, freemium label, primary “Continue path” CTA via `firstAvailableLessonHref`.
6. **Paywall regen** — `minutesUntilHeartRegen` approximate countdown.
7. **Review / Friends empty states**.
8. **Profile “Change role / path”** reopens onboarding wizard; API exclusive persona flags + `value: false` support.
9. **SoftFeedback** `aria-live=assertive`.

## Shared

`ux.ts` additions: `safeNextPath`, `LESSON_RESULT_SHEET_MS`, `exerciseExplanation`, `minutesUntilHeartRegen`, `firstAvailableLessonHref` (+ tests).

## API

`POST /auth/onboarding/complete` body: `{ key, value?: boolean }` — persona keys exclusive when enabling one.
