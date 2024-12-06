/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#46DBE4', // Votre couleur personnalisée
      },
    },
  },
  plugins: [],
}
