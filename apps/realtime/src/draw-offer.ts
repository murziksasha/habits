/** Pure draw-offer rules for online games (plan §5.6). */

export const DRAW_OFFER_MIN_PLIES = 20; // at most once per 10 moves per player

export type DrawOfferState = {
  whiteId: string | null;
  blackId: string | null;
  status: string;
  plies: number;
  drawOfferBy: string | null;
  lastDrawOfferPlyWhite: number | null;
  lastDrawOfferPlyBlack: number | null;
};

export type DrawCheck = { ok: true; color: "w" | "b" } | { ok: false; error: string };

export function canOfferDraw(g: DrawOfferState, userId: string): DrawCheck {
  if (g.status !== "active") return { ok: false, error: "not_active" };
  const color = g.whiteId === userId ? "w" : g.blackId === userId ? "b" : null;
  if (!color) return { ok: false, error: "forbidden" };
  if (g.drawOfferBy) return { ok: false, error: g.drawOfferBy === userId ? "already_offered" : "offer_pending" };
  const last = color === "w" ? g.lastDrawOfferPlyWhite : g.lastDrawOfferPlyBlack;
  if (last !== null && g.plies - last < DRAW_OFFER_MIN_PLIES) return { ok: false, error: "draw_offer_too_soon" };
  return { ok: true, color };
}

/** Only the opponent of the offerer can answer a pending offer. */
export function canAnswerDraw(g: DrawOfferState, userId: string): { ok: true } | { ok: false; error: string } {
  if (g.status !== "active") return { ok: false, error: "not_active" };
  if (g.whiteId !== userId && g.blackId !== userId) return { ok: false, error: "forbidden" };
  if (!g.drawOfferBy) return { ok: false, error: "no_offer" };
  if (g.drawOfferBy === userId) return { ok: false, error: "own_offer" };
  return { ok: true };
}

/** A pending offer burns as soon as the side that received it makes a move. */
export function drawOfferAfterMove(drawOfferBy: string | null, moverId: string): string | null {
  if (!drawOfferBy) return null;
  return drawOfferBy === moverId ? drawOfferBy : null;
}
