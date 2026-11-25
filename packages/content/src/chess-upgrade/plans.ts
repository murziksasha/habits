/**
 * chess_plan conversions (SPEC/CHESS-DEEP-UPGRADE-PLAN.md §1.4, §1.6).
 *
 * Strategic "find the thematic move" items were not real puzzles: several moves were
 * equally good. Each entry keeps its exercise id and becomes a 3-choice plan question.
 * Rule (checked with scripts/chess-qa/plan-probe.mjs, Stockfish 17.1, depth 15–16):
 * the correct move is within 40 cp of the engine's best, both wrong moves are ≥ 80 cp worse.
 * The first choice listed is the correct one; `applyChessUpgrade` rotates the order.
 */

export type PlanChoice = { san: string; uk: string; en: string };
export type PlanSpec = {
  /** New position when the original FEN was broken or duplicated an exam item. */
  fen?: string;
  promptUk: string;
  promptEn: string;
  choices: [PlanChoice, PlanChoice, PlanChoice];
  themes: string[];
  source?: { kind: "game" | "theory"; white?: string; black?: string; year?: number; event?: string };
  reviewOf?: string;
};

const BREAK_F5: PlanSpec["choices"] = [
  { san: "f5", uk: "Так! Центр закритий ходом d5, тому чорні атакують на королівському фланзі: …f5 підриває e4 і відкриває лінію f для тури.", en: "Yes! The centre is closed by d5, so Black plays on the kingside: …f5 hits e4 and opens the f-file for the rook." },
  { san: "g5", uk: "Передчасно: після Bxg5 чорні просто втрачають пішака, а підрив f5 так і не зроблено.", en: "Premature: after Bxg5 Black just loses a pawn and the f5 break still has not been played." },
  { san: "b5", uk: "Не той фланг: після cxb5 у чорних мінус пішак, а грати треба там, куди вказують пішаки, — на королівському фланзі.", en: "Wrong wing: after cxb5 Black is a pawn down. Play where the pawn chain points — on the kingside." },
];

export const CHESS_PLANS: Record<string, PlanSpec> = {
  "ch-d-bn-closed-p1": {
    promptUk: "Закритий центр староіндійського. Куди перебудувати коня e1?",
    promptEn: "A closed King's Indian centre. Where should the e1-knight regroup?",
    choices: [
      { san: "Nd3", uk: "Кінь із d3 підтримує підрив c4–c5 і стримує f4. Це природний маршрут у закритому центрі.", en: "From d3 the knight supports the c4–c5 break and keeps an eye on f4: the natural route in a closed centre." },
      { san: "Nb1", uk: "Пасивний відступ: кінь нічого не контролює, а чорні тим часом готують …h5 і …g4.", en: "A passive retreat: the knight controls nothing while Black prepares …h5 and …g4." },
      { san: "h4", uk: "Відкриває королівський фланг саме там, де атакують чорні: …gxh4 і лінія g відкрита для них.", en: "Opens the kingside exactly where Black attacks: …gxh4 and the g-file opens for Black." },
    ],
    themes: ["development", "pieceActivity"],
  },
  "ch-d-breaks-p1": {
    promptUk: "Староіндійський, центр закритий ходом d5. Який план у чорних?",
    promptEn: "King's Indian, centre closed by d5. What is Black's plan?",
    choices: BREAK_F5,
    themes: ["pawnBreak"],
  },
  "ch-d-kid-attack-p1": {
    promptUk: "Мар-дель-Плата: як чорні починають атаку?",
    promptEn: "Mar del Plata: how does Black start the attack?",
    choices: BREAK_F5,
    themes: ["pawnBreak", "kingsideAttack"],
    reviewOf: "ch-d-breaks-p1",
  },
  "ch-d-caro-adv-p1": {
    promptUk: "Каро–Канн, система з просуванням. Як чорні атакують ланцюг білих?",
    promptEn: "Caro-Kann Advance. How does Black attack White's pawn chain?",
    choices: [
      { san: "c5", uk: "Тематичний підрив основи ланцюга d4. Слон уже вийшов на f5, тож …c5 — головний план.", en: "The thematic strike at the base of the chain, d4. The bishop is already out on f5, so …c5 is the main plan." },
      { san: "g5", uk: "Ослаблює короля і просто віддає пішака після Bxg5.", en: "Weakens the king and simply drops a pawn after Bxg5." },
      { san: "Nf6", uk: "Кінь не може стояти на f6: exf6 — і чорні втратили фігуру.", en: "The knight cannot live on f6: exf6 and Black has lost a piece." },
    ],
    themes: ["pawnBreak"],
  },
  "ch-d-chains-p1": {
    promptUk: "Ланцюг c3–d4–e5. Куди бити чорним?",
    promptEn: "The c3–d4–e5 chain. Where should Black strike?",
    choices: [
      { san: "c5", uk: "Атакуйте основу ланцюга — пішака d4. Після …c5 і …Nc6 тиск на d4 стає реальним.", en: "Attack the base of the chain — d4. After …c5 and …Nc6 the pressure on d4 is real." },
      { san: "f5", uk: "Замикає центр: після Ng5 пішак e6 стає вічною слабкістю, а основа d4 недоторкана.", en: "Locks the centre: after Ng5 the e6-pawn is a permanent weakness and the d4 base is untouched." },
      { san: "b5", uk: "Нічого не атакує і віддає пішака: Bxb5.", en: "Attacks nothing and gives a pawn away: Bxb5." },
    ],
    themes: ["pawnBreak"],
  },
  "ch-d-defence-p1": {
    promptUk: "Ферзь h5 і слон d3 б'ють по h7. Як захиститися?",
    promptEn: "The queen on h5 and the bishop on d3 hit h7. How do you defend?",
    choices: [
      { san: "Nf6", uk: "Кінь закриває h7 і з темпом атакує ферзя. Найкращий захист — той, що ще й розвиває фігуру.", en: "The knight covers h7 and attacks the queen with tempo. The best defence also develops a piece." },
      { san: "h6", uk: "Створює гачок: Bxh6! gxh6 Qxh6 — і укриття короля зруйноване.", en: "Creates a hook: Bxh6! gxh6 Qxh6 and the king's cover is gone." },
      { san: "Re8", uk: "Ігнорує загрозу: Qxh7+ Kf8 Qh8+ — і король під матовою атакою.", en: "Ignores the threat: Qxh7+ Kf8 Qh8+ and the king is under a mating attack." },
    ],
    themes: ["defensiveMove"],
  },
  "ch-d-fischer-spassky-p1": {
    promptUk: "Фішер — Спаський, 1972, 6-та партія, хід 20. Як білі відкривають гру?",
    promptEn: "Fischer–Spassky, 1972, game 6, move 20. How does White open the game?",
    choices: [
      { san: "e4", uk: "Хід Фішера: e4 підриває висячі пішаки c5/d5. Після …dxe4 або …d4 фігури білих отримують поля e4/c4 і шлях до короля.", en: "Fischer's move: e4 undermines the hanging c5/d5 pawns. After …dxe4 or …d4 White's pieces get e4/c4 and a route to the king." },
      { san: "Bc4", uk: "Груба помилка: …dxc4 — слон просто втрачений.", en: "A blunder: …dxc4 and the bishop is simply lost." },
      { san: "g4", uk: "Ослаблює власного короля і нічого не робить проти центру чорних.", en: "Weakens White's own king and does nothing against Black's centre." },
    ],
    themes: ["pawnBreak", "centre"],
    source: { kind: "game", white: "Robert Fischer", black: "Boris Spassky", year: 1972, event: "World Championship, Reykjavik, game 6" },
  },
  "ch-d-karpov-model-p1": {
    promptUk: "Карпов — Унцикер, 1974, хід 24. Лінія a відкрита. Що грати?",
    promptEn: "Karpov–Unzicker, 1974, move 24. The a-file is open. What should White play?",
    choices: [
      { san: "Ba7", uk: "Тихий хід Карпова: слон закриває лінію a для чорних тур, а білі тури потім її захоплюють.", en: "Karpov's quiet move: the bishop shuts the a-file for Black's rooks; later White's rooks take it over." },
      { san: "Re2", uk: "Дає розмін на лінії a: …Rxa2 Qxa2 Ra8 — і чорні вирівнюють гру.", en: "Allows the trade on the a-file: …Rxa2 Qxa2 Ra8 and Black equalises." },
      { san: "Nd4", uk: "Кінь просто втрачається: …exd4.", en: "The knight is simply lost: …exd4." },
    ],
    themes: ["prophylaxis", "quietMove"],
    source: { kind: "game", white: "Anatoly Karpov", black: "Wolfgang Unzicker", year: 1974, event: "Nice Olympiad" },
  },
  "ch-d-london-idea-p1": {
    promptUk: "Лондонська система. Який типовий план білих?",
    promptEn: "London System. What is White's typical plan?",
    choices: [
      { san: "Ne5", uk: "Кінь стрибає на форпост e5, звідки його не вигнати пішаком d6. Далі f4 закріплює позицію.", en: "The knight jumps to the e5 outpost, where no d6-pawn can chase it; f4 can follow to support it." },
      { san: "Qe2", uk: "Повільно: чорні грають …e5 і звільняють гру в центрі.", en: "Too slow: Black plays …e5 and frees the centre." },
      { san: "a4", uk: "Хід без плану на фланзі, де нічого не відбувається; …e5 знову звільняє чорних.", en: "A planless move on a quiet wing; …e5 frees Black again." },
    ],
    themes: ["outpost"],
  },
  "ch-d-minority-p1": {
    promptUk: "Структура Карлсбад. Який план у білих?",
    promptEn: "The Carlsbad structure. What is White's plan?",
    choices: [
      { san: "b4", uk: "Атака меншості: b4–b5 створює слабкого пішака c6 або d5. Дві пішаки ферзевого флангу атакують три.", en: "The minority attack: b4–b5 leaves Black with a weak c6- or d5-pawn. Two queenside pawns attack three." },
      { san: "e4", uk: "Передчасне відкриття центру: …Nxe4 — і білі втрачають пішака.", en: "Opens the centre too early: …Nxe4 and White loses a pawn." },
      { san: "g3", uk: "Ослаблює поле h3: …Bxh3 — і білі втрачають пішака без компенсації.", en: "Weakens h3: …Bxh3 and White drops a pawn for nothing." },
    ],
    themes: ["minorityAttack"],
  },
  "ch-d-opp-castle-p1": {
    promptUk: "Англійська атака, різнобічні рокіровки. Як білі атакують?",
    promptEn: "English Attack, opposite-side castling. How does White attack?",
    choices: [
      { san: "g4", uk: "Пішаковий штурм: g4–g5 виганяє коня f6. При різнобічних рокіровках вирішує швидкість атаки.", en: "The pawn storm: g4–g5 kicks the f6-knight. With opposite castling, speed decides." },
      { san: "Be2", uk: "Пасивно: чорні встигають …d5 і першими відкривають центр.", en: "Passive: Black gets in …d5 and opens the centre first." },
      { san: "Nb3", uk: "Втрачає темп; чорні починають власну атаку …Nc6 і …b5.", en: "Loses time; Black starts the queenside attack with …Nc6 and …b5." },
    ],
    themes: ["pawnStorm", "kingsideAttack"],
  },
  "ch-d-prepare-p1": {
    promptUk: "Іспанська, чорні готували гостру лінію. Яке ідейне рішення?",
    promptEn: "Ruy Lopez: Black prepared a sharp line. What is the idea?",
    choices: [
      { san: "d5", uk: "Гамбіт Маршалла: пішак за ініціативу і атаку на короля. Підготовлена гостра лінія — сильна зброя в турнірі.", en: "The Marshall Gambit: a pawn for the initiative and a kingside attack. A prepared sharp line is a strong tournament weapon." },
      { san: "Bc5", uk: "Після d4 слон потрапляє під удар, а центр білих стає дуже сильним.", en: "After d4 the bishop is hit and White's centre becomes very strong." },
      { san: "Nxe4", uk: "Rxe4 — фігура за пішака; навіть після …d5 матеріалу не повернути.", en: "Rxe4 — a piece for a pawn; even …d5 does not win it back." },
    ],
    themes: ["opening"],
  },
  "ch-d-prophylaxis-p1": {
    promptUk: "Чорні хочуть …Nb4 проти слона d3. Як відповісти?",
    promptEn: "Black wants …Nb4 against the d3-bishop. How should White respond?",
    choices: [
      { san: "a3", uk: "Профілактика: забираємо поле b4, і план суперника зникає ще до початку.", en: "Prophylaxis: take b4 away, and the opponent's plan disappears before it starts." },
      { san: "Ne5", uk: "Після …Nxe5 dxe5 Bxe5 білі просто втратили пішака.", en: "After …Nxe5 dxe5 Bxe5 White has simply lost a pawn." },
      { san: "g4", uk: "Ослаблює короля і віддає пішака: …Nxg4.", en: "Weakens the king and drops a pawn: …Nxg4." },
    ],
    themes: ["prophylaxis"],
  },
  "ch-d-ruy-exch-p1": {
    promptUk: "Іспанська, розмінний варіант: білі передчасно взяли на e5. Як чорні повертають пішака?",
    promptEn: "Ruy Lopez Exchange: White took on e5 too early. How does Black win the pawn back?",
    choices: [
      { san: "Qd4", uk: "Подвійний удар ферзем: атака коня e5 і пішака e4. Чорні повертають пішака з кращою грою.", en: "A queen double attack on the e5-knight and the e4-pawn. Black regains the pawn with the better game." },
      { san: "Bd6", uk: "Повільно: після Nf3 білі залишаються з зайвим пішаком.", en: "Too slow: after Nf3 White stays a pawn up." },
      { san: "Be6", uk: "Розвиток, але пішак втрачено: d4 — і білі закріплюють центр.", en: "Development, but the pawn is gone: d4 and White secures the centre." },
    ],
    themes: ["fork", "opening"],
  },
  "ch-d-sic-open-p1": {
    promptUk: "Сицилійська з …e5: поле d5 ослаблене. Що грати білим?",
    promptEn: "A Sicilian with …e5: d5 is weak. What should White play?",
    choices: [
      { san: "Nd5", uk: "Кінь займає дірку d5. Чорні не можуть вигнати його пішаком, і він тисне на f6 та c7.", en: "The knight occupies the d5 hole. No pawn can chase it, and it presses f6 and c7." },
      { san: "Ne2", uk: "Відступ від головного поля: чорні грають …h5 і спокійно розвиваються.", en: "Retreats from the key square: Black plays …h5 and develops in peace." },
      { san: "Naxb5", uk: "Жертва не проходить: …axb5 — і компенсації за фігуру немає.", en: "The sacrifice fails: …axb5 and there is no compensation for the piece." },
    ],
    themes: ["outpost"],
  },
  "ch-d-fr-winawer-p1": {
    promptUk: "Французька Вінавера, білі зіграли Qg4. Головна відповідь чорних?",
    promptEn: "French Winawer: White played Qg4. What is Black's main reply?",
    choices: [
      { san: "Qc7", uk: "Головний хід: чорні віддають g7 за контргру по лінії c і тиск на c3/e5.", en: "The main move: Black gives up g7 for play on the c-file and pressure on c3/e5." },
      { san: "Qb6", uk: "Ферзь іде не туди: Qxg7 Rg8 Qxh7 — і чорні втратили два пішаки без контргри.", en: "The queen goes the wrong way: Qxg7 Rg8 Qxh7 and Black loses two pawns with no counterplay." },
      { san: "Rg8", uk: "Пасивно: після Bd3 тура скута захистом g7, а розвиток відстає.", en: "Passive: after Bd3 the rook is tied to g7 and development lags." },
    ],
    themes: ["opening"],
  },
  "ch-d-philidor-full-p1": {
    promptUk: "Пішак уже на e6. Як захищатися турою?",
    promptEn: "The pawn is already on e6. How should the rook defend?",
    choices: [
      { san: "Ra1", uk: "Тура йде якомога далі й дає шахи ззаду: король білих не сховається від шахів. Нічия.", en: "The rook goes as far back as possible and checks from behind: the white king cannot hide. A draw." },
      { san: "Kf8", uk: "Король іде не туди: Kf6 — і білі будують Лусену, позиція програна.", en: "The king goes the wrong way: Kf6 and White builds a winning position." },
      { san: "Ra2", uk: "Rxa2 — розмін тур, і пішаковий ендшпіль програний.", en: "Rxa2 trades rooks, and the pawn ending is lost." },
    ],
    themes: ["philidor", "rookEndgame"],
  },
  "ch-deep-sicilian-french-exam-p5": {
    promptUk: "Гамбіт Мілнера-Бері: пішак d4 «висить». Що грати чорним?",
    promptEn: "Milner-Barry Gambit: the d4-pawn looks loose. What should Black play?",
    choices: [
      { san: "Bc5", uk: "Розвиток із тиском на d4 без ризику. Брати пішака ферзем зараз не можна.", en: "Develops with pressure on d4 and no risk. Taking the pawn with the queen now is wrong." },
      { san: "Qxd4", uk: "Пастка: Bb5+! — відкритий напад ферзя d1 на d4, і чорні втрачають ферзя.", en: "The trap: Bb5+! uncovers the d1-queen on d4, and Black loses the queen." },
      { san: "Qxb2", uk: "Bb5+ і Bxb2 — чорні втрачають ферзя.", en: "Bb5+ and Bxb2 — Black loses the queen." },
    ],
    themes: ["openingTrap"],
  },
  "ch-deep-sicilian-french-exam-p6": {
    promptUk: "Вінавер: білі можуть узяти «отруєного» пішака g7. Що грати?",
    promptEn: "Winawer: White can take the 'poisoned' g7-pawn. What should White play?",
    choices: [
      { san: "Qxg7", uk: "Беріть: пішак g7 не отруєний, ферзь потім бере h7, а чорні шукають компенсацію в центрі.", en: "Take it: g7 is not really poisoned; the queen then takes h7 while Black looks for central compensation." },
      { san: "Kd2", uk: "Король у центрі без потреби: …O-O — і чорні спокійно розвиваються.", en: "A pointless king walk: …O-O and Black develops calmly." },
      { san: "Qd1", uk: "Відступ без мети: …cxd4 — і чорні отримують гру на c3.", en: "A purposeless retreat: …cxd4 and Black gets play against c3." },
    ],
    themes: ["opening"],
  },
  "ch-d-sic-najdorf-p1": {
    fen: "r2q1rk1/3nbppp/p2pb3/1p2p1Pn/4P3/1NN1BP2/PPPQ3P/2KR1B1R w - - 1 13",
    promptUk: "Найдорф з …e5, англійська атака. Яке ключове поле займають білі?",
    promptEn: "Najdorf with …e5, English Attack. Which key square does White occupy?",
    choices: [
      { san: "Nd5", uk: "Кінь стає на дірку d5. Після …Bxd5 exd5 у білих просторова перевага і тиск по лінії c.", en: "The knight lands on the d5 hole. After …Bxd5 exd5 White has space and pressure on the c-file." },
      { san: "Qd3", uk: "Відкриває g5: …Bxg5 Bxg5 Qxg5+ — і білі втрачають пішака з шахом.", en: "Leaves g5 loose: …Bxg5 Bxg5 Qxg5+ and White drops a pawn with check." },
      { san: "f4", uk: "…exf4 — пішак g5 висить, і центр білих розвалюється.", en: "…exf4 — the g5-pawn hangs and White's centre falls apart." },
    ],
    themes: ["outpost"],
  },
  "ch-d-sic-dragon-p1": {
    promptUk: "Югославська атака проти дракона: білі готують h4–h5. Як відповісти чорним?",
    promptEn: "Yugoslav Attack against the Dragon: White prepares h4–h5. How should Black respond?",
    choices: [
      { san: "h5", uk: "Варіант Солтіса: …h5 зупиняє h4–h5 і відкриття лінії h. Жертва на c3 тут ще передчасна.", en: "The Soltis idea: …h5 stops h4–h5 and the opening of the h-file. The c3 sacrifice is premature here." },
      { san: "Rxc3", uk: "Передчасно: після bxc3 у білих зайва якість, а атака на h-лінії продовжується.", en: "Premature: after bxc3 White is the exchange up and the h-file attack goes on." },
      { san: "Nfg4", uk: "fxg4 — кінь просто втрачений.", en: "fxg4 and the knight is simply lost." },
    ],
    themes: ["defensiveMove", "pawnStorm"],
  },
  "ch-d-space-p1": {
    promptUk: "Зв'язка Мароці: у чорних мало простору. Що їм робити?",
    promptEn: "Maroczy Bind: Black is cramped. What should Black do?",
    choices: [
      { san: "Nxd4", uk: "Розмінюйте фігури: що менше фігур, то менше заважає брак простору. Після Bxd4 …Be6 у чорних міцна позиція.", en: "Trade pieces: the fewer pieces, the less the lack of space hurts. After Bxd4 …Be6 Black is solid." },
      { san: "d5", uk: "Звільнювальний прорив тут не працює: cxd5 — і чорні втрачають пішака.", en: "The freeing break does not work here: cxd5 and Black loses a pawn." },
      { san: "Nxe4", uk: "Nxe4 — фігура за пішака без компенсації.", en: "Nxe4 — a piece for a pawn with no compensation." },
    ],
    themes: ["centre"],
  },
  "ch-d-hanging-p1": {
    promptUk: "Висячі пішаки c5 і d5. Що грати чорним?",
    promptEn: "Hanging pawns on c5 and d5. What should Black play?",
    choices: [
      { san: "c4", uk: "Просування c4 відтісняє слона d3 і захоплює простір; пішак d5 отримує надійну опору.", en: "The c4 advance kicks the d3-bishop and gains space; the d5-pawn gets solid support." },
      { san: "Bd7", uk: "Пасивно: Bb1 і Ne5 — білі посилюють тиск на висячих пішаків.", en: "Passive: Bb1 and Ne5 and White increases the pressure on the hanging pawns." },
      { san: "Qb7", uk: "Rxc5 — пішак c5 просто втрачений.", en: "Rxc5 — the c5-pawn is simply lost." },
    ],
    themes: ["pawnBreak"],
  },
  "ch-d-two-weaknesses-p1": {
    promptUk: "Атака меншості вже йде, але слон g5 під ударом коня e6. Що спершу?",
    promptEn: "The minority attack is underway, but the g5-bishop is attacked by the e6-knight. What comes first?",
    choices: [
      { san: "Bh4", uk: "Спершу збережіть слона і зв'язку. Слабкості чорних нікуди не дінуться — план b5 зачекає один хід.", en: "First save the bishop and keep the pin. Black's weaknesses are not going anywhere; b5 can wait a move." },
      { san: "e4", uk: "…Nxg5 Nxg5 Nxe4 — центр відкрито, і білі втрачають пішака.", en: "…Nxg5 Nxg5 Nxe4 — the centre opens and White loses a pawn." },
      { san: "Rbc1", uk: "Ігнорує удар: …Nxg5 — і білі втрачають слона за коня та ще й пішака b4.", en: "Ignores the threat: …Nxg5 and White loses the bishop pair and then the b4-pawn." },
    ],
    themes: ["minorityAttack", "pieceActivity"],
  },
  "ch-d-activity-material-p1": {
    promptUk: "Тура f5 активна. Як посилити атаку чорних?",
    promptEn: "The f5-rook is active. How does Black strengthen the attack?",
    choices: [
      { san: "Rh5", uk: "Перехід тури на h5: тиск на h2 і король білих під ударом. Активність важливіша за негайний матеріал.", en: "The rook swings to h5: pressure on h2 and the white king. Activity matters more than immediate material." },
      { san: "Rxf3", uk: "Жертва якості тут передчасна: gxf3 — і атаки недостатньо за туру.", en: "The exchange sacrifice is premature here: gxf3 and the attack is not worth the rook." },
      { san: "Qc4", uk: "Пропонує розмін ферзів — без ферзя атака зникає.", en: "Offers a queen trade — without the queen the attack is gone." },
    ],
    themes: ["pieceActivity", "kingsideAttack"],
  },
  "ch-d-opp-bishops-mid-p1": {
    promptUk: "Відкрита іспанська, король білих на f2. Що грати чорним?",
    promptEn: "Open Spanish, the white king is on f2. What should Black play?",
    choices: [
      { san: "f6", uk: "Підрив пішака e5: лінія f відкривається проти короля f2, а слон e6 отримує простір.", en: "Undermine the e5-pawn: the f-file opens against the king on f2, and the e6-bishop gets room." },
      { san: "Qh4+", uk: "Шах заради шаху: g3 — ферзь мусить відступати, і білі виграють темп.", en: "A check for its own sake: g3 and the queen must retreat, so White gains time." },
      { san: "Qe7", uk: "Пасивно: білі встигають Nb3 і розвивають ферзевий фланг.", en: "Passive: White gets Nb3 in and develops the queenside." },
    ],
    themes: ["pawnBreak", "pieceActivity"],
  },
  "ch-d-same-side-p1": {
    promptUk: "Обидва королі на королівському фланзі. Що грати білим?",
    promptEn: "Both kings castled short. What should White play?",
    choices: [
      { san: "Ba4", uk: "Зв'язка коня c6: слон тисне на c6, і чорні не можуть спокійно розвиватися. Атака — це й підготовка.", en: "Pins the c6-knight: the bishop presses c6 and Black cannot develop smoothly. Attack starts with preparation." },
      { san: "Re3", uk: "Підйом тури на e3 тут помилка: …Bxb3 і …Bxe3 — білі втрачають якість.", en: "The rook lift fails here: …Bxb3 and …Bxe3 and White loses the exchange." },
      { san: "Nf5", uk: "…Bxf5 exf5 Qxf5 — білі просто втрачають пішака.", en: "…Bxf5 exf5 Qxf5 and White simply loses a pawn." },
    ],
    themes: ["pieceActivity"],
  },
  "ch-d-swiss-rating-p1": {
    fen: "r1bq1rk1/pp2bppp/2n1pn2/2pp4/3P4/2P1PN2/PP1NBPPP/R1BQ1RK1 b - - 0 10",
    promptUk: "Останній тур, вам потрібна перемога, але позиція спокійна. Який хід?",
    promptEn: "Last round, you need a win, but the position is quiet. Which move?",
    choices: [
      { san: "b6", uk: "Розвивайтеся і зберігайте напругу. Потреба перемогти — не привід для ризикованих ходів у рівній позиції.", en: "Develop and keep the tension. Needing a win is no reason for risky moves in a level position." },
      { san: "e5", uk: "Передчасне відкриття центру: після dxe5 у чорних ізольовані пішаки і гірша гра.", en: "Opens the centre too early: after dxe5 Black is left with weak pawns and the worse game." },
      { san: "g5", uk: "Авантюра: Nxg5 — пішак втрачено, а король ослаблений.", en: "A gamble: Nxg5 and Black loses a pawn and weakens the king." },
    ],
    themes: ["development"],
  },
  "ch-d-fr-advance-p1": {
    promptUk: "Гамбіт Мілнера-Бері: пішак d4 «висить». Що грати чорним?",
    promptEn: "Milner-Barry Gambit: the d4-pawn looks loose. What should Black play?",
    choices: [
      { san: "Bd7", uk: "Спершу Bd7 — це знімає шах Bb5+. Пішака d4 можна брати пізніше, не потрапляючи в пастку.", en: "First Bd7, taking the sting out of Bb5+. d4 can be taken later without falling into the trap." },
      { san: "Nxd4", uk: "Nxd4 Qxd4?? Bb5+ — і ферзь d4 втрачений. Відома пастка.", en: "Nxd4 Qxd4?? Bb5+ and the d4-queen is lost — the famous trap." },
      { san: "Nf6", uk: "exf6 — кінь втрачений, e5 захищений.", en: "exf6 and the knight is lost; e5 was defended." },
    ],
    themes: ["openingTrap"],
  },
  "ch-deep-sicilian-french-exam-p7": {
    promptUk: "Відкрита сицилійська. Найсильніше продовження білих?",
    promptEn: "Open Sicilian. What is White's strongest continuation?",
    choices: [
      { san: "Nxc6", uk: "Розмін на c6 і далі e5: кінь f6 відганяють, а пішаки чорних ферзевого флангу слабкі.", en: "Trade on c6 and then e5: the f6-knight is driven away and Black's queenside pawns are weak." },
      { san: "Nxe6", uk: "Жертва на e6 тут не працює: …Qxd1+ Nxd1 Bxe6 — фігура за пішака.", en: "The e6 sacrifice fails here: …Qxd1+ Nxd1 Bxe6 — a piece for a pawn." },
      { san: "Bf4", uk: "…Nxd4 — кінь d4 був незахищений, білі втрачають фігуру.", en: "…Nxd4 — the d4-knight was loose; White loses a piece." },
    ],
    themes: ["centre"],
  },
  "ch-d-bn-open-p1": {
    promptUk: "Відкрита іспанська структура. Що грати білим?",
    promptEn: "An open Spanish structure. What should White play?",
    choices: [
      { san: "dxe5", uk: "Відкрийте центр: у відкритій позиції краще слони й активні фігури, а пішак f6 ослаблений.", en: "Open the centre: open positions favour active pieces, and the f6-pawn becomes a target." },
      { san: "Nc4", uk: "…exd4 — пішак d4 падає з ударом по e3, кінь c4 нічого не дає.", en: "…exd4 — d4 falls with a hit on e3; the c4-knight achieves nothing." },
      { san: "Bg5", uk: "…fxg5 — слон просто втрачений.", en: "…fxg5 and the bishop is simply lost." },
    ],
    themes: ["centre"],
  },
  "ch-d-piece-trade-p1": {
    promptUk: "Слон g5 дивиться на коня f6. Розмін можливий, але чи найкращий? Оберіть план.",
    promptEn: "The g5-bishop eyes the f6-knight. A trade is possible, but is it best? Choose the plan.",
    choices: [
      { san: "e4", uk: "Центральний прорив e4: простір і ініціатива. Розмін на f6 не тікає — спершу посильте центр.", en: "The central e4 break: space and initiative. The trade on f6 can wait; strengthen the centre first." },
      { san: "g4", uk: "…Nxg4 — пішак втрачено, король ослаблений.", en: "…Nxg4 and White loses a pawn and weakens the king." },
      { san: "b4", uk: "…cxb4 — пішак втрачено без компенсації.", en: "…cxb4 and White loses a pawn for nothing." },
    ],
    themes: ["centre", "goodBadBishop"],
  },
  "ch-d-qg-plans-p1": {
    promptUk: "Карлсбад, кінь на e2. Який план тут найкращий?",
    promptEn: "Carlsbad with the knight on e2. Which plan is best here?",
    choices: [
      { san: "f3", uk: "Центральний план: f3 і e4. З конем на e2 саме він сильніший за атаку меншості.", en: "The central plan: f3 and e4. With the knight on e2 it is stronger than the minority attack." },
      { san: "f4", uk: "…Ng4 — поле e3 і король ослаблені, слон g5 обмінюють.", en: "…Ng4 — e3 and the king are weakened, and the g5-bishop is traded off." },
      { san: "g4", uk: "…Nxg4 — пішак втрачено і король відкритий.", en: "…Nxg4 — a pawn lost and the king exposed." },
    ],
    themes: ["centre"],
  },
  "ch-d-slav-idea-p1": {
    promptUk: "Слов'янський: білі зіграли e4, не взявши на c4. Що грати чорним?",
    promptEn: "Slav: White played e4 without taking on c4. What should Black play?",
    choices: [
      { san: "b5", uk: "Утримайте зайвого пішака c4: …b5 підтримує його, і білим ще треба довести компенсацію.", en: "Hold the extra c4-pawn: …b5 supports it, and White still has to prove compensation." },
      { san: "a6", uk: "Повільно: Bxc4 — білі повертають пішака з чудовим центром.", en: "Too slow: Bxc4 and White regains the pawn with a great centre." },
      { san: "Be6", uk: "d5! — слона виганяють, і білі отримують простір із темпом.", en: "d5! kicks the bishop, and White gains space with tempo." },
    ],
    themes: ["opening"],
  },
  "ch-deep-italian-ruy-exam-p4": {
    promptUk: "Відкрите італійське: слон c5 під ударом. Що грати чорним?",
    promptEn: "Open Giuoco: the c5-bishop is attacked. What should Black play?",
    choices: [
      { san: "Bb4+", uk: "Відступ із шахом: темп виграно, і білі мусять вирішити, як закритися.", en: "Retreat with check: Black gains time and White must decide how to block." },
      { san: "d5", uk: "exd5 — центр відкривається на користь білих, які краще розвинені.", en: "exd5 — the centre opens in favour of the better-developed White." },
      { san: "Bb6", uk: "e5 — кінь f6 мусить тікати, і білі захоплюють простір.", en: "e5 — the f6-knight must move and White grabs space." },
    ],
    themes: ["opening"],
  },
  "ch-deep-italian-ruy-exam-p5": {
    promptUk: "Закрита іспанська: білі готові до прориву. Що грати?",
    promptEn: "Closed Ruy Lopez: White is ready for the break. What should White play?",
    choices: [
      { san: "d4", uk: "Прорив d4: білі займають центр, поки чорні не встигли …d5.", en: "The d4 break: White takes the centre before Black gets …d5 in." },
      { san: "Bd3", uk: "…d5 — чорні першими відкривають центр.", en: "…d5 — Black opens the centre first." },
      { san: "Bb3", uk: "…Nxb3 — чорні отримують двох слонів.", en: "…Nxb3 and Black gets the bishop pair." },
    ],
    themes: ["pawnBreak", "centre"],
  },
  "ch-deep-caro-kid-exam-p5": {
    promptUk: "Класичний Каро–Канн. Як розвинути світлопольного слона?",
    promptEn: "Classical Caro-Kann. How should Black develop the light-squared bishop?",
    choices: [
      { san: "Bf5", uk: "Слон виходить на активну діагональ з темпом по коню e4 — ще до …e6.", en: "The bishop reaches its active diagonal with tempo on the e4-knight — before …e6." },
      { san: "e6", uk: "Замикає слона c8 за пішаками — саме цього Каро–Канн уникає.", en: "Locks the c8-bishop behind the pawns — exactly what the Caro-Kann tries to avoid." },
      { san: "Nh6", uk: "Bxh6 — псує пішакову структуру чорних.", en: "Bxh6 ruins Black's pawn structure." },
    ],
    themes: ["development", "opening"],
  },
  "ch-d-kid-ideas-p1": {
    promptUk: "Староіндійський: білі зарано взяли на e5 конем. Як повернути матеріал?",
    promptEn: "King's Indian: White took on e5 too early with the knight. How does Black win material back?",
    choices: [
      { san: "Nxe4", uk: "…Nxe4 Nxe4 Bxe5 — чорні повертають пішака з добрими фігурами.", en: "…Nxe4 Nxe4 Bxe5 and Black regains the pawn with active pieces." },
      { san: "h5", uk: "Повільно: Nd3 — білі зберігають зайвого пішака.", en: "Too slow: Nd3 and White keeps the extra pawn." },
      { san: "Be6", uk: "Nf3 — кінь повертається, і зайвий пішак у білих.", en: "Nf3 — the knight retreats and White stays a pawn up." },
    ],
    themes: ["opening"],
  },
  "ch-deep-qg-london-exam-p6": {
    fen: "r1bq1rk1/pp1nbppp/2p1pn2/6B1/2BP4/2N1PN2/PP3PPP/2RQK2R b K - 0 9",
    promptUk: "Ортодоксальний захист ферзевого гамбіту. Як чорним звільнити гру?",
    promptEn: "Queen's Gambit Declined, Orthodox Defence. How does Black free the position?",
    choices: [
      { san: "Nd5", uk: "Звільнювальний маневр Капабланки: …Nd5 і розміни легких фігур знімають тиск.", en: "Capablanca's freeing manoeuvre: …Nd5 and minor-piece trades release the pressure." },
      { san: "e5", uk: "dxe5 — пішак втрачено, центр відкрито на користь білих.", en: "dxe5 — a pawn lost and the centre opens for White." },
      { san: "Ne4", uk: "Nxe4 — кінь d7 не підтримує e4, чорні втрачають фігуру.", en: "Nxe4 — nothing supports e4; Black loses a piece." },
    ],
    themes: ["development"],
  },
  "ch-deep-caro-kid-exam-p6": {
    fen: "r1bq1rk1/ppp1n1bp/3p1np1/3Pp3/2P1Pp2/2NN1P2/PP1BB1PP/R2Q1RK1 w - - 0 13",
    promptUk: "Староіндійський, закритий центр. Де білі грають?",
    promptEn: "King's Indian, closed centre. Where does White play?",
    choices: [
      { san: "c5", uk: "Прорив c4–c5 на ферзевому фланзі — головний план білих проти атаки чорних на королівському.", en: "The c4–c5 break on the queenside — White's main plan against Black's kingside attack." },
      { san: "h4", uk: "Відкриває фланг, де атакують чорні: …Nh5 і …Ng3.", en: "Opens the wing where Black attacks: …Nh5 and …Ng3." },
      { san: "Nxe5", uk: "dxe5 — фігура за пішака.", en: "…dxe5 — a piece for a pawn." },
    ],
    themes: ["pawnBreak"],
  },
  "ch-deep-planning-exam-p5": {
    fen: "r1bq1rk1/2p1bppp/p1np1n2/1p2p3/4P3/1BP2N2/PP1P1PPP/RNBQR1K1 w - - 1 9",
    promptUk: "Закрита іспанська. Чорні хочуть …Bg4. Що грати?",
    promptEn: "Closed Ruy Lopez. Black wants …Bg4. What should White play?",
    choices: [
      { san: "h3", uk: "Профілактика: h3 забирає поле g4 і готує d4 без зв'язки коня.", en: "Prophylaxis: h3 takes g4 away and prepares d4 without a pin on the knight." },
      { san: "Ng5", uk: "Атака на f7 без підтримки: …Na5 — і слон b3 розмінюється.", en: "An unsupported raid on f7: …Na5 and the b3-bishop is traded off." },
      { san: "Nh4", uk: "…Nxe4 — центральний пішак втрачено.", en: "…Nxe4 — the central pawn is lost." },
    ],
    themes: ["prophylaxis"],
  },
  "ch-deep-planning-exam-p6": {
    fen: "2kr2nr/2p3pp/pp1bbp2/2p5/P3P3/1NN1BP2/1PP3PP/R2R2K1 w - - 1 14",
    promptUk: "Розмінна іспанська, ендшпіль. Як активізувати гру білих?",
    promptEn: "Exchange Ruy Lopez endgame. How does White activate?",
    choices: [
      { san: "a5", uk: "a5 атакує пішакову структуру чорних і відкриває лінію a для тури — активність понад усе.", en: "a5 attacks Black's pawn structure and opens the a-file for the rook — activity first." },
      { san: "Ne2", uk: "Пасивна перебудова: …Ne7 — і чорні спокійно розвиваються.", en: "A passive regrouping: …Ne7 and Black develops calmly." },
      { san: "Rxd6", uk: "Жертва якості без потреби: …cxd6 — білі просто без тури за слона.", en: "An unnecessary exchange sacrifice: …cxd6 and White is simply the exchange down." },
    ],
    themes: ["pieceActivity"],
  },
  "ch-deep-minor-pieces-exam-p5": {
    fen: "r1bq1rk1/pp4pp/2n1pn2/3p4/3P1N2/3B1N2/PP3PPP/R2Q1RK1 b - - 0 13",
    promptUk: "Французька з ізольованим пішаком d5. Куди поставити коня f6?",
    promptEn: "French with an isolated d5-pawn. Where should the f6-knight go?",
    choices: [
      { san: "Ne4", uk: "Форпост e4 під захистом пішака d5: кінь там активний і контролює важливі поля.", en: "The e4 outpost, defended by d5: the knight is active there and controls key squares." },
      { san: "e5", uk: "dxe5 — пішак втрачено, а кінь f6 атакований.", en: "dxe5 — a pawn lost, and the f6-knight is hit." },
      { san: "Nxd4", uk: "Nxd4 — кінь втрачений, пішак d4 був захищений.", en: "Nxd4 — the knight is lost; d4 was defended." },
    ],
    themes: ["outpost"],
  },
  "ch-deep-minor-pieces-exam-p6": {
    fen: "r1b1r1k1/pp2qppp/2p1n3/3p3n/3P4/2NBPP2/PPQ1N1PP/R4RK1 w - - 0 14",
    promptUk: "Кінь чорних пішов на h5, і королівський фланг оголився. Що грати?",
    promptEn: "Black's knight went to h5, leaving the kingside bare. What should White play?",
    choices: [
      { san: "Bxh7+", uk: "Слон b1–h7 б'є на h7 з шахом: кінь f6 більше не захищає короля, і білі виграють пішака з атакою.", en: "The bishop takes on h7 with check: no f6-knight guards the king, so White wins a pawn with attack." },
      { san: "f4", uk: "Ослаблює e4 і e3; …g6 — і шанс на h7 зник.", en: "Weakens e4 and e3; …g6 and the h7 chance is gone." },
      { san: "Na4", uk: "Кінь іде з гри: …Ng5 — і чорні перегруповуються.", en: "The knight leaves play: …Ng5 and Black regroups." },
    ],
    themes: ["pieceActivity", "kingsideAttack"],
  },
  "ch-deep-attack-king-exam-p5": {
    fen: "r1bq1rk1/p3bppp/1p2pn2/3nN1B1/3P4/2NB4/PP3PPP/R2Q1RK1 w - - 0 13",
    promptUk: "Ізольований пішак d4, кінь на e5. Як білим посилити ініціативу?",
    promptEn: "Isolated d4-pawn, knight on e5. How does White increase the initiative?",
    choices: [
      { san: "Nc6", uk: "Кінь стрибає на c6 і атакує ферзя та слона e7: білі виграють якість.", en: "The knight jumps to c6 and hits the queen and the e7-bishop: White wins the exchange." },
      { san: "a3", uk: "Повільно: …Bb7 — чорні закривають c6 і вирівнюють гру.", en: "Too slow: …Bb7 and Black covers c6 and equalises." },
      { san: "Qd2", uk: "…Bb7 і …Nxc3 — ініціатива зникла.", en: "…Bb7 and …Nxc3 and the initiative is gone." },
    ],
    themes: ["fork", "pieceActivity"],
  },
  "ch-deep-pawn-play-exam-p5": {
    fen: "r2qrnk1/pp2bppp/2p1bn2/3p2B1/3P4/2NBPN2/PPQ2PPP/1R3RK1 w - - 9 12",
    promptUk: "Карлсбад, тура вже на b1. Який план?",
    promptEn: "Carlsbad, the rook is already on b1. What is the plan?",
    choices: [
      { san: "b4", uk: "Атака меншості: b4–b5 проти c6. Тура b1 уже підтримує просування.", en: "The minority attack: b4–b5 against c6. The b1-rook already supports the advance." },
      { san: "e4", uk: "…dxe4 Nxe4 Nxe4 — центр відкрито, а білі втратили пішака.", en: "…dxe4 Nxe4 Nxe4 — the centre opens and White is a pawn down." },
      { san: "g4", uk: "…Bxg4 — пішак втрачено, король ослаблений.", en: "…Bxg4 — a pawn lost and the king weakened." },
    ],
    themes: ["minorityAttack"],
  },
  "ch-deep-pawn-play-exam-p6": {
    fen: "r1b1kbnr/pp3ppp/1qn1p3/2ppP3/3P4/P1P2N2/1P3PPP/RNBQKB1R b KQkq - 0 6",
    promptUk: "Французька, система з просуванням: білі зіграли a3, готуючи b4. Що грати чорним?",
    promptEn: "French Advance: White played a3, preparing b4. What should Black play?",
    choices: [
      { san: "c4", uk: "…c4 зупиняє b4 і закриває ферзевий фланг: чорні отримують простір і план …Na5–b3.", en: "…c4 stops b4 and locks the queenside: Black gains space and the …Na5–b3 plan." },
      { san: "f5", uk: "Замикає центр і ослаблює e6; білі спокійно грають b4.", en: "Locks the centre and weakens e6; White calmly plays b4." },
      { san: "Nxd4", uk: "cxd4 — кінь втрачений, d4 був захищений.", en: "cxd4 — the knight is lost; d4 was defended." },
    ],
    themes: ["pawnBreak"],
  },
  "ch-deep-famous-2-exam-p5": {
    fen: "4q2k/2r1r1p1/4Pn1p/p1p2R2/P2pQ2P/1P1B1R2/6P1/6K1 w - - 9 38",
    promptUk: "Фішер — Спаський, 1972, 6-та партія, хід 38. Завершіть атаку.",
    promptEn: "Fischer–Spassky, 1972, game 6, move 38. Finish the attack.",
    choices: [
      { san: "Rxf6", uk: "Хід Фішера: Rxf6! — після …gxf6 Rxf6 захист короля зруйновано, і пішак e6 вирішує.", en: "Fischer's move: Rxf6! — after …gxf6 Rxf6 the king's cover is gone and the e6-pawn decides." },
      { san: "Qe1", uk: "Відступ: …Rxe6 — чорні знищують пішака e6 і рятуються.", en: "A retreat: …Rxe6 and Black removes the e6-pawn and survives." },
      { san: "h5", uk: "…Nxe4 — ферзь e4 був під ударом коня.", en: "…Nxe4 — the e4-queen was attacked by the knight." },
    ],
    themes: ["exchangeSacrifice", "kingsideAttack"],
    source: { kind: "game", white: "Robert Fischer", black: "Boris Spassky", year: 1972, event: "World Championship, Reykjavik, game 6" },
  },
  "ch-deep-famous-2-exam-p6": {
    fen: "r1rnb1k1/B1n1qpbp/3p2p1/1p1Pp3/1Pp1P3/2P4P/R2QNPPN/RB4K1 w - - 14 30",
    promptUk: "Карпов — Унцикер, 1974, хід 30. Ферзевий фланг заблоковано. Що далі?",
    promptEn: "Karpov–Unzicker, 1974, move 30. The queenside is locked. What next?",
    choices: [
      { san: "f4", uk: "Друга фронт: f4 відкриває гру на королівському фланзі, де фігури чорних скуті. Так Карпов і зіграв.", en: "A second front: f4 opens play on the kingside, where Black's pieces are tied up — Karpov's choice." },
      { san: "Nd4", uk: "…exd4 — кінь просто втрачений.", en: "…exd4 — the knight is simply lost." },
      { san: "Rb2", uk: "Знімає контроль з лінії a: …Nxd5 — і чорні звільняються.", en: "Gives up the a-file: …Nxd5 and Black breaks free." },
    ],
    themes: ["pieceActivity"],
    source: { kind: "game", white: "Anatoly Karpov", black: "Wolfgang Unzicker", year: 1974, event: "Nice Olympiad" },
  },
};
