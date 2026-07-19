export type DailyQuestDef = {
  key: string;
  target: number;
  rewardXp: number;
  /** How progress is counted */
  metric: "lessons" | "xp" | "focus_min";
};

/** Fixed daily quest set (reset by calendar day UTC). */
export const DAILY_QUEST_DEFS: DailyQuestDef[] = [
  { key: "lessons_1", target: 1, rewardXp: 15, metric: "lessons" },
  { key: "xp_40", target: 40, rewardXp: 20, metric: "xp" },
  { key: "focus_10", target: 10, rewardXp: 15, metric: "focus_min" },
];

export function todayUtc(): string {
  return new Date().toISOString().slice(0, 10);
}
