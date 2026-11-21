# Web Accessibility (WCAG)

Slug: `web_accessibility`
Group: deep
Hub: `/web-accessibility`
Access: Free for every account (no Pro, trial, or paywall).
Prerequisites: `html_semantics`, `css_layout`
Recommended next: `frontend_performance`, `react_fundamentals`

## What this course is

POUR principles, keyboard access, ARIA, contrast, and accessibility testing against WCAG 2.2.

## Program

### `pour_wcag` — POUR and WCAG levels

- `a11y-pour-four` — Four principles: perceivable, operable, understandable, robust
- `a11y-wcag-levels` — A, AA, AAA: a typical product target is conformance at level AA
- `a11y-perceivable-alt` — Alternative text: the meaning of the image, empty alt for decorative ones
- `pour_wcag-exam` — Exam: POUR and alternatives [exam]

### `keyboard_focus` — Keyboard and visible focus

- `a11y-tab-order` — Focus order preserves meaning and operability; avoid positive tabindex when possible
- `a11y-focus-visible` — Visible focus is not removed without a replacement; :focus-visible for mouse vs keyboard
- `a11y-skip-trap` — A skip link, a focus trap in a modal, and restoring focus
- `keyboard_focus-exam` — Exam: keyboard and focus [exam]

### `names_labels` — Names, labels, and icon buttons

- `a11y-label-for` — A field without a programmatic label is a barrier; a placeholder does not replace a label
- `a11y-name-compute` — The accessible name is computed by rules: label, content, aria-label, labelledby
- `a11y-title-not-enough` — title and an icon alone do not replace a visible name; a touch device will not show title
- `names_labels-exam` — Exam: names and labels [exam]

### `aria_patterns` — ARIA: when it is needed and typical patterns

- `a11y-aria-when` — The first rule of ARIA: use native HTML when it fits
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

### `a11y_applied_checkout` — Accessible checkout flow

- `a11y-applied-errors` — Repairable form errors and focus (5 exercises)
- `a11y-applied-dialog` — Dialog focus and return (6 exercises)
- `a11y_applied_checkout-exam` — Exam: accessible form [exam] (4 exercises)

References: [W3C form error notification](https://www.w3.org/WAI/tutorials/forms/notifications/) and [modal dialog focus pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/).

Focus-order guidance follows [W3C Understanding Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html): a meaningful sequence need not exactly match the visual layout. Text contrast and complete process conformance follow [WCAG 2.2](https://www.w3.org/TR/WCAG22/); image alternatives follow the [W3C alt decision tree](https://www.w3.org/WAI/tutorials/images/decision-tree/).

Accessible name, description, and visible label guidance follows [W3C Label in Name](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html).

