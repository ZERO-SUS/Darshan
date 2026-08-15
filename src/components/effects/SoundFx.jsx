import { useEffect } from 'react';

/**
 * Subtle UI sound: a soft tick when the pointer moves onto a new interactive
 * element, and a slightly lower click on press. Uses the Web Audio API
 * (synthesised — no asset files). The AudioContext is created on the first
 * user gesture to satisfy autoplay policies.
 */
export default function SoundFx() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let ctx = null;
    let last = null;
    let lastTime = 0;

    const ensureCtx = () => {
      if (!ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (AC) ctx = new AC();
      }
      if (ctx && ctx.state === 'suspended') ctx.resume();
      return ctx;
    };

    const blip = (freqStart, freqEnd, peak, dur) => {
      const c = ensureCtx();
      if (!c) return;
      const t = c.currentTime;
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freqStart, t);
      osc.frequency.exponentialRampToValueAtTime(freqEnd, t + dur * 0.6);
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(peak, t + 0.006);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      osc.connect(gain).connect(c.destination);
      osc.start(t);
      osc.stop(t + dur + 0.02);
    };

    const interactive = 'a, button, [role="button"], input, textarea, select, label, .spotlight, [data-cursor="hover"], [data-sound]';

    let lastMove = 0;
    const onMove = (e) => {
      if (!e.target.closest?.('[data-sound="move"]')) return;
      const now = performance.now();
      if (now - lastMove < 110) return; // throttle the "swish" over the image
      lastMove = now;
      blip(200, 130, 0.07, 0.07); // soft low swish (louder)
    };

    const onOver = (e) => {
      const el = e.target.closest?.(interactive);
      if (!el || el === last) return;
      const now = performance.now();
      if (now - lastTime < 40) { last = el; return; } // debounce rapid moves
      last = el;
      lastTime = now;
      blip(620, 900, 0.1, 0.07); // hover tick (louder)
    };
    const onOut = (e) => {
      if (e.target.closest?.(interactive) && !e.relatedTarget?.closest?.(interactive)) last = null;
    };
    const onDown = (e) => {
      if (e.target.closest?.(interactive)) blip(320, 220, 0.14, 0.09); // click (louder)
    };

    // first-gesture unlock
    const unlock = () => ensureCtx();
    window.addEventListener('pointerdown', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });

    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mousemove', onMove);
      if (ctx) ctx.close();
    };
  }, []);

  return null;
}
