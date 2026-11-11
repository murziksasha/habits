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
          "Розробник перейменував `DATABASE_URL` на `NEXT_PUBLIC_DATABASE_URL`, бо клієнтський компонент сварився на `undefined`. Що щойно сталося при збірці?",
          "A developer renamed `DATABASE_URL` to `NEXT_PUBLIC_DATABASE_URL` to read it cleanly in a client view. What just happened in the bundle?",
          [
            "Рядок підключення та пароль БД зашили прямо у публічний JavaScript браузера — це критичний витік секрету!",
            "Next.js автоматично захистив його паролем адміна",
            "Змінна стала доступною лише на PostgreSQL-порту",
            "Нічого, клієнтський бандл ніхто не бачить",
          ],
          0,
          why(
            "Префікс `NEXT_PUBLIC_` означає вбудовування в публічний браузерний бандл. Усі секрети й запити до БД залишаються в серверному Data Access Layer (`server-only`).",
            "Anything prefixed `NEXT_PUBLIC_` is inlined into public client JavaScript. Keep credentials strictly on the server.",
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
            "Читання `cookies()` / `headers()` в App Router переводить рендер у динамічний по запиту, і приватні дані ніколи не повинні потрапляти у спільний публічний кеш.",
            "Reading per-user session cookies opts out of shared static cache so user A's private data never leaks to user B.",
          ),
        ),
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
            "Недетермінований виклик `new Date()` під час рендеру дає різну мілісекунду/таймзону на сервері і клієнті; форматуйте фіксовану дату або рендерте живий локальний час після монтування (`useEffect`)",
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
          "Створіть розділення серверної проекції даних (DTO без приватних полів) і клієнтської кнопки фільтра для Next.js; завантажте M11 нижче для тестів меж, серіалізації й мутацій.",
          "Separate server DTO serialization cleanly from client interactive island controls; download Milestone 11 below for automated boundary and mutation verification.",
          [
            {
              id: "tsx",
              name: "board-boundary.tsx",
              language: "tsx",
              starter: `export function toPublicTaskDto(row: { id: number; title: string; status: string; internalSecretNote?: string }) {\n  return { id: row.id, title: row.title, status: row.status };\n}\n`,
            },
          ],
          [
            { fileId: "tsx", contains: ["toPublicTaskDto", "id: row.id", "title: row.title"] },
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
        "Який мінімальний набір перевірок гарантує відсутність зламаної Server/Client межі перед релізом Next.js?",
        "Which check suite catches accidentally leaking server modules or broken hydration before release?",
        [
          "Strict TypeScript check + production build (`next build`) + тести DAL/мутацій на authz/DTO + smoke перевірка завантаження сторінки",
          "Лише запуск dev server на 1 секунду",
          "Переіменування файлів у `.jsx`",
          "Вимкнення `'use client'` всюди",
        ],
        0,
      ),
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
