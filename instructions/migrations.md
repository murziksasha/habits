# Миграции БД

Postgres + Drizzle ORM. Всё лежит в `packages/db`.

## Где что

- Схема: `packages/db/src/schema.ts` → барелы `packages/db/src/schema/*.ts` (`chess.ts`, `learning.ts`, …; таблицы в `tables.ts`).
- SQL-миграции: `packages/db/drizzle/NNNN_name.sql`.
- Журнал: `packages/db/drizzle/meta/_journal.json` (записи `idx`, `tag`, `when`, `breakpoints`).
- Применение: `packages/db/src/migrate.ts` (drizzle `migrate()` по папке `drizzle/`).

## Нумерация и имена

- Номер — 4 цифры, следующий по порядку: `0042_chess_puzzle_rating.sql`, `0043_chess_games_history.sql`, `0044_chess_opening_lines.sql`. Последняя на сейчас — `0044`.
- Имя — `snake_case`, коротко о сути.
- Каждой миграции соответствует запись в `_journal.json`: `{ "idx": 45, "version": "7", "when": <ms>, "tag": "0045_name", "breakpoints": true }`. `idx` = номер файла, `tag` = имя файла без `.sql`, `when` строго больше, чем у предыдущей записи: мигратор drizzle **молча пропускает** миграцию, чей `when` не новее последней применённой.
- Если две ветки взяли один номер — перенумеровать свою до мержа (файл + `idx`/`tag`, `when` оставить самым большим), уже применённые миграции не трогать.

## Создание и проверка: `pnpm db:new` / `pnpm db:check`

```bash
pnpm db:new chess_puzzle_tags    # → packages/db/drizzle/0045_chess_puzzle_tags.sql + запись в журнале
pnpm db:check                    # согласованность файлов и журнала, без БД
```

- `db:new` (`scripts/db/new-migration.mjs`): нормализует имя (`"Chess tags"` → `chess_tags`), берёт следующий номер, пишет SQL-шаблон (только комментарии — пока его не заполнить, это no-op) и добавляет запись в журнал в формате drizzle-kit (отступ 4 пробела, `when = max(Date.now(), предыдущий + 1000)`, сохраняет CRLF, если журнал в CRLF после checkout на Windows). Перед созданием прогоняет проверку и откажется работать, если журнал уже сломан.
- `db:check` (`scripts/db/check-migrations.mjs`): `idx` по порядку без дыр, номер в `tag` = `idx`, формат `NNNN_snake_case`, `version "7"`, `breakpoints: true`, `when` строго растёт, у каждой записи есть файл, каждый `.sql` есть в журнале, нет BOM/UTF-16. Код выхода 1 при ошибке.
- Оба скрипта — чистый Node без bash, работают на Windows. `--dir <путь>` — указать другую папку drizzle (для тестов).
- Проверка входит в CI (шаг `pnpm db:check`) и в `pnpm --filter @eduforge/db test` (`scripts/db/migrations.test.mjs`).

### Важно про `db:generate`

`pnpm db:generate` (= `drizzle-kit generate`) существует, но в `drizzle/meta/` нет snapshot-файлов, только `_journal.json`. Без снапшота drizzle-kit не знает текущее состояние и сгенерирует некорректный дифф. Поэтому миграции пишутся **вручную** через `pnpm db:new` (см. ниже): SQL + изменение Drizzle-схемы в `src/schema/*.ts`. `db:generate` не использовать.

## Правила

1. **Только аддитивные изменения**: `CREATE TABLE IF NOT EXISTS`, `ADD COLUMN IF NOT EXISTS` с `DEFAULT` (или nullable), `CREATE INDEX IF NOT EXISTS`. Внешние ключи — в `DO $$ BEGIN … EXCEPTION WHEN duplicate_object THEN null; END $$;` (см. `0044`).
2. Не удалять и не переименовывать таблицы/колонки, не менять типы с потерей данных. Нужна замена — новая колонка + перенос данных, старая остаётся.
3. Миграция должна быть идемпотентной (повторный запуск не падает).
4. Между statement'ами — `--> statement-breakpoint`.
5. Уже применённый/запушенный файл миграции не редактировать — только новая миграция.
6. Не делать `ALTER TYPE` для нового курса: слаги курсов — `varchar` + `COURSE_SLUGS` / `isCourseSlug` в `@eduforge/shared`.
7. **ID контента стабильны**: ID упражнений/уроков/юнитов не переименовывать и не удалять — на них ссылаются прогресс, SRS и рейтинги задач. Исправлять контент на месте (тот же ID). См. [chess-content.md](chess-content.md).
8. Схема Drizzle (`src/schema/*.ts`) меняется в том же коммите, что и SQL.

## Команды (из корня)

| Команда | Что делает |
| --- | --- |
| `pnpm db:new <name>` | Создаёт следующую миграцию по шаблону + запись в журнале |
| `pnpm db:check` | Проверяет согласованность SQL-файлов и журнала (без БД) |
| `pnpm db:migrate` | Применяет новые миграции из `packages/db/drizzle` (`tsx src/migrate.ts`). Сам читает корневой `.env` (`DATABASE_URL`). |
| `pnpm content:sync` | Обновляет встроенные курсы/уроки/флешкарты/ачивки и `chess_puzzle_stats` (`src/sync-content.ts`). Не трогает пользователей, не удаляет таблицы, не трогает курсы с `contentSource = 'cms'`, сохраняет ID и прогресс. Рейтинги задач — insert-only (существующие не перезаписываются). Безопасно для прода. |
| `pnpm db:seed` | Полный сид для dev/CI, включая демо-админа. На проде блокируется, если не задан `ALLOW_PROD_SEED=1`. Не запускать на общей/продовой БД без согласия владельца. |
| `pnpm db:studio` | Drizzle Studio. |

## Порядок после pull ветки

```bash
pnpm install
pnpm --filter @eduforge/chess-core build && pnpm --filter @eduforge/shared build
pnpm --filter @eduforge/content build
pnpm --filter @eduforge/chess-core build
pnpm --filter @eduforge/db build
pnpm db:check
pnpm db:migrate
pnpm content:sync      # на существующей БД
# или pnpm db:seed     # только на новой локальной БД
```

На проде: бэкап → `pnpm db:migrate` → `pnpm content:sync`.

## Откат и бэкап

- Down-миграций нет. «Откат» = новая аддитивная миграция или восстановление из бэкапа.
- Перед миграцией на проде — `pg_dump`, например: `pg_dump "$DATABASE_URL" -Fc -f backup_$(date +%F).dump` (восстановление `pg_restore -d "$DATABASE_URL" …`).
- В приложении есть бэкап инстанса (Admin → Backup, `BACKUP_DIR`), см. `SPEC/88-instance-backup.md`. Восстановление (слово `RESTORE`) — только с согласия владельца.

## Проверка на чистой БД (локальный Postgres)

Через Docker (`docker-compose.yml`, сервис `postgres`):

```bash
docker compose up -d postgres redis
```

Или локальный Postgres без Docker (пример, Linux):

```bash
initdb -D /tmp/pg-test -U postgres --auth=trust
pg_ctl -D /tmp/pg-test -o "-p 55432 -k /tmp" -l /tmp/pg-test.log start
createdb -h /tmp -p 55432 -U postgres habits_ci
export DATABASE_URL=postgresql://postgres@localhost:55432/habits_ci
pnpm db:migrate && pnpm db:seed
pnpm test:integration
```

Переменная окружения в шелле имеет приоритет над `.env` (`loadRootEnv` не перезаписывает уже заданные). Новую миграцию обязательно прогнать дважды (идемпотентность) и на БД с данными (через `content:sync`).
