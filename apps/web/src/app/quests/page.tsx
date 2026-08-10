import { UI } from "@eduforge/shared";
import { QuestsClient } from "./quests-client";

/** Daily quests — RSC shell + client data island. */
export default function QuestsPage() {
  return (
    <>
      <h1 className="sr-only">{UI.nav.quests}</h1>
      <QuestsClient />
    </>
  );
}
