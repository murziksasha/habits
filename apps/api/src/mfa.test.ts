import { describe, expect, it } from "vitest";
import {
  currentTotpCode,
  generateBackupCodes,
  generateTotpSecret,
  hashBackupCode,
  hashBackupCodes,
  verifyTotpCode,
} from "./mfa.js";

describe("TOTP", () => {
  it("generates and verifies within window", () => {
    const secret = generateTotpSecret();
    const code = currentTotpCode(secret);
    expect(code).toMatch(/^\d{6}$/);
    expect(verifyTotpCode(secret, code)).toBe(true);
    expect(verifyTotpCode(secret, "000000")).toBe(false);
  });

  it("accepts well-known seed secret", () => {
    const secret = "JBSWY3DPEHPK3PXP";
    const code = currentTotpCode(secret);
    expect(verifyTotpCode(secret, code)).toBe(true);
  });
});

describe("backup codes", () => {
  it("hashes are stable and distinct", () => {
    const codes = generateBackupCodes(5);
    expect(codes).toHaveLength(5);
    expect(codes[0]).toMatch(/^[A-Z0-9]{4}-[A-Z0-9]{4}$/);
    const hashes = hashBackupCodes(codes);
    expect(new Set(hashes).size).toBe(5);
    expect(hashBackupCode(codes[0]!)).toBe(hashes[0]);
    expect(hashBackupCode(codes[0]!.replace("-", "").toLowerCase())).toBe(hashes[0]);
  });
});
