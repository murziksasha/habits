# 72 — Email verification & unverified account lifecycle

## Goal

After registration, EduForge sends a **welcome + confirmation** email. Unverified accounts remain usable for a grace period, then become inactive, then are deleted.

## Product rules

| Phase | Condition | Behavior |
|-------|-----------|----------|
| Active (unverified) | `emailVerifiedAt IS NULL`, age &lt; 7 days | Full product access; session allowed; UI banner + resend |
| Inactive | age ≥ **7 days**, still unverified | Login blocked (`account_inactive`); auth middleware 403; **verify link still works** |
| Deleted | age ≥ **30 days**, still unverified | Hard delete user (cascade) via cron |
| Verified | `emailVerifiedAt` set | Always active; not purged by this job |

Post-register UX must state clearly:

1. Confirmation email was sent  
2. Without confirmation → inactive after **7 days**  
3. Without confirmation → **deleted after 30 days**

## Data model

### `users`

- `email_verified_at` — timestamptz, null until confirmed  
- `account_status` — `active` \| `inactive` (default `active`)

### `email_verification_tokens`

Same shape as password reset tokens: `user_id`, `token_hash` (unique), `expires_at` (30 days), `used_at`, `created_at`. Cascade on user delete.

### Migration

`0024_email_verification.sql`:

- Adds columns  
- **Backfills** existing rows: `email_verified_at = created_at` so pre-feature users are not mass-inactivated  
- New signups start with `email_verified_at = null`

Seeded admin / premium demo users are created **verified**.

## Email

- Template: `registrationVerifyEmail` in `apps/api/src/email.ts`  
- SMTP via existing `sendMail` (`SMTP_HOST` + `SMTP_FROM`); without SMTP → `[email:dev]` log  
- Non-production register/resend may include `verifyUrl` / `devToken` in JSON (parity with password reset)

## API

| Method | Path | Auth | Notes |
|--------|------|------|-------|
| POST | `/auth/register` | No | Creates user, token email, session; `user.emailVerified: false` |
| POST | `/auth/verify-email` | No | `{ token }` → sets verified + active; issues session |
| POST | `/auth/resend-verification` | No | `{ email }` generic success (no enumeration) |
| POST | `/auth/login` | No | `403 account_inactive` if inactive |
| GET | `/auth/me` | Yes | Includes `emailVerified`, `emailVerifiedAt`, `accountStatus` |
| POST | `/auth/cron/unverified-lifecycle` | CRON_SECRET | Inactivate 7d+; delete 30d+ |
| POST | `/admin/ops/unverified-lifecycle` | Admin | Same job for ops UI |

Auth middleware returns `403 { error: "account_inactive" }` for inactive accounts.

## Frontend

| Surface | Behavior |
|---------|----------|
| `/register` success | `sessionStorage` flag → banner with full policy copy |
| Global `EmailVerifyBanner` | While `emailVerified === false`: policy + resend |
| `/verify-email?token=` | Calls verify endpoint; success → dashboard |
| `/login` | Maps `account_inactive` to friendly message |

## Cron

Recommended: **daily** UTC

```bash
curl -sS -X POST "$API/auth/cron/unverified-lifecycle" \
  -H "x-cron-secret: $CRON_SECRET"
```

Or admin: `POST /admin/ops/unverified-lifecycle`.

## Related

- `SPEC/08-auth-billing-admin.md`  
- `SPEC/04-api-reference.md`  
- `SPEC/CRON.md`  
- `SPEC/09-frontend.md`  
