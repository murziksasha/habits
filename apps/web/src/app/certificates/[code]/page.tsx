import { CertificateClient } from "./certificate-client";

/**
 * Public certificate verify — RSC shell + client art/export island.
 */
export default async function CertificatePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const p = await params;
  return <CertificateClient code={p.code} />;
}
