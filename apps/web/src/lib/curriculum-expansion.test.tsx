import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import {
  COURSE_META,
  coursesByGroup,
  LOCAL_LAB_MANIFESTS,
  UI,
} from "@eduforge/shared";
import { isRscShellRoute } from "./rsc-shells.js";

vi.mock("@/lib/locale-context", () => ({
  useLocale: () => ({
    locale: "uk",
    setLocale: () => {},
    t: UI,
  }),
}));

describe("curriculum expansion routing and LocalLabPanel", () => {
  it("registers all 7 new deep track routes as RSC shells", () => {
    for (const route of [
      "/software-testing",
      "/postgresql-apps",
      "/git-workflows",
      "/web-security",
      "/ai-development",
      "/nextjs-fullstack",
      "/applied-algorithms",
    ]) {
      expect(isRscShellRoute(route), route).toBe(true);
    }
  });

  it("deep course registry includes all 17 deep tracks", () => {
    const deep = coursesByGroup("deep");
    expect(deep.length).toBeGreaterThanOrEqual(17);
    for (const slug of deep) {
      expect(COURSE_META[slug]).toBeTruthy();
    }
  });

  it("renders LocalLabPanel with download href, practice notice, and Windows tips", async () => {
    const { LocalLabPanel } = await import("../components/local-lab-panel.js");
    const m1 = LOCAL_LAB_MANIFESTS[0]!;
    const html = renderToStaticMarkup(<LocalLabPanel lab={m1} />);
    expect(html).toContain(m1.downloadPath);
    expect(html).toContain("pnpm install --frozen-lockfile");
    expect(html).toContain("Windows PowerShell");
    expect(html).toContain('data-testid="local-lab-practice-notice"');
  });
});
