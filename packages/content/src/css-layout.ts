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

const boxFlow = unit("box-flow", "Box & flow", "Box & flow", [
  lesson(
    "cl-box-model",
    "Box model",
    "Box model",
    1,
    true,
    [
      mcq(
        "cl-b1",
        "Box model включає:",
        "Box model includes:",
        ["content + padding + border + margin", "лише font-size", "лише z-index", "SQL columns"],
        0,
      ),
      codeFill(
        "cl-b2",
        "box-sizing border-box",
        "box-sizing border-box",
        "css",
        "box-sizing: ___;",
        ["border-box"],
        true,
      ),
      mcq(
        "cl-b3",
        "display: block означає:",
        "display: block means:",
        ["елемент на весь рядок flow", "inline always", "grid only", "hidden"],
        0,
      ),
    ],
  ),
  lesson(
    "cl-display",
    "display values",
    "display values",
    1,
    true,
    [
      matchEx(
        "cl-b4",
        "display",
        "display",
        [
          { left: "flex", right: "flex formatting context" },
          { left: "grid", right: "grid formatting context" },
          { left: "none", right: "not rendered" },
        ],
      ),
      codeFill(
        "cl-b5",
        "Увімкнути flex container",
        "Enable flex container",
        "css",
        "display: ___;",
        ["flex"],
        true,
      ),
    ],
  ),
  exam("cl-box-exam", "Контрольна: box", "Exam: box", 1, [
    mcq("cl-be1", "padding is:", "padding is:", ["inside border", "outside margin only", "SQL", "git"], 0),
    codeFill("cl-be2", "border-box", "border-box", "css", "box-sizing: ___;", ["border-box"], true),
    codeFill("cl-be3", "display flex", "display flex", "css", "display: ___;", ["flex"], true),
    mcq("cl-be4", "margin is:", "margin is:", ["outside border", "font property", "ARIA", "doctype"], 0),
  ]),
]);

const flexCore = unit("flex-core", "Flex core", "Flex core", [
  lesson(
    "cl-flex-container",
    "Flex container",
    "Flex container",
    2,
    false,
    [
      codeFill(
        "cl-f1",
        "flex container",
        "flex container",
        "css",
        ".row { display: ___; }",
        ["flex"],
        true,
      ),
      mcq(
        "cl-f2",
        "Діти flex container стають:",
        "Children of a flex container become:",
        ["flex items", "grid areas only", "floats always", "absolute only"],
        0,
      ),
      codeFill(
        "cl-f3",
        "direction row",
        "direction row",
        "css",
        "flex-direction: ___;",
        ["row"],
        true,
      ),
    ],
  ),
  lesson(
    "cl-flex-wrap",
    "wrap і gap",
    "wrap & gap",
    2,
    false,
    [
      codeFill(
        "cl-f4",
        "Дозволити перенос",
        "Allow wrapping",
        "css",
        "flex-wrap: ___;",
        ["wrap"],
        true,
      ),
      codeFill(
        "cl-f5",
        "gap між items",
        "gap between items",
        "css",
        "gap: ___px;",
        ["16", "1rem", "8"],
        false,
      ),
      mcq(
        "cl-f6",
        "nowrap означає:",
        "nowrap means:",
        ["items в одному рядку", "завжди column", "display none", "grid only"],
        0,
      ),
    ],
  ),
  lesson(
    "cl-flex-justify-align",
    "justify & align",
    "justify & align",
    2,
    false,
    [
      codeFill(
        "cl-f7",
        "По головній осі (row): центр",
        "Main axis center (row)",
        "css",
        "justify-content: ___;",
        ["center"],
        true,
      ),
      codeFill(
        "cl-f8",
        "По поперечній: центр",
        "Cross axis center",
        "css",
        "align-items: ___;",
        ["center"],
        true,
      ),
      matchEx(
        "cl-f9",
        "Властивості",
        "Properties",
        [
          { left: "justify-content", right: "main axis distribution" },
          { left: "align-items", right: "cross axis alignment" },
          { left: "flex-direction", right: "main axis direction" },
        ],
      ),
    ],
  ),
  lesson(
    "cl-flex-space",
    "space-between / around",
    "space-between / around",
    2,
    false,
    [
      mcq(
        "cl-f10",
        "space-between:",
        "space-between:",
        ["перший і останній по краях, простір між", "усі в центрі щільно", "column only", "absolute"],
        0,
      ),
      codeFill(
        "cl-f11",
        "space-between",
        "space-between",
        "css",
        "justify-content: ___;",
        ["space-between"],
        true,
      ),
    ],
  ),
  lesson(
    "cl-flex-gap-center",
    "gap & centering",
    "gap & centering",
    2,
    true,
    [
      codeFill(
        "cl-fg1",
        "gap",
        "gap",
        "css",
        ".row { display: flex; ___: 1rem; }",
        ["gap"],
        true,
      ),
      mcq(
        "cl-fg2",
        "gap vs margin between items:",
        "gap vs margin between items:",
        [
          "gap — простір між flex/grid items без «хвостиків»",
          "gap працює лише в tables",
          "gap = z-index",
          "gap only for fonts",
        ],
        0,
      ),
      codeFill(
        "cl-fg3",
        "center both axes",
        "center both axes",
        "css",
        "justify-content: center; align-items: ___;",
        ["center"],
        true,
      ),
      mcq(
        "cl-fg4",
        "To center one child in a flex container often use:",
        "To center one child in a flex container often use:",
        [
          "justify-content + align-items: center",
          "only float:left",
          "only position:fixed without flex",
          "table-layout only",
        ],
        0,
      ),
    ],
  ),
  exam("cl-flex-core-exam", "Контрольна: flex core", "Exam: flex core", 2, [
    codeFill("cl-fce1", "display", "display", "css", "display: ___;", ["flex"], true),
    codeFill("cl-fce2", "direction", "direction", "css", "flex-direction: ___;", ["column", "row"], false),
    codeFill("cl-fce3", "wrap", "wrap", "css", "flex-wrap: ___;", ["wrap"], true),
    codeFill("cl-fce4", "justify center", "justify center", "css", "justify-content: ___;", ["center"], true),
    codeFill("cl-fce5", "align center", "align center", "css", "align-items: ___;", ["center"], true),
  ]),
]);

const flexItems = unit("flex-items", "Flex items", "Flex items", [
  lesson(
    "cl-fi-grow",
    "flex-grow",
    "flex-grow",
    3,
    false,
    [
      mcq(
        "cl-fi1",
        "flex-grow: 1 означає:",
        "flex-grow: 1 means:",
        ["item може рости і забирати вільний простір", "ніколи не росте", "absolute position", "grid only"],
        0,
      ),
      codeFill(
        "cl-fi2",
        "grow",
        "grow",
        "css",
        "flex-grow: ___;",
        ["1"],
        true,
      ),
    ],
  ),
  lesson(
    "cl-fi-shrink-basis",
    "shrink & basis",
    "shrink & basis",
    3,
    false,
    [
      codeFill(
        "cl-fi3",
        "Не стискати",
        "Don't shrink",
        "css",
        "flex-shrink: ___;",
        ["0"],
        true,
      ),
      codeFill(
        "cl-fi4",
        "basis auto",
        "basis auto",
        "css",
        "flex-basis: ___;",
        ["auto", "0", "200px"],
        false,
      ),
      mcq(
        "cl-fi5",
        "flex: 1 часто ≈",
        "flex: 1 often ≈",
        ["grow 1 shrink 1 basis 0%", "display none", "position fixed", "float left only"],
        0,
      ),
    ],
  ),
  lesson(
    "cl-fi-align-self",
    "align-self & order",
    "align-self & order",
    3,
    false,
    [
      codeFill(
        "cl-fi6",
        "align-self end",
        "align-self end",
        "css",
        "align-self: ___;",
        ["flex-end", "end"],
        false,
      ),
      mcq(
        "cl-fi7",
        "order змінює:",
        "order changes:",
        ["візуальний порядок flex items", "HTML DOM always permanently", "SQL order by only", "git history"],
        0,
      ),
    ],
  ),
  exam("cl-fi-exam", "Контрольна: flex items", "Exam: flex items", 3, [
    codeFill("cl-fie1", "grow", "grow", "css", "flex-grow: ___;", ["1", "0"], false),
    codeFill("cl-fie2", "shrink 0", "shrink 0", "css", "flex-shrink: ___;", ["0"], true),
    mcq("cl-fie3", "flex:1 helps:", "flex:1 helps:", ["equal growth patterns", "SQL joins", "ARIA roles", "SMTP"], 0),
    codeFill("cl-fie4", "align-self", "align-self", "css", "align-self: ___;", ["center", "flex-start", "stretch"], false),
  ]),
]);

const flexRecipes = unit("flex-recipes", "Flex patterns", "Flex patterns", [
  lesson(
    "cl-fr-nav",
    "Navbar pattern",
    "Navbar pattern",
    2,
    false,
    [
      codeRead(
        "cl-fr1",
        "Типовий navbar:",
        "Typical navbar:",
        "css",
        ".nav { display:flex; justify-content:space-between; align-items:center; }",
        ["logo зліва, actions справа", "тільки grid areas required", "float only", "table layout only"],
        0,
      ),
      codeFill(
        "cl-fr2",
        "space-between nav",
        "space-between nav",
        "css",
        "justify-content: ___;",
        ["space-between"],
        true,
      ),
    ],
  ),
  lesson(
    "cl-fr-cards",
    "Card row",
    "Card row",
    2,
    false,
    [
      mcq(
        "cl-fr3",
        "Картки в ряд з переносом:",
        "Cards in a wrapping row:",
        ["flex + wrap + gap", "only position absolute", "only float without clear", "display:none"],
        0,
      ),
      codeOrder(
        "cl-fr4",
        "Мін. flex card row",
        "Min flex card row",
        "css",
        ["gap: 1rem;", "display: flex;", "flex-wrap: wrap;"],
        ["display: flex;", "flex-wrap: wrap;", "gap: 1rem;"],
      ),
    ],
  ),
  exam("cl-fr-exam", "Контрольна: flex recipes", "Exam: flex recipes", 2, [
    mcq("cl-fre1", "navbar often uses:", "navbar often uses:", ["flex + space-between", "only SQL", "only canvas", "iframe"], 0),
    codeFill("cl-fre2", "wrap", "wrap", "css", "flex-wrap: ___;", ["wrap"], true),
    codeFill("cl-fre3", "gap", "gap", "css", "gap: ___;", ["1rem", "16px", "8px"], false),
    mcq("cl-fre4", "centering a box in flex:", "centering a box in flex:", ["justify+align center", "only z-index", "only opacity", "git"], 0),
  ]),
]);

const gridCore = unit("grid-core", "Grid core", "Grid core", [
  lesson(
    "cl-g-display",
    "Grid container",
    "Grid container",
    2,
    false,
    [
      codeFill(
        "cl-g1",
        "grid container",
        "grid container",
        "css",
        "display: ___;",
        ["grid"],
        true,
      ),
      codeFill(
        "cl-g2",
        "3 equal columns",
        "3 equal columns",
        "css",
        "grid-template-columns: repeat(3, ___);",
        ["1fr"],
        true,
      ),
      mcq(
        "cl-g3",
        "fr одиниця — це:",
        "fr unit is:",
        ["частка вільного простору в grid", "font-relative only", "flex-only unit", "HTML attribute"],
        0,
      ),
    ],
  ),
  lesson(
    "cl-g-gap-minmax",
    "gap, minmax, repeat",
    "gap, minmax, repeat",
    3,
    false,
    [
      codeFill(
        "cl-g4",
        "gap",
        "gap",
        "css",
        "gap: ___;",
        ["1rem", "16px", "8px"],
        false,
      ),
      codeRead(
        "cl-g5",
        "minmax(200px, 1fr) означає:",
        "minmax(200px, 1fr) means:",
        "css",
        "grid-template-columns: repeat(3, minmax(200px, 1fr));",
        ["мін 200px, росте до 1fr", "завжди 200px fixed only", "display none", "flex-direction"],
        0,
      ),
      codeFill(
        "cl-g6",
        "repeat helper",
        "repeat helper",
        "css",
        "grid-template-columns: ___(4, 1fr);",
        ["repeat"],
        true,
      ),
    ],
  ),
  lesson(
    "cl-g-rows",
    "Rows & auto",
    "Rows & auto",
    2,
    false,
    [
      codeFill(
        "cl-g7",
        "template rows",
        "template rows",
        "css",
        "grid-template-rows: ___ 1fr;",
        ["auto", "100px", "2rem"],
        false,
      ),
      mcq(
        "cl-g8",
        "implicit rows з'являються коли:",
        "implicit rows appear when:",
        ["items виходять за явні tracks", "never in grid", "only in flex", "only with float"],
        0,
      ),
    ],
  ),
  exam("cl-grid-core-exam", "Контрольна: grid core", "Exam: grid core", 2, [
    codeFill("cl-gce1", "display grid", "display grid", "css", "display: ___;", ["grid"], true),
    codeFill("cl-gce2", "1fr", "1fr", "css", "grid-template-columns: ___ ___;", ["1fr"], false),
    codeFill("cl-gce3", "repeat", "repeat", "css", "grid-template-columns: ___(3, 1fr);", ["repeat"], true),
    mcq("cl-gce4", "fr means:", "fr means:", ["fraction of free space", "font root only", "flex ratio HTML", "SQL"], 0),
    codeFill("cl-gce5", "gap", "gap", "css", "gap: ___;", ["1rem", "8px", "16px"], false),
  ]),
]);

const gridPlacement = unit("grid-placement", "Grid placement", "Grid placement", [
  lesson(
    "cl-gp-lines",
    "Line-based placement",
    "Line-based placement",
    3,
    false,
    [
      codeFill(
        "cl-gp1",
        "column span start/end",
        "column span start/end",
        "css",
        "grid-column: 1 / ___;",
        ["3", "-1", "span 2"],
        false,
      ),
      mcq(
        "cl-gp2",
        "grid-column: span 2:",
        "grid-column: span 2:",
        ["займає 2 колонки", "display flex", "z-index 2 only", "margin 2"],
        0,
      ),
    ],
  ),
  lesson(
    "cl-gp-areas",
    "grid-template-areas",
    "grid-template-areas",
    3,
    false,
    [
      codeRead(
        "cl-gp3",
        "Named areas pattern:",
        "Named areas pattern:",
        "css",
        `.page {
  display: grid;
  grid-template-areas:
    "header header"
    "nav main"
    "footer footer";
}`,
        ["іменовані зони layout", "only flex", "only absolute", "SQL view"],
        0,
      ),
      codeFill(
        "cl-gp4",
        "area name on item",
        "area name on item",
        "css",
        "grid-area: ___;",
        ["header", "main", "nav", "footer"],
        false,
      ),
    ],
  ),
  lesson(
    "cl-gp-autofit",
    "auto-fit / auto-fill",
    "auto-fit / auto-fill",
    3,
    false,
    [
      mcq(
        "cl-gp5",
        "auto-fit з minmax часто для:",
        "auto-fit with minmax is often for:",
        ["responsive card grids без media queries", "only print CSS", "SQL pagination", "git branches"],
        0,
      ),
      codeFill(
        "cl-gp6",
        "auto-fit",
        "auto-fit",
        "css",
        "grid-template-columns: repeat(___, minmax(200px, 1fr));",
        ["auto-fit", "auto-fill"],
        false,
      ),
    ],
  ),
  exam("cl-gp-exam", "Контрольна: placement", "Exam: placement", 3, [
    codeFill("cl-gpe1", "span", "span", "css", "grid-column: ___ 2;", ["span"], true),
    codeFill("cl-gpe2", "grid-area", "grid-area", "css", "grid-area: ___;", ["main", "header", "sidebar"], false),
    mcq("cl-gpe3", "template-areas:", "template-areas:", ["name layout regions", "only fonts", "ARIA", "SMTP"], 0),
    mcq("cl-gpe4", "auto-fit helps:", "auto-fit helps:", ["responsive columns", "tsc emit", "Elo", "Docker only"], 0),
  ]),
]);

const gridResponsive = unit("grid-responsive", "Responsive grid", "Responsive grid", [
  lesson(
    "cl-gr-media",
    "Media + grid",
    "Media + grid",
    2,
    false,
    [
      codeRead(
        "cl-gr1",
        "Типовий responsive:",
        "Typical responsive:",
        "css",
        `@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}`,
        ["більше колонок на широких екранах", "завжди 1 колонка only", "disable grid", "flex forbidden"],
        0,
      ),
      codeFill(
        "cl-gr2",
        "min-width media",
        "min-width media",
        "css",
        "@media (min-width: ___px) { }",
        ["768", "640", "1024"],
        false,
      ),
    ],
  ),
  lesson(
    "cl-gr-clamp",
    "clamp intro",
    "clamp intro",
    2,
    false,
    [
      mcq(
        "cl-gr3",
        "clamp(min, preferred, max):",
        "clamp(min, preferred, max):",
        ["обмежує значення між min і max", "only colors", "SQL function only", "git command"],
        0,
      ),
      codeFill(
        "cl-gr4",
        "clamp gap-like size",
        "clamp for size",
        "css",
        "width: clamp(200px, 50%, ___);",
        ["600px", "40rem", "100%"],
        false,
      ),
    ],
  ),
  exam("cl-gr-exam", "Контрольна: responsive", "Exam: responsive", 2, [
    mcq("cl-gre1", "media queries adjust:", "media queries adjust:", ["layout by viewport", "SQL schema", "git remotes", "SMTP"], 0),
    codeFill("cl-gre2", "repeat fr", "repeat fr", "css", "grid-template-columns: repeat(2, ___);", ["1fr"], true),
    mcq("cl-gre3", "clamp:", "clamp:", ["min/pref/max", "only display", "only position", "ARIA"], 0),
    codeFill("cl-gre4", "auto-fit", "auto-fit", "css", "repeat(___, minmax(12rem, 1fr))", ["auto-fit", "auto-fill"], false),
  ]),
]);

const chooseTool = unit("choose-tool", "Flex vs Grid", "Flex vs Grid", [
  lesson(
    "cl-ct-when",
    "Коли що обирати",
    "When to choose what",
    2,
    false,
    [
      mcq(
        "cl-ct1",
        "Flex найкращий для:",
        "Flex is best for:",
        ["1D розподіл (ряд/колонка компонентів)", "2D magazine layout always only", "only text color", "SQL"],
        0,
      ),
      mcq(
        "cl-ct2",
        "Grid найкращий для:",
        "Grid is best for:",
        ["2D layout сторінки/карток у сітці", "тільки inline icons never pages", "only animations", "git"],
        0,
      ),
    ],
  ),
  lesson(
    "cl-ct-nested",
    "Nested layouts",
    "Nested layouts",
    2,
    false,
    [
      mcq(
        "cl-ct3",
        "Частий патерн:",
        "Common pattern:",
        ["grid page + flex components inside", "never nest", "only tables", "only absolute everything"],
        0,
      ),
      codeRead(
        "cl-ct4",
        "Nested OK?",
        "Nested OK?",
        "css",
        ".page { display:grid } .nav { display:flex }",
        ["valid composition", "invalid CSS", "needs iframe", "needs SQL"],
        0,
      ),
    ],
  ),
  exam("cl-ct-exam", "Контрольна: choose tool", "Exam: choose tool", 2, [
    mcq("cl-cte1", "1D UI chrome:", "1D UI chrome:", ["flex often", "only grid mandatory", "only float", "canvas"], 0),
    mcq("cl-cte2", "2D page regions:", "2D page regions:", ["grid often", "only inline", "only br tags", "SVG only"], 0),
    mcq("cl-cte3", "nesting flex in grid:", "nesting flex in grid:", ["common & fine", "forbidden", "breaks HTML", "needs WASM"], 0),
    mcq("cl-cte4", "navbar:", "navbar:", ["flex classic", "only table", "only marquee", "blink"], 0),
  ]),
]);

const capstone = unit("capstone", "Capstone", "Capstone", [
  lesson(
    "cl-capstone-dashboard",
    "Dashboard shell",
    "Dashboard shell",
    3,
    false,
    [
      {
        id: "cl-c1",
        type: "code_project",
        promptUk:
          "Layout: .page display:grid areas header/nav/main; .nav display:flex. HTML: header, nav, main. README: flex vs grid.",
        promptEn:
          "Layout: .page display:grid areas header/nav/main; .nav display:flex. HTML: header, nav, main. README: flex vs grid.",
        files: [
          {
            id: "html",
            name: "index.html",
            language: "html",
            starter: `<!DOCTYPE html>
<html lang="uk">
<head><meta charset="UTF-8"><title>Dash</title>
<link rel="stylesheet" href="styles.css"></head>
<body class="page">
  <!-- TODO: header, nav, main -->
</body>
</html>`,
          },
          {
            id: "css",
            name: "styles.css",
            language: "css",
            starter: `.page {
  /* TODO: display grid + template-areas */
}
.nav {
  /* TODO: display flex */
}
`,
          },
          {
            id: "md",
            name: "README.md",
            language: "markdown",
            starter: `# Layout
<!-- flex grid -->
`,
          },
        ],
        checks: [
          {
            fileId: "html",
            contains: ["<header", "<nav", "<main", "class=\"page\""],
          },
          {
            fileId: "css",
            contains: [".page", "display", "grid", "grid-template", ".nav", "flex"],
          },
          { fileId: "md", contains: ["flex", "grid"] },
        ],
      } as Exercise,
    ],
  ),
  exam("cl-cap-exam", "Фінальна контрольна", "Final exam", 3, [
    codeFill("cl-ce1", "flex", "flex", "css", "display: ___;", ["flex", "grid"], false),
    codeFill("cl-ce2", "justify", "justify", "css", "justify-content: ___;", ["center", "space-between", "flex-start"], false),
    codeFill("cl-ce3", "grid", "grid", "css", "display: ___;", ["grid"], true),
    codeFill("cl-ce4", "1fr", "1fr", "css", "grid-template-columns: repeat(3, ___);", ["1fr"], true),
    mcq("cl-ce5", "flex vs grid:", "flex vs grid:", ["1D vs 2D sweet spots", "identical always", "grid is HTML", "flex is SQL"], 0),
    codeFill("cl-ce6", "wrap", "wrap", "css", "flex-wrap: ___;", ["wrap"], true),
  ]),
]);

export const cssLayoutContent: CourseContent = {
  slug: "css_layout",
  titleUk: "CSS: Flex & Grid",
  titleEn: "CSS Flex & Grid",
  descriptionUk:
    "Глибокий layout-курс: box model, Flexbox, CSS Grid, responsive, flex vs grid. Контрольні після розділів.",
  descriptionEn:
    "Deep layout track: box model, Flexbox, CSS Grid, responsive, flex vs grid. Unit exams included.",
  icon: "🎨",
  color: "#264DE4",
  units: [
    boxFlow,
    flexCore,
    flexItems,
    flexRecipes,
    gridCore,
    gridPlacement,
    gridResponsive,
    chooseTool,
    capstone,
  ],
};
