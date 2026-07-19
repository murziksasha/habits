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
  const subject = uk
    ? `EduForge: твій тижневий звіт, ${stats.displayName}`
    : `EduForge: your weekly report, ${stats.displayName}`;
  const text = uk
    ? `Привіт, ${stats.displayName}!\n\nТвій тиждень у EduForge:\n• Уроків завершено: ${stats.lessonsCompleted}\n• XP (з уроків): ${stats.xpApprox}\n• Карток SRS: ${stats.flashcardReviews}\n• Фокус: ${stats.focusMinutes} хв\n• Серія днів: ${stats.streakDays}\n\nПродовжуй! 🔥\n— Команда EduForge`
    : `Hi ${stats.displayName}!\n\nYour EduForge week:\n• Lessons completed: ${stats.lessonsCompleted}\n• XP from lessons: ${stats.xpApprox}\n• SRS cards: ${stats.flashcardReviews}\n• Focus: ${stats.focusMinutes} min\n• Streak: ${stats.streakDays}\n\nKeep going! 🔥\n— EduForge team`;
  const html = uk
    ? `<div style="font-family:sans-serif"><h2>Тижневий звіт</h2><p>Привіт, <b>${stats.displayName}</b>!</p><ul><li>Уроків: <b>${stats.lessonsCompleted}</b></li><li>XP: <b>${stats.xpApprox}</b></li><li>SRS: <b>${stats.flashcardReviews}</b></li><li>Фокус: <b>${stats.focusMinutes}</b> хв</li><li>Серія: <b>${stats.streakDays}</b></li></ul><p>Продовжуй! 🔥</p></div>`
    : `<div style="font-family:sans-serif"><h2>Weekly report</h2><p>Hi <b>${stats.displayName}</b>!</p><ul><li>Lessons: <b>${stats.lessonsCompleted}</b></li><li>XP: <b>${stats.xpApprox}</b></li><li>SRS: <b>${stats.flashcardReviews}</b></li><li>Focus: <b>${stats.focusMinutes}</b> min</li><li>Streak: <b>${stats.streakDays}</b></li></ul><p>Keep going! 🔥</p></div>`;
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
  globalLevel: number;
}): MailPayload {
  const uk = (opts.locale ?? "uk") === "uk";
  const subject = uk
    ? `EduForge: тиждень ${opts.childName}`
    : `EduForge: ${opts.childName}'s week`;
  const text = uk
    ? `Привіт, ${opts.parentName}!\n\nТижневий огляд для ${opts.childName} (L${opts.globalLevel}):\n• Уроків: ${opts.lessonsCompleted}\n• XP: ${opts.xpApprox}\n• Серія: ${opts.streakDays} днів\n• Programming уроків: ${opts.programmingLessonsWeek}\n• Playground challenges: ${opts.playgroundSolvedWeek}\n• Домашка здана: ${opts.homeworkCompletedWeek}\n\nДеталі: /parents\n— EduForge`
    : `Hi ${opts.parentName}!\n\nWeekly overview for ${opts.childName} (L${opts.globalLevel}):\n• Lessons: ${opts.lessonsCompleted}\n• XP: ${opts.xpApprox}\n• Streak: ${opts.streakDays} days\n• Programming lessons: ${opts.programmingLessonsWeek}\n• Playground challenges: ${opts.playgroundSolvedWeek}\n• Homework completed: ${opts.homeworkCompletedWeek}\n\nDetails: /parents\n— EduForge`;
  const html = uk
    ? `<div style="font-family:sans-serif"><h2>Тиждень дитини</h2><p>Привіт, <b>${opts.parentName}</b>!</p><p>Огляд для <b>${opts.childName}</b> (рівень ${opts.globalLevel}):</p><ul><li>Уроків: <b>${opts.lessonsCompleted}</b></li><li>XP: <b>${opts.xpApprox}</b></li><li>Серія: <b>${opts.streakDays}</b></li><li>Programming: <b>${opts.programmingLessonsWeek}</b></li><li>Playground: <b>${opts.playgroundSolvedWeek}</b></li><li>Домашка: <b>${opts.homeworkCompletedWeek}</b></li></ul><p>Кабінет батьків: /parents</p></div>`
    : `<div style="font-family:sans-serif"><h2>Child's week</h2><p>Hi <b>${opts.parentName}</b>!</p><p>Overview for <b>${opts.childName}</b> (level ${opts.globalLevel}):</p><ul><li>Lessons: <b>${opts.lessonsCompleted}</b></li><li>XP: <b>${opts.xpApprox}</b></li><li>Streak: <b>${opts.streakDays}</b></li><li>Programming: <b>${opts.programmingLessonsWeek}</b></li><li>Playground: <b>${opts.playgroundSolvedWeek}</b></li><li>Homework: <b>${opts.homeworkCompletedWeek}</b></li></ul><p>Parent portal: /parents</p></div>`;
  return { to: opts.email, subject, text, html };
}
