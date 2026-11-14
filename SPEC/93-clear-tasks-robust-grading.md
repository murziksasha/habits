# 93 — Clear Tasks and Robust Grading

## Goal

Provide crystal-clear exercise instructions, eliminate typing conflicts with global hotkeys in code editors, and deliver robust server-side behavior verification with seamless text fallback across built-in courses and CMS.

## Architecture & Principles

### 1. Clear Exercise Conditions
- Every interactive exercise clearly states:
  - **Input data / starter files:** What components or data structures are initially provided.
  - **Expected outcome:** The goal and required end result.
  - **Mandatory elements:** Specific required keywords, functions, styles, or tags without revealing the full solution.
  - **Validation limits:** Explanation of whether checks are static or behavioral, noting acceptable formatting variants.
- Bilingual prompts: Ukrainian primary + English secondary.
- Exercise IDs and student progress are strictly preserved.

### 2. Expanded Answer Normalization & Equivalence
- Pure domain logic in `@eduforge/shared` (`grade.ts`):
  - `normText`: Normalizes Ukrainian apostrophes (`’`, `‘`, `ʼ`, `` ` ``, `'`), guillemets/quotes (`«`, `»`, `“`, `”`, `"`), dashes, and trailing punctuation.
  - `normCode`: Normalizes string quotes (`'` vs `"`), operator spacing (`a + b` vs `a+b`), optional trailing semicolons, and CSS property whitespace (`font-size: 16px;` vs `font-size:16px;`).
  - `isCodeEquivalent`: Equivalence matching for programming and layout tasks.
  - `gradeCodeProjectChecks`: Source checks support both strict substrings and normalized equivalent fallback.

### 3. Server-Side Isolated Behavior Verification (`code_judge`)
- **Zero Client Trust:** Client-reported `{ ok: true }` is never accepted as proof of execution on the server. Only server-executed results stamped with `_serverVerified: true` from the server judge runner are valid for behavior mode.
- **Fail-Closed Security:** Student code is only run inside isolated Docker containers (never on the host in production).
- **Graceful Fallback:** When the judge runner is disabled or offline, the API returns HTTP 503 `{ error: "judge_unavailable" }`. No hearts are deducted, no failed attempt is recorded, and the UI prompts the student to retry or manually switch to text check mode.

### 4. Dual-Mode Switch (Behavior / Text)
- Supported on exercises configured with `checkMode: "both"`.
- Defaults to **Behavior Check** (`"behavior"`), persisted in `localStorage` under `eduforge_grading_mode`.
- When switched to **Text Check** (`"text"`), the player displays an informational notice that code execution is skipped, but statically verifies code constructs and awards normal XP and lesson completion.

### 5. Editor Keyboard Event Isolation
- Global keyboard handler in `lesson-client.tsx` and `answer-keys.ts` uses `isTypingTarget(event.target)`.
- Prevents shortcuts (`f` / focus mode, `?` / shortcuts dialog, `Escape`, numbers, `Enter`) from triggering when focus is inside:
  - Monaco editor DOM structures (`.monaco-editor`, `.inputarea`, `.view-line`, `.mtk*`).
  - Inputs and textareas (`<input>`, `<textarea>`).
  - ARIA text entry roles (`role="textbox"`, `role="searchbox"`, `role="combobox"`).
  - Any element marked `contenteditable="true"`.
- Hotkeys outside input targets remain fully functional.

### 6. Dynamic Lesson Structure Change Detection
- Open lessons track `lessonStructureHash`. If the course or lesson structure is updated on the server while open, the learner receives a non-disruptive banner offering to reload the updated lesson while preserving completed progress.

### 7. CMS Exercise Builder Support
- Admin builder (`exercise-builder.tsx`) supports `code_judge`:
  - Language selection: JavaScript, TypeScript, Python, Bash.
  - Check mode selection: `both`, `behavior`, `text`.
  - Starter code, test assertions JSON, accepted text alternatives, and bilingual limitations notes.
- Existing CMS materials are not automatically altered.

### 8. Safe Content Synchronization (`pnpm content:sync`)
- Script in `packages/db/src/sync-content.ts` safely updates only `seed`-sourced courses, units, and lessons.
- Matches existing records by IDs and slugs.
- Never touches users, passwords, sessions, progress, or courses where `contentSource === "cms"`.
- Does not drop or recreate tables.
