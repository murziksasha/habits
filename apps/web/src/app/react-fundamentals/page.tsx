"use client";

import Link from "next/link";
import { useLocale } from "@/lib/locale-context";
import { DeepCourseHub } from "@/components/deep-course-hub";

export default function ReactFundamentalsHubPage() {
  const { t, locale } = useLocale();
  return (
    <div className="space-y-4">
      <DeepCourseHub
        courseSlug="react_fundamentals"
        icon="⚛️"
        color="#61DAFB"
        title={t.courses.react_fundamentals}
        subtitle={
          locale === "en"
            ? "Components, props, state, lists, effects, forms — with unit exams."
            : "Компоненти, props, state, lists, effects, forms — з контрольними."
        }
        backHref="/programming"
        backLabel={`💻 ${t.nav.programming}`}
      />
      <div className="flex flex-wrap gap-2 px-1">
        <Link href="/playground" className="btn-secondary !py-2 text-sm inline-flex">
          ⚛️ {locale === "en" ? "React Studio" : "React Studio"}
        </Link>
      </div>
    </div>
  );
}
