import { describe, expect, it } from "vitest";
import { canAnswerDraw, canOfferDraw, drawOfferAfterMove, DRAW_OFFER_MIN_PLIES } from "./draw-offer.js";
import { allowSocketEvent, _resetSocketEventLimits } from "./event-rate-limit.js";

const base = {
  whiteId: "w",
  blackId: "b",
  status: "active",
  plies: 30,
  drawOfferBy: null,
  lastDrawOfferPlyWhite: null,
  lastDrawOfferPlyBlack: null,
};

describe("draw offers", () => {
  it("offer → accept/decline by the opponent only", () => {
    expect(canOfferDraw(base, "w")).toEqual({ ok: true, color: "w" });
    expect(canOfferDraw(base, "x")).toEqual({ ok: false, error: "forbidden" });
    const pending = { ...base, drawOfferBy: "w", lastDrawOfferPlyWhite: 30 };
    expect(canAnswerDraw(pending, "b")).toEqual({ ok: true });
    expect(canAnswerDraw(pending, "w")).toEqual({ ok: false, error: "own_offer" });
    expect(canAnswerDraw(base, "b")).toEqual({ ok: false, error: "no_offer" });
    expect(canOfferDraw(pending, "b")).toEqual({ ok: false, error: "offer_pending" });
  });

  it("once per 10 moves per player", () => {
    const after = { ...base, plies: 30 + DRAW_OFFER_MIN_PLIES - 1, lastDrawOfferPlyWhite: 30 };
    expect(canOfferDraw(after, "w")).toEqual({ ok: false, error: "draw_offer_too_soon" });
    expect(canOfferDraw({ ...after, plies: 50 }, "w").ok).toBe(true);
    expect(canOfferDraw(after, "b").ok).toBe(true);
  });

  it("offer burns after the opponent moves", () => {
    expect(drawOfferAfterMove("w", "b")).toBeNull();
    expect(drawOfferAfterMove("w", "w")).toBe("w");
    expect(drawOfferAfterMove(null, "w")).toBeNull();
  });

  it("socket rate limit applies to draw events", () => {
    _resetSocketEventLimits();
    const hits = Array.from({ length: 4 }, () => allowSocketEvent("s1", "offer_draw", { limit: 3, windowMs: 10_000 }));
    expect(hits).toEqual([true, true, true, false]);
  });
});
