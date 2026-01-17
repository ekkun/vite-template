// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { globSync } from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// __dirname を ESM でも使えるように
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// HTML エントリ（マルチページ）：src/**/*.html を自動取得
const htmlFiles = globSync(['src/**/*.html'], {
  ignore: ['node_modules/**'],
});

const inputObject = Object.fromEntries(
  htmlFiles.map((file) => {
    // src からの相対パス（拡張子なし）
    const name = path.relative('src', file.slice(0, file.length - path.extname(file).length)).replace(/\\/g, '/'); // Windows 対応
    const absPath = fileURLToPath(new URL(file, import.meta.url));
    return [name, absPath];
  })
);

console.info('[vite_mpa] entrypoints:', inputObject);

// /*! ... */ コメント削除プラグイン（必要なければ消してOK）
const removeComments = () => {
  return {
    name: 'remove-comments',
    transform(code: string, id: string) {
      if (id.endsWith('.js')) {
        code = code.replace(/\/\*![\s\S]*?\*\//g, '');
      } else if (id.endsWith('.css') || id.endsWith('.scss') || id.endsWith('.sass')) {
        code = code.replace(/\/\*![\s\S]*?\*\//g, '');
      }
      return code;
    },
  };
};

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  const isDevelopment = mode === 'development';

  console.info('現在の環境:', isProduction ? 'ビルド環境' : isDevelopment ? '開発環境' : mode);

  return {
    root: path.resolve(__dirname, './src'),
    base: isProduction ? '/' : '/',

    server: {
      port: 4000,
      host: true,
      strictPort: true,
      watch: {
        usePolling: true,
      },
    },

    preview: {
      port: 8080,
      host: true,
      strictPort: true,
      watch: {
        usePolling: true,
      },
    },

    css: {
      transformer: 'postcss',
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },

    build: {
      outDir: '../dist',
      emptyOutDir: true,
      modulePreload: { polyfill: false },
      cssCodeSplit: false,
      cssMinify: 'esbuild',
      assetsInlineLimit: 0,
      minify: 'esbuild', // esbuild(非推奨), oxc(推奨)
      target: 'es2020', // 'es2015', 'es2020', 'es2022'
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
          },
        },
      },
    },

    plugins: [react(), removeComments()],
  };
});
