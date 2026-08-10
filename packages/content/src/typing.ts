import type { CourseContent } from "./types.js";

const enHome = "asdf jkl; asdf jkl; aaa sss ddd fff jjj kkk lll ;;;";
const enWords = "the and for are but not you all can had her was one our";
const ukHome = "фіва прол фіва прол ффф ііі ввв ааа ппп ррр ооо ллл";

function typingLesson(
  slug: string,
  titleUk: string,
  text: string,
  layout: "en" | "uk",
  free = false,
  difficulty = 1,
  titleEn?: string,
): CourseContent["units"][0]["lessons"][0] {
  return {
    slug,
    titleUk,
    titleEn: titleEn ?? titleUk,
    baseXp: 12 + difficulty * 3,
    difficulty,
    isFree: free,
    exercises: [
      {
        id: `tp-${slug}`,
        type: "typing",
        promptUk: titleUk,
        promptEn: titleEn ?? titleUk,
        text,
        layout,
        targetWpm: 20 + difficulty * 10,
      },
    ],
  };
}

export const typingContent: CourseContent = {
  slug: "typing",
  titleUk: "Друк",
  titleEn: "Typing",
  descriptionUk: "Сліпий друк: швидкість і точність (EN + UK).",
  descriptionEn: "Build speed and accuracy with touch typing drills.",
  icon: "⌨️",
  color: "#1CB0F6",
  units: [
    {
      slug: "home-row",
      titleUk: "Домашній ряд",
      titleEn: "Домашній ряд",
      lessons: [
        typingLesson("en-home-1", "EN: asdf jkl;", enHome, "en", true, 1),
        typingLesson("en-home-2", "EN: слова home row", "a sad lad; a flask; dad asks", "en", true, 1),
        typingLesson("uk-home-1", "UK: фіва прол", ukHome, "uk", true, 1),
        typingLesson("uk-home-2", "UK: прості слова", "аварія пора порада лава", "uk", true, 1),
        typingLesson("en-home-3", "EN: ритм", "asdfjkl; asdfjkl; fj fj dk dk sl sl a; a;", "en", true, 2),
        typingLesson("en-top-1", "EN: верхній ряд", "qwer uiop qwer uiop type write power", "en", false, 2),
        typingLesson("en-bottom-1", "EN: нижній ряд", "zxcv bnm zxcv bnm mix zinc box", "en", false, 2),
        typingLesson("en-words-1", "EN: часті слова", enWords, "en", false, 2),
        typingLesson("uk-words-1", "UK: часті слова", "і так але або він вона вони ми ви", "uk", false, 2),
        typingLesson("en-sentence-1", "EN: речення", "Practice makes progress every single day.", "en", false, 3),
        typingLesson("uk-sentence-1", "UK: речення", "Щоденна практика робить друк впевненим.", "uk", false, 3),
        typingLesson("en-para-1", "EN: абзац", "Typing speed grows when accuracy stays high. Keep wrists relaxed and eyes on the screen.", "en", false, 3),
        typingLesson("mixed-1", "Змішана практика EN", "The quick brown fox jumps over the lazy dog.", "en", false, 3),
        typingLesson("numbers-1", "Цифри", "123 456 789 0 10 20  thr  thr  thr", "en", false, 3),
        typingLesson("free-warmup", "Розминка", "ready set go ready set go focus flow focus flow", "en", false, 1),
        typingLesson("en-speed-1", "Швидкість 1", "time time time time time code code code ship ship", "en", false, 4),
        typingLesson("en-speed-2", "Швидкість 2", "accuracy first then speed accuracy first then speed", "en", false, 4),
        typingLesson("uk-speed-1", "UK швидкість", "швидкість точність баланс швидкість точність баланс", "uk", false, 4),
        typingLesson("challenge-1", "Виклик", "Build habits that compound. Small daily wins beat rare heroics.", "en", false, 5),
        typingLesson("challenge-2", "Фінальний виклик", "EduForge typing mastery requires calm hands and clear mind.", "en", false, 5),
        typingLesson("en-punct-1", "EN: пунктуація", "Hello, world! How are you? I'm fine — thanks.", "en", false, 3),
        typingLesson("uk-punct-1", "UK: пунктуація", "Привіт, світе! Як справи? Все добре — дякую.", "uk", false, 3),
        typingLesson("en-code-ish", "EN: символи", "email@site.com #tag $price 50% {code} (note)", "en", false, 4),
        typingLesson("en-long-1", "EN: довгий текст", "Consistency beats intensity. Ten focused minutes daily build skill faster than rare long sessions without attention.", "en", false, 4),
        typingLesson("uk-long-1", "UK: довгий текст", "Регулярність важливіша за інтенсивність. Десять уважних хвилин щодня дають більший прогрес.", "uk", false, 4),
        typingLesson("en-speed-3", "Швидкість 3", "flow state focus type type type accuracy first always", "en", false, 5),
        typingLesson("mixed-2", "EN pangram 2", "Pack my box with five dozen liquor jugs.", "en", false, 4),
        typingLesson("uk-proverb", "UK прислів'я", "Без труда нема плода. Повторення — мати навчання.", "uk", false, 3),
        typingLesson("final-sprint", "Фінальний спринт", "You finished the typing path. Keep a short daily warm-up forever.", "en", false, 5),
        typingLesson("en-quotes", "EN: quotes", "Type fast, she said. But stay accurate!", "en", false, 3),
        typingLesson("uk-quotes", "UK: лапки", "«Пиши швидко, але точно», — сказав тренер.", "uk", false, 3),
        typingLesson("en-email", "EN: email style", "Please review the pull request and leave comments before noon.", "en", false, 4),
        typingLesson("en-code-comment", "EN: code comments", "// TODO: refactor this loop. Keep names clear. Avoid magic numbers.", "en", false, 4),
        typingLesson("uk-news", "UK: новина", "Студенти щодня практикують друк і покращують точність.", "uk", false, 3),
        typingLesson("boss-sprint", "Boss sprint", "Mastery is boring reps done with attention. Breathe. Type. Review. Repeat.", "en", false, 5),
      ],
    },
  ],
};
