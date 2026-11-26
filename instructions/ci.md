# CI (GitHub Actions)

Файлы — `.github/workflows/`. Проверять синтаксис локально: [actionlint](https://github.com/rhysd/actionlint) (`actionlint` в корне репозитория).

## Когда что запускается

| Workflow | push | pull_request | Блокирует merge |
| --- | --- | --- | --- |
| `ci.yml` (unit, integration, content-gate, labs) | `main`, `master`, `dev`, `deepImprovements`, `seedFeat` | **любой** PR, в любую базовую ветку (в т.ч. feature → feature) | да |
| `e2e.yml` (Playwright smoke: web + api) | `main`, `master`, `dev` | любой PR | на push — да; на PR — нет (`continue-on-error`, результат виден, но не красит PR) |
| `visual.yml` (скриншотные тесты) | — | PR с изменениями в `apps/web/**` | только если в репо уже есть эталоны `apps/web/e2e/__snapshots__/` |

`visual.yml`: `hashFiles()` нельзя использовать в `if` уровня job (GitHub отклоняет такой workflow целиком), поэтому отдельный job `gate` делает checkout, проверяет наличие эталонов и отдаёт `run=true/false`; job `visual` зависит от него (`needs: gate`).

## Сборка пакетов и кеш

- Во всех job пакеты собираются одним вызовом `pnpm exec turbo run build --filter=...` — каждый пакет один раз, в порядке зависимостей (раньше `chess-core` собирался дважды).
- `.turbo/cache` сохраняется через `actions/cache` с ключом `turbo-<os>-<job>-<sha>` и восстанавливается по префиксу `turbo-<os>-<job>-`, так что неизменённые пакеты берутся из кеша.
- pnpm store кешируется `actions/setup-node` (`cache: pnpm`).

## Integration

Job `integration` поднимает Postgres 16 и Redis 7 как сервисы и прогоняет `test:integration` дважды: с Redis и с `REDIS_URL=redis://127.0.0.1:1` (недоступный адрес) — API обязан быстро переходить на память (см. [dev-and-testing.md](dev-and-testing.md)).

## Audit

`pnpm audit --prod --audit-level=high` — блокирующий шаг job `unit`: high/critical уязвимость в production-зависимостях валит CI. Исправлять через обновление зависимости или `overrides` в `pnpm-workspace.yaml`.
