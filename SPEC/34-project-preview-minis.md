# 34 — Live project preview + more mini-projects

## Live preview (`code_project`)

`CodeProjectExercise` combines open files into a sandboxed iframe:

| Source | Role |
|--------|------|
| file id `html` / lang html | document body or full HTML |
| file id `css` / lang css | injected `<style>` |
| file id `js` / lang js\|ts | injected `<script>` (try/catch) |

- Toggle **Preview** tab button
- Debounced refresh (~400ms) while typing
- `sandbox="allow-scripts"` only (no same-origin)
- React/JSX projects: **source checks only** (no React runtime in iframe)

Helpers: `apps/web/src/lib/project-preview.ts`

- `pickProjectContents`
- `canPreviewProject`
- `buildProjectPreviewSrcDoc`

## New mini-project lessons

| Slug | Unit | Files |
|------|------|--------|
| `css-mini-hero` | css | html + css flex hero |
| `react-mini-toggle` | react | Toggle.jsx + css (contains checks) |

Existing: `html-mini-card`, `js-mini-counter`.

## Related

- SPEC 33 `code_project` + embed
- SPEC 29 Monaco
