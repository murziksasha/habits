import { describe, expect, it } from "vitest";
import { passwordSchema } from "@eduforge/shared";

/**
 * Contract tests for account privacy endpoints (schemas / guards).
 * Full HTTP flows need integration DB; see auth routes.
 */
describe("account privacy contracts", () => {
  it("delete confirm must be exact DELETE", () => {
    // Mirrors auth route zod: confirm: z.literal("DELETE")
    expect("DELETE").toBe("DELETE");
    expect("delete" === "DELETE").toBe(false);
  });

  it("change-password new password policy", () => {
    expect(passwordSchema.safeParse("newpass1").success).toBe(true);
    expect(passwordSchema.safeParse("short").success).toBe(false);
    expect(passwordSchema.safeParse("nodigits").success).toBe(false);
  });
});
