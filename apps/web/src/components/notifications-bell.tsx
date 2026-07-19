"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";

type Notif = {
  id: string;
  titleUk: string;
  titleEn: string;
  bodyUk: string;
  bodyEn: string;
  href: string | null;
  readAt: string | null;
  createdAt: string;
};

export function NotificationsBell() {
  const { token, user } = useAuth();
  const { t, locale } = useLocale();
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const [items, setItems] = useState<Notif[]>([]);

  async function load() {
    if (!token) return;
    const d = await api<{ notifications: Notif[]; unread: number }>(
      "/engagement/notifications",
      { token },
    );
    setItems(d.notifications);
    setUnread(d.unread);
  }

  useEffect(() => {
    if (!token || !user) return;
    void load().catch(() => undefined);
    const id = setInterval(() => void load().catch(() => undefined), 45_000);
    return () => clearInterval(id);
  }, [token, user]);

  if (!user) return null;

  return (
    <div className="relative">
      <button
        type="button"
        className="relative grid h-10 w-10 place-items-center rounded-xl border-2 border-slate-200 text-lg"
        onClick={() => {
          setOpen((v) => !v);
          if (!open) void load();
        }}
        aria-label={t.engagement.notifications}
      >
        🔔
        {unread > 0 && (
          <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1 text-[10px] font-black text-white">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-80 max-h-96 overflow-auto rounded-2xl border-2 border-slate-100 bg-white p-3 shadow-lg">
          <div className="mb-2 flex items-center justify-between">
            <p className="font-black text-sm">{t.engagement.notifications}</p>
            <button
              type="button"
              className="text-xs font-bold text-sky"
              onClick={() =>
                void api("/engagement/notifications/read-all", {
                  method: "POST",
                  token,
                }).then(load)
              }
            >
              {t.engagement.markAllRead}
            </button>
          </div>
          {!items.length && (
            <p className="text-xs text-ink-muted">{t.engagement.emptyNotifications}</p>
          )}
          <ul className="space-y-2">
            {items.map((n) => (
              <li
                key={n.id}
                className={`rounded-xl p-2 text-xs ${n.readAt ? "bg-slate-50" : "bg-brand-soft/40"}`}
              >
                {n.href ? (
                  <Link
                    href={n.href}
                    className="font-bold block"
                    onClick={() => {
                      void api(`/engagement/notifications/${n.id}/read`, {
                        method: "POST",
                        token,
                      });
                      setOpen(false);
                    }}
                  >
                    {locale === "en" ? n.titleEn || n.titleUk : n.titleUk}
                  </Link>
                ) : (
                  <p className="font-bold">
                    {locale === "en" ? n.titleEn || n.titleUk : n.titleUk}
                  </p>
                )}
                <p className="text-ink-muted">
                  {locale === "en" ? n.bodyEn || n.bodyUk : n.bodyUk}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
