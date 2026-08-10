/**
 * UX helpers — pure logic for persona nav, post-register routing,
 * contextual toolkit, freemium path labels, lesson miss titles.
 * Keep web/API free of duplicated decision trees.
 */

export type UxPersona = "student" | "parent" | "teacher";
export type UxTrack = "skills" | "code" | "chess";

export type NavSlot = {
  href: string;
  /** i18n key-ish label id for clients */
  id:
    | "home"
    | "learn"
    | "courses"
    | "code"
    | "play"
    | "profile"
    | "children"
    | "reports"
    | "family"
    | "desk"
    | "homework"
    | "class"
    | "friends";
  icon: string;
};

/** Boolean onboarding keys written by wizard / complete endpoint */
export const UX_ONBOARDING_KEYS = [
  "wizardCompleted",
  "personaStudent",
  "personaParent",
  "personaTeacher",
  "trackSkills",
  "trackCode",
  "trackChess",
  "viewedLearnMap",
  "triedProgramming",
  "completedFirstLesson",
  "triedChess",
  "triedFlashcards",
  "viewedLeaderboard",
  "exploredPricing",
  "dismissed",
] as const;

export type UxOnboardingKey = (typeof UX_ONBOARDING_KEYS)[number];

export function isUxOnboardingKey(k: string): k is UxOnboardingKey {
  return (UX_ONBOARDING_KEYS as readonly string[]).includes(k);
}

/** Resolve persona from onboarding map (first match wins). */
export function resolvePersona(
  onboarding: Record<string, unknown> | null | undefined,
): UxPersona {
  const o = onboarding ?? {};
  if (o.personaParent === true || o.personaParent === "true") return "parent";
  if (o.personaTeacher === true || o.personaTeacher === "true") return "teacher";
  return "student";
}

export function resolveTracks(
  onboarding: Record<string, unknown> | null | undefined,
): UxTrack[] {
  const o = onboarding ?? {};
  const tracks: UxTrack[] = [];
  if (o.trackSkills) tracks.push("skills");
  if (o.trackCode) tracks.push("code");
  if (o.trackChess) tracks.push("chess");
  return tracks;
}

export function wizardCompleted(
  onboarding: Record<string, unknown> | null | undefined,
): boolean {
  return Boolean(onboarding?.wizardCompleted);
}

/** Desktop primary slots (≤6). */
export function primaryNavForPersona(persona: UxPersona): NavSlot[] {
  switch (persona) {
    case "parent":
      return [
        { href: "/parents", id: "children", icon: "👪" },
        { href: "/reports", id: "reports", icon: "📊" },
        { href: "/family", id: "family", icon: "👨‍👩‍👧‍👦" },
        { href: "/learn", id: "learn", icon: "🗺️" },
        { href: "/profile", id: "profile", icon: "🧙" },
      ];
    case "teacher":
      return [
        { href: "/teacher", id: "desk", icon: "👩‍🏫" },
        { href: "/homework", id: "homework", icon: "📝" },
        { href: "/schools", id: "class", icon: "🏫" },
        { href: "/learn", id: "learn", icon: "🗺️" },
        { href: "/profile", id: "profile", icon: "🧙" },
      ];
    default:
      return [
        { href: "/dashboard", id: "home", icon: "🏠" },
        { href: "/learn", id: "learn", icon: "🗺️" },
        { href: "/courses", id: "courses", icon: "📚" },
        { href: "/programming", id: "code", icon: "💻" },
        { href: "/play", id: "play", icon: "♟️" },
        { href: "/friends", id: "friends", icon: "👥" },
      ];
  }
}

/** Mobile bottom 5. */
export function mobileNavForPersona(persona: UxPersona): NavSlot[] {
  switch (persona) {
    case "parent":
      return [
        { href: "/parents", id: "children", icon: "👪" },
        { href: "/reports", id: "reports", icon: "📊" },
        { href: "/family", id: "family", icon: "👨‍👩‍👧‍👦" },
        { href: "/learn", id: "learn", icon: "🗺️" },
        { href: "/profile", id: "profile", icon: "🧙" },
      ];
    case "teacher":
      return [
        { href: "/teacher", id: "desk", icon: "👩‍🏫" },
        { href: "/homework", id: "homework", icon: "📝" },
        { href: "/schools", id: "class", icon: "🏫" },
        { href: "/learn", id: "learn", icon: "🗺️" },
        { href: "/profile", id: "profile", icon: "🧙" },
      ];
    default:
      return [
        { href: "/learn", id: "learn", icon: "🗺️" },
        { href: "/programming", id: "code", icon: "💻" },
        { href: "/play", id: "play", icon: "♟️" },
        { href: "/courses", id: "courses", icon: "📚" },
        { href: "/profile", id: "profile", icon: "🧙" },
      ];
  }
}

/**
 * Post-register / post-wizard destination.
 * Intent from landing query: skills | code | chess | parent | teacher | friend
 */
export function postRegisterPath(opts: {
  hasFriendInvite?: boolean;
  intent?: string | null;
  persona?: UxPersona | null;
  track?: UxTrack | null;
  wizardDone?: boolean;
}): string {
  if (opts.hasFriendInvite) return "/friends";
  const intent = (opts.intent ?? "").toLowerCase();
  if (intent === "parent" || opts.persona === "parent") return "/parents";
  if (intent === "teacher" || opts.persona === "teacher") return "/teacher";
  if (intent === "code" || opts.track === "code") return "/programming";
  if (intent === "chess" || opts.track === "chess") return "/play";
  if (intent === "skills" || opts.track === "skills") return "/courses/english";
  // Prefer learn map for first lesson path (thin home later)
  return "/learn";
}

export type ToolkitItem = {
  href: string;
  id: "review" | "playground" | "flashcards" | "tutor" | "exam" | "quests" | "tree" | "portfolio";
  icon: string;
  priority: number;
};

export type ToolkitContext = {
  weakLessonCount?: number;
  examReadyCount?: number;
  codeLessonsCompleted?: number;
  hasProgrammingProgress?: boolean;
  flashcardDue?: number;
};

/** Max 3 contextual study tools for Learn page. */
export function pickContextualToolkit(ctx: ToolkitContext, max = 3): ToolkitItem[] {
  const pool: ToolkitItem[] = [];
  if ((ctx.weakLessonCount ?? 0) >= 1) {
    pool.push({ href: "/review", id: "review", icon: "🔁", priority: 100 });
  }
  if ((ctx.examReadyCount ?? 0) >= 1) {
    pool.push({ href: "/learn#exams", id: "exam", icon: "📝", priority: 90 });
  }
  if ((ctx.flashcardDue ?? 0) > 0) {
    pool.push({ href: "/flashcards", id: "flashcards", icon: "🃏", priority: 80 });
  }
  if (ctx.hasProgrammingProgress || (ctx.codeLessonsCompleted ?? 0) > 0) {
    pool.push({ href: "/playground", id: "playground", icon: "🖥️", priority: 70 });
  }
  if ((ctx.codeLessonsCompleted ?? 0) >= 3) {
    pool.push({ href: "/programming/tree", id: "tree", icon: "🌳", priority: 50 });
  }
  if ((ctx.codeLessonsCompleted ?? 0) >= 5) {
    pool.push({ href: "/portfolio", id: "portfolio", icon: "📁", priority: 40 });
  }
  // Always-available soft defaults if pool empty / short
  pool.push({ href: "/tutor", id: "tutor", icon: "🤖", priority: 20 });
  pool.push({ href: "/quests", id: "quests", icon: "✅", priority: 10 });
  pool.push({ href: "/flashcards", id: "flashcards", icon: "🃏", priority: 5 });

  const seen = new Set<string>();
  const sorted = pool
    .filter((x) => {
      if (seen.has(x.href)) return false;
      seen.add(x.href);
      return true;
    })
    .sort((a, b) => b.priority - a.priority);
  return sorted.slice(0, max);
}

/** Human label for exercise type in lesson summary. */
export function exerciseTypeLabel(
  type: string | undefined,
  locale: "uk" | "en" = "uk",
): string {
  const en = locale === "en";
  const map: Record<string, [string, string]> = {
    mcq: ["Вибір відповіді", "Multiple choice"],
    logic_puzzle: ["Логіка", "Logic puzzle"],
    code_read: ["Читання коду", "Code reading"],
    code_output: ["Вивід коду", "Code output"],
    code_fill: ["Дописати код", "Fill code"],
    code_order: ["Порядок коду", "Code order"],
    code_project: ["Міні-проєкт", "Mini project"],
    code_run: ["Запуск коду", "Run code"],
    code_judge: ["Judge", "Judge"],
    translate: ["Переклад", "Translate"],
    fill_blank: ["Пропуск", "Fill blank"],
    match: ["Відповідність", "Match"],
    order_words: ["Порядок слів", "Word order"],
    typing: ["Друк", "Typing"],
    rsvp: ["RSVP", "RSVP"],
    comprehension: ["Розуміння", "Comprehension"],
    chess_puzzle: ["Шахова задача", "Chess puzzle"],
    chess_lesson: ["Шаховий урок", "Chess lesson"],
    video: ["Відео", "Video"],
  };
  const pair = type ? map[type] : undefined;
  if (!pair) return type || (en ? "Exercise" : "Вправа");
  return en ? pair[1] : pair[0];
}

export function freemiumPathLabel(opts: {
  freeCompleted: number;
  freeLessonCount: number;
  isPremium: boolean;
  locale?: "uk" | "en";
}): string {
  if (opts.isPremium) {
    return opts.locale === "en" ? "Premium · all unlocked" : "Premium · усе відкрито";
  }
  const left = Math.max(0, opts.freeLessonCount - opts.freeCompleted);
  if (opts.locale === "en") {
    return `${opts.freeCompleted}/${opts.freeLessonCount} free · ${left} left`;
  }
  return `${opts.freeCompleted}/${opts.freeLessonCount} free · лишилось ${left}`;
}

/** Static discovery tools for ⌘K / search hub (no network). */
export function discoveryTools(): {
  href: string;
  titleUk: string;
  titleEn: string;
  keywords: string;
  group: string;
}[] {
  return [
    {
      href: "/learn",
      titleUk: "Карта навчання",
      titleEn: "Learning map",
      keywords: "learn map mission next",
      group: "core",
    },
    {
      href: "/programming",
      titleUk: "Programming path",
      titleEn: "Programming path",
      keywords: "code programming js",
      group: "core",
    },
    {
      href: "/playground",
      titleUk: "Playground",
      titleEn: "Playground",
      keywords: "sandbox monaco code",
      group: "core",
    },
    {
      href: "/play",
      titleUk: "Шахи online",
      titleEn: "Chess online",
      keywords: "chess play bot",
      group: "core",
    },
    {
      href: "/review",
      titleUk: "Повторення",
      titleEn: "Review",
      keywords: "review weak mastery",
      group: "toolkit",
    },
    {
      href: "/flashcards",
      titleUk: "Картки",
      titleEn: "Flashcards",
      keywords: "srs flashcards",
      group: "toolkit",
    },
    {
      href: "/tutor",
      titleUk: "Тьютор",
      titleEn: "Tutor",
      keywords: "ai tutor help",
      group: "toolkit",
    },
    {
      href: "/quests",
      titleUk: "Квести",
      titleEn: "Quests",
      keywords: "quests daily",
      group: "toolkit",
    },
    {
      href: "/certificates",
      titleUk: "Сертифікати",
      titleEn: "Certificates",
      keywords: "cert certificate",
      group: "social",
    },
    {
      href: "/portfolio",
      titleUk: "Портфоліо",
      titleEn: "Portfolio",
      keywords: "portfolio projects",
      group: "social",
    },
    {
      href: "/programming/tree",
      titleUk: "Дерево навичок",
      titleEn: "Skill tree",
      keywords: "skill tree code",
      group: "toolkit",
    },
    {
      href: "/pricing",
      titleUk: "Тарифи",
      titleEn: "Pricing",
      keywords: "premium pricing plan",
      group: "account",
    },
    {
      href: "/parents",
      titleUk: "Батьки",
      titleEn: "Parents",
      keywords: "parent family child",
      group: "school",
    },
    {
      href: "/teacher",
      titleUk: "Учитель",
      titleEn: "Teacher desk",
      keywords: "teacher homework class",
      group: "school",
    },
    {
      href: "/family",
      titleUk: "Сімʼя",
      titleEn: "Family plan",
      keywords: "family seats",
      group: "school",
    },
    {
      href: "/friends",
      titleUk: "Друзі",
      titleEn: "Friends",
      keywords: "friends social",
      group: "social",
    },
    {
      href: "/leaderboard",
      titleUk: "Рейтинг",
      titleEn: "Leaderboard",
      keywords: "leaderboard rank",
      group: "social",
    },
  ];
}

export function filterDiscoveryTools(
  q: string,
  locale: "uk" | "en" = "uk",
): ReturnType<typeof discoveryTools> {
  const needle = q.trim().toLowerCase();
  if (!needle) return discoveryTools().slice(0, 8);
  return discoveryTools().filter((t) => {
    const title = locale === "en" ? t.titleEn : t.titleUk;
    return (
      title.toLowerCase().includes(needle) ||
      t.keywords.includes(needle) ||
      t.href.includes(needle)
    );
  });
}

/** Streak calendar: last N days activity flags from ISO date list. */
export function streakCalendarDays(
  activeDates: string[],
  days = 14,
  now = new Date(),
): { date: string; active: boolean; isToday: boolean }[] {
  const set = new Set(
    activeDates.map((d) => {
      const x = d.slice(0, 10);
      return x;
    }),
  );
  const out: { date: string; active: boolean; isToday: boolean }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setHours(12, 0, 0, 0);
    d.setDate(d.getDate() - i);
    const iso = d.toISOString().slice(0, 10);
    const today = new Date(now);
    today.setHours(12, 0, 0, 0);
    out.push({
      date: iso,
      active: set.has(iso),
      isToday: iso === today.toISOString().slice(0, 10),
    });
  }
  return out;
}

/** Landing persona cards (static). */
export function landingPersonas(): {
  intent: string;
  titleUk: string;
  titleEn: string;
  bodyUk: string;
  bodyEn: string;
  icon: string;
  href: string;
}[] {
  return [
    {
      intent: "skills",
      titleUk: "Навички",
      titleEn: "Skills",
      bodyUk: "Англійська, друк, логіка, швидкочитання",
      bodyEn: "English, typing, logic, speed reading",
      icon: "📚",
      href: "/register?intent=skills",
    },
    {
      intent: "code",
      titleUk: "Код",
      titleEn: "Code",
      bodyUk: "Programming path, playground, mini-projects",
      bodyEn: "Programming path, playground, mini-projects",
      icon: "💻",
      href: "/register?intent=code",
    },
    {
      intent: "chess",
      titleUk: "Шахи",
      titleEn: "Chess",
      bodyUk: "Уроки + online / бот",
      bodyEn: "Lessons + online / bot",
      icon: "♟️",
      href: "/register?intent=chess",
    },
  ];
}

/** Guest trial exercise (no auth). */
export function guestTrialMcq(locale: "uk" | "en" = "uk"): {
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
} {
  if (locale === "en") {
    return {
      prompt: "What does `const x = 1` declare in JavaScript?",
      options: ["A constant binding", "A function", "A CSS class", "A database"],
      correctIndex: 0,
      explanation: "const creates a block-scoped constant binding (not reassignable).",
    };
  }
  return {
    prompt: "Що робить `const x = 1` у JavaScript?",
    options: ["Оголошує константу", "Створює функцію", "CSS-клас", "Базу даних"],
    correctIndex: 0,
    explanation: "const створює блокову константу (без переприсвоєння).",
  };
}

export function personaToOnboardingKeys(
  persona: UxPersona,
  tracks: UxTrack[],
): Record<string, boolean> {
  const o: Record<string, boolean> = {
    wizardCompleted: true,
    personaStudent: persona === "student",
    personaParent: persona === "parent",
    personaTeacher: persona === "teacher",
    trackSkills: tracks.includes("skills"),
    trackCode: tracks.includes("code"),
    trackChess: tracks.includes("chess"),
  };
  return o;
}

/** Hearts soft-warning threshold. */
export function heartsWarningLevel(hearts: number, max: number): "ok" | "low" | "empty" {
  if (hearts <= 0) return "empty";
  if (hearts <= 1 || (max > 0 && hearts / max <= 0.25)) return "low";
  return "ok";
}

/** Safe internal redirect target (login ?next=). Rejects protocol-relative / external. */
export function safeNextPath(
  raw: string | null | undefined,
  fallback = "/learn",
): string {
  if (!raw) return fallback;
  const t = raw.trim();
  if (!t.startsWith("/") || t.startsWith("//")) return fallback;
  if (t.includes("://")) return fallback;
  // Block auth loops
  if (t.startsWith("/login") || t.startsWith("/register")) return fallback;
  return t;
}

/** Ms to show intermediate correct result sheet before next exercise. */
export const LESSON_RESULT_SHEET_MS = 1100;

/** Explanation / hint text from exercise payload for result sheet. */
export function exerciseExplanation(
  exercise: Record<string, unknown>,
  locale: "uk" | "en" = "uk",
): string {
  if (locale === "en") {
    return String(
      exercise.explanationEn ||
        exercise.hintEn ||
        exercise.explanationUk ||
        exercise.hintUk ||
        "",
    ).trim();
  }
  return String(
    exercise.explanationUk ||
      exercise.hintUk ||
      exercise.explanationEn ||
      exercise.hintEn ||
      "",
  ).trim();
}

/**
 * Approx minutes until next heart regen given last update time.
 * Returns 0 if full / paid / unknown.
 */
export function minutesUntilHeartRegen(opts: {
  hearts: number;
  maxHearts: number;
  heartsUpdatedAt?: string | Date | null;
  regenMinutes: number;
  now?: Date;
}): number {
  if (opts.hearts >= opts.maxHearts || opts.maxHearts >= 900) return 0;
  if (!opts.heartsUpdatedAt || opts.regenMinutes <= 0) return opts.regenMinutes;
  const updated = new Date(opts.heartsUpdatedAt).getTime();
  const now = (opts.now ?? new Date()).getTime();
  const elapsed = Math.max(0, now - updated);
  const cycle = opts.regenMinutes * 60 * 1000;
  const remain = cycle - (elapsed % cycle);
  return Math.max(1, Math.ceil(remain / 60000));
}

/** Whether sticky Continue should hide for this pathname. */
export function shouldHideStickyContinue(
  pathname: string,
  opts?: { playMatchActive?: boolean },
): boolean {
  if (!pathname || pathname === "/") return true;
  // Live chess match or matchmaking: no sticky overlay over the board
  if (opts?.playMatchActive && pathname.startsWith("/play")) return true;
  return (
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/reset-password") ||
    pathname.startsWith("/verify-email") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/learn") ||
    pathname.startsWith("/embed") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/classroom") ||
    pathname.includes("/lessons/")
  );
}

/** First free unlocked lesson href from course path payload. */
export function firstAvailableLessonHref(
  courseSlug: string,
  units: { lessons: { id: string; locked?: boolean; status?: string }[] }[],
): string | null {
  for (const u of units) {
    for (const l of u.lessons) {
      if (!l.locked && l.status !== "completed") {
        return `/courses/${courseSlug}/lessons/${l.id}`;
      }
    }
  }
  for (const u of units) {
    for (const l of u.lessons) {
      if (!l.locked) return `/courses/${courseSlug}/lessons/${l.id}`;
    }
  }
  return null;
}
