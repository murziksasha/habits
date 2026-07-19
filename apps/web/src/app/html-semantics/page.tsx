"use client";

import { useLocale } from "@/lib/locale-context";
import { DeepCourseHub } from "@/components/deep-course-hub";

export default function HtmlSemanticsHubPage() {
  const { t, locale } = useLocale();
  return (
    <DeepCourseHub
      courseSlug="html_semantics"
      icon="🌐"
      color="#E34F26"
      title={t.courses.html_semantics}
      subtitle={
        locale === "en"
          ? "Semantic markup, landmarks, accessible forms, ARIA — with unit exams."
          : "Семантична верстка, landmarks, accessible forms, ARIA — з контрольними."
      }
      backHref="/programming"
      backLabel={`💻 ${t.nav.programming}`}
    />
  );
}
