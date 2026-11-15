# 88 — Instance backup

Admin handoff of the whole local school between PCs. One PC is active at a time. GitHub carries the app code only.

## File

`eduforge-backup-YYYYMMDD-HHMM.json.gz`

Gzip of JSON: `format` `eduforge-instance-backup`, `formatVersion` 1, `migrationTag` equal to the latest Drizzle journal tag, and every application table except one-time secrets.

Excluded: `sessions`, `password_reset_tokens`, `email_verification_tokens`, `mfa_pending`, `admin_step_up_tokens`. Password hashes and admin TOTP secrets stay in. Redis matchmaking is not in the file.

`platform_settings.instance_backup.lastDownloadedAt` is written before the file is built, so a restore carries that time.

## API

Admin only. `requireStepUp` when admin MFA enforcement is on.

| Method | Path | Body |
|--------|------|------|
| GET | `/admin/backup/status` | — |
| GET | `/admin/backup/download` | gzip attachment |
| POST | `/admin/backup/restore` | multipart `file` + `confirm=RESTORE` |
| POST | `/admin/backup/undo` | JSON `{ "confirm": "RESTORE" }` |

Restore refuses a different `formatVersion` or `migrationTag`. It writes `safety.json.gz` under `BACKUP_DIR` (dev default `apps/api/data/backups`, compose volume `backupdata` at `/data/backups`) and then replaces the database. Undo swaps that safety file back. The next restore overwrites the single safety file. Upload cap is 80 MB gzipped.

Sessions are cleared. Sign in with the account from the file. The fresh seed password `admin12345` works only before the first restore.

## UI

- `/admin/backup` — download, restore, undo.
- Admin home warns until the first download and again when that time is older than 7 days. The warning is not dismissible. Students do not see it.

The learner page `/export` is unchanged.
