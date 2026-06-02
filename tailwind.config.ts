import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: '#eef5ff',
        surface: '#ffffff',
        surfaceSoft: '#f8faff',
        primary: '#2f6aff',
        primaryDark: '#1d4ed8',
        muted: '#64748b',
        text: '#0f172a',
        border: '#dbeafe',
        accent: '#60a5fa',
      },
      boxShadow: {
        soft: '0 20px 60px rgba(15, 23, 42, 0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '5xl': '2rem',
      },
    },
  },
};

export default config;
