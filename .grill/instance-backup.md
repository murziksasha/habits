# Grill: instance backup
Date: 2026-10-25

## Intent
Run this app locally on more than one PC, one PC at a time. Carry every user (password hashes, XP, passed lessons, and the rest of the school) to the next PC as a file, and put that PC back if the file was the wrong one.

## Constraints
- The file is the source of truth. Destination progress is wiped, even when it is newer.
- One active PC at a time. Two PCs used on the same day lose whichever side was not downloaded last.
- Admin only. Students cannot download or restore the school.
- Restore requires the exact word `RESTORE`.
- Same app migration as the file, or the restore stops.
- After restore, sign in with the email and password from the file. The fresh seed `admin@eduforge.ua` / `admin12345` is gone.
- One-time secrets stay out of the file: sessions, password-reset tokens, email-verification tokens, half-finished MFA challenges, admin step-up tokens. Password hashes and admin TOTP secrets stay in. Redis matchmaking is not in the file.
- No timer. A copy on the same disk dies with that disk.

## Key decisions
- Decision: replace the destination database. Reason: lesson progress points at lesson UUIDs created on the source PC; merging two databases would fork those ids. Alternative considered: merge by email, or progress-only with new passwords.
- Decision: one safety file on the destination, written before the wipe, put back by an Undo last restore button. Reason: a wrong file must be reversible without hunting the disk. The undo itself saves the current database as the new safety file, so a second click returns to the uploaded file. Alternative considered: no undo, or also downloading the safety file to the browser.
- Decision: backup file only, not GitHub. Reason: the file holds password hashes, TOTP secrets, emails, and student progress, and git keeps every old copy. Alternative considered: push the same `.gz` to a private repo.
- Decision: warn on Admin home until the first download, and again when that time is older than 7 days. Reason: the only off-machine copy is the one the admin downloaded. The time is saved into `platform_settings` before the file is built, so a restore carries it. The warning is not dismissible and students never see it. Alternative considered: quiet for the first 7 days, or a daily file on the same disk.
- Decision: leave one-time tokens out. Reason: they do not log anyone in on the new browser, and an old reset link would work again. Alternative considered: copy every row, or also drop TOTP secrets.

## Surfaced assumptions
- Both PCs run the same git revision of this app before a restore. A newer migration on only one side is refused, not auto-migrated.
- The admin who exports is the admin who can log in after import. There is no second preserved seed admin.
- Browser sessions do not carry over. Everyone signs in again.
- In-progress matchmaking in Redis is dropped. Finished chess games in Postgres move.
- If admin TOTP is enrolled, restore, undo, and download also use the existing admin step-up check, same as other destructive admin actions. The typed word is still required for restore and undo.
- The safety file lives outside Postgres, on a Docker volume, so replacing the database does not delete the undo copy.

## Out of scope
- GitHub, or any remote upload, as the data bus.
- Merge, two live PCs, or sync while both are in use.
- Scheduled backups.
- Changing the per-user `/export` page.
- Migrating an older file forward onto a newer schema.
