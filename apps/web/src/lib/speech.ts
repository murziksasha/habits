/** Web Speech helpers for pronunciation practice */

export function speakText(
  text: string,
  opts?: { lang?: string; rate?: number; pitch?: number },
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      reject(new Error("speech_unsupported"));
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = opts?.lang ?? "en-US";
    u.rate = opts?.rate ?? 0.9;
    u.pitch = opts?.pitch ?? 1;
    u.onend = () => resolve();
    u.onerror = () => reject(new Error("speak_failed"));
    window.speechSynthesis.speak(u);
  });
}

export type ListenResult = { transcript: string; confidence: number };

/** Browser speech recognition (Chrome / Edge). */
export function listenOnce(lang = "en-US", timeoutMs = 8000): Promise<ListenResult> {
  return new Promise((resolve, reject) => {
    const SR =
      (window as unknown as { SpeechRecognition?: new () => SpeechRecognition }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognition })
        .webkitSpeechRecognition;
    if (!SR) {
      reject(new Error("recognition_unsupported"));
      return;
    }
    const rec = new SR();
    rec.lang = lang;
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    const timer = window.setTimeout(() => {
      try {
        rec.stop();
      } catch {
        /* */
      }
      reject(new Error("timeout"));
    }, timeoutMs);
    rec.onresult = (ev: SpeechRecognitionEvent) => {
      window.clearTimeout(timer);
      const r = ev.results[0]?.[0];
      resolve({
        transcript: r?.transcript ?? "",
        confidence: r?.confidence ?? 0,
      });
    };
    rec.onerror = () => {
      window.clearTimeout(timer);
      reject(new Error("recognition_error"));
    };
    rec.start();
  });
}

// Minimal DOM typings used above
interface SpeechRecognition {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  onresult: ((ev: SpeechRecognitionEvent) => void) | null;
  onerror: ((ev: Event) => void) | null;
}
interface SpeechRecognitionEvent {
  results: { [i: number]: { [j: number]: { transcript: string; confidence: number } } };
}
