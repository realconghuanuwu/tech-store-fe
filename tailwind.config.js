/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'c-main-color': '#1B3281',
        'c-sec-color': '#5d78d6',
        'c-dark-color': '#424955',
        'c-dark-sec-color': '#565E6C',
        'c-main-light-color': '#d0dbff',
        'c-edit-color': '#E3FFFB',
        'c-error-color': '#FFE3E3',
        'c-gray-color-border': '#9E9E9E',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
