# Прокачка курсу «Шахи» — глибокий план (усі фази)

Дата: 2026-11-25 · Гілка аудиту: `seedFeat` (робоче дерево чисте) · Лог рішень: `.grill/chess-course-deep-upgrade.md`

## Мета

Перетворити курс «Шахи» з широкого, але неглибокого набору уроків на курс, який справді тренує гравця:

- задачі **коректні** (перевірені рушієм), грають як справжні шахи (суперник відповідає сам, будь-який виграшний хід зараховується), **пояснюють чому** і **повертаються**, якщо учень помилився;
- рейтинг задач і адаптивний підбір під рівень;
- власні партії (бот і онлайн) можна переглянути, а свої помилки — перетворити на задачі;
- окремі тренажери ендшпілю й дебютного репертуару;
- дошка та бот — на рівні сучасних шахових застосунків.

**Цільовий учень:** підліток або дорослий, який знає правила; сила до ~1400–1600 за рейтингом задач Lichess, складність 5 ≈ 1800. Мова інтерфейсу й контенту — українська + англійська. Курс лишається безкоштовним.

## Зміст

0. Виправлений аудит (реальний стан проти тверджень першого плану)
1. Фаза 1 — Рушій задач і коректність контенту
2. Фаза 2 — Контракт контенту: теми, підказки, пояснення
3. Фаза 3 — Рейтинг задач (Glicko-2), розміщення, адаптивність, шахове SRS
4. Фаза 4 — Новий контент: +250 задач Lichess (CC0), крива складності
5. Фаза 5 — Повний PGN, перегляд партії, помилки → особисті задачі, нічия
6. Фаза 6 — Тренажер ендшпілю
7. Фаза 7 — Тренажер дебютного репертуару
8. Фаза 8 — Дошка, UX, звуки, бот
9. Глобальний план перевірки
10. Розгортання і безпека прогресу
11. Зведена оцінка обсягу і залежностей

---

## 0. Виправлений аудит

Дані зібрано з `HEAD` гілки `seedFeat`, контент завантажено через `chessContent` (`packages/content/src/index.ts:78`: `chessRaw → expandChess → expandChessDeep → expandFoundationTransfer → normalizeCourseLocales`), кожен хід кожної задачі перевірено Stockfish 17.1 (~0,3 с на позицію).

### 0.1 Реальний стан проти першого плану

| Що | Перший план стверджував | Реальний стан | Де |
|---|---|---|---|
| Кількість задач | ~36 | **184** `chess_puzzle` (+148 `chess_lesson`, 311 `mcq`, 85 `explain`, 1 `concept`) | `packages/content/src/chess.ts`, `expansion/chess-exp.ts`, `expansion/chess-deep.ts` |
| Структура | — | 34 юніти, 189 уроків, 24 іспити | `SPEC/courses/chess.md`, `COURSE_PARTS` у `packages/shared/src/courses.ts` |
| Поле `theme` | «вже є в даних, тепер показуємо» | **Немає ніде** в даних | `packages/content/src/types.ts:101` |
| Пояснення до задач | «0, полів немає» | Поля `explanationUk/En` **є в TS-типі**, але використано 0 з 184; у Zod-схемі їх немає | `types.ts:101`, `packages/shared/src/exercises.ts:155` |
| Підказки | — | Загальна драбина підказок читає `hintUk || explanationUk` → для шахів порожньо | `apps/web/src/components/exercises.tsx:~180–215` |
| Відповідь суперника | «не відтворюється» | Гірше: у режимі `puzzle` `isMyTurn = true` завжди — **учень ходить за обидві сторони** і має вгадати книжковий захист (~47 багатоходових задач) | `chess-board-frame.tsx` (`isMyTurn`), `exercises.tsx:1718` |
| Перевірка розв'язку | — | Рядкове порівняння SAN по всій лінії (без `+/#`); інший мат = помилка; сервер робить так само | `exercises.tsx:1718`, `packages/shared/src/grade.ts:472`, `chess-core/src/index.ts` (`isPuzzleSolved`, `tryPuzzleMove`) |
| Промоція | «авто-ферзь, додати діалог» | Ферзь захардкоджено в **трьох** місцях: `autoPromoteToQueen`, `promotion: "q"` в `onDrop` задач і гри, `promotion: "q"` у сокет-події. 3 задачі Сааведри (`c8=R`) **нерозв'язні**, одна з них — іспит | `chess-board-frame.tsx`, `exercises.tsx`, `play-client.tsx:471,489` |
| Координати | `showBoardOrientation` | Такого пропа для координат немає; у v4 це `showBoardNotation` | react-chessboard ^4.7.2 |
| Нічия (draw offer) | у `apps/realtime/src/matchmaking.ts` | `matchmaking.ts` — лише чисті хелпери; всі сокет-обробники в `apps/realtime/src/index.ts` (775 рядків) | — |
| Web Worker для бота | «обов'язковий для Master» | **Вже є**: `apps/web/src/app/play/chess-bot-worker.ts` (лише для `strong`) | — |
| Історія ходів | «немає панелі» | Немає навіть стану: `play-client.tsx` тримає лише `fen`, сервер будує `new Chess(fen)` → **трикратне повторення ніколи не спрацьовує** ні з ботом, ні онлайн | `play-client.tsx`, `chess-core/src/index.ts` (`applyMove`), `realtime/src/index.ts:~605` |
| Тренер-підказка | — | `/coach/hint` вже є, але це **евристика глибини 2** (матеріал + мобільність), не Stockfish; `STOCKFISH_PATH` не підключено | `apps/api/src/routes/coach.ts`, `apps/api/src/stockfish-coach.ts` |
| Рейтинг | — | Elo лише для партій (K 40/32/20, старт 1000); **рейтингу задач немає**; матчмейкінг ігнорує Elo | `packages/shared/src/chess-rating.ts`, `realtime/src/matchmaking.ts` |
| SRS | — | Є загальний «зошит помилок» на рівні вправ (`exercise_reviews`: ease, intervalDays, repetitions, lapses, dueAt) і `spaced-due.ts` (1–14 днів для уроків). Не знає тем | `packages/db/src/schema/tables.ts:1162`, `apps/api/src/routes/review.ts`, `apps/api/src/services/spaced-due.ts` |
| XP | «підказка знижує XP як у logic» | `chessPuzzleXpAward = 5 + 5·difficulty + 5`; підказки на XP шахів не впливають | `packages/shared/src/xp.ts:106`, `apps/api/src/services/submit-lesson.ts:546` |
| Бот | «немає quiescence» | Так: learner (1 напівхід, 25% випадкових), club (глибина 2, 35% другий найкращий), strong (глибина 3); PST + матеріал + мобільність; книга дебютів — 5 позицій | `packages/chess-core/src/bot.ts` |
| Тести контенту | — | Лише легальність SAN і «мат справді мат» | `packages/content/src/chess-fen.test.ts`, `scripts/gen-expansion/deep/validate_fens.mjs` |

### 0.2 Розподіл задач

- Складність: d1 = 12, d2 = 66, d3 = 81, d4 = 21, **d5 = 4** (важких лише 25).
- Довжина лінії: 1 напівхід — 137, 3 — 43, 5 — 2, 9 — 2. Білі ходять у 145, чорні в 39.
- Завершення лінії: мат — 63, шах — 17, тиха позиція — 104.
- 6 юнітів `chess-exp.ts` (30 уроків) — **0 задач**, лише `chess_lesson` + `mcq`.
- ~45 груп однакових FEN: іспити глибоких юнітів повторюють задачі з уроків (напр. `ch-d-lucena-p1` = `ch-deep-rook-theory-exam-p5`). Унікальних позицій ≈130.
- Переклад: `rook-endgames-plus` має назву «**Туристичні** ендшпілі» → «Турові ендшпілі».

### 0.3 Зламані задачі (підтверджено Stockfish)

| ID | Проблема | Дія у Фазі 1 |
|---|---|---|
| `ch-d-ep-promote-p2`, `ch-d-compare-lines-p1`, `ch-deep-calc-viz-exam-p5` | Розв'язок `c8=R`, UI дозволяє лише ферзя → нерозв'язні | Вибір промоції; іспит отримує унікальну позицію |
| `ch-d-triangulate-p1` | Лінія вимагає помилки чорних (Kd7; Kd6 тримає нічию), а Ke5 виграє одразу (+7,3) | Нова позиція на тріангуляцію |
| `ch-d-rook-pawn-p1`, `ch-deep-kp-theory-exam-p6` | Тема «захист проти крайнього пішака», а пішак на **g2**; захист у кутку програє (−5…−7) | Перенести пішака на h-вертикаль, перевірити нічию |
| `ch-tct-13` | «Прорив e4» віддає виграш; правильно Kf2 | Перевизначити розв'язок або позицію |
| `ch-tp2-4` | «Знайди вилку конем» Nxe5 у «двох конях» — не вилка, не в топ-3 | Нова позиція з реальною вилкою |
| `ch-d-greek-gift-p1/p2`, `ch-d-bxh7-p1`, `ch-deep-attack-king-exam-p6` | Bxh7+ і Ng5+ не в топ-3; у чорних бракує фігур (білі вже +5…+6) | Замінити реальними партіями, ті самі ID |
| `ch-d-quiet-sac-p1`, `ch-d-interference-p1`, `ch-d-remove-guard-p1`, `ch-d-exchange-sac-p1`, `ch-d-decoy-p1`, `ch-d-quiet-p1` | Розв'язок не в топ-3, інші ходи виграють простіше | Виправити позицію або замінити реальною |
| `ch-d-xray-p1`, `ch-deep-tactics-hidden-exam-p4` | «Мат після Qxd8» — чорні не зобов'язані брати (Kf8) | `goal: win_material`, захист = найкращий захист |
| `ch-d-kbn-mate-p1`, `ch-d-mix-exam-prep-p1`, `ch-d-attraction-p2` | Сценарний захист іде в мат в 1, хоча є кращий | Захист = найкращий за рушієм |
| `ch-transfer-mate-check-p1` | 3 мати в 1 (Qd8#, Qf8#, Qxg7#), зараховується один | `acceptedAlternatives` |
| `ch-d-queen-pawn7-p2` | Qh1# і Qf1# | `acceptedAlternatives` |
| `ch-d-damiano-lolli-p2`, `ch-d-mate-two-p2`, `ch-d-attraction-p2` | Фінал Qg7# або Qf8# / Qxg7# або Qe8# | `acceptedAlternatives` |
| `ch-d-queen-pawn7-p1` | Розв'язок — мат у 4, є мат у 2 | Приймати обидва (`goal: mate`) |
| `ch-d-clearance-p1/p2`, `ch-d-mix-disc-p1/p2`, `ch-d-greek-gift-p1/p2` | Один FEN, різні «книжкові» відповіді суперника — учень має вгадати | Злиття в одну задачу з авто-відповіддю; друга ID стає варіантом іншої позиції |
| Тематичні ходи (Najdorf Nd5, Maróczy d5, Dragon Rxc3, міноритарна b4, `ch-d-sic-najdorf-p1` −4,4 через відсутні фігури тощо, ~30 шт.) | Не найкращі за рушієм, позиції штучні | Конвертувати в `chess_plan` |

---
## 1. Фаза 1 — Рушій задач і коректність контенту

**Мета:** кожна задача розв'язна, грається як шахи (суперник відповідає сам), приймає будь-який хід, що досягає мети, і пройшла перевірку рушієм. Без цієї фази решта плану будує на хибному фундаменті.

### 1.1 Контракт задачі (мінімум для Фази 1)

`packages/content/src/types.ts:101` і Zod у `packages/shared/src/exercises.ts:155`:

```ts
{
  id: string;
  type: "chess_puzzle";
  promptUk: string; promptEn?: string;
  fen: string;
  solutionSans: string[];            // головна лінія: хід учня, відповідь суперника, хід учня…
  difficulty: 1 | 2 | 3 | 4 | 5;
  goal?: "mate" | "win_material" | "draw" | "promote" | "best_move"; // за замовчуванням: виводиться QA-скриптом
  acceptedAlternatives?: Record<number, string[]>; // індекс напівходу учня → інші прийнятні SAN
  goalThresholdCp?: number;          // для win_material: мінімальна перевага після лінії (за замовчуванням 200)
}
```

- `acceptedAlternatives` рахує **офлайн** QA-скрипт (1.5) і записує в контент; рантайм не запускає рушій.
- Якщо учень зіграв альтернативу, далі лінія продовжується з **головної гілки, якщо позиція збігається**, інакше задача зараховується як розв'язана (для `mate` — якщо альтернатива ставить мат одразу або веде до форсованого мату, зафіксованого в `alternativeLines`, див. нижче).
- Для багатоходових альтернатив (рідко) додаткове поле `alternativeLines?: string[][]` — повні лінії, теж згенеровані скриптом. Обмеження: ≤3 альтернативні лінії на задачу.

### 1.2 Авто-відповідь суперника

**`apps/web/src/components/exercises.tsx:1718` (`ChessPuzzleExercise`)**

- Сторона учня = `turn()` стартового FEN (`viewer`). Після правильного ходу учня, якщо в лінії є наступний напівхід, через ~500 мс застосувати хід суперника з `solutionSans[i+1]` (з анімацією react-chessboard `animationDuration={200}`), потім чекати хід учня.
- Поки грає «суперник» — дошка неінтерактивна (`interactive={false}`).
- Хибний хід: як зараз `onWrongAttempt()` + повідомлення, але **відкат лише останнього ходу**, а не всієї лінії (менше покарання за довгі лінії). Повне скидання лишається на кнопці «Почати знову».
- Відповідь на `onAnswer` містить лише ходи учня + фактичну лінію: `{ solved, sans: fullLine, playerSans, alternativesUsed }`.

**`apps/web/src/components/chess-board-frame.tsx`**

- `isMyTurn` у режимі `puzzle`: `turn === viewer` (замість `true`). Учень більше не може рухати фігури суперника.
- Нові пропси: `lastMove?: { from; to } | null` (використовується і тут, і у Фазі 8).

**`packages/chess-core/src/index.ts`**

- Нова чиста функція `evaluatePuzzleMove(puzzle, playedSans, move): { ok: true; nextOpponentSan?: string; done: boolean } | { ok: false }` — одна логіка для клієнта і сервера.
- `isPuzzleSolved` / `tryPuzzleMove` переписати поверх неї (зберегти експорти для сумісності).

**Сервер: `packages/shared/src/grade.ts:472`**

- `case "chess_puzzle"`: замість порівняння масивів — програти `sans` через chess.js від `fen`, на кожному напівході учня приймати `solutionSans[i]` або `acceptedAlternatives[i]`, ходи суперника мають збігатися з лінією, для `goal: "mate"` фінальна позиція — мат. Нелегальні ходи → `correct: false`.
- Валідатор: `@eduforge/shared` зараз залежить лише від `zod`, а `@eduforge/chess-core` — лише від `chess.js` (на `shared` не посилається), тож циклу немає. **Рекомендація:** додати `@eduforge/chess-core` у залежності `@eduforge/shared`, і `grade.ts` викликає `evaluatePuzzleMove`. Перевірити збірку `apps/mobile` і гостьовий шлях (`apps/api/src/services/guest-submit.test.ts`), якщо вони імпортують `grade.ts`.

### 1.3 Вибір фігури при промоції

- `chess-board-frame.tsx`: прибрати `autoPromoteToQueen={true}`; увімкнути `showPromotionDialog` / `promotionDialogVariant="modal"` (API v4) та обробити `onPromotionPieceSelect`. Для click-to-move: якщо хід — промоція, показати той самий діалог перед `onMove`.
- Сигнатура: `onMove?: (from: string, to: string, promotion?: "q" | "r" | "b" | "n") => boolean`.
- `exercises.tsx` (`onDrop` задачі), `apps/web/src/app/play/play-client.tsx:471` (бот) і `:489` (онлайн-сокет `move`) — передавати вибрану фігуру замість `"q"`.
- `apps/realtime/src/index.ts` (обробник `move`, ~рядок 543–620): `applyMove` вже приймає `promotion` і валідує набір `q/r/b/n` — лише перестати підставляти `"q"` на клієнті. Онлайн-ігри: правило з `.grill/chess-board-check-dots.md` («promotion sent to the server stays "q"») **скасовується** цим рішенням.
- Задачі Сааведри: `ch-d-ep-promote-p2`, `ch-d-compare-lines-p1` — розв'язні після зміни; `ch-deep-calc-viz-exam-p5` отримує іншу позицію з недопромоцією (див. 1.7).

### 1.4 Новий тип `chess_plan`

Для «тематичних» ходів, де йдеться про ідею, а не про форсовану лінію.

```ts
{
  id: string;
  type: "chess_plan";
  promptUk: string; promptEn?: string;
  fen: string;
  options: Array<{ san: string; explanationUk: string; explanationEn?: string }>; // рівно 3
  correctIndex: number;
  themes?: string[];
}
```

- Зміни: `types.ts` (union), `shared/src/exercises.ts` (Zod + `EXERCISE_TYPES` рядок 15), `shared/src/grade.ts` (як `mcq`), `shared/src/courses.ts:1215` (тип), `shared/src/ux.ts:239` (мітка «Шаховий план» / «Chess plan»), `apps/web/src/components/exercises.tsx` (новий `ChessPlanExercise`: дошка в режимі `explore`, три кнопки з ходами; після вибору — стрілка ходу на дошці (`customArrows` у v4) і пояснення **кожного** варіанта), адмін-конструктор `apps/web/src/components/admin/exercise-builder.tsx`, XP у `submit-lesson.ts:546` (як звичайна вправа, 8 XP).
- Кандидати на конвертацію (~30): усі «thematic»-задачі з `ch-deep-italian-ruy`, `-qg-london`, `-sicilian-french`, `-caro-kid`, `-planning`, `-minor-pieces`, `-pawn-play`, а також `ch-d-karpov-model-p1`, `ch-d-prophylaxis-p1`, `ch-d-two-weaknesses-p1`, `ch-d-space-p1`, `ch-d-hanging-p1`, `ch-d-sic-najdorf-p1`, `ch-d-sic-dragon-p1`, `ch-d-activity-material-p1` (+ їхні іспитові копії). ID **не змінюються**; змінюється `type`. Прогрес: `exercise_reviews` зберігається за `exerciseId`, тип не важливий.
- Позиції з «вирізаними» фігурами замінюються на реальні позиції з партій/теорії (FEN з повної партії).

### 1.5 Офлайн QA-скрипт Stockfish + гейт у vitest

**Новий:** `scripts/chess-qa/run-stockfish-qa.mjs` (Node 22+, `chess.js`, Stockfish через `STOCKFISH_PATH`, MultiPV 3, `movetime` або `depth 20`; **окремий процес на позицію з таймаутом** — Stockfish 17.1 зависає на деяких позиціях з `movetime`, перевірено на `ch-p9`).

Для кожної задачі й кожного напівходу:

| Перевірка | Правило |
|---|---|
| Хід учня найкращий | хід = найкращий, або в межах `margin` (мат: та сама або швидша дистанція; інакше ≤50 cp від найкращого при оцінці ≥ +200) |
| Унікальність ключового ходу | другий найкращий гірший щонайменше на 150 cp (якщо обидва «виграють» > +500 — дозволено, записується в `acceptedAlternatives`) |
| Альтернативні мати | усі мати в 1 у позиції потрапляють у `acceptedAlternatives` |
| Захист = найкращий | хід суперника — найкращий за рушієм (або в межах 30 cp) |
| Задачі на захист | для `goal: "draw"` оцінка після лінії в межах ±80 cp |
| Неправдоподібний матеріал | «вирізані» фігури: матеріал однієї сторони без пояснення різниці ≥ 5 пішаків при стартовій структурі → прапорець |
| Мета | `goal` відповідає фіналу лінії (мат, ≥ `goalThresholdCp`, промоція) |

Вихід: `packages/content/src/chess-qa.generated.json` (комітиться): для кожного ID — `{ goal, acceptedAlternatives, alternativeLines, evalAfter, flags[] }` + версія рушія і хеш FEN.

**Гейт:** розширити `packages/content/src/chess-fen.test.ts` (або новий `chess-qa.test.ts`):

- кожна `chess_puzzle` має запис у `chess-qa.generated.json` з тим самим хешем FEN + `solutionSans` (застарілий QA → тест падає);
- `flags` порожні або явно дозволені полем `qaWaivers` з причиною;
- жодна задача уроку не має FEN, що повторюється в іспиті того ж юніту (1.7);
- легальність і «мат — це мат» (існуюче) лишаються.

CI не запускає Stockfish (швидко й детерміновано); скрипт запускається локально/на боксі при зміні контенту: `pnpm chess:qa`.

### 1.6 Виправлення контенту (ті самі ID)

Файли: `packages/content/src/chess.ts`, `expansion/chess-deep.ts`, `expansion/chess-exp.ts`, `locale/chess.ts` (англ. збагачення).

- Усі пункти з таблиці 0.3. Принцип: **виправити позицію/лінію на місці**; якщо позиція безнадійна (Greek gift, штучні позиції) — **замінити реальною позицією з партії** з тим самим ID, `source` (Фаза 2) з назвою партії.
- Задачі з однаковим FEN і різною відповіддю суперника (`ch-d-clearance-p1/p2`, `ch-d-mix-disc-p1/p2`, `ch-d-greek-gift-p1/p2`): перша — з авто-відповіддю найкращим захистом; друга отримує **іншу позицію** на ту саму тему.
- Задача «захист проти крайнього пішака»: пішак на h-вертикалі, ціль `draw`.
- `ch-tct-13`: або розв'язок Kf2 (опозиція), або нова позиція, де прорив справді працює.

### 1.7 Дедуплікація FEN іспитів

- ~45 груп повторів. Іспит (`*-exam-p*`) отримує нову позицію на ту ж тему (з Фази 4 — з пулу Lichess того ж тематичного тегу й діапазону рейтингу).
- Повтори між уроками (`ch-p1`, `ch-p11`, `ch-tp2-2` тощо) — дозволені лише як явні «повторення» з позначкою `reviewOf: <id>`; інакше — нова позиція.

### Тести і критерії приймання

- Unit (`packages/chess-core/src/index.test.ts`): `evaluatePuzzleMove` — правильний хід, альтернатива, альтернативний мат, хибний хід, промоція в тура/коня, хід за суперника відхиляється.
- `packages/shared` (`grade.test.ts` в `apps/api/src/grade.test.ts`): сервер приймає альтернативний мат `ch-transfer-mate-check-p1`, `c8=R` у Сааведрі; відхиляє підроблену лінію з нелегальним ходом.
- e2e (`apps/web/e2e/chess-learning-hints.spec.ts` + новий `chess-puzzle-engine.spec.ts`): багатоходова задача — суперник ходить сам через ~500 мс; учень не може тягнути фігури суперника; діалог промоції з'являється; Сааведра розв'язується.
- Гейт QA зелений: 0 прапорців без `qaWaivers`.
- Критерій: **0 нерозв'язних задач, 0 задач, де учень ходить за суперника, 0 відомих хибних ліній**.

### Ризики

- Пересинхронізація контенту з новим `type: "chess_plan"` — старі відповіді в історії мають інший формат (`{ sans }` vs індекс). Рішення: grader для історичних записів не перераховується; лише нові спроби.
- Stockfish на різних машинах дає трохи різні оцінки → поріг margin і хеш версії рушія в JSON.
- Нова залежність `shared → chess-core` збільшує бандл тих клієнтів, що імпортують `shared` без шахів (chess.js ≈ 30 КБ min). Перевірити розмір бандла `apps/web`; за потреби — окремий вхід `@eduforge/shared/grade-chess`.

### Залежності

Немає (перша фаза). Фази 2–4 залежать від неї.

### Обсяг

~700 рядків коду (рушій задач, діалог промоції, `chess_plan`, grader, QA-скрипт, тести) + ~60 виправлених/замінених задач і ~30 конвертацій у `chess_plan`. **≈ 8–10 робочих днів.**

---
## 2. Фаза 2 — Контракт контенту: теми, підказки, пояснення

**Мета:** кожна задача знає свої тактичні теми, має двоступеневу підказку і пояснення; учень бачить тему, складність і розбір після розв'язання.

### 2.1 Повний контракт `chess_puzzle`

```ts
{
  // …поля з Фази 1
  themes: ChessThemeKey[];                 // ≥1, ключі в стилі Lichess
  hintUk?: string; hintEn?: string;        // крок 1: яка фігура («Подивіться на коня на e5»)
  hintSquareUk?: string; hintSquareEn?: string; // крок 2: яке поле / який хід-ідея
  explanationUk?: string; explanationEn?: string; // загальний розбір
  plyExplanations?: Array<{ ply: number; uk: string; en?: string }>; // необов'язкові коментарі до напівходів
  source?: { kind: "game" | "lichess" | "composed" | "theory"; white?: string; black?: string; year?: number; event?: string; lichessId?: string };
  rating?: number;                         // початковий рейтинг задачі (Фаза 3)
}
```

- `packages/content/src/types.ts:101` + Zod `packages/shared/src/exercises.ts:155` (усі нові поля опціональні, крім `themes` — обов'язкове після тегування; спочатку опціональне, гейт у тесті).
- `explanationUk/En` вже є в TS-типі — лише додати в Zod.

### 2.2 Словник тем

**Новий:** `packages/shared/src/chess-themes.ts`

- `CHESS_THEMES: Record<ChessThemeKey, { uk: string; en: string; group: "tactic" | "mate" | "endgame" | "opening" | "strategy" }>`.
- Ключі як у Lichess (полегшує імпорт Фази 4): `fork`, `pin`, `skewer`, `discoveredAttack`, `doubleCheck`, `deflection`, `attraction`, `interference`, `clearance`, `xRayAttack`, `zwischenzug`, `overloading`, `capturingDefender`, `trappedPiece`, `hangingPiece`, `sacrifice`, `quietMove`, `defensiveMove`, `backRankMate`, `smotheredMate`, `anastasiaMate`, `arabianMate`, `bodenMate`, `doubleBishopMate`, `dovetailMate`, `hookMate`, `mateIn1`…`mateIn5`, `promotion`, `underPromotion`, `advancedPawn`, `pawnEndgame`, `rookEndgame`, `bishopEndgame`, `knightEndgame`, `queenEndgame`, `opposition` (власний), `triangulation` (власний), `lucena` (власний), `philidor` (власний), `vancura` (власний), `opening`, `middlegame`, `endgame`, `crushing`, `advantage`, `equality`.
- Українські терміни: «Вилка», «Зв'язка», «Наскрізний удар», «Відкритий напад», «Подвійний шах», «Відволікання», «Заманювання», «Перекриття», «Звільнення лінії», «Рентген», «Проміжний хід», «Перевантаження», «Знищення захисника», «Фігура в пастці», «Мат на останній горизонталі», «Спертий мат», «Мат Анастасії», «Арабський мат», «Недопромоція», «Пішаковий ендшпіль», «**Туровий ендшпіль**», «Опозиція», «Тріангуляція», «**Позиція Лусени**», «Позиція Філідора», «Позиція Ванкури». Жодних русизмів («ладейний», «Лучена»).

### 2.3 Тегування всіх 184 задач

- Напівавтоматично: скрипт `scripts/chess-qa/suggest-themes.mjs` пропонує теми за ознаками (мат у N, вилка — фігура атакує ≥2 цінніші цілі після ходу, зв'язка, промоція, тип ендшпілю за матеріалом); автор підтверджує вручну.
- Гейт: кожна `chess_puzzle` має ≥1 тему зі словника.

### 2.4 Інтерфейс задачі

`apps/web/src/components/exercises.tsx` (`ChessPuzzleExercise`):

- Над дошкою: бейджі тем (локалізовані з `CHESS_THEMES`; **приховані до розв'язання** в режимі «тренування без підказок» та в іспитах, показані в уроках-навчанні) + зірочки складності (новий `apps/web/src/components/difficulty-stars.tsx`).
- Підказка: кнопка «Підказка» з'являється після першої хибної спроби (або одразу в уроках d1–d2). Крок 1 — `hintUk` (фігура) + підсвітка фігури; крок 2 — `hintSquareUk` + підсвітка поля. Підключити до існуючої драбини підказок (`AssistanceCtx.onHintUsed`, `exercises.tsx:~180–215`), щоб використання фіксувалося.
- Після розв'язання — панель «Розбір»: `explanationUk/En`, коментарі до напівходів, джерело (партія, рік). Кнопка «Переглянути розв'язок» — програє лінію з анімацією.
- Після 3 хибних спроб — «Показати розв'язок» (задача зараховується як нерозв'язана і йде в SRS, Фаза 3).
- Рядки UI — `packages/shared/src/i18n.ts` (`t.chess.hint`, `t.chess.explanation`, `t.chess.showSolution`, `t.chess.replaySolution`, `t.chess.source`, …).

### 2.5 XP і підказки

- `packages/shared/src/xp.ts:106`: `chessPuzzleXpAward(difficulty, firstClear, hintsUsed: 0 | 1 | 2, revealed: boolean)` — крок 1 підказки −30%, крок 2 −60%, показ розв'язку → 0 XP.
- `apps/api/src/services/submit-lesson.ts:546`: передавати `hintsUsed` з відповіді (`onAnswer({ …, hintsUsed })`); сервер обмежує значення 0–2.
- Таланти наставника (`mentorRank`) лишаються, як для інших курсів.

### 2.6 Пояснення

- ~80 рукописних пояснень (усі d4–d5, усі задачі іспитів, усі «знамениті партії»), двомовні.
- Решта — шаблонні пояснення за темою: `packages/content/src/chess-explanation-templates.ts` (`buildExplanation(theme, lineFacts)`; факти рахує QA-скрипт: яка фігура ходила, що атакує, який матеріал виграно). Позначка `explanationKind: "template" | "authored"` для подальшої заміни.
- Назва юніту `rook-endgames-plus`: «Туристичні ендшпілі» → **«Турові ендшпілі»** (`chess-exp.ts`).

### Тести і критерії приймання

- `chess-themes.test.ts` у `packages/shared`: усі ключі мають `uk` і `en`; немає заборонених слів («ладейн», «Лучен»).
- Гейт контенту: 184/184 задачі мають `themes`; d4–d5 та іспити мають `explanationUk` і `explanationEn` типу `authored`.
- `apps/api/src/grade.test.ts` / `submit-lesson.test.ts`: XP зменшується з підказками, 0 після показу розв'язку.
- e2e: бейдж теми видно, підказка підсвічує фігуру, потім поле; панель розбору відкривається.

### Ризики

- Обсяг текстів (≈160 рукописних абзаців uk+en) — найдорожча частина. Шаблони зменшують, але якість шаблонів треба перевірити на 20 задачах.
- Показ теми до розв'язання підказує відповідь → правило «приховано в іспитах і режимі тренування».

### Залежності

Фаза 1 (контракт, QA-факти для шаблонів).

### Обсяг

~400 рядків коду + ~1500 рядків контенту (теги, підказки, пояснення). **≈ 6–8 днів.**

---

## 3. Фаза 3 — Рейтинг задач (Glicko-2), розміщення, адаптивність, шахове SRS

**Мета:** кожен учень має рейтинг задач, кожна задача — свій рейтинг; підбір задач під рівень; пропущені задачі й теми повертаються за розкладом.

### 3.1 Рейтинг

- **Новий:** `packages/shared/src/glicko2.ts` — чиста реалізація Glicko-2 (rating, RD, volatility; τ = 0,5; оновлення після кожної задачі як «партії» між учнем і задачею). Окремо від `chess-rating.ts` (Elo партій лишається як є).
- Стартові значення учня: 1200 / RD 350. Задачі: з `rating` контенту (Lichess — їхній рейтинг; власні — з `difficulty`: d1 ≈ 800, d2 ≈ 1050, d3 ≈ 1300, d4 ≈ 1550, d5 ≈ 1800), RD 150.
- Результат: розв'язано з першої спроби без підказок = 1; з підказкою/другою спробою = 0,5 (лише для рейтингу учня, рейтинг задачі оновлюється як поразка задачі з вагою 0,5); показ розв'язку = 0.
- Рейтинг задач оновлюється лише за першою спробою кожного учня і лише після накопичення (батч раз на добу), щоб уникнути маніпуляцій.

### 3.2 БД (міграція `packages/db/drizzle/0042_chess_puzzle_rating.sql` + `packages/db/src/schema/tables.ts`)

```sql
CREATE TABLE chess_puzzle_ratings_user (
  user_id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  rating real NOT NULL DEFAULT 1200,
  rd real NOT NULL DEFAULT 350,
  volatility real NOT NULL DEFAULT 0.06,
  attempts integer NOT NULL DEFAULT 0,
  placed boolean NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE chess_puzzle_stats (
  exercise_id varchar(128) PRIMARY KEY,
  rating real NOT NULL, rd real NOT NULL DEFAULT 150,
  attempts integer NOT NULL DEFAULT 0, first_try_solves integer NOT NULL DEFAULT 0
);
CREATE TABLE chess_puzzle_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  exercise_id varchar(128) NOT NULL,
  lesson_id uuid REFERENCES lessons(id) ON DELETE SET NULL,
  result real NOT NULL, hints_used smallint NOT NULL DEFAULT 0,
  themes text[] NOT NULL DEFAULT '{}',
  rating_before real, rating_after real,
  ms_spent integer, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX chess_puzzle_attempts_user_idx ON chess_puzzle_attempts(user_id, created_at DESC);
```

- `chess_puzzle_stats` заповнюється з контенту в `packages/db/src/sync-content.ts` (лише вставка нових, наявні рейтинги не перезаписуються).

### 3.3 Розміщення (placement)

- Існуючий механізм `apps/api/src/services/course-placement.ts` для шахів будує банк з MCQ ранніх юнітів. Додати **шаховий тест розміщення з задач**: 8–10 задач адаптивно (старт 1200, крок за Glicko), результат — рейтинг + рекомендований юніт (`COURSE_PARTS` у `shared/src/courses.ts`).
- Учень може пропустити розміщення (рейтинг 1200, RD 350).

### 3.4 Адаптивний підбір

- **Новий режим «Тренування задач»** (`apps/web/src/app/play/puzzles/…` або вкладка в `/play`): наступна задача з пулу (усі `chess_puzzle` курсу + імпорт Фази 4) з рейтингом у вікні `[R − 150, R + 200]`, перевага темам з найнижчою точністю учня, без повторів за 14 днів (крім SRS).
- Режими: «Мікс», «Тема» (фільтр за `themes`), «Мат у N», «Ендшпіль».
- API: `apps/api/src/routes/chess.ts` — `GET /chess/puzzles/next?theme=`, `POST /chess/puzzles/:id/attempt`, `GET /chess/puzzles/rating/me`, `GET /chess/puzzles/themes/me` (точність по темах).
- Уроки курсу лишаються фіксованими (послідовність навчання), адаптивність — у тренуванні та повтореннях.

### 3.5 Шахове SRS поверх `exercise_reviews`

- Таблиця `exercise_reviews` (`tables.ts:1162`) лишається єдиним джерелом; для шахових задач розклад фіксований: **1 → 3 → 7 → 21 день**, помилка — назад на 1 день (`lapses + 1`).
- `apps/api/src/services/spaced-due.ts` + `apps/api/src/routes/review.ts`: функція `chessReviewIntervalDays(repetitions)`; у `/review/mistakes` шахові задачі використовують її замість SM-2.
- **Сиблінги теми:** при помилці в задачі з темою T додати до черги на завтра 1–2 інші задачі з темою T і рейтингом ±150 (з тренувального пулу), позначка `reason: "theme_sibling"` (новий код у `apps/api/src/services/review-queue.ts` → `ReviewReasonCode`).
- Особисті задачі з партій (Фаза 5) потрапляють у ту саму чергу.

### Тести і критерії приймання

- `glicko2.test.ts`: еталонні значення зі статті Glickman (приклад з 3 суперниками).
- `apps/api` інтеграційні: спроба оновлює рейтинг учня; рейтинг задачі — лише в батчі; повторна спроба тієї ж задачі не змінює рейтинг задачі.
- `spaced-due.test.ts`: інтервали 1/3/7/21, скидання при помилці.
- Критерій: після 30 задач RD учня < 120; точність тренування утримується в 55–75%.

### Ризики

- Холодний старт рейтингів власних задач → стартові рейтинги з `difficulty`, калібрування після ~50 спроб.
- Навантаження: адаптивний вибір — індекс за рейтингом + кеш пулу в пам'яті API.

### Залежності

Фаза 2 (`themes`, `rating`). Фаза 4 збільшує пул.

### Обсяг

~900 рядків (Glicko, міграція, API, режим тренування, SRS-зміни, тести). **≈ 7–9 днів.**

---

## 4. Фаза 4 — Новий контент: +250 задач Lichess (CC0) і крива складності

**Мета:** 4–6 задач на кожен навчальний урок, рівна крива d1 → d5 у межах цільового діапазону (до ~1600, d5 ≈ 1800), знамениті комбінації — лише з реальних партій.

### 4.1 Конвеєр імпорту

**Новий:** `scripts/chess-import/lichess-puzzles.mjs`

1. Джерело: `lichess_db_puzzle.csv.zst` (database.lichess.org, ліцензія **CC0**). Поля: `PuzzleId, FEN, Moves, Rating, RatingDeviation, Popularity, NbPlays, Themes, GameUrl, OpeningTags`.
2. **Важливо:** FEN у CSV — позиція **до** першого ходу суперника; перший хід з `Moves` застосувати, і лише тоді позиція — старт задачі. Решта ходів (UCI) → SAN.
3. Фільтри: `RatingDeviation < 90`, `Popularity > 80`, `NbPlays > 1000`, рейтинг 600–1900, довжина лінії ≤ 7 напівходів (≤ 4 ходи учня), без тем, що не відповідають уроку.
4. Відбір за темою уроку: мапа `lesson slug → themes[] + діапазон рейтингу` (`scripts/chess-import/lesson-theme-map.json`).
5. Прогін через QA-скрипт Фази 1 (обов'язково: Lichess-задачі теж мають дублікати ходів і альтернативні мати).
6. Генерація TS: `packages/content/src/expansion/chess-lichess.ts` (стабільні ID `ch-li-<PuzzleId>`), `source: { kind: "lichess", lichessId }`, `themes` з CSV (ті самі ключі), `rating` з CSV, `difficulty` з рейтингу.
7. Атрибуція в UI не обов'язкова (CC0), але показуємо «Задача з бази Lichess» з посиланням на `GameUrl`.

### 4.2 Розподіл

- Ціль: **+250** задач → разом ~430. Кожен навчальний урок (`isExam: false`) у юнітах тактики, матів, ендшпілю — 4–6 задач; юніти `chess-exp.ts` (зараз 0 задач) — по 2–4 задачі на урок або `chess_plan`.
- Крива: у межах кожної частини `COURSE_PARTS` складність зростає d1 → d5; середній рейтинг юніту монотонно зростає (гейт у тесті: допуск 50).
- Ціль розподілу після фази: d1 ≈ 10%, d2 ≈ 25%, d3 ≈ 30%, d4 ≈ 25%, d5 ≈ 10%.
- Іспити: лише задачі, яких немає в уроках (гейт 1.7).

### 4.3 Пояснення

- ~80 рукописних (Фаза 2) охоплюють і нові d4–d5. Решта — шаблони за темою + факти лінії з QA.
- Для Lichess-задач без рукописного пояснення — шаблон + «Ключова ідея: <тема>».

### 4.4 Знамениті комбінації (реальні партії)

Окремий юніт/оновлення `ch-deep-famous-1/2`: позиції беруться з повних PGN партій (FEN генерується скриптом з PGN, а не вручну):

- Андерсен — Кізерицький, 1851 («Безсмертна»); Андерсен — Дюфрень, 1852 («Вічнозелена»); Морфі — герцог Брауншвейзький і граф Ізуар, 1858 («Оперна»); Легаль (мат Легаля); Фішер — Д. Бірн, 1956; Таль (типова жертва); Петросян (жертва якості); Каспаров — Топалов, 1999.
- Наявні задачі цих партій (`ch-d-immortal-p1`, `ch-d-evergreen-p1`, `ch-d-kasparov-topalov-p1`, `ch-d-greco-p1`, `ch-d-gotc-p1`, …) перевіряються на точність FEN відносно реальної партії; ID зберігаються.
- Позиції Greek gift (Фаза 1) замінюються реальними партіями з цього ж конвеєра.

### Тести і критерії приймання

- Гейт кількості: кожен навчальний урок тактики/матів/ендшпілю має 4–6 задач.
- Гейт кривої: середній рейтинг юніту не спадає в межах частини курсу (допуск 50).
- QA: 0 прапорців для імпортованих задач.
- Ліцензія: кожна задача має `source`.

### Ризики

- Розмір контенту: +250 задач ≈ +3000 рядків TS → окремий файл, лінивий імпорт лише в `sync-content`.
- Тематична невідповідність Lichess-тегів уроку → ручна перевірка 10% вибірки.

### Залежності

Фази 1–2 (QA, контракт, теми); Фаза 3 використовує рейтинги.

### Обсяг

~400 рядків скриптів + ~3000 рядків згенерованого контенту + ~80 рукописних пояснень. **≈ 6–8 днів.**

---
## 5. Фаза 5 — Повний PGN, перегляд партії, помилки → особисті задачі, нічия

**Мета:** кожна партія (бот і онлайн) зберігається повністю, її можна переглянути хід за ходом; грубі помилки позначаються і стають особистими задачами в SRS. Заодно виправляється трикратне повторення.

### 5.1 Історія ходів і трикратне повторення

- `packages/chess-core/src/index.ts`: нова `applyMoveWithHistory(startFen, sans[], move)` → будує гру з `startFen` + ходів (chess.js бачить історію → `isThreefoldRepetition()` працює). `gameTermination` отримує варіант з історією.
- `apps/web/src/app/play/play-client.tsx`: стан `moves: { san, from, to, fen }[]` замість лише `fen`; хід бота та гравця додаються в масив; `gameTermination` викликається з історією.
- `apps/realtime/src/index.ts` (обробник `move`, ~543–620): відновлювати гру з `start_fen` + `pgn` (поле вже є, зберігає SAN через пробіл), а не з `game.fen` → трикратне повторення спрацьовує онлайн.

### 5.2 БД

Міграція `packages/db/drizzle/0043_chess_games_history.sql`:

- `chess_games`: `start_fen text NOT NULL DEFAULT 'startpos'`, `moves jsonb NOT NULL DEFAULT '[]'` (`{ san, uci, fen, clockMs }`), `kind varchar(16) NOT NULL DEFAULT 'online'` (`online | bot | endgame | opening`), `bot_level varchar(16)`, `termination varchar(24)`.
- Бот-партії зараз не зберігаються на сервері: новий `POST /chess/games/bot` (`apps/api/src/routes/chess.ts`) — зберігає завершену бот-партію (сервер переграє ходи через `chess-core` і відкидає нелегальні).
- Нова таблиця `chess_game_annotations (game_id, ply, eval_cp, best_uci, best_san, label: 'blunder'|'mistake'|'inaccuracy', created_at)`.

### 5.3 Перегляд після партії

- **Новий:** `apps/web/src/components/move-history-panel.tsx` — дві колонки (№ | білі | чорні), підсвітка поточного ходу, клік → позиція, автоскрол; на мобільних — горизонтальний.
- **Новий:** `apps/web/src/app/play/review/[gameId]/page.tsx` — дошка (`ChessBoardFrame` у режимі `explore` з `lastMove`), кнопки ⟨⟨ ⟨ ⟩ ⟩⟩, клавіші ←/→, панель оцінки.
- Під час партії панель ходів показується праворуч від дошки (тільки перегляд, без навігації в живій грі).
- Список партій: `/play` → «Мої партії» (існуючий `GET /chess/games/me`).

### 5.4 Позначення помилок

- Аналіз запускається асинхронно після завершення партії: `apps/api/src/services/chess-game-analysis.ts` (новий) для кожного напівходу учня рахує оцінку до/після.
- **Оцінювач:** поточний `/coach/hint` (`apps/api/src/stockfish-coach.ts`) — евристика глибини 2 і **не придатна** для надійних позначок. Варіанти: (а) підключити UCI Stockfish через `STOCKFISH_PATH` (вже передбачено коментарем у файлі) — **рекомендовано**; (б) без рушія — лише очевидні втрати матеріалу (≥ 300 cp за 2 напівходи) з позначкою «можлива помилка».
- Пороги: падіння ≥ 150 cp — «груба помилка» (blunder) при оцінці до ходу в межах ±500; 80–149 — «помилка»; 40–79 — «неточність». Позиції з виграшем > +800 не позначаються.
- Обмеження: одна аналіз-задача на партію, черга (простий фоновий воркер в API або cron за зразком `SPEC/CRON.md`), тайм-аут 30 с.

### 5.5 Помилки → особисті задачі

- Для кожної «грубої помилки» створюється особиста задача: FEN до ходу учня, `solutionSans` = найкраща лінія рушія (2–3 ходи), `goal` виводиться з оцінки, `source: { kind: "game", gameId }`.
- Таблиця `chess_personal_puzzles (id, user_id, game_id, ply, fen, solution_sans text[], goal, themes text[], created_at)`; потрапляють у SRS Фази 3 (окреме джерело в `/review/mistakes`, `reason: "own_game"`).
- Лише з рушієм (варіант а); без рушія — не створюються.

### 5.6 Пропозиція нічиєї (онлайн)

`apps/realtime/src/index.ts` (не `matchmaking.ts`):

- `socket.on("offer_draw", { gameId })` → валідація (учасник, гра активна, не частіше 1 разу на 10 ходів, rate limit через `allowSocketEvent`) → `emit("draw_offered")` супернику.
- `accept_draw` → `finishGame(id, "1/2-1/2", "agreement")` (Elo через існуючий `applyElo`); `decline_draw` → `draw_declined` пропонувачу. Пропозиція згорає після ходу суперника.
- `play-client.tsx`: кнопка «Запропонувати нічию», модалка «Суперник пропонує нічию — Прийняти / Відхилити».
- Бот: нічию не приймає, якщо його оцінка > −100.

### Тести і критерії приймання

- `chess-core/src/index.test.ts`: трикратне повторення з історією; `applyMoveWithHistory` відхиляє нелегальні.
- `apps/realtime/src/*.test.ts`: draw offer/accept/decline, rate limit, згорання після ходу.
- Інтеграційні: бот-партія зберігається; аналіз створює анотації й особисті задачі (з тестовим `STOCKFISH_PATH` або моком).
- e2e: після партії відкривається перегляд, навігація стрілками, позначки помилок видно.
- Критерій: трикратне повторення завершує партію з `reason: "threefold"` і з ботом, і онлайн.

### Ризики

- Ресурси сервера для Stockfish → обмеження: аналіз лише для завершених партій ≥ 10 ходів, глибина/час фіксовані, черга.
- Розмір `moves jsonb` — незначний (≤ 300 напівходів).

### Залежності

Фаза 3 (SRS для особистих задач). Незалежна від Фаз 4, 6, 7.

### Обсяг

~1100 рядків (історія, міграція, перегляд, аналіз, нічия, тести). **≈ 8–10 днів.**

---

## 6. Фаза 6 — Тренажер ендшпілю

**Мета:** учень доводить до кінця ключові ендшпільні позиції проти бота: «виграй» і «утримай нічию».

### 6.1 Контент

**Новий тип вправи** `chess_endgame_drill` (або окремий режим у `/play` з набором позицій; рекомендовано — тип вправи, щоб входити в уроки й іспити):

```ts
{
  id: string; type: "chess_endgame_drill";
  promptUk: string; promptEn?: string;
  fen: string;
  goal: "win" | "draw" | "promote";
  maxMoves: number;                 // ліміт ходів учня (напр. KBN — 33)
  botLevel: "strong" | "tablebase";
  themes: string[];
  explanationUk?: string; explanationEn?: string;
}
```

Набір (двомовний, ~18 позицій, у юніти `ch-deep-kp-theory`, `ch-deep-rook-theory`, `ch-deep-minor-end`, `endgames-intro`):

- **Виграй:** опозиція і ключові поля (3), Лусена — «будуємо міст» (2), KBN-мат (2), K+Q проти K, K+R проти K (по 1), ферзь проти пішака на 7-й (1).
- **Утримай:** Філідор (2), Ванкура (2), крайній пішак (1), неправильний слон (1), фортеця (1), різнопільні слони (1).

### 6.2 Рушій перевірки мети

- `packages/chess-core/src/index.ts`: `checkEndgameGoal(history, goal, maxMoves)` → `in_progress | success | fail` (мат / промоція / нічия за правилами / ліміт ходів / втрата виграшу).
- «Втрата виграшу» в режимі `win` визначається лише за станом (нічия за правилами або ліміт ходів) — без рушія в браузері.
- Бот: рівень `strong` + ендшпільні покращення Фази 8 (централізація короля); для ≤5 фігур — **необов'язкова** таблиця ендшпілів (Syzygy WDL 3–5 фігур ≈ 1 ГБ — забагато для браузера; варіант — серверний ендпойнт `POST /chess/tablebase` з lookup або зовнішнім API Lichess tablebase з кешем).

### 6.3 UI

- `apps/web/src/components/exercises.tsx`: `ChessEndgameDrillExercise` — дошка в режимі `play` з авто-ходом бота (через `chess-bot-worker.ts`), лічильник ходів, мета зверху («Виграйте за 20 ходів» / «Утримайте нічию»), кнопки «Почати знову» і «Підказка» (через `/coach/hint`).
- Невдача — 0 XP, позиція йде в SRS (Фаза 3).

### Тести і критерії приймання

- Unit: `checkEndgameGoal` для мату, промоції, пату, ліміту ходів, трикратного повторення (нічия = успіх для `draw`).
- QA-скрипт Фази 1 перевіряє стартову оцінку: `win` ≥ +500 або мат, `draw` в межах ±80.
- e2e: K+R проти K розв'язується; провал при перевищенні ліміту.
- Критерій: бот рівня `strong` у позиціях «утримай» реально тисне (не здається одразу) — ручна перевірка кожної позиції.

### Ризики

- Слабкий бот у позиціях «утримай» дає хибне відчуття успіху → там, де можливо, бот з таблицею; інакше — підвищена глибина для ≤6 фігур (позиції малі — глибина 5–6 прийнятна в Worker).

### Залежності

Фаза 1 (QA), Фаза 5 (історія ходів, трикратне), Фаза 8 (ендшпільна оцінка бота) — бажано.

### Обсяг

~600 рядків + ~18 позицій контенту. **≈ 5–6 днів** (+2–3 дні з таблицею ендшпілів).

---

## 7. Фаза 7 — Тренажер дебютного репертуару

**Мета:** учень запам'ятовує свої лінії у 8 дебютах курсу через інтервальне повторення, а бот грає ці самі дебюти.

### 7.1 Дерева дебютів

**Новий:** `packages/content/src/chess-openings.ts` — дерева для 8 дебютів курсу (юніти `ch-deep-italian-ruy`, `ch-deep-qg-london`, `ch-deep-sicilian-french`, `ch-deep-caro-kid`): Італійська, Іспанська, Ферзевий гамбіт, Лондонська система, Сицилійська, Французька, Каро-Канн, Староіндійська.

```ts
type OpeningNode = { san: string; commentUk?: string; commentEn?: string; children?: OpeningNode[]; mainline?: boolean };
type Repertoire = { id: string; side: "w" | "b"; titleUk: string; titleEn: string; root: OpeningNode[]; maxDepth: number };
```

- Глибина 6–10 ходів, 3–6 ліній на дебют, коментар до ключових ходів («чому цей хід»). Усі ходи перевіряються chess.js у тесті; оцінки кінцевих позицій — QA-скриптом (не гірше −50 cp для сторони учня).

### 7.2 Тренажер

- `apps/web/src/app/play/openings/…` (новий маршрут): учень обирає сторону і дебют; бот ходить за суперника по дереву (випадкова гілка, вага — частота), учень має зіграти хід репертуару; помилка → показ правильного ходу з коментарем, лінія йде в SRS.
- SRS по лініях: таблиця `chess_opening_lines (user_id, repertoire_id, line_key, repetitions, interval_days, due_at, lapses)` — інтервали 1/3/7/21 (як у Фазі 3), міграція `0044_chess_opening_lines.sql`.
- API: `GET /chess/openings/due`, `POST /chess/openings/:repertoire/lines/:lineKey/attempt` (`apps/api/src/routes/chess.ts`).

### 7.3 Книга дебютів бота

- `packages/chess-core/src/bot.ts` `OPENING_BOOK` (5 позицій) → генерується з дерев `chess-openings.ts` (ключ — перші 4 токени FEN, як зараз). Рівні: learner — лише головні лінії, club/strong — усі гілки.
- Режим гри з ботом «Зіграти дебют»: учень обирає дебют, бот виходить з книги після останнього вузла.

### Тести і критерії приймання

- `chess-openings.test.ts`: усі ходи легальні, немає дублікатів вузлів, переходи (транспозиції) мають однаковий FEN.
- `bot` тест: у стартовій позиції дебюту бот грає хід з дерева.
- e2e: тренування лінії Італійської, помилка показує правильний хід.
- Критерій: кожен з 8 дебютів має ≥3 лінії з коментарями uk+en.

### Ризики

- Обсяг теорії (≈ 40 ліній з коментарями) — авторська робота. Почати з головних ліній, розширювати поступово.

### Залежності

Фаза 3 (SRS-логіка), Фаза 1 (QA). Незалежна від 4–6.

### Обсяг

~700 рядків коду + ~1200 рядків дерев з коментарями. **≈ 6–7 днів.**

---
## 8. Фаза 8 — Дошка, UX, звуки, бот

**Мета:** сучасна шахова дошка і чесніший, «людяніший» бот. Свідомо остання: косметика не виправляє навчання.

### 8.1 Дошка — `apps/web/src/components/chess-board-frame.tsx`

| Функція | Реалізація (react-chessboard v4) |
|---|---|
| Підсвітка останнього ходу | проп `lastMove`; у `customSquareStyles` фон `rgba(255, 213, 0, 0.35)` для `from`/`to` **під** кільцями шаху (порядок стилів: останній хід → шах → вибір → точки) |
| Переворот дошки | кнопка під дошкою (`t.chess.flipBoard`), стан орієнтації в батьківському компоненті; у задачах — теж (орієнтація від сторони учня за замовчуванням) |
| Теми дошки | `packages/shared/src/chess-board-themes.ts`: `classic`, `green`, `blue`, `wood`; `customDarkSquareStyle` / `customLightSquareStyle`; вибір у налаштуваннях, `localStorage` + профіль |
| Координати | `showBoardNotation` (v4; **не** `showBoardOrientation`), перемикач у налаштуваннях, за замовчуванням увімкнено |
| Захоплені фігури | новий `apps/web/src/components/captured-pieces.tsx`: рахує з історії ходів (не з FEN — інакше промоція ламає підрахунок), показує різницю матеріалу (+3) |
| Діалог промоції | з Фази 1 |
| Стрілки | `customArrows` для `chess_plan`, підказок і перегляду партії |

### 8.2 Звуки — `apps/web/src/lib/chess-sounds.ts` (новий)

- Синтетичні звуки Web Audio API, без аудіофайлів: `move`, `capture`, `check`, `castle`, `promote`, `gameStart`, `gameEnd`, `illegal`, `lowTime`, `puzzleSolved`, `puzzleWrong`.
- **Вимкнено за замовчуванням**; перемикач у налаштуваннях (`localStorage('chess-sound-enabled')` + профіль). `AudioContext` створюється лише після жесту користувача.
- Поважати `prefers-reduced-motion` для анімацій і системне «без звуку».

### 8.3 Годинник

- `play-client.tsx`: менше 30 с — червоний фон годинника; менше 10 с — тихий «тік» раз на секунду (лише якщо звуки ввімкнено).

### 8.4 Бот — `packages/chess-core/src/bot.ts`

- **Quiescence search** на листках для `club` і `strong`: лише взяття (+ промоції), упорядкування MVV-LVA, обмеження глибини qsearch 6, stand-pat.
- **Tapered eval:** фаза гри за матеріалом (0–24 за Фрідель/PeSTO), окремі PST мідлгейму й ендшпілю (особливо король: централізація в ендшпілі), інтерполяція. Заміна грубого `pieces.length <= 12`.
- Прибрати бонус мобільності з `evaluateBoard` на листках (дорого: `chess.moves()` у кожному листку) або рахувати дешевше.
- Таблиця транспозицій (Map за FEN без лічильників) для `strong`; ітеративне поглиблення з обмеженням часу (500–800 мс у Worker).
- Worker (`apps/web/src/app/play/chess-bot-worker.ts`) — для **всіх** рівнів (зараз лише `strong`).
- **Особистості, прив'язані до курсу:** рівні отримують імена й стиль, відкриваються прогресом (`COURSE_PARTS`):
  - «Новачок» (learner): робить людські помилки, яких навчає курс (залишає фігуру без захисту, пропускає вилку) замість 25% випадкових ходів — випадковий хід лише серед «правдоподібних» (топ-5 за оцінкою з шумом).
  - «Клубний гравець» (club): грає дебюти курсу, помиляється в ендшпілі.
  - «Сильний» (strong): quiescence + tapered eval + TT.
  - Челенджі: «Обіграй клубного гравця Італійською» після юніту `ch-deep-italian-ruy`.
- `chooseBotMove(fen, level)` → `chooseBotMove({ fen, history, level, personality })` (історія потрібна для трикратного повторення й книги).

### 8.5 Примітка про react-chessboard v5

У v5 інший API: один об'єкт `options` замість окремих пропсів (`position`, `onPieceDrop` з об'єктом аргументів, інша система стилів і промоції). Усі приклади цього плану — для **v4 (^4.7.2)**. Міграція на v5 — окрема задача поза цим планом; щоб її спростити, весь доступ до `Chessboard` лишається тільки в `chess-board-frame.tsx` і `chessboard-lazy.tsx`.

### Тести і критерії приймання

- `bot` тести (`chess-core/src/index.test.ts`): quiescence не віддає фігуру на «горизонті» (тестові позиції), король іде в центр у K+P ендшпілі, бот знаходить мат у 2.
- Продуктивність: `strong` відповідає ≤ 1 с на середньому ноутбуці (Worker), `club` ≤ 300 мс.
- e2e (`apps/web/e2e/chess-bot-and-learn.spec.ts`): останній хід підсвічено, переворот працює, координати перемикаються, звук вимкнено за замовчуванням.
- Доступність: нові кнопки мають `aria-label` з `getUI(locale)`.

### Ризики

- Quiescence у чистому chess.js повільна → обмеження глибини qsearch і часу; за потреби — проста бітбордова генерація лише для взять (поза цим планом).
- Звук у Safari/iOS: `AudioContext` лише після жесту.

### Залежності

Фаза 1 (діалог промоції, `lastMove`), Фаза 5 (історія для захоплених фігур і трикратного), Фаза 7 (книга дебютів).

### Обсяг

~1000 рядків. **≈ 6–8 днів.**

---

## 9. Глобальний план перевірки

### Автоматичні

```bash
pnpm --filter @eduforge/chess-core test      # рушій задач, промоція, історія, трикратне, мета ендшпілю, бот
pnpm --filter @eduforge/shared test          # Zod-контракт, теми, Glicko-2, XP з підказками, grader
pnpm --filter @eduforge/content test         # гейт QA (хеші FEN), теми 184/184, дедуплікація іспитів, крива складності, кількість задач на урок
pnpm --filter @eduforge/api test             # grade.test.ts, submit-lesson.test.ts, spaced-due.test.ts, review-queue.test.ts
pnpm --filter @eduforge/realtime test        # draw offer, трикратне онлайн
pnpm typecheck
pnpm test:unit
pnpm test:integration                        # міграції 0042–0044, рейтинг, SRS, збереження партій
pnpm --filter @eduforge/web exec playwright test e2e/chess-*.spec.ts
```

Окремо (локально/на боксі, не в CI): `pnpm chess:qa` — Stockfish-перевірка всіх задач, ендшпільних позицій і кінців дебютних ліній; результат комітиться в `chess-qa.generated.json`.

### Ручні

- **Задачі:** 10 випадкових багатоходових — суперник відповідає сам; альтернативний мат зараховується; Сааведра (`c8=R`) розв'язується; підказка в два кроки; розбір після розв'язання; показ розв'язку після 3 спроб.
- **`chess_plan`:** три варіанти, пояснення до кожного, стрілка на дошці.
- **Рейтинг і тренування:** розміщення з 8–10 задач; тренування тримає точність 55–75%; помилка повертається завтра + задача-«сиблінг» тієї ж теми.
- **Партії:** бот-партія і онлайн-партія — повна історія, трикратне повторення завершує партію, перегляд з навігацією, позначки помилок, особисті задачі в черзі повторення; нічия пропонується і приймається.
- **Тренажери:** KBN за 33 ходи; утримання Філідора проти `strong`; лінія Італійської з помилкою і повтором.
- **Дошка:** останній хід, переворот, теми, координати, захоплені фігури, звук (вимкнено за замовчуванням), низький час.
- **Мови:** увесь новий UI і контент — uk + en; пошук заборонених слів («ладейн», «Лучен», русизми) у контенті.

---

## 10. Розгортання і безпека прогресу

- **ID стабільні.** Жоден наявний `exercise.id`, `lesson.slug`, `unit.slug` не видаляється й не перейменовується. Виправлення і заміни позицій — на місці. Зміна `type` (`chess_puzzle` → `chess_plan`) зберігає ID.
- **Прогрес:** `userLessonProgress`, `exercise_reviews`, історія XP не змінюються. Історичні відповіді не перераховуються новим grader'ом; новий grader діє лише на нові спроби.
- **Синхронізація контенту:** після кожної контентної зміни — `pnpm content:sync` (`packages/db/src/sync-content.ts`, міграція `0040_content_version.sql` вже веде версію контенту). Перевірити на копії БД (як у `SPEC/DEEP-ENGLISH-CHESS-PLAN.md`: тимчасовий PG 17 + Redis) перед продом.
- **Міграції** лише додають таблиці/колонки з дефолтами (`0042_chess_puzzle_rating`, `0043_chess_games_history`, `0044_chess_opening_lines`) — зворотно сумісні; відкат = ігнорування нових колонок.
- **Feature flags** (через наявний механізм налаштувань або env): `chess.autoReply`, `chess.puzzleRating`, `chess.gameReview`, `chess.endgameTrainer`, `chess.openingTrainer`, `chess.sounds`. Вмикати по фазах.
- **Порядок релізу:** Фаза 1 → 2 (один реліз контенту) → 3 → 4 → 5 → 6/7 (паралельно) → 8. Кожен реліз — зелені гейти + ручна перевірка списку з розділу 9.
- **Іспити:** заміна позицій в іспитах не скидає вже складені іспити; нові позиції діють для нових спроб.

---

## 11. Зведена оцінка

| Фаза | Що | Код | Контент | Днів | Залежить від |
|---|---|---|---|---|---|
| 1 | Рушій задач, промоція, `chess_plan`, QA-гейт, виправлення | ~700 | ~60 виправлень + ~30 конвертацій | 8–10 | — |
| 2 | Теми, підказки, пояснення, XP | ~400 | ~1500 рядків | 6–8 | 1 |
| 3 | Glicko-2, розміщення, адаптивність, шахове SRS | ~900 | — | 7–9 | 2 |
| 4 | +250 задач Lichess, крива, знамениті партії | ~400 | ~3000 рядків (згенер.) + ~80 пояснень | 6–8 | 1, 2 |
| 5 | PGN, перегляд, помилки → задачі, нічия | ~1100 | — | 8–10 | 3 |
| 6 | Тренажер ендшпілю | ~600 | ~18 позицій | 5–6 (+2–3) | 1, 5, 8* |
| 7 | Тренажер дебютів, книга бота | ~700 | ~1200 рядків | 6–7 | 1, 3 |
| 8 | Дошка, звуки, бот | ~1000 | — | 6–8 | 1, 5, 7 |
| **Разом** | | **~5800** | **~6000 рядків + ~250 задач** | **≈ 52–66** | |

\* Фаза 6 краще після ендшпільної оцінки бота з Фази 8.

**Критичний шлях:** 1 → 2 → 3 → 5. Фази 4, 6, 7 можна вести паралельно після своїх залежностей; 8.1–8.3 (дошка, звуки, годинник) можна почати одразу після Фази 1, якщо потрібен швидкий видимий результат.
