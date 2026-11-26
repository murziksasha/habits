/**
 * Endgame drills (SPEC/CHESS-DEEP-UPGRADE-PLAN.md, phase 6): play a theoretical endgame
 * to the end against the bot. "Win" drills must be won (mate or promotion) within the move
 * limit; "hold" drills must survive the limit or reach a rules draw.
 * Start evaluations are checked offline by scripts/chess-qa/endgame-drill-qa.mjs.
 */
import type { ChessEndgameDrillExercise } from "../types.js";

type Drill = Omit<ChessEndgameDrillExercise, "type" | "promptUk" | "promptEn" | "source"> & {
  lesson: string;
  titleUk: string;
  titleEn: string;
};

const D = (d: Drill): Drill => d;

export const ENDGAME_DRILL_SPECS: Drill[] = [
  // ── Win: opposition and key squares (3) ───────────────────────────────
  D({
    id: "ch-eg-opposition-e5",
    lesson: "opposition-basics",
    titleUk: "Пішак на 5-й, король попереду",
    titleEn: "Pawn on the 5th, king in front",
    fen: "4k3/8/4K3/4P3/8/8/8/8 w - - 0 1",
    goal: "promote",
    maxMoves: 12,
    themes: ["opposition", "pawnEndgame"],
    hintUk: "Займіть опозицію: король на d6 або f6, щойно чорний король відступить убік.",
    hintEn: "Take the opposition: king to d6 or f6 as soon as the black king steps aside.",
    explanationUk: "Король на 6-й перед пішаком виграє завжди: опозиція виводить пішака у ферзі.",
    explanationEn: "A king on the 6th in front of its pawn always wins: the opposition walks the pawn home.",
  }),
  D({
    id: "ch-eg-key-squares-e2",
    lesson: "ch-d-key-squares",
    titleUk: "Ключові поля пішака e2",
    titleEn: "Key squares of the e2 pawn",
    fen: "8/8/4k3/8/8/4K3/4P3/8 w - - 0 1",
    goal: "promote",
    maxMoves: 15,
    themes: ["keySquares", "pawnEndgame"],
    hintUk: "Ключові поля для e2 — d4, e4, f4. Станьте на одне з них першим.",
    hintEn: "The key squares of e2 are d4, e4 and f4. Get to one of them first.",
    explanationUk: "Король на ключовому полі виграє незалежно від черги ходу; пішака просуваємо лише після цього.",
    explanationEn: "A king on a key square wins whoever is to move; push the pawn only after that.",
  }),
  D({
    id: "ch-eg-king-ahead-d3",
    lesson: "ch-d-opp-types",
    titleUk: "Король перед пішаком на 5-й",
    titleEn: "King ahead of the pawn on the 5th",
    fen: "8/3k4/8/3K4/8/3P4/8/8 w - - 0 1",
    goal: "promote",
    maxMoves: 15,
    themes: ["opposition", "pawnEndgame"],
    hintUk: "Не поспішайте з пішаком: спершу опозиція, ходи пішака — запасні темпи.",
    hintEn: "Don't rush the pawn: opposition first, pawn moves are spare tempi.",
    explanationUk: "Король на 5-й перед пішаком (не крайнім) виграє: у вас є запасний хід пішаком, щоб віддати чергу ходу.",
    explanationEn: "A king on the 5th ahead of a non-rook pawn wins: a pawn move is a spare tempo to pass the move.",
  }),
  // ── Win: Lucena (2) ───────────────────────────────────────────────────
  D({
    id: "ch-eg-lucena-b7",
    lesson: "ch-d-lucena",
    titleUk: "Лусена: будуємо міст",
    titleEn: "Lucena: build a bridge",
    fen: "1K6/1P1k4/8/8/8/8/r7/2R5 w - - 0 1",
    goal: "promote",
    maxMoves: 15,
    themes: ["lucena", "rookEndgame"],
    hintUk: "Спершу шах королю з вертикалі (Rd1+), потім тура на 4-ту горизонталь — це «міст».",
    hintEn: "First check along the file (Rd1+), then the rook to the 4th rank — that's the bridge.",
    explanationUk: "Лусена: відрізати короля, тура на 4-ту, король виходить, а тура закриває шахи збоку.",
    explanationEn: "Lucena: cut the king off, rook to the 4th rank, walk the king out and block the checks with the rook.",
  }),
  D({
    id: "ch-eg-lucena-g7",
    lesson: "ch-d-lucena",
    titleUk: "Лусена на королівському фланзі",
    titleEn: "Lucena on the kingside",
    fen: "6K1/4k1P1/8/8/8/8/7r/5R2 w - - 0 1",
    goal: "promote",
    maxMoves: 15,
    themes: ["lucena", "rookEndgame"],
    hintUk: "Шах по вертикалі e (Re1+), щоб відігнати короля, далі тура на 4-ту горизонталь.",
    hintEn: "Check on the e-file (Re1+) to push the king away, then the rook to the 4th rank.",
    explanationUk: "Той самий міст, дзеркально: король ховається від шахів за турою на 4-й горизонталі.",
    explanationEn: "The same bridge, mirrored: the king hides from checks behind the rook on the 4th rank.",
  }),
  // ── Win: basic mates (KBN ×2, KQ, KR) ─────────────────────────────────
  D({
    id: "ch-eg-kbn-right-corner",
    lesson: "ch-d-kbn-mate",
    titleUk: "Слон і кінь: мат у правильному куті",
    titleEn: "Bishop and knight: mate in the right corner",
    fen: "7k/8/6K1/8/8/8/8/2B1N3 w - - 0 1",
    goal: "win",
    maxMoves: 15,
    themes: ["kbnMate", "mate"],
    hintUk: "Кут h8 — темнопольний, як ваш слон. Не дайте королю вийти з кута.",
    hintEn: "h8 is a dark corner, like your bishop. Don't let the king out of the corner.",
    explanationUk: "Мат слоном і конем ставиться лише в куті кольору слона; кінь і слон відбирають поля по черзі.",
    explanationEn: "Bishop and knight mate only in a corner of the bishop's colour; the pieces take squares in turn.",
  }),
  D({
    id: "ch-eg-kbn-wrong-corner",
    lesson: "ch-d-kbn-mate",
    titleUk: "Слон і кінь: перегнати короля з чужого кута",
    titleEn: "Bishop and knight: drive the king out of the wrong corner",
    fen: "k7/8/2K5/8/8/8/8/2B1N3 w - - 0 1",
    goal: "win",
    maxMoves: 40,
    themes: ["kbnMate", "mate"],
    hintUk: "Кут a8 — світлий, мат там неможливий. Женіть короля вздовж 8-ї горизонталі до h8 (метод «W» конем).",
    hintEn: "a8 is a light corner — no mate there. Drive the king along the 8th rank to h8 (the knight's W manoeuvre).",
    explanationUk: "Ліміт ~33 ходи при точній грі: тренуйте схему, де кінь і слон утримують короля на краю.",
    explanationEn: "About 33 moves with best play: drill the pattern where knight and bishop keep the king on the edge.",
  }),
  D({
    id: "ch-eg-kq-vs-k",
    lesson: "ladder-mate",
    titleUk: "Ферзь проти короля",
    titleEn: "Queen vs king",
    fen: "8/8/8/4k3/8/8/8/4K2Q w - - 0 1",
    goal: "win",
    maxMoves: 15,
    themes: ["queenMate", "mate"],
    hintUk: "Ферзь ходом коня від короля звужує «коробку»; не забувайте про пат.",
    hintEn: "Keep the queen a knight's move from the king to shrink the box; mind stalemate.",
    explanationUk: "Ферзь притискає короля до краю, свій король підходить — і мат за ~10 ходів.",
    explanationEn: "The queen pins the king to the edge, your king walks up — mate in about 10 moves.",
  }),
  D({
    id: "ch-eg-kr-vs-k",
    lesson: "ladder-mate",
    titleUk: "Тура проти короля",
    titleEn: "Rook vs king",
    fen: "8/8/8/4k3/8/8/8/4K2R w - - 0 1",
    goal: "win",
    maxMoves: 30,
    themes: ["rookMate", "mate"],
    hintUk: "Тура відрізає короля, ваш король стає в опозицію — тоді шах турою.",
    hintEn: "The rook cuts the king off; check only when your king stands in opposition.",
    explanationUk: "Метод «коробки»: тура зменшує простір, король підтримує, шах — лише в опозиції.",
    explanationEn: "The box method: the rook shrinks the space, the king supports, check only in opposition.",
  }),
  // ── Win: queen vs pawn on the 7th (1) ─────────────────────────────────
  D({
    id: "ch-eg-queen-vs-d-pawn",
    lesson: "ch-d-queen-pawn7",
    titleUk: "Ферзь проти центрального пішака на 7-й",
    titleEn: "Queen vs a central pawn on the 7th",
    fen: "8/8/8/8/1K6/8/3pk3/7Q w - - 0 1",
    goal: "win",
    maxMoves: 30,
    themes: ["queenVsPawn"],
    hintUk: "Шахами змусьте короля стати перед пішаком (на d1) — тоді король підходить на один крок.",
    hintEn: "Check until the king has to stand in front of the pawn (on d1) — then step your king closer.",
    explanationUk: "Проти центрального пішака ферзь виграє: кожен раз, коли король блокує пішака, ваш король робить крок.",
    explanationEn: "Against a central pawn the queen wins: each time the king blocks its pawn, your king gains a step.",
  }),
  // ── Hold: Philidor (2) ────────────────────────────────────────────────
  D({
    id: "ch-eg-philidor-e5",
    lesson: "ch-d-philidor-full",
    titleUk: "Філідор: тура на 6-й",
    titleEn: "Philidor: rook on the 6th",
    fen: "4k3/8/1r6/3KP3/8/8/8/R7 b - - 0 1",
    goal: "draw",
    maxMoves: 20,
    botLevel: "strong",
    themes: ["philidor", "rookEndgame", "defence"],
    hintUk: "Тримайте туру на 6-й горизонталі, доки пішак не піде на e6, — тоді шахи ззаду.",
    hintEn: "Keep the rook on the 6th rank until the pawn goes to e6 — then check from behind.",
    explanationUk: "Позиція Філідора: тура на 3-й від себе не пускає короля; коли пішак просунувся — шахи з тилу.",
    explanationEn: "Philidor: the rook on your 3rd rank keeps the king out; once the pawn advances, check from behind.",
  }),
  D({
    id: "ch-eg-philidor-f5",
    lesson: "ch-d-philidor-full",
    titleUk: "Філідор: оборона з іншого боку",
    titleEn: "Philidor: defending from the other side",
    fen: "3k4/8/r7/4PK2/8/8/8/7R b - - 0 1",
    goal: "draw",
    maxMoves: 20,
    botLevel: "strong",
    themes: ["philidor", "rookEndgame", "defence"],
    hintUk: "Король — на поле перед пішаком (e8/e7), тура — на 6-ту горизонталь.",
    hintEn: "King in front of the pawn (e8/e7), rook on the 6th rank.",
    explanationUk: "Тримайте короля перед пішаком і туру на 6-й: білий король не перейде на 6-ту.",
    explanationEn: "King in front of the pawn and the rook on the 6th: the white king can't cross to the 6th.",
  }),
  // ── Hold: Vancura (2) ─────────────────────────────────────────────────
  D({
    id: "ch-eg-vancura",
    lesson: "ch-d-vancura",
    titleUk: "Ванкура: тура атакує пішака збоку",
    titleEn: "Vancura: the rook attacks the pawn from the side",
    fen: "R7/6k1/P4r2/8/8/8/8/4K3 b - - 0 1",
    goal: "draw",
    maxMoves: 20,
    botLevel: "strong",
    themes: ["vancura", "rookEndgame", "defence"],
    hintUk: "Тура лишається на 6-й горизонталі і атакує a6 збоку; король — біля g7/h7.",
    hintEn: "Keep the rook on the 6th rank attacking a6 from the side; king near g7/h7.",
    explanationUk: "Позиція Ванкури: тура збоку прив'язує туру білих до пішака, а білий король не сховається від шахів.",
    explanationEn: "Vancura: the side rook ties White's rook to the pawn, and the white king can't hide from checks.",
  }),
  D({
    id: "ch-eg-vancura-king-comes",
    lesson: "ch-d-vancura",
    titleUk: "Ванкура: король білих іде на допомогу",
    titleEn: "Vancura: the white king comes to help",
    fen: "R7/6k1/P4r2/8/8/3K4/8/8 b - - 0 1",
    goal: "draw",
    maxMoves: 20,
    botLevel: "strong",
    themes: ["vancura", "rookEndgame", "defence"],
    hintUk: "Коли король підходить до пішака — шахи збоку, а потім тура знову на 6-ту.",
    hintEn: "When the king approaches the pawn — side checks, then the rook back to the 6th.",
    explanationUk: "Король білих підходить, але шахи збоку і повернення тури на 6-ту тримають нічию.",
    explanationEn: "The white king approaches, but side checks and the rook's return to the 6th hold the draw.",
  }),
  // ── Hold: rook pawn, wrong bishop, fortress, opposite bishops (4) ───
  D({
    id: "ch-eg-rook-pawn-corner",
    lesson: "ch-d-rook-pawn",
    titleUk: "Крайній пішак: король у куті",
    titleEn: "Rook pawn: king in the corner",
    fen: "k7/8/1K6/P7/8/8/8/8 b - - 0 1",
    goal: "draw",
    maxMoves: 15,
    botLevel: "strong",
    themes: ["rookPawn", "pawnEndgame", "defence"],
    hintUk: "Ходіть між a8 і b8: король у куті перед крайнім пішаком — нічия.",
    hintEn: "Shuttle between a8 and b8: a king in front of a rook pawn draws.",
    explanationUk: "Крайній пішак не виграє, якщо король сторони, що захищається, дістався кута.",
    explanationEn: "A rook pawn can't win once the defending king reaches the corner.",
  }),
  D({
    id: "ch-eg-wrong-bishop",
    lesson: "ch-d-bn-ending",
    titleUk: "Неправильний слон",
    titleEn: "The wrong bishop",
    fen: "7k/8/5K2/7P/8/8/2B5/8 b - - 0 1",
    goal: "draw",
    maxMoves: 15,
    botLevel: "strong",
    themes: ["wrongBishop", "defence"],
    hintUk: "Не виходьте з кута h8/g8: світлопольний слон не контролює темне поле h8.",
    hintEn: "Stay in the h8/g8 corner: a light-squared bishop can't control dark h8.",
    explanationUk: "Слон не того кольору, що поле перетворення крайнього пішака, — нічия, якщо король у куті.",
    explanationEn: "A bishop not matching the rook pawn's queening square draws once the king is in the corner.",
  }),
  D({
    id: "ch-eg-fortress-c-pawn",
    lesson: "ch-d-queen-pawn7",
    titleUk: "Фортеця: c-пішак проти ферзя",
    titleEn: "Fortress: c-pawn vs queen",
    fen: "K7/8/8/8/8/8/1Qpk4/8 b - - 0 1",
    goal: "draw",
    maxMoves: 15,
    botLevel: "strong",
    themes: ["fortress", "queenVsPawn", "defence"],
    hintUk: "Король — до кута a1/b1: якщо взяти пішака — пат.",
    hintEn: "Head for the a1/b1 corner: taking the pawn would be stalemate.",
    explanationUk: "Пішак c (або a) на 7-й рятується від ферзя: коли білий король далеко, оборона спирається на пат.",
    explanationEn: "A c- (or a-) pawn on the 7th survives against a queen while the king is far: stalemate saves it.",
  }),
  D({
    id: "ch-eg-opposite-bishops",
    lesson: "ch-d-same-opp-b",
    titleUk: "Різнопільні слони: блокада",
    titleEn: "Opposite-coloured bishops: the blockade",
    fen: "5b2/8/4k3/8/3PK3/3B4/8/8 b - - 0 1",
    goal: "draw",
    maxMoves: 20,
    botLevel: "strong",
    themes: ["oppositeBishops", "defence"],
    hintUk: "Король стоїть на d5/d6 перед пішаком, слон контролює темні поля.",
    hintEn: "Keep your king on d5/d6 in front of the pawn; the bishop watches dark squares.",
    explanationUk: "З різнопільними слонами зайвий пішак не виграє: король блокує поле перед ним.",
    explanationEn: "With opposite-coloured bishops an extra pawn doesn't win: the king blockades the square in front.",
  }),
];

function prompt(d: Drill): { promptUk: string; promptEn: string } {
  const side = d.fen.split(" ")[1] === "b" ? { uk: "чорні", en: "Black" } : { uk: "білі", en: "White" };
  if (d.goal === "draw")
    return {
      promptUk: `${d.titleUk}. Ви — ${side.uk}: утримайте нічию ${d.maxMoves} ходів проти бота.`,
      promptEn: `${d.titleEn}. You are ${side.en}: hold the draw for ${d.maxMoves} moves against the bot.`,
    };
  if (d.goal === "promote")
    return {
      promptUk: `${d.titleUk}. Ви — ${side.uk}: проведіть пішака у ферзі за ${d.maxMoves} ходів.`,
      promptEn: `${d.titleEn}. You are ${side.en}: promote the pawn within ${d.maxMoves} moves.`,
    };
  return {
    promptUk: `${d.titleUk}. Ви — ${side.uk}: поставте мат за ${d.maxMoves} ходів.`,
    promptEn: `${d.titleEn}. You are ${side.en}: deliver mate within ${d.maxMoves} moves.`,
  };
}

export function endgameDrill(d: Drill): ChessEndgameDrillExercise {
  const { lesson: _l, titleUk: _tu, titleEn: _te, ...rest } = d;
  return {
    ...rest,
    type: "chess_endgame_drill",
    ...prompt(d),
    botLevel: d.botLevel ?? "strong",
    source: { kind: "theory" },
  };
}

/** Drills grouped by lesson slug. */
export const ENDGAME_DRILLS_BY_LESSON: ReadonlyMap<string, ChessEndgameDrillExercise[]> = (() => {
  const m = new Map<string, ChessEndgameDrillExercise[]>();
  for (const d of ENDGAME_DRILL_SPECS) m.set(d.lesson, [...(m.get(d.lesson) ?? []), endgameDrill(d)]);
  return m;
})();
