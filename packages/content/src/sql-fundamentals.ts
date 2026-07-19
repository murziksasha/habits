import type { CourseContent } from "./types.js";
import {
  codeFill,
  codeOrder,
  codeRead,
  exam,
  lesson,
  matchEx,
  mcq,
  unit,
} from "./builders.js";

const selectU = unit("select", "SELECT basics", "SELECT basics", [
  lesson(
    "sqlf-select",
    "SELECT / FROM",
    "SELECT / FROM",
    1,
    true,
    [
      codeFill("sqlf-s1", "select all", "select all", "sql", "SELECT ___ FROM users;", ["*", "id, name"], false),
      codeFill("sqlf-s2", "from clause", "from clause", "sql", "SELECT id ___ users;", ["FROM", "from"], false),
      mcq("sqlf-s3", "SELECT повертає:", "SELECT returns:", ["рядки (result set)", "лише schema", "git log", "CSS"], 0),
    ],
  ),
  lesson(
    "sqlf-where",
    "WHERE filters",
    "WHERE filters",
    1,
    true,
    [
      codeFill("sqlf-s4", "filter", "filter", "sql", "SELECT * FROM t ___ age > 18;", ["WHERE", "where"], false),
      mcq("sqlf-s5", "AND / OR:", "AND / OR:", ["логічні комбінації умов", "join types", "indexes only", "DDL only"], 0),
      codeRead("sqlf-s6", "NULL compare?", "NULL compare?", "sql", "WHERE x = NULL", ["use IS NULL", "always true", "syntax OK and matches nulls", "deletes rows"], 0),
    ],
  ),
  exam("sqlf-select-exam", "Контрольна: SELECT", "Exam: SELECT", 1, [
    codeFill("sqlf-se1", "FROM", "FROM", "sql", "SELECT id ___ users;", ["FROM", "from"], false),
    codeFill("sqlf-se2", "WHERE", "WHERE", "sql", "SELECT * FROM t ___ x = 1;", ["WHERE", "where"], false),
    mcq("sqlf-se3", "* means:", "* means:", ["all columns", "count only", "delete", "join"], 0),
    codeFill("sqlf-se4", "IS NULL", "IS NULL", "sql", "WHERE email ___ NULL;", ["IS", "is"], false),
  ]),
]);

const orderLimit = unit("order-limit", "ORDER BY / LIMIT", "ORDER BY / LIMIT", [
  lesson(
    "sqlf-order",
    "Sorting",
    "Sorting",
    2,
    false,
    [
      codeFill("sqlf-o1", "order by", "order by", "sql", "SELECT * FROM t ___ created_at DESC;", ["ORDER BY", "order by"], false),
      codeFill("sqlf-o2", "desc", "desc", "sql", "ORDER BY score ___;", ["DESC", "desc"], false),
      mcq("sqlf-o3", "ASC is:", "ASC is:", ["ascending", "aggregate", "outer join", "index hint"], 0),
    ],
  ),
  lesson(
    "sqlf-limit",
    "LIMIT / OFFSET",
    "LIMIT / OFFSET",
    2,
    false,
    [
      codeFill("sqlf-o4", "limit", "limit", "sql", "SELECT * FROM t LIMIT ___;", ["10", "1", "100"], false),
      mcq("sqlf-o5", "OFFSET used for:", "OFFSET used for:", ["pagination skip", "delete all", "create table", "grant"], 0),
      codeOrder(
        "sqlf-o6",
        "Typical page query order",
        "Typical page query order",
        "sql",
        ["LIMIT 20;", "SELECT * FROM posts", "ORDER BY id DESC", "OFFSET 40;"],
        ["SELECT * FROM posts", "ORDER BY id DESC", "LIMIT 20;", "OFFSET 40;"],
      ),
    ],
  ),
  exam("sqlf-order-exam", "Контрольна: order/limit", "Exam: order/limit", 2, [
    codeFill("sqlf-oe1", "ORDER BY", "ORDER BY", "sql", "SELECT * FROM t ___ name;", ["ORDER BY", "order by"], false),
    codeFill("sqlf-oe2", "DESC", "DESC", "sql", "ORDER BY n ___;", ["DESC", "desc"], false),
    codeFill("sqlf-oe3", "LIMIT", "LIMIT", "sql", "SELECT * FROM t ___ 5;", ["LIMIT", "limit"], false),
    mcq("sqlf-oe4", "OFFSET:", "OFFSET:", ["skip rows", "sort only", "group only", "DDL"], 0),
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
      codeFill(
        "sqlf-j1",
        "inner join",
        "inner join",
        "sql",
        "SELECT * FROM a ___ JOIN b ON a.id = b.a_id;",
        ["INNER", "inner"],
        false,
      ),
      mcq(
        "sqlf-j2",
        "INNER JOIN returns:",
        "INNER JOIN returns:",
        ["matching rows from both tables", "all left always", "cartesian only", "schema only"],
        0,
      ),
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
      mcq(
        "sqlf-j4",
        "LEFT JOIN keeps:",
        "LEFT JOIN keeps:",
        ["all left rows (+ nulls if no match)", "only matches", "only right", "no nulls ever"],
        0,
      ),
      codeFill(
        "sqlf-j5",
        "left join",
        "left join",
        "sql",
        "FROM users u ___ JOIN orders o ON u.id = o.user_id",
        ["LEFT", "left"],
        false,
      ),
      matchEx(
        "sqlf-j6",
        "Join types",
        "Join types",
        [
          { left: "INNER", right: "intersection of keys" },
          { left: "LEFT", right: "all left + matches" },
          { left: "CROSS", right: "cartesian product" },
        ],
      ),
    ],
  ),
  exam("sqlf-join-exam", "Контрольна: JOINs", "Exam: JOINs", 2, [
    codeFill("sqlf-je1", "JOIN", "JOIN", "sql", "a ___ JOIN b ON …", ["INNER", "LEFT", "inner", "left"], false),
    codeFill("sqlf-je2", "ON", "ON", "sql", "JOIN b ___ a.id = b.a_id", ["ON", "on"], false),
    mcq("sqlf-je3", "LEFT JOIN:", "LEFT JOIN:", ["keeps left rows", "drops left always", "DDL", "index only"], 0),
    mcq("sqlf-je4", "INNER:", "INNER:", ["matches only", "all left", "all right only", "no keys"], 0),
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
      codeFill("sqlf-a1", "count rows", "count rows", "sql", "SELECT ___(*) FROM t;", ["COUNT", "count"], false),
      codeFill("sqlf-a2", "sum", "sum", "sql", "SELECT ___(amount) FROM payments;", ["SUM", "sum"], false),
      mcq("sqlf-a3", "AVG ignores:", "AVG typically ignores:", ["NULL values", "all numbers", "table name", "aliases"], 0),
    ],
  ),
  lesson(
    "sqlf-group",
    "GROUP BY / HAVING",
    "GROUP BY / HAVING",
    3,
    false,
    [
      codeFill(
        "sqlf-a4",
        "group by",
        "group by",
        "sql",
        "SELECT user_id, COUNT(*) FROM orders ___ user_id;",
        ["GROUP BY", "group by"],
        false,
      ),
      mcq(
        "sqlf-a5",
        "HAVING filters:",
        "HAVING filters:",
        ["groups after aggregation", "rows before group only", "indexes", "schemas"],
        0,
      ),
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
  exam("sqlf-agg-exam", "Контрольна: aggregates", "Exam: aggregates", 2, [
    codeFill("sqlf-ae1", "COUNT", "COUNT", "sql", "SELECT ___(*) FROM t;", ["COUNT", "count"], false),
    codeFill("sqlf-ae2", "GROUP BY", "GROUP BY", "sql", "SELECT a, COUNT(*) FROM t ___ a;", ["GROUP BY", "group by"], false),
    codeFill("sqlf-ae3", "HAVING", "HAVING", "sql", "… ___ COUNT(*) > 1;", ["HAVING", "having"], false),
    mcq("sqlf-ae4", "SUM:", "SUM:", ["adds numbers", "sorts", "joins", "creates table"], 0),
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
      codeFill(
        "sqlf-d1",
        "insert into",
        "insert into",
        "sql",
        "___ INTO users (email) VALUES ('a@b.c');",
        ["INSERT", "insert"],
        false,
      ),
      mcq("sqlf-d2", "VALUES provides:", "VALUES provides:", ["row data", "indexes", "grants", "joins"], 0),
    ],
  ),
  lesson(
    "sqlf-update-delete",
    "UPDATE / DELETE",
    "UPDATE / DELETE",
    2,
    false,
    [
      codeFill(
        "sqlf-d3",
        "update set",
        "update set",
        "sql",
        "UPDATE users ___ plan = 'premium' WHERE id = 1;",
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
      mcq(
        "sqlf-d5",
        "DELETE without WHERE:",
        "DELETE without WHERE:",
        ["deletes all rows (dangerous)", "no-op", "drops table", "creates backup"],
        0,
      ),
    ],
  ),
  exam("sqlf-dml-exam", "Контрольна: DML", "Exam: DML", 2, [
    codeFill("sqlf-de1", "INSERT", "INSERT", "sql", "___ INTO t (a) VALUES (1);", ["INSERT", "insert"], false),
    codeFill("sqlf-de2", "SET", "SET", "sql", "UPDATE t ___ a = 2;", ["SET", "set"], false),
    codeFill("sqlf-de3", "DELETE", "DELETE", "sql", "___ FROM t WHERE id = 1;", ["DELETE", "delete"], false),
    mcq("sqlf-de4", "Always use WHERE with:", "Always use WHERE with:", ["UPDATE/DELETE carefully", "SELECT * only", "CREATE", "DROP never"], 0),
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
      mcq(
        "sqlf-m1",
        "PRIMARY KEY:",
        "PRIMARY KEY:",
        ["унікально ідентифікує рядок", "optional always duplicate", "only text", "CSS id"],
        0,
      ),
      mcq(
        "sqlf-m2",
        "FOREIGN KEY:",
        "FOREIGN KEY:",
        ["посилання на рядок іншої таблиці", "sort order", "index type only", "transaction isolation"],
        0,
      ),
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
      mcq(
        "sqlf-m4",
        "Index helps:",
        "Index helps:",
        ["швидший lookup/filter/join", "always slower writes never tradeoff", "replace WHERE", "store images"],
        0,
      ),
      codeFill(
        "sqlf-m5",
        "create index",
        "create index",
        "sql",
        "CREATE ___ idx_users_email ON users(email);",
        ["INDEX", "index"],
        false,
      ),
      mcq(
        "sqlf-m6",
        "Too many indexes:",
        "Too many indexes:",
        ["slower writes / storage cost", "free performance always", "no downside", "deletes data"],
        0,
      ),
    ],
  ),
  exam("sqlf-model-exam", "Контрольна: modeling", "Exam: modeling", 2, [
    mcq("sqlf-me1", "PK:", "PK:", ["unique row id", "optional dupes", "join type", "limit"], 0),
    mcq("sqlf-me2", "FK:", "FK:", ["reference other table", "sort", "CSS", "HTTP"], 0),
    codeFill("sqlf-me3", "INDEX", "INDEX", "sql", "CREATE ___ ON t(c);", ["INDEX", "index"], false),
    mcq("sqlf-me4", "NOT NULL:", "NOT NULL:", ["required column", "optional", "join", "aggregate"], 0),
  ]),
]);

const capstone = unit("capstone", "Capstone", "Capstone", [
  lesson(
    "sqlf-capstone-query",
    "Scenario: users + orders",
    "Scenario: users + orders",
    3,
    false,
    [
      mcq(
        "sqlf-c1",
        "Список імен + total orders:",
        "Names + order totals:",
        ["JOIN + GROUP BY SUM", "only DELETE", "only DROP", "only LIMIT without FROM"],
        0,
      ),
      codeFill(
        "sqlf-c2",
        "join orders",
        "join orders",
        "sql",
        "FROM users u JOIN orders o ___ u.id = o.user_id",
        ["ON", "on"],
        false,
      ),
      codeFill(
        "sqlf-c3",
        "group",
        "group",
        "sql",
        "SELECT u.id, SUM(o.total) FROM … ___ u.id;",
        ["GROUP BY", "group by"],
        false,
      ),
      codeRead(
        "sqlf-c4",
        "Users without orders:",
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
    mcq("sqlf-ce6", "LEFT JOIN keeps:", "LEFT JOIN keeps:", ["left rows", "only matches", "no left", "DDL"], 0),
  ]),
]);

export const sqlFundamentalsContent: CourseContent = {
  slug: "sql_fundamentals",
  titleUk: "SQL: fundamentals",
  titleEn: "SQL Fundamentals",
  descriptionUk:
    "SELECT, WHERE, ORDER/LIMIT, JOINs, aggregates, DML, keys/indexes + контрольні.",
  descriptionEn:
    "SELECT, WHERE, ORDER/LIMIT, JOINs, aggregates, DML, keys/indexes + unit exams.",
  icon: "🗄️",
  color: "#336791",
  units: [selectU, orderLimit, joins, aggregates, dml, modeling, capstone],
};
