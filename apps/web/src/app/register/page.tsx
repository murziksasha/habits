import { UI } from "@eduforge/shared";
import { RegisterClient } from "./register-client";

/** Auth register — RSC shell + client form island. */
export default function RegisterPage() {
  return (
    <>
      <h1 className="sr-only">{UI.appName} · {UI.nav.register}</h1>
      <RegisterClient />
    </>
  );
}
