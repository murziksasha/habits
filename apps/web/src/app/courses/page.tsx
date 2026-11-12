import Link from "next/link";
import {
  COURSE_HUB_HREF,
  COURSE_META,
  SUBJECT_IDS,
  SUBJECT_META,
  coursesInSubject,
  type CourseSlug,
  UI,
} from "@eduforge/shared";
import { CoursesClient } from "./courses-client";

/**
 * Courses catalog. The visible grid loads published courses from the API.
 * This outline is for crawlers and no-JS clients, grouped by subject.
 */
export default function CoursesPage() {
  const subjects = SUBJECT_IDS.map((id) => ({
    id,
    meta: SUBJECT_META[id],
    courses: coursesInSubject(id),
  }));

  return (
    <div className="space-y-6">
      <nav aria-label={UI.nav.courses} className="sr-only">
        <h1>{UI.nav.courses}</h1>
        <ul>
          {subjects.map(({ id, meta, courses }) => (
            <li key={id}>
              <span>{meta.titleEn}</span>
              <ul>
                {courses.map((slug) => (
                  <li key={slug}>
                    <Link href={COURSE_HUB_HREF[slug as CourseSlug] ?? `/courses/${slug}`}>
                      {COURSE_META[slug].titleEn}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
      <CoursesClient />
    </div>
  );
}
