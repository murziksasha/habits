"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { filterDiscoveryTools } from "@eduforge/shared";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { Skeleton } from "@/components/ui";

function SearchInner() {
  const { user, token, loading } = useAuth();
  const { t, locale } = useLocale();
  const router = useRouter();
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [courses, setCourses] = useState<
    { slug: string; titleUk: string; descriptionUk: string; icon: string }[]
  >([]);
  const [users, setUsers] = useState<
    { userId: string; displayName: string; globalLevel: number; email: string }[]
  >([]);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!token || q.trim().length < 2) {
      setCourses([]);
      setUsers([]);
      return;
    }
    const tmr = setTimeout(() => {
      void api<{
        courses: typeof courses;
        users: typeof users;
      }>(`/search?q=${encodeURIComponent(q)}`, { token })
        .then((d) => {
          setCourses(d.courses);
          setUsers(d.users);
        })
        .catch(() => {
          setCourses([]);
          setUsers([]);
        });
    }, 250);
    return () => clearTimeout(tmr);
  }, [q, token]);

  const tools = useMemo(
    () => filterDiscoveryTools(q, locale === "en" ? "en" : "uk"),
    [q, locale],
  );

  if (loading || !user) {
    return (
      <div className="space-y-4" aria-busy="true">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-12 w-full max-w-xl" />
        <p className="sr-only">{t.common.loading}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black">🔍 {t.nav.search}</h1>
      <p className="text-sm font-bold text-ink-muted">{t.onboarding.commandPalette}</p>
      <input
        className="input max-w-xl min-h-11"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t.extra.searchPlaceholder}
        autoFocus
      />

      {tools.length > 0 && (
        <section className="space-y-2">
          <h2 className="font-black">{t.onboarding.searchTools}</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="card flex min-h-11 items-center justify-between hover:border-brand/40"
              >
                <span className="font-black">
                  {locale === "en" ? tool.titleEn : tool.titleUk}
                </span>
                <span className="text-xs text-ink-muted">{tool.href}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {courses.length > 0 && (
        <section className="space-y-2">
          <h2 className="font-black">{t.nav.courses}</h2>
          {courses.map((c) => (
            <Link key={c.slug} href={`/courses/${c.slug}`} className="card block hover:border-brand/40">
              <span className="text-2xl mr-2">{c.icon}</span>
              <span className="font-black">{c.titleUk}</span>
              <p className="text-sm text-ink-muted mt-1">{c.descriptionUk}</p>
            </Link>
          ))}
        </section>
      )}

      {users.length > 0 && (
        <section className="space-y-2">
          <h2 className="font-black">{t.social.friends}</h2>
          {users.map((u) => (
            <div key={u.userId} className="card flex justify-between items-center gap-2">
              <Link href={`/u/${u.userId}`} className="min-w-0 flex-1 hover:text-sky">
                <p className="font-black">{u.displayName}</p>
                <p className="text-xs text-ink-muted">
                  L{u.globalLevel} · {u.email}
                </p>
              </Link>
              <button
                type="button"
                className="btn-secondary !py-2 text-sm shrink-0 min-h-11"
                onClick={() =>
                  void api("/friends/request", {
                    method: "POST",
                    token,
                    body: { userId: u.userId },
                  })
                }
              >
                {t.social.addFriend}
              </button>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

export function SearchClient() {
  return (
    <Suspense
      fallback={
        <div className="space-y-4" aria-busy="true">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-12 w-full max-w-xl" />
        </div>
      }
    >
      <SearchInner />
    </Suspense>
  );
}
