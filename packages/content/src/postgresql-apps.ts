import type { CourseContent } from "./types.js";
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

const relationalModeling = unit(
  "pg_relational_modeling",
  "Реляційне моделювання для вебдодатків",
  "Relational Modeling for Web Apps",
  [
    lesson(
      "pg-rm-entities",
      "Таблиці, ключі (UUID/BIGINT) та 1:N зв'язки ForgeBoard",
      "Entities, Keys & 1:N Modeling in PostgreSQL",
      2, true, [
        { ...mcq(
          "pg-rm1",
          "У застосунку ForgeBoard користувач може створювати проєкти, а кожен проєкт містить багато задач і тегів. Чому теги не варто зберігати комами в одному TEXT-полі `tags`?",
          "In ForgeBoard, projects hold tasks with multiple tags. Why avoid a comma-separated TEXT column `tags`?",
          [
            "Ламаються індексований пошук за тегом, посилальна цілісність, перейменування тегів і коректний підрахунок статистик",
            "PostgreSQL не вміє зберігати тип TEXT довше 10 байт",
            "Коми заборонені стандартом UTF-8",
            "Таблиця зв'язку потребує в 100 разів більше SQL-серверів",
          ],
          0,
          why(
            "Нормалізована зв'язкова таблиця (`task_tags(task_id, tag_id)`) забезпечує точні JOINs, унікальність та швидкі B-Tree індекси.",
            "A join table (`task_tags(task_id, tag_id)`) preserves referential integrity, exact uniqueness, and fast indexed filters.",
          ),
        ), optionsEn: ["Searching and indexing individual tags, referential integrity, renaming, and accurate statistics become difficult","PostgreSQL cannot store more than 10 bytes of TEXT","UTF-8 prohibits commas","A join table requires 100 times more SQL servers"] },
        { ...codeRead(
          "pg-rm2",
          "Аналіз базової схеми PostgreSQL: що означають типи `TEXT` і `TIMESTAMPTZ` у цьому прикладі?",
          "Worked example: what do `TEXT` and `TIMESTAMPTZ` mean in this PostgreSQL schema?",
          "sql",
          "CREATE TABLE projects (\n  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  owner_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n  name TEXT NOT NULL,\n  created_at TIMESTAMPTZ NOT NULL DEFAULT now()\n);",
          [
            "`TEXT` зберігає текст, а `TIMESTAMPTZ` — момент часу; початковий часовий пояс окремо не зберігається",
            "TEXT в Postgres повільніший, тому його заборонено індексувати",
            "TIMESTAMPTZ не підтримує порівняння `>`",
            "IDENTITY у PostgreSQL забороняє додавати PRIMARY KEY",
          ],
          0,
          why(
            "`timestamptz` зберігає момент часу та відображає його в часовому поясі сеансу; початковий пояс або зсув треба зберігати окремо, якщо він потрібен. `text` не задає довільного обмеження довжини.",
            "`timestamptz` stores an instant and displays it in the session time zone; store the original zone or offset separately if needed. `text` imposes no arbitrary length limit.",
          ),
        ), optionsEn: ["TEXT stores text; TIMESTAMPTZ stores an instant without retaining the original time zone separately","TEXT is slower in PostgreSQL and cannot be indexed","TIMESTAMPTZ does not support > comparisons","IDENTITY prevents adding a PRIMARY KEY in PostgreSQL"] },
      ], { baseXp: 22 },
    ),
    lesson(
      "pg-rm-normalization",
      "Уникнення надлишкових копій та оновлення при видаленні",
      "Avoiding Anomalies & Foreign Key Actions",
      2, true, [
        { ...matchEx(
          "pg-rm3",
          "Оберіть доречну поведінку зовнішнього ключа `ON DELETE`",
          "Match each domain requirement to the right `ON DELETE` rule",
          [
            { left: "Видалення задачі видаляє її підзадачі та зв’язки з мітками", right: "ON DELETE CASCADE" },
            { left: "Не можна видалити користувача, доки за ним є виставлені інвойси", right: "ON DELETE RESTRICT" },
            { left: "При видаленні виконавця задача лишається, але assignee_id стає NULL", right: "ON DELETE SET NULL" },
          ],
        ), pairsEn: [{"left":"Deleting a task also deletes its subtasks and tag associations","right":"ON DELETE CASCADE"},{"left":"A user with issued invoices cannot be deleted","right":"ON DELETE RESTRICT"},{"left":"When the assignee is deleted, the task remains and assignee_id becomes NULL","right":"ON DELETE SET NULL"}] },
      ], { baseXp: 22 },
    ),
    exam("pg-rm-exam", "Контрольна: моделювання в PostgreSQL", "Checkpoint: Relational Modeling", 2, [
      mcq(
        "pg-rm-e1",
        "Який тип ідентифікатора є стандартним сучасним автоінкрементом у PostgreSQL (SQL standard)?",
        "Which identity column definition follows modern standard PostgreSQL?",
        [
          "GENERATED ALWAYS AS IDENTITY PRIMARY KEY",
          "NUMBER(10) AUTO_INCREMENT",
          "VARCHAR2(32) SEQUENCE",
          "SERIAL_ORACLE",
        ],
        0,
      ),
      { ...mcq(
        "pg-rm-e3",
        "Що зберігає PostgreSQL у полі TIMESTAMPTZ після введення значення з часовим поясом?",
        "What does PostgreSQL retain in a TIMESTAMPTZ column after a value with a time zone is entered?",
        [
          "Момент часу; початковий часовий пояс або зсув окремо не зберігається",
          "Момент часу разом із початковою назвою часового поясу",
          "Лише текст початкового значення без перетворення",
          "Тільки дату без часу",
        ],
        0,
        why(
          "PostgreSQL зберігає момент у UTC і відображає його в часовому поясі сеансу. Назву початкового поясу потрібно зберігати окремо.",
          "PostgreSQL stores the instant in UTC and displays it in the session time zone. Store the original zone name separately when needed.",
        ),
      ), optionsEn: [
        "The instant; the original time zone or offset is not retained separately",
        "The instant together with the original time zone name",
        "Only the original input text, without conversion",
        "Only the date, without the time",
      ] },
      codeFill(
        "pg-rm-e2",
        "Зберігати мітку часу з урахуванням UTC-часового поясу",
        "Store UTC-aware timestamp column type",
        "sql",
        "updated_at ___ NOT NULL DEFAULT now()",
        ["TIMESTAMPTZ"],
        false,
      ),
    ]),
  ],
);

const constraintsMigrations = unit(
  "pg_constraints_migrations",
  "Обмеження цілісності та безпечні міграції",
  "Constraints & Safe Schema Migrations",
  [
    lesson(
      "pg-cm-constraints",
      "CHECK, UNIQUE та Partial Unique Indexes у PostgreSQL",
      "CHECK Constraints & Partial Unique Indexes",
      3, true, [
        { ...codeRead(
          "pg-cm1",
          "Захист доменних інваріантів на рівні самої бази: Що гарантує частковий унікальний індекс `WHERE deleted_at IS NULL`?",
          "Worked example: enforcing invariants in Postgres: What does the partial unique index `WHERE deleted_at IS NULL` guarantee?",
          "sql",
          "CREATE TABLE tasks (\n  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  project_id BIGINT NOT NULL REFERENCES projects(id),\n  status TEXT NOT NULL CHECK (status IN ('todo', 'in_progress', 'done')),\n  deleted_at TIMESTAMPTZ,\n  slug TEXT NOT NULL\n);\nCREATE UNIQUE INDEX tasks_active_slug_idx ON tasks (project_id, slug) WHERE deleted_at IS NULL;",
          [
            "Лише активні (не видалені м'яко) задачі в межах проєкту не можуть мати однаковий slug, а архівні не заважають",
            "Забороняє мати більше одного проєкту в таблиці",
            "Автоматично видаляє рядки щоночі",
            "Дозволяє ставити status = 'broken'",
          ],
          0,
          why(
            "Partial unique index — потужна функція PostgreSQL для soft-delete та умовних унікальностей.",
            "PostgreSQL partial unique indexes cleanly support soft deletes without unique-key conflicts.",
          ),
        ), optionsEn: ["Only active, non-deleted tasks must have unique slugs within a project; archived tasks do not conflict","It prohibits more than one project in the table","It deletes rows automatically every night","It allows status = 'broken'"] },
        { ...mcq(
          "pg-cm-null",
          "Поле priority допускає NULL і має CHECK (priority >= 0). Яке значення пройде перевірку?",
          "The nullable priority column has CHECK (priority >= 0). Which value passes the constraint?",
          ["NULL", "-1", "-10", "Будь-яке від'ємне число"],
          0,
          why(
            "CHECK приймає результат TRUE або NULL. Щоб заборонити NULL, додайте окреме обмеження NOT NULL.",
            "CHECK accepts TRUE or NULL. Add a separate NOT NULL constraint to reject NULL values.",
          ),
        ), optionsEn: ["NULL", "-1", "-10", "Any negative number"] },
        codeFill(
          "pg-cm2",
          "Заборонити від'ємний пріоритет задачі на рівні БД. Поле priority вже має обмеження NOT NULL.",
          "Enforce non-negative priority with a CHECK constraint. The priority column already has a NOT NULL constraint.",
          "sql",
          "ALTER TABLE tasks ADD CONSTRAINT chk_priority ___ (priority >= 0);",
          ["CHECK"],
          false,
        ),
      ], { baseXp: 24 },
    ),
    lesson(
      "pg-cm-migrations",
      "Ідемпотентні та зворотньо сумісні міграції",
      "Forward-Only Versioned Migrations & Lock Safety",
      3, true, [
        { ...mcq(
          "pg-cm3",
          "Чому не слід редагувати файл міграції, який уже застосовано в інших середовищах?",
          "Why must engineers create a NEW migration file instead of editing an already-applied historical migration?",
          [
            "Бази, що вже застосували старий файл, не запустять його знову, і стан схем роз'їдеться між середовищами",
            "SQL-файли не можна редагувати текстовим редактором",
            "PostgreSQL знищує таблиці при зміні коментаря",
            "Drizzle не читає файли більше 10 рядків",
          ],
          0,
          why(
            "Журнал застосованих міграцій порівнює версії/хеші; виправлення оформлюють новим послідовним кроком.",
            "Applied migrations are recorded in migration history tables; changes must always move forward in a new migration.",
          ),
        ), optionsEn: ["Databases that applied the old file will not apply it again, so schemas can diverge","SQL files cannot be edited in a text editor","PostgreSQL destroys tables when a comment changes","Drizzle cannot read files longer than 10 lines"] },
        codeOrderAuto(
          "pg-cm4",
          "Впорядкуйте перейменування колонки без даунтайму. Старі версії застосунку зупинено до backfill; скопіюйте лише порожні нові значення, не перезаписуючи новіші.",
          "Order a zero-downtime column rename. Drain old application versions before backfill; copy only missing new values without overwriting newer writes.",
          "sql",
          [
            "Add nullable new column",
            "Deploy dual writes while reading old column; drain all old writers",
            "Backfill missing new values in batches without overwriting concurrent writes; verify consistency",
            "Switch reads to new column and enforce NOT NULL if needed",
            "Stop writing old column; drop it after all old versions have drained",
          ],
        ),
      ], { baseXp: 24 },
    ),
    exam("pg-cm-exam", "Контрольна: constraints і міграції", "Checkpoint: Constraints & Migrations", 3, [
      { ...mcq(
        "pg-cm-e1",
        "Чим корисні `CHECK` constraints на додачу до Zod-валідації в Node API?",
        "Why add PostgreSQL `CHECK` constraints even when Node/Zod already validates input?",
        [
          "Захищають цілісність даних від ручних SQL-скриптів, майбутніх сервісів, міграцій і логічних багів у коді",
          "Вони замінюють автентифікацію користувача",
          "Zod перетворюється на SQL автоматично без БД",
          "PostgreSQL забороняє мати і Zod, і CHECK",
        ],
        0,
      ), optionsEn: ["They protect data integrity against manual SQL, future services, migrations, and application bugs","They replace user authentication","Zod automatically becomes SQL without a database","PostgreSQL forbids using Zod and CHECK together"] },
      { ...mcq(
        "pg-cm-e2",
        "Який підхід до змін схеми найбезпечніший у командній роботі?",
        "What is the safest way to apply schema changes in team workflows?",
        [
          "Версійні SQL-міграції, які виконує runner (`drizzle-kit migrate` / psql) у транзакції або з контролем версій",
          "Ручне редагування таблиць у GUI pgAdmin лише на проді",
          "Видалення й перестворення всіх даних на кожному релізі",
          "Відключення foreign keys",
        ],
        0,
      ), optionsEn: ["Use versioned SQL migrations run by a migration runner, with transactions where supported","Manually edit tables only in production using pgAdmin","Delete and recreate all data on every release","Disable foreign keys"] },
    ]),
  ],
);

const parameterizedCrud = unit(
  "pg_parameterized_crud",
  "Параметризований CRUD та SQL-ін'єкції",
  "Parameterized CRUD & Returning Clauses",
  [
    lesson(
      "pg-crud-params",
      "Параметри `$1, $2` і `RETURNING *` у PostgreSQL",
      "Bind Parameters ($1) & RETURNING",
      3, true, [
        { ...codeRead(
          "pg-crud1",
          "Виявіть критичну SQL-ін'єкцію та перепишіть параметризовано: Чому параметри `$1, $2` захищають значення у цьому запиті від SQL-ін'єкції?",
          "Spot SQL injection vs parameterized PostgreSQL query: Why do `$1, $2` bind parameters protect the values in this query from SQL injection?",
          "ts",
          "// Vulnerable:\nawait pool.query(`SELECT * FROM tasks WHERE title ILIKE '%${q}%'`);\n// Safe PostgreSQL:\nawait pool.query(\"SELECT id, title FROM tasks WHERE project_id = $1 AND title ILIKE $2\", [projectId, `%${q}%`]);",
          [
            "Протокол PostgreSQL передає текст запиту та значення параметрів окремо: значення ніколи не інтерпретуються як SQL-синтаксис",
            "Драйвер просто видаляє всі голосні літери",
            "PostgreSQL ігнорує рядки з лапками",
            "ILIKE працює лише з числами",
          ],
          0,
          why(
            "Значення параметрів не стають SQL-синтаксисом. Для динамічних назв колонок або напрямків сортування потрібен окремий allowlist; `%` і `_` у ILIKE залишаються шаблонними символами.",
            "PostgreSQL treats bound values as data, not SQL syntax. Dynamic identifiers and sort directions still need an allowlist; `%` and `_` remain ILIKE wildcards.",
          ),
        ), optionsEn: ["The query text and parameter values are sent separately, so values are not interpreted as SQL syntax","The driver simply removes all vowels","PostgreSQL ignores strings containing quotes","ILIKE only works with numbers"] },
        codeFill(
          "pg-crud2",
          "Отримати створений рядок одним запитом при INSERT у PostgreSQL",
          "Return newly inserted row in single round-trip",
          "sql",
          "INSERT INTO tasks (project_id, title) VALUES ($1, $2) ___ id, title, status;",
          ["RETURNING"],
          false,
          why(
            "`RETURNING` уникає зайвого другого `SELECT` та потенційної гонки після `INSERT`/`UPDATE`.",
            "`RETURNING` gives back generated columns cleanly in one atomic round-trip.",
          ),
        ),
      ], { baseXp: 24 },
    ),
    lesson(
      "pg-crud-upsert",
      "UPSERT (`ON CONFLICT`) для ідемпотентних записів",
      "Idempotent Upserts with ON CONFLICT",
      3, false, [
        { ...codeRead(
          "pg-crud3",
          "Використання ON CONFLICT замість крихкого SELECT-потім-INSERT: Чому `ON CONFLICT DO UPDATE` безпечніший за окремий `SELECT` перед `INSERT`?",
          "Worked example: race-free ON CONFLICT DO UPDATE: Why is `ON CONFLICT DO UPDATE` safer than checking with SELECT before INSERT?",
          "sql",
          "INSERT INTO project_members (project_id, user_id, role)\nVALUES ($1, $2, $3)\nON CONFLICT (project_id, user_id)\nDO UPDATE SET role = EXCLUDED.role;",
          [
            "Два паралельні запити при SELECT+INSERT можуть обидва побачити 0 рядків і другий впаде з duplicate key; `ON CONFLICT` атомарний",
            "SELECT заборонений усередині Express",
            "ON CONFLICT вимикає транзакції",
            "EXCLUDED завжди має значення NULL",
          ],
          0,
        ), optionsEn: ["Concurrent SELECT then INSERT calls can both see no row, while ON CONFLICT resolves the conflict atomically","SELECT is forbidden inside Express","ON CONFLICT disables transactions","EXCLUDED is always NULL"] },
      ], { baseXp: 25 },
    ),
    exam("pg-crud-exam", "Контрольна: параметризований CRUD", "Checkpoint: Parameterized CRUD", 3, [
      { ...mcq(
        "pg-crud-e1",
        "Для динамічного сортування `?sortBy=...` користувачем чому `$1` у `ORDER BY $1` не сортує за колонкою?",
        "When sorting by user query `?sortBy=...`, why doesn't `ORDER BY $1` sort by that column name?",
        [
          "Параметр `$1` передається як рядкова константа, а не ідентифікатор колонки; ідентифікатор слід обирати через суворий allowlist у TypeScript",
          "PostgreSQL не підтримує ORDER BY з кількома рядками",
          "Треба просто вставляти змінну в шаблонний рядок `${sortBy}`",
          "Потрібно замінити SELECT на INSERT",
        ],
        0,
      ), optionsEn: ["The parameter is a value, not a column identifier; choose identifiers using a strict TypeScript allowlist","PostgreSQL does not support ORDER BY with multiple rows","Interpolate `${sortBy}` directly into the query","Replace SELECT with INSERT"] },
      codeFill(
        "pg-crud-e2",
        "Обробка конфлікту унікальності при вставці",
        "Upsert conflict clause in PostgreSQL",
        "sql",
        "INSERT INTO tags(name) VALUES($1) ON ___ (name) DO NOTHING;",
        ["CONFLICT"],
        false,
      ),
    ]),
  ],
);

const joinsPagination = unit(
  "pg_joins_pagination",
  "JOINs, агрегації та пагінація без дірок",
  "Joins, Aggregations & Pagination",
  [
    lesson(
      "pg-jp-joins",
      "LEFT JOIN, N+1 проблема та підрахунок без спотворень",
      "Eliminating N+1 & Safe Aggregate Joins",
      3, false, [
        { ...codeOutputMcq(
          "pg-jp1",
          "Передбачте результат при проєкту без задач із INNER проти LEFT JOIN",
          "Predict row inclusion for a project with zero tasks",
          "sql",
          "SELECT p.id, count(t.id) AS task_count\nFROM projects p\nLEFT JOIN tasks t ON t.project_id = p.id\nGROUP BY p.id;",
          [
            "Проєкт без задач присутній у результаті з `task_count = 0`; `INNER JOIN` приховав би його повністю",
            "`count(t.id)` поверне 1 через NULL рядок",
            "Запит впаде з division by zero",
            "LEFT JOIN прибирає всі проєкти",
          ],
          0,
          why(
            "`count(t.id)` не рахує NULL, на відміну від `count(*)`, який рахує рядок LEFT JOIN навіть без відповідної задачі.",
            "`LEFT JOIN` keeps empty projects while `count(t.id)` ignores NULL right rows cleanly.",
          ),
        ), optionsEn: ["The project appears with task_count = 0; INNER JOIN would exclude it","count(t.id) returns 1 because of the NULL row","The query fails with division by zero","LEFT JOIN removes all projects"] },
        { ...mcq(
          "pg-jp2",
          "У циклі для 50 проєктів API робить `await db.query('SELECT * FROM tasks WHERE project_id = $1', [p.id])`. Як це називається і як лікується?",
          "An API loops over 50 projects executing 50 separate task queries. What is this issue and its fix?",
          [
            "N+1 запитів; лікується одним JOIN, CTE або `WHERE project_id = ANY($1)` + мапінг у коді",
            "Дедлок бази даних; лікується збільшенням RAM до 512GB",
            "Втрата індексу; лікується видаленням PRIMARY KEY",
            "SQL injection; лікується CORS",
          ],
          0,
        ), optionsEn: ["N+1 queries; use a JOIN, CTE, or WHERE project_id = ANY($1) and map the results","A deadlock; increase RAM to 512 GB","A missing index; delete the primary key","SQL injection; fix it with CORS"] },
      ], { baseXp: 25 },
    ),
    lesson(
      "pg-jp-pagination",
      "Keyset (cursor) проти Offset пагінації",
      "Keyset (Cursor) vs Offset Pagination",
      4, false, [
        { ...mcq(
          "pg-jp3",
          "На 2-й сторінці стрічки задач хтось додав нову задачу зверху, і запити `LIMIT 20 OFFSET 20` показали дублікат останнього елемента 1-ї сторінки. Чому Keyset (cursor) вирішує це?",
          "While browsing `OFFSET 20`, a new item arrives at row 1 causing a duplicate item on page 2. Why does keyset pagination prevent this?",
          [
            "Keyset запитує `WHERE (created_at, id) < ($1, $2) ORDER BY created_at DESC, id DESC LIMIT 20` — позиція прив'язана до стабільного кортежу, а не до зсувного номера рядка",
            "Keyset автоматично кешує всю БД у localStorage",
            "OFFSET заборонений у PostgreSQL 16",
            "Keyset просто повертає випадкові рядки",
          ],
          0,
          why(
            "За незмінних і не-NULL ключів кортеж `(created_at, id)` задає однозначну позицію. Відповідний індекс допомагає на глибоких сторінках; без спільного snapshot це не гарантує незмінності результатів при всіх оновленнях.",
            "With immutable, non-NULL keys, `(created_at, id)` defines a deterministic position. A matching index helps on deep pages; without a shared snapshot, concurrent changes can still affect results.",
          ),
        ), optionsEn: ["Keyset uses WHERE (created_at, id) < ($1, $2) ORDER BY created_at DESC, id DESC LIMIT 20, anchoring the page to a stable tuple","Keyset automatically caches the whole database in localStorage","OFFSET is forbidden in PostgreSQL 16","Keyset simply returns random rows"] },
        codeFill(
          "pg-jp4",
          "Детермінований порядок для стабільної пагінації (tie-breaker)",
          "Add deterministic tie-breaker column to ORDER BY",
          "sql",
          "ORDER BY created_at DESC, ___ DESC LIMIT $1",
          ["id"],
          false,
        ),
      ], { baseXp: 26 },
    ),
    exam("pg-jp-exam", "Контрольна: JOINs і пагінація", "Checkpoint: Joins & Pagination", 4, [
      { ...mcq(
        "pg-jp-e1",
        "Чому `count(t.id)` замість `count(*)` важливе у `LEFT JOIN tasks t ... GROUP BY p.id`?",
        "Why use `count(t.id)` instead of `count(*)` in `LEFT JOIN tasks t ... GROUP BY p.id`?",
        [
          "`count(t.id)` ігнорує NULL від порожнього LEFT JOIN і дає 0; `count(*)` рахує сам рядок і поверне 1",
          "`count(*)` завжди кидає синтаксичну помилку в LEFT JOIN",
          "Різниці немає",
          "`count(t.id)` рахує тільки парні id",
        ],
        0,
      ), optionsEn: ["count(t.id) ignores the NULL from an empty LEFT JOIN and yields 0; count(*) counts the joined row and yields 1","count(*) always causes a syntax error in LEFT JOIN","There is no difference","count(t.id) counts only even IDs"] },
      { ...mcq(
        "pg-jp-e2",
        "Чому при великій таблиці запит `OFFSET 100000 LIMIT 20` стає повільним?",
        "Why does deep `OFFSET 100000 LIMIT 20` degrade on large tables?",
        [
          "БД усе одно змушена просканувати та відкинути перші 100 000 рядків перед видачею 20",
          "PostgreSQL перезапускає worker на кожен OFFSET",
          "LIMIT не сумісний з WHERE",
          "Індекси вимикаються при LIMIT < 50",
        ],
        0,
      ), optionsEn: ["The database still has to scan and discard the first 100,000 rows before returning 20","PostgreSQL restarts a worker for every OFFSET","LIMIT cannot be used with WHERE","Indexes are disabled when LIMIT < 50"] },
    ]),
  ],
);

const transactionsConcurrency = unit(
  "pg_transactions_concurrency",
  "Транзакції ACID, блокування та конкурентність",
  "Transactions, Isolation & Concurrency",
  [
    lesson(
      "pg-tc-acid",
      "BEGIN / COMMIT / ROLLBACK та атомарність бізнес-кроків",
      "Atomic Multi-Step Transactions",
      4, false, [
        codeOrderAuto(
          "pg-tc1",
          "Впорядкуйте безпечний цикл транзакції на виділеному клієнті пулу `pg`",
          "Order safe BEGIN/COMMIT/ROLLBACK pool client handling",
          "ts",
          [
            "const client = await pool.connect();",
            "try { await client.query(\"BEGIN\"); /* update rows */ await client.query(\"COMMIT\"); }",
            "catch (err) { await client.query(\"ROLLBACK\"); throw err; }",
            "finally { client.release(); }",
          ],
          why(
            "Клієнт пулу може використовуватись іншим запитом далі, тому завжди відкочуйте при помилці й обов'язково викликайте `client.release()` у `finally`.",
            "Always bind transaction statements to one checked-out client, rollback on error, and release in `finally`.",
          ),
        ),
        { ...mcq(
          "pg-tc2",
          "Поширена помилка: замість `client.query` викликають `pool.query(\"BEGIN\")`, потім `pool.query(\"INSERT...\")`. Що піде не так під навантаженням?",
          "Common bug: calling `pool.query(\"BEGIN\")` then `pool.query(\"INSERT...\")` instead of one checked-out client. What breaks?",
          [
            "`pool.query` може видати два різні TCP-з'єднання пулу — INSERT піде в автокоміті поза транзакцією і не відкотиться!",
            "Помилка лише в тому, що `pool` працює швидше",
            "PostgreSQL заблокує всі таблиці назавжди",
            "`ROLLBACK` видалить усю базу",
          ],
          0,
          why(
            "Транзакції в PostgreSQL прив'язані до сесії конкретного з'єднання, а не до пулу загалом.",
            "Transactions belong to a single connection session; `pool.query` routes calls across arbitrary connections.",
          ),
        ), optionsEn: ["pool.query can use different connections, so INSERT may auto-commit outside the transaction and not roll back","The only problem is that pool is faster","PostgreSQL locks every table forever","ROLLBACK deletes the whole database"] },
      ], { baseXp: 26 },
    ),
    lesson(
      "pg-tc-locking",
      "Lost Update, `SELECT ... FOR UPDATE` та Deadlocks",
      "Preventing Lost Updates with FOR UPDATE",
      4, false, [
        { ...codeRead(
          "pg-tc3",
          "Два воркери одночасно забирають одну й ту саму чергову задачу: Як `FOR UPDATE SKIP LOCKED` запобігає подвійній обробці без простою воркерів?",
          "Prevent double-claim race condition with row locking: How does `FOR UPDATE SKIP LOCKED` prevent duplicate claims without blocking sibling workers?",
          "sql",
          "BEGIN;\nSELECT id, status FROM jobs WHERE status = 'queued' ORDER BY id LIMIT 1 FOR UPDATE SKIP LOCKED;\n-- mark job claimed and COMMIT;",
          [
            "Воркери пропускають заблоковані рядки; позначення задачі як зайнятої до COMMIT не дає одночасно захопити її іншому воркеру",
            "SKIP LOCKED видаляє таблицю після запиту",
            "FOR UPDATE відключає WAL-журнал",
            "Транзакції об'єднуються в одну глобальну",
          ],
          0,
          why(
            "Блокування діє до завершення транзакції: оновіть статус до COMMIT. Це запобігає одночасному захопленню, але не гарантує одноразового виконання після збоїв; потрібні повтори та ідемпотентність.",
            "Update the claim status before COMMIT while holding the row lock. This prevents simultaneous claims, but crashes can still cause retries, so processing should be idempotent.",
          ),
        ), optionsEn: ["Workers skip locked rows; marking the job claimed before COMMIT prevents another worker from claiming it simultaneously","SKIP LOCKED deletes the table after the query","FOR UPDATE disables WAL","Transactions merge into one global transaction"] },
      ], { baseXp: 28 },
    ),
    exam("pg-tc-exam", "Контрольна: транзакції та конкурентність", "Checkpoint: Transactions & Locking", 4, [
      { ...mcq(
        "pg-tc-e1",
        "Дві транзакції блокують ресурси A->B та B->A у протилежному порядку (deadlock). Як уникнути deadlock на рівні дизайну?",
        "How do you structurally avoid deadlocks when locking multiple rows across transactions?",
        [
          "Завжди блокувати ресурси у фіксованому канонічному порядку (напр., за зростанням `id`)",
          "Забрати всі транзакції повністю",
          "Використовувати `sleep(5)` перед UPDATE",
          "Збільшити таймаут браузера",
        ],
        0,
      ), optionsEn: ["Lock resources in a consistent canonical order, such as ascending id","Remove transactions completely","Use sleep(5) before UPDATE","Increase the browser timeout"] },
      codeFill(
        "pg-tc-e2",
        "Заблокувати прочитані рядки до завершення транзакції",
        "Acquire row-level exclusive lock on selected rows",
        "sql",
        "SELECT balance FROM accounts WHERE id = $1 FOR ___;",
        ["UPDATE"],
        false,
      ),
    ]),
  ],
);

const indexesPlansCapstone = unit(
  "pg_indexes_plans_capstone",
  "Індекси, EXPLAIN ANALYZE та база ForgeBoard",
  "Indexes, Query Plans & ForgeBoard DB",
  [
    lesson(
      "pg-ip-indexes",
      "Складені B-Tree індекси та читання `EXPLAIN (ANALYZE, BUFFERS)`",
      "Composite B-Tree Indexes & EXPLAIN ANALYZE",
      4, false, [
        { ...codeRead(
          "pg-ip1",
          "Читання плану запиту PostgreSQL: що показує `Rows Removed by Filter: 499958` і який індекс варто перевірити?",
          "Read EXPLAIN ANALYZE: what does `Rows Removed by Filter: 499958` reveal and which index is worth testing?",
          "sql",
          "Seq Scan on tasks  (cost=0.00..18420.00 rows=42 width=64) (actual time=0.05..94.30 rows=42 loops=1)\n  Filter: ((project_id = 7) AND (status = 'todo'))\n  Rows Removed by Filter: 499958",
          [
            "Seq Scan перевірив близько 500 тис. рядків; складений індекс `ON tasks (project_id, status)` може допомогти, але план і час слід перевірити",
            "Індекси вже працюють оптимально",
            "Потрібен лише `VACUUM FULL` щохвилини",
            "Додавання колонки `notes` прискорить Seq Scan",
          ],
          0,
          why(
            "Велика кількість відфільтрованих рядків підказує перевірити складений або частковий індекс. Планувальник обирає план за оціненою вартістю; порівняйте EXPLAIN ANALYZE і витрати на запис.",
            "Many filtered rows suggest testing a composite or partial index. The planner chooses by estimated cost; compare EXPLAIN ANALYZE and account for write overhead.",
          ),
        ), optionsEn: ["The sequential scan examined about 500,000 rows; an index on (project_id, status) may help, but verify the plan and timing","Indexes are already optimal","Run VACUUM FULL every minute","Adding a notes column will speed up the sequential scan"] },
        { ...mcq(
          "pg-ip2",
          "У запиті `WHERE project_id = $1 ORDER BY created_at DESC LIMIT 20` який порядок колонок у B-Tree індексі дає найбільший виграш?",
          "For `WHERE project_id = $1 ORDER BY created_at DESC LIMIT 20`, which composite index column order matches best?",
          [
            "`(project_id, created_at DESC)` — спочатку рівність `=`, потім діапазон/сортування `ORDER BY`",
            "`(created_at, title, body)` без project_id",
            "Окремі 4 індекси по одній булевій колонці",
            "Індекс лише по `id` завжди достатній",
          ],
          0,
        ), optionsEn: ["(project_id, created_at DESC): equality first, followed by the sort key","(created_at, title, body), without project_id","Four separate indexes on individual boolean columns","An index on id alone is always enough"] },
      ], { baseXp: 26 },
    ),
    lesson(
      "pg-forgeboard-db-lab",
      "Лаб: БД та міграції ForgeBoard у PostgreSQL (M6)",
      "Lab: ForgeBoard Migrations & Postgres Layer (M6)",
      4, false, [
        { ...mcq(
          "pg-fb1",
          "У Milestone 6 ви підключаєте ForgeBoard Express API до PostgreSQL. Чому ігнорувати помилки транзакції або писати не-параметризований SQL не можна?",
          "In Milestone 6, ForgeBoard connects Express to PostgreSQL. Why must queries stay parameterized inside explicit migrations and ownership filters?",
          [
            "Параметри захищають від SQLi, міграції фіксують схему та constraints, а транзакції й `WHERE owner_id = $userId` захищають бізнес-інваріанти",
            "Тому що Postgres не приймає рядки JSON",
            "Щоб обійти тести авторизації",
            "Бо SQL працює лише у браузері",
          ],
          0,
        ), optionsEn: ["Parameters protect values from SQL injection, migrations define the schema and constraints, and transactions plus owner filters protect invariants","PostgreSQL does not accept JSON strings","To bypass authorization tests","SQL only works in the browser"] },
        codeProject(
          "pg-fb2",
          "Припустіть, що projects(id) вже існує. Створіть таблицю tasks з identity, зовнішнім ключем, CHECK, часовою міткою та індексом. Вбудована перевірка шукає фрагменти SQL; M6 нижче запускає реальні міграції й тести Postgres.",
          "Assume projects(id) already exists. Create tasks with an identity, foreign key, CHECK, timestamp, and index. The in-app check searches SQL fragments; M6 below runs actual migrations and Postgres tests.",
          [
            {
              id: "sql",
              name: "001_init.sql",
              language: "sql",
              starter: `-- Assume projects(id) already exists. Create tasks and its index.\n`,
            },
          ],
          [
            { fileId: "sql", contains: ["GENERATED ALWAYS AS IDENTITY", "REFERENCES", "CHECK", "TIMESTAMPTZ", "CREATE INDEX"] },
          ],
          {
            hintUk: "У локальному пакеті M6 є реальний мігратор та тести конкурентності й ін'єкцій проти Postgres.",
            hintEn: "The M6 local package includes real migrations, transaction tests, and SQL injection resistance checks.",
          },
        ),
      ], { baseXp: 45 },
    ),
    exam("pg-ip-exam", "Контрольна: індекси та продуктивність PG", "Checkpoint: Postgres Indexes & Plans", 4, [
      { ...mcq(
        "pg-ip-e1",
        "Яка функція `WHERE lower(email) = $1` заважає використати звичайний індекс `ON users(email)`, і що треба створити?",
        "Why does `WHERE lower(email) = $1` bypass a plain `ON users(email)` index, and what fixes it?",
        [
          "Вираз над колонкою блокує звичайний B-Tree індекс; створіть expression index `ON users (lower(email))`",
          "Додати `ORDER BY random()`",
          "Перейменувати колонку на `Email2`",
          "Використати `LIKE '%%'` без індексу",
        ],
        0,
      ), optionsEn: ["An expression on the column cannot use a plain B-tree as an index condition; create an expression index on lower(email)","Add ORDER BY random()","Rename the column Email2","Use LIKE '%%' without an index"] },
      codeFill(
        "pg-ip-e2",
        "Переглянути реальний час виконання й читання буферів у плані запиту",
        "Inspect real execution timing and buffer reads",
        "sql",
        "EXPLAIN (___, BUFFERS) SELECT * FROM tasks WHERE project_id = 1;",
        ["ANALYZE"],
        false,
      ),
    ]),
  ],
);

export const postgresqlAppsContent: CourseContent = {
  slug: "postgresql_apps",
  titleUk: "PostgreSQL для вебдодатків",
  titleEn: "PostgreSQL for Web Applications",
  descriptionUk:
    "Моделювання схеми, constraints і міграції, параметризований CRUD, JOINs та keyset-пагінація, ACID-транзакції, EXPLAIN ANALYZE та підключення ForgeBoard.",
  descriptionEn:
    "Relational modeling, constraints and migrations, parameterized CRUD, joins and keyset pagination, ACID transactions, query plans, and ForgeBoard DB.",
  icon: "🐘",
  color: "#336791",
  units: [
    relationalModeling,
    constraintsMigrations,
    parameterizedCrud,
    joinsPagination,
    transactionsConcurrency,
    indexesPlansCapstone,
  ],
};
