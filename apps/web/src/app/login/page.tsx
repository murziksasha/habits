import { UI } from "@eduforge/shared";
import { LoginClient } from "./login-client";

/** Auth login — RSC shell + client form island. */
export default function LoginPage() {
  return (
    <>
      <h1 className="sr-only">{UI.appName} · {UI.nav.login}</h1>
      <LoginClient />
    </>
  );
}
