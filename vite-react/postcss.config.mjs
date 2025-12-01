import autoprefixer from 'autoprefixer';
import sortMediaQueries from 'postcss-sort-media-queries';
import cssDeclarationSorter from 'css-declaration-sorter';
import purgecssModule from '@fullhuman/postcss-purgecss';

// CJS / ESM 両対応
const purgecss = typeof purgecssModule === 'function' ? purgecssModule : purgecssModule.default;

export default ({ env }) => ({
  plugins: [
    autoprefixer(),
    sortMediaQueries({ sort: 'mobile-first' }),
    cssDeclarationSorter({ order: 'smacss' }),

    // 本番ビルドのみ PurgeCSS を有効化
    //env === 'production'
    //  ? purgecss({
    //      content: ['./src/**/*.html', './src/js/**/*.js'],
    //      safelist: ['hoge'],
    //    })
    //  : null,
  ].filter(Boolean),
});
