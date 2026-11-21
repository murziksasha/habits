import type { CourseContent, LessonContent, UnitContent } from "../types.js";
import { expandCourse, sectionUnit, teachLesson } from "./factory.js";

export const newUnits: UnitContent[] = [
  sectionUnit(
    "css_animations",
    "Переходи, ключові кадри й зменшення руху",
    "Transitions, keyframes, and reduced motion",
    [
      {
        slug: "cl-transitions",
        titleUk: "transition: що анімувати й чому не все",
        titleEn: "transition: what to animate and why not everything",
        difficulty: 2,
        pointsUk: ["Перелічуйте потрібні властивості", "transform і opacity часто уникають layout, але це треба виміряти", "Поява з display:none потребує окремого налаштування"],
        pointsEn: ["List the properties you need", "transform and opacity often avoid layout, but measure the result", "Appearing from display:none needs additional setup"],
        conceptUk: "Явний transition-property обмежує анімацію потрібними властивостями та запобігає несподіваним переходам від all. transform і opacity часто можна анімувати без перерахунку layout, тоді як width або top можуть спричиняти додатковий layout; фактична вартість залежить від браузера та сторінки, тому перевіряйте її інструментами продуктивності. Для появи з display:none може знадобитися @starting-style та налаштування дискретного переходу; перевіряйте підтримку браузера і запасний стан.",
        conceptEn: "An explicit transition-property limits animation to the intended properties and avoids unexpected transitions from all. transform and opacity can often animate without layout, whereas width or top may trigger additional layout; actual cost depends on the browser and page, so measure it with performance tools. Appearing from display:none may require @starting-style and discrete transition configuration; check browser support and provide a fallback state.",
        code: ".card { transition-property: transform, opacity; transition-duration: 200ms; }",
        language: "css",
        retrieval: [
          { kind: "mcq", promptUk: "Чому transition: all 300ms ризикований?", promptEn: "Why is transition: all 300ms risky?", options: ["можуть анімуватися дорогі властивості макета й несподівані зміни", "all заборонений у CSS", "300ms ігнорується", "all вимикає opacity"], optionsEn: ["It can animate expensive layout properties and unintended changes", "all is forbidden in CSS", "300ms is ignored", "all disables opacity"], correctIndex: 0, explanationUk: "Називайте лише те, що треба.", explanationEn: "Name only what you need." },
          { kind: "fill", promptUk: "Допишіть властивість transform для руху", promptEn: "Fill in transform for motion", language: "css", code: "transition-property: ___, opacity;", accepted: ["transform"], caseSensitive: true, explanationUk: "transform часто дозволяє уникнути перерахунку layout; перевіряйте продуктивність.", explanationEn: "transform often avoids layout; measure actual performance." },
          { kind: "mcq", promptUk: "Чому height: auto важко плавно розкрити класичним переходом?", promptEn: "Why is height: auto hard to ease open with a conventional transition?", options: ["auto не інтерполюється як число пікселів у класичному переході", "auto завжди 0", "transition не вміє height взагалі", "потрібен лише all"], optionsEn: ["auto is not interpolated as a pixel number in a conventional transition", "auto is always 0", "transition cannot animate height at all", "Only all is needed"], correctIndex: 0, explanationUk: "Варіанти включають grid-template-rows або max-height; підтримку новіших можливостей інтерполяції перевіряйте в цільових браузерах.", explanationEn: "Options include grid-template-rows or max-height; check target browsers for newer interpolation features." }
        ],
        whyUk: "Які властивості анімувати для плавного відкриття картки?",
        whyEn: "Which properties should you animate for a smooth card opening?",
        ideas: [{ labelUk: "transform і opacity", labelEn: "transform and opacity", anyOf: ["transform", "opacity", "gpu", "дешев", "cheap"] }, { labelUk: "не all", labelEn: "not all", anyOf: ["all", "layout", "width", "height"] }, { labelUk: "display окремо", labelEn: "display separately", anyOf: ["display", "none", "starting-style", "кадр", "frame"] }],
        sampleUk: "Для картки анімують transform і opacity, не all і не height на кожен кадр; display:none не інтерполюється, тож появу планують окремо.",
        sampleEn: "For a card you animate transform and opacity, not all and not height on every frame; display:none does not interpolate, so appearance is planned separately.",
      },
      {
        slug: "cl-keyframes",
        titleUk: "keyframes: іменована анімація і заповнення",
        titleEn: "keyframes: a named animation and fill modes",
        difficulty: 3,
        pointsUk: ["forwards зберігає кінцевий кадр", "infinite лоадери — коротко й з повагою до reduced motion", "Не анімуйте width у ключових кадрах без потреби"],
        pointsEn: ["forwards keeps the final frame", "Infinite loaders should be brief and respect reduced motion", "Do not animate width in keyframes without a need"],
        conceptUk: "@keyframes описує значення у відсотках або через from і to, а animation-name пов'язує їх з елементом. animation-fill-mode: forwards зберігає значення останнього виконаного кадру після завершення; конкретний кадр залежить від direction та кількості повторень. Без forwards застосовуються інші правила каскаду. Нескінченний рух використовуйте обережно й передбачайте варіант для reduced motion.",
        conceptEn: "@keyframes describes values at percentages or with from and to, and animation-name connects them to an element. animation-fill-mode: forwards retains the values of the last executed keyframe after completion; the actual frame depends on direction and iteration count. Without forwards other cascade rules apply. Use infinite motion carefully and provide a reduced-motion alternative.",
        code: "@keyframes fade-in { from { opacity: 0 } to { opacity: 1 } }\n.toast { animation: fade-in 200ms ease-out forwards; }",
        language: "css",
        retrieval: [
          { kind: "mcq", promptUk: "Що робить animation-fill-mode: forwards?", promptEn: "What does animation-fill-mode: forwards do?", options: ["зберігає значення останнього виконаного кадру після завершення", "завжди зациклює анімацію", "вимикає ключові кадри", "замінює transition"], optionsEn: ["Retains values from the last executed keyframe after completion", "Always loops the animation", "Disables keyframes", "Replaces transition"], correctIndex: 0, explanationUk: "Останній виконаний кадр залежить від напрямку та кількості повторень.", explanationEn: "The last executed keyframe depends on direction and iteration count." },
          { kind: "fill", promptUk: "Допишіть правило ключових кадрів", promptEn: "Fill in the keyframes rule", language: "css", code: "@___ fade { from { opacity: 0 } to { opacity: 1 } }", accepted: ["keyframes"], caseSensitive: true, explanationUk: "Директива — @keyframes.", explanationEn: "The at-rule is @keyframes." },
          { kind: "mcq", promptUk: "Чому нескінченний великий рух на фоні сторінки — погана ідея?", promptEn: "Why is infinite large motion in the page background a bad idea?", options: ["може витрачати заряд і викликати дискомфорт; потрібен reduced motion", "infinite заборонений у CSS", "браузер зупиняє сторінку", "forwards тоді не працює"], optionsEn: ["It can consume battery and cause discomfort; provide reduced motion", "infinite is forbidden in CSS", "The browser stops the page", "forwards cannot work"], correctIndex: 0, explanationUk: "Декоративний рух має поступатись комфорту.", explanationEn: "Decorative motion should yield to comfort." }
        ],
        whyUk: "Коли ставити fill-mode forwards, а коли infinite?",
        whyEn: "When should you set fill-mode forwards, and when infinite?",
        ideas: [{ labelUk: "кінцевий стан", labelEn: "the end state", anyOf: ["forwards", "кінцев", "end", "кадр", "frame"] }, { labelUk: "лоадер обережно", labelEn: "a loader, carefully", anyOf: ["infinite", "лоадер", "loader", "батаре", "battery"] }, { labelUk: "не layout", labelEn: "not layout", anyOf: ["width", "layout", "transform", "keyframes"] }],
        sampleUk: "forwards лишає кінцевий кадр одноразової появи, infinite лишають коротким лоадерам і поважають зменшення руху, а width у ключових кадрах без потреби не анімують.",
        sampleEn: "forwards keeps the final frame of a one-shot appearance, infinite is left to short loaders that respect reduced motion, and you do not animate width in keyframes without a need.",
      },
      {
        slug: "cl-prefers-reduced",
        titleUk: "prefers-reduced-motion: поважати налаштування системи",
        titleEn: "prefers-reduced-motion: respect the system setting",
        difficulty: 2,
        pointsUk: ["reduce — менше великих рухів, не обов'язково нуль анімації", "Не ховайте зміст лише в русі", "Перевіряйте в системі і в DevTools"],
        pointsEn: ["reduce means fewer large motions, not necessarily zero animation", "Do not hide content only inside motion", "Test in the OS and in DevTools"],
        conceptUk: "prefers-reduced-motion: reduce означає, що користувач просить зменшити рух. Приберіть або замініть великий рух і паралакс; короткий перехід може бути доречним залежно від контексту. Задайте кінцеві видимі стилі поза анімацією: при animation: none вміст не повинен зникати. Не покладайтеся лише на спінер: поруч залиште текстовий статус завантаження. Застосовуйте правила до потрібних компонентів, зокрема їхніх псевдоелементів, якщо ті рухаються. Перевірте стан у DevTools, системних налаштуваннях і з клавіатури.",
        conceptEn: "prefers-reduced-motion: reduce means the user requests less motion. Remove or replace large movement and parallax; a short transition may be appropriate depending on context. Define the final visible styles outside the animation so content does not disappear when animation: none applies. Do not rely on a spinner alone: keep a text loading status alongside it. Apply rules to the relevant components, including their pseudo-elements if those move. Test the state in DevTools, operating-system settings, and with the keyboard.",
        code: ".hero { opacity: 1; animation: reveal 600ms ease-out; }\n@media (prefers-reduced-motion: reduce) {\n  .hero { animation: none; }\n  .spinner { animation: none; } /* Keep the loading text visible. */\n}",
        language: "css",
        retrieval: [
          { kind: "mcq", promptUk: "Що змінити в нескінченному хитанні банера при prefers-reduced-motion: reduce?", promptEn: "What should change about an infinitely swaying banner when prefers-reduced-motion is reduce?", options: ["зупинити рух або замінити його короткою зміною прозорості", "збільшити амплітуду, щоб «було видно»", "запит можна ігнорувати в маркетингу", "перейти на width-анімацію"], optionsEn: ["Stop the movement or replace it with a brief opacity change", "Increase the movement amplitude", "Ignore the preference for marketing", "Switch to width animation"], correctIndex: 0, explanationUk: "Користувач явно просив менше руху.", explanationEn: "The user explicitly asked for less motion." },
          { kind: "fill", promptUk: "Допишіть медіазапит зменшення руху", promptEn: "Fill in the reduced-motion media query", language: "css", code: "@media (prefers-___-motion: reduce) { .hero { animation: none } }", accepted: ["reduced"], caseSensitive: true, explanationUk: "Запит — prefers-reduced-motion.", explanationEn: "The query is prefers-reduced-motion." },
          { kind: "mcq", promptUk: "Чи можна залишити коротку зміну opacity 150 мс при reduce?", promptEn: "May you keep a short 150 ms opacity change under reduce?", options: ["так, коротка зміна може бути доречною залежно від контексту", "ні, будь-яка анімація заборонена законом", "лише якщо infinite", "лише для width"], optionsEn: ["Yes, a brief change may be appropriate depending on context", "No, all animation is forbidden by law", "Only if infinite", "Only for width"], correctIndex: 0, explanationUk: "Суть — зменшити рух, а не обов'язково прибрати кожен перехід.", explanationEn: "The aim is reduced motion, not necessarily eliminating every transition." },
          { kind: "mcq", promptUk: "Спінер зупинено для reduce. Як зберегти зрозумілий стан очікування?", promptEn: "A spinner is stopped for reduce. How can the pending state remain understandable?", options: ["залишити видимий текстовий статус завантаження", "приховати весь вміст до завершення", "увімкнути більший рух", "покладатися лише на зміну кольору"], optionsEn: ["Keep a visible text loading status", "Hide all content until completion", "Add larger motion", "Rely only on a color change"], correctIndex: 0, explanationUk: "Інформація про завантаження не повинна залежати тільки від руху.", explanationEn: "Loading feedback should not depend on motion alone." }
        ],
        whyUk: "Як адаптувати героя з паралаксом для користувача зі зменшеним рухом?",
        whyEn: "How do you adapt a parallax hero for a user with reduced motion?",
        ideas: [{ labelUk: "вимкнути великий рух", labelEn: "turn off large motion", anyOf: ["паралакс", "parallax", "reduce", "вимкн", "none"] }, { labelUk: "коротка поява", labelEn: "a short appearance", anyOf: ["opacity", "коротк", "short", "150"] }, { labelUk: "зміст без анімації", labelEn: "content without animation", anyOf: ["зміст", "content", "функціон", "function"] }],
        sampleUk: "При reduce великий паралакс вимикають або замінюють короткою зміною opacity, а весь зміст лишається доступним без руху.",
        sampleEn: "Under reduce, large parallax is turned off or replaced with a short opacity change, and all content stays available without motion.",
      }
    ],
    "Контрольна: анімації",
    "Exam: animations",
    [
      { promptUk: "transition: all ризикований, бо…", promptEn: "transition: all is risky because…", options: ["може анімувати дорогі властивості макета", "all ігнорується", "не вміє opacity", "заборонений"], optionsEn: ["It can animate expensive layout properties", "all is ignored", "It cannot animate opacity", "It is forbidden"], correctIndex: 0, explanationUk: "Перелічіть потрібні властивості.", explanationEn: "List the properties you need." },
      { promptUk: "animation-fill-mode: forwards…", promptEn: "animation-fill-mode: forwards…", options: ["зберігає значення останнього виконаного кадру", "зациклює infinite", "вимикає ключові кадри", "це синонім ease-out"], optionsEn: ["Retains the last executed keyframe's values", "Loops infinitely", "Disables keyframes", "Is a synonym for ease-out"], correctIndex: 0, explanationUk: "Кадр залежить від напрямку та кількості повторень.", explanationEn: "The frame depends on direction and iteration count." },
      { promptUk: "prefers-reduced-motion: reduce…", promptEn: "prefers-reduced-motion: reduce…", options: ["просить менше великого руху", "завжди означає нуль анімації за специфікацією", "стосується лише кольорів", "ігнорується в браузерах"], optionsEn: ["Requests less large-scale motion", "Always requires zero animation by specification", "Concerns only colors", "Is ignored by browsers"], correctIndex: 0, explanationUk: "Поважайте запит.", explanationEn: "Honour the request." },
      { promptUk: "Які властивості часто дозволяють анімувати рух без перерахунку layout?", promptEn: "Which properties often allow motion without recalculating layout?", options: ["transform і opacity", "width і top", "height: auto напряму завжди", "display:none"], optionsEn: ["transform and opacity", "width and top", "height: auto directly in every case", "display:none"], correctIndex: 0, explanationUk: "Вони часто уникають layout, але фактичну вартість потрібно вимірювати.", explanationEn: "They often avoid layout, but actual cost should be measured." }
    ],
  ),
  sectionUnit(
    "logical_properties",
    "Логічні властивості й режими письма",
    "Logical properties and writing modes",
    [
      {
        slug: "cl-logical-inset",
        titleUk: "inset-block і inset-inline замість top/left",
        titleEn: "inset-block and inset-inline instead of top/left",
        difficulty: 3,
        pointsUk: ["Логічні властивості слідують напряму письма", "Один CSS для LTR і RTL", "Фізичні сторони — лише коли прив'язка до екрана"],
        pointsEn: ["Logical properties follow the writing direction", "One CSS for LTR and RTL", "Physical sides only when the binding is to the screen"],
        conceptUk: "У горизонтальному LTR margin-left — «зліва». Якщо сторінка арабською (RTL) або вертикальним письмом, «початок рядка» змінюється. Логічні властивості margin-inline-start, padding-block-end, inset-inline-start прив'язані до напряму письма, не до фізичної сторони екрана. Один аркуш стилів тоді працює для uk і ar без дзеркальних копій. Фізичні left/right лишають, коли прив'язка саме до екрана (тінь від курсора). Перевіряйте з dir=rtl і writing-mode.",
        conceptEn: "In horizontal LTR, margin-left is 'on the left'. If the page is Arabic (RTL) or vertical writing, the 'start of the line' changes. Logical properties margin-inline-start, padding-block-end, and inset-inline-start follow the writing direction, not a physical side of the screen. One stylesheet then works for uk and ar without mirrored copies. Physical left/right stay when the binding is truly to the screen (a cursor shadow). Test with dir=rtl and writing-mode.",
        code: ".nav { margin-inline-start: auto; padding-inline: 1rem; }",
        language: "css",
        retrieval: [
          { kind: "mcq", promptUk: "Що станеться з margin-left: 2rem у горизонтальному письмі RTL?", promptEn: "What happens to margin-left: 2rem in horizontal RTL writing?", options: ["відступ лишиться фізично зліва, хоча рядок починається справа", "він автоматично дзеркалиться завжди", "властивість ігнорується", "браузер кине помилку"], optionsEn: ["The margin stays physically left even though the line starts on the right", "It always mirrors automatically", "The property is ignored", "The browser throws an error"], correctIndex: 0, explanationUk: "Для початку рядка потрібен margin-inline-start.", explanationEn: "The start of the line needs margin-inline-start." },
          { kind: "fill", promptUk: "Допишіть логічний відступ початку рядка", promptEn: "Fill in the logical margin at the start of the line", language: "css", code: "margin-___-start: 2rem;", accepted: ["inline"], caseSensitive: true, explanationUk: "Вісь рядка — inline.", explanationEn: "The line axis is inline." },
          { kind: "mcq", promptUk: "Коли фізичний left усе ж доречний?", promptEn: "When is physical left still appropriate?", options: ["коли елемент прив'язаний до фізичної сторони, не до напряму тексту", "ніколи", "завжди замість логічних", "лише в RTL"], optionsEn: ["When placement refers to a physical side rather than text direction", "Never", "Always instead of logical properties", "Only in RTL"], correctIndex: 0, explanationUk: "Відрізняйте фізичні сторони від логічних осей.", explanationEn: "Distinguish physical sides from logical axes." }
        ],
        whyUk: "Чому в багатомовній темі краще margin-inline-start, ніж margin-left?",
        whyEn: "Why does a multilingual theme prefer margin-inline-start over margin-left?",
        ideas: [{ labelUk: "напрям письма", labelEn: "writing direction", anyOf: ["rtl", "ltr", "письм", "writing", "напрям"] }, { labelUk: "один аркуш", labelEn: "one stylesheet", anyOf: ["один", "one", "дзеркал", "mirror", "араб", "arabic"] }, { labelUk: "вісь inline", labelEn: "the inline axis", anyOf: ["inline", "start", "block", "inset"] }],
        sampleUk: "margin-inline-start тримається початку рядка в LTR і RTL, тож один аркуш стилів обслуговує кілька мов, тоді як margin-left завжди фізично зліва.",
        sampleEn: "margin-inline-start stays at the start of the line in both LTR and RTL, so one stylesheet serves several languages, whereas margin-left is always physically on the left.",
      },
      {
        slug: "cl-writing-modes",
        titleUk: "writing-mode і напрям блокової осі",
        titleEn: "writing-mode and the block axis direction",
        difficulty: 3,
        pointsUk: ["writing-mode змінює напрямок осей тексту", "inline-size і block-size залежать від режиму письма", "rotate не замінює алгоритм вертикального письма"],
        pointsEn: ["writing-mode changes text axis directions", "inline-size and block-size follow the writing mode", "rotate does not replace vertical text layout"],
        conceptUk: "writing-mode: horizontal-tb задає горизонтальне письмо з блоками згори вниз. vertical-rl задає вертикальні рядки з блоками справа наліво. inline-size вимірює розмір уздовж рядка, а block-size — упоперек нього; width і height залишаються фізичними розмірами. transform: rotate повертає вже сформований блок, але не змінює алгоритм письма і компонування тексту. Перевіряйте потрібний режим із реальним вмістом і вводом.",
        conceptEn: "writing-mode: horizontal-tb sets horizontal writing with blocks progressing top to bottom. vertical-rl sets vertical lines with blocks progressing right to left. inline-size measures along the line and block-size across it; width and height remain physical dimensions. transform: rotate turns an already laid-out box but does not change the writing and text-layout algorithm. Test the intended mode with real content and input.",
        code: ".col { writing-mode: vertical-rl; inline-size: 30ch; }",
        language: "css",
        retrieval: [
          { kind: "mcq", promptUk: "Чим inline-size відрізняється від width при vertical-rl?", promptEn: "How does inline-size differ from width under vertical-rl?", options: ["inline-size — розмір уздовж вертикального рядка; width лишається фізичною шириною", "це синоніми завжди", "inline-size заборонений у vertical", "width тоді стає логічним сам"], optionsEn: ["inline-size follows the vertical line; width remains physical width", "They are always synonyms", "inline-size is forbidden in vertical writing", "width automatically becomes logical"], correctIndex: 0, explanationUk: "Логічний розмір слідує письму.", explanationEn: "The logical size follows writing." },
          { kind: "fill", promptUk: "Допишіть логічну ширину «уздовж рядка»", promptEn: "Fill in the logical size along the line", language: "css", code: "___-size: 20ch;", accepted: ["inline"], caseSensitive: true, explanationUk: "Властивість — inline-size.", explanationEn: "The property is inline-size." },
          { kind: "mcq", promptUk: "Чому rotate(90deg) усього article — погана заміна writing-mode?", promptEn: "Why is rotate(90deg) on the whole article a poor substitute for writing-mode?", options: ["rotate повертає вже скомпонований блок, не задаючи вертикального письма", "rotate заборонений", "writing-mode не підтримує вертикаль", "браузер ігнорує rotate на article"], optionsEn: ["rotate turns the laid-out box without establishing vertical writing", "rotate is forbidden", "writing-mode does not support vertical text", "The browser ignores rotate on article"], correctIndex: 0, explanationUk: "writing-mode змінює компонування тексту; transform змінює відображення готового блока.", explanationEn: "writing-mode changes text layout; transform changes the presentation of the laid-out box." }
        ],
        whyUk: "Коли ставити writing-mode, а не крутити блок через transform?",
        whyEn: "When should you set writing-mode rather than rotate a block with transform?",
        ideas: [{ labelUk: "справжнє вертикальне письмо", labelEn: "real vertical writing", anyOf: ["writing-mode", "vertical", "япон", "japanese", "китай"] }, { labelUk: "inline-size", labelEn: "inline-size", anyOf: ["inline-size", "block-size", "width"] }, { labelUk: "ввід і виділення", labelEn: "input and selection", anyOf: ["ввід", "input", "виділен", "selection", "rotate"] }],
        sampleUk: "Для вертикального письма ставлять writing-mode та inline-size, бо rotate повертає готовий блок, а не змінює компонування тексту; ввід і виділення варто перевірити.",
        sampleEn: "For vertical writing use writing-mode and inline-size: rotate turns the laid-out box rather than changing text layout; test input and selection.",
      },
      {
        slug: "cl-logical-margins",
        titleUk: "Логічні поля, бордери й радіуси",
        titleEn: "Logical margins, borders, and radii",
        difficulty: 2,
        pointsUk: ["Є логічні бордери, поля й радіуси", "start-start у RTL не той самий фізичний кут", "Не змішуйте словники в одному компоненті"],
        pointsEn: ["There are logical borders, margins, and radii", "start-start in RTL is not the same physical corner", "Do not mix vocabularies in one component"],
        conceptUk: "Окрім margin-inline є border-inline-start, border-block-end і padding-block. border-start-start-radius — кут на перетині початку блоку й рядка: у horizontal-tb він відповідає top-left для LTR і top-right для RTL. У вертикальному письмі відповідність змінюється. margin-inline: 0 1rem задає start і end. Фізична й логічна декларації можуть звертатися до однієї сторони: тоді результат визначає каскад, зокрема важливість, специфічність і порядок. Якщо ж у певному напрямку вони відповідають різним сторонам, діють обидві. Перевіряйте обидва напрями, а не припускайте повного заміщення.",
        conceptEn: "Besides margin-inline there are border-inline-start, border-block-end, and padding-block. border-start-start-radius is where block start meets inline start: under horizontal-tb it maps to top-left in LTR and top-right in RTL. The mapping changes in vertical writing. margin-inline: 0 1rem sets start and end. Physical and logical declarations can target the same side: then the cascade, including importance, specificity, and source order, determines the result. If they map to different sides in a particular direction, both apply. Test both directions instead of assuming one completely replaces the other.",
        code: ".chip { border-start-start-radius: 999px; border-inline-start: 2px solid currentColor; }",
        language: "css",
        retrieval: [
          { kind: "mcq", promptUk: "Чому border-top-left-radius не позначає початок блоку й рядка в horizontal-tb з RTL?", promptEn: "Why does border-top-left-radius not identify block-start and inline-start in horizontal-tb with RTL?", options: ["це фізичний лівий верх, а початок рядка тепер справа", "радіуси не дзеркаляться ніколи навмисно", "RTL ігнорує радіуси", "потрібен лише width"], optionsEn: ["It is physically top-left, while inline start is on the right", "Radii are never deliberately mirrored", "RTL ignores radii", "Only width is needed"], correctIndex: 0, explanationUk: "Логічний кут — border-start-start-radius.", explanationEn: "The logical corner is border-start-start-radius." },
          { kind: "fill", promptUk: "Допишіть скорочення логічних інлайн-відступів", promptEn: "Fill in the shorthand for logical inline margins", language: "css", code: "margin-___: 0 1rem;", accepted: ["inline"], caseSensitive: true, explanationUk: "Скорочення — margin-inline.", explanationEn: "The shorthand is margin-inline." },
          { kind: "mcq", promptUk: "Що робити, якщо в компоненті вже є margin-left і ви додаєте margin-inline-start?", promptEn: "What should you do if a component already has margin-left and you add margin-inline-start?", options: ["узгодити властивості й перевірити каскад, бо вони можуть задавати одну сторону", "залишити обидві назавжди «про всяк випадок»", "фізична завжди перемагає специфічністю 0", "логічна ігнорується в LTR"], optionsEn: ["Reconcile the properties and check the cascade because they can affect the same side", "Keep both forever just in case", "The physical property always wins with specificity 0", "The logical property is ignored in LTR"], correctIndex: 0, explanationUk: "Перевірте відповідність сторін і порядок каскаду для кожного режиму письма.", explanationEn: "Check side mapping and cascade order for each writing mode." },
          { kind: "read", promptUk: "Які лівий і правий відступи задає це правило в horizontal-tb з RTL, якщо інших правил для них немає?", promptEn: "What left and right margins does this rule set in horizontal-tb with RTL, assuming no other margin rules?", language: "css", code: ".box { margin-left: 1rem; margin-inline-start: 2rem; }", options: ["зліва 1rem, справа 2rem", "зліва 2rem, справа 0", "зліва 1rem, справа 0", "зліва 2rem, справа 2rem"], optionsEn: ["1rem on the left, 2rem on the right", "2rem on the left, 0 on the right", "1rem on the left, 0 on the right", "2rem on both sides"], correctIndex: 0, explanationUk: "У RTL inline-start відповідає правій стороні, тому декларації діють на різні сторони.", explanationEn: "In RTL inline-start maps to the right, so the declarations affect different sides." }
        ],
        whyUk: "Як назвати радіус кута «початок рядка, початок блоку»?",
        whyEn: "What do you call the corner radius at 'line start, block start'?",
        ideas: [{ labelUk: "start-start", labelEn: "start-start", anyOf: ["start-start", "radius", "rtl", "кут", "corner"] }, { labelUk: "не top-left завжди", labelEn: "not always top-left", anyOf: ["top-left", "фізичн", "physical"] }, { labelUk: "один словник", labelEn: "one vocabulary", anyOf: ["словник", "vocabulary", "margin-inline", "left"] }],
        sampleUk: "Логічний кут border-start-start-radius у RTL не збігається з top-left, тож у компоненті обирають один словник властивостей і скорочення на кшталт margin-inline.",
        sampleEn: "The logical corner border-start-start-radius does not match top-left in RTL, so a component picks one property vocabulary and shorthands such as margin-inline.",
      }
    ],
    "Контрольна: логічні властивості",
    "Exam: logical properties",
    [
      { promptUk: "margin-inline-start у horizontal-tb з RTL опиняється…", promptEn: "In horizontal-tb with RTL, margin-inline-start ends up…", options: ["на початку рядка, фізично справа", "завжди фізично зліва", "лише зверху", "ігнорується"], optionsEn: ["At inline start, physically on the right", "Always physically on the left", "Only at the top", "It is ignored"], correctIndex: 0, explanationUk: "Логічний початок залежить від напрямку письма.", explanationEn: "The logical start depends on writing direction." },
      { promptUk: "inline-size при vertical-rl — це…", promptEn: "inline-size under vertical-rl is…", options: ["розмір уздовж рядка, який тепер вертикальний", "завжди фізична ширина екрана", "синонім height у всіх режимах", "заборонений"], optionsEn: ["The size along the now-vertical line", "Always the physical screen width", "A synonym for height in every writing mode", "Forbidden"], correctIndex: 0, explanationUk: "Слідкує за письмом.", explanationEn: "It follows writing." },
      { promptUk: "border-start-start-radius у horizontal-tb з LTR збігається з…", promptEn: "In horizontal-tb with LTR, border-start-start-radius matches…", options: ["top-left", "top-right", "bottom-left", "bottom-right"], correctIndex: 0, explanationUk: "Початок блоку і рядка.", explanationEn: "Block start and line start." },
      { promptUk: "rotate всього тексту замість writing-mode…", promptEn: "Rotating all the text instead of writing-mode…", options: ["повертає готовий блок, не змінюючи алгоритм письма", "є рекомендованим способом вертикального письма", "автоматично ставить RTL", "завжди покращує роботу скрінрідера"], optionsEn: ["Rotates the laid-out box without changing the writing algorithm", "Is the recommended way to set vertical writing", "Automatically sets RTL", "Always improves screen reader behavior"], correctIndex: 0, explanationUk: "Режим письма задають через writing-mode.", explanationEn: "Use writing-mode to set the writing mode." }
    ],
  ),
  sectionUnit(
    "color_modern",
    "Сучасний колір: oklch, мішанина, світла й темна",
    "Modern color: oklch, mixing, light and dark",
    [
      {
        slug: "cl-oklch",
        titleUk: "oklch: світлота, хрома, відтінок",
        titleEn: "oklch: lightness, chroma, and hue",
        difficulty: 3,
        pointsUk: ["L у oklch ближча до сприйнятої світлоти, ніж HSL", "Палітра: фіксовані L і C, крок по H", "Контраст тексту важливіший за «соковитість»"],
        pointsEn: ["L in oklch is closer to perceived lightness than HSL", "A palette: fixed L and C, stepping H", "Text contrast matters more than 'vividness'"],
        conceptUk: "oklch(L C H) задає колір через світлоту L, хрому C та кут відтінку H. Однакова L дає ближчу сприйняту світлоту різних відтінків, ніж однакове HSL lightness, але не гарантує однаковий контраст тексту. Колір поза охопленням пристрою браузер відображає через gamut mapping; relative color — окремий синтаксис, а не спосіб виправити охоплення. Перевіряйте фактичні кольори й контраст у цільових умовах.",
        conceptEn: "oklch(L C H) describes a color using lightness L, chroma C, and hue angle H. Equal L gives closer perceived lightness across hues than equal HSL lightness, but does not guarantee equal text contrast. A browser maps an out-of-gamut color for the output device; relative color is separate syntax, not a gamut-mapping method. Check actual colors and contrast in the target conditions.",
        code: "--accent: oklch(0.7 0.14 250);\n--accent-2: oklch(0.7 0.14 310);",
        language: "css",
        retrieval: [
          { kind: "mcq", promptUk: "Чому палітра на oklch зручніша за однаковий lightness у HSL?", promptEn: "Why is an oklch palette easier than the same lightness in HSL?", options: ["однакова L дає ближчу сприйняту світлоту між відтінками", "oklch забороняє жовтий", "HSL не вміє відтінок", "oklch завжди вищий контраст сам по собі"], optionsEn: ["Equal L gives more similar perceived lightness across hues", "oklch forbids yellow", "HSL cannot represent hue", "oklch always provides higher contrast by itself"], correctIndex: 0, explanationUk: "Перевіряйте контраст окремо: однакова світлота його не гарантує.", explanationEn: "Check contrast separately: equal lightness does not guarantee it." },
          { kind: "fill", promptUk: "Допишіть функцію кольору OKLCH", promptEn: "Fill in the OKLCH colour function", language: "css", code: "color: ___(0.72 0.12 250);", accepted: ["oklch"], caseSensitive: true, explanationUk: "Функція — oklch.", explanationEn: "The function is oklch." },
          { kind: "mcq", promptUk: "Що робити, якщо oklch з великою хромою виходить за охоплення монітора?", promptEn: "What should you do if a high-chroma oklch is outside the display gamut?", options: ["перевірити відображення і за потреби зменшити хрому", "браузер завжди аварійно зупиняється", "потрібен лише hex", "гамут не існує для oklch"], optionsEn: ["Check the rendered color and reduce chroma if needed", "The browser always crashes", "Only hex is allowed", "Gamut does not exist for oklch"], correctIndex: 0, explanationUk: "Не кожен теоретичний колір відтворюваний; браузер застосовує gamut mapping.", explanationEn: "Not every theoretical color is reproducible; the browser applies gamut mapping." }
        ],
        whyUk: "Як побудувати ряд кнопок різних відтінків з однаковою «вагою»?",
        whyEn: "How do you build a row of buttons in different hues with the same 'weight'?",
        ideas: [{ labelUk: "фіксована світлота", labelEn: "fixed lightness", anyOf: ["світлот", "lightness", "oklch", "L"] }, { labelUk: "крок відтінку", labelEn: "a hue step", anyOf: ["відтін", "hue", "chroma", "H"] }, { labelUk: "контраст тексту", labelEn: "text contrast", anyOf: ["контраст", "contrast", "wcag", "текст"] }],
        sampleUk: "У oklch фіксують світлоту й хрому і крокують відтінок, щоб кнопки мали схожу вагу; контраст тексту перевіряють окремо, бо соковита хрома не гарантує читабельність.",
        sampleEn: "In oklch you pin lightness and chroma and step the hue so buttons share a similar weight; text contrast is checked separately, because vivid chroma does not guarantee readability.",
      },
      {
        slug: "cl-color-mix",
        titleUk: "color-mix: змішувати в обраному просторі",
        titleEn: "color-mix: mixing in a chosen space",
        difficulty: 3,
        pointsUk: ["Простір суміші впливає на середній колір", "Зручно для hover і напівтонів від токенів", "Перевіряйте контраст результату"],
        pointsEn: ["The mixing space affects the mid colour", "Handy for hover and tints from tokens", "Check the resulting contrast"],
        conceptUk: "color-mix(in oklch, var(--bg) 80%, var(--fg)) змішує кольори у вибраному просторі; інший простір або спосіб інтерполяції відтінку можуть дати інший результат. Це допомагає отримати стан із наявних токенів, але не гарантує, що колір стане темнішим чи збереже контраст. Перевіряйте результат на фактичному фоні, зокрема за наявності прозорості.",
        conceptEn: "color-mix(in oklch, var(--bg) 80%, var(--fg)) mixes colors in the chosen space; a different space or hue interpolation can produce a different result. This can derive a state from existing tokens, but does not guarantee the color will be darker or retain sufficient contrast. Check the result against its actual background, including transparency.",
        code: ".card:hover { background: color-mix(in oklch, var(--bg) 85%, var(--fg)); }",
        language: "css",
        retrieval: [
          { kind: "mcq", promptUk: "Чому результат color-mix може відрізнятися між sRGB та OKLCH?", promptEn: "Why can color-mix produce different results in sRGB and OKLCH?", options: ["Кольори інтерполюються в різних колірних просторах", "Браузер забороняє зелений", "color-mix не підтримує відсотки", "Простір не впливає на результат"], optionsEn: ["Colors are interpolated in different color spaces", "The browser forbids green", "color-mix does not support percentages", "The color space has no effect"], correctIndex: 0, explanationUk: "Простір і спосіб інтерполяції впливають на результат; перевіряйте його в контексті.", explanationEn: "The space and interpolation method affect the result; evaluate it in context." },
          { kind: "fill", promptUk: "Допишіть функцію суміші", promptEn: "Fill in the mix function", language: "css", code: "background: ___-mix(in oklch, var(--bg) 70%, var(--fg));", accepted: ["color"], caseSensitive: true, explanationUk: "Функція — color-mix.", explanationEn: "The function is color-mix." },
          { kind: "mcq", promptUk: "Навіщо color-mix для стану hover замість окремого токена --bg-hover?", promptEn: "Why use color-mix for a hover state instead of a separate --bg-hover token?", options: ["можна вивести стан з наявних токенів, менше вручну підібраних кольорів", "hover забороняє змінні", "mix вимикає :hover", "токенів не існує в CSS"], optionsEn: ["It derives a state from existing tokens with fewer manually chosen colors", "hover forbids variables", "mix disables :hover", "CSS cannot represent tokens"], correctIndex: 0, explanationUk: "Отриманий колір усе одно потребує перевірки контрасту.", explanationEn: "The resulting color still needs a contrast check." }
        ],
        whyUk: "У якому просторі змішувати фон і текст для напівтону картки?",
        whyEn: "In which space should you mix background and text for a card tint?",
        ideas: [{ labelUk: "oklch природніший", labelEn: "oklch is more natural", anyOf: ["oklch", "srgb", "брудн", "dirty", "сір", "grey"] }, { labelUk: "відсоток частки", labelEn: "a percentage share", anyOf: ["відсот", "percent", "mix", "70"] }, { labelUk: "контраст результату", labelEn: "contrast of the result", anyOf: ["контраст", "contrast", "hover", "токен", "token"] }],
        sampleUk: "Напівтон картки можна отримати через color-mix у oklch: відсоток задає частку кольору, простір впливає на результат, а контраст тексту слід перевірити.",
        sampleEn: "A card tint can use color-mix in oklch: the percentage sets a color's share, the space affects the result, and text contrast must be checked.",
      },
      {
        slug: "cl-light-dark",
        titleUk: "light-dark() і color-scheme",
        titleEn: "light-dark() and color-scheme",
        difficulty: 2,
        pointsUk: ["color-scheme повідомляє, що тема підтримана", "light-dark обирає пару без купи медіазапитів", "Контраст перевіряють в обох гілках"],
        pointsEn: ["color-scheme announces that a theme is supported", "light-dark picks a pair without a pile of media queries", "Contrast is checked in both branches"],
        conceptUk: "color-scheme: light dark повідомляє браузеру про підтримку обох тем і допомагає узгодити нативні контроли. light-dark(white, #111) обирає аргумент за used color-scheme елемента, який сторінка може перевизначити; це не те саме, що запитувати лише системну перевагу. Перевіряйте контраст тексту, меж і фокуса на фактичному фоні в обох темах. Для браузерів без light-dark залиште базові кольори й, якщо потрібна темна тема, запасне правило prefers-color-scheme. Приклад використовує @supports, щоб сучасні правила не конфліктували із запасним варіантом; перевіряйте підтримувані браузери та ручний вибір теми окремо.",
        conceptEn: "color-scheme: light dark tells the browser both themes are supported and helps align native controls. light-dark(white, #111) chooses an argument from the element's used color-scheme, which the page can override; this differs from checking only the system preference. Check text, border, and focus contrast against the actual background in both themes. For browsers without light-dark, keep base colors and, if a dark theme is needed, a prefers-color-scheme fallback. The example uses @supports so the modern rules do not conflict with the fallback; test supported browsers and any manual theme selection separately.",
        code: "html { color-scheme: light dark; }\n.card { background: #fff; color: #111; }\n@media (prefers-color-scheme: dark) {\n  .card { background: #111; color: #eee; }\n}\n@supports (color: light-dark(black, white)) {\n  .card { background: light-dark(#fff, #111); color: light-dark(#111, #eee); }\n}",
        language: "css",
        retrieval: [
          { kind: "mcq", promptUk: "Чим light-dark відрізняється від @media (prefers-color-scheme: dark)?", promptEn: "How does light-dark differ from @media (prefers-color-scheme: dark)?", options: ["вона дивиться на used color-scheme елемента, який сторінка може форсувати", "це повні синоніми", "light-dark ігнорує теми", "медіазапит не вміє темної теми"], optionsEn: ["It uses the element's used color-scheme, which the page can override", "They are exact synonyms", "light-dark ignores themes", "The media query cannot detect a dark preference"], correctIndex: 0, explanationUk: "Сторінка може перевизначити системну перевагу.", explanationEn: "The page can override the system preference." },
          { kind: "fill", promptUk: "Допишіть функцію пари кольорів теми", promptEn: "Fill in the theme colour-pair function", language: "css", code: "background: ___-dark(#fff, #111);", accepted: ["light"], caseSensitive: true, explanationUk: "Функція — light-dark.", explanationEn: "The function is light-dark." },
          { kind: "mcq", promptUk: "Навіщо color-scheme: light dark на html?", promptEn: "Why set color-scheme: light dark on html?", options: ["щоб системні контроли й light-dark знали, що обидві теми підтримані", "щоб вимкнути CSS", "це синонім background", "щоб заборонити темну тему"], optionsEn: ["To indicate both schemes are supported for browser controls and light-dark", "To disable CSS", "It is a synonym for background", "To forbid dark mode"], correctIndex: 0, explanationUk: "Без color-scheme браузер може лишити світлі контроли на темній сторінці.", explanationEn: "Without color-scheme the browser may leave light controls on a dark page." },
          { kind: "mcq", promptUk: "Що перевірити після додавання кольорів світлої та темної тем?", promptEn: "What should you check after adding light and dark theme colors?", options: ["контраст тексту та індикатора фокуса на їхніх фактичних фонах в обох темах", "лише назви CSS-змінних", "тільки світлий фон на одному моніторі", "лише те, чи працює :hover мишею"], optionsEn: ["Text and focus-indicator contrast against their actual backgrounds in both themes", "Only the CSS variable names", "Only the light background on one monitor", "Only whether mouse hover works"], correctIndex: 0, explanationUk: "Текст і стан фокуса мають залишатися розрізнюваними в кожній темі.", explanationEn: "Text and focus states need to remain distinguishable in each theme." }
        ],
        whyUk: "Як задати фон картки для світлої й темної теми без двох медіазапитів?",
        whyEn: "How do you set a card background for light and dark themes without two media queries?",
        ideas: [{ labelUk: "light-dark пара", labelEn: "a light-dark pair", anyOf: ["light-dark", "пара", "pair", "фон", "background"] }, { labelUk: "color-scheme", labelEn: "color-scheme", anyOf: ["color-scheme", "html", "контроли", "controls"] }, { labelUk: "контраст обох", labelEn: "contrast of both", anyOf: ["контраст", "contrast", "темн", "dark", "світл", "light"] }],
        sampleUk: "На html ставлять color-scheme: light dark і фон через light-dark(пара), що враховує схему елемента; контраст перевіряють в обох гілках.",
        sampleEn: "You set color-scheme: light dark on html and the background with a light-dark pair, which follows the element's scheme; contrast is checked in both branches.",
      }
    ],
    "Контрольна: сучасний колір",
    "Exam: modern color",
    [
      { promptUk: "Однакова L в oklch між відтінками…", promptEn: "The same L in oklch across hues is…", options: ["сприйнято ближча, ніж lightness у HSL", "гарантія WCAG сама по собі", "синонім hue", "заборонена"], optionsEn: ["More perceptually consistent than equal HSL lightness", "A WCAG contrast guarantee by itself", "A synonym for hue", "Forbidden"], correctIndex: 0, explanationUk: "Перцептивна світлота не замінює перевірки контрасту.", explanationEn: "Perceptual lightness does not replace contrast testing." },
      { promptUk: "color-mix in oklch корисний, бо…", promptEn: "color-mix in oklch is useful because…", options: ["дозволяє змішувати кольори у вибраному просторі", "він завжди дає сірий", "простір ігнорується", "він замінює перевірку контрасту"], optionsEn: ["It allows mixing colors in a chosen space", "It always produces gray", "The space is ignored", "It replaces contrast testing"], correctIndex: 0, explanationUk: "Перевіряйте результат у контексті.", explanationEn: "Check the result in context." },
      { promptUk: "light-dark дивиться на…", promptEn: "light-dark looks at…", options: ["used color-scheme елемента", "лише змінну середовища Node", "тільки час доби", "системну мову"], optionsEn: ["The element's used color-scheme", "Only a Node environment variable", "Only the time of day", "The system language"], correctIndex: 0, explanationUk: "Сторінка може форсувати схему.", explanationEn: "The page can force a scheme." },
      { promptUk: "color-scheme: light dark потрібен, щоб…", promptEn: "color-scheme: light dark is needed so…", options: ["контроли браузера й функції теми знали про підтримку", "вимкнути CSS-змінні", "забороняти oklch", "замінити контраст"], optionsEn: ["Browser controls and theme functions know both schemes are supported", "Disable CSS variables", "Forbid oklch", "Replace contrast checking"], correctIndex: 0, explanationUk: "Оголосіть підтримку тем.", explanationEn: "Announce theme support." }
    ],
  ),
  sectionUnit(
    "subgrid_has_snap",
    "subgrid, :has і scroll-snap",
    "subgrid, :has, and scroll-snap",
    [
      {
        slug: "cl-subgrid",
        titleUk: "subgrid: вирівняти дітей по сітці предка",
        titleEn: "subgrid: align children to the parent's grid",
        difficulty: 3,
        pointsUk: ["subgrid позичає лінії предка, щоб ряд карток вирівнявся", "Дитина має span потрібні треки", "Це не display: contents"],
        pointsEn: ["subgrid borrows the parent's lines so a row of cards aligns", "The child must span the needed tracks", "It is not display: contents"],
        conceptUk: "display: grid на батькові задає лінії. Дочірній grid за замовчуванням має власні лінії, тож заголовки карток у ряді не збігаються, якщо тексти різної висоти. grid-template-rows: subgrid на дитині з grid-row: span 3 «позичає» лінії предка: усі картки ділять одні рядки. Треба, щоб дитина охоплювала потрібну кількість треків предка. Підтримка сучасна, для старих браузерів — запасний власний грід. subgrid не є display: contents: коробка дитини лишається.",
        conceptEn: "display: grid on the parent defines lines. A child grid has its own lines by default, so card titles in a row do not line up when the texts have different heights. grid-template-rows: subgrid on a child with grid-row: span 3 borrows the parent's lines: every card shares the same rows. The child must span the needed number of parent tracks. Support is modern; older browsers get a fallback private grid. subgrid is not display: contents: the child's box remains.",
        code: ".row { display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: auto 1fr auto; }\n.card { display: grid; grid-row: 1 / span 3; grid-template-rows: subgrid; }",
        language: "css",
        retrieval: [
          { kind: "mcq", promptUk: "Навіщо subgrid у ряді карток із заголовком, текстом і футером?", promptEn: "Why use subgrid in a row of cards with a title, body, and footer?", options: ["щоб заголовки й футери всіх карток стояли на спільних лініях предка", "щоб прибрати сітку", "subgrid вимикає gap", "це синонім flex"], optionsEn: ["To align titles and footers using shared parent grid lines", "To remove the grid", "subgrid disables gap", "It is a synonym for flex"], correctIndex: 0, explanationUk: "Власні гріди карток не ділять лінії.", explanationEn: "Private card grids do not share lines." },
          { kind: "fill", promptUk: "Допишіть позичання рядків предка", promptEn: "Fill in borrowing the parent's rows", language: "css", code: "grid-template-rows: ___;", accepted: ["subgrid"], caseSensitive: true, explanationUk: "Значення — subgrid.", explanationEn: "The value is subgrid." },
          { kind: "mcq", promptUk: "Чому дитині часто пишуть grid-row: span 3 разом із subgrid?", promptEn: "Why does a child often get grid-row: span 3 together with subgrid?", options: ["щоб охопити три треки предка, які вона хоче розділити", "span заборонений із subgrid", "3 — обов'язкове магічне число CSS", "інакше gap стає 0"], optionsEn: ["To span the three parent tracks it should share", "span is forbidden with subgrid", "3 is a mandatory CSS magic number", "Otherwise gap becomes 0"], correctIndex: 0, explanationUk: "Позичають рівно ті лінії, які охопили.", explanationEn: "You borrow exactly the lines you span." }
        ],
        whyUk: "Як вирівняти футери карток різної висоти в одному ряді?",
        whyEn: "How do you align footers of cards with different heights in one row?",
        ideas: [{ labelUk: "спільні лінії предка", labelEn: "shared parent lines", anyOf: ["subgrid", "предок", "parent", "ліні", "line"] }, { labelUk: "span треків", labelEn: "span of tracks", anyOf: ["span", "трек", "track", "рядк", "row"] }, { labelUk: "не contents", labelEn: "not contents", anyOf: ["contents", "коробк", "box", "fallback"] }],
        sampleUk: "Картки ставлять на subgrid рядків предка з потрібним span, тож футери ділять одну лінію; display: contents тут не замінює коробку карти.",
        sampleEn: "Cards sit on a subgrid of the parent's rows with the right span, so footers share one line; display: contents is not a substitute for the card box.",
      },
      {
        slug: "cl-has-selector",
        titleUk: ":has(): стиль предка від нащадка",
        titleEn: ":has(): style a parent from a descendant",
        difficulty: 3,
        pointsUk: [":has зіставляє елемент за пов'язаними елементами", "Вимірюйте продуктивність складних селекторів", "Це не заміна доступної розмітки"],
        pointsEn: [":has matches an element based on related elements", "Measure the performance of complex selectors", "It is not a substitute for accessible markup"],
        conceptUk: ":has() дозволяє зіставляти елемент за відносним селектором: form:has(:invalid) вибирає форму з невалідним нащадком, а .card:has(img) — картку із зображенням. Можна перевіряти й інші відношення, наприклад сусідній елемент. Складність і частота змін DOM впливають на вартість селектора; не припускайте, що кожен :has повільний, а вимірюйте проблемні випадки. Візуальний стиль сам не повідомляє про помилку допоміжним технологіям.",
        conceptEn: ":has() matches an element using a relative selector: form:has(:invalid) selects a form with an invalid descendant, and .card:has(img) a card with an image. It can test other relationships too, such as an adjacent sibling. Selector complexity and DOM changes affect cost; do not assume every :has is slow, measure problematic cases. Visual styling alone does not communicate an error to assistive technology.",
        code: "form:has(:invalid) { outline: 2px solid var(--danger); }\n.card { display: grid; grid-template-columns: 1fr; }\n.card:has(img) { grid-template-columns: 160px 1fr; }",
        language: "css",
        retrieval: [
          { kind: "mcq", promptUk: "Що вибирає fieldset:has(:invalid)?", promptEn: "What does fieldset:has(:invalid) select?", options: ["fieldset, якщо всередині є невалідне поле", "валідує форму на сервері", "вимикає :invalid", "це синтаксична помилка"], optionsEn: ["A fieldset containing an invalid field", "It validates the form on the server", "It disables :invalid", "It is a syntax error"], correctIndex: 0, explanationUk: "Селектор зіставляє предка за станом нащадка; стиль задає окреме правило.", explanationEn: "The selector matches the ancestor based on a descendant; a separate rule supplies the style." },
          { kind: "fill", promptUk: "Допишіть селектор «картка, що містить зображення»", promptEn: "Fill in the selector 'a card that contains an image'", language: "css", code: ".card:___(img) { grid-template-columns: 1fr 1fr; }", accepted: ["has"], caseSensitive: true, explanationUk: "Псевдоклас — :has.", explanationEn: "The pseudo-class is :has." },
          { kind: "mcq", promptUk: "Як оцінити продуктивність складного :has() на великій сторінці?", promptEn: "How should you assess a complex :has() selector on a large page?", options: ["виміряти реальний сценарій і за потреби звузити селектор", "припустити, що всі :has однаково повільні", "видалити всі стилі", "вимкнути фокус"], optionsEn: ["Measure the real scenario and narrow the selector if needed", "Assume all :has selectors are equally slow", "Delete all styles", "Disable focus"], correctIndex: 0, explanationUk: "Вартість залежить від селектора, DOM і змін; перевіряйте профілюванням.", explanationEn: "Cost depends on the selector, DOM, and changes; verify through profiling." }
        ],
        whyUk: "Коли :has корисніший за додавання класу з JavaScript?",
        whyEn: "When is :has more useful than adding a class from JavaScript?",
        ideas: [{ labelUk: "стан нащадка в CSS", labelEn: "descendant state in CSS", anyOf: ["has", "invalid", "предок", "parent", "клас", "class"] }, { labelUk: "без зайвого JS", labelEn: "without extra JS", anyOf: ["js", "клас", "class", "стан", "state"] }, { labelUk: "вузький селектор", labelEn: "a narrow selector", anyOf: ["вузьк", "narrow", "*", "дерев", "tree"] }],
        sampleUk: ":has дозволяє підсвітити предка від стану нащадка без JS; складний селектор варто перевірити профілюванням і за потреби зробити вузьким, а доступність не з'являється автоматично.",
        sampleEn: ":has can highlight an ancestor from a descendant's state without JS; profile a complex selector and make it narrow if needed, while accessibility does not appear automatically.",
      },
      {
        slug: "cl-scroll-snap",
        titleUk: "scroll-snap: карусель без важкого JS",
        titleEn: "scroll-snap: a carousel without heavy JS",
        difficulty: 2,
        pointsUk: ["snap-type на контейнері, snap-align на слайдах", "mandatory проти proximity — сила прилипання", "Клавіатура й reduced motion обов'язкові"],
        pointsEn: ["snap-type on the container, snap-align on the slides", "mandatory versus proximity is snap strength", "Keyboard and reduced motion are required"],
        conceptUk: "На контейнері задайте overflow-x: auto і scroll-snap-type: x mandatory або proximity; на слайдах — scroll-snap-align: start. mandatory просить браузер зупинятися на доступній точці прилипання, а proximity залишає більше свободи залежно від відстані та реалізації браузера. Враховуйте великі слайди й недосяжні точки: користувач має мати змогу прочитати весь вміст. Перевіряйте керування клавіатурою та видимий фокус; для кнопок попереднього і наступного слайда потрібна відповідна поведінка, яку треба окремо реалізувати. Не ховайте скролбар без доступної альтернативи. Якщо додаєте плавне програмне гортання, при prefers-reduced-motion: reduce використовуйте неплавний варіант.",
        conceptEn: "Set overflow-x: auto and scroll-snap-type: x mandatory or proximity on the container, and scroll-snap-align: start on slides. mandatory asks the browser to settle at an available snap point; proximity gives more leeway depending on distance and browser behavior. Account for oversized slides and unreachable positions: users must be able to read all content. Test keyboard operation and visible focus; previous and next buttons require behavior implemented separately. Do not hide the scrollbar without an accessible alternative. If adding smooth programmatic scrolling, use a non-smooth option when prefers-reduced-motion is reduce.",
        code: ".scroller { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; }\n.slide { scroll-snap-align: start; flex: 0 0 100%; }",
        language: "css",
        retrieval: [
          { kind: "mcq", promptUk: "Де ставлять scroll-snap-type, а де scroll-snap-align?", promptEn: "Where do you put scroll-snap-type, and where scroll-snap-align?", options: ["type на контейнері з overflow, align — на кожному слайді", "обидва лише на body", "type на слайді, align на html", "це властивості flex, не скролу"], optionsEn: ["type on the scrolling container, align on each slide", "Both only on body", "type on the slide, align on html", "They are flex properties, not scroll properties"], correctIndex: 0, explanationUk: "Контейнер задає вісь, дитина — точку прилипання.", explanationEn: "The container sets the axis, the child sets the snap point." },
          { kind: "fill", promptUk: "Допишіть обов'язкове прилипання по осі x", promptEn: "Fill in mandatory snapping on the x axis", language: "css", code: "scroll-snap-type: x ___;", accepted: ["mandatory"], caseSensitive: true, explanationUk: "Потрібне значення — mandatory; proximity задає інший рівень прилипання.", explanationEn: "The requested value is mandatory; proximity specifies a different snapping strictness." },
          { kind: "mcq", promptUk: "Який ризик має карусель без клавіатурно доступного керування?", promptEn: "What is the risk of a carousel without keyboard-accessible controls?", options: ["деякі користувачі можуть не мати надійного способу перейти між слайдами", "snap вимикає Tab глобально", "mandatory заборонений з клавіатури", "скролбар завжди замінює керування"], optionsEn: ["Some users may lack a reliable way to move between slides", "snap disables Tab globally", "mandatory is forbidden for keyboards", "A scrollbar always replaces controls"], correctIndex: 0, explanationUk: "Забезпечте та перевірте доступне керування клавіатурою.", explanationEn: "Provide and test accessible keyboard controls." }
        ],
        whyUk: "Як зібрати доступну карусель на CSS snap?",
        whyEn: "How do you build an accessible carousel on CSS snap?",
        ideas: [{ labelUk: "type і align", labelEn: "type and align", anyOf: ["snap-type", "snap-align", "overflow", "mandatory"] }, { labelUk: "клавіатура", labelEn: "keyboard", anyOf: ["клавіатур", "keyboard", "кнопк", "button", "фокус", "focus"] }, { labelUk: "reduced motion", labelEn: "reduced motion", anyOf: ["reduced", "motion", "scroll-behavior", "auto"] }],
        sampleUk: "Контейнер отримує snap-type і overflow, слайди — snap-align; для доступу додають кнопки або фокус і поважають зменшення руху, а не лише ховають скролбар.",
        sampleEn: "The container gets snap-type and overflow, the slides get snap-align; for access you add buttons or focus and respect reduced motion, rather than only hiding the scrollbar.",
      }
    ],
    "Контрольна: subgrid, :has, snap",
    "Exam: subgrid, :has, snap",
    [
      { promptUk: "subgrid потрібен, щоб…", promptEn: "subgrid is needed so…", options: ["діти ділили лінії сітки предка", "прибрати коробку як contents", "замінити flex завжди", "вимкнути gap"], optionsEn: ["Children share the parent grid's lines", "Remove the box like contents", "Always replace flex", "Disable gap"], correctIndex: 0, explanationUk: "Спільні лінії.", explanationEn: "Shared lines." },
      { promptUk: "form:has(:invalid) вибирає…", promptEn: "form:has(:invalid) selects…", options: ["форму, якщо всередині є невалідне поле", "лише перше поле", "серверну валідацію", "нічого, це невалідний селектор"], optionsEn: ["A form containing an invalid field", "Only the first field", "Server-side validation", "Nothing; the selector is invalid"], correctIndex: 0, explanationUk: "Предок зіставляється за станом нащадка.", explanationEn: "The ancestor is matched based on a descendant's state." },
      { promptUk: "scroll-snap-type ставлять…", promptEn: "scroll-snap-type is set…", options: ["на контейнер із overflow", "лише на html", "лише на кожен слайд замість align", "у @keyframes"], optionsEn: ["On the scrolling container", "Only on html", "Only on each slide instead of align", "In @keyframes"], correctIndex: 0, explanationUk: "Вісь на контейнері.", explanationEn: "The axis on the container." },
      { promptUk: "Складний :has() у проблемному інтерфейсі слід…", promptEn: "A complex :has() in a slow interface should be…", options: ["перевірити профілюванням і за потреби спростити", "вважати найдешевшим селектором", "вважати обов'язковим для snap", "замінити на subgrid як синонім"], optionsEn: ["Profiled and simplified if needed", "Assumed to be the cheapest selector", "Considered mandatory for snap", "Replaced by subgrid as a synonym"], correctIndex: 0, explanationUk: "Вартість залежить від конкретного сценарію.", explanationEn: "Cost depends on the specific scenario." }
    ],
  )
];

const insertions: Record<string, LessonContent[]> = {};

export function expandCssLayout(course: CourseContent): CourseContent {
  return expandCourse(course, insertions, newUnits);
}
