/**
 * Authored explanations and sources (Phase 2, §2.6): every non-Lichess d4–d5 puzzle,
 * every exam puzzle and every famous-game moment. Lichess puzzles get template text
 * (explanationKind "template") from line facts; see chess-explanation-templates.ts.
 */
import type { ChessPuzzleExercise } from "../types.js";

export type PuzzleAnnotation = Partial<
  Pick<
    ChessPuzzleExercise,
    "themes" | "hintUk" | "hintEn" | "hintPiece" | "hintSquare" | "hintSquareUk" | "hintSquareEn" | "explanationUk" | "explanationEn" | "explanationKind" | "plyExplanations" | "source"
  >
>;

const A = (uk: string, en: string, extra: PuzzleAnnotation = {}): PuzzleAnnotation => ({
  explanationUk: uk,
  explanationEn: en,
  explanationKind: "authored",
  ...extra,
});

export const CHESS_ANNOTATIONS: Record<string, PuzzleAnnotation> = {
  "ch-tct-8": A(
    "Ферзь чорних стоїть на відкритій лінії e, і його ніщо не захищає. Перш ніж шукати складне, перевірте взяття: Rxe5 просто виграє ферзя.",
    "Black's queen stands on the open e-file and nothing defends it. Before looking for anything clever, check captures: Rxe5 simply wins the queen.",
  ),
  "ch-tct-10": A(
    "Король чорних замкнений власними пішаками f7, g7, h7. Тура b1 вільно проходить на b8 — мат на останній горизонталі.",
    "Black's king is boxed in by its own f7, g7 and h7 pawns. The b1-rook runs to b8 — back-rank mate.",
  ),
  "ch-tct-21": A(
    "Kd5 — пряма опозиція: королі навпроти через одне поле, і ходити мусять чорні. Їхній король поступається, а білий король іде вперед до ключових полів.",
    "Kd5 is the direct opposition: kings face each other one square apart and Black must move. Black's king gives way and White's king marches to the key squares.",
  ),
  "ch-ear-e1": A(
    "Пішаки f7, g7, h7 забирають у короля «кватирку». Rd8 — мат на останній горизонталі; урок: зробіть луфт, поки є час.",
    "The f7, g7 and h7 pawns leave the king no air. Rd8 is back-rank mate; the lesson: make luft while you have time.",
  ),
  "ch-d-ep-promote-p2": A(
    "Позиція Сааведри. Після c8=Q? Rc4+! Qxc4 — пат. c8=R! загрожує Ra8#; на …Ra4 вирішує Kb3 з подвійною загрозою мату на c1 і взяття тури.",
    "The Saavedra position. After c8=Q? Rc4+! Qxc4 it is stalemate. c8=R! threatens Ra8#; after …Ra4, Kb3 creates a double threat of mate on c1 and of taking the rook.",
    { source: { kind: "composed", white: "Fernando Saavedra", year: 1895 } },
  ),
  "ch-d-smothered-p2": A(
    "Спадщина Філідора: шахи ферзем і конем женуть короля в кут, Qg8+! змушує туру взяти, і Nf7# — спертий мат. Кожен хід — шах, тому захисту немає.",
    "Philidor's legacy: queen and knight checks drive the king into the corner, Qg8+! forces the rook to take, and Nf7# is smothered mate. Every move is a check, so there is no defence.",
  ),
  "ch-deep-italian-ruy-exam-p6": A(
    "Ноїв ковчег: пішаки a6, b5 і c4 замикають слона b3. Після …c4 Bxc4 bxc4 чорні виграють фігуру за пішака.",
    "Noah's Ark: the a6, b5 and c4 pawns trap the b3-bishop. After …c4 Bxc4 bxc4 Black wins a piece for a pawn.",
  ),
  "ch-d-qgd-p1": A(
    "Пастка Тарраша: після Nxd5! Bxd8 Bb4+ білі мусять закритися Qd2, і …Bxd2+ Kxd2 Kxd8 — чорні виграли фігуру.",
    "The Tarrasch trap: after Nxd5! Bxd8 Bb4+ White must block with Qd2, and after …Bxd2+ Kxd2 Kxd8 Black is a piece up.",
  ),
  "ch-deep-qg-london-exam-p5": A(
    "Qf3 б'є по туре a8 уздовж відкритої довгої діагоналі. Будь-який захист коштує матеріалу: …Nc6 Qxc6+, а пішак b5 теж слабкий.",
    "Qf3 hits the a8-rook along the open long diagonal. Every defence costs material: …Nc6 Qxc6+, and the b5-pawn is weak as well.",
  ),
  "ch-deep-kp-theory-exam-p6": A(
    "Проти крайнього пішака досить дістатися кута h8: король туди, і білі не можуть його виштовхнути, не давши пата. Kg8 встигає, інші ходи програють.",
    "Against a rook pawn it is enough to reach the h8 corner: once the king is there, White cannot drive it out without stalemate. Kg8 is in time; other moves lose.",
  ),
  "ch-d-lucena-p1": A(
    "Позиція Лусени: Rf1+ відганяє короля чорних, а Rf4 готує «міст» — тура перекриє шахи з боку на 4-й горизонталі, і пішак пройде.",
    "The Lucena position: Rf1+ pushes Black's king away, and Rf4 prepares the bridge — the rook will block side checks on the 4th rank and the pawn queens.",
  ),
  "ch-d-vancura-p1": A(
    "Позиція Ванкури: тура збоку атакує пішака a6 і водночас готова давати шахи королю ззаду. Тура білих прив’язана до пішака — нічия.",
    "The Vancura position: the rook attacks the a6-pawn from the side and is ready to check the king from behind. White's rook is tied to the pawn — a draw.",
  ),
  "ch-deep-rook-theory-exam-p6": A(
    "Re6 — тура стає на 6-ту горизонталь збоку від пішака a6 (захист Ванкури). Будь-яке інше місце дозволяє білим підтягти короля.",
    "Re6 puts the rook on the 6th rank beside the a6-pawn (the Vancura defence). Any other square lets White bring the king up.",
  ),
  "ch-deep-minor-end-exam-p6": A(
    "Nf8+ заганяє короля на h8 — у кут кольору слона. Тепер Bf6# — мат: кінь з f8 забирає g6 і h7, слон дає шах по діагоналі.",
    "Nf8+ drives the king to h8 — the corner of the bishop's colour. Now Bf6# is mate: the f8-knight covers g6 and h7 and the bishop checks along the diagonal.",
  ),
  "ch-d-greco-p1": A(
    "Чорні зажерливо взяли туру слоном a1. Bxf7+ — шах і розкриття короля: після …Kf8 білі продовжують атаку, поки фігури чорних не розвинені.",
    "Black greedily took the rook with the a1-bishop. Bxf7+ checks and exposes the king: after …Kf8 White keeps attacking while Black's pieces are undeveloped.",
    { source: { kind: "game", white: "Gioachino Greco", year: 1620 } },
  ),
  "ch-d-greco-p2": A(
    "Bg5 зв’язує і готує вторгнення: загроза — фігури білих увірвуться до короля f8, поки ферзь і тура чорних поза грою.",
    "Bg5 develops with tempo and prepares the invasion: White's pieces will break in on the f8-king while Black's queen and rook are out of play.",
    { source: { kind: "game", white: "Gioachino Greco", year: 1620 } },
  ),
  "ch-d-opera-p1": A(
    "Морфі віддає коня, щоб відкрити лінії: після Nxb5 cxb5 Bxb5+ король чорних застряг у центрі, а білі фігури атакують з усіх боків.",
    "Morphy gives the knight to open lines: after Nxb5 cxb5 Bxb5+ Black's king is stuck in the centre while White's pieces attack from every side.",
    { source: { kind: "game", white: "Paul Morphy", black: "Duke Karl of Brunswick & Count Isouard", year: 1858, event: "Paris Opera" } },
  ),
  "ch-d-opera-p2": A(
    "Rxd7! знищує ключового захисника. Після …Rxd7 друга тура стає на d1, і зв’язка по лінії d руйнує оборону.",
    "Rxd7! removes the key defender. After …Rxd7 the second rook comes to d1 and the pin on the d-file destroys the defence.",
    { source: { kind: "game", white: "Paul Morphy", black: "Duke Karl of Brunswick & Count Isouard", year: 1858, event: "Paris Opera" } },
  ),
  "ch-d-immortal-p1": A(
    "Безсмертна партія: Андерсен уже віддав обидві тури. Qf6+! — кінь мусить узяти, і Be7# — мат легкими фігурами.",
    "The Immortal Game: Anderssen has already given up both rooks. Qf6+! — the knight must take, and Be7# mates with the minor pieces.",
    { source: { kind: "game", white: "Adolf Anderssen", black: "Lionel Kieseritzky", year: 1851, event: "London" } },
  ),
  "ch-d-evergreen-p1": A(
    "Вічнозелена партія: Rxe7+ відкриває лінію d, Qxd7+!! — жертва ферзя, і два слони завершують матом Bxe7#.",
    "The Evergreen Game: Rxe7+ opens the d-file, Qxd7+!! sacrifices the queen, and the two bishops finish with Bxe7#.",
    { source: { kind: "game", white: "Adolf Anderssen", black: "Jean Dufresne", year: 1852, event: "Berlin" } },
  ),
  "ch-d-gotc-p1": A(
    "«Партія століття»: Фішер (13 років) грає …Be6!!, залишаючи ферзя під боєм. Після Bxb6 чорні отримують за ферзя лавину шахів і купу матеріалу.",
    "The Game of the Century: Fischer, aged 13, plays …Be6!!, leaving the queen en prise. After Bxb6 Black gets a cascade of checks and a pile of material for it.",
    { source: { kind: "game", white: "Donald Byrne", black: "Robert Fischer", year: 1956, event: "Rosenwald Memorial, New York" } },
  ),
  "ch-d-kasparov-topalov-p1": A(
    "Rxd4!! cxd4 Re7+ — тура жертвується, щоб витягти короля чорних із укриття. Далі починається одна з найдовших атак у історії шахів.",
    "Rxd4!! cxd4 Re7+ — the rook is sacrificed to drag Black's king out of its shelter. It starts one of the longest attacks in chess history.",
    { source: { kind: "game", white: "Garry Kasparov", black: "Veselin Topalov", year: 1999, event: "Wijk aan Zee" } },
  ),
  "ch-d-tal-attack-p1": A(
    "Qxf7! — ферзь іде під удар. Після …Rxf7 Nxf7+ кінь дає шах, а білі виходять із розмінів із перевагою в матеріалі й атакою.",
    "Qxf7! — the queen walks into the attack. After …Rxf7 Nxf7+ the knight checks and White comes out of the trades ahead in material, still attacking.",
  ),
  "ch-d-study-method-p1": A(
    "Подвійна жертва слонів Ласкера: Bxh7+ Kxh7 Qxh5+ Kg8 Bxg7! Kxg7 Qg4+ і Rf3 — тура приходить на лінію h, і король не врятується.",
    "Lasker's double bishop sacrifice: Bxh7+ Kxh7 Qxh5+ Kg8 Bxg7! Kxg7 Qg4+ and Rf3 — the rook swings to the h-file and the king cannot escape.",
    { source: { kind: "game", white: "Emanuel Lasker", black: "Johann Bauer", year: 1889, event: "Amsterdam" } },
  ),
};
