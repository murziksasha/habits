import { UI } from "@eduforge/shared";
import { VerifyEmailClient } from "./verify-client";

/** Email verification — RSC shell + client token handler. */
export default function VerifyEmailPage() {
  return (
    <>
      <h1 className="sr-only">{UI.appName} · email verify</h1>
      <VerifyEmailClient />
    </>
  );
}
