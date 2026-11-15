# 89 — Email verification lifecycle

## Goal

After registration, EduForge sends a welcome and confirmation email. Unverified accounts stay usable for a grace period, then become inactive, then are deleted.

Email verification itself (tokens, banner, `/verify-email`) shipped in SPEC 77. This spec adds `account_status` and the cleanup job.

## Product rules

| Phase | Condition | Behavior |
|-------|-----------|----------|
| Active (unverified) | `emailVerifiedAt IS NULL`, age &lt; 7 days | Full product access; session allowed; UI banner + resend |
| Inactive | age ≥ **7 days**, still unverified | Login blocked (`account_inactive`); auth middleware 403; **verify link still works** |
| Deleted | age ≥ **30 days**, still unverified | Hard delete user via cron (per-user; FK failures are counted, not fatal) |
| Verified | `emailVerifiedAt` set | Always active; not purged by this job |

The banner states that without confirmation the account becomes inactive after 7 days and is deleted after 30 days.

## Data model

### `users`

- `email_verified_at` — already added in `0027_email_verify_security` (existing rows grandfathered there)
- `account_status` — `active` \| `inactive` (default `active`), added in `0031_unverified_lifecycle`

### `email_verification_tokens`

Already exist. New tokens last **30 days** so a link can still confirm an inactive account before the delete deadline.

## Email

- Template: `registrationVerifyEmail` in `apps/api/src/email.ts`
- SMTP via `sendMail`; without SMTP the API logs `[email:dev]`
- Non-production responses may include `verifyUrl` / `devToken`

## API

| Method | Path | Auth | Notes |
|--------|------|------|-------|
| POST | `/auth/register` | No | Creates user, sends verify email, session; `user.emailVerified: false`, `accountStatus: active` |
| POST | `/auth/verify-email` | No | `{ token }` sets verified + `active` and issues a session |
| POST | `/auth/resend-verification` | Session or `{ email }` | Logged-in unverified users resend to themselves. Otherwise generic success (no enumeration) |
| POST | `/auth/login` | No | `403 account_inactive` if inactive |
| GET | `/auth/me` | Yes | Includes `emailVerified` and `accountStatus` |
| POST | `/auth/cron/unverified-lifecycle` | `CRON_SECRET` | Inactivate 7d+; delete 30d+ |
| POST | `/admin/ops/unverified-lifecycle` | Admin + step-up | Same job |

Auth middleware returns `403 { error: "account_inactive" }` for inactive accounts. Logout stays allowed.

## Frontend

| Surface | Behavior |
|---------|----------|
| `EmailVerifyBanner` | While `emailVerified === false`: 7d/30d policy + resend |
| `/verify-email?token=` | Confirms and routes to the dashboard |
| `/login` | Maps `account_inactive` to the policy message |
| `/admin` ops | Unverified count and cleanup button |

## Cron

Daily UTC:

```bash
curl -sS -X POST "$API/auth/cron/unverified-lifecycle" \
  -H "x-cron-secret: $CRON_SECRET"
```

## Related

- `SPEC/77-security-retention-pack.md`
- `SPEC/08-auth-billing-admin.md`
- `SPEC/CRON.md`
