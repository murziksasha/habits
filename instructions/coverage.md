# Покрытие тестами (coverage)

Провайдер — `@vitest/coverage-v8`. Общие настройки — `vitest.coverage.mjs` в корне (отчёты `text-summary`, `json-summary`, `lcov`, `html` в `<пакет>/coverage/`; учитывается `src/**`, тесты и `*.d.ts` исключены). Пороги — в `vitest.config.ts` каждого пакета.

```bash
pnpm test:coverage                                # все пакеты через turbo (как в CI)
pnpm --filter @eduforge/shared test:coverage      # один пакет
open packages/shared/coverage/index.html          # HTML-отчёт
```

## Базовые пороги (26.11.2026)

Измерено и округлено вниз минус 1 п.п., чтобы CI падал только при **снижении** покрытия, а не от шума:

| Пакет | lines | functions | branches | statements | Замер (lines) |
| --- | --- | --- | --- | --- | --- |
| chess-core | 95 | 97 | 79 | 95 | 96,2 % |
| content | 98 | 98 | 82 | 98 | 99,96 % (в основном данные) |
| shared | 92 | 82 | 71 | 92 | 93,2 % |
| circuit-engine | 57 | 77 | 58 | 57 | 58,5 % |
| judge | 50 | 75 | 60 | 50 | 51,7 % |
| mobile | 79 | 82 | 43 | 79 | 80 % |
| api | 24 | 39 | 65 | 24 | 25,1 % (маршруты покрывают интеграционные тесты, они в этот замер не входят) |
| realtime | 11 | 91 | 85 | 11 | 12,5 % (то же: `game-service` проверяется интеграционным тестом) |
| web | 2 | 55 | 58 | 2 | 3,1 % (UI проверяют e2e) |

`packages/db` использует `node:test` (`tsx --test`), в замер не входит.

Когда добавили тесты и покрытие выросло — поднимите порог в `vitest.config.ts` пакета до нового значения минус 1. Понижать порог — только осознанно, с причиной в коммите.

## CI

Job `unit` запускает `pnpm test:coverage` вместо `pnpm test:unit` (те же тесты + замер) и выкладывает папки `apps/*/coverage`, `packages/*/coverage` артефактом `coverage` (хранится 14 дней).
