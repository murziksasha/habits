"use client";

import { useLocale } from "@/lib/locale-context";
import { DeepCourseHub } from "@/components/deep-course-hub";

export function SqlFundamentalsClient() {
  const { t, locale } = useLocale();
  return (
    <DeepCourseHub
      courseSlug="sql_fundamentals"
      icon="🗄️"
      color="#336791"
      title={t.courses.sql_fundamentals}
      subtitle={
        locale === "en"
          ? "SQL, PL/SQL, and database administration. Browse every section. Earlier topics are only a suggestion."
          : "SQL, PL/SQL і адміністрування. Усі розділи відкриті. Попередні теми лише підказують порядок."
      }
      backHref="/programming"
      backLabel={`💻 ${t.nav.programming}`}
    />
  );
}
