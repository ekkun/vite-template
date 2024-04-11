module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'css-declaration-sorter': { order: 'smacss' },
    'postcss-sort-media-queries': {
      sort: 'desktop-first',
    },
    '@fullhuman/postcss-purgecss': {
      content: ['./src/**/*.html', './src/js/**/*.ejs', './src/js/**/*.js'],
      // 除外設定　https://purgecss.com/safelisting.html
      //safelist: ['hoge'],
    },
  },
};
