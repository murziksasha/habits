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
          ? "Oracle SQL through the public 1Z0-071 checklist — functions, joins, subqueries, sets, DDL, and unit exams."
          : "Oracle SQL за публічною програмою 1Z0-071 — функції, JOIN, підзапити, множини, DDL і контрольні."
      }
      backHref="/programming"
      backLabel={`💻 ${t.nav.programming}`}
    />
  );
}
