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

## Размер первой загрузки (`pnpm --filter @eduforge/web build`, First Load JS)

| Маршрут | До | После разделения упражнений и словарей |
| --- | --- | --- |
| `/` | 244 kB | 144 kB |
| `/courses/[slug]/lessons/[lessonId]` | 376 kB | 155 kB |
| `/play/puzzles` | 366 kB | 152 kB |
| `/review/mistakes` | 366 kB | 140 kB |
| общий для всех | 106 kB | 106 kB |

Полные таблицы: `/workspace/chess-notes/work/next-build-before.txt`, `next-build-split.txt` (вне репозитория).
