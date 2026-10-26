"use client";

import { useLocale } from "@/lib/locale-context";
import { DeepCourseHub } from "@/components/deep-course-hub";

export function ExpressFundamentalsClient() {
  const { t, locale } = useLocale();
  return (
    <DeepCourseHub
      courseSlug="express_fundamentals"
      icon="🚂"
      color="#000000"
      title={t.courses.express_fundamentals}
      subtitle={
        locale === "en"
          ? "App, routes, middleware, REST, errors, Router — with unit exams."
          : "App, routes, middleware, REST, errors, Router — з контрольними."
      }
      backHref="/programming"
      backLabel={`💻 ${t.nav.programming}`}
    />
  );
}
