import { useState } from 'react';

/**
 * liquid-distortion: applies a shared SVG turbulence displacement filter to
 * the image on hover (the filter's animation lives in <LiquidFilterDefs/>,
 * mounted once in App). Cheap because the filter only attaches on hover.
 */
export default function LiquidImage({ src, alt = '', className = '', imgClassName = '' }) {
  const [hover, setHover] = useState(false);

  // Pointer events drive it on every device: mouse hover on desktop, and a
  // press/tap on touch screens both scale the image and apply the liquid filter.
  return (
    <div
      className={`overflow-hidden ${className}`}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onPointerDown={() => setHover(true)}
      onPointerUp={() => setHover(false)}
      onPointerCancel={() => setHover(false)}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={hover ? { filter: 'url(#liquid-distort)' } : undefined}
        className={`h-full w-full object-cover transition-transform duration-500 ${
          hover ? 'scale-105' : 'scale-100'
        } ${imgClassName}`}
        onError={(e) => { e.currentTarget.style.opacity = '0'; }}
      />
    </div>
  );
}

/** Mount once (App). Provides the #liquid-distort filter used above. */
export function LiquidFilterDefs() {
  return (
    <svg
      aria-hidden="true"
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
    >
      <defs>
        <filter id="liquid-distort" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.016" numOctaves="2" seed="7" result="noise">
            <animate attributeName="baseFrequency" dur="14s" values="0.012 0.016;0.02 0.01;0.012 0.016" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="16" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}
