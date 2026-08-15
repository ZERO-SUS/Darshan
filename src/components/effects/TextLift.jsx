/**
 * textlift: splits text into characters that rise (with a stagger) when
 * the group is hovered. Whitespace is preserved and made non-breaking.
 */
export default function TextLift({ text, className = '', charDelay = 22 }) {
  const chars = [...String(text)];
  return (
    <span className={`lift-group inline-block ${className}`}>
      {chars.map((ch, i) => (
        <span
          key={i}
          className="lift-char"
          style={{ transitionDelay: `${i * charDelay}ms` }}
        >
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  );
}
