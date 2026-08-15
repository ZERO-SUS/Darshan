import { useEffect, useState } from 'react';

/**
 * textmorph: cycles through a list of words with a blur + slide morph.
 */
export default function TextMorph({ words = [], interval = 2200, className = '' }) {
  const [i, setI] = useState(0);
  const [on, setOn] = useState(true);

  useEffect(() => {
    if (words.length <= 1) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => {
      setOn(false);
      setTimeout(() => {
        setI((p) => (p + 1) % words.length);
        setOn(true);
      }, 260);
    }, interval);
    return () => clearInterval(id);
  }, [words, interval]);

  return (
    <span
      className={`inline-block transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        on ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-[6px] translate-y-2'
      } ${className}`}
    >
      {words[i]}
    </span>
  );
}
