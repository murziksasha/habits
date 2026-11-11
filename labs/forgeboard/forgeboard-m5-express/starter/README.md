# ForgeBoard M5: Validated Express REST API

## Tasks
Implement `createForgeBoardApp()` in `src/app.ts` with:
- Auth check (`x-user-id` header numeric -> 401 `{ error: "unauthorized" }` when absent/invalid)
- Zod body validation (`POST /tasks`, `PATCH /tasks/:id` -> 400 `{ error: "invalid_input" }`)
- Pagination (`GET /tasks?limit=&offset=&status=` with clamped limit <= 50)
- Ownership check (`403 { error: "forbidden" }` vs `404 { error: "not_found" }`)
- Centralized 4-arg JSON error middleware returning `{ error: "internal_error" }` without leaking stacks.

## Run
```powershell
pnpm install --frozen-lockfile
pnpm typecheck
pnpm test
```
