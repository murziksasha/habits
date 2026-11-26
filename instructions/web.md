# Веб (apps/web): структура и размер бандла

## Упражнения: один тип — один модуль

`apps/web/src/components/exercises.tsx` — только `ExercisePlayer` (≈140 строк). Каждый тип упражнения лежит отдельно и грузится через `next/dynamic`, поэтому урок скачивает код (Monaco, доска, редактор схем, …) только для тех типов, которые в нём реально есть:

| Файл `components/exercises/` | Типы |
| --- | --- |
| `shared.tsx` | контексты (экзамен, ошибки, подсказки, `lessonId`), `usePrompt`, `useExerciseHint`, `useSoftAttempts`, `SoftFeedback`, `DrillFooter`, `CodeBlock`, тип `Exercise` |
| `mcq.tsx` | `mcq`, `logic_puzzle`, `code_read`, `code_output` с вариантами |
| `text.tsx` | `translate`, `fill_blank` |
| `match.tsx` | `match` |
| `code-run.tsx` | `code_run` |
| `code-fill.tsx` | `code_fill`, `code_output` без вариантов, `dataset_query` |
| `code-project.tsx` | `code_project`, `composite_artifact` |
| `order-words.tsx` | `order_words`, `code_order`, `incident_step` |
| `reading.tsx` | `typing`, `rsvp`, `comprehension` |
| `chess.tsx` | `chess_puzzle`, `chess_endgame_drill`, `chess_plan`, `chess_lesson` |
| `concept.tsx`, `explain.tsx`, `video.tsx`, `code-judge.tsx`, `numeric.tsx`, `circuit-lab.tsx` | одноимённые типы |

Новый тип: добавить компонент в подходящий файл (или новый), `export function …`, затем `dynamic(() => import("./exercises/<файл>").then((m) => m.<Компонент>))` и `case` в `ExercisePlayer`. Импорт снаружи не меняется: `import { ExercisePlayer, type Exercise } from "@/components/exercises"`.

Разделение сделано скриптом по границам функций (код не переписывался): `/workspace/chess-notes/work/split_exercises.py` (вне репозитория).

## Строки UI: только активная локаль

- Словари — `packages/shared/src/i18n/uk.ts` и `en.ts`, список локалей — `i18n/locales.ts`. Публичный API `@eduforge/shared` не изменился: `getUI`, `UI`, `UiDict`, `LOCALES`, `DEFAULT_LOCALE`, `isAppLocale`, `APP_LOCALE` (сервер, тесты, мобильное приложение — без изменений).
- Для клиента добавлены subpath-экспорты `@eduforge/shared/i18n/locales`, `/i18n/uk`, `/i18n/en`. `apps/web/src/lib/locale-context.tsx` статически импортирует только `uk`, а `en` подгружает `import()` при выборе английского (пока грузится — остаются украинские строки, как и раньше до чтения `localStorage`).
- В клиентских компонентах брать строки из `useLocale().t`, **не** вызывать `getUI()` — он тянет оба словаря.
- В `packages/shared/package.json` стоит `"sideEffects": false`: модули пакета не выполняют ничего при импорте, и сборщик выбрасывает неиспользуемые.
- Делить словарь ещё и по разделам (`t.chess`, `t.admin`, …) не стали: `t` — один синхронный объект во всех компонентах, разбиение по разделам потребовало бы асинхронной загрузки на каждой странице.
- Большие файлы с данными контента (`packages/content`) не трогали — дёшево их не разделить.

## Ленивые тяжёлые библиотеки

| Библиотека | Как грузится |
| --- | --- |
| Monaco (`@monaco-editor/react`) | `components/monaco-editor.tsx` → `next/dynamic(() => import("./monaco-editor-inner"))`, `ssr: false` |
| Доска (`react-chessboard`) | `components/chessboard-lazy.tsx` → `next/dynamic`, `ssr: false` |
| `jspdf`, `html-to-image` | `lib/certificate-export.ts` — `await import(...)` внутри функций экспорта, только по нажатию «PNG/PDF» |
| `@sentry/nextjs` | только при заданном DSN (см. [error-tracking.md](error-tracking.md)) |

`themeColor` перенесён из `metadata` в `export const viewport` (`app/layout.tsx`) — Next 15 больше не выдаёт 92 предупреждения при сборке.

## Анализ бандла

```bash
pnpm --filter @eduforge/web analyze     # next build с ANALYZE=true (работает и на Windows)
# отчёты: apps/web/.next/analyze/client.html, nodejs.html, edge.html
```

`@next/bundle-analyzer` подключён в `next.config.ts` и включается только при `ANALYZE=true`.

## Размер первой загрузки (First Load JS, `next build`)

«До» — состояние до разделения упражнений/словарей и ленивого `jspdf` (26.11.2026), «после» — после. В среднем по 109 маршрутам: **250 → 143 kB**; самый тяжёлый маршрут теперь `/playground` — 203 kB (было 310). Общий для всех чанк — 106 → 107 kB.

Наибольшее снижение:

| Маршрут | До, kB | После, kB |
| --- | --- | --- |
| `/review/mixed` | 367 | 141 |
| `/review/mistakes` | 366 | 141 |
| `/certificates/[code]` | 391 | 171 |
| `/courses/[slug]/lessons/[lessonId]` | 376 | 156 |
| `/play/puzzles` | 366 | 153 |
| `/achievements` | 247 | 133 |
| `/admin` | 248 | 134 |
| `/admin/classroom` | 241 | 127 |
| `/admin/courses` | 248 | 134 |
| `/admin/engagement` | 241 | 127 |
| `/admin/feedback` | 247 | 133 |
| `/admin/parents` | 241 | 127 |
| `/admin/programming` | 241 | 127 |
| `/admin/security` | 248 | 134 |
| `/admin/users` | 249 | 135 |

Главные причины: словарь `en` больше не в общем бандле (−≈110 kB на всех страницах, где раньше вызывался `getUI`), упражнения грузятся по типам (урок, задачи, повторение ошибок), `jspdf`/`html-to-image` — только при экспорте сертификата.

Полные таблицы: `/workspace/chess-notes/work/next-build-before.txt` и `next-build-after.txt` (вне репозитория).
