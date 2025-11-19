/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      serif: ['Exo 2', 'serif'],
    },
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        background: 'var(--color-background)',
        text: 'var(--color-text)',
        subtleText: 'var(--color-subtleText)',
        glass: 'var(--color-glass)',
        border: 'var(--color-border)',
      },
    },
  },
  plugins: [],
}
