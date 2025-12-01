// postcss.config.mjs

import autoprefixer from 'autoprefixer';
import sortMediaQueries from 'postcss-sort-media-queries';
import cssDeclarationSorter from 'css-declaration-sorter';
import purgecssModule from '@fullhuman/postcss-purgecss';

// CJS / ESM 両対応で関数を取り出す
const purgecss = typeof purgecssModule === 'function' ? purgecssModule : purgecssModule.default;

export default ({ env }) => ({
  plugins: [
    autoprefixer(),

    cssDeclarationSorter({
      order: 'smacss'
    }),

    sortMediaQueries({
      sort: 'mobile-first' // mobile-first | desktop-first
    }),

    // 本番ビルドのときだけ PurgeCSS を有効化
    //env === 'production'
    //  ? purgecss({
    //      content: ['./src/**/*.html', './src/**/*.ejs', './src/**/*.pug', './src/js/**/*.js']
    //      // safelist: ['hoge'],
    //    })
    //  : null
  ].filter(Boolean)
});
