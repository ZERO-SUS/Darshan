/**
 * Seamless infinite marquee. The track holds TWO identical copies of the
 * items and animates by exactly -50%, so the loop is jump-free. Pauses on hover.
 */
export default function Marquee({ items = [], className = '', separator = '✦' }) {
  const Set = ({ aria }) => (
    <div className="flex flex-shrink-0 items-center" aria-hidden={aria}>
      {items.map((item, i) => (
        <span key={i} className="flex flex-shrink-0 items-center">
          <span className="mx-8 font-display text-2xl font-semibold text-ink/80 md:text-4xl">
            {item}
          </span>
          <span className="text-accent">{separator}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`marquee ${className}`}>
      <div className="marquee__track">
        <Set />
        <Set aria />
      </div>
    </div>
  );
}
