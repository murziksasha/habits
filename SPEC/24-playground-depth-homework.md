# 24 — Playground, depth lessons, programming homework

## Mini code playground

- Route: `/playground` (nav + dashboard + programming hub)
- Languages: HTML, CSS, JS, TypeScript (simple strip), **React (Sucrase TSX preview)**, C++, SQL (in-memory demo), Bash (sim), JSON  
- External labs: Next / Playwright / Node via StackBlitz (`EXTERNAL_LABS`) — full Node in-app = WebContainers roadmap (SPEC 75)
- Client runners: `apps/web/src/lib/playground-run.ts`
- Shared examples: `PLAYGROUND_EXAMPLES` / `PLAYGROUND_LANGS`
- API: `GET /playground/meta`, `POST /playground/log` (activity only; **no server eval**)
- HTML/CSS: sandboxed `iframe` preview

## Depth lessons

Added to `programming.ts`:

| Unit | Lesson slug |
|------|-------------|
| html | `html-depth-meta` |
| css | `css-depth-responsive` |
| js | `js-depth-async` |
| sql | `sql-depth-group` |

## Teacher programming homework

- `GET /homework/catalog?course=programming` — units + lessons
- `POST /homework/bulk` — assign up to 20 lessons (notifications fan-out)
- Class UI: **Programming pack** — assign whole unit or free pack (≤12)

## Tests

- `packages/shared/src/playground.test.ts` — strip TS + catalogs
- Content integrity still covers new lessons after seed
