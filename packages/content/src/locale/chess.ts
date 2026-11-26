import type { ExerciseLocaleEnrichment } from "./types.js";

export const CHESS_LOCALE_ENRICHMENT: Record<string, ExerciseLocaleEnrichment> = {
  "ch-d-algebraic-l": {
    "notesEn": "Algebraic notation is the international language of chess: every square has a file letter (a–h, left to right from White's side) and a rank digit (1–8, from White's side). Pawn moves list only the destination square: e4, d5. Piece moves start with the English piece letter: K (king), Q (queen), R (rook), B (bishop), N (knight — K is already taken by the king). Examples: Nf3, Bb5, Qh4.\n\nCaptures use \"x\": Bxe6, exd5. Check is \"+\", checkmate is \"#\". Castling: O-O (kingside) and O-O-O (queenside). Promotion: e8=Q or e8=N. If two identical pieces can reach the same square, add the origin file or rank: Nbd2 (knight from the b-file), R1e2 (rook from the first rank), Qh4e1.\n\nUkrainian score sheets sometimes use Кр (king), К (knight), Ф, Т, С; in international games and in this course we always use Latin KQRBN. Annotation symbols are not part of the official move record, but they are good to know: ! strong move, ? mistake, !! brilliant, ?? blunder, !? interesting, ?! dubious.\n\nCommon mistakes: confusing N and K; writing \"Ke4\" without disambiguating which knight; forgetting \"x\" or \"+\"; writing castling as \"Ke1–g1\" instead of O-O. On the diagram, White can castle on either side — that is O-O and O-O-O, not \"Rh-f1\"."
  },
  "ch-1-1": {
    "notesEn": "White moves first. The king is the most important piece; the goal of the game is to checkmate the opponent's king.",
    "quizEn": {
      "qEn": "Who moves first?",
      "optionsEn": [
        "Black",
        "White",
        "Winner of the toss",
        "Anyone"
      ]
    }
  },
  "ch-2-2": {
    "notesEn": "Queen on f7 is protected by the king — black king is in checkmate.",
    "quizEn": {
      "qEn": "Checkmate means:",
      "optionsEn": [
        "The game is over, king is in unavoidable check",
        "You can resign",
        "Draw",
        "Castling"
      ]
    }
  },
  "ch-op1": {
    "notesEn": "1.e4 controls the center and opens diagonals for queen and bishop. Primary opening goals: center, piece development, king safety.",
    "quizEn": {
      "qEn": "What is the primary opening goal?",
      "optionsEn": [
        "Center, development, king safety",
        "Only move pawns",
        "Resign on move 5",
        "Keep pieces undeveloped"
      ]
    }
  },
  "ch-eg-op3": {
    "notesEn": "White king on e3, black on e5 — classic vertical opposition.",
    "quizEn": {
      "qEn": "Distance between kings in opposition?",
      "optionsEn": [
        "1 square between them",
        "0 (attack)",
        "3+ always",
        "Does not matter"
      ]
    }
  },
  "ch-eg2": {
    "notesEn": "Support the pawn with the king. Take your time — first improve the king.",
    "quizEn": {
      "qEn": "What should you do first?",
      "optionsEn": [
        "Improve the king's position",
        "Resign",
        "Castle",
        "Only move the pawn"
      ]
    }
  },
  "ch-tct-12": {
    "notesEn": "If the defending king can enter the pawn's square, it can catch it before promotion.",
    "quizEn": {
      "qEn": "How is the square of the pawn measured?",
      "optionsEn": [
        "From pawn's square to the promotion rank",
        "Only diagonally",
        "Fixed 3x3 squares",
        "Distance to opponent's king"
      ]
    }
  },
  "ch-tct-14": {
    "notesEn": "Tarrasch rule: rooks belong behind passed pawns, whether your own or the opponent's.",
    "quizEn": {
      "qEn": "Tarrasch's core rule for rook endgames:",
      "optionsEn": [
        "Place the rook behind the passed pawn",
        "Rook must always protect king from the side",
        "Never bring the rook to the center",
        "Trade rooks immediately"
      ]
    }
  },
  "ch-tct-17": {
    "notesEn": "Bishop and knight mate: drive the enemy king to a corner of the bishop's color.",
    "quizEn": {
      "qEn": "To which corner must the defending king be driven?",
      "optionsEn": [
        "To a corner matching your bishop's color",
        "To any corner",
        "To an opposite-colored corner",
        "To the center"
      ]
    }
  },
  "ch-tct-18": {
    "notesEn": "Black king has no legal moves and is not in check — stalemate.",
    "quizEn": {
      "qEn": "Result of a stalemate in tournament play:",
      "optionsEn": [
        "Draw (0.5 : 0.5)",
        "Win for side with more material",
        "Time penalty",
        "Replaying the game"
      ]
    }
  },
  "ch-tct-23": {
    "notesEn": "King in front of the passed pawn on key squares guarantees promotion.",
    "quizEn": {
      "qEn": "Where should the attacking king stand to promote the pawn?",
      "optionsEn": [
        "In front of the pawn on key squares",
        "Behind the pawn on back rank",
        "On the opposite flank",
        "Does not matter"
      ]
    }
  },
  "ch-ear-1": {
    "notesEn": "In rook endgames, keep your rook behind the passed pawn to support its advance.",
    "quizEn": {
      "qEn": "Where is the strongest placement for the rook relative to your passed pawn on 7th rank?",
      "optionsEn": [
        "Behind the pawn (retains files and doesn't block promotion)",
        "Directly in front of the pawn on promotion square",
        "On the edge file unconnected to the pawn",
        "Rook should always be traded for a knight"
      ]
    }
  },
  "ch-op-center-l": {
    "notesEn": "After 1.d4 d5 2.c4 e6 3.Nc3 Nf6 White challenges Black's center on d5.",
    "quizEn": {
      "qEn": "What is the role of the pawn on c4?",
      "optionsEn": [
        "Pressures the central pawn on d5",
        "Protects White's king",
        "Prepares queen-side castling",
        "Blocks knight b1"
      ]
    }
  },
  "ch-op-develop-l": {
    "notesEn": "White has castled, bishop c4 and knight f3 developed, securing king safety.",
    "quizEn": {
      "qEn": "What has White accomplished for king safety?",
      "optionsEn": [
        "Short castling (kingside)",
        "Long castling",
        "Left the king on e1",
        "Pushed pawn f3"
      ]
    }
  },
  "ch-op-space-l": {
    "notesEn": "Advanced central pawns claim space and restrict opponent's minor piece mobility.",
    "quizEn": {
      "qEn": "What is the primary benefit of a spatial advantage in the center?",
      "optionsEn": [
        "Restricts opponent piece mobility and gives freedom for maneuvers",
        "Guarantees immediate checkmate",
        "Allows skipping turns",
        "Deletes opponent pawns"
      ]
    }
  },
  "ch-op-tempo-l": {
    "notesEn": "Developing pieces with threats gains a tempo while forcing opponent to defend.",
    "quizEn": {
      "qEn": "What does gaining a tempo mean?",
      "optionsEn": [
        "Developing with a threat, forcing a defensive reply",
        "Playing two moves in a row",
        "Waiting on time",
        "Sacrificing a queen"
      ]
    }
  },
  "ch-op-safety-l": {
    "notesEn": "Uncastled kings in open centers are vulnerable to rapid tactical strikes.",
    "quizEn": {
      "qEn": "Why is an uncastled king dangerous when center opens?",
      "optionsEn": [
        "Exposed on the open e-file to enemy rooks and queens",
        "King cannot move diagonally",
        "Pawns become knights",
        "No danger exists"
      ]
    }
  },
  "ch-op-punish-l": {
    "notesEn": "Early queen sorties can be punished by developing pieces with tempo attacks.",
    "quizEn": {
      "qEn": "How do you punish an early queen sortie by the opponent?",
      "optionsEn": [
        "Develop pieces while gaining tempos by attacking the queen",
        "Copy their queen moves",
        "Resign immediately",
        "Push flank pawns"
      ]
    }
  },
  "ch-pi-isolated-l": {
    "notesEn": "Isolated queen pawn (d4) has no friendly pawns on adjacent files; control the d5 square in front of it.",
    "quizEn": {
      "qEn": "What is the primary positional weakness of an isolated pawn?",
      "optionsEn": [
        "Cannot be defended by pawns; the square directly in front is an ideal outpost",
        "It cannot move forward",
        "It is captured on move 1",
        "It reduces Elo"
      ]
    }
  },
  "ch-pi-doubled-l": {
    "notesEn": "Doubled pawns on the c-file cannot protect each other and restrict mobility.",
    "quizEn": {
      "qEn": "What is the drawback of doubled pawns?",
      "optionsEn": [
        "They cannot protect each other and reduce mobility",
        "They must be moved together",
        "They turn into bishops",
        "They are forbidden"
      ]
    }
  },
  "ch-pi-backward-l": {
    "notesEn": "Backward pawn on d6 on a half-open file: target the d5 outpost in front of it.",
    "quizEn": {
      "qEn": "Why is a backward pawn vulnerable?",
      "optionsEn": [
        "Lags behind neighbor pawns, cannot be defended by pawns, outpost in front is weak",
        "Moves backwards only",
        "Cannot be guarded by rooks",
        "Counts as 0 points"
      ]
    }
  },
  "ch-pi-chain-l": {
    "notesEn": "Pawn chain: attack the base of the chain to undermine the entire structure.",
    "quizEn": {
      "qEn": "Where is the best point to attack a pawn chain?",
      "optionsEn": [
        "At the base of the chain",
        "At the head of the chain",
        "Do not attack pawns",
        "On the edge of the board"
      ]
    }
  },
  "ch-pi-majority-l": {
    "notesEn": "Pawn majority on the queenside (3 vs 2) can create a remote passed pawn.",
    "quizEn": {
      "qEn": "What is the strategic goal of a pawn majority?",
      "optionsEn": [
        "Advance the majority to create a passed pawn",
        "Sacrifice all pawns",
        "Keep pawns on initial rank",
        "Trade for king"
      ]
    }
  },
  "ch-pi-openfile-l": {
    "notesEn": "Rooks belong on open files to penetrate to the 7th or 8th rank.",
    "quizEn": {
      "qEn": "What is the strategic goal of seizing an open file with rooks?",
      "optionsEn": [
        "Infiltrate to the 7th or 8th rank into enemy camp",
        "Keep the rook inactive",
        "Trade for a pawn immediately",
        "Block your own bishop"
      ]
    }
  },
  "ch-pc-bvk-l": {
    "notesEn": "Bishops excel in open positions with pawns on both flanks; knights excel in closed, locked centers.",
    "quizEn": {
      "qEn": "In which position is a bishop typically stronger than a knight?",
      "optionsEn": [
        "Open board with play on both flanks",
        "Closed board with locked pawn chains",
        "With all pawns on bishop's color",
        "Without any open diagonals"
      ]
    }
  },
  "ch-pc-bishops-l": {
    "notesEn": "The bishop pair controls diagonals of both colors and dominates an open board.",
    "quizEn": {
      "qEn": "Why is the bishop pair so powerful in open positions?",
      "optionsEn": [
        "Controls both dark and light diagonals across the entire board",
        "Bishops can jump over pawns",
        "Gives extra time on clock",
        "Prevents castling"
      ]
    }
  },
  "ch-pc-outpost-l": {
    "notesEn": "An outpost on d5 protected by a pawn cannot be driven away by enemy pawns.",
    "quizEn": {
      "qEn": "What defines an ideal knight outpost?",
      "optionsEn": [
        "Central hole in enemy territory that cannot be attacked by enemy pawns",
        "Corner square a1",
        "Back rank e8",
        "Unprotected square on file"
      ]
    }
  },
  "ch-pc-badbishop-l": {
    "notesEn": "A 'bad' bishop is restricted by its own central pawns locked on the same color squares.",
    "quizEn": {
      "qEn": "What makes a bishop 'bad' positionally?",
      "optionsEn": [
        "Its own central pawns are locked on the same color squares",
        "It was moved too early",
        "It is on the rim",
        "It has no targets"
      ]
    }
  },
  "ch-pc-rook7th-l": {
    "notesEn": "A rook on the 7th rank attacks base pawns and confines the enemy king.",
    "quizEn": {
      "qEn": "Why is a rook on the 7th rank considered so formidable?",
      "optionsEn": [
        "Attacks unadvanced base pawns and hems in the enemy king",
        "Gives checkmate on move 1",
        "Allows moving two squares",
        "Prevents knight moves"
      ]
    }
  },
  "ch-pc-heavy-l": {
    "notesEn": "Heavy pieces (queen + rooks): king safety and initiative become the deciding factors.",
    "quizEn": {
      "qEn": "What is the primary deciding factor in queen and rook endgames?",
      "optionsEn": [
        "King safety and active piece coordination",
        "Total pawn count only",
        "Board symmetry",
        "Opening knowledge"
      ]
    }
  },
  "ch-re-philidor-l": {
    "notesEn": "Philidor defense: keep rook on the 6th rank until the pawn reaches the 6th, then drop to the 1st rank for rear checks.",
    "quizEn": {
      "qEn": "Where do you keep the defending rook while the pawn is still on the 5th rank?",
      "optionsEn": [
        "On the 6th rank cut-off",
        "On the 1st rank passively",
        "In front of own king on 8th",
        "On the d-file"
      ]
    }
  },
  "ch-re-bridge-l": {
    "notesEn": "Lucena position: White builds a 'bridge' with the rook on the 4th rank to shield the king from vertical checks.",
    "quizEn": {
      "qEn": "Why does White build a 'bridge' with the rook in the Lucena position?",
      "optionsEn": [
        "To shield the king from checks so the pawn can promote",
        "To trade rook for a pawn",
        "To castle in the endgame",
        "To give away the pawn"
      ]
    }
  },
  "ch-calc-cct-l": {
    "notesEn": "Candidate moves checklist: CCT — Checks, Captures, Threats.",
    "quizEn": {
      "qEn": "What does the CCT calculation heuristic stand for?",
      "optionsEn": [
        "Checks, Captures, Threats",
        "Castle, Centre, Time",
        "Checkmate in one only",
        "Only quiet positional moves"
      ]
    }
  },
  "ch-calc-count-l": {
    "notesEn": "Black knight on d5. White can capture Nxd5; count attackers and defenders before trading.",
    "quizEn": {
      "qEn": "With what does Black recapture after Nxd5?",
      "optionsEn": [
        "With the queen (Qxd5)",
        "With the c-pawn",
        "Rook from a8 in one move",
        "With the king"
      ]
    }
  },
  "ch-calc-zwischen-l": {
    "notesEn": "Zwischenzug (in-between move): an unexpected intermediate check or threat before recapturing.",
    "quizEn": {
      "qEn": "What is a zwischenzug?",
      "optionsEn": [
        "An in-between move, often a check, played before expected recapture",
        "Castling in the endgame",
        "Skipping a move",
        "Only queen sacrifices"
      ]
    }
  },
  "ch-calc-blunder-l": {
    "notesEn": "After 1.e4 e5 2.Qh5 Nc6 White plays 3.Qxe5?? losing the queen.",
    "quizEn": {
      "qEn": "Why is 3.Qxe5 a fatal blunder here?",
      "optionsEn": [
        "Knight on c6 captures the queen (Nxe5)",
        "Pawn e5 cannot legally be taken",
        "It is an immediate stalemate",
        "Queen cannot move to e5 legally"
      ]
    }
  },
  "ch-calc-stop-l": {
    "notesEn": "Stop calculating when the position reaches a 'quiet' state without forced checks, captures, or threats.",
    "quizEn": {
      "qEn": "When should you stop a calculation line and evaluate?",
      "optionsEn": [
        "When the position becomes quiet with no forcing tactical moves",
        "Never, calculate to checkmate always",
        "After the very first move",
        "Only when opponent resigns"
      ]
    }
  },
  "ch-pr-time-l": {
    "notesEn": "In standard opening positions, play briskly; invest time at critical tactical junctures and structural changes.",
    "quizEn": {
      "qEn": "Where should you invest the majority of your clock time?",
      "optionsEn": [
        "On tactical complications and irreversible structural decisions",
        "Equally on every routine developing move",
        "Only when already completely winning",
        "Only on move 1 of the game"
      ]
    }
  },
  "ch-pr-annotate-l": {
    "notesEn": "After the game, find the critical moment: the first shift in computer evaluation, not just the final blunder.",
    "quizEn": {
      "qEn": "What mistake should you investigate first during post-game analysis?",
      "optionsEn": [
        "The first significant evaluation shift, rather than the final blunder",
        "Only the move right before checkmate",
        "Opponent's moves only",
        "The opening name"
      ]
    }
  },
  "ch-pr-study-l": {
    "notesEn": "Review master games actively: cover the moves, predict the next plan, and compare with master play.",
    "quizEn": {
      "qEn": "How do you actively study master games?",
      "optionsEn": [
        "Pause at key positions, identify plans, and try to predict the master's move",
        "Scroll to the end to check the result",
        "Memorize only the final score",
        "Play blitz against annotations"
      ]
    }
  },
  "ch-pr-repertoire-l": {
    "notesEn": "Opening repertoire: master underlying pawn structures and recurring plans rather than memorizing endless lines.",
    "quizEn": {
      "qEn": "What is the foundation of a reliable opening repertoire?",
      "optionsEn": [
        "Pawn structures, typical middlegame plans, and piece piece placements",
        "Rote memorization of 40-move forcing branches without plans",
        "Playing completely random first moves each game",
        "Skipping the opening phase entirely"
      ]
    }
  },
  "ch-pr-review-l": {
    "notesEn": "Minimal post-game review cycle: identify the turning point, understand the cause, take away one concrete lesson.",
    "quizEn": {
      "qEn": "What makes post-game analysis genuinely valuable?",
      "optionsEn": [
        "First evaluation shift, root cause of mistakes, and one takeaway for next game",
        "Counting total victories",
        "Deleting lost games from database",
        "Inverting board colors"
      ]
    }
  },
  "ch-1-2": {
    "optionsEn": [
      "Bishop",
      "Rook",
      "Knight",
      "Pawn"
    ]
  },
  "ch-2-1": {
    "optionsEn": [
      "Attack on the king",
      "Capturing a rook",
      "Castling",
      "Pawn moving 2 squares"
    ]
  },
  "ch-3-1": {
    "optionsEn": [
      "Simultaneous move of king and rook",
      "En passant capture",
      "Pawn promotion",
      "Double check"
    ]
  },
  "ch-3-2": {
    "optionsEn": [
      "Disappears",
      "Promotes",
      "Remains as is",
      "Becomes king"
    ]
  },
  "ch-p6": {
    "optionsEn": [
      "One piece attacks two targets simultaneously",
      "Queen exchange",
      "Castling under check",
      "Stalemate"
    ]
  },
  "ch-p7": {
    "optionsEn": [
      "Cannot move without exposing a more valuable piece",
      "Captures two pieces",
      "Castles",
      "Becomes queen"
    ]
  },
  "ch-p12": {
    "optionsEn": [
      "Mate by rook/queen on 8th (or 1st) rank",
      "Knight checkmate",
      "Castling",
      "Stalemate"
    ]
  },
  "ch-op2": {
    "optionsEn": [
      "Shields the king and activates the rook",
      "Awards an extra queen",
      "Captures two pieces",
      "Forbidden in blitz"
    ]
  },
  "ch-op4": {
    "optionsEn": [
      "Weakens king diagonal and wastes tempo",
      "Mandatory on move 1",
      "Checkmates Black",
      "Wins a rook"
    ]
  },
  "ch-eg-op1": {
    "optionsEn": [
      "Control of the square directly in front of the opponent king",
      "Attack on the queen",
      "Moving the bishop",
      "En passant"
    ]
  },
  "ch-eg-op2": {
    "optionsEn": [
      "Move rook to the 6th rank cutting off the enemy king",
      "Move king away",
      "Give away the pawn",
      "Resign"
    ]
  },
  "ch-eg-op4": {
    "optionsEn": [
      "Places opponent in zugzwang, forcing them to yield ground",
      "Wins a queen immediately",
      "Castles",
      "Stalemate"
    ]
  },
  "ch-eg1": {
    "optionsEn": [
      "Controls key promotion squares in front of the pawn",
      "Moves only backwards",
      "Cannot enter the center",
      "Does not participate"
    ]
  },
  "ch-eg3": {
    "optionsEn": [
      "Pawn reaches the 8th (or 1st) rank",
      "King reaches the center",
      "Capture of a knight",
      "Move 40"
    ]
  },
  "ch-p13": {
    "optionsEn": [
      "Delivering mate using two rooks by cutting off ranks consecutively",
      "Knight checkmate",
      "Pawn checkmate",
      "Stalemate"
    ]
  },
  "ch-p14": {
    "optionsEn": [
      "Alternate rooks rank by rank driving the king to the edge",
      "Move rooks randomly",
      "Sacrifice both rooks",
      "Castle twice"
    ]
  },
  "ch-tct-1": {
    "optionsEn": [
      "Pin (piece pinned against the king)",
      "Fork",
      "Skewer",
      "Stalemate"
    ]
  },
  "ch-tct-2": {
    "optionsEn": [
      "Skewer (more valuable piece attacked in front)",
      "Pin",
      "Fork",
      "Discovered check"
    ]
  },
  "ch-tct-3": {
    "optionsEn": [
      "Discovered attack (moving one piece unleashes an attack from another)",
      "Stalemate",
      "Castling",
      "Promotion"
    ]
  },
  "ch-tct-4": {
    "optionsEn": [
      "Double check (both moving piece and discovered piece give check)",
      "Single check",
      "Pawn push",
      "Resignation"
    ]
  },
  "ch-tct-5": {
    "optionsEn": [
      "Overloaded piece (defending too many critical points)",
      "Pinned piece",
      "Trapped piece",
      "Pawn storm"
    ]
  },
  "ch-tct-6": {
    "optionsEn": [
      "Deflection (forcing a defending piece away from its duty)",
      "Castling",
      "Promotion",
      "Draw"
    ]
  },
  "ch-tct-7": {
    "optionsEn": [
      "Decoy (attracting an enemy piece to a vulnerable square)",
      "Pin",
      "Skewer",
      "Stalemate"
    ]
  },
  "ch-tct-8": {
    "optionsEn": [
      "Interference (placing a piece between two defending pieces)",
      "Double check",
      "Fischer clock",
      "Opposition"
    ]
  },
  "ch-tct-9": {
    "optionsEn": [
      "Removing the defender (capturing or eliminating a guard)",
      "Fork",
      "Skewer",
      "Pawn storm"
    ]
  },
  "ch-tct-10": {
    "optionsEn": [
      "Clearance sacrifice (clearing a square or file for another piece)",
      "Promotion",
      "Draw offer",
      "Perpetual check"
    ]
  },
  "ch-tct-11": {
    "optionsEn": [
      "Desperado (piece destined to be lost sells itself for maximum material)",
      "Quiet move",
      "Blunder",
      "Castling"
    ]
  },
  "ch-tct-13": {
    "optionsEn": [
      "Triangulation (maneuvering the king in a triangle to pass the move)",
      "Direct march",
      "Pawn break",
      "Rook sacrifice"
    ]
  },
  "ch-tct-15": {
    "optionsEn": [
      "Cutting off the enemy king along a file or rank",
      "Sacrificing both rooks",
      "Trading queens",
      "Stalemate"
    ]
  },
  "ch-tct-16": {
    "optionsEn": [
      "Opposite-colored bishops tend towards draws in pure endgames",
      "Always winning for White",
      "Always winning for Black",
      "Forces piece promotion"
    ]
  },
  "ch-tct-19": {
    "optionsEn": [
      "Fortress (impenetrable defensive barrier that cannot be broken)",
      "Rapid checkmate",
      "Castling",
      "Illegal position"
    ]
  },
  "ch-tct-20": {
    "optionsEn": [
      "Perpetual check (delivering endless checks ensuring a draw)",
      "Checkmate",
      "Resignation",
      "Time forfeit"
    ]
  },
  "ch-tct-21": {
    "optionsEn": [
      "Boden's mate (criss-crossing bishops delivering checkmate)",
      "Smothered mate",
      "Back rank mate",
      "Scholar's mate"
    ]
  },
  "ch-tct-22": {
    "optionsEn": [
      "Smothered mate (knight checkmates a king trapped by its own pieces)",
      "Ladder mate",
      "Back rank mate",
      "Fool's mate"
    ]
  },
  "ch-tct-24": {
    "optionsEn": [
      "Shouldering (using your king to block the opponent king's path)",
      "Trading queens",
      "En passant",
      "Promotion"
    ]
  },
  "ch-tct-25": {
    "optionsEn": [
      "Breakthrough (pawn sacrifice to clear a path for a runner)",
      "Perpetual check",
      "Stalemate trap",
      "Castling"
    ]
  },
  "ch-op-center-1": {
    "optionsEn": [
      "occupies the center and opens lines for queen and bishop",
      "only attacks pawns",
      "prohibited in tournaments",
      "forces draw"
    ]
  },
  "ch-op-center-2": {
    "optionsEn": [
      "e4, d4, e5, d5",
      "a1, h1, a8, h8",
      "b2, g2, b7, g7",
      "only the e-file"
    ]
  },
  "ch-op-develop-1": {
    "optionsEn": [
      "knights and bishops",
      "only the queen",
      "only flank pawns",
      "king only"
    ]
  },
  "ch-op-develop-2": {
    "optionsEn": [
      "loses time because smaller pieces can attack her while developing",
      "wins on move 3",
      "prohibited by rules",
      "forces castling"
    ]
  },
  "ch-op-space-1": {
    "optionsEn": [
      "more squares for maneuvers and freedom to reposition pieces",
      "extra turns on clock",
      "doubled pawn strength",
      "automatic queen"
    ]
  },
  "ch-op-space-2": {
    "optionsEn": [
      "undermine with pawn breaks (c5, f6)",
      "wait passively on back rank",
      "sacrifice the king",
      "resign"
    ]
  },
  "ch-op-tempo-1": {
    "optionsEn": [
      "a unit of developmental time / move efficiency",
      "clock timeout",
      "pawn promotion",
      "resignation"
    ]
  },
  "ch-op-tempo-2": {
    "optionsEn": [
      "attacking enemy piece while developing, forcing defensive move",
      "moving the same piece back and forth",
      "waiting 5 minutes",
      "offering a draw"
    ]
  },
  "ch-op-safety-1": {
    "optionsEn": [
      "short (kingside) or long (queenside) castling",
      "moving king to center",
      "pushing f-pawn",
      "trading rooks"
    ]
  },
  "ch-op-safety-2": {
    "optionsEn": [
      "exposes king on open central files to tactical attack",
      "wins the game",
      "promotes king",
      "protects pieces better"
    ]
  },
  "ch-op-punish-1": {
    "optionsEn": [
      "develop minor pieces while creating threats against the queen",
      "ignore the queen completely",
      "push flank pawns",
      "resign"
    ]
  },
  "ch-op-punish-2": {
    "optionsEn": [
      "opponent gains developmental lead by attacking exposed queen",
      "queen is captured on move 2 always",
      "queen cannot move backwards",
      "game is void"
    ]
  },
  "ch-pi-isolated-1": {
    "optionsEn": [
      "cannot be protected by neighbor pawns; square in front is weak",
      "moves only diagonally",
      "cannot promote",
      "counts as 2 pawns"
    ]
  },
  "ch-pi-isolated-2": {
    "optionsEn": [
      "place a piece (ideally knight) firmly on the blockade square in front",
      "push pawns against it recklessly",
      "sacrifice your queen",
      "trade all pieces"
    ]
  },
  "ch-pi-doubled-1": {
    "optionsEn": [
      "pawns on the same file unable to support each other",
      "pawns on adjacent files",
      "pawn and knight",
      "promoted pawns"
    ]
  },
  "ch-pi-doubled-2": {
    "optionsEn": [
      "blockade and target front pawn, which cannot be defended by pawn",
      "push own pawns into them",
      "ignore them",
      "offer draw"
    ]
  },
  "ch-pi-backward-1": {
    "optionsEn": [
      "pawn lagging behind neighbor pawns on a half-open file",
      "pawn that moves backwards",
      "pawn on 7th rank",
      "passed pawn"
    ]
  },
  "ch-pi-backward-2": {
    "optionsEn": [
      "occupy the hole in front and exert pressure along the half-open file",
      "trade rooks immediately",
      "retreat to 1st rank",
      "push h-pawn"
    ]
  },
  "ch-pi-chain-1": {
    "optionsEn": [
      "diagonal chain of pawns supporting each other",
      "isolated pawns",
      "doubled pawns on edge",
      "passed pawns"
    ]
  },
  "ch-pi-chain-2": {
    "optionsEn": [
      "at the base of the chain, collapsing its foundation",
      "at the very front pawn",
      "from behind your own king",
      "never attack chains"
    ]
  },
  "ch-pi-majority-1": {
    "optionsEn": [
      "more pawns on one flank than the opponent",
      "having more pieces overall",
      "king and queen pair",
      "rook pair"
    ]
  },
  "ch-pi-majority-2": {
    "optionsEn": [
      "advance pawns to create an outside passed pawn",
      "trade all pawns",
      "retreat pieces",
      "stand still"
    ]
  },
  "ch-pi-openfile-1": {
    "optionsEn": [
      "file with no pawns of either color",
      "file with two black pawns",
      "edge file a or h",
      "any diagonal"
    ]
  },
  "ch-pi-openfile-2": {
    "optionsEn": [
      "double rooks and infiltrate the 7th or 8th rank",
      "place knights on it only",
      "block file with pawns",
      "move king to it"
    ]
  },
  "ch-pc-bvk-1": {
    "optionsEn": [
      "bishop is long-range on open diagonals; knight excels in closed centers",
      "they are completely identical",
      "knight is always superior",
      "bishop can jump over pawns"
    ]
  },
  "ch-pc-bvk-2": {
    "optionsEn": [
      "closed board with locked pawn chains",
      "open board with pawns on both flanks",
      "opposite-color bishop endgames",
      "queenless open boards"
    ]
  },
  "ch-pc-bishops-1": {
    "optionsEn": [
      "they control diagonals of both dark and light colors",
      "they can jump like knights",
      "they cannot be pinned",
      "they protect the king automatically"
    ]
  },
  "ch-pc-bishops-2": {
    "optionsEn": [
      "lock the center with fixed pawn chains to restrict diagonals",
      "open the board completely",
      "trade your knights for pawns",
      "give away the center"
    ]
  },
  "ch-pc-outpost-1": {
    "optionsEn": [
      "hole in opponent territory protected by pawn that cannot be driven by enemy pawns",
      "starting square b1",
      "corner square a8",
      "file without pawns"
    ]
  },
  "ch-pc-outpost-2": {
    "optionsEn": [
      "knight — dominates surrounding squares without pawn challenges",
      "king",
      "pawn",
      "rook"
    ]
  },
  "ch-pc-badbishop-1": {
    "optionsEn": [
      "own pawns are locked on the same color squares as the bishop",
      "it was captured",
      "it is on an open diagonal",
      "it pins an enemy knight"
    ]
  },
  "ch-pc-badbishop-2": {
    "optionsEn": [
      "trade it for enemy knight/good bishop or place pawns on opposite color",
      "double your pawns",
      "lock the board tighter",
      "resign"
    ]
  },
  "ch-pc-rook7th-1": {
    "optionsEn": [
      "attacks base pawns horizontally and traps enemy king on back rank",
      "delivers checkmate instantly",
      "blocks opponent knights",
      "is immune to captures"
    ]
  },
  "ch-pc-rook7th-2": {
    "optionsEn": [
      "double rooks on 7th (blind pigs) with overwhelming mating threats",
      "trade one rook for pawn",
      "retreat to 1st rank",
      "move king forward"
    ]
  },
  "ch-pc-heavy-1": {
    "optionsEn": [
      "queen and rooks",
      "knights and bishops",
      "pawns only",
      "king and knight"
    ]
  },
  "ch-pc-heavy-2": {
    "optionsEn": [
      "king safety and active initiative",
      "exact pawn count only",
      "color of squares",
      "who has more time"
    ]
  },
  "ch-re-philidor-1": {
    "optionsEn": [
      "keep rook on 6th rank cut-off until pawn reaches 6th, then check from behind",
      "move rook to 1st rank immediately",
      "stand king on promotion square",
      "give up the rook"
    ]
  },
  "ch-re-philidor-2": {
    "optionsEn": [
      "checks from behind along the open file drive the enemy king away",
      "advancing own pawn",
      "trading rooks",
      "stalemate trap"
    ]
  },
  "ch-re-bridge-1": {
    "optionsEn": [
      "placing rook on 4th rank to shield the king from vertical checks",
      "castling",
      "giving away the pawn",
      "stalemate trick"
    ]
  },
  "ch-re-bridge-2": {
    "optionsEn": [
      "king emerges to let pawn promote, rook shields king from checks",
      "king stays trapped on back rank",
      "pawn is sacrificed",
      "game ends in draw"
    ]
  },
  "ch-calc-cct-1": {
    "optionsEn": [
      "Checks, Captures, Threats",
      "Castle, Centre, Time",
      "Checkmate in one",
      "Only quiet moves"
    ]
  },
  "ch-calc-cct-2": {
    "optionsEn": [
      "forcing moves limit opponent's legal options, making calculation reliable",
      "they are easier to write down",
      "rules require them",
      "they guarantee victory"
    ]
  },
  "ch-calc-count-1": {
    "optionsEn": [
      "count number of attacking and defending pieces on the target square",
      "guess based on intuition",
      "ignore opponent defenders",
      "move queen immediately"
    ]
  },
  "ch-calc-count-2": {
    "optionsEn": [
      "side with fewer defenders loses material in the exchange",
      "both players draw",
      "all pieces are removed",
      "no effect"
    ]
  },
  "ch-calc-zwischen-1": {
    "optionsEn": [
      "an intermediate move (often a check or threat) before the expected recapture",
      "resigning",
      "castling in endgame",
      "pawn promotion"
    ]
  },
  "ch-calc-zwischen-2": {
    "optionsEn": [
      "opponent's expected recapture is disrupted, winning material or tempo",
      "game is declared void",
      "queen is lost",
      "both players trade kings"
    ]
  },
  "ch-calc-blunder-1": {
    "optionsEn": [
      "checks on opponent's replies and defensive resources",
      "only your own threats",
      "board symmetry",
      "clock time only"
    ]
  },
  "ch-calc-blunder-2": {
    "optionsEn": [
      "pause and ask: what does my opponent threaten after this move?",
      "play instantly on instinct",
      "check your phone",
      "offer a draw"
    ]
  },
  "ch-calc-stop-1": {
    "optionsEn": [
      "when the position reaches a quiet state without forcing tactical moves",
      "never, calculate to mate",
      "after move 1",
      "when opponent smiles"
    ]
  },
  "ch-calc-stop-2": {
    "optionsEn": [
      "calculating in depth without reaching a quiet position leads to tactical blind spots",
      "it saves time",
      "it is tournament requirement",
      "it guarantees accuracy"
    ]
  },
  "ch-pr-time-1": {
    "optionsEn": [
      "spend more time on critical tactical junctures and structural decisions",
      "spend equal time on every single move",
      "play all moves in 1 second",
      "save all time for move 40"
    ]
  },
  "ch-pr-time-2": {
    "optionsEn": [
      "errors multiply as clock pressure causes severe blunders",
      "play improves dramatically",
      "opponent resigns",
      "clock stops"
    ]
  },
  "ch-pr-annotate-1": {
    "optionsEn": [
      "identify turning points, evaluation swings, and underlying mistake reasons",
      "brag about wins",
      "erase all losses",
      "memorize move numbers"
    ]
  },
  "ch-pr-annotate-2": {
    "optionsEn": [
      "learning from losses prevents repeating identical mistakes in future games",
      "wins are luck only",
      "analysis is prohibited",
      "it improves rating automatically"
    ]
  },
  "ch-pr-study-1": {
    "optionsEn": [
      "identify the core idea and reasoning, not just raw algebraic notation",
      "only note down ?? blunders",
      "nothing: it is embarrassing",
      "name of opening book"
    ]
  },
  "ch-pr-study-2": {
    "optionsEn": [
      "it does not train active decision-making under uncertainty",
      "master games cannot be viewed",
      "computer forbids it",
      "opening theory changes"
    ]
  },
  "ch-pr-repertoire-1": {
    "optionsEn": [
      "opponents deviate early, but fundamental plans and structures remain valid",
      "variations never deviate",
      "structures are illegal",
      "memory is always 100%"
    ]
  },
  "ch-pr-repertoire-2": {
    "optionsEn": [
      "after understanding the key structures and recurring strategic plans",
      "instead of any understanding always",
      "only in endgames",
      "never: theory is useless"
    ]
  },
  "ch-pr-review-1": {
    "optionsEn": [
      "mistakes recur endlessly without identifying their underlying root causes",
      "blitz is illegal",
      "blitz has no openings",
      "recording moves is impossible"
    ]
  },
  "ch-pr-review-2": {
    "optionsEn": [
      "identify turning point, diagnose root cause, carry one lesson forward",
      "close the board immediately",
      "complain about the opponent",
      "switch openings at random"
    ]
  },
  "ch-eg4": {
    "optionsEn": [
      "Two rooks (or rook + queen)",
      "Two knights",
      "Pawns only",
      "Bishops only"
    ]
  },
  "ch-tp2-1": {
    "optionsEn": [
      "King trapped by own pawns on 1st/8th rank",
      "No queen on board",
      "Only in opening",
      "Always after 0-0-0"
    ]
  },
  "ch-tp2-3": {
    "optionsEn": [
      "Two (or more) pieces in a single move",
      "Only a pawn",
      "Only opponent king always",
      "Nothing"
    ]
  },
  "ch-tp2-5": {
    "optionsEn": [
      "The king",
      "Only rook a1",
      "An empty square",
      "Castling"
    ]
  },
  "ch-tp2-7": {
    "optionsEn": [
      "Attack on valuable piece with less valuable piece behind it",
      "Only castling",
      "Pawn move e4",
      "Stalemate"
    ]
  },
  "ch-tp2-8": {
    "optionsEn": [
      "Captures the more valuable piece in front first",
      "Never works with rooks",
      "Only possible in kingless endgame",
      "Forbidden by rules"
    ]
  },
  "ch-tp2-9": {
    "optionsEn": [
      "Fork, battery, or simultaneous double attack",
      "Only via en passant",
      "Only via castling",
      "Never in middlegame"
    ]
  },
  "ch-ear-e2": {
    "optionsEn": [
      "Checks, captures, and direct threats of mate or material win",
      "Only pawn symmetry on queenside",
      "Opening history without tactical evaluation",
      "Total games played in rating"
    ]
  },
  "ch-op-king-l": {
    "quizEn": {
      "qEn": "Why is an open center dangerous for an uncastled king?",
      "optionsEn": [
        "Files and diagonals open directly towards the king",
        "Pawns stop moving",
        "Castling becomes automatically illegal",
        "Queen cannot develop"
      ]
    }
  },
  "ch-op-king-1": {
    "optionsEn": [
      "When the center is locked and play is focused on the flank",
      "Always in the Sicilian",
      "Never, even under mate threats",
      "Only if castling rights are lost"
    ]
  },
  "ch-op-king-2": {
    "optionsEn": [
      "Both sides can still legally castle",
      "Neither side can castle",
      "Black only",
      "Both sides already castled"
    ]
  },
  "ch-op-premature-l": {
    "quizEn": {
      "qEn": "What happens after passive 3...a6?",
      "optionsEn": [
        "4.Qxf7# checkmate",
        "Nothing, queen cannot reach f7",
        "Black wins queen immediately",
        "Stalemate"
      ]
    }
  },
  "ch-op-premature-1": {
    "optionsEn": [
      "Nf6 or g6 — attacking queen while defending f7",
      "a6 and b6 ignoring f7",
      "Capture queen with knight b8",
      "Resign"
    ]
  },
  "ch-op-premature-2": {
    "optionsEn": [
      "Opponent develops pieces rapidly while attacking the queen",
      "Queen cannot move in opening",
      "Queen is weaker than pawn",
      "Castling forbids queen moves"
    ]
  },
  "ch-op-review-l": {
    "quizEn": {
      "qEn": "How did Black respond to Ng5?",
      "optionsEn": [
        "d5 — central counter-strike and defense",
        "a6",
        "Captured knight g5 with rook",
        "Queenside castling"
      ]
    }
  },
  "ch-op-review-1": {
    "optionsEn": [
      "There is a concrete tactical threat against f7",
      "Principles have zero exceptions",
      "Knight on g5 is invincible",
      "d5 is illegal"
    ]
  },
  "ch-op-review-2": {
    "optionsEn": [
      "Center, development, king safety",
      "Checkmate in 2 moves only",
      "Queenside castling only",
      "Never moving pawns"
    ]
  },
  "ch-ps-iqp-l": {
    "quizEn": {
      "qEn": "Why is an isolated pawn dangerous in the endgame?",
      "optionsEn": [
        "Difficult to defend and easily blockaded by pieces",
        "It always promotes on its own",
        "It forbids castling",
        "It results in stalemate"
      ]
    }
  },
  "ch-ps-iqp-1": {
    "optionsEn": [
      "Dynamic piece activity and attack using central outposts",
      "Immediate simplification into pawn endgame",
      "Sacrificing pawn without compensation",
      "Retreating all pieces to 1st rank"
    ]
  },
  "ch-ps-iqp-2": {
    "optionsEn": [
      "On d5, blockading the pawn",
      "On a1",
      "On h8 without plan",
      "Behind own king only"
    ]
  },
  "ch-ps-doubled-l": {
    "quizEn": {
      "qEn": "What is the primary drawback of doubled pawns?",
      "optionsEn": [
        "They cannot defend each other and restrict mobility",
        "They must move simultaneously",
        "They transform into bishops",
        "They are forbidden"
      ]
    }
  },
  "ch-ps-doubled-1": {
    "optionsEn": [
      "Opened semi-open files for rooks and central control",
      "Always winning advantage",
      "Allows triple moves",
      "Automatic promotion"
    ]
  },
  "ch-ps-doubled-2": {
    "optionsEn": [
      "Fix them with a blockade and attack the front pawn",
      "Exchange all pieces blindly",
      "Push flank pawns recklessly",
      "Resign"
    ]
  },
  "ch-ps-passed-l": {
    "quizEn": {
      "qEn": "What defines a passed pawn?",
      "optionsEn": [
        "No opposing pawns on its file or adjacent files to stop it",
        "A pawn that has castled",
        "A pawn on rank 2",
        "A captured pawn"
      ]
    }
  },
  "ch-ps-passed-1": {
    "optionsEn": [
      "Opponent must divert pieces to blockade and stop its promotion",
      "It delivers checkmate alone",
      "It cannot be captured",
      "It doubles Elo"
    ]
  },
  "ch-ps-passed-2": {
    "optionsEn": [
      "Advance own passed pawn supported by king and pieces",
      "Keep it on initial square",
      "Sacrifice it for nothing",
      "Trade for own pawn"
    ]
  },
  "ch-ps-backward-l": {
    "quizEn": {
      "qEn": "What is a backward pawn?",
      "optionsEn": [
        "Pawn lagging behind neighbors that cannot be protected by pawns",
        "A pawn moving backwards",
        "A passed pawn",
        "A promoted queen"
      ]
    }
  },
  "ch-ps-backward-1": {
    "optionsEn": [
      "Occupy the weak hole in front with a piece and pressure the file",
      "Trade rooks immediately",
      "Retreat pieces",
      "Ignore it"
    ]
  },
  "ch-ps-backward-2": {
    "optionsEn": [
      "Prepare a pawn break (e.g. d6-d5) to eliminate the weakness",
      "Keep it backward forever",
      "Surrender the d5 square",
      "Resign"
    ]
  },
  "ch-ps-islands-l": {
    "quizEn": {
      "qEn": "What are pawn islands?",
      "optionsEn": [
        "Isolated groups of pawns separated by open files without pawns",
        "Single pawns on the edge",
        "Pawns on the 7th rank",
        "Promoted pawns"
      ]
    }
  },
  "ch-ps-islands-1": {
    "optionsEn": [
      "Fewer pawn islands are more compact and easier to defend",
      "More islands are always better",
      "Islands have zero effect",
      "Islands guarantee mate"
    ]
  },
  "ch-ps-islands-2": {
    "optionsEn": [
      "Target the isolated islands that lack mutual pawn support",
      "Trade all pieces into equal pawns",
      "Never attack pawns",
      "Offer draw"
    ]
  },
  "ch-mg-outpost-l": {
    "quizEn": {
      "qEn": "What is a knight outpost?",
      "optionsEn": [
        "A hole in enemy camp supported by pawn that cannot be attacked by enemy pawns",
        "Starting square b1",
        "Back rank e8",
        "Unprotected rim square"
      ]
    }
  },
  "ch-mg-outpost-1": {
    "optionsEn": [
      "Dominates enemy territory, restricts pieces, and creates threats",
      "Disables enemy clocks",
      "Forces immediate draw",
      "Cannot be taken by pieces"
    ]
  },
  "ch-mg-outpost-2": {
    "optionsEn": [
      "Trade it off or undermine its supporting pawn structure",
      "Ignore it completely",
      "Move king toward it",
      "Resign"
    ]
  },
  "ch-mg-weak-l": {
    "quizEn": {
      "qEn": "What is a weak square in a position?",
      "optionsEn": [
        "A square that can no longer be protected by friendly pawns",
        "An empty corner square",
        "Any square on rank 1",
        "A square with a queen"
      ]
    }
  },
  "ch-mg-weak-1": {
    "optionsEn": [
      "Pushing pawns permanently forfeits control of squares they left",
      "Pawns can retreat",
      "Pawns never weaken squares",
      "Pawns jump like knights"
    ]
  },
  "ch-mg-weak-2": {
    "optionsEn": [
      "Occupy it with a minor piece (knight/bishop) as an anchor",
      "Place king on it in middlegame",
      "Avoid it completely",
      "Sacrifice a rook on it"
    ]
  },
  "ch-mg-pair-l": {
    "quizEn": {
      "qEn": "In what positions is the bishop pair strongest?",
      "optionsEn": [
        "Open positions with open diagonals and pawns on both flanks",
        "Closed positions with locked pawns",
        "Where pawns block diagonals",
        "In king and pawn endgames"
      ]
    }
  },
  "ch-mg-pair-1": {
    "optionsEn": [
      "Open the board with pawn breaks to maximize diagonal scope",
      "Lock the center with pawns",
      "Trade bishops for knights without reason",
      "Hide bishops behind pawns"
    ]
  },
  "ch-mg-pair-2": {
    "optionsEn": [
      "Keep position closed and anchor knights on stable central holes",
      "Open all files immediately",
      "Sacrifice queen for bishop",
      "Forbid bishop moves"
    ]
  },
  "ch-mg-file-l": {
    "quizEn": {
      "qEn": "What is the typical goal for a rook on an open file?",
      "optionsEn": [
        "Infiltrate the 7th or 8th rank to attack pawns and king",
        "Stay on 1st rank forever",
        "Trade for a knight immediately",
        "Close the file with own pawn"
      ]
    }
  },
  "ch-mg-file-1": {
    "optionsEn": [
      "Dominate the file and break into enemy camp overcoming defense",
      "Always results in stalemate",
      "Rooks cannot share a file",
      "To shield own king"
    ]
  },
  "ch-mg-file-2": {
    "optionsEn": [
      "Infiltration square on an open file used to enter enemy camp",
      "Square where king stands",
      "Any knight square",
      "Initial opening square"
    ]
  },
  "ch-mg-luft-l": {
    "quizEn": {
      "qEn": "Which move creates luft and prevents Re1#?",
      "optionsEn": [
        "h3 (or g3)",
        "Kh1",
        "Ra3 without escape square for king",
        "Ke2 illegal due to pawns and rules"
      ]
    }
  },
  "ch-mg-luft-1": {
    "optionsEn": [
      "King remains trapped on back rank without escape, mate persists",
      "Kh1 is always illegal",
      "Black rook cannot go to e1",
      "It is stalemate"
    ]
  },
  "ch-mg-luft-2": {
    "optionsEn": [
      "Escape square for king — usually h3/g3 or h6/g6",
      "Queen sacrifice",
      "Type of castling",
      "Prohibiting rook moves"
    ]
  },
  "ch-re-behind-l": {
    "quizEn": {
      "qEn": "Where does Tarrasch recommend placing the rook relative to a passed pawn?",
      "optionsEn": [
        "Behind it, on the same file",
        "In front of it passively",
        "On a distant flank file",
        "On opponent king's square"
      ]
    }
  },
  "ch-re-behind-1": {
    "optionsEn": [
      "As pawn advances, rook maintains long-range scope and protection",
      "Rook cannot stand behind pawn by rules",
      "Pawn blocks rook permanently",
      "Always checkmate in 1"
    ]
  },
  "ch-re-behind-2": {
    "optionsEn": [
      "When emergency blockade is required right at promotion square",
      "Never",
      "Only in the opening",
      "Only if there is no king"
    ]
  },
  "ch-re-cutoff-l": {
    "quizEn": {
      "qEn": "What is the rook on e1 doing to the black king?",
      "optionsEn": [
        "Cutting off the king from crossing the e-file",
        "Checking king every move",
        "Protecting black king",
        "Preparing castling"
      ]
    }
  },
  "ch-re-cutoff-1": {
    "optionsEn": [
      "King is active in endgame; cutting it off severely weakens defense",
      "King takes no part in endgame",
      "Cutoff always causes stalemate",
      "Rook cannot move"
    ]
  },
  "ch-re-cutoff-2": {
    "optionsEn": [
      "Using rook checks and attacking the cutting rook to cross the file",
      "Resigning immediately",
      "Hiding king further away",
      "Swapping king places"
    ]
  },
  "ch-re-activity-l": {
    "quizEn": {
      "qEn": "Which rook is more active and why?",
      "optionsEn": [
        "Black's: penetrating in the rear, attacking pawns and king",
        "White's: closer to a8",
        "Both are always equal",
        "Rooks are inactive in endgames"
      ]
    }
  },
  "ch-re-activity-1": {
    "optionsEn": [
      "Sacrifice a pawn to activate rook into the rear with checks",
      "Lock rook behind own pawns forever",
      "Trade rook for knight in opening",
      "Never move rook"
    ]
  },
  "ch-re-activity-2": {
    "optionsEn": [
      "Passive rook only defends, handing opponent permanent initiative",
      "Passivity always wins",
      "Rooks cannot be passive by rules",
      "Passive rooks castle faster"
    ]
  }
};
