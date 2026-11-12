import type { CourseContent, UnitContent } from "../types.js";
import { expandCourse } from "./factory.js";

const newUnits: UnitContent[] = [
  {
    slug: "opening-principles-plus",
    titleUk: "Принципи дебюту глибше",
    titleEn: "Opening principles in more depth",
    lessons: [
      {
        slug: "ch-op-center",
        titleUk: "Центр і напруга",
        titleEn: "The centre and tension",
        baseXp: 21,
        difficulty: 3,
        isFree: true,
        exercises: [
          {
            "id": "ch-op-center-l",
            "type": "chess_lesson",
            "promptUk": "Ферзевий гамбіт: напруга на d5",
            "promptEn": "Queen’s Gambit: tension on d5",
            "fen": "rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 2 4",
            "notesUk": "Після 1.d4 d5 2.c4 e6 3.Nc3 Nf6 білі тиснуть на d5 пішаком c4. Центр — це напруга: хто змінить структуру (розмін, закриття, просування) і коли. Перед розміном на d5 запитайте, хто отримає лінію c і чи звільняється слон c8.",
            "notesEn": "After 1.d4 d5 2.c4 e6 3.Nc3 Nf6 White pressures d5 with the c4-pawn. The centre is tension: who will change the structure (exchange, close, or push) and when. Before capturing on d5, ask who will gain the c-file and whether Black’s c8-bishop is freed.",
            "quiz": {
              "q": "Що робить пішак на c4?",
              "qEn": "What does the pawn on c4 do?",
              "options": [
                "Тисне на центрального пішака d5",
                "Захищає короля білих",
                "Готує миттєву рокіровку на ферзевому фланзі",
                "Заважає коню b1 вийти"
              ],
              "correctIndex": 0
            }
          },
          {
            "id": "ch-op-center-1",
            "type": "mcq",
            "promptUk": "Коли варто знімати напругу розміном?",
            "promptEn": "When is it worth releasing the tension by exchanging?",
            "options": [
              "коли розмін дає лінію, кращого слона або фіксований об'єкт атаки",
              "завжди на другому ході",
              "ніколи, напругу тримають вічно",
              "лише якщо суперник запропонував нічию"
            ],
            "correctIndex": 0,
            "explanationUk": "Розмін змінює структуру, це не автоматична вигода.",
            "explanationEn": "An exchange changes the structure; it is not an automatic gain."
          },
          {
            "id": "ch-op-center-2",
            "type": "mcq",
            "promptUk": "Чому 2.c4 називають гамбітом, хоча пішака часто повертають?",
            "promptEn": "Why is 2.c4 called a gambit even though the pawn is often recovered?",
            "options": [
              "білі пропонують пішака заради тиску на центр; чорні можуть спробувати втримати його",
              "пішака не можна взяти ніколи",
              "це жертва тури",
              "c4 завжди втрачається назавжди"
            ],
            "correctIndex": 0,
            "explanationUk": "Ідея — темп і центр, не обов'язкова втрата матеріалу.",
            "explanationEn": "The idea is time and the centre, not a forced material loss."
          }
        ],
      },
      {
        slug: "ch-op-develop",
        titleUk: "Розвиток і повторний хід фігурою",
        titleEn: "Development and moving a piece twice",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "ch-op-develop-l",
            "type": "chess_lesson",
            "promptUk": "Італійська партія після рокіровки білих",
            "promptEn": "An Italian Game after White’s castle",
            "fen": "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQ1RK1 b kq - 2 5",
            "notesUk": "Білі вже рокирували, слон c4 і кінь f3 розвинені, пішак d3 тримає центр. Чорні ще не рокирували, але слон c5 і кінь f6 вже в грі. Правило дебюту: виведіть легкі фігури, рокируйте, з'єднайте тури. Другий хід тією самою фігурою виправданий, лише якщо він виграє темп або виправляє структуру.",
            "notesEn": "White has already castled, the bishop on c4 and the knight on f3 are developed, and the d3-pawn supports the centre. Black has not yet castled, but the bishop on c5 and the knight on f6 are already in play. Opening rule: develop the minor pieces, castle, and connect the rooks. A second move with the same piece is justified only if it wins a tempo or repairs the structure.",
            "quiz": {
              "q": "Що білі вже зробили для безпеки короля?",
              "qEn": "What has White already done for king safety?",
              "options": [
                "коротку рокіровку",
                "довгу рокіровку",
                "залишили короля на e1",
                "поставили ферзя на h5"
              ],
              "correctIndex": 0
            }
          },
          {
            "id": "ch-op-develop-1",
            "type": "mcq",
            "promptUk": "Навіщо з'єднувати тури?",
            "promptEn": "Why connect the rooks?",
            "options": [
              "щоб вони захищали одна одну і могли зайняти відкриті лінії",
              "щоб закрити короля назавжди",
              "це лише естетика",
              "тури мають стояти на початкових полях усю партію"
            ],
            "correctIndex": 0,
            "explanationUk": "З'єднані тури — ознака завершеного розвитку.",
            "explanationEn": "Connected rooks are a sign that development is complete."
          },
          {
            "id": "ch-op-develop-2",
            "type": "mcq",
            "promptUk": "Коли повторний хід фігурою виправданий?",
            "promptEn": "When is a second move with the same piece justified?",
            "options": [
              "коли він створює конкретну загрозу або виграє темп",
              "завжди, щоб «покращити» фігуру на око",
              "ніколи в дебюті",
              "лише кіньми"
            ],
            "correctIndex": 0,
            "explanationUk": "Темп дорожчий за абстрактне краще поле.",
            "explanationEn": "A tempo is worth more than an abstract better square."
          }
        ],
      },
      {
        slug: "ch-op-king",
        titleUk: "Затримана рокіровка",
        titleEn: "Delayed castling",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "ch-op-king-l",
            "type": "chess_lesson",
            "promptUk": "Сициліанка: королі ще в центрі",
            "promptEn": "A Sicilian: the kings are still in the centre",
            "fen": "rn1qkb1r/1p3ppp/p2pbn2/4p3/4P3/1NN1B3/PPP2PPP/R2QKB1R w KQkq - 2 8",
            "notesUk": "У цій сициліанській структурі обидві сторони ще мають права на рокіровку, але центр уже відкривається: пішаки e4 і e5, фігури в середині. Король на e1 або e8 стоїть на лінії, яку можуть відкрити розміни. Затримка рокіровки допустима, якщо центр закритий; якщо він розкривається — спочатку сховайте короля.",
            "notesEn": "In this Sicilian structure both sides still have castling rights, but the centre is already opening: pawns on e4 and e5, pieces in the middle. A king on e1 or e8 sits on a file that exchanges can open. Delaying castle is acceptable if the centre is closed; if it is opening, tuck the king away first.",
            "quiz": {
              "q": "Чому відкритий центр небезпечний для короля в центрі?",
              "qEn": "Why is an open centre dangerous for a king in the centre?",
              "options": [
                "лінії й діагоналі відкриваються прямо на короля",
                "пішаки перестають ходити",
                "рокіровка стає нелегальною автоматично",
                "ферзь не може вийти"
              ],
              "correctIndex": 0
            }
          },
          {
            "id": "ch-op-king-1",
            "type": "mcq",
            "promptUk": "Коли затримка рокіровки більш виправдана?",
            "promptEn": "When is delaying castle more justified?",
            "options": [
              "коли центр закритий і є конкретна гра на фланзі",
              "завжди в сициліанці",
              "ніколи, навіть під матом",
              "тільки якщо прав на рокіровку вже немає"
            ],
            "correctIndex": 0,
            "explanationUk": "Закритий центр дає час; відкритий — ні.",
            "explanationEn": "A closed centre gives you time; an open one does not."
          },
          {
            "id": "ch-op-king-2",
            "type": "mcq",
            "promptUk": "Права на рокіровку в цій позиції:",
            "promptEn": "Castling rights in this position:",
            "options": [
              "обидві сторони ще можуть рокирувати за правилами",
              "ніхто не може",
              "лише чорні",
              "рокіровка вже зроблена в обох"
            ],
            "correctIndex": 0,
            "explanationUk": "У FEN є KQkq — права збережені, але хід треба зробити вчасно.",
            "explanationEn": "The FEN has KQkq — the rights remain, but the move must still be made in time."
          }
        ],
      },
      {
        slug: "ch-op-premature",
        titleUk: "Передчасний ферзь",
        titleEn: "A premature queen",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "ch-op-premature-l",
            "type": "chess_lesson",
            "promptUk": "Загроза Qxf7: дитячий мат",
            "promptEn": "The Qxf7 threat: Scholar’s Mate",
            "fen": "r1bqkbnr/pppp1ppp/2n5/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 3 3",
            "notesUk": "Після 1.e4 e5 2.Qh5 Nc6 3.Bc4 білі націлились на f7 ферзем і слоном. Якщо чорні ігнорують загрозу (наприклад пасивне a6), 4.Qxf7# — мат. Це ідея дитячого мату. Правильний захист — атакувати ферзя або прикрити f7 (Nf6, g6, Qe7). Ранній ферзь створює загрозу, але сам стає мішенню для темпів розвитку.",
            "notesEn": "After 1.e4 e5 2.Qh5 Nc6 3.Bc4 White aims at f7 with queen and bishop. If Black ignores the threat (for example a passive a6), 4.Qxf7# is mate. That is the Scholar’s Mate idea. The correct defence is to attack the queen or cover f7 (Nf6, g6, Qe7). An early queen creates a threat but itself becomes a target for developing tempos.",
            "quiz": {
              "q": "Що буде після пасивного 3…a6?",
              "qEn": "What happens after a passive 3…a6?",
              "options": [
                "4.Qxf7# мат",
                "нічого, ферзь не дістає f7",
                "чорні виграють ферзя одразу",
                "пат"
              ],
              "correctIndex": 0
            }
          },
          {
            "id": "ch-op-premature-1",
            "type": "mcq",
            "promptUk": "Який захист логічний за чорних?",
            "promptEn": "Which defence is logical for Black?",
            "options": [
              "Nf6 або g6 — удар по ферзю й захист f7",
              "a6 і b6 без уваги до f7",
              "взяти ферзя конем з b8, якого там уже немає",
              "здатися"
            ],
            "correctIndex": 0,
            "explanationUk": "Nf6 розвиває фігуру й атакує ферзя.",
            "explanationEn": "Nf6 develops a piece and attacks the queen."
          },
          {
            "id": "ch-op-premature-2",
            "type": "mcq",
            "promptUk": "Чому ранній ферзь часто програє темпи?",
            "promptEn": "Why does an early queen often lose tempos?",
            "options": [
              "суперник розвивається, нападаючи на ферзя",
              "ферзь не може ходити в дебюті за правилами",
              "ферзь слабший за пішака",
              "рокіровка забороняє ферзя"
            ],
            "correctIndex": 0,
            "explanationUk": "Ферзь цінний і мусить тікати від легких фігур.",
            "explanationEn": "The queen is valuable and must run from lighter pieces."
          }
        ],
      },
      {
        slug: "ch-op-review",
        titleUk: "Огляд: виняток із принципів",
        titleEn: "Review: an exception to the principles",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "ch-op-review-l",
            "type": "chess_lesson",
            "promptUk": "Атака на f7 і відповідь d5",
            "promptEn": "The attack on f7 and the reply d5",
            "fen": "r1bqkb1r/ppp2ppp/2n2n2/3pp1N1/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 0 5",
            "notesUk": "Після 1.e4 e5 2.Nf3 Nc6 3.Bc4 Nf6 4.Ng5 d5 білі вдруге ходять конем заради удару на f7. Це виняток, підкріплений конкретною загрозою. Чорні вже відповіли d5, відкриваючи центр і захищаючись. Правило «не ходити двічі» поступається розрахунку; без загрози такий випад був би лише втратою темпу.",
            "notesEn": "After 1.e4 e5 2.Nf3 Nc6 3.Bc4 Nf6 4.Ng5 d5 White has moved the knight a second time to hit f7. That is an exception backed by a concrete threat. Black has already answered d5, opening the centre and defending. The rule “don’t move twice” yields to calculation; without a threat this lunge would only lose a tempo.",
            "quiz": {
              "q": "Чим чорні відповіли на Ng5?",
              "qEn": "How did Black answer Ng5?",
              "options": [
                "d5 — удар у центр і захист",
                "a6",
                "взяли коня на g5 турою",
                "довга рокіровка"
              ],
              "correctIndex": 0
            }
          },
          {
            "id": "ch-op-review-1",
            "type": "mcq",
            "promptUk": "Чому Ng5 тут не порожнє порушення принципу?",
            "promptEn": "Why is Ng5 not an empty breach of principle here?",
            "options": [
              "є конкретна загроза пункту f7",
              "принципи ніколи не мають винятків",
              "кінь на g5 невразливий завжди",
              "d5 заборонений правилами"
            ],
            "correctIndex": 0,
            "explanationUk": "Принципи — евристики; конкретна загроза може їх переважити.",
            "explanationEn": "Principles are heuristics; a concrete threat can outweigh them."
          },
          {
            "id": "ch-op-review-2",
            "type": "mcq",
            "promptUk": "Три стовпи дебюту, які ми закріпили:",
            "promptEn": "The three opening pillars we reinforced:",
            "options": [
              "центр, розвиток, безпека короля",
              "лише мат у два ходи",
              "лише довга рокіровка",
              "заборона ходити пішаками"
            ],
            "correctIndex": 0,
            "explanationUk": "Від цього каркасу відхиляються лише з розрахунком.",
            "explanationEn": "You deviate from this frame only with calculation."
          }
        ],
      },
    ],
  },
  {
    slug: "pawn-structures",
    titleUk: "Пішакові структури",
    titleEn: "Pawn structures",
    lessons: [
      {
        slug: "ch-ps-iqp",
        titleUk: "Ізольований ферзевий пішак",
        titleEn: "The isolated queen’s pawn",
        baseXp: 21,
        difficulty: 3,
        isFree: true,
        exercises: [
          {
            "id": "ch-ps-iqp-l",
            "type": "chess_lesson",
            "promptUk": "IQP: пішак d4 без сусідів",
            "promptEn": "An IQP: the d4-pawn without neighbours",
            "fen": "r1bq1rk1/pp2ppbp/2n2np1/8/3P4/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 11",
            "notesUk": "У білих пішак на d4 без сусідів по c і e — це ізольований ферзевий пішак (IQP). Він контролює поля c5 і e5 і дає простір для фігур, але сам є довгостроковою слабкістю: його треба захищати фігурами, а в ендшпілі він часто стає об'єктом блокади. План білих — активність і атака, поки фігур багато; план чорних — блокада d5 і спрощення.",
            "notesEn": "White has a pawn on d4 with no neighbours on the c- or e-files — an isolated queen’s pawn (IQP). It controls c5 and e5 and gives room for the pieces, but it is a long-term weakness: pieces must defend it, and in an ending it is often a blockade target. White’s plan is activity and attack while many pieces remain; Black’s is to blockade d5 and simplify.",
            "quiz": {
              "q": "Чим небезпечний ізольований пішак у ендшпілі?",
              "qEn": "Why is an isolated pawn dangerous in the ending?",
              "options": [
                "його важко захищати, і його можна заблокувати",
                "він завжди проходить у ферзі сам",
                "він забороняє рокіровку",
                "він робить пат"
              ],
              "correctIndex": 0
            }
          },
          {
            "id": "ch-ps-iqp-1",
            "type": "mcq",
            "promptUk": "Який план логічний за сторону з IQP при багатьох фігурах?",
            "promptEn": "What plan is logical for the side with an IQP while many pieces remain?",
            "options": [
              "активність і атака, використовуючи простір і поля перед пішаком",
              "негайне спрощення в пішаковий ендшпіль",
              "віддати пішака без компенсації",
              "заховати всі фігури на останній горизонталі"
            ],
            "correctIndex": 0,
            "explanationUk": "IQP — сила в мітельшпілі, слабкість у тихому ендшпілі.",
            "explanationEn": "An IQP is a strength in the middlegame and a weakness in a quiet ending."
          },
          {
            "id": "ch-ps-iqp-2",
            "type": "mcq",
            "promptUk": "Куди чорним вигідно поставити фігуру проти IQP?",
            "promptEn": "Where is it useful for Black to put a piece against an IQP?",
            "options": [
              "на d5, блокуючи пішака",
              "на a1",
              "на h8 без ідеї",
              "за власного короля лише"
            ],
            "correctIndex": 0,
            "explanationUk": "Блокада перед ізольованим пішаком — класичний прийом.",
            "explanationEn": "A blockade in front of the isolated pawn is a classic device."
          }
        ],
      },
      {
        slug: "ch-ps-doubled",
        titleUk: "Подвоєні пішаки",
        titleEn: "Doubled pawns",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "ch-ps-doubled-l",
            "type": "chess_lesson",
            "promptUk": "Іспанська: розмін і подвоєні c-пішаки",
            "promptEn": "The Spanish: the exchange and doubled c-pawns",
            "fen": "r1bqkbnr/1pp2ppp/p1p5/4p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5",
            "notesUk": "Після 1.e4 e5 2.Nf3 Nc6 3.Bb5 a6 4.Bxc6 dxc6 у чорних подвоєні пішаки на лінії c (c7 і c6). Подвоєні пішаки гірше рухаються і можуть бути слабкими, якщо їх не компенсувати. Тут компенсація конкретна: пара слонів, відкрита лінія d і міцний контроль центральних полів. Не оцінюйте подвоєння окремо від компенсації.",
            "notesEn": "After 1.e4 e5 2.Nf3 Nc6 3.Bb5 a6 4.Bxc6 dxc6 Black has doubled pawns on the c-file (c7 and c6). Doubled pawns move less freely and can be weak if uncompensated. Here the compensation is concrete: the bishop pair, the open d-file and firm control of central squares. Do not judge the doubling apart from the compensation.",
            "quiz": {
              "q": "Яка компенсація чорних за подвоєні пішаки?",
              "qEn": "What is Black’s compensation for the doubled pawns?",
              "options": [
                "пара слонів і відкрита лінія d",
                "зайва тура",
                "мат наступним ходом",
                "білі не можуть рокирувати"
              ],
              "correctIndex": 0
            }
          },
          {
            "id": "ch-ps-doubled-1",
            "type": "mcq",
            "promptUk": "Коли подвоєні пішаки особливо слабкі?",
            "promptEn": "When are doubled pawns especially weak?",
            "options": [
              "коли вони заблоковані й атаковані, без відкритої лінії чи пари слонів як компенсації",
              "завжди, у будь-якій позиції",
              "ніколи, подвоєння — завжди перевага",
              "лише в дебюті, в ендшпілі вони сильніші"
            ],
            "correctIndex": 0,
            "explanationUk": "Слабкість залежить від блокади, атаки та компенсації.",
            "explanationEn": "Weakness depends on blockade, attack and compensation."
          },
          {
            "id": "ch-ps-doubled-2",
            "type": "mcq",
            "promptUk": "Чому 4…dxc6 частіше за 4…bxc6 в цій гілці?",
            "promptEn": "Why is 4…dxc6 more common than 4…bxc6 in this line?",
            "options": [
              "відкривається лінія d і зберігається пішакова маса ближче до центру",
              "bxc6 завжди нелегальне",
              "dxc6 виграє фігуру",
              "правила вимагають брати ближчим до короля"
            ],
            "correctIndex": 0,
            "explanationUk": "dxc6 розвиває структуру під відкриту лінію й центр.",
            "explanationEn": "dxc6 opens a file and keeps the structure aimed at the centre."
          }
        ],
      },
      {
        slug: "ch-ps-passed",
        titleUk: "Пішак, що пройшов",
        titleEn: "A passed pawn",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "ch-ps-passed-l",
            "type": "chess_lesson",
            "promptUk": "Прохідний пішак d6 і блокада королем",
            "promptEn": "A passed pawn on d6, blocked by the king",
            "fen": "8/3k4/3P4/8/8/8/5K2/8 w - - 0 1",
            "notesUk": "Пішак d6 — прохідний: перед ним немає ворожого пішака на тій самій лінії, і сусідні лінії c і e порожні від чорних пішаків. Король чорних стоїть перед пішаком і блокує його. У пішаковому ендшпілі вирішує, чи може король білих підійти й витіснити блокаду, і чи потрапляє пішак у «квадрат» короля суперника, якщо той відійде.",
            "notesEn": "The pawn on d6 is passed: no enemy pawn stands ahead of it on the same file, and the neighbouring c- and e-files have no Black pawns. The Black king stands in front of the pawn and blocks it. In a king-and-pawn ending the question is whether White’s king can approach and evict the blockade, and whether the pawn stays inside the enemy king’s “square” if that king steps away.",
            "quiz": {
              "q": "Що робить король чорних на d7?",
              "qEn": "What is the Black king doing on d7?",
              "options": [
                "блокує прохідного пішака",
                "атакує тури",
                "готує рокіровку",
                "стоїть поза грою без мети"
              ],
              "correctIndex": 0
            }
          },
          {
            "id": "ch-ps-passed-1",
            "type": "mcq",
            "promptUk": "Прохідний пішак — це пішак, який:",
            "promptEn": "A passed pawn is a pawn that:",
            "options": [
              "не може бути зупинений ворожим пішаком на своїй або сусідніх лініях",
              "вже став ферзем",
              "завжди на сьомій горизонталі",
              "не може ходити на два поля"
            ],
            "correctIndex": 0,
            "explanationUk": "Ключ — відсутність ворожих пішаків перед ним і на сусідніх лініях.",
            "explanationEn": "The key is the absence of enemy pawns ahead of it and on neighbouring files."
          },
          {
            "id": "ch-ps-passed-2",
            "type": "mcq",
            "promptUk": "Чому король — найкращий блокатор прохідного в такому ендшпілі?",
            "promptEn": "Why is the king the best blocker of a passer in this kind of ending?",
            "options": [
              "він стоїть перед пішаком і нападає на поля просування",
              "король не може блокувати за правилами",
              "блокувати має лише кінь",
              "пішак не потребує блокади"
            ],
            "correctIndex": 0,
            "explanationUk": "Блокада фігурою перед пішаком зупиняє його до витіснення.",
            "explanationEn": "A piece standing in front of the pawn stops it until it is driven off."
          }
        ],
      },
      {
        slug: "ch-ps-backward",
        titleUk: "Відсталий пішак",
        titleEn: "A backward pawn",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "ch-ps-backward-l",
            "type": "chess_lesson",
            "promptUk": "Відсталий d6 у структурі з c5 і e5",
            "promptEn": "A backward d6 in a c5-and-e5 structure",
            "fen": "r1bqkb1r/pp3ppp/2np1n2/2p1p3/2B1P3/2NP1N2/PPP2PPP/R1BQK2R w KQkq - 0 7",
            "notesUk": "У чорних пішак на d6, перед яким поле d5 контролюють білі, а сусідні пішаки вже пішли на c5 і e5 — d6 відсталий, його важко просунути. Відсталий пішак часто стоїть на напіввідкритій лінії й потребує захисту фігурами. Білі можуть тиснути на d6 і використовувати поле d5 як форпост для коня.",
            "notesEn": "Black has a pawn on d6; d5 is controlled by White, and the neighbouring pawns have already gone to c5 and e5 — d6 is backward and hard to advance. A backward pawn often sits on a half-open file and needs piece defence. White can pressure d6 and use d5 as a knight outpost.",
            "quiz": {
              "q": "Чому пішак d6 тут відсталий?",
              "qEn": "Why is the d6-pawn backward here?",
              "options": [
                "сусіди пішли вперед, а поле перед ним під контролем білих",
                "він уже на другій горизонталі суперника",
                "він подвоєний",
                "він прохідний"
              ],
              "correctIndex": 0
            }
          },
          {
            "id": "ch-ps-backward-1",
            "type": "mcq",
            "promptUk": "Яке поле логічно зайняти білим проти відсталого d6?",
            "promptEn": "Which square is logical for White against a backward d6?",
            "options": [
              "d5 — форпост перед слабкістю",
              "a8",
              "h1 лише для короля",
              "поле d6 самим королем негайно без захисту"
            ],
            "correctIndex": 0,
            "explanationUk": "Форпост перед відсталим пішаком тисне й обмежує.",
            "explanationEn": "An outpost in front of the backward pawn applies pressure and restricts."
          },
          {
            "id": "ch-ps-backward-2",
            "type": "mcq",
            "promptUk": "Як чорні можуть позбутися відсталості d6?",
            "promptEn": "How can Black get rid of the backward d6?",
            "options": [
              "підготувати просування d5, коли воно тактично тримається",
              "ніколи, відсталість вічна за правилами",
              "віддати всіх пішаків",
              "рокірувати ще раз"
            ],
            "correctIndex": 0,
            "explanationUk": "Прорив d5 — типове звільнення, якщо розрахунок дозволяє.",
            "explanationEn": "The d5-break is a typical freeing move when calculation allows it."
          }
        ],
      },
      {
        slug: "ch-ps-islands",
        titleUk: "Пішакові острови",
        titleEn: "Pawn islands",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "ch-ps-islands-l",
            "type": "chess_lesson",
            "promptUk": "Кілька пішакових островів у важкофігурному ендшпілі",
            "promptEn": "Several pawn islands in a major-piece ending",
            "fen": "r5k1/pp3pp1/2p4p/8/8/2P1P3/PP3PPP/R5K1 w - - 0 1",
            "notesUk": "Пішаковий острів — зв'язна група власних пішаків, відділена від інших пустою лінією. Тут у білих групи a2-b2-c3, окремо e3 і група f2-g2-h2 — кілька островів. Більше островів зазвичай означає більше потенційних слабкостей (крайні пішаки груп). Рахуйте острови, коли оцінюєте ендшпіль, але не ігноруйте активність фігур.",
            "notesEn": "A pawn island is a connected group of your own pawns, separated from the others by an empty file. Here White has a2-b2-c3, a lone e3, and f2-g2-h2 — several islands. More islands usually mean more potential weaknesses (the outer pawns of each group). Count islands when you evaluate an ending, but do not ignore piece activity.",
            "quiz": {
              "q": "Що таке пішаковий острів?",
              "qEn": "What is a pawn island?",
              "options": [
                "група власних пішаків, відділена від інших порожньою лінією",
                "будь-який пішак на краю дошки",
                "тільки прохідний пішак",
                "рокірувальна позиція"
              ],
              "correctIndex": 0
            }
          },
          {
            "id": "ch-ps-islands-1",
            "type": "mcq",
            "promptUk": "Чому багато островів часто слабкість?",
            "promptEn": "Why are many islands often a weakness?",
            "options": [
              "кожну групу треба захищати окремо, більше крайніх пішаків",
              "острови завжди проходять у ферзі",
              "правила штрафують за острови очком",
              "король не може стояти біля острова"
            ],
            "correctIndex": 0,
            "explanationUk": "Кожна відокремлена група — потенційна ціль.",
            "explanationEn": "Each separated group is a potential target."
          },
          {
            "id": "ch-ps-islands-2",
            "type": "mcq",
            "promptUk": "Чи завжди менша кількість островів — перевага?",
            "promptEn": "Is a smaller number of islands always an advantage?",
            "options": [
              "ні, активність фігур і прохідні можуть переважити",
              "так, це абсолютний закон",
              "острови не рахують у шахах",
              "так, якщо це дебют"
            ],
            "correctIndex": 0,
            "explanationUk": "Структура — частина оцінки, не вся оцінка.",
            "explanationEn": "Structure is part of the evaluation, not the whole of it."
          }
        ],
      },
    ],
  },
  {
    slug: "middlegame-plans",
    titleUk: "Плани мітельшпілю",
    titleEn: "Middlegame plans",
    lessons: [
      {
        slug: "ch-mg-outpost",
        titleUk: "Форпост для коня",
        titleEn: "A knight outpost",
        baseXp: 21,
        difficulty: 3,
        isFree: true,
        exercises: [
          {
            "id": "ch-mg-outpost-l",
            "type": "chess_lesson",
            "promptUk": "Кінь на d5: форпост",
            "promptEn": "A knight on d5: an outpost",
            "fen": "r2q1rk1/pp2ppbp/2n3p1/3N4/3P4/4BN2/PP2BPPP/R2Q1RK1 w - - 0 14",
            "notesUk": "Кінь білих стоїть на d5 — поле в таборі суперника, яке пішаки чорних зараз не б'ють (немає пішака на c6 чи e6). Такий форпост важко прогнати пішаком; кінь атакує багато полів і його часто невигідно міняти на слона. Запитання для плану: чи можу я закріпити коня там і відкрити гру під його удари.",
            "notesEn": "White’s knight stands on d5 — a square in the opponent’s camp that Black’s pawns do not currently control (there is no pawn on c6 or e6). Such an outpost is hard to chase away with a pawn; the knight attacks many squares and is often not worth exchanging for a bishop. The planning question is: can I keep the knight there and open the game around its strikes.",
            "quiz": {
              "q": "Чому d5 тут хороше поле для коня?",
              "qEn": "Why is d5 a good square for the knight here?",
              "options": [
                "воно в таборі чорних і зараз не б'ється пішаками",
                "кінь завжди стоїть лише на d5",
                "з d5 кінь атакує власного короля",
                "поле d5 зайняти нелегально"
              ],
              "correctIndex": 0
            }
          },
          {
            "id": "ch-mg-outpost-1",
            "type": "mcq",
            "promptUk": "Як чорні можуть боротись із форпостом на d5?",
            "promptEn": "How can Black fight an outpost on d5?",
            "options": [
              "підготувати e6 або c6, або зміняти коня на фігуру",
              "ігнорувати коня завжди",
              "рокірувати вдруге",
              "походити королем на d5"
            ],
            "correctIndex": 0,
            "explanationUk": "Прогнати пішаком або розмін — два головні рецепти.",
            "explanationEn": "Driving it away with a pawn or exchanging it are the two main remedies."
          },
          {
            "id": "ch-mg-outpost-2",
            "type": "mcq",
            "promptUk": "Чому коня на форпості часто не міняють на слона суперника?",
            "promptEn": "Why is an outpost knight often not swapped for the opponent’s bishop?",
            "options": [
              "кінь там може бути сильнішим за слона через стабільність і близькість до цілей",
              "слон завжди слабший за пішака",
              "розмін заборонений",
              "кінь не може бути на форпості разом зі слоном білих"
            ],
            "correctIndex": 0,
            "explanationUk": "Цінність фігури залежить від поля.",
            "explanationEn": "A piece’s value depends on the square."
          }
        ],
      },
      {
        slug: "ch-mg-weak",
        titleUk: "Слабкі поля",
        titleEn: "Weak squares",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "ch-mg-weak-l",
            "type": "chess_lesson",
            "promptUk": "Темні дірки біля короля після e6 і g6",
            "promptEn": "Dark holes around the king after e6 and g6",
            "fen": "r2q1rk1/pp3p1p/2n1p1p1/3p4/3P4/2N1BN2/PP2QPPP/R4RK1 w - - 0 14",
            "notesUk": "У чорних пішаки на e6 і g6, і немає темнопольного слона, який би захищав темні поля навколо короля (f6, g7, h6). Такі «дірки» стають дорогами для ферзя й слона білих. Слабке поле — це поле, яке вже не можуть контролювати пішаки й важко прикрити фігурами. Не створюйте дірок без необхідності (h6, g6, a6) поруч із королем.",
            "notesEn": "Black has pawns on e6 and g6 and no dark-squared bishop to defend the dark squares around the king (f6, g7, h6). Such holes become roads for White’s queen and bishop. A weak square is one that pawns can no longer control and that pieces struggle to cover. Do not create holes (h6, g6, a6) next to your king without need.",
            "quiz": {
              "q": "Чому поля на кшталт f6 тут слабкі?",
              "qEn": "Why are squares such as f6 weak here?",
              "options": [
                "пішаки вже не захищають їх, а темнопольного слона немає",
                "вони завжди слабкі в будь-якій позиції",
                "на них не можна ставити фігури за правилами",
                "король їх атакує"
              ],
              "correctIndex": 0
            }
          },
          {
            "id": "ch-mg-weak-1",
            "type": "mcq",
            "promptUk": "Що таке слабке поле?",
            "promptEn": "What is a weak square?",
            "options": [
              "поле, яке вже не можуть надійно контролювати пішаки",
              "будь-яке поле на краю",
              "поле, де стоїть король суперника завжди",
              "перша горизонталь лише"
            ],
            "correctIndex": 0,
            "explanationUk": "Слабкість — про втрачений пішаковий контроль.",
            "explanationEn": "Weakness is about lost pawn control."
          },
          {
            "id": "ch-mg-weak-2",
            "type": "mcq",
            "promptUk": "Чому ходи g6 або h6 біля короля треба добре обмірковувати?",
            "promptEn": "Why should g6 or h6 next to the king be thought through?",
            "options": [
              "вони створюють дірки, якими може скористатися суперник",
              "вони завжди патові",
              "пішак не може йти на g6",
              "рокіровка тоді нелегальна"
            ],
            "correctIndex": 0,
            "explanationUk": "Кожен пішаковий хід біля короля не повернеться назад.",
            "explanationEn": "Every pawn move near the king cannot be taken back."
          }
        ],
      },
      {
        slug: "ch-mg-pair",
        titleUk: "Пара слонів",
        titleEn: "The bishop pair",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "ch-mg-pair-l",
            "type": "chess_lesson",
            "promptUk": "Два слони проти коня на відкритій дошці",
            "promptEn": "Two bishops against a knight on an open board",
            "fen": "r4rk1/pp3ppp/2n1p3/8/3P4/4BB2/PP3PPP/R4RK1 w - - 0 18",
            "notesUk": "У білих два слони на відкритій дошці, у чорних — кінь проти них. Пара слонів сильна, коли є відкриті діагоналі: вони б'ють з обох кольорів і «стріляють» через всю дошку. План з парою — відкрити гру (прориви, розміни пішаків). План проти пари — закрити позицію й дати коню опорні пункти.",
            "notesEn": "White has two bishops on an open board; Black has a knight against them. The bishop pair is strong when diagonals are open: they cover both colours and cut across the whole board. The plan with the pair is to open the game (breaks, pawn exchanges). The plan against the pair is to close the position and give the knight outposts.",
            "quiz": {
              "q": "Коли пара слонів найсильніша?",
              "qEn": "When is the bishop pair strongest?",
              "options": [
                "на відкритій дошці з довгими діагоналями",
                "лише в закритій пішаковій ланцюговій позиції",
                "тільки в дебюті до 5-го ходу",
                "коли слонів вже немає"
              ],
              "correctIndex": 0
            }
          },
          {
            "id": "ch-mg-pair-1",
            "type": "mcq",
            "promptUk": "Який план логічний за сторону з парою слонів?",
            "promptEn": "What plan is logical for the side with the bishop pair?",
            "options": [
              "відкривати лінії й діагоналі",
              "закривати дошку всіма пішаками",
              "міняти обох слонів на коня без причини",
              "ховати слонів за власними пішаками назавжди"
            ],
            "correctIndex": 0,
            "explanationUk": "Відкрита дошка — середовище слонів.",
            "explanationEn": "An open board is the bishops’ habitat."
          },
          {
            "id": "ch-mg-pair-2",
            "type": "mcq",
            "promptUk": "Як боротись проти пари слонів?",
            "promptEn": "How do you fight the bishop pair?",
            "options": [
              "закривати позицію й тримати коня на стійкому полі",
              "відразу відкривати всі лінії",
              "віддати ферзя за слона завжди",
              "заборонити супернику ходити слонами"
            ],
            "correctIndex": 0,
            "explanationUk": "Закрита структура зменшує дальність слонів.",
            "explanationEn": "A closed structure reduces the bishops’ range."
          }
        ],
      },
      {
        slug: "ch-mg-file",
        titleUk: "Відкрита лінія для тур",
        titleEn: "An open file for the rooks",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "ch-mg-file-l",
            "type": "chess_lesson",
            "promptUk": "Тури на відкритих лініях c і e",
            "promptEn": "Rooks on the open c- and e-files",
            "fen": "4rrk1/pp3ppp/2n5/8/8/2N5/PP3PPP/2R1R1K1 w - - 0 22",
            "notesUk": "Лінія e вже зайнята турами з обох боків, а білі також тримають туру на c1 — напіввідкрита чи відкрита лінія c. План: подвоїти тури, вдертися на сьому (другу) горизонталь, тиснути на відсталі пішаки. Лінія без своїх пішаків — дорога для важких фігур. Запитайте, хто перший займе відкриту лінію і чи є пункт вторгнення.",
            "notesEn": "The e-file is already occupied by rooks on both sides, and White also has a rook on c1 — the c-file is open or half-open. The plan: double the rooks, invade the seventh (second) rank, and pressure backward pawns. A file without your own pawns is a road for the heavy pieces. Ask who will occupy the open file first and whether there is an entry square.",
            "quiz": {
              "q": "Яка типова мета тури на відкритій лінії?",
              "qEn": "What is a typical goal for a rook on an open file?",
              "options": [
                "вторгнення на сьому горизонталь і тиск на пішаки",
                "залишитись на першій горизонталі назавжди",
                "змінятись на коня обов'язково",
                "закрити лінію власним пішаком"
              ],
              "correctIndex": 0
            }
          },
          {
            "id": "ch-mg-file-1",
            "type": "mcq",
            "promptUk": "Навіщо подвоювати тури на одній лінії?",
            "promptEn": "Why double rooks on the same file?",
            "options": [
              "щоб утримати лінію й увійти в тил, переважаючи захист пункту",
              "це завжди пат",
              "тури не можуть стояти на одній лінії",
              "щоб закрити власного короля"
            ],
            "correctIndex": 0,
            "explanationUk": "Подвоєння збільшує силу вторгнення.",
            "explanationEn": "Doubling increases the power of an invasion."
          },
          {
            "id": "ch-mg-file-2",
            "type": "mcq",
            "promptUk": "Що таке пункт вторгнення?",
            "promptEn": "What is an entry square?",
            "options": [
              "поле на відкритій лінії, з якого тура заходить у табір суперника",
              "поле, де стоїть король завжди",
              "будь-яке поле коня",
              "перше поле дебюту"
            ],
            "correctIndex": 0,
            "explanationUk": "Без пункту входу відкрита лінія може бути лише боротьбою за нічию в розміні.",
            "explanationEn": "Without an entry square, an open file may only be a struggle to trade."
          }
        ],
      },
      {
        slug: "ch-mg-luft",
        titleUk: "Продих (luft) і остання горизонталь",
        titleEn: "Luft and the back rank",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "ch-mg-luft-l",
            "type": "chess_lesson",
            "promptUk": "Загроза мату на останній горизонталі",
            "promptEn": "A back-rank mate threat",
            "fen": "4r1k1/5ppp/8/8/8/8/R4PPP/6K1 w - - 0 1",
            "notesUk": "У білих король на g1 за пішаками f2-g2-h2, тура на a2, у чорних тура на e8. Якщо зараз черга чорних, 1…Re1# — мат на останній горизонталі: король не має «вікна», тура a2 не захищає поле e1. Білі мають хід і повинні зробити продих (h3 або g3). Увага: 1.Kh1 не рятує — після Re1 усе одно мат. Не залишайте останню горизонталь незахищеною без luft.",
            "notesEn": "White’s king is on g1 behind f2-g2-h2, the rook is on a2, and Black has a rook on e8. If it were Black’s move, 1…Re1# would be back-rank mate: the king has no “window”, and the rook on a2 does not cover e1. White is to move and must make luft (h3 or g3). Note: 1.Kh1 does not save White — Re1 is still mate. Do not leave the back rank unguarded without luft.",
            "quiz": {
              "q": "Який хід створює продих і уникає Re1#?",
              "qEn": "Which move makes luft and avoids Re1#?",
              "options": [
                "h3 (або g3)",
                "Kh1",
                "Ra3 без вікна для короля як єдина ідея",
                "Ke2 нелегальне через пішаків і правила"
              ],
              "correctIndex": 0
            }
          },
          {
            "id": "ch-mg-luft-1",
            "type": "mcq",
            "promptUk": "Чому 1.Kh1 не рятує від Re1?",
            "promptEn": "Why does 1.Kh1 not save White from Re1?",
            "options": [
              "король лишається на останній горизонталі без вікна, мат зберігається",
              "Kh1 завжди нелегальний",
              "тура чорних не може йти на e1 після Kh1",
              "це пат"
            ],
            "correctIndex": 0,
            "explanationUk": "Продих — це хід пішака, що відкриває поле втечі, не просто рух короля вздовж краю.",
            "explanationEn": "Luft is a pawn move that opens a flight square, not merely sliding the king along the edge."
          },
          {
            "id": "ch-mg-luft-2",
            "type": "mcq",
            "promptUk": "Що таке luft?",
            "promptEn": "What is luft?",
            "options": [
              "вікно для короля — зазвичай h3/g3 або h6/g6",
              "жертва ферзя",
              "вид рокіровки",
              "заборона турі ходити"
            ],
            "correctIndex": 0,
            "explanationUk": "Luft німецькою «повітря»: королю є куди відійти від шаха на останній лінії.",
            "explanationEn": "Luft is German for “air”: the king has somewhere to go from a back-rank check."
          }
        ],
      },
    ],
  },
  {
    slug: "rook-endgames-plus",
    titleUk: "Туристичні ендшпілі",
    titleEn: "Rook endgames",
    lessons: [
      {
        slug: "ch-re-behind",
        titleUk: "Тура за прохідним пішаком",
        titleEn: "The rook behind a passed pawn",
        baseXp: 21,
        difficulty: 3,
        isFree: true,
        exercises: [
          {
            "id": "ch-re-behind-l",
            "type": "chess_lesson",
            "promptUk": "Обидві тури на лінії прохідного d5",
            "promptEn": "Both rooks on the file of the passed d5-pawn",
            "fen": "3r4/8/8/3P4/3K4/8/4k3/3R4 w - - 0 1",
            "notesUk": "Правило Тарраша: ставте туру за прохідним пішаком — своїм або чужим. Тут біла тура на d1 стоїть за пішаком d5, чорна тура на d8 — теж на лінії пішака спереду. Тура ззаду підтримує просування й лишається активною, коли пішак іде вперед. Тура перед чужим пішаком може його гальмувати, але часто стає пасивною.",
            "notesEn": "Tarrasch’s rule: put a rook behind a passed pawn — your own or your opponent’s. Here the White rook on d1 stands behind the d5-pawn, and the Black rook on d8 is also on the pawn’s file, in front of it. A rook from behind supports the advance and stays active as the pawn moves. A rook in front of an enemy pawn can restrain it, but often becomes passive.",
            "quiz": {
              "q": "Де за Таррашем бажано ставити туру відносно прохідного?",
              "qEn": "Where does Tarrasch want the rook relative to a passed pawn?",
              "options": [
                "за ним, на тій самій лінії",
                "перед ним завжди пасивно як єдиний правильний шлях",
                "на іншій лінії якнайдалі",
                "на полі короля суперника"
              ],
              "correctIndex": 0
            }
          },
          {
            "id": "ch-re-behind-1",
            "type": "mcq",
            "promptUk": "Чому тура за своїм пішаком активна?",
            "promptEn": "Why is a rook behind your own pawn active?",
            "options": [
              "коли пішак іде вперед, тура зберігає дальність і захист",
              "тура не може стояти за пішаком за правилами",
              "пішак закриває туру назавжди",
              "це завжди мат у один"
            ],
            "correctIndex": 0,
            "explanationUk": "Пішак звільняє турі поля, а не відбирає їх.",
            "explanationEn": "The pawn frees squares for the rook instead of taking them away."
          },
          {
            "id": "ch-re-behind-2",
            "type": "mcq",
            "promptUk": "Коли тура перед чужим прохідним все ж корисна?",
            "promptEn": "When is a rook in front of an enemy passer still useful?",
            "options": [
              "коли треба терміново зупинити пішака на межі перетворення",
              "ніколи",
              "лише в дебюті",
              "тільки якщо немає короля"
            ],
            "correctIndex": 0,
            "explanationUk": "Гальмування на сьомій-восьмій — виняток, не норма активності.",
            "explanationEn": "Restraint on the seventh or eighth is an exception, not the usual picture of activity."
          }
        ],
      },
      {
        slug: "ch-re-cutoff",
        titleUk: "Відрізати короля турою",
        titleEn: "Cutting the king off with a rook",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "ch-re-cutoff-l",
            "type": "chess_lesson",
            "promptUk": "Тура на e1 відрізає короля від правого флангу",
            "promptEn": "The rook on e1 cuts the king off from the right wing",
            "fen": "8/8/8/3k4/3P4/8/3K4/1r2R3 w - - 0 1",
            "notesUk": "Біла тура на e1 відрізає чорного короля на d5 від вертикалей e–h. Відрізаний король не може підійти до пішака чи допомогти в захисті через «стіну» тури. У туристичних ендшпілях відрізання часто цінніше за пішака. План сильнішої сторони — тримати відрізання й наближати короля; слабшої — атакувати туру й прорватись через лінію.",
            "notesEn": "The White rook on e1 cuts the Black king on d5 off from the e–h files. A cut-off king cannot approach the pawn or help the defence across the rook’s “wall”. In rook endings a cut-off is often worth more than a pawn. The stronger side’s plan is to keep the cut-off and bring the king closer; the weaker side’s is to harass the rook and break across the file.",
            "quiz": {
              "q": "Що робить тура на e1 щодо чорного короля?",
              "qEn": "What is the rook on e1 doing to the Black king?",
              "options": [
                "не пускає його через лінію e",
                "дає шах кожен хід автоматично",
                "захищає чорного короля",
                "готує рокіровку"
              ],
              "correctIndex": 0
            }
          },
          {
            "id": "ch-re-cutoff-1",
            "type": "mcq",
            "promptUk": "Чому відрізання короля таке цінне?",
            "promptEn": "Why is cutting the king off so valuable?",
            "options": [
              "король — активна фігура ендшпілю, без нього захист і атака слабшають",
              "король не бере участі в ендшпілі",
              "відрізання завжди веде до пату",
              "тура тоді не може ходити"
            ],
            "correctIndex": 0,
            "explanationUk": "Король має наближатись; стіна тури йому заважає.",
            "explanationEn": "The king needs to approach; the rook’s wall stops it."
          },
          {
            "id": "ch-re-cutoff-2",
            "type": "mcq",
            "promptUk": "Як слабша сторона бореться з відрізанням?",
            "promptEn": "How does the weaker side fight a cut-off?",
            "options": [
              "шахами тури й ударами по турі, щоб перетнути лінію",
              "здоючись одразу",
              "ховаючи короля ще далі",
              "міняючи королів місцями"
            ],
            "correctIndex": 0,
            "explanationUk": "Треба змусити туру залишити лінію відрізання.",
            "explanationEn": "You must force the rook off the cutting file."
          }
        ],
      },
      {
        slug: "ch-re-activity",
        titleUk: "Активна тура проти пасивної",
        titleEn: "An active rook versus a passive one",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "ch-re-activity-l",
            "type": "chess_lesson",
            "promptUk": "Тура на e1 в тилу проти тури на a2",
            "promptEn": "A rook on e1 in the rear versus a rook on a2",
            "fen": "8/5pkp/6p1/8/8/5PP1/R4PKP/4r3 b - - 0 1",
            "notesUk": "Тура чорних уже на e1 — у тилу білих, б'є пішаків і турбує короля. Тура білих на a2 захищає пішаків, але стоїть пасивно. У туристичному ендшпілі активність тури часто важливіша за пішака: віддати пішака за відкриту лінію й шахи ззаду — типова нічийна чи виграшна ідея. Не ставте туру лише «на захист пішаків», якщо вона може атакувати.",
            "notesEn": "Black’s rook is already on e1 — in White’s rear, hitting pawns and annoying the king. White’s rook on a2 defends pawns but stands passively. In a rook ending rook activity is often worth more than a pawn: giving a pawn for an open file and checks from behind is a typical drawing or winning idea. Do not park the rook “just defending pawns” if it can attack.",
            "quiz": {
              "q": "Чія тура активніша і чому?",
              "qEn": "Whose rook is more active, and why?",
              "options": [
                "чорних: вона в тилу, атакує пішаків і короля",
                "білих: бо вона ближче до a8",
                "обидві однакові завжди",
                "жодна тура не активна в ендшпілі"
              ],
              "correctIndex": 0
            }
          },
          {
            "id": "ch-re-activity-1",
            "type": "mcq",
            "promptUk": "Типовий прийом активності:",
            "promptEn": "A typical activity device:",
            "options": [
              "віддати пішака, щоб тура зайшла в тил із шахами",
              "замкнути туру за власними пішаками назавжди",
              "зміняти туру на коня в дебюті",
              "не ходити турою до мату"
            ],
            "correctIndex": 0,
            "explanationUk": "Пішак дешевший за пасивну туру.",
            "explanationEn": "A pawn is cheaper than a passive rook."
          },
          {
            "id": "ch-re-activity-2",
            "type": "mcq",
            "promptUk": "Чому пасивна тура погана в ендшпілі?",
            "promptEn": "Why is a passive rook bad in the ending?",
            "options": [
              "вона лише захищає, і суперник володіє ініціативою",
              "пасивність завжди виграє",
              "тура не може бути пасивною за правилами",
              "пасивна тура швидше рокірує"
            ],
            "correctIndex": 0,
            "explanationUk": "Ініціатива в турі вирішує багато нічийних на вигляд позицій.",
            "explanationEn": "Rook initiative decides many positions that look drawn."
          }
        ],
      },
      {
        slug: "ch-re-philidor",
        titleUk: "Позиція на кшталт Філідора",
        titleEn: "A Philidor-style defence",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "ch-re-philidor-l",
            "type": "chess_lesson",
            "promptUk": "Тура чорних на шостій горизонталі проти пішака на п'ятій",
            "promptEn": "Black’s rook on the sixth against a pawn on the fifth",
            "fen": "8/8/r2k4/3P4/3K4/8/8/4R3 b - - 0 1",
            "notesUk": "У чорних тура на шостій горизонталі (a6), король перед пішаком d5, черга чорних. Класична ідея Філідора: тримати туру на шостій, поки пішак суперника не пішов на шосту; це не дає королю білих пройти вперед. Коли пішак іде на шосту, тура спускається назад і дає шахи ззаду. Мета — нічия точним захистом, не «стояти й чекати без плану».",
            "notesEn": "Black’s rook is on the sixth rank (a6), the king is in front of the d5-pawn, and it is Black’s move. The classic Philidor idea: keep the rook on the sixth while the enemy pawn has not reached the sixth, so the White king cannot step forward. When the pawn does go to the sixth, the rook drops back and checks from behind. The goal is a draw by accurate defence, not “sit and wait with no plan”.",
            "quiz": {
              "q": "Де тримати туру, поки пішак суперника ще на п'ятій?",
              "qEn": "Where should the rook stay while the enemy pawn is still on the fifth?",
              "options": [
                "на шостій горизонталі",
                "на першій без ідеї",
                "перед власним королем на восьмій лише",
                "на лінії пішака обов'язково на d8"
              ],
              "correctIndex": 0
            }
          },
          {
            "id": "ch-re-philidor-1",
            "type": "mcq",
            "promptUk": "Що робити, коли пішак іде на шосту горизонталь?",
            "promptEn": "What should you do when the pawn advances to the sixth?",
            "options": [
              "опустити туру й давати шахи королю ззаду",
              "залишити туру на шостій за будь-яку ціну",
              "здатися",
              "походити королем на поле пішака нелегально"
            ],
            "correctIndex": 0,
            "explanationUk": "Шоста горизонталь тоді вже не тримає короля — потрібні шахи з тилу.",
            "explanationEn": "The sixth rank then no longer holds the king — you need checks from behind."
          },
          {
            "id": "ch-re-philidor-2",
            "type": "mcq",
            "promptUk": "Яка мета цього захисту?",
            "promptEn": "What is the goal of this defence?",
            "options": [
              "утримати нічию проти пішака й тури",
              "обов'язково виграти",
              "зробити рокіровку",
              "пройти свого пішака, якого немає"
            ],
            "correctIndex": 0,
            "explanationUk": "Філідор — нічийна техніка слабшої сторони.",
            "explanationEn": "Philidor is drawing technique for the weaker side."
          }
        ],
      },
      {
        slug: "ch-re-bridge",
        titleUk: "Місток: сховати короля від шахів",
        titleEn: "Building a bridge against checks",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "ch-re-bridge-l",
            "type": "chess_lesson",
            "promptUk": "Пішак на сьомій, король попереду: ідея містка",
            "promptEn": "A pawn on the seventh, the king in front: the bridge idea",
            "fen": "1K6/1P6/1k6/8/8/8/6R1/1r6 w - - 0 1",
            "notesUk": "У білих пішак на b7 і король на a8 перед ним; чорний король на b6, чорна тура на b1 дає або загрожує шахами, біла тура на g2. Щоб провести пішака, королю треба вийти з «кута» й сховатись від шахів. Типовий прийом «містка»: тура стає на четверту (або відповідну) горизонталь і прикриває короля від шахів, коли той виходить. Не виходьте королем під нескінченні шахи без містка.",
            "notesEn": "White has a pawn on b7 and the king on a8 in front of it; the Black king is on b6, the Black rook on b1 gives or threatens checks, and the White rook is on g2. To promote the pawn, the king must leave the corner and shelter from checks. The typical “bridge” device: the rook stands on the fourth (or matching) rank and covers the king from checks as it comes out. Do not walk the king into endless checks with no bridge.",
            "quiz": {
              "q": "Навіщо турі білих будувати «місток»?",
              "qEn": "Why should White’s rook build a “bridge”?",
              "options": [
                "щоб прикрити короля від шахів, коли він виходить і пропускає пішака",
                "щоб зміняти туру на пішака",
                "щоб зробити рокіровку",
                "щоб віддати пішака"
              ],
              "correctIndex": 0
            }
          },
          {
            "id": "ch-re-bridge-1",
            "type": "mcq",
            "promptUk": "Що заважає пішаку b7 одразу стати ферзем?",
            "promptEn": "What stops the b7-pawn promoting at once?",
            "options": [
              "власний король стоїть на полі перетворення, а суперник дає шахи",
              "пішак не може перетворюватись за правилами",
              "на b8 вже стоїть ферзь",
              "немає права на рокіровку"
            ],
            "correctIndex": 0,
            "explanationUk": "Король заважає своєму пішаку й мусить вийти під прикриттям.",
            "explanationEn": "The king blocks its own pawn and must step out under cover."
          },
          {
            "id": "ch-re-bridge-2",
            "type": "mcq",
            "promptUk": "Без містка вихід короля часто веде до:",
            "promptEn": "Without a bridge, walking the king out often leads to:",
            "options": [
              "вічних шахів або втрати пішака",
              "миттєвого мату супернику завжди",
              "пату обов'язково",
              "рокіровки"
            ],
            "correctIndex": 0,
            "explanationUk": "Тура суперника з відстані тримає короля під шахами.",
            "explanationEn": "The opponent’s rook keeps the king in check from a distance."
          }
        ],
      },
    ],
  },
  {
    slug: "calculation-hygiene",
    titleUk: "Гігієна розрахунку",
    titleEn: "Calculation hygiene",
    lessons: [
      {
        slug: "ch-calc-cct",
        titleUk: "Шахи, взяття, загрози",
        titleEn: "Checks, captures, threats",
        baseXp: 21,
        difficulty: 3,
        isFree: true,
        exercises: [
          {
            "id": "ch-calc-cct-l",
            "type": "chess_lesson",
            "promptUk": "Мітельшпіль: починайте з CCT",
            "promptEn": "A middlegame: start with CCT",
            "fen": "r1bq1rk1/pp2ppbp/2n3p1/8/2BP4/2N1BN2/PP3PPP/R2Q1RK1 w - - 0 12",
            "notesUk": "Перший список ходів-кандидатів: шахи, взяття, загрози (CCT). У цій позиції слон білих уже на c4 дивиться на королівський фланг, фігури розвинені, обидві сторони рокировані. Не починайте розрахунок з «тихих» ходів, поки не перевірили форсовані. CCT не означає, що треба завжди шахувати; це означає не пропустити форсований удар.",
            "notesEn": "The first candidate-move list is checks, captures and threats (CCT). In this position White’s bishop is already on c4 looking at the kingside, the pieces are developed, and both sides have castled. Do not start calculating “quiet” moves until you have checked the forced ones. CCT does not mean you must always check; it means you must not miss a forced blow.",
            "quiz": {
              "q": "Що таке CCT?",
              "qEn": "What is CCT?",
              "options": [
                "checks, captures, threats — шахи, взяття, загрози",
                "castle, centre, time",
                "лише мати в один",
                "лише тихі ходи"
              ],
              "correctIndex": 0
            }
          },
          {
            "id": "ch-calc-cct-1",
            "type": "mcq",
            "promptUk": "Навіщо переглядати CCT першими?",
            "promptEn": "Why review CCT first?",
            "options": [
              "форсовані ходи змінюють оцінку і їх легко пропустити",
              "тихі ходи заборонені",
              "CCT завжди виграє",
              "суддя вимагає шахів"
            ],
            "correctIndex": 0,
            "explanationUk": "Форсований удар може зробити тихий план непотрібним.",
            "explanationEn": "A forced blow can make a quiet plan irrelevant."
          },
          {
            "id": "ch-calc-cct-2",
            "type": "mcq",
            "promptUk": "CCT не означає:",
            "promptEn": "CCT does not mean:",
            "options": [
              "шахувати кожен хід незалежно від користі",
              "складати список форсованих кандидатів",
              "перевіряти взяття",
              "шукати загрози суперника"
            ],
            "correctIndex": 0,
            "explanationUk": "Шахи заради шахів — не розрахунок, а шум.",
            "explanationEn": "Checks for their own sake are noise, not calculation."
          }
        ],
      },
      {
        slug: "ch-calc-count",
        titleUk: "Рахувати нападників і захисників",
        titleEn: "Counting attackers and defenders",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "ch-calc-count-l",
            "type": "chess_lesson",
            "promptUk": "Кінь на d5: порахуйте захист",
            "promptEn": "The knight on d5: count the defence",
            "fen": "r2q1rk1/pp2ppbp/2n3p1/3n4/3P4/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 13",
            "notesUk": "На d5 стоїть кінь чорних. Білі можуть взяти його 1.Nxd5 — це легальне взяття. Після 1.Nxd5 єдине взяття назад на d5 — 1…Qxd5, тобто фігура була захищена ферзем. Це не «висить» (висить — незахищена фігура), а питання обміну й наступного удару. Завжди порахуйте: скільки разів атаковано, скільки захищено, і чи захисник відволікається.",
            "notesEn": "A Black knight stands on d5. White can take it with 1.Nxd5 — a legal capture. After 1.Nxd5 the only recapture on d5 is 1…Qxd5, so the piece was defended by the queen. That is not a “hanger” (a hanger is an undefended piece); it is a question of a trade and of what happens next. Always count: how many times it is attacked, how many times it is defended, and whether a defender can be distracted.",
            "quiz": {
              "q": "Чим чорні забирають назад після Nxd5?",
              "qEn": "With what does Black recapture after Nxd5?",
              "options": [
                "ферзем (Qxd5)",
                "пішаком c",
                "турую з a8 одним ходом",
                "королем"
              ],
              "correctIndex": 0
            }
          },
          {
            "id": "ch-calc-count-1",
            "type": "mcq",
            "promptUk": "Що означає «фігура висить»?",
            "promptEn": "What does it mean that a piece is “hanging”?",
            "options": [
              "вона атакована й не захищена",
              "вона стоїть на краю дошки",
              "вона щойно розвинулась",
              "вона завжди кінь"
            ],
            "correctIndex": 0,
            "explanationUk": "Висяча фігура — тактичний об'єкт, не просто активна.",
            "explanationEn": "A hanging piece is a tactical target, not merely an active one."
          },
          {
            "id": "ch-calc-count-2",
            "type": "mcq",
            "promptUk": "Чому недостатньо порахувати лише «один напад, один захист»?",
            "promptEn": "Why is “one attack, one defence” not enough by itself?",
            "options": [
              "захисник може бути зв'язаний, відволічений, або взяття відкриває нову загрозу",
              "числа в шахах не існують",
              "захищати можна лише пішаком",
              "напад завжди перемагає"
            ],
            "correctIndex": 0,
            "explanationUk": "Тактика ламає арифметику: зв'язка, відволікання, проміжний шах.",
            "explanationEn": "Tactics break the arithmetic: pins, deflections, in-between checks."
          }
        ],
      },
      {
        slug: "ch-calc-zwischen",
        titleUk: "Проміжний хід ( Zwischenzug )",
        titleEn: "The in-between move (zwischenzug)",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "ch-calc-zwischen-l",
            "type": "chess_lesson",
            "promptUk": "Не забирайте назад автоматично",
            "promptEn": "Do not recapture on autopilot",
            "fen": "r2q1rk1/pp2ppbp/2n3p1/3n4/3P4/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 13",
            "notesUk": "Zwischenzug (проміжний хід) — відповідь не тим взяттям, якого чекають, а іншим ударом, часто шахом, після якого початкове взяття вже невигідне або неможливе. Перед тим як «автоматично» забрати назад, запитайте: чи є у суперника (і у вас) шах або більша загроза посередині. Навіть у простій міни Nxd5 Qxd5 перевіряйте, чи немає шаха між цими ходами.",
            "notesEn": "A zwischenzug (in-between move) is a reply that is not the expected recapture, but another blow, often a check, after which the original capture is no longer good or no longer possible. Before you “automatically” take back, ask: does the opponent (or do you) have a check or a greater threat in between. Even in a simple trade Nxd5 Qxd5, check whether a check exists between those moves.",
            "quiz": {
              "q": "Що таке zwischenzug?",
              "qEn": "What is a zwischenzug?",
              "options": [
                "проміжний хід, часто шах, замість очікуваного взяття",
                "рокіровка в ендшпілі",
                "відмова від ходу",
                "лише жертва ферзя"
              ],
              "correctIndex": 0
            }
          },
          {
            "id": "ch-calc-zwischen-1",
            "type": "mcq",
            "promptUk": "Коли найчастіше пропускають проміжний хід?",
            "promptEn": "When do people most often miss an in-between move?",
            "options": [
              "коли вважають взяття «вимушеним» і не шукають шахів",
              "лише в дебюті до третього ходу",
              "тільки граючи чорними",
              "якщо немає тур"
            ],
            "correctIndex": 0,
            "explanationUk": "Автоматичне «він мусить забрати» — типова сліпа пляма.",
            "explanationEn": "Automatic “they must take back” is a typical blind spot."
          },
          {
            "id": "ch-calc-zwischen-2",
            "type": "mcq",
            "promptUk": "Яке питання ставити перед розміном?",
            "promptEn": "What question should you ask before a trade?",
            "options": [
              "чи є шах або більша загроза замість взяття назад",
              "чи можна рокірувати посередині розміну",
              "чи пішак має ім'я",
              "чи ферзь любить це поле"
            ],
            "correctIndex": 0,
            "explanationUk": "Спочатку форсовані відповіді, потім автоматизм.",
            "explanationEn": "Forced replies first, autopilot second."
          }
        ],
      },
      {
        slug: "ch-calc-blunder",
        titleUk: "Перевірка на грубу помилку",
        titleEn: "A blunder check",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "ch-calc-blunder-l",
            "type": "chess_lesson",
            "promptUk": "Ферзь на h5 дивиться на e5: чи можна брати?",
            "promptEn": "The queen on h5 looks at e5: can it take?",
            "fen": "r1bqkbnr/pppp1ppp/2n5/4p2Q/4P3/8/PPPP1PPP/RNB1KBNR w KQkq - 2 3",
            "notesUk": "Після 1.e4 e5 2.Qh5 Nc6 ферзь на h5 атакує e5. Взяття 3.Qxe5 виглядає як виграш пішака з шахом, але після 3…Nxe5 чорні просто забирають ферзя. Перед «халявним» пішаком перевірте: чи фігура, якою берете, захищена після ходу, і чи не залишаєте її під ударом. Список «що атакує мою фігуру після ходу» займає секунди й рятує партії.",
            "notesEn": "After 1.e4 e5 2.Qh5 Nc6 the queen on h5 attacks e5. The capture 3.Qxe5 looks like a pawn win with check, but after 3…Nxe5 Black simply takes the queen. Before grabbing a “free” pawn, check: is the piece you capture with still safe after the move, and are you leaving it en prise. A two-second list of “what attacks my piece after the move” saves games.",
            "quiz": {
              "q": "Чому 3.Qxe5 тут груба помилка?",
              "qEn": "Why is 3.Qxe5 a blunder here?",
              "options": [
                "кінь на c6 забирає ферзя (Nxe5)",
                "пішак e5 нелегально брати",
                "після Qxe5 одразу пат",
                "ферзь не може ходити на e5 за правилами"
              ],
              "correctIndex": 0
            }
          },
          {
            "id": "ch-calc-blunder-1",
            "type": "mcq",
            "promptUk": "Яке коротке питання перед взяттям?",
            "promptEn": "What short question should you ask before a capture?",
            "options": [
              "чим суперник відповість і чи моя фігура тоді виживе",
              "чи красиво виглядає хід",
              "чи глядачі схвалять",
              "чи ферзь стомився"
            ],
            "correctIndex": 0,
            "explanationUk": "Один напівхід у відповідь — мінімум перевірки.",
            "explanationEn": "One half-move of a reply is the minimum check."
          },
          {
            "id": "ch-calc-blunder-2",
            "type": "mcq",
            "promptUk": "«Халявний» пішак часто:",
            "promptEn": "A “free” pawn is often:",
            "options": [
              "приманка, якщо фігура, що бере, лишається без захисту",
              "завжди безкоштовний за визначенням",
              "нелегальний",
              "завжди веде до мату вам"
            ],
            "correctIndex": 0,
            "explanationUk": "Перевіряйте захист фігури, якою берете.",
            "explanationEn": "Check the safety of the piece you take with."
          }
        ],
      },
      {
        slug: "ch-calc-stop",
        titleUk: "Коли зупинити розрахунок",
        titleEn: "When to stop calculating",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "ch-calc-stop-l",
            "type": "chess_lesson",
            "promptUk": "Мітельшпіль: де поставити крапку в варіанті",
            "promptEn": "A middlegame: where to put a full stop in a line",
            "fen": "r1bq1rk1/pp2ppbp/2n3p1/8/2BP4/2N1BN2/PP3PPP/R2Q1RK1 w - - 0 12",
            "notesUk": "Розрахунок треба зупиняти, коли позиція «тиха»: немає негайного шаха, взяття чи невідбивної загрози, і ви можете оцінити (матеріал, король, активність). Нескінченно рахувати гілки — шлях до цейтноту. Якщо гілка форсована до мату або виграшу матеріалу — доведіть її до кінця. Якщо після двох-трьох тихих ходів оцінка неясна, поверніться до кандидатів і порівняйте.",
            "notesEn": "Stop calculating when the position is “quiet”: there is no immediate check, capture or irresistible threat, and you can evaluate (material, king, activity). Counting branches forever is the road to time trouble. If a line is forced through to mate or a material win, take it to the end. If after two or three quiet moves the evaluation is unclear, go back to the candidates and compare.",
            "quiz": {
              "q": "Коли варіант можна зупинити й оцінити?",
              "qEn": "When can you stop a line and evaluate?",
              "options": [
                "коли позиція тиха: немає форсованого удару",
                "ніколи, треба рахувати до мату завжди",
                "після першого ж ходу завжди",
                "лише коли здається суперник"
              ],
              "correctIndex": 0
            }
          },
          {
            "id": "ch-calc-stop-1",
            "type": "mcq",
            "promptUk": "Що робити в цейтноті з розрахунком?",
            "promptEn": "What should you do with calculation in time trouble?",
            "options": [
              "перевірити CCT і грубі дірки, не починати довгі нефорсовані гілки",
              "рахувати ще глибше ніж зазвичай",
              "ходити першою фігурою, що потрапила на очі, без погляду",
              "зупинити годинник"
            ],
            "correctIndex": 0,
            "explanationUk": "У цейтноті пріоритет — не провісити фігуру.",
            "explanationEn": "In time trouble the priority is not hanging a piece."
          },
          {
            "id": "ch-calc-stop-2",
            "type": "mcq",
            "promptUk": "Форсовану гілку до мату:",
            "promptEn": "A forced line to mate should be:",
            "options": [
              "довідену до кінця, щоб не зупинитись на півході",
              "обірвану якомога раніше завжди",
              "оголошену без перевірки",
              "записану лише після партії"
            ],
            "correctIndex": 0,
            "explanationUk": "Мат треба бачити до кінця, інакше це побажання.",
            "explanationEn": "You must see mate all the way through, or it is only a wish."
          }
        ],
      },
    ],
  },
  {
    slug: "practical-study",
    titleUk: "Практична гра й аналіз",
    titleEn: "Practical play and study",
    lessons: [
      {
        slug: "ch-pr-time",
        titleUk: "Час і пріоритети",
        titleEn: "Time and priorities",
        baseXp: 21,
        difficulty: 3,
        isFree: true,
        exercises: [
          {
            "id": "ch-pr-time-l",
            "type": "chess_lesson",
            "promptUk": "Типовий дебют: не спалюйте час на рівних ходах",
            "promptEn": "A typical opening: do not burn time on equal moves",
            "fen": "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQ1RK1 b kq - 2 5",
            "notesUk": "У дебютній позиції з нормальною структурою не витрачайте п'ять хвилин на вибір між двома рівними розвивальними ходами. Час бережіть для моментів, де змінюється оцінка: тактичний удар, зміна структури, рішення атакувати чи спрощувати. Практичне правило: якщо кандидатів багато й різниця мала — зробіть розумний розвивальний хід і залиште час на кризу.",
            "notesEn": "In an opening position with a normal structure, do not spend five minutes choosing between two equal developing moves. Save time for moments when the evaluation changes: a tactical blow, a change of structure, the decision to attack or simplify. A practical rule: if there are many candidates and the difference is small, make a sound developing move and keep time for the crisis.",
            "quiz": {
              "q": "Де варто витрачати більше часу?",
              "qEn": "Where is it worth spending more time?",
              "options": [
                "на тактичних ударах і змінах структури",
                "на кожному розвивальному ході порівну до останньої секунди",
                "лише в уже виграній позиції",
                "тільки на першому ході партії"
              ],
              "correctIndex": 0
            }
          },
          {
            "id": "ch-pr-time-1",
            "type": "mcq",
            "promptUk": "Якщо два ходи розвитку майже рівні, логічно:",
            "promptEn": "If two developing moves are almost equal, it is logical to:",
            "options": [
              "обрати один за принцип і зберегти час",
              "думати до падіння прапорця",
              "здатися",
              "запитувати суперника"
            ],
            "correctIndex": 0,
            "explanationUk": "Час — ресурс позиції, не лише годинника.",
            "explanationEn": "Time is a resource of the position, not only of the clock."
          },
          {
            "id": "ch-pr-time-2",
            "type": "mcq",
            "promptUk": "У цейтноті пріоритет:",
            "promptEn": "In time trouble the priority is:",
            "options": [
              "CCT і захист від грубих помилок",
              "відкрити нову дебютну гілку на 20 ходів",
              "перевірити всю теорію ендшпілю",
              "пришвидшити суперника розмовами"
            ],
            "correctIndex": 0,
            "explanationUk": "Спочатку безпека фігур, потім амбіції.",
            "explanationEn": "Piece safety first, ambitions second."
          }
        ],
      },
      {
        slug: "ch-pr-annotate",
        titleUk: "Як коментувати свою партію",
        titleEn: "How to annotate your own game",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "ch-pr-annotate-l",
            "type": "chess_lesson",
            "promptUk": "Структура ферзевого гамбіту як приклад для розбору",
            "promptEn": "A Queen’s Gambit structure as an example to review",
            "fen": "rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 2 4",
            "notesUk": "Після партії запишіть не лише ходи, а моменти вибору: де ви планували, де здогадувались, де боялись. Позначте хід, після якого оцінка змінилась, і спробуйте знайти першу помилку, не останню. Коментар «я просто зів'яв» без відповіді «який сигнал пропустив» мало чого вчить. Корисна помітка: який принцип чи CCT ви не перевірили.",
            "notesEn": "After the game write down not only the moves, but the choice points: where you planned, where you guessed, where you were afraid. Mark the move after which the evaluation changed, and try to find the first mistake, not the last. A comment “I just blundered” with no answer to “which signal did I miss” teaches little. A useful note: which principle or CCT check you skipped.",
            "quiz": {
              "q": "Яку помилку варто шукати першою в розборі?",
              "qEn": "Which mistake should you look for first in a review?",
              "options": [
                "першу зміну оцінки, не останній зів",
                "лише останній хід перед матом",
                "ходи суперника лише",
                "дебютну назву"
              ],
              "correctIndex": 0
            }
          },
          {
            "id": "ch-pr-annotate-1",
            "type": "mcq",
            "promptUk": "Що додавати до списку ходів у коментарі?",
            "promptEn": "What should you add to the move list in an annotation?",
            "options": [
              "моменти вибору, план і пропущений сигнал",
              "лише знаки ?? без слів",
              "погоду",
              "імена глядачів"
            ],
            "correctIndex": 0,
            "explanationUk": "Розбір — про рішення, не лише про нотацію.",
            "explanationEn": "A review is about decisions, not only notation."
          },
          {
            "id": "ch-pr-annotate-2",
            "type": "mcq",
            "promptUk": "Чому «я просто зів'яв» слабкий коментар?",
            "promptEn": "Why is “I just blundered” a weak comment?",
            "options": [
              "він не каже, який сигнал (CCT, час, структура) ви пропустили",
              "зіви не існують",
              "коментарі заборонені",
              "треба писати лише похвалу собі"
            ],
            "correctIndex": 0,
            "explanationUk": "Без причини зів повториться.",
            "explanationEn": "Without a cause, the blunder will repeat."
          }
        ],
      },
      {
        slug: "ch-pr-study",
        titleUk: "Як розбирати зразкову партію",
        titleEn: "How to study a model game",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "ch-pr-study-l",
            "type": "chess_lesson",
            "promptUk": "Італійська як типове навчальне табія",
            "promptEn": "The Italian as a typical study tabiya",
            "fen": "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQ1RK1 b kq - 2 5",
            "notesUk": "Дивіться зразкову партію з питанням, не з пасивним переглядом ходів. Після кожного значного ходу зупиняйтесь і називайте план: розвиток, тиск на пункт, зміна структури. Закрийте наступний хід і спробуйте вгадати його з причини, не з пам'яті нотації. Якщо не вгадали — запишіть ідейний, не лише фактичний хід.",
            "notesEn": "Look at a model game with a question, not by passively flipping moves. After every significant move, stop and name the plan: development, pressure on a point, a change of structure. Cover the next move and try to guess it from a reason, not from memorised notation. If you miss it, write down the idea, not only the actual move.",
            "quiz": {
              "q": "Як корисно читати зразкову партію?",
              "qEn": "How is it useful to read a model game?",
              "options": [
                "зупинятись, називати план і пробувати вгадати наступний хід",
                "перемотати до кінця й подивитись результат",
                "запам'ятати лише рахунок",
                "грати блиц проти коментаря"
              ],
              "correctIndex": 0
            }
          },
          {
            "id": "ch-pr-study-1",
            "type": "mcq",
            "promptUk": "Що записувати, якщо ви не вгадали хід?",
            "promptEn": "What should you write if you missed the move?",
            "options": [
              "ідею ходу, не лише нотацію",
              "тільки символ ??",
              "нічого, це ганьба",
              "ім'я автора дебюту"
            ],
            "correctIndex": 0,
            "explanationUk": "Ідея переноситься в ваші партії, нотація — рідко.",
            "explanationEn": "The idea transfers into your games; the notation rarely does."
          },
          {
            "id": "ch-pr-study-2",
            "type": "mcq",
            "promptUk": "Пасивний перегляд ходів слабкий, бо:",
            "promptEn": "Passive flipping of moves is weak because:",
            "options": [
              "ви не тренуєте прийняття рішень",
              "партії не можна дивитись",
              "комп'ютер це забороняє",
              "дебют тоді змінюється"
            ],
            "correctIndex": 0,
            "explanationUk": "Навчання — це спроба відповіді, не споживання рядка.",
            "explanationEn": "Learning is an attempt to answer, not consumption of a line."
          }
        ],
      },
      {
        slug: "ch-pr-repertoire",
        titleUk: "Ідея дебютного репертуару",
        titleEn: "The idea of an opening repertoire",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "ch-pr-repertoire-l",
            "type": "chess_lesson",
            "promptUk": "Ферзевий гамбіт як основа репертуару, не ліс варіантів",
            "promptEn": "The Queen’s Gambit as a repertoire base, not a forest of lines",
            "fen": "rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 2 4",
            "notesUk": "Репертуар — не сотні рядків «на пам'ять», а набір структур, які ви розумієте. Якщо граєте ферзевий гамбіт білими, вам треба знати ідеї тиску на d5, коли брати на d5, і типові плани з ізольованим пішаком. Краще десять зрозумілих позицій, ніж сто забутих форсованих варіантів. Починайте репертуар від структур і типових планів, потім додавайте точні ходи проти конкретних систем.",
            "notesEn": "A repertoire is not hundreds of memorised lines; it is a set of structures you understand. If you play the Queen’s Gambit with White, you need the ideas of pressure on d5, when to take on d5, and typical isolated-pawn plans. Ten understood positions beat a hundred forgotten forced lines. Start a repertoire from structures and typical plans, then add exact moves against specific systems.",
            "quiz": {
              "q": "З чого краще починати репертуар?",
              "qEn": "What is the better starting point for a repertoire?",
              "options": [
                "зі структур і типових планів",
                "з механічного заучування 40-ходових форсованих гілок без ідей",
                "з випадкових перших ходів щопартії",
                "з відмови від дебюту взагалі"
              ],
              "correctIndex": 0
            }
          },
          {
            "id": "ch-pr-repertoire-1",
            "type": "mcq",
            "promptUk": "Навіщо розуміти структуру більше, ніж довгий варіант?",
            "promptEn": "Why understand a structure more than a long line?",
            "options": [
              "суперник рано відхилиться, а ідеї лишаються",
              "варіанти ніколи не відхиляються",
              "структури заборонені в турнірах",
              "пам'ять завжди ідеальна"
            ],
            "correctIndex": 0,
            "explanationUk": "Після відхилення лишаються ідеї, не зникла нотація.",
            "explanationEn": "After a deviation, the ideas remain; the vanished notation does not."
          },
          {
            "id": "ch-pr-repertoire-2",
            "type": "mcq",
            "promptUk": "Точні ходи проти конкретної системи додають:",
            "promptEn": "Exact moves against a concrete system are added:",
            "options": [
              "після того, як план і структура вже зрозумілі",
              "замість будь-якого розуміння завжди",
              "тільки в ендшпілі",
              "ніколи, теорія зайва"
            ],
            "correctIndex": 0,
            "explanationUk": "Спочатку карта, потім точні стежки.",
            "explanationEn": "First the map, then the exact paths."
          }
        ],
      },
      {
        slug: "ch-pr-review",
        titleUk: "Огляд практичної роботи",
        titleEn: "A review of practical work",
        baseXp: 21,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "ch-pr-review-l",
            "type": "chess_lesson",
            "promptUk": "Початкова позиція: робота між партіями",
            "promptEn": "The starting position: the work between games",
            "fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
            "notesUk": "Початкова позиція — нагадування: кожна партія звідси, а майстерність росте між партіями. Цикл: зіграти, позначити першу зміну оцінки, перевірити CCT на зіві, виписати одну структурну ідею, повернутись до неї в наступній партії. Без цього циклу тисяча бліців дає мало. Одна розібрана партія цінніша за десять забутих.",
            "notesEn": "The starting position is a reminder: every game starts here, and skill grows between games. The cycle: play, mark the first evaluation change, check CCT on the blunder, write down one structural idea, and return to it in the next game. Without that cycle a thousand blitz games teach little. One reviewed game is worth more than ten forgotten ones.",
            "quiz": {
              "q": "Що робить розбір цінним?",
              "qEn": "What makes a review valuable?",
              "options": [
                "перша зміна оцінки, причина зіва, одна ідея на наступну партію",
                "лише рахунок перемог",
                "видалення партії",
                "зміна кольору фігур у записі"
              ],
              "correctIndex": 0
            }
          },
          {
            "id": "ch-pr-review-1",
            "type": "mcq",
            "promptUk": "Чому тисяча нерозібраних бліців дає мало?",
            "promptEn": "Why do a thousand unreviewed blitz games teach little?",
            "options": [
              "помилки повторюються без усвідомленої причини",
              "бліц заборонений як навчання",
              "у бліці немає дебюту",
              "запис партії неможливий"
            ],
            "correctIndex": 0,
            "explanationUk": "Без зворотного зв'язку практика закріплює зів.",
            "explanationEn": "Without feedback, practice consolidates the blunder."
          },
          {
            "id": "ch-pr-review-2",
            "type": "mcq",
            "promptUk": "Мінімальний цикл після партії:",
            "promptEn": "The minimal cycle after a game:",
            "options": [
              "позначити ключовий момент, знайти причину, перенести одну ідею далі",
              "лише закрити дошку",
              "написати скаргу на суперника",
              "змінити дебют випадково без висновку"
            ],
            "correctIndex": 0,
            "explanationUk": "Малий цикл, виконаний завжди, сильніший за ідеальний розбір раз на рік.",
            "explanationEn": "A small cycle done every time beats a perfect review once a year."
          }
        ],
      },
    ],
  },
];

export function expandChess(course: CourseContent): CourseContent {
  return expandCourse(course, {}, newUnits);
}
