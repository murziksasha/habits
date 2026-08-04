"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useLocale } from "@/lib/locale-context";
import { Badge } from "@/components/ui";
import { PageLoading } from "@/components/page-loading";
import { useRequireAuth } from "@/lib/use-require-auth";
import { useAuth } from "@/lib/auth-context";

const NodeStudio = dynamic(
  () => import("@/components/node-studio").then((m) => m.NodeStudio),
  {
    ssr: false,
    loading: () => <PageLoading label="Loading Node Studio…" />,
  },
);

/**
 * Labs: in-browser Node/npm via WebContainers.
 * Requires NEXT_PUBLIC_WEBCONTAINERS when enabled.
 */
export default function NodeStudioPage() {
  const { locale, t } = useLocale();
  const { user, loading } = useAuth();
  const { ready } = useRequireAuth();
  const en = locale === "en";
  const flagOn =
    typeof process !== "undefined" &&
    process.env.NEXT_PUBLIC_WEBCONTAINERS === "1";

  if (loading || !ready) {
    return <PageLoading label={t.common.loading} />;
  }
  if (!user) return <PageLoading label={t.common.loading} />;

  return (
    <div className="mx-auto max-w-6xl space-y-4 p-4 pb-24 md:pb-16">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-black">📦 Node Studio</h1>
            <Badge tone="muted">Labs</Badge>
          </div>
          <p className="text-sm font-bold text-ink-muted">
            {en
              ? "Run Node/npm/Express in the browser (WebContainers)."
              : "Node/npm/Express у браузері (WebContainers)."}
          </p>
          {!flagOn && (
            <p className="text-xs font-bold text-sun" role="status">
              {en
                ? "Tip: set NEXT_PUBLIC_WEBCONTAINERS=1 for full boot."
                : "Підказка: NEXT_PUBLIC_WEBCONTAINERS=1 для повного boot."}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/programming" className="btn-secondary min-h-11 !py-2 text-sm">
            ← {t.nav.programming}
          </Link>
          <Link href="/playground" className="btn-secondary min-h-11 !py-2 text-sm">
            {t.nav.playground}
          </Link>
        </div>
      </header>
      <NodeStudio locale={en ? "en" : "uk"} />
    </div>
  );
}
