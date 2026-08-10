import Link from "next/link";
import {
  COURSE_GROUP_META,
  COURSE_HUB_HREF,
  COURSE_META,
  type CourseGroup,
  type CourseSlug,
  UI,
} from "@eduforge/shared";
import { CoursesClient } from "./courses-client";

const GROUP_ORDER: CourseGroup[] = ["code", "deep", "skill", "chess"];

/**
 * Courses catalog — RSC static group map (SEO/crawl) + client progress chips island.
 */
export default function CoursesPage() {
  const groups = GROUP_ORDER.map((g) => ({
    group: g,
    meta: COURSE_GROUP_META[g],
    courses: (Object.keys(COURSE_META) as CourseSlug[]).filter(
      (s) => COURSE_META[s].group === g,
    ),
  }));

  return (
    <div className="space-y-6">
      {/* Server-rendered outline for crawlers / no-JS progressive enhancement */}
      <nav aria-label="Course groups" className="sr-only">
        <h1>{UI.nav.courses}</h1>
        <ul>
          {groups.map(({ group, meta, courses }) => (
            <li key={group}>
              <span>{meta.titleEn}</span>
              <ul>
                {courses.map((slug) => (
                  <li key={slug}>
                    <Link href={COURSE_HUB_HREF[slug] ?? `/courses/${slug}`}>
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
