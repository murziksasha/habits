# 58 — Documentation freeze (SPEC closeout)

## Status

Product surface defined by **SPEC 01–58** is implemented in the monorepo.

| Band | Scope | Status |
|------|--------|--------|
| 01–13 | Core MVP + advanced | Done |
| 14–22 | Engagement → push/analytics | Done |
| 23–54 | Programming track expansion | Done |
| 55–57 | Friends race, profile hub, nav | Done |
| 58 | This freeze + core doc sync | Done |

## Core docs updated in this stage

| Doc | Change |
|-----|--------|
| `01-product-overview.md` | Full pillars, UK+EN UI, schools/programming in matrix |
| `04-api-reference.md` | Full REST surface (not only MVP subset) |
| `05-courses-and-content.md` | `code_project`, stacks, minis |
| `09-frontend.md` | All major routes + nav primary |
| `SPEC/README.md` | Index 55–58 |
| Root `README.md` | Programming + dual locale |

## OpenAPI

Version **1.5.0** — includes friends race, minis race, placement programming, digests, metrics.

## Non-goals (still out)

- Full Docker code judge / remote sandbox
- Native mobile apps
- Video course pipeline
- Separate paid “Programming Pro” plan

## Verification

- `pnpm` package typecheck (turbo)
- Unit: content, shared, api grade/coach/rate-limit
- E2E smoke when stack up (`SKIP_E2E=0`)
