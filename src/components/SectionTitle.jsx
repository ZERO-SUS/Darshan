import MeshTextHover from './effects/MeshTextHover';

/**
 * Section header: mono eyebrow + display heading + hairline rule.
 * The heading uses the MeshTextHover effect (cursor repels each glyph, force 36).
 * `warp` is kept for API compatibility but the mesh effect is now the default.
 */
export default function SectionTitle({ eyebrow, title, action, warp = false, className = '' }) {
  const titleClasses = 'text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-ink leading-[1.05]';
  return (
    <div className={`w-full ${className}`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
          <MeshTextHover as="h2" text={title} force={36} className={`${titleClasses} pb-1`} />
        </div>
        {action}
      </div>
      <div className="mt-6 h-px w-full bg-gradient-to-r from-line via-line to-transparent" />
    </div>
  );
}
