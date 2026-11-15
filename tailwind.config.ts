import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      // ─── Semantic Colour tokens bound to CSS variables ───────────────
      colors: {
        'bg-primary':   'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-tertiary':  'var(--bg-tertiary)',
        surface:        'var(--surface)',
        'card-bg':      'var(--card-bg)',
        accent:         'var(--accent)',
        'accent-muted': 'var(--accent-muted)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-disabled': 'var(--text-disabled)',
        border:         'var(--border)',
        'border-subtle': 'var(--border-subtle)',
        'border-accent': 'var(--border-accent)',
        'terminal-bg':  'var(--terminal-bg)',
        'terminal-bar': 'var(--terminal-bar)',
      },

      // ─── Typography ──────────────────────────────────────────────────
      fontFamily: {
        sans:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-jetbrains-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'fluid-hero':   ['clamp(2.5rem, 7vw, 5rem)',   { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'fluid-h1':     ['clamp(2rem, 5vw, 3.5rem)',   { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'fluid-h2':     ['clamp(1.5rem, 3.5vw, 2.5rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'fluid-h3':     ['clamp(1.125rem, 2vw, 1.5rem)', { lineHeight: '1.3' }],
        'eyebrow':      ['0.6875rem',  { lineHeight: '1', letterSpacing: '0.18em' }],
        'tag':          ['0.625rem',   { lineHeight: '1', letterSpacing: '0.12em' }],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },

      // ─── Spacing / layout ────────────────────────────────────────────
      maxWidth: {
        shell: '1120px',
        wide:  '1280px',
      },
      spacing: {
        'nav': '64px',
        '18': '4.5rem',
        '22': '5.5rem',
      },

      // ─── Border radius ───────────────────────────────────────────────
      borderRadius: {
        card: '8px',
        tag:  '4px',
        chip: '6px',
        full: '9999px',
      },

      // ─── Shadows ─────────────────────────────────────────────────────
      boxShadow: {
        card:       '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
        'card-hover':'0 8px 30px rgba(0,0,0,0.12)',
        'accent':   '0 0 0 2px var(--border-accent)',
      },

      // ─── Animation ───────────────────────────────────────────────────
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':       { opacity: '0' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%':       { opacity: '0.6' },
        },
        'ambient-drift': {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%':       { transform: 'translate(25px, -35px) scale(1.08)' },
          '66%':       { transform: 'translate(-20px, 25px) scale(0.95)' },
        },
      },
      animation: {
        'fade-up':      'fade-up 0.5s ease-out forwards',
        'fade-in':      'fade-in 0.4s ease-out forwards',
        'cursor-blink': 'blink 1s step-end infinite',
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
        'ambient-drift': 'ambient-drift 18s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
