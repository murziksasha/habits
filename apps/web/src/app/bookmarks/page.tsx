import { UI } from "@eduforge/shared";
import { BookmarksClient } from "./bookmarks-client";

/** Lesson bookmarks — RSC shell + client list island. */
export default function BookmarksPage() {
  return (
    <>
      <h1 className="sr-only">{UI.nav.bookmarks}</h1>
      <BookmarksClient />
    </>
  );
}
