# 10 — Infrastructure

## Local development

```bash
pnpm install
docker compose up postgres redis -d
cp .env.example .env   # Windows: copy .env.example .env
pnpm --filter @eduforge/shared build
pnpm --filter @eduforge/content build
pnpm --filter @eduforge/chess-core build
pnpm --filter @eduforge/db build
pnpm db:migrate
pnpm db:seed
pnpm dev
```

Ports:

| Service | Port |
|---------|------|
| Web | 3000 |
| API | 4000 |
| Realtime | 4001 |
| Postgres | 5432 |
| Redis | 6379 |

## pnpm notes

- Package manager pinned in root `packageManager`  
- Native deps: allow builds for `esbuild` / `sharp` in `pnpm-workspace.yaml` (`allowBuilds`)  

## Docker Compose

Services: `postgres`, `redis`, `api`, `realtime`, `web`, optional `migrate` profile.

```bash
docker compose up --build -d
docker compose --profile tools run --rm migrate
```

Dockerfiles under `docker/`. Web production image can use Next `standalone` when `NEXT_OUTPUT=standalone`.

## Environment variables

See `.env.example`:

- `DATABASE_URL`, `REDIS_URL`  
- `AUTH_SECRET`, `WEB_ORIGIN`  
- `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_REALTIME_URL`  
- Stripe keys (optional)  
- `ADMIN_EMAIL`, `ADMIN_PASSWORD` for seed  
- `MFA_ENCRYPTION_KEY` — encrypt admin TOTP secrets (optional; falls back to `AUTH_SECRET`)  
- `ADMIN_MFA_ENFORCE` — force admin TOTP (`true`/`false`; default on in production)  
- `SEED_ADMIN_TOTP_SECRET` — base32 secret for dev/e2e admin TOTP seed  

## Quality scripts

```bash
pnpm test          # turbo test across packages
pnpm typecheck
pnpm build
pnpm db:migrate
pnpm db:seed
```

## Production checklist

- [ ] Strong `AUTH_SECRET`  
- [ ] Change admin password / disable default admin  
- [ ] Enroll admin TOTP (`ADMIN_MFA_ENFORCE` / production)  
- [ ] Set `MFA_ENCRYPTION_KEY`  
- [ ] TLS reverse proxy (nginx sample in `docker/nginx.conf`)  
- [ ] Configure Stripe webhooks  
- [ ] Backups for Postgres volume  
- [ ] Restrict CORS `WEB_ORIGIN`  
