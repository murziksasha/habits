# Practical Software Testing

Slug: `software_testing`
Group: deep
Hub: `/software-testing`
Freemium: first 5 non-exam lesson(s) open without Pro.
Prerequisites: `js_fundamentals`, `react_fundamentals`, `express_fundamentals`
Recommended next: `web_security`, `ai_development`, `devops`

## What this course is

Testable requirements, high-signal unit tests, boundary fixtures, React component tests, API+DB integration, E2E, and ForgeBoard fault-injection lab.

## Local ForgeBoard Labs

- **Milestone 7 (`forgeboard-m7-testing` v1.0.0)** on lesson `st-forgeboard-suite-lab` — `/labs/forgeboard-m7-testing-v1.0.0.zip` (`assessmentMode: "local_practice"`, runtime: Node >= 20, pnpm >= 9, Vitest / Playwright)

## Program

### `st_testable_requirements` — Testable Requirements & Verification Pyramid

- `st-req-behaviors` — Turning Specs into Testable Assertions [free] (2 exercises)
- `st-req-levels` — Choosing the Right Test Level [free] (2 exercises)
- `st-req-exam` — Checkpoint: Testable Requirements [exam] (2 exercises)

### `st_unit_testing` — Unit Tests & Failure-Catching Assertions

- `st-ut-tautology` — Spotting Tautological & Over-Mocked Tests [free] (2 exercises)
- `st-ut-pure-refactor` — Extracting Pure Logic for Deterministic Tests [free] (2 exercises)
- `st-ut-exam` — Checkpoint: Unit Testing [exam] (2 exercises)

### `st_boundaries_fixtures` — Boundary Cases & Realistic Test Fixtures

- `st-bf-boundaries` — Equivalence Partitions & Off-by-One Boundaries [free] (2 exercises)
- `st-bf-fixtures` — Fixture Builders & Test Isolation (2 exercises)
- `st-bf-exam` — Checkpoint: Boundaries & Fixtures [exam] (2 exercises)

### `st_react_component_tests` — React Component Tests & A11y Queries

- `st-rct-user-event` — User-Centric Queries & Realistic Interactions (2 exercises)
- `st-rct-states` — Testing Loading, Empty, Error & Retry States (1 exercises)
- `st-rct-exam` — Checkpoint: React Component Tests [exam] (2 exercises)

### `st_api_db_integration` — API & Database Integration Testing

- `st-int-db-real` — Real HTTP Routes Against PostgreSQL (2 exercises)
- `st-int-isolation` — State Isolation Between Integration Cases (1 exercises)
- `st-int-exam` — Checkpoint: API + DB Integration [exam] (2 exercises)

### `st_e2e_ci_capstone` — Browser E2E, CI Pipelines & ForgeBoard Suite

- `st-e2e-locators-flaky` — Stable Playwright Locators & Eliminating Flakes (2 exercises)
- `st-forgeboard-suite-lab` — Lab: ForgeBoard Test Suite vs Injected Bugs (M7) (2 exercises)
- `st-e2e-exam` — Checkpoint: E2E & CI Quality Gates [exam] (2 exercises)

## Depth now

- Units: 9
- Lessons: 30
- Exams: 9
- Free non-exam lessons: 5
- Exercise types in seed: code_fill, code_order, code_output, code_project, code_read, match, mcq

## Expansion (Nov 2026)

Additional bilingual (uk+en) lessons shipped in `packages/content/src/expansion/`.

New units:

- `st_mutation_testing` — Mutation testing: whether the tests actually catch faults (4 lessons including exam)
- `st_property_flaky` — Properties, randomness, and flaky tests (4 lessons including exam)
- `st_perf_impact` — Load, change impact, and visual regressions (4 lessons including exam)
