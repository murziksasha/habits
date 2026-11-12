import { isoWeekKey } from "./week.js";

export const COURSE_SLUGS = [
  "english",
  "chess",
  "typing",
  "speed_reading",
  "logic",
  "programming",
  "typescript",
  "html_semantics",
  "css_layout",
  "qa_theory",
  "js_fundamentals",
  "react_fundamentals",
  "sql_fundamentals",
  "node_fundamentals",
  "express_fundamentals",
  "embedded_cpp",
  "sysadmin",
  "devops",
  "software_testing",
  "postgresql_apps",
  "git_workflows",
  "web_security",
  "ai_development",
  "python_for_ai",
  "agentic_systems",
  "llmops",
  "ai_security",
  "ai_product",
  "nextjs_fullstack",
  "applied_algorithms",
] as const;

export type CourseSlug = (typeof COURSE_SLUGS)[number];

/** App-level registry guard (DB stores free-form varchar). */
export function isCourseSlug(value: string): value is CourseSlug {
  return (COURSE_SLUGS as readonly string[]).includes(value);
}

export function parseCourseSlug(value: string): CourseSlug | null {
  return isCourseSlug(value) ? value : null;
}

/** Catalog grouping for discoverability */
export type CourseGroup = "skill" | "code" | "deep" | "chess";

export function resolveCourseGroup(slug: string): CourseGroup {
  if ((COURSE_SLUGS as readonly string[]).includes(slug)) {
    return COURSE_GROUP[slug as CourseSlug];
  }
  return "skill";
}

export const COURSE_GROUP: Record<CourseSlug, CourseGroup> = {
  english: "skill",
  typing: "skill",
  speed_reading: "skill",
  logic: "skill",
  chess: "chess",
  programming: "code",
  typescript: "deep",
  html_semantics: "deep",
  css_layout: "deep",
  qa_theory: "deep",
  js_fundamentals: "deep",
  react_fundamentals: "deep",
  sql_fundamentals: "deep",
  node_fundamentals: "deep",
  express_fundamentals: "deep",
  embedded_cpp: "deep",
  sysadmin: "skill",
  devops: "skill",
  software_testing: "deep",
  postgresql_apps: "deep",
  git_workflows: "deep",
  web_security: "deep",
  ai_development: "deep",
  python_for_ai: "deep",
  agentic_systems: "deep",
  llmops: "deep",
  ai_security: "deep",
  ai_product: "deep",
  nextjs_fullstack: "deep",
  applied_algorithms: "deep",
};

export const COURSE_GROUP_META: Record<
  CourseGroup,
  { titleUk: string; titleEn: string; order: number }
> = {
  code: { titleUk: "Код · path", titleEn: "Code · path", order: 1 },
  deep: { titleUk: "Deep tracks", titleEn: "Deep tracks", order: 2 },
  skill: { titleUk: "Навички", titleEn: "Skills", order: 3 },
  chess: { titleUk: "Шахи", titleEn: "Chess", order: 4 },
};

export function coursesByGroup(group: CourseGroup): CourseSlug[] {
  return COURSE_SLUGS.filter((s) => COURSE_GROUP[s] === group);
}

export type CoursePart = {
  id: string;
  titleUk: string;
  titleEn: string;
  unitSlugs: readonly string[];
};

/** Presentation groups on an existing course page; these do not create courses or locks. */
export const COURSE_PARTS: Partial<Record<CourseSlug, readonly CoursePart[]>> = {
  devops: [
    {
      id: "foundations",
      titleUk: "Основи",
      titleEn: "Foundations",
      unitSlugs: ["git-workstation", "linux-base", "bash", "networks", "python-ops"],
    },
    {
      id: "ship-an-image",
      titleUk: "Випустити образ",
      titleEn: "Ship an image",
      unitSlugs: ["containers", "aws-survival", "iac", "ci"],
    },
    {
      id: "run-it",
      titleUk: "Запустити сервіс",
      titleEn: "Run it",
      unitSlugs: ["kubernetes", "observability", "devsecops-gitops"],
    },
    {
      id: "stay-up",
      titleUk: "Тримати сервіс",
      titleEn: "Stay up",
      unitSlugs: ["k8s-workloads", "traffic-identity", "gitops-delivery"],
    },
    {
      id: "on-call",
      titleUk: "На зміні",
      titleEn: "On call",
      unitSlugs: ["data-plane", "alerts-runbooks", "incident-drills", "sre-capstone"],
    },
  ],
};

export function getCourseParts(slug: string): readonly CoursePart[] {
  return isCourseSlug(slug) ? COURSE_PARTS[slug] ?? [] : [];
}

export const COURSE_META: Record<
  CourseSlug,
  {
    slug: CourseSlug;
    titleUk: string;
    titleEn: string;
    descriptionUk: string;
    descriptionEn: string;
    icon: string;
    color: string;
    group: CourseGroup;
  }
> = {
  english: {
    slug: "english",
    titleUk: "Англійська",
    titleEn: "English",
    descriptionUk: "Вивчай англійську як у Duolingo — уроки, серії, досвід.",
    descriptionEn: "Learn English like Duolingo — lessons, streaks, XP.",
    icon: "📗",
    color: "#58CC02",
    group: "skill",
  },
  chess: {
    slug: "chess",
    titleUk: "Шахи",
    titleEn: "Chess",
    descriptionUk: "Теорія, задачі та онлайн-партії з іншими гравцями.",
    descriptionEn: "Theory, puzzles, and live games with other players.",
    icon: "♟️",
    color: "#1B1B1B",
    group: "chess",
  },
  typing: {
    slug: "typing",
    titleUk: "Друк",
    titleEn: "Typing",
    descriptionUk: "Тренуй швидкість і точність сліпого друку.",
    descriptionEn: "Build speed and accuracy with touch typing.",
    icon: "⌨️",
    color: "#1CB0F6",
    group: "skill",
  },
  speed_reading: {
    slug: "speed_reading",
    titleUk: "Швидкочитання",
    titleEn: "Speed reading",
    descriptionUk: "RSVP, chunking і перевірка розуміння тексту.",
    descriptionEn: "RSVP, chunking, and reading comprehension.",
    icon: "📖",
    color: "#CE82FF",
    group: "skill",
  },
  logic: {
    slug: "logic",
    titleUk: "Логіка",
    titleEn: "Logic",
    descriptionUk: "Задачі на послідовності, патерни та мислення.",
    descriptionEn: "Sequences, patterns, and critical thinking.",
    icon: "🧩",
    color: "#FF9600",
    group: "skill",
  },
  sysadmin: {
    slug: "sysadmin",
    titleUk: "Сисадмін",
    titleEn: "Sysadmin",
    descriptionUk:
      "SOHO і Linux-консоль: мережа офісу, бекапи, git для конфігів, systemd, VPN, RAID і відновлення.",
    descriptionEn:
      "SOHO and the Linux console: office network, backups, git for configs, systemd, VPN, RAID, and recovery.",
    icon: "🖥️",
    color: "#0F766E",
    group: "skill",
  },
  devops: {
    slug: "devops",
    titleUk: "DevOps",
    titleEn: "DevOps",
    descriptionUk:
      "Один сервіс forge-status: від Git і Linux до образу, Kubernetes і GitOps. Далі — надійні workloads, TLS, доставка digest, відновлення бази й чергування. CI завершується push образу; AWS — до Terraform.",
    descriptionEn:
      "One service, forge-status: from Git and Linux to an image, Kubernetes, and GitOps. Then resilient workloads, TLS, digest promotion, database recovery, and on-call drills. CI ends at the image push; AWS comes before Terraform.",
    icon: "🚀",
    color: "#7C3AED",
    group: "skill",
  },
  programming: {
    slug: "programming",
    titleUk: "Програмування",
    titleEn: "Programming",
    descriptionUk: "HTML→TS→React→Git→Node→SQL→QA — path у стилі Mimo + placement.",
    descriptionEn: "HTML→TS→React→Git→Node→SQL→QA — Mimo-style path + placement.",
    icon: "💻",
    color: "#0EA5E9",
    group: "code",
  },
  typescript: {
    slug: "typescript",
    titleUk: "TypeScript",
    titleEn: "TypeScript",
    descriptionUk: "Повний курс TypeScript: типи, generics, narrowing, utility types.",
    descriptionEn: "Full TypeScript course: types, generics, narrowing, utility types.",
    icon: "📘",
    color: "#3178C6",
    group: "deep",
  },
  html_semantics: {
    slug: "html_semantics",
    titleUk: "HTML: семантика",
    titleEn: "HTML Semantics",
    descriptionUk: "Семантична верстка, landmarks, forms a11y, outline документа.",
    descriptionEn: "Semantic markup, landmarks, accessible forms, document outline.",
    icon: "🌐",
    color: "#E34F26",
    group: "deep",
  },
  css_layout: {
    slug: "css_layout",
    titleUk: "CSS: Flex & Grid",
    titleEn: "CSS Flex & Grid",
    descriptionUk: "Глибокий layout: Flexbox, CSS Grid, responsive patterns.",
    descriptionEn: "Deep layout track: Flexbox, CSS Grid, responsive patterns.",
    icon: "🎨",
    color: "#264DE4",
    group: "deep",
  },
  qa_theory: {
    slug: "qa_theory",
    titleUk: "QA: теорія",
    titleEn: "QA Theory",
    descriptionUk: "Принципи, рівні й види тестування, техніки дизайну, STLC, дефекти.",
    descriptionEn: "Principles, test levels & types, design techniques, STLC, defects.",
    icon: "🧪",
    color: "#0D9488",
    group: "deep",
  },
  js_fundamentals: {
    slug: "js_fundamentals",
    titleUk: "JavaScript",
    titleEn: "JavaScript",
    descriptionUk: "Глибокий JS: типи, functions, arrays, async, DOM, modules.",
    descriptionEn: "Deep JS: types, functions, arrays, async, DOM, modules.",
    icon: "⚡",
    color: "#F7DF1E",
    group: "deep",
  },
  react_fundamentals: {
    slug: "react_fundamentals",
    titleUk: "React",
    titleEn: "React",
    descriptionUk: "Компоненти, props, state, lists, effects, forms.",
    descriptionEn: "Components, props, state, lists, effects, forms.",
    icon: "⚛️",
    color: "#61DAFB",
    group: "deep",
  },
  sql_fundamentals: {
    slug: "sql_fundamentals",
    titleUk: "SQL і Oracle Database",
    titleEn: "SQL & Oracle Database",
    descriptionUk:
      "SQL, PL/SQL і адміністрування Oracle: від перших запитів до JSON, векторів і сценаріїв супроводу.",
    descriptionEn:
      "Oracle SQL, PL/SQL, and administration: from first queries to JSON, vectors, and operations scenarios.",
    icon: "🗄️",
    color: "#336791",
    group: "deep",
  },
  node_fundamentals: {
    slug: "node_fundamentals",
    titleUk: "Node.js",
    titleEn: "Node.js",
    descriptionUk: "Runtime, modules, fs, env, http, npm, async — deep track.",
    descriptionEn: "Runtime, modules, fs, env, http, npm, async — deep track.",
    icon: "🟢",
    color: "#339933",
    group: "deep",
  },
  express_fundamentals: {
    slug: "express_fundamentals",
    titleUk: "Express",
    titleEn: "Express",
    descriptionUk: "App, routes, middleware, REST, errors, Router — deep track.",
    descriptionEn: "App, routes, middleware, REST, errors, Router — deep track.",
    icon: "🚂",
    color: "#000000",
    group: "deep",
  },
  embedded_cpp: {
    slug: "embedded_cpp",
    titleUk: "Embedded C++ · MilTech",
    titleEn: "Embedded C++ · MilTech",
    descriptionUk:
      "C++ для обмежених ресурсів: пам'ять, CMake, мережа, FreeRTOS, MAVLink, safety, mission — deep track + labs.",
    descriptionEn:
      "C++ for constrained systems: memory, CMake, networking, FreeRTOS, MAVLink, safety, mission — deep track + labs.",
    icon: "🪖",
    color: "#4B5320",
    group: "deep",
  },
  software_testing: {
    slug: "software_testing",
    titleUk: "Практичне тестування ПЗ",
    titleEn: "Practical Software Testing",
    descriptionUk:
      "Вимоги, Vitest, межові кейси й фікстури, тести React-компонентів, API/DB інтеграція, Playwright і CI.",
    descriptionEn:
      "Testable requirements, Vitest unit tests, boundary cases & fixtures, React component tests, API/DB integration, Playwright & CI.",
    icon: "🧪",
    color: "#0F766E",
    group: "deep",
  },
  postgresql_apps: {
    slug: "postgresql_apps",
    titleUk: "PostgreSQL для вебдодатків",
    titleEn: "PostgreSQL for Web Applications",
    descriptionUk:
      "Реляційне моделювання, обмеження й міграції, параметризований CRUD, JOIN, пагінація, транзакції та індекси.",
    descriptionEn:
      "Relational modeling, constraints & migrations, parameterized CRUD, joins & pagination, transactions, and indexes/EXPLAIN.",
    icon: "🐘",
    color: "#336791",
    group: "deep",
  },
  git_workflows: {
    slug: "git_workflows",
    titleUk: "Git та командні воркфлоу",
    titleEn: "Git and Team Workflows",
    descriptionUk:
      "Історія репозиторію, гілки й атомарні коміти, розв'язання конфліктів, код-рев'ю та релізні процеси.",
    descriptionEn:
      "Repository history, branches & clean commits, conflict resolution, code reviews, recovery, and release workflows.",
    icon: "🌿",
    color: "#F05032",
    group: "deep",
  },
  web_security: {
    slug: "web_security",
    titleUk: "Безпечні вебдодатки",
    titleEn: "Secure Web Applications",
    descriptionUk:
      "Межі довіри, валідація й екранування, сесії, авторизація й ownership, CSP/CORS/CSRF, секрети й залежності (OWASP 2025).",
    descriptionEn:
      "Trust boundaries, input validation & output handling, sessions, authorization, browser security, and dependency/config hygiene (OWASP 2025).",
    icon: "🛡️",
    color: "#DC2626",
    group: "deep",
  },
  ai_development: {
    slug: "ai_development",
    titleUk: "AI-асистована розробка",
    titleEn: "AI-Assisted Development",
    descriptionUk:
      "Специфікація задач, вибір контексту, малі дифи, верифікація й рев'ю коду, приватність, аудит залежностей і контроль AI-кодера.",
    descriptionEn:
      "Task specification, context selection, small diffs, verification & debugging, privacy, dependency review, and controlling AI coders.",
    icon: "🤖",
    color: "#6366F1",
    group: "deep",
  },
  python_for_ai: {
    slug: "python_for_ai",
    titleUk: "Python для AI",
    titleEn: "Python for AI",
    descriptionUk:
      "Читання та ремонт агентного Python: значення, колекції, типізовані функції, JSON/HTTP, async/await і рев'ю сніпетів.",
    descriptionEn:
      "Read and repair agent-style Python: values, collections, typed functions, JSON/HTTP shapes, async/await, and AI snippet review.",
    icon: "🐍",
    color: "#3776AB",
    group: "deep",
  },
  agentic_systems: {
    slug: "agentic_systems",
    titleUk: "Агентні системи та RAG",
    titleEn: "Agentic Systems & RAG",
    descriptionUk:
      "Скрипт vs модель vs агент, контракти інструментів, планування, мультиагентні патерни, гібридний RAG і векторні сховища.",
    descriptionEn:
      "Script vs model vs agent, tool schemas, planning & reflection, multi-agent patterns, hybrid RAG, and vector store tradeoffs.",
    icon: "🕸️",
    color: "#8B5CF6",
    group: "deep",
  },
  llmops: {
    slug: "llmops",
    titleUk: "LLMOps: трейси, evals і бюджет",
    titleEn: "LLMOps: Traces, Evals & Budget",
    descriptionUk:
      "Трейсинг і токени, фікстурні evals у CI, HTTP vs GraphQL/gRPC/події, черги, хмарні консолі та контроль бюджету.",
    descriptionEn:
      "Tracing and token cost, fixture evals in CI, HTTP vs GraphQL/gRPC/events, durable queues, cloud model IDs, and budget limits.",
    icon: "📈",
    color: "#0284C7",
    group: "deep",
  },
  ai_security: {
    slug: "ai_security",
    titleUk: "Безпека AI-агентів",
    titleEn: "AI Security",
    descriptionUk:
      "Межі довіри для інструментів, захист від непрямих інструкцій, allowlist і HITL, output-політики, секрети та локальні моделі.",
    descriptionEn:
      "Tool trust boundaries, separating untrusted data from instructions, allowlists & HITL, output guardrails, secret hygiene, and local models.",
    icon: "🛡️",
    color: "#B91C1C",
    group: "deep",
  },
  ai_product: {
    slug: "ai_product",
    titleUk: "AI-продукт і Human-in-the-Loop",
    titleEn: "AI Product & Human-in-the-Loop",
    descriptionUk:
      "Маршрутизація між сильною, локальною моделлю й Python, продуктові межі, approve/edit/undo, відмови та рев'ю підтримки.",
    descriptionEn:
      "Routing between frontier, local, and plain Python, product boundaries, approve/edit/undo controls, failure modes, and support-agent review.",
    icon: "🧭",
    color: "#0D9488",
    group: "deep",
  },
  nextjs_fullstack: {
    slug: "nextjs_fullstack",
    titleUk: "Full-Stack на Next.js",
    titleEn: "Full-Stack Applications with Next.js",
    descriptionUk:
      "Маршрутизація App Router, межі Server/Client, доступ до даних, мутації, авторизація, кешування й діагностика.",
    descriptionEn:
      "App Router routing, server/client boundaries, data access, mutations, identity & authz, caching/errors, and deployment diagnostics.",
    icon: "▲",
    color: "#111827",
    group: "deep",
  },
  applied_algorithms: {
    slug: "applied_algorithms",
    titleUk: "Прикладні алгоритми та структури даних",
    titleEn: "Applied Algorithms & Data Structures",
    descriptionUk:
      "Складність, Map/Set/індекси, стеки й черги, пошук і сортування, дерева й обходи та вимірювані компроміси.",
    descriptionEn:
      "Complexity analysis, collections, stacks & queues, searching & sorting, trees & traversal, and measurable application tradeoffs.",
    icon: "📐",
    color: "#D97706",
    group: "deep",
  },
};

/** Hub path for deep tracks / code (fallback /courses/:slug) */
export const COURSE_HUB_HREF: Partial<Record<CourseSlug | string, string>> = {
  programming: "/programming",
  typescript: "/typescript",
  html_semantics: "/html-semantics",
  css_layout: "/css-layout",
  qa_theory: "/qa-theory",
  js_fundamentals: "/js-fundamentals",
  react_fundamentals: "/react-fundamentals",
  sql_fundamentals: "/sql-fundamentals",
  node_fundamentals: "/node-fundamentals",
  express_fundamentals: "/express-fundamentals",
  embedded_cpp: "/embedded-cpp",
  software_testing: "/software-testing",
  postgresql_apps: "/postgresql-apps",
  git_workflows: "/git-workflows",
  web_security: "/web-security",
  ai_development: "/ai-development",
  python_for_ai: "/python-for-ai",
  agentic_systems: "/agentic-systems",
  llmops: "/llmops",
  ai_security: "/ai-security",
  ai_product: "/ai-product",
  nextjs_fullstack: "/nextjs-fullstack",
  applied_algorithms: "/applied-algorithms",
  chess: "/play",
};

/** Canonical full-stack progression across EduForge courses. */
export const FULL_STACK_ROADMAP_ORDER: readonly CourseSlug[] = [
  "programming",
  "html_semantics",
  "css_layout",
  "git_workflows",
  "js_fundamentals",
  "typescript",
  "react_fundamentals",
  "node_fundamentals",
  "express_fundamentals",
  "postgresql_apps",
  "software_testing",
  "web_security",
  "ai_development",
  "python_for_ai",
  "agentic_systems",
  "llmops",
  "ai_security",
  "ai_product",
  "nextjs_fullstack",
  "applied_algorithms",
  "sysadmin",
  "devops",
] as const;

export const COURSE_PREREQUISITES: Partial<Record<CourseSlug, readonly CourseSlug[]>> = {
  html_semantics: ["programming"],
  css_layout: ["programming", "html_semantics"],
  git_workflows: ["programming"],
  js_fundamentals: ["programming", "html_semantics", "css_layout"],
  typescript: ["js_fundamentals"],
  react_fundamentals: ["js_fundamentals", "typescript"],
  node_fundamentals: ["js_fundamentals"],
  express_fundamentals: ["node_fundamentals"],
  sql_fundamentals: ["programming"],
  postgresql_apps: ["express_fundamentals", "sql_fundamentals"],
  qa_theory: ["programming"],
  software_testing: ["js_fundamentals", "react_fundamentals", "express_fundamentals"],
  web_security: ["express_fundamentals", "postgresql_apps"],
  ai_development: ["typescript", "git_workflows", "software_testing"],
  python_for_ai: ["programming"],
  agentic_systems: ["python_for_ai", "ai_development"],
  llmops: ["agentic_systems", "node_fundamentals"],
  ai_security: ["agentic_systems", "web_security"],
  ai_product: ["agentic_systems", "ai_security"],
  nextjs_fullstack: ["react_fundamentals", "express_fundamentals", "postgresql_apps"],
  applied_algorithms: ["js_fundamentals", "typescript"],
  devops: ["sysadmin", "express_fundamentals", "postgresql_apps", "software_testing"],
};

export const COURSE_NEXT_MAP: Partial<Record<CourseSlug, readonly CourseSlug[]>> = {
  programming: ["html_semantics", "css_layout", "git_workflows", "js_fundamentals"],
  html_semantics: ["css_layout", "js_fundamentals"],
  css_layout: ["js_fundamentals", "react_fundamentals"],
  git_workflows: ["js_fundamentals", "ai_development"],
  js_fundamentals: ["typescript", "react_fundamentals", "node_fundamentals"],
  typescript: ["react_fundamentals", "express_fundamentals", "applied_algorithms"],
  react_fundamentals: ["software_testing", "nextjs_fullstack"],
  node_fundamentals: ["express_fundamentals", "sysadmin"],
  express_fundamentals: ["postgresql_apps", "software_testing", "web_security"],
  sql_fundamentals: ["postgresql_apps"],
  postgresql_apps: ["software_testing", "web_security", "nextjs_fullstack"],
  qa_theory: ["software_testing"],
  software_testing: ["web_security", "ai_development", "devops"],
  web_security: ["ai_development", "nextjs_fullstack", "devops"],
  ai_development: ["python_for_ai", "nextjs_fullstack", "applied_algorithms"],
  python_for_ai: ["agentic_systems", "typescript"],
  agentic_systems: ["llmops", "ai_security"],
  llmops: ["ai_security", "devops"],
  ai_security: ["ai_product"],
  ai_product: ["devops"],
  nextjs_fullstack: ["applied_algorithms", "devops"],
  applied_algorithms: ["devops"],
  sysadmin: ["devops"],
  devops: ["applied_algorithms"],
};

export function getCoursePrerequisites(slug: string): readonly CourseSlug[] {
  return isCourseSlug(slug) ? COURSE_PREREQUISITES[slug] ?? [] : [];
}

export function getCourseNextSteps(slug: string): readonly CourseSlug[] {
  return isCourseSlug(slug) ? COURSE_NEXT_MAP[slug] ?? [] : [];
}

/** Ordered learning path for the programming course units */
export const PROGRAMMING_UNIT_ORDER = [
  "html",
  "css",
  "js",
  "typescript",
  "react",
  "git",
  "node",
  "express",
  "sql",
  "qa",
] as const;

export type ProgrammingUnitSlug = (typeof PROGRAMMING_UNIT_ORDER)[number];

/**
 * Lesson slugs for multi-file mini-projects across the programming path.
 * Keep in sync with packages/content programming.ts.
 */
export const PROGRAMMING_MINI_LESSON_SLUGS = [
  "html-mini-card",
  "css-mini-hero",
  "js-mini-counter",
  "ts-mini-types",
  "react-mini-toggle",
  "git-mini-commit",
  "node-mini-server",
  "express-mini-api",
  "sql-mini-join",
  "qa-mini-case",
] as const;

export type ProgrammingMiniSlug = (typeof PROGRAMMING_MINI_LESSON_SLUGS)[number];

export function isProgrammingMiniSlug(s: string): boolean {
  return (PROGRAMMING_MINI_LESSON_SLUGS as readonly string[]).includes(s);
}

/** Flat registry rows for admin / hub tooling */
export function listCourseRegistry() {
  return COURSE_SLUGS.map((slug) => ({
    ...COURSE_META[slug],
    hubHref: COURSE_HUB_HREF[slug] ?? `/courses/${slug}`,
  }));
}

/**
 * Weekly race: 3 mini lesson slugs rotated by ISO week.
 * Score = how many of these 3 the user completed this week.
 */
export function weeklyMinisRaceSlugs(weekKey?: string): string[] {
  const key = weekKey ?? isoWeekKey();
  const n = parseInt(key.replace(/\D/g, "").slice(-2) || "1", 10) || 1;
  const pool = [...PROGRAMMING_MINI_LESSON_SLUGS];
  const pick = Math.min(3, pool.length);
  const start = (n * 2) % Math.max(1, pool.length);
  const ids: string[] = [];
  for (let i = 0; i < pick; i++) {
    ids.push(pool[(start + i) % pool.length]!);
  }
  return [...new Set(ids)];
}

/** Bonus XP for top-3 in weekly minis race */
export function weeklyMinisRaceXpBonus(rank: number): number {
  if (rank === 1) return 30;
  if (rank === 2) return 18;
  if (rank === 3) return 12;
  return 0;
}

/** Virtual “stack” hubs under /programming/[stack] (same course, filtered unit) */
export const PROGRAMMING_STACK_META: Record<
  ProgrammingUnitSlug,
  { icon: string; titleUk: string; titleEn: string; descriptionUk: string; descriptionEn: string }
> = {
  html: {
    icon: "🌐",
    titleUk: "HTML",
    titleEn: "HTML",
    descriptionUk: "Структура, теги, форми, семантика",
    descriptionEn: "Structure, tags, forms, semantics",
  },
  css: {
    icon: "🎨",
    titleUk: "CSS",
    titleEn: "CSS",
    descriptionUk: "Селектори, box model, flex, responsive",
    descriptionEn: "Selectors, box model, flex, responsive",
  },
  js: {
    icon: "⚡",
    titleUk: "JavaScript",
    titleEn: "JavaScript",
    descriptionUk: "Змінні, функції, масиви, DOM, async",
    descriptionEn: "Variables, functions, arrays, DOM, async",
  },
  typescript: {
    icon: "📘",
    titleUk: "TypeScript",
    titleEn: "TypeScript",
    descriptionUk: "Типи, interface, generics, unions",
    descriptionEn: "Types, interfaces, generics, unions",
  },
  react: {
    icon: "⚛️",
    titleUk: "React",
    titleEn: "React",
    descriptionUk: "Компоненти, props, state, effects",
    descriptionEn: "Components, props, state, effects",
  },
  git: {
    icon: "🌿",
    titleUk: "Git",
    titleEn: "Git",
    descriptionUk: "Commit, branch, PR, rebase",
    descriptionEn: "Commit, branch, PR, rebase",
  },
  node: {
    icon: "🟢",
    titleUk: "Node.js",
    titleEn: "Node.js",
    descriptionUk: "Runtime, modules, env, async",
    descriptionEn: "Runtime, modules, env, async",
  },
  express: {
    icon: "🚂",
    titleUk: "Express",
    titleEn: "Express",
    descriptionUk: "Routes, middleware, REST, errors",
    descriptionEn: "Routes, middleware, REST, errors",
  },
  sql: {
    icon: "🗄️",
    titleUk: "SQL",
    titleEn: "SQL",
    descriptionUk: "SELECT, WHERE, JOIN, GROUP BY",
    descriptionEn: "SELECT, WHERE, JOIN, GROUP BY",
  },
  qa: {
    icon: "🧪",
    titleUk: "QA",
    titleEn: "QA",
    descriptionUk: "Піраміда тестів, кейси, API checks",
    descriptionEn: "Test pyramid, cases, API checks",
  },
};

export function isProgrammingStack(s: string): s is ProgrammingUnitSlug {
  return (PROGRAMMING_UNIT_ORDER as readonly string[]).includes(s);
}

export const FREE_LESSONS_PER_COURSE = 5;
export const FREE_HEARTS = 5;
export const HEART_REGEN_MINUTES = 30;
export const FREE_RATED_CHESS_PER_DAY = 5;
/** Default daily XP goal for character */
export const DEFAULT_DAILY_GOAL_XP = 50;

export const CHESS_TIME_CONTROLS = [
  { id: "3+0", initialMs: 180_000, incrementMs: 0, label: "3 хв" },
  { id: "3+2", initialMs: 180_000, incrementMs: 2_000, label: "3+2" },
  { id: "5+0", initialMs: 300_000, incrementMs: 0, label: "5 хв" },
  { id: "5+3", initialMs: 300_000, incrementMs: 3_000, label: "5+3" },
  { id: "10+0", initialMs: 600_000, incrementMs: 0, label: "10 хв" },
] as const;

export type ExerciseType =
  | "mcq"
  | "translate"
  | "match"
  | "order_words"
  | "fill_blank"
  | "typing"
  | "rsvp"
  | "comprehension"
  | "logic_puzzle"
  | "chess_puzzle"
  | "chess_lesson"
  | "code_read"
  | "code_output"
  | "code_fill"
  | "code_order"
  | "code_project"
  | "code_run"
  | "video"
  | "code_judge"
  | "concept"
  | "explain";
