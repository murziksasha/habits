import { describe, expect, it } from "vitest";
import {
  CHESS_BOARD_THEME_IDS,
  DEFAULT_CHESS_BOARD_PREFS,
  chessBoardSquareStyles,
  isChessBoardTheme,
  normalizeChessBoardPrefs,
} from "./chess-board-themes.js";

describe("chess board themes", () => {
  it("has the four planned themes with distinct light/dark squares", () => {
    expect(CHESS_BOARD_THEME_IDS).toEqual(["classic", "green", "blue", "wood"]);
    for (const id of CHESS_BOARD_THEME_IDS) {
      const s = chessBoardSquareStyles(id);
      expect(s.light.backgroundColor).not.toBe(s.dark.backgroundColor);
    }
    expect(isChessBoardTheme("green")).toBe(true);
    expect(isChessBoardTheme("neon")).toBe(false);
  });
});

describe("normalizeChessBoardPrefs", () => {
  it("keeps valid keys and drops junk", () => {
    expect(normalizeChessBoardPrefs(null)).toEqual(DEFAULT_CHESS_BOARD_PREFS);
    expect(normalizeChessBoardPrefs({ theme: "green", coordinates: false, sound: true, x: 1 })).toEqual({ theme: "green", coordinates: false, sound: true });
    expect(normalizeChessBoardPrefs({ theme: "neon", sound: "yes" }, { theme: "green", coordinates: false, sound: true })).toEqual({ theme: "green", coordinates: false, sound: true });
  });
});
