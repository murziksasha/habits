/**
 * Canonical Skill and Learning Objectives Registry (SPEC Waves 1 & 4–7).
 * Maps every course and key units across all 35 courses to concrete, observable actions,
 * prerequisites, common failure modes, evidence criteria, and practical outcomes.
 */

import { type CourseSlug, COURSE_SLUGS } from "./courses.js";

export type CommonSkillError = {
  code: string;
  labelUk: string;
  labelEn: string;
  fixUk: string;
  fixEn: string;
};

export type SkillObjective = {
  id: string; // e.g. "html.semantics.landmarks", "js.async.event_loop"
  courseSlug: CourseSlug;
  unitSlug: string;
  titleUk: string;
  titleEn: string;
  actionUk: string;
  actionEn: string;
  prerequisites: string[];
  commonErrors: CommonSkillError[];
  evidenceCriteria: string[];
  relatedCourses: CourseSlug[];
  practicalOutcomeUk: string;
  practicalOutcomeEn: string;
};

export const CORE_SKILL_OBJECTIVES: readonly SkillObjective[] = [
  // 1. programming
  {
    id: "prog.html.structure",
    courseSlug: "programming",
    unitSlug: "html-intro",
    titleUk: "Структура HTML-документа та базові теги",
    titleEn: "HTML Document Structure & Core Tags",
    actionUk: "Створювати валідну розмітку веб-сторінки з коректним вкладенням заголовків, списків та посилань",
    actionEn: "Author valid web page markup with correctly nested headings, lists, and anchors",
    prerequisites: [],
    commonErrors: [
      {
        code: "unclosed_tag",
        labelUk: "Незакритий тег",
        labelEn: "Unclosed tag",
        fixUk: "Перевірте парні теги та закрийте відкритий елемент відповідним </tag>",
        fixEn: "Check paired elements and close opened tags with matching </tag>",
      },
      {
        code: "invalid_nesting",
        labelUk: "Невірне вкладення тегів",
        labelEn: "Invalid tag nesting",
        fixUk: "Елементи мають закриватися у зворотному порядку до відкриття (LIFO)",
        fixEn: "Close nested elements in reverse order of opening (LIFO)",
      },
    ],
    evidenceCriteria: [
      "Розмітка містить коректний doctype, html, head та body",
      "Заголовки h1-h6 дотримуються логічної ієрархії без пропусків рівнів",
    ],
    relatedCourses: ["html_semantics", "web_accessibility"],
    practicalOutcomeUk: "Автономне створення базового каркаса статичної сторінки",
    practicalOutcomeEn: "Independently authoring a valid static page skeleton",
  },

  // 2. html_semantics
  {
    id: "html.semantics.landmarks",
    courseSlug: "html_semantics",
    unitSlug: "landmarks",
    titleUk: "Орієнтири доступності (Landmarks)",
    titleEn: "Accessible Landmarks & Outline",
    actionUk: "Розбивати сторінку на орієнтири (main, nav, header, footer) для читачів з екрана",
    actionEn: "Structure page into screen-reader accessible landmarks (main, nav, header, footer)",
    prerequisites: ["prog.html.structure"],
    commonErrors: [
      {
        code: "multiple_main",
        labelUk: "Кілька елементів <main> без прихованого атрибута",
        labelEn: "Multiple visible <main> elements",
        fixUk: "Документ повинен містити рівно один видимий елемент <main>",
        fixEn: "A document must contain exactly one visible <main> landmark",
      },
    ],
    evidenceCriteria: [
      "Єдиний <main> у документі",
      "Навігаційні меню огорнуті в <nav> з унікальними aria-label",
    ],
    relatedCourses: ["web_accessibility", "react_fundamentals"],
    practicalOutcomeUk: "Доступна структура сторінки, готова для проходження аудиту WCAG",
    practicalOutcomeEn: "Accessible page structure passing baseline WCAG landmark audits",
  },

  // 3. css_layout
  {
    id: "css.flexbox.alignment",
    courseSlug: "css_layout",
    unitSlug: "flexbox-axes",
    titleUk: "Вирівнювання по осях у Flexbox та Grid",
    titleEn: "Axis Alignment in Flexbox & CSS Grid",
    actionUk: "Керувати розподілом простору вздовж головної та поперечної осей без фіксованих піксельних відступів",
    actionEn: "Control space distribution along main and cross axes without brittle fixed pixel offsets",
    prerequisites: ["prog.html.structure"],
    commonErrors: [
      {
        code: "axis_confusion",
        labelUk: "Плутанина між justify-content та align-items",
        labelEn: "Justify-content vs align-items confusion",
        fixUk: "justify-content керує головною віссю (main), align-items — поперечною (cross)",
        fixEn: "justify-content aligns along main-axis; align-items along cross-axis",
      },
    ],
    evidenceCriteria: [
      "Елементи зберігають адаптивність при зміні ширини viewport від 320px до 1920px",
    ],
    relatedCourses: ["frontend_performance", "react_fundamentals"],
    practicalOutcomeUk: "Створення стійких адаптивних інтерфейсних сіток",
    practicalOutcomeEn: "Building robust adaptive UI layouts without overflow glitches",
  },

  // 4. js_fundamentals
  {
    id: "js.async.event_loop",
    courseSlug: "js_fundamentals",
    unitSlug: "async-await",
    titleUk: "Event Loop, черга мікрозадач та Promises",
    titleEn: "Event Loop, Microtask Queue & Promises",
    actionUk: "Передбачати та керувати порядком виконання синхронного коду, мікротасок та макротасок",
    actionEn: "Predict and control execution order across synchronous code, microtasks, and macrotasks",
    prerequisites: ["prog.html.structure"],
    commonErrors: [
      {
        code: "unhandled_rejection",
        labelUk: "Необроблений виняток у промісі",
        labelEn: "Unhandled promise rejection",
        fixUk: "Завжди додавайте .catch() або огинайте await блоком try/catch",
        fixEn: "Always chain .catch() or wrap await calls in try/catch blocks",
      },
    ],
    evidenceCriteria: [
      "Коректне передбачення послідовності виведення для Promise.then vs setTimeout",
      "Безпечна обробка відхилених промісів без втрати контексту помилки",
    ],
    relatedCourses: ["node_fundamentals", "react_fundamentals", "browser_web_apis"],
    practicalOutcomeUk: "Написання передбачуваного асинхронного коду без гонок запитів",
    practicalOutcomeEn: "Writing deterministic asynchronous code free of race conditions",
  },

  // 5. typescript
  {
    id: "ts.types.narrowing",
    courseSlug: "typescript",
    unitSlug: "narrowing",
    titleUk: "Звуження типів (Narrowing) та Discriminated Unions",
    titleEn: "Type Narrowing & Discriminated Unions",
    actionUk: "Моделювати доменні стани через дискриміновані об'єднання без використання `any`",
    actionEn: "Model domain state via discriminated unions without escaping to `any`",
    prerequisites: ["js.async.event_loop"],
    commonErrors: [
      {
        code: "any_escape_hatch",
        labelUk: "Необґрунтоване використання `any`",
        labelEn: "Unsound escape with `any`",
        fixUk: "Використовуйте `unknown` разом з type guard або дискримінатор стану (tag/type)",
        fixEn: "Use `unknown` with a type guard or define a tagged union property",
      },
    ],
    evidenceCriteria: [
      "Компілятор підтверджує звуження типу всередині гілки перевірки",
      "Відсутність кастів через `as any` у виробничому коді",
    ],
    relatedCourses: ["react_fundamentals", "express_fundamentals", "software_testing"],
    practicalOutcomeUk: "Типобезпечне моделювання складних бізнес-помилок та відповідей API",
    practicalOutcomeEn: "Type-safe modeling of complex business domain states and API contracts",
  },

  // 6. react_fundamentals
  {
    id: "react.hooks.lifecycle",
    courseSlug: "react_fundamentals",
    unitSlug: "hooks-state-effects",
    titleUk: "Хуки стану, ефекти та синхронізація компонентів",
    titleEn: "State Hooks, Effects & Component Synchronization",
    actionUk: "Ізолювати побічні ефекти, правильно вказувати залежності та очищати підписки у useEffect",
    actionEn: "Isolate side-effects, specify accurate dependency arrays, and cleanly unsubscribe in useEffect",
    prerequisites: ["ts.types.narrowing"],
    commonErrors: [
      {
        code: "missing_effect_cleanup",
        labelUk: "Відсутність функції очищення (cleanup) в ефекті",
        labelEn: "Missing effect cleanup callback",
        fixUk: "Повертайте функцію скасування таймера/слухача подій з useEffect",
        fixEn: "Return a cleanup function tearing down listeners, timers, or abort controllers",
      },
    ],
    evidenceCriteria: [
      "Ефект не викликає нескінченних повторних рендерів",
      "Підписки та таймаути своєчасно скасовуються при демонтажі",
    ],
    relatedCourses: ["nextjs_fullstack", "frontend_performance"],
    practicalOutcomeUk: "Стабільні компоненти без витоків пам'яті та застарілих замикань",
    practicalOutcomeEn: "Memory-leak-free interactive components with resilient synchronization",
  },

  // 7. nextjs_fullstack
  {
    id: "nextjs.rsc.actions",
    courseSlug: "nextjs_fullstack",
    unitSlug: "server-actions",
    titleUk: "React Server Components та Server Actions",
    titleEn: "React Server Components & Server Actions",
    actionUk: "Розділяти клієнтські та серверні межі, мутувати дані через безпечні Server Actions",
    actionEn: "Separate client and server boundaries, mutating data via secure Server Actions",
    prerequisites: ["react.hooks.lifecycle"],
    commonErrors: [
      {
        code: "server_leak_to_client",
        labelUk: "Витік серверних секретів або модулів у клієнтський бандл",
        labelEn: "Server secrets or libraries leaked into client bundle",
        fixUk: "Використовуйте директиву 'server-only' та маркуйте клієнтські компоненти 'use client'",
        fixEn: "Import 'server-only' for database modules and isolate UI leaves with 'use client'",
      },
    ],
    evidenceCriteria: [
      "Клієнтський бандл не містить підключень до бази даних чи приватних ключів",
    ],
    relatedCourses: ["rest_api_design", "web_security"],
    practicalOutcomeUk: "Побудова продуктивних повностекових застосунків з мінімальним JS на клієнті",
    practicalOutcomeEn: "Shipping minimal-bundle full-stack web applications with high security",
  },

  // 8. node_fundamentals
  {
    id: "node.streams.buffers",
    courseSlug: "node_fundamentals",
    unitSlug: "streams-buffers",
    titleUk: "Потоки (Streams), буфери та зворотний тиск (Backpressure)",
    titleEn: "Streams, Buffers & Backpressure Handling",
    actionUk: "Обробляти великі масиви файлів та мережевих даних потоково з повагою до пам'яті процесу",
    actionEn: "Process large file and network payloads streamingly with bounded memory consumption",
    prerequisites: ["js.async.event_loop"],
    commonErrors: [
      {
        code: "unbounded_buffer_load",
        labelUk: "Завантаження гігабайтних файлів у пам'ять цілком через fs.readFile",
        labelEn: "Unbounded memory buffer exhaustion via fs.readFile",
        fixUk: "Використовуйте fs.createReadStream та pipeline для потокового читання",
        fixEn: "Stream data with fs.createReadStream and pipe with pipeline()",
      },
    ],
    evidenceCriteria: [
      "Споживання пам'яті залишається константним незалежно від розміру вхідного файлу",
    ],
    relatedCourses: ["express_fundamentals", "sysadmin"],
    practicalOutcomeUk: "Високонавантажені сервіси, що не падають через помилку Out-Of-Memory",
    practicalOutcomeEn: "High-throughput services resilient against OOM crashes",
  },

  // 9. express_fundamentals
  {
    id: "express.middleware.pipeline",
    courseSlug: "express_fundamentals",
    unitSlug: "middleware-pipeline",
    titleUk: "Ланцюжок проміжного ПЗ (Middleware) та централізовані помилки",
    titleEn: "Middleware Pipeline & Centralized Error Handling",
    actionUk: "Організовувати конвеєр валідації, авторизації та обробки помилок за стандартом 4-аргументних обробників",
    actionEn: "Compose validation, authentication, and error handling pipelines using 4-argument error catchers",
    prerequisites: ["node.streams.buffers"],
    commonErrors: [
      {
        code: "missing_next_call",
        labelUk: "Зависання HTTP-запиту через пропущений виклик next()",
        labelEn: "Hanging request caused by missing next() invocation",
        fixUk: "Завжди або завершуйте відповідь (res.send/json), або викликайте next() чи next(err)",
        fixEn: "Always either complete the response or invoke next(err)",
      },
    ],
    evidenceCriteria: [
      "Жоден запит не залишається без відповіді при виникненні внутрішнього винятку",
    ],
    relatedCourses: ["rest_api_design", "web_security"],
    practicalOutcomeUk: "Надійна маршрутизація API з єдиним форматом діагностики",
    practicalOutcomeEn: "Reliable API endpoints with standardized error responses",
  },

  // 10. rest_api_design
  {
    id: "rest.contracts.idempotency",
    courseSlug: "rest_api_design",
    unitSlug: "idempotency-status-codes",
    titleUk: "Ідемпотентність, статус-коди та семантика HTTP",
    titleEn: "HTTP Semantics, Idempotency & Error Contracts",
    actionUk: "Проєктувати зрозумілі RESTful контракти з правильним вибором 200, 201, 204, 400, 401, 403, 404, 409",
    actionEn: "Design clean RESTful contracts with rigorous usage of HTTP verbs, idempotency, and status codes",
    prerequisites: ["express.middleware.pipeline"],
    commonErrors: [
      {
        code: "always_200_ok",
        labelUk: "Повернення статусу 200 OK з полем { error: true } у тілі",
        labelEn: "Returning 200 OK with error payload in body",
        fixUk: "Використовуйте семантичні статус-коди 4xx/5xx для помилок запиту",
        fixEn: "Use genuine 4xx and 5xx HTTP status codes matching the error category",
      },
    ],
    evidenceCriteria: [
      "Повторний виклик PUT/DELETE з однаковим ключем є ідемпотентним і безпечним",
    ],
    relatedCourses: ["nextjs_fullstack", "web_security"],
    practicalOutcomeUk: "Передбачувані публічні та внутрішні API, придатні для автоматичної інтеграції",
    practicalOutcomeEn: "Predictable API contracts effortlessly integrated by frontend and mobile clients",
  },

  // 11. go_fundamentals
  {
    id: "go.concurrency.channels",
    courseSlug: "go_fundamentals",
    unitSlug: "goroutines-channels",
    titleUk: "Конкурентність у Go: Goroutines, Channels та Select",
    titleEn: "Go Concurrency: Goroutines, Channels & Select",
    actionUk: "Координувати паралельні завдання через канали та контекст (context.Context) без витоків горутин",
    actionEn: "Coordinate concurrent workloads via channels and context.Context without leaking goroutines",
    prerequisites: ["node.streams.buffers"],
    commonErrors: [
      {
        code: "goroutine_leak",
        labelUk: "Витік горутини через блокування на небуферизованому каналі",
        labelEn: "Goroutine leak blocked on unread channel send",
        fixUk: "Використовуйте select з ctx.Done() або буферизований канал для скасування",
        fixEn: "Always select on ctx.Done() or ensure consumers never exit prematurely",
      },
    ],
    evidenceCriteria: [
      "Go race detector (-race) підтверджує відсутність race conditions під час тестів",
    ],
    relatedCourses: ["devops", "applied_algorithms"],
    practicalOutcomeUk: "Швидкі та стабільні мікросервіси з низьким споживанням оперативної пам'яті",
    practicalOutcomeEn: "High-performance services with zero deadlocks and bounded memory",
  },

  // 12. embedded_cpp
  {
    id: "cpp.pointers.memory",
    courseSlug: "embedded_cpp",
    unitSlug: "pointers-memory",
    titleUk: "Керування пам'яттю, вказівники та апаратні регістри",
    titleEn: "Memory Management, Pointers & Hardware Registers",
    actionUk: "Працювати з пам'яттю через raw/smart pointers, дотримуючись суворих меж буферів без UB",
    actionEn: "Safely navigate raw and smart pointers, respecting buffer boundaries without undefined behavior",
    prerequisites: ["prog.html.structure"],
    commonErrors: [
      {
        code: "dangling_pointer",
        labelUk: "Використання висячого вказівника (dangling pointer) або Use-After-Free",
        labelEn: "Use-after-free or dangling pointer access",
        fixUk: "Зануляйте вказівники після видалення або використовуйте RAII (std::unique_ptr)",
        fixEn: "Adopt RAII and smart pointers, or explicitly nullify dangling references",
      },
    ],
    evidenceCriteria: [
      "AddressSanitizer не фіксує витоків пам'яті чи виходу за межі масивів",
    ],
    relatedCourses: ["sysadmin", "software_testing"],
    practicalOutcomeUk: "Надійні системні та вбудовані програми для критичного обладнання",
    practicalOutcomeEn: "Hardened embedded software free of segmentation faults and memory corruption",
  },

  // 13. sysadmin
  {
    id: "sysadmin.containers.isolation",
    courseSlug: "sysadmin",
    unitSlug: "containers-systemd",
    titleUk: "Локальна експлуатація контейнерів (Podman/Docker) та Systemd",
    titleEn: "Local Container Management & Systemd Units",
    actionUk: "Запускати ізольовані процеси через rootless контейнери, керувати демонами через systemctl",
    actionEn: "Operate isolated processes via rootless containers and manage service units via systemctl",
    prerequisites: ["embedded_cpp"],
    commonErrors: [
      {
        code: "root_in_container",
        labelUk: "Запуск застосунку в контейнері від імені суперкористувача root",
        labelEn: "Running unprivileged app as root inside container",
        fixUk: "Задавайте USER у Dockerfile або прапорець --user у Podman/Docker",
        fixEn: "Define a non-root USER in Dockerfile or use rootless container namespaces",
      },
    ],
    evidenceCriteria: [
      "Сервіс автоматично піднімається після перезапуску хоста через systemd",
    ],
    relatedCourses: ["devops", "web_security"],
    practicalOutcomeUk: "Безпечна локальна інфраструктура розробки без привілеїв root",
    practicalOutcomeEn: "Hardened development workstation with reproducible containerized services",
  },

  // 14. devops
  {
    id: "devops.ci_cd.k8s",
    courseSlug: "devops",
    unitSlug: "ci-cd-pipelines",
    titleUk: "CI/CD пайплайни, доставка коду та оркестрація",
    titleEn: "CI/CD Delivery Pipelines & Orchestration",
    actionUk: "Автоматизувати тестування, збирання артефактів та розгортання в кластер Kubernetes без downtime",
    actionEn: "Automate testing, container artifact build, and zero-downtime rolling deployments",
    prerequisites: ["sysadmin.containers.isolation"],
    commonErrors: [
      {
        code: "missing_readiness_probe",
        labelUk: "Відсутність перевірки готовності (readinessProbe)",
        labelEn: "Missing Kubernetes readinessProbe",
        fixUk: "Налаштуйте readinessProbe, щоб трафік не йшов на контейнер до завершення ініціалізації",
        fixEn: "Configure liveness and readiness probes to prevent 502 routing during rollouts",
      },
    ],
    evidenceCriteria: [
      "Пайплайн зупиняється на першому впавшому тесті без викатки зіпсованого білда",
    ],
    relatedCourses: ["llmops", "web_security"],
    practicalOutcomeUk: "Безперервна доставка якісного коду на прод із миттєвим відкатом",
    practicalOutcomeEn: "Automated continuous delivery with automated rollback capabilities",
  },

  // 15. sql_fundamentals
  {
    id: "sql.joins.aggregates",
    courseSlug: "sql_fundamentals",
    unitSlug: "aggregates",
    titleUk: "Агрегація даних, GROUP BY та фільтрація HAVING",
    titleEn: "Data Aggregation, GROUP BY & HAVING Filters",
    actionUk: "Складати аналітичні запити з групуванням, розрізняючи WHERE і HAVING",
    actionEn: "Construct analytical queries with grouping, clearly distinguishing WHERE from HAVING",
    prerequisites: ["prog.html.structure"],
    commonErrors: [
      {
        code: "where_having_confusion",
        labelUk: "Використання WHERE замість HAVING для агрегатних функцій",
        labelEn: "Using WHERE instead of HAVING for aggregate conditions",
        fixUk: "Фільтруйте сирі рядки у WHERE, а результати COUNT/SUM/AVG — у HAVING",
        fixEn: "Filter source rows in WHERE; filter aggregate results in HAVING",
      },
    ],
    evidenceCriteria: [
      "Запит повертає ідентичний результат на кількох тестових наборах даних",
    ],
    relatedCourses: ["postgresql_apps", "express_fundamentals"],
    practicalOutcomeUk: "Швидке та точне вилучення підсумкових метрик з бази даних",
    practicalOutcomeEn: "Accurate extraction of business metrics and reporting aggregates",
  },

  // 16. postgresql_apps
  {
    id: "pg.indexes.jsonb",
    courseSlug: "postgresql_apps",
    unitSlug: "indexes-jsonb",
    titleUk: "Індексація (B-Tree, GIN) та запити до JSONB",
    titleEn: "PostgreSQL Indexing (B-Tree, GIN) & JSONB Queries",
    actionUk: "Оптимізувати швидкість запитів через аналіз EXPLAIN (ANALYZE) та створення GIN-індексів",
    actionEn: "Optimize query execution via EXPLAIN ANALYZE and specialized index creation",
    prerequisites: ["sql.joins.aggregates"],
    commonErrors: [
      {
        code: "sequential_scan_on_jsonb",
        labelUk: "Повний скан таблиці (Seq Scan) при пошуку всередині JSONB-поля",
        labelEn: "Sequential table scan on nested JSONB query",
        fixUk: "Створіть GIN-індекс за допомогою оператора jsonb_path_ops",
        fixEn: "Create a GIN index on the target column using jsonb_path_ops",
      },
    ],
    evidenceCriteria: [
      "План виконання демонструє Index Scan замість дорогого Seq Scan на мільйоні рядків",
    ],
    relatedCourses: ["nextjs_fullstack", "devops"],
    practicalOutcomeUk: "Масштабована робота реляційної бази даних під високим навантаженням",
    practicalOutcomeEn: "High-performance database operations handling millions of records",
  },

  // 17. applied_algorithms
  {
    id: "algo.graphs.traversal",
    courseSlug: "applied_algorithms",
    unitSlug: "graph-algorithms",
    titleUk: "Обхід графів (BFS / DFS) та пошук найкоротшого шляху",
    titleEn: "Graph Traversals (BFS / DFS) & Shortest Path",
    actionUk: "Застосовувати алгоритми пошуку в ширину та глибину для аналізу мереж та дерев залежностей",
    actionEn: "Apply breadth-first and depth-first searches to analyze dependency graphs and networks",
    prerequisites: ["ts.types.narrowing"],
    commonErrors: [
      {
        code: "infinite_cycle_visit",
        labelUk: "Зациклення при обході графа з циклами",
        labelEn: "Infinite cycle loop during cyclic graph traversal",
        fixUk: "Зберігайте множину відвіданих вершин (Set<NodeId>)",
        fixEn: "Track visited nodes in a Set to guard against cycles",
      },
    ],
    evidenceCriteria: [
      "Алгоритм знаходить найкоротший шлях за O(V + E) операцій",
    ],
    relatedCourses: ["software_testing", "chess"],
    practicalOutcomeUk: "Оптимальне розв'язання задач маршрутизації та топологічного сортування",
    practicalOutcomeEn: "Optimal resolution of routing, topological ordering, and scheduling problems",
  },

  // 18. software_testing
  {
    id: "test.pyramid.integration",
    courseSlug: "software_testing",
    unitSlug: "integration-testing",
    titleUk: "Піраміда тестування, ізоляція та інтеграційні тести",
    titleEn: "Test Pyramid, Test Doubles & Integration Assertions",
    actionUk: "Писати стійкі інтеграційні тести без надлишкового використання mock-об'єктів",
    actionEn: "Author resilient integration suites balancing unit mocks with real database containers",
    prerequisites: ["express.middleware.pipeline"],
    commonErrors: [
      {
        code: "mocking_everything",
        labelUk: "Надлишкове мокування, що тестує сам mock замість поведінки",
        labelEn: "Excessive mocking verifying test doubles rather than behavior",
        fixUk: "Використовуйте реальні сутності або in-memory бази замість мокування доменної логіки",
        fixEn: "Assert against real observable inputs and outputs rather than internal mock calls",
      },
    ],
    evidenceCriteria: [
      "Тестовий набір виявляє внесені штучні дефекти (мутаційне тестування)",
    ],
    relatedCourses: ["qa_theory", "devops"],
    practicalOutcomeUk: "Впевненість у відсутності регресій при кожному випуску продукту",
    practicalOutcomeEn: "Regression-free deployments guarded by reliable automated suites",
  },

  // 19. qa_theory
  {
    id: "qa.lifecycle.bug_reports",
    courseSlug: "qa_theory",
    unitSlug: "defect-lifecycle",
    titleUk: "Життєвий цикл дефекту, тест-кейси та пріоритезація",
    titleEn: "Defect Lifecycle, Test Cases & Triage Severity",
    actionUk: "Складати чіткі баг-репорти з кроками відтворення, фактичним і очікуваним результатом",
    actionEn: "Document clear bug reports with minimal reproduction steps, severity, and root cause context",
    prerequisites: [],
    commonErrors: [
      {
        code: "unreproducible_steps",
        labelUk: "Неповні кроки відтворення у звіті про помилку",
        labelEn: "Missing environmental context or non-reproducible steps",
        fixUk: "Вказуйте конкретні вхідні дані, версію браузера/ОС та чисті передумови",
        fixEn: "Specify exact input payloads, prerequisites, and platform environment",
      },
    ],
    evidenceCriteria: [
      "Баг-репорт однозначно відтворюється іншим інженером з першої спроби",
    ],
    relatedCourses: ["software_testing", "logic"],
    practicalOutcomeUk: "Ефективна комунікація між тестувальниками та розробниками без зайвих зустрічей",
    practicalOutcomeEn: "Streamlined engineering defect triage and faster resolution cycles",
  },

  // 20. web_security
  {
    id: "security.trust.boundaries",
    courseSlug: "web_security",
    unitSlug: "injection-defense",
    titleUk: "Межі довіри, санітизація та захист від ін'єкцій",
    titleEn: "Trust Boundaries, Sanitization & Injection Defense",
    actionUk: "Ізолювати вхідні дані користувача, застосовувати параметризовані запити та екранування",
    actionEn: "Isolate untrusted input, apply parameterized queries and context-aware escaping",
    prerequisites: ["express.middleware.pipeline", "sql.joins.aggregates"],
    commonErrors: [
      {
        code: "string_concat_query",
        labelUk: "Конкатенація рядків у SQL або командних викликах",
        labelEn: "String concatenation in SQL queries or commands",
        fixUk: "Завжди використовуйте плейсхолдери ($1, ?) або ORM без сирої конкатенації",
        fixEn: "Always use bound parameters ($1, ?) or an ORM, never raw concatenation",
      },
    ],
    evidenceCriteria: [
      "Спроби SQLi та XSS надійно блокуються на тестових стендах",
      "Сервіс не передає неочищені параметри у підсистеми виконання",
    ],
    relatedCourses: ["node_fundamentals", "postgresql_apps", "ai_security"],
    practicalOutcomeUk: "Стійкість застосунку до типових вразливостей OWASP Top 10",
    practicalOutcomeEn: "Hardened application resilient against OWASP Top 10 vulnerabilities",
  },

  // 21. ai_security
  {
    id: "ai_sec.jailbreaks.prompt_injection",
    courseSlug: "ai_security",
    unitSlug: "prompt-injection-defense",
    titleUk: "Захист від Prompt Injection та Jailbreak атак",
    titleEn: "Defense Against Prompt Injections & Jailbreaks",
    actionUk: "Розділяти системні інструкції та користувацький контент через структуровані формати і валідатори",
    actionEn: "Separate system instructions from untrusted user content via strict schemas and validators",
    prerequisites: ["web_security"],
    commonErrors: [
      {
        code: "naive_system_prompt_only",
        labelUk: "Спроба захиститися виключно фразою 'Ignore instructions above'",
        labelEn: "Relying purely on system prompt admonitions for defense",
        fixUk: "Використовуйте вторинні класифікатори та жорсткий schema-parsing виводу",
        fixEn: "Deploy secondary input classifiers and deterministic output schema parsers",
      },
    ],
    evidenceCriteria: [
      "Модель не розкриває системні секрети навіть при складних багатошарових атаках",
    ],
    relatedCourses: ["ai_development", "llmops"],
    practicalOutcomeUk: "Безпечне впровадження LLM у корпоративні процеси без витоку даних",
    practicalOutcomeEn: "Secure production LLM integration protected against adversarial inputs",
  },

  // 22. python_for_ai
  {
    id: "python.data.vectorization",
    courseSlug: "python_for_ai",
    unitSlug: "numpy-vectorization",
    titleUk: "Векторизація даних у NumPy та тензори",
    titleEn: "Vectorized Computations with NumPy & Tensors",
    actionUk: "Замінювати повільні цикли Python на векторизовані операції масивів NumPy",
    actionEn: "Replace slow Python loops with vectorized NumPy array computations",
    prerequisites: ["programming"],
    commonErrors: [
      {
        code: "python_loop_over_arrays",
        labelUk: "Використання for-циклу для поелементного множення масивів",
        labelEn: "Iterating element-by-element with for loops over NumPy arrays",
        fixUk: "Використовуйте оператори векторизації (a * b) або матричне множення (@)",
        fixEn: "Leverage native broadcasting and matrix operators (@, dot)",
      },
    ],
    evidenceCriteria: [
      "Векторизований код виконується принаймні у 50 разів швидше за чистий Python-цикл",
    ],
    relatedCourses: ["ai_development", "applied_algorithms"],
    practicalOutcomeUk: "Швидка підготовка та попередня обробка ознак для моделей машинного навчання",
    practicalOutcomeEn: "High-speed dataset preprocessing for deep learning pipelines",
  },

  // 23. ai_development
  {
    id: "ai_dev.context.packets",
    courseSlug: "ai_development",
    unitSlug: "context-packets",
    titleUk: "Пакети контексту (Context Packets) та інваріанти",
    titleEn: "Context Packets, Guardrails & Invariant Enforcing",
    actionUk: "Формулювати задачі для ШІ-агентів через чіткі інваріанти, файлові рамки та команди перевірки",
    actionEn: "Formulate agent prompts using strict invariants, bounded file scopes, and verification commands",
    prerequisites: ["python_for_ai"],
    commonErrors: [
      {
        code: "vague_prompting",
        labelUk: "Розмиті інструкції без команд верифікації",
        labelEn: "Vague conversational prompting lacking deterministic tests",
        fixUk: "Вказуйте цільовий результат, незмінні правила та команду перевірки (pnpm test)",
        fixEn: "Specify target artifacts, boundary invariants, and validation scripts",
      },
    ],
    evidenceCriteria: [
      "Агент генерує робоче рішення з першої ітерації без руйнування архітектурних інваріантів",
    ],
    relatedCourses: ["agentic_systems", "llmops"],
    practicalOutcomeUk: "Передбачувана автономна робота кодуючих агентів над великими кодовими базами",
    practicalOutcomeEn: "Reliable autonomous agentic workflows delivering tested pull requests",
  },

  // 24. agentic_systems
  {
    id: "agents.tools.tool_calling",
    courseSlug: "agentic_systems",
    unitSlug: "tool-calling-orchestration",
    titleUk: "Оркестрація агентів та виклики інструментів (Tool Calling)",
    titleEn: "Agent Orchestration & Deterministic Tool Calling",
    actionUk: "Організовувати цикли планування та виконання агентів з обробкою помилок виклику інструментів",
    actionEn: "Coordinate agent plan-and-solve loops with robust tool-calling error recovery",
    prerequisites: ["ai_dev.context.packets"],
    commonErrors: [
      {
        code: "infinite_tool_loop",
        labelUk: "Нескінченний цикл невдалих повторів виклику одного інструмента",
        labelEn: "Runaway agent loop retrying failing tool indefinitely",
        fixUk: "Встановлюйте circuit breaker (максимум 2-3 спроби) та повертайте помилку користувачу",
        fixEn: "Enforce strict circuit breakers and gracefully surface terminal errors",
      },
    ],
    evidenceCriteria: [
      "Агент автоматично виправляє синтаксичні помилки за обмежену кількість кроків",
    ],
    relatedCourses: ["llmops", "ai_product"],
    practicalOutcomeUk: "Стійкі багатоагентні системи для автоматизації складних робочих процесів",
    practicalOutcomeEn: "Self-healing multi-agent pipelines for autonomous software delivery",
  },

  // 25. llmops
  {
    id: "llmops.evals.benchmarking",
    courseSlug: "llmops",
    unitSlug: "evals-benchmarks",
    titleUk: "Оцінювання якості (Evals), трекінг вартості та затримки",
    titleEn: "LLM Evals, Latency Benchmarking & Drift Monitoring",
    actionUk: "Впроваджувати детерміновані датасети для перевірки регресій при зміні моделей чи промптів",
    actionEn: "Deploy automated golden eval datasets to detect quality regression upon prompt updates",
    prerequisites: ["ai_dev.context.packets"],
    commonErrors: [
      {
        code: "vibe_check_evals",
        labelUk: "Оцінка роботи моделі на око ('vibe check') замість метрик",
        labelEn: "Unsystematic 'vibe check' evaluations without repeatable scoring",
        fixUk: "Створюйте датасет із мінімум 50 тест-кейсів з автогрейдингом",
        fixEn: "Establish a baseline golden test suite with automated pass/fail scoring",
      },
    ],
    evidenceCriteria: [
      "Автоматичний CI-пайплайн показує відсоток проходження тестів перед викаткою нового промпту",
    ],
    relatedCourses: ["devops", "ai_product"],
    practicalOutcomeUk: "Контрольоване покращення точності генерацій без прихованих регресій",
    practicalOutcomeEn: "Predictable model performance and bounded token consumption",
  },

  // 26. ai_product
  {
    id: "ai_prod.ux.streaming",
    courseSlug: "ai_product",
    unitSlug: "streaming-ux",
    titleUk: "Проєктування ШІ-продуктів: стрімінг, фолбеки та очікування",
    titleEn: "AI Product UX: Streaming, Fallbacks & Perceived Latency",
    actionUk: "Проєктувати зрозумілий інтерфейс із миттєвим початком стрімінгу та альтернативними підказками",
    actionEn: "Design high-trust AI user interfaces with rapid token streaming and graceful degradation",
    prerequisites: ["ai_dev.context.packets"],
    commonErrors: [
      {
        code: "blocking_long_generation",
        labelUk: "Блокування інтерфейсу без індикації під час тривалої відповіді",
        labelEn: "Freezing UI without streaming tokens or progress feedback",
        fixUk: "Використовуйте Server-Sent Events або ReadableStream для негайного показу першого токена",
        fixEn: "Stream text via Server-Sent Events with low time-to-first-token",
      },
    ],
    evidenceCriteria: [
      "Час до появи першого токена (TTFT) не перевищує 800 мс",
    ],
    relatedCourses: ["nextjs_fullstack", "frontend_performance"],
    practicalOutcomeUk: "Зручні та швидкі ШІ-інструменти, яким довіряють користувачі",
    practicalOutcomeEn: "High-retention AI product features offering immediate visual feedback",
  },

  // 27. web_accessibility
  {
    id: "a11y.wcag.keyboard_focus",
    courseSlug: "web_accessibility",
    unitSlug: "keyboard-navigation",
    titleUk: "Клавіатурна навігація, фокус та критерії WCAG 2.2",
    titleEn: "Keyboard Navigation, Focus Indicators & WCAG 2.2",
    actionUk: "Забезпечувати повне керування сторінкою без миші з помітним індикатором фокуса",
    actionEn: "Ensure end-to-end keyboard operability with clearly visible focus rings and skip links",
    prerequisites: ["html_semantics"],
    commonErrors: [
      {
        code: "outline_none_without_replacement",
        labelUk: "Видалення обведення focus { outline: none } без заміни",
        labelEn: "Disabling focus outline without a high-contrast replacement",
        fixUk: "Завжди надавайте помітне контрастне обведення для :focus-visible",
        fixEn: "Provide explicit high-contrast focus rings using :focus-visible",
      },
    ],
    evidenceCriteria: [
      "Всі інтерактивні елементи доступні за допомогою клавіші Tab",
      "Колірний контраст тексту до фону відповідає стандарту AA (мінімум 4.5:1)",
    ],
    relatedCourses: ["html_semantics", "react_fundamentals"],
    practicalOutcomeUk: "Інклюзивний інтерфейс, готовий для проходження державного аудиту доступності",
    practicalOutcomeEn: "Fully accessible web applications conforming to WCAG 2.2 Level AA",
  },

  // 28. frontend_performance
  {
    id: "perf.cwv.core_metrics",
    courseSlug: "frontend_performance",
    unitSlug: "core-web-vitals",
    titleUk: "Оптимізація Core Web Vitals: LCP, CLS та INP",
    titleEn: "Core Web Vitals Optimization: LCP, CLS & INP",
    actionUk: "Діагностувати та скорочувати затримки завантаження основного контенту та усувати зсуви макета",
    actionEn: "Diagnose and optimize Largest Contentful Paint, Cumulative Layout Shift, and Interaction to Next Paint",
    prerequisites: ["html_semantics", "css_layout"],
    commonErrors: [
      {
        code: "unbounded_image_layout_shift",
        labelUk: "Зсув макета (CLS) через зображення без атрибутів width та height",
        labelEn: "Layout shift caused by images missing width/height attributes",
        fixUk: "Завжди вказуйте width, height або співвідношення aspect-ratio для медіа",
        fixEn: "Always declare width and height or CSS aspect-ratio on image elements",
      },
    ],
    evidenceCriteria: [
      "Показник LCP менше 2.5 секунд, CLS менше 0.1 на мобільному 4G профілі",
    ],
    relatedCourses: ["browser_web_apis", "nextjs_fullstack"],
    practicalOutcomeUk: "Блискавичне завантаження сторінок з максимальними балами Lighthouse",
    practicalOutcomeEn: "Blazing fast page loads achieving green Core Web Vitals across all screens",
  },

  // 29. browser_web_apis
  {
    id: "browser.storage.workers",
    courseSlug: "browser_web_apis",
    unitSlug: "service-workers-offline",
    titleUk: "Service Workers, кешування та офлайн-режим",
    titleEn: "Service Workers, Cache API & Offline Support",
    actionUk: "Налаштовувати перехоплення мережевих запитів та кешування для безперебійної роботи офлайн",
    actionEn: "Configure network request interception and caching strategies for robust offline usage",
    prerequisites: ["js_fundamentals"],
    commonErrors: [
      {
        code: "stale_cache_never_updated",
        labelUk: "Вічний кеш, через який користувачі ніколи не отримують оновлень",
        labelEn: "Indefinite cache serving obsolete assets without revalidation",
        fixUk: "Застосовуйте стратегію Stale-While-Revalidate або версіонування кешу",
        fixEn: "Implement Stale-While-Revalidate or cache-busting version identifiers",
      },
    ],
    evidenceCriteria: [
      "Застосунок відкривається та зберігає базовий функціонал при вимкненій мережі",
    ],
    relatedCourses: ["frontend_performance", "react_fundamentals"],
    practicalOutcomeUk: "Надійні PWA-застосунки, що витримують нестабільне з'єднання",
    practicalOutcomeEn: "Progressive Web Apps functioning reliably under patchy connectivity",
  },

  // 30. git_workflows
  {
    id: "git.branches.rebase",
    courseSlug: "git_workflows",
    unitSlug: "interactive-rebase",
    titleUk: "Інтерактивний Rebase, вирішення конфліктів та Git Bisect",
    titleEn: "Interactive Rebase, Conflict Resolution & Bisect",
    actionUk: "Підтримувати чисту історію комітів, безпечно перебазовувати гілки та знаходити баги через bisect",
    actionEn: "Maintain linear commit history, resolve merge conflicts cleanly, and isolate regressions via bisect",
    prerequisites: ["programming"],
    commonErrors: [
      {
        code: "force_push_to_main",
        labelUk: "Небезпечний force-push у спільну або головну гілку (main)",
        labelEn: "Destructive force push into shared collaboration branch",
        fixUk: "Використовуйте git push --force-with-lease і ніколи не перезаписуйте main",
        fixEn: "Use --force-with-lease on personal branches; keep main protected",
      },
    ],
    evidenceCriteria: [
      "Конфлікт злиття вирішено без втрати змін жодної зі сторін",
    ],
    relatedCourses: ["devops", "software_testing"],
    practicalOutcomeUk: "Зручна та безконфліктна командна робота над спільним репозиторієм",
    practicalOutcomeEn: "Clean collaborative version control workflows with rapid conflict resolution",
  },

  // 31. english
  {
    id: "eng.workplace.async",
    courseSlug: "english",
    unitSlug: "tech-communication",
    titleUk: "Асинхронна технічна комунікація та Code Reviews",
    titleEn: "Asynchronous Technical Communication & Code Reviews",
    actionUk: "Писати зрозумілі описи Pull Request, аргументовані коментарі та технічні звіти англійською",
    actionEn: "Author concise Pull Request summaries, constructive code review feedback, and status updates",
    prerequisites: [],
    commonErrors: [
      {
        code: "ambiguous_pronouns",
        labelUk: "Неоднозначні займенники ('it fails here') без технічних деталей",
        labelEn: "Ambiguous references without concrete identifiers",
        fixUk: "Називайте конкретні змінні, функції чи статус-коди замість 'this/it'",
        fixEn: "Name concrete modules, functions, or symptoms instead of vague pronouns",
      },
    ],
    evidenceCriteria: [
      "Повідомлення однозначно розуміється колегами без додаткових уточнень",
    ],
    relatedCourses: ["git_workflows", "qa_theory"],
    practicalOutcomeUk: "Впевнена робота в міжнародних інженерних командах",
    practicalOutcomeEn: "Confident participation in global distributed engineering teams",
  },

  // 32. chess
  {
    id: "chess.tactics.forks_pins",
    courseSlug: "chess",
    unitSlug: "tactical-motifs",
    titleUk: "Тактичні мотиви: вилки, зв'язки та подвійні удари",
    titleEn: "Tactical Motifs: Forks, Pins & Double Attacks",
    actionUk: "Знаходити геометричні вразливості в позиції суперника та вигравати вирішальний матеріал",
    actionEn: "Spot tactical vulnerabilities in opponent geometry and convert them into material advantage",
    prerequisites: [],
    commonErrors: [
      {
        code: "hanging_piece_blunder",
        labelUk: "Пропуск атаки суперника на власну незахищену фігуру",
        labelEn: "Blundering unprotected hanging pieces",
        fixUk: "Перед кожним ходом перевіряйте шахи, взяття та загрози суперника (CCT)",
        fixEn: "Evaluate Checks, Captures, and Threats before finalizing any move",
      },
    ],
    evidenceCriteria: [
      "Успішне знаходження виграшної тактики в тактичних задачах з першої спроби",
    ],
    relatedCourses: ["logic"],
    practicalOutcomeUk: "Розвиток просторового мислення, розрахунку варіантів та дисципліни уваги",
    practicalOutcomeEn: "Sharpened calculation depth, strategic discipline, and pattern recognition",
  },

  // 33. typing
  {
    id: "typing.touch.accuracy",
    courseSlug: "typing",
    unitSlug: "blind-ten-finger",
    titleUk: "Десятипальцевий сліпий набір та ергономіка",
    titleEn: "Touch Typing Mastery & Ergonomics",
    actionUk: "Набирати код та тексти з точністю понад 95% без погляду на клавіатуру",
    actionEn: "Type code and prose with >= 95% accuracy without looking down at the keyboard",
    prerequisites: [],
    commonErrors: [
      {
        code: "speed_over_accuracy",
        labelUk: "Спроба друкувати надто швидко ціною великої кількості помилок",
        labelEn: "Sacrificing accuracy for premature speed bursts",
        fixUk: "Сповільніться до комфортного темпу, поки точність не досягне 98%",
        fixEn: "Slow down until accuracy hits 98%; rhythm naturally produces speed",
      },
    ],
    evidenceCriteria: [
      "Швидкість набору понад 40 WPM при точності від 90%",
    ],
    relatedCourses: ["programming"],
    practicalOutcomeUk: "Зниження втоми рук та швидке перенесення думок у код",
    practicalOutcomeEn: "Reduced finger strain and frictionless translation of thought into code",
  },

  // 34. speed_reading
  {
    id: "speed.subvocalization.scanning",
    courseSlug: "speed_reading",
    unitSlug: "subvocalization-reduction",
    titleUk: "Пригнічення внутрішнього промовляння та сканування документації",
    titleEn: "Subvocalization Reduction & Rapid Spec Scanning",
    actionUk: "Швидко знаходити потрібні ключові факти у великих специфікаціях без втрати розуміння",
    actionEn: "Rapidly isolate critical requirements and edge cases in dense technical specifications",
    prerequisites: [],
    commonErrors: [
      {
        code: "full_subvocalization",
        labelUk: "Промовляння кожного слова подумки, що обмежує швидкість до 200 слів/хв",
        labelEn: "Inner auditory vocalization capping reading rate at 200 wpm",
        fixUk: "Використовуйте RSVP-тренажер або периферійне розширення погляду",
        fixEn: "Train with RSVP pacing and widen peripheral vision spans",
      },
    ],
    evidenceCriteria: [
      "Розуміння прочитаного від 80% за тестом розуміння при швидкості від 350 WPM",
    ],
    relatedCourses: ["english", "logic"],
    practicalOutcomeUk: "Швидке засвоєння нової технічної документації та стандартів",
    practicalOutcomeEn: "Rapid comprehension of architectural RFCs and domain documentation",
  },

  // 35. logic
  {
    id: "logic.syllogism.fallacies",
    courseSlug: "logic",
    unitSlug: "logical-fallacies",
    titleUk: "Логічні хиби, силогізми та пошук контрприкладів",
    titleEn: "Logical Fallacies, Formal Syllogisms & Counterexamples",
    actionUk: "Виявляти некоректні висновки, підміну понять та формулювати мінімальні контрприклади",
    actionEn: "Identify formal and informal fallacies, invalid deductions, and construct counterexamples",
    prerequisites: [],
    commonErrors: [
      {
        code: "post_hoc_ergo_propter_hoc",
        labelUk: "Плутанина між кореляцією та причинно-наслідковим зв'язком",
        labelEn: "Confusing correlation with causation",
        fixUk: "Перевіряйте наявність незалежних контрольних факторів",
        fixEn: "Isolate confounding variables before concluding causal dependency",
      },
    ],
    evidenceCriteria: [
      "Коректне спростування хибних тверджень через знаходження контрприкладу",
    ],
    relatedCourses: ["software_testing", "qa_theory"],
    practicalOutcomeUk: "Критичне мислення при аналізі системних багів та архітектурних рішень",
    practicalOutcomeEn: "Rigorous root-cause analysis and sound architectural decision making",
  },
];

/** Find all defined skill objectives for a given course slug */
export function getSkillObjectives(courseSlug: CourseSlug): SkillObjective[] {
  return CORE_SKILL_OBJECTIVES.filter((s) => s.courseSlug === courseSlug);
}

/** Get a specific skill objective by its unique ID */
export function getObjective(objectiveId: string): SkillObjective | null {
  return CORE_SKILL_OBJECTIVES.find((s) => s.id === objectiveId) ?? null;
}

/** Map an exercise or lesson to its governing skill objective (fallback heuristic) */
export function mapExerciseToSkill(courseSlug: CourseSlug, unitSlug: string): SkillObjective | null {
  const match = CORE_SKILL_OBJECTIVES.find(
    (s) => s.courseSlug === courseSlug && s.unitSlug === unitSlug,
  );
  if (match) return match;
  return CORE_SKILL_OBJECTIVES.find((s) => s.courseSlug === courseSlug) ?? null;
}

/** Verify that every course in the system has a canonical skill objective */
export function verifyAllCoursesHaveObjectives(): { complete: boolean; missing: string[] } {
  const covered = new Set(CORE_SKILL_OBJECTIVES.map((s) => s.courseSlug));
  const missing = COURSE_SLUGS.filter((slug) => !covered.has(slug));
  return { complete: missing.length === 0, missing };
}
