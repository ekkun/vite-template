import { defineConfig } from 'vite';
import { globSync } from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vitePluginPug from './plugins/vite-plugin-pug';
import liveReload from 'vite-plugin-live-reload';
//import JSON from './src/_templates/data.json';
import babel from '@rollup/plugin-babel';
import removeComments from 'babel-plugin-remove-comments';

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

if (isProduction) {
  console.info('ビルド環境');
}

if (isDevelopment) {
  console.info('開発環境');
}

const inputPugArray = globSync(['src/**/*.pug'], { ignore: ['src/**/_*.pug', 'node_modules/**'] }).map((file) => {
  return [path.relative('src', file.slice(0, file.length - path.extname(file).length)), fileURLToPath(new URL(file, import.meta.url))];
});
const inputScssArray = globSync('src/scss/*.scss', { ignore: ['src/scss/**/_*.scss', 'node_modules/**'] }).map((file) => {
  return [path.relative('src/scss', file.slice(0, file.length - path.extname(file).length)), fileURLToPath(new URL(file, import.meta.url))];
});
const inputJsArray = globSync('src/js/*.js', { ignore: ['src/js/component/**', 'node_modules/**', '**/modules/**', '**/html/**'] }).map((file) => {
  return [path.relative('src/js', file.slice(0, file.length - path.extname(file).length)), fileURLToPath(new URL(file, import.meta.url))];
});
const inputObject = Object.fromEntries(inputJsArray.concat(inputPugArray, inputScssArray));
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
    assetsInlineLimit: 0,
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
          /*if (extType === 'css') {
            //return `assets/css/style.css`;
            return 'assets/css/[name].css';
          }*/
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
  },

  plugins: [
    liveReload(['src/**/*.pug']),
    vitePluginPug({
      build: {
        locals: { hoge: 'hoge' },
        options: { pretty: true },
      },
      serve: {
        locals: { hoge: 'hoge' },
        options: { pretty: true },
      },
    }),
    removeComments({
      plugins: ['babel-plugin-minify-remove-comments'],
    }),
    babel({
      babelHelpers: 'runtime',
      exclude: ['node_modules/**'],
      presets: ['@babel/preset-env'],
      plugins: ['@babel/plugin-transform-runtime'],
    }),
    crossorigin({}),
    generateBundle({}),
  ],
});
