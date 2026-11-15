"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { PageLoading } from "@/components/page-loading";
import { EmptyState } from "@/components/ui";
import { useRequireAuth } from "@/lib/use-require-auth";

export function SchoolDetailClient() {
  const { id } = useParams<{ id: string }>();
  const { user, token, loading } = useAuth();
  const { ready } = useRequireAuth();
  const { t, locale } = useLocale();
  const [data, setData] = useState<{
    organization: { id: string; name: string; slug: string };
    membership: { role: string } | null;
    members: { userId: string; role: string; displayName: string | null }[];
    classes: {
      id: string;
      name: string;
      inviteCode: string;
    }[];
  } | null>(null);
  const [className, setClassName] = useState("");
  const [dataLoading, setDataLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  async function load() {
    if (!token || !id) return;
    setDataLoading(true);
    setLoadError(false);
    try {
      const d = await api<NonNullable<typeof data>>(`/orgs/${id}`, { token });
      setData(d);
    } catch {
      setData(null);
      setLoadError(true);
    } finally {
      setDataLoading(false);
    }
  }

  useEffect(() => {
    if (token && id) void load();
  }, [token, id]);

  if (loading || !ready || dataLoading) {
    return <PageLoading label={t.common.loading} />;
  }
  if (!user) return <PageLoading label={t.common.loading} />;

  if (loadError || !data) {
    return (
      <EmptyState
        title={locale === "en" ? "School not found" : "Школу не знайдено"}
        description={
          locale === "en"
            ? "Check the link or return to schools list."
            : "Перевірте посилання або поверніться до списку."
        }
        actionHref="/schools"
        actionLabel={t.nav.schools}
      />
    );
  }

  const canTeach =
    data.membership?.role === "owner" ||
    data.membership?.role === "teacher" ||
    user.role === "admin";

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <Link
        href="/schools"
        className="inline-flex min-h-11 items-center text-sm font-bold text-ink-muted hover:text-sky"
      >
        ← {t.common.back}
      </Link>
      <div className="card">
        <h1 className="text-3xl font-black">{data.organization.name}</h1>
        <p className="font-bold text-ink-muted">{data.organization.slug}</p>
        {data.membership?.role && (
          <p className="mt-2 text-xs font-black uppercase text-sky">
            {data.membership.role}
          </p>
        )}
      </div>

      {canTeach && (
        <div className="card max-w-lg space-y-3">
          <h2 className="font-black">{t.schools.createClass}</h2>
          <label className="label" htmlFor="new-class-name">
            {locale === "en" ? "Class name" : "Назва класу"}
          </label>
          <input
            id="new-class-name"
            className="input"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            autoComplete="off"
          />
          <button
            type="button"
            className="btn-primary min-h-11"
            disabled={!className.trim()}
            onClick={() =>
              void api(`/orgs/${data.organization.id}/classes`, {
                method: "POST",
                token,
                body: { name: className },
              }).then(() => {
                setClassName("");
                return load();
              })
            }
          >
            {t.common.create}
          </button>
        </div>
      )}

      <section className="space-y-3" aria-labelledby="school-classes">
        <h2 id="school-classes" className="text-xl font-black">
          {locale === "en" ? "Classes" : "Класи"}
        </h2>
        {!data.classes.length ? (
          <p className="text-sm font-bold text-ink-muted">
            {locale === "en" ? "No classes yet" : "Класів ще немає"}
          </p>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2">
            {data.classes.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/schools/class/${c.id}`}
                  className="card flex min-h-11 flex-col gap-1 hover:border-brand/40"
                >
                  <span className="font-black">{c.name}</span>
                  <span className="font-mono text-xs text-ink-muted">
                    {c.inviteCode}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-2" aria-labelledby="school-members">
        <h2 id="school-members" className="text-lg font-black">
          {locale === "en" ? "Members" : "Учасники"} · {data.members.length}
        </h2>
        <ul className="space-y-1">
          {data.members.map((m) => (
            <li
              key={m.userId}
              className="flex justify-between rounded-xl border border-slate-100 px-3 py-2 text-sm font-bold dark:border-slate-800"
            >
              <span>{m.displayName ?? m.userId.slice(0, 8)}</span>
              <span className="text-ink-muted">{m.role}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
