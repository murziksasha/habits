# EduForge

Освітній SaaS: **англійська**, **шахи** (уроки + online PvP), **друк**, **швидкочитання**, **логіка**, **програмування** (Mimo-style path + playground + mini-projects).

UI: **українська + англійська** · повна технічна документація: [`SPEC/`](./SPEC/) (English, 01–71) · surface freeze: [`SPEC/CURRENT.md`](./SPEC/CURRENT.md).

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
- Premium: demo-кнопка на `/pricing` (або Stripe Checkout, якщо ключі задані)

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

Чекліст на `/dashboard` (уроки, шахи, друк, рейтинг, тарифи).

## Структура

```
apps/web          Next.js UI (UK + EN)
apps/api          REST API + OpenAPI 1.5
apps/realtime     Chess WebSocket
packages/db       Drizzle schema / migrate / seed
packages/content  Seed-уроки (incl. programming)
packages/shared   XP, Elo, entitlements, i18n, minis race
packages/chess-core
SPEC/             Product & technical docs (English) 01–71 + CURRENT
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
pnpm --filter @eduforge/api test
# e2e (stack running):
# set SKIP_E2E=0  →  pnpm --filter @eduforge/web test:e2e
```
