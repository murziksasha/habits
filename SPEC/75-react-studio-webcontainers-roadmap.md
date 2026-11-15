# 75 — React Studio + multi-stack playground roadmap

## What works in-app today

| Mode | Runner | Notes |
|------|--------|--------|
| JS / TS | iframe sandbox | stdout challenges |
| HTML / CSS | iframe preview | DOM asserts |
| **React** | Sucrase TSX → iframe + React 19 (esm.sh) | multi-file `App.tsx` + `styles.css` |
| C++ | JSCPP / mock | SPEC 74 |
| SQL / Bash | demos | limited |

Route: `/playground` → lang chip **React**.

## React Studio (Phase R — shipped)

- Transform: Sucrase (`typescript` + classic `jsx`)
- Runtime: import map → `esm.sh/react@19`
- Challenges: `ch-react-*` with `expectedSourceContains` + `domAsserts` (settle delay for mount)
- External labs section: Next / Playwright / Node via StackBlitz (`EXTERNAL_LABS`)

## Not in-app (honest limits)

| Stack | Why | Interim |
|--------|-----|---------|
| **Next.js** full | Needs Node, FS, bundler, SSR | StackBlitz external lab |
| **Playwright** | Needs Node + Chromium | External lab / theory in QA track |
| **npm install** arbitrary | No package manager in sandbox | WebContainers later |

## Phase W — WebContainers (shipped v1)

- Feature flag: `NEXT_PUBLIC_WEBCONTAINERS=1`
- Route: **`/studio/node`** — see **SPEC 76**
- Templates: `node-hello`, `express-hello`, `next-hello` (heavy)
- Playwright auto-grade still out of scope  

## Related

- SPEC 24 / 25 playground  
- SPEC 74 C++ client runner  
- SPEC 76 WebContainers Node Studio  
- SPEC 01 non-goals (server Docker judge)  
