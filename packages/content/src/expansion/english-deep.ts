import type { CourseContent, UnitContent } from "../types.js";
import { expandCourse } from "./factory.js";

const newUnits: UnitContent[] = [
  {
    "slug": "en-deep-perfect",
    "titleUk": "Present Perfect: досвід і результат",
    "titleEn": "Present Perfect: experience and result",
    "lessons": [
      {
        "slug": "en-d-pp-form",
        "titleUk": "Форма Present Perfect",
        "titleEn": "Present Perfect form",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "en-d-pp-form-c",
            "type": "concept",
            "promptUk": "have/has + V3",
            "promptEn": "have/has + past participle",
            "bodyUk": "Present Perfect утворюється так: have або has + третя форма дієслова (Past Participle): I have visited, she has finished, they have gone. Have вживаємо з I, you, we, they; has — з he, she, it. Заперечення: have not / has not (haven't, hasn't). Питання: Have you finished? Has she arrived?\n\nВ українській немає окремого часу з такою самою логікою. Речення «Я вже бачив цей фільм» і «Я бачив цей фільм учора» українською відрізняються лише прислівником, а англійською — часом: I have already seen this film (зв'язок із теперішнім) проти I saw this film yesterday (закінчений момент).\n\nНайчастіша помилка українськомовних — ставити Past Simple (I saw, I did) там, де потрібен Present Perfect, або навпаки додавати have до минулого з yesterday. Запам'ятайте: Present Perfect завжди має have/has + V3, і ніколи не стоїть поруч із конкретним закінченим часом на кшталт yesterday, in 2019, last week. Не плутайте також have як «мати» (I have a car) із допоміжним have часу (I have bought a car).",
            "bodyEn": "The Present Perfect is formed with have or has plus the past participle (the third form): I have visited, she has finished, they have gone. Use have with I, you, we, they; has with he, she, it. The negative is have not / has not (haven't, hasn't). Questions: Have you finished? Has she arrived?\n\nUkrainian has no separate tense with the same logic. “I have already seen this film” and “I saw this film yesterday” may look similar in Ukrainian, but English chooses the tense: Present Perfect when the past event is tied to now, Past Simple when the time is a finished moment.\n\nThe most common error for Ukrainian speakers is using Past Simple (I saw, I did) where English wants Present Perfect, or adding have next to a finished-time phrase such as yesterday. Remember: Present Perfect is always have/has + past participle, and it does not combine with finished-time markers like yesterday, in 2019, or last week. Also do not confuse lexical have (“I have a car”) with auxiliary have (“I have bought a car”).",
            "keyPointsUk": [
              "Форма: have/has + Past Participle (V3)",
              "has — лише для he/she/it",
              "Не ставити Present Perfect з yesterday / in 2019",
              "have як «мати» — це не Present Perfect"
            ],
            "keyPointsEn": [
              "Form: have/has + past participle (V3)",
              "has is only for he/she/it",
              "Do not use Present Perfect with yesterday / in 2019",
              "have meaning “possess” is not the Present Perfect"
            ]
          },
          {
            "id": "en-d-pp-form-r1",
            "type": "mcq",
            "promptUk": "Оберіть правильну форму: She ___ the report.",
            "promptEn": "Choose the correct form: She ___ the report.",
            "options": [
              "has finished",
              "have finished",
              "finished has",
              "is finish"
            ],
            "correctIndex": 0,
            "explanationUk": "З she вживаємо has + третю форму finished.",
            "explanationEn": "With she we use has plus the past participle finished."
          },
          {
            "id": "en-d-pp-form-r2",
            "type": "fill_blank",
            "promptUk": "Вставте допоміжне дієслово (одне слово).",
            "promptEn": "Fill in the auxiliary (one word).",
            "sentence": "They ___ already left the office.",
            "accepted": [
              "have",
              "Have"
            ]
          },
          {
            "id": "en-d-pp-form-r3",
            "type": "translate",
            "promptUk": "Перекладіть англійською, використовуючи Present Perfect.",
            "promptEn": "Translate into English using the Present Perfect.",
            "source": "Вона вже закінчила роботу.",
            "accepted": [
              "She has already finished the work",
              "She has already finished work",
              "She's already finished the work",
              "She's already finished work",
              "She has already finished her work",
              "She's already finished her work"
            ],
            "direction": "uk_en"
          },
          {
            "id": "en-d-pp-form-r4",
            "type": "order_words",
            "promptUk": "Зберіть питання в Present Perfect.",
            "promptEn": "Build the Present Perfect question.",
            "words": [
              "film",
              "this",
              "seen",
              "you",
              "Have"
            ],
            "correct": [
              "Have",
              "you",
              "seen",
              "this",
              "film"
            ]
          },
          {
            "id": "en-d-pp-form-e",
            "type": "explain",
            "promptUk": "Поясніть своїми словами, як утворюється Present Perfect і чим він відрізняється від have у значенні «мати».",
            "promptEn": "In your own words, explain how the Present Perfect is formed and how it differs from have meaning “possess”.",
            "keyIdeas": [
              {
                "labelUk": "форма",
                "labelEn": "form",
                "anyOf": [
                  "have",
                  "has",
                  "participle",
                  "третя",
                  "v3",
                  "форм"
                ]
              },
              {
                "labelUk": "особа",
                "labelEn": "person",
                "anyOf": [
                  "has",
                  "she",
                  "he",
                  "it"
                ]
              },
              {
                "labelUk": "не «мати»",
                "labelEn": "not possession",
                "anyOf": [
                  "мати",
                  "possess",
                  "auxiliary",
                  "допоміжн",
                  "car",
                  "машин"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Present Perfect утворюється з have або has і третьої форми дієслова. Has стоїть з he, she, it. Це допоміжне дієслово, а не have у значенні «мати машину».",
            "sampleAnswerEn": "The Present Perfect is formed with have or has plus the past participle. We use has with he, she and it. This have is an auxiliary, not possess as in I have a car."
          }
        ]
      },
      {
        "slug": "en-d-pp-markers",
        "titleUk": "since, for, already, yet, just",
        "titleEn": "since, for, already, yet, just",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "en-d-pp-markers-c",
            "type": "concept",
            "promptUk": "Маркери Present Perfect",
            "promptEn": "Present Perfect markers",
            "bodyUk": "Кілька прислівників майже «кличуть» Present Perfect. since називає початкову точку (since Monday, since 2020, since I arrived). for називає тривалість (for two hours, for a long time). Українською обидва часто перекладають «вже …», тож їх легко переплутати: since Friday — від п'ятниці, for three days — протягом трьох днів.\n\nalready (вже, раніше ніж очікували) зазвичай стоїть між have і V3: I have already eaten. yet (уже / ще) вживають у питаннях і запереченнях, здебільшого в кінці: Have you finished yet? I haven't finished yet. just (щойно) теж між have і V3: She has just called.\n\never (коли-небудь) і never (ніколи) описують досвід за життя: Have you ever been to Lviv? I have never tried sushi. Типова помилка: ставити already у запереченні замість yet (*I haven't already finished) або казати *since two weeks замість for two weeks. Ще одна: *I live here since 2019 — потрібно I have lived / have been living here since 2019.",
            "bodyEn": "A few adverbials almost “call for” the Present Perfect. since names a starting point (since Monday, since 2020, since I arrived). for names a duration (for two hours, for a long time). In Ukrainian both often sound like “already …”, so they are easy to mix up: since Friday is a starting point; for three days is a period.\n\nalready (sooner than expected) usually sits between have and the past participle: I have already eaten. yet is used in questions and negatives, usually at the end: Have you finished yet? I haven't finished yet. just (a moment ago) also goes between have and V3: She has just called.\n\never and never describe life experience: Have you ever been to Lviv? I have never tried sushi. Typical mistakes: already in a negative instead of yet (*I haven't already finished), and *since two weeks instead of for two weeks. Another frequent error is *I live here since 2019 — English wants I have lived / have been living here since 2019.",
            "keyPointsUk": [
              "since — точка старту; for — тривалість",
              "already / just — між have і V3",
              "yet — у питаннях і запереченнях, часто в кінці",
              "не *since two weeks, а for two weeks"
            ],
            "keyPointsEn": [
              "since is a starting point; for is a duration",
              "already and just go between have and V3",
              "yet is for questions and negatives, often at the end",
              "not *since two weeks — say for two weeks"
            ]
          },
          {
            "id": "en-d-pp-markers-r1",
            "type": "mcq",
            "promptUk": "Оберіть правильний варіант: We have lived here ___ 2018.",
            "promptEn": "Choose the correct option: We have lived here ___ 2018.",
            "options": [
              "since",
              "for",
              "from",
              "during"
            ],
            "correctIndex": 0,
            "explanationUk": "2018 — точка старту, тому since.",
            "explanationEn": "2018 is a starting point, so since."
          },
          {
            "id": "en-d-pp-markers-r2",
            "type": "fill_blank",
            "promptUk": "Вставте for або since.",
            "promptEn": "Insert for or since.",
            "sentence": "She has been ill ___ three days.",
            "accepted": [
              "for",
              "For"
            ]
          },
          {
            "id": "en-d-pp-markers-r3",
            "type": "mcq",
            "promptUk": "Де зазвичай стоїть yet?",
            "promptEn": "Where does yet usually go?",
            "options": [
              "у кінці питального або заперечного речення",
              "лише на початку розповідного речення",
              "між підметом і have",
              "тільки після yesterday"
            ],
            "correctIndex": 0,
            "explanationUk": "Yet типове для питань і заперечень і часто стоїть у кінці.",
            "explanationEn": "Yet is typical of questions and negatives and often comes at the end.",
            "optionsEn": [
              "at the end of a question or a negative sentence",
              "only at the beginning of a statement",
              "between the subject and have",
              "only after yesterday"
            ]
          },
          {
            "id": "en-d-pp-markers-r4",
            "type": "translate",
            "promptUk": "Перекладіть, використавши just і Present Perfect.",
            "promptEn": "Translate using just and the Present Perfect.",
            "source": "Він щойно прийшов.",
            "accepted": [
              "He has just arrived",
              "He's just arrived",
              "He has just come",
              "He's just come",
              "He has just come in",
              "He's just come in"
            ],
            "direction": "uk_en"
          },
          {
            "id": "en-d-pp-markers-e",
            "type": "explain",
            "promptUk": "Поясніть різницю між since і for та де стоять already і yet.",
            "promptEn": "Explain the difference between since and for, and where already and yet go.",
            "keyIdeas": [
              {
                "labelUk": "since",
                "labelEn": "since",
                "anyOf": [
                  "since",
                  "точка",
                  "start",
                  "почат"
                ]
              },
              {
                "labelUk": "for",
                "labelEn": "for",
                "anyOf": [
                  "for",
                  "тривал",
                  "duration",
                  "period",
                  "протяж"
                ]
              },
              {
                "labelUk": "yet/already",
                "labelEn": "yet/already",
                "anyOf": [
                  "yet",
                  "already",
                  "кінці",
                  "end",
                  "запереч",
                  "negative"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Since називає точку початку, а for — тривалість періоду. Already стоїть між have і дієсловом, yet — часто в кінці заперечення або питання.",
            "sampleAnswerEn": "Since names a starting point, and for names a duration. Already goes between have and the verb, while yet often comes at the end of a negative or a question."
          }
        ]
      },
      {
        "slug": "en-d-pp-vs-past",
        "titleUk": "Present Perfect чи Past Simple",
        "titleEn": "Present Perfect versus Past Simple",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "en-d-pp-vs-past-c",
            "type": "concept",
            "promptUk": "Зв'язок із «зараз» проти закінченого часу",
            "promptEn": "A link to now versus a finished time",
            "bodyUk": "Це головний контраст для українськомовних. Past Simple називає дію в закінченому часовому відрізку: I visited Kyiv in 2019. Yesterday I saw Maria. The meeting started at nine. Є маркер минулого або зрозумілий закінчений контекст — беріть Past Simple.\n\nPresent Perfect називає минулу дію, важливу зараз: результат (She has broken her arm — рука зламана і це актуально), досвід за життя без дати (I have visited Kyiv), або незавершений період (I have written three emails today — день ще триває).\n\nПорівняйте: I have lost my keys (не можу увійти зараз) і I lost my keys yesterday, but I found them. Запитання When…? майже завжди вимагає Past Simple: When did you see her? — не *When have you seen her? Типова помилка: I have seen him yesterday. Якщо є yesterday, last year, in 2010, when I was a child — час закінчений, потрібен Past Simple. Якщо питають «чи є досвід / чи є результат тепер» без дати — Present Perfect.",
            "bodyEn": "This is the central contrast for Ukrainian speakers. Past Simple places an action in a finished time period: I visited Kyiv in 2019. Yesterday I saw Maria. The meeting started at nine. If there is a past-time marker or a clearly finished context, use Past Simple.\n\nPresent Perfect names a past action that matters now: a present result (She has broken her arm — the arm is broken, and that is current), life experience without a date (I have visited Kyiv), or an unfinished time period (I have written three emails today — the day is still in progress).\n\nCompare: I have lost my keys (I can't get in now) and I lost my keys yesterday, but I found them. When…? almost always takes Past Simple: When did you see her? — not *When have you seen her? A typical mistake is I have seen him yesterday. If you have yesterday, last year, in 2010, or when I was a child, the time is finished and you need Past Simple. If the question is “is there experience / is there a result now?” with no date, use Present Perfect.",
            "keyPointsUk": [
              "Past Simple — закінчений час (yesterday, in 2019, when…)",
              "Present Perfect — результат, досвід або незавершений період",
              "When…? зазвичай вимагає Past Simple",
              "Ніколи: *I have seen him yesterday"
            ],
            "keyPointsEn": [
              "Past Simple is for finished time (yesterday, in 2019, when…)",
              "Present Perfect is for a result, experience, or an unfinished period",
              "When…? usually requires Past Simple",
              "Never: *I have seen him yesterday"
            ]
          },
          {
            "id": "en-d-pp-vs-past-r1",
            "type": "mcq",
            "promptUk": "Оберіть правильне речення.",
            "promptEn": "Choose the correct sentence.",
            "options": [
              "I saw this film yesterday.",
              "I have seen this film yesterday.",
              "I have saw this film yesterday.",
              "I did seen this film yesterday."
            ],
            "correctIndex": 0,
            "explanationUk": "Yesterday — закінчений час, тому Past Simple: saw.",
            "explanationEn": "Yesterday is finished time, so Past Simple: saw."
          },
          {
            "id": "en-d-pp-vs-past-r2",
            "type": "mcq",
            "promptUk": "Ситуація: ключі зникли, і ви досі не можете увійти. Що скажете?",
            "promptEn": "Situation: the keys are missing and you still cannot get in. What do you say?",
            "options": [
              "I have lost my keys.",
              "I lost my keys in 2015 and bought new ones then.",
              "I lose my keys yesterday.",
              "I had lose my keys."
            ],
            "correctIndex": 0,
            "explanationUk": "Результат актуальний зараз — Present Perfect.",
            "explanationEn": "The result is current, so Present Perfect."
          },
          {
            "id": "en-d-pp-vs-past-r3",
            "type": "fill_blank",
            "promptUk": "Вставте did або have.",
            "promptEn": "Insert did or have.",
            "sentence": "When ___ you arrive in Lviv?",
            "accepted": [
              "did",
              "Did"
            ]
          },
          {
            "id": "en-d-pp-vs-past-r4",
            "type": "translate",
            "promptUk": "Перекладіть. День ще не закінчився.",
            "promptEn": "Translate. The day is not over yet.",
            "source": "Сьогодні я написав три листи.",
            "accepted": [
              "I have written three emails today",
              "I've written three emails today",
              "I have written three letters today",
              "I've written three letters today",
              "Today I have written three emails",
              "Today I've written three emails",
              "Today I have written three letters",
              "Today I've written three letters"
            ],
            "direction": "uk_en"
          },
          {
            "id": "en-d-pp-vs-past-e",
            "type": "explain",
            "promptUk": "Коли ви обираєте Present Perfect, а коли Past Simple? Наведіть орієнтир про yesterday і про результат зараз.",
            "promptEn": "When do you choose Present Perfect and when Past Simple? Mention yesterday and a result that matters now.",
            "keyIdeas": [
              {
                "labelUk": "past simple",
                "labelEn": "past simple",
                "anyOf": [
                  "past simple",
                  "yesterday",
                  "закінчен",
                  "finished",
                  "2019"
                ]
              },
              {
                "labelUk": "present perfect",
                "labelEn": "present perfect",
                "anyOf": [
                  "perfect",
                  "результат",
                  "result",
                  "досвід",
                  "experience",
                  "зараз",
                  "now"
                ]
              },
              {
                "labelUk": "when",
                "labelEn": "when",
                "anyOf": [
                  "when",
                  "did"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Past Simple ставимо з закінченим часом, наприклад yesterday. Present Perfect потрібен, коли є результат зараз або досвід без дати. Питання when зазвичай іде з did, не з have.",
            "sampleAnswerEn": "We use Past Simple with finished time, for example yesterday. Present Perfect is for a result now or experience without a date. A when-question usually takes did, not have."
          }
        ]
      },
      {
        "slug": "en-d-pp-been-gone",
        "titleUk": "been і gone, ever і never",
        "titleEn": "been and gone, ever and never",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "en-d-pp-been-gone-c",
            "type": "concept",
            "promptUk": "Досвід подорожей і життя",
            "promptEn": "Travel and life experience",
            "bodyUk": "Have you ever been to Prague? — питання про досвід. been тут означає «був і повернувся» (або «маю досвід перебування»). She has gone to Prague означає «поїхала і ще там / у дорозі»: її немає тут. Це тонка, але важлива пара для українськомовних: обидва можна перекласти «вона їздила / поїхала в Прагу».\n\never ставимо в питаннях про досвід за життя: Have you ever tried borshch made by her? never — заперечний досвід: I have never ridden a horse. Відповіді короткі: Yes, I have. No, I haven't. / Never. Після never не потрібне not (*I haven't never…).\n\nЯкщо називаєте конкретну поїздку з датою, знову Past Simple: I went to Prague in 2022. Present Perfect залишає дату відкритою: I have been to Prague (колись, і це частина мого досвіду). Множина разів: I have been there three times — times добре йде з Present Perfect, бо це підсумок дотепер.",
            "bodyEn": "Have you ever been to Prague? is a question about experience. been here means “went and came back” (or “I have the experience of being there”). She has gone to Prague means “she went and is still there / on the way”: she is not here. This pair is subtle for Ukrainian speakers, because both can translate as “she went to Prague”.\n\never is used in life-experience questions: Have you ever tried borshch made by her? never is negative experience: I have never ridden a horse. Short answers: Yes, I have. No, I haven't. / Never. After never you do not need not (*I haven't never…).\n\nIf you name a specific trip with a date, switch back to Past Simple: I went to Prague in 2022. Present Perfect leaves the date open: I have been to Prague (at some point, and it is part of my experience). A count of times works well with Present Perfect: I have been there three times — a total up to now.",
            "keyPointsUk": [
              "been = був і повернувся / є досвід",
              "gone = пішов і ще не повернувся",
              "ever — у питаннях про досвід; never — без другого not",
              "Конкретна дата поїздки — Past Simple"
            ],
            "keyPointsEn": [
              "been = went and came back / have the experience",
              "gone = left and has not come back yet",
              "ever in experience questions; never without a second not",
              "A specific trip date takes Past Simple"
            ]
          },
          {
            "id": "en-d-pp-been-gone-r1",
            "type": "mcq",
            "promptUk": "Колеги немає на місці: вона зараз у відрядженні в Празі. Що правильно?",
            "promptEn": "A colleague is not at her desk: she is currently on a trip to Prague. Which is right?",
            "options": [
              "She has gone to Prague.",
              "She has been to Prague, so she is back at her desk.",
              "She have gone to Prague.",
              "She has go to Prague."
            ],
            "correctIndex": 0,
            "explanationUk": "has gone — вона пішла і ще там.",
            "explanationEn": "has gone means she left and is still there."
          },
          {
            "id": "en-d-pp-been-gone-r2",
            "type": "fill_blank",
            "promptUk": "Вставте been або gone.",
            "promptEn": "Insert been or gone.",
            "sentence": "I have ___ to Odesa twice, and I loved both trips.",
            "accepted": [
              "been",
              "Been"
            ]
          },
          {
            "id": "en-d-pp-been-gone-r3",
            "type": "match",
            "promptUk": "Зіставте форму з значенням.",
            "promptEn": "Match each form with its meaning.",
            "pairs": [
              {
                "left": "She has gone to the shop.",
                "right": "Вона пішла і ще не вернулась / She left and is still out"
              },
              {
                "left": "She has been to the shop.",
                "right": "Вона вже сходила і повернулась / She went and is back"
              },
              {
                "left": "Have you ever been there?",
                "right": "Питання про досвід за життя / A life-experience question"
              }
            ]
          },
          {
            "id": "en-d-pp-been-gone-r4",
            "type": "translate",
            "promptUk": "Перекладіть, використовуючи never і Present Perfect.",
            "promptEn": "Translate using never and the Present Perfect.",
            "source": "Я ніколи не їздив до Японії.",
            "accepted": [
              "I have never been to Japan",
              "I've never been to Japan",
              "I have never gone to Japan",
              "I've never gone to Japan",
              "I have never visited Japan",
              "I've never visited Japan"
            ],
            "direction": "uk_en"
          },
          {
            "id": "en-d-pp-been-gone-e",
            "type": "explain",
            "promptUk": "У чому різниця між has been to і has gone to? Як працюють ever і never?",
            "promptEn": "What is the difference between has been to and has gone to? How do ever and never work?",
            "keyIdeas": [
              {
                "labelUk": "been",
                "labelEn": "been",
                "anyOf": [
                  "been",
                  "повернув",
                  "back",
                  "досвід",
                  "experience"
                ]
              },
              {
                "labelUk": "gone",
                "labelEn": "gone",
                "anyOf": [
                  "gone",
                  "ще",
                  "still",
                  "there",
                  "там",
                  "не поверну"
                ]
              },
              {
                "labelUk": "ever/never",
                "labelEn": "ever/never",
                "anyOf": [
                  "ever",
                  "never"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Has been to означає, що людина була там і вже повернулась, це досвід. Has gone to означає, що вона ще там. Ever стоїть у питаннях, never — у заперечному досвіді.",
            "sampleAnswerEn": "Has been to means the person went and is already back: it is experience. Has gone to means they are still there. Ever is used in questions, and never marks negative experience."
          }
        ]
      },
      {
        "slug": "en-d-pp-just-news",
        "titleUk": "Щойно і незавершений період",
        "titleEn": "Hot news and unfinished periods",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "en-d-pp-just-news-c",
            "type": "concept",
            "promptUk": "Новина, today і this week",
            "promptEn": "News, today and this week",
            "bodyUk": "Present Perfect часто подає «гарячу новину»: The train has just arrived. The company has announced a new office in Lviv. Слухач має сприйняти подію як актуальну. У новинах заголовки часто саме в Present Perfect, а деталі з датою вже в Past Simple: The president has resigned. He announced it at noon.\n\nНезавершений період — другий важливий випадок: today, this morning (якщо ранок ще триває), this week, this year, recently, so far, until now, over the last few days. I have drunk three coffees today — день не закінчився, тому можна додати ще. Якщо ранок уже минув і ви говорите ввечері, this morning поводиться як закінчений час: I drank three coffees this morning.\n\nRecently і lately майже завжди йдуть з Present Perfect: I have recently changed jobs. Типова помилка — *I have done it last week (last week уже закритий) і *I did three reports this week, коли тиждень ще триває й ви підбиваєте підсумок дотепер (краще I have done three reports this week).",
            "bodyEn": "Present Perfect often delivers “hot news”: The train has just arrived. The company has announced a new office in Lviv. The listener should take the event as current. News headlines often use Present Perfect, then switch to Past Simple for dated details: The president has resigned. He announced it at noon.\n\nAn unfinished time period is the second key case: today, this morning (if the morning is still in progress), this week, this year, recently, so far, until now, over the last few days. I have drunk three coffees today — the day is not over, so another coffee is still possible. If the morning has already passed and you are speaking in the evening, this morning behaves like finished time: I drank three coffees this morning.\n\nrecently and lately almost always take Present Perfect: I have recently changed jobs. Typical mistakes are *I have done it last week (last week is closed) and *I did three reports this week when the week is still running and you are giving a total so far (prefer I have done three reports this week).",
            "keyPointsUk": [
              "Гаряча новина — Present Perfect; деталі з часом — Past Simple",
              "today, this week, so far — незавершений період",
              "this morning залежить від того, чи ранок ще триває",
              "last week не сполучається з Present Perfect"
            ],
            "keyPointsEn": [
              "Hot news takes Present Perfect; dated details take Past Simple",
              "today, this week, so far are unfinished periods",
              "this morning depends on whether the morning is still in progress",
              "last week does not combine with Present Perfect"
            ]
          },
          {
            "id": "en-d-pp-just-news-r1",
            "type": "mcq",
            "promptUk": "Оберіть природний заголовок новини.",
            "promptEn": "Choose the natural news headline.",
            "options": [
              "The company has opened a new office in Lviv.",
              "The company has opened a new office last year.",
              "The company opening a new office yesterday.",
              "The company have open a new office."
            ],
            "correctIndex": 0,
            "explanationUk": "Актуальна новина без закінченої дати — Present Perfect.",
            "explanationEn": "Current news with no finished date takes Present Perfect."
          },
          {
            "id": "en-d-pp-just-news-r2",
            "type": "fill_blank",
            "promptUk": "Вставте правильну форму дієслова write (одне або два слова).",
            "promptEn": "Fill in the correct form of write (one or two words).",
            "sentence": "I ___ three reports so far this week.",
            "accepted": [
              "have written",
              "Have written",
              "'ve written",
              "have wrote"
            ]
          },
          {
            "id": "en-d-pp-just-news-r3",
            "type": "mcq",
            "promptUk": "Зараз вечір. Ранок давно закінчився. Що природніше?",
            "promptEn": "It is evening now. The morning ended long ago. Which is more natural?",
            "options": [
              "I drank two coffees this morning.",
              "I have drunk two coffees this morning.",
              "I have drink two coffees this morning.",
              "I drinking two coffees this morning."
            ],
            "correctIndex": 0,
            "explanationUk": "Для мовця ранок уже закінчений відрізок — Past Simple.",
            "explanationEn": "For the speaker the morning is a finished period, so Past Simple."
          },
          {
            "id": "en-d-pp-just-news-r4",
            "type": "order_words",
            "promptUk": "Зберіть речення-новину.",
            "promptEn": "Build the news sentence.",
            "words": [
              "arrived",
              "just",
              "has",
              "train",
              "The"
            ],
            "correct": [
              "The",
              "train",
              "has",
              "just",
              "arrived"
            ]
          },
          {
            "id": "en-d-pp-just-news-e",
            "type": "explain",
            "promptUk": "Чому today часто йде з Present Perfect, а last week — ні? Що таке «гаряча новина»?",
            "promptEn": "Why does today often take Present Perfect, while last week does not? What is “hot news”?",
            "keyIdeas": [
              {
                "labelUk": "незавершений період",
                "labelEn": "unfinished period",
                "anyOf": [
                  "today",
                  "week",
                  "so far",
                  "незавершен",
                  "unfinished",
                  "period"
                ]
              },
              {
                "labelUk": "last week",
                "labelEn": "last week",
                "anyOf": [
                  "last week",
                  "закінчен",
                  "finished",
                  "past simple"
                ]
              },
              {
                "labelUk": "новина",
                "labelEn": "news",
                "anyOf": [
                  "news",
                  "новин",
                  "just",
                  "щойно",
                  "current",
                  "актуаль"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Today і this week часто ще не закінчились, тому підсумок іде в Present Perfect. Last week уже закінчений, тож потрібен Past Simple. Гаряча новина — щойно подія, актуальна зараз, наприклад the train has just arrived.",
            "sampleAnswerEn": "Today and this week are often still unfinished, so a total so far takes Present Perfect. Last week is already finished, so we need Past Simple. Hot news is a just-happened event that is current now, for example the train has just arrived."
          }
        ]
      },
      {
        "slug": "en-deep-perfect-exam",
        "titleUk": "Контрольна: Present Perfect",
        "titleEn": "Exam: Present Perfect",
        "baseXp": 30,
        "difficulty": 3,
        "isExam": true,
        "passThreshold": 0.7,
        "exercises": [
          {
            "id": "en-deep-perfect-exam-q1",
            "type": "mcq",
            "promptUk": "She ___ already ___ the email.",
            "promptEn": "She ___ already ___ the email.",
            "options": [
              "has / sent",
              "have / sent",
              "has / send",
              "did / sent"
            ],
            "correctIndex": 0,
            "explanationUk": "has + already + past participle sent.",
            "explanationEn": "has + already + past participle sent."
          },
          {
            "id": "en-deep-perfect-exam-q2",
            "type": "mcq",
            "promptUk": "Оберіть правильне речення.",
            "promptEn": "Choose the correct sentence.",
            "options": [
              "I have known her for ten years.",
              "I have known her since ten years.",
              "I know her since ten years.",
              "I have knew her for ten years."
            ],
            "correctIndex": 0,
            "explanationUk": "Тривалість — for ten years; since потребує точки старту.",
            "explanationEn": "Duration is for ten years; since needs a starting point."
          },
          {
            "id": "en-deep-perfect-exam-q3",
            "type": "mcq",
            "promptUk": "Яке речення граматично правильне?",
            "promptEn": "Which sentence is grammatically correct?",
            "options": [
              "I saw him yesterday.",
              "I have seen him yesterday.",
              "I have saw him yesterday.",
              "I did seen him yesterday."
            ],
            "correctIndex": 0,
            "explanationUk": "Yesterday вимагає Past Simple.",
            "explanationEn": "Yesterday requires Past Simple."
          },
          {
            "id": "en-deep-perfect-exam-q4",
            "type": "mcq",
            "promptUk": "На місці нікого немає: колега поїхав у Варшаву і ще там. Як сказати?",
            "promptEn": "The desk is empty: a colleague went to Warsaw and is still there. What do you say?",
            "options": [
              "He has gone to Warsaw.",
              "He has been to Warsaw, so he is back.",
              "He have gone to Warsaw.",
              "He has gone to Warsaw yesterday."
            ],
            "correctIndex": 0,
            "explanationUk": "has gone — пішов і ще не повернувся.",
            "explanationEn": "has gone means he left and has not come back."
          },
          {
            "id": "en-deep-perfect-exam-q5",
            "type": "fill_blank",
            "promptUk": "Вставте yet або already.",
            "promptEn": "Insert yet or already.",
            "sentence": "Have you finished the report ___?",
            "accepted": [
              "yet",
              "Yet"
            ]
          }
        ]
      }
    ]
  },
  {
    "slug": "en-deep-perfect-plus",
    "titleUk": "Perfect Continuous і минуле до минулого",
    "titleEn": "Perfect Continuous and the past-in-the-past",
    "lessons": [
      {
        "slug": "en-d-ppc-form",
        "titleUk": "Форма Present Perfect Continuous",
        "titleEn": "Present Perfect Continuous form",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "en-d-ppc-form-c",
            "type": "concept",
            "promptUk": "have/has been + V-ing",
            "promptEn": "have/has been + V-ing",
            "bodyUk": "Present Perfect Continuous: have/has been + дієслово з -ing. I have been waiting for an hour. She has been working here since May. Наголос на самій діяльності, яка почалася раніше й триває дотепер (або щойно зупинилась, але видно слід: You look tired. I have been running).\n\nДля українськомовних це знову «невидимий» час: ми скажемо «я чекаю вже годину» теперішнім, а англійська вимагає have been waiting, бо є і тривалість, і зв'язок із зараз. Не кажіть *I am waiting for an hour і не *I wait here since morning.\n\nЗаперечення: I haven't been sleeping well. Питання: How long have you been studying English? How long — дуже типовий супутник цього часу. Станні дієслова (know, have у значенні «мати», like, believe) зазвичай не ставлять у Continuous: не *I have been knowing her, а I have known her for years.",
            "bodyEn": "Present Perfect Continuous is have/has been + verb-ing. I have been waiting for an hour. She has been working here since May. The focus is on the activity itself, which started earlier and continues until now (or has just stopped, with a visible result: You look tired. I have been running).\n\nFor Ukrainian speakers this is another “invisible” tense: we may say “I have been waiting for an hour” with a present form in Ukrainian, but English wants have been waiting because there is both duration and a link to now. Do not say *I am waiting for an hour or *I wait here since morning.\n\nThe negative is I haven't been sleeping well. Questions: How long have you been studying English? How long is a very typical partner of this tense. Stative verbs (know, have meaning “possess”, like, believe) do not usually take Continuous: not *I have been knowing her, but I have known her for years.",
            "keyPointsUk": [
              "Форма: have/has been + V-ing",
              "Наголос на тривалій діяльності дотепер",
              "How long…? — типовий супутник",
              "Станні дієслова (know, like) — не в Continuous"
            ],
            "keyPointsEn": [
              "Form: have/has been + V-ing",
              "The focus is on an activity continuing up to now",
              "How long…? is a typical partner",
              "Stative verbs (know, like) do not take Continuous"
            ]
          },
          {
            "id": "en-d-ppc-form-r1",
            "type": "mcq",
            "promptUk": "Оберіть правильну форму: I ___ for the bus for twenty minutes.",
            "promptEn": "Choose the correct form: I ___ for the bus for twenty minutes.",
            "options": [
              "have been waiting",
              "am waiting",
              "have waiting",
              "has been waiting"
            ],
            "correctIndex": 0,
            "explanationUk": "have been + waiting: тривала дія дотепер, підмет I.",
            "explanationEn": "have been + waiting: an activity up to now, subject I."
          },
          {
            "id": "en-d-ppc-form-r2",
            "type": "fill_blank",
            "promptUk": "Вставте been або being.",
            "promptEn": "Insert been or being.",
            "sentence": "She has ___ studying all morning.",
            "accepted": [
              "been",
              "Been"
            ]
          },
          {
            "id": "en-d-ppc-form-r3",
            "type": "translate",
            "promptUk": "Перекладіть, використавши Present Perfect Continuous.",
            "promptEn": "Translate using the Present Perfect Continuous.",
            "source": "Я чекаю вже годину.",
            "accepted": [
              "I have been waiting for an hour",
              "I've been waiting for an hour",
              "I have been waiting for one hour",
              "I've been waiting for one hour"
            ],
            "direction": "uk_en"
          },
          {
            "id": "en-d-ppc-form-r4",
            "type": "mcq",
            "promptUk": "Яке речення правильне?",
            "promptEn": "Which sentence is correct?",
            "options": [
              "I have known her for years.",
              "I have been knowing her for years.",
              "I am knowing her for years.",
              "I know her since years."
            ],
            "correctIndex": 0,
            "explanationUk": "know — станне дієслово, тому Present Perfect Simple: have known.",
            "explanationEn": "know is stative, so Present Perfect Simple: have known."
          },
          {
            "id": "en-d-ppc-form-e",
            "type": "explain",
            "promptUk": "Як утворюється Present Perfect Continuous і з яким питанням він часто стоїть? Чому не кажемо I have been knowing?",
            "promptEn": "How is Present Perfect Continuous formed, and which question often goes with it? Why don't we say I have been knowing?",
            "keyIdeas": [
              {
                "labelUk": "форма",
                "labelEn": "form",
                "anyOf": [
                  "been",
                  "ing",
                  "-ing",
                  "have"
                ]
              },
              {
                "labelUk": "how long",
                "labelEn": "how long",
                "anyOf": [
                  "how long",
                  "тривал",
                  "duration",
                  "довго"
                ]
              },
              {
                "labelUk": "станні",
                "labelEn": "stative",
                "anyOf": [
                  "know",
                  "stative",
                  "станн",
                  "like"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Форма — have або has been і дієслово з -ing. Часто стоїть із питанням how long. Станні дієслова на кшталт know не ставлять у Continuous, тож I have been knowing — помилка.",
            "sampleAnswerEn": "The form is have or has been plus a verb with -ing. It often goes with the question how long. Stative verbs such as know do not take Continuous, so I have been knowing is wrong."
          }
        ]
      },
      {
        "slug": "en-d-ppc-vs-pp",
        "titleUk": "Continuous чи Simple: I've been writing / I've written",
        "titleEn": "Continuous or Simple: I've been writing / I've written",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "en-d-ppc-vs-pp-c",
            "type": "concept",
            "promptUk": "Процес проти результату",
            "promptEn": "Process versus result",
            "bodyUk": "Порівняйте: I have been writing the report (процес, можливо, ще не готовий; видно втому чи зайнятість) і I have written the report (результат: звіт готовий). I have been reading this book all week (заглиблений у процес) проти I have read this book (прочитав цілком, є досвід / результат).\n\nЯкщо важлива кількість завершеного — зазвичай Simple: I have written five emails, I have read forty pages. Якщо важлива тривалість діяльності — Continuous: I have been writing emails all morning. How much / how many тягнуть Simple; how long — часто Continuous.\n\nДієслова live, work, study, teach допускають обидва варіанти з майже однаковим значенням: I have lived / have been living here for ten years. Різниця невелика. Не ставте Continuous, коли дія не може «тривати на очах» як процес завершеного підсумку: *I have been breaking my arm — ні, I have broken my arm (результат).",
            "bodyEn": "Compare: I have been writing the report (the process; it may not be finished; we notice tiredness or busyness) and I have written the report (the result: the report is done). I have been reading this book all week (absorbed in the process) versus I have read this book (finished it; experience or a completed result).\n\nWhen the amount completed matters, Simple is usual: I have written five emails, I have read forty pages. When the duration of the activity matters, Continuous is usual: I have been writing emails all morning. How much / how many pull towards Simple; how long often pulls towards Continuous.\n\nWith live, work, study, teach both forms are often possible with almost the same meaning: I have lived / have been living here for ten years. The difference is small. Do not use Continuous when the verb is not a visible ongoing process but a finished result: *I have been breaking my arm is wrong; I have broken my arm (result).",
            "keyPointsUk": [
              "Continuous — процес і тривалість; Simple — результат і кількість",
              "How many / how much → часто Simple; how long → часто Continuous",
              "live, work, study — обидві форми часто можливі",
              "Результат на кшталт broken arm — лише Simple"
            ],
            "keyPointsEn": [
              "Continuous is process and duration; Simple is result and quantity",
              "How many / how much often take Simple; how long often takes Continuous",
              "live, work, study often allow both forms",
              "A result such as a broken arm takes Simple only"
            ]
          },
          {
            "id": "en-d-ppc-vs-pp-r1",
            "type": "mcq",
            "promptUk": "Звіт уже готовий і відправлений. Що сказати?",
            "promptEn": "The report is finished and sent. What do you say?",
            "options": [
              "I have written the report.",
              "I have been writing the report (and it is still unfinished).",
              "I have been wrote the report.",
              "I writing the report since morning."
            ],
            "correctIndex": 0,
            "explanationUk": "Готовий результат — Present Perfect Simple: have written.",
            "explanationEn": "A finished result takes Present Perfect Simple: have written."
          },
          {
            "id": "en-d-ppc-vs-pp-r2",
            "type": "mcq",
            "promptUk": "Оберіть природніше речення про тривалу роботу без підсумку «скільки».",
            "promptEn": "Choose the more natural sentence about ongoing work with no “how many” total.",
            "options": [
              "I have been answering emails all morning.",
              "I have answered emails all morning, and the number does not matter here.",
              "I have been answering five emails.",
              "I am answering emails since morning."
            ],
            "correctIndex": 0,
            "explanationUk": "Наголос на тривалості процесу — Continuous.",
            "explanationEn": "The focus is duration of the process, so Continuous."
          },
          {
            "id": "en-d-ppc-vs-pp-r3",
            "type": "fill_blank",
            "promptUk": "Вставте written або been writing.",
            "promptEn": "Insert written or been writing.",
            "sentence": "She has ___ twenty pages today — the count is what matters.",
            "accepted": [
              "written",
              "Written"
            ]
          },
          {
            "id": "en-d-ppc-vs-pp-r4",
            "type": "translate",
            "promptUk": "Перекладіть. Наголос на процесі (вигляд: людина втомлена).",
            "promptEn": "Translate. The focus is the process (the person looks tired).",
            "source": "Я біг. (щойно, тому я спітнілий)",
            "accepted": [
              "I have been running",
              "I've been running",
              "I have been running, that's why I'm tired",
              "I've been running, that's why I'm tired"
            ],
            "direction": "uk_en"
          },
          {
            "id": "en-d-ppc-vs-pp-e",
            "type": "explain",
            "promptUk": "Коли ви оберете I've been writing, а коли I've written? Згадайте результат і кількість.",
            "promptEn": "When would you choose I've been writing, and when I've written? Mention result and quantity.",
            "keyIdeas": [
              {
                "labelUk": "процес",
                "labelEn": "process",
                "anyOf": [
                  "been writing",
                  "process",
                  "процес",
                  "тривал",
                  "duration",
                  "morning"
                ]
              },
              {
                "labelUk": "результат",
                "labelEn": "result",
                "anyOf": [
                  "written",
                  "result",
                  "результат",
                  "готовий",
                  "finished",
                  "done"
                ]
              },
              {
                "labelUk": "кількість",
                "labelEn": "quantity",
                "anyOf": [
                  "five",
                  "many",
                  "кільк",
                  "pages",
                  "count",
                  "скільки"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "I've been writing підкреслює процес і тривалість. I've written називає результат: текст готовий. Якщо важлива кількість, наприклад five pages, зазвичай беремо Simple.",
            "sampleAnswerEn": "I've been writing highlights the process and the duration. I've written names the result: the text is done. When quantity matters, for example five pages, we usually choose Simple."
          }
        ]
      },
      {
        "slug": "en-d-past-perf",
        "titleUk": "Past Perfect: раніше від минулого",
        "titleEn": "Past Perfect: earlier than the past",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "en-d-past-perf-c",
            "type": "concept",
            "promptUk": "had + V3",
            "promptEn": "had + past participle",
            "bodyUk": "Past Perfect: had + третя форма для всіх осіб: I had left, she had left. Він потрібен, коли в минулому є дві дії, і ви хочете ясно показати, яка була першою. When I arrived, the meeting had already started — зустріч почалася раніше від мого приходу.\n\nУкраїнською часто обидві дії стоять у минулому часі («коли я прийшов, зустріч уже почалася»), тому Past Perfect легко пропустити. Англійська використовує його як «минуле в минулому». Якщо порядок і так очевидний завдяки after / before, іноді досить Past Simple: After I finished, I went home. Але already, just, never, by the time дуже часто тягнуть Past Perfect: By the time we got to the station, the train had left.\n\nНе ставте Past Perfect усюди в оповіді — лише для дії, ранішої за інший минулий орієнтир. *I had gone to school yesterday, then I had eaten, then I had slept — це помилка: звичайна історія йде в Past Simple.",
            "bodyEn": "Past Perfect is had + past participle for every person: I had left, she had left. You need it when there are two past actions and you want to show clearly which happened first. When I arrived, the meeting had already started — the meeting started before my arrival.\n\nIn Ukrainian both actions often sit in a simple past (“when I arrived, the meeting had already started”), so Past Perfect is easy to omit. English uses it as “the past in the past”. If the order is already obvious with after / before, Past Simple is sometimes enough: After I finished, I went home. But already, just, never, and by the time very often pull in Past Perfect: By the time we got to the station, the train had left.\n\nDo not sprinkle Past Perfect through a whole story — only on the action that is earlier than another past anchor. *I had gone to school yesterday, then I had eaten, then I had slept is wrong: a normal narrative uses Past Simple.",
            "keyPointsUk": [
              "Форма: had + V3 для всіх осіб",
              "Показує дію, ранішу за іншу минулу",
              "by the time, already, just — типові супутники",
              "Не ставити Past Perfect на кожен крок оповіді"
            ],
            "keyPointsEn": [
              "Form: had + V3 for every person",
              "It marks an action earlier than another past event",
              "by the time, already, just are typical partners",
              "Do not use Past Perfect for every step of a story"
            ]
          },
          {
            "id": "en-d-past-perf-r1",
            "type": "mcq",
            "promptUk": "Оберіть правильне: When I arrived, the film ___.",
            "promptEn": "Choose the correct option: When I arrived, the film ___.",
            "options": [
              "had already started",
              "has already started",
              "have already started",
              "already starts"
            ],
            "correctIndex": 0,
            "explanationUk": "Фільм почався раніше від приходу в минулому — had + V3.",
            "explanationEn": "The film started earlier than a past arrival — had + V3."
          },
          {
            "id": "en-d-past-perf-r2",
            "type": "fill_blank",
            "promptUk": "Вставте допоміжне слово.",
            "promptEn": "Insert the auxiliary.",
            "sentence": "By the time we arrived, the train ___ left.",
            "accepted": [
              "had",
              "Had"
            ]
          },
          {
            "id": "en-d-past-perf-r3",
            "type": "translate",
            "promptUk": "Перекладіть, показавши, що ключі зникли РАНІШЕ.",
            "promptEn": "Translate, showing that the keys disappeared EARLIER.",
            "source": "Я зрозумів, що загубив ключі.",
            "accepted": [
              "I realised that I had lost my keys",
              "I realized that I had lost my keys",
              "I realised I'd lost my keys",
              "I realized I'd lost my keys",
              "I understood that I had lost my keys"
            ],
            "direction": "uk_en"
          },
          {
            "id": "en-d-past-perf-r4",
            "type": "mcq",
            "promptUk": "Який варіант — зайве використання Past Perfect?",
            "promptEn": "Which option overuses Past Perfect?",
            "options": [
              "Yesterday I had gone to work, I had written emails, I had come home.",
              "When I came home, I realised I had left my laptop at work.",
              "The train had left by the time we arrived.",
              "She had already eaten when I offered her lunch."
            ],
            "correctIndex": 0,
            "explanationUk": "Звичайна послідовність учорашнього дня не потребує had на кожному кроці.",
            "explanationEn": "A normal sequence from yesterday does not need had on every step."
          },
          {
            "id": "en-d-past-perf-e",
            "type": "explain",
            "promptUk": "Навіщо потрібен Past Perfect і коли його не варто ставити в кожне речення історії?",
            "promptEn": "Why do we need Past Perfect, and when should we not put it in every sentence of a story?",
            "keyIdeas": [
              {
                "labelUk": "раніше",
                "labelEn": "earlier",
                "anyOf": [
                  "had",
                  "earlier",
                  "раніш",
                  "before",
                  "first"
                ]
              },
              {
                "labelUk": "дві дії",
                "labelEn": "two actions",
                "anyOf": [
                  "two",
                  "дві",
                  "arrived",
                  "started",
                  "past"
                ]
              },
              {
                "labelUk": "не вся оповідь",
                "labelEn": "not the whole story",
                "anyOf": [
                  "simple",
                  "оповід",
                  "story",
                  "every",
                  "кожн",
                  "yesterday"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Past Perfect з had показує дію, яка сталася раніше за іншу минулу дію, наприклад when I arrived the film had already started. У звичайній оповіді про yesterday не треба ставити had у кожне речення — там Past Simple.",
            "sampleAnswerEn": "Past Perfect with had shows an action that happened earlier than another past action, for example when I arrived the film had already started. In a normal story about yesterday we should not put had in every sentence — that is Past Simple."
          }
        ]
      },
      {
        "slug": "en-d-ppc-past",
        "titleUk": "Past Perfect Continuous",
        "titleEn": "Past Perfect Continuous",
        "baseXp": 24,
        "difficulty": 4,
        "exercises": [
          {
            "id": "en-d-ppc-past-c",
            "type": "concept",
            "promptUk": "had been + V-ing",
            "promptEn": "had been + V-ing",
            "bodyUk": "Past Perfect Continuous: had been + V-ing. Він описує тривалу дію, яка відбувалася до певного моменту в минулому. She had been waiting for an hour when the bus finally came. I was tired because I had been driving all day.\n\nЦе «Present Perfect Continuous, зсунутий у минуле». Питання How long had you been working there before you moved? Підкреслюється процес, не підсумок. Для кількості знову Simple: She had written ten pages before lunch — не *had been writing ten pages як головна ідея кількості.\n\nНе ускладнюйте: якщо немає «ранішого процесу до минулої точки», звичайного Past Continuous або Past Simple досить. He was reading when I entered — одночасність у минулому, не Past Perfect Continuous.",
            "bodyEn": "Past Perfect Continuous is had been + V-ing. It describes an activity that was in progress up to a moment in the past. She had been waiting for an hour when the bus finally came. I was tired because I had been driving all day.\n\nThink of it as Present Perfect Continuous shifted into the past. A typical question is How long had you been working there before you moved? The focus is the process, not a total. For a quantity, Simple is better: She had written ten pages before lunch — not *had been writing ten pages as the main idea of amount.\n\nDo not overcomplicate: if there is no “earlier process up to a past point”, ordinary Past Continuous or Past Simple is enough. He was reading when I entered is two past actions at the same time, not Past Perfect Continuous.",
            "keyPointsUk": [
              "Форма: had been + V-ing",
              "Тривалий процес до моменту в минулому",
              "Пояснює стан у минулому (втома, очікування)",
              "Не плутати з одночасним Past Continuous"
            ],
            "keyPointsEn": [
              "Form: had been + V-ing",
              "A process continuing up to a past moment",
              "It often explains a past state (tiredness, waiting)",
              "Do not confuse it with simultaneous Past Continuous"
            ]
          },
          {
            "id": "en-d-ppc-past-r1",
            "type": "mcq",
            "promptUk": "Оберіть правильне: She was exhausted because she ___ all night.",
            "promptEn": "Choose the correct option: She was exhausted because she ___ all night.",
            "options": [
              "had been studying",
              "has been studying",
              "was been studying",
              "had studying"
            ],
            "correctIndex": 0,
            "explanationUk": "Процес до минулого стану втоми — had been studying.",
            "explanationEn": "A process leading to a past state of exhaustion — had been studying."
          },
          {
            "id": "en-d-ppc-past-r2",
            "type": "fill_blank",
            "promptUk": "Вставте had або has.",
            "promptEn": "Insert had or has.",
            "sentence": "They ___ been waiting for an hour when the doors opened.",
            "accepted": [
              "had",
              "Had"
            ]
          },
          {
            "id": "en-d-ppc-past-r3",
            "type": "mcq",
            "promptUk": "Яке речення описує одночасність, а не «процес до минулої точки»?",
            "promptEn": "Which sentence describes simultaneity, not “a process up to a past point”?",
            "options": [
              "He was reading when I entered.",
              "He had been reading for two hours when I entered.",
              "He had been waiting for two hours when I entered.",
              "I was tired because I had been reading all day."
            ],
            "correctIndex": 0,
            "explanationUk": "was reading when I entered — дві дії в той самий минулий момент.",
            "explanationEn": "was reading when I entered is two actions at the same past moment."
          },
          {
            "id": "en-d-ppc-past-r4",
            "type": "translate",
            "promptUk": "Перекладіть Past Perfect Continuous.",
            "promptEn": "Translate with the Past Perfect Continuous.",
            "source": "Він чекав годину, коли автобус нарешті приїхав.",
            "accepted": [
              "He had been waiting for an hour when the bus finally arrived",
              "He'd been waiting for an hour when the bus finally arrived",
              "He had been waiting for an hour when the bus finally came",
              "He'd been waiting for an hour when the bus finally came"
            ],
            "direction": "uk_en"
          },
          {
            "id": "en-d-ppc-past-e",
            "type": "explain",
            "promptUk": "Що описує Past Perfect Continuous і як його утворити? Чим він відрізняється від Past Continuous (was reading when I entered)?",
            "promptEn": "What does Past Perfect Continuous describe and how is it formed? How is it different from Past Continuous (was reading when I entered)?",
            "keyIdeas": [
              {
                "labelUk": "форма",
                "labelEn": "form",
                "anyOf": [
                  "had been",
                  "ing",
                  "-ing"
                ]
              },
              {
                "labelUk": "до моменту",
                "labelEn": "up to a moment",
                "anyOf": [
                  "before",
                  "when",
                  "hour",
                  "годин",
                  "until",
                  "до"
                ]
              },
              {
                "labelUk": "не одночасність",
                "labelEn": "not simultaneity",
                "anyOf": [
                  "was reading",
                  "simultan",
                  "одночас",
                  "entered",
                  "continuous"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Past Perfect Continuous має форму had been і дієслово з -ing. Він описує процес, який тривав до певного минулого моменту, наприклад he had been waiting for an hour. Past Continuous на кшталт was reading when I entered показує одночасність, а не раніший процес.",
            "sampleAnswerEn": "Past Perfect Continuous is formed with had been and a verb with -ing. It describes a process that continued up to a past moment, for example he had been waiting for an hour. Past Continuous such as was reading when I entered shows simultaneity, not an earlier process."
          }
        ]
      },
      {
        "slug": "en-d-narrative-mix",
        "titleUk": "Часи в оповіді: як обрати",
        "titleEn": "Narrative tenses: how to choose",
        "baseXp": 24,
        "difficulty": 4,
        "exercises": [
          {
            "id": "en-d-narrative-mix-c",
            "type": "concept",
            "promptUk": "Мікс минулих часів у короткій історії",
            "promptEn": "A mix of past tenses in a short story",
            "bodyUk": "Коротка англійська оповідь зазвичай тримається на чотирьох часах. Past Simple — кістяк подій: I walked in, I sat down, I ordered coffee. Past Continuous — фон і незавершені дії в той момент: People were talking. It was raining. Past Perfect — те, що сталося ще раніше: I realised I had left my wallet at home. Present Perfect у середині вчорашньої історії майже ніколи не потрібен.\n\nАлгоритм: 1) намалюйте головну лінію в Past Simple; 2) додайте фон у Past Continuous; 3) якщо треба «заглянути ще раніше» — Past Perfect (іноді Continuous). Не стрибайте в present, якщо історія вже в минулому, окрім прямої мови: She said, “I'm tired.”\n\nТипові помилки: увесь текст у Past Perfect; Present Perfect із yesterday; фон у Past Simple там, де дія ще тривала (When I arrived, they watched TV замість they were watching TV). Перечитайте історію і позначте три шари: лінія, фон, раніше.",
            "bodyEn": "A short English narrative usually rests on four tense choices. Past Simple is the backbone of events: I walked in, I sat down, I ordered coffee. Past Continuous is the background and actions in progress at that moment: People were talking. It was raining. Past Perfect is what happened even earlier: I realised I had left my wallet at home. Present Perfect is almost never needed in the middle of a yesterday-story.\n\nA method: 1) draw the main line in Past Simple; 2) add background in Past Continuous; 3) if you must “look further back”, use Past Perfect (sometimes Continuous). Do not jump to a present tense if the story is already in the past, except in direct speech: She said, “I'm tired.”\n\nTypical mistakes: writing the whole text in Past Perfect; Present Perfect with yesterday; Past Simple for background that was still in progress (When I arrived, they watched TV instead of they were watching TV). Reread the story and mark three layers: main line, background, earlier.",
            "keyPointsUk": [
              "Past Simple — лінія подій",
              "Past Continuous — фон і процес у той момент",
              "Past Perfect — ще раніше від лінії",
              "Present Perfect не для вчорашньої оповіді"
            ],
            "keyPointsEn": [
              "Past Simple is the event line",
              "Past Continuous is background and process at that moment",
              "Past Perfect is earlier than the event line",
              "Present Perfect is not for a yesterday narrative"
            ]
          },
          {
            "id": "en-d-narrative-mix-r1",
            "type": "mcq",
            "promptUk": "Оберіть найприродніший варіант.",
            "promptEn": "Choose the most natural option.",
            "options": [
              "When I arrived, they were watching TV. I sat down. Then I realised I had left my phone on the bus.",
              "When I have arrived, they have been watching TV. I have sat down.",
              "When I had arrived, they had been watching TV, I had sat down, I had realised.",
              "When I arrive, they watched TV and I have left my phone."
            ],
            "correctIndex": 0,
            "explanationUk": "Лінія — arrived, sat; фон — were watching; раніше — had left.",
            "explanationEn": "Event line: arrived, sat; background: were watching; earlier: had left."
          },
          {
            "id": "en-d-narrative-mix-r2",
            "type": "match",
            "promptUk": "Зіставте шар оповіді з часом.",
            "promptEn": "Match each narrative layer with a tense.",
            "pairs": [
              {
                "left": "I ordered coffee and sat down.",
                "right": "Past Simple — лінія подій / event line"
              },
              {
                "left": "It was raining and people were talking.",
                "right": "Past Continuous — фон / background"
              },
              {
                "left": "I realised I had left my wallet at home.",
                "right": "Past Perfect — ще раніше / earlier past"
              }
            ]
          },
          {
            "id": "en-d-narrative-mix-r3",
            "type": "fill_blank",
            "promptUk": "Вставте were або had.",
            "promptEn": "Insert were or had.",
            "sentence": "When I opened the door, they ___ still discussing the bug.",
            "accepted": [
              "were",
              "Were"
            ]
          },
          {
            "id": "en-d-narrative-mix-r4",
            "type": "mcq",
            "promptUk": "Чому в оповіді про вчора майже немає Present Perfect?",
            "promptEn": "Why is there almost no Present Perfect in a story about yesterday?",
            "options": [
              "Бо історія замкнена в закінченому минулому, а Present Perfect зв'язує подію з теперішнім.",
              "Бо Present Perfect заборонений у художніх текстах взагалі.",
              "Бо в англійській немає Present Perfect.",
              "Бо yesterday завжди вимагає Future Perfect."
            ],
            "correctIndex": 0,
            "explanationUk": "Present Perfect тримає зв'язок із зараз; вчорашня оповідь цього не робить.",
            "explanationEn": "Present Perfect keeps a link to now; a yesterday story does not.",
            "optionsEn": [
              "Because the story is locked in a finished past, while Present Perfect links an event to the present.",
              "Because Present Perfect is banned in all fiction.",
              "Because English has no Present Perfect.",
              "Because yesterday always requires Future Perfect."
            ]
          },
          {
            "id": "en-d-narrative-mix-e",
            "type": "explain",
            "promptUk": "Опишіть три шари оповіді: лінія подій, фон і «ще раніше». Які часи для них?",
            "promptEn": "Describe the three layers of a narrative: the event line, the background, and “even earlier”. Which tenses do they take?",
            "keyIdeas": [
              {
                "labelUk": "лінія",
                "labelEn": "event line",
                "anyOf": [
                  "past simple",
                  "simple",
                  "лінія",
                  "event",
                  "ordered",
                  "sat"
                ]
              },
              {
                "labelUk": "фон",
                "labelEn": "background",
                "anyOf": [
                  "continuous",
                  "фон",
                  "background",
                  "raining",
                  "watching"
                ]
              },
              {
                "labelUk": "раніше",
                "labelEn": "earlier",
                "anyOf": [
                  "past perfect",
                  "had",
                  "earlier",
                  "раніш",
                  "left"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Лінія подій іде в Past Simple, наприклад I ordered coffee. Фон — Past Continuous, it was raining. Те, що сталося ще раніше, бере Past Perfect: I realised I had left my wallet.",
            "sampleAnswerEn": "The event line is Past Simple, for example I ordered coffee. The background is Past Continuous, it was raining. What happened even earlier takes Past Perfect: I realised I had left my wallet."
          }
        ]
      },
      {
        "slug": "en-deep-perfect-plus-exam",
        "titleUk": "Контрольна: Perfect Continuous і Past Perfect",
        "titleEn": "Exam: Perfect Continuous and Past Perfect",
        "baseXp": 30,
        "difficulty": 4,
        "isExam": true,
        "passThreshold": 0.7,
        "exercises": [
          {
            "id": "en-deep-perfect-plus-exam-q1",
            "type": "mcq",
            "promptUk": "How long ___ you ___ English?",
            "promptEn": "How long ___ you ___ English?",
            "options": [
              "have / been studying",
              "has / been studying",
              "have / study",
              "are / studying"
            ],
            "correctIndex": 0,
            "explanationUk": "How long + Present Perfect Continuous: have you been studying.",
            "explanationEn": "How long + Present Perfect Continuous: have you been studying."
          },
          {
            "id": "en-deep-perfect-plus-exam-q2",
            "type": "mcq",
            "promptUk": "Звіт готовий. Яка форма?",
            "promptEn": "The report is finished. Which form?",
            "options": [
              "I have written the report.",
              "I have been writing the report (unfinished).",
              "I have been written the report.",
              "I had been write the report."
            ],
            "correctIndex": 0,
            "explanationUk": "Готовий результат — have written.",
            "explanationEn": "A finished result is have written."
          },
          {
            "id": "en-deep-perfect-plus-exam-q3",
            "type": "mcq",
            "promptUk": "When I arrived, the meeting ___ already ___.",
            "promptEn": "When I arrived, the meeting ___ already ___.",
            "options": [
              "had / started",
              "has / started",
              "have / started",
              "was / start"
            ],
            "correctIndex": 0,
            "explanationUk": "Раніше від минулого приходу — had started.",
            "explanationEn": "Earlier than the past arrival — had started."
          },
          {
            "id": "en-deep-perfect-plus-exam-q4",
            "type": "mcq",
            "promptUk": "She was tired because she ___ all day.",
            "promptEn": "She was tired because she ___ all day.",
            "options": [
              "had been driving",
              "has been driving",
              "was been driving",
              "had driving"
            ],
            "correctIndex": 0,
            "explanationUk": "Процес до минулого стану — had been driving.",
            "explanationEn": "A process leading to a past state — had been driving."
          },
          {
            "id": "en-deep-perfect-plus-exam-q5",
            "type": "fill_blank",
            "promptUk": "Вставте known або been knowing.",
            "promptEn": "Insert known or been knowing.",
            "sentence": "I have ___ her for ten years.",
            "accepted": [
              "known",
              "Known"
            ]
          }
        ]
      }
    ]
  },
  {
    "slug": "en-deep-past-story",
    "titleUk": "Розповідь про минуле",
    "titleEn": "Telling a story in the past",
    "lessons": [
      {
        "slug": "en-d-past-cont",
        "titleUk": "Past Continuous: дія в процесі",
        "titleEn": "Past Continuous: an action in progress",
        "baseXp": 18,
        "difficulty": 2,
        "exercises": [
          {
            "id": "en-d-past-cont-c",
            "type": "concept",
            "promptUk": "was/were + V-ing",
            "promptEn": "was/were + V-ing",
            "bodyUk": "Past Continuous: was (I, he, she, it) або were (you, we, they) + дієслово з -ing. I was cooking at seven. They were discussing the bug. Час малює «кадр»: дія вже почалася, ще не закінчилась у той минулий момент.\n\nВ українській часто досить минулого («я готував о сьомій»), тож форму легко забути. Питання: What were you doing at seven? Заперечення: I wasn't sleeping. Станні дієслова знову рідко йдуть у Continuous: не *I was knowing the answer, а I knew the answer.\n\nPast Continuous також описує тимчасові ситуації в минулому (I was living in Kyiv that summer) і ввічливі запитання: I was wondering if you could help. Не використовуйте його як основну лінію завершених подій: *Yesterday I was getting up, I was having breakfast, I was going to work — для послідовності потрібен Past Simple.",
            "bodyEn": "Past Continuous is was (I, he, she, it) or were (you, we, they) plus verb-ing. I was cooking at seven. They were discussing the bug. The tense paints a “still”: the action had started and had not finished at that past moment.\n\nUkrainian often uses a simple past (“I was cooking at seven”), so the form is easy to forget. Questions: What were you doing at seven? Negatives: I wasn't sleeping. Stative verbs again rarely take Continuous: not *I was knowing the answer, but I knew the answer.\n\nPast Continuous also describes temporary past situations (I was living in Kyiv that summer) and polite enquiries: I was wondering if you could help. Do not use it as the main line of completed events: *Yesterday I was getting up, I was having breakfast, I was going to work — a sequence needs Past Simple.",
            "keyPointsUk": [
              "was/were + V-ing: дія в процесі в минулий момент",
              "was — I/he/she/it; were — you/we/they",
              "Станні дієслова — зазвичай Past Simple",
              "Не розповідати всю вчорашню послідовність у Continuous"
            ],
            "keyPointsEn": [
              "was/were + V-ing: an action in progress at a past moment",
              "was for I/he/she/it; were for you/we/they",
              "Stative verbs usually take Past Simple",
              "Do not tell a whole yesterday-sequence in Continuous"
            ]
          },
          {
            "id": "en-d-past-cont-r1",
            "type": "mcq",
            "promptUk": "Оберіть правильне: At seven I ___ dinner.",
            "promptEn": "Choose the correct option: At seven I ___ dinner.",
            "options": [
              "was cooking",
              "were cooking",
              "am cooking",
              "have cooking"
            ],
            "correctIndex": 0,
            "explanationUk": "Підмет I бере was + cooking.",
            "explanationEn": "The subject I takes was + cooking."
          },
          {
            "id": "en-d-past-cont-r2",
            "type": "fill_blank",
            "promptUk": "Вставте was або were.",
            "promptEn": "Insert was or were.",
            "sentence": "What ___ you doing when she called?",
            "accepted": [
              "were",
              "Were"
            ]
          },
          {
            "id": "en-d-past-cont-r3",
            "type": "translate",
            "promptUk": "Перекладіть Past Continuous.",
            "promptEn": "Translate with the Past Continuous.",
            "source": "О восьмій вони обговорювали баг.",
            "accepted": [
              "At eight they were discussing the bug",
              "They were discussing the bug at eight",
              "At 8 they were discussing the bug",
              "They were discussing the bug at 8",
              "At eight o'clock they were discussing the bug",
              "They were discussing the bug at eight o'clock"
            ],
            "direction": "uk_en"
          },
          {
            "id": "en-d-past-cont-r4",
            "type": "mcq",
            "promptUk": "Яке речення неправильне?",
            "promptEn": "Which sentence is wrong?",
            "options": [
              "I was knowing the answer at that moment.",
              "I knew the answer at that moment.",
              "I was cooking at seven.",
              "They were discussing the bug."
            ],
            "correctIndex": 0,
            "explanationUk": "know — станне, тому не was knowing.",
            "explanationEn": "know is stative, so not was knowing."
          },
          {
            "id": "en-d-past-cont-e",
            "type": "explain",
            "promptUk": "Як утворюється Past Continuous і що він описує? Чому ним не можна розповісти всю послідовність вчорашнього дня?",
            "promptEn": "How is Past Continuous formed and what does it describe? Why can't you tell a whole yesterday-sequence with it?",
            "keyIdeas": [
              {
                "labelUk": "форма",
                "labelEn": "form",
                "anyOf": [
                  "was",
                  "were",
                  "ing",
                  "-ing"
                ]
              },
              {
                "labelUk": "процес",
                "labelEn": "in progress",
                "anyOf": [
                  "progress",
                  "процес",
                  "момент",
                  "moment",
                  "seven"
                ]
              },
              {
                "labelUk": "не послідовність",
                "labelEn": "not a sequence",
                "anyOf": [
                  "simple",
                  "sequence",
                  "послідов",
                  "yesterday",
                  "getting up"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Past Continuous утворюється з was або were і дієсловом з -ing. Він описує дію в процесі в певний минулий момент. Усю послідовність вчорашнього дня розповідають Past Simple, а не Continuous.",
            "sampleAnswerEn": "Past Continuous is formed with was or were and a verb with -ing. It describes an action in progress at a past moment. A whole yesterday sequence is told in Past Simple, not in Continuous."
          }
        ]
      },
      {
        "slug": "en-d-ps-vs-pc",
        "titleUk": "Past Simple і Past Continuous разом",
        "titleEn": "Past Simple and Past Continuous together",
        "baseXp": 18,
        "difficulty": 2,
        "exercises": [
          {
            "id": "en-d-ps-vs-pc-c",
            "type": "concept",
            "promptUk": "Переривання і фон",
            "promptEn": "Interruption and background",
            "bodyUk": "Класична пара: I was taking a shower when the phone rang. Тривала дія (Continuous) і коротке переривання (Simple). When I entered, they were still arguing — фон триває, вхід — точка на лінії.\n\nСхеми: 1) довший процес + коротка подія: She was crossing the street when she saw her friend. 2) два паралельні процеси: I was cooking while he was setting the table. 3) проста послідовність без фону: I entered, I sat down, I opened the laptop — лише Simple.\n\nТипова помилка: поміняти часи місцями (*The phone was ringing when I was picking it up задумом «телефон задзвонив» — якщо це коротка подія, досить The phone rang while I was cooking). Інша: When I arrived, they had dinner замість they were having dinner, якщо вечеря ще тривала. Дивіться, що є «точкою», а що — «стрічкою».",
            "bodyEn": "The classic pair is I was taking a shower when the phone rang. A longer action (Continuous) and a short interruption (Simple). When I entered, they were still arguing — the background continues; the entrance is a point on the event line.\n\nPatterns: 1) a longer process plus a short event: She was crossing the street when she saw her friend. 2) two parallel processes: I was cooking while he was setting the table. 3) a plain sequence with no background: I entered, I sat down, I opened the laptop — Simple only.\n\nA typical mistake is swapping the tenses (*The phone was ringing when I was picking it up meant as “the phone rang” — if it is a short event, The phone rang while I was cooking is enough). Another: When I arrived, they had dinner instead of they were having dinner if dinner was still in progress. Decide what is a “point” and what is a “ribbon”.",
            "keyPointsUk": [
              "Continuous — стрічка; Simple — точка-переривання",
              "while часто з'єднує два процеси",
              "Чиста послідовність подій — Past Simple",
              "Не міняти часи місцями без причини"
            ],
            "keyPointsEn": [
              "Continuous is the ribbon; Simple is the interrupting point",
              "while often joins two processes",
              "A plain sequence of events is Past Simple",
              "Do not swap the tenses without a reason"
            ]
          },
          {
            "id": "en-d-ps-vs-pc-r1",
            "type": "mcq",
            "promptUk": "Оберіть правильне.",
            "promptEn": "Choose the correct option.",
            "options": [
              "I was taking a shower when the phone rang.",
              "I took a shower when the phone was ringing and that is the only possible story.",
              "I was taking a shower when the phone was ring.",
              "I have been taking a shower when the phone rings."
            ],
            "correctIndex": 0,
            "explanationUk": "Процес — was taking; коротка подія — rang.",
            "explanationEn": "The process is was taking; the short event is rang."
          },
          {
            "id": "en-d-ps-vs-pc-r2",
            "type": "fill_blank",
            "promptUk": "Вставте rang або was ringing (одне з двох як головну коротку подію).",
            "promptEn": "Insert rang or was ringing (one of them as the short main event).",
            "sentence": "The phone ___ while I was cooking.",
            "accepted": [
              "rang",
              "Rang"
            ]
          },
          {
            "id": "en-d-ps-vs-pc-r3",
            "type": "translate",
            "promptUk": "Перекладіть, показавши фон і переривання.",
            "promptEn": "Translate, showing background and interruption.",
            "source": "Я писав лист, коли вона зайшла.",
            "accepted": [
              "I was writing an email when she came in",
              "I was writing a letter when she came in",
              "I was writing an email when she entered",
              "I was writing a letter when she entered",
              "I was writing an email when she walked in"
            ],
            "direction": "uk_en"
          },
          {
            "id": "en-d-ps-vs-pc-r4",
            "type": "mcq",
            "promptUk": "Яке речення — паралельні процеси?",
            "promptEn": "Which sentence is two parallel processes?",
            "options": [
              "I was cooking while he was setting the table.",
              "I cooked, he set the table, then we ate — only points in a sequence.",
              "The phone rang. I picked it up.",
              "I have cooked while he sets the table."
            ],
            "correctIndex": 0,
            "explanationUk": "was cooking while was setting — два фони одночасно.",
            "explanationEn": "was cooking while was setting is two backgrounds at once."
          },
          {
            "id": "en-d-ps-vs-pc-e",
            "type": "explain",
            "promptUk": "Як Past Continuous і Past Simple працюють у парі «процес + переривання»? Наведіть роль while.",
            "promptEn": "How do Past Continuous and Past Simple work as a “process + interruption” pair? Mention the role of while.",
            "keyIdeas": [
              {
                "labelUk": "процес",
                "labelEn": "process",
                "anyOf": [
                  "continuous",
                  "was",
                  "процес",
                  "shower",
                  "ribbon",
                  "стріч"
                ]
              },
              {
                "labelUk": "переривання",
                "labelEn": "interruption",
                "anyOf": [
                  "rang",
                  "simple",
                  "перерив",
                  "interruption",
                  "phone"
                ]
              },
              {
                "labelUk": "while",
                "labelEn": "while",
                "anyOf": [
                  "while",
                  "parallel",
                  "паралел",
                  "two"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Past Continuous малює процес, наприклад I was taking a shower, а Past Simple — коротке переривання: the phone rang. While часто з'єднує два паралельні процеси в Continuous.",
            "sampleAnswerEn": "Past Continuous paints the process, for example I was taking a shower, and Past Simple is the short interruption: the phone rang. While often joins two parallel processes in Continuous."
          }
        ]
      },
      {
        "slug": "en-d-when-while",
        "titleUk": "when і while у минулому",
        "titleEn": "when and while in the past",
        "baseXp": 18,
        "difficulty": 2,
        "exercises": [
          {
            "id": "en-d-when-while-c",
            "type": "concept",
            "promptUk": "Сполучники часу",
            "promptEn": "Time conjunctions",
            "bodyUk": "when може стояти і з короткою подією, і з процесом: When I arrived (точка), When I was living in Kyiv (період). while майже завжди вводить процес: While I was waiting, I read a book. as теж може вводити одночасний процес: As I was leaving, it started to rain.\n\nПісля when, while, as, before, after, until, as soon as у значенні часу англійська НЕ ставить will і зазвичай не ставить would: When he arrived, we started — не *When he would arrive. Це окрема пастка, якщо ви думаєте про майбутнє (When he arrives, we will start — present у підрядному).\n\nКома: якщо підрядне на початку, після нього часто кома: While I was waiting, I read. Якщо підрядне в кінці, кома не обов'язкова: I read while I was waiting. Не пишіть *during I was waiting — during потребує іменника (during the meeting), для процесу — while.",
            "bodyEn": "when can take either a short event or a process: When I arrived (a point), When I was living in Kyiv (a period). while almost always introduces a process: While I was waiting, I read a book. as can also introduce a simultaneous process: As I was leaving, it started to rain.\n\nAfter when, while, as, before, after, until, as soon as in a time meaning, English does NOT use will and usually does not use would: When he arrived, we started — not *When he would arrive. This is a separate trap when you talk about the future (When he arrives, we will start — a present tense in the time clause).\n\nComma: if the clause comes first, a comma is common: While I was waiting, I read. If it comes last, a comma is optional: I read while I was waiting. Do not write *during I was waiting — during takes a noun (during the meeting); for a process use while.",
            "keyPointsUk": [
              "while + процес; when — і точка, і процес",
              "after when/while у часовому значенні немає will",
              "during + іменник, while + речення",
              "Підрядне на початку часто з комою"
            ],
            "keyPointsEn": [
              "while plus a process; when can be a point or a process",
              "No will after when/while in a time meaning",
              "during plus a noun; while plus a clause",
              "A clause at the start often takes a comma"
            ]
          },
          {
            "id": "en-d-when-while-r1",
            "type": "mcq",
            "promptUk": "Оберіть правильне.",
            "promptEn": "Choose the correct option.",
            "options": [
              "While I was waiting, I read a book.",
              "During I was waiting, I read a book.",
              "While I waiting, I read a book.",
              "During I waited a book I read."
            ],
            "correctIndex": 0,
            "explanationUk": "while + речення в процесі; during іменник не замінює.",
            "explanationEn": "while takes a clause in progress; during cannot replace it."
          },
          {
            "id": "en-d-when-while-r2",
            "type": "fill_blank",
            "promptUk": "Вставте when або during.",
            "promptEn": "Insert when or during.",
            "sentence": "The lights went out ___ the meeting.",
            "accepted": [
              "during",
              "During"
            ]
          },
          {
            "id": "en-d-when-while-r3",
            "type": "mcq",
            "promptUk": "Яке речення про майбутнє правильне?",
            "promptEn": "Which sentence about the future is correct?",
            "options": [
              "When he arrives, we will start.",
              "When he will arrive, we will start.",
              "When he would arrive, we will start.",
              "When he arriving, we will start."
            ],
            "correctIndex": 0,
            "explanationUk": "У часовому підрядному — present (arrives), не will.",
            "explanationEn": "A time clause takes a present (arrives), not will."
          },
          {
            "id": "en-d-when-while-r4",
            "type": "translate",
            "promptUk": "Перекладіть, почавши з While.",
            "promptEn": "Translate, starting with While.",
            "source": "Поки я чекав, я читав книгу.",
            "accepted": [
              "While I was waiting, I read a book",
              "While I was waiting I read a book",
              "While I was waiting, I was reading a book",
              "While I was waiting I was reading a book"
            ],
            "direction": "uk_en"
          },
          {
            "id": "en-d-when-while-e",
            "type": "explain",
            "promptUk": "Чим while відрізняється від during і чому після when у часовому значенні немає will?",
            "promptEn": "How is while different from during, and why is there no will after when in a time meaning?",
            "keyIdeas": [
              {
                "labelUk": "while",
                "labelEn": "while",
                "anyOf": [
                  "while",
                  "процес",
                  "process",
                  "clause",
                  "речен"
                ]
              },
              {
                "labelUk": "during",
                "labelEn": "during",
                "anyOf": [
                  "during",
                  "іменник",
                  "noun",
                  "meeting"
                ]
              },
              {
                "labelUk": "без will",
                "labelEn": "no will",
                "anyOf": [
                  "will",
                  "arrives",
                  "present",
                  "теперішн"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "While вводить речення-процес, а during — іменник, наприклад during the meeting. Після when у часовому значенні will не ставлять: When he arrives, we will start.",
            "sampleAnswerEn": "While introduces a process clause, while during takes a noun, for example during the meeting. After when in a time meaning we do not use will: When he arrives, we will start."
          }
        ]
      },
      {
        "slug": "en-d-used-to",
        "titleUk": "used to: минулі звички і стани",
        "titleEn": "used to: past habits and states",
        "baseXp": 18,
        "difficulty": 2,
        "exercises": [
          {
            "id": "en-d-used-to-c",
            "type": "concept",
            "promptUk": "Раніше було так, зараз інакше",
            "promptEn": "It used to be true, and now it is not",
            "bodyUk": "used to + інфінітив описує те, що регулярно було правдою в минулому, а тепер ні: I used to play football every weekend (більше не граю). She used to live in Odesa. I used to be shy. Це і звички, і стани (be, have, live).\n\nФорма: used to в твердженні; у запереченні didn't use to (без -d): I didn't use to like coffee. У питанні: Did you use to wear glasses? Типова помилка: *I didn't used to і *Did you used to — після did форма гола: use. Інша помилка: плутати з be used to (бути звиклі до) і get used to (звикати) — це вже інша конструкція з -ing: I am used to getting up early.\n\nused to не ставлять для одноразової минулої дії (*I used to go to the dentist yesterday). Для цього — Past Simple. Якщо звичка ще жива — Present Simple: I play football every weekend, не used to.",
            "bodyEn": "used to + infinitive describes something that was regularly true in the past and is not true now: I used to play football every weekend (I no longer do). She used to live in Odesa. I used to be shy. It covers both habits and states (be, have, live).\n\nThe form is used to in statements; the negative is didn't use to (no -d): I didn't use to like coffee. Questions: Did you use to wear glasses? A typical mistake is *I didn't used to and *Did you used to — after did the form is bare: use. Another mistake is confusing this with be used to (be accustomed to) and get used to (become accustomed), which take -ing: I am used to getting up early.\n\nDo not use used to for a one-off past action (*I used to go to the dentist yesterday). That is Past Simple. If the habit is still alive, use Present Simple: I play football every weekend, not used to.",
            "keyPointsUk": [
              "used to + інфінітив: минула звичка або стан, якого вже немає",
              "Заперечення і питання: didn't use to / Did you use to (без -d)",
              "Не плутати з be used to / get used to + -ing",
              "Не для одноразової дії вчора"
            ],
            "keyPointsEn": [
              "used to + infinitive: a past habit or state that is no longer true",
              "Negatives and questions: didn't use to / Did you use to (no -d)",
              "Do not confuse it with be used to / get used to + -ing",
              "Not for a one-off action yesterday"
            ]
          },
          {
            "id": "en-d-used-to-r1",
            "type": "mcq",
            "promptUk": "Оберіть правильне заперечення.",
            "promptEn": "Choose the correct negative.",
            "options": [
              "I didn't use to like coffee.",
              "I didn't used to like coffee.",
              "I wasn't use to like coffee.",
              "I don't used to like coffee."
            ],
            "correctIndex": 0,
            "explanationUk": "Після didn't — use to без -d.",
            "explanationEn": "After didn't we use use to without -d."
          },
          {
            "id": "en-d-used-to-r2",
            "type": "fill_blank",
            "promptUk": "Вставте use або used.",
            "promptEn": "Insert use or used.",
            "sentence": "Did you ___ to live in Lviv?",
            "accepted": [
              "use",
              "Use"
            ]
          },
          {
            "id": "en-d-used-to-r3",
            "type": "mcq",
            "promptUk": "Яке речення про звичку, яка ЩЕ жива?",
            "promptEn": "Which sentence is about a habit that is STILL alive?",
            "options": [
              "I play football every weekend.",
              "I used to play football every weekend (but I stopped).",
              "I didn't use to play football, and that describes a current hobby.",
              "I am used to play football every weekend."
            ],
            "correctIndex": 0,
            "explanationUk": "Жива звичка — Present Simple: I play.",
            "explanationEn": "A living habit is Present Simple: I play."
          },
          {
            "id": "en-d-used-to-r4",
            "type": "translate",
            "promptUk": "Перекладіть через used to.",
            "promptEn": "Translate with used to.",
            "source": "Раніше вона жила в Одесі.",
            "accepted": [
              "She used to live in Odesa",
              "She used to live in Odessa",
              "She used to live in Odesa."
            ],
            "direction": "uk_en"
          },
          {
            "id": "en-d-used-to-e",
            "type": "explain",
            "promptUk": "Що означає used to і як зробити заперечення? Чим це не те саме, що be used to?",
            "promptEn": "What does used to mean, and how do you make a negative? How is it not the same as be used to?",
            "keyIdeas": [
              {
                "labelUk": "минала звичка",
                "labelEn": "past habit",
                "anyOf": [
                  "used to",
                  "habit",
                  "звичка",
                  "past",
                  "already",
                  "більше"
                ]
              },
              {
                "labelUk": "didn't use",
                "labelEn": "didn't use",
                "anyOf": [
                  "didn't",
                  "use to",
                  "did you use"
                ]
              },
              {
                "labelUk": "be used to",
                "labelEn": "be used to",
                "anyOf": [
                  "be used",
                  "ing",
                  "-ing",
                  "accustom",
                  "звик"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Used to описує минулу звичку або стан, якого вже немає. Заперечення — didn't use to без літери d. Be used to — це «бути звиклі» і після нього йде -ing, це інша конструкція.",
            "sampleAnswerEn": "Used to describes a past habit or state that is no longer true. The negative is didn't use to without a d. Be used to means “be accustomed” and is followed by -ing: it is a different structure."
          }
        ]
      },
      {
        "slug": "en-d-would-used",
        "titleUk": "would і used to: звички проти станів",
        "titleEn": "would and used to: habits versus states",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "en-d-would-used-c",
            "type": "concept",
            "promptUk": "would не для I used to be shy",
            "promptEn": "would is not for I used to be shy",
            "bodyUk": "would + інфінітив теж може описувати повторювані минулі дії, часто в оповіді: Every summer we would go to the sea. Grandmother would tell us stories. Відтінок — «ось так було тоді, знову і знову», трохи ностальгійний або оповідний.\n\nВажливе обмеження: would НЕ вживають для минулих станів. Не можна *I would be shy, *She would live in Odesa, *I would have a dog у значенні звички-стану. Для станів — лише used to: I used to be shy. She used to live in Odesa. Для повторюваних дій можливі обидва: I used to / would play in the yard.\n\nwould тут не є ввічливим would like і не є умовним would. Контекст — минула оповідь. У запереченні used to природніше, ніж wouldn't, коли ви просто повідомляєте факт «раніше не робив». Не ставте would з конкретною одноразовою датою: *In 2019 I would go to Prague once.",
            "bodyEn": "would + infinitive can also describe repeated past actions, often in a story: Every summer we would go to the sea. Grandmother would tell us stories. The flavour is “that is how it was then, again and again”, slightly nostalgic or narrative.\n\nAn important limit: would is NOT used for past states. You cannot say *I would be shy, *She would live in Odesa, or *I would have a dog in the habit-state sense. For states, only used to works: I used to be shy. She used to live in Odesa. For repeated actions both are possible: I used to / would play in the yard.\n\nThis would is not polite would like and not conditional would. The context is a past narrative. In negatives, used to is more natural than wouldn't when you are simply stating “I didn't do that in the past”. Do not use would with a one-off date: *In 2019 I would go to Prague once.",
            "keyPointsUk": [
              "would — повторювані минулі ДІЇ в оповіді",
              "would не описує стани (be, live, have)",
              "Для станів — лише used to",
              "Не для одноразової дії з датою"
            ],
            "keyPointsEn": [
              "would is for repeated past ACTIONS in a narrative",
              "would does not describe states (be, live, have)",
              "For states, only used to works",
              "Not for a one-off action with a date"
            ]
          },
          {
            "id": "en-d-would-used-r1",
            "type": "mcq",
            "promptUk": "Яке речення правильне?",
            "promptEn": "Which sentence is correct?",
            "options": [
              "She used to live in Odesa.",
              "She would live in Odesa (as a past state).",
              "She would be a student in Odesa for four years, as a state.",
              "She would having a flat in Odesa."
            ],
            "correctIndex": 0,
            "explanationUk": "live як стан — лише used to, не would.",
            "explanationEn": "live as a state takes only used to, not would."
          },
          {
            "id": "en-d-would-used-r2",
            "type": "mcq",
            "promptUk": "Оберіть природний оповідний варіант про повторювану дію.",
            "promptEn": "Choose the natural narrative option for a repeated action.",
            "options": [
              "Every summer we would go to the sea.",
              "Every summer we would be at the sea as a state with would be only.",
              "In 2019 once we would go to the sea.",
              "We would went to the sea every summer."
            ],
            "correctIndex": 0,
            "explanationUk": "Повторювана дія в оповіді — would go.",
            "explanationEn": "A repeated narrative action is would go."
          },
          {
            "id": "en-d-would-used-r3",
            "type": "fill_blank",
            "promptUk": "Вставте used або would (одне слово; потрібен СТАН).",
            "promptEn": "Insert used or would (one word; a STATE is needed).",
            "sentence": "I ___ to be very shy.",
            "accepted": [
              "used",
              "Used"
            ]
          },
          {
            "id": "en-d-would-used-r4",
            "type": "translate",
            "promptUk": "Перекладіть. Це повторювана дія (можна would).",
            "promptEn": "Translate. This is a repeated action (would is possible).",
            "source": "Щоліта ми ходили до моря.",
            "accepted": [
              "Every summer we would go to the sea",
              "Every summer we used to go to the sea",
              "We would go to the sea every summer",
              "We used to go to the sea every summer"
            ],
            "direction": "uk_en"
          },
          {
            "id": "en-d-would-used-e",
            "type": "explain",
            "promptUk": "Коли would і used to взаємозамінні, і чому не можна сказати I would be shy?",
            "promptEn": "When are would and used to interchangeable, and why can't you say I would be shy?",
            "keyIdeas": [
              {
                "labelUk": "дії",
                "labelEn": "actions",
                "anyOf": [
                  "would",
                  "action",
                  "дію",
                  "go",
                  "play",
                  "summer"
                ]
              },
              {
                "labelUk": "стани",
                "labelEn": "states",
                "anyOf": [
                  "used to",
                  "state",
                  "стан",
                  "be",
                  "live",
                  "shy"
                ]
              },
              {
                "labelUk": "не would be",
                "labelEn": "not would be",
                "anyOf": [
                  "would be",
                  "shy",
                  "cannot",
                  "не можн"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Для повторюваних минулих дій можна сказати і would, і used to, наприклад we would go to the sea. Для станів на кшталт be shy підходить лише used to. Речення I would be shy у цьому значенні неправильне.",
            "sampleAnswerEn": "For repeated past actions you can use either would or used to, for example we would go to the sea. For states such as be shy, only used to works. I would be shy is wrong in this meaning."
          }
        ]
      },
      {
        "slug": "en-deep-past-story-exam",
        "titleUk": "Контрольна: розповідь про минуле",
        "titleEn": "Exam: telling a story in the past",
        "baseXp": 30,
        "difficulty": 3,
        "isExam": true,
        "passThreshold": 0.7,
        "exercises": [
          {
            "id": "en-deep-past-story-exam-q1",
            "type": "mcq",
            "promptUk": "At seven I ___ dinner.",
            "promptEn": "At seven I ___ dinner.",
            "options": [
              "was cooking",
              "were cooking",
              "have cooking",
              "am cooking"
            ],
            "correctIndex": 0,
            "explanationUk": "I + was cooking.",
            "explanationEn": "I + was cooking."
          },
          {
            "id": "en-deep-past-story-exam-q2",
            "type": "mcq",
            "promptUk": "Оберіть правильне.",
            "promptEn": "Choose the correct option.",
            "options": [
              "I was taking a shower when the phone rang.",
              "I was taking a shower when the phone was ring.",
              "I have taken a shower when the phone rings.",
              "I taking a shower when the phone rang."
            ],
            "correctIndex": 0,
            "explanationUk": "Процес + коротка подія: was taking / rang.",
            "explanationEn": "Process + short event: was taking / rang."
          },
          {
            "id": "en-deep-past-story-exam-q3",
            "type": "mcq",
            "promptUk": "Оберіть правильне заперечення.",
            "promptEn": "Choose the correct negative.",
            "options": [
              "I didn't use to like coffee.",
              "I didn't used to like coffee.",
              "I don't used to like coffee.",
              "I wasn't used to like coffee (same meaning as didn't use to)."
            ],
            "correctIndex": 0,
            "explanationUk": "didn't use to — без -d.",
            "explanationEn": "didn't use to — no -d."
          },
          {
            "id": "en-deep-past-story-exam-q4",
            "type": "mcq",
            "promptUk": "Яке речення правильне для стану?",
            "promptEn": "Which sentence is correct for a state?",
            "options": [
              "She used to live in Odesa.",
              "She would live in Odesa as a past state.",
              "She would be living in Odesa as the only way to say a state.",
              "She used live in Odesa."
            ],
            "correctIndex": 0,
            "explanationUk": "Стан live — used to, не would.",
            "explanationEn": "The state live takes used to, not would."
          },
          {
            "id": "en-deep-past-story-exam-q5",
            "type": "fill_blank",
            "promptUk": "Вставте while або during.",
            "promptEn": "Insert while or during.",
            "sentence": "I made notes ___ I was waiting.",
            "accepted": [
              "while",
              "While"
            ]
          }
        ]
      }
    ]
  },
  {
    "slug": "en-deep-future",
    "titleUk": "Майбутні форми",
    "titleEn": "Talking about the future",
    "lessons": [
      {
        "slug": "en-d-will-going",
        "titleUk": "will і going to",
        "titleEn": "will and going to",
        "baseXp": 18,
        "difficulty": 2,
        "exercises": [
          {
            "id": "en-d-will-going-c",
            "type": "concept",
            "promptUk": "Рішення зараз проти наміру і прогнозу за ознаками",
            "promptEn": "A decision now versus intention and evidence",
            "bodyUk": "will + інфінітив часто виражає рішення, прийняте в момент мовлення: The phone is ringing. I'll get it. Також обіцянки, пропозиції й чисті прогнози: I'll help you. I think it will rain. shall з I/we — більш формальне (Shall I open the window?).\n\ngoing to + інфінітив — попередній намір (We're going to move house next year) або прогноз на основі того, що вже видно: Look at those clouds. It's going to rain. Українською обидва часто звучать як «я зроблю / буде дощ», тому вибір треба робити за ситуацією, не за дослівним перекладом.\n\nТипові помилки: I will to go (*зайвий to); I going to (*без am/is/are); will для вже узгодженого плану з конкретним часом, де природніше going to або Present Continuous. У першому умовному після if немає will: If it rains, we will stay home — не *If it will rain.",
            "bodyEn": "will + infinitive often expresses a decision made at the moment of speaking: The phone is ringing. I'll get it. It also covers promises, offers, and plain predictions: I'll help you. I think it will rain. shall with I/we is more formal (Shall I open the window?).\n\ngoing to + infinitive is a prior intention (We're going to move house next year) or a prediction based on evidence you can already see: Look at those clouds. It's going to rain. In Ukrainian both often sound like “I will do it / it will rain”, so you choose by situation, not by word-for-word translation.\n\nTypical mistakes: I will to go (extra to); I going to (missing am/is/are); will for an already settled plan with a clear time, where going to or Present Continuous is more natural. In a first conditional there is no will after if: If it rains, we will stay home — not *If it will rain.",
            "keyPointsUk": [
              "will — рішення «зараз», обіцянка, чистий прогноз",
              "going to — намір заздалегідь або прогноз за видимими ознаками",
              "Після will немає to: I'll help, не *will to help",
              "Після if у 1-му умовному — present, не will"
            ],
            "keyPointsEn": [
              "will is a “now” decision, a promise, or a plain prediction",
              "going to is a prior intention or a prediction from visible evidence",
              "No to after will: I'll help, not *will to help",
              "After if in the first conditional, use a present, not will"
            ]
          },
          {
            "id": "en-d-will-going-r1",
            "type": "mcq",
            "promptUk": "Телефон дзвонить. Рішення в моменті. Що сказати?",
            "promptEn": "The phone is ringing. A decision in the moment. What do you say?",
            "options": [
              "I'll get it.",
              "I'm going to get it — I decided this last week.",
              "I will to get it.",
              "I getting it."
            ],
            "correctIndex": 0,
            "explanationUk": "Рішення зараз — will: I'll get it.",
            "explanationEn": "A decision now takes will: I'll get it."
          },
          {
            "id": "en-d-will-going-r2",
            "type": "mcq",
            "promptUk": "Хмари чорні, дощ майже очевидний. Що природніше?",
            "promptEn": "The clouds are black; rain is almost obvious. Which is more natural?",
            "options": [
              "It's going to rain.",
              "I will raining.",
              "It will to rain because I just decided the weather.",
              "It going rain."
            ],
            "correctIndex": 0,
            "explanationUk": "Прогноз за видимими ознаками — going to.",
            "explanationEn": "A prediction from visible evidence is going to."
          },
          {
            "id": "en-d-will-going-r3",
            "type": "fill_blank",
            "promptUk": "Вставте 'll або to.",
            "promptEn": "Insert 'll or to.",
            "sentence": "It's cold in here. I ___ close the window.",
            "accepted": [
              "'ll",
              "will",
              "Will"
            ]
          },
          {
            "id": "en-d-will-going-r4",
            "type": "translate",
            "promptUk": "Перекладіть. Це намір, вирішений раніше.",
            "promptEn": "Translate. This is an intention decided earlier.",
            "source": "Ми збираємося переїхати наступного року.",
            "accepted": [
              "We are going to move next year",
              "We're going to move next year",
              "We are going to move house next year",
              "We're going to move house next year"
            ],
            "direction": "uk_en"
          },
          {
            "id": "en-d-will-going-e",
            "type": "explain",
            "promptUk": "Коли ви обираєте will, а коли going to? Згадайте рішення в моменті й хмари на небі.",
            "promptEn": "When do you choose will, and when going to? Mention a decision in the moment and clouds in the sky.",
            "keyIdeas": [
              {
                "labelUk": "will",
                "labelEn": "will",
                "anyOf": [
                  "will",
                  "i'll",
                  "decision",
                  "рішення",
                  "promise",
                  "обіцян"
                ]
              },
              {
                "labelUk": "going to",
                "labelEn": "going to",
                "anyOf": [
                  "going to",
                  "intention",
                  "намір",
                  "evidence",
                  "ознак",
                  "clouds",
                  "хмари"
                ]
              },
              {
                "labelUk": "без to після will",
                "labelEn": "no to after will",
                "anyOf": [
                  "will to",
                  "infinitive",
                  "інфінітив",
                  "help"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Will обираємо для рішення в моменті мовлення і для обіцянки, наприклад I'll get it. Going to — для наміру заздалегідь і для прогнозу за ознаками, коли видно хмари. Після will не ставлять to.",
            "sampleAnswerEn": "We choose will for a decision at the moment of speaking and for a promise, for example I'll get it. Going to is for a prior intention and for a prediction from evidence, when we can see clouds. There is no to after will."
          }
        ]
      },
      {
        "slug": "en-d-pres-fut",
        "titleUk": "Present Continuous для домовленостей",
        "titleEn": "Present Continuous for arrangements",
        "baseXp": 18,
        "difficulty": 2,
        "exercises": [
          {
            "id": "en-d-pres-fut-c",
            "type": "concept",
            "promptUk": "Що вже стоїть у календарі",
            "promptEn": "What is already in the calendar",
            "bodyUk": "Present Continuous може говорити про майбутнє, коли є конкретна домовленість: I'm meeting the dentist at three. We're flying to Warsaw on Monday. Зазвичай є час, місце або інша «точка в календарі». Це не просто бажання — це вже узгоджено (квиток, запис, зустріч у календарі).\n\nПорівняйте: I'm going to book a dentist (намір, ще не записався) і I'm seeing the dentist at three (запис уже є). I'm going to Warsaw someday — надто розмито для Continuous; потрібен going to або will. I'm living in Warsaw next year можливе, якщо переїзд уже організований.\n\nНе кажіть *I meeting her tomorrow (немає am). Не плутайте з чистим теперішнім процесом: I'm meeting her зараз, у цю хвилину, якщо вона вже в кімнаті — тоді це не майбутнє, і контекст має це показувати. Для розкладу транспорту й афіш — наступний урок (Present Simple).",
            "bodyEn": "Present Continuous can talk about the future when there is a concrete arrangement: I'm meeting the dentist at three. We're flying to Warsaw on Monday. There is usually a time, a place, or another “calendar point”. This is not just a wish — it is already agreed (a ticket, an appointment, a calendar event).\n\nCompare: I'm going to book a dentist (an intention; you have not booked yet) and I'm seeing the dentist at three (the appointment exists). I'm going to Warsaw someday is too vague for Continuous; use going to or will. I'm living in Warsaw next year is possible if the move is already organised.\n\nDo not say *I meeting her tomorrow (missing am). Do not confuse this with a true present process: I'm meeting her right now, this minute, if she is already in the room — then it is not future, and context should make that clear. For transport timetables and programmes, the next lesson (Present Simple) is the right tool.",
            "keyPointsUk": [
              "Present Continuous — конкретна домовленість із часом/місцем",
              "going to — намір без підтвердженого запису",
              "Потрібна форма am/is/are",
              "Розмиті someday-плани — не Continuous"
            ],
            "keyPointsEn": [
              "Present Continuous is a concrete arrangement with a time or place",
              "going to is an intention without a confirmed booking",
              "You still need am/is/are",
              "Vague someday-plans are not Continuous"
            ]
          },
          {
            "id": "en-d-pres-fut-r1",
            "type": "mcq",
            "promptUk": "Запис до стоматолога вже є на 15:00. Що природніше?",
            "promptEn": "The dentist appointment is already booked for 15:00. Which is more natural?",
            "options": [
              "I'm seeing the dentist at three.",
              "I will seeing the dentist at three.",
              "I seeing the dentist at three.",
              "I see the dentist at three every day — that is the only reading."
            ],
            "correctIndex": 0,
            "explanationUk": "Конкретна домовленість — Present Continuous: I'm seeing.",
            "explanationEn": "A concrete arrangement is Present Continuous: I'm seeing."
          },
          {
            "id": "en-d-pres-fut-r2",
            "type": "fill_blank",
            "promptUk": "Вставте are або will.",
            "promptEn": "Insert are or will.",
            "sentence": "We ___ flying to Warsaw on Monday — the tickets are booked.",
            "accepted": [
              "are",
              "Are"
            ]
          },
          {
            "id": "en-d-pres-fut-r3",
            "type": "mcq",
            "promptUk": "Намір ще без квитка й дати. Що краще?",
            "promptEn": "An intention still without a ticket or a date. What is better?",
            "options": [
              "I'm going to visit Warsaw someday.",
              "I'm visiting Warsaw someday.",
              "I visiting Warsaw someday.",
              "I will visiting Warsaw someday."
            ],
            "correctIndex": 0,
            "explanationUk": "Розмитий намір — going to, не Continuous.",
            "explanationEn": "A vague intention is going to, not Continuous."
          },
          {
            "id": "en-d-pres-fut-r4",
            "type": "translate",
            "promptUk": "Перекладіть як домовленість у календарі.",
            "promptEn": "Translate as a calendar arrangement.",
            "source": "Завтра о третій я зустрічаюся з Марією.",
            "accepted": [
              "I'm meeting Maria at three tomorrow",
              "I am meeting Maria at three tomorrow",
              "Tomorrow at three I'm meeting Maria",
              "Tomorrow at three I am meeting Maria",
              "I'm meeting Maria tomorrow at three",
              "I am meeting Maria tomorrow at three"
            ],
            "direction": "uk_en"
          },
          {
            "id": "en-d-pres-fut-e",
            "type": "explain",
            "promptUk": "Коли Present Continuous означає майбутнє? Чим це відрізняється від going to без запису в календарі?",
            "promptEn": "When does Present Continuous mean the future? How is that different from going to without a calendar booking?",
            "keyIdeas": [
              {
                "labelUk": "домовленість",
                "labelEn": "arrangement",
                "anyOf": [
                  "arrangement",
                  "домовлен",
                  "calendar",
                  "календар",
                  "meeting",
                  "booked"
                ]
              },
              {
                "labelUk": "час",
                "labelEn": "time",
                "anyOf": [
                  "three",
                  "monday",
                  "tomorrow",
                  "час",
                  "time"
                ]
              },
              {
                "labelUk": "going to",
                "labelEn": "going to",
                "anyOf": [
                  "going to",
                  "intention",
                  "намір",
                  "someday"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Present Continuous означає майбутнє, коли є конкретна домовленість у календарі, наприклад I'm meeting Maria at three. Going to описує намір, якщо запису чи квитка ще немає, наприклад I'm going to visit someday.",
            "sampleAnswerEn": "Present Continuous means the future when there is a concrete arrangement in the calendar, for example I'm meeting Maria at three. Going to describes an intention when there is not yet a booking or a ticket, for example I'm going to visit someday."
          }
        ]
      },
      {
        "slug": "en-d-timetable",
        "titleUk": "Present Simple для розкладу",
        "titleEn": "Present Simple for timetables",
        "baseXp": 18,
        "difficulty": 2,
        "exercises": [
          {
            "id": "en-d-timetable-c",
            "type": "concept",
            "promptUk": "Поїзди, літаки, афіші",
            "promptEn": "Trains, planes and programmes",
            "bodyUk": "Present Simple описує майбутнє, коли подія входить у розклад або програму, незалежна від вашого особистого рішення: The train leaves at 6.30. The film starts at eight. The conference opens on 12 May. Це «так написано в розкладі».\n\nПорівняйте: The train leaves at 6.30 (розклад) і I'm leaving at 6.30 (мій план / домовленість). We're going to leave around six (намір, ще не жорсткий). Для закладів: The supermarket closes at ten tonight — теж розклад.\n\nНе ставте Present Simple для особистих разових планів без ідеї розкладу: *I start the meeting tomorrow at two звучить як пункт програми; для зустрічі, яку ви самі організували, природніше I'm starting / We're starting the meeting at two. У підрядних часу знову present: I'll call you when the train arrives.",
            "bodyEn": "Present Simple describes the future when the event belongs to a timetable or programme, independent of your personal decision: The train leaves at 6.30. The film starts at eight. The conference opens on 12 May. This is “what the schedule says”.\n\nCompare: The train leaves at 6.30 (the timetable) and I'm leaving at 6.30 (my plan / arrangement). We're going to leave around six (an intention, not yet rigid). For places: The supermarket closes at ten tonight — also a schedule.\n\nDo not use Present Simple for a personal one-off plan with no timetable idea: *I start the meeting tomorrow at two sounds like an item on a programme; for a meeting you yourself organised, I'm starting / We're starting the meeting at two is more natural. In time clauses, use a present again: I'll call you when the train arrives.",
            "keyPointsUk": [
              "Present Simple — розклад, афіша, програма",
              "Особиста домовленість — частіше Continuous",
              "The train leaves vs I'm leaving — різні погляди",
              "Після when у майбутньому — present, не will"
            ],
            "keyPointsEn": [
              "Present Simple is a timetable, poster, or programme",
              "A personal arrangement is more often Continuous",
              "The train leaves vs I'm leaving are different views",
              "After when in the future, use a present, not will"
            ]
          },
          {
            "id": "en-d-timetable-r1",
            "type": "mcq",
            "promptUk": "Оберіть природне речення про розклад.",
            "promptEn": "Choose the natural timetable sentence.",
            "options": [
              "The train leaves at 6.30.",
              "The train is leave at 6.30.",
              "The train will leaving at 6.30 as the only timetable form.",
              "The train leaving at 6.30."
            ],
            "correctIndex": 0,
            "explanationUk": "Розклад — Present Simple: leaves.",
            "explanationEn": "A timetable takes Present Simple: leaves."
          },
          {
            "id": "en-d-timetable-r2",
            "type": "fill_blank",
            "promptUk": "Вставте starts або is starting (розклад сеансу).",
            "promptEn": "Insert starts or is starting (a screening timetable).",
            "sentence": "The film ___ at eight, according to the poster.",
            "accepted": [
              "starts",
              "Starts"
            ]
          },
          {
            "id": "en-d-timetable-r3",
            "type": "mcq",
            "promptUk": "Ви самі організували зустріч команди на 14:00. Що природніше?",
            "promptEn": "You yourself organised a team meeting for 14:00. Which is more natural?",
            "options": [
              "We're starting the meeting at two.",
              "The meeting start at two as if it were a public train.",
              "The meeting starting at two.",
              "We starting the meeting at two."
            ],
            "correctIndex": 0,
            "explanationUk": "Особиста домовленість — Continuous: we're starting.",
            "explanationEn": "A personal arrangement is Continuous: we're starting."
          },
          {
            "id": "en-d-timetable-r4",
            "type": "translate",
            "promptUk": "Перекладіть як пункт розкладу.",
            "promptEn": "Translate as a timetable fact.",
            "source": "Поїзд відправляється о пів на сьому.",
            "accepted": [
              "The train leaves at 6.30",
              "The train leaves at half past six",
              "The train leaves at 6:30",
              "The train departs at 6.30",
              "The train departs at half past six",
              "The train departs at 6:30"
            ],
            "direction": "uk_en"
          },
          {
            "id": "en-d-timetable-e",
            "type": "explain",
            "promptUk": "Коли майбутнє описують Present Simple? Чим The train leaves відрізняється від I'm leaving?",
            "promptEn": "When do we describe the future with Present Simple? How is The train leaves different from I'm leaving?",
            "keyIdeas": [
              {
                "labelUk": "розклад",
                "labelEn": "timetable",
                "anyOf": [
                  "timetable",
                  "розклад",
                  "train",
                  "поїзд",
                  "poster",
                  "афіш",
                  "programme"
                ]
              },
              {
                "labelUk": "leaves",
                "labelEn": "leaves",
                "anyOf": [
                  "leaves",
                  "starts",
                  "closes",
                  "simple"
                ]
              },
              {
                "labelUk": "особистий план",
                "labelEn": "personal plan",
                "anyOf": [
                  "i'm leaving",
                  "leaving",
                  "arrangement",
                  "домовлен",
                  "continuous"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Present Simple для майбутнього — це розклад і афіша, наприклад the train leaves at 6.30. I'm leaving — це вже особиста домовленість або план, не пункт публічного розкладу.",
            "sampleAnswerEn": "Present Simple for the future is a timetable or a poster, for example the train leaves at 6.30. I'm leaving is a personal arrangement or plan, not an item on a public timetable."
          }
        ]
      },
      {
        "slug": "en-d-fut-cont",
        "titleUk": "Future Continuous",
        "titleEn": "Future Continuous",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "en-d-fut-cont-c",
            "type": "concept",
            "promptUk": "will be + V-ing",
            "promptEn": "will be + V-ing",
            "bodyUk": "Future Continuous: will be + V-ing. This time tomorrow I'll be sitting on a train. Don't call at nine — I'll be having a meeting. Час показує, що в певний майбутній момент дія буде в процесі, або що дія — звичайна частина майбутнього відрізка.\n\nВвічливий відтінок: Will you be using the meeting room at three? звучить м'якше, ніж Will you use…?, бо питає про вже запланований процес, не про рішення зараз. I'll be seeing Tom tomorrow може означати «це вже в розкладі, я з ним перетнуся».\n\nНе ставте його замість простого will для одноразового рішення: *The phone is ringing. I'll be getting it — тут I'll get it. Станні дієслова рідко йдуть у Continuous: не *I'll be knowing the result. Для українськомовних форма нова, але логіка та сама, що в Past Continuous, лише про майбутнє.",
            "bodyEn": "Future Continuous is will be + V-ing. This time tomorrow I'll be sitting on a train. Don't call at nine — I'll be having a meeting. The tense shows that at a future moment the action will be in progress, or that the action is a normal part of a future period.\n\nThere is a polite flavour: Will you be using the meeting room at three? is softer than Will you use…?, because it asks about a process already expected, not about a decision now. I'll be seeing Tom tomorrow can mean “it's already in the plan; I will run into him”.\n\nDo not use it in place of plain will for a one-off decision: *The phone is ringing. I'll be getting it — here I'll get it is right. Stative verbs rarely take Continuous: not *I'll be knowing the result. For Ukrainian speakers the form is new, but the logic is the same as Past Continuous, only about the future.",
            "keyPointsUk": [
              "will be + V-ing: дія в процесі в майбутній момент",
              "Ввічливі питання про запланований процес",
              "Не замінює I'll get it у рішенні зараз",
              "Станні дієслова — майже ніколи"
            ],
            "keyPointsEn": [
              "will be + V-ing: an action in progress at a future moment",
              "Polite questions about an expected process",
              "It does not replace I'll get it for a decision now",
              "Stative verbs almost never take it"
            ]
          },
          {
            "id": "en-d-fut-cont-r1",
            "type": "mcq",
            "promptUk": "This time tomorrow I ___ on a train.",
            "promptEn": "This time tomorrow I ___ on a train.",
            "options": [
              "will be sitting",
              "will sitting",
              "am be sitting",
              "will to sit"
            ],
            "correctIndex": 0,
            "explanationUk": "will be sitting — процес у майбутній момент.",
            "explanationEn": "will be sitting is a process at a future moment."
          },
          {
            "id": "en-d-fut-cont-r2",
            "type": "fill_blank",
            "promptUk": "Вставте be або been.",
            "promptEn": "Insert be or been.",
            "sentence": "Don't call at nine — I will ___ having a meeting.",
            "accepted": [
              "be",
              "Be"
            ]
          },
          {
            "id": "en-d-fut-cont-r3",
            "type": "mcq",
            "promptUk": "Телефон дзвонить. Рішення зараз. Що правильно?",
            "promptEn": "The phone is ringing. A decision now. Which is right?",
            "options": [
              "I'll get it.",
              "I'll be getting it as the only natural choice.",
              "I will be get it.",
              "I be getting it."
            ],
            "correctIndex": 0,
            "explanationUk": "Рішення в моменті — I'll get it, не Future Continuous.",
            "explanationEn": "A decision in the moment is I'll get it, not Future Continuous."
          },
          {
            "id": "en-d-fut-cont-r4",
            "type": "translate",
            "promptUk": "Перекладіть Future Continuous.",
            "promptEn": "Translate with the Future Continuous.",
            "source": "Завтра о цій порі я буду сидіти в поїзді.",
            "accepted": [
              "This time tomorrow I'll be sitting on a train",
              "This time tomorrow I will be sitting on a train",
              "This time tomorrow I'll be sitting in a train",
              "This time tomorrow I will be sitting in a train",
              "Tomorrow at this time I'll be sitting on a train",
              "Tomorrow at this time I will be sitting on a train"
            ],
            "direction": "uk_en"
          },
          {
            "id": "en-d-fut-cont-e",
            "type": "explain",
            "promptUk": "Що описує Future Continuous і чому Will you be using the room? звучить ввічливіше? Коли його не ставити?",
            "promptEn": "What does Future Continuous describe, and why does Will you be using the room? sound more polite? When should you not use it?",
            "keyIdeas": [
              {
                "labelUk": "процес у майбутньому",
                "labelEn": "future process",
                "anyOf": [
                  "will be",
                  "ing",
                  "sitting",
                  "процес",
                  "tomorrow"
                ]
              },
              {
                "labelUk": "ввічливість",
                "labelEn": "politeness",
                "anyOf": [
                  "polite",
                  "ввічлив",
                  "using",
                  "room",
                  "will you be"
                ]
              },
              {
                "labelUk": "не рішення зараз",
                "labelEn": "not a now-decision",
                "anyOf": [
                  "i'll get",
                  "get it",
                  "рішення",
                  "decision"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Future Continuous має форму will be і дієслово з -ing і описує процес у майбутній момент, наприклад I'll be sitting on a train. Питання Will you be using the room звучить ввічливо, бо питає про очікуваний процес. Для рішення зараз кажемо I'll get it, не I'll be getting it.",
            "sampleAnswerEn": "Future Continuous is will be plus a verb with -ing and describes a process at a future moment, for example I'll be sitting on a train. Will you be using the room sounds polite because it asks about an expected process. For a decision now we say I'll get it, not I'll be getting it."
          }
        ]
      },
      {
        "slug": "en-d-fut-perf",
        "titleUk": "Future Perfect і Future Perfect Continuous",
        "titleEn": "Future Perfect and Future Perfect Continuous",
        "baseXp": 24,
        "difficulty": 4,
        "exercises": [
          {
            "id": "en-d-fut-perf-c",
            "type": "concept",
            "promptUk": "will have + V3 / will have been + V-ing",
            "promptEn": "will have + V3 / will have been + V-ing",
            "bodyUk": "Future Perfect: will have + третя форма. By six I will have finished the report. Він називає дію, яка вже буде завершена до певної майбутньої точки. Маркер by (до, не пізніше) — найвірніший друг цього часу: by Friday, by the time you arrive, by 2030.\n\nFuture Perfect Continuous: will have been + V-ing — тривалість до майбутньої точки: By June I will have been working here for five years. Наголос на стажі / процесі, не на «готовому файлі».\n\nДля українськомовних обидві форми звучать важко, бо ми часто скажемо просто «я закінчу до шостої». В англійській will finish at six — це момент закінчення близько шостої, а will have finished by six — «не пізніше шостої вже буде готово». Не плутайте by і until: until six може означати, що дія триває по шосту (I'll work until six). Після by the time в підрядному — present: By the time you arrive, I'll have left.",
            "bodyEn": "Future Perfect is will have + past participle. By six I will have finished the report. It names an action that will already be complete before a future point. The marker by (“not later than”) is this tense's best friend: by Friday, by the time you arrive, by 2030.\n\nFuture Perfect Continuous is will have been + V-ing — duration up to a future point: By June I will have been working here for five years. The focus is the length of service / the process, not a “finished file”.\n\nBoth forms feel heavy for Ukrainian speakers, because we often just say “I will finish by six”. In English, will finish at six is the finishing moment around six, while will have finished by six means “not later than six, it will already be done”. Do not confuse by and until: until six can mean the action continues up to six (I'll work until six). After by the time, the clause takes a present: By the time you arrive, I'll have left.",
            "keyPointsUk": [
              "will have + V3: вже буде готово до майбутньої точки",
              "Ключовий маркер — by (не пізніше)",
              "will have been + V-ing — стаж / тривалість до тієї точки",
              "by ≠ until; після by the time — present"
            ],
            "keyPointsEn": [
              "will have + V3: it will already be done by a future point",
              "The key marker is by (not later than)",
              "will have been + V-ing is duration up to that point",
              "by is not until; after by the time use a present"
            ]
          },
          {
            "id": "en-d-fut-perf-r1",
            "type": "mcq",
            "promptUk": "Оберіть правильне: By six I ___ the report.",
            "promptEn": "Choose the correct option: By six I ___ the report.",
            "options": [
              "will have finished",
              "will finished",
              "will have finish",
              "am having finished"
            ],
            "correctIndex": 0,
            "explanationUk": "До шостої вже буде готово — will have finished.",
            "explanationEn": "It will already be done by six — will have finished."
          },
          {
            "id": "en-d-fut-perf-r2",
            "type": "fill_blank",
            "promptUk": "Вставте by або until (потрібно «не пізніше»).",
            "promptEn": "Insert by or until (“not later than” is needed).",
            "sentence": "Please send the file ___ Friday.",
            "accepted": [
              "by",
              "By"
            ]
          },
          {
            "id": "en-d-fut-perf-r3",
            "type": "mcq",
            "promptUk": "Наголос на стажі до червня. Яка форма?",
            "promptEn": "The focus is length of service up to June. Which form?",
            "options": [
              "By June I will have been working here for five years.",
              "By June I will have working here for five years.",
              "By June I will been working here for five years.",
              "By June I work here since five years."
            ],
            "correctIndex": 0,
            "explanationUk": "Тривалість до майбутньої точки — will have been working.",
            "explanationEn": "Duration up to a future point is will have been working."
          },
          {
            "id": "en-d-fut-perf-r4",
            "type": "translate",
            "promptUk": "Перекладіть Future Perfect.",
            "promptEn": "Translate with the Future Perfect.",
            "source": "До шостої я вже закінчу звіт.",
            "accepted": [
              "By six I will have finished the report",
              "By six I'll have finished the report",
              "I will have finished the report by six",
              "I'll have finished the report by six",
              "By 6 I will have finished the report",
              "By 6 I'll have finished the report"
            ],
            "direction": "uk_en"
          },
          {
            "id": "en-d-fut-perf-e",
            "type": "explain",
            "promptUk": "Що означає Future Perfect і чому маркер by такий важливий? Чим will have finished відрізняється від I'll work until six?",
            "promptEn": "What does Future Perfect mean, and why is the marker by so important? How is will have finished different from I'll work until six?",
            "keyIdeas": [
              {
                "labelUk": "will have",
                "labelEn": "will have",
                "anyOf": [
                  "will have",
                  "finished",
                  "perfect"
                ]
              },
              {
                "labelUk": "by",
                "labelEn": "by",
                "anyOf": [
                  "by",
                  "friday",
                  "six",
                  "не пізніш",
                  "later"
                ]
              },
              {
                "labelUk": "until",
                "labelEn": "until",
                "anyOf": [
                  "until",
                  "триває",
                  "continue",
                  "work until"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Future Perfect має форму will have і третю форму дієслова і означає, що дія вже буде закінчена до майбутньої точки. Маркер by означає «не пізніше». I'll work until six описує тривання по шосту, а не готовий результат до шостої.",
            "sampleAnswerEn": "Future Perfect is will have plus a past participle and means the action will already be finished by a future point. The marker by means “not later than”. I'll work until six describes continuing up to six, not a finished result by six."
          }
        ]
      },
      {
        "slug": "en-deep-future-exam",
        "titleUk": "Контрольна: майбутні форми",
        "titleEn": "Exam: talking about the future",
        "baseXp": 30,
        "difficulty": 3,
        "isExam": true,
        "passThreshold": 0.7,
        "exercises": [
          {
            "id": "en-deep-future-exam-q1",
            "type": "mcq",
            "promptUk": "Телефон дзвонить. Що сказати?",
            "promptEn": "The phone is ringing. What do you say?",
            "options": [
              "I'll get it.",
              "I will to get it.",
              "I going get it.",
              "I'll be get it."
            ],
            "correctIndex": 0,
            "explanationUk": "Рішення зараз — I'll get it.",
            "explanationEn": "A decision now is I'll get it."
          },
          {
            "id": "en-deep-future-exam-q2",
            "type": "mcq",
            "promptUk": "Квитки вже куплені: виліт у понеділок. Що природніше?",
            "promptEn": "Tickets are already bought: you fly on Monday. Which is more natural?",
            "options": [
              "We're flying to Warsaw on Monday.",
              "We flying to Warsaw on Monday.",
              "We will flying to Warsaw on Monday.",
              "We going flying to Warsaw on Monday."
            ],
            "correctIndex": 0,
            "explanationUk": "Домовленість у календарі — Present Continuous.",
            "explanationEn": "A calendar arrangement is Present Continuous."
          },
          {
            "id": "en-deep-future-exam-q3",
            "type": "mcq",
            "promptUk": "Розклад: The film ___ at eight.",
            "promptEn": "Timetable: The film ___ at eight.",
            "options": [
              "starts",
              "is start",
              "starting",
              "will starting"
            ],
            "correctIndex": 0,
            "explanationUk": "Афіша / розклад — Present Simple: starts.",
            "explanationEn": "A poster / timetable is Present Simple: starts."
          },
          {
            "id": "en-deep-future-exam-q4",
            "type": "mcq",
            "promptUk": "This time tomorrow I ___ on a train.",
            "promptEn": "This time tomorrow I ___ on a train.",
            "options": [
              "will be sitting",
              "will sitting",
              "will be sit",
              "am be sitting"
            ],
            "correctIndex": 0,
            "explanationUk": "Процес у майбутній момент — will be sitting.",
            "explanationEn": "A process at a future moment is will be sitting."
          },
          {
            "id": "en-deep-future-exam-q5",
            "type": "fill_blank",
            "promptUk": "Вставте have або be.",
            "promptEn": "Insert have or be.",
            "sentence": "By six I will ___ finished the report.",
            "accepted": [
              "have",
              "Have"
            ]
          }
        ]
      }
    ]
  },
  {
    "slug": "en-deep-passive",
    "titleUk": "Пасивний стан",
    "titleEn": "The passive",
    "lessons": [
      {
        "slug": "en-d-pass-why",
        "titleUk": "Навіщо потрібен пасив",
        "titleEn": "Why English uses the passive",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "en-d-pass-why-c",
            "type": "concept",
            "promptUk": "be + Past Participle і фокус на дії",
            "promptEn": "be + past participle and a focus on the action",
            "bodyUk": "Пасив: форма be у потрібному часі + третя форма: The report is written, was written, has been written. Дієслово be несе час, V3 — саму дію. Українською пасив теж є («звіт написано», «звіт був написаний»), але англійська вживає його набагато частіше, особливо в новинах, науці, документації та IT: The bug was fixed. A new endpoint has been deployed.\n\nНавіщо: 1) виконавець невідомий або неважливий (My bike was stolen); 2) важливий об'єкт / результат, не той, хто зробив (The results were published yesterday); 3) ввічливість і пом'якшення (Mistakes were made — без прямого тикання пальцем); 4) зберігати ту саму тему в тексті (The server failed. It was restarted at noon).\n\nАктивний стан кращий, коли виконавець важливий і текст звучить природніше: Maria wrote the report — ясно і коротко. Не робіть пасив «для солідності» в кожному реченні: *The decision was made by me to be going — гірше, ніж I decided to go. Пасив існує не від усіх дієслів: happen, arrive, seem, have («мати») майже не пасивуються.",
            "bodyEn": "The passive is be in the right tense plus a past participle: The report is written, was written, has been written. Be carries the tense; the participle carries the action. Ukrainian also has a passive (“the report is written”), but English uses it much more often, especially in news, science, documentation, and IT: The bug was fixed. A new endpoint has been deployed.\n\nWhy: 1) the agent is unknown or unimportant (My bike was stolen); 2) the object or result matters more than who did it (The results were published yesterday); 3) politeness and softening (Mistakes were made — without pointing a finger); 4) keeping the same topic in a text (The server failed. It was restarted at noon).\n\nThe active is better when the agent matters and the sentence is more natural: Maria wrote the report is clear and short. Do not use the passive “to sound serious” in every sentence: *The decision was made by me to be going is worse than I decided to go. Not every verb has a natural passive: happen, arrive, seem, and have (“possess”) are almost never passivised.",
            "keyPointsUk": [
              "Форма: be (у потрібному часі) + V3",
              "Пасив — коли важливий об'єкт або виконавець невідомий",
              "Часто в новинах, документації, IT-статусах",
              "Не пасивувати все підряд і не всі дієслова"
            ],
            "keyPointsEn": [
              "Form: be (in the right tense) + past participle",
              "Use the passive when the object matters or the agent is unknown",
              "Common in news, documentation, and IT status updates",
              "Do not passivise every sentence or every verb"
            ]
          },
          {
            "id": "en-d-pass-why-r1",
            "type": "mcq",
            "promptUk": "Оберіть природний пасив.",
            "promptEn": "Choose the natural passive.",
            "options": [
              "The bug was fixed yesterday.",
              "The bug was fix yesterday.",
              "The bug were fixed yesterday.",
              "The bug was fixing yesterday as a finished result."
            ],
            "correctIndex": 0,
            "explanationUk": "was + fixed — Past Simple passive.",
            "explanationEn": "was + fixed is a Past Simple passive."
          },
          {
            "id": "en-d-pass-why-r2",
            "type": "fill_blank",
            "promptUk": "Вставте is або was (результат зараз: баг уже виправлений у тексті статусу).",
            "promptEn": "Insert is or was (a current result: the bug is already fixed in a status text).",
            "sentence": "The issue ___ documented in the ticket.",
            "accepted": [
              "is",
              "Is"
            ]
          },
          {
            "id": "en-d-pass-why-r3",
            "type": "mcq",
            "promptUk": "Коли активний стан кращий?",
            "promptEn": "When is the active better?",
            "options": [
              "Коли виконавець важливий і речення звучить природніше: Maria wrote the report.",
              "Завжди: пасив в англійській заборонений.",
              "Лише в заголовках новин.",
              "Коли ви не знаєте третьої форми."
            ],
            "correctIndex": 0,
            "explanationUk": "Якщо важлива Марія як автор — активний стан ясніший.",
            "explanationEn": "If Maria as the author matters, the active is clearer.",
            "optionsEn": [
              "When the agent matters and the sentence sounds more natural: Maria wrote the report.",
              "Always: the passive is banned in English.",
              "Only in news headlines.",
              "When you do not know the past participle."
            ]
          },
          {
            "id": "en-d-pass-why-r4",
            "type": "translate",
            "promptUk": "Перекладіть пасивом (виконавець неважливий).",
            "promptEn": "Translate in the passive (the agent is unimportant).",
            "source": "Мій велосипед украли.",
            "accepted": [
              "My bike was stolen",
              "My bicycle was stolen",
              "My bike has been stolen",
              "My bicycle has been stolen"
            ],
            "direction": "uk_en"
          },
          {
            "id": "en-d-pass-why-e",
            "type": "explain",
            "promptUk": "Як утворюється пасив і в яких ситуаціях він доречніший за активний стан?",
            "promptEn": "How is the passive formed, and in which situations is it more appropriate than the active?",
            "keyIdeas": [
              {
                "labelUk": "форма",
                "labelEn": "form",
                "anyOf": [
                  "be",
                  "participle",
                  "v3",
                  "третя",
                  "was"
                ]
              },
              {
                "labelUk": "виконавець",
                "labelEn": "agent",
                "anyOf": [
                  "unknown",
                  "невідом",
                  "unimportant",
                  "неважлив",
                  "agent",
                  "виконав"
                ]
              },
              {
                "labelUk": "об'єкт",
                "labelEn": "object",
                "anyOf": [
                  "result",
                  "результат",
                  "bug",
                  "published",
                  "fixed"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Пасив утворюється з be у потрібному часі і третьої форми дієслова, наприклад the bug was fixed. Він доречний, коли виконавець невідомий або неважливий, а важливий об'єкт чи результат.",
            "sampleAnswerEn": "The passive is formed with be in the right tense and a past participle, for example the bug was fixed. It is appropriate when the agent is unknown or unimportant, and the object or result matters."
          }
        ]
      },
      {
        "slug": "en-d-pass-tenses",
        "titleUk": "Пасив у різних часах",
        "titleEn": "The passive across tenses",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "en-d-pass-tenses-c",
            "type": "concept",
            "promptUk": "Як міняється лише be",
            "promptEn": "Only be changes",
            "bodyUk": "У пасиві міняється форма be, а V3 залишається. Present Simple: The mail is delivered at ten. Present Continuous: The mail is being delivered now (is/are being + V3). Past Simple: was/were delivered. Past Continuous: was/were being delivered. Present Perfect: has/have been delivered. Past Perfect: had been delivered. Future: will be delivered. Модальні: can be delivered, must be checked, should have been fixed.\n\nЗверніть увагу на being і been: being — процес (is being updated), been — перфект (has been updated). Типова помилка: *The file is been updated і *The file has being updated. Ще одна: пропуск be (*The file updated yesterday у значенні пасиву — це виглядає як актив без підмета-виконавця).\n\nНе всі часи однаково часті: Future Continuous passive (will be being) звучить важко і його майже не вживають. Present Perfect Continuous passive теж рідкісний. Обирайте найпростіший час, який передає зміст: The server is being rebooted зараз; The server has been rebooted — уже перезавантажений.",
            "bodyEn": "In the passive, the form of be changes and the participle stays the same. Present Simple: The mail is delivered at ten. Present Continuous: The mail is being delivered now (is/are being + V3). Past Simple: was/were delivered. Past Continuous: was/were being delivered. Present Perfect: has/have been delivered. Past Perfect: had been delivered. Future: will be delivered. With modals: can be delivered, must be checked, should have been fixed.\n\nWatch being versus been: being is a process (is being updated), been is perfect (has been updated). A typical mistake is *The file is been updated and *The file has being updated. Another is dropping be (*The file updated yesterday meant as a passive — it looks like an active with no agent).\n\nNot every tense is equally common: a Future Continuous passive (will be being) is heavy and almost unused. A Present Perfect Continuous passive is also rare. Choose the simplest tense that carries the meaning: The server is being rebooted for right now; The server has been rebooted — it is already back up.",
            "keyPointsUk": [
              "Міняється be: is / is being / was / has been / will be / can be",
              "being — процес; been — перфект",
              "Не *is been і не *has being",
              "Важкі пасиви (will be being) краще обходити"
            ],
            "keyPointsEn": [
              "Be changes: is / is being / was / has been / will be / can be",
              "being is a process; been is perfect",
              "Not *is been and not *has being",
              "Heavy passives (will be being) are better avoided"
            ]
          },
          {
            "id": "en-d-pass-tenses-r1",
            "type": "mcq",
            "promptUk": "Сервер саме зараз перезавантажують. Яка форма?",
            "promptEn": "The server is being rebooted right now. Which form?",
            "options": [
              "The server is being rebooted.",
              "The server is been rebooted.",
              "The server has being rebooted.",
              "The server being rebooted."
            ],
            "correctIndex": 0,
            "explanationUk": "Процес зараз — is being + V3.",
            "explanationEn": "A process now is is being + V3."
          },
          {
            "id": "en-d-pass-tenses-r2",
            "type": "fill_blank",
            "promptUk": "Вставте been або being.",
            "promptEn": "Insert been or being.",
            "sentence": "The endpoint has ___ deployed.",
            "accepted": [
              "been",
              "Been"
            ]
          },
          {
            "id": "en-d-pass-tenses-r3",
            "type": "mcq",
            "promptUk": "Оберіть правильний модальний пасив.",
            "promptEn": "Choose the correct modal passive.",
            "options": [
              "The password must be changed.",
              "The password must been changed.",
              "The password must being changed.",
              "The password must be change."
            ],
            "correctIndex": 0,
            "explanationUk": "must be + V3: must be changed.",
            "explanationEn": "must be + V3: must be changed."
          },
          {
            "id": "en-d-pass-tenses-r4",
            "type": "translate",
            "promptUk": "Перекладіть Present Perfect passive.",
            "promptEn": "Translate with a Present Perfect passive.",
            "source": "Новий ендпоінт уже задеплоїли.",
            "accepted": [
              "A new endpoint has been deployed",
              "The new endpoint has been deployed",
              "A new endpoint has already been deployed",
              "The new endpoint has already been deployed"
            ],
            "direction": "uk_en"
          },
          {
            "id": "en-d-pass-tenses-e",
            "type": "explain",
            "promptUk": "Що змінюється в пасиві в різних часах? Чим being відрізняється від been?",
            "promptEn": "What changes in the passive across tenses? How is being different from been?",
            "keyIdeas": [
              {
                "labelUk": "be",
                "labelEn": "be",
                "anyOf": [
                  "be",
                  "is",
                  "was",
                  "been",
                  "will be"
                ]
              },
              {
                "labelUk": "being",
                "labelEn": "being",
                "anyOf": [
                  "being",
                  "process",
                  "процес",
                  "now",
                  "зараз"
                ]
              },
              {
                "labelUk": "been",
                "labelEn": "been",
                "anyOf": [
                  "been",
                  "perfect",
                  "перфект",
                  "has been",
                  "deployed"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "У пасиві змінюється форма be, а третя форма залишається. Being показує процес, наприклад is being rebooted. Been входить до перфекта: has been deployed.",
            "sampleAnswerEn": "In the passive the form of be changes, and the past participle stays. Being shows a process, for example is being rebooted. Been belongs to the perfect: has been deployed."
          }
        ]
      },
      {
        "slug": "en-d-pass-agent",
        "titleUk": "Виконавець і прийменник by",
        "titleEn": "The agent and by",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "en-d-pass-agent-c",
            "type": "concept",
            "promptUk": "Коли згадувати, хто зробив",
            "promptEn": "When to mention who did it",
            "bodyUk": "Якщо виконавець потрібен, його ставлять після by: The report was written by Maria. The village was destroyed by a flood (тут «виконавець» — причина, не людина). Інструмент часто йде з with: The door was opened with a key; by — ближче до агенса (by the guard).\n\nВиконавця часто пропускають, якщо він очевидний, невідомий або неважливий: The streets are cleaned every morning (і так зрозуміло, що службою). Не додавайте by people, by someone без потреби — це шум. Натомість, коли ім'я чи організація важливі (автор, компанія, закон), by обов'язкове: This rule was introduced by the new regulation.\n\nПорядок слів: не ставте by-фразу між be і V3 (*was by Maria written). Типова калька з української — *The report written by Maria was у зайвому пасиві всередині. Якщо виконавців двоє і текст плутається, поверніться до активного стану.",
            "bodyEn": "If the agent is needed, it comes after by: The report was written by Maria. The village was destroyed by a flood (here the “agent” is a cause, not a person). An instrument often takes with: The door was opened with a key; by is closer to an agent (by the guard).\n\nThe agent is often omitted when it is obvious, unknown, or unimportant: The streets are cleaned every morning (we already understand it is the city service). Do not add by people or by someone without a reason — that is noise. When a name or organisation matters (an author, a company, a law), by is required: This rule was introduced by the new regulation.\n\nWord order: do not put the by-phrase between be and the participle (*was by Maria written). A typical Ukrainian calque is a clumsy extra passive. If two agents make the sentence confusing, switch back to the active.",
            "keyPointsUk": [
              "Виконавець — після by; інструмент часто with",
              "Пропускайте by people, якщо це порожній шум",
              "Коли ім'я важливе — by обов'язкове",
              "Не вставляти by між be і V3"
            ],
            "keyPointsEn": [
              "The agent comes after by; an instrument often takes with",
              "Drop by people when it is empty noise",
              "When a name matters, by is required",
              "Do not insert by between be and the participle"
            ]
          },
          {
            "id": "en-d-pass-agent-r1",
            "type": "mcq",
            "promptUk": "Оберіть правильне.",
            "promptEn": "Choose the correct option.",
            "options": [
              "The report was written by Maria.",
              "The report was by Maria written.",
              "The report written was by Maria been.",
              "The report was written with Maria as the author agent."
            ],
            "correctIndex": 0,
            "explanationUk": "by Maria після дієслова: was written by Maria.",
            "explanationEn": "by Maria comes after the verb: was written by Maria."
          },
          {
            "id": "en-d-pass-agent-r2",
            "type": "fill_blank",
            "promptUk": "Вставте by або with (інструмент).",
            "promptEn": "Insert by or with (an instrument).",
            "sentence": "The door was opened ___ a key.",
            "accepted": [
              "with",
              "With"
            ]
          },
          {
            "id": "en-d-pass-agent-r3",
            "type": "mcq",
            "promptUk": "Яке by зайве?",
            "promptEn": "Which by is unnecessary?",
            "options": [
              "The streets are cleaned every morning by people someone (empty).",
              "This rule was introduced by the new regulation.",
              "The novel was written by George Orwell.",
              "The village was destroyed by a flood."
            ],
            "correctIndex": 0,
            "explanationUk": "by people someone не додає інформації — це шум.",
            "explanationEn": "by people someone adds no information — it is noise."
          },
          {
            "id": "en-d-pass-agent-r4",
            "type": "translate",
            "promptUk": "Перекладіть пасивом і збережіть автора.",
            "promptEn": "Translate in the passive and keep the author.",
            "source": "Звіт написала Марія.",
            "accepted": [
              "The report was written by Maria",
              "The report was written by Maria."
            ],
            "direction": "uk_en"
          },
          {
            "id": "en-d-pass-agent-e",
            "type": "explain",
            "promptUk": "Коли в пасиві згадують виконавця з by, а коли його пропускають? Чим by відрізняється від with?",
            "promptEn": "When does a passive mention the agent with by, and when is the agent left out? How is by different from with?",
            "keyIdeas": [
              {
                "labelUk": "by",
                "labelEn": "by",
                "anyOf": [
                  "by",
                  "maria",
                  "agent",
                  "виконав",
                  "author"
                ]
              },
              {
                "labelUk": "пропуск",
                "labelEn": "omission",
                "anyOf": [
                  "omit",
                  "пропуск",
                  "obvious",
                  "очевид",
                  "unknown",
                  "невідом"
                ]
              },
              {
                "labelUk": "with",
                "labelEn": "with",
                "anyOf": [
                  "with",
                  "key",
                  "instrument",
                  "інструмент"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Виконавця ставлять після by, коли ім'я важливе, наприклад written by Maria. Його пропускають, коли він очевидний або неважливий. Інструмент часто йде з with, як with a key.",
            "sampleAnswerEn": "We put the agent after by when the name matters, for example written by Maria. We omit it when it is obvious or unimportant. An instrument often takes with, as in with a key."
          }
        ]
      },
      {
        "slug": "en-d-pass-impersonal",
        "titleUk": "Impersonal: it is said, they say",
        "titleEn": "Impersonal: it is said, they say",
        "baseXp": 24,
        "difficulty": 4,
        "exercises": [
          {
            "id": "en-d-pass-impersonal-c",
            "type": "concept",
            "promptUk": "Відстань від джерела",
            "promptEn": "Distance from the source",
            "bodyUk": "Щоб повідомити думку чи чутки без конкретного автора, англійська любить безособовий пасив: It is said that the API will change. It is believed that the cause is a race condition. It has been reported that… Це стилістично близько до «кажуть, що», «вважають, що».\n\nДва шаблони: 1) It + be + V3 + that-clause: It is expected that the release will slip. 2) Підмет-людина + be + V3 + to-infinitive: She is said to be the best candidate. The server is known to fail under load. Другий шаблон часто коротший і природніший у новинах.\n\nThey say / people say — розмовніший активний варіант. Не мішайте: *It is said the API will change without that можливе в мовленні, але в письмі that допомагає. Типова помилка: *It says that the API will change у значенні «кажуть» — it says потребує конкретного тексту (The docs say that…). Для формального звіту пасив it is recommended that… звучить стандартно.",
            "bodyEn": "To report an opinion or a rumour without a named author, English likes an impersonal passive: It is said that the API will change. It is believed that the cause is a race condition. It has been reported that… Stylistically this is close to “they say that”, “it is thought that”.\n\nTwo patterns: 1) It + be + V3 + that-clause: It is expected that the release will slip. 2) A person or thing as subject + be + V3 + to-infinitive: She is said to be the best candidate. The server is known to fail under load. The second pattern is often shorter and more natural in news.\n\nThey say / people say is a more conversational active option. Do not mix forms: *It is said the API will change without that is possible in speech, but in writing that helps. A typical mistake is *It says that the API will change meaning “people say” — it says needs a concrete text (The docs say that…). In a formal report, the passive it is recommended that… is standard.",
            "keyPointsUk": [
              "It is said/believed/expected that… — безособова думка",
              "She is said to be… — коротший шаблон з to",
              "they say — розмовніший актив",
              "it says потребує конкретного тексту, не «кажуть»"
            ],
            "keyPointsEn": [
              "It is said/believed/expected that… is an impersonal opinion",
              "She is said to be… is a shorter pattern with to",
              "they say is a more conversational active",
              "it says needs a concrete text, not “people say”"
            ]
          },
          {
            "id": "en-d-pass-impersonal-r1",
            "type": "mcq",
            "promptUk": "Оберіть природний безособовий пасив.",
            "promptEn": "Choose the natural impersonal passive.",
            "options": [
              "It is said that the API will change.",
              "It says that the API will change (meaning “people say”, with no document).",
              "It is say that the API will change.",
              "It said to the API will change."
            ],
            "correctIndex": 0,
            "explanationUk": "It is said that — стандартний безособовий шаблон.",
            "explanationEn": "It is said that is the standard impersonal pattern."
          },
          {
            "id": "en-d-pass-impersonal-r2",
            "type": "fill_blank",
            "promptUk": "Вставте to або that (шаблон з підметом-людиною).",
            "promptEn": "Insert to or that (the pattern with a person as subject).",
            "sentence": "She is said ___ be the best candidate.",
            "accepted": [
              "to",
              "To"
            ]
          },
          {
            "id": "en-d-pass-impersonal-r3",
            "type": "mcq",
            "promptUk": "The docs ___ that we must rotate keys. Що правильно, якщо є конкретний текст?",
            "promptEn": "The docs ___ that we must rotate keys. What is right when there is a concrete text?",
            "options": [
              "say",
              "is said",
              "are said to saying",
              "is say"
            ],
            "correctIndex": 0,
            "explanationUk": "Конкретний документ — The docs say that…",
            "explanationEn": "A concrete document takes The docs say that…"
          },
          {
            "id": "en-d-pass-impersonal-r4",
            "type": "translate",
            "promptUk": "Перекладіть безособовим пасивом It is… that.",
            "promptEn": "Translate with the impersonal passive It is… that.",
            "source": "Кажуть, що реліз затримається.",
            "accepted": [
              "It is said that the release will be delayed",
              "It is said that the release will slip",
              "It is expected that the release will be delayed",
              "It is expected that the release will slip",
              "It is believed that the release will be delayed"
            ],
            "direction": "uk_en"
          },
          {
            "id": "en-d-pass-impersonal-e",
            "type": "explain",
            "promptUk": "Опишіть два шаблони безособового пасиву (it is said that і she is said to). Чим вони відрізняються від The docs say?",
            "promptEn": "Describe the two impersonal-passive patterns (it is said that and she is said to). How do they differ from The docs say?",
            "keyIdeas": [
              {
                "labelUk": "it is said that",
                "labelEn": "it is said that",
                "anyOf": [
                  "it is said",
                  "that",
                  "believed",
                  "expected"
                ]
              },
              {
                "labelUk": "said to",
                "labelEn": "said to",
                "anyOf": [
                  "said to",
                  "to be",
                  "known to"
                ]
              },
              {
                "labelUk": "docs say",
                "labelEn": "docs say",
                "anyOf": [
                  "docs",
                  "document",
                  "текст",
                  "say that"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Один шаблон — it is said that і підрядне речення. Другий — she is said to be, коротший інфінітив. The docs say вживають, коли є конкретний текст документа, а не безособове «кажуть».",
            "sampleAnswerEn": "One pattern is it is said that plus a clause. The second is she is said to be, a shorter infinitive. The docs say is used when there is a concrete document, not an impersonal “people say”."
          }
        ]
      },
      {
        "slug": "en-d-causative",
        "titleUk": "Causative: have/get something done",
        "titleEn": "Causative: have/get something done",
        "baseXp": 24,
        "difficulty": 4,
        "exercises": [
          {
            "id": "en-d-causative-c",
            "type": "concept",
            "promptUk": "Зробити так, щоб це зробили за вас",
            "promptEn": "Arranging for something to be done for you",
            "bodyUk": "Конструкція have + object + V3 означає, що ви організували послугу, а виконав її хтось інший: I had my laptop repaired (відніс у сервіс). She is having her hair cut tomorrow. I need to have this contract checked. Це не Past Perfect (had repaired як «сам уже відремонтував до того моменту»).\n\nget + object + V3 — схоже, часто розмовніше або з відтінком «вдалося / доклав зусиль»: I must get this fixed today. We got the server upgraded. У пасивному значенні I got my bag stolen — «у мене вкрали сумку» (неприємність, не замовлення послуги). Контекст розрізняє.\n\nТипові помилки: *I repaired my laptop у значенні «відніс у сервіс» (це звучить, ніби ви самі паяли); *I had repaired my laptop when you mean a service (це Past Perfect). Порядок: have/get + річ + V3, не *have repaired my laptop у цьому значенні без об'єкта на своєму місці. Для українськомовних орієнтир: «мені зробили / я зробив через сервіс» = have/get something done.",
            "bodyEn": "The pattern have + object + past participle means you arranged a service and someone else did the work: I had my laptop repaired (you took it to a shop). She is having her hair cut tomorrow. I need to have this contract checked. This is not Past Perfect (had repaired as “I myself had already repaired it before then”).\n\nget + object + V3 is similar, often more colloquial or with a flavour of “I managed / I made an effort”: I must get this fixed today. We got the server upgraded. In a passive sense, I got my bag stolen means “my bag was stolen” (a misfortune, not a booked service). Context tells them apart.\n\nTypical mistakes: *I repaired my laptop meaning “I took it to a shop” (that sounds as if you soldered it yourself); *I had repaired my laptop when you mean a service (that is Past Perfect). The order is have/get + thing + V3, not *have repaired my laptop in this meaning with the object in the wrong place. For Ukrainian speakers a useful test is: “it was done for me / I had it done via a service” = have/get something done.",
            "keyPointsUk": [
              "have + object + V3 — послуга, виконана іншим",
              "Це не Past Perfect had repaired",
              "get — розмовніше або «вдалося / довелося»",
              "got my bag stolen може бути неприємністю, не замовленням"
            ],
            "keyPointsEn": [
              "have + object + V3 is a service done by someone else",
              "This is not Past Perfect had repaired",
              "get is more colloquial, or “managed / had to”",
              "got my bag stolen can be a misfortune, not a booking"
            ]
          },
          {
            "id": "en-d-causative-r1",
            "type": "mcq",
            "promptUk": "Ви віднесли ноутбук у сервіс. Що сказати?",
            "promptEn": "You took the laptop to a repair shop. What do you say?",
            "options": [
              "I had my laptop repaired.",
              "I had repaired my laptop before noon (Past Perfect, I did it myself).",
              "I repaired my laptop, meaning a shop did it, with no causative.",
              "I had my laptop repairing."
            ],
            "correctIndex": 0,
            "explanationUk": "have + object + V3: had my laptop repaired.",
            "explanationEn": "have + object + V3: had my laptop repaired."
          },
          {
            "id": "en-d-causative-r2",
            "type": "fill_blank",
            "promptUk": "Вставте cut або cutting.",
            "promptEn": "Insert cut or cutting.",
            "sentence": "She is having her hair ___ tomorrow.",
            "accepted": [
              "cut",
              "Cut"
            ]
          },
          {
            "id": "en-d-causative-r3",
            "type": "mcq",
            "promptUk": "Яке речення — неприємність, не замовлена послуга?",
            "promptEn": "Which sentence is a misfortune, not a booked service?",
            "options": [
              "I got my bag stolen on the train.",
              "I had my hair cut at the salon I booked.",
              "I had the contract checked by a lawyer.",
              "We got the server upgraded on purpose."
            ],
            "correctIndex": 0,
            "explanationUk": "got my bag stolen — зі мною це сталося, я не замовляв крадіжку.",
            "explanationEn": "got my bag stolen is something that happened to me, not a service I booked."
          },
          {
            "id": "en-d-causative-r4",
            "type": "translate",
            "promptUk": "Перекладіть каузативом have something done.",
            "promptEn": "Translate with causative have something done.",
            "source": "Мені треба перевірити цей контракт (через юриста).",
            "accepted": [
              "I need to have this contract checked",
              "I need to have the contract checked",
              "I have to have this contract checked",
              "I have to have the contract checked",
              "I need to get this contract checked",
              "I need to get the contract checked"
            ],
            "direction": "uk_en"
          },
          {
            "id": "en-d-causative-e",
            "type": "explain",
            "promptUk": "Що означає have something done і чому це не Past Perfect? Коли get something done може означати неприємність?",
            "promptEn": "What does have something done mean, and why is it not Past Perfect? When can get something done mean a misfortune?",
            "keyIdeas": [
              {
                "labelUk": "послуга",
                "labelEn": "service",
                "anyOf": [
                  "have",
                  "repaired",
                  "service",
                  "послуг",
                  "shop",
                  "сервіс"
                ]
              },
              {
                "labelUk": "об'єкт + V3",
                "labelEn": "object + V3",
                "anyOf": [
                  "object",
                  "laptop",
                  "hair",
                  "contract",
                  "v3"
                ]
              },
              {
                "labelUk": "stolen",
                "labelEn": "stolen",
                "anyOf": [
                  "stolen",
                  "misfortune",
                  "неприєм",
                  "bag",
                  "got my"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Have something done означає, що послугу виконав хтось інший, наприклад I had my laptop repaired у сервісі. Це не Past Perfect, бо тут є об'єкт між had і третьою формою. Get my bag stolen описує неприємність, а не замовлену послугу.",
            "sampleAnswerEn": "Have something done means someone else performed a service, for example I had my laptop repaired at a shop. This is not Past Perfect, because an object sits between had and the participle. Get my bag stolen describes a misfortune, not a booked service."
          }
        ]
      },
      {
        "slug": "en-deep-passive-exam",
        "titleUk": "Контрольна: пасив і causative",
        "titleEn": "Exam: the passive and causative",
        "baseXp": 30,
        "difficulty": 4,
        "isExam": true,
        "passThreshold": 0.7,
        "exercises": [
          {
            "id": "en-deep-passive-exam-q1",
            "type": "mcq",
            "promptUk": "The bug ___ yesterday.",
            "promptEn": "The bug ___ yesterday.",
            "options": [
              "was fixed",
              "was fix",
              "were fixed",
              "is been fixed"
            ],
            "correctIndex": 0,
            "explanationUk": "Past Simple passive: was fixed.",
            "explanationEn": "Past Simple passive: was fixed."
          },
          {
            "id": "en-deep-passive-exam-q2",
            "type": "mcq",
            "promptUk": "Сервер саме зараз перезавантажують.",
            "promptEn": "The server is being rebooted right now.",
            "options": [
              "The server is being rebooted.",
              "The server is been rebooted.",
              "The server has being rebooted.",
              "The server being rebooted."
            ],
            "correctIndex": 0,
            "explanationUk": "Процес — is being rebooted.",
            "explanationEn": "A process is is being rebooted."
          },
          {
            "id": "en-deep-passive-exam-q3",
            "type": "mcq",
            "promptUk": "Оберіть правильне.",
            "promptEn": "Choose the correct option.",
            "options": [
              "The report was written by Maria.",
              "The report was by Maria written.",
              "The report written was by Maria.",
              "The report was written with Maria as a key instrument."
            ],
            "correctIndex": 0,
            "explanationUk": "by Maria після V3.",
            "explanationEn": "by Maria comes after the participle."
          },
          {
            "id": "en-deep-passive-exam-q4",
            "type": "mcq",
            "promptUk": "Безособовий шаблон:",
            "promptEn": "An impersonal pattern:",
            "options": [
              "It is said that the API will change.",
              "It says that the API will change, with no document, as “people say”.",
              "It is say that the API will change.",
              "It said the API to change."
            ],
            "correctIndex": 0,
            "explanationUk": "It is said that…",
            "explanationEn": "It is said that…"
          },
          {
            "id": "en-deep-passive-exam-q5",
            "type": "fill_blank",
            "promptUk": "Вставте repaired або repairing (каузатив: сервіс).",
            "promptEn": "Insert repaired or repairing (causative: a shop).",
            "sentence": "I had my laptop ___ last week.",
            "accepted": [
              "repaired",
              "Repaired"
            ]
          }
        ]
      }
    ]
  },
  {
    "slug": "en-deep-gerunds",
    "titleUk": "Герундій і інфінітив",
    "titleEn": "Gerunds and infinitives",
    "lessons": [
      {
        "slug": "en-d-verb-ing",
        "titleUk": "Дієслово + -ing",
        "titleEn": "Verb + -ing",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "en-d-verb-ing-c",
            "type": "concept",
            "promptUk": "Герундій після певних дієслів",
            "promptEn": "A gerund after certain verbs",
            "bodyUk": "Після низки дієслів англійська вимагає -ing, не to: enjoy, finish, avoid, consider, mind, suggest, keep, miss, practise, imagine, risk, admit, deny, involve, delay, give up, can't help. I enjoy learning English. She suggested taking a break. Would you mind closing the door? Не *I enjoy to learn і не *She suggested to take (хоча suggest that we take можливе).\n\nГерундій може бути підметом: Learning English takes time. Після прийменника завжди -ing: I'm good at explaining bugs. Thank you for coming. She's interested in joining the team. Це важливе правило: прийменник + V-ing, ніколи *interested to joining.\n\nДля українськомовних пастка — перекладати інфінітивом («люблю вчити»), бо в українській після «люблю» йде інфінітив. Складіть свій короткий список «-ing дієслів» і повторюйте його в реченнях, не окремими словами.",
            "bodyEn": "After a group of verbs English requires -ing, not to: enjoy, finish, avoid, consider, mind, suggest, keep, miss, practise, imagine, risk, admit, deny, involve, delay, give up, can't help. I enjoy learning English. She suggested taking a break. Would you mind closing the door? Not *I enjoy to learn, and not *She suggested to take (though suggest that we take is possible).\n\nA gerund can be a subject: Learning English takes time. After a preposition you always use -ing: I'm good at explaining bugs. Thank you for coming. She's interested in joining the team. This is a hard rule: preposition + V-ing, never *interested to joining.\n\nFor Ukrainian speakers the trap is translating with an infinitive (“I like to learn”), because Ukrainian often uses an infinitive after “like”. Make a short personal list of “-ing verbs” and recycle them in sentences, not as isolated words.",
            "keyPointsUk": [
              "enjoy, finish, avoid, mind, suggest, keep… + -ing",
              "Після прийменника завжди V-ing",
              "Герундій може бути підметом: Learning takes time",
              "Не *enjoy to learn, не *interested to joining"
            ],
            "keyPointsEn": [
              "enjoy, finish, avoid, mind, suggest, keep… take -ing",
              "After a preposition always use V-ing",
              "A gerund can be a subject: Learning takes time",
              "Not *enjoy to learn, not *interested to joining"
            ]
          },
          {
            "id": "en-d-verb-ing-r1",
            "type": "mcq",
            "promptUk": "Оберіть правильне.",
            "promptEn": "Choose the correct option.",
            "options": [
              "I enjoy learning English.",
              "I enjoy to learn English.",
              "I enjoy learn English.",
              "I enjoy to learning English."
            ],
            "correctIndex": 0,
            "explanationUk": "enjoy + -ing: enjoy learning.",
            "explanationEn": "enjoy + -ing: enjoy learning."
          },
          {
            "id": "en-d-verb-ing-r2",
            "type": "fill_blank",
            "promptUk": "Вставте форму close (одне слово).",
            "promptEn": "Insert a form of close (one word).",
            "sentence": "Would you mind ___ the door?",
            "accepted": [
              "closing",
              "Closing"
            ]
          },
          {
            "id": "en-d-verb-ing-r3",
            "type": "mcq",
            "promptUk": "Оберіть правильне після прийменника.",
            "promptEn": "Choose the correct form after a preposition.",
            "options": [
              "She's interested in joining the team.",
              "She's interested to joining the team.",
              "She's interested in join the team.",
              "She's interested for join the team."
            ],
            "correctIndex": 0,
            "explanationUk": "in — прийменник, тому joining.",
            "explanationEn": "in is a preposition, so joining."
          },
          {
            "id": "en-d-verb-ing-r4",
            "type": "translate",
            "promptUk": "Перекладіть, використавши suggest + -ing.",
            "promptEn": "Translate using suggest + -ing.",
            "source": "Вона запропонувала зробити перерву.",
            "accepted": [
              "She suggested taking a break",
              "She suggested having a break",
              "She suggested taking a rest"
            ],
            "direction": "uk_en"
          },
          {
            "id": "en-d-verb-ing-e",
            "type": "explain",
            "promptUk": "Після яких дієслів потрібне -ing і яке правило діє після прийменника?",
            "promptEn": "After which verbs do we need -ing, and what is the rule after a preposition?",
            "keyIdeas": [
              {
                "labelUk": "enjoy/suggest",
                "labelEn": "enjoy/suggest",
                "anyOf": [
                  "enjoy",
                  "suggest",
                  "mind",
                  "avoid",
                  "finish"
                ]
              },
              {
                "labelUk": "-ing",
                "labelEn": "-ing",
                "anyOf": [
                  "ing",
                  "learning",
                  "taking",
                  "closing",
                  "герундій",
                  "gerund"
                ]
              },
              {
                "labelUk": "прийменник",
                "labelEn": "preposition",
                "anyOf": [
                  "preposition",
                  "прийменник",
                  "in joining",
                  "at",
                  "for"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Після enjoy, suggest, mind, avoid і подібних дієслів потрібне -ing, наприклад I enjoy learning. Після прийменника завжди герундій: interested in joining, не to joining.",
            "sampleAnswerEn": "After enjoy, suggest, mind, avoid and similar verbs we need -ing, for example I enjoy learning. After a preposition we always use a gerund: interested in joining, not to joining."
          }
        ]
      },
      {
        "slug": "en-d-verb-to",
        "titleUk": "Дієслово + to-infinitive",
        "titleEn": "Verb + to-infinitive",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "en-d-verb-to-c",
            "type": "concept",
            "promptUk": "want, decide, hope, plan…",
            "promptEn": "want, decide, hope, plan…",
            "bodyUk": "Інша велика група бере to + інфінітив: want, need, decide, hope, plan, expect, promise, refuse, offer, agree, learn, afford, manage, fail, pretend, seem, tend, would like. I decided to leave. She hopes to join the team. We can't afford to wait. Не *decided leaving і не *want go (пропущений to).\n\nПісля would like / would love / would prefer — теж to: I'd like to ask a question. Після make і let — голий інфінітив без to: They made me wait. Let me explain. Після help можливі обидва: She helped me (to) install the tool.\n\nHelpful contrast: I want to finish (інфінітив) проти I finished writing (герундій). Список треба вчити з реченнями. Типова помилка українськомовних — *I want go, *I decided go, бо в українській «хочу піти» без окремого to.",
            "bodyEn": "Another large group takes to + infinitive: want, need, decide, hope, plan, expect, promise, refuse, offer, agree, learn, afford, manage, fail, pretend, seem, tend, would like. I decided to leave. She hopes to join the team. We can't afford to wait. Not *decided leaving and not *want go (missing to).\n\nAfter would like / would love / would prefer, also use to: I'd like to ask a question. After make and let, use a bare infinitive without to: They made me wait. Let me explain. After help both are possible: She helped me (to) install the tool.\n\nA useful contrast is I want to finish (infinitive) versus I finished writing (gerund). Learn the lists in sentences. A typical Ukrainian-speaker mistake is *I want go, *I decided go, because Ukrainian “I want to go” has no separate to.",
            "keyPointsUk": [
              "want, decide, hope, plan, promise, refuse, afford… + to",
              "would like + to; make/let + голий інфінітив",
              "help допускає (to) або без to",
              "Не *I want go, не *I decided leaving"
            ],
            "keyPointsEn": [
              "want, decide, hope, plan, promise, refuse, afford… take to",
              "would like takes to; make/let take a bare infinitive",
              "help allows (to) or no to",
              "Not *I want go, not *I decided leaving"
            ]
          },
          {
            "id": "en-d-verb-to-r1",
            "type": "mcq",
            "promptUk": "Оберіть правильне.",
            "promptEn": "Choose the correct option.",
            "options": [
              "I decided to leave.",
              "I decided leaving.",
              "I decided leave.",
              "I decided to leaving."
            ],
            "correctIndex": 0,
            "explanationUk": "decide + to-infinitive: decided to leave.",
            "explanationEn": "decide + to-infinitive: decided to leave."
          },
          {
            "id": "en-d-verb-to-r2",
            "type": "fill_blank",
            "promptUk": "Вставте to або нічого не підходить — потрібне одне слово to, якщо воно є.",
            "promptEn": "Insert to if it is required (one word).",
            "sentence": "I'd like ___ ask a question.",
            "accepted": [
              "to",
              "To"
            ]
          },
          {
            "id": "en-d-verb-to-r3",
            "type": "mcq",
            "promptUk": "Оберіть правильне після make.",
            "promptEn": "Choose the correct form after make.",
            "options": [
              "They made me wait.",
              "They made me to wait.",
              "They made me waiting.",
              "They made me to waiting."
            ],
            "correctIndex": 0,
            "explanationUk": "make + object + голий інфінітив: made me wait.",
            "explanationEn": "make + object + bare infinitive: made me wait."
          },
          {
            "id": "en-d-verb-to-r4",
            "type": "translate",
            "promptUk": "Перекладіть з hope + to.",
            "promptEn": "Translate with hope + to.",
            "source": "Вона сподівається приєднатися до команди.",
            "accepted": [
              "She hopes to join the team",
              "She hopes to join the team."
            ],
            "direction": "uk_en"
          },
          {
            "id": "en-d-verb-to-e",
            "type": "explain",
            "promptUk": "Наведіть кілька дієслів з to-infinitive і поясніть виняток make/let. Яка типова помилка I want go?",
            "promptEn": "Give a few verbs that take a to-infinitive and explain the make/let exception. What is the typical mistake in I want go?",
            "keyIdeas": [
              {
                "labelUk": "to",
                "labelEn": "to",
                "anyOf": [
                  "to",
                  "decide",
                  "hope",
                  "want",
                  "promise"
                ]
              },
              {
                "labelUk": "make/let",
                "labelEn": "make/let",
                "anyOf": [
                  "make",
                  "let",
                  "wait",
                  "bare",
                  "голий",
                  "without to"
                ]
              },
              {
                "labelUk": "want go",
                "labelEn": "want go",
                "anyOf": [
                  "want go",
                  "missing",
                  "пропущен",
                  "to go"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Дієслова на кшталт decide, hope, want і promise беруть to, наприклад I decided to leave. Після make і let інфінітив голий: they made me wait. Помилка I want go — це пропущений to.",
            "sampleAnswerEn": "Verbs such as decide, hope, want and promise take to, for example I decided to leave. After make and let the infinitive is bare: they made me wait. The mistake I want go is a missing to."
          }
        ]
      },
      {
        "slug": "en-d-meaning-change",
        "titleUk": "stop, remember, try, forget, regret",
        "titleEn": "stop, remember, try, forget, regret",
        "baseXp": 24,
        "difficulty": 4,
        "exercises": [
          {
            "id": "en-d-meaning-change-c",
            "type": "concept",
            "promptUk": "Одне дієслово — два значення",
            "promptEn": "One verb, two meanings",
            "bodyUk": "Деякі дієслова змінюють значення залежно від -ing чи to. stop doing — припинити саму дію: I stopped smoking. stop to do — зупинитися з іншою метою: I stopped to smoke (зупинився, щоб закурити). Це класична пара, яку плутають найчастіше.\n\nremember doing / forget doing — пам'ятати чи забути вже пережитий факт: I remember locking the door. I forgot meeting her last year. remember to do / forget to do — не забути виконати майбутнє або очікуване: Remember to lock the door. I forgot to send the email.\n\ntry doing — спробувати метод (можливо, інший): Try restarting the server. try to do — докласти зусилля, часто важко: I tried to restart it, but I had no access. regret doing — жалкувати про зроблене: I regret saying that. regret to do — формальне «з жалем повідомляю»: We regret to inform you… До цього ж ряду: go on doing (продовжувати те саме) проти go on to do (перейти до наступного).",
            "bodyEn": "Some verbs change meaning depending on -ing or to. stop doing means you end the activity itself: I stopped smoking. stop to do means you pause in order to do something else: I stopped to smoke (you stopped walking in order to have a cigarette). This is the pair people confuse most often.\n\nremember doing / forget doing is about a past experience already lived: I remember locking the door. I forgot meeting her last year. remember to do / forget to do is about not forgetting a future or expected action: Remember to lock the door. I forgot to send the email.\n\ntry doing is trying a method (perhaps another one): Try restarting the server. try to do is making an effort, often a hard one: I tried to restart it, but I had no access. regret doing is being sorry about something already done: I regret saying that. regret to do is a formal “I am sorry to say”: We regret to inform you… In the same family: go on doing (continue the same thing) versus go on to do (move on to the next thing).",
            "keyPointsUk": [
              "stop doing = припинити дію; stop to do = зупинитися, щоб…",
              "remember/forget + -ing — минулий факт; + to — не забути зробити",
              "try + -ing — метод; try to — зусилля",
              "regret doing — жаль про минуле; regret to inform — формальність"
            ],
            "keyPointsEn": [
              "stop doing = end the activity; stop to do = pause in order to…",
              "remember/forget + -ing is a past fact; + to is “don't forget to”",
              "try + -ing is a method; try to is an effort",
              "regret doing is sorrow about the past; regret to inform is formal"
            ]
          },
          {
            "id": "en-d-meaning-change-r1",
            "type": "mcq",
            "promptUk": "Людина кинула палити. Що правильно?",
            "promptEn": "Someone gave up smoking. Which is right?",
            "options": [
              "I stopped smoking.",
              "I stopped to smoke (I paused in order to have a cigarette).",
              "I stopped smoke.",
              "I stopped to smoking."
            ],
            "correctIndex": 0,
            "explanationUk": "Припинити саму звичку — stopped smoking.",
            "explanationEn": "Ending the habit itself is stopped smoking."
          },
          {
            "id": "en-d-meaning-change-r2",
            "type": "mcq",
            "promptUk": "Не забудьте зачинити двері (майбутня дія). Що сказати?",
            "promptEn": "Don't forget to lock the door (a future action). What do you say?",
            "options": [
              "Remember to lock the door.",
              "Remember locking the door (a memory of a past act).",
              "Remember lock the door.",
              "Remember to locking the door."
            ],
            "correctIndex": 0,
            "explanationUk": "Нагадування зробити — remember to lock.",
            "explanationEn": "A reminder to act is remember to lock."
          },
          {
            "id": "en-d-meaning-change-r3",
            "type": "fill_blank",
            "promptUk": "Вставте restarting або to restart (метод як порада).",
            "promptEn": "Insert restarting or to restart (a method as advice).",
            "sentence": "The app is frozen. Try ___ the server.",
            "accepted": [
              "restarting",
              "Restarting"
            ]
          },
          {
            "id": "en-d-meaning-change-r4",
            "type": "translate",
            "promptUk": "Перекладіть: забув надіслати (не виконав дію).",
            "promptEn": "Translate: forgot to send (did not do the action).",
            "source": "Я забув надіслати лист.",
            "accepted": [
              "I forgot to send the email",
              "I forgot to send the letter",
              "I forgot to send an email",
              "I forgot to send a letter"
            ],
            "direction": "uk_en"
          },
          {
            "id": "en-d-meaning-change-e",
            "type": "explain",
            "promptUk": "Поясніть різницю між stop doing і stop to do, а також між remember doing і remember to do.",
            "promptEn": "Explain the difference between stop doing and stop to do, and between remember doing and remember to do.",
            "keyIdeas": [
              {
                "labelUk": "stop doing",
                "labelEn": "stop doing",
                "anyOf": [
                  "stop smoking",
                  "stopped smoking",
                  "припинити",
                  "end"
                ]
              },
              {
                "labelUk": "stop to",
                "labelEn": "stop to",
                "anyOf": [
                  "stop to",
                  "in order",
                  "щоб",
                  "cigarette",
                  "закурит"
                ]
              },
              {
                "labelUk": "remember to",
                "labelEn": "remember to",
                "anyOf": [
                  "remember to",
                  "forget to",
                  "lock",
                  "send",
                  "reminder",
                  "нагад"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Stop smoking означає припинити саму дію. Stop to smoke — зупинитися, щоб закурити. Remember locking — пам'ять про минуле, а remember to lock — нагадування не забути зробити це.",
            "sampleAnswerEn": "Stop smoking means you end the activity itself. Stop to smoke means you pause in order to have a cigarette. Remember locking is a memory of the past, and remember to lock is a reminder not to forget to do it."
          }
        ]
      },
      {
        "slug": "en-d-adj-prep",
        "titleUk": "Прикметник + to і прийменник + -ing",
        "titleEn": "Adjective + to and preposition + -ing",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "en-d-adj-prep-c",
            "type": "concept",
            "promptUk": "happy to help, good at explaining",
            "promptEn": "happy to help, good at explaining",
            "bodyUk": "Багато прикметників беруть to-infinitive: happy, glad, pleased, ready, prepared, willing, easy, hard, difficult, important, possible, likely, surprised, disappointed. I'm happy to help. The ticket is easy to use. It's important to test this. It's likely to fail under load.\n\nЯкщо після прикметника стоїть прийменник, знову -ing: good at, interested in, afraid of, proud of, famous for, responsible for, keen on, tired of, used to. I'm good at explaining. She's afraid of flying. We're responsible for deploying this.\n\nIt's + adjective + to — дуже продуктивна схема: It's useful to write tests. Не *It's useful writing tests у цьому безособовому шаблоні (хоча Writing tests is useful — герундій-підмет — теж добре). Типова помилка: *I'm interested to join замість interested in joining; *I'm good to explain замість good at explaining.",
            "bodyEn": "Many adjectives take a to-infinitive: happy, glad, pleased, ready, prepared, willing, easy, hard, difficult, important, possible, likely, surprised, disappointed. I'm happy to help. The ticket is easy to use. It's important to test this. It's likely to fail under load.\n\nIf a preposition follows the adjective, use -ing again: good at, interested in, afraid of, proud of, famous for, responsible for, keen on, tired of, used to. I'm good at explaining. She's afraid of flying. We're responsible for deploying this.\n\nIt's + adjective + to is a very productive pattern: It's useful to write tests. *It's useful writing tests is unnatural in this impersonal pattern (though Writing tests is useful — a gerund subject — is also fine). Typical mistakes: *I'm interested to join instead of interested in joining; *I'm good to explain instead of good at explaining.",
            "keyPointsUk": [
              "happy/ready/easy/important/likely + to",
              "It's important to… — безособовий шаблон",
              "good at / interested in / afraid of / responsible for + -ing",
              "Не *interested to join, не *good to explain"
            ],
            "keyPointsEn": [
              "happy/ready/easy/important/likely take to",
              "It's important to… is an impersonal pattern",
              "good at / interested in / afraid of / responsible for take -ing",
              "Not *interested to join, not *good to explain"
            ]
          },
          {
            "id": "en-d-adj-prep-r1",
            "type": "mcq",
            "promptUk": "Оберіть правильне.",
            "promptEn": "Choose the correct option.",
            "options": [
              "I'm happy to help.",
              "I'm happy helping in this impersonal “I'd like to help” sense only, with no to.",
              "I'm happy to helping.",
              "I'm happy help."
            ],
            "correctIndex": 0,
            "explanationUk": "happy + to: happy to help.",
            "explanationEn": "happy + to: happy to help."
          },
          {
            "id": "en-d-adj-prep-r2",
            "type": "fill_blank",
            "promptUk": "Вставте at або to.",
            "promptEn": "Insert at or to.",
            "sentence": "I'm good ___ explaining bugs.",
            "accepted": [
              "at",
              "At"
            ]
          },
          {
            "id": "en-d-adj-prep-r3",
            "type": "mcq",
            "promptUk": "Оберіть правильне.",
            "promptEn": "Choose the correct option.",
            "options": [
              "She's interested in joining the team.",
              "She's interested to joining the team.",
              "She's interested to join in joining.",
              "She's interested for join the team."
            ],
            "correctIndex": 0,
            "explanationUk": "interested in + -ing.",
            "explanationEn": "interested in + -ing."
          },
          {
            "id": "en-d-adj-prep-r4",
            "type": "translate",
            "promptUk": "Перекладіть шаблоном It's important to…",
            "promptEn": "Translate with the pattern It's important to…",
            "source": "Важливо це протестувати.",
            "accepted": [
              "It's important to test this",
              "It is important to test this",
              "It's important to test it",
              "It is important to test it"
            ],
            "direction": "uk_en"
          },
          {
            "id": "en-d-adj-prep-e",
            "type": "explain",
            "promptUk": "Коли після прикметника стоїть to, а коли -ing? Наведіть happy to і good at.",
            "promptEn": "When does an adjective take to, and when -ing? Mention happy to and good at.",
            "keyIdeas": [
              {
                "labelUk": "happy to",
                "labelEn": "happy to",
                "anyOf": [
                  "happy to",
                  "to help",
                  "important to",
                  "ready to"
                ]
              },
              {
                "labelUk": "good at",
                "labelEn": "good at",
                "anyOf": [
                  "good at",
                  "at explaining",
                  "interested in",
                  "afraid of"
                ]
              },
              {
                "labelUk": "прийменник + ing",
                "labelEn": "preposition + ing",
                "anyOf": [
                  "preposition",
                  "прийменник",
                  "ing",
                  "joining"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Багато прикметників беруть to, наприклад I'm happy to help і it's important to test. Якщо є прийменник, потрібне -ing: good at explaining, interested in joining.",
            "sampleAnswerEn": "Many adjectives take to, for example I'm happy to help and it's important to test. If there is a preposition, we need -ing: good at explaining, interested in joining."
          }
        ]
      },
      {
        "slug": "en-d-purpose",
        "titleUk": "Мета: to, for, so that, in order to",
        "titleEn": "Purpose: to, for, so that, in order to",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "en-d-purpose-c",
            "type": "concept",
            "promptUk": "Навіщо ми це робимо",
            "promptEn": "Why we do something",
            "bodyUk": "Найкоротший спосіб назвати мету — to + інфінітив: I wrote a test to catch this bug. She went to the office to meet the client. Це не for + інфінітив: не *I wrote a test for catch / for to catch. for + іменник або герундій називає призначення речі: This tool is for testing APIs. A cup is for drinking, not *This tool is for to test.\n\nin order to і so as to — більш формальні синоніми to, часто в письмі: We reduced the payload in order to speed up the page. Заперечення мети: so as not to / in order not to wake the baby; не *to not завжди звучить рівно так само гладко.\n\nso that + підмет + can/could/will/would — коли в другої частини є свій підмет або модальне: I'll send the logs so that you can reproduce the bug. Українською всі ці варіанти часто «щоб». Обирайте to, якщо підмет той самий і структура коротка; so that — якщо з'являється новий підмет.",
            "bodyEn": "The shortest way to name a purpose is to + infinitive: I wrote a test to catch this bug. She went to the office to meet the client. This is not for + infinitive: not *I wrote a test for catch / for to catch. for + a noun or gerund names what a thing is for: This tool is for testing APIs. A cup is for drinking, not *This tool is for to test.\n\nin order to and so as to are more formal synonyms of to, often in writing: We reduced the payload in order to speed up the page. A negative purpose is so as not to / in order not to wake the baby; *to not is not always equally smooth.\n\nso that + subject + can/could/will/would is for when the second part has its own subject or a modal: I'll send the logs so that you can reproduce the bug. In Ukrainian all of these often sound like “shchob”. Choose to when the subject is the same and the structure is short; so that when a new subject appears.",
            "keyPointsUk": [
              "Мета дії: to + інфінітив (не *for to)",
              "for + іменник/-ing — призначення речі",
              "in order to — формальніше to",
              "so that + новий підмет + can/could"
            ],
            "keyPointsEn": [
              "Purpose of an action: to + infinitive (not *for to)",
              "for + noun/-ing is what a thing is for",
              "in order to is a more formal to",
              "so that + a new subject + can/could"
            ]
          },
          {
            "id": "en-d-purpose-r1",
            "type": "mcq",
            "promptUk": "Оберіть правильне.",
            "promptEn": "Choose the correct option.",
            "options": [
              "I wrote a test to catch this bug.",
              "I wrote a test for catch this bug.",
              "I wrote a test for to catch this bug.",
              "I wrote a test for catching this bug to catch."
            ],
            "correctIndex": 0,
            "explanationUk": "Мета дії — to catch, не for catch.",
            "explanationEn": "The purpose of the action is to catch, not for catch."
          },
          {
            "id": "en-d-purpose-r2",
            "type": "fill_blank",
            "promptUk": "Вставте for або to.",
            "promptEn": "Insert for or to.",
            "sentence": "This tool is ___ testing APIs.",
            "accepted": [
              "for",
              "For"
            ]
          },
          {
            "id": "en-d-purpose-r3",
            "type": "mcq",
            "promptUk": "Новий підмет у другій частині. Що природніше?",
            "promptEn": "A new subject appears in the second part. Which is more natural?",
            "options": [
              "I'll send the logs so that you can reproduce the bug.",
              "I'll send the logs to you can reproduce the bug.",
              "I'll send the logs for you reproduce the bug.",
              "I'll send the logs so that to you reproduce."
            ],
            "correctIndex": 0,
            "explanationUk": "Новий підмет you — so that you can…",
            "explanationEn": "A new subject you takes so that you can…"
          },
          {
            "id": "en-d-purpose-r4",
            "type": "translate",
            "promptUk": "Перекладіть коротким to + інфінітив.",
            "promptEn": "Translate with a short to + infinitive.",
            "source": "Вона пішла в офіс, щоб зустріти клієнта.",
            "accepted": [
              "She went to the office to meet the client",
              "She went to the office in order to meet the client"
            ],
            "direction": "uk_en"
          },
          {
            "id": "en-d-purpose-e",
            "type": "explain",
            "promptUk": "Як виразити мету через to і коли потрібні for або so that? Чому *for to catch — помилка?",
            "promptEn": "How do you express purpose with to, and when do you need for or so that? Why is *for to catch wrong?",
            "keyIdeas": [
              {
                "labelUk": "to + інфінітив",
                "labelEn": "to + infinitive",
                "anyOf": [
                  "to catch",
                  "to meet",
                  "purpose",
                  "мета"
                ]
              },
              {
                "labelUk": "for",
                "labelEn": "for",
                "anyOf": [
                  "for testing",
                  "for",
                  "noun",
                  "іменник",
                  "tool"
                ]
              },
              {
                "labelUk": "so that",
                "labelEn": "so that",
                "anyOf": [
                  "so that",
                  "can",
                  "you can",
                  "підмет",
                  "subject"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Мету дії найкоротше назвати через to і інфінітив, наприклад I wrote a test to catch this bug. For стоїть з іменником або -ing, коли це призначення речі: a tool for testing. So that потрібне, коли з'являється новий підмет: so that you can reproduce. For to catch — помилка.",
            "sampleAnswerEn": "The shortest way to name the purpose of an action is to plus an infinitive, for example I wrote a test to catch this bug. For takes a noun or -ing when it is what a thing is for: a tool for testing. So that is needed when a new subject appears: so that you can reproduce. For to catch is wrong."
          }
        ]
      },
      {
        "slug": "en-deep-gerunds-exam",
        "titleUk": "Контрольна: герундій і інфінітив",
        "titleEn": "Exam: gerunds and infinitives",
        "baseXp": 30,
        "difficulty": 4,
        "isExam": true,
        "passThreshold": 0.7,
        "exercises": [
          {
            "id": "en-deep-gerunds-exam-q1",
            "type": "mcq",
            "promptUk": "I ___ learning English.",
            "promptEn": "I ___ learning English.",
            "options": [
              "enjoy",
              "enjoy to",
              "enjoy to be",
              "want"
            ],
            "correctIndex": 0,
            "explanationUk": "Після enjoy потрібне -ing, тож дієслово enjoy підходить до learning.",
            "explanationEn": "enjoy + -ing, so enjoy is the right verb here."
          },
          {
            "id": "en-deep-gerunds-exam-q2",
            "type": "mcq",
            "promptUk": "I decided ___ leave.",
            "promptEn": "I decided ___ leave.",
            "options": [
              "to",
              "ing",
              "for",
              "at"
            ],
            "correctIndex": 0,
            "explanationUk": "decide + to leave.",
            "explanationEn": "decide + to leave."
          },
          {
            "id": "en-deep-gerunds-exam-q3",
            "type": "mcq",
            "promptUk": "Людина кинула палити:",
            "promptEn": "Someone gave up the habit:",
            "options": [
              "I stopped smoking.",
              "I stopped to smoke (paused to have a cigarette).",
              "I stopped smoke.",
              "I stopped to smoking."
            ],
            "correctIndex": 0,
            "explanationUk": "Припинити звичку — stopped smoking.",
            "explanationEn": "Ending the habit is stopped smoking."
          },
          {
            "id": "en-deep-gerunds-exam-q4",
            "type": "mcq",
            "promptUk": "She's interested ___ joining the team.",
            "promptEn": "She's interested ___ joining the team.",
            "options": [
              "in",
              "to",
              "for",
              "at"
            ],
            "correctIndex": 0,
            "explanationUk": "interested in + -ing.",
            "explanationEn": "interested in + -ing."
          },
          {
            "id": "en-deep-gerunds-exam-q5",
            "type": "fill_blank",
            "promptUk": "Вставте to або for (мета дії).",
            "promptEn": "Insert to or for (purpose of an action).",
            "sentence": "I wrote a test ___ catch this bug.",
            "accepted": [
              "to",
              "To"
            ]
          }
        ]
      }
    ]
  },
  {
    "slug": "en-deep-comparison",
    "titleUk": "Ступені порівняння",
    "titleEn": "Comparison and degree",
    "lessons": [
      {
        "slug": "en-d-comp-reg",
        "titleUk": "Регулярні ступені порівняння",
        "titleEn": "Regular comparatives and superlatives",
        "baseXp": 18,
        "difficulty": 2,
        "exercises": [
          {
            "id": "en-d-comp-reg-c",
            "type": "concept",
            "promptUk": "older, more careful, the oldest",
            "promptEn": "older, more careful, the oldest",
            "bodyUk": "Короткі прикметники (один склад, часто два на -y, -er, -ow, -le) утворюють вищий ступінь з -er, найвищий з -est: old — older — the oldest; nice — nicer — the nicest; happy — happier — the happiest (y → i). Довгі прикметники (два і більше складів, особливо на -ful, -ous, -ing, -ed) беруть more / the most: more careful, the most interesting.\n\nПісля вищого ступеня — than: She is older than me / than I am. Перед найвищим — the: the oldest person in the team. Типові помилки: *more older (подвійний ступінь), *the most tall, *older that me (потрібно than, не that). Українською «більш старший» калькується як *more older — цього треба уникати.\n\nПравопис: велика літера / короткий голосний + одна приголосна в кінці часто подвоюється: big — bigger; hot — hotter. Прикметники на -e лише додають -r/-st: large — larger. Не ставте the most з коротким прикметником, якщо нормальний варіант -est уже є (*the most old).",
            "bodyEn": "Short adjectives (one syllable, and often two syllables ending in -y, -er, -ow, -le) take -er in the comparative and -est in the superlative: old — older — the oldest; nice — nicer — the nicest; happy — happier — the happiest (y → i). Long adjectives (two or more syllables, especially those in -ful, -ous, -ing, -ed) take more / the most: more careful, the most interesting.\n\nAfter a comparative we use than: She is older than me / than I am. Before a superlative we use the: the oldest person in the team. Typical mistakes: *more older (a double comparative), *the most tall, *older that me (we need than, not that). Ukrainian “bilsh starshyi” calques as *more older — avoid it.\n\nSpelling: a stressed short vowel plus a final single consonant often doubles: big — bigger; hot — hotter. Adjectives ending in -e just add -r/-st: large — larger. Do not use the most with a short adjective that already has a normal -est form (*the most old).",
            "keyPointsUk": [
              "Короткі: -er / the -est; довгі: more / the most",
              "Після вищого ступеня — than, не that",
              "Не *more older: один показник ступеня",
              "happy → happier; big → bigger"
            ],
            "keyPointsEn": [
              "Short adjectives: -er / the -est; long ones: more / the most",
              "After a comparative use than, not that",
              "Not *more older: only one comparative marker",
              "happy → happier; big → bigger"
            ]
          },
          {
            "id": "en-d-comp-reg-r1",
            "type": "mcq",
            "promptUk": "Оберіть правильне.",
            "promptEn": "Choose the correct option.",
            "options": [
              "She is older than me.",
              "She is more older than me.",
              "She is older that me.",
              "She is the more old than me."
            ],
            "correctIndex": 0,
            "explanationUk": "Короткий old — older than, без more і не that.",
            "explanationEn": "Short old takes older than, without more and not that."
          },
          {
            "id": "en-d-comp-reg-r2",
            "type": "fill_blank",
            "promptUk": "Вставте careful у вищому ступені (два слова, якщо потрібно).",
            "promptEn": "Insert the comparative of careful (two words if needed).",
            "sentence": "Please be ___ with this deploy than last time.",
            "accepted": [
              "more careful",
              "More careful"
            ]
          },
          {
            "id": "en-d-comp-reg-r3",
            "type": "mcq",
            "promptUk": "Оберіть правильний найвищий ступінь.",
            "promptEn": "Choose the correct superlative.",
            "options": [
              "This is the most interesting talk today.",
              "This is the interestingest talk today.",
              "This is most interestingest talk today.",
              "This is the more interesting talk of all, with no the most."
            ],
            "correctIndex": 0,
            "explanationUk": "Довгий interesting — the most interesting.",
            "explanationEn": "Long interesting takes the most interesting."
          },
          {
            "id": "en-d-comp-reg-r4",
            "type": "translate",
            "promptUk": "Перекладіть.",
            "promptEn": "Translate.",
            "source": "Це найстаріший сервер у команді.",
            "accepted": [
              "This is the oldest server on the team",
              "This is the oldest server in the team",
              "It's the oldest server on the team",
              "It is the oldest server on the team",
              "This is the oldest server in our team"
            ],
            "direction": "uk_en"
          },
          {
            "id": "en-d-comp-reg-e",
            "type": "explain",
            "promptUk": "Як утворюють вищий і найвищий ступінь короткі та довгі прикметники? Чому *more older — помилка?",
            "promptEn": "How do short and long adjectives form the comparative and the superlative? Why is *more older wrong?",
            "keyIdeas": [
              {
                "labelUk": "-er/-est",
                "labelEn": "-er/-est",
                "anyOf": [
                  "older",
                  "oldest",
                  "-er",
                  "-est",
                  "short",
                  "коротк"
                ]
              },
              {
                "labelUk": "more/most",
                "labelEn": "more/most",
                "anyOf": [
                  "more",
                  "most",
                  "careful",
                  "interesting",
                  "long",
                  "довг"
                ]
              },
              {
                "labelUk": "than",
                "labelEn": "than",
                "anyOf": [
                  "than",
                  "that",
                  "more older"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Короткі прикметники беруть -er і the -est, наприклад older і the oldest. Довгі беруть more і the most, як more careful. More older — помилка, бо ступінь уже виражений через -er, а після порівняння стоїть than.",
            "sampleAnswerEn": "Short adjectives take -er and the -est, for example older and the oldest. Long adjectives take more and the most, as in more careful. More older is wrong because the comparative is already marked with -er, and after a comparative we use than."
          }
        ]
      },
      {
        "slug": "en-d-comp-irr",
        "titleUk": "Нерегулярні ступені: good, bad, far, little, much",
        "titleEn": "Irregular forms: good, bad, far, little, much",
        "baseXp": 18,
        "difficulty": 2,
        "exercises": [
          {
            "id": "en-d-comp-irr-c",
            "type": "concept",
            "promptUk": "better, worse, further, less, more",
            "promptEn": "better, worse, further, less, more",
            "bodyUk": "Кілька прикметників і прислівників мають особливі форми. good / well — better — the best. bad / badly — worse — the worst. far — farther/further — the farthest/furthest. little (кількість) — less — the least. much / many — more — the most.\n\nfarther часто про фізичну відстань (farther down the road), further — також «подальший, додатковий»: further questions, further information. У багатьох контекстах further універсальніше. old має older (загальне) і elder / eldest переважно для родини: my elder sister (але elder не ставлять з than у сучасному вжитку так само вільно, як older than).\n\nТипові помилки: *gooder, *badder, *more better, *the most worst. well як прислівник («добре») теж має better, не *more well: She speaks English better now. Менше + незлічуване: less time, less traffic; fewer — для злічуваних у старанному письмі: fewer bugs. У мовленні less bugs часто чути, але в тестах і акуратному письмі fewer bugs.",
            "bodyEn": "A few adjectives and adverbs have special forms. good / well — better — the best. bad / badly — worse — the worst. far — farther/further — the farthest/furthest. little (quantity) — less — the least. much / many — more — the most.\n\nfarther is often physical distance (farther down the road); further is also “additional”: further questions, further information. In many contexts further is the more general choice. old has older (general) and elder / eldest mainly for family: my elder sister (but elder is not used as freely with than as older than is).\n\nTypical mistakes: *gooder, *badder, *more better, *the most worst. well as an adverb (“in a good way”) also takes better, not *more well: She speaks English better now. For a smaller amount of an uncountable: less time, less traffic; fewer is for countables in careful writing: fewer bugs. In speech, less bugs is common, but tests and careful writing prefer fewer bugs.",
            "keyPointsUk": [
              "good → better → the best; bad → worse → the worst",
              "much/many → more; little → less → the least",
              "further — також «додатковий»; farther — часто відстань",
              "Не *more better; fewer bugs у старанному письмі"
            ],
            "keyPointsEn": [
              "good → better → the best; bad → worse → the worst",
              "much/many → more; little → less → the least",
              "further is also “additional”; farther is often distance",
              "Not *more better; fewer bugs in careful writing"
            ]
          },
          {
            "id": "en-d-comp-irr-r1",
            "type": "mcq",
            "promptUk": "Оберіть правильне.",
            "promptEn": "Choose the correct option.",
            "options": [
              "This solution is better than the last one.",
              "This solution is more better than the last one.",
              "This solution is gooder than the last one.",
              "This solution is the more best than the last one."
            ],
            "correctIndex": 0,
            "explanationUk": "good — better, без more.",
            "explanationEn": "good becomes better, without more."
          },
          {
            "id": "en-d-comp-irr-r2",
            "type": "fill_blank",
            "promptUk": "Вставте worse або worst (потрібен вищий ступінь).",
            "promptEn": "Insert worse or worst (a comparative is needed).",
            "sentence": "The second option is ___ than the first.",
            "accepted": [
              "worse",
              "Worse"
            ]
          },
          {
            "id": "en-d-comp-irr-r3",
            "type": "mcq",
            "promptUk": "Оберіть кращий варіант для акуратного письма: ___ bugs after the fix.",
            "promptEn": "Choose the better option for careful writing: ___ bugs after the fix.",
            "options": [
              "fewer",
              "less",
              "fewest than",
              "lesser"
            ],
            "correctIndex": 0,
            "explanationUk": "bugs — злічуване, у старанному письмі fewer.",
            "explanationEn": "bugs is countable; careful writing prefers fewer."
          },
          {
            "id": "en-d-comp-irr-r4",
            "type": "translate",
            "promptUk": "Перекладіть.",
            "promptEn": "Translate.",
            "source": "Це найкращий результат у команді.",
            "accepted": [
              "This is the best result on the team",
              "This is the best result in the team",
              "It's the best result on the team",
              "It is the best result on the team",
              "This is the best result in our team"
            ],
            "direction": "uk_en"
          },
          {
            "id": "en-d-comp-irr-e",
            "type": "explain",
            "promptUk": "Назвіть форми від good, bad і much. Чому *more better неправильно і коли fewer краще за less?",
            "promptEn": "Name the forms of good, bad and much. Why is *more better wrong, and when is fewer better than less?",
            "keyIdeas": [
              {
                "labelUk": "better/best",
                "labelEn": "better/best",
                "anyOf": [
                  "better",
                  "best",
                  "good"
                ]
              },
              {
                "labelUk": "worse/worst",
                "labelEn": "worse/worst",
                "anyOf": [
                  "worse",
                  "worst",
                  "bad"
                ]
              },
              {
                "labelUk": "fewer",
                "labelEn": "fewer",
                "anyOf": [
                  "fewer",
                  "less",
                  "bugs",
                  "countable",
                  "злічуван"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Good дає better і the best, bad — worse і the worst, much — more. More better неправильно, бо better уже є вищим ступенем. Fewer краще за less перед злічуваними, наприклад fewer bugs.",
            "sampleAnswerEn": "Good becomes better and the best, bad becomes worse and the worst, and much becomes more. More better is wrong because better is already a comparative. Fewer is better than less before countables, for example fewer bugs."
          }
        ]
      },
      {
        "slug": "en-d-as-as",
        "titleUk": "as…as, not as…as, the same as",
        "titleEn": "as…as, not as…as, the same as",
        "baseXp": 18,
        "difficulty": 2,
        "exercises": [
          {
            "id": "en-d-as-as-c",
            "type": "concept",
            "promptUk": "Рівність і нерівність без -er",
            "promptEn": "Equality and inequality without -er",
            "bodyUk": "Щоб сказати «такий самий … як», використовують as + adjective/adverb + as: This API is as fast as the old one. She works as hard as her teammate. У запереченні: not as…as або not so…as: This test is not as slow as I expected (не такий повільний, як я думав). Українською це часто «не такий … як», і калька *not so like — помилка.\n\nthe same as (не *the same like, не *the same that): Your idea is the same as mine. similar to — «схожий на»: This bug is similar to the last one. as much as / as many as — кількість: We don't have as many tests as we need.\n\nТипові помилки: *as faster as (ступінь уже в as…as, не треба -er); *as fast than; *the same like me. Для «вдвічі швидший» — twice as fast as, не *two times faster as. Половина: half as expensive as.",
            "bodyEn": "To say “equally …”, use as + adjective/adverb + as: This API is as fast as the old one. She works as hard as her teammate. In the negative: not as…as or not so…as: This test is not as slow as I expected. In Ukrainian this is often “not as … as”, and the calque *not so like is wrong.\n\nthe same as (not *the same like, not *the same that): Your idea is the same as mine. similar to means “alike”: This bug is similar to the last one. as much as / as many as is for quantity: We don't have as many tests as we need.\n\nTypical mistakes: *as faster as (the comparison is already in as…as, so no -er); *as fast than; *the same like me. For “twice as fast”, say twice as fast as, not *two times faster as. For a half: half as expensive as.",
            "keyPointsUk": [
              "Рівність: as + adj + as",
              "Заперечення: not as…as (не *as faster as)",
              "the same as, не *the same like",
              "twice as fast as — «вдвічі швидший»"
            ],
            "keyPointsEn": [
              "Equality: as + adj + as",
              "Negative: not as…as (not *as faster as)",
              "the same as, not *the same like",
              "twice as fast as means “two times the speed”"
            ]
          },
          {
            "id": "en-d-as-as-r1",
            "type": "mcq",
            "promptUk": "Оберіть правильне.",
            "promptEn": "Choose the correct option.",
            "options": [
              "This API is as fast as the old one.",
              "This API is as faster as the old one.",
              "This API is as fast than the old one.",
              "This API is so fast like the old one."
            ],
            "correctIndex": 0,
            "explanationUk": "Рівність — as fast as, без -er і не than.",
            "explanationEn": "Equality is as fast as, without -er and not than."
          },
          {
            "id": "en-d-as-as-r2",
            "type": "fill_blank",
            "promptUk": "Вставте as або like (потрібна рівність).",
            "promptEn": "Insert as or like (equality is needed).",
            "sentence": "Your idea is the same ___ mine.",
            "accepted": [
              "as",
              "As"
            ]
          },
          {
            "id": "en-d-as-as-r3",
            "type": "mcq",
            "promptUk": "«Вдвічі швидший»:",
            "promptEn": "“Twice as fast”:",
            "options": [
              "This version is twice as fast as the last one.",
              "This version is two times faster as the last one.",
              "This version is twice faster as the last one.",
              "This version is twice as faster than the last one."
            ],
            "correctIndex": 0,
            "explanationUk": "twice as fast as — стійка форма.",
            "explanationEn": "twice as fast as is the fixed pattern."
          },
          {
            "id": "en-d-as-as-r4",
            "type": "translate",
            "promptUk": "Перекладіть.",
            "promptEn": "Translate.",
            "source": "Цей тест не такий повільний, як я очікував.",
            "accepted": [
              "This test is not as slow as I expected",
              "This test is not so slow as I expected",
              "The test is not as slow as I expected",
              "The test is not so slow as I expected"
            ],
            "direction": "uk_en"
          },
          {
            "id": "en-d-as-as-e",
            "type": "explain",
            "promptUk": "Як працює as…as і чому не кажуть as faster as або the same like?",
            "promptEn": "How does as…as work, and why don't we say as faster as or the same like?",
            "keyIdeas": [
              {
                "labelUk": "as…as",
                "labelEn": "as…as",
                "anyOf": [
                  "as fast as",
                  "as…as",
                  "equality",
                  "рівн"
                ]
              },
              {
                "labelUk": "not as",
                "labelEn": "not as",
                "anyOf": [
                  "not as",
                  "not so",
                  "slow"
                ]
              },
              {
                "labelUk": "the same as",
                "labelEn": "the same as",
                "anyOf": [
                  "the same as",
                  "like",
                  "twice as"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Рівність виражають через as і прикметник і знову as, наприклад as fast as. As faster as неправильно, бо -er тут зайвий. Кажемо the same as, не the same like, і twice as fast as для «вдвічі швидший».",
            "sampleAnswerEn": "Equality is expressed with as plus an adjective plus as, for example as fast as. As faster as is wrong because the -er is extra. We say the same as, not the same like, and twice as fast as for “two times the speed”."
          }
        ]
      },
      {
        "slug": "en-d-too-enough",
        "titleUk": "too і enough",
        "titleEn": "too and enough",
        "baseXp": 18,
        "difficulty": 2,
        "exercises": [
          {
            "id": "en-d-too-enough-c",
            "type": "concept",
            "promptUk": "Надто важко, досить добре",
            "promptEn": "Too hard, good enough",
            "bodyUk": "too + adjective/adverb означає «надміру, більше ніж треба», часто з негативним наслідком: This task is too hard (ми не можемо її зробити). too стоїть ПЕРЕД прикметником. enough означає «достатньо» і стоїть ПІСЛЯ прикметника / прислівника: This task is hard enough already. She doesn't write clearly enough. Але enough ПЕРЕД іменником: We don't have enough time. enough people.\n\nШаблони з інфінітивом: too + adj + to do: The file is too large to upload. adj + enough + to do: The file is small enough to upload. Для українськомовних пастка — ставити enough перед прикметником, як «достатньо швидкий» → *enough fast замість fast enough.\n\ntoo much / too many — кількість: too much traffic, too many requests. Не плутайте too («надміру») з very («дуже», без ідеї «занадто для мети»): The film is very good — не проблема; The film is too long to watch tonight — є наслідок.",
            "bodyEn": "too + adjective/adverb means “more than is wanted”, often with a negative result: This task is too hard (we cannot do it). too stands BEFORE the adjective. enough means “sufficiently” and stands AFTER an adjective or adverb: This task is hard enough already. She doesn't write clearly enough. But enough stands BEFORE a noun: We don't have enough time. enough people.\n\nPatterns with an infinitive: too + adj + to do: The file is too large to upload. adj + enough + to do: The file is small enough to upload. For Ukrainian speakers the trap is putting enough before an adjective, like “dostatnio shvydkyi” → *enough fast instead of fast enough.\n\ntoo much / too many is for quantity: too much traffic, too many requests. Do not confuse too (“excess”) with very (“a high degree”, with no “too much for a purpose”): The film is very good is not a problem; The film is too long to watch tonight has a consequence.",
            "keyPointsUk": [
              "too + adj (перед): надміру, часто з наслідком",
              "adj + enough; enough + іменник",
              "too large to upload / small enough to upload",
              "too ≠ very; не *enough fast"
            ],
            "keyPointsEn": [
              "too + adj (before): excess, often with a result",
              "adj + enough; enough + noun",
              "too large to upload / small enough to upload",
              "too is not very; not *enough fast"
            ]
          },
          {
            "id": "en-d-too-enough-r1",
            "type": "mcq",
            "promptUk": "Оберіть правильне.",
            "promptEn": "Choose the correct option.",
            "options": [
              "The file is too large to upload.",
              "The file is enough large to upload.",
              "The file is too much large to upload.",
              "The file is large too to upload."
            ],
            "correctIndex": 0,
            "explanationUk": "too + adj + to: too large to upload.",
            "explanationEn": "too + adj + to: too large to upload."
          },
          {
            "id": "en-d-too-enough-r2",
            "type": "fill_blank",
            "promptUk": "Вставте enough у правильне місце — напишіть два слова: fast enough або enough fast.",
            "promptEn": "Insert enough in the right place — write two words: fast enough or enough fast.",
            "sentence": "This query is not ___ for the dashboard.",
            "accepted": [
              "fast enough",
              "Fast enough"
            ]
          },
          {
            "id": "en-d-too-enough-r3",
            "type": "mcq",
            "promptUk": "Оберіть правильне з іменником.",
            "promptEn": "Choose the correct option with a noun.",
            "options": [
              "We don't have enough time.",
              "We don't have time enough in careful standard use for this noun pattern.",
              "We don't have too time.",
              "We don't have enough of times people."
            ],
            "correctIndex": 0,
            "explanationUk": "enough перед іменником: enough time.",
            "explanationEn": "enough comes before a noun: enough time."
          },
          {
            "id": "en-d-too-enough-r4",
            "type": "translate",
            "promptUk": "Перекладіть.",
            "promptEn": "Translate.",
            "source": "Завдання надто складне, щоб закінчити його сьогодні.",
            "accepted": [
              "The task is too hard to finish today",
              "The task is too difficult to finish today",
              "This task is too hard to finish today",
              "This task is too difficult to finish today"
            ],
            "direction": "uk_en"
          },
          {
            "id": "en-d-too-enough-e",
            "type": "explain",
            "promptUk": "Де стоять too і enough? Чим too відрізняється від very? Наведіть too large to і fast enough.",
            "promptEn": "Where do too and enough stand? How is too different from very? Mention too large to and fast enough.",
            "keyIdeas": [
              {
                "labelUk": "too перед",
                "labelEn": "too before",
                "anyOf": [
                  "too",
                  "too large",
                  "before",
                  "перед"
                ]
              },
              {
                "labelUk": "enough після adj",
                "labelEn": "enough after adj",
                "anyOf": [
                  "enough",
                  "fast enough",
                  "after",
                  "після"
                ]
              },
              {
                "labelUk": "very",
                "labelEn": "very",
                "anyOf": [
                  "very",
                  "consequence",
                  "наслідок",
                  "excess",
                  "надмір"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Too стоїть перед прикметником, наприклад too large to upload, і означає надмір із наслідком. Enough після прикметника: fast enough, але перед іменником: enough time. Very лише підсилює, без ідеї «занадто для мети».",
            "sampleAnswerEn": "Too stands before an adjective, for example too large to upload, and means excess with a consequence. Enough comes after an adjective: fast enough, but before a noun: enough time. Very only strengthens, without the idea “too much for a purpose”."
          }
        ]
      },
      {
        "slug": "en-d-so-such",
        "titleUk": "so і such",
        "titleEn": "so and such",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "en-d-so-such-c",
            "type": "concept",
            "promptUk": "так важко / такий важкий день",
            "promptEn": "so hard / such a hard day",
            "bodyUk": "so + adjective/adverb: The task is so hard. She works so quickly. such + (прикметник) + іменник: It was such a hard day. They are such good colleagues. Артикль a/an стоїть після such: such a good idea, не *a such good idea. Без іменника such не ставлять замість so: не *The task is such hard.\n\nШаблони наслідку: so + adj + that: The file was so large that the upload failed. such a + adj + noun + that: It was such a large file that the upload failed. Розмовне so у значенні very: I'm so tired — нормально в мовленні.\n\nУкраїнське «такий» спокушає завжди ставити such, навіть перед голим прикметником (*such tired). Пам'ятайте: якщо далі немає іменника — so. Якщо є іменник — such (a). so much / so many — кількість: so much work, so many tickets. so + adjective, не *so much hard.",
            "bodyEn": "so + adjective/adverb: The task is so hard. She works so quickly. such + (adjective) + noun: It was such a hard day. They are such good colleagues. The article a/an comes after such: such a good idea, not *a such good idea. Without a noun, do not use such in place of so: not *The task is such hard.\n\nResult patterns: so + adj + that: The file was so large that the upload failed. such a + adj + noun + that: It was such a large file that the upload failed. Conversational so meaning very: I'm so tired is fine in speech.\n\nUkrainian “takyi” tempts learners to use such everywhere, even before a bare adjective (*such tired). Remember: if there is no noun after it, use so. If there is a noun, use such (a). so much / so many is for quantity: so much work, so many tickets. so + adjective, not *so much hard.",
            "keyPointsUk": [
              "so + прикметник/прислівник; such + (adj) + іменник",
              "such a good idea, не *a such good idea",
              "so/such … that — наслідок",
              "Не *such tired: без іменника — so"
            ],
            "keyPointsEn": [
              "so + adjective/adverb; such + (adj) + noun",
              "such a good idea, not *a such good idea",
              "so/such … that introduces a result",
              "Not *such tired: with no noun, use so"
            ]
          },
          {
            "id": "en-d-so-such-r1",
            "type": "mcq",
            "promptUk": "Оберіть правильне.",
            "promptEn": "Choose the correct option.",
            "options": [
              "It was such a hard day.",
              "It was a such hard day.",
              "It was so a hard day.",
              "It was such hard day without an article, for a singular countable."
            ],
            "correctIndex": 0,
            "explanationUk": "such a + adj + іменник: such a hard day.",
            "explanationEn": "such a + adj + noun: such a hard day."
          },
          {
            "id": "en-d-so-such-r2",
            "type": "fill_blank",
            "promptUk": "Вставте so або such.",
            "promptEn": "Insert so or such.",
            "sentence": "The task is ___ hard.",
            "accepted": [
              "so",
              "So"
            ]
          },
          {
            "id": "en-d-so-such-r3",
            "type": "mcq",
            "promptUk": "Оберіть правильний наслідок.",
            "promptEn": "Choose the correct result sentence.",
            "options": [
              "The file was so large that the upload failed.",
              "The file was such large that the upload failed.",
              "The file was so a large that the upload failed.",
              "The file was such large file that the upload failed."
            ],
            "correctIndex": 0,
            "explanationUk": "so + adj + that: so large that…",
            "explanationEn": "so + adj + that: so large that…"
          },
          {
            "id": "en-d-so-such-r4",
            "type": "translate",
            "promptUk": "Перекладіть із such.",
            "promptEn": "Translate with such.",
            "source": "Це така гарна ідея.",
            "accepted": [
              "It's such a good idea",
              "It is such a good idea",
              "This is such a good idea",
              "That's such a good idea",
              "That is such a good idea"
            ],
            "direction": "uk_en"
          },
          {
            "id": "en-d-so-such-e",
            "type": "explain",
            "promptUk": "Коли ставити so, а коли such? Де стоїть артикль a і як будувати so…that?",
            "promptEn": "When do you use so, and when such? Where does the article a go, and how do you build so…that?",
            "keyIdeas": [
              {
                "labelUk": "so + adj",
                "labelEn": "so + adj",
                "anyOf": [
                  "so",
                  "so hard",
                  "so large",
                  "adjective"
                ]
              },
              {
                "labelUk": "such a",
                "labelEn": "such a",
                "anyOf": [
                  "such a",
                  "such",
                  "noun",
                  "іменник",
                  "hard day"
                ]
              },
              {
                "labelUk": "that",
                "labelEn": "that",
                "anyOf": [
                  "that",
                  "result",
                  "наслідок",
                  "failed"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "So стоїть перед прикметником без іменника: the task is so hard. Such стоїть перед іменником, а артикль a йде після such: such a good idea. Наслідок будують як so large that the upload failed.",
            "sampleAnswerEn": "So stands before an adjective with no noun: the task is so hard. Such stands before a noun, and the article a comes after such: such a good idea. A result is built as so large that the upload failed."
          }
        ]
      },
      {
        "slug": "en-deep-comparison-exam",
        "titleUk": "Контрольна: порівняння і ступінь",
        "titleEn": "Exam: comparison and degree",
        "baseXp": 30,
        "difficulty": 3,
        "isExam": true,
        "passThreshold": 0.7,
        "exercises": [
          {
            "id": "en-deep-comparison-exam-q1",
            "type": "mcq",
            "promptUk": "She is ___ than me.",
            "promptEn": "She is ___ than me.",
            "options": [
              "older",
              "more older",
              "older that",
              "the more old"
            ],
            "correctIndex": 0,
            "explanationUk": "old — older than.",
            "explanationEn": "old becomes older than."
          },
          {
            "id": "en-deep-comparison-exam-q2",
            "type": "mcq",
            "promptUk": "This is ___ than the last idea.",
            "promptEn": "This is ___ than the last idea.",
            "options": [
              "better",
              "more better",
              "gooder",
              "the more best"
            ],
            "correctIndex": 0,
            "explanationUk": "good — better, без more.",
            "explanationEn": "good becomes better, without more."
          },
          {
            "id": "en-deep-comparison-exam-q3",
            "type": "mcq",
            "promptUk": "This API is ___ the old one.",
            "promptEn": "This API is ___ the old one.",
            "options": [
              "as fast as",
              "as faster as",
              "as fast than",
              "so fast like"
            ],
            "correctIndex": 0,
            "explanationUk": "Рівність — as fast as.",
            "explanationEn": "Equality is as fast as."
          },
          {
            "id": "en-deep-comparison-exam-q4",
            "type": "mcq",
            "promptUk": "The file is ___ to upload.",
            "promptEn": "The file is ___ to upload.",
            "options": [
              "too large",
              "enough large",
              "too much large",
              "large too"
            ],
            "correctIndex": 0,
            "explanationUk": "too + adj + to: too large to upload.",
            "explanationEn": "too + adj + to: too large to upload."
          },
          {
            "id": "en-deep-comparison-exam-q5",
            "type": "fill_blank",
            "promptUk": "Вставте so або such.",
            "promptEn": "Insert so or such.",
            "sentence": "It was ___ a hard day.",
            "accepted": [
              "such",
              "Such"
            ]
          }
        ]
      }
    ]
  },
  {
    "slug": "en-deep-modals-plus",
    "titleUk": "Модальні: минуле і відтінки",
    "titleEn": "Modals: past and nuance",
    "lessons": [
      {
        "slug": "en-d-mod-deduce",
        "titleUk": "must have, might have, can't have",
        "titleEn": "must have, might have, can't have",
        "baseXp": 24,
        "difficulty": 4,
        "exercises": [
          {
            "id": "en-d-mod-deduce-c",
            "type": "concept",
            "promptUk": "Ймовірність про минуле",
            "promptEn": "Probability about the past",
            "bodyUk": "Модальні з have + V3 оцінюють минуле, не обов'язок. must have + V3 — майже впевнена здогадка: The lights are off. They must have left. might/may have — можливо: She might have missed the train. could have в здогадці теж «можливо було», але could have done також означає невикористану можливість (You could have told me).\n\ncan't have / couldn't have — майже впевнене заперечення: He can't have forgotten — he's too reliable. Не *mustn't have у значенні «не може бути, що»: mustn't — це заборона, не здогадка. Українською «мабуть, уже пішли» легко перекласти як *must left без have — потрібне must have left.\n\nШкала: must have (≈90%+ упевненості), should have (очікувано, що так і було), might/may/could have (можливо), can't have (майже неможливо). Для теперішнього без have: She must be at home (зараз). Не плутайте з Past Perfect; тут have — частина модальної конструкції.",
            "bodyEn": "Modals with have + V3 evaluate the past; they are not about obligation. must have + V3 is a near-certain deduction: The lights are off. They must have left. might/may have is possibility: She might have missed the train. could have in a deduction also means “it is possible that it happened”, but could have done can also be a missed opportunity (You could have told me).\n\ncan't have / couldn't have is a near-certain negative deduction: He can't have forgotten — he's too reliable. Do not use *mustn't have to mean “it is impossible that”: mustn't is prohibition, not deduction. Ukrainian “maybe they already left” is easy to translate as *must left without have — you need must have left.\n\nA scale: must have (about 90%+ certainty), should have (it was expected to be so), might/may/could have (possible), can't have (almost impossible). For a present deduction without have: She must be at home (now). Do not confuse this with Past Perfect; here have is part of the modal structure.",
            "keyPointsUk": [
              "must have + V3 — майже впевнена здогадка про минуле",
              "might/may have — можливо; can't have — майже неможливо",
              "mustn't не означає «не може бути, що»",
              "Потрібне have: must have left, не *must left"
            ],
            "keyPointsEn": [
              "must have + V3 is a near-certain deduction about the past",
              "might/may have is possible; can't have is almost impossible",
              "mustn't does not mean “it can't be that”",
              "You need have: must have left, not *must left"
            ]
          },
          {
            "id": "en-d-mod-deduce-r1",
            "type": "mcq",
            "promptUk": "Світло погашене, людей немає. Здогадка:",
            "promptEn": "The lights are off; nobody is there. A deduction:",
            "options": [
              "They must have left.",
              "They must left.",
              "They mustn't have left, meaning “it is impossible that they left”, as a deduction.",
              "They must have leave."
            ],
            "correctIndex": 0,
            "explanationUk": "Майже впевнена здогадка — must have left.",
            "explanationEn": "A near-certain deduction is must have left."
          },
          {
            "id": "en-d-mod-deduce-r2",
            "type": "fill_blank",
            "promptUk": "Вставте have або be.",
            "promptEn": "Insert have or be.",
            "sentence": "She might ___ missed the train.",
            "accepted": [
              "have",
              "Have"
            ]
          },
          {
            "id": "en-d-mod-deduce-r3",
            "type": "mcq",
            "promptUk": "Майже впевнене заперечення: він надто надійний, щоб забути.",
            "promptEn": "A near-certain negative: he is too reliable to have forgotten.",
            "options": [
              "He can't have forgotten.",
              "He mustn't have forgotten, as a deduction equal to “impossible”.",
              "He can't forgotten.",
              "He can't has forgotten."
            ],
            "correctIndex": 0,
            "explanationUk": "can't have forgotten — здогадка-заперечення.",
            "explanationEn": "can't have forgotten is a negative deduction."
          },
          {
            "id": "en-d-mod-deduce-r4",
            "type": "translate",
            "promptUk": "Перекладіть здогадкою must have.",
            "promptEn": "Translate as a must-have deduction.",
            "source": "Вони, мабуть, уже пішли.",
            "accepted": [
              "They must have left",
              "They must have already left",
              "They must have gone",
              "They must have already gone"
            ],
            "direction": "uk_en"
          },
          {
            "id": "en-d-mod-deduce-e",
            "type": "explain",
            "promptUk": "Що означає must have left і can't have forgotten? Чому недостатньо сказати must left і чомуmustn't тут не підходить?",
            "promptEn": "What do must have left and can't have forgotten mean? Why is must left not enough, and why is mustn't the wrong choice here?",
            "keyIdeas": [
              {
                "labelUk": "must have",
                "labelEn": "must have",
                "anyOf": [
                  "must have",
                  "left",
                  "deduction",
                  "здогад",
                  "certainty"
                ]
              },
              {
                "labelUk": "can't have",
                "labelEn": "can't have",
                "anyOf": [
                  "can't have",
                  "forgotten",
                  "impossible",
                  "неможлив"
                ]
              },
              {
                "labelUk": "have",
                "labelEn": "have",
                "anyOf": [
                  "have",
                  "must left",
                  "mustn't"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Must have left — це майже впевнена здогадка про минуле, і слово have тут обов'язкове, не must left. Can't have forgotten — майже впевнене заперечення. Mustn't означає заборону, а не «не може бути, що».",
            "sampleAnswerEn": "Must have left is a near-certain deduction about the past, and have is required here, not must left. Can't have forgotten is a near-certain negative deduction. Mustn't means prohibition, not “it cannot be that”."
          }
        ]
      },
      {
        "slug": "en-d-mod-should-have",
        "titleUk": "should have, ought to have, could have",
        "titleEn": "should have, ought to have, could have",
        "baseXp": 24,
        "difficulty": 4,
        "exercises": [
          {
            "id": "en-d-mod-should-have-c",
            "type": "concept",
            "promptUk": "Докір і невикористана можливість",
            "promptEn": "Criticism and a missed opportunity",
            "bodyUk": "should have + V3 — щось було правильним або очікуваним, але (часто) не сталося: You should have written a test. I should have asked earlier. Це докір або жаль, не здогадка (здогадка — must have). ought to have — те саме, трохи формальніше.\n\ncould have + V3 — могла статися можливість, яку не використали: You could have told me. We could have caught the earlier train. Не плутайте з couldn't have (здогадка «не могло статись»). would have — нереальний наслідок у минулому (третій умовний): I would have helped if I had known.\n\nТипові помилки: *should had written; *You should have wrote (потрібна третя форма written). Українською «треба було» — should have, не *should + Past Simple. Тон: should have може звучати різко в команді; пом'якшення: It might have been better to… / Next time we could….",
            "bodyEn": "should have + V3 is something that was right or expected but (often) did not happen: You should have written a test. I should have asked earlier. This is criticism or regret, not a deduction (a deduction is must have). ought to have is the same, a little more formal.\n\ncould have + V3 is a possibility that was not used: You could have told me. We could have caught the earlier train. Do not confuse it with couldn't have (the deduction “that cannot have happened”). would have is an unreal past result (the third conditional): I would have helped if I had known.\n\nTypical mistakes: *should had written; *You should have wrote (you need the past participle written). Ukrainian “treba bulo” is should have, not *should + Past Simple. Tone: should have can sound sharp in a team; a softer version is It might have been better to… / Next time we could….",
            "keyPointsUk": [
              "should have + V3 — треба було, але (часто) не зробили",
              "could have — невикористана можливість",
              "would have — нереальний наслідок (3-й умовний)",
              "Третя форма: should have written, не *wrote"
            ],
            "keyPointsEn": [
              "should have + V3 is “it was the right thing, but often it didn't happen”",
              "could have is a missed opportunity",
              "would have is an unreal result (third conditional)",
              "Use a past participle: should have written, not *wrote"
            ]
          },
          {
            "id": "en-d-mod-should-have-r1",
            "type": "mcq",
            "promptUk": "Докір: тест не написали.",
            "promptEn": "Criticism: nobody wrote a test.",
            "options": [
              "You should have written a test.",
              "You should have wrote a test.",
              "You should had written a test.",
              "You should written a test."
            ],
            "correctIndex": 0,
            "explanationUk": "should have + written (V3).",
            "explanationEn": "should have + written (past participle)."
          },
          {
            "id": "en-d-mod-should-have-r2",
            "type": "fill_blank",
            "promptUk": "Вставте have або had.",
            "promptEn": "Insert have or had.",
            "sentence": "We could ___ caught the earlier train.",
            "accepted": [
              "have",
              "Have"
            ]
          },
          {
            "id": "en-d-mod-should-have-r3",
            "type": "mcq",
            "promptUk": "Нереальний наслідок: якби я знав, я б допоміг.",
            "promptEn": "An unreal result: if I had known, I would have helped.",
            "options": [
              "I would have helped if I had known.",
              "I should have helped if I would knew.",
              "I would helped if I had known.",
              "I would have help if I knew."
            ],
            "correctIndex": 0,
            "explanationUk": "would have helped — нереальний минулий наслідок.",
            "explanationEn": "would have helped is an unreal past result."
          },
          {
            "id": "en-d-mod-should-have-r4",
            "type": "translate",
            "promptUk": "Перекладіть через should have.",
            "promptEn": "Translate with should have.",
            "source": "Мені треба було запитати раніше.",
            "accepted": [
              "I should have asked earlier",
              "I should have asked sooner",
              "I ought to have asked earlier",
              "I ought to have asked sooner"
            ],
            "direction": "uk_en"
          },
          {
            "id": "en-d-mod-should-have-e",
            "type": "explain",
            "promptUk": "Чим should have відрізняється від must have? Що означає could have told me і яка форма дієслова після have?",
            "promptEn": "How is should have different from must have? What does could have told me mean, and which verb form follows have?",
            "keyIdeas": [
              {
                "labelUk": "should have",
                "labelEn": "should have",
                "anyOf": [
                  "should have",
                  "written",
                  "criticism",
                  "докір",
                  "regret",
                  "жаль"
                ]
              },
              {
                "labelUk": "could have",
                "labelEn": "could have",
                "anyOf": [
                  "could have",
                  "told",
                  "opportunity",
                  "можлив"
                ]
              },
              {
                "labelUk": "participle",
                "labelEn": "participle",
                "anyOf": [
                  "written",
                  "participle",
                  "третя",
                  "v3",
                  "wrote"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Should have — це докір або жаль: треба було написати тест, але не написали. Must have — здогадка, не докір. Could have told me — невикористана можливість. Після have потрібна третя форма, written, не wrote.",
            "sampleAnswerEn": "Should have is criticism or regret: you were supposed to write a test, but you didn't. Must have is a deduction, not criticism. Could have told me is a missed opportunity. After have we need the past participle, written, not wrote."
          }
        ]
      },
      {
        "slug": "en-d-mod-need",
        "titleUk": "needn't have і didn't need to",
        "titleEn": "needn't have and didn't need to",
        "baseXp": 24,
        "difficulty": 4,
        "exercises": [
          {
            "id": "en-d-mod-need-c",
            "type": "concept",
            "promptUk": "Зробив дарма чи просто не було потреби",
            "promptEn": "You did it in vain, or there was simply no need",
            "bodyUk": "Це тонка й важлива пара. didn't need to + інфінітив — потреби не було; часто дію й не виконували: The meeting was cancelled, so I didn't need to come (я й не прийшов). Іноді дію все ж зробили, але акцент — «обов'язку не було».\n\nneedn't have + V3 — ви ВЖЕ зробили дію, а вона виявилась непотрібною: I needn't have come so early — the room was still locked (прийшов дарма). Українською обидва звучать як «не треба було», тому різниця губиться. Запитайте себе: чи людина вже це зробила дарма?\n\nneed як звичайне дієслово: Do you need to…? I don't need to. need як модальне (переважно брит., формальне): Need I say more? You needn't wait. У сучасному IT-англійському частіше don't need to, ніжneedn't, окрім needn't have, яке живе саме в цій парі. Не *I needn't to come і не *I didn't need come.",
            "bodyEn": "This is a subtle and important pair. didn't need to + infinitive means there was no need; often the action was not done: The meeting was cancelled, so I didn't need to come (and I didn't come). Sometimes the action was still done, but the focus is “there was no obligation”.\n\nneedn't have + V3 means you ALREADY did the action, and it turned out to be unnecessary: I needn't have come so early — the room was still locked (I came in vain). In Ukrainian both sound like “I didn't have to”, so the difference disappears. Ask yourself: did the person already do it for nothing?\n\nneed as a normal verb: Do you need to…? I don't need to. need as a modal (mainly British, formal): Need I say more? You needn't wait. In modern IT English, don't need to is more common than needn't, except for needn't have, which lives in this pair. Not *I needn't to come and not *I didn't need come.",
            "keyPointsUk": [
              "didn't need to — потреби не було (часто дію не робили)",
              "needn't have + V3 — уже зробили дарма",
              "Питання: чи дія вже виконана?",
              "Не *needn't to і не *didn't need come"
            ],
            "keyPointsEn": [
              "didn't need to — there was no need (often the action was not done)",
              "needn't have + V3 — you already did it in vain",
              "Ask: was the action already performed?",
              "Not *needn't to and not *didn't need come"
            ]
          },
          {
            "id": "en-d-mod-need-r1",
            "type": "mcq",
            "promptUk": "Зустріч скасували, і ви навіть не виходили з дому.",
            "promptEn": "The meeting was cancelled, and you didn't even leave home.",
            "options": [
              "I didn't need to come.",
              "I needn't have come (I already arrived in vain).",
              "I didn't need come.",
              "I needn't to come."
            ],
            "correctIndex": 0,
            "explanationUk": "Дію не виконували — didn't need to come.",
            "explanationEn": "The action was not done — didn't need to come."
          },
          {
            "id": "en-d-mod-need-r2",
            "type": "mcq",
            "promptUk": "Ви приїхали рано, а кімната ще була зачинена. Дарма.",
            "promptEn": "You arrived early, and the room was still locked. It was in vain.",
            "options": [
              "I needn't have come so early.",
              "I didn't need to come so early, and I stayed at home — that's this story.",
              "I needn't to come so early.",
              "I didn't needed come so early."
            ],
            "correctIndex": 0,
            "explanationUk": "Уже прийшли дарма — needn't have come.",
            "explanationEn": "You already came in vain — needn't have come."
          },
          {
            "id": "en-d-mod-need-r3",
            "type": "fill_blank",
            "promptUk": "Вставте have або to.",
            "promptEn": "Insert have or to.",
            "sentence": "You needn't ___ brought so many cables — we already had them.",
            "accepted": [
              "have",
              "Have"
            ]
          },
          {
            "id": "en-d-mod-need-r4",
            "type": "translate",
            "promptUk": "Перекладіть: зробив дарма (needn't have).",
            "promptEn": "Translate: did it in vain (needn't have).",
            "source": "Мені не треба було друкувати всі сторінки — вони вже були в системі.",
            "accepted": [
              "I needn't have printed all the pages — they were already in the system",
              "I needn't have printed all the pages; they were already in the system",
              "I needn't have printed all the pages, they were already in the system"
            ],
            "direction": "uk_en"
          },
          {
            "id": "en-d-mod-need-e",
            "type": "explain",
            "promptUk": "У чому різниця між I didn't need to come і I needn't have come? Яке питання собі поставити?",
            "promptEn": "What is the difference between I didn't need to come and I needn't have come? What question should you ask yourself?",
            "keyIdeas": [
              {
                "labelUk": "didn't need to",
                "labelEn": "didn't need to",
                "anyOf": [
                  "didn't need to",
                  "cancelled",
                  "не прийшов",
                  "didn't come",
                  "no need"
                ]
              },
              {
                "labelUk": "needn't have",
                "labelEn": "needn't have",
                "anyOf": [
                  "needn't have",
                  "in vain",
                  "дарма",
                  "already",
                  "early"
                ]
              },
              {
                "labelUk": "дія виконана?",
                "labelEn": "was it done?",
                "anyOf": [
                  "already",
                  "уже",
                  "performed",
                  "виконан"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "I didn't need to come означає, що потреби не було, і часто людина навіть не прийшла. I needn't have come — людина вже прийшла дарма. Треба запитати себе, чи дія вже виконана.",
            "sampleAnswerEn": "I didn't need to come means there was no need, and often the person did not even come. I needn't have come means the person already came in vain. You should ask yourself whether the action was already performed."
          }
        ]
      },
      {
        "slug": "en-d-mod-supposed",
        "titleUk": "be supposed to, be meant to, had better",
        "titleEn": "be supposed to, be meant to, had better",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "en-d-mod-supposed-c",
            "type": "concept",
            "promptUk": "Очікування, призначення, порада-попередження",
            "promptEn": "Expectation, purpose, and a warning-advice",
            "bodyUk": "be supposed to + інфінітив — очікування, домовленість або правило: You're supposed to review the PR today (так домовились / так прийнято). I'm supposed to be in a meeting now. Заперечення: You're not supposed to commit straight to main. Це не те саме, що must (сильний обов'язок від мовця) і не те саме, що maybe.\n\nbe meant to — призначення або задум: This function is meant to validate the token. It was meant to be a quick fix. had better + голий інфінітив — сильна порада з попередженням: You'd better back up the database (інакше буде погано). Заперечення: You'd better not skip the tests. Не *You had better to back up.\n\nТипові помилки: *I supposed to go (пропущене am/is/are); плутання з I suppose («я гадаю»). supposed to в минулому: I was supposed to call, but I forgot — очікування не виконано, близько до should have.",
            "bodyEn": "be supposed to + infinitive is an expectation, an agreement, or a rule: You're supposed to review the PR today (that is the plan / the convention). I'm supposed to be in a meeting now. The negative is You're not supposed to commit straight to main. This is not the same as must (a strong obligation from the speaker) and not the same as maybe.\n\nbe meant to is purpose or design: This function is meant to validate the token. It was meant to be a quick fix. had better + bare infinitive is strong advice with a warning: You'd better back up the database (or there will be trouble). The negative is You'd better not skip the tests. Not *You had better to back up.\n\nTypical mistakes: *I supposed to go (missing am/is/are); mixing this up with I suppose (“I think”). In the past: I was supposed to call, but I forgot — an expectation that was not met, close to should have.",
            "keyPointsUk": [
              "be supposed to — очікування, правило, домовленість",
              "не плутати з I suppose («гадаю»)",
              "be meant to — призначення / задум",
              "had better + голий інфінітив, не *better to"
            ],
            "keyPointsEn": [
              "be supposed to is an expectation, a rule, or an agreement",
              "Do not confuse it with I suppose (“I think”)",
              "be meant to is purpose or design",
              "had better + bare infinitive, not *better to"
            ]
          },
          {
            "id": "en-d-mod-supposed-r1",
            "type": "mcq",
            "promptUk": "Оберіть правильне.",
            "promptEn": "Choose the correct option.",
            "options": [
              "You're supposed to review the PR today.",
              "You supposed to review the PR today.",
              "You suppose to review the PR today.",
              "You're suppose review the PR today."
            ],
            "correctIndex": 0,
            "explanationUk": "Потрібне are: you're supposed to + інфінітив.",
            "explanationEn": "You need are: you're supposed to + infinitive."
          },
          {
            "id": "en-d-mod-supposed-r2",
            "type": "fill_blank",
            "promptUk": "Вставте to або not (потрібен інфінітив після meant).",
            "promptEn": "Insert to or not (an infinitive is needed after meant).",
            "sentence": "This function is meant ___ validate the token.",
            "accepted": [
              "to",
              "To"
            ]
          },
          {
            "id": "en-d-mod-supposed-r3",
            "type": "mcq",
            "promptUk": "Сильна порада з попередженням:",
            "promptEn": "Strong advice with a warning:",
            "options": [
              "You'd better back up the database.",
              "You'd better to back up the database.",
              "You had better backing up the database.",
              "You'd better to backing the database."
            ],
            "correctIndex": 0,
            "explanationUk": "had better + голий інфінітив: better back up.",
            "explanationEn": "had better + bare infinitive: better back up."
          },
          {
            "id": "en-d-mod-supposed-r4",
            "type": "translate",
            "promptUk": "Перекладіть через be supposed to.",
            "promptEn": "Translate with be supposed to.",
            "source": "Ти не повинен пушити напряму в main.",
            "accepted": [
              "You're not supposed to push straight to main",
              "You are not supposed to push straight to main",
              "You're not supposed to commit straight to main",
              "You are not supposed to commit straight to main"
            ],
            "direction": "uk_en"
          },
          {
            "id": "en-d-mod-supposed-e",
            "type": "explain",
            "promptUk": "Що означає be supposed to і чим воно відрізняється від I suppose? Як працюють be meant to і had better?",
            "promptEn": "What does be supposed to mean, and how is it different from I suppose? How do be meant to and had better work?",
            "keyIdeas": [
              {
                "labelUk": "supposed to",
                "labelEn": "supposed to",
                "anyOf": [
                  "supposed to",
                  "expectation",
                  "очікуван",
                  "rule",
                  "правило"
                ]
              },
              {
                "labelUk": "I suppose",
                "labelEn": "I suppose",
                "anyOf": [
                  "i suppose",
                  "think",
                  "гадаю"
                ]
              },
              {
                "labelUk": "had better",
                "labelEn": "had better",
                "anyOf": [
                  "had better",
                  "better",
                  "warning",
                  "попередж",
                  "back up"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Be supposed to — це очікування або правило, наприклад you're supposed to review the PR. I suppose означає «я гадаю», це інше. Be meant to говорить про призначення. Had better — сильна порада з попередженням і голим інфінітивом: you'd better back up.",
            "sampleAnswerEn": "Be supposed to is an expectation or a rule, for example you're supposed to review the PR. I suppose means “I think”, which is different. Be meant to talks about purpose. Had better is strong advice with a warning and a bare infinitive: you'd better back up."
          }
        ]
      },
      {
        "slug": "en-d-mod-mix",
        "titleUk": "Огляд відтінків модальних",
        "titleEn": "A review of modal nuances",
        "baseXp": 24,
        "difficulty": 4,
        "exercises": [
          {
            "id": "en-d-mod-mix-c",
            "type": "concept",
            "promptUk": "Обрати точний відтінок",
            "promptEn": "Choosing the exact shade",
            "bodyUk": "Зберіть шкалу в одну картину. Обов'язок і правило зараз: must / have to / should / be supposed to / had better — від сильного внутрішнього must до правила have to, поради should, очікування supposed to і попередження had better. Заборона: mustn't (не можна) проти don't have to (не обов'язково). Ця пара вже була в базових модальних; тут не повторюємо форму, а тримаємо її поруч із минулим.\n\nМинуле: must have (здогадка), should have (треба було), could have (могли, але не), needn't have (зробили дарма), didn't need to (не було потреби), was supposed to (очікували, часто не сталося), would have (нереальний наслідок).\n\nАлгоритм: спочатку час (зараз чи минуле?), потім сила (впевненість, обов'язок, порада, можливість), потім чи дія відбулася. Не ставте will у здогадці про минуле (*They will have left у значенні «мабуть, пішли» можливе як Future Perfect, але для чистої здогадки про вже видимий факт природніше must have left).",
            "bodyEn": "Put the scale into one picture. Obligation and rules now: must / have to / should / be supposed to / had better — from a strong inner must, to a rule with have to, advice with should, an expectation with supposed to, and a warning with had better. Prohibition: mustn't (not allowed) versus don't have to (not necessary). That pair was already in the basic modals unit; here we do not reteach the form, we keep it next to the past.\n\nThe past: must have (deduction), should have (it was the right thing), could have (we could, but didn't), needn't have (we did it in vain), didn't need to (there was no need), was supposed to (it was expected, often it didn't happen), would have (an unreal result).\n\nA method: first the time (now or past?), then the force (certainty, obligation, advice, possibility), then whether the action happened. Do not use will for a deduction about a past fact you can already see (*They will have left can be Future Perfect, but for a pure deduction about an already visible fact, must have left is more natural).",
            "keyPointsUk": [
              "Спочатку час, потім сила, потім «чи вже зробили»",
              "mustn't ≠ don't have to; must have ≠ should have",
              "needn't have ≠ didn't need to",
              "was supposed to — очікування в минулому"
            ],
            "keyPointsEn": [
              "First the time, then the force, then “did they already do it?”",
              "mustn't is not don't have to; must have is not should have",
              "needn't have is not didn't need to",
              "was supposed to is a past expectation"
            ]
          },
          {
            "id": "en-d-mod-mix-r1",
            "type": "mcq",
            "promptUk": "Світло погашене: майже впевнена здогадка.",
            "promptEn": "The lights are off: a near-certain deduction.",
            "options": [
              "They must have left.",
              "They should have left (criticism: it was their duty, and maybe they didn't).",
              "They mustn't have left as a deduction.",
              "They will left."
            ],
            "correctIndex": 0,
            "explanationUk": "Здогадка — must have, не докір should have.",
            "explanationEn": "A deduction is must have, not criticism with should have."
          },
          {
            "id": "en-d-mod-mix-r2",
            "type": "match",
            "promptUk": "Зіставте відтінок із формою.",
            "promptEn": "Match each shade with a form.",
            "pairs": [
              {
                "left": "They must have left.",
                "right": "Здогадка про минуле / A past deduction"
              },
              {
                "left": "You should have written a test.",
                "right": "Докір / жаль / Criticism or regret"
              },
              {
                "left": "I needn't have come so early.",
                "right": "Зробив дарма / Did it in vain"
              },
              {
                "left": "You're supposed to review it today.",
                "right": "Очікування / правило / An expectation or rule"
              }
            ]
          },
          {
            "id": "en-d-mod-mix-r3",
            "type": "fill_blank",
            "promptUk": "Вставте supposed або suppose.",
            "promptEn": "Insert supposed or suppose.",
            "sentence": "I was ___ to call, but I forgot.",
            "accepted": [
              "supposed",
              "Supposed"
            ]
          },
          {
            "id": "en-d-mod-mix-r4",
            "type": "mcq",
            "promptUk": "Потреби не було, і ви навіть не прийшли.",
            "promptEn": "There was no need, and you didn't even come.",
            "options": [
              "I didn't need to come.",
              "I needn't have come (I already arrived).",
              "I must have come in vain.",
              "I shouldn't have been supposed come."
            ],
            "correctIndex": 0,
            "explanationUk": "Не прийшли, бо потреби не було — didn't need to.",
            "explanationEn": "You didn't come, because there was no need — didn't need to."
          },
          {
            "id": "en-d-mod-mix-e",
            "type": "explain",
            "promptUk": "Опишіть короткий алгоритм вибору модального в минулому: здогадка, докір, дарма, не було потреби. Наведіть по одній формі.",
            "promptEn": "Describe a short method for choosing a past modal: deduction, criticism, in vain, no need. Give one form for each.",
            "keyIdeas": [
              {
                "labelUk": "must have",
                "labelEn": "must have",
                "anyOf": [
                  "must have",
                  "deduction",
                  "здогад"
                ]
              },
              {
                "labelUk": "should have",
                "labelEn": "should have",
                "anyOf": [
                  "should have",
                  "criticism",
                  "докір",
                  "regret"
                ]
              },
              {
                "labelUk": "needn't / didn't need",
                "labelEn": "needn't / didn't need",
                "anyOf": [
                  "needn't have",
                  "didn't need",
                  "vain",
                  "дарма",
                  "need"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Спочатку дивіться час і те, чи дія вже сталася. Для здогадки про минуле — must have left. Для докору — should have written. Якщо зробили дарма — needn't have come, а якщо потреби не було і часто навіть не зробили — didn't need to.",
            "sampleAnswerEn": "First look at the time and at whether the action already happened. For a past deduction, use must have left. For criticism, use should have written. If you did it in vain, use needn't have come, and if there was no need and often you didn't even do it, use didn't need to."
          }
        ]
      },
      {
        "slug": "en-deep-modals-plus-exam",
        "titleUk": "Контрольна: модальні в минулому і відтінки",
        "titleEn": "Exam: past modals and nuance",
        "baseXp": 30,
        "difficulty": 4,
        "isExam": true,
        "passThreshold": 0.7,
        "exercises": [
          {
            "id": "en-deep-modals-plus-exam-q1",
            "type": "mcq",
            "promptUk": "Світло погашене. Здогадка:",
            "promptEn": "The lights are off. A deduction:",
            "options": [
              "They must have left.",
              "They must left.",
              "They should have left as a pure deduction only.",
              "They mustn't have left meaning “impossible”."
            ],
            "correctIndex": 0,
            "explanationUk": "must have left — здогадка.",
            "explanationEn": "must have left is a deduction."
          },
          {
            "id": "en-deep-modals-plus-exam-q2",
            "type": "mcq",
            "promptUk": "Докір: тест не написали.",
            "promptEn": "Criticism: no test was written.",
            "options": [
              "You should have written a test.",
              "You should have wrote a test.",
              "You should had written a test.",
              "You must have written a test as criticism only."
            ],
            "correctIndex": 0,
            "explanationUk": "should have written.",
            "explanationEn": "should have written."
          },
          {
            "id": "en-deep-modals-plus-exam-q3",
            "type": "mcq",
            "promptUk": "Прийшли рано дарма:",
            "promptEn": "You arrived early in vain:",
            "options": [
              "I needn't have come so early.",
              "I didn't need to come, and I stayed at home — this story.",
              "I needn't to come so early.",
              "I didn't need come so early."
            ],
            "correctIndex": 0,
            "explanationUk": "Уже зробили дарма — needn't have.",
            "explanationEn": "Already done in vain — needn't have."
          },
          {
            "id": "en-deep-modals-plus-exam-q4",
            "type": "mcq",
            "promptUk": "Очікування-правило:",
            "promptEn": "An expectation or rule:",
            "options": [
              "You're supposed to review the PR today.",
              "You supposed to review the PR today.",
              "You'd better to review the PR today.",
              "You suppose to review the PR today."
            ],
            "correctIndex": 0,
            "explanationUk": "you're supposed to + інфінітив.",
            "explanationEn": "you're supposed to + infinitive."
          },
          {
            "id": "en-deep-modals-plus-exam-q5",
            "type": "fill_blank",
            "promptUk": "Вставте have або to (здогадка).",
            "promptEn": "Insert have or to (a deduction).",
            "sentence": "He can't ___ forgotten — he's too reliable.",
            "accepted": [
              "have",
              "Have"
            ]
          }
        ]
      }
    ]
  }
];

export function expandEnglishDeep(course: CourseContent): CourseContent {
  return expandCourse(course, {}, newUnits);
}
