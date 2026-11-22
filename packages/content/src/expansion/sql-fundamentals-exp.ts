import type { CourseContent, LessonContent, UnitContent } from "../types.js";
import { expandCourse, sectionUnit, teachLesson } from "./factory.js";

export const newUnits: UnitContent[] = [
  sectionUnit(
    "hierarchical_queries",
    "Ієрархії: CONNECT BY і рекурсивний WITH",
    "Hierarchies: CONNECT BY and recursive WITH",
    [
      {
        slug: "sqlf-connect-by",
        titleUk: "CONNECT BY і PRIOR: дерево в Oracle",
        titleEn: "CONNECT BY and PRIOR: a tree in Oracle",
        difficulty: 3,
        pointsUk: ["START WITH — корені, PRIOR — сторона ребра", "NOCYCLE проти зациклення", "WHERE фільтрує вже побудоване дерево"],
        pointsEn: ["START WITH is the roots, PRIOR is the edge side", "NOCYCLE against looping", "WHERE filters the tree after it is built"],
        conceptUk: "START WITH задає корені, CONNECT BY PRIOR id = parent_id (або навпаки) крокує ребрами дерева. PRIOR позначає рядок-батько поточного кроку: помилка в боці PRIOR дає інверсію дерева або цикл. LEVEL — глибина, SYS_CONNECT_BY_PATH збирає шлях, CONNECT_BY_ROOT — значення кореня. CYCLE виявляють через NOCYCLE, без NOCYCLE виявлений цикл спричиняє ORA-01436. Один стовпець parent_id у записі може зберігати лише одного батька; для кількох зв’язків потрібна відповідна модель ребер. CONNECT BY теж може обходити належно змодельовані зв’язки. Фільтр у WHERE застосовується після побудови дерева, на відміну від AND у CONNECT BY.",
        conceptEn: "START WITH sets the roots, CONNECT BY PRIOR id = parent_id (or the other way around) walks the tree edges. PRIOR marks the parent row of the current step: an error on the PRIOR side inverts the tree or cycles. LEVEL is the depth, SYS_CONNECT_BY_PATH builds the path, CONNECT_BY_ROOT is the root's value. Cycles are caught with NOCYCLE, without NOCYCLE a detected loop raises ORA-01436. A single parent_id column on a node holds only one parent; multiple relationships need a suitable edge model. CONNECT BY can also traverse appropriately modeled relationships. A filter in WHERE applies after the tree is built, unlike AND in CONNECT BY.",
        code: "SELECT empno, LEVEL, SYS_CONNECT_BY_PATH(ename, '/') path\nFROM emp\nSTART WITH mgr IS NULL\nCONNECT BY NOCYCLE PRIOR empno = mgr;",
        language: "sql",
        retrieval: [
          { kind: "mcq", promptUk: "Що станеться, якщо переплутати бік PRIOR у CONNECT BY?", promptEn: "What happens if you swap the PRIOR side in CONNECT BY?", options: ["дерево піде в інший бік або зациклиться", "Oracle виправить сам", "LEVEL стане завжди 1", "START WITH ігнорується"], optionsEn: ["The traversal may reverse or encounter a cycle", "Oracle fixes it automatically", "LEVEL is always 1", "START WITH is ignored"], correctIndex: 0, explanationUk: "PRIOR каже, який рядок уже відвіданий.", explanationEn: "PRIOR says which row was already visited." },
          { kind: "fill", promptUk: "Допишіть захист від циклів", promptEn: "Fill in cycle protection", language: "sql", code: "CONNECT BY ___ PRIOR id = parent_id", accepted: ["NOCYCLE"], caseSensitive: true, explanationUk: "NOCYCLE зупиняє повтор вершини.", explanationEn: "NOCYCLE stops a repeated vertex." },
          { kind: "read", promptUk: "Коли спрацює фільтр dept = 10 у WHERE проти умови в CONNECT BY?", promptEn: "When does a dept = 10 filter in WHERE fire, versus a condition in CONNECT BY?", language: "sql", code: "SELECT empno, deptno FROM emp WHERE deptno = 10 START WITH mgr IS NULL CONNECT BY PRIOR empno = mgr", options: ["спочатку будується все дерево, потім відкидаються рядки deptno ≠ 10, можливі «дірки»", "WHERE обрізає ребра під час обходу так само, як CONNECT BY", "WHERE заборонений з CONNECT BY", "фільтр застосовується лише до кореня"], optionsEn: ["The hierarchy is built first, then rows outside deptno 10 are filtered, possibly leaving gaps", "WHERE prunes edges during traversal just like CONNECT BY", "WHERE is forbidden with CONNECT BY", "The filter applies only to roots"], correctIndex: 0, explanationUk: "Обрізати гілку рано треба в CONNECT BY.", explanationEn: "To prune a branch early, put the predicate in CONNECT BY." }
        ],
        whyUk: "Чим умова в CONNECT BY відрізняється від WHERE в ієрархічному запиті?",
        whyEn: "How does a condition in CONNECT BY differ from WHERE in a hierarchical query?",
        ideas: [{ labelUk: "обхід ребер", labelEn: "walking edges", anyOf: ["connect by", "prior", "ребер", "edge", "обхід"] }, { labelUk: "WHERE після дерева", labelEn: "WHERE after the tree", anyOf: ["where", "після", "after", "дірк", "hole"] }, { labelUk: "NOCYCLE", labelEn: "NOCYCLE", anyOf: ["nocycle", "цикл", "cycle", "level"] }],
        sampleUk: "CONNECT BY з PRIOR задає ребра під час обходу і може рано відсікти гілку, а WHERE фільтрує вже побудоване дерево й лишає дірки; NOCYCLE захищає від циклів.",
        sampleEn: "CONNECT BY with PRIOR sets edges during the walk and can prune a branch early, while WHERE filters the already-built tree and leaves holes; NOCYCLE protects against cycles.",
      },
      {
        slug: "sqlf-recursive-with",
        titleUk: "Рекурсивний WITH (факторизація) для ієрархій",
        titleEn: "Recursive WITH (factoring) for hierarchies",
        difficulty: 3,
        pointsUk: ["Якір UNION ALL рекурсія з посиланням на CTE", "CYCLE SET і лічильник глибини проти нескінченності", "Переноситься краще, ніж CONNECT BY"],
        pointsEn: ["An anchor UNION ALL recursion that references the CTE", "CYCLE SET and a depth counter against infinity", "It ports better than CONNECT BY"],
        conceptUk: "Рекурсивний WITH в Oracle має якірний запит і рекурсивний член, об'єднані UNION ALL; назви колонок задають у списку CTE, а типи членів мають бути сумісними. SEARCH DEPTH FIRST або BREADTH FIRST створює колонку порядку: щоб отримати рядки саме в цьому порядку, використайте ORDER BY цієї колонки у зовнішньому SELECT. CYCLE позначає циклічний рядок і зупиняє рекурсію вздовж цього шляху. Межа depth обмежує глибину, але може відкинути допустимі глибші вузли і не обмежує кількість шляхів у широкому графі. Концепція рекурсивного CTE переноситься, але синтаксис відрізняється: наприклад, PostgreSQL використовує WITH RECURSIVE. Перевіряйте діалект і реальні ресурси запиту.",
        conceptEn: "Oracle recursive WITH has an anchor query and a recursive member joined with UNION ALL; provide the CTE column names and compatible member types. SEARCH DEPTH FIRST or BREADTH FIRST creates an ordering column: use ORDER BY that column in the outer SELECT to request that output order. CYCLE marks a cyclic row and stops recursion along that path. A depth limit bounds depth but can omit valid deeper nodes and does not bound the number of paths in a wide graph. The recursive CTE concept is portable, but syntax differs: for example PostgreSQL uses WITH RECURSIVE. Check the dialect and the query's actual resource use.",
        code: "WITH cte (id, parent_id, depth) AS (\n  SELECT id, parent_id, 1 FROM org WHERE parent_id IS NULL\n  UNION ALL\n  SELECT o.id, o.parent_id, c.depth+1 FROM org o JOIN cte c ON o.parent_id = c.id WHERE c.depth < 20\n) SEARCH DEPTH FIRST BY id SET seq\nCYCLE id SET is_cycle TO 'Y' DEFAULT 'N'\nSELECT * FROM cte ORDER BY seq;",
        language: "sql",
        retrieval: [
          { kind: "mcq", promptUk: "Яка роль якірного члена в рекурсивному WITH?", promptEn: "What is the role of the anchor member in a recursive WITH?", options: ["дати стартовий набір рядків, з якого росте рекурсія", "завжди рахувати агрегати", "замінити UNION ALL", "вимкнути CYCLE"], optionsEn: ["Provide the starting rows for recursion", "Always compute aggregates", "Replace UNION ALL", "Disable CYCLE"], correctIndex: 0, explanationUk: "Без якоря рекурсії немає з чого почати.", explanationEn: "Without an anchor the recursion has nothing to start from." },
          { kind: "fill", promptUk: "Допишіть з'єднання якоря з рекурсією", promptEn: "Fill in joining the anchor to the recursion", language: "sql", code: "anchor ___ ALL recursive_part", accepted: ["UNION"], caseSensitive: true, explanationUk: "Потрібен UNION ALL, не UNION (без дублів і сортування).", explanationEn: "You need UNION ALL, not UNION (no dedup or sort)." },
          { kind: "mcq", promptUk: "Навіщо можна додати depth < 20 у рекурсивний член?", promptEn: "Why might you add depth < 20 in the recursive member?", options: ["щоб обмежити глибину, розуміючи, що допустимі глибші вузли будуть пропущені", "Oracle ігнорує глибину", "20 — максимум рядків у WITH", "CYCLE тоді не потрібен ніколи"], optionsEn: ["To bound depth, understanding that valid deeper nodes will be omitted", "Oracle ignores depth", "20 is the maximum row count in WITH", "CYCLE is never needed"], correctIndex: 0, explanationUk: "Це обмеження глибини, а не гарантія обмеженого часу чи кількості рядків.", explanationEn: "This bounds depth, not necessarily execution time or row count." },
          { kind: "mcq", promptUk: "Як вивести результат Oracle SEARCH DEPTH FIRST у заданому ним порядку?", promptEn: "How do you return Oracle SEARCH DEPTH FIRST results in its generated order?", options: ["додати ORDER BY колонки, заданої через SET", "покластися на випадковий порядок SELECT без ORDER BY", "видалити якір", "замінити CYCLE на WHERE"], optionsEn: ["Add ORDER BY on the column named by SET", "Rely on an unordered SELECT", "Remove the anchor", "Replace CYCLE with WHERE"], correctIndex: 0, explanationUk: "SEARCH створює колонку порядку; зовнішній ORDER BY задає порядок результату.", explanationEn: "SEARCH creates an ordering column; the outer ORDER BY specifies result order." }
        ],
        whyUk: "Коли рекурсивний WITH зручніший за CONNECT BY?",
        whyEn: "When is recursive WITH more convenient than CONNECT BY?",
        ideas: [{ labelUk: "стандартний SQL", labelEn: "standard SQL", anyOf: ["стандарт", "standard", "postgres", "перенос", "port"] }, { labelUk: "якір і UNION ALL", labelEn: "anchor and UNION ALL", anyOf: ["якір", "anchor", "union", "cte"] }, { labelUk: "CYCLE і глибина", labelEn: "CYCLE and depth", anyOf: ["cycle", "глибин", "depth", "temp"] }],
        sampleUk: "Рекурсивний CTE з якорем і UNION ALL використовує стандартну концепцію, зручну для графів, хоча синтаксис діалектів різний. CYCLE і ліміт глибини контролюють обхід, але витрати TEMP і можливе обрізання результатів треба перевіряти.",
        sampleEn: "A recursive CTE with an anchor and UNION ALL is useful for graphs and for porting the idea between dialects, though syntax differs. CYCLE and a depth limit control traversal, but TEMP usage and possible truncation still need checking.",
      },
      {
        slug: "sqlf-hier-cycles",
        titleUk: "Цикли, кілька батьків і матеріальний шлях",
        titleEn: "Cycles, multiple parents, and a materialized path",
        difficulty: 3,
        pointsUk: ["Кілька батьків — уже не чисте дерево", "Closure table або path спрощують читання, ускладнюють запис", "Цикл — дефект даних, його показують"],
        pointsEn: ["Several parents is no longer a pure tree", "A closure table or a path simplifies reads and complicates writes", "A cycle is a data defect, and you show it"],
        conceptUk: "У дереві кожен некореневий вузол має одного батька; матрична структура потребує моделі з кількома ребрами. CONNECT BY може обходити таку модель, але не створює відсутні зв’язки з одного parent_id. Тоді або рекурсія з відвіданими вершинами, або модель closure table (усі пари предок-нащадок), або materialized path ('/1/4/9/'), який спрощує WHERE path LIKE '/1/4/%' ціною обережних оновлень. Цикл у дереві — дефект даних: його треба показувати в звіті якості, не ховати. Для великих ієрархій тримають індекс на parent_id і обмежують глибину у вітрині.",
        conceptEn: "In a tree each non-root node has one parent; a matrix structure needs a model with multiple edges. CONNECT BY can traverse that model, but cannot invent missing relationships from a single parent_id. Then you either recurse with visited nodes, or a closure table (every ancestor-descendant pair), or a materialized path ('/1/4/9/') that simplifies WHERE path LIKE '/1/4/%' at the cost of careful updates. A cycle in a tree is a data defect: show it in a quality report, do not hide it. For large hierarchies, keep an index on parent_id and cap depth in the mart.",
        code: "-- closure: ancestor_id, descendant_id, depth  (indexed)\nSELECT d.* FROM org_closure c JOIN org d ON d.id = c.descendant_id WHERE c.ancestor_id = :id;",
        language: "sql",
        retrieval: [
          { kind: "mcq", promptUk: "Чому один parent_id на працівника не описує всі зв’язки в матричній оргструктурі?", promptEn: "Why can one parent_id per employee not describe every relationship in a matrix organization?", options: ["одна колонка зберігає одного батька, а для кількох потрібні окремі ребра", "Oracle забороняє кілька коренів", "LEVEL тоді від'ємний", "матриця не має id"], optionsEn: ["One column stores one parent; multiple parents require separate edges", "Oracle forbids multiple roots", "LEVEL becomes negative", "The matrix has no id"], correctIndex: 0, explanationUk: "Потрібно явно зберегти всі ребра, наприклад в окремій таблиці зв’язків.", explanationEn: "Store all edges explicitly, for example in a separate relationship table." },
          { kind: "fill", promptUk: "Допишіть типовий предикат матеріального шляху нащадків", promptEn: "Fill in a typical materialized-path predicate for descendants", language: "sql", code: "WHERE path ___ '/1/4/%'", accepted: ["LIKE", "like"], caseSensitive: true, explanationUk: "LIKE з префіксом шляху.", explanationEn: "LIKE with a path prefix." },
          { kind: "mcq", promptUk: "Що робити, якщо якісний запит знайшов цикл employee A → B → A?", promptEn: "What should you do if a quality query finds a cycle employee A → B → A?", options: ["зафіксувати як дефект даних і не будувати на ньому молчаливу ієрархію", "ігнорувати, NOCYCLE «вирішує бізнес»", "видалити всіх співробітників", "збільшити LEVEL"], optionsEn: ["Record it as a data defect and do not silently treat it as a hierarchy", "Ignore it because NOCYCLE solves the business issue", "Delete every employee", "Increase LEVEL"], correctIndex: 0, explanationUk: "Цикл — помилка введення або інтеграції.", explanationEn: "The cycle is an entry or integration error." }
        ],
        whyUk: "Коли обрати closure table замість CONNECT BY на кожен запит?",
        whyEn: "When should you pick a closure table instead of CONNECT BY on every query?",
        ideas: [{ labelUk: "часті запити нащадків", labelEn: "frequent descendant queries", anyOf: ["closure", "нащадк", "descendant", "шлях", "path"] }, { labelUk: "не чисте дерево", labelEn: "not a pure tree", anyOf: ["батьк", "parent", "граф", "graph", "матриц", "matrix"] }, { labelUk: "цикл як дефект", labelEn: "a cycle as a defect", anyOf: ["цикл", "cycle", "дефект", "defect", "якість", "quality"] }],
        sampleUk: "Closure table або матеріальний шлях вигідні, коли нащадків питають часто або структура не є чистим деревом; цикли фіксують як дефект даних, а не ховають.",
        sampleEn: "A closure table or a materialized path pays off when descendants are queried often or the structure is not a pure tree; cycles are recorded as data defects, not hidden.",
      }
    ],
    "Контрольна: ієрархії",
    "Exam: hierarchies",
    [
      { promptUk: "PRIOR у CONNECT BY позначає…", promptEn: "PRIOR in CONNECT BY marks…", options: ["рядок попереднього кроку на ребрі", "завжди корінь", "агрегат LEVEL", "лише WHERE"], optionsEn: ["The row from the previous step of the edge", "Always the root", "The LEVEL aggregate", "Only WHERE"], correctIndex: 0, explanationUk: "Бік ребра.", explanationEn: "The edge side." },
      { promptUk: "WHERE в ієрархічному запиті…", promptEn: "WHERE in a hierarchical query…", options: ["фільтрує вже побудоване дерево", "завжди обрізає ребра як CONNECT BY", "заборонений", "замінює START WITH"], optionsEn: ["Filters the already-built hierarchy", "Always prunes edges like CONNECT BY", "Is forbidden", "Replaces START WITH"], correctIndex: 0, explanationUk: "Можливі дірки в дереві.", explanationEn: "Holes in the tree are possible." },
      { promptUk: "Рекурсивний WITH з'єднує якір через…", promptEn: "Recursive WITH joins the anchor via…", options: ["UNION ALL", "INNER JOIN без рекурсії", "MINUS", "CROSS JOIN обов'язково"], optionsEn: ["UNION ALL", "INNER JOIN without recursion", "MINUS", "CROSS JOIN is mandatory"], correctIndex: 0, explanationUk: "Стандартна рекурсія.", explanationEn: "Standard recursion." },
      { promptUk: "Цикл у дереві співробітників…", promptEn: "A cycle in an employee tree is…", options: ["дефект даних, який треба показати", "нормальна матриця", "вирішується збільшенням LEVEL", "неможливий у SQL"], optionsEn: ["A data defect that should be reported", "A normal matrix", "Fixed by increasing LEVEL", "Impossible in SQL"], correctIndex: 0, explanationUk: "Не ховати в NOCYCLE як «бізнес-рішення».", explanationEn: "Do not hide it in NOCYCLE as a 'business fix'." }
    ],
  ),
  sectionUnit(
    "materialized_views",
    "Матеріалізовані представлення й перепис запитів",
    "Materialized views and query rewrite",
    [
      {
        slug: "sqlf-mv-refresh",
        titleUk: "Режими оновлення: COMPLETE, FAST, ON COMMIT",
        titleEn: "Refresh modes: COMPLETE, FAST, ON COMMIT",
        difficulty: 3,
        pointsUk: ["FAST потребує MV log і обмежень на запит", "ON COMMIT робить свіжим, але дорожчає фіксацію", "FORCE може перейти з FAST на COMPLETE"],
        pointsEn: ["FAST needs an MV log and query constraints", "ON COMMIT stays fresh but makes commits heavier", "FORCE can fall back from FAST to COMPLETE"],
        conceptUk: "Матеріалізоване представлення зберігає результат запиту на диску. COMPLETE перераховує все; FAST застосовує інкремент з MV log (журнал на базових таблицях) — потрібні обмеження на запит (агрегати, з'єднання за первинним ключем). ON COMMIT оновлює в тій самій транзакції, що й дані: свіжість висока, але COMMIT стає дорожчим. ON DEMAND — за розкладом або вручну. Для FORCE Oracle обирає FAST, якщо можливо, інакше COMPLETE. Явний FAST не означає автоматичний перехід на COMPLETE: невідповідний запит або відсутній журнал можуть спричинити помилку. Після зміни структури базової таблиці журнал і MV часто треба пересоздати.",
        conceptEn: "A materialized view stores a query result on disk. COMPLETE recomputes everything; FAST applies an increment from an MV log (a log on the base tables) — the query must meet constraints (aggregates, joins on a primary key). ON COMMIT refreshes in the same transaction as the data: freshness is high, but COMMIT becomes more expensive. ON DEMAND is scheduled or manual. With FORCE Oracle uses FAST if possible, otherwise COMPLETE. Explicit FAST does not imply automatic fallback to COMPLETE: an ineligible query or missing log can cause an error. After a base-table structure change, the log and the MV often must be rebuilt.",
        code: "-- Illustrative shape; validate FAST eligibility and required MV logs first\nCREATE MATERIALIZED VIEW mv_sales_day\nREFRESH FORCE ON DEMAND AS\nSELECT TRUNC(sold_at) AS sales_day, SUM(amt) AS total\nFROM sales GROUP BY TRUNC(sold_at);",
        language: "sql",
        retrieval: [
          { kind: "mcq", promptUk: "Чому ON COMMIT може подовжити час COMMIT у OLTP?", promptEn: "Why can ON COMMIT lengthen COMMIT time in OLTP?", options: ["оновлення MV виконується в тій самій транзакції, що й запис", "COMMIT тоді заборонений", "FAST вимикає журнал redo", "ON COMMIT працює лише вночі"], optionsEn: ["MV refresh runs as part of the committing transaction", "COMMIT is forbidden", "FAST disables redo", "ON COMMIT runs only at night"], correctIndex: 0, explanationUk: "Свіжість має ціну на шляху запису.", explanationEn: "Freshness has a cost on the write path." },
          { kind: "fill", promptUk: "Допишіть інкрементне оновлення", promptEn: "Fill in incremental refresh", language: "sql", code: "REFRESH ___ ON DEMAND", accepted: ["FAST"], caseSensitive: true, explanationUk: "FAST читає MV log.", explanationEn: "FAST reads the MV log." },
          { kind: "mcq", promptUk: "Що потрібно на базовій таблиці для FAST refresh агрегату?", promptEn: "What does a FAST refresh of an aggregate need on the base table?", options: ["матеріалізований журнал (MV log) і допустима форма запиту", "лише унікальний індекс на MV", "вимкнений redo", "тільки ON COMMIT"], optionsEn: ["A materialized view log and an eligible query shape", "Only a unique index on the MV", "Redo disabled", "Only ON COMMIT"], correctIndex: 0, explanationUk: "Без журналу інкремента немає.", explanationEn: "Without a log there is no increment." }
        ],
        whyUk: "Коли обрати ON DEMAND FAST, а не ON COMMIT?",
        whyEn: "When should you pick ON DEMAND FAST rather than ON COMMIT?",
        ideas: [{ labelUk: "не дорожчати COMMIT", labelEn: "do not make COMMIT heavier", anyOf: ["commit", "oltp", "подовж", "lengthen"] }, { labelUk: "журнал і FAST", labelEn: "a log and FAST", anyOf: ["mv log", "fast", "complete", "журнал"] }, { labelUk: "розклад", labelEn: "a schedule", anyOf: ["demand", "розклад", "schedul", "свіжість", "fresh"] }],
        sampleUk: "ON DEMAND FAST оновлює за розкладом через журнал і не подовжує кожен COMMIT, на відміну від ON COMMIT; за режиму FORCE перевіряйте, чи не відбулося повне COMPLETE.",
        sampleEn: "ON DEMAND FAST refreshes on a schedule through the log and does not lengthen every COMMIT, unlike ON COMMIT; with FORCE, check whether it fell back to a full COMPLETE.",
      },
      {
        slug: "sqlf-query-rewrite",
        titleUk: "QUERY REWRITE: оптимізатор підміняє запит на MV",
        titleEn: "QUERY REWRITE: the optimizer substitutes an MV",
        difficulty: 3,
        pointsUk: ["Rewrite прозорий для тексту SQL", "Цілісність і свіжість керують, чи можна брати MV", "Підтверджуйте підміну в плані"],
        pointsEn: ["Rewrite is transparent to the SQL text", "Integrity and freshness control whether the MV may be used", "Confirm the substitution in the plan"],
        conceptUk: "Якщо увімкнено QUERY REWRITE і MV помічена ENABLE QUERY REWRITE, оптимізатор може замінити дорогий агрегат по базових таблицях читанням MV — за умови, що результат логічно еквівалентний (сумісність обмежень і свіжість, QUERY_REWRITE_INTEGRITY). Це прозоро для додатка: SQL не змінюють. Погано налагоджений rewrite може взяти застарілу MV (якщо дозволено STALE_TOLERATED) або не взяти свіжу, бо запит «не схожий». Перевіряйте план: має з'явитись MAT_VIEW REWRITE. Права й параметр query_rewrite_enabled теж впливають.",
        conceptEn: "When QUERY REWRITE is on and the MV is marked ENABLE QUERY REWRITE, the optimizer may replace an expensive aggregate on the base tables with a read of the MV — if the result is logically equivalent (constraint compatibility and freshness, QUERY_REWRITE_INTEGRITY). This is transparent to the application: the SQL does not change. A poorly tuned rewrite may pick a stale MV (if STALE_TOLERATED is allowed) or skip a fresh one because the query 'does not look alike'. Check the plan: MAT_VIEW REWRITE should appear. Privileges and query_rewrite_enabled also matter.",
        code: "ALTER SESSION SET QUERY_REWRITE_ENABLED = TRUE;\n-- EXPLAIN PLAN should show MAT_VIEW REWRITE ACCESS",
        language: "sql",
        retrieval: [
          { kind: "mcq", promptUk: "Як зрозуміти, що оптимізатор справді взяв MV, а не базові таблиці?", promptEn: "How do you tell that the optimizer really used the MV, not the base tables?", options: ["у плані є операція rewrite матеріалізованого представлення", "якщо MV існує, вона завжди береться", "за часом менше 1 мс завжди", "за назвою колонки"], optionsEn: ["The execution plan shows a materialized view rewrite operation", "The MV is always used if it exists", "Execution always takes less than 1 ms", "The column name tells you"], correctIndex: 0, explanationUk: "Дивіться план, не здогадуйтесь.", explanationEn: "Look at the plan, do not guess." },
          { kind: "fill", promptUk: "Допишіть дозвіл перепису на MV", promptEn: "Fill in enabling rewrite on the MV", language: "sql", code: "ENABLE QUERY ___", accepted: ["REWRITE"], caseSensitive: true, explanationUk: "Режим — ENABLE QUERY REWRITE.", explanationEn: "The mode is ENABLE QUERY REWRITE." },
          { kind: "mcq", promptUk: "Чим ризикований QUERY_REWRITE_INTEGRITY = STALE_TOLERATED в обліку грошей?", promptEn: "What is the risk of QUERY_REWRITE_INTEGRITY = STALE_TOLERATED in money accounting?", options: ["застосунок може прочитати застарілі агрегати, ніби вони свіжі", "STALE завжди забороняє читання", "rewrite тоді вимикає MV", "гроші не можна агрегувати"], optionsEn: ["The application can read stale aggregates as if fresh", "STALE always prevents reading", "Rewrite disables the MV", "Money cannot be aggregated"], correctIndex: 0, explanationUk: "Для фінансів зазвичай вимагають свіжість ENFORCED.", explanationEn: "For finance you usually require ENFORCED freshness." }
        ],
        whyUk: "Як безпечно увімкнути прозорий перепис агрегатів на MV?",
        whyEn: "How do you safely enable transparent rewrite of aggregates onto an MV?",
        ideas: [{ labelUk: "план із REWRITE", labelEn: "a plan with REWRITE", anyOf: ["план", "plan", "rewrite", "mat_view"] }, { labelUk: "цілісність свіжості", labelEn: "freshness integrity", anyOf: ["integrity", "stale", "enforced", "свіжість"] }, { labelUk: "ENABLE QUERY REWRITE", labelEn: "ENABLE QUERY REWRITE", anyOf: ["enable", "query", "rewrite"] }],
        sampleUk: "MV позначають ENABLE QUERY REWRITE, цілісність свіжості ставлять свідомо (для грошей не STALE_TOLERATED) і перевіряють план, що підміна справді сталась.",
        sampleEn: "You mark the MV ENABLE QUERY REWRITE, you set freshness integrity deliberately (not STALE_TOLERATED for money), and you check the plan that the substitution actually happened.",
      },
      {
        slug: "sqlf-mv-stale",
        titleUk: "Свіжість, залежності й ланцюжки MV",
        titleEn: "Freshness, dependencies, and MV chains",
        difficulty: 3,
        pointsUk: ["Дивіться STALE/UNUSABLE у словнику", "Ланцюжки оновлюють у правильному порядку", "Показуйте свіжість користувачу або не віддавайте застаріле"],
        pointsEn: ["Look at STALE/UNUSABLE in the dictionary", "Chains refresh in the right order", "Show freshness to the user or do not serve stale data"],
        conceptUk: "USER_MVIEWS надає, зокрема, STALENESS, COMPILE_STATE, час останнього оновлення та FAST_REFRESHABLE. Для залежних MV плануйте оновлення з урахуванням залежностей: спочатку джерело, потім представлення, яке його читає; можливості nested refresh перевіряйте для конкретної конфігурації. Після DDL перевірте стан і придатність FAST — потрібна дія залежить від зміни та визначення MV. Час завершення refresh сам по собі не доводить, до якого моменту джерело містить дані: для затриманого імпорту потрібен окремий watermark. Визначте допустиму затримку, показуйте її користувачеві та обробляйте помилку чи прострочений refresh за політикою продукту.",
        conceptEn: "USER_MVIEWS exposes, among other fields, STALENESS, COMPILE_STATE, last refresh time, and FAST_REFRESHABLE. Plan dependent MV refreshes with their dependencies in mind: refresh the source before the view that reads it, and verify nested-refresh capabilities for the configuration. After DDL inspect state and FAST eligibility; the required action depends on the change and MV definition. A refresh completion time alone does not establish how current the source data is: delayed ingestion needs a separate source watermark. Define an acceptable lag, communicate it to users, and handle failed or overdue refreshes according to the product's policy.",
        code: "SELECT mview_name, staleness, last_refresh_date, fast_refreshable FROM user_mviews;",
        language: "sql",
        retrieval: [
          { kind: "mcq", promptUk: "Чому FAST після зміни стовпця базової таблиці часто неможливий?", promptEn: "Why is FAST often impossible after a base-table column change?", options: ["MV або журнал можуть втратити придатність до FAST; перевірте стан і потрібний спосіб відновлення", "FAST ігнорує DDL завжди", "стовпці не входять у MV", "достатньо COMMIT"], optionsEn: ["The MV or log can become incompatible and may require a complete refresh or rebuild", "FAST always ignores DDL", "Columns are not part of an MV", "COMMIT is sufficient"], correctIndex: 0, explanationUk: "Залежно від DDL перевірте стан MV і журналу та придатність FAST.", explanationEn: "Depending on the DDL, inspect the MV and log state and FAST eligibility." },
          { kind: "fill", promptUk: "Допишіть словник зі станом свіжості MV", promptEn: "Fill in the dictionary view with MV freshness", language: "sql", code: "SELECT mview_name, staleness FROM ___;", accepted: ["USER_MVIEWS", "user_mviews"], caseSensitive: false, explanationUk: "USER_MVIEWS тримає staleness.", explanationEn: "USER_MVIEWS holds staleness." },
          { kind: "mcq", promptUk: "Як оновлювати MV_B, що читає MV_A?", promptEn: "How should you refresh MV_B that reads MV_A?", options: ["спочатку MV_A, потім MV_B, з урахуванням залежностей", "спочатку B, потім A", "лише B, A сама підтягнеться", "порядок неважливий"], optionsEn: ["Refresh MV_A first, then MV_B, using dependency-aware refresh", "Refresh B first, then A", "Refresh only B; A refreshes itself", "Order does not matter"], correctIndex: 0, explanationUk: "Залежне представлення має читати оновлене джерело.", explanationEn: "The dependent view should read the refreshed source." },
          { kind: "mcq", promptUk: "MV оновилась о 10:00, але імпорт джерела відстає на дві години. Що означає час refresh?", promptEn: "An MV refreshed at 10:00, but source ingestion is two hours behind. What does the refresh time tell you?", options: ["він не доводить актуальності джерела; потрібен watermark імпорту", "усі бізнес-події до 10:00 гарантовано присутні", "MV автоматично виправляє імпорт", "STALENESS завжди вимірює затримку зовнішнього джерела"], optionsEn: ["It does not prove source data is current; an ingestion watermark is needed", "All business events through 10:00 are guaranteed present", "The MV automatically repairs ingestion", "STALENESS always measures external source lag"], correctIndex: 0, explanationUk: "Окремо відстежуйте стан refresh і повноту даних джерела.", explanationEn: "Track refresh status and source completeness separately." }
        ],
        whyUk: "Що показати користувачу дашборда, який читає нічну MV?",
        whyEn: "What should you show a dashboard user who reads a nightly MV?",
        ideas: [{ labelUk: "час оновлення", labelEn: "the refresh time", anyOf: ["час", "time", "staleness", "свіжість", "fresh"] }, { labelUk: "порядок ланцюжка", labelEn: "chain order", anyOf: ["ланцюж", "chain", "порядок", "order", "залежн"] }, { labelUk: "вікно COMPLETE", labelEn: "the COMPLETE window", anyOf: ["complete", "вікно", "window", "unusable"] }],
        sampleUk: "Дашборд показує час останнього оновлення й не видає UNUSABLE за свіже; ланцюжки MV оновлюють у порядку залежностей, а після DDL часто потрібен повний COMPLETE.",
        sampleEn: "The dashboard shows the last refresh time and does not present UNUSABLE as fresh; MV chains refresh in dependency order, and after DDL a full COMPLETE is often required.",
      }
    ],
    "Контрольна: матеріалізовані представлення",
    "Exam: materialized views",
    [
      { promptUk: "FAST refresh потребує…", promptEn: "FAST refresh requires…", options: ["MV log і допустиму форму запиту", "лише ON COMMIT", "вимкнений словник", "відсутність агрегатів завжди"], optionsEn: ["An MV log and an eligible query shape", "Only ON COMMIT", "A disabled dictionary", "Aggregates must always be absent"], correctIndex: 0, explanationUk: "Інкремент з журналу.", explanationEn: "An increment from the log." },
      { promptUk: "ON COMMIT у OLTP…", promptEn: "ON COMMIT in OLTP…", options: ["робить COMMIT дорожчим", "завжди швидший за FAST ON DEMAND", "вимикає redo", "заборонений"], optionsEn: ["Makes COMMIT more expensive", "Is always faster than FAST ON DEMAND", "Disables redo", "Is forbidden"], correctIndex: 0, explanationUk: "Свіжість на шляху запису.", explanationEn: "Freshness on the write path." },
      { promptUk: "STALE_TOLERATED для фінансового агрегату…", promptEn: "STALE_TOLERATED for a financial aggregate is…", options: ["ризикований: можна віддати застарілі суми", "обов'язковий", "єдиний режим rewrite", "вимикає MV"], optionsEn: ["Risky: stale totals may be returned", "Mandatory", "The only rewrite mode", "Disables the MV"], correctIndex: 0, explanationUk: "Для грошей — суворіша цілісність.", explanationEn: "Stricter integrity for money." },
      { promptUk: "Після DDL що може знадобитися для MV?", promptEn: "After DDL, what might an MV require?", options: ["Перевірка стану, перекомпіляція або COMPLETE залежно від змін", "FAST автоматично", "FASTER", "невидимою в словнику назавжди"], optionsEn: ["May need recompilation or a complete refresh depending on the change", "Automatically becomes FAST", "FASTER", "Permanently disappears from the dictionary"], correctIndex: 0, explanationUk: "Перевірте стан і визначте потрібний спосіб відновлення.", explanationEn: "Inspect the state and determine the required recovery action." }
    ],
  ),
  sectionUnit(
    "table_partitioning",
    "Секціонування таблиць і відсікання секцій",
    "Table partitioning and partition pruning",
    [
      {
        slug: "sqlf-part-types",
        titleUk: "RANGE, LIST, HASH: який ключ секції",
        titleEn: "RANGE, LIST, HASH: which partition key",
        difficulty: 3,
        pointsUk: ["RANGE для часу, LIST для кодів, HASH для рівномірності", "Ключ секції має збігатись із типовим фільтром", "Композит поєднує період і розподіл"],
        pointsEn: ["RANGE for time, LIST for codes, HASH for even spread", "The partition key should match the typical filter", "A composite combines a period and a spread"],
        conceptUk: "RANGE за датою дозволяє керувати даними за періодами і може допомогти відсікти секції в запиті. В Oracle VALUES LESS THAN задає невключну верхню межу; нижня межа кожної наступної секції — верхня межа попередньої. Перша секція охоплює всі менші значення, тому в прикладі окремо виділено старі дати. Для значень після останньої межі потрібна наступна секція або інша політика, наприклад MAXVALUE чи interval partitioning. LIST підходить для дискретних значень, HASH — для розподілу за ключем; обирайте з огляду на запити та супровід. Локальний унікальний індекс має включати ключ секціонування; глобальний індекс теж може забезпечувати первинний ключ.",
        conceptEn: "RANGE by date supports period-based maintenance and may help queries prune partitions. In Oracle, VALUES LESS THAN sets an exclusive upper bound; each subsequent partition starts at the previous upper bound. The first partition covers all lower values, so the example separates older dates. Values beyond the final bound need another partition or another policy, such as MAXVALUE or interval partitioning. LIST suits discrete values, while HASH distributes by key; choose based on workload and maintenance. A local unique index must include the partition key; a global index can also enforce a primary key.",
        code: "CREATE TABLE sales (sold_at DATE, amt NUMBER) PARTITION BY RANGE (sold_at) (\n  PARTITION p_before_2026 VALUES LESS THAN (DATE '2026-01-01'),\n  PARTITION p2026m01 VALUES LESS THAN (DATE '2026-02-01'),\n  PARTITION p2026m02 VALUES LESS THAN (DATE '2026-03-01')\n);",
        language: "sql",
        retrieval: [
          { kind: "mcq", promptUk: "Який тип секцій найзручніший, щоб відкидати дані старше 24 місяців?", promptEn: "Which partition type is most convenient for dropping data older than 24 months?", options: ["RANGE за датою", "HASH за id", "LIST за прізвищем", "одна секція на всю таблицю"], optionsEn: ["RANGE by date", "HASH by id", "LIST by surname", "One partition for the whole table"], correctIndex: 0, explanationUk: "DROP PARTITION місяця, без масового DELETE.", explanationEn: "DROP PARTITION of a month, no bulk DELETE." },
          { kind: "fill", promptUk: "Допишіть секцію за діапазоном дат", promptEn: "Fill in a date range partition", language: "sql", code: "PARTITION BY ___ (sold_at)", accepted: ["RANGE"], caseSensitive: true, explanationUk: "Тип — RANGE.", explanationEn: "The type is RANGE." },
          { kind: "mcq", promptUk: "Чому HASH за customer_id слабко допомагає звіту «продажі за березень»?", promptEn: "Why does a HASH on customer_id barely help a 'sales in March' report?", options: ["фільтр за датою сам по собі не відсікає хеш-секції за customer_id", "HASH заборонений зі звітами", "березень не є датою", "потрібен лише LIST країн"], optionsEn: ["A date filter alone does not prune customer-id hash partitions", "HASH is forbidden for reports", "March is not a date", "Only LIST by country is needed"], correctIndex: 0, explanationUk: "Для відсікання потрібна інформація про ключ секціонування; перевіряйте план.", explanationEn: "Pruning needs information about the partition key; inspect the plan." },
          { kind: "read", promptUk: "У яку секцію прикладу потрапляє дата 2026-02-01?", promptEn: "Which partition in the example receives the date 2026-02-01?", language: "sql", code: "PARTITION p2026m01 VALUES LESS THAN (DATE '2026-02-01'),\nPARTITION p2026m02 VALUES LESS THAN (DATE '2026-03-01')", options: ["p2026m02", "p2026m01", "обидві", "жодна, бо межі завжди виключені з усіх секцій"], optionsEn: ["p2026m02", "p2026m01", "Both", "Neither, because boundaries are excluded from every partition"], correctIndex: 0, explanationUk: "Верхня межа січня невключна; вона є включною нижньою межею наступної секції.", explanationEn: "January's upper bound is exclusive and is the inclusive lower bound of the next partition." }
        ],
        whyUk: "Як обрати ключ секції для таблиці продажів?",
        whyEn: "How do you choose a partition key for a sales table?",
        ideas: [{ labelUk: "типовий фільтр", labelEn: "the typical filter", anyOf: ["дата", "date", "фільтр", "filter", "range"] }, { labelUk: "архів DROP", labelEn: "archive DROP", anyOf: ["drop", "архів", "archive", "місяць", "month"] }, { labelUk: "не прізвище для дати", labelEn: "not surname for a date", anyOf: ["hash", "прізвищ", "surname", "усі секції", "all"] }],
        sampleUk: "Для продажів ставлять RANGE за датою, щоб звіти відсікали період і старі секції відкидались DROP; HASH за id не допоможе фільтру за березень.",
        sampleEn: "For sales you set RANGE on the date so reports prune the period and old partitions can be DROPped; a HASH on id will not help a March filter.",
      },
      {
        slug: "sqlf-part-prune",
        titleUk: "Partition pruning у плані й пастки функцій на ключі",
        titleEn: "Partition pruning in the plan and function-on-key traps",
        difficulty: 3,
        pointsUk: ["План показує діапазон або спосіб вибору секцій", "Не обгортайте ключ функцією", "Тип предиката має збігатись із ключем"],
        pointsEn: ["The plan shows the partition range or selection method", "Do not wrap the key in a function", "The predicate type must match the key"],
        conceptUk: "У плані перевіряйте операцію секціонування та значення Pstart/Pstop, а не лише наявність цих колонок. Числові межі можуть показувати статичний діапазон; KEY означає вибір під час виконання, а не автоматично читання всіх секцій. Прямий предикат на ключі зазвичай легше аналізувати: для березня задайте sold_at >= початку березня і < початку квітня. Функція на ключі або неявне перетворення типів можуть завадити pruning, але результат залежить від конкретного плану та визначення секцій. Порівнюйте оцінений план із фактичним планом і доступною статистикою виконання на репрезентативних даних; безпечний спосіб перевірки обирайте відповідно до середовища.",
        conceptEn: "Inspect the partition operation and Pstart/Pstop values in the plan, not merely the presence of those columns. Numeric bounds can show a static range; KEY means runtime selection, not automatically a scan of every partition. A direct predicate on the key is generally easier to analyze: for March use sold_at >= the start of March and < the start of April. A function on the key or an implicit type conversion can inhibit pruning, but the result depends on the actual plan and partition definition. Compare the estimated plan with the executed plan and available runtime statistics on representative data; choose a verification method safe for the environment.",
        code: "WHERE sold_at >= DATE '2026-03-01' AND sold_at < DATE '2026-04-01'",
        language: "sql",
        retrieval: [
          { kind: "mcq", promptUk: "Чому TRUNC(sold_at) = :d може прочитати всі секції?", promptEn: "Why can TRUNC(sold_at) = :d read every partition?", options: ["функція на колонці ховає ключ секції від відсікання", "TRUNC завжди прискорює pruning", "секції не працюють із датами", ":d заборонений"], optionsEn: ["A function on the column can prevent the optimizer from pruning partitions", "TRUNC always improves pruning", "Partitions do not work with dates", ":d is forbidden"], correctIndex: 0, explanationUk: "Пишіть діапазон по sold_at без TRUNC на колонці.", explanationEn: "Write a range on sold_at without TRUNC on the column." },
          { kind: "fill", promptUk: "Допишіть невключну верхню межу березня", promptEn: "Fill in the exclusive upper bound for March", language: "sql", code: "sold_at >= DATE '2026-03-01' AND sold_at ___ DATE '2026-04-01'", accepted: ["<"], caseSensitive: true, explanationUk: "Верхня межа — початок квітня без включення; <= включив би рівно опівночі 1 квітня.", explanationEn: "The upper bound is the start of April, exclusive; <= would include midnight on April 1." },
          { kind: "mcq", promptUk: "Де в плані шукати підтвердження pruning?", promptEn: "Where in the plan do you look for confirmation of pruning?", options: ["операція секціонування та значення Pstart/Pstop", "лише в часі CPU", "у розмірі SGA", "у списку грантів"], optionsEn: ["The partition operation and Pstart/Pstop values", "Only CPU time", "The size of the SGA", "The list of grants"], correctIndex: 0, explanationUk: "Інтерпретуйте значення Pstart/Pstop у контексті плану, а не лише факт наявності колонок.", explanationEn: "Interpret Pstart/Pstop values in the plan's context, not just the presence of the columns." },
          { kind: "mcq", promptUk: "Що означає KEY у Pstart/Pstop плану?", promptEn: "What does KEY in Pstart/Pstop indicate?", options: ["вибір секцій визначається під час виконання", "усі секції обов'язково читаються", "запит точно не виконувався", "таблиця не секціонована"], optionsEn: ["Partition selection is determined at runtime", "Every partition is necessarily read", "The query definitely did not execute", "The table is not partitioned"], correctIndex: 0, explanationUk: "KEY може означати динамічне відсікання; перевірте виконаний план та доступну статистику.", explanationEn: "KEY can indicate dynamic pruning; inspect the executed plan and available statistics." }
        ],
        whyUk: "Як написати предикат за березень, щоб спрацювало відсікання секцій?",
        whyEn: "How do you write a March predicate so partition pruning fires?",
        ideas: [{ labelUk: "діапазон без функції на ключі", labelEn: "a range without a function on the key", anyOf: ["trunc", "функц", "function", "діапазон", "range", "sold_at"] }, { labelUk: "план Pstart", labelEn: "the Pstart plan", anyOf: ["pstart", "pstop", "prune", "partition range"] }, { labelUk: "правильний тип", labelEn: "the right type", anyOf: ["тип", "type", "bind", "перетворен", "conversion"] }],
        sampleUk: "Предикат пишуть як діапазон по ключу без TRUNC на колонці, з правильним типом; у плані перевіряють значення Pstart/Pstop, зокрема ALL або динамічний KEY, а не лише наявність цих колонок.",
        sampleEn: "You write a range on the key without TRUNC on the column, with the right type; inspect Pstart/Pstop values in the plan, including ALL or dynamic KEY, rather than just checking that the columns exist.",
      },
      {
        slug: "sqlf-part-maintain",
        titleUk: "Супровід: ADD, DROP, EXCHANGE, локальні індекси",
        titleEn: "Maintenance: ADD, DROP, EXCHANGE, and local indexes",
        difficulty: 3,
        pointsUk: ["ADD/INTERVAL для нового періоду, EXCHANGE або DROP для старого", "Локальні індекси дружать із DROP", "Статистика по секціях і вузькі права на DROP"],
        pointsEn: ["ADD/INTERVAL for a new period, EXCHANGE or DROP for an old one", "Local indexes get along with DROP", "Per-partition statistics and narrow DROP privileges"],
        conceptUk: "Новий місяць — ALTER TABLE ADD PARTITION (або інтервальні секції INTERVAL, що створюються самі). Старий місяць архівують EXCHANGE PARTITION у окрему таблицю або DROP після бекапу. Локальні індекси живуть на секції: DROP секції не перебудовує глобальний індекс так болісно (стан глобального індексу залежить від операції, версії та параметрів; можливе асинхронне обслуговування). Операції супроводу планують у вікно й тестують на копії: помилковий DROP — втрата місяця. Права на DROP мають бути вузькими. Статистика — по секціях, не лише глобальна, щоб оптимізатор знав розмір.",
        conceptEn: "A new month is ALTER TABLE ADD PARTITION (or INTERVAL partitions that are created by themselves). An old month is archived with EXCHANGE PARTITION into a standalone table, or DROPped after a backup. Local indexes live on the partition: DROP of a partition does not rebuild a global index as painfully (global index behavior depends on operation, version, and settings; asynchronous maintenance may apply). Maintenance is planned in a window and tested on a copy: a mistaken DROP is a lost month. DROP privileges should be narrow. Statistics should be per partition, not only global, so the optimizer knows the size.",
        code: "ALTER TABLE sales DROP PARTITION p2024m01 UPDATE INDEXES;",
        language: "sql",
        retrieval: [
          { kind: "mcq", promptUk: "Чим EXCHANGE PARTITION корисний перед архівацією?", promptEn: "How is EXCHANGE PARTITION useful before archiving?", options: ["обмінює секцію з сумісною таблицею без звичайного копіювання рядок за рядком; перевірки й індекси впливають на час", "це синонім DELETE FROM", "EXCHANGE видаляє індекси назавжди", "працює лише з HASH"], optionsEn: ["Exchanges a partition with a compatible table without ordinary row-by-row copying; validation and indexes affect duration", "Is a synonym for DELETE FROM", "Always destroys indexes", "Works only with HASH"], correctIndex: 0, explanationUk: "Обмін переважно працює з метаданими, але перевірки та індекси можуть потребувати часу.", explanationEn: "The exchange is mostly metadata, but validation and indexes can take time." },
          { kind: "fill", promptUk: "Допишіть оновлення індексів під час DROP", promptEn: "Fill in updating indexes during DROP", language: "sql", code: "ALTER TABLE sales DROP PARTITION p2024m01 UPDATE ___;", accepted: ["INDEXES"], caseSensitive: true, explanationUk: "UPDATE INDEXES уникає UNUSABLE глобальних індексів.", explanationEn: "UPDATE INDEXES avoids UNUSABLE global indexes." },
          { kind: "mcq", promptUk: "Що перевірити після DROP PARTITION щодо глобального індексу?", promptEn: "What should you check about a global index after DROP PARTITION?", options: ["стан індексу та спосіб його обслуговування для конкретної операції й версії", "Oracle завжди вимикає всі індекси", "локальний індекс поводиться так само", "UNUSABLE означає успіх"], optionsEn: ["The index state and maintenance method for the specific operation and version", "Oracle always disables all indexes", "A local index always behaves identically", "UNUSABLE means success"], correctIndex: 0, explanationUk: "Локальна секція індексу прив’язана до секції таблиці; глобальний індекс потребує окремої перевірки.", explanationEn: "A local index partition follows the table partition; a global index needs separate inspection." }
        ],
        whyUk: "Як безпечно прибрати дані за 2024-01 з RANGE-таблиці продажів?",
        whyEn: "How do you safely remove 2024-01 data from a RANGE sales table?",
        ideas: [{ labelUk: "бекап і EXCHANGE або DROP", labelEn: "a backup and EXCHANGE or DROP", anyOf: ["exchange", "drop", "бекап", "backup", "архів"] }, { labelUk: "локальні індекси", labelEn: "local indexes", anyOf: ["local", "global", "unusable", "update indexes"] }, { labelUk: "вузькі права", labelEn: "narrow privileges", anyOf: ["права", "privileg", "вікно", "window", "статистик"] }],
        sampleUk: "Спочатку бекап, далі EXCHANGE в архівну таблицю або DROP з UPDATE INDEXES, краще з локальними індексами й вузькими правами, плюс статистика по секціях.",
        sampleEn: "A backup first, then EXCHANGE into an archive table or DROP with UPDATE INDEXES, preferably with local indexes and narrow privileges, plus per-partition statistics.",
      }
    ],
    "Контрольна: секціонування",
    "Exam: partitioning",
    [
      { promptUk: "Щоб відкидати старі місяці, зручний тип…", promptEn: "To drop old months, a convenient type is…", options: ["RANGE за датою", "HASH за прізвищем", "єдина секція", "LIST за випадковим UUID без політики"], optionsEn: ["RANGE by date", "HASH by surname", "A single partition", "LIST by random UUID without a policy"], correctIndex: 0, explanationUk: "DROP PARTITION періоду.", explanationEn: "DROP PARTITION of a period." },
      { promptUk: "TRUNC(sold_at) у предикаті часто…", promptEn: "TRUNC(sold_at) in a predicate often…", options: ["заважає pruning", "гарантує pruning", "замінює ключ секції", "створює RANGE"], optionsEn: ["Can inhibit pruning", "Guarantees pruning", "Replaces the partition key", "Creates RANGE"], correctIndex: 0, explanationUk: "Не ховайте ключ функцією.", explanationEn: "Do not hide the key with a function." },
      { promptUk: "EXCHANGE PARTITION…", promptEn: "EXCHANGE PARTITION…", options: ["швидко міняє місцями секцію й таблицю тієї ж структури", "копіює рядки по одному завжди", "є синонімом TRUNCATE бази", "працює лише в PostgreSQL"], optionsEn: ["Exchanges a partition with a structurally compatible table", "Always copies rows one by one", "Is a synonym for truncating the database", "Works only in PostgreSQL"], correctIndex: 0, explanationUk: "Операція метаданих.", explanationEn: "A metadata operation." },
      { promptUk: "Глобальний індекс після DROP PARTITION…", promptEn: "A global index after DROP PARTITION…", options: ["потребує перевірки стану й режиму обслуговування", "завжди стає локальним", "завжди прискорюється", "видаляється разом із базою"], optionsEn: ["Needs its state and maintenance method checked", "Always becomes local", "Always becomes faster", "Is dropped with the database"], correctIndex: 0, explanationUk: "Поведінка залежить від операції, версії та доступного асинхронного обслуговування.", explanationEn: "Behavior depends on the operation, version, and available asynchronous maintenance." }
    ],
  ),
  sectionUnit(
    "sql_profiling",
    "Профілювання SQL: монітор, ASH, пікінг байндів",
    "SQL profiling: the monitor, ASH, and bind peeking",
    [
      {
        slug: "sqlf-sql-monitor",
        titleUk: "Real-Time SQL Monitor: фактичний план із цифрами",
        titleEn: "Real-Time SQL Monitor: the actual plan with numbers",
        difficulty: 3,
        pointsUk: ["Монітор показує фактичні рядки й час, не лише оцінки", "Розрив estimate/actual — ключ до діагнозу", "Не вмикайте постійно на короткому OLTP"],
        pointsEn: ["The monitor shows actual rows and time, not only estimates", "The estimate/actual gap is the key to a diagnosis", "Do not leave it on for short OLTP all the time"],
        conceptUk: "Звіт SQL Monitor може показати план конкретного виконання та фактичні показники операцій, очікувань і ресурсів; EXPLAIN PLAN натомість показує оцінений план. Великий розрив оцінених і фактичних рядків — привід дослідити статистику, предикати й контекст виконання, а не доказ однієї причини. Перевіряйте SQL ID, конкретне виконання і доступність метрик: різні запуски та паралелізм можуть ускладнити порівняння. Моніторинг має накладні витрати й ліцензійні вимоги: SQL Monitor належить до Tuning Pack; перед використанням перевірте права та ліцензію вашого середовища.",
        conceptEn: "A SQL Monitor report can show the plan for a particular execution and actual operation, wait, and resource metrics; EXPLAIN PLAN instead shows an estimated plan. A large estimated-to-actual row gap warrants investigation of statistics, predicates, and execution context, but does not prove one cause. Check the SQL ID, the particular execution, and metric availability: different executions and parallelism can complicate comparisons. Monitoring has overhead and licensing requirements: SQL Monitor is part of the Tuning Pack; verify your environment's privileges and license before use.",
        code: "SELECT DBMS_SQL_MONITOR.REPORT_SQL_MONITOR(sql_id => :id, type => 'TEXT') FROM dual;",
        language: "sql",
        retrieval: [
          { kind: "mcq", promptUk: "Чим SQL Monitor корисніший за звичайний EXPLAIN PLAN?", promptEn: "How is SQL Monitor more useful than a plain EXPLAIN PLAN?", options: ["він показує фактичні рядки й час виконання, а не лише оцінки", "він коротший за текст", "EXPLAIN заборонений у 19c", "монітор замінює статистику"], optionsEn: ["It shows actual rows and execution time, not only estimates", "It is shorter", "EXPLAIN is forbidden in 19c", "It replaces statistics"], correctIndex: 0, explanationUk: "Факт проти прогнозу.", explanationEn: "Fact versus forecast." },
          { kind: "fill", promptUk: "Допишіть підказку увімкнути монітор на запиті", promptEn: "Fill in the hint that turns the monitor on for a query", language: "sql", code: "SELECT /*+ ___ */ ...", accepted: ["MONITOR"], caseSensitive: true, explanationUk: "Хінт — MONITOR.", explanationEn: "The hint is MONITOR." },
          { kind: "mcq", promptUk: "Що підозрювати, якщо оцінка 12 рядків, а факт 8 мільйонів?", promptEn: "What should you suspect if the estimate is 12 rows and the actual is 8 million?", options: ["застарілу або невідповідну статистику, або прихований предикат", "що монітор зламаний", "що індекс завжди гірший", "що TEMP не існує"], optionsEn: ["Stale or unsuitable statistics, or a problematic predicate", "A broken monitor", "An index is always worse", "TEMP does not exist"], correctIndex: 0, explanationUk: "Спочатку розрив кардинальності.", explanationEn: "Cardinality gaps first." }
        ],
        whyUk: "Як підтвердити, що хеш-з'єднання роздулось через погану оцінку?",
        whyEn: "How do you confirm that a hash join ballooned because of a bad estimate?",
        ideas: [{ labelUk: "факт проти оцінки", labelEn: "actual versus estimate", anyOf: ["actual", "estimate", "монітор", "monitor", "рядк"] }, { labelUk: "TEMP spill", labelEn: "a TEMP spill", anyOf: ["temp", "spill", "час", "time", "cpu"] }, { labelUk: "не лише EXPLAIN", labelEn: "not EXPLAIN alone", anyOf: ["explain", "оцінк", "estimate", "факт"] }],
        sampleUk: "SQL Monitor може показати фактичні рядки й переповнення TEMP на хеш-з'єднанні; розрив із оцінкою — підстава перевірити статистику та умови виконання. Самого EXPLAIN для доказу причини недостатньо.",
        sampleEn: "SQL Monitor can show actual rows and TEMP spills on a hash join; a gap from the estimate is a reason to investigate statistics and execution conditions. EXPLAIN alone cannot establish the cause.",
      },
      {
        slug: "sqlf-ash-waits",
        titleUk: "ASH і очікування: де реально стоїть сеанс",
        titleEn: "ASH and waits: where the session actually stands",
        difficulty: 3,
        pointsUk: ["ASH показує, на чому сеанси проводили час", "ON CPU проти I/O проти блокувань — різні ліки", "Один знімок слабший за період"],
        pointsEn: ["ASH shows what sessions spent time on", "ON CPU versus I/O versus locks need different remedies", "One snapshot is weaker than a period"],
        conceptUk: "Active Session History раз на секунду знімає активні сеанси: event очікування, SQL_ID, об'єкт, P1/P2. За вибіркою видно, чи час іде на user I/O, на блокировки (enq: TX), на CPU (ON CPU — не event). Одна вибірка — не вирок; дивіться період і викиди. V$SESSION.EVENT — зараз, ASH — історія. «Все повільно» без класу очікувань — здогад. Корелюйте SQL_ID з монітором. V$ACTIVE_SESSION_HISTORY належить до Diagnostics Pack; SQL Monitor — до Tuning Pack. Перед використанням перевіряйте ліцензію для вашої редакції та середовища.",
        conceptEn: "Active Session History samples active sessions once a second: the wait event, SQL_ID, the object, P1/P2. The sample shows whether time goes to user I/O, to locks (enq: TX), or to CPU (ON CPU is not an event). One sample is not a verdict; look at a period and at spikes. V$SESSION.EVENT is now, ASH is history. 'Everything is slow' with no wait class is a guess. Correlate SQL_ID with the monitor. V$ACTIVE_SESSION_HISTORY is part of Diagnostics Pack; SQL Monitor is part of Tuning Pack. Verify licensing for your edition and environment before use.",
        code: "SELECT event, sql_id, COUNT(*) FROM v$active_session_history\nWHERE sample_time > systimestamp - interval '15' minute\nGROUP BY event, sql_id ORDER BY 3 DESC;",
        language: "sql",
        retrieval: [
          { kind: "mcq", promptUk: "Якщо ASH показує enq: TX row lock, перший крок який?", promptEn: "If ASH shows enq: TX row lock, what is the first step?", options: ["знайти, хто тримає блокування і який SQL, а не збільшувати пул з'єднань наосліп", "одразу додати індекси на всі колонки", "перезапустити інстанс", "вимкнути ASH"], optionsEn: ["Identify the lock holder and SQL rather than blindly increasing the connection pool", "Add indexes on every column immediately", "Restart the instance", "Disable ASH"], correctIndex: 0, explanationUk: "Блокування лікують власника блокування.", explanationEn: "Locks are cured by the lock holder." },
          { kind: "fill", promptUk: "Допишіть джерело історії активних сеансів", promptEn: "Fill in the source of active session history", language: "sql", code: "SELECT event, sql_id, count(*) FROM ___ GROUP BY event, sql_id;", accepted: ["V$ACTIVE_SESSION_HISTORY", "v$active_session_history"], caseSensitive: false, explanationUk: "Подання — V$ACTIVE_SESSION_HISTORY.", explanationEn: "The view is V$ACTIVE_SESSION_HISTORY." },
          { kind: "mcq", promptUk: "Що означає велика частка часу ON CPU без event очікування?", promptEn: "What does a large share of time ON CPU with no wait event mean?", options: ["активність класифікована як ON CPU: перевірте план і навантаження CPU, перш ніж робити висновок про диск", "диск точно зламаний", "мережа точно винна", "ASH не вміє CPU"], optionsEn: ["Activity is classified as ON CPU: inspect the plan and CPU load before blaming storage", "The disk is definitely broken", "The network is definitely responsible", "ASH cannot show CPU"], correctIndex: 0, explanationUk: "CPU — теж діагноз, не відсутність проблеми.", explanationEn: "CPU is also a diagnosis, not the absence of a problem." }
        ],
        whyUk: "Як розрізнити «повільний диск» і «блокування рядка» за ASH?",
        whyEn: "How do you tell a 'slow disk' from a 'row lock' using ASH?",
        ideas: [{ labelUk: "клас події", labelEn: "the event class", anyOf: ["event", "enq", "i/o", "cpu", "ash"] }, { labelUk: "період, не один знімок", labelEn: "a period, not one snapshot", anyOf: ["період", "period", "вибірк", "sample", "викида"] }, { labelUk: "SQL_ID і монітор", labelEn: "SQL_ID and the monitor", anyOf: ["sql_id", "монітор", "monitor", "власник", "holder"] }],
        sampleUk: "ASH за період показує клас очікування: user I/O, enq: TX чи ON CPU — це різні ліки; один знімок слабкий, SQL_ID корелюють із монітором.",
        sampleEn: "ASH over a period shows the wait class: user I/O, enq: TX, or ON CPU — those need different remedies; one snapshot is weak, and SQL_ID is correlated with the monitor.",
      },
      {
        slug: "sqlf-bind-peeking",
        titleUk: "Bind peeking, ACS і «план від першого байнда»",
        titleEn: "Bind peeking, ACS, and 'the plan from the first bind'",
        difficulty: 3,
        pointsUk: ["Перший байнд може «залити» план для всіх наступних", "ACS і гістограми дають кілька дочірніх курсорів", "Не прибивайте план без виміру на типових значеннях"],
        pointsEn: ["The first bind can 'pour' a plan for every later call", "ACS and histograms give several child cursors", "Do not pin a plan without measuring typical values"],
        conceptUk: "Під час жорсткого розбору оптимізатор може врахувати значення bind і вибрати для нього план. Якщо наступні значення мають іншу селективність, повторно використаний план може бути невідповідним. Adaptive Cursor Sharing (ACS) може створити дочірні курсори для різних діапазонів селективності, але не гарантує окремий оптимальний план для кожного значення; гістограми можуть допомогти оцінкам перекошених даних, проте не є універсальною передумовою ACS. Досліджуйте фактичні курсори, статистику і типові та крайові значення. Оцінений EXPLAIN може відрізнятися від реально виконаного плану.",
        conceptEn: "During hard parse the optimizer may peek at a bind value and choose a plan for it. If later values have different selectivity, the reused plan may be unsuitable. Adaptive Cursor Sharing (ACS) may create child cursors for different selectivity ranges, but does not guarantee a separate optimal plan for every value; histograms can help estimate skewed data, but are not a universal prerequisite for ACS. Investigate actual cursors, statistics, and representative as well as edge values. An estimated EXPLAIN plan can differ from the plan actually executed.",
        code: "SELECT child_number, is_bind_aware, is_bind_sensitive, executions\nFROM v$sql WHERE sql_id = :id;",
        language: "sql",
        retrieval: [
          { kind: "mcq", promptUk: "Чому перший виклик із рідкісним id=1 псує подальші з id типового клієнта?", promptEn: "Why does a first call with rare id=1 spoil later ones with a typical customer id?", options: ["план з пікінгу під рідкісне значення лишається в курсорі", "байнди заборонені після першого виклику", "ACS завжди це виправляє без гістограм", "рідкісне значення ігнорується"], optionsEn: ["A plan chosen using the rare peeked value can be reused", "Binds are forbidden after the first call", "ACS always fixes this without histograms", "The rare value is ignored"], correctIndex: 0, explanationUk: "Повторне використання невдалого дочірнього курсора можливе; ACS може адаптувати вибір, але не гарантує цього.", explanationEn: "An unsuitable child cursor can be reused; ACS may adapt the choice, but does not guarantee it." },
          { kind: "fill", promptUk: "Допишіть назву механізму кількох дочірніх курсорів", promptEn: "Fill in the name of the several-child-cursors mechanism", language: "sql", code: "Adaptive ___ Sharing", accepted: ["Cursor"], caseSensitive: true, explanationUk: "Adaptive Cursor Sharing.", explanationEn: "Adaptive Cursor Sharing." },
          { kind: "mcq", promptUk: "Навіщо гістограма на колонці зі сильним перекосом для байндів?", promptEn: "Why a histogram on a strongly skewed column for binds?", options: ["щоб оптимізатор знав різні селективності значень і ACS міг розділити курсори", "гістограма вимикає peeking назавжди", "це потрібно лише для NUMBER", "гістограма замінює індекс"], optionsEn: ["To help estimate different selectivities and potentially support adaptive cursor sharing", "A histogram permanently disables peeking", "It is needed only for NUMBER", "A histogram replaces an index"], correctIndex: 0, explanationUk: "Перекіс без гістограми виглядає як середня селективність.", explanationEn: "Skew without a histogram looks like average selectivity." }
        ],
        whyUk: "Як діагностувати «на стенді швидко, на проді повільно» з тими самими байндами?",
        whyEn: "How do you diagnose 'fast on the stand, slow in production' with the same binds?",
        ideas: [{ labelUk: "перший пікінг", labelEn: "the first peek", anyOf: ["peek", "перший", "first", "байнд", "bind", "план"] }, { labelUk: "дочірні курсори ACS", labelEn: "ACS child cursors", anyOf: ["acs", "cursor", "гістограм", "histogram", "перекіс", "skew"] }, { labelUk: "вимір типових значень", labelEn: "measuring typical values", anyOf: ["типов", "typical", "explain", "прод", "prod"] }],
        sampleUk: "На проді план міг залитись від першого рідкісного байнда; дивляться дочірні курсори ACS, гістограми перекосу й вимірюють типові значення, а не лише EXPLAIN на стенді.",
        sampleEn: "In production the plan may have been poured from a first rare bind; you look at ACS child cursors, skew histograms, and measured typical values, not only EXPLAIN on the stand.",
      }
    ],
    "Контрольна: профілювання SQL",
    "Exam: SQL profiling",
    [
      { promptUk: "SQL Monitor на відміну від EXPLAIN…", promptEn: "Unlike EXPLAIN, SQL Monitor…", options: ["показує фактичні рядки й час", "лише оцінки оптимізатора", "не вміє паралелізм", "замінює ASH"], optionsEn: ["Shows actual rows and execution time", "Only optimizer estimates", "Cannot show parallelism", "Replaces ASH"], correctIndex: 0, explanationUk: "Факт виконання.", explanationEn: "Execution facts." },
      { promptUk: "Велика частка enq: TX в ASH означає…", promptEn: "A large share of enq: TX in ASH means…", options: ["блокування рядків: шукайте власника", "обов'язково повільний диск", "нестачу CPU завжди", "потребу вимкнути MV"], optionsEn: ["Row-lock waits: identify the lock holder", "Definitely a slow disk", "Always a CPU shortage", "The MV must be disabled"], correctIndex: 0, explanationUk: "Інший клас очікування — інші ліки.", explanationEn: "A different wait class, a different remedy." },
      { promptUk: "Bind peeking небезпечний, коли…", promptEn: "Bind peeking is dangerous when…", options: ["перше значення нетипове, а план лишається", "байндів немає", "таблиця порожня завжди", "увімкнено лише COMPLETE"], optionsEn: ["The first value is unrepresentative and the plan is reused", "There are no binds", "The table is always empty", "Only COMPLETE is enabled"], correctIndex: 0, explanationUk: "Перекіс і перший розбір.", explanationEn: "Skew and the first parse." },
      { promptUk: "Розрив estimate 10 проти actual мільйонів…", promptEn: "A gap of estimate 10 versus actual millions…", options: ["вказує на статистику або предикат", "доводить, що монітор зламаний", "означає успішний pruning", "вимагає вимкнути ACS"], optionsEn: ["Suggests investigating statistics or the predicate", "Proves the monitor is broken", "Means pruning succeeded", "Requires disabling ACS"], correctIndex: 0, explanationUk: "Спочатку кардинальність.", explanationEn: "Cardinality first." }
    ],
  )
];

const insertions: Record<string, LessonContent[]> = {};

export function expandSqlFundamentals(course: CourseContent): CourseContent {
  return expandCourse(course, insertions, newUnits);
}
