export default {
  plugins: {
    //tailwindcss: {},
    autoprefixer: {},
    'css-declaration-sorter': { order: 'smacss' },
    'postcss-sort-media-queries': {
      sort: 'desktop-first'
    }
    //'@fullhuman/postcss-purgecss': {
    //  content: ['./src/**/*.html', './src/**/*.pug', './src/js/**/*.js'],
    //  // 除外設定　https://purgecss.com/safelisting.html
    //  //safelist: ['hoge'],
    //},
  }
};
