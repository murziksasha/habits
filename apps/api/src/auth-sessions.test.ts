import { describe, expect, it } from "vitest";
import { createHash } from "node:crypto";
import { hashToken } from "./auth.js";

describe("session token hashing", () => {
  it("hashToken is stable sha256 hex", () => {
    const token = "abc123_test_token";
    const expected = createHash("sha256").update(token).digest("hex");
    expect(hashToken(token)).toBe(expected);
    expect(hashToken(token)).toBe(hashToken(token));
    expect(hashToken(token)).not.toBe(hashToken(token + "x"));
  });
});
