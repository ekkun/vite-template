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
      assetsInlineLimit: 0,
      minify: 'esbuild',
      target: 'es2015',

      // CSS は 1 ファイルにまとめる
      cssCodeSplit: false,

      rollupOptions: {
        // ★ エントリは HTML だけ
        input: inputObject,

        output: {
          // ★ JS を 1 ファイルにまとめ、ファイル名を固定
          //entryFileNames: 'assets/js/main.js',
          //chunkFileNames: 'assets/js/main.js',
          chunkFileNames: `assets/js/[name].js`,
          entryFileNames: `assets/js/[name].js`,
          manualChunks: undefined,

          // ★ CSS / 画像 / フォントなどの出力先
          assetFileNames: (assetInfo) => {
            const name = assetInfo.name ?? '';
            const ext = name.split('.').pop()?.toLowerCase() ?? '';

            if (/ttf|otf|eot|woff2?/i.test(ext)) {
              return 'assets/fonts/[name].[ext]';
            }
            if (ext === 'css') {
              // CSS は 1つだけ出る想定なので固定名
              return 'assets/css/style.css';
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
