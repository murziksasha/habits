import type { DeckSeed, FlashcardSeed } from "@eduforge/content";

/** Preserve existing card IDs and SRS state; only the DevOps deck is extended. */
export function selectFlashcardInserts(
  deck: DeckSeed,
  existingCards: readonly { front: string; sortOrder: number }[],
): (FlashcardSeed & { sortOrder: number })[] {
  if (existingCards.length > 0 && deck.slug !== "devops-forge-status") return [];

  const fronts = new Set(existingCards.map((card) => card.front));
  let sortOrder = existingCards.reduce((max, card) => Math.max(max, card.sortOrder), -1) + 1;
  return deck.cards.flatMap((card) => {
    if (fronts.has(card.front)) return [];
    fronts.add(card.front);
    return [{ ...card, sortOrder: sortOrder++ }];
  });
}
