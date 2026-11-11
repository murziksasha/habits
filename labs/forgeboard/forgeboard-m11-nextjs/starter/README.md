# ForgeBoard M11: Full-Stack Next.js Server/Client Boundaries

## Tasks
1. `src/server/tasks-loader.ts`: Load server rows for a session user only and return sanitized public DTOs (stripping `internalAuditSecret` and `ownerEmail`).
2. `src/server/task-actions.ts`: Verify caller session (`401`), validate payload cleanly (`400`), enforce ownership (`403`), and never expose raw errors.
3. `src/client/task-filter-island.ts`: Keep `'use client'` island strictly consuming serializable DTO props with ZERO imports from `src/server/*` or `process.env.DATABASE_URL`.

## Run
```powershell
pnpm install --frozen-lockfile
pnpm typecheck
pnpm test
```
