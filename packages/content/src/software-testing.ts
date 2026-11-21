import type { CourseContent, Exercise } from "./types.js";
import {
  codeFill,
  codeOrderAuto,
  codeOutputMcq,
  codeProject,
  codeRead,
  concept,
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
        concept("st-req-behaviors-concept", "Від очікування до перевірки", "From expectation to assertion", {
          uk: "Перетворіть нечітку вимогу на вхідні дані, передумови та спостережуваний результат. Для пошуку визначте запит, очікувані збіги, обробку порожнього запиту й помилок; критерій швидкості має називати середовище та спосіб вимірювання. Перевіряйте публічний контракт, а не випадкові деталі реалізації.",
          en: "Turn a vague requirement into inputs, preconditions, and observable results. For search, define the query, expected matches, empty-input and error behavior; a speed criterion needs an environment and measurement method. Assert the public contract rather than incidental implementation details.",
        }),
        { ...mcq(
          "st-req1",
          "Продуктова вимога: «Пошук ForgeBoard має бути швидким і надійним». Яке формулювання робить її тестованою для автотесту?",
          "A spec says: \"ForgeBoard search should be fast and reliable.\" Which rewrite makes it testable?",
          [
            "GET /api/tasks?q=auth повертає HTTP 200 зі збігами без урахування регістру; порожній q повертає до 50 записів. Для погодженого набору даних і середовища p95 за 100 запитів < 200 мс",
            "Кнопка пошуку має подобатися дизайнеру",
            "Код повинен використовувати лише короткі змінні",
            "Сервер ніколи не повинен логувати запити",
          ],
          0,
          why(
            "Тестована вимога задає конкретні вхідні умови, статус-код, форму відповіді та границі поведінки.",
            "Testable specs state exact inputs, status codes, invariants, and failure contracts.",
          ),
        ), optionsEn: ["GET /api/tasks?q=auth returns HTTP 200 with case-insensitive matches; empty q returns at most 50 records. For an agreed dataset and environment, p95 over 100 requests is under 200 ms", "The designer likes the search button", "The code uses only short variable names", "The server never logs requests"] },
        { ...codeRead(
          "st-req2",
          "Обидва приклади перевіряють помилку відсутнього заголовка. Чому перевірка HTTP-контракту зазвичай менш крихка?",
          "Both examples check a missing-title error. Why is the HTTP contract assertion usually less brittle?",
          "ts",
          "// Implementation-coupled: expect(taskService.privateErrors[0].internalId).toBe(17)\n// Public contract for the same invalid request:\nexpect(await res.json()).toMatchObject({ error: \"title_required\" });\nexpect(res.status).toBe(400);",
          [
            "Він перевіряє спостережуваний HTTP-контракт, а не внутрішній ідентифікатор помилки",
            "Тому що HTTP 400 швидший за перевірку рядка",
            "Тому що `toMatchObject` пропускає будь-які помилки",
            "Бо рефакторинг ніколи не змінює API",
          ],
          0,
          why(
            "Публічний статус і код помилки лишаються перевірними після внутрішнього рефакторингу, якщо контракт не змінився.",
            "The public status and error code remain testable after an internal refactor if the contract has not changed.",
          ),
        ) as Extract<Exercise, { type: "code_read" }>, optionsEn: ["It checks the observable HTTP contract rather than an internal error identifier", "HTTP 400 is faster than checking a string", "toMatchObject ignores every error", "Refactoring never changes APIs"] },
      ], { baseXp: 22 },
    ),
    lesson(
      "st-req-levels",
      "Вибір рівня тесту: Unit, Component, Integration, E2E",
      "Choosing the Right Test Level",
      2, true, [
        concept("st-req-levels-concept", "Рівень за ризиком і вартістю", "Choosing a level by risk and cost", {
          uk: "Модульний тест швидко перевіряє ізольовану логіку, компонентний — поведінку інтерфейсу, інтеграційний — взаємодію частин, а наскрізний — важливий шлях через систему. Один дефект іноді можна виявити на кількох рівнях. Обирайте найкориснішу комбінацію з огляду на ризик, швидкість і впевненість.",
          en: "Unit tests quickly check isolated logic, component tests check UI behavior, integration tests check interactions, and end-to-end tests exercise important paths through the system. A defect can sometimes be detected at several levels. Choose a useful mix based on risk, speed, and confidence.",
        }),
        { ...matchEx(
          "st-req3",
          "Для цих прикладів зіставте дефект із відповідним рівнем перевірки; інші рівні також можуть бути корисними",
          "For these examples, match each defect to a suitable test level; other levels can also be useful",
          [
            { left: "Невірний розрахунок знижки в чистій функції", right: "Модульний тест функції" },
            { left: "Помилка валідації форми та ARIA-стану кнопки", right: "Компонентний тест інтерфейсу" },
            { left: "Помилка SQL-фільтрації в API", right: "Інтеграційний тест API з базою" },
            { left: "Роутер блокує перехід після входу в браузері", right: "Наскрізний тест у браузері" },
          ],
        ), pairsEn: [
          { left: "Incorrect discount calculation in a pure function", right: "Unit test of the function" },
          { left: "Form validation and button ARIA-state defect", right: "UI component test" },
          { left: "Incorrect SQL filtering in the API", right: "API and database integration test" },
          { left: "Router blocks navigation after browser login", right: "Browser end-to-end test" },
        ] },
        { ...mcq(
          "st-req4",
          "Передбачте: команда перенесла всі unit-перевірки формул у повільні Playwright E2E-тести через UI. Який наслідок найбільш імовірний?",
          "Predict: a team puts all formula checks into browser E2E instead of unit tests. What happens?",
          [
            "CI може працювати повільніше, а причину падіння важче локалізувати через більше залежностей",
            "Баги в математиці самі зникають",
            "E2E-тести починають виконуватись за 1 мілісекунду",
            "Unit-помилки перестають існувати у продакшені",
          ],
          0,
          why(
            "Перевернута піраміда (ice-cream cone) сповільнює розробку та замилює точність діагностики.",
            "Over-relying on E2E for pure logic makes builds slow and failures noisy to isolate.",
          ),
        ), optionsEn: ["CI may be slower and failures harder to isolate due to additional dependencies", "Math bugs disappear by themselves", "E2E tests execute in one millisecond", "Unit-level bugs can never occur in production"] },
      ], { baseXp: 22 },
    ),
    exam("st-req-exam", "Контрольна: тестовані вимоги", "Checkpoint: Testable Requirements", 2, [
      { ...mcq(
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
      ), optionsEn: ["It fails for a violated requirement and passes consistently for correct behavior", "It mocks its own function to always return true", "It skips assertions on timeout", "It checks only that a file exists"] },
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
        concept("st-ut-tautology-concept", "Перевіряйте реальну логіку", "Exercise the real logic", {
          uk: "Тест повинен запускати саме ту поведінку, яку перевіряє. Замінюйте зовнішні залежності контрольованими двійниками за потреби, але не підміняйте саму функцію під тестом фіксованою відповіддю. Перевірте, чи впаде тест, якщо порушити відповідне правило; одна така перевірка не доводить відсутності інших дефектів.",
          en: "A test must execute the behavior it claims to verify. Replace external dependencies with controlled doubles when useful, but do not replace the function under test with a canned answer. Check whether the test fails when the relevant rule is broken; one such check does not prove the absence of other defects.",
        }),
        { ...codeRead(
          "st-ut1",
          "Чому цей тест зелений навіть коли фільтр зламаний? У чому критичний дефект тесту?",
          "Diagnose why this test passes on broken code: What is fundamentally broken about this test?",
          "ts",
          "import { filterTasks } from './filterTasks';\nvi.mock('./filterTasks', () => ({ filterTasks: () => [{ id: '1' }] }));\nit('filters tasks', () => {\n  expect(filterTasks([], 'bug')).toHaveLength(1);\n});",
          [
            "Тест замокав саму функцію, яку нібито тестує, тож реально перевіряє лише вигаданий мок замість продакшн-коду",
            "Масив `[]` заборонений у Vitest",
            "Довжина масиву завжди має дорівнювати 2",
            "Функція повертає проміс",
          ],
          0,
          why(
            "Тут підмінено саме функцію під тестом, тому її реальна логіка не виконується. Зовнішні залежності за потреби можна підмінити окремо.",
            "Here the function under test itself is replaced, so its real logic never runs. External dependencies can still be replaced separately when useful.",
          ),
        ) as Extract<Exercise, { type: "code_read" }>, optionsEn: ["It mocks the function under test and exercises the fake rather than production logic", "An empty array is forbidden in Vitest", "An array must always have length 2", "The function returns a promise"] },
        { ...codeOutputMcq(
          "st-ut2",
          "Як ця функція обробить значення 0, 101, 1.5 і abc?",
          "How does this function handle 0, 101, 1.5, and abc?",
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
            "Усі наведені значення не проходять умову й спричиняють RangeError; окремі assertions можуть перевірити кожен випадок.",
            "Each listed input fails the condition and throws RangeError; separate assertions can verify each case.",
          ),
        ) as Extract<Exercise, { type: "code_output" }>, optionsEn: ["Throws RangeError(\"invalid_limit\") for \"0\", \"101\", \"1.5\", and \"abc\"", "Silently returns 0", "Returns NaN for \"abc\" without an error", "Accepts 101 and returns 100"] },
      ], { baseXp: 24 },
    ),
    lesson(
      "st-ut-pure-refactor",
      "Відокремлення чистої логіки від побічних ефектів",
      "Extracting Pure Logic for Deterministic Tests",
      3, true, [
        concept("st-ut-pure-refactor-concept", "Керуйте часом і станом", "Control time and state", {
          uk: "Результат функції, що залежить від системного часу або змінює отриманий масив, складніше перевіряти ізольовано. Передайте поточний час параметром і зафіксуйте копію вхідних даних до виклику. Для перевірки мутації використовуйте вхід, порядок якого сортування справді змінить.",
          en: "A function depending on system time or mutating its input is harder to test in isolation. Pass the current time as a parameter and save a copy of input data before calling it. To detect mutation, use input whose order sorting actually changes.",
        }),
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
        { ...mcq(
          "st-ut4",
          "Функція `sortTasks(tasks)` сортує масив на місці. Якщо вхід не відсортований і порядок зміниться, яка перевірка виявить мутацію?",
          "Given an unsorted input that changes order, which test detects that `sortTasks(tasks)` mutates the caller’s array?",
          [
            "`const copy = structuredClone(input); sortTasks(input); expect(input).toEqual(copy);`",
            "`expect(sortTasks([])).toEqual([])`",
            "`expect(typeof sortTasks).toBe(\"function\")`",
            "`expect(sortTasks([a]).length).toBe(1)`",
          ],
          0,
          why(
            "Знімок до виклику виявить зміну порядку в цьому прикладі; одного входу недостатньо, щоб довести відсутність усіх можливих мутацій.",
            "The pre-call snapshot detects the order change in this example; one input cannot prove the absence of every possible mutation.",
          ),
        ), optionsEn: ["const copy = structuredClone(input); sortTasks(input); expect(input).toEqual(copy);", "expect(sortTasks([])).toEqual([])", "expect(typeof sortTasks).toBe(\"function\")", "expect(sortTasks([a]).length).toBe(1)"] },
      ], { baseXp: 24 },
    ),
    exam("st-ut-exam", "Контрольна: unit-тестування", "Checkpoint: Unit Testing", 3, [
      { ...mcq(
        "st-ut-e1",
        "Що означає, що тест убив конкретного мутанта?",
        "What does it mean that a test killed a particular mutant?",
        [
          "Тест проходить на оригіналі та падає після конкретної внесеної зміни",
          "Тест завжди зелений навіть при видаленні логіки",
          "Тест використовує випадкові числа без seed",
          "Тест перевіряє лише TypeScript типи без виконання коду",
        ],
        0,
        why("Цей результат стосується конкретної мутації й не гарантує виявлення всіх інших дефектів.", "This result applies to that particular mutation and does not guarantee detection of all other defects."),
      ), optionsEn: ["The test passes on the original and fails after the particular injected change", "The test stays green after deleting the logic", "The test uses unseeded random numbers", "The test checks only TypeScript types without running code"] },
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
        concept("st-bf-boundaries-concept", "Перевірки біля меж", "Checking near boundaries", {
          uk: "Спершу зафіксуйте, чи включені межі та як нормалізується ввід. Для довжини 3–80 після trim перевірте 2, 3, 80 і 81 символ після нормалізації; додайте пробіли, щоб перевірити trim. Окремо визначте, як система рахує символи Unicode.",
          en: "First establish whether limits are inclusive and how input is normalized. For a length of 3–80 after trimming, test 2, 3, 80, and 81 characters after normalization; add whitespace to exercise trimming. Specify separately how the system counts Unicode characters.",
        }),
        { ...mcq(
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
            "Цей набір може виявити помилки порівняння й відсутній trim; очікувані результати треба перевірити для кожного входу.",
            "This set can expose comparison mistakes and a missing trim; assert the expected result for each input.",
          ),
        ), optionsEn: ["\"  ab  \" (2 after trim), \"abc\" (3), a string of 80 characters, and a string of 81 characters", "\"Buy milk\", \"Fix bug\", \"Deploy\"", "Only a 20-character string", "Only an empty string"] },
        { ...codeRead(
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
        ) as Extract<Exercise, { type: "code_read" }>, optionsEn: ["expect(paginate([a, b, c], 1, 2)).toEqual([a, b])", "expect(paginate([], 1, 10)).toEqual([])", "expect(paginate([a], 0, 1)).toEqual([a])", "expect(Array.isArray(paginate([a], 2, 1))).toBe(true)"] },
      ], { baseXp: 24 },
    ),
    lesson(
      "st-bf-fixtures",
      "Фабрики фікстур і витік спільного стану",
      "Fixture Builders & Test Isolation",
      3, false, [
        concept("st-bf-fixtures-concept", "Дані для ізольованого тесту", "Data for an isolated test", {
          uk: "Спільний змінюваний об’єкт переносить стан між тестами й робить результат залежним від порядку. Створюйте нову фікстуру для кожного випадку, а дані в базі прибирайте або ізолюйте. Лічильник у процесі не гарантує унікальності між паралельними воркерами чи окремими запусками.",
          en: "A shared mutable object leaks state between tests and makes outcomes order-dependent. Create a fresh fixture for each case and clean up or isolate database data. A per-process counter does not guarantee uniqueness across parallel workers or separate runs.",
        }),
        { ...mcq(
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
        ), optionsEn: ["Later tests can read state changed by an earlier test and fail in certain execution orders", "Vitest forbids constants outside functions", "JavaScript automatically freezes all objects", "The test file name changes"] },
        codeFill(
          "st-bf4",
          "Додати лічильник для адрес у межах одного процесу",
          "Add a per-process counter to fixture email addresses",
          "ts",
          "// Per-process counter; use a run/worker ID for shared parallel databases.\nlet seq = 0;\nexport const makeUser = (over = {}) => ({ email: `user-${++___}@example.test`, ...over });",
          ["seq"],
          true,
        ),
      ], { baseXp: 24 },
    ),
    exam("st-bf-exam", "Контрольна: межі та фікстури", "Checkpoint: Boundaries & Fixtures", 3, [
      { ...mcq(
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
      ), optionsEn: ["Representative Unicode, long strings, URL special characters, empty and null states", "Only test1 and test2", "Only 123 for every string field", "An empty fixture file with no tests"] },
      { ...mcq(
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
      ), optionsEn: ["The API returns a deterministic error or clamps to the valid limit according to its contract", "Returns random rows from the end", "Fails with an unhandled 500", "Ignores security filters"] },
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
        concept("st-rct-user-event-concept", "Перевірка з погляду користувача", "Testing from the user’s perspective", {
          uk: "Знаходьте елементи за доступними ролями та підписами й відтворюйте реальну взаємодію. Якщо інтерфейс оновлюється асинхронно, дочекайтеся потрібного стану через findBy або інше очікування умови. Перевірка семантичного запиту корисна, але не замінює повного аудиту доступності.",
          en: "Find elements by accessible roles and labels, then simulate a real interaction. When the UI updates asynchronously, await the desired state with findBy or another condition-based wait. A semantic query is useful, but it does not replace a complete accessibility audit.",
        }),
        codeOrderAuto(
          "st-rct1",
          "Складіть тест відправлення доступної форми задачі в React Testing Library",
          "Order an accessible form submission test in React Testing Library",
          "tsx",
          [
            "const user = userEvent.setup();",
            "render(<TaskForm onCreate={onCreate} />);",
            "await user.type(screen.getByLabelText(/task title/i), \"Write tests\");",
            "await user.click(screen.getByRole(\"button\", { name: /add task/i }));",
            "expect(onCreate).toHaveBeenCalledWith({ title: \"Write tests\" });",
          ],
          why(
            "Запити використовують підпис поля та доступне ім'я кнопки; це корисний сигнал семантики, але не повний аудит доступності.",
            "The queries use the field label and button's accessible name; this is a useful semantic signal, not a complete accessibility audit.",
          ),
        ),
        { ...codeRead(
          "st-rct2",
          "Знайдіть причину, чому тест не перевіряє реальний асинхронний ререндер: Що не так із цим тестом для форми з клієнтською/асинхронною валідацією?",
          "Spot missing async wait after state update: What is broken if validation renders an alert asynchronously?",
          "tsx",
          "it(\"shows validation error\", async () => {\n  render(<TaskForm />);\n  fireEvent.click(screen.getByRole(\"button\", { name: /save/i }));\n  expect(screen.queryByRole(\"alert\")).toBeNull(); // WRONG expectation!\n});",
          [
            "Потрібно чекати повідомлення через `await screen.findByRole(\"alert\")`; якщо це вимагає контракт, окремо перевірити `aria-invalid` на полі",
            "`fireEvent.click` ніколи не викликає React обробники",
            "`role=\"alert\"` не існує в HTML",
            "Треба замінити `render` на `console.log`",
          ],
          0,
          why(
            "`findByRole` чекає асинхронного оновлення стану і робить тест стійким до мікрозадач/Promise.",
            "`await screen.findByRole(\"alert\")` properly awaits async validation feedback.",
          ),
        ) as Extract<Exercise, { type: "code_read" }>, optionsEn: ["Wait for the alert with await screen.findByRole(\"alert\"); if required, check aria-invalid on the input", "fireEvent.click never invokes React handlers", "role=\"alert\" does not exist", "Replace render with console.log"] },
      ], { baseXp: 25 },
    ),
    lesson(
      "st-rct-states",
      "Покриття Loading, Empty, Error та Retry станів",
      "Testing Loading, Empty, Error & Retry States",
      3, false, [
        concept("st-rct-states-concept", "Перевіряйте переходи станів", "Test state transitions", {
        uk: "Дані можуть завантажуватися, бути порожніми або завершитися помилкою. Керуйте результатом запиту в тесті: перевірте стан завантаження, повідомлення про помилку й відновлення після повторної спроби. Мережевий збій відхиляє fetch, але HTTP 500 зазвичай повертає Response з ok=false; перевірте обидва випадки відповідно до коду клієнта. Повторний виклик у тесті має отримати успішну відповідь, щоб перевірка справді дійшла до відновлення.",
        en: "Data may be loading, empty, or fail to load. Control the request outcome in the test: check loading, the error message, and recovery after a retry. A network failure rejects fetch, whereas HTTP 500 normally returns a Response with ok=false; check both cases according to the client code. The retry in the test must receive a successful response to exercise recovery.",
        }),
        { ...mcq(
          "st-rct3",
          "Компонент показує спінер, але при мережевій помилці застрягає у «Loading...» назавжди. Який тест може виявити цей дефект і перевірити відновлення?",
          "A component hangs on \"Loading...\" forever when `fetch` rejects. Which test can detect this and check recovery?",
          [
            "Змоделювати мережевий збій, потім успішну відповідь: перевірити зникнення loading, повідомлення про помилку та задачі після повторної спроби",
            "Перевірити лише початковий спінер до завершення промісу",
            "Замокати `useState`",
            "Перевірити, що компонент рендерить `<div>`",
          ],
          0,
          why(
            "Перехід error -> retry -> success перевіряє відновлення застосунку без перезавантаження сторінки.",
            "Verifying error -> click Retry -> success ensures users can actually recover from transient faults.",
          ),
        ), optionsEn: ["Simulate a network failure followed by success: check loading disappears, the error appears, and tasks render after retry", "Check only the initial spinner before the promise resolves", "Mock useState", "Only check that a div renders"] },
      ], { baseXp: 25 },
    ),
    exam("st-rct-exam", "Контрольна: React-тести", "Checkpoint: React Component Tests", 3, [
      { ...mcq(
        "st-rct-e1",
        "Який запит Testing Library дає найкраще поєднання семантики та стійкості до зміни стилів?",
        "Which Testing Library query best verifies semantic accessibility?",
        ["getByRole / getByLabelText", "getByTestId для всього підряд", "container.firstChild.children[0]", "document.getElementsByTagName(\"div\")[4]"],
        0,
      ), optionsEn: ["getByRole / getByLabelText", "Use getByTestId for everything", "container.firstChild.children[0]", "document.getElementsByTagName(\"div\")[4]"] },
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
        concept("st-int-db-real-concept", "Перевірка взаємодії з базою", "Testing database interactions", {
          uk: "Мок драйвера корисний для ізольованої логіки, але не виконує SQL і не перевіряє обмеження реальної схеми. Інтеграційний тест використовує окрему тестову базу з міграціями, надсилає HTTP-запит і перевіряє відповідь та стан даних. Для перевірки доступу переконайтеся, що заборонена дія не змінила запис.",
          en: "A driver mock helps isolate logic but does not execute SQL or check real schema constraints. An integration test uses a separate migrated test database, sends an HTTP request, and checks both response and data state. For authorization, verify a forbidden action did not mutate the record.",
        }),
        { ...mcq(
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
        ), optionsEn: ["Column mismatches, FOREIGN KEY and NOT NULL violations, incorrect joins and SQL ordering", "Only README typos", "An outdated favicon", "VS Code theme settings"] },
        { ...codeOrderAuto(
          "st-int2",
          "За контрактом API чужа зміна повертає 403. Упорядкуйте інтеграційну перевірку",
          "Under this API contract, a cross-user update returns 403. Order the integration check",
          "ts",
          [
            "Seed userA + task owned by userA and session for userB",
            "Send PATCH /api/tasks/:id with userB cookie and new title",
            "Assert HTTP status is 403 forbidden",
            "Query DB directly to assert task title in Postgres remained unchanged",
          ],
          why(
            "Перевірка HTTP 403 та незмінності конкретного рядка допомагає виявити мутацію до відповіді; інші можливі побічні ефекти перевіряють окремо.",
            "Checking both HTTP 403 and the specific unchanged row can reveal mutation before the response; check other possible side effects separately.",
          ),
        ), linesUk: [
          "Надіслати PATCH /api/tasks/:id із cookie користувача B та новою назвою",
          "Перевірити HTTP-статус 403",
          "Перевірити в PostgreSQL, що назва задачі не змінилася",
          "Створити користувача A, його задачу та сесію користувача B",
        ] },
      ], { baseXp: 26 },
    ),
    lesson(
      "st-int-isolation",
      "Очищення стану між тестами та детермінований сидинг",
      "State Isolation Between Integration Cases",
      4, false, [
        concept("st-int-isolation-concept", "Повторювані запуски", "Repeatable runs", {
          uk: "Статична адреса з унікальним обмеженням може залишитися після першого запуску й зламати наступний. Ізолюйте фікстури за тестом або запуском і прибирайте їх чи відкочуйте транзакцію там, де це можливо. Транзакція тесту не відкотить запис, який HTTP-сервер закомітив через інше з'єднання. Для такого сценарію потрібна узгоджена ізоляція з'єднання або окрема база чи схема й надійне очищення. Очищення виконуйте лише в спеціальній тестовій базі.",
          en: "A fixed address under a unique constraint may remain after the first run and break the next. Isolate fixtures by test or run, and clean them up or roll back a transaction where possible. A test transaction cannot roll back a write committed by the HTTP server through another connection. That scenario needs coordinated connection isolation or a separate database or schema and reliable cleanup. Perform cleanup only in a dedicated test database.",
        }),
        { ...codeRead(
          "st-int3",
          "Перший запуск залишив користувача в тестовій базі. Чому другий падає з `duplicate key value violates unique constraint`?",
          "The first run left the user in the test database. Why does the second run fail with `duplicate key value violates unique constraint`?",
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
        ) as Extract<Exercise, { type: "code_read" }>, optionsEn: ["A fixed unique key is inserted again without cleanup, rollback, or a unique namespace", "PostgreSQL deletes indexes after the first run", "beforeAll runs only on Linux", "Drizzle does not support email"] },
        { ...mcq("st-int4", "HTTP-сервер використовує окреме з'єднання та комітить запис. Чи прибере його rollback транзакції тесту?", "The HTTP server uses a separate connection and commits a write. Will rolling back the test's transaction remove it?", ["Ні; потрібна спільна ізоляція з'єднання або окрема тестова база чи схема з очищенням", "Так, rollback автоматично охоплює всі з'єднання", "Так, якщо відповідь має статус 201", "Ні, але наступний запуск завжди видалить запис сам"], 0, why("Транзакції прив'язані до з'єднань; окремо закомічений запис не відкочується транзакцією тесту.", "Transactions are bound to connections; a separately committed write is not rolled back by the test transaction.")), optionsEn: ["No; use coordinated connection isolation or a separate test database or schema with cleanup", "Yes, rollback automatically covers every connection", "Yes, if the response is 201", "No, but the next run always deletes the record automatically"] },
      ], { baseXp: 26 },
    ),
    exam("st-int-exam", "Контрольна: API + БД інтеграційні тести", "Checkpoint: API + DB Integration", 4, [
      { ...mcq(
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
      ), optionsEn: ["Verify the row persisted and GET returns the expected owner and fields; verify invalid input does not create a row", "Only that the server avoided an out-of-memory crash", "Browser FPS", "The developer computer name"] },
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
        concept("st-e2e-locators-flaky-concept", "Очікуйте спостережуваний стан", "Wait for an observable state", {
          uk: "Наскрізний тест перевіряє ключовий шлях користувача через реальний браузер. Вибирайте локатори за роллю та доступним ім’ям і чекайте очікуваного стану через автоматично повторювані assertions. Фіксована затримка може бути недостатньою або зайвою. Якщо контракт вимагає перевірки мережевої відповіді, налаштуйте її очікування до кліку, уточніть метод і шлях запиту, потім перевірте статус і стан інтерфейсу. Так швидка відповідь не промайне до початку прослуховування.",
          en: "An end-to-end test exercises an important user path in a real browser. Prefer locators based on role and accessible name, and await the expected state with auto-retrying assertions. A fixed delay may be too short or unnecessarily long. If the contract requires checking a network response, start waiting before the click, match the request method and path, then check the status and UI state. This avoids missing a fast response before the listener starts.",
        }),
        { ...mcq(
          "st-e2e1",
          "Тест використовує `await page.waitForTimeout(2000)` після натискання Save і іноді падає в CI. Яке виправлення надійне?",
          "An E2E test calls `await page.waitForTimeout(2000)` after clicking Save and flakes under CI load. What fixes it properly?",
          [
            "Прибрати фіксований sleep і чекати конкретний очікуваний стан: `await expect(page.getByText(\"Saved\")).toBeVisible()`; за потреби окремо чекати відповідь мережі",
            "Збільшити таймаут до `waitForTimeout(15000)`",
            "Перезапускати CI 10 разів вручну",
            "Видалити тест із конфігу",
          ],
          0,
          why(
            "Playwright web-first assertions автоматично повторюють перевірку до готовності UI без штучних затримок.",
            "Web-first assertions retry the expected UI condition; investigate other sources of flakiness separately.",
          ),
        ), optionsEn: ["Replace the fixed sleep with an assertion that waits for the expected visible state; wait for a network response separately when needed", "Increase the timeout to 15 seconds", "Manually rerun CI ten times", "Delete the test from configuration"] },
        codeFill(
          "st-e2e2",
          "Дочекатися видимого результату в Playwright",
          "Playwright auto-retrying visibility assertion",
          "ts",
          "await expect(page.getByRole(\"heading\", { name: \"ForgeBoard\" })).___();",
          ["toBeVisible"],
          true,
        ),
        { ...mcq("st-e2e3", "Тест натискає Save, а потім починає чекати відповідь POST. Швидка відповідь іноді вже минула. Як усунути цю гонку?", "A test clicks Save and only then waits for the POST response. The fast response sometimes already occurred. How should it avoid this race?", ["Почати очікування потрібної відповіді до кліку, потім перевірити статус і стан інтерфейсу", "Додати довший sleep після кліку", "Прибрати всі перевірки відповіді", "Змінити колір кнопки"], 0, why("Підписка до дії не пропустить швидку відповідь; перевіряйте метод і шлях, щоб не спіймати сторонній запит.", "Registering the wait before the action avoids missing a fast response; match method and path to avoid an unrelated request.")), optionsEn: ["Start waiting for the matching response before the click, then check its status and the UI state", "Add a longer sleep after the click", "Remove all response assertions", "Change the button color"] },
      ], { baseXp: 26 },
    ),
    lesson(
      "st-forgeboard-suite-lab",
      "Лаб: набір тестів ForgeBoard проти інжектованих багів (M7)",
      "Lab: ForgeBoard Test Suite vs Injected Bugs (M7)",
      4, false, [
        concept("st-forgeboard-suite-lab-concept", "Перевірте чутливість набору", "Check the suite’s sensitivity", {
          uk: "У лабораторній роботі створіть тести для узгоджених правил ForgeBoard: правильна реалізація має проходити, а наведені навмисні порушення — виявлятися. Порівнюйте результати на обох варіантах і досліджуйте причину невдачі. Вбудована вправа нижче перевіряє текст, а локальна лабораторна робота запускає тестовий набір.",
          en: "In the lab, write tests for agreed ForgeBoard behavior: the correct implementation should pass, and the supplied intentional faults should be detected. Compare results on both variants and investigate failures. The embedded exercise below checks text; the local lab runs the test suite.",
        }),
        { ...mcq(
          "st-fb1",
          "Головний критерій якості вашого тест-набору для ForgeBoard в Milestone 7:",
          "What defines a strong test suite for ForgeBoard in Milestone 7?",
          [
            "Тести проходять на коректній реалізації й виявляють визначені навмисно зламані варіанти бізнес-логіки та авторизації",
            "Покриття рядків 100% без жодного `expect`",
            "Тести проходять навіть після видалення перевірок доступу",
            "Тести запускаються лише з пропущеними `.skip`",
          ],
          0,
          why(
            "Перевірка на навмисно зламаних варіантах показує, що тести виявляють саме ці дефекти, але не всі можливі помилки.",
            "Testing against intentionally broken variants provides evidence that assertions detect those particular faults.",
          ),
        ), optionsEn: ["Tests pass on the correct implementation and detect the specified intentionally broken business logic and authorization variants", "100% line coverage without assertions", "Tests pass after authorization checks are removed", "Tests run only when marked skip"] },
        codeProject(
          "st-fb2",
          "Додайте перевірку, що відповідь для чужої задачі має статус 403. Вбудована перевірка шукає текст, не виконує тест; M7 нижче дозволяє запускати повний набір проти зламаних варіантів.",
          "Add an assertion that a response for another user's task has status 403. The in-app check searches text and does not execute the test; M7 below runs the full suite against broken variants.",
          [
            {
              id: "ts",
              name: "forgeboard.test.ts",
              language: "typescript",
              starter: `import assert from "node:assert/strict";\n\nexport function verifyOwnershipCheck(handlerStatusForOtherUser: number) {\n  // TODO: assert the expected response for another user's task\n}\n`,
            },
          ],
          [
            { fileId: "ts", contains: ["assert.equal", "403"] },
          ],
          {
            hintUk: "У локальному пакеті M7 є broken-варіанти для перевірки чутливості ваших тестів.",
            hintEn: "The M7 local lab package includes deliberately broken variants so you can check whether your suite catches those specific faults.",
          },
        ),
      ], { baseXp: 45 },
    ),
    exam("st-e2e-exam", "Контрольна: E2E та стратегія CI", "Checkpoint: E2E & CI Quality Gates", 4, [
      { ...mcq(
        "st-e2e-e1",
        "Яка комбінація кроків CI балансує швидкість зворотного зв'язку та впевненість у релізі?",
        "Which CI pipeline order gives the fastest feedback while preserving release confidence?",
        [
          "Typecheck і швидкі Unit/Component tests першими, далі API+Postgres integration і smoke E2E на зібраному артефакті",
          "Лише 45-хвилинний E2E без unit-тестів і typecheck",
          "Запуск тестів вручну лише раз на рік",
          "Пропуск усіх падінь через `|| true`",
        ],
        0,
      ), optionsEn: ["Run typecheck and fast unit/component tests first, then API/Postgres integration and smoke E2E on the built artifact", "Run only a 45-minute E2E suite without unit tests or typecheck", "Run tests manually once a year", "Ignore every failure with || true"] },
      { ...mcq(
        "st-e2e-e2",
        "Якщо E2E впав у CI, який артефакт дає найбільше контексту без вгадування?",
        "Which CI artifact helps diagnose a failed headless browser test fastest?",
        ["Playwright trace / screenshot + логи API сервера", "Лише статус exit code 1", "Розмір node_modules", "Версія npm cache"],
        0,
      ), optionsEn: ["Playwright trace or screenshot plus API server logs", "Only exit code 1", "Size of node_modules", "npm cache version"] },
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
