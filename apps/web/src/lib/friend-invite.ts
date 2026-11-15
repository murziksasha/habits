import { api } from "./api";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/** True when value looks like a user id for friend deep links. */
export function isFriendInviteId(value: string | null | undefined): value is string {
  return Boolean(value && UUID_RE.test(value));
}

/**
 * After register/login, send a friend request if an invite id was present.
 * Ignores already_friends / already_pending / self.
 */
export async function sendFriendInvite(userId: string, token?: string | null): Promise<void> {
  if (!isFriendInviteId(userId)) return;
  try {
    await api("/friends/request", {
      method: "POST",
      token: token ?? undefined,
      body: { userId },
    });
  } catch {
    /* already friends / pending / self / gone — silent */
  }
}
