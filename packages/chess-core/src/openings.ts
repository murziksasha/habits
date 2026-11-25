/**
 * Opening repertoires for the trainer and the bot book (SPEC/CHESS-DEEP-UPGRADE-PLAN.md, phase 7).
 * Lines are authored as SAN strings; trees are built by merging shared prefixes, so a
 * position reached by the same move order is one node. Comments are keyed by ply index
 * (0 = first move of the game) and explain "why this move".
 */
import { Chess } from "chess.js";

export type OpeningNode = {
  san: string;
  commentUk?: string;
  commentEn?: string;
  children?: OpeningNode[];
  /** True on the repertoire's main line. */
  mainline?: boolean;
  /** Number of lines passing through this node (bot weight). */
  weight: number;
  /** Line keys ending at this node. */
  lineKeys?: string[];
};

export type OpeningLine = {
  key: string;
  nameUk: string;
  nameEn: string;
  sans: string[];
  comments: Record<number, [uk: string, en: string]>;
};

export type Repertoire = {
  id: string;
  side: "w" | "b";
  titleUk: string;
  titleEn: string;
  /** Course unit that teaches it. */
  unit: string;
  root: OpeningNode[];
  maxDepth: number;
  lines: OpeningLine[];
};

type LineSpec = { key: string; uk: string; en: string; moves: string; c?: Record<number, [string, string]> };
type RepSpec = { id: string; side: "w" | "b"; uk: string; en: string; unit: string; lines: LineSpec[] };

const SPECS: RepSpec[] = [
  {
    id: "italian",
    side: "w",
    uk: "Італійська партія",
    en: "Italian Game",
    unit: "ch-deep-italian-ruy",
    lines: [
      {
        key: "giuoco-pianissimo",
        uk: "Джуоко піаніссімо",
        en: "Giuoco Pianissimo",
        moves: "e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d3 d6 O-O O-O",
        c: {
          0: ["Займаємо центр і відкриваємо слона та ферзя.", "Take the centre and open the bishop and queen."],
          2: ["Розвиток з атакою на e5.", "Develop with an attack on e5."],
          4: ["Слон націлений на слабке поле f7.", "The bishop eyes the weak f7 square."],
          6: ["Готуємо d4, щоб побудувати великий центр.", "Prepare d4 to build a big centre."],
          8: ["Спокійно захищаємо e4 і тримаємо структуру.", "Calmly defend e4 and keep the structure."],
          10: ["Король у безпеці — тепер маневри Nbd2–f1–g3.", "King safe — now manoeuvres like Nbd2–f1–g3."],
        },
      },
      {
        key: "giuoco-d4",
        uk: "Джуоко піано з d4",
        en: "Giuoco Piano with d4",
        moves: "e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d4 exd4 cxd4 Bb4+ Bd2 Bxd2+ Nbxd2 d5",
        c: {
          8: ["Одразу удар у центр: d4 підтриманий пішаком c3.", "Strike in the centre at once: d4 is backed by c3."],
          10: ["Беремо пішаком — у білих класичний центр e4+d4.", "Recapture with the pawn — White gets the classic e4+d4 centre."],
          12: ["Закриваємо шах слоном і пропонуємо розмін.", "Block the check with the bishop and offer a trade."],
          14: ["Кінь бере з розвитком і захищає e4.", "The knight recaptures with development and guards e4."],
        },
      },
      {
        key: "two-knights-d3",
        uk: "Захист двох коней, d3",
        en: "Two Knights Defence, d3",
        moves: "e4 e5 Nf3 Nc6 Bc4 Nf6 d3 Be7 O-O O-O Re1 d6",
        c: {
          6: ["Захищаємо e4 без гострих ліній на кшталт Ng5.", "Defend e4, avoiding the sharp Ng5 lines."],
          8: ["Рокіровка: спершу безпека короля.", "Castle: king safety first."],
          10: ["Тура на e-вертикаль підтримує центр і готує d4.", "Rook to the e-file supports the centre and prepares d4."],
        },
      },
      {
        key: "hungarian",
        uk: "Угорський захист",
        en: "Hungarian Defence",
        moves: "e4 e5 Nf3 Nc6 Bc4 Be7 d4 exd4 Nxd4 Nf6 Nc3 O-O",
        c: {
          6: ["Проти пасивного Be7 відкриваємо центр.", "Against the passive Be7 open the centre."],
          8: ["Кінь у центрі — у білих перевага простору.", "Knight in the centre — White has more space."],
          10: ["Розвиток і захист e4.", "Develop and defend e4."],
        },
      },
    ],
  },
  {
    id: "ruy-lopez",
    side: "w",
    uk: "Іспанська партія",
    en: "Ruy Lopez",
    unit: "ch-deep-italian-ruy",
    lines: [
      {
        key: "closed",
        uk: "Закритий варіант",
        en: "Closed Ruy Lopez",
        moves: "e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 d6 c3 O-O h3",
        c: {
          4: ["Тиснемо на коня, що захищає e5.", "Pressure the knight that defends e5."],
          6: ["Зберігаємо слона: розмін на c6 зараз нічого не дає.", "Keep the bishop: taking on c6 gains nothing yet."],
          8: ["Рокіровка: e4 непрямо захищений (Nxe4 Re1).", "Castle: e4 is indirectly defended (…Nxe4 Re1)."],
          14: ["Готуємо d4 і даємо слону відступ на c2.", "Prepare d4 and give the bishop the c2 retreat."],
          16: ["Не пускаємо слона на g4 перед d4.", "Stop …Bg4 before playing d4."],
        },
      },
      {
        key: "berlin",
        uk: "Берлінський захист",
        en: "Berlin Defence",
        moves: "e4 e5 Nf3 Nc6 Bb5 Nf6 O-O Nxe4 d4 Nd6 Bxc6 dxc6 dxe5 Nf5 Qxd8+ Kxd8",
        c: {
          6: ["Рокіровка: відіграємо пішака e4 пізніше.", "Castle: we win the e4 pawn back later."],
          8: ["Удар по центру — коню на e4 незатишно.", "Hit the centre — the e4 knight is uncomfortable."],
          10: ["Розмін, щоб виграти темп пішаком на e5.", "Trade to gain a tempo with the pawn to e5."],
          14: ["Розмін ферзів: чорний король лишається в центрі.", "Trade queens: Black's king stays in the centre."],
        },
      },
      {
        key: "exchange",
        uk: "Розмінний варіант",
        en: "Exchange Variation",
        moves: "e4 e5 Nf3 Nc6 Bb5 a6 Bxc6 dxc6 O-O f6 d4 exd4 Nxd4 c5 Nb3 Qxd1 Rxd1",
        c: {
          6: ["Псуємо пішакову структуру чорних: здвоєні пішаки c.", "Spoil Black's structure: doubled c-pawns."],
          8: ["Рокіровка перед відкриттям центру.", "Castle before opening the centre."],
          10: ["Відкриваємо гру: у ендшпілі наша більшість на королівському фланзі.", "Open up: in the endgame our kingside majority counts."],
          16: ["Після розміну ферзів — здоровий план на ендшпіль.", "After the queen trade — a healthy endgame plan."],
        },
      },
      {
        key: "classical-bc5",
        uk: "Класичний захист (…Bc5)",
        en: "Classical Defence (…Bc5)",
        moves: "e4 e5 Nf3 Nc6 Bb5 Bc5 c3 Nf6 O-O O-O d4 Bb6",
        c: {
          6: ["c3 готує d4 і забирає у коня поле d4.", "c3 prepares d4 and takes d4 from the knight."],
          10: ["Центральний удар з темпом по слону.", "A central strike with tempo on the bishop."],
        },
      },
    ],
  },
  {
    id: "queens-gambit",
    side: "w",
    uk: "Ферзевий гамбіт",
    en: "Queen's Gambit",
    unit: "ch-deep-qg-london",
    lines: [
      {
        key: "qgd-orthodox",
        uk: "Відхилений: ортодоксальний",
        en: "Declined: Orthodox",
        moves: "d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 O-O Nf3 Nbd7",
        c: {
          2: ["Пропонуємо пішака заради центру.", "Offer a pawn for the centre."],
          4: ["Розвиток з тиском на d5.", "Develop with pressure on d5."],
          6: ["Зв'язка коня f6 посилює тиск на d5.", "Pinning the f6 knight increases the pressure on d5."],
          8: ["Відкриваємо слона f1, міцний центр.", "Open the f1 bishop, solid centre."],
        },
      },
      {
        key: "qgd-exchange",
        uk: "Відхилений: розмінна система",
        en: "Declined: Exchange",
        moves: "d4 d5 c4 e6 Nc3 Nf6 cxd5 exd5 Bg5 Be7 e3 c6 Bd3",
        c: {
          6: ["Фіксуємо структуру — план атаки меншості b4–b5.", "Fix the structure — plan the minority attack b4–b5."],
          8: ["Активний слон до того, як чорні зіграють …Bf5.", "Active bishop before Black plays …Bf5."],
          12: ["Слон на d3 контролює f5.", "The d3 bishop controls f5."],
        },
      },
      {
        key: "qga",
        uk: "Прийнятий ферзевий гамбіт",
        en: "Queen's Gambit Accepted",
        moves: "d4 d5 c4 dxc4 Nf3 Nf6 e3 e6 Bxc4 c5 O-O a6",
        c: {
          4: ["Не поспішаємо відігравати — спершу розвиток і контроль e5.", "No rush to regain the pawn — develop and control e5 first."],
          6: ["Відкриваємо слона — пішак c4 повернеться.", "Open the bishop — the c4 pawn comes back."],
          8: ["Відіграли пішака з розвитком.", "Pawn regained with development."],
        },
      },
      {
        key: "slav",
        uk: "Слов'янський захист",
        en: "Slav Defence",
        moves: "d4 d5 c4 c6 Nf3 Nf6 Nc3 dxc4 a4 Bf5 e3 e6 Bxc4",
        c: {
          4: ["Розвиток; Nc3 тиснутиме на d5.", "Develop; Nc3 will press on d5."],
          8: ["a4 не дає чорним утримати пішака …b5.", "a4 stops Black holding the pawn with …b5."],
          12: ["Повертаємо пішака і маємо легку гру.", "We regain the pawn with easy play."],
        },
      },
    ],
  },
  {
    id: "london",
    side: "w",
    uk: "Лондонська система",
    en: "London System",
    unit: "ch-deep-qg-london",
    lines: [
      {
        key: "vs-d5",
        uk: "Проти …d5 і …c5",
        en: "Against …d5 and …c5",
        moves: "d4 d5 Bf4 Nf6 e3 e6 Nf3 c5 c3 Nc6 Nbd2 Bd6 Bg3 O-O Bd3",
        c: {
          2: ["Слон виходить до e3 — головна ідея Лондона.", "The bishop comes out before e3 — the London's key idea."],
          8: ["Піраміда c3–d4–e3: міцний центр.", "The c3–d4–e3 pyramid: a solid centre."],
          12: ["Зберігаємо слона від розміну на d6.", "Keep the bishop from being traded on d6."],
        },
      },
      {
        key: "vs-kid",
        uk: "Проти староіндійської схеми",
        en: "Against a King's Indian setup",
        moves: "d4 Nf6 Bf4 g6 e3 Bg7 Nf3 O-O Be2 d6 h3",
        c: {
          4: ["Та сама схема незалежно від ходів чорних.", "The same setup whatever Black plays."],
          8: ["Скромний слон на e2 — проти …Ng4/…e5 зручніше.", "A modest bishop on e2 — handier against …Ng4/…e5."],
          10: ["Поле h2 для слона і без …Nh5/…Ng4.", "A h2 retreat for the bishop and no …Nh5/…Ng4."],
        },
      },
      {
        key: "vs-qb6",
        uk: "Проти раннього …Qb6",
        en: "Against an early …Qb6",
        moves: "d4 d5 Bf4 c5 e3 Nc6 c3 Qb6 Qb3 c4 Qc2",
        c: {
          6: ["Тримаємо центр d4 пішаком c3.", "Hold d4 with the c3 pawn."],
          8: ["Пропонуємо розмін ферзів, захищаючи b2.", "Offer a queen trade while defending b2."],
          10: ["Ферзь на c2 контролює e4.", "The queen on c2 controls e4."],
        },
      },
      {
        key: "vs-e6-c5",
        uk: "Проти …e6 і …c5",
        en: "Against …e6 and …c5",
        moves: "d4 Nf6 Bf4 e6 e3 c5 c3 Nc6 Nd2 d5 Ngf3 Bd6 Bg3",
        c: {
          6: ["Пішак c3 тримає d4 після …cxd4.", "The c3 pawn holds d4 after …cxd4."],
          8: ["Кінь через d2 — не блокує пішака c.", "Knight via d2 — it does not block the c-pawn."],
          12: ["Відступ слона замість розміну на d6.", "Retreat the bishop rather than trade on d6."],
        },
      },
    ],
  },
  {
    id: "sicilian",
    side: "b",
    uk: "Сицилійський захист",
    en: "Sicilian Defence",
    unit: "ch-deep-sicilian-french",
    lines: [
      {
        key: "najdorf-be2",
        uk: "Найдорф: 6.Be2",
        en: "Najdorf: 6.Be2",
        moves: "e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be2 e5 Nb3 Be7",
        c: {
          1: ["Асиметрія: боремося за d4 флангом.", "Asymmetry: fight for d4 from the flank."],
          5: ["Міняємо фланговий пішак на центральний.", "Trade a wing pawn for a centre pawn."],
          7: ["Атака на e4 з розвитком.", "Attack e4 while developing."],
          9: ["a6 — ідея Найдорфа: без Bb5 і Nb5, готує …e5 або …b5.", "a6 — the Najdorf idea: no Bb5 or Nb5, prepares …e5 or …b5."],
          11: ["Відганяємо коня з центру і забираємо d4.", "Kick the knight from the centre and take d4."],
        },
      },
      {
        key: "najdorf-bg5",
        uk: "Найдорф: 6.Bg5",
        en: "Najdorf: 6.Bg5",
        moves: "e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Bg5 e6 f4 Qb6",
        c: {
          11: ["Проти Bg5 — …e6: кінь f6 знову захищений, слон f8 вільний.", "Against Bg5 play …e6: f6 is covered again and the f8 bishop is free."],
          13: ["Ферзь б'є по b2 і d4 — «отруєний пішак».", "The queen hits b2 and d4 — the Poisoned Pawn."],
        },
      },
      {
        key: "alapin",
        uk: "Проти Алапіна (2.c3)",
        en: "Against the Alapin (2.c3)",
        moves: "e4 c5 c3 Nf6 e5 Nd5 d4 cxd4 Nf3 Nc6 cxd4 d6",
        c: {
          3: ["Атакуємо e4 одразу, поки c3 забирає поле у коня.", "Hit e4 at once while c3 takes the knight's square."],
          5: ["Кінь на d5 — сильний централізований.", "The d5 knight is strong and central."],
          11: ["Підриваємо центр білих.", "Undermine White's centre."],
        },
      },
      {
        key: "closed",
        uk: "Закрита сицилійська",
        en: "Closed Sicilian",
        moves: "e4 c5 Nc3 Nc6 g3 g6 Bg2 Bg7 d3 d6",
        c: {
          3: ["Контролюємо d4 конем.", "Control d4 with the knight."],
          5: ["Дзеркальне фіанкето проти слона g2.", "A mirror fianchetto against the g2 bishop."],
          9: ["Міцна структура; план — …Rb8 і …b5.", "Solid structure; plan …Rb8 and …b5."],
        },
      },
      {
        key: "moscow",
        uk: "Проти 3.Bb5+",
        en: "Against 3.Bb5+",
        moves: "e4 c5 Nf3 d6 Bb5+ Bd7 Bxd7+ Qxd7 O-O Nc6 c3 Nf6",
        c: {
          5: ["Закриваємось слоном і міняємо найгіршого слона.", "Block with the bishop and trade our worst bishop."],
          7: ["Ферзем — кінь b8 піде на c6.", "With the queen — the b8 knight goes to c6."],
        },
      },
    ],
  },
  {
    id: "french",
    side: "b",
    uk: "Французький захист",
    en: "French Defence",
    unit: "ch-deep-sicilian-french",
    lines: [
      {
        key: "advance",
        uk: "Система просування",
        en: "Advance Variation",
        moves: "e4 e6 d4 d5 e5 c5 c3 Nc6 Nf3 Qb6 Be2 cxd4 cxd4 Nge7",
        c: {
          1: ["Готуємо …d5 і атаку на центр.", "Prepare …d5 and challenge the centre."],
          5: ["Головний підрив ланцюга — у основу d4.", "The key break — hit the base of the chain at d4."],
          9: ["Ферзь, кінь і пішак c тиснуть на d4.", "Queen, knight and c-pawn all press on d4."],
          13: ["Кінь іде на f5 — ще тиск на d4.", "The knight heads for f5 — more pressure on d4."],
        },
      },
      {
        key: "exchange",
        uk: "Розмінний варіант",
        en: "Exchange Variation",
        moves: "e4 e6 d4 d5 exd5 exd5 Nf3 Nf6 Bd3 Bd6 O-O O-O",
        c: {
          5: ["Симетрія: вільний розвиток і рівна гра.", "Symmetry: free development and equal play."],
          9: ["Дзеркальний розвиток слона.", "Mirror the bishop development."],
        },
      },
      {
        key: "classical",
        uk: "Класична система (3.Nc3 Nf6)",
        en: "Classical (3.Nc3 Nf6)",
        moves: "e4 e6 d4 d5 Nc3 Nf6 Bg5 Be7 e5 Nfd7 Bxe7 Qxe7",
        c: {
          5: ["Тиснемо на e4 конем.", "Put the knight on e4's case."],
          7: ["Розв'язуємось: слон e7 закриває зв'язку.", "Break the pin: the e7 bishop blocks it."],
          9: ["Кінь відступає на d7 — звідти підтримає …c5.", "The knight drops to d7 — from there it backs …c5."],
          11: ["Ферзем: на e7 він захищає f6 і b4 — далі …c5.", "With the queen: on e7 it covers key squares — next …c5."],
        },
      },
      {
        key: "tarrasch",
        uk: "Тарраш",
        en: "Tarrasch",
        moves: "e4 e6 d4 d5 Nd2 Nf6 e5 Nfd7 Bd3 c5 c3 Nc6 Ne2 cxd4 cxd4",
        c: {
          5: ["Тиск на e4, щоб вимусити e5.", "Pressure e4 to provoke e5."],
          9: ["Підрив центру …c5.", "Undermine the centre with …c5."],
          13: ["Відкриваємо c-вертикаль для гри.", "Open the c-file for play."],
        },
      },
    ],
  },
  {
    id: "caro-kann",
    side: "b",
    uk: "Захист Каро–Канн",
    en: "Caro-Kann Defence",
    unit: "ch-deep-caro-kid",
    lines: [
      {
        key: "classical",
        uk: "Класичний варіант",
        en: "Classical",
        moves: "e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5 Ng3 Bg6 h4 h6 Nf3 Nd7 h5 Bh7",
        c: {
          1: ["Готуємо …d5 без закриття слона c8.", "Prepare …d5 without blocking the c8 bishop."],
          7: ["Слон виходить до …e6 — головна ідея Каро-Канн.", "The bishop comes out before …e6 — the Caro-Kann idea."],
          11: ["Даємо слону поле h7.", "Give the bishop the h7 square."],
          13: ["Готуємо …Ngf6 без здвоєння пішаків.", "Prepare …Ngf6 without doubled pawns."],
        },
      },
      {
        key: "advance",
        uk: "Система просування",
        en: "Advance Variation",
        moves: "e4 c6 d4 d5 e5 Bf5 Nf3 e6 Be2 c5 O-O Nc6",
        c: {
          5: ["Слон виходить за ланцюг пішаків.", "The bishop gets outside the pawn chain."],
          9: ["Підрив d4 — як у французькому.", "Hit d4 — like in the French."],
          11: ["Ще тиск на d4 і розвиток.", "More pressure on d4 with development."],
        },
      },
      {
        key: "exchange",
        uk: "Розмінний варіант",
        en: "Exchange Variation",
        moves: "e4 c6 d4 d5 exd5 cxd5 Bd3 Nc6 c3 Nf6 Bf4 Bg4 Qb3 Qd7",
        c: {
          7: ["Розвиток з тиском на d4.", "Develop with pressure on d4."],
          11: ["Слон активний до …e6.", "The bishop is active before …e6."],
          13: ["Захищаємо b7 і зв'язуємо ферзя з розвитком.", "Defend b7 and connect with development."],
        },
      },
      {
        key: "two-knights",
        uk: "Два коні",
        en: "Two Knights",
        moves: "e4 c6 Nc3 d5 Nf3 Bg4 h3 Bxf3 Qxf3 e6 d4 Nf6 Bd3 dxe4 Nxe4 Qxd4",
        c: {
          5: ["Зв'язуємо коня, що захищає e4 і d4.", "Pin the knight that guards e4 and d4."],
          9: ["Міцний центр; слона білих стримує пішак e6.", "A solid centre; e6 blunts White's bishop."],
          15: ["Виграємо пішака d4.", "Win the d4 pawn."],
        },
      },
    ],
  },
  {
    id: "kings-indian",
    side: "b",
    uk: "Староіндійський захист",
    en: "King's Indian Defence",
    unit: "ch-deep-caro-kid",
    lines: [
      {
        key: "classical",
        uk: "Класична система",
        en: "Classical",
        moves: "d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Nf3 O-O Be2 e5 O-O Nc6 d5 Ne7 Nd2 a5",
        c: {
          3: ["Фіанкето — віддаємо центр, щоб атакувати його пізніше.", "Fianchetto — concede the centre to attack it later."],
          9: ["Король у безпеці перед ударом у центр.", "King safe before striking the centre."],
          11: ["Класичний підрив …e5.", "The classical …e5 break."],
          15: ["Кінь іде на королівський фланг — план …f5.", "The knight heads kingside — the …f5 plan."],
          17: ["Гальмуємо c5 білих на ферзевому фланзі.", "Slow down White's c5 push on the queenside."],
        },
      },
      {
        key: "saemisch",
        uk: "Семіш",
        en: "Sämisch",
        moves: "d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Be3 c5 dxc5 dxc5 Qxd8 Rxd8 Bxc5 Nc6",
        c: {
          11: ["Гамбіт …c5: слон g7 оживає по діагоналі.", "The …c5 gambit: the g7 bishop comes alive on the diagonal."],
          13: ["Відкрита d-вертикаль — для наших тур.", "The open d-file is for our rooks."],
          17: ["Розвиток з темпом — компенсація за пішака.", "Develop with tempo — compensation for the pawn."],
        },
      },
      {
        key: "fianchetto",
        uk: "Система з фіанкето",
        en: "Fianchetto System",
        moves: "d4 Nf6 c4 g6 Nf3 Bg7 g3 O-O Bg2 d6 O-O Nbd7 Nc3 e5",
        c: {
          7: ["Рокіровка — спершу безпека.", "Castle — safety first."],
          11: ["Кінь через d7 підтримує …e5.", "The knight via d7 supports …e5."],
          13: ["Боремося за центр.", "Fight for the centre."],
        },
      },
      {
        key: "vs-london",
        uk: "Проти Лондона",
        en: "Against the London",
        moves: "d4 Nf6 Nf3 g6 Bf4 Bg7 e3 d6 h3 O-O Be2 Nbd7",
        c: {
          7: ["Готуємо …e5 з темпом по слону f4.", "Prepare …e5 with tempo on the f4 bishop."],
          11: ["Кінь підтримує …e5.", "The knight supports …e5."],
        },
      },
    ],
  },
];

function buildRepertoire(spec: RepSpec): Repertoire {
  const root: OpeningNode[] = [];
  const lines: OpeningLine[] = [];
  let maxDepth = 0;
  spec.lines.forEach((ls, li) => {
    const sans = ls.moves.split(/\s+/).filter(Boolean);
    maxDepth = Math.max(maxDepth, sans.length);
    const key = `${spec.id}:${ls.key}`;
    lines.push({ key, nameUk: ls.uk, nameEn: ls.en, sans, comments: ls.c ?? {} });
    let level = root;
    sans.forEach((san, ply) => {
      let node = level.find((n) => n.san === san);
      if (!node) {
        node = { san, weight: 0 };
        level.push(node);
      }
      node.weight += 1;
      if (li === 0) node.mainline = true;
      const c = ls.c?.[ply];
      if (c && !node.commentUk) {
        node.commentUk = c[0];
        node.commentEn = c[1];
      }
      if (ply === sans.length - 1) node.lineKeys = [...(node.lineKeys ?? []), key];
      node.children ??= [];
      level = node.children;
    });
  });
  return { id: spec.id, side: spec.side, titleUk: spec.uk, titleEn: spec.en, unit: spec.unit, root, maxDepth, lines };
}

export const REPERTOIRES: Repertoire[] = SPECS.map(buildRepertoire);

export function getRepertoire(id: string): Repertoire | undefined {
  return REPERTOIRES.find((r) => r.id === id);
}

export function findOpeningLine(repertoireId: string, lineKey: string): OpeningLine | undefined {
  return getRepertoire(repertoireId)?.lines.find((l) => l.key === lineKey);
}

/** Children of the node reached by `history` (SAN from the start), or null when out of the tree. */
export function openingChildren(rep: Repertoire, history: readonly string[]): OpeningNode[] | null {
  let level = rep.root;
  for (const san of history) {
    const node = level.find((n) => n.san === san);
    if (!node) return null;
    level = node.children ?? [];
  }
  return level;
}

/**
 * Learner plies of a line: indices where the repertoire side moves.
 * White repertoires: 0, 2, 4…; Black: 1, 3, 5…
 */
export function learnerPlies(rep: Pick<Repertoire, "side">, line: OpeningLine): number[] {
  const start = rep.side === "w" ? 0 : 1;
  const out: number[] = [];
  for (let i = start; i < line.sans.length; i += 2) out.push(i);
  return out;
}

/**
 * Server-side grade of an opening line attempt. `tries[k]` lists the SANs the learner tried at
 * their k-th move, the last one being the move that let the line continue.
 * Correct only when every learner move was right on the first try.
 */
export function gradeOpeningAttempt(
  rep: Pick<Repertoire, "side">,
  line: OpeningLine,
  tries: unknown,
): { correct: boolean; mistakes: number; valid: boolean } {
  const plies = learnerPlies(rep, line);
  if (!Array.isArray(tries) || tries.length !== plies.length) return { correct: false, mistakes: 0, valid: false };
  let mistakes = 0;
  for (let k = 0; k < plies.length; k += 1) {
    const t = tries[k];
    if (!Array.isArray(t) || t.length === 0 || t.length > 10 || !t.every((x) => typeof x === "string")) {
      return { correct: false, mistakes, valid: false };
    }
    if (t[t.length - 1] !== line.sans[plies[k]!]) return { correct: false, mistakes, valid: false };
    mistakes += t.length - 1;
  }
  return { correct: mistakes === 0, mistakes, valid: true };
}

function fenKey(fen: string): string {
  return fen.trim().split(/\s+/).slice(0, 4).join(" ");
}

export type OpeningBookEntry = { all: string[]; mainline: string[] };

/** Position → book moves (SAN), built from every repertoire (both colours). */
export function buildOpeningBook(reps: readonly Repertoire[] = REPERTOIRES): Map<string, OpeningBookEntry> {
  const book = new Map<string, OpeningBookEntry>();
  const walk = (game: Chess, nodes: OpeningNode[]) => {
    const key = fenKey(game.fen());
    const entry = book.get(key) ?? { all: [], mainline: [] };
    for (const n of nodes) {
      for (let w = 0; w < n.weight; w += 1) entry.all.push(n.san);
      if (n.mainline && !entry.mainline.includes(n.san)) entry.mainline.push(n.san);
    }
    book.set(key, entry);
    for (const n of nodes) {
      if (!n.children?.length) continue;
      game.move(n.san);
      walk(game, n.children);
      game.undo();
    }
  };
  for (const r of reps) walk(new Chess(), r.root);
  return book;
}
