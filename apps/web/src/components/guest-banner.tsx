"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/lib/locale-context";

export function GuestBanner({ className }: { className?: string }) {
  const { t } = useLocale();
  const pathname = usePathname();
  const next = encodeURIComponent(pathname || "/courses");

  return (
    <div
      className={`rounded-2xl border-2 border-brand/30 bg-gradient-to-r from-brand-soft/40 to-sky/10 p-4 text-sm font-bold flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${className ?? ""}`}
      role="status"
    >
      <div className="flex items-center gap-2">
        <span className="text-xl" aria-hidden>💡</span>
        <p className="text-ink">{t.onboarding.guestNoticeBanner}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Link
          href={`/login?next=${next}`}
          className="btn-secondary !py-1.5 !px-3 text-xs"
        >
          {t.onboarding.guestSignIn}
        </Link>
        <Link
          href={`/register?next=${next}`}
          className="btn-primary !py-1.5 !px-3 text-xs"
        >
          {t.onboarding.guestRegister}
        </Link>
      </div>
    </div>
  );
}

