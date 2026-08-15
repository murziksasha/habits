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
  const enTitle = titleEn ?? titleUk;
  return {
    slug,
    titleUk,
    titleEn: enTitle,
    baseXp: 12 + difficulty * 3,
    difficulty,
    isFree: free,
    exercises: [
      {
        id: `tp-${slug}`,
        type: "typing",
        promptUk: titleUk,
        promptEn: enTitle,
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
      titleEn: "Home row",
      lessons: [
        typingLesson("en-home-1", "EN: asdf jkl;", enHome, "en", true, 1, "EN: asdf jkl;"),
        typingLesson("en-home-2", "EN: слова home row", "a sad lad; a flask; dad asks", "en", true, 1, "EN: home-row words"),
        typingLesson("uk-home-1", "UK: фіва прол", ukHome, "uk", true, 1, "UK: home row"),
        typingLesson("uk-home-2", "UK: прості слова", "аварія пора порада лава", "uk", true, 1, "UK: simple words"),
        typingLesson("en-home-3", "EN: ритм", "asdfjkl; asdfjkl; fj fj dk dk sl sl a; a;", "en", true, 2, "EN: rhythm"),
        typingLesson("en-top-1", "EN: верхній ряд", "qwer uiop qwer uiop type write power", "en", false, 2, "EN: top row"),
        typingLesson("en-bottom-1", "EN: нижній ряд", "zxcv bnm zxcv bnm mix zinc box", "en", false, 2, "EN: bottom row"),
        typingLesson("en-words-1", "EN: часті слова", enWords, "en", false, 2, "EN: common words"),
        typingLesson("uk-words-1", "UK: часті слова", "і так але або він вона вони ми ви", "uk", false, 2, "UK: common words"),
        typingLesson("en-sentence-1", "EN: речення", "Practice makes progress every single day.", "en", false, 3, "EN: sentences"),
        typingLesson("uk-sentence-1", "UK: речення", "Щоденна практика робить друк впевненим.", "uk", false, 3, "UK: sentences"),
        typingLesson("en-para-1", "EN: абзац", "Typing speed grows when accuracy stays high. Keep wrists relaxed and eyes on the screen.", "en", false, 3, "EN: paragraph"),
        typingLesson("mixed-1", "Змішана практика EN", "The quick brown fox jumps over the lazy dog.", "en", false, 3, "EN mix practice"),
        typingLesson("numbers-1", "Цифри", "123 456 789 0 10 20  thr  thr  thr", "en", false, 3, "Numbers"),
        typingLesson("free-warmup", "Розминка", "ready set go ready set go focus flow focus flow", "en", false, 1, "Warm-up"),
        typingLesson("en-speed-1", "Швидкість 1", "time time time time time code code code ship ship", "en", false, 4, "Speed 1"),
        typingLesson("en-speed-2", "Швидкість 2", "accuracy first then speed accuracy first then speed", "en", false, 4, "Speed 2"),
        typingLesson("uk-speed-1", "UK швидкість", "швидкість точність баланс швидкість точність баланс", "uk", false, 4, "UK speed"),
        typingLesson("challenge-1", "Виклик", "Build habits that compound. Small daily wins beat rare heroics.", "en", false, 5, "Challenge"),
        typingLesson("challenge-2", "Фінальний виклик", "EduForge typing mastery requires calm hands and clear mind.", "en", false, 5, "Final challenge"),
        typingLesson("en-punct-1", "EN: пунктуація", "Hello, world! How are you? I'm fine — thanks.", "en", false, 3, "EN: punctuation"),
        typingLesson("uk-punct-1", "UK: пунктуація", "Привіт, світе! Як справи? Все добре — дякую.", "uk", false, 3, "UK: punctuation"),
        typingLesson("en-code-ish", "EN: символи", "email@site.com #tag $price 50% {code} (note)", "en", false, 4, "EN: symbols"),
        typingLesson("en-long-1", "EN: довгий текст", "Consistency beats intensity. Ten focused minutes daily build skill faster than rare long sessions without attention.", "en", false, 4, "EN: long text"),
        typingLesson("uk-long-1", "UK: довгий текст", "Регулярність важливіша за інтенсивність. Десять уважних хвилин щодня дають більший прогрес.", "uk", false, 4, "UK: long text"),
        typingLesson("en-speed-3", "Швидкість 3", "flow state focus type type type accuracy first always", "en", false, 5, "Speed 3"),
        typingLesson("mixed-2", "EN pangram 2", "Pack my box with five dozen liquor jugs.", "en", false, 4),
        typingLesson("uk-proverb", "UK прислів'я", "Без труда нема плода. Повторення — мати навчання.", "uk", false, 3, "UK proverb"),
        typingLesson("final-sprint", "Фінальний спринт", "You finished the typing path. Keep a short daily warm-up forever.", "en", false, 5, "Final sprint"),
        typingLesson("en-quotes", "EN: quotes", "Type fast, she said. But stay accurate!", "en", false, 3),
        typingLesson("uk-quotes", "UK: лапки", "«Пиши швидко, але точно», — сказав тренер.", "uk", false, 3, "UK: quotes"),
        typingLesson("en-email", "EN: email style", "Please review the pull request and leave comments before noon.", "en", false, 4),
        typingLesson("en-code-comment", "EN: code comments", "// TODO: refactor this loop. Keep names clear. Avoid magic numbers.", "en", false, 4),
        typingLesson("uk-news", "UK: новина", "Студенти щодня практикують друк і покращують точність.", "uk", false, 3, "UK: news line"),
        typingLesson("boss-sprint", "Boss sprint", "Mastery is boring reps done with attention. Breathe. Type. Review. Repeat.", "en", false, 5),
      ],
    },
    {
      slug: "daily-drills",
      titleUk: "Щоденні drills",
      titleEn: "Daily drills",
      lessons: [
        typingLesson(
          "drill-accuracy",
          "Drill: точність",
          "slow is smooth smooth is fast slow is smooth smooth is fast",
          "en",
          true,
          2,
          "Drill: accuracy",
        ),
        typingLesson(
          "drill-combo",
          "Drill: комбо EN/символи",
          "git commit -m \"fix: ship daily\" npm run test && pnpm build",
          "en",
          false,
          4,
          "Drill: EN + symbols",
        ),
        typingLesson(
          "drill-uk-flow",
          "Drill: UK flow",
          "навчання щодня маленькі кроки великий результат",
          "uk",
          false,
          3,
          "Drill: UK flow",
        ),
        typingLesson(
          "drill-sprint-60",
          "Drill: 60s sprint text",
          "Focus on the next word only. Breathe out. Keep shoulders down. Accuracy first.",
          "en",
          false,
          4,
          "Drill: 60s sprint text",
        ),
      ],
    },
  ],
};
