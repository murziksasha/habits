import { describe, expect, it } from "vitest";
import { CHESS_BOARD_THEME_IDS, chessBoardSquareStyles, isChessBoardTheme } from "./chess-board-themes.js";

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
