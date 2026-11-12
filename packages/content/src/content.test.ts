import { describe, expect, it } from "vitest";
import {
  chessContent,
  cssLayoutContent,
  englishContent,
  htmlSemanticsContent,
  jsFundamentalsContent,
  logicContent,
  programmingContent,
  qaTheoryContent,
  reactFundamentalsContent,
  speedReadingContent,
  sqlFundamentalsContent,
  nodeFundamentalsContent,
  expressFundamentalsContent,
  embeddedCppContent,
  sysadminContent,
  devopsContent,
  typingContent,
  typescriptContent,
  softwareTestingContent,
  postgresqlAppsContent,
  gitWorkflowsContent,
  webSecurityContent,
  aiDevelopmentContent,
  pythonForAiContent,
  agenticSystemsContent,
  llmopsContent,
  aiSecurityContent,
  aiProductContent,
  nextjsFullstackContent,
  appliedAlgorithmsContent,
  type CourseContent,
  type Exercise,
} from "./index.js";
import { FLASHCARD_DECKS } from "./flashcards.js";

// Keep aligned with @eduforge/shared PROGRAMMING_MINI_LESSON_SLUGS
const PROGRAMMING_MINI_SLUGS = [
  "html-mini-card",
  "css-mini-hero",
  "js-mini-counter",
  "ts-mini-types",
  "react-mini-toggle",
  "git-mini-commit",
  "node-mini-server",
  "express-mini-api",
  "sql-mini-join",
  "qa-mini-case",
] as const;

const PROGRAMMING_UNIT_ORDER = [
  "html",
  "css",
  "js",
  "typescript",
  "react",
  "git",
  "node",
  "express",
  "sql",
  "qa",
] as const;

const courses: CourseContent[] = [
  englishContent,
  chessContent,
  typingContent,
  speedReadingContent,
  logicContent,
  programmingContent,
  typescriptContent,
  htmlSemanticsContent,
  cssLayoutContent,
  qaTheoryContent,
  jsFundamentalsContent,
  reactFundamentalsContent,
  sqlFundamentalsContent,
  nodeFundamentalsContent,
  expressFundamentalsContent,
  embeddedCppContent,
  sysadminContent,
  devopsContent,
  softwareTestingContent,
  postgresqlAppsContent,
  gitWorkflowsContent,
  webSecurityContent,
  aiDevelopmentContent,
  pythonForAiContent,
  agenticSystemsContent,
  llmopsContent,
  aiSecurityContent,
  aiProductContent,
  nextjsFullstackContent,
  appliedAlgorithmsContent,
];

const EXERCISE_TYPES = new Set([
  "mcq",
  "translate",
  "match",
  "order_words",
  "fill_blank",
  "typing",
  "rsvp",
  "comprehension",
  "logic_puzzle",
  "chess_puzzle",
  "chess_lesson",
  "code_read",
  "code_output",
  "code_fill",
  "code_order",
  "code_project",
  "code_run",
  "video",
]);

function collectExercises(course: CourseContent): Exercise[] {
  return course.units.flatMap((u) => u.lessons.flatMap((l) => l.exercises));
}

describe("course content integrity", () => {
  it("includes all course slugs including deep tracks", () => {
    expect(courses.map((c) => c.slug).sort()).toEqual(
      [
        "ai_development",
        "ai_product",
        "ai_security",
        "agentic_systems",
        "applied_algorithms",
        "chess",
        "css_layout",
        "english",
        "git_workflows",
        "html_semantics",
        "js_fundamentals",
        "llmops",
        "logic",
        "nextjs_fullstack",
        "programming",
        "postgresql_apps",
        "python_for_ai",
        "qa_theory",
        "react_fundamentals",
        "software_testing",
        "speed_reading",
        "node_fundamentals",
        "express_fundamentals",
        "embedded_cpp",
        "sysadmin",
        "devops",
        "sql_fundamentals",
        "typing",
        "typescript",
        "web_security",
      ].sort(),
    );
  });

  describe("deep tracks suite", () => {
    it("html_semantics volume + exams", () => {
      expect(htmlSemanticsContent.units.length).toBeGreaterThanOrEqual(8);
      const lessons = htmlSemanticsContent.units.flatMap((u) => u.lessons);
      expect(lessons.length).toBeGreaterThanOrEqual(20);
      const exams = lessons.filter((l) => l.isExam);
      expect(exams.length).toBeGreaterThanOrEqual(7);
      expect(lessons.some((l) => l.isFree)).toBe(true);
      for (const e of exams) {
        expect(e.exercises.length).toBeGreaterThanOrEqual(4);
      }
    });

    it("css_layout has flex + grid units", () => {
      const slugs = cssLayoutContent.units.map((u) => u.slug);
      expect(slugs.some((s) => s.includes("flex"))).toBe(true);
      expect(slugs.some((s) => s.includes("grid"))).toBe(true);
      const lessons = cssLayoutContent.units.flatMap((u) => u.lessons);
      expect(lessons.length).toBeGreaterThanOrEqual(22);
      expect(lessons.filter((l) => l.isExam).length).toBeGreaterThanOrEqual(7);
    });

    it("qa_theory deep volume", () => {
      expect(qaTheoryContent.units.length).toBeGreaterThanOrEqual(12);
      const lessons = qaTheoryContent.units.flatMap((u) => u.lessons);
      expect(lessons.length).toBeGreaterThanOrEqual(40);
      expect(lessons.filter((l) => l.isExam).length).toBeGreaterThanOrEqual(10);
      expect(lessons.some((l) => l.isFree)).toBe(true);
    });

    it("every deep-track unit has an exam", () => {
      for (const c of [
        htmlSemanticsContent,
        cssLayoutContent,
        qaTheoryContent,
        jsFundamentalsContent,
        reactFundamentalsContent,
        sqlFundamentalsContent,
        nodeFundamentalsContent,
        expressFundamentalsContent,
        embeddedCppContent,
      ]) {
        for (const u of c.units) {
          expect(u.lessons.some((l) => l.isExam)).toBe(true);
        }
      }
    });

    it("js_fundamentals volume", () => {
      expect(jsFundamentalsContent.units.length).toBeGreaterThanOrEqual(7);
      const lessons = jsFundamentalsContent.units.flatMap((u) => u.lessons);
      expect(lessons.length).toBeGreaterThanOrEqual(18);
      expect(lessons.filter((l) => l.isExam).length).toBeGreaterThanOrEqual(7);
      expect(lessons.some((l) => l.isFree)).toBe(true);
    });

    it("react_fundamentals volume", () => {
      expect(reactFundamentalsContent.units.length).toBeGreaterThanOrEqual(6);
      const lessons = reactFundamentalsContent.units.flatMap((u) => u.lessons);
      expect(lessons.length).toBeGreaterThanOrEqual(14);
      expect(lessons.filter((l) => l.isExam).length).toBeGreaterThanOrEqual(6);
      expect(lessons.some((l) => l.isFree)).toBe(true);
    });

    it("sql_fundamentals volume", () => {
      expect(sqlFundamentalsContent.units.length).toBeGreaterThanOrEqual(14);
      const lessons = sqlFundamentalsContent.units.flatMap((u) => u.lessons);
      expect(lessons.length).toBeGreaterThanOrEqual(45);
      const exams = lessons.filter((l) => l.isExam);
      expect(exams.length).toBeGreaterThanOrEqual(14);
      for (const e of exams) {
        expect(e.exercises.length).toBeGreaterThanOrEqual(4);
      }
      expect(lessons.some((l) => l.isFree)).toBe(true);
      const slugs = sqlFundamentalsContent.units.map((u) => u.slug);
      expect(slugs).toContain("single-row");
      expect(slugs).toContain("conversion");
      expect(slugs).toContain("subqueries");
      expect(slugs).toContain("set-ops");
      expect(slugs).toContain("schema-objects");
      expect(slugs).toContain("access-dict");
      const last = sqlFundamentalsContent.units.at(-1);
      expect(last?.slug).toBe("capstone");
      for (const ex of collectExercises(sqlFundamentalsContent)) {
        if (ex.type === "code_order") {
          expect(ex.lines.length).toBe(ex.correct.length);
          expect([...ex.lines].sort()).toEqual([...ex.correct].sort());
        }
        if (ex.type === "mcq" || ex.type === "code_read" || ex.type === "code_output") {
          expect(ex.correctIndex).toBeGreaterThanOrEqual(0);
          expect(ex.correctIndex).toBeLessThan(ex.options.length);
        }
      }
    });

    it("node_fundamentals volume", () => {
      expect(nodeFundamentalsContent.units.length).toBeGreaterThanOrEqual(6);
      const lessons = nodeFundamentalsContent.units.flatMap((u) => u.lessons);
      expect(lessons.length).toBeGreaterThanOrEqual(16);
      expect(lessons.filter((l) => l.isExam).length).toBeGreaterThanOrEqual(6);
      expect(lessons.some((l) => l.isFree)).toBe(true);
    });

    it("express_fundamentals volume", () => {
      expect(expressFundamentalsContent.units.length).toBeGreaterThanOrEqual(6);
      const lessons = expressFundamentalsContent.units.flatMap((u) => u.lessons);
      expect(lessons.length).toBeGreaterThanOrEqual(16);
      expect(lessons.filter((l) => l.isExam).length).toBeGreaterThanOrEqual(6);
      expect(lessons.some((l) => l.isFree)).toBe(true);
    });

    it("sysadmin volume", () => {
      expect(sysadminContent.units.length).toBeGreaterThanOrEqual(13);
      const lessons = sysadminContent.units.flatMap((u) => u.lessons);
      expect(lessons.length).toBeGreaterThanOrEqual(64);
      const exams = lessons.filter((l) => l.isExam);
      expect(exams.length).toBeGreaterThanOrEqual(13);
      for (const e of exams) {
        expect(e.exercises.length).toBeGreaterThanOrEqual(6);
      }
      expect(lessons.some((l) => l.isFree)).toBe(true);
      expect(lessons).toHaveLength(64);
      const bySlug = Object.fromEntries(lessons.map((l) => [l.slug, l]));
      expect(bySlug["sa-etc"]?.titleEn).toBe("Git for configs");
      expect(bySlug["sa-least"]?.titleEn).toBe("VPN instead of an open port");
      const prompts = collectExercises(sysadminContent).map((e) => e.promptEn).join("\n");
      expect(prompts).toContain("RAID 1");
      expect(prompts).toContain("Tailscale");
      expect(prompts).toContain("git init");
      const slugs = sysadminContent.units.map((u) => u.slug);
      expect(slugs).toContain("foundations");
      expect(slugs).toContain("soho-network");
      expect(slugs).toContain("shell");
      expect(slugs).toContain("capstone");
      for (const u of sysadminContent.units) {
        expect(u.lessons.some((l) => l.isExam)).toBe(true);
      }
      for (const ex of collectExercises(sysadminContent)) {
        if (ex.type === "code_order") {
          expect(ex.lines.length).toBe(ex.correct.length);
          expect([...ex.lines].sort()).toEqual([...ex.correct].sort());
        }
        if (ex.type === "mcq" || ex.type === "code_read" || ex.type === "code_output") {
          expect(ex.correctIndex).toBeGreaterThanOrEqual(0);
          expect(ex.correctIndex).toBeLessThan(
            (ex.type === "code_output" ? ex.options?.length : ex.options.length) ?? 0,
          );
        }
        if (ex.type === "match") {
          const rights = ex.pairs.map((p) => p.right);
          expect(new Set(rights).size).toBe(rights.length);
        }
      }
    });

    it("devops volume", () => {
      const advanced = new Set(["k8s-workloads", "traffic-identity", "gitops-delivery", "data-plane", "alerts-runbooks", "incident-drills"]);
      const advancedLessons: Record<string, string[]> = {
        "k8s-workloads": ["do-w-config", "do-w-roll", "do-w-probes", "do-w-qos", "do-w-hpa", "do-w-pdb", "do-w-exam"],
        "traffic-identity": ["do-edge-svc", "do-edge-ingress", "do-edge-netpol", "do-edge-sa", "do-edge-tls", "do-edge-quota", "do-edge-exam"],
        "gitops-delivery": ["do-del-env", "do-del-digest", "do-del-app", "do-del-drift", "do-del-undo", "do-del-gate", "do-del-exam"],
        "data-plane": ["do-data-place", "do-data-migrate", "do-data-backup", "do-data-pool", "do-data-rpo", "do-data-dsn", "do-data-exam"],
        "alerts-runbooks": ["do-alert-symptom", "do-alert-burn", "do-alert-use", "do-alert-labels", "do-alert-trace", "do-alert-book", "do-alert-exam"],
        "incident-drills": ["do-drill-cert", "do-drill-digest", "do-drill-disk", "do-drill-5xx", "do-drill-secret", "do-drill-write", "do-drill-exam"],
      };
      expect(devopsContent.units).toHaveLength(19);
      const lessons = devopsContent.units.flatMap((u) => u.lessons);
      expect(lessons).toHaveLength(108);
      const exams = lessons.filter((l) => l.isExam);
      expect(exams).toHaveLength(19);
      for (const e of exams) {
        expect(e.exercises.length).toBeGreaterThanOrEqual(6);
      }
      for (const lesson of lessons.filter((l) => !l.isExam)) {
        expect(lesson.exercises.length).toBeGreaterThanOrEqual(4);
      }
      expect(lessons.some((l) => l.isFree)).toBe(true);
      expect(devopsContent.units.map((u) => u.slug)).toEqual([
        "git-workstation",
        "linux-base",
        "bash",
        "networks",
        "python-ops",
        "containers",
        "aws-survival",
        "iac",
        "ci",
        "kubernetes",
        "observability",
        "devsecops-gitops",
        "k8s-workloads",
        "traffic-identity",
        "gitops-delivery",
        "data-plane",
        "alerts-runbooks",
        "incident-drills",
        "sre-capstone",
      ]);
      for (const u of devopsContent.units) {
        if (advanced.has(u.slug)) expect(u.lessons.map((l) => l.slug)).toEqual(advancedLessons[u.slug]);
        expect(u.lessons.some((l) => l.isExam)).toBe(true);
        const expectedNonExam = u.slug === "sre-capstone" ? 5 : advanced.has(u.slug) ? 6 : 4;
        expect(u.lessons.filter((l) => !l.isExam)).toHaveLength(expectedNonExam);
        for (const l of u.lessons) {
          expect(l.slug.length).toBeLessThanOrEqual(64);
          if (!advanced.has(u.slug)) {
            if (!l.isExam) expect(l.exercises).toHaveLength(4);
            continue;
          }
          expect([4, 5]).toContain(l.difficulty);
          expect(l.isFree).toBe(false);
          expect(l.exercises).toHaveLength(l.isExam ? 8 : 6);
          for (const exercise of l.exercises) {
            expect(exercise.promptUk.trim().length).toBeGreaterThan(0);
            expect(exercise.promptEn?.trim().length).toBeGreaterThan(0);
            expect("explanationUk" in exercise && !!exercise.explanationUk?.trim()).toBe(true);
            expect("explanationEn" in exercise && !!exercise.explanationEn?.trim()).toBe(true);
          }
          const types = l.exercises.map((e) => e.type);
          if (l.isExam) {
            expect(l.passThreshold).toBe(0.7);
            expect(types.filter((t) => t === "code_order").length).toBeGreaterThanOrEqual(2);
            expect(types.filter((t) => t === "code_read").length).toBeGreaterThanOrEqual(2);
          } else {
            expect(types.filter((t) => t === "mcq").length).toBeLessThanOrEqual(2);
            expect(types.some((t) => t === "code_read" || t === "code_output")).toBe(true);
            expect(types.some((t) => t === "code_fill" || t === "code_order")).toBe(true);
            expect(types.some((t) => t === "match" || t === "comprehension")).toBe(true);
            if (u.slug === "incident-drills") {
              expect(types[0]).toBe("comprehension");
              expect(types[1]).toBe("code_order");
            }
          }
        }
      }
      const prompts = collectExercises(devopsContent).map((e) => e.promptEn).join("\n");
      expect(prompts).toContain("OIDC");
      expect(prompts).toContain("readiness probe");
      expect(prompts).toContain("cosign");
      expect(prompts).toContain("Argo CD");
      expect(prompts).toContain("error budget");
      for (const marker of ["cert-manager", "NetworkPolicy", "PITR", "burn rate", "image digest"]) {
        expect(JSON.stringify(devopsContent)).toContain(marker);
      }
      expect(lessons.filter((l) => l.isFree).map((l) => l.slug)).toEqual([
        "do-ssh", "do-git-objects", "do-git-branch", "do-git-hooks", "do-distro",
      ]);
      const ciUnit = devopsContent.units.find((u) => u.slug === "ci");
      const ciText = ciUnit!.lessons
        .flatMap((l) => l.exercises)
        .map((e) => `${e.promptEn ?? ""}\n${"explanationEn" in e ? (e.explanationEn ?? "") : ""}`)
        .join("\n")
        .toLowerCase();
      expect(ciText).not.toContain("production");
      expect(ciText).not.toContain("deploy to");
      for (const ex of collectExercises(devopsContent)) {
        if (ex.type === "comprehension") {
          expect(ex.passage.trim().length).toBeGreaterThan(0);
          expect(ex.questions.length).toBeGreaterThan(0);
          for (const question of ex.questions) {
            expect(question.q.trim().length).toBeGreaterThan(0);
            expect(question.qEn?.trim().length).toBeGreaterThan(0);
            expect(question.correctIndex).toBeGreaterThanOrEqual(0);
            expect(question.correctIndex).toBeLessThan(question.options.length);
          }
        }
        if (ex.type === "code_order") {
          expect(ex.lines.length).toBe(ex.correct.length);
          expect([...ex.lines].sort()).toEqual([...ex.correct].sort());
        }
        if (ex.type === "mcq" || ex.type === "code_read" || ex.type === "code_output") {
          expect(ex.correctIndex).toBeGreaterThanOrEqual(0);
          expect(ex.correctIndex).toBeLessThan(
            (ex.type === "code_output" ? ex.options?.length : ex.options.length) ?? 0,
          );
        }
        if (ex.type === "match") {
          const rights = ex.pairs.map((p) => p.right);
          expect(new Set(rights).size).toBe(rights.length);
        }
      }
    });

    it("embedded_cpp volume", () => {
      expect(embeddedCppContent.units.length).toBeGreaterThanOrEqual(14);
      const lessons = embeddedCppContent.units.flatMap((u) => u.lessons);
      expect(lessons.length).toBeGreaterThanOrEqual(55);
      const exams = lessons.filter((l) => l.isExam);
      expect(exams.length).toBeGreaterThanOrEqual(14);
      for (const e of exams) {
        expect(e.exercises.length).toBeGreaterThanOrEqual(6);
      }
      expect(lessons.some((l) => l.isFree)).toBe(true);
      const slugs = embeddedCppContent.units.map((u) => u.slug);
      expect(slugs).toContain("miltech-intro");
      expect(slugs).toContain("miltech-checkpoint");
      expect(slugs).toContain("embedded-rtos");
      expect(slugs).toContain("uav-stack");
      expect(slugs).toContain("safety-reliability");
      expect(slugs).toContain("datalink-ops");
      expect(slugs).toContain("mission-autonomy");
      expect(slugs).toContain("systems-capstone");
      const allEx = collectExercises(embeddedCppContent);
      expect(allEx.filter((e) => e.type === "code_run").length).toBeGreaterThanOrEqual(15);
      expect(allEx.filter((e) => e.type === "code_project").length).toBeGreaterThanOrEqual(3);
    });
  });

  it("typescript course has units, lessons, and exams", () => {
    expect(typescriptContent.units.length).toBeGreaterThanOrEqual(6);
    const lessons = typescriptContent.units.flatMap((u) => u.lessons);
    expect(lessons.length).toBeGreaterThanOrEqual(15);
    const exams = lessons.filter((l) => l.isExam);
    expect(exams.length).toBeGreaterThanOrEqual(6);
    for (const e of exams) {
      expect(e.exercises.length).toBeGreaterThanOrEqual(4);
      expect(e.passThreshold ?? 0.7).toBeGreaterThanOrEqual(0.7);
    }
  });

  it("programming units have control exams", () => {
    for (const u of programmingContent.units) {
      const exam = u.lessons.find((l) => l.isExam);
      expect(exam).toBeTruthy();
      expect(exam!.exercises.length).toBeGreaterThanOrEqual(4);
    }
  });

  it("each course has units and lessons", () => {
    for (const c of courses) {
      expect(c.units.length).toBeGreaterThan(0);
      expect(c.titleUk.length).toBeGreaterThan(0);
      expect(c.titleEn.length).toBeGreaterThan(0);
      for (const u of c.units) {
        expect(u.lessons.length).toBeGreaterThan(0);
        expect(u.slug).toBeTruthy();
      }
    }
  });

  it("lesson slugs are unique within a course", () => {
    for (const c of courses) {
      const slugs = c.units.flatMap((u) => u.lessons.map((l) => l.slug));
      expect(new Set(slugs).size).toBe(slugs.length);
    }
  });

  it("exercise ids are unique within a course", () => {
    for (const c of courses) {
      const ids = collectExercises(c).map((e) => e.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it("every exercise has a known type and id", () => {
    for (const c of courses) {
      for (const ex of collectExercises(c)) {
        expect(ex.id).toBeTruthy();
        expect(EXERCISE_TYPES.has(ex.type)).toBe(true);
      }
    }
  });

  it("EN gate: course / unit / lesson titles have titleEn", () => {
    for (const c of courses) {
      expect(c.titleEn.trim().length).toBeGreaterThan(0);
      for (const u of c.units) {
        expect(u.titleEn?.trim().length ?? 0).toBeGreaterThan(0);
        for (const l of u.lessons) {
          expect(l.titleEn?.trim().length ?? 0).toBeGreaterThan(0);
        }
      }
    }
  });

  it("EN gate: all course exercises with promptUk have promptEn", () => {
    for (const c of courses) {
      for (const ex of collectExercises(c)) {
        if (ex.promptUk?.trim()) {
          expect(
            (ex as { promptEn?: string }).promptEn?.trim().length ?? 0,
            `${c.slug}/${ex.id}`,
          ).toBeGreaterThan(0);
        }
      }
    }
  });

  it("mcq / logic / code_read have valid correctIndex", () => {
    for (const c of courses) {
      for (const ex of collectExercises(c)) {
        if (ex.type === "mcq" || ex.type === "logic_puzzle" || ex.type === "code_read") {
          expect(ex.options.length).toBeGreaterThan(1);
          expect(ex.correctIndex).toBeGreaterThanOrEqual(0);
          expect(ex.correctIndex).toBeLessThan(ex.options.length);
        }
        if (ex.type === "code_output" && ex.options) {
          expect(ex.correctIndex).toBeGreaterThanOrEqual(0);
          expect(ex.correctIndex!).toBeLessThan(ex.options.length);
        }
      }
    }
  });

  it("typing lessons include text", () => {
    const typing = collectExercises(typingContent).filter((e) => e.type === "typing");
    expect(typing.length).toBeGreaterThan(10);
    for (const t of typing) {
      if (t.type === "typing") expect(t.text.length).toBeGreaterThan(0);
    }
  });

  it("english has free lessons for freemium", () => {
    const free = englishContent.units.flatMap((u) => u.lessons).filter((l) => l.isFree);
    expect(free.length).toBeGreaterThanOrEqual(5);
  });

  it("all lessons accessible: every course has at least 5 lessons", () => {
    const MIN_LESSONS = 5;
    for (const c of courses) {
      const all = c.units.flatMap((u) => u.lessons);
      expect(all.length, `${c.slug} lessons`).toBeGreaterThanOrEqual(MIN_LESSONS);
    }
  });

  it("help surface: free-path drills expose hint or explanation", () => {
    const CODE_DRILLS = new Set(["code_fill", "code_run", "code_project", "code_output"]);
    const LANG_DRILLS = new Set(["fill_blank", "translate", "mcq"]);

    function hasHelp(e: Exercise): boolean {
      const x = e as {
        hints?: unknown;
        hintUk?: string;
        hintEn?: string;
        explanationUk?: string;
        explanationEn?: string;
        promptUk?: string;
        promptEn?: string;
      };
      return Boolean(
        (Array.isArray(x.hints) && x.hints.length > 0) ||
          x.hintUk ||
          x.hintEn ||
          x.explanationUk ||
          x.explanationEn ||
          (x.promptUk && x.promptEn),
      );
    }

    // Programming free path: code drills with bilingual prompt and/or explanation
    {
      const freeLessons = programmingContent.units
        .flatMap((u) => u.lessons)
        .filter((l) => l.isFree && !l.isExam);
      const drills = freeLessons.flatMap((l) => l.exercises).filter((e) => CODE_DRILLS.has(e.type));
      expect(drills.length).toBeGreaterThan(0);
      const withHelp = drills.filter(hasHelp);
      expect(withHelp.length / drills.length).toBeGreaterThanOrEqual(0.5);
      // At least some free code drills have post-answer explanation (deeper help)
      const withExplain = drills.filter(
        (e) =>
          Boolean((e as { explanationUk?: string }).explanationUk) ||
          Boolean((e as { hintUk?: string }).hintUk),
      );
      expect(withExplain.length).toBeGreaterThanOrEqual(3);
    }

    // English free path: bilingual prompts on language drills
    {
      const freeLessons = englishContent.units
        .flatMap((u) => u.lessons)
        .filter((l) => l.isFree && !l.isExam)
        .slice(0, 5);
      const drills = freeLessons.flatMap((l) => l.exercises).filter((e) => LANG_DRILLS.has(e.type));
      expect(drills.length).toBeGreaterThan(0);
      expect(drills.filter(hasHelp).length / drills.length).toBeGreaterThanOrEqual(0.5);
    }
  });

  it("core freemium path lessons have bilingual titles and ≥1 exercise", () => {
    for (const slug of ["english", "programming", "chess"] as const) {
      const c = courses.find((x) => x.slug === slug)!;
      const free = c.units
        .flatMap((u) => u.lessons)
        .filter((l) => l.isFree)
        .slice(0, 5);
      expect(free.length).toBeGreaterThanOrEqual(5);
      for (const l of free) {
        expect(l.titleUk.trim().length).toBeGreaterThan(0);
        expect(l.titleEn?.trim().length ?? 0).toBeGreaterThan(0);
        expect(l.exercises.length).toBeGreaterThan(0);
      }
    }
  });

  it("typing has EN unit titles and daily-drills unit", () => {
    expect(typingContent.units.some((u) => u.slug === "daily-drills")).toBe(true);
    expect(typingContent.units[0]!.titleEn).toBe("Home row");
    for (const u of typingContent.units) {
      expect(u.titleEn?.trim().length ?? 0).toBeGreaterThan(0);
    }
  });

  it("programming includes map/filter free lesson", () => {
    const lessons = programmingContent.units.flatMap((u) => u.lessons);
    const map = lessons.find((l) => l.slug === "js-map-filter");
    expect(map).toBeTruthy();
    expect(map!.isFree).toBe(true);
    expect(map!.exercises.length).toBeGreaterThanOrEqual(3);
  });

  it("sql includes NULL coalesce lesson", () => {
    const lessons = sqlFundamentalsContent.units.flatMap((u) => u.lessons);
    expect(lessons.some((l) => l.slug === "sqlf-null-coalesce")).toBe(true);
  });

  it("english meetings unit + node/express practice lessons", () => {
    expect(englishContent.units.some((u) => u.slug === "meetings-phone")).toBe(true);
    const nodeLessons = nodeFundamentalsContent.units.flatMap((u) => u.lessons);
    expect(nodeLessons.some((l) => l.slug === "nf-json-errors")).toBe(true);
    expect(expressFundamentalsContent.units.some((u) => u.slug === "json-body")).toBe(true);
    const jsonUnit = expressFundamentalsContent.units.find((u) => u.slug === "json-body")!;
    expect(jsonUnit.lessons.some((l) => l.isExam)).toBe(true);
  });

  it("wave 169 free practice lessons exist", () => {
    const ts = typescriptContent.units.flatMap((u) => u.lessons);
    expect(ts.some((l) => l.slug === "tsc-pick-required" && l.isFree)).toBe(true);
    const qa = qaTheoryContent.units.flatMap((u) => u.lessons);
    expect(qa.some((l) => l.slug === "qt-df-report-practice" && l.isFree)).toBe(true);
    const css = cssLayoutContent.units.flatMap((u) => u.lessons);
    expect(css.some((l) => l.slug === "cl-flex-gap-center" && l.isFree)).toBe(true);
  });

  it("wave 170 free lessons + flashcard decks", () => {
    const chessLessons = chessContent.units.flatMap((u) => u.lessons);
    expect(chessLessons.some((l) => l.slug === "opposition-basics" && l.isFree)).toBe(true);
    const logicLessons = logicContent.units.flatMap((u) => u.lessons);
    expect(logicLessons.some((l) => l.slug === "ded-0" && l.isFree)).toBe(true);
    const htmlLessons = htmlSemanticsContent.units.flatMap((u) => u.lessons);
    expect(htmlLessons.some((l) => l.slug === "hs-doc-semantics-intro" && l.isFree)).toBe(true);
    expect(FLASHCARD_DECKS.some((d) => d.slug === "english-meetings")).toBe(true);
    expect(FLASHCARD_DECKS.some((d) => d.slug === "sql-oracle-071")).toBe(true);
  });

  it("exercise types include only known set (no silent unknown)", () => {
    for (const c of courses) {
      for (const ex of collectExercises(c)) {
        expect(EXERCISE_TYPES.has(ex.type), `${c.slug}/${ex.id} type=${ex.type}`).toBe(
          true,
        );
      }
    }
  });

  it("chess puzzles include fen + solution", () => {
    const puzzles = collectExercises(chessContent).filter((e) => e.type === "chess_puzzle");
    expect(puzzles.length).toBeGreaterThan(0);
    for (const p of puzzles) {
      if (p.type === "chess_puzzle") {
        expect(p.fen.split(" ").length).toBeGreaterThanOrEqual(4);
        expect(p.solutionSans.length).toBeGreaterThan(0);
      }
    }
  });

  it("programming path has expected units and volume", () => {
    const slugs = programmingContent.units.map((u) => u.slug);
    expect(slugs).toEqual([...PROGRAMMING_UNIT_ORDER]);
    const lessons = programmingContent.units.flatMap((u) => u.lessons);
    expect(lessons.length).toBeGreaterThanOrEqual(20);
    const free = lessons.filter((l) => l.isFree);
    expect(free.length).toBeGreaterThanOrEqual(5);
    const codeEx = collectExercises(programmingContent).filter((e) =>
      ["code_read", "code_output", "code_fill", "code_order", "code_project"].includes(
        e.type,
      ),
    );
    expect(codeEx.length).toBeGreaterThan(10);
  });

  it("code_fill exercises have accepted answers", () => {
    for (const ex of collectExercises(programmingContent)) {
      if (ex.type === "code_fill") {
        expect(ex.accepted.length).toBeGreaterThan(0);
        expect(ex.code.includes("___") || ex.code.length > 0).toBe(true);
      }
      if (ex.type === "code_order") {
        expect(ex.lines.length).toBe(ex.correct.length);
        expect(ex.correct.length).toBeGreaterThan(1);
      }
      if (ex.type === "code_project") {
        expect(ex.files.length).toBeGreaterThanOrEqual(2);
        expect(ex.checks.length).toBeGreaterThan(0);
        for (const ch of ex.checks) {
          expect(ex.files.some((f) => f.id === ch.fileId)).toBe(true);
          expect(ch.contains.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it("includes several code_project mini lessons", () => {
    const projects = collectExercises(programmingContent).filter(
      (e) => e.type === "code_project",
    );
    expect(projects.length).toBeGreaterThanOrEqual(6);
    const lessons = programmingContent.units.flatMap((u) => u.lessons);
    const miniSlugs = lessons
      .filter((l) => l.slug.includes("mini"))
      .map((l) => l.slug);
    expect(miniSlugs).toEqual(expect.arrayContaining([...PROGRAMMING_MINI_SLUGS]));
    expect(miniSlugs.length).toBeGreaterThanOrEqual(PROGRAMMING_MINI_SLUGS.length);
  });

  it("full-stack curriculum expansion: 7 new courses + unit counts + exams + free lessons + ForgeBoard milestones", () => {
    const expectedNew: Array<[CourseContent, number, string]> = [
      [softwareTestingContent, 6, "st-forgeboard-suite-lab"],
      [postgresqlAppsContent, 6, "pg-forgeboard-db-lab"],
      [gitWorkflowsContent, 5, "gw-forgeboard-conflict-lab"],
      [webSecurityContent, 6, "ws-forgeboard-security-lab"],
      [aiDevelopmentContent, 6, "ai-forgeboard-review-lab"],
      [nextjsFullstackContent, 7, "nx-forgeboard-app-lab"],
      [appliedAlgorithmsContent, 6, "aa-forgeboard-perf-lab"],
    ];
    for (const [course, unitCount, labSlug] of expectedNew) {
      expect(course.units.length, course.slug).toBe(unitCount);
      for (const u of course.units) {
        expect(u.lessons.some((l) => l.isExam), `${course.slug}/${u.slug}`).toBe(true);
      }
      const allLessons = course.units.flatMap((u) => u.lessons);
      expect(
        allLessons.filter((l) => l.isFree && !l.isExam).length,
        `${course.slug} free non-exam`,
      ).toBeGreaterThanOrEqual(5);
      expect(allLessons.some((l) => l.slug === labSlug && !l.isExam), `${course.slug}/${labSlug}`).toBe(
        true,
      );
    }

    const expectedExistingLabs: Array<[CourseContent, string]> = [
      [htmlSemanticsContent, "hs-forgeboard-a11y-lab"],
      [jsFundamentalsContent, "jsf-forgeboard-board-lab"],
      [typescriptContent, "tsc-forgeboard-models-lab"],
      [reactFundamentalsContent, "rf-forgeboard-client-lab"],
      [expressFundamentalsContent, "ef-forgeboard-api-lab"],
      [devopsContent, "do-forgeboard-delivery-lab"],
    ];
    for (const [course, labSlug] of expectedExistingLabs) {
      const allLessons = course.units.flatMap((u) => u.lessons);
      expect(allLessons.some((l) => l.slug === labSlug && !l.isExam), `${course.slug}/${labSlug}`).toBe(
        true,
      );
    }
  });

  it("AI skills stack: 5 deep tracks + ai_coder_control unit integrity", () => {
    const expectedAiTracks: Array<[CourseContent, number]> = [
      [pythonForAiContent, 6],
      [agenticSystemsContent, 6],
      [llmopsContent, 6],
      [aiSecurityContent, 6],
      [aiProductContent, 5],
    ];
    for (const [course, unitCount] of expectedAiTracks) {
      expect(course.units.length, course.slug).toBe(unitCount);
      for (const u of course.units) {
        expect(u.lessons.filter((l) => !l.isExam).length, `${course.slug}/${u.slug} non-exam`).toBe(2);
        expect(u.lessons.filter((l) => l.isExam).length, `${course.slug}/${u.slug} exam`).toBe(1);
      }
      const allLessons = course.units.flatMap((u) => u.lessons);
      expect(
        allLessons.filter((l) => l.isFree && !l.isExam).length,
        `${course.slug} free non-exam`,
      ).toBeGreaterThanOrEqual(5);
      for (const ex of collectExercises(course)) {
        if (ex.type === "code_order") {
          expect(ex.lines.length, `${course.slug}/${ex.id}`).toBe(ex.correct.length);
          expect([...ex.lines].sort(), `${course.slug}/${ex.id}`).toEqual([...ex.correct].sort());
        }
        if (ex.type === "match") {
          const rights = ex.pairs.map((p) => p.right);
          expect(new Set(rights).size, `${course.slug}/${ex.id}`).toBe(rights.length);
        }
        if (ex.type === "code_fill") {
          expect(ex.accepted.length, `${course.slug}/${ex.id}`).toBeGreaterThan(0);
          expect(ex.code.includes("___"), `${course.slug}/${ex.id}`).toBe(true);
        }
      }
    }

    const coderControlUnit = aiDevelopmentContent.units.find((u) => u.slug === "ai_coder_control");
    expect(coderControlUnit).toBeTruthy();
    expect(coderControlUnit!.lessons.filter((l) => !l.isExam)).toHaveLength(2);
    expect(coderControlUnit!.lessons.filter((l) => l.isExam)).toHaveLength(1);
  });
});
