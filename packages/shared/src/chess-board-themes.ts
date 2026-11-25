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
