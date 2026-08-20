/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F7F4EC',
        parchment: '#F1ECE0',
        stone: {
          50: '#F7F4EC',
          100: '#EFE9DA',
          200: '#E4DDC9',
          300: '#D2C7AC',
          400: '#AFA184',
          500: '#8C8069',
          600: '#6B6459',
          700: '#4C463C',
          800: '#332F28',
          900: '#1C1A16',
          950: '#121110',
        },
        charcoal: '#1C1A16',
        ink: '#14130F',
        brass: {
          50: '#FAF6EC',
          100: '#F0E5C6',
          200: '#E1CB94',
          300: '#CBAA62',
          400: '#B4903F',
          500: '#9C7A3C',
          600: '#836533',
          700: '#69502A',
          800: '#4E3C20',
          900: '#332818',
        },
        emerald: {
          600: '#3F5B48',
          700: '#324A3A',
        },
        claret: {
          600: '#7A3B37',
          700: '#63302C',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      letterSpacing: {
        widest2: '0.28em',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(28,26,22,0.04), 0 8px 24px -12px rgba(28,26,22,0.12)',
        lift: '0 4px 8px rgba(28,26,22,0.06), 0 16px 40px -16px rgba(28,26,22,0.18)',
      },
      transitionTimingFunction: {
        luxe: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
