/**
 * Famous games used by the course (plan §4.4). Movetext is the full game score up to the
 * end of the combination; tests replay it with chess.js and check that every puzzle /
 * plan position that cites the game is exactly the position after `ply` half-moves and
 * that the puzzle line is the moves actually played.
 */

export type FamousGame = {
  key: string;
  white: string;
  black: string;
  year: number;
  event?: string;
  /** SAN movetext without numbers or comments. */
  moves: string;
};

export const FAMOUS_GAMES: readonly FamousGame[] = [
  {
    key: "immortal",
    white: "Adolf Anderssen",
    black: "Lionel Kieseritzky",
    year: 1851,
    event: "London",
    moves:
      "e4 e5 f4 exf4 Bc4 Qh4+ Kf1 b5 Bxb5 Nf6 Nf3 Qh6 d3 Nh5 Nh4 Qg5 Nf5 c6 g4 Nf6 Rg1 cxb5 h4 Qg6 h5 Qg5 Qf3 Ng8 Bxf4 Qf6 Nc3 Bc5 Nd5 Qxb2 Bd6 Bxg1 e5 Qxa1+ Ke2 Na6 Nxg7+ Kd8 Qf6+ Nxf6 Be7#",
  },
  {
    key: "evergreen",
    white: "Adolf Anderssen",
    black: "Jean Dufresne",
    year: 1852,
    event: "Berlin",
    moves:
      "e4 e5 Nf3 Nc6 Bc4 Bc5 b4 Bxb4 c3 Ba5 d4 exd4 O-O d3 Qb3 Qf6 e5 Qg6 Re1 Nge7 Ba3 b5 Qxb5 Rb8 Qa4 Bb6 Nbd2 Bb7 Ne4 Qf5 Bxd3 Qh5 Nf6+ gxf6 exf6 Rg8 Rad1 Qxf3 Rxe7+ Nxe7 Qxd7+ Kxd7 Bf5+ Ke8 Bd7+ Kf8 Bxe7#",
  },
  {
    key: "opera",
    white: "Paul Morphy",
    black: "Duke Karl of Brunswick & Count Isouard",
    year: 1858,
    event: "Paris Opera",
    moves:
      "e4 e5 Nf3 d6 d4 Bg4 dxe5 Bxf3 Qxf3 dxe5 Bc4 Nf6 Qb3 Qe7 Nc3 c6 Bg5 b5 Nxb5 cxb5 Bxb5+ Nbd7 O-O-O Rd8 Rxd7 Rxd7 Rd1 Qe6 Bxd7+ Nxd7 Qb8+ Nxb8 Rd8#",
  },
  {
    key: "greco",
    white: "Gioachino Greco",
    black: "NN",
    year: 1620,
    moves: "e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d4 exd4 cxd4 Bb4+ Nc3 Nxe4 O-O Nxc3 bxc3 Bxc3 Qb3 Bxa1 Bxf7+ Kf8 Bg5",
  },
  {
    key: "lasker-bauer",
    white: "Emanuel Lasker",
    black: "Johann Bauer",
    year: 1889,
    event: "Amsterdam",
    moves:
      "f4 d5 e3 Nf6 b3 e6 Bb2 Be7 Bd3 b6 Nc3 Bb7 Nf3 Nbd7 O-O O-O Ne2 c5 Ng3 Qc7 Ne5 Nxe5 Bxe5 Qc6 Qe2 a6 Nh5 Nxh5 Bxh7+ Kxh7 Qxh5+ Kg8 Bxg7",
  },
  {
    key: "game-of-the-century",
    white: "Donald Byrne",
    black: "Robert Fischer",
    year: 1956,
    event: "Rosenwald Memorial, New York",
    moves:
      "Nf3 Nf6 c4 g6 Nc3 Bg7 d4 O-O Bf4 d5 Qb3 dxc4 Qxc4 c6 e4 Nbd7 Rd1 Nb6 Qc5 Bg4 Bg5 Na4 Qa3 Nxc3 bxc3 Nxe4 Bxe7 Qb6 Bc4 Nxc3 Bc5 Rfe8+ Kf1 Be6",
  },
  {
    key: "fischer-spassky-6",
    white: "Robert Fischer",
    black: "Boris Spassky",
    year: 1972,
    event: "World Championship, Reykjavik, game 6",
    moves:
      "c4 e6 Nf3 d5 d4 Nf6 Nc3 Be7 Bg5 O-O e3 h6 Bh4 b6 cxd5 Nxd5 Bxe7 Qxe7 Nxd5 exd5 Rc1 Be6 Qa4 c5 Qa3 Rc8 Bb5 a6 dxc5 bxc5 O-O Ra7 Be2 Nd7 Nd4 Qf8 Nxe6 fxe6 e4 d4 f4 Qe7 e5 Rb8 Bc4 Kh8 Qh3 Nf8 b3 a5 f5 exf5 Rxf5 Nh7 Rcf1 Qd8 Qg3 Re7 h4 Rbb7 e6 Rbc7 Qe5 Qe8 a4 Qd8 R1f2 Qe8 R2f3 Qd8 Bd3 Qe8 Qe4 Nf6 Rxf6",
  },
  {
    key: "karpov-unzicker",
    white: "Anatoly Karpov",
    black: "Wolfgang Unzicker",
    year: 1974,
    event: "Nice Olympiad",
    moves:
      "e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 d6 c3 O-O h3 Na5 Bc2 c5 d4 Qc7 Nbd2 Nc6 d5 Nd8 a4 Rb8 axb5 axb5 b4 Nb7 Nf1 Bd7 Be3 Ra8 Qd2 Rfc8 Bd3 g6 Ng3 Bf8 Ra2 c4 Bb1 Qd8 Ba7 Ne8 Bc2 Nc7 Rea1 Qe7 Bb1 Be8 Ne2 Nd8 Nh2 Bg7",
  },
  {
    key: "kasparov-topalov",
    white: "Garry Kasparov",
    black: "Veselin Topalov",
    year: 1999,
    event: "Wijk aan Zee",
    moves:
      "e4 d6 d4 Nf6 Nc3 g6 Be3 Bg7 Qd2 c6 f3 b5 Nge2 Nbd7 Bh6 Bxh6 Qxh6 Bb7 a3 e5 O-O-O Qe7 Kb1 a6 Nc1 O-O-O Nb3 exd4 Rxd4 c5 Rd1 Nb6 g3 Kb8 Na5 Ba8 Bh3 d5 Qf4+ Ka7 Rhe1 d4 Nd5 Nbxd5 exd5 Qd6 Rxd4 cxd4 Re7+",
  },
];

/**
 * Course items cut from these games: `ply` = half-moves played before the position.
 * `line` = how many game half-moves the puzzle solution follows (0 for chess_plan).
 */
export const FAMOUS_POSITIONS: readonly { id: string; game: string; ply: number; line: number }[] = [
  { id: "ch-d-immortal-p1", game: "immortal", ply: 42, line: 3 },
  { id: "ch-d-evergreen-p1", game: "evergreen", ply: 38, line: 9 },
  { id: "ch-d-opera-p1", game: "opera", ply: 18, line: 1 },
  { id: "ch-d-opera-p2", game: "opera", ply: 24, line: 1 },
  { id: "ch-d-greco-p1", game: "greco", ply: 20, line: 1 },
  { id: "ch-d-greco-p2", game: "greco", ply: 22, line: 1 },
  { id: "ch-d-study-method-p1", game: "lasker-bauer", ply: 28, line: 1 },
  { id: "ch-d-gotc-p1", game: "game-of-the-century", ply: 33, line: 1 },
  { id: "ch-d-fischer-spassky-p1", game: "fischer-spassky-6", ply: 38, line: 0 },
  { id: "ch-deep-famous-2-exam-p5", game: "fischer-spassky-6", ply: 74, line: 0 },
  { id: "ch-d-karpov-model-p1", game: "karpov-unzicker", ply: 46, line: 0 },
  { id: "ch-deep-famous-2-exam-p6", game: "karpov-unzicker", ply: 58, line: 0 },
  { id: "ch-d-kasparov-topalov-p1", game: "kasparov-topalov", ply: 46, line: 3 },
];
