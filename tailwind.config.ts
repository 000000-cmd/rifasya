import type { Config } from 'tailwindcss'

export default {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary:'var(--primary-color)',
        primaryHover: 'var(--primary-color-light)',
        accent: 'var(--accent-color)',
      },
    },
  },
  plugins: [],
} satisfies Config
