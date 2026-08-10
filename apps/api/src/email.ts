import nodemailer from "nodemailer";

export type MailPayload = {
  to: string;
  subject: string;
  text: string;
  html?: string;
};

function smtpConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_FROM);
}

export function webOrigin(): string {
  return (process.env.WEB_ORIGIN ?? "http://localhost:3000").replace(/\/$/, "");
}

export async function sendMail(payload: MailPayload): Promise<{ sent: boolean; dev?: boolean }> {
  if (!smtpConfigured()) {
    console.log("[email:dev]", payload.to, payload.subject, "\n", payload.text);
    return { sent: false, dev: true };
  }

  const port = Number(process.env.SMTP_PORT ?? 587);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    auth:
      process.env.SMTP_USER
        ? {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS ?? "",
          }
        : undefined,
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: payload.to,
    subject: payload.subject,
    text: payload.text,
    html: payload.html ?? `<pre>${payload.text}</pre>`,
  });
  return { sent: true };
}

function ctaButton(href: string, label: string) {
  return `<p style="margin:20px 0"><a href="${href}" style="display:inline-block;background:#58CC02;color:#fff;font-weight:700;text-decoration:none;padding:12px 20px;border-radius:12px">${label}</a></p>`;
}

export function emailVerifyEmail(opts: {
  to: string;
  verifyUrl: string;
  locale?: string;
}): MailPayload {
  const uk = (opts.locale ?? "uk") === "uk";
  return {
    to: opts.to,
    subject: uk ? "Підтвердіть email — EduForge" : "Confirm your email — EduForge",
    text: uk
      ? `Вітаємо!\n\nПідтвердіть email за посиланням (дійсне 48 годин):\n${opts.verifyUrl}\n`
      : `Hello!\n\nConfirm your email (valid 48 hours):\n${opts.verifyUrl}\n`,
    html: uk
      ? `<p>Вітаємо!</p>${ctaButton(opts.verifyUrl, "Підтвердити email")}<p>Посилання дійсне 48 годин.</p>`
      : `<p>Hello!</p>${ctaButton(opts.verifyUrl, "Confirm email")}<p>Link valid 48 hours.</p>`,
  };
}

export function passwordResetEmail(opts: {
  to: string;
  resetUrl: string;
  locale?: string;
}): MailPayload {
  const uk = (opts.locale ?? "uk") === "uk";
  return {
    to: opts.to,
    subject: uk ? "Скидання пароля EduForge" : "EduForge password reset",
    text: uk
      ? `Вітаємо!\n\nПерейдіть за посиланням, щоб скинути пароль (дійсне 1 годину):\n${opts.resetUrl}\n\nЯкщо ви не запитували скидання — ігноруйте цей лист.`
      : `Hello!\n\nUse this link to reset your password (valid 1 hour):\n${opts.resetUrl}\n\nIf you did not request this, ignore this email.`,
    html: uk
      ? `<p>Вітаємо!</p><p><a href="${opts.resetUrl}">Скинути пароль</a></p><p>Посилання дійсне 1 годину.</p>`
      : `<p>Hello!</p><p><a href="${opts.resetUrl}">Reset password</a></p><p>Link valid for 1 hour.</p>`,
  };
}

export function weeklyReportEmail(stats: {
  email: string;
  displayName: string;
  locale?: string;
  lessonsCompleted: number;
  xpApprox: number;
  flashcardReviews: number;
  focusMinutes: number;
  streakDays: number;
}): MailPayload {
  const uk = (stats.locale ?? "uk") === "uk";
  const origin = webOrigin();
  const learnUrl = `${origin}/learn`;
  const inactive = stats.lessonsCompleted === 0 && stats.xpApprox === 0;
  const subject = uk
    ? inactive
      ? `EduForge: ми сумуємо, ${stats.displayName}`
      : `EduForge: твій тижневий звіт, ${stats.displayName}`
    : inactive
      ? `EduForge: we miss you, ${stats.displayName}`
      : `EduForge: your weekly report, ${stats.displayName}`;

  const nudgeUk = inactive
    ? `\nСхоже, цього тижня було тихо. 5–10 хвилин на карті навчання — і серія знову з вами.\nВідкрити: ${learnUrl}\n`
    : `\nПродовжити: ${learnUrl}\n`;
  const nudgeEn = inactive
    ? `\nLooks like a quiet week. 5–10 minutes on the learning map keeps your streak alive.\nOpen: ${learnUrl}\n`
    : `\nContinue: ${learnUrl}\n`;

  const text = uk
    ? `Привіт, ${stats.displayName}!\n\nТвій тиждень у EduForge:\n• Уроків завершено: ${stats.lessonsCompleted}\n• XP (з уроків): ${stats.xpApprox}\n• Карток SRS: ${stats.flashcardReviews}\n• Фокус: ${stats.focusMinutes} хв\n• Серія днів: ${stats.streakDays}\n${nudgeUk}\n— Команда EduForge`
    : `Hi ${stats.displayName}!\n\nYour EduForge week:\n• Lessons completed: ${stats.lessonsCompleted}\n• XP from lessons: ${stats.xpApprox}\n• SRS cards: ${stats.flashcardReviews}\n• Focus: ${stats.focusMinutes} min\n• Streak: ${stats.streakDays}\n${nudgeEn}\n— EduForge team`;

  const cta = ctaButton(
    learnUrl,
    uk ? (inactive ? "Повернутися до навчання" : "Продовжити навчання") : inactive ? "Back to learning" : "Continue learning",
  );
  const html = uk
    ? `<div style="font-family:system-ui,sans-serif;max-width:520px"><h2 style="color:#1a1a1a">Тижневий звіт</h2><p>Привіт, <b>${stats.displayName}</b>!</p><ul><li>Уроків: <b>${stats.lessonsCompleted}</b></li><li>XP: <b>${stats.xpApprox}</b></li><li>SRS: <b>${stats.flashcardReviews}</b></li><li>Фокус: <b>${stats.focusMinutes}</b> хв</li><li>Серія: <b>${stats.streakDays}</b></li></ul>${inactive ? `<p>Тихий тиждень — навіть один урок відновлює серію 🔥</p>` : `<p>Гарний темп — так тримати! 🔥</p>`}${cta}<p style="color:#666;font-size:12px">EduForge</p></div>`
    : `<div style="font-family:system-ui,sans-serif;max-width:520px"><h2 style="color:#1a1a1a">Weekly report</h2><p>Hi <b>${stats.displayName}</b>!</p><ul><li>Lessons: <b>${stats.lessonsCompleted}</b></li><li>XP: <b>${stats.xpApprox}</b></li><li>SRS: <b>${stats.flashcardReviews}</b></li><li>Focus: <b>${stats.focusMinutes}</b> min</li><li>Streak: <b>${stats.streakDays}</b></li></ul>${inactive ? `<p>Quiet week — even one lesson protects your streak 🔥</p>` : `<p>Great pace — keep it up! 🔥</p>`}${cta}<p style="color:#666;font-size:12px">EduForge</p></div>`;

  return { to: stats.email, subject, text, html };
}

/** Parent-facing weekly digest about a linked child */
export function parentChildDigestEmail(opts: {
  email: string;
  parentName: string;
  childName: string;
  locale?: string;
  lessonsCompleted: number;
  xpApprox: number;
  streakDays: number;
  programmingLessonsWeek: number;
  playgroundSolvedWeek: number;
  homeworkCompletedWeek: number;
  examsPassedWeek?: number;
  globalLevel: number;
  /** When true: soft check-in for quiet weeks */
  inactive?: boolean;
}): MailPayload {
  const uk = (opts.locale ?? "uk") === "uk";
  const origin = webOrigin();
  const parentsUrl = `${origin}/parents`;
  const exams = opts.examsPassedWeek ?? 0;
  const inactive =
    opts.inactive ??
    (opts.lessonsCompleted === 0 &&
      opts.xpApprox === 0 &&
      opts.programmingLessonsWeek === 0 &&
      opts.playgroundSolvedWeek === 0 &&
      opts.homeworkCompletedWeek === 0 &&
      exams === 0);

  const subject = uk
    ? inactive
      ? `EduForge: ${opts.childName} — тихий тиждень`
      : `EduForge: тиждень ${opts.childName}`
    : inactive
      ? `EduForge: ${opts.childName} — quiet week`
      : `EduForge: ${opts.childName}'s week`;

  const actionUk = inactive
    ? `Запропонуйте 1 урок на карті навчання або перевірте домашку.`
    : `Подивіться деталі та домашку в кабінеті батьків.`;
  const actionEn = inactive
    ? `Suggest one lesson on the learning map or check homework.`
    : `See details and homework in the parent portal.`;

  const text = uk
    ? `Привіт, ${opts.parentName}!\n\nТижневий огляд для ${opts.childName} (L${opts.globalLevel}):\n• Уроків: ${opts.lessonsCompleted}\n• XP: ${opts.xpApprox}\n• Серія: ${opts.streakDays} днів\n• Programming: ${opts.programmingLessonsWeek}\n• Playground: ${opts.playgroundSolvedWeek}\n• Домашка: ${opts.homeworkCompletedWeek}\n• Контрольні: ${exams}\n\n${actionUk}\nКабінет: ${parentsUrl}\n— EduForge`
    : `Hi ${opts.parentName}!\n\nWeekly overview for ${opts.childName} (L${opts.globalLevel}):\n• Lessons: ${opts.lessonsCompleted}\n• XP: ${opts.xpApprox}\n• Streak: ${opts.streakDays} days\n• Programming: ${opts.programmingLessonsWeek}\n• Playground: ${opts.playgroundSolvedWeek}\n• Homework: ${opts.homeworkCompletedWeek}\n• Exams passed: ${exams}\n\n${actionEn}\nPortal: ${parentsUrl}\n— EduForge`;

  const cta = ctaButton(parentsUrl, uk ? "Відкрити кабінет батьків" : "Open parent portal");
  const html = uk
    ? `<div style="font-family:system-ui,sans-serif;max-width:520px"><h2 style="color:#1a1a1a">${inactive ? "Тихий тиждень" : "Тиждень дитини"}</h2><p>Привіт, <b>${opts.parentName}</b>!</p><p>Огляд для <b>${opts.childName}</b> (рівень ${opts.globalLevel}):</p><ul><li>Уроків: <b>${opts.lessonsCompleted}</b></li><li>XP: <b>${opts.xpApprox}</b></li><li>Серія: <b>${opts.streakDays}</b></li><li>Programming: <b>${opts.programmingLessonsWeek}</b></li><li>Playground: <b>${opts.playgroundSolvedWeek}</b></li><li>Домашка: <b>${opts.homeworkCompletedWeek}</b></li><li>Контрольні: <b>${exams}</b></li></ul><p>${actionUk}</p>${cta}<p style="color:#666;font-size:12px">EduForge</p></div>`
    : `<div style="font-family:system-ui,sans-serif;max-width:520px"><h2 style="color:#1a1a1a">${inactive ? "Quiet week" : "Child's week"}</h2><p>Hi <b>${opts.parentName}</b>!</p><p>Overview for <b>${opts.childName}</b> (level ${opts.globalLevel}):</p><ul><li>Lessons: <b>${opts.lessonsCompleted}</b></li><li>XP: <b>${opts.xpApprox}</b></li><li>Streak: <b>${opts.streakDays}</b></li><li>Programming: <b>${opts.programmingLessonsWeek}</b></li><li>Playground: <b>${opts.playgroundSolvedWeek}</b></li><li>Homework: <b>${opts.homeworkCompletedWeek}</b></li><li>Exams: <b>${exams}</b></li></ul><p>${actionEn}</p>${cta}<p style="color:#666;font-size:12px">EduForge</p></div>`;

  return { to: opts.email, subject, text, html };
}
