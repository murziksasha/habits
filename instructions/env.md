# Переменные окружения

Шаблон — `.env.example` в корне. Реальный `.env` не коммитится; секреты здесь не приводятся. Правка секретов в общем/продовом `.env` — только с согласия владельца.

## Как загружается `.env`

- Единственный механизм — `loadRootEnv()` (`packages/db/src/load-env.ts`): читает **корневой** `.env` и заполняет только ещё не заданные ключи (переменная шелла важнее). Это не dotenv: `KEY=value`, `#`-комментарии, кавычки снимаются, без подстановок `${VAR}`.
- Вызывается в: `apps/api/src/env.ts` (при старте API), `apps/realtime/src/load-env.ts`, `pnpm migrate`, `pnpm db:migrate`, `pnpm db:seed`, `pnpm content:sync`, `createDb()` из `@eduforge/db`.
- `apps/realtime`: первым импортом в `src/index.ts` идёт `./load-env.js` (тот же `loadRootEnv()`), поэтому `REALTIME_PORT`, `WEB_ORIGIN`, `DATABASE_URL`, `REDIS_URL` берутся из корневого `.env`. Этот импорт должен оставаться первым (ESM выполняет импорты по порядку) — это проверяет `src/load-env.test.ts`.
- `apps/web` (Next.js) корневой `.env` не читает; Next загружает только `.env*` из `apps/web/` (сейчас их нет). `NEXT_PUBLIC_*` вшиваются при сборке; по умолчанию `NEXT_PUBLIC_API_URL` = `http://localhost:4000`.
- Скрипты `scripts/chess-qa/*`, `scripts/chess-import/*` `.env` не читают — переменные задаются в шелле.
- `docker-compose.yml` передаёт контейнерам свой набор (`DATABASE_URL`, `REDIS_URL`, `AUTH_SECRET`, `CRON_SECRET`, …), подставляя значения из `.env` через `${…}`. `STOCKFISH_PATH` для `api` задан фиксированно (`/usr/local/bin/stockfish`, движок встроен в образ) и из `.env` хоста не берётся.

## Список (из `.env.example`)

| Переменная | Назначение |
| --- | --- |
| `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `POSTGRES_PORT` | Postgres для docker compose |
| `DATABASE_URL` | Строка подключения к Postgres (API, миграции, сид) |
| `BACKUP_DIR` | Папка undo-файлов для Admin → Backup (по умолчанию `apps/api/data/backups`) |
| `REDIS_URL`, `REDIS_PORT` | Redis (rate limit, идемпотентность, метрики API; очередь матчмейкинга realtime); если недоступен, API не ждёт его: rate limit и идемпотентность работают в памяти, в лог раз в 30 с пишется `[redis]` (см. `dev-and-testing.md`) |
| `TRUSTED_PROXY_HOPS` | Сколько своих обратных прокси стоит перед API (для IP в rate limit). `0` (по умолчанию) — брать адрес сокета и **игнорировать** `X-Forwarded-For`: клиент может подставить туда что угодно. `1` — один прокси вроде `docker/nginx.conf`, который перезаписывает заголовок (`X-Forwarded-For $remote_addr`); API берёт самое правое значение левее доверенных прокси. В `docker-compose.yml` по умолчанию `0`, потому что порт 4000 опубликован напрямую; ставить `1` только если API доступен исключительно через nginx. Интеграционные тесты используют `1` (`vitest.integration.config.ts`) |
| `AUTH_SECRET` | Секрет сессий; на проде ≥32 символа, иначе API не стартует |
| `NEXTAUTH_URL`, `AUTH_URL`, `WEB_ORIGIN` | Origin веба (CORS + CSRF) |
| `FEATURE_STRICT_CSRF`, `FEATURE_EMAIL_VERIFY`, `FEATURE_REQUIRE_EMAIL_VERIFY`, `ISSUE_BEARER_TOKENS` | Флаги безопасности/авторизации |
| `JUDGE_MODE`, `JUDGE_ALLOW_LOCAL`, `JUDGE_DOCKER_FALLBACK_LOCAL`, `JUDGE_ALLOW_BASH_LOCAL` | Судья кода (на проде выключен, кроме `JUDGE_MODE=docker`) |
| `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_REALTIME_URL`, `INTERNAL_API_URL` | Адреса API/realtime для веба (браузер / SSR в Docker) |
| `API_PORT`, `REALTIME_PORT`, `WEB_PORT` | Порты (4000 / 4001 / 3000) |
| `REALTIME_SWEEP_MS` | Период серверного sweep онлайн-партий в мс (по умолчанию 15000, минимум 5000), см. [realtime.md](realtime.md) |
| `NEXT_PUBLIC_CPP_RUNNER` | C++ playground: `auto` / `jscpp` / `wasm` / `mock` |
| `NEXT_PUBLIC_WEBCONTAINERS` | Включает Node Studio (`/studio/node`) |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` | Почта; без неё письма пишутся в консоль |
| `XAI_API_KEY`, `XAI_MODEL` | AI-тьютор (SpaceXAI); без ключа — локальный тьютор на правилах |
| `OPENROUTER_API_KEY`, `OPENROUTER_MODEL`, `OPENROUTER_SITE_URL`, `OPENROUTER_APP_NAME` | OpenRouter (опционально) |
| `GEMINI_API_KEY`, `GEMINI_MODEL` | Gemini API (опционально) |
| `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_SUBJECT` | Web Push; без ключей — временные ключи |
| `CRON_SECRET` | Обязателен на проде для cron-эндпоинтов (в т.ч. `POST /chess/puzzles/cron/rate`, `POST /chess/cron/analyze`) |
| `ALLOW_PROD_SEED` | Разрешает `db:seed` при `NODE_ENV=production` |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URI`, `API_PUBLIC_URL`, `ALLOW_DEV_OAUTH` | Google OAuth |
| `NODE_ENV`, `LOCALE` | Режим (`development` в шаблоне) и локаль по умолчанию (`uk`) |
| `STOCKFISH_PATH` | Путь к UCI-движку для анализа партий (в Docker — `/usr/local/bin/stockfish`), см. [stockfish.md](stockfish.md) |

Вне `.env.example`, но используются: `MFA_ENCRYPTION_KEY` (ключ для TOTP, иначе берётся `AUTH_SECRET`), `SKIP_INTEGRATION`, `SKIP_E2E`, `PLAYWRIGHT_BASE_URL`, `PLAYWRIGHT_WEB_SERVER`, `NEXT_OUTPUT=standalone`.
