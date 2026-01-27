/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#ff3333',
          neon: '#ccff00',
        },
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      boxShadow: {
        hard: '4px 4px 0px 0px #000',
        'hard-sm': '2px 2px 0px 0px #000',
        'hard-lg': '6px 6px 0px 0px #000',
      },
    },
  },
  plugins: [],
};
