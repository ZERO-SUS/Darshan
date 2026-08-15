import { useEffect, useRef } from 'react';

/**
 * ripple-distortion cursor: expanding accent rings trail the pointer.
 * Canvas-based (one rAF loop), desktop-only, respects reduced-motion.
 */
export default function RippleCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf;
    let ripples = [];
    let lastSpawn = 0;

    const accent = () => {
      const v = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
      return v || '227 154 123';
    };
    let color = accent();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      color = accent();
    };
    resize();

    const onMove = (e) => {
      const now = performance.now();
      if (now - lastSpawn < 45) return; // throttle spawns
      lastSpawn = now;
      ripples.push({ x: e.clientX, y: e.clientY, r: 4, a: 0.5 });
      if (ripples.length > 24) ripples.shift();
    };

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ripples = ripples.filter((p) => p.a > 0.02);
      for (const p of ripples) {
        p.r += 1.6;
        p.a *= 0.94;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgb(${color} / ${p.a})`;
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="ripple-canvas" aria-hidden="true" />;
}
