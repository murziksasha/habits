"use client";

import { useLocale } from "@/lib/locale-context";
import { DeepCourseHub } from "@/components/deep-course-hub";

export function CssLayoutClient() {
  const { t, locale } = useLocale();
  return (
    <DeepCourseHub
      courseSlug="css_layout"
      icon="🎨"
      color="#264DE4"
      title={t.courses.css_layout}
      subtitle={
        locale === "en"
          ? "Deep Flexbox & CSS Grid track with unit control tests."
          : "Глибокий Flexbox і CSS Grid з контрольними після розділів."
      }
      backHref="/programming"
      backLabel={`💻 ${t.nav.programming}`}
    />
  );
}
