import { useRef } from 'react';

/**
 * magic-bento / spotlight card: a soft radial glow + border highlight
 * that follows the cursor. Uses CSS vars set on the element (no re-render).
 */
export default function SpotlightCard({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null);

  // Pointer events cover mouse, touch and pen — so the glow follows a finger
  // drag on phones/tablets, not just a desktop cursor.
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <Tag
      ref={ref}
      onPointerMove={onMove}
      className={`spotlight spotlight-border ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
