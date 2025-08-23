/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'c-main-red': '#db4444',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
