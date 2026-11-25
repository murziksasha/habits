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
- В `_journal.json` добавить запись с тем же `tag` (имя файла без `.sql`), `idx` = номер, `when` больше предыдущего.
- Если две ветки взяли один номер — перенумеровать свою до мержа, уже применённые миграции не трогать.

### Важно про `db:generate`

`pnpm db:generate` (= `drizzle-kit generate`) существует, но в `drizzle/meta/` нет snapshot-файлов, только `_journal.json`. Без снапшота drizzle-kit не знает текущее состояние и сгенерирует некорректный дифф. Поэтому миграции пишутся **вручную**: SQL-файл + запись в журнале + изменение в Drizzle-схеме. Результат `db:generate` — только как черновик, внимательно проверять.

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
