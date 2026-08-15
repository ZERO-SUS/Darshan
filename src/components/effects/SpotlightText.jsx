import { useRef } from 'react';

/**
 * spotlight-text: an accent gradient revealed under the cursor as it
 * moves across the text. Falls back to muted color where the cursor isn't.
 */
export default function SpotlightText({ as: Tag = 'span', className = '', children, ...rest }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <Tag ref={ref} onPointerMove={onMove} className={`spotlight-text ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
