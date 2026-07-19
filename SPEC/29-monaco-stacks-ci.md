# 29 — Monaco editor, stack hubs, CI suite

## Monaco

- Package: `@monaco-editor/react` + `monaco-editor`
- Component: `apps/web/src/components/monaco-editor.tsx` (dynamic, `ssr: false`)
- Used on `/playground` for all language panes (incl. CSS dual-pane)

## Separate stack routes (virtual slugs)

- Not separate DB courses — still one `programming` course
- Meta: `PROGRAMMING_STACK_META` + `isProgrammingStack()`
- Routes: `/programming/[stack]` for each unit (`html`, `css`, `js`, …)
- Hub icons/titles link into stack pages

## CI green suite

- Root: `pnpm ci` → typecheck + unit tests  
- Root: `pnpm ci:full` → + integration  
- API `test` excludes `integration.test.ts` (use `test:integration` separately)
- GitHub Actions unit job: `pnpm test:unit` + `pnpm typecheck`

## Note on “separate stack slugs”

Full DB course-per-stack (enum + progress split) remains optional future work; virtual hubs give per-stack UX without migration pain.
