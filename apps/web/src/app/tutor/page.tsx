import { UI } from "@eduforge/shared";
import { TutorClient } from "./tutor-client";

/** AI tutor — RSC shell + client chat island. */
export default function TutorPage() {
  return (
    <>
      <h1 className="sr-only">{UI.nav.tutor}</h1>
      <TutorClient />
    </>
  );
}
