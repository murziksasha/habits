# 78 — OAuth, user 2FA, family plan, teacher heat

**Status:** Shipped  
**Migration:** `0028_oauth_family_2fa`

## 1. Google OAuth

| Piece | Detail |
|-------|--------|
| Env | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, optional `GOOGLE_REDIRECT_URI` |
| Start | `GET /auth/oauth/google/start?next=/dashboard` |
| Callback | `GET /auth/oauth/google/callback` → session cookie → web redirect |
| Providers | `GET /auth/oauth/providers` |
| Dev | `POST /auth/oauth/google/dev-login` (non-prod / `ALLOW_DEV_OAUTH=1`) |
| Schema | `oauth_accounts` (provider + provider_user_id unique); `users.password_hash` nullable |
| MFA | If user has TOTP, callback redirects to `/login?mfa=1&mfaToken=…` |
| UI | Login / Register “Continue with Google” |

## 2. User 2FA (TOTP)

- Any user may `POST /auth/mfa/totp/setup` → `confirm` (was admin-only).
- Login challenges **all** `totpEnabled` users (not only admin).
- `POST /auth/mfa/totp/disable` with valid code (admin enforce blocks disable in prod).
- `authMiddleware` returns `mfa_required` for API until session MFA-verified (exempt: `/auth/mfa/*`, `/auth/me`, logout).
- Profile UI: enable / confirm / disable + backup codes display.

## 3. Family group

| Piece | Detail |
|-------|--------|
| Seats | `users.family_max_seats` (default activate = 4) |
| Members | `family_members` (owner + children) |
| Invites | `family_invites` (code, 7d expiry) |
| Access | Children are not promoted. A family seat does not change lessons or hearts. |
| API | `GET/POST /family/*` activate, invite, claim, leave, remove |
| UI | `/family` |

## 4. Teacher desk / homework heat

- `GET /homework/teacher/board` — classes taught (or org teacher) with:
  - overall % heat
  - per-assignment completion bars
  - student × assignment heat grid (0–4)
- UI `/teacher` rewritten around board data.

## Tests

- `apps/api/src/oauth-family.test.ts`
- shared entitlements family cases

## Iteration polish

- Family activate is `POST /family/activate` only
- Teacher desk: quick assign (programming catalog → `POST /homework`)
- Dashboard/Learn: `DailyQuestsCard` primary daily mission
- Org invite codes: 16 hex entropy

## Ops

```bash
pnpm db:migrate   # 0028
# optional Google console OAuth client + redirect URI
```
