"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";

export default function SearchPage() {
  const { user, token, loading } = useAuth();
  const { t } = useLocale();
  const router = useRouter();
  const [q, setQ] = useState("");
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

  if (loading || !user) return <p>{t.common.loading}</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black">🔍 {t.nav.search}</h1>
      <input
        className="input max-w-xl"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t.extra.searchPlaceholder}
        autoFocus
      />

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
                className="btn-secondary !py-2 text-sm shrink-0"
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
