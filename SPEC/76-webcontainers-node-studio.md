# 76 — WebContainers Node Studio

## Route

`/studio/node` — in-browser **Node.js + npm** via [`@webcontainer/api`](https://webcontainers.io/) (StackBlitz).

**Not** a server-side Docker judge (SPEC 01). Student code runs only in the browser.

## Enable

```env
NEXT_PUBLIC_WEBCONTAINERS=1
```

Headers (Next.js) on `/studio/node`:

- `Cross-Origin-Opener-Policy: same-origin`
- `Cross-Origin-Embedder-Policy: require-corp`

`/_next/*` gets `Cross-Origin-Resource-Policy: same-origin` for COEP embedding.

Requires `window.crossOriginIsolated === true` and `SharedArrayBuffer`.

## Templates

| Id | Run | Preview |
|----|-----|---------|
| `node-hello` | `node index.js` | terminal only |
| `express-hello` | `npm start` | iframe on `server-ready` |
| `next-hello` | `npm run dev` | iframe (heavy install) |

## UX

- Multi-file Monaco editor  
- Boot + mount / Install + Run / Stop  
- Terminal stream + HTTP preview URL  
- Flag off → setup instructions  

## License

WebContainers may require a **commercial license** for production SaaS. Documented in UI footer and README.

## Related

- SPEC 75 React Studio + roadmap  
- SPEC 01 non-goals (no multi-lang Docker judge)  
- Playground external labs still list StackBlitz for Playwright  
