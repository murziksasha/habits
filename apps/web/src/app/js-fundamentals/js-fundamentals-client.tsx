"use client";

import { useLocale } from "@/lib/locale-context";
import { DeepCourseHub } from "@/components/deep-course-hub";

export function JsFundamentalsClient() {
  const { t, locale } = useLocale();
  return (
    <DeepCourseHub
      courseSlug="js_fundamentals"
      icon="⚡"
      color="#F7DF1E"
      title={t.courses.js_fundamentals}
      subtitle={
        locale === "en"
          ? "Deep JavaScript: types, functions, async, DOM, modules — with unit exams."
          : "Глибокий JavaScript: типи, functions, async, DOM, modules — з контрольними."
      }
      backHref="/programming"
      backLabel={`💻 ${t.nav.programming}`}
    />
  );
}
