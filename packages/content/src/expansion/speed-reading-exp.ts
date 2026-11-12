import type { CourseContent, UnitContent } from "../types.js";
import { expandCourse } from "./factory.js";

const newUnits: UnitContent[] = [
  {
    slug: "argument-structure",
    titleUk: "Структура аргументу",
    titleEn: "Argument structure",
    lessons: [
      {
        slug: "sr-arg-claim",
        titleUk: "Твердження і доказ",
        titleEn: "Claims and evidence",
        baseXp: 18,
        difficulty: 2,
        isFree: true,
        exercises: [
          {
            "id": "sr-ac-1",
            "type": "mcq",
            "promptUk": "Чим твердження відрізняється від доказу?",
            "promptEn": "How does a claim differ from evidence?",
            "options": [
              "твердження — це теза, доказ — факти чи дані, що її підпирають",
              "це синоніми",
              "доказ завжди є думкою автора",
              "твердження не можна перевірити ніколи"
            ],
            "correctIndex": 0,
            "explanationUk": "Спочатку знайдіть тезу, потім запитайте «чим це підтверджено?».",
            "explanationEn": "First find the thesis, then ask 'what supports this?'."
          },
          {
            "id": "sr-ac-2",
            "type": "rsvp",
            "promptUk": "RSVP: короткий аргумент",
            "promptEn": "RSVP: a short argument",
            "text": "Команди, що пишуть короткі проєктні рішення, рідше повторюють ті самі суперечки. Дослідження внутрішніх ретроспектив однієї інженерної організації показало: після запровадження односторінкових ADR кількість повторних дискусій про стек зменшилась. Це не доводить, що ADR завжди працюють, але дає підставу спробувати їх у схожому контексті.",
            "wpm": 220
          },
          {
            "id": "sr-ac-3",
            "type": "comprehension",
            "promptUk": "Прочитайте й виділіть частини аргументу",
            "promptEn": "Read and identify the parts of the argument",
            "passage": "Команди, що пишуть короткі проєктні рішення, рідше повторюють ті самі суперечки. Дослідження внутрішніх ретроспектив однієї інженерної організації показало: після запровадження односторінкових ADR кількість повторних дискусій про стек зменшилась. Це не доводить, що ADR завжди працюють, але дає підставу спробувати їх у схожому контексті.",
            "questions": [
              {
                "q": "Яке головне твердження?",
                "qEn": "What is the main claim?",
                "options": [
                  "Команди з короткими письмовими рішеннями рідше повторюють суперечки",
                  "ADR завжди працюють у будь-якій компанії",
                  "Ретроспективи шкідливі",
                  "Стек треба змінювати щокварталу"
                ],
                "correctIndex": 0
              },
              {
                "q": "Що є доказом?",
                "qEn": "What is the evidence?",
                "options": [
                  "дані ретроспектив однієї організації після запровадження ADR",
                  "загальновідома істина без джерела",
                  "цитата знаменитості",
                  "особиста образа опонента"
                ],
                "correctIndex": 0
              },
              {
                "q": "Яке обмеження автор визнає?",
                "qEn": "What limitation does the author acknowledge?",
                "options": [
                  "це не доводить, що ADR завжди працюють",
                  "ADR заборонені",
                  "даних було забагато",
                  "організація не існувала"
                ],
                "correctIndex": 0
              }
            ],
            "explanationUk": "Твердження, доказ і застереження стоять окремо — так аргумент чесніший.",
            "explanationEn": "Claim, evidence and a caveat sit apart — that makes the argument more honest."
          }
        ],
      },
      {
        slug: "sr-arg-hedge",
        titleUk: "Огородження: may, suggest, typically",
        titleEn: "Hedges: may, suggest, typically",
        baseXp: 18,
        difficulty: 2,
        isFree: false,
        exercises: [
          {
            "id": "sr-ah-1",
            "type": "mcq",
            "promptUk": "Навіщо в тексті слова may, suggest, typically?",
            "promptEn": "Why do texts use may, suggest, typically?",
            "options": [
              "вони обмежують силу твердження і зменшують ризик перебільшення",
              "вони завжди роблять текст слабким і поганим",
              "це лише заповнювачі без сенсу",
              "вони замінюють докази"
            ],
            "correctIndex": 0,
            "explanationUk": "Хедж показує межі впевненості, а не відсутність думки.",
            "explanationEn": "A hedge shows the limits of confidence, not a lack of a view."
          },
          {
            "id": "sr-ah-2",
            "type": "rsvp",
            "promptUk": "RSVP: текст із хеджами",
            "promptEn": "RSVP: a hedged passage",
            "text": "A weekly review of error budgets may surface regressions earlier than a monthly report. One platform team's dashboard suggested that budget burn over two days typically preceded a user-visible incident. This pattern might not hold for batch workloads, so treat it as a hypothesis to test, not a universal rule.",
            "wpm": 240
          },
          {
            "id": "sr-ah-3",
            "type": "comprehension",
            "promptUk": "Прочитайте англійський уривок",
            "promptEn": "Read the English passage",
            "passage": "A weekly review of error budgets may surface regressions earlier than a monthly report. One platform team's dashboard suggested that budget burn over two days typically preceded a user-visible incident. This pattern might not hold for batch workloads, so treat it as a hypothesis to test, not a universal rule.",
            "questions": [
              {
                "q": "Наскільки сильне перше речення?",
                "qEn": "How strong is the first sentence?",
                "options": [
                  "обережне: may, не will always",
                  "абсолютне: завжди і всюди",
                  "це наказ без винятку",
                  "це жарт"
                ],
                "correctIndex": 0
              },
              {
                "q": "Для яких навантажень автор сумнівається?",
                "qEn": "For which workloads does the author express doubt?",
                "options": [
                  "batch workloads",
                  "усі без винятку",
                  "лише мобільні додатки",
                  "лише ігри"
                ],
                "correctIndex": 0
              },
              {
                "q": "Як автор пропонує ставитись до закономірності?",
                "qEn": "How should the pattern be treated?",
                "options": [
                  "як гіпотезу для перевірки, не як універсальне правило",
                  "як закон фізики",
                  "як причину звільнити команду",
                  "як доказ, що дашборди зайві"
                ],
                "correctIndex": 0
              }
            ]
          }
        ],
      },
      {
        slug: "sr-arg-assumption",
        titleUk: "Приховані припущення в тексті",
        titleEn: "Hidden assumptions in a text",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "sr-aa-1",
            "type": "mcq",
            "promptUk": "Приховане припущення — це:",
            "promptEn": "A hidden assumption is:",
            "options": [
              "невисловлене твердження, без якого висновок не випливає",
              "посилання внизу сторінки",
              "назва розділу",
              "шрифт тексту"
            ],
            "correctIndex": 0,
            "explanationUk": "Запитайте: що має бути істинним, щоб висновок тримався?",
            "explanationEn": "Ask: what must be true for the conclusion to follow?"
          },
          {
            "id": "sr-aa-2",
            "type": "rsvp",
            "promptUk": "RSVP: текст із припущенням",
            "promptEn": "RSVP: a passage with an assumption",
            "text": "Ми збільшили кількість розробників удвічі, отже наступний реліз вийде вдвічі швидше. Дедлайн не змінюється, а обсяг робіт той самий. Керівництво очікує лінійного прискорення від додавання людей.",
            "wpm": 230
          },
          {
            "id": "sr-aa-3",
            "type": "comprehension",
            "promptUk": "Знайдіть припущення",
            "promptEn": "Find the assumption",
            "passage": "Ми збільшили кількість розробників удвічі, отже наступний реліз вийде вдвічі швидше. Дедлайн не змінюється, а обсяг робіт той самий. Керівництво очікує лінійного прискорення від додавання людей.",
            "questions": [
              {
                "q": "Яке припущення стоїть за висновком?",
                "qEn": "Which assumption sits behind the conclusion?",
                "options": [
                  "більше людей лінійно прискорює здачу за незмінного обсягу",
                  "дедлайн уже минув",
                  "розробників стало менше",
                  "обсяг робіт зріс удвічі"
                ],
                "correctIndex": 0
              },
              {
                "q": "Чому це припущення варто перевірити?",
                "qEn": "Why is that assumption worth checking?",
                "options": [
                  "нові люди потребують часу на адаптацію і можуть сповільнити команду",
                  "математика забороняє додавати людей",
                  "релізи не мають дедлайнів",
                  "обсяг завжди нескінченний"
                ],
                "correctIndex": 0
              }
            ]
          }
        ],
      },
      {
        slug: "sr-arg-counter",
        titleUk: "Контраргумент і обмеження",
        titleEn: "Counterarguments and limits",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "sr-aco-1",
            "type": "mcq",
            "promptUk": "Навіщо автор сам наводить обмеження свого висновку?",
            "promptEn": "Why would an author state a limit on their own conclusion?",
            "options": [
              "щоб точно окреслити, де твердження ще не перевірене",
              "щоб сховати головну думку",
              "це завжди ознака слабкості без винятку",
              "щоб збільшити кількість слів"
            ],
            "correctIndex": 0,
            "explanationUk": "Чесне обмеження підвищує довіру і допомагає читачеві застосувати висновок правильно.",
            "explanationEn": "An honest limit builds trust and helps the reader apply the conclusion correctly."
          },
          {
            "id": "sr-aco-2",
            "type": "rsvp",
            "promptUk": "RSVP: висновок з обмеженням",
            "promptEn": "RSVP: a conclusion with a limit",
            "text": "Кеш на читання знизив p95 латентність каталогу з 800 мс до 120 мс у годину пік. Експеримент тривав два тижні на одному регіоні. Ми не вимірювали вплив на консистентність під час акцій, тому не рекомендуємо той самий TTL для кошика.",
            "wpm": 240
          },
          {
            "id": "sr-aco-3",
            "type": "comprehension",
            "promptUk": "Що автор обмежує?",
            "promptEn": "What does the author limit?",
            "passage": "Кеш на читання знизив p95 латентність каталогу з 800 мс до 120 мс у годину пік. Експеримент тривав два тижні на одному регіоні. Ми не вимірювали вплив на консистентність під час акцій, тому не рекомендуємо той самий TTL для кошика.",
            "questions": [
              {
                "q": "Де результат точно зафіксовано?",
                "qEn": "Where is the result clearly established?",
                "options": [
                  "каталог, один регіон, два тижні, година пік",
                  "усі сервіси компанії назавжди",
                  "кошик під час акцій",
                  "запис у базу"
                ],
                "correctIndex": 0
              },
              {
                "q": "Чого автор не рекомендує?",
                "qEn": "What does the author not recommend?",
                "options": [
                  "той самий TTL для кошика",
                  "кеш для каталогу взагалі",
                  "вимірювати p95",
                  "закінчувати експеримент"
                ],
                "correctIndex": 0
              }
            ]
          }
        ],
      },
      {
        slug: "sr-arg-review",
        titleUk: "Огляд: розібрати абзац",
        titleEn: "Review: take a paragraph apart",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "sr-ar-1",
            "type": "mcq",
            "promptUk": "Який порядок корисний під час аналітичного читання?",
            "promptEn": "Which order helps during analytical reading?",
            "options": [
              "теза → докази → припущення → обмеження",
              "спочатку висновок відкинути, текст не читати",
              "рахувати лише кількість прикметників",
              "шукати лише помилки орфографії"
            ],
            "correctIndex": 0,
            "explanationUk": "Цей порядок не дає сплутати факт, думку і межу застосування.",
            "explanationEn": "This order keeps facts, opinions and scope from collapsing into one."
          },
          {
            "id": "sr-ar-2",
            "type": "rsvp",
            "promptUk": "RSVP: огляд абзацу",
            "promptEn": "RSVP: a review paragraph",
            "text": "Open source licenses are not interchangeable. A team that copies a file from a GPL-licensed repository into a proprietary product may take on obligations it did not budget for. Legal review of a short dependency list typically costs less than an emergency rewrite after a compliance audit.",
            "wpm": 250
          },
          {
            "id": "sr-ar-3",
            "type": "comprehension",
            "promptUk": "Розіберіть абзац",
            "promptEn": "Take the paragraph apart",
            "passage": "Open source licenses are not interchangeable. A team that copies a file from a GPL-licensed repository into a proprietary product may take on obligations it did not budget for. Legal review of a short dependency list typically costs less than an emergency rewrite after a compliance audit.",
            "questions": [
              {
                "q": "Головна теза першого речення:",
                "qEn": "The main claim of the first sentence:",
                "options": [
                  "ліцензії open source не взаємозамінні",
                  "усі ліцензії однакові",
                  "GPL заборонений",
                  "аудити непотрібні"
                ],
                "correctIndex": 0
              },
              {
                "q": "Який практичний висновок?",
                "qEn": "What is the practical takeaway?",
                "options": [
                  "короткий юридичний перегляд залежностей зазвичай дешевший за аварійну переписку",
                  "залежності треба ігнорувати",
                  "переписувати продукт щотижня",
                  "не користуватися відкритим кодом ніколи"
                ],
                "correctIndex": 0
              }
            ]
          }
        ],
      },
    ],
  },
  {
    slug: "research-abstracts",
    titleUk: "Анотації й методи",
    titleEn: "Abstracts and methods",
    lessons: [
      {
        slug: "sr-abs-structure",
        titleUk: "Структура анотації",
        titleEn: "The structure of an abstract",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "sr-as-1",
            "type": "mcq",
            "promptUk": "Типова наукова анотація відповідає на:",
            "promptEn": "A typical research abstract answers:",
            "options": [
              "навіщо, що зробили, що знайшли, які межі",
              "лише ім'я автора і місто",
              "рекламний слоган без методу",
              "повний текст усіх таблиць"
            ],
            "correctIndex": 0,
            "explanationUk": "Мета, метод, результат і обмеження — каркас, який можна читати вибірково.",
            "explanationEn": "Purpose, method, result and limits are a scaffold you can read selectively."
          },
          {
            "id": "sr-as-2",
            "type": "rsvp",
            "promptUk": "RSVP: анотація",
            "promptEn": "RSVP: an abstract",
            "text": "Мета: перевірити, чи короткі щоденні сесії швидкісного читання покращують розуміння технічних текстів. Метод: 64 інженери, чотири тижні, контроль — звичайне читання. Результат: швидкість зросла, а точність відповідей на детальні питання не впала в групі, що робила паузу після кожного розділу. Обмеження: лише тексти рідною мовою, короткий період.",
            "wpm": 230
          },
          {
            "id": "sr-as-3",
            "type": "comprehension",
            "promptUk": "Витягніть каркас анотації",
            "promptEn": "Extract the abstract's frame",
            "passage": "Мета: перевірити, чи короткі щоденні сесії швидкісного читання покращують розуміння технічних текстів. Метод: 64 інженери, чотири тижні, контроль — звичайне читання. Результат: швидкість зросла, а точність відповідей на детальні питання не впала в групі, що робила паузу після кожного розділу. Обмеження: лише тексти рідною мовою, короткий період.",
            "questions": [
              {
                "q": "Який метод?",
                "qEn": "What was the method?",
                "options": [
                  "64 інженери, чотири тижні, контрольна група зі звичайним читанням",
                  "один автор, один день, без контролю",
                  "опитування в соцмережах",
                  "метааналіз ста статтей"
                ],
                "correctIndex": 0
              },
              {
                "q": "Де результат не слід узагальнювати без застереження?",
                "qEn": "Where should you not generalise the result without a caveat?",
                "options": [
                  "на іншомовні тексти і довгі періоди",
                  "на цю саму вибірку в межах дослідження",
                  "на сам факт, що були 64 учасники",
                  "на наявність контрольної групи"
                ],
                "correctIndex": 0
              }
            ]
          }
        ],
      },
      {
        slug: "sr-abs-method",
        titleUk: "Читати метод, не лише заголовок",
        titleEn: "Read the method, not only the title",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "sr-am-1",
            "type": "mcq",
            "promptUk": "Чому заголовок «X покращує Y» сам по собі недостатній?",
            "promptEn": "Why is a title like 'X improves Y' not enough on its own?",
            "options": [
              "треба знати вибірку, контроль і що саме вимірювали",
              "заголовки завжди брехливі",
              "методи читати заборонено",
              "Y не буває вимірюваним"
            ],
            "correctIndex": 0,
            "explanationUk": "Сила висновку дорівнює якості методу, а не гучності заголовка.",
            "explanationEn": "The strength of a conclusion equals the quality of the method, not the volume of the title."
          },
          {
            "id": "sr-am-2",
            "type": "rsvp",
            "promptUk": "RSVP: метод",
            "promptEn": "RSVP: a method",
            "text": "We compared two onboarding checklists in a single company. The treatment group received a five-item list with a buddy; the control received the existing twelve-page handbook. The outcome was time to first merged pull request, measured over six weeks, among thirty new hires. We did not randomise by office, so location remains a confounder.",
            "wpm": 250
          },
          {
            "id": "sr-am-3",
            "type": "comprehension",
            "promptUk": "Що вимірювали і що заважає?",
            "promptEn": "What was measured, and what confounds it?",
            "passage": "We compared two onboarding checklists in a single company. The treatment group received a five-item list with a buddy; the control received the existing twelve-page handbook. The outcome was time to first merged pull request, measured over six weeks, among thirty new hires. We did not randomise by office, so location remains a confounder.",
            "questions": [
              {
                "q": "Який показник результату?",
                "qEn": "What is the outcome measure?",
                "options": [
                  "час до першого змердженого pull request",
                  "зарплата",
                  "кількість сторінок підручника",
                  "задоволеність клієнтів"
                ],
                "correctIndex": 0
              },
              {
                "q": "Який фактор лишається змішувальним?",
                "qEn": "Which factor remains a confounder?",
                "options": [
                  "офіс / локація, бо не було рандомізації за офісом",
                  "колір логотипа",
                  "мова Python",
                  "день тижня публікації статті"
                ],
                "correctIndex": 0
              }
            ]
          }
        ],
      },
      {
        slug: "sr-abs-limits",
        titleUk: "Обмеження і зовнішня валідність",
        titleEn: "Limits and external validity",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "sr-al-1",
            "type": "mcq",
            "promptUk": "Зовнішня валідність стосується:",
            "promptEn": "External validity concerns:",
            "options": [
              "наскільки результат переноситься на інші умови й людей",
              "чи арифметика в таблиці правильна",
              "чи шрифт читабельний",
              "чи автор має вчений ступінь"
            ],
            "correctIndex": 0,
            "explanationUk": "Внутрішня валідність — чи висновки чесні всередині дослідження; зовнішня — чи вони живуть зовні.",
            "explanationEn": "Internal validity is whether the study's own conclusions are fair; external validity is whether they travel."
          },
          {
            "id": "sr-al-2",
            "type": "rsvp",
            "promptUk": "RSVP: обмеження",
            "promptEn": "RSVP: limits",
            "text": "Експеримент із парним програмуванням проводили серед волонтерів однієї конференції протягом дня. Учасники вже вміли працювати в парах і самі записалися. Результат — вища якість коду на навчальній задачі — не обов'язково повториться в команді зі стислим дедлайном і без досвіду парної роботи.",
            "wpm": 230
          },
          {
            "id": "sr-al-3",
            "type": "comprehension",
            "promptUk": "Куди результат може не перенестись?",
            "promptEn": "Where might the result fail to travel?",
            "passage": "Експеримент із парним програмуванням проводили серед волонтерів однієї конференції протягом дня. Учасники вже вміли працювати в парах і самі записалися. Результат — вища якість коду на навчальній задачі — не обов'язково повториться в команді зі стислим дедлайном і без досвіду парної роботи.",
            "questions": [
              {
                "q": "Яка особливість вибірки?",
                "qEn": "What is distinctive about the sample?",
                "options": [
                  "волонтери конференції, уже знайомі з парами",
                  "випадкова вибірка всіх інженерів країни",
                  "діти без досвіду",
                  "тільки менеджери"
                ],
                "correctIndex": 0
              },
              {
                "q": "Де автор сумнівається в переносі?",
                "qEn": "Where does the author doubt transfer?",
                "options": [
                  "команда зі стислим дедлайном і без досвіду парної роботи",
                  "та сама навчальна задача на тій конференції",
                  "сам факт, що експеримент був",
                  "назва конференції"
                ],
                "correctIndex": 0
              }
            ]
          }
        ],
      },
      {
        slug: "sr-abs-numbers",
        titleUk: "Числа в тексті: база й значущість",
        titleEn: "Numbers in text: baselines and significance",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "sr-an-1",
            "type": "mcq",
            "promptUk": "«Помилки зменшились на 50%» без бази — проблема, бо:",
            "promptEn": "'Errors fell by 50%' without a baseline is a problem because:",
            "options": [
              "невідомо, чи це 2 з 4 чи 200 з 400, і за який період",
              "відсотки завжди брехня",
              "50% не є числом",
              "зменшення помилок неможливе"
            ],
            "correctIndex": 0,
            "explanationUk": "Завжди шукайте абсолютні числа, базу, час і розмір вибірки.",
            "explanationEn": "Always look for absolute numbers, a baseline, time and sample size."
          },
          {
            "id": "sr-an-2",
            "type": "rsvp",
            "promptUk": "RSVP: числа",
            "promptEn": "RSVP: numbers",
            "text": "The new lint rule reduced escaped defects from 8 per quarter to 4 per quarter in a codebase of two hundred thousand lines. The team ships about thirty changes a week. A drop of four defects is practically useful here, even if a formal significance test was not published.",
            "wpm": 250
          },
          {
            "id": "sr-an-3",
            "type": "comprehension",
            "promptUk": "Прочитайте числа",
            "promptEn": "Read the numbers",
            "passage": "The new lint rule reduced escaped defects from 8 per quarter to 4 per quarter in a codebase of two hundred thousand lines. The team ships about thirty changes a week. A drop of four defects is practically useful here, even if a formal significance test was not published.",
            "questions": [
              {
                "q": "Яка база?",
                "qEn": "What is the baseline?",
                "options": [
                  "8 дефектів на квартал",
                  "200 000 дефектів",
                  "30 дефектів",
                  "4 відсотки без числа"
                ],
                "correctIndex": 0
              },
              {
                "q": "Що автор відрізняє від формальної значущості?",
                "qEn": "What does the author distinguish from formal significance?",
                "options": [
                  "практичну корисність зменшення на чотири дефекти",
                  "розмір репозиторію",
                  "кількість змін на тиждень як єдиний доказ",
                  "назву lint-правила"
                ],
                "correctIndex": 0
              }
            ]
          }
        ],
      },
      {
        slug: "sr-abs-review",
        titleUk: "Огляд: швидко оцінити статтю",
        titleEn: "Review: quickly assess a paper",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "sr-arv-1",
            "type": "mcq",
            "promptUk": "Мінімальний прохід по статті:",
            "promptEn": "A minimal pass over a paper:",
            "options": [
              "анотація, метод, обмеження, тоді вирішувати, чи читати далі",
              "тільки останнє речення висновків",
              "тільки список літератури",
              "тільки прізвище першого автора"
            ],
            "correctIndex": 0,
            "explanationUk": "Цього достатньо, щоб вирішити, чи варте глибше читання.",
            "explanationEn": "That is enough to decide whether a deeper read is worth it."
          },
          {
            "id": "sr-arv-2",
            "type": "rsvp",
            "promptUk": "RSVP: картка оцінки",
            "promptEn": "RSVP: an assessment card",
            "text": "Перед довгим читанням запишіть одним рядком: яка вибірка, який контроль, який показник, яке головне обмеження. Якщо цих чотирьох відповідей немає ні в анотації, ні на початку методу, ставтеся до гучних висновків з обережністю і шукайте першоджерело даних.",
            "wpm": 240
          },
          {
            "id": "sr-arv-3",
            "type": "comprehension",
            "promptUk": "Що записувати перед глибоким читанням?",
            "promptEn": "What should you jot down before a deep read?",
            "passage": "Перед довгим читанням запишіть одним рядком: яка вибірка, який контроль, який показник, яке головне обмеження. Якщо цих чотирьох відповідей немає ні в анотації, ні на початку методу, ставтеся до гучних висновків з обережністю і шукайте першоджерело даних.",
            "questions": [
              {
                "q": "Які чотири елементи?",
                "qEn": "Which four elements?",
                "options": [
                  "вибірка, контроль, показник, головне обмеження",
                  "шрифт, поля, колір, логотип",
                  "ім'я рецензента, країна, рік, doi лише",
                  "реклама, цитата, слоган, хештег"
                ],
                "correctIndex": 0
              },
              {
                "q": "Що робити, якщо їх немає?",
                "qEn": "What if they are missing?",
                "options": [
                  "обережно ставитись до гучних висновків і шукати першоджерело",
                  "прийняти висновки на віру",
                  "видалити статтю з інтернету",
                  "читати лише заголовок ще раз"
                ],
                "correctIndex": 0
              }
            ]
          }
        ],
      },
    ],
  },
  {
    slug: "operational-text",
    titleUk: "Операційні тексти",
    titleEn: "Operational texts",
    lessons: [
      {
        slug: "sr-ops-runbook",
        titleUk: "Ранбуки: мета й зупинки",
        titleEn: "Runbooks: purpose and stop points",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "sr-or-1",
            "type": "mcq",
            "promptUk": "Під час інциденту в ранбуці спочатку шукайте:",
            "promptEn": "During an incident, first look in a runbook for:",
            "options": [
              "мету кроку, умови «стоп» і команду перевірки",
              "історію компанії",
              "біографію автора",
              "лише приблизний тон тексту"
            ],
            "correctIndex": 0,
            "explanationUk": "Ранбук читають не як роман: спочатку дія, перевірка, умова виходу.",
            "explanationEn": "A runbook is not a novel: action, a check, and an exit condition come first."
          },
          {
            "id": "sr-or-2",
            "type": "rsvp",
            "promptUk": "RSVP: фрагмент ранбука",
            "promptEn": "RSVP: a runbook fragment",
            "text": "Мета: відновити відповіді /health на api-prod. Спочатку перевірте статус деплою за останні 30 хвилин. Якщо зараз іде викат — зупиніться і не масштабуйте вручну. Якщо викату немає, порівняйте репліки: за наявності лише однієї живої не видаляйте її. Після кожної дії запишіть час і результат у канал інциденту.",
            "wpm": 220
          },
          {
            "id": "sr-or-3",
            "type": "comprehension",
            "promptUk": "Що робити і коли зупинитись?",
            "promptEn": "What to do, and when to stop?",
            "passage": "Мета: відновити відповіді /health на api-prod. Спочатку перевірте статус деплою за останні 30 хвилин. Якщо зараз іде викат — зупиніться і не масштабуйте вручну. Якщо викату немає, порівняйте репліки: за наявності лише однієї живої не видаляйте її. Після кожної дії запишіть час і результат у канал інциденту.",
            "questions": [
              {
                "q": "Яка мета?",
                "qEn": "What is the goal?",
                "options": [
                  "відновити відповіді /health на api-prod",
                  "прискорити викат",
                  "видалити останню репліку",
                  "закрити канал інциденту"
                ],
                "correctIndex": 0
              },
              {
                "q": "Коли треба зупинитись і не масштабувати?",
                "qEn": "When should you stop and not scale manually?",
                "options": [
                  "якщо зараз іде викат",
                  "якщо канал порожній",
                  "завжди після однієї хвилини",
                  "ніколи"
                ],
                "correctIndex": 0
              },
              {
                "q": "Чого не робити, коли жива лише одна репліка?",
                "qEn": "What must you not do when only one replica is alive?",
                "options": [
                  "видаляти її",
                  "записувати час у канал",
                  "перевіряти деплой",
                  "читати мету"
                ],
                "correctIndex": 0
              }
            ]
          }
        ],
      },
      {
        slug: "sr-ops-errors",
        titleUk: "Повідомлення про помилки",
        titleEn: "Error messages",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "sr-oe-1",
            "type": "mcq",
            "promptUk": "У повідомленні про помилку спочатку виділіть:",
            "promptEn": "In an error message, first pick out:",
            "options": [
              "що не вдалося, де, і який наступний перевірюваний факт",
              "лише колір лога",
              "усі стектрейси одночасно вголос",
              "випадкове слово з середини"
            ],
            "correctIndex": 0,
            "explanationUk": "Спочатку факт відмови, шлях, код; деталі стека — за потреби.",
            "explanationEn": "First the failure, the path and the code; stack details come if needed."
          },
          {
            "id": "sr-oe-2",
            "type": "rsvp",
            "promptUk": "RSVP: лог помилки",
            "promptEn": "RSVP: an error log",
            "text": "ERROR 2026-11-12T14:02:11Z checkout-api request_id=r-9f3c failed to reserve inventory for sku=UMBRELLA-42: upstream inventory-svc returned 503 after 2.1s (deadline 2s). Retry-After: 5. User-facing result: 503 with message 'temporarily unavailable'. No payment was captured.",
            "wpm": 240
          },
          {
            "id": "sr-oe-3",
            "type": "comprehension",
            "promptUk": "Що саме зламалось?",
            "promptEn": "What exactly failed?",
            "passage": "ERROR 2026-11-12T14:02:11Z checkout-api request_id=r-9f3c failed to reserve inventory for sku=UMBRELLA-42: upstream inventory-svc returned 503 after 2.1s (deadline 2s). Retry-After: 5. User-facing result: 503 with message 'temporarily unavailable'. No payment was captured.",
            "questions": [
              {
                "q": "Який апстрім відповів помилкою?",
                "qEn": "Which upstream returned the error?",
                "options": [
                  "inventory-svc, код 503",
                  "платіжний шлюз",
                  "checkout-api сам собі 200",
                  "DNS корінь"
                ],
                "correctIndex": 0
              },
              {
                "q": "Чи списали кошти?",
                "qEn": "Was payment captured?",
                "options": [
                  "ні, кошти не списано",
                  "так, повністю",
                  "так, частково",
                  "невідомо і не сказано"
                ],
                "correctIndex": 0
              },
              {
                "q": "Чому час 2.1s важливий?",
                "qEn": "Why does 2.1s matter?",
                "options": [
                  "він перевищив дедлайн 2s",
                  "це час доби",
                  "це номер sku",
                  "це request_id"
                ],
                "correctIndex": 0
              }
            ]
          }
        ],
      },
      {
        slug: "sr-ops-rfc",
        titleUk: "MUST, SHOULD, MAY у специфікаціях",
        titleEn: "MUST, SHOULD, MAY in specifications",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "sr-of-1",
            "type": "mcq",
            "promptUk": "У стилі RFC 2119 слово MUST означає:",
            "promptEn": "In RFC 2119 style, MUST means:",
            "options": [
              "обов'язкова вимога: недотримання є порушенням специфікації",
              "побажання, яке можна ігнорувати",
              "лише приклад",
              "заборону завжди"
            ],
            "correctIndex": 0,
            "explanationUk": "MUST — вимога; SHOULD — сильна рекомендація; MAY — опція.",
            "explanationEn": "MUST is a requirement; SHOULD is a strong recommendation; MAY is optional."
          },
          {
            "id": "sr-of-2",
            "type": "rsvp",
            "promptUk": "RSVP: фрагмент специфікації",
            "promptEn": "RSVP: a specification fragment",
            "text": "The webhook receiver MUST respond with 2xx within 10 seconds. It SHOULD retry failed handler work asynchronously rather than blocking the HTTP response. It MAY drop a duplicate event identified by the same event_id. It MUST NOT process a signed payload whose signature does not match.",
            "wpm": 240
          },
          {
            "id": "sr-of-3",
            "type": "comprehension",
            "promptUk": "Розділіть вимоги",
            "promptEn": "Separate the requirements",
            "passage": "The webhook receiver MUST respond with 2xx within 10 seconds. It SHOULD retry failed handler work asynchronously rather than blocking the HTTP response. It MAY drop a duplicate event identified by the same event_id. It MUST NOT process a signed payload whose signature does not match.",
            "questions": [
              {
                "q": "Що є обов'язковим щодо відповіді?",
                "qEn": "What is mandatory about the response?",
                "options": [
                  "2xx протягом 10 секунд",
                  "синхронні повторні спроби в тому ж запиті",
                  "завжди відкидати всі події",
                  "ігнорувати підпис"
                ],
                "correctIndex": 0
              },
              {
                "q": "Що заборонено?",
                "qEn": "What is forbidden?",
                "options": [
                  "обробляти підписане тіло з невідповідним підписом",
                  "відповідати 2xx",
                  "асинхронні ретраї",
                  "відкидати дублікат за event_id"
                ],
                "correctIndex": 0
              }
            ]
          }
        ],
      },
      {
        slug: "sr-ops-timeline",
        titleUk: "Хронологія інциденту",
        titleEn: "An incident timeline",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "sr-ot-1",
            "type": "mcq",
            "promptUk": "Читаючи таймлайн, фіксуйте:",
            "promptEn": "When reading a timeline, note:",
            "options": [
              "час, що змінилось, і вплив на користувача",
              "лише імена присутніх",
              "лише емоції в чаті",
              "випадковий порядок подій"
            ],
            "correctIndex": 0,
            "explanationUk": "Хронологія — скелет постмортему: без часу важко знайти причину.",
            "explanationEn": "A timeline is the skeleton of a postmortem: without times, causes are hard to find."
          },
          {
            "id": "sr-ot-2",
            "type": "rsvp",
            "promptUk": "RSVP: таймлайн",
            "promptEn": "RSVP: a timeline",
            "text": "14:01 моніторинг: помилка 5xx на checkout перевищила 2 відсотки. 14:04 черговий підтвердив, що платажі не проходять у регіоні eu-west. 14:11 відкотили деплой inventory-svc до попереднього дайджесту. 14:18 5xx повернулись нижче 0.2 відсотка, платежі проходять. Початок впливу — не пізніше 14:01, відновлення — 14:18.",
            "wpm": 230
          },
          {
            "id": "sr-ot-3",
            "type": "comprehension",
            "promptUk": "Відновіть хід подій",
            "promptEn": "Reconstruct the course of events",
            "passage": "14:01 моніторинг: помилка 5xx на checkout перевищила 2 відсотки. 14:04 черговий підтвердив, що платажі не проходять у регіоні eu-west. 14:11 відкотили деплой inventory-svc до попереднього дайджесту. 14:18 5xx повернулись нижче 0.2 відсотка, платежі проходять. Початок впливу — не пізніше 14:01, відновлення — 14:18.",
            "questions": [
              {
                "q": "Що зробили о 14:11?",
                "qEn": "What was done at 14:11?",
                "options": [
                  "відкотили деплой inventory-svc",
                  "вимкнули моніторинг",
                  "відкрили новий регіон",
                  "збільшили ціну"
                ],
                "correctIndex": 0
              },
              {
                "q": "Скільки тривав видимий вплив за цим записом?",
                "qEn": "How long did user-visible impact last in this record?",
                "options": [
                  "близько 17 хвилин, від 14:01 до 14:18",
                  "одна хвилина",
                  "дві години",
                  "час не зазначено"
                ],
                "correctIndex": 0
              }
            ]
          }
        ],
      },
      {
        slug: "sr-ops-review",
        titleUk: "Огляд операційного читання",
        titleEn: "Operational reading review",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "sr-ov-1",
            "type": "mcq",
            "promptUk": "Спільне для ранбука, лога й специфікації:",
            "promptEn": "What runbooks, logs and specifications share:",
            "options": [
              "шукайте дію, умову і заборону раніше за прозу",
              "читайте лише останній абзац",
              "ігноруйте числа",
              "завжди читайте вголос з кінця"
            ],
            "correctIndex": 0,
            "explanationUk": "Операційний текст — інструмент дії, не essе.",
            "explanationEn": "Operational text is a tool for action, not an essay."
          },
          {
            "id": "sr-ov-2",
            "type": "rsvp",
            "promptUk": "RSVP: короткий чекліст",
            "promptEn": "RSVP: a short checklist",
            "text": "Перед зміною в проді перекажіть собі трьома реченнями: яка мета, яка перевірка успіху, яка умова відкату. Якщо ви не можете назвати перевірку успіху, ви ще не дочитали інструкцію. Якщо немає умови відкату, зупиніться і запитайте.",
            "wpm": 230
          },
          {
            "id": "sr-ov-3",
            "type": "comprehension",
            "promptUk": "Що треба назвати перед зміною?",
            "promptEn": "What must you name before a change?",
            "passage": "Перед зміною в проді перекажіть собі трьома реченнями: яка мета, яка перевірка успіху, яка умова відкату. Якщо ви не можете назвати перевірку успіху, ви ще не дочитали інструкцію. Якщо немає умови відкату, зупиніться і запитайте.",
            "questions": [
              {
                "q": "Які три речення?",
                "qEn": "Which three sentences?",
                "options": [
                  "мета, перевірка успіху, умова відкату",
                  "бюджет, відпустка, колір кнопки",
                  "лише мета",
                  "лише відкат"
                ],
                "correctIndex": 0
              },
              {
                "q": "Що робити, якщо умови відкату немає?",
                "qEn": "What if there is no rollback condition?",
                "options": [
                  "зупинитись і запитати",
                  "змінювати навмання",
                  "вимикати логи",
                  "чекати наступного року"
                ],
                "correctIndex": 0
              }
            ]
          }
        ],
      },
    ],
  },
  {
    slug: "flexible-speed",
    titleUk: "Гнучка швидкість",
    titleEn: "Flexible speed",
    lessons: [
      {
        slug: "sr-flex-when-slow",
        titleUk: "Коли треба сповільнитись",
        titleEn: "When to slow down",
        baseXp: 18,
        difficulty: 2,
        isFree: true,
        exercises: [
          {
            "id": "sr-fs-1",
            "type": "mcq",
            "promptUk": "Сповільніться, коли зустрічаєте:",
            "promptEn": "Slow down when you meet:",
            "options": [
              "визначення, застереження, числа з базою, умови «якщо»",
              "лише службові слова типу «також»",
              "повтор відомого прикладу",
              "подяку в кінці листа"
            ],
            "correctIndex": 0,
            "explanationUk": "Швидкість — засіб, а не мета: щільні місця читають повільніше.",
            "explanationEn": "Speed is a means, not a goal: dense spots are read more slowly."
          },
          {
            "id": "sr-fs-2",
            "type": "rsvp",
            "promptUk": "RSVP: де уповільнитись",
            "promptEn": "RSVP: where to slow down",
            "text": "The service is eventually consistent. After a write, a read may return the previous value for up to 800 milliseconds in the same region, and for up to five seconds across regions. If your checkout assumes read-your-writes, you must either read from the primary or include the write token in the next request. This constraint does not apply to the admin export job, which reads from a snapshot.",
            "wpm": 210
          },
          {
            "id": "sr-fs-3",
            "type": "comprehension",
            "promptUk": "Де саме потрібна увага?",
            "promptEn": "Where exactly is care needed?",
            "passage": "The service is eventually consistent. After a write, a read may return the previous value for up to 800 milliseconds in the same region, and for up to five seconds across regions. If your checkout assumes read-your-writes, you must either read from the primary or include the write token in the next request. This constraint does not apply to the admin export job, which reads from a snapshot.",
            "questions": [
              {
                "q": "Яке обмеження в тому самому регіоні?",
                "qEn": "What is the limit in the same region?",
                "options": [
                  "до 800 мс старе значення",
                  "п'ять хвилин",
                  "немає затримки взагалі",
                  "800 запитів"
                ],
                "correctIndex": 0
              },
              {
                "q": "На що обмеження не поширюється?",
                "qEn": "What does the constraint not apply to?",
                "options": [
                  "admin export, що читає зі знімка",
                  "checkout із read-your-writes",
                  "читання з другого регіону",
                  "запис загалом"
                ],
                "correctIndex": 0
              }
            ]
          }
        ],
      },
      {
        slug: "sr-flex-reread",
        titleUk: "Повторне читання з метою",
        titleEn: "Rereading with a purpose",
        baseXp: 18,
        difficulty: 2,
        isFree: false,
        exercises: [
          {
            "id": "sr-fr-1",
            "type": "mcq",
            "promptUk": "Корисне повторне читання має:",
            "promptEn": "Useful rereading has:",
            "options": [
              "конкретне питання, на яке шукаєте відповідь",
              "мету прочитати все двічі завжди",
              "заборону нотаток",
              "той самий темп, що й перший раз, без вибору місця"
            ],
            "correctIndex": 0,
            "explanationUk": "Другий прохід — точковий: визначення, таблиця, виняток.",
            "explanationEn": "The second pass is targeted: a definition, a table, an exception."
          },
          {
            "id": "sr-fr-2",
            "type": "rsvp",
            "promptUk": "RSVP: навіщо другий прохід",
            "promptEn": "RSVP: why a second pass",
            "text": "Перше читання дає карту: де вступ, де метод, де винятки. Друге читання відповідає на одне запитання, наприклад «який саме таймаут?». Без питання другий прохід часто перетворюється на механічне повторення і втомлює більше, ніж навчає.",
            "wpm": 230
          },
          {
            "id": "sr-fr-3",
            "type": "comprehension",
            "promptUk": "Як робити другий прохід?",
            "promptEn": "How should a second pass work?",
            "passage": "Перше читання дає карту: де вступ, де метод, де винятки. Друге читання відповідає на одне запитання, наприклад «який саме таймаут?». Без питання другий прохід часто перетворюється на механічне повторення і втомлює більше, ніж навчає.",
            "questions": [
              {
                "q": "Що дає перше читання?",
                "qEn": "What does the first read give you?",
                "options": [
                  "карту: вступ, метод, винятки",
                  "повне запам'ятовування кожного слова",
                  "готовий переклад",
                  "оцінку автора"
                ],
                "correctIndex": 0
              },
              {
                "q": "Чому потрібне питання на другий прохід?",
                "qEn": "Why does the second pass need a question?",
                "options": [
                  "інакше він стає механічним повторенням",
                  "питання заборонені",
                  "щоб збільшити WPM",
                  "щоб пропустити винятки"
                ],
                "correctIndex": 0
              }
            ]
          }
        ],
      },
      {
        slug: "sr-flex-shift",
        titleUk: "Перемикання режиму: скім і вивчення",
        titleEn: "Shifting gears: skim and study",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "sr-fh-1",
            "type": "mcq",
            "promptUk": "Скім підходить, коли ви:",
            "promptEn": "Skimming is appropriate when you:",
            "options": [
              "шукаєте, чи є в документі потрібний розділ",
              "вже знайшли єдине критичне визначення і маєте його застосувати",
              "підписуєте юридичний акт на останньому рядку",
              "копіюєте секрет із тексту"
            ],
            "correctIndex": 0,
            "explanationUk": "Скім — навігація; вивчення — коли ціна помилки висока.",
            "explanationEn": "Skimming is navigation; study is for when the cost of a mistake is high."
          },
          {
            "id": "sr-fh-2",
            "type": "rsvp",
            "promptUk": "RSVP: перемикання",
            "promptEn": "RSVP: shifting gears",
            "text": "You can skim a twenty-page RFC to find the section on error codes, then study the table itself slowly. Mixing the two modes is a skill: if you study every paragraph of a long document at the same depth, you will be exhausted before the part that actually binds your implementation.",
            "wpm": 250
          },
          {
            "id": "sr-fh-3",
            "type": "comprehension",
            "promptUk": "Як поєднати режими?",
            "promptEn": "How should the modes be combined?",
            "passage": "You can skim a twenty-page RFC to find the section on error codes, then study the table itself slowly. Mixing the two modes is a skill: if you study every paragraph of a long document at the same depth, you will be exhausted before the part that actually binds your implementation.",
            "questions": [
              {
                "q": "Для чого скім у цьому прикладі?",
                "qEn": "What is skimming for in this example?",
                "options": [
                  "знайти розділ про коди помилок",
                  "вивчити всю таблицю з тією ж швидкістю",
                  "пропустити обов'язкові вимоги",
                  "замінити реалізацію"
                ],
                "correctIndex": 0
              },
              {
                "q": "Який ризик однакового глиблення ввесь документ?",
                "qEn": "What is the risk of equal depth on the whole document?",
                "options": [
                  "втома до того місця, що реально зобов'язує реалізацію",
                  "занадто висока точність завжди",
                  "документ зникне",
                  "RFC стане коротшим"
                ],
                "correctIndex": 0
              }
            ]
          }
        ],
      },
      {
        slug: "sr-flex-fatigue",
        titleUk: "Втома й точність",
        titleEn: "Fatigue and accuracy",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "sr-ff-1",
            "type": "mcq",
            "promptUk": "Коли точність падає через втому, краще:",
            "promptEn": "When accuracy drops from fatigue, it is better to:",
            "options": [
              "зробити коротку паузу і перевірити ключові факти, ніж піднімати WPM",
              "подвоїти швидкість, щоб швидше закінчити",
              "закрити текст і ніколи не повертатись",
              "читати лише перші літери слів"
            ],
            "correctIndex": 0,
            "explanationUk": "Втома б'є по деталях: числа, заперечення, винятки.",
            "explanationEn": "Fatigue hits the details: numbers, negations, exceptions."
          },
          {
            "id": "sr-ff-2",
            "type": "rsvp",
            "promptUk": "RSVP: ознаки втоми",
            "promptEn": "RSVP: signs of fatigue",
            "text": "Ознаки втоми під час швидкого читання: ви пропускаєте частку «не», плутаєте 15 і 50, не можете переказати останній абзац. Тоді знизьте темп або пройдіть лише місця з числами й запереченнями ще раз. Короткі сесії з переказом точніші за довгу гонитву за рекордом слів на хвилину.",
            "wpm": 230
          },
          {
            "id": "sr-ff-3",
            "type": "comprehension",
            "promptUk": "Що є сигналом знизити темп?",
            "promptEn": "What is a signal to lower the pace?",
            "passage": "Ознаки втоми під час швидкого читання: ви пропускаєте частку «не», плутаєте 15 і 50, не можете переказати останній абзац. Тоді знизьте темп або пройдіть лише місця з числами й запереченнями ще раз. Короткі сесії з переказом точніші за довгу гонитву за рекордом слів на хвилину.",
            "questions": [
              {
                "q": "Які три ознаки названо?",
                "qEn": "Which three signs are named?",
                "options": [
                  "пропуск «не», плутанина 15 і 50, немає переказу абзацу",
                  "високий WPM сам по собі",
                  "бажання зробити нотатку",
                  "коротка сесія"
                ],
                "correctIndex": 0
              },
              {
                "q": "Що точніше за гонитву за рекордом WPM?",
                "qEn": "What is more accurate than chasing a WPM record?",
                "options": [
                  "короткі сесії з переказом",
                  "читання уві сні",
                  "подвоєння швидкості в кінці",
                  "пропуск усіх чисел"
                ],
                "correctIndex": 0
              }
            ]
          }
        ],
      },
      {
        slug: "sr-flex-review",
        titleUk: "Огляд гнучкої швидкості",
        titleEn: "Flexible speed review",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "sr-fv-1",
            "type": "mcq",
            "promptUk": "Гнучке читання означає:",
            "promptEn": "Flexible reading means:",
            "options": [
              "змінювати темп за щільністю й ціною помилки",
              "завжди максимальну швидкість",
              "завжди найповільніший темп",
              "один темп для всіх жанрів"
            ],
            "correctIndex": 0,
            "explanationUk": "Темп — інструмент під задачу, не характер риси.",
            "explanationEn": "Pace is a tool for the task, not a personality trait."
          },
          {
            "id": "sr-fv-2",
            "type": "rsvp",
            "promptUk": "RSVP: правило трьох швидкостей",
            "promptEn": "RSVP: a three-speed rule",
            "text": "Три швидкості: навігація — швидко знайти розділ; робоча — зрозуміти хід думки; точна — числа, вимоги, винятки. Перемикайтесь свідомо. Якщо після робочої швидкості ви не можете назвати тезу, ви вже проїхали потрібне місце і варто повернутись.",
            "wpm": 240
          },
          {
            "id": "sr-fv-3",
            "type": "comprehension",
            "promptUk": "Назвіть три швидкості",
            "promptEn": "Name the three speeds",
            "passage": "Три швидкості: навігація — швидко знайти розділ; робоча — зрозуміти хід думки; точна — числа, вимоги, винятки. Перемикайтесь свідомо. Якщо після робочої швидкості ви не можете назвати тезу, ви вже проїхали потрібне місце і варто повернутись.",
            "questions": [
              {
                "q": "Для чого точна швидкість?",
                "qEn": "What is precise speed for?",
                "options": [
                  "числа, вимоги, винятки",
                  "пошук розділу",
                  "перегляд обкладинки",
                  "підрахунок слів"
                ],
                "correctIndex": 0
              },
              {
                "q": "Що робити, якщо тезу назвати не можете?",
                "qEn": "What if you cannot name the thesis?",
                "options": [
                  "повернутись до потрібного місця",
                  "підняти WPM",
                  "закрити текст назавжди",
                  "пропустити винятки"
                ],
                "correctIndex": 0
              }
            ]
          }
        ],
      },
    ],
  },
  {
    slug: "recall-notes",
    titleUk: "Пригадування й нотатки",
    titleEn: "Recall and notes",
    lessons: [
      {
        slug: "sr-rec-immediate",
        titleUk: "Миттєве пригадування",
        titleEn: "Immediate recall",
        baseXp: 18,
        difficulty: 2,
        isFree: false,
        exercises: [
          {
            "id": "sr-ri-1",
            "type": "mcq",
            "promptUk": "Найкоротша перевірка розуміння після абзацу:",
            "promptEn": "The shortest comprehension check after a paragraph:",
            "options": [
              "закрити текст і назвати тезу своїми словами",
              "переписати абзац дослівно",
              "підрахувати коми",
              "змінити шрифт"
            ],
            "correctIndex": 0,
            "explanationUk": "Пригадування сильніше за повторне читання без спроби відтворити.",
            "explanationEn": "Recall is stronger than rereading with no attempt to reproduce."
          },
          {
            "id": "sr-ri-2",
            "type": "rsvp",
            "promptUk": "RSVP: абзац для переказу",
            "promptEn": "RSVP: a paragraph to recall",
            "text": "Кеш-aside працює так: застосунок спочатку читає кеш; якщо значення немає, читає базу, записує результат у кеш і віддає його. TTL обмежує, як довго може жити застаріле значення. Для даних, що змінюються часто, короткий TTL зменшує розсинхрон, але збільшує навантаження на базу.",
            "wpm": 220
          },
          {
            "id": "sr-ri-3",
            "type": "comprehension",
            "promptUk": "Відтворіть механізм",
            "promptEn": "Reproduce the mechanism",
            "passage": "Кеш-aside працює так: застосунок спочатку читає кеш; якщо значення немає, читає базу, записує результат у кеш і віддає його. TTL обмежує, як довго може жити застаріле значення. Для даних, що змінюються часто, короткий TTL зменшує розсинхрон, але збільшує навантаження на базу.",
            "questions": [
              {
                "q": "Що робить застосунок, коли в кеші порожньо?",
                "qEn": "What does the app do when the cache is empty?",
                "options": [
                  "читає базу, пише в кеш і віддає значення",
                  "повертає помилку завжди",
                  "чекає на TTL без читання бази",
                  "очищає всю базу"
                ],
                "correctIndex": 0
              },
              {
                "q": "Який компроміс короткого TTL для часто змінних даних?",
                "qEn": "What is the trade-off of a short TTL for frequently changing data?",
                "options": [
                  "менше розсинхрону, більше навантаження на базу",
                  "більше розсинхрону і менша база",
                  "TTL перестає існувати",
                  "кеш пишеться в диск завжди"
                ],
                "correctIndex": 0
              }
            ]
          }
        ],
      },
      {
        slug: "sr-rec-keywords",
        titleUk: "Ключові слова, не конспект-простыня",
        titleEn: "Keywords, not a transcript",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "sr-rk-1",
            "type": "mcq",
            "promptUk": "Ефективна нотатка під час швидкого читання:",
            "promptEn": "An effective note during speed reading:",
            "options": [
              "кілька ключових слів і одне речення-теза",
              "повний перепис абзацу",
              "лише емодзі без змісту",
              "цитата на три сторінки"
            ],
            "correctIndex": 0,
            "explanationUk": "Нотатка має допомагати пригадати, а не заміняти книгу копією.",
            "explanationEn": "A note should help you recall, not replace the book with a copy."
          },
          {
            "id": "sr-rk-2",
            "type": "rsvp",
            "promptUk": "RSVP: приклад нотатки",
            "promptEn": "RSVP: a note example",
            "text": "After reading a section on circuit breakers, a useful note might be: 'breaker — open after N failures; half-open probe; close on success. Distinct from timeout. Failure is upstream, not local CPU.' That is enough to reconstruct the idea tomorrow, and short enough to write without breaking the reading flow.",
            "wpm": 250
          },
          {
            "id": "sr-rk-3",
            "type": "comprehension",
            "promptUk": "Що є в хорошій нотатці?",
            "promptEn": "What belongs in a good note?",
            "passage": "After reading a section on circuit breakers, a useful note might be: 'breaker — open after N failures; half-open probe; close on success. Distinct from timeout. Failure is upstream, not local CPU.' That is enough to reconstruct the idea tomorrow, and short enough to write without breaking the reading flow.",
            "questions": [
              {
                "q": "Які стани згадано?",
                "qEn": "Which states are mentioned?",
                "options": [
                  "open, half-open, close on success",
                  "лише timeout",
                  "лише local CPU",
                  "тільки N як назва сервісу"
                ],
                "correctIndex": 0
              },
              {
                "q": "Чому нотатка коротка?",
                "qEn": "Why is the note short?",
                "options": [
                  "щоб відтворити ідею завтра і не розірвати потік читання",
                  "бо ідея неважлива",
                  "бо довгі нотатки заборонені законом",
                  "бо автор не знає теми"
                ],
                "correctIndex": 0
              }
            ]
          }
        ],
      },
      {
        slug: "sr-rec-teachback",
        titleUk: "Пояснити іншому — перевірка",
        titleEn: "Teaching back as a check",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "sr-rt-1",
            "type": "mcq",
            "promptUk": "Якщо не можете пояснити ідею просто, це часто означає:",
            "promptEn": "If you cannot explain an idea simply, it often means:",
            "options": [
              "розуміння ще дірчасте і варто повернутись до визначення",
              "ви читали занадто повільно завжди",
              "ідею неможливо пояснити нікому",
              "пояснення заборонене"
            ],
            "correctIndex": 0,
            "explanationUk": "Просте пояснення виявляє пропущені ланки краще за впізнавання тексту очима.",
            "explanationEn": "A simple explanation reveals missing links better than recognising the text by eye."
          },
          {
            "id": "sr-rt-2",
            "type": "rsvp",
            "promptUk": "RSVP: пояснення своїми словами",
            "promptEn": "RSVP: an explanation in your own words",
            "text": "Ідемпотентний запит можна повторити без додаткового ефекту: повторна оплата з тим самим ключем не спише гроші двічі. Це не те саме, що безпечний метод HTTP: GET має бути безпечним і не змінювати стан, а ідемпотентність стосується повтору. PUT зазвичай ідемпотентний, POST — ні, якщо кожен виклик створює новий ресурс.",
            "wpm": 230
          },
          {
            "id": "sr-rt-3",
            "type": "comprehension",
            "promptUk": "Поясніть різницю",
            "promptEn": "Explain the difference",
            "passage": "Ідемпотентний запит можна повторити без додаткового ефекту: повторна оплата з тим самим ключем не спише гроші двічі. Це не те саме, що безпечний метод HTTP: GET має бути безпечним і не змінювати стан, а ідемпотентність стосується повтору. PUT зазвичай ідемпотентний, POST — ні, якщо кожен виклик створює новий ресурс.",
            "questions": [
              {
                "q": "Що гарантує ідемпотентність тут?",
                "qEn": "What does idempotency guarantee here?",
                "options": [
                  "повтор з тим самим ключем не спише гроші вдруге",
                  "GET змінює стан",
                  "POST завжди ідемпотентний",
                  "ключ не потрібен"
                ],
                "correctIndex": 0
              },
              {
                "q": "Чим це відрізняється від безпечного GET?",
                "qEn": "How does this differ from a safe GET?",
                "options": [
                  "безпечність — про відсутність зміни стану; ідемпотентність — про повтор",
                  "це повні синоніми",
                  "GET завжди списує гроші",
                  "PUT ніколи не ідемпотентний"
                ],
                "correctIndex": 0
              }
            ]
          }
        ],
      },
      {
        slug: "sr-rec-spaced",
        titleUk: "Інтервальне повернення до тексту",
        titleEn: "Spaced return to a text",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "sr-rs-1",
            "type": "mcq",
            "promptUk": "Краще повернутись до складного розділу:",
            "promptEn": "It is better to return to a hard section:",
            "options": [
              "через кілька годин або завтра і знову пригадати тезу",
              "лише через рік",
              "негайно десять разів підряд без паузи і більше ніколи",
              "ніколи, якщо перше читання було швидким"
            ],
            "correctIndex": 0,
            "explanationUk": "Пауза між спробами пригадування зміцнює пам'ять краще за марфування.",
            "explanationEn": "A gap between recall attempts strengthens memory more than cramming."
          },
          {
            "id": "sr-rs-2",
            "type": "rsvp",
            "promptUk": "RSVP: інтервал",
            "promptEn": "RSVP: spacing",
            "text": "Прочитайте складний розділ, закрийте його, перекажіть, позначте дірки. Поверніться ввечері лише до дірок, не до всього розділу. Наступного дня спробуйте знову пояснити ідею без тексту. Такий ритм коротший за перечитування всієї глави щоразу і краще показує, що саме ще не тримається.",
            "wpm": 230
          },
          {
            "id": "sr-rs-3",
            "type": "comprehension",
            "promptUk": "Який ритм запропоновано?",
            "promptEn": "Which rhythm is proposed?",
            "passage": "Прочитайте складний розділ, закрийте його, перекажіть, позначте дірки. Поверніться ввечері лише до дірок, не до всього розділу. Наступного дня спробуйте знову пояснити ідею без тексту. Такий ритм коротший за перечитування всієї глави щоразу і краще показує, що саме ще не тримається.",
            "questions": [
              {
                "q": "До чого повертатись увечері?",
                "qEn": "What should you return to in the evening?",
                "options": [
                  "лише до дірок, не до всього розділу",
                  "до всієї глави обов'язково",
                  "лише до змісту книги",
                  "ні до чого"
                ],
                "correctIndex": 0
              },
              {
                "q": "Що робити наступного дня?",
                "qEn": "What should you do the next day?",
                "options": [
                  "пояснити ідею без тексту",
                  "переписати главу від руки повністю",
                  "забути тему",
                  "збільшити WPM удвічі"
                ],
                "correctIndex": 0
              }
            ]
          }
        ],
      },
      {
        slug: "sr-rec-review",
        titleUk: "Огляд пригадування",
        titleEn: "Recall review",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "sr-rrv-1",
            "type": "mcq",
            "promptUk": "Найкращий цикл після швидкого читання:",
            "promptEn": "The best cycle after a speed-reading pass:",
            "options": [
              "пригадати → перевірити дірки → коротка нотатка → інтервал",
              "лише підвищити WPM",
              "закрити книгу без переказу",
              "переписати все дослівно щодня"
            ],
            "correctIndex": 0,
            "explanationUk": "Швидкість без пригадування майже не лишає сліду.",
            "explanationEn": "Speed without recall leaves almost no trace."
          },
          {
            "id": "sr-rrv-2",
            "type": "rsvp",
            "promptUk": "RSVP: цикл",
            "promptEn": "RSVP: the cycle",
            "text": "Швидкочитання корисне, коли після нього ви можете назвати тезу, доказ і одне обмеження. Якщо можете лише впізнати речення очима, ви тренували впізнавання, а не розуміння. Додайте хвилину пригадування в кінці кожної сесії — це дешевший спосіб підняти точність, ніж ще десять хвилин сирого RSVP.",
            "wpm": 240
          },
          {
            "id": "sr-rrv-3",
            "type": "comprehension",
            "promptUk": "Що має лишитись після сесії?",
            "promptEn": "What should remain after a session?",
            "passage": "Швидкочитання корисне, коли після нього ви можете назвати тезу, доказ і одне обмеження. Якщо можете лише впізнати речення очима, ви тренували впізнавання, а не розуміння. Додайте хвилину пригадування в кінці кожної сесії — це дешевший спосіб підняти точність, ніж ще десять хвилин сирого RSVP.",
            "questions": [
              {
                "q": "Що треба вміти назвати?",
                "qEn": "What should you be able to name?",
                "options": [
                  "тезу, доказ і одне обмеження",
                  "лише WPM",
                  "шрифт тексту",
                  "кількість абзаців"
                ],
                "correctIndex": 0
              },
              {
                "q": "Що дешевше піднімає точність, ніж 10 хвилин RSVP?",
                "qEn": "What raises accuracy more cheaply than ten more minutes of raw RSVP?",
                "options": [
                  "хвилина пригадування в кінці сесії",
                  "зміна кольору фону",
                  "вимкнення питань",
                  "подвоєння WPM"
                ],
                "correctIndex": 0
              }
            ]
          }
        ],
      },
    ],
  },
];

export function expandSpeedReading(course: CourseContent): CourseContent {
  return expandCourse(course, {}, newUnits);
}
