import type { CourseContent, UnitContent } from "../types.js";
import { expandCourse } from "./factory.js";

const newUnits: UnitContent[] = [
  {
    "slug": "ch-deep-notation",
    "titleUk": "Нотація і повні правила",
    "titleEn": "Notation and complete rules",
    "lessons": [
      {
        "slug": "ch-d-algebraic",
        "titleUk": "Алгебраїчна нотація і символи",
        "titleEn": "Algebraic notation and symbols",
        "baseXp": 18,
        "difficulty": 2,
        "exercises": [
          {
            "id": "ch-d-algebraic-l",
            "type": "chess_lesson",
            "promptUk": "Алгебраїчна нотація і символи",
            "promptEn": "Algebraic notation and symbols",
            "fen": "r3k2r/ppp2ppp/8/8/8/8/PPP2PPP/R3K2R w KQkq - 0 1",
            "notesUk": "Алгебраїчна нотація — міжнародна мова шахів: кожна клітинка має ім'я з літери файлу (a–h, зліва направо від білих) і цифри горизонталі (1–8, від білих). Хід пішака записують лише клітинкою прибуття: e4, d5. Хід фігури починається з літери фігури англійською: K (king, король), Q (queen, ферзь), R (rook, тура), B (bishop, слон), N (knight, кінь — K уже зайняте королем). Приклад: Nf3, Bb5, Qh4.\n\nВзяття позначають «x»: Bxe6, exd5. Шах — «+», мат — «#». Рокіровка: O-O (коротка) і O-O-O (довга). Перетворення: e8=Q або e8=N. Якщо дві однакові фігури можуть піти на ту саму клітинку, додають файл або горизонталь відправлення: Nbd2 (кінь з b), R1e2 (тура з першої горизонталі), Qh4e1.\n\nНа українських бланках інколи пишуть Кр (король) і К (кінь), Ф, Т, С; у міжнародних партіях і в цьому курсі завжди латиниця KQRBN. Анотаційні символи не є частиною офіційного запису ходу, але їх варто знати: ! сильний хід, ? помилка, !! блискучий, ?? груба помилка, !? цікавий, ?! сумнівний.\n\nТипові помилки: плутати N і K; писати «Ке4» без уточнення, який кінь; забувати «x» чи «+»; записувати рокіровку як «Кe1–g1» замість O-O. На діаграмі праворуч білі можуть рокірувати в обидва боки — це O-O і O-O-O, не «Rh-f1».",
            "notesEn": "Algebraic notation is the international language of chess: every square has a name made of a file letter (a–h, left to right from White) and a rank number (1–8, up from White). A pawn move is written as the arrival square only: e4, d5. A piece move starts with an English letter: K (king), Q (queen), R (rook), B (bishop), N (knight — K is already taken by the king). Examples: Nf3, Bb5, Qh4.\n\nA capture is marked with “x”: Bxe6, exd5. Check is “+”, checkmate is “#”. Castling is O-O (short) and O-O-O (long). Promotion: e8=Q or e8=N. When two identical pieces can go to the same square, add the departure file or rank: Nbd2 (the knight from b), R1e2 (the rook from the first rank), Qh4e1.\n\nUkrainian scoresheets sometimes use Кр (king) and К (knight), plus Ф, Т, С; in international games and in this course we always use Latin KQRBN. Annotation symbols are not part of the official move, but you should know them: ! a strong move, ? a mistake, !! brilliant, ?? a blunder, !? interesting, ?! dubious.\n\nTypical mistakes: mixing up N and K; writing a knight move with no disambiguation; forgetting “x” or “+”; recording castling as “Ke1–g1” instead of O-O. In the diagram White may castle either side — that is O-O and O-O-O, not “Rh-f1”.",
            "quiz": {
              "q": "Як записати коротку рокіровку?",
              "qEn": "How is short (kingside) castling written?",
              "options": [
                "O-O",
                "O-O-O",
                "Ke1–g1",
                "K-R"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "O-O",
                "O-O-O",
                "Ke1–g1",
                "K-R"
              ]
            }
          },
          {
            "id": "ch-d-algebraic-m1",
            "type": "mcq",
            "promptUk": "Яка літера позначає коня в міжнародній нотації?",
            "promptEn": "Which letter stands for the knight in international notation?",
            "options": [
              "N",
              "K",
              "H",
              "Kt обов'язково"
            ],
            "correctIndex": 0,
            "explanationUk": "N від knight: K уже зайняте королем. Старе Kt майже не використовують.",
            "explanationEn": "N from knight: K is already the king. The old Kt is almost unused.",
            "optionsEn": [
              "N",
              "K",
              "H",
              "Kt is required"
            ]
          },
          {
            "id": "ch-d-algebraic-m2",
            "type": "mcq",
            "promptUk": "Два коні можуть піти на d2: з b1 і з f1. Як записати хід конем з b?",
            "promptEn": "Two knights can go to d2, from b1 and from f1. How do you write the move by the b-knight?",
            "options": [
              "Nbd2",
              "N1d2",
              "Nfd2",
              "Nd2b"
            ],
            "correctIndex": 0,
            "explanationUk": "Додаємо файл відправлення: Nbd2. Nfd2 було б конем з f.",
            "explanationEn": "Add the departure file: Nbd2. Nfd2 would be the knight from f.",
            "optionsEn": [
              "Nbd2",
              "N1d2",
              "Nfd2",
              "Nd2b"
            ]
          },
          {
            "id": "ch-d-algebraic-p1",
            "type": "chess_puzzle",
            "promptUk": "Запишіть мат у 1 хід у нотації (білі).",
            "promptEn": "Write the mate in one in notation (White to move).",
            "fen": "6k1/5ppp/8/8/8/2P5/5PPP/R5K1 w - - 0 1",
            "solutionSans": [
              "Ra8#"
            ],
            "difficulty": 2
          },
          {
            "id": "ch-d-algebraic-e",
            "type": "explain",
            "promptUk": "Навіщо вміти точно записувати ходи?",
            "promptEn": "Why does precise move-recording matter?",
            "keyIdeas": [
              {
                "labelUk": "Міжнародна мова",
                "labelEn": "International language",
                "anyOf": [
                  "нотац",
                  "notation",
                  "міжнарод",
                  "international",
                  "KQRBN"
                ]
              },
              {
                "labelUk": "Однозначність",
                "labelEn": "Unambiguous",
                "anyOf": [
                  "файл",
                  "file",
                  "уточн",
                  "disambigu",
                  "Nbd2"
                ]
              },
              {
                "labelUk": "Рокіровка і мат",
                "labelEn": "Castling and mate",
                "anyOf": [
                  "O-O",
                  "мат",
                  "mate",
                  "#"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Алгебраїчна нотація — міжнародна мова: фігури KQRBN, рокіровка O-O, мат з #. Якщо два коні можуть на ту саму клітинку, уточнюємо файл, як у Nbd2, щоб запис був однозначний.",
            "sampleAnswerEn": "Algebraic notation is the international language: pieces are KQRBN, castling is O-O, mate ends with #. When two knights can reach the same square we disambiguate the file, as in Nbd2, so the record is unambiguous."
          }
        ],
        "isFree": true
      },
      {
        "slug": "ch-d-values-draws",
        "titleUk": "Ціна фігур і всі нічиї",
        "titleEn": "Piece values and every kind of draw",
        "baseXp": 18,
        "difficulty": 2,
        "exercises": [
          {
            "id": "ch-d-values-draws-l",
            "type": "chess_lesson",
            "promptUk": "Ціна фігур і всі нічиї",
            "promptEn": "Piece values and every kind of draw",
            "fen": "7k/5Q2/6K1/8/8/8/8/8 b - - 0 1",
            "notesUk": "Орієнтовна ціна: пішак 1, кінь 3, слон 3, тура 5, ферзь 9, король — безцінний (його не міняють). Це шкала для орієнтиру, не закон. Пара слонів часто дорожча за слона і коня на відкритій дошці; кінь сильніший у закритих позиціях і на форпостах. «Виграти якість» — це забрати туру за слона чи коня (різниця близько двох пішаків).\n\nНічия буває кількох видів, і їх треба розрізняти. Пат: черга сторони, вона не під шахом і не має жодного легального ходу. На діаграмі якраз пат: чорний король на h8 не під шахом і не має ходу (ферзь на f7 і білий король на g6 забрали всі клітинки). Якби була черга білих, вони б поставили мат — тому «зайвий» шах ферзем інколи дарує пат.\n\nІнші нічиї: згода обох гравців; трикратне повторення позиції (ту саму позицію з тими самими правами рокіровки і взяття на проході — треба заявити); правило 50 ходів (50 повних ходів кожної сторони без взяття і ходу пішаком — теж заява); недостатній матеріал, з якого не можна поставити мат жодною грою: король проти короля, король і кінь проти короля, король і слон проти короля. Король і два коні проти короля автоматичною нічиєю не є: мат можливий, якщо суперник помилиться, але форсовано його немає.\n\nПрактична порада: коли ви виграєте, залишайте суперникові хоча б один легальний хід, який не зриває мат. Коли захищаєтесь, пат — законний ресурс, не «сором».",
            "notesEn": "Guideline values: pawn 1, knight 3, bishop 3, rook 5, queen 9, the king is priceless (you do not trade it). This is a compass, not a law. The bishop pair is often worth more than bishop and knight on an open board; a knight is stronger in closed positions and on outposts. “Winning the exchange” means taking a rook for a bishop or knight (about two pawns).\n\nDraws come in several kinds, and you should tell them apart. Stalemate: it is a side’s turn, they are not in check, and they have no legal move. The diagram is exactly that: the black king on h8 is not in check and has nowhere to go (the queen on f7 and the white king on g6 take every square). If it were White’s move they would mate — so an extra queen check can gift a stalemate.\n\nOther draws: agreement; threefold repetition of the same position with the same castling and en-passant rights (you must claim it); the 50-move rule (fifty complete moves by each side without a capture or pawn move — also a claim); insufficient material with which mate cannot occur by any play: king versus king, king and knight versus king, king and bishop versus king. King and two knights versus a lone king is not an automatic draw: mate is possible if the opponent blunders, but it cannot be forced.\n\nPractical advice: when you are winning, leave the opponent at least one legal move that does not spoil the mate. When you are defending, stalemate is a legal resource, not an embarrassment.",
            "quiz": {
              "q": "Що зображено на діаграмі, якщо черга чорних?",
              "qEn": "What is shown on the diagram if it is Black to move?",
              "options": [
                "Пат, партія — нічия",
                "Мат чорному королю",
                "Чорні мають хід Kh7",
                "Білі вже програли"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "Stalemate, the game is a draw",
                "Checkmate of the black king",
                "Black has the move Kh7",
                "White has already lost"
              ]
            }
          },
          {
            "id": "ch-d-values-draws-m1",
            "type": "mcq",
            "promptUk": "Що означає «виграти якість»?",
            "promptEn": "What does “winning the exchange” mean?",
            "options": [
              "забрати туру за слона або коня",
              "поставити мат ферзем",
              "виміняти ферзів",
              "забрати два пішаки"
            ],
            "correctIndex": 0,
            "explanationUk": "Якість — різниця між турою і легкою фігурою.",
            "explanationEn": "The exchange is the difference between a rook and a minor piece.",
            "optionsEn": [
              "taking a rook for a bishop or knight",
              "mating with a queen",
              "trading queens",
              "taking two pawns"
            ]
          },
          {
            "id": "ch-d-values-draws-m2",
            "type": "mcq",
            "promptUk": "Король і два коні проти голого короля — це автоматична нічия?",
            "promptEn": "Is king and two knights versus a lone king an automatic draw?",
            "options": [
              "Ні: мат можливий при помилці, але його не форсуєш",
              "Так, завжди одразу нічия",
              "Так, бо два коні коштують 6",
              "Ні, білі завжди форсують мат"
            ],
            "correctIndex": 0,
            "explanationUk": "Це не «недостатній матеріал» у строгому сенсі: мат буває, форсовано — ні.",
            "explanationEn": "It is not automatic insufficient material: mate can happen, but it is not forced.",
            "optionsEn": [
              "No: mate is possible after a blunder, but it cannot be forced",
              "Yes, it is always a draw at once",
              "Yes, because two knights are worth 6",
              "No, White always forces mate"
            ]
          },
          {
            "id": "ch-d-values-draws-m3",
            "type": "mcq",
            "promptUk": "Правило 50 ходів рахує:",
            "promptEn": "The 50-move rule counts:",
            "options": [
              "50 ходів кожної сторони без взяття і ходу пішаком",
              "50 ходів лише білих",
              "50 шахів поспіль",
              "50 хвилин на годиннику"
            ],
            "correctIndex": 0,
            "explanationUk": "Це 50 повних ходів (100 напівходів у FEN) без взяття і пішака.",
            "explanationEn": "That is 50 complete moves (100 half-moves in the FEN) without a capture or pawn move.",
            "optionsEn": [
              "50 moves by each side without a capture or pawn move",
              "50 moves by White only",
              "50 checks in a row",
              "50 minutes on the clock"
            ]
          },
          {
            "id": "ch-d-values-draws-e",
            "type": "explain",
            "promptUk": "Чим пат відрізняється від мату і від недостатнього матеріалу?",
            "promptEn": "How does stalemate differ from mate and from insufficient material?",
            "keyIdeas": [
              {
                "labelUk": "Пат",
                "labelEn": "Stalemate",
                "anyOf": [
                  "пат",
                  "stalemate",
                  "немає ходу",
                  "no legal",
                  "не під шахом",
                  "not in check"
                ]
              },
              {
                "labelUk": "Мат",
                "labelEn": "Mate",
                "anyOf": [
                  "мат",
                  "mate",
                  "шах",
                  "check"
                ]
              },
              {
                "labelUk": "Матеріал",
                "labelEn": "Material",
                "anyOf": [
                  "недостатн",
                  "insufficient",
                  "два коні",
                  "two knights"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Пат — черга сторони, вона не під шахом і немає легального ходу, це нічия. Мат — король під шахом і захисту немає. Король і два коні проти короля не є автоматично недостатнім матеріалом: мат можливий лише після помилки.",
            "sampleAnswerEn": "Stalemate is when it is your turn, you are not in check, and you have no legal move — a draw. Mate is check with no defence. King and two knights versus a lone king is not automatic insufficient material: mate is possible only after a blunder."
          }
        ]
      },
      {
        "slug": "ch-d-castle-legal",
        "titleUk": "Коли рокіровка заборонена",
        "titleEn": "When you may not castle",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "ch-d-castle-legal-l",
            "type": "chess_lesson",
            "promptUk": "Коли рокіровка заборонена",
            "promptEn": "When you may not castle",
            "fen": "r3k2r/8/8/8/2b5/8/8/R3K2R w KQkq - 0 1",
            "notesUk": "Рокіровка — хід короля (і тури в тій самій ході), не «два ходи». Вона дозволена лише якщо виконані всі умови одразу. Перша: ні король, ні саме та тура ще не ходили (у FEN це літери KQkq: право є, навіть якщо зараз стати не можна). Друга: між королем і турою немає фігур. Третя: король не стоїть під шахом — рокіруватись «із шаха» не можна. Четверта: король не проходить через атаковану клітинку і не стає на атаковану. Туру при цьому можуть атакувати — це не забороняє рокіровку.\n\nНа діаграмі в білих у FEN є права KQ, але слон чорних на c4 атакує f1. Коротка рокіровка O-O заборонена: король має пройти через f1. Довга O-O-O легальна: d1 і c1 слон не атакує, шлях чистий. Це класична пастка «права є — ходу немає».\n\nІнші типові випадки: після шаха король відійшов і повернувся — права вже втрачені назавжди, навіть якщо він знову на e1. Якщо ходили лише турою h1, коротка рокіровка мертва, довга ще жива. Рокіровка під «x-ray» атакою тури або слона, яка б'є прохідну клітинку, теж незаконна.\n\nПрактично: перед O-O запитайте «чи бита f1?». Перед O-O-O — «чи биті d1 і c1?». І пам'ятайте правило дотику: рокіровка починається з короля; якщо ви вперше торкнулись тури, суддя може зобов'язати лише хід турою.",
            "notesEn": "Castling is a king move (with the rook in the same move), not “two moves”. It is legal only when every condition holds at once. First: neither the king nor that very rook has moved (in the FEN the letters KQkq mean the right still exists, even if you cannot castle this instant). Second: the squares between king and rook are empty. Third: the king is not in check — you may not castle out of check. Fourth: the king does not pass through an attacked square and does not land on one. The rook may be under attack — that does not forbid castling.\n\nIn the diagram White’s FEN still shows KQ rights, but Black’s bishop on c4 attacks f1. Short castling O-O is illegal: the king would pass through f1. Long castling O-O-O is legal: d1 and c1 are not attacked and the path is clear. This is the classic trap “the right is there — the move is not”.\n\nOther typical cases: after a check the king stepped away and came back — the right is gone forever, even if he sits on e1 again. If only the h1-rook has moved, short castling is dead and long is still alive. Castling through an x-ray attack that hits a transit square is also illegal.\n\nIn practice: before O-O ask “is f1 attacked?”. Before O-O-O ask “are d1 and c1 attacked?”. And remember touch-move: castling starts with the king; if you touch the rook first, an arbiter may force a rook move only.",
            "quiz": {
              "q": "Чи можуть білі рокірувати вкоротке на цій діаграмі?",
              "qEn": "May White castle short in this diagram?",
              "options": [
                "Ні: король проходив би через атаковане f1",
                "Так, бо права K ще є у FEN",
                "Ні, бо тура h1 під боєм",
                "Так, слон не б'є g1"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "No: the king would pass through attacked f1",
                "Yes, because the K right is still in the FEN",
                "No, because the h1-rook is under attack",
                "Yes, the bishop does not hit g1"
              ]
            }
          },
          {
            "id": "ch-d-castle-legal-m1",
            "type": "mcq",
            "promptUk": "Чи можна рокіруватись, коли король стоїть під шахом?",
            "promptEn": "May you castle when the king is in check?",
            "options": [
              "Ні, з шаха рокіруватись не можна",
              "Так, якщо тура захищає",
              "Так, це спосіб утекти",
              "Лише в довгу сторону"
            ],
            "correctIndex": 0,
            "explanationUk": "Рокіровка не є способом піти від шаха.",
            "explanationEn": "Castling is not a way to escape check.",
            "optionsEn": [
              "No, you may not castle out of check",
              "Yes, if the rook defends",
              "Yes, it is a way to flee",
              "Only on the queenside"
            ]
          },
          {
            "id": "ch-d-castle-legal-m2",
            "type": "mcq",
            "promptUk": "Король ходив і повернувся на e1. Чи є право на рокіровку?",
            "promptEn": "The king moved and came back to e1. Is the right to castle still there?",
            "options": [
              "Немає: право втрачається назавжди після ходу короля",
              "Є, якщо він знову на e1",
              "Є, якщо суперник не заявив",
              "Є лише для довгої рокіровки"
            ],
            "correctIndex": 0,
            "explanationUk": "Хід короля гасить обидва права, повернення нічого не відновлює.",
            "explanationEn": "A king move kills both rights; coming back restores nothing.",
            "optionsEn": [
              "No: the right is lost forever once the king has moved",
              "Yes, if he is on e1 again",
              "Yes, if the opponent does not claim it",
              "Yes, but only for long castling"
            ]
          },
          {
            "id": "ch-d-castle-legal-m3",
            "type": "mcq",
            "promptUk": "Якщо атакована лише тура, а шлях короля чистий і не під боєм:",
            "promptEn": "If only the rook is attacked, and the king's path is clear and safe:",
            "options": [
              "рокіровка дозволена",
              "рокіровка заборонена",
              "дозволена лише після взяття",
              "дозволена лише в бліц"
            ],
            "correctIndex": 0,
            "explanationUk": "Обмеження стосуються короля, не тури.",
            "explanationEn": "The restrictions apply to the king, not the rook.",
            "optionsEn": [
              "castling is allowed",
              "castling is forbidden",
              "it is allowed only after a capture",
              "it is allowed only in blitz"
            ]
          }
        ]
      },
      {
        "slug": "ch-d-ep-promote",
        "titleUk": "Взяття на проході і підпромоція",
        "titleEn": "En passant and underpromotion",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "ch-d-ep-promote-l",
            "type": "chess_lesson",
            "promptUk": "Взяття на проході і підпромоція",
            "promptEn": "En passant and underpromotion",
            "fen": "rnbqkbnr/ppp2ppp/4p3/3pP3/8/8/PPPP1PPP/RNBQKBNR w KQkq d6 0 3",
            "notesUk": "Взяття на проході (en passant) — єдине взяття, коли пішак б'є не на клітинку суперника, а на «пропущену». Якщо пішак суперника з початкової горизонталі став на два поля і опинився поруч із вашим пішаком на тій самій горизонталі, ви можете взяти його так, ніби він став лише на одне поле. На діаграмі після …d7–d5 білий пішак e5 може взяти exd6: чорний пішак знімається з d5, білий стає на d6. У FEN це поле d6 (четверте поле запису).\n\nНайважливіше правило: право живе рівно один хід. Якщо ви не взяли одразу, право згорає. Не можна брати «на проході» пішака, який пішов лише на одне поле, і не можна брати іншою фігурою.\n\nПеретворення: пішак, що досягає останньої горизонталі, мусить стати ферзем, турою, слоном або конем тієї ж сторони — не королем і не пішаком. Зазвичай обирають ферзя, але інколи ферзь якраз поганий: він дарує пат або не дає потрібного шаха. Тоді роблять підпромоцію — найчастіше в коня (вилка або мат) чи в туру (як у славетній позиції Сааведри: ферзь дозволяє вічний шах або пат, тура виграє).\n\nТипові помилки: забути e.p. як захист від проходу пішака; «дограти» взяття на проході наступним ходом; автоматично ставити ферзя, не перевіривши пат. Перед перетворенням завжди запитайте: «а що, якщо не ферзь?»",
            "notesEn": "En passant is the only capture in which a pawn takes not on the opponent’s square but on the “passed-over” one. If an enemy pawn advances two squares from its starting rank and lands next to your pawn on the same rank, you may capture it as if it had moved only one square. In the diagram, after …d7–d5 the white pawn on e5 may play exd6: the black pawn comes off d5 and White lands on d6. In the FEN that square is d6 (the fourth field).\n\nThe crucial rule: the right lasts exactly one move. If you do not take at once, the right expires. You cannot take en passant a pawn that moved only one square, and no other piece can make this capture.\n\nPromotion: a pawn that reaches the last rank must become a queen, rook, bishop or knight of the same side — never a king or a pawn. Usually you choose a queen, but sometimes a queen is exactly wrong: it gives stalemate or fails to give the check you need. Then you underpromote — most often to a knight (a fork or a mate) or to a rook (as in the famous Saavedra position: a queen allows perpetual check or stalemate, a rook wins).\n\nTypical mistakes: forgetting e.p. as a way to stop a passed pawn; “saving” the en-passant capture for next move; always promoting to a queen without checking for stalemate. Before you promote, always ask: “what if it is not a queen?”",
            "quiz": {
              "q": "На діаграмі білі можуть:",
              "qEn": "In the diagram White may:",
              "options": [
                "взяти на проході: exd6, чорний пішак знімається з d5",
                "взяти exd5 звичайним шляхом",
                "взяти на проході наступним ходом, якщо зараз зіграють інше",
                "взяти пішака d5 турою"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "capture en passant: exd6, the black pawn comes off d5",
                "capture exd5 in the ordinary way",
                "save the en-passant capture for next move if they play something else now",
                "take the d5-pawn with a rook"
              ]
            }
          },
          {
            "id": "ch-d-ep-promote-p1",
            "type": "chess_puzzle",
            "promptUk": "Візьміть на проході (білі).",
            "promptEn": "Capture en passant (White to move).",
            "fen": "rnbqkbnr/ppp2ppp/4p3/3pP3/8/8/PPPP1PPP/RNBQKBNR w KQkq d6 0 3",
            "solutionSans": [
              "exd6"
            ],
            "difficulty": 2
          },
          {
            "id": "ch-d-ep-promote-p2",
            "type": "chess_puzzle",
            "promptUk": "Позиція Сааведри: підпромоція виграє, ферзь дає пат. Як перетворити пішака?",
            "promptEn": "The Saavedra position: underpromotion wins, a queen allows stalemate. How do you promote?",
            "fen": "8/2P5/8/8/3r4/8/2K5/k7 w - - 0 1",
            "solutionSans": [
              "c8=R",
              "Ra4",
              "Kb3"
            ],
            "difficulty": 4
          },
          {
            "id": "ch-d-ep-promote-m1",
            "type": "mcq",
            "promptUk": "Скільки ходів живе право взяття на проході?",
            "promptEn": "How long does the right to capture en passant last?",
            "options": [
              "рівно один хід, одразу після стрибка пішака на два поля",
              "усю партію",
              "поки пішак стоїть поруч",
              "три ходи"
            ],
            "correctIndex": 0,
            "explanationUk": "Не взяли одразу — право згоріло.",
            "explanationEn": "If you do not take at once, the right is gone.",
            "optionsEn": [
              "exactly one move, immediately after the two-square pawn advance",
              "the whole game",
              "as long as the pawn stands next to yours",
              "three moves"
            ]
          },
          {
            "id": "ch-d-ep-promote-e",
            "type": "explain",
            "promptUk": "Коли обирати не ферзя при перетворенні?",
            "promptEn": "When should you promote to something other than a queen?",
            "keyIdeas": [
              {
                "labelUk": "Пат",
                "labelEn": "Stalemate",
                "anyOf": [
                  "пат",
                  "stalemate",
                  "Сааведр",
                  "Saavedra",
                  "тура",
                  "rook"
                ]
              },
              {
                "labelUk": "Кінь",
                "labelEn": "Knight",
                "anyOf": [
                  "кінь",
                  "knight",
                  "вилк",
                  "fork",
                  "підпромоц",
                  "underpromot"
                ]
              },
              {
                "labelUk": "e.p.",
                "labelEn": "En passant",
                "anyOf": [
                  "проход",
                  "passant",
                  "один хід",
                  "one move"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Право взяття на проході живе лише один хід. При перетворенні ферзь не завжди найкращий: у позиції Сааведри тура уникає пату, а кінь інколи дає вилку або мат — це підпромоція.",
            "sampleAnswerEn": "The en passant right lasts only one move. On promotion a queen is not always best: in the Saavedra position a rook avoids stalemate, and a knight sometimes gives a fork or mate — that is underpromotion."
          }
        ]
      },
      {
        "slug": "ch-d-record",
        "titleUk": "Запис партії, годинник, правило дотику",
        "titleEn": "Recording, the clock, and touch-move",
        "baseXp": 18,
        "difficulty": 2,
        "exercises": [
          {
            "id": "ch-d-record-l",
            "type": "chess_lesson",
            "promptUk": "Запис партії, годинник, правило дотику",
            "promptEn": "Recording, the clock, and touch-move",
            "fen": "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
            "notesUk": "У турнірі з класичним контролем ви зобов'язані записувати свої і суперника ходи на бланку алгебраїчною нотацією — до того, як зробите наступний хід (у багатьох регламентах свій хід можна дописати після того, як перемкнули годинник, але не можна залишати кілька ходів «на потім»). Результат партії: 1-0 (перемога білих), 0-1 (чорних), 1/2-1/2 (нічия). Бланк — документ: арбітр дивиться його при заяві повторення чи 50 ходів.\n\nГодинник. Після свого ходу ви зупиняєте свої стрілки (натискаєте кнопку) тією ж рукою, якою ходили. Контроль буває різний: «раптова смерть» (час витік — поразка, якщо суперник може поставити мат будь-якою грою); додавання (інкремент Фішера: після ходу додаються секунди); затримка (час починає йти не одразу). Прапорець (flag) означає, що час вичерпано. У бліц запис не ведуть під час партії.\n\nПравило дотику (touch-move): навмисно торкнулись своєї фігури — мусите нею ходіти, якщо є легальний хід; торкнулись фігури суперника — мусите взяти її, якщо можна. «Поправляю» / j'adoube кажуть ДО дотику, коли хочете лише вирівняти фігуру. Рокіровку починають з короля. Відпустити фігуру на клітинці (release) зазвичай означає, що хід зроблено.\n\nТипові помилки: записувати хід заздалегідь і тоді змінювати думку (у багатьох правилах це не заборонено, але бланк має відповідати дошці); натискати годинник до завершення ходу; торкатись фігури «подумати» без j'adoube.",
            "notesEn": "In a classical tournament you must record both your moves and your opponent’s in algebraic notation on a scoresheet — before you play the next move (some regulations allow you to complete your own move’s writing after pressing the clock, but you may not leave several moves “for later”). The result is 1-0 (White wins), 0-1 (Black wins), 1/2-1/2 (draw). The scoresheet is a document: an arbiter reads it when a repetition or 50-move claim is made.\n\nThe clock. After your move you stop your own clock (press the button) with the same hand you moved with. Time controls vary: sudden death (if your time runs out you lose, provided the opponent can still mate by any series of moves); increment (Fischer: seconds are added after each move); delay (the clock does not start at once). A fallen flag means the time is gone. In blitz you do not keep score during the game.\n\nTouch-move: if you deliberately touch your own piece, you must move it if a legal move exists; if you touch an opponent’s piece, you must capture it if you can. Say “j’adoube” / “I adjust” BEFORE touching when you only want to straighten a piece. Castling starts with the king. Releasing a piece on a square usually completes the move.\n\nTypical mistakes: writing a move far in advance and then changing your mind while the scoresheet drifts from the board; pressing the clock before the move is finished; touching a piece “to think” without j’adoube.",
            "quiz": {
              "q": "Якщо ви навмисно торкнулись своєї фігури, що має легальний хід:",
              "qEn": "If you deliberately touch your own piece that has a legal move:",
              "options": [
                "ви мусите нею походити",
                "можна походити будь-якою",
                "можна сказати «поправляю» після дотику",
                "треба взяти фігуру суперника"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "you must move it",
                "you may move any piece",
                "you may say “I adjust” after touching",
                "you must capture an enemy piece"
              ]
            }
          },
          {
            "id": "ch-d-record-m1",
            "type": "mcq",
            "promptUk": "Результат 1/2-1/2 означає:",
            "promptEn": "The result 1/2-1/2 means:",
            "options": [
              "нічия",
              "перемога білих у два очки",
              "поразка чорних",
              "партію скасовано"
            ],
            "correctIndex": 0,
            "explanationUk": "Кожен отримує пів очка.",
            "explanationEn": "Each player scores half a point.",
            "optionsEn": [
              "a draw",
              "a two-point win for White",
              "a loss for Black",
              "the game is cancelled"
            ]
          },
          {
            "id": "ch-d-record-m2",
            "type": "mcq",
            "promptUk": "Інкремент Фішера — це:",
            "promptEn": "Fischer increment is:",
            "options": [
              "секунди, які додають після кожного ходу",
              "штраф за запізнення",
              "додаткова тура турніру",
              "час лише на рокіровку"
            ],
            "correctIndex": 0,
            "explanationUk": "Після ходу ваш годинник отримує додані секунди.",
            "explanationEn": "After a move your clock receives the added seconds.",
            "optionsEn": [
              "seconds added after every move",
              "a fine for being late",
              "an extra tournament round",
              "time only for castling"
            ]
          },
          {
            "id": "ch-d-record-m3",
            "type": "mcq",
            "promptUk": "Коли казати «поправляю» / j'adoube?",
            "promptEn": "When do you say “j’adoube” / “I adjust”?",
            "options": [
              "до дотику, якщо лише вирівнюєте фігуру",
              "після того, як фігура вже в руці",
              "лише після контролю часу",
              "ніколи, це заборонено"
            ],
            "correctIndex": 0,
            "explanationUk": "Слово має прозвучати до дотику, інакше спрацює правило дотику.",
            "explanationEn": "The word must come before the touch, or touch-move applies.",
            "optionsEn": [
              "before touching, if you are only straightening a piece",
              "after the piece is already in your hand",
              "only after the time control",
              "never, it is forbidden"
            ]
          },
          {
            "id": "ch-d-record-e",
            "type": "explain",
            "promptUk": "Що зобов'язаний робити гравець із бланком і годинником у класиці?",
            "promptEn": "What must a player do with the scoresheet and the clock in classical chess?",
            "keyIdeas": [
              {
                "labelUk": "Запис",
                "labelEn": "Recording",
                "anyOf": [
                  "бланк",
                  "scoresheet",
                  "запис",
                  "record",
                  "нотац",
                  "notation"
                ]
              },
              {
                "labelUk": "Годинник",
                "labelEn": "Clock",
                "anyOf": [
                  "годинник",
                  "clock",
                  "інкремент",
                  "increment",
                  "кнопк",
                  "press"
                ]
              },
              {
                "labelUk": "Дотик",
                "labelEn": "Touch",
                "anyOf": [
                  "дотик",
                  "touch",
                  "поправляю",
                  "adoube",
                  "j'adoube"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "У класиці ведуть бланк алгебраїчною нотацією — це документ для заяв. Після ходу натискають годинник, інкремент додає секунди. Правило дотику: торкнулись — ходіть; «поправляю» кажуть до дотику.",
            "sampleAnswerEn": "In classical chess you keep a scoresheet in algebraic notation — a document for claims. After a move you press the clock; increment adds seconds. Touch-move: if you touch it, you move it; “j’adoube” is said before touching."
          }
        ]
      },
      {
        "slug": "ch-deep-notation-exam",
        "titleUk": "Іспит: нотація і повні правила",
        "titleEn": "Exam: notation and complete rules",
        "baseXp": 30,
        "difficulty": 3,
        "isExam": true,
        "passThreshold": 0.7,
        "exercises": [
          {
            "id": "ch-deep-notation-exam-q1",
            "type": "mcq",
            "promptUk": "Як записати довгу рокіровку?",
            "promptEn": "How is long (queenside) castling written?",
            "options": [
              "O-O-O",
              "O-O",
              "0-0",
              "Ke1–c1"
            ],
            "correctIndex": 0,
            "explanationUk": "Три літери O і два дефіси: O-O-O.",
            "explanationEn": "Three O’s and two hyphens: O-O-O.",
            "optionsEn": [
              "O-O-O",
              "O-O",
              "0-0",
              "Ke1–c1"
            ]
          },
          {
            "id": "ch-deep-notation-exam-q2",
            "type": "mcq",
            "promptUk": "Пат — це коли:",
            "promptEn": "Stalemate is when:",
            "options": [
              "черга сторони, вона не під шахом і не має легального ходу",
              "король під шахом і немає захисту",
              "повторилася позиція",
              "гравці згодились після 10 ходів"
            ],
            "correctIndex": 0,
            "explanationUk": "Пат — нічия, мат — перемога.",
            "explanationEn": "Stalemate is a draw; mate is a win.",
            "optionsEn": [
              "it is a side’s turn, they are not in check, and they have no legal move",
              "the king is in check and has no defence",
              "the position has repeated",
              "the players agreed after 10 moves"
            ]
          },
          {
            "id": "ch-deep-notation-exam-q3",
            "type": "mcq",
            "promptUk": "Рокіровка заборонена, якщо:",
            "promptEn": "Castling is forbidden if:",
            "options": [
              "король проходить через атаковану клітинку",
              "тура стоїть під боєм, а шлях короля безпечний",
              "суперник має пару слонів",
              "на дошці є право e.p."
            ],
            "correctIndex": 0,
            "explanationUk": "Ключове — шлях і місце прибуття короля, не тура під боєм.",
            "explanationEn": "The key is the king's path and landing square, not a rook under attack.",
            "optionsEn": [
              "the king would pass through an attacked square",
              "the rook is attacked but the king's path is safe",
              "the opponent has the bishop pair",
              "an en-passant right is on the board"
            ]
          },
          {
            "id": "ch-deep-notation-exam-q4",
            "type": "mcq",
            "promptUk": "Підпромоція — це:",
            "promptEn": "Underpromotion is:",
            "options": [
              "перетворення не на ферзя, а на туру, слона або коня",
              "пішак залишається пішаком",
              "перетворення на короля",
              "взяття на проході"
            ],
            "correctIndex": 0,
            "explanationUk": "Часто щоб уникнути пату або дати шахового коня.",
            "explanationEn": "Often to avoid stalemate or to give a checking knight.",
            "optionsEn": [
              "promoting not to a queen but to a rook, bishop or knight",
              "the pawn stays a pawn",
              "promoting to a king",
              "capturing en passant"
            ]
          },
          {
            "id": "ch-deep-notation-exam-p5",
            "type": "chess_puzzle",
            "promptUk": "Візьміть на проході.",
            "promptEn": "Capture en passant.",
            "fen": "rnbqkbnr/ppp2ppp/4p3/3pP3/8/8/PPPP1PPP/RNBQKBNR w KQkq d6 0 3",
            "solutionSans": [
              "exd6"
            ],
            "difficulty": 2
          }
        ]
      }
    ]
  },
  {
    "slug": "ch-deep-calc-viz",
    "titleUk": "Розрахунок і візуалізація",
    "titleEn": "Calculation and visualisation",
    "lessons": [
      {
        "slug": "ch-d-viz-1",
        "titleUk": "Побачити на хід далі",
        "titleEn": "Seeing one move further",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "ch-d-viz-1-l",
            "type": "chess_lesson",
            "promptUk": "Побачити на хід далі",
            "promptEn": "Seeing one move further",
            "fen": "r6k/6pp/7N/8/8/8/5QPP/5R1K w - - 0 1",
            "notesUk": "Візуалізація — уміння тримати в голові позицію після ще не зроблених ходів, не рухаючи фігури. Початківці часто бачать перший удар і зупиняються: «ферзь дає шах — добре». Майстер запитує: «а що тоді відповість суперник, і що я зроблю наступним?» Саме другий і третій півходи відрізняють комбінацію від зірваної атаки.\n\nНа діаграмі очевидне Qf8 виглядає як взяття тури з шахом. Потрібно побачити відповідь: тура б'є ферзя, — і вже тоді наступний удар тури білих на f8 ставить мат. Якщо зупинитись на «ферзя заберуть», можна відкинути правильний хід. Завдання тренування: дивлячись на нерухому дошку, назвати кінцеву позицію («король у куті, тура на f8, кінь тримає g8»).\n\nМетод: після кожного уявного ходу освіжіть «нову» дошку — які лінії відкрились, які клітинки звільнились, де тепер король. Типова помилка — залишити в уяві фігуру на старому місці (привид). Інша — не помітити шаха у відповіді, який зриває вашу «виграшну» лінію.\n\nВправа без ходів: дивіться на позицію 30 секунд, закрийте очі, назвіть усі фігури й один форсований варіант до кінця. Потім перевірте на дошці. Це і є «побачити на хід далі».",
            "notesEn": "Visualisation is the skill of holding in your head the position after moves not yet played, without touching the pieces. Beginners often see the first blow and stop: “the queen checks — good.” A stronger player asks: “and what does the opponent reply, and what do I play next?” It is the second and third half-moves that turn a combination into a successful one rather than a failed attack.\n\nIn the diagram the obvious Qf8 looks like winning a rook with check. You must see the reply: the rook takes the queen — and only then the next blow, White’s rook to f8, is mate. If you stop at “they will take my queen”, you may reject the right move. The training task: looking at a still board, name the final picture (“king in the corner, rook on f8, knight covering g8”).\n\nThe method: after every imagined move, refresh the “new” board — which lines opened, which squares emptied, where the king sits now. A typical mistake is leaving a piece on its old square in your mind (a ghost). Another is missing a check in the reply that wrecks your “winning” line.\n\nA no-move drill: look at a position for 30 seconds, close your eyes, name every piece and one forced line to the end. Then check it on the board. That is “seeing one move further”.",
            "quiz": {
              "q": "Чому Qf8+ тут правильний, хоча ферзя забирають?",
              "qEn": "Why is Qf8+ correct here even though the queen is captured?",
              "options": [
                "після Rxf8 наступне Rxf8 ставить мат",
                "ферзя насправді не можна взяти",
                "це пат",
                "треба спочатку забрати пішака"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "after Rxf8 the next move Rxf8 is mate",
                "the queen cannot actually be taken",
                "it is stalemate",
                "you should take a pawn first"
              ]
            }
          },
          {
            "id": "ch-d-viz-1-p1",
            "type": "chess_puzzle",
            "promptUk": "Мат у 2: побачте відповідь суперника і фінальний удар.",
            "promptEn": "Mate in two: see the opponent's reply and the final blow.",
            "fen": "r6k/6pp/7N/8/8/8/5QPP/5R1K w - - 0 1",
            "solutionSans": [
              "Qf8+",
              "Rxf8",
              "Rxf8#"
            ],
            "difficulty": 3
          },
          {
            "id": "ch-d-viz-1-m1",
            "type": "mcq",
            "promptUk": "«Привид» у розрахунку — це:",
            "promptEn": "A “ghost” in calculation is:",
            "options": [
              "фігура, яку ви залишили в уяві на старому місці",
              "зайвий ферзь суперника",
              "помилка нотації",
              "хід поза дошкою"
            ],
            "correctIndex": 0,
            "explanationUk": "Оновлюйте уявну позицію після кожного півходу.",
            "explanationEn": "Refresh the imagined position after every half-move.",
            "optionsEn": [
              "a piece you left on its old square in your mind",
              "an extra enemy queen",
              "a notation error",
              "a move off the board"
            ]
          },
          {
            "id": "ch-d-viz-1-m2",
            "type": "mcq",
            "promptUk": "Коли варто зупинити перший погляд і запитати «що тоді?»",
            "promptEn": "When should you stop the first glance and ask “and then?”",
            "options": [
              "щойно побачили шах, взяття або «виграш фігури»",
              "лише після години розрахунку",
              "ніколи, перший хід завжди правильний",
              "лише в ендшпілі"
            ],
            "correctIndex": 0,
            "explanationUk": "Саме після очевидного удару шукайте відповідь і наступний хід.",
            "explanationEn": "Right after an obvious blow, look for the reply and the next move.",
            "optionsEn": [
              "as soon as you see a check, a capture, or a “won piece”",
              "only after an hour of calculation",
              "never: the first move is always right",
              "only in the endgame"
            ]
          },
          {
            "id": "ch-d-viz-1-e",
            "type": "explain",
            "promptUk": "Як тренувати візуалізацію на одній нерухомій позиції?",
            "promptEn": "How do you train visualisation on one still position?",
            "keyIdeas": [
              {
                "labelUk": "Далі",
                "labelEn": "Further",
                "anyOf": [
                  "хід далі",
                  "one move",
                  "наступн",
                  "next",
                  "відповід",
                  "reply"
                ]
              },
              {
                "labelUk": "Привид",
                "labelEn": "Ghost",
                "anyOf": [
                  "привид",
                  "ghost",
                  "уяв",
                  "imagin"
                ]
              },
              {
                "labelUk": "Форс",
                "labelEn": "Force",
                "anyOf": [
                  "форсован",
                  "forced",
                  "мат",
                  "mate"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Дивлячись на нерухому дошку, треба побачити на хід далі: відповідь суперника і наступний удар, як у маті після жертви ферзя. Оновлюйте уявну позицію, щоб не залишити привид фігури, і рахуйте форсований варіант до кінця.",
            "sampleAnswerEn": "Looking at a still board you must see one move further: the opponent’s reply and the next blow, as in the mate after a queen sacrifice. Refresh the imagined position so you do not leave a ghost piece, and calculate the forced line to the end."
          }
        ]
      },
      {
        "slug": "ch-d-candidates",
        "titleUk": "Кандидатні ходи",
        "titleEn": "Candidate moves",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "ch-d-candidates-l",
            "type": "chess_lesson",
            "promptUk": "Кандидатні ходи",
            "promptEn": "Candidate moves",
            "fen": "6k1/5ppp/8/8/8/4Q3/5PPP/6K1 w - - 0 1",
            "notesUk": "Метод кандидатних ходів (ідеї Котова, у практичному вигляді): не рахуйте «все підряд». Спочатку складіть короткий список ходів, які взагалі можуть вирішити позицію, — і лише потім рахуйте кожен до кінця, не змішуючи варіанти. Кандидати майже завжди серед шахів, взять, загроз мату і ходів, що суттєво змінюють позицію (прорив, жертва, фіксація слабкості).\n\nНа діаграмі у ферзя багато клітинок, але кандидат, який закриває тему, один: Qe8#. Інші ходи ферзем — це вже «розваги», їх не треба рахувати глибоко, якщо мат у один хід є. У складнішій позиції кандидатів буде два-чотири: наприклад, жертва на h7, тихий хід Qf6 і профілактика Kh1. Складіть список письмово або пошепки, потім рахуйте по одному.\n\nТипові помилки: почати рахувати перший-ліпший хід і «закохатись» у нього; викинути з кандидатів тихий хід, бо він не дає шаха; змішати ходи з двох варіантів (уявити фігуру одночасно на двох клітинках). Якщо в кінці розрахунку вам не подобається позиція, поверніться до списку: можливо, кандидат не той, а не «рахунок поганий».\n\nПрактичне правило: щонайменше два кандидати, якщо позиція не є форсованим матом. Один хід — це підозра, що ви щось не розглянули.",
            "notesEn": "The candidate-move method (Kotov’s idea in practical form): do not calculate “everything in a row”. First make a short list of moves that could actually decide the position — and only then calculate each one to the end, without mixing lines. Candidates almost always come from checks, captures, mate threats, and moves that change the position sharply (a break, a sacrifice, fixing a weakness).\n\nIn the diagram the queen has many squares, but the candidate that ends the discussion is one: Qe8#. Other queen moves are already “entertainment”; you need not calculate them deeply if mate in one exists. In a richer position you will have two to four candidates: say a sacrifice on h7, a quiet Qf6, and the prophylactic Kh1. Write the list, or whisper it, then calculate one at a time.\n\nTypical mistakes: starting with the first move you notice and falling in love with it; dropping a quiet move from the list because it is not a check; mixing moves from two lines (imagining a piece on two squares at once). If at the end of a calculation you dislike the position, return to the list: maybe the candidate is wrong, not the arithmetic.\n\nA practical rule: at least two candidates unless the position is a forced mate. A single move is a hint that you have missed something.",
            "quiz": {
              "q": "Що зробити першим у розрахунку за методом кандидатів?",
              "qEn": "What should you do first in calculation, by the candidate method?",
              "options": [
                "скласти короткий список гідних ходів, потім рахувати кожен до кінця",
                "рахувати перший-ліпший хід на десять ходів",
                "рахувати всі ходи фігур порівну",
                "ходити одразу і думати потім"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "make a short list of worthy moves, then calculate each to the end",
                "calculate the first move you see for ten moves",
                "calculate every piece's moves equally",
                "move at once and think afterwards"
              ]
            }
          },
          {
            "id": "ch-d-candidates-p1",
            "type": "chess_puzzle",
            "promptUk": "Оберіть правильного кандидата: мат у 1.",
            "promptEn": "Pick the right candidate: mate in one.",
            "fen": "6k1/5ppp/8/8/8/4Q3/5PPP/6K1 w - - 0 1",
            "solutionSans": [
              "Qe8#"
            ],
            "difficulty": 1
          },
          {
            "id": "ch-d-candidates-m1",
            "type": "mcq",
            "promptUk": "Звідки зазвичай беруться кандидатні ходи?",
            "promptEn": "Where do candidate moves usually come from?",
            "options": [
              "шахи, взяття, загрози мату і різкі зміни позиції",
              "лише ходи крайніми пішаками",
              "лише відхід короля",
              "ходи, що повторюють останній хід суперника"
            ],
            "correctIndex": 0,
            "explanationUk": "CCT і зміна структури — перший фільтр.",
            "explanationEn": "CCT and a change of structure are the first filter.",
            "optionsEn": [
              "checks, captures, mate threats and sharp changes of the position",
              "only wing-pawn moves",
              "only king retreats",
              "moves that copy the opponent's last move"
            ]
          },
          {
            "id": "ch-d-candidates-m2",
            "type": "mcq",
            "promptUk": "Чому небезпечно «змішувати варіанти»?",
            "promptEn": "Why is it dangerous to “mix lines”?",
            "options": [
              "ви уявляєте фігуру одразу на двох клітинках і отримуєте фальшивий рахунок",
              "так забороняє нотація",
              "арбітр зупинить партію",
              "це завжди дає пат"
            ],
            "correctIndex": 0,
            "explanationUk": "Кожен кандидат — окреме дерево, без перенесення ходів.",
            "explanationEn": "Each candidate is a separate tree; do not carry moves across.",
            "optionsEn": [
              "you imagine a piece on two squares at once and get a false result",
              "notation forbids it",
              "the arbiter will stop the game",
              "it always gives stalemate"
            ]
          },
          {
            "id": "ch-d-candidates-e",
            "type": "explain",
            "promptUk": "Опишіть метод кандидатних ходів своїми словами.",
            "promptEn": "Describe the candidate-move method in your own words.",
            "keyIdeas": [
              {
                "labelUk": "Список",
                "labelEn": "List",
                "anyOf": [
                  "список",
                  "list",
                  "кандидат",
                  "candidate"
                ]
              },
              {
                "labelUk": "До кінця",
                "labelEn": "To the end",
                "anyOf": [
                  "до кінця",
                  "to the end",
                  "не зміш",
                  "mix",
                  "окрем",
                  "separate"
                ]
              },
              {
                "labelUk": "Шах і взяття",
                "labelEn": "Checks and captures",
                "anyOf": [
                  "шах",
                  "check",
                  "взятт",
                  "capture",
                  "мат",
                  "mate"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Спочатку складаємо короткий список кандидатів — шахи, взяття, загрози мату — і лише потім рахуємо кожен варіант до кінця окремо, не змішуючи лінії.",
            "sampleAnswerEn": "First we make a short list of candidates — checks, captures, mate threats — and only then calculate each line to the end separately, without mixing lines."
          }
        ]
      },
      {
        "slug": "ch-d-quiet",
        "titleUk": "Тихий хід",
        "titleEn": "The quiet move",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "ch-d-quiet-l",
            "type": "chess_lesson",
            "promptUk": "Тихий хід",
            "promptEn": "The quiet move",
            "fen": "6k1/5p1p/6p1/8/8/5Q2/5PPP/6K1 w - - 0 1",
            "notesUk": "Не кожен вирішальний хід — шах або взяття. Тихий хід нічого не бере і не шахує, але ставить невідворотну загрозу (часто подвійну) або забирає в суперника захист. Такі ходи легко випадають зі списку кандидатів, бо око шукає «шум».\n\nНа діаграмі ферзь може дати кілька шахів, які нічого не дають. Тихий Qf6 не шахує: з f6 ферзь не б'є короля на g8 (це хід коня). Зате він загрожує увійти на f7 і на h6, і стискає чорних на останній горизонталі. Суперник раптом виявляє, що «просто захиститись від шаха» нічим: шаха ще немає, а позиція вже важка.\n\nІнші тихі ідеї: хід королем з останньої горизонталі (luft як профілактика — протилежний бік тиші: прибрати свою слабкість); тиха жертва, яку не обов'язково брати одразу, але загроза мату змушує; цугцванг — тихий хід, після якого будь-яка відповідь псує позицію.\n\nТипові помилки: не розглядати тихий хід, бо «він нічого не робить»; зробити тихий хід, не перевіривши, чи суперник сам не ставить мат; переоцінити тихий хід, коли є форсований мат. Правило: додайте до кандидатів один нефорсований хід і запитайте, яку подвійну загрозу він створює.",
            "notesEn": "Not every decisive move is a check or a capture. A quiet move takes nothing and checks no one, but it creates an irresistible threat (often a double one) or strips the opponent of a defence. Such moves drop easily from the candidate list, because the eye looks for “noise”.\n\nIn the diagram the queen can give several checks that lead nowhere. The quiet Qf6 does not check: from f6 the queen does not attack the king on g8 (that would be a knight’s move). But it threatens to enter on f7 and on h6, and it squeezes Black on the back rank. The opponent suddenly finds there is nothing to “just meet a check” with: there is no check yet, and the position is already difficult.\n\nOther quiet ideas: a king move that makes luft (prophylaxis — the other face of quiet: removing your own weakness); a quiet sacrifice that need not be taken at once, but a mate threat forces a concession; zugzwang — a quiet move after which any reply spoils the position.\n\nTypical mistakes: ignoring a quiet move because “it does nothing”; playing a quiet move without checking whether the opponent can mate first; overvaluing a quiet move when a forced mate exists. The rule: add one non-forcing move to your candidates and ask what double threat it creates.",
            "quiz": {
              "q": "Чому Qf6 на діаграмі називають тихим ходом?",
              "qEn": "Why is Qf6 in the diagram called a quiet move?",
              "options": [
                "він не шахує і нічого не бере, але ставить сильні загрози",
                "він одразу ставить мат",
                "він бере пішака",
                "він нелегальний"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "it does not check and takes nothing, but it creates strong threats",
                "it is mate at once",
                "it captures a pawn",
                "it is illegal"
              ]
            }
          },
          {
            "id": "ch-d-quiet-p1",
            "type": "chess_puzzle",
            "promptUk": "Знайдіть тихий хід ферзем, що стискає чорних.",
            "promptEn": "Find the quiet queen move that squeezes Black.",
            "fen": "6k1/5p1p/6p1/8/8/5Q2/5PPP/6K1 w - - 0 1",
            "solutionSans": [
              "Qf6"
            ],
            "difficulty": 3
          },
          {
            "id": "ch-d-quiet-m1",
            "type": "mcq",
            "promptUk": "Чому тихі ходи часто пропускають у розрахунку?",
            "promptEn": "Why are quiet moves often missed in calculation?",
            "options": [
              "око шукає шахи й взяття, а тихий хід «нічого не робить» на перший погляд",
              "вони завжди погані",
              "їх забороняють правила",
              "комп'ютер їх не грає"
            ],
            "correctIndex": 0,
            "explanationUk": "Тому свідомо додавайте один нефорсований кандидат.",
            "explanationEn": "So deliberately add one non-forcing candidate.",
            "optionsEn": [
              "the eye looks for checks and captures, and a quiet move “does nothing” at first glance",
              "they are always bad",
              "the rules forbid them",
              "computers never play them"
            ]
          },
          {
            "id": "ch-d-quiet-m2",
            "type": "mcq",
            "promptUk": "Що таке цугцванг?",
            "promptEn": "What is zugzwang?",
            "options": [
              "позиція, де будь-який хід погіршує справу, а передати чергу не можна",
              "мат у один хід",
              "довга рокіровка",
              "взяття на проході"
            ],
            "correctIndex": 0,
            "explanationUk": "Тихий хід інколи ставить суперника в цугцванг.",
            "explanationEn": "A quiet move sometimes puts the opponent in zugzwang.",
            "optionsEn": [
              "a position where any move makes things worse, and you cannot pass the turn",
              "mate in one",
              "long castling",
              "an en-passant capture"
            ]
          },
          {
            "id": "ch-d-quiet-e",
            "type": "explain",
            "promptUk": "Що таке тихий хід і чому його варто шукати?",
            "promptEn": "What is a quiet move and why should you look for one?",
            "keyIdeas": [
              {
                "labelUk": "Не шах",
                "labelEn": "Not a check",
                "anyOf": [
                  "тих",
                  "quiet",
                  "не шахує",
                  "does not check",
                  "загроз",
                  "threat"
                ]
              },
              {
                "labelUk": "Кандидат",
                "labelEn": "Candidate",
                "anyOf": [
                  "кандидат",
                  "candidate",
                  "пропуск",
                  "miss"
                ]
              },
              {
                "labelUk": "Цугцванг",
                "labelEn": "Zugzwang",
                "anyOf": [
                  "цугцванг",
                  "zugzwang"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Тихий хід не шахує і нічого не бере, але ставить сильну, часто подвійну загрозу. Його легко пропустити в списку кандидатів. Інколи тихий хід ставить суперника в цугцванг.",
            "sampleAnswerEn": "A quiet move does not check and takes nothing, but it creates a strong, often double, threat. It is easy to miss on the candidate list. Sometimes a quiet move puts the opponent in zugzwang."
          }
        ]
      },
      {
        "slug": "ch-d-force-first",
        "titleUk": "Спочатку форсовані ходи",
        "titleEn": "Forcing moves first",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "ch-d-force-first-l",
            "type": "chess_lesson",
            "promptUk": "Спочатку форсовані ходи",
            "promptEn": "Forcing moves first",
            "fen": "4r1k1/5pp1/7p/3q4/3Q4/8/5PPP/4R1K1 w - - 0 1",
            "notesUk": "Форсований хід залишає суперникові вузький вибір: шах, взяття з шахом, загроза мату наступним ходом. Рахувати форсовані лінії легше, бо дерево вузьке. Правило CCT (checks, captures, threats) каже: спочатку перегляньте шахи, потім взяття, потім загрози — і лише тоді тихі ходи.\n\nНа діаграмі «очевидне» Qxd5 забирає ферзя, але після цього тура чорних б'є на e1 з матом: остання горизонталь незахищена, пішаки f2–g2–h2 стоять на місці. Правильний порядок: спочатку форсоване Rxe8+ (шах і взяття тури), король змушений на h7, і лише тоді Qxd5 — уже без мату у відповідь. Це і є «спочатку форс, потім матеріал».\n\nРозширення уроку CCT з базового курсу: форсований хід не завжди шах. Загроза мату (тиха, але невідворотна) теж форсує відповідь. І навпаки: не кожен шах корисний — «шах заради шаха» може дарувати темп супернику.\n\nТипові помилки: взяти «вільного» ферзя, не перевіривши мат на останній горизонталі; дати шах, який самій фігурі немає куди відступити; зупинити форсовану лінію на півдорозі. Питання-перевірка перед взяттям: «що він відповість із шахом?»",
            "notesEn": "A forcing move leaves the opponent a narrow choice: a check, a capture with check, a threat of mate next move. Forced lines are easier to calculate because the tree is narrow. The CCT rule (checks, captures, threats) says: look at checks first, then captures, then threats — and only then at quiet moves.\n\nIn the diagram the “obvious” Qxd5 wins the queen, but then Black’s rook takes on e1 with mate: the back rank is undefended and the pawns f2–g2–h2 have not moved. The right order is: first the forcing Rxe8+ (check and winning a rook), the king is driven to h7, and only then Qxd5 — now without mate in reply. That is “force first, material second”.\n\nAn extension of the basic CCT lesson: a forcing move is not always a check. A mate threat (quiet but irresistible) also forces a reply. Conversely, not every check is useful — “a check for a check’s sake” may hand the opponent a tempo.\n\nTypical mistakes: taking a “free” queen without checking for back-rank mate; giving a check from which your own piece has no retreat; stopping a forced line halfway. The check-question before a capture: “what does he reply with check?”",
            "quiz": {
              "q": "Чому 1.Qxd5 тут помилка?",
              "qEn": "Why is 1.Qxd5 a mistake here?",
              "options": [
                "чорні відповідають Rxe1# — мат на останній горизонталі",
                "ферзя не можна взяти",
                "це пат",
                "білі втрачають рокіровку"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "Black replies Rxe1# — back-rank mate",
                "the queen cannot be taken",
                "it is stalemate",
                "White loses the right to castle"
              ]
            }
          },
          {
            "id": "ch-d-force-first-p1",
            "type": "chess_puzzle",
            "promptUk": "Спочатку форсований шах, потім заберіть ферзя.",
            "promptEn": "First the forcing check, then take the queen.",
            "fen": "4r1k1/5pp1/7p/3q4/3Q4/8/5PPP/4R1K1 w - - 0 1",
            "solutionSans": [
              "Rxe8+",
              "Kh7",
              "Qxd5"
            ],
            "difficulty": 3
          },
          {
            "id": "ch-d-force-first-m1",
            "type": "mcq",
            "promptUk": "Що означає CCT у розрахунку?",
            "promptEn": "What does CCT mean in calculation?",
            "options": [
              "checks, captures, threats: спочатку шахи, взяття, загрози",
              "castle, centre, time",
              "лише ходи королем",
              "запис партії"
            ],
            "correctIndex": 0,
            "explanationUk": "Це фільтр порядку, не догма «завжди шах».",
            "explanationEn": "It is an order-filter, not a dogma that you must always check.",
            "optionsEn": [
              "checks, captures, threats: checks, captures and threats first",
              "castle, centre, time",
              "king moves only",
              "recording the game"
            ]
          },
          {
            "id": "ch-d-force-first-m2",
            "type": "mcq",
            "promptUk": "Форсований хід — це завжди шах?",
            "promptEn": "Is a forcing move always a check?",
            "options": [
              "Ні: загроза мату теж форсує відповідь",
              "Так, інших форсованих ходів немає",
              "Так, і ще рокіровка",
              "Ні, форсований хід — лише пат"
            ],
            "correctIndex": 0,
            "explanationUk": "Форс — це вузький вибір відповіді, не обов'язково шах.",
            "explanationEn": "Force means a narrow choice of reply, not necessarily a check.",
            "optionsEn": [
              "No: a mate threat also forces a reply",
              "Yes, there are no other forcing moves",
              "Yes, and also castling",
              "No, a forcing move is only stalemate"
            ]
          },
          {
            "id": "ch-d-force-first-e",
            "type": "explain",
            "promptUk": "Чому форсовані ходи рахують раніше за тихі взяття?",
            "promptEn": "Why calculate forcing moves before quiet captures?",
            "keyIdeas": [
              {
                "labelUk": "CCT",
                "labelEn": "CCT",
                "anyOf": [
                  "шах",
                  "check",
                  "CCT",
                  "форсован",
                  "forcing"
                ]
              },
              {
                "labelUk": "Порядок",
                "labelEn": "Order",
                "anyOf": [
                  "спочатку",
                  "first",
                  "матеріал",
                  "material",
                  "горизонтал",
                  "back rank"
                ]
              },
              {
                "labelUk": "Відповідь",
                "labelEn": "Reply",
                "anyOf": [
                  "відповід",
                  "reply",
                  "мат",
                  "mate"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "За CCT спочатку шахи, взяття і загрози: дерево вузьке, і ми не беремо «вільного» ферзя, поки не перевіримо відповідь з матом на останній горизонталі. Форсований хід — не завжди шах.",
            "sampleAnswerEn": "By CCT we look at checks, captures and threats first: the tree is narrow, and we do not take a “free” queen until we have checked a back-rank mate in reply. A forcing move is not always a check."
          }
        ]
      },
      {
        "slug": "ch-d-compare-lines",
        "titleUk": "Порівняти дві лінії і зупинитись",
        "titleEn": "Comparing two lines and stopping",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "ch-d-compare-lines-l",
            "type": "chess_lesson",
            "promptUk": "Порівняти дві лінії і зупинитись",
            "promptEn": "Comparing two lines and stopping",
            "fen": "8/2P5/8/8/3r4/8/2K5/k7 w - - 0 1",
            "notesUk": "Після того як ви порахували два кандидати до кінця, треба їх порівняти — не за «красою», а за результатом: мат, виграш матеріалу, нічия, поразка. Типова пастка — змішати лінії або продовжувати рахувати вже виграний варіант «для впевненості» і заблукати.\n\nПозиція Сааведри — ідеальний приклад порівняння. Лінія A: c8=Q. Чорні відповідають Rc4+, і якщо ферзь б'є туру, виходить пат (король на a1 не має ходу). Лінія B: c8=R. Загроза мату Ra8 змушує …Ra4, тоді Kb3 атакує туру і загрожує матом, чорні програють. Одна й та сама клітинка c8, дві різні фігури, два різні кінці. Порівняння каже: обираємо туру.\n\nКоли зупинятись: якщо лінія форсовано веде до мату — досить. Якщо обидві лінії «приблизно рівні» — оцініть не тактику, а структуру (пішаки, активність) і припиніть глибше копати під годинником. Правило листа: запишіть оцінку кожної лінії одним словом («мат», «+тура», «пат», «неясно») і виберіть.\n\nТипові помилки: відкинути правильну лінію, бо в середині вона виглядає страшно (жертва); вибрати лінію, яку не дорахували до тихого кінця (пат після ферзя); рахувати третю лінію, коли дві вже дають мат і нічию — рішення вже є.",
            "notesEn": "Once you have calculated two candidates to the end, you must compare them — not by “beauty” but by result: mate, material win, draw, loss. A typical trap is mixing the lines, or continuing to calculate an already won line “for confidence” and getting lost.\n\nThe Saavedra position is a perfect comparison. Line A: c8=Q. Black replies Rc4+, and if the queen takes the rook it is stalemate (the king on a1 has no move). Line B: c8=R. The mate threat Ra8 forces …Ra4, then Kb3 attacks the rook and threatens mate, and Black is lost. The same square c8, two different pieces, two different endings. The comparison says: choose the rook.\n\nWhen to stop: if a line leads to forced mate — enough. If both lines are “about equal”, judge the structure (pawns, activity) and stop digging deeper on the clock. A scoresheet rule: write one-word evaluations (“mate”, “+rook”, “stalemate”, “unclear”) and pick.\n\nTypical mistakes: rejecting the right line because the middle of it looks scary (a sacrifice); choosing a line you did not calculate to a quiet end (stalemate after a queen); calculating a third line when two already give mate and a draw — the decision is already there.",
            "quiz": {
              "q": "У позиції Сааведри чому c8=Q гірше за c8=R?",
              "qEn": "In the Saavedra position, why is c8=Q worse than c8=R?",
              "options": [
                "після Rc4+ і взяття тури ферзем виходить пат",
                "ферзь нелегальний",
                "тура слабша, тому це жертва",
                "c8=Q одразу мат"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "after Rc4+ and the queen taking the rook it is stalemate",
                "a queen is illegal",
                "a rook is weaker, so it is a sacrifice",
                "c8=Q is mate at once"
              ]
            }
          },
          {
            "id": "ch-d-compare-lines-p1",
            "type": "chess_puzzle",
            "promptUk": "Порівняйте перетворення: оберіть лінію, що виграє (не пат).",
            "promptEn": "Compare the promotions: choose the line that wins (not stalemate).",
            "fen": "8/2P5/8/8/3r4/8/2K5/k7 w - - 0 1",
            "solutionSans": [
              "c8=R",
              "Ra4",
              "Kb3"
            ],
            "difficulty": 4
          },
          {
            "id": "ch-d-compare-lines-m1",
            "type": "mcq",
            "promptUk": "Як порівнювати два дораховані варіанти?",
            "promptEn": "How should you compare two fully calculated lines?",
            "options": [
              "за результатом: мат, матеріал, нічия, поразка",
              "за красою жертви",
              "за довжиною варіанта",
              "за тим, який хід перший спав на думку"
            ],
            "correctIndex": 0,
            "explanationUk": "Краса не є критерієм, якщо інша лінія дає мат, а ця — пат.",
            "explanationEn": "Beauty is not a criterion if the other line gives mate and this one gives stalemate.",
            "optionsEn": [
              "by result: mate, material, draw, loss",
              "by the beauty of the sacrifice",
              "by the length of the line",
              "by which move you thought of first"
            ]
          },
          {
            "id": "ch-d-compare-lines-m2",
            "type": "mcq",
            "promptUk": "Коли пора зупинити розрахунок?",
            "promptEn": "When is it time to stop calculating?",
            "options": [
              "коли лінія форсовано веде до мату, або оцінку вже видно і час іде",
              "ніколи, треба рахувати до 20-го ходу",
              "після першого шаха",
              "лише коли суперник запропонував нічию"
            ],
            "correctIndex": 0,
            "explanationUk": "Дорахували до ясного кінця — приймайте рішення.",
            "explanationEn": "Once you have reached a clear end, make the decision.",
            "optionsEn": [
              "when a line is forced mate, or the evaluation is already clear and the clock is running",
              "never: you must calculate to move 20",
              "after the first check",
              "only when the opponent offers a draw"
            ]
          },
          {
            "id": "ch-d-compare-lines-e",
            "type": "explain",
            "promptUk": "Як порівняти дві лінії і коли зупинитись?",
            "promptEn": "How do you compare two lines, and when do you stop?",
            "keyIdeas": [
              {
                "labelUk": "Результат",
                "labelEn": "Result",
                "anyOf": [
                  "результат",
                  "result",
                  "пат",
                  "stalemate",
                  "мат",
                  "mate"
                ]
              },
              {
                "labelUk": "Сааведра",
                "labelEn": "Saavedra",
                "anyOf": [
                  "Сааведр",
                  "Saavedra",
                  "тура",
                  "rook",
                  "ферз",
                  "queen"
                ]
              },
              {
                "labelUk": "Зупинка",
                "labelEn": "Stopping",
                "anyOf": [
                  "зупинит",
                  "stop",
                  "форсован",
                  "forced"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Дві лінії порівнюють за результатом, не за красою: у Сааведри ферзь веде до пату, тура виграє. Розрахунок зупиняють, коли є форсований мат або оцінка вже ясна.",
            "sampleAnswerEn": "Two lines are compared by result, not by beauty: in Saavedra a queen leads to stalemate and a rook wins. You stop calculating when there is forced mate or the evaluation is already clear."
          }
        ]
      },
      {
        "slug": "ch-deep-calc-viz-exam",
        "titleUk": "Іспит: розрахунок і візуалізація",
        "titleEn": "Exam: calculation and visualisation",
        "baseXp": 30,
        "difficulty": 3,
        "isExam": true,
        "passThreshold": 0.7,
        "exercises": [
          {
            "id": "ch-deep-calc-viz-exam-q1",
            "type": "mcq",
            "promptUk": "Метод кандидатів починається з:",
            "promptEn": "The candidate method starts with:",
            "options": [
              "короткого списку гідних ходів, які потім рахують окремо",
              "розрахунку першого-ліпшого ходу на 15 ходів",
              "ходу без думки",
              "лише тихих ходів"
            ],
            "correctIndex": 0,
            "explanationUk": "Список спочатку, глибина потім, без змішування ліній.",
            "explanationEn": "List first, depth second, without mixing lines.",
            "optionsEn": [
              "a short list of worthy moves, then calculated separately",
              "calculating the first move you see for 15 moves",
              "moving without thought",
              "quiet moves only"
            ]
          },
          {
            "id": "ch-deep-calc-viz-exam-q2",
            "type": "mcq",
            "promptUk": "CCT означає розглядати спочатку:",
            "promptEn": "CCT means looking first at:",
            "options": [
              "шахи, взяття, загрози",
              "рокіровку, центр, час",
              "лише тихі ходи",
              "ходи пішаками"
            ],
            "correctIndex": 0,
            "explanationUk": "Checks, captures, threats.",
            "explanationEn": "Checks, captures, threats.",
            "optionsEn": [
              "checks, captures, threats",
              "castling, centre, time",
              "quiet moves only",
              "pawn moves"
            ]
          },
          {
            "id": "ch-deep-calc-viz-exam-q3",
            "type": "mcq",
            "promptUk": "Тихий хід — це:",
            "promptEn": "A quiet move is:",
            "options": [
              "хід без шаха і взяття, який ставить сильну загрозу",
              "завжди помилка",
              "мат у 1",
              "взяття на проході"
            ],
            "correctIndex": 0,
            "explanationUk": "Його легко пропустити, бо він «нічого не робить» на вигляд.",
            "explanationEn": "It is easy to miss because it appears to “do nothing”.",
            "optionsEn": [
              "a move without check or capture that creates a strong threat",
              "always a mistake",
              "mate in one",
              "an en-passant capture"
            ]
          },
          {
            "id": "ch-deep-calc-viz-exam-p4",
            "type": "chess_puzzle",
            "promptUk": "Мат у 2: побачте відповідь і фінальний удар.",
            "promptEn": "Mate in two: see the reply and the final blow.",
            "fen": "r6k/6pp/7N/8/8/8/5QPP/5R1K w - - 0 1",
            "solutionSans": [
              "Qf8+",
              "Rxf8",
              "Rxf8#"
            ],
            "difficulty": 3
          },
          {
            "id": "ch-deep-calc-viz-exam-p5",
            "type": "chess_puzzle",
            "promptUk": "Порівняйте лінії: виграє підпромоція в туру.",
            "promptEn": "Compare the lines: underpromotion to a rook wins.",
            "fen": "8/2P5/8/8/3r4/8/2K5/k7 w - - 0 1",
            "solutionSans": [
              "c8=R",
              "Ra4",
              "Kb3"
            ],
            "difficulty": 4
          }
        ]
      }
    ]
  },
  {
    "slug": "ch-deep-tactics-hidden",
    "titleUk": "Приховані мотиви",
    "titleEn": "Hidden tactical motifs",
    "lessons": [
      {
        "slug": "ch-d-decoy",
        "titleUk": "Заманювання",
        "titleEn": "Decoy",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "ch-d-decoy-l",
            "type": "chess_lesson",
            "promptUk": "Заманювання",
            "promptEn": "Decoy",
            "fen": "3q2k1/5ppp/8/3N4/8/8/5PPP/4Q1K1 w - - 0 1",
            "notesUk": "Заманювання (decoy) — жертва або шах, що примушує фігуру суперника стати на конкретну клітинку, де вона стає об'єктом нового удару: вилки, зв'язки, мату. Ми не «відганяємо» захисника (це відволікання), а навпаки тягнемо його туди, де нам зручно.\n\nНа діаграмі 1.Qe8+ виглядає як подарунок ферзя. Але ферзь чорних змушений взяти на e8 (інакше мат на останній горизонталі), і тоді 2.Nf6+ — вилка короля і щойно заманутого ферзя. Заманювання спрацювало: ферзь опинився на клітинці, яку б'є кінь.\n\nВідмінність від притягнення короля (attraction): тут об'єкт — захисник або цінна фігура, не обов'язково король. Відмінність від відволікання (deflection): відволікання змушує фігуру піти З важливого поля (вона більше не захищає мат), заманювання — ПРИЙТИ на невигідне.\n\nТипові помилки: жертвувати, не перевіривши, чи взяття єдине; заманити фігуру на клітинку, яку ваш удар насправді не б'є (переплутали хід коня). Перед жертвою назвіть вголос: «він стає на e8, і тоді кінь б'є e8 і g8».",
            "notesEn": "A decoy is a sacrifice or a check that forces an enemy piece onto a specific square, where it becomes the target of a new blow: a fork, a pin, or mate. We do not “drive away” a defender (that is deflection); we pull it to where we want it.\n\nIn the diagram 1.Qe8+ looks like a gift of the queen. But Black’s queen is forced to take on e8 (otherwise it is back-rank mate), and then 2.Nf6+ forks the king and the newly decoyed queen. The decoy has worked: the queen sits on a square the knight attacks.\n\nThe difference from attraction of the king: here the object is a defender or a valuable piece, not necessarily the king. The difference from deflection: deflection forces a piece OFF an important square (it no longer defends mate); a decoy forces it ONTO a bad one.\n\nTypical mistakes: sacrificing without checking that the capture is forced; decoying a piece to a square your follow-up does not actually attack (miscounting a knight). Before you sacrifice, say it aloud: “he goes to e8, and then the knight attacks e8 and g8”.",
            "quiz": {
              "q": "Що робить 1.Qe8+ на цій діаграмі?",
              "qEn": "What does 1.Qe8+ do in this diagram?",
              "options": [
                "заманює ферзя на e8, де його вилкою забирає кінь",
                "одразу ставить мат",
                "відволікає пішака g7",
                "дарує ферзя без ідеї"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "decoys the queen to e8, where the knight wins it with a fork",
                "mates at once",
                "deflects the g7-pawn",
                "gives the queen away with no idea"
              ]
            }
          },
          {
            "id": "ch-d-decoy-p1",
            "type": "chess_puzzle",
            "promptUk": "Заманіть ферзя і поставте вилку.",
            "promptEn": "Decoy the queen and fork.",
            "fen": "3q2k1/5ppp/8/3N4/8/8/5PPP/4Q1K1 w - - 0 1",
            "solutionSans": [
              "Qe8+",
              "Qxe8",
              "Nf6+"
            ],
            "difficulty": 3
          },
          {
            "id": "ch-d-decoy-m1",
            "type": "mcq",
            "promptUk": "Чим заманювання відрізняється від відволікання?",
            "promptEn": "How does a decoy differ from a deflection?",
            "options": [
              "заманювання тягне фігуру НА невигідну клітинку; відволікання зганяє її З корисної",
              "це одне й те саме",
              "заманювання роблять лише пішаком",
              "відволікання завжди мат"
            ],
            "correctIndex": 0,
            "explanationUk": "Напрямок сили: «сюди» проти «звідси».",
            "explanationEn": "The direction of the force: “onto” versus “away from”.",
            "optionsEn": [
              "a decoy pulls a piece ONTO a bad square; a deflection drives it OFF a useful one",
              "they are the same",
              "only a pawn can decoy",
              "deflection is always mate"
            ]
          },
          {
            "id": "ch-d-decoy-m2",
            "type": "mcq",
            "promptUk": "Перед жертвою-заманюванням обов'язково перевірте:",
            "promptEn": "Before a decoy sacrifice you must check:",
            "options": [
              "чи взяття форсоване і чи ваш наступний удар справді б'є ту клітинку",
              "чи є в суперника рокіровка",
              "колір слона",
              "час на годиннику суперника"
            ],
            "correctIndex": 0,
            "explanationUk": "Інакше жертва — просто втрата фігури.",
            "explanationEn": "Otherwise the sacrifice is simply a lost piece.",
            "optionsEn": [
              "that the capture is forced and that your next blow actually hits that square",
              "whether the opponent still may castle",
              "the bishop's colour",
              "the opponent's clock"
            ]
          }
        ]
      },
      {
        "slug": "ch-d-overload",
        "titleUk": "Перевантаження",
        "titleEn": "Overloading",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "ch-d-overload-l",
            "type": "chess_lesson",
            "promptUk": "Перевантаження",
            "promptEn": "Overloading",
            "fen": "6k1/2q2ppp/8/8/8/8/3Q1PPP/3R2K1 w - - 0 1",
            "notesUk": "Перевантаження — коли одна фігура тримає дві обов'язки одразу (захищає дві фігури, або фігуру і матну клітинку) і не встигає виконати обидві, якщо їх атакувати одночасно. Ми «даємо їй роботу понад силу».\n\nНа діаграмі чорний ферзь на c7 — єдиний захисник останньої горизонталі: він може перекрити або взяти на d8. Білі грають 1.Qd8+! Ферзь змушений взяти, і тоді 2.Rxd8#. Друга «робота» ферзя (стерегти короля) зривається, щойно він виконує першу (взяти на d8). Якби чорні могли відповісти чимось іншим, жертва б не працювала — перевантаження має бути реальним, не уявним.\n\nШукайте фігуру, що захищає два об'єкти, і навантажте обидва в один хід (шах, жертва, подвійна загроза). Часто перевантажений ферзь або тура «на двох стільцях»: тримає і якість, і матну клітинку.\n\nТипові помилки: атакувати «захисника двох справ», який насправді захищає лише одну; не помітити третього захисника. Питання: «якщо ця фігура піде на A, хто залишиться на B?»",
            "notesEn": "Overloading is when one piece holds two jobs at once (defending two pieces, or a piece and a mate square) and cannot do both if they are attacked together. We give it more work than it can bear.\n\nIn the diagram the black queen on c7 is the only defender of the back rank: she can interpose or take on d8. White plays 1.Qd8+! The queen must take, and then 2.Rxd8# is mate. The second job (guarding the king) fails the moment she does the first (taking on d8). If Black had another reply, the sacrifice would fail — the overload must be real, not imagined.\n\nLook for a piece that defends two things, and load both in one move (a check, a sacrifice, a double threat). Often an overloaded queen or rook sits “on two chairs”: holding both the exchange and a mate square.\n\nTypical mistakes: attacking a “two-job defender” that actually defends only one; missing a third defender. The question: “if this piece goes to A, who is left on B?”",
            "quiz": {
              "q": "Чому ферзь чорних перевантажений?",
              "qEn": "Why is Black's queen overloaded?",
              "options": [
                "він єдиний захищає поле d8 від мату і змушений туди піти",
                "він атакує два пішаки",
                "він зв'язаний",
                "він не має ходів"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "she is the only defender of d8 against mate and is forced to go there",
                "she attacks two pawns",
                "she is pinned",
                "she has no moves"
              ]
            }
          },
          {
            "id": "ch-d-overload-p1",
            "type": "chess_puzzle",
            "promptUk": "Використайте перевантаження ферзя: шах і мат.",
            "promptEn": "Use the queen's overload: check and mate.",
            "fen": "6k1/2q2ppp/8/8/8/8/3Q1PPP/3R2K1 w - - 0 1",
            "solutionSans": [
              "Qd8+",
              "Qxd8",
              "Rxd8#"
            ],
            "difficulty": 3
          },
          {
            "id": "ch-d-overload-m1",
            "type": "mcq",
            "promptUk": "Яке запитання виявляє перевантаження?",
            "promptEn": "Which question reveals an overload?",
            "options": [
              "якщо ця фігура виконає одну обов'язок, хто виконає другу?",
              "скільки коштує ферзь?",
              "чи є рокіровка?",
              "який колір клітинки?"
            ],
            "correctIndex": 0,
            "explanationUk": "Дві обов'язки — один виконавець.",
            "explanationEn": "Two jobs, one piece.",
            "optionsEn": [
              "if this piece does one job, who does the second?",
              "how much is the queen worth?",
              "is castling legal?",
              "what colour is the square?"
            ]
          },
          {
            "id": "ch-d-overload-m2",
            "type": "mcq",
            "promptUk": "Перевантаження найчастіше експлуатують:",
            "promptEn": "An overload is most often exploited by:",
            "options": [
              "подвійною загрозою або жертвою на одному з двох захищених полів",
              "тихою рокіровкою",
              "ходом короля в центр",
              "правилом 50 ходів"
            ],
            "correctIndex": 0,
            "explanationUk": "Треба змусити захисника вибрати одну справу.",
            "explanationEn": "You must force the defender to pick one job.",
            "optionsEn": [
              "a double threat or a sacrifice on one of the two defended squares",
              "quiet castling",
              "a king move to the centre",
              "the 50-move rule"
            ]
          }
        ]
      },
      {
        "slug": "ch-d-interference",
        "titleUk": "Перекриття",
        "titleEn": "Interference",
        "baseXp": 24,
        "difficulty": 4,
        "exercises": [
          {
            "id": "ch-d-interference-l",
            "type": "chess_lesson",
            "promptUk": "Перекриття",
            "promptEn": "Interference",
            "fen": "3rq1k1/6pp/8/4N3/8/8/4QPPP/4R1K1 w - - 0 1",
            "notesUk": "Перекриття (interference) — ви ставите свою фігуру на перетин двох ліній суперника, щоб розірвати захист. Після цього одна лінія більше не «бачить» іншу: тура не захищає ферзя, слон не тримає матну клітинку, ферзь не встигає на останню горизонталь.\n\nНа діаграмі кінь іде на f7. Це поле лежить між турою d8 і ферзем e8 і водночас поруч із королем. Кінь стає на шлях захисту, загрожує ударами по ферзю й по королівському флангу, і чорним важко взяти його без втрат: лінії перетнулись у незручній точці. Ідея важливіша за конкретну клітинку: шукайте перетин діагоналі й вертикалі, двох тур, ферзя і слона.\n\nКласичні схеми мають імена (Новотний — жертва на перетині слона і тури, де взяття однією фігурою відкриває лінію для удару по іншій), але вам досить бачити малюнок: «дві лінії сходяться — поставте туди свою фігуру».\n\nТипові помилки: стати на перетин, який суперник просто бере з шахом; перекрити власну лінію (заважати собі). Перевіряйте, чи після взяття ваша друга загроза все ще діє.",
            "notesEn": "Interference is placing your piece on the intersection of two enemy lines, to cut a defence. After that, one line no longer “sees” the other: a rook no longer defends a queen, a bishop no longer holds a mate square, a queen no longer reaches the back rank.\n\nIn the diagram the knight goes to f7. That square sits between the d8-rook and the e8-queen and also next to the king. The knight steps into the defensive path, threatens the queen and the kingside, and Black cannot take it cheaply: the lines meet at an awkward point. The idea matters more than the exact square: look for the crossing of a diagonal and a file, of two rooks, of a queen and a bishop.\n\nClassic patterns have names (a Novotny is a sacrifice on the crossing of a bishop and a rook, where capturing with one piece opens a line against the other), but it is enough to see the picture: “two lines meet — put your piece there”.\n\nTypical mistakes: stepping onto an intersection the opponent simply takes with check; interfering with your own line (blocking yourself). Check that after a capture your second threat still works.",
            "quiz": {
              "q": "Що таке перекриття як тактичний мотив?",
              "qEn": "What is interference as a tactical motif?",
              "options": [
                "поставити фігуру на перетин двох ліній суперника, розриваючи захист",
                "розігнати всі фігури з дошки",
                "зв'язати коня",
                "поставити пат"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "placing a piece on the intersection of two enemy lines, cutting a defence",
                "clearing every piece off the board",
                "pinning a knight",
                "giving stalemate"
              ]
            }
          },
          {
            "id": "ch-d-interference-p1",
            "type": "chess_puzzle",
            "promptUk": "Перекрийте лінії чорних конем на f7.",
            "promptEn": "Interfere with Black's lines by a knight to f7.",
            "fen": "3rq1k1/6pp/8/4N3/8/8/4QPPP/4R1K1 w - - 0 1",
            "solutionSans": [
              "Nf7"
            ],
            "difficulty": 4
          },
          {
            "id": "ch-d-interference-m1",
            "type": "mcq",
            "promptUk": "На перетині яких ліній найчастіше ставлять фігуру?",
            "promptEn": "On the crossing of which lines do you most often place a piece?",
            "options": [
              "тури (вертикаль) і слона або ферзя (діагональ)",
              "лише двох коней",
              "лише пішаків однієї горизонталі",
              "короля і коня"
            ],
            "correctIndex": 0,
            "explanationUk": "Саме довгі лінії можна перерізати однією фігурою.",
            "explanationEn": "It is long-range lines that one piece can cut.",
            "optionsEn": [
              "a rook (a file) and a bishop or queen (a diagonal)",
              "only two knights",
              "only pawns on one rank",
              "the king and a knight"
            ]
          },
          {
            "id": "ch-d-interference-m2",
            "type": "mcq",
            "promptUk": "Після того як суперник бере вашу фігуру на перетині, перевірте:",
            "promptEn": "After the opponent takes your piece on the intersection, check:",
            "options": [
              "чи друга загроза (мат або взяття) все ще діє",
              "чи можна рокіруватись",
              "колір клітинки короля",
              "правило 50 ходів"
            ],
            "correctIndex": 0,
            "explanationUk": "Інакше жертва на перетині безглузда.",
            "explanationEn": "Otherwise the sacrifice on the crossing is pointless.",
            "optionsEn": [
              "whether the second threat (mate or a capture) still works",
              "whether you may castle",
              "the colour of the king's square",
              "the 50-move rule"
            ]
          }
        ]
      },
      {
        "slug": "ch-d-xray",
        "titleUk": "Рентген",
        "titleEn": "X-ray",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "ch-d-xray-l",
            "type": "chess_lesson",
            "promptUk": "Рентген",
            "promptEn": "X-ray",
            "fen": "4q1k1/5ppp/8/8/8/8/3R1PPP/3R2K1 w - - 0 1",
            "notesUk": "Рентген (x-ray) — дальня фігура б'є «крізь» іншу фігуру по тій самій лінії. Передня фігура ніби прозора: після того як вона піде або її візьмуть, удар із тилу вступає в силу. Так працюють подвоєні тури на одній вертикалі, ферзь за турою, слон за ферзем.\n\nНа діаграмі тури білих подвоєні на лінії d. 1.Rd8 нападає на ферзя рентгеном: ферзь стоїть між турою і королем на восьмій горизонталі. Після 1…Qxd8 друга тура бере 2.Rxd8# — удар «крізь» місце, де стояв ферзь. У спорідненій позиції, якщо на d8 уже стоїть тура чорних і пішаки закривають королю вихід, 1.Rxd8# — мат саме тому, що друга тура тримає поле d8 рентгеном: король не може уявити, що тура «незахищена».\n\nРентген буває захисним: ваша тура «крізь» свою фігуру захищає пішака. І атакувальним: сквізер (лінійний удар) — родич рентгена, коли цінніша фігура стоїть попереду дешевшої.\n\nТипові помилки: вважати фігуру незахищеною, не помітивши туру «ззаду»; поставити свою фігуру так, що вона перекриває власний рентген.",
            "notesEn": "An x-ray is a long-range piece attacking “through” another piece on the same line. The front piece is as if transparent: once it moves or is taken, the blow from behind takes effect. Doubled rooks on a file work this way, a queen behind a rook, a bishop behind a queen.\n\nIn the diagram White’s rooks are doubled on the d-file. 1.Rd8 attacks the queen by x-ray: the queen sits between the rook and the king on the eighth rank. After 1…Qxd8 the second rook plays 2.Rxd8# — a blow “through” the square where the queen stood. In a related position, if a black rook already stands on d8 and pawns seal the king’s flight, 1.Rxd8# is mate precisely because the second rook x-rays d8: the king cannot treat the front rook as “undefended”.\n\nAn x-ray can be defensive: your rook defends a pawn “through” your own piece. And it can be attacking: a skewer is a close relative, when the more valuable piece stands in front of a cheaper one.\n\nTypical mistakes: treating a piece as undefended, missing the rook “behind”; placing your own piece so that it blocks your own x-ray.",
            "quiz": {
              "q": "Що таке рентген у тактиці?",
              "qEn": "What is an x-ray in tactics?",
              "options": [
                "удар дальньої фігури «крізь» іншу фігуру по тій самій лінії",
                "хід конем через пішака",
                "рокіровка",
                "пат"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "a long-range piece attacking “through” another piece on the same line",
                "a knight move through a pawn",
                "castling",
                "stalemate"
              ]
            }
          },
          {
            "id": "ch-d-xray-p1",
            "type": "chess_puzzle",
            "promptUk": "Рентген тур: нападіть на ферзя і поставте мат після взяття.",
            "promptEn": "Rook x-ray: attack the queen and mate after it is taken.",
            "fen": "4q1k1/5ppp/8/8/8/8/3R1PPP/3R2K1 w - - 0 1",
            "solutionSans": [
              "Rd8",
              "Qxd8",
              "Rxd8#"
            ],
            "difficulty": 3
          },
          {
            "id": "ch-d-xray-p2",
            "type": "chess_puzzle",
            "promptUk": "Мат у 1 рентгеном подвоєних тур.",
            "promptEn": "Mate in one by the x-ray of doubled rooks.",
            "fen": "3r2k1/5ppp/8/8/8/8/3R1PPP/3R2K1 w - - 0 1",
            "solutionSans": [
              "Rxd8#"
            ],
            "difficulty": 2
          },
          {
            "id": "ch-d-xray-m1",
            "type": "mcq",
            "promptUk": "Чому в маті Rxd8# тура на d8 «захищена»?",
            "promptEn": "In the mate Rxd8#, why is the rook on d8 “defended”?",
            "options": [
              "друга тура б'є те саме поле рентгеном по вертикалі d",
              "її захищає король",
              "пішак на d7",
              "правило дотику"
            ],
            "correctIndex": 0,
            "explanationUk": "Саме подвоєння створює рентген.",
            "explanationEn": "It is the doubling that creates the x-ray.",
            "optionsEn": [
              "the second rook attacks the same square by an x-ray on the d-file",
              "the king defends it",
              "a pawn on d7",
              "the touch-move rule"
            ]
          }
        ]
      },
      {
        "slug": "ch-d-attraction",
        "titleUk": "Притягнення короля",
        "titleEn": "Attraction",
        "baseXp": 24,
        "difficulty": 4,
        "exercises": [
          {
            "id": "ch-d-attraction-l",
            "type": "chess_lesson",
            "promptUk": "Притягнення короля",
            "promptEn": "Attraction",
            "fen": "4r1k1/5ppp/7P/8/2N5/8/5QPP/6K1 w - - 0 1",
            "notesUk": "Притягнення — окремий вид заманювання, де об'єкт — король. Жертвою або шахом ми тягнемо короля на клітинку, де його зустрічає новий удар: вилка коня, мат, зв'язка. Король рідко хоче йти вперед; ми не залишаємо йому вибору.\n\nНа діаграмі 1.Qxf7+ виглядає як жертва ферзя. Якщо 1…Kxf7, король став на f7 — і 2.Nd6+ вилкою забирає туру на e8. Якщо король не бере, а йде на h8, то 2.Qxg7# — мат, бо пішак h6 захищає ферзя. Отже, взяття «форсоване» в тому сенсі, що відмова веде до мату, а згода — до вилки.\n\nПорівняйте зі звичайним заманюванням ферзя: тут на невигідну клітинку йде саме король, і наступний удар — шах (вилка). Шукайте: ферзь або тура б'ють поруч із королем із захистом; після K×Q кінь має клітинку, з якої б'є і короля, і важку фігуру.\n\nТипові помилки: притягнути короля на поле, з якого він сам бере вашого коня; забути, що король може не взяти, а піти в кут (перевірте обидві відповіді, як тут).",
            "notesEn": "Attraction is a special decoy whose object is the king. By a sacrifice or a check we pull the king onto a square where a new blow waits: a knight fork, mate, a pin. The king rarely wants to step forward; we leave him no choice.\n\nIn the diagram 1.Qxf7+ looks like a queen sacrifice. If 1…Kxf7, the king has gone to f7 — and 2.Nd6+ forks the rook on e8. If the king does not take and goes to h8, then 2.Qxg7# is mate, because the pawn on h6 defends the queen. So the capture is “forced” in the sense that declining leads to mate, and accepting leads to a fork.\n\nCompare this with a queen decoy: here it is the king who steps onto the bad square, and the next blow is a check (a fork). Look for a queen or rook capturing next to the king with protection; after K×Q the knight has a square from which it attacks both the king and a heavy piece.\n\nTypical mistakes: attracting the king to a square from which he himself takes your knight; forgetting that the king may refuse and go to the corner (check both replies, as here).",
            "quiz": {
              "q": "Після 1.Qxf7+ Kxf7 що виграє другій хід?",
              "qEn": "After 1.Qxf7+ Kxf7, what does the second move win?",
              "options": [
                "вилка Nd6+ забирає туру",
                "мат одразу",
                "лише нічию вічним шахом",
                "якість за ферзя без компенсації"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "the fork Nd6+ wins the rook",
                "mate at once",
                "only a draw by perpetual check",
                "the exchange for a queen with no compensation"
              ]
            }
          },
          {
            "id": "ch-d-attraction-p1",
            "type": "chess_puzzle",
            "promptUk": "Притягніть короля і поставте вилку (головна лінія: король бере).",
            "promptEn": "Attract the king and fork (main line: the king takes).",
            "fen": "4r1k1/5ppp/7P/8/2N5/8/5QPP/6K1 w - - 0 1",
            "solutionSans": [
              "Qxf7+",
              "Kxf7",
              "Nd6+"
            ],
            "difficulty": 4
          },
          {
            "id": "ch-d-attraction-p2",
            "type": "chess_puzzle",
            "promptUk": "Якщо король не бере і йде на h8 — поставте мат.",
            "promptEn": "If the king declines and goes to h8 — deliver mate.",
            "fen": "4r1k1/5ppp/7P/8/2N5/8/5QPP/6K1 w - - 0 1",
            "solutionSans": [
              "Qxf7+",
              "Kh8",
              "Qxg7#"
            ],
            "difficulty": 3
          },
          {
            "id": "ch-d-attraction-m1",
            "type": "mcq",
            "promptUk": "Притягнення — це заманювання, де об'єкт:",
            "promptEn": "Attraction is a decoy whose object is:",
            "options": [
              "король",
              "лише пішак",
              "лише своя тура",
              "порожня клітинка в центрі"
            ],
            "correctIndex": 0,
            "explanationUk": "Короля тягнуть на поле, де чекає новий шах.",
            "explanationEn": "The king is pulled to a square where a new check waits.",
            "optionsEn": [
              "the king",
              "only a pawn",
              "only your own rook",
              "an empty central square"
            ]
          }
        ]
      },
      {
        "slug": "ch-deep-tactics-hidden-exam",
        "titleUk": "Іспит: приховані мотиви",
        "titleEn": "Exam: hidden motifs",
        "baseXp": 30,
        "difficulty": 3,
        "isExam": true,
        "passThreshold": 0.7,
        "exercises": [
          {
            "id": "ch-deep-tactics-hidden-exam-q1",
            "type": "mcq",
            "promptUk": "Заманювання — це:",
            "promptEn": "A decoy is:",
            "options": [
              "примусити фігуру стати на невигідну клітинку",
              "відігнати фігуру з захисту мату без конкретної клітинки-цілі",
              "тихий хід королем",
              "рокіровка під шахом"
            ],
            "correctIndex": 0,
            "explanationUk": "Тягнемо НА конкретне поле, не просто «геть».",
            "explanationEn": "We pull it ONTO a specific square, not merely “away”.",
            "optionsEn": [
              "forcing a piece onto a disadvantageous square",
              "driving a piece off a mate defence with no target square",
              "a quiet king move",
              "castling out of check"
            ]
          },
          {
            "id": "ch-deep-tactics-hidden-exam-q2",
            "type": "mcq",
            "promptUk": "Перевантаження означає, що фігура:",
            "promptEn": "Overloading means a piece:",
            "options": [
              "не може виконати дві обов'язки одночасно",
              "коштує 9 очок",
              "не має легальних ходів",
              "стоїть у паті"
            ],
            "correctIndex": 0,
            "explanationUk": "Дві роботи, один виконавець.",
            "explanationEn": "Two jobs, one piece.",
            "optionsEn": [
              "cannot perform two jobs at the same time",
              "is worth 9 points",
              "has no legal moves",
              "is in stalemate"
            ]
          },
          {
            "id": "ch-deep-tactics-hidden-exam-q3",
            "type": "mcq",
            "promptUk": "Рентген — це удар:",
            "promptEn": "An x-ray is an attack:",
            "options": [
              "дальньої фігури «крізь» іншу по тій самій лінії",
              "коня через дві клітинки по прямій",
              "пішака назад",
              "короля на проході"
            ],
            "correctIndex": 0,
            "explanationUk": "Тура «ззаду» захищає або б'є те саме поле.",
            "explanationEn": "A rook “behind” defends or attacks the same square.",
            "optionsEn": [
              "by a long-range piece “through” another on the same line",
              "by a knight two squares straight ahead",
              "by a pawn backwards",
              "by the king en passant"
            ]
          },
          {
            "id": "ch-deep-tactics-hidden-exam-p4",
            "type": "chess_puzzle",
            "promptUk": "Рентген: мат після взяття ферзя.",
            "promptEn": "X-ray: mate after the queen is taken.",
            "fen": "4q1k1/5ppp/8/8/8/8/3R1PPP/3R2K1 w - - 0 1",
            "solutionSans": [
              "Rd8",
              "Qxd8",
              "Rxd8#"
            ],
            "difficulty": 3
          },
          {
            "id": "ch-deep-tactics-hidden-exam-p5",
            "type": "chess_puzzle",
            "promptUk": "Перевантаження ферзя: мат у 2.",
            "promptEn": "Overload the queen: mate in two.",
            "fen": "6k1/2q2ppp/8/8/8/8/3Q1PPP/3R2K1 w - - 0 1",
            "solutionSans": [
              "Qd8+",
              "Qxd8",
              "Rxd8#"
            ],
            "difficulty": 3
          }
        ]
      }
    ]
  },
  {
    "slug": "ch-deep-tactics-remove",
    "titleUk": "Зняття захисту і жертви",
    "titleEn": "Removing defenders and sacrifices",
    "lessons": [
      {
        "slug": "ch-d-remove-guard",
        "titleUk": "Зняття захисту",
        "titleEn": "Removing the defender",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "ch-d-remove-guard-l",
            "type": "chess_lesson",
            "promptUk": "Зняття захисту",
            "promptEn": "Removing the defender",
            "fen": "4r1k1/5ppp/3n4/8/8/8/3Q1PPP/4R1K1 w - - 0 1",
            "notesUk": "Зняття захисту (removing the guard) — найпрактичніший із «прихованих» мотивів, бо він часто лежить на поверхні. Фігура захищає матну клітинку або «вільну» фігуру. Ми цю фігуру забираємо, відволікаємо або знищуємо — і удар проходить.\n\nНа діаграмі кінь d6 — єдиний захисник поля e8 (і тури на e8). 1.Qxd6 просто знімає захисника: кінь не захищений. Після цього загроза Re8# невідворотна; якщо чорні ходять, наприклад, королем на h8, 2.Re8# уже мат. Не треба жертв — треба побачити, хто кого тримає.\n\nІнші способи зняти захисника: розмін (міняємо його на свою фігуру); відволікання шахом; зв'язка, через яку він більше не може захищати. Завжди рахуйте кількість захисників і нападників: якщо захисників стане на одного менше, тактика «раптом» працює.\n\nТипові помилки: зняти одного захисника, не помітивши другого; зняти захисника ходом, який віддає мат у відповідь. Питання: «хто захищає цю фігуру / це поле? що, якщо його не стане?»",
            "notesEn": "Removing the defender is the most practical of the “hidden” motifs, because it often sits on the surface. A piece defends a mate square or a “loose” piece. We capture, deflect or destroy that piece — and the blow lands.\n\nIn the diagram the knight on d6 is the only defender of e8 (and of the rook on e8). 1.Qxd6 simply removes the guard: the knight is unprotected. After that the threat Re8# is irresistible; if Black plays, say, Kh8, then 2.Re8# is already mate. No sacrifice is needed — you only need to see who is holding whom.\n\nOther ways to remove a defender: an exchange (trade it for your piece); a deflection by check; a pin that stops it defending. Always count defenders and attackers: if the defenders become one fewer, a tactic “suddenly” works.\n\nTypical mistakes: removing one defender and missing a second; removing a defender with a move that allows mate in reply. The question: “who defends this piece / this square? what if that piece is gone?”",
            "quiz": {
              "q": "Хто тут захисник, якого треба зняти, і як?",
              "qEn": "Who is the defender to remove here, and how?",
              "options": [
                "кінь d6, ходом Qxd6 — тоді загрожує мат на e8",
                "пішак f7, ходом Qxf7+",
                "тура e1, її треба віддати",
                "свого ферзя, його треба сховати"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "the knight on d6, by Qxd6 — then mate is threatened on e8",
                "the f7-pawn, by Qxf7+",
                "the rook on e1, which must be given away",
                "your own queen, which must be hidden"
              ]
            }
          },
          {
            "id": "ch-d-remove-guard-p1",
            "type": "chess_puzzle",
            "promptUk": "Зніміть захисника поля e8.",
            "promptEn": "Remove the defender of e8.",
            "fen": "4r1k1/5ppp/3n4/8/8/8/3Q1PPP/4R1K1 w - - 0 1",
            "solutionSans": [
              "Qxd6"
            ],
            "difficulty": 2
          },
          {
            "id": "ch-d-remove-guard-p2",
            "type": "chess_puzzle",
            "promptUk": "Після Qxd6 чорні відійшли Kh8. Поставте мат.",
            "promptEn": "After Qxd6 Black played Kh8. Deliver mate.",
            "fen": "4r2k/5ppp/3Q4/8/8/8/5PPP/4R1K1 w - - 1 2",
            "solutionSans": [
              "Re8#"
            ],
            "difficulty": 1
          },
          {
            "id": "ch-d-remove-guard-m1",
            "type": "mcq",
            "promptUk": "Перед зняттям захисника порахуйте:",
            "promptEn": "Before removing a defender, count:",
            "options": [
              "скільки захисників залишиться і чи немає мату у відповідь",
              "лише ціну ферзя",
              "ходу на годиннику",
              "кількість пішаків на a-лінії"
            ],
            "correctIndex": 0,
            "explanationUk": "Другий захисник і контршок — дві класичні пастки.",
            "explanationEn": "A second defender and a counter-check are the two classic traps.",
            "optionsEn": [
              "how many defenders will remain, and whether there is mate in reply",
              "only the queen's value",
              "the move on the clock",
              "the number of a-file pawns"
            ]
          }
        ]
      },
      {
        "slug": "ch-d-clearance",
        "titleUk": "Розчищення лінії",
        "titleEn": "Clearance",
        "baseXp": 24,
        "difficulty": 4,
        "exercises": [
          {
            "id": "ch-d-clearance-l",
            "type": "chess_lesson",
            "promptUk": "Розчищення лінії",
            "promptEn": "Clearance",
            "fen": "6k1/5ppp/8/8/4N3/8/4QPPP/6K1 w - - 0 1",
            "notesUk": "Розчищення (clearance) — ваша власна фігура стоїть на шляху іншої, сильнішої атаки, і ви прибираєте її з темпом (шах, взяття, загроза), щоб відкрити лінію або діагональ. Це не зняття захисту суперника, а «прибери свого».\n\nНа діаграмі ферзь на e2 хотів би дати мат Qe8#, але власний кінь на e4 закриває вертикаль. 1.Nf6+ прибирає коня з лінії і водночас шахує. Після 1…Kh8 (або 1…Kf8) шлях вільний, і 2.Qe8# — мат. Кінь розчистив вертикаль із темпом: без шаха чорні встигли б дати королю повітря.\n\nІнші картинки: слон відходить із діагоналі ферзя з шахом; тура жертвує себе, щоб ферзь пройшов на ту саму клітинку; пішак просувається і відкриває слона. Головне — темп: розчищення без загрози дарує суперникові хід на порятунок.\n\nТипові помилки: відійти фігурою на поле, де її беруть без компенсації; розчистити лінію і забути, що суперник тепер б'є по ній вас. Питання: «хто заважає моєму мату, і чи можу я його прибрати з шахом?»",
            "notesEn": "Clearance is when your own piece stands in the way of a stronger attack, and you remove it with tempo (a check, a capture, a threat) to open a file or a diagonal. This is not removing the opponent’s defender — it is “get your own piece out of the way”.\n\nIn the diagram the queen on e2 would like to mate with Qe8#, but her own knight on e4 blocks the file. 1.Nf6+ takes the knight off the line and checks at the same time. After 1…Kh8 (or 1…Kf8) the path is open, and 2.Qe8# is mate. The knight cleared the file with tempo: without the check, Black would have time to give the king luft.\n\nOther pictures: a bishop leaves a queen’s diagonal with check; a rook sacrifices itself so the queen can go to the same square; a pawn advances and opens a bishop. The key is tempo: clearance without a threat gives the opponent a move to escape.\n\nTypical mistakes: stepping the piece onto a square where it is taken for nothing; opening a line and forgetting that the opponent now attacks you on it. The question: “who is blocking my mate, and can I move them with check?”",
            "quiz": {
              "q": "Навіщо тут 1.Nf6+?",
              "qEn": "What is the point of 1.Nf6+ here?",
              "options": [
                "прибрати коня з вертикалі e з темпом, щоб ферзь поставив мат на e8",
                "просто вилка без ідеї мату",
                "підготувати рокіровку",
                "закрити свого ферзя назавжди"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "clear the knight from the e-file with tempo, so the queen can mate on e8",
                "a fork with no mating idea",
                "to prepare castling",
                "to shut your queen in forever"
              ]
            }
          },
          {
            "id": "ch-d-clearance-p1",
            "type": "chess_puzzle",
            "promptUk": "Розчистіть вертикаль e з шахом і поставте мат (король іде на h8).",
            "promptEn": "Clear the e-file with check and mate (the king goes to h8).",
            "fen": "6k1/5ppp/8/8/4N3/8/4QPPP/6K1 w - - 0 1",
            "solutionSans": [
              "Nf6+",
              "Kh8",
              "Qe8#"
            ],
            "difficulty": 3
          },
          {
            "id": "ch-d-clearance-p2",
            "type": "chess_puzzle",
            "promptUk": "Та сама ідея, якщо король іде на f8.",
            "promptEn": "The same idea if the king goes to f8.",
            "fen": "6k1/5ppp/8/8/4N3/8/4QPPP/6K1 w - - 0 1",
            "solutionSans": [
              "Nf6+",
              "Kf8",
              "Qe8#"
            ],
            "difficulty": 3
          },
          {
            "id": "ch-d-clearance-m1",
            "type": "mcq",
            "promptUk": "Чим розчищення відрізняється від зняття захисту?",
            "promptEn": "How does clearance differ from removing a defender?",
            "options": [
              "розчищаємо свою фігуру з власної лінії; знімаємо захисника суперника",
              "це одне й те саме",
              "розчищення роблять лише в ендшпілі",
              "зняття захисту завжди тихе"
            ],
            "correctIndex": 0,
            "explanationUk": "Своя фігура проти чужої.",
            "explanationEn": "Your own piece versus the opponent's.",
            "optionsEn": [
              "we clear our own piece from our own line; we remove an enemy defender",
              "they are the same",
              "clearance is only for the endgame",
              "removing a defender is always quiet"
            ]
          }
        ]
      },
      {
        "slug": "ch-d-exchange-sac",
        "titleUk": "Жертва якості",
        "titleEn": "The exchange sacrifice",
        "baseXp": 24,
        "difficulty": 4,
        "exercises": [
          {
            "id": "ch-d-exchange-sac-l",
            "type": "chess_lesson",
            "promptUk": "Жертва якості",
            "promptEn": "The exchange sacrifice",
            "fen": "5rk1/5ppp/5n2/8/5R2/5Q2/6PP/6K1 w - - 0 1",
            "notesUk": "Жертва якості — віддати туру за слона або коня навмисно, не як помилку в рахунку, а заради атаки, пішака, домінуючого коня чи зруйнованого прикриття короля. Рахунок «тура = 5, кінь = 3» тут не головний: важлива позиційна компенсація.\n\nНа діаграмі 1.Rxf6 жертвує якість: тура за коня. Після 1…gxf6 прикриття короля розбите (подвоєні пішаки, відкриті лінії), і ферзь входить на королівський фланг (Qg5+ або вторгнення на f6, коли шлях вільний). Ідея — не обов'язково форсований мат цього ж ходу, а тривала атака проти голого короля. У сицилійському захисті класична жертва …Rxc3 (тура за коня) ламає пішакову структуру білих і дає гру по лінії c.\n\nКоли якість жертвувати варто: ви отримуєте сильного непрогнаного коня, два зв'язані пішаки, або атаку по відкритих лініях на короля. Коли не варто: немає компенсації, суперник просто залишається з турою в ендшпілі.\n\nТипові помилки: «автоматично» вважати жертву якості виграшем, не рахуючи, чи є атака; відмовлятися від неї, коли компенсація очевидна, бо «тура дорожча».",
            "notesEn": "An exchange sacrifice is giving up a rook for a bishop or knight on purpose — not as a counting error, but for an attack, a pawn, a dominant knight, or a smashed king-cover. The “rook = 5, knight = 3” scale is not the point: positional compensation is.\n\nIn the diagram 1.Rxf6 sacrifices the exchange: a rook for a knight. After 1…gxf6 the king’s cover is wrecked (doubled pawns, open lines), and the queen enters the kingside (Qg5+, or an invasion on f6 once the path is clear). The idea is not necessarily mate this move, but a lasting attack against an exposed king. In the Sicilian the classic …Rxc3 (rook for knight) smashes White’s pawn structure and gives play on the c-file.\n\nWhen the exchange sacrifice is worth it: you get a strong unassailable knight, two connected pawns, or an attack on open lines against the king. When it is not: there is no compensation, and the opponent simply keeps a rook into the ending.\n\nTypical mistakes: automatically treating an exchange sacrifice as a win without calculating whether the attack is real; refusing one when the compensation is obvious, because “a rook is worth more”.",
            "quiz": {
              "q": "Що отримують білі після 1.Rxf6 gxf6?",
              "qEn": "What does White get after 1.Rxf6 gxf6?",
              "options": [
                "зруйноване прикриття короля і атаку ферзя за якість",
                "форсований мат у один хід завжди",
                "лише програний матеріал",
                "пат"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "a wrecked king-cover and a queen attack for the exchange",
                "forced mate in one, always",
                "only lost material",
                "stalemate"
              ]
            }
          },
          {
            "id": "ch-d-exchange-sac-p1",
            "type": "chess_puzzle",
            "promptUk": "Пожертвуйте якість на f6, руйнуючи прикриття короля.",
            "promptEn": "Sacrifice the exchange on f6, wrecking the king's cover.",
            "fen": "5rk1/5ppp/5n2/8/5R2/5Q2/6PP/6K1 w - - 0 1",
            "solutionSans": [
              "Rxf6"
            ],
            "difficulty": 3
          },
          {
            "id": "ch-d-exchange-sac-m1",
            "type": "mcq",
            "promptUk": "Класична жертва якості в сицилійському захисті — це:",
            "promptEn": "The classic exchange sacrifice in the Sicilian is:",
            "options": [
              "…Rxc3, ламаючи структуру білих",
              "…Qxh2 мат у 1 завжди",
              "O-O-O на другому ході",
              "відмова від рокіровки"
            ],
            "correctIndex": 0,
            "explanationUk": "Тура за коня на c3 — типова ідея, не автоматичний виграш.",
            "explanationEn": "Rook for the knight on c3 is a typical idea, not an automatic win.",
            "optionsEn": [
              "…Rxc3, smashing White's structure",
              "…Qxh2, always mate in one",
              "O-O-O on move two",
              "refusing to castle"
            ]
          },
          {
            "id": "ch-d-exchange-sac-m2",
            "type": "mcq",
            "promptUk": "Коли жертва якості сумнівна?",
            "promptEn": "When is an exchange sacrifice doubtful?",
            "options": [
              "немає атаки, пішаків або домінуючої фігури — суперник просто залишиться з турою",
              "завжди сумнівна",
              "завжди виграє",
              "лише в бліц"
            ],
            "correctIndex": 0,
            "explanationUk": "Компенсація має бути конкретною.",
            "explanationEn": "The compensation must be concrete.",
            "optionsEn": [
              "there is no attack, pawns, or dominant piece — the opponent will simply keep a rook",
              "it is always doubtful",
              "it always wins",
              "only in blitz"
            ]
          },
          {
            "id": "ch-d-exchange-sac-e",
            "type": "explain",
            "promptUk": "За що можна віддати туру за коня або слона?",
            "promptEn": "What can justify giving a rook for a knight or bishop?",
            "keyIdeas": [
              {
                "labelUk": "Атака",
                "labelEn": "Attack",
                "anyOf": [
                  "атак",
                  "attack",
                  "прикритт",
                  "cover",
                  "корол",
                  "king"
                ]
              },
              {
                "labelUk": "Структура",
                "labelEn": "Structure",
                "anyOf": [
                  "структур",
                  "structure",
                  "сицилій",
                  "Sicilian",
                  "Rxc3"
                ]
              },
              {
                "labelUk": "Компенсація",
                "labelEn": "Compensation",
                "anyOf": [
                  "компенсац",
                  "compensation",
                  "якість",
                  "exchange"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Жертва якості — тура за слона чи коня заради компенсації: зруйноване прикриття короля й атака, або ламання структури, як …Rxc3 у сицилійському. Без компенсації в ендшпілі тура просто сильніша.",
            "sampleAnswerEn": "An exchange sacrifice is a rook for a bishop or knight in return for compensation: a wrecked king-cover and an attack, or a smashed structure, such as …Rxc3 in the Sicilian. Without compensation a rook is simply stronger in the ending."
          }
        ]
      },
      {
        "slug": "ch-d-greek-gift",
        "titleUk": "Грецький дар: ідея Bxh7+",
        "titleEn": "The Greek gift: the idea of Bxh7+",
        "baseXp": 24,
        "difficulty": 4,
        "exercises": [
          {
            "id": "ch-d-greek-gift-l",
            "type": "chess_lesson",
            "promptUk": "Грецький дар: ідея Bxh7+",
            "promptEn": "The Greek gift: the idea of Bxh7+",
            "fen": "rnbq1rk1/ppp2ppp/3p4/4p3/3P4/3B1N2/PPP2PPP/RNBQK2R w KQ - 0 6",
            "notesUk": "Грецький дар — типова жертва слона на h7 (або …Bxh2+) проти рокірованого короля. Ідея не в «віддати слона і подивитись», а в конкретній атаці: 1.Bxh7+ Kxh7 2.Ng5+ і тоді ферзь виходить на h5 (або g4). Якщо король іде на g8, загроза Qh7# або Qxf7+ часто вирішує; якщо на g6 — гонитва ферзем і пішаком h (Qg4, h4-h5).\n\nКоли жертва зазвичай здорова: немає чорного коня на f6 (або його відігнали), слон б'є h7 з d3, кінь може стати на g5, ферзь швидко йде на h5, і чорні не встигають …Be7 або …Bf5, що гасять атаку. Коли сумнівна: кінь f6 тримає h7 і g4, на g5 його відразу б'ють, король тікає, а атака «видихається» — ви просто залишились без слона.\n\nНа діаграмі схема в чистому вигляді: слон d3 цілиться на h7 (шлях e4–f5–g6 вільний), кінь f3 готовий на g5, ферзь — на d1–h5. Програйте пальцями три ходи: Bxh7+ Kxh7 Ng5+ і подивіться обидві відповіді короля.\n\nТипові помилки: жертвувати «бо так у книжці», не рахуючи Ng5 і Qh5; забути, що після …Kg6 є шахи Qg4 і h4. Це ідея, не автоматичний виграш.",
            "notesEn": "The Greek gift is a typical bishop sacrifice on h7 (or …Bxh2+) against a castled king. The idea is not “give the bishop and see”, but a concrete attack: 1.Bxh7+ Kxh7 2.Ng5+ and then the queen comes to h5 (or g4). If the king goes to g8, the threat Qh7# or Qxf7+ often decides; if to g6 — a hunt with the queen and the h-pawn (Qg4, h4-h5).\n\nWhen the sacrifice is usually sound: there is no black knight on f6 (or it has been driven off), the bishop attacks h7 from d3, the knight can land on g5, the queen reaches h5 quickly, and Black has no time for …Be7 or …Bf5, which kill the attack. When it is doubtful: the f6-knight holds h7 and g4, g5 is taken at once, the king flees, and the attack “runs out of breath” — you are simply a bishop down.\n\nThe diagram shows the pattern in a clean form: the bishop on d3 aims at h7 (the path e4–f5–g6 is empty), the knight on f3 is ready for g5, the queen can go d1–h5. Play the three moves with your fingers: Bxh7+ Kxh7 Ng5+, and look at both king replies.\n\nTypical mistakes: sacrificing “because it is in the book” without counting Ng5 and Qh5; forgetting that after …Kg6 there are checks Qg4 and h4. This is an idea, not an automatic win.",
            "quiz": {
              "q": "Які три ходи складають кістяк грецького дару?",
              "qEn": "Which three moves form the backbone of the Greek gift?",
              "options": [
                "Bxh7+, після Kxh7 — Ng5+, потім ферзь на h5 або g4",
                "O-O, a4, h3",
                "Qxh7# одразу без жертви",
                "Rxf7 завжди"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "Bxh7+, after Kxh7 — Ng5+, then the queen to h5 or g4",
                "O-O, a4, h3",
                "Qxh7# at once with no sacrifice",
                "Rxf7 always"
              ]
            }
          },
          {
            "id": "ch-d-greek-gift-p1",
            "type": "chess_puzzle",
            "promptUk": "Почніть грецький дар: жертва, шах конем.",
            "promptEn": "Start the Greek gift: the sacrifice, then the knight check.",
            "fen": "rnbq1rk1/ppp2ppp/3p4/4p3/3P4/3B1N2/PPP2PPP/RNBQK2R w KQ - 0 6",
            "solutionSans": [
              "Bxh7+",
              "Kxh7",
              "Ng5+"
            ],
            "difficulty": 4
          },
          {
            "id": "ch-d-greek-gift-p2",
            "type": "chess_puzzle",
            "promptUk": "Король відійшов на g8: виведіть ферзя на h5.",
            "promptEn": "The king went to g8: bring the queen to h5.",
            "fen": "rnbq1rk1/ppp2ppp/3p4/4p3/3P4/3B1N2/PPP2PPP/RNBQK2R w KQ - 0 6",
            "solutionSans": [
              "Bxh7+",
              "Kxh7",
              "Ng5+",
              "Kg8",
              "Qh5"
            ],
            "difficulty": 4
          },
          {
            "id": "ch-d-greek-gift-m1",
            "type": "mcq",
            "promptUk": "Коли грецький дар часто некоректний?",
            "promptEn": "When is the Greek gift often unsound?",
            "options": [
              "коли кінь на f6 тримає ключові поля і атака гасне, залишаючи вас без слона",
              "коли в суперника є пішак a7",
              "коли ви вже рокірувались",
              "за завжди коректний"
            ],
            "correctIndex": 0,
            "explanationUk": "Спочатку порахуйте Ng5 і відповіді короля, потім жертвуйте.",
            "explanationEn": "Count Ng5 and the king's replies first, then sacrifice.",
            "optionsEn": [
              "when the knight on f6 holds the key squares and the attack dies, leaving you a bishop down",
              "when the opponent has an a7-pawn",
              "when you have already castled",
              "it is always sound"
            ]
          },
          {
            "id": "ch-d-greek-gift-e",
            "type": "explain",
            "promptUk": "Опишіть ідею грецького дару і коли він сумнівний.",
            "promptEn": "Describe the Greek-gift idea and when it is doubtful.",
            "keyIdeas": [
              {
                "labelUk": "Жертва",
                "labelEn": "Sacrifice",
                "anyOf": [
                  "Bxh7",
                  "слона",
                  "bishop",
                  "h7"
                ]
              },
              {
                "labelUk": "Атака",
                "labelEn": "Attack",
                "anyOf": [
                  "Ng5",
                  "ферз",
                  "queen",
                  "Qh5",
                  "Qg4"
                ]
              },
              {
                "labelUk": "Умова",
                "labelEn": "Condition",
                "anyOf": [
                  "кінь",
                  "knight",
                  "f6",
                  "сумнів",
                  "unsound",
                  "гасне",
                  "dies"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Грецький дар — жертва слона Bxh7+, потім Ng5+ і ферзь на h5 або g4. Він сумнівний, коли кінь на f6 тримає ключові поля і атака гасне: ви просто залишаєтесь без слона.",
            "sampleAnswerEn": "The Greek gift is the bishop sacrifice Bxh7+, then Ng5+ and the queen to h5 or g4. It is doubtful when the knight on f6 holds the key squares and the attack dies: you are simply a bishop down."
          }
        ]
      },
      {
        "slug": "ch-d-quiet-sac",
        "titleUk": "Тиха жертва",
        "titleEn": "The quiet sacrifice",
        "baseXp": 24,
        "difficulty": 4,
        "exercises": [
          {
            "id": "ch-d-quiet-sac-l",
            "type": "chess_lesson",
            "promptUk": "Тиха жертва",
            "promptEn": "The quiet sacrifice",
            "fen": "6k1/5ppp/8/8/5B2/8/5QPP/6K1 w - - 0 1",
            "notesUk": "Тиха жертва — жертва без шаха: ви ставите фігуру під взяття, і шаха немає. Суперник може взяти, може не взяти, але загроза (часто мат або подвійний удар) змушує його зіпсувати позицію. Такі ходи важко побачити, бо око шукає шахи.\n\nНа діаграмі 1.Bh6 ставить слона під удар пішака g7. Це не шах. Загроза — увійти ферзем на f6 і далі на g7, або скористатися ослабленими чорними клітинками біля короля. Якщо 1…gxh6, лінія g відкривається і ферзь отримує атаку по розкритому королю; якщо не брати, слон сам бере участь у матових загрозах на g7. Тиша в тому, що перший хід нічого не форсує шахом — форсує ідея.\n\nТиха жертва рідня тихому ходу: обидві випадають зі списку кандидатів. Відмінність — ми свідомо віддаємо матеріал. Класика: слон на h6 проти фіанкето, кінь на f5 під удар пішака, тура на e5, яку не можна взяти через мат.\n\nТипові помилки: «тиха жертва», після якої немає загрози (просто подарунок); не порахувати відмову від взяття. Завжди рахуйте обидві гілки: взяв і не взяв.",
            "notesEn": "A quiet sacrifice is a sacrifice without check: you put a piece en prise, and there is no check. The opponent may take or may not, but a threat (often mate or a double blow) forces them to spoil their position. Such moves are hard to see, because the eye looks for checks.\n\nIn the diagram 1.Bh6 puts the bishop en prise to the g7-pawn. It is not a check. The threat is to enter with the queen on f6 and then g7, or to use the weakened dark squares around the king. If 1…gxh6, the g-line opens and the queen attacks the exposed king; if Black does not take, the bishop itself joins mating threats on g7. The quietness is that the first move forces nothing by check — the idea does the forcing.\n\nA quiet sacrifice is kin to a quiet move: both drop off the candidate list. The difference is that we give up material on purpose. Classics: a bishop on h6 against a fianchetto, a knight on f5 en prise to a pawn, a rook on e5 that cannot be taken because of mate.\n\nTypical mistakes: a “quiet sacrifice” that has no threat (a mere gift); not calculating the refusal of the capture. Always count both branches: took, and did not take.",
            "quiz": {
              "q": "Чим тиха жертва відрізняється від звичайної жертви з шахом?",
              "qEn": "How does a quiet sacrifice differ from an ordinary sacrifice with check?",
              "options": [
                "перший хід не шахує: фігура стоїть під боєм, загроза — в ідеї",
                "тиха жертва заборонена правилами",
                "тиха жертва завжди пат",
                "різниці немає"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "the first move does not check: the piece is en prise, the threat is in the idea",
                "quiet sacrifices are forbidden by the rules",
                "a quiet sacrifice is always stalemate",
                "there is no difference"
              ]
            }
          },
          {
            "id": "ch-d-quiet-sac-p1",
            "type": "chess_puzzle",
            "promptUk": "Тиха жертва слона: поставте його під удар на h6.",
            "promptEn": "A quiet bishop sacrifice: put it en prise on h6.",
            "fen": "6k1/5ppp/8/8/5B2/8/5QPP/6K1 w - - 0 1",
            "solutionSans": [
              "Bh6"
            ],
            "difficulty": 3
          },
          {
            "id": "ch-d-quiet-sac-m1",
            "type": "mcq",
            "promptUk": "Що обов'язково порахувати в тихій жертві?",
            "promptEn": "What must you calculate in a quiet sacrifice?",
            "options": [
              "обидві гілки: суперник взяв і не взяв",
              "лише взяття",
              "лише відмову",
              "тільки рокіровку"
            ],
            "correctIndex": 0,
            "explanationUk": "Відмова від взяття часто найсильніша відповідь.",
            "explanationEn": "Refusing the capture is often the strongest reply.",
            "optionsEn": [
              "both branches: the opponent takes, and does not take",
              "only the capture",
              "only the refusal",
              "only castling"
            ]
          },
          {
            "id": "ch-d-quiet-sac-m2",
            "type": "mcq",
            "promptUk": "Чому тихі жертви легко пропустити?",
            "promptEn": "Why are quiet sacrifices easy to miss?",
            "options": [
              "око шукає шахи, а хід не шахує",
              "вони завжди погані",
              "їх немає в нотації",
              "арбітр їх скасовує"
            ],
            "correctIndex": 0,
            "explanationUk": "Додавайте їх до кандидатів свідомо.",
            "explanationEn": "Add them to your candidates on purpose.",
            "optionsEn": [
              "the eye looks for checks, and the move does not check",
              "they are always bad",
              "they have no notation",
              "the arbiter cancels them"
            ]
          },
          {
            "id": "ch-d-quiet-sac-e",
            "type": "explain",
            "promptUk": "Що робить жертву «тихою» і як її рахувати?",
            "promptEn": "What makes a sacrifice “quiet”, and how do you calculate it?",
            "keyIdeas": [
              {
                "labelUk": "Без шаха",
                "labelEn": "No check",
                "anyOf": [
                  "тих",
                  "quiet",
                  "не шахує",
                  "does not check",
                  "під боєм",
                  "en prise"
                ]
              },
              {
                "labelUk": "Дві гілки",
                "labelEn": "Two branches",
                "anyOf": [
                  "взяв",
                  "takes",
                  "не взяв",
                  "not take",
                  "гілк",
                  "branch"
                ]
              },
              {
                "labelUk": "Загроза",
                "labelEn": "Threat",
                "anyOf": [
                  "загроз",
                  "threat",
                  "мат",
                  "mate"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Тиха жертва ставить фігуру під бій без шаха: загрозу несе ідея, не шах. Треба рахувати обидві гілки — суперник взяв і не взяв — і перевірити, що загроза реальна.",
            "sampleAnswerEn": "A quiet sacrifice puts a piece en prise without check: the threat is the idea, not a check. You must calculate both branches — the opponent takes, and does not — and verify that the threat is real."
          }
        ]
      },
      {
        "slug": "ch-deep-tactics-remove-exam",
        "titleUk": "Іспит: зняття захисту і жертви",
        "titleEn": "Exam: removing defenders and sacrifices",
        "baseXp": 30,
        "difficulty": 4,
        "isExam": true,
        "passThreshold": 0.7,
        "exercises": [
          {
            "id": "ch-deep-tactics-remove-exam-q1",
            "type": "mcq",
            "promptUk": "Розчищення лінії — це:",
            "promptEn": "Clearance is:",
            "options": [
              "прибрати свою фігуру з шляху атаки, бажано з темпом",
              "зняти захисника суперника",
              "хід лише в дебюті",
              "відмова від рокіровки"
            ],
            "correctIndex": 0,
            "explanationUk": "Прибираємо СВОЮ фігуру, часто з шахом.",
            "explanationEn": "We move OUR own piece, often with check.",
            "optionsEn": [
              "moving your own piece off the path of an attack, preferably with tempo",
              "removing an enemy defender",
              "a move only in the opening",
              "refusing to castle"
            ]
          },
          {
            "id": "ch-deep-tactics-remove-exam-q2",
            "type": "mcq",
            "promptUk": "Жертва якості — це:",
            "promptEn": "An exchange sacrifice is:",
            "options": [
              "тура за слона або коня заради компенсації",
              "ферзь за туру",
              "пішак за коня",
              "король за ферзя"
            ],
            "correctIndex": 0,
            "explanationUk": "Компенсація: атака, структура, форпост.",
            "explanationEn": "Compensation: an attack, the structure, an outpost.",
            "optionsEn": [
              "a rook for a bishop or knight, for compensation",
              "a queen for a rook",
              "a pawn for a knight",
              "a king for a queen"
            ]
          },
          {
            "id": "ch-deep-tactics-remove-exam-q3",
            "type": "mcq",
            "promptUk": "Кістяк грецького дару:",
            "promptEn": "The backbone of the Greek gift:",
            "options": [
              "Bxh7+ Kxh7 Ng5+ і ферзь на h5/g4",
              "O-O-O і a4",
              "тільки Qh7# без жертви",
              "взяття на проході"
            ],
            "correctIndex": 0,
            "explanationUk": "Жертва слона, шах конем, ферзь підключається.",
            "explanationEn": "Bishop sacrifice, knight check, the queen joins in.",
            "optionsEn": [
              "Bxh7+ Kxh7 Ng5+ and the queen to h5/g4",
              "O-O-O and a4",
              "only Qh7# with no sacrifice",
              "an en-passant capture"
            ]
          },
          {
            "id": "ch-deep-tactics-remove-exam-p4",
            "type": "chess_puzzle",
            "promptUk": "Розчистіть вертикаль і поставте мат (Kh8).",
            "promptEn": "Clear the file and mate (Kh8).",
            "fen": "6k1/5ppp/8/8/4N3/8/4QPPP/6K1 w - - 0 1",
            "solutionSans": [
              "Nf6+",
              "Kh8",
              "Qe8#"
            ],
            "difficulty": 3
          },
          {
            "id": "ch-deep-tactics-remove-exam-p5",
            "type": "chess_puzzle",
            "promptUk": "Зніміть захисника поля e8.",
            "promptEn": "Remove the defender of e8.",
            "fen": "4r1k1/5ppp/3n4/8/8/8/3Q1PPP/4R1K1 w - - 0 1",
            "solutionSans": [
              "Qxd6"
            ],
            "difficulty": 2
          }
        ]
      }
    ]
  },
  {
    "slug": "ch-deep-mates-classic",
    "titleUk": "Класичні мати",
    "titleEn": "Classic mating patterns",
    "lessons": [
      {
        "slug": "ch-d-smothered",
        "titleUk": "Спертий мат",
        "titleEn": "Smothered mate",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "ch-d-smothered-l",
            "type": "chess_lesson",
            "promptUk": "Спертий мат",
            "promptEn": "Smothered mate",
            "fen": "6rk/6pp/3N4/8/8/8/8/6K1 w - - 0 1",
            "notesUk": "Спертий (задушений) мат ставить кінь королю, якого задушили власні фігури: немає жодної вільної клітинки, і ніхто не може взяти коня. Класична картина — король у куті h8, власні пішаки на g7 і h7, власна тура на g8, білий кінь дає мат на f7.\n\nНа діаграмі саме фінал: 1.Nf7#. Король не йде на g8 (там тура), на g7 і h7 (пішаки), на h8 він уже стоїть; кінь з d6 б'є f7, і взяти його нікому. Це позиція «мат у 1», щоб засвоїти малюнок.\n\nПовну комбінацію називають спадщиною Філідора: ферзь жертвує себе на g8, щоб заманити туру, і кінь ставить спертий мат. Типовий механізм: Qe6+ Kh8, Nf7+ Kg8, Nh6+ (подвійний шах) Kh8, Qg8+ Rxg8, Nf7#. Подвійний шах змушує короля рухатись, жертва ферзя забиває останню «дірку», кінь фінішує.\n\nТипові помилки: ставити коня на f7, коли тура може його взяти; забути подвійний шах у довгій комбінації (тоді король не змушений іти туди, куди треба). Шукайте короля, забитого своїми фігурами, і клітинку коня поруч.",
            "notesEn": "Smothered mate is a mate given by a knight to a king suffocated by his own pieces: he has no empty square, and no one can take the knight. The classic picture is the king in the h8-corner, his own pawns on g7 and h7, his own rook on g8, and a white knight mating on f7.\n\nThe diagram is exactly the finish: 1.Nf7#. The king cannot go to g8 (the rook is there), or to g7 and h7 (pawns), and he already stands on h8; the knight from d6 attacks f7, and nobody can take it. This is a mate-in-one, to fix the pattern.\n\nThe full combination is called Philidor’s legacy: the queen sacrifices herself on g8 to decoy the rook, and the knight gives smothered mate. The typical mechanism: Qe6+ Kh8, Nf7+ Kg8, Nh6+ (double check) Kh8, Qg8+ Rxg8, Nf7#. The double check forces the king to move, the queen sacrifice plugs the last “hole”, the knight finishes.\n\nTypical mistakes: landing the knight on f7 when a rook can take it; forgetting the double check in the long combination (then the king is not forced where you need him). Look for a king boxed in by his own pieces, and a knight square next to him.",
            "quiz": {
              "q": "Чому 1.Nf7# — спертий мат?",
              "qEn": "Why is 1.Nf7# a smothered mate?",
              "options": [
                "кінь шахує, а власні фігури чорних забрали всі поля втечі й не можуть взяти коня",
                "ферзь стоїть на f7",
                "це пат",
                "король сам під боєм пішака"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "the knight checks, and Black's own pieces have taken every flight square and cannot capture the knight",
                "a queen stands on f7",
                "it is stalemate",
                "the king is attacked by a pawn"
              ]
            }
          },
          {
            "id": "ch-d-smothered-p1",
            "type": "chess_puzzle",
            "promptUk": "Спертий мат у 1 хід.",
            "promptEn": "Smothered mate in one.",
            "fen": "6rk/6pp/3N4/8/8/8/8/6K1 w - - 0 1",
            "solutionSans": [
              "Nf7#"
            ],
            "difficulty": 2
          },
          {
            "id": "ch-d-smothered-p2",
            "type": "chess_puzzle",
            "promptUk": "Спадщина Філідора: повна комбінація до спертого мату.",
            "promptEn": "Philidor's legacy: the full combination to smothered mate.",
            "fen": "r5k1/6pp/8/6N1/8/8/4Q3/6K1 w - - 0 1",
            "solutionSans": [
              "Qe6+",
              "Kh8",
              "Nf7+",
              "Kg8",
              "Nh6+",
              "Kh8",
              "Qg8+",
              "Rxg8",
              "Nf7#"
            ],
            "difficulty": 5
          },
          {
            "id": "ch-d-smothered-m1",
            "type": "mcq",
            "promptUk": "Навіщо в спадщині Філідора хід Nh6+?",
            "promptEn": "Why is Nh6+ played in Philidor's legacy?",
            "options": [
              "це подвійний шах: король змушений іти, кінь стає захисником поля g8 для жертви ферзя",
              "щоб запропонувати нічию",
              "щоб забрати пішака",
              "це помилка"
            ],
            "correctIndex": 0,
            "explanationUk": "Подвійний шах не можна закрити — лише відійти королем.",
            "explanationEn": "A double check cannot be blocked — the king must move.",
            "optionsEn": [
              "it is a double check: the king must move, and the knight will defend g8 for the queen sacrifice",
              "to offer a draw",
              "to take a pawn",
              "it is a mistake"
            ]
          }
        ]
      },
      {
        "slug": "ch-d-arabian",
        "titleUk": "Арабський мат",
        "titleEn": "Arabian mate",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "ch-d-arabian-l",
            "type": "chess_lesson",
            "promptUk": "Арабський мат",
            "promptEn": "Arabian mate",
            "fen": "7k/8/5N2/8/8/8/7R/6K1 w - - 0 1",
            "notesUk": "Арабський мат — один із найдавніших записаних матових малюнків: тура і кінь проти короля в куті. Тура ставить мат на останній горизонталі або сьомій (часто h7 або h8), а кінь одночасно захищає туру і забирає поле втечі (зазвичай f7 або g8, і поле поруч із турою).\n\nНа діаграмі 1.Rh7#. Тура шахує по лінії h, кінь на f6 захищає h7 (кінь з f6 б'є g8, h7, h5, g4, e4, d5, d7, e8) і відрізає g8. Король на h8 не може взяти туру — вона захищена — і не має втечі. Запам'ятайте «дім»: кінь на f6, тура на h7, король на h8 — або дзеркально на ферзевому фланзі.\n\nАрабський мат часто закінчує атаку після того, як кінь уже стоїть на f6, а тура піднімається на сьому. Шукайте цей дім заздалегідь і не міняйте коня на f6 без потреби.\n\nТипові помилки: поставити туру на h7, коли кінь не захищає її (король просто бере); переплутати з матом Анастасії, де кінь стоїть на e7 і відрізає поля по-іншому.",
            "notesEn": "Arabian mate is one of the oldest recorded mating patterns: a rook and a knight against a king in the corner. The rook mates on the last rank or the seventh (often h7 or h8), and the knight both defends the rook and takes a flight square (usually f7 or g8, and the square next to the rook).\n\nIn the diagram 1.Rh7#. The rook checks on the h-file, the knight on f6 defends h7 (from f6 a knight attacks g8, h7, h5, g4, e4, d5, d7, e8) and cuts off g8. The king on h8 cannot take the rook — it is defended — and has no flight. Remember the “house”: knight on f6, rook on h7, king on h8 — or the mirror on the queenside.\n\nArabian mate often ends an attack after the knight already sits on f6 and the rook lifts to the seventh. Look for this house early, and do not trade the knight on f6 without a reason.\n\nTypical mistakes: putting the rook on h7 when the knight does not defend it (the king simply takes); confusing it with Anastasia’s mate, where the knight sits on e7 and cuts the squares differently.",
            "quiz": {
              "q": "Яка роль коня в арабському маті Rh7#?",
              "qEn": "What is the knight's role in the Arabian mate Rh7#?",
              "options": [
                "захищає туру на h7 і відрізає поле g8",
                "ставить мат сам",
                "захищає свого короля від шаха",
                "блокує свою туру"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "it defends the rook on h7 and cuts off g8",
                "it gives mate itself",
                "it defends its own king from check",
                "it blocks its own rook"
              ]
            }
          },
          {
            "id": "ch-d-arabian-p1",
            "type": "chess_puzzle",
            "promptUk": "Поставте арабський мат.",
            "promptEn": "Deliver Arabian mate.",
            "fen": "7k/8/5N2/8/8/8/7R/6K1 w - - 0 1",
            "solutionSans": [
              "Rh7#"
            ],
            "difficulty": 2
          },
          {
            "id": "ch-d-arabian-m1",
            "type": "mcq",
            "promptUk": "Типове «домівка» арабського мату:",
            "promptEn": "The typical “house” of Arabian mate:",
            "options": [
              "кінь на f6, тура на h7, король суперника на h8",
              "два слони на довгих діагоналях",
              "ферзь на a4 і пішак на a2",
              "дві тури на другій горизонталі"
            ],
            "correctIndex": 0,
            "explanationUk": "Запам'ятайте малюнок, щоб впізнати його в атаці.",
            "explanationEn": "Remember the picture so you will recognise it in an attack.",
            "optionsEn": [
              "knight on f6, rook on h7, enemy king on h8",
              "two bishops on long diagonals",
              "queen on a4 and a pawn on a2",
              "two rooks on the second rank"
            ]
          },
          {
            "id": "ch-d-arabian-m2",
            "type": "mcq",
            "promptUk": "Чим арабський мат відрізняється від спертого?",
            "promptEn": "How does Arabian mate differ from smothered mate?",
            "options": [
              "мат ставить тура за підтримки коня, а не сам кінь проти «задушеного» короля",
              "різниці немає",
              "арабський мат роблять пішаком",
              "спертий мат роблять двома слонами"
            ],
            "correctIndex": 0,
            "explanationUk": "Різні фігури ставлять фінальний шах, різний малюнок.",
            "explanationEn": "Different pieces give the final check, and the picture is different.",
            "optionsEn": [
              "the rook mates with the knight's support, not the knight alone against a “suffocated” king",
              "there is no difference",
              "Arabian mate is given by a pawn",
              "smothered mate is given by two bishops"
            ]
          }
        ]
      },
      {
        "slug": "ch-d-anastasia",
        "titleUk": "Мат Анастасії",
        "titleEn": "Anastasia's mate",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "ch-d-anastasia-l",
            "type": "chess_lesson",
            "promptUk": "Мат Анастасії",
            "promptEn": "Anastasia's mate",
            "fen": "7k/4N1p1/8/8/8/R7/8/6K1 w - - 0 1",
            "notesUk": "Мат Анастасії — тура і кінь, але малюнок інший, ніж в арабському. Кінь на e7 (або симетрично) відрізає королю поля g8 і g6, а тура дає мат по відкритій лінії h. Король затиснутий на краю дошки; часто його ще підпирає власний пішак на g7, який відбирає втечу.\n\nНа діаграмі 1.Rh3#. Тура з a3 переходить на лінію h і шахує короля на h8. Шлях h4–h7 вільний. Кінь на e7 б'є g8 і g6: король не виходить на g-лінію. Пішак g7 забирає g8 як «свою» тісноту. Тура не обов'язково стоїть уже на лінії h — вона туди приходить, інколи після жертви, що відкриває лінію.\n\nІм'я йде від роману і старої задачі; вам потрібен малюнок: кінь e7 + тура по h + король на h-лінії. Часто комбінація починається жертвою ферзя або тури, що знімає захисника лінії h.\n\nТипові помилки: плутати з арабським (там кінь на f6 і тура на h7); дати шах турою, коли кінь не стоїть на e7 — король просто виходить на g8.",
            "notesEn": "Anastasia’s mate is also a rook and a knight, but the picture differs from the Arabian. The knight on e7 (or the mirror) cuts off g8 and g6, and the rook mates on the open h-file. The king is trapped on the edge; often his own pawn on g7 steals a flight square as well.\n\nIn the diagram 1.Rh3#. The rook comes from a3 onto the h-file and checks the king on h8. The path h4–h7 is empty. The knight on e7 attacks g8 and g6: the king cannot step onto the g-file. The g7-pawn adds to the crush. The rook need not already stand on the h-file — it arrives there, sometimes after a sacrifice that opens the file.\n\nThe name comes from a novel and an old problem; you need the picture: knight on e7 + rook on the h-file + king on the h-file. The combination often starts with a queen or rook sacrifice that removes the defender of the h-file.\n\nTypical mistakes: confusing it with the Arabian (there the knight is on f6 and the rook on h7); checking with the rook when the knight is not on e7 — the king simply walks to g8.",
            "quiz": {
              "q": "Яка роль коня на e7 в маті Анастасії?",
              "qEn": "What is the role of the knight on e7 in Anastasia's mate?",
              "options": [
                "відрізати королю поля g8 і g6, щоб тура могла дати мат по лінії h",
                "захистити свого короля",
                "взяти ферзя",
                "заблокувати свою туру"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "to cut off g8 and g6, so the rook can mate on the h-file",
                "to defend its own king",
                "to take a queen",
                "to block its own rook"
              ]
            }
          },
          {
            "id": "ch-d-anastasia-p1",
            "type": "chess_puzzle",
            "promptUk": "Поставте мат Анастасії: тура на лінію h.",
            "promptEn": "Deliver Anastasia's mate: the rook to the h-file.",
            "fen": "7k/4N1p1/8/8/8/R7/8/6K1 w - - 0 1",
            "solutionSans": [
              "Rh3#"
            ],
            "difficulty": 2
          },
          {
            "id": "ch-d-anastasia-m1",
            "type": "mcq",
            "promptUk": "Де типово стоїть кінь у маті Анастасії (атака на короля в куті h8)?",
            "promptEn": "Where does the knight typically stand in Anastasia's mate (attack on a king in the h8-corner)?",
            "options": [
              "на e7",
              "на f6 (це арабський мат)",
              "на a1",
              "на h1"
            ],
            "correctIndex": 0,
            "explanationUk": "e7 відрізає g6 і g8; f6 — інший малюнок (арабський).",
            "explanationEn": "e7 cuts g6 and g8; f6 is a different picture (Arabian).",
            "optionsEn": [
              "on e7",
              "on f6 (that is Arabian mate)",
              "on a1",
              "on h1"
            ]
          },
          {
            "id": "ch-d-anastasia-m2",
            "type": "mcq",
            "promptUk": "Чому пішак чорних на g7 тут допомагає мату?",
            "promptEn": "Why does Black's pawn on g7 help the mate here?",
            "options": [
              "він забирає в короля поле і тісноту, як у спертому маті — свої фігури заважають",
              "він захищає білу туру",
              "він дає шаха",
              "він не грає жодної ролі"
            ],
            "correctIndex": 0,
            "explanationUk": "Власні фігури часто стають частиною матової сітки.",
            "explanationEn": "Your opponent's own pieces often become part of the mating net.",
            "optionsEn": [
              "it takes a square from the king and adds to the crush, as in smothered mate — one's own pieces get in the way",
              "it defends the white rook",
              "it gives check",
              "it plays no role"
            ]
          }
        ]
      },
      {
        "slug": "ch-d-boden",
        "titleUk": "Мат Бодена",
        "titleEn": "Boden's mate",
        "baseXp": 24,
        "difficulty": 4,
        "exercises": [
          {
            "id": "ch-d-boden-l",
            "type": "chess_lesson",
            "promptUk": "Мат Бодена",
            "promptEn": "Boden's mate",
            "fen": "2kr4/p4ppp/2p5/2N5/5B2/3B4/8/6K1 w - - 0 1",
            "notesUk": "Мат Бодена ставлять два слони, що б'ють суміжні діагоналі навколо короля, затиснутого власними фігурами (часто після довгої рокіровки: король на c8, тура на d8, пішаки на a7 і c7 або c6). Слони схрещуються, як ножиці.\n\nНа діаграмі 1.Ba6#. Слон із d3 іде на a6 і шахує короля на c8 по діагоналі a6–b7–c8. Другий слон на f4 тримає втечі (b8, c7) по іншій діагоналі; кінь на c5 забирає d7 і b7. Король у клітці зі своїх пішаків і тури d8. Класична комбінація Бодена проти Шульдера починалась жертвою ферзя на c6, що відкривала діагональ, після чого слон ставив мат на a6.\n\nШукайте короля після довгої рокіровки з «дірявими» чорними полями (або білими — залежно від слонів) і пару слонів, націлених у його дім. Жертва ферзя на перетині часто є ключем.\n\nТипові помилки: дати шах одним слоном, коли другий не відрізає втечу (король іде на d7 або b8); плутати з матом двох слонів у ендшпілі, де короля тіснять до краю без «своїх» фігур навколо.",
            "notesEn": "Boden’s mate is given by two bishops that attack adjacent diagonals around a king boxed in by his own pieces (often after long castling: king on c8, rook on d8, pawns on a7 and c7 or c6). The bishops cross like scissors.\n\nIn the diagram 1.Ba6#. The bishop comes from d3 to a6 and checks the king on c8 along a6–b7–c8. The second bishop on f4 holds the flights (b8, c7) on the other diagonal; the knight on c5 takes d7 and b7. The king is in a cage of his own pawns and the d8-rook. The classic Boden–Schulder combination began with a queen sacrifice on c6 that opened the diagonal, after which the bishop mated on a6.\n\nLook for a king after long castling with “holey” dark squares (or light — depending on the bishops) and a bishop pair aimed at his house. A queen sacrifice on the crossing is often the key.\n\nTypical mistakes: checking with one bishop when the second does not cut the flight (the king goes to d7 or b8); confusing it with the two-bishop mate in the ending, where the king is driven to the edge without his own pieces around him.",
            "quiz": {
              "q": "Хто ставить мат Бодена і в якій типовій позиції короля?",
              "qEn": "Who delivers Boden's mate, and in what typical king position?",
              "options": [
                "два слони по суміжних діагоналях, часто проти короля після довгої рокіровки",
                "кінь і тура в куті h8",
                "ферзь на останній горизонталі сам",
                "два коні на f7 і f6"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "two bishops on adjacent diagonals, often against a king after long castling",
                "a knight and rook in the h8-corner",
                "a queen alone on the back rank",
                "two knights on f7 and f6"
              ]
            }
          },
          {
            "id": "ch-d-boden-p1",
            "type": "chess_puzzle",
            "promptUk": "Поставте мат Бодена слоном на a6.",
            "promptEn": "Deliver Boden's mate with the bishop to a6.",
            "fen": "2kr4/p4ppp/2p5/2N5/5B2/3B4/8/6K1 w - - 0 1",
            "solutionSans": [
              "Ba6#"
            ],
            "difficulty": 3
          },
          {
            "id": "ch-d-boden-m1",
            "type": "mcq",
            "promptUk": "Класичний вступ до мату Бодена — це часто:",
            "promptEn": "The classic introduction to Boden's mate is often:",
            "options": [
              "жертва ферзя, що відкриває діагональ слону (наприклад, на c6)",
              "коротка рокіровка",
              "взяття на проході",
              "підпромоція в коня"
            ],
            "correctIndex": 0,
            "explanationUk": "Ферзь відкриває лінію, слони довершують ножиці.",
            "explanationEn": "The queen opens the line, the bishops complete the scissors.",
            "optionsEn": [
              "a queen sacrifice that opens a diagonal for a bishop (for example on c6)",
              "short castling",
              "an en-passant capture",
              "underpromotion to a knight"
            ]
          },
          {
            "id": "ch-d-boden-m2",
            "type": "mcq",
            "promptUk": "Чому власна тура чорних на d8 допомагає мату?",
            "promptEn": "Why does Black's own rook on d8 help the mate?",
            "options": [
              "вона забирає в короля поле втечі",
              "вона захищає білого слона",
              "вона дає шаха білим",
              "вона не впливає"
            ],
            "correctIndex": 0,
            "explanationUk": "Як і в інших «кутових» матах, свої фігури стають стінами сітки.",
            "explanationEn": "As in other “corner” mates, one's own pieces become walls of the net.",
            "optionsEn": [
              "it takes a flight square from the king",
              "it defends the white bishop",
              "it checks White",
              "it has no effect"
            ]
          }
        ]
      },
      {
        "slug": "ch-d-legal",
        "titleUk": "Мат Легаля",
        "titleEn": "Legall's mate",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "ch-d-legal-l",
            "type": "chess_lesson",
            "promptUk": "Мат Легаля",
            "promptEn": "Legall's mate",
            "fen": "r2qkbnr/ppp2ppp/2np4/4N3/2B1P3/2N5/PPPP1PPP/R1BbK2R w KQkq - 0 6",
            "notesUk": "Мат Легаля (Legal’s mate) — повчальна пастка в дебюті і водночас точний матовий механізм. Після 1.e4 e5 2.Nf3 d6 3.Bc4 Bg4 4.Nc3 Nc6 білі «підвішують» ферзя: 5.Nxe5! Якщо чорні жадібно беруть 5…Bxd1, то 6.Bxf7+ Ke7 7.Nd5# — мат конем, слоном і кільцем із фігур.\n\nНа діаграмі вже позиція після 5…Bxd1. Білі не забирають «даремного» ферзя назад, а ставлять мат: 1.Bxf7+ Ke7 (єдине) 2.Nd5#. Король затиснутий на e7, слон б'є з f7, кінь з d5, друге кільце тримає кінь на e5. Мораль не «завжди віддавайте ферзя», а: огляньте весь форсований варіант, перш ніж брати «вільного» ферзя; і навпаки, не жертвуйте ферзя, якщо мату немає (чорні можуть не брати на d1, а просто відіграти фігуру).\n\nЯкщо 5…Nxe5, білі не ставлять мат, а забирають слона на g4 — і залишаються з зайвим пішаком при нормальній грі. Жертва коректна лише в одній гілці.\n\nТипові помилки учнів: брати ферзя «автоматом»; грати Nxe5, коли слон на g4 не атакує ферзя або коли мату після Bxf7 немає.",
            "notesEn": "Legall’s mate is an instructive opening trap and at the same time a precise mating mechanism. After 1.e4 e5 2.Nf3 d6 3.Bc4 Bg4 4.Nc3 Nc6 White “hangs” the queen: 5.Nxe5! If Black greedily takes 5…Bxd1, then 6.Bxf7+ Ke7 7.Nd5# — mate by a knight, a bishop, and a ring of pieces.\n\nThe diagram is already the position after 5…Bxd1. White does not recapture the “free” queen, but mates: 1.Bxf7+ Ke7 (forced) 2.Nd5#. The king is trapped on e7, the bishop attacks from f7, the knight from d5, and the knight on e5 completes the ring. The moral is not “always give up your queen”, but: look at the whole forced line before taking a “free” queen; and conversely, do not sacrifice the queen if there is no mate (Black may refuse d1 and simply win a piece back).\n\nIf 5…Nxe5, White does not mate, but takes the bishop on g4 — and stays a pawn up in a normal game. The sacrifice is correct only in one branch.\n\nTypical student mistakes: taking the queen on autopilot; playing Nxe5 when the bishop on g4 is not attacking the queen, or when there is no mate after Bxf7.",
            "quiz": {
              "q": "Після того як чорні взяли ферзя на d1, який мат?",
              "qEn": "After Black has taken the queen on d1, what is the mate?",
              "options": [
                "Bxf7+ Ke7 Nd5#",
                "Kxd1 і все",
                "O-O мат",
                "Qd8#"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "Bxf7+ Ke7 Nd5#",
                "Kxd1 and that is all",
                "O-O mate",
                "Qd8#"
              ]
            }
          },
          {
            "id": "ch-d-legal-p1",
            "type": "chess_puzzle",
            "promptUk": "Мат Легаля: не беріть ферзя назад, поставте мат.",
            "promptEn": "Legall's mate: do not recapture the queen, deliver mate.",
            "fen": "r2qkbnr/ppp2ppp/2np4/4N3/2B1P3/2N5/PPPP1PPP/R1BbK2R w KQkq - 0 6",
            "solutionSans": [
              "Bxf7+",
              "Ke7",
              "Nd5#"
            ],
            "difficulty": 3
          },
          {
            "id": "ch-d-legal-m1",
            "type": "mcq",
            "promptUk": "Якщо чорні не беруть ферзя, а грають 5…Nxe5, що роблять білі?",
            "promptEn": "If Black does not take the queen and plays 5…Nxe5, what should White do?",
            "options": [
              "забрати слона на g4 і лишитись із зайвим пішаком",
              "усе одно грати Bxf7+",
              "здатися: ферзя вже немає",
              "рокіруватись під шахом"
            ],
            "correctIndex": 0,
            "explanationUk": "Жертва працює лише в гілці …Bxd1.",
            "explanationEn": "The sacrifice works only in the …Bxd1 branch.",
            "optionsEn": [
              "take the bishop on g4 and stay a pawn up",
              "play Bxf7+ anyway",
              "resign: the queen is already gone",
              "castle out of check"
            ]
          },
          {
            "id": "ch-d-legal-m2",
            "type": "mcq",
            "promptUk": "Головний урок мату Легаля:",
            "promptEn": "The main lesson of Legall's mate:",
            "options": [
              "перш ніж брати «вільного» ферзя, дорахуйте форсований мат суперника",
              "ферзя завжди треба брати",
              "у дебюті не розвивають фігури",
              "мат ставлять лише пішаком"
            ],
            "correctIndex": 0,
            "explanationUk": "Жадібність без розрахунку програє партію.",
            "explanationEn": "Greed without calculation loses the game.",
            "optionsEn": [
              "before taking a “free” queen, calculate the opponent's forced mate",
              "you should always take the queen",
              "in the opening you should not develop pieces",
              "only a pawn can mate"
            ]
          }
        ]
      },
      {
        "slug": "ch-deep-mates-classic-exam",
        "titleUk": "Іспит: класичні мати",
        "titleEn": "Exam: classic mating patterns",
        "baseXp": 30,
        "difficulty": 3,
        "isExam": true,
        "passThreshold": 0.7,
        "exercises": [
          {
            "id": "ch-deep-mates-classic-exam-q1",
            "type": "mcq",
            "promptUk": "Спертий мат ставить:",
            "promptEn": "Smothered mate is delivered by:",
            "options": [
              "кінь королю, задушеному власними фігурами",
              "два слони на суміжних діагоналях",
              "тура на h7 з конем на f6",
              "ферзь на останній горизонталі"
            ],
            "correctIndex": 0,
            "explanationUk": "Кінь на f7, король у куті, свої тури й пішаки заважають.",
            "explanationEn": "A knight on f7, the king in the corner, his own rooks and pawns in the way.",
            "optionsEn": [
              "a knight, against a king suffocated by his own pieces",
              "two bishops on adjacent diagonals",
              "a rook on h7 with a knight on f6",
              "a queen on the back rank"
            ]
          },
          {
            "id": "ch-deep-mates-classic-exam-q2",
            "type": "mcq",
            "promptUk": "Арабський мат — це:",
            "promptEn": "Arabian mate is:",
            "options": [
              "тура ставить мат, кінь на f6 її захищає і відрізає поля",
              "два коні без тури",
              "мат Легаля",
              "пат"
            ],
            "correctIndex": 0,
            "explanationUk": "Дім: кінь f6, тура h7, король h8.",
            "explanationEn": "The house: knight f6, rook h7, king h8.",
            "optionsEn": [
              "the rook mates, the knight on f6 defends it and cuts off squares",
              "two knights with no rook",
              "Legall's mate",
              "stalemate"
            ]
          },
          {
            "id": "ch-deep-mates-classic-exam-q3",
            "type": "mcq",
            "promptUk": "Мат Бодена ставлять:",
            "promptEn": "Boden's mate is delivered by:",
            "options": [
              "два слони-ножиці, часто проти довгої рокіровки",
              "один кінь",
              "дві тури на другій горизонталі",
              "пішак на сьомій"
            ],
            "correctIndex": 0,
            "explanationUk": "Суміжні діагоналі навколо затиснутого короля.",
            "explanationEn": "Adjacent diagonals around a cramped king.",
            "optionsEn": [
              "two scissor-bishops, often against long castling",
              "a single knight",
              "two rooks on the second rank",
              "a pawn on the seventh"
            ]
          },
          {
            "id": "ch-deep-mates-classic-exam-p4",
            "type": "chess_puzzle",
            "promptUk": "Спертий мат у 1.",
            "promptEn": "Smothered mate in one.",
            "fen": "6rk/6pp/3N4/8/8/8/8/6K1 w - - 0 1",
            "solutionSans": [
              "Nf7#"
            ],
            "difficulty": 2
          },
          {
            "id": "ch-deep-mates-classic-exam-p5",
            "type": "chess_puzzle",
            "promptUk": "Мат Легаля: доведіть до кінця.",
            "promptEn": "Legall's mate: finish it.",
            "fen": "r2qkbnr/ppp2ppp/2np4/4N3/2B1P3/2N5/PPPP1PPP/R1BbK2R w KQkq - 0 6",
            "solutionSans": [
              "Bxf7+",
              "Ke7",
              "Nd5#"
            ],
            "difficulty": 3
          }
        ]
      }
    ]
  },
  {
    "slug": "ch-deep-mates-attack",
    "titleUk": "Мати в атаці на короля",
    "titleEn": "Mates in the king attack",
    "lessons": [
      {
        "slug": "ch-d-opera-corr",
        "titleUk": "Коридорний мат і Опера Морфі",
        "titleEn": "Corridor mate and Morphy's Opera Game",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "ch-d-opera-corr-l",
            "type": "chess_lesson",
            "promptUk": "Коридорний мат і Опера Морфі",
            "promptEn": "Corridor mate and Morphy's Opera Game",
            "fen": "4kb1r/p2n1ppp/4q3/4p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 0 16",
            "notesUk": "Коридорний мат (corridor, або мат на останній горизонталі в «коридорі») — важка фігура врізається в останню горизонталь, а король затиснутий своїми пішаками і фігурами, як у вузькому коридорі без luft (повітря — ходу пішака перед королем).\n\nНайзнаменитіший приклад — Опера Морфі (Париж, 1858): Морфі проти герцога Брауншвейзького і графа Ізуара. На діаграмі критична позиція перед фіналом. 1.Qb8+! жертвує ферзя: кінь змушений взяти 1…Nxb8, і 2.Rd8# — тура ставить мат у коридорі. Король на e8 не тікає: свої фігури і пішаки тримають його в клітці, а слон на g5 і тура відрізають поля.\n\nІдея жертви на восьмій — відволікти захисника (коня на d7), щоб тура увійшла на d8. Це родич відволікання і мату на останній горизонталі, який ви вже знаєте, але тут малюнок історичний і точний.\n\nПрактичне правило: якщо король суперника без luft, шукайте жертву, що впускає туру на останню горизонталь. І самі робіть luft (h3, h6, g3), коли ваша восьма незахищена.",
            "notesEn": "Corridor mate (or back-rank mate in a “corridor”) is a heavy piece cutting into the last rank while the king is trapped by his own pawns and pieces, as in a narrow corridor without luft (air — a pawn move in front of the king).\n\nThe most famous example is Morphy’s Opera Game (Paris, 1858): Morphy against the Duke of Brunswick and Count Isouard. The diagram is the critical position before the finish. 1.Qb8+! sacrifices the queen: the knight must take 1…Nxb8, and 2.Rd8# — the rook mates in the corridor. The king on e8 cannot flee: his own pieces and pawns hold him in a cage, and the bishop on g5 and the rook cut off squares.\n\nThe idea of the sacrifice on the eighth is to deflect the defender (the knight on d7) so the rook can enter on d8. It is related to deflection and the back-rank mate you already know, but the picture here is historical and exact.\n\nA practical rule: if the opponent’s king has no luft, look for a sacrifice that lets a rook onto the back rank. And make luft yourself (h3, h6, g3) when your eighth is undefended.",
            "quiz": {
              "q": "Фінал Опери: що робить 1.Qb8+?",
              "qEn": "The Opera finish: what does 1.Qb8+ do?",
              "options": [
                "відволікає коня з захисту d8, тоді Rd8# — коридорний мат",
                "одразу ставить мат ферзем",
                "бере пішака",
                "запрошує до нічиєї"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "deflects the knight from the defence of d8, then Rd8# is corridor mate",
                "mates with the queen at once",
                "takes a pawn",
                "offers a draw"
              ]
            }
          },
          {
            "id": "ch-d-opera-corr-p1",
            "type": "chess_puzzle",
            "promptUk": "Фінал Опери Морфі: жертва ферзя і мат турою.",
            "promptEn": "The finish of Morphy's Opera: queen sacrifice and rook mate.",
            "fen": "4kb1r/p2n1ppp/4q3/4p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 0 16",
            "solutionSans": [
              "Qb8+",
              "Nxb8",
              "Rd8#"
            ],
            "difficulty": 3
          },
          {
            "id": "ch-d-opera-corr-p2",
            "type": "chess_puzzle",
            "promptUk": "Коридорний мат у 2: ферзь жертвує себе на e8.",
            "promptEn": "Corridor mate in two: the queen sacrifices herself on e8.",
            "fen": "r5k1/5ppp/8/8/8/8/4QPPP/4R1K1 w - - 0 1",
            "solutionSans": [
              "Qe8+",
              "Rxe8",
              "Rxe8#"
            ],
            "difficulty": 3
          },
          {
            "id": "ch-d-opera-corr-m1",
            "type": "mcq",
            "promptUk": "Що таке luft і навіщо він?",
            "promptEn": "What is luft, and why is it needed?",
            "options": [
              "«повітря» — хід пішака перед королем, щоб був вихід з коридору",
              "жертва ферзя",
              "довга рокіровка",
              "взяття на проході"
            ],
            "correctIndex": 0,
            "explanationUk": "h3, g3, h6, g6 — типовий захист від мату на останній горизонталі.",
            "explanationEn": "h3, g3, h6, g6 — typical defence against back-rank mate.",
            "optionsEn": [
              "“air” — a pawn move in front of the king so there is a way out of the corridor",
              "a queen sacrifice",
              "long castling",
              "an en-passant capture"
            ]
          }
        ]
      },
      {
        "slug": "ch-d-morphy-mate",
        "titleUk": "Мат Морфі",
        "titleEn": "Morphy's mate",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "ch-d-morphy-mate-l",
            "type": "chess_lesson",
            "promptUk": "Мат Морфі",
            "promptEn": "Morphy's mate",
            "fen": "7k/7p/4B3/8/8/8/8/6RK w - - 0 1",
            "notesUk": "Мат Морфі — малюнок, у якому тура (або ферзь) ставить мат на лінії g (часто g8), а слон захищає туру і відрізає короля по довгій діагоналі. Король у куті h8, лінія g відкрита, слон цілиться на g8 (або захищає туру, що туди встала).\n\nНа діаграмі 1.Rg8#. Тура з g1 іде на g8 (шлях вільний), шахує короля на h8. Слон на e6 захищає g8 по діагоналі e6–f7–g8, тому король не бере туру. Поле h7 зайняте власним пішаком, g7 б'є тура. Це «чистий» фінал мату Морфі.\n\nІм'я вшановує Пола Морфі і його атаки з слоном на довгій діагоналі та турою по відкритій лінії. На практиці часто спочатку жертвою відкривають лінію g, потім ставлять цей мат. Не плутайте з матом Морфі в сенсі «будь-яка партія Морфі»: це конкретний малюнок тура+слон.\n\nТипові помилки: туру на g8, коли слон не захищає її (Kxg8); слон перекритий своїм або чужим пішаком на діагоналі. Перед Rg8 перевірте діагональ слона до g8.",
            "notesEn": "Morphy’s mate is a pattern in which a rook (or queen) mates on the g-file (often g8), and a bishop defends the rook and cuts the king on the long diagonal. The king is in the h8-corner, the g-file is open, the bishop aims at g8 (or defends the rook that has arrived there).\n\nIn the diagram 1.Rg8#. The rook comes from g1 to g8 (the path is clear) and checks the king on h8. The bishop on e6 defends g8 along e6–f7–g8, so the king cannot take the rook. The h7-square is occupied by Black’s own pawn, and the rook covers g7. This is a “clean” finish of Morphy’s mate.\n\nThe name honours Paul Morphy and his attacks with a bishop on the long diagonal and a rook on an open file. In practice a sacrifice often opens the g-file first, then this mate is delivered. Do not confuse it with “any Morphy game”: it is a specific rook-and-bishop picture.\n\nTypical mistakes: a rook to g8 when the bishop does not defend it (Kxg8); a bishop blocked by a pawn on the diagonal. Before Rg8, check the bishop’s diagonal to g8.",
            "quiz": {
              "q": "Хто захищає туру на g8 у маті Морфі на діаграмі?",
              "qEn": "Who defends the rook on g8 in Morphy's mate in the diagram?",
              "options": [
                "слон на e6 по діагоналі e6–f7–g8",
                "пішак на g7",
                "кінь на f6",
                "ніхто, король може взяти"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "the bishop on e6 along the diagonal e6–f7–g8",
                "a pawn on g7",
                "a knight on f6",
                "no one, the king can take"
              ]
            }
          },
          {
            "id": "ch-d-morphy-mate-p1",
            "type": "chess_puzzle",
            "promptUk": "Поставте мат Морфі турою на g8.",
            "promptEn": "Deliver Morphy's mate with the rook to g8.",
            "fen": "7k/7p/4B3/8/8/8/8/6RK w - - 0 1",
            "solutionSans": [
              "Rg8#"
            ],
            "difficulty": 2
          },
          {
            "id": "ch-d-morphy-mate-m1",
            "type": "mcq",
            "promptUk": "Що має бути відкритим для мату Морфі турою на g8?",
            "promptEn": "What must be open for Morphy's mate with a rook on g8?",
            "options": [
              "лінія g і діагональ слона до g8",
              "лише лінія a",
              "лише друга горизонталь",
              "діагональ двох конів"
            ],
            "correctIndex": 0,
            "explanationUk": "Тура йде по лінії, слон підтримує по діагоналі.",
            "explanationEn": "The rook travels on the file, the bishop supports on the diagonal.",
            "optionsEn": [
              "the g-file and the bishop's diagonal to g8",
              "only the a-file",
              "only the second rank",
              "a diagonal of two knights"
            ]
          },
          {
            "id": "ch-d-morphy-mate-m2",
            "type": "mcq",
            "promptUk": "Якщо слон не захищає g8, хід Rg8:",
            "promptEn": "If the bishop does not defend g8, the move Rg8:",
            "options": [
              "швидше за все програє туру: король просто бере",
              "все одно завжди мат",
              "є патом",
              "заборонений правилами"
            ],
            "correctIndex": 0,
            "explanationUk": "Спочатку перевірте захист поля посадки.",
            "explanationEn": "First check that the landing square is defended.",
            "optionsEn": [
              "most likely loses the rook: the king simply takes",
              "is still always mate",
              "is stalemate",
              "is forbidden by the rules"
            ]
          }
        ]
      },
      {
        "slug": "ch-d-damiano-lolli",
        "titleUk": "Мат Даміано і мат Лоллі",
        "titleEn": "Damiano's mate and Lolli's mate",
        "baseXp": 24,
        "difficulty": 4,
        "exercises": [
          {
            "id": "ch-d-damiano-lolli-l",
            "type": "chess_lesson",
            "promptUk": "Мат Даміано і мат Лоллі",
            "promptEn": "Damiano's mate and Lolli's mate",
            "fen": "7k/5p2/6P1/8/8/8/7Q/6K1 w - - 0 1",
            "notesUk": "Два споріднені мати з ферзем і пішаком біля короля. Мат Даміано: білий пішак на g6 (клин), ферзь вривається на h7 або h8. Пішак захищає ферзя і відрізає поля. На першій діаграмі 1.Qh7# — ферзь іде на h7 під захистом пішака g6, король у куті без виходу. Часто вступом є жертва тури на h8, щоб відкрити лінію h, після чого ферзь фінішує (класичний механізм Даміано).\n\nМат Лоллі — дзеркальний родич: пішак-клин стоїть на f6, ферзь іде на h6 і далі на g7. На другій позиції 1.Qh6 загрожує 2.Qg7#; єдиний хід 1…Kh8, тоді 2.Qg7# усе одно мат (пішак f6 захищає ферзя). Пішак на f6 — «кістка в горлі» королівського флангу, його не можна недооцінювати.\n\nОбидва мати вчать одного: клин на шостій горизонталі (f6 або g6) плюс ферзь на лінії h — це майже готова сітка. Прагніть поставити такий пішак; захищаючись, не пускайте його туди або негайно міняйте.\n\nТипові помилки: вриватись ферзем на h7, коли пішака-клина немає (король бере ферзя); плутати f6 і g6 і поставити ферзя не на те поле.",
            "notesEn": "Two related mates with a queen and a pawn next to the king. Damiano’s mate: a white pawn on g6 (a wedge), the queen crashes in on h7 or h8. The pawn defends the queen and cuts off squares. In the first diagram 1.Qh7# — the queen goes to h7 under the protection of the g6-pawn, the king in the corner has no exit. Often the introduction is a rook sacrifice on h8 to open the h-file, after which the queen finishes (Damiano’s classic mechanism).\n\nLolli’s mate is a mirror relative: the wedge-pawn sits on f6, the queen goes to h6 and then to g7. In the second position 1.Qh6 threatens 2.Qg7#; the only move is 1…Kh8, then 2.Qg7# is still mate (the f6-pawn defends the queen). A pawn on f6 is a “bone in the throat” of the kingside; do not underestimate it.\n\nBoth mates teach the same thing: a wedge on the sixth rank (f6 or g6) plus a queen on the h-file is an almost ready net. Strive to plant such a pawn; when defending, do not let it there, or trade it at once.\n\nTypical mistakes: crashing the queen to h7 when there is no wedge-pawn (the king takes the queen); mixing up f6 and g6 and putting the queen on the wrong square.",
            "quiz": {
              "q": "Що захищає ферзя в маті Даміано Qh7# на діаграмі?",
              "qEn": "What defends the queen in Damiano's mate Qh7# in the diagram?",
              "options": [
                "пішак-клин на g6",
                "кінь на f6",
                "тура на a1",
                "нічого, король бере ферзя"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "the wedge-pawn on g6",
                "a knight on f6",
                "a rook on a1",
                "nothing, the king takes the queen"
              ]
            }
          },
          {
            "id": "ch-d-damiano-lolli-p1",
            "type": "chess_puzzle",
            "promptUk": "Мат Даміано: ферзь на h7 під захистом пішака g6.",
            "promptEn": "Damiano's mate: the queen to h7, defended by the g6-pawn.",
            "fen": "7k/5p2/6P1/8/8/8/7Q/6K1 w - - 0 1",
            "solutionSans": [
              "Qh7#"
            ],
            "difficulty": 2
          },
          {
            "id": "ch-d-damiano-lolli-p2",
            "type": "chess_puzzle",
            "promptUk": "Мат Лоллі у 2: клин на f6, ферзь на h6 і g7.",
            "promptEn": "Lolli's mate in two: wedge on f6, queen to h6 and g7.",
            "fen": "6k1/5p1p/5P2/8/7Q/8/8/6K1 w - - 0 1",
            "solutionSans": [
              "Qh6",
              "Kh8",
              "Qg7#"
            ],
            "difficulty": 3
          },
          {
            "id": "ch-d-damiano-lolli-m1",
            "type": "mcq",
            "promptUk": "Де стоїть пішак-клин у маті Лоллі?",
            "promptEn": "Where does the wedge-pawn stand in Lolli's mate?",
            "options": [
              "на f6 (ферзь іде на h6 і g7)",
              "на g6 (це Даміано)",
              "на a2",
              "на e4"
            ],
            "correctIndex": 0,
            "explanationUk": "f6 — Лоллі, g6 — Даміано; не плутайте.",
            "explanationEn": "f6 is Lolli, g6 is Damiano; do not mix them up.",
            "optionsEn": [
              "on f6 (the queen goes to h6 and g7)",
              "on g6 (that is Damiano)",
              "on a2",
              "on e4"
            ]
          }
        ]
      },
      {
        "slug": "ch-d-pillsbury",
        "titleUk": "Мат Пілсбері",
        "titleEn": "Pillsbury's mate",
        "baseXp": 24,
        "difficulty": 4,
        "exercises": [
          {
            "id": "ch-d-pillsbury-l",
            "type": "chess_lesson",
            "promptUk": "Мат Пілсбері",
            "promptEn": "Pillsbury's mate",
            "fen": "5rk1/5p2/5B2/8/8/8/7R/6K1 w - - 0 1",
            "notesUk": "Мат Пілсбері — ще один малюнок тури і слона, названий на честь Гаррі Пілсбері. Слон стоїть на довгій діагоналі або на f6, відрізаючи короля і захищаючи ключові поля (часто h8 і g7), а тура дає мат з флангу — типове Rh8# при королі на g8 і турі чорних на f8, яка сама забирає втечу.\n\nНа діаграмі 1.Rh8#. Слон на f6 б'є h8 (діагональ f6–g7–h8; g7 порожнє), тому король не бере туру. Тура чорних на f8 і пішак f7 затискають свого короля. Біла тура з h2 вривається на h8 по відкритій лінії. Це елегантний фінал атаки, яку Пілсбері любив будувати зі слоном на f6.\n\nПорівняння: мат Морфі — тура на g8, слон захищає g8; Пілсбері — часто тура на h8, слон на f6 тримає діагональ до кута. Малюнки споріднені, але поле фінального шаха різне. На практиці слон на f6 — страшний клин: не пускайте його туди без потреби, або негайно оспорюйте.\n\nТипові помилки: Rh8, коли слон не б'є h8 (діагональ перекрита пішаком на g7); плутати з арабським матом, де замість слона працює кінь.",
            "notesEn": "Pillsbury’s mate is another rook-and-bishop picture, named after Harry Pillsbury. The bishop sits on the long diagonal or on f6, cutting the king and defending key squares (often h8 and g7), and the rook mates from the side — typically Rh8# with the king on g8 and a black rook on f8 that itself steals a flight.\n\nIn the diagram 1.Rh8#. The bishop on f6 attacks h8 (the diagonal f6–g7–h8; g7 is empty), so the king cannot take the rook. Black’s rook on f8 and the f7-pawn cramp their own king. The white rook from h2 crashes to h8 on the open file. It is an elegant finish of the kind of attack Pillsbury loved to build with a bishop on f6.\n\nA comparison: Morphy’s mate — rook on g8, bishop defends g8; Pillsbury — often rook on h8, bishop on f6 holding the diagonal to the corner. The pictures are related, but the square of the final check differs. In practice a bishop on f6 is a fearsome wedge: do not let it there without a reason, or challenge it at once.\n\nTypical mistakes: Rh8 when the bishop does not attack h8 (a pawn on g7 blocks the diagonal); confusing it with Arabian mate, where a knight does the bishop’s job.",
            "quiz": {
              "q": "Чому 1.Rh8# — мат (король не бере туру)?",
              "qEn": "Why is 1.Rh8# mate (the king does not take the rook)?",
              "options": [
                "слон на f6 захищає h8 по діагоналі",
                "пішак на h7 захищає туру",
                "кінь на f7",
                "тура незахищена, це не мат"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "the bishop on f6 defends h8 along the diagonal",
                "a pawn on h7 defends the rook",
                "a knight on f7",
                "the rook is undefended, it is not mate"
              ]
            }
          },
          {
            "id": "ch-d-pillsbury-p1",
            "type": "chess_puzzle",
            "promptUk": "Поставте мат Пілсбері турою на h8.",
            "promptEn": "Deliver Pillsbury's mate with the rook to h8.",
            "fen": "5rk1/5p2/5B2/8/8/8/7R/6K1 w - - 0 1",
            "solutionSans": [
              "Rh8#"
            ],
            "difficulty": 2
          },
          {
            "id": "ch-d-pillsbury-m1",
            "type": "mcq",
            "promptUk": "Де часто стоїть слон у маті Пілсбері?",
            "promptEn": "Where does the bishop often stand in Pillsbury's mate?",
            "options": [
              "на f6, тримаючи діагональ до h8",
              "на a1 без діагоналі",
              "на h1 за своїм королем",
              "на b8 за королем суперника"
            ],
            "correctIndex": 0,
            "explanationUk": "Клин на f6 — фірмовий знак цієї атаки.",
            "explanationEn": "The wedge on f6 is the hallmark of this attack.",
            "optionsEn": [
              "on f6, holding the diagonal to h8",
              "on a1 with no diagonal",
              "on h1 behind its own king",
              "on b8 behind the enemy king"
            ]
          },
          {
            "id": "ch-d-pillsbury-m2",
            "type": "mcq",
            "promptUk": "Чим мат Пілсбері відрізняється від мату Морфі?",
            "promptEn": "How does Pillsbury's mate differ from Morphy's mate?",
            "options": [
              "часто фінальний шах тури на h8, а не на g8; слон типово на f6",
              "різниці немає",
              "Пілсбері ставлять два коні",
              "Морфі ставлять лише пішаком"
            ],
            "correctIndex": 0,
            "explanationUk": "Споріднені малюнки тура+слон, різні поля фіналу.",
            "explanationEn": "Related rook-and-bishop pictures, different finishing squares.",
            "optionsEn": [
              "often the rook's final check is on h8, not g8; the bishop is typically on f6",
              "there is no difference",
              "Pillsbury's is given by two knights",
              "Morphy's is given only by a pawn"
            ]
          }
        ]
      },
      {
        "slug": "ch-d-mate-two",
        "titleUk": "Як розв'язувати мат у два ходи",
        "titleEn": "How to solve mate in two",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "ch-d-mate-two-l",
            "type": "chess_lesson",
            "promptUk": "Як розв'язувати мат у два ходи",
            "promptEn": "How to solve mate in two",
            "fen": "r5k1/5ppp/8/8/8/8/4QPPP/4R1K1 w - - 0 1",
            "notesUk": "Мат у два — найважливіша вправа на розрахунок: ви шукаєте форсований шлях із двох ваших ходів (і однієї відповіді суперника) до мату. Метод важливіший за конкретну позицію.\n\nКрок 1. Перегляньте всі шахи (CCT). Крок 2. Для кожного шаха перелічіть відповіді суперника — усі легальні, не «очевидну одну». Крок 3. На кожну відповідь знайдіть мат у наступний хід. Якщо хоч на одну відповіді мату немає, цей перший хід — не розв'язок. Крок 4. Якщо шахи не працюють, розгляньте тихий перший хід із невідворотною загрозою мату (дві загрози одразу — ідеально).\n\nНа діаграмі 1.Qe8+ — шах. Єдина відповідь 1…Rxe8 (пішаки забирають втечі, поле e8 порожнє, шлях ферзя вільний). Тоді 2.Rxe8# — мат. Це коридор у два ходи: жертва, єдине взяття, фінальний удар. Перевірка методом: інші відповіді на Qe8+ є? Kh7 закрите пішаком, Kf8 — під боєм ферзя. Лише Rxe8, і мат є. Розв'язок підтверджено.\n\nТипові помилки: розглянути лише одну відповідь; оголосити «мат у два», не перевіривши шаха в проміжку, який самі отримуєте; почати з тихого ходу, коли є форсований мат із шахом.",
            "notesEn": "Mate in two is the most important calculation drill: you look for a forced path of two of your moves (and one reply by the opponent) to mate. The method matters more than the exact position.\n\nStep 1. Look at every check (CCT). Step 2. For each check, list the opponent’s replies — every legal one, not “the obvious one”. Step 3. For each reply, find mate on the next move. If even one reply has no mate, that first move is not the solution. Step 4. If checks fail, consider a quiet first move with an unstoppable mate threat (two threats at once is ideal).\n\nIn the diagram 1.Qe8+ is a check. The only reply is 1…Rxe8 (pawns take the flights, e8 is empty, the queen’s path is clear). Then 2.Rxe8# is mate. This is a corridor in two moves: sacrifice, only capture, final blow. Checking by the method: are there other replies to Qe8+? Kh7 is blocked by a pawn, Kf8 is attacked by the queen. Only Rxe8, and mate exists. The solution is confirmed.\n\nTypical mistakes: considering only one reply; announcing “mate in two” without checking a check you yourself receive in between; starting with a quiet move when there is a forced mate with checks.",
            "quiz": {
              "q": "Що зробити, якщо на один із відповідей суперника після вашого шаха мату немає?",
              "qEn": "What do you do if, after your check, one of the opponent's replies has no mate?",
              "options": [
                "відкинути цей перший хід і брати наступного кандидата",
                "усе одно оголосити мат у два",
                "зупинити розрахунок",
                "здатися"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "reject that first move and take the next candidate",
                "announce mate in two anyway",
                "stop calculating",
                "resign"
              ]
            }
          },
          {
            "id": "ch-d-mate-two-p1",
            "type": "chess_puzzle",
            "promptUk": "Мат у 2 за методом: усі відповіді, потім фінальний удар.",
            "promptEn": "Mate in two by the method: every reply, then the final blow.",
            "fen": "r5k1/5ppp/8/8/8/8/4QPPP/4R1K1 w - - 0 1",
            "solutionSans": [
              "Qe8+",
              "Rxe8",
              "Rxe8#"
            ],
            "difficulty": 3
          },
          {
            "id": "ch-d-mate-two-p2",
            "type": "chess_puzzle",
            "promptUk": "Мат Лоллі у 2 — перевірте єдину відповідь короля.",
            "promptEn": "Lolli's mate in two — check the king's only reply.",
            "fen": "6k1/5p1p/5P2/8/7Q/8/8/6K1 w - - 0 1",
            "solutionSans": [
              "Qh6",
              "Kh8",
              "Qg7#"
            ],
            "difficulty": 3
          },
          {
            "id": "ch-d-mate-two-m1",
            "type": "mcq",
            "promptUk": "Правильний порядок пошуку мату в два:",
            "promptEn": "The right order when searching for mate in two:",
            "options": [
              "спочатку всі шахи і всі відповіді, потім тихі ходи з подвійною загрозою",
              "спочатку випадковий тихий хід",
              "лише взяття пішаків",
              "хід королем у кут"
            ],
            "correctIndex": 0,
            "explanationUk": "Форс спочатку, тиша — якщо форс не ставить мат.",
            "explanationEn": "Force first; quiet only if force does not mate.",
            "optionsEn": [
              "first every check and every reply, then quiet moves with a double threat",
              "first a random quiet move",
              "only pawn captures",
              "a king move to the corner"
            ]
          },
          {
            "id": "ch-d-mate-two-e",
            "type": "explain",
            "promptUk": "Опишіть метод розв'язання мату в два ходи.",
            "promptEn": "Describe the method for solving mate in two.",
            "keyIdeas": [
              {
                "labelUk": "Шахи",
                "labelEn": "Checks",
                "anyOf": [
                  "шах",
                  "check",
                  "CCT",
                  "усі відповід",
                  "every reply"
                ]
              },
              {
                "labelUk": "Перевірка",
                "labelEn": "Check",
                "anyOf": [
                  "кожна відповід",
                  "each reply",
                  "немає мату",
                  "no mate",
                  "відкинут",
                  "reject"
                ]
              },
              {
                "labelUk": "Тихий",
                "labelEn": "Quiet",
                "anyOf": [
                  "тих",
                  "quiet",
                  "загроз",
                  "threat"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Спочатку переглядаємо всі шахи і на кожний — усі відповіді суперника; якщо хоч на одну мату немає, перший хід відкидаємо. Якщо шахи не працюють, шукаємо тихий хід із невідворотною загрозою.",
            "sampleAnswerEn": "First we look at every check and, for each, every reply by the opponent; if even one reply has no mate, we reject that first move. If checks fail, we look for a quiet move with an unstoppable threat."
          }
        ]
      },
      {
        "slug": "ch-deep-mates-attack-exam",
        "titleUk": "Іспит: мати в атаці на короля",
        "titleEn": "Exam: mates in the king attack",
        "baseXp": 30,
        "difficulty": 4,
        "isExam": true,
        "passThreshold": 0.7,
        "exercises": [
          {
            "id": "ch-deep-mates-attack-exam-q1",
            "type": "mcq",
            "promptUk": "Фінал Опери Морфі — це:",
            "promptEn": "The finish of Morphy's Opera Game is:",
            "options": [
              "Qb8+ Nxb8 Rd8# — коридорний мат",
              "спертий мат конем",
              "мат Бодена двома слонами",
              "пат"
            ],
            "correctIndex": 0,
            "explanationUk": "Жертва ферзя відволікає коня, тура матує.",
            "explanationEn": "The queen sacrifice deflects the knight, the rook mates.",
            "optionsEn": [
              "Qb8+ Nxb8 Rd8# — corridor mate",
              "smothered mate by a knight",
              "Boden's mate with two bishops",
              "stalemate"
            ]
          },
          {
            "id": "ch-deep-mates-attack-exam-q2",
            "type": "mcq",
            "promptUk": "Пішак-клин на g6 і ферзь на h7 — це мат:",
            "promptEn": "A wedge-pawn on g6 and a queen on h7 is:",
            "options": [
              "Даміано",
              "Лоллі (клин на f6)",
              "Арабський",
              "Легаля"
            ],
            "correctIndex": 0,
            "explanationUk": "g6 — Даміано; f6 — Лоллі.",
            "explanationEn": "g6 is Damiano; f6 is Lolli.",
            "optionsEn": [
              "Damiano's",
              "Lolli's (wedge on f6)",
              "Arabian",
              "Legall's"
            ]
          },
          {
            "id": "ch-deep-mates-attack-exam-q3",
            "type": "mcq",
            "promptUk": "Шукаючи мат у два, після кожного шаха треба:",
            "promptEn": "When looking for mate in two, after every check you must:",
            "options": [
              "перелічити всі легальні відповіді й на кожну знайти мат",
              "розглянути лише одну відповідь",
              "зупинитись",
              "ходити навмання"
            ],
            "correctIndex": 0,
            "explanationUk": "Одна неперевірена відповідь руйнує розв'язок.",
            "explanationEn": "One unchecked reply wrecks the solution.",
            "optionsEn": [
              "list every legal reply and find mate against each",
              "consider only one reply",
              "stop",
              "move at random"
            ]
          },
          {
            "id": "ch-deep-mates-attack-exam-p4",
            "type": "chess_puzzle",
            "promptUk": "Фінал Опери: мат у 2.",
            "promptEn": "The Opera finish: mate in two.",
            "fen": "4kb1r/p2n1ppp/4q3/4p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 0 16",
            "solutionSans": [
              "Qb8+",
              "Nxb8",
              "Rd8#"
            ],
            "difficulty": 3
          },
          {
            "id": "ch-deep-mates-attack-exam-p5",
            "type": "chess_puzzle",
            "promptUk": "Мат Морфі у 1.",
            "promptEn": "Morphy's mate in one.",
            "fen": "7k/7p/4B3/8/8/8/8/6RK w - - 0 1",
            "solutionSans": [
              "Rg8#"
            ],
            "difficulty": 2
          }
        ]
      }
    ]
  },
  {
    "slug": "ch-deep-tactics-mix",
    "titleUk": "Мікс мотивів",
    "titleEn": "Mixed motifs and practical tactics",
    "lessons": [
      {
        "slug": "ch-d-mix-fork-pin",
        "titleUk": "Мікс: вилка і зв'язка",
        "titleEn": "Mix: fork and pin",
        "baseXp": 24,
        "difficulty": 4,
        "exercises": [
          {
            "id": "ch-d-mix-fork-pin-l",
            "type": "chess_lesson",
            "promptUk": "Мікс: вилка і зв'язка",
            "promptEn": "Mix: fork and pin",
            "fen": "r3k2r/ppp2ppp/8/3N4/8/8/PPP2PPP/R3K2R w KQkq - 0 1",
            "notesUk": "У практичній партії мотиви рідко приходять «по одному з підручника». Вилка часто працює саме тому, що одна з цілей зв'язана і не може взяти коня; зв'язка часто готує вилку. Цей урок — свіжі позиції, не копії ранніх задач на вилку чи зв'язку.\n\nНа діаграмі кінь на d5: 1.Nc7+ — сімейна вилка (family fork): шах королю і одночасний удар по обох турах a8 і e8 (точніше, по a8 і по королівській, залежно від розташування). Король відходить — одна тура падає. Це вже відомий мотив, але в новій постановці з правами рокіровки, які король утратить, щойно відійде.\n\nДруга позиція з'єднує вилку зі зв'язкою: коли пішак або фігура зв'язані й не можуть взяти коня, вилка стає «безоплатною». Завжди питайте: «чи може ця фігура взяти мою? якщо ні — чому? чи не зв'язана?»\n\nТипові помилки: поставити вилку, яку зв'язана фігура все ж бере, бо зв'язка відносна (король не на лінії); рахувати вилку, не помітивши, що одна «ціль» захищена й відійде з темпом.",
            "notesEn": "In a practical game motifs rarely arrive “one at a time from the textbook”. A fork often works precisely because one of the targets is pinned and cannot take the knight; a pin often prepares a fork. This lesson uses fresh positions, not copies of earlier fork or pin puzzles.\n\nIn the diagram the knight is on d5: 1.Nc7+ is a family fork: check to the king and a simultaneous attack on both rooks (a8 and the other, depending on the placement). The king steps away — one rook falls. The motif is known, but the setting is new, with castling rights the king will lose the moment he moves.\n\nA second picture joins fork and pin: when a pawn or piece is pinned and cannot take the knight, the fork becomes “free”. Always ask: “can this piece take mine? if not — why? is it pinned?”\n\nTypical mistakes: playing a fork that the pinned piece still takes, because the pin is only relative (the king is not on the line); counting a fork without noticing that one “target” is defended and will move with tempo.",
            "quiz": {
              "q": "Що таке сімейна вилка Nc7+ у цій позиції?",
              "qEn": "What is the family fork Nc7+ in this position?",
              "options": [
                "шах королю і удар по турах одночасно",
                "тихий хід без шаха",
                "рокіровка",
                "пат"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "check to the king and an attack on the rooks at the same time",
                "a quiet move without check",
                "castling",
                "stalemate"
              ]
            }
          },
          {
            "id": "ch-d-mix-fork-pin-p1",
            "type": "chess_puzzle",
            "promptUk": "Сімейна вилка: шах конем, що б'є обидві тури.",
            "promptEn": "Family fork: a knight check that attacks both rooks.",
            "fen": "r3k2r/ppp2ppp/8/3N4/8/8/PPP2PPP/R3K2R w KQkq - 0 1",
            "solutionSans": [
              "Nc7+"
            ],
            "difficulty": 3
          },
          {
            "id": "ch-d-mix-fork-pin-m1",
            "type": "mcq",
            "promptUk": "Чому зв'язка часто підсилює вилку?",
            "promptEn": "Why does a pin often strengthen a fork?",
            "options": [
              "зв'язана фігура не може взяти коня, що ставить вилку",
              "зв'язка забороняє шахи",
              "вилка тоді нелегальна",
              "це зменшує ціну коня"
            ],
            "correctIndex": 0,
            "explanationUk": "Спочатку перевірте, чи «жертва» вилки взагалі може бити.",
            "explanationEn": "First check whether the fork's “victim” can even capture.",
            "optionsEn": [
              "the pinned piece cannot take the forking knight",
              "a pin forbids checks",
              "the fork then becomes illegal",
              "it lowers the knight's value"
            ]
          },
          {
            "id": "ch-d-mix-fork-pin-m2",
            "type": "mcq",
            "promptUk": "Відносна зв'язка — це коли:",
            "promptEn": "A relative pin is when:",
            "options": [
              "за зв'язаною фігурою стоїть не король, а цінна фігура; теоретично піти можна",
              "король стоїть за фігурою: піти нелегально",
              "фігура взагалі не може ходити за правилами коня",
              "зв'язки не буває"
            ],
            "correctIndex": 0,
            "explanationUk": "Відносну зв'язку інколи можна порушити з темпом — рахуйте.",
            "explanationEn": "A relative pin can sometimes be broken with tempo — calculate.",
            "optionsEn": [
              "it is not the king behind the pinned piece but a valuable piece; moving is legal in principle",
              "the king stands behind the piece: moving is illegal",
              "the piece cannot move at all, by the knight's rules",
              "there is no such thing as a pin"
            ]
          }
        ]
      },
      {
        "slug": "ch-d-mix-disc",
        "titleUk": "Мікс: відкритий напад",
        "titleEn": "Mix: discovered attack",
        "baseXp": 24,
        "difficulty": 4,
        "exercises": [
          {
            "id": "ch-d-mix-disc-l",
            "type": "chess_lesson",
            "promptUk": "Мікс: відкритий напад",
            "promptEn": "Mix: discovered attack",
            "fen": "q3k3/5ppp/4N3/8/8/8/4QPPP/6K1 w - - 0 1",
            "notesUk": "Відкритий напад (discovered attack) — ви відводите одну фігуру, і за нею «відкривається» удар іншої по тій самій лінії. Якщо відвід ще й шахує, виходить відкритий шах; якщо шахують обидві — подвійний шах, і король мусить тікати (закритись однією фігурою неможливо).\n\nНа діаграмі ферзь білих стоїть на e2, кінь на e6, король чорних на e8: все на лінії e. 1.Nc7+ відводить коня з шахом (кінь б'є короля з c7) і водночас відкриває ферзя по вертикалі e — подвійний шах. Король змушений рухатись (Kf8 або Kd7), і тоді кінь забирає ферзя на a8. Відкритий напад виграв ферзя, бо відповідь на подвійний шах вузька.\n\nШукайте «батарею»: ферзь або тура за своїм конем чи слоном на одній лінії з ціллю. Відведіть передню фігуру на корисне поле (шах, вилка), і задня спрацює сама.\n\nТипові помилки: відкрити лінію і не помітити, що суперник сам дає відкритий шах у відповідь; «подвійний шах», який насправді одинарний (одна з фігур не шахує).",
            "notesEn": "A discovered attack is moving one piece aside so that another, behind it, “opens” an attack on the same line. If the moving piece also checks, it is a discovered check; if both check, it is a double check, and the king must flee (one piece cannot block two checks).\n\nIn the diagram White’s queen stands on e2, the knight on e6, Black’s king on e8: all on the e-file. 1.Nc7+ moves the knight with check (the knight attacks the king from c7) and at the same time opens the queen on the e-file — a double check. The king must move (Kf8 or Kd7), and then the knight takes the queen on a8. The discovered attack has won the queen, because the reply to a double check is narrow.\n\nLook for a “battery”: a queen or rook behind your knight or bishop on one line with the target. Move the front piece to a useful square (a check, a fork), and the rear one works by itself.\n\nTypical mistakes: opening a line and missing that the opponent gives a discovered check in reply; a “double check” that is in fact a single (one of the pieces does not check).",
            "quiz": {
              "q": "Чому 1.Nc7+ тут особливо сильний?",
              "qEn": "Why is 1.Nc7+ especially strong here?",
              "options": [
                "це подвійний шах (кінь і відкритий ферзь), після відходу короля падає ферзь на a8",
                "це тихий хід без шаха",
                "це пат",
                "кінь бере ферзя вже цим ходом"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "it is a double check (knight and a discovered queen); after the king moves, the queen on a8 falls",
                "it is a quiet move without check",
                "it is stalemate",
                "the knight takes the queen on this very move"
              ]
            }
          },
          {
            "id": "ch-d-mix-disc-p1",
            "type": "chess_puzzle",
            "promptUk": "Подвійний шах і виграш ферзя (король іде на f8).",
            "promptEn": "Double check and winning the queen (the king goes to f8).",
            "fen": "q3k3/5ppp/4N3/8/8/8/4QPPP/6K1 w - - 0 1",
            "solutionSans": [
              "Nc7+",
              "Kf8",
              "Nxa8"
            ],
            "difficulty": 3
          },
          {
            "id": "ch-d-mix-disc-p2",
            "type": "chess_puzzle",
            "promptUk": "Та сама ідея, якщо король іде на d7.",
            "promptEn": "The same idea if the king goes to d7.",
            "fen": "q3k3/5ppp/4N3/8/8/8/4QPPP/6K1 w - - 0 1",
            "solutionSans": [
              "Nc7+",
              "Kd7",
              "Nxa8"
            ],
            "difficulty": 3
          },
          {
            "id": "ch-d-mix-disc-m1",
            "type": "mcq",
            "promptUk": "Чому на подвійний шах не можна закритись фігурою?",
            "promptEn": "Why can you not block a double check with a piece?",
            "options": [
              "шахують дві фігури з різних ліній: одна перепона не закриє обидві",
              "правила забороняють ходити фігурами",
              "подвійний шах нелегальний",
              "можна, якщо сказати «поправляю»"
            ],
            "correctIndex": 0,
            "explanationUk": "Лише відхід короля (або взяття однієї з фігур, якщо воно знімає обидва шахи — рідкість).",
            "explanationEn": "Only a king move (or a capture that happens to stop both checks — rare).",
            "optionsEn": [
              "two pieces check from different lines: one block cannot stop both",
              "the rules forbid moving pieces",
              "double check is illegal",
              "you can, if you say “I adjust”"
            ]
          }
        ]
      },
      {
        "slug": "ch-d-mix-back",
        "titleUk": "Мікс: остання горизонталь",
        "titleEn": "Mix: the back rank",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "ch-d-mix-back-l",
            "type": "chess_lesson",
            "promptUk": "Мікс: остання горизонталь",
            "promptEn": "Mix: the back rank",
            "fen": "2r3k1/5ppp/8/8/8/8/4QPPP/4R1K1 w - - 0 1",
            "notesUk": "Мат на останній горизонталі ви вже бачили. Тут — свіжі постановки і поєднання з відволіканням: захисник восьмої горизонталі відволікається жертвою, друга важка фігура входить із матом. Повторювати старі FENи ми не будемо.\n\nНа діаграмі 1.Qe8+ відволікає туру з c8. Після 1…Rxe8 тура вже не захищає восьму «по-своєму» — її забрали на e8, і 2.Rxe8# мат. Пішаки f7–g7–h7 тримають свого короля в коридорі, luft немає. Це той самий клас ідей, що й Опера, але інша позиція: тура була на c8, не на a8, ферзь ішов з e2.\n\nПрактичні звички: (1) завжди майте luft, якщо суперник має важку фігуру на відкритій лінії; (2) перш ніж узяти «вільну» фігуру на восьмій, перевірте мат у відповідь; (3) подвоюйте тури на відкритій вертикалі — рентген проти восьмої горизонталі страшний.\n\nТипові помилки: «мат на останній», коли в короля вже є luft на h7; жертва на e8, яку беруть королем, а не турою, і мату немає.",
            "notesEn": "You have already seen back-rank mate. Here are fresh settings and a mix with deflection: the defender of the eighth is decoyed by a sacrifice, and a second heavy piece enters with mate. We will not repeat old FENs.\n\nIn the diagram 1.Qe8+ deflects the rook from c8. After 1…Rxe8 the rook no longer defends the eighth in its own way — it has been pulled to e8, and 2.Rxe8# is mate. The pawns f7–g7–h7 keep their king in the corridor; there is no luft. It is the same class of idea as the Opera, but a different position: the rook was on c8, not a8, and the queen came from e2.\n\nPractical habits: (1) always have luft if the opponent has a heavy piece on an open file; (2) before taking a “free” piece on the eighth, check mate in reply; (3) double rooks on an open file — an x-ray against the back rank is fearsome.\n\nTypical mistakes: “back-rank mate” when the king already has luft on h7; a sacrifice on e8 that the king takes, not the rook, and there is no mate.",
            "quiz": {
              "q": "Чому 1.Qe8+ Rxe8 2.Rxe8# тут проходить?",
              "qEn": "Why does 1.Qe8+ Rxe8 2.Rxe8# work here?",
              "options": [
                "немає luft, тура-захисник відволікається, друга тура матує",
                "король може піти на h7",
                "чорні рокіруються",
                "це пат"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "there is no luft, the defending rook is deflected, the second rook mates",
                "the king can go to h7",
                "Black can castle",
                "it is stalemate"
              ]
            }
          },
          {
            "id": "ch-d-mix-back-p1",
            "type": "chess_puzzle",
            "promptUk": "Відволічіть туру з c8 і поставте мат на останній горизонталі.",
            "promptEn": "Deflect the rook from c8 and mate on the back rank.",
            "fen": "2r3k1/5ppp/8/8/8/8/4QPPP/4R1K1 w - - 0 1",
            "solutionSans": [
              "Qe8+",
              "Rxe8",
              "Rxe8#"
            ],
            "difficulty": 3
          },
          {
            "id": "ch-d-mix-back-p2",
            "type": "chess_puzzle",
            "promptUk": "Інша постановка: тура чорних на d8.",
            "promptEn": "Another setting: Black's rook on d8.",
            "fen": "3r2k1/5ppp/8/8/8/8/4QPPP/4R1K1 w - - 0 1",
            "solutionSans": [
              "Qe8+",
              "Rxe8",
              "Rxe8#"
            ],
            "difficulty": 3
          },
          {
            "id": "ch-d-mix-back-m1",
            "type": "mcq",
            "promptUk": "Найпростіший профілактичний засіб проти мату на останній горизонталі:",
            "promptEn": "The simplest prophylactic against back-rank mate:",
            "options": [
              "зробити luft (h3, g3, h6, g6), коли є час",
              "віддати всіх пішаків",
              "ніколи не ставити тури на першу горизонталь",
              "завжди тримати короля на e4"
            ],
            "correctIndex": 0,
            "explanationUk": "Краще рано, ніж у цейтноті після жертви суперника.",
            "explanationEn": "Better early than in time trouble after the opponent's sacrifice.",
            "optionsEn": [
              "make luft (h3, g3, h6, g6) when you have time",
              "give away all the pawns",
              "never put rooks on the first rank",
              "always keep the king on e4"
            ]
          }
        ]
      },
      {
        "slug": "ch-d-mix-zwischen",
        "titleUk": "Мікс: проміжний хід",
        "titleEn": "Mix: zwischenzug",
        "baseXp": 24,
        "difficulty": 4,
        "exercises": [
          {
            "id": "ch-d-mix-zwischen-l",
            "type": "chess_lesson",
            "promptUk": "Мікс: проміжний хід",
            "promptEn": "Mix: zwischenzug",
            "fen": "4r1k1/5pp1/7p/3q4/3Q4/8/5PPP/4R1K1 w - - 0 1",
            "notesUk": "Zwischenzug (проміжний хід) — замість очевидного взяття або відступу ви вставляєте інший форсований хід (шах, загроза мату), і лише потім робите «очевидне». Суперник уже не встигає здійснити свою загрозу.\n\nНа діаграмі ферзі напали один на одного, і тура чорних цілиться в e1. «Очевидне» 1.Qxd5 програє: 1…Rxe1# — мат на останній горизонталі (luft на h6 є в пішаків, але перша горизонталь білих гола, пішаки f2–g2–h2 не дають королю виходу). Правильно: спочатку 1.Rxe8+ (проміжний шах і взяття тури), 1…Kh7, і лише тоді 2.Qxd5 — ферзь уже ваш, мату немає.\n\nЦе поєднання CCT, мату на останній горизонталі і «спочатку форс». Нова постановка: в чорних уже є h6 (ніби luft), але це не рятує білих після Qxd5, бо мат ставлять на їхній першій горизонталі.\n\nТипові помилки: автоматичне взяття ферзя; проміжний хід, який не форсує (суперник ігнорує його і ставить мат). Проміжний хід має бути з шахом або невідворотною загрозою.",
            "notesEn": "A zwischenzug (in-between move) is inserting another forcing move (a check, a mate threat) instead of the obvious capture or retreat, and only then doing the “obvious” thing. The opponent no longer has time for their threat.\n\nIn the diagram the queens attack each other, and Black’s rook eyes e1. The “obvious” 1.Qxd5 loses: 1…Rxe1# is back-rank mate (there is a pawn on h6 for luft, but White’s first rank is bare, and the pawns f2–g2–h2 give the king no exit). The right way: first 1.Rxe8+ (an in-between check and winning a rook), 1…Kh7, and only then 2.Qxd5 — the queen is yours, and there is no mate.\n\nThis combines CCT, back-rank mate, and “force first”. The setting is new: Black already has h6 (as if luft), but that does not save White after Qxd5, because the mate is on White’s first rank.\n\nTypical mistakes: automatically taking the queen; an in-between move that does not force (the opponent ignores it and mates). A zwischenzug must come with check or an unstoppable threat.",
            "quiz": {
              "q": "Чому 1.Qxd5 тут програє, а 1.Rxe8+ виграє?",
              "qEn": "Why does 1.Qxd5 lose here, while 1.Rxe8+ wins?",
              "options": [
                "після Qxd5 є Rxe1#; проміжний шах спочатку знімає туру, потім ферзя забирають уже безпечно",
                "Qxd5 — мат у 1",
                "Rxe8+ нелегальний",
                "обидва ходи однаково нічийні"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "after Qxd5 there is Rxe1#; the in-between check first removes the rook, then the queen is taken safely",
                "Qxd5 is mate in one",
                "Rxe8+ is illegal",
                "both moves are equal draws"
              ]
            }
          },
          {
            "id": "ch-d-mix-zwischen-p1",
            "type": "chess_puzzle",
            "promptUk": "Проміжний шах, потім заберіть ферзя.",
            "promptEn": "An in-between check, then take the queen.",
            "fen": "4r1k1/5pp1/7p/3q4/3Q4/8/5PPP/4R1K1 w - - 0 1",
            "solutionSans": [
              "Rxe8+",
              "Kh7",
              "Qxd5"
            ],
            "difficulty": 3
          },
          {
            "id": "ch-d-mix-zwischen-m1",
            "type": "mcq",
            "promptUk": "Zwischenzug має бути:",
            "promptEn": "A zwischenzug must be:",
            "options": [
              "форсованим: шах або невідворотна загроза",
              "завжди тихим ходом пішака на крайній лінії",
              "записом на бланку",
              "ходом без ідеї"
            ],
            "correctIndex": 0,
            "explanationUk": "Інакше суперник його ігнорує і здійснює свою загрозу.",
            "explanationEn": "Otherwise the opponent ignores it and carries out their threat.",
            "optionsEn": [
              "forcing: a check or an unstoppable threat",
              "always a quiet wing-pawn move",
              "a note on the scoresheet",
              "a move with no idea"
            ]
          },
          {
            "id": "ch-d-mix-zwischen-m2",
            "type": "mcq",
            "promptUk": "Перед «очевидним» взяттям запитайте:",
            "promptEn": "Before an “obvious” capture, ask:",
            "options": [
              "що він відповість із шахом або матом?",
              "який колір слона?",
              "чи час обіду?",
              "чи можна здатися?"
            ],
            "correctIndex": 0,
            "explanationUk": "Це те саме питання, що в уроці «спочатку форс».",
            "explanationEn": "It is the same question as in the “force first” lesson.",
            "optionsEn": [
              "what does he reply with, by check or mate?",
              "what colour is the bishop?",
              "is it lunchtime?",
              "may I resign?"
            ]
          },
          {
            "id": "ch-d-mix-zwischen-e",
            "type": "explain",
            "promptUk": "Що таке проміжний хід і коли його вставляти?",
            "promptEn": "What is a zwischenzug, and when do you insert one?",
            "keyIdeas": [
              {
                "labelUk": "Проміжний",
                "labelEn": "In-between",
                "anyOf": [
                  "проміжн",
                  "zwischen",
                  "встав",
                  "insert",
                  "замість",
                  "instead"
                ]
              },
              {
                "labelUk": "Форс",
                "labelEn": "Force",
                "anyOf": [
                  "шах",
                  "check",
                  "форсован",
                  "forcing"
                ]
              },
              {
                "labelUk": "Очевидне",
                "labelEn": "Obvious",
                "anyOf": [
                  "очевидн",
                  "obvious",
                  "взятт",
                  "capture",
                  "мат",
                  "mate"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Zwischenzug — проміжний форсований хід (шах), вставлений замість очевидного взяття. Його вставляють, коли «очевидне» Qxd5 ловить мат у відповідь; спочатку знімаємо загрозу, потім беремо ферзя.",
            "sampleAnswerEn": "A zwischenzug is a forcing in-between move (a check) inserted instead of the obvious capture. You insert it when the “obvious” Qxd5 walks into mate; first you remove the threat, then you take the queen."
          }
        ]
      },
      {
        "slug": "ch-d-mix-exam-prep",
        "titleUk": "Практичний мікс і підготовка до іспиту",
        "titleEn": "A practical mix and exam preparation",
        "baseXp": 24,
        "difficulty": 4,
        "exercises": [
          {
            "id": "ch-d-mix-exam-prep-l",
            "type": "chess_lesson",
            "promptUk": "Практичний мікс і підготовка до іспиту",
            "promptEn": "A practical mix and exam preparation",
            "fen": "6k1/5ppp/8/8/4N3/8/4QPPP/6K1 w - - 0 1",
            "notesUk": "Останній урок частини про тактику збирає метод, а не новий мотив. У незнайомій позиції порядок такий: (1) чи є мат у 1? (2) чи є форсований мат у 2 — усі шахи, усі відповіді? (3) CCT: шахи, взяття, загрози, потім тихі ходи; (4) назвіть мотив — вилка, зв'язка, зняття захисту, розчищення, рентген, заманювання, перевантаження, проміжний хід, матний малюнок; (5) дорахуйте обидві гілки (взяв / не взяв).\n\nНа діаграмі повторюємо розчищення: 1.Nf6+ і 2.Qe8#. Якщо ви впізнали мотив за 10 секунд — метод працює. На іспиті будуть свіжі, але споріднені позиції: не зубріть FEN, впізнавайте малюнок.\n\nКороткий чек-лист перед ходом у партії: «чи не висне моя остання горизонталь? чи не висить фігура? чи є шах, який я не розглянув?». Це дешевше, ніж блискучий розрахунок після зева.\n\nТипові помилки на іспиті: побачити знайомий мотив і не перевірити, що в цій постановці він справді проходить (зайвий захисник, luft, інша черга).",
            "notesEn": "This last lesson of the tactics part gathers a method, not a new motif. In an unfamiliar position the order is: (1) is there mate in one? (2) is there forced mate in two — every check, every reply? (3) CCT: checks, captures, threats, then quiet moves; (4) name the motif — fork, pin, removing a defender, clearance, x-ray, decoy, overload, zwischenzug, a mating pattern; (5) calculate both branches (took / did not take).\n\nThe diagram revisits clearance: 1.Nf6+ and 2.Qe8#. If you recognised the motif in 10 seconds, the method works. The exam will have fresh but related positions: do not memorise FENs, recognise the picture.\n\nA short checklist before a move in a game: “is my back rank hanging? is a piece loose? is there a check I have not looked at?”. That is cheaper than brilliant calculation after a blunder.\n\nTypical exam mistakes: seeing a familiar motif and not checking that it actually works in this setting (an extra defender, luft, the other side to move).",
            "quiz": {
              "q": "Перше запитання в незнайомій тактичній позиції:",
              "qEn": "The first question in an unfamiliar tactical position:",
              "options": [
                "чи є мат у 1, потім мат у 2 з перевіркою всіх відповідей",
                "який дебют це був на 1.ході",
                "скільки часу до обіду",
                "чи можна здатися"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "is there mate in one, then mate in two with every reply checked",
                "which opening this was on move 1",
                "how long until lunch",
                "may I resign"
              ]
            }
          },
          {
            "id": "ch-d-mix-exam-prep-p1",
            "type": "chess_puzzle",
            "promptUk": "Впізнайте мотив і поставте мат у 2 (розчищення).",
            "promptEn": "Recognise the motif and mate in two (clearance).",
            "fen": "6k1/5ppp/8/8/4N3/8/4QPPP/6K1 w - - 0 1",
            "solutionSans": [
              "Nf6+",
              "Kh8",
              "Qe8#"
            ],
            "difficulty": 3
          },
          {
            "id": "ch-d-mix-exam-prep-p2",
            "type": "chess_puzzle",
            "promptUk": "Впізнайте мотив: арабський мат.",
            "promptEn": "Recognise the motif: Arabian mate.",
            "fen": "7k/8/5N2/8/8/8/7R/6K1 w - - 0 1",
            "solutionSans": [
              "Rh7#"
            ],
            "difficulty": 2
          },
          {
            "id": "ch-d-mix-exam-prep-m1",
            "type": "mcq",
            "promptUk": "Короткий чек-лист перед ходом не містить:",
            "promptEn": "The short pre-move checklist does not include:",
            "options": [
              "назву дебюту на латинській мові",
              "чи не висне остання горизонталь",
              "чи не висить фігура",
              "чи є нерозглянутий шах"
            ],
            "correctIndex": 0,
            "explanationUk": "Спочатку безпека позиції, потім теорія дебюту.",
            "explanationEn": "Safety of the position first, opening theory later.",
            "optionsEn": [
              "the opening's name in Latin",
              "whether the back rank is hanging",
              "whether a piece is loose",
              "whether there is a check you have not looked at"
            ]
          },
          {
            "id": "ch-d-mix-exam-prep-e",
            "type": "explain",
            "promptUk": "Який порядок дій у незнайомій тактичній позиції?",
            "promptEn": "What is the order of work in an unfamiliar tactical position?",
            "keyIdeas": [
              {
                "labelUk": "Мат",
                "labelEn": "Mate",
                "anyOf": [
                  "мат у 1",
                  "mate in one",
                  "мат у 2",
                  "mate in two"
                ]
              },
              {
                "labelUk": "CCT",
                "labelEn": "CCT",
                "anyOf": [
                  "шах",
                  "check",
                  "CCT",
                  "взятт",
                  "capture"
                ]
              },
              {
                "labelUk": "Мотив",
                "labelEn": "Motif",
                "anyOf": [
                  "мотив",
                  "motif",
                  "гілк",
                  "branch",
                  "впізна",
                  "recogn"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Спочатку мат у 1 і мат у 2 з перевіркою всіх відповідей, потім CCT, потім назва мотиву і розрахунок обох гілок. Впізнаємо малюнок, а не зубрімо FEN.",
            "sampleAnswerEn": "First mate in one and mate in two with every reply checked, then CCT, then the name of the motif and calculation of both branches. We recognise the picture, we do not memorise the FEN."
          }
        ]
      },
      {
        "slug": "ch-deep-tactics-mix-exam",
        "titleUk": "Іспит: мікс мотивів",
        "titleEn": "Exam: mixed motifs",
        "baseXp": 30,
        "difficulty": 4,
        "isExam": true,
        "passThreshold": 0.7,
        "exercises": [
          {
            "id": "ch-deep-tactics-mix-exam-q1",
            "type": "mcq",
            "promptUk": "Подвійний шах змушує:",
            "promptEn": "A double check forces:",
            "options": [
              "короля рухатись (або рідкісне взяття, що знімає обидва шахи)",
              "закритись будь-якою фігурою",
              "рокіруватись",
              "здатися"
            ],
            "correctIndex": 0,
            "explanationUk": "Одна перепона не закриє дві лінії шаха.",
            "explanationEn": "One block cannot close two checking lines.",
            "optionsEn": [
              "the king to move (or a rare capture that stops both checks)",
              "blocking with any piece",
              "castling",
              "resigning"
            ]
          },
          {
            "id": "ch-deep-tactics-mix-exam-q2",
            "type": "mcq",
            "promptUk": "Zwischenzug — це:",
            "promptEn": "A zwischenzug is:",
            "options": [
              "проміжний форсований хід замість очевидного взяття",
              "тихий хід без ідеї",
              "завжди підпромоція",
              "запис результату"
            ],
            "correctIndex": 0,
            "explanationUk": "Спочатку шах, що знімає загрозу, потім «очевидне».",
            "explanationEn": "First the check that removes the threat, then the “obvious” move.",
            "optionsEn": [
              "a forcing in-between move instead of the obvious capture",
              "a quiet move with no idea",
              "always an underpromotion",
              "writing down the result"
            ]
          },
          {
            "id": "ch-deep-tactics-mix-exam-q3",
            "type": "mcq",
            "promptUk": "Сімейна вилка коня типово б'є:",
            "promptEn": "A knight family fork typically attacks:",
            "options": [
              "короля і обидві тури (або короля, ферзя і туру)",
              "лише два пішаки на крайній лінії",
              "свого короля",
              "порожні поля без фігур"
            ],
            "correctIndex": 0,
            "explanationUk": "Король і дві важкі фігури — класика Nc7+ / Nf7+ / Nd6+.",
            "explanationEn": "The king and two heavy pieces — the classic Nc7+ / Nf7+ / Nd6+.",
            "optionsEn": [
              "the king and both rooks (or the king, queen and a rook)",
              "only two wing pawns",
              "your own king",
              "empty squares with no pieces"
            ]
          },
          {
            "id": "ch-deep-tactics-mix-exam-p4",
            "type": "chess_puzzle",
            "promptUk": "Проміжний шах, потім ферзь.",
            "promptEn": "In-between check, then the queen.",
            "fen": "4r1k1/5pp1/7p/3q4/3Q4/8/5PPP/4R1K1 w - - 0 1",
            "solutionSans": [
              "Rxe8+",
              "Kh7",
              "Qxd5"
            ],
            "difficulty": 3
          },
          {
            "id": "ch-deep-tactics-mix-exam-p5",
            "type": "chess_puzzle",
            "promptUk": "Відкритий подвійний шах і ферзь на a8 (король на f8).",
            "promptEn": "A discovered double check and the queen on a8 (king to f8).",
            "fen": "q3k3/5ppp/4N3/8/8/8/4QPPP/6K1 w - - 0 1",
            "solutionSans": [
              "Nc7+",
              "Kf8",
              "Nxa8"
            ],
            "difficulty": 3
          }
        ]
      }
    ]
  },
  {
    "slug": "ch-deep-italian-ruy",
    "titleUk": "Італійська і Іспанська",
    "titleEn": "Italian and Ruy Lopez",
    "lessons": [
      {
        "slug": "ch-d-giuoco",
        "titleUk": "Джоко-п'яно: ідея, а не 15 ходів",
        "titleEn": "Giuoco Piano: the idea, not 15 moves",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "ch-d-giuoco-l",
            "type": "chess_lesson",
            "promptUk": "Джоко-п'яно: ідея, а не 15 ходів",
            "promptEn": "Giuoco Piano: the idea, not 15 moves",
            "fen": "r1bq1rk1/bpp2ppp/p1np1n2/4p3/4P3/1BPP1N1P/PP1N1PP1/R1BQ1RK1 b - - 0 9",
            "notesUk": "Італійська партія починається 1.e4 e5 2.Nf3 Nc6 3.Bc4, і Джоко-п'яно — відповідь 3…Bc5. Сучасний «тихий» варіант (Giuoco Pianissimo) ставить пішаків на c3 і d3, а не одразу кидається в d4. На діаграмі типова структура після 4.c3 Nf6 5.d3 d6 6.O-O O-O 7.Nbd2 a6 8.Bb3 Ba7 9.h3: слон білих на b3 дивиться на f7, кінь d2 готує маршрут f1–g3, пішак h3 забирає клітинку g4 у слона й коня чорних.\n\nПлан білих: підготувати d4 (іноді після Re1), перевести коня Nbd2–f1–g3, інколи a4, і тримати пару слонів. Якщо центр відкриється, слон c4/b3 стає дуже сильним. План чорних: …a6 і …Ba7 (слон не потрапляє під d4), …Ne7–g6 або …Be6, і вчасно …d5.\n\nТипове розміщення: білі — Bb3, Nf3, Nbd2–f1–g3, Re1, Be3; чорні — Ba7, Nf6, Nc6, Re8, …c6. Тематичний тактичний мотив — «трюк вилки»: після 4.Nc3 Nxe4 5.Nxe4 чорні б'ють 5…d5, атакуючи одночасно слона c4 і коня e4, і повертають фігуру.\n\nЧого не зубрити: довгі форсовані гілки на 12–15 ходів. Досить знати структуру, маршрут коня і момент удару d4 / …d5. Відкритий центр після раннього 5.d4 — інша гілка (з …Bb4+); розумійте ідею, не енциклопедію.",
            "notesEn": "The Italian Game starts 1.e4 e5 2.Nf3 Nc6 3.Bc4, and the Giuoco Piano is the reply 3…Bc5. The modern “quiet” line (Giuoco Pianissimo) puts pawns on c3 and d3 instead of rushing d4. The diagram is a typical structure after 4.c3 Nf6 5.d3 d6 6.O-O O-O 7.Nbd2 a6 8.Bb3 Ba7 9.h3: White’s bishop on b3 eyes f7, the knight on d2 prepares the route f1–g3, and h3 takes g4 away from Black’s bishop and knight.\n\nWhite’s plan: prepare d4 (sometimes after Re1), reroute Nbd2–f1–g3, sometimes a4, and keep the bishop pair. If the centre opens, the c4/b3 bishop becomes very strong. Black’s plan: …a6 and …Ba7 (so d4 does not hit the bishop), …Ne7–g6 or …Be6, and a timely …d5.\n\nTypical placement: White — Bb3, Nf3, Nbd2–f1–g3, Re1, Be3; Black — Ba7, Nf6, Nc6, Re8, …c6. A thematic tactic is the fork trick: after 4.Nc3 Nxe4 5.Nxe4 Black plays 5…d5, attacking bishop and knight at once, and wins the piece back.\n\nWhat not to memorise: long forced branches of 12–15 moves. It is enough to know the structure, the knight manoeuvre, and the timing of d4 / …d5. The open-centre branch after an early 5.d4 (with …Bb4+) is a different idea worth understanding — not an encyclopaedia.",
            "quiz": {
              "q": "Який типовий маршрут має кінь білих у тихому Джоко-п'яно?",
              "qEn": "What is White’s typical knight route in the quiet Giuoco Piano?",
              "options": [
                "Nbd2–f1–g3",
                "Na3–c2–e3",
                "Nh4–f5 одразу",
                "Nb1–a3–b5"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "Nbd2–f1–g3",
                "Na3–c2–e3",
                "Nh4–f5 at once",
                "Nb1–a3–b5"
              ]
            }
          },
          {
            "id": "ch-d-giuoco-p1",
            "type": "chess_puzzle",
            "promptUk": "Трюк вилки: поверніть фігуру одним ходом пішака.",
            "promptEn": "The fork trick: win the piece back with one pawn move.",
            "fen": "r1bqkb1r/pppp1ppp/2n5/4p3/2B1N3/5N2/PPPP1PPP/R1BQK2R b KQkq - 0 5",
            "solutionSans": [
              "d5"
            ],
            "difficulty": 2
          },
          {
            "id": "ch-d-giuoco-m1",
            "type": "mcq",
            "promptUk": "Навіщо чорні грають …a6 і …Ba7?",
            "promptEn": "Why does Black play …a6 and …Ba7?",
            "options": [
              "щоб слон не потрапив під удар після d4 і зберіг діагональ на f2",
              "щоб негайно поставити мат",
              "щоб віддати слона за пішака a2",
              "щоб заборонити рокіровку білих"
            ],
            "correctIndex": 0,
            "explanationUk": "Слон на a7 ховається від d4 і далі дивиться на білого короля.",
            "explanationEn": "The bishop on a7 steps off the d4 hit and still eyes the white king.",
            "optionsEn": [
              "so the bishop avoids a d4 hit and keeps the diagonal toward f2",
              "to give mate at once",
              "to give the bishop for the a2-pawn",
              "to stop White from castling"
            ]
          },
          {
            "id": "ch-d-giuoco-e",
            "type": "explain",
            "promptUk": "Який план білих у Джоко-п'яно і чого не зубрити?",
            "promptEn": "What is White’s plan in the Giuoco Piano, and what should you not memorise?",
            "keyIdeas": [
              {
                "labelUk": "Центр",
                "labelEn": "Centre",
                "anyOf": [
                  "c3",
                  "d4",
                  "d3",
                  "центр",
                  "centre",
                  "center"
                ]
              },
              {
                "labelUk": "Кінь",
                "labelEn": "Knight route",
                "anyOf": [
                  "Nbd2",
                  "f1",
                  "g3",
                  "маршрут",
                  "route",
                  "knight"
                ]
              },
              {
                "labelUk": "Ідея",
                "labelEn": "Ideas not lines",
                "anyOf": [
                  "структур",
                  "structure",
                  "план",
                  "plan",
                  "не зубр",
                  "memor"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Білі ставлять пішаків на c3 і d3, готують d4 і ведуть коня Nbd2–f1–g3. Зубрити 15 ходів не потрібно: досить структури і плану.",
            "sampleAnswerEn": "White puts pawns on c3 and d3, prepares d4, and reroutes the knight Nbd2–f1–g3. You do not need to memorise 15 moves: the structure and the plan are enough."
          }
        ]
      },
      {
        "slug": "ch-d-evans-two",
        "titleUk": "Гамбіт Еванса і захист двох коней",
        "titleEn": "The Evans Gambit and the Two Knights Defence",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "ch-d-evans-two-l",
            "type": "chess_lesson",
            "promptUk": "Гамбіт Еванса і захист двох коней",
            "promptEn": "The Evans Gambit and the Two Knights Defence",
            "fen": "r1bqk1nr/pppp1ppp/2n5/b7/2BpP3/2P2N2/P4PPP/RNBQ1RK1 b kq - 1 7",
            "notesUk": "Гамбіт Еванса — це італійська з раннім 4.b4. Білі жертвують крайнього пішака, щоб виграти темпи: після 4…Bxb4 5.c3 слон змушений ще раз рухатись, і білі швидко грають d4 і O-O. На діаграмі позиція після 5.c3 Ba5 6.d4 exd4 7.O-O: білі вже рокіровані, центр відкривається, слон c4 і майбутній Qb3 тиснуть на f7. Це компенсація за пішака — розвиток і ініціатива, не «вічний мат».\n\nПлан білих: Qb3 (подвійний удар на f7 і b7), Ba3 (відрізати рокіровку), Nxc3, Re1. План чорних: не жадібнити всі пішаки. Надійніше повернути одного (…d6, …Bb6, …Nf6, …O-O) і завершити розвиток, ніж брати на c3 і відставати. Якщо чорні надто жадібні (…dxc3), Qb3 одразу ставить неприємні питання f7.\n\nЗахист двох коней — 3…Nf6 замість 3…Bc5. Після 4.Ng5 чорні майже завжди грають 4…d5 (не 4…Nxe4?). Якщо 5.exd5 Nxd5, білі можуть піти в гамбіт Фрід-Лівера 6.Nxf7 — гостра теоретична жертва; надійніше для чорних 5…Na5, зганяючи слона з діагоналі a2–g8.\n\nНе зубрити всі гілки Тракслера і Фрід-Лівера напам'ять. Запам'ятайте ідеї: Еванс — темп і f7; два коні — контрудар …d5; жадібність карається Qb3.",
            "notesEn": "The Evans Gambit is an Italian with an early 4.b4. White gives a wing pawn to win tempi: after 4…Bxb4 5.c3 the bishop must move again, and White quickly plays d4 and O-O. The diagram is the position after 5.c3 Ba5 6.d4 exd4 7.O-O: White is already castled, the centre is opening, and Bc4 plus a future Qb3 pressure f7. That is the compensation — development and initiative, not a “forced mate”.\n\nWhite’s plan: Qb3 (a double attack on f7 and b7), Ba3 (cutting off castling), Nxc3, Re1. Black’s plan: do not grab every pawn. It is safer to give one back (…d6, …Bb6, …Nf6, …O-O) and finish development than to take on c3 and fall behind. If Black is too greedy (…dxc3), Qb3 immediately asks hard questions of f7.\n\nThe Two Knights Defence is 3…Nf6 instead of 3…Bc5. After 4.Ng5 Black almost always plays 4…d5 (not 4…Nxe4?). If 5.exd5 Nxd5, White can enter the Fried Liver Gambit 6.Nxf7 — a sharp theoretical sacrifice; safer for Black is 5…Na5, driving the bishop off the a2–g8 diagonal.\n\nDo not memorise every Traxler and Fried Liver branch. Remember the ideas: Evans — tempi and f7; Two Knights — the counterstrike …d5; greed is punished by Qb3.",
            "quiz": {
              "q": "Що є компенсацією білих у гамбіті Еванса?",
              "qEn": "What is White’s compensation in the Evans Gambit?",
              "options": [
                "темпи, відкритий центр і тиск на f7",
                "форсований мат у 5 ходів",
                "зайва якість",
                "вічний шах з першого ходу"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "tempi, an open centre and pressure on f7",
                "forced mate in five",
                "an extra exchange",
                "perpetual check from move one"
              ]
            }
          },
          {
            "id": "ch-d-evans-two-p1",
            "type": "chess_puzzle",
            "promptUk": "Чорні зажадібнили на c3. Удар ферзя по f7 і b7.",
            "promptEn": "Black grabbed on c3. Hit f7 and b7 with the queen.",
            "fen": "r1bqk1nr/pppp1ppp/2n5/b7/2B1P3/2p2N2/P4PPP/RNBQ1RK1 w kq - 0 8",
            "solutionSans": [
              "Qb3"
            ],
            "difficulty": 3
          },
          {
            "id": "ch-d-evans-two-p2",
            "type": "chess_puzzle",
            "promptUk": "Після Ng5 у двох конях: єдиний надійний контрудар.",
            "promptEn": "After Ng5 in the Two Knights: the only reliable counterstrike.",
            "fen": "r1bqkb1r/pppp1ppp/2n2n2/4p1N1/2B1P3/8/PPPP1PPP/RNBQK2R b KQkq - 5 4",
            "solutionSans": [
              "d5"
            ],
            "difficulty": 2
          },
          {
            "id": "ch-d-evans-two-m1",
            "type": "mcq",
            "promptUk": "Після 4.Ng5 d5 5.exd5, який хід надійніший за 5…Nxd5?",
            "promptEn": "After 4.Ng5 d5 5.exd5, which move is safer than 5…Nxd5?",
            "options": [
              "5…Na5, зганяючи слона з діагоналі a2–g8",
              "5…Nxe4, ігноруючи слона",
              "5…Ng4, жертвуючи коня",
              "5…Qxd5, підставляючи ферзя під Nc3"
            ],
            "correctIndex": 0,
            "explanationUk": "5…Nxd5 допускає Фрід-Лівер 6.Nxf7. 5…Na5 — головна надійна гілка.",
            "explanationEn": "5…Nxd5 allows the Fried Liver 6.Nxf7. 5…Na5 is the main reliable branch.",
            "optionsEn": [
              "5…Na5, driving the bishop off the a2–g8 diagonal",
              "5…Nxe4, ignoring the bishop",
              "5…Ng4, sacrificing the knight",
              "5…Qxd5, leaving the queen to Nc3"
            ]
          },
          {
            "id": "ch-d-evans-two-e",
            "type": "explain",
            "promptUk": "Порівняйте ідею Еванса і захист двох коней.",
            "promptEn": "Compare the idea of the Evans Gambit and the Two Knights Defence.",
            "keyIdeas": [
              {
                "labelUk": "Еванс",
                "labelEn": "Evans",
                "anyOf": [
                  "b4",
                  "темп",
                  "tempi",
                  "tempo",
                  "f7",
                  "Qb3"
                ]
              },
              {
                "labelUk": "Два коні",
                "labelEn": "Two Knights",
                "anyOf": [
                  "Ng5",
                  "d5",
                  "Na5",
                  "Фрід",
                  "Fried",
                  "Nxf7"
                ]
              },
              {
                "labelUk": "Жадібність",
                "labelEn": "Greed",
                "anyOf": [
                  "жадіб",
                  "greed",
                  "пішак",
                  "pawn",
                  "розвит",
                  "develop"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Еванс жертвує пішака b4 заради темпів і тиску на f7, часто з Qb3. У двох конях після Ng5 чорні б'ють у центр ходом d5, а не жадібнять фігури. Розвиток важливіший за зайвого пішака.",
            "sampleAnswerEn": "The Evans Gambit sacrifices the b4-pawn for tempi and pressure on f7, often with Qb3. In the Two Knights, after Ng5 Black strikes in the centre with d5 rather than grabbing pieces. Development matters more than an extra pawn."
          }
        ]
      },
      {
        "slug": "ch-d-ruy-exch",
        "titleUk": "Іспанська: розмінний варіант",
        "titleEn": "The Ruy Lopez Exchange Variation",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "ch-d-ruy-exch-l",
            "type": "chess_lesson",
            "promptUk": "Іспанська: розмінний варіант",
            "promptEn": "The Ruy Lopez Exchange Variation",
            "fen": "r1bqkbnr/1pp2ppp/p1p5/4p3/4P3/5N2/PPPP1PPP/RNBQ1RK1 b kq - 1 5",
            "notesUk": "Іспанська партія (Ruy Lopez) — 1.e4 e5 2.Nf3 Nc6 3.Bb5. У розмінному варіанті білі одразу грають 4.Bxc6 після 3…a6. На діаграмі позиція після 4.Bxc6 dxc6 5.O-O: у чорних подвоєні пішаки по лінії c і пара слонів; у білих здорова пішакова більшість на королівському фланзі (4 проти 3: e, f, g, h проти f, g, h, бо пішак e5 часто розмінюється).\n\nДовгостроковий план білих — спростити гру і дійти до пішакового ендшпілю, де більшість перетворюється на прохідного пішака по лінії e. Саме тому білі спочатку рокірують: якщо з'їсти на e5 зарано (5.Nxe5??), чорні відповідають 5…Qd4, ставлячи вилку на коня e5 і пішака e4, і повертають матеріал із відсотком.\n\nПлан чорних: не боятися подвоєних пішаків, користуватися парою слонів на відкритій дошці, тримати більше фігур (уникати «чистого» пішакового ендшпілю), грати …f6, розвивати слонів на g4/e6 і не поспішати з розмінами.\n\nНе зубрити 20 ходів «остаточного ендшпілю». Досить ідеї: рокіровка спочатку, потім d4; чорні тримають слонів і не ведуть гру до самих пішаків.",
            "notesEn": "The Ruy Lopez is 1.e4 e5 2.Nf3 Nc6 3.Bb5. In the Exchange Variation White plays 4.Bxc6 at once after 3…a6. The diagram is the position after 4.Bxc6 dxc6 5.O-O: Black has doubled c-pawns and the bishop pair; White has a healthy kingside pawn majority (4 vs 3: e, f, g, h against f, g, h, once the e5-pawn is exchanged).\n\nWhite’s long-term plan is to simplify into a king-and-pawn ending where that majority becomes a passed e-pawn. That is why White castles first: if you take on e5 too early (5.Nxe5??), Black replies 5…Qd4, forking the knight on e5 and the pawn on e4, and wins the material back with interest.\n\nBlack’s plan: do not fear the doubled pawns, use the bishop pair on an open board, keep more pieces on (avoid a “pure” pawn ending), play …f6, develop the bishops to g4/e6, and do not rush exchanges.\n\nDo not memorise 20 moves of a “final ending”. The idea is enough: castle first, then d4; Black keeps the bishops and avoids a pawn-only ending.",
            "quiz": {
              "q": "Чому в розмінній іспанській білі спочатку рокірують, а не беруть на e5?",
              "qEn": "In the Exchange Ruy, why does White castle first rather than take on e5?",
              "options": [
                "після 5.Nxe5?? є вилка 5…Qd4 на коня і пішака e4",
                "рокіровка дає мат у 2 ходи",
                "на e5 не можна ніколи брати",
                "чорні інакше ставлять пат"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "after 5.Nxe5?? the fork 5…Qd4 hits the knight and the e4-pawn",
                "castling gives mate in two",
                "e5 can never be taken",
                "otherwise Black would stalemate"
              ]
            }
          },
          {
            "id": "ch-d-ruy-exch-p1",
            "type": "chess_puzzle",
            "promptUk": "Білі зарано взяли на e5. Вилка ферзем.",
            "promptEn": "White took on e5 too early. Fork with the queen.",
            "fen": "r1bqkbnr/1pp2ppp/p1p5/4N3/4P3/8/PPPP1PPP/RNBQK2R b KQkq - 0 5",
            "solutionSans": [
              "Qd4"
            ],
            "difficulty": 2
          },
          {
            "id": "ch-d-ruy-exch-m1",
            "type": "mcq",
            "promptUk": "Чому чорним вигідно зберігати фігури в розмінній іспанській?",
            "promptEn": "Why should Black keep pieces on in the Exchange Ruy?",
            "options": [
              "пара слонів сильна в мітельшпілі; пішаковий ендшпіль вигідний білим",
              "фігури завжди заважають",
              "щоб швидше отримати пат",
              "бо в ендшпілі слони слабші за пішаків"
            ],
            "correctIndex": 0,
            "explanationUk": "Більшість білих розкривається саме в пішаковому закінченні. Слони — козир чорних, поки є фігури.",
            "explanationEn": "White’s majority shows itself in a pawn ending. The bishops are Black’s trump while pieces remain.",
            "optionsEn": [
              "the bishop pair is strong in the middlegame; a pawn ending favours White",
              "pieces always get in the way",
              "to get a stalemate faster",
              "because bishops are weaker than pawns in the ending"
            ]
          },
          {
            "id": "ch-d-ruy-exch-e",
            "type": "explain",
            "promptUk": "Який довгий план білих і як чорні йому протидіють?",
            "promptEn": "What is White’s long plan, and how does Black fight it?",
            "keyIdeas": [
              {
                "labelUk": "Більшість",
                "labelEn": "Majority",
                "anyOf": [
                  "більшіст",
                  "majority",
                  "прохідн",
                  "passed",
                  "ендшпіл",
                  "ending"
                ]
              },
              {
                "labelUk": "Рокіровка",
                "labelEn": "Castling first",
                "anyOf": [
                  "O-O",
                  "рокір",
                  "castl",
                  "Nxe5",
                  "Qd4"
                ]
              },
              {
                "labelUk": "Слони",
                "labelEn": "Bishop pair",
                "anyOf": [
                  "пара слон",
                  "bishop pair",
                  "слони",
                  "bishops"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Білі рокірують (O-O), потім спрощують до ендшпілю, де пішакова більшість дає прохідного. Раннє Nxe5 карається вилкою Qd4. Чорні тримають пару слонів і уникають чистого пішакового закінчення.",
            "sampleAnswerEn": "White castles (O-O), then simplifies toward an ending where the pawn majority makes a passed pawn. Early Nxe5 is punished by the fork Qd4. Black keeps the bishop pair and avoids a pure pawn ending."
          }
        ]
      },
      {
        "slug": "ch-d-ruy-closed",
        "titleUk": "Закрита іспанська: Чигорін і Брейєр",
        "titleEn": "The Closed Ruy Lopez: Chigorin and Breyer",
        "baseXp": 24,
        "difficulty": 4,
        "exercises": [
          {
            "id": "ch-d-ruy-closed-l",
            "type": "chess_lesson",
            "promptUk": "Закрита іспанська: Чигорін і Брейєр",
            "promptEn": "The Closed Ruy Lopez: Chigorin and Breyer",
            "fen": "r1b2rk1/2q1bppp/p2p1n2/npp1p3/3PP3/2P2N1P/PPB2PP1/RNBQR1K1 w - - 1 12",
            "notesUk": "Закрита іспанська виникає після 3…a6 4.Ba4 Nf6 5.O-O Be7 6.Re1 b5 7.Bb3 d6 8.c3 O-O 9.h3. Пішак h3 потрібен, щоб на d4 не висіло зв'язування …Bg4. Білі тримають пішака e4 і готують d4; слон ховається на c2, коли його турбують. На діаграмі система Чигоріна: чорні вже відіграли …Na5, …c5 і …Qc7, білі поставили d4.\n\nПлан білих: d4, Nbd2–f1–g3 (знову той самий маршрут, що в італійській!), a4, тиск на e5. Якщо центр закриється (d5), гра переходить на фланги. План чорних у Чигоріні: …Na5 зганяє слона, …c5 б'є в центр, ферзь на c7 підтримує e5. Альтернатива — система Брейєра 9…Nb8, потім …Nbd7, …Bb7, …Re8, …c6: кінь іде назад, щоб стати гнучкіше, без раннього …Na5.\n\nТипове розміщення білих: Bb3 або Bc2, Re1, Nbd2–f1–g3, Be3, a4. Чорні: …b5, …d6, слон e7, тури e8 і a8/c8.\n\nПастка «Ноїв ковчег»: слон на b3 може бути спійманий пішаками …c5–c4, якщо білі невдало відкрили центр і ферзь став на d4. Після …c5 ферзь мусить рухатись, і …c4 закриває слона. Завжди лишайте йому клітинку втечі (a2, c2) або грайте a3.\n\nНе зубрити 18 ходів Чигоріна. Виберіть одну схему за чорних (Чигорін або Брейєр) і розумійте, куди йдуть фігури.",
            "notesEn": "The Closed Ruy Lopez arises after 3…a6 4.Ba4 Nf6 5.O-O Be7 6.Re1 b5 7.Bb3 d6 8.c3 O-O 9.h3. The move h3 prevents a pin …Bg4 once d4 is played. White holds e4 and prepares d4; the bishop drops back to c2 when it is harassed. The diagram is a Chigorin setup: Black has already played …Na5, …c5 and …Qc7, and White has played d4.\n\nWhite’s plan: d4, Nbd2–f1–g3 (the same route as in the Italian!), a4, pressure on e5. If the centre closes with d5, the game shifts to the flanks. Black’s Chigorin plan: …Na5 drives the bishop, …c5 strikes the centre, the queen on c7 supports e5. The alternative is the Breyer, 9…Nb8 then …Nbd7, …Bb7, …Re8, …c6: the knight steps back to be more flexible, without an early …Na5.\n\nTypical placement: White — Bb3 or Bc2, Re1, Nbd2–f1–g3, Be3, a4. Black — …b5, …d6, bishop e7, rooks on e8 and a8/c8.\n\nThe Noah’s Ark trap: a bishop on b3 can be caught by the pawns …c5–c4 if White has opened the centre carelessly and the queen sits on d4. After …c5 the queen must move, and …c4 shuts the bishop in. Always leave it an escape (a2, c2) or play a3.\n\nDo not memorise 18 moves of the Chigorin. Pick one Black scheme (Chigorin or Breyer) and know where the pieces belong.",
            "quiz": {
              "q": "Що таке система Брейєра в закритій іспанській?",
              "qEn": "What is the Breyer system in the Closed Ruy Lopez?",
              "options": [
                "9…Nb8 і далі …Nbd7, гнучкий розвиток без раннього …Na5",
                "жертва ферзя на b3",
                "розмін 4.Bxc6",
                "мат у 3 ходи після …Bg4"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "9…Nb8 and then …Nbd7, flexible development without an early …Na5",
                "a queen sacrifice on b3",
                "the exchange 4.Bxc6",
                "mate in three after …Bg4"
              ]
            }
          },
          {
            "id": "ch-d-ruy-closed-p1",
            "type": "chess_puzzle",
            "promptUk": "Пастка «Ноїв ковчег»: удар по ферзю, що готує ловлю слона.",
            "promptEn": "The Noah’s Ark trap: hit the queen, preparing to trap the bishop.",
            "fen": "r1bqkbnr/2p2ppp/p2p4/1p6/3QP3/1B6/PPP2PPP/RNB1K2R b KQkq - 0 8",
            "solutionSans": [
              "c5"
            ],
            "difficulty": 2
          },
          {
            "id": "ch-d-ruy-closed-m1",
            "type": "mcq",
            "promptUk": "Навіщо білі грають 9.h3 у закритій іспанській?",
            "promptEn": "Why does White play 9.h3 in the Closed Ruy Lopez?",
            "options": [
              "щоб після d4 чорні не зв'язали коня ходом …Bg4",
              "щоб одразу поставити мат по лінії h",
              "щоб заборонити довгу рокіровку чорних",
              "це єдиний хід, що захищає e4"
            ],
            "correctIndex": 0,
            "explanationUk": "Без h3 зв'язування …Bg4 робить d4 менш зручним.",
            "explanationEn": "Without h3 the pin …Bg4 makes d4 less comfortable.",
            "optionsEn": [
              "so that after d4 Black cannot pin the knight with …Bg4",
              "to mate at once on the h-file",
              "to stop Black’s long castle",
              "it is the only move that defends e4"
            ]
          },
          {
            "id": "ch-d-ruy-closed-m2",
            "type": "mcq",
            "promptUk": "Куди білі ведуть коня з b1 у закритій іспанській?",
            "promptEn": "Where does White’s b1-knight go in the Closed Ruy?",
            "options": [
              "Nbd2–f1–g3 (інколи e3)",
              "Na3–c4 і зупинитись",
              "Nb1–c3–a4 завжди",
              "кінь лишається на b1 до ендшпілю"
            ],
            "correctIndex": 0,
            "explanationUk": "Той самий маневр, що в тихій італійській: кінь іде на королівський фланг.",
            "explanationEn": "The same manoeuvre as in the quiet Italian: the knight heads for the kingside.",
            "optionsEn": [
              "Nbd2–f1–g3 (sometimes e3)",
              "Na3–c4 and stop",
              "Nb1–c3–a4 always",
              "the knight stays on b1 until the ending"
            ]
          },
          {
            "id": "ch-d-ruy-closed-e",
            "type": "explain",
            "promptUk": "Поясніть плани Чигоріна і пастку «Ноїв ковчег».",
            "promptEn": "Explain the Chigorin plans and the Noah’s Ark trap.",
            "keyIdeas": [
              {
                "labelUk": "Чигорін",
                "labelEn": "Chigorin",
                "anyOf": [
                  "Na5",
                  "c5",
                  "Qc7",
                  "Чигор",
                  "Chigorin"
                ]
              },
              {
                "labelUk": "d4",
                "labelEn": "d4",
                "anyOf": [
                  "d4",
                  "Nbd2",
                  "g3",
                  "h3"
                ]
              },
              {
                "labelUk": "Ноїв ковчег",
                "labelEn": "Noah’s Ark",
                "anyOf": [
                  "ковчег",
                  "Noah",
                  "c4",
                  "c5",
                  "слон",
                  "bishop",
                  "b3"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "У Чигоріні чорні грають Na5, c5 і Qc7, білі готують d4 і ведуть коня Nbd2–f1–g3, зробивши h3. Пастка «Ноїв ковчег»: пішаки c5–c4 ловлять слона на b3, якщо йому немає втечі.",
            "sampleAnswerEn": "In the Chigorin, Black plays Na5, c5 and Qc7; White prepares d4 and reroutes the knight Nbd2–f1–g3 after h3. The Noah’s Ark trap: the pawns c5–c4 catch a bishop on b3 if it has no escape."
          }
        ]
      },
      {
        "slug": "ch-d-ruy-berlin",
        "titleUk": "Берлінський мур",
        "titleEn": "The Berlin Wall",
        "baseXp": 24,
        "difficulty": 4,
        "exercises": [
          {
            "id": "ch-d-ruy-berlin-l",
            "type": "chess_lesson",
            "promptUk": "Берлінський мур",
            "promptEn": "The Berlin Wall",
            "fen": "r1bk1b1r/ppp2ppp/2p5/4Pn2/8/5N2/PPP2PPP/RNB2RK1 w - - 0 9",
            "notesUk": "Берлінський захист — 3…Nf6, без раннього …a6. Головна гілка: 4.O-O Nxe4 5.d4 Nd6 6.Bxc6 dxc6 7.dxe5 Nf5 8.Qxd8+ Kxd8. На діаграмі якраз це закінчення: ферзів немає, чорний король стоїть на d8 і не може рокірувати, у чорних пара слонів і знову подвоєні c-пішаки, у білих простір і пішак на e5.\n\nЧому це «мур»: позиція напрочуд міцна. Король у центрі не під шахами ферзя, тож він часто лишається біля центру або повертається на e8 (штучна рокіровка) після …Be7. Слон c8 іде на e6, інший — на e7 або b4, тури на e8 і d8. Чорні не шукають швидкого мату — вони хочуть нейтралізувати простір білих і довести до нічиєї або переграти в довгій технічній боротьбі.\n\nПлан білих: використати фору в розвитку, тиск по лінії d, пішакову масу e5–f4, інколи h3–g4 проти коня f5. Не варто грати «на мат» уже на 10-му ході: король чорних тут безпечніший, ніж здається. Типова помилка — віддати структуру заради випадкової тактики.\n\nНе зубрити 25 ходів берлінського ендшпілю з чемпіонатів світу. Вивчіть структуру, куди йде король (часто Ke8 або під захист слонів; не стрибок на c7, поки там стоїть власний пішак) і що білі тиснуть простором, а не матом.",
            "notesEn": "The Berlin Defence is 3…Nf6, without an early …a6. The main line is 4.O-O Nxe4 5.d4 Nd6 6.Bxc6 dxc6 7.dxe5 Nf5 8.Qxd8+ Kxd8. The diagram is exactly this ending: the queens are gone, the black king sits on d8 and cannot castle, Black has the bishop pair and again doubled c-pawns, White has space and a pawn on e5.\n\nWhy it is called a “Wall”: the position is remarkably sturdy. The king in the centre is not under queen checks, so it often stays nearby or returns to e8 (an artificial castle) after …Be7. The c8-bishop goes to e6, the other to e7 or b4, the rooks to e8 and d8. Black is not hunting a quick mate — they want to neutralise White’s space and hold, or outplay White in a long technical fight.\n\nWhite’s plan: use the lead in development, pressure the d-file, the pawn mass e5–f4, sometimes h3–g4 against the knight on f5. Do not play “for mate” as early as move 10: Black’s king is safer than it looks. A typical mistake is wrecking your structure for a random tactic.\n\nDo not memorise 25 moves of the World Championship Berlin ending. Learn the structure, where the king goes (often Ke8 or behind the bishops — not a leap to c7 while a pawn still sits there) and that White presses with space, not with mate.",
            "quiz": {
              "q": "Чому король чорних на d8 у берлінському ендшпілі відносно безпечний?",
              "qEn": "Why is Black’s king on d8 relatively safe in the Berlin ending?",
              "options": [
                "ферзів уже немає, тож немає важких шахів по відкритому центру",
                "король завжди в безпеці на d8 у будь-якій дебютній позиції",
                "білі не мають права шахувати",
                "це пат"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "the queens are already off, so there are no heavy checks in the open centre",
                "a king is always safe on d8 in any opening",
                "White is not allowed to check",
                "it is stalemate"
              ]
            }
          },
          {
            "id": "ch-d-ruy-berlin-m1",
            "type": "mcq",
            "promptUk": "Який типовий маневр короля чорних у Берліні, поки пішак стоїть на c7?",
            "promptEn": "What is a typical king manoeuvre for Black in the Berlin while a pawn is on c7?",
            "options": [
              "повернутись на e8 після розвитку слона, або підготувати притулок на ферзевому фланзі",
              "одразу Kc7, навіть якщо пішак ще на c7",
              "Kg8 без рокіровки",
              "йти пішки на h5"
            ],
            "correctIndex": 0,
            "explanationUk": "Клітинка c7 зайнята власним пішаком; штучна рокіровка Ke8 — стандарт.",
            "explanationEn": "The c7-square is occupied by Black’s own pawn; the artificial castle Ke8 is standard.",
            "optionsEn": [
              "return to e8 after developing the bishop, or prepare a queenside shelter",
              "play Kc7 at once, even with a pawn still on c7",
              "Kg8 without castling",
              "walk to h5 on foot"
            ]
          },
          {
            "id": "ch-d-ruy-berlin-m2",
            "type": "mcq",
            "promptUk": "Що є головним козирем білих у берлінському закінченні?",
            "promptEn": "What is White’s main trump in the Berlin ending?",
            "options": [
              "простір і пішак e5, плюс трохи кращий розвиток",
              "форсований мат конем на f7",
              "зайвий ферзь",
              "прохідний пішак на a5 з першого ходу"
            ],
            "correctIndex": 0,
            "explanationUk": "Компенсація за пару слонів — простір. Мату «автоматом» немає.",
            "explanationEn": "The compensation for the bishop pair is space. There is no automatic mate.",
            "optionsEn": [
              "space and the e5-pawn, plus a slight lead in development",
              "forced mate with a knight on f7",
              "an extra queen",
              "a passed a-pawn from move one"
            ]
          },
          {
            "id": "ch-d-ruy-berlin-m3",
            "type": "mcq",
            "promptUk": "Чого не варто зубріти в Берліні?",
            "promptEn": "What should you not memorise in the Berlin?",
            "options": [
              "25-ходові енциклопедичні гілки чемпіонатів світу без розуміння структури",
              "ідею штучної рокіровки",
              "план e5–f4",
              "що ферзів уже немає"
            ],
            "correctIndex": 0,
            "explanationUk": "Структура і плани важливіші за чужі новинки 20-го ходу.",
            "explanationEn": "The structure and plans matter more than someone else’s move-20 novelty.",
            "optionsEn": [
              "25-move encyclopaedic World Championship branches without understanding the structure",
              "the idea of an artificial castle",
              "the e5–f4 plan",
              "the fact that the queens are already off"
            ]
          },
          {
            "id": "ch-d-ruy-berlin-e",
            "type": "explain",
            "promptUk": "Чому Берлін називають «муром» і який план обох сторін?",
            "promptEn": "Why is the Berlin called a “Wall”, and what is each side’s plan?",
            "keyIdeas": [
              {
                "labelUk": "Без ферзів",
                "labelEn": "Queens off",
                "anyOf": [
                  "ферз",
                  "queen",
                  "Kxd8",
                  "d8",
                  "ендшпіл",
                  "ending"
                ]
              },
              {
                "labelUk": "Король",
                "labelEn": "King",
                "anyOf": [
                  "Ke8",
                  "e8",
                  "штучн",
                  "artificial",
                  "безпеч",
                  "safe"
                ]
              },
              {
                "labelUk": "Простір",
                "labelEn": "Space",
                "anyOf": [
                  "простір",
                  "space",
                  "e5",
                  "слони",
                  "bishop"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Після розміну ферзів (Kxd8) король чорних безпечний у центрі і часто йде на e8 — штучна рокіровка. Це «мур»: міцна структура. Білі тиснуть простором і пішаком e5, чорні тримають слонів.",
            "sampleAnswerEn": "After the queen exchange (Kxd8) Black’s king is safe in the centre and often goes to e8 — an artificial castle. That is the “Wall”: a sturdy structure. White presses with space and the e5-pawn; Black keeps the bishops."
          }
        ]
      },
      {
        "slug": "ch-deep-italian-ruy-exam",
        "titleUk": "Іспит: італійська і іспанська",
        "titleEn": "Exam: Italian and Ruy Lopez",
        "baseXp": 30,
        "difficulty": 4,
        "isExam": true,
        "passThreshold": 0.7,
        "exercises": [
          {
            "id": "ch-deep-italian-ruy-exam-q1",
            "type": "mcq",
            "promptUk": "Типовий прорив білих у Джоко-п'яно після c3 — це:",
            "promptEn": "White’s typical break in the Giuoco Piano after c3 is:",
            "options": [
              "d4",
              "a3 і одразу b4 без ідеї",
              "g4 у будь-який момент",
              "здача якості на a1"
            ],
            "correctIndex": 0,
            "explanationUk": "Пішак c3 підтримує удар d4 у центрі.",
            "explanationEn": "The c3-pawn supports the central strike d4.",
            "optionsEn": [
              "d4",
              "a3 and an immediate idea-less b4",
              "g4 at any moment",
              "giving up the exchange on a1"
            ]
          },
          {
            "id": "ch-deep-italian-ruy-exam-q2",
            "type": "mcq",
            "promptUk": "У розмінній іспанській довгий план білих — це:",
            "promptEn": "In the Exchange Ruy, White’s long plan is:",
            "options": [
              "спростити до пішакового ендшпілю, де спрацює більшість",
              "поставити мат на 12-му ході",
              "віддати всіх слонів",
              "ніколи не рокірувати"
            ],
            "correctIndex": 0,
            "explanationUk": "4 проти 3 на королівському фланзі любить спрощення.",
            "explanationEn": "4 vs 3 on the kingside loves simplification.",
            "optionsEn": [
              "simplify to a pawn ending where the majority counts",
              "mate on move 12",
              "give away all the bishops",
              "never castle"
            ]
          },
          {
            "id": "ch-deep-italian-ruy-exam-q3",
            "type": "mcq",
            "promptUk": "Берлінський мур характерний тим, що:",
            "promptEn": "The Berlin Wall is characterised by:",
            "options": [
              "ранній розмін ферзів і технічний «ендшпіль» із королем на d8",
              "обов'язкова довга рокіровка чорних",
              "жертва ферзя на d4",
              "мат конем на f7 у 1 хід"
            ],
            "correctIndex": 0,
            "explanationUk": "Після 8.Qxd8+ Kxd8 гра одразу стає технічною.",
            "explanationEn": "After 8.Qxd8+ Kxd8 the game becomes technical at once.",
            "optionsEn": [
              "an early queen trade and a technical “ending” with the king on d8",
              "mandatory long castling by Black",
              "a queen sacrifice on d4",
              "mate with a knight on f7 in one move"
            ]
          },
          {
            "id": "ch-deep-italian-ruy-exam-p4",
            "type": "chess_puzzle",
            "promptUk": "Відкритий Джоко: з шахом відійдіть слоном.",
            "promptEn": "Open Giuoco: step away with a check.",
            "fen": "r1bqk2r/pppp1ppp/2n2n2/2b5/2BPP3/5N2/PP3PPP/RNBQK2R b KQkq - 0 6",
            "solutionSans": [
              "Bb4+"
            ],
            "difficulty": 2
          },
          {
            "id": "ch-deep-italian-ruy-exam-p5",
            "type": "chess_puzzle",
            "promptUk": "Білі готують d4 у закритій іспанській. Зробіть прорив.",
            "promptEn": "White is ready for d4 in the Closed Ruy. Play the break.",
            "fen": "r1bq1rk1/4bppp/p2p1n2/npp1p3/4P3/2P2N1P/PPBP1PP1/RNBQR1K1 w - - 0 11",
            "solutionSans": [
              "d4"
            ],
            "difficulty": 2
          },
          {
            "id": "ch-deep-italian-ruy-exam-p6",
            "type": "chess_puzzle",
            "promptUk": "Пастка «Ноїв ковчег»: закрийте слона пішаком.",
            "promptEn": "Noah’s Ark: shut the bishop in with a pawn.",
            "fen": "r2qkbnr/3b1ppp/p2p4/1ppQ4/4P3/1B6/PPP2PPP/RNB1K2R b KQkq - 5 11",
            "solutionSans": [
              "c4"
            ],
            "difficulty": 3
          }
        ]
      }
    ]
  },
  {
    "slug": "ch-deep-qg-london",
    "titleUk": "Ферзевий гамбіт і Лондон",
    "titleEn": "Queen's Gambit and London",
    "lessons": [
      {
        "slug": "ch-d-qgd",
        "titleUk": "Відмовлений ферзевий гамбіт",
        "titleEn": "The Queen's Gambit Declined",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "ch-d-qgd-l",
            "type": "chess_lesson",
            "promptUk": "Відмовлений ферзевий гамбіт",
            "promptEn": "The Queen's Gambit Declined",
            "fen": "r1bq1rk1/pp1nbppp/2p1pn2/3p2B1/2PP4/2N1PN2/PP3PPP/2RQKB1R w K - 0 8",
            "notesUk": "Відмовлений ферзевий гамбіт (QGD) починається 1.d4 d5 2.c4 e6. Чорні підтримують центр, але світлопольний слон поки що «сидить» за пішаком e6 — це головна ціна структури. На діаграмі ортодоксальний варіант після 3.Nc3 Nf6 4.Bg5 Be7 5.e3 O-O 6.Nf3 Nbd7 7.Rc1 c6: біла тура вже на c-лінії, слон g5 зв'язує коня, пішаки утримують напруження c4–d4–d5–e6.\n\nПлан білих: тримати напруження або розміняти cxd5 (карлсбадська структура) і вести «атаку меншості» b4–b5; вискочити конем на e5; розвинути слона на d3 і рокірувати. План чорних: вчасно пробити …c5 або взяти …dxc4 і тоді …c5, звільняючи гру; в системі Тартаковера — …b6 і …Bb7, виводячи «поганого» слона через фіанкето.\n\nТематична пастка Тарраша: після 4.Bg5 Nbd7 5.cxd5 exd5 білі не можуть жадібно взяти 6.Nxd5??, бо 6…Nxd5 7.Bxd8 Bb4+ 8.Qd2 Bxd2+ 9.Kxd2 Kxd8 — чорні повертають ферзя і лишаються з фігурою.\n\nНе зубрити 15 ходів Тартаковера чи Ласкера. Зрозумійте напруження в центрі, коли грати …c5, і що жадібне Nxd5 у цій структурі — відома пастка.",
            "notesEn": "The Queen's Gambit Declined (QGD) starts 1.d4 d5 2.c4 e6. Black supports the centre, but the light-squared bishop is still “shut in” behind the e6-pawn — that is the main cost of the structure. The diagram is an Orthodox line after 3.Nc3 Nf6 4.Bg5 Be7 5.e3 O-O 6.Nf3 Nbd7 7.Rc1 c6: the white rook is already on the c-file, Bg5 pins the knight, and the pawns keep the tension c4–d4–d5–e6.\n\nWhite’s plan: keep the tension or exchange cxd5 (the Carlsbad structure) and run a minority attack with b4–b5; jump a knight to e5; develop the bishop to d3 and castle. Black’s plan: a timely …c5, or …dxc4 and then …c5 to free the game; in the Tartakower, …b6 and …Bb7, bringing the “bad” bishop out by fianchetto.\n\nThe thematic Tarrasch trap: after 4.Bg5 Nbd7 5.cxd5 exd5 White cannot greedily take 6.Nxd5??, because 6…Nxd5 7.Bxd8 Bb4+ 8.Qd2 Bxd2+ 9.Kxd2 Kxd8 — Black wins the queen back and stays a piece up.\n\nDo not memorise 15 moves of the Tartakower or Lasker. Understand the central tension, when to play …c5, and that a greedy Nxd5 in this structure is a famous trap.",
            "quiz": {
              "q": "Чому в ортодоксальному QGD світлопольний слон чорних «поганий»?",
              "qEn": "Why is Black’s light-squared bishop “bad” in the Orthodox QGD?",
              "options": [
                "він закритий власним ланцюгом e6–d5",
                "слони завжди погані на c8",
                "він уже розміняний",
                "білі його зв'язали назавжди"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "it is locked behind Black’s own e6–d5 chain",
                "bishops on c8 are always bad",
                "it has already been exchanged",
                "White has pinned it forever"
              ]
            }
          },
          {
            "id": "ch-d-qgd-p1",
            "type": "chess_puzzle",
            "promptUk": "Пастка Тарраша: білі жадібно взяли на d5. Поверніть ферзя з відсотком.",
            "promptEn": "The Tarrasch trap: White greedily took on d5. Win the queen back with interest.",
            "fen": "r1bqkb1r/pppn1ppp/5n2/3N2B1/3P4/8/PP2PPPP/R2QKBNR b KQkq - 0 6",
            "solutionSans": [
              "Nxd5",
              "Bxd8",
              "Bb4+"
            ],
            "difficulty": 4
          },
          {
            "id": "ch-d-qgd-m1",
            "type": "mcq",
            "promptUk": "Який типовий прорив чорних у QGD, що звільняє гру?",
            "promptEn": "What is Black’s typical freeing break in the QGD?",
            "options": [
              "…c5 (інколи після …dxc4)",
              "…h5–h4 без розвитку",
              "…a5–a4 завжди",
              "…g5 на другому ході"
            ],
            "correctIndex": 0,
            "explanationUk": "Удар …c5 б'є по центру d4 і відкриває лінії.",
            "explanationEn": "The strike …c5 hits d4 and opens lines.",
            "optionsEn": [
              "…c5 (sometimes after …dxc4)",
              "…h5–h4 without development",
              "…a5–a4 always",
              "…g5 on move two"
            ]
          },
          {
            "id": "ch-d-qgd-e",
            "type": "explain",
            "promptUk": "Які плани сторін у QGD і в чому пастка Тарраша?",
            "promptEn": "What are the plans in the QGD, and what is the Tarrasch trap?",
            "keyIdeas": [
              {
                "labelUk": "Напруження",
                "labelEn": "Tension",
                "anyOf": [
                  "c4",
                  "d4",
                  "d5",
                  "e6",
                  "напруж",
                  "tension"
                ]
              },
              {
                "labelUk": "Прорив",
                "labelEn": "Break",
                "anyOf": [
                  "c5",
                  "dxc4",
                  "Tartakower",
                  "Тартаков",
                  "b6"
                ]
              },
              {
                "labelUk": "Пастка",
                "labelEn": "Trap",
                "anyOf": [
                  "Nxd5",
                  "Bb4",
                  "Тарраш",
                  "Tarrasch",
                  "пастк",
                  "trap"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "У QGD білі тримають напруження c4–d4 проти d5–e6 або міняють і йдуть у атаку меншості. Чорні звільняються ходом c5. Пастка Тарраша: жадібне Nxd5 карається Nxd5 і Bb4+ — ферзя повертають.",
            "sampleAnswerEn": "In the QGD White keeps the c4–d4 tension against d5–e6, or exchanges and starts a minority attack. Black frees the game with c5. The Tarrasch trap: greedy Nxd5 is punished by Nxd5 and Bb4+ — the queen comes back."
          }
        ]
      },
      {
        "slug": "ch-d-qga",
        "titleUk": "Прийнятий ферзевий гамбіт",
        "titleEn": "The Queen's Gambit Accepted",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "ch-d-qga-l",
            "type": "chess_lesson",
            "promptUk": "Прийнятий ферзевий гамбіт",
            "promptEn": "The Queen's Gambit Accepted",
            "fen": "rnbqkb1r/1p3ppp/p3pn2/2p5/2BP4/4PN2/PP3PPP/RNBQ1RK1 w kq - 0 7",
            "notesUk": "Прийнятий ферзевий гамбіт — 1.d4 d5 2.c4 dxc4. Чорні не «крадуть» пішака назавжди: вони здають центр, швидко розвиваються (…Nf6, …e6, …c5) і повертають матеріал у зручний момент. На діаграмі типове продовження 3.Nf3 Nf6 4.e3 e6 5.Bxc4 c5 6.O-O a6: білі вже забрали пішака назад, чорні готують …b5 і удар по d4.\n\nПлан білих: швидкий розвиток, e3 або енергійне e4, Bxc4, O-O, інколи a4, щоб гальмувати …b5; тиск у центрі й ізолятор, якщо чорні розміняють на d4. План чорних: не тримати пішака c4 будь-якою ціною, завершити розвиток, зіграти …c5 і отримати вільну гру. Слон c8 виходить на b7 після …b5, або на d7–c6.\n\nТипове покарання жадібності: якщо чорні рано грають …b5, щоб утримати пішака, білі б'ють a4, і після …c6 axb5 cxb5 хід Qf3 одночасно атакує тура a8 і пішака b5. Якщо чорні «захищаються» …Nc6, ферзь бере на c6 з шахом.\n\nНе зубрити всі бічні гілки QGA. Головне правило: пішака c4 віддають, гру звільняють ходом …c5, раннє …b5 без розвитку — небезпека.",
            "notesEn": "The Queen's Gambit Accepted is 1.d4 d5 2.c4 dxc4. Black is not “stealing” the pawn forever: they give up the centre, develop quickly (…Nf6, …e6, …c5) and return the material at a convenient moment. The diagram is a typical continuation 3.Nf3 Nf6 4.e3 e6 5.Bxc4 c5 6.O-O a6: White has already taken the pawn back, Black is preparing …b5 and a strike at d4.\n\nWhite’s plan: fast development, e3 or an energetic e4, Bxc4, O-O, sometimes a4 to slow …b5; central pressure and an isolani if Black exchanges on d4. Black’s plan: do not cling to the c4-pawn at all costs, finish development, play …c5 and get a free game. The c8-bishop comes to b7 after …b5, or to d7–c6.\n\nThe typical punishment for greed: if Black plays an early …b5 to keep the pawn, White hits a4, and after …c6 axb5 cxb5 the move Qf3 attacks the rook on a8 and the b5-pawn at once. If Black “defends” with …Nc6, the queen takes on c6 with check.\n\nDo not memorise every QGA sideline. The rule: give the c4-pawn back, free the game with …c5, and treat an early undeveloped …b5 as danger.",
            "quiz": {
              "q": "Яке головне правило прийнятого ферзевого гамбіту для чорних?",
              "qEn": "What is Black’s main rule in the Queen's Gambit Accepted?",
              "options": [
                "не тримати пішака c4 будь-якою ціною, розвиватись і грати …c5",
                "захищати c4 ходом …b5 уже на третьому ході",
                "ніколи не повертати пішака",
                "рокірувати в довгу обов'язково"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "do not cling to the c4-pawn at all costs; develop and play …c5",
                "defend c4 with …b5 as early as move three",
                "never give the pawn back",
                "always castle long"
              ]
            }
          },
          {
            "id": "ch-d-qga-p1",
            "type": "chess_puzzle",
            "promptUk": "Чорні рано зіграли …b5, тримаючи пішака. Підрив крайнім пішаком.",
            "promptEn": "Black played an early …b5, clinging to the pawn. Undermine with the a-pawn.",
            "fen": "rnbqkbnr/p1p1pppp/8/1p6/2pP4/4P3/PP3PPP/RNBQKBNR w KQkq - 0 4",
            "solutionSans": [
              "a4"
            ],
            "difficulty": 2
          },
          {
            "id": "ch-d-qga-m1",
            "type": "mcq",
            "promptUk": "Після a4 c6 axb5 cxb5 який хід білих б'є і туру a8, і пішака b5?",
            "promptEn": "After a4 c6 axb5 cxb5, which move by White hits both the a8-rook and the b5-pawn?",
            "options": [
              "Qf3",
              "Bh6",
              "Na3",
              "h4"
            ],
            "correctIndex": 0,
            "explanationUk": "Ферзь з f3 дивиться на a8 і на b5. Відповідь …Nc6 програє під Qxc6+.",
            "explanationEn": "From f3 the queen eyes a8 and b5. The reply …Nc6 loses to Qxc6+.",
            "optionsEn": [
              "Qf3",
              "Bh6",
              "Na3",
              "h4"
            ]
          },
          {
            "id": "ch-d-qga-e",
            "type": "explain",
            "promptUk": "Чому в QGA не варто рано тримати пішака ходом …b5?",
            "promptEn": "Why should you not cling to the pawn with an early …b5 in the QGA?",
            "keyIdeas": [
              {
                "labelUk": "Повернути",
                "labelEn": "Give back",
                "anyOf": [
                  "повернут",
                  "give",
                  "c4",
                  "розвит",
                  "develop",
                  "c5"
                ]
              },
              {
                "labelUk": "Покарання",
                "labelEn": "Punishment",
                "anyOf": [
                  "a4",
                  "Qf3",
                  "b5",
                  "туру",
                  "rook",
                  "a8"
                ]
              },
              {
                "labelUk": "Прорив",
                "labelEn": "Break",
                "anyOf": [
                  "c5",
                  "центр",
                  "centre",
                  "center"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "У прийнятому гамбіті пішака c4 повертають і звільняються ходом c5. Раннє b5 карається ходами a4 і Qf3 — удар по турі a8 і пішаку. Розвиток важливіший за зайвого пішака.",
            "sampleAnswerEn": "In the Accepted Gambit you give the c4-pawn back and free yourself with c5. An early b5 is punished by a4 and Qf3 — a hit on the a8-rook and the pawn. Development matters more than an extra pawn."
          }
        ]
      },
      {
        "slug": "ch-d-slav-idea",
        "titleUk": "Слов'янський захист: ідея слона",
        "titleEn": "The Slav Defence: the bishop idea",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "ch-d-slav-idea-l",
            "type": "chess_lesson",
            "promptUk": "Слов'янський захист: ідея слона",
            "promptEn": "The Slav Defence: the bishop idea",
            "fen": "rn1q1rk1/pp3ppp/2p1pn2/5b2/PbBP4/2N1PN2/1P3PPP/R1BQ1RK1 w - - 3 9",
            "notesUk": "Слов'янський захист — 1.d4 d5 2.c4 c6. На відміну від QGD (…e6), пішак c6 підтримує центр, не закриваючи світлопольного слона. Саме тому слон часто встигає вийти на f5 або g4, і лише потім чорні грають …e6. На діаграмі головна гілка після 3.Nf3 Nf6 4.Nc3 dxc4 5.a4 Bf5 6.e3 e6 7.Bxc4 Bb4 8.O-O O-O: білі вже забрали пішака, a4 гальмує …b5, слон чорних активний на f5.\n\nПлан білих: повернути пішака c4, обмежити …b5 ходом a4, поставити коня на e5, інколи e4. План чорних: тримати міцний «трикутник» c6–d5, вивести слона, вчасно …Bb4 або …Nbd7, і не змішувати порядки ходів зі своїм «братом» — напівслов'янським захистом.\n\nНапівслов'янський — це одночасно …e6 і …c6 (часто система Мерана). Там світлопольний слон знову всередині, зате чорні готові до …dxc4 і …b5–b4. Це вже інша структура: не ставте автоматично …Bf5, якщо ви вже закрились ходом …e6.\n\nТиповий тактичний удар: якщо білі надто рано грають e4 (наприклад 3.Nc3 dxc4 4.e4?), чорні б'ють у центр 4…e5, відкриваючи гру, поки білі не забрали пішака c4.\n\nНе змішуйте слов'янський і напівслов'янський «на автоматі». Вирішіть, чи слон іде на f5 до …e6, і тримайте це правило.",
            "notesEn": "The Slav Defence is 1.d4 d5 2.c4 c6. Unlike the QGD (…e6), the c6-pawn supports the centre without shutting in the light-squared bishop. That is why the bishop often gets out to f5 or g4, and only then does Black play …e6. The diagram is a main line after 3.Nf3 Nf6 4.Nc3 dxc4 5.a4 Bf5 6.e3 e6 7.Bxc4 Bb4 8.O-O O-O: White has already recovered the pawn, a4 slows …b5, and Black’s bishop is active on f5.\n\nWhite’s plan: recover the c4-pawn, restrain …b5 with a4, plant a knight on e5, sometimes e4. Black’s plan: keep the solid c6–d5 triangle, develop the bishop, time …Bb4 or …Nbd7, and do not mix move-orders with its “sibling” — the Semi-Slav.\n\nThe Semi-Slav is …e6 and …c6 together (often the Meran). There the light-squared bishop is inside again, but Black is ready for …dxc4 and …b5–b4. That is a different structure: do not automatically play …Bf5 if you have already closed the diagonal with …e6.\n\nA typical tactic: if White plays e4 too early (for example 3.Nc3 dxc4 4.e4?), Black strikes in the centre with 4…e5, opening the game before White has recovered the c4-pawn.\n\nDo not mix the Slav and the Semi-Slav on autopilot. Decide whether the bishop goes to f5 before …e6, and keep that rule.",
            "quiz": {
              "q": "Чим слов'янський захист відрізняється від QGD щодо слона c8?",
              "qEn": "How does the Slav differ from the QGD regarding the c8-bishop?",
              "options": [
                "пішак c6 не закриває слона, тож він часто встигає на f5 до …e6",
                "слон c8 завжди жертвують на h3",
                "у слов'янському слона немає",
                "різниці немає"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "the c6-pawn does not shut the bishop in, so it often reaches f5 before …e6",
                "the c8-bishop is always sacrificed on h3",
                "the Slav has no bishop",
                "there is no difference"
              ]
            }
          },
          {
            "id": "ch-d-slav-idea-p1",
            "type": "chess_puzzle",
            "promptUk": "Білі зарано зіграли e4, не забравши пішака c4. Удар у центр.",
            "promptEn": "White played e4 too early, without taking on c4. Strike in the centre.",
            "fen": "rnbqkbnr/pp2pppp/2p5/8/2pPP3/2N5/PP3PPP/R1BQKBNR b KQkq - 0 4",
            "solutionSans": [
              "e5"
            ],
            "difficulty": 2
          },
          {
            "id": "ch-d-slav-idea-m1",
            "type": "mcq",
            "promptUk": "Що таке напівслов'янський захист?",
            "promptEn": "What is the Semi-Slav Defence?",
            "options": [
              "одночасно …e6 і …c6; слон часто лишається всередині, зате є …b5",
              "те саме, що слов'янський, лише інша назва",
              "гамбіт з 2…c5",
              "мат у 2 ходи"
            ],
            "correctIndex": 0,
            "explanationUk": "Меран і московський варіант — уже інші плани, ніж чистий слов'янський з …Bf5.",
            "explanationEn": "The Meran and Moscow are already different plans from a pure Slav with …Bf5.",
            "optionsEn": [
              "…e6 and …c6 together; the bishop often stays inside, but …b5 appears",
              "the same as the Slav, just another name",
              "a gambit with 2…c5",
              "mate in two"
            ]
          },
          {
            "id": "ch-d-slav-idea-e",
            "type": "explain",
            "promptUk": "Яка головна ідея слов'янського і чим він відрізняється від напівслов'янського?",
            "promptEn": "What is the Slav’s main idea, and how does it differ from the Semi-Slav?",
            "keyIdeas": [
              {
                "labelUk": "Слон",
                "labelEn": "Bishop",
                "anyOf": [
                  "Bf5",
                  "слон",
                  "bishop",
                  "c6",
                  "e6"
                ]
              },
              {
                "labelUk": "a4",
                "labelEn": "a4",
                "anyOf": [
                  "a4",
                  "b5",
                  "dxc4"
                ]
              },
              {
                "labelUk": "Напівслов",
                "labelEn": "Semi-Slav",
                "anyOf": [
                  "напівслов",
                  "Semi",
                  "Меран",
                  "Meran",
                  "e6"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "У слов'янському пішак c6 тримає центр, а слон встигає на Bf5 до ходу e6. Білі часто грають a4 проти b5. Напівслов'янський (і Меран) — це вже e6 і c6 разом, з іншим планом.",
            "sampleAnswerEn": "In the Slav the c6-pawn holds the centre, and the bishop reaches Bf5 before e6. White often plays a4 against b5. The Semi-Slav (and the Meran) is e6 and c6 together, with a different plan."
          }
        ]
      },
      {
        "slug": "ch-d-london-idea",
        "titleUk": "Лондонська система: схема, не дерево ходів",
        "titleEn": "The London System: a setup, not a move-tree",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "ch-d-london-idea-l",
            "type": "chess_lesson",
            "promptUk": "Лондонська система: схема, не дерево ходів",
            "promptEn": "The London System: a setup, not a move-tree",
            "fen": "r1bq1rk1/pp3ppp/2nbpn2/2pp4/3P4/2PBPNB1/PP1N1PPP/R2QK2R b KQ - 2 8",
            "notesUk": "Лондонська система — це насамперед схема фігур, а не боротьба за кожен темп: білі ставлять Bf4, e3, c3, Nf3, Nbd2, Bd3 (або Be2) майже проти будь-якої відповіді чорних. На діаграмі типове розміщення після 1.d4 d5 2.Nf3 Nf6 3.Bf4 e6 4.e3 Bd6 5.Bg3 O-O 6.Nbd2 c5 7.c3 Nc6 8.Bd3: пішаковий «трикутник» c3–d4–e3 міцний, слон на g3 дивиться на діагональ, слон d3 дивиться на h7.\n\nПлан білих: кінь на e5, ферзь на f3 або h5, інколи c4, тиск на королівському фланзі. Система зручна, бо менше форсованої теорії, ніж у QGD. Але «менше теорії» не означає «можна не думати»: якщо чорні грають …c5 і …Qb6, треба захищати b2; якщо вони фіанкетують, плани інші.\n\nТипова помилка — автоматична жертва Bxh7, скопійована з грецького дарунка. Якщо на f6 стоїть кінь і немає чіткого Ng5 і Qh5, жертва часто просто віддає слона. Спочатку поставте коня на e5 і подивіться, чи король справді слабкий.\n\nЛондон Йобави (Nc3 і Bf4 без c3, часто з Nb5 або Qf3) — уже інша, більш агресивна схема. Не змішуйте її зі «спокійним» Лондоном.\n\nНе зубрити 15-ходові лондонські дерева. Вивчіть розстановку, хід Ne5, коли грати c4, і коли жертва на h7 не звучить.",
            "notesEn": "The London System is first of all a piece setup, not a fight for every tempo: White plays Bf4, e3, c3, Nf3, Nbd2, Bd3 (or Be2) against almost any Black reply. The diagram is a typical placement after 1.d4 d5 2.Nf3 Nf6 3.Bf4 e6 4.e3 Bd6 5.Bg3 O-O 6.Nbd2 c5 7.c3 Nc6 8.Bd3: the pawn triangle c3–d4–e3 is solid, the bishop on g3 eyes its diagonal, and Bd3 looks at h7.\n\nWhite’s plan: a knight on e5, the queen on f3 or h5, sometimes c4, kingside pressure. The system is convenient because there is less forced theory than in the QGD. But “less theory” does not mean “you can stop thinking”: if Black plays …c5 and …Qb6 you must defend b2; if they fianchetto, the plans change.\n\nA typical mistake is an automatic Bxh7, copied from the Greek Gift. If a knight sits on f6 and there is no clear Ng5 and Qh5, the sacrifice often just gives a bishop away. First plant the knight on e5 and ask whether the king is truly weak.\n\nThe Jobava London (Nc3 and Bf4 without c3, often with Nb5 or Qf3) is already a different, more aggressive setup. Do not mix it with the “calm” London.\n\nDo not memorise 15-move London trees. Learn the setup, the move Ne5, when to play c4, and when a sacrifice on h7 does not work.",
            "quiz": {
              "q": "Яка типова клітинка для коня білих у Лондоні?",
              "qEn": "What is the typical square for White’s knight in the London?",
              "options": [
                "e5",
                "a4",
                "h4 як єдиний хід",
                "b8"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "e5",
                "a4",
                "h4 as the only move",
                "b8"
              ]
            }
          },
          {
            "id": "ch-d-london-idea-p1",
            "type": "chess_puzzle",
            "promptUk": "Типовий стрибок лондонського коня на форпост.",
            "promptEn": "The typical London knight jump to the outpost.",
            "fen": "r1bqr1k1/pp3ppp/2nbpn2/2pp4/3P4/2PBPNB1/PP1N1PPP/R2QK2R w KQ - 3 9",
            "solutionSans": [
              "Ne5"
            ],
            "difficulty": 2
          },
          {
            "id": "ch-d-london-idea-m1",
            "type": "mcq",
            "promptUk": "Коли автоматична жертва Bxh7 у Лондоні зазвичай погана?",
            "promptEn": "When is an automatic Bxh7 sacrifice in the London usually bad?",
            "options": [
              "коли кінь чорних на f6 захищає h7 і немає чіткого Ng5 і Qh5",
              "завжди, в будь-якій позиції Лондон забороняє жертви",
              "ніколи: Bxh7 завжди ставить мат",
              "коли у білих немає слона"
            ],
            "correctIndex": 0,
            "explanationUk": "Спочатку Ne5 і оцінка короля, потім жертва — не навпаки.",
            "explanationEn": "First Ne5 and an assessment of the king, then the sacrifice — not the other way around.",
            "optionsEn": [
              "when Black’s knight on f6 defends h7 and there is no clear Ng5 and Qh5",
              "always: the London forbids sacrifices in any position",
              "never: Bxh7 always mates",
              "when White has no bishop"
            ]
          },
          {
            "id": "ch-d-london-idea-e",
            "type": "explain",
            "promptUk": "Чому Лондон — це схема, і яку роль відіграє кінь на e5?",
            "promptEn": "Why is the London a setup, and what is the role of a knight on e5?",
            "keyIdeas": [
              {
                "labelUk": "Схема",
                "labelEn": "Setup",
                "anyOf": [
                  "Bf4",
                  "c3",
                  "e3",
                  "схем",
                  "setup",
                  "Nbd2"
                ]
              },
              {
                "labelUk": "Форпост",
                "labelEn": "Outpost",
                "anyOf": [
                  "Ne5",
                  "форпост",
                  "outpost",
                  "e5"
                ]
              },
              {
                "labelUk": "Не Bxh7 завжди",
                "labelEn": "Not always Bxh7",
                "anyOf": [
                  "Bxh7",
                  "Nf6",
                  "автомат",
                  "automatic"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Лондон — схема Bf4, c3, e3, Nbd2, а не дерево ходів. Головний форпост — кінь Ne5. Жертву Bxh7 не грають автоматично, якщо Nf6 захищає короля.",
            "sampleAnswerEn": "The London is a setup — Bf4, c3, e3, Nbd2 — not a move-tree. The main outpost is the knight Ne5. You do not play Bxh7 automatically if Nf6 defends the king."
          }
        ]
      },
      {
        "slug": "ch-d-qg-plans",
        "titleUk": "Плани ферзевого гамбіту: Карлсбад і меншість",
        "titleEn": "Queen's Gambit plans: the Carlsbad and the minority",
        "baseXp": 24,
        "difficulty": 4,
        "exercises": [
          {
            "id": "ch-d-qg-plans-l",
            "type": "chess_lesson",
            "promptUk": "Плани ферзевого гамбіту: Карлсбад і меншість",
            "promptEn": "Queen's Gambit plans: the Carlsbad and the minority",
            "fen": "r1bqrnk1/pp2bppp/2p2n2/3p2B1/3P4/2NBP3/PPQ1NPPP/R4RK1 w - - 8 11",
            "notesUk": "Коли в ферзевому гамбіті білі міняють cxd5, а чорні відповідають …exd5, виникає карлсбадська структура: пішаки білих a2–b2–(немає c) і d4; у чорних a7–b7–c6–d5. У білих на ферзевому фланзі меншість (два пішаки проти трьох), і саме це — знаряддя атаки, не слабкість. На діаграмі типова позиція після розвитку: слон d3, ферзь c2, коні c3 і e2, тури на c- і f-лініях (або a і f).\n\nАтака меншості: b4, a4, b5. Мета — не «з'їсти пішака», а створити слабкість. Після b5 і розмінів у чорних лишається або відсталий пішак на c6, або ізолятор на d5, і білі тиснуть по лінії c. Це стратегія на 15–20 ходів, не тактика одного удару.\n\nІнші структури ферзевого комплексу, які варто розрізняти: ізолятор (пішак d4 без сусідів c і e) — атака фігурами, тиск e5, але ендшпіль часто важкий; висячі пішаки c і d — сила в динаміці, слабкість, якщо їх зупинити; прийнятий гамбіт із …c5 — симетричніший центр.\n\nПлан чорних проти меншості: не чекати пасивно, грати …Nf8–g6, …Bd6, контрудар …c5 або …Ne4, інколи …b5 самим, щоб зафіксувати фланг.\n\nНе зубрити конкретні 12 ходів карлсбадської партії Капабланки. Зрозумійте: меншість іде на b5, щоб зробити слабкість, а не щоб пробігти в ферзі на 5-му ході.",
            "notesEn": "When White exchanges cxd5 in the Queen's Gambit and Black recaptures …exd5, the Carlsbad structure appears: White pawns a2–b2–(no c) and d4; Black a7–b7–c6–d5. White has a minority on the queenside (two pawns against three), and that is a weapon, not a weakness. The diagram is a typical developed position: bishop d3, queen c2, knights c3 and e2, rooks on the c- and f-files (or a and f).\n\nThe minority attack: b4, a4, b5. The goal is not to “eat a pawn” but to create a weakness. After b5 and exchanges Black is left with either a backward pawn on c6 or an isolated pawn on d5, and White presses on the c-file. This is a 15–20-move strategy, not a one-blow tactic.\n\nOther Queen's-Gambit-family structures to tell apart: an isolani (a d4-pawn with no c- or e-neighbour) — piece attack and e5 pressure, but a difficult ending; hanging pawns on c and d — strength in dynamics, weakness if they are blocked; the Accepted Gambit with …c5 — a more symmetrical centre.\n\nBlack’s plan against the minority: do not wait passively; play …Nf8–g6, …Bd6, a counterstrike …c5 or …Ne4, sometimes …b5 yourself to freeze the flank.\n\nDo not memorise twelve specific moves of a Capablanca Carlsbad game. Understand: the minority goes to b5 to make a weakness, not to queen a pawn on move five.",
            "quiz": {
              "q": "Яка мета атаки меншості b4–b5 у карлсбадській структурі?",
              "qEn": "What is the goal of the b4–b5 minority attack in the Carlsbad structure?",
              "options": [
                "створити відсталого пішака на c6 або ізолятор на d5 і тиснути по лінії c",
                "поставити мат у 3 ходи",
                "віддати якість на b7",
                "зайняти коня на a3"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "to create a backward c6-pawn or an isolani on d5 and press on the c-file",
                "to mate in three",
                "to give up the exchange on b7",
                "to park a knight on a3"
              ]
            }
          },
          {
            "id": "ch-d-qg-plans-p1",
            "type": "chess_puzzle",
            "promptUk": "Карлсбад: почніть атаку меншості.",
            "promptEn": "Carlsbad: start the minority attack.",
            "fen": "r1bqrnk1/pp2bppp/2p2n2/3p2B1/3P4/2NBP3/PPQ1NPPP/R4RK1 w - - 8 11",
            "solutionSans": [
              "b4"
            ],
            "difficulty": 2
          },
          {
            "id": "ch-d-qg-plans-m1",
            "type": "mcq",
            "promptUk": "Чим ізолятор відрізняється від карлсбадської структури?",
            "promptEn": "How does an isolani differ from a Carlsbad structure?",
            "options": [
              "ізолятор — один пішак d без сусідів c і e; Карлсбад — пішакова ланцюгова пара c6–d5 проти меншості",
              "різниці немає",
              "ізолятор завжди виграє",
              "у Карлсбаді немає пішаків"
            ],
            "correctIndex": 0,
            "explanationUk": "Різні слабкості — різні плани: атака фігурами на ізоляторі, b4–b5 у Карлсбаді.",
            "explanationEn": "Different weaknesses — different plans: a piece attack with an isolani, b4–b5 in the Carlsbad.",
            "optionsEn": [
              "an isolani is a lone d-pawn with no c- or e-neighbour; the Carlsbad is the c6–d5 chain facing a minority",
              "there is no difference",
              "an isolani always wins",
              "the Carlsbad has no pawns"
            ]
          },
          {
            "id": "ch-d-qg-plans-e",
            "type": "explain",
            "promptUk": "Поясніть атаку меншості в карлсбадській структурі.",
            "promptEn": "Explain the minority attack in the Carlsbad structure.",
            "keyIdeas": [
              {
                "labelUk": "Карлсбад",
                "labelEn": "Carlsbad",
                "anyOf": [
                  "Карлсбад",
                  "Carlsbad",
                  "cxd5",
                  "c6",
                  "d5"
                ]
              },
              {
                "labelUk": "Меншість",
                "labelEn": "Minority",
                "anyOf": [
                  "меншіст",
                  "minority",
                  "b4",
                  "b5"
                ]
              },
              {
                "labelUk": "Слабкість",
                "labelEn": "Weakness",
                "anyOf": [
                  "відстал",
                  "backward",
                  "c6",
                  "ізолятор",
                  "isolani",
                  "лінії c",
                  "c-file"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Після cxd5 виникає карлсбадська структура. Атака меншості b4–b5 створює відсталого пішака на c6 або ізолятор і дає тиск по лінії c. Це план на багато ходів, не мат одразу.",
            "sampleAnswerEn": "After cxd5 the Carlsbad structure appears. The minority attack b4–b5 creates a backward c6-pawn or an isolani and gives pressure on the c-file. It is a many-move plan, not instant mate."
          }
        ]
      },
      {
        "slug": "ch-deep-qg-london-exam",
        "titleUk": "Іспит: ферзевий гамбіт і Лондон",
        "titleEn": "Exam: Queen's Gambit and London",
        "baseXp": 30,
        "difficulty": 4,
        "isExam": true,
        "passThreshold": 0.7,
        "exercises": [
          {
            "id": "ch-deep-qg-london-exam-q1",
            "type": "mcq",
            "promptUk": "У прийнятому ферзевому гамбіті чорним не варто:",
            "promptEn": "In the Queen's Gambit Accepted Black should not:",
            "options": [
              "рано тримати пішака c4 ходом …b5 без розвитку",
              "грати …c5 після розвитку",
              "повертати пішака",
              "виводити коня на f6"
            ],
            "correctIndex": 0,
            "explanationUk": "Раннє …b5 карається ходами a4 і часто Qf3.",
            "explanationEn": "An early …b5 is punished by a4 and often Qf3.",
            "optionsEn": [
              "cling to the c4-pawn with an early undeveloped …b5",
              "play …c5 after developing",
              "give the pawn back",
              "develop the knight to f6"
            ]
          },
          {
            "id": "ch-deep-qg-london-exam-q2",
            "type": "mcq",
            "promptUk": "Головна ідея слов'янського захисту — це:",
            "promptEn": "The main idea of the Slav Defence is:",
            "options": [
              "підтримати d5 пішаком c6 і вивести слона на f5 до …e6",
              "закрити слона ходом …e6 як у QGD і більше нічого",
              "жертва ферзя на a4",
              "мат на другому ході"
            ],
            "correctIndex": 0,
            "explanationUk": "Саме в цьому різниця з відмовленим гамбітом.",
            "explanationEn": "That is exactly the difference from the Declined Gambit.",
            "optionsEn": [
              "support d5 with the c6-pawn and get the bishop to f5 before …e6",
              "shut the bishop in with …e6 as in the QGD and nothing else",
              "a queen sacrifice on a4",
              "mate on move two"
            ]
          },
          {
            "id": "ch-deep-qg-london-exam-q3",
            "type": "mcq",
            "promptUk": "Типовий форпост лондонського коня — це:",
            "promptEn": "The typical London knight outpost is:",
            "options": [
              "e5",
              "a8",
              "h8",
              "b1 назавжди"
            ],
            "correctIndex": 0,
            "explanationUk": "З e5 кінь тисне на f7, d7, c6 і підтримує атаку.",
            "explanationEn": "From e5 the knight presses f7, d7, c6 and supports an attack.",
            "optionsEn": [
              "e5",
              "a8",
              "h8",
              "b1 forever"
            ]
          },
          {
            "id": "ch-deep-qg-london-exam-q4",
            "type": "mcq",
            "promptUk": "Мета атаки меншості — це:",
            "promptEn": "The goal of a minority attack is:",
            "options": [
              "створити слабкість (c6 або d5) і тиснути по лінії c",
              "провести пішака в ферзі за 3 ходи",
              "віддати всіх пішаків",
              "поставити пат"
            ],
            "correctIndex": 0,
            "explanationUk": "b4–b5 — стратегія слабкості, не гонка в ферзі.",
            "explanationEn": "b4–b5 is a weakness-strategy, not a race to queen.",
            "optionsEn": [
              "to create a weakness (c6 or d5) and press on the c-file",
              "to queen a pawn in three moves",
              "to give away every pawn",
              "to force stalemate"
            ]
          },
          {
            "id": "ch-deep-qg-london-exam-p5",
            "type": "chess_puzzle",
            "promptUk": "Після a4 c6 axb5 cxb5 знайдіть подвійний удар ферзя.",
            "promptEn": "After a4 c6 axb5 cxb5 find the queen’s double attack.",
            "fen": "rnbqkbnr/p3pppp/8/1p6/2pP4/4P3/1P3PPP/RNBQKBNR w KQkq - 0 6",
            "solutionSans": [
              "Qf3"
            ],
            "difficulty": 3
          },
          {
            "id": "ch-deep-qg-london-exam-p6",
            "type": "chess_puzzle",
            "promptUk": "Пастка Тарраша: перший хід комбінації, що повертає ферзя.",
            "promptEn": "The Tarrasch trap: the first move of the combination that wins the queen back.",
            "fen": "r1bqkb1r/pppn1ppp/5n2/3N2B1/3P4/8/PP2PPPP/R2QKBNR b KQkq - 0 6",
            "solutionSans": [
              "Nxd5"
            ],
            "difficulty": 3
          }
        ]
      }
    ]
  },
  {
    "slug": "ch-deep-sicilian-french",
    "titleUk": "Сицилійський і Французький",
    "titleEn": "Sicilian and French",
    "lessons": [
      {
        "slug": "ch-d-sic-open",
        "titleUk": "Відкритий сицилійський: структура, не 20 гілок",
        "titleEn": "The Open Sicilian: a structure, not 20 branches",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "ch-d-sic-open-l",
            "type": "chess_lesson",
            "promptUk": "Відкритий сицилійський: структура, не 20 гілок",
            "promptEn": "The Open Sicilian: a structure, not 20 branches",
            "fen": "rnbqkb1r/pp2pppp/3p1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R b KQkq - 2 5",
            "notesUk": "Відкритий сицилійський виникає після 1.e4 c5 2.Nf3 d6 (або 2…Nc6, 2…e6) 3.d4 cxd4 4.Nxd4. На діаграмі табія після 4…Nf6 5.Nc3: білі мають фору в розвитку і простір, чорні — двох центральних пішаків (d і e) проти одного білого на e4 і напіввідкриту лінію c. Саме ця структура спільна для Найдорфа, дракона, схевенингену і багатьох інших «імен».\n\nПлан білих: швидкий розвиток, рокіровка в короткий чи довгий бік, f4, Be3, Qd2; типові жертви коня на d5, f5 або e6, що розкривають центр. План чорних: …a6, …Be7 або …g6, …O-O, тиск по лінії c (…Qc7, …Rc8), прориви …d5 або …e6–e5. Хід …e5 дає простір, але залишає слабке поле d5 — туди білі і ставлять коня.\n\nТипове розміщення: білі — кінь d4, кінь c3, слони e2/e3 і e3/g5, ферзь d2; чорні — пішаки d6 і e6 або e5, слон e7, тура c8.\n\nНе зубрити всі відкриті сицилійські гілки як один дебют. Спочатку зрозумійте спільну структуру: лінія c, поле d5, гонка флангових атак, якщо рокіровки в різні боки.",
            "notesEn": "The Open Sicilian arises after 1.e4 c5 2.Nf3 d6 (or 2…Nc6, 2…e6) 3.d4 cxd4 4.Nxd4. The diagram is the tabiya after 4…Nf6 5.Nc3: White has a lead in development and space, Black has two central pawns (d and e) against White’s one on e4 and a half-open c-file. That structure is shared by the Najdorf, the Dragon, the Scheveningen and many other “names”.\n\nWhite’s plan: fast development, short or long castling, f4, Be3, Qd2; typical knight sacrifices on d5, f5 or e6 that rip the centre open. Black’s plan: …a6, …Be7 or …g6, …O-O, pressure on the c-file (…Qc7, …Rc8), breaks …d5 or …e6–e5. The move …e5 gains space but leaves a hole on d5 — and that is where White plants a knight.\n\nTypical placement: White — knight d4, knight c3, bishops e2/e3 and e3/g5, queen d2; Black — pawns d6 and e6 or e5, bishop e7, rook c8.\n\nDo not memorise every Open Sicilian branch as if it were one opening. First understand the shared structure: the c-file, the d5-square, and a race of flank attacks if the kings castle on opposite sides.",
            "quiz": {
              "q": "Яка спільна риса всіх відкритих сицилійських?",
              "qEn": "What feature is shared by all Open Sicilians?",
              "options": [
                "розмін …cxd4, напіввідкрита лінія c і боротьба за поле d5",
                "обов'язкове фіанкето g6 з першого ходу",
                "мат на 8-му ході",
                "відсутність коней"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "the exchange …cxd4, a half-open c-file and a fight for d5",
                "a mandatory g6-fianchetto from move one",
                "mate on move 8",
                "the absence of knights"
              ]
            }
          },
          {
            "id": "ch-d-sic-open-p1",
            "type": "chess_puzzle",
            "promptUk": "Сицилійський зі …e5: поставте коня на слабке поле.",
            "promptEn": "A Sicilian with …e5: plant the knight on the weak square.",
            "fen": "r1bqkb1r/5ppp/p1np1n2/1p2p1B1/4P3/N1N5/PPP2PPP/R2QKB1R w KQkq - 0 9",
            "solutionSans": [
              "Nd5"
            ],
            "difficulty": 3
          },
          {
            "id": "ch-d-sic-open-m1",
            "type": "mcq",
            "promptUk": "Чому хід …e5 у відкритому сицилійському — меч із двома лезами?",
            "promptEn": "Why is …e5 in the Open Sicilian a double-edged move?",
            "options": [
              "він дає простір, але залишає дірку на d5 для коня білих",
              "він завжди ставить мат",
              "він заборонений правилами",
              "він закриває власну туру назавжди"
            ],
            "correctIndex": 0,
            "explanationUk": "Поле d5 уже не контролює пішак e6, тому туди любить стати кінь.",
            "explanationEn": "The e6-pawn no longer covers d5, so a knight loves to sit there.",
            "optionsEn": [
              "it gains space but leaves a hole on d5 for a white knight",
              "it always mates",
              "it is forbidden by the rules",
              "it shuts in Black’s rook forever"
            ]
          },
          {
            "id": "ch-d-sic-open-e",
            "type": "explain",
            "promptUk": "Яка спільна структура відкритого сицилійського і які плани сторін?",
            "promptEn": "What is the shared Open Sicilian structure, and what are the plans?",
            "keyIdeas": [
              {
                "labelUk": "Лінія c",
                "labelEn": "c-file",
                "anyOf": [
                  "лінія c",
                  "c-file",
                  "cxd4",
                  "c5"
                ]
              },
              {
                "labelUk": "Поле d5",
                "labelEn": "The d5-square",
                "anyOf": [
                  "d5",
                  "e5",
                  "дірк",
                  "hole",
                  "слабк",
                  "weak"
                ]
              },
              {
                "labelUk": "Плани",
                "labelEn": "Plans",
                "anyOf": [
                  "f4",
                  "O-O-O",
                  "d5",
                  "Rc8",
                  "розвит",
                  "develop"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Після cxd4 у чорних напіввідкрита лінія c і два центральні пішаки. Поле d5 — ключове: після e5 туди стає кінь білих. Плани — розвиток, f4 або O-O-O у білих і тиск по лінії c у чорних.",
            "sampleAnswerEn": "After cxd4 Black has a half-open c-file and two central pawns. The d5-square is the key: after e5 a white knight sits there. The plans are development, f4 or O-O-O for White, and c-file pressure for Black."
          }
        ]
      },
      {
        "slug": "ch-d-sic-dragon",
        "titleUk": "Дракон і югославська атака",
        "titleEn": "The Dragon and the Yugoslav Attack",
        "baseXp": 24,
        "difficulty": 4,
        "exercises": [
          {
            "id": "ch-d-sic-dragon-l",
            "type": "chess_lesson",
            "promptUk": "Дракон і югославська атака",
            "promptEn": "The Dragon and the Yugoslav Attack",
            "fen": "r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/2KR1B1R b - - 4 9",
            "notesUk": "Дракон — сицилійський із …g6 і …Bg7: слон «дихає» по довгій діагоналі, як дракон у міфі. На діаграмі югославська атака після 6.Be3 Bg7 7.f3 O-O 8.Qd2 Nc6 9.O-O-O: білі рокірували в довгу, пішак f3 тримає e4 і готує g4, ферзь і слон дивляться на h6, щоб розміняти драконового слона.\n\nПлан білих — гонка на королівському фланзі: h4–h5, Bh6, розкрити лінію h і поставити мат. План чорних — гонка на ферзевому: …Rc8, жертва якості …Rxc3, що ламає пішакове прикриття короля, …Qa5, …Ne5–c4. Хто швидший, той виграє; «грати обережно в усі боки» тут часто програє обидві гонки.\n\nТипове розміщення чорних: слон g7, тура c8, ферзь a5, кінь e5 або c4. Білі: Be3, Qd2, O-O-O, Kb1 (корисна профілактика), h4, g4.\n\nНе зубрити 20 ходів югославської теорії. Зрозумійте гонку і ідею жертви …Rxc3: якість віддають не «за красу», а щоб розбити пішаків c2–c3 і відкрити короля. Якщо білі грають спокійніше (фіанкето слона на g2), плани інші — немає тієї самої гонки.",
            "notesEn": "The Dragon is a Sicilian with …g6 and …Bg7: the bishop “breathes” along the long diagonal, like a mythical dragon. The diagram is the Yugoslav Attack after 6.Be3 Bg7 7.f3 O-O 8.Qd2 Nc6 9.O-O-O: White has castled long, the f3-pawn holds e4 and prepares g4, and the queen and bishop eye h6 in order to trade off the dragon bishop.\n\nWhite’s plan is a kingside race: h4–h5, Bh6, open the h-file and mate. Black’s plan is a queenside race: …Rc8, the exchange sacrifice …Rxc3 that rips up the king’s pawn cover, …Qa5, …Ne5–c4. The faster side wins; “playing carefully in every direction” often loses both races.\n\nTypical placement: Black — bishop g7, rook c8, queen a5, knight e5 or c4. White — Be3, Qd2, O-O-O, Kb1 (useful prophylaxis), h4, g4.\n\nDo not memorise 20 moves of Yugoslav theory. Understand the race and the idea of …Rxc3: the exchange is given not “for beauty” but to smash the c2–c3 pawns and open the king. If White plays more quietly (a fianchetto on g2), the plans are different — there is no such race.",
            "quiz": {
              "q": "Навіщо в драконі чорні жертвують якість на c3?",
              "qEn": "Why does Black sacrifice the exchange on c3 in the Dragon?",
              "options": [
                "щоб розбити пішакове прикриття білого короля і відкрити лінії атаки",
                "щоб негайно поставити пат",
                "бо тура завжди слабша за пішака c3",
                "це єдиний легальний хід"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "to smash the pawn cover around the white king and open attacking lines",
                "to force stalemate at once",
                "because a rook is always weaker than the c3-pawn",
                "it is the only legal move"
              ]
            }
          },
          {
            "id": "ch-d-sic-dragon-p1",
            "type": "chess_puzzle",
            "promptUk": "Югославська атака: тематична жертва якості.",
            "promptEn": "Yugoslav Attack: the thematic exchange sacrifice.",
            "fen": "2rq1rk1/pp1bppbp/3p1np1/4n3/3NP2P/1BN1BP2/PPPQ2P1/2KR3R b - - 0 12",
            "solutionSans": [
              "Rxc3"
            ],
            "difficulty": 3
          },
          {
            "id": "ch-d-sic-dragon-m1",
            "type": "mcq",
            "promptUk": "Що є планом білих у югославській атаці?",
            "promptEn": "What is White’s plan in the Yugoslav Attack?",
            "options": [
              "h4–h5, Bh6, розкрити лінію h і атакувати короля",
              "здати ферзя на a1",
              "розіграти берлінський ендшпіль",
              "ніколи не рокірувати"
            ],
            "correctIndex": 0,
            "explanationUk": "Це гонка: білі на лінії h, чорні на лінії c.",
            "explanationEn": "It is a race: White on the h-file, Black on the c-file.",
            "optionsEn": [
              "h4–h5, Bh6, open the h-file and attack the king",
              "give the queen on a1",
              "steer into a Berlin ending",
              "never castle"
            ]
          },
          {
            "id": "ch-d-sic-dragon-e",
            "type": "explain",
            "promptUk": "Поясніть гонку в югославській атаці і ідею Rxc3.",
            "promptEn": "Explain the Yugoslav Attack race and the idea of Rxc3.",
            "keyIdeas": [
              {
                "labelUk": "Гонка",
                "labelEn": "Race",
                "anyOf": [
                  "гонка",
                  "race",
                  "h4",
                  "h5",
                  "O-O-O"
                ]
              },
              {
                "labelUk": "Жертва",
                "labelEn": "Sacrifice",
                "anyOf": [
                  "Rxc3",
                  "якост",
                  "exchange",
                  "c3"
                ]
              },
              {
                "labelUk": "Слон",
                "labelEn": "Dragon bishop",
                "anyOf": [
                  "Bg7",
                  "Bh6",
                  "дракон",
                  "Dragon",
                  "g6"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "У югославській атаці білі рокірують O-O-O і біжать h4–h5, часто з Bh6 проти драконового слона. Чорні відповідають гонкою по лінії c і жертвою якості Rxc3, щоб розбити прикриття короля.",
            "sampleAnswerEn": "In the Yugoslav Attack White castles O-O-O and races h4–h5, often with Bh6 against the dragon bishop. Black answers with a c-file race and the exchange sacrifice Rxc3, to smash the king’s cover."
          }
        ]
      },
      {
        "slug": "ch-d-sic-najdorf",
        "titleUk": "Найдорф: гнучкість і поле d5",
        "titleEn": "The Najdorf: flexibility and the d5-square",
        "baseXp": 24,
        "difficulty": 4,
        "exercises": [
          {
            "id": "ch-d-sic-najdorf-l",
            "type": "chess_lesson",
            "promptUk": "Найдорф: гнучкість і поле d5",
            "promptEn": "The Najdorf: flexibility and the d5-square",
            "fen": "rn1q1rk1/1p2bppp/p2pbn2/4p3/4P3/1NN1BP2/PPPQ2PP/2KR1B1R b - - 4 10",
            "notesUk": "Найдорф — 1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 a6. Хід …a6 запобігає стрибку коня на b5 і готує …b5. Це найгнучкіший відкритий сицилійський: чорні ще не визначились із …e5, …e6 чи …g6. На діаграмі англійська атака після 6.Be3 e5 7.Nb3 Be6 8.f3 Be7 9.Qd2 O-O 10.O-O-O: чорні вже зіграли …e5, і поле d5 — дірка, яку білі хочуть зайняти конем.\n\nПлан білих в англійській атаці: Be3, Qd2, f3, O-O-O, g4, h4 — знову гонка, як у драконі, але проти іншої структури. Кінь часто йде на d5; якщо чорні його беруть, після exd5 відкривається лінія e і змінюється малюнок центру. План чорних: …b5, …Nbd7, …Qc7, …Rc8, контрудар …d5, коли він підготовлений, і не забувати про дірку d5.\n\nІнша велика гілка — 6.Bg5 e6 7.f4, де існує «отруєний пішак» 7…Qb6, що бере на b2. Це одна з найгостріших теорій у шахах. На рівні цього курсу досить знати, що пішак отруєний не тому, що його «не можна брати правилами», а тому, що за нього платять багато темпів.\n\nНе зубрити 25 ходів отруєного пішака. Для практичного репертуару: розумійте …a6, дірку d5 після …e5, і виберіть одну схему за білих (англійська атака або спокійніше Be2).",
            "notesEn": "The Najdorf is 1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 a6. The move …a6 prevents a knight jump to b5 and prepares …b5. It is the most flexible Open Sicilian: Black has not yet committed to …e5, …e6 or …g6. The diagram is the English Attack after 6.Be3 e5 7.Nb3 Be6 8.f3 Be7 9.Qd2 O-O 10.O-O-O: Black has already played …e5, and d5 is a hole White wants to occupy with a knight.\n\nWhite’s plan in the English Attack: Be3, Qd2, f3, O-O-O, g4, h4 — again a race, as in the Dragon, but against a different structure. The knight often goes to d5; if Black takes it, exd5 opens the e-file and changes the central picture. Black’s plan: …b5, …Nbd7, …Qc7, …Rc8, a counterstrike …d5 when it is prepared, and never forget the d5-hole.\n\nThe other great branch is 6.Bg5 e6 7.f4, where the “Poisoned Pawn” 7…Qb6 takes on b2. It is some of the sharpest theory in chess. At this course’s level it is enough to know that the pawn is poisoned not because the rules forbid taking it, but because you pay for it in many tempi.\n\nDo not memorise 25 moves of the Poisoned Pawn. For a practical repertoire: understand …a6, the d5-hole after …e5, and pick one White scheme (the English Attack, or a calmer Be2).",
            "quiz": {
              "q": "Навіщо в Найдорфі чорні грають 5…a6?",
              "qEn": "Why does Black play 5…a6 in the Najdorf?",
              "options": [
                "щоб не пустити коня на b5 і підготувати …b5",
                "щоб одразу поставити мат",
                "щоб віддати туру на a6",
                "це єдиний захист від шаха"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "to keep a knight out of b5 and to prepare …b5",
                "to mate at once",
                "to give the rook on a6",
                "it is the only defence to a check"
              ]
            }
          },
          {
            "id": "ch-d-sic-najdorf-p1",
            "type": "chess_puzzle",
            "promptUk": "Найдорф із …e5: займіть дірку конем.",
            "promptEn": "A Najdorf with …e5: occupy the hole with a knight.",
            "fen": "rn1q1rk1/1p2bppp/p2pbn2/4p3/4P3/1NN1B3/PPPQ1PPP/2KR3R w - - 0 1",
            "solutionSans": [
              "Nd5"
            ],
            "difficulty": 3
          },
          {
            "id": "ch-d-sic-najdorf-m1",
            "type": "mcq",
            "promptUk": "Чому пішак b2 у варіанті 6.Bg5 називають «отруєним»?",
            "promptEn": "Why is the b2-pawn in the 6.Bg5 line called “poisoned”?",
            "options": [
              "його можна взяти, але чорні платять багатьма темпами розвитку",
              "правила забороняють брати на b2",
              "він завжди захищений матом у 1",
              "ферзь чорних не може ходити на b6"
            ],
            "correctIndex": 0,
            "explanationUk": "Отрута — у темпах, не в забороні ходу.",
            "explanationEn": "The poison is in the tempi, not in a ban on the move.",
            "optionsEn": [
              "it can be taken, but Black pays with many developing tempi",
              "the rules forbid taking on b2",
              "it is always guarded by mate in one",
              "Black’s queen cannot go to b6"
            ]
          },
          {
            "id": "ch-d-sic-najdorf-e",
            "type": "explain",
            "promptUk": "Яка ідея ходу …a6 і що змінює …e5?",
            "promptEn": "What is the idea of …a6, and what does …e5 change?",
            "keyIdeas": [
              {
                "labelUk": "a6",
                "labelEn": "a6",
                "anyOf": [
                  "a6",
                  "b5",
                  "Nb5",
                  "гнучк",
                  "flexib"
                ]
              },
              {
                "labelUk": "d5",
                "labelEn": "d5",
                "anyOf": [
                  "d5",
                  "e5",
                  "дірк",
                  "hole",
                  "Nd5"
                ]
              },
              {
                "labelUk": "Атака",
                "labelEn": "Attack",
                "anyOf": [
                  "Be3",
                  "Qd2",
                  "O-O-O",
                  "отруєн",
                  "Poisoned"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Хід a6 не пускає коня на Nb5 і готує b5 — у цьому гнучкість Найдорфа. Після e5 з'являється дірка d5, куди білі ставлять Nd5. Англійська атака (Be3, Qd2, O-O-O) — одна зі схем; отруєний пішак не варто зубріти напам'ять.",
            "sampleAnswerEn": "The move a6 keeps a knight out of Nb5 and prepares b5 — that is the Najdorf’s flexibility. After e5 a hole appears on d5, and White plants Nd5. The English Attack (Be3, Qd2, O-O-O) is one scheme; do not memorise the Poisoned Pawn by heart."
          }
        ]
      },
      {
        "slug": "ch-d-fr-advance",
        "titleUk": "Французький захист: просування",
        "titleEn": "The French Defence: the Advance",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "ch-d-fr-advance-l",
            "type": "chess_lesson",
            "promptUk": "Французький захист: просування",
            "promptEn": "The French Defence: the Advance",
            "fen": "r1b1kbnr/pp3ppp/1qn1p3/2ppP3/3P4/P1P2N2/1P3PPP/RNBQKB1R b KQkq - 0 6",
            "notesUk": "Французький захист — 1.e4 e6 2.d4 d5. У варіанті просування білі закривають центр 3.e5. Вони отримують простір, але чорний світлопольний слон лишається «поганим» за ланцюгом e6–d5 — головна стратегічна тема французької. На діаграмі типове розміщення після 3…c5 4.c3 Nc6 5.Nf3 Qb6 6.a3: чорні вже тиснуть на d4 ферзем і конем, білі тримають ланцюг c3–d4–e5.\n\nПлан чорних: підривати основу ланцюга ходом …c5, тиснути на d4 (…Qb6, …Nc6, …Nge7–f5), інколи другий підрив …f6. Слона c8 треба колись вивести на d7 або через …b6 і …Ba6. План білих: тримати d4, розвинути слона на d3 (він дивиться на h7), Be3, O-O, і не віддати центр без компенсації.\n\nТематична тактика — гамбіт Мілнера-Баррі: якщо білі грають Bd3 і залишають пішака d4 під ударом, чорні можуть взяти …cxd4 cxd4 Nxd4 Nxd4 Qxd4. Пішак виграно, але білі отримують розвиток і тиск. Рахуйте, не беріть «на автоматі».\n\nНе замикайте слона назавжди і не забувайте прорив …c5. Не зубрити 15 ходів кожної бокової гілки Advance: структура і два підриви (…c5 і …f6) важливіші.",
            "notesEn": "The French Defence is 1.e4 e6 2.d4 d5. In the Advance Variation White closes the centre with 3.e5. They gain space, but Black’s light-squared bishop stays “bad” behind the e6–d5 chain — the main strategic theme of the French. The diagram is a typical placement after 3…c5 4.c3 Nc6 5.Nf3 Qb6 6.a3: Black is already pressing d4 with queen and knight, White holds the chain c3–d4–e5.\n\nBlack’s plan: undermine the base of the chain with …c5, press d4 (…Qb6, …Nc6, …Nge7–f5), sometimes a second break …f6. The c8-bishop must eventually come out to d7 or via …b6 and …Ba6. White’s plan: hold d4, develop the bishop to d3 (it eyes h7), Be3, O-O, and do not give the centre away without compensation.\n\nA thematic tactic is the Milner-Barry Gambit: if White plays Bd3 and leaves d4 hanging, Black can take …cxd4 cxd4 Nxd4 Nxd4 Qxd4. A pawn is won, but White gets development and pressure. Calculate; do not take on autopilot.\n\nDo not lock the bishop in forever, and do not forget the …c5 break. Do not memorise 15 moves of every Advance sideline: the structure and the two breaks (…c5 and …f6) matter more.",
            "quiz": {
              "q": "Який головний прорив чорних у французькому просуванні?",
              "qEn": "What is Black’s main break in the French Advance?",
              "options": [
                "…c5, підрив основи пішакового ланцюга",
                "…h5–h4 без розвитку",
                "…Na6–b8 назад",
                "рокіровка в довгу на другому ході"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "…c5, undermining the base of the pawn chain",
                "…h5–h4 without development",
                "…Na6–b8 backwards",
                "castling long on move two"
              ]
            }
          },
          {
            "id": "ch-d-fr-advance-p1",
            "type": "chess_puzzle",
            "promptUk": "Гамбіт Мілнера-Баррі: після …cxd4 cxd4 заберіть центрального пішака конем.",
            "promptEn": "The Milner-Barry Gambit: after …cxd4 cxd4 take the central pawn with the knight.",
            "fen": "r1b1kbnr/pp3ppp/1qn1p3/3pP3/3P4/3B1N2/PP3PPP/RNBQK2R b KQkq - 0 7",
            "solutionSans": [
              "Nxd4"
            ],
            "difficulty": 3
          },
          {
            "id": "ch-d-fr-advance-m1",
            "type": "mcq",
            "promptUk": "Чому світлопольний слон чорних у французькій «поганий»?",
            "promptEn": "Why is Black’s light-squared bishop “bad” in the French?",
            "options": [
              "він закритий власним ланцюгом e6–d5",
              "слонів у французькій немає",
              "він завжди на g7",
              "правила забороняють йому ходити"
            ],
            "correctIndex": 0,
            "explanationUk": "Це головна стратегічна ціна ходу 1…e6. Його треба колись визволити.",
            "explanationEn": "That is the main strategic cost of 1…e6. It has to be freed eventually.",
            "optionsEn": [
              "it is locked behind Black’s own e6–d5 chain",
              "the French has no bishops",
              "it is always on g7",
              "the rules forbid it to move"
            ]
          },
          {
            "id": "ch-d-fr-advance-e",
            "type": "explain",
            "promptUk": "Які плани сторін у французькому просуванні?",
            "promptEn": "What are the plans in the French Advance?",
            "keyIdeas": [
              {
                "labelUk": "Ланцюг",
                "labelEn": "Chain",
                "anyOf": [
                  "e5",
                  "c3",
                  "d4",
                  "ланцюг",
                  "chain"
                ]
              },
              {
                "labelUk": "Підрив",
                "labelEn": "Break",
                "anyOf": [
                  "c5",
                  "f6",
                  "Qb6",
                  "підрив",
                  "break",
                  "undermin"
                ]
              },
              {
                "labelUk": "Слон",
                "labelEn": "Bishop",
                "anyOf": [
                  "поган",
                  "bad",
                  "e6",
                  "слон",
                  "bishop"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Білі тримають ланцюг c3–d4–e5 і простір. Чорні підривають його ходами c5 і іноді f6, тиснуть на d4 ферзем Qb6. Слон за e6 — поганий, його треба визволити.",
            "sampleAnswerEn": "White holds the chain c3–d4–e5 and the space. Black undermines it with c5 and sometimes f6, and presses d4 with the queen Qb6. The bishop behind e6 is bad and must be freed."
          }
        ]
      },
      {
        "slug": "ch-d-fr-winawer",
        "titleUk": "Французький вінавер: подвоєні пішаки і Qg4",
        "titleEn": "The French Winawer: doubled pawns and Qg4",
        "baseXp": 24,
        "difficulty": 4,
        "exercises": [
          {
            "id": "ch-d-fr-winawer-l",
            "type": "chess_lesson",
            "promptUk": "Французький вінавер: подвоєні пішаки і Qg4",
            "promptEn": "The French Winawer: doubled pawns and Qg4",
            "fen": "rnbqk2r/pp2nppp/4p3/2ppP3/3P2Q1/P1P5/2P2PPP/R1B1KBNR b KQkq - 2 7",
            "notesUk": "Вінавер — найгостріша французька гілка: 3.Nc3 Bb4 4.e5 c5 5.a3 Bxc3+ 6.bxc3. Чорні віддають пару слонів і псують білим пішаків (подвоєні c2–c3), зате білі отримують центр, лінію b і сильного темнопольного слона. На діаграмі головне продовження 6…Ne7 7.Qg4: ферзь одразу нападає на g7.\n\nПлан білих: атака на королівському фланзі (Qg4, h4, або взяття на g7), утримання центру, інколи Ba3, що заважає рокіровці. План чорних: не рокірувати «на автоматі» під ферзя — часто грають 7…Qc7 (залишаючи g7) або 7…Kf8; тиск на c3 і d4 ходами …Qa5, …cxd4; виведення слона c8. Якщо білі беруть 8.Qxg7, чорні відповідають …Rg8 і атакують по відкритих лініях — це теж «отруєний» пішак.\n\nТипове розміщення: білі — ферзь g4 або g7, пішаки a3–c3–c2–d4–e5, слон a3 або d3; чорні — кінь e7, ферзь c7, пішаки c5 і d5.\n\nНе рокіруйте в коротку, не подивившись на Qg4. Не зубрити всі 20-ходові вінаверівські дерева: розумійте подвоєні пішаки, удар по g7 і те, що король може лишитись у центрі.",
            "notesEn": "The Winawer is the sharpest French branch: 3.Nc3 Bb4 4.e5 c5 5.a3 Bxc3+ 6.bxc3. Black gives up the bishop pair and spoils White’s pawns (doubled c2–c3), while White gets the centre, the b-file and a strong dark-squared bishop. The diagram is the main continuation 6…Ne7 7.Qg4: the queen attacks g7 at once.\n\nWhite’s plan: a kingside attack (Qg4, h4, or taking on g7), holding the centre, sometimes Ba3 that hinders castling. Black’s plan: do not castle “on autopilot” into the queen — they often play 7…Qc7 (leaving g7) or 7…Kf8; pressure c3 and d4 with …Qa5, …cxd4; develop the c8-bishop. If White takes 8.Qxg7, Black answers …Rg8 and attacks on the open files — that pawn is “poisoned” too.\n\nTypical placement: White — queen on g4 or g7, pawns a3–c3–c2–d4–e5, bishop a3 or d3; Black — knight e7, queen c7, pawns c5 and d5.\n\nDo not castle short without looking at Qg4. Do not memorise every 20-move Winawer tree: understand the doubled pawns, the hit on g7, and that the king may stay in the centre.",
            "quiz": {
              "q": "Чому в вінавері чорні не завжди рокірують у коротку після 7.Qg4?",
              "qEn": "Why does Black not always castle short in the Winawer after 7.Qg4?",
              "options": [
                "ферзь уже напав на g7, і коротка рокіровка може поставити короля під готову атаку",
                "рокіровка в цій позиції заборонена правилами",
                "у чорних немає коня",
                "білі вже поставили мат"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "the queen already attacks g7, and short castling may put the king under a ready-made attack",
                "castling is illegal in this position",
                "Black has no knight",
                "White has already mated"
              ]
            }
          },
          {
            "id": "ch-d-fr-winawer-p1",
            "type": "chess_puzzle",
            "promptUk": "Після 7.Qg4 зіграйте головний хід чорних, що лишає пішака g7 і тисне по лінії c.",
            "promptEn": "After 7.Qg4 play Black’s main move, which leaves the g7-pawn and presses the c-file.",
            "fen": "rnbqk2r/pp2nppp/4p3/2ppP3/3P2Q1/P1P5/2P2PPP/R1B1KBNR b KQkq - 2 7",
            "solutionSans": [
              "Qc7"
            ],
            "difficulty": 2
          },
          {
            "id": "ch-d-fr-winawer-m1",
            "type": "mcq",
            "promptUk": "Що отримують білі і що віддають після 5…Bxc3+ 6.bxc3?",
            "promptEn": "What does White gain and give after 5…Bxc3+ 6.bxc3?",
            "options": [
              "отримують центр, лінію b і темнопольного слона; віддають структуру (подвоєні c-пішаки)",
              "отримують зайвого ферзя",
              "віддають усіх пішаків",
              "форсований мат"
            ],
            "correctIndex": 0,
            "explanationUk": "Це стратегічна угода вінавера, не випадковий розмін.",
            "explanationEn": "This is the Winawer’s strategic bargain, not a random trade.",
            "optionsEn": [
              "they gain the centre, the b-file and the dark-squared bishop; they give up structure (doubled c-pawns)",
              "they gain an extra queen",
              "they give away every pawn",
              "forced mate"
            ]
          },
          {
            "id": "ch-d-fr-winawer-e",
            "type": "explain",
            "promptUk": "Яка стратегічна угода вінавера і що робить хід Qg4?",
            "promptEn": "What is the Winawer’s strategic bargain, and what does Qg4 do?",
            "keyIdeas": [
              {
                "labelUk": "Подвоєні",
                "labelEn": "Doubled",
                "anyOf": [
                  "подвоєн",
                  "doubled",
                  "c3",
                  "Bxc3"
                ]
              },
              {
                "labelUk": "Qg4",
                "labelEn": "Qg4",
                "anyOf": [
                  "Qg4",
                  "g7",
                  "Qc7",
                  "Kf8"
                ]
              },
              {
                "labelUk": "Рокіровка",
                "labelEn": "Castling",
                "anyOf": [
                  "рокір",
                  "castl",
                  "атак",
                  "attack",
                  "центр",
                  "centre",
                  "center"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Після Bxc3 білі мають подвоєні пішаки на c3, зате центр і слона. Хід Qg4 б'є на g7, тому чорні часто грають Qc7 або Kf8 і не рокірують автоматично під атаку.",
            "sampleAnswerEn": "After Bxc3 White has doubled pawns on c3, but also the centre and a bishop. The move Qg4 hits g7, so Black often plays Qc7 or Kf8 and does not castle automatically into the attack."
          }
        ]
      },
      {
        "slug": "ch-deep-sicilian-french-exam",
        "titleUk": "Іспит: сицилійський і французький",
        "titleEn": "Exam: Sicilian and French",
        "baseXp": 30,
        "difficulty": 4,
        "isExam": true,
        "passThreshold": 0.7,
        "exercises": [
          {
            "id": "ch-deep-sicilian-french-exam-q1",
            "type": "mcq",
            "promptUk": "Після …e5 у відкритому сицилійському слабким стає поле:",
            "promptEn": "After …e5 in the Open Sicilian the weak square is:",
            "options": [
              "d5",
              "h8",
              "a1",
              "b8"
            ],
            "correctIndex": 0,
            "explanationUk": "Пішак більше не контролює d5 з e6 — туди йде кінь білих.",
            "explanationEn": "The pawn no longer covers d5 from e6 — a white knight goes there.",
            "optionsEn": [
              "d5",
              "h8",
              "a1",
              "b8"
            ]
          },
          {
            "id": "ch-deep-sicilian-french-exam-q2",
            "type": "mcq",
            "promptUk": "Ідея жертви …Rxc3 у драконі — це:",
            "promptEn": "The idea of the …Rxc3 sacrifice in the Dragon is:",
            "options": [
              "розбити прикриття білого короля після довгої рокіровки",
              "поставити пат",
              "виграти пішака a2 і здатися",
              "забрати власного слона"
            ],
            "correctIndex": 0,
            "explanationUk": "Якість віддають за відкритого короля, не «за красу».",
            "explanationEn": "The exchange is given for an exposed king, not “for beauty”.",
            "optionsEn": [
              "to smash the cover of the white king after long castling",
              "to force stalemate",
              "to win the a2-pawn and resign",
              "to take your own bishop"
            ]
          },
          {
            "id": "ch-deep-sicilian-french-exam-q3",
            "type": "mcq",
            "promptUk": "У французькому вінавері після 7.Qg4 чорним часто варто:",
            "promptEn": "In the French Winawer after 7.Qg4 Black should often:",
            "options": [
              "не рокірувати автоматично, а грати …Qc7 або …Kf8",
              "завжди рокірувати в коротку негайно",
              "віддати ферзя на a5",
              "зіграти …g5"
            ],
            "correctIndex": 0,
            "explanationUk": "Ферзь уже дивиться на g7.",
            "explanationEn": "The queen already eyes g7.",
            "optionsEn": [
              "not castle automatically, but play …Qc7 or …Kf8",
              "always castle short at once",
              "give the queen on a5",
              "play …g5"
            ]
          },
          {
            "id": "ch-deep-sicilian-french-exam-q4",
            "type": "mcq",
            "promptUk": "Головний підрив чорних у французькому просуванні — це:",
            "promptEn": "Black’s main break in the French Advance is:",
            "options": [
              "…c5",
              "…h6 як єдиний план",
              "…a5–a4 без ідеї",
              "здача на 5-му ході"
            ],
            "correctIndex": 0,
            "explanationUk": "Б'ють по основі ланцюга d4, який тримає пішака e5.",
            "explanationEn": "They hit the base of the chain, d4, which supports the e5-pawn.",
            "optionsEn": [
              "…c5",
              "…h6 as the only plan",
              "…a5–a4 with no idea",
              "resigning on move 5"
            ]
          },
          {
            "id": "ch-deep-sicilian-french-exam-p5",
            "type": "chess_puzzle",
            "promptUk": "Після …Nxd4 Nxd4 заберіть пішака ферзем.",
            "promptEn": "After …Nxd4 Nxd4 take the pawn with the queen.",
            "fen": "r1b1kbnr/pp3ppp/1q2p3/3pP3/3N4/3B4/PP3PPP/RNBQK2R b KQkq - 0 8",
            "solutionSans": [
              "Qxd4"
            ],
            "difficulty": 2
          },
          {
            "id": "ch-deep-sicilian-french-exam-p6",
            "type": "chess_puzzle",
            "promptUk": "Білі можуть взяти «отруєного» пішака вінавера. Зробіть взяття.",
            "promptEn": "White can take the Winawer’s “poisoned” pawn. Take it.",
            "fen": "rnb1k2r/ppq1nppp/4p3/2ppP3/3P2Q1/P1P5/2P2PPP/R1B1KBNR w KQkq - 3 8",
            "solutionSans": [
              "Qxg7"
            ],
            "difficulty": 2
          },
          {
            "id": "ch-deep-sicilian-french-exam-p7",
            "type": "chess_puzzle",
            "promptUk": "Відкритий сицилійський: жертва коня на e6 (тематичний удар).",
            "promptEn": "Open Sicilian: the thematic knight sacrifice on e6.",
            "fen": "r1bqkb1r/pp3ppp/2n1pn2/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 1",
            "solutionSans": [
              "Nxe6"
            ],
            "difficulty": 3
          }
        ]
      }
    ]
  },
  {
    "slug": "ch-deep-caro-kid",
    "titleUk": "Каро–Канн і староіндійський",
    "titleEn": "Caro-Kann and King's Indian",
    "lessons": [
      {
        "slug": "ch-d-caro-class",
        "titleUk": "Каро–Канн класичний: слон уже зовні",
        "titleEn": "The Classical Caro-Kann: the bishop is already out",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "ch-d-caro-class-l",
            "type": "chess_lesson",
            "promptUk": "Каро–Канн класичний: слон уже зовні",
            "promptEn": "The Classical Caro-Kann: the bishop is already out",
            "fen": "r2qkbnr/pp1nppp1/2p4p/7P/3P4/3Q1NN1/PPP2PP1/R1B1K2R b KQkq - 0 10",
            "notesUk": "Каро–Канн починається 1.e4 c6 2.d4 d5. Ідея та сама, що у французькій — підперти центр, — але пішак c6 не закриває світлопольного слона. У класичному варіанті 3.Nc3 dxe4 4.Nxe4 чорні грають 4…Bf5: слон виходить до того, як з'явиться …e6. Далі типово 5.Ng3 Bg6 6.h4 h6 7.Nf3 Nd7 8.h5 Bh7 9.Bd3 Bxd3 10.Qxd3 — саме ця структура на діаграмі: пішак білих уже на h5, ферзь на d3, чорні мають міцну, трохи пасивну позицію і «діру» на g6.\n\nПлан білих: простір, тиск по лінії e, інколи довга рокіровка і атака; пішак h5 фіксує королівський фланг. План чорних: …e6, …Ngf6, …Be7, коротка рокіровка, пізніше …c5. Позиція солідна: чорні рідко «горять» рано, але мають менше простору.\n\nВідома пастка: після 4.Nxe4 Nd7 5.Qe2 хід 5…Ngf6?? отримує 6.Nd6#! Кінь ставить мат, бо клітинка d6 не захищена, а король затиснений власними фігурами. Запам'ятайте цю картинку — вона коштувала очок навіть майстрам.\n\nНе зубрити 12 ходів «остаточного» класичного. Зрозумійте: слон виходить на f5, h4–h5 — типовий тиск, і ніколи не грайте …Ngf6, коли ферзь на e2 і кінь на e4 дивляться на d6.",
            "notesEn": "The Caro-Kann starts 1.e4 c6 2.d4 d5. The idea is the same as in the French — support the centre — but the c6-pawn does not shut in the light-squared bishop. In the Classical, 3.Nc3 dxe4 4.Nxe4, Black plays 4…Bf5: the bishop comes out before …e6 appears. The typical sequel is 5.Ng3 Bg6 6.h4 h6 7.Nf3 Nd7 8.h5 Bh7 9.Bd3 Bxd3 10.Qxd3 — that is the structure in the diagram: White’s pawn is already on h5, the queen on d3, Black has a solid, slightly passive position and a “hole” on g6.\n\nWhite’s plan: space, pressure on the e-file, sometimes long castling and an attack; the h5-pawn fixes the kingside. Black’s plan: …e6, …Ngf6, …Be7, short castle, later …c5. The position is solid: Black rarely “burns” early, but they have less space.\n\nA famous trap: after 4.Nxe4 Nd7 5.Qe2 the move 5…Ngf6?? runs into 6.Nd6#! The knight mates because d6 is undefended and the king is boxed in by its own pieces. Remember this picture — it has cost points even to masters.\n\nDo not memorise 12 moves of a “final” Classical. Understand: the bishop goes to f5, h4–h5 is typical pressure, and never play …Ngf6 when the queen on e2 and the knight on e4 eye d6.",
            "quiz": {
              "q": "Чим класичний Каро–Канн вигідніший за французьку щодо слона c8?",
              "qEn": "How is the Classical Caro-Kann better than the French for the c8-bishop?",
              "options": [
                "слон встигає вийти на f5 до ходу …e6",
                "слон жертвується на a3 завжди",
                "у Каро–Канн немає слонів",
                "різниці немає"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "the bishop gets out to f5 before …e6",
                "the bishop is always sacrificed on a3",
                "the Caro-Kann has no bishops",
                "there is no difference"
              ]
            }
          },
          {
            "id": "ch-d-caro-class-p1",
            "type": "chess_puzzle",
            "promptUk": "Пастка Каро–Канн: після 5.Qe2 Ngf6?? поставте мат конем.",
            "promptEn": "The Caro-Kann trap: after 5.Qe2 Ngf6?? mate with the knight.",
            "fen": "r1bqkb1r/pp1npppp/2p2n2/8/3PN3/8/PPP1QPPP/R1B1KBNR w KQkq - 3 6",
            "solutionSans": [
              "Nd6#"
            ],
            "difficulty": 2
          },
          {
            "id": "ch-d-caro-class-m1",
            "type": "mcq",
            "promptUk": "Чому 5…Ngf6 після 4…Nd7 5.Qe2 — груба помилка?",
            "promptEn": "Why is 5…Ngf6 after 4…Nd7 5.Qe2 a blunder?",
            "options": [
              "білі ставлять мат 6.Nd6#: поле d6 не захищене",
              "кінь на f6 завжди нелегальний",
              "ферзь чорних гине на d8",
              "це пат"
            ],
            "correctIndex": 0,
            "explanationUk": "Кінь e4 і ферзь e2 працюють разом. Правильно спочатку …Ndf6 або інший розвиток.",
            "explanationEn": "The knight on e4 and the queen on e2 work together. The right idea is first …Ndf6 or another developing move.",
            "optionsEn": [
              "White mates with 6.Nd6#: the d6-square is undefended",
              "a knight on f6 is always illegal",
              "Black’s queen dies on d8",
              "it is stalemate"
            ]
          },
          {
            "id": "ch-d-caro-class-e",
            "type": "explain",
            "promptUk": "Яка ідея класичного Каро–Канн і яку пастку треба знати?",
            "promptEn": "What is the idea of the Classical Caro-Kann, and which trap must you know?",
            "keyIdeas": [
              {
                "labelUk": "Слон зовні",
                "labelEn": "Bishop out",
                "anyOf": [
                  "Bf5",
                  "слон",
                  "bishop",
                  "c6",
                  "e6"
                ]
              },
              {
                "labelUk": "h4–h5",
                "labelEn": "h4–h5",
                "anyOf": [
                  "h4",
                  "h5",
                  "Bg6",
                  "h6"
                ]
              },
              {
                "labelUk": "Пастка",
                "labelEn": "Trap",
                "anyOf": [
                  "Nd6",
                  "Qe2",
                  "Ngf6",
                  "пастк",
                  "trap",
                  "мат",
                  "mate"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "У класичному Каро–Канн слон виходить на Bf5 до ходу e6, а білі тиснуть h4–h5. Пастка: після Qe2 хід Ngf6 отримує мат Nd6#. Слон зовні — головна перевага над французькою.",
            "sampleAnswerEn": "In the Classical Caro-Kann the bishop comes out to Bf5 before e6, and White presses with h4–h5. The trap: after Qe2 the move Ngf6 is mated by Nd6#. A bishop already out is the main advantage over the French."
          }
        ]
      },
      {
        "slug": "ch-d-caro-adv",
        "titleUk": "Каро–Канн: варіант просування",
        "titleEn": "The Caro-Kann Advance Variation",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "ch-d-caro-adv-l",
            "type": "chess_lesson",
            "promptUk": "Каро–Канн: варіант просування",
            "promptEn": "The Caro-Kann Advance Variation",
            "fen": "r2qkbnr/pp3ppp/2n1p3/2ppPb2/3P4/5N2/PPP1BPPP/RNBQ1RK1 w kq - 2 7",
            "notesUk": "У просуванні Каро–Канн білі так само закривають центр 3.e5, але чорні вже можуть вивести слона 3…Bf5 — і в цьому вся різниця з французьким Advance, де слон ще всередині. Далі типово 4.Nf3 e6 5.Be2 c5 6.O-O Nc6 — структура на діаграмі: ланцюг e5 тримається на d4, чорні вже підірвали …c5, слон стоїть активно на f5.\n\nПлан чорних: …c5 (головний підрив), …Nc6, …Qb6, тиск на d4, розвинути коня на e7, рокірувати. Слон на f5 іноді відходить на g6, якщо білі грають Nh4. План білих: тримати d4, c3, розвинути фігури, інколи розгорнути атаку ходом h4 (так званий «довгий» Advance, 4.h4), або грати спокійніше («короткий»).\n\nПорівняння з французьким просуванням: та сама ідея ланцюга e5, той самий підрив …c5, але чорні не витрачають темпи на визволення слона. Ціна — пішак на c6 зайняв темп, і ферзевий фланг трохи інакший.\n\nНе зубрити всі гілки Short і Long Advance. Зрозумійте: слон уже на f5, …c5 — обов'язковий підрив, і не грайте французькі плани «сліпо», забувши, що слон уже зовні.",
            "notesEn": "In the Caro-Kann Advance White again closes the centre with 3.e5, but Black can already develop the bishop with 3…Bf5 — and that is the whole difference from the French Advance, where the bishop is still inside. A typical sequel is 4.Nf3 e6 5.Be2 c5 6.O-O Nc6 — the structure in the diagram: the e5-chain is held by d4, Black has already broken with …c5, and the bishop stands actively on f5.\n\nBlack’s plan: …c5 (the main break), …Nc6, …Qb6, pressure on d4, develop the knight to e7, castle. The bishop on f5 sometimes drops back to g6 if White plays Nh4. White’s plan: hold d4, c3, develop, sometimes launch an attack with h4 (the “long” Advance, 4.h4), or play more quietly (the “short”).\n\nCompared with the French Advance: the same e5-chain idea, the same …c5 break, but Black does not spend tempi freeing the bishop. The cost is that the pawn on c6 used a tempo, and the queenside looks a little different.\n\nDo not memorise every Short and Long Advance branch. Understand: the bishop is already on f5, …c5 is the essential break, and do not play French plans “blindly”, forgetting that the bishop is already out.",
            "quiz": {
              "q": "Чим Advance Каро–Канн відрізняється від французького Advance?",
              "qEn": "How does the Caro-Kann Advance differ from the French Advance?",
              "options": [
                "чорні виводять слона на f5 уже на 3-му ході, до …e6",
                "у Каро–Канн заборонено …c5",
                "білі не можуть грати e5",
                "різниці немає"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "Black develops the bishop to f5 as early as move 3, before …e6",
                "…c5 is forbidden in the Caro-Kann",
                "White cannot play e5",
                "there is no difference"
              ]
            }
          },
          {
            "id": "ch-d-caro-adv-p1",
            "type": "chess_puzzle",
            "promptUk": "Каро–Канн Advance: зробіть тематичний підрив.",
            "promptEn": "Caro-Kann Advance: play the thematic break.",
            "fen": "rn1qkbnr/pp3ppp/2p1p3/3pPb2/3P4/5N2/PPP1BPPP/RNBQK2R b KQkq - 1 5",
            "solutionSans": [
              "c5"
            ],
            "difficulty": 2
          },
          {
            "id": "ch-d-caro-adv-m1",
            "type": "mcq",
            "promptUk": "Що означає «довгий» Advance (4.h4) у Каро–Канн?",
            "promptEn": "What is the “long” Advance (4.h4) in the Caro-Kann?",
            "options": [
              "агресивний план із h4 проти слона f5, а не лише тихий розвиток",
              "обов'язкова довга рокіровка на 4-му ході",
              "мат пішаком h",
              "відмова від пішака e5"
            ],
            "correctIndex": 0,
            "explanationUk": "«Короткий» Advance — спокійний розвиток; «довгий» — рання гра на фланзі.",
            "explanationEn": "The “short” Advance is quiet development; the “long” is an early flank game.",
            "optionsEn": [
              "an aggressive plan with h4 against the f5-bishop, not only quiet development",
              "mandatory long castling on move 4",
              "mate with the h-pawn",
              "giving up the e5-pawn"
            ]
          },
          {
            "id": "ch-d-caro-adv-e",
            "type": "explain",
            "promptUk": "Порівняйте просування в Каро–Канн і у французькій.",
            "promptEn": "Compare the Advance in the Caro-Kann and in the French.",
            "keyIdeas": [
              {
                "labelUk": "Слон f5",
                "labelEn": "Bishop f5",
                "anyOf": [
                  "Bf5",
                  "слон",
                  "bishop",
                  "f5"
                ]
              },
              {
                "labelUk": "Підрив",
                "labelEn": "Break",
                "anyOf": [
                  "c5",
                  "підрив",
                  "break",
                  "d4"
                ]
              },
              {
                "labelUk": "h4",
                "labelEn": "h4",
                "anyOf": [
                  "h4",
                  "довг",
                  "long",
                  "Short",
                  "коротк"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Як і у французькій, білі ставлять e5, а чорні підривають ходом c5. Різниця: слон уже на Bf5. Довгий Advance з h4 — агресивний план проти цього слона.",
            "sampleAnswerEn": "As in the French, White plays e5 and Black undermines with c5. The difference: the bishop is already on Bf5. The long Advance with h4 is an aggressive plan against that bishop."
          }
        ]
      },
      {
        "slug": "ch-d-kid-ideas",
        "titleUk": "Староіндійський: гіпермодерн і удар по центру",
        "titleEn": "The King's Indian: hypermodern ideas and the central strike",
        "baseXp": 24,
        "difficulty": 4,
        "exercises": [
          {
            "id": "ch-d-kid-ideas-l",
            "type": "chess_lesson",
            "promptUk": "Староіндійський: гіпермодерн і удар по центру",
            "promptEn": "The King's Indian: hypermodern ideas and the central strike",
            "fen": "r1bq1rk1/ppp1npbp/3p1np1/3Pp3/2P1P3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 1 9",
            "notesUk": "Староіндійський захист — гіпермодерний дебют: чорні дозволяють білим зайняти центр пішаками (c4–d4–e4) і лише потім б'ють по ньому. Порядок: 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6, потім …O-O і …e5 або …c5. На діаграмі класична система після 5.Nf3 O-O 6.Be2 e5 7.O-O Nc6 8.d5 Ne7: білі закрили центр, у чорних кінь іде на e7, готуючи підрив …f5.\n\nСистеми білих (ідеї, не списки ходів): класична (Nf3, Be2, O-O); земиш (f3, міцний центр, O-O-O іноді); фіанкето (g3, Bg2 — надійно проти слона g7); Авербах (Bg5). Виберіть одну, зрозумійте її план.\n\nПлан чорних: після закриття d5 — атака на королівському фланзі (про це наступний урок); якщо білі тримають напруження на d4, можна розміняти …exd4 і грати по лініях. Тематична комбінація, якщо білі зарано беруть на e5 і ще конем на e5: …Nxe4 повертає матеріал і відкриває гру.\n\nНе зубрити всі системи староіндійського. Як чорні — виберіть класичну з …e5; як білі — одну схему (класика або фіанкето) і розумійте, коли закривати центр ходом d5.",
            "notesEn": "The King's Indian Defence is a hypermodern opening: Black allows White to occupy the centre with pawns (c4–d4–e4) and only then strikes at it. The move-order is 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6, then …O-O and …e5 or …c5. The diagram is the Classical after 5.Nf3 O-O 6.Be2 e5 7.O-O Nc6 8.d5 Ne7: White has closed the centre, Black’s knight goes to e7, preparing the …f5 break.\n\nWhite’s systems (ideas, not move-lists): Classical (Nf3, Be2, O-O); Sämisch (f3, a firm centre, sometimes O-O-O); fianchetto (g3, Bg2 — reliable against the g7-bishop); Averbakh (Bg5). Pick one and understand its plan.\n\nBlack’s plan: after the d5-closure — a kingside attack (the next lesson); if White keeps the tension on d4, Black can exchange …exd4 and play on the files. A thematic combination if White takes too freely on e5 and again with a knight on e5: …Nxe4 wins the material back and opens the game.\n\nDo not memorise every King's Indian system. As Black, pick the Classical with …e5; as White, pick one scheme (Classical or fianchetto) and know when to close the centre with d5.",
            "quiz": {
              "q": "Що означає «гіпермодерний» підхід староіндійського?",
              "qEn": "What does the “hypermodern” King's Indian approach mean?",
              "options": [
                "чорні дозволяють білим зайняти центр пішаками, а потім б'ють по ньому (…e5 або …c5)",
                "чорні ніколи не ходять пішаками",
                "білі не мають права ставити пішаків у центр",
                "мат на 4-му ході"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "Black lets White occupy the centre with pawns, then strikes at it (…e5 or …c5)",
                "Black never moves pawns",
                "White is not allowed to put pawns in the centre",
                "mate on move 4"
              ]
            }
          },
          {
            "id": "ch-d-kid-ideas-p1",
            "type": "chess_puzzle",
            "promptUk": "Білі зарано взяли на e5 конем. Поверніть матеріал.",
            "promptEn": "White took on e5 too early with the knight. Win the material back.",
            "fen": "rnbr2k1/ppp2pbp/5np1/4N3/2P1P3/2N5/PP2BPPP/R1B1K2R b KQ - 0 9",
            "solutionSans": [
              "Nxe4"
            ],
            "difficulty": 3
          },
          {
            "id": "ch-d-kid-ideas-m1",
            "type": "mcq",
            "promptUk": "Після 8.d5 у класичному староіндійському куди йде кінь c6 і який підрив готується?",
            "promptEn": "After 8.d5 in the Classical King's Indian, where does the c6-knight go and which break is prepared?",
            "options": [
              "на e7, готуючи …f5",
              "на a5 і одразу здатися",
              "на b8 назавжди",
              "на d4 через зайняте поле"
            ],
            "correctIndex": 0,
            "explanationUk": "Закритий центр змінює напрямок: чорні атакують на королівському фланзі.",
            "explanationEn": "A closed centre changes the direction: Black attacks on the kingside.",
            "optionsEn": [
              "to e7, preparing …f5",
              "to a5 and resign at once",
              "to b8 forever",
              "to d4 through an occupied square"
            ]
          },
          {
            "id": "ch-d-kid-ideas-e",
            "type": "explain",
            "promptUk": "У чому гіпермодерна ідея староіндійського і коли білі закривають центр?",
            "promptEn": "What is the hypermodern idea of the King's Indian, and when does White close the centre?",
            "keyIdeas": [
              {
                "labelUk": "Центр",
                "labelEn": "Centre",
                "anyOf": [
                  "c4",
                  "d4",
                  "e4",
                  "гіпермод",
                  "hypermodern",
                  "центр",
                  "centre",
                  "center"
                ]
              },
              {
                "labelUk": "Підрив",
                "labelEn": "Strike",
                "anyOf": [
                  "e5",
                  "c5",
                  "f5",
                  "підрив",
                  "strike",
                  "break"
                ]
              },
              {
                "labelUk": "d5",
                "labelEn": "d5",
                "anyOf": [
                  "d5",
                  "Ne7",
                  "закрит",
                  "close",
                  "closed"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Чорні дозволяють білим центр c4–d4–e4 і б'ють ходами e5 або c5 — це гіпермодерн. Якщо білі закривають центр ходом d5, кінь іде на Ne7 і готується підрив f5.",
            "sampleAnswerEn": "Black allows White the centre c4–d4–e4 and strikes with e5 or c5 — that is hypermodern. If White closes the centre with d5, the knight goes to Ne7 and the f5 break is prepared."
          }
        ]
      },
      {
        "slug": "ch-d-kid-attack",
        "titleUk": "Староіндійський: атака Мар-дель-Плата",
        "titleEn": "The King's Indian: the Mar del Plata attack",
        "baseXp": 24,
        "difficulty": 4,
        "exercises": [
          {
            "id": "ch-d-kid-attack-l",
            "type": "chess_lesson",
            "promptUk": "Староіндійський: атака Мар-дель-Плата",
            "promptEn": "The King's Indian: the Mar del Plata attack",
            "fen": "r1bq1rk1/pppnn1bp/3p2p1/3Ppp2/2P1P3/2N1B3/PP2BPPP/R2QNRK1 w - - 0 11",
            "notesUk": "Атака Мар-дель-Плата — головний план чорних у класичному староіндійському після 8.d5 Ne7. Типовий порядок: …Nd7, …f5, …f4, …g5, кінь на f6 або h5, ферзь на h4, слон на h6 або g7, іноді жертва на h3. На діаграмі позиція після …Nd7 і …f5: підрив уже зроблено, білі мають вирішувати, як жити на королівському фланзі.\n\nЦе гонка, як у драконі, тільки навпаки. Білі атакують на ферзевому: c5, b4–b5, cxd6, тура на c7. Чорні атакують короля. Хто швидший, той виграє. Типова помилка — «пограти обережно» і запізнитись в обидва боки. Пішак …f4 забирає клітинки в білих фігур; …g5 готує штурм.\n\nМатова картина, яку треба бачити: ферзь на h4, кінь на f3, удар …Qxh2#. У навчальній позиції наступної вправи король білих уже затиснений на h1 — саме така фінальна картина атаки, коли захист не встиг.\n\nНе зубрити 18 ходів конкретної партії Таля чи Каспарова. Зрозумійте гонку: …f5–f4–g5 проти c5–b4–b5, і не гальмуйте свій фланг без потреби.",
            "notesEn": "The Mar del Plata attack is Black’s main plan in the Classical King's Indian after 8.d5 Ne7. A typical sequence is …Nd7, …f5, …f4, …g5, a knight to f6 or h5, the queen to h4, the bishop to h6 or g7, sometimes a sacrifice on h3. The diagram is the position after …Nd7 and …f5: the break is already in, and White must decide how to live on the kingside.\n\nThis is a race, as in the Dragon, only reversed. White attacks on the queenside: c5, b4–b5, cxd6, a rook to c7. Black attacks the king. The faster side wins. A typical mistake is to “play carefully” and arrive late on both wings. The pawn …f4 takes squares from White’s pieces; …g5 prepares the storm.\n\nA mating picture you should see: the queen on h4, a knight on f3, the blow …Qxh2#. In the training position of the next exercise the white king is already trapped on h1 — that is the final picture of the attack when the defence is too late.\n\nDo not memorise 18 moves of a particular Tal or Kasparov game. Understand the race: …f5–f4–g5 against c5–b4–b5, and do not slow your own flank without a reason.",
            "quiz": {
              "q": "Що є планом чорних у атаці Мар-дель-Плата?",
              "qEn": "What is Black’s plan in the Mar del Plata attack?",
              "options": [
                "…f5–f4–g5 і атака на короля, поки білі біжать на ферзевому фланзі",
                "розмін усіх фігур і пат",
                "довга рокіровка чорних",
                "здача якості на a1"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "…f5–f4–g5 and an attack on the king, while White races on the queenside",
                "exchanging every piece and stalemate",
                "Black’s long castle",
                "giving up the exchange on a1"
              ]
            }
          },
          {
            "id": "ch-d-kid-attack-p1",
            "type": "chess_puzzle",
            "promptUk": "Мар-дель-Плата: зробіть тематичний підрив …f5.",
            "promptEn": "Mar del Plata: play the thematic …f5 break.",
            "fen": "r1bq1rk1/pppnnpbp/3p2p1/3Pp3/2P1P3/2N1B3/PP2BPPP/R2QNRK1 b - - 4 10",
            "solutionSans": [
              "f5"
            ],
            "difficulty": 2
          },
          {
            "id": "ch-d-kid-attack-p2",
            "type": "chess_puzzle",
            "promptUk": "Фінальна картина атаки: ферзь і кінь ставлять мат на h2.",
            "promptEn": "The final picture of the attack: queen and knight mate on h2.",
            "fen": "r4rk1/pp3p2/2p3pb/3p4/2P1P2q/2N2n2/PP3PPP/R2Q1R1K b - - 0 1",
            "solutionSans": [
              "Qxh2#"
            ],
            "difficulty": 3
          },
          {
            "id": "ch-d-kid-attack-m1",
            "type": "mcq",
            "promptUk": "Який план білих у гонці Мар-дель-Плата?",
            "promptEn": "What is White’s plan in the Mar del Plata race?",
            "options": [
              "c5, b4–b5 і вторгнення по лінії c, не запізнюючись",
              "нічого не робити на ферзевому фланзі",
              "рокірувати вдруге",
              "віддати ферзя на h5"
            ],
            "correctIndex": 0,
            "explanationUk": "Якщо білі запізнюються, атака на короля встигає раніше.",
            "explanationEn": "If White is late, the attack on the king arrives first.",
            "optionsEn": [
              "c5, b4–b5 and an invasion on the c-file, without being late",
              "do nothing on the queenside",
              "castle a second time",
              "give the queen on h5"
            ]
          },
          {
            "id": "ch-d-kid-attack-e",
            "type": "explain",
            "promptUk": "Поясніть гонку Мар-дель-Плата.",
            "promptEn": "Explain the Mar del Plata race.",
            "keyIdeas": [
              {
                "labelUk": "Підрив",
                "labelEn": "Break",
                "anyOf": [
                  "f5",
                  "f4",
                  "g5",
                  "підрив",
                  "break"
                ]
              },
              {
                "labelUk": "Гонка",
                "labelEn": "Race",
                "anyOf": [
                  "гонка",
                  "race",
                  "c5",
                  "b4",
                  "b5"
                ]
              },
              {
                "labelUk": "Мат",
                "labelEn": "Mate",
                "anyOf": [
                  "Qh4",
                  "Qxh2",
                  "h2",
                  "мат",
                  "mate",
                  "Nf3"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "У атаці Мар-дель-Плата чорні грають f5–f4–g5 і ведуть ферзя на Qh4, цілячи мат на h2. Білі мають встигнути з гонкою c5 і b4–b5. Хто швидший, той виграє.",
            "sampleAnswerEn": "In the Mar del Plata attack Black plays f5–f4–g5 and brings the queen to Qh4, aiming for mate on h2. White must arrive in time with the c5 and b4–b5 race. The faster side wins."
          }
        ]
      },
      {
        "slug": "ch-d-repertoire-build",
        "titleUk": "Як зібрати свій репертуар",
        "titleEn": "How to build your repertoire",
        "baseXp": 21,
        "difficulty": 3,
        "exercises": [
          {
            "id": "ch-d-repertoire-build-l",
            "type": "chess_lesson",
            "promptUk": "Як зібрати свій репертуар",
            "promptEn": "How to build your repertoire",
            "fen": "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3",
            "notesUk": "Репертуар — це не енциклопедія, а невеликий набір зрозумілих дебютів на кожен перший хід суперника. На діаграмі — ваша італійська за білих після 1.e4 e5 2.Nf3 Nc6 3.Bc4: ви вже знаєте плани Джоко-п'яно, ідею Еванса і двох коней. Цього досить, щоб грати, а не щоб цитувати 15-й хід.\n\nПрактичний пакет для рівня початківець–середній. За білих: проти 1…e5 — італійська; проти 1…c5 — спочатку спокійний 2.Nc3 або 2.c3 (закритий / Алапін), поки не будете готові до відкритого сицилійського; проти 1…e6 і 1…c6 — просування з планами, які ви вже вивчили; проти 1…d5 можна перейти на 1.d4 і грати ферзевий гамбіт (розмінний / Карлсбад) або Лондон як систему. Альтернатива: одразу 1.d4 з Лондоном або QGD Exchange.\n\nЗа чорних: проти 1.e4 — 1…e5 (ви розумієте італійську й іспанську) або солідний Каро–Канн; проти 1.d4 — QGD або слов'янський; проти 1.c4 і 1.Nf3 — відповіді, узгоджені з вашим захистом проти 1.d4 (наприклад …e5 або …c6 / …Nf6).\n\nЯк вивчати: 8–10 ходів ідеї, 5 модельних партій, одна відповідь на кожен перший хід. Оновлюйте гілку, лише коли вона вас систематично б'є. Не збирайте 20-ходові дерева «про всяк випадок».",
            "notesEn": "A repertoire is not an encyclopaedia; it is a small set of understood openings against each of the opponent’s first moves. The diagram is your Italian as White after 1.e4 e5 2.Nf3 Nc6 3.Bc4: you already know the Giuoco Piano plans, the Evans idea and the Two Knights. That is enough to play, not to quote move 15.\n\nA practical beginner–intermediate package. As White: against 1…e5 — the Italian; against 1…c5 — start with a calm 2.Nc3 or 2.c3 (Closed / Alapin) until you are ready for the Open Sicilian; against 1…e6 and 1…c6 — the Advance with the plans you have already studied; against 1…d5 you can switch to 1.d4 and play a Queen's Gambit (Exchange / Carlsbad) or the London as a system. The alternative: 1.d4 at once, with the London or the QGD Exchange.\n\nAs Black: against 1.e4 — 1…e5 (you understand the Italian and the Ruy) or a solid Caro-Kann; against 1.d4 — the QGD or the Slav; against 1.c4 and 1.Nf3 — replies consistent with your defence to 1.d4 (for example …e5, or …c6 / …Nf6).\n\nHow to study: 8–10 moves of ideas, five model games, one answer to each first move. Update a line only when it keeps beating you. Do not collect 20-move trees “just in case”.",
            "quiz": {
              "q": "Що таке практичний дебютний репертуар на цьому рівні?",
              "qEn": "What is a practical opening repertoire at this level?",
              "options": [
                "невеликий набір зрозумілих дебютів: одна відповідь на кожен перший хід, ідеї на 8–10 ходів",
                "енциклопедія всіх 25-ходових гілок",
                "лише один хід 1.a4 на все",
                "грати щоразу випадковий дебют"
              ],
              "correctIndex": 0,
              "optionsEn": [
                "a small set of understood openings: one answer to each first move, ideas for 8–10 moves",
                "an encyclopaedia of every 25-move branch",
                "only the move 1.a4 for everything",
                "a random opening every time"
              ]
            }
          },
          {
            "id": "ch-d-repertoire-build-m1",
            "type": "mcq",
            "promptUk": "Який пакет за білих пропонує цей урок проти 1…e5 і проти 1…c5 на старті?",
            "promptEn": "Which White package does this lesson suggest against 1…e5 and, at first, against 1…c5?",
            "options": [
              "італійська проти 1…e5; спочатку 2.Nc3 або 2.c3 проти сицилійського",
              "тільки гамбіт Еванса в кожній партії",
              "Берлін за білих",
              "здача після 1…c5"
            ],
            "correctIndex": 0,
            "explanationUk": "Відкритий сицилійський можна додати пізніше, коли будете готові.",
            "explanationEn": "The Open Sicilian can be added later, when you are ready.",
            "optionsEn": [
              "the Italian against 1…e5; first 2.Nc3 or 2.c3 against the Sicilian",
              "only the Evans Gambit in every game",
              "the Berlin as White",
              "resigning after 1…c5"
            ]
          },
          {
            "id": "ch-d-repertoire-build-m2",
            "type": "mcq",
            "promptUk": "Який пакет за чорних пропонує урок проти 1.e4 і 1.d4?",
            "promptEn": "Which Black package does the lesson suggest against 1.e4 and 1.d4?",
            "options": [
              "1…e5 або Каро–Канн проти 1.e4; QGD або слов'янський проти 1.d4",
              "тільки староіндійський у відповідь на все",
              "1…f6 і 1…g5",
              "дзеркальні ходи без ідеї"
            ],
            "correctIndex": 0,
            "explanationUk": "Виберіть одне з двох в кожній парі — і вивчіть ідеї, не дерево.",
            "explanationEn": "Pick one of the two in each pair — and study the ideas, not a tree.",
            "optionsEn": [
              "1…e5 or the Caro-Kann against 1.e4; the QGD or the Slav against 1.d4",
              "only the King's Indian against everything",
              "1…f6 and 1…g5",
              "mirror moves with no idea"
            ]
          },
          {
            "id": "ch-d-repertoire-build-m3",
            "type": "mcq",
            "promptUk": "Коли варто оновлювати гілку репертуару?",
            "promptEn": "When should you update a repertoire line?",
            "options": [
              "коли вона вас систематично б'є, а не «про всяк випадок»",
              "після кожної нічиєї",
              "кожного дня, навіть якщо все добре",
              "ніколи, навіть після десяти поразок"
            ],
            "correctIndex": 0,
            "explanationUk": "8–10 ходів ідеї і кілька модельних партій — достатній старт.",
            "explanationEn": "8–10 moves of ideas and a few model games are a sufficient start.",
            "optionsEn": [
              "when it keeps beating you, not “just in case”",
              "after every draw",
              "every day, even if all is well",
              "never, even after ten losses"
            ]
          },
          {
            "id": "ch-d-repertoire-build-e",
            "type": "explain",
            "promptUk": "Складіть короткий практичний репертуар за білих і за чорних і поясніть, як його вивчати.",
            "promptEn": "Sketch a short practical repertoire as White and as Black, and explain how to study it.",
            "keyIdeas": [
              {
                "labelUk": "Білі",
                "labelEn": "White",
                "anyOf": [
                  "італійськ",
                  "Italian",
                  "Лондон",
                  "London",
                  "просуван",
                  "Advance",
                  "e4",
                  "d4"
                ]
              },
              {
                "labelUk": "Чорні",
                "labelEn": "Black",
                "anyOf": [
                  "e5",
                  "Каро",
                  "Caro",
                  "QGD",
                  "слов'ян",
                  "Slav"
                ]
              },
              {
                "labelUk": "Метод",
                "labelEn": "Method",
                "anyOf": [
                  "8–10",
                  "іде",
                  "idea",
                  "модельн",
                  "model",
                  "не зубр",
                  "memor",
                  "репертуар",
                  "repertoire"
                ]
              }
            ],
            "minWords": 12,
            "passRatio": 0.6,
            "sampleAnswerUk": "Практичний репертуар: за білих італійська проти e5 і просування або Лондон проти інших ходів; за чорних e5 або Каро проти e4 і QGD чи слов'янський проти d4. Вивчаємо ідеї на 8–10 ходів і модельні партії, не зубримо дерева.",
            "sampleAnswerEn": "A practical repertoire: as White the Italian against e5 and the Advance or the London against other moves; as Black e5 or the Caro against e4 and the QGD or the Slav against d4. We study ideas for 8–10 moves and model games; we do not memorise trees. That is a repertoire, not an encyclopaedia."
          }
        ]
      },
      {
        "slug": "ch-deep-caro-kid-exam",
        "titleUk": "Іспит: Каро–Канн, староіндійський, репертуар",
        "titleEn": "Exam: Caro-Kann, King's Indian, repertoire",
        "baseXp": 30,
        "difficulty": 4,
        "isExam": true,
        "passThreshold": 0.7,
        "exercises": [
          {
            "id": "ch-deep-caro-kid-exam-q1",
            "type": "mcq",
            "promptUk": "Головна перевага Каро–Канн над французькою — це:",
            "promptEn": "The main advantage of the Caro-Kann over the French is:",
            "options": [
              "світлопольний слон встигає вийти (…Bf5) до …e6",
              "форсований мат на 4-му ході",
              "зайвий ферзь",
              "заборона ходу e5 для білих"
            ],
            "correctIndex": 0,
            "explanationUk": "Пішак c6 тримає центр і не закриває слона.",
            "explanationEn": "The c6-pawn holds the centre and does not shut the bishop in.",
            "optionsEn": [
              "the light-squared bishop gets out (…Bf5) before …e6",
              "forced mate on move 4",
              "an extra queen",
              "White is forbidden to play e5"
            ]
          },
          {
            "id": "ch-deep-caro-kid-exam-q2",
            "type": "mcq",
            "promptUk": "У класичному староіндійському після 8.d5 план чорних — це:",
            "promptEn": "In the Classical King's Indian after 8.d5 Black’s plan is:",
            "options": [
              "…Ne7 і підрив …f5, атака на короля",
              "довга рокіровка",
              "розмін усіх пішаків на a-лінії",
              "здача"
            ],
            "correctIndex": 0,
            "explanationUk": "Закритий центр змінює гру на флангову гонку.",
            "explanationEn": "A closed centre turns the game into a flank race.",
            "optionsEn": [
              "…Ne7 and the …f5 break, an attack on the king",
              "long castling",
              "exchanging every pawn on the a-file",
              "resigning"
            ]
          },
          {
            "id": "ch-deep-caro-kid-exam-q3",
            "type": "mcq",
            "promptUk": "Практичний репертуар на цьому рівні — це:",
            "promptEn": "A practical repertoire at this level is:",
            "options": [
              "одна зрозуміла відповідь на кожен перший хід і ідеї на 8–10 ходів",
              "усі 25-ходові енциклопедичні гілки",
              "випадковий дебют щопартії",
              "лише 1.h4"
            ],
            "correctIndex": 0,
            "explanationUk": "Оновлюйте гілку, коли вона вас систематично б'є, не «про всяк випадок».",
            "explanationEn": "Update a line when it keeps beating you, not “just in case”.",
            "optionsEn": [
              "one understood answer to each first move and ideas for 8–10 moves",
              "every 25-move encyclopaedic branch",
              "a random opening every game",
              "only 1.h4"
            ]
          },
          {
            "id": "ch-deep-caro-kid-exam-q4",
            "type": "mcq",
            "promptUk": "Пастка після 4.Nxe4 Nd7 5.Qe2 Ngf6?? у Каро–Канн завершується ходом:",
            "promptEn": "The trap after 4.Nxe4 Nd7 5.Qe2 Ngf6?? in the Caro-Kann ends with:",
            "options": [
              "Nd6#",
              "O-O-O-O",
              "здачею білих",
              "патом"
            ],
            "correctIndex": 0,
            "explanationUk": "Кінь з e4 іде на незахищене поле d6 з матом.",
            "explanationEn": "The knight from e4 goes to the undefended d6-square with mate.",
            "optionsEn": [
              "Nd6#",
              "O-O-O-O",
              "White resigning",
              "stalemate"
            ]
          },
          {
            "id": "ch-deep-caro-kid-exam-p5",
            "type": "chess_puzzle",
            "promptUk": "Класичний Каро–Канн: виведіть слона на активну діагональ.",
            "promptEn": "Classical Caro-Kann: develop the bishop onto the active diagonal.",
            "fen": "rnbqkbnr/pp2pppp/2p5/8/3PN3/8/PPP2PPP/R1BQKBNR b KQkq - 0 4",
            "solutionSans": [
              "Bf5"
            ],
            "difficulty": 2
          },
          {
            "id": "ch-deep-caro-kid-exam-p6",
            "type": "chess_puzzle",
            "promptUk": "Староіндійський: перший хід тематичної комбінації …Nxe4 після раннього Nxe5.",
            "promptEn": "King's Indian: the first move of the thematic …Nxe4 combination after an early Nxe5.",
            "fen": "rnbr2k1/ppp2pbp/5np1/4N3/2P1P3/2N5/PP2BPPP/R1B1K2R b KQ - 0 9",
            "solutionSans": [
              "Nxe4"
            ],
            "difficulty": 3
          }
        ]
      }
    ]
  }
];

export function expandChessDeep(course: CourseContent): CourseContent {
  return expandCourse(course, {}, newUnits);
}
