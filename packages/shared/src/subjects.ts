import type { CourseSlug } from "./courses.js";

/** Learner-facing catalog subjects. Stable ids, not implementation groups. */
export const SUBJECT_IDS = ["languages", "thinking", "learning", "technology"] as const;

export type SubjectId = (typeof SUBJECT_IDS)[number];

export const SUBJECT_META: Record<
  SubjectId,
  { titleUk: string; titleEn: string; blurbUk: string; blurbEn: string; order: number }
> = {
  languages: {
    titleUk: "Мови",
    titleEn: "Languages",
    blurbUk: "Читати, говорити й писати іншою мовою.",
    blurbEn: "Read, speak, and write in another language.",
    order: 1,
  },
  thinking: {
    titleUk: "Мислення і стратегія",
    titleEn: "Thinking & Strategy",
    blurbUk: "Логіка, задачі та шахи.",
    blurbEn: "Logic, puzzles, and chess.",
    order: 2,
  },
  learning: {
    titleUk: "Навички навчання",
    titleEn: "Learning Skills",
    blurbUk: "Друк і швидше, уважніше читання.",
    blurbEn: "Typing and faster, more careful reading.",
    order: 3,
  },
  technology: {
    titleUk: "Технології",
    titleEn: "Technology",
    blurbUk: "Програмування, дані та інструменти.",
    blurbEn: "Programming, data, and tools.",
    order: 4,
  },
};

export const COURSE_SUBJECT: Record<CourseSlug, SubjectId> = {
  english: "languages",
  logic: "thinking",
  chess: "thinking",
  typing: "learning",
  speed_reading: "learning",
  programming: "technology",
  typescript: "technology",
  html_semantics: "technology",
  css_layout: "technology",
  qa_theory: "technology",
  js_fundamentals: "technology",
  react_fundamentals: "technology",
  sql_fundamentals: "technology",
  node_fundamentals: "technology",
  express_fundamentals: "technology",
  embedded_cpp: "technology",
  sysadmin: "technology",
  devops: "technology",
  software_testing: "technology",
  postgresql_apps: "technology",
  git_workflows: "technology",
  web_security: "technology",
  ai_development: "technology",
  python_for_ai: "technology",
  agentic_systems: "technology",
  llmops: "technology",
  ai_security: "technology",
  ai_product: "technology",
  nextjs_fullstack: "technology",
  applied_algorithms: "technology",
  go_fundamentals: "technology",
  web_accessibility: "technology",
  rest_api_design: "technology",
};

export function subjectForCourse(slug: string): SubjectId {
  if ((SUBJECT_IDS as readonly string[]).includes(slug)) return slug as SubjectId;
  if (slug in COURSE_SUBJECT) return COURSE_SUBJECT[slug as CourseSlug];
  return "technology";
}

export function coursesInSubject(subject: SubjectId): CourseSlug[] {
  return (Object.keys(COURSE_SUBJECT) as CourseSlug[]).filter(
    (slug) => COURSE_SUBJECT[slug] === subject,
  );
}
