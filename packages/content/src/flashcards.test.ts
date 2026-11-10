import { describe, expect, it } from "vitest";
import { FLASHCARD_DECKS } from "./flashcards.js";

describe("DevOps flashcards", () => {
  it("extends the existing deck with production and on-call topics without duplicate fronts", () => {
    const deck = FLASHCARD_DECKS.find((deck) => deck.slug === "devops-forge-status")!;
    expect(deck.courseSlug).toBe("devops");
    expect(deck.cards).toHaveLength(30);
    expect(new Set(deck.cards.map((card) => card.front)).size).toBe(deck.cards.length);
    for (const front of [
      "set -euo pipefail", "digest", "image digest", "maxUnavailable", "startupProbe", "OOMKilled", "NetworkPolicy",
      "cert-manager", "ResourceQuota", "Helm values per env", "Argo CD drift", "PITR", "PgBouncer", "burn rate", "RED", "runbook",
    ]) {
      expect(deck.cards.find((card) => card.front === front)?.back.trim().length).toBeGreaterThan(0);
    }
    for (const card of deck.cards.slice(16)) {
      expect(card.back).toMatch(/[А-Яа-яІіЇїЄє]/);
      expect(card.tags?.length).toBeGreaterThan(0);
    }
  });
});
