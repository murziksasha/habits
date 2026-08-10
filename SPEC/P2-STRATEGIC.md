# P2 strategic foundations (implemented as scaffolds)

These were deferred as multi-quarter bets. EduForge now ships **working foundations** — not full production parity of every bullet.

| Bet | Foundation | Enable / path |
|-----|------------|----------------|
| Multi-lang Docker judge | `@eduforge/judge` + `POST /judge/run` | `JUDGE_MODE=local\|docker\|off` |
| Native apps | `apps/mobile` WebView shell | Expo bootstrap in README |
| Video LMS | exercise type `video` + player | MDX `videoUrl` frontmatter |
| RSC rewrite | Strangler: landing `page.tsx` is RSC | More pages gradually |
| MDX authoring | `packages/content/src/mdx` | `parseMdxLesson` / `mdxToExercises` |
| OTel full stack | `apps/api/src/otel.ts` OTLP JSON export | `OTEL_EXPORTER_OTLP_ENDPOINT` |
| ML adaptive next | `adaptiveScore` re-rank in next-steps | `ADAPTIVE_WEIGHTS_JSON` |
| Live collab classroom | Socket `class_*` + `/classroom/live/[classId]` | Realtime URL |

## Judge Docker

```bash
# Dev (host node/python) — never on shared prod hosts
JUDGE_MODE=local

# Isolated containers (required for production if judge is enabled)
JUDGE_MODE=docker
# optional image overrides: JUDGE_IMAGE_JS, JUDGE_IMAGE_PY, JUDGE_IMAGE_BASH

# Production default when JUDGE_MODE unset: off (fail-closed)
# JUDGE_ALLOW_LOCAL=1          # force local in prod (unsafe)
# JUDGE_DOCKER_FALLBACK_LOCAL=1 # allow docker→local fallback (dev only)
# JUDGE_ALLOW_BASH_LOCAL=1     # allow bash under local mode
```

Images default: `node:22-alpine`, `python:3.12-alpine`, `bash:5.2`. Network disabled, 128MB RAM, 0.5 CPU.  
Local runner strips secrets from child env and hard-blocks common escape patterns.

## OTel

Spans recorded in-process; metrics expose `otel.byName`. When `OTEL_EXPORTER_OTLP_ENDPOINT` is set (e.g. `http://localhost:4318`), spans POST to `/v1/traces` as OTLP/HTTP JSON.

## Adaptive next

`buildNextRecommendations` re-scores with logistic blend. Override weights:

```json
{"isWeak":1.5,"paywalled":-3,"basePriority":0.1}
```

via `ADAPTIVE_WEIGHTS_JSON`.

## Classroom

Open `/classroom/live/{classId}` while logged in. Events: `class_join`, `class_chat`, `class_code`, `class_raise_hand`.

## Shipped in improvement program (2026-08)

| Area | Status |
|------|--------|
| Product funnel events | `POST /analytics/events`, `GET /analytics/funnel`, metrics `productFunnel7d` |
| first_lesson_complete | Server-side on submit-lesson (deduped) + paywall_shown from PaywallCard |
| Review reasons | `buildReviewReasons` on `/review` items + UI “Why” |
| Judge queue | `@eduforge/judge` queue + result TTL store + `/judge/result/:id` + `/judge/worker/drain` |
| Pricing RSC | Server shell + `PricingClient` island; `billing-ops` service |
| Classroom live | Reconnect + pending chat buffer |
| RSC strangler | Full app directory strangler: primary, toolkit, B2B, labs, deep hubs, course/lesson, admin shells |
| Admin funnel | `/admin/metrics` productFunnel + `/analytics/funnel` |
| Visual CI | `.github/workflows/visual.yml` |
| Content freemium gate | `ensureFreemiumFreeLessons` + CI content job |
| MDX | `mdxToLesson`, fill/translate markers |
| Bundle | Lazy Chessboard; Monaco already dynamic; WebContainers/JSCPP dynamic |
| PWA | `public/sw.js` offline shell, manifest start `/learn` |
| OTel compose | `docker compose --profile otel` collector |
| CI | e2e-smoke + content-gate jobs |
| Mobile | deep-link helpers + unit tests (WebView still Expo install) |
| Character talents | skill points on level-up, 6 talents, titles/frames (`/character`) |
| Friend gifts | catalog + send/claim + mystery (`/gifts`) |
| Course expansion | logic advanced; JS errors/proto; React hooks advanced |
| Character cosmetics | public profile + OG + leaderboard titles/frames |
| Gift achievements | send/claim + talent spend unlocks |
| Daily loot loop | login bonus, quest gifts/talents, level-up drops, shop mystery |
| Character v2 | milestones SP, vitality/mentor, respec, next-steps build CTA |

## What is still future work

- Full CRDT for classroom code
- Multi-worker judge pool across machines + result store TTL
- Capacitor store builds + push certs
- Full Next app directory RSC migration
- Hosted video CDN + transcripts
- Trained ranking model from event logs
