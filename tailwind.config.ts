import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#050505',
        surface: {
          DEFAULT: '#0A0A0A',
          card: '#0D0D0D',
          hover: '#141414',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-hover': 'rgba(255, 212, 0, 0.3)',
        },
        batta: {
          yellow: '#FFD400',
          'yellow-light': '#FFE66D',
          'yellow-dark': '#E5BF00',
          'yellow-glow': 'rgba(255, 212, 0, 0.15)',
          orange: '#FF7A00',
          dark: '#050505',
          muted: '#8A8A8A',
        }
      },
      fontFamily: {
        sans: ['var(--font-cairo)', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'blur(24px)' },
          '50%': { opacity: '0.8', filter: 'blur(36px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'yellow-sm': '0 0 15px rgba(255, 212, 0, 0.2)',
        'yellow-md': '0 0 30px rgba(255, 212, 0, 0.25)',
        'yellow-lg': '0 0 50px rgba(255, 212, 0, 0.3)',
      }
    },
  },
  plugins: [],
}
export default config
