# 72 — Admin Platform v2 (modular CMS, theming, TOTP)

## Summary

Admin is a **modular control plane** (sidebar blocks) covering product ops, CMS, appearance, and security.

| Capability | Status |
|------------|--------|
| Modular `/admin/*` shell | Yes |
| TOTP 2FA for admins | Yes (`ADMIN_MFA_ENFORCE`) |
| Step-up re-auth on dangerous actions | Yes (`X-Admin-StepUp`) |
| Design tokens + branding | Yes (`platform_settings`, `/public/branding`) |
| Course draft → publish | Yes (free slug varchar) |
| Content tree CMS (EN/UK, exams) | Yes |
| Domain overviews (billing, classroom, engagement, programming) | Read-only |
| Audit log | Extended |

## MFA (TOTP)

### Env

| Variable | Purpose |
|----------|---------|
| `MFA_ENCRYPTION_KEY` | AES key material for TOTP secrets (falls back to `AUTH_SECRET`) |
| `ADMIN_MFA_ENFORCE` | `true` / `false`; default **true in production**, false otherwise |
| `SEED_ADMIN_TOTP_SECRET` | Base32 secret for seed admin (dev default `JBSWY3DPEHPK3PXP`) |

### Flow

1. Password login for admin with `totpEnabled` → always `{ mfaRequired, mfaToken }` (no session).
2. `POST /auth/mfa/totp/verify` with **TOTP or backup code** → session with `sessions.mfa_verified_at`.
3. If enforce and `!totpEnabled` → `mfa_enroll_required` on `/admin/*`; enroll via:
   - `POST /auth/mfa/totp/setup`
   - `POST /auth/mfa/totp/confirm` → returns **one-time backup codes** (store offline)
4. Step-up: `POST /auth/mfa/step-up` with TOTP or backup → short-lived token; send as `X-Admin-StepUp`.
5. Regenerate backups: `POST /auth/mfa/backup-codes/regenerate` (TOTP only; invalidates old).

### Backup codes

- 10 codes `XXXX-XXXX`, stored as SHA-256 hashes on `users.mfa_backup_code_hashes`
- Each code is single-use (removed on successful verify)
- Seed (dev): `SEED_ADMIN_BACKUP_CODE` default `AAAA-BBBB`

### Step-up required when enforce

- Role change (promote/demote admin)
- Course publish / archive / delete
- Lesson delete
- Appearance publish / revert
- Reset another admin MFA

## Appearance

Stored in `platform_settings`:

- `theme_draft`
- `theme_published`
- `theme_history` (last 3)

Schema: `@eduforge/shared` `PlatformTheme` / `platformThemeSchema`.

Public: `GET /public/branding` (60s cache). Web injects CSS variables `--ef-*`.

## Courses CMS

`courses.slug` is **varchar** (no PG enum). Fields:

- `status`: `draft` | `published` | `archived`
- `category`: `skill` | `code` | `deep` | `chess`
- `contentSource`: `seed` | `cms`
- `publishedAt`, `isVisible`

Learner `GET /courses` returns only `published` + `isVisible`.

Publish gates: titleEn, ≥1 unit, ≥1 lesson, exercises pass Zod (`validateExercises`), exam thresholds.

Seed skips overwrite when `contentSource === "cms"`.

## Admin modules (UI)

| Path | Module |
|------|--------|
| `/admin` | Dashboard + ops digests |
| `/admin/courses` | Create draft, publish, archive |
| `/admin/content` | Tree + **visual exercise builder** + advanced JSON, EN/UK, exam |
| `/admin/appearance` | Tokens + branding draft/publish |
| `/admin/users` | Role / plan |
| `/admin/metrics` | Product metrics + CSV |
| `/admin/feedback` | Feedback triage |
| `/admin/audit` | Audit log |
| `/admin/billing` | Premium overview (read) |
| `/admin/classroom` | Orgs / classes counts |
| `/admin/engagement` | Catalog sizes (read) |
| `/admin/programming` | PG / minis / race (read) |
| `/admin/security` | TOTP enroll, backup codes, session revoke |
| `/admin/parents` | Parent links + digests overview |

## API additions

| Method | Path | Auth |
|--------|------|------|
| GET | `/public/branding` | Public |
| GET | `/auth/mfa/status` | Admin session |
| POST | `/auth/mfa/totp/setup` | Admin session |
| POST | `/auth/mfa/totp/confirm` | Admin session |
| POST | `/auth/mfa/totp/verify` | mfaToken (TOTP or backup) |
| POST | `/auth/mfa/step-up` | Admin session (TOTP or backup) |
| POST | `/auth/mfa/backup-codes/regenerate` | Admin + TOTP |
| POST | `/admin/courses` | Admin |
| PATCH | `/admin/courses/:id` | Admin |
| POST | `/admin/courses/:id/publish` | Admin + step-up |
| POST | `/admin/courses/:id/archive` | Admin + step-up |
| DELETE | `/admin/courses/:id` | Admin + step-up |
| GET/PUT/POST | `/admin/appearance*` | Admin (+ step-up publish) |
| GET | `/admin/overview/*` | Admin |
| POST | `/admin/users/:id/reset-mfa` | Admin + step-up |

## Visual exercise builder

`/admin/content` — toggle **Visual blocks** / **Advanced JSON**.

- Add/reorder/delete exercises by type (`mcq`, `code_*`, `match`, …)
- Field editors for options, accepted answers, code, pairs, FEN, etc.
- Live Zod validation via `validateExercises`
- Advanced JSON remains available for full control

## E2E

- `apps/web/e2e/helpers.ts` — `loginAsAdmin()` uses live TOTP from `SEED_ADMIN_TOTP_SECRET` / `JBSWY3DPEHPK3PXP`
- `apps/web/e2e/mfa.spec.ts` — real TOTP challenge, backup code, content builder
- Seed backup: `SEED_ADMIN_BACKUP_CODE` default `AAAA-BBBB` (single-use; re-seed after burn)

## DB migration

- `0022_admin_platform_v2.sql` — TOTP, session MFA, free slugs, course status, platform settings  
- `0023_mfa_backup_codes.sql` — `users.mfa_backup_code_hashes`

## Related

- SPEC 08 auth/admin baseline  
- SPEC 05 content pipeline  
- SPEC 41–43 ops/metrics  
- SPEC 09 frontend routes  
