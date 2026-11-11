/**
 * Procedural Web Audio synthesizer for Swarm Cursors
 * Inspired by Califa's pentatonic notes & Dhvanil Patel's sound synthesis
 */

class SwarmAudio {
  private ctx: AudioContext | null = null;
  private enabled: boolean = false;
  private lastPlayTime: number = 0;

  // E major pentatonic frequencies (E4, F#4, G#4, B4, C#5, E5, F#5, G#5)
  private pentatonicScale = [329.63, 369.99, 415.3, 493.88, 554.37, 659.25, 739.99, 830.61];

  public init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  public setEnabled(val: boolean) {
    this.enabled = val;
    if (val) {
      this.init();
      this.playChime();
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public playInspectSound(panX: number = 0.5) {
    if (!this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    if (now - this.lastPlayTime < 0.12) return; // rate limit
    this.lastPlayTime = now;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;

      // Select random pentatonic note
      const noteIndex = Math.floor(Math.random() * this.pentatonicScale.length);
      const freq = this.pentatonicScale[noteIndex];

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);

      // Soft envelope
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.02, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      if (panner) {
        // pan between -0.8 (left) to 0.8 (right)
        panner.pan.value = Math.max(-0.8, Math.min(0.8, (panX - 0.5) * 1.6));
        osc.connect(gain);
        gain.connect(panner);
        panner.connect(this.ctx.destination);
      } else {
        osc.connect(gain);
        gain.connect(this.ctx.destination);
      }

      osc.start(now);
      osc.stop(now + 0.36);
    } catch {
      // AudioContext policy catch
    }
  }

  public playClickSound() {
    if (!this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(1400 + Math.random() * 400, now);

      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // AudioContext policy catch
    }
  }

  public playChime() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [523.25, 659.25, 783.99].forEach((freq, idx) => {
      try {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.0001, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.025, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.4);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.42);
      } catch {
        // Ignored
      }
    });
  }
}

export const swarmAudio = new SwarmAudio();
