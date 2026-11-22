import type { CourseContent, Exercise, UnitContent } from "./types.js";
import {
  codeFill,
  codeOrder,
  codeOrderAuto,
  codeOutputMcq,
  codeRead,
  concept,
  exam,
  lesson,
  matchEx,
  mcq,
  unit,
  why,
} from "./builders.js";
import {
  accessUnit,
  aggDepthLessons,
  capstoneOracleExercises,
  conversionUnit,
  ddlDepthLessons,
  dmlDepthLessons,
  joinDepthLessons,
  restrictDepthLessons,
  schemaUnit,
  selectDepthLessons,
  selectIntroLessons,
  setOpsUnit,
  singleRowUnit,
  subqueriesUnit,
} from "./sql-oracle-track.js";
import { sqlCtePerformanceUnit } from "./deep-units.js";
import { rebalanceExamLessons } from "./sql-exam-balance.js";
import { modernSqlUnits } from "./sql-expansion.js";
import { modernSqlUnitsB } from "./sql-expansion-b.js";
import { modernSqlUnitsC } from "./sql-expansion-c.js";
import { plsqlUnitsA } from "./sql-plsql-units.js";
import { plsqlUnitsB } from "./sql-plsql-units-b.js";
import { plsqlUnitsC } from "./sql-plsql-units-c.js";
import { dbaUnitsA } from "./sql-dba-units.js";
import { dbaUnitsB } from "./sql-dba-units-b.js";

function withBalancedExams(units: UnitContent[]): UnitContent[] {
  return units.map((u) => ({ ...u, lessons: rebalanceExamLessons(u.lessons) }));
}

const selectU = unit("select", "SELECT і модель", "SELECT and the model", [
  ...selectIntroLessons,
  lesson(
    "sqlf-select",
    "SELECT / FROM",
    "SELECT / FROM",
    1,
    true,
    [
      concept("sqlf-select-concept", "Результат SELECT", "The result of SELECT", {
        uk: "SELECT визначає стовпці результату, а FROM — джерело рядків. Зірочка означає всі доступні стовпці джерела; перелік id, name повертає лише ці стовпці. Без ORDER BY не покладайтеся на порядок рядків.",
        en: "SELECT specifies result columns and FROM identifies the row source. An asterisk selects all available source columns; id, name selects only those columns. Without ORDER BY, do not rely on row order.",
      }),
      codeFill("sqlf-s1", "Виберіть усі стовпці таблиці", "Select all columns from the table", "sql", "SELECT ___ FROM users;", ["*"], false),
      codeFill("sqlf-s2", "from clause", "from clause", "sql", "SELECT id ___ users;", ["FROM", "from"], false),
      { ...mcq("sqlf-s3", "Що повертає SELECT?", "What does SELECT return?", ["Результат запиту з вибраними стовпцями і рядками", "Лише схему", "Історію Git", "CSS"], 0), optionsEn: ["A result set with selected columns and rows", "Only the schema", "Git history", "CSS"] },
    ],
  ),
  ...selectDepthLessons,
  lesson(
    "sqlf-where",
    "WHERE filters",
    "WHERE filters",
    1,
    true,
    [
      concept("sqlf-where-concept", "Фільтрація та NULL", "Filtering and NULL", {
        uk: "WHERE залишає рядки, для яких умова істинна; FALSE та UNKNOWN не проходять. Порівняння з NULL через = дає UNKNOWN, тому для перевірки відсутнього значення використовуйте IS NULL або IS NOT NULL. Дужки допомагають явно задати порядок AND та OR.",
        en: "WHERE retains rows whose condition is true; FALSE and UNKNOWN do not pass. Comparing with NULL using = yields UNKNOWN, so use IS NULL or IS NOT NULL to test for missing values. Parentheses make the intended AND/OR grouping explicit.",
      }),
      codeFill("sqlf-s4", "filter", "filter", "sql", "SELECT * FROM t ___ age > 18;", ["WHERE", "where"], false),
      { ...mcq("sqlf-s5", "Для чого використовують AND та OR?", "What are AND and OR used for?", ["Для логічного поєднання умов", "Для типів JOIN", "Лише для індексів", "Лише для DDL"], 0), optionsEn: ["Combining conditions logically", "JOIN types", "Only indexes", "Only DDL"] },
      { ...codeRead("sqlf-s6", "Як правильно знайти рядки з NULL?", "How do you find rows with NULL?", "sql", "WHERE x = NULL", ["Використати WHERE x IS NULL", "Вираз завжди істинний", "Порівняння через = знаходить NULL", "Вираз видаляє рядки"], 0) as Extract<Exercise, { type: "code_read" }>, optionsEn: ["Use WHERE x IS NULL", "The expression is always true", "Equality finds NULL values", "The expression deletes rows"] },
    ],
  ),
  exam("sqlf-select-exam", "Контрольна: SELECT", "Exam: SELECT", 1, [
    codeFill("sqlf-se1", "FROM", "FROM", "sql", "SELECT id ___ users;", ["FROM", "from"], false),
    codeFill("sqlf-se2", "WHERE", "WHERE", "sql", "SELECT * FROM t ___ x = 1;", ["WHERE", "where"], false),
    { ...mcq("sqlf-se3", "Що означає SELECT *?", "What does SELECT * mean?", ["Усі доступні стовпці результату FROM", "Лише кількість", "Видалення", "JOIN"], 0), optionsEn: ["All available columns from the FROM result", "Only a count", "Deletion", "A JOIN"] },
    codeFill("sqlf-se4", "IS NULL", "IS NULL", "sql", "WHERE email ___ NULL;", ["IS", "is"], false),
  ]),
]);

const orderLimit = unit("order-limit", "Фільтри і сортування", "Filters and sorting", [
  lesson(
    "sqlf-order",
    "Sorting",
    "Sorting",
    2,
    false,
    [
      concept("sqlf-order-concept", "Явне сортування", "Explicit ordering", {
        uk: "ORDER BY визначає порядок результату; ASC означає зростання, DESC — спадання. Якщо значення ключа можуть повторюватися, додайте стабільний унікальний ключ як наступний критерій, особливо для сторінок. Розташування NULL залежить від діалекту й опцій NULLS FIRST/LAST.",
        en: "ORDER BY specifies result order; ASC means ascending and DESC descending. If sort values can repeat, add a stable unique tie-breaker, especially for pagination. NULL placement depends on the dialect and NULLS FIRST/LAST options.",
      }),
      codeFill("sqlf-o1", "order by", "order by", "sql", "SELECT * FROM t ___ created_at DESC;", ["ORDER BY", "order by"], false),
      codeFill("sqlf-o2", "desc", "desc", "sql", "ORDER BY score ___;", ["DESC", "desc"], false),
      { ...mcq("sqlf-o3", "Що означає ASC?", "What does ASC mean?", ["Сортування за зростанням", "Агрегація", "Зовнішнє з’єднання", "Підказка індексу"], 0), optionsEn: ["Ascending order", "Aggregation", "An outer join", "An index hint"] },
    ],
  ),
  lesson(
    "sqlf-limit",
    "OFFSET і FETCH",
    "OFFSET and FETCH",
    2,
    false,
    [
      concept("sqlf-limit-concept", "Сторінки в Oracle", "Pagination in Oracle", {
        uk: "В Oracle 12c і новіше OFFSET пропускає рядки, а FETCH обмежує кількість повернених. Спочатку задайте детерміноване ORDER BY з унікальним додатковим ключем; інакше сторінки можуть змінюватися неоднозначно. OFFSET не змінює і не видаляє дані.",
        en: "In Oracle 12c and later, OFFSET skips rows and FETCH limits returned rows. First define a deterministic ORDER BY with a unique tie-breaker; otherwise pages can be ambiguous. OFFSET does not modify or delete data.",
      }),
      codeFill(
        "sqlf-o4",
        "Перші рядки в Oracle 12c і новіше",
        "First rows on Oracle 12c and later",
        "sql",
        "SELECT * FROM t ORDER BY id ___ FIRST 10 ROWS ONLY;",
        ["FETCH", "fetch"],
        false,
      ),
      { ...mcq(
        "sqlf-o5",
        "OFFSET … ROWS у Oracle означає:",
        "OFFSET … ROWS in Oracle means:",
        ["видалення всіх рядків", "пропуск рядків сторінки", "створення таблиці", "видачу права"],
        1,
      ), optionsEn: ["Delete all rows", "Skip rows", "Create a table", "Grant a privilege"] },
      codeOrder(
        "sqlf-o6",
        "Порядок сторінки: пропустити 40, взяти 20",
        "Page order: skip 40, take 20",
        "sql",
        ["FETCH NEXT 20 ROWS ONLY;", "SELECT * FROM posts", "ORDER BY id DESC", "OFFSET 40 ROWS"],
        ["SELECT * FROM posts", "ORDER BY id DESC", "OFFSET 40 ROWS", "FETCH NEXT 20 ROWS ONLY;"],
      ),
    ],
  ),
  ...restrictDepthLessons,
  exam("sqlf-order-exam", "Контрольна: order/limit", "Exam: order/limit", 2, [
    codeFill("sqlf-oe1", "ORDER BY", "ORDER BY", "sql", "SELECT * FROM t ___ name;", ["ORDER BY", "order by"], false),
    codeFill("sqlf-oe2", "DESC", "DESC", "sql", "ORDER BY n ___;", ["DESC", "desc"], false),
    codeFill(
      "sqlf-oe3",
      "Перші 5 рядків",
      "First 5 rows",
      "sql",
      "SELECT * FROM t ORDER BY id ___ FIRST 5 ROWS ONLY;",
      ["FETCH", "fetch"],
      false,
    ),
    { ...mcq(
      "sqlf-oe4",
      "OFFSET … ROWS:",
      "OFFSET … ROWS:",
      ["лише сортування", "пропуск рядків перед FETCH", "лише групування", "команда DDL"],
      1,
    ), optionsEn: ["Only sorting", "Skip rows before FETCH", "Only grouping", "A DDL command"] },
  ]),
]);

const joins = unit("joins", "JOINs", "JOINs", [
  lesson(
    "sqlf-inner",
    "INNER JOIN",
    "INNER JOIN",
    2,
    false,
    [
      concept("sqlf-inner-concept", "Відповідні пари", "Matching row pairs", {
        uk: "INNER JOIN повертає кожну пару рядків, що задовольняє умову ON. Якщо одному рядку зліва відповідає кілька справа, у результаті буде кілька пар; це не просто множина спільних ключів.",
        en: "INNER JOIN returns every row pair satisfying the ON condition. If one left row matches several right rows, the result contains several pairs; it is not merely a set of common keys.",
      }),
      codeFill(
        "sqlf-j1",
        "inner join",
        "inner join",
        "sql",
        "SELECT * FROM a ___ JOIN b ON a.id = b.a_id;",
        ["INNER", "inner"],
        false,
      ),
      { ...mcq(
        "sqlf-j2",
        "INNER JOIN returns:",
        "INNER JOIN returns:",
        ["matching rows from both tables", "all left always", "cartesian only", "schema only"],
        0,
      ), optionsEn: ["Matching row pairs that satisfy the join condition", "Always every left row", "Only a Cartesian product", "Only the schema"] },
      codeFill(
        "sqlf-j3",
        "ON condition",
        "ON condition",
        "sql",
        "JOIN orders o ___ u.id = o.user_id",
        ["ON", "on"],
        false,
      ),
    ],
  ),
  lesson(
    "sqlf-left",
    "LEFT JOIN",
    "LEFT JOIN",
    3,
    false,
    [
      concept("sqlf-left-concept", "Збереження лівих рядків", "Retaining left rows", {
        uk: "LEFT JOIN зберігає кожен лівий рядок. Без збігу стовпці правої таблиці мають NULL; за кількох збігів лівий рядок повториться. Фільтр правої таблиці у WHERE може відкинути рядки без збігу — порівняйте його розміщення з ON.",
        en: "LEFT JOIN retains each left row. Without a match, right-side columns are NULL; multiple matches repeat the left row. A right-side filter in WHERE can discard unmatched rows, so compare its placement with ON.",
      }),
      { ...mcq(
        "sqlf-j4",
        "LEFT JOIN keeps:",
        "LEFT JOIN keeps:",
        ["all left rows (+ nulls if no match)", "only matches", "only right", "no nulls ever"],
        0,
      ), optionsEn: ["All left rows, with NULL right-side columns when no match exists", "Only matching rows", "Only right rows", "Never NULL"] },
      codeFill(
        "sqlf-j5",
        "left join",
        "left join",
        "sql",
        "FROM users u ___ JOIN orders o ON u.id = o.user_id",
        ["LEFT", "left"],
        false,
      ),
      { ...matchEx(
        "sqlf-j6",
        "Join types",
        "Join types",
        [
          { left: "INNER", right: "Відповідні пари рядків / Matching row pairs" },
          { left: "LEFT", right: "Усі ліві рядки та збіги / All left rows plus matches" },
          { left: "CROSS", right: "Декартів добуток / Cartesian product" },
        ],
      ), pairsEn: [
        { left: "INNER", right: "Matching row pairs" },
        { left: "LEFT", right: "All left rows plus matches" },
        { left: "CROSS", right: "Cartesian product" },
      ] },
    ],
  ),
  ...joinDepthLessons,
  exam("sqlf-join-exam", "Контрольна: JOINs", "Exam: JOINs", 2, [
    codeFill("sqlf-je1", "JOIN", "JOIN", "sql", "a ___ JOIN b ON …", ["INNER", "LEFT", "inner", "left"], false),
    codeFill("sqlf-je2", "ON", "ON", "sql", "JOIN b ___ a.id = b.a_id", ["ON", "on"], false),
    { ...mcq("sqlf-je3", "Що зберігає LEFT JOIN?", "What does LEFT JOIN retain?", ["Усі рядки зліва та відповідні рядки справа", "Завжди відкидає ліві рядки", "DDL", "Лише індекс"], 0), optionsEn: ["All left rows and matching right rows", "Always drops left rows", "DDL", "Only an index"] },
    { ...mcq("sqlf-je4", "Що повертає INNER JOIN?", "What does INNER JOIN return?", ["Пари рядків, що відповідають умові", "Усі рядки зліва", "Лише всі рядки справа", "Рядки без умови"], 0), optionsEn: ["Row pairs satisfying the condition", "All left rows", "Only all right rows", "Rows without a condition"] },
  ]),
]);

const aggregates = unit("aggregates", "Aggregates", "Aggregates", [
  lesson(
    "sqlf-agg",
    "COUNT / SUM / AVG",
    "COUNT / SUM / AVG",
    2,
    false,
    [
      concept("sqlf-agg-concept", "Агрегати і відсутні значення", "Aggregates and missing values", {
        uk: "COUNT(*) рахує рядки, COUNT(column) — ненульові значення стовпця. SUM та AVG ігнорують NULL; якщо немає жодного ненульового значення, результат зазвичай NULL, тоді як COUNT повертає 0.",
        en: "COUNT(*) counts rows and COUNT(column) counts non-NULL column values. SUM and AVG ignore NULL; with no non-NULL input they generally return NULL, while COUNT returns 0.",
      }),
      codeFill("sqlf-a1", "count rows", "count rows", "sql", "SELECT ___(*) FROM t;", ["COUNT", "count"], false),
      codeFill("sqlf-a2", "sum", "sum", "sql", "SELECT ___(amount) FROM payments;", ["SUM", "sum"], false),
      { ...mcq("sqlf-a3", "Як AVG зазвичай обробляє NULL?", "How does AVG typically handle NULL?", ["Ігнорує NULL у вхідних значеннях", "Ігнорує всі числа", "Ігнорує назву таблиці", "Ігнорує псевдоніми"], 0), optionsEn: ["Ignores NULL input values", "Ignores all numbers", "Ignores the table name", "Ignores aliases"] },
    ],
  ),
  lesson(
    "sqlf-group",
    "GROUP BY / HAVING",
    "GROUP BY / HAVING",
    3,
    false,
    [
      concept("sqlf-group-concept", "Рядки та групи", "Rows and groups", {
        uk: "WHERE фільтрує вхідні рядки перед групуванням. GROUP BY формує групи, а HAVING відбирає їх за умовами, зокрема агрегатами. Неагреговані стовпці у SELECT мають відповідати правилам GROUP BY вашого діалекту.",
        en: "WHERE filters input rows before grouping. GROUP BY forms groups, and HAVING filters them using conditions including aggregates. Non-aggregated SELECT columns must follow the GROUP BY rules of your dialect.",
      }),
      codeFill(
        "sqlf-a4",
        "group by",
        "group by",
        "sql",
        "SELECT user_id, COUNT(*) FROM orders ___ user_id;",
        ["GROUP BY", "group by"],
        false,
      ),
      { ...mcq(
        "sqlf-a5",
        "HAVING filters:",
        "HAVING filters:",
        ["groups after aggregation", "rows before group only", "indexes", "schemas"],
        0,
      ), optionsEn: ["Groups after aggregation", "Only rows before grouping", "Indexes", "Schemas"] },
      codeFill(
        "sqlf-a6",
        "having",
        "having",
        "sql",
        "GROUP BY user_id ___ COUNT(*) > 5;",
        ["HAVING", "having"],
        false,
      ),
    ],
  ),
  ...aggDepthLessons,
  exam("sqlf-agg-exam", "Контрольна: aggregates", "Exam: aggregates", 2, [
    codeFill("sqlf-ae1", "COUNT", "COUNT", "sql", "SELECT ___(*) FROM t;", ["COUNT", "count"], false),
    codeFill("sqlf-ae2", "GROUP BY", "GROUP BY", "sql", "SELECT a, COUNT(*) FROM t ___ a;", ["GROUP BY", "group by"], false),
    codeFill("sqlf-ae3", "HAVING", "HAVING", "sql", "… ___ COUNT(*) > 1;", ["HAVING", "having"], false),
    { ...mcq("sqlf-ae4", "Що обчислює SUM?", "What does SUM calculate?", ["Суму числових значень", "Сортування", "З’єднання таблиць", "Створення таблиці"], 0), optionsEn: ["The sum of numeric values", "Sorting", "A table join", "Table creation"] },
  ]),
]);

const dml = unit("dml", "INSERT / UPDATE / DELETE", "INSERT / UPDATE / DELETE", [
  lesson(
    "sqlf-insert",
    "INSERT",
    "INSERT",
    2,
    false,
    [
      concept("sqlf-insert-concept", "Створення рядка", "Creating a row", {
        uk: "INSERT додає дані в таблицю. Явний список стовпців пов’язує кожне значення з призначенням і зменшує залежність від порядку схеми. Обмеження та значення за замовчуванням перевіряються базою.",
        en: "INSERT adds data to a table. An explicit column list associates each value with its target and reduces dependence on schema order. The database enforces constraints and defaults.",
      }),
      codeFill(
        "sqlf-d1",
        "insert into",
        "insert into",
        "sql",
        "___ INTO users (email) VALUES ('a@b.c');",
        ["INSERT", "insert"],
        false,
      ),
      { ...mcq("sqlf-d2", "Що задає VALUES в INSERT?", "What does VALUES provide in INSERT?", ["Значення для нового рядка", "Індекси", "Права", "JOIN"], 0), optionsEn: ["Values for a new row", "Indexes", "Privileges", "JOINs"] },
    ],
  ),
  lesson(
    "sqlf-update-delete",
    "UPDATE / DELETE",
    "UPDATE / DELETE",
    2,
    false,
    [
      concept("sqlf-update-delete-concept", "Перевірте область зміни", "Check the scope of a change", {
        uk: "UPDATE змінює значення рядків, DELETE видаляє рядки. Без WHERE операція охоплює всю таблицю, якщо немає іншого обмеження. Перед виконанням перевірте умову SELECT-запитом і використовуйте транзакцію та тестове середовище за потреби.",
        en: "UPDATE changes row values; DELETE removes rows. Without WHERE, the operation affects the entire table unless otherwise constrained. Before execution, inspect the condition with SELECT and use a transaction and test environment when appropriate.",
      }),
      codeFill(
        "sqlf-d3",
        "update set",
        "update set",
        "sql",
        "UPDATE users ___ display_name = 'Ada' WHERE id = 1;",
        ["SET", "set"],
        false,
      ),
      codeFill(
        "sqlf-d4",
        "delete where",
        "delete where",
        "sql",
        "DELETE FROM users ___ id = 1;",
        ["WHERE", "where"],
        false,
      ),
      { ...mcq(
        "sqlf-d5",
        "DELETE without WHERE:",
        "DELETE without WHERE:",
        ["deletes all rows (dangerous)", "no-op", "drops table", "creates backup"],
        0,
      ), optionsEn: ["Deletes all rows if permitted and no condition restricts them", "Does nothing", "Drops the table", "Creates a backup"] },
    ],
  ),
  ...dmlDepthLessons,
  exam("sqlf-dml-exam", "Контрольна: DML", "Exam: DML", 2, [
    codeFill("sqlf-de1", "INSERT", "INSERT", "sql", "___ INTO t (a) VALUES (1);", ["INSERT", "insert"], false),
    codeFill("sqlf-de2", "SET", "SET", "sql", "UPDATE t ___ a = 2;", ["SET", "set"], false),
    codeFill("sqlf-de3", "DELETE", "DELETE", "sql", "___ FROM t WHERE id = 1;", ["DELETE", "delete"], false),
    { ...mcq("sqlf-de4", "Як безпечно виконати UPDATE або DELETE?", "How should UPDATE or DELETE be used safely?", ["Перевірити умову і цільові рядки; без WHERE змінюються всі рядки", "WHERE потрібен лише для SELECT *", "Завжди використовувати CREATE", "DROP не змінює даних"], 0), optionsEn: ["Check the condition and target rows; without WHERE all rows are affected", "WHERE is only for SELECT *", "Always use CREATE", "DROP never affects data"] },
  ]),
]);

const modeling = unit("modeling", "Keys & modeling", "Keys & modeling", [
  lesson(
    "sqlf-keys",
    "PRIMARY / FOREIGN KEY",
    "PRIMARY / FOREIGN KEY",
    2,
    false,
    [
      concept("sqlf-keys-concept", "Цілісність даних", "Data integrity", {
        uk: "Первинний ключ однозначно визначає рядок і не допускає NULL. Зовнішній ключ посилається на унікальний або первинний ключ тієї самої чи іншої таблиці; допустимість NULL залежить від обмежень стовпців і правил діалекту. UNIQUE, NOT NULL і CHECK виражають інші правила цілісності.",
        en: "A primary key uniquely identifies a row and cannot be NULL. A foreign key references a unique or primary key in the same or another table; NULL handling depends on column constraints and dialect rules. UNIQUE, NOT NULL, and CHECK express other integrity rules.",
      }),
      { ...mcq(
        "sqlf-m1",
        "PRIMARY KEY:",
        "PRIMARY KEY:",
        ["унікально ідентифікує рядок", "optional always duplicate", "only text", "CSS id"],
        0,
      ), optionsEn: ["Uniquely identifies a row and cannot be NULL", "Always optional and duplicated", "Only text", "A CSS id"] },
      { ...mcq(
        "sqlf-m2",
        "FOREIGN KEY:",
        "FOREIGN KEY:",
        ["посилання на ключ у цій або іншій таблиці з урахуванням правил NULL", "sort order", "index type only", "transaction isolation"],
        0,
      ), optionsEn: ["References a candidate key in the same or another table, subject to null and constraint rules", "Sort order", "Only an index type", "Transaction isolation"] },
      matchEx(
        "sqlf-m3",
        "Constraints",
        "Constraints",
        [
          { left: "UNIQUE", right: "no duplicate values" },
          { left: "NOT NULL", right: "required value" },
          { left: "CHECK", right: "custom predicate" },
        ],
      ),
    ],
  ),
  lesson(
    "sqlf-index",
    "Indexes intro",
    "Indexes intro",
    3,
    false,
    [
      concept("sqlf-index-concept", "Індекс як компроміс", "Indexes as a tradeoff", {
        uk: "Індекс може прискорити відповідний пошук, сортування або JOIN, але не гарантує, що оптимізатор його вибере. Він займає місце й потребує оновлення під час записів. Оцінюйте індекси за планом запиту та реальним навантаженням.",
        en: "An index can accelerate suitable lookups, ordering, or joins, but does not guarantee the optimizer will choose it. It uses storage and must be maintained on writes. Evaluate indexes using query plans and representative workloads.",
      }),
      { ...mcq(
        "sqlf-m4",
        "Index helps:",
        "Index helps:",
        ["швидший lookup/filter/join", "always slower writes never tradeoff", "replace WHERE", "store images"],
        0,
      ), optionsEn: ["It can speed up suitable lookups, filters, and joins", "Writes are always slower with no tradeoff", "It replaces WHERE", "It stores images"] },
      codeFill(
        "sqlf-m5",
        "create index",
        "create index",
        "sql",
        "CREATE ___ idx_users_email ON users(email);",
        ["INDEX", "index"],
        false,
      ),
      { ...mcq(
        "sqlf-m6",
        "Too many indexes:",
        "Too many indexes:",
        ["slower writes / storage cost", "free performance always", "no downside", "deletes data"],
        0,
      ), optionsEn: ["Additional write and storage cost", "Always free performance", "No downside", "Deletes data"] },
    ],
  ),
  ...ddlDepthLessons,
  exam("sqlf-model-exam", "Контрольна: modeling", "Exam: modeling", 2, [
    { ...mcq("sqlf-me1", "Що таке первинний ключ?", "What is a primary key?", ["Унікальний ненульовий ідентифікатор рядка", "Необов’язкові дублікати", "Тип JOIN", "Обмеження кількості"], 0), optionsEn: ["A unique non-NULL row identifier", "Optional duplicates", "A JOIN type", "A row limit"] },
    { ...mcq("sqlf-me2", "Що перевіряє зовнішній ключ?", "What does a foreign key enforce?", ["Посилання на відповідний ключ за правилами обмеження", "Порядок сортування", "CSS", "HTTP"], 0), optionsEn: ["A reference to a matching key under the constraint rules", "Sort order", "CSS", "HTTP"] },
    codeFill("sqlf-me3", "INDEX", "INDEX", "sql", "CREATE ___ ON t(c);", ["INDEX", "index"], false),
    { ...mcq("sqlf-me4", "Що означає NOT NULL?", "What does NOT NULL mean?", ["Стовпець не приймає NULL", "Значення завжди необов’язкове", "Тип JOIN", "Агрегат"], 0), optionsEn: ["The column cannot contain NULL", "The value is always optional", "A JOIN type", "An aggregate"] },
  ]),
]);

const queryRepairScenarios = unit(
  "query_repair_scenarios",
  "Scenario: дебаг та виправлення SQL-запитів",
  "Scenario: Query Repair & Debugging",
  [
    lesson(
      "sql-repair-group-having",
      "Виправлення помилок GROUP BY та HAVING",
      "Repairing GROUP BY & HAVING errors",
      3,
      false,
      [
      concept("sql-repair-group-having-concept", "Логічний порядок запиту", "Logical query order", {
        uk: "Для аналізу запиту корисна логічна модель: FROM і JOIN визначають джерела, WHERE фільтрує рядки, GROUP BY формує групи, HAVING відбирає групи, SELECT задає результат, ORDER BY сортує його. Оптимізатор може виконувати фізичні операції інакше за збереження семантики.",
        en: "For reasoning about a query, use the logical model: FROM and JOIN define sources, WHERE filters rows, GROUP BY forms groups, HAVING filters groups, SELECT defines output, and ORDER BY sorts it. The optimizer may execute physical operations differently while preserving semantics.",
      }),
        { ...codeRead(
          "sql-rep-1",
          "Чому цей запит викликає помилку ORA-00979 / SQL syntax error?",
          "Why does this query trigger GROUP BY error?",
          "sql",
          "SELECT dept_id, job_title, AVG(salary)\nFROM employees\nGROUP BY dept_id; -- job_title missing in GROUP BY!",
          [
            "job_title є в SELECT, але відсутній у списку GROUP BY і не загорнутий в агрегатну функцію",
            "AVG() не працює з числами",
            "dept_id має бути в лапках",
            "FROM має йти після GROUP BY",
          ],
          0,
        ) as Extract<Exercise, { type: "code_read" }>, optionsEn: ["job_title appears in SELECT but is neither grouped nor aggregated", "AVG cannot work with numbers", "dept_id must be quoted", "FROM must follow GROUP BY"] },
        codeFill(
          "sql-rep-2",
          "Фільтрація агрегованих груп: виправлення WHERE на HAVING",
          "Filter aggregated groups using HAVING instead of WHERE",
          "sql",
          "SELECT dept_id, COUNT(*)\nFROM employees\nGROUP BY dept_id\n___ COUNT(*) >= 5;",
          ["HAVING", "having"],
          false,
        ),
        codeOrder(
          "sql-rep-3",
          "Логічний порядок виконання запиту СУБД (SQL execution order)",
          "Logical SQL execution order in RDBMS",
          "sql",
          [
            "GROUP BY — групування / grouping",
            "FROM / JOIN — джерела / row sources",
            "SELECT — проєкція / projection",
            "WHERE — фільтр рядків / row filter",
            "ORDER BY — сортування / ordering",
            "HAVING — фільтр груп / group filter",
          ],
          [
            "FROM / JOIN — джерела / row sources",
            "WHERE — фільтр рядків / row filter",
            "GROUP BY — групування / grouping",
            "HAVING — фільтр груп / group filter",
            "SELECT — проєкція / projection",
            "ORDER BY — сортування / ordering",
          ],
          why(
            "WHERE виконується до GROUP BY, тому агрегати доступні лише починаючи з HAVING / SELECT.",
            "WHERE executes before GROUP BY, so aggregates can only be filtered in HAVING.",
          ),
        ),
      ],
    ),
    lesson(
      "sql-repair-join-pitfalls",
      "Виправлення декартового добутку та кривих JOIN",
      "Repairing Cartesian joins & predicate traps",
      3,
      false,
      [
        concept("sql-repair-join-pitfalls-concept", "Умова JOIN і фільтр результату", "Join condition and result filter", {
          uk: "Спочатку визначте потрібні рядки. LEFT JOIN з умовою статусу в ON зберігає всіх клієнтів і приєднує лише відповідні замовлення; той самий фільтр у WHERE відкидає рядки з NULL справа. CROSS JOIN повертає всі пари, тому його обсяг — добуток розмірів входів.",
          en: "First define which rows are required. A LEFT JOIN with a status condition in ON retains all customers and joins only matching orders; the same WHERE filter discards NULL-extended rows. CROSS JOIN returns all pairs, so its size is the product of input sizes.",
        }),
        { ...codeRead(
          "sql-rep-4",
          "Потрібні всі клієнти та лише їхні завершені замовлення. Як виправити фільтр?",
          "All customers and only their completed orders are required. How should the filter be fixed?",
          "sql",
          "SELECT c.name, o.id\nFROM customers c\nLEFT JOIN orders o ON c.id = o.customer_id\nWHERE o.status = 'COMPLETED'; -- ламає LEFT JOIN для користувачів без замовлень!",
          [
            "Умова o.status = 'COMPLETED' відсікає NULL-рядки. Її слід перенести в умову ON c.id = o.customer_id AND o.status = 'COMPLETED'",
            "LEFT JOIN не підтримує WHERE",
            "customers обов'язково має бути праворуч",
            "Запит видає синтаксичну помилку",
          ],
          0,
        ) as Extract<Exercise, { type: "code_read" }>, optionsEn: ["The WHERE condition discards NULL-extended rows; move o.status = 'COMPLETED' into the ON condition to retain all customers", "LEFT JOIN does not support WHERE", "customers must be on the right", "The query has a syntax error"] },
        codeFill(
          "sql-rep-5",
          "Запобігання декартовому добутку (Cartesian product): додавання умови з'єднання",
          "Prevent Cartesian product by adding join condition",
          "sql",
          "SELECT e.name, d.dept_name\nFROM employees e\nJOIN departments d ___ e.dept_id = d.id;",
          ["ON", "on"],
          false,
        ),
        { ...mcq(
          "sql-rep-6",
          "Скільки рядків поверне декартове з'єднання таблиці з 100 рядків і таблиці з 50 рядків?",
          "How many rows returned by Cartesian product of 100 rows and 50 rows?",
          ["100 * 50 = 5000 рядків", "150 рядків", "100 рядків", "50 рядків"],
          0,
        ), optionsEn: ["100 * 50 = 5000 rows", "150 rows", "100 rows", "50 rows"] },
      ],
    ),
    lesson(
      "sql-repair-null-subqueries",
      "Виправлення пасток з NULL та підзапитами",
      "Repairing NULL traps in NOT IN subqueries",
      3,
      false,
      [
        concept("sql-repair-null-subqueries-concept", "NOT IN і тризначна логіка", "NOT IN and three-valued logic", {
          uk: "Якщо підзапит NOT IN містить NULL, збіг дає FALSE, а для ненульового значення без збігу результат UNKNOWN; WHERE не пропускає ні FALSE, ні UNKNOWN. NOT EXISTS часто зручний, але перевіряйте правила для NULL з обох боків: такі переписування не завжди еквівалентні.",
          en: "If a NOT IN subquery contains NULL, a match yields FALSE and a non-NULL value without a match yields UNKNOWN; WHERE passes neither. NOT EXISTS is often useful, but check NULL behavior on both sides: rewrites are not always equivalent.",
        }),
        { ...codeRead(
          "sql-rep-7",
          "clients.id — ненульовий ключ, а підзапит повертає NULL. Чому запит не повертає клієнтів?",
          "clients.id is a non-null key and the subquery returns NULL. Why does the query return no clients?",
          "sql",
          "-- Для id без збігу NULL у підзапиті робить NOT IN невідомим\nSELECT * FROM clients\nWHERE id NOT IN (SELECT client_id FROM churned_clients);",
          [
            "Збіги відкидаються як FALSE, а решта стають UNKNOWN через NULL. Для ненульового id можна використати NOT EXISTS або виключити NULL у підзапиті",
            "NOT IN заборонено стандартом SQL",
            "clients не має поля id",
            "churned_clients заблокована",
          ],
          0,
        ) as Extract<Exercise, { type: "code_read" }>, optionsEn: ["Matches are FALSE and remaining comparisons are UNKNOWN due to NULL; for non-null id use NOT EXISTS or filter NULL in the subquery", "NOT IN is forbidden by SQL", "clients has no id", "churned_clients is locked"] },
        codeFill(
          "sql-rep-8",
          "Безпечний еквівалент підзапиту через NOT EXISTS",
          "Safe subquery rewrite with NOT EXISTS",
          "sql",
          "SELECT c.* FROM clients c\nWHERE NOT ___(SELECT 1 FROM churned_clients ch WHERE ch.client_id = c.id);",
          ["EXISTS", "exists"],
          false,
        ),
        { ...mcq(
          "sql-rep-9",
          "Яка функція повертає перший аргумент, що не є NULL?",
          "Which function returns the first non-null argument?",
          ["COALESCE()", "NULLIF()", "ISNULL_OR()", "FIRST_VALUE()"],
          0,
        ), optionsEn: ["COALESCE()", "NULLIF()", "ISNULL_OR()", "FIRST_VALUE()"] },
      ],
    ),
    exam(
      "sql-rep-exam",
      "Екзамен: виправлення SQL-запитів",
      "Exam: query repair",
      3,
      [
        { ...mcq(
          "sql-rep-10",
          "Як правильно перевірити, чи містить колонка порожнє значення NULL?",
          "How to correctly test if a column is NULL in SQL?",
          ["WHERE column IS NULL", "WHERE column = NULL", "WHERE column == NULL", "WHERE column ISEMPTY"],
          0,
        ), optionsEn: ["WHERE column IS NULL", "WHERE column = NULL", "WHERE column == NULL", "WHERE column ISEMPTY"] },
        { ...codeRead(
          "sql-rep-11",
          "Що поверне запит із віконною функцією ROW_NUMBER()?",
          "What does ROW_NUMBER() OVER (PARTITION BY dept_id ORDER BY salary DESC) do?",
          "sql",
          "SELECT name, dept_id, ROW_NUMBER() OVER (PARTITION BY dept_id ORDER BY salary DESC) as rk\nFROM employees;",
          [
            "Нумерує співробітників від 1 всередині кожного департаменту за спаданням зарплати",
            "Повертає лише першого співробітника компанії",
            "Сортує департаменти за алфавітом",
            "Видаляє дублікати з таблиці",
          ],
          0,
        ) as Extract<Exercise, { type: "code_read" }>, optionsEn: ["Numbers employees from 1 within each department by descending salary", "Returns only the first employee in the company", "Sorts departments alphabetically", "Deletes duplicate rows"] },
        codeFill(
          "sql-rep-12",
          "Команда для виправлення даних: модифікація значень існуючих рядків",
          "Command to modify existing table rows",
          "sql",
          "___ employees SET salary = salary * 1.1 WHERE dept_id = 10;",
          ["UPDATE", "update"],
          false,
        ),
        codeOrder(
          "sql-rep-13",
          "Порядок підготовки транзакції зі збереженням точок відкату (Oracle vs PostgreSQL BEGIN)",
          "Transaction control statements order (Oracle implicit vs PostgreSQL BEGIN)",
          "sql",
          [
            "SAVEPOINT sp1;",
            "BEGIN TRANSACTION;",
            "UPDATE accounts SET balance = balance + 100 WHERE id = 2;",
            "COMMIT;",
            "UPDATE accounts SET balance = balance - 100 WHERE id = 1;",
          ],
          [
            "BEGIN TRANSACTION;",
            "UPDATE accounts SET balance = balance - 100 WHERE id = 1;",
            "SAVEPOINT sp1;",
            "UPDATE accounts SET balance = balance + 100 WHERE id = 2;",
            "COMMIT;",
          ],
          why(
            "Діалект: у PostgreSQL транзакцію відкривають явно через BEGIN; в Oracle DML стартує транзакцію автоматично без BEGIN.",
            "Dialect note: PostgreSQL starts explicit transactions with BEGIN; Oracle starts one implicitly on the first DML.",
          ),
        ),
      ],
    ),
  ],
);

const capstone = unit("capstone", "Capstone", "Capstone", [
  lesson(
    "sqlf-capstone-query",
    "Scenario: users + orders",
    "Scenario: users + orders",
    3,
    false,
    [
      concept("sqlf-capstone-concept", "Від запитання до запиту", "From question to query", {
        uk: "Щоб підсумувати замовлення, з’єднайте користувачів із замовленнями за ключем і згрупуйте рядки за користувачем. INNER JOIN вилучає користувачів без замовлень; LEFT JOIN зберігає їх. Для стабільної пагінації ORDER BY має визначати однозначний порядок, наприклад за унікальним id. Фільтрування ROW_NUMBER залежить від версії Oracle.",
        en: "To total orders, join users to orders by key and group rows by user. INNER JOIN excludes users without orders; LEFT JOIN keeps them. Stable pagination needs an ORDER BY that defines a unique order, for example by unique id. Filtering ROW_NUMBER depends on the Oracle version.",
      }),
      { ...mcq(
        "sqlf-c1",
        "Імена користувачів і сума їхніх замовлень:",
        "User names and the sum of their orders:",
        ["лише DROP", "JOIN і GROUP BY SUM", "лише DELETE", "EXPLAIN ANALYZE"],
        1,
      ), optionsEn: ["Only DROP", "JOIN and GROUP BY with SUM", "Only DELETE", "EXPLAIN ANALYZE"] },
      { ...codeRead(
        "sqlf-c5",
        "Друга сторінка стрічки по 20 рядків на Oracle 12c і новіше:",
        "Second page of a feed, 20 rows, on Oracle 12c and later:",
        "sql",
        "SELECT * FROM posts\nORDER BY id DESC\nOFFSET 20 ROWS\nFETCH NEXT 20 ROWS ONLY",
        ["LIMIT 20 OFFSET 20", "OFFSET і FETCH NEXT", "WITH RECURSIVE", "EXPLAIN ANALYZE"],
        1,
      ) as Extract<Exercise, { type: "code_read" }>, optionsEn: ["LIMIT 20 OFFSET 20", "OFFSET and FETCH NEXT", "WITH RECURSIVE", "EXPLAIN ANALYZE"] },
      { ...mcq(
        "sqlf-c6",
        "Відібрати rn = 1 після ROW_NUMBER у тому самому SELECT. На Oracle 26ai з RU 23.26.0+ це:",
        "Keep rn = 1 after ROW_NUMBER in the same SELECT. On Oracle 26ai with RU 23.26.0+ that is:",
        ["WHERE rn = 1, бо аналітика вже відома в WHERE", "QUALIFY", "обов’язкове слово RECURSIVE", "GRANT SELECT"],
        1,
      ), optionsEn: ["WHERE rn = 1 because analytics are already available in WHERE", "QUALIFY", "The required RECURSIVE keyword", "GRANT SELECT"] },
      codeFill(
        "sqlf-c2",
        "З’єднайте користувачів із замовленнями",
        "Join users to orders",
        "sql",
        "FROM users u JOIN orders o ___ u.id = o.user_id",
        ["ON", "on"],
        false,
      ),
      codeFill(
        "sqlf-c3",
        "Згрупуйте за користувачем",
        "Group by user",
        "sql",
        "SELECT u.id, SUM(o.total) FROM … ___ u.id;",
        ["GROUP BY", "group by"],
        false,
      ),
      codeRead(
        "sqlf-c4",
        "Користувачі без замовлень:",
        "Users without orders:",
        "sql",
        "LEFT JOIN … WHERE o.id IS NULL",
        ["anti-join pattern", "inner only", "drop table", "grant"],
        0,
      ),
    ],
  ),
  exam("sqlf-cap-exam", "Фінальна контрольна SQL", "Final SQL exam", 3, [
    codeFill("sqlf-ce1", "SELECT", "SELECT", "sql", "___ * FROM t;", ["SELECT", "select"], false),
    codeFill("sqlf-ce2", "WHERE", "WHERE", "sql", "… ___ x > 1;", ["WHERE", "where"], false),
    codeFill("sqlf-ce3", "JOIN ON", "JOIN ON", "sql", "JOIN b ___ a.id = b.a_id", ["ON", "on"], false),
    codeFill("sqlf-ce4", "GROUP BY", "GROUP BY", "sql", "SELECT a, COUNT(*) FROM t ___ a;", ["GROUP BY", "group by"], false),
    codeFill("sqlf-ce5", "COUNT", "COUNT", "sql", "SELECT ___(*) FROM t;", ["COUNT", "count"], false),
    { ...mcq("sqlf-ce6", "LEFT JOIN зберігає:", "LEFT JOIN keeps:", ["лише збіги", "ліві рядки", "жодного лівого рядка", "DDL"], 1), optionsEn: ["Only matches", "Left rows", "No left rows", "DDL"] },
    { ...mcq(
      "sqlf-ce7",
      "Фільтр аналітики QUALIFY належить до:",
      "The QUALIFY analytic filter belongs to:",
      ["Oracle 11g", "Oracle 19c як єдина форма", "Oracle 26ai з RU 23.26.0+; в Oracle 19c використовують зовнішній запит", "лише PL/SQL"],
      2,
    ), optionsEn: ["Oracle 11g", "Oracle 19c as the only form", "Oracle 26ai with RU 23.26.0+; Oracle 19c uses an outer query", "Only PL/SQL"] },
    { ...mcq(
      "sqlf-ce8",
      "Як отримати поточні дату і час типу DATE в Oracle?",
      "How do you get the current date and time as a DATE in Oracle?",
      ["EXPLAIN ANALYZE", "WITH RECURSIVE", "LIMIT", "SYSDATE"],
      3,
    ), optionsEn: ["EXPLAIN ANALYZE", "WITH RECURSIVE", "LIMIT", "SYSDATE"] },
    ...capstoneOracleExercises,
  ]),
]);

const windowsU = unit("windows", "NULL і віконні функції", "NULL and window functions", [
  lesson("sqlf-null-coalesce", "NULL і COALESCE", "NULL and COALESCE", 2, true, [
    concept("sqlf-null-coalesce-concept", "Невідоме значення", "Unknown values", {
      uk: "NULL позначає відсутнє або невідоме значення. Порівняння з ним через = чи <> зазвичай дає UNKNOWN, а WHERE залишає тільки TRUE. Для перевірки використовуйте IS NULL; COALESCE повертає перший не-NULL аргумент. Oracle також трактує порожній рядок як NULL.",
      en: "NULL represents an absent or unknown value. Comparing with it using = or <> generally yields UNKNOWN, and WHERE keeps only TRUE. Use IS NULL to test for it; COALESCE returns the first non-NULL argument. Oracle also treats an empty string as NULL.",
    }),
    { ...mcq("sqlf-nc1", "Що означає NULL?", "What does NULL mean?", ["невідоме або відсутнє значення", "завжди нуль", "завжди порожній рядок", "лише логічне false"], 0), optionsEn: ["An unknown or missing value", "Always zero", "Always an empty string", "Only Boolean false"] },
    codeFill("sqlf-nc2", "Перевірте відсутню адресу", "Test for a missing address", "sql", "SELECT * FROM t WHERE email ___ NULL;", ["IS", "is"], false, why("Для NULL використовують IS NULL, а не = NULL.", "Use IS NULL rather than = NULL.")),
    codeFill("sqlf-nc3", "Оберіть перше відоме значення", "Choose the first known value", "sql", "SELECT ___(nickname, 'anon') FROM users;", ["COALESCE", "coalesce", "NVL", "nvl"], false, why("Для двох аргументів підійдуть COALESCE або NVL.", "For two arguments, COALESCE or NVL works.")),
    { ...mcq("sqlf-nc4", "Результат порівняння 1 = NULL:", "The result of 1 = NULL:", ["UNKNOWN", "завжди TRUE", "завжди FALSE", "синтаксична помилка"], 0, why("UNKNOWN не проходить фільтр WHERE.", "UNKNOWN does not pass a WHERE filter.")), optionsEn: ["UNKNOWN", "Always TRUE", "Always FALSE", "A syntax error"] },
  ]),
  lesson("sqlf-window-row", "ROW_NUMBER і OVER", "ROW_NUMBER and OVER", 3, false, [
    concept("sqlf-window-row-concept", "Номер у межах групи", "A number within a partition", {
      uk: "Аналітична функція додає значення до рядків, не згортаючи їх як GROUP BY. PARTITION BY визначає незалежні групи, ORDER BY усередині OVER — порядок обчислення. ROW_NUMBER призначає різні номери навіть за однакових значень сортування; додайте унікальний ключ для стабільного результату. Зовнішній ORDER BY окремо задає порядок видачі.",
      en: "An analytic function adds a value to rows without collapsing them like GROUP BY. PARTITION BY defines independent groups; ORDER BY inside OVER defines calculation order. ROW_NUMBER assigns different numbers even to ties; add a unique key for deterministic results. An outer ORDER BY separately controls output order.",
    }),
    { ...mcq("sqlf-w1", "Що зберігають віконні функції?", "What do window functions preserve?", ["деталі рядків разом з аналітичним значенням", "лише один агрегований рядок", "видаляють таблицю", "лише індекси"], 0), optionsEn: ["Row detail along with an analytic value", "Only one aggregated row", "They drop the table", "Only indexes"] },
    codeFill("sqlf-w2", "Пронумеруйте рядки", "Number the rows", "sql", "SELECT ___() OVER (ORDER BY created_at, id) AS rn FROM t;", ["ROW_NUMBER", "row_number"], false, why("Унікальний id розв’язує нічиї за created_at, якщо id є ключем.", "A unique id breaks ties on created_at when id is a key.")),
    codeFill("sqlf-w3", "Незалежні групи користувачів", "Independent user partitions", "sql", "OVER (___ BY user_id ORDER BY ts)", ["PARTITION", "partition"], false),
    { ...mcq("sqlf-window-ties", "Два рядки мають однаковий created_at. Як зробити ROW_NUMBER відтворюваним, якщо id унікальний?", "Two rows share created_at. How can ROW_NUMBER be deterministic if id is unique?", ["Додати id до ORDER BY у OVER", "Прибрати ORDER BY", "Додати DISTINCT після запиту", "Замінити OVER на WHERE"], 0, why("Сортування за created_at, id задає однозначний порядок.", "Ordering by created_at, id establishes a unique order.")), optionsEn: ["Add id to ORDER BY inside OVER", "Remove ORDER BY", "Add DISTINCT after the query", "Replace OVER with WHERE"] },
  ]),
  lesson("sqlf-window-rank", "RANK і DENSE_RANK", "RANK and DENSE_RANK", 3, false, [
    concept("sqlf-window-rank-concept", "Нічиї та пропущені місця", "Ties and skipped ranks", {
      uk: "RANK і DENSE_RANK присвоюють однаковий ранг рядкам із однаковими значеннями сортування. Після двох перших місць RANK дає 3, а DENSE_RANK — 2. Аналітичні RANK() та DENSE_RANK() не приймають score як аргумент: значення вказують у ORDER BY всередині OVER.",
      en: "RANK and DENSE_RANK assign the same rank to rows tied on the ordering values. After two first-place rows, RANK gives 3 and DENSE_RANK gives 2. Analytic RANK() and DENSE_RANK() do not take score as an argument: specify it in ORDER BY inside OVER.",
    }),
    { ...mcq("sqlf-w4", "Після нічиєї з рангами 1, 1 наступний RANK дорівнює:", "After tied ranks 1, 1, the next RANK is:", ["3", "2", "0", "NULL"], 0), optionsEn: ["3", "2", "0", "NULL"] },
    { ...mcq("sqlf-w5", "Після нічиєї з рангами 1, 1 наступний DENSE_RANK дорівнює:", "After tied ranks 1, 1, the next DENSE_RANK is:", ["2", "3", "1", "помилка"], 0), optionsEn: ["2", "3", "1", "Error"] },
    codeFill("sqlf-w6", "Щільне ранжування за спаданням балів", "Dense ranking by descending score", "sql", "SELECT ___() OVER (ORDER BY score DESC) FROM t;", ["DENSE_RANK", "dense_rank"], false, why("Аналітична функція має порожні дужки; поле сортування записують у OVER.", "The analytic function has empty parentheses; the ordering field goes inside OVER.")),
  ]),
  exam("sqlf-window-exam", "Контрольна: віконні функції", "Exam: window functions", 3, [
    { ...mcq("sqlf-we1", "OVER використовують із:", "OVER is used with:", ["аналітичними функціями", "лише DELETE", "лише GRANT", "CSS"], 0), optionsEn: ["Analytic functions", "Only DELETE", "Only GRANT", "CSS"] },
    codeFill("sqlf-we2", "Номер рядка", "Row number", "sql", "___() OVER (ORDER BY id)", ["ROW_NUMBER", "row_number"], false),
    { ...mcq("sqlf-we3", "PARTITION BY:", "PARTITION BY:", ["визначає групи для аналітичного обчислення", "видаляє таблицю", "перейменовує базу", "лише блокує рядки"], 0), optionsEn: ["Defines partitions for analytic calculation", "Drops the table", "Renames the database", "Only locks rows"] },
    codeFill("sqlf-we4", "Порядок усередині групи", "Order within a partition", "sql", "OVER (PARTITION BY u ___ BY ts)", ["ORDER", "order"], false),
  ]),
]);

const datasetDiagnosisU = unit(
  "dataset_diagnosis",
  "Діагностика результатів і діалекти (Oracle vs PostgreSQL)",
  "Dataset Result Diagnosis & Dialect Notes",
  [
    lesson(
      "sqlf-dataset-predict",
      "Передбачення результату на датасеті: JOIN + NULL + агрегація",
      "Predict query output on a sample dataset (JOIN, NULL, COUNT)",
      3,
      false,
      [
        concept("sqlf-dataset-diagnosis-concept", "Перевірка результату за рядками", "Tracing query results row by row", {
          uk: "Спочатку випишіть рядки після кожного JOIN, потім застосуйте фільтр і групування. LEFT JOIN створює NULL у колонках відсутнього збігу: COUNT(*) рахує такий рядок, але COUNT правого ключа — ні. Дві незалежні гілки 1:N можуть перемножити рядки; безпечно агрегуйте кожну гілку до одного рядка на ключ перед їх з’єднанням.",
          en: "First list the rows after each JOIN, then apply filtering and grouping. LEFT JOIN supplies NULLs for a missing match: COUNT(*) counts that row, while COUNT of the right key does not. Two independent 1:N branches can multiply rows; safely aggregate each branch to one row per key before joining them.",
        }),
        { ...codeRead(
          "sqlf-ds1",
          "Дано: `users` = [(1, 'Ada'), (2, 'Bohdan')], `orders` = [(10, 1, 100), (11, 1, NULL)]. Що поверне цей запит?",
          "Dataset: `users` = [(1, 'Ada'), (2, 'Bohdan')], `orders` = [(10, 1, 100), (11, 1, NULL)]. What does this return?",
          "sql",
          "SELECT u.name, COUNT(o.id) AS total_orders, COUNT(o.amount) AS priced_orders\nFROM users u\nLEFT JOIN orders o ON o.user_id = u.id\nGROUP BY u.id, u.name\nORDER BY u.id;",
          [
            "('Ada', 2, 1) та ('Bohdan', 0, 0) — COUNT(o.id) рахує 2 замовлення, COUNT(o.amount) пропускає NULL",
            "('Ada', 2, 2) та ('Bohdan', 1, 1)",
            "Лише ('Ada', 2, 1), бо Bohdan відсіюється LEFT JOIN",
            "('Ada', 1, 1) та ('Bohdan', 0, 0)",
          ],
          0,
          why(
            "COUNT(column) ігнорує NULL (однак LEFT JOIN зберігає Bohdan із 0 замовлень, бо o.id є NULL).",
            "COUNT(column) ignores NULLs; LEFT JOIN keeps Bohdan with o.id = NULL so both counts are 0.",
          ),
        ) as Extract<Exercise, { type: "code_read" }>, optionsEn: ["(Ada, 2, 1) and (Bohdan, 0, 0): COUNT(o.id) counts two orders; COUNT(o.amount) skips NULL", "(Ada, 2, 2) and (Bohdan, 1, 1)", "Only (Ada, 2, 1), because LEFT JOIN filters out Bohdan", "(Ada, 1, 1) and (Bohdan, 0, 0)"] },
        { ...codeOutputMcq(
          "sqlf-ds2",
          "Діагностуйте хибне підсумовування: `users` має 1 рядок (Ada), `tasks` — 3 задачі по 10 балів, `comments` — 2 коментарі. Чому сума становить 60 замість 30?",
          "Diagnose inflated totals: 1 user, 3 tasks (10 pts each), 2 comments. Why does this return 60 instead of 30?",
          "sql",
          "SELECT u.id, SUM(t.points) AS pts\nFROM users u\nJOIN tasks t ON t.user_id = u.id\nJOIN comments c ON c.user_id = u.id\nGROUP BY u.id;",
          [
            "Множення рядків двох зв'язків 1:N (3 tasks × 2 comments = 6 рядків до SUM)",
            "SUM() у SQL рахує кожен рядок двічі за замовчуванням",
            "JOIN повернув NULL",
            "GROUP BY u.id видалив дублікати неправильно",
          ],
          0,
          why(
            "Дві незалежні таблиці 1:N в одному JOIN породжують декартове розмноження; агрегуйте обидві гілки до одного рядка на користувача перед їх з’єднанням.",
            "Joining two independent 1:N tables multiplies rows before SUM; pre-aggregate both branches to one row per user before joining them.",
          ),
        ) as Extract<Exercise, { type: "code_output" }>, optionsEn: ["Two independent 1:N joins multiply rows: 3 tasks × 2 comments = 6 rows before SUM", "SUM always counts every row twice", "JOIN returned NULL", "GROUP BY u.id removed duplicates incorrectly"] },
        { ...mcq(
          "sqlf-ds3",
          "Яка відповідність між Oracle SQL (1Z0-071) та PostgreSQL коректна?",
          "Which Oracle SQL (1Z0-071) to PostgreSQL dialect mapping is accurate?",
          [
            "Oracle `NVL(a, b)` / `MINUS` / `FROM DUAL` ↔ PostgreSQL `COALESCE(a, b)` / `EXCEPT` / `SELECT ...` без DUAL",
            "Oracle `VARCHAR2` швидший за PostgreSQL `TEXT`, бо Postgres не підтримує індекси",
            "PostgreSQL не підтримує `LEFT JOIN` і `ROW_NUMBER()`",
            "Oracle і PostgreSQL мають ідентичні `SYSDATE` і `LIMIT`",
          ],
          0,
          why(
            "Це поширені відповідності для зазначених прикладів, але NVL і COALESCE можуть відрізнятися правилами типів та обчислення аргументів.",
            "These are common mappings for the examples shown, but NVL and COALESCE can differ in type handling and argument evaluation.",
          ),
        ), optionsEn: ["Oracle NVL(a, b) / MINUS / FROM DUAL correspond in these examples to PostgreSQL COALESCE(a, b) / EXCEPT / SELECT without DUAL", "Oracle VARCHAR2 is faster because PostgreSQL has no indexes", "PostgreSQL has no LEFT JOIN or ROW_NUMBER()", "Oracle and PostgreSQL have identical SYSDATE and LIMIT"] },
      ],
    ),
    exam("sqlf-ds-exam", "Контрольна: діагностика запитів і діалекти", "Exam: dataset diagnosis & SQL dialects", 3, [
      { ...mcq(
        "sqlf-dse1",
        "У наборі рядків `[10, NULL, 20]` значення `COUNT(*)` та `COUNT(col)` дорівнюють:",
        "For column values `[10, NULL, 20]`, `COUNT(*)` and `COUNT(col)` evaluate to:",
        ["3 і 2", "3 і 3", "2 і 2", "2 і 1"],
        0,
        why("COUNT(*) рахує всі рядки; COUNT(col) пропускає NULL.", "COUNT(*) counts rows; COUNT(col) skips NULLs."),
      ), optionsEn: ["3 and 2", "3 and 3", "2 and 2", "2 and 1"] },
      codeFill(
        "sqlf-dse2",
        "PostgreSQL-еквівалент Oracle `MINUS` (різниця множин)",
        "Standard / PostgreSQL equivalent of Oracle `MINUS`",
        "sql",
        "SELECT id FROM a ___ SELECT id FROM b;",
        ["EXCEPT", "except"],
        false,
        why("Oracle використовує MINUS, стандарт і PostgreSQL — EXCEPT.", "Oracle uses MINUS; ANSI SQL and PostgreSQL use EXCEPT."),
      ),
      { ...codeRead(
        "sqlf-dse3",
        "Яка причина, що `WHERE col != 'done'` приховує рядки з `col IS NULL`?",
        "Why does `WHERE col != 'done'` omit rows where `col` is `NULL`?",
        "sql",
        "SELECT * FROM tasks WHERE status != 'done';",
        [
          "Порівняння `NULL != 'done'` дає `UNKNOWN`, а `WHERE` пропускає лише `TRUE`",
          "SQL приводить NULL до рядка 'done'",
          "!= працює лише для чисел",
          "Потрібно використати HAVING",
        ],
        0,
        why("Для збереження NULL використовуйте `WHERE status IS DISTINCT FROM 'done'` (PostgreSQL) або `(status != 'done' OR status IS NULL)`.", "Use `IS DISTINCT FROM` (Postgres) or explicit `OR status IS NULL`."),
      ) as Extract<Exercise, { type: "code_read" }>, optionsEn: ["NULL != done is UNKNOWN, and WHERE keeps only TRUE", "SQL converts NULL to the string done", "!= works only for numbers", "HAVING is required"] },
      codeOrderAuto(
        "sqlf-dse4",
        "Безпечний шаблон уникнення розмноження рядків при сумуванні двох гілок",
        "Pattern to avoid fan-out row multiplication across two 1:N tables",
        "sql",
        [
          "WITH task_totals AS (",
          "  SELECT user_id, SUM(points) AS pts FROM tasks GROUP BY user_id",
          "), comment_totals AS (",
          "  SELECT user_id, COUNT(*) AS cnt FROM comments GROUP BY user_id",
          ")",
          "SELECT u.id, COALESCE(tt.pts, 0), COALESCE(ct.cnt, 0)",
          "FROM users u LEFT JOIN task_totals tt ON tt.user_id = u.id",
          "LEFT JOIN comment_totals ct ON ct.user_id = u.id;",
        ],
        why(
          "Кожна CTE дає не більше одного рядка на користувача; з’єднання не перемножує задачі на коментарі.",
          "Each CTE yields at most one row per user, so the joins do not multiply tasks by comments.",
        ),
      ),
    ]),
  ],
);

export const sqlFundamentalsContent: CourseContent = {
  slug: "sql_fundamentals",
  titleUk: "SQL і Oracle Database",
  titleEn: "SQL & Oracle Database",
  descriptionUk:
    "Три розділи одного курсу: SQL і сучасний Oracle, PL/SQL, адміністрування. Запити, JSON, вектори, блоки, резервні копії. Нові можливості позначені версією. Приклади звірені з документацією Oracle Database 26, не з живим сервером.",
  descriptionEn:
    "Three sections of one course: SQL and modern Oracle, PL/SQL, and administration. Queries, JSON, vectors, blocks, and backups. Newer features are labeled with a version. Examples follow the Oracle Database 26 documentation and were not executed on a live server.",
  icon: "🗄️",
  color: "#336791",
  units: withBalancedExams([
    selectU,
    orderLimit,
    singleRowUnit,
    conversionUnit,
    aggregates,
    joins,
    subqueriesUnit,
    setOpsUnit,
    dml,
    modeling,
    schemaUnit,
    accessUnit,
    windowsU,
    queryRepairScenarios,
    datasetDiagnosisU,
    sqlCtePerformanceUnit,
    ...modernSqlUnits,
    ...modernSqlUnitsB,
    ...modernSqlUnitsC,
    capstone,
    ...plsqlUnitsA,
    ...plsqlUnitsB,
    ...plsqlUnitsC,
    ...dbaUnitsA,
    ...dbaUnitsB,
  ]),
};
