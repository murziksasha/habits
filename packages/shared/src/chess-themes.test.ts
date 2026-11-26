import { describe, expect, it } from "vitest";
import { CHESS_THEMES, chessThemeLabel, visibleChessThemes } from "./chess-themes.js";

describe("chess themes", () => {
  it("every theme has Ukrainian and English labels", () => {
    for (const [key, v] of Object.entries(CHESS_THEMES)) {
      expect(v.uk.length, key).toBeGreaterThan(1);
      expect(v.en.length, key).toBeGreaterThan(1);
    }
  });

  it("uses Ukrainian chess terms, not Russian calques", () => {
    const banned = /ладейн|лучен|ладья|слона\b.*ладьи|шашк/i;
    for (const [key, v] of Object.entries(CHESS_THEMES)) expect(banned.test(v.uk), key).toBe(false);
    expect(CHESS_THEMES.rookEndgame.uk).toBe("Туровий ендшпіль");
    expect(CHESS_THEMES.lucena.uk).toBe("Позиція Лусени");
  });

  it("hides meta tags and unknown keys from learners", () => {
    expect(visibleChessThemes(["fork", "short", "crushing", "nonsense", "pin"])).toEqual(["fork", "pin"]);
    expect(chessThemeLabel("fork", "en")).toBe("Fork");
    expect(chessThemeLabel("unknown")).toBe("unknown");
  });
});
