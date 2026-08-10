import { describe, expect, it } from "vitest";
import { isRscShellRoute, RSC_SHELL_ROUTES } from "./rsc-shells";

describe("RSC shell routes", () => {
  it("lists core public, primary, toolkit, B2B, deep, admin shells", () => {
    expect(RSC_SHELL_ROUTES).toContain("/pricing");
    expect(RSC_SHELL_ROUTES).toContain("/dashboard");
    expect(RSC_SHELL_ROUTES).toContain("/programming");
    expect(RSC_SHELL_ROUTES).toContain("/profile");
    expect(RSC_SHELL_ROUTES).toContain("/homework");
    expect(RSC_SHELL_ROUTES).toContain("/teacher");
    expect(RSC_SHELL_ROUTES).toContain("/js-fundamentals");
    expect(RSC_SHELL_ROUTES).toContain("/admin");
    expect(RSC_SHELL_ROUTES).toContain("/admin/metrics");
    expect(RSC_SHELL_ROUTES.length).toBeGreaterThanOrEqual(60);
  });

  it("matches exact and dynamic paths", () => {
    expect(isRscShellRoute("/")).toBe(true);
    expect(isRscShellRoute("/dashboard")).toBe(true);
    expect(isRscShellRoute("/programming")).toBe(true);
    expect(isRscShellRoute("/programming/tree")).toBe(true);
    expect(isRscShellRoute("/programming/js")).toBe(true);
    expect(isRscShellRoute("/profile")).toBe(true);
    expect(isRscShellRoute("/homework")).toBe(true);
    expect(isRscShellRoute("/parents/child/abc")).toBe(true);
    expect(isRscShellRoute("/courses/english")).toBe(true);
    expect(isRscShellRoute("/courses/english/lessons/x")).toBe(true);
    expect(isRscShellRoute("/classroom/live/c1")).toBe(true);
    expect(isRscShellRoute("/admin/users")).toBe(true);
    expect(isRscShellRoute("/certificates/EF-ABC")).toBe(true);
    expect(isRscShellRoute("/u/user-1")).toBe(true);
  });
});
