"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { filterDiscoveryTools } from "@eduforge/shared";
import { useLocale } from "@/lib/locale-context";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

/** ⌘K / Ctrl+K discovery hub. */
export function CommandPalette() {
  const { user } = useAuth();
  const { locale, t } = useLocale();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const tools = useMemo(
    () => filterDiscoveryTools(q, locale === "en" ? "en" : "uk"),
    [q, locale],
  );

  if (!user) return null;

  return (
    <>
      <button
        type="button"
        className="hidden sm:inline-flex min-h-9 items-center rounded-xl border-2 border-slate-200 px-2 text-xs font-black text-ink-muted dark:border-slate-700"
        onClick={() => setOpen(true)}
        title={t.onboarding.commandPalette}
        aria-label={t.onboarding.commandPalette}
      >
        ⌘K
      </button>
      {open && (
        <div
          className="fixed inset-0 z-[90] flex items-start justify-center bg-black/40 p-4 pt-[12vh]"
          role="dialog"
          aria-modal="true"
          aria-label={t.onboarding.commandPalette}
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Close"
            onClick={() => setOpen(false)}
          />
          <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-950">
            <input
              className="input rounded-none border-0 border-b-2 border-slate-100 focus:border-sky dark:border-slate-800"
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t.onboarding.commandPalette}
              onKeyDown={(e) => {
                if (e.key === "Enter" && tools[0]) {
                  setOpen(false);
                  router.push(tools[0].href);
                }
              }}
            />
            <ul className="max-h-72 overflow-y-auto p-2">
              {tools.map((tool) => (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    className="flex min-h-11 items-center rounded-xl px-3 py-2 text-sm font-bold hover:bg-brand-soft/40"
                    onClick={() => setOpen(false)}
                  >
                    {locale === "en" ? tool.titleEn : tool.titleUk}
                    <span className="ml-auto text-xs text-ink-muted">{tool.href}</span>
                  </Link>
                </li>
              ))}
              {!tools.length && (
                <li className="px-3 py-4 text-sm font-bold text-ink-muted">—</li>
              )}
              <li>
                <Link
                  href={`/search${q ? `?q=${encodeURIComponent(q)}` : ""}`}
                  className="flex min-h-11 items-center rounded-xl px-3 py-2 text-sm font-bold text-sky hover:bg-sky/10"
                  onClick={() => setOpen(false)}
                >
                  {t.nav.search} →
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
