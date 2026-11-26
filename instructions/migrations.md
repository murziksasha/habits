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

## Главная команда: `pnpm migrate`

Один скрипт (`scripts/db/migrate.mjs`, чистый Node без bash — работает на Windows) объединяет всё:

| Команда | Что делает |
| --- | --- |
| `pnpm migrate` | `check` → `db:migrate` → `content:sync`. Останавливается на первом упавшем шаге с сообщением «Шаг «…» завершился с ошибкой / Step "…" failed», код выхода 1. Повторный запуск безопасен (идемпотентно). |
| `pnpm migrate --seed` | `check` → `db:migrate` → `db:seed` вместо `content:sync` (сид включает тот же контент + администратора с паролем из обязательного `ADMIN_PASSWORD`). Только для своей локальной/CI-БД. |
| `pnpm migrate new <name>` | Создаёт следующую миграцию `NNNN_<name>.sql` по шаблону + запись в журнале |
| `pnpm migrate check` | Проверяет согласованность SQL-файлов и журнала, без БД |
| `pnpm migrate --help` | Краткая справка |

- Перед запуском шагов читает корневой `.env` тем же загрузчиком, что и API (`packages/db/dist/load-env.js`; если `@eduforge/db` не собран — каждый шаг всё равно читает `.env` сам), и печатает `DATABASE_URL` со скрытым паролем — видно, в какую БД идёт миграция.
- Шаги БД запускаются как `node <tsx cli> src/…ts` в `packages/db` — без шелла и без `pnpm.cmd`.
- **Почему `db:seed` не входит в обычный запуск:** повторно запускать его можно, но он создаёт (или повышает до admin) администратора `ADMIN_EMAIL` (пароль — обязательный `ADMIN_PASSWORD`, вне production ещё и тестовый TOTP-секрет, если `SEED_ADMIN_TOTP_SECRET` не задан). На общей или продовой БД это дыра, поэтому только явно через `--seed`. На проде (`NODE_ENV=production`) сид и так откажется без `ALLOW_PROD_SEED=1`.
- Старые команды `pnpm db:new`, `pnpm db:check`, `pnpm db:migrate`, `pnpm content:sync`, `pnpm db:seed` остались и работают как раньше (CI использует `pnpm db:migrate` + `pnpm db:seed` в интеграционном job'е).

## Создание и проверка миграции

```bash
pnpm migrate new chess_puzzle_tags   # → packages/db/drizzle/0045_chess_puzzle_tags.sql + запись в журнале
pnpm migrate check                   # согласованность файлов и журнала, без БД
```

- `migrate new` (= `db:new`, `scripts/db/new-migration.mjs`): нормализует имя (`"Chess tags"` → `chess_tags`), берёт следующий номер, пишет SQL-шаблон (только комментарии — пока его не заполнить, это no-op) и добавляет запись в журнал в формате drizzle-kit (отступ 4 пробела, `when = max(Date.now(), предыдущий + 1000)`, сохраняет CRLF, если журнал в CRLF после checkout на Windows). Перед созданием прогоняет проверку и откажется работать, если журнал уже сломан.
- `migrate check` (= `db:check`, `scripts/db/check-migrations.mjs`): `idx` по порядку без дыр, номер в `tag` = `idx`, формат `NNNN_snake_case`, `version "7"`, `breakpoints: true`, `when` строго растёт, у каждой записи есть файл, каждый `.sql` есть в журнале, нет BOM/UTF-16. Код выхода 1 при ошибке.
- Всё — чистый Node без bash, работает на Windows. `--dir <путь>` — указать другую папку drizzle (для `new`/`check`, нужно тестам).
- Проверка входит в CI (шаг `pnpm migrate check`) и в `pnpm --filter @eduforge/db test` (`scripts/db/migrations.test.mjs`, там же тесты разбора аргументов `pnpm migrate`).

### Важно про `db:generate`

`pnpm db:generate` (= `drizzle-kit generate`) существует, но в `drizzle/meta/` нет snapshot-файлов, только `_journal.json`. Без снапшота drizzle-kit не знает текущее состояние и сгенерирует некорректный дифф. Поэтому миграции пишутся **вручную** через `pnpm migrate new` (см. выше): SQL + изменение Drizzle-схемы в `src/schema/*.ts`. `db:generate` не использовать.

## Правила

1. **Только аддитивные изменения**: `CREATE TABLE IF NOT EXISTS`, `ADD COLUMN IF NOT EXISTS` с `DEFAULT` (или nullable), `CREATE INDEX IF NOT EXISTS`. Внешние ключи — в `DO $$ BEGIN … EXCEPTION WHEN duplicate_object THEN null; END $$;` (см. `0044`).
2. Не удалять и не переименовывать таблицы/колонки, не менять типы с потерей данных. Нужна замена — новая колонка + перенос данных, старая остаётся.
3. Миграция должна быть идемпотентной (повторный запуск не падает).
4. Между statement'ами — `--> statement-breakpoint`.
5. Уже применённый/запушенный файл миграции не редактировать — только новая миграция.
6. Не делать `ALTER TYPE` для нового курса: слаги курсов — `varchar` + `COURSE_SLUGS` / `isCourseSlug` в `@eduforge/shared`.
7. **ID контента стабильны**: ID упражнений/уроков/юнитов не переименовывать и не удалять — на них ссылаются прогресс, SRS и рейтинги задач. Исправлять контент на месте (тот же ID). См. [chess-content.md](chess-content.md).
8. Схема Drizzle (`src/schema/*.ts`) меняется в том же коммите, что и SQL.

## Отдельные шаги (из корня)

Обычно не нужны — `pnpm migrate` вызывает их сам.

| Команда | Что делает |
| --- | --- |
| `pnpm db:new <name>` / `pnpm db:check` | То же, что `pnpm migrate new` / `pnpm migrate check` |
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
pnpm migrate           # check → migrate → content:sync
# или pnpm migrate --seed   # только на своей новой локальной БД (демо-админ)
```

На проде: бэкап → `pnpm migrate` (без `--seed`).

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
export ADMIN_PASSWORD=admin12345   # seed требует явный пароль; такой допустим только не в production
pnpm migrate --seed
pnpm test:integration
```

Переменная окружения в шелле имеет приоритет над `.env` (`loadRootEnv` не перезаписывает уже заданные). Новую миграцию обязательно прогнать дважды (`pnpm migrate` второй раз должен пройти без изменений) и на БД с данными.

## Индексы на внешних ключах (0045_fk_indexes)

Postgres не создаёт индекс на колонке внешнего ключа сам. Без него каждое удаление родителя (`ON DELETE CASCADE` / `SET NULL`, например удаление аккаунта задевает ~25 таблиц с `user_id`) и каждый фильтр по этой колонке — полный проход таблицы. Миграция `0045_fk_indexes` добавляет 59 индексов `"<таблица>_<колонка>_idx"` (только `CREATE INDEX IF NOT EXISTS`), те же индексы описаны в `packages/db/src/schema/tables.ts`.

Кандидаты взяты не из головы, а из каталога мигрированной БД — FK, у которых нет индекса с этой колонкой **первой** (составной индекс `(user_id, lesson_id)` покрывает `user_id`, но не `lesson_id`). Проверка после миграции (должно быть `0`):

```sql
select count(*) from pg_constraint c
where c.contype = 'f' and array_length(c.conkey, 1) = 1
  and not exists (select 1 from pg_index i where i.indrelid = c.conrelid and i.indkey[0] = c.conkey[1]);
```

Проверено 26.11.2026: `pnpm migrate` на существующей БД (дважды — второй раз без изменений) и на новой — в обоих случаях `0`. Индексы создаются обычным `CREATE INDEX` (внутри транзакции миграции `CONCURRENTLY` нельзя): на большой продовой `exercise_attempts` это короткая блокировка записи — запускать в тихое время.

Если добавляете новый FK — сразу добавляйте и индекс (или убедитесь, что колонка первая в существующем).
