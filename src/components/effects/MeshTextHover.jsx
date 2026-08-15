import { useEffect, useRef } from 'react';

/**
 * MeshTextHover — OriginKit "meshtexthover" logic.
 *
 * The text is split into per-character cells that form a mesh. The cursor acts
 * as a repulsion field: every glyph inside the influence radius is pushed away
 * from the pointer with a strength that falls off with distance, scaled by
 * `force`. When the pointer leaves, each glyph springs back to its home cell.
 * The result is solid, crisp text (no rasterising/dots) that stays perfectly
 * aligned because the layout is real inline text — we only animate transforms.
 *
 * Accessibility: the wrapper carries the full string as aria-label and the
 * per-character spans are aria-hidden, so screen readers/SEO see clean text.
 */
export default function MeshTextHover({
  as: Tag = 'span',
  children,
  text,
  className = '',
  force = 36, // peak displacement in px at the pointer
}) {
  const rootRef = useRef(null);

  // Resolve the string to render from `text` or string children.
  const label =
    typeof text === 'string'
      ? text
      : typeof children === 'string'
        ? children
        : Array.isArray(children)
          ? children.join('')
          : '';

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === 'undefined') return;

    const chars = Array.from(root.querySelectorAll('[data-mesh-char]'));
    if (!chars.length) return;

    // Respect users who prefer reduced motion — keep text static.
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const EASE = 0.16; // spring stiffness toward the target
    const homes = new Array(chars.length); // { cx, cy } centre relative to root
    const state = chars.map(() => ({ x: 0, y: 0 })); // current offset
    const pointer = { x: 0, y: 0, inside: false };

    let radius = 140; // influence radius (px), re-derived from font size
    let raf = 0;
    let running = false;

    // Cache each glyph's home centre relative to the root box. Transforms are
    // cleared first so offsetLeft/Top report the untranslated layout position.
    function measure() {
      const cs = getComputedStyle(root);
      const fontSize = parseFloat(cs.fontSize) || 48;
      radius = Math.max(90, fontSize * 1.7);
      for (let i = 0; i < chars.length; i++) {
        const c = chars[i];
        c.style.transform = '';
        homes[i] = {
          cx: c.offsetLeft + c.offsetWidth / 2,
          cy: c.offsetTop + c.offsetHeight / 2,
        };
      }
    }

    function tick() {
      let moving = false;
      for (let i = 0; i < chars.length; i++) {
        const home = homes[i];
        let tx = 0;
        let ty = 0;

        if (pointer.inside && home) {
          const dx = home.cx - pointer.x;
          const dy = home.cy - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < radius && dist > 0.0001) {
            const falloff = 1 - dist / radius; // 1 at cursor → 0 at edge
            const push = falloff * falloff * force; // eased, peaks at `force`
            tx = (dx / dist) * push;
            ty = (dy / dist) * push;
          }
        }

        const s = state[i];
        s.x += (tx - s.x) * EASE;
        s.y += (ty - s.y) * EASE;
        if (Math.abs(s.x) > 0.05 || Math.abs(s.y) > 0.05) moving = true;
        chars[i].style.transform = `translate3d(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px, 0)`;
      }

      // Keep animating while glyphs are displaced or the pointer is engaged.
      if (moving || pointer.inside) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
        for (let i = 0; i < chars.length; i++) chars[i].style.transform = '';
      }
    }

    function start() {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    }

    function onMove(e) {
      const r = root.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.inside = true;
      start();
    }

    function onLeave() {
      pointer.inside = false;
      start(); // let the spring settle glyphs back home
    }

    measure();
    // pointer* covers mouse, touch and pen. onMove handles both a desktop hover
    // and a finger drag; onDown makes a plain tap scatter the glyphs too.
    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerdown', onMove);
    root.addEventListener('pointerleave', onLeave);
    root.addEventListener('pointerup', onLeave);
    root.addEventListener('pointercancel', onLeave);

    const ro = new ResizeObserver(measure);
    ro.observe(root);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measure).catch(() => {});
    }

    return () => {
      cancelAnimationFrame(raf);
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerdown', onMove);
      root.removeEventListener('pointerleave', onLeave);
      root.removeEventListener('pointerup', onLeave);
      root.removeEventListener('pointercancel', onLeave);
      ro.disconnect();
    };
  }, [label, force]);

  // Split into words (kept unbreakable) then characters, so wrapping never
  // splits a word and every glyph is an independently animatable cell.
  const words = label.split(' ');

  return (
    <Tag ref={rootRef} className={`mesh-text-hover ${className}`} aria-label={label}>
      {words.map((word, wi) => (
        <span key={wi} className="mesh-text-hover__word" aria-hidden="true">
          {Array.from(word).map((ch, ci) => (
            <span key={ci} data-mesh-char className="mesh-text-hover__char">
              {ch}
            </span>
          ))}
          {wi < words.length - 1 && <span className="mesh-text-hover__space"> </span>}
        </span>
      ))}
    </Tag>
  );
}
