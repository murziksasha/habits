"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";

export default function SchoolDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user, token, loading } = useAuth();
  const { t } = useLocale();
  const router = useRouter();
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

  async function load() {
    if (!token) return;
    const d = await api<NonNullable<typeof data>>(`/orgs/${id}`, { token });
    setData(d);
  }

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (token && id) void load().catch(() => setData(null));
  }, [token, id]);

  if (loading || !user || !data) return <p>{t.common.loading}</p>;

  const canTeach =
    data.membership?.role === "owner" ||
    data.membership?.role === "teacher" ||
    user.role === "admin";

  return (
    <div className="space-y-6">
      <Link href="/schools" className="text-sm font-bold text-ink-muted">
        ← {t.common.back}
      </Link>
      <div className="card">
        <h1 className="text-3xl font-black">{data.organization.name}</h1>
        <p className="text-ink-muted">{data.organization.slug}</p>
      </div>

      {canTeach && (
        <div className="card space-y-3 max-w-lg">
          <h2 className="font-black">{t.schools.createClass}</h2>
          <input
            className="input"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />
          <button
            type="button"
            className="btn-primary"
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

      <section className="card space-y-2">
        <h2 className="font-black">{t.schools.classes}</h2>
        {data.classes.map((cls) => (
          <Link
            key={cls.id}
            href={`/schools/class/${cls.id}`}
            className="flex justify-between rounded-xl border border-slate-100 p-3 font-bold hover:border-brand/40"
          >
            <span>{cls.name}</span>
            <span className="font-mono text-xs text-ink-muted">{cls.inviteCode}</span>
          </Link>
        ))}
        {!data.classes.length && <p className="text-ink-muted text-sm">—</p>}
      </section>

      <section className="card space-y-2">
        <h2 className="font-black">{t.schools.members}</h2>
        {data.members.map((m) => (
          <div key={m.userId} className="flex justify-between text-sm font-bold">
            <span>{m.displayName ?? m.userId.slice(0, 8)}</span>
            <span className="text-ink-muted">{m.role}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
