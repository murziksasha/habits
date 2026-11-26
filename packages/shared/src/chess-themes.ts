/**
 * Chess puzzle theme dictionary. Keys follow Lichess puzzle themes so imported puzzles
 * keep their tags; a few course-only keys (opposition, triangulation, lucena…) are added.
 * Ukrainian terms avoid Russian calques ("Турові", not "Ладейні"; "Лусена", not "Лучена").
 */
export type ChessThemeGroup = "tactic" | "mate" | "endgame" | "opening" | "strategy" | "phase";

export const CHESS_THEMES = {
  fork: { uk: "Вилка", en: "Fork", group: "tactic" },
  pin: { uk: "Зв’язка", en: "Pin", group: "tactic" },
  skewer: { uk: "Наскрізний удар", en: "Skewer", group: "tactic" },
  discoveredAttack: { uk: "Відкритий напад", en: "Discovered attack", group: "tactic" },
  doubleCheck: { uk: "Подвійний шах", en: "Double check", group: "tactic" },
  deflection: { uk: "Відволікання", en: "Deflection", group: "tactic" },
  attraction: { uk: "Заманювання", en: "Attraction", group: "tactic" },
  interference: { uk: "Перекриття", en: "Interference", group: "tactic" },
  clearance: { uk: "Звільнення лінії", en: "Clearance", group: "tactic" },
  xRayAttack: { uk: "Рентген", en: "X-ray attack", group: "tactic" },
  intermezzo: { uk: "Проміжний хід", en: "Intermezzo", group: "tactic" },
  overloading: { uk: "Перевантаження", en: "Overloading", group: "tactic" },
  capturingDefender: { uk: "Знищення захисника", en: "Capture the defender", group: "tactic" },
  trappedPiece: { uk: "Фігура в пастці", en: "Trapped piece", group: "tactic" },
  hangingPiece: { uk: "Незахищена фігура", en: "Hanging piece", group: "tactic" },
  sacrifice: { uk: "Жертва", en: "Sacrifice", group: "tactic" },
  quietMove: { uk: "Тихий хід", en: "Quiet move", group: "tactic" },
  defensiveMove: { uk: "Захисний хід", en: "Defensive move", group: "tactic" },
  exposedKing: { uk: "Відкритий король", en: "Exposed king", group: "tactic" },
  kingsideAttack: { uk: "Атака на королівському фланзі", en: "Kingside attack", group: "tactic" },
  queensideAttack: { uk: "Атака на ферзевому фланзі", en: "Queenside attack", group: "tactic" },
  attackingF2F7: { uk: "Атака на f2/f7", en: "Attacking f2/f7", group: "tactic" },
  zugzwang: { uk: "Цугцванг", en: "Zugzwang", group: "tactic" },
  greekGift: { uk: "Грецький дар", en: "Greek gift", group: "tactic" },
  exchangeSacrifice: { uk: "Жертва якості", en: "Exchange sacrifice", group: "tactic" },
  enPassant: { uk: "Взяття на проході", en: "En passant", group: "tactic" },
  discoveredCheck: { uk: "Відкритий шах", en: "Discovered check", group: "tactic" },
  castling: { uk: "Рокіровка", en: "Castling", group: "tactic" },
  mate: { uk: "Мат", en: "Checkmate", group: "mate" },
  mateIn1: { uk: "Мат в 1 хід", en: "Mate in 1", group: "mate" },
  mateIn2: { uk: "Мат у 2 ходи", en: "Mate in 2", group: "mate" },
  mateIn3: { uk: "Мат у 3 ходи", en: "Mate in 3", group: "mate" },
  mateIn4: { uk: "Мат у 4 ходи", en: "Mate in 4", group: "mate" },
  mateIn5: { uk: "Мат у 5 ходів", en: "Mate in 5", group: "mate" },
  backRankMate: { uk: "Мат на останній горизонталі", en: "Back-rank mate", group: "mate" },
  smotheredMate: { uk: "Спертий мат", en: "Smothered mate", group: "mate" },
  anastasiaMate: { uk: "Мат Анастасії", en: "Anastasia's mate", group: "mate" },
  arabianMate: { uk: "Арабський мат", en: "Arabian mate", group: "mate" },
  bodenMate: { uk: "Мат Бодена", en: "Boden's mate", group: "mate" },
  doubleBishopMate: { uk: "Мат двома слонами", en: "Double bishop mate", group: "mate" },
  dovetailMate: { uk: "Мат «ластівчин хвіст»", en: "Dovetail mate", group: "mate" },
  hookMate: { uk: "Мат «гачок»", en: "Hook mate", group: "mate" },
  killBoxMate: { uk: "Мат «коробка»", en: "Kill box mate", group: "mate" },
  vukovicMate: { uk: "Мат Вуковича", en: "Vukovic mate", group: "mate" },
  balestraMate: { uk: "Мат Балестри", en: "Balestra mate", group: "mate" },
  cornerMate: { uk: "Мат у куті", en: "Corner mate", group: "mate" },
  morphysMate: { uk: "Мат Морфі", en: "Morphy's mate", group: "mate" },
  pillsburysMate: { uk: "Мат Пілсбері", en: "Pillsbury's mate", group: "mate" },
  damianosMate: { uk: "Мат Даміано", en: "Damiano's mate", group: "mate" },
  legalsMate: { uk: "Мат Легаля", en: "Légal's mate", group: "mate" },
  operaMate: { uk: "Оперний мат", en: "Opera mate", group: "mate" },
  epauletteMate: { uk: "Мат «еполети»", en: "Epaulette mate", group: "mate" },
  triangleMate: { uk: "Мат «трикутник»", en: "Triangle mate", group: "mate" },
  blindSwineMate: { uk: "Мат «сліпі свині»", en: "Blind swine mate", group: "mate" },
  swallowstailMate: { uk: "Мат «ластівка»", en: "Swallow's tail mate", group: "mate" },
  promotion: { uk: "Перетворення пішака", en: "Promotion", group: "endgame" },
  underPromotion: { uk: "Недопромоція", en: "Underpromotion", group: "endgame" },
  advancedPawn: { uk: "Просунутий пішак", en: "Advanced pawn", group: "endgame" },
  pawnEndgame: { uk: "Пішаковий ендшпіль", en: "Pawn endgame", group: "endgame" },
  rookEndgame: { uk: "Туровий ендшпіль", en: "Rook endgame", group: "endgame" },
  bishopEndgame: { uk: "Слоновий ендшпіль", en: "Bishop endgame", group: "endgame" },
  knightEndgame: { uk: "Кінний ендшпіль", en: "Knight endgame", group: "endgame" },
  queenEndgame: { uk: "Ферзевий ендшпіль", en: "Queen endgame", group: "endgame" },
  queenRookEndgame: { uk: "Ферзь і тура в ендшпілі", en: "Queen and rook endgame", group: "endgame" },
  opposition: { uk: "Опозиція", en: "Opposition", group: "endgame" },
  keySquares: { uk: "Ключові поля", en: "Key squares", group: "endgame" },
  triangulation: { uk: "Тріангуляція", en: "Triangulation", group: "endgame" },
  lucena: { uk: "Позиція Лусени", en: "Lucena position", group: "endgame" },
  philidor: { uk: "Позиція Філідора", en: "Philidor position", group: "endgame" },
  vancura: { uk: "Позиція Ванкури", en: "Vancura position", group: "endgame" },
  rookPawn: { uk: "Крайній пішак", en: "Rook pawn", group: "endgame" },
  fortress: { uk: "Фортеця", en: "Fortress", group: "endgame" },
  stalemate: { uk: "Пат", en: "Stalemate", group: "endgame" },
  bishopKnightMate: { uk: "Мат слоном і конем", en: "Bishop and knight mate", group: "endgame" },
  opening: { uk: "Дебют", en: "Opening", group: "phase" },
  middlegame: { uk: "Мітельшпіль", en: "Middlegame", group: "phase" },
  endgame: { uk: "Ендшпіль", en: "Endgame", group: "phase" },
  openingTrap: { uk: "Дебютна пастка", en: "Opening trap", group: "opening" },
  development: { uk: "Розвиток", en: "Development", group: "opening" },
  centre: { uk: "Центр", en: "Centre", group: "opening" },
  pawnBreak: { uk: "Пішаковий підрив", en: "Pawn break", group: "strategy" },
  minorityAttack: { uk: "Атака меншості", en: "Minority attack", group: "strategy" },
  outpost: { uk: "Форпост", en: "Outpost", group: "strategy" },
  prophylaxis: { uk: "Профілактика", en: "Prophylaxis", group: "strategy" },
  pieceActivity: { uk: "Активність фігур", en: "Piece activity", group: "strategy" },
  goodBadBishop: { uk: "Добрий і поганий слон", en: "Good and bad bishop", group: "strategy" },
  pawnStorm: { uk: "Пішаковий штурм", en: "Pawn storm", group: "strategy" },
  crushing: { uk: "Розгромна перевага", en: "Crushing", group: "phase" },
  advantage: { uk: "Перевага", en: "Advantage", group: "phase" },
  equality: { uk: "Рівновага", en: "Equality", group: "phase" },
  oneMove: { uk: "Один хід", en: "One move", group: "phase" },
  short: { uk: "Коротка задача", en: "Short puzzle", group: "phase" },
  long: { uk: "Довга задача", en: "Long puzzle", group: "phase" },
  veryLong: { uk: "Дуже довга задача", en: "Very long puzzle", group: "phase" },
  master: { uk: "Партія майстрів", en: "Master game", group: "phase" },
  masterVsMaster: { uk: "Майстер проти майстра", en: "Master vs master", group: "phase" },
  superGM: { uk: "Партія супергросмейстерів", en: "Super GM game", group: "phase" },
  collinearMove: { uk: "Хід по лінії", en: "Collinear move", group: "phase" },
} as const satisfies Record<string, { uk: string; en: string; group: ChessThemeGroup }>;

export type ChessThemeKey = keyof typeof CHESS_THEMES;

export function isChessThemeKey(value: string): value is ChessThemeKey {
  return Object.prototype.hasOwnProperty.call(CHESS_THEMES, value);
}

/** Themes that describe length/size, not an idea; hidden from learners. */
export const META_CHESS_THEMES: ReadonlySet<string> = new Set([
  "crushing",
  "advantage",
  "equality",
  "oneMove",
  "short",
  "long",
  "veryLong",
  "master",
  "masterVsMaster",
  "superGM",
  "collinearMove",
  "opening",
  "middlegame",
  "endgame",
]);

export function chessThemeLabel(key: string, locale: "uk" | "en" = "uk"): string {
  if (!isChessThemeKey(key)) return key;
  return CHESS_THEMES[key][locale];
}

/** Learner-facing themes: known keys, meta tags removed, at most `max`. */
export function visibleChessThemes(themes: readonly string[] | undefined, max = 3): ChessThemeKey[] {
  return (themes ?? []).filter((t): t is ChessThemeKey => isChessThemeKey(t) && !META_CHESS_THEMES.has(t)).slice(0, max);
}
