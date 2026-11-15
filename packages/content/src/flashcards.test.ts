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


const DEEP_DECKS = [
  "english-perfect-passives",
  "english-collocations",
  "english-idioms-phrasals",
  "english-pronunciation",
  "chess-tactics-patterns",
  "chess-opening-ideas",
] as const;

describe("deep English and Chess flashcards", () => {
  it("adds six new decks with unique fronts and bilingual titles", () => {
    const basicsFronts = new Set(
      FLASHCARD_DECKS.find((d) => d.slug === "english-basics")!.cards.map((c) => c.front),
    );
    const allSlugs = FLASHCARD_DECKS.map((d) => d.slug);
    expect(new Set(allSlugs).size).toBe(allSlugs.length);

    for (const slug of DEEP_DECKS) {
      const deck = FLASHCARD_DECKS.find((d) => d.slug === slug);
      expect(deck, slug).toBeTruthy();
      expect(deck!.cards.length).toBeGreaterThanOrEqual(12);
      expect(deck!.titleUk).not.toEqual(deck!.titleEn);
      expect(deck!.descriptionUk.length).toBeGreaterThan(10);
      expect(deck!.descriptionEn.length).toBeGreaterThan(10);
      expect(new Set(deck!.cards.map((c) => c.front)).size).toBe(deck!.cards.length);
      for (const card of deck!.cards) {
        expect(card.front.trim().length).toBeGreaterThan(0);
        expect(card.back.trim().length).toBeGreaterThan(8);
        expect(card.tags?.length).toBeGreaterThan(0);
      }
      if (deck!.courseSlug === "english") {
        expect(deck!.courseSlug).toBe("english");
        for (const card of deck!.cards) {
          expect(basicsFronts.has(card.front), card.front).toBe(false);
        }
      } else {
        expect(deck!.courseSlug).toBe("chess");
      }
    }
  });

  it("covers the planned English and Chess topics", () => {
    const fronts = (slug: string) =>
      FLASHCARD_DECKS.find((d) => d.slug === slug)!.cards.map((c) => c.front.toLowerCase());

    const perfect = fronts("english-perfect-passives").join(" | ");
    expect(perfect).toMatch(/present perfect/);
    expect(perfect).toMatch(/since vs for/);
    expect(perfect).toMatch(/passive/);
    expect(perfect).toMatch(/used to/);

    const coll = fronts("english-collocations").join(" | ");
    expect(coll).toMatch(/make a decision/);
    expect(coll).toMatch(/say vs tell/);
    expect(coll).toMatch(/borrow vs lend/);
    expect(coll).toMatch(/actual/);
    expect(coll).toMatch(/magazine/);

    const idioms = fronts("english-idioms-phrasals").join(" | ");
    expect(idioms).toMatch(/look after/);
    expect(idioms).toMatch(/put off/);
    expect(idioms).toMatch(/look forward to/);
    expect(idioms).toMatch(/the ball is in your court/);
    expect(idioms).not.toContain("hello");

    const pron = FLASHCARD_DECKS.find((d) => d.slug === "english-pronunciation")!;
    const pronFronts = pron.cards.map((c) => c.front.toLowerCase()).join(" | ");
    expect(pronFronts).toMatch(/ship vs sheep/);
    expect(pronFronts).toMatch(/think vs sink/);
    expect(pronFronts).toMatch(/west vs vest/);
    expect(pron.cards.filter((c) => (c.hint ?? "").length > 0).length).toBeGreaterThanOrEqual(8);
    expect(pron.cards.some((c) => /[А-Яа-яІіЇїЄє]/.test(c.hint ?? ""))).toBe(true);

    const tactics = fronts("chess-tactics-patterns").join(" | ");
    for (const motif of ["decoy", "overload", "anastasia", "lucena", "philidor", "greek gift", "vancura"]) {
      expect(tactics).toContain(motif);
    }

    const openings = fronts("chess-opening-ideas").join(" | ");
    for (const name of ["italian", "ruy lopez", "najdorf", "french", "caro-kann", "king's indian", "london"]) {
      expect(openings).toContain(name);
    }
    const italian = FLASHCARD_DECKS.find((d) => d.slug === "chess-opening-ideas")!.cards.find((c) =>
      /italian/i.test(c.front),
    )!;
    expect(italian.back.toLowerCase()).toMatch(/f7|develop/);
  });
});
