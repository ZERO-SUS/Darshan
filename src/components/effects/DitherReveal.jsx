import { useEffect, useRef } from 'react';

/**
 * DitherReveal — OriginKit "dither-reveal" image effect.
 *
 * The image is rendered as an ordered-dither (Bayer 8×8) halftone on a canvas
 * that sits over the real photo. The cursor opens a soft circular hole in the
 * dithered layer, revealing the true image beneath — so moving the pointer
 * "develops" the photo out of the dither. Off-hover it's fully dithered.
 */
const BAYER = [
  [0, 48, 12, 60, 3, 51, 15, 63],
  [32, 16, 44, 28, 35, 19, 47, 31],
  [8, 56, 4, 52, 11, 59, 7, 55],
  [40, 24, 36, 20, 43, 27, 39, 23],
  [2, 50, 14, 62, 1, 49, 13, 61],
  [34, 18, 46, 30, 33, 17, 45, 29],
  [10, 58, 6, 54, 9, 57, 5, 53],
  [42, 26, 38, 22, 41, 25, 37, 21],
];

export default function DitherReveal({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  pixel = 3, // dither cell size in px
  radius = 92, // reveal radius in px
  dark = '#14110d',
  light = '#efeae0',
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas || typeof window === 'undefined') return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    let ready = false;

    const build = () => {
      const rect = wrap.getBoundingClientRect();
      const W = Math.max(1, Math.round(rect.width));
      const H = Math.max(1, Math.round(rect.height));
      if (!img.width || !img.height) return;

      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';

      // Draw the image "cover"-fitted into an offscreen buffer.
      const off = document.createElement('canvas');
      off.width = W;
      off.height = H;
      const octx = off.getContext('2d');
      const ir = img.width / img.height;
      const cr = W / H;
      let dw, dh, dx, dy;
      if (ir > cr) { dh = H; dw = H * ir; dx = (W - dw) / 2; dy = 0; }
      else { dw = W; dh = W / ir; dx = 0; dy = (H - dh) / 2; }
      octx.drawImage(img, dx, dy, dw, dh);
      const d = octx.getImageData(0, 0, W, H).data;

      // Ordered-dither each pixel block to two tones by luminance threshold.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      for (let by = 0; by < H; by += pixel) {
        for (let bx = 0; bx < W; bx += pixel) {
          let sum = 0;
          let n = 0;
          const yEnd = Math.min(by + pixel, H);
          const xEnd = Math.min(bx + pixel, W);
          for (let yy = by; yy < yEnd; yy++) {
            for (let xx = bx; xx < xEnd; xx++) {
              const i = (yy * W + xx) * 4;
              sum += 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
              n++;
            }
          }
          const lum = sum / n / 255;
          const t = (BAYER[((by / pixel) | 0) % 8][((bx / pixel) | 0) % 8] + 0.5) / 64;
          ctx.fillStyle = lum > t ? light : dark;
          ctx.fillRect(bx, by, pixel, pixel);
        }
      }
      ready = true;
    };

    img.onload = build;
    img.src = src;

    const ro = new ResizeObserver(() => { if (ready) build(); });
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [src, pixel, dark, light]);

  const onMove = (e) => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const r = wrap.getBoundingClientRect();
    canvas.style.setProperty('--mx', `${e.clientX - r.left}px`);
    canvas.style.setProperty('--my', `${e.clientY - r.top}px`);
    canvas.style.setProperty('--r', `${radius}px`);
  };
  const onLeave = () => canvasRef.current?.style.setProperty('--r', '0px');

  return (
    <div
      ref={wrapRef}
      className={`dither-reveal ${className}`}
      onPointerMove={onMove}
      onPointerDown={onMove}
      onPointerLeave={onLeave}
      onPointerCancel={onLeave}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`dither-reveal__img ${imgClassName}`}
        onError={(e) => { e.currentTarget.style.opacity = '0'; }}
      />
      <canvas ref={canvasRef} className="dither-reveal__canvas" aria-hidden="true" />
    </div>
  );
}
