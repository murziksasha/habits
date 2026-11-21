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

const intro = unit("intro", "React intro", "React intro", [
  lesson(
    "rf-what",
    "Що таке React",
    "What is React",
    1,
    true,
    [
      concept("rf-what-concept", "Компоненти описують інтерфейс", "Components describe the interface", {
        uk: "React допомагає будувати інтерфейс із компонентів. Компонент отримує props і може мати стан; під час рендеру він обчислює опис UI з поточних даних. React може повторно викликати компонент і застосовує потрібні зміни до інтерфейсу; повторний рендер не означає, що весь DOM буде перебудовано. Рендер має залишатися чистим: побічні дії, як-от відправлення запиту після натискання, виконують в обробнику події або, коли потрібна синхронізація із зовнішньою системою, в effect.",
        en: "React helps build an interface from components. A component receives props and may have state; during render it calculates a UI description from current data. React may call the component again and apply necessary interface changes; a re-render does not mean the whole DOM is rebuilt. Keep rendering pure: perform side effects such as a request triggered by a click in an event handler, or in an effect when synchronizing with an external system.",
      }),
      { ...mcq(
        "rf-i1",
        "React — це:",
        "React is:",
        ["бібліотека для UI (компоненти)", "SQL ORM", "CSS framework", "OS kernel"],
        0,
      ), optionsEn: ["A UI library based on components", "A SQL ORM", "A CSS framework", "An OS kernel"] },
      { ...mcq(
        "rf-i2",
        "Основна ідея:",
        "Core idea:",
        ["UI = f(state) через компоненти", "тільки jQuery selectors", "тільки SSR without components", "PHP templates only"],
        0,
      ), optionsEn: ["UI is described from state through components", "Only jQuery selectors", "Only SSR without components", "Only PHP templates"] },
      codeFill("rf-i3", "import React", "import React", "tsx", "import { useState } from '___';", ["react"], true),
    ],
  ),
  lesson(
    "rf-jsx",
    "JSX basics",
    "JSX basics",
    1,
    true,
    [
      concept("rf-jsx-concept", "Розмітка в JavaScript", "Markup in JavaScript", {
        uk: "JSX — синтаксис для опису React-елементів. JavaScript-вирази записують у фігурних дужках, а CSS-клас задають через className; наприклад, <p className=\"greeting\">{name}</p>. Сусідні JSX-елементи в одному виразі можна об'єднати фрагментом <>...</>, який не додає окремого DOM-вузла. У фігурних дужках потрібен вираз, а не оператор if; умовний вигляд можна обчислити до return або через тернарний вираз.",
        en: "JSX is syntax for describing React elements. Put JavaScript expressions in braces and specify a CSS class with className; for example, <p className=\"greeting\">{name}</p>. Adjacent JSX elements in one expression can be wrapped in a fragment <>...</>, which does not add a separate DOM node. Braces require an expression, not an if statement; calculate conditional content before return or use a conditional expression.",
      }),
      { ...mcq(
        "rf-i4",
        "JSX виглядає як:",
        "JSX looks like:",
        ["HTML-подібний синтаксис у JS", "чистий CSS", "SQL", "YAML only"],
        0,
      ), optionsEn: ["HTML-like syntax in JavaScript", "Pure CSS", "SQL", "Only YAML"] },
      codeFill("rf-i5", "className", "className", "tsx", "<div ___=\"card\">", ["className"], true),
      { ...codeRead(
        "rf-i6",
        "Чи коректно об'єднано сусідні JSX-елементи в цьому return?",
        "Are the adjacent JSX elements correctly grouped in this return?",
        "tsx",
        "return (<><h1>A</h1><p>B</p></>);",
        ["Коректно: фрагмент об’єднує сусідні елементи", "Завжди некоректно", "Потрібна таблиця", "Потрібен CSS"],
        0,
      ) as Extract<Exercise, { type: "code_read" }>, optionsEn: ["Valid: a fragment wraps adjacent elements", "Always illegal", "Requires a table", "Requires CSS"] },
    ],
  ),
  exam("rf-intro-exam", "Контрольна: intro", "Exam: intro", 1, [
    { ...mcq("rf-ie1", "Що таке React?", "What is React?", ["Бібліотека для інтерфейсів", "База даних", "CDN", "IDE"], 0), optionsEn: ["A UI library", "A database", "A CDN", "An IDE"] },
    codeFill("rf-ie2", "from react", "from react", "tsx", "import { useState } from '___';", ["react"], true),
    codeFill("rf-ie3", "className", "className", "tsx", "<p ___=\"t\">", ["className"], true),
    { ...mcq("rf-ie4", "Що таке JSX?", "What is JSX?", ["Синтаксис для опису елементів", "Діалект SQL", "Метод HTTP", "Команда Git"], 0), optionsEn: ["Syntax for describing elements", "A SQL dialect", "An HTTP method", "A Git command"] },
  ]),
]);

const components = unit("components", "Components", "Components", [
  lesson(
    "rf-fn-comp",
    "Function components",
    "Function components",
    2,
    false,
    [
      concept("rf-fn-comp-concept", "Функція як компонент", "A function as a component", {
        uk: "Функціональний React-компонент повертає опис інтерфейсу. У JSX назва локального компонента починається з великої літери: <Profile /> позначає компонент, а <profile /> — вбудований або користувацький DOM-елемент. Використовуйте <Profile />, а не викликайте Profile() як звичайну функцію: React має керувати ідентичністю компонента та його хуками.",
        en: "A React function component returns a UI description. In JSX a local component name starts with a capital: <Profile /> refers to a component, while <profile /> refers to a built-in or custom DOM element. Use <Profile /> instead of calling Profile() as an ordinary function: React needs to manage component identity and its Hooks.",
      }),
      codeFill(
        "rf-c1",
        "export function",
        "export function",
        "tsx",
        "export ___ Hello() { return <h1>Hi</h1>; }",
        ["function"],
        true,
      ),
      { ...mcq(
        "rf-c2",
        "Який стиль назви зазвичай використовують для React-компонента?",
        "Component name convention:",
        ["PascalCase", "snake_case only", "kebab-case required", "ALLCAPS"],
        0,
      ), optionsEn: ["PascalCase", "Only snake_case", "Required kebab-case", "ALLCAPS"] },
      codeOrder(
        "rf-c3",
        "Simple component",
        "Simple component",
        "tsx",
        ["}", "export function Title() {", "return <h1>EduForge</h1>;"],
        ["export function Title() {", "return <h1>EduForge</h1>;", "}"],
      ),
    ],
  ),
  lesson(
    "rf-props",
    "Props",
    "Props",
    2,
    false,
    [
      concept("rf-props-concept", "Вхідні дані компонента", "Component inputs", {
        uk: "Props передають дані від батьківського компонента до дочірнього. Компонент читає їх як незмінні вхідні значення; якщо дані мають змінюватися, власник стану передає нові props та за потреби обробник події. Наприклад, дочірня кнопка викликає onSelect(id), а батьківський компонент оновлює стан. Не мутуйте об'єкти props: створюйте нове значення у власника стану. Деструктуризація лише змінює спосіб читання props.",
        en: "Props pass data from a parent component to a child. Treat them as read-only inputs; when data needs to change, the state owner passes new props and, when needed, an event handler. For example, a child button calls onSelect(id), and the parent updates its state. Do not mutate prop objects: create a new value in the state owner. Destructuring only changes how props are read.",
      }),
      { ...mcq(
        "rf-c4",
        "Props — це:",
        "Props are:",
        ["вхідні дані компонента (read-only)", "local mutable state only", "CSS files", "SQL rows"],
        0,
      ), optionsEn: ["Read-only inputs to a component", "Only local mutable state", "CSS files", "SQL rows"] },
      codeFill(
        "rf-c5",
        "props.name",
        "props.name",
        "tsx",
        "function Hi(props: { name: string }) { return <p>{props.___}</p>; }",
        ["name"],
        true,
      ),
      codeFill(
        "rf-c6",
        "destructure props",
        "destructure props",
        "tsx",
        "function Hi({ ___ }: { name: string }) { return <p>{name}</p>; }",
        ["name"],
        true,
      ),
    ],
  ),
  exam("rf-comp-exam", "Контрольна: components", "Exam: components", 2, [
    { ...mcq("rf-ce1", "Що таке props?", "What are props?", ["Вхідні дані компонента", "Глобальні стилі", "Ключі бази даних", "Порти"], 0), optionsEn: ["Component inputs", "Global CSS", "Database keys", "Ports"] },
    codeFill("rf-ce2", "function component", "function component", "tsx", "export ___ Card() { return null; }", ["function"], true),
    { ...mcq("rf-ce3", "Для чого використовують PascalCase у JSX?", "What uses PascalCase in JSX?", ["Назви компонентів", "Лише CSS", "Лише таблиці SQL", "Лише змінні середовища"], 0), optionsEn: ["Component names", "Only CSS", "Only SQL tables", "Only environment variables"] },
    codeFill("rf-ce4", "props field", "props field", "tsx", "function A({ title }: { title: string }) { return <h1>{___}</h1>; }", ["title"], true),
  ]),
]);

const stateU = unit("state", "State", "State", [
  lesson(
    "rf-useState",
    "useState",
    "useState",
    2,
    false,
    [
      concept("rf-useState-concept", "Стан як знімок рендеру", "State as a render snapshot", {
        uk: "useState повертає поточне значення й функцію оновлення. Виклик setter ставить зміну в чергу; поточний обробник усе ще бачить знімок значення свого рендеру. Якщо n дорівнює 0, два виклики setN(n + 1) в одному обробнику ставлять у чергу значення 1, а два setN(prev => prev + 1) послідовно застосовують обидва оновлення і дають 2. Об'єкти й масиви стану не мутуйте: створюйте нове значення перед передаванням setter.",
        en: "useState returns the current value and a setter. Calling the setter queues an update; the current handler still sees the snapshot from its render. If n is 0, two setN(n + 1) calls in one handler queue the value 1, while two setN(prev => prev + 1) calls apply both updates in order and yield 2. Do not mutate state objects or arrays: create a new value before passing it to the setter.",
      }),
      codeFill(
        "rf-s1",
        "useState import usage",
        "useState import usage",
        "tsx",
        "const [n, setN] = ___(0);",
        ["useState"],
        true,
      ),
      { ...mcq(
        "rf-s2",
        "Що робить функція оновлення стану?",
        "What does a state setter do?",
        ["Ставить оновлення стану в чергу для наступного рендеру", "Лише синхронно змінює DOM", "Оновлює SQL", "Створює коміт Git"],
        0,
      ), optionsEn: ["Queues a state update for a subsequent render", "Only mutates the DOM synchronously", "Updates SQL", "Creates a Git commit"] },
      { ...codeRead(
        "rf-s3",
        "Як працює це оновлення?",
        "How does this update work?",
        "tsx",
        "setN(n => n + 1)",
        ["Функція отримує попередній стан і повертає наступний", "Некоректний синтаксис", "Потрібен клас", "Потрібен Redux"],
        0,
      ) as Extract<Exercise, { type: "code_read" }>, optionsEn: ["Valid functional update using the previous state", "Invalid", "Requires a class", "Requires Redux"] },
    ],
  ),
  lesson(
    "rf-events",
    "Events",
    "Events",
    2,
    false,
    [
      concept("rf-events-concept", "Події та обробники", "Events and handlers", {
        uk: "Передавайте функцію в onClick, а не результат її негайного виклику: onClick={save} або onClick={() => save(id)}. У відповідь на дію обробник може поставити оновлення стану в чергу. React надає об'єкт події з інтерфейсом, подібним до браузерного. Кнопці всередині форми задайте type=\"button\", якщо вона не має надсилати форму.",
        en: "Pass a function to onClick rather than the result of calling it immediately: onClick={save} or onClick={() => save(id)}. An event handler can queue a state update in response to an action. React provides an event object with an interface similar to the browser event. Give a button inside a form type=\"button\" when it should not submit the form.",
      }),
      codeFill(
        "rf-s4",
        "onClick",
        "onClick",
        "tsx",
        "<button type=\"button\" ___={() => setN(prev => prev + 1)}>Inc</button>",
        ["onClick"],
        true,
      ),
      { ...mcq(
        "rf-s5",
        "Synthetic events:",
        "Synthetic events:",
        ["React надає об’єкт події навколо браузерної події", "Лише нативні події без React", "Тригери SQL", "Кадри WebSocket"],
        0,
      ), optionsEn: ["React provides an event object around browser events", "Only native events without React", "SQL triggers", "WebSocket frames"] },
    ],
  ),
  exam("rf-state-exam", "Контрольна: state", "Exam: state", 2, [
    codeFill("rf-se1", "useState", "useState", "tsx", "const [x, setX] = ___(false);", ["useState"], true),
    codeFill("rf-se2", "onClick", "onClick", "tsx", "<button ___={fn}>", ["onClick"], true),
    { ...mcq("rf-se3", "Що зазвичай робить оновлення стану?", "What does a state update usually trigger?", ["Новий рендер компонента", "Завжди повне перезавантаження сторінки", "Дамп SQL", "Очищення DNS"], 0), optionsEn: ["A new component render", "Always a full page reload", "A SQL dump", "A DNS flush"] },
    { ...mcq("rf-se4", "Чим props відрізняються від state?", "How do props differ from state?", ["Props надходять як входи; стан належить компоненту або його власнику", "Вони завжди однакові", "Стан ніколи не буває локальним", "Дочірній компонент має змінювати props"], 0), optionsEn: ["Props are inputs; state is owned by a component or its owner", "They are always identical", "State is never local", "A child should mutate props"] },
  ]),
]);

const lists = unit("lists", "Lists & keys", "Lists & keys", [
  lesson(
    "rf-map",
    "Rendering lists",
    "Rendering lists",
    2,
    false,
    [
      concept("rf-map-concept", "Стабільна ідентичність елементів", "Stable item identity", {
        uk: "Масив даних можна перетворити на JSX через map. Ключ має бути стабільним і унікальним серед сусідів, наприклад ID запису. Індекс як ключ небезпечний при додаванні, видаленні чи перестановці: React може зберегти стан за позицією іншого елемента. key використовується React і не передається компоненту як звичайний prop; якщо Row потрібен ID, передайте його окремо: <Row key={item.id} id={item.id} />.",
        en: "Use map to turn data into JSX. A key should be stable and unique among siblings, such as a record ID. Index keys are risky when inserting, deleting, or reordering: React can associate state with a different item at the same position. React uses key itself and does not pass it as an ordinary prop; if Row needs the ID, pass it separately: <Row key={item.id} id={item.id} />.",
      }),
      codeFill(
        "rf-l1",
        "map items",
        "map items",
        "tsx",
        "items.___(x => <li key={x.id}>{x.name}</li>)",
        ["map"],
        true,
      ),
      { ...mcq(
        "rf-l2",
        "key prop потрібен для:",
        "key prop is for:",
        ["стабільної ідентифікації елементів у reconciliation", "CSS only", "SEO only", "HTTP cache only"],
        0,
      ), optionsEn: ["Stable identification of siblings during reconciliation", "Only CSS", "Only SEO", "Only HTTP caching"] },
      { ...codeRead(
        "rf-l3",
        "key={index} — ризик?",
        "key={index} risk?",
        "tsx",
        "list.map((x, i) => <Row key={i} />)",
        ["При перестановці чи вставці стан може перейти до іншого елемента", "Завжди ідеально", "Некоректний синтаксис", "Потрібен клас"],
        0,
      ) as Extract<Exercise, { type: "code_read" }>, optionsEn: ["Reordering or insertion can associate state with the wrong item", "Always ideal", "Illegal syntax", "Requires a class"] },
    ],
  ),
  exam("rf-lists-exam", "Контрольна: lists", "Exam: lists", 2, [
    codeFill("rf-le1", "map", "map", "tsx", "xs.___(…)", ["map"], true),
    { ...mcq("rf-le2", "Яким має бути key у списку?", "What should a list key be?", ["Стабільним і унікальним серед сусідніх елементів", "Новим випадковим значенням на кожному рендері", "Завжди відсутнім", "CSS-класом"], 0), optionsEn: ["Stable and unique among siblings", "A new random value on every render", "Always missing", "A CSS class"] },
    { ...mcq("rf-le3", "Що може статися без відповідних ключів?", "What can happen without appropriate keys?", ["Попередження та неправильне зіставлення стану елементів при змінах списку", "Завжди швидший рендер", "JSX не існує", "Сервер завжди падає"], 0), optionsEn: ["Warnings and incorrect association of item state when the list changes", "Always faster rendering", "JSX cannot exist", "The server always crashes"] },
    codeFill("rf-le4", "key attr", "key attr", "tsx", "<Item ___={id} />", ["key"], true),
  ]),
]);

const effects = unit("effects", "Effects", "Effects", [
  lesson(
    "rf-useEffect",
    "useEffect intro",
    "useEffect intro",
    3,
    false,
    [
      concept("rf-useEffect-concept", "Синхронізація із зовнішньою системою", "Synchronizing with an external system", {
        uk: "Ефект запускає налаштування після рендеру, коли потрібно синхронізувати компонент із зовнішньою системою. Повернута функція очищення скасовує попереднє налаштування перед повторним запуском і під час демонтування. У Strict Mode розробки React може додатково виконати цикл setup–cleanup–setup; не покладайтеся на твердження «рівно один раз».",
        en: "An effect sets up synchronization with an external system after rendering. A returned cleanup function undoes the prior setup before reruns and on unmount. In development Strict Mode, React may perform an extra setup–cleanup–setup cycle; do not rely on a promise of exactly one run.",
      }),
      codeFill(
        "rf-e1",
        "useEffect",
        "useEffect",
        "tsx",
        "___(() => { /* side effect */ }, []);",
        ["useEffect"],
        true,
      ),
      { ...mcq(
        "rf-e2",
        "Що означає порожній список залежностей ефекту?",
        "What does an empty effect dependency list mean?",
        ["Ефект не залежить від реактивних значень; запуск і очищення залежать від життєвого циклу", "Він запускається після кожного рендеру", "Він ніколи не запускається", "Він працює лише з SQL"],
        0,
      ), optionsEn: ["The effect has no reactive dependencies; setup and cleanup follow the lifecycle", "It runs after every render", "It never runs", "It only works with SQL"] },
      { ...mcq(
        "rf-e3",
        "Cleanup return:",
        "Cleanup return:",
        ["Прибрати підписку або таймер перед повторним запуском чи демонтуванням", "Примусово ввімкнути SSR", "Видалити файл компонента", "Виконати git reset"],
        0,
      ), optionsEn: ["Release subscriptions or timers before rerun or unmount", "Force SSR", "Delete the component file", "Reset Git"] },
    ],
  ),
  lesson(
    "rf-effect-deps",
    "Dependency array",
    "Dependency array",
    3,
    false,
    [
      concept("rf-effect-deps-concept", "Залежності описують використані значення", "Dependencies describe reactive values", {
        uk: "У масиві залежностей указують реактивні значення, які використовує ефект. Після зміни залежності React очищує попереднє налаштування й запускає нове. Порожній масив не означає, що можна приховати використовуваний id: це призведе до застарілого значення. Для запитів із змінним id передбачте очищення: скасуйте запит через AbortController або ігноруйте застарілий результат, щоб попередня відповідь не перезаписала нову.",
        en: "The dependency array lists reactive values used by the effect. When a dependency changes, React cleans up the previous setup and runs a new one. An empty array does not justify omitting an id the effect uses: that can leave stale values. For requests with a changing id, provide cleanup: abort the request with AbortController or ignore a stale result so an earlier response cannot overwrite a newer one.",
      }),
      { ...mcq(
        "rf-e4",
        "Який ризик пропущеної залежності?",
        "Missing deps risk:",
        ["Застарілі значення та помилки синхронізації", "Швидші типи", "Завжди краще SEO", "Додаткова підписка"],
        0,
      ), optionsEn: ["Stale values or incorrect synchronization", "Faster types", "Always better SEO", "A free subscription"] },
      { ...codeRead(
        "rf-e5",
        "Як поводиться ефект, якщо load — стабільна функція з модуля?",
        "How does the effect behave if load is a stable module-level function?",
        "tsx",
        "useEffect(() => { load(id); }, [id]);",
        ["Запускається після монтування і повторно при зміні id; у Strict Mode розробки можливий додатковий цикл", "Ніколи не запускається", "Лише при зміні CSS", "Завжди викидає помилку"],
        0,
      ) as Extract<Exercise, { type: "code_read" }>, optionsEn: ["Runs after mount and after id changes; development Strict Mode may add a cycle", "Never runs", "Runs only when CSS changes", "Always throws"] },
    ],
  ),
  exam("rf-fx-exam", "Контрольна: effects", "Exam: effects", 3, [
    codeFill("rf-ee1", "useEffect", "useEffect", "tsx", "___(() => {}, []);", ["useEffect"], true),
    { ...mcq("rf-ee2", "Що означає порожній список залежностей?", "What does an empty dependency list mean?", ["Ефект не має реактивних залежностей; у Strict Mode розробки можливий додатковий цикл", "Ефект запускається після кожного натискання клавіші", "Ефект ніколи не запускається", "Ефект виконується лише під час збірки"], 0), optionsEn: ["The effect has no reactive dependencies; development Strict Mode may run an extra cycle", "It runs after every keystroke", "It never runs", "It runs only during build"] },
    { ...mcq("rf-ee3", "Як повернути cleanup з ефекту?", "How does an effect provide cleanup?", ["Повернути функцію", "Викинути помилку", "Видалити стан", "Очікувати CSS"], 0), optionsEn: ["Return a function", "Throw an error", "Delete state", "Await CSS"] },
    { ...mcq("rf-ee4", "Де розміщують побічні дії?", "Where do side effects belong?", ["В обробниках подій або ефектах відповідно до причини дії", "Завжди в чистому тілі рендеру", "Лише під час імпорту", "У CSS"], 0), optionsEn: ["In event handlers or effects, depending on the cause", "Always in the pure render body", "Only at import time", "In CSS"] },
  ]),
]);

const forms = unit("forms", "Controlled inputs", "Controlled inputs", [
  lesson(
    "rf-controlled",
    "value + onChange",
    "value + onChange",
    2,
    false,
    [
      concept("rf-controlled-concept", "Стан керує полем", "State controls the field", {
        uk: "У контрольованому текстовому полі value надходить зі стану, а onChange оновлює його з поточного значення input. Почніть з рядка, наприклад useState(''), і не перемикайте поле між контрольованим і неконтрольованим режимами протягом його життя. Для checkbox керуйте checked і читайте e.target.checked, а не value. Додайте пов'язаний label і перевіряйте помилки введення текстом, а не лише кольором.",
        en: "For a controlled text input, value comes from state and onChange updates it from the input's current value. Start with a string, such as useState(''), and avoid switching between controlled and uncontrolled modes during its lifetime. For a checkbox control checked and read e.target.checked rather than value. Add an associated label and communicate validation errors in text, not only color.",
      }),
      codeFill(
        "rf-f1",
        "value binding",
        "value binding",
        "tsx",
        "<input ___={text} onChange={e => setText(e.target.value)} />",
        ["value"],
        true,
      ),
      { ...mcq(
        "rf-f2",
        "Controlled input:",
        "Controlled input:",
        ["Стан React керує значенням поля", "Лише DOM і ніколи стан", "Тригери SQL", "Лише localStorage"],
        0,
      ), optionsEn: ["React state controls the input value", "Only DOM, never state", "SQL triggers", "Only localStorage"] },
      codeFill(
        "rf-f3",
        "onChange",
        "onChange",
        "tsx",
        "<input value={v} ___={handler} />",
        ["onChange"],
        true,
      ),
    ],
  ),
  exam("rf-forms-exam", "Контрольна: forms", "Exam: forms", 2, [
    codeFill("rf-fe1", "value", "value", "tsx", "<input ___={x} onChange={…} />", ["value"], true),
    codeFill("rf-fe2", "onChange", "onChange", "tsx", "<input value={x} ___={…} />", ["onChange"], true),
    { ...mcq("rf-fe3", "Що містить e.target.value для текстового input?", "What is e.target.value for a text input?", ["Поточне значення рядка", "Колір CSS", "Статус HTTP", "Завжди шлях до файлу"], 0), optionsEn: ["The current string value", "A CSS color", "An HTTP status", "Always a file path"] },
    { ...mcq("rf-fe4", "Що означає контрольований input?", "What does a controlled input mean?", ["Його value керується станом React", "Неконтрольований input завжди кращий", "Подій немає", "JSX не використовується"], 0), optionsEn: ["Its value is driven by React state", "Uncontrolled input is always better", "There are no events", "JSX is not used"] },
  ]),
]);

const composition = unit("composition", "Composition", "Composition", [
  lesson(
    "rf-children",
    "children prop",
    "children prop",
    2,
    false,
    [
      concept("rf-children-concept", "Композиція через children", "Composition with children", {
        uk: "Компонент-обгортка може отримати вкладений JSX через children і розмістити його у власній структурі. Дані для налаштування передають через props. У TypeScript React.ReactNode описує широкий набір значень, які React може відобразити.",
        en: "A wrapper component receives nested JSX through children and places it in its own structure. Pass configuration through props. In TypeScript, React.ReactNode describes a broad range of values React can render.",
      }),
      { ...mcq(
        "rf-co1",
        "children дозволяє:",
        "children allows:",
        ["вкладений контент між тегами компонента", "only CSS inheritance", "SQL joins", "git submodules"],
        0,
      ), optionsEn: ["Nested content between component tags", "Only CSS inheritance", "SQL joins", "Git submodules"] },
      codeFill(
        "rf-co2",
        "children type",
        "children type",
        "tsx",
        "function Box({ children }: { children: React.___ }) { return <div>{children}</div>; }",
        ["ReactNode"],
        true,
      ),
      { ...matchEx(
        "rf-co3",
        "Patterns",
        "Patterns",
        [
          { left: "props", right: "передавати вхідні дані компонента" },
          { left: "children", right: "вкладати вміст" },
          { left: "state", right: "зберігати інтерактивні дані" },
        ],
      ), pairsEn: [{ left: "props", right: "Pass component inputs" }, { left: "children", right: "Nest content" }, { left: "state", right: "Store interactive data" }] },
    ],
  ),
  exam("rf-comp-exam2", "Контрольна: composition", "Exam: composition", 2, [
    { ...mcq("rf-coe1", "Що таке children?", "What is children?", ["Вкладений вміст компонента", "Лише HTTP body", "Лише CSS grid", "Колонка бази даних"], 0), optionsEn: ["Nested component content", "Only an HTTP body", "Only CSS grid", "A database column"] },
    { ...mcq("rf-coe2", "Що заохочує композиція?", "What does composition encourage?", ["Складання компонентів замість глибокої ієрархії спадкування", "Відмову від компонентів", "Лише глобальні змінні", "Таблиці для всього UI"], 0), optionsEn: ["Combining components instead of deep inheritance hierarchies", "Avoiding components", "Only global variables", "Tables for every UI"] },
    codeFill("rf-coe3", "children render", "children render", "tsx", "return <div>{___}</div>;", ["children"], true),
    { ...mcq("rf-coe4", "Що допомагає перевикористовувати UI?", "What helps reuse UI?", ["Невеликі компоненти та props", "Лише один файл на 2000 рядків", "Відсутність props", "Завжди лише inline styles"], 0), optionsEn: ["Small components and props", "Only a 2000-line file", "No props", "Always inline styles only"] },
  ]),
]);

const appliedReactResilience = unit(
  "applied_react_resilience",
  "Applied: стани, помилки та похідний стейт",
  "Applied: States, Errors & Derived State",
  [
    lesson(
      "react-app-async-states",
      "Патерн статусів: idle, loading, error, success",
      "Async state pattern: idle, loading, error, success",
      3,
      false,
      [
        concept("react-app-async-states-concept", "Модель станів запиту", "Model request states", {
          uk: "Визначте стани, які допускає саме ваш інтерфейс: idle, loading, error і success можуть бути взаємовиключними, але деякі продукти показують старі дані під час повторного завантаження. Явно опишіть переходи й те, що показувати в кожному стані.",
          en: "Define the states your interface allows: idle, loading, error, and success may be mutually exclusive, but some products show old data during a refresh. Specify transitions and what the UI displays in each state.",
        }),
        { ...codeRead(
          "rc-res-1",
          "Явний статус замість кількох прапорців",
          "Explicit status string pattern vs boolean soup",
          "jsx",
          "function UserProfile() {\n  const [status, setStatus] = useState('idle'); // 'loading' | 'error' | 'success'\n  if (status === 'idle') return <p>Not started</p>;\n  if (status === 'loading') return <Spinner />;\n  if (status === 'error') return <ErrorMessage />;\n  return <UserDetails />;\n}",
          [
            "Запобігає неможливим станам (наприклад, одночасно loading=true та error=true)",
            "Збільшує розмір бандлу",
            "Працює лише з класовими компонентами",
            "Вимагає використання Redux",
          ],
          0,
        ) as Extract<Exercise, { type: "code_read" }>, optionsEn: ["It represents the mutually exclusive statuses without conflicting loading and error flags", "It increases bundle size", "It works only with class components", "It requires Redux"] },
        codeFill(
          "rc-res-2",
          "Рендеринг повідомлення про помилку",
          "Render error message fallback",
          "jsx",
          "if (status === 'error') {\n  return <p role=\"alert\">{error.___}</p>;\n}",
          ["message"],
          true,
        ),
        { ...mcq(
          "rc-res-3",
          "Якщо модель дозволяє лише один із взаємовиключних статусів loading або error, чому два одночасні прапорці є проблемою?",
          "If the model allows only one of the mutually exclusive loading or error statuses, why are both flags true a problem?",
          [
            "Тому що така комбінація суперечить обраному контракту станів і потребує неоднозначного рішення UI",
            "Тому що React викидає помилку компіляції",
            "Тому що useState не приймає об'єкти",
            "Тому що це заборонено специфікацією HTTP",
          ],
          0,
        ), optionsEn: ["The combination violates the chosen state contract and leaves an ambiguous UI decision", "React throws a compile error", "useState cannot hold objects", "HTTP forbids it"] },
      ],
    ),
    lesson(
      "react-app-derived-state",
      "Похідний стан замість дублювання в useEffect",
      "Derived state vs useEffect sync traps",
      3,
      false,
      [
        concept("react-app-derived-state-concept", "Однакове джерело даних", "One source of data", {
          uk: "Видимий список, який повністю визначається items і filter, можна обчислити під час рендеру. Так не потрібно окремо синхронізувати його через ефект. Якщо виміряне обчислення дороге, useMemo може кешувати результат за правильних залежностей.",
          en: "A visible list fully determined by items and filter can be derived during rendering. This avoids separately synchronizing it in an effect. If measurement shows the calculation is expensive, useMemo can cache it with the correct dependencies.",
        }),
        { ...codeRead(
          "rc-res-4",
          "Обчислення відфільтрованого списку під час рендеру",
          "Compute filtered items during render",
          "jsx",
          "function ProductList({ items, filter }) {\n  // Good: derived state\n  const visible = items.filter(x => x.category === filter);\n  return <ul>{visible.map(x => <li key={x.id}>{x.name}</li>)}</ul>;\n}",
          [
            "visible обчислюється автоматично під час кожного рендеру без зайвого стану",
            "visible обов'язково треба зберігати в useState через useEffect",
            "Компонент рендериться нескінченно",
            "filter не можна передавати через props",
          ],
          0,
        ) as Extract<Exercise, { type: "code_read" }>, optionsEn: ["visible is derived during each render without additional state", "visible must be stored in useState through useEffect", "The component renders infinitely", "filter cannot be passed through props"] },
        codeFill(
          "rc-res-5",
          "Оптимізація важкого обчислення похідного стану через useMemo",
          "Optimize heavy derived calculation with useMemo",
          "jsx",
          "const sortedItems = ___( () => {\n  return [...items].sort((a, b) => b.score - a.score);\n}, [items]);",
          ["useMemo"],
          true,
        ),
      ],
    ),
    lesson(
      "react-app-error-fallbacks",
      "Обробка помилок та кнопки Retry",
      "Error boundaries & retry fallbacks",
      3,
      false,
      [
        concept("react-app-error-fallbacks-concept", "Повторна спроба та очищення", "Retry and cleanup", {
          uk: "Кнопка повтору може змінити тригер або викликати функцію запиту. Передбачте loading, помилку та успіх, а також захист від застарілих відповідей під час повторних запитів. Error boundary обробляє помилки рендеру нащадків і не є загальним перехоплювачем асинхронних помилок.",
          en: "A retry button can update a trigger or call a request function. Handle loading, error, and success, and guard against stale responses during repeated requests. An error boundary handles descendant rendering errors; it is not a general asynchronous error handler.",
        }),
        { ...codeRead(
          "rc-res-6",
          "Функція повторної спроби запиту (retry)",
          "Retry request handler in component",
          "jsx",
          "function DataView() {\n  const [count, setCount] = useState(0);\n  const retry = () => setCount(c => c + 1);\n  useEffect(() => { loadData(); }, [count]);\n  return <button onClick={retry}>Retry</button>;\n}",
          [
            "Збільшення лічильника count повторно запускає ефект loadData",
            "retry ламає хук useEffect",
            "кнопка Retry працює лише один раз",
            "setCount викликає перезавантаження всієї вкладки",
          ],
          0,
        ) as Extract<Exercise, { type: "code_read" }>, optionsEn: ["Incrementing count causes the effect to run again", "Retry breaks useEffect", "Retry works only once", "setCount reloads the entire tab"] },
        codeFill(
          "rc-res-7",
          "Кнопка повторної спроби при збої",
          "Retry button trigger on failure",
          "jsx",
          "<button onClick={handle___}>Спробувати знову</button>",
          ["Retry", "retry"],
          false,
        ),
      ],
    ),
    lesson(
      "react-app-cumulative-task",
      "Підсумковий таск: стійкий список із пошуком",
      "Applied task: resilient search list",
      3,
      false,
      [
        concept("react-app-cumulative-task-concept", "Узгоджений список пошуку", "A consistent search list", {
          uk: "Оголошуйте хуки до умовних повернень, щоб порядок викликів був стабільним. Потім відобразіть loading або помилку, а для успішного результату — відфільтрований список і зрозумілий порожній стан. Мемоізація потрібна лише за наявності причини. Спрощено React обчислює опис UI під час рендеру, узгоджує зміни, застосовує потрібні DOM-оновлення у commit і запускає useEffect на клієнті після commit. Рендер може бути перерваний без commit, а ефекти не запускаються під час серверного рендеру.",
          en: "Declare hooks before conditional returns so their call order is stable. Then show loading or an error, and on success show the filtered list and a clear empty state. Memoize only when there is a reason. In a simplified model, React calculates a UI description during render, reconciles changes, applies necessary DOM updates in commit, and runs useEffect on the client after commit. A render can be interrupted without a commit, and effects do not run during server rendering.",
        }),
        codeOrder(
          "rc-res-8",
          "Упорядкуйте: спочатку query, потім status, обчислення filtered і перевірки loading та error",
          "Order query, then status, the filtered calculation, and the loading and error guards",
          "jsx",
          [
            "if (status === 'error') return <ErrorView onRetry={fetchData} />;",
            "const filtered = useMemo(() => data.filter(item => item.name.includes(query)), [data, query]);",
            "const [query, setQuery] = useState('');",
            "if (status === 'loading') return <Spinner />;",
            "const [status, setStatus] = useState('loading');",
          ],
          [
            "const [query, setQuery] = useState('');",
            "const [status, setStatus] = useState('loading');",
            "const filtered = useMemo(() => data.filter(item => item.name.includes(query)), [data, query]);",
            "if (status === 'loading') return <Spinner />;",
            "if (status === 'error') return <ErrorView onRetry={fetchData} />;",
          ],
        ),
        codeFill(
          "rc-res-9",
          "Позначити повідомлення про порожні результати як статус",
          "Mark the empty-results message as a status",
          "jsx",
          "{filtered.length === 0 && <p role=\"___\">No results</p>}",
          ["status"],
          false,
        ),
      ],
    ),
    exam(
      "react-app-exam",
      "Екзамен: стійкість компонентів React",
      "Exam: resilient React state",
      3,
      [
        { ...mcq(
          "rc-res-10",
          "Яка головна проблема копіювання props у useState: const [email, setEmail] = useState(props.email)?",
          "What is the main pitfall of copying props to useState: const [val] = useState(props.val)?",
          [
            "Локальний стан ініціалізується один раз і ігнорує наступні оновлення props.email",
            "React автоматично викидає Warning",
            "props перестають бути доступними в компоненті",
            "Компонент втрачає доступ до DOM",
          ],
          0,
        ), optionsEn: ["Local state uses the prop as an initial value and does not automatically track later prop updates", "React always throws a warning", "Props become unavailable", "The component loses access to the DOM"] },
        { ...codeRead(
          "rc-res-11",
          "Що робить функція очищення в useEffect?",
          "What does cleanup function in useEffect do?",
          "jsx",
          "useEffect(() => {\n  const id = setInterval(tick, 1000);\n  return () => clearInterval(id);\n}, []);",
          [
            "Зупиняє інтервал перед розмонтуванням або наступним виконанням ефекту",
            "Очищає кеш браузера",
            "Знищує всі змінні в додатку",
            "Запускає tick ще раз",
          ],
          0,
        ) as Extract<Exercise, { type: "code_read" }>, optionsEn: ["It clears the interval before unmount or the next effect setup", "It clears the browser cache", "It destroys all application variables", "It invokes tick again"] },
        codeFill(
          "rc-res-12",
          "Виклик хука редуктора для складного стану",
          "Invoke useReducer hook for complex state transitions",
          "jsx",
          "const [state, dispatch] = ___(reducer, initialState);",
          ["useReducer"],
          true,
        ),
        { ...codeOrder(
          "rc-res-13",
          "Впорядкуйте спрощену модель клієнтського оновлення, яке дійшло до commit.",
          "Order the simplified model of a client update that reaches commit.",
          "text",
          [
            "Apply necessary DOM updates in commit",
            "Run useEffect setup on the client",
            "Call the component to calculate the UI",
            "Reconcile the new description with the previous one",
          ],
          [
            "Call the component to calculate the UI",
            "Reconcile the new description with the previous one",
            "Apply necessary DOM updates in commit",
            "Run useEffect setup on the client",
          ],
        ), linesUk: ["Застосувати потрібні оновлення DOM у commit", "Запустити налаштування useEffect на клієнті", "Викликати компонент для обчислення UI", "Узгодити новий опис із попереднім"] },
      ],
    ),
  ],
);

const capstone = unit("capstone", "Capstone", "Capstone", [
  lesson(
    "rf-capstone-toggle",
    "Mini: toggle component",
    "Mini: toggle component",
    3,
    false,
    [
      concept("rf-capstone-toggle-concept", "Перемикач і перевірка поведінки", "Toggle behavior and verification", {
        uk: "Кнопка перемикає логічний стан функціональним оновленням і показує On або Off. Додайте type=\"button\" та aria-pressed={on}, щоб стан був доступний допоміжним технологіям. Перевірте клік і клавіатурну активацію: автоматична перевірка цієї вправи шукає фрагменти тексту, зокрема в коментарях, і не виконує компонент.",
        en: "The button toggles boolean state with a functional update and displays On or Off. Add type=\"button\" and aria-pressed={on} to expose the state to assistive technology. Test click and keyboard activation: this exercise's automatic check searches text fragments, including comments, and does not run the component.",
      }),
      {
        id: "rf-cap1",
        type: "code_project",
        promptUk:
          "Вихідні файли: Toggle.tsx та README.md. Створіть перемикач із useState, function Toggle, button та текстом On і Off; додайте type=\"button\" і aria-pressed, опишіть state у README. Перевірка шукає фрагменти тексту, включно з коментарями, і не запускає компонент; перевірте поведінку окремо.",
        promptEn:
          "Input files: Toggle.tsx and README.md. Build a toggle with useState, function Toggle, a button, and On and Off labels; add type=\"button\" and aria-pressed, and explain state in README. The checker searches text fragments, including comments, and does not run the component; test behavior separately.",
        files: [
          {
            id: "tsx",
            name: "Toggle.tsx",
            language: "tsx",
            starter: `// TODO: implement the interactive control
export function Toggle() {
  return null;
}
`,
          },
          {
            id: "md",
            name: "README.md",
            language: "markdown",
            starter: `# Toggle
<!-- TODO: explain the component's behavior -->
`,
          },
        ],
        checks: [
          {
            fileId: "tsx",
            contains: ["useState", "function Toggle", "button", "On", "Off"],
          },
          { fileId: "md", contains: ["state"] },
        ],
      } as Exercise,
    ],
  ),
  lesson(
    "rf-forgeboard-client-lab",
    "Лаб: багатосторінковий клієнт ForgeBoard (M4)",
    "Lab: Multi-View ForgeBoard Client (M4)",
    4,
    false,
    [
      concept("rf-forgeboard-client-lab-concept", "Стан дошки та лабораторна робота", "Board state and the lab", {
        uk: "Зберігайте фільтри, які потрібно передавати посиланням, у параметрах URL і визначте поведінку Back/Forward. Окремо відобразіть завантаження, порожній результат, помилку та повторну спробу. Вбудована перевірка шукає текст, а локальний пакет M4 запускає компонентні тести.",
        en: "Keep shareable filters in URL parameters and define Back/Forward behavior. Separately render loading, empty, error, and retry states. The embedded check searches text, while the local M4 package runs component tests.",
      }),
      { ...mcq(
        "rf-fb1",
        "На дошці ForgeBoard фільтр статусу та рядок пошуку мають зберігатися при копіюванні URL і натисканні кнопки «Назад» у браузері. Де тримати цей стан?",
        "Filter status and search query on ForgeBoard must survive URL sharing and browser Back navigation. Where should this state live?",
        [
          "В URL search parameters (URLSearchParams / router query), а не лише в локальному useState",
          "Тільки в sessionStorage без оновлення URL",
          "У глобальній змінній window.__filter",
          "У CSS custom properties",
        ],
        0,
        why(
          "URL — єдине джерело правди для фільтрів і навігації: посилання стають відтворюваними, а History API працює нативно.",
          "Storing filter/search state in URL query parameters makes views shareable and Back/Forward-safe.",
        ),
      ), optionsEn: ["URL search parameters or router query, so filters can be shared and navigated", "Only sessionStorage without updating the URL", "A global window.__filter variable", "CSS custom properties"] },
      codeProject(
        "rf-fb2",
        "Складіть оболонку станів loading/empty/error/retry для ForgeBoard. Вбудована перевірка шукає текстові фрагменти, зокрема в коментарях, і не запускає компонент; локальний пакет M4 нижче містить компонентні тести.",
        "Sketch a loading/empty/error/retry task board view for ForgeBoard. The embedded checker searches text fragments, including comments, and does not run the component; the local M4 package below contains component tests.",
        [
          {
            id: "tsx",
            name: "BoardView.tsx",
            language: "tsx",
            starter: `export function BoardView({ status, tasks, onRetry }) {\n  // TODO: handle request and list states\n  return null;\n}\n`,
          },
        ],
        [
          { fileId: "tsx", contains: ["role=\"status\"", "onRetry", "tasks.map", "key="] },
        ],
        {
          hintUk: "Завантажте M4 нижче для реальних React Testing Library та accessible form тестів.",
          hintEn: "Download M4 below to run real React Testing Library & accessible form checks locally.",
        },
      ),
    ],
    { baseXp: 40 },
  ),
  exam("rf-cap-exam", "Фінальна контрольна React", "Final React exam", 3, [
    { ...mcq("rf-cae1", "Що таке React?", "What is React?", ["Бібліотека інтерфейсів", "База даних", "Операційна система", "Лише CDN"], 0), optionsEn: ["A UI library", "A database", "An operating system", "Only a CDN"] },
    codeFill("rf-cae2", "useState", "useState", "tsx", "const [a, setA] = ___(0);", ["useState"], true),
    codeFill("rf-cae3", "onClick", "onClick", "tsx", "<button ___={fn}>", ["onClick"], true),
    codeFill("rf-cae4", "className", "className", "tsx", "<div ___=\"box\">", ["className"], true),
    { ...mcq("rf-cae5", "Для чого потрібен key у списках?", "What are list keys for?", ["Стабільна ідентичність серед сусідів", "Випадковий ключ на кожному рендері", "Ключі заборонені", "Лише CSS"], 0), optionsEn: ["Stable identity among siblings", "A random key on every render", "Keys are forbidden", "Only CSS"] },
    codeFill("rf-cae6", "useEffect", "useEffect", "tsx", "___(() => {}, []);", ["useEffect"], true),
  ]),
]);

const hooksAdv = unit("hooks_adv", "Hooks advanced", "Hooks advanced", [
  lesson(
    "rf-usememo",
    "useMemo & useCallback",
    "useMemo & useCallback",
    3,
    false,
    [
      concept("rf-usememo-concept", "Мемоізація як оптимізація", "Memoization as an optimization", {
        uk: "useMemo кешує результат обчислення між рендерами, а useCallback — посилання на функцію, поки залежності не змінилися. Залежності порівнюються через Object.is: новий об'єкт, створений на кожному рендері, може щоразу звести кеш нанівець. React також може відкинути кеш за певних умов. Це оптимізації, а не гарантія правильності: спершу напишіть коректний код, потім виміряйте потребу в кешуванні.",
        en: "useMemo caches a calculation and useCallback caches a function reference between renders while dependencies stay unchanged. Dependencies are compared with Object.is: an object recreated on every render can invalidate the cache each time. React may also discard a cache in certain circumstances. These are optimizations, not correctness guarantees: first write correct code, then measure whether caching helps.",
      }),
      { ...mcq(
        "rf-h1",
        "Що кешує useMemo?",
        "useMemo caches:",
        ["результат обчислення за незмінних залежностей", "DOM-вузол назавжди", "лише CSS", "завжди SQL-запит"],
        0,
      ), optionsEn: ["A calculated value between renders when dependencies are unchanged", "A DOM node forever", "Only CSS", "Always a SQL query"] },
      codeFill(
        "rf-h2",
        "useMemo",
        "useMemo",
        "tsx",
        "const v = ___(() => heavy(x), [x]);",
        ["useMemo"],
        true,
      ),
      codeFill(
        "rf-h3",
        "useCallback",
        "useCallback",
        "tsx",
        "const fn = ___(() => {}, []);",
        ["useCallback"],
        true,
      ),
    ],
  ),
  lesson(
    "rf-custom-hook",
    "Custom hooks",
    "Custom hooks",
    3,
    false,
    [
      concept("rf-custom-hook-concept", "Повторне використання логіки", "Reusing logic", {
        uk: "Власний хук — функція з назвою use..., яка може викликати інші хуки на верхньому рівні. Він повторно використовує логіку, а не автоматично спільний стан: два компоненти, що викликають useToggle(), отримують окремі значення. Якщо стан має бути спільним, розмістіть його у спільному власнику й передайте через props або context.",
        en: "A custom hook is a function named use... that can call other hooks at the top level. It reuses logic, not automatically shared state: two components calling useToggle() get separate values. If state must be shared, put it in a common owner and pass it through props or context.",
      }),
      { ...mcq(
        "rf-h4",
        "З чого починається назва власного хука?",
        "Custom hook name starts with:",
        ["use", "get", "make", "hook"],
        0,
      ), optionsEn: ["use", "get", "make", "hook"] },
      codeFill(
        "rf-h5",
        "hook name",
        "hook name",
        "tsx",
        "function ___Toggle() { return useState(false); }",
        ["use"],
        true,
      ),
      { ...mcq(
        "rf-h6",
        "Як викликають звичайні хуки, наприклад useState?",
        "Hooks rules:",
        ["на верхньому рівні в однаковому порядку", "довільно всередині умов", "у методах класу", "лише в CSS"],
        0,
      ), optionsEn: ["Call hooks at the top level in a consistent order", "Call hooks freely inside conditions", "Call hooks in class methods", "Use hooks only in CSS"] },
    ],
  ),
  lesson(
    "rf-context",
    "Context basics",
    "Context basics",
    3,
    false,
    [
      concept("rf-context-concept", "Значення найближчого провайдера", "The nearest provider’s value", {
        uk: "Context дозволяє передавати значення глибоким нащадкам без явної передачі через кожен проміжний компонент. useContext читає найближчий відповідний provider вище в дереві; без нього повертається значення за замовчуванням, задане при створенні context. Якщо provider існує, але його value дорівнює undefined, повернеться саме undefined, а не значення за замовчуванням. Зміна значення провайдера оновлює споживачів цього контексту.",
        en: "Context lets deep descendants read a value without passing it through every intermediate component. useContext reads the nearest matching provider above it; without one it returns the default supplied when the context was created. If a provider exists but its value is undefined, consumers receive undefined rather than the default. Changing the provider value updates consumers of that context.",
      }),
      codeFill(
        "rf-h7",
        "createContext",
        "createContext",
        "tsx",
        "const Ctx = React.___(null);",
        ["createContext"],
        true,
      ),
      { ...mcq(
        "rf-h8",
        "Що читає useContext?",
        "useContext reads:",
        ["значення найближчого відповідного provider", "лише localStorage", "лише URL", "завжди Redux"],
        0,
      ), optionsEn: ["The nearest matching provider value", "Only localStorage", "Only the URL", "Always Redux"] },
      codeFill(
        "rf-h9",
        "Provider",
        "Provider",
        "tsx",
        "<Ctx.___ value={v}>{children}</Ctx.Provider>",
        ["Provider"],
        true,
      ),
    ],
  ),
  exam("rf-hooks-exam", "Контрольна: hooks advanced", "Exam: hooks advanced", 3, [
    { ...mcq("rf-he1", "Для чого використовують useMemo?", "What is useMemo used for?", ["Для кешування результату обчислення між рендерами за незмінних залежностей", "Лише для запитів", "Для маршрутизації", "Для SQL"], 0), optionsEn: ["To cache a calculation between renders while dependencies are unchanged", "Only fetching", "Routing", "SQL"] },
    codeFill("rf-he2", "useCallback", "useCallback", "tsx", "const f = ___(() => {}, []);", ["useCallback"], true),
    { ...mcq("rf-he3", "Для чого створюють власні хуки?", "Why create custom hooks?", ["Для повторного використання логіки з хуками", "Щоб завжди замінити компоненти", "Щоб заборонити хуки", "Для CSS-модулів"], 0), optionsEn: ["To reuse logic involving hooks", "To always replace components", "To ban hooks", "For CSS modules"] },
    codeFill("rf-he4", "useContext", "useContext", "tsx", "const v = ___(Ctx);", ["useContext"], true),
  ]),
  lesson(
    "rf-hooks-pattern",
    "Custom hook pattern",
    "Custom hook pattern",
    3,
    false,
    [
      concept("rf-hooks-pattern-concept", "Правила виклику хуків", "Rules for calling hooks", {
        uk: "Викликайте звичайні хуки, наприклад useState і useEffect, на верхньому рівні компонента або власного хука до умовних return, а не в циклах, умовах чи вкладених обробниках. Стабільний порядок викликів дозволяє React пов'язувати стан із правильним хуком. API use має окремі правила й може викликатися в умовах і циклах; це не поширюється на useState.",
        en: "Call ordinary hooks such as useState and useEffect at the top level of a component or custom hook before conditional returns, not in loops, conditions, or nested handlers. A stable call order lets React associate state with the correct hook. The use API has separate rules and can be called in conditions and loops; this exception does not apply to useState.",
      }),
      codeFill(
        "rf-hp1",
        "useX naming",
        "useX naming",
        "tsx",
        "function ___Toggle() { return useState(false); }",
        ["use"],
        true,
      ),
      { ...mcq(
        "rf-hp2",
        "Як власні хуки викликають useState та інші звичайні хуки?",
        "Custom hooks should:",
        ["на верхньому рівні", "лише в класах", "завжди замінюють JSX", "забороняють useState"],
        0,
      ), optionsEn: ["Call hooks at the top level", "Be classes only", "Always replace JSX", "Ban useState"] },
      codeFill(
        "rf-hp3",
        "return pair",
        "return pair",
        "tsx",
        "const [on, setOn] = ___(false);",
        ["useState"],
        true,
      ),
      { ...mcq(
        "rf-hp4",
        "Як повторно використовувати логіку з хуками в компонентах?",
        "Share logic across components via:",
        ["через власні хуки", "лише через CSS", "лише через HTML-коментарі", "через SQL views"],
        0,
      ), optionsEn: ["Custom hooks", "Only CSS", "Only HTML comments", "SQL views"] },
    ],
  ),
]);

const hooksMore = unit("hooks_more", "Хуки: useRef, useReducer та стан", "Hooks: useRef, useReducer & derived state", [
  lesson(
    "rf-useref",
    "useRef: DOM та мутабельні значення",
    "useRef: DOM & mutable values",
    3,
    false,
    [
      concept("rf-useref-concept", "Значення, що не запускає рендер", "A value that does not trigger rendering", {
        uk: "useRef зберігає той самий об'єкт між рендерами. Зміна current не запускає рендер, тому ref підходить для DOM-вузла або ID таймера, але не для даних, які мають оновлювати інтерфейс. Для таймера перевіряйте null явно, очищуйте попередній таймер перед повторним запуском і під час демонтування. Не читайте та не змінюйте current під час рендеру, крім дозволеної передбачуваної ініціалізації; використовуйте обробник події або effect.",
        en: "useRef retains the same object between renders. Changing current does not trigger a render, so a ref suits a DOM node or timer ID but not data that must update the UI. Check null explicitly, clear an existing timer before restarting, and clean up on unmount. Do not read or write current during render except for permitted predictable initialization; use an event handler or effect instead.",
      }),
      codeFill(
        "rf-hm-r1",
        "Прив'язка ref до інпуту",
        "Binding ref to input DOM element",
        "tsx",
        "const inputRef = useRef<HTMLInputElement>(null);\nreturn <input ref={___} />;",
        ["inputRef"],
        true,
      ),
      { ...mcq(
        "rf-hm-r2",
        "Основна відмінність useRef від useState:",
        "Key difference between useRef and useState:",
        [
          "Зміна ref.current не викликає повторний рендер компонента",
          "useRef працює лише на стороні сервера",
          "useRef не зберігає значення між рендерами",
          "useRef вимагає використання Redux",
        ],
        0,
      ), optionsEn: ["Changing ref.current does not trigger a component render", "useRef works only on the server", "useRef cannot retain a value between renders", "useRef requires Redux"] },
      { ...codeRead(
        "rf-hm-r3",
        "Що зберігає timerRef у цьому коді?",
        "What does timerRef hold in this code?",
        "tsx",
        "const timerRef = useRef<number | null>(null);\nconst stop = () => {\n  if (timerRef.current !== null) clearTimeout(timerRef.current);\n  timerRef.current = null;\n};\nconst start = () => {\n  stop();\n  timerRef.current = window.setTimeout(() => { timerRef.current = null; tick(); }, 1000);\n};\nuseEffect(() => () => {\n  if (timerRef.current !== null) clearTimeout(timerRef.current);\n}, []);",
        [
          "Мутабельний ID таймера між рендерами без виклику перемальовування",
          "Текстовий рядок 'tick'",
          "Новий стан компонента зі щосекундним re-render",
          "DOM-вузол кнопки",
        ],
        0,
      ) as Extract<Exercise, { type: "code_read" }>, optionsEn: ["A mutable timer ID retained between renders without triggering a render", "The string tick", "New state that rerenders every second", "A button DOM node"] },
      codeFill(
        "rf-hm-r4",
        "Читання значення ref",
        "Read ref value",
        "tsx",
        "const val = myRef.___;",
        ["current"],
        true,
      ),
    ],
  ),
  lesson(
    "rf-usereducer",
    "useReducer: actions та dispatch",
    "useReducer: actions & dispatch",
    3,
    false,
    [
      concept("rf-usereducer-concept", "Стан через reducer", "State through a reducer", {
        uk: "useReducer повертає стан і dispatch. Reducer отримує попередній стан та action і має чисто повернути наступний стан без мутації: наприклад, {...state, count: state.count + 1}. Запити й інші побічні дії виконуйте поза reducer. Об'єкт із type — поширена домовленість, а не обов'язкова форма для всіх reducers; у Strict Mode розробки React може додатково викликати reducer для виявлення нечистого коду.",
        en: "useReducer returns state and dispatch. A reducer receives previous state and an action and should return the next state purely without mutation, for example {...state, count: state.count + 1}. Run requests and other side effects outside the reducer. An object with type is a common convention, not a required action shape; development Strict Mode may call the reducer extra times to reveal impurities.",
      }),
      codeFill(
        "rf-hm-rd1",
        "Ініціалізація хука useReducer",
        "Initialize useReducer hook",
        "tsx",
        "const [state, dispatch] = ___(reducer, { count: 0 });",
        ["useReducer"],
        true,
      ),
      codeFill(
        "rf-hm-rd2",
        "Диспетчеризація action об'єкта",
        "Dispatch action object",
        "tsx",
        "dispatch({ ___: 'add', payload: newItem });",
        ["type"],
        true,
      ),
      { ...codeRead(
        "rf-hm-rd3",
        "useReducer та зовнішні стори (напр. Redux):",
        "useReducer vs external stores (e.g. Redux):",
        "tsx",
        "function reducer(state, action) {\n  switch (action.type) {\n    case 'add': return [...state, action.payload];\n    case 'remove': return state.filter(x => x.id !== action.id);\n    default: return state;\n  }\n}",
        [
          "useReducer + Context керують потоком дій у дереві React; Redux обирають для складних зовнішніх підписок чи девтулзів",
          "useReducer повністю заборонений без встановлення Redux",
          "useReducer завжди мутує попередній стан напряму",
          "useReducer працює лише для числових лічильників",
        ],
        0,
      ) as Extract<Exercise, { type: "code_read" }>, optionsEn: ["useReducer and Context manage actions within a React tree; an external store may provide different subscription and debugging capabilities", "useReducer requires Redux", "useReducer always mutates previous state directly", "useReducer works only for counters"] },
    ],
  ),
  lesson(
    "rf-derived-state",
    "Обчислюваний стан та фільтрація списків",
    "Derived state & controlled filter",
    3,
    false,
    [
      concept("rf-derived-state-concept", "Обчислюйте те, що вже відомо", "Derive what is already known", {
        uk: "Якщо список можна обчислити з items і filter, зробіть це під час рендеру замість дублювання стану та синхронізації ефектом. Локальна копія props доречна як навмисна незалежна чернетка, але пізніші зміни props не перезапишуть її автоматично. Заздалегідь визначте, що станеться при переході до іншого запису й при новій відповіді сервера: не стирайте незбережені правки непомітною синхронізацією.",
        en: "If a list can be computed from items and filter, derive it during rendering instead of duplicating state and synchronizing it with an effect. A local copy of props can be appropriate as an intentional independent draft, but later prop changes do not automatically overwrite it. Decide what happens when navigating to another record and when a new server response arrives: do not silently erase unsaved edits through synchronization.",
      }),
      { ...codeRead(
        "rf-hm-ds1",
        "Як формується видимий список visibleItems?",
        "How is the visibleItems list computed?",
        "tsx",
        "const [filter, setFilter] = useState('');\nconst visibleItems = items.filter(x => x.name.includes(filter));",
        [
          "Обчислюється на льоту під час рендеру (derived state), без зайвого другого useState",
          "Зберігається в локальному сховищі браузера",
          "Вимагає обов'язкового useEffect для запису у state",
          "Мутує оригінальний масив items назавжди",
        ],
        0,
      ) as Extract<Exercise, { type: "code_read" }>, optionsEn: ["Computed during rendering without an extra useState", "Stored in browser localStorage", "Must be stored using useEffect", "Permanently mutates the original items array"] },
      codeFill(
        "rf-hm-ds2",
        "Керований інпут пошуку оновлює рядок фільтра",
        "Controlled search input updates filter string",
        "tsx",
        "<input value={filter} onChange={e => ___(e.target.value)} />",
        ["setFilter"],
        true,
      ),
      { ...mcq(
        "rf-hm-ds3",
        "Який ризик копіювання props у useState, якщо очікується синхронізація з подальшими змінами props?",
        "What is the risk of copying props into state when later prop changes are expected to stay in sync?",
        [
          "Внутрішній state не оновлюється автоматично при зміні props від батька (stale data), якщо це не навмисна чернетка",
          "React забороняє передавати props у функції",
          "Це блокує стилі Tailwind",
          "Це призводить до переповнення оперативної пам'яті сервера",
        ],
        0,
      ), optionsEn: ["Local state does not automatically update when props change unless this is an intentional independent draft", "React forbids passing props to functions", "It blocks Tailwind styles", "It overflows server memory"] },
    ],
  ),
  exam("rf-hooks-more-exam", "Контрольна: hooks more", "Exam: hooks more", 3, [
    { ...mcq(
      "rf-hme1",
      "useRef vs useState:",
      "useRef vs useState:",
      [
        "ref зберігає значення між рендерами без виклику re-render; useState викликає новий рендер при зміні",
        "ref працює лише з DOM-вузлами і не може зберігати числа",
        "useState не підтримує об'єкти",
        "вони є повними синонімами в React 19",
      ],
      0,
    ), optionsEn: ["A ref retains a value without triggering a render; changing state requests a render", "Refs work only with DOM nodes and cannot hold numbers", "useState cannot hold objects", "They are complete synonyms in React 19"] },
    codeFill(
      "rf-hme2",
      "Фокус на DOM-елементі через ref",
      "Focus DOM element via ref",
      "tsx",
      "inputRef.___?.focus();",
      ["current"],
      true,
    ),
    { ...mcq(
      "rf-hme3",
      "Яка поширена форма action у reducer патерні з полем type?",
      "What is a common action shape in a reducer pattern using a type field?",
      [
        "Об'єкт з полем type (напр. { type: 'add', payload })",
        "Лише число",
        "CSS-рядок селектора",
        "Посилання на DOM-вузол",
      ],
      0,
    ), optionsEn: ["An object with a type field, such as { type: 'add', payload }", "Only a number", "A CSS selector string", "A DOM node reference"] },
    { ...mcq(
      "rf-hme4",
      "Правило «не копіюйте props у state» рекомендує:",
      "The 'do not copy props into state' rule recommends:",
      [
        "Обчислювати похідні значення (derived state) під час рендеру або піднімати стан угору (lift state up)",
        "Повністю відмовитися від props",
        "Використовувати лише класові компоненти",
        "Писати код безпосередньо в HTML",
      ],
      0,
    ), optionsEn: ["Derive values during rendering or lift shared state to an owner", "Avoid props entirely", "Use only class components", "Write code directly in HTML"] },
  ]),
]);

const architectureRoutingForms = unit(
  "architecture_routing_forms",
  "Архітектура React, роутінг та тестування",
  "Thinking in React, Routing & Component Tests",
  [
    lesson(
      "rf-arf-thinking-in-react",
      "Межі компонентів і власність стану (Thinking in React)",
      "Component Boundaries & State Ownership",
      3, false, [
      concept("rf-arf-thinking-in-react-concept", "Власник і похідні дані", "State ownership and derived data", {
        uk: "Зберігайте змінний стан у найближчому спільному власнику, якому він потрібен. Відфільтрований список зазвичай можна обчислити з вихідних задач і фільтрів під час рендеру. Для окремої чернетки визначте, коли її слід скинути при переході до іншого запису.",
        en: "Keep changing state in the nearest shared owner that needs it. A filtered list can usually be derived from tasks and filters during rendering. For an independent draft, define when it should reset as the selected record changes.",
      }),
        { ...mcq(
          "rf-arf1",
          "У додатку ForgeBoard є пошуковий інпут, чекбокс фільтра та список задач, відфільтрований за обома. Де тримати список `filteredTasks`?",
          "ForgeBoard has a search input, a status filter, and a task list filtered by both. Where should `filteredTasks` live?",
          [
            "Обчислювати напряму під час рендеру з `tasks`, `query` та `status` без окремого `useState` і `useEffect`",
            "Синхронізувати через три `useEffect` в окремий `useState`",
            "Зберігати в `window.filteredTasks`",
            "Дублювати копію масиву в кожному дочірньому компоненті",
          ],
          0,
          why(
            "Згідно з Thinking in React, похідні значення не зберігають у стані — це усуває розсинхрон і зайві ререндери.",
            "Following Thinking in React, derive filtered lists during render instead of mirroring state in effects.",
          ),
        ), optionsEn: ["Derive it during render from tasks, query, and status without separate state and effects", "Synchronize it into another state with three effects", "Store it in window.filteredTasks", "Duplicate the array in every child"] },
        { ...codeRead(
          "rf-arf2",
          "Знайдіть причину розсинхрону копії пропсів: Що трапиться, якщо батько переключиться на іншу задачу без `key={task.id}`?",
          "Diagnose stale prop copy bug: What happens when the parent selects another task without `key={task.id}`?",
          "tsx",
          "function TaskEditor({ initialTitle }: { initialTitle: string }) {\n  const [title, setTitle] = useState(initialTitle);\n  return <input value={title} onChange={(e) => setTitle(e.target.value)} />;\n}",
          [
            "Інпут може зберегти поточну локальну чернетку першої задачі, бо `initialTitle` ініціалізує стан при монтуванні",
            "React автоматично скине `title` при зміні будь-якого prop",
            "Компонент впаде з ErrorBoundary",
            "`onChange` перестане працювати",
          ],
          0,
          why(
            "Ключ за id може скинути весь локальний стан при зміні задачі; перед цим визначте, що робити з незбереженою чернеткою. Інший варіант — керувати полем через власника стану.",
            "A key based on id can reset all local state on a task change; first decide what happens to an unsaved draft. Another option is a controlled field owned by the parent.",
          ),
        ) as Extract<Exercise, { type: "code_read" }>, optionsEn: ["The input can retain the first task’s local title because initialTitle initializes state only on mount", "React resets title on every prop change", "The component throws an ErrorBoundary", "onChange stops working"] },
      ], { baseXp: 24 },
    ),
    lesson(
      "rf-arf-routing-server-state",
      "Маршрутизація, URL-стан та серверні стани",
      "Routing, URL State & Resilient Fetching",
      3, false, [
      concept("rf-arf-routing-server-state-concept", "URL і стани запиту", "URL and request states", {
        uk: "Параметри URL підходять для фільтрів, якими діляться або переміщуються кнопками браузера. Для запитів відобразіть loading, error і успішний результат; порожній стан перевіряйте після успіху. Скасовуйте непотрібну роботу та захищайте стан від застарілих відповідей.",
        en: "URL parameters suit filters that users share or navigate with browser controls. For requests, render loading, error, and successful results; check for empty data after success. Cancel obsolete work and protect state from stale responses.",
      }),
        codeOrderAuto(
          "rf-arf3",
          "Для статусів loading, error і success впорядкуйте перевірки: loading, потім error, а порожній список — лише після них.",
          "For loading, error, and success statuses, order the checks: loading first, then error, and empty data only after them.",
          "tsx",
          [
            "if (status === \"loading\") return <LoadingBanner />;",
            "if (status === \"error\") return <ErrorRetry onRetry={reload} />;",
            "if (items.length === 0) return <EmptyState />;",
            "return <TaskList items={items} />;",
          ],
          why(
            "Спершу перевіряють loading та error (з кнопкою Retry), і лише коли дані успішно завантажені й порожні — EmptyState.",
            "Check loading and error with retry before empty state, preventing blank/misleading empty screens on failure.",
          ),
        ),
        { ...mcq(
          "rf-arf4",
          "Навіщо в `useEffect` передавати `AbortController` у функцію завантаження даних?",
          "Why pass an `AbortController` created inside `useEffect` to your fetch call?",
          [
            "Щоб при швидкій зміні маршруту чи параметра фільтра скасувати застарілий запит у cleanup",
            "Щоб перетворити React-компонент на Web Worker",
            "Щоб обійти валідацію сервера",
            "Щоб вимкнути StrictMode в розробці",
          ],
          0,
          why(
            "Cleanup `controller.abort()` допомагає скасувати запит; також перевіряйте актуальність результату перед оновленням стану, адже скасування не гарантує зупинку вже завершеної роботи.",
            "Cleanup with `controller.abort()` helps cancel a request; also guard state updates against stale results because cancellation does not guarantee already completed work stops.",
          ),
        ), optionsEn: ["Cancel an obsolete request in cleanup when route or filter changes", "Convert the component into a Web Worker", "Bypass server validation", "Disable StrictMode"] },
      ], { baseXp: 25 },
    ),
    lesson(
      "rf-arf-a11y-forms-rtl",
      "Доступні форми та тестування компонентів",
      "Accessible Forms & Component Testing",
      3, false, [
      concept("rf-arf-a11y-forms-rtl-concept", "Доступна форма і перевірка", "Accessible forms and tests", {
        uk: "Пов’язуйте кожне поле з підписом, а повідомлення про помилку — з полем через aria-describedby за потреби. Тести за роллю та доступною назвою перевіряють важливу семантику, але не замінюють повного аудиту доступності чи перевірки з допоміжними технологіями.",
        en: "Associate every field with a label and connect error feedback with aria-describedby when appropriate. Tests by role and accessible name check important semantics, but do not replace a full accessibility audit or assistive technology testing.",
      }),
        { ...mcq(
          "rf-arf5",
          "У тесті React Testing Library який запит перевіряє роль і доступну назву кнопки замість внутрішнього CSS-класу?",
          "In React Testing Library, which query checks a button's role and accessible name instead of an internal CSS class?",
          [
            "`screen.getByRole(\"button\", { name: /save task/i })`",
            "`container.querySelector(\"div > div:nth-child(3)\")`",
            "`wrapper.state(\"isSubmitting\")`",
            "`document.getElementsByClassName(\"btn-submit-1\")[0]`",
          ],
          0,
          why(
            "Запит за роллю та доступною назвою перевіряє частину семантики; поведінку натискання й роботу з допоміжними технологіями перевіряйте окремо.",
            "A role-and-name query checks part of the semantics; test click behavior and assistive technology separately.",
          ),
        ), optionsEn: ["screen.getByRole(\"button\", { name: /save task/i })", "container.querySelector(\"div > div:nth-child(3)\")", "wrapper.state(\"isSubmitting\")", "document.getElementsByClassName(\"btn-submit-1\")[0]"] },
        codeFill(
          "rf-arf6",
          "Зв'язати підпис помилки з полем форми",
          "Link error feedback to input element",
          "tsx",
          "<input id=\"title\" aria-invalid={Boolean(err)} aria-___={err ? \"title-err\" : undefined} />",
          ["describedby"],
          true,
          why(
            "`aria-describedby` підказує скрінрідеру точне повідомлення про помилку поля.",
            "`aria-describedby` associates the validation message programmatically with the input.",
          ),
        ),
      ], { baseXp: 25 },
    ),
    exam("rf-arf-exam", "Контрольна: архітектура і тестування React", "Checkpoint: React Architecture & Tests", 3, [
      { ...mcq(
        "rf-arf-e1",
        "Який підхід найкраще зменшує дублювання стану в багаторівневій формі?",
        "Which strategy helps reduce duplicate state bugs in multi-section React forms?",
        [
          "Одне джерело правди (single source of truth) у найближчому спільному предку або URL",
          "Копіювання всіх полів у 5 різних `useState`",
          "Таймер `setInterval`, що копіює DOM-значення",
          "Зміна пропсів напряму без callback",
        ],
        0,
      ), optionsEn: ["Keep one source of truth in the nearest shared owner or URL where appropriate", "Copy every field into five different states", "Copy DOM values with setInterval", "Mutate props directly without a callback"] },
      { ...mcq(
        "rf-arf-e2",
        "Якщо компонент падає під час кліку на кнопку «Повторити» при 500 від API, що має перевірити компонентний тест?",
        "What should a component test verify when clicking Retry after an API 500 error?",
        [
          "Відображається alert/повідомлення про помилку, а клік Retry запускає повторний запит і рендерить отримані задачі",
          "Лише те, що `useState` викликано 3 рази",
          "Назву CSS-модуля",
          "Внутрішній індекс Fiber-ноди",
        ],
        0,
      ), optionsEn: ["Show the error and verify Retry triggers a new request and renders returned tasks", "Only count useState calls", "Check the CSS module name", "Check the internal Fiber index"] },
      codeFill(
        "rf-arf-e3",
        "Семантичний контейнер статусу завантаження",
        "Accessible loading status attribute",
        "tsx",
        "<div ___=\"status\">Loading tasks...</div>",
        ["role"],
        true,
      ),
    ]),
  ],
);

export const reactFundamentalsContent: CourseContent = {
  slug: "react_fundamentals",
  titleUk: "React: fundamentals",
  titleEn: "React Fundamentals",
  descriptionUk:
    "Компоненти, props, useState, lists/keys, useEffect, forms, composition, hooks advanced + контрольні.",
  descriptionEn:
    "Components, props, useState, lists/keys, useEffect, forms, composition, advanced hooks + unit exams.",
  icon: "⚛️",
  color: "#61DAFB",
  units: [
    intro,
    components,
    stateU,
    lists,
    effects,
    forms,
    composition,
    hooksAdv,
    hooksMore,
    appliedReactResilience,
    architectureRoutingForms,
    capstone,
  ],
};
