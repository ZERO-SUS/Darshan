import GlassSurface from '../reactbits/GlassSurface/GlassSurface';
import { SOCIALS } from '../icons';

/**
 * Horizontal glass social dock pinned to the bottom-center of the viewport.
 * Built on the real reactbits GlassSurface. On smaller screens the socials
 * also live in the footer.
 */
export default function GlassDock() {
  const items = SOCIALS.filter((s) => s.name !== 'Email');
  const width = items.length * 52 + 24;

  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-40 hidden -translate-x-1/2 md:block">
      <GlassSurface width={width} height={58} borderRadius={26} className="pointer-events-auto">
        <div className="flex flex-row items-center gap-1 px-1" aria-label="Social links">
          {items.map(({ name, href, Icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              title={name}
              className="flex h-11 w-11 items-center justify-center rounded-full text-ink/80
                         transition-all duration-200 hover:scale-125 hover:text-accent"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </GlassSurface>
    </div>
  );
}
