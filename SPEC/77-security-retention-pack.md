# 77 — Security & retention pack

**Status:** Shipped (2026-08)  
**Sources:** product security/UX audit on `embededFeat`

## Goals

1. Production-safe defaults (judge, billing, CSRF, tokens, headers)
2. Trust: email verification, stronger passwords & parent invites
3. Retention UX: Continue CTA, unified Review, progressive hints
4. Depth surfaces without primary-nav bloat: skill tree, portfolio, teacher desk

## API / platform

| Change | Detail |
|--------|--------|
| Judge | `getJudgeMode`: prod default `off`; `local` refused unless `JUDGE_ALLOW_LOCAL=1`; docker never falls back to local unless `JUDGE_DOCKER_FALLBACK_LOCAL=1` |
| Local runner | Minimal child env; hard dangerous patterns; bash local off by default |
| Billing | `isFeatureEnabled("dev_billing")` gates demo upgrade/trial/downgrade |
| CSRF | `strict_csrf` default **true** when `NODE_ENV=production` |
| Bearer issue | `shouldIssueBearerToken` — omit `token` in prod JSON |
| Email verify | Migration `0027`; `POST /auth/verify-email`, `POST /auth/resend-verification` |
| Password | letter + digit (min 8) via `passwordSchema` |
| Parent invite | 16 hex chars; claim rate limit 10/15m |
| Chat | `sanitizeUserText` on post body |
| Headers | API middleware + Next `headers()` CSP + nginx |

## Web

| Route / component | Role |
|-------------------|------|
| `ContinueCta` | Dashboard + skill tree |
| `/review` | Unified inbox (weak + flashcards due) |
| `/verify-email` | Token confirm |
| `EmailVerifyBanner` | Soft gate |
| Progressive hints | L1–L3 in `exercises.tsx` |
| `/programming/tree` | Skill tree |
| `/portfolio` | Minis + certs + share |
| `/teacher` | Class / homework lite |
| Landing | Core loop only; labs disclaimer |
| More menu | Compact (~16 vs 20+) |

## Tests

- `@eduforge/judge` mode + dangerous pattern
- `@eduforge/shared` feature-flags + password schema
- `@eduforge/api` `security-gates.test.ts`

## Follow-ups shipped (iteration)

- Profile: change password, download `/learning/export`, delete account (`DELETE` confirm)
- Lesson summary: `nextLesson` CTA; Learn daily mission strip
- Pricing UI gated by `/me/flags` `devBilling`

## Follow-ups (not blocking)

- OAuth / magic link
- User TOTP (non-admin)
- Judge worker queue
- Family plan / school seats
