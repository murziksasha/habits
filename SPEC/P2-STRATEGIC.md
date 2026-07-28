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
# Dev (host node/python)
JUDGE_MODE=local

# Isolated containers (Docker required)
JUDGE_MODE=docker
# optional image overrides: JUDGE_IMAGE_JS, JUDGE_IMAGE_PY, JUDGE_IMAGE_BASH
```

Images default: `node:22-alpine`, `python:3.12-alpine`, `bash:5.2`. Network disabled, 128MB RAM, 0.5 CPU.

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

## What is still future work

- Full CRDT for classroom code
- Production judge pool + queue workers
- Capacitor store builds + push certs
- Full Next app directory RSC migration
- Hosted video CDN + transcripts
- Trained ranking model from event logs
