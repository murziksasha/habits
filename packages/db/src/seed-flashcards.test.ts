import assert from "node:assert/strict";
import { test } from "node:test";
import { FLASHCARD_DECKS } from "@eduforge/content";
import { selectFlashcardInserts } from "./seed-flashcards.js";

const deck = FLASHCARD_DECKS.find((deck) => deck.slug === "devops-forge-status")!;

test("new decks receive all cards in definition order", () => {
  const inserts = selectFlashcardInserts(deck, []);
  assert.deepEqual(inserts.map((card) => card.front), deck.cards.map((card) => card.front));
  assert.deepEqual(inserts.map((card) => card.sortOrder), deck.cards.map((_, i) => i));
});

test("DevOps extensions insert missing fronts after existing cards", () => {
  const existing = [
    { id: "reviewed-card", ...deck.cards[0], back: "Custom explanation", sortOrder: 4 },
    { id: "custom-card", front: "My own card", back: "Keep me", sortOrder: 20 },
  ];
  const before = structuredClone(existing);
  const inserts = selectFlashcardInserts(deck, existing);
  assert.equal(inserts.length, deck.cards.length - 1);
  assert.equal(inserts[0].sortOrder, 21);
  assert.ok(inserts.every((card) => card.front !== existing[0].front));
  assert.deepEqual(existing, before);
  assert.deepEqual(selectFlashcardInserts(deck, [...existing, ...inserts]), []);
});

test("existing decks other than DevOps are not extended", () => {
  for (const other of FLASHCARD_DECKS.filter((deck) => deck.slug !== "devops-forge-status")) {
    assert.deepEqual(selectFlashcardInserts(other, [{ front: "old card", sortOrder: 0 }]), []);
    assert.equal(selectFlashcardInserts(other, []).length, other.cards.length);
  }
});

test("duplicate fronts in a seed are inserted only once", () => {
  const duplicateDeck = { ...deck, cards: [deck.cards[0], deck.cards[0]] };
  assert.equal(selectFlashcardInserts(duplicateDeck, []).length, 1);
});
