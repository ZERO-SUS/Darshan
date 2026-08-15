import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Logo from './Logo';
import TextRoll from './effects/TextRoll';

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/projects', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const linkClass = ({ isActive }) =>
    `relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
      isActive ? 'bg-ink/[0.06] text-ink' : 'text-muted hover:text-ink hover:bg-ink/[0.04]'
    }`;

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div className="glass-nav relative z-50 flex w-full max-w-3xl items-center justify-between gap-2 rounded-full px-3 py-2 shadow-soft">
        <Link to="/" className="group flex items-center gap-2 pl-2" onClick={() => setOpen(false)}>
          <Logo className="h-6 w-6 transition-transform duration-300 group-hover:rotate-12" />
          <span className="font-display text-lg font-bold tracking-tight text-ink">Darshan</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
              <TextRoll text={item.label} />
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors hover:text-accent"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed inset-0 top-0 z-40 origin-top transition-all duration-300 ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        style={{ background: 'rgb(var(--bg) / 0.97)', backdropFilter: 'blur(20px)' }}
      >
        <nav className="flex flex-col gap-2 px-8 pt-28">
          {NAV.map((item, i) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${i * 40}ms` : '0ms' }}
              className={({ isActive }) =>
                `font-display flex items-center justify-between rounded-2xl px-5 py-5 text-3xl font-bold transition-all ${
                  isActive ? 'bg-ink/[0.06] text-ink' : 'text-muted hover:text-ink'
                }`
              }
            >
              {item.label}
              <span className="font-mono text-sm text-accent">0{i + 1}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
