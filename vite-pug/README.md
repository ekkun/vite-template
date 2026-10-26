# Vite + Pug Template

既存Pug案件を、JavaScript、Sass、画像最適化と一緒に保守するテンプレートです。

> [!IMPORTANT]
> Pugは`3.0.4`に完全固定しています。自動更新しません。

## 必要な環境

- Node.js `^20.19.0 || >=22.12.0`
- pnpm `10.32.1`

## 開始

```sh
pnpm install
pnpm dev
```

<http://localhost:5173> を開きます。起動時に`src/images`の画像も処理します。

`/`は`src/index.pug`、`/about/`は`src/about/index.pug`から表示されます。

## コマンド

| コマンド | 結果 |
| --- | --- |
| `pnpm dev` | 画像を処理し、開発サーバーを起動する |
| `pnpm build:dev` | 開発設定で`dist`へ生成する |
| `pnpm build` | 公開設定でHTML、CSS、JS、画像を`dist`へ生成する |
| `pnpm preview` | <http://localhost:8080> でビルド結果を確認する |
| `pnpm images:build` | `src/images`を最適化して`dist/assets/images`へ出力する |
| `pnpm lint` | JavaScriptを検査・修正する |
| `pnpm test` | 共通要件とPug固定版を検査する |

## 最初に編集する場所

- 共通レイアウト: `src/_templates/_layout.pug`
- ページ: `src/**/*.pug`
- JavaScript: `src/js`
- Sass: `src/scss`
- 最適化する画像: `src/images`
- そのままコピーするファイル: `src/public`

`sharp`はOSに合うバイナリを自動選択します。ソースのimport切り替えは不要です。

共通仕様は[要件定義](../REQUIREMENTS.md)を参照してください。

## ディレクトリ構成

```text
vite-pug/
├── src/
│   ├── _templates/     # 共通Pug
│   ├── about/          # Aboutページ
│   ├── news/           # Newsページ
│   ├── images/         # 最適化する画像
│   ├── js/             # JavaScript
│   ├── scss/           # Sass
│   ├── public/         # そのままコピーするファイル
│   └── index.pug       # トップページ
├── plugins/            # Vite用Pugプラグイン
├── tests/              # 開発サーバー統合テスト
├── convertImage.mjs    # 画像最適化
├── htmlBeautify.mjs    # HTML整形
├── mediaQueries.mjs    # メディアクエリ整理
├── processCssFiles.mjs # CSS後処理
├── svgo.config.mjs     # SVG最適化設定
├── vite.config.mjs     # Vite設定
└── package.json        # コマンドと依存関係
```
