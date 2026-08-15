import { SOCIALS } from './icons';

/**
 * Fixed vertical social rail on the left (desktop only).
 */
export default function MediaSidebar() {
  return (
    <div className="fixed left-6 bottom-0 z-30 hidden flex-col items-center gap-5 xl:flex">
      {SOCIALS.filter((s) => s.name !== 'Email').map(({ name, href, Icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          className="text-muted transition-all duration-200 hover:-translate-y-0.5 hover:text-accent"
        >
          <Icon className="h-5 w-5" />
        </a>
      ))}
      <div className="h-24 w-px bg-gradient-to-b from-line to-transparent" />
    </div>
  );
}
