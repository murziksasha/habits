"use client";

import { useLocale } from "@/lib/locale-context";
import { DeepCourseHub } from "@/components/deep-course-hub";

export function NodeFundamentalsClient() {
  const { t, locale } = useLocale();
  return (
    <DeepCourseHub
      courseSlug="node_fundamentals"
      icon="🟢"
      color="#339933"
      title={t.courses.node_fundamentals}
      subtitle={
        locale === "en"
          ? "Runtime, modules, fs, env, HTTP, npm, async — with unit exams."
          : "Runtime, modules, fs, env, HTTP, npm, async — з контрольними."
      }
      backHref="/programming"
      backLabel={`💻 ${t.nav.programming}`}
    />
  );
}
