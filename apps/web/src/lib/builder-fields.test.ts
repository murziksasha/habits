import { describe, expect, it } from "vitest";
import {
  formatKeyIdeasLines,
  linesToList,
  listToLines,
  parseKeyIdeasLines,
} from "./builder-fields";

describe("builder fields", () => {
  it("round-trips lists", () => {
    expect(linesToList(" a \n\n b ")).toEqual(["a", "b"]);
    expect(listToLines(["a", "b"])).toBe("a\nb");
    expect(listToLines(null)).toBe("");
  });

  it("parses and formats key ideas", () => {
    const ideas = parseKeyIdeasLines("функція | function | Функці, function\nbad line\n | x | y");
    expect(ideas).toEqual([{ labelUk: "функція", labelEn: "function", anyOf: ["функці", "function"] }]);
    expect(parseKeyIdeasLines(formatKeyIdeasLines(ideas))).toEqual(ideas);
  });
});
