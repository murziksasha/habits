import { UI } from "@eduforge/shared";
import { CertificatesClient } from "./certificates-client";

/** Own certificates list — RSC shell + client data island. */
export default function CertificatesPage() {
  return (
    <>
      <h1 className="sr-only">{UI.appName} · {UI.certificates.title}</h1>
      <CertificatesClient />
    </>
  );
}
