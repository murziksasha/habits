/** English placement test (CEFR-ish) */

export type PlacementQuestion = {
  id: string;
  promptUk: string;
  promptEn: string;
  options: string[];
  correctIndex: number;
  weight: number;
};

export const ENGLISH_PLACEMENT: PlacementQuestion[] = [
  {
    id: "p1",
    promptUk: "Оберіть правильне: I ___ a student.",
    promptEn: "Choose: I ___ a student.",
    options: ["am", "is", "are", "be"],
    correctIndex: 0,
    weight: 1,
  },
  {
    id: "p2",
    promptUk: "She ___ to school every day.",
    promptEn: "She ___ to school every day.",
    options: ["go", "goes", "going", "gone"],
    correctIndex: 1,
    weight: 1,
  },
  {
    id: "p3",
    promptUk: "There ___ two books on the table.",
    promptEn: "There ___ two books on the table.",
    options: ["is", "are", "be", "was"],
    correctIndex: 1,
    weight: 1,
  },
  {
    id: "p4",
    promptUk: "I ___ dinner when you called.",
    promptEn: "I ___ dinner when you called.",
    options: ["cook", "cooked", "was cooking", "am cooking"],
    correctIndex: 2,
    weight: 1.5,
  },
  {
    id: "p5",
    promptUk: "If it rains, we ___ at home.",
    promptEn: "If it rains, we ___ at home.",
    options: ["stay", "will stay", "stayed", "staying"],
    correctIndex: 1,
    weight: 1.5,
  },
  {
    id: "p6",
    promptUk: "He has already ___ the email.",
    promptEn: "He has already ___ the email.",
    options: ["send", "sent", "sending", "sends"],
    correctIndex: 1,
    weight: 1.5,
  },
  {
    id: "p7",
    promptUk: "The book ___ by millions of people.",
    promptEn: "The book ___ by millions of people.",
    options: ["reads", "is reading", "was read", "readed"],
    correctIndex: 2,
    weight: 2,
  },
  {
    id: "p8",
    promptUk: "I wish I ___ more time yesterday.",
    promptEn: "I wish I ___ more time yesterday.",
    options: ["have", "had", "had had", "would have"],
    correctIndex: 2,
    weight: 2,
  },
  {
    id: "p9",
    promptUk: "Synonym of «purchase»:",
    promptEn: "Synonym of «purchase»:",
    options: ["sell", "buy", "break", "lose"],
    correctIndex: 1,
    weight: 1,
  },
  {
    id: "p10",
    promptUk: "Despite ___ tired, she finished the work.",
    promptEn: "Despite ___ tired, she finished the work.",
    options: ["she was", "being", "to be", "been"],
    correctIndex: 1,
    weight: 2,
  },
];

export type PlacementLevel = {
  label: string;
  minScore: number;
  recommendedUnitSlug: string;
  titleUk: string;
  titleEn: string;
};

export const PLACEMENT_LEVELS: PlacementLevel[] = [
  {
    label: "A1",
    minScore: 0,
    recommendedUnitSlug: "basics-1",
    titleUk: "Початківець",
    titleEn: "Beginner",
  },
  {
    label: "A2",
    minScore: 0.35,
    recommendedUnitSlug: "basics-1",
    titleUk: "Елементарний",
    titleEn: "Elementary",
  },
  {
    label: "B1",
    minScore: 0.55,
    recommendedUnitSlug: "basics-2",
    titleUk: "Середній",
    titleEn: "Intermediate",
  },
  {
    label: "B2",
    minScore: 0.75,
    recommendedUnitSlug: "travel",
    titleUk: "Вище середнього",
    titleEn: "Upper-intermediate",
  },
  {
    label: "C1",
    minScore: 0.9,
    recommendedUnitSlug: "work-life",
    titleUk: "Просунутий",
    titleEn: "Advanced",
  },
];

export function scorePlacement(
  answers: { questionId: string; index: number }[],
  bank: PlacementQuestion[] = ENGLISH_PLACEMENT,
  levels: PlacementLevel[] = PLACEMENT_LEVELS,
): { score: number; level: PlacementLevel; correct: number; total: number } {
  let earned = 0;
  let total = 0;
  let correct = 0;
  for (const q of bank) {
    total += q.weight;
    const a = answers.find((x) => x.questionId === q.id);
    if (a && a.index === q.correctIndex) {
      earned += q.weight;
      correct += 1;
    }
  }
  const score = total > 0 ? earned / total : 0;
  let level = levels[0]!;
  for (const l of levels) {
    if (score >= l.minScore) level = l;
  }
  return { score, level, correct, total: bank.length };
}

/** Programming placement (stack level) */
export const PROGRAMMING_PLACEMENT: PlacementQuestion[] = [
  {
    id: "pp1",
    promptUk: "Тег для посилання в HTML:",
    promptEn: "HTML link tag:",
    options: ["<link>", "<a>", "<href>", "<url>"],
    correctIndex: 1,
    weight: 1,
  },
  {
    id: "pp2",
    promptUk: "CSS: вирівнювання по main axis у flex:",
    promptEn: "CSS flex main-axis alignment:",
    options: ["align-items", "justify-content", "float", "z-index"],
    correctIndex: 1,
    weight: 1,
  },
  {
    id: "pp3",
    promptUk: "const у JS означає:",
    promptEn: "const in JS means:",
    options: ["завжди mutable", "binding не переприсвоюється", "тільки number", "HTML attr"],
    correctIndex: 1,
    weight: 1,
  },
  {
    id: "pp4",
    promptUk: "TypeScript додає:",
    promptEn: "TypeScript adds:",
    options: ["CSS modules only", "статичні типи поверх JS", "SQL ORM", "Docker"],
    correctIndex: 1,
    weight: 1.2,
  },
  {
    id: "pp5",
    promptUk: "useState у React — це:",
    promptEn: "useState in React is:",
    options: ["router", "hook локального стану", "HTTP client", "DB query"],
    correctIndex: 1,
    weight: 1.2,
  },
  {
    id: "pp6",
    promptUk: "git commit робить:",
    promptEn: "git commit:",
    options: ["push to remote only", "знімок змін у історії", "npm install", "deploy"],
    correctIndex: 1,
    weight: 1,
  },
  {
    id: "pp7",
    promptUk: "Node.js — це:",
    promptEn: "Node.js is:",
    options: ["браузер", "JS runtime поза браузером", "CSS framework", "SQL DB"],
    correctIndex: 1,
    weight: 1.2,
  },
  {
    id: "pp8",
    promptUk: "Express middleware викликає next() щоб:",
    promptEn: "Express middleware calls next() to:",
    options: ["закрити Node", "передати далі по ланцюгу", "DROP table", "компілювати TS"],
    correctIndex: 1,
    weight: 1.5,
  },
  {
    id: "pp9",
    promptUk: "SQL INNER JOIN повертає:",
    promptEn: "SQL INNER JOIN returns:",
    options: ["лише ліву таблицю", "рядки збігу", "усі комбінації завжди", "JSON only"],
    correctIndex: 1,
    weight: 1.5,
  },
  {
    id: "pp10",
    promptUk: "Unit test перевіряє:",
    promptEn: "A unit test checks:",
    options: ["лише production UI", "малий ізольований модуль/функцію", "весь інтернет", "CSS only"],
    correctIndex: 1,
    weight: 1,
  },
];

export const PROGRAMMING_PLACEMENT_LEVELS: PlacementLevel[] = [
  {
    label: "Beginner",
    minScore: 0,
    recommendedUnitSlug: "html",
    titleUk: "Початок path (HTML)",
    titleEn: "Start path (HTML)",
  },
  {
    label: "JS-ready",
    minScore: 0.4,
    recommendedUnitSlug: "js",
    titleUk: "Впевнений у базі → JS",
    titleEn: "Solid basics → JS",
  },
  {
    label: "Frontend",
    minScore: 0.55,
    recommendedUnitSlug: "react",
    titleUk: "Frontend path (React)",
    titleEn: "Frontend path (React)",
  },
  {
    label: "Fullstack",
    minScore: 0.7,
    recommendedUnitSlug: "node",
    titleUk: "Backend path (Node)",
    titleEn: "Backend path (Node)",
  },
  {
    label: "Data+QA",
    minScore: 0.85,
    recommendedUnitSlug: "sql",
    titleUk: "SQL і якість",
    titleEn: "SQL & quality",
  },
];

export function scoreProgrammingPlacement(
  answers: { questionId: string; index: number }[],
) {
  return scorePlacement(answers, PROGRAMMING_PLACEMENT, PROGRAMMING_PLACEMENT_LEVELS);
}
