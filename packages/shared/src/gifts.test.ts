import { describe, expect, it } from "vitest";
import { giftById, GIFT_CATALOG, rollMystery } from "./gifts.js";

describe("gifts catalog", () => {
  it("has cheer free gift and mystery", () => {
    expect(giftById("cheer")?.costXp).toBe(0);
    expect(giftById("mystery_box")?.kind).toBe("mystery");
    expect(GIFT_CATALOG.length).toBeGreaterThanOrEqual(8);
  });

  it("rolls mystery into concrete grant", () => {
    const r = rollMystery();
    expect(r.kind).not.toBe("mystery");
    expect(r.labelEn.length).toBeGreaterThan(0);
  });
});
