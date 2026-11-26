# Инструкции по проекту EduForge

Короткие практические правила для разработки. Источник истины по доменам — `SPEC/` (индекс `SPEC/README.md`) и `AGENTS.md`; здесь собраны самые важные вещи «в одном месте». Если что-то расходится с кодом — прав код, обнови этот файл.

## Монорепозиторий

pnpm workspaces + Turborepo (`packageManager: pnpm@11.22.0`).

| Путь | Что это |
| --- | --- |
| `apps/web` | Next.js 15 (App Router), порт 3000 |
| `apps/api` | Hono REST API, порт 4000 (`/health`, `/docs`) |
| `apps/realtime` | Socket.IO (онлайн-шахматы), порт 4001 |
| `packages/shared` | Общая доменная логика: грейдинг, XP, Elo, Glicko-2, UI-строки (`getUI`) |
| `packages/chess-core` | Шахматная логика: бот, дебюты, эндшпили, хеши задач |
| `packages/content` | Встроенный контент курсов (уроки, задачи, дебюты) |
| `packages/db` | Drizzle-схема, миграции, `seed`, `content:sync` |
| `scripts/chess-qa` | Офлайн-проверка шахматного контента через Stockfish |
| `scripts/chess-import` | Импорт задач Lichess (CC0) |

## Документы

- [migrations.md](migrations.md) — миграции БД: одна команда `pnpm migrate` (проверка → миграции → синхронизация контента), `pnpm migrate new <name>`, порядок действий после pull.
- [stockfish.md](stockfish.md) — `STOCKFISH_PATH`, анализ партий, офлайн-QA, настройка на Windows/Linux.
- [chess-content.md](chess-content.md) — контракт шахматного контента: типы задач, стабильные ID, QA-гейты.
- [dev-and-testing.md](dev-and-testing.md) — установка, порядок сборки, запуск, тесты, известные падения.
- [env.md](env.md) — переменные окружения и как они загружаются.
- [ci.md](ci.md) — GitHub Actions: что и когда запускается, turbo-кеш, e2e на PR.
- [lint.md](lint.md) — ESLint на весь репозиторий, baseline `eslint-suppressions.json`.
- [error-tracking.md](error-tracking.md) — Sentry по желанию (`SENTRY_DSN`), request id во всех строках лога API.
- [web.md](web.md) — структура упражнений (по модулю на тип, `next/dynamic`), словари UI по локалям, размер бандла.
- [coverage.md](coverage.md) — покрытие тестами: команды, базовые пороги по пакетам, артефакт CI.
- [backups.md](backups.md) — плановый `pg_dump` (compose-профиль `backup`), ротация, runbook восстановления.
- [docker.md](docker.md) — образы (пользователь `node`, `pnpm deploy`), пароли Redis/админа, порты только на 127.0.0.1.
- [realtime.md](realtime.md) — онлайн-партии: защита от гонок, `claim_timeout`, серверный sweep, тесты.

## Главные правила (кратко)

- Код, комментарии, SPEC и коды ошибок API — на английском. UI-тексты — украинский + английский через `getUI(locale)` (локаль по умолчанию `uk`). Русского в UI нет.
- Файлы только в UTF-8.
- Продукт бесплатный: никаких оплат, триалов, пейволлов.
- Оценивает сервер (уроки, ходы). Клиент никогда не начисляет XP сам.
- Ошибки API — `{ error: "snake_code" }`.
- Миграции только аддитивные, ID контента не меняются (см. [migrations.md](migrations.md)).
- Перед `git push`, удалением/очисткой Postgres, `docker compose down -v`, `pnpm db:seed` на общей/продовой БД, правкой секретов в `.env` — спросить владельца (`AGENTS.md`).

## Спецификации

Индекс всех `SPEC/*.md` — [SPEC/README.md](../SPEC/README.md): таблица по номерам, планы и раздел «Find by topic» со ссылками на эти инструкции. `pnpm docs:check` (шаг CI «SPEC index check») падает, если новый файл в `SPEC/` не попал в индекс или ссылка в индексе битая.
