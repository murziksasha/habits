import { UI } from "@eduforge/shared";
import { LearnClient } from "./learn-client";

/** Learn map — RSC shell + client curriculum island. */
export default function LearnPage() {
  return (
    <>
      <h1 className="sr-only">{UI.nav.learn}</h1>
      <LearnClient />
    </>
  );
}
