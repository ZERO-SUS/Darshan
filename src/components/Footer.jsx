import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Logo from './Logo';
import { SOCIALS } from './icons';
import TextRoll from './effects/TextRoll';
import MeshTextHover from './effects/MeshTextHover';
import DotScatter from './effects/DotScatter';
import Marquee from './effects/Marquee';

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

function useClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => {
      const t = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setTime(t);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Footer() {
  const time = useClock();

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-line">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="aura absolute -bottom-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full opacity-40 blur-3xl" />
      </div>

      {/* Big connect band */}
      <div className="container-content py-20 text-center md:py-28">
        <p className="eyebrow mb-6">Let’s connect</p>
        <a
          href="mailto:darshan99806@gmail.com"
          className="font-display text-[clamp(0.7rem,3.7vw,2.75rem)] font-extrabold leading-none tracking-[-0.03em] text-ink"
        >
          <MeshTextHover>darshan99806@gmail.com</MeshTextHover>
        </a>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {SOCIALS.map(({ name, href, Icon }) => (
            <a
              key={name}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={name}
              className="group inline-flex h-12 w-12 items-center justify-center rounded-full border border-line text-muted transition-all duration-200 hover:-translate-y-1 hover:scale-110 hover:border-accent hover:text-accent"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>

      {/* Marquee band */}
      <div className="border-y border-line py-6">
        <Marquee items={['Available for work', 'Let’s talk', 'Open to freelance', 'Web design', 'Front-end dev']} separator="✦" />
      </div>

      {/* Bottom grid */}
      <div className="container-content grid gap-10 py-12 md:grid-cols-3 md:items-start">
        <div>
          <Link to="/" className="flex items-center gap-2.5">
            <Logo className="h-6 w-6" />
            <DotScatter text="Darshan" fontSize={26} className="text-ink" />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Front-end developer &amp; web designer crafting responsive, modern experiences where
            technology meets creativity.
          </p>
        </div>

        <nav className="flex flex-col gap-2 md:items-center">
          <h3 className="eyebrow mb-2">Navigate</h3>
          {NAV.map((item) => (
            <Link key={item.to} to={item.to} className="text-sm font-medium text-muted transition-colors hover:text-ink">
              <TextRoll text={item.label} />
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2 md:items-end md:text-right">
          <h3 className="eyebrow mb-2">Local time</h3>
          <p className="font-mono text-2xl font-semibold tabular-nums text-ink">
            {time} <span className="text-sm text-accent">IST</span>
          </p>
          <p className="text-xs text-muted">Bangalore, India</p>
        </div>
      </div>

      <div className="container-content flex flex-col items-center justify-between gap-3 border-t border-line py-6 sm:flex-row">
        <p className="text-xs text-muted">© {new Date().getFullYear()} Darshan. All rights reserved.</p>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
        >
          Back to top
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-line transition-all group-hover:-translate-y-1 group-hover:border-accent">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </span>
        </button>
      </div>
    </footer>
  );
}
