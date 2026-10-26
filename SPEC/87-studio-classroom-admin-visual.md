# 87 — Node Studio shell, live classroom, admin appearance/billing, visual baseline

**Status:** Implemented (2026-08)  
**Builds on:** SPEC 79–86

## Deliverables

### Node Studio (`/studio/node`)
- Auth gate + `PageLoading` while dynamic import boots
- Labs badge, WebContainers flag hint, links to programming/playground
- Sticky padding for mobile chrome

### Live classroom (`/classroom/live/[classId]`)
- PageLoading + Labs badge + connection status
- Sticky Continue suppressed (reuses play-match flag)
- Chat live region, raise hand, schools back-link
- Peer count + empty chat state

### Admin appearance
- PageLoading until theme loads
- Labeled fields, color inputs, live preview, reset defaults
- Step-up publish + status live region

### Admin billing
- PageLoading, Stripe badge, error alert
- Links to Users + public pricing

### Visual regression baseline
- Playwright `e2e/visual.spec.ts` screenshots: landing, login, pricing, learn, admin-home
- Config: `snapshotPathTemplate` → `e2e/__snapshots__/`
- Scripts: `test:e2e:visual`, `test:e2e:visual:update`
- First run generates baselines with `--update-snapshots`

## Commands

```bash
# generate/update baselines (stack running)
pnpm --filter @eduforge/web test:e2e:visual:update

# compare against baselines
pnpm --filter @eduforge/web test:e2e:visual
```
