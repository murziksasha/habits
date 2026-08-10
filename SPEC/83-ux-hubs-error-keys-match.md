# 83 — Deep hubs PageLoading, error toast, lesson keys, play sticky hide

**Status:** Implemented (2026-08)  
**Builds on:** SPEC 79–82

## Deliverables

1. **Deep hubs PageLoading** via shared `DeepCourseHub` (typescript, js, react, html, css, qa, sql, node, express, embedded-cpp) + `/programming/[stack]` + skill tree.
2. **Unified error boundary** — `error.tsx` bilingual + `useToast` error toast; `global-error.tsx` root fallback.
3. **Lesson keyboard help** — `?` / button opens `LessonShortcutsHelp` modal (1–9, arrows, Enter, F, Esc).
4. **Sticky Continue skip on live match** — `setPlayMatchActive` from `/play`; `shouldHideStickyContinue(path, { playMatchActive })`.

## Files

| Piece | Path |
|-------|------|
| Deep hub loading | `components/deep-course-hub.tsx` |
| TypeScript hub | `app/typescript/page.tsx` → DeepCourseHub |
| Error UI | `app/error.tsx`, `app/global-error.tsx` |
| Keys modal | `components/lesson-shortcuts-help.tsx` |
| Play flag | `lib/play-match.ts` |
