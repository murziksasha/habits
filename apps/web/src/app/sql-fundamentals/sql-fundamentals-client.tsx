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
          ? "SELECT, JOINs, aggregates, DML, keys — with unit exams."
          : "SELECT, JOINs, aggregates, DML, keys — з контрольними."
      }
      backHref="/programming"
      backLabel={`💻 ${t.nav.programming}`}
    />
  );
}
