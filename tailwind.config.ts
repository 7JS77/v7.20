import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ── Core dark palette ──────────────────────────────────────────
        ink: {
          DEFAULT: '#080B10',
          '2': '#0E1219',
          '3': '#141B25',
        },
        // ── Brand gold ────────────────────────────────────────────────
        gold: {
          DEFAULT: '#D4AF37',
          dark: '#B8962E',
          light: '#E8CB5A',
        },
        // ── Semantic borders ──────────────────────────────────────────
        border: {
          default: '#1E2636',
          subtle:  '#141C2C',
        },
        // ── Text tokens ───────────────────────────────────────────────
        text: {
          primary:   '#F1F5F9',
          secondary: '#8B9CB6',
          muted:     '#4B5568',
        },
        // ── Status ────────────────────────────────────────────────────
        success: '#22C55E',
        error:   '#EF4444',
        warning: '#F59E0B',
        info:    '#38BDF8',
        // ── Chart sky tones (Incoterms buyer colour) ──────────────────
        sky: {
          50:  '#F0F9FF',
          100: '#E0F2FE',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'Menlo', 'monospace'],
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
        'grid-gold': "linear-gradient(rgba(212,175,55,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.03) 1px, transparent 1px)",
        'radial-gold': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(212,175,55,0.12), transparent)',
        'hero-glow':   'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,175,55,0.08), transparent 70%)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
      boxShadow: {
        'gold-sm': '0 0 0 1px rgba(212,175,55,0.15)',
        'gold-md': '0 0 24px rgba(212,175,55,0.12), 0 0 0 1px rgba(212,175,55,0.2)',
        'gold-lg': '0 0 48px rgba(212,175,55,0.15), 0 0 0 1px rgba(212,175,55,0.25)',
        'ink':     '0 4px 24px rgba(0,0,0,0.6)',
        'ink-lg':  '0 8px 48px rgba(0,0,0,0.8)',
      },
      animation: {
        'ticker':    'ticker 40s linear infinite',
        'fade-in':   'fadeIn 0.4s ease-out forwards',
        'slide-up':  'slideUp 0.5s ease-out forwards',
        'pulse-gold':'pulseGold 2s ease-in-out infinite',
      },
      keyframes: {
        ticker: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGold: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
