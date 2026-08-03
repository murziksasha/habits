"use client";

import dynamic from "next/dynamic";
import { useLocale } from "@/lib/locale-context";

const NodeStudio = dynamic(
  () => import("@/components/node-studio").then((m) => m.NodeStudio),
  {
    ssr: false,
    loading: () => (
      <p className="p-6 font-bold text-ink-muted">Loading Node Studio…</p>
    ),
  },
);

export default function NodeStudioPage() {
  const { locale } = useLocale();
  return (
    <div className="mx-auto max-w-6xl p-4 pb-16">
      <NodeStudio locale={locale === "en" ? "en" : "uk"} />
    </div>
  );
}
