"use client";

import { useLocale } from "@/lib/locale-context";
import { DeepCourseHub } from "@/components/deep-course-hub";

export default function EmbeddedCppHubPage() {
  const { t, locale } = useLocale();
  return (
    <DeepCourseHub
      courseSlug="embedded_cpp"
      icon="🪖"
      color="#4B5320"
      title={t.courses.embedded_cpp}
      subtitle={
        locale === "en"
          ? "C++ for constrained systems: memory, CMake, networking, FreeRTOS, MAVLink — with unit exams."
          : "C++ для обмежених ресурсів: пам'ять, CMake, мережа, FreeRTOS, MAVLink — з контрольними."
      }
      backHref="/programming"
      backLabel={`💻 ${t.nav.programming}`}
    />
  );
}
