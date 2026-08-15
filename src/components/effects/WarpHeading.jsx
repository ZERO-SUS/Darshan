import { useEffect, useRef, useState } from 'react';
import WarpText from '../reactbits/WarpText/WarpText';

/**
 * Applies the reactbits WarpText (WebGL warp) to a heading, but ONLY while the
 * heading is on screen — it unmounts the WebGL context when scrolled away, so
 * we never run more than one or two contexts at once (keeps FPS high). A plain
 * styled fallback keeps layout + SEO when the warp isn't mounted.
 *
 * The size/weight come from the `className` (Tailwind text-* classes) via
 * fontSize/Family="inherit", so the warp matches the surrounding type.
 */
export default function WarpHeading({ text, className = '', color = '#181210', as: Tag = 'h2' }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { rootMargin: '120px 0px 120px 0px', threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`relative font-display ${className}`}>
      <span className={inView ? 'invisible' : ''}>{text}</span>
      {inView && (
        <span className="absolute inset-0 block" aria-hidden="true">
          <WarpText
            text={text}
            fontFamily="inherit"
            fontSize="inherit"
            fontWeight={800}
            color={color}
            lineHeight={1.05}
            letterSpacing="-0.02em"
            warpStrength={0.05}
            warpScale={1.5}
            refraction={0.012}
            pointerInfluence={0.5}
            pointerStrength={0.4}
          />
        </span>
      )}
    </Tag>
  );
}
