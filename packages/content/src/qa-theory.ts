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
          "лише друкарська помилка в інтерфейсі, але ніколи логічна",
          "успішне розгортання",
        ],
        0,
        why("Дефект може бути в коді, вимогах або іншому артефакті й не обов'язково спричиняє збій у кожному запуску.", "A defect can be in code, requirements, or another artifact and does not necessarily cause a failure on every run."),
      ), optionsEn: ["A defect is a flaw that can lead to behavior differing from expectations", "Always a server crash", "Only a UI typo, never logic", "A successful deployment"] },
      { ...mcq(
        "qt-f3",
        "Чим відрізняється збій (failure) від дефекту (fault)?",
        "Failure vs fault:",
        [
          "збій — спостережувана неправильна поведінка; дефект — недолік в артефакті",
          "це завжди одне й те саме",
          "збої можливі лише в CSS",
          "дефекти можливі лише в маркетингу",
        ],
        0,
        why("Дефект може проявитися як збій за певних умов, але не кожен дефект проявляється в кожному сценарії.", "A defect may manifest as a failure under certain conditions, but not in every scenario."),
      ), optionsEn: ["A failure is observed incorrect behavior; a fault is a defect in an artifact", "They always mean the same thing", "Failure only occurs in CSS", "Fault only occurs in marketing"] },
    ],
  ),
  lesson(
    "qt-vv",
    "Верифікація та валідація",
    "Verification vs Validation",
    2,
    true,
    [
      concept("qt-vv-concept", "Перевірка відповідності та придатності", "Verification and validation", {
        uk: "Верифікація (verification) перевіряє відповідність артефакту визначеним вимогам: наприклад, огляд специфікації або тест розрахунку за формулою. Валідація (validation) оцінює, чи придатний продукт для реальних потреб і контексту користувача: наприклад, випробування процесу з користувачами. Обидва види діяльності можуть включати різні методи та виконуватися протягом життєвого циклу.",
        en: "Verification checks whether an artifact conforms to specified requirements, for example by reviewing a specification or testing a calculation against a formula. Validation assesses whether the product is fit for real user needs and context, for example by trying a workflow with users. Both can use different methods throughout the lifecycle.",
      }),
      { ...mcq(
        "qt-f4",
        "На яке питання приблизно відповідає верифікація?",
        "Verification roughly asks:",
        ["Чи правильно ми створюємо продукт відповідно до вимог?", "Чи створюємо ми потрібний продукт?", "Скільки зірок на GitHub?", "Який наш Elo?"],
        0,
      ), optionsEn: ["Are we building the product right against its requirements?", "Are we building the right product?", "How many GitHub stars?", "What is our Elo?"] },
      { ...mcq(
        "qt-f5",
        "На яке питання приблизно відповідає валідація?",
        "Validation roughly asks:",
        ["Чи створюємо ми продукт, потрібний користувачам?", "Чи точна версія компілятора?", "Лише кількість unit-тестів?", "Чи працює Redis?"],
        0,
      ), optionsEn: ["Are we building the product users need?", "Is the compiler version exact?", "Only the unit test count?", "Is Redis running?"] },
      { ...matchEx(
        "qt-f6",
        "Зіставте перевірку з її метою",
        "Match each activity with its purpose",
        [
          { left: "Верифікація", right: "Відповідність визначеним вимогам" },
          { left: "Валідація", right: "Придатність для потреб користувачів" },
        ],
      ), pairsEn: [
        { left: "Verification", right: "Conformance to specified requirements" },
        { left: "Validation", right: "Fitness for user needs" },
      ] },
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
        "Як час виявлення може вплинути на вартість виправлення?",
        "How can detection time affect the cost of correction?",
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
        "Що означає раннє тестування (shift-left)?",
        "Shift-left testing means:",
        [
          "залучати перевірки якості раніше в життєвому циклі",
          "перенести все тестування лише в продакшен",
          "відмовитися від модульних тестів",
          "тестувати тільки дизайн логотипу",
        ],
        0,
      ), optionsEn: ["Involve quality checks and testing earlier in the lifecycle", "Move all testing only to production", "Exclude unit tests", "Test only the logo design"] },
      { ...matchEx(
        "qt-art-1",
        "Зіставте ситуацію з можливим джерелом витрат на виправлення",
        "Match each situation with a potential source of correction cost",
        [
          { left: "Неоднозначна вимога до реалізації", right: "Уточнити очікування" },
          { left: "Дефект у залежних компонентах", right: "Переробити й повторно перевірити компоненти" },
          { left: "Дефект вплинув на користувачів", right: "Усунути наслідки та відновити сервіс" },
        ],
      ), pairsEn: [
        { left: "Ambiguous requirement before implementation", right: "Clarify expectations" },
        { left: "Defect in dependent components", right: "Rework and retest components" },
        { left: "Defect affected users", right: "Mitigate impact and restore service" },
      ] },
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
          "комп'ютери не вміють перевіряти твердження",
          "DOM забороняє тести",
          "npm блокує тести",
        ],
        0,
      ), optionsEn: ["The input and state space is usually enormous", "Computers cannot assert", "The DOM forbids tests", "npm blocks tests"] },
      { ...mcq(
        "qt-p2",
        "Тому обирають:",
        "So we choose:",
        ["пріоритезацію за ризиком і техніки тест-дизайну", "випадкову відмову від тестів", "лише трафік продакшену", "відмову від документації"],
        0,
      ), optionsEn: ["Risk-based prioritization and test design techniques", "Arbitrarily abandon testing", "Only production traffic", "No documentation"] },
      { ...mcq(
        "qt-art-2",
        "Форма має 8 незалежних двопозиційних прапорців. Скільки можливих комбінацій їхніх значень?",
        "A form has 8 independent two-state checkboxes. How many combinations of their values are possible?",
        [
          "2^8 = 256 комбінацій (тому застосовують техніки тест-дизайну для скорочення)",
          "Лише 8 комбінацій",
          "16 комбінацій",
          "1 комбінація",
        ],
        0,
      ), optionsEn: ["2^8 = 256 combinations", "Only 8", "16", "1"] },
    ],
  ),
  lesson(
    "qt-p-early-cluster",
    "Ранні перевірки та концентрація дефектів",
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
        "Раннє тестування:",
        "Early testing:",
        ["Ранній зворотний зв'язок може зменшити переробку", "Тестування лише наприкінці релізу", "Заборонено в agile", "Лише ручне тестування назавжди"],
        0,
      ), optionsEn: ["Early feedback can reduce rework", "Testing only at the end of a release", "Forbidden in agile", "Only manual testing forever"] },
      { ...mcq(
        "qt-p4",
        "Концентрація дефектів:",
        "Defect clustering:",
        ["баги часто скупчуються в окремих модулях", "баги завжди рівномірно розподілені", "баги є лише в README", "модулів не існує"],
        0,
      ), optionsEn: ["Defects often cluster in particular modules", "Defects are always evenly distributed", "Defects occur only in README", "There are no modules"] },
      { ...mcq(
        "qt-p5",
        "Чому тестовий набір варто переглядати?",
        "Pesticide paradox:",
        [
          "незмінний набір може не знаходити нові види дефектів — переглядайте сценарії",
          "тести завжди ламають CI",
          "антивірус завжди блокує Jest",
          "лише тести інтерфейсу ніколи не застарівають",
        ],
        0,
        why("Старі тести корисні для регресії; нові ризики й сценарії потребують додаткових перевірок.", "Existing tests still help with regression; new risks and scenarios need additional checks."),
      ), optionsEn: ["An unchanged suite may miss new defect classes, so review scenarios", "Tests kill CI", "Antivirus blocks Jest", "Only UI tests last forever"] },
    ],
  ),
  lesson(
    "qt-p-context",
    "Контекст і відсутність знайдених помилок",
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
        "Чому тестування залежить від контексту?",
        "Testing is context dependent:",
        [
          "підхід залежить від ризиків, предметної області та критичності",
          "один чек-лист назавжди підходить усім продуктам",
          "для калькуляторів потрібні лише наскрізні тести",
          "не потрібен аналіз ризиків",
        ],
        0,
      ), optionsEn: ["The approach depends on risk, domain, and criticality", "One checklist fits every product forever", "Only end-to-end tests for calculators", "Risk analysis is unnecessary"] },
      { ...mcq(
        "qt-p7",
        "Чому відсутність знайдених помилок не гарантує успіху продукту?",
        "Absence-of-errors fallacy:",
        [
          "продукт може не задовольняти потреби користувачів, навіть якщо помилок не знайдено",
          "нуль знайдених помилок завжди означає ідеальний продукт",
          "тести гарантують прибуток",
          "повне покриття усуває всі ризики",
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
    "Модульне тестування",
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
        "Що перевіряє модульний тест?",
        "A unit test checks:",
        ["поведінку невеликої одиниці коду за контрольованих умов", "завжди весь продакшен-кластер", "лише тексти інтерфейсу", "лише час життя DNS-запису"],
        0,
        why("Модульний тест зосереджується на невеликій одиниці; контрольовані залежності не обов'язково означають, що кожну з них треба замінити двійником.", "A unit test focuses on a small unit; controlling dependencies does not mean every dependency must be replaced with a test double."),
      ), optionsEn: ["A small unit of code under controlled conditions", "Always the entire production cluster", "Only UI copy", "Only DNS record lifetime"] },
      { ...mcq(
        "qt-l2",
        "Які характеристики корисні для модульних тестів?",
        "Good unit tests are:",
        ["швидкість, незалежність і відтворюваність", "обов'язкова нестабільність", "обов'язкова наявність повного тестового середовища", "лише ручне виконання"],
        0,
      ), optionsEn: ["Speed, independence, and reproducibility", "Mandatory flakiness", "A mandatory full staging environment", "Only manual execution"] },
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
    "Інтеграційне тестування",
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
        "На чому зосереджене інтеграційне тестування?",
        "Integration testing:",
        ["на взаємодії модулів, сервісів або API", "лише на знімках CSS", "лише на перевірці орфографії", "на шахових задачах"],
        0,
      ), optionsEn: ["Interactions among modules, services, or APIs", "Only CSS snapshots", "Only spellcheck", "Chess puzzles"] },
      { ...mcq(
        "qt-l4",
        "Контрактні тести близькі до:",
        "Contract tests relate to:",
        ["інтеграційних меж між сервісами", "лише модульних тестів математики", "лише навантажувального тестування", "лише тестування доступності"],
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
    "Системне та приймальне тестування",
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
      { ...matchEx(
        "qt-art-6",
        "Зіставте системні та приймальні тести",
        "Match system and acceptance testing",
        [
          { left: "Системне тестування", right: "Інтегрована система проти вимог" },
          { left: "UAT (приймальне тестування)", right: "Приймання за участі користувача або замовника" },
          { left: "Альфа-тестування", right: "Раннє тестування в середовищі розробника" },
          { left: "Бета-тестування", right: "Обмежене тестування зовнішніми користувачами" },
        ],
      ), pairsEn: [
        { left: "System testing", right: "Integrated system against requirements" },
        { left: "UAT (acceptance testing)", right: "Acceptance with users or customer" },
        { left: "Alpha testing", right: "Early testing in the developer's environment" },
        { left: "Beta testing", right: "Limited testing by external users" },
      ] },
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
    "Димова та прицільна перевірки",
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
        "Після розгортання збірки команда хоче швидко перевірити вхід і створення замовлення перед глибшим тестуванням. Яка це перевірка?",
        "After deploying a build, the team wants to quickly check login and order creation before deeper testing. What kind of check is this?",
        ["димова перевірка ключових можливостей", "повна регресія", "лише тест на проникнення", "лише перевірка доступності"],
        0,
        why("Димовий набір швидко оцінює готовність збірки до подальшого тестування, але не замінює регресію.", "A smoke suite quickly assesses whether the build is ready for deeper testing, but does not replace regression testing."),
      ), optionsEn: ["A smoke check of key capabilities", "A full regression suite", "Only a penetration test", "Only an accessibility check"] },
      { ...mcq(
        "qt-tf2",
        "Після зміни розрахунку знижки команда швидко перевіряє саме цю зміну. Як часто називають таку перевірку?",
        "After changing discount calculation, the team quickly checks that specific change. What is this check often called?",
        ["прицільна sanity-перевірка", "повний набір тестів продуктивності", "лише тестування хаосу", "лише перевірка DNS"],
        0,
        why("Команди можуть визначати термін по-різному, тому обсяг перевірки потрібно узгодити.", "Teams may use the term differently, so agree on the scope of the check."),
      ), optionsEn: ["A focused sanity check", "A full performance suite", "Only chaos testing", "Only a DNS check"] },
      { ...matchEx(
        "qt-art-8",
        "Зіставте Smoke та Sanity сценарії",
        "Match Smoke and Sanity scenarios",
        [
          { left: "Smoke-тест", right: "Коротка перевірка ключових шляхів збірки" },
          { left: "Sanity-тест", right: "Прицільна перевірка конкретної зміни" },
        ],
      ), pairsEn: [
        { left: "Smoke test", right: "Brief check of key build paths" },
        { left: "Sanity test", right: "Focused check of a specific change" },
      ] },
    ],
  ),
  lesson(
    "qt-tf-regression",
    "Регресія та повторна перевірка",
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
        "Після виправлення купона команда перевіряє, чи не зламалася оплата без купона. Яка це перевірка?",
        "After fixing a coupon, the team checks that payment without a coupon still works. What kind of check is this?",
        ["регресійна перевірка раніше робочої поведінки", "лише перший тест нового модуля", "лише встановлення", "лише статичний аналіз"],
        0,
        why("Перевірка сусіднього сценарію шукає небажані наслідки зміни; повторна перевірка самого дефекту має окрему мету.", "Checking a related scenario looks for unintended effects; retesting the defect itself has a separate purpose."),
      ), optionsEn: ["A regression check of previously working behavior", "Only the first test of a new module", "Only installation", "Only static analysis"] },
      { ...mcq(
        "qt-tf4",
        "Як перевірити саме повідомлений дефект після виправлення купона?",
        "How do you check the reported defect itself after the coupon fix?",
        ["повторити сценарій дефекту за його передумов і перевірити результат", "завжди виконувати лише випадкове дослідження", "запустити лише навантажувальний тест", "перевірити лише колір інтерфейсу"],
        0,
        why("Повторне тестування перевіряє повідомлену проблему; додаткові регресійні перевірки оцінюють вплив на інші сценарії.", "Retesting checks the reported issue; additional regression checks assess the impact on other scenarios."),
      ), optionsEn: ["Repeat the defect scenario under its preconditions and check the result", "Always perform only random exploration", "Run only a load test", "Check only the UI color"] },
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
    "Дослідницьке та приймальне тестування",
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
        "Що характерно для дослідницького тестування?",
        "Exploratory testing:",
        ["одночасне навчання, проєктування та виконання перевірок", "лише записані скрипти без осмислення", "лише модульні тести", "лише SQL"],
        0,
      ), optionsEn: ["Learning, test design, and execution together", "Only scripts without thinking", "Only unit testing", "Only SQL"] },
      { ...mcq(
        "qt-tf6",
        "На чому зосереджене приймальне тестування користувачами (UAT)?",
        "UAT focus:",
        ["придатність рішення для користувачів і бізнес-процесу", "лише покриття мікросервісів", "лише розмір пакета", "лише строгий режим TypeScript"],
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
    "Продуктивність",
    "Performance",
    2,
    false,
    [
      concept("qt-performance-concept", "Сценарії продуктивності", "Performance scenarios", {
        uk: "Load-тест вимірює поведінку за визначеного профілю навантаження; stress досліджує роботу за підвищеного навантаження та відновлення після перевантаження. Spike перевіряє різкі зміни, а endurance — поведінку протягом тривалого часу. Заздалегідь визначайте сценарій, профіль запитів, тривалість, метрики й критерії. Наприклад, для погодженого навантаження порівняйте 95-й перцентиль часу відповіді та частку помилок із цілями; одного середнього часу недостатньо, щоб описати повільні відповіді. Універсального порогу тривалості чи продуктивності немає.",
        en: "A load test measures behavior under a defined workload; a stress test explores behavior under increased load and recovery after overload. Spike testing examines sudden changes, while endurance testing examines behavior over time. Define the scenario, request profile, duration, metrics, and criteria beforehand. For example, under an agreed workload, compare the 95th percentile response time and error rate with targets; an average alone does not describe slow responses. There is no universal duration or performance threshold.",
      }),
      { ...mcq(
        "qt-tn1",
        "Середній час відповіді прийнятний, але частина запитів дуже повільна. Які дані допоможуть оцінити результат?",
        "Average response time is acceptable, but some requests are very slow. What data helps evaluate the result?",
        ["перцентиль часу відповіді та частка помилок за визначеного профілю навантаження", "лише середній час без профілю навантаження", "лише кількість рядків коду", "лише колір графіка"],
        0,
        why("Перцентилі та помилки доповнюють середнє; порівнюйте їх із погодженими цілями за відомого навантаження.", "Percentiles and errors complement the average; compare them with agreed targets under a known workload."),
      ), optionsEn: ["Response-time percentiles and error rate under a defined workload", "Only the average without a workload profile", "Only lines of code", "Only the chart color"] },
      { ...mcq(
        "qt-tn2",
        "Чим відрізняються load- і stress-тестування?",
        "Load vs stress:",
        [
          "load вимірює заданий профіль; stress досліджує перевантаження і відновлення",
          "це завжди одне й те саме",
          "stress — це модульний тест",
          "load — це лише клік в інтерфейсі",
        ],
        0,
      ), optionsEn: ["Load measures a defined workload; stress explores overload and recovery", "They are always identical", "Stress is a unit test", "Load is only a UI click"] },
      { ...matchEx(
        "qt-art-11",
        "Зіставте типи тестування продуктивності з їхньою метою",
        "Match performance testing types with their goal",
        [
          { left: "Навантажувальне тестування (load)", right: "Поведінка за заданого навантаження" },
          { left: "Стресове тестування", right: "Перевантаження та відновлення" },
          { left: "Тестування стрибків (spike)", right: "Реакція на різкі зміни трафіку" },
          { left: "Тривале тестування (soak)", right: "Проблеми за тривалого навантаження" },
        ],
      ), pairsEn: [
        { left: "Load testing", right: "Behavior under a defined workload" },
        { left: "Stress testing", right: "Overload and recovery" },
        { left: "Spike testing", right: "Response to sudden traffic changes" },
        { left: "Soak (endurance)", right: "Issues under sustained load" },
      ] },
    ],
  ),
  lesson(
    "qt-tn-security",
    "Безпека та зручність використання",
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
        "Що досліджує тестування безпеки?",
        "Security testing looks for:",
        ["вразливості, прогалини автентифікації та авторизації, витоки даних", "лише швидкість друку", "лише відступи flex", "емодзі в Git"],
        0,
      ), optionsEn: ["Vulnerabilities, authentication and authorization gaps, and data exposure", "Only typing speed", "Only flex gaps", "Git emoji"] },
      { ...mcq(
        "qt-tn4",
        "Що досліджує тестування зручності використання?",
        "Usability testing:",
        ["наскільки люди можуть виконувати завдання в конкретному контексті", "лише коди HTTP", "лише температуру процесора", "лише очищення бази даних"],
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
    "Сумісність і надійність",
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
        "Що перевіряють для сумісності?",
        "Compatibility:",
        ["важливі комбінації браузерів, ОС, пристроїв і версій", "назавжди лише один браузер", "лише модель процесора сервера", "лише тему редактора"],
        0,
      ), optionsEn: ["Browsers, operating systems, devices, and versions", "Only one browser forever", "Only a server CPU model", "Only an IDE theme"] },
      { ...mcq(
        "qt-tn6",
        "Що характеризує надійність?",
        "Reliability:",
        ["здатність працювати за визначених умов протягом часу", "лише час першого відображення", "лише стиснутий розмір пакета", "лише піктограму сайту"],
        0,
      ), optionsEn: ["Ability to operate under defined conditions over time", "Only first paint", "Only gzip bundle size", "Only the favicon"] },
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
    "Еквівалентне розбиття",
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
        "Що робить еквівалентне розбиття (EP)?",
        "EP (equivalence partitioning):",
        [
          "групує входи на класи з подібною поведінкою",
          "тестує кожен піксель інтерфейсу",
          "виконує лише мутаційне тестування",
          "виконує лише тестування хаосу",
        ],
        0,
      ), optionsEn: ["Groups inputs into classes with similar expected behavior", "Tests every UI pixel", "Only mutation testing", "Only chaos testing"] },
      { ...mcq(
        "qt-bb2",
        "Поле приймає цілі числа від 18 до 65 включно. Який набір містить по одному представнику нижнього, допустимого та верхнього класів?",
        "A field accepts integers from 18 through 65 inclusive. Which set contains one representative each from the lower, valid, and upper classes?",
        ["15, 30, 70", "20, 30, 40", "15, 16, 17", "18, 65, 66"],
        0,
        why("15 нижче діапазону, 30 у ньому, 70 вище. Це приклад представників класів; окремо перевіряйте межі й інші типи вводу.", "15 is below the range, 30 is inside it, and 70 is above. These are class representatives; test boundaries and other input types separately."),
      ), optionsEn: ["15, 30, 70", "20, 30, 40", "15, 16, 17", "18, 65, 66"] },
      { ...matchEx(
        "qt-art-14",
        "Еквівалентне розбиття для цілого віку 18–65 включно",
        "Equivalence partitions for integer age 18–65 inclusive",
        [
          { left: "Нижче діапазону", right: "вік < 18 (15)" },
          { left: "У діапазоні", right: "18 ≤ вік ≤ 65 (30)" },
          { left: "Вище діапазону", right: "вік > 65 (70)" },
        ],
      ), pairsEn: [
        { left: "Below range", right: "age < 18 (15)" },
        { left: "In range", right: "18 ≤ age ≤ 65 (30)" },
        { left: "Above range", right: "age > 65 (70)" },
      ] },
    ],
  ),
  lesson(
    "qt-bb-bva",
    "Аналіз граничних значень",
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
        "На чому зосереджений аналіз граничних значень (BVA)?",
        "BVA focuses on:",
        ["на межах діапазонів і помилках на одиницю", "лише на значеннях усередині діапазону", "лише на випадкових рядках без меж", "лише на кольорах"],
        0,
      ), optionsEn: ["Range boundaries and off-by-one errors", "Only middle values", "Only random strings, never edges", "Only colors"] },
      { ...mcq(
        "qt-bb4",
        "Для цілого віку 18–65 включно приклад три-точкового BVA:",
        "For integer age 18–65 inclusive, an example of three-value BVA is:",
        ["17, 18, 19, 64, 65, 66", "лише 40", "лише 0 та 1000000", "жодного числа"],
        0,
      ), optionsEn: ["17, 18, 19, 64, 65, 66", "Only 40", "Only 0 and 1000000", "No numbers"] },
      { ...matchEx(
        "qt-art-15",
        "Зіставте двоточкові граничні значення та внутрішнє значення для пароля завдовжки 8–20 символів включно",
        "Match two-value boundaries and an interior value for a password of 8–20 characters inclusive",
        [
          { left: "Нижня межа", right: "7 (недопустима), 8 (допустима)" },
          { left: "Верхня межа", right: "20 (допустима), 21 (недопустима)" },
          { left: "Внутрішнє значення", right: "14 (допустимий клас)" },
        ],
      ), pairsEn: [
        { left: "Lower boundary", right: "7 (invalid), 8 (valid)" },
        { left: "Upper boundary", right: "20 (valid), 21 (invalid)" },
        { left: "Interior value", right: "14 (valid class)" },
      ] },
    ],
  ),
  lesson(
    "qt-bb-decision-state",
    "Таблиці рішень і стани",
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
        "Знижка залежить від членства та наявності купона. Як знайти пропущену комбінацію правил?",
        "A discount depends on membership and whether a coupon is present. How can you find a missing combination of rules?",
        ["скласти таблицю комбінацій умов та очікуваних результатів", "перевірити лише один успішний випадок", "випадково змінити обидві умови без запису", "перевірити лише колір кнопки"],
        0,
        why("Таблиця робить комбінації умов і відповідні результати видимими; неможливі комбінації теж варто позначити.", "A table makes condition combinations and outcomes visible; mark impossible combinations as well."),
      ), optionsEn: ["Build a table of condition combinations and expected outcomes", "Check only one successful case", "Change both conditions randomly without recording", "Check only the button color"] },
      { ...mcq(
        "qt-bb6",
        "Що перевіряє тестування переходів станів?",
        "State transition testing:",
        ["дозволені й недозволені переходи між станами", "ігнорує статуси замовлення", "лише CSS :hover", "лише час життя DNS-запису"],
        0,
      ), optionsEn: ["Allowed and disallowed transitions between states", "Ignores order statuses", "Only CSS :hover", "Only DNS TTL"] },
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
    "Тестування сценаріїв використання",
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
        "Що охоплюють тести за сценаріями використання?",
        "Use-case based tests:",
        ["сценарії актора з основним і альтернативними потоками", "лише сирі дампи SQL", "лише шістнадцяткові дампи", "лише заповнювальний текст"],
        0,
      ), optionsEn: ["Actor scenarios with main and alternative flows", "Only raw SQL dumps", "Only hex dumps", "Only placeholder text"] },
      { ...matchEx(
        "qt-bb8",
        "Зіставте техніку з її основним фокусом",
        "Match each technique with its main focus",
        [
          { left: "Еквівалентне розбиття (EP)", right: "Класи вхідних значень" },
          { left: "Аналіз граничних значень (BVA)", right: "Межі діапазонів" },
          { left: "Тестування станів", right: "Переходи між станами" },
        ],
      ), pairsEn: [
        { left: "Equivalence partitioning (EP)", right: "Classes of inputs" },
        { left: "Boundary value analysis (BVA)", right: "Edges of ranges" },
        { left: "State testing", right: "Transitions between states" },
      ] },
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

const whiteBox = unit("white-box", "Техніки білої скриньки", "White-box", [
  lesson(
    "qt-wb-coverage",
    "Основи покриття коду",
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
        "Що вимірює покриття інструкцій (statement coverage)?",
        "Statement coverage:",
        ["частку виконаних інструкцій за визначенням інструмента", "частку задоволених користувачів", "частку зелених кнопок", "доступність маркетингового сайту"],
        0,
      ), optionsEn: ["The proportion of executed statements as defined by the tool", "The proportion of happy users", "The proportion of green buttons", "Marketing site availability"] },
      { ...mcq(
        "qt-wb2",
        "Що вимірює покриття гілок (branch coverage)?",
        "Branch coverage:",
        ["виконані гілки або результати рішень", "лише коментарі", "лише імпорти", "лише README"],
        0,
      ), optionsEn: ["Decision branches or outcomes", "Only comments", "Only imports", "Only README"] },
      { ...mcq(
        "qt-art-18",
        "Єдиний тест викликає функцію f(1): function f(x) { if (x > 0) return 1; }. Який результат умови залишився неперевіреним?",
        "The only test calls f(1): function f(x) { if (x > 0) return 1; }. Which condition outcome remains untested?",
        [
          "false, наприклад при x = 0",
          "true при x = 1",
          "обидва результати вже перевірено",
          "жоден результат умови не виконувався",
        ],
        0,
        why("За x = 1 інструкція return виконується, але false-результат умови залишається неперевіреним; точний звіт залежить від інструмента.", "With x = 1 the return statement executes, but the false outcome remains untested; the exact report depends on the tool."),
      ), optionsEn: ["False, for example with x = 0", "True with x = 1", "Both outcomes have already been tested", "Neither condition outcome executed"] },
    ],
  ),
  lesson(
    "qt-wb-limits",
    "Обмеження покриття коду",
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
        "Що означає 100% покриття обраної метрики?",
        "100% coverage means:",
        [
          "усі одиниці цієї метрики виконувалися — це не гарантує відсутності дефектів",
          "продукт ідеальний",
          "можна не тестувати вимоги",
          "усі питання безпеки вирішено",
        ],
        0,
      ), optionsEn: ["All units of the chosen metric ran; this does not guarantee no bugs", "The product is perfect", "Requirements no longer need testing", "Security is complete"] },
      { ...mcq(
        "qt-wb4",
        "Що використовує тестування білої скриньки?",
        "White-box needs:",
        ["знання коду або внутрішньої структури", "лише знімок інтерфейсу", "лише брендбук", "лише юридичний текст"],
        0,
      ), optionsEn: ["Access to or understanding of code and structure", "Only a UI screenshot", "Only branding guidelines", "Only legal text"] },
      { ...mcq(
        "qt-art-19",
        "Код має 100% Statement Coverage. Чи гарантує це відсутність помилок?",
        "Code has 100% Statement Coverage. Does this guarantee zero bugs?",
        [
          "Ні, покриття інструкцій може не виявити пропущені вимоги, граничні значення та стани гонки",
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
          "аналіз вимог, планування, дизайн перевірок, підготовку, виконання та підсумки",
          "лише розгортання",
          "лише дизайн логотипа",
          "лише придбання серверів",
        ],
        0,
      ), optionsEn: ["Requirements analysis, planning, test design, setup, execution, and review", "Only deployment", "Only logo design", "Only buying servers"] },
      { ...matchEx(
        "qt-st2",
        "Зіставте фази тестування з діями",
        "Match testing phases to activities",
        [
          { left: "Планування тестування", right: "Обсяг, ризики, ресурси" },
          { left: "Тест-дизайн", right: "Тест-кейси й дані" },
          { left: "Виконання", right: "Запуск і запис результатів" },
        ],
      ), pairsEn: [
        { left: "Test planning", right: "Scope, risk, resources" },
        { left: "Test design", right: "Cases and data" },
        { left: "Execution", right: "Run and log results" },
      ] },
      { ...matchEx(
        "qt-art-20",
        "Зіставте фази STLC з їхніми головними вихідними артефактами",
        "Match STLC phases with their deliverables",
        [
          { left: "Планування", right: "Обсяг, ризики, ресурси" },
          { left: "Тест-дизайн", right: "Тест-кейси та дані" },
          { left: "Виконання", right: "Результати й звіти про дефекти" },
          { left: "Підсумок", right: "Підсумковий звіт" },
        ],
      ), pairsEn: [
        { left: "Planning", right: "Scope, risks, resources" },
        { left: "Test design", right: "Test cases and data" },
        { left: "Execution", right: "Results and defect reports" },
        { left: "Review", right: "Test summary" },
      ] },
    ],
  ),
  lesson(
    "qt-st-entry-exit",
    "Вхідні та вихідні критерії",
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
      { ...mcq("qt-art-21", "Узгоджений критерій вимагає успішної регресії, але платіжний стенд недоступний і цей сценарій не перевірено. Що робити?", "An agreed exit criterion requires a passing regression suite, but the payment environment is unavailable and that scenario was not checked. What should the team do?", ["Зафіксувати невиконаний критерій і ризик та узгодити рішення із відповідальними", "Позначити перевірку успішною без запуску", "Видалити критерій без обговорення", "Вважати, що результат інших тестів доводить працездатність платежів"], 0, why("Неперевірений сценарій не є успішним; рішення про затримку чи виняток ухвалюють із зафіксованим ризиком.", "An untested scenario is not a pass; a delay or exception is agreed with the risk recorded.")), optionsEn: ["Record the unmet criterion and risk, then agree on a decision with the responsible people", "Mark the check as passed without running it", "Delete the criterion without discussion", "Assume other test results prove payments work"] },
    ],
  ),
  lesson(
    "qt-st-shiftleft",
    "Раннє тестування в процесі",
    "Shift-left in process",
    2,
    false,
    [
      concept("qt-shiftleft-concept", "Ранній зворотний зв'язок", "Earlier feedback", {
        uk: "Shift-left переносить частину перевірок ближче до виникнення рішення. Наприклад, до розробки знижки тестувальник, розробник і представник продукту уточнюють, чи поєднуються два промокоди, і записують приклади очікуваної суми. Під час реалізації команда автоматизує відповідні unit- та API-перевірки в CI. Ранній зворотний зв'язок допомагає виявити неоднозначність до того, як вона потрапить у код, але не гарантує відсутності дефектів і не скасовує інтеграційні перевірки, спостереження та аналіз після релізу.",
        en: "Shift-left moves some checks closer to when decisions are made. For example, before building discounts, a tester, developer, and product representative clarify whether two promo codes can be combined and record examples of expected totals. During implementation, the team automates relevant unit and API checks in CI. Earlier feedback helps reveal ambiguity before it reaches the code, but does not guarantee zero defects or remove integration checks, monitoring, and analysis after release.",
      }),
      { ...mcq(
        "qt-st5",
        "Shift-left у процесі:",
        "Shift-left in process:",
        ["огляд вимог, модульні та ранні API-тести", "усе в останній тиждень", "скасувати CI", "лише ручне тестування після релізу"],
        0,
      ), optionsEn: ["Review requirements, run unit tests, and test APIs early", "Do everything in the final week", "Cancel CI", "Only manual testing after release"] },
      { ...mcq("qt-shiftleft-example", "У вимозі не сказано, чи можна поєднати два промокоди. Яка рання перевірка найкорисніша?", "A requirement does not say whether two promo codes can be combined. What is the most useful early check?", ["Уточнити правило з командою продукту й записати приклади очікуваних сум", "Обрати правило самостійно та не документувати його", "Дочекатися скарг після релізу", "Перевірити лише колір кнопки"], 0, { explanationUk: "Приклади розкривають неоднозначність до реалізації та стають основою перевірок.", explanationEn: "Examples expose the ambiguity before implementation and provide a basis for checks." }), optionsEn: ["Clarify the rule with the product team and record examples of expected totals", "Choose a rule alone and leave it undocumented", "Wait for complaints after release", "Check only the button color"] },
      { ...mcq("qt-shiftleft-limits", "Що залишається потрібним після додавання ранніх unit-тестів?", "What is still needed after adding early unit tests?", ["Перевірка взаємодії компонентів і спостереження після релізу", "Жодні інші перевірки", "Лише повторення unit-тестів вручну", "Вимкнення моніторингу"], 0, { explanationUk: "Ранні перевірки доповнюють інші рівні тестування та моніторинг.", explanationEn: "Early checks complement other test levels and monitoring." }), optionsEn: ["Checks of component interactions and post-release monitoring", "No other checks", "Only repeating unit tests manually", "Disabling monitoring"] },
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
    "Тест-план і стратегія",
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
        "Що описує тест-план?",
        "A test plan describes:",
        ["що, як і коли тестуємо, ресурси та ризики", "лише змінні CSS", "лише хеш коміту", "лише план офісу"],
        0,
      ), optionsEn: ["What, how, and when to test, plus resources and risks", "Only CSS variables", "Only a commit hash", "Only an office map"] },
      { ...mcq(
        "qt-ar2",
        "Що зазвичай визначає стратегія тестування?",
        "Strategy often answers:",
        ["рівні, типи, інструменти й загальний підхід", "меню обіду", "розсадку в офісі", "лише бренд"],
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
    "Тест-кейси та трасування вимог",
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
        "Що зазвичай містить зрозумілий тест-кейс?",
        "A good test case has:",
        ["передумови, кроки й очікуваний результат", "лише порожнє поле фактичного результату", "лише знімки екрана без контексту", "жодного опису"],
        0,
      ), optionsEn: ["Preconditions, steps, and an expected result", "Only an empty actual-result field", "Only screenshots without context", "No description"] },
      { ...mcq(
        "qt-ar4",
        "Вимога змінилася. Як матриця трасування вимог (RTM) допоможе команді?",
        "A requirement changed. How can a requirements traceability matrix (RTM) help the team?",
        ["знайти пов'язані перевірки та оцінити, які потрібно оновити", "гарантувати відсутність усіх дефектів", "автоматично затвердити реліз", "замінити перевірку фактичного результату"],
        0,
        why("Зв'язки між вимогами та тестами полегшують аналіз змін і пошук прогалин, але самі не доводять повноту перевірок.", "Links between requirements and tests help analyze changes and find gaps, but do not by themselves prove complete testing."),
      ), optionsEn: ["Find linked checks and assess which need updating", "Guarantee there are no defects", "Automatically approve the release", "Replace checking the actual result"] },
      { ...matchEx(
        "qt-art-23",
        "Зіставте можливі частини тест-кейсу з їхнім призначенням",
        "Match possible test-case parts to their purpose",
        [
          { left: "Передумови", right: "Початкові умови" },
          { left: "Кроки", right: "Дії тестувальника" },
          { left: "Очікуваний результат", right: "Очікувана поведінка" },
          { left: "Постумови", right: "Стан після виконання" },
        ],
      ), pairsEn: [
        { left: "Preconditions", right: "Starting conditions" },
        { left: "Steps", right: "Test actions" },
        { left: "Expected result", right: "Expected behavior" },
        { left: "Postconditions", right: "State after execution" },
      ] },
    ],
  ),
  lesson(
    "qt-ar-checklist",
    "Чек-листи",
    "Checklists",
    1,
    false,
    [
      concept("qt-checklist-concept", "Чек-лист і деталізація", "Checklists and detail", {
        uk: "Чек-лист нагадує про області й умови перевірки без обов'язкового опису кожного кроку. Замість нечіткого «перевірити оплату» запишіть, наприклад: «відхилена картка: замовлення не оплачено, користувач бачить повідомлення». Фіксуйте результат, версію та неперевірені пункти, щоб команда розуміла межі проходу. Для складних, критичних чи таких, що потребують аудиту, сценаріїв може знадобитися детальніший тест-кейс із передумовами, діями й очікуваним результатом.",
        en: "A checklist reminds the tester of areas and conditions to check without necessarily prescribing every step. Instead of the vague 'check payment', write, for example, 'declined card: the order remains unpaid and the user sees a message'. Record the outcome, version, and unchecked items so the team understands the limits of the pass. Complex, critical, or auditable scenarios may need a more detailed test case with preconditions, actions, and an expected result.",
      }),
      { ...mcq(
        "qt-ar5",
        "Checklist корисний для:",
        "Checklists help for:",
        ["швидких регресій/exploratory support", "заміни всіх вимог forever", "вимкнення CI", "delete cases"],
        0,
      ), optionsEn: ["Quick regression passes and exploratory support", "Replacing all requirements forever", "Disabling CI", "Deleting test cases"] },
      { ...mcq("qt-checklist-specific", "Який пункт чек-листа найкраще допоможе перевірити відхилену оплату?", "Which checklist item best supports checking a declined payment?", ["Відхилена картка: замовлення не оплачено, користувач бачить повідомлення", "Перевірити оплату", "Усе працює", "Подивитися сторінку"], 0, { explanationUk: "Умова й очікуваний результат роблять пункт зрозумілим та перевірним.", explanationEn: "The condition and expected outcome make the item clear and checkable." }), optionsEn: ["Declined card: the order remains unpaid and the user sees a message", "Check payment", "Everything works", "Look at the page"] },
      { ...mcq("qt-checklist-coverage", "Частину чек-листа не перевірили через недоступний платіжний стенд. Що повідомити команді?", "Part of a checklist was not checked because the payment environment was unavailable. What should the team be told?", ["Які пункти пропущено, чому та який ризик залишився", "Що всі перевірки пройдено", "Лише кількість виконаних пунктів", "Нічого, бо чек-лист короткий"], 0, { explanationUk: "Неперевірені пункти та причина пропуску допомагають оцінити залишковий ризик.", explanationEn: "Unchecked items and the reason they were skipped help assess residual risk." }), optionsEn: ["Which items were skipped, why, and the remaining risk", "That every check passed", "Only the number of completed items", "Nothing, because the checklist is short"] },
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
    "Тяжкість і пріоритет дефекту",
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
        "Що описує тяжкість дефекту (severity)?",
        "Severity is:",
        ["серйозність впливу на систему чи користувача", "порядок у списку задач завжди дорівнює тяжкості", "колір кнопки", "назву гілки"],
        0,
      ), optionsEn: ["The seriousness of impact on the system or user", "Backlog order always equals severity", "Button color", "Branch name"] },
      { ...mcq(
        "qt-df2",
        "Що описує пріоритет дефекту (priority)?",
        "Priority is:",
        ["терміновість або черговість виправлення", "лише глибину стеку викликів", "кількість класів CSS", "модель процесора"],
        0,
      ), optionsEn: ["The urgency or order of fixing", "Only stack-trace depth", "The number of CSS classes", "CPU model"] },
      { ...mcq(
        "qt-df3",
        "Перед публічним запуском виявили помилку в назві бренду на головній сторінці. Як команда може її оцінити?",
        "Before a public launch, the team finds a misspelled brand name on the home page. How might it assess the defect?",
        ["невеликий функціональний вплив, але високий пріоритет через близький запуск", "обов'язково низький пріоритет через малий функціональний вплив", "пріоритет і тяжкість завжди однакові", "оцінка можлива лише після релізу"],
        0,
        why("Тяжкість і пріоритет оцінюють окремо; рішення залежить від впливу й контексту релізу.", "Severity and priority are assessed separately; the decision depends on impact and release context."),
      ), optionsEn: ["Low functional impact but high priority because launch is imminent", "Priority must be low because functional impact is low", "Priority and severity are always identical", "Assessment is possible only after release"] },
    ],
  ),
  lesson(
    "qt-df-lifecycle",
    "Життєвий цикл дефекту",
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
        ["новий → відкритий → виправлений → перевірений → закритий; можливе повторне відкриття", "завжди закритий від створення", "лише чернетка шрифту", "лише злитий запит без перевірки"],
        0,
      ), optionsEn: ["New → open → fixed → verified → closed, with possible reopening", "Only closed from creation", "Only draft font", "Only merged PR without verification"] },
      { ...mcq(
        "qt-df5",
        "Коли команда може повторно відкрити дефект?",
        "Reopen when:",
        ["виправлення не усунуло проблему або вона знову виникла", "перевірка пройшла", "проблеми ніколи не існувало", "лише оновлено документацію"],
        0,
      ), optionsEn: ["The fix did not resolve the issue or it recurred", "The test passed", "The issue never existed", "Only documentation changed"] },
      { ...matchEx(
        "qt-art-24",
        "Життєвий цикл дефекту в трекері (Jira/Bugzilla)",
        "Defect lifecycle status transitions",
        [
          { left: "Новий / відкритий", right: "Запис очікує оцінки" },
          { left: "У роботі", right: "Над дефектом працюють" },
          { left: "Вирішено / готовий до QA", right: "Рішення готове до перевірки" },
          { left: "Закритий", right: "Запис закрито за правилами команди" },
        ],
      ), pairsEn: [
        { left: "New / open", right: "Report awaits triage" },
        { left: "In progress", right: "Work is in progress" },
        { left: "Resolved / ready for QA", right: "Resolution awaits verification" },
        { left: "Closed", right: "Record closed under team policy" },
      ] },
    ],
  ),
  lesson(
    "qt-df-report-practice",
    "Практика складання баг-репорту",
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
        "Який заголовок найкраще допоможе зрозуміти проблему?",
        "Which title best helps the team understand the issue?",
        [
          "Чекаут: кнопка оплати не реагує після введення купона",
          "Баг",
          "Тікет 42",
          "Кнопка",
        ],
        0,
        why("Заголовок називає місце, дію та спостережувану проблему; деталі й умови слід додати до опису.", "The title names the location, action, and observed problem; add details and conditions to the description."),
      ), optionsEn: ["Checkout: pay button does not respond after entering a coupon", "Bug", "Ticket 42", "Button"] },
      { ...mcq(
        "qt-df-p2",
        "Якими мають бути кроки відтворення?",
        "Steps to reproduce should be:",
        [
          "нумеровані, конкретні, відтворювані",
          "одне речення «натисни щось»",
          "тільки скрін без кроків",
          "лише стек викликів без шляху в інтерфейсі",
        ],
        0,
      ), optionsEn: ["Ordered, concrete, and reproducible", "One sentence saying 'click something'", "Only a screenshot without steps", "Only a stack trace without the UI path"] },
      { ...mcq(
        "qt-df-p3",
        "Що порівнюють у полях очікуваного та фактичного результату?",
        "Expected vs Actual:",
        [
          "очікувану поведінку зі спостережуваною",
          "завжди однакові результати",
          "лише тяжкість",
          "лише виконавця",
        ],
        0,
      ), optionsEn: ["Expected behavior versus observed behavior", "Always the same thing", "Only severity", "Only the assignee"] },
      { ...matchEx(
        "qt-df-p4",
        "Зіставте докази з тим, що вони можуть показати",
        "Match evidence to what it can show",
        [
          { left: "Знімок екрана", right: "Стан інтерфейсу" },
          { left: "HAR / мережа", right: "Трафік API" },
          { left: "Журнал консолі", right: "Помилки клієнта" },
        ],
      ), pairsEn: [
        { left: "Screenshot", right: "UI state" },
        { left: "HAR / network", right: "API traffic" },
        { left: "Console log", right: "Client errors" },
      ] },
    ],
  ),
  lesson(
    "qt-df-report",
    "Зрозумілий баг-репорт",
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
        "Що допомагає дослідити баг-репорт?",
        "A good bug report contains:",
        [
          "середовище, кроки, очікуваний і фактичний результати та докази",
          "лише «не працює»",
          "лише знімок екрана без контексту чи кроків",
          "лише емодзі тяжкості",
        ],
        0,
      ), optionsEn: ["Environment, steps, expected and actual results, and evidence", "Only 'does not work'", "Only a screenshot without context", "Only a severity emoji"] },
      { ...matchEx(
        "qt-df7",
        "Поля звіту",
        "Report fields",
        [
          { left: "Очікуваний результат", right: "Що має відбутися" },
          { left: "Фактичний результат", right: "Що відбулося" },
          { left: "Кроки", right: "Як відтворити проблему" },
        ],
      ), pairsEn: [
        { left: "Expected result", right: "What should happen" },
        { left: "Actual result", right: "What happened" },
        { left: "Steps", right: "How to reproduce the problem" },
      ] },
      { ...mcq(
        "qt-art-25",
        "Баг-репорт містить лише заголовок «Кнопка не працює». Що потрібно додати?",
        "A bug report contains only the title 'Button does not work'. What should be added?",
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

const advanced = unit("advanced-design", "Додаткові техніки тест-дизайну", "Advanced design", [
  lesson(
    "qt-ad-pairwise",
    "Вступ до попарного тестування",
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
        "Що забезпечує попарне тестування за заданих обмежень?",
        "Pairwise / combinatorial lite:",
        [
          "кожна допустима пара значень двох параметрів зустрічається хоча б раз",
          "завжди перевіряються всі комбінації трьох і більше параметрів",
          "параметри заборонені",
          "перевіряється лише зовнішній вигляд",
        ],
        0,
      ), optionsEn: ["Every valid pair of values from two parameters appears at least once", "All interactions among three or more parameters are always tested", "Parameters are forbidden", "Only appearance is tested"] },
      { ...mcq(
        "qt-ad2",
        "Коли попарне тестування може бути корисним?",
        "Useful when:",
        ["багато параметрів конфігурації або прапорців", "є лише один булевий параметр", "немає вхідних параметрів", "перевіряється лише статичний текст"],
        0,
      ), optionsEn: ["Many configuration parameters or flags", "One boolean", "No inputs", "Only a static text page"] },
      { ...mcq(
        "qt-art-26",
        "Яка перевага та межа Pairwise Testing?",
        "What is a benefit and a limitation of pairwise testing?",
        [
          "Часто покриває допустимі пари меншим набором, але не гарантує покриття взаємодій трьох параметрів",
          "Вона повністю замінює автоматизовані тести",
          "Вона працює лише з двома розробниками",
          "Вона автоматично пише код",
        ],
        0,
      ), optionsEn: ["It often covers valid value pairs with fewer cases but does not guarantee three-way interaction coverage", "It completely replaces automated tests", "It only works with two developers", "It automatically writes production code"] },
    ],
  ),
  lesson(
    "qt-ad-risk",
    "Ризик-орієнтоване тестування",
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
        "Як ризик впливає на пріоритет перевірок?",
        "Risk-based testing:",
        ["зазвичай більше уваги приділяють ділянкам із високим оціненим ризиком", "завжди тестують усе однаково", "ігнорують критичні шляхи", "перевіряють лише низький ризик"],
        0,
      ), optionsEn: ["Usually give more attention to areas with high assessed risk", "Always test everything equally", "Ignore critical paths", "Only low risk"] },
      { ...mcq(
        "qt-ad4",
        "Ризик оцінюють за:",
        "Risk often combines:",
        ["ймовірність і вплив", "лише колір у трекері", "лише довжину заголовка", "лише ім'я виконавця"],
        0,
      ), optionsEn: ["Likelihood and impact", "Only the Jira color", "Only title length", "Only the assignee"] },
      { ...matchEx(
        "qt-art-27",
        "Розрахунок пріоритету ризику в Risk-Based Testing",
        "Risk Priority calculation in Risk-Based Testing",
        [
          { left: "Оцінка ризику", right: "Приклад: імовірність × вплив" },
          { left: "Вищий ризик", right: "Більше уваги за наявних ресурсів" },
          { left: "Нижчий ризик", right: "Менша глибина за узгодженим планом" },
        ],
      ), pairsEn: [
        { left: "Risk score", right: "Example: likelihood × impact" },
        { left: "Higher risk", right: "More attention within available resources" },
        { left: "Lower risk", right: "Less depth under an agreed plan" },
      ] },
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
        "Які перевірки часто є добрими кандидатами на автоматизацію?",
        "Good automation candidates:",
        [
          "стабільні, повторювані й цінні перевірки",
          "завжди лише одноразові дослідницькі сесії",
          "нестабільні перевірки інтерфейсу без цінності",
          "усе підряд без оцінки користі",
        ],
        0,
      ), optionsEn: ["Stable, repeatable, high-value checks", "Always one-off exploratory sessions", "Flaky UI checks with no value", "Everything without evaluating value"] },
      { ...mcq(
        "qt-au2",
        "Для якого кандидата варто спершу оцінити високу вартість підтримки?",
        "For which candidate should the team first assess high maintenance cost?",
        ["часто мінливий інтерфейс без стабільних селекторів", "чиста функція з чітким контрактом", "стабільний контракт API", "детермінований математичний розрахунок"],
        0,
        why("Мінливий інтерфейс може вимагати дорогого обслуговування, але критичний сценарій усе одно може виправдати автоматизацію або перевірку на іншому рівні.", "A changing UI may be costly to maintain, but a critical scenario may still justify automation or a check at another level."),
      ), optionsEn: ["A frequently changing interface without stable selectors", "A pure function with a clear contract", "A stable API contract", "A deterministic mathematical calculation"] },
      { ...mcq(
        "qt-art-28",
        "Що з переліченого є першочерговим кандидатом на автоматизацію?",
        "What is the top candidate for test automation?",
        [
          "Часті стабільні регресійні перевірки та перевірки API",
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
    "Віддача автоматизації та піраміда тестів",
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
        "Що враховують в оцінці віддачі автоматизації?",
        "Automation ROI considers:",
        ["витрати на створення й підтримку та користь від повторень і зниження ризику", "лише кількість рядків тесту", "лише назву фреймворку", "колір звіту"],
        0,
      ), optionsEn: ["Creation and maintenance costs and benefits from repetition and risk reduction", "Only lines of test code", "Only framework name", "Report color"] },
      { ...mcq(
        "qt-au4",
        "Чим тестова піраміда відрізняється від форми «ріжок морозива»?",
        "Pyramid vs ice cream:",
        ["у піраміді більше низькорівневих перевірок; у ріжку переважають високорівневі", "ріжок завжди ідеальний", "піраміда не має модульних тестів", "лише наскрізні тести завжди найкращі"],
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
        uk: "Частка успішних тестів залежить від вибраного набору і способу підрахунку. Якщо 90 тестів пройшли, а 10 пропущено, це 90/90 успішних серед виконаних, але не доказ, що всі 100 пройшли. Якщо пропущено оплату, її ризик залишається невідомим. Завжди показуйте чисельник, знаменник, пропуски та охоплені ризики; нестабільний тест може давати різні результати без змін продукту.",
        en: "The pass rate depends on the selected suite and counting method. If 90 tests passed and 10 were skipped, 90/90 executed tests passed, but that does not mean all 100 passed. If payment was skipped, its risk remains unknown. Always show the numerator, denominator, skipped tests, and risks covered; a flaky test can produce different results without a product change.",
      }),
      { ...mcq(
        "qt-m1",
        "Пройшли всі 90 виконаних тестів, але 10 тестів оплати пропущено. Який висновок коректний?",
        "All 90 executed tests passed, but 10 payment tests were skipped. Which conclusion is valid?",
        ["усі виконані тести пройшли, але результат перевірки оплати невідомий", "усі 100 тестів пройшли", "оплата гарантовано працює", "пропущені тести можна вважати успішними"],
        0,
        why("Вказуйте окремо успішні, виконані та пропущені тести, а також ризики неперевірених сценаріїв.", "Report passed, executed, and skipped tests separately, along with risks from untested scenarios."),
      ), optionsEn: ["All executed tests passed, but the payment check outcome is unknown", "All 100 tests passed", "Payment is guaranteed to work", "Skipped tests may be counted as passes"] },
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
        uk: "Пропущений дефект виявляють після узгодженого контрольного етапу, наприклад релізу. Визначте етап, період спостереження й набір унікальних дефектів однієї версії: наприклад, 2 знайдені після релізу з 10 загалом дають 20%. Якщо загалом не знайдено жодного, частку не визначено: не діліть на нуль. Порівнюйте однакові періоди та правила підрахунку, враховуйте тяжкість і контекст; пізніші знахідки можуть змінити результат.",
        en: "An escaped defect is discovered after an agreed checkpoint, such as release. Define the checkpoint, observation period, and set of unique defects for one release: for example, 2 found after release out of 10 total gives 20%. If no defects were found at all, the rate is undefined: do not divide by zero. Compare equal observation periods and counting rules, consider severity and context, and remember later discoveries can change the result.",
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
        "Для версії знайдено 8 унікальних дефектів до релізу й 2 після нього протягом визначеного періоду. Яка частка пропущених дефектів за правилом уроку?",
        "For one release, 8 unique defects were found before release and 2 after it within the defined period. What is the escape rate under this lesson's rule?",
        ["2 / 10 = 20%", "2 / 8 = 25%", "8 / 10 = 80%", "2 / 2 = 100%"],
        0,
        why("Знаменник — усі 10 знайдених дефектів тієї самої версії, а чисельник — 2 знайдені після контрольного етапу.", "The denominator is all 10 defects found for that release; the numerator is the 2 found after the checkpoint."),
      ), optionsEn: ["2 / 10 = 20%", "2 / 8 = 25%", "8 / 10 = 80%", "2 / 2 = 100%"] },
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
          "Дефект відтворюється лише в IE11. Політика команди не підтримує цей браузер і дозволяє відкласти або закрити такі проблеми. Яке рішення відповідає політиці?",
          "A defect reproduces only in IE11. The team's policy does not support this browser and permits deferring or closing such issues. Which decision follows that policy?",
          [
            "Узгодити нижчий пріоритет або закриття за політикою та зафіксувати причину",
            "Негайно зупинити реліз і розбудити розробників вночі",
            "Переписати весь фронтенд на React 15",
            "Видалити баг-репорт без коментарів",
          ],
          0,
          why("Непідтримувана платформа впливає на пріоритет за цією політикою; рішення й причину фіксують, а винятки та потреби користувачів уточнюють.", "An unsupported platform affects priority under this policy; record the decision and reason, and clarify exceptions and user needs."),
        ), optionsEn: ["Agree on lower priority or closure under the policy and record the reason", "Stop the release immediately and wake the developers", "Rewrite the entire frontend in React 15", "Delete the report without comment"] },
        { ...matchEx(
          "qa-scen-2",
          "За оцінкою цієї команди зіставте тяжкість і пріоритет зі сценаріями. Наступний річний експорт — через багато місяців, а публічний запуск сайту — сьогодні.",
          "Using this team's assessment, match severity and priority to the scenarios. The next annual export is many months away, while the public site launches today.",
          [
            { left: "Висока тяжкість, високий пріоритет", right: "Платіжний шлюз у продакшені недоступний для всіх" },
            { left: "Висока тяжкість, низький пріоритет", right: "Річний експорт повністю недоступний, але до наступного використання ще багато місяців" },
            { left: "Низька тяжкість, високий пріоритет", right: "Назва компанії написана з помилкою в логотипі перед сьогоднішнім запуском" },
            { left: "Низька тяжкість, низький пріоритет", right: "Кнопка у футері зміщена на піксель і залишається доступною" },
          ],
        ), pairsEn: [
          { left: "High severity, high priority", right: "The production payment gateway is unavailable to everyone" },
          { left: "High severity, low priority", right: "The annual export is completely unavailable, but its next use is many months away" },
          { left: "Low severity, high priority", right: "The company name is misspelled in the logo before today's launch" },
          { left: "Low severity, low priority", right: "A footer button is one pixel out of alignment but remains accessible" },
        ] },
        { ...mcq(
          "qa-scen-2b",
          "Що зазначити у звіті, якщо дефект відтворюється нестабільно?",
          "Intermittent bug report criterion: what should be explicitly stated?",
          [
            "Частоту відтворення (наприклад, 3 з 10 спроб), умови та доступні очищені докази",
            "Заборонити реліз назавжди",
            "Написати 'іноді не працює' без жодних логів",
            "Видалити функцію",
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
        { ...matchEx(
          "qa-scen-3",
          "Сума вводиться з точністю до копійки. До 1000 грн знижки немає, від 1000 до 4999,99 грн — 10%, від 5000 грн — 20%; знижки не сумуються. Зіставте межі та значення:",
          "Amounts use kopeck precision. Below 1000 UAH the discount is 0%, from 1000 to 4999.99 it is 10%, and from 5000 it is 20%; discounts do not stack. Match boundaries and values:",
          [
            { left: "Межа 1000 грн", right: "999,99 грн (0%) та 1000,00 грн (10%)" },
            { left: "Межа 5000 грн", right: "4999,99 грн (10%) та 5000,00 грн (20%)" },
            { left: "Вище 5000 грн", right: "5000,01 грн (20%)" },
          ],
        ), pairsEn: [
          { left: "1000 UAH boundary", right: "999.99 UAH (0%) and 1000.00 UAH (10%)" },
          { left: "5000 UAH boundary", right: "4999.99 UAH (10%) and 5000.00 UAH (20%)" },
          { left: "Above 5000 UAH", right: "5000.01 UAH (20%)" },
        ] },
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
          "Поле приймає цілий вік від 1 до 120 років включно. Які три значення перевірити біля нижньої межі?",
          "A field accepts integer ages from 1 to 120 inclusive. Which three values should be checked around the lower boundary?",
          [
            "0 (перед межею), 1 (на межі), 2 (після межі)",
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
        { ...matchEx(
          "qa-scen-5",
          "За контрактом цього API зіставте статуси зі сценаріями: 400 — тіло не відповідає схемі, 401 — відсутня або прострочена автентифікація, 403 — недостатньо прав, 409 — наявний email, 422 — семантична помилка.",
          "For this API contract, match codes to scenarios: 400 for a body that fails schema validation, 401 for missing or expired authentication, 403 for insufficient permissions, 409 for an existing email, and 422 for a semantic error.",
          [
            { left: "400 Bad Request", right: "Тіло запиту не відповідає JSON-схемі" },
            { left: "401 Unauthorized", right: "Токен автентифікації відсутній або прострочений" },
            { left: "403 Forbidden", right: "Автентифікований користувач не має дозволу" },
            { left: "409 Conflict", right: "Спроба зареєструвати наявний email" },
            { left: "422 Unprocessable Entity", right: "Семантична помилка валідації бізнес-полів" },
          ],
        ), pairsEn: [
          { left: "400 Bad Request", right: "Request body fails JSON schema validation" },
          { left: "401 Unauthorized", right: "Authentication token is missing or expired" },
          { left: "403 Forbidden", right: "Authenticated user lacks permission" },
          { left: "409 Conflict", right: "Attempt to register an existing email" },
          { left: "422 Unprocessable Entity", right: "Semantic validation error in business fields" },
        ] },
        { ...mcq(
          "qa-scen-6",
          "Що ще варто перевірити за контрактом і ризиками API, окрім успішної відповіді 200?",
          "What else should be checked against the API contract and risks besides a successful 200 response?",
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
        { ...matchEx(
          "qa-scen-8",
          "Зіставте критерії тестування",
          "Match testing criteria",
          [
            { left: "Ідемпотентність", right: "Повторні ідентичні запити мають той самий запланований ефект, що й один" },
            { left: "Нестабільний тест", right: "Тест дає різні результати без відповідних змін продукту" },
            { left: "Регресія", right: "Зміна порушує функціональність, що працювала раніше" },
          ],
        ), pairsEn: [
          { left: "Idempotency", right: "Repeated identical requests have the same intended effect as one" },
          { left: "Flaky test", right: "A test gives inconsistent results without relevant product changes" },
          { left: "Regression", right: "A change breaks previously working behavior" },
        ] },
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
        { ...matchEx(
          "qa-scen-10",
          "Зіставте типи очікуваних результатів",
          "Match expected result types",
          [
            { left: "Відгук інтерфейсу", right: "Зміна кольору, показ банера, стан фокусу" },
            { left: "Збереження даних", right: "Запис збережено в БД без спотворення" },
            { left: "Відповідь API", right: "HTTP-статус і валідне JSON-тіло" },
          ],
        ), pairsEn: [
          { left: "UI feedback", right: "Color change, banner display, focus state" },
          { left: "Data persistence", right: "Record saved without corruption" },
          { left: "API response", right: "HTTP status and valid JSON body" },
        ] },
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
        { ...matchEx(
          "qt-rpr2",
          "Зіставте секцію тест-плану з її конкретним змістом для ForgeBoard",
          "Match test plan section to concrete ForgeBoard content",
          [
            { left: "Обсяг перевірок", right: "CRUD задач, фільтрація, перевірка власника (401/403)" },
            { left: "Тестові дані / фікстури", right: "Користувач A (власник), користувач B, межові заголовки 0/1/120/121" },
            { left: "Критерії завершення", right: "Усі високоризикові перевірки авторизації та регресійні перевірки API/UI пройдено" },
          ],
        ), pairsEn: [
          { left: "Scope / in-scope", right: "Task CRUD, filtering, ownership checks (401/403)" },
          { left: "Test data / fixtures", right: "User A (owner), user B, title boundaries 0/1/120/121" },
          { left: "Exit criteria", right: "All high-risk authorization and API/UI regression checks pass" },
        ] },
        { ...codeOrderAuto(
          "qt-rpr3",
          "Упорядкуйте розділи прикладу баг-репорту: середовище, відтворення, результати, вплив",
          "Order the sections of this example bug report: environment, reproduction, results, impact",
          "text",
          [
            "Record environment: version, browser, OS, and role",
            "Provide preconditions and reproduction steps",
            "Compare expected and actual results",
            "Record severity and impact",
          ],
          why(
            "Це один із можливих форматів: контекст, кроки та результати допомагають дослідити дефект; порядок полів залежить від процесу команди.",
            "This is one possible format: context, steps, and results help investigate the defect; field order depends on the team's process.",
          ),
        ), linesUk: [
          "Надати передумови та кроки відтворення",
          "Порівняти очікуваний і фактичний результат",
          "Вказати тяжкість і вплив",
          "Зафіксувати середовище: версію, браузер, ОС та роль",
        ] },
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
        uk: "Почніть із вимог і наслідків помилки: перевірте ціну, оплату, доступ і залишки. Уточніть правила повторного запиту та резервування товару. Наприклад, коли залишилася одна одиниця, одночасні замовлення не мають обидва підтвердити продаж цієї одиниці, якщо так визначено бізнес-правилом; перевірте результат і збережений стан. Розподіліть перевірки між модульними, інтеграційними та наскрізними тестами, доповніть їх дослідницьким тестуванням. Узгодьте критерії випуску та рішення щодо залишкових ризиків із командою.",
        en: "For a new checkout, start with requirements and consequences of failure: examine price calculation, payment, access, and stock. Clarify retry and stock-reservation rules. For example, when one item remains, concurrent orders must not both confirm its sale if that is the agreed business rule; check the result and persisted state. Distribute checks across unit, integration, and end-to-end tests, supplemented by exploratory testing. Agree on release criteria and decisions about residual risks with the team.",
      }),
      { ...mcq("qt-c1", "Які зони оформлення потенційно високоризикові?", "Which checkout areas should be considered potentially high risk?", ["Оплата, доступ, розрахунок ціни та залишки", "Лише колір футера", "Лише favicon", "Лише сторінка про компанію"], 0), optionsEn: ["Payment, access, price calculation, and stock", "Only footer color", "Only the favicon", "Only the about page"] },
      { ...mcq("qt-c2", "Яке поєднання дає корисний початковий набір перевірок?", "Which combination provides a useful starting set of checks?", ["Модульні тести розрахунку, інтеграція API і критичний наскрізний сценарій", "Один ручний клік назавжди", "Лише навантажувальне тестування", "Лише перевірка доступності"], 0), optionsEn: ["Calculation unit tests, API integration, and a critical end-to-end path", "One manual click forever", "Only load testing", "Only accessibility testing"] },
      { ...mcq("qt-c3", "За правилом сума замовлення — ціле число від 1 до 1000 включно. Які техніки допоможуть її перевірити?", "The order total must be an integer from 1 through 1000 inclusive. Which techniques help test it?", ["Класи еквівалентності та граничні значення", "Лише скріншот", "Лише перевірка правопису", "Лише ping"], 0, why("Представники класів і межі доповнюють одне одного; для цілого діапазону перевірте, наприклад, 0, 1, 1000 і 1001.", "Class representatives and boundary values complement each other; for this integer range check, for example, 0, 1, 1000, and 1001.")), optionsEn: ["Equivalence partitioning and boundary value analysis", "Only a screenshot", "Only spellchecking", "Only ping"] },
      { ...mcq("qt-c4", "Який приклад узгоджених критеріїв завершення тестування перед випуском?", "Which is an example of agreed testing exit criteria before release?", ["Критичні дефекти закрито, а димові перевірки пройшли", "Будь-які критичні дефекти автоматично прийнятні", "Тести не запускалися", "Випуск відбувається навмання"], 0), optionsEn: ["Critical defects are closed and smoke checks pass", "Any critical defects are automatically acceptable", "No tests were run", "Release happens at random"] },
      { ...mcq("qt-c5", "За погодженим правилом залишилась одна одиниця товару, а два покупці одночасно підтверджують замовлення. Що перевірити?", "Under the agreed rule, one item remains and two customers confirm orders concurrently. What should you check?", ["не більше одного підтвердженого продажу, узгоджені відповіді й залишок у сховищі", "лише те, що обидві сторінки завантажились", "лише колір кнопки оплати", "що обидва замовлення завжди підтверджені"], 0, why("Перевірка конкурентного сценарію має охопити відповіді та збережений стан; очікувана поведінка залежить від узгодженого правила резервування.", "A concurrency check covers responses and persisted state; expected behavior depends on the agreed reservation rule.")), optionsEn: ["At most one confirmed sale, consistent responses, and the persisted stock", "Only that both pages loaded", "Only the payment button color", "That both orders are always confirmed"] },
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
