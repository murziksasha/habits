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
        mcq(
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
        ),
        codeRead(
          "pg-rm2",
          "Аналіз базової схеми PostgreSQL (відповідно до офіційної документації PostgreSQL): Чому в PostgreSQL для дат і тексту рекомендують `TIMESTAMPTZ` та `TEXT`, а не `VARCHAR2` / `NUMBER`?",
          "Worked example: standard PostgreSQL types over Oracle habits: Why does idiomatic PostgreSQL use `TIMESTAMPTZ` and `TEXT` rather than `VARCHAR2` / `NUMBER`?",
          "sql",
          "CREATE TABLE projects (\n  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  owner_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n  name TEXT NOT NULL,\n  created_at TIMESTAMPTZ NOT NULL DEFAULT now()\n);",
          [
            "`VARCHAR2` це синтаксис Oracle; у PostgreSQL `TEXT`/`VARCHAR(n)` мають однакове сховище, а `TIMESTAMPTZ` зберігає мить у UTC без втрати таймзони",
            "TEXT в Postgres повільніший, тому його заборонено індексувати",
            "TIMESTAMPTZ не підтримує порівняння `>`",
            "IDENTITY в Postgres не створює унікальні ключі",
          ],
          0,
          why(
            "PostgreSQL документація радить `timestamptz` для всіх часових точок і `text` (+ CHECK на довжину за потреби) замість довільних лімітів.",
            "PostgreSQL docs recommend `timestamptz` for absolute instants and `text` (+ explicit length CHECK if needed) with identical storage performance.",
          ),
        ),
      ], { baseXp: 22 },
    ),
    lesson(
      "pg-rm-normalization",
      "Уникнення надлишкових копій та оновлення при видаленні",
      "Avoiding Anomalies & Foreign Key Actions",
      2, true, [
        matchEx(
          "pg-rm3",
          "Оберіть доречну поведінку зовнішнього ключа `ON DELETE`",
          "Match each domain requirement to the right `ON DELETE` rule",
          [
            { left: "Видалення задачі видаляє її підзадачі/мітки", right: "ON DELETE CASCADE" },
            { left: "Не можна видалити користувача, доки за ним є виставлені інвойси", right: "ON DELETE RESTRICT" },
            { left: "При видаленні виконавця задача лишається, але assignee_id стає NULL", right: "ON DELETE SET NULL" },
          ],
        ),
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
        codeRead(
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
        ),
        codeFill(
          "pg-cm2",
          "Заборонити від'ємний пріоритет задачі на рівні БД",
          "Enforce non-negative priority via CHECK constraint",
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
        mcq(
          "pg-cm3",
          "Таблиця `tasks` містить 5 млн рядків. У міграцію додали `ALTER TABLE tasks ADD COLUMN notes TEXT NOT NULL;` без DEFAULT — або редагували стару вже застосовану міграцію. Чому редагування застосованої міграції зле?",
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
        ),
        codeOrderAuto(
          "pg-cm4",
          "Впорядкуйте безпечне перейменування колонки без даунтайму (expand-and-contract)",
          "Order zero-downtime column rename steps (expand & contract)",
          "sql",
          [
            "Add nullable new column + backfill existing rows in batches",
            "Deploy app reading new column (fallback to old) and writing both",
            "Enforce NOT NULL if required after verifying zero nulls remain",
            "Deploy app reading/writing only new column, then drop old column",
          ],
        ),
      ], { baseXp: 24 },
    ),
    exam("pg-cm-exam", "Контрольна: constraints і міграції", "Checkpoint: Constraints & Migrations", 3, [
      mcq(
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
      ),
      mcq(
        "pg-cm-e2",
        "У міграціях Drizzle / SQL чому не можна використовувати ручні `CREATE DATABASE` усередині табличних міграцій CI?",
        "What is the safest way to apply schema changes in team workflows?",
        [
          "Версійні SQL-міграції, які виконує runner (`drizzle-kit migrate` / psql) у транзакції або з контролем версій",
          "Ручне редагування таблиць у GUI pgAdmin лише на проді",
          "Видалення й перестворення всіх даних на кожному релізі",
          "Відключення foreign keys",
        ],
        0,
      ),
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
        codeRead(
          "pg-crud1",
          "Виявіть критичну SQL-ін'єкцію та перепишіть параметризовано: Чому параметри `$1, $2` повністю блокують SQL-ін'єкцію?",
          "Spot SQL injection vs parameterized PostgreSQL query: Why do `$1, $2` bind parameters completely neutralize SQL injection?",
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
            "Розділення дерева розбору SQL і даних параметрів у wire-протоколі Postgres робить підміну синтаксису неможливою.",
            "PostgreSQL parses the query template separately from bound values, so user input stays strictly data.",
          ),
        ),
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
        codeRead(
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
        ),
      ], { baseXp: 25 },
    ),
    exam("pg-crud-exam", "Контрольна: параметризований CRUD", "Checkpoint: Parameterized CRUD", 3, [
      mcq(
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
      ),
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
        codeOutputMcq(
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
            "`count(t.id)` не рахує NULL, на відміну від `count(*)`, який би дав помилкову 1 для порожнього RIGHT-з'єднання.",
            "`LEFT JOIN` keeps empty projects while `count(t.id)` ignores NULL right rows cleanly.",
          ),
        ),
        mcq(
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
        ),
      ], { baseXp: 25 },
    ),
    lesson(
      "pg-jp-pagination",
      "Keyset (cursor) проти Offset пагінації",
      "Keyset (Cursor) vs Offset Pagination",
      4, false, [
        mcq(
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
            "Кортежне порівняння `(created_at, id) < ($1, $2)` також стабільно швидке на глибоких сторінках на відміну від великих OFFSET.",
            "Tuple comparison `(created_at, id) < ($1, $2)` stays O(log N + limit) and avoids offset drift.",
          ),
        ),
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
      mcq(
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
      ),
      mcq(
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
      ),
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
        mcq(
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
        ),
      ], { baseXp: 26 },
    ),
    lesson(
      "pg-tc-locking",
      "Lost Update, `SELECT ... FOR UPDATE` та Deadlocks",
      "Preventing Lost Updates with FOR UPDATE",
      4, false, [
        codeRead(
          "pg-tc3",
          "Два воркери одночасно забирають одну й ту саму чергову задачу: Як `FOR UPDATE SKIP LOCKED` запобігає подвійній обробці без простою воркерів?",
          "Prevent double-claim race condition with row locking: How does `FOR UPDATE SKIP LOCKED` prevent duplicate claims without blocking sibling workers?",
          "sql",
          "BEGIN;\nSELECT id, status FROM jobs WHERE status = 'queued' ORDER BY id LIMIT 1 FOR UPDATE SKIP LOCKED;\n-- mark job claimed and COMMIT;",
          [
            "Заблоковані іншим транзакціям рядки пропускаються миттєво, тому кожен воркер гарантовано бере вільний рядок без гонки",
            "SKIP LOCKED видаляє таблицю після запиту",
            "FOR UPDATE відключає WAL-журнал",
            "Транзакції об'єднуються в одну глобальну",
          ],
          0,
          why(
            "`SELECT ... FOR UPDATE [SKIP LOCKED]` виключає гонку read-modify-write у PostgreSQL черзі та бізнес-балансах.",
            "`FOR UPDATE SKIP LOCKED` lets concurrent workers claim distinct rows atomically under contention.",
          ),
        ),
      ], { baseXp: 28 },
    ),
    exam("pg-tc-exam", "Контрольна: транзакції та конкурентність", "Checkpoint: Transactions & Locking", 4, [
      mcq(
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
      ),
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
        codeRead(
          "pg-ip1",
          "Читання плану запиту PostgreSQL: Що показує рядок `Rows Removed by Filter: 499958` і який індекс виправить це?",
          "Read EXPLAIN ANALYZE plan output: What does `Rows Removed by Filter: 499958` reveal and which index fixes it?",
          "sql",
          "Seq Scan on tasks  (cost=0.00..18420.00 rows=42 width=64) (actual time=0.05..94.30 rows=42 loops=1)\n  Filter: ((project_id = 7) AND (status = 'todo'))\n  Rows Removed by Filter: 499958",
          [
            "База читала всю таблицю (~500k рядків) послідовно; складений індекс `ON tasks (project_id, status)` дасть миттєвий Index Scan",
            "Індекси вже працюють оптимально",
            "Потрібен лише `VACUUM FULL` щохвилини",
            "Додавання колонки `notes` прискорить Seq Scan",
          ],
          0,
          why(
            "Коли `Rows Removed by Filter` на порядки більший за повернуті `rows`, селективному WHERE бракує складеного або часткового індексу.",
            "Huge `Rows Removed by Filter` compared to returned rows screams for a selective composite index matching the equality predicates.",
          ),
        ),
        mcq(
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
        ),
      ], { baseXp: 26 },
    ),
    lesson(
      "pg-forgeboard-db-lab",
      "Лаб: БД та міграції ForgeBoard у PostgreSQL (M6)",
      "Lab: ForgeBoard Migrations & Postgres Layer (M6)",
      4, false, [
        mcq(
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
        ),
        codeProject(
          "pg-fb2",
          "Створіть SQL-фрагмент міграції ForgeBoard (users, projects, tasks + CHECK); завантажте лаб M6 нижче для запуску реальних міграцій і Postgres-тестів.",
          "Write the core ForgeBoard schema migration snippet; download the Milestone 6 lab below to run migrations and Postgres behavior tests.",
          [
            {
              id: "sql",
              name: "001_init.sql",
              language: "sql",
              starter: `CREATE TABLE tasks (\n  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  project_id BIGINT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,\n  title TEXT NOT NULL CHECK (char_length(trim(title)) BETWEEN 1 AND 120),\n  status TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'done')),\n  created_at TIMESTAMPTZ NOT NULL DEFAULT now()\n);\nCREATE INDEX tasks_project_created_idx ON tasks (project_id, created_at DESC);\n`,
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
      mcq(
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
      ),
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
