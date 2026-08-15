import { useEffect, useRef } from 'react';

/**
 * DotScatter — OriginKit "dot-scatter" text effect.
 *
 * The word is rasterised into a grid of dots. The cursor acts as a repulsion
 * field: dots inside the radius are pushed outward (scatter) with `force`, then
 * spring back to their home positions with damping once the cursor leaves.
 * Rendered on a canvas sized exactly to the text, so it drops into layout like
 * a normal inline element and stays aligned.
 */
export default function DotScatter({
  text,
  className = '',
  color, // dot color; defaults to the canvas's computed currentColor
  fontSize = 30,
  fontWeight = 800,
  fontFamily = "'Syne', system-ui, sans-serif",
  gap = 4, // sampling step in px (lower = denser dots)
  dot = 1.7, // dot radius in px
  radius = 55, // cursor influence radius
  force = 34, // scatter strength
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === 'undefined') return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    const readColor = () => color || getComputedStyle(canvas).color || '#181210';

    // 1) Size the canvas to the measured text box.
    ctx.font = font;
    const pad = Math.ceil(fontSize * 0.14);
    const cssW = Math.ceil(ctx.measureText(text).width) + pad * 2;
    const cssH = Math.ceil(fontSize * 1.32);
    canvas.width = cssW * dpr;
    canvas.height = cssH * dpr;
    canvas.style.width = cssW + 'px';
    canvas.style.height = cssH + 'px';

    // 2) Rasterise offscreen and sample opaque pixels into dots.
    const off = document.createElement('canvas');
    off.width = canvas.width;
    off.height = canvas.height;
    const octx = off.getContext('2d');
    octx.scale(dpr, dpr);
    octx.fillStyle = '#fff';
    octx.textBaseline = 'middle';
    octx.font = font;
    octx.fillText(text, pad, cssH / 2);
    const data = octx.getImageData(0, 0, off.width, off.height).data;

    const step = Math.max(2, Math.round(gap * dpr));
    const dots = [];
    for (let y = 0; y < off.height; y += step) {
      for (let x = 0; x < off.width; x += step) {
        if (data[(y * off.width + x) * 4 + 3] > 130) {
          const hx = x / dpr;
          const hy = y / dpr;
          dots.push({ hx, hy, x: hx, y: hy, vx: 0, vy: 0 });
        }
      }
    }

    const pointer = { x: -9999, y: -9999, on: false };
    let raf = 0;
    let running = false;

    const paint = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.fillStyle = readColor();
      let moving = false;
      for (const d of dots) {
        if (pointer.on) {
          const dx = d.x - pointer.x;
          const dy = d.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < radius && dist > 0.01) {
            const f = (1 - dist / radius) * force;
            d.vx += (dx / dist) * f * 0.08;
            d.vy += (dy / dist) * f * 0.08;
          }
        }
        d.vx += (d.hx - d.x) * 0.08; // spring home
        d.vy += (d.hy - d.y) * 0.08;
        d.vx *= 0.82; // damping
        d.vy *= 0.82;
        d.x += d.vx;
        d.y += d.vy;
        if (Math.abs(d.vx) + Math.abs(d.vy) > 0.05 ||
            Math.abs(d.x - d.hx) + Math.abs(d.y - d.hy) > 0.05) moving = true;
        ctx.beginPath();
        ctx.arc(d.x, d.y, dot, 0, Math.PI * 2);
        ctx.fill();
      }
      if (moving || pointer.on) raf = requestAnimationFrame(paint);
      else running = false;
    };

    const start = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(paint);
      }
    };

    // Static first paint (dots at home).
    paint();

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.on = true;
      start();
    };
    const onLeave = () => {
      pointer.on = false;
      start();
    };
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerdown', onMove); // tap scatters on touch
    canvas.addEventListener('pointerleave', onLeave);
    canvas.addEventListener('pointerup', onLeave);
    canvas.addEventListener('pointercancel', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerdown', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
      canvas.removeEventListener('pointerup', onLeave);
      canvas.removeEventListener('pointercancel', onLeave);
    };
  }, [text, color, fontSize, fontWeight, fontFamily, gap, dot, radius, force]);

  return <canvas ref={canvasRef} role="img" aria-label={text} className={`dot-scatter ${className}`} />;
}
