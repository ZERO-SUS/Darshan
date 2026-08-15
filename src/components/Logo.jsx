export default function Logo({ className = '' }) {
  return (
    <span className={`relative inline-block ${className}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
        <rect x="2.5" y="6" width="10" height="15.5" rx="2.5"
              stroke="rgb(var(--slate))" strokeWidth="1.6" fill="none" />
        <rect x="11.5" y="2.5" width="10" height="15.5" rx="2.5"
              fill="rgb(var(--accent))" fillOpacity="0.9" />
      </svg>
    </span>
  );
}
