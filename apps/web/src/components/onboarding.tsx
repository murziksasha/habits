"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import clsx from "clsx";

type Item = {
  id: string;
  titleUk: string;
  titleEn?: string;
  done: boolean;
  href: string;
};

export function OnboardingCard() {
  const { token } = useAuth();
  const { t, locale } = useLocale();
  const [items, setItems] = useState<Item[]>([]);
  const [dismissed, setDismissed] = useState(true);
  const [doneCount, setDoneCount] = useState(0);
  const [total, setTotal] = useState(0);

  async function load() {
    if (!token) return;
    try {
      const d = await api<{
        items: Item[];
        dismissed: boolean;
        doneCount: number;
        total: number;
      }>("/auth/onboarding", { token });
      setItems(d.items);
      setDismissed(d.dismissed);
      setDoneCount(d.doneCount);
      setTotal(d.total);
    } catch {
      setDismissed(true);
    }
  }

  useEffect(() => {
    void load();
  }, [token]);

  if (dismissed || !items.length || doneCount >= total) return null;

  async function dismiss() {
    if (!token) return;
    await api("/auth/onboarding/complete", {
      method: "POST",
      token,
      body: { key: "dismissed" },
    });
    setDismissed(true);
  }

  const nextOpen = items.find((i) => !i.done);

  return (
    <section className="card border-brand/30 bg-gradient-to-br from-brand-soft/40 to-white dark:to-slate-950">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-black">{t.onboarding.title}</h2>
          <p className="text-sm text-ink-muted">{t.onboarding.subtitle}</p>
        </div>
        <button
          type="button"
          className="text-sm font-bold text-ink-muted"
          onClick={() => void dismiss()}
        >
          {t.onboarding.dismiss}
        </button>
      </div>
      <p className="mt-2 text-sm font-bold text-brand-dark">
        {t.onboarding.progress}: {doneCount}/{total}
      </p>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white dark:bg-slate-800">
        <div
          className="h-full bg-brand transition-all"
          style={{ width: `${total ? (doneCount / total) * 100 : 0}%` }}
        />
      </div>

      {nextOpen && (
        <Link
          href={nextOpen.href}
          className="btn-primary mt-4 inline-flex w-full justify-center sm:w-auto"
        >
          {locale === "en"
            ? nextOpen.titleEn || nextOpen.titleUk
            : nextOpen.titleUk}{" "}
          →
        </Link>
      )}

      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              className={clsx(
                "flex items-center gap-3 rounded-2xl border-2 px-3 py-2 text-sm font-bold transition",
                item.done
                  ? "border-brand/30 bg-brand-soft/50 text-brand-dark"
                  : "border-slate-100 bg-white hover:border-sky/40 dark:border-slate-800 dark:bg-slate-900",
              )}
            >
              <span>{item.done ? "✅" : "⬜"}</span>
              <span className={item.done ? "line-through opacity-80" : ""}>
                {locale === "en" ? item.titleEn || item.titleUk : item.titleUk}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
