import { UI } from "@eduforge/shared";
import { AchievementsClient } from "./achievements-client";

/** Achievements gallery — RSC shell + client data island. */
export default function AchievementsPage() {
  return (
    <>
      <h1 className="sr-only">Achievements · Досягнення</h1>
      <AchievementsClient />
    </>
  );
}
