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
  ],
};
