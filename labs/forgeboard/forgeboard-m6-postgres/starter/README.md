# ForgeBoard M6: PostgreSQL Migrations, Parameterized CRUD & Transactions

## Tasks
1. Start local PostgreSQL via `docker compose up -d` (or set `DATABASE_URL`).
2. Complete `migrations/001_init.sql` with `users`, `projects`, `tasks` (`CHECK` on title/status, `REFERENCES`, composite index `(project_id, status)`), and `audit_logs`.
3. Complete `src/repo.ts` with parameterized `$1` / tagged queries and transactional `moveTaskToProject` rolling back on failure.

## Run
```powershell
docker compose up -d
pnpm install --frozen-lockfile
pnpm migrate
pnpm typecheck
pnpm test
```
