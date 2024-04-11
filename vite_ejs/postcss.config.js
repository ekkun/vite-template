//module.exports = ({ env }) => ({
//  plugins: [
//    require('tailwindcss')(),
//    require('autoprefixer')(),
//    //env != 'development' ? require('postcss-sort-media-queries')({ sort: 'desktop-first' }) : null,
//    require('postcss-sort-media-queries')({
//      sort: 'desktop-first', // mobile-first, desktop-first
//    }),
//    require('css-declaration-sorter')({ order: 'smacss' }),
//    env != 'development'
//      ? require('@fullhuman/postcss-purgecss')({
//          content: ['./src/**/*.html', './src/js/**/*.ejs', './src/js/**/*.js'],
//        })
//      : null,
//  ],
//});

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
