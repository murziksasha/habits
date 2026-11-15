import { PublicProfileClient } from "./profile-client";

/**
 * Public profile — RSC shell + client data/share island.
 */
export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const p = await params;
  return <PublicProfileClient userId={p.userId} />;
}
