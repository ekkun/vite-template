import { defineConfig } from 'vite';
import { globSync } from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vitePluginPug from './plugins/vite-plugin-pug';
import liveReload from 'vite-plugin-live-reload';
import dotenv from 'dotenv';
dotenv.config();

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
      //cssMinify: false,
      assetsInlineLimit: 0,
      minify: 'esbuild', // esbuild(非推奨), oxc(推奨)
      target: 'es2015', // 'es2020', 'es2022'
      rolldownOptions: {
        input: inputObject,
        output: {
          // JS
          entryFileNames: 'assets/js/[name].js',
          chunkFileNames: 'assets/js/[name].js',
          // CSS / 画像 / フォントなど
          assetFileNames: (assetInfo) => {
            const candidate = (typeof assetInfo?.name === 'string' && assetInfo.name) || (Array.isArray(assetInfo?.names) && assetInfo.names.find((s) => typeof s === 'string')) || '';
            const n = candidate.replace(/\\/g, '/');
            const ext = n.includes('.') ? n.split('.').pop() : '';

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

    optimizeDeps: {
      //include: ['@babel/runtime/regenerator']
    },

    define: {
      //$: 'window.jQuery',
      //jQuery: 'window.jQuery'
    },

    plugins: [
      liveReload(['src/**/*.pug']),
      vitePluginPug({
        build: {
          locals: { environment, hoge: 'hoge' },
          options: { pretty: true }
        },
        serve: {
          locals: { environment, hoge: 'hoge' },
          options: { pretty: true }
        }
      }),
      crossorigin({}),
      generateBundle({}),
      removeComments()
    ]
  };
});
