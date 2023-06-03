// Here's an example implementation of tailwind.config.js:

const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.js', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        gray: colors.gray,
        indigo: colors.indigo,
        teal: colors.teal,
      },
    },
  },
  variants: {},
  plugins: [],
};

// The above configuration enables JIT mode, which compiles Tailwind CSS on-demand, based on the actual CSS classes used in your code. It also purges unused CSS classes from your code, resulting in a smaller file size. The theme configuration extends the default Tailwind CSS color palette with additional shades of gray, indigo, and teal.