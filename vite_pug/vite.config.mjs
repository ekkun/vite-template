import { defineConfig } from 'vite';
import { globSync } from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vitePluginPug from './plugins/vite-plugin-pug';
import liveReload from 'vite-plugin-live-reload';
import babel from '@rollup/plugin-babel';

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';
const isPreview = process.env.NODE_ENV === 'preview';
const isWatch = process.env.NODE_ENV === 'watch';

if (isProduction) {
  console.info('ビルド環境');
}
if (isDevelopment) {
  console.info('開発環境');
}
if (isPreview) {
  console.info('プレビュー');
}
if (isWatch) {
  console.info('監視中');
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

const crossorigin = () => {
  return {
    name: 'crossorigin',
    transformIndexHtml(html) {
      return html.replace(/crossorigin/g, `crossorigin="use-credentials"`);
    }
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
    }
  };
};

const removeComments = () => {
  return {
    name: 'remove-comments',
    transform(code, id) {
      if (id.endsWith('.js')) {
        code = code.replace(/\/\*![\s\S]*?\*\//g, '');
      } else if (id.endsWith('.css') || id.endsWith('.scss') || id.endsWith('.sass')) {
        code = code.replace(/\/\*![\s\S]*?\*\//g, '');
      }
      return code;
    }
  };
};

export default defineConfig({
  appType: 'spa',

  server: {
    port: 4000,
    host: true,
    //open: '/index.html',
    strictPort: true,
    watch: {
      usePolling: true
    }
  },

  preview: {
    port: 8080,
    host: true,
    strictPort: true,
    watch: {
      usePolling: true
    }
  },

  base: isProduction ? '/' : '/',

  root: path.resolve(__dirname, './src'),

  css: {
    devSourcemap: true
  },

  build: {
    outDir: '../dist',
    emptyOutDir: true,
    modulePreload: { polyfill: false },
    //cssMinify: false,
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').pop();
          if (/ttf|otf|eot|woff|woff2/i.test(extType)) {
            extType = 'fonts';
          }
          if (/png|jpe?g|webp|svg|gif|tiff|bmp|ico/i.test(extType)) {
            let originalFileName = assetInfo.originalFileName;
            if (originalFileName) {
              return `assets/${originalFileName}`;
            } else {
              return 'assets/images/[name].[ext]';
            }
          }
          if (extType === 'css') {
            return 'assets/css/[name].css';
          }
          if (/\.css$/.test(assetInfo.name)) {
            return 'assets/css/[name].[ext]';
          }
          return 'assets/[name].[ext]';
        },
        chunkFileNames: `assets/js/[name].js`,
        entryFileNames: `assets/js/[name].js`
      },
      input: inputObject
    }
  },

  plugins: [
    liveReload(['src/**/*.pug']),
    vitePluginPug({
      build: {
        locals: { hoge: 'hoge' },
        options: { pretty: true }
      },
      serve: {
        locals: { hoge: 'hoge' },
        options: { pretty: true }
      }
    }),
    babel({
      babelHelpers: 'runtime',
      exclude: ['node_modules/**'],
      presets: ['@babel/preset-env'],
      plugins: ['@babel/plugin-transform-runtime']
    }),
    crossorigin({}),
    generateBundle({}),
    removeComments()
  ]
});
