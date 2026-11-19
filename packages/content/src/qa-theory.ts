import type { CourseContent } from "./types.js";
import { codeOrderAuto, concept, exam, lesson, matchEx, mcq, unit, why } from "./builders.js";

const foundations = unit("foundations", "Основи якості", "Quality foundations", [
  lesson(
    "qt-what-quality",
    "Що таке якість ПЗ",
    "What is software quality",
    1,
    true,
    [
      concept("qt-quality-concept", "Якість, дефект і збій", "Quality, defects, and failures", {
        uk: "Якість оцінюють відносно потреб користувачів, вимог і контексту: важливими можуть бути коректність, надійність, доступність і швидкодія. Помилка людини може внести дефект у вимогу або код; під час виконання дефект може проявитися як збій. Не кожен дефект призводить до збою в кожному сценарії.",
        en: "Quality is evaluated against user needs, requirements, and context: correctness, reliability, accessibility, and performance may all matter. A human mistake can introduce a defect into a requirement or code; during execution that defect may manifest as a failure. Not every defect causes a failure in every scenario.",
      }),
      { ...mcq(
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
      ), optionsEn: ["The degree to which needs, expectations, and requirements are met", "Only lines of code", "Only compilation speed", "The logo color"] },
      { ...mcq(
        "qt-f2",
        "Дефект (bug) — це:",
        "A defect (bug) is:",
        [
          "недолік в артефакті, що може спричинити відхилення поведінки",
          "завжди падіння сервера",
          "лише UI typo never logic",
          "успішний деплой",
        ],
        0,
      ), optionsEn: ["A defect is a flaw that can lead to behavior differing from expectations", "Always a server crash", "Only a UI typo, never logic", "A successful deployment"] },
      { ...mcq(
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
      ), optionsEn: ["A failure is observed incorrect behavior; a fault is a defect in an artifact", "They always mean the same thing", "Failure only occurs in CSS", "Fault only occurs in marketing"] },
    ],
  ),
  lesson(
    "qt-vv",
    "Verification vs Validation",
    "Verification vs Validation",
    2,
    true,
    [
      concept("qt-vv-concept", "Перевірка відповідності та придатності", "Verification and validation", {
        uk: "Verification перевіряє відповідність артефакту визначеним вимогам: наприклад, огляд специфікації або тест розрахунку за формулою. Validation оцінює, чи придатний продукт для реальних потреб і контексту користувача: наприклад, випробування процесу з користувачами. Обидва види діяльності можуть включати різні методи та виконуватися протягом життєвого циклу.",
        en: "Verification checks whether an artifact conforms to specified requirements, for example by reviewing a specification or testing a calculation against a formula. Validation assesses whether the product is fit for real user needs and context, for example by trying a workflow with users. Both can use different methods throughout the lifecycle.",
      }),
      { ...mcq(
        "qt-f4",
        "Яке питання приблизно відповідає verification?",
        "Verification roughly asks:",
        ["Чи правильно ми створюємо продукт відповідно до вимог?", "Чи створюємо ми потрібний продукт?", "Скільки зірок на GitHub?", "Який наш Elo?"],
        0,
      ), optionsEn: ["Are we building the product right against its requirements?", "Are we building the right product?", "How many GitHub stars?", "What is our Elo?"] },
      { ...mcq(
        "qt-f5",
        "Яке питання приблизно відповідає validation?",
        "Validation roughly asks:",
        ["Чи створюємо ми продукт, потрібний користувачам?", "Чи точна версія компілятора?", "Лише кількість unit-тестів?", "Чи працює Redis?"],
        0,
      ), optionsEn: ["Are we building the product users need?", "Is the compiler version exact?", "Only the unit test count?", "Is Redis running?"] },
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
      concept("qt-cost-concept", "Вартість виявлення та виправлення", "Cost of detection and correction", {
        uk: "Ранній зворотний зв'язок може зменшити переробку та вплив дефекту: помилку у вимозі дешевше уточнити до того, як на ній побудують кілька частин системи. Але універсального множника вартості немає: усе залежить від дефекту, масштабу, архітектури, часу виявлення та наслідків. Shift-left означає починати перевірки раніше, зберігаючи потрібні перевірки після розгортання.",
        en: "Early feedback can reduce rework and impact: an incorrect requirement may be cheaper to clarify before several parts of the system depend on it. There is no universal cost multiplier, however: it depends on the defect, scale, architecture, detection time, and consequences. Shift-left means starting checks earlier while retaining necessary checks after deployment.",
      }),
      { ...mcq(
        "qt-f7",
        "Зазвичай вартість виправлення росте:",
        "Fix cost usually grows:",
        [
          "може зростати з переробкою та наслідками пізнього виявлення",
          "чим раніше — завжди дорожче",
          "не залежить від фази",
          "лише від кольору UI",
        ],
        0,
      ), optionsEn: ["It can grow with rework and consequences of late detection", "Earlier is always more expensive", "It never depends on the phase", "It depends only on UI color"] },
      { ...mcq(
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
      ), optionsEn: ["Involve quality checks and testing earlier in the lifecycle", "Move all testing only to production", "Exclude unit tests", "Test only the logo design"] },
      matchEx(
        "qt-art-1",
        "Зіставте ситуацію з можливим джерелом витрат на виправлення",
        "Match each situation with a potential source of correction cost",
        [
          { left: "Неоднозначна вимога до реалізації / Ambiguous requirement before implementation", right: "Уточнити очікування / Clarify expectations" },
          { left: "Дефект у залежних компонентах / Defect in dependent components", right: "Переробити й повторно перевірити компоненти / Rework and retest components" },
          { left: "Дефект вплинув на користувачів / Defect affected users", right: "Усунути наслідки та відновити сервіс / Mitigate impact and restore service" },
        ],
      ),
    ],
  ),
  exam("qt-f-exam", "Контрольна: основи", "Exam: foundations", 2, [
    { ...mcq("qt-fe1", "З чим пов'язана якість продукту?", "What is product quality related to?", ["З потребами користувачів і вимогами в конкретному контексті", "Лише з кількістю рядків коду", "Лише з FPS", "Лише з SEO"], 0), optionsEn: ["User needs and requirements in a specific context", "Only lines of code", "Only FPS", "Only SEO"] },
    { ...mcq("qt-fe2", "Що таке дефект?", "What is a defect?", ["Недолік, який може спричинити невідповідну поведінку", "Успішне розгортання", "Лише успішна збірка", "Назва перемикача функції"], 0), optionsEn: ["A flaw that can cause incorrect behavior", "A successful deployment", "Only a passing build", "A feature flag name"] },
    { ...mcq("qt-fe3", "На яке питання допомагає відповісти верифікація?", "Which question does verification help answer?", ["Чи відповідає результат встановленим вимогам?", "Чи достатній бюджет реклами?", "Який колір логотипа?", "Яка адреса DNS?"], 0), optionsEn: ["Does the result meet specified requirements?", "Is the advertising budget sufficient?", "What color is the logo?", "What is the DNS address?"] },
    { ...mcq("qt-fe4", "На яке питання допомагає відповісти валідація?", "Which question does validation help answer?", ["Чи задовольняє продукт потреби для передбаченого використання?", "Які прапорці компілятора задано?", "Який формат диска?", "Який рівень RAID?"], 0), optionsEn: ["Does the product meet needs for its intended use?", "Which compiler flags are set?", "What is the disk format?", "What is the RAID level?"] },
    { ...mcq("qt-fe5", "Чому варто виявляти проблеми раніше?", "Why is early problem detection useful?", ["Воно може зменшити переробку та наслідки, хоча фактичні витрати залежать від контексту", "Пізні дефекти завжди безкоштовні", "Це важливо лише для CSS", "Пізні дефекти ніколи не мають значення"], 0), optionsEn: ["It can reduce rework and consequences, although actual costs depend on context", "Late defects are always free", "It matters only for CSS", "Late defects never matter"] },
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
      concept("qt-exhaustive-concept", "Вибір перевірок за ризиком", "Choosing checks by risk", {
        uk: "Повний перебір усіх входів, станів і послідовностей для більшості реальних систем непрактичний. Навіть вісім незалежних прапорців утворюють 2⁸ = 256 комбінацій значень, ще до урахування інших полів і порядку дій. Вибирайте перевірки за ризиком, межами, класами еквівалентності та важливими взаємодіями; кількість комбінацій не обов'язково дорівнює кількості тест-кейсів.",
        en: "Exhaustively covering all inputs, states, and sequences is impractical for most real systems. Even eight independent checkboxes produce 2⁸ = 256 value combinations before other fields and action order are considered. Select checks using risk, boundaries, equivalence classes, and important interactions; the number of combinations is not necessarily the number of test cases.",
      }),
      { ...mcq(
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
      ), optionsEn: ["The input and state space is usually enormous", "Computers cannot assert", "The DOM forbids tests", "npm blocks tests"] },
      { ...mcq(
        "qt-p2",
        "Тому обирають:",
        "So we choose:",
        ["пріоритезацію і техніки дизайну тестів", "випадковий відмову від тестів", "лише prod traffic", "no docs"],
        0,
      ), optionsEn: ["Risk-based prioritization and test design techniques", "Arbitrarily abandon testing", "Only production traffic", "No documentation"] },
      { ...mcq(
        "qt-art-2",
        "Форма має 8 незалежних двопозиційних прапорців. Скільки можливих комбінацій їхніх значень?",
        "A form has 8 independent two-state checkboxes. How many combinations of their values are possible?",
        [
          "2^8 = 256 комбінацій (тому застосовують техніки тест-дизайну для скорочення)",
          "Лише 8 тестів",
          "16 тестів",
          "1 тест",
        ],
        0,
      ), optionsEn: ["2^8 = 256 combinations", "Only 8", "16", "1"] },
    ],
  ),
  lesson(
    "qt-p-early-cluster",
    "Early & pesticide & clusters",
    "Early & pesticide & clusters",
    2,
    false,
    [
      concept("qt-principles-concept", "Ранній зворотний зв'язок і перегляд тестів", "Early feedback and test review", {
        uk: "Ранній огляд вимог і прикладів може виявити проблеми до дорогої переробки. Дефекти нерідко концентруються в окремих компонентах, але минула частота не доводить, що інші частини безпечні. Повторення незмінного набору тестів корисне для регресії, проте для пошуку нових класів проблем варто переглядати дані, сценарії та ризики.",
        en: "Early review of requirements and examples can reveal problems before expensive rework. Defects often cluster in particular components, but past frequency does not prove that other areas are safe. Repeating unchanged tests remains useful for regression; to find new classes of problems, review data, scenarios, and risks.",
      }),
      { ...mcq(
        "qt-p3",
        "Early testing:",
        "Early testing:",
        ["Ранній зворотний зв'язок може зменшити переробку", "Тестування лише наприкінці релізу", "Заборонено в agile", "Лише ручне тестування назавжди"],
        0,
      ), optionsEn: ["Early feedback can reduce rework", "Testing only at the end of a release", "Forbidden in agile", "Only manual testing forever"] },
      { ...mcq(
        "qt-p4",
        "Defect clustering:",
        "Defect clustering:",
        ["баги часто скупчуються в «гарячих» модулях", "баги equidistributed always", "баги лише в README", "немає модулів"],
        0,
      ), optionsEn: ["Defects often cluster in particular modules", "Defects are always evenly distributed", "Defects occur only in README", "There are no modules"] },
      { ...mcq(
        "qt-p5",
        "Pesticide paradox:",
        "Pesticide paradox:",
        [
          "незмінний набір може не знаходити нові види дефектів — переглядайте сценарії",
          "тести вбивають CI",
          "антивірус блокує jest",
          "лише UI тести immortal",
        ],
        0,
      ), optionsEn: ["An unchanged suite may miss new defect classes, so review scenarios", "Tests kill CI", "Antivirus blocks Jest", "Only UI tests last forever"] },
    ],
  ),
  lesson(
    "qt-p-context",
    "Context & absence of errors",
    "Context & absence of errors",
    2,
    false,
    [
      concept("qt-context-concept", "Контекст і корисність продукту", "Context and product usefulness", {
        uk: "Стратегія тестування залежить від наслідків відмови, користувачів, середовища й вартості перевірок. Авіаційна система та промо-сайт матимуть різні пріоритети, хоча доступність і безпека можуть бути важливі для обох. Відсутність знайдених дефектів не доводить, що продукт задовольняє потреби або не має ризиків.",
        en: "A test strategy depends on failure consequences, users, environment, and testing cost. Aviation software and a promotional site have different priorities, although accessibility and security can matter to both. Finding no defects does not prove that a product meets needs or has no risk.",
      }),
      { ...mcq(
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
      ), optionsEn: ["The approach depends on risk, domain, and criticality", "One checklist fits every product forever", "Only end-to-end tests for calculators", "Risk analysis is unnecessary"] },
      { ...mcq(
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
      ), optionsEn: ["Finding zero bugs does not prove the product is useful or needed", "Zero bugs always means a perfect product", "Tests guarantee profit", "100% coverage means no risk"] },
      { ...mcq(
        "qt-art-3",
        "Принцип контексту: яка головна відмінність тестування авіаційного дрона від промо-сайту кав'ярні?",
        "Context principle: key difference testing drone avionics vs coffee shop promo site?",
        [
          "Наслідки відмови дрона можуть вимагати суворішої перевірки безпеки, тоді як для сайту пріоритети залежать від його ризиків",
          "Для дронів тести не потрібні взагалі",
          "Промо-сайт вимагає сертифікації DO-178C",
          "Немає жодної різниці",
        ],
        0,
      ), optionsEn: ["Drone failure consequences can require stricter safety testing, while site priorities depend on its risks", "Drones need no testing", "Every promotional site requires DO-178C certification", "There is no difference"] },
    ],
  ),
  exam("qt-p-exam", "Контрольна: принципи", "Exam: principles", 2, [
    { ...mcq("qt-pe1", "Що характерно для вичерпного тестування?", "What is true of exhaustive testing?", ["Воно зазвичай неможливе через кількість можливих умов", "Воно завжди обов'язкове", "Воно завжди безкоштовне", "Його виконує CSS"], 0), optionsEn: ["It is generally impossible because of the number of possible conditions", "It is always mandatory", "It is always free", "CSS performs it"] },
    { ...mcq("qt-pe2", "Яка можлива користь раннього тестування?", "What is a possible benefit of early testing?", ["Раніше виявляти проблеми та зменшувати можливі витрати на переробку", "Завжди марнувати час", "Забороняти модульні тести", "Перевіряти лише production"], 0), optionsEn: ["Find problems earlier and potentially reduce rework", "Always waste time", "Ban unit tests", "Test only production"] },
    { ...mcq("qt-pe3", "Що означає групування дефектів?", "What does defect clustering mean?", ["Значна частка дефектів може зосереджуватися в окремих компонентах", "Дефекти ніколи не групуються", "Дефекти існують лише у шрифтах", "Дефекти існують лише в DNS"], 0), optionsEn: ["A significant share of defects may concentrate in particular components", "Defects never cluster", "Defects occur only in fonts", "Defects occur only in DNS"] },
    { ...mcq("qt-pe4", "Чому тестовий набір потрібно переглядати?", "Why should a test suite be reviewed?", ["Незмінні перевірки з часом можуть перестати виявляти нові дефекти", "Потрібно видалити всі тести", "Одного тесту завжди достатньо", "Автоматизація заборонена"], 0), optionsEn: ["Unchanged checks can become less effective at finding new defects", "All tests must be deleted", "One test is always enough", "Automation is forbidden"] },
    { ...mcq("qt-pe5", "Що означає відсутність виявлених помилок?", "What does finding no errors imply?", ["Це не гарантує, що продукт задовольняє потреби користувачів", "Продукт точно відповідає ринку", "Приймальне тестування не потрібне", "Ризиків немає"], 0), optionsEn: ["It does not guarantee the product meets user needs", "Product-market fit is certain", "Acceptance testing is unnecessary", "There is no risk"] },
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
      concept("qt-unit-concept", "Перевірка невеликої одиниці", "Testing a small unit", {
        uk: "Unit-тест перевіряє поведінку невеликої одиниці коду за контрольованих умов. Для незалежності від мережі або часу можна використати тестовий двійник, але тоді тест не перевіряє реальну інтеграцію. Добрий тест має зрозумілу перевірку результату і стабільно відтворюється.",
        en: "A unit test checks the behavior of a small unit of code under controlled conditions. A test double can isolate it from network or timing dependencies, but then the test does not verify the real integration. A useful test has a clear assertion and produces repeatable results.",
      }),
      { ...mcq(
        "qt-l1",
        "Unit test перевіряє:",
        "A unit test checks:",
        ["ізольований модуль/функцію", "увесь prod cluster always", "лише UX copy", "DNS TTL"],
        0,
      ), optionsEn: ["A small unit such as a function or module", "Always the entire production cluster", "Only UX copy", "DNS TTL"] },
      { ...mcq(
        "qt-l2",
        "Характеристика добрих unit:",
        "Good unit tests are:",
        ["швидкі, ізольовані, детерміновані", "завжди flaky e2e", "потребують full staging", "тільки manual"],
        0,
      ), optionsEn: ["Fast, isolated, and deterministic", "Always flaky end-to-end tests", "Require a full staging environment", "Only manual"] },
      { ...mcq(
        "qt-art-4",
        "Артефакт: юніт-тест платіжного модуля використовує Mock для банку. Чому?",
        "Artifact: payment unit test uses a Mock for bank API. Why?",
        [
          "Щоб ізолювати логіку класу від реальної мережі, затримок та зовнішніх збоїв",
          "Тому що Mock швидше передає реальні кошти",
          "Щоб протестувати роботу інтернет-провайдера",
          "Mock вимагається стандартом ISO 9001",
        ],
        0,
      ), optionsEn: ["To isolate the logic from real network delays and external failures", "Because a mock transfers real money faster", "To test the internet provider", "Because ISO 9001 requires a mock"] },
    ],
  ),
  lesson(
    "qt-l-integration",
    "Integration",
    "Integration",
    2,
    false,
    [
      concept("qt-integration-concept", "Перевірка меж між компонентами", "Testing component boundaries", {
        uk: "Інтеграційний тест перевіряє взаємодію компонентів, наприклад API з базою даних. Контракт описує очікуваний формат і поведінку на межі; контрактні тести можуть виявити несумісність, якщо перевіряють обидві сторони та запускаються для актуальних версій. Схема сама по собі не гарантує, що реалізації її дотримуються.",
        en: "An integration test checks how components interact, for example an API with a database. A contract describes expected formats and behavior at a boundary; contract tests can reveal incompatibility when they check both sides and run against current versions. A schema alone does not guarantee implementations follow it.",
      }),
      { ...mcq(
        "qt-l3",
        "Integration testing:",
        "Integration testing:",
        ["взаємодія модулів/сервісів/API", "лише snapshot CSS", "лише spellcheck", "chess puzzles"],
        0,
      ), optionsEn: ["Interactions among modules, services, or APIs", "Only CSS snapshots", "Only spellcheck", "Chess puzzles"] },
      { ...mcq(
        "qt-l4",
        "Контрактні тести близькі до:",
        "Contract tests relate to:",
        ["інтеграційних меж між сервісами", "unit pure math only", "load only", "a11y only"],
        0,
      ), optionsEn: ["Integration boundaries between services", "Only pure-math unit tests", "Only load testing", "Only accessibility testing"] },
      { ...mcq(
        "qt-art-5",
        "Сервіс A передає date як рядок, а B очікує число. Що допоможе виявити несумісність до розгортання?",
        "Service A sends date as a string and B expects a number. What can help detect the mismatch before deployment?",
        [
          "Узгоджений контракт і перевірка обох реалізацій проти нього",
          "Unit-тест утиліти форматування",
          "Навантажувальний звіт",
          "Політика конфіденційності",
        ],
        0,
      ), optionsEn: ["An agreed contract with checks of both implementations against it", "A formatter's unit test alone", "A load report", "A privacy policy"] },
    ],
  ),
  lesson(
    "qt-l-system-acc",
    "System & acceptance",
    "System & acceptance",
    2,
    false,
    [
      concept("qt-system-concept", "Система і приймання", "System and acceptance", {
        uk: "Системне тестування перевіряє інтегровану систему щодо вимог і ризиків. Приймальне тестування оцінює, чи відповідає рішення критеріям приймання та потребам зацікавлених сторін; у UAT часто беруть участь користувачі або замовник. Alpha і beta описують контекст учасників і середовища, а не гарантують відсутність дефектів.",
        en: "System testing checks the integrated system against requirements and risks. Acceptance testing evaluates whether the solution meets acceptance criteria and stakeholder needs; users or customers often participate in UAT. Alpha and beta describe the context of participants and environment, not a guarantee of zero defects.",
      }),
      { ...mcq("qt-l5", "Що перевіряє системне тестування?", "What does system testing check?", ["Інтегровану систему відносно вимог", "Одну функцію без залежностей", "Лише лінтер", "Лише хуки комітів"], 0), optionsEn: ["The integrated system against requirements", "One function without dependencies", "Only the linter", "Only commit hooks"] },
      { ...mcq("qt-l6", "Що оцінює приймальне тестування?", "What does acceptance testing evaluate?", ["Відповідність критеріям приймання та потребам зацікавлених сторін", "Лише відсоток покриття", "Лише успішні модульні тести", "Лише DNS"], 0), optionsEn: ["Whether acceptance criteria and stakeholder needs are met", "Only coverage percentage", "Only passing unit tests", "Only DNS"] },
      matchEx(
        "qt-art-6",
        "Зіставте системні та приймальні тести",
        "Match system and acceptance testing",
        [
          { left: "System testing", right: "Інтегрована система проти вимог / Integrated system against requirements" },
          { left: "UAT (Acceptance)", right: "Приймання за участі користувача або замовника / Acceptance with users or customer" },
          { left: "Alpha testing", right: "Раннє тестування у середовищі розробника / Early testing in the developer's environment" },
          { left: "Beta testing", right: "Обмежене тестування зовнішніми користувачами / Limited testing by external users" },
        ],
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
      concept("qt-pyramid-concept", "Баланс автоматизованих перевірок", "Balancing automated checks", {
        uk: "Піраміда тестування — евристика: багато швидких перевірок невеликих одиниць, менше інтеграційних і вибрані наскрізні сценарії. Межі та пропорції залежать від продукту й ризиків, а не від фіксованих відсотків. Перевіряйте швидкість, стабільність і цінність кожного шару, не прибираючи потрібні наскрізні перевірки.",
        en: "The test pyramid is a heuristic: many fast small-unit checks, fewer integration checks, and selected end-to-end scenarios. Boundaries and proportions depend on the product and risks, not fixed percentages. Evaluate speed, reliability, and value at each layer without removing necessary end-to-end checks.",
      }),
      { ...mcq("qt-l7", "Що зазвичай становить основу тестової піраміди?", "What usually forms the base of a test pyramid?", ["Багато швидких модульних перевірок", "Лише наскрізні тести", "Відсутність тестів", "Лише ручні перевірки"], 0), optionsEn: ["Many fast unit checks", "Only end-to-end tests", "No tests", "Only manual checks"] },
      { ...mcq("qt-l8", "Що описує форма Ice Cream Cone?", "What does the ice-cream cone shape describe?", ["Багато високорівневих UI-тестів і мало модульних", "Ідеальну піраміду за будь-яких умов", "Лише статичний аналіз", "Відсутність CI"], 0), optionsEn: ["Many high-level UI tests and few unit tests", "An ideal pyramid in every context", "Only static analysis", "No CI"] },
      { ...mcq("qt-art-7", "У наборі багато повільних і нестабільних UI-тестів та мало низькорівневих. Який можливий наслідок?", "A suite has many slow, flaky UI tests and few lower-level checks. What is a possible consequence?", ["Повільний зворотний зв’язок і високі витрати на аналіз та підтримку", "Гарантований запуск за дві секунди", "Повна відсутність дефектів", "Автоматичне зменшення роботи QA"], 0), optionsEn: ["Slow feedback and high investigation and maintenance costs", "A guaranteed two-second run", "No defects at all", "An automatic reduction in QA work"] },
    ],
  ),
  exam("qt-l-exam", "Контрольна: рівні тестування", "Exam: test levels", 2, [
    { ...mcq("qt-le1", "Що зазвичай перевіряє модульний тест?", "What does a unit test typically check?", ["Невеликий компонент із контрольованими залежностями", "Лише всю систему в production", "Лише тексти інтерфейсу", "Лише CDN"], 0), optionsEn: ["A small component with controlled dependencies", "Only the whole system in production", "Only UI copy", "Only a CDN"] },
    { ...mcq("qt-le2", "На чому зосереджене інтеграційне тестування?", "What does integration testing focus on?", ["На взаємодії компонентів", "Лише на кернінгу", "Лише на favicon", "Лише на юридичному тексті"], 0), optionsEn: ["Interactions between components", "Only kerning", "Only a favicon", "Only legal copy"] },
    { ...mcq("qt-le3", "Що перевіряє системне тестування?", "What does system testing examine?", ["Поведінку системи загалом відносно вимог", "Лише одну чисту функцію", "Лише tsconfig", "Лише ESLint"], 0), optionsEn: ["The system's overall behavior against requirements", "Only one pure function", "Only tsconfig", "Only ESLint"] },
    { ...mcq("qt-le4", "Яка мета приймального тестування?", "What is the purpose of acceptance testing?", ["Оцінити відповідність узгодженим критеріям і потребам зацікавлених сторін", "Перевірити лише відсоток покриття", "Лише зібрати продукт", "Лише завантажити образ Docker"], 0), optionsEn: ["Assess agreed acceptance criteria and stakeholder needs", "Check only the coverage percentage", "Only build the product", "Only pull a Docker image"] },
    { ...mcq("qt-le5", "Що зазвичай становить основу тестової піраміди?", "What usually forms the base of a test pyramid?", ["Багато швидких низькорівневих тестів", "Лише наскрізні тести", "Відсутність автоматизованих перевірок", "Лише навантажувальні тести"], 0), optionsEn: ["Many fast lower-level tests", "Only end-to-end tests", "No automated checks", "Only load tests"] },
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
      concept("qt-smoke-concept", "Швидка перевірка збірки", "Quick build checks", {
        uk: "Smoke-тести швидко перевіряють ключові можливості збірки перед глибшим тестуванням. Sanity часто означає вузьку перевірку конкретної зміни чи виправлення. Команди можуть використовувати ці назви по-різному, тому погодьте обсяг і критерії запуску; успішний smoke не замінює регресію.",
        en: "Smoke tests quickly check key build capabilities before deeper testing. Sanity often means a focused check of a particular change or fix. Teams may use these names differently, so agree on scope and entry criteria; a passing smoke test does not replace regression testing.",
      }),
      { ...mcq(
        "qt-tf1",
        "Smoke test:",
        "Smoke test:",
        ["швидка перевірка «чи збірка жива»", "повний regression always", "only security pen", "only a11y"],
        0,
      ), optionsEn: ["A quick check that key build capabilities work", "Always a full regression", "Only a security penetration test", "Only accessibility"] },
      { ...mcq(
        "qt-tf2",
        "Sanity test:",
        "Sanity test:",
        ["вузька перевірка після fix/зміни", "повний performance suite", "chaos only", "DNS only"],
        0,
      ), optionsEn: ["A focused check after a fix or change", "A full performance suite", "Only chaos testing", "Only DNS"] },
      matchEx(
        "qt-art-8",
        "Зіставте Smoke та Sanity сценарії",
        "Match Smoke and Sanity scenarios",
        [
          { left: "Smoke test", right: "Коротка перевірка ключових шляхів збірки / Brief check of key build paths" },
          { left: "Sanity test", right: "Прицільна перевірка конкретної зміни / Focused check of a specific change" },
        ],
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
      concept("qt-regression-concept", "Повторна і регресійна перевірка", "Retesting and regression", {
        uk: "Retest повторно перевіряє конкретний дефект після виправлення. Regression перевіряє, чи не зламала зміна раніше працюючі можливості; набір вибирають за ризиком і впливом, а не обов'язково запускають повністю після кожної зміни. Обидва підходи доповнюють один одного.",
        en: "Retesting rechecks a specific defect after a fix. Regression testing checks whether a change broke previously working behavior; select the suite based on risk and impact rather than necessarily running every test after every change. The two approaches complement each other.",
      }),
      { ...mcq(
        "qt-tf3",
        "Regression:",
        "Regression:",
        ["старі фічі не зламались після змін", "перший тест нового модуля only", "only install", "only lint"],
        0,
      ), optionsEn: ["Check previously working behavior after a change", "Only the first test of a new module", "Only installation", "Only lint"] },
      { ...mcq(
        "qt-tf4",
        "Retest:",
        "Retest:",
        ["перевірка що конкретний баг виправлено", "випадковий explor always", "only load", "only UI color"],
        0,
      ), optionsEn: ["Recheck that a specific defect is fixed", "Always random exploration", "Only load testing", "Only UI color"] },
      { ...mcq(
        "qt-art-9",
        "Коли доцільно вибирати регресійні перевірки з чек-листа?",
        "When should you select regression checks from a checklist?",
        [
          "Після змін оцінити вплив і запустити перевірки відповідно до ризику",
          "Лише раз на рік на Новий рік",
          "Тільки якщо клієнт поскаржився",
          "Лише до написання коду",
        ],
        0,
      ), optionsEn: ["After changes, assess impact and run checks appropriate to the risk", "Only once a year on New Year's Day", "Only when a customer complains", "Only before writing code"] },
    ],
  ),
  lesson(
    "qt-tf-exploratory",
    "Exploratory & UAT",
    "Exploratory & UAT",
    2,
    false,
    [
      concept("qt-exploratory-concept", "Дослідження і приймання", "Exploration and acceptance", {
        uk: "Дослідницьке тестування поєднує навчання, створення та виконання перевірок: тестувальник коригує наступні дії за спостереженнями. Charter може задати мету, область і часову межу сесії, не диктуючи кожен крок. UAT зосереджується на придатності рішення для бізнес-процесу та критеріях приймання.",
        en: "Exploratory testing combines learning, test design, and execution: the tester adapts the next steps based on observations. A charter can set a mission, scope, and time limit without prescribing every step. UAT focuses on the solution's suitability for a business workflow and its acceptance criteria.",
      }),
      { ...mcq(
        "qt-tf5",
        "Exploratory testing:",
        "Exploratory testing:",
        ["одночасне навчання, дизайн тестів і виконання", "лише записані скрипти без думки", "only unit", "only SQL"],
        0,
      ), optionsEn: ["Learning, test design, and execution together", "Only scripts without thinking", "Only unit testing", "Only SQL"] },
      { ...mcq(
        "qt-tf6",
        "UAT focus:",
        "UAT focus:",
        ["бізнес-прийнятність для користувача", "microservice coverage only", "bundle size only", "ts strict only"],
        0,
      ), optionsEn: ["Business acceptance for users", "Only microservice coverage", "Only bundle size", "Only TypeScript strict mode"] },
      { ...mcq(
        "qt-art-10",
        "Що може корисно описувати charter дослідницької сесії?",
        "What can usefully be described in an exploratory session charter?",
        [
          "Мету сесії (Mission), часові рамки (Timebox) та фокусні зони дослідження",
          "Покроковий код на Java з точними асертами",
          "Підпис генерального директора",
          "Оцінку бюджету компанії",
        ],
        0,
      ), optionsEn: ["The session mission, timebox, and areas to explore", "Exact Java code and assertions", "The CEO's signature", "The company's budget"] },
    ],
  ),
  exam("qt-tf-exam", "Контрольна: функціональні перевірки", "Exam: functional testing", 2, [
    { ...mcq("qt-tfe1", "Яка мета димового тестування?", "What is the purpose of smoke testing?", ["Швидко перевірити основні функції збірки перед глибшим тестуванням", "Виконати повне тестування на проникнення", "Перевірити лише дерево доступності", "Перевірити лише локалізацію"], 0), optionsEn: ["Quickly check core build functionality before deeper testing", "Perform a full penetration test", "Check only the accessibility tree", "Check only localization"] },
    { ...mcq("qt-tfe2", "Для чого проводять регресійне тестування?", "Why perform regression testing?", ["Щоб виявити порушення раніше працездатної поведінки після змін", "Щоб перевірити лише першу функцію", "Щоб перевірити лише документацію", "Щоб перевірити лише іконки"], 0), optionsEn: ["To detect previously working behavior broken by changes", "To check only the first feature", "To check only documentation", "To check only icons"] },
    { ...mcq("qt-tfe3", "Що перевіряє повторне тестування дефекту?", "What does retesting a defect check?", ["Чи усунено конкретну повідомлену проблему", "Чи можна ігнорувати дефект", "Чи можна видалити всі тести", "Чи можна пропустити середовище перевірки"], 0), optionsEn: ["Whether the specific reported issue was fixed", "Whether the defect can be ignored", "Whether all tests can be deleted", "Whether to skip the test environment"] },
    { ...mcq("qt-tfe4", "Що характерно для дослідницького тестування?", "What characterizes exploratory testing?", ["Одночасне вивчення продукту, проєктування та виконання перевірок", "Лише нескінченний запис і відтворення", "Відсутність міркувань", "Заборона CI"], 0), optionsEn: ["Learning, designing, and executing checks together", "Only endless record and playback", "No reasoning", "A ban on CI"] },
    { ...mcq("qt-tfe5", "Що зазвичай означає sanity testing?", "What does sanity testing usually mean?", ["Зосереджену перевірку відповідної зміни", "Усі нефункціональні перевірки", "Лише хаотичні перевірки", "Лише тривале навантаження"], 0), optionsEn: ["A focused check of the relevant change", "All non-functional checks", "Only chaos testing", "Only endurance testing"] },
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
      concept("qt-performance-concept", "Сценарії продуктивності", "Performance scenarios", {
        uk: "Load-тест вимірює поведінку за визначеного профілю навантаження; stress досліджує роботу за підвищеного навантаження та відновлення після перевантаження. Spike перевіряє різкі зміни, а endurance — поведінку протягом тривалого часу. Заздалегідь визначайте навантаження, тривалість, метрики й критерії; універсального порогу тривалості немає.",
        en: "A load test measures behavior under a defined workload; a stress test explores behavior under increased load and recovery after overload. Spike testing examines sudden changes, while endurance testing examines behavior over time. Define workload, duration, metrics, and criteria beforehand; there is no universal duration threshold.",
      }),
      { ...mcq(
        "qt-tn1",
        "Performance testing включає:",
        "Performance testing includes:",
        ["load, stress, soak/endurance (залежно від цілей)", "лише unit assert", "лише spellcheck", "лише color contrast"],
        0,
      ), optionsEn: ["Load, stress, and endurance testing depending on the goal", "Only unit assertions", "Only spellchecking", "Only color contrast"] },
      { ...mcq(
        "qt-tn2",
        "Load vs stress:",
        "Load vs stress:",
        [
          "load вимірює заданий профіль; stress досліджує перевантаження і відновлення",
          "одне й те саме always",
          "stress = unit test",
          "load = only UI click",
        ],
        0,
      ), optionsEn: ["Load measures a defined workload; stress explores overload and recovery", "They are always identical", "Stress is a unit test", "Load is only a UI click"] },
      matchEx(
        "qt-art-11",
        "Зіставте типи тестування продуктивності з їхньою метою",
        "Match performance testing types with their goal",
        [
          { left: "Load testing", right: "Поведінка за заданого навантаження / Behavior under a defined workload" },
          { left: "Stress testing", right: "Перевантаження та відновлення / Overload and recovery" },
          { left: "Spike testing", right: "Реакція на різкі зміни трафіку / Response to sudden traffic changes" },
          { left: "Soak (Endurance)", right: "Проблеми за тривалого навантаження / Issues under sustained load" },
        ],
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
      concept("qt-security-usability-concept", "Безпека і зручність", "Security and usability", {
        uk: "Тестування безпеки досліджує ризики, зокрема доступ, обробку введення і захист даних. Відображення тексту <script> саме по собі не доводить XSS: важливі контекст і те, чи браузер виконує введений код. Usability-тестування спостерігає, як люди виконують реальні завдання, і виявляє труднощі взаємодії.",
        en: "Security testing investigates risks including access control, input handling, and data protection. Displaying the text <script> alone does not prove XSS: the context and whether the browser executes injected code matter. Usability testing observes people performing real tasks to identify interaction difficulties.",
      }),
      { ...mcq(
        "qt-tn3",
        "Security testing шукає:",
        "Security testing looks for:",
        ["вразливості, authz/authn gaps, data exposure", "лише WPM typing", "лише flex gaps", "git emoji"],
        0,
      ), optionsEn: ["Vulnerabilities, authentication and authorization gaps, and data exposure", "Only typing speed", "Only flex gaps", "Git emoji"] },
      { ...mcq(
        "qt-tn4",
        "Usability testing:",
        "Usability testing:",
        ["наскільки зручно реальним людям користуватись", "лише HTTP codes", "лише CPU temp", "only DB vacuum"],
        0,
      ), optionsEn: ["How easily real people can use the product", "Only HTTP status codes", "Only CPU temperature", "Only database vacuuming"] },
      { ...mcq(
        "qt-art-12",
        "У контрольованому тестовому середовищі пошуковий запит вставляється в HTML і браузер виконує введений скрипт. Яку проблему це демонструє?",
        "In a controlled test environment, a search query is inserted into HTML and the browser executes the injected script. What does this demonstrate?",
        [
          "XSS (Cross-Site Scripting — виконання стороннього скрипту)",
          "DDoS атака",
          "Buffer overflow в ядрі Linux",
          "DNS spoofing",
        ],
        0,
      ), optionsEn: ["Cross-site scripting (XSS)", "A DDoS attack", "A Linux kernel buffer overflow", "DNS spoofing"] },
    ],
  ),
  lesson(
    "qt-tn-compat-rel",
    "Compatibility & reliability",
    "Compatibility & reliability",
    2,
    false,
    [
      concept("qt-compat-reliability-concept", "Сумісність і надійність", "Compatibility and reliability", {
        uk: "Сумісність перевіряють у важливих комбінаціях браузерів, ОС, пристроїв та інших залежностей. Надійність описує здатність системи працювати за визначених умов у часі; для аналізу відмов і відновлення можуть використовувати MTBF та MTTR. Визначення метрик і спосіб вимірювання потрібно узгодити для конкретної системи.",
        en: "Compatibility is checked across relevant combinations of browsers, operating systems, devices, and other dependencies. Reliability describes a system's ability to operate under defined conditions over time; MTBF and MTTR can help analyze failures and recovery. Define how each metric is measured for the particular system.",
      }),
      { ...mcq(
        "qt-tn5",
        "Compatibility:",
        "Compatibility:",
        ["браузери/ОС/пристрої/версії", "only one browser forever", "only server CPU model", "only IDE theme"],
        0,
      ), optionsEn: ["Browsers, operating systems, devices, and versions", "Only one browser forever", "Only a server CPU model", "Only an IDE theme"] },
      { ...mcq(
        "qt-tn6",
        "Reliability:",
        "Reliability:",
        ["стабільність роботи в часі/при збоях", "only first paint", "only bundle gzip", "only favicon"],
        0,
      ), optionsEn: ["Operational stability over time and under failures", "Only first paint", "Only gzip bundle size", "Only the favicon"] },
      { ...mcq(
        "qt-art-13",
        "MTBF (Mean Time Between Failures) та MTTR (Mean Time To Repair) є ключовими метриками для:",
        "MTBF and MTTR metrics are primary indicators of:",
        [
          "Надійності (Reliability) та доступності (Availability) системи",
          "Селекторів CSS у браузері",
          "Розміру шрифту на мобільних пристроях",
          "Кількості коментарів у Git",
        ],
        0,
      ), optionsEn: ["System reliability and availability", "CSS selectors", "Mobile font size", "The number of Git comments"] },
    ],
  ),
  exam("qt-tn-exam", "Контрольна: нефункціональні перевірки", "Exam: non-functional testing", 2, [
    { ...mcq("qt-tne1", "Що досліджує навантажувальне тестування?", "What does load testing examine?", ["Поведінку системи за визначеного навантаження", "Лише модульні функції", "Лише CSS", "Лише тексти"], 0), optionsEn: ["System behavior under a defined workload", "Only unit functions", "Only CSS", "Only copy"] },
    { ...mcq("qt-tne2", "Що досліджує стрес-тестування?", "What does stress testing examine?", ["Поведінку за підвищеного навантаження та відновлення після перевантаження", "Лише повний простій", "Лише документацію", "Лише шрифти"], 0), optionsEn: ["Behavior under increased load and recovery after overload", "Only an idle system", "Only documentation", "Only fonts"] },
    { ...mcq("qt-tne3", "Що належить до перевірок безпеки?", "What belongs to security testing?", ["Пошук вразливостей і перевірка контролю доступу", "Лише кернінг", "Лише міжрядковий інтервал", "Лише CSS-відступи"], 0), optionsEn: ["Finding vulnerabilities and checking access control", "Only kerning", "Only line height", "Only CSS margins"] },
    { ...mcq("qt-tne4", "Що досліджує тестування зручності використання?", "What does usability testing examine?", ["Наскільки користувачі можуть виконувати завдання в конкретному контексті", "Лише транзакції за секунду", "Лише паузи збирача сміття", "Лише конфігурацію дисків"], 0), optionsEn: ["How well users can complete tasks in a particular context", "Only transactions per second", "Only garbage collection pauses", "Only disk configuration"] },
    { ...mcq("qt-tne5", "Що перевіряють під час тестування сумісності?", "What does compatibility testing check?", ["Роботу в узгоджених середовищах, браузерах або на пристроях", "Лише одну версію Node без перевірки", "Лише назву монорепозиторію", "Лише колір бренду"], 0), optionsEn: ["Behavior in agreed environments, browsers, or devices", "Only one Node version without checking", "Only the monorepo name", "Only the brand color"] },
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
      concept("qt-ep-concept", "Класи еквівалентності", "Equivalence partitions", {
        uk: "Розділіть входи на класи, для яких за правилами очікується подібна поведінка, і виберіть представників кожного класу. Для цілого віку 18–65 включно це можуть бути значення нижче 18, від 18 до 65 і вище 65. Окремо розгляньте порожнє значення, дроби або текст, якщо їх допускає інтерфейс; один представник не доводить правильність усього класу.",
        en: "Partition inputs into classes expected to behave similarly under the rules, then select representatives from each class. For integer ages 18–65 inclusive these might be below 18, 18 through 65, and above 65. Consider empty input, fractions, or text separately if the interface permits them; one representative does not prove the whole class correct.",
      }),
      { ...mcq(
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
      ), optionsEn: ["Groups inputs into classes with similar expected behavior", "Tests every UI pixel", "Only mutation testing", "Only chaos testing"] },
      { ...mcq(
        "qt-bb2",
        "Мета EP:",
        "EP goal:",
        ["менше тестів при хорошому покритті класів", "максимум дубльованих кейсів", "0 тестів", "only e2e film"],
        0,
      ), optionsEn: ["Use fewer tests while covering selected classes", "Maximize duplicate cases", "Run zero tests", "Only end-to-end recordings"] },
      matchEx(
        "qt-art-14",
        "Еквівалентне розбиття для цілого віку 18–65 включно",
        "Equivalence partitions for integer age 18–65 inclusive",
        [
          { left: "Нижче діапазону / Below range", right: "age < 18 (15)" },
          { left: "У діапазоні / In range", right: "18 <= age <= 65 (30)" },
          { left: "Вище діапазону / Above range", right: "age > 65 (70)" },
        ],
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
      concept("qt-bva-concept", "Перевірка меж", "Checking boundaries", {
        uk: "Помилки часто трапляються на межах класів. Для цілого значення 18–65 включно три-точковий підхід перевіряє 17, 18, 19 та 64, 65, 66; дво-точковий може перевіряти суміжні значення по обидва боки кожної межі. Вибір сусідніх значень залежить від типу даних і правил, наприклад кроку десяткового числа.",
        en: "Defects often occur at partition boundaries. For an integer value 18–65 inclusive, a three-value approach checks 17, 18, 19 and 64, 65, 66; a two-value approach can check adjacent values on both sides of each boundary. Neighboring values depend on the data type and rules, such as the increment for decimals.",
      }),
      { ...mcq(
        "qt-bb3",
        "BVA фокус:",
        "BVA focuses on:",
        ["межі діапазонів (min/max off-by-one)", "тільки mid values", "тільки random strings never edges", "only colors"],
        0,
      ), optionsEn: ["Range boundaries and off-by-one errors", "Only middle values", "Only random strings, never edges", "Only colors"] },
      { ...mcq(
        "qt-bb4",
        "Для цілого віку 18–65 включно приклад три-точкового BVA:",
        "For integer age 18–65 inclusive, an example of three-value BVA is:",
        ["17,18,19,64,65,66 (залежно від правил)", "only 40", "only 0 and 1000000 always", "no numbers"],
        0,
      ), optionsEn: ["17, 18, 19, 64, 65, 66", "Only 40", "Only 0 and 1000000", "No numbers"] },
      matchEx(
        "qt-art-15",
        "Аналіз граничних значень (2-point BVA) для допустимого пароля довжиною 8..20 символів",
        "2-point Boundary values for password length 8..20",
        [
          { left: "Нижня межа / Lower boundary", right: "7 (invalid), 8 (valid)" },
          { left: "Верхня межа / Upper boundary", right: "20 (valid), 21 (invalid)" },
          { left: "Внутрішній представник / Interior representative", right: "14 (valid class)" },
        ],
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
      concept("qt-decision-state-concept", "Правила і переходи", "Rules and transitions", {
        uk: "Таблиця рішень показує комбінації умов і очікувані дії, допомагаючи знайти пропущені правила. Модель переходів описує стани, події, дозволені й недозволені переходи. Наприклад, перевірте оплату замовлення у станах pending і cancelled, включно з очікуваним результатом для кожного.",
        en: "A decision table maps condition combinations to expected actions, helping reveal missing rules. A transition model describes states, events, and valid and invalid transitions. For example, test payment of an order in pending and cancelled states, including the expected outcome for each.",
      }),
      { ...mcq(
        "qt-bb5",
        "Decision table корисна коли:",
        "Decision tables help when:",
        ["багато комбінацій бізнес-правил", "є лише один if", "немає логіки", "only static pages"],
        0,
      ), optionsEn: ["There are combinations of business rules", "There is only one if", "There is no logic", "Only static pages"] },
      { ...mcq(
        "qt-bb6",
        "State transition testing:",
        "State transition testing:",
        ["валідує переходи між станами системи", "ігнорує статуси замовлення", "only CSS :hover", "only DNS TTL"],
        0,
      ), optionsEn: ["Checks transitions between system states", "Ignores order statuses", "Only CSS :hover", "Only DNS TTL"] },
      { ...mcq(
        "qt-art-16",
        "Таблиця прийняття рішень (Decision Table) складається з:",
        "A Decision Table primarily consists of:",
        [
          "Умов (Conditions) та відповідних їм дій (Actions / Rules)",
          "Списку файлів у репозиторії",
          "Помилок компілятора",
          "Графіка відпусток розробників",
        ],
        0,
      ), optionsEn: ["Conditions and corresponding actions or rules", "Repository file names", "Compiler errors", "Developer vacation schedules"] },
    ],
  ),
  lesson(
    "qt-bb-usecase",
    "Use case testing",
    "Use case testing",
    2,
    false,
    [
      concept("qt-usecase-concept", "Сценарії користувача", "User scenarios", {
        uk: "Use case описує мету актора, передумови та взаємодію із системою. Основний сценарій показує типовий успішний шлях; альтернативні й виняткові потоки описують інші умови та збої. На їх основі визначайте тестові дані, кроки й очікуваний результат, не обмежуючись happy path.",
        en: "A use case describes an actor's goal, preconditions, and interactions with the system. The main flow shows a typical successful path; alternative and exception flows describe other conditions and failures. Derive test data, steps, and expected results from them rather than testing only the happy path.",
      }),
      { ...mcq(
        "qt-bb7",
        "Use-case based tests:",
        "Use-case based tests:",
        ["сценарії актора + main/alt flows", "тільки raw SQL dumps", "тільки hex dumps", "only lorem"],
        0,
      ), optionsEn: ["Actor scenarios with main and alternative flows", "Only raw SQL dumps", "Only hex dumps", "Only placeholder text"] },
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
      { ...mcq(
        "qt-art-17",
        "У специфікації Use Case шлях, що описує успішне досягнення мети без збоїв, називається:",
        "In a Use Case, the ideal path where everything succeeds without exceptions is called:",
        [
          "Основний успішний сценарій (Happy path / Basic flow)",
          "Альтернативний сценарій (Alternative flow)",
          "Винятковий сценарій (Exception flow)",
          "Тупиковий шлях",
        ],
        0,
      ), optionsEn: ["Main success scenario (happy path / basic flow)", "Alternative flow", "Exception flow", "Dead end"] },
    ],
  ),
  exam("qt-bb-exam", "Контрольна: чорна скринька", "Exam: black-box testing", 3, [
    { ...mcq("qt-bbe1", "Що робить розбиття на класи еквівалентності?", "What does equivalence partitioning do?", ["Групує значення, які очікувано обробляються подібно", "Перевіряє всі пікселі", "Забороняє автоматизацію", "Перевіряє лише тривале навантаження"], 0), optionsEn: ["Groups values expected to be handled similarly", "Tests every pixel", "Bans automation", "Tests endurance only"] },
    { ...mcq("qt-bbe2", "На яких значеннях зосереджується аналіз меж?", "Which values does boundary analysis focus on?", ["На межах та біля них", "Лише на середніх значеннях", "Завжди лише на null", "Лише на емодзі"], 0), optionsEn: ["At and around boundaries", "Only averages", "Always null only", "Only emoji"] },
    { ...mcq("qt-bbe3", "Що допомагає перевіряти таблиця рішень?", "What does a decision table help test?", ["Комбінації умов і відповідні дії", "Лише один шлях", "Шрифти", "CDN"], 0), optionsEn: ["Combinations of conditions and corresponding actions", "Only one path", "Fonts", "CDN"] },
    { ...mcq("qt-bbe4", "Що перевіряє тестування станів?", "What does state transition testing examine?", ["Стани та допустимі й недопустимі переходи", "Ігнорування станів", "Лише чисті функції", "Лише ключі локалізації"], 0), optionsEn: ["States and valid and invalid transitions", "Ignoring states", "Only pure functions", "Only localization keys"] },
    { ...mcq("qt-bbe5", "На чому зосереджене тестування сценаріїв використання?", "What does use-case testing focus on?", ["Взаємодії актора із системою та її сценаріях", "Лише шістнадцяткових значеннях", "Лише мережевих дампах", "Лише дампах пам'яті"], 0), optionsEn: ["Actor interactions with the system and their flows", "Only hexadecimal values", "Only network captures", "Only core dumps"] },
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
      concept("qt-coverage-concept", "Що вимірює покриття", "What coverage measures", {
        uk: "Statement coverage показує частку виконаних інструкцій за визначенням інструмента; branch coverage — частку виконаних гілок або результатів рішень. Наприклад, if без else може виконати всі наявні інструкції під час true, але залишити false-результат неперевіреним. Покриття допомагає знайти непройдені ділянки, а не оцінює якість перевірок результату.",
        en: "Statement coverage measures the proportion of executed statements according to the tool's definition; branch coverage measures executed branches or decision outcomes. For example, an if without else can execute every existing statement on true while leaving the false outcome untested. Coverage helps find unvisited code, not the quality of assertions.",
      }),
      { ...mcq(
        "qt-wb1",
        "Statement coverage:",
        "Statement coverage:",
        ["% виконаних statements", "% щасливих користувачів", "% зелених кнопок", "% uptime marketing"],
        0,
      ), optionsEn: ["The percentage of executed statements", "The percentage of happy users", "The percentage of green buttons", "Marketing uptime"] },
      { ...mcq(
        "qt-wb2",
        "Branch coverage:",
        "Branch coverage:",
        ["гілки рішень (true/false) ", "лише comments", "лише imports", "лише README"],
        0,
      ), optionsEn: ["Decision branches or outcomes", "Only comments", "Only imports", "Only README"] },
      { ...mcq(
        "qt-art-18",
        "Чим відрізняється Statement Coverage від Branch Coverage?",
        "Difference between Statement Coverage and Branch Coverage?",
        [
          "Statement coverage рахує виконані інструкції; branch coverage — пройдені результати розгалужень",
          "Statement Coverage перевіряє лише назви змінних",
          "Між ними немає жодної різниці",
          "Branch Coverage використовується лише для CSS",
        ],
        0,
      ), optionsEn: ["Statement coverage counts executed statements; branch coverage counts exercised decision outcomes", "Statement coverage checks only variable names", "There is no difference", "Branch coverage is only for CSS"] },
    ],
  ),
  lesson(
    "qt-wb-limits",
    "Межі coverage",
    "Coverage limits",
    3,
    false,
    [
      concept("qt-coverage-limits-concept", "Виконання не дорівнює правильності", "Execution is not correctness", {
        uk: "Навіть 100% покриття обраної метрики означає лише, що інструмент побачив усі її одиниці. Тест може не перевірити результат, пропустити вимогу, інше середовище чи важливе значення. Поєднуйте покриття з аналізом ризиків, перевірками вимог, граничних умов і якості assert.",
        en: "Even 100% coverage of a chosen metric only means the tool observed all units of that metric. A test can omit an assertion, a requirement, another environment, or an important value. Combine coverage with risk analysis and checks of requirements, boundaries, and assertion quality.",
      }),
      { ...mcq(
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
      ), optionsEn: ["The measured lines or branches ran; this does not guarantee no bugs", "The product is perfect", "Requirements no longer need testing", "Security is complete"] },
      { ...mcq(
        "qt-wb4",
        "White-box потребує:",
        "White-box needs:",
        ["доступ/розуміння коду/структури", "лише UI screenshot", "лише брендбук", "лише legal"],
        0,
      ), optionsEn: ["Access to or understanding of code and structure", "Only a UI screenshot", "Only branding guidelines", "Only legal text"] },
      { ...mcq(
        "qt-art-19",
        "Код має 100% Statement Coverage. Чи гарантує це відсутність помилок?",
        "Code has 100% Statement Coverage. Does this guarantee zero bugs?",
        [
          "Ні, 100% покриття рядків не перевіряє пропущені вимоги, граничні значення та стан гонки",
          "Так, це математично доводить бездоганність коду",
          "Так, компілятор блокує будь-які помилки",
          "Гарантує лише для мови JavaScript",
        ],
        0,
      ), optionsEn: ["No: statement coverage can miss requirements, boundary values, and races", "Yes: it mathematically proves perfect code", "Yes: the compiler blocks all errors", "Only for JavaScript"] },
    ],
  ),
  exam("qt-wb-exam", "Контрольна: біла скринька", "Exam: white-box testing", 3, [
    { ...mcq("qt-wbe1", "Що показує покриття інструкцій?", "What does statement coverage measure?", ["Частку інструкцій, виконаних тестами", "Оцінку NPS", "Температуру процесора", "Колір диска"], 0), optionsEn: ["The proportion of statements executed by tests", "NPS", "CPU temperature", "Disk color"] },
    { ...mcq("qt-wbe2", "Що вимірює покриття гілок?", "What does branch coverage measure?", ["Які гілки рішень були виконані", "Лише CSS", "Лише SVG", "Лише відео"], 0), optionsEn: ["Which decision branches were executed", "Only CSS", "Only SVG", "Only video"] },
    { ...mcq("qt-wbe3", "Що доводить 100% покриття інструкцій?", "What does 100% statement coverage establish?", ["Що виміряні інструкції виконувалися, але дефекти все ще можливі", "Що випуск не потребує QA", "Що приймальне тестування не потрібне", "Що ризиків немає"], 0), optionsEn: ["Measured statements executed, but defects may remain", "Release needs no QA", "Acceptance testing is unnecessary", "There is no risk"] },
    { ...mcq("qt-wbe4", "Що використовує тестування білої скриньки?", "What does white-box testing use?", ["Знання внутрішньої структури коду", "Лише чорні екрани", "Лише рекламу", "Лише SEO"], 0), optionsEn: ["Knowledge of the internal code structure", "Only black screens", "Only advertisements", "Only SEO"] },
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
      concept("qt-stlc-concept", "Дії протягом тестового процесу", "Activities in the test process", {
        uk: "Тестовий процес може включати аналіз вимог, планування, дизайн перевірок, підготовку середовища, виконання та підбиття підсумків. На практиці ці дії часто повторюються і перекриваються; артефакти та їхні назви залежать від команди. План описує обсяг і ризики, а результати виконання фіксують спостереження та дефекти.",
        en: "A test process can include requirements analysis, planning, test design, environment preparation, execution, and review. In practice these activities often overlap and repeat; artifacts and their names depend on the team. A plan describes scope and risks, while execution results record observations and defects.",
      }),
      { ...mcq(
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
      ), optionsEn: ["Requirements analysis, planning, test design, setup, execution, and review", "Only deployment", "Only logo design", "Only buying servers"] },
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
      matchEx(
        "qt-art-20",
        "Зіставте фази STLC з їхніми головними вихідними артефактами",
        "Match STLC phases with their deliverables",
        [
          { left: "Планування / Planning", right: "Обсяг, ризики, ресурси / Scope, risks, resources" },
          { left: "Тест-дизайн / Test design", right: "Тест-кейси та дані / Test cases and data" },
          { left: "Виконання / Execution", right: "Результати й звіти про дефекти / Results and defect reports" },
          { left: "Підсумок / Review", right: "Підсумковий звіт / Test summary" },
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
      concept("qt-entry-exit-concept", "Умови початку і завершення", "Entry and exit criteria", {
        uk: "Entry criteria визначають, коли певна тестова діяльність може початися, наприклад доступність тестової збірки та середовища. Exit criteria визначають узгоджені умови завершення: потрібні перевірки, прийнятний залишковий ризик і рішення щодо дефектів. Їх узгоджують для конкретного релізу; відхилення і прийняті ризики потрібно документувати.",
        en: "Entry criteria define when a test activity can start, such as availability of a testable build and environment. Exit criteria define agreed completion conditions: required checks, acceptable residual risk, and defect decisions. Agree them for the particular release and document exceptions and accepted risks.",
      }),
      { ...mcq("qt-st3", "Що може бути вхідним критерієм?", "What can be an entry criterion?", ["Доступні придатна до тестування збірка та середовище", "Лише наявність збою в production", "Відсутність вимог", "Відсутність збірок"], 0), optionsEn: ["A testable build and environment are available", "Only a production outage", "No requirements", "No builds"] },
      { ...mcq("qt-st4", "Що може бути вихідним критерієм?", "What can be an exit criterion?", ["Заплановані перевірки виконано і рішення щодо критичних дефектів узгоджено", "Усі помилки тестів проігноровано", "Документації немає", "Випуск відбувається навмання"], 0), optionsEn: ["Planned checks are complete and critical defect decisions are agreed", "All test failures are ignored", "There is no documentation", "Release happens at random"] },
      { ...mcq("qt-art-21", "Який приклад може бути узгодженим вихідним критерієм для конкретного релізу?", "Which example could be an agreed exit criterion for a particular release?", ["Критичні дефекти виправлено, регресійний прогін успішний і UAT погоджено", "Розробник сказав, що все має працювати", "Пройшло рівно два дні", "У трекері закрито три задачі"], 0), optionsEn: ["Critical defects are fixed, regression passes, and UAT is approved", "A developer says everything should work", "Exactly two days have passed", "Three tracker tasks are closed"] },
    ],
  ),
  lesson(
    "qt-st-shiftleft",
    "Shift-left in process",
    "Shift-left in process",
    2,
    false,
    [
      concept("qt-shiftleft-concept", "Ранній зворотний зв'язок", "Earlier feedback", {
        uk: "Shift-left переносить частину перевірок ближче до виникнення рішення: команда може разом переглянути вимоги, визначити приклади й запустити unit- або API-тести в CI. Це доповнює, а не скасовує інтеграційні перевірки, спостереження та аналіз після релізу.",
        en: "Shift-left moves some checks closer to when decisions are made: a team can review requirements together, define examples, and run unit or API tests in CI. This supplements rather than removes integration checks, monitoring, and analysis after release.",
      }),
      { ...mcq(
        "qt-st5",
        "Shift-left у процесі:",
        "Shift-left in process:",
        ["рев'ю вимог, unit, ранні тести API", "все в останній тиждень", "скасувати CI", "тільки manual after release"],
        0,
      ), optionsEn: ["Review requirements, run unit tests, and test APIs early", "Do everything in the final week", "Cancel CI", "Only manual testing after release"] },
    ],
  ),
  exam("qt-st-exam", "Контрольна: процес тестування", "Exam: testing process", 2, [
    { ...mcq("qt-ste1", "Що описує STLC?", "What does STLC describe?", ["Діяльності протягом життєвого циклу тестування", "Лише написання коду", "Лише продажі", "Лише найм"], 0), optionsEn: ["Activities throughout the testing lifecycle", "Only coding", "Only sales", "Only hiring"] },
    { ...mcq("qt-ste2", "Що визначають під час планування тестування?", "What is addressed during test planning?", ["Обсяг, ризики та ресурси", "Лише шрифти", "Лише меми", "Лише рослини на столах"], 0), optionsEn: ["Scope, risks, and resources", "Only fonts", "Only memes", "Only desk plants"] },
    { ...mcq("qt-ste3", "Для чого визначають вхідні критерії?", "Why define entry criteria?", ["Щоб узгодити умови початку певної діяльності", "Щоб випустити продукт без збірки", "Щоб видалити середовище", "Щоб заборонити QA"], 0), optionsEn: ["To agree on conditions for starting an activity", "To release without a build", "To delete the environment", "To ban QA"] },
    { ...mcq("qt-ste4", "Що описують вихідні критерії?", "What do exit criteria describe?", ["Узгоджені умови завершення діяльності", "Обов'язкове нескінченне тестування", "Ігнорування тяжкості", "Відмову від звіту"], 0), optionsEn: ["Agreed conditions for completing an activity", "Mandatory endless testing", "Ignoring severity", "Skipping reporting"] },
    { ...mcq("qt-ste5", "Що означає shift-left?", "What does shift-left mean?", ["Починати роботу над якістю раніше", "Перевіряти лише наприкінці", "Тестувати лише в production", "Відмовитися від модульних тестів"], 0), optionsEn: ["Start quality work earlier", "Test only at the end", "Test only in production", "Skip unit tests"] },
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
      concept("qt-plan-concept", "План і стратегія", "Plan and strategy", {
        uk: "Стратегія окреслює загальний підхід до якості: рівні, види перевірок і вибір інструментів. План конкретизує обсяг, ризики, ресурси, графік і критерії для певного продукту чи релізу. Явне out of scope допомагає узгодити те, що цього разу не перевірятимуть, і залишкові ризики.",
        en: "A strategy outlines the overall quality approach: test levels, types, and tool choices. A plan specifies scope, risks, resources, schedule, and criteria for a product or release. An explicit out-of-scope section helps align expectations about what will not be checked and the residual risks.",
      }),
      { ...mcq(
        "qt-ar1",
        "Test plan описує:",
        "A test plan describes:",
        ["що/як/коли тестуємо, ресурси, ризики", "лише CSS variables", "лише commit hash", "лише office map"],
        0,
      ), optionsEn: ["What, how, and when to test, plus resources and risks", "Only CSS variables", "Only a commit hash", "Only an office map"] },
      { ...mcq(
        "qt-ar2",
        "Strategy часто відповідає на:",
        "Strategy often answers:",
        ["levels/types/tools/approach", "lunch menu", "desk assignment", "only brand"],
        0,
      ), optionsEn: ["Test levels, types, tools, and approach", "Lunch menu", "Desk assignments", "Only branding"] },
      { ...mcq(
        "qt-art-22",
        "Для чого корисно явно визначити Out of Scope у тест-плані?",
        "Why is it useful to explicitly define Out of Scope in a test plan?",
        [
          "Чіткого окреслення того, що НЕ тестується в межах цієї ітерації для уникнення помилкових очікувань",
          "Списку звільнених співробітників",
          "Паролів до продакшн баз даних",
          "Історії створення мови програмування",
        ],
        0,
      ), optionsEn: ["To clarify what will not be tested in this iteration and avoid false expectations", "To list dismissed employees", "To store production database passwords", "To document programming language history"] },
    ],
  ),
  lesson(
    "qt-ar-cases",
    "Test cases & RTM",
    "Test cases & RTM",
    2,
    false,
    [
      concept("qt-case-concept", "Кейс і трасування вимог", "Test cases and traceability", {
        uk: "Тест-кейс описує умови, дії та очікуваний результат на рівні деталізації, потрібному команді. Postconditions — стан після виконання; очищення даних може бути окремою дією, але не є єдиним можливим postcondition. Матриця трасування пов'язує вимоги з перевірками та допомагає знайти прогалини і оцінити вплив змін.",
        en: "A test case describes conditions, actions, and expected results at the level of detail the team needs. Postconditions describe the state after execution; cleanup can be a separate action but is not the only possible postcondition. A traceability matrix links requirements to checks and helps identify gaps and assess change impact.",
      }),
      { ...mcq(
        "qt-ar3",
        "Добрий test case має:",
        "A good test case has:",
        ["preconditions, steps, expected result", "only actual result empty forever", "only screenshots of cats", "no id"],
        0,
      ), optionsEn: ["Preconditions, steps, and an expected result", "Only an empty actual result forever", "Only cat screenshots", "No identifier"] },
      { ...mcq(
        "qt-ar4",
        "RTM (requirements traceability matrix):",
        "RTM:",
        ["зв'язок вимог ↔ тести", "матриця зарплат", "матриця кольорів", "RAID matrix only"],
        0,
      ), optionsEn: ["Links between requirements and tests", "A salary matrix", "A color matrix", "Only a RAID matrix"] },
      matchEx(
        "qt-art-23",
        "Зіставте можливі частини тест-кейсу з їхнім призначенням",
        "Match possible test-case parts to their purpose",
        [
          { left: "Preconditions", right: "Початкові умови / Starting conditions" },
          { left: "Steps", right: "Дії тестувальника / Test actions" },
          { left: "Expected result", right: "Очікувана поведінка / Expected behavior" },
          { left: "Postconditions", right: "Стан після виконання / State after execution" },
        ],
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
      concept("qt-checklist-concept", "Чек-лист і деталізація", "Checklists and detail", {
        uk: "Чек-лист нагадує про області й умови перевірки без обов'язкового опису кожного кроку. Він зручний досвідченій команді для повторного проходу або дослідження; для складних, критичних чи таких, що потребують аудиту, сценаріїв може знадобитися детальніший тест-кейс з очікуваним результатом.",
        en: "A checklist reminds the tester of areas and conditions to check without necessarily prescribing every step. It can support a team's repeat passes or exploration; complex, critical, or auditable scenarios may need a more detailed test case with expected results.",
      }),
      { ...mcq(
        "qt-ar5",
        "Checklist корисний для:",
        "Checklists help for:",
        ["швидких регресій/exploratory support", "заміни всіх вимог forever", "вимкнення CI", "delete cases"],
        0,
      ), optionsEn: ["Quick regression passes and exploratory support", "Replacing all requirements forever", "Disabling CI", "Deleting test cases"] },
    ],
  ),
  exam("qt-ar-exam", "Контрольна: тестові артефакти", "Exam: test artifacts", 2, [
    { ...mcq("qt-are1", "Що може містити тест-план?", "What can a test plan contain?", ["Обсяг, ризики та ресурси", "Лише жарти", "Лише емодзі", "Лише шпалери"], 0), optionsEn: ["Scope, risks, and resources", "Only jokes", "Only emoji", "Only wallpaper"] },
    { ...mcq("qt-are2", "Що допомагає виконати й оцінити тест-кейс?", "What helps someone execute and evaluate a test case?", ["Передумови та кроки з очікуваним результатом", "Лише порожня назва", "Лише тяжкість дефекту", "Лише виконавець"], 0), optionsEn: ["Preconditions and steps with an expected result", "Only an empty title", "Only defect severity", "Only the assignee"] },
    { ...mcq("qt-are3", "Що може пов'язувати матриця трасування вимог?", "What can a requirements traceability matrix link?", ["Вимоги з тестами", "Людей зі столами", "Кольори зі шрифтами", "Порти з кабелями"], 0), optionsEn: ["Requirements to tests", "People to desks", "Colors to fonts", "Ports to cables"] },
    { ...mcq("qt-are4", "Для чого використовують тестовий чек-лист?", "What is a test checklist used for?", ["Як стислий перелік напрямів перевірки", "Лише як юридичний контракт", "Для компіляції коду", "Як гіпервізор"], 0), optionsEn: ["As a concise list of areas to check", "Only as a legal contract", "To compile code", "As a hypervisor"] },
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
      concept("qt-severity-concept", "Вплив і терміновість", "Impact and urgency", {
        uk: "Severity описує серйозність наслідків дефекту для системи чи користувача; priority — черговість виправлення з урахуванням бізнесу, ризику та обхідних шляхів. Наприклад, друкарська помилка в назві бренду може мати невеликий функціональний вплив, але високий пріоритет перед запуском. Шкали та рішення залежать від команди.",
        en: "Severity describes the seriousness of a defect's impact on the system or user; priority is the order of fixing it, considering business needs, risk, and workarounds. For example, a typo in a brand name can have low functional impact but high priority before launch. Scales and decisions depend on the team.",
      }),
      { ...mcq(
        "qt-df1",
        "Severity — це:",
        "Severity is:",
        ["наскільки сильно впливає на систему/користувача технічно", "порядок у backlog завжди = severity", "колір кнопки", "ім'я гілки"],
        0,
      ), optionsEn: ["The seriousness of impact on the system or user", "Backlog order always equals severity", "Button color", "Branch name"] },
      { ...mcq(
        "qt-df2",
        "Priority — це:",
        "Priority is:",
        ["бізнес-терміновість виправлення", "глибина stack trace only", "кількість CSS classes", "CPU model"],
        0,
      ), optionsEn: ["The urgency or order of fixing", "Only stack-trace depth", "The number of CSS classes", "CPU model"] },
      { ...mcq(
        "qt-df3",
        "Можлива комбінація:",
        "Possible combo:",
        ["low severity + high priority (напр. логотип на проді)", "неможлива never", "only high/high", "only low/low"],
        0,
      ), optionsEn: ["Low severity and high priority, for example a production branding error", "Impossible", "Only high/high", "Only low/low"] },
    ],
  ),
  lesson(
    "qt-df-lifecycle",
    "Defect lifecycle",
    "Defect lifecycle",
    2,
    false,
    [
      concept("qt-defect-lifecycle-concept", "Від повідомлення до рішення", "From report to resolution", {
        uk: "Дефект зазвичай реєструють, оцінюють, призначають, виправляють і перевіряють повторно. Якщо проблема залишається, команда може повернути запис у роботу або створити пов'язаний дефект. Назви статусів, середовища перевірки та умови закриття залежать від процесу команди; не кожен запис обов'язково проходить кожен статус.",
        en: "A defect is commonly reported, triaged, assigned, fixed, and retested. If the problem remains, a team may reopen the record or create a linked defect. Status names, verification environments, and closure rules depend on the team's process; not every record necessarily passes through every status.",
      }),
      { ...mcq(
        "qt-df4",
        "Типові статуси:",
        "Typical statuses:",
        ["new → open → fixed → verified → closed (+ reopen)", "only closed forever at birth", "only draft font", "only merged PR without QA"],
        0,
      ), optionsEn: ["New → open → fixed → verified → closed, with possible reopening", "Only closed from creation", "Only draft font", "Only merged PR without verification"] },
      { ...mcq(
        "qt-df5",
        "Reopen коли:",
        "Reopen when:",
        ["фікс не вирішив / регрес", "тест зелений", "баг не існував і не існує", "docs updated only"],
        0,
      ), optionsEn: ["The fix did not resolve the issue or it recurred", "The test passed", "The issue never existed", "Only documentation changed"] },
      matchEx(
        "qt-art-24",
        "Життєвий цикл дефекту в трекері (Jira/Bugzilla)",
        "Defect lifecycle status transitions",
        [
          { left: "New / Open", right: "Запис очікує оцінки / Report awaits triage" },
          { left: "In Progress", right: "Над дефектом працюють / Work is in progress" },
          { left: "Resolved / Ready for QA", right: "Рішення готове до перевірки / Resolution awaits verification" },
          { left: "Closed", right: "Запис закрито за правилами команди / Record closed under team policy" },
        ],
      ),
    ],
  ),
  lesson(
    "qt-df-report-practice",
    "Bug report practice",
    "Bug report practice",
    2,
    true,
    [
      concept("qt-report-practice-concept", "Зробіть проблему відтворюваною", "Make the issue reproducible", {
        uk: "Короткий заголовок називає дію або компонент і спостережувану проблему. Додайте умови, версію та середовище, послідовні кроки, очікуваний і фактичний результати. Скріншот, журнал або HAR можуть допомогти, але перед передачею вилучіть токени, персональні дані та інші секрети.",
        en: "A concise title names the action or component and the observed problem. Include conditions, version and environment, ordered steps, and expected and actual results. A screenshot, log, or HAR can help, but remove tokens, personal data, and other secrets before sharing.",
      }),
      { ...mcq(
        "qt-df-p1",
        "Мінімум для clear bug title:",
        "Minimum for a clear bug title:",
        [
          "що зламано + де (коротко)",
          "лише «bug»",
          "лише id тікета",
          "тільки emoji",
        ],
        0,
      ), optionsEn: ["What is broken and where, briefly", "Only 'bug'", "Only the ticket ID", "Only emoji"] },
      { ...mcq(
        "qt-df-p2",
        "Steps to reproduce мають бути:",
        "Steps to reproduce should be:",
        [
          "нумеровані, конкретні, відтворювані",
          "одне речення «натисни щось»",
          "тільки скрін без кроків",
          "лише stack trace без UI path",
        ],
        0,
      ), optionsEn: ["Ordered, concrete, and reproducible", "One sentence saying 'click something'", "Only a screenshot without steps", "Only a stack trace without the UI path"] },
      { ...mcq(
        "qt-df-p3",
        "Expected vs Actual:",
        "Expected vs Actual:",
        [
          "очікувана поведінка vs фактична",
          "те саме завжди",
          "лише severity",
          "лише assignee",
        ],
        0,
      ), optionsEn: ["Expected behavior versus observed behavior", "Always the same thing", "Only severity", "Only the assignee"] },
      matchEx(
        "qt-df-p4",
        "Evidence",
        "Evidence",
        [
          { left: "Screenshot", right: "UI state" },
          { left: "HAR / network", right: "API traffic" },
          { left: "Console log", right: "client errors" },
        ],
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
      concept("qt-report-concept", "Контекст і докази", "Context and evidence", {
        uk: "Звіт має допомогти іншій людині відтворити проблему: вкажіть середовище, передумови, кроки, очікуваний і фактичний результат. Докази доповнюють опис, а не замінюють його; прибирайте з вкладень секрети й персональні дані. Якщо відтворення нестабільне, зазначте частоту та умови спостереження.",
        en: "A report should help another person reproduce the issue: provide environment, preconditions, steps, expected result, and actual result. Evidence supplements the description rather than replacing it; remove secrets and personal data from attachments. If reproduction is intermittent, include frequency and observed conditions.",
      }),
      { ...mcq(
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
      ), optionsEn: ["Environment, steps, expected and actual results, and evidence", "Only 'does not work'", "Only a screenshot without context", "Only a severity emoji"] },
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
      { ...mcq(
        "qt-art-25",
        "Артефакт: баг-репорт має заголовок 'Кнопка не працює'. Що в ньому критично бракує?",
        "Artifact: bug report titled 'Button does not work'. What is critically missing?",
        [
          "Конкретного місця (URL/екран), точної назви кнопки, очікуваної поведінки та кроків відтворення",
          "Картинки з котиком",
          "Номеру телефону розробника",
          "Він ідеальний і додаткових деталей не потребує",
        ],
        0,
      ), optionsEn: ["The screen or URL, button, expected behavior, and reproduction steps", "A cat picture", "The developer's phone number", "Nothing; the title is perfect"] },
    ],
  ),
  exam("qt-df-exam", "Контрольна: дефекти", "Exam: defects", 2, [
    { ...mcq("qt-dfe1", "Що описує severity дефекту?", "What does defect severity describe?", ["Тяжкість його впливу", "Лише порядок у спринті", "Настрій виконавця", "Номер столу"], 0), optionsEn: ["The seriousness of its impact", "Only sprint order", "The assignee's mood", "A desk number"] },
    { ...mcq("qt-dfe2", "Що описує priority дефекту?", "What does defect priority describe?", ["Терміновість виправлення", "Лише глибину стеку", "Розмір файлу", "Лише номер рядка"], 0), optionsEn: ["The urgency of fixing it", "Only stack depth", "File size", "Only a line number"] },
    { ...mcq("qt-dfe3", "Що допомагає дослідити баг-репорт?", "What helps investigate a bug report?", ["Умови, кроки та очікуваний і фактичний результати", "Лише назва «помилка»", "Лише повідомлення в чаті", "Лише мем"], 0), optionsEn: ["Conditions, steps, and expected and actual results", "Only the title 'bug'", "Only a chat message", "Only a meme"] },
    { ...mcq("qt-dfe4", "Коли команда може повторно відкрити дефект?", "When might a team reopen a defect?", ["Коли перевірка показала, що виправлення не усунуло проблему", "Завжди після закриття без перевірки", "Лише після успішної перевірки", "Лише після зміни документації"], 0), optionsEn: ["When verification shows the fix did not resolve the issue", "Always after closing without checking", "Only after a successful verification", "Only after a documentation change"] },
    { ...mcq("qt-dfe5", "Який стан зазвичай має щойно зареєстрований дефект?", "What status does a newly reported defect typically have?", ["Новий або відкритий, залежно від процесу команди", "Завжди закритий", "Завжди підтверджено виправлений", "Автоматично проігнорований"], 0), optionsEn: ["New or open, depending on the team's workflow", "Always closed", "Always verified as fixed", "Automatically ignored"] },
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
      concept("qt-pairwise-concept", "Покриття пар", "Pairwise coverage", {
        uk: "Pairwise добирає комбінації так, щоб кожна допустима пара значень двох параметрів зустрілася хоча б раз. Це часто скорочує набір порівняно з повним декартовим добутком, але не покриває всі взаємодії трьох і більше параметрів. Враховуйте неможливі комбінації та додавайте сценарії за ризиком.",
        en: "Pairwise selects combinations so that every valid pair of values from two parameters appears at least once. This often reduces the suite compared with the full Cartesian product, but does not cover all interactions among three or more parameters. Account for invalid combinations and add risk-based scenarios.",
      }),
      { ...mcq(
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
      ), optionsEn: ["Covers parameter-value pairs with fewer combinations than full enumeration often requires", "Always tests all N-way interactions", "Forbids parameters", "Only visual testing"] },
      { ...mcq(
        "qt-ad2",
        "Корисно коли:",
        "Useful when:",
        ["багато незалежних конфігів/флагів", "один boolean", "no inputs", "static text site only"],
        0,
      ), optionsEn: ["Many configuration parameters or flags", "One boolean", "No inputs", "Only a static text page"] },
      { ...mcq(
        "qt-art-26",
        "Яка перевага та межа Pairwise Testing?",
        "What is a benefit and a limitation of pairwise testing?",
        [
          "Покриває допустимі пари значень меншим набором, але не гарантує покриття взаємодій трьох параметрів",
          "Вона повністю замінює автоматизовані тести",
          "Вона працює лише з двома розробниками",
          "Вона автоматично пише код",
        ],
        0,
      ), optionsEn: ["It covers valid value pairs with fewer cases but does not guarantee three-way interaction coverage", "It completely replaces automated tests", "It only works with two developers", "It automatically writes production code"] },
    ],
  ),
  lesson(
    "qt-ad-risk",
    "Risk-based testing",
    "Risk-based testing",
    3,
    false,
    [
      concept("qt-risk-concept", "Ризик і пріоритет перевірок", "Risk and test priority", {
        uk: "Оцінюйте ризик через імовірність проблеми та її наслідки, враховуючи невизначеність, наявні контролі й контекст. Просте probability × impact може допомогти порівнювати оцінки, але не є універсальною точною формулою. Високий ризик зазвичай отримує більше уваги; обсяг перевірок обмежують ресурси та рішення команди.",
        en: "Assess risk using the likelihood of a problem and its consequences, considering uncertainty, existing controls, and context. A simple probability × impact score can help compare estimates, but is not a universally precise formula. Higher risk usually gets more attention; resources and team decisions constrain the test scope.",
      }),
      { ...mcq(
        "qt-ad3",
        "Risk-based testing:",
        "Risk-based testing:",
        ["більше уваги high probability×impact зонам", "рівномірно все always", "ігнорувати critical paths", "only low risk"],
        0,
      ), optionsEn: ["Give more attention to high-likelihood, high-impact areas", "Always test everything equally", "Ignore critical paths", "Only low risk"] },
      { ...mcq(
        "qt-ad4",
        "Ризик оцінюють за:",
        "Risk often combines:",
        ["ймовірність і вплив", "лише колір Jira", "лише довжину title", "лише assignee"],
        0,
      ), optionsEn: ["Likelihood and impact", "Only the Jira color", "Only title length", "Only the assignee"] },
      matchEx(
        "qt-art-27",
        "Розрахунок пріоритету ризику в Risk-Based Testing",
        "Risk Priority calculation in Risk-Based Testing",
        [
          { left: "Risk score", right: "Приклад: імовірність × вплив / Example: likelihood × impact" },
          { left: "Higher risk", right: "Більше уваги за наявних ресурсів / More attention within available resources" },
          { left: "Lower risk", right: "Менша глибина за узгодженим планом / Less depth under an agreed plan" },
        ],
      ),
    ],
  ),
  exam("qt-ad-exam", "Контрольна: техніки та ризики", "Exam: techniques and risks", 3, [
    { ...mcq("qt-ade1", "Для чого використовують попарне тестування?", "What is pairwise testing used for?", ["Для скорочення кількості комбінацій із покриттям допустимих пар значень", "Для відмови від усіх інших перевірок", "Для вимкнення CI", "Для заміни системи контролю версій"], 0), optionsEn: ["To reduce combinations while covering valid pairs of values", "To eliminate all other checks", "To disable CI", "To replace version control"] },
    { ...mcq("qt-ade2", "На чому зосереджується ризик-орієнтоване тестування?", "What does risk-based testing focus on?", ["На ділянках із вищим оціненим ризиком", "Лише на низькоризикових ділянках", "Лише на випадковому виборі", "Лише на документації"], 0), optionsEn: ["Areas with higher assessed risk", "Only low-risk areas", "Only random selection", "Only documentation"] },
    { ...mcq("qt-ade3", "Що часто враховують під час оцінки ризику?", "What is often considered when assessing risk?", ["Ймовірність і вплив", "Розмір шрифту", "Кількість комітів", "Кількість емодзі"], 0), optionsEn: ["Likelihood and impact", "Font size", "Number of commits", "Number of emoji"] },
    { ...mcq("qt-ade4", "Яка мета комбінаторного тестування?", "What is the goal of combinatorial testing?", ["Системно вибирати комбінації значень параметрів", "Завжди перевіряти лише одну комбінацію", "Відмовитися від параметрів", "Заборонити конфігурації"], 0), optionsEn: ["Select parameter combinations systematically", "Always test only one combination", "Avoid parameters", "Ban configurations"] },
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
      concept("qt-automation-concept", "Вибір автоматизації", "Choosing what to automate", {
        uk: "Автоматизація корисна для повторюваних перевірок із цінним і визначеним результатом, наприклад критичного API-контракту. Оцініть частоту запусків, ризик, стабільність інтерфейсу, вартість створення та підтримки. Дослідницька робота і перевірки людьми залишаються важливими там, де потрібне судження.",
        en: "Automation is useful for repeatable checks with valuable, defined outcomes, such as a critical API contract. Consider run frequency, risk, interface stability, and creation and maintenance costs. Exploratory work and human checks remain important where judgment is needed.",
      }),
      { ...mcq(
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
      ), optionsEn: ["Stable, repeatable, high-value checks", "Always one-off exploratory sessions", "Flaky UI checks with no value", "Everything without evaluating value"] },
      { ...mcq(
        "qt-au2",
        "Погані кандидати:",
        "Poor candidates:",
        ["часто мінливий UI без селекторної стратегії", "pure functions with clear API", "API contract stable", "unit math"],
        0,
      ), optionsEn: ["Frequently changing UI without a selector strategy", "Pure functions with a clear API", "A stable API contract", "Unit-level math"] },
      { ...mcq(
        "qt-art-28",
        "Що з переліченого є першочерговим кандидатом на автоматизацію?",
        "What is the top candidate for test automation?",
        [
          "Часті стабільні регресійні тести, перевірка API та тривалі smoke-сьюти",
          "Функціонал, вимоги до якого змінюються щодня",
          "Одноразові дослідницькі перевірки",
          "Візуальний колірний дизайн першого чорнового прототипу",
        ],
        0,
      ), optionsEn: ["Frequent stable regression checks and API checks", "Features whose requirements change daily", "One-off exploratory checks", "The color of an initial visual draft"] },
    ],
  ),
  lesson(
    "qt-au-roi",
    "ROI & pyramid",
    "ROI & pyramid",
    2,
    false,
    [
      concept("qt-automation-roi-concept", "Витрати й користь автоматизації", "Automation costs and benefits", {
        uk: "Порівнюйте витрати на створення, запуск і підтримку тестів із користю: частотою повторень, швидкістю зворотного зв'язку та зменшенням ризику. Оцінка не зводиться лише до заміни ручних хвилин: автоматизація і ручне дослідження можуть виявляти різні проблеми. Переглядайте припущення після змін продукту.",
        en: "Compare the cost of creating, running, and maintaining tests with benefits such as repeat frequency, feedback speed, and risk reduction. The assessment is not only about replacing manual minutes: automation and human exploration can find different problems. Revisit assumptions as the product changes.",
      }),
      { ...mcq(
        "qt-au3",
        "ROI automation враховує:",
        "Automation ROI considers:",
        ["вартість підтримки vs час/ризик ручного", "лише кількість рядків тесту", "лише назву фреймворку", "колір звіту"],
        0,
      ), optionsEn: ["Maintenance cost versus time and risk of manual work", "Only lines of test code", "Only framework name", "Report color"] },
      { ...mcq(
        "qt-au4",
        "Піраміда vs ice cream:",
        "Pyramid vs ice cream:",
        ["піраміда: більше низькорівневих; ice cream — навпаки", "ice cream ideal", "піраміда = 0 unit", "e2e only best always"],
        0,
      ), optionsEn: ["A pyramid has more lower-level checks; an ice-cream shape has more higher-level checks", "Ice cream is always ideal", "A pyramid has zero unit tests", "Only end-to-end is always best"] },
      { ...mcq(
        "qt-art-29",
        "Коли автоматизація може мати позитивну віддачу?",
        "When can test automation have a positive return?",
        [
          "Очікувана користь від повторень, швидкого зворотного зв'язку і зниження ризику перевищує витрати на створення та підтримку",
          "Автотести запущені один раз і більше не запускаються",
          "Усіх тестувальників звільнено",
          "Кількість рядків тестового коду перевищила 10 000",
        ],
        0,
      ), optionsEn: ["Expected benefits from repetition, feedback, and reduced risk exceed creation and maintenance costs", "Tests run once and never again", "All testers are dismissed", "Test code exceeds 10,000 lines"] },
    ],
  ),
  exam("qt-au-exam", "Контрольна: автоматизація", "Exam: automation", 2, [
    { ...mcq("qt-aue1", "Які перевірки є хорошими кандидатами на автоматизацію?", "Which checks are good automation candidates?", ["Стабільні, цінні та повторювані перевірки", "Лише одноразові дослідницькі сесії", "Ніколи перевірки API", "Ніколи модульні тести"], 0), optionsEn: ["Stable, valuable, repeatable checks", "Only one-off exploratory sessions", "Never API checks", "Never unit tests"] },
    { ...mcq("qt-aue2", "Що враховує оцінка віддачі автоматизації?", "What does automation ROI consider?", ["Користь і витрати, зокрема підтримку тестів", "Лише логотип", "Лише робочий стіл", "Лише перекуси"], 0), optionsEn: ["Benefits and costs, including test maintenance", "Only the logo", "Only the desk", "Only snacks"] },
    { ...mcq("qt-aue3", "Що зазвичай показує тестова піраміда?", "What does a test pyramid typically illustrate?", ["Більше швидких низькорівневих перевірок і менше наскрізних", "Лише велику кількість наскрізних UI-тестів", "Відсутність CI", "Лише ручне тестування"], 0), optionsEn: ["More fast lower-level checks and fewer end-to-end checks", "Only a large number of UI end-to-end tests", "No CI", "Only manual testing"] },
    { ...mcq("qt-aue4", "Який наслідок можуть мати численні нестабільні наскрізні тести?", "What can numerous flaky end-to-end tests cause?", ["Зниження довіри до результатів і додаткові витрати на аналіз", "Завжди найкращий результат", "Повну заміну модульних тестів назавжди", "Жодних недоліків"], 0), optionsEn: ["Reduced trust in results and extra investigation costs", "Always the best outcome", "Permanent replacement of unit tests", "No drawbacks"] },
  ]),
]);

const metrics = unit("metrics-risk", "Метрики", "Metrics", [
  lesson(
    "qt-m-passrate",
    "Пастки частки успішних тестів",
    "Pass rate traps",
    2,
    false,
    [
      concept("qt-m-passrate-concept", "Інтерпретація результатів", "Interpreting results", {
        uk: "Частка успішних тестів залежить від вибраних тестів і їхніх перевірок. Сто успішних перевірок не підтверджують роботу оплати, якщо її не тестували. Враховуйте охоплені ризики, пропущені тести та тенденції; нестабільний тест може давати різні результати без змін продукту.",
        en: "The pass rate depends on which tests ran and how they check results. For example, 100 passing checks do not establish that payment works if payment was not tested. Review covered risks, skipped tests, and trends alongside the pass rate; a flaky test can produce different results without a product change.",
      }),
      { ...mcq(
        "qt-m1",
        "Високий pass rate може бути оманливим якщо:",
        "High pass rate can mislead if:",
        ["тести слабкі/застарілі/немає ризикових зон", "завжди означає quality", "замінює UAT always", "гарантує security"],
        0,
      ), optionsEn: ["Tests are weak, outdated, or omit risky areas", "It always proves quality", "It always replaces UAT", "It guarantees security"] },
      { ...mcq(
        "qt-m2",
        "Краще дивитись також:",
        "Also watch:",
        ["Пропущені дефекти, тенденції тяжкості та нестабільність тестів", "Лише відсоток успіху", "Лише рядки коду тестів", "Лише зірки"],
        0,
      ), optionsEn: ["Escaped defects, severity trends, and flaky test rate", "Only the pass percentage", "Only lines of test code", "Only stars"] },
      { ...mcq(
        "qt-art-30",
        "Чому звіт '100% Pass Rate' може бути оманливим (vanity metric)?",
        "Why can a '100% Pass Rate' report be a dangerous vanity metric?",
        [
          "Тести можуть бути застарілими, перевіряти тривіальні речі або мати відключені асерти",
          "100% завжди означає відсутність багів",
          "Тому що відсотки не використовуються в IT",
          "Браузер не показує зелені галочки",
        ],
        0,
      ), optionsEn: ["Tests may be outdated, trivial, or have disabled assertions", "100% always means there are no bugs", "Percentages are not used in IT", "The browser cannot show green check marks"] },
    ],
  ),
  lesson(
    "qt-m-escaped",
    "Пропущені дефекти",
    "Escaped defects",
    2,
    false,
    [
      concept("qt-m-escaped-concept", "Визначення і межі метрики", "Defining the metric and its limits", {
        uk: "Пропущений дефект виявляють після узгодженого контрольного етапу, наприклад релізу. Заздалегідь визначте період, етап і набір дефектів: наприклад, дефекти після релізу поділіть на всі знайдені дефекти тієї самої версії. Оцінюйте показник разом із тяжкістю й контекстом.",
        en: "An escaped defect is discovered after an agreed checkpoint, such as release. Define the period, checkpoint, and included defects before calculating a rate: for example, post-release defects divided by all defects for the same release. Interpret it alongside severity and context; a change in report count alone does not prove a change in quality.",
      }),
      { ...mcq(
        "qt-m3",
        "Що таке пропущений дефект?",
        "What is an escaped defect?",
        ["Дефект, виявлений після узгодженого контрольного етапу", "Будь-який невдалий модульний тест", "Нестабільний тест", "Коментар TODO"],
        0,
      ), optionsEn: ["A defect discovered after the agreed checkpoint", "Any failed unit test", "A flaky test", "A TODO comment"] },
      { ...mcq(
        "qt-m4",
        "Яка мета аналізу пропущених дефектів?",
        "What is the goal of escaped defect analysis?",
        ["Покращити процес і покриття ризиків", "Звинуватити випадкову людину", "Вимкнути моніторинг", "Видалити журнали"],
        0,
      ), optionsEn: ["Improve the process and risk coverage", "Blame a random person", "Disable monitoring", "Delete logs"] },
      { ...mcq(
        "qt-art-31",
        "Команда визначила Defect Escape Rate як частку дефектів версії, знайдених після релізу. Яка формула відповідає цьому визначенню?",
        "A team defines Defect Escape Rate as the share of a release's defects found after release. Which formula matches this definition?",
        [
          "(Дефекти версії, знайдені після релізу / усі знайдені дефекти тієї самої версії) * 100%",
          "Кількість тестів * час прогону",
          "Рядки коду / кількість комітів",
          "Кількість випитої кави",
        ],
        0,
      ), optionsEn: ["(Defects found after release / all defects found for the same release) * 100%", "Number of tests * execution time", "Lines of code / number of commits", "Cups of coffee consumed"] },
    ],
  ),
  exam("qt-m-exam", "Контрольна: метрики", "Exam: metrics", 2, [
    { ...mcq("qt-me1", "Що можна сказати про саму лише частку успішних тестів?", "What can be said about the pass rate alone?", ["Вона може вводити в оману без контексту", "Вона доводить бездоганну якість", "Вона доводить безпеку", "Вона доводить зручність інтерфейсу"], 0), optionsEn: ["It can mislead without context", "It proves perfect quality", "It proves security", "It proves usability"] },
    { ...mcq("qt-me2", "Коли дефект вважають пропущеним?", "When is a defect considered escaped?", ["Коли його виявлено після узгодженого контрольного етапу", "Коли не пройшов будь-який модульний тест", "Коли написано TODO", "Коли створено запис у журналі"], 0), optionsEn: ["When it is found after the agreed checkpoint", "When any unit test fails", "When a TODO is written", "When a log entry is created"] },
    { ...mcq("qt-me3", "Які сигнали корисно аналізувати разом?", "Which signals are useful to analyze together?", ["Тяжкість дефектів, нестабільність тестів і пропущені дефекти", "Лише відсоток успіху", "Лише кількість помилок без контексту", "Лише емодзі у звіті"], 0), optionsEn: ["Defect severity, flaky tests, and escaped defects", "Only the pass percentage", "Only the error count without context", "Only report emoji"] },
    { ...mcq("qt-me4", "Для чого команді використовувати метрики?", "What should a team use metrics for?", ["Для вдосконалення процесу з урахуванням контексту", "Лише для пошуку винних", "Для приховування проблем", "Для видалення тестів"], 0), optionsEn: ["To improve the process with context", "Only to assign blame", "To hide problems", "To delete tests"] },
  ]),
]);

const appliedQaScenarios = unit(
  "applied-qa-scenarios",
  "Сценарії та артефакти QA",
  "Applied QA Scenarios & Artifacts",
  [
    lesson(
      "qa-scen-bug-report-audit",
      "Аудит та рев'ю баг-репортів",
      "Bug report audit & quality triage",
      3,
      false,
      [
        concept("qa-scen-triage-concept", "Рішення з урахуванням контексту", "Context-aware triage", {
          uk: "Оцінюйте тяжкість впливу та пріоритет окремо: враховуйте підтримувані платформи, користувачів, обхідні шляхи і терміни. Для нестабільного дефекту запишіть умови та кількість відтворень із загальної кількості спроб. Долучайте доступні докази, видаливши секрети та персональні дані.",
          en: "Assess impact severity and fix priority separately: the decision depends on supported platforms, users, workarounds, and timing. For an intermittent defect, record conditions and successful reproductions out of total attempts; attach available evidence after removing secrets and personal data.",
        }),
        { ...mcq(
          "qa-scen-1",
          "Артефакт рев'ю: Баг-репорт має Severity: Blocker, але відтворюється лише в IE11, підтримка якого офіційно припинена. Яке рішення правильне?",
          "Review artifact: Bug has Severity: Blocker, but only on unsupported IE11. Correct triage decision:",
          [
            "Знизити Priority до Low або закрити як 'Won't Fix' згідно з матрицею підтримки браузерів",
            "Негайно зупинити реліз і розбудити розробників вночі",
            "Переписати весь фронтенд на React 15",
            "Видалити баг-репорт без коментарів",
          ],
          0,
        ), optionsEn: ["Lower the priority or close as won't fix according to the browser support policy", "Stop the release immediately and wake the developers", "Rewrite the entire frontend in React 15", "Delete the report without comment"] },
        matchEx(
          "qa-scen-2",
          "Зіставте Severity (тяжкість технічного впливу) та Priority (терміновість виправлення)",
          "Match Severity vs Priority",
          [
            { left: "High Severity, High Priority", right: "Падіння платіжного шлюзу на продакшні / Production payment gateway failure" },
            { left: "High Severity, Low Priority", right: "Крах рідкісного експорту даних, яким користуються раз на рік / Failure of a rarely used annual data export" },
            { left: "Low Severity, High Priority", right: "Помилка в назві компанії на головному логотипі сайту / Company name misspelled in the main site logo" },
            { left: "Low Severity, Low Priority", right: "Незначне зміщення кнопки на 1 піксель у футері / One-pixel footer button misalignment" },
          ],
        ),
        { ...mcq(
          "qa-scen-2b",
          "Критерій якісного Steps to Reproduce: якщо баг плаваючий (flaky/intermittent), що потрібно зазначити?",
          "Intermittent bug report criterion: what should be explicitly stated?",
          [
            "Частоту відтворюваності (наприклад, 3 з 10 спроб) та логи сесії / HAR-файл",
            "Заборонити реліз назавжди",
            "Написати 'іноді не працює' без жодних логів",
            "Видалити фічу",
          ],
          0,
        ), optionsEn: ["Reproduction frequency (such as 3 out of 10 attempts), conditions, and available sanitized evidence", "Ban the release forever", "Write sometimes broken without any evidence", "Remove the feature"] },
      ],
    ),
    lesson(
      "qa-scen-boundary-matrix-design",
      "Проєктування граничних значень",
      "Boundary matrix & decision table design",
      3,
      false,
      [
        concept("qa-scen-boundary-concept", "Визначте правила перед перевіркою", "Define the rules before testing", {
          uk: "Випишіть діапазони, включеність меж і точність введення. Для суми з точністю до копійки перевіряйте межу та значення на копійку по обидва боки, якщо вони допустимі. Окремо перевіряйте недопустимі значення та уточнюйте, чи знижки сумуються.",
          en: "Write down ranges, inclusive boundaries, and input precision. For amounts measured to one kopeck, test the boundary and one kopeck on either side when valid. Test invalid inputs separately and clarify whether discounts are cumulative.",
        }),
        matchEx(
          "qa-scen-3",
          "Сума вводиться з точністю до копійки. До 1000 грн знижки немає, від 1000 до 4999,99 грн — 10%, від 5000 грн — 20%; знижки не сумуються. Зіставте межі та значення:",
          "Amounts use kopeck precision. Below 1000 UAH the discount is 0%, from 1000 to 4999.99 it is 10%, and from 5000 it is 20%; discounts do not stack. Match boundaries and values:",
          [
            { left: "Межа 1000 грн / 1000 UAH boundary", right: "999.99 грн (0%) та / and 1000.00 грн (10%)" },
            { left: "Межа 5000 грн / 5000 UAH boundary", right: "4999.99 грн (10%) та / and 5000.00 грн (20%)" },
            { left: "Вище 5000 грн / Above 5000 UAH", right: "5000.01 грн (20%)" },
          ],
        ),
        { ...mcq(
          "qa-scen-4",
          "Чому помилка Off-by-one (на одиницю більше або менше) може виникнути в циклах і граничних умовах?",
          "Why can an 'off-by-one' error occur in loop and boundary checks?",
          [
            "Через плутанину між строгими (<, >) та нестрогими (<=, >=) операторами порівняння",
            "Тому що процесор рахує двійковими числами",
            "Через неправильне вирівнювання пам'яті",
            "Це трапляється лише в мові Python",
          ],
          0,
        ), optionsEn: ["Confusing strict (<, >) and inclusive (<=, >=) comparisons", "The processor uses binary numbers", "Incorrect memory alignment", "It only happens in Python"] },
        { ...mcq(
          "qa-scen-4b",
          "Для поля віку 1..120 років скільки точок перевіряє триточкова техніка 3-point BVA на нижній межі (1)?",
          "For age field 1..120, how many values are tested by 3-point BVA at boundary (1)?",
          [
            "3 значення: 0 (just below), 1 (on boundary), 2 (just above)",
            "Лише 1 значення (1)",
            "10 значень",
            "Всі числа до 100",
          ],
          0,
        ), optionsEn: ["Three values: 0 (below), 1 (on), and 2 (above the boundary)", "Only one value (1)", "Ten values", "Every number up to 100"] },
      ],
    ),
    lesson(
      "qa-scen-api-test-matrix",
      "Тест-дизайн REST API",
      "REST API status & contract test matrix",
      3,
      false,
      [
        concept("qa-scen-api-contract-concept", "Контракт і поведінка API", "API contract and behavior", {
          uk: "Перевіряйте статуси, заголовки й тіло відповіді за контрактом конкретного API. Для подібних помилок різні контракти можуть визначати різні коди, наприклад 400 або 422. Ідемпотентність означає однаковий запланований ефект повторних ідентичних запитів, а не обов’язково однакову відповідь. POST не гарантує створення ресурсу в кожній реалізації.",
          en: "Test status codes, headers, and response bodies against the specific API contract, including errors and access control. The same class of error may use different codes depending on the contract, such as 400 or 422 for invalid input. Idempotency means repeated identical requests have the same intended effect, not necessarily the same response; POST itself guarantees neither resource creation nor non-idempotent behavior in every implementation.",
        }),
        matchEx(
          "qa-scen-5",
          "За контрактом цього API зіставте статуси зі сценаріями: 400 — невалідна JSON-схема, 401 — відсутня або прострочена автентифікація, 403 — недостатньо прав, 409 — наявний email, 422 — семантична помилка.",
          "For this API contract, match codes to scenarios: 400 for invalid JSON schema, 401 for missing or expired authentication, 403 for insufficient permissions, 409 for an existing email, and 422 for a semantic error.",
          [
            { left: "400 Bad Request", right: "Тіло запиту не відповідає валідній JSON-схемі / Request body fails JSON schema validation" },
            { left: "401 Unauthorized", right: "Запит без токена автентифікації або з простроченим токеном / Request has a missing or expired authentication token" },
            { left: "403 Forbidden", right: "Користувач залогінений, але не має прав доступу (RBAC) / Authenticated user lacks permission" },
            { left: "409 Conflict", right: "Спроба зареєструвати email, який уже існує в базі / Attempt to register an existing email" },
            { left: "422 Unprocessable Entity", right: "Семантична помилка валідації бізнес-полів / Semantic validation error in business fields" },
          ],
        ),
        { ...mcq(
          "qa-scen-6",
          "Артефакт: API документація Swagger. Що необхідно перевірити крім відповіді 200 OK?",
          "Artifact: Swagger API doc. What must be tested besides 200 OK?",
          [
            "Валідацію заголовків, таймаути, граничні довжини рядків та формати помилок 4xx/5xx",
            "Лише колір кнопки у Swagger UI",
            "Чи працює Swagger у темній темі",
            "Швидкість друку автора документації",
          ],
          0,
        ), optionsEn: ["Headers, timeouts, string length boundaries, and 4xx/5xx error formats", "Only the button color in Swagger UI", "Whether Swagger has a dark theme", "The documentation author's typing speed"] },
        { ...mcq(
          "qa-scen-6b",
          "Чим за стандартом HTTP відрізняється ідемпотентний метод PUT від POST?",
          "Standard HTTP difference between idempotent PUT and POST?",
          [
            "Повторні ідентичні PUT мають той самий запланований ефект, що й один запит; POST не визначений стандартом як ідемпотентний",
            "PUT завжди видаляє дані",
            "POST не підтримує тіло JSON",
            "PUT не повертає HTTP статус",
          ],
          0,
        ), optionsEn: ["Repeated identical PUT requests have the same intended effect as one; POST is not defined as idempotent by the standard", "PUT always deletes data", "POST cannot carry a JSON body", "PUT does not return an HTTP status"] },
      ],
    ),
    exam(
      "qa-scen-exam",
      "Екзамен: прикладний QA-аналіз",
      "Exam: applied QA scenario analysis",
      3,
      [
        { ...mcq(
          "qa-scen-7",
          "Яка головна мета перевірки відтворюваності бага (Steps to Reproduce) перед передачею в розробку?",
          "Main goal of verifying reproducible steps before submitting bug report?",
          [
            "Допомогти команді відтворити та дослідити проблему за вказаних умов",
            "Збільшити обсяг документації",
            "Потренувати навички друку",
            "Відкласти виправлення на наступний місяць",
          ],
          0,
        ), optionsEn: ["Help the team reproduce and investigate the problem under the stated conditions", "Increase documentation volume", "Practice typing", "Postpone the fix until next month"] },
        matchEx(
          "qa-scen-8",
          "Зіставте критерії тестування",
          "Match testing criteria",
          [
            { left: "Idempotency", right: "Повторні ідентичні запити мають той самий запланований ефект, що й один / Repeated identical requests have the same intended effect as one" },
            { left: "Flaky test", right: "Тест дає різні результати без відповідних змін продукту / A test gives inconsistent results without relevant product changes" },
            { left: "Regression", right: "Зміна порушує функціональність, що працювала раніше / A change breaks previously working behavior" },
          ],
        ),
        { ...mcq(
          "qa-scen-9",
          "Коли тестування можна вважати завершеним?",
          "When can testing be considered complete?",
          [
            "Коли виконано узгоджені Exit Criteria та ризики знижено до прийнятного рівня",
            "Коли знайдено рівно 100 багів",
            "Коли закінчився робочий день",
            "Коли програміст сказав, що все добре",
          ],
          0,
        ), optionsEn: ["Agreed exit criteria are met and remaining risks are acceptable", "Exactly 100 bugs have been found", "The workday is over", "A developer says everything is fine"] },
        matchEx(
          "qa-scen-10",
          "Зіставте типи очікуваних результатів",
          "Match expected result types",
          [
            { left: "UI Feedback", right: "Зміна кольору, показ банера, стан фокусу / Color change, banner display, focus state" },
            { left: "Data Persistence", right: "Збереження запису в БД без спотворення / Record saved without corruption" },
            { left: "API Response", right: "HTTP статус та валідне JSON тіло / HTTP status and valid JSON body" },
          ],
        ),
      ],
    ),
  ],
);

const riskPlansRequirements = unit(
  "risk_plans_requirements",
  "Вимоги, ризик-аналіз, тест-план і баг-репорт для ForgeBoard",
  "Requirements, Risk Assessment, Test Plans & Reproducible Bug Reports",
  [
    lesson(
      "qt-req-risk-plan",
      "Від вимог і ризиків до конкретного тест-плану",
      "From written requirements & risk matrix to a test plan",
      3,
      false,
      [
        concept("qt-rpr-plan-concept", "Від вимог до перевірок", "From requirements to checks", {
          uk: "Розкладіть вимогу на перевірні правила, визначте можливий вплив і ймовірність порушення та узгодьте пріоритети. Для доступу до задач підготуйте щонайменше двох користувачів і перевірте спробу змінити чужу задачу через інтерфейс та API. Зафіксуйте межі заголовка, середовище, критерії завершення та залишкові ризики.",
          en: "Break the requirement into testable rules, assess the potential impact and likelihood of failure, and agree on priorities. For task access, prepare at least two users and test an attempt to modify another user's task through the UI and API. Record title boundaries, environment, exit criteria, and remaining risks.",
        }),
        { ...mcq(
          "qt-rpr1",
          "Вимога ForgeBoard: «Користувач може редагувати лише власні задачі; заголовок 1..120 символів». Який ризик має найвищий пріоритет у тест-плані?",
          "Requirement: 'Users can edit only their own tasks; title 1..120 chars.' Which risk gets top priority in the test plan?",
          [
            "Порушення доступу (IDOR: інший користувач змінює чужу задачу) та пошкодження даних при граничній довжині",
            "Колір іконки олівця на кнопці редагування",
            "Шрифт у футері",
            "Розмір favicon",
          ],
          0,
          why(
            "Ризик-орієнтований тест-план ставить у пріоритет безпеку (authz) і цілісність даних.",
            "Risk-based test planning prioritizes authorization boundaries and data integrity first.",
          ),
        ), optionsEn: ["Unauthorized edits to another user’s task and data corruption at title boundaries", "Color of the edit icon", "Footer font", "Favicon size"] },
        matchEx(
          "qt-rpr2",
          "Зіставте секцію тест-плану з її конкретним змістом для ForgeBoard",
          "Match test plan section to concrete ForgeBoard content",
          [
            { left: "Scope / In-scope", right: "CRUD задач, фільтрація, перевірка власника (401/403) / Task CRUD, filtering, ownership checks (401/403)" },
            { left: "Test data / Fixtures", right: "Користувач A (власник), користувач B, межові заголовки 0/1/120/121 / User A (owner), user B, title boundaries 0/1/120/121" },
            { left: "Exit criteria", right: "Усі high-risk authz та API/UI регресійні перевірки зелені / All high-risk authorization and API/UI regression checks pass" },
          ],
        ),
        codeOrderAuto(
          "qt-rpr3",
          "Послідовність створення відтворюваного баг-репорту",
          "Sequence for writing a reproducible bug report",
          "text",
          [
            "Зафіксувати середовище: версію, браузер, ОС, роль / Record environment: version, browser, OS, role",
            "Надати передумови та кроки відтворення / Provide preconditions and reproduction steps",
            "Порівняти очікуваний і фактичний результат / Compare expected and actual results",
            "Вказати тяжкість, вплив і регресійний кейс / Record severity, impact, and a regression case",
          ],
          why(
            "Кроки та порівняння очікуваного і фактичного результатів допомагають дослідити дефект.",
            "Reproduction steps and expected versus actual results help the team investigate the defect.",
          ),
        ),
      ],
    ),
    exam("qt-rpr-exam", "Контрольна: ризик-планування та баг-репорти", "Exam: test strategy & bug reports", 3, [
      { ...mcq(
        "qt-rpre1",
        "Чим вимірюється якість тест-плану перед початком автоматизації?",
        "What makes a test plan actionable before writing automated tests?",
        [
          "Пряма трасованість до вимог, матриця ризиків (impact × likelihood) та чіткі вхідні/вихідні критерії",
          "Кількість кольорів у таблиці",
          "Перелік усіх бібліотек із package.json",
          "Заборона будь-яких негативних кейсів",
        ],
        0,
        why("Трасованість і оцінка ризиків допомагають зосередити перевірки на критичних шляхах, але не гарантують повноти.", "Requirements traceability and risk ranking focus effort on critical paths."),
      ), optionsEn: ["Traceability to requirements, risk assessment, and clear entry and exit criteria", "Number of colors in the table", "A list of every package.json library", "A ban on negative cases"] },
      { ...mcq(
        "qt-rpre2",
        "Яка інформація в баг-репорті критична для діагностики міжфронтового збою?",
        "Which evidence in a bug report best narrows a cross-stack failure?",
        [
          "HTTP статус + payload помилки з Network tab та `requestId` серверного логу поряд із кроками відтворення",
          "Лише фраза «кнопка не працює»",
          "Тільки версія Node без кроків",
          "Порожній скріншот робочого столу",
        ],
        0,
        why("Зв'язок UI-дії з HTTP-відповіддю й `requestId` допомагає звузити пошук причини.", "Pairing UI steps with HTTP status and `requestId` helps narrow the investigation."),
      ), optionsEn: ["HTTP status and error payload, request ID, and reproduction steps", "Only “the button does not work”", "Only the Node version without steps", "A blank desktop screenshot"] },
      { ...mcq(
        "qt-rpre3",
        "Вимога: «пошук не враховує регістр, ігнорує пробіли по краях, а порожній запит показує весь список». Які кейси перевіряють ці правила?",
        "Requirement: 'search is case-insensitive, trims outer whitespace, and shows the full list for an empty query.' Which cases verify these rules?",
        [
          "`'  Login  '` знаходить `'Fix login bug'`, а порожній запит `'   '` показує весь список",
          "Перевіряти лише `'a'` 50 разів",
          "Пропускати пробіли в тестах",
          "Перевіряти тільки колір інпуту",
        ],
        0,
        why("Обидві поведінкові умови (регістр + trim + порожній стан) перевіряються двома точними кейсами.", "Testing case folding, whitespace trim, and empty-input reset covers the contract cleanly."),
      ), optionsEn: ["'  Login  ' finds 'Fix login bug' and a whitespace-only query shows the full list", "Test only 'a' fifty times", "Skip whitespace tests", "Only check input color"] },
      { ...mcq(
        "qt-rpre4",
        "Чому в одному середовищі з'являється баг «іноді зникає задача після швидкого пошуку»? Що має додати QA у репорт?",
        "An intermittent bug drops task rows during fast typing. What should QA include in the bug report?",
        [
          "Таймінг (швидкий послідовний ввід 2 запитів), мережевий запис (Network waterfall) та спостереження, що 1-й повільний запит перекрив 2-й",
          "Перезавантажити комп'ютер і не реєструвати",
          "Вказати severity Low без кроків",
          "Припустити, що винен DNS",
        ],
        0,
        why("Для race conditions ключовими є послідовність подій та порядок відповідей у мережі.", "Concurrency/race bugs require capturing event timing and response ordering."),
      ), optionsEn: ["Timing, network trace, and observed response order", "Restart the computer and do not report it", "Set low severity without steps", "Assume DNS is to blame"] },
    ]),
  ],
);

const capstone = unit("capstone", "Підсумковий кейс", "Capstone case", [
  lesson(
    "qt-cap-feature",
    "Кейс: нове оформлення замовлення",
    "Case: new checkout",
    3,
    false,
    [
      concept("qt-cap-checkout-concept", "План перевірки оформлення", "Planning checkout checks", {
        uk: "Почніть із вимог і наслідків помилки: перевірте ціну, оплату, доступ і залишки. Розподіліть перевірки між модульними, інтеграційними та наскрізними тестами, доповніть їх дослідницьким тестуванням. Узгодьте критерії випуску та рішення щодо залишкових ризиків із командою.",
        en: "For a new checkout, start with requirements and the consequences of failure: examine price calculation, payment, access, and stock. Distribute checks across fast unit tests, integration tests, and a critical end-to-end path, supplemented by exploratory testing. Agree on release criteria and decisions about residual risks with the team.",
      }),
      { ...mcq("qt-c1", "Які зони оформлення потенційно високоризикові?", "Which checkout areas should be considered potentially high risk?", ["Оплата, доступ, розрахунок ціни та залишки", "Лише колір футера", "Лише favicon", "Лише сторінка про компанію"], 0), optionsEn: ["Payment, access, price calculation, and stock", "Only footer color", "Only the favicon", "Only the about page"] },
      { ...mcq("qt-c2", "Яке поєднання дає корисний початковий набір перевірок?", "Which combination provides a useful starting set of checks?", ["Модульні тести розрахунку, інтеграція API і критичний наскрізний сценарій", "Один ручний клік назавжди", "Лише навантажувальне тестування", "Лише перевірка доступності"], 0), optionsEn: ["Calculation unit tests, API integration, and a critical end-to-end path", "One manual click forever", "Only load testing", "Only accessibility testing"] },
      { ...mcq("qt-c3", "Які техніки допоможуть перевірити допустиму суму від 1 до 1000 включно?", "Which techniques help test an allowed order total from 1 through 1000 inclusive?", ["Класи еквівалентності та граничні значення", "Лише скріншот", "Лише перевірка правопису", "Лише ping"], 0), optionsEn: ["Equivalence partitioning and boundary value analysis", "Only a screenshot", "Only spellchecking", "Only ping"] },
      { ...mcq("qt-c4", "Який приклад узгоджених критеріїв завершення тестування перед випуском?", "Which is an example of agreed testing exit criteria before release?", ["Критичні дефекти закрито, а димові перевірки пройшли", "Будь-які критичні дефекти автоматично прийнятні", "Тести не запускалися", "Випуск відбувається навмання"], 0), optionsEn: ["Critical defects are closed and smoke checks pass", "Any critical defects are automatically acceptable", "No tests were run", "Release happens at random"] },
    ],
  ),
  exam("qt-cap-exam", "Фінальна контрольна QA", "Final QA exam", 3, [
    { ...mcq("qt-ce1", "Яке твердження відображає принципи тестування?", "Which statement reflects testing principles?", ["Вичерпне тестування зазвичай неможливе", "Перевіряти все завжди дешево", "Дефекти ніколи не групуються", "Раннє тестування не потрібне"], 0), optionsEn: ["Exhaustive testing is usually impossible", "Testing everything is always cheap", "Defects never cluster", "Early testing is unnecessary"] },
    { ...mcq("qt-ce2", "Які тести зазвичай переважають в основі тестової піраміди?", "Which tests usually form the base of the test pyramid?", ["Швидкі модульні тести", "Лише наскрізні тести", "Жодних автоматизованих тестів", "Лише випадкові ручні перевірки"], 0), optionsEn: ["Fast unit tests", "Only end-to-end tests", "No automated tests", "Only ad hoc manual checks"] },
    { ...mcq("qt-ce3", "На чому зосереджений аналіз граничних значень?", "What does boundary value analysis target?", ["На значеннях біля меж", "Лише на середині діапазону", "Лише на шрифті інтерфейсу", "Лише на DNS"], 0), optionsEn: ["Values around boundaries", "Only the middle of a range", "Only the UI font", "Only DNS"] },
    { ...mcq("qt-ce4", "Що описують severity та priority відповідно?", "What do severity and priority describe, respectively?", ["Тяжкість впливу та терміновість виправлення", "Завжди одне й те саме", "Лише виконавця", "Лише спринт"], 0), optionsEn: ["Impact severity and urgency of a fix", "Always the same thing", "Only the assignee", "Only the sprint"] },
    { ...mcq("qt-ce5", "Що допомагає дослідити дефект?", "What helps investigate a defect?", ["Кроки, очікуваний і фактичний результат", "Лише слово «зламано»", "Лише емоційна оцінка", "Лише severity"], 0), optionsEn: ["Steps, expected result, and actual result", "Only the word broken", "Only an emotional reaction", "Only severity"] },
    { ...mcq("qt-ce6", "Що враховує оцінка автоматизації?", "What does an automation assessment consider?", ["Користь і витрати на створення та підтримку", "Сліпу автоматизацію всього", "Заборону автоматизації API", "Заборону модульних тестів"], 0), optionsEn: ["Benefits and costs of creation and maintenance", "Blindly automating everything", "Banning API automation", "Banning unit tests"] },
    { ...mcq("qt-ce7", "Що таке пропущений дефект?", "What is an escaped defect?", ["Дефект, виявлений після узгодженого контрольного етапу", "Успішний модульний тест", "TODO", "Коментар"], 0), optionsEn: ["A defect found after an agreed checkpoint", "A passing unit test", "A TODO", "A comment"] },
    { ...mcq("qt-ce8", "Що означає shift-left у тестуванні?", "What does shift-left mean in testing?", ["Починати дії із забезпечення якості раніше", "Перевіряти лише наприкінці", "Перевіряти лише в production", "Відмовитися від рев’ю"], 0), optionsEn: ["Start quality activities earlier", "Test only at the end", "Test only in production", "Skip reviews"] },
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
    appliedQaScenarios,
    riskPlansRequirements,
    capstone,
  ],
};
