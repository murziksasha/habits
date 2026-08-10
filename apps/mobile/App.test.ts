import { describe, expect, it } from "vitest";
import {
  describeNativeShell,
  getMobileEntryUrl,
  mapDeepLinkToPath,
} from "./App";

describe("mobile shell helpers", () => {
  it("builds learn entry with native flag", () => {
    expect(getMobileEntryUrl("https://app.example.com")).toBe(
      "https://app.example.com/learn?native=1",
    );
  });

  it("maps eduforge deep links", () => {
    expect(mapDeepLinkToPath("eduforge://learn")).toBe("/learn");
    expect(mapDeepLinkToPath("eduforge://friends?add=u1")).toBe("/friends?add=u1");
    expect(mapDeepLinkToPath("eduforge://play")).toBe("/play");
  });

  it("describeNativeShell exposes strategy", () => {
    const d = describeNativeShell();
    expect(d.strategy).toBe("webview");
    expect(d.entry).toContain("/learn");
  });
});
