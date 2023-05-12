/** @type {import('tailwindcss').Config} */
module.exports = {
  important:true,
  content: ["./view/**/**/*.{html,js,ejs}","./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss'),
    require('flowbite/plugin'),
    require('autoprefixer'),
  ],
}

