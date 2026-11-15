import { describe, expect, it } from "vitest";
import { sanitizeDisplayName, sanitizeUserText } from "./sanitize.js";

describe("sanitizeUserText", () => {
  it("strips tags and script vectors", () => {
    expect(sanitizeUserText("<b>hi</b>")).toBe("hi");
    expect(sanitizeUserText("click javascript:alert(1)")).toBe("click alert(1)");
    expect(sanitizeUserText('x onerror=alert(1)')).toBe("x alert(1)");
  });

  it("truncates", () => {
    expect(sanitizeUserText("a".repeat(100), 10)).toHaveLength(10);
  });
});

describe("sanitizeDisplayName", () => {
  it("collapses spaces", () => {
    expect(sanitizeDisplayName("  Ada   Lovelace  ")).toBe("Ada Lovelace");
  });
});
