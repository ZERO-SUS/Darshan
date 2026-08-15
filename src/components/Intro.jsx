import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Full-screen "click to continue" intro overlay, styled to match the site
 * (warm white, aura glow, Syne display, orange accent). Shows on every page
 * load; clicking anywhere fades it out and reveals the site.
 */
export default function Intro() {
  const [gone, setGone] = useState(false);   // fully unmounted
  const [leaving, setLeaving] = useState(false); // fade-out in progress
  const [ready, setReady] = useState(false);  // whether to render at all
  const navigate = useNavigate();

  useEffect(() => {
    setReady(true);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const dismiss = () => {
    if (leaving) return;
    setLeaving(true);
    document.body.style.overflow = '';
    navigate('/');                              // always land on Home
    window.scrollTo({ top: 0, behavior: 'auto' }); // at the very top
    setTimeout(() => setGone(true), 700);
  };

  useEffect(() => {
    if (!ready) return;
    const onKey = (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') dismiss();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [ready, leaving]);

  if (!ready || gone) return null;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Click to continue"
      onClick={dismiss}
      className={`fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center
                  bg-bg px-6 text-center transition-opacity duration-700 ease-out
                  ${leaving ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
    >
      {/* Ambient aura glow, same as the hero */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="aura absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl animate-float" />
      </div>

      {/* Eyebrow */}
      <p className="intro-fade eyebrow mb-8" style={{ animationDelay: '0.1s' }}>
        Welcome — portfolio of Darshan
      </p>

      {/* Big statement */}
      <h1 className="intro-fade font-display font-extrabold leading-[0.92] tracking-tight text-ink text-[13vw] sm:text-[9vw] md:text-[7.5vw]"
          style={{ animationDelay: '0.22s' }}>
        <span className="block">Designing &amp; building</span>
        <span className="block text-gradient">digital experiences.</span>
      </h1>

      {/* Sub line */}
      <p className="intro-fade mt-8 max-w-md text-base text-muted sm:text-lg" style={{ animationDelay: '0.34s' }}>
        Front-end developer &amp; designer crafting modern websites
        where technology meets creativity.
      </p>

      {/* Click-to-continue cue */}
      <div className="intro-fade mt-14 flex flex-col items-center gap-3" style={{ animationDelay: '0.5s' }}>
        <span className="font-mono text-base sm:text-lg font-semibold uppercase tracking-[0.25em] text-accent animate-pulse">
          Click anywhere to enter
        </span>
        <span className="inline-block h-10 w-px animate-pulse bg-accent/60" />
      </div>
    </div>
  );
}
