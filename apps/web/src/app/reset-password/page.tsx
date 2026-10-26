import { UI } from "@eduforge/shared";
import { ResetPasswordClient } from "./reset-client";

/** Password reset — RSC shell + client form island. */
export default function ResetPasswordPage() {
  return (
    <>
      <h1 className="sr-only">{UI.appName} · {UI.password.resetTitle}</h1>
      <ResetPasswordClient />
    </>
  );
}
