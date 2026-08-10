import { UI } from "@eduforge/shared";
import { SearchClient } from "./search-client";

/** Search hub — RSC shell + client discovery island. */
export default function SearchPage() {
  return (
    <>
      <h1 className="sr-only">{UI.appName} · {UI.nav.search}</h1>
      <SearchClient />
    </>
  );
}
