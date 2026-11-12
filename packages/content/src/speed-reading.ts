import type { CourseContent } from "./types.js";

export const speedReadingContent: CourseContent = {
  slug: "speed_reading",
  titleUk: "Швидкочитання",
  titleEn: "Speed reading",
  descriptionUk: "RSVP, розширення поля зору та перевірка розуміння.",
  descriptionEn: "RSVP, chunking, and reading comprehension.",
  icon: "📖",
  color: "#CE82FF",
  units: [
    {
      slug: "foundations",
      titleUk: "Основи",
      titleEn: "Foundations",
      lessons: [
        {
          slug: "what-is-rsvp",
          titleUk: "Що таке RSVP",
          titleEn: "What is RSVP",
          baseXp: 15,
          difficulty: 1,
          isFree: true,
          exercises: [
            {
              id: "sr-1-1",
              type: "mcq",
              promptUk: "RSVP у швидкочитанні означає:",
              options: [
                "Показ слів по одному в одній точці",
                "Читання вголос",
                "Підкреслення олівцем",
                "Переклад тексту",
              ],
              correctIndex: 0,
              explanationUk:
                "Rapid Serial Visual Presentation зменшує саккади й допомагає тримати фокус.",
              explanationEn:
                "Rapid Serial Visual Presentation reduces saccades and helps you keep focus.",
            },
            {
              id: "sr-1-2",
              type: "rsvp",
              promptUk: "Потренуйте RSVP (повільно)",
              text: "Швидкочитання це навичка яку можна тренувати щодня. Головне не лише швидкість а й розуміння змісту.",
              wpm: 180,
            },
          ],
        },
        {
          slug: "reduce-subvocal",
          titleUk: "Менше субвокалізації",
          titleEn: "Less subvocalization",
          baseXp: 15,
          difficulty: 1,
          isFree: true,
          exercises: [
            {
              id: "sr-2-1",
              type: "mcq",
              promptUk: "Субвокалізація — це:",
              options: [
                "Проговорювання слів «про себе»",
                "Читання діагоналлю",
                "Запам'ятовування дат",
                "Перегляд картинок",
              ],
              correctIndex: 0,
            },
            {
              id: "sr-2-2",
              type: "rsvp",
              promptUk: "RSVP середній темп",
              text: "Спробуйте сприймати слова цілими образами без внутрішнього голосу. Дихайте рівно і тримайте погляд у центрі.",
              wpm: 240,
            },
          ],
        },
        {
          slug: "chunking",
          titleUk: "Chunking — групи слів",
          titleEn: "Chunking — word groups",
          baseXp: 18,
          difficulty: 2,
          isFree: true,
          exercises: [
            {
              id: "sr-3-1",
              type: "mcq",
              promptUk: "Chunking допомагає:",
              options: [
                "Бачити кілька слів за одну фіксацію",
                "Писати швидше",
                "Грати в шахи",
                "Вчити граматику",
              ],
              correctIndex: 0,
            },
            {
              id: "sr-3-2",
              type: "rsvp",
              promptUk: "Швидший RSVP",
              text: "Групуйте слова у смислові блоки. Мозок краще тримає ідеї ніж окремі літери.",
              wpm: 280,
            },
          ],
        },
        {
          slug: "comprehension-1",
          titleUk: "Розуміння 1",
          titleEn: "Comprehension 1",
          baseXp: 20,
          difficulty: 2,
          isFree: true,
          exercises: [
            {
              id: "sr-4-1",
              type: "comprehension",
              promptUk: "Прочитайте й відповідайте",
              passage:
                "У Києві відкрили нову бібліотеку для молоді. Там є тихі зали, коворкінг і безкоштовні лекції з науки щоп'ятниці. Першого місяця заклад відвідали понад дві тисячі людей.",
              questions: [
                {
                  q: "Що відкрили в Києві?",
                  options: ["Стадіон", "Бібліотеку", "Музей авто", "Площу"],
                  correctIndex: 1,
                },
                {
                  q: "Коли лекції?",
                  options: ["Щопонеділка", "Щоп'ятниці", "Щодня", "Раз на рік"],
                  correctIndex: 1,
                },
              ],
            },
          ],
        },
        {
          slug: "comprehension-2",
          titleUk: "Розуміння 2",
          titleEn: "Розуміння 2",
          baseXp: 20,
          difficulty: 2,
          isFree: true,
          exercises: [
            {
              id: "sr-5-1",
              type: "rsvp",
              promptUk: "Розігрів",
              text: "Увага як м'яз. Коротка щоденна сесія краща за рідкісні марафони.",
              wpm: 260,
            },
            {
              id: "sr-5-2",
              type: "comprehension",
              promptUk: "Текст про звички",
              passage:
                "Дослідження показують, що стабільний розклад навчання підвищує утримання матеріалу. Краще 20 хвилин щодня, ніж 3 години раз на тиждень. Важливі також сон і короткі перерви.",
              questions: [
                {
                  q: "Що ефективніше?",
                  options: [
                    "20 хв щодня",
                    "3 години раз на тиждень",
                    "Не вчитися",
                    "Лише відео",
                  ],
                  correctIndex: 0,
                },
                {
                  q: "Що ще важливе?",
                  options: ["Сон і перерви", "Тільки кава", "Нічний марафон", "Шум"],
                  correctIndex: 0,
                },
              ],
            },
          ],
        },
        {
          slug: "peripheral",
          titleUk: "Периферійний зір",
          titleEn: "Периферійний зір",
          baseXp: 18,
          difficulty: 3,
          exercises: [
            {
              id: "sr-6-1",
              type: "mcq",
              promptUk: "Мета тренування периферії:",
              options: [
                "Збільшити кількість слів за фіксацію",
                "Читати лише заголовки",
                "Замінити окуляри",
                "Вчити алфавіт",
              ],
              correctIndex: 0,
            },
            {
              id: "sr-6-2",
              type: "rsvp",
              promptUk: "Темп 320 wpm",
              text: "Не повертайтеся очима назад без потреби. Регресії сповільнюють читання сильніше ніж здається.",
              wpm: 320,
            },
          ],
        },
        {
          slug: "meta-cognition",
          titleUk: "Метапізнання",
          titleEn: "Метапізнання",
          baseXp: 20,
          difficulty: 3,
          exercises: [
            {
              id: "sr-7-1",
              type: "comprehension",
              promptUk: "Наука й фокус",
              passage:
                "Помідорна техніка (25 хвилин фокусу + 5 хвилин відпочинку) допомагає уникати вигорання. Під час фокусу вимикайте сповіщення. Після чотирьох циклів зробіть довгу перерву.",
              questions: [
                {
                  q: "Скільки триває інтервал фокусу?",
                  options: ["25 хв", "5 хв", "60 хв", "2 хв"],
                  correctIndex: 0,
                },
                {
                  q: "Що робити під час фокусу?",
                  options: [
                    "Вимкнути сповіщення",
                    "Відповідати на всі чати",
                    "Дивитись серіал",
                    "Спати",
                  ],
                  correctIndex: 0,
                },
              ],
            },
          ],
        },
        {
          slug: "speed-burst",
          titleUk: "Швидкісний ривок",
          titleEn: "Швидкісний ривок",
          baseXp: 22,
          difficulty: 4,
          exercises: [
            {
              id: "sr-8-1",
              type: "rsvp",
              promptUk: "400 wpm — коротко",
              text: "Швидкість без розуміння марна. Чергуйте швидкі ривки з повільною перевіркою сенсу.",
              wpm: 400,
            },
            {
              id: "sr-8-2",
              type: "mcq",
              promptUk: "Найкраща стратегія:",
              options: [
                "Чергувати швидкість і перевірку розуміння",
                "Завжди максимум wpm",
                "Ігнорувати зміст",
                "Читати лише перше речення",
              ],
              correctIndex: 0,
            },
          ],
        },
        {
          slug: "long-passage",
          titleUk: "Довший текст",
          titleEn: "Довший текст",
          baseXp: 25,
          difficulty: 4,
          exercises: [
            {
              id: "sr-9-1",
              type: "comprehension",
              promptUk: "Про шахи й навчання",
              passage:
                "Шахи вчать планувати на кілька ходів уперед. Подібне стратегічне мислення корисне в навчанні: спочатку ціль, потім кроки, далі перевірка. Помилки — дані для покращення, а не привід зупинятися. Регулярний розбір партій (або уроків) прискорює прогрес.",
              questions: [
                {
                  q: "Чому вчать шахи за текстом?",
                  options: [
                    "Планувати наперед",
                    "Бігати швидше",
                    "Малювати",
                    "Співати",
                  ],
                  correctIndex: 0,
                },
                {
                  q: "Помилки — це:",
                  options: [
                    "Дані для покращення",
                    "Кінець навчання",
                    "Привід здатися",
                    "Неважливо",
                  ],
                  correctIndex: 0,
                },
              ],
            },
          ],
        },
        {
          slug: "review",
          titleUk: "Повторення",
          titleEn: "Повторення",
          baseXp: 20,
          difficulty: 3,
          exercises: [
            {
              id: "sr-10-1",
              type: "mcq",
              promptUk: "Ключ до прогресу у швидкочитанні:",
              options: [
                "Регулярність + розуміння",
                "Лише максимальна швидкість",
                "Читання без пауз 10 годин",
                "Заучування словника напам'ять",
              ],
              correctIndex: 0,
            },
            {
              id: "sr-10-2",
              type: "rsvp",
              promptUk: "Фінальний RSVP",
              text: "Ви вже знаєте RSVP chunking і контроль розуміння. Тренуйтеся коротко але часто.",
              wpm: 300,
            },
          ],
        },
        {
          slug: "skimming",
          titleUk: "Скімінг",
          titleEn: "Скімінг",
          baseXp: 22,
          difficulty: 3,
          exercises: [
            {
              id: "sr-11-1",
              type: "mcq",
              promptUk: "Скімінг — це:",
              options: [
                "Швидкий огляд ключових ідей тексту",
                "Читання кожного слова вголос",
                "Переклад",
                "Заучування напам'ять",
              ],
              correctIndex: 0,
            },
            {
              id: "sr-11-2",
              type: "comprehension",
              promptUk: "Скімінг статті",
              passage:
                "Стартапи часто помиляються, масштабуючи продукт до product-market fit. Краще спочатку підтвердити попит невеликими експериментами. Метрики активації та утримання важливіші за «галас» у соцмережах на старті.",
              questions: [
                {
                  q: "Що важливіше на старті?",
                  options: [
                    "Product-market fit і метрики",
                    "Тільки реклама",
                    "Офіс у центрі",
                    "Логотип",
                  ],
                  correctIndex: 0,
                },
                {
                  q: "Як перевіряти попит?",
                  options: [
                    "Невеликими експериментами",
                    "Одразу найняти 100 людей",
                    "Ігнорувати користувачів",
                    "Лише через TV",
                  ],
                  correctIndex: 0,
                },
              ],
            },
          ],
        },
        {
          slug: "scanning",
          titleUk: "Сканування",
          titleEn: "Сканування",
          baseXp: 20,
          difficulty: 3,
          exercises: [
            {
              id: "sr-12-1",
              type: "mcq",
              promptUk: "Сканування тексту потрібно, щоб:",
              options: [
                "Знайти конкретний факт або число",
                "Запам'ятати весь роман",
                "Писати вірші",
                "Вимкнути увагу",
              ],
              correctIndex: 0,
            },
            {
              id: "sr-12-2",
              type: "rsvp",
              promptUk: "RSVP 360",
              text: "Шукайте якорі: дати імена числа заголовки. Потім повертайтесь до важливих абзаців.",
              wpm: 360,
            },
          ],
        },
        {
          slug: "science-passage",
          titleUk: "Науковий уривок",
          titleEn: "Науковий уривок",
          baseXp: 25,
          difficulty: 4,
          exercises: [
            {
              id: "sr-13-1",
              type: "comprehension",
              promptUk: "Сон і пам'ять",
              passage:
                "Під час глибокого сну мозок консолідує спогади. Недосип погіршує увагу й навчання сильніше, ніж багато хто очікує. Коротка денна дрімота (10–20 хв) може підвищити продуктивність без важкої інерції після довгого сну вдень.",
              questions: [
                {
                  q: "Коли консолідуються спогади?",
                  options: ["Під час глибокого сну", "Лише за кавою", "Під час бігу", "Ніколи"],
                  correctIndex: 0,
                },
                {
                  q: "Оптимальна коротка дрімота?",
                  options: ["10–20 хв", "3 години", "30 секунд", "8 годин"],
                  correctIndex: 0,
                },
              ],
            },
          ],
        },
        {
          slug: "capstone-reading",
          titleUk: "Капстоун",
          titleEn: "Капстоун",
          baseXp: 28,
          difficulty: 4,
          exercises: [
            {
              id: "sr-14-1",
              type: "rsvp",
              promptUk: "380 wpm",
              text: "Поєднайте RSVP скімінг і перевірку розуміння. Швидкість без сенсу — порожній показник.",
              wpm: 380,
            },
            {
              id: "sr-14-2",
              type: "mcq",
              promptUk: "Фінальне правило:",
              options: [
                "Швидкість + розуміння + регулярність",
                "Тільки wpm",
                "Ніколи не перевіряти зміст",
                "Читати раз на рік",
              ],
              correctIndex: 0,
            },
          ],
        },
        {
          slug: "news-skim",
          titleUk: "Скімінг новин",
          titleEn: "News skimming",
          baseXp: 24,
          difficulty: 3,
          isFree: true,
          exercises: [
            {
              id: "sr-15-1",
              type: "comprehension",
              promptUk: "Заголовок і суть",
              passage:
                "Місто відкрило нову бібліотеку з коворкінгом для студентів. У перший тиждень записалось понад 400 людей. Мер обіцяє розширити години роботи у вихідні.",
              questions: [
                {
                  q: "Що відкрили?",
                  options: ["Бібліотеку", "Стадіон", "Аеропорт", "Завод"],
                  correctIndex: 0,
                },
                {
                  q: "Скільки людей записалось за тиждень?",
                  options: ["400+", "40", "4", "4000"],
                  correctIndex: 0,
                },
              ],
            },
            {
              id: "sr-15-2",
              type: "rsvp",
              promptUk: "RSVP 300 news",
              text: "Читайте заголовок перший абзац і висновки. Деталі беріть лише якщо тема важлива для вас.",
              wpm: 300,
            },
          ],
        },
        {
          slug: "dense-tech",
          titleUk: "Щільний tech-текст",
          titleEn: "Dense tech text",
          baseXp: 28,
          difficulty: 5,
          exercises: [
            {
              id: "sr-16-1",
              type: "comprehension",
              promptUk: "Кешування",
              passage:
                "HTTP-кеш зменшує latency, коли відповіді повторюються. ETag і Cache-Control допомагають клієнту вирішити, чи можна використати локальну копію. Неправильні заголовки можуть віддавати застарілі дані користувачам.",
              questions: [
                {
                  q: "Навіщо HTTP-кеш?",
                  options: ["Зменшити latency", "Збільшити RAM сервера", "Видалити CSS", "Зламати SSL"],
                  correctIndex: 0,
                },
                {
                  q: "Ризик неправильних заголовків?",
                  options: ["Застарілі дані", "Швидший CPU", "Більше CSS", "Немає ризику"],
                  correctIndex: 0,
                },
              ],
            },
            {
              id: "sr-16-2",
              type: "mcq",
              promptUk: "Перед RSVP на tech-текст:",
              options: [
                "Знайдіть терміни й визначення",
                "Ігноруйте заголовки",
                "Читайте лише останнє речення",
                "Вимкніть розуміння",
              ],
              correctIndex: 0,
            },
          ],
        },
      ],
    },
    {
      slug: "speed-comprehension-tiers",
      titleUk: "Рівні швидкості та розуміння",
      titleEn: "Speed & Comprehension Tiers",
      lessons: [
        {
          slug: "rsvp-tier-200",
          titleUk: "RSVP 200 слів/хв: базовий темп",
          titleEn: "RSVP 200 WPM: baseline pace",
          baseXp: 18,
          difficulty: 2,
          isFree: false,
          exercises: [
            {
              id: "sr-chk-1",
              type: "rsvp",
              promptUk: "Прочитайте уривок зі швидкістю 200 WPM",
              promptEn: "Read the passage at 200 WPM",
              text: "Мозок людини здатний розпізнавати цілі слова за частки секунди, орієнтуючись на контур перших і останніх літер.",
              wpm: 200,
            },
            {
              id: "sr-chk-2",
              type: "comprehension",
              promptUk: "Перевірка розуміння тексту",
              promptEn: "Comprehension verification",
              passage: "Мозок людини здатний розпізнавати цілі слова за частки секунди, орієнтуючись на контур перших і останніх літер.",
              questions: [
                {
                  q: "На що насамперед орієнтується мозок при розпізнаванні слова?",
                  qEn: "What does the brain primarily look at when recognizing words?",
                  options: [
                    "На контур перших і останніх літер",
                    "На точний підрахунок кількості звуків",
                    "Лише на колір шрифту",
                    "На голосні літери в центрі",
                  ],
                  correctIndex: 0,
                },
              ],
            },
          ],
        },
        {
          slug: "rsvp-tier-260",
          titleUk: "RSVP 260 слів/хв: аналітичний текст",
          titleEn: "RSVP 260 WPM: analytical text",
          baseXp: 20,
          difficulty: 3,
          isFree: false,
          exercises: [
            {
              id: "sr-chk-3",
              type: "rsvp",
              promptUk: "RSVP 260 слів/хв: аналітичний уривок",
              promptEn: "RSVP 260 WPM: analytical passage",
              text: "Рефакторинг архітектури без автоматизованих тестів подібний до операції із зав'язаними очима. Навіть невеликі зміни в логіці можуть викликати неочікувані регресії в сторонніх модулях.",
              wpm: 260,
            },
            {
              id: "sr-chk-4",
              type: "comprehension",
              promptUk: "Питання до тексту про рефакторинг",
              promptEn: "Questions on the refactoring passage",
              passage: "Рефакторинг архітектури без автоматизованих тестів подібний до операції із зав'язаними очима. Навіть невеликі зміни в логіці можуть викликати неочікувані регресії в сторонніх модулях.",
              questions: [
                {
                  q: "Чому рефакторинг без тестів небезпечний?",
                  qEn: "Why is refactoring without tests dangerous?",
                  options: [
                    "Можливі неочікувані регресії в інших модулях",
                    "Код стає занадто швидким",
                    "Сервер автоматично вимикається",
                    "Зникають коментарі",
                  ],
                  correctIndex: 0,
                },
              ],
            },
          ],
        },
        {
          slug: "chunking-word-groups",
          titleUk: "Фіксація блоками слів",
          titleEn: "Chunking: 2-3 words per fixation",
          baseXp: 20,
          difficulty: 3,
          isFree: false,
          exercises: [
            {
              id: "sr-chk-5",
              type: "rsvp",
              promptUk: "Тренування чанкінгу на швидкості 280 WPM",
              promptEn: "Chunking training at 280 WPM",
              text: "Об'єднання слів у семантичні групи зменшує кількість саккад і звільняє когнітивні ресурси для осмислення загального сюжету.",
              wpm: 280,
            },
            {
              id: "sr-chk-6",
              type: "mcq",
              promptUk: "Чанкінг (chunking) у читанні означає:",
              promptEn: "Chunking in reading means:",
              options: [
                "Сприйняття смислових груп із 2–3 слів за одну фіксацію погляду",
                "Читання тексту задом наперед",
                "Пропускання кожного другого рядка",
                "Читання лише першого абзацу",
              ],
              correctIndex: 0,
            },
          ],
        },
        {
          slug: "speed-checkpoint-comprehension-mid",
          titleUk: "Контрольний чекпоінт: швидкість 250 слів/хв",
          titleEn: "Checkpoint: 250 WPM comprehension test",
          baseXp: 28,
          difficulty: 3,
          isFree: false,
          isExam: true,
          passThreshold: 0.7,
          exercises: [
            {
              id: "sr-chk-7",
              type: "rsvp",
              promptUk: "Контрольний RSVP текст (250 WPM)",
              promptEn: "Checkpoint RSVP text (250 WPM)",
              text: "Індекси в реляційних базах даних організовані у вигляді B-дерев. Вони дозволяють знаходити потрібні рядки за логарифмічний час замість повного сканування таблиці. Проте надмірна кількість індексів уповільнює операції запису.",
              wpm: 250,
            },
            {
              id: "sr-chk-8",
              type: "comprehension",
              promptUk: "Перевірка розуміння прочитаного контрольного тексту",
              promptEn: "Comprehension test on the checkpoint passage",
              passage: "Індекси в реляційних базах даних організовані у вигляді B-дерев. Вони дозволяють знаходити потрібні рядки за логарифмічний час замість повного сканування таблиці. Проте надмірна кількість індексів уповільнює операції запису.",
              questions: [
                {
                  q: "Яку структуру зазвичай мають індекси в РБД?",
                  qEn: "What data structure do RDBMS indexes usually have?",
                  options: ["B-дерева", "Зв'язні списки", "Хеш-таблиці без колізій", "Стеки"],
                  correctIndex: 0,
                },
                {
                  q: "Який головний недолік надлишкових індексів?",
                  qEn: "What is the primary drawback of having too many indexes?",
                  options: [
                    "Уповільнення операцій запису (INSERT / UPDATE)",
                    "Видалення бази даних",
                    "Неможливість робити SELECT",
                    "Збільшення швидкості мережі",
                  ],
                  correctIndex: 0,
                },
              ],
            },
          ],
        },
        {
          slug: "rsvp-tier-320",
          titleUk: "RSVP 320 слів/хв: огляд фактів",
          titleEn: "RSVP 320 WPM: factual overview",
          baseXp: 22,
          difficulty: 3,
          isFree: false,
          exercises: [
            {
              id: "sr-chk-9",
              type: "rsvp",
              promptUk: "RSVP 320 WPM: науково-популярний огляд",
              promptEn: "RSVP 320 WPM: science overview",
              text: "Алан Тюрінг у 1936 році представив концепцію універсальної машини, здатної симулювати будь-який обчислювальний алгоритм за наявності достатньої кількості пам'яті та часу.",
              wpm: 320,
            },
            {
              id: "sr-chk-10",
              type: "comprehension",
              promptUk: "Питання до тексту про Тюрінга",
              promptEn: "Questions about the Turing passage",
              passage: "Алан Тюрінг у 1936 році представив концепцію універсальної машини, здатної симулювати будь-який обчислювальний алгоритм за наявності достатньої кількості пам'яті та часу.",
              questions: [
                {
                  q: "У якому році була опублікована робота про універсальну машину?",
                  qEn: "In what year was the universal machine concept introduced?",
                  options: ["1936", "1945", "1920", "1954"],
                  correctIndex: 0,
                },
              ],
            },
          ],
        },
        {
          slug: "skimming-document-structure",
          titleUk: "Швидкий перегляд структури документа",
          titleEn: "Skimming & structure scanning",
          baseXp: 22,
          difficulty: 3,
          isFree: false,
          exercises: [
            {
              id: "sr-chk-11",
              type: "comprehension",
              promptUk: "Скімінг: знайдіть ключовий висновок за 10 секунд",
              promptEn: "Skimming: identify key takeaway in 10 seconds",
              passage: "Вступ: Дослідження охопило 1000 співробітників. Методологія: Щоденне вимірювання показників сну. Результати: Регулярний 8-годинний сон підвищує швидкість прийняття рішень на 34%. Висновок: Повноцінний відпочинок є головним фактором когнітивної стійкості.",
              questions: [
                {
                  q: "На скільки відсотків сон покращує швидкість прийняття рішень?",
                  qEn: "By what percentage does sleep improve decision speed?",
                  options: ["34%", "15%", "50%", "10%"],
                  correctIndex: 0,
                },
              ],
            },
            {
              id: "sr-chk-12",
              type: "mcq",
              promptUk: "Скімінг (skimming) найефективніше застосовувати для:",
              promptEn: "Skimming is most effectively used to:",
              options: [
                "Швидкого з'ясування головної ідеї та структури перед детальним вивченням",
                "Заучування віршів напам'ять",
                "Пошуку синтаксичних помилок у коді",
                "Вивчення юридичного договору з дрібним шрифтом",
              ],
              correctIndex: 0,
            },
          ],
        },
        {
          slug: "rsvp-tier-380",
          titleUk: "RSVP 380 слів/хв: спринт на сприйняття",
          titleEn: "RSVP 380 WPM: high-velocity sprint",
          baseXp: 24,
          difficulty: 4,
          isFree: false,
          exercises: [
            {
              id: "sr-chk-13",
              type: "rsvp",
              promptUk: "Спринт 380 WPM: тримайте фокус у центрі екрана",
              promptEn: "Sprint 380 WPM: keep focus in the center of the screen",
              text: "Швидкісне читання не означає втрату глибини. Це вміння адаптувати темп залежно від важливості та складності матеріалу.",
              wpm: 380,
            },
            {
              id: "sr-chk-14",
              type: "comprehension",
              promptUk: "Питання до спринтерського уривка",
              promptEn: "Question on the sprint passage",
              passage: "Швидкісне читання не означає втрату глибини. Це вміння адаптувати темп залежно від важливості та складності матеріалу.",
              questions: [
                {
                  q: "Що є ключовою ознакою майстерного читача згідно з текстом?",
                  qEn: "What is the key sign of a skilled reader according to the text?",
                  options: [
                    "Вміння адаптувати темп залежно від складності матеріалу",
                    "Читання абсолютно всіх книг на максимальній швидкості",
                    "Повна відмова від художньої літератури",
                    "Читання тільки вночі",
                  ],
                  correctIndex: 0,
                },
              ],
            },
          ],
        },
        {
          slug: "peripheral-expansion",
          titleUk: "Розширення периферійного поля зору",
          titleEn: "Peripheral vision field expansion",
          baseXp: 22,
          difficulty: 3,
          isFree: false,
          exercises: [
            {
              id: "sr-chk-15",
              type: "comprehension",
              promptUk: "Охоплення широкого рядка за одну фіксацію",
              promptEn: "Capturing a wide line in a single fixation",
              passage: "Периферійний зір дозволяє охоплювати початок і кінець рядка, не переміщуючи погляд до самих полів сторінки.",
              questions: [
                {
                  q: "Яка перевага розвитку периферійного зору?",
                  qEn: "What is the benefit of expanding peripheral vision?",
                  options: [
                    "Менша кількість горизонтальних рухів очей від краю до краю",
                    "Покращення слуху",
                    "Здатність бачити в темряві",
                    "Відсутність потреби в освітленні",
                  ],
                  correctIndex: 0,
                },
              ],
            },
            {
              id: "sr-chk-16",
              type: "mcq",
              promptUk: "Таблиці Шульте використовуються для:",
              promptEn: "Schulte tables are used to train:",
              options: [
                "Розширення кута зору та периферійної уваги",
                "Перевірки граматики",
                "Підрахунку слів у тексті",
                "Вимірювання пульсу",
              ],
              correctIndex: 0,
            },
          ],
        },
        {
          slug: "speed-checkpoint-comprehension-adv",
          titleUk: "Контрольний чекпоінт: спринт 350 слів/хв",
          titleEn: "Checkpoint: 350 WPM comprehension test",
          baseXp: 28,
          difficulty: 4,
          isFree: false,
          isExam: true,
          passThreshold: 0.7,
          exercises: [
            {
              id: "sr-chk-17",
              type: "rsvp",
              promptUk: "Контрольний швидкісний RSVP спринт (350 WPM)",
              promptEn: "Advanced checkpoint RSVP sprint (350 WPM)",
              text: "Квантові комп'ютери використовують кубіти, які завдяки принципу суперпозиції можуть одночасно представляти комбінацію нуля та одиниці. Це відкриває революційні можливості для криптографії та молекулярного моделювання, хоча збереження когерентності залишається серйозним інженерним викликом.",
              wpm: 350,
            },
            {
              id: "sr-chk-18",
              type: "comprehension",
              promptUk: "Контрольні запитання до тексту про квантові обчислення",
              promptEn: "Checkpoint questions on the quantum computing passage",
              passage: "Квантові комп'ютери використовують кубіти, які завдяки принципу суперпозиції можуть одночасно представляти комбінацію нуля та одиниці. Це відкриває революційні можливості для криптографії та молекулярного моделювання, хоча збереження когерентності залишається серйозним інженерним викликом.",
              questions: [
                {
                  q: "Який фізичний принцип дозволяє кубітам бути комбінацією 0 і 1?",
                  qEn: "What physical principle allows qubits to represent 0 and 1 simultaneously?",
                  options: ["Суперпозиція", "Гравітація", "Електроліз", "Теплопровідність"],
                  correctIndex: 0,
                },
                {
                  q: "Який інженерний виклик зазначено в тексті?",
                  qEn: "What engineering challenge is mentioned in the passage?",
                  options: [
                    "Збереження квантової когерентності",
                    "Брак електроенергії на планеті",
                    "Відсутність моніторів",
                    "Заборона мов програмування",
                  ],
                  correctIndex: 0,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      slug: "technical-docs-comprehension",
      titleUk: "Читання документації та виділення обмежень",
      titleEn: "Technical Documentation & Constraint Extraction",
      lessons: [
        {
          slug: "scanning-api-constraints",
          titleUk: "Виділення лімітів і preconditions в API-доках",
          titleEn: "Extracting Rate Limits & Preconditions",
          baseXp: 24,
          difficulty: 3,
          isFree: false,
          exercises: [
            {
              id: "sr-tech-1",
              type: "comprehension",
              promptUk: "Прочитайте фрагмент технічної специфікації та виділіть жорстке обмеження",
              promptEn: "Read this API specification excerpt and extract the strict constraint",
              passage:
                "POST /api/tasks вимагає заголовок Content-Type: application/json та автентифіковану cookie-сесію. Назва задачі обмежена 120 символами; порожній рядок після trim повертає HTTP 422 validation_error. Ліміт запитів: 60 запитів за хвилину на користувача, при перевищенні повертається 429 із заголовком Retry-After.",
              questions: [
                {
                  q: "Що поверне API, якщо надіслати title із пробілів?",
                  options: ["HTTP 422 validation_error", "HTTP 201 Created", "HTTP 429 Retry-After", "HTTP 301 Redirect"],
                  correctIndex: 0,
                },
                {
                  q: "Який заголовок допомагає клієнту знати, коли повторити запит після 429?",
                  options: ["Retry-After", "Cache-Control", "ETag", "X-Powered-By"],
                  correctIndex: 0,
                },
              ],
            },
          ],
        },
        {
          slug: "scanning-breaking-changes-rsvp",
          titleUk: "Швидкий перегляд changelog та Breaking Changes",
          titleEn: "Fast Scanning of Changelogs & Breaking Changes",
          baseXp: 24,
          difficulty: 3,
          isFree: false,
          exercises: [
            {
              id: "sr-tech-2",
              type: "rsvp",
              promptUk: "Зчитайте примітку про міграцію на темпі 240 WPM і зафіксуйте ключовий ризик",
              promptEn: "Read the migration note at 240 WPM and catch the breaking detail",
              text: "Release v5 removes automatic fallback from DATABASE_URL to localhost. Ensure DATABASE_URL is explicitly set before restarting API pods, and apply migration 0014 before deploying new workers.",
              wpm: 240,
            },
            {
              id: "sr-tech-3",
              type: "comprehension",
              promptUk: "Перевірка уважності до порядку дій із release notes",
              promptEn: "Check order sensitivity from the release note",
              passage:
                "Реліз v5 прибирає автоматичний fallback DATABASE_URL на localhost. Перед рестартом API-подів обов'язково задайте DATABASE_URL явно і застосуйте міграцію 0014 до запуску нових воркерів.",
              questions: [
                {
                  q: "Що станеться, якщо запустити нові воркери до міграції 0014?",
                  options: [
                    "Воркери звертатимуться до ще не існуючих колонок або таблиць і падатимуть",
                    "Міграція застосується автоматично в браузері",
                    "PostgreSQL сам відкотить попередній реліз",
                    "Швидкість записів подвоїться",
                  ],
                  correctIndex: 0,
                },
              ],
            },
          ],
        },
        {
          slug: "sr-tech-checkpoint",
          titleUk: "Контрольна: точне читання специфікацій",
          titleEn: "Checkpoint: Spec & Docs Extraction",
          baseXp: 30,
          difficulty: 4,
          isFree: false,
          isExam: true,
          passThreshold: 0.7,
          exercises: [
            {
              id: "sr-tech-e1",
              type: "comprehension",
              promptUk: "Знайдіть дві обов'язкові вимоги безпеки у короткому RFC-фрагменті",
              promptEn: "Extract the two security invariants from this short spec note",
              passage:
                "Токени скидання пароля дійсні рівно 15 хвилин і одноразові. У базі зберігається лише SHA-256 хеш токена; сирий токен ніколи не логується і надсилається лише через HTTPS.",
              questions: [
                {
                  q: "Що саме зберігається в таблиці БД замість сирого токена?",
                  options: ["SHA-256 хеш токена", "Токен у plain text", "Пароль користувача", "Публічний ключ клієнта"],
                  correctIndex: 0,
                },
                {
                  q: "Скільки разів можна використати один токен скидання пароля?",
                  options: ["Один раз (single-use протягом 15 хв)", "Необмежено протягом доби", "Тричі", "Доки активна cookie-сесія"],
                  correctIndex: 0,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
