import type { CourseContent, Exercise } from "./types.js";
import {
  codeFill,
  codeOrder,
  codeRead,
  exam,
  lesson,
  matchEx,
  mcq,
  unit,
} from "./builders.js";

const intro = unit("intro", "React intro", "React intro", [
  lesson(
    "rf-what",
    "Що таке React",
    "What is React",
    1,
    true,
    [
      mcq(
        "rf-i1",
        "React — це:",
        "React is:",
        ["бібліотека для UI (компоненти)", "SQL ORM", "CSS framework", "OS kernel"],
        0,
      ),
      mcq(
        "rf-i2",
        "Основна ідея:",
        "Core idea:",
        ["UI = f(state) через компоненти", "тільки jQuery selectors", "тільки SSR without components", "PHP templates only"],
        0,
      ),
      codeFill("rf-i3", "import React", "import React", "tsx", "import { useState } from '___';", ["react"], true),
    ],
  ),
  lesson(
    "rf-jsx",
    "JSX basics",
    "JSX basics",
    1,
    true,
    [
      mcq(
        "rf-i4",
        "JSX виглядає як:",
        "JSX looks like:",
        ["HTML-подібний синтаксис у JS", "чистий CSS", "SQL", "YAML only"],
        0,
      ),
      codeFill("rf-i5", "className", "className", "tsx", "<div ___=\"card\">", ["className"], true),
      codeRead(
        "rf-i6",
        "Один root?",
        "One root?",
        "tsx",
        "return (<><h1>A</h1><p>B</p></>);",
        ["OK with Fragment", "illegal always", "needs table", "needs CSS"],
        0,
      ),
    ],
  ),
  exam("rf-intro-exam", "Контрольна: intro", "Exam: intro", 1, [
    mcq("rf-ie1", "React is:", "React is:", ["UI library", "database", "CDN", "IDE"], 0),
    codeFill("rf-ie2", "from react", "from react", "tsx", "import { useState } from '___';", ["react"], true),
    codeFill("rf-ie3", "className", "className", "tsx", "<p ___=\"t\">", ["className"], true),
    mcq("rf-ie4", "JSX:", "JSX:", ["syntax sugar for elements", "SQL dialect", "HTTP verb", "git command"], 0),
  ]),
]);

const components = unit("components", "Components", "Components", [
  lesson(
    "rf-fn-comp",
    "Function components",
    "Function components",
    2,
    false,
    [
      codeFill(
        "rf-c1",
        "export function",
        "export function",
        "tsx",
        "export ___ Hello() { return <h1>Hi</h1>; }",
        ["function"],
        true,
      ),
      mcq(
        "rf-c2",
        "Component name convention:",
        "Component name convention:",
        ["PascalCase", "snake_case only", "kebab-case required", "ALLCAPS"],
        0,
      ),
      codeOrder(
        "rf-c3",
        "Simple component",
        "Simple component",
        "tsx",
        ["}", "export function Title() {", "return <h1>EduForge</h1>;"],
        ["export function Title() {", "return <h1>EduForge</h1>;", "}"],
      ),
    ],
  ),
  lesson(
    "rf-props",
    "Props",
    "Props",
    2,
    false,
    [
      mcq(
        "rf-c4",
        "Props — це:",
        "Props are:",
        ["вхідні дані компонента (read-only)", "local mutable state only", "CSS files", "SQL rows"],
        0,
      ),
      codeFill(
        "rf-c5",
        "props.name",
        "props.name",
        "tsx",
        "function Hi(props: { name: string }) { return <p>{props.___}</p>; }",
        ["name"],
        true,
      ),
      codeFill(
        "rf-c6",
        "destructure props",
        "destructure props",
        "tsx",
        "function Hi({ ___ }: { name: string }) { return <p>{name}</p>; }",
        ["name"],
        true,
      ),
    ],
  ),
  exam("rf-comp-exam", "Контрольна: components", "Exam: components", 2, [
    mcq("rf-ce1", "Props are:", "Props are:", ["inputs to component", "global CSS", "DB keys", "ports"], 0),
    codeFill("rf-ce2", "function component", "function component", "tsx", "export ___ Card() { return null; }", ["function"], true),
    mcq("rf-ce3", "PascalCase for:", "PascalCase for:", ["components", "CSS only", "SQL tables only", "env vars only"], 0),
    codeFill("rf-ce4", "props field", "props field", "tsx", "function A({ title }: { title: string }) { return <h1>{___}</h1>; }", ["title"], true),
  ]),
]);

const stateU = unit("state", "State", "State", [
  lesson(
    "rf-useState",
    "useState",
    "useState",
    2,
    false,
    [
      codeFill(
        "rf-s1",
        "useState import usage",
        "useState import usage",
        "tsx",
        "const [n, setN] = ___(0);",
        ["useState"],
        true,
      ),
      mcq(
        "rf-s2",
        "setState is:",
        "setState is:",
        ["async schedule of re-render", "sync DOM mutation only", "SQL update", "git commit"],
        0,
      ),
      codeRead(
        "rf-s3",
        "Правильний інкремент?",
        "Correct increment?",
        "tsx",
        "setN(n => n + 1)",
        ["OK functional update", "illegal", "needs class", "needs Redux"],
        0,
      ),
    ],
  ),
  lesson(
    "rf-events",
    "Events",
    "Events",
    2,
    false,
    [
      codeFill(
        "rf-s4",
        "onClick",
        "onClick",
        "tsx",
        "<button ___={() => setN(n + 1)}>Inc</button>",
        ["onClick"],
        true,
      ),
      mcq(
        "rf-s5",
        "Synthetic events:",
        "Synthetic events:",
        ["React wraps browser events", "native only without React", "SQL triggers", "WebSocket frames"],
        0,
      ),
    ],
  ),
  exam("rf-state-exam", "Контрольна: state", "Exam: state", 2, [
    codeFill("rf-se1", "useState", "useState", "tsx", "const [x, setX] = ___(false);", ["useState"], true),
    codeFill("rf-se2", "onClick", "onClick", "tsx", "<button ___={fn}>", ["onClick"], true),
    mcq("rf-se3", "State change triggers:", "State change triggers:", ["re-render", "page reload always", "SQL dump", "DNS flush"], 0),
    mcq("rf-se4", "Props vs state:", "Props vs state:", ["props in, state owned", "same always", "state from parent only never local", "props mutable by child always recommended"], 0),
  ]),
]);

const lists = unit("lists", "Lists & keys", "Lists & keys", [
  lesson(
    "rf-map",
    "Rendering lists",
    "Rendering lists",
    2,
    false,
    [
      codeFill(
        "rf-l1",
        "map items",
        "map items",
        "tsx",
        "items.___(x => <li key={x.id}>{x.name}</li>)",
        ["map"],
        true,
      ),
      mcq(
        "rf-l2",
        "key prop потрібен для:",
        "key prop is for:",
        ["стабільної ідентифікації елементів у reconciliation", "CSS only", "SEO only", "HTTP cache only"],
        0,
      ),
      codeRead(
        "rf-l3",
        "key={index} — ризик?",
        "key={index} risk?",
        "tsx",
        "list.map((x, i) => <Row key={i} />)",
        ["може ламатись при reorder", "завжди ідеально", "illegal syntax", "needs class"],
        0,
      ),
    ],
  ),
  exam("rf-lists-exam", "Контрольна: lists", "Exam: lists", 2, [
    codeFill("rf-le1", "map", "map", "tsx", "xs.___(…)", ["map"], true),
    mcq("rf-le2", "key should be:", "key should be:", ["stable unique id", "random each render ideal", "missing always", "CSS class"], 0),
    mcq("rf-le3", "Without keys:", "Without keys:", ["warnings / bad updates", "faster always", "no JSX", "server crash always"], 0),
    codeFill("rf-le4", "key attr", "key attr", "tsx", "<Item ___={id} />", ["key"], true),
  ]),
]);

const effects = unit("effects", "Effects", "Effects", [
  lesson(
    "rf-useEffect",
    "useEffect intro",
    "useEffect intro",
    3,
    false,
    [
      codeFill(
        "rf-e1",
        "useEffect",
        "useEffect",
        "tsx",
        "___(() => { /* side effect */ }, []);",
        ["useEffect"],
        true,
      ),
      mcq(
        "rf-e2",
        "[] deps означає:",
        "[] deps means:",
        ["run after mount (once)", "run every render", "never run", "SQL only"],
        0,
      ),
      mcq(
        "rf-e3",
        "Cleanup return:",
        "Cleanup return:",
        ["unsubscribe/timers on unmount/update", "forces SSR", "deletes component file", "git reset"],
        0,
      ),
    ],
  ),
  lesson(
    "rf-effect-deps",
    "Dependency array",
    "Dependency array",
    3,
    false,
    [
      mcq(
        "rf-e4",
        "Missing deps risk:",
        "Missing deps risk:",
        ["stale closures / bugs", "faster types", "better SEO always", "free Premium"],
        0,
      ),
      codeRead(
        "rf-e5",
        "Effect with [id]:",
        "Effect with [id]:",
        "tsx",
        "useEffect(() => { load(id); }, [id]);",
        ["re-runs when id changes", "never runs", "runs only on CSS change", "throws"],
        0,
      ),
    ],
  ),
  exam("rf-fx-exam", "Контрольна: effects", "Exam: effects", 3, [
    codeFill("rf-ee1", "useEffect", "useEffect", "tsx", "___(() => {}, []);", ["useEffect"], true),
    mcq("rf-ee2", "Empty deps:", "Empty deps:", ["mount once", "every keystroke", "never", "build only"], 0),
    mcq("rf-ee3", "Cleanup:", "Cleanup:", ["return function", "throw error", "delete state", "await CSS"], 0),
    mcq("rf-ee4", "Side effects belong in:", "Side effects belong in:", ["effects / event handlers", "render pure body only always network", "import time only", "CSS"], 0),
  ]),
]);

const forms = unit("forms", "Controlled inputs", "Controlled inputs", [
  lesson(
    "rf-controlled",
    "value + onChange",
    "value + onChange",
    2,
    false,
    [
      codeFill(
        "rf-f1",
        "value binding",
        "value binding",
        "tsx",
        "<input ___={text} onChange={e => setText(e.target.value)} />",
        ["value"],
        true,
      ),
      mcq(
        "rf-f2",
        "Controlled input:",
        "Controlled input:",
        ["React state is source of truth", "DOM only never state", "SQL triggers", "localStorage only"],
        0,
      ),
      codeFill(
        "rf-f3",
        "onChange",
        "onChange",
        "tsx",
        "<input value={v} ___={handler} />",
        ["onChange"],
        true,
      ),
    ],
  ),
  exam("rf-forms-exam", "Контрольна: forms", "Exam: forms", 2, [
    codeFill("rf-fe1", "value", "value", "tsx", "<input ___={x} onChange={…} />", ["value"], true),
    codeFill("rf-fe2", "onChange", "onChange", "tsx", "<input value={x} ___={…} />", ["onChange"], true),
    mcq("rf-fe3", "e.target.value:", "e.target.value:", ["current input string", "CSS color", "HTTP status", "file path always"], 0),
    mcq("rf-fe4", "Controlled means:", "Controlled means:", ["state drives UI", "uncontrolled default always better for all forms", "no events", "no JSX"], 0),
  ]),
]);

const composition = unit("composition", "Composition", "Composition", [
  lesson(
    "rf-children",
    "children prop",
    "children prop",
    2,
    false,
    [
      mcq(
        "rf-co1",
        "children дозволяє:",
        "children allows:",
        ["вкладений контент між тегами компонента", "only CSS inheritance", "SQL joins", "git submodules"],
        0,
      ),
      codeFill(
        "rf-co2",
        "children type",
        "children type",
        "tsx",
        "function Box({ children }: { children: React.___ }) { return <div>{children}</div>; }",
        ["ReactNode", "Node"],
        false,
      ),
      matchEx(
        "rf-co3",
        "Patterns",
        "Patterns",
        [
          { left: "props", right: "configure component" },
          { left: "children", right: "nest content" },
          { left: "state", right: "local interactive data" },
        ],
      ),
    ],
  ),
  exam("rf-comp-exam2", "Контрольна: composition", "Exam: composition", 2, [
    mcq("rf-coe1", "children is:", "children is:", ["nested content", "HTTP body only", "CSS grid only", "DB column"], 0),
    mcq("rf-coe2", "Composition over:", "Composition over:", ["deep inheritance trees", "no components", "only globals", "tables for UI"], 0),
    codeFill("rf-coe3", "children render", "children render", "tsx", "return <div>{___}</div>;", ["children"], true),
    mcq("rf-coe4", "Reusable UI:", "Reusable UI:", ["small components + props", "one 2k-line file only", "no props", "inline styles only always"], 0),
  ]),
]);

const capstone = unit("capstone", "Capstone", "Capstone", [
  lesson(
    "rf-capstone-toggle",
    "Mini: toggle component",
    "Mini: toggle component",
    3,
    false,
    [
      {
        id: "rf-cap1",
        type: "code_project",
        promptUk:
          "React: function Toggle() з useState, button показує On/Off. README: state.",
        promptEn:
          "React: function Toggle() with useState, button shows On/Off. README: state.",
        files: [
          {
            id: "tsx",
            name: "Toggle.tsx",
            language: "tsx",
            starter: `// TODO: useState + button On/Off
export function Toggle() {
  return null;
}
`,
          },
          {
            id: "md",
            name: "README.md",
            language: "markdown",
            starter: `# Toggle
<!-- state -->
`,
          },
        ],
        checks: [
          {
            fileId: "tsx",
            contains: ["useState", "function Toggle", "button", "On", "Off"],
          },
          { fileId: "md", contains: ["state"] },
        ],
      } as Exercise,
    ],
  ),
  exam("rf-cap-exam", "Фінальна контрольна React", "Final React exam", 3, [
    mcq("rf-cae1", "React is:", "React is:", ["UI library", "DB", "OS", "CDN only"], 0),
    codeFill("rf-cae2", "useState", "useState", "tsx", "const [a, setA] = ___(0);", ["useState"], true),
    codeFill("rf-cae3", "onClick", "onClick", "tsx", "<button ___={fn}>", ["onClick"], true),
    codeFill("rf-cae4", "className", "className", "tsx", "<div ___=\"box\">", ["className"], true),
    mcq("rf-cae5", "key on lists:", "key on lists:", ["stable identity", "random best", "forbidden", "CSS only"], 0),
    codeFill("rf-cae6", "useEffect", "useEffect", "tsx", "___(() => {}, []);", ["useEffect"], true),
  ]),
]);

export const reactFundamentalsContent: CourseContent = {
  slug: "react_fundamentals",
  titleUk: "React: fundamentals",
  titleEn: "React Fundamentals",
  descriptionUk:
    "Компоненти, props, useState, lists/keys, useEffect, forms, composition + контрольні.",
  descriptionEn:
    "Components, props, useState, lists/keys, useEffect, forms, composition + unit exams.",
  icon: "⚛️",
  color: "#61DAFB",
  units: [intro, components, stateU, lists, effects, forms, composition, capstone],
};
