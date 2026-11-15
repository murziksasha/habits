import type { CourseContent, LessonContent, UnitContent } from "../types.js";
import { expandCourse, sectionUnit, teachLesson } from "./factory.js";

export const newUnits: UnitContent[] = [
  sectionUnit(
    "test_data_mgmt",
    "Тестові дані: синтетика, PII, оновлення",
    "Test data: synthetics, PII, and refresh",
    [
      {
        slug: "qt-td-synthetic",
        titleUk: "Синтетичні дані замість копії продакшену",
        titleEn: "Synthetic data instead of a production copy",
        difficulty: 3,
        pointsUk: ["Синтетика з правилами домену, не випадковий шум", "Відтворюваний генератор із seed", "Маскування не завжди знімає ідентифікацію"],
        pointsEn: ["Synthetics from domain rules, not random noise", "A reproducible generator with a seed", "Masking does not always remove identifiability"],
        conceptUk: "Копія продакшену в QA дає «реалізм», але тягне персональні дані, секрети й юридичний ризик. Синтетичний набір будують за правилами домену: розподіл сум, рідкісні межі, зв'язки зовнішніх ключів, а не випадковий шум. Генератор має бути відтворюваним (seed), щоб падіння тесту можна було повторити. «Схоже на прод» перевіряють метриками (розподіл, частка порожніх полів), не на око. Маскування прод-даних — запасний варіант, але погане маскування (ті самі унікальні суми) все одно ідентифікує людей.",
        conceptEn: "A production copy in QA feels 'realistic' but carries personal data, secrets, and legal risk. A synthetic set is built from domain rules: the distribution of amounts, rare boundaries, foreign-key relations, not random noise. The generator must be reproducible (a seed) so a failing test can be rerun. 'Looks like prod' is checked with metrics (distribution, share of empty fields), not by eye. Masking prod data is a fallback, but poor masking (the same unique amounts) still identifies people.",
        code: "generateOrders({ seed: 42, count: 10_000, maxLines: 30, emptyAddressRate: 0.02 });",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Чому випадкові рядки з літер погано замінюють імена в тестовій БД замовлень?", promptEn: "Why are random letter strings a poor substitute for names in an orders test database?", options: ["вони не відтворюють довжину, абетку й колізії, тож тести не ловлять реальні крайні випадки", "ім'я не можна зберігати навіть синтетично", "випадковість заборонена в SQL", "генератор тоді не має seed"], correctIndex: 0, explanationUk: "Дані мають зберегти форму домену.", explanationEn: "The data must keep the shape of the domain." },
          { kind: "fill", promptUk: "Допишіть параметр відтворюваності генератора", promptEn: "Fill in the generator reproducibility parameter", language: "javascript", code: "generateOrders({ ___: 42, count: 10_000 });", accepted: ["seed"], caseSensitive: true, explanationUk: "seed фіксує послідовність.", explanationEn: "A seed fixes the sequence." },
          { kind: "mcq", promptUk: "Що перевірити, щоб синтетика «була схожа на прод»?", promptEn: "What should you check so synthetics 'look like prod'?", options: ["розподіл ключових полів, частку порожніх, цілісність зв'язків", "лише кількість рядків", "колір дашборда", "час відповіді CI"], correctIndex: 0, explanationUk: "Метрики форми, не лише обсяг.", explanationEn: "Shape metrics, not only volume." }
        ],
        whyUk: "Чому для QA краще синтетичні замовлення з seed, ніж повна копія продакшену?",
        whyEn: "Why are synthetic orders with a seed better for QA than a full production copy?",
        ideas: [{ labelUk: "без PII", labelEn: "without PII", anyOf: ["pii", "персонал", "personal", "прод", "prod", "юридич"] }, { labelUk: "відтворюваність", labelEn: "reproducibility", anyOf: ["seed", "відтвор", "reproduc", "падін", "fail"] }, { labelUk: "форма домену", labelEn: "domain shape", anyOf: ["розподіл", "distribution", "меж", "boundar", "зв'язк"] }],
        sampleUk: "Синтетика з правилами домену й seed дає відтворювані крайні випадки без персональних даних продакшену, тоді як копія прод тягне юридичний ризик, а слабке маскування все одно ідентифікує людей.",
        sampleEn: "Synthetics with domain rules and a seed give reproducible edge cases without production personal data, whereas a prod copy carries legal risk, and weak masking still identifies people.",
      },
      {
        slug: "qt-td-pii",
        titleUk: "PII в тестових середовищах: мінімізація й контроль доступу",
        titleEn: "PII in test environments: minimization and access control",
        difficulty: 3,
        pointsUk: ["Мінімальний зріз, маскування, обмежений доступ", "Знищення після фіксу, не в CI-логах", "Тестові паролі не копіюють прод"],
        pointsEn: ["A minimal slice, masking, and limited access", "Destruction after the fix, not in CI logs", "Test passwords do not copy production"],
        conceptUk: "Якщо без фрагмента реальних даних не обійтись (рідкісний баг), беруть мінімальний зріз, маскують прямі ідентифікатори (ім'я, email, телефон, документ), шифрують носій і обмежують доступ списком людей на час розслідування. Після фіксу дані знищують за протоколом, не лишають у CI-артефактах і логах. Тестові облікові записи не повинні мати ті самі паролі, що в прод. Журнал доступу до QA-БД — частина відповідності. «У нас внутрішня мережа» не є підставою зберігати повний дамп паспортів.",
        conceptEn: "If you cannot avoid a fragment of real data (a rare bug), take a minimal slice, mask direct identifiers (name, email, phone, document), encrypt the medium, and limit access to a named list for the investigation. After the fix, destroy the data by protocol; do not leave it in CI artefacts and logs. Test accounts must not share production passwords. An access log for the QA database is part of compliance. 'We have an internal network' is not a reason to keep a full dump of passports.",
        code: "// reproduce with a 20-row masked slice, ticket TTL 7 days, then shred",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Що зробити з дампом, який допоміг відтворити баг, після релізу фіксу?", promptEn: "What should you do with a dump that helped reproduce a bug, after the fix is released?", options: ["знищити за протоколом і прибрати з CI-артефактів", "залишити «про всяк випадок» на спільній шарі", "залити в публічний чат команди", "імпортувати на ноутбуки всіх"], correctIndex: 0, explanationUk: "Мета досягнута — дані більше не потрібні.", explanationEn: "The goal is met — the data is no longer needed." },
          { kind: "fill", promptUk: "Допишіть принцип «якнайменше персональних даних»", promptEn: "Fill in the 'as little personal data as possible' principle", language: "javascript", code: "// data ___isation: keep only the columns that reproduce the bug", accepted: ["minim", "minimization", "minimisation"], caseSensitive: true, explanationUk: "Мінімізація обсягу PII.", explanationEn: "Minimization of PII volume." },
          { kind: "mcq", promptUk: "Чому однаковий пароль admin/admin у прод і QA небезпечний навіть «всередині офісу»?", promptEn: "Why is the same admin/admin password in prod and QA dangerous even 'inside the office'?", options: ["компрометація тестового середовища дає ключ до продакшену", "паролі в QA заборонені взагалі", "офісна мережа шифрує паролі сама", "QA не може ходити в мережу"], correctIndex: 0, explanationUk: "Секрети середовищ розділяють.", explanationEn: "Environment secrets are separated." }
        ],
        whyUk: "Як коротко тримати фрагмент реальних даних для рідкісного бага?",
        whyEn: "How do you briefly keep a fragment of real data for a rare bug?",
        ideas: [{ labelUk: "мінімальний зріз", labelEn: "a minimal slice", anyOf: ["мінімал", "minimal", "зріз", "slice", "маск"] }, { labelUk: "обмежений доступ", labelEn: "limited access", anyOf: ["доступ", "access", "журнал", "log", "список"] }, { labelUk: "знищити після фіксу", labelEn: "destroy after the fix", anyOf: ["знищ", "destroy", "артефакт", "artefact", "ci"] }],
        sampleUk: "Беруть мінімальний замаскований зріз із журналом доступу, секрети QA не копіюють прод, а після фіксу дані знищують і прибирають з артефактів CI.",
        sampleEn: "You take a minimal masked slice with an access log, QA secrets do not copy production, and after the fix the data is destroyed and removed from CI artefacts.",
      },
      {
        slug: "qt-td-refresh",
        titleUk: "Оновлення стенда: свіжість, ізоляція тестів, золотий образ",
        titleEn: "Refreshing a stand: freshness, test isolation, and a golden image",
        difficulty: 3,
        pointsUk: ["Стенд оновлюють автоматично й димлять після цього", "Тести ізольовані фікстурами, не ручними рядками", "Золотий образ версіонується зі схемою"],
        pointsEn: ["The stand is refreshed automatically and smoked afterwards", "Tests are isolated with fixtures, not manual rows", "The golden image is versioned with the schema"],
        conceptUk: "Застарілий стенд розходиться зі схемою продакшену: тести зелені, а реліз падає. Оновлення за розкладом (нічний образ) або від міграцій CI має бути автоматичним і документованим. Після оновлення проганяють димовий набір. Тести не повинні залежати від «ручного» рядка, який хтось ввів у вівторок: кожен тест готує і прибирає свої дані (фікстури), або працює з унікальними ідентифікаторами. Золотий образ (golden image) версіонується разом зі схемою. Паралельні пайплайни не ділять один брудний набір.",
        conceptEn: "A stale stand drifts from the production schema: tests stay green and the release fails. A scheduled refresh (a nightly image) or CI migrations must be automatic and documented. After a refresh, a smoke suite runs. Tests must not depend on a 'manual' row someone typed on Tuesday: each test prepares and tears down its own data (fixtures), or uses unique identifiers. A golden image is versioned with the schema. Parallel pipelines do not share one dirty set.",
        code: "beforeEach(() => db.seed(uniqueOrder()));\nafterEach(() => db.cleanup(testId));",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Чому тест, що шукає користувача з email qa@test.com, крихкий на спільному стенді?", promptEn: "Why is a test that looks up a user with email qa@test.com fragile on a shared stand?", options: ["рядок могли змінити, видалити або зайняти інші тести", "email не можна використовувати в тестах ніколи", "стінд не має таблиці користувачів", "CI забороняє email"], correctIndex: 0, explanationUk: "Готуйте унікальні дані в самому тесті.", explanationEn: "Prepare unique data inside the test itself." },
          { kind: "fill", promptUk: "Допишіть коротку перевірку після оновлення стенда", promptEn: "Fill in a short check after a stand refresh", language: "javascript", code: "await run___Suite(); // health + critical paths", accepted: ["Smoke", "smoke"], caseSensitive: true, explanationUk: "Димовий набір після оновлення.", explanationEn: "A smoke suite after the refresh." },
          { kind: "mcq", promptUk: "Навіщо версіонувати золотий образ разом із міграціями?", promptEn: "Why version the golden image together with migrations?", options: ["щоб схема даних і образ не розійшлись, і відтворення бага було можливим", "образ не можна зберігати в git LFS ніколи", "міграції тоді не потрібні", "CI ігнорує версії"], correctIndex: 0, explanationUk: "Відтворюваний базис.", explanationEn: "A reproducible baseline." }
        ],
        whyUk: "Як не дати паралельним тестам зіпсувати один спільний рядок?",
        whyEn: "How do you stop parallel tests from ruining one shared row?",
        ideas: [{ labelUk: "власні фікстури", labelEn: "own fixtures", anyOf: ["фікстур", "fixture", "унікаль", "unique", "прибир", "teardown"] }, { labelUk: "не ручний рядок", labelEn: "not a manual row", anyOf: ["ручн", "manual", "email", "спільн", "shared"] }, { labelUk: "свіжий образ", labelEn: "a fresh image", anyOf: ["образ", "image", "smoke", "міграц", "migrat"] }],
        sampleUk: "Кожен тест готує й прибирає унікальні фікстури, спільного ручного рядка немає, а стенд оновлюють автоматично й перевіряють димовим набором на золотому образі.",
        sampleEn: "Each test prepares and tears down unique fixtures, there is no shared manual row, and the stand is refreshed automatically and checked with a smoke suite on a golden image.",
      }
    ],
    "Контрольна: тестові дані",
    "Exam: test data",
    [
      { promptUk: "Повна копія продакшену в QA…", promptEn: "A full production copy in QA is…", options: ["ризикована через PII; краща синтетика з правилами домену", "завжди найкращий варіант", "обов'язкова для ISO", "замінює seed"], correctIndex: 0, explanationUk: "Мінімізуйте персональні дані.", explanationEn: "Minimize personal data." },
      { promptUk: "seed у генераторі потрібен, щоб…", promptEn: "A seed in the generator is needed so…", options: ["падіння можна відтворити", "дані ніколи не повторювались", "приховати PII", "замінити міграції"], correctIndex: 0, explanationUk: "Відтворюваність.", explanationEn: "Reproducibility." },
      { promptUk: "Після фіксу рідкісного бага зріз реальних даних…", promptEn: "After fixing a rare bug, a slice of real data is…", options: ["знищують за протоколом", "залишають назавжди на шарі", "комітять у репозиторій тестів", "розсилають у Slack"], correctIndex: 0, explanationUk: "Мета досягнута.", explanationEn: "The goal is met." },
      { promptUk: "Тест, що залежить від ручного рядка на спільному стенді…", promptEn: "A test that depends on a manual row on a shared stand is…", options: ["крихкий: дані хтось змінить", "ідеально ізольований", "швидший за фікстури завжди", "обов'язковий для диму"], correctIndex: 0, explanationUk: "Готуйте дані в тесті.", explanationEn: "Prepare data in the test." }
    ],
  ),
  sectionUnit(
    "contract_testing",
    "Контракти API, схеми й сумісність",
    "API contracts, schemas, and compatibility",
    [
      {
        slug: "qt-contract-pact",
        titleUk: "Контрактний тест: споживач фіксує очікування",
        titleEn: "A contract test: the consumer pins expectations",
        difficulty: 3,
        pointsUk: ["Споживач фіксує очікування, провайдер перевіряє їх у своєму CI", "Контракт не замінює бізнес-тести провайдера", "Не підганяйте очікування мовчки під зламану відповідь"],
        pointsEn: ["The consumer pins expectations, the provider verifies them in its CI", "A contract does not replace the provider's business tests", "Do not quietly bend expectations to a broken response"],
        conceptUk: "У підході consumer-driven (Pact тощо) клієнт записує очікувані запити й відповіді як контракт; провайдер проганяє його у своєму CI проти реальних ендпоінтів (з тестовими даними). Це ловить розрив раніше, ніж енд-ту-енд у UI. Контракт — не повна специфікація продукту й не заміна перевірок бізнес-правил на провайдері. Версіонуйте контракти, не редагуйте «тихо» очікування, щоб зелений пайплайн сховав несумісність. Брокер контрактів зберігає хто з ким узгоджений для релізу.",
        conceptEn: "In a consumer-driven approach (Pact and similar), the client records expected requests and responses as a contract; the provider runs it in its CI against real endpoints (with test data). That catches a break earlier than a UI end-to-end test. A contract is not a full product specification and does not replace business-rule checks on the provider. Version contracts; do not quietly edit expectations so a green pipeline hides an incompatibility. A contract broker stores who is aligned with whom for a release.",
        code: "// consumer records: GET /orders/1 → 200 { id, status }\n// provider CI: verify pact against the real app",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Що робити, якщо контракт упав після зміни поля в API?", promptEn: "What should you do if a contract fails after an API field change?", options: ["узгодити зміну зі споживачем і випустити нову версію контракту, не «підкручувати» тест", "вимкнути контракт назавжди", "змінити лише UI e2e", "ігнорувати, якщо 200 ще є"], correctIndex: 0, explanationUk: "Падіння — сигнал несумісності.", explanationEn: "The failure is a compatibility signal." },
          { kind: "fill", promptUk: "Допишіть назву підходу, де клієнт задає контракт", promptEn: "Fill in the name of the approach where the client sets the contract", language: "javascript", code: "___-driven contract testing", accepted: ["consumer", "Consumer"], caseSensitive: true, explanationUk: "Consumer-driven contracts.", explanationEn: "Consumer-driven contracts." },
          { kind: "mcq", promptUk: "Чому сам контракт недостатній як єдиний тест платежів?", promptEn: "Why is a contract alone not enough as the only payment test?", options: ["він фіксує форму запиту/відповіді, а не всі бізнес-правила списання", "контракти заборонені для грошей", "Pact не вміє HTTPS", "провайдер не може запускати контракт"], correctIndex: 0, explanationUk: "Доменні інваріанти — окремі тести.", explanationEn: "Domain invariants are separate tests." }
        ],
        whyUk: "Хто пише consumer-driven контракт і хто його перевіряє?",
        whyEn: "Who writes a consumer-driven contract and who verifies it?",
        ideas: [{ labelUk: "пише споживач", labelEn: "the consumer writes it", anyOf: ["спожив", "consumer", "очікуван", "expect"] }, { labelUk: "перевіряє провайдер", labelEn: "the provider verifies it", anyOf: ["провайдер", "provider", "ci"] }, { labelUk: "не підганяти мовчки", labelEn: "do not quietly bend it", anyOf: ["підганя", "quiet", "версі", "version", "брокер", "broker"] }],
        sampleUk: "Споживач записує очікування, провайдер перевіряє їх у своєму CI; якщо API змінилось, узгоджують нову версію контракту, а не підганяють тест мовчки, і бізнес-правила лишають окремими.",
        sampleEn: "The consumer records expectations, the provider verifies them in its CI; if the API changed, you agree a new contract version rather than quietly bending the test, and business rules stay separate.",
      },
      {
        slug: "qt-schema-json",
        titleUk: "Схема відповіді: JSON Schema і злам полів",
        titleEn: "A response schema: JSON Schema and broken fields",
        difficulty: 3,
        pointsUk: ["Валідація відповіді стенда проти схеми в CI", "additionalProperties: false проти тіньових полів", "Приклади в документації не можуть суперечити схемі"],
        pointsEn: ["Validate the stand's response against the schema in CI", "additionalProperties: false against shadow fields", "Documentation examples must not contradict the schema"],
        conceptUk: "JSON Schema (або OpenAPI) описує типи, обов'язкові поля, переліки. У CI відповідь реального стенда валідують проти схеми: зникле поле, зміна рядка на число, новий обов'язковий параметр без значення за замовчуванням — червоний тест. additionalProperties: false ловить неоголошені поля, які клієнти можуть почати використовувати неофіційно (і тоді ви не зможете їх прибрати). Схему рев'юють як код. Приклад у документації, що розходиться зі схемою, гірший за відсутність прикладу: йому вірять.",
        conceptEn: "JSON Schema (or OpenAPI) describes types, required fields, and enums. In CI the real stand's response is validated against the schema: a missing field, a string becoming a number, a new required parameter without a default — a red test. additionalProperties: false catches undeclared fields that clients may start using unofficially (and then you cannot remove them). The schema is reviewed like code. A docs example that disagrees with the schema is worse than no example: people trust it.",
        code: "{ \"type\": \"object\", \"required\": [\"id\", \"status\"], \"additionalProperties\": false }",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Що ловить additionalProperties: false?", promptEn: "What does additionalProperties: false catch?", options: ["поля, яких немає в схемі, але вони вже потрапили у відповідь", "лише відсутність обов'язкових полів", "повільність API", "код відповіді 500"], correctIndex: 0, explanationUk: "Неоголошені поля стають неформальним контрактом.", explanationEn: "Undeclared fields become an informal contract." },
          { kind: "fill", promptUk: "Допишіть ключове слово обов'язкових полів JSON Schema", promptEn: "Fill in the JSON Schema keyword for required fields", language: "javascript", code: "{ \"type\": \"object\", \"___\": [\"id\", \"status\"] }", accepted: ["required"], caseSensitive: true, explanationUk: "Ключ — required.", explanationEn: "The key is required." },
          { kind: "mcq", promptUk: "Чому приклад у README, де status — число, а в схемі — рядок, шкідливий?", promptEn: "Why is a README example where status is a number, while the schema says string, harmful?", options: ["інтегратори копіюють приклад і будують несумісний клієнт", "приклади завжди важливіші за схему", "JSON Schema ігнорує рядки", "README не читають"], correctIndex: 0, explanationUk: "Документація — частина контракту.", explanationEn: "Documentation is part of the contract." }
        ],
        whyUk: "Як CI має ловити злам поля status у відповіді API?",
        whyEn: "How should CI catch a break of the status field in an API response?",
        ideas: [{ labelUk: "валідація проти схеми", labelEn: "validation against the schema", anyOf: ["схем", "schema", "json", "openapi", "ci"] }, { labelUk: "обов'язкові поля", labelEn: "required fields", anyOf: ["required", "обов'язков", "тип", "type"] }, { labelUk: "чесні приклади", labelEn: "honest examples", anyOf: ["приклад", "example", "readme", "супереч", "contradict"] }],
        sampleUk: "CI валідує відповідь стенда проти JSON Schema, required ловить зниклі поля, additionalProperties — тіньові, а приклади в документації мають збігатися зі схемою.",
        sampleEn: "CI validates the stand's response against JSON Schema, required catches missing fields, additionalProperties catches shadow ones, and documentation examples must match the schema.",
      },
      {
        slug: "qt-backward-compat",
        titleUk: "Зворотна сумісність: що можна змінити в API",
        titleEn: "Backward compatibility: what you may change in an API",
        difficulty: 3,
        pointsUk: ["Додавати необов'язкове — сумісно; прибирати й перейменовувати — ні", "Несумісне — нова версія і період співіснування", "Старий клієнт проти нової відповіді — обов'язковий тест"],
        pointsEn: ["Adding optional fields is compatible; removing and renaming is not", "Incompatible changes need a new version and a coexistence period", "An old client against the new response is a required test"],
        conceptUk: "Сумісна зміна: додати необов'язкове поле, новий ендпоінт, новий код відповіді, який старі клієнти ігнорують за узгодженням. Несумісна: прибрати чи перейменувати поле, змінити тип, зробити необов'язкове обов'язковим, змінити семантику коду 200, ламати пагінацію. Такі зміни потребують нової версії (URL або заголовок) і періоду співіснування, плюс оголошення deprecation. Тест сумісності — старий клієнт (записаний контракт або фікстура) проти нової відповіді. «Ми всі все оновимо в один день» рідко спрацьовує з мобільними додатками.",
        conceptEn: "A compatible change: add an optional field, a new endpoint, a new status that old clients ignore by agreement. An incompatible one: remove or rename a field, change a type, make an optional field required, change the meaning of 200, break pagination. Those need a new version (URL or header) and a coexistence period, plus a deprecation notice. A compatibility test is an old client (a recorded contract or fixture) against the new response. 'We will all update on one day' rarely works with mobile apps.",
        code: "// compatible: add optional { discount? }\n// breaking: rename status → state  ⇒ /v2 + deprecation on /v1",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Чи сумісно зробити поле email обов'язковим, якщо старі клієнти його не надсилали?", promptEn: "Is it compatible to make the email field required if old clients did not send it?", options: ["ні, це зламає старі запити", "так, бо email «і так всім потрібен»", "так, якщо є 200", "сумісність не стосується тіла запиту"], correctIndex: 0, explanationUk: "Нова вимога до старих клієнтів — розрив.", explanationEn: "A new demand on old clients is a break." },
          { kind: "fill", promptUk: "Допишіть період оголошеного застаріння", promptEn: "Fill in the announced deprecation period", language: "javascript", code: "// Sunset: header + docs; keep v1 during ___ period", accepted: ["deprecation", "grace", "coexistence"], caseSensitive: true, explanationUk: "Співіснування версій.", explanationEn: "Version coexistence." },
          { kind: "mcq", promptUk: "Чому мобільний клієнт не оновлюється «в один день» разом з API?", promptEn: "Why does a mobile client not update 'on the same day' as the API?", options: ["користувачі довго лишаються на старій версії з магазину", "мобільні клієнти не ходять в API", "магазини оновлюють усі збірки миттєво", "версії API заборонені на мобільному"], correctIndex: 0, explanationUk: "Довгий хвіст старих збірок.", explanationEn: "A long tail of old builds." }
        ],
        whyUk: "Яка зміна API потребує нової версії, а яка ні?",
        whyEn: "Which API change needs a new version, and which does not?",
        ideas: [{ labelUk: "прибрати поле — нова версія", labelEn: "removing a field needs a new version", anyOf: ["прибрати", "remove", "переймен", "rename", "версі", "version"] }, { labelUk: "додати необов'язкове", labelEn: "adding an optional field", anyOf: ["необов'язков", "optional", "сумісн", "compatible"] }, { labelUk: "старий клієнт у тесті", labelEn: "an old client in the test", anyOf: ["старий", "old", "клієнт", "client", "мобільн", "mobile"] }],
        sampleUk: "Необов'язкове нове поле сумісне, а прибирання, перейменування чи новий обов'язковий параметр потребують нової версії, періоду співіснування й тесту старого клієнта — особливо з мобільними додатками.",
        sampleEn: "A new optional field is compatible, while removal, renaming, or a newly required parameter needs a new version, a coexistence period, and an old-client test — especially with mobile apps.",
      }
    ],
    "Контрольна: контракти",
    "Exam: contracts",
    [
      { promptUk: "Consumer-driven контракт пише…", promptEn: "A consumer-driven contract is written by…", options: ["споживач, а провайдер перевіряє в CI", "лише провайдер без клієнта", "лише відділ маркетингу", "автоматично браузер"], correctIndex: 0, explanationUk: "Очікування клієнта.", explanationEn: "The client's expectations." },
      { promptUk: "additionalProperties: false ловить…", promptEn: "additionalProperties: false catches…", options: ["неоголошені поля у відповіді", "лише відсутній id", "час відповіді", "CORS"], correctIndex: 0, explanationUk: "Тіньовий контракт.", explanationEn: "A shadow contract." },
      { promptUk: "Зробити необов'язкове поле обов'язковим…", promptEn: "Making an optional field required is…", options: ["несумісна зміна", "завжди сумісно", "лише документаційна правка", "ігнорується старими клієнтами безпечно завжди"], correctIndex: 0, explanationUk: "Потрібна нова версія.", explanationEn: "A new version is needed." },
      { promptUk: "Підганяти очікування контракту під зламану відповідь…", promptEn: "Bending contract expectations to a broken response is…", options: ["ховає несумісність, так не роблять", "єдиний правильний фікс", "обов'язково для Pact", "замінює версіонування"], correctIndex: 0, explanationUk: "Падіння — сигнал.", explanationEn: "The failure is a signal." }
    ],
  ),
  sectionUnit(
    "exploratory_charters",
    "Дослідницьке тестування: чартери, оракули, тури",
    "Exploratory testing: charters, oracles, and tours",
    [
      {
        slug: "qt-session-charter",
        titleUk: "Чартер сесії: мета, час, не сценарій на кліках",
        titleEn: "A session charter: a goal, a timebox, not a click script",
        difficulty: 2,
        pointsUk: ["Чартер задає мету й час, не кожен клік", "Після сесії — нотатки й дебрифінг", "Без чартера легко безцільно клікати"],
        pointsEn: ["The charter sets a goal and a timebox, not every click", "After the session — notes and a debrief", "Without a charter it is easy to click aimlessly"],
        conceptUk: "Чартер дослідницької сесії — одне-два речення: що досліджуємо, навіщо, які ризики, який час (45–90 хвилин). Це не покроковий тест-кейс: тестувальник сам обирає наступний крок за тим, що щойно побачив. Після сесії — нотатки: що спробували, що дивно, баги, питання до продукту, що варто автоматизувати. Без чартера сесія перетворюється на безцільне клікання або на повтор уже відомих кейсів. Час обмежують, щоб встигнути дебрифінг і не «загубитись» на годину в одній формі.",
        conceptEn: "An exploratory session charter is one or two sentences: what we are exploring, why, which risks, and how long (45–90 minutes). It is not a step-by-step test case: the tester chooses the next step from what they just saw. After the session — notes: what was tried, what looked odd, bugs, product questions, what is worth automating. Without a charter the session becomes aimless clicking or a repeat of already-known cases. Time is boxed so a debrief still happens and you do not 'get lost' for an hour in one form.",
        code: "// Charter: 60 min — explore tax and stacking of two promo codes on checkout; risk: undercharge.",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Чим чартер відрізняється від тест-кейса з кроками 1–15?", promptEn: "How does a charter differ from a test case with steps 1–15?", options: ["він задає мету й ризик, а шлях обирає тестувальник під час сесії", "це те саме під іншою назвою", "чартер забороняє нотатки", "кейси не можна писати після сесії"], correctIndex: 0, explanationUk: "Дослідження кероване, але не заскриптоване.", explanationEn: "The exploration is guided, but not scripted." },
          { kind: "fill", promptUk: "Допишіть обмеження тривалості сесії", promptEn: "Fill in the session duration limit", language: "javascript", code: "// 60-minute ___box: checkout risk — tax on discounts", accepted: ["time"], caseSensitive: true, explanationUk: "Timebox тримає сесію в межах.", explanationEn: "A timebox keeps the session bounded." },
          { kind: "mcq", promptUk: "Що має з'явитись після 60-хвилинної сесії крім знайдених багів?", promptEn: "What should appear after a 60-minute session besides the bugs found?", options: ["нотатки про покриті зони, відкриті питання й ідеї на автоматизацію", "лише скріншот зеленого прогону CI", "новий статут компанії", "нічого, сесія самоцінна без запису"], correctIndex: 0, explanationUk: "Сесія без нотаток майже не передається команді.", explanationEn: "A session without notes barely transfers to the team." }
        ],
        whyUk: "Як сформулювати чартер для перевірки знижок на чекауті?",
        whyEn: "How would you write a charter for exploring discounts at checkout?",
        ideas: [{ labelUk: "мета й ризик", labelEn: "a goal and a risk", anyOf: ["мета", "goal", "ризик", "risk", "знижк", "discount"] }, { labelUk: "час сесії", labelEn: "session time", anyOf: ["timebox", "45", "90", "дебриф", "debrief"] }, { labelUk: "нотатки після", labelEn: "notes afterwards", anyOf: ["нотат", "notes", "автомат", "automat", "питан", "question"] }],
        sampleUk: "Чартер коротко називає мету (знижки на чекауті), ризик і час, шлях обирають під час сесії, а після неї записують нотатки, баги й ідеї на автоматизацію.",
        sampleEn: "The charter briefly names the goal (discounts at checkout), the risk, and the time; the path is chosen during the session, and afterwards you record notes, bugs, and automation ideas.",
      },
      {
        slug: "qt-oracles",
        titleUk: "Оракули: звідки ви знаєте, що це баг",
        titleEn: "Oracles: how you know it is a bug",
        difficulty: 3,
        pointsUk: ["Оракул пояснює, чому результат неправильний", "Суперечливі оракули — часто дефект вимог", "Евристики джерел не замінюють мислення"],
        pointsEn: ["An oracle explains why the result is wrong", "Conflicting oracles are often a requirements defect", "Source heuristics do not replace thinking"],
        conceptUk: "Оракул — принцип, за яким ви вирішуєте, що результат некоректний: специфікація, узгодженість із подібним екраном, минула версія, думка експерта, очікування користувача, внутрішній інваріант (сума рядків дорівнює підсумку). Без оракула «дивним» можна назвати все і нічого. Кілька оракулів можуть суперечити (маркетинг проти бухгалтерії) — це дефект вимог, який теж варто зафіксувати. Евристики Феда «HICCUPPS» (History, Image, Comparable, Claims, User expectations, Product, Purpose, Statutes) — пам'ятка джерел оракулів, не чекліст галочок.",
        conceptEn: "An oracle is the principle you use to decide that a result is wrong: a specification, consistency with a similar screen, a previous version, an expert's view, a user expectation, an internal invariant (line sums equal the total). Without an oracle, everything and nothing can be called 'weird'. Several oracles may conflict (marketing versus accounting) — that is a requirements defect, which you should also record. FeD's HICCUPPS heuristics (History, Image, Comparable, Claims, User expectations, Product, Purpose, Statutes) are a reminder of oracle sources, not a tick-box checklist.",
        code: "// oracle: sum(lines) === invoice.total  (product consistency)",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Який оракул у спостереженні «підсумок 10, а три рядки по 4»?", promptEn: "Which oracle is at work in 'the total is 10, but three lines are 4 each'?", options: ["внутрішній інваріант: сума рядків дорівнює підсумку", "лише думка дизайнера про колір", "оракула немає", "порівняння з логотипом"], correctIndex: 0, explanationUk: "Арифметична узгодженість продукту.", explanationEn: "The product's arithmetic consistency." },
          { kind: "fill", promptUk: "Допишіть назву принципу «звідки я знаю, що це неправильно»", promptEn: "Fill in the name of the 'how do I know this is wrong' principle", language: "javascript", code: "// test ___ : invoice total == sum(lines)", accepted: ["oracle"], caseSensitive: true, explanationUk: "Оракул — критерій правильності.", explanationEn: "An oracle is the correctness criterion." },
          { kind: "mcq", promptUk: "Що робити, якщо вимоги кажуть «безкоштовна доставка», а юристи — «мінімум 20 грн»?", promptEn: "What do you do if requirements say 'free shipping' and legal says 'a 20 UAH minimum'?", options: ["зафіксувати конфлікт оракулів як дефект вимог, не «вибрати мовчки»", "завжди слухати лише маркетинг", "ігнорувати юристів у тестах", "закрити сесію без запису"], correctIndex: 0, explanationUk: "Суперечність — теж знахідка.", explanationEn: "A contradiction is also a finding." }
        ],
        whyUk: "Як обґрунтувати баг, якщо в специфікації немає цього кроку?",
        whyEn: "How do you justify a bug when the specification never mentioned this step?",
        ideas: [{ labelUk: "інший оракул", labelEn: "another oracle", anyOf: ["оракул", "oracle", "інваріант", "invariant", "істор", "history"] }, { labelUk: "узгодженість", labelEn: "consistency", anyOf: ["узгод", "consist", "порівн", "compar", "очікуван"] }, { labelUk: "конфлікт вимог", labelEn: "a requirements conflict", anyOf: ["конфлікт", "conflict", "вимог", "requirement", "зафікс"] }],
        sampleUk: "Баг можна обґрунтувати інваріантом, історією продукту чи очікуванням користувача, навіть якщо кроку немає в специфікації; конфлікт оракулів записують як дефект вимог.",
        sampleEn: "A bug can be justified by an invariant, product history, or a user expectation even if the step is missing from the spec; a clash of oracles is recorded as a requirements defect.",
      },
      {
        slug: "qt-tour-techniques",
        titleUk: "Тури: змінити об'єктив, щоб побачити прогалини",
        titleEn: "Tours: change the lens so you see the gaps",
        difficulty: 2,
        pointsUk: ["Тур — об'єктив маршруту, не заміна чартера", "Різні тури відкривають різні зони ризику", "Записуйте, який тур дав знахідку"],
        pointsEn: ["A tour is a route lens, not a substitute for a charter", "Different tours open different risk zones", "Record which tour produced a finding"],
        conceptUk: "Тур — евристика маршруту сесії: «тур по грошах» (усі місця, де змінюється баланс), «тур початківця» (перший запуск без підказок), «тур лиходія» (некоректний ввід, повторні кліки), «тур локалізації» (довгі рядки, RTL). Тури не замінюють чартер, а насичують його ідеями кроків. Після кількох турів видно зони, які ніхто не відвідував (звіти, крайні дати, офлайн). Записуйте, який тур дав знахідку: це допомагає планувати наступні сесії. Не перетворюйте список турів на конвеєр галочок без мислення.",
        conceptEn: "A tour is a route heuristic for a session: a 'money tour' (every place a balance changes), a 'beginner tour' (first launch without hints), a 'villain tour' (invalid input, double clicks), a 'localisation tour' (long strings, RTL). Tours do not replace a charter, they feed it with step ideas. After several tours you see zones nobody visited (reports, edge dates, offline). Record which tour produced a finding: that helps plan later sessions. Do not turn a tour list into a tick-box conveyor without thinking.",
        code: "// charter: onboarding drop-off; tour: beginner (no hints, first empty state, slow network)",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Що таке «тур по грошах»?", promptEn: "What is a 'money tour'?", options: ["пройти всі місця, де змінюються гроші, знижки, повернення, комісії", "лише відкрити прайс на сайті", "аудит бухгалтерії без продукту", "навантажувальний тест каси"], correctIndex: 0, explanationUk: "Гроші — концентрований ризик.", explanationEn: "Money is concentrated risk." },
          { kind: "fill", promptUk: "Допишіть евристику маршруту сесії", promptEn: "Fill in the session route heuristic", language: "javascript", code: "// localisation ___ : long German nouns, RTL, plural forms", accepted: ["tour"], caseSensitive: true, explanationUk: "Тур — назва евристики.", explanationEn: "A tour is the name of the heuristic." },
          { kind: "mcq", promptUk: "Чому список із двадцяти турів, пройдених «галочкою» за день, слабкий?", promptEn: "Why is a list of twenty tours ticked off in a day a weak approach?", options: ["тури мають живити мислення в межах чартера, а не заміняти його конвеєром", "двадцять — заборонене число", "за день не можна тестувати", "галочки заборонені в QA"], correctIndex: 0, explanationUk: "Якість спостереження важливіша за кількість етикеток.", explanationEn: "The quality of observation matters more than the number of labels." }
        ],
        whyUk: "Як тур початківця доповнює чартер про онбординг?",
        whyEn: "How does a beginner tour complement an onboarding charter?",
        ideas: [{ labelUk: "об'єктив першого запуску", labelEn: "a first-launch lens", anyOf: ["початків", "beginner", "перший", "first", "підказ", "hint"] }, { labelUk: "не заміна чартера", labelEn: "not a charter substitute", anyOf: ["чартер", "charter", "тур", "tour"] }, { labelUk: "запис знахідки", labelEn: "recording the finding", anyOf: ["запис", "record", "зона", "zone", "онборд", "onboard"] }],
        sampleUk: "Тур початківця дає об'єктив першого запуску без підказок у межах чартера онбордингу; сам список турів не замінює мету сесії, а знахідку записують із назвою туру.",
        sampleEn: "A beginner tour gives a first-launch-without-hints lens inside an onboarding charter; a tour list itself does not replace the session goal, and a finding is recorded with the tour's name.",
      }
    ],
    "Контрольна: дослідницьке тестування",
    "Exam: exploratory testing",
    [
      { promptUk: "Чартер сесії задає…", promptEn: "A session charter sets…", options: ["мету, ризик і час, не кожен клік", "покрокові 15 кліків обов'язково", "лише список багів без мети", "розклад CI"], correctIndex: 0, explanationUk: "Кероване дослідження.", explanationEn: "Guided exploration." },
      { promptUk: "Оракул — це…", promptEn: "An oracle is…", options: ["принцип, за яким результат визнають неправильним", "завжди лише текст специфікації", "інструмент автоматизації UI", "ім'я стенда"], correctIndex: 0, explanationUk: "Критерій правильності.", explanationEn: "A correctness criterion." },
      { promptUk: "Суперечливі оракули часто означають…", promptEn: "Conflicting oracles often mean…", options: ["дефект вимог, який треба зафіксувати", "що багів немає", "що сесію треба скасувати без запису", "що автоматизація неможлива"], correctIndex: 0, explanationUk: "Конфлікт теж знахідка.", explanationEn: "A conflict is also a finding." },
      { promptUk: "Тур…", promptEn: "A tour is…", options: ["евристика маршруту, що живить чартер", "заміна чартера конвеєром галочок", "навантажувальний профіль JMeter", "обов'язковий 20-пунктовий стандарт"], correctIndex: 0, explanationUk: "Об'єктив, не конвеєр.", explanationEn: "A lens, not a conveyor." }
    ],
  )
];

const insertions: Record<string, LessonContent[]> = {};

export function expandQaTheory(course: CourseContent): CourseContent {
  return expandCourse(course, insertions, newUnits);
}
