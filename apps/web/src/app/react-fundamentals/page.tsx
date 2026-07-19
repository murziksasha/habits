"use client";

import { useLocale } from "@/lib/locale-context";
import { DeepCourseHub } from "@/components/deep-course-hub";

export default function ReactFundamentalsHubPage() {
  const { t, locale } = useLocale();
  return (
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
  );
}
