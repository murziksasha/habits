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

Приложения и тесты импортируют собранные `dist/` workspace-пакетов, поэтому после pull или правок в `shared` / `chess-core` / `content` их надо пересобрать. Порядок как в CI (`.github/workflows/ci.yml`):

```bash
pnpm --filter @eduforge/chess-core build && pnpm --filter @eduforge/shared build
pnpm --filter @eduforge/content build
pnpm --filter @eduforge/chess-core build
pnpm --filter @eduforge/judge build
pnpm --filter @eduforge/circuit-engine build
pnpm --filter @eduforge/db build
```

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

## Известные падения (не регрессии)

`apps/api/src/learning-progress.integration.ts` — 2 теста падают и на чистом `seedFeat` (проверено на свежей БД, без Redis, 25.11.2026):

- «records attempt metadata, repeats, failures, exam thresholds, and idempotent replay without double counting» — таймаут 60 с;
- «supports historical reconstruction, unknown missing-lesson outcomes, UTC boundaries, and weekly recap» — `expected 7 to be 8` (строка ~309).

Остальные 26 интеграционных тестов проходят. Новые падения сравнивать с этим списком.

## Правила

- Не утверждать, что тесты/сборка прошли, без вывода команды.
- Максимум 2 автоматические попытки исправить одно падение, дальше — откат и отчёт (`AGENTS.md`).
- Windows/PowerShell: команды соединяются `;`, не `&&`.
