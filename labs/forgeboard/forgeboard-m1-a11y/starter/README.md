# ForgeBoard M1: Accessible Interface & Responsive Layout

## Goal
Build the semantic HTML and token-driven responsive CSS shell for **ForgeBoard**.

## Tasks
1. Complete `src/index.html` with proper landmarks (`header`, `nav`, `main`, `footer`), form `<label for>` + `aria-describedby` / `aria-invalid`, a `role="status" aria-live="polite"` region, and a native `<dialog>` details modal.
2. Complete `src/styles.css` with `@layer`, design tokens, logical properties (`padding-inline`, `margin-block`), `:focus-visible`, `@container`, `@media (prefers-reduced-motion: reduce)`, and narrow-viewport wrapping (`min-width: 0`, `overflow-wrap: anywhere`).

## Run (Windows PowerShell)
```powershell
pnpm install --frozen-lockfile
pnpm test
```
