/** Generate packages/content/src/skill-prompt-en.ts from missing-en.json */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const dir = dirname(fileURLToPath(import.meta.url));
const rows = JSON.parse(readFileSync(join(dir, "missing-en.json"), "utf8"));

/** Manual high-quality EN for known Ukrainian UI + natural English for already-EN prompts */
const BY_UK = {
  "What is your name? — відповідь:": "What is your name? — choose the answer:",
  "Заповніть пропуск": "Fill in the blank",
  "Перекладіть англійською": "Translate into English",
  "Перекладіть": "Translate",
  Числа: "Numbers",
  "Як буде 3?": "How do you say 3 in English?",
  "I have two cats": "Put the words in order: I have two cats",
  "apple — це:": "apple means:",
  "I ___ coffee.": "I ___ coffee.",
  "How are you?": "How are you? — choose the best reply",
  "Could you help me?": "Put the words in order: Could you help me?",
  "She ___ to school every day.": "She ___ to school every day.",
  "They ___ football on Sundays.": "They ___ football on Sundays.",
  "He does not like tea": "Put the words in order: He does not like tea",
  Кольори: "Colors",
  "mother — це:": "mother means:",
  "___ is this? — This is a pen.": "___ is this? — This is a pen.",
  "Where do you live?": "Put the words in order: Where do you live?",
  "___ old are you?": "___ old are you?",
  "It's half past two =": "It's half past two means:",
  "Місця в місті": "Places in the city",
  "I go ___ the park.": "I go ___ the park.",
  "Yesterday I ___ home.": "Yesterday I ___ home.",
  "She watched a film": "Put the words in order: She watched a film",
  "boarding pass — це:": "boarding pass means:",
  "I have a reservation": "Put the words in order: I have a reservation",
  "I'd like a room for two nights.": "I'd like a room for two nights. — choose the meaning",
  Меню: "Menu",
  "I'm allergic to nuts.": "I'm allergic to nuts. — choose the meaning",
  "How much ___ it cost?": "How much ___ it cost?",
  "Can I try this on?": "Put the words in order: Can I try this on?",
  "size — це:": "size means:",
  Офіс: "Office",
  "I'll send you an email.": "I'll send you an email. — choose the meaning",
  "She ___ right now.": "She ___ right now.",
  "They are watching a film": "Put the words in order: They are watching a film",
  "I ___ learning English.": "I ___ learning English.",
  "I ___ visit Lviv next week.": "I ___ visit Lviv next week.",
  "Фрази згоди": "Agreement phrases",
  "In my opinion it is great": "Put the words in order: In my opinion it is great",
  "He ___ coffee every morning.": "He ___ coffee every morning.",
  "___ you like tea?": "___ you like tea?",
  "Початкова позиція": "Starting position",
  "Яка фігура ходить літерою «Г»?": "Which piece moves in an L-shape?",
  "Що таке шах?": "What is check?",
  "Мат — коли король під шахом і немає захисту": "Checkmate — the king is in check and has no escape",
  "Рокіровка — це:": "Castling is:",
  "Пішак, досягнувши 8-ї горизонталі:": "A pawn that reaches the 8th rank:",
  "Знайдіть мат в 1 хід (білі)": "Find mate in 1 (White to move)",
  "Мат в 1: ферзь": "Mate in 1: queen",
  "Мат турою": "Mate with a rook",
  "Мат двома турами (класика)": "Mate with two rooks (classic)",
  "Кінь бере з вилкою (проста позиція)": "Knight fork (simple position)",
  "Вилка — це:": "A fork is:",
  "Зв'язка (pin) — коли фігура:": "A pin is when a piece:",
  "Знайдіть сильний хід (шах)": "Find a strong move (check)",
  "Мат ферзем": "Mate with the queen",
  "Мат в 1 (ладья + король)": "Mate in 1 (rook + king)",
  "Back-rank мат": "Back-rank mate",
  "Back-rank mate — це:": "Back-rank mate is:",
  "Контроль центру": "Control of the center",
  "Чому важлива рокіровка?": "Why is castling important?",
  "Опозиція в ендшпілі — це:": "Opposition in the endgame is:",
  "Просування пішака": "Pawn promotion",
  "Мат двома турами (сходи)": "Mate with two rooks (ladder)",
  "Мат «сходами» роблять:": "A ladder mate is delivered by:",
  "RSVP у швидкочитанні означає:": "In speed reading, RSVP means:",
  "Потренуйте RSVP (повільно)": "Practice RSVP (slow)",
  "Субвокалізація — це:": "Subvocalization is:",
  "RSVP середній темп": "RSVP medium pace",
  "Chunking допомагає:": "Chunking helps you:",
  "Швидший RSVP": "Faster RSVP",
  "Прочитайте й відповідайте": "Read and answer",
  Розігрів: "Warm-up",
  "Текст про звички": "Text about habits",
  "Мета тренування периферії:": "The goal of peripheral vision training:",
  "Темп 320 wpm": "Pace 320 wpm",
  "Наука й фокус": "Science and focus",
  "400 wpm — коротко": "400 wpm — short text",
  "Найкраща стратегія:": "The best strategy:",
  "Про шахи й навчання": "About chess and learning",
  "Ключ до прогресу у швидкочитанні:": "The key to progress in speed reading:",
  "Фінальний RSVP": "Final RSVP",
  "Скімінг — це:": "Skimming is:",
  "Скімінг статті": "Skimming an article",
  "Сканування тексту потрібно, щоб:": "Scanning a text is useful to:",
  "RSVP 360": "RSVP 360",
  "Сон і пам'ять": "Sleep and memory",
  "380 wpm": "380 wpm",
  "Фінальне правило:": "Final rule:",
  "Квадрат, коло, квадрат, коло, ?": "Square, circle, square, circle, ?",
  "У матриці: [1 2 / 3 ?]. Якщо рядок +2 по діагоналі логіки: 1→3 (+2), 2→?":
    "In the matrix [1 2 / 3 ?]: if the pattern is +2 down, what replaces ?",
  "2 4 / 3 6 / 4 ?": "2 4 / 3 6 / 4 ?",
  "Що зайве: кіт, пес, стіл, кролик?": "Odd one out: cat, dog, table, rabbit?",
  "Що зайве: яблуко, груша, морква, слива?": "Odd one out: apple, pear, carrot, plum?",
  "Що зайве: квадрат, коло, трикутник, куб?": "Odd one out: square, circle, triangle, cube?",
  "Що зайве: понеділок, березень, середа, п'ятниця?":
    "Odd one out: Monday, March, Wednesday, Friday?",
  "День → ніч, як гаряче → ?": "Day → night, as hot → ?",
  "Птах → гніздо, як бджола → ?": "Bird → nest, as bee → ?",
  "Книга → читати, як пісня → ?": "Book → read, as song → ?",
  "Лікар → лікарня, як вчитель → ?": "Doctor → hospital, as teacher → ?",
  "Усі риби дихають під водою. Лосось — риба. Отже:":
    "All fish breathe underwater. Salmon is a fish. Therefore:",
  "Якщо йде дощ — земля мокра. Земля мокра. Чи йде дощ?":
    "If it rains, the ground is wet. The ground is wet. Is it raining?",
  "А вищий за Б. Б вищий за В. Хто найнижчий?":
    "A is taller than B. B is taller than C. Who is shortest?",
  "Поїзд швидший за автобус. Автобус швидший за велосипед. Найповільніший?":
    "A train is faster than a bus. A bus is faster than a bike. Slowest?",
  "Що зайве: ручка, олівець, зошит, яблуко?": "Odd one out: pen, pencil, notebook, apple?",
  "Стіл → меблі, як троянда → ?": "Table → furniture, as rose → ?",
  "Якщо 2+3=10, 3+4=21, 4+5=36, то 5+6=?": "If 2+3=10, 3+4=21, 4+5=36, then 5+6=?",
  "Продовжіть: 1, 2, 6, 24, ?": "Continue: 1, 2, 6, 24, ?",
  "Три сестри мають 3, 5 і 7 яблук. Скільки разом?":
    "Three sisters have 3, 5 and 7 apples. How many in total?",
  "Годинник показує 3:15. Який кут між стрілками? (приблизно)":
    "A clock shows 3:15. Approximate angle between hands?",
  "Усі квадрати — ромби. Деякі ромби — не квадрати. Чи всі ромби — квадрати?":
    "All squares are rhombi. Some rhombi are not squares. Are all rhombi squares?",
  "Обчисліть: 3+5*2=?": "Calculate: 3+5*2=?",
  "Що зайве: скрипка, гітара, барабан, молоток?":
    "Odd one out: violin, guitar, drum, hammer?",
  "Книга → сторінки, як будинок → ?": "Book → pages, as house → ?",
  "Усі спортсмени тренуються. Олег — спортсмен. Отже:":
    "All athletes train. Oleh is an athlete. Therefore:",
  "Жоден кіт не собака. Барсик — кіт. Отже Барсик:":
    "No cat is a dog. Barsik is a cat. Therefore Barsik:",
  "Якщо A > B і B > C, то A ? C": "If A > B and B > C, then A ? C",
  "Троє дітей з'їли 2, 3 і 5 цукерок. Скільки всього?":
    "Three kids ate 2, 3 and 5 candies. How many total?",
  "▲ ▲ ■ ▲ ▲ ■ ▲ ▲ ?": "▲ ▲ ■ ▲ ▲ ■ ▲ ▲ ?",
};

function looksMostlyEnglish(s) {
  const letters = s.replace(/[^a-zA-Zа-яА-ЯіІїЇєЄґҐ]/g, "");
  if (!letters) return true;
  const latin = (letters.match(/[a-zA-Z]/g) || []).length;
  return latin / letters.length >= 0.7;
}

const byId = {};
let missing = 0;
for (const r of rows) {
  let en = BY_UK[r.promptUk];
  if (!en) {
    if (looksMostlyEnglish(r.promptUk)) {
      en = r.promptUk;
    } else {
      // leave for fallback translator — still generate id entry via heuristic
      en = null;
    }
  }
  if (en) byId[r.id] = en;
  else {
    missing++;
    // last-resort: keep UK as temporary (should not happen if map complete)
    byId[r.id] = r.promptUk;
    console.warn("unmapped", r.id, r.promptUk);
  }
}

const lines = [
  "/** Auto-generated skill-course promptEn map. Source: scripts/gen-skill-prompt-en.mjs */",
  "export const SKILL_PROMPT_EN_BY_ID: Record<string, string> = {",
  ...Object.entries(byId).map(
    ([id, en]) => `  ${JSON.stringify(id)}: ${JSON.stringify(en)},`,
  ),
  "};",
  "",
];

const out = join(dir, "../packages/content/src/skill-prompt-en.ts");
writeFileSync(out, lines.join("\n"), "utf8");
console.log("wrote", Object.keys(byId).length, "entries; unmapped heuristics:", missing);
