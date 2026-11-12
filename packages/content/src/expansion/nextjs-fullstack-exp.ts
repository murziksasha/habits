import type { CourseContent, LessonContent, UnitContent } from "../types.js";
import { expandCourse, sectionUnit, teachLesson } from "./factory.js";

export const newUnits: UnitContent[] = [
  sectionUnit(
    "nx_streaming_ppr",
    "Потоки, Suspense і частковий пререндер",
    "Streaming, Suspense, and partial prerendering",
    [
      {
        slug: "nx-suspense-shell",
        titleUk: "Оболонка сторінки одразу, повільний блок — за Suspense",
        titleEn: "The page shell at once, a slow block behind Suspense",
        difficulty: 3,
        pointsUk: ["Suspense навколо повільного фрагмента, оболонка стрімиться", "Fallback без стрибка CLS", "Не блокуйте root layout даними однієї сторінки"],
        pointsEn: ["Suspense around the slow fragment, the shell streams", "A fallback without a CLS jump", "Do not block the root layout with one page's data"],
        conceptUk: "Якщо вся сторінка чекає повільний запит у серверному компоненті, користувач бачить біле. Обгортають повільний фрагмент у `<Suspense fallback={...}>`: оболонка (навігація, заголовок) стрімиться одразу, блок довантажується. Fallback має бути схожий за розміром, інакше стрибне верстка (CLS). Не кладіть у тому самому дереві без межі те, що має різний час. `loading.tsx` — це Suspense навколо сегмента маршруту. Помилку в блоці ловить `error.tsx` поруч, не вся сторінка. Не чекайте в кореневому layout дані, які потрібні лише одній сторінці — це блокує всіх.",
        conceptEn: "If the whole page waits on a slow query in a server component, the user sees white. You wrap the slow fragment in `<Suspense fallback={...}>`: the shell (navigation, title) streams at once, the block loads later. The fallback should be similar in size, or the layout will jump (CLS). Do not put things with different times in the same tree without a boundary. `loading.tsx` is Suspense around a route segment. An error in the block is caught by a nearby `error.tsx`, not the whole page. Do not wait in the root layout for data that only one page needs — that blocks everyone.",
        code: "<Header/>\n<Suspense fallback={<TableSkeleton/>}>\n  <OrderTable id={id}/>\n</Suspense>",
        language: "tsx",
        retrieval: [
          { kind: "mcq", promptUk: "Чому fetch у root layout, що чекає 3 с, поганий для всієї програми?", promptEn: "Why is a 3 s fetch in the root layout bad for the whole app?", options: ["кожний перехід чекає цей запит; дані однієї сторінки не місце в корені", "layout не вміє fetch", "Suspense тоді заборонений", "loading.tsx вимикається"], correctIndex: 0, explanationUk: "Корінь має бути швидким.", explanationEn: "The root should be fast." },
          { kind: "fill", promptUk: "Допишіть межу потокової віддачі фрагмента", promptEn: "Fill in the boundary of a streaming fragment", language: "tsx", code: "<___ fallback={<Skeleton/>}><SlowPanel/></___>", accepted: ["Suspense"], caseSensitive: true, explanationUk: "Suspense ділить оболонку й повільний блок.", explanationEn: "Suspense splits the shell and the slow block." },
          { kind: "read", promptUk: "Чим поганий fallback висотою 0, після якого з'являється блок на 400px?", promptEn: "What is wrong with a fallback of height 0 after which a 400px block appears?", language: "tsx", code: "<Suspense fallback={null}><TallChart/></Suspense>", options: ["стрибок верстки (CLS); резерв має займати близьке місце", "це покращує LCP завжди", "error.tsx тоді обов'язковий", "streaming забороняє висоту"], correctIndex: 0, explanationUk: "Стабільний каркас.", explanationEn: "A stable skeleton." }
        ],
        whyUk: "Як віддати сторінку замовлення так, щоб шапка з'явилась одразу, а таблиця дочекалась запиту?",
        whyEn: "How do you serve an order page so the header appears at once and the table waits for the query?",
        ideas: [{ labelUk: "Suspense", labelEn: "Suspense", anyOf: ["suspense", "оболонк", "shell", "фрагмент", "fragment"] }, { labelUk: "схожий fallback", labelEn: "a similar fallback", anyOf: ["fallback", "cls", "скелет", "skeleton", "стриб", "jump"] }, { labelUk: "не блокувати layout", labelEn: "do not block the layout", anyOf: ["layout", "loading", "error", "корінь", "root"] }],
        sampleUk: "Шапку лишають поза межею, таблицю обгортають у Suspense зі скелетом близького розміру, дані однієї сторінки не чекають у root layout, помилку ловить error.tsx сегмента.",
        sampleEn: "You leave the header outside the boundary, you wrap the table in Suspense with a similarly sized skeleton, one page's data is not awaited in the root layout, and the segment's error.tsx catches the error.",
      },
      {
        slug: "nx-ppr-static",
        titleUk: "Частковий пререндер: статична оболонка з кешу, дірки — динамічні",
        titleEn: "Partial prerendering: a static shell from the cache, holes are dynamic",
        difficulty: 3,
        pointsUk: ["Динаміка лише в дірках Suspense", "Не піднімайте cookies() вище, ніж треба", "Оболонку інвалідують за контентом, не за логіном"],
        pointsEn: ["Dynamics only inside Suspense holes", "Do not lift cookies() higher than needed", "The shell is invalidated on content, not on login"],
        conceptUk: "Partial Prerendering (PPR) будує статичну оболонку на етапі збірки/кешу й залишає динамічні 'дірки' (користувач, кошик), які дострімуються. Це поєднує швидкий TTFB статичної сторінки з персональними даними. Динамічне (cookies, headers, no-store fetch) має бути всередині Suspense-дірки, інакше вся сторінка стає динамічною. Не читайте cookies() у батькові, якщо лише дочірній віджет цього потребує — ви піднімате динамічну межу. Кеш оболонки інвалідують, коли змінюється глобальний контент, не на кожен логін. Перевіряйте в збірці, що оболонка дійсно статична.",
        conceptEn: "Partial Prerendering (PPR) builds a static shell at build/cache time and leaves dynamic 'holes' (the user, the cart) that stream in later. That combines a fast TTFB of a static page with personal data. Dynamic work (cookies, headers, a no-store fetch) must sit inside a Suspense hole, or the whole page becomes dynamic. Do not read cookies() in a parent if only a child widget needs it — you lift the dynamic boundary. The shell cache is invalidated when global content changes, not on every login. Check in the build that the shell is truly static.",
        code: "// page.tsx: static catalog shell\n<Suspense fallback={<CartSkeleton/>}>\n  <CartFromCookies/>  {/* cookies() only here */}\n</Suspense>",
        language: "tsx",
        retrieval: [
          { kind: "mcq", promptUk: "Що станеться, якщо викликати cookies() у сторінці поза Suspense при PPR?", promptEn: "What happens if you call cookies() on the page outside Suspense under PPR?", options: ["уся сторінка може стати динамічною, оболонка не віддасться зі статичного кешу", "PPR тоді швидший", "cookies ігноруються", "інвалідація вимикається"], correctIndex: 0, explanationUk: "Динамічний виклик піднімає межу.", explanationEn: "A dynamic call lifts the boundary." },
          { kind: "fill", promptUk: "Допишіть API читання печива, яке робить сегмент динамічним", promptEn: "Fill in the cookie-reading API that makes a segment dynamic", language: "typescript", code: "import { ___ } from 'next/headers';\nconst jar = await ___();", accepted: ["cookies"], caseSensitive: true, explanationUk: "cookies() — динамічний API.", explanationEn: "cookies() is a dynamic API." },
          { kind: "read", promptUk: "Коли інвалідувати кеш статичної оболонки каталогу?", promptEn: "When do you invalidate the static shell cache of a catalog?", language: "typescript", code: "revalidatePath('/catalog')", options: ["коли змінюється глобальний контент каталогу, не на кожен логін користувача", "на кожен запит cookies", "лише при зміні CSS", "ніколи, PPR не кешує"], correctIndex: 0, explanationUk: "Оболонка спільна, дірка — персональна.", explanationEn: "The shell is shared, the hole is personal." }
        ],
        whyUk: "Як зробити сторінку каталогу швидко статичною, але з кошиком поточного користувача?",
        whyEn: "How do you make a catalog page fast and static, but with the current user's cart?",
        ideas: [{ labelUk: "PPR оболонка", labelEn: "a PPR shell", anyOf: ["ppr", "оболонк", "shell", "статичн", "static"] }, { labelUk: "дірка Suspense", labelEn: "a Suspense hole", anyOf: ["дірк", "hole", "suspense", "кошик", "cart", "cookies"] }, { labelUk: "не піднімати cookies", labelEn: "do not lift cookies", anyOf: ["cookies", "батьк", "parent", "інвалід", "invalid"] }],
        sampleUk: "Статичну оболонку каталогу кешують, кошик читає cookies всередині Suspense-дірки, cookies() не викликають у батькові, інвалідація оболонки — від зміни каталогу, не від логіну.",
        sampleEn: "You cache the static catalog shell, the cart reads cookies inside a Suspense hole, cookies() is not called in the parent, and shell invalidation comes from a catalog change, not from a login.",
      },
      {
        slug: "nx-stream-errors",
        titleUk: "Помилка в потоці: один віджет упав — решта сторінки жива",
        titleEn: "An error in the stream: one widget died, the rest of the page lives",
        difficulty: 3,
        pointsUk: ["Межа помилки ближче до ризикованого віджета", "Не порожній catch на сервері", "Таймаут фрагмента замість вічного спінера"],
        pointsEn: ["An error boundary closer to the risky widget", "No empty catch on the server", "A fragment timeout instead of an endless spinner"],
        conceptUk: "`error.tsx` у сегменті ловить збій серверного рендеру цього дерева й показує запас, з можливістю спробувати знову. Межі помилок ставлять ближче до ризикованого віджета (рекомендації, платіжний віджет), щоб шапка лишилась. На клієнті — Error Boundary. Не ковтайте помилку порожнім `catch` у серверному компоненті: тоді немає ні контенту, ні сигналу. Лог і звіт (digest) у error UI для сапорту, без витоку стека клієнту. Для потоків важливий таймаут повільного фрагмента: краще fallback 'не вдалось завантажити', ніж вічне крутіння.",
        conceptEn: "`error.tsx` in a segment catches a server-render failure of that tree and shows a fallback, with a way to try again. You place error boundaries closer to the risky widget (recommendations, a payment widget) so the header stays. On the client — an Error Boundary. Do not swallow an error with an empty `catch` in a server component: then there is neither content nor a signal. A log and a report (a digest) in the error UI for support, without leaking the stack to the client. For streams, a timeout on a slow fragment matters: a 'failed to load' fallback is better than an endless spin.",
        code: "// app/orders/@recs/error.tsx — fallback, try again\n// do not catch { return null } in the server component",
        language: "tsx",
        retrieval: [
          { kind: "mcq", promptUk: "Чому error.tsx лише в корені гірший за межу навколо віджета рекомендацій?", promptEn: "Why is an error.tsx only at the root worse than a boundary around the recommendations widget?", options: ["збій рекомендацій знесе всю сторінку, включно з оформленням замовлення", "кореневий error завжди точніший", "віджети не вміють error.tsx", "таймаут тоді заборонений"], correctIndex: 0, explanationUk: "Ізолюйте відмову.", explanationEn: "Isolate the failure." },
          { kind: "fill", promptUk: "Допишіть файл межі помилки сегмента App Router", promptEn: "Fill in the App Router segment error-boundary file", language: "bash", code: "app/orders/___tsx", accepted: ["error."], caseSensitive: true, explanationUk: "error.tsx у сегменті.", explanationEn: "error.tsx in the segment." },
          { kind: "read", promptUk: "Чим поганий catch { return null } навколо fetch у серверному компоненті?", promptEn: "What is wrong with catch { return null } around a fetch in a server component?", language: "typescript", code: "try { return await getOrders() } catch { return null }", options: ["користувач і спостережуваність не бачать збою: ні UI помилки, ні алерту", "це ідеальний error.tsx", "так завжди логується digest", "Suspense тоді сам покаже стек"], correctIndex: 0, explanationUk: "Помилка має бути видима й залогована.", explanationEn: "The error should be visible and logged." }
        ],
        whyUk: "Як зробити так, щоб падіння блоку рекомендацій не прибрало кнопку оплати?",
        whyEn: "How do you make a recommendations-block failure not remove the pay button?",
        ideas: [{ labelUk: "близька межа", labelEn: "a nearby boundary", anyOf: ["error.tsx", "меж", "boundary", "віджет", "widget"] }, { labelUk: "не ковтати catch", labelEn: "do not swallow in catch", anyOf: ["catch", "null", "лог", "log", "digest"] }, { labelUk: "таймаут фрагмента", labelEn: "a fragment timeout", anyOf: ["таймаут", "timeout", "спінер", "spinner", "fallback"] }],
        sampleUk: "Ставлять error.tsx ближче до рекомендацій, не ковтають помилку порожнім catch, логують digest без стека клієнту й обмежують час фрагмента, щоб шапка й оплата лишились.",
        sampleEn: "You put error.tsx closer to the recommendations, you do not swallow the error with an empty catch, you log a digest without a client stack, and you cap the fragment's time so the header and payment stay.",
      }
    ],
    "Контрольна: потоки",
    "Exam: streaming",
    [
      { promptUk: "Повільний блок варто обгорнути в…", promptEn: "A slow block should be wrapped in…", options: ["Suspense зі скелетом близького розміру", "root layout fetch на 3 с", "fallback={null} висотою 0 завжди", "порожній catch"], correctIndex: 0, explanationUk: "Оболонка стрімиться.", explanationEn: "The shell streams." },
      { promptUk: "fetch у root layout на дані однієї сторінки…", promptEn: "A fetch in the root layout for one page's data…", options: ["блокує всі переходи", "потрібний для PPR", "замінює error.tsx", "вимикає CLS"], correctIndex: 0, explanationUk: "Корінь має бути швидким.", explanationEn: "The root should be fast." },
      { promptUk: "cookies() поза Suspense при PPR…", promptEn: "cookies() outside Suspense under PPR can…", options: ["зробити всю сторінку динамічною", "прискорити статичну оболонку", "замінити інвалідацію", "вимкнути печиво"], correctIndex: 0, explanationUk: "Динаміка в дірці.", explanationEn: "Dynamics in the hole." },
      { promptUk: "Інвалідація оболонки каталогу на кожен логін…", promptEn: "Invalidating the catalog shell on every login is…", options: ["зайва: оболонка спільна, дірка персональна", "обов'язкова для PPR", "заміна cookies()", "єдиний спосіб кошика"], correctIndex: 0, explanationUk: "Інвалідують за контентом.", explanationEn: "Invalidate on content." },
      { promptUk: "error.tsx лише в корені при збої віджета…", promptEn: "An error.tsx only at the root when a widget fails…", options: ["може знести всю сторінку", "ізолює віджет ідеально", "замінює таймаут", "показує стек клієнту обов'язково"], correctIndex: 0, explanationUk: "Межа ближче до ризику.", explanationEn: "A boundary closer to the risk." },
      { promptUk: "catch { return null } на сервері…", promptEn: "catch { return null } on the server…", options: ["ховає збій від користувача й моніторингу", "правильний error.tsx", "додає digest сам", "потрібний для Suspense"], correctIndex: 0, explanationUk: "Помилка має бути видима.", explanationEn: "The error should be visible." }
    ],
  ),
  sectionUnit(
    "nx_metadata_assets",
    "Метадані, зображення й шрифти",
    "Metadata, images, and fonts",
    [
      {
        slug: "nx-metadata-og",
        titleUk: "Метадані й Open Graph: унікальні на сторінку, не один title на весь сайт",
        titleEn: "Metadata and Open Graph: unique per page, not one title for the whole site",
        difficulty: 3,
        pointsUk: ["Унікальні title/description/OG на сторінку", "generateMetadata ділить кеш із сторінкою", "Канонічний URL, без PII в метатегах"],
        pointsEn: ["Unique title/description/OG per page", "generateMetadata shares a cache with the page", "A canonical URL, no PII in meta tags"],
        conceptUk: "App Router збирає `metadata` або `generateMetadata` з сегментів. Кожна публічна сторінка має свій title, description і OG-зображення — інакше в соцмережах буде спільний шаблон. Динамічні дані (назва товару) беруть у generateMetadata, не дублюють зайвий важкий запит, якщо можна поділити кеш із сторінкою. Не кладіть персональні дані в публічні метатеги. `robots` і канонічний URL важливі для індексації дублікатів. Для OG-картинки — окремий маршрут або файл з правильним розміром; зміна заголовка без оновлення картинки плутає прев'ю.",
        conceptEn: "The App Router composes `metadata` or `generateMetadata` from segments. Every public page has its own title, description, and OG image — otherwise social previews share one template. Dynamic data (a product name) is taken in generateMetadata; you do not duplicate a heavy query if you can share a cache with the page. Do not put personal data in public meta tags. `robots` and a canonical URL matter for duplicate indexing. For an OG image — a separate route or file at the right size; changing the heading without updating the image confuses the preview.",
        code: "export async function generateMetadata({ params }): Promise<Metadata> {\n  const p = await getProduct(params.id) // shared cache\n  return { title: p.name, openGraph: { images: [p.og] }, alternates: { canonical: `/p/${p.id}` } }\n}",
        language: "typescript",
        retrieval: [
          { kind: "mcq", promptUk: "Чому один title у кореневому layout недостатній для магазину?", promptEn: "Why is one title in the root layout not enough for a shop?", options: ["у прев'ю й пошуку всі товари виглядатимуть однаково; потрібен generateMetadata", "layout не вміє title", "OG тоді заборонений", "канонічний URL замінює title"], correctIndex: 0, explanationUk: "Метадані специфічні для сторінки.", explanationEn: "Metadata is page-specific." },
          { kind: "fill", promptUk: "Допишіть функцію динамічних метаданих", promptEn: "Fill in the function for dynamic metadata", language: "typescript", code: "export async function ___(props: Props): Promise<Metadata> { ... }", accepted: ["generateMetadata"], caseSensitive: true, explanationUk: "generateMetadata у сегменті.", explanationEn: "generateMetadata in the segment." },
          { kind: "read", promptUk: "Чи можна в description метатега покласти email покупця?", promptEn: "May you put a buyer's email in the meta description?", language: "typescript", code: "description: `Order for ${user.email}`", options: ["ні: метатеги публічні й потрапляють у кеші та прев'ю", "так, це зручно для OG", "так, robots це ховає завжди", "так, якщо title унікальний"], correctIndex: 0, explanationUk: "Публічні теги без PII.", explanationEn: "Public tags without PII." }
        ],
        whyUk: "Як зробити прев'ю товару в месенджері з правильною назвою й картинкою, без email покупця?",
        whyEn: "How do you make a product preview in a messenger with the right name and image, without the buyer's email?",
        ideas: [{ labelUk: "generateMetadata", labelEn: "generateMetadata", anyOf: ["generatemetadata", "title", "og", "унікальн", "unique"] }, { labelUk: "OG-зображення", labelEn: "an OG image", anyOf: ["og", "картин", "image", "розмір", "size"] }, { labelUk: "без PII, з канонічним URL", labelEn: "no PII, with a canonical URL", anyOf: ["pii", "email", "canonical", "робот", "robots"] }],
        sampleUk: "Для кожної публічної сторінки пишуть generateMetadata з унікальним title, описом і OG-картинкою, ділять кеш із сторінкою, ставлять канонічний URL і не кладуть персональні дані в публічні теги.",
        sampleEn: "For every public page you write generateMetadata with a unique title, description, and OG image, you share a cache with the page, you set a canonical URL, and you do not put personal data in public tags.",
      },
      {
        slug: "nx-image-font",
        titleUk: "next/image і next/font: розмір, CLS і приватність шрифтів",
        titleEn: "next/image and next/font: size, CLS, and font privacy",
        difficulty: 3,
        pointsUk: ["Розміри й priority для LCP", "remotePatterns для зовнішніх картинок", "Self-hosted next/font, fallback-метрики"],
        pointsEn: ["Dimensions and priority for LCP", "remotePatterns for external images", "Self-hosted next/font, fallback metrics"],
        conceptUk: "`next/image` вимагає ширину/висоту або fill і sizes, інакше резерв місця невірний і буде CLS. Для LCP-зображення — `priority`. Не оптимізуйте зовнішні домени без `remotePatterns` у конфігу — це дірка й сюрприз у збірці. `next/font` підвантажує файли з вашого origin (або self-host), без зайвого запиту до Google в рантаймі — краще для приватності й стабільності. Fallback-метрики шрифту зменшують стрибок тексту. Великі декоративні шрифти не ставте на весь сайт, якщо вони потрібні лише на лендінгу.",
        conceptEn: "`next/image` requires width/height or fill and sizes, otherwise the space reservation is wrong and you get CLS. For the LCP image — `priority`. Do not optimize external domains without `remotePatterns` in the config — that is a hole and a build surprise. `next/font` loads files from your origin (or self-host), without an extra Google request at runtime — better for privacy and stability. Font fallback metrics reduce a text jump. Do not put large decorative fonts on the whole site if they are only needed on a landing page.",
        code: "import { Inter } from 'next/font/google'\nconst inter = Inter({ subsets: ['latin'], display: 'swap' })\n<Image src={hero} width={1200} height={600} alt=\"\" priority />",
        language: "tsx",
        retrieval: [
          { kind: "mcq", promptUk: "Навіщо width і height (або fill) на Image?", promptEn: "Why width and height (or fill) on Image?", options: ["браузер резерває місце й не стрибає верстка, коли файл довантажиться", "без цього зображення не декодується ніколи", "це вимикає LCP", "remotePatterns тоді не потрібні"], correctIndex: 0, explanationUk: "Боротьба з CLS.", explanationEn: "Fighting CLS." },
          { kind: "fill", promptUk: "Допишіть властивість пріоритетного LCP-зображення", promptEn: "Fill in the property of a priority LCP image", language: "tsx", code: "<Image src={hero} alt=\"\" width={1200} height={600} ___ />", accepted: ["priority"], caseSensitive: true, explanationUk: "priority підказує preload.", explanationEn: "priority hints a preload." },
          { kind: "read", promptUk: "Чим корисний next/font замість посилання на fonts.googleapis.com в layout?", promptEn: "How is next/font useful instead of a fonts.googleapis.com link in the layout?", language: "typescript", code: "import { Inter } from 'next/font/google'", options: ["файл іде з вашого origin, менше третіх сторін і передбачуваний завантажувач", "Google тоді обов'язковий у рантаймі", "це вимикає fallback", "шрифт не можна обмежити лендінгом"], correctIndex: 0, explanationUk: "Приватність і контроль.", explanationEn: "Privacy and control." }
        ],
        whyUk: "Як поставити герой-зображення й шрифт заголовка, щоб не стрибала верстка й не йшов зайвий запит до Google?",
        whyEn: "How do you set a hero image and a heading font so the layout does not jump and there is no extra Google request?",
        ideas: [{ labelUk: "розміри й priority", labelEn: "dimensions and priority", anyOf: ["width", "height", "priority", "cls", "lcp"] }, { labelUk: "remotePatterns", labelEn: "remotePatterns", anyOf: ["remotepatterns", "зовнішн", "external", "image"] }, { labelUk: "next/font", labelEn: "next/font", anyOf: ["next/font", "origin", "fallback", "приватн", "privacy", "google"] }],
        sampleUk: "Герой ставлять через next/image з розмірами й priority, зовнішні домени — у remotePatterns, шрифт — через next/font із вашого origin і fallback-метриками, без зайвого runtime-запиту до Google.",
        sampleEn: "You set the hero with next/image, dimensions, and priority, external domains go in remotePatterns, the font goes through next/font from your origin with fallback metrics, without an extra runtime request to Google.",
      },
      {
        slug: "nx-instrumentation",
        titleUk: "instrumentation.ts: старт телеметрії один раз, не в кожному роутері",
        titleEn: "instrumentation.ts: telemetry starts once, not in every route",
        difficulty: 3,
        pointsUk: ["Один register на старті сервера", "Без секретів у логах старту, без важкого sync", "Не потрапляє в клієнтський бандл"],
        pointsEn: ["One register at server start", "No secrets in start logs, no heavy sync", "It does not enter the client bundle"],
        conceptUk: "Файл `instrumentation.ts` (і `register()`) — місце підключити OpenTelemetry, логер, перевірку env на старті процесу, а не розкидати `init()` по layout і API. Це виконується на старті серверного рантайму. Не робіть там важку синхронну роботу, що затримує перший запит, без потреби. Секрети не логійте при старті 'для перевірки'. Клієнтський бандл цей файл не повинен тягнути. Після зміни інструментації перевіряйте, що dev і prod не подвоюють спани (подвійний register). Експорт метрик узгоджують з операційним SLO сторінок.",
        conceptEn: "The `instrumentation.ts` file (and `register()`) is the place to attach OpenTelemetry, a logger, and an env check at process start, not to scatter `init()` across layouts and APIs. It runs at the start of the server runtime. Do not do heavy synchronous work there that delays the first request without a need. Do not log secrets at start 'as a check'. The client bundle must not pull this file. After changing instrumentation, check that dev and prod do not double spans (a double register). Metric export is aligned with the operational SLO of the pages.",
        code: "// instrumentation.ts\nexport async function register() {\n  if (process.env.NEXT_RUNTIME === 'nodejs') await startOtel()\n}",
        language: "typescript",
        retrieval: [
          { kind: "mcq", promptUk: "Чому init телеметрії в кожному API-роуті гірший за instrumentation.ts?", promptEn: "Why is telemetry init in every API route worse than instrumentation.ts?", options: ["легко забути роут, подвоїти реєстрацію або потрапити в клієнт", "роути завжди швидші", "instrumentation не вміє OTEL", "секрети тоді безпечніші в кожному роуті"], correctIndex: 0, explanationUk: "Одне місце старту.", explanationEn: "One start place." },
          { kind: "fill", promptUk: "Допишіть експорт точки входу інструментації Next", promptEn: "Fill in the export of Next's instrumentation entry", language: "typescript", code: "export async function ___() { await startOtel() }", accepted: ["register"], caseSensitive: true, explanationUk: "register() у instrumentation.ts.", explanationEn: "register() in instrumentation.ts." },
          { kind: "read", promptUk: "Що не робити в register()?", promptEn: "What should you not do in register()?", language: "typescript", code: "export async function register() { console.log(process.env.DATABASE_URL) }", options: ["друкувати секрети й без потреби блокувати старт важким sync", "підключати OTEL", "перевіряти наявність обов'язкових env без їх друку", "ініціалізувати логер"], correctIndex: 0, explanationUk: "Старт без витоку й зайвої затримки.", explanationEn: "A start without a leak or extra delay." }
        ],
        whyUk: "Де увімкнути трасування сервера Next так, щоб воно не подвоїлось і не потрапило в браузер?",
        whyEn: "Where do you turn on Next server tracing so it is not doubled and does not enter the browser?",
        ideas: [{ labelUk: "instrumentation.ts", labelEn: "instrumentation.ts", anyOf: ["instrumentation", "register", "старт", "start"] }, { labelUk: "один раз на процес", labelEn: "once per process", anyOf: ["один", "once", "подво", "double", "span"] }, { labelUk: "не клієнт і не секрети", labelEn: "not the client and not secrets", anyOf: ["клієнт", "client", "секрет", "secret", "env", "sync"] }],
        sampleUk: "Підключають OTEL у register() файлу instrumentation.ts один раз на старті сервера, не розкидають init по роутах, не логірять секрети, не блокують старт без потреби й не тягнуть це в клієнтський бандл.",
        sampleEn: "You attach OTEL in register() of instrumentation.ts once at server start, you do not scatter init across routes, you do not log secrets, you do not block start without a need, and you do not pull this into the client bundle.",
      }
    ],
    "Контрольна: метадані й активи",
    "Exam: metadata and assets",
    [
      { promptUk: "Один title у корені для всього магазину…", promptEn: "One title at the root for the whole shop is…", options: ["недостатній: потрібен generateMetadata на товар", "достатній для OG завжди", "заміна канонічного URL", "ховає PII"], correctIndex: 0, explanationUk: "Унікальні метадані.", explanationEn: "Unique metadata." },
      { promptUk: "Email покупця в meta description…", promptEn: "A buyer's email in a meta description is…", options: ["витік у публічний кеш", "рекомендований OG", "ховається robots завжди", "заміна canonical"], correctIndex: 0, explanationUk: "Без PII в тегах.", explanationEn: "No PII in tags." },
      { promptUk: "Image без width/height…", promptEn: "An Image without width/height can…", options: ["дати CLS", "покращити LCP завжди", "замінити priority", "вимкнути remotePatterns"], correctIndex: 0, explanationUk: "Резерв місця.", explanationEn: "A space reservation." },
      { promptUk: "LCP-герой варто позначити…", promptEn: "An LCP hero should be marked with…", options: ["priority", "loading=lazy обов'язково", "без розмірів", "зовнішнім доменом без конфігу"], correctIndex: 0, explanationUk: "Підказка preload.", explanationEn: "A preload hint." },
      { promptUk: "next/font корисний тим, що…", promptEn: "next/font is useful because it…", options: ["віддає шрифт з вашого origin без зайвого Google-запиту", "вимагає Google в рантаймі", "вимикає fallback", "збільшує CLS"], correctIndex: 0, explanationUk: "Приватність і контроль.", explanationEn: "Privacy and control." },
      { promptUk: "init OTEL у кожному API-роуті…", promptEn: "OTEL init in every API route is…", options: ["гірший за instrumentation.ts: легко подвоїти або забути", "кращий за register()", "потрібний у клієнтському бандлі", "місце логувати DATABASE_URL"], correctIndex: 0, explanationUk: "Один register на старті.", explanationEn: "One register at start." }
    ],
  ),
  sectionUnit(
    "nx_middleware_edges",
    "Middleware, паралельні маршрути й краї",
    "Middleware, parallel routes, and edges",
    [
      {
        slug: "nx-mw-thin",
        titleUk: "Middleware: тонкий шлюз, не другий бекенд",
        titleEn: "Middleware: a thin gateway, not a second backend",
        difficulty: 3,
        pointsUk: ["Короткий шлюз, без важкої БД", "matcher обмежує шляхи", "Помилка middleware — глобальний ризик"],
        pointsEn: ["A short gateway, no heavy DB", "A matcher limits paths", "A middleware error is a global risk"],
        conceptUk: "Middleware (Edge) на кожному запиті: аутентифікація за JWT-кукою, редірект локалі, прості заголовки. Важкий виклик БД або довгий fetch тут збільшує латентність усього сайту й має ліміти рантайму. Не робіть у middleware складну авторизацію з багатьма запитами — перенесіть у серверний шар маршруту. Матчер обмежує шляхи (`/app/:path*`), щоб статика не ходила через логіку. Редіректи мають захист від відкритих URL (як у курсі безпеки). Помилка в middleware може знести всі сторінки — тримайте код коротким і протестованим.",
        conceptEn: "Middleware (Edge) runs on every request: JWT-cookie authentication, a locale redirect, simple headers. A heavy DB call or a long fetch here raises latency for the whole site and hits runtime limits. Do not do complex authorization with many queries in middleware — move it to the route's server layer. A matcher limits paths (`/app/:path*`) so static assets do not go through the logic. Redirects have protection against open URLs (as in the security course). An error in middleware can take down every page — keep the code short and tested.",
        code: "export const config = { matcher: ['/app/:path*'] }\n// middleware: verify JWT cookie, locale; no Postgres\n// open-redirect: only paths starting with /app/",
        language: "typescript",
        retrieval: [
          { kind: "mcq", promptUk: "Чому запит до Postgres у middleware на кожен ассет — погана ідея?", promptEn: "Why is a Postgres query in middleware on every asset a bad idea?", options: ["це додає латентність і навантаження на всю статику; обмежте matcher і логіку", "Edge завжди має безлімітну БД", "статика не проходить middleware навіть без matcher", "Postgres у middleware швидший за роут"], correctIndex: 0, explanationUk: "Тонкий шлюз і вузький matcher.", explanationEn: "A thin gateway and a narrow matcher." },
          { kind: "fill", promptUk: "Допишіть обмеження шляхів middleware", promptEn: "Fill in the path limit of middleware", language: "typescript", code: "export const config = { ___: ['/app/:path*'] }", accepted: ["matcher"], caseSensitive: true, explanationUk: "config.matcher.", explanationEn: "config.matcher." },
          { kind: "read", promptUk: "next у middleware з параметром ?next=//evil.example — що перевірити?", promptEn: "next in middleware with the parameter ?next=//evil.example — what do you check?", language: "typescript", code: "return NextResponse.redirect(new URL(next, req.url))", options: ["чи це не відкритий редірект: лише свій відносний шлях", "завжди редіректити як є", "matcher це блокує сам", "Edge ігнорує //"], correctIndex: 0, explanationUk: "Та сама дисципліна, що й для логіну.", explanationEn: "The same discipline as for login." }
        ],
        whyUk: "Що залишити в middleware, а що перенести в серверний код сторінки /app?",
        whyEn: "What should stay in middleware, and what should move to the server code of an /app page?",
        ideas: [{ labelUk: "тонкий шлюз", labelEn: "a thin gateway", anyOf: ["jwt", "редірект", "redirect", "заголов", "header", "тонк", "thin"] }, { labelUk: "не важка БД", labelEn: "not a heavy DB", anyOf: ["postgres", "бд", "db", "важк", "heavy", "латент", "latency"] }, { labelUk: "matcher", labelEn: "a matcher", anyOf: ["matcher", "статик", "static", "помилк", "error", "open"] }],
        sampleUk: "У middleware лишають коротку перевірку сесії, локаль і заголовки з вузьким matcher, важку авторизацію й БД переносять у серверний шар, редіректи валідують, код тестують, бо збій глобальний.",
        sampleEn: "You leave a short session check, locale, and headers in middleware with a narrow matcher, you move heavy authorization and the DB to the server layer, you validate redirects, and you test the code, because a failure is global.",
      },
      {
        slug: "nx-parallel-slots",
        titleUk: "Паралельні маршрути: незалежні слоти, незалежні стани завантаження",
        titleEn: "Parallel routes: independent slots, independent loading states",
        difficulty: 3,
        pointsUk: ["Окремі loading/error на слоти, є default", "Не ускладнюйте, якщо вистачить компонента", "Модалка: і intercept, і прямий URL"],
        pointsEn: ["Separate loading/error per slot, a default exists", "Do not add complexity if a component would do", "A modal: both intercept and a direct URL"],
        conceptUk: "Паралельні маршрути (`@team`, `@analytics`) дозволяють кілька сторінок у одній розкладці з окремими `loading` і `error`. Це зручно для дашбордів. Слот має default для випадку, коли підмаршрут не активний, інакше навігація ламається. Не використовуйте паралельні слоти там, де достатньо звичайних компонентів — складність URL і 'м'яких' навігацій зростає. Модалка через `@modal` з `(.)photo` — патерн перехоплення: прямий URL відкриває сторінку, перехід усередині — модалку; потрібні обидва UX. Тестуйте глибоке оновлення (F5) на модалці.",
        conceptEn: "Parallel routes (`@team`, `@analytics`) allow several pages in one layout with separate `loading` and `error`. That is convenient for dashboards. A slot needs a default for when the subroute is not active, otherwise navigation breaks. Do not use parallel slots where ordinary components would do — the complexity of URLs and 'soft' navigations grows. A modal via `@modal` with `(.)photo` is an intercepting pattern: a direct URL opens a page, an in-app transition opens a modal; you need both UX paths. Test a deep refresh (F5) on the modal.",
        code: "app/dashboard/@team/page.tsx\napp/dashboard/@analytics/default.tsx\napp/@modal/(.)photo/[id]/page.tsx  // plus a full photo page",
        language: "bash",
        retrieval: [
          { kind: "mcq", promptUk: "Що буде, якщо в слота @analytics немає default.tsx, а користувач відкрив лише @team?", promptEn: "What happens if the @analytics slot has no default.tsx and the user opened only @team?", options: ["навігація або рендер слота можуть зламатись; потрібен default", "слот завжди бере @team", "loading.tsx замінює default завжди", "паралельні маршрути не потребують default"], correctIndex: 0, explanationUk: "Default — запасний стан слота.", explanationEn: "Default is the slot's fallback state." },
          { kind: "fill", promptUk: "Допишіть конвенцію теки паралельного слота", promptEn: "Fill in the folder convention of a parallel slot", language: "bash", code: "app/dashboard/___analytics/page.tsx", accepted: ["@"], caseSensitive: true, explanationUk: "Префікс @ іменує слот.", explanationEn: "The @ prefix names the slot." },
          { kind: "read", promptUk: "Чому треба перевірити F5 на URL модалки фото?", promptEn: "Why should you test F5 on a photo modal URL?", language: "bash", code: "# intercepting route (.)photo vs full page", options: ["прямий захід має показати повноцінну сторінку, не зламану модалку без фону", "F5 завжди лишає intercept", "модалка не має URL", "default.tsx забороняє F5"], correctIndex: 0, explanationUk: "Обидва входи в патерн.", explanationEn: "Both entries into the pattern." }
        ],
        whyUk: "Як зібрати дашборд із незалежними панелями й модалкою фото, яка працює і з F5?",
        whyEn: "How do you build a dashboard with independent panels and a photo modal that also works with F5?",
        ideas: [{ labelUk: "слоти @", labelEn: "slots with @", anyOf: ["@", "слот", "slot", "loading", "error", "default"] }, { labelUk: "не надмірна складність", labelEn: "not excess complexity", anyOf: ["компонент", "component", "складн", "complex"] }, { labelUk: "intercept і прямий URL", labelEn: "intercept and a direct URL", anyOf: ["modal", "intercept", "f5", "фото", "photo"] }],
        sampleUk: "Панелі виносять у паралельні слоти з власними loading/error і default, модалку роблять intercept-маршрутом і перевіряють прямий URL (F5), а де вистачить звичайного компонента — не ускладнюють.",
        sampleEn: "You put panels in parallel slots with their own loading/error and a default, you make the modal an intercepting route and you test the direct URL (F5), and where an ordinary component would do, you do not add complexity.",
      },
      {
        slug: "nx-edge-runtime",
        titleUk: "Edge runtime: швидший старт, не всі API Node",
        titleEn: "The Edge runtime: a faster start, not every Node API",
        difficulty: 3,
        pointsUk: ["Edge — для легкої логіки й холодної старт-латентності", "Не весь Node і не кожен драйвер БД", "Не обирайте Edge лише заради моди"],
        pointsEn: ["Edge is for light logic and cold-start latency", "Not all of Node and not every DB driver", "Do not pick Edge only for fashion"],
        conceptUk: "Вибір `runtime = 'edge'` зменшує холодний старт на мережі, але немає всього Node: не всі нативні модулі, інший `fs`, обережність із великими залежностями. Не ставте Edge лише 'бо модно', якщо роут читає файли чи важкий SDK. Middleware вже на Edge; окремий route handler має сенс там, де важлива географія й мала логіка (редіректи, заголовки, легка перевірка токена). Перевіряйте сумісність бібліотек. Логи й OpenTelemetry на Edge можуть відрізнятись. Для БД обирайте драйвер, який підтримує цей рантайм (HTTP/WebSocket), не класичний TCP-пул без адаптера.",
        conceptEn: "Choosing `runtime = 'edge'` reduces a cold start on the network, but you do not have all of Node: not every native module, a different `fs`, care with large dependencies. Do not pick Edge only 'because it is fashionable' if the route reads files or a heavy SDK. Middleware is already on Edge; a separate route handler makes sense where geography and small logic matter (redirects, headers, a light token check). Check library compatibility. Logs and OpenTelemetry on Edge may differ. For a database, pick a driver that supports this runtime (HTTP/WebSocket), not a classical TCP pool without an adapter.",
        code: "export const runtime = 'edge'  // light token check\n// payments webhook: runtime nodejs + official SDK",
        language: "typescript",
        retrieval: [
          { kind: "mcq", promptUk: "Чому важкий SDK з нативним fs може впасти на runtime='edge'?", promptEn: "Why can a heavy SDK with native fs fail on runtime='edge'?", options: ["Edge не дає повний Node API; потрібен сумісний драйвер або node runtime", "Edge завжди має fs як Linux", "runtime ігнорується для SDK", "TCP-пул тоді швидший завжди на Edge"], correctIndex: 0, explanationUk: "Сумісність рантайму.", explanationEn: "Runtime compatibility." },
          { kind: "fill", promptUk: "Допишіть опцію легкого рантайму маршруту", promptEn: "Fill in the option for a light route runtime", language: "typescript", code: "export const runtime = '___'", accepted: ["edge"], caseSensitive: true, explanationUk: "runtime = 'edge'.", explanationEn: "runtime = 'edge'." },
          { kind: "read", promptUk: "Коли лишити Node runtime для API оплати?", promptEn: "When do you keep the Node runtime for a payments API?", language: "typescript", code: "// sdk uses tls sockets + fs certs", options: ["коли SDK і з'єднання з БД/платежем потребують Node API", "завжди Edge, бо він модний", "ніколи Node після появи middleware", "коли потрібен лише редірект локалі"], correctIndex: 0, explanationUk: "Під роботу обирають рантайм.", explanationEn: "The runtime follows the work." }
        ],
        whyUk: "Коли ставити route handler на Edge, а коли лишати Node?",
        whyEn: "When do you put a route handler on Edge, and when do you keep Node?",
        ideas: [{ labelUk: "легка логіка на Edge", labelEn: "light logic on Edge", anyOf: ["edge", "холодн", "cold", "редірект", "redirect", "заголов", "header"] }, { labelUk: "SDK і fs — Node", labelEn: "an SDK and fs — Node", anyOf: ["node", "sdk", "fs", "натив", "native", "тcp", "tcp"] }, { labelUk: "драйвер БД сумісний", labelEn: "a compatible DB driver", anyOf: ["драйвер", "driver", "http", "пул", "pool", "сумісн", "compat"] }],
        sampleUk: "Edge обирають для короткої логіки з виграшем холодного старту, Node — коли потрібні нативні API, важкий SDK чи класичний пул; драйвер БД має бути сумісний, мода не є критерієм.",
        sampleEn: "You pick Edge for short logic with a cold-start win, Node when you need native APIs, a heavy SDK, or a classical pool; the DB driver must be compatible, and fashion is not a criterion.",
      }
    ],
    "Контрольна: middleware і край",
    "Exam: middleware and the edge",
    [
      { promptUk: "Важка БД у middleware на кожен ассет…", promptEn: "A heavy DB in middleware on every asset is…", options: ["погана ідея: вузький matcher і тонка логіка", "найкращий шар авторизації", "швидша за роут завжди", "заміна JWT"], correctIndex: 0, explanationUk: "Тонкий шлюз.", explanationEn: "A thin gateway." },
      { promptUk: "config.matcher потрібен, щоб…", promptEn: "config.matcher is there so…", options: ["не ганяти логіку на всю статику", "вимикати редіректи", "підключити Postgres", "замінити Edge"], correctIndex: 0, explanationUk: "Обмежити шляхи.", explanationEn: "Limit the paths." },
      { promptUk: "Рядок ?next=//evil у middleware…", promptEn: "The string ?next=//evil in middleware is…", options: ["ризик відкритого редіректу, валідуйте шлях", "завжди безпечний", "блокирується matcher сам", "ігнорується Edge"], correctIndex: 0, explanationUk: "Лише свій відносний шлях.", explanationEn: "Only your relative path." },
      { promptUk: "Слот без default.tsx…", promptEn: "A slot without default.tsx can…", options: ["зламати навігацію, коли слот неактивний", "завжди брати сусіда", "замінити intercept", "вимкнути F5"], correctIndex: 0, explanationUk: "Default — запас.", explanationEn: "Default is the fallback." },
      { promptUk: "F5 на URL модалки має…", promptEn: "F5 on a modal URL should…", options: ["показати повноцінну сторінку, не зламану модалку", "завжди лишити intercept", "видалити слот", "вимкнути default"], correctIndex: 0, explanationUk: "Обидва входи.", explanationEn: "Both entries." },
      { promptUk: "runtime='edge' для важкого SDK з fs…", promptEn: "runtime='edge' for a heavy SDK with fs is…", options: ["часто невірний: лишайте Node", "завжди правильний", "заміна matcher", "обов'язковий для оплат"], correctIndex: 0, explanationUk: "Рантайм під роботу.", explanationEn: "The runtime follows the work." }
    ],
  )
];

const insertions: Record<string, LessonContent[]> = {};

export function expandNextjsFullstack(course: CourseContent): CourseContent {
  return expandCourse(course, insertions, newUnits);
}
