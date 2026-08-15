import { useEffect } from 'react';

/**
 * Mobile / touch interaction layer — active on coarse-pointer devices only
 * (phones, tablets). Desktop keeps its own custom cursor + SoundFx and this
 * component stays completely inert there.
 *
 * On every touch it gives the user three kinds of feedback at once:
 *  - a Material-style ripple at the exact touch point, anywhere on the page
 *  - a soft synthesised blip (brighter/louder on interactive elements)
 *  - a short haptic buzz via navigator.vibrate
 * and a quick press-scale on tapped buttons/links (the `.tapping` class), so
 * holding a control feels physical instead of a flat one-shot tap.
 */
export default function TouchFx() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: coarse)').matches) return;

    // --- Web Audio (created lazily inside the first touch gesture so iOS/Android
    //     autoplay policies are satisfied) ---
    let ctx = null;
    let master = null;
    const ensureCtx = () => {
      if (!ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return null;
        ctx = new AC();
        master = ctx.createGain();
        master.gain.value = 1;          // loud master bus
        master.connect(ctx.destination);
        // Mobile unlock: play a 1-sample silent buffer inside the gesture so the
        // very first real blip is audible (iOS/Android otherwise stay muted).
        try {
          const buf = ctx.createBuffer(1, 1, 22050);
          const src = ctx.createBufferSource();
          src.buffer = buf;
          src.connect(ctx.destination);
          src.start(0);
        } catch { /* ignore */ }
      }
      if (ctx.state !== 'running') ctx.resume();
      return ctx;
    };
    const blip = (f0, f1, peak, dur) => {
      const c = ensureCtx();
      if (!c) return;
      const t = c.currentTime + 0.001;
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = 'triangle';            // richer harmonics = much louder than sine
      osc.frequency.setValueAtTime(f0, t);
      osc.frequency.exponentialRampToValueAtTime(f1, t + dur * 0.7);
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(peak, t + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      osc.connect(gain).connect(master);
      osc.start(t);
      osc.stop(t + dur + 0.03);
    };

    const INTERACTIVE =
      'a, button, [role="button"], input, textarea, select, label, .tag, [data-cursor="hover"]';
    const vibrate = (ms) => { try { navigator.vibrate?.(ms); } catch { /* unsupported */ } };

    const spawnRipple = (x, y, big) => {
      const r = document.createElement('span');
      r.className = 'touch-ripple';
      const size = big ? 92 : 58;
      r.style.left = `${x}px`;
      r.style.top = `${y}px`;
      r.style.width = `${size}px`;
      r.style.height = `${size}px`;
      document.body.appendChild(r);
      r.addEventListener('animationend', () => r.remove(), { once: true });
      // Safety net in case animationend never fires.
      setTimeout(() => r.remove(), 800);
    };

    let pressed = null;
    const onDown = (e) => {
      if (e.pointerType === 'mouse') return; // touch / pen only
      const el = e.target.closest?.(INTERACTIVE);
      spawnRipple(e.clientX, e.clientY, !!el);
      if (el) {
        blip(600, 880, 0.5, 0.08);   // loud crisp tick on a control
        vibrate(16);
        el.classList.add('tapping');
        pressed = el;
      } else {
        blip(300, 200, 0.42, 0.07);  // clear tap anywhere (empty space)
        vibrate(9);
      }
    };
    const release = () => {
      if (pressed) { pressed.classList.remove('tapping'); pressed = null; }
    };

    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', release, { passive: true });
    window.addEventListener('pointercancel', release, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', release);
      window.removeEventListener('pointercancel', release);
      release();
      if (ctx) ctx.close();
    };
  }, []);

  return null;
}
