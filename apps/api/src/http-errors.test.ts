import { describe, expect, it } from "vitest";
import { isUniqueViolation } from "./http-errors.js";

describe("isUniqueViolation", () => {
  it("detects postgres 23505", () => {
    expect(isUniqueViolation({ code: "23505" })).toBe(true);
    expect(isUniqueViolation({ cause: { code: "23505" } })).toBe(true);
    expect(isUniqueViolation(new Error("duplicate key value violates unique constraint"))).toBe(
      true,
    );
    expect(isUniqueViolation(new Error("nope"))).toBe(false);
  });
});
