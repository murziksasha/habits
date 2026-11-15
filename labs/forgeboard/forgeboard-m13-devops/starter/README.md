# ForgeBoard M13: Reproducible Delivery, Rollout Triage & Restore Drill

## Tasks
1. Fix `deploy/service.json`: replace `:latest` image tag with pinned digest (`@sha256:...`), align `readinessProbe.path` (`/ready`) and `port` with `env.API_PORT`, and remove hardcoded plaintext fallback credentials in `deploy/env.example`.
2. Fix `scripts/restore-check.mjs` so it refuses running against any live production DSN (`prod`) and accepts only isolated scratch database names (`*_restore_check`).
3. Fill `runbook/postmortem.json` accurately for the failed rollout log in `fixtures/rollout-503.log`.

## Run
```powershell
pnpm install --frozen-lockfile
pnpm test
```
