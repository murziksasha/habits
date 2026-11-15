# Course content expansion (Nov 2026)

Branch work on `feat/expand-courses-lessons`, based on `dev`. Adds **572**
new bilingual (Ukrainian + English) lessons across every existing course,
plus three new deep tracks. Totals measured from seeded `@eduforge/content`
against `origin/dev`.

## Totals

| | Courses | Units | Lessons | Of which exams |
|---|---:|---:|---:|---:|
| `origin/dev` | 30 | 306 | 1233 | 289 |
| After | 33 | 435 | 1805 | 390 |
| **Delta** | **+3** | **+129** | **+572** | **+101** |

All 1805 lesson slugs and 6620 exercise IDs are unique. Locales: every
new lesson has `titleUk`/`titleEn` and bilingual prompts; `normalizeCourseLocales`
fills `promptEn` and marks the first five non-exam lessons free.

## Per-course counts (lessons)

| Course | Before | After | New |
|--------|------:|------:|----:|
| `english` | 46 | 86 | +40 |
| `chess` | 32 | 62 | +30 |
| `typing` | 52 | 81 | +29 |
| `speed_reading` | 28 | 53 | +25 |
| `logic` | 47 | 77 | +30 |
| `programming` | 74 | 84 | +10 |
| `typescript` | 42 | 70 | +28 |
| `html_semantics` | 39 | 51 | +12 |
| `css_layout` | 41 | 57 | +16 |
| `qa_theory` | 59 | 71 | +12 |
| `js_fundamentals` | 63 | 103 | +40 |
| `react_fundamentals` | 39 | 63 | +24 |
| `sql_fundamentals` | 161 | 177 | +16 |
| `node_fundamentals` | 34 | 50 | +16 |
| `express_fundamentals` | 34 | 50 | +16 |
| `embedded_cpp` | 72 | 84 | +12 |
| `sysadmin` | 64 | 76 | +12 |
| `devops` | 108 | 123 | +15 |
| `software_testing` | 18 | 30 | +12 |
| `postgresql_apps` | 18 | 30 | +12 |
| `git_workflows` | 13 | 25 | +12 |
| `web_security` | 18 | 30 | +12 |
| `ai_development` | 16 | 28 | +12 |
| `python_for_ai` | 18 | 27 | +9 |
| `agentic_systems` | 18 | 27 | +9 |
| `llmops` | 18 | 27 | +9 |
| `ai_security` | 18 | 27 | +9 |
| `ai_product` | 15 | 24 | +9 |
| `nextjs_fullstack` | 15 | 27 | +12 |
| `applied_algorithms` | 13 | 25 | +12 |
| `go_fundamentals` *(new)* | — | 24 | +24 |
| `web_accessibility` *(new)* | — | 24 | +24 |
| `rest_api_design` *(new)* | — | 12 | +12 |
| **Total** | **1233** | **1805** | **+572** |

## New courses

| Slug | Hub | Units | Lessons | Topic |
|------|-----|------:|--------:|-------|
| `go_fundamentals` | `/go-fundamentals` | 6 | 24 | Packages, types, slices, interfaces, goroutines, testing |
| `web_accessibility` | `/web-accessibility` | 6 | 24 | POUR, keyboard, ARIA, contrast, WCAG 2.2 |
| `rest_api_design` | `/rest-api-design` | 3 | 12 | Resource URLs, HTTP methods, status codes, idempotency |

Program details: [SPEC/courses](./courses/). How to extend further:
[CONTENT-DX — Course expansion pipeline](./CONTENT-DX.md#course-expansion-pipeline).

DevOps new units (`finops_cost`, `supply_chain_builds`, `policy_as_code`)
are grouped as the **Platform discipline** part and sit before
`sre-capstone`, so the capstone stays last.

## Follow-up on `feat/learning-improvements`

Adds **12** lessons to REST API Design (now **24**) and two new deep tracks
of **24** lessons each, all bilingual (uk+en). Combined with the 572 from
PR #13 this is **+632** lessons versus `origin/dev` before that PR.

| | Courses | Lessons |
|---|---:|---:|
| After PR #13 | 33 | 1805 |
| After this follow-up | **35** | **1865** |
| **Delta** | **+2** | **+60** |

| Course | Before this follow-up | After | New |
|--------|------:|------:|----:|
| `rest_api_design` | 12 | 24 | +12 |
| `frontend_performance` *(new)* | — | 24 | +24 |
| `browser_web_apis` *(new)* | — | 24 | +24 |

Program details: [SPEC/courses](./courses/). Two pre-existing missing
`explanationEn` values (`english` `en-6-1`, `speed_reading` `sr-1-1`) are
filled in this branch.

## Deep English & Chess on `newCourses`

Deep tracks planned in [`SPEC/DEEP-ENGLISH-CHESS-PLAN.md`](./DEEP-ENGLISH-CHESS-PLAN.md)
and shipped on `newCourses` (PR #15). **+162** English and **+126** Chess
bilingual lessons (288 total), plus flashcards, learning paths, course parts,
and placement items. Counts from a fresh `pnpm db:migrate && pnpm db:seed`
against throwaway Postgres 17 (2026-11-12).

| | Courses | Units | Lessons | Of which exams | Flashcard decks | Cards |
|---|---:|---:|---:|---:|---:|---:|
| After the learning-improvements follow-up | 35 | 450 | 1865 | 405 | 9 | 179 |
| After deep English & Chess | **35** | **498** | **2153** | **453** | **15** | **272** |
| **Delta** | **0** | **+48** | **+288** | **+48** | **+6** | **+93** |

| Course | Units before | Units after | Lessons before | Lessons after | Exams before | Exams after |
|--------|-------------:|------------:|---------------:|--------------:|-------------:|------------:|
| `english` | 18 | 45 | 86 | **248** | 3 | **30** |
| `chess` | 13 | 34 | 62 | **188** | 3 | **24** |

English deep curriculum (27 units, 162 lessons) lives in
`packages/content/src/expansion/english-deep.ts` (`expandEnglishDeep`):
tenses and aspect, voice/gerunds/comparison/modals, sentence craft,
pronunciation (IPA), vocabulary (collocations, false friends, phrasals,
idioms, themes), and skills (reading, writing, speaking, business/IT,
IELTS/FCE-style exam prep). Written for Ukrainian speakers.

Chess deep curriculum (21 units, 126 lessons) lives in
`packages/content/src/expansion/chess-deep.ts` (`expandChessDeep`):
notation and calculation, hidden tactics and classic mates, openings as
ideas (not move trees), middlegame strategy, full Lucena/Philidor/Vancura
endgames, famous games, and tournament practice. Every `chess_lesson` and
`chess_puzzle` FEN in the course is checked by `chess-fen.test.ts` and
`scripts/gen-expansion/deep/validate_fens.mjs` (263 deep positions legal;
47 ended in mate).

Presentation groups: `COURSE_PARTS` in `packages/shared/src/courses.ts`
(English 9 parts, Chess 8 parts), listing every unit in existing course
order so in-progress learners are not reordered. Dedicated paths
`english-fluency` and `chess-mastery` on `/paths`. Six new flashcard decks
(93 cards) and English placement items `p11`–`p14` (B2–C1) without changing
`p1`–`p10`.
