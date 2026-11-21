import type { CourseContent, LessonContent, UnitContent } from "../types.js";
import { expandCourse, sectionUnit, teachLesson } from "./factory.js";

export const newUnits: UnitContent[] = [
  sectionUnit(
    "responsive_media",
    "Адаптивні зображення й медіа",
    "Responsive images and media",
    [
      {
        slug: "hs-picture-srcset",
        titleUk: "srcset, sizes і елемент picture",
        titleEn: "srcset, sizes, and the picture element",
        difficulty: 3,
        pointsUk: ["srcset дає варіанти, sizes — ширину слота в макеті", "picture — для кадрування й форматів, не замість alt", "img усередині picture обов'язковий"],
        pointsEn: ["srcset is the variants, sizes is the slot width in the layout", "picture is for crops and formats, not a substitute for alt", "An img inside picture is required"],
        conceptUk: "Атрибут srcset перелічує варіанти одного зображення з дескрипторами ширини (400w, 800w) або щільності (1x, 2x); не змішуйте ці типи в одному списку. Для w-дескрипторів sizes описує очікувану ширину слота, а браузер обирає ресурс з урахуванням щільності екрана та інших умов. У picture можна задати інше кадрування через source media або альтернативний формат через type. Вкладений img є запасним варіантом і містить alt: змістовний опис або порожній alt для декоративного зображення. Задайте width і height, щоб зарезервувати пропорції до завантаження та зменшити зсув макета; для різних кадрувань перевіряйте відповідні пропорції.",
        conceptEn: "The srcset attribute lists variants of an image with width descriptors (400w, 800w) or density descriptors (1x, 2x); do not mix the two types in one list. With w descriptors, sizes describes the expected slot width and the browser selects a resource considering screen density and other conditions. In picture, source media can select a different crop and type can select an alternative format. The nested img supplies the fallback and alt: a meaningful description, or empty alt for a decorative image. Set width and height to reserve the aspect ratio before loading and reduce layout shift; check the corresponding ratios for different crops.",
        code: "<img src='hero-800.jpg' srcset='hero-400.jpg 400w, hero-800.jpg 800w' sizes='(max-width: 600px) 100vw, 800px' width='800' height='450' alt='Harbour at dawn'>",
        language: "html",
        retrieval: [
          { kind: "mcq", promptUk: "Навіщо атрибут sizes разом із srcset і дескрипторами w?", promptEn: "Why do you need the sizes attribute together with srcset and w descriptors?", options: ["браузер знає ширину слота в макеті й обирає відповідний файл", "sizes задає alt", "без sizes picture невалідний", "sizes вимикає ліниве завантаження"], optionsEn: ["It tells the browser the layout slot width to help select a file", "It supplies alt", "picture is invalid without sizes", "It disables lazy loading"], correctIndex: 0, explanationUk: "Для дескрипторів ширини запасне значення sizes зазвичай становить 100vw.", explanationEn: "For width descriptors, the default source size is generally 100vw." },
          { kind: "fill", promptUk: "Допишіть елемент для art direction", promptEn: "Fill in the element used for art direction", language: "html", code: "<___><source media='(max-width: 600px)' srcset='hero-narrow.jpg'><img src='hero.jpg' alt='Harbour'></picture>", accepted: ["picture"], caseSensitive: true, explanationUk: "Елемент — picture.", explanationEn: "The element is picture." },
          { kind: "read", promptUk: "Чого не вистачає цій розмітці для доступності?", promptEn: "What is this markup missing for accessibility?", language: "html", code: "<picture><source type='image/avif' srcset='p.avif'><img src='p.jpg'></picture>", options: ["атрибут alt на img", "ще один picture", "обов'язковий sizes на source", "закритий тег source"], optionsEn: ["An alt attribute on img", "Another picture", "A required sizes attribute on source", "A closing source tag"], correctIndex: 0, explanationUk: "alt живе на img, навіть усередині picture.", explanationEn: "alt lives on img, even inside picture." }
        ],
        whyUk: "Коли обрати picture, а коли достатньо img з srcset?",
        whyEn: "When should you choose picture, and when is an img with srcset enough?",
        ideas: [{ labelUk: "різні кадри", labelEn: "different crops", anyOf: ["кадр", "crop", "art", "picture", "media"] }, { labelUk: "sizes і слот", labelEn: "sizes and the slot", anyOf: ["sizes", "слот", "slot", "srcset", "дескриптор"] }, { labelUk: "alt на img", labelEn: "alt on img", anyOf: ["alt", "img", "доступ", "access"] }],
        sampleUk: "img із srcset і sizes достатньо, коли змінюється лише роздільність того самого кадру; picture потрібен для іншого кадрування чи формату, а alt завжди лишається на вкладеному img.",
        sampleEn: "An img with srcset and sizes is enough when only the resolution of the same crop changes; picture is for a different crop or format, and alt always stays on the nested img.",
      },
      {
        slug: "hs-media-preload",
        titleUk: "preload, decoding і fetchpriority для медіа",
        titleEn: "preload, decoding, and fetchpriority for media",
        difficulty: 3,
        pointsUk: ["preload за потреби для пізно виявленого LCP", "Не ставте lazy на героя вище згину", "fetchpriority уточнює чергу, не замінює sizes"],
        pointsEn: ["Use preload when needed for a late-discovered LCP image", "Do not lazy-load a hero above the fold", "fetchpriority refines the queue, it does not replace sizes"],
        conceptUk: "Точковий link rel=preload as=image з imagesrcset і imagesizes може допомогти раніше знайти пізно виявлене LCP-зображення; зайві preload конкурують з іншими ресурсами. decoding=async і decoding=sync — підказки браузеру щодо узгодження декодування з відображенням, а не гарантії конкретного потоку чи швидкості. fetchpriority=high може підвищити пріоритет важливого зображення. Уникайте loading=lazy для зображення, потрібного одразу, і вимірюйте результат.",
        conceptEn: "A targeted link rel=preload as=image with imagesrcset and imagesizes can help discover a late LCP image earlier; unnecessary preloads compete with other resources. decoding=async and decoding=sync are hints about coordinating decoding with presentation, not guarantees about threads or speed. fetchpriority=high can raise the priority of an important image. Avoid loading=lazy for an image needed immediately and measure the result.",
        code: "<link rel='preload' as='image' href='hero-800.jpg' imagesrcset='hero-400.jpg 400w, hero-800.jpg 800w' imagesizes='100vw'>",
        language: "html",
        retrieval: [
          { kind: "mcq", promptUk: "Чому loading=lazy на головному банері вище згину може погіршити LCP?", promptEn: "Why can loading=lazy on a main banner above the fold hurt LCP?", options: ["браузер може відкласти запит, і найбільший видимий малюнок запізниться", "lazy заборонений у HTML", "lazy вимикає alt", "preload тоді обов'язковий законом"], optionsEn: ["The browser may delay the request and the largest visible image", "lazy is forbidden in HTML", "lazy disables alt", "preload is legally required"], correctIndex: 0, explanationUk: "LCP-кандидат має стартувати якомога раніше.", explanationEn: "The LCP candidate should start as early as possible." },
          { kind: "fill", promptUk: "Допишіть підказку пріоритету для героя", promptEn: "Fill in the priority hint for the hero", language: "html", code: "<img src='hero.jpg' alt='Festival' fetch___='high'>", accepted: ["priority"], caseSensitive: true, explanationUk: "Атрибут — fetchpriority.", explanationEn: "The attribute is fetchpriority." },
          { kind: "mcq", promptUk: "Чим небезпечний preload усіх зображень сторінки?", promptEn: "What is dangerous about preloading every image on the page?", options: ["вони конкурують за мережу з CSS і шрифтами, справжній LCP може запізнитись", "браузер проігнорує img", "alt перестане читатись", "picture стане невалідним"], optionsEn: ["They compete with CSS and fonts for bandwidth and can delay LCP", "The browser ignores img", "alt becomes unreadable", "picture becomes invalid"], correctIndex: 0, explanationUk: "Прелоад — точковий інструмент.", explanationEn: "Preload is a surgical tool." }
        ],
        whyUk: "Як прискорити LCP-зображення, не зашкодивши іншим ресурсам?",
        whyEn: "How do you speed up the LCP image without hurting other resources?",
        ideas: [{ labelUk: "точковий preload", labelEn: "a surgical preload", anyOf: ["preload", "lcp", "imagesrcset"] }, { labelUk: "не lazy вище згину", labelEn: "not lazy above the fold", anyOf: ["lazy", "згин", "fold", "герой", "hero"] }, { labelUk: "fetchpriority", labelEn: "fetchpriority", anyOf: ["fetchpriority", "high", "low", "черга", "queue"] }],
        sampleUk: "LCP-зображенню не ставлять loading=lazy і можуть дати fetchpriority=high; якщо його виявляють пізно, варто виміряти точковий preload. Масовий preload може перевантажити канал.",
        sampleEn: "Avoid loading=lazy on an LCP image and consider fetchpriority=high; if discovery is late, measure the effect of a targeted preload. Preloading everything can congest the network.",
      },
      {
        slug: "hs-track-captions",
        titleUk: "Доріжки track: субтитри й описи",
        titleEn: "track elements: captions and descriptions",
        difficulty: 3,
        pointsUk: ["captions — доступність діалогу, не те саме що subtitles", "label і srclang для меню плеєра", "Вшитий у кадр текст не замінює track"],
        pointsEn: ["captions are dialogue accessibility, not the same as subtitles", "label and srclang belong in the player menu", "Burned-in text is not a substitute for track"],
        conceptUk: "track у video або audio підключає текстову доріжку WebVTT. captions передають репліки та важливі немовні звуки; subtitles часто призначені для перекладу. descriptions містить текстові описи візуального змісту, які можуть озвучуватися допоміжною технологією; підтримку плеєра слід перевіряти. default задає доріжку за замовчуванням, а srclang і label допомагають її визначити. Для міждоменного VTT налаштуйте CORS і відповідний атрибут crossorigin медіаелемента.",
        conceptEn: "track in video or audio attaches a WebVTT text track. Captions convey dialogue and important non-speech sounds; subtitles are often used for translation. descriptions contains text descriptions of visual content that assistive technology may speak; test player support. default marks a default track, while srclang and label help identify it. For cross-origin VTT, configure CORS and the media element's appropriate crossorigin attribute.",
        code: "<video controls>\n  <source src='talk.mp4' type='video/mp4'>\n  <track kind='captions' srclang='uk' label='Українські' src='talk.uk.vtt' default>\n</video>",
        language: "html",
        retrieval: [
          { kind: "mcq", promptUk: "Який kind потрібен глухим глядачам рідною мовою відео?", promptEn: "Which kind do deaf viewers need in the video's own language?", options: ["captions, бо там і репліки, і важливі звуки", "chapters", "metadata лише", "subtitles тільки якщо це переклад, і без звуків"], optionsEn: ["captions, because they include dialogue and important sounds", "chapters", "metadata only", "subtitles only as translation without sounds"], correctIndex: 0, explanationUk: "Captions описують також немовні звуки.", explanationEn: "Captions also describe non-speech sounds." },
          { kind: "fill", promptUk: "Допишіть доріжку субтитрів за замовчуванням", promptEn: "Fill in a default captions track", language: "html", code: "<track kind='captions' srclang='uk' label='Українські' src='talk.uk.vtt' ___>", accepted: ["default"], caseSensitive: true, explanationUk: "Атрибут — default.", explanationEn: "The attribute is default." },
          { kind: "mcq", promptUk: "Яку перевагу має окрема доріжка captions перед вшитим текстом?", promptEn: "What advantage does a separate captions track have over burned-in text?", options: ["підтримуваний плеєр може дати змогу вмикати, вимикати й налаштовувати доріжку", "браузер автоматично гарантує правильність тексту", "VTT замінює аудіоопис", "track працює лише без звуку"], optionsEn: ["A supporting player can let viewers enable, disable, and customize the track", "The browser automatically guarantees the text is accurate", "VTT replaces audio description", "track only works without audio"], correctIndex: 0, explanationUk: "Окрема доріжка дає більше контролю; перевіряйте доступність у потрібних плеєрах.", explanationEn: "A separate track offers more control; test accessibility in the players you support." }
        ],
        whyUk: "Чим kind=captions відрізняється від kind=subtitles?",
        whyEn: "How does kind=captions differ from kind=subtitles?",
        ideas: [{ labelUk: "звуки й репліки", labelEn: "sounds and dialogue", anyOf: ["caption", "звук", "sound", "діалог", "dialogue"] }, { labelUk: "переклад subtitles", labelEn: "subtitles as translation", anyOf: ["subtitle", "переклад", "translation"] }, { labelUk: "окремий VTT", labelEn: "a separate VTT", anyOf: ["vtt", "track", "вшит", "burned", "default"] }],
        sampleUk: "captions передають репліки й важливі звуки для тих, хто не чує, subtitles частіше є перекладом, а вшитий у кадр текст не замінює окремий файл track.",
        sampleEn: "captions carry dialogue and important sounds for people who cannot hear, subtitles are more often a translation, and text burned into the frame is not a substitute for a separate track file.",
      }
    ],
    "Контрольна: адаптивні медіа",
    "Exam: responsive media",
    [
      { promptUk: "sizes разом із srcset потрібен, щоб…", promptEn: "sizes together with srcset is needed so…", options: ["браузер знав ширину слота й обрав файл", "задати alt", "замінити picture", "вимкнути lazy"], optionsEn: ["The browser knows the slot width and can select a file", "Set alt", "Replace picture", "Disable lazy loading"], correctIndex: 0, explanationUk: "Ширина макета, не лише файли.", explanationEn: "Layout width, not only files." },
      { promptUk: "loading=lazy на LCP-герої вище згину…", promptEn: "loading=lazy on an above-the-fold LCP hero…", options: ["може затримати завантаження головного зображення", "обов'язковий", "замінює preload", "потрібний для alt"], optionsEn: ["Can delay loading the main image", "Is required", "Replaces preload", "Is necessary for alt"], correctIndex: 0, explanationUk: "Не відкладайте завантаження LCP-зображення.", explanationEn: "Do not defer loading the LCP image." },
      { promptUk: "kind для глухих глядачів рідною мовою…", promptEn: "The kind for deaf viewers in the video's language is…", options: ["captions", "chapters", "metadata", "poster"], correctIndex: 0, explanationUk: "Репліки і звуки.", explanationEn: "Dialogue and sounds." },
      { promptUk: "img всередині picture потрібен, бо…", promptEn: "An img inside picture is required because…", options: ["це запасний показ і місце для alt", "інакше source невалідний CSS", "браузер ігнорує picture без JS", "sizes тоді не діє"], optionsEn: ["It provides the fallback image and its alt", "Otherwise source is invalid CSS", "Browsers ignore picture without JS", "sizes no longer applies"], correctIndex: 0, explanationUk: "Запас і доступність.", explanationEn: "Fallback and accessibility." }
    ],
  ),
  sectionUnit(
    "web_components_html",
    "Web Components у HTML: template, слоти, тінь",
    "Web Components in HTML: template, slots, shadow",
    [
      {
        slug: "hs-template-slot",
        titleUk: "template і slot: розмітка, яку не показують одразу",
        titleEn: "template and slot: markup that is not shown at once",
        difficulty: 2,
        pointsUk: ["template зберігає інертний content", "slot розміщує дітей світлого DOM у тіньовому дереві", "Повторювані id в одному дереві — пастка"],
        pointsEn: ["template holds inert content", "A slot places light-DOM children in the shadow tree", "Repeated ids in the same tree are a trap"],
        conceptUk: "template зберігає інертний фрагмент, який сам не відображається. Клонування content створює копію; щоб показати її, копію потрібно вставити в документ або shadow root. slot у shadow root відображає безпосередніх дітей хоста: іменованих зі збіжним атрибутом slot або неіменованих у слоті за замовчуванням. Якщо призначених вузлів немає, показується запасний вміст самого slot; навіть текстовий вузол із пробілами може бути призначений неіменованому слоту. Самі передані вузли залишаються у світлому DOM. Перевіряйте унікальність id серед клонів у тому самому дереві; різні shadow root мають окремі області id.",
        conceptEn: "template holds an inert fragment that is not rendered by itself. Cloning content creates a copy; insert that copy into the document or a shadow root to display it. A slot in a shadow root displays direct host children: named children with a matching slot attribute or unnamed children in the default slot. When no nodes are assigned, the slot's fallback content is displayed; even a whitespace text node can be assigned to the default slot. The supplied nodes remain in the light DOM. Keep ids unique among clones in the same tree; separate shadow roots have separate id scopes.",
        code: "<template id='card'>\n  <h2><slot name='title'>Untitled</slot></h2>\n  <slot></slot>\n</template>",
        language: "html",
        retrieval: [
          { kind: "mcq", promptUk: "Що відбувається з вмістом template до вставлення його копії в документ?", promptEn: "What happens to template content before a copy is inserted into the document?", options: ["він зберігається як інертний фрагмент і сам не відображається", "він уже відображається на сторінці", "він автоматично створює shadow root", "він замінює весь body"], optionsEn: ["It remains an inert fragment and is not rendered by itself", "It is already displayed on the page", "It automatically creates a shadow root", "It replaces the entire body"], correctIndex: 0, explanationUk: "Клонування та вставлення копії дають змогу використати розмітку.", explanationEn: "Clone and insert a copy to use the markup." },
          { kind: "fill", promptUk: "Допишіть іменований слот", promptEn: "Fill in a named slot", language: "html", code: "<___ name='title'><span>Default title</span></slot>", accepted: ["slot"], caseSensitive: true, explanationUk: "Елемент — slot.", explanationEn: "The element is slot." },
          { kind: "mcq", promptUk: "Як автор сторінки передає заголовок у компонент зі слотом name=title?", promptEn: "How does a page author pass a heading into a component with a slot named title?", options: ["покласти елемент із атрибутом slot=title як безпосередню дитину компонента", "написати title як атрибут лише на html", "слоти не приймають світлий DOM", "через CSS content"], optionsEn: ["Place an element with slot=title as a direct child of the component", "Put a title attribute only on html", "Slots cannot receive light DOM", "Use CSS content"], correctIndex: 0, explanationUk: "Безпосередній нащадок хоста призначається слоту за іменем.", explanationEn: "A direct child of the host is assigned to the slot by name." },
          { kind: "read", promptUk: "Що показує іменований слот, якщо йому не призначено вузлів?", promptEn: "What does a named slot display when no nodes are assigned to it?", language: "html", code: "<slot name='title'>Untitled</slot>", options: ["запасний текст Untitled", "ім'я хоста", "завжди порожній рядок", "усіх нащадків документа"], optionsEn: ["The fallback text Untitled", "The host's name", "Always an empty string", "Every descendant in the document"], correctIndex: 0, explanationUk: "Вміст slot є запасним, доки слоту не призначено вузлів.", explanationEn: "The slot's content is the fallback when no nodes are assigned." }
        ],
        whyUk: "Навіщо слот, якщо все можна зашити в тіньове дерево?",
        whyEn: "Why have a slot if you could hard-code everything in the shadow tree?",
        ideas: [{ labelUk: "контент автора", labelEn: "author content", anyOf: ["автор", "author", "світл", "light", "слот", "slot"] }, { labelUk: "інертний template", labelEn: "an inert template", anyOf: ["template", "інерт", "inert", "клон", "clone"] }, { labelUk: "унікальні id", labelEn: "unique ids", anyOf: ["id", "клон", "clone", "унікаль", "unique"] }],
        sampleUk: "Слот дає автору сторінки передати свій текст у тінь за іменем; template тримає інертну розмітку, яку клонують, а id клонів мають бути унікальними в одному дереві.",
        sampleEn: "A slot lets the page author pass text into the shadow by name; template holds inert markup to clone, and clone ids must be unique within the same tree.",
      },
      {
        slug: "hs-custom-elements",
        titleUk: "Користувацькі елементи: ім'я, реєстрація, прогресивне покращення",
        titleEn: "Custom elements: the name, registration, and progressive enhancement",
        difficulty: 3,
        pointsUk: ["Ім'я з дефісом, клас від HTMLElement", "Контент має мати сенс і до реєстрації", "Не замінюйте button власним клікабельним div"],
        pointsEn: ["A hyphenated name, a class extending HTMLElement", "Content should make sense even before registration", "Do not replace a button with your own clickable div"],
        conceptUk: "Допустиме ім'я автономного custom element містить дефіс, наприклад app-card. customElements.define реєструє клас, що розширює HTMLElement; до реєстрації елемент існує без визначеної поведінки та може бути оновлений після реєстрації. Зберігайте корисний світлий вміст і нативні кнопки без JS. Повторне define з тим самим ім'ям викликає помилку: організуйте одноразову реєстрацію або перевірте customElements.get(name).",
        conceptEn: "A valid autonomous custom element name contains a hyphen, such as app-card. customElements.define registers a class extending HTMLElement; before registration the element exists without the defined behavior and can be upgraded after registration. Keep useful light content and native buttons without JS. Defining the same name twice throws: arrange a single registration or check customElements.get(name).",
        code: "class AppCard extends HTMLElement {}\ncustomElements.define('app-card', AppCard);",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Чому ім'я custom element повинно містити дефіс?", promptEn: "Why must a custom element name contain a hyphen?", options: ["щоб не конфліктувати з майбутніми стандартними тегами", "так вимагає CSS", "інакше слоти не працюють", "дефіс вмикає shadow DOM"], optionsEn: ["To avoid conflicts with future standard tags", "CSS requires it", "Slots otherwise do not work", "A hyphen enables shadow DOM"], correctIndex: 0, explanationUk: "Простір імен HTML зарезервовано без дефіса.", explanationEn: "The un-hyphenated HTML namespace is reserved." },
          { kind: "fill", promptUk: "Допишіть реєстрацію елемента", promptEn: "Fill in registering the element", language: "javascript", code: "customElements.___('app-card', AppCard);", accepted: ["define"], caseSensitive: true, explanationUk: "Метод — define.", explanationEn: "The method is define." },
          { kind: "mcq", promptUk: "Чому <click-box> замість <button> — погана ідея для відправки форми?", promptEn: "Why is a click-box instead of a button a bad idea for submitting a form?", options: ["немає вбудованої клавіатури, ролі й участі у формі", "custom elements не можуть мати дітей", "дефіс заборонений у формах", "shadow DOM блокує submit завжди"], optionsEn: ["It lacks built-in keyboard behavior, role, and form participation", "Custom elements cannot have children", "Hyphens are forbidden in forms", "Shadow DOM always blocks submission"], correctIndex: 0, explanationUk: "Спочатку нативна семантика, потім компонент.", explanationEn: "Native semantics first, then a component." }
        ],
        whyUk: "Як зробити користувацький елемент стійким без JS?",
        whyEn: "How do you make a custom element resilient without JS?",
        ideas: [{ labelUk: "прогресивне покращення", labelEn: "progressive enhancement", anyOf: ["покращ", "enhancement", "без js", "світл", "light"] }, { labelUk: "дефіс в імені", labelEn: "a hyphen in the name", anyOf: ["дефіс", "hyphen", "define", "ім'я"] }, { labelUk: "не заміняти button", labelEn: "do not replace a button", anyOf: ["button", "форм", "form", "клавіатур", "keyboard"] }],
        sampleUk: "Ім'я з дефісом реєструють через define, світлий вміст має бути корисним і до JS, а нативні button і form не замінюють саморобним клікабельним елементом.",
        sampleEn: "A hyphenated name is registered with define, the light content should be useful even before JS, and you do not replace native button and form with a homemade clickable element.",
      },
      {
        slug: "hs-shadow-dom-a11y",
        titleUk: "Shadow DOM і доступність: не загубити зв'язки",
        titleEn: "Shadow DOM and accessibility: do not lose the links",
        difficulty: 3,
        pointsUk: ["id не проходить крізь межу тіні для label/for", "Фокус і ARIA треба проєктувати свідомо", "closed не є межею безпеки"],
        pointsEn: ["ids do not cross the shadow boundary for label/for", "Focus and ARIA must be designed on purpose", "closed is not a security boundary"],
        conceptUk: "document.querySelector не шукає всередині shadow root, незалежно від open чи closed. Зовнішній label for не пов'язується безпосередньо з id внутрішнього input; сам по собі слот із label також не створює такого зв'язку. Розмістіть label та input разом у тіньовому дереві або застосуйте підтримуваний формоасоційований custom element, перевіривши назву і фокус із допоміжними технологіями. closed не є межею безпеки.",
        conceptEn: "document.querySelector does not search inside a shadow root, whether open or closed. An outer label for does not directly associate with an inner input id; a slotted label alone does not create that association either. Place label and input together in the shadow tree or use a supported form-associated custom element, testing name and focus with assistive technology. closed is not a security boundary.",
        code: "const root = this.attachShadow({ mode: 'open' });\nroot.innerHTML = '<label for=\"f\">Email</label><input id=\"f\" type=\"email\">';",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Чому label[for=email] ззовні не підписує input#email у shadow root?", promptEn: "Why does a label[for=email] outside not label an input#email in a shadow root?", options: ["простір id світлого і тіньового дерев розділений", "label не працює з input взагалі", "треба лише mode closed", "for заборонений у HTML5"], optionsEn: ["The light and shadow trees have separate id scopes", "label never works with input", "Only mode closed is needed", "HTML forbids for"], correctIndex: 0, explanationUk: "Межа тіні розриває for.", explanationEn: "The shadow boundary breaks for." },
          { kind: "fill", promptUk: "Допишіть відкритий корінь тіні", promptEn: "Fill in an open shadow root", language: "javascript", code: "this.attachShadow({ mode: '___' });", accepted: ["open"], caseSensitive: true, explanationUk: "Режим open простіший для налагодження й a11y-інструментів.", explanationEn: "open is easier for debugging and a11y tools." },
          { kind: "mcq", promptUk: "Чи захищає mode closed секрети від зловмисного JS на тій самій сторінці надійно?", promptEn: "Does mode closed reliably protect secrets from malicious JS on the same page?", options: ["ні, це не межа безпеки, лише ускладнення доступу до root", "так, це пісочниця як iframe", "так, якщо є HTTPS", "closed шифрує DOM"], optionsEn: ["No, it is not a security boundary; it only restricts access to the root", "Yes, it is a sandbox like an iframe", "Yes, if HTTPS is used", "closed encrypts the DOM"], correctIndex: 0, explanationUk: "Не кладіть секрети в клієнтську розмітку.", explanationEn: "Do not put secrets in client markup." }
        ],
        whyUk: "Як зберегти доступну назву поля всередині компонента з тіньовим деревом?",
        whyEn: "How do you keep an accessible field name inside a component with a shadow tree?",
        ideas: [{ labelUk: "label та input разом", labelEn: "label and input together", anyOf: ["label", "for", "id"] }, { labelUk: "межа тіньового дерева", labelEn: "the shadow boundary", anyOf: ["тінь", "shadow", "меж", "boundary"] }, { labelUk: "перевірка назви і фокуса", labelEn: "test name and focus", anyOf: ["фокус", "focus", "назв", "name"] }],
        sampleUk: "id не перетинає межу тіні: label та input можна розмістити разом у shadow root, перевірити фокус та доступну назву, а сам слот або ARIA на хості не гарантує зв'язок.",
        sampleEn: "An id does not cross the shadow boundary: put label and input together in the shadow root and test focus and accessible naming; a slot or ARIA on the host alone does not guarantee the association.",
      }
    ],
    "Контрольна: Web Components",
    "Exam: Web Components",
    [
      { promptUk: "Розмітка в template до клонування…", promptEn: "Markup in a template before cloning is…", options: ["інертна і сама не відображається", "вже видима на сторінці", "автоматично створює shadow root", "замінює body"], optionsEn: ["Inert and not rendered by itself", "Already visible on the page", "Automatically creates a shadow root", "Replaces body"], correctIndex: 0, explanationUk: "Клонуйте content і вставте копію, коли треба показати її.", explanationEn: "Clone content and insert the copy when you need to display it." },
      { promptUk: "Ім'я користувацького елемента…", promptEn: "A custom element name…", options: ["має містити дефіс", "має бути одним словом як div", "має починатись з xml", "не може містити літер"], optionsEn: ["Must contain a hyphen", "Must be a single word like div", "Must start with xml", "Cannot contain letters"], correctIndex: 0, explanationUk: "app-card, не appcard як стандартний тег.", explanationEn: "app-card, not appcard as a standard tag." },
      { promptUk: "label[for] ззовні тіні…", promptEn: "A label[for] outside the shadow…", options: ["не знаходить id всередині shadow root", "завжди працює як у світлому DOM", "працює лише в mode closed", "замінює slot"], optionsEn: ["Does not find an id inside the shadow root", "Always works like light DOM", "Works only in closed mode", "Replaces slot"], correctIndex: 0, explanationUk: "Простори id розділені.", explanationEn: "The id spaces are separate." },
      { promptUk: "mode closed…", promptEn: "mode closed is…", options: ["не межа безпеки", "пісочниця секретів", "обов'язковий для слотів", "вимикає фокус назавжди"], optionsEn: ["Not a security boundary", "A sandbox for secrets", "Required for slots", "Permanently disables focus"], correctIndex: 0, explanationUk: "Лише ускладнений доступ до root.", explanationEn: "Only a harder path to the root." }
    ],
  ),
  sectionUnit(
    "metadata_social",
    "Метадані, канонічні URL і соцмережі",
    "Metadata, canonical URLs, and social previews",
    [
      {
        slug: "hs-open-graph",
        titleUk: "Open Graph і Twitter: метадані для прев'ю",
        titleEn: "Open Graph and Twitter: preview metadata",
        difficulty: 2,
        pointsUk: ["Абсолютний og:image достатнього розміру, відкритий без логіну", "Унікальні title і description на кожну сторінку", "Новий URL картинки, бо кеш прев'ю живучий"],
        pointsEn: ["An absolute og:image of enough size, open without a login", "Unique title and description on every page", "A new image URL, because preview caches are sticky"],
        conceptUk: "og:title, og:description, og:image та og:url пропонують сервісам дані для картки, але остаточний вигляд визначає платформа. Для сумісності використовуйте повний HTTPS URL зображення, доступний краулеру без входу, та перевіряйте вимоги цільового сервісу. Прев'ю можуть кешуватися: після заміни зображення перевірте оновлення кешу або використайте версіонований URL. Не розміщуйте приватні дані в публічних метаданих.",
        conceptEn: "og:title, og:description, og:image, and og:url suggest data for a preview, but the platform decides the final presentation. For compatibility use a full HTTPS image URL accessible to crawlers without login, and check the target service's requirements. Previews may be cached: after replacing an image, check cache refresh or use a versioned URL. Do not put private data in public metadata.",
        code: "<meta property='og:title' content='Festival tickets'>\n<meta property='og:image' content='https://cdn.example.com/og/fest-v2.jpg'>",
        language: "html",
        retrieval: [
          { kind: "mcq", promptUk: "Навіщо вказувати повний HTTPS URL у og:image?", promptEn: "Why provide a full HTTPS URL in og:image?", options: ["для сумісності з краулерами та однозначної адреси зображення", "Open Graph забороняє зображення", "це автоматично гарантує показ картки", "це вимикає кешування"], optionsEn: ["For crawler compatibility and an unambiguous image address", "Open Graph forbids images", "It automatically guarantees a preview", "It disables caching"], correctIndex: 0, explanationUk: "Повний доступний URL спрощує отримання зображення різними сервісами.", explanationEn: "A complete accessible URL makes image retrieval more reliable across services." },
          { kind: "fill", promptUk: "Допишіть властивість заголовка Open Graph", promptEn: "Fill in the Open Graph title property", language: "html", code: "<meta property='og:___' content='Festival tickets'>", accepted: ["title"], caseSensitive: true, explanationUk: "Властивість — og:title.", explanationEn: "The property is og:title." },
          { kind: "mcq", promptUk: "Що зробити після заміни картинки прев'ю, якщо стара все ще показується?", promptEn: "What should you do after replacing a preview image if the old one still appears?", options: ["перевірити оновлення кешу сервісу або використати версіонований URL", "вважати, що зміна байтів за тим самим URL одразу оновить усі кеші", "прибрати og:title", "вимкнути HTTPS"], optionsEn: ["Check the service's cache refresh or use a versioned URL", "Assume replacing bytes at the same URL immediately refreshes every cache", "Remove og:title", "Disable HTTPS"], correctIndex: 0, explanationUk: "Сервіси можуть кешувати прев'ю і зображення; поведінка залежить від платформи.", explanationEn: "Services may cache previews and images; behavior depends on the platform." }
        ],
        whyUk: "Які обов'язкові частини прев'ю для статті блогу?",
        whyEn: "What are the essential parts of a blog article preview?",
        ideas: [{ labelUk: "унікальні title і опис", labelEn: "a unique title and description", anyOf: ["title", "description", "унікаль", "unique"] }, { labelUk: "абсолютне зображення", labelEn: "an absolute image", anyOf: ["og:image", "абсолют", "absolute", "1200"] }, { labelUk: "кеш і новий URL", labelEn: "cache and a new URL", anyOf: ["кеш", "cache", "url", "версі", "version"] }],
        sampleUk: "Для статті задають унікальні og:title і опис, абсолютний відкритий og:image достатнього розміру, а після заміни картинки перевіряють кеш або використовують версіонований URL.",
        sampleEn: "An article gets a unique og:title and description and an absolute public og:image of suitable size; after replacing the image, check the cache or use a versioned URL.",
      },
      {
        slug: "hs-canonical-hreflang",
        titleUk: "canonical і hreflang: яка сторінка головна",
        titleEn: "canonical and hreflang: which page is canonical",
        difficulty: 3,
        pointsUk: ["canonical — абсолютний головний URL із відповіддю 200", "hreflang взаємний між усіма мовними версіями", "Для переїзду адреси — 301, не лише canonical"],
        pointsEn: ["canonical is an absolute primary URL that returns 200", "hreflang is reciprocal across all language versions", "For a moved address, use 301, not only canonical"],
        conceptUk: "link rel=canonical підказує пошуковику бажаний URL для схожих сторінок, але не гарантує вибору саме цієї адреси. Для ясності використовуйте повний URL доступної сторінки без зайвих перенаправлень. rel=alternate з hreflang описує мовні варіанти; узгоджуйте взаємні посилання, включно з поточною версією. Для постійного переїзду використовуйте відповідний постійний HTTP-редирект, наприклад 301 або 308.",
        conceptEn: "link rel=canonical suggests a preferred URL for similar pages, but does not guarantee that a search engine selects it. For clarity use a complete URL of an accessible page without unnecessary redirects. rel=alternate with hreflang describes language variants; keep reciprocal links consistent, including the current version. For a permanent move use an appropriate permanent HTTP redirect, such as 301 or 308.",
        code: "<link rel='canonical' href='https://example.com/uk/fest'>\n<link rel='alternate' hreflang='uk' href='https://example.com/uk/fest'>\n<link rel='alternate' hreflang='en' href='https://example.com/en/fest'>",
        language: "html",
        retrieval: [
          { kind: "mcq", promptUk: "Куди може вказувати canonical сторінки з ?sort=price, якщо вміст той самий?", promptEn: "Where can the canonical of a page with ?sort=price point if its content is equivalent?", options: ["на основний URL категорії без параметра сортування", "завжди на себе з усіма параметрами", "завжди на головну сайту", "на 404"], optionsEn: ["To the main category URL without the sorting parameter", "Always to itself with every parameter", "Always to the site home page", "To a 404"], correctIndex: 0, explanationUk: "Canonical пропонує бажану адресу для еквівалентних сторінок, але вибір за пошуковиком.", explanationEn: "Canonical suggests a preferred URL for equivalent pages, but the search engine makes the selection." },
          { kind: "fill", promptUk: "Допишіть мовний альтернативний лінк", promptEn: "Fill in a language alternate link", language: "html", code: "<link rel='___' hreflang='uk' href='https://example.com/uk/fest'>", accepted: ["alternate"], caseSensitive: true, explanationUk: "rel=alternate разом із hreflang.", explanationEn: "rel=alternate together with hreflang." },
          { kind: "mcq", promptUk: "Чому hreflang лише з EN на UK, без зворотного й без self, слабкий?", promptEn: "Why is hreflang only from EN to UK, without the reverse and without self, weak?", options: ["набір має бути взаємним і включати посилання сторінки на себе", "достатньо одного напрямку", "hreflang не підтримує uk", "canonical тоді ігнорується"], optionsEn: ["The set should be reciprocal and include each page itself", "One direction is enough", "hreflang does not support uk", "canonical is then ignored"], correctIndex: 0, explanationUk: "Неповні чи невзаємні зв'язки пошуковик може проігнорувати.", explanationEn: "A search engine may ignore incomplete or non-reciprocal links." }
        ],
        whyUk: "Як позначити українську й англійську версії однієї статті?",
        whyEn: "How do you mark Ukrainian and English versions of the same article?",
        ideas: [{ labelUk: "взаємний hreflang", labelEn: "reciprocal hreflang", anyOf: ["hreflang", "взаєм", "reciproc", "x-default"] }, { labelUk: "canonical кожної версії", labelEn: "each version's canonical", anyOf: ["canonical", "абсолют", "absolute", "200"] }, { labelUk: "постійний редирект для переїзду", labelEn: "a permanent redirect for a move", anyOf: ["301", "308", "переїзд", "редирект", "redirect", "moved"] }],
        sampleUk: "Кожна мовна версія вказує взаємні hreflang (включно з собою) і свій абсолютний canonical на 200; постійний переїзд URL роблять 301, не лише канонічним тегом.",
        sampleEn: "Each language version lists reciprocal hreflang (including itself) and its own absolute canonical that returns 200; a permanent URL move is a 301, not only a canonical tag.",
      },
      {
        slug: "hs-jsonld",
        titleUk: "JSON-LD: структуровані дані без змішування з видимим текстом",
        titleEn: "JSON-LD: structured data without mixing it into visible text",
        difficulty: 3,
        pointsUk: ["JSON-LD має збігатися з видимим змістом", "Не вигадуйте рейтинги й наявність", "Валідуйте; ціна має бути свіжою"],
        pointsEn: ["JSON-LD must match the visible content", "Do not invent ratings or availability", "Validate; the price must be fresh"],
        conceptUk: "script type=application/ld+json у head або body може описувати Article, FAQPage чи BreadcrumbList словником schema.org. Структуровані дані мають правдиво відповідати видимому змісту, а ціна — оновлюватися разом зі сторінкою. Перевіряйте синтаксис та вимоги цільового пошуковика: успішна перевірка не гарантує розширеного результату, а підтримка типів залежить від сервісу. При вставленні динамічних значень серіалізуйте об'єкт як JSON і безпечно екрануйте символ < як послідовність \\u003c у вмісті script: інакше текст </script> може передчасно закрити елемент навіть усередині JSON-рядка. Використовуйте перевірений серіалізатор фреймворку та перевіряйте отриманий HTML.",
        conceptEn: "A script type=application/ld+json in the head or body can describe an Article, FAQPage, or BreadcrumbList using the schema.org vocabulary. Structured data should truthfully match visible content, and a price should update with the page. Validate syntax and the target search engine's requirements: a successful test does not guarantee a rich result, and supported types vary by service. When embedding dynamic values, serialize the object as JSON and safely escape the < character as the sequence \\u003c within the script content: otherwise </script> can end the element even inside a JSON string. Use a framework's vetted serializer and inspect the resulting HTML.",
        code: "<script type='application/ld+json'>\n{\"@context\":\"https://schema.org\",\"@type\":\"Article\",\"headline\":\"Festival tickets\"}\n</script>",
        language: "html",
        retrieval: [
          { kind: "mcq", promptUk: "Чому не можна поставити вигаданий AggregateRating 5.0?", promptEn: "Why must you not emit a fabricated AggregateRating of 5.0?", options: ["структуровані дані мають правдиво відповідати змісту сторінки", "рейтинг заборонений у schema.org", "JSON-LD тоді не парситься", "потрібен лише BreadcrumbList"], optionsEn: ["Structured data must truthfully match the page content", "Ratings are forbidden in schema.org", "JSON-LD cannot be parsed", "Only BreadcrumbList is allowed"], correctIndex: 0, explanationUk: "Не вигадуйте рейтинги; перевіряйте правила цільового пошуковика.", explanationEn: "Do not fabricate ratings; check the target search engine's guidelines." },
          { kind: "fill", promptUk: "Допишіть тип скрипта структурованих даних", promptEn: "Fill in the structured-data script type", language: "html", code: "<script type='application/___+json'>", accepted: ["ld"], caseSensitive: true, explanationUk: "Тип — application/ld+json.", explanationEn: "The type is application/ld+json." },
          { kind: "mcq", promptUk: "Чим JSON-LD зручніший за мікродані в атрибутах itemscope?", promptEn: "Why is JSON-LD more convenient than microdata in itemscope attributes?", options: ["дані в одному блоці, розмітка сторінки лишається чистою", "мікродані заборонені", "JSON-LD не треба валідувати", "пошуковики ігнорують мікродані завжди"], optionsEn: ["Data can be maintained in one block separate from the page markup", "Microdata is forbidden", "JSON-LD needs no validation", "Search engines always ignore microdata"], correctIndex: 0, explanationUk: "Відділення даних від презентації.", explanationEn: "Separating data from presentation." },
          { kind: "mcq", promptUk: "Чому динамічний JSON-LD у HTML потребує екранування символу < після серіалізації?", promptEn: "Why must a dynamic JSON-LD block in HTML escape < after serialization?", options: ["послідовність </script> у рядку може закрити HTML-елемент", "інакше JSON не підтримує числа", "це гарантує розширений результат пошуку", "це автоматично оновлює ціну"], optionsEn: ["A </script> sequence inside a string can close the HTML element", "Otherwise JSON cannot contain numbers", "It guarantees a rich search result", "It automatically updates the price"], correctIndex: 0, explanationUk: "HTML-парсер розпізнає закриття script до того, як дані прочитає JSON-парсер.", explanationEn: "The HTML parser recognizes the closing script tag before a JSON parser reads the data." }
        ],
        whyUk: "Яких правил дотримуватись у JSON-LD для статті з ціною квитка?",
        whyEn: "Which rules should JSON-LD follow for an article that includes a ticket price?",
        ideas: [{ labelUk: "збіг із видимим", labelEn: "match the visible content", anyOf: ["збіг", "match", "види", "visible", "чесн", "honest"] }, { labelUk: "свіжа ціна", labelEn: "a fresh price", anyOf: ["ціна", "price", "кеш", "cache", "онов", "update"] }, { labelUk: "валідація", labelEn: "validation", anyOf: ["valid", "rich", "snippet", "ld+json"] }],
        sampleUk: "JSON-LD має чесно повторювати видимий зміст, ціна квитка має бути свіжою, блок валідують, а вигадані рейтинги не ставлять.",
        sampleEn: "JSON-LD must honestly mirror the visible content, the ticket price must be fresh, the block is validated, and you do not invent ratings.",
      }
    ],
    "Контрольна: метадані",
    "Exam: metadata",
    [
      { promptUk: "og:image має бути…", promptEn: "og:image should be…", options: ["абсолютним URL, відкритим без логіну", "відносним шляхом завжди", "лише data-URI", "за логіном для «безпеки»"], optionsEn: ["An absolute URL accessible without login", "Always a relative path", "Only a data URI", "Behind a login for security"], correctIndex: 0, explanationUk: "Краулер соцмережі зазвичай не має доступу до приватного вмісту.", explanationEn: "A social crawler generally cannot access private content." },
      { promptUk: "hreflang між мовами має бути…", promptEn: "hreflang between languages should be…", options: ["взаємним і з посиланням на себе", "лише з однієї сторінки на іншу", "без canonical", "заміною 301"], optionsEn: ["Reciprocal and include each page itself", "Only from one page to another", "Without canonical", "A replacement for a 301"], correctIndex: 0, explanationUk: "Повний кластер.", explanationEn: "A complete cluster." },
      { promptUk: "Вигаданий рейтинг у JSON-LD…", promptEn: "A fabricated rating in JSON-LD is…", options: ["неправдивий: дані мають відповідати змісту", "дозволений для сніпета", "обов'язковий для Article", "ігнорується і тому безпечний"], optionsEn: ["Misleading: data must reflect the content", "Allowed to obtain a snippet", "Mandatory for Article", "Always ignored and therefore safe"], correctIndex: 0, explanationUk: "Чесні структуровані дані.", explanationEn: "Honest structured data." },
      { promptUk: "Постійний переїзд URL оформлюють…", promptEn: "A permanent URL move is handled with…", options: ["постійним HTTP-редиректом, наприклад 301 або 308", "лише hreflang", "лише og:url", "заміною JSON-LD"], optionsEn: ["A permanent HTTP redirect, such as 301 or 308", "Only hreflang", "Only og:url", "Replacing JSON-LD"], correctIndex: 0, explanationUk: "Постійний редирект явно передає переїзд клієнтам і пошуковикам.", explanationEn: "A permanent redirect communicates the move to clients and search engines." }
    ],
  )
];

const insertions: Record<string, LessonContent[]> = {};

export function expandHtmlSemantics(course: CourseContent): CourseContent {
  return expandCourse(course, insertions, newUnits);
}
