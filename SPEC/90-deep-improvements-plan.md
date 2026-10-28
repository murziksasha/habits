# 90 — Deep improvements plan (learning depth)

Branch: `feature/deep-improvements` → merged into `deepImprovements`.

This document is the analysis + step-by-step plan for making EduForge lessons teach
*deeper* (understanding and long-term retention), not only quiz recall. Each step has a
status. Steps marked **Done** shipped in this branch; **Later** is the backlog.

---

## 1. Analysis (state before this branch)

### 1.1 Stack

| Layer | Tech |
|-------|------|
| Monorepo | pnpm 11 workspaces + Turborepo, TypeScript 5.9, Node 22 |
| Web | Next.js (app dir, partial RSC), Tailwind, Monaco, chess.js, WebContainers, JSCPP |
| API | Hono + OpenAPI, Drizzle ORM, Postgres 16, Redis 7 |
| Realtime | Socket.IO (chess PvP, live classroom) |
| Content | `packages/content` — TS seed files per course (`CourseContent` → units → lessons → exercises) + MDX parser |
| Shared | `packages/shared` — grading, XP, SRS (SM-2), adaptive next, i18n, entitlements |
| Tests | Vitest (unit, content integrity gate, API integration), Playwright (e2e + visual) |

### 1.2 How courses are stored

- Each course is a TS file in `packages/content/src/<slug>.ts` built with helpers from
  `builders.ts` (`lesson`, `exam`, `unit`, `mcq`, `codeFill`, `codeRead`, `codeOrder`, `matchEx`, …).
- `normalizeCourseLocales()` fills missing EN prompts and marks the first 5 lessons free.
- `packages/db/src/seed.ts` upserts course → unit → lesson by slug (idempotent); exercises live in
  `lessons.exercises` (jsonb), so **new exercise types need no SQL migration**.
- Grading is shared (`@eduforge/shared` `gradeExercise`) between API and client soft-grade.

### 1.3 Findings

| # | Finding | Impact on learning depth |
|---|---------|--------------------------|
| F1 | Lessons are almost pure quizzes (≈3 exercises: mcq / code_fill / match). There is **no theory / explanation step** before practice; the only teaching text is optional `explanation*` after an answer. | Learners guess, then learn from feedback; weak for novices (no worked example). |
| F2 | Many exercises reuse the same text for `promptUk` and `promptEn` and have very short prompts ("arrow", "await"). | Low context; Ukrainian learners get English-only prompts. |
| F3 | Lesson spaced review uses a fixed heuristic interval (`1 + score*12` days) — no notion of *memory strength* that grows with successful repetitions. | Review queue cannot say "you have ~40% chance to remember this". |
| F4 | Review is lesson-level only: the learner re-plays a whole lesson in order. No **interleaved / mixed retrieval practice** across lessons. | Interleaving + retrieval practice are two of the strongest evidence-based techniques; missing. |
| F5 | Course gaps: JS has no closures / event-loop / `this` unit; TypeScript stops before conditional / mapped / template-literal types; SQL has no subqueries / CTE / indexes unit; English lacks a "learning how to learn" style unit. | Deep tracks end before "senior-interview" topics. |
| F6 | CI workflow only triggers PRs to `main/master/dev`, so PRs into `deepImprovements` are not checked by GitHub Actions. | Must run checks locally (done for this branch) — consider adding the branch to CI. |
| F7 | `pnpm ci` is shadowed by pnpm 11's built-in `ci` (clean install). The script must be called as `pnpm run ci`. | Dev confusion. |
| F8 | No confidence/self-rating per exercise → no calibration data (knowing what you don't know). | Metacognition missing. |

---

## 2. Improvements & new deep-learning features

| ID | Feature | Why (learning science) | Scope |
|----|---------|------------------------|-------|
| D1 | **Concept cards** — new exercise type `concept`: theory text, key points, optional code example, optional 1-question self-check. | Worked examples / pre-training before retrieval (F1). | Done |
| D2 | **Memory-strength model** — `estimateRetention()` (exponential forgetting curve, stability grows with mastery and successful attempts). Review items expose `retentionPct`, `stabilityDays`, `dueInDays`. | Makes "when to review" explicit (F3). | Done |
| D3 | **Interleaved mixed practice** — `GET /review/mixed` builds a mixed retrieval set from completed lessons (weak lessons weighted higher, round-robin across lessons/units, seeded shuffle); `POST /review/mixed/check` grades server-side; `/review/mixed` UI. | Interleaving + retrieval practice (F4). | Done |
| D4 | New lessons in JS, TypeScript, SQL, English — each starting with a concept card. | Fill depth gaps (F5). | Done |
| D5 | Confidence rating (sure / unsure / guess) per answer + calibration chart. | Metacognition (F8). | Later |
| D6 | Elaborative "explain in your own words" free-text step graded by tutor (SpaceXAI) with rubric. | Self-explanation effect. | Later |
| D7 | Exercise-level SRS (mistake notebook): each wrong exercise becomes an SRS item reusing `srs.ts`. | Finer-grained review than lesson level. | Later |
| D8 | Mastery map per unit (skill graph) using retention estimates. | Visibility of decay. | Later |
| D9 | Add `deepImprovements` to CI `pull_request` branches. | Quality gate (F6). | Later |
| D10 | Rewrite short/duplicated prompts in early JS lessons with real Ukrainian text (F2). | Clarity. | Later |

---

## 3. Step-by-step plan

### Phase A — Preparation
1. **Done** — Clone repo, install with Node 22 + pnpm 11 (corepack), run baseline: build shared/content/chess-core/judge/db, `pnpm run test:unit`, `pnpm run typecheck`, `pnpm run lint` (all green).
2. **Done** — Create `feature/deep-improvements` from `deepImprovements`.
3. **Done** — Write this plan (SPEC/90).

### Phase B — Concept cards (D1)
4. **Done** — Add `"concept"` to `ExerciseType` (`shared/courses.ts`) and `EXERCISE_TYPES` (`shared/exercises.ts`).
5. **Done** — Zod schema: `bodyUk`, `bodyEn?`, `keyPointsUk?[]`, `keyPointsEn?[]`, `code?`, `language?`, `check?` (`qUk`, `qEn?`, `options`, `correctIndex`).
6. **Done** — `gradeExercise`: no `check` → correct when acknowledged; with `check` → index must match.
7. **Done** — Content: `Exercise` union member + `concept()` builder in `builders.ts`.
8. **Done** — Web: `ConceptExercise` renderer (body paragraphs, key points list, read-only code, self-check) + type label in `exerciseTypeLabel`.
9. **Done** — Tests: shared grade tests + content test known-type set.

### Phase C — Memory-strength model (D2)
10. **Done** — `packages/shared/src/retention.ts`: `stabilityDays({bestScore, attempts})`, `estimateRetention({…, daysSince})`, `daysUntilRetention(target)`.
11. **Done** — Unit tests (monotonic in score/attempts, decays with time, bounds 0..1).
12. **Done** — `GET /review` items include `retentionPct`, `stabilityDays`, `dueInDays`.
13. **Done** — Review UI shows "memory ≈ N%" per item.

### Phase D — Interleaved mixed practice (D3)
14. **Done** — `packages/shared/src/interleave.ts`: `isMixedPracticeType`, `buildInterleavedSet(pools, {count, seed})` (weighted by weakness, round-robin, no duplicate exercise ids, deterministic seed).
15. **Done** — Unit tests.
16. **Done** — API `GET /review/mixed?course=&count=` (completed lessons only, auto-gradable types only) and `POST /review/mixed/check` (server grading via `gradeExercise`, logs `mixed_practice` activity event).
17. **Done** — Web `/review/mixed` page using `ExercisePlayer`, per-item feedback + final accuracy; link from `/review`.

### Phase E — New lessons (D4)
18. **Done** — `js_fundamentals`: unit `closures_event_loop` (closures, `this` binding, event loop & microtasks) + exam.
19. **Done** — `typescript`: unit `advanced_types` (conditional + `infer`, mapped types, template literal types) + exam.
20. **Done** — `sql_fundamentals`: unit `subqueries_cte` (subqueries & EXISTS, CTE / WITH, indexes & EXPLAIN) + exam.
21. **Done** — `english`: unit `learning_skills` (talking about learning, phrasal verbs for study).
22. **Done** — Content integrity gate passes (unique ids, EN prompts, exams per deep unit).

### Phase F — Verification
23. **Done** — Rebuild packages, `pnpm run test:unit`, `pnpm run typecheck`, `pnpm run lint`, web `next build`.

### Phase G — Later (backlog)
24. **Later** — D5 confidence rating + calibration (needs `exercise_attempts` table / migration).
25. **Later** — D6 self-explanation step graded by tutor.
26. **Later** — D7 exercise-level SRS mistake notebook (migration + `/review` tab).
27. **Later** — D8 unit mastery map with retention heat colors.
28. **Later** — D9 CI branch filter; D10 prompt rewrite pass; MDX authoring for concept cards (`<!-- concept -->` marker).
29. **Later** — Admin exercise builder form for `concept` (currently editable as JSON).

### Phase H — Docs (final step)
30. **Done** — Update docs: `SPEC/91-deep-learning-features.md` (feature spec), `SPEC/README.md` index, `SPEC/CURRENT.md`, `SPEC/CONTENT-DX.md` (concept builder), `README.md` (features table + `pnpm run ci` note), this plan's statuses.

---

## 4. Results (verification on this branch)

| Check | Result |
|-------|--------|
| `pnpm run test:unit` (8 packages) | ✅ all pass — shared 175 tests (+16 new), content 43 (+3 new), api 97, web 10 |
| `pnpm run typecheck` | ✅ |
| `pnpm run lint` | ✅ |
| `pnpm --filter @eduforge/web build` | ✅ (`/review/mixed` route built) |
| API integration (Postgres) / e2e | ⏭ not run locally (needs Postgres + Redis stack); CI does not trigger on `deepImprovements` PRs (see D9) |

New content: 14 lessons / 59 exercises across 4 courses (details in SPEC/91).
