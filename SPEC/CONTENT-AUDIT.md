# Content review (learning-improvements)

Spot-check of PR #13 expansions and the follow-up open-content courses, plus the automated quality gate.

## Automated gate (`packages/content/src/quality-gate.test.ts`)

Wired into `pnpm --filter @eduforge/content test`, therefore into `pnpm test:unit` and the GitHub Actions `content-gate` job.

Fails the build on:

- a course missing from, or out of order with, `COURSE_SLUGS`
- empty Ukrainian or English titles (course, unit, lesson)
- globally duplicate lesson slugs or exercise ids
- missing `promptUk` / `promptEn` on prompt-bearing exercises
- unpaired or empty `explanationUk` / `explanationEn`
- malformed MCQ / comprehension / fill / match / order / typing / explain shapes

Result on this branch (1,865 lessons, 6,935 exercises, 35 courses): **all checks green**. Historical AI / Next.js / algorithms exams that have fewer than six questions are **not** failed here; that bar stays in `content.test.ts` for tracks that already require it.

## Manual sample

Reviewed titles and a sample of MCQs from:

- REST API Design (including the new versioning, lists/errors, and auth/docs units) — answers match common REST practice (URI version on breaking changes, additive fields as compatible, cursor vs offset, filters in the query, `Authorization: Bearer`, `429` + `Retry-After`). Ukrainian prompts read naturally (`коли зміна ламає наявних клієнтів`, `у query GET /orders?status=open`).
- Go Fundamentals, Web Accessibility, Frontend Performance, Browser Web APIs — unit titles are bilingual and consistent with the specs (POUR/WCAG, critical rendering path, Core Web Vitals, Fetch/Abort, observers, workers).

No factual or translation fixes were required in this pass. The two pre-existing missing `explanationEn` values (English `en-6-1`, speed-reading `sr-1-1`) were filled in an earlier commit on this branch.

## Discoverability

The three PR #13 courses (`go_fundamentals`, `web_accessibility`, `rest_api_design`) were already in `COURSE_SLUGS`, the catalog, seed, and hubs. Per SPEC/COURSE-REGISTRY they are **not** added as a seventh primary-nav slot. They (and the two follow-up tracks) are now in:

- `FEATURED_COURSE_SLUGS`, shown as a "New courses" row on `/courses` and `/learn`
- curated **learning paths** (`/paths`, More menu, and "Part of these paths" on course hubs)
