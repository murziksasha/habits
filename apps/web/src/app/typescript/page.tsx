"use client";

import { useLocale } from "@/lib/locale-context";
import { DeepCourseHub } from "@/components/deep-course-hub";

/** TypeScript deep hub — shared DeepCourseHub + PageLoading. */
export default function TypescriptHubPage() {
  const { t, locale } = useLocale();
  return (
    <DeepCourseHub
      courseSlug="typescript"
      icon="📘"
      color="#3178C6"
      title={t.courses.typescript}
      subtitle={
        locale === "en"
          ? "Types, interfaces, generics, tooling — with unit exams."
          : "Типи, interfaces, generics, tooling — з контрольними."
      }
      backHref="/programming"
      backLabel={`💻 ${t.nav.programming}`}
    />
  );
}
