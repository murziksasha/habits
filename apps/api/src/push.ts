import webpush from "web-push";
import { eq } from "drizzle-orm";
import { pushSubscriptions } from "@eduforge/db";
import type { Db } from "@eduforge/db";

let publicKey = process.env.VAPID_PUBLIC_KEY ?? "";
let privateKey = process.env.VAPID_PRIVATE_KEY ?? "";
const subject = process.env.VAPID_SUBJECT ?? "mailto:admin@eduforge.local";

if (!publicKey || !privateKey) {
  const keys = webpush.generateVAPIDKeys();
  publicKey = keys.publicKey;
  privateKey = keys.privateKey;
  console.warn(
    "[push] Using ephemeral VAPID keys — set VAPID_PUBLIC_KEY / VAPID_PRIVATE_KEY for production",
  );
}

webpush.setVapidDetails(subject, publicKey, privateKey);

export function getVapidPublicKey() {
  return publicKey;
}

export async function sendPushToUser(
  db: Db,
  userId: string,
  payload: {
    title: string;
    body?: string;
    href?: string;
    tag?: string;
  },
) {
  const subs = await db.query.pushSubscriptions.findMany({
    where: eq(pushSubscriptions.userId, userId),
  });
  if (!subs.length) return { sent: 0, failed: 0 };

  const body = JSON.stringify({
    title: payload.title,
    body: payload.body ?? "",
    href: payload.href ?? "/dashboard",
    tag: payload.tag ?? "eduforge",
  });

  let sent = 0;
  let failed = 0;
  for (const sub of subs) {
    try {
      await webpush.sendNotification(
        {
          endpoint: sub.endpoint,
          keys: { p256dh: sub.p256dh, auth: sub.auth },
        },
        body,
      );
      sent += 1;
    } catch (e: unknown) {
      failed += 1;
      const status = (e as { statusCode?: number })?.statusCode;
      if (status === 404 || status === 410) {
        await db
          .delete(pushSubscriptions)
          .where(eq(pushSubscriptions.id, sub.id));
      } else {
        console.warn("[push] send failed", status ?? e);
      }
    }
  }
  return { sent, failed };
}
