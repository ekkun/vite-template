# Vite + EJS Template

EJS、JavaScript、Sass、画像最適化で静的サイトを作るテンプレートです。

## 必要な環境

- Node.js `^20.19.0 || >=22.12.0`
- pnpm `10.32.1`

## 開始

```sh
pnpm install
pnpm dev
```

<http://localhost:5173> を開きます。起動時に`src/images`の画像も処理します。

## コマンド

| コマンド | 結果 |
| --- | --- |
| `pnpm dev` | 画像を処理し、開発サーバーを起動する |
| `pnpm build:dev` | 開発設定で`dist`へ生成する |
| `pnpm build` | 公開設定でHTML、CSS、JS、画像を`dist`へ生成する |
| `pnpm preview` | <http://localhost:8080> でビルド結果を確認する |
| `pnpm images:build` | `src/images`を最適化して`dist/assets/images`へ出力する |
| `pnpm lint` | JavaScriptを検査・修正する |
| `pnpm test` | 共通要件を検査する |

## 最初に編集する場所

- 共通EJSデータ: `src/_templates/_config.ejs`
- ページ: `src/**/*.html`
- JavaScript: `src/js`
- Sass: `src/scss`
- 最適化する画像: `src/images`
- そのままコピーするファイル: `src/public`

`sharp`はOSに合うバイナリを自動選択します。ソースのimport切り替えは不要です。

共通仕様は[要件定義](../REQUIREMENTS.md)を参照してください。

## ディレクトリ構成

```text
vite-ejs/
├── src/
│   ├── _templates/     # 共通EJS
│   ├── about/          # Aboutページ
│   ├── news/           # Newsページ
│   ├── images/         # 最適化する画像
│   ├── js/             # JavaScript
│   ├── scss/           # Sass
│   ├── public/         # そのままコピーするファイル
│   └── index.html      # トップページ
├── convertImage.mjs    # 画像最適化
├── htmlBeautify.mjs    # HTML整形
├── mediaQueries.mjs    # メディアクエリ整理
├── processCssFiles.mjs # CSS後処理
├── svgo.config.mjs     # SVG最適化設定
├── vite.config.mjs     # Vite設定
└── package.json        # コマンドと依存関係
```
