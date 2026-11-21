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
        // MIGRATION STOPGAP: pages not yet moved to the carbon-copy system still
        // use Tailwind's gray-* and blue-* classes. These scales re-point them to
        // the ink and desk families so legacy pages share the one-ink palette.
        // Remove each scale once no file uses it (see DESIGN.md "Known gap").
        gray: {
          50: '#F6F7FB',
          100: '#EEF1F8', // = paper-ground
          200: '#D5DAEA', // = paper-rule
          300: '#BAC1D6',
          400: '#8A92AC',
          500: '#646C88',
          600: '#5A6380', // = ink-mute
          700: '#3A445E', // = ink-soft
          800: '#2E3852',
          900: '#25304A', // = ink
          950: '#1A2236',
        },
        blue: {
          50: '#EEF1FA',
          100: '#DDE3F4',
          200: '#BCC6E7',
          300: '#8F9FD3',
          400: '#5F74BD',
          500: '#344A9B', // = desk
          600: '#2F4390',
          700: '#283B7E', // = desk-deep
          800: '#23336D',
          900: '#1F2B5C', // = desk-night
          950: '#161F44',
        },
      },
      // Paper is square. The legacy radii (rounded, -lg, -xl, -2xl, -3xl) are
      // flattened site-wide so un-migrated pages lose their rounded cards and
      // buttons. sm / md stay: the carbon-copy system uses them on purpose for
      // sheet tabs, folder tabs and the rubber stamp. full stays for circles
      // (step dots, progress bars, toggles, counter buttons).
      borderRadius: {
        DEFAULT: '0',
        lg: '0',
        xl: '0',
        '2xl': '0',
        '3xl': '0',
      },
      fontFamily: {
        sans: ['"Manrope Variable"', 'Manrope', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', '"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        sheet: '0 1px 0 rgba(31,43,92,0.08), 0 18px 36px -12px rgba(25,34,70,0.45)',
        'sheet-sm': '0 1px 0 rgba(31,43,92,0.06), 0 8px 18px -10px rgba(25,34,70,0.35)',
        // MIGRATION STOPGAP: legacy shadow classes cast desk-tinted paper
        // shadows instead of Tailwind's neutral black ones.
        sm: '0 1px 0 rgba(31,43,92,0.06)',
        DEFAULT: '0 1px 0 rgba(31,43,92,0.06), 0 8px 18px -10px rgba(25,34,70,0.35)',
        md: '0 1px 0 rgba(31,43,92,0.06), 0 8px 18px -10px rgba(25,34,70,0.35)',
        lg: '0 1px 0 rgba(31,43,92,0.08), 0 18px 36px -12px rgba(25,34,70,0.45)',
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
