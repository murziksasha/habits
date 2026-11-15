import { UI } from "@eduforge/shared";
import { FlashcardsClient } from "./flashcards-client";

/** SRS flashcards — RSC shell + client decks island. */
export default function FlashcardsPage() {
  return (
    <>
      <h1 className="sr-only">{UI.nav.flashcards}</h1>
      <FlashcardsClient />
    </>
  );
}
