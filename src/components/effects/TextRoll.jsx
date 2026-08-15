/**
 * textmorph (originkit logic): each character rolls upward on hover while a
 * duplicate in the accent color rolls up into its place, staggered per letter.
 */
export default function TextRoll({ text, className = '', charDelay = 28 }) {
  const chars = [...String(text)];
  return (
    <span className={`text-roll ${className}`} aria-label={text}>
      {chars.map((ch, i) => {
        const c = ch === ' ' ? ' ' : ch;
        const delay = `${i * charDelay}ms`;
        return (
          <span className="text-roll__col" key={i} aria-hidden="true">
            <span className="text-roll__a" style={{ transitionDelay: delay }}>{c}</span>
            <span className="text-roll__b" style={{ transitionDelay: delay }}>{c}</span>
          </span>
        );
      })}
    </span>
  );
}
