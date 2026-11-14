/**
 * Canonical Skill and Learning Objectives Registry (SPEC Wave 1).
 * Maps courses and units to concrete, observable actions, prerequisites,
 * common failure modes, evidence criteria, and practical outcomes.
 */

import { type CourseSlug } from "./courses.js";

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
  // Programming & HTML Foundations
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
  // HTML Semantics Deep Track
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
  // JavaScript Event Loop & Async
  {
    id: "js.async.event_loop",
    courseSlug: "js_fundamentals",
    unitSlug: "async-await",
    titleUk: "Event Loop, черга мікрозадач та Promises",
    titleEn: "Event Loop, Microtask Queue & Promises",
    actionUk: "Передбачати та керувати порядком виконання синхронного коду, мікротасок та макротасок",
    actionEn: "Predict and control execution order across synchronous code, microtasks, and macrotasks",
    prerequisites: ["js.fundamentals.basics"],
    commonErrors: [
      {
        code: "unhandled_rejection",
        labelUk: "Необроблений виняток у промісі",
        labelEn: "Unhandled promise rejection",
        fixUk: "Завжди додавайте .catch() або огинайте await блоком try/catch",
        fixEn: "Always chain .catch() or wrap await calls in try/catch blocks",
      },
      {
        code: "stale_closure_async",
        labelUk: "Застаріле замикання після асинхронного виклику",
        labelEn: "Stale closure after asynchronous delay",
        fixUk: "Передавайте актуальний стан або використовуйте функціональне оновлення",
        fixEn: "Reference fresh state or use functional state updates",
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
  // TypeScript Narrowing & Strict Unions
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
      {
        code: "missing_union_exhaustiveness",
        labelUk: "Неповний розбір варіантів у switch",
        labelEn: "Missing exhaustive check in union switch",
        fixUk: "Додайте перевірку `never` у гілку default для виявлення пропущених типів",
        fixEn: "Add an exhaustive `const _exhaustive: never = val` check in default case",
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
  // SQL Fundamentals & Relational Data
  {
    id: "sql.joins.aggregates",
    courseSlug: "sql_fundamentals",
    unitSlug: "aggregates",
    titleUk: "Агрегація даних, GROUP BY та фільтрація HAVING",
    titleEn: "Data Aggregation, GROUP BY & HAVING Filters",
    actionUk: "Складати аналітичні запити з групуванням, розрізняючи WHERE і HAVING",
    actionEn: "Construct analytical queries with grouping, clearly distinguishing WHERE from HAVING",
    prerequisites: ["sql.select.filters"],
    commonErrors: [
      {
        code: "where_having_confusion",
        labelUk: "Використання WHERE замість HAVING для агрегатних функцій",
        labelEn: "Using WHERE instead of HAVING for aggregate conditions",
        fixUk: "Фільтруйте сирі рядки у WHERE, а результати COUNT/SUM/AVG — у HAVING",
        fixEn: "Filter source rows in WHERE; filter aggregate results in HAVING",
      },
      {
        code: "unselected_group_column",
        labelUk: "Неагрегована колонка у SELECT відсутня в GROUP BY",
        labelEn: "Non-aggregated column missing from GROUP BY clause",
        fixUk: "Кожна колонка у SELECT має бути або в GROUP BY, або всередині агрегатної функції",
        fixEn: "Every selected column must be either in the GROUP BY clause or in an aggregate",
      },
    ],
    evidenceCriteria: [
      "Запит повертає ідентичний результат на кількох тестових наборах даних",
      "Коректна обробка значень NULL в агрегатних функціях",
    ],
    relatedCourses: ["postgresql_apps", "express_fundamentals"],
    practicalOutcomeUk: "Швидке та точне вилучення підсумкових метрик з бази даних",
    practicalOutcomeEn: "Accurate extraction of business metrics and reporting aggregates",
  },
  // Security & Trust Boundaries
  {
    id: "security.trust.boundaries",
    courseSlug: "web_security",
    unitSlug: "injection-defense",
    titleUk: "Межі довіри, санітизація та захист від ін'єкцій",
    titleEn: "Trust Boundaries, Sanitization & Injection Defense",
    actionUk: "Ізолювати вхідні дані користувача, застосовувати параметризовані запити та екранування",
    actionEn: "Isolate untrusted input, apply parameterized queries and context-aware escaping",
    prerequisites: ["express.middleware.auth", "sql.joins.aggregates"],
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
