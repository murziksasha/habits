export type DailyQuestMetric =
  | "lessons"
  | "xp"
  | "focus_min"
  | "exams"
  | "gifts"
  | "talents"
  | "login";

export type DailyQuestDef = {
  key: string;
  target: number;
  rewardXp: number;
  /** How progress is counted */
  metric: DailyQuestMetric;
  titleUk: string;
  titleEn: string;
};

/** Fixed daily quest set (reset by calendar day UTC). */
export const DAILY_QUEST_DEFS: DailyQuestDef[] = [
  {
    key: "lessons_1",
    target: 1,
    rewardXp: 15,
    metric: "lessons",
    titleUk: "Пройти 1 урок",
    titleEn: "Complete 1 lesson",
  },
  {
    key: "xp_40",
    target: 40,
    rewardXp: 20,
    metric: "xp",
    titleUk: "Набрати 40 XP",
    titleEn: "Earn 40 XP",
  },
  {
    key: "focus_10",
    target: 10,
    rewardXp: 15,
    metric: "focus_min",
    titleUk: "10 хв фокусу",
    titleEn: "10 min focus",
  },
  {
    key: "exams_1",
    target: 1,
    rewardXp: 25,
    metric: "exams",
    titleUk: "1 контрольна",
    titleEn: "Pass 1 exam",
  },
  {
    key: "gift_1",
    target: 1,
    rewardXp: 18,
    metric: "gifts",
    titleUk: "Подарунок другу",
    titleEn: "Send a friend gift",
  },
  {
    key: "talent_1",
    target: 1,
    rewardXp: 20,
    metric: "talents",
    titleUk: "Прокачай талант",
    titleEn: "Upgrade a talent",
  },
  {
    key: "login_1",
    target: 1,
    rewardXp: 10,
    metric: "login",
    titleUk: "Щоденний вхід",
    titleEn: "Daily check-in",
  },
];

export function todayUtc(): string {
  return new Date().toISOString().slice(0, 10);
}

export function questTitle(def: DailyQuestDef, locale: "uk" | "en"): string {
  return locale === "en" ? def.titleEn : def.titleUk;
}
