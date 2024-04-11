import { defineConfig } from 'vite';
import { globSync } from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
//import handlebars from 'vite-plugin-handlebars';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import liveReload from 'vite-plugin-live-reload';
//import JSON from './src/_templates/data.json';
import babel from '@rollup/plugin-babel';

const env = process.env.NODE_ENV;
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

if (isProduction) {
  console.info('ビルド環境');
}

if (isDevelopment) {
  console.info('開発環境');
}

const inputHtmlArray = globSync(['src/**/*.html'], { ignore: ['node_modules/**'] }).map((file) => {
  return [path.relative('src', file.slice(0, file.length - path.extname(file).length)), fileURLToPath(new URL(file, import.meta.url))];
});
const inputScssArray = globSync('src/scss/*.scss', { ignore: ['src/scss/**/_*.scss', 'node_modules/**'] }).map((file) => {
  return [path.relative('src/scss', file.slice(0, file.length - path.extname(file).length)), fileURLToPath(new URL(file, import.meta.url))];
});
const inputJsArray = globSync('src/js/*.js', { ignore: ['src/js/component/**', 'node_modules/**', '**/modules/**', '**/html/**'] }).map((file) => {
  return [path.relative('src/js', file.slice(0, file.length - path.extname(file).length)), fileURLToPath(new URL(file, import.meta.url))];
});
const inputObject = Object.fromEntries(inputJsArray.concat(inputHtmlArray, inputScssArray));
console.info(inputObject);
//console.info(path.resolve(__dirname, '../src'));

const crossorigin = () => {
  return {
    name: 'crossorigin',
    transformIndexHtml(html) {
      return html.replace(/crossorigin/g, `crossorigin="use-credentials"`);
    },
  };
};

const generateBundle = () => {
  return {
    generateBundle(options, bundle) {
      for (const url in bundle) {
        if (bundle[url].name === 'helper') {
          bundle[url].code = bundle[url].code.replace('crossOrigin=""', 'crossOrigin="use-credentials"');
        }
      }
    },
  };
};

export default defineConfig({
  server: {
    port: 4000,
    host: true,
    //open: '/index.html',
    strictPort: true,
    watch: {
      usePolling: true,
    },
  },

  base: isProduction ? '/' : '/',

  //root: './src',
  root: path.resolve(__dirname, './src'),

  css: {
    devSourcemap: true, // this one
  },

  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.')[1];
          if (/ttf|otf|eot|woff|woff2/i.test(extType)) {
            extType = 'fonts';
          }
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            //extType = 'images';
            return 'assets/images/[name].[ext]';
          }
          // ビルド時のCSS名を明記してコントロールする
          if (extType === 'css') {
            //return `assets/css/style.css`;
            return 'assets/css/[name].css';
          }
          if (/\.css$/.test(assetInfo.name)) {
            return 'assets/css/[name].[ext]';
          }
          //return `assets/${extType}/[name][extname]`;
          return 'assets/[name].[ext]';
        },
        //chunkFileNames: `assets/js/[name].js`,
        //entryFileNames: `assets/js/[name].js`,
        chunkFileNames: `assets/js/[name].js`,
        entryFileNames: `assets/js/[name].js`,
      },
      // 生成オブジェクトを渡す
      input: inputObject,
    },
    html: {
      minify: true,
      inject: {
        injectTo: 'body',
        exclude: [],
        excludeAssets: [],
        attrs: {
          link: {
            crossorigin: undefined,
          },
        },
      },
    },
  },

  plugins: [
    //handlebars({
    //  partialDirectory: path.resolve(__dirname, '_templates'),
    //}),
    liveReload(['_templates/**/*.ejs']),
    //ViteEjsPlugin(JSON),
    /*ViteEjsPlugin((viteConfig) => {
      return (
        {
          root: viteConfig.root,
          domain: 'example.com',
          title: 'My vue project!',
        },
        {
          ejs: {
            beautify: true,
            views: [viteConfig.publicDir],
          },
        }
      );
    }),*/
    ViteEjsPlugin({
      extension: '.html',
      //layout: path.resolve(__dirname, '../src/__index.html'),
      //excludeFn: excludePrivate,
      data: {
        title: 'TITLE',
      },
      ejs: {
        minify: true,
      },
    }),
    babel({
      babelHelpers: 'runtime',
      exclude: ['node_modules/**'],
      presets: ['@babel/preset-env'],
      plugins: ['@babel/plugin-transform-runtime'],
    }),
    ViteImageOptimizer({
      test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
      //exclude: undefined,
      //include: undefined,
      includePublic: true,
      logStats: true,
      ansiColors: true,
      //svg: {
      //  multipass: true,
      //  plugins: [
      //    {
      //      name: 'preset-default',
      //      params: {
      //        overrides: {
      //          cleanupNumericValues: false,
      //          removeViewBox: false, // https://github.com/svg/svgo/issues/1128
      //        },
      //        cleanupIDs: {
      //          minify: false,
      //          remove: false,
      //        },
      //        convertPathData: false,
      //      },
      //    },
      //    'sortAttrs',
      //    {
      //      name: 'addAttributesToSVGElement',
      //      params: {
      //        attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
      //      },
      //    },
      //  ],
      //},
      png: {
        // https://sharp.pixelplumbing.com/api-output#png
        quality: 80,
      },
      jpeg: {
        // https://sharp.pixelplumbing.com/api-output#jpeg
        quality: 80,
      },
      jpg: {
        // https://sharp.pixelplumbing.com/api-output#jpeg
        quality: 80,
      },
      tiff: {
        // https://sharp.pixelplumbing.com/api-output#tiff
        quality: 80,
      },
      // gif does not support lossless compression
      // https://sharp.pixelplumbing.com/api-output#gif
      gif: {},
      webp: {
        // https://sharp.pixelplumbing.com/api-output#webp
        lossless: true,
      },
      avif: {
        // https://sharp.pixelplumbing.com/api-output#avif
        lossless: true,
      },
      cache: false,
      //cacheLocation: undefined,
    }),
    crossorigin({}),
    generateBundle({}),
  ],
});
