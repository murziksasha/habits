import { z } from "zod";
import { COURSE_SLUGS, type CourseSlug } from "./courses.js";

export const labFailureHintSchema = z.object({
  symptomUk: z.string().min(1),
  symptomEn: z.string().min(1),
  fixUk: z.string().min(1),
  fixEn: z.string().min(1),
});

export const localLabManifestSchema = z.object({
  labId: z.string().regex(/^[a-z0-9-]+$/),
  version: z.string().regex(/^\d+\.\d+\.\d+$/),
  projectName: z.literal("ForgeBoard"),
  milestone: z.number().int().min(1),
  courseSlug: z.enum(COURSE_SLUGS),
  lessonSlug: z.string().min(1),
  titleUk: z.string().min(1),
  titleEn: z.string().min(1),
  objectiveUk: z.string().min(1),
  objectiveEn: z.string().min(1),
  instructionsUk: z.string().min(1),
  instructionsEn: z.string().min(1),
  prerequisitesUk: z.string().min(1),
  prerequisitesEn: z.string().min(1),
  acceptanceCriteriaUk: z.array(z.string().min(1)).min(1),
  acceptanceCriteriaEn: z.array(z.string().min(1)).min(1),
  downloadPath: z.string().regex(/^\/labs\/[a-z0-9.-]+\.zip$/),
  supportedRuntime: z.string().min(1),
  setupCommands: z.array(z.string().min(1)).min(1),
  testCommands: z.array(z.string().min(1)).min(1),
  windowsNotesUk: z.string().min(1),
  windowsNotesEn: z.string().min(1),
  commonFailures: z.array(labFailureHintSchema).min(1),
  assessmentMode: z.literal("local_practice"),
});

export type LabFailureHint = z.infer<typeof labFailureHintSchema>;
export type LocalLabManifest = z.infer<typeof localLabManifestSchema>;

function makeLab(
  def: Omit<LocalLabManifest, "projectName" | "assessmentMode" | "downloadPath"> & {
    downloadPath?: string;
  },
): LocalLabManifest {
  const manifest: LocalLabManifest = {
    ...def,
    projectName: "ForgeBoard",
    assessmentMode: "local_practice",
    downloadPath: def.downloadPath ?? `/labs/${def.labId}-v${def.version}.zip`,
  };
  return localLabManifestSchema.parse(manifest);
}

const NODE_WINDOWS_UK =
  "У Windows PowerShell розпакуйте архів через `Expand-Archive -Path <zip> -DestinationPath .\\forgeboard` і запускайте команди по черзі (у PowerShell роздільник `;`, не `&&`).";
const NODE_WINDOWS_EN =
  "In Windows PowerShell, unpack with `Expand-Archive -Path <zip> -DestinationPath .\\forgeboard` and run commands sequentially (use `;` instead of `&&` in PowerShell).";

const DOCKER_WINDOWS_UK =
  "У Windows переконайтесь, що Docker Desktop запущено (`docker info`), а порт 5432 не зайнятий іншим локальним Postgres (за потреби вкажіть `PGPORT=5433` у `.env`).";
const DOCKER_WINDOWS_EN =
  "On Windows, verify Docker Desktop is running (`docker info`) and port 5432 is free (or override `PGPORT=5433` in `.env`).";

const COMMON_PNPM_FAILURES: LabFailureHint[] = [
  {
    symptomUk: "Помилка `pnpm: command not found` або застаріла версія Node",
    symptomEn: "`pnpm: command not found` or outdated Node version",
    fixUk: "Увімкніть Corepack (`corepack enable`) на Node >= 20 або встановіть pnpm (`npm i -g pnpm`).",
    fixEn: "Enable Corepack (`corepack enable`) on Node >= 20 or install pnpm (`npm i -g pnpm`).",
  },
  {
    symptomUk: "`ERR_PNPM_OUTDATED_LOCKFILE` під час `pnpm install --frozen-lockfile`",
    symptomEn: "`ERR_PNPM_OUTDATED_LOCKFILE` during `pnpm install --frozen-lockfile`",
    fixUk: "Не змінюйте версії пакетів у `package.json`; перепакуйте або запустіть `pnpm install` без ручних правок lockfile.",
    fixEn: "Keep `package.json` dependency pins untouched, or regenerate `pnpm-lock.yaml` if intentionally upgrading.",
  },
];

export const LOCAL_LAB_MANIFESTS: readonly LocalLabManifest[] = [
  makeLab({
    labId: "forgeboard-m1-a11y",
    version: "1.0.0",
    milestone: 1,
    courseSlug: "html_semantics",
    lessonSlug: "hs-forgeboard-a11y-lab",
    titleUk: "ForgeBoard M1: Доступний інтерфейс та адаптивний layout",
    titleEn: "ForgeBoard M1: Accessible Interface & Responsive Layout",
    objectiveUk:
      "Побудуйте семантичний інтерфейс ForgeBoard із доступною валідацією форми, нативним `<dialog>`, живими статус-оголошеннями й адаптивним CSS на токенах.",
    objectiveEn:
      "Build the ForgeBoard semantic task interface with accessible form validation, native `<dialog>`, live status announcements, and token-driven responsive CSS.",
    instructionsUk:
      "Розпакуйте стартовий проєкт, доповніть `src/index.html` і `src/styles.css` згідно з критеріями (landmarks, label/for, aria-describedby, focus-visible, container queries, reduced motion) та перевірте тести.",
    instructionsEn:
      "Extract the starter project, complete `src/index.html` and `src/styles.css` to meet all accessibility and responsive layout checks (landmarks, label/for, aria-describedby, focus-visible, container queries, reduced motion), and run tests.",
    prerequisitesUk: "HTML: семантика (landmarks, форми) та CSS: Flex & Grid",
    prerequisitesEn: "HTML Semantics (landmarks, forms) and CSS Flex & Grid",
    acceptanceCriteriaUk: [
      "Усі поля форми мають `<label for>`, підказку помилки через `aria-describedby` та `aria-invalid`.",
      "Статус змін оголошується через `role=\"status\"` / `aria-live=\"polite\"`, деталі задачі відкриваються у `<dialog>` з поверненням фокуса.",
      "CSS використовує `@layer`, логічні властивості (`padding-inline`, `margin-block`), токени, `@container` та `@media (prefers-reduced-motion: reduce)` без горизонтального скролу на 320px.",
    ],
    acceptanceCriteriaEn: [
      "Every form input has a `<label for>`, error hint linked via `aria-describedby`, and `aria-invalid` support.",
      "Task updates announce via `role=\"status\"` / `aria-live=\"polite\"`, and task details use a native `<dialog>` that restores focus on close.",
      "CSS uses `@layer`, logical properties (`padding-inline`, `margin-block`), tokens, `@container`, and `@media (prefers-reduced-motion: reduce)` with zero overflow at 320px.",
    ],
    supportedRuntime: "Node >= 20, pnpm >= 9 (або вбудований node --test на Node >= 20)",
    setupCommands: ["pnpm install --frozen-lockfile"],
    testCommands: ["pnpm test"],
    windowsNotesUk: NODE_WINDOWS_UK,
    windowsNotesEn: NODE_WINDOWS_EN,
    commonFailures: [
      ...COMMON_PNPM_FAILURES,
      {
        symptomUk: "Тест перевірки `<dialog>` або `aria-describedby` падає з `missing attribute`",
        symptomEn: "Accessibility check fails on missing `<dialog>` or `aria-describedby`",
        fixUk: "Переконайтесь, що ID у `for=\"...\"` та `aria-describedby=\"...\"` точно збігаються з `id` елементів.",
        fixEn: "Verify `for` and `aria-describedby` IDs match the target element `id` attributes verbatim.",
      },
    ],
  }),
  makeLab({
    labId: "forgeboard-m2-js",
    version: "1.0.0",
    milestone: 2,
    courseSlug: "js_fundamentals",
    lessonSlug: "jsf-forgeboard-board-lab",
    titleUk: "ForgeBoard M2: Поведінка на JS, кеш і скасування запитів",
    titleEn: "ForgeBoard M2: JavaScript Behavior, Persistence & Abortable Search",
    objectiveUk:
      "Реалізуйте логіку дошки задач ForgeBoard: незмінні (immutable) оновлення, фільтрацію й сортування, збереження у storage та асинхронний пошук з `AbortController`.",
    objectiveEn:
      "Implement ForgeBoard board behavior: immutable updates, filtering/sorting, storage persistence, and abortable async search with `AbortController`.",
    instructionsUk:
      "Завершіть модулі `src/store.js` та `src/search.js` у стартері, уникаючи мутації вхідних масивів і стану перегонів (stale response race conditions).",
    instructionsEn:
      "Complete `src/store.js` and `src/search.js` in the starter while avoiding array mutation and stale async search race conditions.",
    prerequisitesUk: "ForgeBoard M1 + JavaScript Fundamentals (async/await, DOM, модулі)",
    prerequisitesEn: "ForgeBoard M1 + JavaScript Fundamentals (async/await, DOM, modules)",
    acceptanceCriteriaUk: [
      "Фільтрація та сортування не мутують початковий масив задач.",
      "Новий пошуковий запит скасовує попередній через `AbortController` і не перезаписує новіший результат.",
      "Стан переживає перезавантаження через `Storage` adapter та коректно обробляє зіпсований JSON.",
    ],
    acceptanceCriteriaEn: [
      "Filtering and sorting never mutate the original task array.",
      "A new search aborts the in-flight request via `AbortController` and prevents stale responses from overwriting newer input.",
      "State persists across reloads via the storage adapter and recovers gracefully from malformed JSON.",
    ],
    supportedRuntime: "Node >= 20, pnpm >= 9",
    setupCommands: ["pnpm install --frozen-lockfile"],
    testCommands: ["pnpm test"],
    windowsNotesUk: NODE_WINDOWS_UK,
    windowsNotesEn: NODE_WINDOWS_EN,
    commonFailures: [
      ...COMMON_PNPM_FAILURES,
      {
        symptomUk: "Тест race-condition падає: повільний старий запит перетирає швидкий новий",
        symptomEn: "Race-condition test fails: slower older query overwrites faster newer result",
        fixUk: "Передавайте `controller.signal` у `fetcher` і перевіряйте `signal.aborted` перед оновленням стану.",
        fixEn: "Pass `controller.signal` into `fetcher` and guard state updates against `signal.aborted`.",
      },
    ],
  }),
  makeLab({
    labId: "forgeboard-m3-ts",
    version: "1.0.0",
    milestone: 3,
    courseSlug: "typescript",
    lessonSlug: "tsc-forgeboard-models-lab",
    titleUk: "ForgeBoard M3: Строге моделювання на TypeScript та unknown-контракти",
    titleEn: "ForgeBoard M3: Strict TypeScript Modeling & Untrusted Input Validation",
    objectiveUk:
      "Змоделюйте стани запиту через discriminated unions, валідуйте `unknown`-відповіді API без `any` і пройдіть `tsc --noEmit` у strict-режимі.",
    objectiveEn:
      "Model request states with discriminated unions, validate `unknown` API payloads without `any`, and pass `tsc --noEmit` in strict mode.",
    instructionsUk:
      "Реалізуйте контракти у `src/models.ts` та `src/validators.ts` з `strict: true` і `noUncheckedIndexedAccess: true`, а потім перевірте typecheck і тести.",
    instructionsEn:
      "Implement contracts in `src/models.ts` and `src/validators.ts` under `strict: true` and `noUncheckedIndexedAccess: true`, then run typecheck and tests.",
    prerequisitesUk: "ForgeBoard M2 + TypeScript (unions, narrowing, generics)",
    prerequisitesEn: "ForgeBoard M2 + TypeScript (unions, narrowing, generics)",
    acceptanceCriteriaUk: [
      "Неможливі стани (`loading: true, error: '...'`) заборонені типом `AsyncState<T>`.",
      "Парсер `parseTaskPayload(raw: unknown)` повертає типізований `Result<Task, ValidationError>` і відхиляє невалідні дані.",
      "`pnpm typecheck` та `pnpm test` завершуються без помилок та без `any` / `@ts-ignore`.",
    ],
    acceptanceCriteriaEn: [
      "Impossible UI states (`loading: true` with an error) are unrepresentable in `AsyncState<T>`.",
      "`parseTaskPayload(raw: unknown)` returns a typed `Result<Task, ValidationError>` and rejects malformed payloads.",
      "`pnpm typecheck` and `pnpm test` pass cleanly with zero `any` or `@ts-ignore`.",
    ],
    supportedRuntime: "Node >= 20, pnpm >= 9, TypeScript 5.x",
    setupCommands: ["pnpm install --frozen-lockfile"],
    testCommands: ["pnpm typecheck", "pnpm test"],
    windowsNotesUk: NODE_WINDOWS_UK,
    windowsNotesEn: NODE_WINDOWS_EN,
    commonFailures: [
      ...COMMON_PNPM_FAILURES,
      {
        symptomUk: "TS2532 `Object is possibly 'undefined'` при індексації масиву",
        symptomEn: "TS2532 `Object is possibly 'undefined'` on array indexing",
        fixUk: "`noUncheckedIndexedAccess` увімкнений навмисно — перевіряйте елемент на `undefined` перед доступом.",
        fixEn: "`noUncheckedIndexedAccess` is enabled intentionally — narrow indexed values before dereferencing.",
      },
    ],
  }),
  makeLab({
    labId: "forgeboard-m4-react",
    version: "1.0.0",
    milestone: 4,
    courseSlug: "react_fundamentals",
    lessonSlug: "rf-forgeboard-client-lab",
    titleUk: "ForgeBoard M4: Багатоекранний React-клієнт (URL-стан, Retry, RTL)",
    titleEn: "ForgeBoard M4: Multi-View React Client (URL State, Retry & RTL)",
    objectiveUk:
      "Побудуйте клієнт ForgeBoard у Vite/React зі станами loading/empty/error/retry, URL-фільтрами, керованим редактором задач та тестами React Testing Library.",
    objectiveEn:
      "Build the Vite/React ForgeBoard client with explicit loading/empty/error/retry states, URL-synced filters, controlled task editing, and RTL tests.",
    instructionsUk:
      "Розділіть компоненти у `src/App.tsx`, `src/TaskBoard.tsx` і `src/TaskForm.tsx`, уникайте копіювання `props` у `useState` та запустіть тести компонентів.",
    instructionsEn:
      "Structure components in `src/App.tsx`, `src/TaskBoard.tsx`, and `src/TaskForm.tsx`, derive filtered views instead of mirroring props in state, and run component tests.",
    prerequisitesUk: "ForgeBoard M3 + React Fundamentals (components, state, forms, effects)",
    prerequisitesEn: "ForgeBoard M3 + React Fundamentals (components, state, forms, effects)",
    acceptanceCriteriaUk: [
      "Стан фільтрів синхронізований з URL/параметрами, а похідний список обчислюється під час рендеру.",
      "У разі помилки завантаження відображається повідомлення з робочою кнопкою Retry.",
      "Форма створення/редагування валідує заголовок, показує доступну помилку та проходить RTL-тести.",
    ],
    acceptanceCriteriaEn: [
      "Filter state stays synchronized with query parameters and filtered tasks are derived during render.",
      "Failed fetches show an accessible alert with a working Retry button.",
      "Task create/edit form validates title input with accessible errors and passes RTL tests.",
    ],
    supportedRuntime: "Node >= 20, pnpm >= 9, Vite + React 19 + Vitest",
    setupCommands: ["pnpm install --frozen-lockfile"],
    testCommands: ["pnpm typecheck", "pnpm test"],
    windowsNotesUk: NODE_WINDOWS_UK,
    windowsNotesEn: NODE_WINDOWS_EN,
    commonFailures: [
      ...COMMON_PNPM_FAILURES,
      {
        symptomUk: "Редагування іншої задачі показує старе значення у формі",
        symptomEn: "Selecting another task to edit keeps stale input text",
        fixUk: "Використовуйте `key={editingTask.id}` на формі або контрольовані значення без дублювання props у `useState`.",
        fixEn: "Key the editor by `key={editingTask.id}` or sync form draft cleanly instead of freezing initial props.",
      },
    ],
  }),
  makeLab({
    labId: "forgeboard-m5-express",
    version: "1.0.0",
    milestone: 5,
    courseSlug: "express_fundamentals",
    lessonSlug: "ef-forgeboard-api-lab",
    titleUk: "ForgeBoard M5: Валідований Express REST API з перевіркою доступу",
    titleEn: "ForgeBoard M5: Validated Express REST API with Ownership Checks",
    objectiveUk:
      "Створіть Express API для ForgeBoard із валідацією Zod, пагінацією, єдиним форматом помилок (`snake_case`) та перевіркою ownership (401 vs 403).",
    objectiveEn:
      "Build the ForgeBoard Express API with Zod validation, pagination, consistent `snake_case` error envelopes, and auth vs ownership checks (401 vs 403).",
    instructionsUk:
      "Реалізуйте маршрути `/tasks` та централізований error handler у `src/app.ts`, потім запустіть HTTP-тести.",
    instructionsEn:
      "Implement `/tasks` endpoints and centralized error middleware in `src/app.ts`, then run the API test suite.",
    prerequisitesUk: "ForgeBoard M3 + Node Fundamentals + Express Fundamentals",
    prerequisitesEn: "ForgeBoard M3 + Node Fundamentals + Express Fundamentals",
    acceptanceCriteriaUk: [
      "`POST /tasks` і `PATCH /tasks/:id` відхиляють невалідне тіло зі статусом `400` і `{ error: 'invalid_input' }`.",
      "`GET /tasks` підтримує фільтр і пагінацію (`limit`, `offset`) з детермінованим сортуванням.",
      "Неаутентифіковані запити повертають `401`, а чужі задачі — `403` без витоку стек-трейсів.",
    ],
    acceptanceCriteriaEn: [
      "`POST /tasks` and `PATCH /tasks/:id` reject invalid payloads with `400` and `{ error: 'invalid_input' }`.",
      "`GET /tasks` supports filtering and deterministic pagination (`limit`, `offset`).",
      "Unauthenticated requests return `401` and cross-user mutations return `403` without stack trace leaks.",
    ],
    supportedRuntime: "Node >= 20, pnpm >= 9, Express 4/5 + Zod",
    setupCommands: ["pnpm install --frozen-lockfile"],
    testCommands: ["pnpm typecheck", "pnpm test"],
    windowsNotesUk: NODE_WINDOWS_UK,
    windowsNotesEn: NODE_WINDOWS_EN,
    commonFailures: [
      ...COMMON_PNPM_FAILURES,
      {
        symptomUk: "Запит підвисає або повертає HTML-стек замість JSON",
        symptomEn: "Async route hangs or returns HTML stack trace instead of JSON",
        fixUk: "Передайте помилку в `next(err)` і переконайтесь, що 4-аргументний error handler змонтований останнім.",
        fixEn: "Forward async rejections to `next(err)` and mount the 4-arg error handler last.",
      },
    ],
  }),
  makeLab({
    labId: "forgeboard-m6-postgres",
    version: "1.0.0",
    milestone: 6,
    courseSlug: "postgresql_apps",
    lessonSlug: "pg-forgeboard-db-lab",
    titleUk: "ForgeBoard M6: Схема PostgreSQL, міграції та транзакційний репозиторій",
    titleEn: "ForgeBoard M6: PostgreSQL Migrations, Parameterized CRUD & Transactions",
    objectiveUk:
      "Підключіть ForgeBoard до PostgreSQL у Docker: напишіть SQL-міграції (`users`, `projects`, `tasks`), параметризований CRUD, транзакції та індекси.",
    objectiveEn:
      "Connect ForgeBoard to Dockerized PostgreSQL: author SQL migrations (`users`, `projects`, `tasks`), parameterized CRUD, transactions, and indexes.",
    instructionsUk:
      "Підніміть Postgres через `docker compose up -d`, застосуйте міграції у `migrations/`, реалізуйте запити у `src/repo.ts` (без конкатенації SQL) та запустіть інтеграційні тести.",
    instructionsEn:
      "Start Postgres via `docker compose up -d`, apply `migrations/`, implement parameterized queries and transactions in `src/repo.ts`, and run integration tests.",
    prerequisitesUk: "ForgeBoard M5 + PostgreSQL for Web Applications (units 1–5)",
    prerequisitesEn: "ForgeBoard M5 + PostgreSQL for Web Applications (units 1–5)",
    acceptanceCriteriaUk: [
      "Усі SQL-запити використовують параметри `$1, $2` — ін'єкційні рядки зберігаються як текст без виконання.",
      "Переміщення задачі між проєктами та запис аудиту виконуються в одній транзакції з `ROLLBACK` при помилці.",
      "Створені зовнішні ключі, `CHECK`-обмеження та індекс під запит фільтрації за `project_id, status`.",
    ],
    acceptanceCriteriaEn: [
      "All SQL queries use `$1, $2` placeholders — injection strings are stored safely as data.",
      "Cross-project task moves and audit logs execute in a single transaction with `ROLLBACK` on failure.",
      "Foreign keys, `CHECK` constraints, and a composite index on `(project_id, status)` are present and verified.",
    ],
    supportedRuntime: "Node >= 20, pnpm >= 9, Docker + PostgreSQL 16",
    setupCommands: ["docker compose up -d", "pnpm install --frozen-lockfile", "pnpm migrate"],
    testCommands: ["pnpm typecheck", "pnpm test"],
    windowsNotesUk: `${NODE_WINDOWS_UK} ${DOCKER_WINDOWS_UK}`,
    windowsNotesEn: `${NODE_WINDOWS_EN} ${DOCKER_WINDOWS_EN}`,
    commonFailures: [
      ...COMMON_PNPM_FAILURES,
      {
        symptomUk: "`ECONNREFUSED 127.0.0.1:5432` під час міграції або тестів",
        symptomEn: "`ECONNREFUSED 127.0.0.1:5432` during migrate or tests",
        fixUk: "Перевірте `docker compose ps` та healthcheck PostgreSQL; за зайнятого порту 5432 використайте `DATABASE_URL` з іншим портом.",
        fixEn: "Check `docker compose ps` for healthy Postgres; if port 5432 is busy, set `DATABASE_URL` to the mapped port.",
      },
    ],
  }),
  makeLab({
    labId: "forgeboard-m7-testing",
    version: "1.0.0",
    milestone: 7,
    courseSlug: "software_testing",
    lessonSlug: "st-forgeboard-suite-lab",
    titleUk: "ForgeBoard M7: Комплексний набір тестів і виявлення багів",
    titleEn: "ForgeBoard M7: Full-Stack Test Suite & Mutation Bug Detection",
    objectiveUk:
      "Напишіть unit, boundary, API/DB-інтеграційні та поведінкові browser-перевірки, які ловлять навмисно внесені регресії у ForgeBoard.",
    objectiveEn:
      "Write unit, boundary, API/DB integration, and behavioral checks that catch deliberately injected ForgeBoard regressions.",
    instructionsUk:
      "Доповніть тести у `tests/`, перевірте зелений прогін на еталонній реалізації, а потім протестуйте здатність набору ловити регресії (`pnpm test:mutations`).",
    instructionsEn:
      "Complete the test specs in `tests/`, confirm they pass on the working app, and verify they catch injected defects via `pnpm test:mutations`.",
    prerequisitesUk: "ForgeBoard M4–M6 + Practical Software Testing (units 1–5)",
    prerequisitesEn: "ForgeBoard M4–M6 + Practical Software Testing (units 1–5)",
    acceptanceCriteriaUk: [
      "Unit-тести ловлять off-by-one та невалідні переходи статусу задачі.",
      "API-тести перевіряють коди `400`, `401`, `403`, `404` і ізоляцію користувачів.",
      "Мутаційні перевірки підтверджують, що кожен навмисний баг звалює принаймні один тест.",
    ],
    acceptanceCriteriaEn: [
      "Unit tests catch off-by-one pagination and invalid task status transitions.",
      "API tests verify `400`, `401`, `403`, `404` status codes and tenant isolation.",
      "Mutation checks confirm every injected bug causes at least one test failure.",
    ],
    supportedRuntime: "Node >= 20, pnpm >= 9, Vitest / Playwright",
    setupCommands: ["pnpm install --frozen-lockfile"],
    testCommands: ["pnpm test", "pnpm test:mutations"],
    windowsNotesUk: NODE_WINDOWS_UK,
    windowsNotesEn: NODE_WINDOWS_EN,
    commonFailures: [
      ...COMMON_PNPM_FAILURES,
      {
        symptomUk: "Тест проходить навіть на зламаній версії (`mutation survived`)",
        symptomEn: "Test still passes on broken implementation (`mutation survived`)",
        fixUk: "Перевіряйте видиму поведінку й коди відповідей замість того, щоб мокати саму тестовану логіку.",
        fixEn: "Assert observable outputs and HTTP/DOM behaviors instead of mocking away the logic under test.",
      },
    ],
  }),
  makeLab({
    labId: "forgeboard-m8-git",
    version: "1.0.0",
    milestone: 8,
    courseSlug: "git_workflows",
    lessonSlug: "gw-forgeboard-conflict-lab",
    titleUk: "ForgeBoard M8: Гілки, розв'язання конфлікту й релізний PR",
    titleEn: "ForgeBoard M8: Branching, Conflict Resolution & Reviewable Delivery",
    objectiveUk:
      "Симулюйте командну доставку фічі у ForgeBoard: розв'яжіть конфлікт злиття у спільному файлі, збережіть тести зеленими та підготуйте чистий PR-опис.",
    objectiveEn:
      "Deliver a ForgeBoard change cleanly across branches: resolve a merge conflict without dropping either side's invariants, keep tests green, and write a clear PR summary.",
    instructionsUk:
      "Виконайте сценарій ініціалізації локального репо-тренажера (`pnpm lab:init`), розв'яжіть конфлікт у `src/board.js` без маркерів `<<<<<<<` і перевірте тести.",
    instructionsEn:
      "Initialize the local repo exercise (`pnpm lab:init`), resolve the conflict in `src/board.js` cleanly with zero `<<<<<<<` markers left, and run tests.",
    prerequisitesUk: "Programming (Git basics) + JS Fundamentals",
    prerequisitesEn: "Programming (Git basics) + JS Fundamentals",
    acceptanceCriteriaUk: [
      "У робочому дереві немає конфліктних маркерів (`<<<<<<<`, `=======`, `>>>>>>>`).",
      "Збережено обидві зміни (фільтрація за статусом і пріоритетне сортування).",
      "Усі автоматичні тести та перевірка історії комітів проходять.",
    ],
    acceptanceCriteriaEn: [
      "No conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) remain in tracked files.",
      "Both branch features (status filter and priority sorting) are preserved together.",
      "All automated tests and commit-hygiene checks pass.",
    ],
    supportedRuntime: "Git >= 2.38, Node >= 20, pnpm >= 9",
    setupCommands: ["pnpm install --frozen-lockfile", "pnpm lab:init"],
    testCommands: ["pnpm test"],
    windowsNotesUk: `${NODE_WINDOWS_UK} Якщо Git питає ` + "`user.name`" + `/email, задайте локально: ` + "`git config user.name \"Learner\"; git config user.email \"learner@local\"`.",
    windowsNotesEn: `${NODE_WINDOWS_EN} If Git prompts for identity, set local config: ` + "`git config user.name \"Learner\"; git config user.email \"learner@local\"`.",
    commonFailures: [
      ...COMMON_PNPM_FAILURES,
      {
        symptomUk: "`git merge` переривається з `CONFLICT (content)`",
        symptomEn: "`git merge` pauses with `CONFLICT (content)`",
        fixUk: "Це очікуваний крок: об'єднайте обидві зміни в `src/board.js`, видаліть маркери й виконайте `git add` + `git commit`.",
        fixEn: "This is expected: combine both changes in `src/board.js`, remove markers, then run `git add` and `git commit`.",
      },
    ],
  }),
  makeLab({
    labId: "forgeboard-m9-security",
    version: "1.0.0",
    milestone: 9,
    courseSlug: "web_security",
    lessonSlug: "ws-forgeboard-security-lab",
    titleUk: "ForgeBoard M9: Захист меж довіри, XSS, CSRF і IDOR",
    titleEn: "ForgeBoard M9: Trust Boundaries, XSS, CSRF & IDOR Hardening",
    objectiveUk:
      "Усуньте вразливості у ForgeBoard: закрийте IDOR між користувачами, безпечно рендеріть текст, перевірте сесійні cookie, Origin та секрети конфігурації.",
    objectiveEn:
      "Harden ForgeBoard against OWASP Top 10:2025 issues: block cross-user IDOR access, safely render user text, enforce cookie/Origin checks, and validate config secrets.",
    instructionsUk:
      "Перевірте вразливі модулі у `src/`, виправте перевірку власника, санітизацію й заголовки безпеки та переконайтесь, що security-тести проходять.",
    instructionsEn:
      "Audit the handlers in `src/`, enforce ownership checks, safe output escaping, and security headers, and run the security test suite.",
    prerequisitesUk: "ForgeBoard M5–M6 + Secure Web Applications (units 1–5)",
    prerequisitesEn: "ForgeBoard M5–M6 + Secure Web Applications (units 1–5)",
    acceptanceCriteriaUk: [
      "Користувач B не може читати, змінювати або видаляти задачу користувача A (403).",
      "Потенційний XSS-рядок (`<script>...` / `onerror=`) нейтралізується без виконання.",
      "Виставлено заголовки `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `HttpOnly` cookie та Origin-перевірку.",
    ],
    acceptanceCriteriaEn: [
      "User B cannot read, edit, or delete User A's tasks (403).",
      "Untrusted input containing `<script>` or inline event attributes is neutralized safely.",
      "`X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `HttpOnly` cookies, and Origin validation are enforced.",
    ],
    supportedRuntime: "Node >= 20, pnpm >= 9",
    setupCommands: ["pnpm install --frozen-lockfile"],
    testCommands: ["pnpm typecheck", "pnpm test"],
    windowsNotesUk: NODE_WINDOWS_UK,
    windowsNotesEn: NODE_WINDOWS_EN,
    commonFailures: [
      ...COMMON_PNPM_FAILURES,
      {
        symptomUk: "Тест IDOR повертає 200 або 404 замість очікуваного контролю доступу",
        symptomEn: "IDOR test leaks record (200) instead of enforcing owner check",
        fixUk: "Фільтруйте або перевіряйте `task.ownerId === req.user.id` після завантаження ресурсу з авторизованого контексту.",
        fixEn: "Verify `task.ownerId === req.user.id` against the authenticated session user before returning or mutating the record.",
      },
    ],
  }),
  makeLab({
    labId: "forgeboard-m10-ai",
    version: "1.0.0",
    milestone: 10,
    courseSlug: "ai_development",
    lessonSlug: "ai-forgeboard-review-lab",
    titleUk: "ForgeBoard M10: Рев'ю та верифікація AI-згенерованого дифа",
    titleEn: "ForgeBoard M10: Reviewing & Verifying an AI-Generated Diff",
    objectiveUk:
      "Проведіть аудит збереженого AI-дифа для ForgeBoard без платного AI-доступу: виявіть тихі баги, зайві залежності, приховані пастки і закріпіть тестами.",
    objectiveEn:
      "Audit a saved AI-assisted ForgeBoard diff (no paid AI key required): spot subtle regressions, unnecessary dependencies, and missing edge tests, then fix and verify.",
    instructionsUk:
      "Проаналізуйте `fixtures/ai-candidate.patch` і поточний код у `src/`, виправте виявлені дефекти (зокрема race condition, відсутній validation guard та небезпечну залежність) і запустіть тести.",
    instructionsEn:
      "Inspect `fixtures/ai-candidate.patch` alongside `src/`, fix the defects introduced in the AI suggestion (missing guard, subtle bug, unsafe helper), and verify with tests.",
    prerequisitesUk: "TypeScript + Git Workflows + Practical Software Testing",
    prerequisitesEn: "TypeScript + Git Workflows + Practical Software Testing",
    acceptanceCriteriaUk: [
      "Виявлено та виправлено принаймні 3 дефекти зі збереженого AI-дифа.",
      "У `package.json` немає зайвих або неперевірених пакетів.",
      "Нові регресійні тести документують і перевіряють кожне виправлення.",
    ],
    acceptanceCriteriaEn: [
      "All 3 defects from the saved AI candidate diff are identified and fixed.",
      "`package.json` stays free of unvetted or unnecessary dependencies.",
      "Regression tests verify every fix and remain green.",
    ],
    supportedRuntime: "Node >= 20, pnpm >= 9 (повністю офлайн, без зовнішнього AI API)",
    setupCommands: ["pnpm install --frozen-lockfile"],
    testCommands: ["pnpm typecheck", "pnpm test"],
    windowsNotesUk: NODE_WINDOWS_UK,
    windowsNotesEn: NODE_WINDOWS_EN,
    commonFailures: [
      ...COMMON_PNPM_FAILURES,
      {
        symptomUk: "Незрозуміло, які саме зміни зробив AI-кандидат",
        symptomEn: "Unclear what the saved AI candidate changed",
        fixUk: "Відкрийте `fixtures/ai-candidate.patch` і порівняйте кожен hunk з вимогами у `SPEC.md`.",
        fixEn: "Read `fixtures/ai-candidate.patch` line by line against `SPEC.md` acceptance criteria.",
      },
    ],
  }),
  makeLab({
    labId: "forgeboard-m11-nextjs",
    version: "1.0.0",
    milestone: 11,
    courseSlug: "nextjs_fullstack",
    lessonSlug: "nx-forgeboard-app-lab",
    titleUk: "ForgeBoard M11: Повностековий Next.js (Server/Client межі)",
    titleEn: "ForgeBoard M11: Full-Stack Next.js Server/Client Boundaries",
    objectiveUk:
      "Реалізуйте другу версію ключових модулів ForgeBoard у структурі Next.js App Router: розділіть server-only доступ до даних і client-острови, мутації й authz.",
    objectiveEn:
      "Implement a second ForgeBoard slice using Next.js App Router patterns: separate server-only data loaders from client islands, validate mutations, and enforce authz.",
    instructionsUk:
      "Завершіть `src/server/tasks-loader.ts`, `src/server/task-actions.ts` та `src/client/task-filter-island.ts`, перевірте межі імпортів і модульні тести.",
    instructionsEn:
      "Complete `src/server/tasks-loader.ts`, `src/server/task-actions.ts`, and `src/client/task-filter-island.ts`, verify boundary rules, and run tests.",
    prerequisitesUk: "React Fundamentals + Express Fundamentals + PostgreSQL for Web Apps",
    prerequisitesEn: "React Fundamentals + Express Fundamentals + PostgreSQL for Web Apps",
    acceptanceCriteriaUk: [
      "Серверні секрети й БД-запити ізольовані у server-модулях і не імпортуються в client-компонентах.",
      "Мутація перевіряє сесію, валідує вхід і повертає структуровану помилку без витоку внутрішніх деталей.",
      "Boundary-перевірка та тести проходять без порушень.",
    ],
    acceptanceCriteriaEn: [
      "Server-only secrets and DB queries stay strictly in server modules, never imported by client islands.",
      "Mutations check session identity, validate inputs, and return structured errors without internal leaks.",
      "Boundary checks and unit tests pass cleanly.",
    ],
    supportedRuntime: "Node >= 20, pnpm >= 9",
    setupCommands: ["pnpm install --frozen-lockfile"],
    testCommands: ["pnpm typecheck", "pnpm test"],
    windowsNotesUk: NODE_WINDOWS_UK,
    windowsNotesEn: NODE_WINDOWS_EN,
    commonFailures: [
      ...COMMON_PNPM_FAILURES,
      {
        symptomUk: "Помилка межі `Client module imports server-only code`",
        symptomEn: "Boundary test fails: `Client module imports server-only code`",
        fixUk: "Передавайте лише серіалізовані DTO-пропси зверху вниз від Server Component до Client Component.",
        fixEn: "Pass serialized DTO props from server modules into client components instead of importing server code directly.",
      },
    ],
  }),
  makeLab({
    labId: "forgeboard-m12-algorithms",
    version: "1.0.0",
    milestone: 12,
    courseSlug: "applied_algorithms",
    lessonSlug: "aa-forgeboard-perf-lab",
    titleUk: "ForgeBoard M12: Оптимізація вузького місця пошуку й залежностей",
    titleEn: "ForgeBoard M12: Optimizing Search & Dependency Bottlenecks",
    objectiveUk:
      "Пришвидшіть повільні операції ForgeBoard (індексування тегів, топологічний порядок залежностей задач і пошук) із O(n^2) до O(n + e) та поясніть компроміс.",
    objectiveEn:
      "Optimize slow ForgeBoard operations (tag indexing, task dependency topological ordering, and lookup) from O(n^2) to O(n + e) with benchmark proof.",
    instructionsUk:
      "Замініть наївні вкладені цикли у `src/engine.ts` на `Map`/`Set` індекс та обхід графа із виявленням циклів, не зламавши жодного крайнього випадку.",
    instructionsEn:
      "Replace naive nested scans in `src/engine.ts` with `Map`/`Set` indexing and cycle-safe topological traversal while preserving all edge cases.",
    prerequisitesUk: "JavaScript Fundamentals + TypeScript",
    prerequisitesEn: "JavaScript Fundamentals + TypeScript",
    acceptanceCriteriaUk: [
      "Побудова індексу та групування 20 000 задач виконується за лінійний час у межах бюджету бенчмарку.",
      "Циклічні залежності між задачами виявляються детерміновано та повертають явну помилку.",
      "Усі функціональні тести та benchmark-перевірки проходять.",
    ],
    acceptanceCriteriaEn: [
      "Indexing and grouping 20,000 tasks executes in linear time within the benchmark budget.",
      "Cyclic task dependencies are detected deterministically and return an explicit error.",
      "All correctness and performance benchmark tests pass.",
    ],
    supportedRuntime: "Node >= 20, pnpm >= 9",
    setupCommands: ["pnpm install --frozen-lockfile"],
    testCommands: ["pnpm typecheck", "pnpm test"],
    windowsNotesUk: NODE_WINDOWS_UK,
    windowsNotesEn: NODE_WINDOWS_EN,
    commonFailures: [
      ...COMMON_PNPM_FAILURES,
      {
        symptomUk: "Benchmark test падає через тайм-аут або повільний `Array.includes` у циклі",
        symptomEn: "Benchmark test fails due to quadratic `Array.includes` inside a loop",
        fixUk: "Побудуйте `Map<string, Task>` або `Set<string>` один раз до циклу.",
        fixEn: "Pre-index lookup collections with `Map` or `Set` before iterating.",
      },
    ],
  }),
  makeLab({
    labId: "forgeboard-m13-devops",
    version: "1.0.0",
    milestone: 13,
    courseSlug: "devops",
    lessonSlug: "do-forgeboard-delivery-lab",
    titleUk: "ForgeBoard M13: Деплой, діагностика збою та restore drill",
    titleEn: "ForgeBoard M13: Reproducible Delivery, Rollout Triage & Restore Drill",
    objectiveUk:
      "Полагодьте відтворювану конфігурацію доставки ForgeBoard, діагностуйте провальний rollout за логами/пробами та перевірте процедуру відновлення Postgres.",
    objectiveEn:
      "Repair a reproducible ForgeBoard delivery config, diagnose a failed rollout from logs/readiness probes, and verify a PostgreSQL restore runbook.",
    instructionsUk:
      "Проаналізуйте `deploy/` та `scripts/` у стартері, виправте порт/пробу/env-конфіг і скрипт restore-перевірки та проженіть валідатор.",
    instructionsEn:
      "Inspect `deploy/` and `scripts/` in the starter, fix the readiness probe, port/env wiring, and restore verification script, and run the verification suite.",
    prerequisitesUk: "Sysadmin + DevOps (Workloads, Traffic, Data Plane, Incident Drills)",
    prerequisitesEn: "Sysadmin + DevOps (Workloads, Traffic, Data Plane, Incident Drills)",
    acceptanceCriteriaUk: [
      "Маніфести не використовують тег `:latest` і мають узгоджені `PORT` / `/ready` проби.",
      "Скрипт відновлення перевіряє цільову тестову БД і не чіпає production DSN.",
      "Симуляція перевірки конфігурації та інцидент-чекліст проходять на 100%.",
    ],
    acceptanceCriteriaEn: [
      "Deployment manifests pin immutable digests/tags and wire matching `PORT` and `/ready` probes.",
      "Restore script validates an isolated target database without touching production DSN.",
      "Configuration validation and incident runbook checks pass completely.",
    ],
    supportedRuntime: "Node >= 20, pnpm >= 9 (локальна перевірка конфігурації; опційно Docker)",
    setupCommands: ["pnpm install --frozen-lockfile"],
    testCommands: ["pnpm test"],
    windowsNotesUk: NODE_WINDOWS_UK,
    windowsNotesEn: NODE_WINDOWS_EN,
    commonFailures: [
      ...COMMON_PNPM_FAILURES,
      {
        symptomUk: "Readiness перевірка вказує на неправильний шлях або порт",
        symptomEn: "Readiness probe validation fails on path or port mismatch",
        fixUk: "Узгодьте `readinessProbe` шлях `/ready` та порт із `API_PORT` у сервісі.",
        fixEn: "Align `readinessProbe` path `/ready` and port with the service's `API_PORT`.",
      },
    ],
  }),
];

export function getLocalLabForLesson(
  courseSlug: string,
  lessonSlug: string,
): LocalLabManifest | null {
  return (
    LOCAL_LAB_MANIFESTS.find(
      (lab) => lab.courseSlug === courseSlug && lab.lessonSlug === lessonSlug,
    ) ?? null
  );
}

export function listLabsForCourse(courseSlug: string): LocalLabManifest[] {
  return LOCAL_LAB_MANIFESTS.filter((lab) => lab.courseSlug === courseSlug);
}

export function getLocalLabById(labId: string): LocalLabManifest | null {
  return LOCAL_LAB_MANIFESTS.find((lab) => lab.labId === labId) ?? null;
}

export function isCourseSlugWithLabs(slug: string): slug is CourseSlug {
  return LOCAL_LAB_MANIFESTS.some((l) => l.courseSlug === slug);
}
