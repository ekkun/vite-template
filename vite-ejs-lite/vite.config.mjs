import { defineConfig } from 'vite';
import { globSync } from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import legacy from '@vitejs/plugin-legacy';
import liveReload from 'vite-plugin-live-reload';
import dotenv from 'dotenv';
dotenv.config();

// __dirname を ESM でも使えるように
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// HTML エントリ（マルチページ）：src/**/*.html を自動取得
const inputHtmlArray = globSync(['src/**/*.html'], {
  ignore: ['node_modules/**']
}).map((file) => {
  const name = path.relative('src', file.slice(0, file.length - path.extname(file).length)).replace(/\\/g, '/'); // Windows 対応
  return [name, fileURLToPath(new URL(file, import.meta.url))];
});

// SCSS エントリ：src/scss/*.scss（_から始まるものは除外）
const inputScssArray = globSync('src/scss/*.scss', {
  ignore: ['src/scss/**/_*.scss', 'node_modules/**']
}).map((file) => {
  const name = path.relative('src/scss', file.slice(0, file.length - path.extname(file).length)).replace(/\\/g, '/');
  return [name, fileURLToPath(new URL(file, import.meta.url))];
});

// JS エントリ：src/js/*.js（component, modules, html 配下は除外）
const inputJsArray = globSync('src/js/*.js', {
  ignore: ['src/js/component/**', 'node_modules/**', '**/modules/**', '**/html/**']
}).map((file) => {
  const name = path.relative('src/js', file.slice(0, file.length - path.extname(file).length)).replace(/\\/g, '/');
  return [name, fileURLToPath(new URL(file, import.meta.url))];
});

// Rollup 用 input オブジェクト
const inputObject = Object.fromEntries(inputJsArray.concat(inputHtmlArray, inputScssArray));
console.info('[vite_ejs_lite] entrypoints:', inputObject);

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

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  const isDevelopment = mode === 'development';
  const isPreview = mode === 'preview';
  const isWatch = mode === 'watch';
  let environment;
  if (isProduction) {
    console.info('現在の環境: ビルド環境');
    environment = 'production';
  }
  if (isDevelopment) {
    console.info('現在の環境: 開発環境');
    environment = 'development';
  }
  if (isPreview) {
    console.info('現在の環境: プレビュー');
    environment = 'production';
  }
  if (isWatch) {
    console.info('現在の環境: 監視中');
    environment = 'watch';
  }

  return {
    root: path.resolve(__dirname, './src'),
    base: isProduction ? '/' : '/',

    server: {
      port: 4000,
      host: true,
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

    css: {
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    },

    build: {
      outDir: '../dist',
      emptyOutDir: true,
      modulePreload: { polyfill: false },
      assetsInlineLimit: 0,
      rollupOptions: {
        input: inputObject,
        output: {
          // JS
          entryFileNames: 'assets/js/[name].js',
          chunkFileNames: 'assets/js/[name].js',
          // CSS / 画像 / フォントなど
          assetFileNames: (assetInfo) => {
            const ext = assetInfo.name.split('.').pop();
            if (/ttf|otf|eot|woff2?/i.test(ext)) {
              return 'assets/fonts/[name].[ext]';
            }
            if (/css/i.test(ext)) {
              return 'assets/css/[name].[ext]';
            }
            if (/png|jpe?g|webp|svg|gif|tiff|bmp|ico/i.test(ext)) {
              return 'assets/images/[name].[ext]';
            }
            return 'assets/[name].[ext]';
          }
        }
      }
    },

    plugins: [
      liveReload(['_templates/**/*.ejs']),
      ViteEjsPlugin({
        root: './',
        environment: environment,
        title: 'TITLE',
        ejs: {
          beautify: true
        }
      }),
      legacy({
        targets: ['defaults', 'not IE 11']
      }),
      generateBundle({}),
      removeComments()
    ]
  };
});
