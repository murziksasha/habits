import { describe, expect, it } from "vitest";
import { selectedMatchLabel } from "./match-labels";

describe("matching selection feedback", () => {
  it("shows the selected right-hand label, including for an incorrect match", () => {
    const pairs = [
      { left: "кіт", right: "cat", labelLeft: "cat", labelRight: "cat" },
      { left: "пес", right: "dog", labelLeft: "dog", labelRight: "dog" },
    ];
    expect(selectedMatchLabel(pairs, { left: "кіт", right: "dog" })).toBe("cat→dog");
    expect(selectedMatchLabel(pairs, { left: "кіт", right: "cat" })).toBe("cat→cat");
  });
});
