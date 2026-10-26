"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { PageLoading } from "@/components/page-loading";
import { useRequireAuth } from "@/lib/use-require-auth";

type OrgRow = {
  organizationId: string;
  role: string;
  name: string;
  slug: string;
};

export function SchoolsClient() {
  const { user, token, loading } = useAuth();
  const { ready } = useRequireAuth();
  const { t } = useLocale();
  const router = useRouter();
  const [orgs, setOrgs] = useState<OrgRow[]>([]);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const [dataLoading, setDataLoading] = useState(true);

  async function load() {
    if (!token) return;
    setDataLoading(true);
    try {
      const d = await api<{ organizations: OrgRow[] }>("/orgs/mine", { token });
      setOrgs(d.organizations);
    } catch {
      setOrgs([]);
    } finally {
      setDataLoading(false);
    }
  }

  useEffect(() => {
    if (token) void load();
  }, [token]);

  if (loading || !ready || dataLoading) return <PageLoading label={t.common.loading} />;
  if (!user) return <PageLoading label={t.common.loading} />;

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <h1 className="text-3xl font-black">🏫 {t.schools.title}</h1>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="card space-y-3">
          <h2 className="font-black">{t.schools.createOrg}</h2>
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="School name"
          />
          <button
            type="button"
            className="btn-primary"
            onClick={() =>
              void api<{ organization: { id: string } }>("/orgs", {
                method: "POST",
                token,
                body: { name },
              })
                .then((d) => router.push(`/schools/${d.organization.id}`))
                .catch(() => setMsg(t.common.error))
            }
          >
            {t.common.create}
          </button>
        </div>

        <div className="card space-y-3">
          <h2 className="font-black">{t.schools.joinClass}</h2>
          <input
            className="input font-mono uppercase"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={t.schools.inviteCode}
          />
          <button
            type="button"
            className="btn-sky"
            onClick={() =>
              void api("/orgs/classes/join", {
                method: "POST",
                token,
                body: { inviteCode: code },
              })
                .then(() => {
                  setMsg("OK");
                  void load();
                })
                .catch(() => setMsg(t.common.error))
            }
          >
            {t.common.join}
          </button>
        </div>
      </div>

      {msg && <p className="font-bold text-sky">{msg}</p>}

      <section className="space-y-2">
        {orgs.map((o) => (
          <Link key={o.organizationId} href={`/schools/${o.organizationId}`} className="card block">
            <p className="font-black text-lg">{o.name}</p>
            <p className="text-sm text-ink-muted">
              {o.role} · {o.slug}
            </p>
          </Link>
        ))}
        {!orgs.length && <p className="text-ink-muted">{t.schools.empty}</p>}
      </section>
    </div>
  );
}
