/** Curated ordered course sequences for a learning goal (SPEC/IMPROVEMENTS-PLAN). */

import { isCourseSlug, type CourseSlug } from "./courses.js";

export type LearningPathSlug =
  | "frontend-dev"
  | "backend-dev"
  | "qa-engineer"
  | "ai-builder"
  | "dba-sql"
  | "devops"
  | "english-fluency"
  | "chess-mastery";

export type LearningPathDef = {
  slug: LearningPathSlug;
  icon: string;
  color: string;
  titleUk: string;
  titleEn: string;
  blurbUk: string;
  blurbEn: string;
  courseSlugs: readonly CourseSlug[];
};

export const LEARNING_PATHS: readonly LearningPathDef[] = [
  {
    slug: "frontend-dev",
    icon: "🎨",
    color: "#2563EB",
    titleUk: "Фронтенд-розробка",
    titleEn: "Frontend development",
    blurbUk:
      "Від семантичного HTML і CSS до React, продуктивності, доступності та Next.js.",
    blurbEn:
      "From semantic HTML and CSS through React, performance, accessibility, and Next.js.",
    courseSlugs: [
      "html_semantics",
      "css_layout",
      "js_fundamentals",
      "typescript",
      "browser_web_apis",
      "react_fundamentals",
      "frontend_performance",
      "web_accessibility",
      "nextjs_fullstack",
      "web_security",
    ],
  },
  {
    slug: "backend-dev",
    icon: "🛠️",
    color: "#0F766E",
    titleUk: "Бекенд-розробка",
    titleEn: "Backend development",
    blurbUk:
      "Node і Express, дизайн REST API, SQL, PostgreSQL, Go та основи безпеки.",
    blurbEn: "Node and Express, REST API design, SQL, PostgreSQL, Go, and web security.",
    courseSlugs: [
      "js_fundamentals",
      "node_fundamentals",
      "express_fundamentals",
      "rest_api_design",
      "sql_fundamentals",
      "postgresql_apps",
      "go_fundamentals",
      "git_workflows",
      "web_security",
    ],
  },
  {
    slug: "qa-engineer",
    icon: "🧪",
    color: "#7C3AED",
    titleUk: "QA-інженер",
    titleEn: "QA engineer",
    blurbUk:
      "Теорія якості, практичне тестування, основи коду й SQL, Git і безпека.",
    blurbEn: "Quality theory, hands-on testing, coding and SQL basics, Git, and security.",
    courseSlugs: [
      "qa_theory",
      "software_testing",
      "programming",
      "js_fundamentals",
      "sql_fundamentals",
      "git_workflows",
      "web_security",
    ],
  },
  {
    slug: "ai-builder",
    icon: "🤖",
    color: "#DB2777",
    titleUk: "AI-будівник",
    titleEn: "AI builder",
    blurbUk:
      "Python для AI, асистована розробка, агенти й RAG, LLMOps, безпека та продукт.",
    blurbEn:
      "Python for AI, AI-assisted development, agents and RAG, LLMOps, security, and product.",
    courseSlugs: [
      "python_for_ai",
      "ai_development",
      "agentic_systems",
      "llmops",
      "ai_security",
      "ai_product",
    ],
  },
  {
    slug: "dba-sql",
    icon: "🗄️",
    color: "#C2410C",
    titleUk: "DBA та SQL",
    titleEn: "DBA / SQL",
    blurbUk:
      "SQL і Oracle, PostgreSQL для додатків, REST як клієнт даних і основи бекенду.",
    blurbEn: "SQL and Oracle, PostgreSQL for apps, REST as a data client, and backend basics.",
    courseSlugs: [
      "sql_fundamentals",
      "postgresql_apps",
      "rest_api_design",
      "node_fundamentals",
      "web_security",
    ],
  },
  {
    slug: "devops",
    icon: "🚀",
    color: "#0369A1",
    titleUk: "DevOps-інженер",
    titleEn: "DevOps",
    blurbUk: "Сисадмін, Git і командні воркфлоу, DevOps-практики та безпека вебу.",
    blurbEn: "Sysadmin, Git and team workflows, DevOps practices, and web security.",
    courseSlugs: ["sysadmin", "git_workflows", "devops", "web_security", "node_fundamentals"],
  },
  {
    slug: "english-fluency",
    icon: "📗",
    color: "#58CC02",
    titleUk: "Англійська: вільне володіння",
    titleEn: "English fluency",
    blurbUk:
      "Від A1 до C1: граматика, вимова, словник і іспитові навички — з фокусом на типових помилках українських мовців.",
    blurbEn:
      "From A1 to C1: grammar, pronunciation, vocabulary, and exam skills, with a focus on typical mistakes of Ukrainian speakers.",
    courseSlugs: ["english"],
  },
  {
    slug: "chess-mastery",
    icon: "♟️",
    color: "#1B1B1B",
    titleUk: "Шахи: від основ до майстерності",
    titleEn: "Chess mastery",
    blurbUk:
      "Від початківця до просунутого: тактика і мати, дебюти як ідеї, мітельшпіль, ендшпілі та класичні партії.",
    blurbEn:
      "From beginner to advanced: tactics and mating patterns, openings as ideas, middlegame strategy, endgames, and famous games.",
    courseSlugs: ["chess"],
  },
] as const;

export type CourseProgressSnapshot = {
  slug: string;
  completedLessons: number;
  totalLessons: number;
};

export type LearningPathProgress = {
  slug: LearningPathSlug;
  completedLessons: number;
  totalLessons: number;
  completedCourses: number;
  totalCourses: number;
  ratio: number;
  /** First course in the path that is not fully complete, or the last course. */
  nextCourseSlug: CourseSlug;
};

export function getLearningPath(slug: string): LearningPathDef | null {
  return LEARNING_PATHS.find((p) => p.slug === slug) ?? null;
}

export function pathsForCourse(courseSlug: string): LearningPathDef[] {
  if (!isCourseSlug(courseSlug)) return [];
  return LEARNING_PATHS.filter((p) => p.courseSlugs.includes(courseSlug));
}

export function computePathProgress(
  path: LearningPathDef,
  courses: readonly CourseProgressSnapshot[],
): LearningPathProgress {
  const bySlug = new Map(courses.map((c) => [c.slug, c]));
  let completedLessons = 0;
  let totalLessons = 0;
  let completedCourses = 0;
  let nextCourseSlug: CourseSlug = path.courseSlugs[0]!;
  let nextPicked = false;
  for (const slug of path.courseSlugs) {
    const row = bySlug.get(slug);
    const total = Math.max(0, row?.totalLessons ?? 0);
    const done = Math.max(0, Math.min(total, row?.completedLessons ?? 0));
    totalLessons += total;
    completedLessons += done;
    if (total > 0 && done >= total) completedCourses += 1;
    else if (!nextPicked) {
      nextCourseSlug = slug;
      nextPicked = true;
    }
  }
  if (!nextPicked) {
    nextCourseSlug = path.courseSlugs[path.courseSlugs.length - 1]!;
  }
  return {
    slug: path.slug,
    completedLessons,
    totalLessons,
    completedCourses,
    totalCourses: path.courseSlugs.length,
    ratio: totalLessons > 0 ? Math.min(1, completedLessons / totalLessons) : 0,
    nextCourseSlug,
  };
}

export function computeAllPathProgress(
  courses: readonly CourseProgressSnapshot[],
): LearningPathProgress[] {
  return LEARNING_PATHS.map((p) => computePathProgress(p, courses));
}
