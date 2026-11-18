import type { CourseContent, LessonContent } from "../types.js";
import { concept, lesson, mcq } from "../builders.js";
import { expandCourse } from "./factory.js";

const english = lesson("en-transfer-clarify", "Уточнення вимоги", "Clarifying a request", 3, false, [
  concept("en-transfer-clarify-c", "Уточнення перед обіцянкою", "Clarify before committing", {
    uk: "Коли запит неповний, спочатку коротко підтвердьте, що зрозуміли, потім поставте одне конкретне питання. Не обіцяйте строк або результат, поки не знаєте обсяг. Наприклад: ‘I can help with the report. Which figures should it include?’",
    en: "When a request is incomplete, briefly confirm what you understood and ask one specific question. Do not promise a deadline or an outcome before you know the scope. For example: ‘I can help with the report. Which figures should it include?’",
  }),
  mcq("en-transfer-clarify-r1", "Клієнт пише: ‘Can you send the report soon?’ Яка відповідь найкраще уточнює строк?", "A client writes: ‘Can you send the report soon?’ Which reply best clarifies the deadline?", [
    "I can send it. What time do you need it by?", "Yes, definitely in one hour.", "Soon is not a deadline.", "I will send something later."
  ], 0, { explanationUk: "Питання про конкретний час прибирає невизначеність без необґрунтованої обіцянки.", explanationEn: "Asking for a specific time removes ambiguity without an unsupported promise." }),
  mcq("en-transfer-clarify-r2", "Колега просить ‘fix the page’. Яке уточнення найкраще визначає обсяг роботи?", "A colleague asks you to ‘fix the page’. Which question best defines the scope?", [
    "Which page and what behavior is broken?", "Should I redesign the whole product?", "Is it urgent?", "Can you ask someone else?"
  ], 0, { explanationUk: "Потрібні конкретна сторінка та спостережувана проблема.", explanationEn: "You need the specific page and the observable problem." }),
  { id: "en-transfer-clarify-r3", type: "translate", promptUk: "Перекладіть ввічливе уточнення англійською: «Які саме цифри потрібні у звіті?»", promptEn: "Translate the polite clarification into English: ‘Які саме цифри потрібні у звіті?’", source: "Які саме цифри потрібні у звіті?", accepted: ["Which figures do you need in the report?", "Which exact figures do you need in the report?", "What figures do you need in the report?"], direction: "uk_en" },
]);

const chess = lesson("ch-transfer-mate-check", "Перевірка мату на дошці", "Verify a mate on the board", 3, false, [
  concept("ch-transfer-mate-check-c", "Мат — це відсутність відповіді", "Mate means no legal reply", {
    uk: "Перед тим як назвати хід матом, перевірте три можливості суперника: відійти королем, узяти атакувальну фігуру або перекрити лінію шаху. Якщо кожна неможлива, шах є матом. Не покладайтеся лише на знайомий малюнок позиції.",
    en: "Before calling a move mate, check three possible replies: move the king, capture the checking piece, or block the checking line. If none is legal, the check is mate. Do not rely on a familiar pattern alone.",
  }),
  { id: "ch-transfer-mate-check-p1", type: "chess_puzzle", promptUk: "Білі ходять. Візьміть пішака g7 ферзем і поставте мат за один хід.", promptEn: "White to move. Capture the g7 pawn with your queen and mate in one.", fen: "7k/6p1/5QK1/8/8/8/8/8 w - - 0 1", solutionSans: ["Qxg7#"], difficulty: 3 },
  { ...mcq("ch-transfer-mate-check-r1", "Після Qxg7# чому чорний король не може взяти ферзя на g7?", "After Qxg7#, why can the black king not capture the queen on g7?", ["Білий король захищає g7", "Ферзя взагалі не можна брати королем", "Чорні не можуть ходити назад", "Пішак на g7 захищає ферзя"], 0), optionsEn: ["The white king protects g7", "A king can never capture a queen", "Black cannot move backwards", "The g7 pawn protects the queen"] },
  { ...mcq("ch-transfer-mate-check-r2", "Яку перевірку треба зробити перед оголошенням мату в іншій позиції?", "What must you check before declaring mate in a different position?", ["Усі легальні відповіді на шах", "Лише силу матеріалу", "Лише назву дебюту", "Кількість зроблених ходів"], 0), optionsEn: ["All legal replies to the check", "Only the material balance", "Only the opening name", "The move number"] },
]);

const typing = lesson("tp-transfer-accuracy-stamina", "Точність на довгій дистанції", "Sustained accuracy", 4, false, [
  concept("tp-transfer-accuracy-stamina-c", "Спочатку точність", "Accuracy before speed", {
    uk: "У довгому тексті тримайте рівний темп. Після помилки відновіть точність, а вже потім прискорюйтеся. Цей урок перевіряє два різні набори символів: англійський робочий текст і українське повідомлення.",
    en: "Keep a steady pace through a longer passage. After a mistake, regain accuracy before increasing speed. This lesson checks two different character sets: English work prose and a Ukrainian message.",
  }),
  { id: "tp-transfer-accuracy-stamina-en", type: "typing", promptUk: "Наберіть англійське робоче повідомлення уважно.", promptEn: "Type the English work message accurately.", text: "Please review the draft before Thursday. Check the dates, confirm the owner of each task, and send one clear question if anything is missing.", layout: "en", targetWpm: 45 },
  { id: "tp-transfer-accuracy-stamina-uk", type: "typing", promptUk: "Наберіть українське повідомлення уважно.", promptEn: "Type the Ukrainian message accurately.", text: "Перевірте дати у звіті, уточніть відповідальних за завдання й напишіть одне чітке запитання, якщо бракує даних.", layout: "uk", targetWpm: 40 },
  { id: "tp-transfer-accuracy-stamina-symbols", type: "typing", promptUk: "Збережіть точність на датах, дужках і символах.", promptEn: "Keep accuracy through dates, brackets, and symbols.", text: "Release (v2.4) on 17/11; check #482, email qa@example.com, and record 3/3 passing cases.", layout: "en", targetWpm: 40 },
]);

const readingPassageUk = "Команда планувала випустити оновлення в четвер. У вівторок тест показав, що нова форма не працює без мережі. Керівниця перенесла випуск на понеділок і попросила команду повторити перевірку в п’ятницю. У повідомленні не сказано, що помилку вже виправили.";
const readingPassageEn = "The team planned to release an update on Thursday. On Tuesday, a test showed that the new form did not work offline. The lead moved the release to Monday and asked the team to repeat the check on Friday. The message does not say that the bug has already been fixed.";
const reading = lesson("sr-transfer-release-note", "Факти та припущення", "Facts and assumptions", 3, false, [
  concept("sr-transfer-release-note-c", "Що текст стверджує?", "What does the text actually say?", {
    uk: "Читаючи швидко, відокремлюйте явний факт від правдоподібного припущення. Після кожного абзацу запитайте: яка дата, причина й наступна дія прямо названі? Якщо результат перевірки ще невідомий, не домислюйте його.",
    en: "When reading quickly, separate stated facts from plausible assumptions. After each paragraph, ask which date, reason, and next action are explicitly named. If a check result is unknown, do not invent it.",
  }),
  { id: "sr-transfer-release-note-r1", type: "comprehension", promptUk: "Прочитайте повідомлення і дайте відповіді за текстом.", promptEn: "Read the message and answer using only the text.", passage: readingPassageUk, passageEn: readingPassageEn, questions: [
    { q: "Коли тепер заплановано випуск?", qEn: "When is the release now planned?", options: ["У понеділок", "У четвер", "У п’ятницю"], optionsEn: ["Monday", "Thursday", "Friday"], correctIndex: 0 },
    { q: "Чому змінили дату?", qEn: "Why was the date changed?", options: ["Форма не працювала без мережі", "Зникли всі дані", "Керівниця була у відпустці"], optionsEn: ["The form did not work offline", "All data was lost", "The lead was on leave"], correctIndex: 0 },
    { q: "Чи стверджує текст, що помилку виправлено?", qEn: "Does the text say the bug is fixed?", options: ["Ні, результат ще невідомий", "Так, у вівторок", "Так, у четвер"], optionsEn: ["No, the result is still unknown", "Yes, on Tuesday", "Yes, on Thursday"], correctIndex: 0 },
  ] },
  { id: "sr-transfer-release-note-r3", type: "comprehension", promptUk: "Застосуйте ту саму перевірку до іншого повідомлення.", promptEn: "Apply the same check to a different message.", passage: "У середу команда отримала три скарги на повільне завантаження. Інженерка запланувала вимірювання на четвер. Причину затримки ще не встановлено.", passageEn: "On Wednesday the team received three reports of slow loading. An engineer scheduled measurements for Thursday. The cause of the delay has not yet been established.", questions: [
    { q: "Що вже відбулося?", qEn: "What has already happened?", options: ["Надійшли три скарги", "Причину знайдено", "Вимірювання завершено"], optionsEn: ["Three reports arrived", "The cause was found", "Measurements finished"], correctIndex: 0 },
    { q: "Який висновок передчасний?", qEn: "Which conclusion is premature?", options: ["Причина — мережа", "Вимірювання заплановано", "Скарги надійшли в середу"], optionsEn: ["The network is the cause", "Measurements are scheduled", "The reports arrived on Wednesday"], correctIndex: 0 },
  ] },
  { ...mcq("sr-transfer-release-note-r2", "Яке твердження було б необґрунтованим висновком із повідомлення?", "Which statement would be an unsupported inference from the message?", ["Помилку вже виправили", "Перевірку повторять у п’ятницю", "Випуск перенесли на понеділок"], 0), optionsEn: ["The bug has already been fixed", "The check will be repeated on Friday", "The release moved to Monday"] },
]);

const logic = lesson("lg-transfer-counterexample", "Контрприклад до правила", "Find a counterexample", 3, false, [
  concept("lg-transfer-counterexample-c", "Одного прикладу досить", "One counterexample is enough", {
    uk: "Універсальне твердження «усі X мають Y» спростовує один коректний X без Y. Приклад, який підтверджує правило, не доводить його для всіх. Спочатку уточніть множину, потім шукайте крайній випадок.",
    en: "A universal claim ‘all X have Y’ is refuted by one valid X without Y. A confirming example does not prove the rule for every case. First define the set, then look for a boundary case.",
  }),
  { id: "lg-transfer-counterexample-r1", type: "logic_puzzle", promptUk: "Твердження: «Усі парні числа більші за нуль». Яке число є контрприкладом?", promptEn: "Claim: ‘All even numbers are greater than zero.’ Which number is a counterexample?", category: "counterexample", difficulty: 2, options: ["0", "2", "4", "8"], correctIndex: 0 },
  { id: "lg-transfer-counterexample-r2", type: "logic_puzzle", promptUk: "Твердження: «Кожне слово з літерою а має три склади». Який приклад спростовує його?", promptEn: "Claim: ‘Every Ukrainian word containing а has three syllables.’ Which example refutes it?", category: "counterexample", difficulty: 2, options: ["мак (один склад)", "банани (три склади)", "караван (три склади)"], optionsEn: ["мак (one syllable)", "банани (three syllables)", "караван (three syllables)"], correctIndex: 0 },
  { id: "lg-transfer-counterexample-r3", type: "logic_puzzle", promptUk: "Виберіть найбезпечніший висновок із одного контрприкладу.", promptEn: "Choose the sound conclusion from a single counterexample.", category: "counterexample", difficulty: 3, options: ["Універсальне твердження хибне", "Усі інші випадки теж хибні", "Твердження істинне в середньому", "Контрприклад нічого не змінює"], optionsEn: ["The universal claim is false", "Every other case is false too", "The claim is true on average", "The counterexample changes nothing"], correctIndex: 0 },
]);

const INSERTIONS: Record<string, { unitSlug: string; lessons: LessonContent[] }> = {
  english: { unitSlug: "en-deep-business-it", lessons: [english] },
  chess: { unitSlug: "ch-deep-tournament", lessons: [chess] },
  typing: { unitSlug: "en-prose-engineering", lessons: [typing] },
  speed_reading: { unitSlug: "recall-notes", lessons: [reading] },
  logic: { unitSlug: "necessary-sufficient", lessons: [logic] },
};

export function expandFoundationTransfer(course: CourseContent): CourseContent {
  const insertion = INSERTIONS[course.slug];
  return insertion ? expandCourse(course, { [insertion.unitSlug]: insertion.lessons }) : course;
}
