import type { CourseContent } from "./types.js";
import {
  codeFill,
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

const appRouting = unit(
  "nx_app_routing",
  "App Router: файловий роутінг, Layouts та Error Boundaries",
  "App Router, Layouts, Loading & Error States",
  [
    lesson(
      "nx-ar-files",
      "Конвенції `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`",
      "Special Files in App Router Segments",
      3, true, [
        matchEx(
          "nx-ar1",
          "Зіставте спеціальний файл маршруту App Router з його роллю",
          "Match each Next.js App Router file convention to its purpose",
          [
            { left: "page.tsx", right: "Робить сегмент URL доступним маршрутом" },
            { left: "layout.tsx", right: "Спільна оболонка, що зберігає стан при навігації між дочірніми сторінками" },
            { left: "loading.tsx", right: "Миттєвий Suspense fallback під час потокового завантаження сегмента" },
            { left: "error.tsx", right: "Client Error Boundary для локалізованого відновлення без крашу всього layout" },
          ],
        ),
        mcq(
          "nx-ar2",
          "Чому файл `error.tsx` обов'язково повинен мати директиву `'use client'` на початку файлу?",
          "Why does Next.js require `'use client'` at the top of `error.tsx`?",
          [
            "Error boundaries у React перехоплюють помилки виконання та викликають інтерактивний `reset()` у браузері на клієнті",
            "Серверні файли не можуть містити JSX",
            "Тому що error.tsx компілюється в CSS",
            "Без цього маршрути повертають 204 No Content",
          ],
          0,
        ),
      ], { baseXp: 24 },
    ),
    exam("nx-ar-exam", "Контрольна: роутінг App Router", "Checkpoint: App Router Foundations", 3, [
      codeFill(
        "nx-ar-e1",
        "Директива клієнтської межі на початку error.tsx",
        "Client directive required for Next.js error boundary",
        "tsx",
        "\"use ___\";\nexport default function Error({ reset }: { reset: () => void }) { ... }",
        ["client"],
        true,
      ),
      { ...mcq(
        "nx-ar-e2",
        "Де обробити помилку в `app/dashboard/layout.tsx`, якщо `app/dashboard/error.tsx` розташований у тому самому сегменті?",
        "Where should an error from `app/dashboard/layout.tsx` be handled if `app/dashboard/error.tsx` is in the same segment?",
        ["У межі помилки батьківського сегмента", "Лише в error.tsx того самого сегмента", "У loading.tsx того самого сегмента", "У браузерному localStorage"],
        0,
        why("Межа error.tsx розташована всередині layout того самого сегмента; для root layout потрібен global-error.tsx.", "The same-segment error boundary is nested inside its layout; root layout errors require global-error.tsx."),
      ), optionsEn: ["In the parent segment's error boundary", "Only in error.tsx of the same segment", "In loading.tsx of the same segment", "In browser localStorage"] },
    ]),
  ],
);

const serverClientBoundaries = unit(
  "nx_server_client_boundaries",
  "Межі Server і Client Components (`'use client'`)",
  "Server vs Client Component Boundaries",
  [
    lesson(
      "nx-scb-boundary",
      "Згідно з документацією Next.js: що лишати на сервері і де ставити `'use client'`",
      "Pushing 'use client' Down the Component Tree",
      3, true, [
        mcq(
          "nx-scb1",
          "Сторінка проєкту ForgeBoard читає дані на сервері, а всередині є одна кнопка-перемикач фільтра з `useState`. Де краще поставити `'use client'`?",
          "A ForgeBoard page fetches project metadata on the server and renders a single interactive filter toggle with `useState`. Where should `'use client'` go?",
          [
            "Лише в маленькому інтерактивному острові (`FilterBarClient`), залишаючи `page.tsx` та статичний список як Server Components",
            "На кореневому `app/layout.tsx`, щоб усі дочірні стали клієнтськими",
            "Видалити React-хуки та використовувати `document.write`",
            "Створити окремий сервер Express на кожен компонент",
          ],
          0,
          why(
            "Вузькі межі `'use client'` мінімізують JS-бандл клієнта й дають серверним компонентам прямий безпечний доступ до джерел даних.",
            "Keeping `'use client'` at leaf islands minimizes browser JS payload and keeps server data fetching isolated.",
          ),
        ),
        codeRead(
          "nx-scb2",
          "Виявіть порушення межі серіалізації між Server і Client: Чому Next.js впаде при передачі функції `formatDate` із Server Component у Client Component?",
          "Diagnose non-serializable prop crossing Server -> Client boundary: Why does Next.js fail passing a plain helper function `formatDate` from Server to Client Component?",
          "tsx",
          "// Server Component (page.tsx)\nexport default function Page() {\n  const formatDate = (d: Date) => d.toISOString();\n  return <ClientBoard onFormat={formatDate} />; // BUG\n}",
          [
            "Пропси через RSC-межу мають бути серіалізованими (дані/JSON/primitives або Server Action з `'use server'`), а довільні функції не серіалізуються по мережі",
            "Дати `Date` заборонені в JavaScript",
            "Client Components не приймають жодних props",
            "`Page` не має слова `async`",
          ],
          0,
        ),
      ], { baseXp: 25 },
    ),
    exam("nx-scb-exam", "Контрольна: Server vs Client межі", "Checkpoint: Server & Client Boundaries", 3, [
      mcq(
        "nx-scb-e1",
        "Яке правило керує перетином `'use client'` при імпорті?",
        "What happens when a `'use client'` module imports a sibling helper module?",
        [
          "Імпортований модуль автоматично входить у клієнтський бандл — тому DB-драйвери й секрети ніколи не мають імпортуватись із Client Components",
          "Client файл виконується суто на сервері Postgres",
          "Секретні змінні оточення без `NEXT_PUBLIC_` автоматично шифруються в браузері",
          "Next.js мовчки пропускає імпорт",
        ],
        0,
      ),
      { ...mcq(
        "nx-scb-e2",
        "Server Component має передати інтерактивному Client Component функцію форматування дати. Який варіант коректний?",
        "A Server Component needs a Client Component to format a date interactively. Which approach is valid?",
        ["Передати серіалізоване значення дати й визначити звичайну функцію форматування в клієнтському модулі", "Передати довільне серверне замикання як prop", "Передати пароль БД для форматування", "Вимкнути всі props клієнтського компонента"],
        0,
        why("Звичайна серверна функція не серіалізується через межу; форматування можна виконати в клієнтському модулі.", "A plain server function is not serializable across the boundary; formatting can live in the client module."),
      ), optionsEn: ["Pass a serializable date value and define the formatter in the client module", "Pass an arbitrary server closure as a prop", "Pass the database password for formatting", "Disable all props on the client component"] },
    ]),
  ],
);

const dataAccess = unit(
  "nx_data_access",
  "Доступ до даних, Streaming та витік серверних секретів",
  "Server Data Access, Streaming & Secret Isolation",
  [
    lesson(
      "nx-da-env",
      "`NEXT_PUBLIC_` проти приватних секретів і Data Access Layer",
      "Private Env Vars & Server-Only Data Access",
      3, true, [
        mcq(
          "nx-da1",
          "Розробник перейменував `DATABASE_URL` на `NEXT_PUBLIC_DATABASE_URL` і прямо звернувся до `process.env.NEXT_PUBLIC_DATABASE_URL` у клієнтському коді. Який ризик під час збірки?",
          "A developer renamed `DATABASE_URL` to `NEXT_PUBLIC_DATABASE_URL` and directly references `process.env.NEXT_PUBLIC_DATABASE_URL` in client code. What is the build-time risk?",
          [
            "Рядок підключення та пароль БД зашили прямо у публічний JavaScript браузера — це критичний витік секрету!",
            "Next.js автоматично захистив його паролем адміна",
            "Змінна стала доступною лише на PostgreSQL-порту",
            "Нічого, клієнтський бандл ніхто не бачить",
          ],
          0,
          why(
            "Прямі звернення до `NEXT_PUBLIC_` можуть вбудовувати значення під час збірки в браузерний JavaScript. Динамічний доступ має іншу поведінку, але префікс означає, що значення слід вважати публічним; секрети лишаються на сервері.",
            "Direct references to `NEXT_PUBLIC_` values can be inlined into client JavaScript at build time. Dynamic lookups behave differently, but treat the prefix as public; keep credentials on the server.",
          ),
        ),
        codeFill(
          "nx-da2",
          "Гарантувати помилку збірки, якщо серверний модуль даних випадково імпортують у Client Component",
          "Guard server-only DB module against accidental client import",
          "ts",
          "import \"server-___\";\nexport async function listUserTasks(userId: number) { ... }",
          ["only"],
          true,
        ),
      ], { baseXp: 25 },
    ),
    exam("nx-da-exam", "Контрольна: доступ до даних Next.js", "Checkpoint: Server Data Access", 3, [
      mcq(
        "nx-da-e1",
        "Як безпечно передати дані задачі з Server Component у Client UI, якщо об'єкт у БД містить приватне поле `internalAuditNote`?",
        "A DB row includes `internalAuditNote`. How must Server Components pass task data to a Client Component?",
        [
          "Сформувати явний DTO/projection без приватних полів перед передачею через RSC props (serialized boundary)",
          "Передати увесь сирий об'єкт користувача — браузер покаже тільки те, що в JSX",
          "Скласти у `NEXT_PUBLIC_` змінну",
          "Додати атрибут `hidden` в HTML",
        ],
        0,
      ),
      { ...mcq(
        "nx-da-e2",
        "Серверний модуль БД випадково імпортували у Client Component. Який захист допомагає виявити помилку на етапі збірки?",
        "A server database module is accidentally imported by a Client Component. Which guard helps catch this during the build?",
        ["Імпортувати `server-only` у серверному модулі та залишити доступ до БД на сервері", "Перейменувати DATABASE_URL на NEXT_PUBLIC_DATABASE_URL", "Приховати компонент CSS-стилем", "Повернути клієнту повний об’єкт з усіма секретами"],
        0,
        why("Маркер server-only забороняє клієнтський імпорт серверного модуля; він не замінює авторизацію.", "The server-only marker rejects a client import of the server module; it does not replace authorization."),
      ), optionsEn: ["Import `server-only` in the server module and keep database access on the server", "Rename DATABASE_URL to NEXT_PUBLIC_DATABASE_URL", "Hide the component with CSS", "Return the full object and all secrets to the client"] },
    ]),
  ],
);

const mutationsActions = unit(
  "nx_mutations_actions",
  "Мутації: Route Handlers, Server Actions і валідація",
  "Mutations: Route Handlers & Server Actions",
  [
    lesson(
      "nx-ma-contracts",
      "Чому Server Actions та Route Handlers — це публічні HTTP endpoints",
      "Validating & Authorizing Every Mutation Endpoint",
      4, true, [
        mcq(
          "nx-ma1",
          "Чи можна пропустити Zod-валідацію й перевірку сесії всередині `'use server'` Server Action, бо його «викликає лише наш React-компонент»?",
          "Can you skip Zod validation and session auth inside a `'use server'` Server Action because only your form invokes it?",
          [
            "Ні! Server Actions та Route Handlers доступні як HTTP POST-запити — кожен виклик вимагає повторної автентифікації, перевірки власника і Zod-схеми",
            "Так, Server Actions закриті апаратним токеном компілятора",
            "Так, якщо функція повертає `void`",
            "Валідація потрібна лише у Page Router",
          ],
          0,
          why(
            "Як наголошує документація Next.js з безпеки даних: кожна Server Action є публічно досяжним POST-ендпоїнтом.",
            "Next.js security guidance stresses treating every Server Action like an unauthenticated HTTP POST until session + ownership + Zod run.",
          ),
        ),
        codeOrderAuto(
          "nx-ma2",
          "Послідовність безпечної мутації задачі в Server Action / Route Handler",
          "Order a secure task update mutation handler",
          "ts",
          [
            "Authenticate caller via server session helper (or reject 401)",
            "Validate raw FormData/JSON payload with Zod schema",
            "Verify ownership and mutate Postgres inside parameterized query",
            "Call revalidatePath/tag and return clean structured state",
          ],
        ),
      ], { baseXp: 26 },
    ),
    exam("nx-ma-exam", "Контрольна: мутації в Next.js", "Checkpoint: Secure Mutations", 4, [
      mcq(
        "nx-ma-e1",
        "Коли краще обрати Route Handler (`app/api/.../route.ts`), а коли Server Action?",
        "When do you choose an explicit Route Handler vs a Server Action?",
        [
          "Route Handler зручний для явних REST/webhook API-контрактів і зовнішніх клієнтів/мобільних додатків; Server Action — для пов'язаних із формами мутацій + миттєвої ревалідації дерева",
          "Server Actions заборонені з PostgreSQL",
          "Route Handlers не підтримують JSON",
          "Між ними немає жодної різниці в транспорті",
        ],
        0,
      ),
      { ...mcq(
        "nx-ma-e2",
        "Залогінений користувач змінює taskId у запиті Server Action на ID чужої задачі. Що має перевірити сервер перед оновленням?",
        "A signed-in user changes taskId in a Server Action request to another user's task. What must the server check before updating?",
        ["Валідність введення та право цього користувача змінювати конкретну задачу в точці доступу до даних", "Лише те, що кнопка форми була видимою", "Лише формат taskId, без перевірки прав", "Лише наявність cookie без перевірки сесії"],
        0,
        why("Дані клієнта не доводять право на ресурс: перевіряйте сесію, вхідні дані й права для конкретної задачі.", "Client input does not prove resource access: verify the session, input and permission for the specific task."),
      ), optionsEn: ["Validate input and authorize this user to modify the specific task at the data-access boundary", "Only check whether the form button was visible", "Only validate taskId format without checking permission", "Only check that a cookie exists without verifying the session"] },
    ]),
  ],
);

const identityAuthz = unit(
  "nx_identity_authz",
  "Ідентифікація та пастки Next.js Middleware",
  "Identity & Authorization Beyond Middleware",
  [
    lesson(
      "nx-ia-dal",
      "Чому не можна покладатись виключно на `middleware.ts` для захисту даних",
      "Defense in Depth: Never Rely Solely on Middleware",
      4, false, [
        mcq(
          "nx-ia1",
          "У проєкті налаштували редірект у `middleware.ts` на `/login`, якщо немає cookie. Чи достатньо цього без перевірок у Server Components / Data Access Layer / API?",
          "A project checks session cookies only in `middleware.ts`. Why is this insufficient for authorization?",
          [
            "Потрібне глибоке ешелонування (verify-at-DAL): лише наявність cookie не доводить валідність у БД чи права власника на конкретний ресурс, плюс конфіг matcher легко проґавити",
            "Middleware завжди повертає 200 OK на все",
            "Cookie не існує на HTTPS",
            "Middleware уповільнює SQL-індекси",
          ],
          0,
          why(
            "Надійний паттерн — перевіряти сесію + права безпосередньо в точці доступу до даних (Data Access Layer), а middleware використовувати для швидкого UX-редіректу.",
            "Verify identity and resource permissions right inside the Data Access Layer and handlers, using middleware only as an early UX convenience.",
          ),
        ),
      ], { baseXp: 26 },
    ),
    exam("nx-ia-exam", "Контрольна: identity & authz у Next.js", "Checkpoint: Identity & Authz", 4, [
      mcq(
        "nx-ia-e1",
        "Під час переходу клієнта в App Router чи варто довіряти самому факту наявності заголовка `cookie` без перевірки токена на сервері?",
        "Is checking `Boolean(cookies().get('session'))` enough to authorize access to user tasks?",
        [
          "Ні, токен має бути верифікований проти БД/підпису і прив'язаний до конкретного `userId`, не протермінований та не очікувати MFA",
          "Так, якщо cookie має довжину > 2 символи",
          "Так, на рівні React Client Component",
          "Достатньо перевірити тільки `User-Agent`",
        ],
        0,
      ),
      { ...mcq(
        "nx-ia-e2",
        "Сесія користувача дійсна, але запит вказує на задачу іншої організації. Яка перевірка ще потрібна?",
        "The user's session is valid, but the request targets a task in another organization. What additional check is required?",
        ["Перевірити право користувача на конкретну організацію і задачу в серверному шарі даних", "Перевірити лише довжину cookie", "Довіритися прихованій кнопці в браузері", "Додати атрибут hidden до відповіді"],
        0,
        why("Автентифікація встановлює особу; авторизація визначає доступ до конкретного ресурсу.", "Authentication establishes identity; authorization determines access to the specific resource."),
      ), optionsEn: ["Authorize the user's access to the specific organization and task in the server data layer", "Check only cookie length", "Trust a hidden browser button", "Add the hidden attribute to the response"] },
    ]),
  ],
);

const cachingFailures = unit(
  "nx_caching_failures",
  "Кешування, динамічні дані та стани збою",
  "Caching, Revalidation & Failure States",
  [
    lesson(
      "nx-cf-stale-cache",
      "Персоналізовані дані, `revalidatePath` та запобігання витоку кешу",
      "Preventing Cross-User Cache Leaks & Stale Reads",
      4, false, [
        mcq(
          "nx-cf1",
          "Персональну сторінку задач `/board` закешували спільною для всіх користувачів без урахування сесійного cookie. Який критичний баг це створює?",
          "A personalized `/board` server render gets cached statically across requests without session isolation. What bug happens?",
          [
            "Користувач B може побачити кешований HTML зі списком приватних задач користувача A!",
            "Користувачу A оновлюється шрифт на Arial",
            "Postgres видаляє кеш браузера",
            "Сторінка стає вдвічі довшою по висоті",
          ],
          0,
          why(
            "У Next.js 15 читання `cookies()` / `headers()` зазвичай виключає маршрут із Full Route Cache, але Data Cache може залишатися активним. Окремо перевіряйте авторизацію та не кешуйте приватні дані спільним ключем; використовуйте no-store або безпечну ізоляцію кешу.",
            "In Next.js 15, reading cookies normally opts the route out of the Full Route Cache, but the Data Cache can still be active. Independently enforce authorization and avoid a shared cache key for private data; use no-store or safe cache isolation.",
          ),
        ),
        { ...mcq(
          "nx-cf-data-cache",
          "Сторінка читає session cookie та рендериться динамічно, але функція завантаження приватних задач кешується спільним ключем. Чи достатньо динамічного рендеру для ізоляції даних?",
          "A page reads a session cookie and renders dynamically, but its private task loader uses a shared cache key. Does dynamic rendering alone isolate user data?",
          [
            "Ні: Data Cache може працювати окремо; перевіряйте права та вимкніть спільний кеш приватних даних або забезпечте безпечну ізоляцію",
            "Так: cookies автоматично очищує кожен кеш даних",
            "Так: приховане поле HTML гарантує ізоляцію",
            "Так: revalidatePath замінює перевірку прав",
          ],
          0,
          why(
            "Динамічний рендер і кеш даних — різні механізми. Перевірка прав потрібна до кожного доступу до приватних даних.",
            "Dynamic rendering and the Data Cache are separate. Authorize each access to private data.",
          ),
        ), optionsEn: [
          "No: the Data Cache can remain active; authorize access and avoid a shared cache key for private data",
          "Yes: cookies automatically clears every data cache",
          "Yes: a hidden HTML field guarantees isolation",
          "Yes: revalidatePath replaces authorization",
        ] },
        codeFill(
          "nx-cf2",
          "Примусово оновити кеш сторінки після успішної мутації",
          "Invalidate route cache right after DB mutation",
          "ts",
          "___(\"/board\");",
          ["revalidatePath"],
          true,
        ),
      ], { baseXp: 26 },
    ),
    exam("nx-cf-exam", "Контрольна: кешування і стани збоїв", "Checkpoint: Caching & Failures", 4, [
      mcq(
        "nx-cf-e1",
        "Якщо зовнішній API впав під час серверного рендеру і з кешу повернули помилку/fallback, що має показати Next.js сторінка користувачу?",
        "How should an App Router segment behave cleanly when backend fetches fail?",
        [
          "Перехопити контрольовано або передати у `error.tsx` з зрозумілим повідомленням та кнопкою повторної спроби (`reset()`), не показуючи порожній екран мовчки",
          "Показати білий екран 500 зі стектрейсом SQL-паролів",
          "Зробити нескінченний редірект на самого себе",
          "Стерти локальне сховище браузера",
        ],
        0,
      ),
      { ...mcq(
        "nx-cf-e2",
        "Динамічний маршрут читає cookie, але приватні дані задач кешуються спільним ключем. Як запобігти витоку?",
        "A dynamic route reads cookies, but private task data is cached under a shared key. How do you prevent a leak?",
        ["Перевірити права та відмовитися від спільного кешу приватних даних або забезпечити безпечну ізоляцію", "Вважати, що cookies автоматично вимкнули Data Cache", "Приховати дані CSS-стилем", "Замінити авторизацію викликом revalidatePath"],
        0,
        why("Динамічний рендер не гарантує ізоляцію Data Cache; права перевіряють незалежно від кешування.", "Dynamic rendering does not guarantee Data Cache isolation; authorization is independent of caching."),
      ), optionsEn: ["Authorize access and avoid a shared cache for private data or ensure safe isolation", "Assume cookies automatically disabled the Data Cache", "Hide the data with CSS", "Replace authorization with revalidatePath"] },
    ]),
  ],
);

const deployDiagnosticsCapstone = unit(
  "nx_deploy_diagnostics_capstone",
  "Збірка, діагностика та ForgeBoard у Next.js (M11)",
  "Build Diagnostics & Next.js ForgeBoard Lab",
  [
    lesson(
      "nx-dd-prod-diag",
      "Типові помилки `next build`: hydration mismatch, env та runtime",
      "Diagnosing Hydration Mismatches & Build Traps",
      4, false, [
        codeRead(
          "nx-dd1",
          "Знайдіть причину `Hydration failed because the server rendered text didn't match the client`: Чому час на сервері й у браузері не збігається при гідратації?",
          "Diagnose hydration mismatch bug: Why does SSR HTML disagree with client hydration here?",
          "tsx",
          "export function TaskTime() {\n  return <span>{new Date().toLocaleTimeString()}</span>;\n}",
          [
            "Недетермінований виклик `new Date()` під час рендеру дає різну мілісекунду/таймзону на сервері і клієнті; передайте однаковий попередньо відформатований рядок або рендерте локальний час після монтування (`useEffect`); сама фіксована дата без однакової локалі та часової зони може форматуватися по-різному",
            "Тому що `<span>` заборонений у Next.js",
            "`toLocaleTimeString()` не працює в Google Chrome",
            "Помилка через TypeScript версію",
          ],
          0,
        ),
      ], { baseXp: 26 },
    ),
    lesson(
      "nx-forgeboard-app-lab",
      "Лаб: реалізація ForgeBoard із Next.js межами Server/Client (M11)",
      "Lab: ForgeBoard Full-Stack Boundaries in Next.js (M11)",
      4, false, [
        mcq(
          "nx-fb1",
          "У Milestone 11 ви будуєте/перевіряєте другу архітектуру ForgeBoard з явним поділом Server Data Access (без секретів у клієнті), клієнтських інтерактивних островів, валідованих мутацій і `error.tsx` відновлення. У чому головна архітектурна відмінність від чистого SPA + Express?",
          "In Milestone 11 you inspect architectural choices of ForgeBoard with explicit Server/Client boundaries vs a separate SPA + Express API. What is the key shift?",
          [
            "Початковий HTML, завантаження даних без витоку секретів і мутації інтегровані біля маршрутів із вузькими `'use client'` межами замість суцільного браузерного бандлу, але правила серверної авторизації та валідації лишаються настільки ж суворими",
            "У Next.js можна прибрати будь-яку перевірку авторизації, бо сервер і фронтенд у одному репо",
            "PostgreSQL працює всередині браузера",
            "React-компоненти більше не використовують props",
          ],
          0,
        ),
        codeProject(
          "nx-fb2",
          "Створіть серверну проекцію DTO з id, title і status без приватного поля. Вбудована перевірка шукає фрагменти коду; M11 нижче перевіряє витоки та клієнтські межі.",
          "Create a server DTO projection containing id, title, and status without the private field. The in-app check searches for code fragments; M11 below tests leaks and client boundaries.",
          [
            {
              id: "tsx",
              name: "board-boundary.tsx",
              language: "tsx",
              starter: `export function toPublicTaskDto(row: { id: number; title: string; status: string; internalSecretNote?: string }) {\n  // TODO: return only public fields\n  return {};\n}\n`,
            },
          ],
          [
            { fileId: "tsx", contains: ["toPublicTaskDto", "id: row.id", "title: row.title", "status: row.status"] },
          ],
          {
            hintUk: "Завантажте локальний лаб-пакет M11 нижче для тестів витоку приватних полів, Server/Client меж та валідованих мутацій.",
            hintEn: "Download M11 below for automated tests covering boundary isolation, safe DTO projections, and validated mutations.",
          },
        ),
      ], { baseXp: 45 },
    ),
    exam("nx-dd-exam", "Контрольна: фінальна діагностика Next.js", "Checkpoint: Next.js Full-Stack", 4, [
      mcq(
        "nx-dd-e1",
        "Який набір перевірок найкраще знижує ризик помилок Server/Client межі перед релізом Next.js?",
        "Which check suite best reduces the risk of leaking server modules or broken hydration before release?",
        [
          "Strict TypeScript check + production build (`next build`) + тести DAL/мутацій на authz/DTO + smoke перевірка завантаження сторінки",
          "Лише запуск dev server на 1 секунду",
          "Переіменування файлів у `.jsx`",
          "Вимкнення `'use client'` всюди",
        ],
        0,
      ),
      { ...mcq(
        "nx-dd-e2",
        "Сервер і браузер форматують одну дату з різними часовими зонами під час першого рендеру. Як уникнути розбіжності гідратації?",
        "Server and browser format the same date in different time zones on the initial render. How can you avoid a hydration mismatch?",
        ["Передати однаковий форматований рядок для першого рендеру або показати локальний час після монтування", "Припустити, що фіксована дата завжди дає однаковий локальний рядок", "Додати секрет БД у клієнтський код", "Вимкнути серверну авторизацію"],
        0,
        why("Однакові початкові значення та форматування узгоджують HTML сервера й перший рендер клієнта.", "Matching initial values and formatting keep server HTML and the first client render consistent."),
      ), optionsEn: ["Pass the same formatted string for the initial render or show local time after mounting", "Assume a fixed date always has the same local formatting", "Add the database secret to client code", "Disable server authorization"] },
    ]),
  ],
);

export const nextjsFullstackContent: CourseContent = {
  slug: "nextjs_fullstack",
  titleUk: "Full-Stack застосунки з Next.js",
  titleEn: "Full-Stack Applications with Next.js",
  descriptionUk:
    "App Router, явні межі Server/Client Components, серверний доступ до даних без витоку секретів, безпечні мутації, authz поза middleware, кешування та ForgeBoard у Next.js.",
  descriptionEn:
    "App Router, explicit Server/Client boundaries, isolated server data access, validated mutations, authz beyond middleware, caching/error states, and Next.js ForgeBoard.",
  icon: "▲",
  color: "#111827",
  units: [
    appRouting,
    serverClientBoundaries,
    dataAccess,
    mutationsActions,
    identityAuthz,
    cachingFailures,
    deployDiagnosticsCapstone,
  ],
};

// The base builder accepts Ukrainian choices; attach the corresponding English choices by exercise ID.
const englishChoices: Record<string, string[]> = {
  "nx-ar2": ["React error boundaries require a Client Component and provide an interactive reset", "Server files cannot contain JSX", "error.tsx compiles to CSS", "Routes return 204 without it"],
  "nx-scb1": ["Put the directive on the small interactive FilterBarClient and keep server data work on the server", "Put it on the root layout to make everything client-side", "Remove hooks and use document.write", "Create an Express server for every component"],
  "nx-scb2": ["Props crossing the RSC boundary must be serializable; an ordinary server closure is not", "Date is forbidden in JavaScript", "Client Components cannot receive props", "Page must always be async"],
  "nx-scb-e1": ["Its imports become part of the client module graph; keep DB drivers and secrets out", "The client file runs only inside Postgres", "Private environment variables are encrypted in the browser", "Next.js silently ignores the import"],
  "nx-da1": ["The database connection string can be inlined into public browser JavaScript", "Next.js automatically protects it with an admin password", "The value is available only on the PostgreSQL port", "Nothing: nobody can inspect client bundles"],
  "nx-da-e1": ["Create an explicit DTO without private fields before passing RSC props", "Pass the entire raw object because JSX hides unused fields", "Store it in a NEXT_PUBLIC_ variable", "Add the hidden HTML attribute"],
  "nx-ma1": ["No: validate input, verify the session and authorize access in the server endpoint", "Yes: a compiler hardware token closes Server Actions", "Yes, if the function returns void", "Validation is only needed in the Pages Router"],
  "nx-ma-e1": ["Use a Route Handler for explicit APIs or webhooks and a Server Action for form-related mutations", "Server Actions cannot use PostgreSQL", "Route Handlers cannot return JSON", "There is no difference in transport"],
  "nx-ia1": ["Verify the session and resource permissions in the data layer; a cookie's presence and middleware matcher are insufficient", "Middleware always returns 200", "Cookies do not exist over HTTPS", "Middleware slows SQL indexes"],
  "nx-ia-e1": ["No: verify session validity and the user's authorization for the resource", "Yes, if the cookie is longer than two characters", "Yes, in a React Client Component", "Checking User-Agent alone is enough"],
  "nx-cf1": ["User B could see user A's private tasks in the cached HTML", "User A's font changes to Arial", "Postgres deletes the browser cache", "The page becomes twice as tall"],
  "nx-cf-e1": ["Handle the failure or render error.tsx with a clear message and retry", "Show a blank 500 screen with database passwords", "Redirect endlessly to the same page", "Delete browser local storage"],
  "nx-dd1": ["The current time and time zone can differ on server and client; share an initial string or render local time after mount", "A span is forbidden in Next.js", "toLocaleTimeString never works in Chrome", "TypeScript itself causes the error"],
  "nx-fb1": ["Rendering, server data access and mutations are integrated near routes with narrow client boundaries, while authorization remains essential", "Next.js removes the need for authorization", "Postgres runs in the browser", "React components no longer use props"],
  "nx-dd-e1": ["Typecheck, production build, authorization and DTO tests, plus a page smoke test", "Run the dev server for one second", "Rename files to .jsx", "Disable use client everywhere"],
};

for (const courseUnit of nextjsFullstackContent.units) {
  for (const courseLesson of courseUnit.lessons) {
    for (const exercise of courseLesson.exercises) {
      if ((exercise.type === "mcq" || exercise.type === "code_read") && englishChoices[exercise.id]) {
        exercise.optionsEn = englishChoices[exercise.id];
      }
      if (exercise.type === "match" && exercise.id === "nx-ar1") {
        exercise.pairsEn = [
          { left: "page.tsx", right: "Makes a route segment publicly accessible" },
          { left: "layout.tsx", right: "Shared shell that preserves state across navigation between child pages" },
          { left: "loading.tsx", right: "Suspense fallback while segment content streams" },
          { left: "error.tsx", right: "Client error boundary for recovery within its child segment tree" },
        ];
      }
    }
  }
}
