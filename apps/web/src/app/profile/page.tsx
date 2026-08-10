import { UI } from "@eduforge/shared";
import { ProfileClient } from "./profile-client";

/** Own profile / settings — RSC shell + client account island. */
export default function ProfilePage() {
  return (
    <>
      <h1 className="sr-only">{UI.nav.profile}</h1>
      <ProfileClient />
    </>
  );
}
