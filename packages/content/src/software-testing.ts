import type { CourseContent, Exercise } from "./types.js";
import {
  codeFill,
  codeOrderAuto,
  codeOutputMcq,
  codeProject,
  codeRead,
  exam,
  lesson,
  matchEx,
  mcq,
  unit,
  why,
} from "./builders.js";

const testableRequirements = unit(
  "st_testable_requirements",
  "Тестовані вимоги та піраміда перевірок",
  "Testable Requirements & Verification Pyramid",
  [
    lesson(
      "st-req-behaviors",
      "Перетворення вимог на перевірювані очікування",
      "Turning Specs into Testable Assertions",
      2, true, [
        mcq(
          "st-req1",
          "Продуктова вимога: «Пошук ForgeBoard має бути швидким і надійним». Яке формулювання робить її тестованою для автотесту?",
          "A spec says: \"ForgeBoard search should be fast and reliable.\" Which rewrite makes it testable?",
          [
            "GET /api/tasks?q=auth повертає HTTP 200 зі збігами без урахування регістру; порожній q повертає сторінку з лімітом до 50 записів; запит < 200ms локально",
            "Кнопка пошуку має подобатися дизайнеру",
            "Код повинен використовувати лише короткі змінні",
            "Сервер ніколи не повинен логувати запити",
          ],
          0,
          why(
            "Тестована вимога задає конкретні вхідні умови, статус-код, форму відповіді та границі поведінки.",
            "Testable specs state exact inputs, status codes, invariants, and failure contracts.",
          ),
        ),
        codeRead(
          "st-req2",
          "Приклад хорошої та крихкої перевірки: Чому другий підхід виявляє реальні баги без хибних падінь при рефакторингу?",
          "Worked example: behavioral vs brittle assertion: Why does the second assertion catch real bugs without breaking on harmless refactors?",
          "ts",
          "// Bad: expect(componentHtml).toContain('class=\"css-91fa\"')\n// Good:\nexpect(await res.json()).toMatchObject({ error: \"title_required\" });\nexpect(res.status).toBe(400);",
          [
            "Він перевіряє спостережуваний HTTP-контракт (статус і код помилки), а не внутрішні CSS-хеші чи назви приватних змінних",
            "Тому що HTTP 400 швидший за перевірку рядка",
            "Тому що `toMatchObject` пропускає будь-які помилки",
            "Бо рефакторинг ніколи не змінює API",
          ],
          0,
          why(
            "Тести мають фіксувати поведінковий контракт, а не деталі реалізації чи згенеровані класи.",
            "Behavior assertions lock contracts rather than coupling suites to private internals.",
          ),
        ),
      ], { baseXp: 22 },
    ),
    lesson(
      "st-req-levels",
      "Обір рівня тесту: Unit, Component, Integration, E2E",
      "Choosing the Right Test Level",
      2, true, [
        matchEx(
          "st-req3",
          "Зіставте тип дефекту з найшвидшим рівнем тесту, який його впевнено спіймає",
          "Match each bug class to the fastest effective test level",
          [
            { left: "Невірний розрахунок знижки / offset-пагінації", right: "Unit test (pure function)" },
            { left: "Помилка валідації форми та ARIA-стану кнопки", right: "Component test (React Testing Library)" },
            { left: "Помилка SQL-фільтрації або перевірки власника 403", right: "API + DB Integration test" },
            { left: "Скрипт роутера блокує перехід після логіну в браузері", right: "Browser E2E test (Playwright)" },
          ],
        ),
        mcq(
          "st-req4",
          "Передбачте: команда перенесла всі unit-перевірки формул у повільні Playwright E2E-тести через UI. Який наслідок найбільш імовірний?",
          "Predict: a team puts all formula checks into browser E2E instead of unit tests. What happens?",
          [
            "CI стає у 20 разів повільнішим, а падіння важче локалізувати через стек браузера й бази",
            "Баги в математиці самі зникають",
            "E2E-тести починають виконуватись за 1 мілісекунду",
            "Unit-помилки перестають існувати у продакшені",
          ],
          0,
          why(
            "Перевернута піраміда (ice-cream cone) сповільнює розробку та замилює точність діагностики.",
            "Over-relying on E2E for pure logic makes builds slow and failures noisy to isolate.",
          ),
        ),
      ], { baseXp: 22 },
    ),
    exam("st-req-exam", "Контрольна: тестовані вимоги", "Checkpoint: Testable Requirements", 2, [
      mcq(
        "st-req-e1",
        "Яка властивість тесту робить його цінним сигналом у CI?",
        "Which property makes a test a reliable CI quality signal?",
        [
          "Він падає саме тоді, коли порушено реальну вимогу, і стабільно проходить при коректному коді",
          "Він мокує власну функцію так, щоб завжди повертати true",
          "Він пропускає assert при таймауті",
          "Він перевіряє лише існування файлу на диску",
        ],
        0,
      ),
      codeOrderAuto(
        "st-req-e2",
        "Впорядкуйте процес створення тесту до реалізації вимоги (Arrange-Act-Assert)",
        "Order the AAA test structure cleanly",
        "ts",
        [
          "// Arrange: seed task fixture with owner alice",
          "// Act: send PATCH request authenticated as bob",
          "// Assert: expect HTTP 403 forbidden without mutation",
        ],
      ),
    ]),
  ],
);

const unitTestingUnit = unit(
  "st_unit_testing",
  "Unit-тести та перевірка мутацій логіки",
  "Unit Tests & Failure-Catching Assertions",
  [
    lesson(
      "st-ut-tautology",
      "Виявлення беззмістовних тестів (Tautology & Over-Mocking)",
      "Spotting Tautological & Over-Mocked Tests",
      3, true, [
        codeRead(
          "st-ut1",
          "Чому цей тест зелений навіть коли фільтр зламаний? У чому критичний дефект тесту?",
          "Diagnose why this test passes on broken code: What is fundamentally broken about this test?",
          "ts",
          "vi.mock(\"./filterTasks\", () => ({ filterTasks: () => [{ id: \"1\" }] }));\nit(\"filters tasks\", () => {\n  expect(filterTasks([], \"bug\")).toHaveLength(1);\n});",
          [
            "Тест замокав саму функцію, яку нібито тестує, тож реально перевіряє лише вигаданий мок замість продакшн-коду",
            "Масив `[]` заборонений у Vitest",
            "Довжина масиву завжди має дорівнювати 2",
            "Функція повертає проміс",
          ],
          0,
          why(
            "Ніколи не мокайте систему під тестом (SUT); тест має виконувати реальну функцію й ламатися при внесенні дефекту.",
            "Never mock the Subject Under Test; run real logic so an injected bug actually breaks the assertion.",
          ),
        ),
        codeOutputMcq(
          "st-ut2",
          "Передбачте результат суворої перевірки помилок",
          "Predict what `expect(() => parseLimit(\"0\")).toThrow()` asserts",
          "ts",
          "function parseLimit(raw: string): number {\n  const n = Number(raw);\n  if (!Number.isInteger(n) || n < 1 || n > 100) throw new RangeError(\"invalid_limit\");\n  return n;\n}",
          [
            "Кидає RangeError(\"invalid_limit\") для \"0\", \"101\", \"1.5\", \"abc\"",
            "Повертає 0 тихо без винятку",
            "Повертає NaN для \"abc\" без помилки",
            "Приймає 101 і повертає 100",
          ],
          0,
          why(
            "Перевірка конкретних невалідних значень і точного типу/повідомлення помилки доводить, що валідація дійсно відхиляє межі.",
            "Asserting exact error throwing across 0, 101, floats, and NaN confirms validation fails loudly.",
          ),
        ),
      ], { baseXp: 24 },
    ),
    lesson(
      "st-ut-pure-refactor",
      "Відокремлення чистої логіки від побічних ефектів",
      "Extracting Pure Logic for Deterministic Tests",
      3, true, [
        codeFill(
          "st-ut3",
          "Передати детермінований годинник (`now`) для перевірки прострочених задач без `sleep`",
          "Inject deterministic clock for overdue calculation",
          "ts",
          "export function isOverdue(dueAt: Date, ___: Date = new Date()): boolean {\n  return dueAt.getTime() < now.getTime();\n}",
          ["now"],
          true,
          why(
            "Ін'єкція параметра `now` дозволяє тестувати границі до мілісекунди миттєво без системного годинника чи таймерів.",
            "Injecting `now` makes boundary timestamps (dueAt === now vs now - 1ms) deterministic without sleeps.",
          ),
        ),
        mcq(
          "st-ut4",
          "Функція `sortTasks(tasks)` модифікує переданий масив через `.sort()` на місці. Який test invariant одразу виявить цей баг?",
          "`sortTasks(tasks)` mutates the caller's array with in-place `.sort()`. Which test catches it immediately?",
          [
            "`const copy = structuredClone(input); sortTasks(input); expect(input).toEqual(copy);`",
            "`expect(sortTasks([])).toEqual([])`",
            "`expect(typeof sortTasks).toBe(\"function\")`",
            "`expect(sortTasks([a]).length).toBe(1)`",
          ],
          0,
          why(
            "Збереження знімка вхідного масиву до виклику гарантує відсутність прихованих мутацій.",
            "Snapshotting the caller array before invocation catches accidental in-place mutation bugs.",
          ),
        ),
      ], { baseXp: 24 },
    ),
    exam("st-ut-exam", "Контрольна: unit-тестування", "Checkpoint: Unit Testing", 3, [
      mcq(
        "st-ut-e1",
        "Що означає фраза «цей тест спіймає регресію (mutation test)?»",
        "What does it mean that a test kills a mutant / catches a regression?",
        [
          "Якщо змінити оператор `<` на `<=` або пропустити перевірку прав у коді, тест гарантовано впаде",
          "Тест завжди зелений навіть при видаленні логіки",
          "Тест використовує випадкові числа без seed",
          "Тест перевіряє лише TypeScript типи без виконання коду",
        ],
        0,
      ),
      codeFill(
        "st-ut-e2",
        "Вказати точний очікуваний код помилки в assertion",
        "Assert exact error message substring or regex",
        "ts",
        "expect(() => parseLimit(\"-1\")).to___(/invalid_limit/);",
        ["Throw"],
        true,
      ),
    ]),
  ],
);

const boundariesFixturesUnit = unit(
  "st_boundaries_fixtures",
  "Граничні випадки та реалістичні фікстури",
  "Boundary Cases & Realistic Test Fixtures",
  [
    lesson(
      "st-bf-boundaries",
      "Класи еквівалентності та границі off-by-one",
      "Equivalence Partitions & Off-by-One Boundaries",
      3, true, [
        mcq(
          "st-bf1",
          "Назва задачі дозволена від 3 до 80 символів включно (після trim). Який мінімальний набір перевіряє всі границі?",
          "Task title must be 3..80 trimmed chars inclusive. Which boundary set tests every edge?",
          [
            "\"  ab  \" (2 після trim), \"abc\" (3), 80-символьний рядок (80), 81-символьний рядок (81)",
            "\"Buy milk\", \"Fix bug\", \"Deploy\"",
            "Лише рядок з 20 символів",
            "Лише порожній рядок",
          ],
          0,
          why(
            "Тестування на точках `min-1`, `min`, `max`, `max+1` та пробілах виявляє помилки `<=` проти `<` та забутий `.trim()`.",
            "Testing min-1, min, max, max+1, and whitespace catches off-by-one comparison bugs and missing trim.",
          ),
        ),
        codeRead(
          "st-bf2",
          "Знайдіть прихований баг пагінації на межі: Яка перша перевірка виявить, що перші `pageSize` елементів зникають?",
          "Find the boundary bug in slice pagination: Which check catches that page 1 skips the first pageSize items?",
          "ts",
          "function paginate<T>(items: T[], page: number, pageSize: number) {\n  const start = page * pageSize; // BUG: 1-based page expected!\n  return items.slice(start, start + pageSize);\n}",
          [
            "`expect(paginate([a, b, c], 1, 2)).toEqual([a, b])`",
            "`expect(paginate([], 1, 10)).toEqual([])`",
            "`expect(paginate([a], 0, 1)).toEqual([a])`",
            "`expect(Array.isArray(paginate([a], 2, 1))).toBe(true)`",
          ],
          0,
          why(
            "Очікування `[a, b]` для `page=1` миттєво доводить, що забули `(page - 1) * pageSize`.",
            "Asserting `page=1` starts with item `a` immediately exposes missing `(page - 1)` normalization.",
          ),
        ),
      ], { baseXp: 24 },
    ),
    lesson(
      "st-bf-fixtures",
      "Фабрики фікстур і витік спільного стану",
      "Fixture Builders & Test Isolation",
      3, false, [
        mcq(
          "st-bf3",
          "Чому глобальна константа `const sharedTask = { id: 1, title: \"A\" }`, яку мутує один тест, призводить до флаків при зміні порядку тестів?",
          "Why does mutating a module-level `sharedTask` object cause order-dependent flaky tests?",
          [
            "Наступні тести читають пошкоджений стан із попереднього тесту і падають лише у певному порядку запуску",
            "Vitest забороняє константи поза функціями",
            "JS автоматично заморожує всі об'єкти",
            "Змінюється назва файлу тесту",
          ],
          0,
          why(
            "Фабрика `makeTask(overrides = {})` генерує свіжий ізольований об'єкт для кожного кейса.",
            "Using a fresh `makeTask(overrides)` factory prevents cross-test state pollution.",
          ),
        ),
        codeFill(
          "st-bf4",
          "Додати унікальний індекс у фікстуру користувача",
          "Avoid unique-email collisions in DB fixtures",
          "ts",
          "let seq = 0;\nexport const makeUser = (over = {}) => ({ email: `user-${++___}@example.test`, ...over });",
          ["seq"],
          true,
        ),
      ], { baseXp: 24 },
    ),
    exam("st-bf-exam", "Контрольна: межі та фікстури", "Checkpoint: Boundaries & Fixtures", 3, [
      mcq(
        "st-bf-e1",
        "Який підхід найкраще показує реальні прогалини: Unicode (кирилиця/емодзі), null-поля та порожній масив чи `" + "foo/bar`?",
        "Which fixture data exposes real production bugs better: `" + "foo/bar` or Unicode strings, empty sets, and null fields?",
        [
          "Реалістичні дані: кирилиця, довгі рядки, спецсимволи URL, порожні та null-стани",
          "Лише `test1`, `test2`",
          "Тільки число `123` для всіх рядкових полів",
          "Порожній файл фікстури без тестів",
        ],
        0,
      ),
      mcq(
        "st-bf-e2",
        "Для поля `page` (допустимо `>= 1`) що має перевірити тест при передачі `page = 0` та `page = -3`?",
        "For 1-based `page`, what should happen when testing `page = 0` and `page = -3`?",
        [
          "API або валідатор повертає детерміновану помилку 400 або обмежує до допустимої межі відповідно до контракту",
          "Повертає випадкові рядки з кінця масиву",
          "Падає з unhandled exception 500",
          "Ігнорує фільтри безпеки",
        ],
        0,
      ),
    ]),
  ],
);

const reactComponentTestsUnit = unit(
  "st_react_component_tests",
  "Тестування React-компонентів і доступності",
  "React Component Tests & A11y Queries",
  [
    lesson(
      "st-rct-user-event",
      "Симуляція реальної взаємодії: Roles, Labels і `userEvent`",
      "User-Centric Queries & Realistic Interactions",
      3, false, [
        codeOrderAuto(
          "st-rct1",
          "Складіть тест відправлення доступної форми задачі в React Testing Library",
          "Order an accessible form submission test in React Testing Library",
          "tsx",
          [
            "render(<TaskForm onCreate={onCreate} />);",
            "await user.type(screen.getByLabelText(/task title/i), \"Write tests\");",
            "await user.click(screen.getByRole(\"button\", { name: /add task/i }));",
            "expect(onCreate).toHaveBeenCalledWith({ title: \"Write tests\" });",
          ],
          why(
            "`getByLabelText` і `getByRole` одночасно перевіряють, що інпут реально пов'язаний із `<label>`, а кнопка має доступне ім'я.",
            "`getByLabelText` and `getByRole` test real DOM usability and fail if labels or accessible names break.",
          ),
        ),
        codeRead(
          "st-rct2",
          "Знайдіть причину, чому тест не перевіряє реальний асинхронний ререндер: Що не так із цим тестом для форми з клієнтською/асинхронною валідацією?",
          "Spot missing async wait after state update: What is broken if validation renders an alert asynchronously?",
          "tsx",
          "it(\"shows validation error\", async () => {\n  render(<TaskForm />);\n  fireEvent.click(screen.getByRole(\"button\", { name: /save/i }));\n  expect(screen.queryByRole(\"alert\")).toBeNull(); // WRONG expectation!\n});",
          [
            "Потрібно чекати появу повідомлення через `await screen.findByRole(\"alert\")` і перевіряти `toHaveAttribute(\"aria-invalid\", \"true\")`",
            "`fireEvent.click` ніколи не викликає React обробники",
            "`role=\"alert\"` не існує в HTML",
            "Треба замінити `render` на `console.log`",
          ],
          0,
          why(
            "`findByRole` чекає асинхронного оновлення стану і робить тест стійким до мікрозадач/Promise.",
            "`await screen.findByRole(\"alert\")` properly awaits async validation feedback.",
          ),
        ),
      ], { baseXp: 25 },
    ),
    lesson(
      "st-rct-states",
      "Покриття Loading, Empty, Error та Retry станів",
      "Testing Loading, Empty, Error & Retry States",
      3, false, [
        mcq(
          "st-rct3",
          "Компонент показує спінер, але при мережевій помилці застрягає у «Loading...» назавжди. Який тест гарантовано виявить цей дефект?",
          "A component hangs on \"Loading...\" forever when `fetch` rejects. Which test guarantees catching this?",
          [
            "Підмінити мережевий клієнт помилкою (500/network), перевірити зникнення loading, появу error UI і те, що клік «Повторити» знову викликає завантаження та рендерить задачі",
            "Перевірити лише початковий спінер до завершення промісу",
            "Замокати `useState`",
            "Перевірити, що компонент рендерить `<div>`",
          ],
          0,
          why(
            "Перехід error -> retry -> success перевіряє відновлення застосунку без перезавантаження сторінки.",
            "Verifying error -> click Retry -> success ensures users can actually recover from transient faults.",
          ),
        ),
      ], { baseXp: 25 },
    ),
    exam("st-rct-exam", "Контрольна: React-тести", "Checkpoint: React Component Tests", 3, [
      mcq(
        "st-rct-e1",
        "Який запит Testing Library дає найкраще поєднання семантики та стійкості до зміни стилів?",
        "Which Testing Library query best verifies semantic accessibility?",
        ["getByRole / getByLabelText", "getByTestId для всього підряд", "container.firstChild.children[0]", "document.getElementsByTagName(\"div\")[4]"],
        0,
      ),
      codeFill(
        "st-rct-e2",
        "Асинхронно дочекатися повідомлення статусу в DOM",
        "Wait asynchronously for rendered alert role",
        "tsx",
        "const alert = await screen.___(\"alert\");",
        ["findByRole"],
        true,
      ),
    ]),
  ],
);

const apiDbIntegrationUnit = unit(
  "st_api_db_integration",
  "Інтеграційні тести API + PostgreSQL",
  "API & Database Integration Testing",
  [
    lesson(
      "st-int-db-real",
      "Тестування реального HTTP-маршруту з PostgreSQL без фейкового SQL",
      "Real HTTP Routes Against PostgreSQL",
      4, false, [
        mcq(
          "st-int1",
          "Якщо unit-тести маршруту мокають Drizzle/SQL-драйвер і повертають хардкоджений масив, які класи багів залишаються невидимими?",
          "If API route tests mock the SQL/Drizzle driver completely, which real failures slip through?",
          [
            "Помилки імен колонок, порушення FOREIGN KEY / NOT NULL constraints, хибний JOIN, неправильне сортування NULLS або зламаний SQL ORDER BY",
            "Тільки друкарські помилки в README",
            "Застарілий логотип favicon",
            "Налаштування теми VS Code",
          ],
          0,
          why(
            "Справжні інтеграційні тести перевіряють HTTP middleware + валідацію + реальний SQL проти тестової схеми Postgres.",
            "Integration tests against a real Postgres schema catch column mismatches, constraint faults, and SQL logic bugs mocks hide.",
          ),
        ),
        codeOrderAuto(
          "st-int2",
          "Складіть ізольований API-інтеграційний тест перевірки власника (ownership 403)",
          "Order an API integration test verifying cross-user 403 rejection",
          "ts",
          [
            "Seed userA + task owned by userA and session for userB",
            "Send PATCH /api/tasks/:id with userB cookie and new title",
            "Assert HTTP status is 403 forbidden",
            "Query DB directly to assert task title in Postgres remained unchanged",
          ],
          why(
            "Перевірка не лише HTTP 403, а й незмінності рядка в БД виключає баг, коли мутація спрацювала до відповіді про помилку.",
            "Verifying DB state wasn't altered after a 403 rules out mutate-before-returning bugs.",
          ),
        ),
      ], { baseXp: 26 },
    ),
    lesson(
      "st-int-isolation",
      "Очищення стану між тестами та детермінований сидинг",
      "State Isolation Between Integration Cases",
      4, false, [
        codeRead(
          "st-int3",
          "Знайдіть причину падіння другого запуску тестів: Чому локальний запуск падає з `duplicate key value violates unique constraint` на другому прогоні?",
          "Diagnose test suite failing on second run: Why does running the suite a second time fail with unique constraint violation?",
          "ts",
          "beforeAll(async () => {\n  await db.insert(users).values({ email: \"qa@forgeboard.local\" });\n});",
          [
            "Тести вставляють фіксований ключ без очищення таблиць (`TRUNCATE ... CASCADE` / rollback / унікального префікса)",
            "PostgreSQL видаляє індекси після першого запуску",
            "beforeAll запускається лише в Linux",
            "Drizzle не підтримує email",
          ],
          0,
          why(
            "Кожен прогін має бути ідемпотентним: очищайте тестові дані або ізолюйте кожен кейс унікальним namespace/rollback.",
            "Repeatable suites clean tables before runs or isolate fixtures per test run cleanly.",
          ),
        ),
      ], { baseXp: 26 },
    ),
    exam("st-int-exam", "Контрольна: API + БД інтеграційні тести", "Checkpoint: API + DB Integration", 4, [
      mcq(
        "st-int-e1",
        "Що обов'язково перевірити в інтеграційному тесті створення ресурсу (POST /tasks) крім статусу 201?",
        "What must a POST /tasks integration test verify besides HTTP 201?",
        [
          "Що запис реально зберігся в БД і доступний через GET з очікуваним ownerId і полями, а невалідний payload дає 400 без запису",
          "Лише те, що сервер не вилетів з OOM",
          "Середній FPS браузера",
          "Назву комп'ютера розробника",
        ],
        0,
      ),
      codeFill(
        "st-int-e2",
        "Властивість перевірки заборони чужого доступу",
        "Assert forbidden HTTP status for non-owner",
        "ts",
        "expect(res.status).___(403);",
        ["toBe"],
        true,
      ),
    ]),
  ],
);

const e2eCiCapstoneUnit = unit(
  "st_e2e_ci_capstone",
  "E2E у браузері, CI та набір ForgeBoard",
  "Browser E2E, CI Pipelines & ForgeBoard Suite",
  [
    lesson(
      "st-e2e-locators-flaky",
      "Стійкі локатори Playwright та усунення Flaky-тестів",
      "Stable Playwright Locators & Eliminating Flakes",
      4, false, [
        mcq(
          "st-e2e1",
          "Тест використовує `await page.waitForTimeout(2000)` після натискання Save і іноді падає в CI. Яке виправлення надійне?",
          "An E2E test calls `await page.waitForTimeout(2000)` after clicking Save and flakes under CI load. What fixes it properly?",
          [
            "Прибрати фіксований sleep і чекати конкретний очікуваний стан: `await expect(page.getByText(\"Saved\")).toBeVisible()` + очікування відповіді мережі",
            "Збільшити таймаут до `waitForTimeout(15000)`",
            "Перезапускати CI 10 разів вручну",
            "Видалити тест із конфігу",
          ],
          0,
          why(
            "Playwright web-first assertions автоматично повторюють перевірку до готовності UI без штучних затримок.",
            "Web-first assertions eliminate race flakes without arbitrary sleeps that slow down CI.",
          ),
        ),
        codeFill(
          "st-e2e2",
          "Дочекатися видимого результату в Playwright",
          "Playwright auto-retrying visibility assertion",
          "ts",
          "await expect(page.getByRole(\"heading\", { name: \"ForgeBoard\" })).___();",
          ["toBeVisible"],
          true,
        ),
      ], { baseXp: 26 },
    ),
    lesson(
      "st-forgeboard-suite-lab",
      "Лаб: набір тестів ForgeBoard проти інжектованих багів (M7)",
      "Lab: ForgeBoard Test Suite vs Injected Bugs (M7)",
      4, false, [
        mcq(
          "st-fb1",
          "Головний критерій якості вашого тест-набору для ForgeBoard в Milestone 7:",
          "What defines a strong test suite for ForgeBoard in Milestone 7?",
          [
            "Тести проходять на коректній реалізації й гарантовано падають, коли в бізнес-логіку чи авторизацію внесено навмисні баги (broken variants)",
            "Покриття рядків 100% без жодного `expect`",
            "Тести проходять навіть після видалення перевірок доступу",
            "Тести запускаються лише з пропущеними `.skip`",
          ],
          0,
          why(
            "Валідація проти заздалегідь зламаних варіантів (mutation/fault injection) доводить, що тести реально охороняють поведінку.",
            "Testing against intentionally broken variants proves your assertions truly guard real bugs.",
          ),
        ),
        codeProject(
          "st-fb2",
          "Опишіть регресійний кейс для спійманого бага; для повних unit/DOM/API тестів завантажте локальний лаб-пакет M7 нижче.",
          "Sketch a regression check catching an injected sorting/auth bug; download the M7 local lab below to verify your suite against all broken builds.",
          [
            {
              id: "ts",
              name: "forgeboard.test.ts",
              language: "typescript",
              starter: `import assert from "node:assert/strict";\n\nexport function verifyOwnershipCheck(handlerStatusForOtherUser: number) {\n  assert.equal(handlerStatusForOtherUser, 403);\n}\n`,
            },
          ],
          [
            { fileId: "ts", contains: ["assert.equal", "403"] },
          ],
          {
            hintUk: "У локальному пакеті M7 є broken-варіанти для перевірки чутливості ваших тестів.",
            hintEn: "The M7 local lab package includes deliberately broken variants so you can verify your suite catches every bug.",
          },
        ),
      ], { baseXp: 45 },
    ),
    exam("st-e2e-exam", "Контрольна: E2E та стратегія CI", "Checkpoint: E2E & CI Quality Gates", 4, [
      mcq(
        "st-e2e-e1",
        "Яка комбінація кроків CI балансує швидкість зворотного зв'язку та впевненість у релізі?",
        "Which CI pipeline order gives the fastest feedback while preserving release confidence?",
        [
          "Typecheck + Unit/Component tests першими (<1 хв), далі API+Postgres integration, далі smoke E2E на зібраному артефакті",
          "Лише 45-хвилинний E2E без unit-тестів і typecheck",
          "Запуск тестів вручну лише раз на рік",
          "Пропуск усіх падінь через `|| true`",
        ],
        0,
      ),
      mcq(
        "st-e2e-e2",
        "Якщо E2E впав у CI, який артефакт дає найбільше контексту без вгадування?",
        "Which CI artifact helps diagnose a failed headless browser test fastest?",
        ["Playwright trace / screenshot + логи API сервера", "Лише статус exit code 1", "Розмір node_modules", "Версія npm cache"],
        0,
      ),
    ]),
  ],
);

export const softwareTestingContent: CourseContent = {
  slug: "software_testing",
  titleUk: "Практичне тестування ПЗ",
  titleEn: "Practical Software Testing",
  descriptionUk:
    "Тестовані вимоги, unit-тести без тавтологій, граничні випадки та фікстури, React component tests, API+DB інтеграція, E2E та перевірка багів ForgeBoard.",
  descriptionEn:
    "Testable requirements, high-signal unit tests, boundary fixtures, React component tests, API+DB integration, E2E, and ForgeBoard fault-injection lab.",
  icon: "🧪",
  color: "#16A34A",
  units: [
    testableRequirements,
    unitTestingUnit,
    boundariesFixturesUnit,
    reactComponentTestsUnit,
    apiDbIntegrationUnit,
    e2eCiCapstoneUnit,
  ],
};
