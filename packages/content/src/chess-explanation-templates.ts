/**
 * Template hints and explanations for chess puzzles (SPEC/CHESS-DEEP-UPGRADE-PLAN.md §2.4, §2.6).
 * Facts come from scripts/chess-qa/chess-facts.mjs. Authored text always wins;
 * template text is marked `explanationKind: "template"` so it can be replaced later.
 */
import type { ChessLineFacts } from "./chess-facts.generated.js";

const PIECE_UK_ACC: Record<string, string> = { p: "пішака", n: "коня", b: "слона", r: "туру", q: "ферзя", k: "короля" };
const PIECE_UK_NOM: Record<string, string> = { p: "Пішак", n: "Кінь", b: "Слон", r: "Тура", q: "Ферзь", k: "Король" };
const PIECE_EN: Record<string, string> = { p: "pawn", n: "knight", b: "bishop", r: "rook", q: "queen", k: "king" };
const PROMO_UK: Record<string, string> = { q: "ферзя", r: "туру", b: "слона", n: "коня" };

/** Theme → one-sentence idea. Ordered by priority when a puzzle has several themes. */
const IDEAS: Array<[string, string, string]> = [
  ["smotheredMate", "Кінь ставить спертий мат: власні фігури забирають у короля всі поля.", "The knight delivers smothered mate: the king's own pieces take away every square."],
  ["backRankMate", "Король замкнений власними пішаками на останній горизонталі — тура чи ферзь матують.", "The king is locked in on the back rank by its own pawns, so a rook or queen mates."],
  ["arabianMate", "Арабський мат: тура біля короля під захистом коня.", "Arabian mate: the rook next to the king, protected by the knight."],
  ["anastasiaMate", "Мат Анастасії: кінь забирає поля, тура матує по крайній вертикалі.", "Anastasia's mate: the knight covers the flight squares and the rook mates on the edge file."],
  ["bodenMate", "Мат Бодена: два слони на діагоналях, що перетинаються.", "Boden's mate: two bishops on crossing diagonals."],
  ["bishopKnightMate", "Слон і кінь заганяють короля в кут кольору слона.", "Bishop and knight drive the king into the corner of the bishop's colour."],
  ["underPromotion", "Ферзь тут не найкращий: недопромоція уникає пату або дає шах конем.", "A queen is not best here: underpromotion avoids stalemate or gives a knight check."],
  ["promotion", "Пішак проривається на останню горизонталь і стає новою фігурою.", "The pawn breaks through to the last rank and becomes a new piece."],
  ["fork", "Подвійний удар: одна фігура атакує дві цілі, і врятувати обидві неможливо.", "A double attack: one piece hits two targets and both cannot be saved."],
  ["pin", "Зв'язка: фігура суперника не може зрушити, бо за нею цінніша.", "A pin: the enemy piece cannot move because something more valuable stands behind it."],
  ["skewer", "Наскрізний удар: цінніша фігура мусить відійти, і та, що позаду, гине.", "A skewer: the more valuable piece must step aside and the one behind it falls."],
  ["discoveredAttack", "Відкритий напад: фігура відходить і відкриває лінію для іншої.", "A discovered attack: one piece moves away and opens a line for another."],
  ["doubleCheck", "Подвійний шах: від двох шахів можна лише відійти королем.", "Double check: the only answer to two checks is a king move."],
  ["deflection", "Відволікання: захисника відтягують від поля, яке він стереже.", "Deflection: the defender is pulled away from the square it guards."],
  ["attraction", "Заманювання: фігуру суперника змушують стати на погане поле.", "Attraction: an enemy piece is forced onto a bad square."],
  ["clearance", "Звільнення лінії: фігура йде з дороги, щоб інша могла вдарити.", "Clearance: a piece gets out of the way so another can strike."],
  ["interference", "Перекриття: фігура стає між захисником і полем, яке він охороняє.", "Interference: a piece steps between a defender and the square it protects."],
  ["xRayAttack", "Рентген: атака проходить крізь фігуру на лінії.", "X-ray: the attack goes through a piece on the line."],
  ["intermezzo", "Проміжний хід: спершу сильніша загроза, взяття — потім.", "An in-between move: a stronger threat first, the recapture later."],
  ["capturingDefender", "Знищення захисника: після взяття ключова фігура залишається без охорони.", "Removing the defender: after the capture the key piece is left unprotected."],
  ["trappedPiece", "Фігура в пастці: їй нікуди відступити.", "A trapped piece: it has nowhere to go."],
  ["hangingPiece", "Порахуйте нападників і захисників: фігура суперника незахищена.", "Count attackers and defenders: the enemy piece is undefended."],
  ["exchangeSacrifice", "Жертва якості: тура віддається за легку фігуру заради ініціативи.", "Exchange sacrifice: a rook for a minor piece, for the initiative."],
  ["sacrifice", "Жертва: матеріал віддається, щоб відкрити короля або виграти більше.", "A sacrifice: material is given to expose the king or win more."],
  ["zugzwang", "Цугцванг: будь-який хід суперника погіршує його позицію.", "Zugzwang: every move the opponent makes worsens the position."],
  ["opposition", "Опозиція: королі один навпроти одного, і хто не ходить — той виграє простір.", "Opposition: kings face each other, and the side not to move gains ground."],
  ["keySquares", "Ключові поля: король, що дійшов до них, проводить пішака.", "Key squares: a king that reaches them escorts the pawn home."],
  ["quietMove", "Тихий хід без шаху і взяття, після якого захисту немає.", "A quiet move with no check or capture, yet there is no defence."],
  ["defensiveMove", "Єдиний захист: інші ходи програють.", "The only defence: every other move loses."],
  ["kingsideAttack", "Атака на короля: фігури зосереджені біля укриття короля.", "A king attack: pieces gather around the king's shelter."],
  ["mate", "Король не має жодного поля і захисту від шаху.", "The king has no square and no defence against the check."],
];

export type TemplateText = { explanationUk: string; explanationEn: string };
export type TemplateHints = {
  hintUk: string;
  hintEn: string;
  hintPiece: string;
  hintSquareUk: string;
  hintSquareEn: string;
  hintSquare: string;
};

export function buildHints(f: ChessLineFacts): TemplateHints {
  return {
    hintUk: `Подивіться на ${PIECE_UK_ACC[f.piece] ?? "фігуру"} на ${f.from}.`,
    hintEn: `Look at the ${PIECE_EN[f.piece] ?? "piece"} on ${f.from}.`,
    hintPiece: f.from,
    hintSquareUk: `Ключове поле — ${f.to}.`,
    hintSquareEn: `The key square is ${f.to}.`,
    hintSquare: f.to,
  };
}

export function buildExplanation(themes: readonly string[], f: ChessLineFacts): TemplateText {
  const idea = IDEAS.find(([k]) => themes.includes(k));
  const pieceUk = PIECE_UK_NOM[f.piece] ?? "Фігура";
  const pieceEn = PIECE_EN[f.piece] ?? "piece";
  const extrasUk = [f.check ? "з шахом" : "", f.capture ? `із взяттям` : ""].filter(Boolean).join(", ");
  const extrasEn = [f.check ? "with check" : "", f.capture ? "with a capture" : ""].filter(Boolean).join(", ");
  const s1Uk = `Ключовий хід — ${f.san}: ${pieceUk.toLowerCase()} ${f.from}–${f.to}${extrasUk ? `, ${extrasUk}` : ""}.`;
  const s1En = `The key move is ${f.san}: the ${pieceEn} goes ${f.from}–${f.to}${extrasEn ? `, ${extrasEn}` : ""}.`;
  let s3Uk = "";
  let s3En = "";
  if (f.mate) {
    s3Uk = "Лінія закінчується матом.";
    s3En = "The line ends in mate.";
  } else if (f.promotion) {
    s3Uk = `Пішак перетворюється на ${PROMO_UK[f.promotion] ?? "фігуру"}.`;
    s3En = `The pawn promotes to a ${PIECE_EN[f.promotion] ?? "piece"}.`;
  } else if (f.gainCp >= 150) {
    const pawns = Math.round(f.gainCp / 100);
    s3Uk = `Підсумок: виграш матеріалу (≈${pawns} пішаків).`;
    s3En = `Result: material is won (≈${pawns} pawns).`;
  } else {
    s3Uk = "Інші ходи упускають перевагу.";
    s3En = "Other moves let the advantage slip.";
  }
  return {
    explanationUk: [s1Uk, idea?.[1], s3Uk].filter(Boolean).join(" "),
    explanationEn: [s1En, idea?.[2], s3En].filter(Boolean).join(" "),
  };
}
