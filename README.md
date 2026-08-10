# EduForge

Освітній SaaS: **англійська**, **шахи** (уроки + online PvP), **друк**, **швидкочитання**, **логіка**, **програмування** (Mimo-style path + playground + mini-projects).

UI: **українська + англійська** · повна технічна документація: [`SPEC/`](./SPEC/) (English, 01–87 + CURRENT) · surface freeze: [`SPEC/CURRENT.md`](./SPEC/CURRENT.md).

- Monorepo: **pnpm + Turborepo**
- Apps: `web` (Next.js), `api` (Hono), `realtime` (Socket.IO)
- DB: **Postgres + Drizzle**, cache/queues: **Redis**
- Docker Compose ready

## Швидкий старт (локально)

### 1. Залежності

```bash
pnpm install
```

### 2. Postgres + Redis

```bash
docker compose up postgres redis -d
```

### 3. Env

```bash
copy .env.example .env
```

### 4. Міграції + seed контенту

```bash
pnpm --filter @eduforge/shared build
pnpm --filter @eduforge/content build
pnpm --filter @eduforge/chess-core build
pnpm db:migrate
pnpm db:seed
```

### 5. Dev-сервери

```bash
pnpm dev
```

- Web: http://localhost:3000  
- API: http://localhost:4000/health  
- OpenAPI: http://localhost:4000/docs  
- Realtime: http://localhost:4001/health  

## Повний Docker

```bash
docker compose up --build -d
docker compose --profile tools run --rm migrate
```

## Можливості (коротко)

| Область | Що є |
|---------|------|
| Курси | english, chess, typing, speed_reading, logic, **programming**, **typescript**, **html_semantics**, **css_layout**, **qa_theory** |
| Programming | path units, Monaco drills, mini-projects, weekly race, stack hubs |
| Deep tracks | HTML semantics, CSS Flex/Grid, QA theory (+ unit exams) |
| Playground | client sandbox (JS/TS/HTML/CSS + **React Studio** + **C++**), race |
| Node Studio | **WebContainers** in-browser Node/npm/Express (`/studio/node`, flag `NEXT_PUBLIC_WEBCONTAINERS`) |
| Соціальне | friends, minis vs friends, weekly race vs friends, certificates |
| Клас / батьки | orgs, homework, gradebook CSV, parent digests |
| Гейміфікація | XP, levels, hearts, streak shields, shop, quests, achievements |
| Ops | admin metrics CSV, cron digests, push, tutor (SpaceXAI) |

## Прокачка

| Шар | Опис |
|-----|------|
| Курс | окремий XP + рівень (english / chess / typing / programming / …) |
| Персонаж | `globalXp` / `globalLevel` з усіх курсів + бонуси |
| Шахи Elo | окремий рейтинг для online-партій |

## Freemium

- Free: перші 5 уроків курсу, ліміт рейтингових партій, 5 ❤️
- Premium: Stripe Checkout / Portal у production
- Demo upgrade (`/billing/dev-upgrade`, trial): **лише non-prod** або `ALLOW_DEV_BILLING=1` на staging — у реальному production вимкнено

## Security (коротко)

| Контроль | Поведінка |
|----------|-----------|
| Sessions | httpOnly cookie; Bearer у JSON лише non-prod / `X-Issue-Bearer` |
| CSRF | Origin check **on** у production (`FEATURE_STRICT_CSRF=0` щоб вимкнути) |
| Judge | Prod default **off**; `JUDGE_MODE=docker` для ізоляції; без fallback на host |
| Email | Верифікація після register; банер + `/verify-email` |
| Headers | CSP / nosniff / frame on web; security headers on API + nginx |
| Privacy | Profile: change password, JSON export, account delete (`confirm: "DELETE"`) |
| Continue | Post-lesson `nextLesson` + Learn «місія дня» |
| OAuth | Google — `GOOGLE_CLIENT_ID` / `SECRET` → Continue with Google |
| 2FA | TOTP для всіх акаунтів (профіль + challenge на login) |
| Family | `/family` — seats, invite codes, Premium для дітей |
| Teacher | `/teacher` — heatmap домашки |
| UX | Thin home, PageLoading floor, labs shells, visual baselines (Playwright) |

Повний runbook: [`SPEC/OPS.md`](./SPEC/OPS.md) · surface: [`SPEC/CURRENT.md`](./SPEC/CURRENT.md) · [SPEC/87](./SPEC/87-studio-classroom-admin-visual.md)

### Visual regression

```bash
pnpm --filter @eduforge/web test:e2e:visual:update   # write baselines
pnpm --filter @eduforge/web test:e2e:visual          # compare
```

## Admin Platform (v2)

Modular admin at `/admin` (sidebar): courses (draft→publish), content tree, appearance (CSS tokens), users, metrics, ops, feedback, audit, security (TOTP), plus read-only overviews (billing, classroom, engagement, programming).

- **2FA:** TOTP when enrolled (always challenged on login); backup codes; step-up via `X-Admin-StepUp`. Enforce enroll in production / `ADMIN_MFA_ENFORCE=true`.
- **E2E MFA:** `loginAsAdmin()` generates live TOTP from seed secret (`JBSWY3DPEHPK3PXP`).
- **Theming:** `GET /public/branding` + admin Appearance publish.
- Spec: [SPEC/72-admin-platform-v2.md](./SPEC/72-admin-platform-v2.md)

## Admin CMS

Після `pnpm db:seed` створюються акаунти:

| Роль | Email | Password | Plan |
|------|-------|----------|------|
| Admin | `admin@eduforge.ua` | `admin12345` | premium |
| Test user | `premium@eduforge.ua` | `premium12345` | premium |

Сторінки: `/admin`, `/admin/courses`, `/admin/content`, `/admin/appearance`, `/admin/users`, `/admin/metrics`, `/admin/security`, …

## Password reset

`/forgot-password` → у dev API повертає `resetUrl` (і лог у консолі API).

## Onboarding

Wizard (роль + трек) після першого входу → `/learn` (або `/parents` / `/teacher` / path за `?intent=`).  
Чекліст secondary на `/dashboard`. Деталі: [SPEC/79](./SPEC/79-ux-user-improvements.md).

## Структура

```
apps/web          Next.js UI (UK + EN)
apps/api          REST API + OpenAPI (see /docs)
apps/realtime     Chess WebSocket
apps/mobile       WebView shell scaffold (Expo install separately)
packages/db       Drizzle schema / migrate / seed
packages/content  Seed-уроки + MDX pipeline
packages/shared   XP, Elo, entitlements, i18n, minis race
packages/judge    Multi-lang judge + job queue
packages/chess-core
SPEC/             Product & technical docs (English) 01–87 + CURRENT
```

## Documentation

- [`SPEC/README.md`](./SPEC/README.md) — full index  
- [`SPEC/CURRENT.md`](./SPEC/CURRENT.md) — product surface freeze & IA map  
- [`SPEC/58-docs-freeze.md`](./SPEC/58-docs-freeze.md) — historical closeout 01–58  
- [`.env.example`](./.env.example) — environment variables  

## Tests

```bash
pnpm --filter @eduforge/content test
pnpm --filter @eduforge/shared test
pnpm --filter @eduforge/judge test
pnpm --filter @eduforge/api test
pnpm --filter @eduforge/mobile test
# e2e (stack running):
# set SKIP_E2E=0  →  pnpm --filter @eduforge/web test:e2e
# CI: unit + integration + content-gate + e2e-smoke (landing/register/admin)
```

## Ops extras

```bash
# OTel collector (API: OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318)
docker compose --profile otel up -d otel-collector

# Product funnel (admin UI: /admin/metrics · API: GET /analytics/funnel?days=7)
# Metrics: GET /metrics → productFunnel7d + judge.queue
# Judge worker: POST /judge/worker/drain  (CRON_SECRET)

# Visual baselines (commit e2e/__snapshots__ after first generate)
pnpm --filter @eduforge/web test:e2e:visual:update   # local, stack up
# GitHub: Actions → Visual regression → update_snapshots=true
```
