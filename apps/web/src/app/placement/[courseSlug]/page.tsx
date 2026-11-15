import { CoursePlacementClient } from "../course-placement-client";

export default async function CoursePlacementPage({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = await params;
  return <CoursePlacementClient courseSlug={courseSlug} />;
}
