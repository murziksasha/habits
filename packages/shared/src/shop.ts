export type ShopItem = {
  id: string;
  costXp: number;
  kind: "hearts_full" | "heart_one" | "streak_freeze" | "avatar" | "mystery" | "skill_point";
  avatarKey?: string;
  hearts?: number;
  /** How many freezes to grant (streak_freeze only); default 1 */
  freezes?: number;
  /** skill_point pack size */
  skillPoints?: number;
};

/** Catalog of purchasable items (XP currency). */
export const SHOP_CATALOG: ShopItem[] = [
  { id: "heart_one", costXp: 35, kind: "heart_one", hearts: 1 },
  { id: "hearts_full", costXp: 100, kind: "hearts_full" },
  { id: "streak_freeze", costXp: 80, kind: "streak_freeze", freezes: 1 },
  /** Pack of 3 shields (alias branding: streak shield) */
  {
    id: "streak_shield_pack",
    costXp: 200,
    kind: "streak_freeze",
    freezes: 3,
  },
  { id: "avatar_dragon", costXp: 60, kind: "avatar", avatarKey: "dragon" },
  { id: "avatar_ninja", costXp: 60, kind: "avatar", avatarKey: "ninja" },
  { id: "avatar_owl", costXp: 50, kind: "avatar", avatarKey: "owl" },
  { id: "avatar_panda", costXp: 50, kind: "avatar", avatarKey: "panda" },
  { id: "avatar_phoenix", costXp: 120, kind: "avatar", avatarKey: "phoenix" },
  { id: "avatar_cosmic", costXp: 120, kind: "avatar", avatarKey: "cosmic" },
  { id: "avatar_samurai", costXp: 90, kind: "avatar", avatarKey: "samurai" },
  { id: "avatar_mage", costXp: 90, kind: "avatar", avatarKey: "mage" },
  { id: "avatar_cyborg", costXp: 100, kind: "avatar", avatarKey: "cyborg" },
  { id: "avatar_unicorn", costXp: 110, kind: "avatar", avatarKey: "unicorn" },
  /** Self mystery crate — rolls cosmetics / XP / shields */
  { id: "mystery_crate", costXp: 75, kind: "mystery" },
  /** Buy a skill point if you are short on levels */
  { id: "skill_point_1", costXp: 90, kind: "skill_point", skillPoints: 1 },
  { id: "skill_point_3", costXp: 240, kind: "skill_point", skillPoints: 3 },
];

export const DEFAULT_AVATARS = [
  "default",
  "wizard",
  "knight",
  "scholar",
  "fox",
  "robot",
] as const;

export function shopItemById(id: string): ShopItem | undefined {
  return SHOP_CATALOG.find((i) => i.id === id);
}
