# Stockfish (`STOCKFISH_PATH`)

Stockfish — внешний UCI-движок. Он **не** нужен для запуска приложения, юнит-тестов и CI. Шахматный бот в `/play` — собственный (`packages/chess-core/src/bot.ts`), Stockfish ему не нужен.

## Кто использует `STOCKFISH_PATH`

| Где | Зачем | Без движка |
| --- | --- | --- |
| `apps/api/src/services/uci-engine.ts` | Минимальный UCI-клиент: один процесс на задачу анализа, каждый вызов с таймаутом | — |
| `apps/api/src/services/chess-game-analysis.ts` | Анализ сыгранных партий: метки blunder/mistake/inaccuracy, персональные задачи из своих ошибок (`chess_personal_puzzles`) | Помечаются только явные потери материала ≥300 cp (`possible_blunder`), персональные задачи **не** создаются |
| `scripts/chess-qa/engine.mjs` | Офлайн-QA контента (задачи, планы, дебюты, эндшпили), импорт Lichess | Скрипт падает с `Stockfish not found: set STOCKFISH_PATH` |

Анализ партий (подробно в `SPEC/07-chess-realtime.md`): 120 мс на позицию, лимит 30 с на партию; партии короче 20 полуходов пропускаются. Запуск: автоматически в фоне после завершения партии (очередь в процессе API) и cron `POST /chess/cron/analyze` (нужен `CRON_SECRET`, до 10 непроанализированных партий за вызов). Если путь задан, но неверный — анализ партии получает статус `failed`.

## Как API получает переменную

- `apps/api/src/env.ts` вызывает `loadRootEnv()` из `@eduforge/db` (`packages/db/src/load-env.ts`). Она читает **корневой** `.env` монорепозитория и заполняет `process.env` только для ключей, которых ещё нет. То есть `pnpm dev` / `tsx src/index.ts` подхватывают `STOCKFISH_PATH` из корневого `.env` автоматически. Переменная из шелла важнее `.env`.
- Это самописный парсер, не dotenv: строки `KEY=value`, `#`-комментарии, кавычки снимаются; `${VAR}` и `export` не поддерживаются. Путь можно писать без кавычек и с прямыми слешами.
- **Docker**: Stockfish 19 встроен в образ API (см. раздел «Docker» ниже), `STOCKFISH_PATH=/usr/local/bin/stockfish` задан и в образе, и в `docker-compose.yml` фиксированным значением (не из `.env` хоста, где у Саши Windows-путь).
- **Офлайн-скрипты `scripts/chess-qa/*` и `scripts/chess-import/*` `.env` НЕ читают.** Переменную надо задать в шелле. Без неё они ищут только Linux-пути `/usr/games/stockfish`, `/usr/bin/stockfish`, `/usr/local/bin/stockfish`.

## Windows (машина Саши)

- Движок: **Stockfish 19** (официальный релиз `sf_19`, архив `x86-64-universal`), лежит в
  `C:/tools/stockfish/stockfish/stockfish-windows-x86-64-universal.exe`.
- В корневом `.env` уже есть:

  ```
  STOCKFISH_PATH=C:/tools/stockfish/stockfish/stockfish-windows-x86-64-universal.exe
  ```

  Этого достаточно для API (`pnpm dev`).
- Для QA-скриптов в PowerShell:

  ```powershell
  $env:STOCKFISH_PATH = "C:/tools/stockfish/stockfish/stockfish-windows-x86-64-universal.exe"
  pnpm chess:qa
  ```

  (в PowerShell команды соединяются `;`, не `&&`).
- Проверить бинарник: запустить exe, ввести `uci` — должен ответить `uciok`, выйти `quit`.

## Docker

`docker/Dockerfile.api` содержит отдельную стадию `stockfish`:

- база `node:22-alpine` (та же, что у runner, — одинаковые musl и libstdc++);
- скачивает исходники официального тега `sf_19` с GitHub, проверяет SHA-256 (`STOCKFISH_SHA256`), собирает `make -C src build ARCH=…` (amd64 → `x86-64-sse41-popcnt`, arm64 → `armv8`, по `TARGETARCH`); NNUE-сеть скачивается Makefile'ом при сборке и вшивается в бинарник;
- runner копирует `/usr/local/bin/stockfish` и ставит `ENV STOCKFISH_PATH=/usr/local/bin/stockfish`.

Почему сборка из исходников: в Alpine пакет `stockfish` есть только в `edge/testing`, а официальные Linux-бинарники собраны под glibc и на musl не запускаются (даже с `gcompat` — `symbol not found`).

Нюансы:

- Первая сборка образа дольше (~0,5–3 мин на компиляцию, нужен доступ к github.com), образ API больше примерно на 100 МБ (бинарник с сетью).
- Сменить версию: `docker compose build --build-arg STOCKFISH_TAG=sf_XX --build-arg STOCKFISH_SHA256=<sha256 архива> api`.
- Проверить движок в контейнере: `docker compose exec api sh -c 'echo uci | $STOCKFISH_PATH'` — должен ответить `id name Stockfish 19` и `uciok`.

## Linux

```bash
sudo apt install stockfish      # бинарник /usr/games/stockfish
export STOCKFISH_PATH=/usr/games/stockfish
```

Для API можно прописать в корневой `.env`: `STOCKFISH_PATH=/usr/games/stockfish`.

## Офлайн-QA контента

CI Stockfish не запускает. Скрипты пишут `*.generated.ts` в `packages/content/src/`, эти файлы коммитятся, а vitest-гейты в `packages/content` их проверяют и падают, если контент изменился без перезапуска QA (хеш FEN + решения). Перед запуском собрать пакеты (см. [dev-and-testing.md](dev-and-testing.md)).

| Что | Команда | Результат | Гейт / порог |
| --- | --- | --- | --- |
| Задачи и планы (`chess_puzzle`, `chess_plan`) | `pnpm chess:qa` (полностью, `--depth 16 --jobs 4` по умолчанию), `pnpm chess:qa -- --incremental` (только изменённые), `pnpm chess:qa -- --only id1,id2 --report /tmp/qa.txt --dry` | `chess-qa.generated.ts` | `chess-qa.test.ts`: у каждой задачи свежая QA-запись, нет флагов движка (кроме явных waiver'ов). План: верный ход в пределах 40 cp от лучшего, каждый неверный хуже верного минимум на 80 cp |
| Дебюты | `pnpm --filter @eduforge/chess-core build && node scripts/chess-qa/opening-qa.mjs [--depth 20]` | `chess-openings-qa.generated.ts` | `chess-openings.test.ts`: финальная позиция каждой линии не хуже **−60 cp** за сторону репертуара (`MIN_CP = -60`; в исходном плане было −50) |
| Эндшпили | `pnpm --filter @eduforge/content build && node scripts/chess-qa/endgame-drill-qa.mjs [--depth 24]` | `chess-endgame-qa.generated.ts` | `chess-endgame-drills.test.ts`: win/promote ≥ +500 cp или мат, draw в пределах ±80 cp. Для сложных позиций (Lucena) нужна большая глубина, например `--depth 30` |
| Факты линий / подсказки (без движка) | `node scripts/chess-qa/chess-facts.mjs` | `chess-facts.generated.ts` | `chess-qa.test.ts` («line facts are fresh») |
| Подбор хода для `chess_plan` | `node scripts/chess-qa/plan-probe.mjs "<fen>" [depth]` | печатает оценку каждого хода | — |

Результаты зависят от версии движка и глубины. Записи в репозитории сделаны Stockfish 17.x на Linux; на Stockfish 19 оценки могут немного отличаться — перед коммитом смотреть дифф `*.generated.ts`.
