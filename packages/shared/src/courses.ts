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
] as const;

export type CourseSlug = (typeof COURSE_SLUGS)[number];

/** Catalog grouping for discoverability */
export type CourseGroup = "skill" | "code" | "deep" | "chess";

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
    icon: "🇬🇧",
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
    titleUk: "SQL",
    titleEn: "SQL",
    descriptionUk: "SELECT, JOINs, aggregates, DML, keys — deep track.",
    descriptionEn: "SELECT, JOINs, aggregates, DML, keys — deep track.",
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
};

/** Hub path for deep tracks / code (fallback /courses/:slug) */
export const COURSE_HUB_HREF: Partial<Record<CourseSlug, string>> = {
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
  chess: "/play",
};

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
  { id: "5+0", initialMs: 300_000, incrementMs: 0, label: "5 хв" },
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
  | "code_project";
