# Grill: Clear Tasks and Robust Grading (Понятні завдання та надійна перевірка)

Date: 2026-11-14

## Intent

Refine conditions, starters, and evaluation criteria for all exercise types across all built-in courses in Ukrainian and English: clearly state input data, expected outcome, mandatory elements, and validation constraints without giving away the full solution. Support verified equivalent answers (formatting, quotes, whitespace, punctuation, semantic equivalents). Add server-side isolated sandbox behavior verification for eligible code tasks without trusting browser-reported results or falling back to host execution. Provide a persistent device switch between behavior and text verification with clear disclaimers, retry options, and no heart/XP penalties when the sandbox judge is unavailable. Fix global keyboard handlers so Monaco editor, inputs, and textareas are never intercepted when typing words like `font-size` or shortcuts like `?` and `Escape`. Support new grading features in the CMS for newly authored exercises without altering existing CMS data.

## Constraints

- Copy in Ukrainian and English through `@eduforge/shared` (`getUI(locale)` / `UI`). No hardcoded new user-facing strings in components.
- Domain grading math remains in `@eduforge/shared` and server services; client evaluations are never trusted for grading or awarding XP.
- Security fail-closed: judge runs in isolated Docker containers (`JUDGE_MODE=docker`); host fallback is strictly prohibited in production.
- Existing exercise IDs, lesson IDs, course slugs, and learner progress must be preserved without data loss.
- Hotkeys: Monaco editor, text inputs, textareas, selects, and contenteditable elements must never lose keys (`f`, `F`, `?`, `Escape`, `Enter`, arrows, digits) to global shortcuts.
- CMS: existing CMS courses and lessons must not be automatically modified; authoring UI and schemas must support new verification modes.
- Production safety: no dropping database or wiping data; separate confirmation required before altering production Docker containers or running database seeds.

## Key decisions

- Decision: Server-side isolated behavior evaluation for code submissions.
  Reason: Previously, `code_judge` allowed client-supplied `{ ok: true }` in lesson submissions, which could be spoofed. Now the server executes tests in the isolated Docker runner when submitting, or performs static analysis in text mode. Browser test results are only used for immediate local feedback.
  Alternative considered: Client-signed evaluation tokens. Rejected as unnecessary overhead compared to direct server-side execution.
- Decision: Dual verification modes ("behavior" / "text") with localStorage persistence.
  Reason: Gives learners and environments without running Docker containers the ability to verify code via static criteria while still earning XP and completing lessons. Behavior mode is default; choice persists per device in `localStorage`. Text mode explicitly displays that runtime behavior is not tested.
  Alternative considered: Only behavior check with hard failure if Docker is unavailable. Rejected because it blocks learners on environments without Docker.
- Decision: Graceful handling of judge unavailability without penalties.
  Reason: If Docker is unavailable or judge is disabled/timing out, the server and client report `judge_unavailable`. This is not treated as an incorrect answer, does not deduct hearts, and provides clear actions: retry or switch to text mode.
  Alternative considered: Silent fallback to host execution. Rejected because running untrusted user code on host in production violates security invariants.
- Decision: Expanded equivalent answer normalization in `@eduforge/shared`.
  Reason: Many exercises in translation, fill-in-the-blank, and code fill failed due to trivial variations: apostrophes (`’`, `'`, `ʼ`), quotation marks (`"`, `'`), optional semicolons in code, spaces around operators, or trailing punctuation. Unifying normalization in `normText` and `normCode` allows equivalent answers without compromising correctness.
  Alternative considered: Manually adding hundreds of variations to every `accepted` array. Rejected as error-prone and incomplete compared to robust normalization.
- Decision: Robust typing target detection for Monaco and input controls.
  Reason: `isTypingTarget` only checked shallow element tag names. Monaco uses deeply nested elements and virtual focus, so typing `font-size` intercepted `f` to toggle lesson focus mode, `?` opened shortcuts help, and `Escape` triggered lesson exit dialogs. Enhanced `isTypingTarget` checks `.monaco-editor`, `isContentEditable`, ARIA roles (`textbox`, `combobox`), and activeElement.
  Alternative considered: Adding `e.stopPropagation()` in Monaco wrapper alone. Rejected because global `window.addEventListener("keydown", ...)` captures events before or during bubbling across components.
- Decision: Non-destructive content synchronization script (`pnpm content:update`).
  Reason: Regular `pnpm db:seed` wipes or resets seed data and could conflict with CMS courses or user state. A dedicated update routine updates exercise definitions for `seed`-sourced courses while maintaining progress and CMS entities.
  Alternative considered: Full database re-seed. Rejected due to risk to user progress and production database rules.

## Surfaced assumptions

- C++ tasks remain client-mocked / statically checked with explicit disclaimer, as C++ compiler is not part of the standard Docker judge container.
- If an open lesson has its exercise structure changed while a user has it open, the UI detects the version/checksum mismatch and offers a reload prompt while preserving already completed progress.
- Local device preference key `eduforge_grading_mode` stores either `"behavior"` or `"text"`.

## Out of scope

- Rewriting existing CMS-authored exercises in database.
- Adding arbitrary native compilers (e.g. gcc/clang) into Docker judge.
- Changes to XP formulas, hearts regeneration intervals, or Elo ratings.
