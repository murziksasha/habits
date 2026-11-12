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
        conceptUk: "START WITH задає корені, CONNECT BY PRIOR id = parent_id (або навпаки) крокує ребрами дерева. PRIOR позначає рядок-батько поточного кроку: помилка в боці PRIOR дає інверсію дерева або цикл. LEVEL — глибина, SYS_CONNECT_BY_PATH збирає шлях, CONNECT_BY_ROOT — значення кореня. CYCLE виявляють через NOCYCLE, інакше запит зациклиться на «брудних» даних. Для графа з кількома батьками CONNECT BY не є повноцінним обходом усіх шляхів — тоді рекурсивний WITH або графи. Фільтр у WHERE застосовується після побудови дерева, на відміну від AND у CONNECT BY.",
        conceptEn: "START WITH sets the roots, CONNECT BY PRIOR id = parent_id (or the other way around) walks the tree edges. PRIOR marks the parent row of the current step: an error on the PRIOR side inverts the tree or cycles. LEVEL is the depth, SYS_CONNECT_BY_PATH builds the path, CONNECT_BY_ROOT is the root's value. Cycles are caught with NOCYCLE, otherwise the query loops on dirty data. For a graph with several parents, CONNECT BY is not a full walk of every path — use recursive WITH or graphs. A filter in WHERE applies after the tree is built, unlike AND in CONNECT BY.",
        code: "SELECT empno, LEVEL, SYS_CONNECT_BY_PATH(ename, '/') path\nFROM emp\nSTART WITH mgr IS NULL\nCONNECT BY NOCYCLE PRIOR empno = mgr;",
        language: "sql",
        retrieval: [
          { kind: "mcq", promptUk: "Що станеться, якщо переплутати бік PRIOR у CONNECT BY?", promptEn: "What happens if you swap the PRIOR side in CONNECT BY?", options: ["дерево піде в інший бік або зациклиться", "Oracle виправить сам", "LEVEL стане завжди 1", "START WITH ігнорується"], correctIndex: 0, explanationUk: "PRIOR каже, який рядок уже відвіданий.", explanationEn: "PRIOR says which row was already visited." },
          { kind: "fill", promptUk: "Допишіть захист від циклів", promptEn: "Fill in cycle protection", language: "sql", code: "CONNECT BY ___ PRIOR id = parent_id", accepted: ["NOCYCLE"], caseSensitive: true, explanationUk: "NOCYCLE зупиняє повтор вершини.", explanationEn: "NOCYCLE stops a repeated vertex." },
          { kind: "read", promptUk: "Коли спрацює фільтр dept = 10 у WHERE проти умови в CONNECT BY?", promptEn: "When does a dept = 10 filter in WHERE fire, versus a condition in CONNECT BY?", language: "sql", code: "START WITH mgr IS NULL CONNECT BY PRIOR empno = mgr WHERE deptno = 10", options: ["спочатку будується все дерево, потім відкидаються рядки deptno ≠ 10, можливі «дірки»", "WHERE обрізає ребра під час обходу так само, як CONNECT BY", "WHERE заборонений з CONNECT BY", "фільтр застосовується лише до кореня"], correctIndex: 0, explanationUk: "Обрізати гілку рано треба в CONNECT BY.", explanationEn: "To prune a branch early, put the predicate in CONNECT BY." }
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
        conceptUk: "Рекурсивний підзапит WITH має якір (корені) UNION ALL рекурсивний член, що посилається на ім'я CTE. У Oracle SEARCH DEPTH FIRST / BREADTH FIRST задає порядок, CYCLE ... SET позначає циклічні рядки без зависання. Це стандартний SQL, зручніший для графів і кількох кореневих наборів, ніж CONNECT BY, і переноситься в PostgreSQL. Рекурсивний член не повинен агрегувати «все минуле» без обмеження: потрібен лічильник глибини або умова зупинки, інакше легко вичерпати TEMP. Колонки якоря і рекурсії мають узгоджені типи.",
        conceptEn: "A recursive WITH subquery has an anchor (the roots) UNION ALL a recursive member that refers to the CTE name. In Oracle, SEARCH DEPTH FIRST / BREADTH FIRST sets the order, and CYCLE ... SET marks cyclic rows without hanging. This is standard SQL, more convenient for graphs and several root sets than CONNECT BY, and it ports to PostgreSQL. The recursive member must not aggregate 'the whole past' without a bound: you need a depth counter or a stop condition, or you can exhaust TEMP. Anchor and recursion columns must have aligned types.",
        code: "WITH cte (id, parent_id, depth) AS (\n  SELECT id, parent_id, 1 FROM org WHERE parent_id IS NULL\n  UNION ALL\n  SELECT o.id, o.parent_id, c.depth+1 FROM org o JOIN cte c ON o.parent_id = c.id WHERE c.depth < 20\n) SEARCH DEPTH FIRST BY id SET seq\nCYCLE id SET is_cycle TO 'Y' DEFAULT 'N'\nSELECT * FROM cte;",
        language: "sql",
        retrieval: [
          { kind: "mcq", promptUk: "Яка роль якірного члена в рекурсивному WITH?", promptEn: "What is the role of the anchor member in a recursive WITH?", options: ["дати стартовий набір рядків, з якого росте рекурсія", "завжди рахувати агрегати", "замінити UNION ALL", "вимкнути CYCLE"], correctIndex: 0, explanationUk: "Без якоря рекурсії немає з чого почати.", explanationEn: "Without an anchor the recursion has nothing to start from." },
          { kind: "fill", promptUk: "Допишіть з'єднання якоря з рекурсією", promptEn: "Fill in joining the anchor to the recursion", language: "sql", code: "anchor ___ ALL recursive_part", accepted: ["UNION"], caseSensitive: true, explanationUk: "Потрібен UNION ALL, не UNION (без дублів і сортування).", explanationEn: "You need UNION ALL, not UNION (no dedup or sort)." },
          { kind: "mcq", promptUk: "Чому варто додати depth < 20 у рекурсивний член?", promptEn: "Why should you add depth < 20 in the recursive member?", options: ["щоб помилка в даних чи граф не роздули TEMP до відмови", "Oracle ігнорує глибину", "20 — максимум рядків у WITH", "CYCLE тоді не потрібен ніколи"], correctIndex: 0, explanationUk: "Захисний стоп навіть із CYCLE.", explanationEn: "A defensive stop even with CYCLE." }
        ],
        whyUk: "Коли рекурсивний WITH зручніший за CONNECT BY?",
        whyEn: "When is recursive WITH more convenient than CONNECT BY?",
        ideas: [{ labelUk: "стандартний SQL", labelEn: "standard SQL", anyOf: ["стандарт", "standard", "postgres", "перенос", "port"] }, { labelUk: "якір і UNION ALL", labelEn: "anchor and UNION ALL", anyOf: ["якір", "anchor", "union", "cte"] }, { labelUk: "CYCLE і глибина", labelEn: "CYCLE and depth", anyOf: ["cycle", "глибин", "depth", "temp"] }],
        sampleUk: "Рекурсивний WITH — стандартний SQL з якорем і UNION ALL, зручніший для перенесення й графів, а CYCLE і ліміт глибини не дають роздути TEMP.",
        sampleEn: "Recursive WITH is standard SQL with an anchor and UNION ALL, easier to port and to use on graphs, and CYCLE plus a depth limit keep TEMP from ballooning.",
      },
      {
        slug: "sqlf-hier-cycles",
        titleUk: "Цикли, кілька батьків і матеріальний шлях",
        titleEn: "Cycles, multiple parents, and a materialized path",
        difficulty: 3,
        pointsUk: ["Кілька батьків — уже не чисте дерево", "Closure table або path спрощують читання, ускладнюють запис", "Цикл — дефект даних, його показують"],
        pointsEn: ["Several parents is no longer a pure tree", "A closure table or a path simplifies reads and complicates writes", "A cycle is a data defect, and you show it"],
        conceptUk: "Справжнє дерево має одного батька; організаційна «матриця» — уже DAG або граф, і CONNECT BY з одним PRIOR не перелічить усі шляхи. Тоді або рекурсія з відвіданими вершинами, або модель closure table (усі пари предок-нащадок), або materialized path ('/1/4/9/'), який спрощує WHERE path LIKE '/1/4/%' ціною обережних оновлень. Цикл у дереві — дефект даних: його треба показувати в звіті якості, не ховати. Для великих ієрархій тримають індекс на parent_id і обмежують глибину у вітрині.",
        conceptEn: "A true tree has one parent; an organisational 'matrix' is already a DAG or a graph, and CONNECT BY with one PRIOR will not list every path. Then you either recurse with visited nodes, or a closure table (every ancestor-descendant pair), or a materialized path ('/1/4/9/') that simplifies WHERE path LIKE '/1/4/%' at the cost of careful updates. A cycle in a tree is a data defect: show it in a quality report, do not hide it. For large hierarchies, keep an index on parent_id and cap depth in the mart.",
        code: "-- closure: ancestor_id, descendant_id, depth  (indexed)\nSELECT d.* FROM org_closure c JOIN org d ON d.id = c.descendant_id WHERE c.ancestor_id = :id;",
        language: "sql",
        retrieval: [
          { kind: "mcq", promptUk: "Чому CONNECT BY може не показати всі шляхи в матричній оргструктурі?", promptEn: "Why may CONNECT BY not show every path in a matrix org structure?", options: ["у вершини кілька батьків, модель уже не дерево з одним PRIOR", "Oracle забороняє кілька коренів", "LEVEL тоді від'ємний", "матриця не має id"], correctIndex: 0, explanationUk: "Потрібна модель графа або closure table.", explanationEn: "You need a graph model or a closure table." },
          { kind: "fill", promptUk: "Допишіть типовий предикат матеріального шляху нащадків", promptEn: "Fill in a typical materialized-path predicate for descendants", language: "sql", code: "WHERE path ___ '/1/4/%'", accepted: ["LIKE", "like"], caseSensitive: true, explanationUk: "LIKE з префіксом шляху.", explanationEn: "LIKE with a path prefix." },
          { kind: "mcq", promptUk: "Що робити, якщо якісний запит знайшов цикл employee A → B → A?", promptEn: "What should you do if a quality query finds a cycle employee A → B → A?", options: ["зафіксувати як дефект даних і не будувати на ньому молчаливу ієрархію", "ігнорувати, NOCYCLE «вирішує бізнес»", "видалити всіх співробітників", "збільшити LEVEL"], correctIndex: 0, explanationUk: "Цикл — помилка введення або інтеграції.", explanationEn: "The cycle is an entry or integration error." }
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
      { promptUk: "PRIOR у CONNECT BY позначає…", promptEn: "PRIOR in CONNECT BY marks…", options: ["рядок попереднього кроку на ребрі", "завжди корінь", "агрегат LEVEL", "лише WHERE"], correctIndex: 0, explanationUk: "Бік ребра.", explanationEn: "The edge side." },
      { promptUk: "WHERE в ієрархічному запиті…", promptEn: "WHERE in a hierarchical query…", options: ["фільтрує вже побудоване дерево", "завжди обрізає ребра як CONNECT BY", "заборонений", "замінює START WITH"], correctIndex: 0, explanationUk: "Можливі дірки в дереві.", explanationEn: "Holes in the tree are possible." },
      { promptUk: "Рекурсивний WITH з'єднує якір через…", promptEn: "Recursive WITH joins the anchor via…", options: ["UNION ALL", "INNER JOIN без рекурсії", "MINUS", "CROSS JOIN обов'язково"], correctIndex: 0, explanationUk: "Стандартна рекурсія.", explanationEn: "Standard recursion." },
      { promptUk: "Цикл у дереві співробітників…", promptEn: "A cycle in an employee tree is…", options: ["дефект даних, який треба показати", "нормальна матриця", "вирішується збільшенням LEVEL", "неможливий у SQL"], correctIndex: 0, explanationUk: "Не ховати в NOCYCLE як «бізнес-рішення».", explanationEn: "Do not hide it in NOCYCLE as a 'business fix'." }
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
        pointsUk: ["FAST потребує MV log і обмежень на запит", "ON COMMIT робить свіжим, але дорожчає фіксацію", "Слідкуйте, чи не впав FAST у COMPLETE"],
        pointsEn: ["FAST needs an MV log and query constraints", "ON COMMIT stays fresh but makes commits heavier", "Watch whether FAST fell back to COMPLETE"],
        conceptUk: "Матеріалізоване представлення зберігає результат запиту на диску. COMPLETE перераховує все; FAST застосовує інкремент з MV log (журнал на базових таблицях) — потрібні обмеження на запит (агрегати, з'єднання за первинним ключем). ON COMMIT оновлює в тій самій транзакції, що й дані: свіжість висока, але COMMIT стає дорожчим. ON DEMAND — за розкладом або вручну. Якщо FAST неможливий, Oracle мовчки або з помилкою падає в COMPLETE: моніторте час оновлення. Після зміни структури базової таблиці журнал і MV часто треба пересоздати.",
        conceptEn: "A materialized view stores a query result on disk. COMPLETE recomputes everything; FAST applies an increment from an MV log (a log on the base tables) — the query must meet constraints (aggregates, joins on a primary key). ON COMMIT refreshes in the same transaction as the data: freshness is high, but COMMIT becomes more expensive. ON DEMAND is scheduled or manual. If FAST is impossible, Oracle falls to COMPLETE silently or with an error: monitor refresh time. After a base-table structure change, the log and the MV often must be rebuilt.",
        code: "CREATE MATERIALIZED VIEW mv_sales_day\nREFRESH FAST ON DEMAND AS\nSELECT trunc(sold_at), SUM(amt) FROM sales GROUP BY trunc(sold_at);",
        language: "sql",
        retrieval: [
          { kind: "mcq", promptUk: "Чому ON COMMIT може подовжити час COMMIT у OLTP?", promptEn: "Why can ON COMMIT lengthen COMMIT time in OLTP?", options: ["оновлення MV виконується в тій самій транзакції, що й запис", "COMMIT тоді заборонений", "FAST вимикає журнал redo", "ON COMMIT працює лише вночі"], correctIndex: 0, explanationUk: "Свіжість має ціну на шляху запису.", explanationEn: "Freshness has a cost on the write path." },
          { kind: "fill", promptUk: "Допишіть інкрементне оновлення", promptEn: "Fill in incremental refresh", language: "sql", code: "REFRESH ___ ON DEMAND", accepted: ["FAST"], caseSensitive: true, explanationUk: "FAST читає MV log.", explanationEn: "FAST reads the MV log." },
          { kind: "mcq", promptUk: "Що потрібно на базовій таблиці для FAST refresh агрегату?", promptEn: "What does a FAST refresh of an aggregate need on the base table?", options: ["матеріалізований журнал (MV log) і допустима форма запиту", "лише унікальний індекс на MV", "вимкнений redo", "тільки ON COMMIT"], correctIndex: 0, explanationUk: "Без журналу інкремента немає.", explanationEn: "Without a log there is no increment." }
        ],
        whyUk: "Коли обрати ON DEMAND FAST, а не ON COMMIT?",
        whyEn: "When should you pick ON DEMAND FAST rather than ON COMMIT?",
        ideas: [{ labelUk: "не дорожчати COMMIT", labelEn: "do not make COMMIT heavier", anyOf: ["commit", "oltp", "подовж", "lengthen"] }, { labelUk: "журнал і FAST", labelEn: "a log and FAST", anyOf: ["mv log", "fast", "complete", "журнал"] }, { labelUk: "розклад", labelEn: "a schedule", anyOf: ["demand", "розклад", "schedul", "свіжість", "fresh"] }],
        sampleUk: "ON DEMAND FAST оновлює за розкладом через журнал і не подовжує кожен COMMIT, на відміну від ON COMMIT; слідкуйте, щоб FAST не падав у повний COMPLETE.",
        sampleEn: "ON DEMAND FAST refreshes on a schedule through the log and does not lengthen every COMMIT, unlike ON COMMIT; watch that FAST does not fall back to a full COMPLETE.",
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
          { kind: "mcq", promptUk: "Як зрозуміти, що оптимізатор справді взяв MV, а не базові таблиці?", promptEn: "How do you tell that the optimizer really used the MV, not the base tables?", options: ["у плані є операція rewrite матеріалізованого представлення", "якщо MV існує, вона завжди береться", "за часом менше 1 мс завжди", "за назвою колонки"], correctIndex: 0, explanationUk: "Дивіться план, не здогадуйтесь.", explanationEn: "Look at the plan, do not guess." },
          { kind: "fill", promptUk: "Допишіть дозвіл перепису на MV", promptEn: "Fill in enabling rewrite on the MV", language: "sql", code: "ENABLE QUERY ___", accepted: ["REWRITE"], caseSensitive: true, explanationUk: "Режим — ENABLE QUERY REWRITE.", explanationEn: "The mode is ENABLE QUERY REWRITE." },
          { kind: "mcq", promptUk: "Чим ризикований QUERY_REWRITE_INTEGRITY = STALE_TOLERATED в обліку грошей?", promptEn: "What is the risk of QUERY_REWRITE_INTEGRITY = STALE_TOLERATED in money accounting?", options: ["застосунок може прочитати застарілі агрегати, ніби вони свіжі", "STALE завжди забороняє читання", "rewrite тоді вимикає MV", "гроші не можна агрегувати"], correctIndex: 0, explanationUk: "Для фінансів зазвичай вимагають свіжість ENFORCED.", explanationEn: "For finance you usually require ENFORCED freshness." }
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
        conceptUk: "USER_MVIEWS показує STALE, FRESH, UNUSABLE, час останнього оновлення, чи можливий FAST. Ланцюжок MV на MV потребує порядку refresh (спочатку база, потім залежні) — DBMS_MVIEW.REFRESH з вкладеним списком або групою. UNUSABLE після DDL не можна просто FAST: потрібен повний перерахунок. Додаток, що читає STALE без політики, бреше користувачу; або пишіть час оновлення у відповідь, або блокуйте читання. Нічне вікно має вміщати найдовший COMPLETE плюс запас.",
        conceptEn: "USER_MVIEWS shows STALE, FRESH, UNUSABLE, the last refresh time, and whether FAST is possible. A chain of MVs on MVs needs a refresh order (base first, then dependents) — DBMS_MVIEW.REFRESH with a nested list or a group. UNUSABLE after DDL cannot simply FAST: a full recompute is required. An application that reads STALE with no policy lies to the user; either return the refresh time or block the read. The nightly window must fit the longest COMPLETE plus a margin.",
        code: "SELECT mview_name, staleness, last_refresh_date, fast_refreshable FROM user_mviews;",
        language: "sql",
        retrieval: [
          { kind: "mcq", promptUk: "Чому FAST після зміни стовпця базової таблиці часто неможливий?", promptEn: "Why is FAST often impossible after a base-table column change?", options: ["MV або журнал стають UNUSABLE, потрібен повний перерахунок і пересоздание", "FAST ігнорує DDL завжди", "стовпці не входять у MV", "достатньо COMMIT"], correctIndex: 0, explanationUk: "DDL ламає відповідність журналу.", explanationEn: "DDL breaks the log's correspondence." },
          { kind: "fill", promptUk: "Допишіть словник зі станом свіжості MV", promptEn: "Fill in the dictionary view with MV freshness", language: "sql", code: "SELECT mview_name, staleness FROM USER____;", accepted: ["_MVIEWS", "_MVIEW_REFRESH_TIMES"], caseSensitive: true, explanationUk: "USER_MVIEWS тримає staleness.", explanationEn: "USER_MVIEWS holds staleness." },
          { kind: "mcq", promptUk: "Як оновлювати MV_B, що читає MV_A?", promptEn: "How should you refresh MV_B that reads MV_A?", options: ["спочатку MV_A, потім MV_B, краще однією групою refresh", "спочатку B, потім A", "лише B, A сама підтягнеться", "порядок неважливий"], correctIndex: 0, explanationUk: "Залежності як у графі збірки.", explanationEn: "Dependencies are like a build graph." }
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
      { promptUk: "FAST refresh потребує…", promptEn: "FAST refresh requires…", options: ["MV log і допустиму форму запиту", "лише ON COMMIT", "вимкнений словник", "відсутність агрегатів завжди"], correctIndex: 0, explanationUk: "Інкремент з журналу.", explanationEn: "An increment from the log." },
      { promptUk: "ON COMMIT у OLTP…", promptEn: "ON COMMIT in OLTP…", options: ["робить COMMIT дорожчим", "завжди швидший за FAST ON DEMAND", "вимикає redo", "заборонений"], correctIndex: 0, explanationUk: "Свіжість на шляху запису.", explanationEn: "Freshness on the write path." },
      { promptUk: "STALE_TOLERATED для фінансового агрегату…", promptEn: "STALE_TOLERATED for a financial aggregate is…", options: ["ризикований: можна віддати застарілі суми", "обов'язковий", "єдиний режим rewrite", "вимикає MV"], correctIndex: 0, explanationUk: "Для грошей — суворіша цілісність.", explanationEn: "Stricter integrity for money." },
      { promptUk: "Після DDL MV часто стає…", promptEn: "After DDL an MV often becomes…", options: ["UNUSABLE і потребує повного перерахунку", "FAST автоматично", "FASTER", "невидимою в словнику назавжди"], correctIndex: 0, explanationUk: "Пересоздайте й COMPLETE.", explanationEn: "Rebuild and COMPLETE." }
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
        conceptUk: "RANGE за датою (продажі по місяцях) дає відкидати старі секції й читати лише потрібний період. LIST — за дискретним кодом (країна, статус). HASH рівномірно розкидає за ключем, коли немає природного діапазону, але архівувати «старе» важче. Композит RANGE-HASH: спочатку місяць, усередині хеш за id. Ключ секції має бути в майже кожному запиті й у первинному ключі (на обмеження Oracle). Помилковий ключ (секція за прізвищем, а фільтр за датою) зводить користь нанівець: будуть скануватись усі секції.",
        conceptEn: "RANGE on a date (sales by month) lets you drop old partitions and read only the needed period. LIST is for a discrete code (country, status). HASH spreads evenly by a key when there is no natural range, but archiving 'old' data is harder. Composite RANGE-HASH: month first, a hash by id inside. The partition key should appear in almost every query and in the primary key (Oracle's rule). A wrong key (partition by surname, filter by date) wipes out the benefit: every partition will be scanned.",
        code: "CREATE TABLE sales (sold_at DATE, amt NUMBER) PARTITION BY RANGE (sold_at) (\n  PARTITION p2026m01 VALUES LESS THAN (DATE '2026-02-01')\n);",
        language: "sql",
        retrieval: [
          { kind: "mcq", promptUk: "Який тип секцій найзручніший, щоб відкидати дані старше 24 місяців?", promptEn: "Which partition type is most convenient for dropping data older than 24 months?", options: ["RANGE за датою", "HASH за id", "LIST за прізвищем", "одна секція на всю таблицю"], correctIndex: 0, explanationUk: "DROP PARTITION місяця, без масового DELETE.", explanationEn: "DROP PARTITION of a month, no bulk DELETE." },
          { kind: "fill", promptUk: "Допишіть секцію за діапазоном дат", promptEn: "Fill in a date range partition", language: "sql", code: "PARTITION BY ___ (sold_at)", accepted: ["RANGE"], caseSensitive: true, explanationUk: "Тип — RANGE.", explanationEn: "The type is RANGE." },
          { kind: "mcq", promptUk: "Чому HASH за customer_id слабко допомагає звіту «продажі за березень»?", promptEn: "Why does a HASH on customer_id barely help a 'sales in March' report?", options: ["фільтр за датою не відсікає хеш-секції, читаються всі", "HASH заборонений зі звітами", "березень не є датою", "потрібен лише LIST країн"], correctIndex: 0, explanationUk: "Ключ секції має збігатись із предикатом.", explanationEn: "The partition key must match the predicate." }
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
        pointsUk: ["План показує, скільки секцій прочитано", "Не обгортайте ключ функцією", "Тип предиката має збігатись із ключем"],
        pointsEn: ["The plan shows how many partitions were read", "Do not wrap the key in a function", "The predicate type must match the key"],
        conceptUk: "Відсікання секцій (pruning) видно в плані як PARTITION RANGE SINGLE / ITERATOR і кількість секцій. Предикат має бути на ключі без обгортки: TRUNC(sold_at) = DATE '2026-03-01' часто заважає відсікти, бо функція ховає ключ — порівнюйте sold_at >= і < межі дня. Зв'язані змінні з правильним типом працюють; неявне перетворення рядка в дату може зняти pruning. Динамічний SQL з неправильною датою сканує все. Перевіряйте план на проді з реальними значеннями, не лише на порожній таблиці.",
        conceptEn: "Partition pruning shows in the plan as PARTITION RANGE SINGLE / ITERATOR and a partition count. The predicate must be on the key without a wrapper: TRUNC(sold_at) = DATE '2026-03-01' often blocks pruning because the function hides the key — compare sold_at >= and < the day bounds. Bind variables with the right type work; implicit string-to-date conversion can disable pruning. Dynamic SQL with a wrong date scans everything. Check the plan in production with real values, not only on an empty table.",
        code: "WHERE sold_at >= DATE '2026-03-01' AND sold_at < DATE '2026-04-01'",
        language: "sql",
        retrieval: [
          { kind: "mcq", promptUk: "Чому TRUNC(sold_at) = :d може прочитати всі секції?", promptEn: "Why can TRUNC(sold_at) = :d read every partition?", options: ["функція на колонці ховає ключ секції від відсікання", "TRUNC завжди прискорює pruning", "секції не працюють із датами", ":d заборонений"], correctIndex: 0, explanationUk: "Пишіть діапазон по sold_at без TRUNC на колонці.", explanationEn: "Write a range on sold_at without TRUNC on the column." },
          { kind: "fill", promptUk: "Допишіть відкритий початок дня для відсікання", promptEn: "Fill in an open day-start bound for pruning", language: "sql", code: "sold_at >= DATE '2026-03-01' AND sold_at ___ DATE '2026-04-01'", accepted: ["<", "<="], caseSensitive: true, explanationUk: "Верхня межа — наступний місяць без включення, якщо ключ — початок дня.", explanationEn: "The upper bound is the next month, exclusive, if the key is a day start." },
          { kind: "mcq", promptUk: "Де в плані шукати підтвердження pruning?", promptEn: "Where in the plan do you look for confirmation of pruning?", options: ["операція PARTITION RANGE і кількість секцій (Pstart Pstop)", "лише в часі CPU", "у розмірі SGA", "у списку грантів"], correctIndex: 0, explanationUk: "Колонки Pstart/Pstop в DBMS_XPLAN.", explanationEn: "The Pstart/Pstop columns in DBMS_XPLAN." }
        ],
        whyUk: "Як написати предикат за березень, щоб спрацювало відсікання секцій?",
        whyEn: "How do you write a March predicate so partition pruning fires?",
        ideas: [{ labelUk: "діапазон без функції на ключі", labelEn: "a range without a function on the key", anyOf: ["trunc", "функц", "function", "діапазон", "range", "sold_at"] }, { labelUk: "план Pstart", labelEn: "the Pstart plan", anyOf: ["pstart", "pstop", "prune", "partition range"] }, { labelUk: "правильний тип", labelEn: "the right type", anyOf: ["тип", "type", "bind", "перетворен", "conversion"] }],
        sampleUk: "Предикат пишуть як діапазон по ключу без TRUNC на колонці, з правильним типом; у плані мають з'явитись Pstart/Pstop, інакше читаються всі секції.",
        sampleEn: "You write a range on the key without TRUNC on the column, with the right type; Pstart/Pstop should appear in the plan, or every partition is read.",
      },
      {
        slug: "sqlf-part-maintain",
        titleUk: "Супровід: ADD, DROP, EXCHANGE, локальні індекси",
        titleEn: "Maintenance: ADD, DROP, EXCHANGE, and local indexes",
        difficulty: 3,
        pointsUk: ["ADD/INTERVAL для нового періоду, EXCHANGE або DROP для старого", "Локальні індекси дружать із DROP", "Статистика по секціях і вузькі права на DROP"],
        pointsEn: ["ADD/INTERVAL for a new period, EXCHANGE or DROP for an old one", "Local indexes get along with DROP", "Per-partition statistics and narrow DROP privileges"],
        conceptUk: "Новий місяць — ALTER TABLE ADD PARTITION (або інтервальні секції INTERVAL, що створюються самі). Старий місяць архівують EXCHANGE PARTITION у окрему таблицю або DROP після бекапу. Локальні індекси живуть на секції: DROP секції не перебудовує глобальний індекс так болісно (глобальний стає UNUSABLE, якщо не UPDATE INDEXES). Операції супроводу планують у вікно й тестують на копії: помилковий DROP — втрата місяця. Права на DROP мають бути вузькими. Статистика — по секціях, не лише глобальна, щоб оптимізатор знав розмір.",
        conceptEn: "A new month is ALTER TABLE ADD PARTITION (or INTERVAL partitions that are created by themselves). An old month is archived with EXCHANGE PARTITION into a standalone table, or DROPped after a backup. Local indexes live on the partition: DROP of a partition does not rebuild a global index as painfully (a global one becomes UNUSABLE unless UPDATE INDEXES). Maintenance is planned in a window and tested on a copy: a mistaken DROP is a lost month. DROP privileges should be narrow. Statistics should be per partition, not only global, so the optimizer knows the size.",
        code: "ALTER TABLE sales DROP PARTITION p2024m01 UPDATE INDEXES;",
        language: "sql",
        retrieval: [
          { kind: "mcq", promptUk: "Чим EXCHANGE PARTITION корисний перед архівацією?", promptEn: "How is EXCHANGE PARTITION useful before archiving?", options: ["миттєво підміняє секцію порожньою таблицею тієї ж структури, дані йдуть у архівну таблицю майже без копіювання рядків по одному", "це синонім DELETE FROM", "EXCHANGE видаляє індекси назавжди", "працює лише з HASH"], correctIndex: 0, explanationUk: "Метадані, не покрокове копіювання.", explanationEn: "Metadata, not row-by-row copy." },
          { kind: "fill", promptUk: "Допишіть оновлення індексів під час DROP", promptEn: "Fill in updating indexes during DROP", language: "sql", code: "ALTER TABLE sales DROP PARTITION p2024m01 UPDATE ___;", accepted: ["INDEXES"], caseSensitive: true, explanationUk: "UPDATE INDEXES уникає UNUSABLE глобальних індексів.", explanationEn: "UPDATE INDEXES avoids UNUSABLE global indexes." },
          { kind: "mcq", promptUk: "Чому глобальний індекс часто стає UNUSABLE після DROP секції?", promptEn: "Why does a global index often become UNUSABLE after DROP PARTITION?", options: ["він покриває всю таблицю, і частина ключів зникла без перебудови", "Oracle завжди вимикає всі індекси", "локальний індекс поводиться так само", "UNUSABLE означає успіх"], correctIndex: 0, explanationUk: "Локальний індекс падає разом із секцією чисто.", explanationEn: "A local index drops cleanly with the partition." }
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
      { promptUk: "Щоб відкидати старі місяці, зручний тип…", promptEn: "To drop old months, a convenient type is…", options: ["RANGE за датою", "HASH за прізвищем", "єдина секція", "LIST за випадковим UUID без політики"], correctIndex: 0, explanationUk: "DROP PARTITION періоду.", explanationEn: "DROP PARTITION of a period." },
      { promptUk: "TRUNC(sold_at) у предикаті часто…", promptEn: "TRUNC(sold_at) in a predicate often…", options: ["заважає pruning", "гарантує pruning", "замінює ключ секції", "створює RANGE"], correctIndex: 0, explanationUk: "Не ховайте ключ функцією.", explanationEn: "Do not hide the key with a function." },
      { promptUk: "EXCHANGE PARTITION…", promptEn: "EXCHANGE PARTITION…", options: ["швидко міняє місцями секцію й таблицю тієї ж структури", "копіює рядки по одному завжди", "є синонімом TRUNCATE бази", "працює лише в PostgreSQL"], correctIndex: 0, explanationUk: "Операція метаданих.", explanationEn: "A metadata operation." },
      { promptUk: "Глобальний індекс після DROP секції без UPDATE INDEXES…", promptEn: "A global index after DROP PARTITION without UPDATE INDEXES…", options: ["часто UNUSABLE", "стає локальним", "прискорюється", "видаляється разом із базою"], correctIndex: 0, explanationUk: "Оновіть індекси або тримайте локальні.", explanationEn: "Update indexes or keep them local." }
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
        conceptUk: "DBMS_SQL_MONITOR і звіт SQL Monitor показують фактичний (не лише оцінений) план: скільки рядків пройшло кожну операцію, час CPU і очікувань, ступінь паралелізму, переповнення TEMP. Це цінніше за EXPLAIN PLAN, який бачить оцінки оптимізатора. Монітор вмикається для «довгих» запитів або на вимогу (hint MONITOR). Читайте розрив estimated vs actual: якщо оцінка 10, а факт 10 мільйонів — проблема статистики або предиката. Не лишайте MONITOR на всіх коротких OLTP-запитах постійно: це накладні витрати.",
        conceptEn: "DBMS_SQL_MONITOR and the SQL Monitor report show the actual (not only estimated) plan: how many rows passed each operation, CPU and wait time, the degree of parallelism, TEMP spills. That is more valuable than EXPLAIN PLAN, which sees the optimizer's estimates. The monitor turns on for 'long' queries or on demand (the MONITOR hint). Read the estimated-vs-actual gap: if the estimate is 10 and the fact is 10 million, the problem is statistics or a predicate. Do not leave MONITOR on every short OLTP query all the time: it has overhead.",
        code: "SELECT DBMS_SQL_MONITOR.REPORT_SQL_MONITOR(sql_id => :id, type => 'TEXT') FROM dual;",
        language: "sql",
        retrieval: [
          { kind: "mcq", promptUk: "Чим SQL Monitor корисніший за звичайний EXPLAIN PLAN?", promptEn: "How is SQL Monitor more useful than a plain EXPLAIN PLAN?", options: ["він показує фактичні рядки й час виконання, а не лише оцінки", "він коротший за текст", "EXPLAIN заборонений у 19c", "монітор замінює статистику"], correctIndex: 0, explanationUk: "Факт проти прогнозу.", explanationEn: "Fact versus forecast." },
          { kind: "fill", promptUk: "Допишіть підказку увімкнути монітор на запиті", promptEn: "Fill in the hint that turns the monitor on for a query", language: "sql", code: "SELECT /*+ ___ */ ...", accepted: ["MONITOR"], caseSensitive: true, explanationUk: "Хінт — MONITOR.", explanationEn: "The hint is MONITOR." },
          { kind: "mcq", promptUk: "Що підозрювати, якщо оцінка 12 рядків, а факт 8 мільйонів?", promptEn: "What should you suspect if the estimate is 12 rows and the actual is 8 million?", options: ["застарілу або невідповідну статистику, або прихований предикат", "що монітор зламаний", "що індекс завжди гірший", "що TEMP не існує"], correctIndex: 0, explanationUk: "Спочатку розрив кардинальності.", explanationEn: "Cardinality gaps first." }
        ],
        whyUk: "Як підтвердити, що хеш-з'єднання роздулось через погану оцінку?",
        whyEn: "How do you confirm that a hash join ballooned because of a bad estimate?",
        ideas: [{ labelUk: "факт проти оцінки", labelEn: "actual versus estimate", anyOf: ["actual", "estimate", "монітор", "monitor", "рядк"] }, { labelUk: "TEMP spill", labelEn: "a TEMP spill", anyOf: ["temp", "spill", "час", "time", "cpu"] }, { labelUk: "не лише EXPLAIN", labelEn: "not EXPLAIN alone", anyOf: ["explain", "оцінк", "estimate", "факт"] }],
        sampleUk: "SQL Monitor показує фактичні рядки й переповнення TEMP на хеш-з'єднанні; розрив із оцінкою EXPLAIN вказує на статистику, чого сам EXPLAIN не видно.",
        sampleEn: "SQL Monitor shows actual rows and TEMP spills on a hash join; the gap versus the EXPLAIN estimate points at statistics, which EXPLAIN alone cannot see.",
      },
      {
        slug: "sqlf-ash-waits",
        titleUk: "ASH і очікування: де реально стоїть сеанс",
        titleEn: "ASH and waits: where the session actually stands",
        difficulty: 3,
        pointsUk: ["ASH показує, на чому сеанси проводили час", "ON CPU проти I/O проти блокувань — різні ліки", "Один знімок слабший за період"],
        pointsEn: ["ASH shows what sessions spent time on", "ON CPU versus I/O versus locks need different remedies", "One snapshot is weaker than a period"],
        conceptUk: "Active Session History раз на секунду знімає активні сеанси: event очікування, SQL_ID, об'єкт, P1/P2. За вибіркою видно, чи час іде на user I/O, на блокировки (enq: TX), на CPU (ON CPU — не event). Одна вибірка — не вирок; дивіться період і викиди. V$SESSION.EVENT — зараз, ASH — історія. «Все повільно» без класу очікувань — здогад. Корелюйте SQL_ID з монітором. Ліцензійні опції Diagnostic/Tuning Pack стосуються частини цих знімків — знайте, що дозволено.",
        conceptEn: "Active Session History samples active sessions once a second: the wait event, SQL_ID, the object, P1/P2. The sample shows whether time goes to user I/O, to locks (enq: TX), or to CPU (ON CPU is not an event). One sample is not a verdict; look at a period and at spikes. V$SESSION.EVENT is now, ASH is history. 'Everything is slow' with no wait class is a guess. Correlate SQL_ID with the monitor. Diagnostic/Tuning Pack licensing applies to some of these snapshots — know what is allowed.",
        code: "SELECT event, sql_id, COUNT(*) FROM v$active_session_history\nWHERE sample_time > systimestamp - interval '15' minute\nGROUP BY event, sql_id ORDER BY 3 DESC;",
        language: "sql",
        retrieval: [
          { kind: "mcq", promptUk: "Якщо ASH показує enq: TX row lock, перший крок який?", promptEn: "If ASH shows enq: TX row lock, what is the first step?", options: ["знайти, хто тримає блокування і який SQL, а не збільшувати пул з'єднань наосліп", "одразу додати індекси на всі колонки", "перезапустити інстанс", "вимкнути ASH"], correctIndex: 0, explanationUk: "Блокування лікують власника блокування.", explanationEn: "Locks are cured by the lock holder." },
          { kind: "fill", promptUk: "Допишіть джерело історії активних сеансів", promptEn: "Fill in the source of active session history", language: "sql", code: "SELECT event, sql_id, count(*) FROM V$ACTIVE_SESSION____ GROUP BY event, sql_id;", accepted: ["_HISTORY"], caseSensitive: true, explanationUk: "Подання — V$ACTIVE_SESSION_HISTORY.", explanationEn: "The view is V$ACTIVE_SESSION_HISTORY." },
          { kind: "mcq", promptUk: "Що означає велика частка часу ON CPU без event очікування?", promptEn: "What does a large share of time ON CPU with no wait event mean?", options: ["сеанс рахує або сканує на процесорі: дивіться план і кардинальність, не «диск повільний»", "диск точно зламаний", "мережа точно винна", "ASH не вміє CPU"], correctIndex: 0, explanationUk: "CPU — теж діагноз, не відсутність проблеми.", explanationEn: "CPU is also a diagnosis, not the absence of a problem." }
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
        conceptUk: "Оптимізатор заглядає в значення байнда при першому жорсткому розборі (bind peeking) і будує план під нього. Якщо перший виклик — рідкісне значення («один рядок, індекс»), а далі типове («половина таблиці»), план лишається невідповідним. Adaptive Cursor Sharing (ACS) може завести кілька дочірніх курсорів під різні діапазони, якщо увімкнено й є гістограми. Ліки: гістограми на перекіс, ACS, інколи два SQL для різних селективностей, не «прибити» один план назавжди без виміру. EXPLAIN з байндом і без може розходитись із продом.",
        conceptEn: "The optimizer peeks at the bind value on the first hard parse (bind peeking) and builds a plan for it. If the first call is a rare value ('one row, an index') and later ones are typical ('half the table'), the plan stays wrong. Adaptive Cursor Sharing (ACS) may keep several child cursors for different ranges, if it is on and histograms exist. Remedies: histograms on a skew, ACS, sometimes two SQL statements for different selectivities — not 'pinning' one plan forever without a measurement. EXPLAIN with and without a bind can diverge from production.",
        code: "SELECT child_number, is_bind_aware, is_bind_sensitive, executions\nFROM v$sql WHERE sql_id = :id;",
        language: "sql",
        retrieval: [
          { kind: "mcq", promptUk: "Чому перший виклик із рідкісним id=1 псує подальші з id типового клієнта?", promptEn: "Why does a first call with rare id=1 spoil later ones with a typical customer id?", options: ["план з пікінгу під рідкісне значення лишається в курсорі", "байнди заборонені після першого виклику", "ACS завжди це виправляє без гістограм", "рідкісне значення ігнорується"], correctIndex: 0, explanationUk: "Один батьківський курсор, один план — поки ACS не розділить.", explanationEn: "One parent cursor, one plan — until ACS splits." },
          { kind: "fill", promptUk: "Допишіть назву механізму кількох дочірніх курсорів", promptEn: "Fill in the name of the several-child-cursors mechanism", language: "sql", code: "Adaptive ___ Sharing", accepted: ["Cursor"], caseSensitive: true, explanationUk: "Adaptive Cursor Sharing.", explanationEn: "Adaptive Cursor Sharing." },
          { kind: "mcq", promptUk: "Навіщо гістограма на колонці зі сильним перекосом для байндів?", promptEn: "Why a histogram on a strongly skewed column for binds?", options: ["щоб оптимізатор знав різні селективності значень і ACS міг розділити курсори", "гістограма вимикає peeking назавжди", "це потрібно лише для NUMBER", "гістограма замінює індекс"], correctIndex: 0, explanationUk: "Перекіс без гістограми виглядає як середня селективність.", explanationEn: "Skew without a histogram looks like average selectivity." }
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
      { promptUk: "SQL Monitor на відміну від EXPLAIN…", promptEn: "Unlike EXPLAIN, SQL Monitor…", options: ["показує фактичні рядки й час", "лише оцінки оптимізатора", "не вміє паралелізм", "замінює ASH"], correctIndex: 0, explanationUk: "Факт виконання.", explanationEn: "Execution facts." },
      { promptUk: "Велика частка enq: TX в ASH означає…", promptEn: "A large share of enq: TX in ASH means…", options: ["блокування рядків: шукайте власника", "обов'язково повільний диск", "нестачу CPU завжди", "потребу вимкнути MV"], correctIndex: 0, explanationUk: "Інший клас очікування — інші ліки.", explanationEn: "A different wait class, a different remedy." },
      { promptUk: "Bind peeking небезпечний, коли…", promptEn: "Bind peeking is dangerous when…", options: ["перше значення нетипове, а план лишається", "байндів немає", "таблиця порожня завжди", "увімкнено лише COMPLETE"], correctIndex: 0, explanationUk: "Перекіс і перший розбір.", explanationEn: "Skew and the first parse." },
      { promptUk: "Розрив estimate 10 проти actual мільйонів…", promptEn: "A gap of estimate 10 versus actual millions…", options: ["вказує на статистику або предикат", "доводить, що монітор зламаний", "означає успішний pruning", "вимагає вимкнути ACS"], correctIndex: 0, explanationUk: "Спочатку кардинальність.", explanationEn: "Cardinality first." }
    ],
  )
];

const insertions: Record<string, LessonContent[]> = {};

export function expandSqlFundamentals(course: CourseContent): CourseContent {
  return expandCourse(course, insertions, newUnits);
}
