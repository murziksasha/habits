import { describe, expect, it } from "vitest";
import { decodeHistoryCursor, encodeHistoryCursor } from "./learning-progress.js";

describe("learning-progress cursor helpers", () => {
  it("round-trips history keyset cursor", () => {
    const dt = new Date("2026-11-12T04:15:30.123Z");
    const id = "11111111-1111-4111-8111-111111111111";
    const encoded = encodeHistoryCursor(dt, id);
    const decoded = decodeHistoryCursor(encoded);
    expect(decoded).not.toBeNull();
    expect(decoded?.createdAt.toISOString()).toBe(dt.toISOString());
    expect(decoded?.id).toBe(id);
  });

  it("rejects malformed cursors", () => {
    expect(decodeHistoryCursor("not-valid-base64-json")).toBeNull();
    expect(
      decodeHistoryCursor(
        Buffer.from(JSON.stringify({ createdAt: "bad", id: "nope" })).toString("base64url"),
      ),
    ).toBeNull();
  });
});
