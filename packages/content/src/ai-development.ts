import type { CourseContent } from "./types.js";
import {
  codeFill,
  codeOrderAuto,
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

const taskSpecs = unit(
  "ai_task_specs",
  "Постановка задачі та обмежень для AI-інструментів",
  "Task Specification & Constraints (No Paid AI Required)",
  [
    lesson(
      "ai-ts-spec",
      "Від розмитого промпта до чіткого контракту та критеріїв приймання",
      "Turning Vague Prompts into Testable Contracts",
      2, true, [
        concept(
          "ai-ts-spec-concept",
          "Від цілі до перевірюваного контракту",
          "From a goal to a testable contract",
          {
            uk: "Опишіть поточну проблему, бажану поведінку й межі зміни. Для API вкажіть маршрут, формат входу й відповіді, авторизацію, крайові випадки та помилки. Додайте приклади перевірок: неавторизований запит отримує 401, а фільтр не повертає чужі записи. Якщо вимога неоднозначна, зафіксуйте припущення або з'ясуйте її до реалізації. Специфікація зменшує кількість припущень, але не замінює запуск тестів і рев'ю результату.",
            en: "Describe the current problem, desired behavior, and scope. For an API, specify the route, input and response formats, authorization, edge cases, and errors. Add verification examples: an unauthenticated request receives 401 and a filter does not return another user's records. If a requirement is ambiguous, record the assumption or resolve it before implementation. A specification reduces assumptions but does not replace running tests and reviewing the result.",
          },
        ),
        ({ ...mcq(
          "ai-ts1",
          "Порівняйте два завдання для AI-асистента: A) «Зроби сторінку задач»; B) «Додай ендпоїнт GET /api/tasks?status=todo|done з перевіркою req.user.id, лімітом 1..50 через Zod і 2 інтеграційними тестами (401 та фільтр)». Чому B працює набагато краще?",
          "Why does spec (B) with exact route, Zod bounds, ownership rule, and required tests outperform prompt (A) \"Build tasks page\"?",
          [
            "Чіткі інваріанти й обмеження різко звужують простір помилкових припущень і дають готовий критерій перевірки результату",
            "Тому що модель витрачає більше електрики",
            "Бо в (A) немає знаків пунктуації",
            "Бо (B) вимикає компілятор TypeScript",
          ],
          0,
          why(
            "Вимірювані вимоги допомагають перевірити маршрут, доступ і фільтрацію; важливі крайові випадки варто додати окремо.",
            "Measurable requirements help verify the route, access, and filtering; add relevant edge cases separately.",
          ),
        ), optionsEn: ["Clear invariants and constraints reduce mistaken assumptions and provide concrete verification criteria","The model consumes more electricity","A has no punctuation","B disables the TypeScript compiler"] }),
        ({ ...codeOrderAuto(
          "ai-ts2",
          "Складіть мінімально достатню структуру запиту на зміну коду з AI",
          "Order an effective AI coding task specification",
          "text",
          [
            "Goal & scope: single route or component + exact file paths",
            "Constraints & invariants: authz rules, schema limits, forbidden edits",
            "Context: relevant types, existing error envelope, sample caller",
            "Verification requirement: commands & test cases the diff must satisfy",
          ],
        ), linesUk: ["Обмеження та інваріанти: права доступу, межі схеми й заборонені зміни","Контекст: потрібні типи, наявний формат помилок і приклад виклику","Перевірка: команди й тестові випадки, які має пройти зміна","Ціль і межі: конкретний маршрут або компонент та відповідні файли"] }),
      ], { baseXp: 22 },
    ),
    lesson(
      "ai-ts-non-goals",
      "Фіксація того, що НЕ можна чіпати (Invariants & Non-Goals)",
      "Stating Non-Goals & Preserving Contracts",
      2, true, [
        concept(
          "ai-ts-non-goals-concept",
          "Межі зміни та збережені контракти",
          "Scope and preserved contracts",
          {
            uk: "Разом із бажаною зміною запишіть, що має залишитися сумісним: формат помилок, права доступу та поведінка наявних клієнтів. Окремо назвіть непов'язані зміни, які не входять у задачу. Наприклад, фільтр задач може потребувати нового тесту, але не повинен мовчки змінювати `{ error: ... }` на `{ message: ... }`. Порівняйте diff з цими межами та перевірте сумісність тестами.",
            en: "Alongside the requested change, state what must remain compatible: error formats, access rules, and existing client behavior. Name unrelated changes that are outside the task. For example, a task filter may need a new test, but must not silently change `{ error: ... }` to `{ message: ... }`. Compare the diff with those boundaries and test compatibility.",
          },
        ),
        ({ ...mcq(
          "ai-ts3",
          "Згенерований патч для фільтрації задач попутно змінив формат JSON помилки з `{ error: \"invalid_status\" }` на `{ message: \"Bad\" }` і переписав unrelated CSS. Чого бракувало в специфікації?",
          "An AI patch fixed filtering but changed API error shape from `{ error: ... }` to `{ message: ... }` and edited unrelated CSS. What was missing?",
          [
            "Явного переліку незмінних контрактів та заборони чіпати незв'язані файли (narrow diff scope)",
            "Повторної генерації тим самим порожнім промптом",
            "Вимкнення ESLint",
            "Завантаження 50MB залежностей",
          ],
          0,
        ), optionsEn: ["An explicit list of preserved contracts and a restriction on unrelated edits","Repeating the same empty prompt","Disabling ESLint","Downloading 50 MB of dependencies"] }),
      ], { baseXp: 22 },
    ),
    exam("ai-ts-exam", "Контрольна: специфікація задач", "Checkpoint: Task Specifications", 2, [
      ({ ...mcq(
        "ai-ts-e1",
        "Що найкраще підтверджує виконання специфікації маршруту?",
        "What best demonstrates that a route specification has been met?",
        [
          "Рев'ю змін і результати тестів на поведінку, авторизацію та збережені контракти",
          "Запевнення асистента без запуску перевірок",
          "Великий diff незалежно від його змісту",
          "Відсутність опису помилок",
        ],
        0,
      ), optionsEn: ["Review the changes and test behavior, authorization, and preserved contracts","Trust the assistant without running checks","Use a large diff regardless of content","Omit error descriptions"] }),
    ]),
  ],
);

const contextSelection = unit(
  "ai_context_selection",
  "Вибір контексту та мінімізація шуму",
  "Context Selection & Privacy Boundaries",
  [
    lesson(
      "ai-cs-signal",
      "Що передавати в контекст: типи, схеми, тести замість усього репозиторію",
      "Curating High-Signal Context Over Raw File Dumps",
      3, true, [
        concept(
          "ai-cs-signal-concept",
          "Контекст, достатній для перевірки гіпотези",
          "Context sufficient to test a hypothesis",
          {
            uk: "Почніть із симптому, мінімального відтворення, пов'язаного коду, контракту й актуального результату тесту. За потреби поступово додавайте залежності та пов'язані файли; фіксована кількість рядків не гарантує достатнього контексту. Перед передачею назовні перевірте дозвіл і умови обробки, приберіть секрети та персональні дані з коду й діагностики. Збережіть корисну структуру помилки через безпечні плейсхолдери. Навіть із добрим контекстом запропоновану причину перевіряють експериментом або тестом.",
            en: "Start with the symptom, a minimal reproduction, relevant code, the contract, and current test output. Add dependencies and related files as needed; a fixed line count does not guarantee sufficient context. Before sending anything externally, check authorization and processing terms, and remove secrets and personal data from code and diagnostics. Preserve useful error structure with safe placeholders. Even with good context, verify a proposed cause with an experiment or test.",
          },
        ),
        ({ ...matchEx(
          "ai-cs1",
          "Оберіть корисний контекст проти небезпечного або зайвого сміття",
          "Classify context items by value and risk",
          [
            { left: "Zod-схема тіла запиту, Drizzle-таблиця, наявний схожий маршрут", right: "Високосигнальний контекст" },
            { left: "Повний `.env` із паролями БД та реальними API-ключами", right: "Заборонено: витік секретів" },
            { left: "Багатотисячний lockfile або `dist/` бандли", right: "Шум, що погіршує фокус і точність" },
          ],
        ), pairsEn: [
          { left: "Request Zod schema, Drizzle table, and a similar existing route", right: "High-signal context" },
          { left: "Complete .env with database passwords and real API keys", right: "Forbidden: credential exposure" },
          { left: "A huge lockfile or dist bundles", right: "Usually noise for an unrelated task" },
        ] }),
        ({ ...mcq(
          "ai-cs2",
          "Ви надаєте приклад помилки тесту. Який контекст найкраще допоможе перевірити гіпотезу?",
          "When diagnosing a saved test failure, which context best helps test a hypothesis?",
          [
            "Очищене повідомлення помилки, відтворюваний вхід тесту та потрібний пов'язаний код і контракт",
            "Лише фразу «тести не працюють, виправ»",
            "Тільки package.json без файлів коду",
            "Скриншот робочого столу без тексту",
          ],
          0,
        ), optionsEn: ["A redacted error, reproducible test input, and relevant code and contract", "Only 'tests do not work, fix them'", "Only package.json with no code", "A desktop screenshot without text"] }),
      ], { baseXp: 24 },
    ),
    exam("ai-cs-exam", "Контрольна: вибір контексту", "Checkpoint: Context Selection", 3, [
      ({ ...mcq(
        "ai-cs-e1",
        "Що потрібно зробити ПЕРЕД вставкою конфігу або логів у будь-який зовнішній AI-чат?",
        "What must happen before sharing logs or configs with any external AI service?",
        [
          "Перевірити дозвіл і умови обробки, мінімізувати дані та прибрати секрети й приватні дані",
          "Скопіювати сирий `.env` для максимальної точності",
          "Додати приватні ключі SSH",
          "Перетворити секрети в Base64 (Base64 легко декодується і не є шифруванням!)",
        ],
        0,
      ), optionsEn: ["Check authorization and processing terms, minimize data, and remove secrets and private data", "Copy the raw .env for maximum accuracy", "Add private SSH keys", "Convert secrets to Base64, which is easily decoded and is not encryption"] }),
    ]),
  ],
);

const smallDiffsReview = unit(
  "ai_small_diffs_review",
  "Малі зміни та рев'ю AI-диффів (за методикою GitHub)",
  "Small Diffs & Reviewing Saved AI Code",
  [
    lesson(
      "ai-sd-diff-inspection",
      "Чому AI-згенерований код часто виглядає переконливо, але має приховані дефекти",
      "Reading Plausible-Looking Diffs Critically",
      3, true, [
        concept(
          "ai-sd-diff-concept",
          "Рев'ю поведінки, а не лише синтаксису",
          "Review behavior, not just syntax",
          {
            uk: "Прочитайте вимогу й diff разом із навколишнім кодом. Перевірте, хто може викликати змінений маршрут, які поля дозволено змінювати, що станеться з відсутнім записом і як обробляються помилки. Наприклад, передача всього тіла запиту в оновлення може дозволити змінити зайві поля, а фільтрація лише за ID — торкнутися чужого запису. Додайте тести на ці випадки та перевірте фактичний результат запуску; успішна компіляція не доводить коректність поведінки.",
            en: "Read the requirement and diff together with surrounding code. Check who can call the changed route, which fields may change, what happens when a record is missing, and how errors are handled. For example, passing the entire request body to an update can allow unwanted field changes, while filtering only by ID can touch another user's record. Add tests for these cases and inspect the actual results; successful compilation does not prove correct behavior.",
          },
        ),
        ({ ...codeRead(
          "ai-sd1",
          "Огляньте збережений AI-дифф маршруту оновлення задачі ForgeBoard: які критичні прогалини замасковані під «охайний код»?",
          "Review this saved AI diff for subtle security and logic bugs: Which critical bugs hide inside this clean-looking diff?",
          "ts",
          "+ app.patch(\"/api/tasks/:id\", authMiddleware, async (req, res) => {\n+   const body = req.body;\n+   const [updated] = await db.update(tasks).set(body).where(eq(tasks.id, req.params.id)).returning();\n+   return res.json(updated);\n+ });",
          [
            "Mass assignment (неперевірений `req.body`), IDOR (немає перевірки власника) та відсутня обробка запису, який не знайдено",
            "Код ідеальний, не вистачає лише крапки з комою",
            "Помилка лише в назві змінної `updated`",
            "`async` не підтримується в Express",
          ],
          0,
          why(
            "Як підкреслює настанова GitHub із рев'ю AI-коду: AI часто генерує синтаксично красивий happy-path без перевірок безпеки, граничних станів та власників.",
            "Following GitHub's AI code review guidance: fluent happy-path code often omits authz, schema bounds, and 404 guards.",
          ),
        ), optionsEn: ["Unvalidated request fields can cause mass assignment; missing ownership checks permit IDOR; a missing record is not handled","The code is perfect except for a missing semicolon","Only the updated variable name is wrong","Express does not support async"] }),
        ({ ...codeRead(
          "ai-sd2",
          "Знайдіть небезпечний silent catch або втрату помилки в збереженому diff: Чому такий паттерн особливо шкідливий?",
          "Spot silent error swallowing in generated code: Why is this AI-suggested fallback hazardous?",
          "ts",
          "+ try {\n+   await saveProject(payload);\n+ } catch {\n+   return { ok: true, items: [] };\n+ }",
          [
            "Він бреше викликачу (`ok: true`) при реальній аварії запису/БД, перетворюючи збій збереження на тиху втрату даних",
            "try/catch сповільнює компіляцію на годину",
            "Масив `[]` займає 1GB RAM",
            "`ok: true` заборонено в JSON",
          ],
          0,
        ), optionsEn: ["It reports ok: true after a real persistence failure, silently hiding data loss","try/catch slows compilation by an hour","An empty array takes 1 GB of RAM","ok: true is forbidden in JSON"] }),
      ], { baseXp: 25 },
    ),
    lesson(
      "ai-sd-chunking",
      "Дроблення змін на малі інкременти, які реально перевірити",
      "Small Reviewable Increments",
      3, false, [
        concept(
          "ai-sd-chunking-concept",
          "Малі зміни з окремими перевірками",
          "Small changes with separate checks",
          {
            uk: "Розділяйте складну роботу на логічні частини з визначеним результатом і перевіркою кожної. Наприклад, спочатку зафіксуйте тестом поточний контракт, потім змініть авторизацію й запустіть відповідні тести, а після цього перевірте інтеграцію. Менший diff зазвичай легше перевірити й діагностувати, але сам розмір не гарантує безпеки; іноді пов'язана зміна кількох файлів необхідна для цілісного контракту.",
            en: "Split complex work into logical increments with a defined outcome and a check for each. For example, first capture the current contract in a test, then change authorization and run relevant tests, then verify integration. A smaller diff is usually easier to review and diagnose, but size alone does not guarantee safety; a coherent contract can require changes across several files.",
          },
        ),
        ({ ...mcq(
          "ai-sd3",
          "Чому 18 змінених файлів без проміжних перевірок можуть ускладнити рев'ю?",
          "Why can 18 changed files without intermediate checks make review harder?",
          [
            "Важче відстежити побічні ефекти й визначити, яка зміна спричинила збій",
            "Git не дозволяє комітити більше 10 файлів",
            "Node запускає лише один файл на проєкт",
            "Браузер кешує старий код на рік",
          ],
          0,
        ), optionsEn: ["It is harder to track side effects and identify which change caused a failure","Git forbids commits with more than ten files","Node runs only one file per project","The browser caches old code for a year"] }),
      ], { baseXp: 24 },
    ),
    exam("ai-sd-exam", "Контрольна: рев'ю збережених diff", "Checkpoint: Reviewing AI Diffs", 3, [
      ({ ...mcq(
        "ai-sd-e1",
        "При рев'ю AI-коду чим небезпечний «виглядає правдоподібно» (plausible-looking code)?",
        "What is the top danger of plausible-looking generated code?",
        [
          "Він проходить поверхневий погляд, але тихо ламає edge cases, авторизацію або вигадує неіснуючі гарантії API",
          "Він завжди містить синтаксичну помилку у 1-му рядку",
          "Він ніколи не компілюється взагалі",
          "Він видаляє git-історію автоматично",
        ],
        0,
      ), optionsEn: ["It can pass a superficial review while breaking edge cases or authorization or inventing API guarantees","It always has a syntax error on the first line","It never compiles","It automatically deletes Git history"] }),
    ]),
  ],
);

const verificationDebugging = unit(
  "ai_verification_debugging",
  "Верифікація, галюцинації API та доказова діагностика",
  "Verification Loops & Catching Hallucinated APIs",
  [
    lesson(
      "ai-vd-hallucinations",
      "Виявлення вигаданих прапорців, методів бібліотек і неіснуючих гарантій",
      "Catching Invented Flags, Library Methods & Fake Claims",
      4, false, [
        concept(
          "ai-vd-hallucinations-concept",
          "Докази для запропонованої зміни",
          "Evidence for a proposed change",
          {
            uk: "Правдоподібна назва методу чи зелений тест ще не доводять коректність. Звірте новий API з установленою версією бібліотеки та її офіційною документацією або вихідним кодом. Переконайтеся, що тест викликає потрібну поведінку й може виявити її порушення: перевірка константи `true` не тестує rate limiter. Запустіть відповідні команди та прочитайте результат; окремо зазначте неперевірені інтеграції й обмеження середовища. Нову залежність оцінюйте за потребою, походженням, підтримкою і ліцензією.",
            en: "A plausible method name or a green test does not prove correctness. Check a new API against the installed library version and its official documentation or source. Ensure a test exercises the behavior and can detect a violation: asserting a constant `true` does not test a rate limiter. Run the relevant commands and read their results; report untested integrations and environment limitations separately. Assess any new dependency for necessity, provenance, maintenance, and license.",
          },
        ),
        ({ ...codeRead(
          "ai-vd1",
          "Збережений приклад: асистент «впевнено» додав вигаданий параметр або тест, який насправді нічого не перевіряє: У чому полягає ілюзія верифікації тут?",
          "Spot invented option or assertion illusion: What illusion of verification happened here?",
          "ts",
          "+ // Added test: \"ensures rate limit blocks spam\"\n+ const blocked = await Promise.resolve(true);\n+ expect(blocked).toBe(true);",
          [
            "Тест перевіряє захардкоджений `Promise.resolve(true)`, жодного разу не викликаючи реальний rate limiter чи Express handler",
            "Promise.resolve не працює з expect",
            "`true` потрібно писати з великої літери",
            "Vitest не тестує rate limit взагалі",
          ],
          0,
          why(
            "Ніколи не приймайте «усе зелено» на віру: читайте кожен assert, перевіряйте, чи виконується реальний код, і запускайте команди власноруч.",
            "Inspect every generated test to confirm it exercises real application paths rather than mocked tautologies.",
          ),
        ), optionsEn: ["The test asserts a hard-coded Promise.resolve(true) and never calls the real rate limiter or handler", "Promise.resolve cannot be used with expect", "true must be capitalized", "Vitest cannot test rate limits"] }),
        ({ ...codeOrderAuto(
          "ai-vd2",
          "Впорядкуйте доказову перевірку змін після будь-якої пропозиції AI",
          "Order the mandatory evidence loop before trusting a generated change",
          "bash",
          [
            "Read entire diff line-by-line against requirements and edge cases",
            "Verify every new dependency/API call against official repo or docs",
            "Run typecheck and behavioral unit/integration tests directly",
            "Write concise explanation of behavior verified and remaining limits",
          ],
        ), linesUk: [
          "Звірте нові залежності та виклики API з офіційним кодом або документацією",
          "Запустіть перевірку типів і поведінкові модульні чи інтеграційні тести",
          "Коротко опишіть перевірену поведінку та наявні обмеження",
          "Прочитайте весь diff відповідно до вимог і крайових випадків",
        ] }),
      ], { baseXp: 25 },
    ),
    exam("ai-vd-exam", "Контрольна: верифікація AI-змін", "Checkpoint: Evidence & Debugging", 4, [
      ({ ...mcq(
        "ai-vd-e1",
        "AI-підказка пропонує імпортувати невідому бібліотеку `express-magic-shield-v9` для CORS. Що зробити перед встановленням?",
        "An AI snippet recommends installing `express-magic-shield-v9`. What must you verify first?",
        [
          "Чи не є пакет вигаданим/typosquatting, чи потрібен він взагалі проти стандартного `cors` або кількох рядків allowlist, його підтримуваність і ліцензію",
          "Одразу додати з `--force` без читання README",
          "Скопіювати токен у залежність",
          "Вимкнути lockfile перевірку",
        ],
        0,
      ), optionsEn: ["Check whether the package exists and is authentic, needed, maintained, and appropriately licensed", "Install immediately with --force without reading the README", "Copy a token into the dependency", "Disable lockfile checks"] }),
    ]),
  ],
);

const privacyDepsCapstone = unit(
  "ai_privacy_deps_capstone",
  "Приватність, залежності та аудит ForgeBoard M10",
  "Privacy, Dependencies & ForgeBoard Review Lab",
  [
    lesson(
      "ai-pd-hygiene",
      "Ризик slopsquatting, ліцензії та відповідальність автора PR",
      "Supply Chain Risks & Author Accountability",
      4, false, [
        concept(
          "ai-pd-hygiene-concept",
          "Перевірка залежностей і відповідальність за результат",
          "Dependency review and responsibility for the result",
          {
            uk: "Назва пакета, запропонована моделлю, може бути помилковою або належати зловмиснику. До встановлення з'ясуйте, чи потрібна залежність, звірте точну назву та джерело з документацією проєкту, оцініть підтримку, ліцензію й ризики скриптів встановлення. Сам факт існування пакета не доводить його безпечність. Автор і команда рев'ю відповідають за перевірку змін за своїми ролями; у разі інциденту важливі відтворення, локалізація впливу та виправлення, а не посилання на генератор коду.",
            en: "A package name suggested by a model can be wrong or controlled by an attacker. Before installation, determine whether it is needed, verify its exact name and source against project documentation, and review maintenance, license, and install-script risks. A package's existence alone does not prove it is safe. The author and review team are responsible for checks according to their roles; after an incident, reproduction, impact containment, and remediation matter more than attributing the code to a generator.",
          },
        ),
        ({ ...mcq(
          "ai-pd1",
          "Що таке «slopsquatting» в епоху AI-генерації коду?",
          "What is \"slopsquatting\" when blindly installing AI-suggested npm packages?",
          [
            "Зловмисники реєструють реальні пакети з назвами, які часто вигадують (галюцинують) LLM-моделі, щоб підсунути шкідливий код при `pnpm add`",
            "Оптимізація CSS Grid за допомогою AI",
            "Прискорення TypeScript компілятора",
            "Автоматичне видалення невикористаного коду",
          ],
          0,
          why(
            "Перевіряйте кожен новий пакет у реєстрі npm/офіційній документації, його авторів і чи не краще використати наявні пакети монорепо.",
            "Attackers register commonly hallucinated package names; verify every suggested dependency explicitly.",
          ),
        ), optionsEn: ["Attackers register package names frequently hallucinated by models to distribute malicious code", "AI optimization of CSS Grid", "A TypeScript compiler speedup", "Automatic dead-code deletion"] }),
        ({ ...mcq(
          "ai-pd2",
          "Хто несе повну інженерну відповідальність за баг або витік, якщо PR відкрито вами, але значну частину написав AI-інструмент?",
          "Who owns engineering accountability if a merged AI-assisted PR causes a security breach or outage?",
          [
            "Автор і рев'ювери PR у команді — посилання «так згенерував AI» не знімає відповідальності",
            "Провайдер AI автоматично виправляє інциденти на вашому сервері",
            "Браузер користувача",
            "Ніхто, це вважається форс-мажором",
          ],
          0,
        ), optionsEn: ["The author and reviewers share engineering responsibility according to their roles; AI generation does not remove it", "The AI provider automatically fixes incidents on your server", "The user's browser", "Nobody; it is automatically force majeure"] }),
      ], { baseXp: 25 },
    ),
    lesson(
      "ai-forgeboard-review-lab",
      "Лаб: аудит збереженого AI-диффу ForgeBoard + фікс та тести (M10)",
      "Lab: ForgeBoard Saved AI Diff Review, Fix & Verification (M10)",
      4, false, [
        concept(
          "ai-forgeboard-review-concept",
          "Від знайденого дефекту до доказу виправлення",
          "From a finding to evidence of a fix",
          {
            uk: "У локальному пакеті M10 прочитайте вимоги й збережений diff, позначте кожен дефект і його наслідок. Для відтворюваного бага створіть поведінковий тест: він має падати на дефектній реалізації та проходити після виправлення. Потім запустіть решту відповідних перевірок і задокументуйте, що не вдалося перевірити. Вбудована вправа нижче шукає текстові фрагменти, тому її успіх не доводить поведінкову коректність функції.",
            en: "In the local M10 package, read the requirements and saved diff, then identify each defect and its consequence. For a reproducible bug, create a behavioral test that fails on the faulty implementation and passes after the fix. Run the remaining relevant checks and document what could not be verified. The embedded exercise below searches for text fragments, so passing it does not prove the function behaves correctly.",
          },
        ),
        ({ ...mcq(
          "ai-fb1",
          "У локальному лабі Milestone 10 ви отримуєте збережений AI-дифф (офлайн, без API-ключів), у якому містяться типові «переконливі» баги: тихе проковтування помилки, відсутній ліміт сторінки, небезпечний HTML-вивід або фіктивний тест. Що потрібно зробити?",
          "Milestone 10 supplies a realistic offline AI-generated PR diff for ForgeBoard containing subtle plausible bugs. What completes M10?",
          [
            "Проінспектувати diff, задокументувати знайдені дефекти, виправити реалізацію, написати справжні тести, які падають на баговому диффі й проходять після фіксу",
            "Запустити платний GPT-API без збереженого коду",
            "Лише переформатувати відступи",
            "Видалити наявні тести",
          ],
          0,
        ), optionsEn: ["Inspect the diff, document defects, fix the implementation, and write tests that fail before and pass after the fix", "Run a paid AI API without the saved code", "Only reformat indentation", "Delete existing tests"] }),
        codeProject(
          "ai-fb2",
          "Виправте clampLimit: додатні цілі значення обмежте 50, а інші замініть на 20. Вбудована перевірка шукає фрагменти коду; M10 нижче містить повний diff і поведінкові тести.",
          "Repair clampLimit: cap positive integers at 50 and use 20 for other values. The in-app check searches for code fragments; M10 below contains the full diff and behavioral tests.",
          [
            {
              id: "ts",
              name: "review-fix.ts",
              language: "typescript",
              starter: `export function clampLimit(raw: unknown): number {\n  return Number(raw);\n}\n`,
            },
          ],
          [
            { fileId: "ts", contains: ["Number.isInteger", "Math.min", "50"] },
          ],
          {
            hintUk: "У локальному пакеті M10 є PR-diff, чекліст виявлених багів і автоматизовані поведінкові тести.",
            hintEn: "Milestone 10 includes the saved PR diff, broken/candidate files, and automated verification checks cleanly offline.",
          },
        ),
      ], { baseXp: 45 },
    ),
    exam("ai-pd-exam", "Контрольна: відповідальна AI-розробка", "Checkpoint: Privacy & Review Accountability", 4, [
      codeFill(
        "ai-pd-e1",
        "Властивість перевірки, що diff змінює лише релевантні модулі",
        "Keep changes minimal and strictly tied to the task",
        "text",
        "Always keep AI-assisted changes ___ and test-verified.",
        ["small", "focused"],
        false,
      ),
      ({ ...mcq(
        "ai-pd-e2",
        "Яка найкраща перевірка, щоб переконатися, що виправлення після AI-генерації реально працює?",
        "What is the gold-standard check that an AI-assisted fix actually resolves the bug?",
        [
          "Наявність тесту, який спочатку ПАДАЄ на баговому коді й ПРОХОДИТЬ після виправлення + читання кожного зміненого рядка",
          "Слово моделі «я все перевірила, працює ідеально»",
          "Відсутність червоних ліній у редакторі без запуску тестів",
          "Наявність довгих коментарів без логіки",
        ],
        0,
      ), optionsEn: ["A test that fails on the bug and passes after the fix, plus review of the changed lines", "The model's assurance that everything is perfect", "No red editor underlines without running tests", "Long comments without logic"] }),
    ]),
  ],
);

const coderControl = unit(
  "ai_coder_control",
  "Контроль AI-кодера",
  "Controlling the AI coder",
  [
    lesson(
      "ai-cc-packet",
      "Контекстний пакет: мета, файли, інваріанти й перевірка (Cursor, Copilot Workspace, Windsurf)",
      "The Context Packet: Goal, Files, Invariants, and How You Will Check",
      3,
      false,
      [
        concept(
          "ai-cc-packet-concept",
          "Контекстний пакет і межі інструмента",
          "A context packet and tool boundaries",
          {
            uk: "Передайте асистенту мету, критерії приймання, релевантні файли, інваріанти та способи перевірки. Позначте припущення й не додавайте секрети. Наприклад, для пагінації вкажіть формат помилок і правила авторизації, які треба зберегти, а також тести на межі сторінки. Інструменти відрізняються доступом і можливостями, тому перевіряйте їхні фактичні дозволи; список у промпті не є технічною забороною на інші дії.",
            en: "Give the assistant the goal, acceptance criteria, relevant files, invariants, and verification steps. Mark assumptions and omit secrets. For pagination, specify the error format and authorization rules to preserve, plus boundary tests. Tools differ in access and capabilities, so check their actual permissions; a list in a prompt is not a technical restriction on other actions.",
          },
        ),
        ({ ...mcq(
          "ai-cc1",
          "AI-кодери відрізняються інтерфейсом і дозволами. Що допомагає перетворити сесію з «рулетки» на керовану зміну?",
          "AI coding tools differ in interface and permissions. What helps turn guesswork into a controlled change?",
          [
            "Повторний запуск тим самим коротким промптом «зроби красиво», доки не пощастить",
            "Компактний контекстний пакет: точна мета, конкретні файли в області дії, інваріанти (що не ламати) та точна команда перевірки",
            "Відкриття всього монорепо на 500 файлів без переліку обмежень",
            "Вимкнення TypeScript і тестів, щоб агент швидше завершив",
          ],
          1,
          why(
            "Мета, файли, інваріанти й перевірка допомагають керувати роботою незалежно від інтерфейсу; фактичні дозволи інструмента треба перевіряти окремо.",
            "Goals, files, invariants, and checks help guide work across interfaces; actual tool permissions still require separate review.",
          ),
        ), optionsEn: ["Repeat the same vague prompt until lucky","Use a concise context packet: goal, relevant files, invariants, and verification command","Open 500 repository files with no constraints","Disable TypeScript and tests for speed"] }),
        ({ ...codeOrderAuto(
          "ai-cc2",
          "Впорядкуйте 4 частини контекстного пакета перед запуском Cursor, Copilot Workspace або Windsurf",
          "Order the 4 parts of a context packet before launching an AI coding tool",
          "text",
          [
            "Goal: single scoped behavior change and exact acceptance rule",
            "Files: explicit target paths to inspect and modify",
            "Invariants: public API shape, auth rules, and untouched modules",
            "Check: exact typecheck and test commands that prove done",
          ],
        ), linesUk: ["Файли: конкретні шляхи для вивчення та зміни","Інваріанти: публічний API, правила доступу й недоторкані модулі","Перевірка: конкретні команди типів і тестів","Мета: одна зміна поведінки й точний критерій приймання"] }),
        ({ ...matchEx(
          "ai-cc3",
          "Зіставте розділ контекстного пакета з прикладом для AI-кодера",
          "Match each context-packet section to a concrete example",
          [
            { left: "Goal", right: "Додати курсорну пагінацію в GET /api/tasks без зміни формату помилок" },
            { left: "Files", right: "apps/api/src/routes/tasks.ts і tasks.test.ts" },
            { left: "Invariants", right: "Зберегти authMiddleware існуючим і не чіпати схему БД" },
            { left: "How you will check", right: "pnpm --filter @eduforge/api typecheck; pnpm --filter @eduforge/api test" },
          ],
        ), pairsEn: [{"left":"Goal","right":"Add cursor pagination to GET /api/tasks without changing error formats"},{"left":"Files","right":"apps/api/src/routes/tasks.ts and tasks.test.ts"},{"left":"Invariants","right":"Preserve authMiddleware and do not alter the database schema"},{"left":"How you will check","right":"pnpm --filter @eduforge/api typecheck; pnpm --filter @eduforge/api test"}] }),
      ],
      { baseXp: 24 },
    ),
    lesson(
      "ai-cc-diff-test",
      "Читай згенерований диф, відхиляй побічний рефакторинг і фіксуй тестом",
      "Read the Generated Diff, Reject Drive-By Refactors, Fix With a Test",
      3,
      false,
      [
        concept(
          "ai-cc-diff-concept",
          "Перевірка diff і регресії",
          "Reviewing a diff and regression",
          {
            uk: "Порівняйте кожну зміну з метою та існуючим контрактом. Непотрібне перейменування публічного експорту може зламати виклики; приберіть його або окремо узгодьте зміну контракту. Для знайденого бага підготуйте вхід, на якому тест падає до виправлення й проходить після нього. Перевірте також інші важливі випадки та результати команд: один тест не доводить відсутності всіх дефектів.",
            en: "Compare each change with the goal and existing contract. An unnecessary public export rename can break callers; remove it or separately agree on the contract change. For a bug, prepare input for a test that fails before the fix and passes afterwards. Check other important cases and command results too: one test does not prove the absence of all defects.",
          },
        ),
        ({ ...codeRead(
          "ai-cc4",
          "AI-кодер отримав задачу виправити сортування таймстемпів, але додав зміни нижче. Яку частину дифу потрібно негайно відхилити?",
          "An AI coder was asked to fix a timestamp tie-breaker and produced this diff. What must you reject immediately?",
          "typescript",
          "- export function sortItems(items: Item[]) {\n-   return [...items].sort((a, b) => a.ts - b.ts);\n+ // Cleaned up entire module formatting & renamed export\n+ export function orderItemsClean(list: Item[]) {\n+   return [...list].sort((a, b) => a.ts - b.ts || a.id.localeCompare(b.id));\n  }",
          [
            "Побічний рефакторинг і перейменування публічного експорту `sortItems` -> `orderItemsClean`, яке ламає виклики по всьому проєкту та засмічує diff",
            "Тільки перевірку `a.id.localeCompare(b.id)`",
            "Тільки використання квадратних дужок `[...list]`",
            "Нічого, перейменування чужих експортів без запиту завжди корисне",
          ],
          0,
          why(
            "Читайте весь диф до запуску чи мерджу: відхиляйте побічні перейменування, переформатування сусідніх блоків і «чистки», яких не просили в пакеті.",
            "Read the full diff line by line: revert drive-by renames and unrequested cleanups so the patch stays minimal and safe.",
          ),
        ), optionsEn: ["Reject the unrelated refactor and public export rename, which can break callers and add review noise","Only reject the a.id.localeCompare(b.id) check","Only reject the array spread","Accept all unsolicited export renames"] }),
        ({ ...mcq(
          "ai-cc5",
          "Ви знайшли граничний баг у згенерованому патчі AI-кодера. Яка правильна реакція замість просити «перегенеруй ще раз наосліп»?",
          "You spot a boundary bug in an AI coder's patch. What is the right move instead of blindly regenerating?",
          [
            "Видалити зайві побічні правки, зафіксувати точний вхід тестом, який спершу падає, і точково виправити логіку під цей тест",
            "Замінити весь файл пустим шаблоном і запустити автоформатер",
            "Залишити баг, але додати коментар `// AI generated`",
            "Перемкнутися з Cursor на Windsurf і повторити той самий розмитий запит",
          ],
          0,
        ), optionsEn: ["Remove unrelated edits, capture the exact input in a test that fails first, and fix the logic","Replace the file with an empty template and format it","Keep the bug and add an AI generated comment","Switch editors and repeat the vague request"] }),
        codeFill(
          "ai-cc6",
          "Зафіксуйте виправлення tie-breaker у регресійному тесті Vitest, порівнюючи порядок масиву об'єктів",
          "Lock the tie-breaker fix with a Vitest deep-equality assertion",
          "typescript",
          "const a = { id: 'a', ts: 1 };\nconst b = { id: 'b', ts: 1 };\nexpect(sortItems([b, a])).___([a, b]);",
          ["toEqual"],
          true,
        ),
      ],
      { baseXp: 25 },
    ),
    exam(
      "ai-cc-exam",
      "Контрольна: контроль AI-кодера",
      "Checkpoint: Controlling the AI coder",
      3,
      [
        ({ ...mcq(
          "ai-cc-e1",
          "Що є спільним робочим циклом для Cursor, GitHub Copilot Workspace і Windsurf?",
          "What is the shared operational loop across Cursor, GitHub Copilot Workspace, and Windsurf?",
          [
            "Видати сфокусований контекстний пакет -> перевірити кожен рядок дифу -> відкинути побічні зміни -> підтвердити перевіркою/тестом",
            "Завантажити `.env` із ключами в чат і натиснути Accept All без запуску тестів",
            "Дозволити агенту перейменовувати будь-які модулі за власним смаком",
            "Писати промпти без вказання цільових файлів чи критерію перевірки",
          ],
          0,
        ), optionsEn: ["Provide scoped context, review the diff, reject unrelated edits, and verify with tests","Paste .env secrets into chat and accept all without tests","Allow arbitrary module renames","Omit target files and verification criteria"] }),
        ({ ...codeRead(
          "ai-cc-e2",
          "Яке порушення інваріантів ви бачите у цьому згенерованому дифі?",
          "Which invariant violation appears in this AI-generated diff?",
          "typescript",
          "  app.get(\"/api/notes\", authMiddleware, async (req, res) => {\n-   const rows = await listNotesForUser(req.user.id);\n+   // Refactor: also allow public read when ?all=1\n+   const rows = req.query.all ? await listAllNotes() : await listNotesForUser(req.user.id);\n    return res.json({ items: rows });\n  });",
          [
            "Вставлено несанкціоноване розширення прав (`?all=1`), що ламає інваріант ізоляції користувача, замасковане під «рефакторинг»",
            "Назву `rows` треба замінити на `data`",
            "Маршрут повинен повертати XML",
            "`req.user.id` не працює в Express",
          ],
          0,
        ), optionsEn: ["An unauthorized all=1 expansion breaks user isolation under the guise of refactoring","Rename rows to data","The route must return XML","req.user.id cannot work in Express"] }),
        ({ ...mcq(
          "ai-cc-e3",
          "AI-кодер вирішив 8-рядкову задачу, але попутно переформатував 90 рядків і змінив назви двох допоміжних функцій у сусідньому файлі. Що зробити?",
          "An AI coder solved an 8-line task while also reformatting 90 unrelated lines and renaming two helpers in a neighbor file. What should you do?",
          [
            "Відкотити побічний рефакторинг (залишити лише сфокусовані 8 рядків + тест на фікс), щоб рев'ю і `git bisect` лишалися чистими",
            "Закомітити все разом під назвою `wip`",
            "Видалити старий тест, який скаржився на перейменування",
            "Вимкнути перевірку типів",
          ],
          0,
        ), optionsEn: ["Remove unrelated refactoring and keep the focused fix and regression test","Commit everything as wip","Delete the test that caught the rename","Disable typechecking"] }),
      ],
    ),
  ],
);

export const aiDevelopmentContent: CourseContent = {
  slug: "ai_development",
  titleUk: "AI-асистована розробка",
  titleEn: "AI-Assisted Development",
  descriptionUk:
    "Постановка чітких специфікацій, безпечний відбір контексту, рев'ю збережених AI-диффів, виявлення галюцинацій, тестування, аудит ForgeBoard і контроль AI-кодера.",
  descriptionEn:
    "Clear specifications, safe context curation, reviewing saved AI diffs, catching hallucinated APIs, test-backed verification, ForgeBoard review lab, and controlling AI coders.",
  icon: "🤖",
  color: "#7C3AED",
  units: [
    taskSpecs,
    contextSelection,
    smallDiffsReview,
    verificationDebugging,
    privacyDepsCapstone,
    coderControl,
  ],
};
