import { useRef } from 'react';

/**
 * juiceeffect / magnetic: the child is gently pulled toward the pointer and
 * springs back when it leaves. Works with mouse, touch and pen — on a phone the
 * element follows the finger while it's pressed, then springs back on release.
 */
export default function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = 'translate(0, 0)';
  };

  return (
    <span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onPointerUp={reset}
      onPointerCancel={reset}
      className={`inline-block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${className}`}
    >
      {children}
    </span>
  );
}
