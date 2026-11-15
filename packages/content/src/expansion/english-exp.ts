import type { CourseContent, UnitContent } from "../types.js";
import { expandCourse } from "./factory.js";

const newUnits: UnitContent[] = [
  {
    slug: "articles-determiners",
    titleUk: "Артиклі та визначники",
    titleEn: "Articles and determiners",
    lessons: [
      {
        slug: "en-a-an",
        titleUk: "a і an",
        titleEn: "a and an",
        baseXp: 18,
        difficulty: 2,
        isFree: true,
        exercises: [
          {
            "id": "en-a-an-c",
            "type": "concept",
            "promptUk": "a чи an",
            "promptEn": "a or an",
            "bodyUk": "Артикль a/an вживаємо з обчислюваними іменниками в однині, коли предмет неконкретний. an ставлять перед звуком голосним, не обов'язково перед літерою: an hour (h німе), але a university (звук /j/). Це правило вимови, не орфографії.",
            "bodyEn": "Use a/an with singular countable nouns when the thing is not specific. an comes before a vowel sound, not necessarily a vowel letter: an hour (silent h), but a university (the sound /j/). This is a pronunciation rule, not a spelling rule.",
            "keyPointsUk": [
              "a/an — неконкретна однина",
              "an перед голосним звуком",
              "an hour, але a university"
            ],
            "keyPointsEn": [
              "a/an is non-specific singular",
              "an before a vowel sound",
              "an hour, but a university"
            ]
          },
          {
            "id": "en-a-an-1",
            "type": "mcq",
            "promptUk": "Оберіть правильний артикль: ___ hour",
            "promptEn": "Choose the correct article: ___ hour",
            "options": [
              "an",
              "a",
              "the",
              "нуль"
            ],
            "correctIndex": 0,
            "explanationUk": "h у hour німе, слово починається з голосного звуку.",
            "explanationEn": "The h in hour is silent, so the word starts with a vowel sound."
          },
          {
            "id": "en-a-an-2",
            "type": "mcq",
            "promptUk": "___ university на початку речення про одну будь-яку:",
            "promptEn": "___ university at the start of a sentence about any one:",
            "options": [
              "a",
              "an",
              "the",
              "нуль"
            ],
            "correctIndex": 0,
            "explanationUk": "university починається зі звуку /j/, як 'you'.",
            "explanationEn": "university starts with a /j/ sound, as in 'you'."
          },
          {
            "id": "en-a-an-3",
            "type": "fill_blank",
            "promptUk": "Вставте артикль",
            "promptEn": "Fill in the article",
            "sentence": "She wants to be ___ engineer.",
            "accepted": [
              "an"
            ]
          }
        ],
      },
      {
        slug: "en-the-specific",
        titleUk: "the: уже відоме",
        titleEn: "the: already known",
        baseXp: 18,
        difficulty: 2,
        isFree: false,
        exercises: [
          {
            "id": "en-the-c",
            "type": "concept",
            "promptUk": "Коли потрібен the",
            "promptEn": "When you need the",
            "bodyUk": "the вживаємо, коли слухач розуміє, про який саме предмет ідеться: він уже згадувався, він єдиний у контексті (the sun, the kitchen), або його визначає уточнення (the book on the desk). З загальними ідеями в множині чи не rapах артикль часто нульовий: Books are useful.",
            "bodyEn": "Use the when the listener knows which thing you mean: it was mentioned already, it is unique in the context (the sun, the kitchen), or a qualifier identifies it (the book on the desk). With general ideas in the plural or uncountable, the article is often zero: Books are useful.",
            "keyPointsUk": [
              "the — конкретний, відомий слухачеві",
              "унікальні в контексті: the sun",
              "загальна множина часто без артикля"
            ],
            "keyPointsEn": [
              "the is specific and known to the listener",
              "unique in context: the sun",
              "a general plural often has no article"
            ]
          },
          {
            "id": "en-the-1",
            "type": "mcq",
            "promptUk": "I saw a cat. ___ cat was black.",
            "promptEn": "I saw a cat. ___ cat was black.",
            "options": [
              "The",
              "A",
              "An",
              "Some"
            ],
            "correctIndex": 0,
            "explanationUk": "Друга згадка — уже відомий кіт.",
            "explanationEn": "The second mention is the cat we already know."
          },
          {
            "id": "en-the-2",
            "type": "fill_blank",
            "promptUk": "Вставте артикль, якщо потрібен",
            "promptEn": "Fill in an article if needed",
            "sentence": "Please close ___ door.",
            "accepted": [
              "the"
            ]
          },
          {
            "id": "en-the-3",
            "type": "translate",
            "promptUk": "Перекладіть англійською",
            "promptEn": "Translate into English",
            "source": "Сонце світить.",
            "accepted": [
              "the sun is shining",
              "the sun shines"
            ],
            "direction": "uk_en"
          }
        ],
      },
      {
        slug: "en-zero-article",
        titleUk: "Нульовий артикль",
        titleEn: "Zero article",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "en-zero-c",
            "type": "concept",
            "promptUk": "Коли артикля немає",
            "promptEn": "When there is no article",
            "bodyUk": "Нульовий артикль типовий з іменами, країнами в однині (France, але the Netherlands), мовами (English), прийомами їжі в загальному сенсі (have breakfast), і загальними не rapах: Water is essential. З установами залежить від значення: at school (як учень) vs at the school (будівля).",
            "bodyEn": "The zero article is typical with names, singular country names (France, but the Netherlands), languages (English), meals in a general sense (have breakfast), and general uncountables: Water is essential. With institutions it depends on meaning: at school (as a pupil) vs at the school (the building).",
            "keyPointsUk": [
              "імена і більшість країн — без the",
              "have breakfast без артикля",
              "at school vs at the school — різні значення"
            ],
            "keyPointsEn": [
              "names and most countries take no the",
              "have breakfast has no article",
              "at school vs at the school have different meanings"
            ]
          },
          {
            "id": "en-zero-1",
            "type": "mcq",
            "promptUk": "She studies ___ English.",
            "promptEn": "She studies ___ English.",
            "options": [
              "нульовий артикль",
              "the",
              "a",
              "an"
            ],
            "correctIndex": 0,
            "explanationUk": "Назви мов зазвичай без артикля.",
            "explanationEn": "Language names usually have no article."
          },
          {
            "id": "en-zero-2",
            "type": "mcq",
            "promptUk": "The children are ___ school (вони там навчаються).",
            "promptEn": "The children are ___ school (they study there).",
            "options": [
              "at",
              "at the",
              "in the",
              "to"
            ],
            "correctIndex": 0,
            "explanationUk": "at school — інституційне значення.",
            "explanationEn": "at school is the institutional meaning."
          },
          {
            "id": "en-zero-3",
            "type": "mcq",
            "promptUk": "Правильний варіант про воду загалом:",
            "promptEn": "The correct option about water in general:",
            "options": [
              "Water boils at 100 degrees.",
              "The water boils at 100 degrees. (загальне твердження)",
              "A water boils at 100 degrees.",
              "An water boils at 100 degrees."
            ],
            "correctIndex": 0,
            "explanationUk": "Речовини в загальному значенні мають нульовий артикль: Water boils…",
            "explanationEn": "Substances in a general sense take the zero article: Water boils…"
          }
        ],
      },
      {
        slug: "en-some-any",
        titleUk: "some і any",
        titleEn: "some and any",
        baseXp: 18,
        difficulty: 2,
        isFree: false,
        exercises: [
          {
            "id": "en-some-c",
            "type": "concept",
            "promptUk": "some / any",
            "promptEn": "some / any",
            "bodyUk": "some типово в ствердженнях (I need some time) і в пропозиціях (Would you like some tea?). any — у запитаннях і запереченнях (Have you got any milk? I haven't any). У запитаннях, де очікуємо «так» або пропонуємо, можливе some. not any часто замінюють на no: I have no idea.",
            "bodyEn": "some is typical in statements (I need some time) and offers (Would you like some tea?). any is used in questions and negatives (Have you got any milk? I haven't any). In questions where we expect 'yes' or we are offering, some is possible. not any is often replaced by no: I have no idea.",
            "keyPointsUk": [
              "some — ствердження і пропозиції",
              "any — питання і заперечення",
              "no замінює not any"
            ],
            "keyPointsEn": [
              "some for statements and offers",
              "any for questions and negatives",
              "no replaces not any"
            ]
          },
          {
            "id": "en-some-1",
            "type": "mcq",
            "promptUk": "Would you like ___ coffee?",
            "promptEn": "Would you like ___ coffee?",
            "options": [
              "some",
              "any",
              "a",
              "the"
            ],
            "correctIndex": 0,
            "explanationUk": "Пропозиція — природне some.",
            "explanationEn": "An offer takes a natural some."
          },
          {
            "id": "en-some-2",
            "type": "fill_blank",
            "promptUk": "Заперечення",
            "promptEn": "A negative",
            "sentence": "There aren't ___ tickets left.",
            "accepted": [
              "any"
            ]
          },
          {
            "id": "en-some-3",
            "type": "match",
            "promptUk": "Зіставте",
            "promptEn": "Match",
            "pairs": [
              {
                "left": "I have ___ news.",
                "right": "some"
              },
              {
                "left": "Have you ___ questions?",
                "right": "any"
              },
              {
                "left": "I have ___ idea.",
                "right": "no"
              }
            ]
          }
        ],
      },
      {
        slug: "en-quantifiers",
        titleUk: "much, many, a few, a little",
        titleEn: "much, many, a few, a little",
        baseXp: 18,
        difficulty: 2,
        isFree: false,
        exercises: [
          {
            "id": "en-q-c",
            "type": "concept",
            "promptUk": "Кількісні слова",
            "promptEn": "Quantifiers",
            "bodyUk": "many і a few — з обчислюваними (many books, a few ideas). much і a little — з необчислюваними (much time, a little water). a few / a little означають «трохи, і цього досить»; few / little без a — «мало, недостатньо» (негативний відтінок). lots of підходить до обох типів у мовленні.",
            "bodyEn": "many and a few go with countables (many books, a few ideas). much and a little go with uncountables (much time, a little water). a few / a little mean 'some, and that is enough'; few / little without a mean 'not enough' (a negative tone). lots of works with both types in speech.",
            "keyPointsUk": [
              "many/a few — обчислювані",
              "much/a little — необчислювані",
              "few без a має негативний відтінок"
            ],
            "keyPointsEn": [
              "many/a few are for countables",
              "much/a little are for uncountables",
              "few without a has a negative tone"
            ]
          },
          {
            "id": "en-q-1",
            "type": "mcq",
            "promptUk": "We have ___ time (необчислюване, «трохи є»).",
            "promptEn": "We have ___ time (uncountable, 'a small amount, enough').",
            "options": [
              "a little",
              "a few",
              "many",
              "few"
            ],
            "correctIndex": 0,
            "explanationUk": "time необчислюване; a little — позитивне «трохи».",
            "explanationEn": "time is uncountable; a little is a positive 'some'."
          },
          {
            "id": "en-q-2",
            "type": "mcq",
            "promptUk": "___ people came, so we cancelled (негативно: замало).",
            "promptEn": "___ people came, so we cancelled (negative: not enough).",
            "options": [
              "Few",
              "A few",
              "Much",
              "A little"
            ],
            "correctIndex": 0,
            "explanationUk": "Few без a — недостатньо.",
            "explanationEn": "Few without a means not enough."
          },
          {
            "id": "en-q-3",
            "type": "fill_blank",
            "promptUk": "Обчислюване, «багато» у питанні",
            "promptEn": "Countable, 'a lot' in a question",
            "sentence": "How ___ tickets do we need?",
            "accepted": [
              "many"
            ]
          }
        ],
      },
    ],
  },
  {
    slug: "conditionals",
    titleUk: "Умовні речення",
    titleEn: "Conditionals",
    lessons: [
      {
        slug: "en-cond-zero",
        titleUk: "Нульовий тип (факти)",
        titleEn: "Zero conditional (facts)",
        baseXp: 18,
        difficulty: 2,
        isFree: false,
        exercises: [
          {
            "id": "en-c0-c",
            "type": "concept",
            "promptUk": "Zero conditional",
            "promptEn": "Zero conditional",
            "bodyUk": "Zero conditional описує загальні факти й інструкції: If you heat ice, it melts. Обидві частини — Present Simple. if і when майже взаємозамінні, бо умова повторювана. Коми ставлять, коли if-частина на початку.",
            "bodyEn": "The zero conditional describes general facts and instructions: If you heat ice, it melts. Both clauses use the Present Simple. if and when are almost interchangeable, because the condition is habitual. Use a comma when the if-clause comes first.",
            "keyPointsUk": [
              "обидві частини Present Simple",
              "загальні факти й інструкції",
              "кома, якщо if на початку"
            ],
            "keyPointsEn": [
              "both clauses use Present Simple",
              "general facts and instructions",
              "a comma if if comes first"
            ]
          },
          {
            "id": "en-c0-1",
            "type": "fill_blank",
            "promptUk": "Вставте дієслово",
            "promptEn": "Fill in the verb",
            "sentence": "If you press this button, the light ___ on. (turn)",
            "accepted": [
              "turns",
              "comes",
              "goes"
            ]
          },
          {
            "id": "en-c0-2",
            "type": "mcq",
            "promptUk": "Правильний нульовий тип:",
            "promptEn": "A correct zero conditional:",
            "options": [
              "If water reaches 100°C, it boils.",
              "If water will reach 100°C, it boils.",
              "If water reached 100°C, it boils.",
              "If water reach 100°C, it boil."
            ],
            "correctIndex": 0,
            "explanationUk": "Present Simple в обох частинах.",
            "explanationEn": "Present Simple in both clauses."
          },
          {
            "id": "en-c0-3",
            "type": "order_words",
            "promptUk": "Складіть речення",
            "promptEn": "Build the sentence",
            "words": [
              "purple",
              "get",
              "you",
              "blue",
              "and",
              "red",
              "mix",
              "you",
              "If"
            ],
            "correct": [
              "If",
              "you",
              "mix",
              "red",
              "and",
              "blue",
              "you",
              "get",
              "purple"
            ]
          }
        ],
      },
      {
        slug: "en-cond-1",
        titleUk: "Перший тип (реальне майбутнє)",
        titleEn: "First conditional (real future)",
        baseXp: 18,
        difficulty: 2,
        isFree: false,
        exercises: [
          {
            "id": "en-c1-c",
            "type": "concept",
            "promptUk": "First conditional",
            "promptEn": "First conditional",
            "bodyUk": "First conditional — реальна можливість у майбутньому: If it rains, we will stay in. Після if — Present Simple, у головній — will (або can, might, imperative). Не ставте will одразу після if у цьому значенні (If it will rain — помилка).",
            "bodyEn": "The first conditional is a real future possibility: If it rains, we will stay in. After if you use Present Simple; the main clause uses will (or can, might, or an imperative). Do not put will right after if in this meaning (If it will rain is wrong).",
            "keyPointsUk": [
              "if + Present, головна + will",
              "реальна майбутня можливість",
              "не will після if"
            ],
            "keyPointsEn": [
              "if + Present, main clause + will",
              "a real future possibility",
              "no will after if"
            ]
          },
          {
            "id": "en-c1-1",
            "type": "fill_blank",
            "promptUk": "Майбутнє в головній частині",
            "promptEn": "The future in the main clause",
            "sentence": "If she calls, I ___ you know.",
            "accepted": [
              "will let",
              "I'll let",
              "will tell"
            ]
          },
          {
            "id": "en-c1-2",
            "type": "mcq",
            "promptUk": "Оберіть правильне:",
            "promptEn": "Choose the correct sentence:",
            "options": [
              "If I finish early, I will join you.",
              "If I will finish early, I will join you.",
              "If I finished early, I will join you.",
              "If I finishing early, I join you."
            ],
            "correctIndex": 0,
            "explanationUk": "Після if — present, не will.",
            "explanationEn": "After if, use present, not will."
          },
          {
            "id": "en-c1-3",
            "type": "translate",
            "promptUk": "Перекладіть англійською",
            "promptEn": "Translate into English",
            "source": "Якщо я побачу її, я скажу.",
            "accepted": [
              "if i see her i will tell her",
              "if i see her i'll tell her",
              "if i see her, i will tell her"
            ],
            "direction": "uk_en"
          }
        ],
      },
      {
        slug: "en-cond-2",
        titleUk: "Другий тип (уявне теперішнє)",
        titleEn: "Second conditional (unreal present)",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "en-c2-c",
            "type": "concept",
            "promptUk": "Second conditional",
            "promptEn": "Second conditional",
            "bodyUk": "Second conditional описує нереальне або малоймовірне теперішнє/майбутнє: If I had more time, I would learn Japanese. Після if — Past Simple, у головній — would + V. Для be у формальному стилі: If I were you. Це не минулий час за значенням, а «віддалення від реальності».",
            "bodyEn": "The second conditional describes an unreal or unlikely present or future: If I had more time, I would learn Japanese. After if you use Past Simple; the main clause uses would + V. For be in a formal style: If I were you. This is not a past meaning, it is distance from reality.",
            "keyPointsUk": [
              "if + Past, головна + would",
              "уявна або малоймовірна ситуація",
              "If I were you — усталена форма"
            ],
            "keyPointsEn": [
              "if + Past, main clause + would",
              "an imaginary or unlikely situation",
              "If I were you is the set form"
            ]
          },
          {
            "id": "en-c2-1",
            "type": "fill_blank",
            "promptUk": "Вставте would-форму",
            "promptEn": "Fill in the would form",
            "sentence": "If I lived closer, I ___ walk to work.",
            "accepted": [
              "would",
              "I'd",
              "would walk"
            ]
          },
          {
            "id": "en-c2-2",
            "type": "mcq",
            "promptUk": "If I ___ you, I would apologise.",
            "promptEn": "If I ___ you, I would apologise.",
            "options": [
              "were",
              "am",
              "will be",
              "be"
            ],
            "correctIndex": 0,
            "explanationUk": "Класична форма were для всіх осіб.",
            "explanationEn": "The classic form is were for every person."
          },
          {
            "id": "en-c2-3",
            "type": "order_words",
            "promptUk": "Складіть друге умовне",
            "promptEn": "Build a second conditional",
            "words": [
              "travel",
              "would",
              "I",
              "lottery",
              "the",
              "won",
              "I",
              "If"
            ],
            "correct": [
              "If",
              "I",
              "won",
              "the",
              "lottery",
              "I",
              "would",
              "travel"
            ]
          }
        ],
      },
      {
        slug: "en-cond-3",
        titleUk: "Третій тип (уявне минуле)",
        titleEn: "Third conditional (unreal past)",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "en-c3-c",
            "type": "concept",
            "promptUk": "Third conditional",
            "promptEn": "Third conditional",
            "bodyUk": "Third conditional жалкує про минуле, яке вже не змінити: If I had left earlier, I would have caught the train. Після if — Past Perfect, у головній — would have + V3. Скорочення: If I'd left, I would've caught. Не плутайте з другим типом: тут ідеться про факт, який не стався.",
            "bodyEn": "The third conditional regrets a past that cannot be changed: If I had left earlier, I would have caught the train. After if you use Past Perfect; the main clause uses would have + V3. Contractions: If I'd left, I would've caught. Do not confuse it with the second type: this is about a fact that did not happen.",
            "keyPointsUk": [
              "if + Past Perfect, головна + would have + V3",
              "жаль про минуле",
              "скорочення I'd / would've"
            ],
            "keyPointsEn": [
              "if + Past Perfect, main clause + would have + V3",
              "regret about the past",
              "contractions I'd / would've"
            ]
          },
          {
            "id": "en-c3-1",
            "type": "fill_blank",
            "promptUk": "Допишіть головну частину",
            "promptEn": "Complete the main clause",
            "sentence": "If we had booked earlier, we ___ found a better room. (would have)",
            "accepted": [
              "would have",
              "would've",
              "would have found"
            ]
          },
          {
            "id": "en-c3-2",
            "type": "mcq",
            "promptUk": "Правильний третій тип:",
            "promptEn": "A correct third conditional:",
            "options": [
              "If she had studied, she would have passed.",
              "If she studied, she would have passed.",
              "If she had studied, she would pass.",
              "If she would have studied, she passed."
            ],
            "correctIndex": 0,
            "explanationUk": "Past Perfect + would have + V3.",
            "explanationEn": "Past Perfect + would have + V3."
          },
          {
            "id": "en-c3-3",
            "type": "translate",
            "promptUk": "Перекладіть українською",
            "promptEn": "Translate into Ukrainian",
            "source": "If I had known, I would have helped.",
            "accepted": [
              "якби я знав я б допоміг",
              "якби я знала я б допомогла",
              "якби я знав, я допоміг би"
            ],
            "direction": "en_uk"
          }
        ],
      },
      {
        slug: "en-cond-mixed",
        titleUk: "Змішані типи",
        titleEn: "Mixed conditionals",
        baseXp: 24,
        difficulty: 4,
        isFree: false,
        exercises: [
          {
            "id": "en-cm-c",
            "type": "concept",
            "promptUk": "Mixed conditionals",
            "promptEn": "Mixed conditionals",
            "bodyUk": "Змішані типи з'єднують різний час умови і наслідку. Часто: минула умова, теперішній наслідок — If I had slept more, I would not be tired now. Або теперішня умова, минулий наслідок — If I were taller, I would have joined the team then. Дивіться, яка частина про минуле, яка про теперішнє.",
            "bodyEn": "Mixed conditionals connect a condition and a result in different times. A common pattern is a past condition with a present result: If I had slept more, I would not be tired now. Or a present condition with a past result: If I were taller, I would have joined the team then. Look at which part is about the past and which is about the present.",
            "keyPointsUk": [
              "минула умова + теперішній would",
              "теперішня умова + would have для минулого наслідку",
              "дивіться час кожної частини"
            ],
            "keyPointsEn": [
              "a past condition + present would",
              "a present condition + would have for a past result",
              "look at the time of each part"
            ]
          },
          {
            "id": "en-cm-1",
            "type": "mcq",
            "promptUk": "If I had taken that job, I ___ in London now.",
            "promptEn": "If I had taken that job, I ___ in London now.",
            "options": [
              "would be",
              "would have been",
              "will be",
              "am"
            ],
            "correctIndex": 0,
            "explanationUk": "Наслідок теперішній — would + V.",
            "explanationEn": "The result is present, so would + V."
          },
          {
            "id": "en-cm-2",
            "type": "mcq",
            "promptUk": "If she were more careful, she ___ the file yesterday.",
            "promptEn": "If she were more careful, she ___ the file yesterday.",
            "options": [
              "would not have lost",
              "would not lose",
              "will not lose",
              "did not lose"
            ],
            "correctIndex": 0,
            "explanationUk": "Умова про характер (тепер), наслідок учора — would have.",
            "explanationEn": "The condition is about character (now); the result was yesterday, so would have."
          },
          {
            "id": "en-cm-3",
            "type": "fill_blank",
            "promptUk": "Минула умова",
            "promptEn": "A past condition",
            "sentence": "If I ___ (listen) to you then, I would be happier now.",
            "accepted": [
              "had listened"
            ]
          }
        ],
      },
    ],
  },
  {
    slug: "phrasal-work",
    titleUk: "Фразові дієслова: робота й навчання",
    titleEn: "Phrasal verbs: work and study",
    lessons: [
      {
        slug: "en-pv-work-1",
        titleUk: "set up, carry out, follow up",
        titleEn: "set up, carry out, follow up",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "en-pv1-c",
            "type": "concept",
            "promptUk": "Три робочі фразові",
            "promptEn": "Three workplace phrasals",
            "bodyUk": "set up означає організувати або встановити (set up a meeting, set up a server). carry out — виконати план, дослідження чи наказ. follow up — зробити наступний крок після розмови чи листа (follow up with an email). Частинка не завжди віддільна: carry out the plan / carry the plan out, але follow up with когось — with лишається.",
            "bodyEn": "set up means to organise or install (set up a meeting, set up a server). carry out means to perform a plan, a study or an order. follow up means to take the next step after a talk or a letter (follow up with an email). The particle is not always separable: carry out the plan / carry the plan out, but follow up with someone keeps with in place.",
            "keyPointsUk": [
              "set up — організувати або встановити",
              "carry out — виконати",
              "follow up — зробити наступний крок"
            ],
            "keyPointsEn": [
              "set up means organise or install",
              "carry out means perform",
              "follow up means take the next step"
            ]
          },
          {
            "id": "en-pv1-1",
            "type": "match",
            "promptUk": "Зіставте значення",
            "promptEn": "Match the meanings",
            "pairs": [
              {
                "left": "set up a call",
                "right": "organize it"
              },
              {
                "left": "carry out a test",
                "right": "perform it"
              },
              {
                "left": "follow up a lead",
                "right": "take the next step"
              }
            ]
          },
          {
            "id": "en-pv1-2",
            "type": "fill_blank",
            "promptUk": "Вставте частку",
            "promptEn": "Fill in the particle",
            "sentence": "We will carry ___ the audit next week.",
            "accepted": [
              "out"
            ]
          },
          {
            "id": "en-pv1-3",
            "type": "mcq",
            "promptUk": "I'll ___ with the client tomorrow.",
            "promptEn": "I'll ___ with the client tomorrow.",
            "options": [
              "follow up",
              "set up",
              "carry out",
              "give up"
            ],
            "correctIndex": 0,
            "explanationUk": "follow up with — наступний контакт.",
            "explanationEn": "follow up with is the next contact."
          }
        ],
      },
      {
        slug: "en-pv-work-2",
        titleUk: "put off, call off, take over",
        titleEn: "put off, call off, take over",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "en-pv2-c",
            "type": "concept",
            "promptUk": "Перенос, скасування, перейняття",
            "promptEn": "Postpone, cancel, take over",
            "bodyUk": "put off — відкласти на пізніше (put off a meeting). call off — скасувати взагалі (call off the strike). take over — перейняти відповідальність або компанію (take over the project). Не плутайте put off і call off: перше лишає подію в календарі, друге її прибирає.",
            "bodyEn": "put off means to postpone (put off a meeting). call off means to cancel entirely (call off the strike). take over means to assume responsibility or a company (take over the project). Do not confuse put off and call off: the first keeps the event in the calendar, the second removes it.",
            "keyPointsUk": [
              "put off — відкласти",
              "call off — скасувати",
              "take over — перейняти"
            ],
            "keyPointsEn": [
              "put off means postpone",
              "call off means cancel",
              "take over means assume control"
            ]
          },
          {
            "id": "en-pv2-1",
            "type": "mcq",
            "promptUk": "The launch was ___ until May (перенесено).",
            "promptEn": "The launch was ___ until May (postponed).",
            "options": [
              "put off",
              "called off",
              "taken over",
              "set up"
            ],
            "correctIndex": 0,
            "explanationUk": "until May вказує на перенос, не скасування.",
            "explanationEn": "until May signals a postponement, not a cancellation."
          },
          {
            "id": "en-pv2-2",
            "type": "fill_blank",
            "promptUk": "Скасувати",
            "promptEn": "Cancel",
            "sentence": "They had to call ___ the outdoor event because of the storm.",
            "accepted": [
              "off"
            ]
          },
          {
            "id": "en-pv2-3",
            "type": "translate",
            "promptUk": "Перекладіть",
            "promptEn": "Translate",
            "source": "She will take over the team in June.",
            "accepted": [
              "вона перейме команду в червні",
              "вона очолить команду в червні"
            ],
            "direction": "en_uk"
          }
        ],
      },
      {
        slug: "en-pv-learn",
        titleUk: "look up, go over, figure out",
        titleEn: "look up, go over, figure out",
        baseXp: 18,
        difficulty: 2,
        isFree: false,
        exercises: [
          {
            "id": "en-pv3-c",
            "type": "concept",
            "promptUk": "Навчальні фразові",
            "promptEn": "Study phrasals",
            "bodyUk": "look up — знайти інформацію в довіднику чи в мережі. go over — переглянути або розібрати матеріал (go over the notes). figure out — зрозуміти, розв'язати задачу самостійно. look up the word, не look the word (без up значення інше).",
            "bodyEn": "look up means to find information in a reference or online. go over means to review or walk through material (go over the notes). figure out means to understand or solve a problem yourself. look up the word — without up, look has a different meaning.",
            "keyPointsUk": [
              "look up — знайти в довіднику",
              "go over — переглянути матеріал",
              "figure out — самостійно зрозуміти"
            ],
            "keyPointsEn": [
              "look up means find in a reference",
              "go over means review material",
              "figure out means work it out yourself"
            ]
          },
          {
            "id": "en-pv3-1",
            "type": "fill_blank",
            "promptUk": "Словник",
            "promptEn": "A dictionary",
            "sentence": "If you don't know the verb, look it ___.",
            "accepted": [
              "up"
            ]
          },
          {
            "id": "en-pv3-2",
            "type": "mcq",
            "promptUk": "Let's ___ the exam topics once more.",
            "promptEn": "Let's ___ the exam topics once more.",
            "options": [
              "go over",
              "look up",
              "give up",
              "take off"
            ],
            "correctIndex": 0,
            "explanationUk": "go over — спільний перегляд.",
            "explanationEn": "go over is a shared review."
          },
          {
            "id": "en-pv3-3",
            "type": "order_words",
            "promptUk": "Складіть речення",
            "promptEn": "Build the sentence",
            "words": [
              "error",
              "this",
              "out",
              "figure",
              "can't",
              "I"
            ],
            "correct": [
              "I",
              "can't",
              "figure",
              "out",
              "this",
              "error"
            ]
          }
        ],
      },
      {
        slug: "en-pv-separable",
        titleUk: "Віддільні й невіддільні",
        titleEn: "Separable and inseparable",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "en-pv4-c",
            "type": "concept",
            "promptUk": "Віддільність",
            "promptEn": "Separability",
            "bodyUk": "Якщо фразове дієслово віддільне, займенник стоїть між дієсловом і часткою: turn it off, не turn off it. Іменник може стояти в обох місцях: turn the light off / turn off the light. Невіддільні (look after, run into) не розривають: look after them, не look them after. Перевіряйте нові дієслова в словнику.",
            "bodyEn": "If a phrasal verb is separable, a pronoun goes between the verb and the particle: turn it off, not turn off it. A noun can go in either place: turn the light off / turn off the light. Inseparable ones (look after, run into) do not split: look after them, not look them after. Check new verbs in a dictionary.",
            "keyPointsUk": [
              "займенник у віддільних — посередині",
              "іменник можна ставити в обох позиціях",
              "невіддільні не розривають"
            ],
            "keyPointsEn": [
              "in separable verbs a pronoun goes in the middle",
              "a noun can take either position",
              "inseparable verbs do not split"
            ]
          },
          {
            "id": "en-pv4-1",
            "type": "mcq",
            "promptUk": "Правильний варіант з займенником:",
            "promptEn": "The correct option with a pronoun:",
            "options": [
              "Please turn it off.",
              "Please turn off it.",
              "Please off turn it.",
              "Please turn off them light."
            ],
            "correctIndex": 0,
            "explanationUk": "Займенник it стоїть перед off.",
            "explanationEn": "The pronoun it stands before off."
          },
          {
            "id": "en-pv4-2",
            "type": "mcq",
            "promptUk": "look after (піклуватися) — правильне:",
            "promptEn": "look after (take care of) — the correct form:",
            "options": [
              "She looks after them.",
              "She looks them after.",
              "She looks after.",
              "She after looks them."
            ],
            "correctIndex": 0,
            "explanationUk": "look after невіддільне.",
            "explanationEn": "look after is inseparable."
          },
          {
            "id": "en-pv4-3",
            "type": "fill_blank",
            "promptUk": "Вставте займенник у правильне місце: turn ___ off (the phone = it)",
            "promptEn": "Place the pronoun: turn ___ off (the phone = it)",
            "sentence": "Please turn ___ off.",
            "accepted": [
              "it"
            ]
          }
        ],
      },
      {
        slug: "en-pv-review",
        titleUk: "Огляд фразових",
        titleEn: "Phrasal review",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "en-pvr-1",
            "type": "match",
            "promptUk": "Зіставте",
            "promptEn": "Match",
            "pairs": [
              {
                "left": "call off",
                "right": "cancel"
              },
              {
                "left": "put off",
                "right": "postpone"
              },
              {
                "left": "look up",
                "right": "find in a reference"
              },
              {
                "left": "figure out",
                "right": "solve or understand"
              }
            ]
          },
          {
            "id": "en-pvr-2",
            "type": "mcq",
            "promptUk": "We had to ___ the picnic (скасувати, не перенести).",
            "promptEn": "We had to ___ the picnic (cancel, not postpone).",
            "options": [
              "call off",
              "put off",
              "set up",
              "go over"
            ],
            "correctIndex": 0,
            "explanationUk": "call off — повне скасування.",
            "explanationEn": "call off is a full cancellation."
          },
          {
            "id": "en-pvr-3",
            "type": "translate",
            "promptUk": "Перекладіть",
            "promptEn": "Translate",
            "source": "Please follow up with an email.",
            "accepted": [
              "будь ласка зробіть наступний крок листом",
              "будь ласка напишіть наступного листа",
              "прошу продовжити листом"
            ],
            "direction": "en_uk"
          },
          {
            "id": "en-pvr-4",
            "type": "fill_blank",
            "promptUk": "Перейняти проєкт",
            "promptEn": "Take over a project",
            "sentence": "Who will take ___ while Ana is away?",
            "accepted": [
              "over"
            ]
          }
        ],
      },
    ],
  },
  {
    slug: "reported-speech",
    titleUk: "Непряма мова",
    titleEn: "Reported speech",
    lessons: [
      {
        slug: "en-rep-statements",
        titleUk: "Зсув часів у розповідях",
        titleEn: "Tense shift in statements",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "en-rs-c",
            "type": "concept",
            "promptUk": "Sequence of tenses",
            "promptEn": "Sequence of tenses",
            "bodyUk": "Коли ввідне дієслово в минулому (she said), часи в непрямій мові зазвичай зсуваються на крок назад: Present → Past, Present Perfect / Past → Past Perfect, will → would. Займенники й адвербіали теж змінюються (today → that day), якщо точка відліку інша. Якщо факт досі істинний, зсув інколи не роблять: He said the Earth is round.",
            "bodyEn": "When the reporting verb is in the past (she said), tenses in reported speech usually shift one step back: Present → Past, Present Perfect / Past → Past Perfect, will → would. Pronouns and adverbials also change (today → that day) if the reference point is different. If a fact is still true, the shift is sometimes skipped: He said the Earth is round.",
            "keyPointsUk": [
              "said + зсув часів назад",
              "will стає would",
              "вічні факти можна не зсувати"
            ],
            "keyPointsEn": [
              "said plus a tense shift back",
              "will becomes would",
              "eternal facts can keep the present"
            ]
          },
          {
            "id": "en-rs-1",
            "type": "mcq",
            "promptUk": "She said, 'I am tired.' → She said she ___ tired.",
            "promptEn": "She said, 'I am tired.' → She said she ___ tired.",
            "options": [
              "was",
              "is",
              "were",
              "had been"
            ],
            "correctIndex": 0,
            "explanationUk": "Present Simple зсувається в Past Simple.",
            "explanationEn": "Present Simple shifts to Past Simple."
          },
          {
            "id": "en-rs-2",
            "type": "fill_blank",
            "promptUk": "will → would",
            "promptEn": "will → would",
            "sentence": "'I will help.' → He said he ___ help.",
            "accepted": [
              "would"
            ]
          },
          {
            "id": "en-rs-3",
            "type": "translate",
            "promptUk": "Перекладіть непрямою мовою від 'I have finished.' після she said",
            "promptEn": "Report 'I have finished.' after she said",
            "source": "She said she had finished.",
            "accepted": [
              "вона сказала що вже закінчила",
              "вона сказала що закінчила"
            ],
            "direction": "en_uk"
          }
        ],
      },
      {
        slug: "en-rep-questions",
        titleUk: "Непрямі питання",
        titleEn: "Reported questions",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "en-rq-c",
            "type": "concept",
            "promptUk": "Порядок слів у непрямому питанні",
            "promptEn": "Word order in reported questions",
            "bodyUk": "Непряме питання має порядок розповіді, не питальний: She asked where I lived, не where did I live. Для yes/no використовують if або whether: He asked if I was ready. Питальний допоміжний do/does/did зникає; зсув часів той самий, що в розповідях. Крапки замінюють знак питання.",
            "bodyEn": "A reported question uses statement order, not question order: She asked where I lived, not where did I live. For yes/no questions use if or whether: He asked if I was ready. The auxiliary do/does/did disappears; the tense shift is the same as in statements. A full stop replaces the question mark.",
            "keyPointsUk": [
              "порядок слів як у розповіді",
              "yes/no → if/whether",
              "без do/does/did"
            ],
            "keyPointsEn": [
              "statement word order",
              "yes/no becomes if/whether",
              "no do/does/did"
            ]
          },
          {
            "id": "en-rq-1",
            "type": "mcq",
            "promptUk": "'Where do you work?' → She asked where ___.",
            "promptEn": "'Where do you work?' → She asked where ___.",
            "options": [
              "I worked",
              "do I work",
              "did I work",
              "I do work"
            ],
            "correctIndex": 0,
            "explanationUk": "Порядок підмет + присудок, час зсунуто.",
            "explanationEn": "Subject-verb order, with the tense shifted."
          },
          {
            "id": "en-rq-2",
            "type": "fill_blank",
            "promptUk": "Yes/no",
            "promptEn": "Yes/no",
            "sentence": "'Are you free?' → He asked ___ I was free.",
            "accepted": [
              "if",
              "whether"
            ]
          },
          {
            "id": "en-rq-3",
            "type": "order_words",
            "promptUk": "Складіть непряме питання",
            "promptEn": "Build the reported question",
            "words": [
              "left",
              "train",
              "the",
              "when",
              "asked",
              "She"
            ],
            "correct": [
              "She",
              "asked",
              "when",
              "the",
              "train",
              "left"
            ]
          }
        ],
      },
      {
        slug: "en-rep-commands",
        titleUk: "Прохання і накази",
        titleEn: "Requests and commands",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "en-rc-c",
            "type": "concept",
            "promptUk": "ask/tell + to",
            "promptEn": "ask/tell + to",
            "bodyUk": "Накази й прохання передають через tell/ask + object + to-infinitive: She told me to wait. She asked me to wait. Заперечення: told me not to be late (not стоїть перед to). say не бере цю конструкцію так само (не she said me to wait). Для let's інколи використовують suggested + -ing.",
            "bodyEn": "Commands and requests are reported with tell/ask + object + to-infinitive: She told me to wait. She asked me to wait. The negative is told me not to be late (not stands before to). say does not take this pattern in the same way (not she said me to wait). For let's, people sometimes use suggested + -ing.",
            "keyPointsUk": [
              "tell/ask + когось + to + V",
              "заперечення: not to",
              "не said me to"
            ],
            "keyPointsEn": [
              "tell/ask + someone + to + V",
              "the negative is not to",
              "not said me to"
            ]
          },
          {
            "id": "en-rc-1",
            "type": "mcq",
            "promptUk": "'Please sit down,' she said. → She asked me ___.",
            "promptEn": "'Please sit down,' she said. → She asked me ___.",
            "options": [
              "to sit down",
              "sit down",
              "sitting down",
              "that I sit"
            ],
            "correctIndex": 0,
            "explanationUk": "ask me to + інфінітив.",
            "explanationEn": "ask me to + infinitive."
          },
          {
            "id": "en-rc-2",
            "type": "fill_blank",
            "promptUk": "Заперечний наказ",
            "promptEn": "A negative command",
            "sentence": "'Don't be late.' → He told us ___ to be late.",
            "accepted": [
              "not"
            ]
          },
          {
            "id": "en-rc-3",
            "type": "mcq",
            "promptUk": "Неправильне:",
            "promptEn": "The incorrect option:",
            "options": [
              "She said me to wait.",
              "She told me to wait.",
              "She asked me to wait.",
              "She told me not to wait."
            ],
            "correctIndex": 0,
            "explanationUk": "say не вживають як say me to.",
            "explanationEn": "say is not used as say me to."
          }
        ],
      },
      {
        slug: "en-rep-time-place",
        titleUk: "today, here, this — зсув орієнтирів",
        titleEn: "today, here, this — shifting deixis",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "en-rd-c",
            "type": "concept",
            "promptUk": "Зсув орієнтирів",
            "promptEn": "Shifting deixis",
            "bodyUk": "Якщо повідомляємо пізніше й в іншому місці, орієнтири змінюються: today → that day, tomorrow → the next day, yesterday → the day before, now → then, here → there, this → that. Якщо розмова ще «сьогодні» і в тому ж місці, зсув не обов'язковий. Дивіться на точку відліку слухача.",
            "bodyEn": "If we report later and in another place, deictic words change: today → that day, tomorrow → the next day, yesterday → the day before, now → then, here → there, this → that. If the conversation is still 'today' and in the same place, the shift is optional. Look at the listener's reference point.",
            "keyPointsUk": [
              "today → that day, tomorrow → the next day",
              "here → there, this → that",
              "зсув залежить від нової точки відліку"
            ],
            "keyPointsEn": [
              "today → that day, tomorrow → the next day",
              "here → there, this → that",
              "the shift depends on the new reference point"
            ]
          },
          {
            "id": "en-rd-1",
            "type": "match",
            "promptUk": "Зіставте зсуви",
            "promptEn": "Match the shifts",
            "pairs": [
              {
                "left": "today",
                "right": "that day"
              },
              {
                "left": "tomorrow",
                "right": "the next day"
              },
              {
                "left": "yesterday",
                "right": "the day before"
              },
              {
                "left": "here",
                "right": "there"
              }
            ]
          },
          {
            "id": "en-rd-2",
            "type": "fill_blank",
            "promptUk": "tomorrow",
            "promptEn": "tomorrow",
            "sentence": "'See you tomorrow.' → She said she would see us the ___ day.",
            "accepted": [
              "next",
              "following"
            ]
          },
          {
            "id": "en-rd-3",
            "type": "mcq",
            "promptUk": "'I will do it now.' → He said he would do it ___.",
            "promptEn": "'I will do it now.' → He said he would do it ___.",
            "options": [
              "then",
              "now завжди",
              "today",
              "here"
            ],
            "correctIndex": 0,
            "explanationUk": "now зазвичай стає then.",
            "explanationEn": "now usually becomes then."
          }
        ],
      },
      {
        slug: "en-rep-review",
        titleUk: "Огляд непрямої мови",
        titleEn: "Reported speech review",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "en-rr-1",
            "type": "mcq",
            "promptUk": "'I can swim.' → She said she ___ swim.",
            "promptEn": "'I can swim.' → She said she ___ swim.",
            "options": [
              "could",
              "can завжди",
              "will",
              "might have"
            ],
            "correctIndex": 0,
            "explanationUk": "can зсувається в could.",
            "explanationEn": "can shifts to could."
          },
          {
            "id": "en-rr-2",
            "type": "mcq",
            "promptUk": "'Why are you late?' → He asked why ___.",
            "promptEn": "'Why are you late?' → He asked why ___.",
            "options": [
              "I was late",
              "was I late",
              "am I late",
              "I am late"
            ],
            "correctIndex": 0,
            "explanationUk": "Порядок розповіді + зсув.",
            "explanationEn": "Statement order plus the shift."
          },
          {
            "id": "en-rr-3",
            "type": "fill_blank",
            "promptUk": "Наказ",
            "promptEn": "A command",
            "sentence": "'Close the door.' → She told him ___ the door.",
            "accepted": [
              "to close",
              "to shut"
            ]
          },
          {
            "id": "en-rr-4",
            "type": "translate",
            "promptUk": "Перекладіть непрямою",
            "promptEn": "Report it",
            "source": "'I will call today,' she said (повідомляємо наступного тижня).",
            "accepted": [
              "she said she would call that day",
              "she said that she would call that day"
            ],
            "direction": "uk_en"
          }
        ],
      },
    ],
  },
  {
    slug: "prepositions-place-time",
    titleUk: "Прийменники місця й часу",
    titleEn: "Prepositions of place and time",
    lessons: [
      {
        slug: "en-prep-place",
        titleUk: "in, on, at — місце",
        titleEn: "in, on, at — place",
        baseXp: 18,
        difficulty: 2,
        isFree: false,
        exercises: [
          {
            "id": "en-pp-c",
            "type": "concept",
            "promptUk": "Три рівні місця",
            "promptEn": "Three levels of place",
            "bodyUk": "at вказує на точку (at the door, at the station, at 14 High Street). on — на поверхні або лінії (on the table, on the wall, on Oxford Street). in — всередині об'єму або території (in the room, in Kyiv, in Ukraine). Винятки варто запам'ятати: at home (не in home), on a bus/train, in a car, at the office як місце роботи. Велике місто — in; конкретна адреса з номером — at.",
            "bodyEn": "at marks a point (at the door, at the station, at 14 High Street). on marks a surface or a line (on the table, on the wall, on Oxford Street). in marks the inside of a volume or a territory (in the room, in Kyiv, in Ukraine). Memorise the exceptions: at home (not in home), on a bus/train, in a car, at the office as a workplace. A city takes in; a street number takes at.",
            "keyPointsUk": [
              "at — точка, on — поверхня, in — всередина",
              "at home, on a bus, in a car",
              "місто — in, адреса з номером — at"
            ],
            "keyPointsEn": [
              "at is a point, on a surface, in an inside",
              "at home, on a bus, in a car",
              "a city takes in, a street number takes at"
            ]
          },
          {
            "id": "en-pp-1",
            "type": "mcq",
            "promptUk": "She lives ___ Kyiv.",
            "promptEn": "She lives ___ Kyiv.",
            "options": [
              "in",
              "on",
              "at",
              "to"
            ],
            "correctIndex": 0,
            "explanationUk": "Місто — територія, тому in.",
            "explanationEn": "A city is a territory, so in."
          },
          {
            "id": "en-pp-2",
            "type": "fill_blank",
            "promptUk": "Точка зустрічі",
            "promptEn": "A meeting point",
            "sentence": "I'll wait ___ the entrance.",
            "accepted": [
              "at"
            ]
          },
          {
            "id": "en-pp-3",
            "type": "mcq",
            "promptUk": "The keys are ___ the table (на поверхні).",
            "promptEn": "The keys are ___ the table (on the surface).",
            "options": [
              "on",
              "in",
              "at",
              "by завжди"
            ],
            "correctIndex": 0,
            "explanationUk": "Поверхня столу — on.",
            "explanationEn": "The table surface takes on."
          }
        ],
      },
      {
        slug: "en-prep-time",
        titleUk: "in, on, at — час",
        titleEn: "in, on, at — time",
        baseXp: 18,
        difficulty: 2,
        isFree: false,
        exercises: [
          {
            "id": "en-pt-c",
            "type": "concept",
            "promptUk": "Часові прийменники",
            "promptEn": "Time prepositions",
            "bodyUk": "at — точний час і деякі святкові точки: at 7 pm, at noon, at midnight, at the weekend (BrE), at Christmas. on — дні й дати: on Monday, on 12 November, on Friday evening. in — довші періоди: in June, in 2026, in the morning, in the 1990s. Винятки: at night (не in night), in the night коли йдеться про конкретну ніч як період. Без прийменника: next week, last year, this morning, every day, yesterday, today, tomorrow.",
            "bodyEn": "at is used for a precise time and some holiday points: at 7 pm, at noon, at midnight, at the weekend (BrE), at Christmas. on is used for days and dates: on Monday, on 12 November, on Friday evening. in is used for longer periods: in June, in 2026, in the morning, in the 1990s. Exceptions: at night (not in night); in the night when you mean a particular night as a period. No preposition with next week, last year, this morning, every day, yesterday, today, tomorrow.",
            "keyPointsUk": [
              "at 7 pm, on Monday, in June",
              "at night, без прийменника: next/last/this/every",
              "дати й дні — on"
            ],
            "keyPointsEn": [
              "at 7 pm, on Monday, in June",
              "at night; no preposition with next/last/this/every",
              "dates and days take on"
            ]
          },
          {
            "id": "en-pt-1",
            "type": "mcq",
            "promptUk": "The call is ___ 15:00.",
            "promptEn": "The call is ___ 15:00.",
            "options": [
              "at",
              "on",
              "in",
              "by завжди"
            ],
            "correctIndex": 0,
            "explanationUk": "Точний час — at.",
            "explanationEn": "A precise clock time takes at."
          },
          {
            "id": "en-pt-2",
            "type": "fill_blank",
            "promptUk": "День тижня",
            "promptEn": "A day of the week",
            "sentence": "We ship ___ Friday.",
            "accepted": [
              "on"
            ]
          },
          {
            "id": "en-pt-3",
            "type": "mcq",
            "promptUk": "I will start ___ June (місяць).",
            "promptEn": "I will start ___ June (the month).",
            "options": [
              "in",
              "on",
              "at",
              "since"
            ],
            "correctIndex": 0,
            "explanationUk": "Місяць — довший період, in.",
            "explanationEn": "A month is a longer period, so in."
          }
        ],
      },
      {
        slug: "en-prep-movement",
        titleUk: "to, into, onto, from, out of",
        titleEn: "to, into, onto, from, out of",
        baseXp: 18,
        difficulty: 2,
        isFree: false,
        exercises: [
          {
            "id": "en-pm-c",
            "type": "concept",
            "promptUk": "Рух",
            "promptEn": "Movement",
            "bodyUk": "to — напрямок до точки (go to work, fly to Berlin). into — рух всередину (walk into the room). onto — рух на поверхню (climb onto the roof). from — вихідна точка (from Kyiv). out of — вихід із об'єму (out of the building). arrive at a place / arrive in a city (не arrive to). get to — досягнути; home без to: go home, не go to home.",
            "bodyEn": "to marks direction toward a point (go to work, fly to Berlin). into marks movement inside (walk into the room). onto marks movement onto a surface (climb onto the roof). from marks the starting point (from Kyiv). out of marks exit from a volume (out of the building). arrive at a place / arrive in a city (not arrive to). get to means reach; home takes no to: go home, not go to home.",
            "keyPointsUk": [
              "to — напрямок, into — всередину, onto — на поверхню",
              "arrive in a city, arrive at a place",
              "go home — без to"
            ],
            "keyPointsEn": [
              "to is direction, into is inside, onto is onto a surface",
              "arrive in a city, arrive at a place",
              "go home takes no to"
            ]
          },
          {
            "id": "en-pm-1",
            "type": "mcq",
            "promptUk": "She went ___ the office (напрямок).",
            "promptEn": "She went ___ the office (direction).",
            "options": [
              "to",
              "into завжди",
              "at",
              "in"
            ],
            "correctIndex": 0,
            "explanationUk": "Напрямок до місця роботи — to.",
            "explanationEn": "Direction toward a workplace is to."
          },
          {
            "id": "en-pm-2",
            "type": "fill_blank",
            "promptUk": "Всередину кімнати",
            "promptEn": "Into the room",
            "sentence": "He walked ___ the meeting room and sat down.",
            "accepted": [
              "into"
            ]
          },
          {
            "id": "en-pm-3",
            "type": "mcq",
            "promptUk": "We arrived ___ Lisbon at noon.",
            "promptEn": "We arrived ___ Lisbon at noon.",
            "options": [
              "in",
              "to",
              "at",
              "into"
            ],
            "correctIndex": 0,
            "explanationUk": "arrive in + місто.",
            "explanationEn": "arrive in plus a city."
          }
        ],
      },
      {
        slug: "en-prep-depend",
        titleUk: "залежні прийменники",
        titleEn: "Dependent prepositions",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "en-pd-c",
            "type": "concept",
            "promptUk": "Дієслово + прийменник",
            "promptEn": "Verb plus a preposition",
            "bodyUk": "Багато дієслів вимагають фіксованого прийменника: depend on, listen to, look at, wait for, belong to, consist of, apply for, complain about, deal with, succeed in, responsible for, interested in, good at, afraid of, similar to. Це не «логіка місця» — їх треба вчитися разом із дієсловом. Після прийменника займенник у object form (depend on him), а дієслово — у -ing (succeed in doing, interested in learning).",
            "bodyEn": "Many verbs take a fixed preposition: depend on, listen to, look at, wait for, belong to, consist of, apply for, complain about, deal with, succeed in, responsible for, interested in, good at, afraid of, similar to. This is not 'place logic' — learn them together with the verb. After a preposition the pronoun is in the object form (depend on him) and a verb takes -ing (succeed in doing, interested in learning).",
            "keyPointsUk": [
              "фіксований прийменник треба вчити з дієсловом",
              "після прийменника: object form і -ing",
              "interested in, good at, responsible for"
            ],
            "keyPointsEn": [
              "learn the fixed preposition with the verb",
              "after a preposition: object form and -ing",
              "interested in, good at, responsible for"
            ]
          },
          {
            "id": "en-pd-1",
            "type": "match",
            "promptUk": "Зіставте прийменник",
            "promptEn": "Match the preposition",
            "pairs": [
              {
                "left": "depend",
                "right": "on"
              },
              {
                "left": "listen",
                "right": "to"
              },
              {
                "left": "interested",
                "right": "in"
              },
              {
                "left": "responsible",
                "right": "for"
              }
            ]
          },
          {
            "id": "en-pd-2",
            "type": "fill_blank",
            "promptUk": "good at",
            "promptEn": "good at",
            "sentence": "She is really good ___ explaining complex ideas.",
            "accepted": [
              "at"
            ]
          },
          {
            "id": "en-pd-3",
            "type": "mcq",
            "promptUk": "We are waiting ___ the review.",
            "promptEn": "We are waiting ___ the review.",
            "options": [
              "for",
              "to",
              "on",
              "at"
            ],
            "correctIndex": 0,
            "explanationUk": "wait for когось/щось.",
            "explanationEn": "wait for someone or something."
          }
        ],
      },
      {
        slug: "en-prep-review",
        titleUk: "Огляд прийменників",
        titleEn: "Prepositions review",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "en-pr-1",
            "type": "mcq",
            "promptUk": "The standup is ___ Monday ___ 10 am.",
            "promptEn": "The standup is ___ Monday ___ 10 am.",
            "options": [
              "on / at",
              "in / at",
              "at / on",
              "in / on"
            ],
            "correctIndex": 0,
            "explanationUk": "День — on, точний час — at.",
            "explanationEn": "A day takes on; a clock time takes at."
          },
          {
            "id": "en-pr-2",
            "type": "fill_blank",
            "promptUk": "Залежний прийменник",
            "promptEn": "A dependent preposition",
            "sentence": "This result depends ___ the input data.",
            "accepted": [
              "on"
            ]
          },
          {
            "id": "en-pr-3",
            "type": "translate",
            "promptUk": "Перекладіть",
            "promptEn": "Translate",
            "source": "I will be at home in the evening.",
            "accepted": [
              "я буду вдома ввечері",
              "буду вдома ввечері"
            ],
            "direction": "en_uk"
          },
          {
            "id": "en-pr-4",
            "type": "mcq",
            "promptUk": "Don't say:",
            "promptEn": "Don't say:",
            "options": [
              "arrive to the airport",
              "arrive at the airport",
              "arrive in Paris",
              "go home"
            ],
            "correctIndex": 0,
            "explanationUk": "arrive не бере to.",
            "explanationEn": "arrive does not take to."
          }
        ],
      },
    ],
  },
  {
    slug: "relative-clauses",
    titleUk: "Відносні речення",
    titleEn: "Relative clauses",
    lessons: [
      {
        slug: "en-rel-who-which",
        titleUk: "who, which, that",
        titleEn: "who, which, that",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "en-rw-c",
            "type": "concept",
            "promptUk": "Означальні займенники",
            "promptEn": "Relative pronouns",
            "bodyUk": "who стосується людей (the engineer who wrote the test). which — речей і тварин (the bug which crashed the build). that може замінювати who/which у визначальних (defining) реченнях: the bug that crashed the build. У невизначальних (з комами) that не ставлять: Kyiv, which is the capital, … Кома змінює сенс: colleagues who speak English — лише ті, що говорять; colleagues, who speak English, — усі вони говорять.",
            "bodyEn": "who refers to people (the engineer who wrote the test). which refers to things and animals (the bug which crashed the build). that can replace who/which in defining clauses: the bug that crashed the build. In non-defining clauses (with commas) that is not used: Kyiv, which is the capital, … A comma changes the meaning: colleagues who speak English — only those who do; colleagues, who speak English, — they all do.",
            "keyPointsUk": [
              "who — люди, which — речі",
              "that — лише в defining-реченнях",
              "коми змінюють значення"
            ],
            "keyPointsEn": [
              "who is for people, which for things",
              "that is only for defining clauses",
              "commas change the meaning"
            ]
          },
          {
            "id": "en-rw-1",
            "type": "mcq",
            "promptUk": "The developer ___ fixed the bug got a bonus.",
            "promptEn": "The developer ___ fixed the bug got a bonus.",
            "options": [
              "who",
              "which",
              "where",
              "whose"
            ],
            "correctIndex": 0,
            "explanationUk": "Людина — who (або that).",
            "explanationEn": "A person takes who (or that)."
          },
          {
            "id": "en-rw-2",
            "type": "fill_blank",
            "promptUk": "Реч",
            "promptEn": "A thing",
            "sentence": "This is the API ___ we documented last week.",
            "accepted": [
              "that",
              "which"
            ]
          },
          {
            "id": "en-rw-3",
            "type": "mcq",
            "promptUk": "У невизначальному реченні з комами не можна:",
            "promptEn": "In a non-defining clause with commas you cannot use:",
            "options": [
              "that",
              "which",
              "who",
              "whose"
            ],
            "correctIndex": 0,
            "explanationUk": "після коми that не вживають.",
            "explanationEn": "that is not used after a comma."
          }
        ],
      },
      {
        slug: "en-rel-where-whose",
        titleUk: "where, when, whose",
        titleEn: "where, when, whose",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "en-rwh-c",
            "type": "concept",
            "promptUk": "Місце, час, приналежність",
            "promptEn": "Place, time, possession",
            "bodyUk": "where замінює in/at which для місць: the office where I work. when — для часу: the year when we launched. whose — приналежність і для людей, і для речей: a team whose backlog is huge; a company whose CEO resigned. Не плутайте whose і who's (who is / who has). Після whose стоїть іменник, не дієслово.",
            "bodyEn": "where replaces in/at which for places: the office where I work. when is used for time: the year when we launched. whose marks possession for both people and things: a team whose backlog is huge; a company whose CEO resigned. Do not confuse whose and who's (who is / who has). After whose comes a noun, not a verb.",
            "keyPointsUk": [
              "where — місце, when — час",
              "whose — приналежність (і для речей)",
              "who's ≠ whose"
            ],
            "keyPointsEn": [
              "where is place, when is time",
              "whose marks possession, including for things",
              "who's is not whose"
            ]
          },
          {
            "id": "en-rwh-1",
            "type": "fill_blank",
            "promptUk": "Місце",
            "promptEn": "Place",
            "sentence": "This is the desk ___ I sit.",
            "accepted": [
              "where"
            ]
          },
          {
            "id": "en-rwh-2",
            "type": "mcq",
            "promptUk": "A product ___ docs are unclear will lose users.",
            "promptEn": "A product ___ docs are unclear will lose users.",
            "options": [
              "whose",
              "who's",
              "which",
              "where"
            ],
            "correctIndex": 0,
            "explanationUk": "docs належать продукту — whose.",
            "explanationEn": "The docs belong to the product — whose."
          },
          {
            "id": "en-rwh-3",
            "type": "translate",
            "promptUk": "Перекладіть",
            "promptEn": "Translate",
            "source": "the year when we met",
            "accepted": [
              "рік коли ми познайомилися",
              "той рік коли ми зустрілися"
            ],
            "direction": "en_uk"
          }
        ],
      },
      {
        slug: "en-rel-omission",
        titleUk: "Пропуск займенника і прийменник",
        titleEn: "Omitting the pronoun, and prepositions",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "en-ro-c",
            "type": "concept",
            "promptUk": "Коли that/who можна опустити",
            "promptEn": "When that/who can be dropped",
            "bodyUk": "Якщо відносний займенник є додатком, його можна опустити: the book (that) I read, the person (who) I met. Якщо він є підметом, пропускати не можна: the book that arrived (не the book arrived як відносне). Прийменник може стояти в кінці (the issue I told you about) або, формальніше, перед займенником (the issue about which I told you). Після прийменника that не ставлять: about which, не about that.",
            "bodyEn": "If the relative pronoun is an object, you can omit it: the book (that) I read, the person (who) I met. If it is the subject, you cannot drop it: the book that arrived (not the book arrived as a relative). A preposition can go at the end (the issue I told you about) or, more formally, before the pronoun (the issue about which I told you). After a preposition, that is not used: about which, not about that.",
            "keyPointsUk": [
              "додаток можна опустити, підмет — ні",
              "прийменник часто в кінці речення",
              "після прийменника: which/whom, не that"
            ],
            "keyPointsEn": [
              "an object pronoun can be dropped, a subject cannot",
              "the preposition often goes at the end",
              "after a preposition use which/whom, not that"
            ]
          },
          {
            "id": "en-ro-1",
            "type": "mcq",
            "promptUk": "Де можна опустити that?",
            "promptEn": "Where can you drop that?",
            "options": [
              "the tool (that) we chose",
              "the tool that failed",
              "the team that arrived",
              "a bug that blocks login"
            ],
            "correctIndex": 0,
            "explanationUk": "we chose — that є додатком.",
            "explanationEn": "In we chose, that is the object."
          },
          {
            "id": "en-ro-2",
            "type": "mcq",
            "promptUk": "Формальний варіант: the topic ___ I wrote.",
            "promptEn": "The formal option: the topic ___ I wrote.",
            "options": [
              "about which",
              "about that",
              "which about",
              "that about"
            ],
            "correctIndex": 0,
            "explanationUk": "прийменник + which, не that.",
            "explanationEn": "preposition + which, not that."
          },
          {
            "id": "en-ro-3",
            "type": "fill_blank",
            "promptUk": "Кінцевий прийменник",
            "promptEn": "A final preposition",
            "sentence": "This is the feature I asked you ___.",
            "accepted": [
              "about",
              "for"
            ]
          }
        ],
      },
      {
        slug: "en-rel-nondefining",
        titleUk: "Невизначальні речення",
        titleEn: "Non-defining clauses",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "en-rnd-c",
            "type": "concept",
            "promptUk": "Коми й додаткова інформація",
            "promptEn": "Commas and extra information",
            "bodyUk": "Невизначальне відносне речення додає інформацію про вже відомий іменник і виділяється комами (на письмі) або паузою (в мовленні): The API, which we launched in May, is stable. Його можна викинути, і речення лишиться граматичним. that тут не використовують; which/who обов'язкові. Для людей у формальному стилі — who, не which. Такі речення не обмежують множину: my parents, who live in Lviv — обидва батьки.",
            "bodyEn": "A non-defining relative clause adds information about an already identified noun and is set off by commas in writing (or a pause in speech): The API, which we launched in May, is stable. You can remove it and the sentence stays grammatical. that is not used here; which/who are required. For people in formal style use who, not which. These clauses do not restrict the set: my parents, who live in Lviv — both parents.",
            "keyPointsUk": [
              "коми відокремлюють додаткову інформацію",
              "that не вживають",
              "речення можна викинути без втрати граматики"
            ],
            "keyPointsEn": [
              "commas set off extra information",
              "that is not used",
              "the clause can be removed without breaking grammar"
            ]
          },
          {
            "id": "en-rnd-1",
            "type": "mcq",
            "promptUk": "Правильне:",
            "promptEn": "The correct sentence:",
            "options": [
              "Lviv, which is in western Ukraine, is famous for coffee.",
              "Lviv, that is in western Ukraine, is famous for coffee.",
              "Lviv which is in western Ukraine is famous for coffee. (без ком, якщо місто вже відоме)",
              "Lviv, who is in western Ukraine, is famous for coffee."
            ],
            "correctIndex": 0,
            "explanationUk": "Місто вже ідентифіковане — which з комами.",
            "explanationEn": "The city is already identified — which with commas."
          },
          {
            "id": "en-rnd-2",
            "type": "fill_blank",
            "promptUk": "Займенник для речі з комами",
            "promptEn": "The pronoun for a thing, with commas",
            "sentence": "Our CMS, ___ we migrated last year, is faster now.",
            "accepted": [
              "which"
            ]
          },
          {
            "id": "en-rnd-3",
            "type": "translate",
            "promptUk": "Перекладіть",
            "promptEn": "Translate",
            "source": "My manager, who is on leave, asked me to lead.",
            "accepted": [
              "мій керівник який зараз у відпустці попросив мене вести",
              "мій менеджер що у відпустці попросив мене очолити"
            ],
            "direction": "en_uk"
          }
        ],
      },
      {
        slug: "en-rel-review",
        titleUk: "Огляд відносних речень",
        titleEn: "Relative clauses review",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "en-rrv-1",
            "type": "match",
            "promptUk": "Зіставте",
            "promptEn": "Match",
            "pairs": [
              {
                "left": "who",
                "right": "people"
              },
              {
                "left": "which",
                "right": "things"
              },
              {
                "left": "whose",
                "right": "possession"
              },
              {
                "left": "where",
                "right": "places"
              }
            ]
          },
          {
            "id": "en-rrv-2",
            "type": "mcq",
            "promptUk": "the engineer I hired — займенник опущено бо він:",
            "promptEn": "In 'the engineer I hired' the pronoun is omitted because it is:",
            "options": [
              "an object",
              "a subject",
              "possessive",
              "an adverb"
            ],
            "correctIndex": 0,
            "explanationUk": "I hired (him) — додаток.",
            "explanationEn": "I hired (him) — an object."
          },
          {
            "id": "en-rrv-3",
            "type": "fill_blank",
            "promptUk": "Приналежність",
            "promptEn": "Possession",
            "sentence": "a service ___ uptime is 99.9%",
            "accepted": [
              "whose"
            ]
          },
          {
            "id": "en-rrv-4",
            "type": "mcq",
            "promptUk": "Не можна:",
            "promptEn": "You cannot say:",
            "options": [
              "the city about that I wrote",
              "the city I wrote about",
              "the city about which I wrote",
              "the city that I wrote about"
            ],
            "correctIndex": 0,
            "explanationUk": "після прийменника that не ставлять.",
            "explanationEn": "that does not follow a preposition."
          }
        ],
      },
    ],
  },
  {
    slug: "modal-verbs",
    titleUk: "Модальні дієслова",
    titleEn: "Modal verbs",
    lessons: [
      {
        slug: "en-mod-can-could",
        titleUk: "can, could, be able to",
        titleEn: "can, could, be able to",
        baseXp: 18,
        difficulty: 2,
        isFree: false,
        exercises: [
          {
            "id": "en-mc-c",
            "type": "concept",
            "promptUk": "Здатність і дозвіл",
            "promptEn": "Ability and permission",
            "bodyUk": "can виражає вміння в теперішньому (I can write SQL) і неформальний дозвіл (You can go). could — минуле вміння (I could swim at five) або ввічливе прохання (Could you review this?). be able to заповнює часи, яких у can немає: will be able to, have been able to. Для одноразового успіху в минулому природніше was able to / managed to, ніж could: We were able to ship on Friday (конкретний раз). Заперечення can't — і невміння, і заборона, залежно від контексту.",
            "bodyEn": "can expresses present ability (I can write SQL) and informal permission (You can go). could is past ability (I could swim at five) or a polite request (Could you review this?). be able to covers tenses that can lacks: will be able to, have been able to. For a one-off success in the past, was able to / managed to is more natural than could: We were able to ship on Friday (a specific occasion). The negative can't is either inability or prohibition, depending on context.",
            "keyPointsUk": [
              "can — теперішнє вміння й неформальний дозвіл",
              "could — минуле вміння або ввічливе прохання",
              "одноразовий успіх у минулому: was able to"
            ],
            "keyPointsEn": [
              "can is present ability and informal permission",
              "could is past ability or a polite request",
              "a one-off past success takes was able to"
            ]
          },
          {
            "id": "en-mc-1",
            "type": "mcq",
            "promptUk": "Для майбутнього вміння краще:",
            "promptEn": "For future ability, prefer:",
            "options": [
              "will be able to",
              "will can",
              "can will",
              "could will"
            ],
            "correctIndex": 0,
            "explanationUk": "у can немає майбутнього часу.",
            "explanationEn": "can has no future form."
          },
          {
            "id": "en-mc-2",
            "type": "fill_blank",
            "promptUk": "Ввічливе прохання",
            "promptEn": "A polite request",
            "sentence": "___ you send the logs, please?",
            "accepted": [
              "Could",
              "Can",
              "Would"
            ]
          },
          {
            "id": "en-mc-3",
            "type": "translate",
            "promptUk": "Перекладіть",
            "promptEn": "Translate",
            "source": "She was able to fix the outage in an hour.",
            "accepted": [
              "вона змогла усунути аварію за годину",
              "їй вдалося виправити збій за годину"
            ],
            "direction": "en_uk"
          }
        ],
      },
      {
        slug: "en-mod-must-have",
        titleUk: "must, have to, should",
        titleEn: "must, have to, should",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "en-mm-c",
            "type": "concept",
            "promptUk": "Обов'язок і порада",
            "promptEn": "Obligation and advice",
            "bodyUk": "must — сильний обов'язок з боку мовця або внутрішня необхідність (You must rotate the keys). have to — зовнішній обов'язок (правило, закон, політика): I have to wear a badge. Заперечення різні: mustn't — заборона; don't have to — немає обов'язку (можна не робити). should / ought to — порада, не наказ: You should add tests. Для минулого обов'язку — had to; докір — should have + V3 (You should have asked).",
            "bodyEn": "must is a strong obligation from the speaker or an inner necessity (You must rotate the keys). have to is an external obligation (a rule, a law, a policy): I have to wear a badge. The negatives differ: mustn't is a prohibition; don't have to means there is no obligation (you may skip it). should / ought to is advice, not an order: You should add tests. Past obligation is had to; a reproach is should have + past participle (You should have asked).",
            "keyPointsUk": [
              "must — обов'язок мовця, have to — зовнішнє правило",
              "mustn't ≠ don't have to",
              "should — порада; should have — докір про минуле"
            ],
            "keyPointsEn": [
              "must is the speaker's obligation, have to is an external rule",
              "mustn't is not don't have to",
              "should is advice; should have is a past reproach"
            ]
          },
          {
            "id": "en-mm-1",
            "type": "mcq",
            "promptUk": "You ___ come if you are busy (можна не приходити).",
            "promptEn": "You ___ come if you are busy (you may skip it).",
            "options": [
              "don't have to",
              "mustn't",
              "shouldn't have to завжди",
              "must not обов'язково"
            ],
            "correctIndex": 0,
            "explanationUk": "don't have to — немає обов'язку.",
            "explanationEn": "don't have to means no obligation."
          },
          {
            "id": "en-mm-2",
            "type": "mcq",
            "promptUk": "You ___ share production secrets (заборона).",
            "promptEn": "You ___ share production secrets (a prohibition).",
            "options": [
              "mustn't",
              "don't have to",
              "should",
              "can"
            ],
            "correctIndex": 0,
            "explanationUk": "mustn't — не можна.",
            "explanationEn": "mustn't means you must not."
          },
          {
            "id": "en-mm-3",
            "type": "fill_blank",
            "promptUk": "Порада",
            "promptEn": "Advice",
            "sentence": "You ___ write a postmortem after a major incident.",
            "accepted": [
              "should",
              "ought to"
            ]
          }
        ],
      },
      {
        slug: "en-mod-may-might",
        titleUk: "may, might, must (ймовірність)",
        titleEn: "may, might, must (probability)",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "en-my-c",
            "type": "concept",
            "promptUk": "Ступінь упевненості",
            "promptEn": "Degree of certainty",
            "bodyUk": "must + інфінітив може означати логічний висновок, не обов'язок: The tests are red — the deploy must have failed. may / might — можливість; might часто трохи слабший. can't — логічне виключення: It can't be the DNS, we already checked. Для минулого: must have + V3 (ймовірно сталося), might have + V3 (можливо сталося), can't have + V3 (не могло статись). Не плутайте must = обов'язок і must = висновок: контекст і тон вирішують.",
            "bodyEn": "must + infinitive can be a logical conclusion, not an obligation: The tests are red — the deploy must have failed. may / might express possibility; might is often a little weaker. can't is a logical exclusion: It can't be the DNS, we already checked. For the past: must have + past participle (probably happened), might have + past participle (possibly happened), can't have + past participle (could not have happened). Do not confuse must as obligation with must as a conclusion: context and tone decide.",
            "keyPointsUk": [
              "must + V — також логічний висновок",
              "may/might — можливість",
              "минуле: must/might/can't have + V3"
            ],
            "keyPointsEn": [
              "must + V can also be a logical conclusion",
              "may/might express possibility",
              "the past uses must/might/can't have + V3"
            ]
          },
          {
            "id": "en-my-1",
            "type": "mcq",
            "promptUk": "The office is dark. They ___ have left already (висновок).",
            "promptEn": "The office is dark. They ___ have left already (a conclusion).",
            "options": [
              "must",
              "should як наказ",
              "can",
              "will must"
            ],
            "correctIndex": 0,
            "explanationUk": "must have — майже впевнений висновок.",
            "explanationEn": "must have is a near-certain conclusion."
          },
          {
            "id": "en-my-2",
            "type": "fill_blank",
            "promptUk": "Слабка можливість у минулому",
            "promptEn": "A weak past possibility",
            "sentence": "The packet ___ have been dropped on the edge, but we are not sure.",
            "accepted": [
              "might",
              "may",
              "could"
            ]
          },
          {
            "id": "en-my-3",
            "type": "mcq",
            "promptUk": "That ___ be the right SHA — I built this commit myself (виключення).",
            "promptEn": "That ___ be the right SHA — I built this commit myself (exclusion).",
            "options": [
              "can't",
              "mustn't як заборона",
              "don't have to",
              "shouldn't завжди"
            ],
            "correctIndex": 0,
            "explanationUk": "can't — логічно неможливо.",
            "explanationEn": "can't means it is logically impossible."
          }
        ],
      },
      {
        slug: "en-mod-will-would",
        titleUk: "will, would, shall",
        titleEn: "will, would, shall",
        baseXp: 18,
        difficulty: 2,
        isFree: false,
        exercises: [
          {
            "id": "en-mw-c",
            "type": "concept",
            "promptUk": "Майбутнє, звички, ввічливість",
            "promptEn": "Future, habits, politeness",
            "bodyUk": "will — майбутнє, обіцянка або спонтанне рішення: I'll add a test. would — гіпотеза (I would retry), ввічливе прохання (Would you mind…?) і минула звичка (On-call would page us at 3 am). shall у сучасному технічному тексті рідкісний; у специфікаціях RFC shall означає вимогу (MUST). won't — відмова або відмова системи: The service won't start. would like — ввічливе бажання, не the same as want у прямому тоні.",
            "bodyEn": "will marks the future, a promise, or a spontaneous decision: I'll add a test. would marks a hypothesis (I would retry), a polite request (Would you mind…?) and a past habit (On-call would page us at 3 am). shall is rare in modern technical speech; in RFC specifications shall marks a requirement (MUST). won't is a refusal or a system that refuses: The service won't start. would like is a polite wish, not the same tone as a blunt want.",
            "keyPointsUk": [
              "will — майбутнє, обіцянка, спонтанне рішення",
              "would — гіпотеза, ввічливість, минула звичка",
              "у RFC shall = вимога"
            ],
            "keyPointsEn": [
              "will is future, a promise, or a spontaneous decision",
              "would is a hypothesis, politeness, or a past habit",
              "in RFCs shall means a requirement"
            ]
          },
          {
            "id": "en-mw-1",
            "type": "mcq",
            "promptUk": "On-call ___ wake us every Sunday last year (минула звичка).",
            "promptEn": "On-call ___ wake us every Sunday last year (a past habit).",
            "options": [
              "would",
              "will",
              "shall",
              "must"
            ],
            "correctIndex": 0,
            "explanationUk": "would + інфінітив — минула звичка.",
            "explanationEn": "would + infinitive is a past habit."
          },
          {
            "id": "en-mw-2",
            "type": "fill_blank",
            "promptUk": "Спонтанне рішення",
            "promptEn": "A spontaneous decision",
            "sentence": "The build is red. I___ restart the runner.",
            "accepted": [
              "'ll",
              " will"
            ]
          },
          {
            "id": "en-mw-3",
            "type": "translate",
            "promptUk": "Перекладіть ввічливо",
            "promptEn": "Translate politely",
            "source": "Would you mind reviewing this PR?",
            "accepted": [
              "чи не могли б ви переглянути цей PR",
              "чи не проти переглянути цей PR"
            ],
            "direction": "en_uk"
          }
        ],
      },
      {
        slug: "en-mod-review",
        titleUk: "Огляд модальних",
        titleEn: "Modal verbs review",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "en-mrv-1",
            "type": "match",
            "promptUk": "Зіставте значення",
            "promptEn": "Match the meaning",
            "pairs": [
              {
                "left": "mustn't",
                "right": "prohibition"
              },
              {
                "left": "don't have to",
                "right": "no obligation"
              },
              {
                "left": "should",
                "right": "advice"
              },
              {
                "left": "must have + V3",
                "right": "logical conclusion about the past"
              }
            ]
          },
          {
            "id": "en-mrv-2",
            "type": "mcq",
            "promptUk": "I ___ wear a pass — security policy requires it.",
            "promptEn": "I ___ wear a pass — security policy requires it.",
            "options": [
              "have to",
              "must як особисте бажання лише",
              "can",
              "might"
            ],
            "correctIndex": 0,
            "explanationUk": "зовнішнє правило — have to.",
            "explanationEn": "an external rule takes have to."
          },
          {
            "id": "en-mrv-3",
            "type": "fill_blank",
            "promptUk": "Майбутнє вміння",
            "promptEn": "Future ability",
            "sentence": "After the workshop you will be ___ to write the query yourself.",
            "accepted": [
              "able"
            ]
          },
          {
            "id": "en-mrv-4",
            "type": "mcq",
            "promptUk": "You should have asked — це:",
            "promptEn": "You should have asked is:",
            "options": [
              "a reproach about the past",
              "a future obligation",
              "a prohibition",
              "a permission"
            ],
            "correctIndex": 0,
            "explanationUk": "should have — докір щодо минулого.",
            "explanationEn": "should have is a reproach about the past."
          }
        ],
      },
    ],
  },
  {
    slug: "tech-english",
    titleUk: "Технічна англійська",
    titleEn: "Technical English",
    lessons: [
      {
        slug: "en-tech-email",
        titleUk: "Робочі листи",
        titleEn: "Work emails",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "en-te-c",
            "type": "concept",
            "promptUk": "Структура й тон листа",
            "promptEn": "Email structure and tone",
            "bodyUk": "Короткий службовий лист має тему, яка вже каже дію (Request: review of PR #412, не Hi), привітання, один абзац контексту, чітке прохання з дедлайном і ввічливе закінчення. Please finds attached застаріле й важке; природніше I'm attaching… або Attached is…. Could you / Would you mind м'якші за You need to. У відповіді цитуйте лише потрібне і відповідайте на кожен пункт. Unclear subjects і Reply-all без потреби витрачають час команди.",
            "bodyEn": "A short work email has a subject that already states the action (Request: review of PR #412, not Hi), a greeting, one paragraph of context, a clear ask with a deadline, and a polite close. Please find attached is dated and heavy; I'm attaching… or Attached is… is more natural. Could you / Would you mind are softer than You need to. In a reply, quote only what is needed and answer each point. Unclear subjects and unnecessary Reply-all waste the team's time.",
            "keyPointsUk": [
              "тема листа має називати дію",
              "чітке прохання і дедлайн",
              "м'які форми Could you / Would you mind"
            ],
            "keyPointsEn": [
              "the subject line should name the action",
              "a clear ask and a deadline",
              "softer forms: Could you / Would you mind"
            ]
          },
          {
            "id": "en-te-1",
            "type": "mcq",
            "promptUk": "Краща тема:",
            "promptEn": "The better subject:",
            "options": [
              "Request: review of PR #412 by 16:00",
              "Hi",
              "Question",
              "Please"
            ],
            "correctIndex": 0,
            "explanationUk": "Тема вже містить дію, артефакт і дедлайн.",
            "explanationEn": "The subject already has the action, the artifact and a deadline."
          },
          {
            "id": "en-te-2",
            "type": "fill_blank",
            "promptUk": "Прикріплення",
            "promptEn": "An attachment",
            "sentence": "I am ___ the logs and the timeline.",
            "accepted": [
              "attaching"
            ]
          },
          {
            "id": "en-te-3",
            "type": "order_words",
            "promptUk": "Складіть ввічливе прохання",
            "promptEn": "Build a polite request",
            "words": [
              "Friday",
              "by",
              "this",
              "review",
              "you",
              "Could"
            ],
            "correct": [
              "Could",
              "you",
              "review",
              "this",
              "by",
              "Friday"
            ]
          }
        ],
      },
      {
        slug: "en-tech-standups",
        titleUk: "Стендап і статус",
        titleEn: "Stand-ups and status",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "en-ts-c",
            "type": "concept",
            "promptUk": "Три речення статусу",
            "promptEn": "Three sentences of status",
            "bodyUk": "Корисний стендап: що зроблено, що далі, що блокує — коротко, без роману. Yesterday I shipped the retry logic. Today I'll add metrics. I'm blocked on access to staging. Уникайте We are working on it без деталей: назвіть артефакт і наступний крок. Якщо блокера немає, так і скажіть (No blockers). Пасив I'm being blocked by X ясніший, коли треба назвати залежність, не людину. Yesterday I was doing meetings — слабкий статус; назвіть результат.",
            "bodyEn": "A useful stand-up is: what was done, what is next, what is blocked — short, not a novel. Yesterday I shipped the retry logic. Today I'll add metrics. I'm blocked on access to staging. Avoid We are working on it with no detail: name the artifact and the next step. If there is no blocker, say so (No blockers). The passive I'm being blocked by X is clearer when you need to name a dependency, not a person. Yesterday I was doing meetings is a weak status; name a result.",
            "keyPointsUk": [
              "зроблено / далі / блокер",
              "називайте артефакт і наступний крок",
              "No blockers — теж інформація"
            ],
            "keyPointsEn": [
              "done / next / blocker",
              "name the artifact and the next step",
              "No blockers is information too"
            ]
          },
          {
            "id": "en-ts-1",
            "type": "mcq",
            "promptUk": "Найкращий статус:",
            "promptEn": "The best status:",
            "options": [
              "Yesterday I shipped retry logic. Today I'll add metrics. Blocked on staging access.",
              "We are working on it.",
              "Yesterday I was in meetings.",
              "It's going fine."
            ],
            "correctIndex": 0,
            "explanationUk": "Є результат, план і блокер.",
            "explanationEn": "It has a result, a plan and a blocker."
          },
          {
            "id": "en-ts-2",
            "type": "fill_blank",
            "promptUk": "Блокер",
            "promptEn": "A blocker",
            "sentence": "I am ___ on a review from the security team.",
            "accepted": [
              "blocked"
            ]
          },
          {
            "id": "en-ts-3",
            "type": "translate",
            "promptUk": "Перекладіть",
            "promptEn": "Translate",
            "source": "No blockers. I'll open the PR today.",
            "accepted": [
              "блокерів немає відкрию PR сьогодні",
              "немає блокерів я відкрию PR сьогодні"
            ],
            "direction": "en_uk"
          }
        ],
      },
      {
        slug: "en-tech-bugs",
        titleUk: "Опис багів і інцидентів",
        titleEn: "Bug and incident reports",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "en-tb-c",
            "type": "concept",
            "promptUk": "Відтворювані звіти",
            "promptEn": "Reproducible reports",
            "bodyUk": "Хороший баг-репорт: очікувана поведінка, фактична, кроки відтворення, середовище (браузер, версія, акаунт), логи чи скрін. Steps to reproduce нумеруйте. Severity — вплив на користувача, priority — коли чинимо. Для інциденту потрібні impact, start time, current workaround і communication plan. Уникайте It doesn't work і The system is slow без виміру (p95 latency went from 200 ms to 2 s). Після інциденту — postmortem без звинувачень: що сталося, чому, що змінимо.",
            "bodyEn": "A good bug report has expected behaviour, actual behaviour, steps to reproduce, the environment (browser, version, account), and logs or a screenshot. Number the steps to reproduce. Severity is impact on the user; priority is when we fix it. An incident needs impact, start time, the current workaround and a communication plan. Avoid It doesn't work and The system is slow with no measurement (p95 latency went from 200 ms to 2 s). After an incident, a blameless postmortem: what happened, why, and what we will change.",
            "keyPointsUk": [
              "очікуване, фактичне, кроки, середовище",
              "severity ≠ priority",
              "вимірюйте, не кажіть просто slow"
            ],
            "keyPointsEn": [
              "expected, actual, steps, environment",
              "severity is not priority",
              "measure; do not just say slow"
            ]
          },
          {
            "id": "en-tb-1",
            "type": "mcq",
            "promptUk": "Чого бракує в «The checkout is broken»?",
            "promptEn": "What is missing from 'The checkout is broken'?",
            "options": [
              "expected vs actual, steps, environment",
              "лише емоція автора",
              "назви компанії",
              "кольори кнопки обов'язково"
            ],
            "correctIndex": 0,
            "explanationUk": "Немає відтворення й очікуваної поведінки.",
            "explanationEn": "There is no reproduction and no expected behaviour."
          },
          {
            "id": "en-tb-2",
            "type": "fill_blank",
            "promptUk": "Вплив",
            "promptEn": "Impact",
            "sentence": "p95 ___ rose from 200 ms to two seconds.",
            "accepted": [
              "latency",
              "response time"
            ]
          },
          {
            "id": "en-tb-3",
            "type": "match",
            "promptUk": "Зіставте",
            "promptEn": "Match",
            "pairs": [
              {
                "left": "severity",
                "right": "user impact"
              },
              {
                "left": "priority",
                "right": "when we fix it"
              },
              {
                "left": "workaround",
                "right": "temporary way to reduce impact"
              },
              {
                "left": "postmortem",
                "right": "blameless review after the incident"
              }
            ]
          }
        ],
      },
      {
        slug: "en-tech-docs",
        titleUk: "Документація й ADR",
        titleEn: "Documentation and ADRs",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "en-td-c",
            "type": "concept",
            "promptUk": "Читач і рішення",
            "promptEn": "The reader and the decision",
            "bodyUk": "Документація відповідає на питання конкретного читача: як запустити, як викликати API, які обмеження. Пишіть у теперішньому часі, активному стані (The service returns 409, не 409 will be returned). Приклади мають бути копійованими й правдивими. Architecture Decision Record (ADR) фіксує контекст, варіанти, рішення і наслідки — щоб через рік було зрозуміло чому, не лише що. Застаріла документація гірша за коротку: позначте дату й власника, видаляйте мертві сторінки.",
            "bodyEn": "Documentation answers a specific reader's question: how to run it, how to call the API, what the limits are. Write in the present tense and the active voice (The service returns 409, not 409 will be returned). Examples should be copy-pasteable and true. An Architecture Decision Record (ADR) captures context, options, the decision and consequences — so that a year later you can see why, not only what. Stale documentation is worse than short documentation: date it, name an owner, and delete dead pages.",
            "keyPointsUk": [
              "відповідайте на питання читача",
              "активний стан і робочі приклади",
              "ADR: контекст, варіанти, рішення, наслідки"
            ],
            "keyPointsEn": [
              "answer the reader's question",
              "active voice and working examples",
              "an ADR: context, options, decision, consequences"
            ]
          },
          {
            "id": "en-td-1",
            "type": "mcq",
            "promptUk": "ADR насамперед фіксує:",
            "promptEn": "An ADR primarily records:",
            "options": [
              "why a decision was made, and the alternatives",
              "лише назву репозиторію",
              "колір логотипа",
              "розклад відпусток"
            ],
            "correctIndex": 0,
            "explanationUk": "Головне — рішення і чому не інші варіанти.",
            "explanationEn": "The point is the decision and why not the other options."
          },
          {
            "id": "en-td-2",
            "type": "fill_blank",
            "promptUk": "Стан дієслова",
            "promptEn": "Verb voice",
            "sentence": "The service ___ 409 when the name already exists.",
            "accepted": [
              "returns"
            ]
          },
          {
            "id": "en-td-3",
            "type": "translate",
            "promptUk": "Перекладіть",
            "promptEn": "Translate",
            "source": "This example is copy-pasteable and was tested on staging.",
            "accepted": [
              "цей приклад можна скопіювати і він перевірений на staging",
              "цей приклад копіюється і був протестований на стейджинг"
            ],
            "direction": "en_uk"
          }
        ],
      },
      {
        slug: "en-tech-meetings",
        titleUk: "Технічні зустрічі",
        titleEn: "Technical meetings",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "en-tm-c",
            "type": "concept",
            "promptUk": "Порядок денний і підсумок",
            "promptEn": "Agenda and notes",
            "bodyUk": "Зустріч без порядку денного майже завжди довша, ніж треба. Порядок: мета, пункти з часом, потрібні люди, рішення які треба прийняти. Почніть із мети в одному реченні (We are here to choose a queue). Фасилітатор стежить за часом і паркує побічні теми. Наприкінці: рішення, власники, дедліни — записані в чаті чи документі, не лише в пам'яті. If we can do this async, cancel the meeting — нормальна культура. Let's take this offline — для тем, що не для всієї кімнати.",
            "bodyEn": "A meeting without an agenda is almost always longer than it needs to be. An agenda lists the goal, timed items, the people who are needed, and the decisions that must be taken. Start with the goal in one sentence (We are here to choose a queue). The facilitator watches the clock and parks side topics. At the end: decisions, owners, deadlines — written in chat or a doc, not only in memory. If we can do this async, cancel the meeting is a healthy culture. Let's take this offline is for topics that are not for the whole room.",
            "keyPointsUk": [
              "мета в одному реченні",
              "рішення, власники, дедліни — письмово",
              "скасовуйте зустріч, якщо можна асинхронно"
            ],
            "keyPointsEn": [
              "the goal in one sentence",
              "decisions, owners, deadlines in writing",
              "cancel the meeting if it can be async"
            ]
          },
          {
            "id": "en-tm-1",
            "type": "mcq",
            "promptUk": "Чим закінчити зустріч:",
            "promptEn": "How should a meeting end?",
            "options": [
              "decisions, owners, deadlines written down",
              "лише Thanks everyone",
              "новим мозковим штурмом без запису",
              "мовчазним виходом"
            ],
            "correctIndex": 0,
            "explanationUk": "Без запису рішення зникне.",
            "explanationEn": "Without a written record the decision will vanish."
          },
          {
            "id": "en-tm-2",
            "type": "fill_blank",
            "promptUk": "Мета",
            "promptEn": "The goal",
            "sentence": "We are here ___ decide on the retry policy.",
            "accepted": [
              "to"
            ]
          },
          {
            "id": "en-tm-3",
            "type": "order_words",
            "promptUk": "Складіть фразу",
            "promptEn": "Build the phrase",
            "words": [
              "offline",
              "this",
              "take",
              "Let's"
            ],
            "correct": [
              "Let's",
              "take",
              "this",
              "offline"
            ]
          }
        ],
      },
    ],
  },
];

export function expandEnglish(course: CourseContent): CourseContent {
  return expandCourse(course, {}, newUnits);
}
