/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  important:true,
  content: ["./view/**/*.ejs","./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss'),
    require('flowbite/plugin'),
    require('autoprefixer'),
  ],
}

