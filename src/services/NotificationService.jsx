
class NotificationService {
  constructor() {
    this.permission = null;
    this.activeAlarms = new Map();
    this.checkInterval = null;
  }

  async requestPermission() {
    if (!("Notification" in window)) throw new Error("Este navegador no soporta notificaciones");
    this.permission = await Notification.requestPermission();
    return this.permission === "granted";
  }

  showBrowserNotification(title, options = {}) {
    if (this.permission !== "granted") return null;
    const n = new Notification(title, {
      icon: "/favicon.ico",
      badge: "/favicon.ico",
      requireInteraction: true,
      ...options,
    });
    setTimeout(() => n.close(), 10000);
    return n;
  }

  playAlarmSound(repeat = 1, gapMs = 300) {
    const playOnce = () => {
      try {
        const audio = new Audio("/beep4.wav");
        audio.play().catch(() => this.playSystemBeep());
      } catch {
        this.playSystemBeep();
      }
    };
    for (let i = 0; i < repeat; i++) {
      setTimeout(playOnce, i * gapMs);
    }
  }

  playSystemBeep() {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      const ctx = new Ctx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = 880;
      gain.gain.value = 0.15;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch {}
  }

  speakReminder(text) {
    if (!("speechSynthesis" in window)) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "es-ES";
    window.speechSynthesis.speak(utter);
  }

  startMedicationChecker(medications) {
    this.clearAllAlarms();
    this.checkInterval = setInterval(() => {
      const nowHM = new Date().toTimeString().slice(0, 5);
      medications.forEach((m) => {
        if (!m?.nextIntakeTime || m?.taken) return;
        const key = `${m.id}-${m.nextIntakeTime}`;
        if (m.nextIntakeTime === nowHM && !this.activeAlarms.has(key)) {
          this.activeAlarms.set(key, true);
          this.showBrowserNotification("Recordatorio de medicación", {
            body: `${m.drugName} ${m.dosage ?? ""} · ${m.nextIntakeTime}`,
          });
          this.playAlarmSound(1);
          this.speakReminder(`Es hora de tomar ${m.drugName}`);
        }
      });
    }, 30000);
  }

  clearAllAlarms() {
    this.activeAlarms.clear();
    if (this.checkInterval) clearInterval(this.checkInterval);
    this.checkInterval = null;
  }
}

export const notificationService = new NotificationService();
