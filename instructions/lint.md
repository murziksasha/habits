# ESLint

Один конфиг на весь репозиторий — `eslint.config.mjs` (flat config, ESLint 10):

- `@eslint/js` recommended + `typescript-eslint` recommended (без type-aware правил — быстро, ~10 с на весь репо, сборка не нужна);
- для `apps/web`: правила Next.js (`@next/eslint-plugin-next`, recommended + core-web-vitals) и React hooks (`rules-of-hooks` — ошибка, `exhaustive-deps` — предупреждение);
- неиспользуемые переменные с префиксом `_` разрешены;
- не проверяются: `dist`, `.next`, `coverage`, миграции SQL, `apps/mobile` (Expo, отдельный набор правил), `labs/`.

```bash
pnpm lint                     # весь репозиторий (как в CI)
pnpm exec eslint apps/api     # одна папка
pnpm exec eslint --fix <файл>
```

## Базовая линия (baseline)

На момент включения (26.11.2026) было 222 старых ошибки (больше всего `no-unused-vars` — 109, `no-useless-escape` — 76) и 40 предупреждений. Ошибки записаны в **`eslint-suppressions.json`** (встроенный механизм ESLint `--suppress-all`): они не валят `pnpm lint`, а **любая новая** ошибка — валит. Предупреждения не блокируют.

- Исправили старые ошибки в файле → `pnpm lint:prune-baseline` (убирает из baseline то, чего больше нет), закоммитить обновлённый JSON.
- Не добавлять новые записи в baseline руками и не запускать `--suppress-all` повторно, чтобы «спрятать» новую ошибку.

`next build` больше не запускает свой lint (`eslint.ignoreDuringBuilds` в `apps/web/next.config.ts`) — линт один, в CI шаг `Lint` job `unit`. Скрипты `lint: echo ok` в пакетах и задача `lint` в `turbo.json` удалены.

Prettier не подключали: форматирование всего репозитория дало бы огромный дифф без пользы для проверки кода.
