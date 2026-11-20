/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Carbon-copy form set: ultramarine desk + ruling, coloured copy papers, stamp red.
        desk: {
          DEFAULT: '#344A9B',
          deep: '#283B7E',
          night: '#1F2B5C',
          soft: '#5468B0',
        },
        ink: {
          DEFAULT: '#25304A', // form ruling and body text on paper
          soft: '#3A445E',
          mute: '#5A6380',
        },
        paper: {
          white: '#FFFDF5', // warm white
          ground: '#EEF1F8', // page ground below the desk: ultramarine-tinted white
          rule: '#D5DAEA',
          canary: '#F0E4BF',
          pink: '#E9A8B8',
          sky: '#AFC7E8',
        },
        stamp: {
          DEFAULT: '#B83A4B', // reserved for the live result only
          deep: '#962C3B',
        },
      },
      fontFamily: {
        sans: ['"Manrope Variable"', 'Manrope', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', '"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        sheet: '0 1px 0 rgba(31,43,92,0.08), 0 18px 36px -12px rgba(25,34,70,0.45)',
        'sheet-sm': '0 1px 0 rgba(31,43,92,0.06), 0 8px 18px -10px rgba(25,34,70,0.35)',
      },
      keyframes: {
        'stamp-in': {
          '0%': { opacity: '0', transform: 'rotate(-12deg) scale(1.6)', filter: 'blur(2px)' },
          '60%': { opacity: '1', transform: 'rotate(-12deg) scale(0.94)', filter: 'blur(0)' },
          '100%': { opacity: '1', transform: 'rotate(-12deg) scale(1)' },
        },
        'nudge-down': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(4px)' },
        },
      },
      animation: {
        'stamp-in': 'stamp-in 380ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'nudge-down': 'nudge-down 1.8s cubic-bezier(0.45, 0, 0.55, 1) infinite',
      },
    },
  },
  plugins: [],
}
