import type { CourseContent, Exercise } from "./types.js";
import {
  codeFill,
  codeOrder,
  codeOutputMcq,
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

const document = unit("document", "Документ", "Document", [
  lesson(
    "hs-doc-basics",
    "Каркас HTML-документа",
    "HTML document shell",
    1,
    true,
    [
      concept("hs-document-concept", "Структура документа", "Document structure", {
        uk: "<!DOCTYPE html> на початку документа вмикає стандартний режим браузера; це оголошення, а не елемент із закривальним тегом. Кореневий html містить head із метаданими та body з вмістом сторінки. Атрибут lang описує основну мову документа й допомагає, зокрема, програмам читання екрана вибрати вимову. Якщо фрагмент має іншу мову, позначте її на відповідному елементі, наприклад <span lang=\"en\">Hello</span>.",
        en: "<!DOCTYPE html> at the start of a document enables the browser's standards mode; it is a declaration, not an element with a closing tag. The root html contains head for metadata and body for page content. The lang attribute declares the document's primary language and helps screen readers choose pronunciation. If a passage uses another language, declare it on that element, for example <span lang=\"en\">Hello</span>.",
      }),
      { ...mcq(
        "hs-d1",
        "DOCTYPE html означає:",
        "DOCTYPE html means:",
        ["Лише режим XML", "Оголошення HTML-документа для стандартного режиму", "Скидання CSS", "Модуль JS"],
        1,
      ), optionsEn: ["XML-only mode", "An HTML doctype enabling standards mode", "A CSS reset", "A JavaScript module"] },
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
      concept("hs-head-concept", "Метадані сторінки", "Page metadata", {
        uk: "head містить метадані: змістовний title називає документ у вкладці та закладках, а meta charset задає кодування тексту і має відповідати фактичному кодуванню файлу. viewport із width=device-width допомагає браузеру налаштувати ширину області перегляду на мобільних пристроях; адаптивний вигляд також залежить від CSS. Не вимикайте масштабування користувачем. Пошукова система може сформувати заголовок результату інакше, ніж текст title.",
        en: "head contains metadata: a descriptive title names the document in tabs and bookmarks, and meta charset declares the text encoding and should match the actual file encoding. A viewport with width=device-width helps the browser configure its width on mobile devices; responsive presentation also depends on CSS. Do not disable user zoom. A search engine may display a result title that differs from the title element.",
      }),
      { ...mcq(
        "hs-d4",
        "Тег title впливає на:",
        "The title tag affects:",
        ["Лише CSS", "Назву вкладки та закладок", "Лише Node", "Redis"],
        1,
      ), optionsEn: ["Only CSS", "The tab and bookmark title", "Only Node", "Redis"] },
      codeFill(
        "hs-d5",
        "charset",
        "charset",
        "html",
        '<meta charset="___">',
        ["UTF-8", "utf-8"],
        false,
      ),
      { ...(codeRead(
        "hs-d6",
        "viewport meta — для чого?",
        "viewport meta is for?",
        "html",
        '<meta name="viewport" content="width=device-width, initial-scale=1">',
        ["Налаштування області перегляду для мобільних пристроїв", "Підключення SQL", "Git remote", "Лише друк CSS"],
        0,
      ) as Extract<Exercise, { type: "code_read" }>), optionsEn: ["Configuring the mobile viewport", "An SQL connection", "A git remote", "Only print CSS"] },
    ],
  ),
  lesson(
    "hs-doc-body",
    "Body і видимий контент",
    "Body & visible content",
    1,
    false,
    [
      concept("hs-body-concept", "Вміст документа", "Document content", {
        uk: "body містить вміст документа, який браузер представляє користувачу: навігацію, заголовки, текст, посилання та елементи керування. Основну тему сторінки позначайте в main; body охоплює також вміст поза ним. Заголовки h1–h6 описують структуру тем: наприклад, h1 називає сторінку, а h2 — її розділ. Обирайте рівень за змістом і вкладеністю, а не лише за розміром шрифту.",
        en: "body contains document content presented to the user, including navigation, headings, text, links, and controls. Mark the page's primary content with main; body also includes content outside it. Headings h1–h6 describe topic structure: for example, h1 names the page and h2 a section. Choose a level based on meaning and nesting rather than font size alone.",
      }),
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
        "<___>Welcome</h1>",
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
      concept("hs-semantics-concept", "Значення елементів", "Element meaning", {
        uk: "Семантичні елементи описують призначення вмісту: nav позначає навігацію, main — основний вміст, а button — дію. Наприклад, для надсилання форми використовуйте button, а для переходу на іншу сторінку — a з href. Нативні елементи надають браузеру та допоміжним технологіям семантику й поведінку, які довелося б окремо реалізувати для div. Вони не замінюють перевірку клавіатури, доступних назв і логіки інтерфейсу.",
        en: "Semantic elements describe the purpose of content: nav marks navigation, main identifies primary content, and button represents an action. For example, use a button to submit a form and an a element with href to navigate to another page. Native elements provide semantics and behavior to browsers and assistive technology that a div would require you to implement separately. They do not replace checking keyboard behavior, accessible names, and interface logic.",
      }),
      { ...mcq(
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
      ), optionsEn: ["Screen readers, search engines, and understandable structure", "Only changing text color", "Replacing CSS forever", "Speeding up SQL"] },
      { ...mcq(
        "hs-ds2",
        "Краще для навігації:",
        "Better for navigation:",
        ["<nav>", "лише <div class=\"nav\"> без сенсу", "<span> only", "<br><br>"],
        0,
      ), optionsEn: ["<nav>", "Only a meaningless <div class=\"nav\">", "Only <span>", "<br><br>"] },
      codeFill(
        "hs-ds3",
        "main landmark",
        "main landmark",
        "html",
        "<___>…content…</main>",
        ["main"],
        false,
      ),
      { ...mcq(
        "hs-ds4",
        "Один <main> на сторінку — це:",
        "One <main> per page is:",
        ["рекомендована практика", "заборонено", "лише для PDF", "тільки в XHTML 1.0"],
        0,
      ), optionsEn: ["Recommended practice", "Forbidden", "Only for PDF", "Only in XHTML 1.0"] },
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
      concept("hs-landmarks-concept", "Основні області", "Primary landmarks", {
        uk: "main позначає основний вміст, унікальний для сторінки; доступним має бути один видимий main. header і footer можуть описувати сторінку або окрему статтю чи секцію: вкладений header статті не є шапкою всього сайту. Сторінкові орієнтири допомагають користувачам допоміжних технологій переходити між великими частинами документа. Наприклад, розмістіть загальне меню поза main, а заголовок сторінки та її матеріал — усередині.",
        en: "main identifies the primary content unique to a page; one visible main should be exposed. header and footer can describe a page or an individual article or section: an article's nested header is not the header of the whole site. Page landmarks help assistive technology users move between major parts of a document. For example, place the shared menu outside main and the page heading and content inside it.",
      }),
      { ...mcq(
        "hs-l1",
        "<main> означає:",
        "<main> means:",
        ["основний унікальний контент сторінки", "бічна колонка always", "тільки SEO", "script host"],
        0,
      ), optionsEn: ["The primary content unique to the page", "Always a sidebar", "Only SEO", "A script host"] },
      codeFill(
        "hs-l2",
        "Шапка сайту",
        "Site header",
        "html",
        "<___>...</header>",
        ["header"],
        true,
      ),
      { ...(codeRead(
        "hs-l3",
        "Скільки <main> бажано?",
        "How many <main> ideally?",
        "html",
        "<main>…</main>",
        ["один основний на сторінку", "десятки обов'язково", "нуль always", "only in head"],
        0,
      ) as Extract<Exercise, { type: "code_read" }>), optionsEn: ["One visible main for the page", "Dozens are mandatory", "Always zero", "Only in head"] },
    ],
  ),
  lesson(
    "hs-lm-nav-aside",
    "nav і aside",
    "nav & aside",
    2,
    false,
    [
      concept("hs-nav-aside-concept", "Навігація і пов'язаний вміст", "Navigation and related content", {
        uk: "nav групує важливі навігаційні посилання; не кожне посилання потребує окремого nav. aside позначає вміст, опосередковано пов'язаний з основним, наприклад тематичні посилання, а не будь-яку візуальну колонку. Кільком різним навігаційним областям надайте зрозумілі назви, наприклад aria-label=\"Основна\" та aria-label=\"Розділи\"; однаковим наборам посилань можна дати однакову назву.",
        en: "nav groups major navigation links; not every link needs its own nav. aside identifies content tangentially related to the main content, such as related links, rather than any visually separate column. Give multiple distinct navigation regions clear names, for example aria-label=\"Primary\" and aria-label=\"Sections\"; identical sets of links can share a name.",
      }),
      { ...mcq(
        "hs-l4",
        "<nav> для:",
        "<nav> is for:",
        ["блоків навігаційних посилань", "лише зображень", "SQL tables", "audio only"],
        0,
      ), optionsEn: ["Groups of navigation links", "Only images", "SQL tables", "Only audio"] },
      codeFill(
        "hs-l5",
        "Пов'язаний із темою додатковий вміст",
        "Tangentially related supplementary content",
        "html",
        "<___>Related</aside>",
        ["aside"],
        true,
      ),
      { ...matchEx(
        "hs-l6",
        "Зіставте landmarks",
        "Match landmarks",
        [
          { left: "<main>", right: "основний вміст" },
          { left: "<nav>", right: "навігація" },
          { left: "<footer>", right: "підвал сторінки або розділу" },
        ],
      ), pairsEn: [{ left: "<main>", right: "primary content" }, { left: "<nav>", right: "navigation" }, { left: "<footer>", right: "page or section footer" }] },
    ],
  ),
  lesson(
    "hs-lm-section",
    "section vs div",
    "section vs div",
    2,
    false,
    [
      concept("hs-section-concept", "Тематичні групи і контейнери", "Thematic groups and containers", {
        uk: "section групує тематично пов'язаний вміст і зазвичай має заголовок; article підходить для самостійної частини, яку можна повторно використати, наприклад допису. div — загальний контейнер без власного семантичного значення, корисний для компонування. Не кожна section автоматично стає іменованим орієнтиром для допоміжних технологій.",
        en: "section groups thematically related content and normally has a heading; article suits a self-contained piece that could be reused, such as a post. div is a generic container with no inherent semantic meaning, useful for layout. Not every section automatically becomes a named landmark for assistive technology.",
      }),
      { ...mcq(
        "hs-l7",
        "<section> краще коли:",
        "<section> is better when:",
        ["є тематична група з заголовком", "потрібен «просто box» без сенсу", "тільки CSS grid cell always", "never"],
        0,
      ), optionsEn: ["There is a thematic group with a heading", "A meaningless layout box is needed", "Always for a CSS grid cell", "Never"] },
      { ...mcq(
        "hs-l8",
        "<div> — це:",
        "<div> is:",
        ["generic container без семантики", "завжди landmark", "form control", "heading"],
        0,
      ), optionsEn: ["A generic container without inherent semantics", "Always a landmark", "A form control", "A heading"] },
      { ...(codeRead(
        "hs-l9",
        "Що краще для статті блогу?",
        "Better for a blog post?",
        "html",
        "<article>…</article> vs <div>…</div>",
        ["article для самостійного твору", "div always better", "only span", "table"],
        0,
      ) as Extract<Exercise, { type: "code_read" }>), optionsEn: ["article for self-contained content", "div is always better", "Only span", "table"] },
    ],
  ),
  exam("hs-lm-exam", "Контрольна: landmarks", "Exam: landmarks", 2, [
    { ...mcq("hs-le1", "Що позначає main?", "What does main identify?", ["Основний вміст сторінки", "Лише метадані", "Кодування символів", "Тип документа"], 0), optionsEn: ["The page's primary content", "Only metadata", "Character encoding", "The document type"] },
    codeFill("hs-le2", "Навігаційна область", "Navigation region", "html", "<___><a href=\"/\">Home</a></nav>", ["nav"], true),
    { ...mcq("hs-le3", "Який вміст підходить для aside?", "What content belongs in an aside?", ["Опосередковано пов'язаний із темою", "Завжди заголовок h1", "Увесь вміст замість body", "Лише SQL-запит"], 0), optionsEn: ["Content tangentially related to the topic", "Always an h1 heading", "All content instead of body", "Only an SQL query"] },
    { ...mcq("hs-le4", "Яке значення має div?", "What meaning does div have?", ["Не має власної семантики", "Завжди є орієнтиром", "Завжди є формою", "Є назвою документа"], 0), optionsEn: ["It has no inherent semantics", "It is always a landmark", "It is always a form", "It is the document title"] },
    codeFill("hs-le5", "Нижній колонтитул", "Footer", "html", "<___>© 2026</footer>", ["footer"], true),
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
      concept("hs-headings-concept", "Ієрархія заголовків", "Heading hierarchy", {
        uk: "Заголовки h1–h6 описують ієрархію змісту: h1 зазвичай називає головну тему сторінки, h2 — її розділ, h3 — підрозділ. Послідовні рівні допомагають орієнтуватися, зокрема під час навігації списком заголовків у програмі читання екрана. Розмір тексту змінюйте CSS, не вибираючи рівень лише за виглядом.",
        en: "Headings h1–h6 describe content hierarchy: h1 usually names the page's main topic, h2 a section, and h3 a subsection. Consistent levels help navigation, including a screen reader's heading list. Use CSS to change text size instead of choosing a level only for its appearance.",
      }),
      { ...mcq(
        "hs-h1",
        "Найкраща практика для h1:",
        "Best practice for h1:",
        ["один чіткий h1 на сторінку (зазвичай)", "десять h1 always", "ніколи h1", "лише в footer"],
        0,
      ), optionsEn: ["Usually one clear h1 for the page", "Always ten h1 headings", "Never use h1", "Only in the footer"] },
      codeOrder(
        "hs-h2",
        "Логічний outline",
        "Logical outline",
        "html",
        ["<h3>Detail</h3>", "<h1>Page</h1>", "<h2>Section</h2>"],
        ["<h1>Page</h1>", "<h2>Section</h2>", "<h3>Detail</h3>"],
      ),
      { ...mcq(
        "hs-h3",
        "Стрибок h1 → h4 без h2/h3:",
        "Skipping h1 → h4 without h2/h3:",
        ["погано для outline/a11y", "обов'язково", "потрібно для CSS", "SQL rule"],
        0,
      ), optionsEn: ["It can make the heading hierarchy harder to navigate", "It is mandatory", "It is required for CSS", "It is an SQL rule"] },
    ],
  ),
  lesson(
    "hs-h-skip",
    "Skip link intro",
    "Skip link intro",
    2,
    false,
    [
      concept("hs-skip-concept", "Перехід до основного вмісту", "Skip to main content", {
        uk: "Skip-посилання на початку сторінки дозволяє обійти повторювану навігацію. Його href має посилатися на наявний id основного вмісту, наприклад href=\"#main-content\" і <main id=\"main-content\">. Посилання має бути доступним з клавіатури та видимим при отриманні фокуса; перевірте перехід і подальшу навігацію клавіатурою в браузері.",
        en: "A skip link near the start of a page lets users bypass repeated navigation. Its href must match an existing main-content id, for example href=\"#main-content\" and <main id=\"main-content\">. The link must be keyboard accessible and visible when focused; test the jump and subsequent keyboard navigation in a browser.",
      }),
      { ...mcq(
        "hs-h4",
        "Skip to content допомагає:",
        "Skip to content helps:",
        ["клавіатурним/screen reader users", "тільки SEO bots never users", "Redis", "chess Elo"],
        0,
      ), optionsEn: ["Keyboard and screen reader users", "Only search bots, never users", "Redis", "Chess Elo"] },
      codeFill(
        "hs-h5",
        "Допишіть адресу так, щоб вона збігалася з id основного вмісту.",
        "Complete the link target so it matches the main content id.",
        "html",
        '<a href="#___">Skip to content</a>\n<main id="main-content">...</main>',
        ["main-content"],
        true,
      ),
      { ...mcq("hs-h6", "Коли приховане візуально skip-посилання має стати видимим?", "When should a visually hidden skip link become visible?", ["Коли воно отримує фокус клавіатури", "Лише під час друку", "Ніколи", "Лише після перезавантаження сторінки"], 0), optionsEn: ["When it receives keyboard focus", "Only when printing", "Never", "Only after reloading the page"] },
    ],
  ),
  exam("hs-h-exam", "Контрольна: headings", "Exam: headings", 2, [
    { ...mcq("hs-he1", "Який підхід до h1 зазвичай найзрозуміліший?", "Which approach to h1 is usually clearest?", ["Один заголовок головної теми", "Обов'язково багато заголовків h1", "Ніколи не використовувати h1", "Рівно шість заголовків h1"], 0), optionsEn: ["One heading for the main topic", "Many h1 headings are mandatory", "Never use h1", "Exactly six h1 headings"] },
    codeFill("hs-he2", "Заголовок другого рівня", "Second-level heading", "html", "<___>Section</h2>", ["h2"], true),
    { ...mcq("hs-he3", "Чому небажано перескакувати від h1 до h4?", "Why avoid jumping from h1 to h4?", ["Ієрархію складніше зрозуміти під час навігації", "Це збільшує розмір PNG", "Це запускає npm", "Це змінює SMTP"], 0), optionsEn: ["It can make the hierarchy harder to navigate", "It increases PNG size", "It runs npm", "It changes SMTP"] },
    { ...mcq("hs-he4", "Для чого потрібне skip-посилання?", "What is a skip link for?", ["Перейти до основного вмісту повз повторювану навігацію", "Видалити CSS", "Запустити компілятор", "Надіслати зміни до Git"], 0), optionsEn: ["Jump to main content past repeated navigation", "Delete CSS", "Run the compiler", "Push changes to Git"] },
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
      concept("hs-figure-concept", "Ілюстрація та підпис", "Figure and caption", {
        uk: "figure групує самостійний матеріал, наприклад діаграму, фото або приклад коду, а figcaption надає йому видимий підпис. Підпис не завжди замінює alt зображення: текстова альтернатива має передавати призначення зображення в контексті, не повторюючи зайвого. Для складної діаграми наведіть ключовий висновок в alt, а докладні дані — у доступному тексті або таблиці поруч.",
        en: "figure groups self-contained material such as a chart, photograph, or code example; figcaption supplies its visible caption. A caption does not always replace an image's alt: the text alternative should convey the image's purpose in context without unnecessary repetition. For a complex chart, put the key takeaway in alt and provide detailed data in accessible nearby text or a table.",
      }),
      codeOrder(
        "hs-t1",
        "Figure block",
        "Figure block",
        "html",
        ["</figure>", "<figure>", "<img src=\"sales.jpg\" alt=\"Sales rose from 20 to 30\">", "<figcaption>Q1 sales</figcaption>"],
        ["<figure>", "<img src=\"sales.jpg\" alt=\"Sales rose from 20 to 30\">", "<figcaption>Q1 sales</figcaption>", "</figure>"],
      ),
      { ...mcq(
        "hs-t2",
        "figcaption — це:",
        "figcaption is:",
        ["підпис до figure", "заміна alt always", "CSS property", "HTTP header"],
        0,
      ), optionsEn: ["A caption for a figure", "Always a replacement for alt", "A CSS property", "An HTTP header"] },
    ],
  ),
  lesson(
    "hs-tm-alt",
    "alt і time",
    "alt & time",
    2,
    false,
    [
      concept("hs-alt-concept", "Текстова альтернатива і дата", "Text alternatives and dates", {
        uk: "Для змістовного зображення alt передає інформацію або функцію, яку воно надає в контексті. Для суто декоративного зображення зазвичай використовують alt=\"\", щоб не озвучувати зайве. Якщо зображення є єдиним вмістом посилання чи кнопки, альтернатива має називати дію або призначення. time з datetime дозволяє вказати машиночитане значення дати чи часу поруч із видимим текстом.",
        en: "For an informative image, alt conveys the information or function it provides in context. A purely decorative image usually uses alt=\"\" so it does not add noise. If an image is the only content of a link or button, its alternative should name the action or destination. time with datetime can provide a machine-readable date or time alongside visible text.",
      }),
      { ...mcq(
        "hs-t3",
        "alt у img:",
        "img alt:",
        ["текстова альтернатива", "лише SEO keyword spam", "обов'язково порожній always", "CSS class"],
        0,
      ), optionsEn: ["A text alternative", "Only SEO keyword stuffing", "Always required to be empty", "A CSS class"] },
      codeFill(
        "hs-t4",
        "datetime на time",
        "time datetime",
        "html",
        '<time ___="2026-07-19">19 лип</time>',
        ["datetime"],
        true,
      ),
      { ...mcq("hs-t6", "Який alt зазвичай підходить для суто декоративного зображення?", "Which alt is usually appropriate for a purely decorative image?", ['alt=""', 'alt="image"', "Без атрибута alt", 'alt="decorative picture"'], 0), optionsEn: ['alt=""', 'alt="image"', "No alt attribute", 'alt="decorative picture"'] },
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
    { ...mcq("hs-te1", "Що може групувати figure?", "What can figure group?", ["Ілюстрацію та її підпис", "Лише скрипти", "Лише метадані", "SQL-з'єднання"], 0), optionsEn: ["An illustration and its caption", "Only scripts", "Only metadata", "An SQL connection"] },
    codeFill("hs-te2", "Підпис figure", "Figure caption", "html", "<figure><___>Caption</figcaption></figure>", ["figcaption"], true),
    codeFill("hs-te3", "alt", "alt", "html", '<img src="x" ___="desc">', ["alt"], true),
    { ...mcq("hs-te4", "Для чого використовують time з datetime?", "What is time with datetime used for?", ["Для дати чи часу з машиночитаним значенням", "Лише для CSS-анімації", "Для Git-тегу", "Для мережевого порту"], 0), optionsEn: ["A date or time with a machine-readable value", "Only CSS animation", "A Git tag", "A network port"] },
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
      concept("hs-lists-concept", "Види списків", "List types", {
        uk: "ul використовують для переліку без значущого порядку, ol — коли порядок важливий, наприклад для кроків інструкції. Їхні елементи позначають li. dl групує терміни dt та їхні описи dd; вигляд маркерів налаштовують CSS, не змінюючи зміст списку.",
        en: "Use ul for items whose order is not meaningful and ol when sequence matters, such as instructions. Their items use li. dl groups terms in dt with descriptions in dd; CSS can change marker appearance without changing list meaning.",
      }),
      { ...matchEx(
        "hs-lt1",
        "Типи списків",
        "List types",
        [
          { left: "<ul>", right: "невпорядкований список" },
          { left: "<ol>", right: "впорядкований список" },
          { left: "<dl>", right: "список описів" },
        ],
      ), pairsEn: [{ left: "<ul>", right: "unordered list" }, { left: "<ol>", right: "ordered list" }, { left: "<dl>", right: "description list" }] },
      codeFill(
        "hs-lt2",
        "Пункт списку",
        "List item",
        "html",
        "<ul><___>One</li></ul>",
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
      concept("hs-tables-concept", "Структура таблиці", "Table structure", {
        uk: "Таблиця призначена для табличних даних. caption називає таблицю, th позначає заголовок, а td — комірку даних. scope=\"col\" або scope=\"row\" допомагає пов'язати прості заголовки з відповідними стовпцями чи рядками; складні таблиці можуть потребувати явних id і headers.",
        en: "A table is intended for tabular data. caption names the table, th marks a header, and td holds a data cell. scope=\"col\" or scope=\"row\" helps associate simple headers with columns or rows; complex tables may need explicit id and headers associations.",
      }),
      { ...mcq(
        "hs-lt3",
        "th краще ніж td для:",
        "th is better than td for:",
        ["заголовків рядка/колонки", "усіх даних always", "лише CSS", "scripts"],
        0,
      ), optionsEn: ["Row or column headers", "Always for all data", "Only CSS", "Scripts"] },
      codeFill(
        "hs-lt4",
        "scope column",
        "scope column",
        "html",
        '<th scope="___">Name</th>',
        ["col"],
        true,
      ),
      { ...(codeRead(
        "hs-lt5",
        "caption у table:",
        "table caption:",
        "html",
        "<table><caption>Sales</caption>…</table>",
        ["назва таблиці", "заборонено", "лише CSS", "HTTP"],
        0,
      ) as Extract<Exercise, { type: "code_read" }>), optionsEn: ["The table's caption", "Forbidden", "Only CSS", "HTTP"] },
    ],
  ),
  exam("hs-lt-exam", "Контрольна: lists/tables", "Exam: lists/tables", 2, [
    codeFill("hs-lte1", "Елемент списку", "List item", "html", "<ol><___>A</li></ol>", ["li"], true),
    { ...mcq("hs-lte2", "Коли доречний ol?", "When is ol appropriate?", ["Коли порядок пунктів важливий", "Для будь-якого необов'язкового посилання", "Лише для макета", "Для авторизації OAuth"], 0), optionsEn: ["When item order matters", "For any optional link", "Only for layout", "For OAuth authorization"] },
    codeFill("hs-lte3", "Заголовок стовпця", "Column header", "html", "<tr><___>Col</th></tr>", ["th"], true),
    { ...mcq("hs-lte4", "Навіщо задають scope у заголовку таблиці?", "Why set scope on a table header?", ["Щоб пов'язати заголовок із рядком або стовпцем", "Щоб стиснути JavaScript", "Щоб запустити TypeScript", "Щоб підключити Redis"], 0), optionsEn: ["To associate the header with a row or column", "To minify JavaScript", "To run TypeScript", "To connect Redis"] },
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
      concept("hs-label-concept", "Назва поля", "Naming a control", {
        uk: "Видимий label дає полю зрозумілу назву. Атрибут for посилається на унікальний id відповідного елемента, а натискання підпису зазвичай передає фокус або активує пов'язаний контрол. Placeholder не замінює постійний підпис: він може зникнути під час введення.",
        en: "A visible label gives a control an understandable name. Its for attribute points to the associated element's unique id, and clicking the label usually focuses or activates that control. A placeholder does not replace a persistent label: it can disappear while typing.",
      }),
      codeOrder(
        "hs-f1",
        "Розташуйте label перед input і зв'яжіть їх через for та id.",
        "Place label before input and associate them using for and id.",
        "html",
        ['<input id="email" type="email">', '<label for="email">Email</label>'],
        ['<label for="email">Email</label>', '<input id="email" type="email">'],
      ),
      { ...mcq(
        "hs-f2",
        "for на label має збігатися з:",
        "label for must match:",
        ["id інпута", "name always only", "class", "placeholder"],
        0,
      ), optionsEn: ["The input's id", "Only its name", "Its class", "Its placeholder"] },
    ],
  ),
  lesson(
    "hs-f-fieldset",
    "fieldset / legend",
    "fieldset / legend",
    2,
    false,
    [
      concept("hs-fieldset-concept", "Група пов'язаних полів", "Grouping related controls", {
        uk: "fieldset групує пов'язані поля, наприклад радіокнопки способу доставки, а legend називає групу. Для взаємовиключних радіокнопок задайте однаковий name; кожен варіант має окремий value і власний label. Назва групи не замінює підписи окремих полів.",
        en: "fieldset groups related controls, such as radio buttons for a shipping method, and legend names the group. Give mutually exclusive radio buttons the same name; each choice has its own value and label. The group name does not replace individual labels.",
      }),
      codeFill(
        "hs-f3",
        "Група полів",
        "Field group",
        "html",
        "<___><legend>Shipping</legend>…</fieldset>",
        ["fieldset"],
        true,
      ),
      { ...mcq(
        "hs-f4",
        "legend описує:",
        "legend describes:",
        ["групу полів у fieldset", "лише весь сайт", "CSS-сітку", "гілку Git"],
        0,
      ), optionsEn: ["The fieldset's group of controls", "Only the entire website", "A CSS grid", "A Git branch"] },
    ],
  ),
  lesson(
    "hs-f-types",
    "input types",
    "input types",
    2,
    false,
    [
      concept("hs-input-types-concept", "Типи і перевірка введення", "Input types and validation", {
        uk: "type=email дає браузеру семантику та базову перевірку формату, password приховує введені символи, checkbox дозволяє вмикати або вимикати вибір. required позначає обов'язкове поле в браузерній перевірці. Ці можливості допомагають користувачу, але сервер усе одно має перевірити отримані дані.",
        en: "type=email supplies browser semantics and basic format validation, password masks entered characters, and checkbox toggles a choice. required marks a control as mandatory in browser validation. These features help users, but the server must still validate submitted data.",
      }),
      { ...matchEx(
        "hs-f5",
        "Типи input",
        "Input types",
        [
          { left: "email", right: "підказка клавіатурі та базова перевірка формату" },
          { left: "password", right: "приховане введення символів" },
          { left: "checkbox", right: "увімкнення або вимкнення вибору" },
        ],
      ), pairsEn: [{ left: "email", right: "Keyboard hint and basic format validation" }, { left: "password", right: "Masked character entry" }, { left: "checkbox", right: "Toggle a choice" }] },
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
    { ...mcq("hs-fe2", "Для чого потрібен fieldset?", "What is fieldset for?", ["Групує пов'язані поля", "Замінює форму", "Лише задає стилі", "Підключає базу даних"], 0), optionsEn: ["Groups related controls", "Replaces the form", "Only supplies styles", "Connects a database"] },
    codeFill("hs-fe3", "Назва групи", "Group name", "html", "<fieldset><___>Title</legend></fieldset>", ["legend"], true),
    { ...mcq("hs-fe4", "Чим допомагає пов'язаний label?", "How does an associated label help?", ["Називає поле та дозволяє активувати його натисканням підпису", "Зберігає значення на сервері", "Замінює перевірку даних", "Приховує поле"], 0), optionsEn: ["Names the control and lets users activate it by clicking its label", "Saves the value on the server", "Replaces data validation", "Hides the control"] },
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
      concept("hs-controls-concept", "Дія і перехід", "Actions and navigation", {
        uk: "Посилання a з href веде до ресурсу або фрагмента сторінки. button запускає дію, наприклад відкриття меню чи надсилання форми. У формі явно задавайте type=\"button\" для дії, що не надсилає форму: кнопка без type зазвичай є submit. Нативні елементи вже підтримують відповідну взаємодію з клавіатури.",
        en: "An a element with href navigates to a resource or page fragment. A button performs an action, such as opening a menu or submitting a form. Inside a form, explicitly use type=\"button\" for an action that should not submit: a button without type is normally a submit button. Native elements already support appropriate keyboard interaction.",
      }),
      { ...mcq(
        "hs-i1",
        "Для навігації на URL краще:",
        "For navigating to a URL prefer:",
        ["<a href>", "завжди <button>", "лише <div onclick>", "<span>"],
        0,
      ), optionsEn: ["<a href>", "Always <button>", "Only <div onclick>", "<span>"] },
      { ...mcq(
        "hs-i2",
        "Для дії без зміни URL краще:",
        "For an action without URL change prefer:",
        ["<button type=\"button\">", "лише <a href=\"#\">", "звичайний div", "img"],
        0,
      ), optionsEn: ["<button type=\"button\">", "Only <a href=\"#\">", "A plain div", "img"] },
    ],
  ),
  lesson(
    "hs-i-details",
    "details / summary",
    "details / summary",
    2,
    false,
    [
      concept("hs-details-concept", "Розкриття вмісту", "Disclosure content", {
        uk: "details створює нативний блок, який можна розгорнути або згорнути; summary задає його видимий заголовок і елемент керування. Атрибут open показує вміст початково. Використовуйте зрозумілий текст summary і перевіряйте взаємодію з клавіатури.",
        en: "details creates a native disclosure that can be expanded or collapsed; summary supplies its visible heading and control. The open attribute initially displays the content. Use clear summary text and test keyboard interaction.",
      }),
      codeOrder(
        "hs-i3",
        "Disclosure widget",
        "Disclosure widget",
        "html",
        ["</details>", "<details>", "<summary>More</summary>", "<p>Hidden text</p>"],
        ["<details>", "<summary>More</summary>", "<p>Hidden text</p>", "</details>"],
      ),
      { ...mcq(
        "hs-i4",
        "summary — це:",
        "summary is:",
        ["видимий заголовок details", "SQL aggregate only", "CSS property", "HTTP method"],
        0,
      ), optionsEn: ["The visible heading and control for details", "Only an SQL aggregate", "A CSS property", "An HTTP method"] },
    ],
  ),
  exam("hs-i-exam", "Контрольна: interactive", "Exam: interactive", 2, [
    { ...mcq("hs-ie1", "Який елемент підходить для переходу за URL?", "Which element suits navigation to a URL?", ["a з href", "лише button", "meta", "title"], 0), optionsEn: ["a with href", "Only button", "meta", "title"] },
    { ...mcq("hs-ie2", "Який елемент підходить для дії?", "Which element suits an action?", ["button", "лише h1", "doctype", "charset"], 0), optionsEn: ["button", "Only h1", "doctype", "charset"] },
    codeFill("hs-ie3", "Заголовок details", "Details heading", "html", "<details><___>Open</summary></details>", ["summary"], true),
    { ...mcq("hs-ie4", "Що надає details?", "What does details provide?", ["Нативне розгортання і згортання вмісту", "SQL join", "Компіляцію TypeScript", "Рейтинг Elo"], 0), optionsEn: ["Native expansion and collapse of content", "An SQL join", "TypeScript compilation", "An Elo rating"] },
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
      concept("hs-aria-concept", "HTML і ARIA", "HTML and ARIA", {
        uk: "Спочатку обирайте нативний HTML-елемент із потрібною семантикою та поведінкою. ARIA може доповнити доступну назву, роль або стан, але сама не додає обробку клавіатури чи фокус. Наприклад, role=\"button\" на div не робить його повноцінною кнопкою.",
        en: "First choose a native HTML element with the required semantics and behavior. ARIA can supplement an accessible name, role, or state, but does not itself add keyboard handling or focus. For example, role=\"button\" on a div does not turn it into a fully functioning button.",
      }),
      { ...mcq(
        "hs-a1",
        "ARIA слід:",
        "ARIA should:",
        ["доповнювати, не заміняти семантику HTML", "заміняти всі теги div'ами", "вимикати alt", "видаляти labels"],
        0,
      ), optionsEn: ["Supplement native HTML semantics", "Replace every element with a div", "Disable alt", "Remove labels"] },
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
      concept("hs-labelledby-concept", "Доступна назва за видимим текстом", "Naming from visible text", {
        uk: "aria-labelledby посилається на id одного або кількох елементів, текст яких задає доступну назву. Це корисно, коли видимий заголовок уже називає область. Для кнопки з коректними джерелами назви зазвичай спочатку враховується aria-labelledby, потім aria-label, текст кнопки і, за відсутності інших джерел, title. Перевіряйте обчислену назву в браузері та стежте, щоб вона містила видимий текст. Сам атрибут не реалізує модальність чи керування фокусом діалогу.",
        en: "aria-labelledby references the ids of one or more elements whose text supplies an accessible name. This is useful when a visible heading already names a region. For a button with valid naming sources, aria-labelledby normally takes precedence, followed by aria-label, button text, and, if other sources are absent, title. Inspect the computed name in the browser and ensure it includes the visible text. The attribute itself does not implement a dialog's modality or focus management.",
      }),
      { ...(codeRead(
        "hs-a3",
        "labelledby вказує на:",
        "labelledby points to:",
        "html",
        '<div role="dialog" aria-labelledby="t"><h2 id="t">Edit</h2></div>',
        ["id елемента з назвою", "CSS class only", "HTTP status", "npm package"],
        0,
      ) as Extract<Exercise, { type: "code_read" }>), optionsEn: ["The id of an element providing the name", "Only a CSS class", "An HTTP status", "An npm package"] },
      { ...mcq(
        "hs-a4",
        "Яке перше правило використання ARIA?",
        "First rule of ARIA:",
        ["Надавати перевагу відповідному нативному HTML", "Завжди додавати role=button до div", "Прибирати семантику", "Не використовувати підписи"],
        0,
      ), optionsEn: ["Prefer appropriate native HTML", "Always use role=button on divs", "Remove semantics", "Use no labels"] },
    ],
  ),
  exam("hs-a-exam", "Контрольна: a11y", "Exam: a11y", 3, [
    { ...mcq("hs-ae1", "З чого починати створення доступного елемента?", "Where should you start when creating an accessible control?", ["З відповідного семантичного HTML-елемента", "З div і лише ARIA", "Із видалення alt", "З відмови від підписів"], 0), optionsEn: ["With an appropriate semantic HTML element", "With a div and ARIA alone", "By removing alt", "By omitting labels"] },
    codeFill("hs-ae2", "aria-label", "aria-label", "html", '<button ___="Menu">☰</button>', ["aria-label"], true),
    { ...mcq("hs-ae3", "На що посилається aria-labelledby?", "What does aria-labelledby reference?", ["На id елемента з текстом назви", "Лише на CSS-селектор", "На SQL-запит", "На мережевий порт"], 0), optionsEn: ["The id of an element containing the name", "Only a CSS selector", "An SQL query", "A network port"] },
    { ...mcq("hs-ae4", "Що потрібно кнопці лише з іконкою?", "What does an icon-only button need?", ["Доступна назва, що описує дію", "Нічого", "Окремий doctype", "Властивість flex"], 0), optionsEn: ["An accessible name describing the action", "Nothing", "A separate doctype", "The flex property"] },
  ]),
]);

const appliedAccessibleMarkup = unit(
  "applied_accessible_markup",
  "Applied: доступна та семантична розмітка",
  "Applied: Accessible Markup Patterns",
  [
    lesson(
      "html-a11y-forms-errors",
      "Доступні форми: зв'язок label та aria-describedby",
      "Accessible forms: labels & aria-describedby for errors",
      3,
      false,
      [
        concept("hs-app-form-concept", "Підпис і повідомлення про помилку", "Labels and error messages", {
          uk: "label називає поле, а aria-describedby пов'язує його з додатковим текстом, наприклад підказкою чи повідомленням про помилку. Задавайте aria-invalid, коли значення визнано помилковим, і показуйте текст, що допомагає виправити проблему. Перевіряйте оголошення повідомлень програмою читання екрана, уникаючи дублювання.",
          en: "label names a control, while aria-describedby links it to supplemental text such as a hint or error. Set aria-invalid when the value is invalid and show text that helps the user correct it. Test announcements with a screen reader and avoid duplicate messages.",
        }),
        codeFill(
          "hs-app-1",
          "Зв'язок поля введення з текстом помилки через aria-describedby",
          "Link input field to error text via aria-describedby",
          "html",
          "<label for=\"user-email\">Email</label>\n<input id=\"user-email\" type=\"email\" aria-invalid=\"true\" aria-describedby=\"___\">\n<span id=\"email-err\">Некоректний email</span>",
          ["email-err"],
          true,
        ),
        { ...(codeRead(
          "hs-app-2",
          "Явний зв'язок label за допомогою атрибута for",
          "Explicit label association via for attribute",
          "html",
          "<label for=\"phone-input\">Номер телефону</label>\n<input id=\"phone-input\" type=\"tel\">",
          [
            "for збігається з id інпуту, роблячи його доступним для скрінрідерів і збільшуючи область кліку",
            "for працює тільки для чекбоксів",
            "id інпуту має бути 'label'",
            "Браузер не покаже текст label",
          ],
          0,
        ) as Extract<Exercise, { type: "code_read" }>), optionsEn: ["for matches the input id, associating its label and expanding the click target", "for works only for checkboxes", "The input id must be 'label'", "The browser will not show the label text"] },
        { ...mcq(
          "hs-app-3",
          "Чому placeholder не повинен замінювати тег <label>?",
          "Why must placeholder not replace a visible label?",
          [
            "Placeholder зникає при введенні тексту, має низький контраст і не озвучується багатьма скрінрідерами як назва поля",
            "Placeholder заборонений у стандарті HTML5",
            "Placeholder збільшує вагу сторінки",
            "Placeholder працює лише в десктопних браузерах",
          ],
          0,
        ), optionsEn: ["Placeholder text disappears during entry and is not a reliable persistent label", "Placeholder is forbidden by HTML", "Placeholder increases page weight", "Placeholder only works on desktop"] },
      ],
    ),
    lesson(
      "html-a11y-dialog-modals",
      "Семантика діалогових вікон: тег dialog та фокус",
      "Modal dialog semantics: dialog tag & focus trap",
      3,
      false,
      [
        concept("hs-app-dialog-concept", "Модальний діалог і фокус", "Modal dialogs and focus", {
          uk: "dialog.showModal() відкриває нативний модальний діалог і робить решту документа неактивною для взаємодії. Дайте діалогу доступну назву, перевірте початковий фокус, закриття та повернення фокуса до елемента відкриття. Escape зазвичай ініціює запит на закриття, але поведінку можна змінити або скасувати.",
          en: "dialog.showModal() opens a native modal dialog and makes the rest of the document inert to interaction. Give it an accessible name and check initial focus, closing, and focus return to the opener. Escape normally requests closing, but that behavior can be configured or canceled.",
        }),
        { ...(codeRead(
          "hs-app-4",
          "Відкриття модального діалогу через showModal()",
          "Open modal dialog with showModal()",
          "js",
          "const modal = document.querySelector('dialog');\nmodal.showModal(); // vs modal.show()",
          [
            "showModal() відкриває модальний діалог і робить решту документа неактивною",
            "showModal() показує діалог як звичайний inline блок",
            "show() працює лише в мобільних додатках",
            "showModal() видаляє форму зі сторінки",
          ],
          0,
        ) as Extract<Exercise, { type: "code_read" }>), optionsEn: ["showModal() opens a modal dialog and makes the rest of the document inert", "showModal() displays an ordinary inline block", "show() works only in mobile apps", "showModal() removes the form from the page"] },
        codeFill(
          "hs-app-5",
          "Закриття нативного діалогу",
          "Close native dialog element",
          "js",
          "closeBtn.addEventListener('click', () => {\n  dialog.___();\n});",
          ["close"],
          true,
        ),
      ],
    ),
    lesson(
      "html-a11y-landmark-hierarchy",
      "Виправлення ієрархії заголовків та landmarks",
      "Fixing landmarks & heading outlines",
      3,
      false,
      [
        concept("hs-app-structure-concept", "Орієнтири та заголовки разом", "Landmarks and headings together", {
          uk: "Landmarks допомагають перейти до великих областей сторінки, а заголовки описують теми всередині них. Різним nav надавайте відмінні доступні назви; повторений однаковий набір посилань може мати ту саму назву. Перевіряйте структуру у списках орієнтирів і заголовків допоміжної технології, а не лише за зовнішнім виглядом.",
          en: "Landmarks support navigation between major page regions, while headings describe the topics inside them. Give different nav regions distinct accessible names; repeated identical sets of links may share a name. Inspect the landmark and heading lists in assistive technology rather than relying only on visual appearance.",
        }),
        { ...(codeRead(
          "hs-app-6",
          "Семантична структура сторінки без пропуску рівнів заголовків",
          "Heading levels without skipping",
          "html",
          "<header>EduForge</header>\n<main>\n  <h1>My learning</h1>\n  <section>\n    <h2>My courses</h2>\n    <article><h3>JavaScript</h3></article>\n  </section>\n</main>",
          [
            "Ієрархія заголовків логічно спускається h1 → h2 → h3 без пропусків рівнів",
            "На сторінці має бути не менше п'яти h1",
            "article не може містити заголовки",
            "main не повинен бути всередині body",
          ],
          0,
        ) as Extract<Exercise, { type: "code_read" }>), optionsEn: ["The heading hierarchy proceeds logically from h1 to h2 to h3", "The page must have at least five h1 headings", "article cannot contain headings", "main must not be inside body"] },
        codeFill(
          "hs-app-7",
          "Задайте навігації назву Primary navigation через aria-label.",
          "Give the navigation the accessible name Primary navigation using aria-label.",
          "html",
          "<nav aria-label=\"___\">\n  <ul><li><a href=\"/courses\">Курси</a></li></ul>\n</nav>",
          ["Primary navigation", "primary navigation", "Main navigation", "main navigation", "Primary", "Main"],
          false,
        ),
      ],
    ),
    lesson(
      "html-a11y-cumulative-task",
      "Підсумковий таск: доступна інтерактивна картка",
      "Applied task: semantic action card",
      3,
      false,
      [
        concept("hs-app-card-concept", "Картка з посиланням", "A card with a link", {
          uk: "article може об'єднувати самостійний опис курсу, а заголовок давати йому назву через aria-labelledby. Для переходу використовуйте посилання з конкретною назвою. Якщо картки повторюються, кожен id має бути унікальним; перевірте також фокус, контраст та зміст посилань у контексті сторінки.",
          en: "article can group a self-contained course description, and a heading can name it via aria-labelledby. Use a link with a meaningful name for navigation. If cards repeat, every id must be unique; also check focus, contrast, and link meaning in the context of the page.",
        }),
        codeOrder(
          "hs-app-8",
          "Побудова доступної інтерактивної картки статті",
          "Structure accessible interactive article card",
          "html",
          [
            "<article class=\"course-card\" aria-labelledby=\"card-title\">",
            "  <header><h3 id=\"card-title\">Deep JavaScript</h3></header>",
            "  <p>Explore closures, the event loop, and prototypes.</p>",
            "  <footer><a href=\"/js-fundamentals\" class=\"cta-link\">Study JavaScript</a></footer>",
            "</article>",
          ],
          [
            "<article class=\"course-card\" aria-labelledby=\"card-title\">",
            "  <header><h3 id=\"card-title\">Deep JavaScript</h3></header>",
            "  <p>Explore closures, the event loop, and prototypes.</p>",
            "  <footer><a href=\"/js-fundamentals\" class=\"cta-link\">Study JavaScript</a></footer>",
            "</article>",
          ],
        ),
        codeFill(
          "hs-app-9",
          "Атрибут для приховання декоративної іконки від скрінрідерів",
          "Attribute to hide decorative icon from screen readers",
          "html",
          "<svg aria-hidden=\"___\" focusable=\"false\">...</svg>",
          ["true"],
          true,
        ),
      ],
    ),
    exam(
      "html-a11y-exam",
      "Екзамен: доступна та семантична верстка",
      "Exam: accessible markup",
      3,
      [
        { ...mcq(
          "hs-app-10",
          "Яка різниця між role='button' на тегу <div> та справжнім тегом <button>?",
          "Difference between div with role='button' and native <button>?",
          [
            "Нативний <button> підтримує фокус із клавіатури, активацію через Space/Enter та стан disabled з коробки",
            "role='button' швидше працює в CSS",
            "Між ними немає жодної різниці",
            "<div> не підтримує атрибут class",
          ],
          0,
        ), optionsEn: ["A native button provides keyboard focus, Space/Enter activation, and disabled behavior", "role='button' makes CSS faster", "There is no difference", "A div cannot have a class"] },
        { ...(codeRead(
          "hs-app-11",
          "Для чого потрібне посилання skip-link на початку сторінки?",
          "What is the purpose of a skip-link at page start?",
          "html",
          "<a href=\"#main-content\" class=\"skip-link\">Перейти до основного контенту</a>",
          [
            "Дозволяє користувачам із клавіатурою пропустити повторювану навігацію шапки",
            "Прискорює завантаження шрифтів",
            "Потрібне для SEO-оптимізації",
            "Закриває всі модальні вікна",
          ],
          0,
        ) as Extract<Exercise, { type: "code_read" }>), optionsEn: ["It lets keyboard users bypass repeated header navigation", "It speeds up font loading", "It is required for SEO", "It closes all modal dialogs"] },
        codeFill(
          "hs-app-12",
          "Семантичний тег для бічної панелі або допоміжного контенту",
          "Semantic tag for sidebar or supplementary content",
          "html",
          "<___>\n  <h3>Пов'язані статті</h3>\n</aside>",
          ["aside"],
          true,
        ),
        codeOrder(
          "hs-app-13",
          "Для кнопки з допустимими назвами розташуйте джерела за пріоритетом: aria-labelledby, aria-label, текст кнопки, title.",
          "For a button with valid naming sources, order aria-labelledby, aria-label, button text, and title by precedence.",
          "text",
          [
            "title",
            "aria-label",
            "button text",
            "aria-labelledby",
          ],
          [
            "aria-labelledby",
            "aria-label",
            "button text",
            "title",
          ],
        ),
      ],
    ),
  ],
);

const accessibleInteractions = unit(
  "accessible_interactions",
  "Доступна валідація, фокус, <dialog> і live regions",
  "Accessible Validation, Focus, Native <dialog> & Live Regions",
  [
    lesson(
      "hs-a11y-validation",
      "Доступні помилки форм та асинхронні статус-оголошення",
      "Accessible form validation & live status announcements",
      3,
      false,
      [
        concept("hs-ai-validation-concept", "Повідомлення, доступні під час роботи", "Accessible feedback during interaction", {
          uk: "Після невдалої перевірки покажіть зрозумілу помилку та пов'яжіть її з полем через aria-describedby; aria-invalid позначає стан помилки. Для ненагальних змін можна оновити заздалегідь наявний role=\"status\". Озвучення залежить від браузера і допоміжної технології, тому перевіряйте сценарій із реальною програмою читання екрана.",
          en: "After validation fails, show an understandable error and associate it with the field via aria-describedby; aria-invalid marks the invalid state. For nonurgent changes, update an existing role=\"status\" region. Announcements depend on the browser and assistive technology, so test the flow with a real screen reader.",
        }),
        { ...mcq(
          "hs-ai1",
          "Користувач із screen reader надсилає порожню форму, і текст помилки з'являється під полем. Чого бракує, якщо атрибут `aria-describedby` не підключений?",
          "A screen-reader user submits an empty form and an error text renders below the input. What is missing without `aria-describedby`?",
          [
            "Помилка не пов'язана з полем як його доступний опис",
            "Браузер заблокує подію submit",
            "CSS не зможе пофарбувати рамку в червоний",
            "Поле автоматично стане disabled",
          ],
          0,
          why(
            "aria-invalid позначає стан, а aria-describedby пов'язує текст; перевірте фактичне озвучення з допоміжною технологією.",
            "aria-invalid marks the state and aria-describedby links the text; test actual announcements with assistive technology.",
          ),
        ), optionsEn: ["The error is not associated with the input as its accessible description", "The browser blocks submit", "CSS cannot color the border red", "The input becomes disabled automatically"] },
        codeFill(
          "hs-ai2",
          "Додайте атрибут, щоб статус-банер асинхронного збереження задачі оголошувався ввічливо без переривання вводу",
          "Configure a live region so async task save status announces politely without interrupting typing",
          "html",
          '<p id="save-status" role="status" aria-live="___"></p>\n<!-- Update its text after saving. -->',
          ["polite"],
          true,
          why(
            "`aria-live=\"polite\"` (або `role=\"status\"`) чекає паузи мовлення, тоді як `assertive` перериває користувача.",
            "`aria-live=\"polite\"` waits for speech pause; reserve `assertive` for critical alerts.",
          ),
        ),
        { ...(codeRead(
          "hs-ai3",
          "Діагностуйте збій доступності: чому кнопка «Деталі» у списку не працює з клавіатури?",
          "Diagnose the keyboard accessibility failure in this task card:",
          "html",
          '<div class="task-card" onclick="openTask(42)">\n  <h3>Fix login bug</h3>\n</div>',
          [
            "`<div>` не є фокусованим (`Tab` його пропускає) і не реагує на Enter/Space — потрібен нативний `<button type=\"button\">`",
            "`onclick` не підтримується в HTML5",
            "Всередині `<div>` не можна використовувати `<h3>`",
            "Потрібен атрибут `aria-hidden=\"true\"`",
          ],
          0,
          why(
            "Використовуйте нативний `<button>` (або `<a>` для навігації), щоб отримати Tab-фокус, Enter/Space і роль автоматично.",
            "Native `<button>` provides focusability, Enter/Space activation, and semantic role out of the box.",
          ),
        ) as Extract<Exercise, { type: "code_read" }>), optionsEn: ["The div is not keyboard focusable or activated with Enter/Space; use a native button", "onclick is unsupported in HTML", "An h3 cannot be inside a div", "It needs aria-hidden=true"] },
      ],
    ),
    lesson(
      "hs-native-dialog-focus",
      "Нативний <dialog> і керування фокусом",
      "Native <dialog> & focus management",
      3,
      false,
      [
        concept("hs-ai-focus-concept", "Фокус після модального підтвердження", "Focus after modal confirmation", {
          uk: "Поки модальний dialog відкритий, фон сторінки інертний, тому фокус не можна надійно перемістити до сусіднього елемента поза ним. Після підтвердження закрийте діалог, оновіть список і встановіть фокус на наявний логічний елемент, наприклад наступну задачу або кнопку додавання. Перевірте сценарій, коли видалений елемент був початковим тригером.",
          en: "While a modal dialog is open, the page background is inert, so focus cannot reliably move to a neighboring element outside it. After confirmation, close the dialog, update the list, and focus an existing logical target, such as the next task or the add button. Test the case where the deleted item was the original trigger.",
        }),
        { ...codeOutputMcq(
          "hs-ai4",
          "Яка різниця між `dialog.show()` та `dialog.showModal()` у браузері?",
          "Predict the difference between `dialog.show()` and `dialog.showModal()`:",
          "js",
          "const dlg = document.getElementById('task-modal');\ndlg.showModal();",
          [
            "`showModal()` відкриває модальний шар і робить фоновий контент інертним",
            "`show()` автоматично видаляє сторінку з історії",
            "`showModal()` не дозволяє натискати кнопки всередині діалогу",
            "Вони абсолютно однакові",
          ],
          0,
          why(
            "Перевіряйте початковий фокус, закриття та повернення фокуса: поведінка Escape може бути змінена чи скасована.",
            "Check initial focus, closing, and focus return: Escape behavior can be configured or canceled.",
          ),
        ), optionsEn: ["showModal() opens a modal and makes background content inert", "show() automatically removes the page from history", "showModal() prevents activating buttons inside the dialog", "They behave exactly the same"] },
        codeFill(
          "hs-ai5",
          "Закрийте нативний `<dialog>` після підтвердження видалення задачі",
          "Close a native `<dialog>` after confirming task deletion",
          "js",
          "dialog.___('confirm');",
          ["close"],
          true,
          why("`dialog.close(returnValue)` закриває діалог і записує `dialog.returnValue`.", "`dialog.close(returnValue)` closes the modal and records `returnValue`."),
        ),
        { ...codeOrder(
          "hs-ai6",
          "Впорядкуйте кроки видалення, якщо застосунок повідомляє про результат після відновлення фокуса.",
          "Order the deletion steps for an app that announces the result after restoring focus.",
          "text",
          ["Update the list after removing the task", "Move focus to an existing neighboring task or Add button", "Confirm deletion and close the modal", "Update the live region with the deletion message"],
          ["Confirm deletion and close the modal", "Update the list after removing the task", "Move focus to an existing neighboring task or Add button", "Update the live region with the deletion message"],
          why(
            "Після закриття діалогу фон більше не інертний; виберіть наявну ціль фокусу після оновлення списку.",
            "After closing the dialog the background is no longer inert; choose an existing focus target after updating the list.",
          ),
        ), linesUk: ["Прибрати задачу та оновити список", "Перемістити фокус на наявну сусідню задачу або кнопку «Додати»", "Підтвердити видалення та закрити модальне вікно", "Оновити live region повідомленням про видалення"] },
      ],
    ),
    exam("hs-ai-exam", "Контрольна: інтерактивна доступність", "Exam: accessible interactions", 3, [
      mcq(
        "hs-aie1",
        "Яка зв'язка атрибутів найкраще описує невалідне поле форми?",
        "Which attribute pair best communicates an invalid form field and its error message?",
        [
          "`aria-invalid=\"true\"` + `aria-describedby=\"error-id\"`",
          "`placeholder=\"Error\"` + `title=\"bad\"`",
          "`aria-hidden=\"true\"` + `tabindex=\"-1\"`",
          "`role=\"presentation\"`",
        ],
        0,
        why("`aria-invalid` сигналізує стан помилки, а `aria-describedby` пов'язує текст пояснення.", "`aria-invalid` flags invalidity and `aria-describedby` links the explanation."),
      ),
      codeFill(
        "hs-aie2",
        "Вбудований HTML-елемент для модального вікна",
        "Built-in HTML element for modal dialogs",
        "html",
        "<___ id=\"details-modal\" aria-labelledby=\"modal-title\">…</dialog>",
        ["dialog"],
        true,
        why("showModal() відкриває dialog у верхньому шарі; перевіряйте налаштування закриття та фокус.", "showModal() opens dialog in the top layer; check closing behavior and focus."),
      ),
      { ...codeRead(
        "hs-aie3",
        "Чому встановлювати `tabindex=\"5\"` на кнопки — погана практика?",
        "Why is positive `tabindex=\"5\"` an accessibility anti-pattern?",
        "html",
        '<button tabindex="5">Save</button>',
        [
          "Порушує природний порядок навігації по DOM і плутає користувачів клавіатури; краще порядок в HTML або `0`/`-1`",
          "Браузер ігнорує CSS для tabindex > 0",
          "tabindex працює лише на `<img>`",
          "Це заборонено для `<button>`",
        ],
        0,
        why("Позитивний `tabindex` ламає очікуваний порядок Tab-обходу.", "Positive `tabindex` overrides natural DOM tab order unexpectedly."),
      ), optionsEn: ["It overrides the natural tab order and can confuse keyboard users; prefer DOM order or 0/-1", "Browsers ignore CSS for positive tabindex", "tabindex only works on images", "It is forbidden on buttons"] },
      { ...mcq(
        "hs-aie4",
        "Який регіон підходить для повідомлення «Задачу додано» після збереження?",
        "Which live-region pattern fits a non-blocking «Task added» confirmation?",
        [
          "`<p role=\"status\" aria-live=\"polite\">`",
          "`alert()` у циклі",
          "`aria-hidden=\"true\"`",
          "`<span tabindex=\"-1\">` без role",
        ],
        0,
        why("`role=\"status\"` + `aria-live=\"polite\"` озвучує статус без переривання користувача.", "`role=\"status\"` with `aria-live=\"polite\"` announces cleanly without stealing focus."),
      ), optionsEn: ["`<p role=\"status\" aria-live=\"polite\">`", "`alert()` in a loop", "`aria-hidden=\"true\"`", "`<span tabindex=\"-1\">` without a role"] },
    ]),
  ],
);

const capstone = unit("capstone", "Capstone", "Capstone", [
  lesson(
    "hs-capstone-landing",
    "Semantic landing",
    "Semantic landing",
    3,
    false,
    [
      concept("hs-capstone-concept", "Перевірка семантичного лендінгу", "Checking a semantic landing page", {
        uk: "Створіть сторінку з орієнтирами, зрозумілими заголовками та навігацією, підключіть стилі й перевірте її клавіатурою. Перевірка в цій вправі шукає задані фрагменти тексту у файлах: вона не аналізує правильність HTML, CSS чи доступність і може знайти фрагменти навіть у коментарях. Тому перегляньте результат у браузері та самостійно перевірте зміст.",
        en: "Create a page with landmarks, clear headings, and navigation, connect the styles, and test it with a keyboard. This exercise searches for specified text fragments in the files: it does not validate HTML, CSS, or accessibility and can find fragments even in comments. Inspect the result in a browser and check the content yourself.",
      }),
      {
        id: "hs-c1",
        type: "code_project",
        promptUk:
          "Вихідні файли: index.html, styles.css, README.md. Створіть лендінг із <header>, <nav>, <main>, <article>, <h1>, <footer>; додайте .wrap і max-width у styles.css та опишіть landmarks у README. Перевірка шукає текстові фрагменти, включно з коментарями; вона не перевіряє семантику, доступність чи виконання сторінки.",
        promptEn:
          "Input files: index.html, styles.css, README.md. Build a landing page with <header>, <nav>, <main>, <article>, <h1>, and <footer>; add .wrap and max-width in styles.css and describe landmarks in README. The checker searches text fragments, including comments; it does not verify semantics, accessibility, or page execution.",
        files: [
          {
            id: "html",
            name: "index.html",
            language: "html",
            starter: `<!DOCTYPE html>
<html lang="uk">
<head><meta charset="UTF-8"><title>Landing</title><link rel="stylesheet" href="styles.css"></head>
<body>
  <!-- TODO: build the page structure. -->
</body>
</html>`,
          },
          {
            id: "css",
            name: "styles.css",
            language: "css",
            starter: `.wrap {
  /* TODO: constrain the content width. */
}
`,
          },
          {
            id: "md",
            name: "README.md",
            language: "markdown",
            starter: `# Semantics
<!-- TODO: describe the page structure. -->
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
  lesson(
    "hs-forgeboard-a11y-lab",
    "ForgeBoard M1: Доступний інтерфейс реєстрації й задач",
    "ForgeBoard M1: Accessible Task & Settings Interface",
    4,
    false,
    [
      { ...mcq(
        "hs-fb1",
        "У локальній лабі ForgeBoard M1: як пов'язати поле «Назва задачі» з текстом помилки для screen reader?",
        "In ForgeBoard M1: how do you bind a task title input to its validation error message?",
        [
          "`<label for=\"task-title\">` + `aria-describedby=\"task-title-error\"` + `aria-invalid`",
          "Лише `placeholder` без `<label>`",
          "`title` атрибут і червона рамка",
          "Окремий `<div>` без атрибутів",
        ],
        0,
        why("Семантичний `<label>` і `aria-describedby` забезпечують читання і підпису, і помилки.", "Semantic `<label>` plus `aria-describedby` expose both label and error."),
      ), optionsEn: ["A label for task-title, aria-describedby referencing the error, and aria-invalid", "Only a placeholder without a label", "A title attribute and red border", "A separate div without attributes"] },
      codeFill(
        "hs-fb2",
        "У ForgeBoard M1: додайте підтримку налаштувань зменшення руху в CSS",
        "In ForgeBoard M1: add reduced-motion media query in CSS",
        "css",
        "@media (___: reduce) { * { transition-duration: 0.01ms !important; } }",
        ["prefers-reduced-motion"],
        true,
        why("Користувачі з вестибулярною чутливістю очікують поваги до `prefers-reduced-motion`.", "Respecting `prefers-reduced-motion` prevents unwanted motion for sensitive users."),
      ),
    ],
  ),
  exam("hs-cap-exam", "Фінальна контрольна", "Final exam", 3, [
    { ...mcq("hs-ce1", "Що позначає main?", "What does main identify?", ["Область основного вмісту", "Метадані", "Тип документа", "Кодування"], 0), optionsEn: ["The primary content landmark", "Metadata", "The document type", "The encoding"] },
    codeFill("hs-ce2", "Навігаційна область", "Navigation region", "html", "<___>…</nav>", ["nav"], true),
    { ...mcq("hs-ce3", "Із чим має збігатися for у label?", "What should label's for match?", ["З id пов'язаного поля", "Лише з class", "З href", "З src"], 0), optionsEn: ["The associated control's id", "Only its class", "Its href", "Its src"] },
    { ...mcq("hs-ce4", "Для чого підходить article?", "What is article suited for?", ["Для самостійного матеріалу", "Лише для CSS", "Для рядка SQL", "Для мережевого порту"], 0), optionsEn: ["Self-contained content", "Only CSS", "An SQL row", "A network port"] },
    codeFill("hs-ce5", "alt", "alt", "html", '<img src="a" ___="desc">', ["alt"], true),
    { ...mcq("hs-ce6", "Із чого починати доступну розмітку?", "Where should accessible markup start?", ["З відповідного нативного HTML", "Із div для всього", "Із видалення заголовків", "Із пропуску підписів форм"], 0), optionsEn: ["With appropriate native HTML", "With a div for everything", "By removing headings", "By omitting form labels"] },
  ]),
]);

export const htmlSemanticsContent: CourseContent = {
  slug: "html_semantics",
  titleUk: "HTML: семантика",
  titleEn: "HTML Semantics",
  descriptionUk:
    "Семантична верстка: landmarks, outline, доступні форми й валідація, фокус, <dialog>, live regions та ForgeBoard M1.",
  descriptionEn:
    "Semantic markup: landmarks, outline, accessible forms & validation, focus management, native <dialog>, live regions, and ForgeBoard M1.",
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
    appliedAccessibleMarkup,
    accessibleInteractions,
    capstone,
  ],
};
