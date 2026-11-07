# QA Theory

Slug: `qa_theory`
Group: deep
Hub: `/qa-theory`
Freemium: the first 5 non-exam lessons in path order.

## What this course is

Deep testing theory: principles, levels, types, black/white-box, STLC, defects, automation, metrics.

## Program

### `foundations` — Quality foundations

- `qt-what-quality` — What is software quality. Software quality is primarily: (3 exercises)
- `qt-vv` — Verification vs Validation. Verification roughly asks: (3 exercises)
- `qt-cost-bug` — Cost of a bug over time. Fix cost usually grows: (3 exercises)
- `qt-f-exam` — Exam: foundations. Exam. Quality relates to: (5 exercises)

### `principles` — Testing principles

- `qt-p-exhaustive` — Exhaustive testing is impossible. Why not test all combinations? (3 exercises)
- `qt-p-early-cluster` — Early & pesticide & clusters. Early testing: (3 exercises)
- `qt-p-context` — Context & absence of errors. Testing is context dependent: (3 exercises)
- `qt-p-exam` — Exam: principles. Exam. Exhaustive testing: (5 exercises)

### `levels` — Test levels

- `qt-l-unit` — Unit testing. A unit test checks: (3 exercises)
- `qt-l-integration` — Integration. Integration testing: (3 exercises)
- `qt-l-system-acc` — System & acceptance. System testing: (3 exercises)
- `qt-l-pyramid` — Test pyramid. Pyramid base: (3 exercises)
- `qt-l-exam` — Exam: levels. Exam. Unit: (5 exercises)

### `types-func` — Functional types

- `qt-tf-smoke-sanity` — Smoke & sanity. Smoke test: (3 exercises)
- `qt-tf-regression` — Regression & retest. Regression: (3 exercises)
- `qt-tf-exploratory` — Exploratory & UAT. Exploratory testing: (3 exercises)
- `qt-tf-exam` — Exam: functional types. Exam. Smoke: (5 exercises)

### `types-nonfunc` — Non-functional

- `qt-tn-perf` — Performance. Performance testing includes: (3 exercises)
- `qt-tn-security` — Security & usability. Security testing looks for: (3 exercises)
- `qt-tn-compat-rel` — Compatibility & reliability. Compatibility: (3 exercises)
- `qt-tn-exam` — Exam: non-functional. Exam. Load testing: (5 exercises)

### `black-box` — Black-box techniques

- `qt-bb-ep` — Equivalence partitioning. EP (equivalence partitioning): (3 exercises)
- `qt-bb-bva` — Boundary value analysis. BVA focuses on: (3 exercises)
- `qt-bb-decision-state` — Decision tables & states. Decision tables help when: (3 exercises)
- `qt-bb-usecase` — Use case testing. Use-case based tests: (3 exercises)
- `qt-bb-exam` — Exam: black-box. Exam. EP: (5 exercises)

### `white-box` — White-box

- `qt-wb-coverage` — Coverage basics. Statement coverage: (3 exercises)
- `qt-wb-limits` — Coverage limits. 100% coverage means: (3 exercises)
- `qt-wb-exam` — Exam: white-box. Exam. Statement coverage: (4 exercises)

### `stlc-process` — STLC / process

- `qt-st-phases` — STLC phases. Typical STLC phases include: (3 exercises)
- `qt-st-entry-exit` — Entry / exit criteria. Entry criteria example: (3 exercises)
- `qt-st-shiftleft` — Shift-left in process. Shift-left in process: (1 exercises)
- `qt-st-exam` — Exam: STLC. Exam. STLC is: (5 exercises)

### `artifacts` — Artifacts

- `qt-ar-plan` — Test plan & strategy. A test plan describes: (3 exercises)
- `qt-ar-cases` — Test cases & RTM. A good test case has: (3 exercises)
- `qt-ar-checklist` — Checklists. Checklists help for: (1 exercises)
- `qt-ar-exam` — Exam: artifacts. Exam. Plan includes: (4 exercises)

### `defects` — Defects

- `qt-df-sev-pri` — Severity vs priority. Severity is: (3 exercises)
- `qt-df-lifecycle` — Defect lifecycle. Typical statuses: (3 exercises)
- `qt-df-report-practice` — Bug report practice. Minimum for a clear bug title: (4 exercises)
- `qt-df-report` — Good bug report. A good bug report contains: (3 exercises)
- `qt-df-exam` — Exam: defects. Exam. Severity: (5 exercises)

### `advanced-design` — Advanced design

- `qt-ad-pairwise` — Pairwise intro. Pairwise / combinatorial lite: (3 exercises)
- `qt-ad-risk` — Risk-based testing. Risk-based testing: (3 exercises)
- `qt-ad-exam` — Exam: advanced. Exam. Pairwise reduces: (4 exercises)

### `automation-context` — Automation context

- `qt-au-what` — What to automate. Good automation candidates: (3 exercises)
- `qt-au-roi` — ROI & pyramid. Automation ROI considers: (3 exercises)
- `qt-au-exam` — Exam: automation. Exam. Automate: (4 exercises)

### `metrics-risk` — Metrics

- `qt-m-passrate` — Pass rate traps. High pass rate can mislead if: (3 exercises)
- `qt-m-escaped` — Escaped defects. Escaped defect: (3 exercises)
- `qt-m-exam` — Exam: metrics. Exam. Pass rate alone: (4 exercises)

### `applied-qa-scenarios` — Applied QA Scenarios & Artifacts

- `qa-scen-bug-report-audit` — Bug report audit & quality triage. Review artifact: Bug has Severity: Blocker, but only on unsupported IE11. Correct triage decision: (3 exercises)
- `qa-scen-boundary-matrix-design` — Boundary matrix & decision table design. Discount test design: >=1000 UAH gives 10%, >=5000 UAH gives 20%. Boundary points: (3 exercises)
- `qa-scen-api-test-matrix` — REST API status & contract test matrix. Match HTTP status codes with expected API test scenarios (3 exercises)
- `qa-scen-exam` — Exam: applied QA scenario analysis. Exam. Main goal of verifying reproducible steps before submitting bug report? (4 exercises)

### `capstone` — Capstone case

- `qt-cap-feature` — Case: new checkout. For checkout high-risk zones: (4 exercises)
- `qt-cap-exam` — Final QA exam. Exam. Principles include: (8 exercises)

## Depth now

- Units: 15
- Lessons: 57
- Exams: 15
- Free non-exam lessons after the freemium pass: 6
- Exercise types in the seed: match, mcq

Depth here is the seeded player, not a lab you run on a VM. A lesson covers the point in its bullet. It does not add topics that are absent from that bullet.

## Not in this course

A test-automation framework. The course is test theory: levels, types, design techniques, defects, and artifacts.
