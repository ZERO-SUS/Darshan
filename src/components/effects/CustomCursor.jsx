import { useEffect, useRef } from 'react';

/**
 * Custom cursor: a small dot + a larger ring that both use
 * mix-blend-mode: difference, so they invert against whatever is under them
 * (black over white areas, white over dark). The ring lags with easing and
 * grows when hovering interactive elements. Desktop / fine-pointer only.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    document.documentElement.classList.add('has-custom-cursor');
    const dot = dotRef.current;
    const ring = ringRef.current;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const interactive = 'a, button, [role="button"], input, textarea, select, label, .spotlight, [data-cursor="hover"]';
    const onOver = (e) => {
      if (e.target.closest(interactive)) ring.classList.add('cursor-ring--hover');
    };
    const onOut = (e) => {
      if (e.target.closest(interactive)) ring.classList.remove('cursor-ring--hover');
    };
    const onDown = () => ring.classList.add('cursor-ring--hover');
    const onUp = () => ring.classList.remove('cursor-ring--hover');
    const onLeave = () => { dot.style.opacity = '0'; ring.style.opacity = '0'; };
    const onEnter = () => { dot.style.opacity = '1'; ring.style.opacity = '1'; };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
