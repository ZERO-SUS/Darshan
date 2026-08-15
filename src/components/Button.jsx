import { Link } from 'react-router-dom';

/**
 * Polymorphic button.
 * - `to`   → internal Link (react-router)
 * - `href` → external anchor (opens new tab by default)
 * - else   → <button>
 * Variants: 'solid' | 'outline' | 'ghost'
 */
export default function Button({
  to,
  href,
  variant = 'solid',
  className = '',
  children,
  newTab = true,
  ...rest
}) {
  const cls = {
    solid: 'btn-solid',
    outline: 'btn-outline',
    ghost: 'btn-ghost',
    neon: 'btn-neon',
    liquid: 'btn-liquid',
    scan: 'btn-scan',
  }[variant] || 'btn-solid';

  const classes = `${cls} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
