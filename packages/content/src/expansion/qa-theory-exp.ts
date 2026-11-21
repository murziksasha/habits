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
        conceptUk: "Копія продакшену в QA дає «реалізм», але тягне персональні дані, секрети й юридичний ризик. Синтетичний набір будують за правилами домену: розподіл сум, рідкісні межі, зв'язки зовнішніх ключів, а не випадковий шум. Для відтворення збережіть seed, версію генератора й конфігурацію; самого seed може бути недостатньо, якщо змінюється код або порядок викликів. «Схоже на прод» перевіряють метриками (розподіл, частка порожніх полів), не на око. Маскування прод-даних — запасний варіант, але погане маскування (ті самі унікальні суми) все одно ідентифікує людей.",
        conceptEn: "A production copy in QA feels 'realistic' but carries personal data, secrets, and legal risk. A synthetic set is built from domain rules: the distribution of amounts, rare boundaries, foreign-key relations, not random noise. For reproducibility, record the seed, generator version, and configuration; a seed alone may not suffice if code or call order changes. 'Looks like prod' is checked with metrics (distribution, share of empty fields), not by eye. Masking prod data is a fallback, but poor masking (the same unique amounts) still identifies people.",
        code: "generateOrders({ seed: 42, count: 10_000, maxLines: 30, emptyAddressRate: 0.02 });",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Чому прості випадкові рядки без правил домену можуть погано замінювати імена в тестовій БД?", promptEn: "Why can simple random strings without domain rules be a poor substitute for names in a test database?", options: ["вони можуть не відтворювати довжини, абетки й колізії, важливі для перевірок", "ім'я не можна зберігати навіть синтетично", "випадковість заборонена в SQL", "генератор тоді не має seed"], optionsEn: ["They may miss lengths, alphabets, and collisions relevant to the checks", "Names cannot be stored even synthetically", "Randomness is forbidden in SQL", "The generator cannot have a seed"], correctIndex: 0, explanationUk: "Дані мають зберегти форму домену.", explanationEn: "The data must keep the shape of the domain." },
          { kind: "fill", promptUk: "Допишіть параметр відтворюваності генератора", promptEn: "Fill in the generator reproducibility parameter", language: "javascript", code: "generateOrders({ ___: 42, count: 10_000 });", accepted: ["seed"], caseSensitive: true, explanationUk: "Збережіть seed разом із версією генератора та конфігурацією: сам seed не гарантує того самого результату після зміни коду.", explanationEn: "Record the seed alongside the generator version and configuration: the seed alone does not guarantee the same result after code changes." },
          { kind: "mcq", promptUk: "Що перевірити, щоб синтетика «була схожа на прод»?", promptEn: "What should you check so synthetics 'look like prod'?", options: ["розподіл ключових полів, частку порожніх, цілісність зв'язків", "лише кількість рядків", "колір дашборда", "час відповіді CI"], optionsEn: ["Field distributions, missing-value rates, and relationship integrity", "Only row count", "Dashboard color", "CI response time"], correctIndex: 0, explanationUk: "Метрики форми, не лише обсяг.", explanationEn: "Shape metrics, not only volume." }
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
        pointsUk: ["Мінімальний зріз, маскування, обмежений доступ", "Обмежений строк зберігання та очищення артефактів", "Тестові паролі не копіюють прод"],
        pointsEn: ["A minimal slice, masking, and limited access", "Limited retention and artifact cleanup", "Test passwords do not copy production"],
        conceptUk: "Якщо без фрагмента реальних даних не обійтись (рідкісний баг), беруть мінімальний зріз, маскують прямі ідентифікатори (ім'я, email, телефон, документ), шифрують носій і обмежують доступ списком людей на час розслідування. Строк зберігання та видалення, включно з копіями й CI-артефактами, визначають за політикою та застосовними вимогами; логи не повинні містити зайвих персональних даних. Тестові облікові записи не повинні мати ті самі паролі, що в прод. Журнал доступу до QA-БД — частина відповідності. «У нас внутрішня мережа» не є підставою зберігати повний дамп паспортів.",
        conceptEn: "If you cannot avoid a fragment of real data (a rare bug), take a minimal slice, mask direct identifiers (name, email, phone, document), encrypt the medium, and limit access to a named list for the investigation. Define retention and deletion under policy and applicable requirements, including copies and CI artifacts; avoid unnecessary personal data in logs. Test accounts must not share production passwords. An access log for the QA database is part of compliance. 'We have an internal network' is not a reason to keep a full dump of passports.",
        code: "// approved minimal dataset; document access, retention, and deletion",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Політика вимагає видалити дозволений дамп після розслідування. Що зробити?", promptEn: "The policy requires an approved dump to be deleted after the investigation. What should you do?", options: ["знищити за протоколом і прибрати копії з CI-артефактів", "залишити «про всяк випадок» на спільній шарі", "залити в публічний чат команди", "імпортувати на ноутбуки всіх"], optionsEn: ["Destroy it under the policy and remove copies from CI artifacts", "Keep it on a shared drive just in case", "Post it in public team chat", "Import it to every laptop"], correctIndex: 0, explanationUk: "Виконайте погоджену політику зберігання й видалення, враховуючи копії.", explanationEn: "Follow the agreed retention and deletion policy, including copies." },
          { kind: "fill", promptUk: "Допишіть принцип «якнайменше персональних даних»", promptEn: "Fill in the 'as little personal data as possible' principle", language: "javascript", code: "// data ___isation: keep only the columns that reproduce the bug", accepted: ["minim"], caseSensitive: true, explanationUk: "Мінімізація обсягу PII.", explanationEn: "Minimization of PII volume." },
          { kind: "mcq", promptUk: "Чому однаковий пароль admin/admin у прод і QA небезпечний навіть «всередині офісу»?", promptEn: "Why is the same admin/admin password in prod and QA dangerous even 'inside the office'?", options: ["компрометація тестового середовища дає ключ до продакшену", "паролі в QA заборонені взагалі", "офісна мережа шифрує паролі сама", "QA не може ходити в мережу"], optionsEn: ["Compromising the test environment exposes production credentials", "QA passwords are forbidden", "The office network encrypts passwords automatically", "QA cannot access a network"], correctIndex: 0, explanationUk: "Секрети середовищ розділяють.", explanationEn: "Environment secrets are separated." }
        ],
        whyUk: "Як коротко тримати фрагмент реальних даних для рідкісного бага?",
        whyEn: "How do you briefly keep a fragment of real data for a rare bug?",
        ideas: [{ labelUk: "мінімальний зріз", labelEn: "a minimal slice", anyOf: ["мінімал", "minimal", "зріз", "slice", "маск"] }, { labelUk: "обмежений доступ", labelEn: "limited access", anyOf: ["доступ", "access", "журнал", "log", "список"] }, { labelUk: "видалення за політикою", labelEn: "deletion under the policy", anyOf: ["знищ", "destroy", "видален", "delet", "артефакт", "artefact", "ci"] }],
        sampleUk: "Беруть мінімальний дозволений замаскований зріз із журналом доступу, не копіюють продакшен-секрети й за узгодженою політикою знищують дані та їхні копії в артефактах CI.",
        sampleEn: "Use a minimal approved masked slice with an access log, do not copy production secrets, and destroy the data and its CI-artifact copies according to the agreed retention policy.",
      },
      {
        slug: "qt-td-refresh",
        titleUk: "Оновлення стенда: свіжість, ізоляція тестів, золотий образ",
        titleEn: "Refreshing a stand: freshness, test isolation, and a golden image",
        difficulty: 3,
        pointsUk: ["Стенд оновлюють автоматично й димлять після цього", "Тести ізольовані фікстурами, не ручними рядками", "Золотий образ версіонується зі схемою"],
        pointsEn: ["The stand is refreshed automatically and smoked afterwards", "Tests are isolated with fixtures, not manual rows", "The golden image is versioned with the schema"],
        conceptUk: "Застарілий стенд може розійтися зі схемою релізу. Версіонуйте образ, міграції й набір фікстур, а після контрольованого оновлення виконуйте smoke-перевірки. Кожен тест створює власні дані з унікальними ідентифікаторами та очікує завершення асинхронних підготовки й очищення. Для послідовних тестів можна створювати фікстуру в beforeEach; для конкурентних тестів потрібна окрема фікстура в області кожного тесту, а не спільна змінна. Очищення має бути безпечним після часткового збою; для сильнішої ізоляції використовуйте окрему базу чи схему на worker. Враховуйте також фонові задачі, кеш і зовнішні сервіси.",
        conceptEn: "A stale test environment can drift from the release schema. Version the image, migrations, and fixture set, and run smoke checks after a controlled refresh. Each test creates its own data with unique identifiers and awaits asynchronous setup and cleanup. For sequential tests, beforeEach can create a fixture; concurrent tests need a separate test-scoped fixture rather than a shared variable. Cleanup should tolerate partial setup failure; for stronger isolation use a separate database or schema per worker. Account for background jobs, caches, and external services too.",
        code: "// For tests running sequentially within this suite.\n// Concurrent tests need test-scoped fixtures rather than shared `order`.\nlet order;\nbeforeEach(async () => {\n  order = uniqueOrder();\n  await db.seed(order);\n});\nafterEach(async () => {\n  if (order) await db.cleanup(order.id);\n  order = undefined;\n});",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Чому тест, що шукає користувача з email qa@test.com, крихкий на спільному стенді?", promptEn: "Why is a test that looks up a user with email qa@test.com fragile on a shared stand?", options: ["рядок могли змінити, видалити або зайняти інші тести", "email не можна використовувати в тестах ніколи", "стінд не має таблиці користувачів", "CI забороняє email"], optionsEn: ["Other tests may change, delete, or use the row", "Email can never be used in tests", "The environment has no users table", "CI forbids email"], correctIndex: 0, explanationUk: "Готуйте унікальні дані в самому тесті.", explanationEn: "Prepare unique data inside the test itself." },
          { kind: "fill", promptUk: "Допишіть коротку перевірку після оновлення стенда", promptEn: "Fill in a short check after a stand refresh", language: "javascript", code: "await run___Suite(); // health + critical paths", accepted: ["Smoke", "smoke"], caseSensitive: true, explanationUk: "Димовий набір після оновлення.", explanationEn: "A smoke suite after the refresh." },
          { kind: "mcq", promptUk: "Навіщо версіонувати золотий образ разом із міграціями?", promptEn: "Why version the golden image together with migrations?", options: ["щоб схема даних і образ не розійшлись, і відтворення бага було можливим", "образ не можна зберігати в git LFS ніколи", "міграції тоді не потрібні", "CI ігнорує версії"], optionsEn: ["Keep the image and schema aligned for reproducibility", "Images can never be stored in Git LFS", "Migrations become unnecessary", "CI ignores versions"], correctIndex: 0, explanationUk: "Відтворюваний базис.", explanationEn: "A reproducible baseline." }
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
      { promptUk: "Повна копія продакшену в QA…", promptEn: "A full production copy in QA is…", options: ["ризикована через PII; краща синтетика з правилами домену", "завжди найкращий варіант", "обов'язкова для ISO", "замінює seed"], optionsEn: ["Risky due to PII; domain-based synthetic data is preferable", "Always the best choice", "Required by ISO", "A replacement for a seed"], correctIndex: 0, explanationUk: "Мінімізуйте персональні дані.", explanationEn: "Minimize personal data." },
      { promptUk: "seed у генераторі потрібен, щоб…", promptEn: "A seed in the generator is needed so…", options: ["падіння можна відтворити", "дані ніколи не повторювались", "приховати PII", "замінити міграції"], optionsEn: ["Failures can be reproduced", "Data never repeats", "PII is hidden", "Migrations are replaced"], correctIndex: 0, explanationUk: "Відтворюваність.", explanationEn: "Reproducibility." },
      { promptUk: "Після фіксу рідкісного бага як поводитися зі зрізом реальних даних?", promptEn: "After fixing a rare bug, how should the real-data slice be handled?", options: ["застосувати політику зберігання й видалення до зрізу та його копій", "залишити назавжди на шарі", "закомітити в репозиторій тестів", "розіслати в Slack"], optionsEn: ["Apply the retention and deletion policy to the slice and its copies", "Keep it forever on a shared drive", "Commit it to the test repository", "Send it via Slack"], correctIndex: 0, explanationUk: "Строк зберігання й видалення визначають за політикою та застосовними вимогами.", explanationEn: "Retention and deletion follow the policy and applicable requirements." },
      { promptUk: "Тест, що залежить від ручного рядка на спільному стенді…", promptEn: "A test that depends on a manual row on a shared stand is…", options: ["крихкий: дані хтось змінить", "ідеально ізольований", "швидший за фікстури завжди", "обов'язковий для диму"], optionsEn: ["Fragile because someone may change the data", "Perfectly isolated", "Always faster than fixtures", "Mandatory for smoke testing"], correctIndex: 0, explanationUk: "Готуйте дані в тесті.", explanationEn: "Prepare data in the test." }
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
        conceptUk: "У підході consumer-driven (Pact тощо) тест споживача викликає його клієнт проти mock-сервісу й записує потрібні запити та очікувані відповіді. Провайдер у CI налаштовує незалежний тестовий стан для кожної взаємодії та перевіряє контракт проти запущеного сервісу. Для змінних значень, як-от id, використовуйте перевірку типу або формату, якщо клієнту не потрібне конкретне значення; важливі для нього значення перевіряйте точно. Контракт покриває лише описані взаємодії, а не всі бізнес-правила чи інтеграцію в розгорнутому середовищі. Версіонуйте контракти й узгоджуйте несумісні зміни зі споживачами. Брокер зберігає контракти й результати перевірок версій; перед релізом перевіряйте сумісність потрібних версій.",
        conceptEn: "In a consumer-driven approach (Pact and similar), the consumer test calls its client against a mock service and records the requests and responses it needs. In CI the provider sets up an independent test state for each interaction and verifies the contract against the running service. For variable values such as an id, match the type or format when the client does not need a particular value; match values important to the client exactly. The contract covers only the interactions described, not every business rule or integration in a deployed environment. Version contracts and agree breaking changes with consumers. A broker stores contracts and version verification results; check the compatibility of the relevant versions before release.",
        code: "// Consumer test: call client against mock; record GET /orders/1 → 200 { id, status }\n// Provider CI: set up order 1; verify the interaction against the running service",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Що робити, якщо контракт упав після зміни поля в API?", promptEn: "What should you do if a contract fails after an API field change?", options: ["узгодити зміну зі споживачем і випустити нову версію контракту, не «підкручувати» тест", "вимкнути контракт назавжди", "змінити лише UI e2e", "ігнорувати, якщо 200 ще є"], optionsEn: ["Agree on the change with consumers and update the contract deliberately", "Disable the contract forever", "Change only UI end-to-end tests", "Ignore it if the status is still 200"], correctIndex: 0, explanationUk: "Падіння — сигнал несумісності.", explanationEn: "The failure is a compatibility signal." },
          { kind: "mcq", promptUk: "Клієнту потрібен числовий id замовлення, але його конкретне значення щоразу інше. Що перевіряти в контракті?", promptEn: "A client needs a numeric order id, but its exact value varies each time. What should the contract check?", options: ["тип id, якщо точне значення не потрібне клієнту", "завжди одне й те саме число", "лише HTTP-статус, ігноруючи id", "жодних властивостей відповіді"], optionsEn: ["The id type, if the client does not need an exact value", "Always the same number", "Only the HTTP status, ignoring id", "No response properties"], correctIndex: 0, explanationUk: "Матчер типу перевіряє потребу клієнта, не прив’язуючи контракт до випадкового значення; значущі сталі значення перевіряють точно.", explanationEn: "A type matcher checks the client's need without coupling the contract to an incidental value; match meaningful constants exactly." },
          { kind: "mcq", promptUk: "Чому сам контракт недостатній як єдиний тест платежів?", promptEn: "Why is a contract alone not enough as the only payment test?", options: ["він фіксує форму запиту/відповіді, а не всі бізнес-правила списання", "контракти заборонені для грошей", "Pact не вміє HTTPS", "провайдер не може запускати контракт"], optionsEn: ["It checks request and response expectations, not every payment business rule", "Contracts are forbidden for money", "Pact cannot use HTTPS", "Providers cannot run contracts"], correctIndex: 0, explanationUk: "Доменні інваріанти — окремі тести.", explanationEn: "Domain invariants are separate tests." }
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
        pointsEn: ["Validate the test environment response against the schema in CI", "additionalProperties: false against shadow fields", "Documentation examples must not contradict the schema"],
        conceptUk: "JSON Schema (або OpenAPI) описує типи, обов'язкові поля, переліки. У CI відповідь можна перевірити за схемою: відсутнє обов’язкове поле або неправильний тип спричинить помилку валідації. Обов’язкові параметри запиту перевіряють за схемою запиту окремо. additionalProperties: false забороняє властивості, не описані в properties або patternProperties; явне оголошення id і status потрібне навіть тоді, коли вони є в required. Сувора схема також може відхилити нове поле, тому її обирають з урахуванням сумісності. Схему рев'юють як код. Приклад у документації, що розходиться зі схемою, гірший за відсутність прикладу: йому вірять.",
        conceptEn: "JSON Schema (or OpenAPI) describes types, required fields, and enums. In CI, validate a response against its schema: a missing required field or incorrect type causes a validation error. Validate required request parameters against the request schema separately. additionalProperties: false rejects properties not covered by properties or patternProperties; id and status must be declared even when listed in required. A strict schema can also reject a newly added field, so choose it with compatibility in mind. The schema is reviewed like code. A docs example that disagrees with the schema is worse than no example: people trust it.",
        code: "{ \"type\": \"object\", \"properties\": { \"id\": { \"type\": \"integer\" }, \"status\": { \"type\": \"string\" } }, \"required\": [\"id\", \"status\"], \"additionalProperties\": false }",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Що ловить additionalProperties: false?", promptEn: "What does additionalProperties: false catch?", options: ["поля, яких немає в схемі, але вони вже потрапили у відповідь", "лише відсутність обов'язкових полів", "повільність API", "код відповіді 500"], optionsEn: ["Undeclared response fields", "Only missing required fields", "Slow API responses", "HTTP 500"], correctIndex: 0, explanationUk: "Неоголошені поля стають неформальним контрактом.", explanationEn: "Undeclared fields become an informal contract." },
          { kind: "fill", promptUk: "Допишіть ключове слово обов'язкових полів JSON Schema", promptEn: "Fill in the JSON Schema keyword for required fields", language: "javascript", code: "{ \"type\": \"object\", \"___\": [\"id\", \"status\"] }", accepted: ["required"], caseSensitive: true, explanationUk: "Ключ — required.", explanationEn: "The key is required." },
          { kind: "mcq", promptUk: "Чому приклад у README, де status — число, а в схемі — рядок, шкідливий?", promptEn: "Why is a README example where status is a number, while the schema says string, harmful?", options: ["інтегратори копіюють приклад і будують несумісний клієнт", "приклади завжди важливіші за схему", "JSON Schema ігнорує рядки", "README не читають"], optionsEn: ["Integrators may copy the example and build an incompatible client", "Examples always override the schema", "JSON Schema ignores strings", "Nobody reads README files"], correctIndex: 0, explanationUk: "Документація — частина контракту.", explanationEn: "Documentation is part of the contract." }
        ],
        whyUk: "Як CI має ловити злам поля status у відповіді API?",
        whyEn: "How should CI catch a break of the status field in an API response?",
        ideas: [{ labelUk: "валідація проти схеми", labelEn: "validation against the schema", anyOf: ["схем", "schema", "json", "openapi", "ci"] }, { labelUk: "обов'язкові поля", labelEn: "required fields", anyOf: ["required", "обов'язков", "тип", "type"] }, { labelUk: "чесні приклади", labelEn: "honest examples", anyOf: ["приклад", "example", "readme", "супереч", "contradict"] }],
        sampleUk: "CI валідує відповідь стенда проти JSON Schema: required ловить відсутні поля, оголошений тип — некоректний status, а additionalProperties: false відхиляє неоголошені поля. Приклади в документації мають збігатися зі схемою.",
        sampleEn: "CI validates the test environment response against JSON Schema: required catches missing fields, the declared type catches an invalid status, and additionalProperties: false rejects undeclared fields. Documentation examples must match the schema.",
      },
      {
        slug: "qt-backward-compat",
        titleUk: "Зворотна сумісність: що можна змінити в API",
        titleEn: "Backward compatibility: what you may change in an API",
        difficulty: 3,
        pointsUk: ["Сумісність залежить від контракту та поведінки клієнтів", "Для несумісних змін узгодьте міграцію та співіснування", "Перевіряйте старі запити й клієнтів із новим API"],
        pointsEn: ["Compatibility depends on the contract and client behavior", "Agree on migration and coexistence for breaking changes", "Test old requests and clients against the new API"],
        conceptUk: "Сумісність залежить від напряму даних, контракту та поведінки клієнтів. Нове необов’язкове поле запиту зазвичай не змінює старі запити, але додаткове поле відповіді може зламати клієнта із суворою схемою. Видалення поля або нова обов’язкова вимога до запиту можуть бути несумісними. Перевіряйте старі запити та реальні клієнти проти нового API; контрактні фікстури доповнюють, але не замінюють такі перевірки. Для несумісних змін узгодьте міграцію: наприклад, нову версію, оголошення застаріння й період співіснування.",
        conceptEn: "Compatibility depends on data direction, the contract, and client behavior. A new optional request field usually leaves old requests unchanged, but an extra response field can break a client with a strict schema. Removing a field or requiring a previously optional request field may break clients. Test old requests and actual clients against the new API; contract fixtures supplement, but do not replace, those checks. Agree on a migration for breaking changes, such as a new version, a deprecation notice, and a coexistence period.",
        code: "// optional request field: test old requests\n// extra response field: test strict old clients",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Чи сумісно зробити поле email обов'язковим, якщо старі клієнти його не надсилали?", promptEn: "Is it compatible to make the email field required if old clients did not send it?", options: ["ні, це зламає старі запити", "так, бо email «і так всім потрібен»", "так, якщо є 200", "сумісність не стосується тіла запиту"], optionsEn: ["No, it breaks old requests", "Yes, everyone needs email", "Yes, if the status is 200", "Compatibility does not apply to request bodies"], correctIndex: 0, explanationUk: "Нова вимога до старих клієнтів — розрив.", explanationEn: "A new demand on old clients is a break." },
          { kind: "fill", promptUk: "Допишіть період оголошеного застаріння", promptEn: "Fill in the announced deprecation period", language: "javascript", code: "// Sunset: header + docs; keep v1 during ___ period", accepted: ["deprecation", "grace", "coexistence"], caseSensitive: true, explanationUk: "Співіснування версій.", explanationEn: "Version coexistence." },
          { kind: "mcq", promptUk: "Чому мобільний клієнт не оновлюється «в один день» разом з API?", promptEn: "Why does a mobile client not update 'on the same day' as the API?", options: ["користувачі довго лишаються на старій версії з магазину", "мобільні клієнти не ходять в API", "магазини оновлюють усі збірки миттєво", "версії API заборонені на мобільному"], optionsEn: ["Users may keep old app versions for a long time", "Mobile clients do not call APIs", "App stores update every installation instantly", "API versions are forbidden on mobile"], correctIndex: 0, explanationUk: "Довгий хвіст старих збірок.", explanationEn: "A long tail of old builds." }
        ],
        whyUk: "Як перевірити сумісність зміни API та спланувати міграцію?",
        whyEn: "How do you check an API change for compatibility and plan migration?",
        ideas: [{ labelUk: "план для несумісної зміни", labelEn: "a plan for a breaking change", anyOf: ["прибрати", "remove", "переймен", "rename", "версі", "version", "міграц", "migrat"] }, { labelUk: "додати необов'язкове", labelEn: "adding an optional field", anyOf: ["необов'язков", "optional", "сумісн", "compatible"] }, { labelUk: "старий клієнт у тесті", labelEn: "an old client in the test", anyOf: ["старий", "old", "клієнт", "client", "мобільн", "mobile"] }],
        sampleUk: "Перевірте старі запити й клієнти: нове необов’язкове поле запиту зазвичай сумісне, але додаткове поле відповіді може порушити сувору схему. Прибирання поля або нова обов’язкова вимога можуть потребувати версії та плану міграції.",
        sampleEn: "Test old requests and clients: a new optional request field is usually compatible, but an extra response field may break a strict schema. Removing a field or adding a required request parameter may require a version and migration plan.",
      }
    ],
    "Контрольна: контракти",
    "Exam: contracts",
    [
      { promptUk: "Consumer-driven контракт пише…", promptEn: "A consumer-driven contract is written by…", options: ["споживач, а провайдер перевіряє в CI", "лише провайдер без клієнта", "лише відділ маркетингу", "автоматично браузер"], optionsEn: ["The consumer, and the provider verifies it in CI", "Only the provider without the client", "Only marketing", "The browser automatically"], correctIndex: 0, explanationUk: "Очікування клієнта.", explanationEn: "The client's expectations." },
      { promptUk: "additionalProperties: false ловить…", promptEn: "additionalProperties: false catches…", options: ["неоголошені поля у відповіді", "лише відсутній id", "час відповіді", "CORS"], optionsEn: ["Undeclared response fields", "Only a missing id", "Response time", "CORS"], correctIndex: 0, explanationUk: "Тіньовий контракт.", explanationEn: "A shadow contract." },
      { promptUk: "Зробити необов'язкове поле запиту обов'язковим, коли старі клієнти його не надсилають…", promptEn: "Making an optional request field required when old clients omit it is…", options: ["несумісна зміна", "завжди сумісно", "лише документаційна правка", "ігнорується старими клієнтами безпечно завжди"], optionsEn: ["A breaking change", "Always compatible", "Only a documentation edit", "Always safely ignored by old clients"], correctIndex: 0, explanationUk: "Старі запити можуть перестати проходити; потрібен узгоджений план міграції.", explanationEn: "Old requests may fail; an agreed migration plan is needed." },
      { promptUk: "Підганяти очікування контракту під зламану відповідь…", promptEn: "Bending contract expectations to a broken response is…", options: ["ховає несумісність, так не роблять", "єдиний правильний фікс", "обов'язково для Pact", "замінює версіонування"], optionsEn: ["Hides an incompatibility", "The only correct fix", "Required by Pact", "A replacement for versioning"], correctIndex: 0, explanationUk: "Падіння — сигнал.", explanationEn: "The failure is a signal." }
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
        conceptUk: "Чартер дослідницької сесії стисло описує, що досліджуємо, навіщо, які ризики й скільки часу маємо. Це не покроковий тест-кейс: тестувальник обирає наступний крок за тим, що щойно побачив. Під час сесії записуйте дії, дані та спостереження, щоб можна було відтворити знахідку; позначайте також неперевірені зони й відкриті питання. На дебрифінгу підсумуйте ризики, перешкоди й наступні кроки, зокрема ідеї автоматизації. Чартер допомагає утримувати фокус, але важливу несподівану знахідку можна окремо зафіксувати та узгодити зміну напряму.",
        conceptEn: "An exploratory session charter briefly states what to explore, why, the risks, and the available time. It is not a step-by-step test case: the tester chooses the next step based on what they observe. During the session, record actions, data, and observations so findings can be reproduced; note untested areas and open questions too. In the debrief, summarize risks, obstacles, and next steps, including automation ideas. A charter maintains focus, but an important unexpected finding can be recorded separately and a change of direction agreed.",
        code: "// Charter: 60 min — explore tax and stacking of two promo codes on checkout; risk: undercharge.",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Чим чартер відрізняється від тест-кейса з кроками 1–15?", promptEn: "How does a charter differ from a test case with steps 1–15?", options: ["він задає мету й ризик, а шлях обирає тестувальник під час сесії", "це те саме під іншою назвою", "чартер забороняє нотатки", "кейси не можна писати після сесії"], optionsEn: ["It sets a goal and risk while the tester chooses the path", "The same thing under another name", "A charter forbids notes", "Cases cannot be written afterwards"], correctIndex: 0, explanationUk: "Дослідження кероване, але не заскриптоване.", explanationEn: "The exploration is guided, but not scripted." },
          { kind: "fill", promptUk: "Допишіть обмеження тривалості сесії", promptEn: "Fill in the session duration limit", language: "javascript", code: "// 60-minute ___box: checkout risk — tax on discounts", accepted: ["time"], caseSensitive: true, explanationUk: "Timebox тримає сесію в межах.", explanationEn: "A timebox keeps the session bounded." },
          { kind: "mcq", promptUk: "Що має з'явитись після 60-хвилинної сесії крім знайдених багів?", promptEn: "What should appear after a 60-minute session besides the bugs found?", options: ["нотатки про покриті зони, відкриті питання й ідеї на автоматизацію", "лише скріншот зеленого прогону CI", "новий статут компанії", "нічого, сесія самоцінна без запису"], optionsEn: ["Notes on areas covered, open questions, and automation ideas", "Only a screenshot of a green CI run", "A new company charter", "Nothing; no record is needed"], correctIndex: 0, explanationUk: "Сесія без нотаток майже не передається команді.", explanationEn: "A session without notes barely transfers to the team." }
        ],
        whyUk: "Як сформулювати чартер для перевірки знижок на чекауті?",
        whyEn: "How would you write a charter for exploring discounts at checkout?",
        ideas: [{ labelUk: "мета й ризик", labelEn: "a goal and a risk", anyOf: ["мета", "goal", "ризик", "risk", "знижк", "discount"] }, { labelUk: "час сесії", labelEn: "session time", anyOf: ["timebox", "час", "time", "хвилин", "minute", "45", "60", "90", "дебриф", "debrief"] }, { labelUk: "нотатки після", labelEn: "notes afterwards", anyOf: ["нотат", "notes", "автомат", "automat", "питан", "question"] }],
        sampleUk: "За 60 хвилин дослідити поєднання знижок на чекауті: ризик — неправильна підсумкова сума. Під час сесії записувати дії та нотатки про знахідки, а на дебрифінгу обговорити неперевірені зони й наступні кроки.",
        sampleEn: "Spend 60 minutes exploring combined checkout discounts: the risk is an incorrect total. Record actions and notes about findings during the session, then discuss untested areas and next steps in the debrief.",
      },
      {
        slug: "qt-oracles",
        titleUk: "Оракули: звідки ви знаєте, що це баг",
        titleEn: "Oracles: how you know it is a bug",
        difficulty: 3,
        pointsUk: ["Оракул пояснює, чому результат неправильний", "Суперечливі оракули — часто дефект вимог", "Евристики джерел не замінюють мислення"],
        pointsEn: ["An oracle explains why the result is wrong", "Conflicting oracles are often a requirements defect", "Source heuristics do not replace thinking"],
        conceptUk: "Оракул — джерело або принцип, за яким оцінюють результат: специфікація, узгодженість із подібним екраном, минула версія, думка експерта, очікування користувача чи узгоджений інваріант. Наприклад, за правилом без податків і знижок сума рядків дорівнює підсумку. Оракул може помилятися: стара версія теж може містити баг, а вимоги — застаріти. Тому в описі знахідки вкажіть спостереження, джерело очікування та його умови; якщо впевненості немає, позначте питання для уточнення. Коли оракули суперечать один одному, зафіксуйте розбіжність і узгодьте очікування із зацікавленими сторонами. HICCUPPS — пам'ятка джерел оракулів, а не доказ правильності кожного з них.",
        conceptEn: "An oracle is a source or principle used to evaluate a result: a specification, consistency with a similar screen, a previous version, an expert's view, a user expectation, or an agreed invariant. For example, under a rule with no taxes or discounts, line sums equal the total. An oracle can be wrong: an older version may also contain a bug, and requirements may be outdated. Record the observation, source of the expectation, and its conditions; when uncertain, flag a question for clarification. When oracles conflict, record the discrepancy and agree expectations with stakeholders. HICCUPPS is a reminder of oracle sources, not proof that each one is correct.",
        code: "// agreed rule: no tax or discount; sum(lines) === invoice.total",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "За правилом рахунку без податків і знижок підсумок дорівнює сумі рядків. Який оракул порушено, якщо підсумок 10, а три рядки по 4?", promptEn: "An invoice has no tax or discounts and its total must equal the line sum. Which oracle flags a total of 10 for three lines of 4 each?", options: ["внутрішній інваріант: сума рядків дорівнює підсумку", "лише думка дизайнера про колір", "оракула немає", "порівняння з логотипом"], optionsEn: ["An internal invariant that line items sum to the total", "Only a designer opinion on color", "There is no oracle", "Comparison with a logo"], correctIndex: 0, explanationUk: "Арифметична узгодженість продукту.", explanationEn: "The product's arithmetic consistency." },
          { kind: "mcq", promptUk: "Нова версія показує інший результат, ніж стара, але вимоги неясні. Що робити?", promptEn: "A new version gives a different result from the old one, but the requirements are unclear. What should you do?", options: ["зафіксувати різницю й уточнити очікування: стара версія теж може помилятися", "автоматично вважати стару версію правильною", "відхилити нову версію без перевірки", "ігнорувати різницю"], optionsEn: ["Record the difference and clarify the expectation: the old version may also be wrong", "Automatically assume the old version is correct", "Reject the new version without investigation", "Ignore the difference"], correctIndex: 0, explanationUk: "Історична поведінка — корисний, але не безпомилковий оракул.", explanationEn: "Historical behavior is a useful but fallible oracle." },
          { kind: "mcq", promptUk: "Що робити, якщо вимоги кажуть «безкоштовна доставка», а юристи — «мінімум 20 грн»?", promptEn: "What do you do if requirements say 'free shipping' and legal says 'a 20 UAH minimum'?", options: ["зафіксувати розбіжність і узгодити очікування із зацікавленими сторонами", "завжди слухати лише маркетинг", "ігнорувати юристів у тестах", "закрити сесію без запису"], optionsEn: ["Record and resolve the conflicting expectations", "Always listen only to marketing", "Ignore legal in testing", "End the session without a record"], correctIndex: 0, explanationUk: "Суперечність — теж знахідка.", explanationEn: "A contradiction is also a finding." }
        ],
        whyUk: "Як обґрунтувати баг, якщо в специфікації немає цього кроку?",
        whyEn: "How do you justify a bug when the specification never mentioned this step?",
        ideas: [{ labelUk: "інший оракул", labelEn: "another oracle", anyOf: ["оракул", "oracle", "інваріант", "invariant", "істор", "history"] }, { labelUk: "узгодженість", labelEn: "consistency", anyOf: ["узгод", "consist", "порівн", "compar", "очікуван", "expect"] }, { labelUk: "конфлікт вимог", labelEn: "a requirements conflict", anyOf: ["конфлікт", "conflict", "вимог", "requirement", "зафікс"] }],
        sampleUk: "Баг можна обґрунтувати інваріантом, історією продукту чи очікуванням користувача, навіть якщо кроку немає в специфікації; конфлікт оракулів фіксують і уточнюють із зацікавленими сторонами.",
        sampleEn: "A bug can be justified by an invariant, product history, or a user expectation even if the step is missing from the spec; a clash of oracles is recorded and clarified with stakeholders.",
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
          { kind: "mcq", promptUk: "Що таке «тур по грошах»?", promptEn: "What is a 'money tour'?", options: ["пройти всі місця, де змінюються гроші, знижки, повернення, комісії", "лише відкрити прайс на сайті", "аудит бухгалтерії без продукту", "навантажувальний тест каси"], optionsEn: ["Explore where money, discounts, refunds, and fees change", "Only open the price page", "Audit accounting without the product", "Load-test a checkout"], correctIndex: 0, explanationUk: "Гроші — концентрований ризик.", explanationEn: "Money is concentrated risk." },
          { kind: "fill", promptUk: "Допишіть евристику маршруту сесії", promptEn: "Fill in the session route heuristic", language: "javascript", code: "// localisation ___ : long German nouns, RTL, plural forms", accepted: ["tour"], caseSensitive: true, explanationUk: "Тур — назва евристики.", explanationEn: "A tour is the name of the heuristic." },
          { kind: "mcq", promptUk: "Чому список із двадцяти турів, пройдених «галочкою» за день, слабкий?", promptEn: "Why is a list of twenty tours ticked off in a day a weak approach?", options: ["тури мають живити мислення в межах чартера, а не заміняти його конвеєром", "двадцять — заборонене число", "за день не можна тестувати", "галочки заборонені в QA"], optionsEn: ["Tours should guide thinking within a charter, not replace it with a checklist", "Twenty is a forbidden number", "Testing cannot happen during the day", "Checkmarks are forbidden in QA"], correctIndex: 0, explanationUk: "Якість спостереження важливіша за кількість етикеток.", explanationEn: "The quality of observation matters more than the number of labels." }
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
      { promptUk: "Чартер сесії задає…", promptEn: "A session charter sets…", options: ["мету, ризик і час, не кожен клік", "покрокові 15 кліків обов'язково", "лише список багів без мети", "розклад CI"], optionsEn: ["A goal, risk, and timebox rather than every click", "Exactly fifteen mandatory clicks", "Only a bug list without a goal", "The CI schedule"], correctIndex: 0, explanationUk: "Кероване дослідження.", explanationEn: "Guided exploration." },
      { promptUk: "Оракул — це…", promptEn: "An oracle is…", options: ["принцип, за яким результат визнають неправильним", "завжди лише текст специфікації", "інструмент автоматизації UI", "ім'я стенда"], optionsEn: ["A principle for judging whether a result is wrong", "Always only the specification text", "A UI automation tool", "The environment name"], correctIndex: 0, explanationUk: "Критерій правильності.", explanationEn: "A correctness criterion." },
      { promptUk: "Суперечливі оракули часто означають…", promptEn: "Conflicting oracles often mean…", options: ["конфлікт очікувань, який треба зафіксувати й уточнити", "що багів немає", "що сесію треба скасувати без запису", "що автоматизація неможлива"], optionsEn: ["A requirements conflict to record and clarify", "There are no bugs", "The session should end without a record", "Automation is impossible"], correctIndex: 0, explanationUk: "Конфлікт теж знахідка.", explanationEn: "A conflict is also a finding." },
      { promptUk: "Тур…", promptEn: "A tour is…", options: ["евристика маршруту, що живить чартер", "заміна чартера конвеєром галочок", "навантажувальний профіль JMeter", "обов'язковий 20-пунктовий стандарт"], optionsEn: ["A route heuristic that informs the charter", "A replacement for the charter with a checklist", "A JMeter load profile", "A mandatory twenty-point standard"], correctIndex: 0, explanationUk: "Об'єктив, не конвеєр.", explanationEn: "A lens, not a conveyor." }
    ],
  )
];

const insertions: Record<string, LessonContent[]> = {};

export function expandQaTheory(course: CourseContent): CourseContent {
  return expandCourse(course, insertions, newUnits);
}
