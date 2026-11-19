import type { CourseContent, Exercise } from "./types.js";
import {
  codeFill,
  codeOrder,
  codeOrderAuto,
  codeProject,
  codeRead,
  concept,
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
      concept("cl-box-concept", "Розміри блоку", "The box model", {
        uk: "Блок складається з content, padding, border і зовнішнього margin. За content-box задана width описує вміст, а padding і border додаються до ширини. За border-box задана ширина включає вміст, padding і border; margin залишається зовні. Наприклад, width: 200px із padding: 10px і border: 2px зазвичай займає 224px у content-box і 200px у border-box без margin.",
        en: "A box consists of content, padding, border, and an outer margin. With content-box, width describes the content and padding and borders add to it. With border-box, the declared width includes content, padding, and borders; margin remains outside. For example, width: 200px with padding: 10px and border: 2px normally occupies 224px in content-box and 200px in border-box, excluding margin.",
      }),
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
      { ...mcq(
        "cl-b3",
        "display: block означає:",
        "display: block means:",
        ["Блок бере участь у блоковому потоці й зазвичай починається з нового рядка", "Завжди inline", "Лише grid", "Прихований"],
        0,
      ), optionsEn: ["The box participates in block flow and normally starts on a new line", "Always inline", "Grid only", "Hidden"] },
      { ...mcq("cl-b6", "Яку ширину займає border-box із width: 200px, padding: 10px і border: 2px без margin?", "What width does a border-box with width: 200px, padding: 10px, and border: 2px occupy excluding margin?", ["200px", "224px", "220px", "2000px"], 0), optionsEn: ["200px", "224px", "220px", "2000px"] },
    ],
  ),
  lesson(
    "cl-display",
    "display values",
    "display values",
    1,
    true,
    [
      concept("cl-display-concept", "Як елемент бере участь у макеті", "How an element participates in layout", {
        uk: "display визначає тип зовнішнього блоку та спосіб компонування вмісту. display: flex і display: grid створюють відповідні контексти для дочірніх елементів; display: none прибирає елемент із макета й зазвичай із дерева доступності. Це відрізняється від лише візуального приховування з урахуванням доступності.",
        en: "display determines an element's outer box and how its contents are laid out. display: flex and display: grid establish corresponding layout contexts for children; display: none removes the element from layout and generally from the accessibility tree. This differs from visually hiding content while keeping it accessible.",
      }),
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
      concept("cl-position-concept", "Позиція і каскад", "Positioning and the cascade", {
        uk: "absolute вилучає блок зі звичайного потоку й розташовує його відносно containing block, який часто створює найближчий позиціонований предок, але можуть створювати й інші властивості. z-index порівнюється в межах stacking context; великий номер у дочірньому контексті не обов'язково перекриє сусідній контекст. Специфічність порівнюють між застосовними правилами після урахування походження, важливості та шару каскаду.",
        en: "absolute removes a box from normal flow and positions it relative to its containing block, often formed by the nearest positioned ancestor but sometimes by other properties. z-index is compared within a stacking context; a large number in a child context does not necessarily cover a sibling context. Specificity is compared among applicable rules after cascade origin, importance, and layer are considered.",
      }),
      codeFill(
        "cl-pos1",
        "Задайте абсолютне позиціонування.",
        "Set absolute positioning.",
        "css",
        "position: ___;",
        ["absolute"],
        true,
      ),
      { ...mcq(
        "cl-pos2",
        "Для яких елементів z-index може задавати порядок накладання?",
        "For which elements can z-index affect stacking order?",
        [
          "мати position != static (relative, absolute, fixed, sticky) або бути flex/grid item",
          "мати лише display: inline",
          "мати обов'язково overflow: hidden",
          "бути тегом <body>",
        ],
        0,
      ), optionsEn: ["Positioned elements and flex/grid items are common cases", "Only elements with display: inline", "Only elements with overflow: hidden", "Only the body element"] },
      { ...(codeRead(
        "cl-pos3",
        "Яке правило переможе за специфічністю, якщо всі три збігаються і мають однакові походження, важливість і шар?",
        "Which rule wins by specificity if all three match and have the same origin, importance, and layer?",
        "css",
        "/* 1 */ #header .btn { color: red; }\n/* 2 */ .nav .btn { color: blue; }\n/* 3 */ button.btn { color: green; }",
        [
          "#header .btn (ID + class = 1-1-0)",
          ".nav .btn (2 classes = 0-2-0)",
          "button.btn (element + class = 0-1-1)",
          "Усі кольори змішаються",
        ],
        0,
      ) as Extract<Exercise, { type: "code_read" }>), optionsEn: ["#header .btn (ID + class = 1-1-0)", ".nav .btn (2 classes = 0-2-0)", "button.btn (element + class = 0-1-1)", "All colors blend together"] },
      matchEx(
        "cl-pos4",
        "Зіставте значення position",
        "Match position values",
        [
          { left: "relative", right: "зміщення від звичайного місця в потоці / offset from normal flow" },
          { left: "fixed", right: "зазвичай відносно viewport / usually relative to viewport" },
          { left: "sticky", right: "зміщення відносно scrollport з обмеженням контейнером / offset relative to scrollport, constrained by container" },
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
      concept("cl-flex-container-concept", "Контейнер і осі", "Container and axes", {
        uk: "display: flex створює flex-контейнер; його дочірні елементи в потоці стають flex items. flex-direction задає головну вісь: row іде в напрямку рядка, column — у напрямку стовпця. Точні фізичні напрямки залежать також від writing-mode і direction.",
        en: "display: flex creates a flex container; its in-flow children become flex items. flex-direction sets the main axis: row follows the inline direction and column follows the block direction. Exact physical directions also depend on writing-mode and direction.",
      }),
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
      concept("cl-flex-wrap-concept", "Перенесення та проміжки", "Wrapping and gaps", {
        uk: "flex-wrap: nowrap утримує елементи в одному flex-рядку, навіть якщо вони переповнюють контейнер; wrap дозволяє додаткові рядки. gap задає мінімальний проміжок між елементами або рядками, а розподіл вільного простору може збільшити видиму відстань.",
        en: "flex-wrap: nowrap keeps items on one flex line, even if they overflow; wrap permits additional lines. gap sets a minimum space between items or lines, while free-space distribution can increase the visible distance.",
      }),
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
        ["16", "8"],
        false,
      ),
      { ...mcq(
        "cl-f6",
        "nowrap означає:",
        "nowrap means:",
        ["items в одному рядку", "завжди column", "display none", "grid only"],
        0,
      ), optionsEn: ["Items stay on one flex line", "Always column", "display none", "Grid only"] },
    ],
  ),
  lesson(
    "cl-flex-justify-align",
    "justify & align",
    "justify & align",
    2,
    false,
    [
      concept("cl-flex-axes-concept", "Головна і поперечна осі", "Main and cross axes", {
        uk: "justify-content розподіляє вільний простір уздовж головної осі, яку визначає flex-direction. align-items вирівнює елементи на поперечній осі. У column головна вісь іде вздовж стовпця, тому не варто запам'ятовувати justify як завжди горизонтальне вирівнювання.",
        en: "justify-content distributes free space along the main axis set by flex-direction. align-items aligns items on the cross axis. In column the main axis follows the column, so do not assume justify always means horizontal alignment.",
      }),
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
      concept("cl-flex-space-concept", "Розподіл вільного простору", "Distributing free space", {
        uk: "space-between розподіляє доступний позитивний простір між елементами; space-around додає рівний простір з обох боків кожного елемента, тому внутрішні проміжки зазвичай удвічі більші за крайні. Результат залежить від кількості елементів і наявного простору; одного елемента недостатньо для проміжку між елементами.",
        en: "space-between distributes available positive space between items; space-around adds equal space on each side of each item, so inner gaps are normally twice the outer spaces. The result depends on the number of items and available space; one item has no between-item gap.",
      }),
      { ...mcq(
        "cl-f10",
        "space-between:",
        "space-between:",
        ["перший і останній по краях, простір між", "усі в центрі щільно", "column only", "absolute"],
        0,
      ), optionsEn: ["The first and last items sit at the edges, with space between", "All items are packed tightly in the center", "Column only", "Absolute positioning"] },
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
      concept("cl-flex-gap-concept", "Проміжки і центрування", "Gaps and centering", {
        uk: "gap створює проміжки між flex-елементами без додаткового зовнішнього проміжку на краях. Для центрування на обох осях контейнер може використовувати justify-content: center та align-items: center; для помітного центрування потрібен доступний простір на відповідній осі.",
        en: "gap creates space between flex items without adding an outer gap at the edges. A container can center on both axes with justify-content: center and align-items: center; visible centering requires available space on the relevant axis.",
      }),
      codeFill(
        "cl-fg1",
        "gap",
        "gap",
        "css",
        ".row { display: flex; ___: 1rem; }",
        ["gap"],
        true,
      ),
      { ...mcq(
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
      ), optionsEn: ["gap creates space between flex/grid items without outer trailing gaps", "gap works only in tables", "gap means z-index", "gap is only for fonts"] },
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
      concept("cl-grow-concept", "Розподіл додатного простору", "Distributing positive space", {
        uk: "flex-grow задає частку додатного вільного простору, яку елемент може отримати відносно інших елементів рядка. Наприклад, коефіцієнти 1 і 2 за однакових інших умов ділять доступний додатковий простір у співвідношенні 1:2; це не обов'язково співвідношення кінцевих розмірів.",
        en: "flex-grow sets the share of positive free space an item can receive relative to other items on the line. For example, factors 1 and 2 divide the available extra space 1:2 when other conditions are equal; final sizes are not necessarily in that ratio.",
      }),
      { ...mcq(
        "cl-fi1",
        "flex-grow: 1 означає:",
        "flex-grow: 1 means:",
        ["item може рости і забирати вільний простір", "ніколи не росте", "absolute position", "grid only"],
        0,
      ), optionsEn: ["The item can receive a share of positive free space", "It never grows", "Absolute positioning", "Grid only"] },
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
      concept("cl-basis-concept", "Базовий розмір і стиснення", "Basis and shrinking", {
        uk: "flex-basis задає початковий головний розмір для алгоритму Flexbox; auto зазвичай враховує відповідну властивість розміру або вміст. flex-shrink керує стисненням при нестачі простору, але на результат впливають базові й мінімальні розміри. flex: 1 у браузерах зазвичай розгортається до 1 1 0%; це не гарантує однакову кінцеву ширину в усіх випадках.",
        en: "flex-basis supplies the initial main size for the flex algorithm; auto normally consults the relevant size property or content. flex-shrink controls shrinkage when space is insufficient, but base and minimum sizes affect the result. Browsers normally expand flex: 1 to 1 1 0%; this does not guarantee equal final widths in every case.",
      }),
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
        ["auto"],
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
      concept("cl-align-order-concept", "Окреме вирівнювання і порядок", "Individual alignment and order", {
        uk: "align-self перевизначає align-items для окремого flex-елемента на поперечній осі. order змінює візуальне розташування, але не перебудовує DOM; порядок читання і клавіатурного фокуса може залишитися вихідним. Тому важливу послідовність краще задавати в HTML.",
        en: "align-self overrides align-items for an individual flex item on the cross axis. order changes visual placement but does not reorder the DOM; reading and keyboard focus order can remain unchanged. Put meaningful sequence in HTML.",
      }),
      codeFill(
        "cl-fi6",
        "align-self end",
        "align-self end",
        "css",
        "align-self: ___;",
        ["flex-end", "end"],
        false,
      ),
      { ...mcq(
        "cl-fi7",
        "order змінює:",
        "order changes:",
        ["візуальний порядок flex items", "HTML DOM always permanently", "SQL order by only", "git history"],
        0,
      ), optionsEn: ["The visual order of flex items", "The HTML DOM permanently", "Only SQL ORDER BY", "Git history"] },
    ],
  ),
  exam("cl-fi-exam", "Контрольна: flex items", "Exam: flex items", 3, [
    codeFill("cl-fie1", "Дозвольте елементу рости з коефіцієнтом 1", "Allow the item to grow with factor 1", "css", "flex-grow: ___;", ["1"], false),
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
      concept("cl-navbar-concept", "Гнучка панель навігації", "A flexible navigation bar", {
        uk: "Flexbox може розташувати групу бренду й групу дій у контейнері, а space-between — розподілити простір між ними. Залишайте семантичні посилання всередині nav, враховуйте напрямок письма та перевіряйте вузькі екрани: без достатнього простору може знадобитися перенесення або інша компоновка.",
        en: "Flexbox can lay out a brand group and an actions group, with space-between distributing space between them. Keep semantic links inside nav, account for writing direction, and test narrow screens: wrapping or another layout may be needed when space is insufficient.",
      }),
      { ...(codeRead(
        "cl-fr1",
        "Що робить це правило для двох груп у навігації?",
        "What does this rule do for two navigation groups?",
        "css",
        ".nav { display:flex; justify-content:space-between; align-items:center; }",
        ["Розподіляє вільний простір між групами та вирівнює їх поперек осі", "Вимагає grid areas", "Працює лише з float", "Вимагає table layout"],
        0,
      ) as Extract<Exercise, { type: "code_read" }>), optionsEn: ["Distributes free space between groups and aligns them on the cross axis", "Requires grid areas", "Works only with float", "Requires table layout"] },
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
      concept("cl-card-row-concept", "Ряд карток із переносом", "A wrapping card row", {
        uk: "Контейнер display: flex з flex-wrap: wrap і gap дозволяє карткам переходити на нові рядки з проміжками. Базовий та мінімальний розміри картки визначають, коли станеться перенос. Для вмісту, що не має переповнювати вузький екран, перевіряйте довгі слова і мінімальну ширину.",
        en: "A display: flex container with flex-wrap: wrap and gap lets cards flow onto new lines with spacing. A card's base and minimum sizes determine when wrapping occurs. To avoid overflow on narrow screens, test long words and minimum widths.",
      }),
      { ...mcq(
        "cl-fr3",
        "Картки в ряд з переносом:",
        "Cards in a wrapping row:",
        ["flex + wrap + gap", "only position absolute", "only float without clear", "display:none"],
        0,
      ), optionsEn: ["flex + wrap + gap", "Only absolute positioning", "Only float without clearing", "display:none"] },
      codeOrder(
        "cl-fr4",
        "Розташуйте оголошення в порядку: display, flex-wrap, gap.",
        "Order the declarations as display, flex-wrap, then gap.",
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
      concept("cl-grid-concept", "Доріжки Grid", "Grid tracks", {
        uk: "display: grid створює контейнер із рядками та стовпцями. grid-template-columns задає явні стовпці, а repeat(3, 1fr) повторює три гнучкі доріжки. fr бере участь у розподілі доступного простору після врахування інших розмірів і проміжків; мінімальний розмір вмісту також може впливати на результат.",
        en: "display: grid creates a container with rows and columns. grid-template-columns defines explicit columns, and repeat(3, 1fr) repeats three flexible tracks. fr participates in distributing available space after other sizes and gaps are considered; content minimum sizes can also affect the result.",
      }),
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
      { ...mcq(
        "cl-g3",
        "fr одиниця — це:",
        "fr unit is:",
        ["частка вільного простору в grid", "font-relative only", "flex-only unit", "HTML attribute"],
        0,
      ), optionsEn: ["A fraction of available grid space", "Only relative to font size", "A flex-only unit", "An HTML attribute"] },
    ],
  ),
  lesson(
    "cl-g-gap-minmax",
    "gap, minmax, repeat",
    "gap, minmax, repeat",
    3,
    false,
    [
      concept("cl-grid-minmax-concept", "Межі дорожок", "Track sizing limits", {
        uk: "gap задає проміжки між доріжками, repeat скорочує повторюваний список, а minmax задає мінімум і максимум розміру доріжки. repeat(3, minmax(200px, 1fr)) створює три стовпці не вужчі за 200px: якщо контейнер вузький, сітка може переповнити його, а не автоматично перенести стовпці.",
        en: "gap sets space between tracks, repeat abbreviates a repeated list, and minmax defines minimum and maximum track sizes. repeat(3, minmax(200px, 1fr)) creates three columns at least 200px wide: a narrow container can overflow rather than automatically wrap them.",
      }),
      codeFill(
        "cl-g4",
        "gap",
        "gap",
        "css",
        "gap: ___;",
        ["1rem", "16px", "8px"],
        false,
      ),
      { ...(codeRead(
        "cl-g5",
        "minmax(200px, 1fr) означає:",
        "minmax(200px, 1fr) means:",
        "css",
        "grid-template-columns: repeat(3, minmax(200px, 1fr));",
        ["мін 200px, росте до 1fr", "завжди 200px fixed only", "display none", "flex-direction"],
        0,
      ) as Extract<Exercise, { type: "code_read" }>), optionsEn: ["At least 200px, with flexible growth up to a share of available space", "Always fixed at 200px", "display none", "flex-direction"] },
      { ...mcq("cl-g9", "Що може статися з трьома колонками minmax(200px, 1fr) у контейнері завширшки 400px?", "What can happen to three minmax(200px, 1fr) columns in a 400px container?", ["Вони можуть переповнити контейнер", "Вони обов'язково стануть трьома колонками по 100px", "Grid автоматично видалить одну колонку", "Контейнер завжди стане display: flex"], 0), optionsEn: ["They can overflow the container", "They must become three 100px columns", "Grid automatically deletes a column", "The container always becomes display: flex"] },
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
      concept("cl-grid-rows-concept", "Явні та неявні рядки", "Explicit and implicit rows", {
        uk: "grid-template-rows задає явні рядки. Якщо розміщення елементів потребує додаткових доріжок, Grid створює неявні рядки; їхній розмір можна налаштувати через grid-auto-rows. auto враховує доступний простір і вміст за правилами розрахунку Grid.",
        en: "grid-template-rows defines explicit rows. When placing items requires additional tracks, Grid creates implicit rows; grid-auto-rows can control their size. auto accounts for available space and content according to Grid sizing rules.",
      }),
      codeFill(
        "cl-g7",
        "template rows",
        "template rows",
        "css",
        "grid-template-rows: ___ 1fr;",
        ["auto", "100px", "2rem"],
        false,
      ),
      { ...mcq(
        "cl-g8",
        "implicit rows з'являються коли:",
        "implicit rows appear when:",
        ["items виходять за явні tracks", "never in grid", "only in flex", "only with float"],
        0,
      ), optionsEn: ["Items require tracks outside the explicit grid", "Never in grid", "Only in flex", "Only with float"] },
    ],
  ),
  exam("cl-grid-core-exam", "Контрольна: grid core", "Exam: grid core", 2, [
    codeFill("cl-gce1", "display grid", "display grid", "css", "display: ___;", ["grid"], true),
    codeFill("cl-gce2", "Допишіть другу рівну колонку", "Complete the second equal column", "css", "grid-template-columns: 1fr ___;", ["1fr"], false),
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
      concept("cl-grid-lines-concept", "Лінії та span", "Lines and spans", {
        uk: "Лінії Grid обмежують доріжки: grid-column: 1 / 3 розміщує елемент від лінії 1 до лінії 3, охоплюючи дві колонки. span 2 задає довжину в дві доріжки. Лінія -1 позначає останню лінію явної сітки, тому її номер залежить від кількості явних колонок.",
        en: "Grid lines bound tracks: grid-column: 1 / 3 places an item from line 1 to line 3, spanning two columns. span 2 specifies a span of two tracks. Line -1 is the final line of the explicit grid, so its number depends on the number of explicit columns.",
      }),
      codeFill(
        "cl-gp1",
        "Розмістіть елемент від лінії 1 до лінії 3.",
        "Place the item from line 1 to line 3.",
        "css",
        "grid-column: 1 / ___;",
        ["3", "span 2"],
        false,
      ),
      { ...mcq(
        "cl-gp2",
        "grid-column: span 2:",
        "grid-column: span 2:",
        ["займає 2 колонки", "display flex", "z-index 2 only", "margin 2"],
        0,
      ), optionsEn: ["Spans two columns", "display flex", "Only z-index 2", "margin 2"] },
    ],
  ),
  lesson(
    "cl-gp-areas",
    "grid-template-areas",
    "grid-template-areas",
    3,
    false,
    [
      concept("cl-grid-areas-concept", "Іменовані області", "Named areas", {
        uk: "grid-template-areas описує прямокутні іменовані області рядками однакової довжини; крапка позначає порожню комірку. Елемент із grid-area: main займає область main. Назви описують геометрію, але самі по собі не додають HTML-семантики та не змінюють порядок DOM.",
        en: "grid-template-areas describes rectangular named areas using rows of equal length; a dot marks an empty cell. An item with grid-area: main occupies the main area. Names describe geometry but do not themselves add HTML semantics or change DOM order.",
      }),
      { ...(codeRead(
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
      ) as Extract<Exercise, { type: "code_read" }>), optionsEn: ["Named layout areas", "Only flex", "Only absolute positioning", "An SQL view"] },
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
      concept("cl-grid-autofit-concept", "Автоматична кількість колонок", "Automatic column counts", {
        uk: "repeat(auto-fit, minmax(...)) і auto-fill обирають кількість повторюваних доріжок за доступним простором. auto-fit згортає порожні повторені доріжки, дозволяючи зайнятим розширитися; auto-fill зберігає їх. Надто великий мінімум усе ще може спричинити переповнення вузького контейнера.",
        en: "repeat(auto-fit, minmax(...)) and auto-fill choose the number of repeated tracks from available space. auto-fit collapses empty repeated tracks, allowing occupied tracks to expand; auto-fill retains them. A minimum that is too large can still overflow a narrow container.",
      }),
      { ...mcq(
        "cl-gp5",
        "auto-fit з minmax часто для:",
        "auto-fit with minmax is often for:",
        ["responsive card grids без media queries", "only print CSS", "SQL pagination", "git branches"],
        0,
      ), optionsEn: ["Responsive card grids without explicit media queries", "Only print CSS", "SQL pagination", "Git branches"] },
      codeFill(
        "cl-gp6",
        "auto-fit",
        "auto-fit",
        "css",
        "grid-template-columns: repeat(___, minmax(200px, 1fr));",
        ["auto-fit"],
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
      concept("cl-media-grid-concept", "Сітка і ширина вікна", "Grid and viewport width", {
        uk: "Медіазапит застосовує правила, коли виконується його умова. @media (min-width: 768px) застосує вкладене правило від 768 CSS-пікселів ширини viewport; для вузького viewport потрібні базові стилі поза запитом. Перевіряйте макет із різним масштабом тексту та довгим вмістом, а не лише на конкретних пристроях.",
        en: "A media query applies its rules when the condition matches. @media (min-width: 768px) applies the nested rule at viewport widths of 768 CSS pixels and above; narrow viewports need base styles outside the query. Test the layout with text zoom and long content, not only specific devices.",
      }),
      { ...(codeRead(
        "cl-gr1",
        "Що задає правило, коли ширина viewport становить щонайменше 768px?",
        "What does the rule set when the viewport is at least 768px wide?",
        "css",
        `@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}`,
        ["Три гнучкі колонки для .grid", "Завжди одну колонку", "Вимикає grid", "Забороняє flex"],
        0,
      ) as Extract<Exercise, { type: "code_read" }>), optionsEn: ["Three flexible columns for .grid", "Always one column", "Disables grid", "Forbids flex"] },
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
      concept("cl-clamp-concept", "Гнучке значення з межами", "A flexible value with bounds", {
        uk: "clamp(min, preferred, max) обмежує бажане значення між мінімумом і максимумом, наприклад clamp(200px, 50%, 600px). Якщо мінімум перевищує максимум, мінімум має пріоритет; перевіряйте змішані одиниці й вузькі екрани. clamp задає розмір, але сам не гарантує доступного макета.",
        en: "clamp(min, preferred, max) bounds a preferred value between a minimum and maximum, for example clamp(200px, 50%, 600px). If the minimum exceeds the maximum, the minimum wins; test mixed units and narrow screens. clamp sets a size but does not by itself guarantee an accessible layout.",
      }),
      { ...mcq(
        "cl-gr3",
        "clamp(min, preferred, max):",
        "clamp(min, preferred, max):",
        ["обмежує значення між min і max", "only colors", "SQL function only", "git command"],
        0,
      ), optionsEn: ["Bounds the preferred value using minimum and maximum", "Only colors", "Only an SQL function", "A git command"] },
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
    codeFill("cl-gre4", "Використайте auto-fit", "Use auto-fit", "css", "repeat(___, minmax(12rem, 1fr))", ["auto-fit"], false),
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
      concept("cl-choice-concept", "Вибір інструмента", "Choosing a layout tool", {
        uk: "Flexbox зручний для розподілу елементів переважно вздовж однієї осі; Grid — для керування спільними рядками та стовпцями. Це орієнтир, а не заборона: обидва інструменти підтримують різні сценарії, і вибір залежить від вимог до вирівнювання та вмісту.",
        en: "Flexbox is convenient for distributing items primarily along one axis; Grid is useful for controlling shared rows and columns. This is a guideline rather than a restriction: both support different scenarios, and the choice depends on alignment and content requirements.",
      }),
      { ...mcq(
        "cl-ct1",
        "Flex найкращий для:",
        "Flex is best for:",
        ["1D розподіл (ряд/колонка компонентів)", "2D magazine layout always only", "only text color", "SQL"],
        0,
      ), optionsEn: ["One-dimensional distribution of components", "Only two-dimensional magazine layouts", "Only text color", "SQL"] },
      { ...mcq(
        "cl-ct2",
        "Grid найкращий для:",
        "Grid is best for:",
        ["2D layout сторінки/карток у сітці", "тільки inline icons never pages", "only animations", "git"],
        0,
      ), optionsEn: ["Two-dimensional page or card layouts", "Only inline icons, never pages", "Only animations", "Git"] },
    ],
  ),
  lesson(
    "cl-ct-nested",
    "Nested layouts",
    "Nested layouts",
    2,
    false,
    [
      concept("cl-nested-concept", "Комбінування Grid і Flexbox", "Combining Grid and Flexbox", {
        uk: "Макет сторінки може використовувати Grid для великих областей, а панель усередині — Flexbox для кнопок. Кожен контейнер застосовує власний алгоритм до своїх елементів. Перевіряйте вкладені мінімальні розміри: довгий вміст інколи потребує min-width: 0 або перенесення слів.",
        en: "A page can use Grid for major regions and a nested toolbar can use Flexbox for buttons. Each container applies its own algorithm to its items. Check nested minimum sizes: long content can sometimes need min-width: 0 or word wrapping.",
      }),
      { ...mcq(
        "cl-ct3",
        "Частий патерн:",
        "Common pattern:",
        ["grid page + flex components inside", "never nest", "only tables", "only absolute everything"],
        0,
      ), optionsEn: ["Grid for the page and flex for inner components", "Never nest layouts", "Only tables", "Absolute positioning for everything"] },
      { ...(codeRead(
        "cl-ct4",
        "Nested OK?",
        "Nested OK?",
        "css",
        ".page { display:grid } .nav { display:flex }",
        ["valid composition", "invalid CSS", "needs iframe", "needs SQL"],
        0,
      ) as Extract<Exercise, { type: "code_read" }>), optionsEn: ["A valid composition", "Invalid CSS", "Requires an iframe", "Requires SQL"] },
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
        concept("cl-app-flex-concept", "Діагностика переповнення", "Diagnosing flex overflow", {
          uk: "Автоматичний мінімальний розмір flex-елемента може не дозволяти йому звузитися менше вмісту. Для рядкового flex-контейнера min-width: 0 на відповідному елементі дозволяє меншу ширину; для скорочення тексту також потрібні обмежений простір, overflow: hidden, white-space: nowrap і text-overflow: ellipsis на потрібному текстовому блоці. Перевіряйте, чи повний текст залишається доступним користувачам.",
          en: "A flex item's automatic minimum size can prevent it from shrinking below its content. In a row flex container, min-width: 0 on the relevant item permits a smaller width; ellipsis also needs constrained space, overflow: hidden, white-space: nowrap, and text-overflow: ellipsis on the appropriate text box. Check that the full text remains available to users.",
        }),
        codeFill(
          "cl-app-1",
          "Виправлення обрізки довгого тексту всередині flex-елемента",
          "Fix text-overflow ellipsis inside flex item",
          "css",
          ".flex-item {\n  min-width: ___;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}",
          ["0"],
          true,
        ),
        { ...(codeRead(
          "cl-app-2",
          "Запобігання стисканню фіксованої іконки у flexbox",
          "Prevent flex item shrinking using flex-shrink",
          "css",
          ".avatar-icon {\n  width: 48px;\n  height: 48px;\n  flex-shrink: 0;\n}",
          [
            "flex-shrink: 0 забороняє стискання елемента алгоритмом flex, хоча інші обмеження розміру все ще діють",
            "flex-shrink: 0 приховує іконку",
            "Іконка розтягнеться на всю ширину",
            "flex-shrink не працює без flex-grow",
          ],
          0,
        ) as Extract<Exercise, { type: "code_read" }>), optionsEn: ["flex-shrink: 0 prevents flex shrinkage, although other sizing constraints still apply", "flex-shrink: 0 hides the icon", "The icon fills the entire width", "flex-shrink requires flex-grow"] },
        { ...mcq(
          "cl-app-3",
          "Як автоматичний мінімальний розмір може вплинути на flex-елемент у рядку?",
          "How can an automatic minimum size affect a flex item in a row?",
          [
            "Він може завадити елементу стиснутися менше мінімального розміру вмісту",
            "Це баг у CSS2",
            "Щоб заборонити перенесення рядків",
            "Для сумісності з табличною версткою",
          ],
          0,
        ), optionsEn: ["It can prevent the item shrinking below its content-based minimum", "It is a CSS2 bug", "It forbids line wrapping", "It exists for table layout compatibility"] },
      ],
    ),
    lesson(
      "css-dbg-grid-auto-fit",
      "Адаптивна сітка: auto-fit vs auto-fill",
      "Responsive grid: auto-fit vs auto-fill with minmax",
      3,
      false,
      [
        concept("cl-app-grid-concept", "Сітка з малою кількістю карток", "A grid with few cards", {
          uk: "auto-fit і auto-fill створюють стільки повторюваних доріжок, скільки вміщується. Якщо частина доріжок порожня, auto-fit згортає їх, а auto-fill залишає. Мінімум 280px може переповнити вужчий контейнер; за потреби використайте min(100%, 280px) і перевірте результат на вузькому екрані.",
          en: "auto-fit and auto-fill create as many repeated tracks as fit. When some tracks are empty, auto-fit collapses them while auto-fill retains them. A 280px minimum can overflow a narrower container; consider min(100%, 280px) and test the result on a narrow screen.",
        }),
        codeFill(
          "cl-app-4",
          "Створення адаптивної сітки колонок без медіа-запитів",
          "Create responsive columns without media queries",
          "css",
          ".card-grid {\n  display: grid;\n  grid-template-columns: repeat(___, minmax(280px, 1fr));\n  gap: 1.5rem;\n}",
          ["auto-fit", "auto-fill"],
          true,
        ),
        { ...(codeRead(
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
        ) as Extract<Exercise, { type: "code_read" }>), optionsEn: ["auto-fit collapses empty tracks so occupied columns can expand", "auto-fill deletes extra DOM elements", "auto-fit requires a fixed container height", "There is no practical difference"] },
      ],
    ),
    lesson(
      "css-dbg-stacking-context",
      "Дебаг z-index: контексти накладання та sticky",
      "Debug z-index: stacking contexts & sticky containment",
      3,
      false,
      [
        concept("cl-app-stacking-concept", "Контекст накладання і прокручування", "Stacking and scrolling contexts", {
          uk: "Дочірній z-index порівнюється всередині батьківського stacking context, а весь контекст розташовується відносно сусідніх контекстів. sticky орієнтується на найближчий відповідний scroll container і обмежується своїм контейнером. Під час діагностики перевіряйте обидві ієрархії та фактичні стилі предків.",
          en: "A child's z-index is compared within its parent stacking context, while that whole context is stacked relative to siblings. sticky uses the nearest relevant scroll container and remains constrained by its containing block. Diagnose both hierarchies and inspect the ancestors' computed styles.",
        }),
        { ...(codeRead(
          "cl-app-6",
          "Чому child може не перекрити сусідній контекст із вищим рівнем накладання?",
          "Why might child fail to cover a sibling stacking context with a higher stacking level?",
          "css",
          ".parent {\n  position: relative;\n  z-index: 1;\n  opacity: 0.99; /* створює новий stacking context */\n}\n.child {\n  position: absolute;\n  z-index: 9999;\n}",
          [
            "child замкнений усередині stacking context батька parent з рівнем z-index: 1",
            "z-index не працює з position: absolute",
            "opacity вимикає відображення елемента",
            "Потрібно вказати z-index: 100000",
          ],
          0,
        ) as Extract<Exercise, { type: "code_read" }>), optionsEn: ["The child is confined within its parent's stacking context at z-index 1", "z-index does not work with position: absolute", "opacity disables rendering", "The child needs z-index: 100000"] },
        codeFill(
          "cl-app-7",
          "Приберіть overflow-контейнер предка, якщо саме він заважає потрібній прив'язці sticky.",
          "Remove the ancestor's overflow container when it interferes with the intended sticky reference.",
          "css",
          "/* Якщо потрібен viewport, перевірте, чи цей предок не задає scroll container. */\n.scroll-container {\n  overflow: ___; /* замість hidden */\n}",
          ["visible"],
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
        concept("cl-app-dashboard-concept", "Від мобільного до широкого макета", "From mobile to wide layout", {
          uk: "Базовий вертикальний Flexbox дає просту послідовність панелей на вузькому екрані. Медіазапит може замінити її Grid-сіткою на широкому viewport; перевіряйте переповнення центральної колонки та порядок читання. Для притискання футера вниз у колонці flex використовуйте margin-top: auto, якщо є вільний простір.",
          en: "A base vertical Flexbox provides a simple panel sequence on narrow screens. A media query can switch to Grid on a wide viewport; check central-column overflow and reading order. To push a footer down in a flex column, use margin-top: auto when there is free space.",
        }),
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
        concept("cl-layers-concept", "Шари, токени й напрямок письма", "Layers, tokens, and writing direction", {
          uk: "@layer задає порядок каскадних шарів. Для звичайних оголошень пізніший шар перемагає раніший, а правила без шару мають вищий пріоритет; для !important порядок шарів зворотний. CSS custom properties дозволяють повторно використовувати значення, а логічні властивості на кшталт padding-inline адаптуються до напрямку письма.",
          en: "@layer sets cascade layer order. For normal declarations, a later layer wins over an earlier one and unlayered rules take precedence; for !important declarations layer order is reversed. CSS custom properties let you reuse values, and logical properties such as padding-inline adapt to writing direction.",
        }),
        { ...(codeRead(
          "cl-mod-1",
          "Якщо обидва селектори збігаються з кнопкою, чому звичайне правило `utilities` перемагає `components`?",
          "If both selectors match the button, why does the normal `utilities` rule beat `components`?",
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
            "For normal declarations later layers beat earlier layers regardless of specificity; unlayered normal rules rank above layered normal rules.",
          ),
        ) as Extract<Exercise, { type: "code_read" }>), optionsEn: ["For normal declarations layer order takes precedence over specificity across layers", "Specificity always beats layer order", "Unlayered rules have the lowest priority", "Green comes later alphabetically"] },
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
        concept("cl-container-concept", "Розмір контейнера і довгий вміст", "Container size and long content", {
          uk: "container-type: inline-size дозволяє нащадкам реагувати на доступний inline-розмір контейнера через @container. min-width: 0 може дозволити flex/grid-елементу звузитися, а overflow-wrap: anywhere — переносити довгі рядки. Перевіряйте масштаб тексту, вузькі екрани й prefers-reduced-motion у браузері: наявність CSS-правил сама не доводить доступність.",
          en: "container-type: inline-size lets descendants respond to a container's available inline size via @container. min-width: 0 can allow a flex/grid item to shrink, and overflow-wrap: anywhere can wrap long strings. Test text zoom, narrow screens, and prefers-reduced-motion in a browser: the presence of CSS rules alone does not prove accessibility.",
        }),
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
        { ...(codeRead(
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
            "Ця комбінація допомагає в описаному випадку; перевіряйте також обмеження батьківських доріжок і іншого вмісту.",
            "This combination helps in the stated case; also inspect parent track constraints and other content.",
          ),
        ) as Extract<Exercise, { type: "code_read" }>), optionsEn: ["min-width: 0 permits shrinking and overflow-wrap: anywhere wraps long strings", "overflow: hidden makes text readable", "font-size: clamp(2rem, 5vw, 4rem) shrinks the card", "position: fixed fixes overflow"] },
        codeProject(
          "cl-mod-5",
          "Створіть стилі картки з `@layer`, `@container`, `clamp()` і `prefers-reduced-motion`. Перевірка шукає текстові фрагменти, а стійкість до зуму й довгого тексту перевірте в браузері.",
          "Create card styles using `@layer`, `@container`, `clamp()`, and `prefers-reduced-motion`. The checker searches for text fragments; test zoom and long text in a browser.",
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
/* TODO: add responsive card styles and reduced-motion support. */
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
      concept("cl-capstone-concept", "Перевірка макета дашборда", "Checking the dashboard layout", {
        uk: "Використайте Grid для великих областей і Flexbox для навігації, а потім перевірте вузькі екрани та клавіатурний порядок. Автоматична перевірка шукає фрагменти тексту у файлах, зокрема коментарях, і не доводить правильність CSS чи доступність: перегляньте результат у браузері.",
        en: "Use Grid for major regions and Flexbox for navigation, then test narrow screens and keyboard order. The automatic check searches file text, including comments, and does not prove CSS correctness or accessibility: inspect the result in a browser.",
      }),
      {
        id: "cl-c1",
        type: "code_project",
        promptUk:
          "Вихідні файли: index.html, styles.css, README.md. Створіть дашборд на Grid із навігацією Flexbox: у HTML <header>, <nav>, <main>, class=\"page\"; у CSS .page, grid-template-areas та .nav; у README порівняйте flex і grid. Перевірка шукає фрагменти тексту, зокрема в коментарях, і не перевіряє поведінку макета.",
        promptEn:
          "Input files: index.html, styles.css, README.md. Build a Grid dashboard with Flexbox navigation: HTML <header>, <nav>, <main>, class=\"page\"; CSS .page, grid-template-areas and .nav; compare flex and grid in README. The checker searches text fragments, including comments, and does not verify layout behavior.",
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
  /* TODO: define the page layout. */
}
.nav {
  /* TODO: define the navigation layout. */
}
`,
          },
          {
            id: "md",
            name: "README.md",
            language: "markdown",
            starter: `# Layout
<!-- TODO: compare the layout approaches. -->
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
    codeFill("cl-ce1", "Увімкніть Flexbox", "Enable Flexbox", "css", "display: ___;", ["flex"], false),
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
