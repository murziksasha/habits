# HTML Semantics

Slug: `html_semantics`
Group: deep
Hub: `/html-semantics`
Freemium: first 5 non-exam lesson(s) open without Pro.
Prerequisites: `programming`
Recommended next: `css_layout`, `js_fundamentals`

## What this course is

Semantic markup: landmarks, outline, accessible forms & validation, focus management, native <dialog>, live regions, and ForgeBoard M1.

## Local ForgeBoard Labs

- **Milestone 1 (`forgeboard-m1-a11y` v1.0.0)** on lesson `hs-forgeboard-a11y-lab` — `/labs/forgeboard-m1-a11y-v1.0.0.zip` (`assessmentMode: "local_practice"`, runtime: Node >= 20, pnpm >= 9 (або вбудований node --test на Node >= 20))

## Program

### `document` — Document

- `hs-doc-basics` — HTML document shell [free] (3 exercises)
- `hs-doc-head` — Head: meta & title [free] (3 exercises)
- `hs-doc-body` — Body & visible content [free] (2 exercises)
- `hs-doc-semantics-intro` — Why semantics [free] (4 exercises)
- `hs-doc-exam` — Exam: document [exam] (5 exercises)

### `landmarks` — Landmarks

- `hs-lm-main` — main, header, footer [free] (3 exercises)
- `hs-lm-nav-aside` — nav & aside (3 exercises)
- `hs-lm-section` — section vs div (3 exercises)
- `hs-lm-exam` — Exam: landmarks [exam] (5 exercises)

### `heading-outline` — Headings

- `hs-h-hierarchy` — h1–h6 hierarchy (3 exercises)
- `hs-h-skip` — Skip link intro (2 exercises)
- `hs-h-exam` — Exam: headings [exam] (4 exercises)

### `text-media` — Text & media

- `hs-tm-figure` — figure / figcaption (2 exercises)
- `hs-tm-alt` — alt & time (3 exercises)
- `hs-tm-exam` — Exam: media [exam] (4 exercises)

### `lists-tables` — Lists & tables

- `hs-lt-lists` — ul, ol, dl (2 exercises)
- `hs-lt-tables` — Tables: th & scope (3 exercises)
- `hs-lt-exam` — Exam: lists/tables [exam] (4 exercises)

### `forms` — Accessible forms

- `hs-f-label` — label & for (2 exercises)
- `hs-f-fieldset` — fieldset / legend (2 exercises)
- `hs-f-types` — input types (2 exercises)
- `hs-f-exam` — Exam: forms [exam] (5 exercises)

### `interactive` — Interactive

- `hs-i-button-a` — button vs a (2 exercises)
- `hs-i-details` — details / summary (2 exercises)
- `hs-i-exam` — Exam: interactive [exam] (4 exercises)

### `a11y-aria` — A11y / ARIA

- `hs-a-roles` — ARIA roles intro (2 exercises)
- `hs-a-labelledby` — aria-labelledby (2 exercises)
- `hs-a-exam` — Exam: a11y [exam] (4 exercises)

### `applied_accessible_markup` — Applied: Accessible Markup Patterns

- `html-a11y-forms-errors` — Accessible forms: labels & aria-describedby for errors (3 exercises)
- `html-a11y-dialog-modals` — Modal dialog semantics: dialog tag & focus trap (2 exercises)
- `html-a11y-landmark-hierarchy` — Fixing landmarks & heading outlines (2 exercises)
- `html-a11y-cumulative-task` — Applied task: fully accessible action card (2 exercises)
- `html-a11y-exam` — Exam: accessible markup [exam] (4 exercises)

### `accessible_interactions` — Accessible Validation, Focus, Native <dialog> & Live Regions

- `hs-a11y-validation` — Accessible form validation & live status announcements (3 exercises)
- `hs-native-dialog-focus` — Native <dialog> & focus management (3 exercises)
- `hs-ai-exam` — Exam: accessible interactions [exam] (4 exercises)

### `capstone` — Capstone

- `hs-capstone-landing` — Semantic landing (1 exercises)
- `hs-forgeboard-a11y-lab` — ForgeBoard M1: Accessible Task & Settings Interface (2 exercises)
- `hs-cap-exam` — Final exam [exam] (6 exercises)

## Depth now

- Units: 14
- Lessons: 51
- Exams: 14
- Free non-exam lessons: 5
- Exercise types in seed: code_fill, code_order, code_output, code_project, code_read, match, mcq

## References

- MDN HTML Accessibility & Forms: https://developer.mozilla.org/

## Expansion (Nov 2026)

Additional bilingual (uk+en) lessons shipped in `packages/content/src/expansion/`.

New units:

- `responsive_media` — Responsive images and media (4 lessons including exam)
- `web_components_html` — Web Components in HTML: template, slots, shadow (4 lessons including exam)
- `metadata_social` — Metadata, canonical URLs, and social previews (4 lessons including exam)
