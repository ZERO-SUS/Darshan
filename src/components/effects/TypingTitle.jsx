import { useEffect } from 'react';

/**
 * TypingTitle — animates document.title as a looping typewriter effect.
 * Types the text out, holds, deletes, and repeats, with a block cursor.
 */
export default function TypingTitle({ text = 'Darshan Designer', typeMs = 150, deleteMs = 80, holdMs = 1600 }) {
  useEffect(() => {
    let i = 0;
    let phase = 'typing'; // typing | holding | deleting
    let timer;

    const step = () => {
      let delay = typeMs;
      if (phase === 'typing') {
        i += 1;
        if (i >= text.length) {
          phase = 'holding';
          delay = holdMs;
        }
      } else if (phase === 'holding') {
        phase = 'deleting';
        delay = deleteMs;
      } else {
        i -= 1;
        delay = deleteMs;
        if (i <= 0) {
          i = 0;
          phase = 'typing';
          delay = 500;
        }
      }
      document.title = `${text.slice(0, i)}▍`;
      timer = setTimeout(step, delay);
    };

    step();
    return () => clearTimeout(timer);
  }, [text, typeMs, deleteMs, holdMs]);

  return null;
}
