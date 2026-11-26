/** Board colour themes (phase 8). Square styles for react-chessboard v4. */
export const CHESS_BOARD_THEMES = {
  classic: { light: "#f0d9b5", dark: "#b58863" },
  green: { light: "#eeeed2", dark: "#769656" },
  blue: { light: "#dee3e6", dark: "#8ca2ad" },
  wood: { light: "#e8c99b", dark: "#a0703f" },
} as const;

export type ChessBoardThemeId = keyof typeof CHESS_BOARD_THEMES;

export const CHESS_BOARD_THEME_IDS = Object.keys(CHESS_BOARD_THEMES) as ChessBoardThemeId[];

export function isChessBoardTheme(v: unknown): v is ChessBoardThemeId {
  return typeof v === "string" && v in CHESS_BOARD_THEMES;
}

export function chessBoardSquareStyles(theme: ChessBoardThemeId): {
  light: { backgroundColor: string };
  dark: { backgroundColor: string };
} {
  const t = CHESS_BOARD_THEMES[theme] ?? CHESS_BOARD_THEMES.classic;
  return { light: { backgroundColor: t.light }, dark: { backgroundColor: t.dark } };
}

/** Board preferences stored per user (`users.chess_prefs`) and in localStorage. */
export type ChessBoardPrefs = { theme: ChessBoardThemeId; coordinates: boolean; sound: boolean };

export const DEFAULT_CHESS_BOARD_PREFS: ChessBoardPrefs = { theme: "classic", coordinates: true, sound: false };

/** Keep only known keys with valid values; missing or invalid keys fall back to `base`. */
export function normalizeChessBoardPrefs(raw: unknown, base: ChessBoardPrefs = DEFAULT_CHESS_BOARD_PREFS): ChessBoardPrefs {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  return {
    theme: isChessBoardTheme(r.theme) ? r.theme : base.theme,
    coordinates: typeof r.coordinates === "boolean" ? r.coordinates : base.coordinates,
    sound: typeof r.sound === "boolean" ? r.sound : base.sound,
  };
}
