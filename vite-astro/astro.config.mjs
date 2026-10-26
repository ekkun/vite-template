import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  build: {
    format: 'preserve',
    assets: 'assets',
  },
  server: {
    host: true,
    port: 5173,
  },
  preview: {
    host: true,
    port: 8080,
  },
  vite: {
    css: {
      devSourcemap: true,
    },
    build: {
      assetsInlineLimit: 0,
      rolldownOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            const name = assetInfo.name?.toLowerCase() ?? '';

            if (name.endsWith('.css')) {
              return 'assets/css/style.css';
            }
            if (/\.(avif|gif|jpe?g|png|svg|webp)$/.test(name)) {
              return 'assets/images/[name][extname]';
            }
            if (name.endsWith('.pdf')) {
              return 'assets/pdf/[name][extname]';
            }
            if (/\.(eot|otf|ttf|woff2?)$/.test(name)) {
              return 'assets/fonts/[name][extname]';
            }

            return 'assets/[name][extname]';
          },
        },
      },
    },
    environments: {
      client: {
        build: {
          rolldownOptions: {
            output: {
              entryFileNames: 'assets/js/main.js',
              chunkFileNames: 'assets/js/[name].js',
            },
          },
        },
      },
    },
  },
});
