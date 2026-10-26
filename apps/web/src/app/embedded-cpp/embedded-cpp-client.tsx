"use client";

import { useLocale } from "@/lib/locale-context";
import { DeepCourseHub } from "@/components/deep-course-hub";

export function EmbeddedCppClient() {
  const { t, locale } = useLocale();
  return (
    <DeepCourseHub
      courseSlug="embedded_cpp"
      icon="🪖"
      color="#4B5320"
      title={t.courses.embedded_cpp}
      subtitle={
        locale === "en"
          ? "MilTech deep track: C++ · RTOS · MAVLink · safety · data-link · mission — labs, projects & unit exams."
          : "MilTech deep track: C++ · RTOS · MAVLink · safety · data-link · mission — labs, проєкти та контрольні."
      }
      backHref="/programming"
      backLabel={`💻 ${t.nav.programming}`}
    />
  );
}
