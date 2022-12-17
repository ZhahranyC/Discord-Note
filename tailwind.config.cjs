const { claim_component } = require('svelte/internal');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      },
      colors: {
        'purpleDiscord': '#7289DA',
        'mainDark': '#23272A',
        'subDark': '#2C2F33',
        'mainGray': '#99AAB5'
      },
      width: {
        'container': 'min(1080px, 100% - 88px)',
        'card': 'calc(1040px/3)'
      },
      gridTemplateColumns: {
        'autoMax3': 'repeat(auto-fill, calc(1040px/3))'
      },
      lineClamp: {
        7: '7',
        8: '8',
        9: '9',
        10: '10',
        11: '11',
        12: '12',
      }
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('@tailwindcss/line-clamp'),
  ],
}
