"use client";

import { useLocale } from "@/lib/locale-context";
import { DeepCourseHub } from "@/components/deep-course-hub";

export default function QaTheoryHubPage() {
  const { t, locale } = useLocale();
  return (
    <DeepCourseHub
      courseSlug="qa_theory"
      icon="🧪"
      color="#0D9488"
      title={t.courses.qa_theory}
      subtitle={
        locale === "en"
          ? "Principles, levels, types, design techniques, STLC, defects — deep theory."
          : "Принципи, рівні, види, техніки дизайну, STLC, дефекти — глибока теорія."
      }
      backHref="/programming"
      backLabel={`💻 ${t.nav.programming}`}
    />
  );
}
