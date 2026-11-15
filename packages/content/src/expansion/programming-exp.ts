import type { CourseContent, LessonContent, UnitContent } from "../types.js";
import { expandCourse, sectionUnit, teachLesson } from "./factory.js";

export const newUnits: UnitContent[] = [

];

const insertions: Record<string, LessonContent[]> = {
  "html": [
      teachLesson({
        slug: "html-datalist-autocomplete",
        titleUk: "datalist: підказки, що не замінюють введення",
        titleEn: "datalist: suggestions that do not replace typing",
        difficulty: 2,
        pointsUk: ["list на input вказує на id datalist", "Можна ввести значення поза підказками, на відміну від select", "Підказки не замінюють валідацію на сервері"],
        pointsEn: ["list on the input points at the datalist id", "You can type a value outside the suggestions, unlike select", "Suggestions do not replace server validation"],
        conceptUk: "Елемент datalist з id зв'язують з input через атрибут list. Браузер показує підказки option, але користувач може ввести своє значення — на відміну від select, який обмежує вибір. Це зручно для міста, тега чи вже відомого коду. Підказки не замінюють серверну валідацію: клієнт надішле будь-який рядок. Для доступності label лишається на input; порожній datalist нічого не дає. Не дублюйте сотні option, якщо список треба шукати на сервері — тоді краще власний combobox з обережною ARIA.",
        conceptEn: "A datalist with an id is bound to an input through the list attribute. The browser shows option suggestions, but the user may still type their own value — unlike a select, which limits the choice. That is convenient for a city, a tag, or a known code. Suggestions do not replace server validation: the client will send any string. For accessibility the label stays on the input; an empty datalist helps nobody. Do not dump hundreds of option elements if the list should be searched on the server — then a custom combobox with careful ARIA is better.",
        code: "<label>City <input name='city' list='cities'></label>\n<datalist id='cities'><option value='Kyiv'><option value='Lviv'></datalist>",
        language: "html",
        retrieval: [
          { kind: "mcq", promptUk: "Чим datalist відрізняється від select?", promptEn: "How does datalist differ from select?", options: ["користувач може ввести значення, якого немає в підказках", "datalist завжди обов'язковий як select", "select дозволяє довільний рядок, datalist — ні", "вони повні синоніми"], correctIndex: 0, explanationUk: "Це підказки, не закритий список.", explanationEn: "These are suggestions, not a closed list." },
          { kind: "fill", promptUk: "Допишіть зв'язок поля з підказками", promptEn: "Fill in binding the field to the suggestions", language: "html", code: "<input name='city' ___='cities'><datalist id='cities'>", accepted: ["list"], caseSensitive: true, explanationUk: "Атрибут — list.", explanationEn: "The attribute is list." },
          { kind: "read", promptUk: "Чому цього недостатньо як єдиної перевірки коду країни?", promptEn: "Why is this not enough as the only check of a country code?", language: "html", code: "<input list='cc'><datalist id='cc'><option value='UA'></datalist>", options: ["клієнт надішле будь-який рядок, потрібна серверна валідація", "option забороняє інші значення в протоколі HTTP", "datalist шифрує значення", "list працює лише з select"], correctIndex: 0, explanationUk: "HTML-підказка — не довіра.", explanationEn: "An HTML suggestion is not trust." }
        ],
        whyUk: "Коли поставити datalist, а коли select?",
        whyEn: "When should you use a datalist, and when a select?",
        ideas: [{ labelUk: "вільне введення", labelEn: "free typing", anyOf: ["вільн", "free", "підказ", "suggest", "select"] }, { labelUk: "атрибут list", labelEn: "the list attribute", anyOf: ["list", "id", "datalist"] }, { labelUk: "серверна перевірка", labelEn: "a server check", anyOf: ["сервер", "server", "валід", "valid"] }],
        sampleUk: "datalist через list дає підказки, але дозволяє своє значення — на відміну від select; сервер усе одно перевіряє рядок, а великі списки краще шукати на сервері.",
        sampleEn: "A datalist via list gives suggestions but allows a custom value, unlike select; the server still validates the string, and large lists are better searched on the server.",
      })
  ],
  "css": [
      teachLesson({
        slug: "css-custom-props",
        titleUk: "CSS-змінні: токени теми й запас",
        titleEn: "CSS custom properties: theme tokens and a fallback",
        difficulty: 2,
        pointsUk: ["var(--token, fallback) читає змінну з запасом", "Змінні живуть у браузері й наслідуються", "Тема — зміна токенів на предку, не копія всіх правил"],
        pointsEn: ["var(--token, fallback) reads a variable with a fallback", "Variables live in the browser and inherit", "A theme is changing tokens on an ancestor, not a copy of every rule"],
        conceptUk: "Властивість --accent: #0a7 задають на :root або на компоненті, використовують як var(--accent, #0a7): другий аргумент — запас, якщо змінна не визначена. На відміну від препроцесорних $змінних, custom properties живуть у браузері й можуть змінюватись з JS або від батька (тема на .card[data-theme=dark]). Вони наслідуються, тому локальна --gap на контейнері змінює нащадків. Не зберігайте в них секрети. Для кольорів зручно тримати компоненти (oklch) окремими змінними й збирати в одному правилі.",
        conceptEn: "A --accent: #0a7 property is set on :root or on a component, and used as var(--accent, #0a7): the second argument is a fallback if the variable is undefined. Unlike preprocessor $variables, custom properties live in the browser and can change from JS or from a parent (a theme on .card[data-theme=dark]). They inherit, so a local --gap on a container changes descendants. Do not store secrets in them. For colours it is handy to keep components (oklch) as separate variables and assemble them in one rule.",
        code: ":root { --accent: oklch(0.7 0.12 250); }\n.button { background: var(--accent, navy); }",
        language: "css",
        retrieval: [
          { kind: "mcq", promptUk: "Чим --accent відрізняється від змінної Sass $accent?", promptEn: "How does --accent differ from a Sass $accent variable?", options: ["вона доступна в браузері під час виконання і може змінитись без перезбірки", "Sass змінні теж змінюються в браузері самі", "CSS-змінні існують лише під час компіляції", "вони повні синоніми"], correctIndex: 0, explanationUk: "Каскад і runtime, не препроцесор.", explanationEn: "Cascade and runtime, not a preprocessor." },
          { kind: "fill", promptUk: "Допишіть запасний колір", promptEn: "Fill in the fallback colour", language: "css", code: "color: var(--text, ___);", accepted: ["#111", "black", "#000"], caseSensitive: true, explanationUk: "Другий аргумент var — запас.", explanationEn: "The second argument of var is the fallback." },
          { kind: "read", promptUk: "Чому --gap на .grid змінює відступи дітей?", promptEn: "Why does --gap on .grid change the children's spacing?", language: "css", code: ".grid { --gap: 1rem; } .grid > * { margin: var(--gap); }", options: ["custom properties наслідуються вниз по дереву", "gap — зарезервоване ім'я і завжди 0", "діти не бачать змінних предка", "потрібен !important"], correctIndex: 0, explanationUk: "Наслідування — частина моделі.", explanationEn: "Inheritance is part of the model." }
        ],
        whyUk: "Як змінити тему картки без дублювання всіх правил кольору?",
        whyEn: "How do you change a card's theme without duplicating every colour rule?",
        ideas: [{ labelUk: "токени на предку", labelEn: "tokens on the ancestor", anyOf: ["токен", "token", "--", "тема", "theme", "предок"] }, { labelUk: "var із запасом", labelEn: "var with a fallback", anyOf: ["var", "fallback", "запас"] }, { labelUk: "runtime, не Sass", labelEn: "runtime, not Sass", anyOf: ["браузер", "browser", "sass", "насліду"] }],
        sampleUk: "Кольори збирають через var(--token, запас) і змінюють токени на предку теми; на відміну від Sass, змінні живуть у браузері й наслідуються нащадкам.",
        sampleEn: "Colours are assembled with var(--token, fallback) and you change tokens on a theme ancestor; unlike Sass, the variables live in the browser and inherit to descendants.",
      })
  ],
  "js": [
      teachLesson({
        slug: "js-optional-chaining-prog",
        titleUk: "Опціональний ланцюжок і значення за замовчуванням",
        titleEn: "Optional chaining and a default value",
        difficulty: 2,
        pointsUk: ["?. зупиняється на null/undefined і дає undefined", "?? підставляє запас лише для nullish, не для 0", "Не ховайте обов'язкові об'єкти під ?."],
        pointsEn: ["?. stops on null/undefined and yields undefined", "?? fills in a default only for nullish, not for 0", "Do not hide required objects behind ?."],
        conceptUk: "user?.address?.city читає city лише якщо user і address не null і не undefined; інакше вираз дає undefined і не кидає. Це зручно для відповіді API з пропущеними полями. Не ховайте ним логічні помилки («об'єкта не повинно не бути»). Для виклику: onSave?.(). Оператор ?? дає запас лише для null/undefined, на відміну від ||, який також замінить 0 і ''. Поєднання count = data?.n ?? 0 — типовий патерн. Не пишіть a?.b.c без ?. перед c, якщо b може бути відсутнім.",
        conceptEn: "user?.address?.city reads city only if user and address are not null or undefined; otherwise the expression is undefined and does not throw. That is convenient for an API response with missing fields. Do not use it to hide logic bugs ('the object should have been there'). For a call: onSave?.(). The ?? operator supplies a default only for null/undefined, unlike ||, which also replaces 0 and ''. The combination count = data?.n ?? 0 is a typical pattern. Do not write a?.b.c without ?. before c if b may be missing.",
        code: "const count = data?.n ?? 0;\nonReady?.();",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Чому n = data.n || 10 поганий, якщо n може бути 0?", promptEn: "Why is n = data.n || 10 a poor choice if n can be 0?", options: ["0 хибний, тож спрацює 10; ?? залишив би 0", "|| заборонений із числами", "?? теж замінює 0", "0 не є валідним JSON"], correctIndex: 0, explanationUk: "|| дивиться на truthiness, ?? — на nullish.", explanationEn: "|| looks at truthiness, ?? at nullish." },
          { kind: "fill", promptUk: "Допишіть безпечне читання вкладеного поля", promptEn: "Fill in a safe read of a nested field", language: "javascript", code: "const city = user___address___city;", accepted: ["?.", "?.address?."], caseSensitive: true, explanationUk: "Опціональний ланцюжок — ?.", explanationEn: "Optional chaining is ?." },
          { kind: "read", promptUk: "Що поверне цей вираз, якщо user дорівнює null?", promptEn: "What does this expression return if user is null?", language: "javascript", code: "user?.name", options: ["undefined, без винятку", "кидає TypeError", "порожній рядок", "null.name"], correctIndex: 0, explanationUk: "Ланцюжок коротко замикається.", explanationEn: "The chain short-circuits." }
        ],
        whyUk: "Коли поставити ??, а коли ||, після опціонального ланцюжка?",
        whyEn: "When should you use ??, and when ||, after optional chaining?",
        ideas: [{ labelUk: "нуль валідний", labelEn: "zero is valid", anyOf: ["0", "??", "nullish", "||", "хибн"] }, { labelUk: "коротке замикання", labelEn: "short-circuit", anyOf: ["?.", "undefined", "typeerror"] }, { labelUk: "не ховати обов'язкове", labelEn: "do not hide a required object", anyOf: ["обов'язков", "required", "ховат", "hide"] }],
        sampleUk: "Після ?. запас через ?? лишає валідний 0, тоді як || його замінить; ланцюжок не кидає на null, але обов'язковий об'єкт не варто ховати під ?.",
        sampleEn: "After ?., a default with ?? keeps a valid 0, whereas || replaces it; the chain does not throw on null, but a required object should not be hidden behind ?.",
      })
  ],
  "typescript": [
      teachLesson({
        slug: "ts-narrowing-in",
        titleUk: "Звуження: in, typeof і дискримінант",
        titleEn: "Narrowing: in, typeof, and a discriminant",
        difficulty: 2,
        pointsUk: ["typeof і in звужують об'єднання в гілці", "Дискримінант kind робить switch вичерпним", "as після успішного звуження лише ховає помилки"],
        pointsEn: ["typeof and in narrow a union in a branch", "A kind discriminant makes the switch exhaustive", "as after a successful narrowing only hides mistakes"],
        conceptUk: "У функції з аргументом string | number, typeof x === 'string' звужує x до рядка в цій гілці. Для об'єктів оператор in ('price' in offer) звужує до варіанта з цим полем, якщо типи розділені. Найчіткіший патерн — дискримінант: спільне поле kind: 'ok' | 'err', і switch (r.kind) відкриває data або message. Після звуження не пишіть as, якщо компілятор уже знає тип — as ховає помилку. function isErr(r): r is Err — предикат, що звужує після if (isErr(r)).",
        conceptEn: "In a function with a string | number argument, typeof x === 'string' narrows x to string in that branch. For objects the in operator ('price' in offer) narrows to the variant that has the field, if the types are separated. The clearest pattern is a discriminant: a shared kind: 'ok' | 'err' field, and switch (r.kind) opens data or message. After a narrowing, do not write as if the compiler already knows the type — as hides a mistake. function isErr(r): r is Err is a predicate that narrows after if (isErr(r)).",
        code: "type Result = { kind: 'ok'; data: User } | { kind: 'err'; message: string };\nfunction f(r: Result) { if (r.kind === 'ok') return r.data.name; }",
        language: "typescript",
        retrieval: [
          { kind: "mcq", promptUk: "Що дає поле kind: 'ok' | 'err' на результаті?", promptEn: "What does a kind: 'ok' | 'err' field on a result give you?", options: ["дискримінант, за яким TypeScript звужує інші поля в switch", "лише документацію без впливу на тип", "обов'язковий any", "вимкнення strict"], correctIndex: 0, explanationUk: "Спільне літеральне поле — класичний tagged union.", explanationEn: "A shared literal field is a classic tagged union." },
          { kind: "fill", promptUk: "Допишіть предикат звуження", promptEn: "Fill in a narrowing predicate", language: "typescript", code: "function isErr(r: Result): r ___ Err { return r.kind === 'err'; }", accepted: ["is"], caseSensitive: true, explanationUk: "Повернений тип — r is Err.", explanationEn: "The return type is r is Err." },
          { kind: "read", promptUk: "Чому as string тут зайвий і шкідливий?", promptEn: "Why is as string unnecessary and harmful here?", language: "typescript", code: "if (typeof x === 'string') { f(x as string); }", options: ["x уже звужений до string, as може сховати майбутню зміну типів", "as обов'язковий після typeof", "typeof не звужує", "f не приймає string"], correctIndex: 0, explanationUk: "Довіряйте звуженню.", explanationEn: "Trust the narrowing." }
        ],
        whyUk: "Як безпечно розкрити об'єднання успіх | помилка?",
        whyEn: "How do you safely unwrap a success | error union?",
        ideas: [{ labelUk: "дискримінант kind", labelEn: "a kind discriminant", anyOf: ["kind", "дискрим", "discrimin", "switch"] }, { labelUk: "typeof або in", labelEn: "typeof or in", anyOf: ["typeof", "in", "звужен", "narrow"] }, { labelUk: "без зайвого as", labelEn: "without a spare as", anyOf: ["as", "предикат", "predicate", "is"] }],
        sampleUk: "Об'єднання розкривають дискримінантом kind або typeof/in, предикати r is Err звужують після if, а as після вже успішного звуження лише ховає помилки.",
        sampleEn: "A union is unwrapped with a kind discriminant or typeof/in, r is Err predicates narrow after if, and as after a successful narrowing only hides mistakes.",
      })
  ],
  "react": [
      teachLesson({
        slug: "react-lists-stable-keys",
        titleUk: "Стабільні ключі списку, не індекс",
        titleEn: "Stable list keys, not the index",
        difficulty: 2,
        pointsUk: ["key — стабільний id з даних", "Індекс ламає стан при вставці й сорті", "Випадковий key перемонтовує щорендеру"],
        pointsEn: ["key is a stable id from the data", "An index breaks state on insert and sort", "A random key remounts every render"],
        conceptUk: "У map компонентів React key ідентифікує елемент між рендерами. Стабільний id з даних (user.id) зберігає стан поля вводу й фокус, коли список сортують або вставляють на початок. Індекс як key ламає це: після вставки першим усі поля «зсуваються» до інших записів. Не використовуйте Math.random() як key — кожен рендер монтує елементи наново. Ключ унікальний серед сиблінгів, не глобально. Якщо стабільного id немає, згенеруйте його один раз під час створення запису, не під час рендеру.",
        conceptEn: "In a map of React components, key identifies an element across renders. A stable id from the data (user.id) keeps input state and focus when the list is sorted or an item is inserted at the front. An index as key breaks this: after an insert at the front, every field 'slides' onto a different record. Do not use Math.random() as a key — every render remounts the elements. The key is unique among siblings, not globally. If there is no stable id, generate one once when the record is created, not during render.",
        code: "users.map((u) => <UserRow key={u.id} user={u} />)",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Що станеться зі станом інпутів, якщо key={i} і вставити елемент на початок?", promptEn: "What happens to input state if key={i} and you insert an item at the front?", options: ["значення поїдуть на інші рядки, бо індекси зсунулись", "React збереже стан за текстом інпуту завжди", "вставка заборонена", "ключі ігноруються для інпутів"], correctIndex: 0, explanationUk: "Ідентичність прив'язана до індексу, не до запису.", explanationEn: "Identity is bound to the index, not the record." },
          { kind: "fill", promptUk: "Допишіть стабільний ключ", promptEn: "Fill in a stable key", language: "javascript", code: "users.map(u => <Row ___={u.id} user={u} />)", accepted: ["key"], caseSensitive: true, explanationUk: "Проп — key={u.id}.", explanationEn: "The prop is key={u.id}." },
          { kind: "mcq", promptUk: "Чому key={Math.random()} шкідливий?", promptEn: "Why is key={Math.random()} harmful?", options: ["кожен рендер дає новий ключ і знімає стан компонента", "random робить список швидшим", "так рекомендує документація для списків без id", "це потрібно для гідратації"], correctIndex: 0, explanationUk: "Ключ має бути стабільним між рендерами.", explanationEn: "The key must be stable across renders." }
        ],
        whyUk: "Чому в списку користувачів ставлять key={user.id}, а не індекс?",
        whyEn: "Why does a user list use key={user.id}, not the index?",
        ideas: [{ labelUk: "стабільна ідентичність", labelEn: "stable identity", anyOf: ["стабіль", "stable", "id", "ключ", "key"] }, { labelUk: "стан полів", labelEn: "field state", anyOf: ["стан", "state", "інпут", "input", "фокус", "focus"] }, { labelUk: "не random", labelEn: "not random", anyOf: ["random", "індекс", "index", "вставк", "insert"] }],
        sampleUk: "Стабільний key з user.id зберігає стан і фокус при сорті й вставці; індекс зсуває стан на інші рядки, а випадковий key перемонтовує елементи щорендеру.",
        sampleEn: "A stable key from user.id keeps state and focus across sort and insert; an index slides state onto other rows, and a random key remounts elements every render.",
      })
  ],
  "git": [
      teachLesson({
        slug: "git-stash-wip",
        titleUk: "stash: тимчасово прибрати незавершене",
        titleEn: "stash: temporarily put unfinished work aside",
        difficulty: 2,
        pointsUk: ["stash ховає зміни, щоб чисто перемкнути гілку", "pop повертає й знімає запис, apply лишає", "Важливе краще WIP-комітити на гілці"],
        pointsEn: ["stash hides changes so you can switch branches cleanly", "pop restores and drops the entry, apply leaves it", "Important work is better as a WIP commit on a branch"],
        conceptUk: "git stash push -u зберігає робочі зміни (і з -u невідстежувані файли) і повертає дерево до HEAD, щоб перемкнути гілку або підтягнути rebase. git stash pop повертає зміни й знімає запис; apply лишає запис у стеку. Конфлікт під час pop розв'язують як звичайний merge. Не тримайте в stash єдину копію важливої роботи тижнями — зробіть WIP-коміт на гілці: його важче загубити. stash@{0} — останній запис; list показує повідомлення, якщо ви задали -m. stash не є бекапом сервера.",
        conceptEn: "git stash push -u saves working changes (and with -u untracked files) and returns the tree to HEAD, so you can switch branches or pull a rebase. git stash pop restores the changes and drops the entry; apply leaves the entry on the stack. A conflict during pop is resolved like a normal merge. Do not keep the only copy of important work in the stash for weeks — make a WIP commit on a branch: it is harder to lose. stash@{0} is the latest entry; list shows a message if you passed -m. The stash is not a server backup.",
        code: "git stash push -u -m 'wip: form validation'\n# ... switch, pull ...\ngit stash pop",
        language: "bash",
        retrieval: [
          { kind: "mcq", promptUk: "Чим stash pop відрізняється від stash apply?", promptEn: "How does stash pop differ from stash apply?", options: ["pop знімає запис зі стеку після успіху, apply лишає його", "apply завжди видаляє, pop — ні", "вони повні синоніми", "pop не може викликати конфлікт"], correctIndex: 0, explanationUk: "apply безпечніший, якщо хочете повторити ще раз.", explanationEn: "apply is safer if you want to try again." },
          { kind: "fill", promptUk: "Допишіть збереження включно з новими файлами", promptEn: "Fill in saving including new files", language: "bash", code: "git stash push ___ -m 'wip form'", accepted: ["-u", "--include-untracked"], caseSensitive: true, explanationUk: "-u додає невідстежувані.", explanationEn: "-u includes untracked files." },
          { kind: "mcq", promptUk: "Чому не варто тримати єдину копію тижневої фічі лише в stash?", promptEn: "Why should you not keep the only copy of a week-long feature only in the stash?", options: ["запис легко згубити (drop, clear), гілка з WIP-комітом видиміша", "stash шифрує й не відновлюється", "pop заборонений після тижня", "сервер сам зберігає stash"], correctIndex: 0, explanationUk: "Гілка — повноцінна історія.", explanationEn: "A branch is a full history." }
        ],
        whyUk: "Коли stash доречний, а коли краще WIP-коміт?",
        whyEn: "When is stash appropriate, and when is a WIP commit better?",
        ideas: [{ labelUk: "коротке перемикання", labelEn: "a short switch", anyOf: ["stash", "гілк", "branch", "перемкн", "switch"] }, { labelUk: "pop чи apply", labelEn: "pop or apply", anyOf: ["pop", "apply", "конфлікт", "conflict"] }, { labelUk: "довге — коміт", labelEn: "long work — a commit", anyOf: ["wip", "коміт", "commit", "тижн", "week", "згубит"] }],
        sampleUk: "stash зручний, щоб на хвилину чисто перемкнути гілку; pop знімає запис, apply лишає; тижневу роботу краще комітити WIP на гілці, бо stash легко згубити.",
        sampleEn: "stash is convenient for a clean branch switch for a minute; pop drops the entry, apply leaves it; a week of work is better as a WIP commit on a branch, because a stash is easy to lose.",
      })
  ],
  "node": [
      teachLesson({
        slug: "node-url-path",
        titleUk: "path і fileURLToPath: шляхи без сюрпризів ESM",
        titleEn: "path and fileURLToPath: paths without ESM surprises",
        difficulty: 2,
        pointsUk: ["join збирає шлях, не ручна конкатенація", "В ESM __dirname замінюють через import.meta.url", "resolve залежить від cwd, не від теки файлу"],
        pointsEn: ["join builds the path, not manual concatenation", "In ESM, __dirname is replaced via import.meta.url", "resolve depends on cwd, not on the file's folder"],
        conceptUk: "path.join('a', 'b', 'c.txt') збирає шлях із правильним роздільником ОС; path.posix.join — завжди з /. Не склеюйте рядки через + '\\\\'. У ESM немає __dirname: беруть fileURLToPath(new URL('.', import.meta.url)). path.resolve відносний до process.cwd(), не до файлу модуля — типова помилка в скриптах, запущених з іншої теки. path.basename і extname розбирають ім'я; для URL (https://) використовуйте URL, не path. Перевіряйте, що користувацький шлях не виходить за корінь (path.normalize і префікс).",
        conceptEn: "path.join('a', 'b', 'c.txt') builds a path with the correct OS separator; path.posix.join always uses /. Do not concatenate strings with + '\\\\'. In ESM there is no __dirname: you take fileURLToPath(new URL('.', import.meta.url)). path.resolve is relative to process.cwd(), not to the module file — a typical bug in scripts launched from another folder. path.basename and extname parse the name; for URLs (https://) use URL, not path. Check that a user-supplied path does not escape the root (path.normalize and a prefix).",
        code: "import { fileURLToPath } from 'node:url';\nimport { join } from 'node:path';\nconst dir = fileURLToPath(new URL('.', import.meta.url));\nconst f = join(dir, 'data.json');",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Чому path.resolve('data.json') може не знайти файл поруч із модулем?", promptEn: "Why may path.resolve('data.json') not find a file next to the module?", options: ["resolve рахує від process.cwd(), а запускають скрипт з іншої теки", "resolve заборонений в ESM", "data.json не можна читати з Node", "join тоді обов'язковий замість існування файлу"], correctIndex: 0, explanationUk: "Бери шлях від import.meta.url.", explanationEn: "Take the path from import.meta.url." },
          { kind: "fill", promptUk: "Допишіть теку модуля в ESM", promptEn: "Fill in the module folder in ESM", language: "javascript", code: "import { fileURLToPath } from 'node:url';\nconst dir = fileURLToPath(new URL('.', import.___.url));", accepted: ["meta"], caseSensitive: true, explanationUk: "import.meta.url — URL поточного модуля.", explanationEn: "import.meta.url is the current module's URL." },
          { kind: "read", promptUk: "Чим небезпечний join(root, userPath) без перевірки, якщо userPath = '../../etc/passwd'?", promptEn: "Why is join(root, userPath) dangerous without a check if userPath is '../../etc/passwd'?", language: "javascript", code: "path.join('/var/app', '../../etc/passwd')", options: ["можна вийти за корінь застосунку (path traversal)", "join відкидає .. завжди", "passwd не існує на Linux", "join працює лише з URL"], correctIndex: 0, explanationUk: "Нормалізуйте й перевірте префікс кореня.", explanationEn: "Normalize and check the root prefix." }
        ],
        whyUk: "Як у ESM прочитати файл, що лежить поруч із модулем?",
        whyEn: "How do you, in ESM, read a file that sits next to the module?",
        ideas: [{ labelUk: "import.meta.url", labelEn: "import.meta.url", anyOf: ["import.meta", "fileurl", "__dirname", "esm"] }, { labelUk: "не cwd", labelEn: "not cwd", anyOf: ["cwd", "resolve", "теки", "folder"] }, { labelUk: "join і traversal", labelEn: "join and traversal", anyOf: ["join", "traversal", "..", "корінь", "root"] }],
        sampleUk: "У ESM теку беруть через fileURLToPath(import.meta.url), бо resolve йде від cwd; join з користувацьким шляхом перевіряють на вихід за корінь.",
        sampleEn: "In ESM you take the folder via fileURLToPath(import.meta.url), because resolve starts at cwd; a join with a user path is checked for escaping the root.",
      })
  ],
  "express": [
      teachLesson({
        slug: "express-query-validation",
        titleUk: "Валідація query й params до бізнес-логіки",
        titleEn: "Validating query and params before business logic",
        difficulty: 2,
        pointsUk: ["query і params — рядки, їх парсять і валідують", "Невдала схема — 400, не 500 у бізнес-коді", "Не довіряйте лише перевірці на клієнті"],
        pointsEn: ["query and params are strings; they are parsed and validated", "A failed schema is 400, not a 500 in business code", "Do not trust a client-only check"],
        conceptUk: "req.query і req.params — рядки з URL, навіть коли ви чекаєте число. Передавати їх у SQL або в Number без перевірки — джерело NaN, ін'єкцій і 500. Валідатор (zod, valibot) на початку маршруту парсить, ставить типи й відповідає 400 з зрозумілим тілом, якщо схема не збіглась. Обмежуйте довжину рядків і діапазон page. Не довіряйте, що «фронтенд уже перевірив». Після успіху працюйте з розпарсеним об'єктом, не з сирим req.query. Для UUID перевіряйте формат, не лише «непорожньо».",
        conceptEn: "req.query and req.params are strings from the URL, even when you expected a number. Passing them into SQL or Number without a check is a source of NaN, injection, and 500s. A validator (zod, valibot) at the start of the route parses, applies types, and responds 400 with a clear body if the schema does not match. Cap string length and the page range. Do not trust that 'the frontend already checked'. After success, work with the parsed object, not raw req.query. For a UUID, check the format, not only 'not empty'.",
        code: "const Query = z.object({ page: z.coerce.number().int().min(1).max(100) });\nconst q = Query.parse(req.query);",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Що повернути, якщо page=abc не проходить схему числа?", promptEn: "What should you return if page=abc fails a number schema?", options: ["400 з описом поля, не 500 після NaN у SQL", "200 з порожнім списком завжди", "301 на головну", "500 обов'язково, бо це вина сервера"], correctIndex: 0, explanationUk: "Помилка клієнта — 4xx.", explanationEn: "A client error is 4xx." },
          { kind: "fill", promptUk: "Допишіть розбір query через схему", promptEn: "Fill in parsing query through a schema", language: "javascript", code: "const q = querySchema.___(req.query);", accepted: ["parse", "safeParse"], caseSensitive: true, explanationUk: "parse кидає, safeParse повертає результат.", explanationEn: "parse throws, safeParse returns a result." },
          { kind: "read", promptUk: "Чому Number(req.query.limit) без меж небезпечний?", promptEn: "Why is Number(req.query.limit) without bounds dangerous?", language: "javascript", code: "db.list({ limit: Number(req.query.limit) })", options: ["можна передати NaN, від'ємне або мільярд і покласти БД", "Number завжди дає 10", "query не може бути рядком", "ліміт ігнорує БД"], correctIndex: 0, explanationUk: "Схема з min/max.", explanationEn: "A schema with min/max." }
        ],
        whyUk: "Де в маршруті Express має стояти перевірка query?",
        whyEn: "Where in an Express route should query checking sit?",
        ideas: [{ labelUk: "на вході, до БД", labelEn: "at the entrance, before the DB", anyOf: ["схем", "schema", "zod", "початку", "start", "бд", "db"] }, { labelUk: "400 не 500", labelEn: "400 not 500", anyOf: ["400", "500", "nan"] }, { labelUk: "не лише фронтенд", labelEn: "not the frontend alone", anyOf: ["фронтенд", "frontend", "довіра", "trust"] }],
        sampleUk: "Схему query і params застосовують на вході маршруту, на помилку відповідають 400, а в БД ідуть уже розпарсені й обмежені значення — перевірка лише на фронтенді недостатня.",
        sampleEn: "A schema for query and params is applied at the route entrance, failures return 400, and the DB receives already parsed and bounded values — a frontend-only check is not enough.",
      })
  ],
  "sql": [
      teachLesson({
        slug: "sql-three-valued",
        titleUk: "Тризначна логіка: NULL і WHERE",
        titleEn: "Three-valued logic: NULL and WHERE",
        difficulty: 2,
        pointsUk: ["Порівняння з NULL — UNKNOWN, у WHERE це відкидає рядок", "IS NULL, не = NULL", "NOT IN із NULL у списку — небезпечна пастка"],
        pointsEn: ["A comparison with NULL is UNKNOWN; in WHERE that drops the row", "IS NULL, not = NULL", "NOT IN with a NULL in the list is a dangerous trap"],
        conceptUk: "У SQL порівняння з NULL дає UNKNOWN, не TRUE і не FALSE. WHERE col = NULL не відбирає рядки; пишуть col IS NULL. WHERE col <> 1 також не включає рядки, де col NULL, бо UNKNOWN відкидається. AND/OR з UNKNOWN дають таблицю істин Кліні: TRUE OR UNKNOWN — TRUE, TRUE AND UNKNOWN — UNKNOWN. COALESCE(col, 0) підставляє запас, але змінює семантику «невідомо». NOT IN (підзапит із NULL) може повернути порожньо — типова пастка. У CHECK умова UNKNOWN вважається виконаною (рядок дозволено).",
        conceptEn: "In SQL, a comparison with NULL yields UNKNOWN, not TRUE and not FALSE. WHERE col = NULL selects no rows; you write col IS NULL. WHERE col <> 1 also excludes rows where col is NULL, because UNKNOWN is discarded. AND/OR with UNKNOWN follow Kleene's table: TRUE OR UNKNOWN is TRUE, TRUE AND UNKNOWN is UNKNOWN. COALESCE(col, 0) supplies a default but changes the 'unknown' semantics. NOT IN (a subquery that contains NULL) may return empty — a typical trap. In a CHECK, UNKNOWN is treated as success (the row is allowed).",
        code: "SELECT * FROM tickets WHERE status IS NULL OR status <> 'closed';",
        language: "sql",
        retrieval: [
          { kind: "mcq", promptUk: "Чому WHERE status = NULL не знаходить рядки з порожнім статусом?", promptEn: "Why does WHERE status = NULL not find rows with an empty status?", options: ["= NULL дає UNKNOWN, а WHERE лишає лише TRUE", "NULL дорівнює NULL у WHERE", "= заборонений для статусу", "порожній статус — це порожній рядок, не NULL"], correctIndex: 0, explanationUk: "Пишіть IS NULL.", explanationEn: "Write IS NULL." },
          { kind: "fill", promptUk: "Допишіть перевірку на відсутнє значення", promptEn: "Fill in a check for a missing value", language: "sql", code: "WHERE status ___ NULL", accepted: ["IS", "is"], caseSensitive: true, explanationUk: "Предикат — IS NULL.", explanationEn: "The predicate is IS NULL." },
          { kind: "read", promptUk: "Що може повернути NOT IN (1, 2, NULL)?", promptEn: "What may NOT IN (1, 2, NULL) return?", language: "sql", code: "SELECT * FROM t WHERE id NOT IN (1, 2, NULL)", options: ["часто жодного рядка, бо порівняння з NULL невідоме", "усі рядки крім 1 і 2 завжди", "помилку компіляції завжди", "лише рядки з id NULL"], correctIndex: 0, explanationUk: "Краще NOT EXISTS або фільтр без NULL.", explanationEn: "Prefer NOT EXISTS, or a filter without NULL." }
        ],
        whyUk: "Чому рядок із NULL у status зникає з WHERE status <> 'closed'?",
        whyEn: "Why does a row with NULL in status disappear from WHERE status <> 'closed'?",
        ideas: [{ labelUk: "UNKNOWN у WHERE", labelEn: "UNKNOWN in WHERE", anyOf: ["unknown", "null", "where", "true"] }, { labelUk: "IS NULL", labelEn: "IS NULL", anyOf: ["is null", "= null"] }, { labelUk: "пастка NOT IN", labelEn: "the NOT IN trap", anyOf: ["not in", "exists", "підзапит", "subquery"] }],
        sampleUk: "Порівняння з NULL дає UNKNOWN, і WHERE відкидає такий рядок, тому пишуть IS NULL; NOT IN зі списком, що містить NULL, теж може повернути порожній результат.",
        sampleEn: "A comparison with NULL is UNKNOWN, and WHERE drops that row, so you write IS NULL; NOT IN with a list that contains NULL may also return an empty result.",
      })
  ],
  "qa": [
      teachLesson({
        slug: "qa-exploratory-note",
        titleUk: "Нотатка дослідницької сесії як артефакт",
        titleEn: "An exploratory session note as an artefact",
        difficulty: 2,
        pointsUk: ["Нотатка: чартер, спроби, баги, питання, ідеї на автоматизацію", "Це артефакт команди, не загублений чат", "Порожній список багів усе одно фіксує покриті зони"],
        pointsEn: ["The note: charter, attempts, bugs, questions, automation ideas", "It is a team artefact, not a lost chat", "An empty bug list still records covered zones"],
        conceptUk: "Після дослідницької сесії лишають коротку нотатку: чартер, що спробували, що дивно, баги з кроками відтворення, питання до продукту, що автоматизувати. Це артефакт команди, не особистий чернетка, яку загублять у чаті. Структура важливіша за обсяг: одна сторінка краще за хаотичний запис на годину. Скріншоти й логи додають до багів, не замість опису. Нотатка допомагає наступній сесії не повторювати те саме. Якщо нічого не знайшли — це теж результат: запишіть покриті зони, щоб не вважати їх «недоторканими».",
        conceptEn: "After an exploratory session you leave a short note: the charter, what was tried, what looked odd, bugs with reproduction steps, product questions, what to automate. This is a team artefact, not a private draft that will be lost in chat. Structure matters more than volume: one page is better than a chaotic hour-long recording. Screenshots and logs go with the bugs, not instead of a description. The note helps the next session avoid repeating the same work. If you found nothing — that is also a result: write down the zones you covered, so they are not treated as 'untouched'.",
        code: "// Session note: charter, timebox, tried, oddities, bugs (repro), questions, automate next",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Що записати, якщо за 60 хвилин багів не знайшли?", promptEn: "What should you write down if a 60-minute session found no bugs?", options: ["покриті зони, що саме спробували, щоб наступна сесія пішла далі", "нічого: порожня сесія не має артефакта", "лише «все ок» без деталей", "скріншот зеленого CI замість нотатки"], correctIndex: 0, explanationUk: "Покриття теж інформація.", explanationEn: "Coverage is information too." },
          { kind: "fill", promptUk: "Допишіть обов'язкову частину запису бага", promptEn: "Fill in a required part of a bug record", language: "javascript", code: "// bug: title + ___ steps + expected vs actual", accepted: ["repro", "reproduction", "repro"], caseSensitive: true, explanationUk: "Кроки відтворення.", explanationEn: "Reproduction steps." },
          { kind: "mcq", promptUk: "Чому нотатка в особистому чаті з собою — слабкий артефакт?", promptEn: "Why is a note in a personal chat with yourself a weak artefact?", options: ["команда її не знайде, сесія не передається", "чати заборонені в QA", "нотатки мають бути лише в коді", "чат автоматично стає тест-кейсом"], correctIndex: 0, explanationUk: "Артефакт живе там, де його шукають колеги.", explanationEn: "The artefact lives where colleagues will look." }
        ],
        whyUk: "Які розділи має мати нотатка після сесії на чекауті?",
        whyEn: "Which sections should a note after a checkout session have?",
        ideas: [{ labelUk: "чартер і спроби", labelEn: "charter and attempts", anyOf: ["чартер", "charter", "спроб", "tried", "зони", "zones"] }, { labelUk: "баги з кроками", labelEn: "bugs with steps", anyOf: ["repro", "крок", "steps", "очікуван", "expected"] }, { labelUk: "видимий артефакт", labelEn: "a visible artefact", anyOf: ["команд", "team", "чат", "chat", "автомат"] }],
        sampleUk: "Нотатка тримає чартер, що спробували, баги з кроками відтворення й ідеї на автоматизацію в місці, де команда це знайде; навіть без багів записують покриті зони.",
        sampleEn: "The note holds the charter, what was tried, bugs with reproduction steps, and automation ideas in a place the team will find; even with no bugs you record covered zones.",
      })
  ]
};

export function expandProgramming(course: CourseContent): CourseContent {
  return expandCourse(course, insertions, newUnits);
}
