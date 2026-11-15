import type { CourseContent, LessonContent, UnitContent } from "../types.js";
import { expandCourse, sectionUnit, teachLesson } from "./factory.js";

export const newUnits: UnitContent[] = [
  sectionUnit(
    "pg_jsonb_fts",
    "JSONB, індекси та повнотекстовий пошук",
    "JSONB, indexes, and full-text search",
    [
      {
        slug: "pg-jsonb-gin",
        titleUk: "JSONB: документ у рядку, і індекс, без якого запит сканує все",
        titleEn: "JSONB: a document in a row, and the index without which a query scans everything",
        difficulty: 3,
        pointsUk: ["GIN для @> і наявності ключа, інакше seq scan", "Часті поля — колонка, не вічний великий документ", "Паралельні jsonb_set потребують обережності"],
        pointsEn: ["GIN for @> and key existence, otherwise a seq scan", "Frequent fields become a column, not an endless large document", "Concurrent jsonb_set needs care"],
        conceptUk: "JSONB зберігає JSON у бінарному вигляді з порівнянням за значенням (дублікати ключів зникають, пробіли не важливі) — на відміну від JSON як тексту. Це зручно для атрибутів, які не хочете нормалізувати одразу. Запит `payload @> '{\"status\":\"paid\"}'` без індексу читає всю таблицю. GIN (often jsonb_path_ops або jsonb_ops) прискорює containment і існування ключа. Не кладіть увесь домен у один JSONB 'на всяк випадок': обмеження CHECK, зовнішні ключі й статистика працюють гірше. Часто запитувані поля вигідно винести в колонку або generated column і індексувати як звичайне поле. Пишіть до документа через jsonb_set обережно — гонки двох оновлень можуть затерти ключі без версіонування.",
        conceptEn: "JSONB stores JSON in a binary form with value-level comparison (duplicate keys disappear, whitespace does not matter) — unlike JSON as text. That is convenient for attributes you do not want to normalize yet. A `payload @> '{\"status\":\"paid\"}'` query without an index reads the whole table. A GIN index (often jsonb_path_ops or jsonb_ops) speeds containment and key existence. Do not put the whole domain into one JSONB 'just in case': CHECKs, foreign keys, and statistics work worse. Frequently queried fields are worth extracting into a column or a generated column and indexing as a normal field. Write into the document with jsonb_set carefully — two concurrent updates can overwrite keys without versioning.",
        code: "CREATE INDEX ON orders USING gin (payload jsonb_path_ops);\nSELECT id FROM orders WHERE payload @> '{\"status\":\"paid\"}';",
        language: "sql",
        retrieval: [
          { kind: "mcq", promptUk: "Чому payload @> '{\"paid\":true}' на мільйоні рядків без індексу повільний?", promptEn: "Why is payload @> '{\"paid\":true}' on a million rows slow without an index?", options: ["Postgres читає кожен документ; GIN індекс на JSONB це виправляє", "оператор @> заборонений", "JSONB не підтримує порівняння", "потрібен лише btree на всьому документі як текст"], correctIndex: 0, explanationUk: "Без GIN — повне сканування.", explanationEn: "Without GIN — a full scan." },
          { kind: "fill", promptUk: "Допишіть оператор containment для JSONB", promptEn: "Fill in the JSONB containment operator", language: "sql", code: "SELECT id FROM orders WHERE payload ___ '{\"status\":\"paid\"}'::jsonb;", accepted: ["@>"], caseSensitive: true, explanationUk: "@> означає 'містить'.", explanationEn: "@> means 'contains'." },
          { kind: "read", promptUk: "Що краще для статусу, за яким фільтрують у кожному запиті?", promptEn: "What is better for a status that every query filters on?", language: "sql", code: "-- option A: payload->>'status'  -- option B: generated column status + btree", options: ["винести в колонку (або generated) з btree, не покладатись лише на великий JSONB", "завжди тримати лише в вкладеному JSON на 50 рівнів", "текстовий тип JSON без індексу", "окрему базу на запит"], correctIndex: 0, explanationUk: "Часте поле заслуговує колонку.", explanationEn: "A frequent field deserves a column." }
        ],
        whyUk: "Як зберігати гнучкі атрибути замовлення й швидко шукати за status=paid?",
        whyEn: "How do you store flexible order attributes and still search quickly for status=paid?",
        ideas: [{ labelUk: "JSONB для гнучкого", labelEn: "JSONB for the flexible part", anyOf: ["jsonb", "документ", "document", "атрибут"] }, { labelUk: "GIN для @>", labelEn: "GIN for @>", anyOf: ["gin", "@>", "індекс", "index", "scan"] }, { labelUk: "часте поле — колонка", labelEn: "a frequent field is a column", anyOf: ["колон", "column", "generated", "status", "btree"] }],
        sampleUk: "Гнучкі атрибути кладуть у JSONB з GIN для @>, а статус, за яким фільтрують постійно, виносять у колонку з btree; без індексу запит сканує всю таблицю, а увесь домен у одному документі ускладнює обмеження.",
        sampleEn: "You put flexible attributes in JSONB with a GIN for @>, and a status that is filtered constantly is extracted into a column with a btree; without an index the query scans the whole table, and the whole domain in one document makes constraints harder.",
      },
      {
        slug: "pg-fts-gin",
        titleUk: "Повнотекстовий пошук: tsvector, мова й ранг, не LIKE '%слово%'",
        titleEn: "Full-text search: tsvector, language, and rank — not LIKE '%word%'",
        difficulty: 3,
        pointsUk: ["tsvector + GIN замість LIKE '%…%'", "Мову вказують явно", "Точний код — btree, не FTS"],
        pointsEn: ["tsvector + GIN instead of LIKE '%…%'", "The language is set explicitly", "An exact code uses a btree, not FTS"],
        conceptUk: "LIKE '%слово%' не використовує звичайний btree і погано працює з морфологією (знайти 'бігти' за 'біжить'). Повнотекстовий пошук Postgres будує tsvector (лексеми з урахуванням мови, стоп-слова) і tsquery, індекс GIN або GiST на tsvector, і ранжує ts_rank. Мову вказують явно (`to_tsvector('ukrainian', title)`), інакше конфіг за замовчуванням зламає стемінг. Зберігайте tsvector в generated column і оновлюйте автоматично. Для автодоповнення префіксів інколи потрібен інший інструмент (триграми pg_trgm або зовнішній рушій). FTS — не заміна точного коду замовлення через btree.",
        conceptEn: "LIKE '%word%' does not use a normal btree and works poorly with morphology (finding 'run' from 'running'). Postgres full-text search builds a tsvector (lexemes with a language and stop words) and a tsquery, a GIN or GiST index on the tsvector, and ranks with ts_rank. You set the language explicitly (`to_tsvector('ukrainian', title)`), or the default config will break stemming. Store the tsvector in a generated column and let it update automatically. Prefix autocomplete sometimes needs another tool (pg_trgm trigrams or an external engine). FTS is not a substitute for an exact order code via a btree.",
        code: "doc tsvector GENERATED ALWAYS AS (to_tsvector('english', title || ' ' || body)) STORED;\nCREATE INDEX ON articles USING gin(doc);\nSELECT id FROM articles WHERE doc @@ plainto_tsquery('english', $$vacuum$$) ORDER BY ts_rank(doc, plainto_tsquery('english', $$vacuum$$)) DESC;",
        language: "sql",
        retrieval: [
          { kind: "mcq", promptUk: "Чому LIKE '%біжить%' погано шукає 'бігти' в великій таблиці?", promptEn: "Why is LIKE '%running%' a poor way to find 'run' in a large table?", options: ["немає морфології й зазвичай немає індексу на провідний %", "LIKE завжди використовує GIN", "tsvector забороняє українську", "btree ідеально покриває %слово%"], correctIndex: 0, explanationUk: "Для мови — tsvector, для префікса — інший індекс.", explanationEn: "For language — tsvector, for a prefix — another index." },
          { kind: "fill", promptUk: "Допишіть тип колонки лексемного індексу", promptEn: "Fill in the column type of the lexeme index", language: "sql", code: "ALTER TABLE articles ADD COLUMN doc ___ GENERATED ALWAYS AS (to_tsvector('english', title || ' ' || body)) STORED;", accepted: ["tsvector"], caseSensitive: true, explanationUk: "Колонка типу tsvector.", explanationEn: "A tsvector column." },
          { kind: "read", promptUk: "Як шукати статті мовою конфігурації english?", promptEn: "How do you search articles with the english configuration?", language: "sql", code: "SELECT id FROM articles WHERE doc @@ plainto_tsquery('english', 'vacuum freeze');", options: ["оператор @@ між tsvector і tsquery з тією самою мовою", "LIKE '%vacuum%' обов'язково", "лише pg_trgm", "без індексу завжди швидше"], correctIndex: 0, explanationUk: "Мова вектор і запиту має збігатись.", explanationEn: "The vector and query language must match." }
        ],
        whyUk: "Як зробити пошук статей за змістом швидким і чутливим до словоформ?",
        whyEn: "How do you make article search fast and aware of word forms?",
        ideas: [{ labelUk: "tsvector і мова", labelEn: "tsvector and language", anyOf: ["tsvector", "мов", "language", "to_tsvector"] }, { labelUk: "GIN і @@", labelEn: "GIN and @@", anyOf: ["gin", "@@", "tsquery", "rank"] }, { labelUk: "не LIKE %", labelEn: "not LIKE %", anyOf: ["like", "%", "btree", "морфолог", "morpholog"] }],
        sampleUk: "Будують tsvector з явною мовою, індексують GIN, шукають через @@ і ts_rank; LIKE '%слово%' не дає морфології й погано індексується, а точний код замовлення лишають на btree.",
        sampleEn: "You build a tsvector with an explicit language, you index it with GIN, and you search with @@ and ts_rank; LIKE '%word%' has no morphology and indexes poorly, and an exact order code stays on a btree.",
      },
      {
        slug: "pg-generated-trigram",
        titleUk: "Generated-колонки та триграми: коли поле виводять і коли шукають схожість",
        titleEn: "Generated columns and trigrams: when a field is derived, and when you search for similarity",
        difficulty: 3,
        pointsUk: ["Generated тримає похідне поле узгодженим і індексованим", "pg_trgm для ILIKE й схожості, не замість усього FTS", "Розширення ставлять міграцією"],
        pointsEn: ["Generated keeps a derived field consistent and indexed", "pg_trgm for ILIKE and similarity, not as a total FTS replacement", "The extension is installed by a migration"],
        conceptUk: "Generated column (STORED) обчислюється з інших колонок і завжди узгоджена: повне ім'я з first і last, нормалізований email, tsvector. Її можна індексувати. VIRTUAL у новіших версіях не займає місце, але не завжди індексується так само. Триграмний індекс pg_trgm (GIN/GiST) прискорює ILIKE '%фрагмент%', схожість і опечатки (`%` і `<%`) — те, що FTS не закриває як автодоповнення. Не ставте trgm на величезний текст без потреби: індекс роздувається. Для 'майже як' адрес і назв trgm часто кращий за FTS. Узгоджуйте COLLATE й розширення в міграції, не вручну на одній репліці.",
        conceptEn: "A generated column (STORED) is computed from other columns and stays consistent: a full name from first and last, a normalized email, a tsvector. You can index it. VIRTUAL in newer versions takes no space, but is not always indexed the same way. A pg_trgm trigram index (GIN/GiST) speeds ILIKE '%fragment%', similarity, and typos (`%` and `<%`) — what FTS does not cover as autocomplete. Do not put trgm on huge text without a need: the index bloats. For 'almost like' addresses and names, trgm is often better than FTS. Agree COLLATE and the extension in a migration, not by hand on one replica.",
        code: "CREATE EXTENSION pg_trgm;\nCREATE INDEX ON users USING gin (email gin_trgm_ops);\nSELECT * FROM users WHERE email ILIKE '%@gmail.%';",
        language: "sql",
        retrieval: [
          { kind: "mcq", promptUk: "Навіщо generated-колонка full_name, а не вираз у кожному SELECT?", promptEn: "Why a generated full_name column, rather than an expression in every SELECT?", options: ["її можна індексувати й вона не розійдеться з first/last", "generated забороняє індекси", "вираз у SELECT завжди швидший на запис", "Postgres не вміє конкатенацію в SELECT"], correctIndex: 0, explanationUk: "Одне джерело правди й індекс.", explanationEn: "One source of truth and an index." },
          { kind: "fill", promptUk: "Допишіть розширення для триграм", promptEn: "Fill in the trigram extension", language: "sql", code: "CREATE EXTENSION IF NOT EXISTS ___;", accepted: ["pg_trgm"], caseSensitive: true, explanationUk: "pg_trgm додає схожість і індекс для ILIKE.", explanationEn: "pg_trgm adds similarity and an ILIKE index." },
          { kind: "read", promptUk: "Який індекс допоможе WHERE email ILIKE '%@gmail.%'?", promptEn: "Which index helps WHERE email ILIKE '%@gmail.%'?", language: "sql", code: "CREATE INDEX ON users USING gin (email gin_trgm_ops);", options: ["триграмний GIN (pg_trgm), бо провідний % не бере звичайний btree", "звичайний btree на email як для =", "лише tsvector української", "хеш на весь рядок обов'язково"], correctIndex: 0, explanationUk: "Провідний % — задача trgm.", explanationEn: "A leading % is a trgm job." }
        ],
        whyUk: "Як швидко шукати користувача за фрагментом email і тримати повне ім'я узгодженим?",
        whyEn: "How do you search a user quickly by an email fragment and keep the full name consistent?",
        ideas: [{ labelUk: "generated-колонка", labelEn: "a generated column", anyOf: ["generated", "full_name", "узгод", "consistent"] }, { labelUk: "pg_trgm", labelEn: "pg_trgm", anyOf: ["trgm", "триграм", "ilike", "схож", "similar"] }, { labelUk: "не btree на %", labelEn: "not a btree on %", anyOf: ["btree", "%", "провідн", "leading"] }],
        sampleUk: "Повне ім'я тримають у generated-колонці з індексом, а пошук за фрагментом email роблять через pg_trgm, бо btree не допомагає ILIKE з провідним %; розширення ставлять міграцією.",
        sampleEn: "You keep the full name in a generated column with an index, and you search an email fragment with pg_trgm, because a btree does not help ILIKE with a leading %; the extension is installed by a migration.",
      }
    ],
    "Контрольна: JSONB і пошук",
    "Exam: JSONB and search",
    [
      { promptUk: "Оператор @> на JSONB без GIN…", promptEn: "The @> operator on JSONB without a GIN…", options: ["сканує документи послідовно", "завжди використовує btree", "заборонений", "замінює FTS"], correctIndex: 0, explanationUk: "Потрібен GIN.", explanationEn: "You need a GIN." },
      { promptUk: "Часте поле status у великому JSONB краще…", promptEn: "A frequent status field in a large JSONB is better…", options: ["винести в колонку й btree", "залишити лише на глибині 12", "шукати LIKE", "ніколи не індексувати"], correctIndex: 0, explanationUk: "Колонка для частого фільтра.", explanationEn: "A column for a frequent filter." },
      { promptUk: "LIKE '%слово%' для морфології…", promptEn: "LIKE '%word%' for morphology is…", options: ["слабкий; беріть tsvector з явною мовою", "кращий за FTS завжди", "використовує gin_trgm_ops обов'язково", "рівний @@"], correctIndex: 0, explanationUk: "Мова й лексеми — FTS.", explanationEn: "Language and lexemes are FTS." },
      { promptUk: "Мову to_tsvector варто…", promptEn: "The language for to_tsvector should be…", options: ["вказати явно, щоб стемінг не зламався", "завжди лишати default", "брати з LIKE", "ігнорувати для english"], correctIndex: 0, explanationUk: "Конфіг мови явний.", explanationEn: "The language config is explicit." },
      { promptUk: "pg_trgm допомагає…", promptEn: "pg_trgm helps with…", options: ["ILIKE '%фрагмент%' і схожістю рядків", "морфологією української замість tsvector", "зовнішніми ключами", "GIN на jsonb @>"], correctIndex: 0, explanationUk: "Триграми для фрагментів.", explanationEn: "Trigrams for fragments." },
      { promptUk: "Generated-колонка зручна тим, що…", promptEn: "A generated column is convenient because…", options: ["похідне поле узгоджене й індексується", "вона замінює реплікацію", "VIRTUAL завжди швидший на запис за диск", "вона забороняє FTS"], correctIndex: 0, explanationUk: "Одне джерело й індекс.", explanationEn: "One source and an index." }
    ],
  ),
  sectionUnit(
    "pg_rls_notify",
    "RLS,advisory locks і сповіщення",
    "RLS, advisory locks, and notifications",
    [
      {
        slug: "pg-rls-tenant",
        titleUk: "Row Level Security: база не довіряє, що додаток 'вже відфільтрував'",
        titleEn: "Row Level Security: the database does not trust that the app 'already filtered'",
        difficulty: 3,
        pointsUk: ["Політика на рядку страхує забутий WHERE", "FORCE RLS і тест від ролі додатка", "Індекс на ключ політики"],
        pointsEn: ["A row policy covers a forgotten WHERE", "FORCE RLS and a test as the app role", "An index on the policy key"],
        conceptUk: "RLS додає політики на таблицю: які рядки видно й що можна змінити, залежно від `current_setting('app.tenant_id')` або ролі. Це захист, коли багато орендарів у одній таблиці: забутий `WHERE tenant_id =` у новому запиті не витягне чужі дані, якщо політика FORCE ROW LEVEL SECURITY для власника теж увімкнена (інакше суперкористувач і власник таблиці політики обходять). Тестуйте політики від імені ролі додатка, не лише як суперюзер. Помилка 'політика завжди TRUE' гірша за відсутність RLS — створює хибне відчуття безпеки. Індекс на ключ політики (tenant_id) потрібен, інакше кожен запит дорожчає.",
        conceptEn: "RLS adds policies on a table: which rows are visible and what can be changed, depending on `current_setting('app.tenant_id')` or a role. That is protection when many tenants share one table: a forgotten `WHERE tenant_id =` in a new query will not pull someone else's data, if FORCE ROW LEVEL SECURITY is also on for the owner (otherwise a superuser and the table owner bypass the policies). Test policies as the application role, not only as a superuser. A 'policy is always TRUE' mistake is worse than no RLS — it creates a false sense of security. An index on the policy key (tenant_id) is needed, or every query gets more expensive.",
        code: "ALTER TABLE orders ENABLE ROW LEVEL SECURITY;\nALTER TABLE orders FORCE ROW LEVEL SECURITY;\nCREATE POLICY tenant_iso ON orders USING (tenant_id = current_setting('app.tenant_id')::uuid);",
        language: "sql",
        retrieval: [
          { kind: "mcq", promptUk: "Чому перевірка RLS під суперкористувачем дає хибну впевненість?", promptEn: "Why does checking RLS as a superuser give false confidence?", options: ["суперкористувач обходить політики; треба роль додатка", "суперкористувач завжди бачить менше рядків", "RLS не працює в Postgres", "FORCE вимикає індекси"], correctIndex: 0, explanationUk: "Тестуйте тією роллю, що в проді.", explanationEn: "Test as the role that runs in prod." },
          { kind: "fill", promptUk: "Допишіть параметр орендаря, який читає політика", promptEn: "Fill in the tenant parameter the policy reads", language: "sql", code: "CREATE POLICY tenant_iso ON orders USING (tenant_id = current_setting('app.___')::uuid);", accepted: ["tenant_id", "tenant"], caseSensitive: true, explanationUk: "Сесія виставляє app.tenant_id.", explanationEn: "The session sets app.tenant_id." },
          { kind: "read", promptUk: "Навіщо FORCE ROW LEVEL SECURITY власнику таблиці?", promptEn: "Why FORCE ROW LEVEL SECURITY for the table owner?", language: "sql", code: "ALTER TABLE orders FORCE ROW LEVEL SECURITY;", options: ["інакше власник (часто роль міграцій) бачить усі рядки без політики", "FORCE прискорює seq scan", "без FORCE політики не компілюються", "це вимикає індекс tenant_id"], correctIndex: 0, explanationUk: "Власник за замовчуванням обходить RLS.", explanationEn: "The owner bypasses RLS by default." }
        ],
        whyUk: "Як захистити мультитенантну таблицю orders від забутого WHERE tenant_id?",
        whyEn: "How do you protect a multi-tenant orders table from a forgotten WHERE tenant_id?",
        ideas: [{ labelUk: "політика RLS", labelEn: "an RLS policy", anyOf: ["rls", "політик", "policy", "tenant"] }, { labelUk: "FORCE і роль додатка", labelEn: "FORCE and the app role", anyOf: ["force", "власник", "owner", "супер", "super", "роль", "role"] }, { labelUk: "індекс ключа", labelEn: "an index on the key", anyOf: ["індекс", "index", "tenant_id"] }],
        sampleUk: "Вмикають RLS і FORCE для власника, політика порівнює tenant_id із налаштуванням сесії, тести йдуть від ролі додатка, на ключ ставлять індекс; суперкористувач і політика TRUE створюють хибну впевненість.",
        sampleEn: "You turn on RLS and FORCE for the owner, the policy compares tenant_id to a session setting, tests run as the app role, and you index the key; a superuser and a TRUE policy create false confidence.",
      },
      {
        slug: "pg-advisory-lock",
        titleUk: "Advisory lock: домовленість додатка, не замок рядка",
        titleEn: "An advisory lock: an application agreement, not a row lock",
        difficulty: 3,
        pointsUk: ["Це домовленість на ключі, не заміна row lock і UNIQUE", "Транзакційний замок знімається сам, сесійний — ні", "Документуйте простір ключів"],
        pointsEn: ["It is an agreement on a key, not a replacement for a row lock or UNIQUE", "A transactional lock releases itself, a session one does not", "Document the key space"],
        conceptUk: "Advisory locks (`pg_advisory_lock`, `pg_try_advisory_xact_lock`) — числові ключі, які Postgres тримає як прапорці для додатка: 'цей рахунок зараз закривається', 'міграція кроку 4'. Вони не блокують звичайні UPDATE рядка автоматично — обидві сторони мають викликати той самий ключ. Транзакційний варіант знімається в кінці COMMIT/ROLLBACK, сесійний — треба unlock явно, інакше після падіння клієнта замок висить, доки сесія жива. Не використовуйте їх замість унікального обмеження: гонка insert все одно потребує UNIQUE. Добре підходять для 'лише один воркер обробляє цю чергу'. Ключі документуйте, щоб не зіткнутись із чужим модулем на тому ж числі.",
        conceptEn: "Advisory locks (`pg_advisory_lock`, `pg_try_advisory_xact_lock`) are numeric keys Postgres holds as flags for the application: 'this account is being closed now', 'migration step 4'. They do not automatically block a normal UPDATE of a row — both sides have to call the same key. The transactional variant is released at COMMIT/ROLLBACK; the session one must be unlocked explicitly, or after a client crash the lock hangs for as long as the session lives. Do not use them instead of a unique constraint: a racing insert still needs UNIQUE. They fit 'only one worker processes this queue'. Document the keys so you do not collide with another module on the same number.",
        code: "SELECT pg_try_advisory_xact_lock(hashtext('close:' || account_id));\n-- if false, another worker is closing; UNIQUE still protects inserts",
        language: "sql",
        retrieval: [
          { kind: "mcq", promptUk: "Чому pg_advisory_lock(42) не зупинить чужий UPDATE без цього виклику?", promptEn: "Why will pg_advisory_lock(42) not stop someone else's UPDATE that does not call it?", options: ["замок діє лише для тих, хто бере той самий ключ; це не FOR UPDATE рядка", "advisory завжди блокує всю таблицю", "UPDATE ігнорує всі замки", "ключ 42 зарезервований системою"], correctIndex: 0, explanationUk: "Обидві сторони мають брати участь.", explanationEn: "Both sides have to take part." },
          { kind: "fill", promptUk: "Допишіть транзакційний try-замок", promptEn: "Fill in the transactional try-lock", language: "sql", code: "SELECT pg_try_advisory____lock(hashtext('invoice:' || id));", accepted: ["_xact_", "xact"], caseSensitive: true, explanationUk: "xact знімається в кінці транзакції.", explanationEn: "xact is released at the end of the transaction." },
          { kind: "read", promptUk: "Що небезпечного в сесійному advisory lock без unlock після помилки?", promptEn: "What is dangerous about a session advisory lock with no unlock after an error?", language: "sql", code: "SELECT pg_advisory_lock(7); -- then the job throws, no unlock", options: ["замок лишається, доки живе сесія, і інші воркери чекають даремно", "Postgres знімає сесійний замок на кожному STATEMENT", "ключ 7 тоді стає UNIQUE", "транзакція відкочує сесійний замок завжди"], correctIndex: 0, explanationUk: "Для робіт у транзакції — xact-варіант.", explanationEn: "For in-transaction work — the xact variant." }
        ],
        whyUk: "Як гарантувати, що лише один воркер закриває рахунок, не замінюючи UNIQUE?",
        whyEn: "How do you make sure only one worker closes an account, without replacing UNIQUE?",
        ideas: [{ labelUk: "той самий ключ", labelEn: "the same key", anyOf: ["advisory", "ключ", "key", "замок", "lock"] }, { labelUk: "краще xact", labelEn: "preferably xact", anyOf: ["xact", "транзакц", "transaction", "unlock", "сесі"] }, { labelUk: "UNIQUE лишається", labelEn: "UNIQUE stays", anyOf: ["unique", "insert", "заміна", "replace"] }],
        sampleUk: "Беруть транзакційний advisory lock на узгодженому ключі, щоб лише один воркер ішов далі, документують простір ключів і не замінюють цим UNIQUE чи FOR UPDATE; сесійний замок без unlock може повиснути.",
        sampleEn: "You take a transactional advisory lock on an agreed key so only one worker proceeds, you document the key space, and you do not replace UNIQUE or FOR UPDATE with it; a session lock without unlock can hang.",
      },
      {
        slug: "pg-listen-notify",
        titleUk: "LISTEN/NOTIFY: легкий сигнал, не черга з гарантією",
        titleEn: "LISTEN/NOTIFY: a light signal, not a queue with a guarantee",
        difficulty: 3,
        pointsUk: ["Сигнал після COMMIT, не збережена черга", "Таблиця-черга + NOTIFY як будильник", "Після reconnect — знову LISTEN; без секретів у payload"],
        pointsEn: ["A signal after COMMIT, not a stored queue", "A queue table + NOTIFY as a wake-up", "After a reconnect — LISTEN again; no secrets in the payload"],
        conceptUk: "NOTIFY канал і LISTEN дозволяють сесіям отримати подію (з опційним payload до ~8 КБ) після COMMIT. Це зручно, щоб скинути кеш, розбудити воркер або оновити підписку UI. Це не черга: якщо слухач був офлайн, повідомлення не збережеться; кілька повідомлень можуть злитись (`pg_notify` з однаковим payload). Для надійної роботи комбінують таблицю-чергу (джерело правди) і NOTIFY як 'прокинься'. Payload не для великих документів. Канали — імена, не секрет: не кладіть токени в payload. Після reconnect треба знову LISTEN.",
        conceptEn: "NOTIFY on a channel and LISTEN let sessions receive an event (with an optional payload up to about 8 KB) after COMMIT. That is convenient for invalidating a cache, waking a worker, or refreshing a UI subscription. It is not a queue: if the listener was offline, the message is not stored; several messages may be coalesced (`pg_notify` with the same payload). For reliable work you combine a queue table (the source of truth) with NOTIFY as 'wake up'. The payload is not for large documents. Channels are names, not a secret: do not put tokens in the payload. After a reconnect you must LISTEN again.",
        code: "INSERT INTO work_queue(id, payload) VALUES ($1, $2);\nPERFORM pg_notify('work', $1::text);\n-- worker: LISTEN work; then SELECT unfinished FROM work_queue",
        language: "sql",
        retrieval: [
          { kind: "mcq", promptUk: "Що станеться, якщо воркер був мертвий під час NOTIFY?", promptEn: "What happens if the worker was dead during a NOTIFY?", options: ["сигнал зникне; надійність дає таблиця-черга, яку воркер прочитає після старту", "Postgres збереже NOTIFY вічно", "payload стане рядком таблиці сам", "LISTEN після старту отримує всю історію"], correctIndex: 0, explanationUk: "NOTIFY не є брокером з персистенцією.", explanationEn: "NOTIFY is not a broker with persistence." },
          { kind: "fill", promptUk: "Допишіть команду підписки на канал", promptEn: "Fill in the command that subscribes to a channel", language: "sql", code: "___ cache_bust;", accepted: ["LISTEN"], caseSensitive: true, explanationUk: "LISTEN cache_bust.", explanationEn: "LISTEN cache_bust." },
          { kind: "read", promptUk: "Навіщо в транзакції і INSERT у queue, і pg_notify?", promptEn: "Why both an INSERT into a queue and pg_notify in one transaction?", language: "sql", code: "INSERT INTO work_queue(id) VALUES ($1); PERFORM pg_notify('work', $1::text);", options: ["рядок — джерело правди, notify — швидкий будильник після COMMIT", "notify зберігає рядок, INSERT зайвий", "без INSERT notify персистентний", "канали шифрують таблицю"], correctIndex: 0, explanationUk: "Два різні обов'язки.", explanationEn: "Two different jobs." }
        ],
        whyUk: "Як розбудити воркер про нове завдання, не втративши його, якщо воркер спав?",
        whyEn: "How do you wake a worker about a new job without losing it if the worker was asleep?",
        ideas: [{ labelUk: "таблиця-черга", labelEn: "a queue table", anyOf: ["черг", "queue", "таблиц", "table", "правд", "truth"] }, { labelUk: "NOTIFY як будильник", labelEn: "NOTIFY as a wake-up", anyOf: ["notify", "listen", "будил", "wake", "commit"] }, { labelUk: "не лише сигнал", labelEn: "not only the signal", anyOf: ["офлайн", "offline", "зник", "lost", "reconnect"] }],
        sampleUk: "Пишуть завдання в таблицю-чергу як джерело правди й шлють NOTIFY після COMMIT як будильник; якщо воркер був офлайн, він прочитає таблицю після старту й знову зробить LISTEN — сам сигнал не зберігається.",
        sampleEn: "You write the job into a queue table as the source of truth and you send NOTIFY after COMMIT as a wake-up; if the worker was offline, it reads the table after start and LISTENs again — the signal itself is not stored.",
      }
    ],
    "Контрольна: RLS і сигнали",
    "Exam: RLS and signals",
    [
      { promptUk: "Тест RLS під суперкористувачем…", promptEn: "An RLS test as a superuser is…", options: ["хибна впевненість: політики обходяться", "достатній для прод", "заміна FORCE", "індекс ключа"], correctIndex: 0, explanationUk: "Тестуйте роль додатка.", explanationEn: "Test the app role." },
      { promptUk: "FORCE ROW LEVEL SECURITY потрібен, бо…", promptEn: "FORCE ROW LEVEL SECURITY is needed because…", options: ["власник таблиці інакше обходить політики", "це вмикає GIN", "це замінює tenant_id", "це вимикає індекси"], correctIndex: 0, explanationUk: "Власник за замовчуванням без політики.", explanationEn: "The owner is unrestricted by default." },
      { promptUk: "Advisory lock блокує UPDATE…", promptEn: "An advisory lock blocks an UPDATE…", options: ["лише якщо інша сторона бере той самий ключ; це не row lock", "завжди як FOR UPDATE", "замість UNIQUE завжди", "усіх сесій без виклику"], correctIndex: 0, explanationUk: "Домовленість додатка.", explanationEn: "An application agreement." },
      { promptUk: "Сесійний advisory без unlock…", promptEn: "A session advisory lock without unlock can…", options: ["повиснути до кінця сесії", "знятись на STATEMENT завжди", "стати UNIQUE", "замінити xact"], correctIndex: 0, explanationUk: "Для роботи в транзакції — xact.", explanationEn: "For in-transaction work — xact." },
      { promptUk: "NOTIFY для офлайн-слухача…", promptEn: "NOTIFY for an offline listener is…", options: ["втрачається; потрібна таблиця-черга", "зберігається вічно", "шифрує payload", "замінює LISTEN після старту історією"], correctIndex: 0, explanationUk: "Сигнал не черга.", explanationEn: "A signal is not a queue." },
      { promptUk: "Секрети в payload NOTIFY…", promptEn: "Secrets in a NOTIFY payload are…", options: ["погана ідея: канал не сховище секретів", "зашифровані за замовчуванням", "обмежені RLS автоматично", "перSISTENT"], correctIndex: 0, explanationUk: "Не кладіть токени в сигнал.", explanationEn: "Do not put tokens in the signal." }
    ],
  ),
  sectionUnit(
    "pg_pool_replicas",
    "Пул з'єднань, репліки й лаг",
    "Connection pools, replicas, and lag",
    [
      {
        slug: "pg-bouncer-pool",
        titleUk: "PgBouncer: не відкривати по з'єднанню на кожен запит додатка",
        titleEn: "PgBouncer: do not open one database connection per application request",
        difficulty: 3,
        pointsUk: ["Transaction pooling — типовий режим для вебу", "LISTEN і temp tables потребують session", "Короткі транзакції, ліміт від max_connections"],
        pointsEn: ["Transaction pooling is the typical mode for the web", "LISTEN and temp tables need session", "Short transactions, a limit from max_connections"],
        conceptUk: "Кожне з'єднання Postgres — окремий процес із пам'яттю. Тисяча інстансів Node з пулом по 20 легко перевищує max_connections. PgBouncer (або аналог) стоїть попереду й мультиплексує: transaction pooling віддає серверний конект лише на час транзакції — найпрактичніший режим для веб. Session pooling тримає конект на всю клієнтську сесію (потрібно для LISTEN, тимчасових таблиць, prepared на сесію). Statement pooling ламає багатофреймові транзакції. Увімкнений пулер вимагає коротких транзакцій: відкритий BEGIN на хвилини тримає серверний конект і зводить користь нанівець. Ліміти пулу рахують від max_connections і кількості сервісів, не '20 бо так було в прикладі'.",
        conceptEn: "Each Postgres connection is a separate process with memory. A thousand Node instances with a pool of 20 easily exceed max_connections. PgBouncer (or similar) sits in front and multiplexes: transaction pooling hands out a server connection only for the duration of a transaction — the most practical mode for the web. Session pooling keeps the connection for the whole client session (needed for LISTEN, temporary tables, session prepared statements). Statement pooling breaks multi-statement transactions. A pooler requires short transactions: an open BEGIN for minutes holds a server connection and cancels the benefit. Pool limits are counted from max_connections and the number of services, not '20 because the example said so'.",
        code: "# pgbouncer.ini\n; app: pool_mode=transaction, default_pool_size=20\n; listener: pool_mode=session, small pool",
        language: "ini",
        retrieval: [
          { kind: "mcq", promptUk: "Чому LISTEN у режимі transaction pooling працює погано?", promptEn: "Why does LISTEN work poorly in transaction pooling?", options: ["підписка прив'язана до сесії, а серверний конект після COMMIT віддають іншому клієнту", "NOTIFY заборонений із пулом", "PgBouncer не пропускає SQL", "transaction pooling вимикає COMMIT"], correctIndex: 0, explanationUk: "Для LISTEN потрібен session pooling (окремий пул).", explanationEn: "LISTEN needs session pooling (a separate pool)." },
          { kind: "fill", promptUk: "Допишіть типовий режим пулу для веба", promptEn: "Fill in the typical pool mode for the web", language: "ini", code: "pool_mode = ___", accepted: ["transaction"], caseSensitive: true, explanationUk: "transaction віддає конект на час транзакції.", explanationEn: "transaction hands the connection for the transaction." },
          { kind: "read", promptUk: "Що станеться, якщо кожен із 200 подів відкриє 50 конектів без пулера при max_connections=200?", promptEn: "What happens if each of 200 pods opens 50 connections without a pooler at max_connections=200?", language: "bash", code: "max_connections = 200  # 200 pods × 50 = 10000", options: ["нові клієнти отримають too many connections, пам'ять роздується", "Postgres сам згорне пул 50 в 1", "ліміт 200 застосовується на под", "підключиться reserved superuser для всіх"], correctIndex: 0, explanationUk: "Пул між подами й базою обов'язковий.", explanationEn: "A pool between pods and the database is mandatory." }
        ],
        whyUk: "Як пуляти з'єднання веб-сервісу, який ще й слухає LISTEN?",
        whyEn: "How do you pool connections for a web service that also LISTENs?",
        ideas: [{ labelUk: "transaction для веба", labelEn: "transaction for the web", anyOf: ["transaction", "пул", "pool", "коротк", "short"] }, { labelUk: "окремий session для LISTEN", labelEn: "a separate session pool for LISTEN", anyOf: ["session", "listen", "temp", "окрем", "separate"] }, { labelUk: "ліміт від max_connections", labelEn: "a limit from max_connections", anyOf: ["max_connections", "под", "pod", "ліміт", "limit"] }],
        sampleUk: "Основний трафік пулять у режимі transaction з короткими транзакціями, для LISTEN роблять окремий session-пул, а розмір рахують від max_connections і кількості подів, щоб не зловити too many connections.",
        sampleEn: "You pool the main traffic in transaction mode with short transactions, you make a separate session pool for LISTEN, and you size from max_connections and the pod count so you do not hit too many connections.",
      },
      {
        slug: "pg-replica-lag",
        titleUk: "Читання з репліки: лаг, stale й що не можна туди віддавати",
        titleEn: "Reading from a replica: lag, staleness, and what you must not send there",
        difficulty: 3,
        pointsUk: ["Read-your-writes — на primary", "Моніторте replay_lag і виносьте з пулу", "Після failover перевіряйте, куди пише клієнт"],
        pointsEn: ["Read-your-writes goes to the primary", "Monitor replay_lag and remove from the pool", "After failover, check where the client writes"],
        conceptUk: "Репліка (hot standby) знімає читання з первинної, але відстає: після COMMIT на primary рядок може з'явитись на replica через сотні мілісекунд або секунди під навантаженням (`replay_lag`). Показати користувачу 'замовлення створено' і одразу прочитати його з відсталої репліки — порожня сторінка. Записи, транзакції 'прочитав-змінив-записав' і суворі read-your-writes йдуть на primary. Репліку для списків і аналітики позначають явно в коді (read client), не 'випадковий хост'. Моніторте лаг і виводьте репліку з пулу, якщо він вищий за SLO. Після failover переконайтесь, що клієнти змінили роль, а не пишуть у стару primary.",
        conceptEn: "A replica (hot standby) takes reads off the primary, but it lags: after a COMMIT on the primary a row may appear on the replica hundreds of milliseconds or seconds later under load (`replay_lag`). Showing the user 'order created' and immediately reading it from a lagging replica is a blank page. Writes, read-modify-write transactions, and strict read-your-writes go to the primary. A replica for lists and analytics is chosen explicitly in code (a read client), not 'a random host'. Monitor lag and take a replica out of the pool if it exceeds the SLO. After failover, make sure clients switched roles and are not writing to the old primary.",
        code: "-- after INSERT order: SELECT from primary (read-your-writes)\n-- product list: SELECT from replica if replay_lag < SLO",
        language: "sql",
        retrieval: [
          { kind: "mcq", promptUk: "Користувач створив замовлення й одразу відкрив його зі сторінки, що читає репліку з лагом 2 с. Що він побачить?", promptEn: "A user created an order and immediately opened it on a page that reads a replica with 2 s of lag. What will they see?", options: ["ймовірно порожньо або старі дані; це читання має йти на primary", "завжди свіжий рядок, лаг не для SELECT", "репліка блокує INSERT", "COMMIT чекає 2 с автоматично"], correctIndex: 0, explanationUk: "Read-your-writes — primary.", explanationEn: "Read-your-writes goes to the primary." },
          { kind: "fill", promptUk: "Допишіть метрику відставання відтворення", promptEn: "Fill in the replay-lag metric", language: "sql", code: "SELECT replay___ FROM pg_stat_replication;", accepted: ["_lag", "lag"], caseSensitive: true, explanationUk: "replay_lag (або подібні поля в pg_stat_replication).", explanationEn: "replay_lag (or similar fields in pg_stat_replication)." },
          { kind: "read", promptUk: "Що зробити з реплікою, чий лаг вищий за SLO 500 мс?", promptEn: "What do you do with a replica whose lag is above a 500 ms SLO?", language: "bash", code: "# replay_lag = 12s", options: ["прибрати з пулу читання й шукати причину, не віддавати stale як свіже", "збільшити вагу в балансувальнику", "перевести всі записи на неї", "ігнорувати, бо standby завжди актуальний"], correctIndex: 0, explanationUk: "Лаг вищий за SLO — нездоровий вузол.", explanationEn: "Lag above the SLO is an unhealthy node." }
        ],
        whyUk: "Куди віддавати 'створити замовлення і показати його' і куди — каталог товарів?",
        whyEn: "Where do you send 'create an order and show it', and where the product catalog?",
        ideas: [{ labelUk: "записи і read-your-writes на primary", labelEn: "writes and read-your-writes on the primary", anyOf: ["primary", "запис", "write", "your-writes", "замовлен", "order"] }, { labelUk: "каталог на репліку", labelEn: "the catalog on a replica", anyOf: ["реплік", "replica", "каталог", "catalog", "список", "list"] }, { labelUk: "стежити за лагом", labelEn: "watch the lag", anyOf: ["lag", "replay", "slo", "пул", "pool"] }],
        sampleUk: "Створення замовлення і одразушнє його читання йдуть на primary через read-your-writes, каталог можна читати з репліки, лаг моніторять і вузол з лагом вищим за SLO прибирають з пулу.",
        sampleEn: "Creating an order and immediately reading it go to the primary because of read-your-writes, the catalog can be read from a replica, you monitor lag, and a node whose lag exceeds the SLO is removed from the pool.",
      },
      {
        slug: "pg-logical-repl",
        titleUk: "Логічна реплікація: вибір таблиць і конфлікти, не повний клон диска",
        titleEn: "Logical replication: chosen tables and conflicts, not a full disk clone",
        difficulty: 3,
        pointsUk: ["Логічна — обрані таблиці, фізична — увесь диск", "Конфлікти зупиняють apply; слоти моніторять", "Це не два активні майстри 'самі'"],
        pointsEn: ["Logical is selected tables, physical is the whole disk", "Conflicts stop apply; slots are monitored", "This is not two active masters 'by itself'"],
        conceptUk: "Фізична реплікація копіює байти диска й дає точну копію всього інстанса (для standby). Логічна (`CREATE PUBLICATION`, `CREATE SUBSCRIPTION`) передає зміни рядків обраних таблиць — зручно для міграції мажорної версії, вивантаження в аналітику, часткового синку. Підписник — окремий інстанс зі своєю схемою: тригери можуть стріляти, послідовності не синхронні самі, DDL треба планувати. Конфлікт (рядок уже є) зупиняє застосування, доки не вирішите. Реплікаційний слот на видавці, який ніхто не споживає, роздуває WAL і диск — моніторте відставання слотів. Не вважайте логічну репліку хайавом запису на два активних майстри без конфлікт-стратегії.",
        conceptEn: "Physical replication copies disk bytes and gives an exact copy of the whole instance (for a standby). Logical replication (`CREATE PUBLICATION`, `CREATE SUBSCRIPTION`) ships row changes of selected tables — useful for a major-version migration, export to analytics, a partial sync. The subscriber is a separate instance with its own schema: triggers may fire, sequences are not synced by themselves, DDL must be planned. A conflict (the row already exists) stops apply until you resolve it. A replication slot on the publisher that nobody consumes bloats WAL and disk — monitor slot lag. Do not treat logical replication as active-active write HA without a conflict strategy.",
        code: "CREATE PUBLICATION sales FOR TABLE orders, items;\n-- on new major: CREATE SUBSCRIPTION sales_sub CONNECTION '...' PUBLICATION sales;",
        language: "sql",
        retrieval: [
          { kind: "mcq", promptUk: "Навіщо логічна реплікація при оновленні Postgres 15→17?", promptEn: "Why logical replication when upgrading Postgres 15→17?", options: ["можна переносити дані в новий інстанс іншої мажорної версії з контрольованим перемиканням", "фізична репліка завжди вміє інший major без логіки", "PUBLICATION замінює pg_dump завжди і без слотів", "послідовності синхронізуються самі ідеально"], correctIndex: 0, explanationUk: "Логічний потік перетинає major.", explanationEn: "A logical stream crosses majors." },
          { kind: "fill", promptUk: "Допишіть об'єкт видавця логічної реплікації", promptEn: "Fill in the publisher object of logical replication", language: "sql", code: "CREATE ___ my_tables FOR TABLE orders, items;", accepted: ["PUBLICATION", "publication"], caseSensitive: true, explanationUk: "PUBLICATION описує, що віддаємо.", explanationEn: "A PUBLICATION describes what we ship." },
          { kind: "read", promptUk: "Чим небезпечний слот, який забули прибрати після тесту підписника?", promptEn: "What is dangerous about a slot left behind after a subscriber test?", language: "sql", code: "SELECT slot_name, restart_lsn FROM pg_replication_slots WHERE active = false;", options: ["WAL на видавці не очищається й може заповнити диск", "слот сам видаляє таблиці", "неактивний слот прискорює vacuum", "PUBLICATION тоді закривається"], correctIndex: 0, explanationUk: "Моніторте розмір слотів і WAL.", explanationEn: "Monitor slot and WAL size." }
        ],
        whyUk: "Коли обрати логічну реплікацію замість фізичної standby, і на що дивитись після?",
        whyEn: "When do you choose logical replication instead of a physical standby, and what do you watch afterwards?",
        ideas: [{ labelUk: "обрані таблиці чи інший major", labelEn: "selected tables or another major", anyOf: ["логічн", "logical", "publication", "major", "аналітик", "analytics"] }, { labelUk: "конфлікти apply", labelEn: "apply conflicts", anyOf: ["конфлікт", "conflict", "apply", "рядок", "row"] }, { labelUk: "слоти й WAL", labelEn: "slots and WAL", anyOf: ["слот", "slot", "wal", "диск", "disk"] }],
        sampleUk: "Логічну реплікацію обирають для обраних таблиць або міграції мажорної версії, стежать за конфліктами застосування й за слотами, які роздувають WAL; це не заміна фізичного standby і не два активні майстри без стратегії.",
        sampleEn: "You choose logical replication for selected tables or a major-version migration, you watch apply conflicts and slots that bloat WAL; it is not a replacement for a physical standby and not two active masters without a strategy.",
      }
    ],
    "Контрольна: пул і репліки",
    "Exam: pools and replicas",
    [
      { promptUk: "Типовий режим PgBouncer для веба…", promptEn: "The typical PgBouncer mode for the web is…", options: ["transaction pooling", "statement для всіх LISTEN", "без ліміту конектів", "один конект на под × 50 без рахунку"], correctIndex: 0, explanationUk: "Конект на час транзакції.", explanationEn: "A connection for the transaction." },
      { promptUk: "LISTEN у transaction pooling…", promptEn: "LISTEN in transaction pooling is…", options: ["ламається: потрібен session-пул", "ідеальний режим", "заміна таблиці-черги", "збільшує max_connections"], correctIndex: 0, explanationUk: "Підписка прив'язана до сесії.", explanationEn: "The subscription is bound to the session." },
      { promptUk: "Read-your-writes після INSERT…", promptEn: "Read-your-writes after an INSERT should…", options: ["читати з primary, не з відсталої репліки", "завжди йти на будь-яку репліку", "чекати replay_lag у клієнта сонцем", "ігнорувати лаг"], correctIndex: 0, explanationUk: "Інакше порожня сторінка.", explanationEn: "Otherwise a blank page." },
      { promptUk: "Репліку з лагом вищим за SLO…", promptEn: "A replica with lag above the SLO should be…", options: ["прибрано з пулу читання", "отримати більше записів", "вважати primary", "ігнорувати"], correctIndex: 0, explanationUk: "Не віддавайте stale як свіже.", explanationEn: "Do not serve stale as fresh." },
      { promptUk: "Логічна реплікація відрізняється тим, що…", promptEn: "Logical replication is different in that it…", options: ["передає зміни обраних таблиць, не обов'язково весь диск", "завжди клонує весь інстанс побайтно", "не має слотів", "синхронізує послідовності ідеально сама"], correctIndex: 0, explanationUk: "PUBLICATION/SUBSCRIPTION.", explanationEn: "PUBLICATION/SUBSCRIPTION." },
      { promptUk: "Забутий неактивний слот…", promptEn: "A forgotten inactive slot can…", options: ["роздути WAL і заповнити диск видавця", "прискорити vacuum", "сам очиститись за секунду завжди", "замінити max_connections"], correctIndex: 0, explanationUk: "Моніторте слоти.", explanationEn: "Monitor slots." }
    ],
  )
];

const insertions: Record<string, LessonContent[]> = {};

export function expandPostgresqlApps(course: CourseContent): CourseContent {
  return expandCourse(course, insertions, newUnits);
}
