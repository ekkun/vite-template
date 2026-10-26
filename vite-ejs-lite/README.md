# Vite + EJS Lite Template

EJS、JavaScript、Sassで小規模な静的サイトを作るテンプレートです。画像最適化は含みません。

## 必要な環境

- Node.js `^20.19.0 || >=22.12.0`
- pnpm `10.32.1`

## 開始

```sh
pnpm install
pnpm dev
```

<http://localhost:5173> を開きます。開発中は`dist`へ出力しません。

## コマンド

| コマンド | 結果 |
| --- | --- |
| `pnpm dev` | 開発サーバーを起動する |
| `pnpm build:dev` | 開発設定で`dist`へ生成する |
| `pnpm build` | 公開設定で`dist`へ生成する |
| `pnpm preview` | <http://localhost:8080> でビルド結果を確認する |
| `pnpm test` | 共通要件を検査する |

## 最初に編集する場所

- 共通EJSデータ: `src/_templates/_config.ejs`
- ページ: `src/**/*.html`
- JavaScript: `src/js`
- Sass: `src/scss`
- 静的ファイル: `src/public`

共通仕様は[要件定義](../REQUIREMENTS.md)を参照してください。

## ディレクトリ構成

```text
vite-ejs-lite/
├── src/
│   ├── _templates/     # 共通EJS
│   ├── about/          # Aboutページ
│   ├── news/           # Newsページ
│   ├── js/             # JavaScript
│   ├── scss/           # Sass
│   ├── public/         # そのままコピーするファイル
│   └── index.html      # トップページ
├── htmlBeautify.mjs    # HTML整形
├── mediaQueries.mjs    # メディアクエリ整理
├── postcss.config.mjs  # CSS処理設定
├── vite.config.mjs     # Vite設定
└── package.json        # コマンドと依存関係
```
