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

UI routes:

- `/admin` — stats dashboard  
- `/admin/users` — promote admin, change plan  
- `/admin/content` — browse course tree, edit lesson JSON, create/delete  

Lesson editor stores raw `exercises` JSON; operators must keep exercise shape valid (see content types).

## Seeded admin

Default credentials (change in production):

```
admin@eduforge.ua / admin12345
```
