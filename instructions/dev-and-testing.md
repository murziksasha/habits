# Разработка и тесты

Подробнее: корневой `README.md`, `SPEC/10-infrastructure.md`, `SPEC/11-testing.md`, `AGENTS.md`.

## Установка

```bash
corepack enable            # pnpm@11.22.0 из packageManager
pnpm install
cp .env.example .env       # затем поправить значения, см. env.md
docker compose up -d postgres redis   # или свой Postgres/Redis
```

## Порядок сборки пакетов

Приложения и тесты импортируют собранные `dist/` workspace-пакетов, поэтому после pull или правок в `shared` / `chess-core` / `content` их надо пересобрать. Одна команда (как в CI):

```bash
pnpm build:packages          # turbo: все packages/* по графу зависимостей, каждый один раз
pnpm exec turbo run build --filter=@eduforge/api...   # api вместе со всеми его зависимостями
```

Turbo сам выводит порядок из `package.json` (chess-core → shared → content / circuit-engine → db; judge независим) и кеширует результат в `.turbo/cache`, так что повторная сборка без изменений занимает доли секунды.

Затем БД одной командой: `pnpm migrate` (проверка журнала → миграции → `content:sync`; на своей новой локальной БД — `pnpm migrate --seed`) — см. [migrations.md](migrations.md).

## Запуск

```bash
pnpm dev     # turbo run dev --parallel
```

- Web: http://localhost:3000
- API: http://localhost:4000/health, OpenAPI: http://localhost:4000/docs
- Realtime: порт 4001 (настройки из корневого `.env`, см. [env.md](env.md))

Отдельно: `pnpm --filter @eduforge/api dev` (`tsx watch src/index.ts`), `pnpm --filter @eduforge/web dev`. Всё в Docker (образ API уже содержит Stockfish 19, см. [stockfish.md](stockfish.md)): `pnpm docker:up` / `pnpm docker:logs` / `pnpm docker:down` (`docker compose down -v` удаляет данные — только с согласия владельца).

## Проверки

| Что | Команда | Примечание |
| --- | --- | --- |
| Юнит-тесты всех пакетов | `pnpm test:unit` | vitest (в `db` — `tsx --test`) |
| Один пакет | `pnpm --filter @eduforge/<pkg> test` | |
| Типы | `pnpm typecheck` | настоящий гейт |
| Линт | `pnpm lint` | во всех пакетах сейчас `echo ok` |
| Контент-гейты | `pnpm --filter @eduforge/content test` | включая шахматные QA-гейты |
| Интеграция API | `pnpm test:integration` | нужен мигрированный и засиженный Postgres; `SKIP_INTEGRATION=1` пропускает. Таймаут теста 60 с |
| E2E | `pnpm test:e2e` | Playwright; web :3000 и api :4000 должны быть запущены (или `PLAYWRIGHT_WEB_SERVER=1`), `PLAYWRIGHT_BASE_URL` меняет адрес, `SKIP_E2E=1` пропускает. В CI e2e идёт только на push в main/master/dev |
| Сборка web | `pnpm --filter @eduforge/web build` | |
| Быстрый гейт | `pnpm ci` (typecheck + unit), `pnpm ci:full` (+ интеграция) | |
| Аудит контента | `pnpm content:audit` | |
| Миграции | `pnpm migrate check` | согласованность `drizzle/*.sql` и журнала, без БД; также в CI и в тестах `@eduforge/db` |

### `next build` и `NODE_ENV`

`next build` должен идти с `NODE_ENV=production`. Если в окружении `NODE_ENV=development` (так в `.env.example` и в некоторых шеллах), голый `npx next build` падает на пререндере `/404` с ошибкой `<Html> should not be imported outside of pages/_document`. Скрипт `pnpm --filter @eduforge/web build` (`apps/web/scripts/production-build.mjs`) сам выставляет `NODE_ENV=production`. Если запускаешь `next build` вручную — `NODE_ENV=production npx next build`.

## Интеграционные тесты и Redis

Интеграционные тесты проходят **и с Redis, и без него** (проверено 26.11.2026: 29/29 в обоих режимах).

- С Redis: `REDIS_URL=redis://127.0.0.1:6379` (или `docker compose up -d redis`).
- Без Redis: не задавать `REDIS_URL` (конфиг по умолчанию указывает на `redis://localhost:6380`, где обычно ничего нет) или задать недоступный адрес, например `redis://127.0.0.1:1`.

Как API ведёт себя без Redis (`apps/api/src/redis.ts`):

- `enableOfflineQueue: false` — команды не копятся в очереди, пока нет соединения, а сразу падают;
- `connectTimeout` 1 с, `commandTimeout` 500 мс, одна повторная попытка на запрос, переподключение в фоне с паузой до 5 с;
- `getRedis()` возвращает клиента **только в статусе `ready`**; иначе rate limit и идемпотентность сразу работают в памяти процесса, без ожидания;
- `getRedisClient()` (сырой клиент) используют только `/ready`, `/metrics` и judge — им нужно знать реальное состояние Redis;
- предупреждение `[redis]` в логе — не чаще раза в 30 с.

Тест `apps/api/src/redis.test.ts` проверяет, что с недоступным Redis 50 вызовов rate limit + идемпотентности укладываются меньше чем в 500 мс. В CI интеграционные тесты запускаются дважды: с Redis и с недоступным `REDIS_URL`.

Тесты сами ставят `TRUSTED_PROXY_HOPS=1` и шлют уникальный `X-Forwarded-For` на каждый запрос (имитация nginx), см. [env.md](env.md).

## Правила

- Не утверждать, что тесты/сборка прошли, без вывода команды.
- Максимум 2 автоматические попытки исправить одно падение, дальше — откат и отчёт (`AGENTS.md`).
- Windows/PowerShell: команды соединяются `;`, не `&&`.
