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
        pointsUk: ["Перелічуйте властивості, не all", "transform і opacity дешевші за width і top", "display:none не інтерполюється сам по собі"],
        pointsEn: ["List the properties, not all", "transform and opacity are cheaper than width and top", "display:none does not interpolate on its own"],
        conceptUk: "transition-property краще перелічити явно (transform, opacity), ніж all: all анімує й ширину, і колір, і неочікувані зміни, і коштує дорожче. Анімуйте transform і opacity — їх компонує GPU без перерахунку макета. width, height, top і left викликають layout на кожен кадр. transition-timing-function: ease-out для появи, ease-in для зникнення; стрибки на hover без переходів виглядають різко. Для появи з display:none самого transition недостатньо: елемент треба спочатку показати, потім змінити клас — часто через два кадри або @starting-style.",
        conceptEn: "transition-property is better as an explicit list (transform, opacity) than all: all also animates width, color, and unexpected changes, and costs more. Animate transform and opacity — the GPU composites them without recalculating layout. width, height, top, and left trigger layout on every frame. transition-timing-function: ease-out for appearing, ease-in for leaving; hover jumps without transitions look abrupt. For appearing from display:none, a transition alone is not enough: you must show the element first, then change the class — often two frames later, or with @starting-style.",
        code: ".card { transition-property: transform, opacity; transition-duration: 200ms; }",
        language: "css",
        retrieval: [
          { kind: "mcq", promptUk: "Чому transition: all 300ms ризикований?", promptEn: "Why is transition: all 300ms risky?", options: ["анімуються й дорогі властивості макета, плюс несподівані зміни", "all заборонений у CSS", "300ms ігнорується", "all вимикає opacity"], correctIndex: 0, explanationUk: "Називайте лише те, що треба.", explanationEn: "Name only what you need." },
          { kind: "fill", promptUk: "Допишіть дешеву властивість руху", promptEn: "Fill in a cheap motion property", language: "css", code: "transition-property: ___, opacity;", accepted: ["transform"], caseSensitive: true, explanationUk: "transform композититься без layout.", explanationEn: "transform is composited without layout." },
          { kind: "mcq", promptUk: "Чому height: auto важко плавно розкрити переходом?", promptEn: "Why is height: auto hard to ease open with a transition?", options: ["браузер не інтерполює auto як число пікселів у класичному переході", "auto завжди 0", "transition не вміє height взагалі", "потрібен лише all"], correctIndex: 0, explanationUk: "Часто використовують grid-template-rows: 0fr / 1fr або max-height як компроміс.", explanationEn: "People often use grid-template-rows: 0fr / 1fr, or max-height as a compromise." }
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
        conceptUk: "@keyframes описує кадри від from до to або у відсотках. animation-name пов'язує їх з елементом; duration, iterations (infinite для лоадера — обережно для батареї й вестибулярного апарату), direction, fill-mode. animation-fill-mode: forwards лишає кінцевий стан, інакше елемент стрибає назад. Для одноразової появи достатньо forwards і iterations 1. Ім'я анімації — у просторі сторінки: уникайте зіткнень у великих дизайн-системах. Не анімуйте layout-властивості в ключових кадрах з тієї ж причини, що й у transitions.",
        conceptEn: "@keyframes describes frames from from to to, or in percentages. animation-name binds them to an element; duration, iterations (infinite for a loader — be careful with battery and vestibular comfort), direction, and fill-mode. animation-fill-mode: forwards keeps the end state, otherwise the element jumps back. For a one-shot appearance, forwards and one iteration are enough. The animation name is in the page's namespace: avoid collisions in a large design system. Do not animate layout properties in keyframes for the same reason as in transitions.",
        code: "@keyframes fade-in { from { opacity: 0 } to { opacity: 1 } }\n.toast { animation: fade-in 200ms ease-out forwards; }",
        language: "css",
        retrieval: [
          { kind: "mcq", promptUk: "Що робить animation-fill-mode: forwards?", promptEn: "What does animation-fill-mode: forwards do?", options: ["лишає стилі останнього кадру після закінчення", "завжди зациклює анімацію", "вимикає ключові кадри", "замінює transition"], correctIndex: 0, explanationUk: "Без forwards елемент повертається до стилів до анімації.", explanationEn: "Without forwards the element returns to its pre-animation styles." },
          { kind: "fill", promptUk: "Допишіть правило ключових кадрів", promptEn: "Fill in the keyframes rule", language: "css", code: "@___ fade { from { opacity: 0 } to { opacity: 1 } }", accepted: ["keyframes"], caseSensitive: true, explanationUk: "Директива — @keyframes.", explanationEn: "The at-rule is @keyframes." },
          { kind: "mcq", promptUk: "Чому нескінченний великий рух на фоні сторінки — погана ідея?", promptEn: "Why is infinite large motion in the page background a bad idea?", options: ["навантажує батарею і може викликати дискомфорт; потрібен reduced motion", "infinite заборонений у CSS", "браузер зупиняє сторінку", "forwards тоді не працює"], correctIndex: 0, explanationUk: "Декоративний рух має поступатись комфорту.", explanationEn: "Decorative motion should yield to comfort." }
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
        conceptUk: "Медіазапит prefers-reduced-motion: reduce означає, що користувач просить менше руху (вестибулярні розлади, нудота, просто втома). Тоді великі переїзди, паралакс і нескінченні лоадери вимикають або скорочують до зміни кольору / opacity за 0–200 мс. Не ігноруйте запит «щоб було гарно». Це не обов'язково «ніякої анімації»: короткі, дрібні зміни часто прийнятні. Перевіряйте і в ОС, і в DevTools. Надайте той самий функціонал без руху: зміст не повинен існувати лише в анімації.",
        conceptEn: "The prefers-reduced-motion: reduce media query means the user asked for less motion (vestibular disorders, nausea, or simple fatigue). Then large travels, parallax, and infinite loaders are turned off or shortened to a color or opacity change in 0–200 ms. Do not ignore the query 'to keep it pretty'. It does not always mean 'no animation': short, small changes are often fine. Test both in the OS and in DevTools. Offer the same functionality without motion: content must not exist only inside an animation.",
        code: "@media (prefers-reduced-motion: reduce) {\n  * { animation: none; transition: none; }\n}",
        language: "css",
        retrieval: [
          { kind: "mcq", promptUk: "Що змінити в нескінченному хитанні банера при prefers-reduced-motion: reduce?", promptEn: "What should change about an infinitely swaying banner when prefers-reduced-motion is reduce?", options: ["зупинити або замінити короткою статичною появою", "збільшити амплітуду, щоб «було видно»", "запит можна ігнорувати в маркетингу", "перейти на width-анімацію"], correctIndex: 0, explanationUk: "Користувач явно просив менше руху.", explanationEn: "The user explicitly asked for less motion." },
          { kind: "fill", promptUk: "Допишіть медіазапит зменшення руху", promptEn: "Fill in the reduced-motion media query", language: "css", code: "@media (prefers-___-motion: reduce) { .hero { animation: none } }", accepted: ["reduced"], caseSensitive: true, explanationUk: "Запит — prefers-reduced-motion.", explanationEn: "The query is prefers-reduced-motion." },
          { kind: "mcq", promptUk: "Чи можна залишити коротку зміну opacity 150 мс при reduce?", promptEn: "May you keep a short 150 ms opacity change under reduce?", options: ["так, дрібні короткі зміни часто прийнятні, на відміну від великого паралаксу", "ні, будь-яка анімація заборонена законом", "лише якщо infinite", "лише для width"], correctIndex: 0, explanationUk: "Суть — зменшити, не обов'язково обнулити все.", explanationEn: "The point is to reduce, not necessarily to zero everything." }
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
      { promptUk: "transition: all ризикований, бо…", promptEn: "transition: all is risky because…", options: ["анімує й дорогі layout-властивості", "all ігнорується", "не вміє opacity", "заборонений"], correctIndex: 0, explanationUk: "Перелічіть властивості.", explanationEn: "List the properties." },
      { promptUk: "animation-fill-mode: forwards…", promptEn: "animation-fill-mode: forwards…", options: ["зберігає кінцевий кадр", "зациклює infinite", "вимикає ключові кадри", "це синонім ease-out"], correctIndex: 0, explanationUk: "Інакше стрибок назад.", explanationEn: "Otherwise a jump back." },
      { promptUk: "prefers-reduced-motion: reduce…", promptEn: "prefers-reduced-motion: reduce…", options: ["просить менше великого руху", "завжди означає нуль анімації за специфікацією", "стосується лише кольорів", "ігнорується в браузерах"], correctIndex: 0, explanationUk: "Поважайте запит.", explanationEn: "Honour the request." },
      { promptUk: "Для руху краще анімувати…", promptEn: "For motion it is better to animate…", options: ["transform і opacity", "width і top", "height: auto напряму завжди", "display:none"], correctIndex: 0, explanationUk: "Композитний шар.", explanationEn: "A compositor layer." }
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
          { kind: "mcq", promptUk: "Що станеться з margin-left: 2rem на RTL-сторінці?", promptEn: "What happens to margin-left: 2rem on an RTL page?", options: ["відступ лишиться фізично зліва, хоча рядок починається справа", "він автоматично дзеркалиться завжди", "властивість ігнорується", "браузер кине помилку"], correctIndex: 0, explanationUk: "Для початку рядка потрібен margin-inline-start.", explanationEn: "The start of the line needs margin-inline-start." },
          { kind: "fill", promptUk: "Допишіть логічний відступ початку рядка", promptEn: "Fill in the logical margin at the start of the line", language: "css", code: "margin-___-start: 2rem;", accepted: ["inline"], caseSensitive: true, explanationUk: "Вісь рядка — inline.", explanationEn: "The line axis is inline." },
          { kind: "mcq", promptUk: "Коли фізичний left усе ж доречний?", promptEn: "When is physical left still appropriate?", options: ["коли елемент прив'язаний до сторони екрана, не до тексту", "ніколи", "завжди замість логічних", "лише в RTL"], correctIndex: 0, explanationUk: "Розрізняйте текст і в'юпорт.", explanationEn: "Distinguish the text from the viewport." }
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
        pointsUk: ["writing-mode змінює блокову вісь", "inline-size і block-size однозначні", "rotate всього макета ламає ввід"],
        pointsEn: ["writing-mode changes the block axis", "inline-size and block-size are unambiguous", "Rotating the whole layout breaks input"],
        conceptUk: "writing-mode: horizontal-tb — звичний горизонтальний текст, блоки йдуть згори вниз. vertical-rl використовують для традиційного китайського чи японського: рядки вертикальні, блоки течуть праворуч-ліворуч. Тоді width/height у голові плутаються зі «шириною рядка»: логічні inline-size і block-size не двозначні. overflow-x і overflow-y теж фізичні; overflow-inline / overflow-block з'являються для логіки. Не повертайте весь макет через rotate, якщо можна змінити writing-mode: інакше ввід і виділення тексту постраждають.",
        conceptEn: "writing-mode: horizontal-tb is ordinary horizontal text, with blocks flowing top to bottom. vertical-rl is used for traditional Chinese or Japanese: lines are vertical and blocks flow right to left. Then width/height in your head get confused with 'line width': logical inline-size and block-size are unambiguous. overflow-x and overflow-y are physical too; overflow-inline and overflow-block exist for the logical axes. Do not rotate the whole layout with rotate if you can change writing-mode: otherwise input and text selection suffer.",
        code: ".col { writing-mode: vertical-rl; inline-size: 30ch; }",
        language: "css",
        retrieval: [
          { kind: "mcq", promptUk: "Чим inline-size відрізняється від width при vertical-rl?", promptEn: "How does inline-size differ from width under vertical-rl?", options: ["inline-size — розмір уздовж рядка, який тепер вертикальний; width лишається фізичною горизонталлю", "це синоніми завжди", "inline-size заборонений у vertical", "width тоді стає логічним сам"], correctIndex: 0, explanationUk: "Логічний розмір слідує письму.", explanationEn: "The logical size follows writing." },
          { kind: "fill", promptUk: "Допишіть логічну ширину «уздовж рядка»", promptEn: "Fill in the logical size along the line", language: "css", code: "___-size: 20ch;", accepted: ["inline"], caseSensitive: true, explanationUk: "Властивість — inline-size.", explanationEn: "The property is inline-size." },
          { kind: "mcq", promptUk: "Чому rotate(90deg) усього article — погана заміна writing-mode?", promptEn: "Why is rotate(90deg) on the whole article a poor substitute for writing-mode?", options: ["координати вводу й виділення лишаються в не inst. повернутій системі, текст важко редагувати", "rotate заборонений", "writing-mode не вміє вертикалі", "браузер ігнорує rotate на article"], correctIndex: 0, explanationUk: "Письмо — не візуальний трюк.", explanationEn: "Writing is not a visual trick." }
        ],
        whyUk: "Коли ставити writing-mode, а не крутити блок через transform?",
        whyEn: "When should you set writing-mode rather than rotate a block with transform?",
        ideas: [{ labelUk: "справжнє вертикальне письмо", labelEn: "real vertical writing", anyOf: ["writing-mode", "vertical", "япон", "japanese", "китай"] }, { labelUk: "inline-size", labelEn: "inline-size", anyOf: ["inline-size", "block-size", "width"] }, { labelUk: "ввід і виділення", labelEn: "input and selection", anyOf: ["ввід", "input", "виділен", "selection", "rotate"] }],
        sampleUk: "Для справжнього вертикального письма ставлять writing-mode і логічні розміри; rotate всього блоку лишає ввід і виділення в старій системі координат.",
        sampleEn: "For real vertical writing you set writing-mode and logical sizes; rotating the whole block leaves input and selection in the old coordinate system.",
      },
      {
        slug: "cl-logical-margins",
        titleUk: "Логічні поля, бордери й радіуси",
        titleEn: "Logical margins, borders, and radii",
        difficulty: 2,
        pointsUk: ["Є логічні бордери, поля й радіуси", "start-start у RTL не той самий фізичний кут", "Не змішуйте словники в одному компоненті"],
        pointsEn: ["There are logical borders, margins, and radii", "start-start in RTL is not the same physical corner", "Do not mix vocabularies in one component"],
        conceptUk: "Окрім margin-inline, є border-inline-start, border-block-end, padding-block. Радіуси теж логічні: border-start-start-radius — кут на перетині початку блоку і початку рядка, що в LTR збігається з top-left, а в RTL — з top-right. Скорочення margin-inline: 0 1rem задає start і end. У компонентній бібліотеці логічні властивості зменшують кількість винятків [dir=rtl]. Мішати в одному правилі left і inline-start можна, але легко заплутатись: оберіть один словник для компонента.",
        conceptEn: "Besides margin-inline there are border-inline-start, border-block-end, and padding-block. Radii are logical too: border-start-start-radius is the corner where the block start meets the line start, which in LTR matches top-left and in RTL matches top-right. The shorthand margin-inline: 0 1rem sets start and end. In a component library, logical properties cut the number of [dir=rtl] exceptions. You can mix left and inline-start in one rule, but it is easy to get lost: pick one vocabulary per component.",
        code: ".chip { border-start-start-radius: 999px; border-inline-start: 2px solid currentColor; }",
        language: "css",
        retrieval: [
          { kind: "mcq", promptUk: "Чому border-top-left-radius «не той кут» у RTL?", promptEn: "Why is border-top-left-radius 'the wrong corner' in RTL?", options: ["це фізичний лівий верх, а початок рядка тепер справа", "радіуси не дзеркаляться ніколи навмисно", "RTL ігнорує радіуси", "потрібен лише width"], correctIndex: 0, explanationUk: "Логічний кут — border-start-start-radius.", explanationEn: "The logical corner is border-start-start-radius." },
          { kind: "fill", promptUk: "Допишіть скорочення логічних інлайн-відступів", promptEn: "Fill in the shorthand for logical inline margins", language: "css", code: "margin-___: 0 1rem;", accepted: ["inline"], caseSensitive: true, explanationUk: "Скорочення — margin-inline.", explanationEn: "The shorthand is margin-inline." },
          { kind: "mcq", promptUk: "Що робити, якщо в компоненті вже є margin-left і ви додаєте margin-inline-start?", promptEn: "What should you do if a component already has margin-left and you add margin-inline-start?", options: ["узгодити один словник, бо обидві можуть суперечити", "залишити обидві назавжди «про всяк випадок»", "фізична завжди перемагає специфічністю 0", "логічна ігнорується в LTR"], correctIndex: 0, explanationUk: "Один словник на компонент.", explanationEn: "One vocabulary per component." }
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
      { promptUk: "margin-inline-start у RTL опиняється…", promptEn: "In RTL, margin-inline-start ends up…", options: ["на початку рядка, фізично справа", "завжди фізично зліва", "лише зверху", "ігнорується"], correctIndex: 0, explanationUk: "Логічний початок.", explanationEn: "The logical start." },
      { promptUk: "inline-size при vertical-rl — це…", promptEn: "inline-size under vertical-rl is…", options: ["розмір уздовж рядка, який тепер вертикальний", "завжди фізична ширина екрана", "синонім height у всіх режимах", "заборонений"], correctIndex: 0, explanationUk: "Слідкує за письмом.", explanationEn: "It follows writing." },
      { promptUk: "border-start-start-radius у LTR збігається з…", promptEn: "In LTR, border-start-start-radius matches…", options: ["top-left", "top-right", "bottom-left", "bottom-right"], correctIndex: 0, explanationUk: "Початок блоку і рядка.", explanationEn: "Block start and line start." },
      { promptUk: "rotate всього тексту замість writing-mode…", promptEn: "Rotating all the text instead of writing-mode…", options: ["ламає ввід і виділення", "є рекомендованим способом", "автоматично ставить RTL", "краще для скрінрідерів"], correctIndex: 0, explanationUk: "Письмо змінюють через writing-mode.", explanationEn: "Change writing through writing-mode." }
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
        conceptUk: "oklch(L C H) задає колір у просторі OKLCH: L — сприйнята світлота від 0 до 1 (або відсотків), C — насиченість, H — кут відтінку. На відміну від HSL, однакова L дає ближчу сприйняту яскравість для різних відтінків: синій і жовтий з однаковою «світлотою» в HSL виглядають по-різному. Це зручно для палітри: фіксуєте L і C, крокуєте H. Не всі значення відображаються на екрані (out of gamut): браузер кліпує або використовує relative color. Для тексту тримайте контраст WCAG, не лише «гарну» хрому.",
        conceptEn: "oklch(L C H) specifies a colour in OKLCH: L is perceived lightness from 0 to 1 (or percent), C is chroma, H is the hue angle. Unlike HSL, the same L gives closer perceived brightness across hues: blue and yellow with the same HSL 'lightness' look different. That is convenient for a palette: you pin L and C and step H. Not every value can be shown on screen (out of gamut): the browser clips or uses a relative color. For text, keep WCAG contrast, not only a 'nice' chroma.",
        code: "--accent: oklch(0.7 0.14 250);\n--accent-2: oklch(0.7 0.14 310);",
        language: "css",
        retrieval: [
          { kind: "mcq", promptUk: "Чому палітра на oklch зручніша за однаковий lightness у HSL?", promptEn: "Why is an oklch palette easier than the same lightness in HSL?", options: ["однакова L сприймається ближче між відтінками, у HSL жовтий виглядає світлішим за синій", "oklch забороняє жовтий", "HSL не вміє відтінок", "oklch завжди вищий контраст сам по собі"], correctIndex: 0, explanationUk: "Перцептивна рівномірність.", explanationEn: "Perceptual uniformity." },
          { kind: "fill", promptUk: "Допишіть функцію кольору OKLCH", promptEn: "Fill in the OKLCH colour function", language: "css", code: "color: ___(0.72 0.12 250);", accepted: ["oklch"], caseSensitive: true, explanationUk: "Функція — oklch.", explanationEn: "The function is oklch." },
          { kind: "mcq", promptUk: "Що робити, якщо oklch з великою хромою «вилізає» за гамут монітора?", promptEn: "What do you do if a high-chroma oklch falls outside the monitor gamut?", options: ["очікувати кліп або задати запасний колір; зменшити хрому", "браузер завжди аварійно зупиняється", "потрібен лише hex", "гамут не існує для oklch"], correctIndex: 0, explanationUk: "Не кожен теоретичний колір відтворюваний.", explanationEn: "Not every theoretical colour is reproducible." }
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
        conceptUk: "color-mix(in oklch, var(--bg) 80%, var(--fg)) змішує два кольори в зазначеному просторі. Простір важливий: суміш в sRGB часто дає брудний сірий між комплементарними, в oklch — природніший середній відтінок. Це зручно для hover (трохи темніше) і для напівпрозорих шарів без окремої палітри. Відсоток — частка першого або другого, залежно від запису. Якщо один колір currentColor, суміш слідкує за текстом. Не змішуйте в різних просторах «на око» без перевірки контрасту результату.",
        conceptEn: "color-mix(in oklch, var(--bg) 80%, var(--fg)) mixes two colours in the given space. The space matters: a mix in sRGB often gives a dirty grey between complements, in oklch a more natural mid hue. This is handy for hover (a little darker) and for translucent layers without a separate palette. The percentage is the share of the first or second colour, depending on the syntax. If one colour is currentColor, the mix follows the text. Do not mix in different spaces by eye without checking the resulting contrast.",
        code: ".card:hover { background: color-mix(in oklch, var(--bg) 85%, var(--fg)); }",
        language: "css",
        retrieval: [
          { kind: "mcq", promptUk: "Чому суміш червоного й зеленого в sRGB часто сіра й «брудна»?", promptEn: "Why is a mix of red and green in sRGB often a dirty grey?", options: ["sRGB не перцептивно рівномірний, середнє по каналах не дорівнює середньому відтінку", "браузер забороняє ці кольори", "color-mix не вміє зеленого", "потрібен лише hex середнього"], correctIndex: 0, explanationUk: "Обирайте in oklch для природнішої суміші.", explanationEn: "Pick in oklch for a more natural mix." },
          { kind: "fill", promptUk: "Допишіть функцію суміші", promptEn: "Fill in the mix function", language: "css", code: "background: ___-mix(in oklch, var(--bg) 70%, var(--fg));", accepted: ["color"], caseSensitive: true, explanationUk: "Функція — color-mix.", explanationEn: "The function is color-mix." },
          { kind: "mcq", promptUk: "Навіщо color-mix для стану hover замість окремого токена --bg-hover?", promptEn: "Why use color-mix for a hover state instead of a separate --bg-hover token?", options: ["можна вивести стан з наявних токенів, менше вручну підібраних кольорів", "hover забороняє змінні", "mix вимикає :hover", "токенів не існує в CSS"], correctIndex: 0, explanationUk: "Менша палітра, узгоджені стани.", explanationEn: "A smaller palette, consistent states." }
        ],
        whyUk: "У якому просторі змішувати фон і текст для напівтону картки?",
        whyEn: "In which space should you mix background and text for a card tint?",
        ideas: [{ labelUk: "oklch природніший", labelEn: "oklch is more natural", anyOf: ["oklch", "srgb", "брудн", "dirty", "сір", "grey"] }, { labelUk: "відсоток частки", labelEn: "a percentage share", anyOf: ["відсот", "percent", "mix", "70"] }, { labelUk: "контраст результату", labelEn: "contrast of the result", anyOf: ["контраст", "contrast", "hover", "токен", "token"] }],
        sampleUk: "Напівтон картки змішують color-mix у oklch, бо sRGB між відтінками часто дає брудний сірий, і контраст результату все одно перевіряють.",
        sampleEn: "A card tint is mixed with color-mix in oklch, because sRGB often gives a dirty grey between hues, and you still check the resulting contrast.",
      },
      {
        slug: "cl-light-dark",
        titleUk: "light-dark() і color-scheme",
        titleEn: "light-dark() and color-scheme",
        difficulty: 2,
        pointsUk: ["color-scheme повідомляє, що тема підтримана", "light-dark обирає пару без купи медіазапитів", "Контраст перевіряють в обох гілках"],
        pointsEn: ["color-scheme announces that a theme is supported", "light-dark picks a pair without a pile of media queries", "Contrast is checked in both branches"],
        conceptUk: "color-scheme: light dark каже браузеру, що компонент вміє обидві теми: системні контроли (скролбар, input) підлаштовуються. Функція light-dark(white, #111) обирає перший аргумент у світлій схемі й другий у темній, без окремого медіазапиту на кожну властивість. Вона залежить від used color-scheme елемента, не лише від prefers-color-scheme ОС: сторінка може форсувати світлу тему. Завжди задавайте пару, що зберігає контраст в обох режимах. Не залишайте чорний текст на темному фоні, якщо темна гілка не визначена.",
        conceptEn: "color-scheme: light dark tells the browser the component supports both themes: system controls (scrollbar, input) adapt. The light-dark(white, #111) function picks the first argument in a light scheme and the second in a dark one, without a separate media query on every property. It depends on the element's used color-scheme, not only on the OS prefers-color-scheme: a page may force a light theme. Always provide a pair that keeps contrast in both modes. Do not leave black text on a dark background if the dark branch is undefined.",
        code: "html { color-scheme: light dark; }\n.card { background: light-dark(#fff, #111); color: light-dark(#111, #eee); }",
        language: "css",
        retrieval: [
          { kind: "mcq", promptUk: "Чим light-dark відрізняється від @media (prefers-color-scheme: dark)?", promptEn: "How does light-dark differ from @media (prefers-color-scheme: dark)?", options: ["вона дивиться на used color-scheme елемента, який сторінка може форсувати", "це повні синоніми", "light-dark ігнорує теми", "медіазапит не вміє темної теми"], correctIndex: 0, explanationUk: "Сторінка може перевизначити системну перевагу.", explanationEn: "The page can override the system preference." },
          { kind: "fill", promptUk: "Допишіть функцію пари кольорів теми", promptEn: "Fill in the theme colour-pair function", language: "css", code: "background: ___-dark(#fff, #111);", accepted: ["light"], caseSensitive: true, explanationUk: "Функція — light-dark.", explanationEn: "The function is light-dark." },
          { kind: "mcq", promptUk: "Навіщо color-scheme: light dark на html?", promptEn: "Why set color-scheme: light dark on html?", options: ["щоб системні контроли й light-dark знали, що обидві теми підтримані", "щоб вимкнути CSS", "це синонім background", "щоб заборонити темну тему"], correctIndex: 0, explanationUk: "Без color-scheme браузер може лишити світлі контроли на темній сторінці.", explanationEn: "Without color-scheme the browser may leave light controls on a dark page." }
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
      { promptUk: "Однакова L в oklch між відтінками…", promptEn: "The same L in oklch across hues is…", options: ["сприйнято ближча, ніж lightness у HSL", "гарантія WCAG сама по собі", "синонім hue", "заборонена"], correctIndex: 0, explanationUk: "Перцептивна світлота.", explanationEn: "Perceptual lightness." },
      { promptUk: "color-mix in oklch корисний, бо…", promptEn: "color-mix in oklch is useful because…", options: ["середній відтінок природніший, ніж у sRGB", "він завжди дає сірий", "простір ігнорується", "він замінює WCAG"], correctIndex: 0, explanationUk: "Обирайте простір суміші.", explanationEn: "Choose the mixing space." },
      { promptUk: "light-dark дивиться на…", promptEn: "light-dark looks at…", options: ["used color-scheme елемента", "лише змінну середовища Node", "тільки час доби", "системну мову"], correctIndex: 0, explanationUk: "Сторінка може форсувати схему.", explanationEn: "The page can force a scheme." },
      { promptUk: "color-scheme: light dark потрібен, щоб…", promptEn: "color-scheme: light dark is needed so…", options: ["контроли браузера й функції теми знали про підтримку", "вимкнути CSS-змінні", "забороняти oklch", "замінити контраст"], correctIndex: 0, explanationUk: "Оголосіть підтримку тем.", explanationEn: "Announce theme support." }
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
        code: ".row { display: grid; grid-template-columns: repeat(3, 1fr); }\n.card { display: grid; grid-row: span 3; grid-template-rows: subgrid; }",
        language: "css",
        retrieval: [
          { kind: "mcq", promptUk: "Навіщо subgrid у ряді карток із заголовком, текстом і футером?", promptEn: "Why use subgrid in a row of cards with a title, body, and footer?", options: ["щоб заголовки й футери всіх карток стояли на спільних лініях предка", "щоб прибрати сітку", "subgrid вимикає gap", "це синонім flex"], correctIndex: 0, explanationUk: "Власні гріди карток не ділять лінії.", explanationEn: "Private card grids do not share lines." },
          { kind: "fill", promptUk: "Допишіть позичання рядків предка", promptEn: "Fill in borrowing the parent's rows", language: "css", code: "grid-template-rows: ___;", accepted: ["subgrid"], caseSensitive: true, explanationUk: "Значення — subgrid.", explanationEn: "The value is subgrid." },
          { kind: "mcq", promptUk: "Чому дитині часто пишуть grid-row: span 3 разом із subgrid?", promptEn: "Why does a child often get grid-row: span 3 together with subgrid?", options: ["щоб охопити три треки предка, які вона хоче розділити", "span заборонений із subgrid", "3 — обов'язкове магічне число CSS", "інакше gap стає 0"], correctIndex: 0, explanationUk: "Позичають рівно ті лінії, які охопили.", explanationEn: "You borrow exactly the lines you span." }
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
        pointsUk: [":has стилізує предка за наявністю нащадка", "Уникайте :has(*) на великих деревах", "Це не заміна доступної розмітки"],
        pointsEn: [":has styles an ancestor based on a descendant", "Avoid :has(*) on large trees", "It is not a substitute for accessible markup"],
        conceptUk: "Селектор :has() дозволяє поставити стиль на предка, якщо всередині є певний нащадок: form:has(:invalid) підсвічує форму з помилкою, card:has(img) змінює сітку, коли є зображення. Це «батьківський селектор», якого в CSS довго не було; раніше потрібен був JS. :has дорожчий за прості селектори — не вішайте :has(*) на велике дерево. Поєднуйте з :focus-within для групи полів. Підтримка вже широка, але перевіряйте цільові браузери. Не замінюйте цим серверну логіку доступності: :has не читає скрінрідер сам по собі.",
        conceptEn: "The :has() selector lets you style an ancestor if a given descendant is inside: form:has(:invalid) highlights a form with an error, card:has(img) changes the grid when an image is present. This is the 'parent selector' CSS lacked for a long time; you used to need JS. :has is costlier than simple selectors — do not hang :has(*) on a large tree. Combine it with :focus-within for a field group. Support is already broad, but check your target browsers. Do not replace server-side accessibility logic with it: :has is not read by a screen reader on its own.",
        code: "form:has(:invalid) { outline: 2px solid var(--danger); }\n.card:has(img) { grid-template-columns: 160px 1fr; }",
        language: "css",
        retrieval: [
          { kind: "mcq", promptUk: "Що робить fieldset:has(:invalid)?", promptEn: "What does fieldset:has(:invalid) do?", options: ["стилізує весь fieldset, якщо всередині є невалідне поле", "валідує форму на сервері", "вимикає :invalid", "це синтаксична помилка"], correctIndex: 0, explanationUk: "Предок реагує на стан нащадка.", explanationEn: "The ancestor reacts to a descendant's state." },
          { kind: "fill", promptUk: "Допишіть селектор «картка, що містить зображення»", promptEn: "Fill in the selector 'a card that contains an image'", language: "css", code: ".card:___(img) { grid-template-columns: 1fr 1fr; }", accepted: ["has"], caseSensitive: true, explanationUk: "Псевдоклас — :has.", explanationEn: "The pseudo-class is :has." },
          { kind: "mcq", promptUk: "Чому :has(*) на body — погана ідея?", promptEn: "Why is :has(*) on body a bad idea?", options: ["браузеру дорого відстежувати будь-якого нащадка на всьому дереві", "* заборонений у CSS", ":has не вміє * синтаксично", "це вимикає focus"], correctIndex: 0, explanationUk: "Вузький внутрішній селектор.", explanationEn: "A narrow inner selector." }
        ],
        whyUk: "Коли :has корисніший за додавання класу з JavaScript?",
        whyEn: "When is :has more useful than adding a class from JavaScript?",
        ideas: [{ labelUk: "стан нащадка в CSS", labelEn: "descendant state in CSS", anyOf: ["has", "invalid", "предок", "parent", "клас", "class"] }, { labelUk: "без зайвого JS", labelEn: "without extra JS", anyOf: ["js", "клас", "class", "стан", "state"] }, { labelUk: "вузький селектор", labelEn: "a narrow selector", anyOf: ["вузьк", "narrow", "*", "дерев", "tree"] }],
        sampleUk: ":has дозволяє підсвітити предка від стану нащадка без JS, якщо селектор вузький; зірочка на великому дереві дорога, і доступність від цього сама не з'являється.",
        sampleEn: ":has lets you highlight an ancestor from a descendant's state without JS, if the selector is narrow; a star on a large tree is expensive, and accessibility does not appear from this alone.",
      },
      {
        slug: "cl-scroll-snap",
        titleUk: "scroll-snap: карусель без важкого JS",
        titleEn: "scroll-snap: a carousel without heavy JS",
        difficulty: 2,
        pointsUk: ["snap-type на контейнері, snap-align на слайдах", "mandatory проти proximity — сила прилипання", "Клавіатура й reduced motion обов'язкові"],
        pointsEn: ["snap-type on the container, snap-align on the slides", "mandatory versus proximity is snap strength", "Keyboard and reduced motion are required"],
        conceptUk: "На контейнері scroll-snap-type: x mandatory (або proximity) і overflow-x: auto; на слайдах scroll-snap-align: start. Браузер докручує до кадру після жесту. mandatory завжди прилипає, proximity — якщо близько. Для доступності: клавіатура має гортати (фокусні слайди або кнопки), не ховайте скролбар без альтернативи, поважайте reduced motion (scroll-behavior: auto). Не виходьте snap'ом за межі, де контент обрізається без способу прочитати. JS лишається для точок-індикаторів і кнопок «наступний», але сам snap — нативний.",
        conceptEn: "On the container, scroll-snap-type: x mandatory (or proximity) and overflow-x: auto; on the slides, scroll-snap-align: start. The browser settles on a frame after the gesture. mandatory always snaps, proximity snaps if close. For accessibility: the keyboard must be able to move (focusable slides or buttons), do not hide the scrollbar without an alternative, and respect reduced motion (scroll-behavior: auto). Do not snap in a way that clips content with no way to read it. JS remains for dot indicators and next buttons, but the snap itself is native.",
        code: ".scroller { overflow-x: auto; scroll-snap-type: x mandatory; }\n.slide { scroll-snap-align: start; flex: 0 0 100%; }",
        language: "css",
        retrieval: [
          { kind: "mcq", promptUk: "Де ставлять scroll-snap-type, а де scroll-snap-align?", promptEn: "Where do you put scroll-snap-type, and where scroll-snap-align?", options: ["type на контейнері з overflow, align — на кожному слайді", "обидва лише на body", "type на слайді, align на html", "це властивості flex, не скролу"], correctIndex: 0, explanationUk: "Контейнер задає вісь, дитина — точку прилипання.", explanationEn: "The container sets the axis, the child sets the snap point." },
          { kind: "fill", promptUk: "Допишіть обов'язкове прилипання по осі x", promptEn: "Fill in mandatory snapping on the x axis", language: "css", code: "scroll-snap-type: x ___;", accepted: ["mandatory"], caseSensitive: true, explanationUk: "Значення — mandatory або proximity.", explanationEn: "The value is mandatory or proximity." },
          { kind: "mcq", promptUk: "Чому карусель лише зі snap без кнопок і без фокусу погана для клавіатури?", promptEn: "Why is a snap-only carousel with no buttons and no focus bad for the keyboard?", options: ["немає способу перейти до наступного слайда з клавіші", "snap вимикає Tab глобально", "mandatory заборонений з клавіатури", "скролбар замінює Tab завжди"], correctIndex: 0, explanationUk: "Додайте кнопки або фокусні слайди.", explanationEn: "Add buttons or focusable slides." }
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
      { promptUk: "subgrid потрібен, щоб…", promptEn: "subgrid is needed so…", options: ["діти ділили лінії сітки предка", "прибрати коробку як contents", "замінити flex завжди", "вимкнути gap"], correctIndex: 0, explanationUk: "Спільні лінії.", explanationEn: "Shared lines." },
      { promptUk: "form:has(:invalid) стилізує…", promptEn: "form:has(:invalid) styles…", options: ["форму, якщо всередині є невалідне поле", "лише перше поле", "серверну валідацію", "нічого, це невалідний селектор"], correctIndex: 0, explanationUk: "Предок від нащадка.", explanationEn: "An ancestor from a descendant." },
      { promptUk: "scroll-snap-type ставлять…", promptEn: "scroll-snap-type is set…", options: ["на контейнер із overflow", "лише на html", "лише на кожен слайд замість align", "у @keyframes"], correctIndex: 0, explanationUk: "Вісь на контейнері.", explanationEn: "The axis on the container." },
      { promptUk: ":has(*) на великому дереві…", promptEn: ":has(*) on a large tree is…", options: ["дорогий для обчислень", "найшвидший селектор", "обов'язковий для snap", "синонім subgrid"], correctIndex: 0, explanationUk: "Вузький внутрішній селектор.", explanationEn: "A narrow inner selector." }
    ],
  )
];

const insertions: Record<string, LessonContent[]> = {};

export function expandCssLayout(course: CourseContent): CourseContent {
  return expandCourse(course, insertions, newUnits);
}
