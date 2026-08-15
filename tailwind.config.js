/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic tokens → CSS vars (channels defined in index.css).
        // Same class works in light & dark; opacity modifiers supported.
        bg:            'rgb(var(--bg) / <alpha-value>)',
        surface:       'rgb(var(--surface) / <alpha-value>)',
        'surface-alt': 'rgb(var(--surface-alt) / <alpha-value>)',
        ink:           'rgb(var(--ink) / <alpha-value>)',
        muted:         'rgb(var(--muted) / <alpha-value>)',
        line:          'rgb(var(--line) / <alpha-value>)',
        accent:        'rgb(var(--accent) / <alpha-value>)',
        'accent-strong':'rgb(var(--accent-strong) / <alpha-value>)',
        coral:         'rgb(var(--coral) / <alpha-value>)',
        peach:         'rgb(var(--peach) / <alpha-value>)',
        gold:          'rgb(var(--gold) / <alpha-value>)',
        slate:         'rgb(var(--slate) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Syne"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Sora"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        content: '1120px',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgb(var(--shadow) / 0.04), 0 8px 24px rgb(var(--shadow) / 0.06)',
        lift: '0 8px 20px rgb(var(--shadow) / 0.08), 0 24px 48px rgb(var(--shadow) / 0.12)',
        glow: '0 0 0 1px rgb(var(--accent) / 0.35), 0 8px 30px rgb(var(--accent) / 0.25)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in': 'fade-in 0.8s ease both',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
}
