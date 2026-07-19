import type { CourseContent } from "./types.js";
import { exam, lesson, matchEx, mcq, unit } from "./builders.js";

const foundations = unit("foundations", "Основи якості", "Quality foundations", [
  lesson(
    "qt-what-quality",
    "Що таке якість ПЗ",
    "What is software quality",
    1,
    true,
    [
      mcq(
        "qt-f1",
        "Якість ПЗ — це насамперед:",
        "Software quality is primarily:",
        [
          "ступінь відповідності потребам/очікуванням і стандартам",
          "лише кількість рядків коду",
          "лише швидкість компіляції",
          "колір логотипу",
        ],
        0,
      ),
      mcq(
        "qt-f2",
        "Дефект (bug) — це:",
        "A defect (bug) is:",
        [
          "відхилення від очікуваної поведінки/вимог",
          "завжди падіння сервера",
          "лише UI typo never logic",
          "успішний деплой",
        ],
        0,
      ),
      mcq(
        "qt-f3",
        "Failure vs fault:",
        "Failure vs fault:",
        [
          "failure — видимий збій; fault — причина в артефакті",
          "одне й те саме always",
          "failure лише в CSS",
          "fault лише в маркетингу",
        ],
        0,
      ),
    ],
  ),
  lesson(
    "qt-vv",
    "Verification vs Validation",
    "Verification vs Validation",
    2,
    true,
    [
      mcq(
        "qt-f4",
        "Verification roughly asks:",
        "Verification roughly asks:",
        [
          "Are we building the product right?",
          "Are we building the right product?",
          "How many stars on GitHub?",
          "What is our Elo?",
        ],
        0,
      ),
      mcq(
        "qt-f5",
        "Validation roughly asks:",
        "Validation roughly asks:",
        [
          "Are we building the right product?",
          "Is the compiler version exact?",
          "Only unit test count?",
          "Is Redis up?",
        ],
        0,
      ),
      matchEx(
        "qt-f6",
        "V&V",
        "V&V",
        [
          { left: "Verification", right: "conformance to specs/process" },
          { left: "Validation", right: "fitness for user need" },
        ],
      ),
    ],
  ),
  lesson(
    "qt-cost-bug",
    "Вартість бага в часі",
    "Cost of a bug over time",
    2,
    false,
    [
      mcq(
        "qt-f7",
        "Зазвичай вартість виправлення росте:",
        "Fix cost usually grows:",
        [
          "чим пізніше знайдено (prod > design)",
          "чим раніше — завжди дорожче",
          "не залежить від фази",
          "лише від кольору UI",
        ],
        0,
      ),
      mcq(
        "qt-f8",
        "Shift-left testing означає:",
        "Shift-left testing means:",
        [
          "раніше залучати якість/тести в lifecycle",
          "перенести все тестування лише в prod",
          "виключити unit tests",
          "тестувати тільки дизайн логотипу",
        ],
        0,
      ),
    ],
  ),
  exam("qt-f-exam", "Контрольна: foundations", "Exam: foundations", 2, [
    mcq("qt-fe1", "Quality relates to:", "Quality relates to:", ["needs & requirements", "only LOC", "only FPS", "only SEO"], 0),
    mcq("qt-fe2", "Defect is:", "Defect is:", ["deviation from expected", "successful deploy", "green build only", "a feature flag name"], 0),
    mcq("qt-fe3", "Verification:", "Verification:", ["built right?", "only marketing", "only UX colors", "DNS only"], 0),
    mcq("qt-fe4", "Validation:", "Validation:", ["right product?", "compiler flags only", "disk format", "RAID"], 0),
    mcq("qt-fe5", "Late bugs cost:", "Late bugs cost:", ["usually more", "always zero", "only CSS", "never matter"], 0),
  ]),
]);

const principles = unit("principles", "Принципи тестування", "Testing principles", [
  lesson(
    "qt-p-exhaustive",
    "Вичерпне тестування неможливе",
    "Exhaustive testing is impossible",
    2,
    false,
    [
      mcq(
        "qt-p1",
        "Чому не тестують «усі» комбінації?",
        "Why not test all combinations?",
        [
          "простір станів/входів зазвичай астрономічний",
          "комп'ютери не вміють assert",
          "DOM забороняє тести",
          "npm block tests",
        ],
        0,
      ),
      mcq(
        "qt-p2",
        "Тому обирають:",
        "So we choose:",
        ["пріоритезацію і техніки дизайну тестів", "випадковий відмову від тестів", "лише prod traffic", "no docs"],
        0,
      ),
    ],
  ),
  lesson(
    "qt-p-early-cluster",
    "Early & pesticide & clusters",
    "Early & pesticide & clusters",
    2,
    false,
    [
      mcq(
        "qt-p3",
        "Early testing:",
        "Early testing:",
        ["раніше = дешевше/ефективніше", "тільки в кінці релізу", "заборонено в agile", "лише manual forever"],
        0,
      ),
      mcq(
        "qt-p4",
        "Defect clustering:",
        "Defect clustering:",
        ["баги часто скупчуються в «гарячих» модулях", "баги equidistributed always", "баги лише в README", "немає модулів"],
        0,
      ),
      mcq(
        "qt-p5",
        "Pesticide paradox:",
        "Pesticide paradox:",
        [
          "ті самі тести перестають знаходити нові баги — потрібен refresh",
          "тести вбивають CI",
          "антивірус блокує jest",
          "лише UI тести immortal",
        ],
        0,
      ),
    ],
  ),
  lesson(
    "qt-p-context",
    "Context & absence of errors",
    "Context & absence of errors",
    2,
    false,
    [
      mcq(
        "qt-p6",
        "Testing is context dependent:",
        "Testing is context dependent:",
        [
          "підхід залежить від ризику/домену/критичності",
          "один чекліст на всі продукти forever",
          "тільки e2e для calculator apps",
          "не потрібен аналіз ризиків",
        ],
        0,
      ),
      mcq(
        "qt-p7",
        "Absence-of-errors fallacy:",
        "Absence-of-errors fallacy:",
        [
          "0 знайдених багів ≠ продукт корисний/потрібний",
          "0 багів = perfect product always",
          "тести гарантують profit",
          "coverage 100% = no risk",
        ],
        0,
      ),
    ],
  ),
  exam("qt-p-exam", "Контрольна: principles", "Exam: principles", 2, [
    mcq("qt-pe1", "Exhaustive testing:", "Exhaustive testing:", ["generally impossible", "always required", "free always", "done by CSS"], 0),
    mcq("qt-pe2", "Early testing:", "Early testing:", ["reduces cost impact", "wastes time always", "bans unit tests", "only prod"], 0),
    mcq("qt-pe3", "Clustering:", "Clustering:", ["bugs concentrate", "bugs never cluster", "only in fonts", "only DNS"], 0),
    mcq("qt-pe4", "Pesticide paradox:", "Pesticide paradox:", ["refresh tests needed", "delete all tests", "one test forever enough", "no automation"], 0),
    mcq("qt-pe5", "Absence of errors:", "Absence of errors:", ["≠ product success", "= market fit", "= no need for UAT", "= zero risk"], 0),
  ]),
]);

const levels = unit("levels", "Рівні тестування", "Test levels", [
  lesson(
    "qt-l-unit",
    "Unit testing",
    "Unit testing",
    2,
    false,
    [
      mcq(
        "qt-l1",
        "Unit test перевіряє:",
        "A unit test checks:",
        ["ізольований модуль/функцію", "увесь prod cluster always", "лише UX copy", "DNS TTL"],
        0,
      ),
      mcq(
        "qt-l2",
        "Характеристика добрих unit:",
        "Good unit tests are:",
        ["швидкі, ізольовані, детерміновані", "завжди flaky e2e", "потребують full staging", "тільки manual"],
        0,
      ),
    ],
  ),
  lesson(
    "qt-l-integration",
    "Integration",
    "Integration",
    2,
    false,
    [
      mcq(
        "qt-l3",
        "Integration testing:",
        "Integration testing:",
        ["взаємодія модулів/сервісів/API", "лише snapshot CSS", "лише spellcheck", "chess puzzles"],
        0,
      ),
      mcq(
        "qt-l4",
        "Контрактні тести близькі до:",
        "Contract tests relate to:",
        ["інтеграційних меж між сервісами", "unit pure math only", "load only", "a11y only"],
        0,
      ),
    ],
  ),
  lesson(
    "qt-l-system-acc",
    "System & acceptance",
    "System & acceptance",
    2,
    false,
    [
      mcq(
        "qt-l5",
        "System testing:",
        "System testing:",
        ["система як ціле проти вимог", "одна функція without deps", "лише linter", "only commit hooks"],
        0,
      ),
      mcq(
        "qt-l6",
        "Acceptance (UAT):",
        "Acceptance (UAT):",
        ["прийняття замовником/користувачем", "тільки coverage %", "тільки unit green", "DNS check"],
        0,
      ),
    ],
  ),
  lesson(
    "qt-l-pyramid",
    "Test pyramid",
    "Test pyramid",
    2,
    false,
    [
      mcq(
        "qt-l7",
        "Піраміда знизу:",
        "Pyramid base:",
        ["багато швидких unit", "лише e2e", "zero tests", "only manual forever"],
        0,
      ),
      mcq(
        "qt-l8",
        "Ice-cream anti-pattern:",
        "Ice-cream anti-pattern:",
        ["багато повільних UI/e2e, мало unit", "ідеальна піраміда", "тільки static analysis", "no CI"],
        0,
      ),
    ],
  ),
  exam("qt-l-exam", "Контрольна: levels", "Exam: levels", 2, [
    mcq("qt-le1", "Unit:", "Unit:", ["small isolated", "full prod only", "only UX writing", "CDN only"], 0),
    mcq("qt-le2", "Integration:", "Integration:", ["module interactions", "font kerning only", "favicon only", "legal copy"], 0),
    mcq("qt-le3", "System:", "System:", ["whole system vs reqs", "one pure function only", "tsconfig only", "eslint only"], 0),
    mcq("qt-le4", "UAT:", "UAT:", ["user/customer accept", "only coverage gate", "only build", "only docker pull"], 0),
    mcq("qt-le5", "Pyramid base:", "Pyramid base:", ["many unit tests", "only e2e", "no automated", "only load"], 0),
  ]),
]);

const typesFunc = unit("types-func", "Функціональні види", "Functional types", [
  lesson(
    "qt-tf-smoke-sanity",
    "Smoke & sanity",
    "Smoke & sanity",
    2,
    false,
    [
      mcq(
        "qt-tf1",
        "Smoke test:",
        "Smoke test:",
        ["швидка перевірка «чи збірка жива»", "повний regression always", "only security pen", "only a11y"],
        0,
      ),
      mcq(
        "qt-tf2",
        "Sanity test:",
        "Sanity test:",
        ["вузька перевірка після fix/зміни", "повний performance suite", "chaos only", "DNS only"],
        0,
      ),
    ],
  ),
  lesson(
    "qt-tf-regression",
    "Regression & retest",
    "Regression & retest",
    2,
    false,
    [
      mcq(
        "qt-tf3",
        "Regression:",
        "Regression:",
        ["старі фічі не зламались після змін", "перший тест нового модуля only", "only install", "only lint"],
        0,
      ),
      mcq(
        "qt-tf4",
        "Retest:",
        "Retest:",
        ["перевірка що конкретний баг виправлено", "випадковий explor always", "only load", "only UI color"],
        0,
      ),
    ],
  ),
  lesson(
    "qt-tf-exploratory",
    "Exploratory & UAT",
    "Exploratory & UAT",
    2,
    false,
    [
      mcq(
        "qt-tf5",
        "Exploratory testing:",
        "Exploratory testing:",
        ["одночасне навчання, дизайн тестів і виконання", "лише записані скрипти без думки", "only unit", "only SQL"],
        0,
      ),
      mcq(
        "qt-tf6",
        "UAT focus:",
        "UAT focus:",
        ["бізнес-прийнятність для користувача", "microservice coverage only", "bundle size only", "ts strict only"],
        0,
      ),
    ],
  ),
  exam("qt-tf-exam", "Контрольна: functional types", "Exam: functional types", 2, [
    mcq("qt-tfe1", "Smoke:", "Smoke:", ["build is alive", "full pen test", "only a11y tree", "only i18n"], 0),
    mcq("qt-tfe2", "Regression:", "Regression:", ["old features still work", "first feature only", "docs only", "icons only"], 0),
    mcq("qt-tfe3", "Retest:", "Retest:", ["verify bug fix", "ignore the bug", "delete tests", "skip staging"], 0),
    mcq("qt-tfe4", "Exploratory:", "Exploratory:", ["learn+design+execute", "only record-playback forever", "no thinking", "CI forbidden"], 0),
    mcq("qt-tfe5", "Sanity:", "Sanity:", ["focused after change", "all non-func types", "only chaos", "only soak"], 0),
  ]),
]);

const typesNonfunc = unit("types-nonfunc", "Нефункціональні", "Non-functional", [
  lesson(
    "qt-tn-perf",
    "Performance",
    "Performance",
    2,
    false,
    [
      mcq(
        "qt-tn1",
        "Performance testing включає:",
        "Performance testing includes:",
        ["load, stress, soak/endurance (залежно від цілей)", "лише unit assert", "лише spellcheck", "лише color contrast"],
        0,
      ),
      mcq(
        "qt-tn2",
        "Load vs stress:",
        "Load vs stress:",
        [
          "load — очікуване навантаження; stress — понад межі",
          "одне й те саме always",
          "stress = unit test",
          "load = only UI click",
        ],
        0,
      ),
    ],
  ),
  lesson(
    "qt-tn-security",
    "Security & usability",
    "Security & usability",
    2,
    false,
    [
      mcq(
        "qt-tn3",
        "Security testing шукає:",
        "Security testing looks for:",
        ["вразливості, authz/authn gaps, data exposure", "лише WPM typing", "лише flex gaps", "git emoji"],
        0,
      ),
      mcq(
        "qt-tn4",
        "Usability testing:",
        "Usability testing:",
        ["наскільки зручно реальним людям користуватись", "лише HTTP codes", "лише CPU temp", "only DB vacuum"],
        0,
      ),
    ],
  ),
  lesson(
    "qt-tn-compat-rel",
    "Compatibility & reliability",
    "Compatibility & reliability",
    2,
    false,
    [
      mcq(
        "qt-tn5",
        "Compatibility:",
        "Compatibility:",
        ["браузери/ОС/пристрої/версії", "only one browser forever", "only server CPU model", "only IDE theme"],
        0,
      ),
      mcq(
        "qt-tn6",
        "Reliability:",
        "Reliability:",
        ["стабільність роботи в часі/при збоях", "only first paint", "only bundle gzip", "only favicon"],
        0,
      ),
    ],
  ),
  exam("qt-tn-exam", "Контрольна: non-functional", "Exam: non-functional", 2, [
    mcq("qt-tne1", "Load testing:", "Load testing:", ["expected load", "only unit", "only CSS", "only copy"], 0),
    mcq("qt-tne2", "Stress:", "Stress:", ["beyond limits", "below idle only", "docs only", "fonts only"], 0),
    mcq("qt-tne3", "Security:", "Security:", ["vulns & access control", "kerning", "line-height", "margin collapse"], 0),
    mcq("qt-tne4", "Usability:", "Usability:", ["real-user ease", "only TPS", "only GC pauses", "only RAID"], 0),
    mcq("qt-tne5", "Compatibility:", "Compatibility:", ["platforms/browsers", "only one node version forever never check", "only monorepo name", "only brand color"], 0),
  ]),
]);

const blackBox = unit("black-box", "Black-box техніки", "Black-box techniques", [
  lesson(
    "qt-bb-ep",
    "Equivalence partitioning",
    "Equivalence partitioning",
    3,
    false,
    [
      mcq(
        "qt-bb1",
        "EP (equivalence partitioning):",
        "EP (equivalence partitioning):",
        [
          "групує входи на класи з подібною поведінкою",
          "тестує кожен піксель UI",
          "лише mutation testing",
          "лише chaos",
        ],
        0,
      ),
      mcq(
        "qt-bb2",
        "Мета EP:",
        "EP goal:",
        ["менше тестів при хорошому покритті класів", "максимум дубльованих кейсів", "0 тестів", "only e2e film"],
        0,
      ),
    ],
  ),
  lesson(
    "qt-bb-bva",
    "Boundary value analysis",
    "Boundary value analysis",
    3,
    false,
    [
      mcq(
        "qt-bb3",
        "BVA фокус:",
        "BVA focuses on:",
        ["межі діапазонів (min/max off-by-one)", "тільки mid values", "тільки random strings never edges", "only colors"],
        0,
      ),
      mcq(
        "qt-bb4",
        "Для віку 18–65 типові BVA:",
        "For age 18–65 typical BVA:",
        ["17,18,19,64,65,66 (залежно від правил)", "only 40", "only 0 and 1000000 always", "no numbers"],
        0,
      ),
    ],
  ),
  lesson(
    "qt-bb-decision-state",
    "Decision tables & states",
    "Decision tables & states",
    3,
    false,
    [
      mcq(
        "qt-bb5",
        "Decision table корисна коли:",
        "Decision tables help when:",
        ["багато комбінацій бізнес-правил", "є лише один if", "немає логіки", "only static pages"],
        0,
      ),
      mcq(
        "qt-bb6",
        "State transition testing:",
        "State transition testing:",
        ["валідує переходи між станами системи", "ігнорує статуси замовлення", "only CSS :hover", "only DNS TTL"],
        0,
      ),
    ],
  ),
  lesson(
    "qt-bb-usecase",
    "Use case testing",
    "Use case testing",
    2,
    false,
    [
      mcq(
        "qt-bb7",
        "Use-case based tests:",
        "Use-case based tests:",
        ["сценарії актора + main/alt flows", "тільки raw SQL dumps", "тільки hex dumps", "only lorem"],
        0,
      ),
      matchEx(
        "qt-bb8",
        "Техніки",
        "Techniques",
        [
          { left: "EP", right: "classes of inputs" },
          { left: "BVA", right: "edges of ranges" },
          { left: "State", right: "transitions" },
        ],
      ),
    ],
  ),
  exam("qt-bb-exam", "Контрольна: black-box", "Exam: black-box", 3, [
    mcq("qt-bbe1", "EP:", "EP:", ["partition inputs", "test all pixels", "ban automation", "only soak"], 0),
    mcq("qt-bbe2", "BVA:", "BVA:", ["boundaries", "only averages", "only null forever", "only emoji"], 0),
    mcq("qt-bbe3", "Decision table:", "Decision table:", ["rule combinations", "only one path", "fonts", "CDN"], 0),
    mcq("qt-bbe4", "State testing:", "State testing:", ["valid/invalid transitions", "ignore states", "only unit pure", "only i18n keys"], 0),
    mcq("qt-bbe5", "Use cases:", "Use cases:", ["actor flows", "only hex", "only pcap", "only core dumps"], 0),
  ]),
]);

const whiteBox = unit("white-box", "White-box", "White-box", [
  lesson(
    "qt-wb-coverage",
    "Coverage basics",
    "Coverage basics",
    3,
    false,
    [
      mcq(
        "qt-wb1",
        "Statement coverage:",
        "Statement coverage:",
        ["% виконаних statements", "% щасливих користувачів", "% зелених кнопок", "% uptime marketing"],
        0,
      ),
      mcq(
        "qt-wb2",
        "Branch coverage:",
        "Branch coverage:",
        ["гілки рішень (true/false) ", "лише comments", "лише imports", "лише README"],
        0,
      ),
    ],
  ),
  lesson(
    "qt-wb-limits",
    "Межі coverage",
    "Coverage limits",
    3,
    false,
    [
      mcq(
        "qt-wb3",
        "100% coverage означає:",
        "100% coverage means:",
        [
          "рядки/гілки виконувались — НЕ гарантія відсутності багів",
          "продукт perfect",
          "можна не тестувати вимоги",
          "security done",
        ],
        0,
      ),
      mcq(
        "qt-wb4",
        "White-box потребує:",
        "White-box needs:",
        ["доступ/розуміння коду/структури", "лише UI screenshot", "лише брендбук", "лише legal"],
        0,
      ),
    ],
  ),
  exam("qt-wb-exam", "Контрольна: white-box", "Exam: white-box", 3, [
    mcq("qt-wbe1", "Statement coverage:", "Statement coverage:", ["executed statements %", "NPS", "CPU temp", "disk color"], 0),
    mcq("qt-wbe2", "Branch coverage:", "Branch coverage:", ["decision branches", "only CSS", "only SVG", "only MP4"], 0),
    mcq("qt-wbe3", "100% coverage:", "100% coverage:", ["≠ bug-free", "= ship without QA", "= no UAT", "= no risk"], 0),
    mcq("qt-wbe4", "White-box uses:", "White-box uses:", ["code structure", "only black screens", "only ads", "only SEO"], 0),
  ]),
]);

const stlc = unit("stlc-process", "STLC / процес", "STLC / process", [
  lesson(
    "qt-st-phases",
    "Фази STLC",
    "STLC phases",
    2,
    false,
    [
      mcq(
        "qt-st1",
        "Типові фази STLC включають:",
        "Typical STLC phases include:",
        [
          "аналіз вимог → план → дизайн кейсів → setup → execution → close",
          "тільки deploy",
          "тільки design logo",
          "тільки buy servers",
        ],
        0,
      ),
      matchEx(
        "qt-st2",
        "Фази",
        "Phases",
        [
          { left: "Test planning", right: "scope, risk, resources" },
          { left: "Test design", right: "cases & data" },
          { left: "Execution", right: "run & log results" },
        ],
      ),
    ],
  ),
  lesson(
    "qt-st-entry-exit",
    "Entry / exit criteria",
    "Entry / exit criteria",
    2,
    false,
    [
      mcq(
        "qt-st3",
        "Entry criteria example:",
        "Entry criteria example:",
        ["build testable + env ready", "prod already broken only", "no requirements", "no builds"],
        0,
      ),
      mcq(
        "qt-st4",
        "Exit criteria example:",
        "Exit criteria example:",
        ["planned cases run + critical bugs policy met", "any red tests ignored", "zero docs", "random ship"],
        0,
      ),
    ],
  ),
  lesson(
    "qt-st-shiftleft",
    "Shift-left in process",
    "Shift-left in process",
    2,
    false,
    [
      mcq(
        "qt-st5",
        "Shift-left у процесі:",
        "Shift-left in process:",
        ["рев'ю вимог, unit, ранні тести API", "все в останній тиждень", "скасувати CI", "тільки manual after release"],
        0,
      ),
    ],
  ),
  exam("qt-st-exam", "Контрольна: STLC", "Exam: STLC", 2, [
    mcq("qt-ste1", "STLC is:", "STLC is:", ["testing lifecycle", "only coding", "only sales", "only hiring"], 0),
    mcq("qt-ste2", "Planning covers:", "Planning covers:", ["scope & risk", "only fonts", "only memes", "only desk plants"], 0),
    mcq("qt-ste3", "Entry criteria:", "Entry criteria:", ["ready to start testing", "ship without build", "delete env", "ban QA"], 0),
    mcq("qt-ste4", "Exit criteria:", "Exit criteria:", ["done rules met", "infinite testing always", "ignore severity", "no report"], 0),
    mcq("qt-ste5", "Shift-left:", "Shift-left:", ["earlier quality activities", "later only", "prod-only testing", "no unit"], 0),
  ]),
]);

const artifacts = unit("artifacts", "Артефакти", "Artifacts", [
  lesson(
    "qt-ar-plan",
    "Test plan & strategy",
    "Test plan & strategy",
    2,
    false,
    [
      mcq(
        "qt-ar1",
        "Test plan описує:",
        "A test plan describes:",
        ["що/як/коли тестуємо, ресурси, ризики", "лише CSS variables", "лише commit hash", "лише office map"],
        0,
      ),
      mcq(
        "qt-ar2",
        "Strategy часто відповідає на:",
        "Strategy often answers:",
        ["levels/types/tools/approach", "lunch menu", "desk assignment", "only brand"],
        0,
      ),
    ],
  ),
  lesson(
    "qt-ar-cases",
    "Test cases & RTM",
    "Test cases & RTM",
    2,
    false,
    [
      mcq(
        "qt-ar3",
        "Добрий test case має:",
        "A good test case has:",
        ["preconditions, steps, expected result", "only actual result empty forever", "only screenshots of cats", "no id"],
        0,
      ),
      mcq(
        "qt-ar4",
        "RTM (requirements traceability matrix):",
        "RTM:",
        ["зв'язок вимог ↔ тести", "матриця зарплат", "матриця кольорів", "RAID matrix only"],
        0,
      ),
    ],
  ),
  lesson(
    "qt-ar-checklist",
    "Checklists",
    "Checklists",
    1,
    false,
    [
      mcq(
        "qt-ar5",
        "Checklist корисний для:",
        "Checklists help for:",
        ["швидких регресій/exploratory support", "заміни всіх вимог forever", "вимкнення CI", "delete cases"],
        0,
      ),
    ],
  ),
  exam("qt-ar-exam", "Контрольна: artifacts", "Exam: artifacts", 2, [
    mcq("qt-are1", "Plan includes:", "Plan includes:", ["scope risk resources", "only jokes", "only emojis", "only wallpaper"], 0),
    mcq("qt-are2", "Case needs:", "Case needs:", ["steps + expected", "only title empty", "only severity", "only assignee"], 0),
    mcq("qt-are3", "RTM links:", "RTM links:", ["requirements to tests", "people to desks", "colors to fonts", "ports to cables"], 0),
    mcq("qt-are4", "Checklist:", "Checklist:", ["lightweight guidance", "full legal contract only", "compiler", "hypervisor"], 0),
  ]),
]);

const defects = unit("defects", "Дефекти", "Defects", [
  lesson(
    "qt-df-sev-pri",
    "Severity vs priority",
    "Severity vs priority",
    2,
    false,
    [
      mcq(
        "qt-df1",
        "Severity — це:",
        "Severity is:",
        ["наскільки сильно впливає на систему/користувача технічно", "порядок у backlog завжди = severity", "колір кнопки", "ім'я гілки"],
        0,
      ),
      mcq(
        "qt-df2",
        "Priority — це:",
        "Priority is:",
        ["бізнес-терміновість виправлення", "глибина stack trace only", "кількість CSS classes", "CPU model"],
        0,
      ),
      mcq(
        "qt-df3",
        "Можлива комбінація:",
        "Possible combo:",
        ["low severity + high priority (напр. логотип на проді)", "неможлива never", "only high/high", "only low/low"],
        0,
      ),
    ],
  ),
  lesson(
    "qt-df-lifecycle",
    "Defect lifecycle",
    "Defect lifecycle",
    2,
    false,
    [
      mcq(
        "qt-df4",
        "Типові статуси:",
        "Typical statuses:",
        ["new → open → fixed → verified → closed (+ reopen)", "only closed forever at birth", "only draft font", "only merged PR without QA"],
        0,
      ),
      mcq(
        "qt-df5",
        "Reopen коли:",
        "Reopen when:",
        ["фікс не вирішив / регрес", "тест зелений", "баг не існував і не існує", "docs updated only"],
        0,
      ),
    ],
  ),
  lesson(
    "qt-df-report",
    "Good bug report",
    "Good bug report",
    2,
    false,
    [
      mcq(
        "qt-df6",
        "Гарний bug report містить:",
        "A good bug report contains:",
        [
          "env, steps, expected, actual, evidence",
          "лише «не працює»",
          "лише screenshot без контексту always enough never steps",
          "only severity emoji",
        ],
        0,
      ),
      matchEx(
        "qt-df7",
        "Поля звіту",
        "Report fields",
        [
          { left: "Expected", right: "what should happen" },
          { left: "Actual", right: "what happened" },
          { left: "Steps", right: "how to reproduce" },
        ],
      ),
    ],
  ),
  exam("qt-df-exam", "Контрольна: defects", "Exam: defects", 2, [
    mcq("qt-dfe1", "Severity:", "Severity:", ["impact seriousness", "sprint order only", "assignee mood", "desk number"], 0),
    mcq("qt-dfe2", "Priority:", "Priority:", ["business urgency", "stack depth only", "file size", "line number only"], 0),
    mcq("qt-dfe3", "Bug report needs:", "Bug report needs:", ["steps expected actual", "only title \"bug\"", "only ping", "only meme"], 0),
    mcq("qt-dfe4", "Reopen:", "Reopen:", ["fix failed / still broken", "always after close never check", "on green only", "on docs"], 0),
    mcq("qt-dfe5", "Lifecycle starts:", "Lifecycle starts:", ["new/open", "closed only", "verified only", "ignored"], 0),
  ]),
]);

const advanced = unit("advanced-design", "Advanced design", "Advanced design", [
  lesson(
    "qt-ad-pairwise",
    "Pairwise intro",
    "Pairwise intro",
    3,
    false,
    [
      mcq(
        "qt-ad1",
        "Pairwise / combinatorial lite:",
        "Pairwise / combinatorial lite:",
        [
          "покриває пари параметрів ефективніше за full cartesian",
          "тестує всі N-ості always",
          "забороняє параметри",
          "only visual",
        ],
        0,
      ),
      mcq(
        "qt-ad2",
        "Корисно коли:",
        "Useful when:",
        ["багато незалежних конфігів/флагів", "один boolean", "no inputs", "static text site only"],
        0,
      ),
    ],
  ),
  lesson(
    "qt-ad-risk",
    "Risk-based testing",
    "Risk-based testing",
    3,
    false,
    [
      mcq(
        "qt-ad3",
        "Risk-based testing:",
        "Risk-based testing:",
        ["більше уваги high probability×impact зонам", "рівномірно все always", "ігнорувати critical paths", "only low risk"],
        0,
      ),
      mcq(
        "qt-ad4",
        "Ризик оцінюють за:",
        "Risk often combines:",
        ["ймовірність і вплив", "лише колір Jira", "лише довжину title", "лише assignee"],
        0,
      ),
    ],
  ),
  exam("qt-ad-exam", "Контрольна: advanced", "Exam: advanced", 3, [
    mcq("qt-ade1", "Pairwise reduces:", "Pairwise reduces:", ["combinatorial explosion", "need for any tests", "CI", "git"], 0),
    mcq("qt-ade2", "Risk-based focuses:", "Risk-based focuses:", ["high risk areas", "only low risk", "random only", "docs only"], 0),
    mcq("qt-ade3", "Risk ~:", "Risk ~:", ["likelihood × impact", "font size", "commit count", "emoji count"], 0),
    mcq("qt-ade4", "Combinatorial testing:", "Combinatorial testing:", ["smart sampling of combos", "one combo only", "no params", "ban configs"], 0),
  ]),
]);

const automation = unit("automation-context", "Автоматизація", "Automation context", [
  lesson(
    "qt-au-what",
    "Що автоматизувати",
    "What to automate",
    2,
    false,
    [
      mcq(
        "qt-au1",
        "Добрі кандидати на automation:",
        "Good automation candidates:",
        [
          "стабільні, повторювані, high-value checks",
          "одноразові exploratory сесії always",
          "нестабільні flaky UI без value",
          "все підряд без ROI",
        ],
        0,
      ),
      mcq(
        "qt-au2",
        "Погані кандидати:",
        "Poor candidates:",
        ["часто мінливий UI без селекторної стратегії", "pure functions with clear API", "API contract stable", "unit math"],
        0,
      ),
    ],
  ),
  lesson(
    "qt-au-roi",
    "ROI & pyramid",
    "ROI & pyramid",
    2,
    false,
    [
      mcq(
        "qt-au3",
        "ROI automation враховує:",
        "Automation ROI considers:",
        ["вартість підтримки vs час/ризик ручного", "лише кількість рядків тесту", "лише назву фреймворку", "колір звіту"],
        0,
      ),
      mcq(
        "qt-au4",
        "Піраміда vs ice cream:",
        "Pyramid vs ice cream:",
        ["піраміда: більше низькорівневих; ice cream — навпаки", "ice cream ideal", "піраміда = 0 unit", "e2e only best always"],
        0,
      ),
    ],
  ),
  exam("qt-au-exam", "Контрольна: automation", "Exam: automation", 2, [
    mcq("qt-aue1", "Automate:", "Automate:", ["stable high-value repeats", "one-off chaos only", "never APIs", "never units"], 0),
    mcq("qt-aue2", "ROI includes:", "ROI includes:", ["maintenance cost", "only logo", "only desk", "only snacks"], 0),
    mcq("qt-aue3", "Prefer pyramid:", "Prefer pyramid:", ["more fast lower-level tests", "only UI e2e mountain", "no CI", "manual only"], 0),
    mcq("qt-aue4", "Flaky e2e excess:", "Flaky e2e excess:", ["hurts trust/ROI", "always best", "replaces unit forever", "no downside"], 0),
  ]),
]);

const metrics = unit("metrics-risk", "Метрики", "Metrics", [
  lesson(
    "qt-m-passrate",
    "Pass rate traps",
    "Pass rate traps",
    2,
    false,
    [
      mcq(
        "qt-m1",
        "Високий pass rate може бути оманливим якщо:",
        "High pass rate can mislead if:",
        ["тести слабкі/застарілі/немає ризикових зон", "завжди означає quality", "замінює UAT always", "гарантує security"],
        0,
      ),
      mcq(
        "qt-m2",
        "Краще дивитись також:",
        "Also watch:",
        ["escaped defects, severity trends, flake rate", "only green %", "only LOC tests", "only stars"],
        0,
      ),
    ],
  ),
  lesson(
    "qt-m-escaped",
    "Escaped defects",
    "Escaped defects",
    2,
    false,
    [
      mcq(
        "qt-m3",
        "Escaped defect:",
        "Escaped defect:",
        ["знайдений після релізу/на пізнішій фазі ніж мав", "будь-який unit fail", "flaky test", "todo comment"],
        0,
      ),
      mcq(
        "qt-m4",
        "Мета аналізу escaped:",
        "Escaped analysis goal:",
        ["покращити процес/покриття ризиків", "звинуватити random", "вимкнути monitoring", "delete logs"],
        0,
      ),
    ],
  ),
  exam("qt-m-exam", "Контрольна: metrics", "Exam: metrics", 2, [
    mcq("qt-me1", "Pass rate alone:", "Pass rate alone:", ["can mislead", "perfect quality proof", "security proof", "UX proof"], 0),
    mcq("qt-me2", "Escaped defects:", "Escaped defects:", ["found too late", "all unit fails", "all todos", "all logs"], 0),
    mcq("qt-me3", "Useful signals:", "Useful signals:", ["severity + flake + escape", "only green", "only red count without context", "only emoji"], 0),
    mcq("qt-me4", "Metrics should drive:", "Metrics should drive:", ["process improvement", "blame only", "hiding issues", "deleting tests"], 0),
  ]),
]);

const capstone = unit("capstone", "Capstone case", "Capstone case", [
  lesson(
    "qt-cap-feature",
    "Кейс: новий checkout",
    "Case: new checkout",
    3,
    false,
    [
      mcq(
        "qt-c1",
        "Для checkout high-risk зон:",
        "For checkout high-risk zones:",
        ["оплата, auth, price calc, stock", "only footer color", "only favicon", "only about page"],
        0,
      ),
      mcq(
        "qt-c2",
        "Мін. набір рівнів:",
        "Minimum level mix:",
        ["unit calc + API integration + critical e2e path", "only one manual click forever", "only load", "only a11y"],
        0,
      ),
      mcq(
        "qt-c3",
        "Техніки на суму замовлення 1..1000:",
        "Techniques for order total 1..1000:",
        ["EP + BVA", "only screenshot", "only spellcheck", "only ping"],
        0,
      ),
      mcq(
        "qt-c4",
        "Перед релізом exit criteria можуть вимагати:",
        "Before release exit criteria may require:",
        ["critical bugs closed + smoke green", "any open sevg1 OK", "no tests run", "random ship"],
        0,
      ),
    ],
  ),
  exam("qt-cap-exam", "Фінальна контрольна QA", "Final QA exam", 3, [
    mcq("qt-ce1", "Principles include:", "Principles include:", ["exhaustive impossible", "test everything always cheap", "bugs never cluster", "no early testing"], 0),
    mcq("qt-ce2", "Pyramid base:", "Pyramid base:", ["unit-heavy", "e2e-only", "zero auto", "manual chaos only"], 0),
    mcq("qt-ce3", "BVA targets:", "BVA targets:", ["boundaries", "only mid", "only UI font", "only DNS"], 0),
    mcq("qt-ce4", "Severity vs priority:", "Severity vs priority:", ["impact vs business urgency", "same always", "only assignee", "only sprint"], 0),
    mcq("qt-ce5", "Good report:", "Good report:", ["steps expected actual", "only \"broken\"", "only anger", "only severity 🔥"], 0),
    mcq("qt-ce6", "Automation ROI:", "Automation ROI:", ["value vs maintenance", "automate everything blind", "never automate API", "ban unit"], 0),
    mcq("qt-ce7", "Escaped defect:", "Escaped defect:", ["late find", "green unit", "todo", "comment"], 0),
    mcq("qt-ce8", "Shift-left:", "Shift-left:", ["earlier quality", "later only", "prod-only", "no review"], 0),
  ]),
]);

export const qaTheoryContent: CourseContent = {
  slug: "qa_theory",
  titleUk: "QA: теорія",
  titleEn: "QA Theory",
  descriptionUk:
    "Глибока теорія тестування: принципи, рівні, види, black/white-box, STLC, дефекти, автоматизація, метрики.",
  descriptionEn:
    "Deep testing theory: principles, levels, types, black/white-box, STLC, defects, automation, metrics.",
  icon: "🧪",
  color: "#0D9488",
  units: [
    foundations,
    principles,
    levels,
    typesFunc,
    typesNonfunc,
    blackBox,
    whiteBox,
    stlc,
    artifacts,
    defects,
    advanced,
    automation,
    metrics,
    capstone,
  ],
};
