# Web Accessibility (WCAG)

Slug: `web_accessibility`
Group: deep
Hub: `/web-accessibility`
Freemium: first 5 non-exam lesson(s) open without Pro.
Prerequisites: `html_semantics`, `css_layout`
Recommended next: `react_fundamentals`, `web_security`

## What this course is

POUR principles, keyboard access, ARIA, contrast, and accessibility testing against WCAG 2.2.

## Program

### `pour_wcag` — POUR and WCAG levels

- `a11y-pour-four` — Four principles: perceivable, operable, understandable, robust
- `a11y-wcag-levels` — A, AA, AAA: a typical product target is conformance at level AA
- `a11y-perceivable-alt` — Alternative text: the meaning of the image, empty alt for decorative ones
- `pour_wcag-exam` — Exam: POUR and alternatives [exam]

### `keyboard_focus` — Keyboard and visible focus

- `a11y-tab-order` — Tab order matches the visual order; avoid a tabindex greater than 0
- `a11y-focus-visible` — Visible focus is not removed without a replacement; :focus-visible for mouse vs keyboard
- `a11y-skip-trap` — A skip link, a focus trap in a modal, and restoring focus
- `keyboard_focus-exam` — Exam: keyboard and focus [exam]

### `names_labels` — Names, labels, and icon buttons

- `a11y-label-for` — A field without a programmatic label is a barrier; a placeholder does not replace a label
- `a11y-name-compute` — The accessible name is computed by rules: label, content, aria-label, labelledby
- `a11y-title-not-enough` — title and an icon alone do not replace a visible name; a touch device will not show title
- `names_labels-exam` — Exam: names and labels [exam]

### `aria_patterns` — ARIA: when it is needed and typical patterns

- `a11y-aria-when` — The first rule of ARIA: do not set a role when native HTML exists
- `a11y-live-announce` — aria-live announces a change without focus: polite for most cases, assertive rarely
- `a11y-dialog-modal` — A dialog: role, name, modality, focus, and close
- `aria_patterns-exam` — Exam: ARIA patterns [exam]

### `contrast_motion` — Contrast, motion, and scaling

- `a11y-contrast-ratio` — AA contrast: 4.5:1 for normal text, 3:1 for large text and UI
- `a11y-prefers-reduced` — Motion is not the only source of meaning; prefers-reduced-motion turns extras off
- `a11y-reflow-zoom` — 200% zoom and 320 CSS pixels of width without horizontal scrolling
- `contrast_motion-exam` — Exam: contrast and motion [exam]

### `testing_a11y` — Accessibility testing

- `a11y-axe-ci` — Automated tools catch a portion of issues, not everything
- `a11y-keyboard-pass` — A keyboard pass: the whole scenario without a mouse, visible focus, no traps
- `a11y-sr-manual` — A screen reader and people: a short manual pass plus real users
- `testing_a11y-exam` — Exam: a11y testing [exam]

