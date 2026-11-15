/** Friend gifts + mystery rewards catalog. */

export type GiftKind =
  | "hearts"
  | "xp"
  | "streak_freeze"
  | "avatar"
  | "title"
  | "frame"
  | "mystery";

export type GiftDef = {
  id: string;
  kind: GiftKind;
  /** XP cost for sender (0 = free limited social gift) */
  costXp: number;
  titleUk: string;
  titleEn: string;
  descUk: string;
  descEn: string;
  icon: string;
  hearts?: number;
  xp?: number;
  freezes?: number;
  avatarKey?: string;
  titleKey?: string;
  frameKey?: string;
  /** Only one free "cheer" per day even with charm */
  isCheer?: boolean;
  rarity?: "common" | "rare" | "epic" | "legendary";
};

export const GIFT_CATALOG: GiftDef[] = [
  {
    id: "cheer",
    kind: "xp",
    costXp: 0,
    titleUk: "Підтримка",
    titleEn: "Cheer",
    descUk: "+5 XP другу (безкоштовно)",
    descEn: "+5 XP to a friend (free)",
    icon: "👏",
    xp: 5,
    isCheer: true,
    rarity: "common",
  },
  {
    id: "heart_care",
    kind: "hearts",
    costXp: 25,
    titleUk: "Сердечко",
    titleEn: "Heart care",
    descUk: "+1 серце другу",
    descEn: "+1 heart to a friend",
    icon: "❤️",
    hearts: 1,
    rarity: "common",
  },
  {
    id: "xp_boost",
    kind: "xp",
    costXp: 40,
    titleUk: "XP буст",
    titleEn: "XP boost",
    descUk: "+30 XP другу",
    descEn: "+30 XP to a friend",
    icon: "⭐",
    xp: 30,
    rarity: "rare",
  },
  {
    id: "shield_gift",
    kind: "streak_freeze",
    costXp: 70,
    titleUk: "Щит у подарунок",
    titleEn: "Shield gift",
    descUk: "+1 щит серії",
    descEn: "+1 streak shield",
    icon: "🛡️",
    freezes: 1,
    rarity: "rare",
  },
  {
    id: "avatar_phoenix",
    kind: "avatar",
    costXp: 90,
    titleUk: "Аватар Фенікс",
    titleEn: "Phoenix avatar",
    descUk: "Розблоковує аватар phoenix",
    descEn: "Unlocks phoenix avatar",
    icon: "🔥",
    avatarKey: "phoenix",
    rarity: "epic",
  },
  {
    id: "avatar_cosmic",
    kind: "avatar",
    costXp: 90,
    titleUk: "Космічний аватар",
    titleEn: "Cosmic avatar",
    descUk: "Розблоковує аватар cosmic",
    descEn: "Unlocks cosmic avatar",
    icon: "🌌",
    avatarKey: "cosmic",
    rarity: "epic",
  },
  {
    id: "title_hero",
    kind: "title",
    costXp: 80,
    titleUk: "Титул Герой",
    titleEn: "Hero title",
    descUk: "Титул «Герой друзів»",
    descEn: "Title “Friend Hero”",
    icon: "🏆",
    titleKey: "hero",
    rarity: "epic",
  },
  {
    id: "frame_neon",
    kind: "frame",
    costXp: 100,
    titleUk: "Неонова рамка",
    titleEn: "Neon frame",
    descUk: "Яскрава рамка аватара",
    descEn: "Bright avatar frame",
    icon: "💠",
    frameKey: "neon",
    rarity: "epic",
  },
  {
    id: "frame_flame",
    kind: "frame",
    costXp: 120,
    titleUk: "Вогняна рамка",
    titleEn: "Flame frame",
    descUk: "Рамка полум'я",
    descEn: "Flame frame",
    icon: "🔥",
    frameKey: "flame",
    rarity: "legendary",
  },
  {
    id: "mystery_box",
    kind: "mystery",
    costXp: 55,
    titleUk: "Таємнича скринька",
    titleEn: "Mystery box",
    descUk: "Випадковий крутий лут",
    descEn: "Random cool loot",
    icon: "🎁",
    rarity: "rare",
  },
];

export function giftById(id: string): GiftDef | undefined {
  return GIFT_CATALOG.find((g) => g.id === id);
}

/** Resolve mystery box into a concrete grant payload. */
export function rollMystery(): {
  kind: Exclude<GiftKind, "mystery">;
  hearts?: number;
  xp?: number;
  freezes?: number;
  avatarKey?: string;
  titleKey?: string;
  frameKey?: string;
  labelUk: string;
  labelEn: string;
} {
  const roll = Math.random();
  if (roll < 0.35) {
    return { kind: "xp", xp: 40, labelUk: "40 XP", labelEn: "40 XP" };
  }
  if (roll < 0.55) {
    return { kind: "hearts", hearts: 2, labelUk: "2 серця", labelEn: "2 hearts" };
  }
  if (roll < 0.7) {
    return { kind: "streak_freeze", freezes: 1, labelUk: "щит серії", labelEn: "streak shield" };
  }
  if (roll < 0.82) {
    return {
      kind: "avatar",
      avatarKey: "phoenix",
      labelUk: "аватар phoenix",
      labelEn: "phoenix avatar",
    };
  }
  if (roll < 0.92) {
    return {
      kind: "title",
      titleKey: "hero",
      labelUk: "титул Герой",
      labelEn: "Hero title",
    };
  }
  return {
    kind: "frame",
    frameKey: "neon",
    labelUk: "неонова рамка",
    labelEn: "neon frame",
  };
}
