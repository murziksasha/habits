# Docker и docker compose

> Docker на машине разработки агента не установлен: образы не собирались. Стадии `deps → build → deploy` для API и realtime проверены той же последовательностью команд без Docker (`pnpm install` в урезанной копии репозитория → `turbo run build` → `pnpm deploy --legacy --prod`), `docker compose config` — валиден. Первую сборку `docker compose build` стоит проверить у себя.

## Образы

| Образ | Пользователь | Что внутри |
| --- | --- | --- |
| `docker/Dockerfile.api` (runner) | `node` | только `pnpm deploy --prod` API: `dist/`, production `node_modules`, собранные workspace-пакеты (`@eduforge/db` вместе с `drizzle/` — нужен для резервных копий). Stockfish 19 из отдельной стадии. Запуск: `node dist/index.js` |
| `docker/Dockerfile.api` (target `tools`) | `node` | полная сборка с dev-зависимостями (tsx, drizzle-kit) — для `migrate`/`seed` |
| `docker/Dockerfile.realtime` | `node` | `pnpm deploy --prod` realtime, `node dist/index.js` |
| `docker/Dockerfile.web` | `node` | Next.js standalone |

- Пакеты в образах собираются одним `turbo run build --filter=<app>...` — каждый один раз, в порядке зависимостей.
- `pnpm deploy` в pnpm 10+ требует `--legacy` (в workspace не включён `inject-workspace-packages`).
- Том резервных копий `/data/backups` создаётся в образе API с владельцем `node`, поэтому новый именованный том `backupdata` сразу доступен на запись. **Старый том**, созданный прежним образом (root), надо один раз отдать пользователю `node`: `docker compose run --rm -u root api chown -R node:node /data/backups`.

## Сеть и пароли

- Postgres и Redis публикуются только на `127.0.0.1` (`POSTGRES_PORT`, `REDIS_PORT`): с этой машины `pnpm dev`/`psql` работают, из сети — нет. Контейнеры ходят друг к другу по именам `postgres` / `redis`.
- Redis запускается с `--requirepass "$REDIS_PASSWORD"` (по умолчанию `eduforge-dev-redis` — только для локальной разработки, на сервере задать длинное случайное значение в `.env`). Контейнеры получают `REDIS_URL=redis://:${REDIS_PASSWORD}@redis:6379`. Для `pnpm dev` с compose-Redis в `.env`: `REDIS_URL=redis://:<пароль>@localhost:6379`. Спецсимволы в пароле в URL кодировать (`%40` и т.п.) или использовать только `[A-Za-z0-9-_]`.

## Первый администратор (seed)

- `ADMIN_PASSWORD` **обязателен**, значения по умолчанию нет. Без него seed не создаёт администратора и завершается с ошибкой (если администратор уже есть, пароль не нужен).
- При `NODE_ENV=production` seed отказывает паролям короче 12 символов, опубликованным (старый демо-пароль и т.п.), совпадающим с email и с малым числом разных символов — `packages/db/src/admin-password.ts`.
- Пароль больше не печатается в лог.
- В compose у `migrate` нет значений по умолчанию для `SEED_ADMIN_TOTP_SECRET` / `SEED_ADMIN_BACKUP_CODE` (раньше был общеизвестный тестовый секрет): администратор включает 2FA сам после первого входа. `ALLOW_PROD_SEED` по умолчанию `0`.
- В CI (`ci.yml`, `e2e.yml`, `visual.yml`) `ADMIN_PASSWORD` задан явно для тестовой БД.

```bash
# .env: ADMIN_PASSWORD=<надёжный пароль>
docker compose --profile tools run --rm migrate
```
