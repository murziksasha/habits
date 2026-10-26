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

const document = unit("document", "Документ", "Document", [
  lesson(
    "hs-doc-basics",
    "Каркас HTML-документа",
    "HTML document shell",
    1,
    true,
    [
      mcq(
        "hs-d1",
        "DOCTYPE html означає:",
        "DOCTYPE html means:",
        ["XML-only mode", "стандартний HTML5 document type", "CSS reset", "JS module"],
        1,
      ),
      codeOrder(
        "hs-d2",
        "Порядок каркасу",
        "Shell order",
        "html",
        ["</html>", "<!DOCTYPE html>", "<html lang=\"uk\">", "<head></head>", "<body></body>"],
        ["<!DOCTYPE html>", "<html lang=\"uk\">", "<head></head>", "<body></body>", "</html>"],
      ),
      codeFill(
        "hs-d3",
        "Атрибут мови",
        "Language attribute",
        "html",
        '<html ___="uk">',
        ["lang"],
        true,
      ),
    ],
  ),
  lesson(
    "hs-doc-head",
    "Head: meta і title",
    "Head: meta & title",
    1,
    true,
    [
      mcq(
        "hs-d4",
        "Тег title впливає на:",
        "The title tag affects:",
        ["лише CSS", "вкладку браузера / SEO title", "лише Node", "Redis"],
        1,
      ),
      codeFill(
        "hs-d5",
        "charset",
        "charset",
        "html",
        '<meta charset="___">',
        ["UTF-8", "utf-8"],
        false,
      ),
      codeRead(
        "hs-d6",
        "viewport meta — для чого?",
        "viewport meta is for?",
        "html",
        '<meta name="viewport" content="width=device-width, initial-scale=1">',
        ["адаптив на мобільних", "SQL connection", "git remote", "only print CSS"],
        0,
      ),
    ],
  ),
  lesson(
    "hs-doc-body",
    "Body і видимий контент",
    "Body & visible content",
    1,
    false,
    [
      mcq(
        "hs-d7",
        "Видимий контент сторінки зазвичай у:",
        "Visible page content is usually in:",
        ["<head>", "<body>", "<meta>", "<script type=module only>"],
        1,
      ),
      codeFill(
        "hs-d8",
        "Заголовок рівня 1",
        "Level-1 heading",
        "html",
        "<___>Welcome</___>",
        ["h1", "H1"],
        false,
      ),
    ],
  ),
  lesson(
    "hs-doc-semantics-intro",
    "Навіщо семантика",
    "Why semantics",
    1,
    true,
    [
      mcq(
        "hs-ds1",
        "Семантичний HTML допомагає:",
        "Semantic HTML helps:",
        [
          "screen readers, SEO, зрозумілу структуру",
          "лише змінити колір тексту",
          "замінити CSS назавжди",
          "прискорити SQL",
        ],
        0,
      ),
      mcq(
        "hs-ds2",
        "Краще для навігації:",
        "Better for navigation:",
        ["<nav>", "лише <div class=\"nav\"> без сенсу", "<span> only", "<br><br>"],
        0,
      ),
      codeFill(
        "hs-ds3",
        "main landmark",
        "main landmark",
        "html",
        "<___>…content…</___>",
        ["main"],
        false,
      ),
      mcq(
        "hs-ds4",
        "Один <main> на сторінку — це:",
        "One <main> per page is:",
        ["рекомендована практика", "заборонено", "лише для PDF", "тільки в XHTML 1.0"],
        0,
      ),
    ],
  ),
  exam("hs-doc-exam", "Контрольна: документ", "Exam: document", 2, [
    mcq("hs-de1", "HTML5 doctype:", "HTML5 doctype:", ["<!DOCTYPE html>", "<!HTML>", "<?xml>", "<doctype>"], 0),
    codeFill("hs-de2", "lang attr", "lang attr", "html", "<html ___=\"en\">", ["lang"], true),
    mcq("hs-de3", "title живе в:", "title lives in:", ["head", "footer only", "aside", "nav only"], 0),
    codeFill("hs-de4", "charset meta", "charset meta", "html", '<meta charset="___">', ["UTF-8", "utf-8"], false),
    mcq("hs-de5", "viewport потрібен для:", "viewport is needed for:", ["responsive mobile layout", "SQL", "Elo", "SMTP"], 0),
  ]),
]);

const landmarks = unit("landmarks", "Landmarks", "Landmarks", [
  lesson(
    "hs-lm-main",
    "main, header, footer",
    "main, header, footer",
    2,
    false,
    [
      mcq(
        "hs-l1",
        "<main> означає:",
        "<main> means:",
        ["основний унікальний контент сторінки", "бічна колонка always", "тільки SEO", "script host"],
        0,
      ),
      codeFill(
        "hs-l2",
        "Шапка сайту",
        "Site header",
        "html",
        "<___>...</___>",
        ["header"],
        true,
      ),
      codeRead(
        "hs-l3",
        "Скільки <main> бажано?",
        "How many <main> ideally?",
        "html",
        "<main>…</main>",
        ["один основний на сторінку", "десятки обов'язково", "нуль always", "only in head"],
        0,
      ),
    ],
  ),
  lesson(
    "hs-lm-nav-aside",
    "nav і aside",
    "nav & aside",
    2,
    false,
    [
      mcq(
        "hs-l4",
        "<nav> для:",
        "<nav> is for:",
        ["блоків навігаційних посилань", "лише зображень", "SQL tables", "audio only"],
        0,
      ),
      codeFill(
        "hs-l5",
        "Бічна колонка",
        "Sidebar landmark",
        "html",
        "<___>Related</___>",
        ["aside"],
        true,
      ),
      matchEx(
        "hs-l6",
        "Зіставте landmarks",
        "Match landmarks",
        [
          { left: "<main>", right: "primary content" },
          { left: "<nav>", right: "navigation" },
          { left: "<footer>", right: "page/section footer" },
        ],
      ),
    ],
  ),
  lesson(
    "hs-lm-section",
    "section vs div",
    "section vs div",
    2,
    false,
    [
      mcq(
        "hs-l7",
        "<section> краще коли:",
        "<section> is better when:",
        ["є тематична група з заголовком", "потрібен «просто box» без сенсу", "тільки CSS grid cell always", "never"],
        0,
      ),
      mcq(
        "hs-l8",
        "<div> — це:",
        "<div> is:",
        ["generic container без семантики", "завжди landmark", "form control", "heading"],
        0,
      ),
      codeRead(
        "hs-l9",
        "Що краще для статті блогу?",
        "Better for a blog post?",
        "html",
        "<article>…</article> vs <div>…</div>",
        ["article для самостійного твору", "div always better", "only span", "table"],
        0,
      ),
    ],
  ),
  exam("hs-lm-exam", "Контрольна: landmarks", "Exam: landmarks", 2, [
    mcq("hs-le1", "main:", "main:", ["primary content", "meta only", "charset", "doctype"], 0),
    codeFill("hs-le2", "nav tag", "nav tag", "html", "<___><a href=/>Home</a></___>", ["nav"], true),
    mcq("hs-le3", "aside:", "aside:", ["tangentially related", "must be h1", "replaces body", "SQL"], 0),
    mcq("hs-le4", "div:", "div:", ["no inherent meaning", "always landmark", "form", "title"], 0),
    codeFill("hs-le5", "footer", "footer", "html", "<___>© 2026</___>", ["footer"], true),
  ]),
]);

const headings = unit("heading-outline", "Заголовки", "Headings", [
  lesson(
    "hs-h-hierarchy",
    "Ієрархія h1–h6",
    "h1–h6 hierarchy",
    2,
    false,
    [
      mcq(
        "hs-h1",
        "Найкраща практика для h1:",
        "Best practice for h1:",
        ["один чіткий h1 на сторінку (зазвичай)", "десять h1 always", "ніколи h1", "лише в footer"],
        0,
      ),
      codeOrder(
        "hs-h2",
        "Логічний outline",
        "Logical outline",
        "html",
        ["<h3>Detail</h3>", "<h1>Page</h1>", "<h2>Section</h2>"],
        ["<h1>Page</h1>", "<h2>Section</h2>", "<h3>Detail</h3>"],
      ),
      mcq(
        "hs-h3",
        "Стрибок h1 → h4 без h2/h3:",
        "Skipping h1 → h4 without h2/h3:",
        ["погано для outline/a11y", "обов'язково", "потрібно для CSS", "SQL rule"],
        0,
      ),
    ],
  ),
  lesson(
    "hs-h-skip",
    "Skip link intro",
    "Skip link intro",
    2,
    false,
    [
      mcq(
        "hs-h4",
        "Skip to content допомагає:",
        "Skip to content helps:",
        ["клавіатурним/screen reader users", "тільки SEO bots never users", "Redis", "chess Elo"],
        0,
      ),
      codeFill(
        "hs-h5",
        "Якір на main",
        "Anchor to main",
        "html",
        '<a href="#___">Skip</a>',
        ["main", "content"],
        false,
      ),
    ],
  ),
  exam("hs-h-exam", "Контрольна: headings", "Exam: headings", 2, [
    mcq("hs-he1", "h1 count ideally:", "h1 count ideally:", ["one primary", "unlimited mandatory", "zero", "only 6"], 0),
    codeFill("hs-he2", "h2 tag", "h2 tag", "html", "<___>Section</___>", ["h2"], true),
    mcq("hs-he3", "heading skip bad for:", "heading skip bad for:", ["a11y outline", "PNG size", "npm", "SMTP"], 0),
    mcq("hs-he4", "skip link:", "skip link:", ["jumps to main content", "deletes CSS", "runs tsc", "git push"], 0),
  ]),
]);

const textMedia = unit("text-media", "Текст і медіа", "Text & media", [
  lesson(
    "hs-tm-figure",
    "figure / figcaption",
    "figure / figcaption",
    2,
    false,
    [
      codeOrder(
        "hs-t1",
        "Figure block",
        "Figure block",
        "html",
        ["</figure>", "<figure>", "<img src=\"a.jpg\" alt=\"Chart\">", "<figcaption>Q1</figcaption>"],
        ["<figure>", "<img src=\"a.jpg\" alt=\"Chart\">", "<figcaption>Q1</figcaption>", "</figure>"],
      ),
      mcq(
        "hs-t2",
        "figcaption — це:",
        "figcaption is:",
        ["підпис до figure", "заміна alt always", "CSS property", "HTTP header"],
        0,
      ),
    ],
  ),
  lesson(
    "hs-tm-alt",
    "alt і time",
    "alt & time",
    2,
    false,
    [
      mcq(
        "hs-t3",
        "alt у img:",
        "img alt:",
        ["текстова альтернатива", "лише SEO keyword spam", "обов'язково порожній always", "CSS class"],
        0,
      ),
      codeFill(
        "hs-t4",
        "datetime на time",
        "time datetime",
        "html",
        '<time ___="2026-07-19">19 лип</time>',
        ["datetime"],
        true,
      ),
      codeFill(
        "hs-t5",
        "alt attribute",
        "alt attribute",
        "html",
        '<img src="dog.jpg" ___="A dog">',
        ["alt"],
        true,
      ),
    ],
  ),
  exam("hs-tm-exam", "Контрольна: media", "Exam: media", 2, [
    mcq("hs-te1", "figure groups:", "figure groups:", ["media + caption", "only scripts", "only meta", "SQL"], 0),
    codeFill("hs-te2", "figcaption", "figcaption", "html", "<___>Caption</___>", ["figcaption"], true),
    codeFill("hs-te3", "alt", "alt", "html", '<img src="x" ___="desc">', ["alt"], true),
    mcq("hs-te4", "time element:", "time element:", ["dates/times with machine value", "only CSS animation", "git tag", "port"], 0),
  ]),
]);

const listsTables = unit("lists-tables", "Списки і таблиці", "Lists & tables", [
  lesson(
    "hs-lt-lists",
    "ul, ol, dl",
    "ul, ol, dl",
    2,
    false,
    [
      matchEx(
        "hs-lt1",
        "Типи списків",
        "List types",
        [
          { left: "<ul>", right: "unordered" },
          { left: "<ol>", right: "ordered" },
          { left: "<dl>", right: "description list" },
        ],
      ),
      codeFill(
        "hs-lt2",
        "Пункт списку",
        "List item",
        "html",
        "<ul><___>One</___></ul>",
        ["li"],
        true,
      ),
    ],
  ),
  lesson(
    "hs-lt-tables",
    "Таблиці: th і scope",
    "Tables: th & scope",
    2,
    false,
    [
      mcq(
        "hs-lt3",
        "th краще ніж td для:",
        "th is better than td for:",
        ["заголовків рядка/колонки", "усіх даних always", "лише CSS", "scripts"],
        0,
      ),
      codeFill(
        "hs-lt4",
        "scope column",
        "scope column",
        "html",
        '<th scope="___">Name</th>',
        ["col"],
        true,
      ),
      codeRead(
        "hs-lt5",
        "caption у table:",
        "table caption:",
        "html",
        "<table><caption>Sales</caption>…</table>",
        ["назва таблиці", "заборонено", "лише CSS", "HTTP"],
        0,
      ),
    ],
  ),
  exam("hs-lt-exam", "Контрольна: lists/tables", "Exam: lists/tables", 2, [
    codeFill("hs-lte1", "li", "li", "html", "<ol><___>A</___></ol>", ["li"], true),
    mcq("hs-lte2", "ol means:", "ol means:", ["ordered list", "optional link", "object layout", "oauth"], 0),
    codeFill("hs-lte3", "th", "th", "html", "<tr><___>Col</___></tr>", ["th"], true),
    mcq("hs-lte4", "scope helps:", "scope helps:", ["a11y of table headers", "minify JS", "tsc", "redis"], 0),
  ]),
]);

const forms = unit("forms", "Форми a11y", "Accessible forms", [
  lesson(
    "hs-f-label",
    "label і for",
    "label & for",
    2,
    false,
    [
      codeOrder(
        "hs-f1",
        "Зв'язок label-input",
        "label-input link",
        "html",
        ['<input id="email" type="email">', '<label for="email">Email</label>'],
        ['<label for="email">Email</label>', '<input id="email" type="email">'],
      ),
      mcq(
        "hs-f2",
        "for на label має збігатися з:",
        "label for must match:",
        ["id інпута", "name always only", "class", "placeholder"],
        0,
      ),
    ],
  ),
  lesson(
    "hs-f-fieldset",
    "fieldset / legend",
    "fieldset / legend",
    2,
    false,
    [
      codeFill(
        "hs-f3",
        "Група полів",
        "Field group",
        "html",
        "<___><legend>Shipping</legend>…</___>",
        ["fieldset"],
        true,
      ),
      mcq(
        "hs-f4",
        "legend описує:",
        "legend describes:",
        ["fieldset group", "entire website only", "CSS grid", "git branch"],
        0,
      ),
    ],
  ),
  lesson(
    "hs-f-types",
    "input types",
    "input types",
    2,
    false,
    [
      matchEx(
        "hs-f5",
        "Типи input",
        "Input types",
        [
          { left: "email", right: "e-mail keyboard/validation hint" },
          { left: "password", right: "masked entry" },
          { left: "checkbox", right: "boolean multi" },
        ],
      ),
      codeFill(
        "hs-f6",
        "required",
        "required",
        "html",
        "<input type=\"text\" ___>",
        ["required"],
        true,
      ),
    ],
  ),
  exam("hs-f-exam", "Контрольна: forms", "Exam: forms", 2, [
    codeFill("hs-fe1", "for attr", "for attr", "html", '<label ___="n">N</label>', ["for"], true),
    mcq("hs-fe2", "fieldset:", "fieldset:", ["groups related controls", "replaces form", "CSS only", "SQL"], 0),
    codeFill("hs-fe3", "legend", "legend", "html", "<fieldset><___>Title</___></fieldset>", ["legend"], true),
    mcq("hs-fe4", "label improves:", "label improves:", ["a11y & click target", "only minify", "Elo", "Docker"], 0),
    codeFill("hs-fe5", "type email", "type email", "html", '<input type="___">', ["email"], true),
  ]),
]);

const interactive = unit("interactive", "Інтерактив", "Interactive", [
  lesson(
    "hs-i-button-a",
    "button vs a",
    "button vs a",
    2,
    false,
    [
      mcq(
        "hs-i1",
        "Для навігації на URL краще:",
        "For navigating to a URL prefer:",
        ["<a href>", "<button> always", "<div onclick> only", "<span>"],
        0,
      ),
      mcq(
        "hs-i2",
        "Для дії без зміни URL краще:",
        "For an action without URL change prefer:",
        ["<button type=\"button\">", "<a href=\"#\"> only", "plain div", "img"],
        0,
      ),
    ],
  ),
  lesson(
    "hs-i-details",
    "details / summary",
    "details / summary",
    2,
    false,
    [
      codeOrder(
        "hs-i3",
        "Disclosure widget",
        "Disclosure widget",
        "html",
        ["</details>", "<details>", "<summary>More</summary>", "<p>Hidden text</p>"],
        ["<details>", "<summary>More</summary>", "<p>Hidden text</p>", "</details>"],
      ),
      mcq(
        "hs-i4",
        "summary — це:",
        "summary is:",
        ["видимий заголовок details", "SQL aggregate only", "CSS property", "HTTP method"],
        0,
      ),
    ],
  ),
  exam("hs-i-exam", "Контрольна: interactive", "Exam: interactive", 2, [
    mcq("hs-ie1", "links use:", "links use:", ["a[href]", "button only", "meta", "title"], 0),
    mcq("hs-ie2", "actions use:", "actions use:", ["button", "only h1", "doctype", "charset"], 0),
    codeFill("hs-ie3", "summary", "summary", "html", "<details><___>Open</___></details>", ["summary"], true),
    mcq("hs-ie4", "details provides:", "details provides:", ["native disclosure", "SQL join", "tsc", "elo"], 0),
  ]),
]);

const a11y = unit("a11y-aria", "A11y / ARIA", "A11y / ARIA", [
  lesson(
    "hs-a-roles",
    "ARIA roles intro",
    "ARIA roles intro",
    3,
    false,
    [
      mcq(
        "hs-a1",
        "ARIA слід:",
        "ARIA should:",
        ["доповнювати, не заміняти семантику HTML", "заміняти всі теги div'ами", "вимикати alt", "видаляти labels"],
        0,
      ),
      codeFill(
        "hs-a2",
        "aria-label",
        "aria-label",
        "html",
        '<button ___="Close">×</button>',
        ["aria-label"],
        true,
      ),
    ],
  ),
  lesson(
    "hs-a-labelledby",
    "aria-labelledby",
    "aria-labelledby",
    3,
    false,
    [
      codeRead(
        "hs-a3",
        "labelledby вказує на:",
        "labelledby points to:",
        "html",
        '<div role="dialog" aria-labelledby="t"><h2 id="t">Edit</h2></div>',
        ["id елемента з назвою", "CSS class only", "HTTP status", "npm package"],
        0,
      ),
      mcq(
        "hs-a4",
        "First rule of ARIA:",
        "First rule of ARIA:",
        ["prefer native HTML", "always role=button on divs", "remove semantics", "no labels"],
        0,
      ),
    ],
  ),
  exam("hs-a-exam", "Контрольна: a11y", "Exam: a11y", 3, [
    mcq("hs-ae1", "Prefer:", "Prefer:", ["semantic HTML first", "ARIA-only div soup", "no alt ever", "skip labels"], 0),
    codeFill("hs-ae2", "aria-label", "aria-label", "html", '<button ___="Menu">☰</button>', ["aria-label"], true),
    mcq("hs-ae3", "labelledby uses:", "labelledby uses:", ["element id", "CSS selector only", "SQL", "port"], 0),
    mcq("hs-ae4", "icon-only button needs:", "icon-only button needs:", ["accessible name", "nothing", "doctype", "flex"], 0),
  ]),
]);

const capstone = unit("capstone", "Capstone", "Capstone", [
  lesson(
    "hs-capstone-landing",
    "Semantic landing",
    "Semantic landing",
    3,
    false,
    [
      {
        id: "hs-c1",
        type: "code_project",
        promptUk:
          "Семантичний каркас: header+nav, main з article/h1, footer. CSS .wrap { max-width }. README: landmarks.",
        promptEn:
          "Semantic shell: header+nav, main with article/h1, footer. CSS .wrap { max-width }. README: landmarks.",
        files: [
          {
            id: "html",
            name: "index.html",
            language: "html",
            starter: `<!DOCTYPE html>
<html lang="uk">
<head><meta charset="UTF-8"><title>Landing</title></head>
<body>
  <!-- TODO: header>nav, main>article>h1, footer -->
</body>
</html>`,
          },
          {
            id: "css",
            name: "styles.css",
            language: "css",
            starter: `.wrap {
  /* TODO: max-width */
}
`,
          },
          {
            id: "md",
            name: "README.md",
            language: "markdown",
            starter: `# Semantics
<!-- landmarks -->
`,
          },
        ],
        checks: [
          {
            fileId: "html",
            contains: ["<header", "<nav", "<main", "<article", "<h1", "<footer"],
          },
          { fileId: "css", contains: [".wrap", "max-width"] },
          { fileId: "md", contains: ["landmark"] },
        ],
      } as Exercise,
    ],
  ),
  exam("hs-cap-exam", "Фінальна контрольна", "Final exam", 3, [
    mcq("hs-ce1", "main is:", "main is:", ["primary content landmark", "meta", "doctype", "charset"], 0),
    codeFill("hs-ce2", "nav", "nav", "html", "<___>…</___>", ["nav"], true),
    mcq("hs-ce3", "label for matches:", "label for matches:", ["input id", "class only", "href", "src"], 0),
    mcq("hs-ce4", "article for:", "article for:", ["self-contained composition", "only CSS", "SQL row", "port"], 0),
    codeFill("hs-ce5", "alt", "alt", "html", '<img src="a" ___="desc">', ["alt"], true),
    mcq("hs-ce6", "ARIA first rule:", "ARIA first rule:", ["native HTML first", "div everything", "no headings", "skip forms"], 0),
  ]),
]);

export const htmlSemanticsContent: CourseContent = {
  slug: "html_semantics",
  titleUk: "HTML: семантика",
  titleEn: "HTML Semantics",
  descriptionUk:
    "Семантична верстка: landmarks, outline, forms a11y, media, ARIA. Контрольні після розділів.",
  descriptionEn:
    "Semantic markup: landmarks, outline, accessible forms, media, ARIA. Unit exams included.",
  icon: "🌐",
  color: "#E34F26",
  units: [
    document,
    landmarks,
    headings,
    textMedia,
    listsTables,
    forms,
    interactive,
    a11y,
    capstone,
  ],
};
