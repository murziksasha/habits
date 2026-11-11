import type { CourseContent, Exercise } from "./types.js";
import {
  codeFill,
  codeOrder,
  codeOrderAuto,
  codeProject,
  codeRead,
  exam,
  lesson,
  matchEx,
  mcq,
  unit,
  why,
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
  lesson(
    "cl-position-stacking",
    "Позиціонування та специфічність",
    "Positioning & specificity",
    2,
    false,
    [
      codeFill(
        "cl-pos1",
        "Абсолютне позиціонування відносно найближчого позиціонованого предка",
        "Absolute positioning relative to nearest positioned ancestor",
        "css",
        "position: ___;",
        ["absolute"],
        true,
      ),
      mcq(
        "cl-pos2",
        "Для роботи z-index елемент повинен:",
        "For z-index to work, the element must:",
        [
          "мати position != static (relative, absolute, fixed, sticky) або бути flex/grid item",
          "мати лише display: inline",
          "мати обов'язково overflow: hidden",
          "бути тегом <body>",
        ],
        0,
      ),
      codeRead(
        "cl-pos3",
        "Яке правило переможе через специфічність селекторів?",
        "Which rule wins due to selector specificity?",
        "css",
        "/* 1 */ #header .btn { color: red; }\n/* 2 */ .nav .btn { color: blue; }\n/* 3 */ button.btn { color: green; }",
        [
          "#header .btn (ID + class = 1-1-0)",
          ".nav .btn (2 classes = 0-2-0)",
          "button.btn (element + class = 0-1-1)",
          "Усі кольори змішаються",
        ],
        0,
      ),
      matchEx(
        "cl-pos4",
        "Зіставте значення position",
        "Match position values",
        [
          { left: "relative", right: "зміщення від звичайного місця в потоці / offset from normal flow" },
          { left: "fixed", right: "фіксація відносно вікна перегляду / fixed to viewport" },
          { left: "sticky", right: "перемикання між relative та fixed при скролі / toggles between relative and fixed on scroll" },
        ],
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

const appliedResponsiveTroubleshooting = unit(
  "applied_responsive_troubleshooting",
  "Applied: дебаг та адаптивність верстки",
  "Applied: Layout Troubleshooting & Responsive Patterns",
  [
    lesson(
      "css-dbg-flex-overflow",
      "Дебаг Flexbox: переповнення тексту та min-width: 0",
      "Debug Flexbox: text truncation & min-width: 0",
      3,
      false,
      [
        codeFill(
          "cl-app-1",
          "Виправлення обрізки довгого тексту всередині flex-елемента",
          "Fix text-overflow ellipsis inside flex item",
          "css",
          ".flex-item {\n  min-width: ___;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}",
          ["0"],
          true,
        ),
        codeRead(
          "cl-app-2",
          "Запобігання стисканню фіксованої іконки у flexbox",
          "Prevent flex item shrinking using flex-shrink",
          "css",
          ".avatar-icon {\n  width: 48px;\n  height: 48px;\n  flex-shrink: 0;\n}",
          [
            "flex-shrink: 0 гарантує, що аватар залишиться рівно 48px навіть при звуженні контейнера",
            "flex-shrink: 0 приховує іконку",
            "Іконка розтягнеться на всю ширину",
            "flex-shrink не працює без flex-grow",
          ],
          0,
        ),
        mcq(
          "cl-app-3",
          "Чому за замовчуванням flex-елемент має min-width: auto замість 0?",
          "Why do flex items have min-width: auto by default instead of 0?",
          [
            "Щоб елемент автоматично не стискався менше розміру свого текстового вмісту, якщо це явно не дозволено",
            "Це баг у CSS2",
            "Щоб заборонити перенесення рядків",
            "Для сумісності з табличною версткою",
          ],
          0,
        ),
      ],
    ),
    lesson(
      "css-dbg-grid-auto-fit",
      "Адаптивна сітка: auto-fit vs auto-fill",
      "Responsive grid: auto-fit vs auto-fill with minmax",
      3,
      false,
      [
        codeFill(
          "cl-app-4",
          "Створення адаптивної сітки колонок без медіа-запитів",
          "Create responsive columns without media queries",
          "css",
          ".card-grid {\n  display: grid;\n  grid-template-columns: repeat(___, minmax(280px, 1fr));\n  gap: 1.5rem;\n}",
          ["auto-fit", "auto-fill"],
          true,
        ),
        codeRead(
          "cl-app-5",
          "Різниця між auto-fit та auto-fill при малій кількості карток",
          "auto-fit vs auto-fill with few cards",
          "css",
          "/* auto-fit: колапсує порожні треки і розтягує наявні картки */\n/* auto-fill: зберігає порожні треки заданої ширини */",
          [
            "auto-fit розтягує наявні колонки на всю ширину контейнера, якщо їх менше ніж вміщується",
            "auto-fill видаляє зайві елементи з DOM",
            "auto-fit вимагає фіксованої висоти контейнера",
            "Між ними немає жодної практичної різниці",
          ],
          0,
        ),
      ],
    ),
    lesson(
      "css-dbg-stacking-context",
      "Дебаг z-index: контексти накладання та sticky",
      "Debug z-index: stacking contexts & sticky containment",
      3,
      false,
      [
        codeRead(
          "cl-app-6",
          "Чому z-index: 9999 не перекриває інший блок?",
          "Why z-index: 9999 fails to overlap outside element",
          "css",
          ".parent {\n  position: relative;\n  z-index: 1;\n  opacity: 0.99; /* створює новий stacking context */\n}\n.child {\n  position: absolute;\n  z-index: 9999;\n}",
          [
            "child замкнений усередині stacking context батька parent з рівнем z-index: 1",
            "z-index не працює з position: absolute",
            "opacity вимикає відображення елемента",
            "Потрібно вказати z-index: 100000",
          ],
          0,
        ),
        codeFill(
          "cl-app-7",
          "Чому position: sticky може не працювати: перевірка overflow батька",
          "Fix position sticky by removing overflow hidden on ancestor",
          "css",
          "/* Якщо батьківський контейнер має overflow: hidden, sticky ламається */\n.scroll-container {\n  overflow: ___; /* замість hidden */\n}",
          ["visible", "auto"],
          true,
        ),
      ],
    ),
    lesson(
      "css-app-cumulative-task",
      "Підсумковий таск: адаптивний дашборд",
      "Applied task: responsive multi-panel layout",
      3,
      false,
      [
        codeOrder(
          "cl-app-8",
          "Створення адаптивної сітки дашборду: мобільний стек → десктоп 3 колонки",
          "Responsive dashboard CSS: mobile stacked → desktop columns",
          "css",
          [
            ".dashboard { display: flex; flex-direction: column; gap: 1rem; }",
            "@media (min-width: 1024px) {",
            "  .dashboard { display: grid; grid-template-columns: 240px 1fr 300px; }",
            "}",
          ],
          [
            ".dashboard { display: flex; flex-direction: column; gap: 1rem; }",
            "@media (min-width: 1024px) {",
            "  .dashboard { display: grid; grid-template-columns: 240px 1fr 300px; }",
            "}",
          ],
        ),
        codeFill(
          "cl-app-9",
          "Вирівнювання футера картки по нижньому краю у flex-контейнері",
          "Push card footer to bottom using margin-top auto",
          "css",
          ".card-body { display: flex; flex-direction: column; }\n.card-footer { margin-top: ___; }",
          ["auto"],
          true,
        ),
      ],
    ),
    exam(
      "css-app-exam",
      "Екзамен: дебаг верстки та адаптивність",
      "Exam: layout troubleshooting",
      3,
      [
        mcq(
          "cl-app-10",
          "Яка одиниця виміру CSS Grid представляє частку доступного вільного простору?",
          "Which CSS Grid unit represents a fraction of available free space?",
          ["fr", "em", "%", "ch"],
          0,
        ),
        codeRead(
          "cl-app-11",
          "Як спрацює властивість aspect-ratio: 16 / 9?",
          "How does aspect-ratio: 16 / 9 behave?",
          "css",
          ".video-embed { width: 100%; aspect-ratio: 16 / 9; }",
          [
            "Автоматично розраховує висоту відповідно до пропорції 16 до 9 без 'padding hack'",
            "Вимагає обов'язкового встановлення height: 100%",
            "Працює лише для відеофайлів у форматі mp4",
            "Зменшує роздільну здатність екрана",
          ],
          0,
        ),
        codeFill(
          "cl-app-12",
          "Властивість для створення відступів між flex або grid елементами",
          "Property for gutters between flex or grid items",
          "css",
          ".container { display: flex; ___: 1.5rem; }",
          ["gap"],
          true,
        ),
        codeOrder(
          "cl-app-13",
          "Специфічність CSS селекторів за спаданням сили",
          "CSS specificity order from highest to lowest",
          "text",
          [
            "1. Inline стилі (style=...)",
            "2. ID селектори (#header)",
            "3. Класи, псевдокласи та атрибути (.card, :hover, [type])",
            "4. Теги та псевдоелементи (div, p, ::before)",
          ],
          [
            "1. Inline стилі (style=...)",
            "2. ID селектори (#header)",
            "3. Класи, псевдокласи та атрибути (.card, :hover, [type])",
            "4. Теги та псевдоелементи (div, p, ::before)",
          ],
        ),
      ],
    ),
  ],
);

const modernCssResilience = unit(
  "modern_css_resilience",
  "Каскадні шари, container queries, токени й захист від переповнення",
  "Cascade Layers, Container Queries, Tokens & Overflow Resilience",
  [
    lesson(
      "cl-layers-tokens",
      "@layer, дизайн-токени та логічні властивості",
      "@layer, design tokens & logical properties",
      3,
      false,
      [
        codeRead(
          "cl-mod-1",
          "Чому правило з шару `utilities` перемагає правило з `components`, навіть якщо селектор у `components` має вищу специфічність?",
          "Predict: why does a rule in `@layer utilities` override `@layer components` even if the component selector has higher specificity?",
          "css",
          "@layer base, components, utilities;\n@layer components { .card .btn { background: blue; } }\n@layer utilities { .bg-accent { background: green; } }",
          [
            "У `@layer` порядок оголошення шарів важливіший за специфічність усередині шарів (для нормальних правил)",
            "Специфічність завжди перемагає `@layer`",
            "Правила поза `@layer` мають найнижчий пріоритет",
            "Тому що green стоїть нижче за алфавітом",
          ],
          0,
          why(
            "Пізніший шар у `@layer` перемагає попередній без `!important`; незагорнуті (unlayered) стилі мають ще вищий пріоритет.",
            "Later cascade layers beat earlier layers regardless of selector specificity; unlayered rules sit above all layers.",
          ),
        ),
        codeFill(
          "cl-mod-2",
          "Замініть `padding-left` / `padding-right` однією логічною властивістю для підтримки різних напрямків письма",
          "Replace left/right padding with a logical property",
          "css",
          ".btn { ___-inline: var(--space-md, 1rem); }",
          ["padding"],
          true,
          why("Логічні властивості (`padding-inline`, `margin-block`) працюють і для LTR, і для RTL.", "Logical properties (`padding-inline`, `margin-block`) adapt across writing modes."),
        ),
      ],
    ),
    lesson(
      "cl-container-overflow",
      "@container queries, адаптивна типографіка, reduced motion та довгі тексти",
      "@container queries, fluid typography, reduced motion & overflow",
      3,
      false,
      [
        codeFill(
          "cl-mod-3",
          "Оголосіть картку як контейнер розміру для запитів `@container`",
          "Declare an element as an inline-size container for `@container` queries",
          "css",
          ".task-slot { container-___: inline-size; }",
          ["type"],
          true,
          why("`container-type: inline-size` дозволяє дочірнім компонентам адаптуватися до ширини слота, а не лише вікна.", "`container-type: inline-size` lets components respond to parent slot width."),
        ),
        codeRead(
          "cl-mod-4",
          "Довгий URL або безпробіловий токен ламає grid-картку і викликає горизонтальний скрол на 320px. Яка причина і фікс?",
          "A long unbroken token widens a grid card past 320px. What fixes both grid sizing and text wrapping?",
          "css",
          ".task-card { min-width: 0; overflow-wrap: anywhere; }",
          [
            "`min-width: 0` знімає дефолтний `min-width: auto` у grid/flex-дітей, а `overflow-wrap: anywhere` переносить довгі рядки",
            "`overflow: hidden` робить текст читабельним",
            "`font-size: clamp(2rem, 5vw, 4rem)` зменшує картку",
            "`position: fixed` виправляє переповнення",
          ],
          0,
          why(
            "Без `min-width: 0` flex/grid елемент розтягується під нерозривний контент.",
            "Flex/grid items default to `min-width: auto`; setting `min-width: 0` plus `overflow-wrap` prevents overflow.",
          ),
        ),
        codeProject(
          "cl-mod-5",
          "Створіть стійку до 200%-зуму й довгого тексту картку задачі на `@layer`, `@container`, `clamp()` і `prefers-reduced-motion`.",
          "Author a zoom- and overflow-resilient task card stylesheet with `@layer`, `@container`, `clamp()`, and `prefers-reduced-motion`.",
          [
            {
              id: "css",
              name: "tokens.css",
              language: "css",
              starter: `@layer tokens, components;
@layer tokens {
  :root {
    --space-4: 1rem;
  }
}
/* TODO: .board-slot container-type, .task-title clamp(), min-width:0, overflow-wrap, @container, prefers-reduced-motion */
`,
            },
          ],
          [
            {
              fileId: "css",
              contains: ["@layer", "container-type", "@container", "clamp(", "overflow-wrap", "prefers-reduced-motion"],
            },
          ],
          {
            hintUk: "Додайте `@container (min-width: 28rem)`, `clamp(1rem, 2vw, 1.35rem)` та `@media (prefers-reduced-motion: reduce)`.",
            hintEn: "Include `@container (min-width: 28rem)`, `clamp(1rem, 2vw, 1.35rem)`, and `@media (prefers-reduced-motion: reduce)`.",
          },
        ),
      ],
    ),
    exam("cl-mod-exam", "Контрольна: сучасний стійкий CSS", "Exam: modern resilient CSS", 3, [
      mcq(
        "cl-me1",
        "Чим `@container` краще за `@media (min-width: ...)` для перевикористовуваної картки задачі?",
        "Why choose `@container` over `@media` for a reusable task card?",
        [
          "Картка підлаштовується під ширину свого контейнера (сайбар чи основна область), а не всього екрану",
          "`@container` автоматично завантажує шрифти",
          "`@media` більше не працює в браузерах",
          "`@container` скасовує box model",
        ],
        0,
        why("Container queries роблять компоненти по-справжньому портативними.", "Container queries decouple component layout from global viewport width."),
      ),
      codeFill(
        "cl-me2",
        "Плавне масштабування шрифту між мінімумом і максимумом",
        "Fluid typography bounded by min and max sizes",
        "css",
        "font-size: ___(1rem, 2.5vw, 1.5rem);",
        ["clamp"],
        true,
        why("`clamp(min, preferred, max)` не дає тексту стати замалим при 200% зумі або гігантським на десктопі.", "`clamp(min, preferred, max)` keeps headings readable across zoom levels."),
      ),
      codeRead(
        "cl-me3",
        "Який рядок не дасть flex-елементу з довгим заголовком витиснути кнопку «Видалити» за межі екрана?",
        "Which property stops a long flex title from pushing the Delete button off-screen?",
        "css",
        ".title { flex: 1; ___: 0; overflow-wrap: anywhere; }",
        [
          "min-width: 0",
          "z-index: 99",
          "flex-grow: 10",
          "display: inline",
        ],
        0,
        why("`min-width: 0` дозволяє flex-дитячій області стискатися нижче ширини свого контенту.", "`min-width: 0` allows a flex item to shrink below its intrinsic content size."),
      ),
      codeOrderAuto(
        "cl-me4",
        "Порядок каскадних шарів від базових токенів до утиліт",
        "Cascade layer order from lowest to highest priority",
        "css",
        [
          "@layer reset;",
          "@layer tokens;",
          "@layer components;",
          "@layer utilities;",
        ],
        why("Базовий скид і токени оголошуються першими, а точкові утиліти — останніми.", "Declare reset/tokens first and override utilities last."),
      ),
    ]),
  ],
);

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
    appliedResponsiveTroubleshooting,
    modernCssResilience,
    capstone,
  ],
};
