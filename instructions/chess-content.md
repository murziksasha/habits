# Шахматный контент: контракт

Схемы упражнений — Zod в `packages/shared/src/exercises.ts`. Контент — `packages/content/src/chess.ts` и `packages/content/src/chess-upgrade/*`. Подробности — `SPEC/05-courses-and-content.md`, `SPEC/07-chess-realtime.md`, `SPEC/CHESS-DEEP-UPGRADE-PLAN.md`.

## Типы упражнений

| `type` | Ключевые поля |
| --- | --- |
| `chess_puzzle` | `fen`, `solutionSans` (ходы ученика и ответы соперника), `difficulty` 1–5, `goal` (`mate` / `win_material` / `draw` / `promote` / `best_move`), `acceptedAlternatives`, `alternativeLines` (≤3), `themes`, двухшаговая подсказка (`hintUk/En`, `hintSquare`, `hintPiece`), `explanationUk/En` + `explanationKind` (`template` / `authored`), `plyExplanations`, `source`, `rating` 400–3200, `reviewOf` |
| `chess_plan` | `fen`, ровно 3 `choices` (`san` + объяснение), `correctIndex` 0–2, `themes`, `source`, `reviewOf` |
| `chess_endgame_drill` | `fen`, `goal` (`win` / `draw` / `promote`), `maxMoves` 1–100, `botLevel` (`club` / `strong`), подсказка и объяснение uk/en, `source`. 18 упражнений, ID `ch-eg-*` (`chess-upgrade/endgame-drills.ts`) |
| `chess_lesson` | `fen`, `notesUk/En`, необязательный `quiz` |

Оценивает сервер (`gradeExercise` в `@eduforge/shared`). Новый тип упражнения: реестр в shared + Zod + контент + заметка в соответствующем `SPEC/`.

## Стабильные ID и правка на месте

- ID упражнений, уроков и юнитов **никогда** не переименовываются и не удаляются: на них завязаны прогресс, повторения (`exercise_reviews`), рейтинги задач (`chess_puzzle_stats`) и история попыток (`chess_puzzle_attempts`).
- Ошибочную задачу **исправляют на месте** (тот же ID, новый FEN/решение) — см. `chess-upgrade/fixes.ts`. Позиция в исправлении проверяется Stockfish так, чтобы ровно один ход вёл к цели.
- Повтор той же позиции допускается только с явным `reviewOf` (гейт в `chess-qa.test.ts`).
- Дебютные линии: `repertoireId` + `lineKey` хранятся в `chess_opening_lines` — ключи линий тоже стабильны.

## Импорт Lichess (CC0)

Источник — https://database.lichess.org/#puzzles (лицензия CC0).

1. `node scripts/chess-import/lichess-filter.mjs <lichess_db_puzzle.csv.zst> <out.csv>` — фильтр: RatingDeviation < 90, Popularity > 80, NbPlays > 1000, Rating 600–1900, не более 7 полуходов. Нужен Node 22.15+ (zstd в zlib).
2. `pnpm chess:import -- --csv <out.csv> [--depth 14] [--jobs 4]` (`--csv` указывать всегда: значение по умолчанию `/workspace/chess-data/filtered.csv` — путь из sandbox-окружения) (= `node scripts/chess-import/lichess-select.mjs`) — стабильный выбор (sha1 от PuzzleId + цель), дедупликация, каждая задача проходит те же QA-правила (`scripts/chess-qa/qa-puzzle.mjs`). `--only r:<id>,a:<lesson>` — перевыбрать только эти цели. Результат: `packages/content/src/expansion/chess-lichess.generated.ts`, ID `ch-li-*`, в `source` обязательна CC0-атрибуция (гейт).

## Рейтинги и повторения

- **Glicko-2** (`packages/shared/src/glicko2.ts`): рейтинг ученика в задачах против рейтинга задачи. Старт 1200, RD 350, volatility 0.06, τ = 0.5. Рейтинг партий — отдельный Elo (старт 1000, только рейтинговые партии людей).
- Подбор задач (`apps/api/src/services/chess-puzzles.ts`): режимы `mix` / `theme` / `mate` / `endgame` / `placement`; цель — рейтинг ученика −100; без повторов 14 дней; placement — 8 задач. Рейтинги задач пересчитываются ежедневно `POST /chess/puzzles/cron/rate` (`CRON_SECRET`).
- **Интервальные повторения** (`chessSrsNext`): лестница 1 / 3 / 7 / 21 день. Ошибка → интервал 1 день, повторения сбрасываются. Применяется к `chess_puzzle`, `chess_plan`, `chess_endgame_drill`, дебютным линиям и персональным задачам из своих партий.

## QA-гейты (CI, `pnpm --filter @eduforge/content test`)

- `chess-qa.test.ts`: свежая QA-запись у каждой задачи/плана, нет флагов движка, нет повторов без `reviewOf`, CC0-атрибуция и уникальные `ch-li` ID, свежие факты линий, ≥1 тема, двухшаговая подсказка и объяснение uk/en.
- `chess-openings.test.ts`: линии не хуже −60 cp.
- `chess-endgame-drills.test.ts`: стартовые оценки соответствуют цели.
- `chess-fen.test.ts`: легальность FEN и решений в глубоких юнитах (маты действительно матуют).

Изменил задачу → перезапусти соответствующий QA-скрипт ([stockfish.md](stockfish.md)) и закоммить `*.generated.ts` вместе с контентом.

Тексты для учеников — только uk + en, без русского.
