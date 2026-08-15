import type { CourseContent, Exercise, LessonContent, UnitContent } from "./types.js";

function lesson(
  slug: string,
  titleUk: string,
  titleEn: string,
  difficulty: number,
  isFree: boolean,
  exercises: Exercise[],
  baseXp = 12 + difficulty * 3,
  opts?: { isExam?: boolean; passThreshold?: number },
): LessonContent {
  return {
    slug,
    titleUk,
    titleEn,
    baseXp,
    difficulty,
    isFree,
    isExam: opts?.isExam,
    passThreshold: opts?.passThreshold,
    exercises,
  };
}

function examLesson(
  slug: string,
  titleUk: string,
  titleEn: string,
  difficulty: number,
  exercises: Exercise[],
): LessonContent {
  return lesson(slug, titleUk, titleEn, difficulty, false, exercises, 28, {
    isExam: true,
    passThreshold: 0.7,
  });
}

function unit(
  slug: string,
  titleUk: string,
  titleEn: string,
  lessons: LessonContent[],
): UnitContent {
  return { slug, titleUk, titleEn, lessons };
}

/* ——— HTML ——— */
const htmlUnit = unit("html", "HTML", "HTML", [
  lesson(
    "html-tags",
    "Теги та структура",
    "Tags & structure",
    1,
    true,
    [
      {
        id: "pr-html-1",
        type: "mcq",
        promptUk: "Який тег задає заголовок сторінки у вкладці браузера?",
        promptEn: "Which tag sets the page title in the browser tab?",
        options: ["<header>", "<title>", "<h1>", "<meta>"],
        correctIndex: 1,
      },
      {
        id: "pr-html-2",
        type: "code_fill",
        promptUk: "Заповніть тег абзацу",
        promptEn: "Fill in the paragraph tag",
        language: "html",
        code: "<___>Hello</___>",
        accepted: ["p", "P"],
        caseSensitive: false,
        explanationUk: "Тег <p> — абзац тексту.",
        explanationEn: "The <p> tag marks a paragraph.",
      },
      {
        id: "pr-html-3",
        type: "code_order",
        promptUk: "Порядок базової HTML-сторінки",
        promptEn: "Order a basic HTML page",
        language: "html",
        lines: ["</html>", "<html>", "<body></body>", "<head></head>"],
        correct: ["<html>", "<head></head>", "<body></body>", "</html>"],
      },
      {
        id: "pr-html-4",
        type: "match",
        promptUk: "Зіставте теги",
        promptEn: "Match the tags",
        pairs: [
          { left: "<a>", right: "посилання / link" },
          { left: "<img>", right: "зображення / image" },
          { left: "<ul>", right: "список / list" },
        ],
      },
    ],
  ),
  lesson(
    "html-links-images",
    "Посилання та зображення",
    "Links & images",
    1,
    true,
    [
      {
        id: "pr-html-5",
        type: "code_fill",
        promptUk: "Атрибут адреси посилання",
        promptEn: "Link address attribute",
        language: "html",
        code: '<a ___="https://example.com">Go</a>',
        accepted: ["href"],
        caseSensitive: false,
        explanationUk: "href — hypertext reference, URL посилання.",
        explanationEn: "href is the hypertext reference (URL) of the link.",
      },
      {
        id: "pr-html-6",
        type: "mcq",
        promptUk: "Обов'язковий атрибут для <img> (доступність):",
        promptEn: "Required attribute for <img> (a11y):",
        options: ["src only", "alt", "title only", "width only"],
        correctIndex: 1,
      },
      {
        id: "pr-html-7",
        type: "code_read",
        promptUk: "Що робить цей код?",
        promptEn: "What does this code do?",
        language: "html",
        code: '<a href="/about">About</a>',
        options: [
          "Кнопка submit",
          "Посилання на /about",
          "Картинка about",
          "Форма",
        ],
        correctIndex: 1,
      },
    ],
  ),
  lesson(
    "html-forms",
    "Форми",
    "Forms",
    2,
    true,
    [
      {
        id: "pr-html-8",
        type: "mcq",
        promptUk: "Тег для однорядкового поля вводу:",
        promptEn: "Tag for a single-line text field:",
        options: ["<textarea>", "<input>", "<select>", "<button>"],
        correctIndex: 1,
      },
      {
        id: "pr-html-9",
        type: "code_fill",
        promptUk: "Метод відправки форми",
        promptEn: "Form submit method",
        language: "html",
        code: '<form method="___" action="/api">…</form>',
        accepted: ["post", "POST", "get", "GET"],
        caseSensitive: false,
      },
      {
        id: "pr-html-10",
        type: "code_order",
        promptUk: "Зберіть форму логіну",
        promptEn: "Build a login form skeleton",
        language: "html",
        lines: [
          "</form>",
          '<form method="post">',
          '<input type="password" />',
          '<input type="email" />',
        ],
        correct: [
          '<form method="post">',
          '<input type="email" />',
          '<input type="password" />',
          "</form>",
        ],
      },
    ],
  ),
  lesson(
    "html-forms-polish",
    "Форми: label і button",
    "Forms: label & button",
    2,
    true,
    [
      {
        id: "pr-html-form-label",
        type: "code_fill",
        promptUk: "Зв'язок label з input через for/id",
        promptEn: "Link label to input via for/id",
        language: "html",
        code: '<label for="email">Email</label>\n<input id="___" type="email" />',
        accepted: ["email"],
        caseSensitive: false,
        explanationUk: "for і id мають збігатися для a11y.",
        explanationEn: "for and id must match for accessibility.",
      },
      {
        id: "pr-html-form-submit",
        type: "mcq",
        promptUk: "type=\"submit\" на button:",
        promptEn: "type=\"submit\" on button:",
        options: [
          "Відправляє форму",
          "Лише стилізує CSS",
          "Видаляє DOM",
          "Блокує Enter назавжди",
        ],
        correctIndex: 0,
      },
      {
        id: "pr-html-form-required",
        type: "code_fill",
        promptUk: "Обов'язкове поле",
        promptEn: "Required field",
        language: "html",
        code: '<input type="text" ___ />',
        accepted: ["required"],
        caseSensitive: false,
        explanationUk: "Атрибут required — браузерна валідація.",
        explanationEn: "The required attribute enables browser validation.",
      },
    ],
  ),
  lesson(
    "html-semantic",
    "Семантика",
    "Semantics",
    2,
    false,
    [
      {
        id: "pr-html-11",
        type: "mcq",
        promptUk: "Семантичний тег для головної навігації:",
        promptEn: "Semantic tag for main navigation:",
        options: ["<div class=\"nav\">", "<nav>", "<section>", "<aside>"],
        correctIndex: 1,
      },
      {
        id: "pr-html-12",
        type: "match",
        promptUk: "Семантичні регіони",
        promptEn: "Semantic regions",
        pairs: [
          { left: "<header>", right: "шапка" },
          { left: "<main>", right: "основний контент" },
          { left: "<footer>", right: "підвал" },
        ],
      },
      {
        id: "pr-html-13",
        type: "code_read",
        promptUk: "Який тег краще для статті блогу?",
        promptEn: "Best tag for a blog post?",
        language: "html",
        code: "<!-- choose semantic container -->",
        options: ["<div>", "<article>", "<span>", "<b>"],
        correctIndex: 1,
      },
    ],
  ),
  lesson(
    "html-depth-meta",
    "Depth: meta & a11y",
    "Depth: meta & a11y",
    2,
    false,
    [
      {
        id: "pr-html-d1",
        type: "mcq",
        promptUk: "viewport meta потрібен для:",
        promptEn: "viewport meta is for:",
        options: ["SEO only", "responsive scaling on mobile", "SQL", "Git"],
        correctIndex: 1,
      },
      {
        id: "pr-html-d2",
        type: "code_fill",
        promptUk: "lang на html",
        promptEn: "lang on html",
        language: "html",
        code: '<html lang="___">',
        accepted: ["uk", "en", "uk-UA", "en-US"],
        caseSensitive: false,
      },
      {
        id: "pr-html-d3",
        type: "code_read",
        promptUk: "role / aria допомагають:",
        promptEn: "role / aria help:",
        language: "html",
        code: '<button aria-label="Close">×</button>',
        options: ["тільки CSS", "screen readers / a11y", "Node runtime", "SQL index"],
        correctIndex: 1,
      },
    ],
  ),
  lesson(
    "html-mini-card",
    "Mini-project: Card",
    "Mini-project: Card",
    2,
    false,
    [
      {
        id: "pr-html-proj-1",
        type: "code_project",
        promptUk:
          "Збери картку: HTML з h1 «EduForge», p.lead, button; CSS з .card padding і background.",
        promptEn:
          "Build a card: HTML with h1 «EduForge», p.lead, button; CSS .card with padding and background.",
        files: [
          {
            id: "html",
            name: "index.html",
            language: "html",
            starter: `<!DOCTYPE html>
<html>
<body>
  <article class="card">
    <!-- TODO: h1 EduForge, p.lead, button -->
  </article>
</body>
</html>`,
          },
          {
            id: "css",
            name: "styles.css",
            language: "css",
            starter: `.card {
  /* TODO: padding + background */
}
`,
          },
        ],
        checks: [
          {
            fileId: "html",
            contains: ["<h1", "EduForge", "class=\"lead\"", "<button", "class=\"card\""],
          },
          {
            fileId: "css",
            contains: [".card", "padding", "background"],
          },
        ],
        hintUk: "HTML: h1 EduForge, p class=\"lead\", button. CSS: .card { padding; background }",
        hintEn: "HTML: h1 EduForge, p class=\"lead\", button. CSS: .card { padding; background }",
        explanationUk: "Multi-file checks: source contains у кожному файлі.",
        explanationEn: "Multi-file checks: required substrings per file.",
      },
      {
        id: "pr-html-proj-2",
        type: "mcq",
        promptUk: "Навіщо кілька файлів у mini-project?",
        promptEn: "Why multi-file in a mini-project?",
        options: [
          "лише для SQL",
          "розділення структури (HTML) і стилів (CSS)",
          "замість Git",
          "тільки для Docker",
        ],
        correctIndex: 1,
      },
    ],
  ),
]);

/* ——— CSS ——— */
const cssUnit = unit("css", "CSS", "CSS", [
  lesson(
    "css-selectors",
    "Селектори",
    "Selectors",
    1,
    true,
    [
      {
        id: "pr-css-1",
        type: "mcq",
        promptUk: "Селектор за класом:",
        promptEn: "Class selector:",
        options: ["#id", ".class", "element", "*class"],
        correctIndex: 1,
      },
      {
        id: "pr-css-2",
        type: "code_fill",
        promptUk: "Властивість кольору тексту",
        promptEn: "Text color property",
        language: "css",
        code: "p { ___: blue; }",
        accepted: ["color"],
        caseSensitive: false,
        explanationUk: "color задає колір тексту елемента.",
        explanationEn: "color sets the text color of the element.",
      },
      {
        id: "pr-css-3",
        type: "code_read",
        promptUk: "Що робить селектор?",
        promptEn: "What does the selector match?",
        language: "css",
        code: "button.primary { }",
        options: [
          "усі button",
          "button з класом primary",
          "елемент primary",
          "id primary",
        ],
        correctIndex: 1,
      },
    ],
  ),
  lesson(
    "css-box",
    "Box model",
    "Box model",
    2,
    true,
    [
      {
        id: "pr-css-4",
        type: "mcq",
        promptUk: "Порядок box model зсередини:",
        promptEn: "Box model order from inside:",
        options: [
          "margin → border → padding → content",
          "content → padding → border → margin",
          "padding → content → margin → border",
          "border → content → padding → margin",
        ],
        correctIndex: 1,
      },
      {
        id: "pr-css-5",
        type: "code_fill",
        promptUk: "Внутрішній відступ",
        promptEn: "Inner spacing property",
        language: "css",
        code: ".card { ___: 16px; }",
        accepted: ["padding"],
        caseSensitive: false,
        explanationUk: "padding — внутрішній відступ від краю до контенту.",
        explanationEn: "padding is the inner spacing inside the border.",
      },
      {
        id: "pr-css-6",
        type: "code_order",
        promptUk: "Порядок CSS-правила",
        promptEn: "Order a CSS rule",
        language: "css",
        lines: ["}", "color: red;", "h1 {"],
        correct: ["h1 {", "color: red;", "}"],
      },
    ],
  ),
  lesson(
    "css-flex",
    "Flexbox",
    "Flexbox",
    2,
    false,
    [
      {
        id: "pr-css-7",
        type: "code_fill",
        promptUk: "Увімкнути flex-контейнер",
        promptEn: "Enable flex container",
        language: "css",
        code: ".row { display: ___; }",
        accepted: ["flex"],
        caseSensitive: false,
      },
      {
        id: "pr-css-8",
        type: "mcq",
        promptUk: "Вирівняти по головній осі (горизонтально за замовч.):",
        promptEn: "Align on main axis (default horizontal):",
        options: ["align-items", "justify-content", "flex-wrap", "order"],
        correctIndex: 1,
      },
      {
        id: "pr-css-9",
        type: "code_output",
        promptUk: "Скільки колонок при flex-direction: row і 3 children?",
        promptEn: "How many columns with flex-direction: row and 3 children?",
        language: "css",
        code: ".row { display: flex; flex-direction: row; }",
        options: ["1", "3", "0", "залежить від height"],
        correctIndex: 1,
      },
    ],
  ),
  lesson(
    "css-colors",
    "Кольори та фон",
    "Colors & background",
    1,
    false,
    [
      {
        id: "pr-css-10",
        type: "match",
        promptUk: "Властивості",
        promptEn: "Properties",
        pairs: [
          { left: "background-color", right: "колір фону" },
          { left: "border-radius", right: "заокруглення" },
          { left: "opacity", right: "прозорість" },
        ],
      },
      {
        id: "pr-css-11",
        type: "code_fill",
        promptUk: "HEX для чорного",
        promptEn: "HEX for black",
        language: "css",
        code: "color: #___;",
        accepted: ["000", "000000"],
        caseSensitive: false,
      },
    ],
  ),
  lesson(
    "css-depth-responsive",
    "Depth: media queries",
    "Depth: media queries",
    3,
    false,
    [
      {
        id: "pr-css-d1",
        type: "code_fill",
        promptUk: "Media query keyword",
        promptEn: "Media query keyword",
        language: "css",
        code: "@___ (max-width: 600px) { .nav { display: none; } }",
        accepted: ["media"],
        caseSensitive: false,
      },
      {
        id: "pr-css-d2",
        type: "mcq",
        promptUk: "mobile-first означає:",
        promptEn: "mobile-first means:",
        options: [
          "лише desktop CSS",
          "базові стилі для small, потім min-width up",
          "без media queries",
          "тільки print",
        ],
        correctIndex: 1,
      },
      {
        id: "pr-css-d3",
        type: "code_read",
        promptUk: "Що робить max-width: 100% на img?",
        promptEn: "What does max-width: 100% on img do?",
        language: "css",
        code: "img { max-width: 100%; height: auto; }",
        options: ["ламає layout", "не дає вилізти за контейнер", "фіксує 100px", "прибирає alt"],
        correctIndex: 1,
      },
    ],
  ),
  lesson(
    "css-mini-hero",
    "Mini-project: Hero",
    "Mini-project: Hero",
    2,
    false,
    [
      {
        id: "pr-css-proj-1",
        type: "code_project",
        promptUk:
          "Hero-блок: section.hero з h1 і p; CSS: .hero flex, center, min-height 200px, background.",
        promptEn:
          "Hero block: section.hero with h1 and p; CSS: .hero flex, center, min-height 200px, background.",
        files: [
          {
            id: "html",
            name: "index.html",
            language: "html",
            starter: `<!DOCTYPE html>
<html>
<body>
  <!-- TODO: section.hero > h1 + p -->
</body>
</html>`,
          },
          {
            id: "css",
            name: "styles.css",
            language: "css",
            starter: `.hero {
  /* TODO: flex center + min-height + background */
}
`,
          },
        ],
        checks: [
          {
            fileId: "html",
            contains: ["<section", 'class="hero"', "<h1", "<p"],
          },
          {
            fileId: "css",
            contains: [
              ".hero",
              "display: flex",
              "justify-content",
              "align-items",
              "min-height",
              "background",
            ],
          },
        ],
        hintUk: ".hero { display: flex; justify-content: center; align-items: center; min-height: 200px; background: … }",
        hintEn: ".hero { display: flex; justify-content: center; align-items: center; min-height: 200px; background: … }",
      },
    ],
  ),
]);

/* ——— JS ——— */
const jsUnit = unit("js", "JavaScript", "JavaScript", [
  lesson(
    "js-vars",
    "Змінні та типи",
    "Variables & types",
    1,
    true,
    [
      {
        id: "pr-js-1",
        type: "mcq",
        promptUk: "Сучасне оголошення змінної, яку можна переприсвоїти:",
        promptEn: "Modern reassignable variable declaration:",
        options: ["var only", "let", "const only", "define"],
        correctIndex: 1,
      },
      {
        id: "pr-js-2",
        type: "code_output",
        promptUk: "Що виведе console.log?",
        promptEn: "What does console.log print?",
        language: "js",
        code: "const x = 2 + 3;\nconsole.log(x);",
        options: ["23", "5", "undefined", "x"],
        correctIndex: 1,
      },
      {
        id: "pr-js-3",
        type: "code_fill",
        promptUk: "Тип через typeof \"hi\"",
        promptEn: "typeof \"hi\" result",
        language: "js",
        code: 'typeof "hi" === "___"',
        accepted: ["string"],
        caseSensitive: true,
      },
    ],
  ),
  lesson(
    "js-functions",
    "Функції",
    "Functions",
    2,
    true,
    [
      {
        id: "pr-js-4",
        type: "code_order",
        promptUk: "Зберіть функцію sum",
        promptEn: "Build function sum",
        language: "js",
        lines: ["}", "function sum(a, b) {", "return a + b;"],
        correct: ["function sum(a, b) {", "return a + b;", "}"],
      },
      {
        id: "pr-js-5",
        type: "code_output",
        promptUk: "Результат виклику",
        promptEn: "Call result",
        language: "js",
        code: "const f = (n) => n * 2;\nconsole.log(f(4));",
        options: ["8", "4", "24", "undefined"],
        correctIndex: 0,
      },
      {
        id: "pr-js-6",
        type: "mcq",
        promptUk: "Arrow function — це:",
        promptEn: "An arrow function is:",
        options: ["тільки class", "короткий синтаксис функції", "HTML тег", "CSS rule"],
        correctIndex: 1,
      },
    ],
  ),
  lesson(
    "js-arrays",
    "Масиви",
    "Arrays",
    2,
    false,
    [
      {
        id: "pr-js-7",
        type: "code_output",
        promptUk: "Довжина масиву",
        promptEn: "Array length",
        language: "js",
        code: "const a = [1, 2, 3];\nconsole.log(a.length);",
        options: ["2", "3", "1", "0"],
        correctIndex: 1,
      },
      {
        id: "pr-js-8",
        type: "code_fill",
        promptUk: "Метод додати в кінець",
        promptEn: "Method to append",
        language: "js",
        code: "arr.___(42);",
        accepted: ["push"],
        caseSensitive: true,
      },
      {
        id: "pr-js-9",
        type: "mcq",
        promptUk: "arr.map(fn) повертає:",
        promptEn: "arr.map(fn) returns:",
        options: ["undefined", "новий масив", "число", "boolean"],
        correctIndex: 1,
      },
    ],
  ),
  lesson(
    "js-map-filter",
    "map & filter",
    "map & filter",
    2,
    true,
    [
      {
        id: "pr-js-map-1",
        type: "code_fill",
        promptUk: "Помножити кожен елемент на 2",
        promptEn: "Double each element",
        language: "js",
        code: "const doubled = nums.___(n => n * 2);",
        accepted: ["map"],
        caseSensitive: true,
        explanationUk: "map створює новий масив тієї ж довжини.",
        explanationEn: "map builds a new array of the same length.",
      },
      {
        id: "pr-js-map-2",
        type: "code_fill",
        promptUk: "Лишити лише парні",
        promptEn: "Keep only even numbers",
        language: "js",
        code: "const evens = nums.___(n => n % 2 === 0);",
        accepted: ["filter"],
        caseSensitive: true,
        explanationUk: "filter залишає елементи, де callback → true.",
        explanationEn: "filter keeps items where the callback returns true.",
      },
      {
        id: "pr-js-map-3",
        type: "code_output",
        promptUk: "Що виведе код?",
        promptEn: "What does this print?",
        language: "js",
        code: "console.log([1,2,3].map(x => x + 1).join(','));",
        options: ["2,3,4", "1,2,3", "6", "undefined"],
        correctIndex: 0,
      },
      {
        id: "pr-js-map-4",
        type: "mcq",
        promptUk: "map vs forEach:",
        promptEn: "map vs forEach:",
        options: [
          "map повертає новий масив; forEach — undefined",
          "forEach завжди швидший і повертає масив",
          "обидва змінюють довжину DOM",
          "map працює лише з рядками",
        ],
        correctIndex: 0,
      },
    ],
  ),
  lesson(
    "js-dom",
    "DOM intro",
    "DOM intro",
    2,
    false,
    [
      {
        id: "pr-js-10",
        type: "code_fill",
        promptUk: "Знайти елемент за id",
        promptEn: "Select element by id",
        language: "js",
        code: 'document.getElementById("___")',
        accepted: ["app", "root", "main"],
        caseSensitive: false,
      },
      {
        id: "pr-js-11",
        type: "mcq",
        promptUk: "textContent змінює:",
        promptEn: "textContent changes:",
        options: ["CSS only", "текстовий вміст вузла", "URL сторінки", "cookies"],
        correctIndex: 1,
      },
      {
        id: "pr-js-12",
        type: "code_read",
        promptUk: "Що робить addEventListener?",
        promptEn: "What does addEventListener do?",
        language: "js",
        code: 'btn.addEventListener("click", handler);',
        options: [
          "Видаляє кнопку",
          "Підписує обробник на клік",
          "Створює CSS",
          "Fetch API",
        ],
        correctIndex: 1,
      },
    ],
  ),
  lesson(
    "js-depth-async",
    "Depth: promises",
    "Depth: promises",
    3,
    false,
    [
      {
        id: "pr-js-d1",
        type: "mcq",
        promptUk: "Promise може бути в стані:",
        promptEn: "A Promise can be:",
        options: ["only resolved", "pending / fulfilled / rejected", "compiled", "SQL"],
        correctIndex: 1,
      },
      {
        id: "pr-js-d2",
        type: "code_output",
        promptUk: "Порядок логів",
        promptEn: "Log order",
        language: "js",
        code: `console.log(1);
Promise.resolve().then(() => console.log(2));
console.log(3);`,
        options: ["1 2 3", "1 3 2", "2 1 3", "3 2 1"],
        correctIndex: 1,
      },
      {
        id: "pr-js-d3",
        type: "code_fill",
        promptUk: "Очікування promise",
        promptEn: "Await a promise",
        language: "js",
        code: "const data = ___ fetch(url);",
        accepted: ["await"],
        caseSensitive: true,
      },
    ],
  ),
  lesson(
    "js-mini-counter",
    "Mini-project: Counter",
    "Mini-project: Counter",
    3,
    false,
    [
      {
        id: "pr-js-proj-1",
        type: "code_project",
        promptUk:
          "HTML: #count і button#inc. CSS: #count font-size. JS: click → count++ і textContent.",
        promptEn:
          "HTML: #count and button#inc. CSS: #count font-size. JS: click → count++ and textContent.",
        files: [
          {
            id: "html",
            name: "index.html",
            language: "html",
            starter: `<!DOCTYPE html>
<html>
<body>
  <!-- TODO: span#count, button#inc -->
  <script src="main.js"></script>
</body>
</html>`,
          },
          {
            id: "css",
            name: "styles.css",
            language: "css",
            starter: `/* TODO style #count */
`,
          },
          {
            id: "js",
            name: "main.js",
            language: "javascript",
            starter: `// TODO: click on #inc increments #count
`,
          },
        ],
        checks: [
          {
            fileId: "html",
            contains: ['id="count"', 'id="inc"', "<button"],
          },
          {
            fileId: "css",
            contains: ["#count", "font-size"],
          },
          {
            fileId: "js",
            contains: [
              "getElementById",
              "addEventListener",
              "click",
              "textContent",
            ],
          },
        ],
        hintUk: "document.getElementById('inc').addEventListener('click', …); countEl.textContent = …",
        hintEn: "document.getElementById('inc').addEventListener('click', …); countEl.textContent = …",
      },
    ],
  ),
]);

/* ——— TypeScript ——— */
const typescriptUnit = unit("typescript", "TypeScript", "TypeScript", [
  lesson(
    "ts-basics",
    "Типи basics",
    "Types basics",
    2,
    true,
    [
      {
        id: "pr-ts-1",
        type: "mcq",
        promptUk: "TypeScript компілюється в:",
        promptEn: "TypeScript compiles to:",
        options: ["Python", "JavaScript", "Rust", "SQL"],
        correctIndex: 1,
      },
      {
        id: "pr-ts-2",
        type: "code_fill",
        promptUk: "Анотація типу number",
        promptEn: "Number type annotation",
        language: "ts",
        code: "let n: ___ = 1;",
        accepted: ["number"],
        caseSensitive: true,
      },
      {
        id: "pr-ts-3",
        type: "code_read",
        promptUk: "Що не так з цим кодом (строго)?",
        promptEn: "What's wrong (strictly)?",
        language: "ts",
        code: 'const s: string = 42;',
        options: ["OK", "number не assignable to string", "syntax error only", "runtime crash always"],
        correctIndex: 1,
      },
    ],
  ),
  lesson(
    "ts-interfaces",
    "Interface & type",
    "Interface & type",
    2,
    false,
    [
      {
        id: "pr-ts-4",
        type: "code_order",
        promptUk: "Оголошення interface",
        promptEn: "Declare interface",
        language: "ts",
        lines: ["}", "interface User {", "id: string;"],
        correct: ["interface User {", "id: string;", "}"],
      },
      {
        id: "pr-ts-5",
        type: "mcq",
        promptUk: "optional поле в interface:",
        promptEn: "Optional field in interface:",
        options: ["name!", "name?", "name*", "name~"],
        correctIndex: 1,
      },
      {
        id: "pr-ts-6",
        type: "code_fill",
        promptUk: "Масив рядків",
        promptEn: "Array of strings",
        language: "ts",
        code: "const tags: ___[] = [];",
        accepted: ["string"],
        caseSensitive: true,
      },
    ],
  ),
  lesson(
    "ts-generics-intro",
    "Generics intro",
    "Generics intro",
    3,
    false,
    [
      {
        id: "pr-ts-7",
        type: "mcq",
        promptUk: "Generics дозволяють:",
        promptEn: "Generics allow:",
        options: [
          "тільки CSS",
          "параметризовані типи",
          "замінити git",
          "виконати SQL",
        ],
        correctIndex: 1,
      },
      {
        id: "pr-ts-8",
        type: "code_read",
        promptUk: "Що повертає identity?",
        promptEn: "What does identity return?",
        language: "ts",
        code: "function id<T>(x: T): T { return x; }",
        options: ["завжди string", "той самий тип T", "void", "any only"],
        correctIndex: 1,
      },
    ],
  ),
  lesson(
    "ts-depth-union",
    "Depth: unions & narrowing",
    "Depth: unions & narrowing",
    3,
    false,
    [
      {
        id: "pr-ts-d1",
        type: "code_fill",
        promptUk: "Union type",
        promptEn: "Union type",
        language: "ts",
        code: "type Id = string ___ number;",
        accepted: ["|"],
        caseSensitive: true,
      },
      {
        id: "pr-ts-d2",
        type: "mcq",
        promptUk: "typeof x === 'string' у TS:",
        promptEn: "typeof x === 'string' in TS:",
        options: ["видаляє x", "звужує тип (narrowing)", "запускає SQL", "disable strict"],
        correctIndex: 1,
      },
    ],
  ),
  lesson(
    "ts-mini-types",
    "Mini-project: typed util",
    "Mini-project: typed util",
    3,
    false,
    [
      {
        id: "pr-ts-proj-1",
        type: "code_project",
        promptUk:
          "TS util: interface User { id: number; name: string }, function greet(u: User): string. + README з типом.",
        promptEn:
          "TS util: interface User { id: number; name: string }, function greet(u: User): string. + README about types.",
        files: [
          {
            id: "ts",
            name: "greet.ts",
            language: "typescript",
            starter: `// TODO: interface User + greet(u: User): string
export {};
`,
          },
          {
            id: "md",
            name: "README.md",
            language: "markdown",
            starter: `# Types
<!-- TODO: mention interface and string return -->
`,
          },
        ],
        checks: [
          {
            fileId: "ts",
            contains: [
              "interface User",
              "id:",
              "name:",
              "function greet",
              "User",
              "string",
            ],
          },
          {
            fileId: "md",
            contains: ["interface", "string"],
          },
        ],
        hintUk: "interface User { id: number; name: string } · function greet(u: User): string",
        hintEn: "interface User { id: number; name: string } · function greet(u: User): string",
      },
    ],
  ),
]);

/* ——— React ——— */
const reactUnit = unit("react", "React", "React", [
  lesson(
    "react-components",
    "Компоненти",
    "Components",
    2,
    true,
    [
      {
        id: "pr-re-1",
        type: "mcq",
        promptUk: "React-компонент — це зазвичай:",
        promptEn: "A React component is usually:",
        options: ["SQL table", "функція, що повертає UI", "CSS file", "nginx config"],
        correctIndex: 1,
      },
      {
        id: "pr-re-2",
        type: "code_read",
        promptUk: "Що рендерить компонент?",
        promptEn: "What does this render?",
        language: "jsx",
        code: "function Hi() {\n  return <h1>Hello</h1>;\n}",
        options: ["нічого", "заголовок Hello", "помилку", "JSON"],
        correctIndex: 1,
      },
      {
        id: "pr-re-3",
        type: "code_fill",
        promptUk: "Імпорт React (сучасний JSX transform часто без нього, але класика):",
        promptEn: "Classic React import name",
        language: "js",
        code: 'import ___ from "react";',
        accepted: ["React"],
        caseSensitive: true,
      },
    ],
  ),
  lesson(
    "react-props",
    "Props",
    "Props",
    2,
    false,
    [
      {
        id: "pr-re-4",
        type: "code_output",
        promptUk: "Текст на екрані",
        promptEn: "On-screen text",
        language: "jsx",
        code: "function G({ name }) {\n  return <p>{name}</p>;\n}\n// <G name=\"Ada\" />",
        options: ["name", "Ada", "{name}", "undefined"],
        correctIndex: 1,
      },
      {
        id: "pr-re-5",
        type: "mcq",
        promptUk: "Props у React:",
        promptEn: "Props in React are:",
        options: ["mutable global state", "read-only inputs to components", "CSS only", "DB rows"],
        correctIndex: 1,
      },
      {
        id: "pr-re-6",
        type: "code_order",
        promptUk: "Компонент з props",
        promptEn: "Component with props",
        language: "jsx",
        lines: ["}", "function Card({ title }) {", "return <h2>{title}</h2>;"],
        correct: ["function Card({ title }) {", "return <h2>{title}</h2>;", "}"],
      },
    ],
  ),
  lesson(
    "react-state",
    "State (useState)",
    "State (useState)",
    3,
    false,
    [
      {
        id: "pr-re-7",
        type: "code_fill",
        promptUk: "Hook для локального стану",
        promptEn: "Hook for local state",
        language: "js",
        code: "const [n, setN] = ___(0);",
        accepted: ["useState"],
        caseSensitive: true,
      },
      {
        id: "pr-re-8",
        type: "mcq",
        promptUk: "Після setCount(c => c+1) React:",
        promptEn: "After setCount(c => c+1) React will:",
        options: [
          "ніколи не оновить UI",
          "запланувати re-render",
          "видалити компонент",
          "змінити props батька",
        ],
        correctIndex: 1,
      },
      {
        id: "pr-re-9",
        type: "code_read",
        promptUk: "Навіщо key у списках?",
        promptEn: "Why key in lists?",
        language: "jsx",
        code: "items.map(i => <li key={i.id}>{i.name}</li>)",
        options: [
          "для CSS",
          "стабільна ідентичність елементів",
          "замість id в HTML",
          "для SQL",
        ],
        correctIndex: 1,
      },
    ],
  ),
  lesson(
    "react-capstone",
    "Capstone: UI checklist",
    "Capstone: UI checklist",
    3,
    false,
    [
      {
        id: "pr-re-cap-1",
        type: "mcq",
        promptUk: "Мінімальний frontend stack з path:",
        promptEn: "Minimal frontend stack from the path:",
        options: ["HTML only", "HTML + CSS + JS + React", "SQL only", "nginx only"],
        correctIndex: 1,
      },
      {
        id: "pr-re-cap-2",
        type: "match",
        promptUk: "Шар відповідальності",
        promptEn: "Layer ownership",
        pairs: [
          { left: "HTML", right: "структура" },
          { left: "CSS", right: "вигляд" },
          { left: "React state", right: "динаміка UI" },
        ],
      },
      {
        id: "pr-re-cap-3",
        type: "code_order",
        promptUk: "Типовий порядок роботи над UI",
        promptEn: "Typical UI work order",
        language: "text",
        lines: ["додати styles", "розмітка HTML/JSX", "поведінка / state"],
        correct: ["розмітка HTML/JSX", "додати styles", "поведінка / state"],
      },
    ],
  ),
  lesson(
    "react-depth-effects",
    "Depth: useEffect",
    "Depth: useEffect",
    3,
    false,
    [
      {
        id: "pr-re-d1",
        type: "mcq",
        promptUk: "useEffect запускається:",
        promptEn: "useEffect runs:",
        options: [
          "тільки на server",
          "після render (за deps)",
          "замість JSX",
          "перед CSS parse",
        ],
        correctIndex: 1,
      },
      {
        id: "pr-re-d2",
        type: "code_fill",
        promptUk: "Порожній deps — mount once",
        promptEn: "Empty deps — mount once",
        language: "js",
        code: "useEffect(() => { fetchData(); }, ___);",
        accepted: ["[]"],
        caseSensitive: true,
      },
      {
        id: "pr-re-d3",
        type: "code_read",
        promptUk: "cleanup return у useEffect:",
        promptEn: "cleanup return in useEffect:",
        language: "javascript",
        code: "useEffect(() => {\n  const id = setInterval(fn, 1000);\n  return () => clearInterval(id);\n}, []);",
        options: [
          "SQL trigger",
          "cleanup on unmount / deps change",
          "CSS reset",
          "git hook",
        ],
        correctIndex: 1,
      },
    ],
  ),
  lesson(
    "react-mini-toggle",
    "Mini-project: Toggle",
    "Mini-project: Toggle",
    3,
    false,
    [
      {
        id: "pr-re-proj-1",
        type: "code_project",
        promptUk:
          "React Toggle: useState, button onClick, умовний текст On/Off. (source checks — без live React runtime)",
        promptEn:
          "React Toggle: useState, button onClick, conditional On/Off text. (source checks — no live React runtime)",
        files: [
          {
            id: "jsx",
            name: "Toggle.jsx",
            language: "javascript",
            starter: `import { useState } from "react";

export function Toggle() {
  // TODO: const [on, setOn] = useState(false)
  // button toggles; show "On" or "Off"
  return null;
}
`,
          },
          {
            id: "css",
            name: "toggle.css",
            language: "css",
            starter: `.toggle {
  /* TODO: padding + border-radius */
}
`,
          },
        ],
        checks: [
          {
            fileId: "jsx",
            contains: [
              "useState",
              "export function Toggle",
              "onClick",
              "setOn",
              "On",
              "Off",
            ],
          },
          {
            fileId: "css",
            contains: [".toggle", "padding", "border-radius"],
          },
        ],
        explanationUk:
          "Preview CSS частково; JSX перевіряється source contains (не бандлимо React у sandbox).",
        explanationEn:
          "CSS may preview; JSX is graded via source contains (no React bundle in sandbox).",
      },
    ],
  ),
]);

/* ——— Git ——— */
const gitUnit = unit("git", "Git", "Git", [
  lesson(
    "git-basics",
    "init / status / commit",
    "init / status / commit",
    1,
    true,
    [
      {
        id: "pr-git-1",
        type: "code_fill",
        promptUk: "Ініціалізація репозиторію",
        promptEn: "Initialize repository",
        language: "bash",
        code: "git ___",
        accepted: ["init"],
        caseSensitive: false,
      },
      {
        id: "pr-git-2",
        type: "mcq",
        promptUk: "git status показує:",
        promptEn: "git status shows:",
        options: ["тільки remote URL", "стан working tree / stage", "CPU load", "Docker logs"],
        correctIndex: 1,
      },
      {
        id: "pr-git-3",
        type: "code_order",
        promptUk: "Перший commit",
        promptEn: "First commit flow",
        language: "bash",
        lines: ['git commit -m "init"', "git add .", "git init"],
        correct: ["git init", "git add .", 'git commit -m "init"'],
      },
    ],
  ),
  lesson(
    "git-branch",
    "Branches & merge",
    "Branches & merge",
    2,
    false,
    [
      {
        id: "pr-git-4",
        type: "code_fill",
        promptUk: "Створити гілку feature",
        promptEn: "Create branch feature",
        language: "bash",
        code: "git branch ___",
        accepted: ["feature"],
        caseSensitive: false,
      },
      {
        id: "pr-git-5",
        type: "mcq",
        promptUk: "merge — це:",
        promptEn: "merge is:",
        options: [
          "видалення remote",
          "об'єднання історії гілок",
          "npm publish",
          "CSS minify",
        ],
        correctIndex: 1,
      },
      {
        id: "pr-git-6",
        type: "match",
        promptUk: "Команди",
        promptEn: "Commands",
        pairs: [
          { left: "git pull", right: "забрати + злити remote" },
          { left: "git push", right: "відправити commits" },
          { left: "git clone", right: "скопіювати репо" },
        ],
      },
    ],
  ),
  lesson(
    "git-collab",
    "PR workflow",
    "PR workflow",
    2,
    false,
    [
      {
        id: "pr-git-7",
        type: "mcq",
        promptUk: "Pull Request потрібен щоб:",
        promptEn: "A Pull Request is for:",
        options: [
          "компіляції CSS",
          "огляд змін перед merge",
          "заміни SQL",
          "видалення Node",
        ],
        correctIndex: 1,
      },
      {
        id: "pr-git-8",
        type: "code_read",
        promptUk: "Конфлікт merge означає:",
        promptEn: "A merge conflict means:",
        language: "text",
        code: "<<<<<<< HEAD\nA\n=======\nB\n>>>>>>> branch",
        options: [
          "успішний deploy",
          "різні зміни в тих самих рядках",
          "помилка TypeScript",
          "брак RAM",
        ],
        correctIndex: 1,
      },
    ],
  ),
  lesson(
    "git-depth-rebase",
    "Depth: rebase vs merge",
    "Depth: rebase vs merge",
    3,
    false,
    [
      {
        id: "pr-git-d1",
        type: "mcq",
        promptUk: "git rebase зазвичай:",
        promptEn: "git rebase typically:",
        options: [
          "видаляє remote",
          "переносить commits на нову базу",
          "компілює TS",
          "DROP DATABASE",
        ],
        correctIndex: 1,
      },
      {
        id: "pr-git-d2",
        type: "match",
        promptUk: "Порівняння",
        promptEn: "Compare",
        pairs: [
          { left: "merge", right: "зберігає історію гілок" },
          { left: "rebase", right: "лінійніша історія" },
          { left: "cherry-pick", right: "один commit" },
        ],
      },
    ],
  ),
  lesson(
    "git-mini-commit",
    "Mini-project: Commit flow",
    "Mini-project: Commit flow",
    2,
    false,
    [
      {
        id: "pr-git-proj-1",
        type: "code_project",
        promptUk:
          "Склади bash-скрипт commit flow: git status, git add ., git commit -m \"feat: card\".",
        promptEn:
          "Write a bash commit-flow script: git status, git add ., git commit -m \"feat: card\".",
        files: [
          {
            id: "sh",
            name: "commit.sh",
            language: "bash",
            starter: `#!/usr/bin/env bash
# TODO: status → add → commit
`,
          },
          {
            id: "md",
            name: "NOTES.md",
            language: "markdown",
            starter: `# Notes
# TODO: mention branch and PR
`,
          },
        ],
        checks: [
          {
            fileId: "sh",
            contains: ["git status", "git add", "git commit", "feat:"],
          },
          {
            fileId: "md",
            contains: ["branch", "PR"],
          },
        ],
        hintUk: "git status; git add .; git commit -m \"feat: card\" · NOTES: branch + PR",
        hintEn: "git status; git add .; git commit -m \"feat: card\" · NOTES: branch + PR",
      },
    ],
  ),
]);

/* ——— Node ——— */
const nodeUnit = unit("node", "Node.js", "Node.js", [
  lesson(
    "node-intro",
    "Що таке Node",
    "What is Node",
    2,
    true,
    [
      {
        id: "pr-no-1",
        type: "mcq",
        promptUk: "Node.js — це:",
        promptEn: "Node.js is:",
        options: [
          "браузерний CSS framework",
          "JS runtime поза браузером",
          "SQL база",
          "графічний редактор",
        ],
        correctIndex: 1,
      },
      {
        id: "pr-no-2",
        type: "code_output",
        promptUk: "Що надрукує скрипт?",
        promptEn: "What prints?",
        language: "js",
        code: "console.log(typeof process);",
        options: ["undefined", "object", "string", "number"],
        correctIndex: 1,
      },
      {
        id: "pr-no-3",
        type: "code_fill",
        promptUk: "Запуск файлу app.js",
        promptEn: "Run app.js",
        language: "bash",
        code: "___ app.js",
        accepted: ["node"],
        caseSensitive: false,
      },
    ],
  ),
  lesson(
    "node-modules",
    "Модулі",
    "Modules",
    2,
    false,
    [
      {
        id: "pr-no-4",
        type: "mcq",
        promptUk: "CommonJS імпорт:",
        promptEn: "CommonJS import:",
        options: ["import x from 'x'", "require('x')", "include x", "using x"],
        correctIndex: 1,
      },
      {
        id: "pr-no-5",
        type: "code_fill",
        promptUk: "Експорт у CommonJS",
        promptEn: "CommonJS export",
        language: "js",
        code: "module.exports = ___;",
        accepted: ["fn", "app", "{}"],
        caseSensitive: false,
      },
      {
        id: "pr-no-6",
        type: "code_read",
        promptUk: "package.json описує:",
        promptEn: "package.json describes:",
        language: "json",
        code: '{ "name": "app", "dependencies": {} }',
        options: ["тільки CSS", "метадані й залежності проєкту", "HTML layout", "Docker image"],
        correctIndex: 1,
      },
    ],
  ),
  lesson(
    "node-async",
    "Async intro",
    "Async intro",
    3,
    false,
    [
      {
        id: "pr-no-7",
        type: "mcq",
        promptUk: "async function повертає:",
        promptEn: "async function returns:",
        options: ["string always", "Promise", "null", "Thread"],
        correctIndex: 1,
      },
      {
        id: "pr-no-8",
        type: "code_order",
        promptUk: "Порядок async/await",
        promptEn: "async/await order",
        language: "js",
        lines: ["}", "async function load() {", "const data = await fetch(url);"],
        correct: ["async function load() {", "const data = await fetch(url);", "}"],
      },
    ],
  ),
  lesson(
    "node-depth-env",
    "Depth: env & process",
    "Depth: env & process",
    2,
    false,
    [
      {
        id: "pr-no-d1",
        type: "code_fill",
        promptUk: "Читання env PORT",
        promptEn: "Read env PORT",
        language: "js",
        code: "const port = process.___.PORT || 3000;",
        accepted: ["env"],
        caseSensitive: true,
      },
      {
        id: "pr-no-d2",
        type: "mcq",
        promptUk: ".env файли зазвичай:",
        promptEn: ".env files are usually:",
        options: [
          "комітять у public git always",
          "не в git (secrets) + приклад .env.example",
          "CSS only",
          "SQL dumps",
        ],
        correctIndex: 1,
      },
      {
        id: "pr-no-d3",
        type: "code_read",
        promptUk: "process.cwd() повертає:",
        promptEn: "process.cwd() returns:",
        language: "js",
        code: "console.log(process.cwd());",
        options: ["CPU model", "current working directory", "git remote", "React root"],
        correctIndex: 1,
      },
    ],
  ),
  lesson(
    "node-mini-server",
    "Mini-project: tiny server",
    "Mini-project: tiny server",
    3,
    false,
    [
      {
        id: "pr-no-proj-1",
        type: "code_project",
        promptUk:
          "Скелет HTTP-сервера: createServer, listen(PORT), process.env.PORT. + package.json scripts.",
        promptEn:
          "HTTP server skeleton: createServer, listen(PORT), process.env.PORT. + package.json scripts.",
        files: [
          {
            id: "js",
            name: "server.js",
            language: "javascript",
            starter: `// TODO: http.createServer + listen
`,
          },
          {
            id: "json",
            name: "package.json",
            language: "json",
            starter: `{
  "name": "mini-server",
  "scripts": {}
}
`,
          },
        ],
        checks: [
          {
            fileId: "js",
            contains: [
              "createServer",
              "listen",
              "process.env",
              "PORT",
            ],
          },
          {
            fileId: "json",
            contains: ['"start"', "server.js"],
          },
        ],
        hintUk: "http.createServer(...).listen(process.env.PORT || 3000) · scripts.start: node server.js",
        hintEn: "http.createServer(...).listen(process.env.PORT || 3000) · scripts.start: node server.js",
      },
    ],
  ),
]);

/* ——— Express ——— */
const expressUnit = unit("express", "Express", "Express", [
  lesson(
    "express-routes",
    "Маршрути",
    "Routes",
    2,
    true,
    [
      {
        id: "pr-ex-1",
        type: "code_fill",
        promptUk: "Створити Express app",
        promptEn: "Create Express app",
        language: "js",
        code: "const app = ___();",
        accepted: ["express"],
        caseSensitive: true,
      },
      {
        id: "pr-ex-2",
        type: "mcq",
        promptUk: "app.get('/health', …) обробляє:",
        promptEn: "app.get('/health', …) handles:",
        options: ["POST only", "GET /health", "WebSocket", "SQL SELECT"],
        correctIndex: 1,
      },
      {
        id: "pr-ex-3",
        type: "code_order",
        promptUk: "Мінімальний сервер",
        promptEn: "Minimal server",
        language: "js",
        lines: [
          "app.listen(3000);",
          "const app = express();",
          "app.get('/', (req, res) => res.send('ok'));",
        ],
        correct: [
          "const app = express();",
          "app.get('/', (req, res) => res.send('ok'));",
          "app.listen(3000);",
        ],
      },
    ],
  ),
  lesson(
    "express-middleware",
    "Middleware",
    "Middleware",
    3,
    false,
    [
      {
        id: "pr-ex-4",
        type: "mcq",
        promptUk: "Middleware має викликати next() щоб:",
        promptEn: "Middleware calls next() to:",
        options: [
          "зупинити Node",
          "передати керування далі",
          "відкрити SQL",
          "очистити CSS",
        ],
        correctIndex: 1,
      },
      {
        id: "pr-ex-5",
        type: "code_read",
        promptUk: "express.json() потрібен для:",
        promptEn: "express.json() is for:",
        language: "js",
        code: "app.use(express.json());",
        options: [
          "парсинг JSON body",
          "генерація HTML",
          "компіляція TS",
          "кеш Redis",
        ],
        correctIndex: 0,
      },
      {
        id: "pr-ex-6",
        type: "code_fill",
        promptUk: "Статус відповіді",
        promptEn: "Response status",
        language: "js",
        code: "res.status(___).json({ ok: true });",
        accepted: ["200", "201"],
        caseSensitive: true,
      },
    ],
  ),
  lesson(
    "express-rest",
    "REST basics",
    "REST basics",
    3,
    false,
    [
      {
        id: "pr-ex-7",
        type: "match",
        promptUk: "HTTP методи",
        promptEn: "HTTP methods",
        pairs: [
          { left: "GET", right: "читати" },
          { left: "POST", right: "створити" },
          { left: "DELETE", right: "видалити" },
        ],
      },
      {
        id: "pr-ex-8",
        type: "mcq",
        promptUk: "RESTful шлях ресурсу користувачів:",
        promptEn: "RESTful users resource path:",
        options: ["/getUsers", "/users", "/api_user_list.php", "/do"],
        correctIndex: 1,
      },
    ],
  ),
  lesson(
    "express-capstone",
    "Capstone: API checklist",
    "Capstone: API checklist",
    3,
    false,
    [
      {
        id: "pr-ex-cap-1",
        type: "mcq",
        promptUk: "Мінімальний backend path:",
        promptEn: "Minimal backend path:",
        options: ["HTML only", "Node + Express + SQL (+ tests)", "Photoshop", "Excel only"],
        correctIndex: 1,
      },
      {
        id: "pr-ex-cap-2",
        type: "code_order",
        promptUk: "Порядок створення endpoint",
        promptEn: "Endpoint creation order",
        language: "text",
        lines: ["перевірити status/body", "написати route handler", "описати URL + method"],
        correct: ["описати URL + method", "написати route handler", "перевірити status/body"],
      },
      {
        id: "pr-ex-cap-3",
        type: "match",
        promptUk: "Шари",
        promptEn: "Layers",
        pairs: [
          { left: "Route", right: "HTTP вхід" },
          { left: "SQL", right: "дані" },
          { left: "QA", right: "перевірка якості" },
        ],
      },
    ],
  ),
  lesson(
    "express-depth-errors",
    "Depth: error middleware",
    "Depth: error middleware",
    3,
    false,
    [
      {
        id: "pr-ex-d1",
        type: "mcq",
        promptUk: "Error middleware у Express має скільки args?",
        promptEn: "Express error middleware arity?",
        options: ["2", "3", "4 (err, req, res, next)", "1"],
        correctIndex: 2,
      },
      {
        id: "pr-ex-d2",
        type: "code_fill",
        promptUk: "HTTP 500",
        promptEn: "HTTP 500",
        language: "js",
        code: "res.status(___).json({ error: 'internal' });",
        accepted: ["500"],
        caseSensitive: true,
      },
      {
        id: "pr-ex-d3",
        type: "code_read",
        promptUk: "next(err) робить:",
        promptEn: "next(err) does:",
        language: "js",
        code: "try { ... } catch (e) { next(e); }",
        options: [
          "ігнорує помилку",
          "передає в error-handling middleware",
          "git commit",
          "CSS inject",
        ],
        correctIndex: 1,
      },
    ],
  ),
  lesson(
    "express-mini-api",
    "Mini-project: REST stub",
    "Mini-project: REST stub",
    3,
    false,
    [
      {
        id: "pr-ex-proj-1",
        type: "code_project",
        promptUk:
          "Express app: express(), app.get('/health'), app.listen. + README з curl прикладом.",
        promptEn:
          "Express app: express(), app.get('/health'), app.listen. + README with curl example.",
        files: [
          {
            id: "js",
            name: "app.js",
            language: "javascript",
            starter: `// TODO: express app + GET /health
`,
          },
          {
            id: "md",
            name: "README.md",
            language: "markdown",
            starter: `# API
<!-- TODO: curl example for /health -->
`,
          },
        ],
        checks: [
          {
            fileId: "js",
            contains: [
              "express",
              "app.get",
              "/health",
              "app.listen",
            ],
          },
          {
            fileId: "md",
            contains: ["curl", "/health"],
          },
        ],
        hintUk: "const app = express(); app.get('/health', ...); app.listen(3000)",
        hintEn: "const app = express(); app.get('/health', ...); app.listen(3000)",
      },
    ],
  ),
]);

/* ——— SQL ——— */
const sqlUnit = unit("sql", "SQL", "SQL", [
  lesson(
    "sql-select",
    "SELECT",
    "SELECT",
    1,
    true,
    [
      {
        id: "pr-sql-1",
        type: "code_fill",
        promptUk: "Вибрати всі колонки",
        promptEn: "Select all columns",
        language: "sql",
        code: "SELECT ___ FROM users;",
        accepted: ["*"],
        caseSensitive: true,
      },
      {
        id: "pr-sql-2",
        type: "mcq",
        promptUk: "WHERE використовується для:",
        promptEn: "WHERE is used to:",
        options: ["сортування", "фільтрації рядків", "створення індексу", "backup"],
        correctIndex: 1,
      },
      {
        id: "pr-sql-3",
        type: "code_order",
        promptUk: "Порядок ключових слів",
        promptEn: "Keyword order",
        language: "sql",
        lines: ["FROM users", "SELECT id, email", "WHERE active = true;"],
        correct: ["SELECT id, email", "FROM users", "WHERE active = true;"],
      },
    ],
  ),
  lesson(
    "sql-filter",
    "WHERE & ORDER",
    "WHERE & ORDER",
    2,
    false,
    [
      {
        id: "pr-sql-4",
        type: "code_fill",
        promptUk: "Сортування за ім'ям",
        promptEn: "Sort by name",
        language: "sql",
        code: "SELECT * FROM users ORDER BY name ___;",
        accepted: ["ASC", "DESC", "asc", "desc"],
        caseSensitive: false,
      },
      {
        id: "pr-sql-5",
        type: "mcq",
        promptUk: "LIMIT 10 означає:",
        promptEn: "LIMIT 10 means:",
        options: [
          "10 таблиць",
          "макс. 10 рядків у результаті",
          "10 секунд timeout",
          "10 joins",
        ],
        correctIndex: 1,
      },
      {
        id: "pr-sql-6",
        type: "code_read",
        promptUk: "Що поверне запит?",
        promptEn: "What does the query return?",
        language: "sql",
        code: "SELECT COUNT(*) FROM orders;",
        options: ["список orders", "кількість рядків", "DROP table", "JSON users"],
        correctIndex: 1,
      },
    ],
  ),
  lesson(
    "sql-join",
    "JOIN intro",
    "JOIN intro",
    3,
    false,
    [
      {
        id: "pr-sql-7",
        type: "mcq",
        promptUk: "INNER JOIN повертає:",
        promptEn: "INNER JOIN returns:",
        options: [
          "лише ліву таблицю",
          "рядки збігу з обох таблиць",
          "усі рядки завжди",
          "нічого",
        ],
        correctIndex: 1,
      },
      {
        id: "pr-sql-8",
        type: "code_fill",
        promptUk: "Ключове слово з'єднання",
        promptEn: "Join keyword",
        language: "sql",
        code: "SELECT * FROM a INNER ___ b ON a.id = b.a_id;",
        accepted: ["JOIN", "join"],
        caseSensitive: false,
      },
      {
        id: "pr-sql-9",
        type: "match",
        promptUk: "Агрегати",
        promptEn: "Aggregates",
        pairs: [
          { left: "COUNT", right: "кількість" },
          { left: "SUM", right: "сума" },
          { left: "AVG", right: "середнє" },
        ],
      },
    ],
  ),
  lesson(
    "sql-depth-group",
    "Depth: GROUP BY",
    "Depth: GROUP BY",
    3,
    false,
    [
      {
        id: "pr-sql-d1",
        type: "mcq",
        promptUk: "GROUP BY використовують щоб:",
        promptEn: "GROUP BY is used to:",
        options: [
          "сортувати файли",
          "агрегувати рядки по ключу",
          "створити CSS grid",
          "merge git",
        ],
        correctIndex: 1,
      },
      {
        id: "pr-sql-d2",
        type: "code_order",
        promptUk: "Типовий order SQL",
        promptEn: "Typical SQL clause order",
        language: "sql",
        lines: ["GROUP BY user_id", "SELECT user_id, COUNT(*)", "FROM orders"],
        correct: ["SELECT user_id, COUNT(*)", "FROM orders", "GROUP BY user_id"],
      },
      {
        id: "pr-sql-d3",
        type: "code_fill",
        promptUk: "Фільтр після агрегації",
        promptEn: "Filter after aggregation",
        language: "sql",
        code: "SELECT user_id, COUNT(*) FROM orders GROUP BY user_id ___ COUNT(*) > 1;",
        accepted: ["HAVING", "having"],
        caseSensitive: false,
      },
    ],
  ),
  lesson(
    "sql-mini-join",
    "Mini-project: JOIN query",
    "Mini-project: JOIN query",
    3,
    false,
    [
      {
        id: "pr-sql-proj-1",
        type: "code_project",
        promptUk:
          "Напиши SQL JOIN users↔orders і короткий README з поясненням INNER JOIN.",
        promptEn:
          "Write SQL JOIN users↔orders and a short README explaining INNER JOIN.",
        files: [
          {
            id: "sql",
            name: "query.sql",
            language: "sql",
            starter: `-- TODO: SELECT name, total FROM users JOIN orders ...
`,
          },
          {
            id: "md",
            name: "README.md",
            language: "markdown",
            starter: `# JOIN
<!-- TODO: explain INNER JOIN -->
`,
          },
        ],
        checks: [
          {
            fileId: "sql",
            contains: ["SELECT", "FROM", "JOIN", "users", "orders", "ON"],
          },
          {
            fileId: "md",
            contains: ["INNER JOIN"],
          },
        ],
        hintUk: "SELECT u.name, o.total FROM users u JOIN orders o ON u.id = o.user_id",
        hintEn: "SELECT u.name, o.total FROM users u JOIN orders o ON u.id = o.user_id",
      },
    ],
  ),
]);

/* ——— QA ——— */
const qaUnit = unit("qa", "QA", "QA", [
  lesson(
    "qa-pyramid",
    "Піраміда тестів",
    "Test pyramid",
    1,
    true,
    [
      {
        id: "pr-qa-1",
        type: "mcq",
        promptUk: "Найбільше має бути:",
        promptEn: "You should have the most:",
        options: ["E2E only", "unit tests", "manual only", "no tests"],
        correctIndex: 1,
      },
      {
        id: "pr-qa-2",
        type: "match",
        promptUk: "Рівні",
        promptEn: "Levels",
        pairs: [
          { left: "Unit", right: "функції/модулі" },
          { left: "Integration", right: "сервіси разом" },
          { left: "E2E", right: "повний user flow" },
        ],
      },
      {
        id: "pr-qa-3",
        type: "mcq",
        promptUk: "Регресія — це:",
        promptEn: "Regression means:",
        options: [
          "нова фіча",
          "поломка старого після змін",
          "дизайн UI",
          "деплой",
        ],
        correctIndex: 1,
      },
    ],
  ),
  lesson(
    "qa-cases",
    "Тест-кейси",
    "Test cases",
    2,
    false,
    [
      {
        id: "pr-qa-4",
        type: "mcq",
        promptUk: "Хороший тест-кейс має:",
        promptEn: "A good test case has:",
        options: [
          "лише очікуваний результат без кроків",
          "preconditions, steps, expected result",
          "тільки скріншот",
          "тільки SQL dump",
        ],
        correctIndex: 1,
      },
      {
        id: "pr-qa-5",
        type: "code_read",
        promptUk: "Що перевіряє цей unit test?",
        promptEn: "What does this unit test check?",
        language: "js",
        code: "expect(sum(2, 2)).toBe(4);",
        options: ["HTTP 200", "функцію sum", "CSS color", "Docker health"],
        correctIndex: 1,
      },
      {
        id: "pr-qa-6",
        type: "mcq",
        promptUk: "Boundary value — це:",
        promptEn: "Boundary value testing is:",
        options: [
          "лише happy path",
          "перевірка на межах діапазону",
          "навантажувальний тест",
          "UI animation",
        ],
        correctIndex: 1,
      },
    ],
  ),
  lesson(
    "qa-bugs-api",
    "Баги та API checks",
    "Bugs & API checks",
    2,
    false,
    [
      {
        id: "pr-qa-7",
        type: "match",
        promptUk: "Severity",
        promptEn: "Severity",
        pairs: [
          { left: "Blocker", right: "неможливо користуватись" },
          { left: "Major", right: "важлива функція зламана" },
          { left: "Minor", right: "косметика / низький вплив" },
        ],
      },
      {
        id: "pr-qa-8",
        type: "mcq",
        promptUk: "Перевірка REST API часто включає:",
        promptEn: "REST API checks often include:",
        options: [
          "тільки font size",
          "status code, body schema, errors",
          "тільки npm install",
          "тільки git blame",
        ],
        correctIndex: 1,
      },
      {
        id: "pr-qa-9",
        type: "code_fill",
        promptUk: "Очікуваний HTTP OK",
        promptEn: "Expected HTTP OK",
        language: "js",
        code: "expect(res.status).toBe(___);",
        accepted: ["200"],
        caseSensitive: true,
      },
    ],
  ),
  lesson(
    "qa-mini-case",
    "Mini-project: Test case pack",
    "Mini-project: Test case pack",
    2,
    false,
    [
      {
        id: "pr-qa-proj-1",
        type: "code_project",
        promptUk:
          "Оформи тест-кейс: preconditions, steps, expected. + checklist smoke (login, CRUD).",
        promptEn:
          "Write a test case: preconditions, steps, expected. + smoke checklist (login, CRUD).",
        files: [
          {
            id: "case",
            name: "testcase.md",
            language: "markdown",
            starter: `# Test case
## Preconditions
<!-- TODO -->
## Steps
<!-- TODO -->
## Expected
<!-- TODO -->
`,
          },
          {
            id: "smoke",
            name: "smoke-checklist.md",
            language: "markdown",
            starter: `# Smoke
- [ ] login
`,
          },
        ],
        checks: [
          {
            fileId: "case",
            contains: [
              "Preconditions",
              "Steps",
              "Expected",
            ],
          },
          {
            fileId: "smoke",
            contains: ["login", "CRUD"],
          },
        ],
        hintUk: "Preconditions / Steps / Expected · smoke: login + CRUD",
        hintEn: "Preconditions / Steps / Expected · smoke: login + CRUD",
      },
    ],
  ),
]);

/** Unit control tests (exams) — additive, does not replace existing lessons */
const programmingUnitExams: Record<string, LessonContent> = {
  html: examLesson("html-exam", "Контрольна: HTML", "Exam: HTML", 2, [
    {
      id: "pr-html-ex1",
      type: "mcq",
      promptUk: "Тег заголовка сторінки у вкладці:",
      promptEn: "Browser tab title tag:",
      options: ["<header>", "<title>", "<h1>", "<meta>"],
      correctIndex: 1,
    },
    {
      id: "pr-html-ex2",
      type: "code_fill",
      promptUk: "Тег абзацу",
      promptEn: "Paragraph tag",
      language: "html",
      code: "<___>Hi</___>",
      accepted: ["p", "P"],
      caseSensitive: false,
    },
    {
      id: "pr-html-ex3",
      type: "mcq",
      promptUk: "Семантичний контейнер основного вмісту:",
      promptEn: "Semantic main content container:",
      options: ["<div>", "<main>", "<span>", "<b>"],
      correctIndex: 1,
    },
    {
      id: "pr-html-ex4",
      type: "code_read",
      promptUk: "Який атрибут у посилання?",
      promptEn: "Which attribute for a link?",
      language: "html",
      code: '<a ___="/">Home</a>',
      options: ["src", "href", "rel only", "type"],
      correctIndex: 1,
    },
  ]),
  css: examLesson("css-exam", "Контрольна: CSS", "Exam: CSS", 2, [
    {
      id: "pr-css-ex1",
      type: "mcq",
      promptUk: "Властивість кольору тексту:",
      promptEn: "Text color property:",
      options: ["font-color", "color", "text", "paint"],
      correctIndex: 1,
    },
    {
      id: "pr-css-ex2",
      type: "code_fill",
      promptUk: "display flex",
      promptEn: "display flex",
      language: "css",
      code: "display: ___;",
      accepted: ["flex"],
      caseSensitive: true,
    },
    {
      id: "pr-css-ex3",
      type: "mcq",
      promptUk: "Box model включає:",
      promptEn: "Box model includes:",
      options: ["content + padding + border + margin", "лише font", "лише z-index", "SQL"],
      correctIndex: 0,
    },
    {
      id: "pr-css-ex4",
      type: "code_fill",
      promptUk: "Class selector",
      promptEn: "Class selector",
      language: "css",
      code: "___.card { }",
      accepted: ["."],
      caseSensitive: true,
    },
  ]),
  js: examLesson("js-exam", "Контрольна: JS", "Exam: JS", 2, [
    {
      id: "pr-js-ex1",
      type: "mcq",
      promptUk: "const означає:",
      promptEn: "const means:",
      options: ["переоголошення OK", "binding не переприсвоюється", "тільки number", "CSS"],
      correctIndex: 1,
    },
    {
      id: "pr-js-ex2",
      type: "code_fill",
      promptUk: "Оголошення функції",
      promptEn: "Function keyword",
      language: "js",
      code: "___ add(a, b) { return a + b; }",
      accepted: ["function"],
      caseSensitive: true,
    },
    {
      id: "pr-js-ex3",
      type: "code_output",
      promptUk: "Що виведе?",
      promptEn: "What logs?",
      language: "js",
      code: "console.log(typeof []);",
      options: ['"array"', '"object"', '"list"', '"undefined"'],
      correctIndex: 1,
    },
    {
      id: "pr-js-ex4",
      type: "mcq",
      promptUk: "=== порівнює:",
      promptEn: "=== compares:",
      options: ["з coercion", "без coercion (strict)", "лише string", "SQL"],
      correctIndex: 1,
    },
  ]),
  typescript: examLesson("ts-exam", "Контрольна: TypeScript unit", "Exam: TypeScript unit", 2, [
    {
      id: "pr-ts-ex1",
      type: "mcq",
      promptUk: "TS компілюється в:",
      promptEn: "TS compiles to:",
      options: ["Python", "JavaScript", "Rust", "SQL"],
      correctIndex: 1,
    },
    {
      id: "pr-ts-ex2",
      type: "code_fill",
      promptUk: "number annotation",
      promptEn: "number annotation",
      language: "ts",
      code: "let n: ___ = 1;",
      accepted: ["number"],
      caseSensitive: true,
    },
    {
      id: "pr-ts-ex3",
      type: "mcq",
      promptUk: "optional поле:",
      promptEn: "optional field:",
      options: ["name!", "name?", "name*", "name~"],
      correctIndex: 1,
    },
    {
      id: "pr-ts-ex4",
      type: "code_fill",
      promptUk: "Union",
      promptEn: "Union",
      language: "ts",
      code: "type Id = string ___ number;",
      accepted: ["|"],
      caseSensitive: true,
    },
  ]),
  react: examLesson("react-exam", "Контрольна: React", "Exam: React", 2, [
    {
      id: "pr-react-ex1",
      type: "mcq",
      promptUk: "Компонент React — це:",
      promptEn: "A React component is:",
      options: ["функція/клас що повертає UI", "SQL view", "CSS file", "git branch"],
      correctIndex: 0,
    },
    {
      id: "pr-react-ex2",
      type: "code_fill",
      promptUk: "useState import source",
      promptEn: "useState import source",
      language: "tsx",
      code: "import { useState } from '___';",
      accepted: ["react"],
      caseSensitive: true,
    },
    {
      id: "pr-react-ex3",
      type: "mcq",
      promptUk: "props — це:",
      promptEn: "props are:",
      options: ["вхідні дані компонента", "лише CSS", "SQL rows", "ports"],
      correctIndex: 0,
    },
    {
      id: "pr-react-ex4",
      type: "mcq",
      promptUk: "Список елементів потребує:",
      promptEn: "List items usually need:",
      options: ["key", "SQL id only", "iframe", "void"],
      correctIndex: 0,
    },
  ]),
  git: examLesson("git-exam", "Контрольна: Git", "Exam: Git", 2, [
    {
      id: "pr-git-ex1",
      type: "mcq",
      promptUk: "git commit зберігає:",
      promptEn: "git commit stores:",
      options: ["знімок staged змін", "лише CSS", "npm cache", "SQL dump always"],
      correctIndex: 0,
    },
    {
      id: "pr-git-ex2",
      type: "code_fill",
      promptUk: "Stage all",
      promptEn: "Stage all",
      language: "bash",
      code: "git ___ .",
      accepted: ["add"],
      caseSensitive: true,
    },
    {
      id: "pr-git-ex3",
      type: "mcq",
      promptUk: "branch — це:",
      promptEn: "a branch is:",
      options: ["вказівник на commit history", "CSS file", "DB table", "port"],
      correctIndex: 0,
    },
    {
      id: "pr-git-ex4",
      type: "mcq",
      promptUk: "PR зазвичай:",
      promptEn: "A PR usually:",
      options: ["пропозиція злити зміни", "delete repo", "format disk", "compile TS"],
      correctIndex: 0,
    },
  ]),
  node: examLesson("node-exam", "Контрольна: Node", "Exam: Node", 2, [
    {
      id: "pr-node-ex1",
      type: "mcq",
      promptUk: "Node.js — це:",
      promptEn: "Node.js is:",
      options: ["JS runtime поза браузером", "CSS framework", "SQL DB", "editor"],
      correctIndex: 0,
    },
    {
      id: "pr-node-ex2",
      type: "code_fill",
      promptUk: "require http",
      promptEn: "require http",
      language: "js",
      code: "const http = require('___');",
      accepted: ["http"],
      caseSensitive: true,
    },
    {
      id: "pr-node-ex3",
      type: "mcq",
      promptUk: "process.env читає:",
      promptEn: "process.env reads:",
      options: ["змінні середовища", "лише CSS", "git refs", "DOM"],
      correctIndex: 0,
    },
    {
      id: "pr-node-ex4",
      type: "mcq",
      promptUk: "package.json scripts:",
      promptEn: "package.json scripts:",
      options: ["npm run команди", "SQL only", "CSS only", "chess Elo"],
      correctIndex: 0,
    },
  ]),
  express: examLesson("express-exam", "Контрольна: Express", "Exam: Express", 2, [
    {
      id: "pr-ex-ex1",
      type: "mcq",
      promptUk: "Express — це:",
      promptEn: "Express is:",
      options: ["web framework для Node", "CSS lib", "DB", "game engine"],
      correctIndex: 0,
    },
    {
      id: "pr-ex-ex2",
      type: "code_fill",
      promptUk: "GET route method",
      promptEn: "GET route method",
      language: "js",
      code: "app.___('/health', (req, res) => res.send('ok'));",
      accepted: ["get"],
      caseSensitive: true,
    },
    {
      id: "pr-ex-ex3",
      type: "mcq",
      promptUk: "middleware — це:",
      promptEn: "middleware is:",
      options: ["функції в pipeline req/res", "лише HTML", "git hook only", "SQL trigger"],
      correctIndex: 0,
    },
    {
      id: "pr-ex-ex4",
      type: "mcq",
      promptUk: "REST status 404:",
      promptEn: "REST status 404:",
      options: ["not found", "OK", "created", "redirect"],
      correctIndex: 0,
    },
  ]),
  sql: examLesson("sql-exam", "Контрольна: SQL", "Exam: SQL", 2, [
    {
      id: "pr-sql-ex1",
      type: "mcq",
      promptUk: "SELECT повертає:",
      promptEn: "SELECT returns:",
      options: ["рядки з таблиці", "лише CSS", "git log", "JSX"],
      correctIndex: 0,
    },
    {
      id: "pr-sql-ex2",
      type: "code_fill",
      promptUk: "Filter rows",
      promptEn: "Filter rows",
      language: "sql",
      code: "SELECT * FROM users ___ age > 18;",
      accepted: ["WHERE", "where"],
      caseSensitive: false,
    },
    {
      id: "pr-sql-ex3",
      type: "mcq",
      promptUk: "JOIN об'єднує:",
      promptEn: "JOIN combines:",
      options: ["рядки з кількох таблиць", "CSS files", "npm packages", "ports"],
      correctIndex: 0,
    },
    {
      id: "pr-sql-ex4",
      type: "code_fill",
      promptUk: "Count rows",
      promptEn: "Count rows",
      language: "sql",
      code: "SELECT ___(*) FROM t;",
      accepted: ["COUNT", "count"],
      caseSensitive: false,
    },
  ]),
  qa: examLesson("qa-exam", "Контрольна: QA", "Exam: QA", 2, [
    {
      id: "pr-qa-ex1",
      type: "mcq",
      promptUk: "Unit test перевіряє:",
      promptEn: "A unit test checks:",
      options: ["маленький модуль/функцію", "весь прод одразу only", "CSS only", "Elo"],
      correctIndex: 0,
    },
    {
      id: "pr-qa-ex2",
      type: "mcq",
      promptUk: "Bug report має:",
      promptEn: "A bug report should have:",
      options: ["steps + expected + actual", "only emoji", "SQL dump only", "nothing"],
      correctIndex: 0,
    },
    {
      id: "pr-qa-ex3",
      type: "mcq",
      promptUk: "Test pyramid знизу:",
      promptEn: "Test pyramid base:",
      options: ["багато unit-тестів", "лише e2e", "немає тестів", "manual only always"],
      correctIndex: 0,
    },
    {
      id: "pr-qa-ex4",
      type: "mcq",
      promptUk: "Regression test:",
      promptEn: "Regression test:",
      options: ["ловить повернення старих багів", "CSS minify", "git blame", "XP only"],
      correctIndex: 0,
    },
  ]),
};

function withUnitExam(u: UnitContent): UnitContent {
  const ex = programmingUnitExams[u.slug];
  if (!ex) return u;
  if (u.lessons.some((l) => l.slug === ex.slug)) return u;
  return { ...u, lessons: [...u.lessons, ex] };
}

export const programmingContent: CourseContent = {
  slug: "programming",
  titleUk: "Програмування",
  titleEn: "Programming",
  descriptionUk:
    "Path як у Mimo: HTML → CSS → JS → TypeScript → React → Git → Node → Express → SQL → QA. + контрольні.",
  descriptionEn:
    "Mimo-style path: HTML → CSS → JS → TypeScript → React → Git → Node → Express → SQL → QA. + unit exams.",
  icon: "💻",
  color: "#0EA5E9",
  units: [
    htmlUnit,
    cssUnit,
    jsUnit,
    typescriptUnit,
    reactUnit,
    gitUnit,
    nodeUnit,
    expressUnit,
    sqlUnit,
    qaUnit,
  ].map(withUnitExam),
};
