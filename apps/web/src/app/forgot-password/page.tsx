import { UI } from "@eduforge/shared";
import { ForgotPasswordClient } from "./forgot-client";

/** Forgot password — RSC shell + client form island. */
export default function ForgotPasswordPage() {
  return (
    <>
      <h1 className="sr-only">{UI.appName} · {UI.password.forgotTitle}</h1>
      <ForgotPasswordClient />
    </>
  );
}
