# 08 — Auth, Billing & Admin

## Authentication

- Email + password (bcrypt, cost 10)  
- Session token: 32-byte hex; DB stores SHA-256 hash; TTL 14 days  
- Client stores token in `localStorage` key `eduforge_token` and sends Bearer  

### Password reset

1. `POST /auth/forgot-password` always returns generic success  
2. If user exists, create `password_reset_tokens` row (1 hour)  
3. Log reset URL; in non-production include `resetUrl` in JSON  
4. `POST /auth/reset-password` validates unused non-expired token, updates password  

## Roles

| Role | Access |
|------|--------|
| `user` | Standard product |
| `admin` | `/admin` UI + `/admin/*` API |

## Billing / freemium

- Plan enum: `free` | `premium`  
- Entitlements in `@eduforge/shared/entitlements`  
- Stripe Checkout when keys configured  
- Dev endpoints upgrade/downgrade without Stripe for demos  

Premium unlocks:

- All lessons beyond free index  
- Unlimited hearts  
- Unlimited rated chess  

## Admin CMS

See **[SPEC 72 — Admin Platform v2](./72-admin-platform-v2.md)** for the full modular admin, TOTP MFA, appearance theming, and draft→publish course lifecycle.

### UI routes (modular shell)

- `/admin` — stats + ops digests  
- `/admin/courses` — create draft courses, publish/archive  
- `/admin/content` — course tree, lesson editor (UK/EN, exams, exercises JSON)  
- `/admin/appearance` — design tokens + branding  
- `/admin/users` — promote admin, change plan  
- `/admin/metrics`, `/admin/feedback`, `/admin/audit`  
- `/admin/billing`, `/admin/classroom`, `/admin/engagement`, `/admin/programming` — read-only overviews  
- `/admin/security` — TOTP enroll  

Lesson editor stores `exercises` JSON; **publish** validates via Zod (`validateExercises`).

### Admin MFA

- TOTP (Authenticator apps); enforced when `ADMIN_MFA_ENFORCE=true` or `NODE_ENV=production`  
- Step-up header `X-Admin-StepUp` for dangerous mutations  
- Secrets encrypted with `MFA_ENCRYPTION_KEY`  

## Seeded admin

Default credentials (change in production):

```
admin@eduforge.ua / admin12345
```

Dev seed may set TOTP via `SEED_ADMIN_TOTP_SECRET` (default test secret when not production).
