import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#f5efe6',
        paper: '#ffffff',
        ink: {
          DEFAULT: '#1a1a1a',
          soft: '#4a4a4a',
          faint: '#8a8a8a',
        },
        rule: '#d8d2c8',
        accent: {
          DEFAULT: '#a83329',
          dark: '#8a2820',
        },
        status: {
          active: '#3d8c4f',
          partial: '#d4a52e',
          restricted: '#c46a2d',
          inaccessible: '#a83329',
        },
      },
      fontFamily: {
        serif: ['var(--font-lora)', 'Lora', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'Inter', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
