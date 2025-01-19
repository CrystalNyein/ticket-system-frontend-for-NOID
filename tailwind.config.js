/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'default-blue': '#92C9EC',
        'default-red': '#FF1D18',
        'default-yellow': '#F9F800',
        'default-orange': '#F17C00',
        'default-black': '#3A3A3A',
        'dark-blue': '#0077c1',
        'light-blue': '#0077c1AA',
        'light-orange': '#fcd4ab',
      },
    },
  },
  plugins: [],
};
