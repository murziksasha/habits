# ForgeBoard M2: JavaScript Behavior, Persistence & Abortable Search

## Tasks
1. In `src/store.js`, implement immutable `addTask`, `toggleTask`, `filterAndSortTasks`, and fault-tolerant `createStorageAdapter(storage, key)`.
2. In `src/search.js`, implement `createSearchController(fetcher)` that cancels stale in-flight searches with `AbortController`, throws on `!res.ok`, and swallows `AbortError` cleanly.

## Run
```powershell
pnpm install --frozen-lockfile
pnpm test
```
