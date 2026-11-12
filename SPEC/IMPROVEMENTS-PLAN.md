# Learning improvements — implementation plan

Branch: `feat/learning-improvements`, based on current `dev` (PR [#13](https://github.com/murziksasha/habits/pull/13) **already merged** on 12 Nov 2026, commit `41e40f7`). Target PR base: `dev`.

Goal: implement all seven features requested after the 572-lesson expansion. Prefer **extending** existing modules over inventing parallel systems. All new UI copy is bilingual (`uk` default + `en`) via `getUI(locale)` in `@eduforge/shared`.

This document is the working plan and the **progress log**. Update the status table after each feature commit so a successor can resume.

## 0. What already exists (do not duplicate)

Studied against `AGENTS.md`, `SPEC/CURRENT.md`, `SPEC/CONTENT-DX.md`, `SPEC/COURSE-REGISTRY.md`, and the code:

| Area | Already in the repo | Gap this work fills |
| --- | --- | --- |
| New courses from PR #13 | `go_fundamentals`, `web_accessibility`, `rest_api_design` in `COURSE_SLUGS`, `COURSE_META`, hubs, seed, i18n, subjects, XP. Catalog (`SubjectCatalog` / `GET /courses`) lists every published seed course. | IA forbids a new *primary-nav slot* per deep track (`SPEC/COURSE-REGISTRY.md`, `SPEC/57-nav-primary.md`). They are easy to miss among 33 courses. REST is only 12 lessons. Hubs are not linked from More / programming map / a featured row. |
| Open content | Generators stubs in `scripts/gen-expansion/courses/load.py` for `frontend_performance` and `browser_web_apis`. `assemble.py` has REST + Frontend Performance meta; Browser Web APIs meta is missing. `rest.py` loads `rest_b` if present — file does not exist. | Write the lessons, register the two new courses the same way as Go, fill two pre-existing missing `explanationEn` (english `en-6-1`, speed-reading `sr-1-1`). |
| Learning paths | `FULL_STACK_ROADMAP_ORDER`, `COURSE_PREREQUISITES`, `COURSE_NEXT_MAP`, Oracle path inside SQL, `path-badges` service. Course hubs show prereqs + “next in path”. | No curated goal-based path registry, no `/paths` page, no per-path progress, no “this course belongs to these paths” links. |
| Spaced repetition | SM-2 in `packages/shared/src/srs.ts` + `exercise-srs.ts`. Table `exercise_reviews` (migration `0032`). `recordExerciseLearning` runs on **every** lesson/exam submit (pass or fail). `/review`, `/review/mistakes`, `/flashcards`. Review page already fetches due counts. | No due-count **badge on primary nav**. No cheap `/review/due-count` for the chrome. Flashcard + mistake due are not summed in one place for the shell. |
| Progress feedback | `applyStreakOnActivity`, streak shields, `StreakCalendar`, daily goal XP, `computeWeeklyRecap` (API + `/calendar` UI), `PrimaryMission` (continue CTA from `/learning/next`), `ContinueCta` on `/courses` and `/learn`. Dashboard comment explicitly avoided duplicating Continue. | Home (`/dashboard`) has no “continue where you left off” **card** and no weekly summary — only a thin PrimaryMission + streak line. User asked for both on home. |
| Content quality CI | `packages/content/src/content.test.ts`: unique slugs/ids per course, EN title/prompt gate, known exercise types, valid `correctIndex`. GitHub Actions job `content-gate` + `pnpm test:unit` already runs content tests. | No global slug uniqueness across courses. `explanationUk` without `explanationEn` does **not** fail (the two pre-existing gaps prove it). Empty / whitespace explanations, missing optionsEn consistency, malformed fill/accepted, exam size — incomplete. |
| Placement | Curated 10-question tests for **English** and **Programming** only (`placement.ts`, `/placement`, `/placement/programming`, `placement_results` table). Submit recommends a unit and returns `startHref`. Does **not** mark earlier units as known. | Optional short quiz at the start of **every** course, generalize API, persist skips, unlock later units, UI on course hubs. |

**Invariant to keep:** do not add a 7th primary-nav item for a single deep-track course. Discoverability goes through `/courses`, `/learn`, a featured “new courses” row, `/paths`, and a More-menu link to paths. The product stays free; skipped lessons award **0 XP**.

## 1. Feature: Content review + discoverability

### 1.1 Spot-check

- Script `scripts/content-audit.mjs` (or a vitest in `@eduforge/content`) samples at least one non-exam expansion lesson per course (33 courses) and flags: empty bilingual fields, `explanationUk` without `explanationEn`, identical uk/en prompts on MCQ, options length < 2, `correctIndex` out of range, explain-sample rubric failures (already covered for `explain()`).
- Manual pass: read that sample for factual errors and unnatural Ukrainian. Fix confirmed issues in the source (expansion modules or original files). Do not mass-rewrite 572 lessons.
- Record findings and fixes in this plan’s progress log and `SPEC/CONTENT-EXPANSION.md`.

### 1.2 Discoverability (no new primary-nav slot)

- Add a **featured / new** strip on `/courses` and `/learn` for: Go, Accessibility, REST API Design, and (once written) Frontend Performance + Browser Web APIs.
- Add `/paths` to the More menu (toolkit group) — this is the navigation home for the new courses *as a set*.
- Ensure `COURSE_HUB_HREF`, subjects, and the crawler outline on `courses/page.tsx` include every published slug (they already do for the three PR #13 courses; extend for the two new ones).
- Update `SPEC/COURSE-REGISTRY.md`: keep “not a primary-nav item”, but document catalog + paths + featured row as the discovery surfaces.
- Deep hubs already exist at `/go-fundamentals`, `/web-accessibility`, `/rest-api-design`.

### Tests

- Shared test: featured slug list is a subset of `COURSE_SLUGS`.
- Content audit test fails on the two known missing `explanationEn` until feature 2 fixes them (order: fix first, then tighten the gate — see rollout).

## 2. Feature: Finish open content

### 2.1 REST API Design → 24 lessons

- Add `scripts/gen-expansion/courses/rest_b.py`: 3 units × (3 teach + 1 exam) = 12 lessons, uk+en, existing `sectionUnit` / `teachLesson` schema.
- Proposed units:
  1. `rest_versioning` — URI vs header versioning, deprecation, compatibility.
  2. `rest_lists_errors` — pagination (cursor vs offset), filtering, `application/problem+json`.
  3. `rest_auth_docs` — auth schemes, rate limits, idempotency reminder, OpenAPI.
- `rest.py` already concatenates `rest_a + rest_b`. Re-run assemble; do not hand-edit the generated `rest-api-design.ts` except via the pipeline.
- Update `SPEC/courses/rest_api_design.md` and `SPEC/CONTENT-EXPANSION.md` counts.

### 2.2 New courses (~24 lessons each)

Same shape as Go (6 units, 3 teach + 1 exam each):

**`frontend_performance`** (slug, hub `/frontend-performance`):

1. Critical rendering path (HTML/CSS/JS blocking, preload/prefetch).
2. Rendering and the main thread (reflow, paint, compositing).
3. Bundles and code splitting (tree-shaking, dynamic `import()`, budgets).
4. Images and media (`srcset`, lazy, modern formats, CLS).
5. Caching and delivery (HTTP cache, CDN, compression, service worker).
6. Core Web Vitals (LCP, INP, CLS, field vs lab, RUM).

**`browser_web_apis`** (hub `/browser-web-apis`):

1. DOM and events (delegation, capture, `AbortSignal`).
2. Fetch, streams, and cancellation.
3. Storage (cookies, Web Storage, IndexedDB, Cache API).
4. Observers (Intersection, Mutation, Resize, Performance).
5. Workers and messaging (Worker, SharedWorker, BroadcastChannel).
6. History, URL, Clipboard, Notifications, Permissions.

Registration checklist (mirror commit `1e561c1`):

- `COURSE_SLUGS`, `COURSE_GROUP` (deep), `COURSE_META`, `COURSE_HUB_HREF`, prereqs/next, `FULL_STACK_ROADMAP_ORDER`.
- `subjects.ts`, `xp.ts`, `i18n.ts` (`courses.*`).
- Content file + `packages/content/src/index.ts` export + `normalizeCourseLocales`.
- `packages/db/src/seed.ts`.
- Hub page via `RoadmapCourseHub`.
- `assemble.py` `NEW_META` (add Browser Web APIs — currently missing).
- Specs in `SPEC/courses/`, registry + CONTENT-EXPANSION + CONTENT-DX.
- Content tests: slug present, ≥24 lessons, unit exams, bilingual titles.

Prereqs: performance ← `js_fundamentals` + `react_fundamentals`; browser APIs ← `js_fundamentals`. Next: performance → `nextjs_fullstack`; browser APIs → `frontend_performance` / `web_security`.

### 2.3 Missing `explanationEn`

| File | Exercise | `explanationUk` | Add `explanationEn` |
| --- | --- | --- | --- |
| `packages/content/src/english.ts` | `en-6-1` (Present Simple) | «3-тя особа однини: goes.» | «Third person singular takes *goes*.» |
| `packages/content/src/speed-reading.ts` | `sr-1-1` (RSVP) | Rapid Serial Visual Presentation… | Matching English explanation. |

## 3. Feature: Learning paths

### Architecture

Pure registry in `@eduforge/shared` (`packages/shared/src/learning-paths.ts`):

```ts
export type LearningPathId =
  | "frontend-dev" | "backend-dev" | "qa-engineer"
  | "ai-builder" | "dba-sql" | "devops";

export type LearningPathDef = {
  id: LearningPathId;
  icon: string;
  titleUk: string; titleEn: string;
  descriptionUk: string; descriptionEn: string;
  courseSlugs: readonly CourseSlug[]; // ordered
};
```

Proposed sequences (course slugs must exist; include new courses once registered):

- **Frontend dev:** programming → html_semantics → css_layout → web_accessibility → js_fundamentals → typescript → react_fundamentals → browser_web_apis → frontend_performance → nextjs_fullstack
- **Backend dev:** programming → js_fundamentals → typescript → node_fundamentals → express_fundamentals → rest_api_design → sql_fundamentals → postgresql_apps → web_security → go_fundamentals
- **QA engineer:** programming → qa_theory → js_fundamentals → git_workflows → software_testing → sql_fundamentals → web_security
- **AI builder:** programming → python_for_ai → ai_development → agentic_systems → llmops → ai_security → ai_product
- **DBA / SQL:** programming → sql_fundamentals → postgresql_apps
- **DevOps:** programming → git_workflows → sysadmin → express_fundamentals → postgresql_apps → devops → web_security

Helpers: `listLearningPaths()`, `getLearningPath(id)`, `pathsForCourse(slug)`, `pathProgress({ completedSlugs | per-course completed/total })`.

Progress is **computed** from existing `userLessonProgress` — no enrollment table. A path is “started” when any course on it has a completed lesson; “complete” when every course on it is complete.

### API

- `GET /learning/paths` — all paths + the current user’s per-path `{ completedCourses, totalCourses, completedLessons, totalLessons, nextCourseSlug, nextHref, percent }`. Auth optional: without a user, totals only (no personal progress).
- `GET /learning/paths/:id` — one path, ordered courses with personal completion. `404` if unknown id.

Mounted on existing `learningRoutes` (`authMiddleware` optional via a public + authed pair, or auth required consistent with `/courses` which is public). **Decision:** public GET, personal progress when a session is present (same pattern as `GET /courses`).

### UI

- `/paths` — list of path cards with progress bars; `/paths/[id]` — ordered course list, continue button.
- Course hubs (`DeepCourseHub` / skill `course-detail-client`): “This course is on: Frontend dev, …” linking to those paths.
- i18n: `nav.paths`, `paths.*` (title, progress, continue, empty, coursesOnPath, notFound).
- More menu link (toolkit).

### Tests

- Shared: every slug in every path is a `COURSE_SLUG`, no duplicates inside a path, `pathProgress` math.
- API unit/integration if DB available: unauthenticated list, 404, progress with a fixture user.
- Web: smoke that `/paths` renders (e2e optional; unit the progress helper).

## 4. Feature: Spaced repetition (extend, don’t rebuild)

### Data / algorithm

Reuse `exercise_reviews` + `applySrsRating` + `srsRatingFromOutcome`. Wrong exam answers **already** create/update review cards in `recordExerciseLearning`. No new migration for the core algorithm.

Optional additive migration only if we need a denormalized due counter — **not required**; query on read is enough (indexed on `(user_id, due_at)`).

### API

- Add `GET /review/due-count` (auth): `{ mistakesDue, flashcardsDue, totalDue }`. Cheap `COUNT` queries. Used by the shell.
- Keep existing `/review/mistakes` and flashcard due endpoints.

### UI

- Badge on the primary-nav **Practice** (`/review`) slot and the More “Review” link: numeric due count, `sr-only` label, hidden when 0.
- Fetch once in `Nav` (or a tiny hook) after auth; refresh on focus / every few minutes. Fail soft (hide badge).
- Review landing already shows due numbers — leave it, just ensure the badge matches `totalDue`.

### Tests

- Shared: already covered for SM-2 and outcome→rating.
- API: due-count sums; empty user → zeros. Extend `review-queue.test.ts` / a new route test.
- Do not award XP from reviews (existing invariant).

## 5. Feature: Progress feedback on home

### Extend, don’t duplicate

- **Streaks:** already applied on activity (`applyStreakOnActivity`) and shown as a number + `StreakCalendar` on the dashboard. Keep that. Optionally surface “streak at risk” copy if `lastActiveDate` is yesterday and it is late in the day — only if `lastActiveDate` is already on the character payload. No second streak system.
- **Weekly summary:** `computeWeeklyRecap` already powers `/calendar`. Add a compact **WeeklySummaryCard** on `/dashboard` that consumes the same `/learning/progress` (or fold a `weeklyRecap` snapshot into `GET /me/home` to avoid a second round-trip). Show: lessons this week vs last week, XP, streak, link to `/calendar` for the full recap. Reuse `t.learning.weeklyRecap*`.
- **Continue card:** dashboard currently relies on `PrimaryMission` (recommendation list). Add an explicit **Continue where you left off** card (`ContinueCta variant="card"`) at the top of the home stack, under the welcome row, citing the last in-progress lesson (already implemented by `ContinueCta` / `/learning/next`). This is an intentional override of the older “no Continue duplication on home” comment — the user asked for the card on home.

### API

Prefer extending `HomePayload` with:

```ts
weeklyRecap: LearningWeeklyRecap | null;
continueLesson: { href: string; titleUk: string; titleEn: string; courseSlug: string } | null;
```

`continueLesson` can be the first `kind` matching continue/start from existing recommendations so the client does not need a new endpoint.

### Tests

- Shared: weekly recap already tested. Home payload mapping unit test if we add a pure mapper.
- Web: render test for the new cards (locale uk/en strings from `getUI`).

## 6. Feature: Content quality CI

### Gate (Vitest in `@eduforge/content`)

New focused file `packages/content/src/quality-gate.test.ts` (kept separate from the huge `content.test.ts`) that **fails** on:

1. Missing uk/en: course/unit/lesson `titleUk`/`titleEn`; exercise `promptUk`/`promptEn` when the type has a prompt; if `explanationUk` is non-empty then `explanationEn` must be non-empty (and vice versa).
2. Duplicate lesson slugs **within a course and globally**; duplicate exercise IDs within a course **and globally**.
3. Empty / whitespace-only titles, prompts, explanations, accepted answers, typing/RSVP text.
4. Malformed exercises: unknown `type`; MCQ/logic/`code_read` with `<2` options or `correctIndex` out of range; `fill_blank` without `accepted`; `explain` sample answers that fail their own rubric (delegate to existing helper if present); exam lessons with too few questions (reuse the 6-question convention where the course uses unit exams).

`pnpm test:unit` already includes `@eduforge/content`. The Actions job `content-gate` already runs `pnpm --filter @eduforge/content test`. No new workflow file is required; mention the gate in `SPEC/11-testing.md` and `SPEC/CONTENT-DX.md`.

CI workflow triggers already include `pull_request` to `dev`. If a tiny job name clarification helps, add a step name, not a second workflow.

### Rollout caution

Turn the stricter gate on **after** the two `explanationEn` fills (feature 2), and after fixing any other violations the audit finds. If a pre-existing violation is huge and out of scope, document it and gate *new* files only — prefer fixing, not exempting.

## 7. Feature: Placement tests for every course

### Design

Generalize English/Programming into a course-agnostic placement module (`packages/shared/src/course-placement.ts`) used by the existing English/Programming endpoints (keep those URLs as aliases).

For each `CourseSlug`:

- **Question bank:** 8–10 MCQs. Prefer a **curated** bank when we have one (keep `ENGLISH_PLACEMENT` and `PROGRAMMING_PLACEMENT`). For other courses, **derive** from existing unit-exam / lesson MCQs in `@eduforge/content`: pick across early / mid / late units (stable order, no random at request time), bilingual prompts, strip answers from the client payload.
- **Scoring:** reuse `scorePlacement`-style weighted score → level → `recommendedUnitSlug` (one of the course’s real unit slugs). Levels: “start at unit 1”, “skip early units”, “skip to mid”, “skip to late”. Mapping: index into `course.units` by score bands (0–25% unit 0, 25–50% ~1/3, 50–75% ~1/2, 75%+ last third).
- **Skip / mark-as-known:** on submit, if the recommended unit is not the first, persist **unit-level** “known” marks for all **prior** units. These unlock later units and count as complete for path/course progress **without XP** and without writing fake high scores on every lesson exam.

### Data model (migration `0037_learning_improvements`)

Do **not** `ALTER TYPE lesson_status` (enum is `locked | available | completed`). New table:

```sql
CREATE TABLE user_unit_placements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_slug varchar(64) NOT NULL,
  unit_slug varchar(64) NOT NULL,
  status varchar(16) NOT NULL DEFAULT 'known', -- 'known' | 'start'
  placement_result_id uuid REFERENCES placement_results(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX user_unit_placements_uq ON user_unit_placements (user_id, course_slug, unit_slug);
CREATE INDEX user_unit_placements_user_course_idx ON user_unit_placements (user_id, course_slug);
```

Also widen `placement_results.course_slug` if needed (already `varchar(32)` — enough for current slugs; bump to 64 to match other tables, defensive).

`placement_results` continues to store score, level, answers, `recommendedUnitSlug`.

Course progress and lock logic (`apps/api/src/routes/courses.ts`, exam lock “finish unit lessons first”) must treat `user_unit_placements.status = 'known'` as “unit satisfied”. Helper in a service: `isUnitSatisfied(userId, courseSlug, unitSlug)`.

The learner can still *open* a skipped unit and take lessons for real XP; first real completion overwrites nothing harmful (progress stays completed).

### API

- `GET /learning/placement/:courseSlug` — questions (no correctIndex), last result, whether a quiz exists (always, if derived). `400` on unknown slug.
- `POST /learning/placement/:courseSlug` — `{ answers: [{ questionId, index }] }` → score, recommended unit, `startHref`, `skippedUnits[]`. Writes `placement_results` + `user_unit_placements`. Auth required. Idempotent-ish: a new attempt replaces prior known marks for that course (delete + insert).
- Keep `GET/POST /learning/placement/english` and `/programming` as thin wrappers.

Optional: `POST /learning/placement/:courseSlug/skip` is **not** needed — skip is a consequence of the score, and the quiz is optional (user can ignore it).

### UI

- Generic page `/placement/[courseSlug]` (English and Programming stay at their current routes or redirect).
- Course hubs: optional “Take a placement test” card if the user has no result yet and has not completed the first unit. After a result: show level + CTA to the recommended lesson + list of marked-known units, with a note that they can still retake those lessons.
- i18n: generalize `placementTitle` / `placementHint` / `takePlacement` to accept a course name; add skip/known copy.

### Tests

- Shared: derived banks have 6–10 questions, unique ids, valid indices, recommended unit is a real slug; score bands.
- API: unknown course 400; submit writes placements and 0 XP; second submit replaces marks.
- Content/quality: placement questions reference existing exercise material only (for derived banks).

## 8. i18n

All new strings in `packages/shared/src/i18n.ts` on both `uk` and `en` (`const en: UiDict` enforces parity). Course titles also in `courses.*`. No hardcoded user-facing Ukrainian or English in new components except where the existing file already uses a local ternary (prefer `getUI` for anything new).

## 9. Tests and validation (release gate)

After all features:

- `pnpm typecheck`
- `pnpm test:unit`
- Builds for touched packages: `shared`, `content`, `db`, `api`, `web` (and `mobile` if it imports new shared exports — it likely does via `@eduforge/shared`; typecheck will tell).
- `pnpm test:integration` if Postgres is available; otherwise note `SKIP_INTEGRATION` / docker missing.
- Do not claim green without command output.

## 10. Rollout order (commits)

Conventional commits, one feature (or a tight slice) per commit. Suggested order so the quality gate does not fail mid-way:

1. `docs: add learning-improvements plan` — this file.
2. `fix(content): add missing explanationEn on English and speed-reading` + start of quality gate (can be same or next commit).
3. `feat(content): REST API Design to 24 lessons` (`rest_b`).
4. `feat(content): Frontend Performance and Browser Web APIs courses` (generators, registry, hubs, specs).
5. `feat(content): spot-check fixes and catalog discoverability` (featured row, More → paths comes with #6).
6. `feat(learning): curated learning paths with progress UI`.
7. `feat(review): due-count badge and /review/due-count`.
8. `feat(home): continue card and weekly summary on dashboard`.
9. `test(content): quality gate for translations, slugs, and exercises` (if not already landed).
10. `feat(placement): optional course placement with unit skip` (migration `0037`, API, UI).
11. `docs: update README, SPECs, and plan status`.

Then: validate, **one** non-force push, `gh pr create --base dev`. PR body notes PR #13 is already merged; summarize each feature, the migration, and validation results.

## 11. Risks and decisions

| Risk / decision | Mitigation |
| --- | --- |
| Primary-nav IA vs “add new courses to primary navigation” | Do **not** add per-course top-nav items. Featured catalog row + `/paths` + More link. Document in the PR. |
| Derived placement questions could be too easy/hard or leak answers | Curated banks stay for English/Programming. Derived banks only use exam MCQs, answers stripped on GET, stable selection. Quality over cleverness. |
| Marking units known vs. inflating XP / certificates | 0 XP, no automatic certificates, no fake exam scores. Certificates and achievements stay on real completions. Path progress **does** count known units as satisfied (otherwise placement would not help). Call this out in the PR. |
| Stricter content gate vs 1,800 lessons | Run the gate locally first, fix violations we introduced or the two known gaps; if a large historical pile appears, fix if feasible or temporarily scope the new assertions with a documented allow-list — prefer fix. |
| `placement_results.course_slug` varchar(32) | Widen to 64 in `0037`. |
| Migration on environments that have not run `0036` | Standard linear drizzle journal; no squash. |
| Huge generated TS files | Keep generating via `scripts/gen-expansion`; do not hand-edit assembled files. Commit generated output (same as PR #13). |
| Mobile app | Shared registry/i18n changes flow through `@eduforge/shared`. No required new mobile screens in this PR unless typecheck forces an exhaustiveness update; note if mobile is web-only for paths/placement. |
| Context-window / long task | Small commits, this status log, never `cat` huge content files (`rg` / `head` / `wc`). |

## 12. Progress log

| Step | Status | Notes |
| --- | --- | --- |
| 0. Study codebase, write this plan, commit | **done** (this commit) | Branched from `origin/dev` (`41e40f7`, PR #13 merged). Remote `feat/expand-courses-lessons` was deleted after merge. |
| 1. Missing `explanationEn` | pending | |
| 2. REST +12 lessons | pending | |
| 3. Frontend Performance + Browser Web APIs | pending | |
| 4. Content spot-check + catalog featured row | pending | |
| 5. Learning paths | pending | |
| 6. SRS due-count badge | pending | |
| 7. Home continue + weekly summary | pending | |
| 8. Content quality CI gate | pending | |
| 9. Placement for all courses + migration `0037` | pending | |
| 10. Docs, typecheck, unit tests, builds, PR | pending | |

Successor resume hints: generators in `scripts/gen-expansion/courses/`; registry edits mirror `1e561c1`; i18n is `packages/shared/src/i18n.ts` (`uk` then `en: UiDict`); migrations in `packages/db/drizzle/` + `meta/_journal.json`.
