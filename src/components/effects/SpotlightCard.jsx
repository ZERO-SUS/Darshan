import { useRef } from 'react';

/**
 * magic-bento / spotlight card: a soft radial glow + border highlight that
 * follows the cursor (CSS vars, no re-render).
 *
 * On touch/pen it additionally tilts toward the finger *while pressed*, giving
 * a tactile "grab and drag" feel on phones. Desktop mouse keeps the flat glow
 * so its hover translate/shadow classes stay in charge.
 */
export default function SpotlightCard({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null);
  const held = useRef(false);

  const setGlow = (el, e, r) => {
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setGlow(el, e, r);
    // Tilt only while the finger is held down, so ordinary scrolling never
    // grabs the card.
    if (e.pointerType !== 'mouse' && held.current) {
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      const rx = Math.max(-9, Math.min(9, -py * 10));
      const ry = Math.max(-9, Math.min(9, px * 10));
      el.style.transform = `perspective(720px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(0.985)`;
    }
  };

  const onDown = (e) => {
    if (e.pointerType === 'mouse') return;
    held.current = true;
    const el = ref.current;
    if (el) el.style.transition = 'transform 0.12s ease-out';
  };

  const reset = (e) => {
    if (e && e.pointerType === 'mouse') return;
    held.current = false;
    const el = ref.current;
    if (el) {
      el.style.transition = 'transform 0.45s cubic-bezier(0.22,1,0.36,1)';
      el.style.transform = '';
    }
  };

  return (
    <Tag
      ref={ref}
      onPointerMove={onMove}
      onPointerDown={onDown}
      onPointerUp={reset}
      onPointerCancel={reset}
      onPointerLeave={reset}
      className={`spotlight spotlight-border ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
