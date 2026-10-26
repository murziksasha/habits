import { UI } from "@eduforge/shared";
import { FriendsClient } from "./friends-client";

/** Friends social — RSC shell + client list/invite island. */
export default function FriendsPage() {
  return (
    <>
      <h1 className="sr-only">{UI.nav.friends}</h1>
      <FriendsClient />
    </>
  );
}
