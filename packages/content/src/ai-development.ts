import type { CourseContent } from "./types.js";
import {
  codeFill,
  codeOrderAuto,
  codeProject,
  codeRead,
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
        mcq(
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
            "Усі вправи цього курсу містять збережені diff-приклади: принцип працює незалежно від того, чи маєте ви платну підписку AI, чи пишете рев'ю вручну.",
            "Saved diff exercises work 100% offline without paid subscriptions: clear constraints prevent silent requirement drift.",
          ),
        ),
        codeOrderAuto(
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
        ),
      ], { baseXp: 22 },
    ),
    lesson(
      "ai-ts-non-goals",
      "Фіксація того, що НЕ можна чіпати (Invariants & Non-Goals)",
      "Stating Non-Goals & Preserving Contracts",
      2, true, [
        mcq(
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
        ),
      ], { baseXp: 22 },
    ),
    exam("ai-ts-exam", "Контрольна: специфікація задач", "Checkpoint: Task Specifications", 2, [
      mcq(
        "ai-ts-e1",
        "Яка головна причина, чому в цьому курсі всі обов'язкові завдання працюють на збережених прикладах і локальних диффах?",
        "Why do all mandatory labs provide saved examples without requiring paid AI API keys?",
        [
          "Навичка критичної перевірки вимог, контексту й готового diff однакова для будь-якого інструменту й не залежить від платної підписки",
          "Платні моделі не підтримують JavaScript",
          "Код не потребує тестів",
          "Текстові файли не відкриваються локально",
        ],
        0,
      ),
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
        matchEx(
          "ai-cs1",
          "Оберіть корисний контекст проти небезпечного або зайвого сміття",
          "Classify context items by value and risk",
          [
            { left: "Zod-схема тіла запиту, Drizzle-таблиця, наявний схожий маршрут", right: "Високосигнальний контекст" },
            { left: "Повний `.env` із паролями БД та реальними API-ключами", right: "Заборонено: витік секретів" },
            { left: "Багатотисячний lockfile або `dist/` бандли", right: "Шум, що погіршує фокус і точність" },
          ],
        ),
        mcq(
          "ai-cs2",
          "Ви надаєте збережений приклад помилки тесту. Що критично важливо показати, щоб діагноз не був «гаданим»?",
          "When diagnosing a bug using a saved error snippet, what context eliminates guesswork?",
          [
            "Точний stack trace / повідомлення падіння, конкретний вхід тесту і 20–40 рядків навколо функції",
            "Лише фразу «тести не працюють, виправ»",
            "Тільки package.json без файлів коду",
            "Скриншот робочого столу без тексту",
          ],
          0,
        ),
      ], { baseXp: 24 },
    ),
    exam("ai-cs-exam", "Контрольна: вибір контексту", "Checkpoint: Context Selection", 3, [
      mcq(
        "ai-cs-e1",
        "Що потрібно зробити ПЕРЕД вставкою конфігу або логів у будь-який зовнішній AI-чат?",
        "What must happen before sharing logs or configs with any external AI service?",
        [
          "Видалити або замінити плейсхолдерами всі токени, паролі, session cookies, ключі API та приватні дані користувачів",
          "Скопіювати сирий `.env` для максимальної точності",
          "Додати приватні ключі SSH",
          "Перетворити секрети в Base64 (Base64 легко декодується і не є шифруванням!)",
        ],
        0,
      ),
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
        codeRead(
          "ai-sd1",
          "Огляньте збережений AI-дифф для маршруту оновлення задачі ForgeBoard — знайдіть 2 тонких дефекти: Які критичні прогалини замасковані під «охайний код»?",
          "Review this saved AI diff for subtle security and logic bugs: Which critical bugs hide inside this clean-looking diff?",
          "ts",
          "+ app.patch(\"/api/tasks/:id\", authMiddleware, async (req, res) => {\n+   const body = req.body;\n+   const [updated] = await db.update(tasks).set(body).where(eq(tasks.id, req.params.id)).returning();\n+   return res.json(updated);\n+ });",
          [
            "1) Mass assignment (прямий `req.body` без Zod); 2) IDOR (немає перевірки `ownerId === req.user.id`); 3) відсутній `404`, якщо `updated` undefined",
            "Код ідеальний, не вистачає лише крапки з комою",
            "Помилка лише в назві змінної `updated`",
            "`async` не підтримується в Express",
          ],
          0,
          why(
            "Як підкреслює настанова GitHub із рев'ю AI-коду: AI часто генерує синтаксично красивий happy-path без перевірок безпеки, граничних станів та власників.",
            "Following GitHub's AI code review guidance: fluent happy-path code often omits authz, schema bounds, and 404 guards.",
          ),
        ),
        codeRead(
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
        ),
      ], { baseXp: 25 },
    ),
    lesson(
      "ai-sd-chunking",
      "Дроблення змін на малі інкременти, які реально перевірити",
      "Small Reviewable Increments",
      3, false, [
        mcq(
          "ai-sd3",
          "Чому генерувати 18 файлів одним махом без проміжних тестів — гарантований шлях до технічного боргу?",
          "Why does asking for 18 files at once fail verification compared to small incremental diffs?",
          [
            "Рецензент не здатен утримати всі приховані побічні ефекти, а баги в одному шарі маскуються помилками в трьох інших",
            "Git не дозволяє комітити більше 10 файлів",
            "Node запускає лише один файл на проєкт",
            "Браузер кешує старий код на рік",
          ],
          0,
        ),
      ], { baseXp: 24 },
    ),
    exam("ai-sd-exam", "Контрольна: рев'ю збережених diff", "Checkpoint: Reviewing AI Diffs", 3, [
      mcq(
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
      ),
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
        codeRead(
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
        ),
        codeOrderAuto(
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
        ),
      ], { baseXp: 25 },
    ),
    exam("ai-vd-exam", "Контрольна: верифікація AI-змін", "Checkpoint: Evidence & Debugging", 4, [
      mcq(
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
      ),
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
        mcq(
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
        ),
        mcq(
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
        ),
      ], { baseXp: 25 },
    ),
    lesson(
      "ai-forgeboard-review-lab",
      "Лаб: аудит збереженого AI-диффу ForgeBoard + фікс та тести (M10)",
      "Lab: ForgeBoard Saved AI Diff Review, Fix & Verification (M10)",
      4, false, [
        mcq(
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
        ),
        codeProject(
          "ai-fb2",
          "Замініть фіктивну перевірку на справжню функцію перевірки пагінації та санітизації для ForgeBoard; завантажте M10 нижче для повного збереженого diff і тест-набору.",
          "Repair the subtle AI-generated bug in limit clamping and record review findings; download Milestone 10 below for the full offline PR diff and test harness.",
          [
            {
              id: "ts",
              name: "review-fix.ts",
              language: "typescript",
              starter: `export function clampLimit(raw: unknown): number {\n  const n = Number(raw);\n  if (!Number.isInteger(n) || n < 1) return 20;\n  return Math.min(n, 50);\n}\n`,
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
      mcq(
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
      ),
    ]),
  ],
);

export const aiDevelopmentContent: CourseContent = {
  slug: "ai_development",
  titleUk: "AI-асистована розробка",
  titleEn: "AI-Assisted Development",
  descriptionUk:
    "Постановка чітких специфікацій, безпечний відбір контексту, рев'ю збережених AI-диффів, виявлення галюцинацій, тестування й аудит ForgeBoard без платних ключів.",
  descriptionEn:
    "Clear specifications, safe context curation, reviewing saved AI diffs, catching hallucinated APIs, test-backed verification, and ForgeBoard review lab.",
  icon: "🤖",
  color: "#7C3AED",
  units: [
    taskSpecs,
    contextSelection,
    smallDiffsReview,
    verificationDebugging,
    privacyDepsCapstone,
  ],
};
