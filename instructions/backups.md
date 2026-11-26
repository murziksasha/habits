# Резервные копии Postgres

Есть два независимых механизма:

1. **Admin → Backup** (`/admin/backup`, SPEC/88) — логическая копия данных приложения одним файлом, для переноса между ПК. Запускается вручную.
2. **Плановый `pg_dump`** (этот документ) — полная копия базы по расписанию с ротацией. Именно это нужно на сервере.

## Плановые копии (docker compose)

```bash
# в .env (необязательно, значения по умолчанию в скобках):
# PG_BACKUP_DIR=../eduforge-pg-backups     папка на хосте ВНЕ репозитория
# PG_BACKUP_INTERVAL_SECONDS=86400         раз в сутки
# PG_BACKUP_KEEP_DAYS=14                   удалять копии старше 14 дней…
# PG_BACKUP_KEEP_MIN=3                     …но всегда оставлять 3 последние
docker compose --profile backup up -d pg-backup
docker compose logs -f pg-backup           # строки «[pg-backup] … ok …dump (3.2M)»
```

- Сервис `pg-backup` (образ `postgres:16-alpine`, та же версия, что и сервер) запускает `scripts/db/pg-backup.sh loop`: `pg_dump -Fc --no-owner --no-acl` во временный файл, проверка `pg_restore --list` (битый файл не считается копией), переименование в `eduforge-<UTC-время>.dump`, затем ротация.
- Первая копия делается сразу при старте сервиса, дальше — каждые `PG_BACKUP_INTERVAL_SECONDS`.
- Папка по умолчанию `../eduforge-pg-backups` — рядом с репозиторием, не внутри (в `.gitignore` на всякий случай добавлены `*.dump`). Лучше указать отдельный диск и дополнительно копировать файлы с сервера (rsync / облако): копия на том же диске не спасёт от его потери.
- Разовая копия вручную: `docker compose --profile backup run --rm pg-backup sh /usr/local/bin/pg-backup.sh once`.
- Без Docker (на хосте с установленным `pg_dump` той же или более новой версии, что и сервер): `DATABASE_URL=postgres://… BACKUP_DIR=/path/outside/repo scripts/db/pg-backup.sh once` (для cron).

## Восстановление (runbook)

> Восстановление **заменяет** данные в целевой базе. На общей/продовой БД — только с согласия владельца.

1. Остановить приложения, которые пишут в базу: `docker compose stop api realtime web`.
2. Выбрать файл: `ls -lt ../eduforge-pg-backups/`.
3. Проверить файл (без изменений, «пробный прогон»):
   ```bash
   scripts/db/pg-restore.sh ../eduforge-pg-backups/eduforge-20261126T042226Z.dump "postgres://eduforge:…@localhost:5432/eduforge"
   ```
   Скрипт покажет число таблиц с данными и завершится с кодом 1 — это нормально.
4. Восстановить:
   ```bash
   scripts/db/pg-restore.sh <файл.dump> "<DATABASE_URL>" --yes
   ```
   Внутри: `pg_restore --clean --if-exists --no-owner --no-acl --single-transaction --exit-on-error` — либо всё, либо ничего.
5. `pnpm migrate` — если копия старше кода, применятся недостающие миграции.
6. Запустить приложения: `docker compose start api realtime web`, проверить `/health` и вход.

Безопаснее сначала восстановить в новую базу (`createdb eduforge_restore`), проверить её и только потом переключать `DATABASE_URL`.

`pg_restore` на хосте должен быть не старше `pg_dump`, которым сделан файл. Если локально нет нужной версии — запускать через контейнер: `docker compose run --rm -v "$PWD/scripts/db:/s:ro" -v "$PWD/../eduforge-pg-backups:/backups" pg-backup sh /s/pg-restore.sh /backups/<файл> "postgres://…@postgres:5432/…" --yes`.

## Проверено (26.11.2026, локальный Postgres 17)

- копия `it_seed` (3,2 МБ, 70 таблиц с данными) → восстановление в пустую БД: совпали число пользователей, уроков и md5 списка ID уроков; журнал миграций (45 записей) восстановлен;
- повторное восстановление поверх изменённой БД: добавленная после копии строка исчезла, `pnpm migrate` после восстановления — без изменений;
- ротация: из 5 файлов старше 14 дней удалены 4, оставлены 3 самых новых (`KEEP_MIN`);
- пробный прогон без `--yes` ничего не меняет.

Docker-сервис `pg-backup` не запускался (Docker на машине проверки нет), проверен `docker compose --profile backup config`.
